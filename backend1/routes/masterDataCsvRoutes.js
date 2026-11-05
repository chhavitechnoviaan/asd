const express = require("express");
const router = express.Router();

const {
  uploadCsvData,
  getCsvData,
  deleteCsvBatch,
} = require("../controllers/masterDataCsvController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

// Upload CSV
router.post("/upload", protect, adminOnly, uploadCsvData);

// Delete complete CSV batch
router.delete("/batch/:batchId", protect, adminOnly, deleteCsvBatch);

// Fetch Import / Export data
router.get("/:dataType", protect, adminOnly, getCsvData);

module.exports = router;