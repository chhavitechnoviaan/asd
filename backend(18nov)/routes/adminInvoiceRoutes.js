const express = require("express");
const router = express.Router();

const {
  createInvoice,
  getInvoicesByShipment,
  getInvoiceById,
  sendInvoice,
} = require("../controllers/adminInvoiceController");

const invoiceUpload = require("../middleware/invoiceUpload");
const { protect } = require("../middleware/authMiddleware");

router.post("/", protect, invoiceUpload.single("attachment"), createInvoice);
router.get("/shipment/:shipmentId", protect, getInvoicesByShipment);
router.put("/:invoiceId/send", protect, sendInvoice);
router.get("/:invoiceId", protect, getInvoiceById);

module.exports = router;