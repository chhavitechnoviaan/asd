// // const express = require("express");
// // const router = express.Router();
// // const upload = require("../middleware/upload");

// // const shipmentController = require("../controllers/shipmentController");
// // const { protect , adminOnly} = require("../middleware/authMiddleware");
// // router.post("/step1", protect, require("../middleware/subscriptionLimit")("shipmentPlanning"), shipmentController.saveStep1);
// // router.put("/step2/:id", protect, shipmentController.saveStep2);
// // router.put("/step3/:id", protect, shipmentController.saveStep3);
// // router.post(
// //   "/upload-docs",
// //   protect,
// //   upload.single("file"),
// //   shipmentController.uploadDocs
// // );
// // router.get("/", protect, shipmentController.getShipments);
// // router.get("/stats", protect, shipmentController.getStats);
// // router.patch(
// //   "/:id/status",
// //   protect,
// //   shipmentController.updateShipmentStatus
// // );
// // router.patch("/:id/save-draft", protect, shipmentController.saveDraft);

// // router.post("/:id/analyze", protect, require("../middleware/subscriptionLimit")("shipmentCost"), shipmentController.analyzeShipment);

// // router.post("/:id/submit", protect, shipmentController.submitShipment);
// // router.get("/:id/details", protect, shipmentController.getShipmentDetails);

// // router.post(
// //     "/:id/approve",
// //     protect,
// //     adminOnly,
// //     shipmentController.approveShipment
// //   );
  
// //   router.post(
// //     "/:id/reject",
// //     protect,
// //     adminOnly,
// //     shipmentController.rejectShipment
// //   );
  
// //   router.post(
// //     "/:id/hold",
// //     protect,
// //     adminOnly,
// //     shipmentController.holdShipment
// //   );

// // router.get(
// //     "/admin/all",
// //     protect,
// //     adminOnly,
// //     shipmentController.getAllShipmentsForAdmin
// //   );


// //   router.post(
// //     "/:id/assign-carrier",
// //     protect,
// //     adminOnly,
// //     shipmentController.assignCarrier
// // );
// // router.get("/:id/tracking",protect,shipmentController.getShipmentTracking);
// // router.post(
// //   "/:id/tracking",
// //   protect,
// //   adminOnly,
// //   shipmentController.addTrackingUpdate
// // );

// // module.exports = router;


// // mahima code //


// const express = require("express");
// const router = express.Router();

// const upload = require("../middleware/upload");
// const shipmentController = require("../controllers/shipmentController");
// const { protect, adminOnly } = require("../middleware/authMiddleware");
// const subscriptionLimit = require("../middleware/subscriptionLimit");

// // ==========================================
// // SHIPMENT CREATION & MULTI-STEP FORM
// // ==========================================

// router.post(
//   "/step1",
//   protect,
//   subscriptionLimit("shipmentPlanning"),
//   shipmentController.saveStep1
// );

// router.put("/step2/:id", protect, shipmentController.saveStep2);
// router.put("/step3/:id", protect, shipmentController.saveStep3);

// // ==========================================
// // DOCUMENT UPLOAD
// // ==========================================

// router.post(
//   "/upload-docs",
//   protect,
//   upload.single("file"),
//   shipmentController.uploadDocs
// );

// // ==========================================
// // SHIPMENT LIST & STATS
// // ==========================================

// router.get("/", protect, shipmentController.getShipments);
// router.get("/stats", protect, shipmentController.getStats);

// router.get(
//   "/admin/all",
//   protect,
//   adminOnly,
//   shipmentController.getAllShipmentsForAdmin
// );

// // ==========================================
// // SHIPMENT DETAILS & UPDATE
// // ==========================================

// router.get(
//   "/:id/details",
//   protect,
//   shipmentController.getShipmentDetails
// );

// // From Second Code
// router.put(
//   "/:id",
//   protect,
//   shipmentController.updateShipment
// );

// // ==========================================
// // STATUS, DRAFT & ANALYSIS
// // ==========================================

// router.patch(
//   "/:id/status",
//   protect,
//   shipmentController.updateShipmentStatus
// );

// router.patch(
//   "/:id/save-draft",
//   protect,
//   shipmentController.saveDraft
// );

// router.post(
//   "/:id/analyze",
//   protect,
//   subscriptionLimit("shipmentCost"),
//   shipmentController.analyzeShipment
// );

// router.post(
//   "/:id/submit",
//   protect,
//   shipmentController.submitShipment
// );

// // ==========================================
// // ADMIN APPROVAL & CARRIER
// // ==========================================

// router.post(
//   "/:id/approve",
//   protect,
//   adminOnly,
//   shipmentController.approveShipment
// );

// router.post(
//   "/:id/reject",
//   protect,
//   adminOnly,
//   shipmentController.rejectShipment
// );

// router.post(
//   "/:id/hold",
//   protect,
//   adminOnly,
//   shipmentController.holdShipment
// );

// router.post(
//   "/:id/assign-carrier",
//   protect,
//   adminOnly,
//   shipmentController.assignCarrier
// );

// // ==========================================
// // SHIPMENT TRACKING
// // ==========================================

// // From First Code
// router.get(
//   "/:id/tracking",
//   protect,
//   shipmentController.getShipmentTracking
// );

// router.post(
//   "/:id/tracking",
//   protect,
//   adminOnly,
//   shipmentController.addTrackingUpdate
// );

// module.exports = router;


// mahima code ends //


const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload");
const shipmentController = require("../controllers/shipmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const subscriptionLimit = require("../middleware/subscriptionLimit");

// ==========================================
// SHIPMENT CREATION & MULTI-STEP FORM
// ==========================================

router.post(
  "/step1",
  protect,
  subscriptionLimit("shipmentPlanning"),
  shipmentController.saveStep1
);

router.put(
  "/step2/:id",
  protect,
  shipmentController.saveStep2
);

router.put(
  "/step3/:id",
  protect,
  shipmentController.saveStep3
);

// ==========================================
// DOCUMENT UPLOAD & DELETE
// ==========================================

router.post(
  "/upload-docs",
  protect,
  upload.single("file"),
  shipmentController.uploadDocs
);

router.delete(
  "/:shipmentId/documents/:documentId",
  protect,
  shipmentController.deleteShipmentDocument
);

// ==========================================
// SHIPMENT LIST, STATS & ADMIN LIST
// ==========================================

router.get(
  "/",
  protect,
  shipmentController.getShipments
);

router.get(
  "/stats",
  protect,
  shipmentController.getStats
);

router.get(
  "/admin/all",
  protect,
  adminOnly,
  shipmentController.getAllShipmentsForAdmin
);

// ==========================================
// SHIPMENT DETAILS & UPDATE
// ==========================================

router.get(
  "/:id/details",
  protect,
  shipmentController.getShipmentDetails
);

router.put(
  "/:id",
  protect,
  shipmentController.updateShipment
);

// ==========================================
// STATUS, DRAFT, ANALYSIS & SUBMISSION
// ==========================================

router.patch(
  "/:id/status",
  protect,
  shipmentController.updateShipmentStatus
);

router.patch(
  "/:id/save-draft",
  protect,
  shipmentController.saveDraft
);

router.post(
  "/:id/analyze",
  protect,
  subscriptionLimit("shipmentCost"),
  shipmentController.analyzeShipment
);

router.post(
  "/:id/submit",
  protect,
  shipmentController.submitShipment
);

// ==========================================
// ADMIN APPROVAL & CARRIER
// ==========================================

router.post(
  "/:id/approve",
  protect,
  adminOnly,
  shipmentController.approveShipment
);

router.post(
  "/:id/reject",
  protect,
  adminOnly,
  shipmentController.rejectShipment
);

router.post(
  "/:id/hold",
  protect,
  adminOnly,
  shipmentController.holdShipment
);

router.post(
  "/:id/assign-carrier",
  protect,
  adminOnly,
  shipmentController.assignCarrier
);

// ==========================================
// SHIPMENT TRACKING
// ==========================================

router.get(
  "/:id/tracking",
  protect,
  shipmentController.getShipmentTracking
);

router.post(
  "/:id/tracking",
  protect,
  adminOnly,
  shipmentController.addTrackingUpdate
);

module.exports = router;
