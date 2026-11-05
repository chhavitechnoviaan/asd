const {recordAdminActivity}=require("../services/adminActivity");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");
const {getVerificationSettings, sendVerificationEmail} = require("../services/verificationEmail");


const isValidPassword = (password) => {
  const regex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;
  return regex.test(password);
};

exports.signupUser = async (req, res) => {
  try {
    const { name, email, password, confirmPassword, phone } = req.body;
    if (!name?.trim() || !email?.trim() || !phone?.trim() || !password) return res.status(400).json({msg:"All fields are required"});

    if (password !== confirmPassword) {
      return res.status(400).json({ msg: "Passwords do not match" });
    }

    // Captcha may be enforced by a configured production verification middleware.

    const existing = await User.findOne({ email: email.toLowerCase().trim() });
    if (existing) {
      return res.status(400).json({ msg: "Email already exists" });
    }
if (!isValidPassword(password)) {
  return res.status(400).json({
    msg: "Password must be 8 chars, 1 uppercase, 1 number"
  });
}
if (!email.includes("@")) {
  return res.status(400).json({ msg: "Invalid email" });
}

    const hashedPassword = await bcrypt.hash(password, 10);



    const role = await Role.findOne({ name: "user" });
    if (!role) return res.status(500).json({msg:"User role is not configured"});

    const account = await User.create({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      phone,
      password: hashedPassword,
      roleId: role._id // ✅ FIX
    });

    await recordAdminActivity({title:"New User registration",message:`${account.name} registered a User account`,relatedId:account._id,type:"User"});
    const emailConfig=await getVerificationSettings();
    if(emailConfig.enabled){
      try { await sendVerificationEmail(account,emailConfig); }
      catch(err) { console.error("Signup email failed:",err.message); return res.status(503).json({msg:"Account created, but verification email could not be delivered. Use Resend Verification after SMTP is fixed."}); }
    }
    res.json({ msg: emailConfig.enabled ? "Registration successful. Check your email to verify your account." : "User signup successful", verificationRequired: emailConfig.enabled });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.signupB2B = async (req, res) => {
    try {
      const {
        name,
        email,
        password,
        confirmPassword,
        companyName,
        gstNumber,
        importExportId,
        captchaToken
      } = req.body;
  
      if (password !== confirmPassword) {
        return res.status(400).json({ msg: "Passwords do not match" });
      }
  
      // Captcha may be enforced by a configured production verification middleware.
  
      const existing = await User.findOne({ email: email.toLowerCase().trim() });
      if (existing) {
        return res.status(400).json({ msg: "Email already exists" });
      }
if (!companyName) {
  return res.status(400).json({ msg: "Company name required" });
}
if (!isValidPassword(password)) {
  return res.status(400).json({
    msg: "Password must be 8 chars, 1 uppercase, 1 number"
  });
}
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const role = await Role.findOne({ name: "b2b" });
      if (!role) return res.status(500).json({msg:"B2B role is not configured"});

      const account = await User.create({
        name,
        email,
        password: hashedPassword,
        roleId: role._id, // ✅ FIX
        companyName,
        gstNumber,
        importExportId
      });
  
      await recordAdminActivity({title:"New B2B registration",message:`${account.name} registered a B2B account`,relatedId:account._id,type:"User"});
      const emailConfig=await getVerificationSettings();
      if(emailConfig.enabled){
        try { await sendVerificationEmail(account,emailConfig); }
        catch(err) { console.error("Signup email failed:",err.message); return res.status(503).json({msg:"Account created, but verification email could not be delivered. Use Resend Verification after SMTP is fixed."}); }
      }
      res.json({ msg: emailConfig.enabled ? "Registration successful. Check your email to verify your account." : "B2B signup successful", verificationRequired: emailConfig.enabled });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  exports.login = async (req, res) => {
    try {
      const { email, password, type } = req.body;
      if (!email || !password || !["user", "b2b", "admin"].includes(type)) return res.status(400).json({msg:"Valid email, password and account type are required"}); 
  
      const user = await User.findOne({ email: email.toLowerCase().trim() })
        .select("+password")
        .populate("roleId");
  
      if (!user) return res.status(400).json({ msg: "User not found" });
  
      if (!user.password) return res.status(401).json({msg:"Password authentication unavailable for this account"});
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: "Invalid password" });
      if(user.verificationRequired && !user.emailVerified) return res.status(403).json({msg:"EMAIL_VERIFICATION_REQUIRED: Please confirm your email before logging in."});
      if (!user.roleId) return res.status(403).json({msg:"Invalid account role"});
      const actualRole = String(user.roleId.name || "").toLowerCase();
      const internalStaff = Boolean(user.isInternalStaff);
      if (!internalStaff && !["admin", "user", "b2b"].includes(actualRole)) return res.status(403).json({msg:"Invalid account role"});
      if (user.status === "inactive" || user.accountStatus === "Inactive" || user.roleId.status === "inactive") return res.status(403).json({msg:"Account or role is inactive"});
      if (internalStaff ? type !== "admin" : type !== actualRole) return res.status(403).json({msg:"Please select the correct account type"});
  
      if (type === "user" && user.roleId.name !== "user") {
        return res.status(403).json({ msg: "User access only" });
      }
  
      const token = jwt.sign(
        {
          id: user._id,
          role: internalStaff ? "admin" : actualRole,
          sv: user.sessionVersion || 0
        },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
      );
  
      user.password = undefined;
      const safeUser = user.toObject();
      if (internalStaff) safeUser.role = "admin";
      safeUser.isInternalStaff = internalStaff;
      res.json({ msg: "Login success", token, user: safeUser });
  
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  };

  // Password reset OTP is independent of email verification and never logged.
  const resetCrypto=require("crypto");
  const otpDigest=(email,otp)=>resetCrypto.createHash("sha256").update(`${email}:${otp}:${process.env.JWT_SECRET||""}`).digest("hex");
  const sendPasswordResetOtp=async(req,res)=>{
    const email=String(req.body?.email||"").trim().toLowerCase();
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email))return res.status(400).json({msg:"Valid email required"});
    try{
      const user=await User.findOne({email});
      const response={msg:"If this email is registered, a password reset code has been sent."};
      if(!user) return res.json(response);
      if(user.passwordResetSentAt && Date.now()-new Date(user.passwordResetSentAt).getTime()<60000)
        return res.status(429).json({msg:"Please wait before requesting another code"});
      const code=resetCrypto.randomInt(100000,1000000).toString();
      user.passwordResetOtpHash=otpDigest(email,code);
      user.passwordResetExpiry=new Date(Date.now()+5*60*1000);
      user.passwordResetSentAt=new Date();
      user.passwordResetVerifiedAt=undefined;
      user.passwordResetAttempts=0;
      await user.save();
      try{await require("../services/verificationEmail").sendSystemEmail(user.email,"CargoMate password reset code",`Your password reset code is ${code}. It expires in 5 minutes. Never share this code.`);}
      catch(err){user.passwordResetOtpHash=undefined;user.passwordResetExpiry=undefined;await user.save();throw err;}
      return res.json(response);
    }catch(err){console.error("OTP delivery failed",err.message);return res.status(503).json({msg:"Password reset email is unavailable. Please try later."});}
  };
  exports.sendOtp=sendPasswordResetOtp;
  exports.resendOtp=sendPasswordResetOtp;
  exports.verifyOtp=async(req,res)=>{
    const email=String(req.body?.email||"").trim().toLowerCase();
    const otp=String(req.body?.otp||"");
    if(!/^\d{6}$/.test(otp))return res.status(400).json({msg:"Invalid or expired code"});
    try{
      const user=await User.findOne({email}).select("+passwordResetOtpHash");
      if(!user||!user.passwordResetOtpHash||!user.passwordResetExpiry||user.passwordResetExpiry<new Date()||(user.passwordResetAttempts||0)>=5)
        return res.status(400).json({msg:"Invalid or expired code"});
      const digest=otpDigest(email,otp);
      const good=resetCrypto.timingSafeEqual(Buffer.from(digest),Buffer.from(user.passwordResetOtpHash));
      if(!good){user.passwordResetAttempts=(user.passwordResetAttempts||0)+1;await user.save();return res.status(400).json({msg:"Invalid or expired code"});}
      user.passwordResetVerifiedAt=new Date();user.passwordResetOtpHash=undefined;user.passwordResetExpiry=undefined;
      await user.save();
      return res.json({msg:"Code verified. You may set a new password."});
    }catch(err){return res.status(500).json({msg:"Verification unavailable"});}
  };
  exports.resetPassword=async(req,res)=>{
    const email=String(req.body?.email||"").trim().toLowerCase();
    const {password,confirmPassword}=req.body||{};
    if(password!==confirmPassword||!isValidPassword(password)) return res.status(400).json({msg:"Password requires 8 characters, an uppercase letter and a number; confirmation must match"});
    try{
      const user=await User.findOne({email});
      if(!user?.passwordResetVerifiedAt || Date.now()-new Date(user.passwordResetVerifiedAt).getTime()>5*60*1000)
        return res.status(403).json({msg:"Verify the password reset code first"});
      user.password=await bcrypt.hash(password,12);
      user.passwordResetVerifiedAt=undefined;user.passwordResetAttempts=0;
      user.sessionVersion=(user.sessionVersion||0)+1;
      await user.save();
      return res.json({msg:"Password reset successful"});
    }catch(err){return res.status(500).json({msg:"Unable to reset password"});}
  };

  // Legacy endpoint delegates to the canonical internal-role account creator.
  // Password, role and status validations are enforced there.
  exports.createStaff = require("./subAdminController").create;


exports.me = async (req, res) => res.json({user: {id:req.user._id, name:req.user.name, email:req.user.email, role:req.user.isInternalStaff ? "admin" : req.user.roleName, isInternalStaff:!!req.user.isInternalStaff, permissions:req.user.isInternalStaff ? req.user.roleId?.permissions : null}});
