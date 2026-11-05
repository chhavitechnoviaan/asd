const express = require("express");

const router = express.Router();

const {
  getB2BUsers,
  getB2BUserById,
  getB2BUserStats,
  approveKYC,
  rejectKYC,
  suspendB2BUser,
} = require("../controllers/vendorController");

const { protect, adminOnly, adminOrStaff } = require("../middleware/authMiddleware");

// B2B Users

router.get("/", protect, adminOrStaff("vendors", "view"), getB2BUsers);

router.get("/stats/all", protect, adminOrStaff("vendors", "view"), getB2BUserStats);

router.get("/:id", protect, adminOrStaff("vendors", "view"), getB2BUserById);

router.put("/:id",protect,adminOnly,require("../controllers/vendorController").updateB2BUser);
router.delete("/:id",protect,adminOnly,require("../controllers/vendorController").deleteB2BUser);
router.patch("/:id/suspend", protect, adminOnly, suspendB2BUser);

// KYC

router.patch("/:userId/kyc/approve", protect, adminOnly, approveKYC);

router.patch("/:userId/kyc/reject", protect, adminOnly, rejectKYC);

module.exports = router;