const crypto=require("crypto");
const {decrypt}=require("../utils/settingSecrets");
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
const User=require("../models/user");
const Role=require("../models/Role");
const AdminSettings=require("../models/AdminSettings");
const {getVerificationSettings,sendVerificationEmail}=require("../services/verificationEmail");

const fetchJSON=async(url,options={})=>{
  const response=await fetch(url,{...options,signal:AbortSignal.timeout(10000)});
  if(!response.ok) throw new Error(`Identity provider verification failed (${response.status})`);
  return response.json();
};

exports.login=async(req,res)=>{
  try{
    const {provider,role,token}=req.body || {};
    if(!["google","facebook"].includes(provider)||!["user","b2b"].includes(role)||typeof token!=="string"||token.length>8192||token.length<12)
      return res.status(400).json({message:"Invalid social login request"});
    const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});
    const cfg=settings?.socialLogin?.[provider];
    if(!cfg?.enabled || !cfg?.clientId) return res.status(403).json({message:"Social login is disabled"});
    let socialId, email, name;
    if(provider==="google"){
      const identity=await fetchJSON(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
      if(identity.aud!==cfg.clientId || !["true",true].includes(identity.email_verified) || !identity.sub || !["accounts.google.com","https://accounts.google.com"].includes(identity.iss))
        return res.status(401).json({message:"Google identity verification failed"});
      socialId=identity.sub;email=identity.email;name=identity.name;
    } else {
      if(!cfg.clientSecret) return res.status(503).json({message:"Facebook provider not configured"});
      const appToken=`${cfg.clientId}|${decrypt(cfg.clientSecret)}`;
      const inspected=await fetchJSON(`https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(token)}&access_token=${encodeURIComponent(appToken)}`);
      if(!inspected.data?.is_valid || inspected.data.app_id!==cfg.clientId || !inspected.data.user_id)
        return res.status(401).json({message:"Facebook identity verification failed"});
      const profile=await fetchJSON(`https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(token)}`);
      if(profile.id!==inspected.data.user_id || !profile.email) return res.status(400).json({message:"A Facebook account with email permission is required"});
      socialId=profile.id;email=profile.email;name=profile.name;
    }
    email=String(email||"").trim().toLowerCase();
    if(!email) return res.status(400).json({message:"Verified email required"});
    const roleDoc=await Role.findOne({name:role});
    if(!roleDoc) return res.status(503).json({message:"Account role not configured"});
    let account=await User.findOne({[`socialAccounts.${provider}`]:socialId}).populate("roleId");
    if(account && String(account.roleId?.name).toLowerCase()!==role) return res.status(403).json({message:"Account type mismatch"});
    if(!account){
      const emailTaken=await User.findOne({email});
      if(emailTaken) return res.status(409).json({message:"Email already registered. Sign in with password to link a social account securely."});
      const emailVerification=await getVerificationSettings();
      account=await User.create({name:name||email.split("@")[0],email,roleId:roleDoc._id,
        password:await bcrypt.hash(crypto.randomBytes(40).toString("hex"),12),
        companyName:role==="b2b"?(name || "Business account"):undefined,
        socialAccounts:{[provider]:socialId},emailVerified:provider==="google",verificationRequired: provider==="facebook" && emailVerification.enabled,status:"active"});
      if (account.verificationRequired){
        try { await sendVerificationEmail(account,emailVerification); }
        catch(error){console.error("Social account verification mail failed",error.message);return res.status(503).json({message:"Account created but verification email could not be delivered. Please use Resend Verification."});}
      }
    }
    if(account.verificationRequired&&!account.emailVerified) return res.status(403).json({message:"Please verify your email before logging in."});
    if(account.status==="inactive"||account.accountStatus==="Inactive"||account.roleId?.status==="inactive") return res.status(403).json({message:"Account unavailable"});
    const authToken=jwt.sign({id:account._id,role,sv:account.sessionVersion||0},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.json({token:authToken,user:{id:account._id,name:account.name,email:account.email,role}});
  }catch(error){console.error("Social login error:",error.message);res.status(502).json({message:"Social sign-in could not be verified. Check provider settings."});}
};
