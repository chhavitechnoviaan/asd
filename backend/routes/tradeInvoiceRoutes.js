// const express = require("express");
// const router = express.Router();
// const { protect } = require("../middleware/authMiddleware");
// const {

// getDashboard,
// getInvoices,
// getStatusSummary,
// getValueTrend,
// getRecentInvoices,
// getTopParties,
// getOverdueInvoices,
// getInsights,
// getFilterOptions

// } = require("../controllers/tradeInvoiceController");

// router.get("/dashboard",protect, getDashboard);

// router.get("/",protect, getInvoices);

// router.get("/status-summary",protect, getStatusSummary);

// router.get("/value-trend",protect, getValueTrend);

// router.get("/recent",protect, getRecentInvoices);

// router.get("/top-parties",protect, getTopParties);

// router.get("/overdue",protect, getOverdueInvoices);

// router.get("/insights",protect, getInsights);

// router.get("/filter-options",protect, getFilterOptions);

// module.exports = router;


// mahima code //

const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getDashboard,
  getInvoices,
  getStatusSummary,
  getValueTrend,
  getRecentInvoices,
  getTopParties,
  getOverdueInvoices,
  getInsights,
  getFilterOptions,
  createInvoiceFromAcceptedQuotation,
  getInvoiceById,
  sendInvoice,
  updateInvoiceStatus,
} = require("../controllers/tradeInvoiceController");

router.use(protect);

// Invoice workflow
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