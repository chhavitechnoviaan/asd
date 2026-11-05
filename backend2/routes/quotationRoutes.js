// const express = require("express");

// const router = express.Router();

// const quotationController =
//   require(
//     "../controllers/quotationController"
//   );
// const {protect,adminOnly} = require("../middleware/authMiddleware");

// // Admin creates quotation
// router.post(
//   "/",
//   protect, adminOnly,
//   quotationController.createQuotation
// );


// // Get quotations of shipment
// router.get(
//   "/shipment/:shipmentId",
//   protect,
//   quotationController.getQuotationByShipment
// );

// router.get(
//     "/my-quotations",
//     protect,
//     quotationController.getMySharedQuotations
//   );
// // Get single quotation
// router.get(
//   "/:id",
//   protect,
//   quotationController.getQuotationById
// );


// // Admin shares quotation
// router.put(
//   "/:id/share",
//   protect, adminOnly,
//   quotationController.shareQuotation
// );


// // B2B accepts quotation
// router.put(
//   "/:id/accept",protect,
//   quotationController.acceptQuotation
// );




// // B2B rejects quotation
// router.put(
//   "/:id/reject",protect,
//   quotationController.rejectQuotation
// );


// module.exports = router;


// mahima code //
const express = require("express");
const router = express.Router();

const quotationController = require("../controllers/quotationController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

// Admin creates quotation
router.post("/", protect, adminOnly, quotationController.createQuotation);

// Get quotations of a shipment
router.get("/shipment/:shipmentId", protect, quotationController.getQuotationByShipment);

// Logged-in B2B user's shared quotations
router.get("/my-quotations", protect, quotationController.getMySharedQuotations);

// Get a single quotation
router.get("/:id", protect, quotationController.getQuotationById);

// Admin shares quotation
router.put("/:id/share", protect, adminOnly, quotationController.shareQuotation);

// Admin updates quotation charges
router.put("/:id/charges", protect, adminOnly, quotationController.updateQuotationCharges);

// Logged-in customer accepts quotation
router.put("/:id/accept", protect, quotationController.acceptQuotation);

// Logged-in customer rejects quotation
router.put("/:id/reject", protect, quotationController.rejectQuotation);

module.exports = router;
