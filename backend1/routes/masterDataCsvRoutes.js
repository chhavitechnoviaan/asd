const express = require("express");
const router = express.Router();

const {
  uploadCsvData,
  getCsvData,
  deleteCsvBatch,
} = require("../controllers/masterDataCsvController");

const { protect, adminOnly, adminOrStaff } = require("../middleware/authMiddleware");

// Upload CSV
router.post("/upload", protect, adminOnly, uploadCsvData);

// Delete complete CSV batch
router.delete("/batch/:batchId", protect, adminOnly, deleteCsvBatch);

// Fetch Import / Export data
router.get("/:dataType", protect, adminOrStaff("masterData", "view"), (req, res, next) => {
  if (!["import", "export"].includes(req.params.dataType)) return res.status(400).json({ status: 0, message: "Invalid data type" });
  return next();
}, getCsvData);

module.exports = router;