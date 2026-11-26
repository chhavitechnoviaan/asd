


const express = require("express");
const {
  protect,
  adminOnly
} = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

const router = express.Router();

const {
  // General Settings
  getSettings,
  updateGeneral,
  updatePreferences,
  updateNotifications,
  updateSecurity,
  updateBilling,
  updateTheme,
  changePassword,
  getActivity,
  getAccountSummary,

  // KYC
  uploadKYCDocuments,
  submitKYC,

  // Shipment Form Settings
  getShipmentFormSettings,
  updateShipmentFormSettings,
  resetShipmentFormSettings,

  // Documents Upload Settings
  getDocumentsUploadSettings,
  updateDocumentsUploadSettings,
  resetDocumentsUploadSettings,

} = require("../controllers/settingsController");

// ==========================================
// GENERAL SETTINGS APIs
// ==========================================

router.get("/", protect, getSettings);

router.put("/general", protect, updateGeneral);

router.put("/preferences", protect, updatePreferences);

router.put("/notifications", protect, updateNotifications);

router.put("/security", protect, updateSecurity);

router.put("/billing", protect, updateBilling);

router.put("/theme", protect, updateTheme);

router.put("/change-password", protect, changePassword);

router.get("/activity", protect, getActivity);

router.get("/account-summary", protect, getAccountSummary);

// ==========================================
// KYC APIs (FROM FIRST CODE)
// ==========================================

// Upload multiple KYC documents (max 20 files)
router.post(
  "/kyc-documents",
  protect,
  upload.array("documents", 20),
  uploadKYCDocuments
);

// Submit KYC for verification
router.post(
  "/kyc-submit",
  protect,
  submitKYC
);

// ==========================================
// SHIPMENT FORM SETTINGS (FROM SECOND CODE)
// ==========================================

// Get Shipment Form Settings
// GET - Admin, B2B and User
router.get(
  "/shipment-form",
  protect,
  getShipmentFormSettings
);

// UPDATE - Admin only
router.put(
  "/shipment-form",
  protect,
  adminOnly,
  updateShipmentFormSettings
);

// RESET - Admin only
router.post(
  "/shipment-form/reset",
  protect,
  adminOnly,
  resetShipmentFormSettings
);

// ==========================================
// DOCUMENTS UPLOAD SETTINGS (FROM SECOND CODE)
// ==========================================

// Get Documents Upload Settings
router.get(
  "/documents-upload-settings",
  protect,
  getDocumentsUploadSettings
);

// Update Documents Upload Settings
router.put(
  "/documents-upload-settings",
  protect,
  updateDocumentsUploadSettings
);

// Reset Documents Upload Settings
router.post(
  "/documents-upload-settings/reset",
  protect,
  resetDocumentsUploadSettings
);

// ==========================================
// EXPORT ROUTER
// ==========================================

module.exports = router;
