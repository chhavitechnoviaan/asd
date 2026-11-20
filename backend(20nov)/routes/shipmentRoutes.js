// const express = require("express");
// const router = express.Router();
// const upload = require("../middleware/upload");
// const shipmentController = require("../controllers/shipmentController");
// const { protect, adminOnly } = require("../middleware/authMiddleware");
// const subscriptionLimit = require("../middleware/subscriptionLimit");
// router.post("/step1", protect, subscriptionLimit("shipmentPlanning"), shipmentController.saveStep1);
// router.put("/step2/:id", protect, shipmentController.saveStep2);
// router.put("/step3/:id", protect, shipmentController.saveStep3);
// router.post("/upload-docs", protect, upload.single("file"), shipmentController.uploadDocs);
// router.delete("/:shipmentId/documents/:documentId", protect, shipmentController.deleteShipmentDocument);
// router.get("/", protect, shipmentController.getShipments);
// router.get("/stats", protect, shipmentController.getStats);
// router.get("/admin/all", protect, adminOnly, shipmentController.getAllShipmentsForAdmin);
// const {hasPermission} = require("../middleware/permissionAccess");
// const adminOrShipmentWorkflow = action => (req,res,next) => {
//   if (req.user?.isInternalStaff) {
//     return hasPermission(req.user,"shipment",action) ? next() : res.status(403).json({status:0,message:`Permission denied: shipment.${action}`});
//   }
//   return adminOnly(req,res,next);
// };
// router.get("/:id/details", protect, shipmentController.getShipmentDetails);
// router.put("/:id", protect, shipmentController.updateShipment);
// router.patch("/:id/status", protect, shipmentController.updateShipmentStatus);
// router.patch("/:id/save-draft", protect, shipmentController.saveDraft);
// router.post("/:id/analyze", protect, subscriptionLimit("shipmentCost"), shipmentController.analyzeShipment);
// router.post("/:id/submit", protect, shipmentController.submitShipment);
// router.post("/:id/approve", protect, adminOrShipmentWorkflow("approve"), shipmentController.approveShipment);
// router.post("/:id/reject", protect, adminOrShipmentWorkflow("reject"), shipmentController.rejectShipment);
// router.post("/:id/hold", protect, adminOnly, shipmentController.holdShipment);
// router.post("/:id/assign-carrier", protect, adminOnly, shipmentController.assignCarrier);
// router.get("/:id/tracking", protect, shipmentController.getShipmentTracking);
// router.post("/:id/tracking", protect, adminOnly, shipmentController.addTrackingUpdate);
// module.exports = router;


const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const shipmentController = require("../controllers/shipmentController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const subscriptionLimit = require("../middleware/subscriptionLimit");
router.post("/step1", protect, subscriptionLimit("shipmentPlanning"), shipmentController.saveStep1);
router.put("/step2/:id", protect, shipmentController.saveStep2);
router.put("/step3/:id", protect, shipmentController.saveStep3);
router.post("/upload-docs", protect, upload.single("file"), shipmentController.uploadDocs);
router.delete("/:shipmentId/documents/:documentId", protect, shipmentController.deleteShipmentDocument);
router.get("/", protect, shipmentController.getShipments);
router.get("/stats", protect, shipmentController.getStats);
router.get("/admin/all", protect, adminOnly, shipmentController.getAllShipmentsForAdmin);
const {hasPermission} = require("../middleware/permissionAccess");
const adminOrShipmentWorkflow = action => (req,res,next) => {
  if (req.user?.isInternalStaff) {
    return hasPermission(req.user,"shipment",action) ? next() : res.status(403).json({status:0,message:`Permission denied: shipment.${action}`});
  }
  return adminOnly(req,res,next);
};
router.get("/:id/details", protect, (req, res, next) => {
  if (req.user?.isInternalStaff && !hasPermission(req.user, "shipment", "view")) {
    return res.status(403).json({ status: 0, message: "Permission denied: shipment.view" });
  }
  next();
}, shipmentController.getShipmentDetails);
router.put("/:id", protect, shipmentController.updateShipment);
router.patch("/:id/status", protect, shipmentController.updateShipmentStatus);
router.patch("/:id/save-draft", protect, shipmentController.saveDraft);
router.post("/:id/analyze", protect, subscriptionLimit("shipmentCost"), shipmentController.analyzeShipment);
router.post("/:id/submit", protect, shipmentController.submitShipment);
router.post("/:id/approve", protect, adminOrShipmentWorkflow("approve"), shipmentController.approveShipment);
router.post("/:id/reject", protect, adminOrShipmentWorkflow("reject"), shipmentController.rejectShipment);
router.post("/:id/hold", protect, adminOnly, shipmentController.holdShipment);
router.post("/:id/assign-carrier", protect, adminOnly, shipmentController.assignCarrier);
router.get("/:id/tracking", protect, shipmentController.getShipmentTracking);
router.post("/:id/tracking", protect, adminOnly, shipmentController.addTrackingUpdate);
module.exports = router;