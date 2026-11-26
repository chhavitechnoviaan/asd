// const crypto=require("crypto");
// const {decrypt}=require("../utils/settingSecrets");
// const jwt=require("jsonwebtoken");
// const bcrypt=require("bcryptjs");
// const User=require("../models/user");
// const Role=require("../models/Role");
// const AdminSettings=require("../models/AdminSettings");
// const {getVerificationSettings,sendVerificationEmail}=require("../services/verificationEmail");

// const fetchJSON=async(url,options={})=>{
//   const response=await fetch(url,{...options,signal:AbortSignal.timeout(10000)});
//   if(!response.ok) throw new Error(`Identity provider verification failed (${response.status})`);
//   return response.json();
// };

// exports.login=async(req,res)=>{
//   try{
//     const {provider,role,token,intent="login"}=req.body || {};
//     if(!["google","facebook"].includes(provider)||!["user","b2b"].includes(role)||typeof token!=="string"||token.length>8192||token.length<12)
//       return res.status(400).json({message:"Invalid social login request"});
//     const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});
//     const cfg=settings?.socialLogin?.[provider];
//     if(!cfg?.enabled || !cfg?.clientId) return res.status(403).json({message:"Social login is disabled"});
//     let socialId, email, name, identityVerifiedGoogle=false;
//     if(provider==="google"){
//       const identity=await fetchJSON(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
//       if(identity.aud!==cfg.clientId || !["true",true].includes(identity.email_verified) || !identity.sub || !["accounts.google.com","https://accounts.google.com"].includes(identity.iss))
//         return res.status(401).json({message:"Google identity verification failed"});
//       socialId=identity.sub;email=identity.email;name=identity.name;identityVerifiedGoogle=true;
//     } else {
//       if(!cfg.clientSecret) return res.status(503).json({message:"Facebook provider not configured"});
//       const appToken=`${cfg.clientId}|${decrypt(cfg.clientSecret)}`;
//       const inspected=await fetchJSON(`https://graph.facebook.com/debug_token?input_token=${encodeURIComponent(token)}&access_token=${encodeURIComponent(appToken)}`);
//       if(!inspected.data?.is_valid || inspected.data.app_id!==cfg.clientId || !inspected.data.user_id)
//         return res.status(401).json({message:"Facebook identity verification failed"});
//       const profile=await fetchJSON(`https://graph.facebook.com/me?fields=id,name,email&access_token=${encodeURIComponent(token)}`);
//       if(profile.id!==inspected.data.user_id || !profile.email) return res.status(400).json({message:"A Facebook account with email permission is required"});
//       socialId=profile.id;email=profile.email;name=profile.name;
//     }
//     email=String(email||"").trim().toLowerCase();
//     if(!email) return res.status(400).json({message:"Verified email required"});
//     const roleDoc=await Role.findOne({name:role});
//     if(!roleDoc) return res.status(503).json({message:"Account role not configured"});
//     let account=await User.findOne({[`socialAccounts.${provider}`]:socialId}).populate("roleId");
//     if(account && String(account.roleId?.name).toLowerCase()!==role) return res.status(403).json({message:"Account type mismatch"});
//     if(!account){
//       const emailTaken=await User.findOne({email});
//       if(emailTaken){
//         // A verified Google identity for a Google-managed Gmail mailbox can safely
//         // establish mailbox ownership. Never auto-link Facebook or external-domain
//         // Google accounts (their addresses may not be authoritative).
//         const existingRole = await Role.findById(emailTaken.roleId);
//         if(String(existingRole?.name||"").toLowerCase()!==role){
//           return res.status(403).json({message:"This email belongs to a different account type. Select the correct User/B2B login."});
//         }
//         const googleManagedEmail = /@(gmail\.com|googlemail\.com)$/i.test(email);
//         if(provider==="google" && googleManagedEmail && identityVerifiedGoogle){
//           const matched = await User.findOneAndUpdate(
//             {_id:emailTaken._id,[`socialAccounts.${provider}`]:{$exists:false}},
//             {$set:{[`socialAccounts.${provider}`]:socialId,emailVerified:true}},
//             {new:true}
//           );
//           account = matched || await User.findById(emailTaken._id);
//           if(String(account.socialAccounts?.google||"")!==String(socialId)){
//             return res.status(409).json({message:"Google account linking needs confirmation. Sign in with password first."});
//           }
//           account.roleId=existingRole;
//         }else{
//           return res.status(409).json({message:"This email already has an account. Sign in with your password to link Facebook or an external-email Google account securely.",code:"ACCOUNT_LINK_REQUIRED"});
//         }
//       }else{
//       if(intent!=="signup") return res.status(404).json({message:"No account found with this email. Please complete Sign Up to create your account.",code:"SIGNUP_REQUIRED",email});
//       const emailVerification=await getVerificationSettings();
//       account=await User.create({name:name||email.split("@")[0],email,roleId:roleDoc._id,
//         password:await bcrypt.hash(crypto.randomBytes(40).toString("hex"),12),
//         companyName:role==="b2b"?(name || "Business account"):undefined,
//         socialAccounts:{[provider]:socialId},emailVerified:provider==="google",verificationRequired: provider==="facebook" && emailVerification.enabled,status:"active"});
//       if (account.verificationRequired){
//         try { await sendVerificationEmail(account,emailVerification); }
//         catch(error){console.error("Social account verification mail failed",error.message);return res.status(503).json({message:"Account created but verification email could not be delivered. Please use Resend Verification."});}
//       }
//       }
//     }
//     if(account.verificationRequired&&!account.emailVerified) return res.status(403).json({message:"Please verify your email before logging in."});
//     if(account.status==="inactive"||account.accountStatus==="Inactive"||account.roleId?.status==="inactive") return res.status(403).json({message:"Account unavailable"});
//     const authToken=jwt.sign({id:account._id,role,sv:account.sessionVersion||0},process.env.JWT_SECRET,{expiresIn:"7d"});
//     res.json({token:authToken,user:{id:account._id,name:account.name,email:account.email,role}});
//   }catch(error){console.error("Social login error:",error.message);res.status(502).json({message:"Social sign-in could not be verified. Check provider settings."});}
// };


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
    const {provider,role,token,intent="login"}=req.body || {};
    if(!["google","facebook"].includes(provider)||!["user","b2b"].includes(role)||typeof token!=="string"||token.length>8192||token.length<12)
      return res.status(400).json({message:"Invalid social login request"});
    const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});
    const cfg=settings?.socialLogin?.[provider];
    if(!cfg?.enabled || !cfg?.clientId) return res.status(403).json({message:"Social login is disabled"});
    let socialId, email, name, identityVerifiedGoogle=false;
    if(provider==="google"){
      const identity=await fetchJSON(`https://oauth2.googleapis.com/tokeninfo?id_token=${encodeURIComponent(token)}`);
      if(identity.aud!==cfg.clientId || !["true",true].includes(identity.email_verified) || !identity.sub || !["accounts.google.com","https://accounts.google.com"].includes(identity.iss))
        return res.status(401).json({message:"Google identity verification failed"});
      socialId=identity.sub;email=identity.email;name=identity.name;identityVerifiedGoogle=true;
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
    if(account && String(account.roleId?.name).toLowerCase()!==role) {
      const label=role==="b2b"?"B2B":"User";
      return res.status(404).json({
        message:`No ${label} account exists for this email. Please open the ${label} Sign Up page.`,
        code:"ROLE_SIGNUP_REQUIRED",
        email,
        emailAlreadyRegistered:true
      });
    }
    if(!account){
      const emailTaken=await User.findOne({email});
      if(emailTaken){
        // A verified Google identity for a Google-managed Gmail mailbox can safely
        // establish mailbox ownership. Never auto-link Facebook or external-domain
        // Google accounts (their addresses may not be authoritative).
        const existingRole = await Role.findById(emailTaken.roleId);
        if(String(existingRole?.name||"").toLowerCase()!==role){
          return res.status(404).json({
            message:`No ${role==="b2b"?"B2B":"User"} account exists for this email. Please open the ${role==="b2b"?"B2B":"User"} Sign Up page.`,
            code:"ROLE_SIGNUP_REQUIRED",email,emailAlreadyRegistered:true
          });
        }
        const googleManagedEmail = /@(gmail\.com|googlemail\.com)$/i.test(email);
        if(provider==="google" && googleManagedEmail && identityVerifiedGoogle){
          const matched = await User.findOneAndUpdate(
            {_id:emailTaken._id,[`socialAccounts.${provider}`]:{$exists:false}},
            {$set:{[`socialAccounts.${provider}`]:socialId,emailVerified:true}},
            {new:true}
          );
          account = matched || await User.findById(emailTaken._id);
          if(String(account.socialAccounts?.google||"")!==String(socialId)){
            return res.status(409).json({message:"Google account linking needs confirmation. Sign in with password first."});
          }
          account.roleId=existingRole;
        }else{
          return res.status(409).json({message:"This email already has an account. Sign in with your password to link Facebook or an external-email Google account securely.",code:"ACCOUNT_LINK_REQUIRED"});
        }
      }else{
      if(intent!=="signup") return res.status(404).json({message:"No account found with this email. Please complete Sign Up to create your account.",code:"SIGNUP_REQUIRED",email});
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
    }
    if(account.verificationRequired&&!account.emailVerified) return res.status(403).json({message:"Please verify your email before logging in."});
    if(account.status==="inactive"||account.accountStatus==="Inactive"||account.roleId?.status==="inactive") return res.status(403).json({message:"Account unavailable"});
    const authToken=jwt.sign({id:account._id,role,sv:account.sessionVersion||0},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.json({token:authToken,user:{id:account._id,name:account.name,email:account.email,role}});
  }catch(error){console.error("Social login error:",error.message);res.status(502).json({message:"Social sign-in could not be verified. Check provider settings."});}
};
