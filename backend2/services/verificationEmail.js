"use strict";
const crypto = require("crypto");
const AdminSettings = require("../models/AdminSettings");
const { decrypt } = require("../utils/settingSecrets");
const TOKEN_DURATION_MS = 30 * 60 * 1000;
const SEND_COOLDOWN_MS = 60 * 1000;
const sha = (token) => crypto.createHash("sha256").update(token).digest("hex");
async function getVerificationSettings() {
  const settings = await AdminSettings.findOne({ singleton: "ADMIN_SETTINGS" }).lean();
  return { enabled: settings?.emailSms?.emailVerificationEnabled === true, smtp: settings?.emailSms?.smtp || {} };
}
function makeTransport(smtp) {
  if(process.env.NODE_ENV==="production" && String(smtp.encryption||"TLS").toUpperCase()==="NONE") throw Object.assign(Error("Unencrypted SMTP is not allowed in production"),{status:400});
  const nodemailer=require("nodemailer");
  const secure=String(smtp.encryption||"TLS").toUpperCase()==="SSL";
  return nodemailer.createTransport({host:smtp.host,port:Number(smtp.port||(secure?465:587)),secure,
    requireTLS:String(smtp.encryption||"TLS").toUpperCase()==="TLS",
    auth:{user:smtp.username,pass:decrypt(smtp.password)},
    connectionTimeout:10000,greetingTimeout:10000,socketTimeout:15000});
}
async function sendSystemEmail(to,subject,text){
 const config=await getVerificationSettings(),smtp=config.smtp||{};
 if(!smtp.host||!smtp.username||!smtp.password) throw Object.assign(Error("SMTP is not configured"),{status:503});
 const transport=makeTransport(smtp);
 try { return await transport.sendMail({from:process.env.SMTP_FROM||smtp.username,to,subject,text}); }
 finally {transport.close();}
}
async function testSmtpConnection(){
  const config=await getVerificationSettings();
  const smtp=config.smtp||{};
  if(!smtp.host||!smtp.username||!smtp.password)throw Object.assign(Error("SMTP credentials are not configured"),{status:503});
  const transport=makeTransport(smtp);
  await transport.verify();
  transport.close();
  return true;
}
async function sendVerificationEmail(account, config) {
  if (!config?.enabled) return false;
  const smtp = config.smtp || {};
  if (!smtp.host || !smtp.username || !smtp.password) {
    throw Object.assign(new Error("Email verification is enabled but SMTP settings are incomplete"), { status: 503 });
  }
  const transport=makeTransport(smtp);
  const now = Date.now();
  if (account.emailVerificationSentAt && now - new Date(account.emailVerificationSentAt).getTime() < SEND_COOLDOWN_MS) {
    throw Object.assign(new Error("Please wait before requesting another verification email"), { status: 429 });
  }
  const token = crypto.randomBytes(32).toString("hex");
  const base = (process.env.PUBLIC_FRONTEND_URL || "").replace(/\/$/, "");
  if (!/^https?:\/\//.test(base)) throw Object.assign(new Error("PUBLIC_FRONTEND_URL must be configured"), { status: 503 });
  const url = `${base}/verify-email?token=${encodeURIComponent(token)}`;
  // Save hash before sending, and clear on delivery failure. No plaintext token stored.
  account.emailVerificationTokenHash = sha(token);
  account.emailVerificationExpiresAt = new Date(now + TOKEN_DURATION_MS);
  account.emailVerificationSentAt = new Date(now);
  account.verificationRequired = true;
  await account.save();
  try {
    await transport.sendMail({
      from: process.env.SMTP_FROM || smtp.username,
      to: account.email,
      subject: "Verify your CargoMate email address",
      text: `Verify your CargoMate email by opening this link (expires in 30 minutes): ${url}`,
      html: `<div style="font-family:Arial,sans-serif;max-width:540px;margin:auto;padding:28px;border:1px solid #d7eeea;border-radius:18px"><h2 style="color:#002259">Verify your CargoMate email</h2><p>Use the button below to confirm your address. This link expires in 30 minutes.</p><a href="${url}" style="display:inline-block;background:#14B8A6;color:white;padding:13px 24px;border-radius:8px;text-decoration:none;font-weight:bold">Verify Email</a><p style="font-size:12px;color:#64748b">If you did not register, ignore this email.</p></div>`,
    });
    return true;
  } catch (err) {
    account.emailVerificationTokenHash = undefined;
    account.emailVerificationExpiresAt = undefined;
    account.emailVerificationSentAt = undefined;
    await account.save();
    throw Object.assign(new Error("Verification email delivery failed; check SMTP configuration"), { status: 503, cause: err });
  }
}
async function verifyToken(token) {
  if (typeof token !== "string" || !/^[a-f0-9]{64}$/.test(token)) return null;
  const User = require("../models/user");
  const hashed = sha(token);
  const account = await User.findOne({
    emailVerificationTokenHash: hashed,
    emailVerificationExpiresAt: { $gt: new Date() },
  });
  if (!account) return null;
  // Atomic one-use token consumption; prevents double verification.
  return User.findOneAndUpdate({ _id: account._id, emailVerificationTokenHash: hashed, emailVerificationExpiresAt: { $gt: new Date() } }, {
    $set: { emailVerified: true, verificationRequired: false },
    $unset: { emailVerificationTokenHash: "", emailVerificationExpiresAt: "", emailVerificationSentAt: "" },
  }, { new: true });
}
module.exports = { getVerificationSettings, sendVerificationEmail, verifyToken, testSmtpConnection, sendSystemEmail, sha, TOKEN_DURATION_MS };
