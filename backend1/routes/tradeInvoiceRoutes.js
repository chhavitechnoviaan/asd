const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  getDashboard, getInvoices, getStatusSummary, getValueTrend, getRecentInvoices,
  getTopParties, getOverdueInvoices, getInsights, getFilterOptions,
  createInvoiceFromAcceptedQuotation, getInvoiceById, sendInvoice, updateInvoiceStatus,
} = require("../controllers/tradeInvoiceController");
router.use(protect);
router.post("/", createInvoiceFromAcceptedQuotation);
router.get("/dashboard", getDashboard);
router.get("/status-summary", getStatusSummary);
router.get("/value-trend", getValueTrend);
router.get("/recent", getRecentInvoices);
router.get("/top-parties", getTopParties);
router.get("/overdue", getOverdueInvoices);
router.get("/insights", getInsights);
router.get("/filter-options", getFilterOptions);
router.put("/:id/send", sendInvoice);
router.put("/:id/status", updateInvoiceStatus);
router.get("/:id", getInvoiceById);
router.get("/", getInvoices);
module.exports = router;