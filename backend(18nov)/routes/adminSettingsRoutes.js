const express = require("express");

const router = express.Router();

const {
    getSettings,
    updateGeneralSettings,
    updateSocialLogin,
    updateAISettings,
    updateEmailSMS,
    updateSubscription,
    updatePaymentGateway,
    updateDocuments,
    updateFeatures,
    updateSecurity,
    updateMiscellaneous,
    updateNoticeBoard,
    updateWhatsapp
} = require("../controllers/adminSettingsController");

const {
    protect,
    adminOnly
} = require("../middleware/authMiddleware");

router.post("/branding/:kind", protect, adminOnly,
    require("../controllers/adminSettingsController").uploadBrandLogo);

router.get(
    "/",

    protect,
    adminOnly,
    getSettings
);

router.put(
    "/general",

    protect,
    adminOnly,
    updateGeneralSettings
);

router.put(
    "/social",

    protect,
    adminOnly,
    updateSocialLogin
);

router.put(
    "/ai",

    protect,
    adminOnly,
    updateAISettings
);

router.put(
    "/email",

    protect,
    adminOnly,
    updateEmailSMS
);

router.put(
    "/subscription",

    protect,
    adminOnly,
    updateSubscription
);

router.post("/email/test", protect, adminOnly, async (req, res) => {
    try { await require("../services/verificationEmail").testSmtpConnection(); res.json({ success: true, message: "SMTP server authentication verified" }); }
    catch (error) { console.error("SMTP connectivity test failed:", error.message); res.status(error.status || 503).json({ success: false, message: "SMTP connectivity failed. Check host, port, credentials and network access." }); }
});
router.put("/payment", protect, adminOnly, updatePaymentGateway);

router.put("/documents", protect, adminOnly, updateDocuments);

router.put("/features", protect, adminOnly, updateFeatures);

router.put("/security", protect, adminOnly, updateSecurity);

router.put("/misc", protect, adminOnly, updateMiscellaneous);

router.put("/notice", protect, adminOnly, updateNoticeBoard);

router.put("/whatsapp", protect, adminOnly, updateWhatsapp);

module.exports = router;





















