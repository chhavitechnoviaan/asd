"use strict";
const User = require("../models/user");
const { getVerificationSettings, sendVerificationEmail, verifyToken } = require("../services/verificationEmail");
exports.request = async (req, res) => {
  const email = String(req.body?.email || "").trim().toLowerCase();
  if (!email || email.length > 254) return res.status(400).json({ message: "Valid email is required" });
  // Generic response prevents email enumeration.
  const response = { message: "If verification is required for this account, a new link will be sent." };
  try {
    const settings = await getVerificationSettings();
    if (!settings.enabled) return res.json(response);
    const account = await User.findOne({ email });
    if (account?.verificationRequired && !account.emailVerified) await sendVerificationEmail(account, settings);
    return res.json(response);
  } catch (error) {
    if (error.status === 429) return res.status(429).json({ message: error.message });
    console.error("Email verification request failed", error.message);
    return res.status(503).json({ message: "Email delivery is unavailable; contact support or retry later." });
  }
};
exports.confirm = async (req, res) => {
  try {
    const account = await verifyToken(req.body?.token);
    if (!account) return res.status(400).json({ message: "This verification link is invalid or expired" });
    res.json({ message: "Email verified. You can now log in." });
  } catch (error) { res.status(500).json({ message: "Verification unavailable" }); }
};
