// // const Shipment = require("../models/Shipment");
// // const ShipmentTracking = require("../models/ShipmentTracking");
// // const ShipmentDocument = require("../models/ShipmentDocument");
// // const ShipmentParty = require("../models/ShipmentParty");
// // const ShipmentCost = require("../models/ShipmentCost");
// // const Activity = require("../models/Activity");
// // const {
// //   shipmentStatusFlow,
// //   canMoveToStatus
// // } = require("../utils/shipmentStatusFlow");

// // exports.saveStep1 = async (req, res) => {
// //   try {

// //     const {
// //       exporter,
// //       shipmentType,
// //       shipmentMode,
// //       shipmentPurpose,
// //       customerType
// //     } = req.body;

// //     const referenceNumber = `REF-${Date.now()}`;
// //     const sbNumber = `SB-${Date.now()}`;

// //     const shipment = await Shipment.create({

// //       userId: req.user._id,

// //       createdByRole: req.user.role,

// //       customerType: customerType || "Individual",

// //       shipmentType,

// //       shipmentMode,

// //       shipmentPurpose,

// //       exporter,

// //       referenceNumber,

// //       sbNumber,

// //       shipmentStatus: "Draft",

// //       approvalStatus: "Pending",

// //       documentStatus: "Pending",

// //       trackingStatus: "Not Started",

// //       paymentStatus: "Pending",

// //       exceptionStatus: "None",

// //       currentStep: 2

// //     });
// //     await Activity.create({

// //       userId: req.user._id,

// //       shipmentId: shipment._id,

// //       type: "SHIPMENT_CREATED",

// //       message: `Shipment ${shipment.referenceNumber} created successfully.`,

// //       meta: {
// //         createdByRole: req.user.role,
// //         shipmentStatus: shipment.shipmentStatus
// //       }

// //     });

// //     return res.status(201).json({
// //       status: 1,
// //       message: "Shipment created successfully.",
// //       data: shipment
// //     });

// //   } catch (error) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: error.message
// //     });

// //   }
// // };

// // exports.saveStep2 = async (req, res) => {
// //   try {

// //     const shipment = await Shipment.findByIdAndUpdate(

// //       req.params.id,

// //       {
// //         route: req.body.route,

// //         importer: req.body.importer,

// //         eta: req.body.eta,

// //         etd: req.body.etd,

// //         incoterm: req.body.incoterm,

// //         currentStep: 3
// //       },

// //       {
// //         new: true,
// //         runValidators: true
// //       }

// //     );

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     await Activity.create({

// //       userId: req.user._id,

// //       shipmentId: shipment._id,

// //       type: "SHIPMENT_UPDATED",

// //       message: "Origin & Destination details updated.",

// //       meta: {
// //         step: 2
// //       }

// //     });

// //     return res.json({

// //       status: 1,

// //       message: "Step 2 completed.",

// //       data: shipment

// //     });

// //   } catch (error) {

// //     return res.status(500).json({

// //       status: 0,

// //       message: error.message

// //     });

// //   }
// // };
  
// // exports.saveStep3 = async (req, res) => {
// //   try {

// //     const shipment = await Shipment.findByIdAndUpdate(

// //       req.params.id,

// //       {

// //         cargo: req.body.cargo,

// //         amount: req.body.amount,

// //         paymentTerms: req.body.paymentTerms,

// //         insuranceRequired: req.body.insuranceRequired,

// //         currency: req.body.currency,

// //         additionalInformation: req.body.additionalInformation,
// //         ...(req.body.customFields && typeof req.body.customFields === "object" && !Array.isArray(req.body.customFields) ? {
// //           customFields: Object.fromEntries(Object.entries(req.body.customFields).filter(([key,value])=>/^[a-z][a-zA-Z0-9_]{0,63}$/.test(key) && typeof value === "string").slice(0,50).map(([key,value])=>[key,value.slice(0,500)]))
// //         } : {}),

// //         currentStep: 4

// //       },

// //       {
// //         new: true,
// //         runValidators: true
// //       }

// //     );

// //     if (!shipment) {

// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });

// //     }

// //     await Activity.create({

// //       userId: req.user._id,

// //       shipmentId: shipment._id,

// //       type: "SHIPMENT_UPDATED",

// //       message: "Cargo & Invoice details updated.",

// //       meta: {
// //         step: 3
// //       }

// //     });

// //     return res.json({

// //       status: 1,

// //       message: "Step 3 completed.",

// //       data: shipment

// //     });

// //   } catch (error) {

// //     return res.status(500).json({

// //       status: 0,

// //       message: error.message

// //     });

// //   }
// // };


// // exports.saveDraft = async (req, res) => {
// //   try {

// //     const shipment = await Shipment.findByIdAndUpdate(

// //       req.params.id,

// //       {
// //         shipmentStatus: "Draft",
// //         lastStatusUpdatedAt: new Date()
// //       },

// //       { new: true }

// //     );

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId: shipment._id,
// //       type: "SHIPMENT_UPDATED",
// //       message: "Shipment saved as draft.",
// //       meta: {
// //         shipmentStatus: shipment.shipmentStatus
// //       }
// //     });

// //     return res.json({
// //       status: 1,
// //       message: "Draft saved successfully.",
// //       data: shipment
// //     });

// //   } catch (error) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: error.message
// //     });

// //   }
// // };

// // exports.analyzeShipment = async (req, res) => {
// //   try {

// //     const shipment = await Shipment.findById(req.params.id)
// //       .populate("cargo.hsCode");

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId: shipment._id,
// //       type: "AI_QUERY",
// //       message: "Shipment analyzed by AI.",
// //       meta: {}
// //     });

// //     return res.json({
// //       status: 1,
// //       message: "Shipment analyzed successfully.",
// //       data: {
// //         riskLevel: "Low",
// //         freightEstimate: shipment.amount || 0,
// //         estimatedTransit: shipment.transitTime || "7-10 Days",
// //         requiredDocuments: [
// //           "Commercial Invoice",
// //           "Packing List",
// //           "Bill of Lading"
// //         ]
// //       }
// //     });

// //   } catch (error) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: error.message
// //     });

// //   }
// // };

// // exports.submitShipment = async (req, res) => {

// //   try {

// //     const shipment = await Shipment.findById(req.params.id);

// //     if (!shipment) {

// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });

// //     }

// //     if (!canMoveToStatus(shipment.shipmentStatus, "Submitted")) {
// //       return res.status(400).json({
// //         status: 0,
// //         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Submitted"`
// //       });
// //     }
    
// //     shipment.shipmentStatus = "Submitted";
// //     shipment.approvalStatus = "Pending";
// //     shipment.currentStep = 5;
// //     shipment.lastStatusUpdatedAt = new Date();

// //     shipment.statusHistory.push({
// //       status: "Submitted",
// //       updatedBy: req.user._id,
// //       remarks: "Shipment submitted for approval"
// //     });

// //     await shipment.save();

// //     await Activity.create({

// //       userId: req.user._id,

// //       shipmentId: shipment._id,

// //       type: "SHIPMENT_SUBMITTED",

// //       message: "Shipment submitted for admin approval.",

// //       meta: {
// //         approvalStatus: "Pending"
// //       }

// //     });

// //     return res.json({

// //       status: 1,

// //       message: "Shipment submitted successfully.",

// //       data: shipment

// //     });

// //   } catch (error) {

// //     return res.status(500).json({

// //       status: 0,

// //       message: error.message

// //     });

// //   }

// // };

// // exports.approveShipment = async (req, res) => {
// //   try {

// //     const shipment = await Shipment.findById(req.params.id);

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     shipment.approvalStatus = "Approved";
// //     if (!canMoveToStatus(shipment.shipmentStatus, "Approved")) {
// //       return res.status(400).json({
// //         status: 0,
// //         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Approved"`
// //       });
// //     }
    
// //     shipment.shipmentStatus = "Approved";
// //     shipment.approvedAt = new Date();
// //     shipment.lastStatusUpdatedAt = new Date();

// //     shipment.statusHistory.push({
// //       status: "Approved",
// //       updatedBy: req.user._id,
// //       remarks: "Shipment approved"
// //     });

// //     await shipment.save();

// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId: shipment._id,
// //       type: "SHIPMENT_APPROVED",
// //       message: "Shipment approved by admin.",
// //       meta: {
// //         approvedBy: req.user._id
// //       }
// //     });

// //     return res.json({
// //       status: 1,
// //       message: "Shipment approved successfully.",
// //       data: shipment
// //     });

// //   } catch (err) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });

// //   }
// // };

// // exports.rejectShipment = async (req, res) => {

// //   try {

// //     const shipment = await Shipment.findById(req.params.id);

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     shipment.approvalStatus = "Rejected";

// //     shipment.lastStatusUpdatedAt = new Date();
// //     shipment.statusHistory.push({
// //       status: shipment.shipmentStatus,
// //       updatedBy: req.user._id,
// //       remarks: req.body.reason || "Shipment rejected by admin"
// //     });
    
// //     await shipment.save();


// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId: shipment._id,
// //       type: "SHIPMENT_REJECTED",
// //       message: "Shipment rejected by admin.",
// //       meta: {
// //         reason: req.body.reason || "",
// //         rejectedBy: req.user._id
// //       }
// //     });

// //     return res.json({
// //       status: 1,
// //       message: "Shipment rejected successfully.",
// //       data: shipment
// //     });

// //   } catch (err) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });

// //   }

// // };

// // exports.holdShipment = async (req, res) => {

// //   try {

// //     const shipment = await Shipment.findById(req.params.id);

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     shipment.approvalStatus = "Correction Required";

// //     shipment.exceptionStatus = "On Hold";
    
// //     shipment.lastStatusUpdatedAt = new Date();
    
// //     shipment.statusHistory.push({
// //       status: shipment.shipmentStatus,
// //       updatedBy: req.user._id,
// //       remarks: req.body.reason || "Shipment placed on hold"
// //     });

// //     shipment.lastStatusUpdatedAt = new Date();

    

// //     await shipment.save();

// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId: shipment._id,
// //       type: "SHIPMENT_ON_HOLD",
// //       message: "Shipment put on hold.",
// //       meta: {
// //         reason: req.body.reason || "",
// //         holdBy: req.user._id
// //       }
// //     });

// //     return res.json({
// //       status: 1,
// //       message: "Shipment placed on hold.",
// //       data: shipment
// //     });

// //   } catch (err) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });

// //   }

// // };

// // exports.getAllShipmentsForAdmin = async (req, res) => {
// //   try {

// //     const {
// //       page = 1,
// //       limit = 10,
// //       search,
// //       shipmentStatus,
// //       approvalStatus,
// //       shipmentMode,
// //       shipmentType
// //     } = req.query;

// //     const query = {};

// //     if (search) {
// //       query.$or = [
// //         {
// //           referenceNumber: {
// //             $regex: search,
// //             $options: "i"
// //           }
// //         },
// //         {
// //           sbNumber: {
// //             $regex: search,
// //             $options: "i"
// //           }
// //         },
// //         {
// //           "exporter.companyName": {
// //             $regex: search,
// //             $options: "i"
// //           }
// //         }
// //       ];
// //     }

// //     if (shipmentStatus)
// //       query.shipmentStatus = shipmentStatus;

// //     if (approvalStatus)
// //       query.approvalStatus = approvalStatus;

// //     if (shipmentMode)
// //       query.shipmentMode = shipmentMode;

// //     if (shipmentType)
// //       query.shipmentType = shipmentType;

// //     const total = await Shipment.countDocuments(query);

// //     const shipments = await Shipment.find(query)
// //       .populate("userId", "name email role")
// //       .sort({ createdAt: -1 })
// //       .skip((page - 1) * limit)
// //       .limit(Number(limit));

// //     return res.json({

// //       status: 1,

// //       total,

// //       page: Number(page),

// //       totalPages: Math.ceil(total / limit),

// //       data: shipments

// //     });

// //   } catch (err) {

// //     return res.status(500).json({

// //       status: 0,

// //       message: err.message

// //     });

// //   }
// // };

// // exports.assignCarrier = async (req, res) => {
// //   try {

// //     const {
// //       name,
// //       code,
// //       contactPerson,
// //       mobile,
// //       email
// //     } = req.body;

// //     const shipment = await Shipment.findById(req.params.id);

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found"
// //       });
// //     }

// //     shipment.carrier = {
// //       name,
// //       code,
// //       contactPerson,
// //       mobile,
// //       email
// //     };

// //     shipment.assignedCarrierAt = new Date();
// //     shipment.assignedBy = req.user._id;

// //     if (!canMoveToStatus(shipment.shipmentStatus, "Carrier Assigned")) {
// //       return res.status(400).json({
// //         status: 0,
// //         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Carrier Assigned"`
// //       });
// //     }
    
// //     shipment.shipmentStatus = "Carrier Assigned";
// //     shipment.lastStatusUpdatedAt = new Date();
// //     shipment.statusHistory.push({
// //       status: "Carrier Assigned",
// //       updatedBy: req.user._id,
// //       remarks: "Carrier assigned"
// //     });

// //     await shipment.save();

// //     await Activity.create({

// //       userId: req.user._id,

// //       shipmentId: shipment._id,

// //       type: "SHIPMENT_STATUS_CHANGED",

// //       message: "Carrier assigned successfully.",

// //       meta: {
// //         carrier: shipment.carrier
// //       }

// //     });

// //     return res.json({

// //       status: 1,

// //       message: "Carrier assigned successfully.",

// //       data: shipment

// //     });

// //   } catch (err) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });

// //   }
// // };

// // exports.uploadDocs = async (req, res) => {
// //   try {

// //     const { shipmentId, documentType, required } = req.body;

// //     if (!req.file) {
// //       return res.status(400).json({
// //         status: 0,
// //         message: "Please upload a file."
// //       });
// //     }

// //     const shipment = await Shipment.findById(shipmentId);

// //     if (!shipment) {
// //       return res.status(404).json({
// //         status: 0,
// //         message: "Shipment not found."
// //       });
// //     }

// //     const document = await ShipmentDocument.create({
// //       shipmentId,
    
// //       documentName: documentType,
    
// //       documentType: required === "true"
// //         ? "Required"
// //         : "If Applicable",
    
// //       status: "Uploaded",
    
// //       fileUrl: `/uploads/documents/${req.file.filename}`,
    
// //       fileName: req.file.originalname,
    
// //       fileSize: req.file.size.toString(),
    
// //       uploadedBy: req.user._id,
    
// //       required: required === "true"
// //     });

// //     await Activity.create({
// //       userId: req.user._id,
// //       shipmentId,
// //       type: "DOCUMENT_UPLOADED",
// //       message: `${documentType} uploaded successfully.`
// //     });

// //     return res.status(200).json({
// //       status: 1,
// //       message: "Document uploaded successfully.",
// //       data: document
// //     });

// //   } catch (err) {

// //     return res.status(500).json({
// //       status: 0,
// //       message: err.message
// //     });

// //   }
// // };

// // exports.getShipments = async (req, res) => {
// //     const { status, mode, search } = req.query;
  
// //     let query = {
// //       userId: req.user._id
// //     };
// //     if (status)
// //     query.shipmentStatus = status;
// //     if (mode) query["route.mode"] = mode;
  
// //     if (search) {
// //       query.$or = [
// //         { sbNumber: { $regex: search, $options: "i" } },
// //         { "exporter.companyName": { $regex: search, $options: "i" } }
// //       ];
// //     }
  
// //     const data = await Shipment.find(query)
// //       .populate("cargo.hsCode")
// //       .sort({ createdAt: -1 });
  
// //     res.json({ status: 1, data });
// //   };

// //   exports.getStats = async (req, res) => {

// //     const total = await Shipment.countDocuments();
  
// //     const inTransit = await Shipment.countDocuments({
// //       shipmentStatus:"In Transit"
// //     });
  
// //     const delivered = await Shipment.countDocuments({
// //       shipmentStatus:"Delivered"
// //     });
  
// //     const pendingDocs = await Shipment.countDocuments({
// //       documentStatus:"Pending"
// //     });
  
// //     const customHold = await Shipment.countDocuments({
// //       exceptionStatus:"On Hold"
// //     });
  
// //     const revenueAgg = await Shipment.aggregate([
// //       {
// //         $group: {
// //           _id: null,
// //           total: { $sum: "$revenue" }
// //         }
// //       }
// //     ]);
  
// //     res.json({
// //       status: 1,
// //       data: {
// //         total,
// //         inTransit,
// //         delivered,
// //         pendingDocs,
// //         customHold,
// //         revenue: revenueAgg[0]?.total || 0
// //       }
// //     });
// //   };

// //   exports.updateShipmentStatus = async (req, res) => {

// //     try {

// //         const shipment = await Shipment.findById(req.params.id);

// //         if (!shipment) {
// //             return res.status(404).json({
// //                 status: 0,
// //                 message: "Shipment not found"
// //             });
// //         }

        
// //         const currentStatus = shipment.shipmentStatus;
// //         const nextStatus = req.body.status;

// //         if (!canMoveToStatus(currentStatus, nextStatus)) {
// //           return res.status(400).json({
// //             status: 0,
// //             message: `Invalid transition from ${currentStatus} to ${nextStatus}`
// //           });
// //         }

// //             if (
// //               nextStatus === "Approved" &&
// //               req.user.role !== "admin"
// //           ) {
// //               return res.status(403).json({
// //                   status: 0,
// //                   message: "Only admin can approve shipments."
// //               });
// //           }


    

// //         shipment.shipmentStatus = nextStatus;
// //         shipment.lastStatusUpdatedAt = new Date();

// //         await shipment.save();

// //         await Activity.create({

// //             userId: req.user._id,

// //             shipmentId: shipment._id,

// //             type: "SHIPMENT_STATUS_CHANGED",

// //             message: `Shipment moved from ${currentStatus} to ${nextStatus}`,

// //             meta: {

// //                 from: currentStatus,

// //                 to: nextStatus

// //             }

// //         });

// //         return res.json({

// //             status: 1,

// //             message: "Shipment status updated.",

// //             data: shipment

// //         });

// //     } catch (err) {

// //         return res.status(500).json({

// //             status: 0,

// //             message: err.message

// //         });

// //     }

// // };

// //   exports.getShipmentDetails = async (req, res) => {
// //     try {
// //       const shipmentId = req.params.id;
// //       const shipment = await Shipment.findById(shipmentId)
// // .populate("cargo.hsCode")
// // .populate("userId","name email");
  
// //       if (!shipment) {
// //         return res.status(404).json({
// //           status: 0,
// //           message: "Shipment not found"
// //         });
// //       }
// //       const tracking = await ShipmentTracking.find({
// //         shipmentId
// //       }).sort({ createdAt: 1 });
// //       const documents = await ShipmentDocument.find({
// //         shipmentId
// //       });
// //       const parties = await ShipmentParty.find({
// //         shipmentId
// //       });
// //       const costSummary = await ShipmentCost.findOne({
// //         shipmentId
// //       });
// //       const activity = await Activity.find({
// //         shipmentId
// //       }).sort({ createdAt: -1 });
// //       const exporter =
// //         parties.find(p => p.type === "Exporter") || null;
// //       const importer =
// //         parties.find(p => p.type === "Importer") || null;
// //       const notifyParty =
// //         parties.find(p => p.type === "Notify") || null;
// //       const header = {
// //         shipmentId: shipment.sbNumber,
// //         shipmentStatus: shipment.shipmentStatus,
// //         route: {
// //           originCountry: shipment.route?.originCountry,
// //           originCity: shipment.route?.originCity,
// //           destinationCountry: shipment.route?.destinationCountry,
// //           destinationCity: shipment.route?.destinationCity
// //         },
// //         etd: shipment.etd,
// //         eta: shipment.eta,
// //         goods: shipment.cargo.productName,
// //         estimatedCost: shipment.estimatedCost || 0,
// //         transitTime: shipment.transitTime || "-"
// //       };
// //       const shipmentInfo = {
// //         shipmentId: shipment.sbNumber,
// //         mode: shipment.route.mode,
// //         carrier: shipment.carrier,
// //         hsCode: shipment.cargo.hsCode,
// //         goods: shipment.cargo.productName,
// //         quantity: shipment.cargo.quantity,
// //         weight: shipment.cargo.weight,
// //         incoterm: shipment.incoterm,
// //         awbNumber: shipment.awbNumber,
// //         totalVolume: shipment.totalVolume,
// //         origin: {
// //           country: shipment.route?.originCountry,
// //           city: shipment.route?.originCity
// //         },
        
// //         destination: {
// //           country: shipment.route?.destinationCountry,
// //           city: shipment.route?.destinationCity
// //         },
// //         etd: shipment.etd,
// //         eta: shipment.eta,
// //         transitTime: shipment.transitTime,
// //         lastUpdated: shipment.lastUpdated
// //       };
// //       const overview = {
// //         status: shipment.shipmentStatus,
// //         estimatedCost: shipment.estimatedCost,
// //         paidAmount: shipment.paidAmount,
// //         balanceAmount: shipment.balanceAmount,
// //         paymentStatus: shipment.paymentStatus,
// //         createdOn: shipment.createdAt,
// //         createdBy: shipment.userId,
// //         notes:shipment.notes,
// //         additionalInformation:shipment.additionalInformation
// //       };
  
// //       res.json({
// //         status: 1,
// //         message: "Shipment details fetched successfully",
  
// //         data: {
  
// //           header,
  
// //           tracking,
  
// //           shipmentInfo,
  
// //           overview,
  
// //           documents,
  
// //           parties: {
// //             exporter,
// //             importer,
// //             notifyParty
// //           },

// //           notes: shipment.notes,
  
// //           costSummary,
  
// //           activity
  
// //         }
  
// //       });
  
// //     } catch (err) {
  
// //       res.status(500).json({
// //         status: 0,
// //         message: err.message
// //       });
  
// //     }
// //   };


// //   exports.getShipmentTracking = async (req, res) => {
// //     try {
  
// //       const shipmentId = req.params.id;
// //       const shipment = await Shipment.findById(shipmentId)
// //         .populate("cargo.hsCode");
  
// //       if (!shipment) {
// //         return res.status(404).json({
// //           status: 0,
// //           message: "Shipment not found"
// //         });
// //       }
// //       const trackingTimeline = await ShipmentTracking.find({
// //         shipmentId
// //       }).sort({ createdAt: 1 });
// //       const currentLocation = trackingTimeline.find(
// //         item => item.current === true
// //       );
// //       const parties = await ShipmentParty.find({
// //         shipmentId
// //       });
// //       const documents = await ShipmentDocument.find({
// //         shipmentId
// //       });
// //       const notifications = await Activity.find({
// //         shipmentId
// //       })
// //         .sort({ createdAt: -1 })
// //         .limit(5);
// //       const exporter =
// //         parties.find(x => x.type === "Exporter") || null;
// //       const importer =
// //         parties.find(x => x.type === "Importer") || null;
// //       const notifyParty =
// //         parties.find(x => x.type === "Notify") || null;
// //       const header = {
// //         shipmentId: shipment.sbNumber,
// //         referenceNumber: shipment.referenceNumber,
      
// //         shipmentStatus: shipment.shipmentStatus,
// //         approvalStatus: shipment.approvalStatus,
// //         trackingStatus: shipment.trackingStatus,
      
// //         mode: shipment.route.mode,
      
// //         route: {
// //           origin: {
// //             country: shipment.route.originCountry,
// //             city: shipment.route.originCity
// //           },
// //           destination: {
// //             country: shipment.route.destinationCountry,
// //             city: shipment.route.destinationCity
// //           }
// //         },
      
// //         etd: shipment.etd,
// //         eta: shipment.eta,
// //         transitTime: shipment.transitTime,
// //         estimatedCost: shipment.estimatedCost
// //       };
// //       const liveTracking = {
// //         location: currentLocation?.location || null,
// //         currentStatus: currentLocation?.status || shipment.shipmentStatus,
// //         lastUpdate: currentLocation?.createdAt || null
// //       };
// //       const shipmentInfo = {
// //         shipmentId: shipment.sbNumber,
// //         carrier: shipment.carrier,
// //         route: shipment.route,
// //         quantity: shipment.cargo.quantity,
// //         weight: shipment.cargo.weight,
// //         volume: shipment.cargo.volumeCBM
// //       };
// //       const transportInfo = {
// //         awbNumber: shipment.awbNumber,
// //         incoterm: shipment.incoterm,
// //         carrier: shipment.carrier,
// //         etd: shipment.etd,
// //         eta: shipment.eta,
// //         transitTime: shipment.transitTime
// //       };
  
// //       res.json({
// //         status: 1,
// //         message: "Shipment tracking fetched successfully",
  
// //         data: {
  
// //           header,
  
// //           trackingTimeline,
  
// //           liveTracking,
  
// //           shipmentInfo,
  
// //           transportInfo,
  
// //           parties: {
// //             exporter,
// //             importer,
// //             notifyParty
// //           },
  
// //           documents,
  
// //           notifications
  
// //         }
  
// //       });
  
// //     } catch (err) {
  
// //       res.status(500).json({
// //         status: 0,
// //         message: err.message
// //       });
  
// //     }
// //   };

// //   exports.addTrackingUpdate = async (req, res) => {
// //     try {
  
// //       const shipmentId = req.params.id;
  
// //       const {
// //         status,
// //         remarks,
// //         location
// //       } = req.body;
// //       const shipment = await Shipment.findById(shipmentId);
  
// //       if (!shipment) {
// //         return res.status(404).json({
// //           status: 0,
// //           message: "Shipment not found"
// //         });
// //       }
// //       if (!status) {
// //         return res.status(400).json({
// //           status: 0,
// //           message: "Tracking status is required"
// //         });
// //       }
// //       await ShipmentTracking.updateMany(
// //         {
// //           shipmentId,
// //           current: true
// //         },
// //         {
// //           current: false
// //         }
// //       );
// //       const tracking = await ShipmentTracking.create({
  
// //         shipmentId,
  
// //         status,
  
// //         location: {
// //           country: location?.country || "",
// //           city: location?.city || "",
// //           address: location?.address || "",
// //           latitude: location?.latitude || null,
// //           longitude: location?.longitude || null
// //         },
  
// //         remarks,
  
// //         updatedBy: req.user._id,
  
// //         current: true
  
// //       });
// // const allowed = canMoveToStatus(
// //   shipment.shipmentStatus,
// //   status
// // );

// // if (!allowed) {
// //   return res.status(400).json({
// //     status: 0,
// //     message: `Shipment cannot move from "${shipment.shipmentStatus}" to "${status}"`
// //   });
// // }
// // shipment.shipmentStatus = status;

// // shipment.trackingStatus = "Tracking Active";

// // shipment.lastStatusUpdatedAt = new Date();
// // shipment.currentLocation = {
// //   country: location?.country || "",
// //   city: location?.city || "",
// //   latitude: location?.latitude || null,
// //   longitude: location?.longitude || null
// // };
// // shipment.statusHistory.push({
// //   status,
// //   updatedBy: req.user._id,
// //   remarks,
// //   updatedAt: new Date()
// // });
// // if (status === "Delivered") {
// //   shipment.deliveredAt = new Date();
// // }
// // if (status === "Closed") {
// //   shipment.closedAt = new Date();
// //   shipment.trackingStatus = "Completed";
// // }

// // await shipment.save();
// //       await Activity.create({
  
// //         userId: req.user._id,
  
// //         shipmentId: shipment._id,
  
// //         type: "TRACKING_UPDATED",
// //         message: `Tracking updated to ${status} at ${location?.city || ""}`
  
// //       });
  
// //       res.status(200).json({
// //         status: 1,
// //         message: "Tracking updated successfully",
// //         data: tracking
// //       });
  
// //     } catch (err) {
  
// //       res.status(500).json({
// //         status: 0,
// //         message: err.message
// //       });
  
// //     }
// //   };


// // mahima code //


// const mongoose = require("mongoose");
// const Shipment = require("../models/Shipment");
// const ShipmentTracking = require("../models/ShipmentTracking");
// const ShipmentDocument = require("../models/ShipmentDocument");
// const ShipmentParty = require("../models/ShipmentParty");
// const ShipmentCost = require("../models/ShipmentCost");
// const Activity = require("../models/Activity");
// // const Shipment = require("../models/Shipment");
// const B2BQuotation = require("../models/quotationModel");
// const TradeInvoice = require("../models/TradeInvoice");
// const Quotation = require("../models/quotationModel");

// const {
//   shipmentStatusFlow,
//   canMoveToStatus
// } = require("../utils/shipmentStatusFlow");

// exports.saveStep1 = async (req, res) => {
//   try {

    
//     const {
//       exporter,
//       shipmentType,
//       shipmentMode,
//       shipmentPurpose,
//       customerType,
//       userId
//     } = req.body;

//     let shipmentUserId = req.user._id;
//     console.log("REQ USER:", req.user);
// console.log("REQ USER ID:", req.user._id);
// console.log("MAPPED USER ID:", req.user.mappedUserId);
// console.log("SHIPMENT USER ID:", shipmentUserId); 

// // Agar admin nahi hai aur kisi mapped user ke liye shipment create kar raha hai
// if (userId) {

//   // Admin kisi ke liye bhi create kar sakta hai
//   if (req.user.roleName === "admin") {
//     shipmentUserId = userId;
//   }

//   // Other users sirf mapped users ke liye create kar sakte hain
//   else {

//     const hasAccess = (req.user.allowedUserIds || []).some(
//       id => id.toString() === userId.toString()
//     );
  
//     if (!hasAccess) {
//       return res.status(403).json({
//         status: 0,
//         message: "You are not authorized to create a shipment for this user"
//       });
//     }
  
//     shipmentUserId = userId;
//   }
// }

//     const referenceNumber = `REF-${Date.now()}`;
//     const sbNumber = `SB-${Date.now()}`;

//     const shipment = await Shipment.create({

//       userId: shipmentUserId,

//       createdByRole: req.user.role,

//       customerType: customerType || "Individual",

//       shipmentType,

//       shipmentMode,

//       shipmentPurpose,

//       exporter,

//       referenceNumber,

//       sbNumber,

//       shipmentStatus: "Draft",

//       approvalStatus: "Pending",

//       documentStatus: "Pending",

//       trackingStatus: "Not Started",

//       paymentStatus: "Pending",

//       exceptionStatus: "None",

//       currentStep: 2

//     });
//     await Activity.create({

//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_CREATED",

//       message: `Shipment ${shipment.referenceNumber} created successfully.`,

//       meta: {
//         createdByRole: req.user.role,
//         shipmentStatus: shipment.shipmentStatus
//       }

//     });

//     return res.status(201).json({
//       status: 1,
//       message: "Shipment created successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// const Setting = require("../models/Setting");

// exports.saveStep2 = async (req, res) => {
//   try {
//     console.log("========== STEP 2 DEBUG ==========");

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     console.log("PARAM ID:", req.params.id);
//     console.log("REQ USER ID:", req.user._id);
//     console.log("MAPPED USER ID:", mappedUserId);

//     // 1. Find shipment
//     const shipmentById = await Shipment.findById(req.params.id);

//     if (!shipmentById) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment ID does not exist"
//       });
//     }

//     // 2. Fetch shipment mode options from Settings
//     const settings = await Setting.findOne({
//       userId: req.user._id
//     }).lean();

//     const modeField = settings?.shipmentForm?.sections
//       ?.flatMap(section => section.fields || [])
//       .find(field => field.key === "shipmentMode");

//     const allowedModes = modeField?.useDropdown
//       ? (modeField.options || [])
//       : [];

//     // 3. Get requested mode
//     const requestedMode =
//       req.body.route?.mode ||
//       req.body.shipmentMode ||
//       "";

//     // 4. Validate mode dynamically
//     if (
//       requestedMode &&
//       modeField?.useDropdown &&
//       !allowedModes.includes(requestedMode)
//     ) {
//       return res.status(400).json({
//         status: 0,
//         message: `Invalid shipment mode. Allowed values: ${allowedModes.join(", ")}`
//       });
//     }

//     // 5. Prepare route data
//     const routeData = {
//       ...(req.body.route || {})
//     };

//     if (requestedMode) {
//       routeData.mode = requestedMode;
//     } else {
//       // Don't save empty string in route.mode
//       delete routeData.mode;
//     }

//     // 6. Update shipment
//     const shipment = await Shipment.findOneAndUpdate(
//       {
//         _id: req.params.id,
//         ...(req.user.roleName === "admin"
//           ? {}
//           : { userId: mappedUserId })
//       },
//       {
//         $set: {
//           route: {
//             ...shipmentById.route?.toObject?.() || shipmentById.route || {},
//             ...routeData
//           },

//           importer: req.body.importer,
//           bookingNo: req.body.bookingNo,
//           eta: req.body.eta,
//           etd: req.body.etd,
//           incoterm: req.body.incoterm,

//           shipmentMode: requestedMode || shipmentById.shipmentMode || "",

//           currentStep: 3
//         }
//       },
//       {
//         new: true,
//         runValidators: true
//       }
//     );

//     console.log("UPDATED SHIPMENT:", shipment);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     return res.json({
//       status: 1,
//       message: "Step 2 completed.",
//       data: shipment
//     });

//   } catch (error) {
//     console.log("STEP 2 ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };
  
// exports.saveStep3 = async (req, res) => {
//   try {
//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? { _id: req.params.id }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId,
//           };

//     const cargoData = {
//       ...(req.body.cargo || {}),
//     };

//     // --------------------------------
//     // HS CODE HANDLING
//     // --------------------------------

//     // Manual HS Code
//     cargoData.hsCodeText = String(
//       cargoData.hsCodeText || ""
//     ).trim();

//     // Master Data HS Code ObjectId
//     if (cargoData.hsCode) {
//       if (
//         mongoose.Types.ObjectId.isValid(cargoData.hsCode)
//       ) {
//         cargoData.hsCode = cargoData.hsCode;
//       } else {
//         // Invalid ObjectId ko manual text treat karo
//         if (!cargoData.hsCodeText) {
//           cargoData.hsCodeText = String(cargoData.hsCode);
//         }

//         delete cargoData.hsCode;
//       }
//     } else {
//       delete cargoData.hsCode;
//     }

//     // --------------------------------
//     // UPDATE SHIPMENT
//     // --------------------------------

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied",
//       });
//     }

//     shipment.cargo = {
//       ...(shipment.cargo?.toObject?.() || shipment.cargo || {}),
//       ...cargoData,
//       currency:
//         cargoData.currency ||
//         req.body.currency ||
//         shipment.cargo?.currency ||
//         "INR",
//     };

//     shipment.amount =
//       req.body.amount ?? shipment.amount;

//     shipment.paymentTerms =
//       req.body.paymentTerms ?? shipment.paymentTerms;

//     shipment.insuranceRequired =
//       req.body.insuranceRequired ?? shipment.insuranceRequired;

//     shipment.additionalInformation =
//       req.body.additionalInformation ??
//       shipment.additionalInformation;

//     shipment.exportIncentive =
//       req.body.exportIncentive ?? shipment.exportIncentive;

//     shipment.currentStep = 4;

//     shipment.markModified("cargo");

//     await shipment.save();

//     console.log("SAVED CARGO DATA:", {
//       hsCode: shipment.cargo.hsCode,
//       hsCodeText: shipment.cargo.hsCodeText,
//     });

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_UPDATED",
//       message: "Cargo & Invoice details updated.",
//       meta: { step: 3 },
//     });

//     return res.json({
//       status: 1,
//       message: "Step 3 completed.",
//       data: shipment,
//     });

//   } catch (error) {
//     console.log("STEP 3 ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message,
//     });
//   }
// };


// exports.saveDraft = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOneAndUpdate(
//       query,

//       {
//         shipmentStatus: "Draft",
//         lastStatusUpdatedAt: new Date()
//       },

//       {
//         new: true
//       }
//     );

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_UPDATED",
//       message: "Shipment saved as draft.",
//       meta: {
//         shipmentStatus: shipment.shipmentStatus
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Draft saved successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.analyzeShipment = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query)
//       .populate("cargo.hsCode");

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     await Activity.create({
//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "AI_QUERY",

//       message: "Shipment analyzed by AI.",

//       meta: {}
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment analyzed successfully.",

//       data: {
//         riskLevel: "Low",

//         freightEstimate:
//           shipment.amount || 0,

//         estimatedTransit:
//           shipment.transitTime || "7-10 Days",

//         requiredDocuments: [
//           "Commercial Invoice",
//           "Packing List",
//           "Bill of Lading"
//         ]
//       }
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };  

// exports.submitShipment = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     if (!canMoveToStatus(
//       shipment.shipmentStatus,
//       "Submitted"
//     )) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Submitted"`
//       });
//     }

//     shipment.shipmentStatus = "Submitted";
//     shipment.approvalStatus = "Pending";
//     shipment.currentStep = 5;
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: "Submitted",
//       updatedBy: req.user._id,
//       remarks: "Shipment submitted for approval"
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_SUBMITTED",

//       message: "Shipment submitted for admin approval.",

//       meta: {
//         approvalStatus: "Pending"
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment submitted successfully.",
//       data: shipment
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.approveShipment = async (req, res) => {
//   try {


  
//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query);

//   if (!shipment) {
//     return res.status(404).json({
//       status: 0,
//       message: "Shipment not found or access denied"
//     });
//   } 

//     shipment.approvalStatus = "Approved";
//     if (!canMoveToStatus(shipment.shipmentStatus, "Approved")) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Approved"`
//       });
//     }
    
//     shipment.shipmentStatus = "Approved";
//     shipment.approvedAt = new Date();
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: "Approved",
//       updatedBy: req.user._id,
//       remarks: "Shipment approved"
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_APPROVED",
//       message: "Shipment approved by admin.",
//       meta: {
//         approvedBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment approved successfully.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.rejectShipment = async (req, res) => {

//   try {

//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query); 

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.approvalStatus = "Rejected";

//     shipment.lastStatusUpdatedAt = new Date();
//     shipment.statusHistory.push({
//       status: shipment.shipmentStatus,
//       updatedBy: req.user._id,
//       remarks: req.body.reason || "Shipment rejected by admin"
//     });
    
//     await shipment.save();


//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_REJECTED",
//       message: "Shipment rejected by admin.",
//       meta: {
//         reason: req.body.reason || "",
//         rejectedBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment rejected successfully.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }

// };

// exports.holdShipment = async (req, res) => {

//   try {

//     const mappedUserId =
//   req.user.mappedUserId || req.user._id;

// const query =
//   req.user.roleName === "admin"
//     ? { _id: req.params.id }
//     : {
//         _id: req.params.id,
//         userId: mappedUserId
//       };

// const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.approvalStatus = "Correction Required";

//     shipment.exceptionStatus = "On Hold";
    
//     shipment.lastStatusUpdatedAt = new Date();
    
//     shipment.statusHistory.push({
//       status: shipment.shipmentStatus,
//       updatedBy: req.user._id,
//       remarks: req.body.reason || "Shipment placed on hold"
//     });

//     shipment.lastStatusUpdatedAt = new Date();

    

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_ON_HOLD",
//       message: "Shipment put on hold.",
//       meta: {
//         reason: req.body.reason || "",
//         holdBy: req.user._id
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment placed on hold.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }

// };

// exports.getAllShipmentsForAdmin = async (req, res) => {
//   try {
//     const {
//       page = 1,
//       limit = 100,
//       search,
//       shipmentStatus,
//       approvalStatus,
//       shipmentMode,
//       shipmentType,
//     } = req.query;

//     const query = {};

//     // =========================
//     // ROLE BASED FILTER
//     // =========================

//     if (req.user?.roleName !== "admin") {
//       const mappedUserId =
//         req.user?.mappedUserId || req.user?._id;

//       query.userId = mappedUserId;
//     }

//     // =========================
//     // SEARCH
//     // =========================

//     if (search) {
//       query.$or = [
//         {
//           referenceNumber: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           sbNumber: {
//             $regex: search,
//             $options: "i",
//           },
//         },
//         {
//           "exporter.companyName": {
//             $regex: search,
//             $options: "i",
//           },
//         },
//       ];
//     }

//     if (shipmentStatus) {
//       query.shipmentStatus = shipmentStatus;
//     }

//     if (approvalStatus) {
//       query.approvalStatus = approvalStatus;
//     }

//     if (shipmentMode) {
//       query["route.mode"] = shipmentMode;
//     }

//     if (shipmentType) {
//       query.shipmentType = shipmentType;
//     }

//     const total = await Shipment.countDocuments(query);

//     const shipments = await Shipment.find(query)
//       .populate("userId", "name email role")
//       .sort({ createdAt: -1 })
//       .skip((Number(page) - 1) * Number(limit))
//       .limit(Number(limit))
//       .lean();

//     // =========================================
//     // GET QUOTATIONS + INVOICES FOR SHIPMENTS
//     // =========================================

//     const shipmentIds = shipments.map(
//       (shipment) => shipment._id
//     );

//     const quotations = await B2BQuotation.find({
//       shipmentId: {
//         $in: shipmentIds,
//       },
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     const invoices = await TradeInvoice.find({
//       shipment: {
//         $in: shipmentIds,
//       },
//     })
//       .sort({ createdAt: -1 })
//       .lean();

//     // =========================================
//     // MAP LATEST QUOTATION
//     // =========================================

//     const quotationMap = new Map();

//     quotations.forEach((quotation) => {
//       const shipmentId = quotation.shipmentId.toString();

//       // sorted latest first
//       if (!quotationMap.has(shipmentId)) {
//         quotationMap.set(shipmentId, quotation);
//       }
//     });

//     // =========================================
//     // MAP LATEST INVOICE
//     // =========================================

//     const invoiceMap = new Map();

//     invoices.forEach((invoice) => {
//       const shipmentId = invoice.shipment.toString();

//       // sorted latest first
//       if (!invoiceMap.has(shipmentId)) {
//         invoiceMap.set(shipmentId, invoice);
//       }
//     });

//     // =========================================
//     // CREATE DYNAMIC WORKFLOW STATUS
//     // =========================================

//     const shipmentData = shipments.map((shipment) => {
//       const shipmentId = shipment._id.toString();

//       const quotation =
//         quotationMap.get(shipmentId);

//       const invoice =
//         invoiceMap.get(shipmentId);

//       let workflowStatus = "Pending Review";

//       // -----------------------------
//       // SHIPMENT REJECTED
//       // -----------------------------

//       if (shipment.approvalStatus === "Rejected") {
//         workflowStatus = "Rejected";
//       }

//       // -----------------------------
//       // CORRECTION REQUIRED
//       // -----------------------------

//       else if (
//         shipment.approvalStatus ===
//         "Correction Required"
//       ) {
//         workflowStatus = "Correction Required";
//       }

//       // -----------------------------
//       // PENDING ADMIN REVIEW
//       // -----------------------------

//       else if (
//         shipment.approvalStatus === "Pending"
//       ) {
//         workflowStatus = "Pending Review";
//       }

//       // -----------------------------
//       // APPROVED
//       // -----------------------------

//       else if (
//         shipment.approvalStatus === "Approved"
//       ) {
//         workflowStatus = "Approved";
//       }

//       // =================================
//       // QUOTATION STATUS
//       // =================================

//       if (quotation) {
//         if (quotation.status === "Draft") {
//           workflowStatus = "Quotation Draft";
//         }

//         if (quotation.status === "Shared") {
//           workflowStatus = "Quotation Sent";
//         }

//         if (quotation.status === "Accepted") {
//           workflowStatus =
//             "Quotation Accepted";
//         }

//         if (quotation.status === "Rejected") {
//           workflowStatus =
//             "Quotation Rejected";
//         }

//         if (quotation.status === "Expired") {
//           workflowStatus =
//             "Quotation Expired";
//         }
//       }

//       // =================================
//       // INVOICE STATUS
//       // INVOICE HAS HIGHER PRIORITY
//       // =================================

//       if (shipment.invoiceStatus === "Sent") {
//         workflowStatus = "Invoice Sent";
//       } else if (invoice) {
//         if (invoice.status === "Pending") {
//           workflowStatus = "Invoice Generated";
//         }

//         if (invoice.status === "Paid") {
//           workflowStatus = "Invoice Paid";
//         }

//         if (invoice.status === "Overdue") {
//           workflowStatus = "Invoice Overdue";
//         }

//         if (invoice.status === "Cancelled") {
//           workflowStatus =
//             "Invoice Cancelled";
//         }
//       }

//       return {
//         ...shipment,

//         workflowStatus,

//         quotation: quotation
//           ? {
//               _id: quotation._id,
//               quotationNumber:
//                 quotation.quotationNumber,
//               status: quotation.status,
//               totalAmount:
//                 quotation.totalAmount,
//               currency:
//                 quotation.currency,
//             }
//           : null,

//         invoice: invoice
//           ? {
//               _id: invoice._id,
//               invoiceNumber:
//                 invoice.invoiceNumber,
//               status: invoice.status,
//               totalAmount:
//                 invoice.totalAmount,
//               invoiceValue:
//                 invoice.invoiceValue,
//             }
//           : null,
//       };
//     });

//     // =========================================
//     // DYNAMIC STATS
//     // =========================================

//     const today = new Date();
//     today.setHours(0, 0, 0, 0);

//     const stats = {
//       total: shipmentData.length,
//       pendingReview: 0,
//       newToday: 0,
//       quotationSent: 0,
//       quotationAccepted: 0,
//       invoiceGenerated: 0,
//       invoicePaid: 0,
//     };

//     shipmentData.forEach((shipment) => {
//       if (shipment.workflowStatus === "Pending Review") {
//         stats.pendingReview++;
//       }

//       if (
//         shipment.workflowStatus === "Quotation Sent"
//       ) {
//         stats.quotationSent++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Quotation Accepted"
//       ) {
//         stats.quotationAccepted++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Invoice Generated"
//       ) {
//         stats.invoiceGenerated++;
//       }

//       if (
//         shipment.workflowStatus ===
//         "Invoice Paid"
//       ) {
//         stats.invoicePaid++;
//       }

//       const createdDate = new Date(
//         shipment.createdAt
//       );
//       createdDate.setHours(0, 0, 0, 0);

//       if (
//         createdDate.getTime() ===
//         today.getTime()
//       ) {
//         stats.newToday++;
//       }
//     });

//     return res.json({
//       status: 1,

//       total,

//       page: Number(page),

//       totalPages: Math.ceil(
//         total / Number(limit)
//       ),

//       stats,

//       data: shipmentData,
//     });
//   } catch (err) {
//     console.error(
//       "GET ALL SHIPMENTS ERROR:",
//       err
//     );

//     return res.status(500).json({
//       status: 0,
//       message: err.message,
//     });
//   }
// };

// exports.assignCarrier = async (req, res) => {
//   try {

//     const {
//       name,
//       code,
//       contactPerson,
//       mobile,
//       email
//     } = req.body;

//     const mappedUserId =
//     req.user.mappedUserId || req.user._id;
  
//   const query =
//     req.user.roleName === "admin"
//       ? { _id: req.params.id }
//       : {
//           _id: req.params.id,
//           userId: mappedUserId
//         };
  
//   const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     shipment.carrier = {
//       name,
//       code,
//       contactPerson,
//       mobile,
//       email
//     };

//     shipment.assignedCarrierAt = new Date();
//     shipment.assignedBy = req.user._id;

//     if (!canMoveToStatus(shipment.shipmentStatus, "Carrier Assigned")) {
//       return res.status(400).json({
//         status: 0,
//         message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Carrier Assigned"`
//       });
//     }
    
//     shipment.shipmentStatus = "Carrier Assigned";
//     shipment.lastStatusUpdatedAt = new Date();
//     shipment.statusHistory.push({
//       status: "Carrier Assigned",
//       updatedBy: req.user._id,
//       remarks: "Carrier assigned"
//     });

//     await shipment.save();

//     await Activity.create({

//       userId: req.user._id,

//       shipmentId: shipment._id,

//       type: "SHIPMENT_STATUS_CHANGED",

//       message: "Carrier assigned successfully.",

//       meta: {
//         carrier: shipment.carrier
//       }

//     });

//     return res.json({

//       status: 1,

//       message: "Carrier assigned successfully.",

//       data: shipment

//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.uploadDocs = async (req, res) => {
//   try {

//     const { shipmentId, documentType, required } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         status: 0,
//         message: "Please upload a file."
//       });
//     }

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: shipmentId
//           }
//         : {
//             _id: shipmentId,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied."
//       });
//     }

//     const document = await ShipmentDocument.create({
//       shipmentId: shipment._id,

//       documentName: documentType,

//       documentType:
//         required === "true"
//           ? "Required"
//           : "If Applicable",

//       status: "Uploaded",

//       fileUrl: `/uploads/documents/${req.file.filename}`,

//       fileName: req.file.originalname,

//       fileSize: req.file.size.toString(),

//       uploadedBy: req.user._id,

//       required: required === "true"
//     });

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "DOCUMENT_UPLOADED",
//       message: `${documentType} uploaded successfully.`
//     });

//     return res.status(200).json({
//       status: 1,
//       message: "Document uploaded successfully.",
//       data: document
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// const getMappedUserId = (req) => {
//   return req.user.mappedUserId || req.user._id;
// };

// exports.getShipments = async (req, res) => {
//   try {
//     const { status, mode, search } = req.query;

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     let query =
//       req.user.roleName === "admin"
//         ? {}
//         : {
//             userId: mappedUserId
//           };

//     if (status) {
//       query.shipmentStatus = status;
//     }

//     if (mode) {
//       query.$or = [
//         { shipmentMode: mode },
//         { transportMode: mode },
//         { "route.mode": mode }
//       ];
//     }

//     if (search) {
//       query.$or = [
//         {
//           sbNumber: {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           referenceNumber: {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           "exporter.companyName": {
//             $regex: search,
//             $options: "i"
//           }
//         },
//         {
//           "importer.companyName": {
//             $regex: search,
//             $options: "i"
//           }
//         }
//       ];
//     }

//     const shipments = await Shipment.find(query)
//       .populate("cargo.hsCode")
//       .populate("userId", "name email role")
//       .sort({ createdAt: -1 })
//       .lean();

//     // Normalize the response without replacing missing business data with fake values.
//     const data = shipments.map((shipmentObj) => {
//       const cargo = shipmentObj.cargo || {};
//       const route = shipmentObj.route || {};
//       const invoice = shipmentObj.invoice || {};

//       return {
//         ...shipmentObj,

//         shipmentMode:
//           shipmentObj.shipmentMode ||
//           shipmentObj.transportMode ||
//           route.mode ||
//           "",

//         route: {
//           ...route,
//           originCountry: route.originCountry || shipmentObj.originCountry || "",
//           originCity: route.originCity || shipmentObj.originCity || "",
//           destinationCountry: route.destinationCountry || shipmentObj.destinationCountry || "",
//           destinationCity: route.destinationCity || shipmentObj.destinationCity || "",
//           mode: route.mode || shipmentObj.shipmentMode || shipmentObj.transportMode || "",
//         },

//         exporter: {
//           ...(shipmentObj.exporter || {}),
//           companyName:
//             shipmentObj.exporter?.companyName ||
//             shipmentObj.exporter?.name ||
//             "",
//         },

//         importer: {
//           ...(shipmentObj.importer || {}),
//           companyName:
//             shipmentObj.importer?.companyName ||
//             shipmentObj.importer?.name ||
//             "",
//         },

//         cargo: {
//           ...cargo,
//           // Keep both the populated master-data reference and manually entered HS code.
//           hsCode: cargo.hsCode || null,
//           hsCodeText: cargo.hsCodeText || "",
//           quantity: cargo.quantity ?? cargo.packages ?? null,
//           weight: cargo.weight ?? shipmentObj.weight ?? null,
//           grossWeight: cargo.grossWeight ?? shipmentObj.grossWeight ?? null,
//           netWeight: cargo.netWeight ?? shipmentObj.netWeight ?? null,
//           volumetricWeight: cargo.volumetricWeight ?? shipmentObj.volumetricWeight ?? null,
//           volumeCBM: cargo.volumeCBM ?? shipmentObj.totalVolume ?? null,
//           // Declared cargo value is not freight amount; use invoice value only as fallback.
//           value: cargo.value ?? invoice.invoiceValue ?? null,
//           currency: cargo.currency || invoice.currency || shipmentObj.currency || "INR",
//         },

//         // Preserve ETA/ETD as stored dates; aliases support older records.
//         eta: shipmentObj.eta || shipmentObj.estimatedArrivalDate || null,
//         etd: shipmentObj.etd || shipmentObj.estimatedDepartureDate || null,
//       };
//     });

//     return res.json({
//       status: 1,
//       total: data.length,
//       data
//     });

//   } catch (error) {

//     console.error("GET SHIPMENTS ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };

// exports.getStats = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     // Admin ke liye saare shipments
//     const baseQuery =
//       req.user.roleName === "admin"
//         ? {}
//         : { userId: mappedUserId };


//     const total = await Shipment.countDocuments(
//       baseQuery
//     );

//     const inTransit = await Shipment.countDocuments({
//       ...baseQuery,
//       shipmentStatus: "In Transit"
//     });

//     const delivered = await Shipment.countDocuments({
//       ...baseQuery,
//       shipmentStatus: "Delivered"
//     });

//     const pendingDocs = await Shipment.countDocuments({
//       ...baseQuery,
//       documentStatus: "Pending"
//     });

//     const customHold = await Shipment.countDocuments({
//       ...baseQuery,
//       exceptionStatus: "On Hold"
//     });


//     const revenueAgg = await Shipment.aggregate([
//       {
//         $match: baseQuery
//       },
//       {
//         $group: {
//           _id: null,
//           total: {
//             $sum: "$revenue"
//           }
//         }
//       }
//     ]);


//     return res.json({
//       status: 1,
//       data: {
//         total,
//         inTransit,
//         delivered,
//         pendingDocs,
//         customHold,
//         revenue: revenueAgg[0]?.total || 0
//       }
//     });

//   } catch (error) {

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.updateShipmentStatus = async (req, res) => {
//   try {

//     const mappedUserId =
//       req.user.mappedUserId || req.user._id;

//     const query =
//       req.user.roleName === "admin"
//         ? {
//             _id: req.params.id
//           }
//         : {
//             _id: req.params.id,
//             userId: mappedUserId
//           };

//     const shipment = await Shipment.findOne(query);

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found or access denied"
//       });
//     }

//     const currentStatus = shipment.shipmentStatus;
//     const nextStatus = req.body.status;

//     if (!canMoveToStatus(currentStatus, nextStatus)) {
//       return res.status(400).json({
//         status: 0,
//         message: `Invalid transition from ${currentStatus} to ${nextStatus}`
//       });
//     }

//     if (
//       nextStatus === "Approved" &&
//       req.user.roleName !== "admin"
//     ) {
//       return res.status(403).json({
//         status: 0,
//         message: "Only admin can approve shipments."
//       });
//     }

//     shipment.shipmentStatus = nextStatus;
//     shipment.lastStatusUpdatedAt = new Date();

//     shipment.statusHistory.push({
//       status: nextStatus,
//       updatedBy: req.user._id,
//       remarks: `Status changed from ${currentStatus} to ${nextStatus}`
//     });

//     await shipment.save();

//     await Activity.create({
//       userId: req.user._id,
//       shipmentId: shipment._id,
//       type: "SHIPMENT_STATUS_CHANGED",
//       message: `Shipment moved from ${currentStatus} to ${nextStatus}`,
//       meta: {
//         from: currentStatus,
//         to: nextStatus
//       }
//     });

//     return res.json({
//       status: 1,
//       message: "Shipment status updated.",
//       data: shipment
//     });

//   } catch (err) {

//     return res.status(500).json({
//       status: 0,
//       message: err.message
//     });

//   }
// };

// exports.getShipmentDetails = async (req, res) => {
//   try {
//     const shipment = await Shipment.findById(req.params.id)
//   .populate("cargo.hsCode")
//   .populate(
//     "userId",
//     "name email phone companyName address country city gstNumber importExportId businessType accountType profileImage"
//   );

//     if (!shipment) {
//       return res.status(404).json({
//         status: 0,
//         message: "Shipment not found"
//       });
//     }

//     // Admin can access all shipments
//     if (req.user.roleName !== "admin") {
//       const isOwner =
//         shipment.userId.toString() === req.user._id.toString();

//       const hasMappedAccess = (req.user.allowedUserIds || []).some(
//         id => id.toString() === shipment.userId.toString()
//       );

//       if (!isOwner && !hasMappedAccess) {
//         return res.status(403).json({
//           status: 0,
//           message: "Access denied"
//         });
//       }
//     }

//     // =========================
//     // FETCH SHIPMENT DOCUMENTS
//     // =========================
//     const documents = await ShipmentDocument.find({
//       shipmentId: shipment._id
//     }).sort({ createdAt: -1 });

//     // Shipment ko plain object banao
//     const shipmentData = shipment.toObject();

//     // Keep manually entered HS Code and cargo measurements available to CargoDetails.
//     shipmentData.cargo = {
//       ...(shipmentData.cargo || {}),
//       hsCode: shipmentData.cargo?.hsCode || null,
//       hsCodeText: shipmentData.cargo?.hsCodeText || "",
//       weight: shipmentData.cargo?.weight ?? shipmentData.weight ?? null,
//       grossWeight: shipmentData.cargo?.grossWeight ?? shipmentData.grossWeight ?? null,
//       netWeight: shipmentData.cargo?.netWeight ?? shipmentData.netWeight ?? null,
//       volumetricWeight: shipmentData.cargo?.volumetricWeight ?? shipmentData.volumetricWeight ?? null,
//       volumeCBM: shipmentData.cargo?.volumeCBM ?? shipmentData.totalVolume ?? null,
//       value: shipmentData.cargo?.value ?? shipmentData.invoice?.invoiceValue ?? null,
//       currency: shipmentData.cargo?.currency || shipmentData.invoice?.currency || shipmentData.currency || "INR"
//     };

//     // Documents attach karo
//     shipmentData.documents = documents;

//     return res.json({
//       status: 1,
//       message: "Shipment details fetched successfully",
//       data: shipmentData
//     });

//   } catch (error) {
//     console.error("GET SHIPMENT DETAILS ERROR:", error);

//     return res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };



//   exports.getShipmentTracking = async (req, res) => {
//     try {
  
//       const shipmentId = req.params.id;

//       const mappedUserId =
//         req.user.mappedUserId || req.user._id;
  
//       const query =
//         req.user.roleName === "admin"
//           ? {
//               _id: shipmentId
//             }
//           : {
//               _id: shipmentId,
//               userId: mappedUserId
//             };
  
//       const shipment = await Shipment.findOne(query)
//         .populate("cargo.hsCode");
  
  
//       if (!shipment) {
//         return res.status(404).json({
//           status: 0,
//           message: "Shipment not found"
//         });
//       }
//       const trackingTimeline = await ShipmentTracking.find({
//         shipmentId
//       }).sort({ createdAt: 1 });
//       const currentLocation = trackingTimeline.find(
//         item => item.current === true
//       );
//       const parties = await ShipmentParty.find({
//         shipmentId
//       });
//       const documents = await ShipmentDocument.find({
//         shipmentId
//       });
//       const notifications = await Activity.find({
//         shipmentId
//       })
//         .sort({ createdAt: -1 })
//         .limit(5);
//       const exporter =
//         parties.find(x => x.type === "Exporter") || null;
//       const importer =
//         parties.find(x => x.type === "Importer") || null;
//       const notifyParty =
//         parties.find(x => x.type === "Notify") || null;
//       const header = {
//         shipmentId: shipment.sbNumber,
//         referenceNumber: shipment.referenceNumber,
      
//         shipmentStatus: shipment.shipmentStatus,
//         approvalStatus: shipment.approvalStatus,
//         trackingStatus: shipment.trackingStatus,
      
//         mode: shipment.route.mode,
      
//         route: {
//           origin: {
//             country: shipment.route.originCountry,
//             city: shipment.route.originCity
//           },
//           destination: {
//             country: shipment.route.destinationCountry,
//             city: shipment.route.destinationCity
//           }
//         },
      
//         etd: shipment.etd,
//         eta: shipment.eta,
//         transitTime: shipment.transitTime,
//         estimatedCost: shipment.estimatedCost
//       };
//       const liveTracking = {
//         location: currentLocation?.location || null,
//         currentStatus: currentLocation?.status || shipment.shipmentStatus,
//         lastUpdate: currentLocation?.createdAt || null
//       };
//       const shipmentInfo = {
//         shipmentId: shipment.sbNumber,
//         carrier: shipment.carrier,
//         route: shipment.route,
//         quantity: shipment.cargo.quantity,
//         weight: shipment.cargo.weight,
//         volume: shipment.cargo.volumeCBM
//       };
//       const transportInfo = {
//         awbNumber: shipment.awbNumber,
//         incoterm: shipment.incoterm,
//         carrier: shipment.carrier,
//         etd: shipment.etd,
//         eta: shipment.eta,
//         transitTime: shipment.transitTime
//       };
  
//       res.json({
//         status: 1,
//         message: "Shipment tracking fetched successfully",
  
//         data: {
  
//           header,
  
//           trackingTimeline,
  
//           liveTracking,
  
//           shipmentInfo,
  
//           transportInfo,
  
//           parties: {
//             exporter,
//             importer,
//             notifyParty
//           },
  
//           documents,
  
//           notifications
  
//         }
  
//       });
  
//     } catch (err) {
  
//       res.status(500).json({
//         status: 0,
//         message: err.message
//       });
  
//     }
//   };

//   exports.addTrackingUpdate = async (req, res) => {
//     try {
  
//       const shipmentId = req.params.id;
  
//       const {
//         status,
//         remarks,
//         location
//       } = req.body;


//     const mappedUserId =
//   req.user.mappedUserId || req.user._id;

// const query =
//   req.user.roleName === "admin"
//     ? { _id: shipmentId }
//     : {
//         _id: shipmentId,
//         userId: mappedUserId
//       };

// const shipment = await Shipment.findOne(query);
  
//       if (!shipment) {
//         return res.status(404).json({
//           status: 0,
//           message: "Shipment not found"
//         });
//       }
//       if (!status) {
//         return res.status(400).json({
//           status: 0,
//           message: "Tracking status is required"
//         });
//       }
//       await ShipmentTracking.updateMany(
//         {
//           shipmentId,
//           current: true
//         },
//         {
//           current: false
//         }
//       );
//       const tracking = await ShipmentTracking.create({
  
//         shipmentId,
  
//         status,
  
//         location: {
//           country: location?.country || "",
//           city: location?.city || "",
//           address: location?.address || "",
//           latitude: location?.latitude || null,
//           longitude: location?.longitude || null
//         },
  
//         remarks,
  
//         updatedBy: req.user._id,
  
//         current: true
  
//       });
// const allowed = canMoveToStatus(
//   shipment.shipmentStatus,
//   status
// );

// if (!allowed) {
//   return res.status(400).json({
//     status: 0,
//     message: `Shipment cannot move from "${shipment.shipmentStatus}" to "${status}"`
//   });
// }
// shipment.shipmentStatus = status;

// shipment.trackingStatus = "Tracking Active";

// shipment.lastStatusUpdatedAt = new Date();
// shipment.currentLocation = {
//   country: location?.country || "",
//   city: location?.city || "",
//   latitude: location?.latitude || null,
//   longitude: location?.longitude || null
// };
// shipment.statusHistory.push({
//   status,
//   updatedBy: req.user._id,
//   remarks,
//   updatedAt: new Date()
// });
// if (status === "Delivered") {
//   shipment.deliveredAt = new Date();
// }
// if (status === "Closed") {
//   shipment.closedAt = new Date();
//   shipment.trackingStatus = "Completed";
// }

// await shipment.save();
//       await Activity.create({
  
//         userId: req.user._id,
  
//         shipmentId: shipment._id,
  
//         type: "TRACKING_UPDATED",
//         message: `Tracking updated to ${status} at ${location?.city || ""}`
  
//       });
  
//       res.status(200).json({
//         status: 1,
//         message: "Tracking updated successfully",
//         data: tracking
//       });
  
//     } catch (err) {
  
//       res.status(500).json({
//         status: 0,
//         message: err.message
//       });
  
//     }
//   };



//   exports.updateShipment = async (req, res) => {
//     try {
//       const mappedUserId = req.user.mappedUserId || req.user._id;

//       const query =
//         req.user.roleName === "admin"
//           ? { _id: req.params.id }
//           : { _id: req.params.id, userId: mappedUserId };

//       const shipment = await Shipment.findOne(query);

//       if (!shipment) {
//         return res.status(404).json({
//           success: false,
//           status: 0,
//           message: "Shipment not found or access denied",
//         });
//       }

//       const body = req.body || {};

//       // -------------------------------------------------
//       // BASIC INFORMATION
//       // -------------------------------------------------
//       if (body.shipmentType !== undefined) {
//         shipment.shipmentType = body.shipmentType;
//       }

//       const requestedMode = body.shipmentMode ?? body.transportMode;

//       if (requestedMode !== undefined) {
//         shipment.shipmentMode = requestedMode;
      
//         if (!shipment.route) shipment.route = {};
      
//         if (["Air", "Sea", "Road"].includes(requestedMode)) {
//           shipment.route.mode = requestedMode;
//         } else if (requestedMode === "") {
//           shipment.route.mode = undefined;
//         }
//       }

//       if (body.incoterm !== undefined) shipment.incoterm = body.incoterm;
//       if (body.priority !== undefined) shipment.priority = body.priority;
//       if (body.bookingNo !== undefined) shipment.bookingNo = body.bookingNo;
//       if (body.etd !== undefined) shipment.etd = body.etd || null;
//       if (body.eta !== undefined) shipment.eta = body.eta || null;

//       // referenceNumber / sbNumber are generated unique identifiers.
//       // They are intentionally not editable through this endpoint.

//       // -------------------------------------------------
//       // ROUTE DETAILS
//       // Only schema-backed route fields are accepted.
//       // -------------------------------------------------
//       if (body.route && typeof body.route === "object") {
//         if (!shipment.route) shipment.route = {};

//         const routeFields = [
//           "originCountry",
//           "originCity",
//           "destinationCountry",
//           "destinationCity",
//           "warehouse",
//           "mode",
//         ];

//         routeFields.forEach((field) => {
//           if (body.route[field] !== undefined) {
//             shipment.route[field] = body.route[field];
//           }
//         });

//         if (body.route.mode !== undefined) {
//           shipment.shipmentMode = body.route.mode;
//         }
//       }

//       // -------------------------------------------------
//       // CARGO DETAILS
//       // Manual HS Code is stored in cargo.hsCodeText.
//       // cargo.hsCode remains reserved for an optional HSCode ObjectId reference.
//       // -------------------------------------------------
//       if (body.cargo && typeof body.cargo === "object") {
//         if (!shipment.cargo) shipment.cargo = {};

//         const cargoFields = [
//           "productName",
//           "productDescription",
//           "category",
//           "cargoType",
//           "hsCodeText",
//           "quantity",
//           "unit",
//           "weight",
//           "grossWeight",
//           "netWeight",
//           "volumetricWeight",
//           "packages",
//           "packingType",
//           "unNumber",
//           "packageMarks",
//           "isDangerous",
//           "isTemperatureControlled",
//           "isStackable",
//           "isFragile",
//           "hasBattery",
//           "isLithium",
//           "dimensions",
//           "volumeCBM",
//           "value",
//           "currency",
//         ];

//         cargoFields.forEach((field) => {
//           if (body.cargo[field] !== undefined) {
//             shipment.cargo[field] = body.cargo[field];
//           }
//         });

//         if (body.cargo.hsCode !== undefined) {
//           const incomingHsCode = body.cargo.hsCode;

//           if (
//             incomingHsCode &&
//             mongoose.Types.ObjectId.isValid(incomingHsCode)
//           ) {
//             shipment.cargo.hsCode = incomingHsCode;
//           } else if (
//             incomingHsCode !== null &&
//             String(incomingHsCode).trim()
//           ) {
//             // Older frontend forms may send the manually entered HS code in hsCode.
//             shipment.cargo.hsCodeText = String(incomingHsCode).trim();
//             shipment.cargo.hsCode = undefined;
//           } else if (incomingHsCode === null || incomingHsCode === "") {
//             shipment.cargo.hsCode = undefined;
//           }
//         }

//         // Keep package count aliases consistent for older screens.
//         if (body.cargo.packages !== undefined && body.cargo.quantity === undefined) {
//           shipment.cargo.quantity = body.cargo.packages;
//         }
//         if (body.cargo.quantity !== undefined && body.cargo.packages === undefined) {
//           shipment.cargo.packages = body.cargo.quantity;
//         }
//       }

//       // -------------------------------------------------
//       // COMPLIANCE / ADDITIONAL INFORMATION
//       // -------------------------------------------------
//       if (
//         body.additionalInformation &&
//         typeof body.additionalInformation === "object"
//       ) {
//         if (!shipment.additionalInformation) {
//           shipment.additionalInformation = {};
//         }

//         const additionalFields = [
//           "packagingType",
//           "packages",
//           "marksNumbers",
//           "inspectionRequired",
//           "dangerousGoods",
//           "specialHandling",
//           "temperatureControl",
//           "remarks",
//         ];

//         additionalFields.forEach((field) => {
//           if (body.additionalInformation[field] !== undefined) {
//             shipment.additionalInformation[field] =
//               body.additionalInformation[field];
//           }
//         });
//       }

//       if (body.notes !== undefined) shipment.notes = body.notes;
//       if (body.insuranceRequired !== undefined) {
//         shipment.insuranceRequired = body.insuranceRequired;
//       }

//       // -------------------------------------------------
//       // PARTY DETAILS
//       // Explicitly allow only fields defined in Shipment schema.
//       // Merge with existing values so partial updates never erase
//       // fields that were not included in the request.
//       // -------------------------------------------------
//       const partyFields = {
//         exporter: [
//           "companyName",
//           "iecNumber",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//         importer: [
//           "companyName",
//           "address",
//           "iecNumber",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//         notifyParty: [
//           "companyName",
//           "contactPerson",
//           "email",
//           "mobile",
//         ],
//       };

//       Object.entries(partyFields).forEach(([partyKey, allowedFields]) => {
//         const incomingParty = body[partyKey];

//         if (!incomingParty || typeof incomingParty !== "object" || Array.isArray(incomingParty)) {
//           return;
//         }

//         const existingParty =
//           shipment[partyKey]?.toObject?.() || shipment[partyKey] || {};

//         const mergedParty = { ...existingParty };

//         allowedFields.forEach((field) => {
//           if (incomingParty[field] !== undefined) {
//             mergedParty[field] = incomingParty[field];
//           }
//         });

//         shipment[partyKey] = mergedParty;
//       });

//       // Save all cargo changes
// shipment.markModified("cargo");
// await shipment.save();

// // Fetch saved data again directly from MongoDB
// const updatedShipment = await Shipment.findById(shipment._id)
//   .populate("cargo.hsCode")
//   .lean();

// console.log("========== CARGO DATABASE SAVE CHECK ==========");
// console.log(JSON.stringify(updatedShipment?.cargo, null, 2));
// console.log("================================================");

// return res.status(200).json({
//   success: true,
//   status: 1,
//   message: "Shipment updated successfully",
//   data: updatedShipment,
// });

//       return res.status(200).json({
//         success: true,
//         status: 1,
//         message: "Shipment updated successfully",
//         data: updatedShipment,
//       });
//     } catch (error) {
//       console.error("Update shipment error:", error);

//       return res.status(500).json({
//         success: false,
//         status: 0,
//         message: error.message,
//       });
//     }
//   };

// mahima code //

const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
const Shipment = require("../models/Shipment");
const ShipmentTracking = require("../models/ShipmentTracking");
const ShipmentDocument = require("../models/ShipmentDocument");
const ShipmentParty = require("../models/ShipmentParty");
const ShipmentCost = require("../models/ShipmentCost");
const Activity = require("../models/Activity");
// const Shipment = require("../models/Shipment");
const B2BQuotation = require("../models/quotationModel");
const TradeInvoice = require("../models/TradeInvoice");

const {
  shipmentStatusFlow,
  canMoveToStatus
} = require("../utils/shipmentStatusFlow");

exports.saveStep1 = async (req, res) => {
  try {

    
    const {
      exporter,
      shipmentType,
      shipmentMode,
      shipmentPurpose,
      customerType,
      userId
    } = req.body;

    let shipmentUserId = req.user._id;
    console.log("REQ USER:", req.user);
console.log("REQ USER ID:", req.user._id);
console.log("MAPPED USER ID:", req.user.mappedUserId);
console.log("SHIPMENT USER ID:", shipmentUserId); 

// Agar admin nahi hai aur kisi mapped user ke liye shipment create kar raha hai
if (userId) {

  // Admin kisi ke liye bhi create kar sakta hai
  if (req.user.roleName === "admin") {
    shipmentUserId = userId;
  }

  // Other users sirf mapped users ke liye create kar sakte hain
  else {

    const hasAccess = (req.user.allowedUserIds || []).some(
      id => id.toString() === userId.toString()
    );
  
    if (!hasAccess) {
      return res.status(403).json({
        status: 0,
        message: "You are not authorized to create a shipment for this user"
      });
    }
  
    shipmentUserId = userId;
  }
}

    const referenceNumber = `REF-${Date.now()}`;
    const sbNumber = `SB-${Date.now()}`;

    const shipment = await Shipment.create({

      userId: shipmentUserId,

      createdByRole: req.user.role,

      customerType: customerType || "Individual",

      shipmentType,

      shipmentMode,

      shipmentPurpose,

      exporter,

      referenceNumber,

      sbNumber,

      shipmentStatus: "Draft",

      approvalStatus: "Pending",

      documentStatus: "Pending",

      trackingStatus: "Not Started",

      paymentStatus: "Pending",

      exceptionStatus: "None",

      currentStep: 2

    });
    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_CREATED",

      message: `Shipment ${shipment.referenceNumber} created successfully.`,

      meta: {
        createdByRole: req.user.role,
        shipmentStatus: shipment.shipmentStatus
      }

    });

    return res.status(201).json({
      status: 1,
      message: "Shipment created successfully.",
      data: shipment
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

const Setting = require("../models/Setting");

exports.saveStep2 = async (req, res) => {
  try {
    console.log("========== STEP 2 DEBUG ==========");

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    console.log("PARAM ID:", req.params.id);
    console.log("REQ USER ID:", req.user._id);
    console.log("MAPPED USER ID:", mappedUserId);

    // 1. Find shipment
    const shipmentById = await Shipment.findById(req.params.id);

    if (!shipmentById) {
      return res.status(404).json({
        status: 0,
        message: "Shipment ID does not exist"
      });
    }

    // 2. Fetch shipment mode options from Settings
    const settings = await Setting.findOne({
      userId: req.user._id
    }).lean();

    const modeField = settings?.shipmentForm?.sections
      ?.flatMap(section => section.fields || [])
      .find(field => field.key === "shipmentMode");

    const allowedModes = modeField?.useDropdown
      ? (modeField.options || [])
      : [];

    // 3. Get requested mode
    const requestedMode =
      req.body.route?.mode ||
      req.body.shipmentMode ||
      "";

    // 4. Validate mode dynamically
    if (
      requestedMode &&
      modeField?.useDropdown &&
      !allowedModes.includes(requestedMode)
    ) {
      return res.status(400).json({
        status: 0,
        message: `Invalid shipment mode. Allowed values: ${allowedModes.join(", ")}`
      });
    }

    // 5. Prepare route data
    const routeData = {
      ...(req.body.route || {})
    };

    if (requestedMode) {
      routeData.mode = requestedMode;
    } else {
      // Don't save empty string in route.mode
      delete routeData.mode;
    }

    // 6. Update shipment
    const shipment = await Shipment.findOneAndUpdate(
      {
        _id: req.params.id,
        ...(req.user.roleName === "admin"
          ? {}
          : { userId: mappedUserId })
      },
      {
        $set: {
          route: {
            ...shipmentById.route?.toObject?.() || shipmentById.route || {},
            ...routeData
          },

          importer: req.body.importer,
          bookingNo: req.body.bookingNo,
          eta: req.body.eta,
          etd: req.body.etd,
          incoterm: req.body.incoterm,

          shipmentMode: requestedMode || shipmentById.shipmentMode || "",

          currentStep: 3
        }
      },
      {
        new: true,
        runValidators: true
      }
    );

    console.log("UPDATED SHIPMENT:", shipment);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    return res.json({
      status: 1,
      message: "Step 2 completed.",
      data: shipment
    });

  } catch (error) {
    console.log("STEP 2 ERROR:", error);

    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};
  
exports.saveStep3 = async (req, res) => {
  try {
    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    const query =
      req.user.roleName === "admin"
        ? { _id: req.params.id }
        : {
            _id: req.params.id,
            userId: mappedUserId
          };

    // Copy cargo data before modifying it. Older shipments may have the
    // invoice amount only at the shipment root, so use it as a fallback.
    const cargoData = { ...(req.body.cargo || {}) };
    const invoiceValue =
      cargoData.value !== undefined && cargoData.value !== null && cargoData.value !== ""
        ? Number(cargoData.value)
        : req.body.amount !== undefined && req.body.amount !== null && req.body.amount !== ""
          ? Number(req.body.amount)
          : undefined;

    const cargoCurrency =
      cargoData.currency || req.body.currency || "INR";

    if (invoiceValue !== undefined && Number.isFinite(invoiceValue)) {
      cargoData.value = invoiceValue;
    }
    cargoData.currency = cargoCurrency;

    // Handle HS Code safely
    if (cargoData.hsCode !== undefined) {
      const hsCodeValue = cargoData.hsCode;

      if (
        hsCodeValue &&
        mongoose.Types.ObjectId.isValid(hsCodeValue)
      ) {
        // Existing HS Master Data reference
        cargoData.hsCode = hsCodeValue;
      } else {
        // Manually entered HS Code
        cargoData.hsCodeText = String(hsCodeValue || "");
        delete cargoData.hsCode;
      }
    }

    const shipment = await Shipment.findOneAndUpdate(
      query,
      {
        cargo: cargoData,
        amount: invoiceValue !== undefined ? invoiceValue : req.body.amount,
        paymentTerms: req.body.paymentTerms,
        insuranceRequired: req.body.insuranceRequired,
        additionalInformation: req.body.additionalInformation,
        exportIncentive: req.body.exportIncentive,
        currentStep: 4
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_UPDATED",
      message: "Cargo & Invoice details updated.",
      meta: { step: 3 }
    });

    return res.json({
      status: 1,
      message: "Step 3 completed.",
      data: shipment
    });

  } catch (error) {
    console.log("STEP 3 ERROR:", error);

    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};


exports.saveDraft = async (req, res) => {
  try {

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    const query =
      req.user.roleName === "admin"
        ? {
            _id: req.params.id
          }
        : {
            _id: req.params.id,
            userId: mappedUserId
          };

    const shipment = await Shipment.findOneAndUpdate(
      query,

      {
        shipmentStatus: "Draft",
        lastStatusUpdatedAt: new Date()
      },

      {
        new: true
      }
    );

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_UPDATED",
      message: "Shipment saved as draft.",
      meta: {
        shipmentStatus: shipment.shipmentStatus
      }
    });

    return res.json({
      status: 1,
      message: "Draft saved successfully.",
      data: shipment
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.analyzeShipment = async (req, res) => {
  try {

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    const query =
      req.user.roleName === "admin"
        ? {
            _id: req.params.id
          }
        : {
            _id: req.params.id,
            userId: mappedUserId
          };

    const shipment = await Shipment.findOne(query)
      .populate("cargo.hsCode");

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    await Activity.create({
      userId: req.user._id,

      shipmentId: shipment._id,

      type: "AI_QUERY",

      message: "Shipment analyzed by AI.",

      meta: {}
    });

    return res.json({
      status: 1,
      message: "Shipment analyzed successfully.",

      data: {
        riskLevel: "Low",

        freightEstimate:
          shipment.amount || 0,

        estimatedTransit:
          shipment.transitTime || "7-10 Days",

        requiredDocuments: [
          "Commercial Invoice",
          "Packing List",
          "Bill of Lading"
        ]
      }
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};  

exports.submitShipment = async (req, res) => {
  try {

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    const query =
      req.user.roleName === "admin"
        ? {
            _id: req.params.id
          }
        : {
            _id: req.params.id,
            userId: mappedUserId
          };

    const shipment = await Shipment.findOne(query);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    // A B2B user may reopen and resubmit their own saved Draft.
    if (shipment.shipmentStatus !== "Draft" && !canMoveToStatus(
      shipment.shipmentStatus,
      "Submitted"
    )) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Submitted"`
      });
    }

    shipment.shipmentStatus = "Submitted";
    shipment.approvalStatus = "Pending";
    shipment.currentStep = 5;
    shipment.lastStatusUpdatedAt = new Date();

    shipment.statusHistory.push({
      status: "Submitted",
      updatedBy: req.user._id,
      remarks: "Shipment submitted for approval"
    });

    await shipment.save();

    await Activity.create({
      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_SUBMITTED",

      message: "Shipment submitted for admin approval.",

      meta: {
        approvalStatus: "Pending"
      }
    });

    return res.json({
      status: 1,
      message: "Shipment submitted successfully.",
      data: shipment
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.approveShipment = async (req, res) => {
  try {


  
    const mappedUserId =
    req.user.mappedUserId || req.user._id;
  
  const query =
    req.user.roleName === "admin"
      ? { _id: req.params.id }
      : {
          _id: req.params.id,
          userId: mappedUserId
        };
  
  const shipment = await Shipment.findOne(query);

  if (!shipment) {
    return res.status(404).json({
      status: 0,
      message: "Shipment not found or access denied"
    });
  } 

    shipment.approvalStatus = "Approved";
    if (!canMoveToStatus(shipment.shipmentStatus, "Approved")) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Approved"`
      });
    }
    
    shipment.shipmentStatus = "Approved";
    shipment.approvedAt = new Date();
    shipment.lastStatusUpdatedAt = new Date();

    shipment.statusHistory.push({
      status: "Approved",
      updatedBy: req.user._id,
      remarks: "Shipment approved"
    });

    await shipment.save();

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_APPROVED",
      message: "Shipment approved by admin.",
      meta: {
        approvedBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment approved successfully.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.rejectShipment = async (req, res) => {

  try {

    const mappedUserId =
    req.user.mappedUserId || req.user._id;
  
  const query =
    req.user.roleName === "admin"
      ? { _id: req.params.id }
      : {
          _id: req.params.id,
          userId: mappedUserId
        };
  
  const shipment = await Shipment.findOne(query); 

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.approvalStatus = "Rejected";

    shipment.lastStatusUpdatedAt = new Date();
    shipment.statusHistory.push({
      status: shipment.shipmentStatus,
      updatedBy: req.user._id,
      remarks: req.body.reason || "Shipment rejected by admin"
    });
    
    await shipment.save();


    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_REJECTED",
      message: "Shipment rejected by admin.",
      meta: {
        reason: req.body.reason || "",
        rejectedBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment rejected successfully.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }

};

exports.holdShipment = async (req, res) => {

  try {

    const mappedUserId =
  req.user.mappedUserId || req.user._id;

const query =
  req.user.roleName === "admin"
    ? { _id: req.params.id }
    : {
        _id: req.params.id,
        userId: mappedUserId
      };

const shipment = await Shipment.findOne(query);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.approvalStatus = "Correction Required";

    shipment.exceptionStatus = "On Hold";
    
    shipment.lastStatusUpdatedAt = new Date();
    
    shipment.statusHistory.push({
      status: shipment.shipmentStatus,
      updatedBy: req.user._id,
      remarks: req.body.reason || "Shipment placed on hold"
    });

    shipment.lastStatusUpdatedAt = new Date();

    

    await shipment.save();

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_ON_HOLD",
      message: "Shipment put on hold.",
      meta: {
        reason: req.body.reason || "",
        holdBy: req.user._id
      }
    });

    return res.json({
      status: 1,
      message: "Shipment placed on hold.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }

};

exports.getAllShipmentsForAdmin = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 100,
      search,
      shipmentStatus,
      approvalStatus,
      shipmentMode,
      shipmentType,
    } = req.query;

    const query = {};

    // =========================
    // ROLE BASED FILTER
    // =========================

    if (req.user?.roleName !== "admin") {
      const mappedUserId =
        req.user?.mappedUserId || req.user?._id;

      query.userId = mappedUserId;
    }

    // =========================
    // SEARCH
    // =========================

    if (search) {
      query.$or = [
        {
          referenceNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          sbNumber: {
            $regex: search,
            $options: "i",
          },
        },
        {
          "exporter.companyName": {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    if (shipmentStatus) {
      query.shipmentStatus = shipmentStatus;
    }

    if (approvalStatus) {
      query.approvalStatus = approvalStatus;
    }

    if (shipmentMode) {
      query["route.mode"] = shipmentMode;
    }

    if (shipmentType) {
      query.shipmentType = shipmentType;
    }

    const total = await Shipment.countDocuments(query);

    const shipments = await Shipment.find(query)
      .populate("userId", "name email role")
      .sort({ createdAt: -1 })
      .skip((Number(page) - 1) * Number(limit))
      .limit(Number(limit))
      .lean();

    // =========================================
    // GET QUOTATIONS + INVOICES FOR SHIPMENTS
    // =========================================

    const shipmentIds = shipments.map(
      (shipment) => shipment._id
    );

    const quotations = await B2BQuotation.find({
      shipmentId: {
        $in: shipmentIds,
      },
    })
      .sort({ createdAt: -1 })
      .lean();

    const invoices = await TradeInvoice.find({
      shipment: {
        $in: shipmentIds,
      },
    })
      .sort({ createdAt: -1 })
      .lean();

    // =========================================
    // MAP LATEST QUOTATION
    // =========================================

    const quotationMap = new Map();

    quotations.forEach((quotation) => {
      const shipmentId = quotation.shipmentId.toString();

      // sorted latest first
      if (!quotationMap.has(shipmentId)) {
        quotationMap.set(shipmentId, quotation);
      }
    });

    // =========================================
    // MAP LATEST INVOICE
    // =========================================

    const invoiceMap = new Map();

    invoices.forEach((invoice) => {
      const shipmentId = invoice.shipment.toString();

      // sorted latest first
      if (!invoiceMap.has(shipmentId)) {
        invoiceMap.set(shipmentId, invoice);
      }
    });

    // =========================================
    // CREATE DYNAMIC WORKFLOW STATUS
    // =========================================

    const shipmentData = shipments.map((shipment) => {
      const shipmentId = shipment._id.toString();

      const quotation =
        quotationMap.get(shipmentId);

      const invoice =
        invoiceMap.get(shipmentId);

      let workflowStatus = "Pending Review";

      // -----------------------------
      // SHIPMENT REJECTED
      // -----------------------------

      if (shipment.approvalStatus === "Rejected") {
        workflowStatus = "Rejected";
      }

      // -----------------------------
      // CORRECTION REQUIRED
      // -----------------------------

      else if (
        shipment.approvalStatus ===
        "Correction Required"
      ) {
        workflowStatus = "Correction Required";
      }

      // -----------------------------
      // PENDING ADMIN REVIEW
      // -----------------------------

      else if (
        shipment.approvalStatus === "Pending"
      ) {
        workflowStatus = "Pending Review";
      }

      // -----------------------------
      // APPROVED
      // -----------------------------

      else if (
        shipment.approvalStatus === "Approved"
      ) {
        workflowStatus = "Approved";
      }

      // =================================
      // QUOTATION STATUS
      // =================================

      if (quotation) {
        if (quotation.status === "Draft") {
          workflowStatus = "Quotation Draft";
        }

        if (quotation.status === "Shared") {
          workflowStatus = "Quotation Sent";
        }

        if (quotation.status === "Accepted") {
          workflowStatus =
            "Quotation Accepted";
        }

        if (quotation.status === "Rejected") {
          workflowStatus =
            "Quotation Rejected";
        }

        if (quotation.status === "Expired") {
          workflowStatus =
            "Quotation Expired";
        }
      }

      // =================================
      // INVOICE STATUS
      // INVOICE HAS HIGHER PRIORITY
      // =================================

      if (invoice) {
        if (invoice.status === "Pending") {
          workflowStatus = "Invoice Generated";
        }

        if (invoice.status === "Paid") {
          workflowStatus = "Invoice Paid";
        }

        if (invoice.status === "Overdue") {
          workflowStatus = "Invoice Overdue";
        }

        if (invoice.status === "Cancelled") {
          workflowStatus =
            "Invoice Cancelled";
        }
      }

      return {
        ...shipment,

        workflowStatus,

        quotation: quotation
          ? {
              _id: quotation._id,
              quotationNumber:
                quotation.quotationNumber,
              status: quotation.status,
              totalAmount:
                quotation.totalAmount,
              currency:
                quotation.currency,
            }
          : null,

        invoice: invoice
          ? {
              _id: invoice._id,
              invoiceNumber:
                invoice.invoiceNumber,
              status: invoice.status,
              totalAmount:
                invoice.totalAmount,
              invoiceValue:
                invoice.invoiceValue,
            }
          : null,
      };
    });

    // =========================================
    // DYNAMIC STATS
    // =========================================

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const stats = {
      total: shipmentData.length,
      pendingReview: 0,
      newToday: 0,
      quotationSent: 0,
      quotationAccepted: 0,
      invoiceGenerated: 0,
      invoicePaid: 0,
    };

    shipmentData.forEach((shipment) => {
      if (shipment.workflowStatus === "Pending Review") {
        stats.pendingReview++;
      }

      if (
        shipment.workflowStatus === "Quotation Sent"
      ) {
        stats.quotationSent++;
      }

      if (
        shipment.workflowStatus ===
        "Quotation Accepted"
      ) {
        stats.quotationAccepted++;
      }

      if (
        shipment.workflowStatus ===
        "Invoice Generated"
      ) {
        stats.invoiceGenerated++;
      }

      if (
        shipment.workflowStatus ===
        "Invoice Paid"
      ) {
        stats.invoicePaid++;
      }

      const createdDate = new Date(
        shipment.createdAt
      );
      createdDate.setHours(0, 0, 0, 0);

      if (
        createdDate.getTime() ===
        today.getTime()
      ) {
        stats.newToday++;
      }
    });

    return res.json({
      status: 1,

      total,

      page: Number(page),

      totalPages: Math.ceil(
        total / Number(limit)
      ),

      stats,

      data: shipmentData,
    });
  } catch (err) {
    console.error(
      "GET ALL SHIPMENTS ERROR:",
      err
    );

    return res.status(500).json({
      status: 0,
      message: err.message,
    });
  }
};

exports.assignCarrier = async (req, res) => {
  try {

    const {
      name,
      code,
      contactPerson,
      mobile,
      email
    } = req.body;

    const mappedUserId =
    req.user.mappedUserId || req.user._id;
  
  const query =
    req.user.roleName === "admin"
      ? { _id: req.params.id }
      : {
          _id: req.params.id,
          userId: mappedUserId
        };
  
  const shipment = await Shipment.findOne(query);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    shipment.carrier = {
      name,
      code,
      contactPerson,
      mobile,
      email
    };

    shipment.assignedCarrierAt = new Date();
    shipment.assignedBy = req.user._id;

    if (!canMoveToStatus(shipment.shipmentStatus, "Carrier Assigned")) {
      return res.status(400).json({
        status: 0,
        message: `Shipment cannot move from "${shipment.shipmentStatus}" to "Carrier Assigned"`
      });
    }
    
    shipment.shipmentStatus = "Carrier Assigned";
    shipment.lastStatusUpdatedAt = new Date();
    shipment.statusHistory.push({
      status: "Carrier Assigned",
      updatedBy: req.user._id,
      remarks: "Carrier assigned"
    });

    await shipment.save();

    await Activity.create({

      userId: req.user._id,

      shipmentId: shipment._id,

      type: "SHIPMENT_STATUS_CHANGED",

      message: "Carrier assigned successfully.",

      meta: {
        carrier: shipment.carrier
      }

    });

    return res.json({

      status: 1,

      message: "Carrier assigned successfully.",

      data: shipment

    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

const getShipmentDocumentFilePath = (fileUrl) => {
  if (!fileUrl || typeof fileUrl !== "string") return null;

  // Only allow deleting files stored in this app's uploads/documents folder.
  const filename = path.basename(fileUrl.split("?")[0]);
  if (!filename) return null;

  const documentsDirectory = path.resolve(__dirname, "../uploads/documents");
  const resolvedPath = path.resolve(documentsDirectory, filename);

  if (!resolvedPath.startsWith(`${documentsDirectory}${path.sep}`)) {
    return null;
  }

  return resolvedPath;
};

const removeShipmentDocumentFile = async (fileUrl) => {
  const filePath = getShipmentDocumentFilePath(fileUrl);
  if (!filePath) return;

  try {
    await fs.promises.unlink(filePath);
  } catch (error) {
    if (error.code !== "ENOENT") throw error;
  }
};

exports.uploadDocs = async (req, res) => {
  let newFilePath = req.file?.path;

  try {
    const { shipmentId, documentType, documentKey, required } = req.body;

    if (!req.file) {
      return res.status(400).json({
        status: 0,
        message: "Please upload a file."
      });
    }

    if (!shipmentId || !mongoose.Types.ObjectId.isValid(shipmentId)) {
      await removeShipmentDocumentFile(`/uploads/documents/${req.file.filename}`);
      return res.status(400).json({
        status: 0,
        message: "A valid shipment ID is required."
      });
    }

    const mappedUserId = req.user.mappedUserId || req.user._id;
    const query = req.user.roleName === "admin"
      ? { _id: shipmentId }
      : { _id: shipmentId, userId: mappedUserId };

    const shipment = await Shipment.findOne(query);

    if (!shipment) {
      await removeShipmentDocumentFile(`/uploads/documents/${req.file.filename}`);
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied."
      });
    }

    const normalizedName = String(documentKey || documentType || "document").trim();
    const existingDocument = await ShipmentDocument.findOne({
      shipmentId: shipment._id,
      $or: [
        { documentKey: normalizedName },
        { documentName: documentType }
      ]
    }).sort({ createdAt: -1 });

    const fileUrl = `/uploads/documents/${req.file.filename}`;
    const documentPayload = {
      shipmentId: shipment._id,
      documentName: documentType || normalizedName,
      documentKey: normalizedName,
      documentType: required === "true" ? "Required" : "If Applicable",
      status: "Uploaded",
      fileUrl,
      fileName: req.file.originalname,
      fileSize: String(req.file.size),
      uploadedBy: req.user._id,
      required: required === "true"
    };

    let document;
    let oldFileUrl = "";

    if (existingDocument) {
      oldFileUrl = existingDocument.fileUrl || "";
      Object.assign(existingDocument, documentPayload);
      document = await existingDocument.save();
    } else {
      document = await ShipmentDocument.create(documentPayload);
    }

    // Remove the previous physical file only after the new DB record is saved.
    if (oldFileUrl && oldFileUrl !== fileUrl) {
      await removeShipmentDocumentFile(oldFileUrl);
    }

    // Activity logging must not fail the document upload/replace operation.
    // Some existing Activity schemas may not include DOCUMENT_REPLACED in their enum.
    try {
      await Activity.create({
        userId: req.user._id,
        shipmentId: shipment._id,
        type: existingDocument ? "DOCUMENT_UPLOADED" : "DOCUMENT_UPLOADED",
        message: `${documentType || "Document"} ${existingDocument ? "replaced" : "uploaded"} successfully.`
      });
    } catch (activityError) {
      console.error("DOCUMENT ACTIVITY LOG FAILED:", activityError.message);
    }

    return res.status(200).json({
      status: 1,
      message: existingDocument
        ? "Document replaced successfully."
        : "Document uploaded successfully.",
      data: document
    });
  } catch (err) {
    // If DB save fails, clean up the newly uploaded file to avoid orphan files.
    if (req.file?.filename) {
      try {
        await removeShipmentDocumentFile(`/uploads/documents/${req.file.filename}`);
      } catch (cleanupError) {
        console.error("New upload cleanup failed:", cleanupError);
      }
    }

    console.error("UPLOAD SHIPMENT DOCUMENT ERROR:", err);
    return res.status(500).json({
      status: 0,
      message: err.message
    });
  }
};

exports.deleteShipmentDocument = async (req, res) => {
  try {
    const { shipmentId, documentId } = req.params;

    if (
      !mongoose.Types.ObjectId.isValid(shipmentId) ||
      !mongoose.Types.ObjectId.isValid(documentId)
    ) {
      return res.status(400).json({
        status: 0,
        message: "Invalid shipment or document ID."
      });
    }

    const mappedUserId = req.user.mappedUserId || req.user._id;
    const shipmentQuery = req.user.roleName === "admin"
      ? { _id: shipmentId }
      : { _id: shipmentId, userId: mappedUserId };

    const shipment = await Shipment.findOne(shipmentQuery);
    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied."
      });
    }

    const document = await ShipmentDocument.findOne({
      _id: documentId,
      shipmentId: shipment._id
    });

    if (!document) {
      return res.status(404).json({
        status: 0,
        message: "Document not found."
      });
    }

    const fileUrl = document.fileUrl;
    await ShipmentDocument.deleteOne({ _id: document._id });

    try {
      await removeShipmentDocumentFile(fileUrl);
    } catch (fileError) {
      // DB record is removed; log filesystem cleanup failure for manual cleanup.
      console.error("SHIPMENT DOCUMENT FILE DELETE ERROR:", fileError);
    }

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "DOCUMENT_DELETED",
      message: `${document.documentName || "Document"} deleted successfully.`
    });

    return res.json({
      status: 1,
      message: "Document deleted successfully.",
      data: { documentId: document._id }
    });
  } catch (error) {
    console.error("DELETE SHIPMENT DOCUMENT ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

const getMappedUserId = (req) => {
  return req.user.mappedUserId || req.user._id;
};

exports.getShipments = async (req, res) => {
  try {
    const { status, mode, search } = req.query;

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    let query =
      req.user.roleName === "admin"
        ? {}
        : {
            userId: mappedUserId
          };

    if (status) {
      query.shipmentStatus = status;
    }

    if (mode) {
      query.$or = [
        { shipmentMode: mode },
        { transportMode: mode },
        { "route.mode": mode }
      ];
    }

    if (search) {
      query.$or = [
        {
          sbNumber: {
            $regex: search,
            $options: "i"
          }
        },
        {
          referenceNumber: {
            $regex: search,
            $options: "i"
          }
        },
        {
          "exporter.companyName": {
            $regex: search,
            $options: "i"
          }
        },
        {
          "importer.companyName": {
            $regex: search,
            $options: "i"
          }
        }
      ];
    }

    const shipments = await Shipment.find(query)
      .populate("cargo.hsCode")
      .populate("userId", "name email role")
      .sort({ createdAt: -1 });

    // SAFE NORMALIZED RESPONSE
    const data = shipments.map((shipment) => {

      const shipmentObj = shipment.toObject();

      return {
        ...shipmentObj,

        // MODE
        shipmentMode:
          shipmentObj.shipmentMode ||
          shipmentObj.transportMode ||
          shipmentObj.route?.mode ||
          "-",

        // SAFE ROUTE
        route: {
          ...(shipmentObj.route || {}),

          originCountry:
            shipmentObj.route?.originCountry ||
            shipmentObj.originCountry ||
            "-",

          originCity:
            shipmentObj.route?.originCity ||
            shipmentObj.originCity ||
            "-",

          destinationCountry:
            shipmentObj.route?.destinationCountry ||
            shipmentObj.destinationCountry ||
            "-",

          destinationCity:
            shipmentObj.route?.destinationCity ||
            shipmentObj.destinationCity ||
            "-",

          mode:
            shipmentObj.route?.mode ||
            shipmentObj.shipmentMode ||
            shipmentObj.transportMode ||
            "-"
        },

        // SAFE EXPORTER
        exporter: {
          ...(shipmentObj.exporter || {}),
          companyName:
            shipmentObj.exporter?.companyName ||
            shipmentObj.exporter?.name ||
            "-"
        },

        // SAFE IMPORTER
        importer: {
          ...(shipmentObj.importer || {}),
          companyName:
            shipmentObj.importer?.companyName ||
            shipmentObj.importer?.name ||
            "-"
        },

        // SAFE CARGO: keep manually entered HS Code and all cargo measurements.
        cargo: {
          ...(shipmentObj.cargo || {}),
          hsCode: shipmentObj.cargo?.hsCode || null,
          hsCodeText: shipmentObj.cargo?.hsCodeText || "",
          quantity: shipmentObj.cargo?.quantity ?? 0,
          weight: shipmentObj.cargo?.weight ?? shipmentObj.weight ?? 0,
          grossWeight: shipmentObj.cargo?.grossWeight ?? shipmentObj.grossWeight ?? 0,
          netWeight: shipmentObj.cargo?.netWeight ?? shipmentObj.netWeight ?? 0,
          volumetricWeight: shipmentObj.cargo?.volumetricWeight ?? shipmentObj.volumetricWeight ?? 0,
          volumeCBM: shipmentObj.cargo?.volumeCBM ?? shipmentObj.totalVolume ?? 0,
          value: shipmentObj.cargo?.value ?? shipmentObj.value ?? shipmentObj.invoice?.invoiceValue ?? 0,
          currency: shipmentObj.cargo?.currency || shipmentObj.currency || shipmentObj.invoice?.currency || "INR"
        }
      };
    });

    return res.json({
      status: 1,
      total: data.length,
      data
    });

  } catch (error) {

    console.error("GET SHIPMENTS ERROR:", error);

    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

exports.getStats = async (req, res) => {
  try {

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    // Admin ke liye saare shipments
    const baseQuery =
      req.user.roleName === "admin"
        ? {}
        : { userId: mappedUserId };


    const total = await Shipment.countDocuments(
      baseQuery
    );

    const inTransit = await Shipment.countDocuments({
      ...baseQuery,
      shipmentStatus: "In Transit"
    });

    const delivered = await Shipment.countDocuments({
      ...baseQuery,
      shipmentStatus: "Delivered"
    });

    const pendingDocs = await Shipment.countDocuments({
      ...baseQuery,
      documentStatus: "Pending"
    });

    const customHold = await Shipment.countDocuments({
      ...baseQuery,
      exceptionStatus: "On Hold"
    });


    const revenueAgg = await Shipment.aggregate([
      {
        $match: baseQuery
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$revenue"
          }
        }
      }
    ]);


    return res.json({
      status: 1,
      data: {
        total,
        inTransit,
        delivered,
        pendingDocs,
        customHold,
        revenue: revenueAgg[0]?.total || 0
      }
    });

  } catch (error) {

    return res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.updateShipmentStatus = async (req, res) => {
  try {

    const mappedUserId =
      req.user.mappedUserId || req.user._id;

    const query =
      req.user.roleName === "admin"
        ? {
            _id: req.params.id
          }
        : {
            _id: req.params.id,
            userId: mappedUserId
          };

    const shipment = await Shipment.findOne(query);

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found or access denied"
      });
    }

    const currentStatus = shipment.shipmentStatus;
    const nextStatus = req.body.status;

    if (!canMoveToStatus(currentStatus, nextStatus)) {
      return res.status(400).json({
        status: 0,
        message: `Invalid transition from ${currentStatus} to ${nextStatus}`
      });
    }

    if (
      nextStatus === "Approved" &&
      req.user.roleName !== "admin"
    ) {
      return res.status(403).json({
        status: 0,
        message: "Only admin can approve shipments."
      });
    }

    shipment.shipmentStatus = nextStatus;
    shipment.lastStatusUpdatedAt = new Date();

    shipment.statusHistory.push({
      status: nextStatus,
      updatedBy: req.user._id,
      remarks: `Status changed from ${currentStatus} to ${nextStatus}`
    });

    await shipment.save();

    await Activity.create({
      userId: req.user._id,
      shipmentId: shipment._id,
      type: "SHIPMENT_STATUS_CHANGED",
      message: `Shipment moved from ${currentStatus} to ${nextStatus}`,
      meta: {
        from: currentStatus,
        to: nextStatus
      }
    });

    return res.json({
      status: 1,
      message: "Shipment status updated.",
      data: shipment
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: err.message
    });

  }
};

exports.getShipmentDetails = async (req, res) => {
  try {
    // Fetch the shipment and populate user details for the response.
    const shipment = await Shipment.findById(req.params.id)
      .populate("cargo.hsCode", "hsCode")
      .populate(
        "userId",
        "name email phone companyName address country city gstNumber importExportId businessType accountType profileImage"
      );

    if (!shipment) {
      return res.status(404).json({
        status: 0,
        message: "Shipment not found"
      });
    }

    // Normalize IDs because userId is populated above and may be a User document.
    const roleName = String(req.user?.roleName || req.user?.role || "")
      .trim()
      .toLowerCase();
    const isAdmin = roleName === "admin";

    const shipmentOwnerId = String(
      shipment.userId?._id || shipment.userId || ""
    );
    const loggedInUserId = String(req.user?._id || "");
    const mappedUserId = String(
      req.user?.mappedUserId || req.user?._id || ""
    );

    const allowedUserIds = (req.user?.allowedUserIds || []).map((id) =>
      String(id?._id || id)
    );

    const hasAccess =
      isAdmin ||
      shipmentOwnerId === loggedInUserId ||
      shipmentOwnerId === mappedUserId ||
      allowedUserIds.includes(shipmentOwnerId);

    if (!hasAccess) {
      return res.status(403).json({
        status: 0,
        message: "Access denied"
      });
    }

    // Fetch documents already uploaded against this shipment.
    const documents = await ShipmentDocument.find({
      shipmentId: shipment._id
    }).sort({ createdAt: -1 });

    const shipmentData = shipment.toObject();

    // Keep manually entered HS Code and cargo measurements available to CargoDetails.
    shipmentData.cargo = {
      ...(shipmentData.cargo || {}),
      hsCodeText: shipmentData.cargo?.hsCodeText || "",
      weight: shipmentData.cargo?.weight ?? "",
      grossWeight: shipmentData.cargo?.grossWeight ?? "",
      netWeight: shipmentData.cargo?.netWeight ?? "",
      volumetricWeight: shipmentData.cargo?.volumetricWeight ?? "",
      volumeCBM:
        shipmentData.cargo?.volumeCBM ?? shipmentData.totalVolume ?? "",
      value:
        shipmentData.cargo?.value ??
        shipmentData.invoice?.invoiceValue ??
        "",
      currency:
        shipmentData.cargo?.currency || shipmentData.currency || "INR"
    };

    // Attach saved documents so the edit form can display existing uploads.
    shipmentData.documents = documents;

    return res.json({
      status: 1,
      message: "Shipment details fetched successfully",
      data: shipmentData
    });
  } catch (error) {
    console.error("GET SHIPMENT DETAILS ERROR:", error);

    return res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};


exports.getShipmentTracking = async (req, res) => {
    try {
  
      const shipmentId = req.params.id;

      const mappedUserId =
        req.user.mappedUserId || req.user._id;
  
      const query =
        req.user.roleName === "admin"
          ? {
              _id: shipmentId
            }
          : {
              _id: shipmentId,
              userId: mappedUserId
            };
  
      const shipment = await Shipment.findOne(query)
        .populate("cargo.hsCode");
  
  
      if (!shipment) {
        return res.status(404).json({
          status: 0,
          message: "Shipment not found"
        });
      }
      const trackingTimeline = await ShipmentTracking.find({
        shipmentId
      }).sort({ createdAt: 1 });
      const currentLocation = trackingTimeline.find(
        item => item.current === true
      );
      const parties = await ShipmentParty.find({
        shipmentId
      });
      const documents = await ShipmentDocument.find({
        shipmentId
      });
      const notifications = await Activity.find({
        shipmentId
      })
        .sort({ createdAt: -1 })
        .limit(5);
      const exporter =
        parties.find(x => x.type === "Exporter") || null;
      const importer =
        parties.find(x => x.type === "Importer") || null;
      const notifyParty =
        parties.find(x => x.type === "Notify") || null;
      const header = {
        shipmentId: shipment.sbNumber,
        referenceNumber: shipment.referenceNumber,
      
        shipmentStatus: shipment.shipmentStatus,
        approvalStatus: shipment.approvalStatus,
        trackingStatus: shipment.trackingStatus,
      
        mode: shipment.route.mode,
      
        route: {
          origin: {
            country: shipment.route.originCountry,
            city: shipment.route.originCity
          },
          destination: {
            country: shipment.route.destinationCountry,
            city: shipment.route.destinationCity
          }
        },
      
        etd: shipment.etd,
        eta: shipment.eta,
        transitTime: shipment.transitTime,
        estimatedCost: shipment.estimatedCost
      };
      const liveTracking = {
        location: currentLocation?.location || null,
        currentStatus: currentLocation?.status || shipment.shipmentStatus,
        lastUpdate: currentLocation?.createdAt || null
      };
      const shipmentInfo = {
        shipmentId: shipment.sbNumber,
        carrier: shipment.carrier,
        route: shipment.route,
        quantity: shipment.cargo.quantity,
        weight: shipment.cargo.weight,
        volume: shipment.cargo.volumeCBM
      };
      const transportInfo = {
        awbNumber: shipment.awbNumber,
        incoterm: shipment.incoterm,
        carrier: shipment.carrier,
        etd: shipment.etd,
        eta: shipment.eta,
        transitTime: shipment.transitTime
      };
  
      res.json({
        status: 1,
        message: "Shipment tracking fetched successfully",
  
        data: {
  
          header,
  
          trackingTimeline,
  
          liveTracking,
  
          shipmentInfo,
  
          transportInfo,
  
          parties: {
            exporter,
            importer,
            notifyParty
          },
  
          documents,
  
          notifications
  
        }
  
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  };

  exports.addTrackingUpdate = async (req, res) => {
    try {
  
      const shipmentId = req.params.id;
  
      const {
        status,
        remarks,
        location
      } = req.body;


    const mappedUserId =
  req.user.mappedUserId || req.user._id;

const query =
  req.user.roleName === "admin"
    ? { _id: shipmentId }
    : {
        _id: shipmentId,
        userId: mappedUserId
      };

const shipment = await Shipment.findOne(query);
  
      if (!shipment) {
        return res.status(404).json({
          status: 0,
          message: "Shipment not found"
        });
      }
      if (!status) {
        return res.status(400).json({
          status: 0,
          message: "Tracking status is required"
        });
      }
      await ShipmentTracking.updateMany(
        {
          shipmentId,
          current: true
        },
        {
          current: false
        }
      );
      const tracking = await ShipmentTracking.create({
  
        shipmentId,
  
        status,
  
        location: {
          country: location?.country || "",
          city: location?.city || "",
          address: location?.address || "",
          latitude: location?.latitude || null,
          longitude: location?.longitude || null
        },
  
        remarks,
  
        updatedBy: req.user._id,
  
        current: true
  
      });
const allowed = canMoveToStatus(
  shipment.shipmentStatus,
  status
);

if (!allowed) {
  return res.status(400).json({
    status: 0,
    message: `Shipment cannot move from "${shipment.shipmentStatus}" to "${status}"`
  });
}
shipment.shipmentStatus = status;

shipment.trackingStatus = "Tracking Active";

shipment.lastStatusUpdatedAt = new Date();
shipment.currentLocation = {
  country: location?.country || "",
  city: location?.city || "",
  latitude: location?.latitude || null,
  longitude: location?.longitude || null
};
shipment.statusHistory.push({
  status,
  updatedBy: req.user._id,
  remarks,
  updatedAt: new Date()
});
if (status === "Delivered") {
  shipment.deliveredAt = new Date();
}
if (status === "Closed") {
  shipment.closedAt = new Date();
  shipment.trackingStatus = "Completed";
}

await shipment.save();
      await Activity.create({
  
        userId: req.user._id,
  
        shipmentId: shipment._id,
  
        type: "TRACKING_UPDATED",
        message: `Tracking updated to ${status} at ${location?.city || ""}`
  
      });
  
      res.status(200).json({
        status: 1,
        message: "Tracking updated successfully",
        data: tracking
      });
  
    } catch (err) {
  
      res.status(500).json({
        status: 0,
        message: err.message
      });
  
    }
  };



  exports.updateShipment = async (req, res) => {
    try {
      const mappedUserId = req.user.mappedUserId || req.user._id;

      const query =
        req.user.roleName === "admin"
          ? { _id: req.params.id }
          : { _id: req.params.id, userId: mappedUserId };

      const shipment = await Shipment.findOne(query);

      if (!shipment) {
        return res.status(404).json({
          success: false,
          status: 0,
          message: "Shipment not found or access denied",
        });
      }

      const body = req.body || {};

      // -------------------------------------------------
      // BASIC INFORMATION
      // -------------------------------------------------
      if (body.shipmentType !== undefined) {
        shipment.shipmentType = body.shipmentType;
      }

      const requestedMode = body.shipmentMode ?? body.transportMode;

      if (requestedMode !== undefined) {
        shipment.shipmentMode = requestedMode;
      
        if (!shipment.route) shipment.route = {};
      
        if (["Air", "Sea", "Road"].includes(requestedMode)) {
          shipment.route.mode = requestedMode;
        } else if (requestedMode === "") {
          shipment.route.mode = undefined;
        }
      }

      if (body.incoterm !== undefined) shipment.incoterm = body.incoterm;
      if (body.priority !== undefined) shipment.priority = body.priority;
      if (body.bookingNo !== undefined) shipment.bookingNo = body.bookingNo;
      if (body.etd !== undefined) shipment.etd = body.etd || null;
      if (body.eta !== undefined) shipment.eta = body.eta || null;

      // referenceNumber / sbNumber are generated unique identifiers.
      // They are intentionally not editable through this endpoint.

      // -------------------------------------------------
      // ROUTE DETAILS
      // Only schema-backed route fields are accepted.
      // -------------------------------------------------
      if (body.route && typeof body.route === "object") {
        if (!shipment.route) shipment.route = {};

        const routeFields = [
          "originCountry",
          "originCity",
          "destinationCountry",
          "destinationCity",
          "warehouse",
          "mode",
        ];

        routeFields.forEach((field) => {
          if (body.route[field] !== undefined) {
            shipment.route[field] = body.route[field];
          }
        });

        if (body.route.mode !== undefined) {
          shipment.shipmentMode = body.route.mode;
        }
      }

      // -------------------------------------------------
      // CARGO DETAILS
      // Manual HS Code is stored in cargo.hsCodeText.
      // cargo.hsCode remains reserved for an optional HSCode ObjectId reference.
      // -------------------------------------------------
      if (body.cargo && typeof body.cargo === "object") {
        if (!shipment.cargo) shipment.cargo = {};

        const cargoFields = [
          "productName",
          "productDescription",
          "category",
          "cargoType",
          "hsCodeText", 
          "quantity",
          "unit",
          "weight",
          "grossWeight",
          "netWeight",
          "volumetricWeight",
          "packages",
          "packingType",
          "unNumber",
          "packageMarks",
          "isDangerous",
          "isTemperatureControlled",
          "isStackable",
          "isFragile",
          "hasBattery",
          "isLithium",
          "dimensions",
          "volumeCBM",
          "value",
          "currency",
        ];

        cargoFields.forEach((field) => {
          if (body.cargo[field] !== undefined) {
            shipment.cargo[field] = body.cargo[field];
          }
        });

        if (
          body.cargo.hsCode !== undefined &&
          body.cargo.hsCode !== null &&
          mongoose.Types.ObjectId.isValid(body.cargo.hsCode)
        ) {
          shipment.cargo.hsCode = body.cargo.hsCode;
        }

        // Keep package count aliases consistent for older screens.
        if (body.cargo.packages !== undefined && body.cargo.quantity === undefined) {
          shipment.cargo.quantity = body.cargo.packages;
        }
        if (body.cargo.quantity !== undefined && body.cargo.packages === undefined) {
          shipment.cargo.packages = body.cargo.quantity;
        }
      }

      // -------------------------------------------------
      // COMPLIANCE / ADDITIONAL INFORMATION
      // -------------------------------------------------
      if (
        body.additionalInformation &&
        typeof body.additionalInformation === "object"
      ) {
        if (!shipment.additionalInformation) {
          shipment.additionalInformation = {};
        }

        const additionalFields = [
          "packagingType",
          "packages",
          "marksNumbers",
          "inspectionRequired",
          "dangerousGoods",
          "specialHandling",
          "temperatureControl",
          "remarks",
        ];

        additionalFields.forEach((field) => {
          if (body.additionalInformation[field] !== undefined) {
            shipment.additionalInformation[field] =
              body.additionalInformation[field];
          }
        });
      }

      if (body.notes !== undefined) shipment.notes = body.notes;
      if (body.insuranceRequired !== undefined) {
        shipment.insuranceRequired = body.insuranceRequired;
      }

      // -------------------------------------------------
      // PARTY DETAILS
      // Explicitly allow only fields defined in Shipment schema.
      // Merge with existing values so partial updates never erase
      // fields that were not included in the request.
      // -------------------------------------------------
      const partyFields = {
        exporter: [
          "companyName",
          "iecNumber",
          "contactPerson",
          "email",
          "mobile",
        ],
        importer: [
          "companyName",
          "address",
          "iecNumber",
          "contactPerson",
          "email",
          "mobile",
        ],
        notifyParty: [
          "companyName",
          "contactPerson",
          "email",
          "mobile",
        ],
      };

      Object.entries(partyFields).forEach(([partyKey, allowedFields]) => {
        const incomingParty = body[partyKey];

        if (!incomingParty || typeof incomingParty !== "object" || Array.isArray(incomingParty)) {
          return;
        }

        const existingParty =
          shipment[partyKey]?.toObject?.() || shipment[partyKey] || {};

        const mergedParty = { ...existingParty };

        allowedFields.forEach((field) => {
          if (incomingParty[field] !== undefined) {
            mergedParty[field] = incomingParty[field];
          }
        });

        shipment[partyKey] = mergedParty;
      });

      // Save all cargo changes
shipment.markModified("cargo");
await shipment.save();

// Fetch saved data again directly from MongoDB
const updatedShipment = await Shipment.findById(shipment._id)
  .populate("cargo.hsCode")
  .lean();

console.log("========== CARGO DATABASE SAVE CHECK ==========");
console.log(JSON.stringify(updatedShipment?.cargo, null, 2));
console.log("================================================");

return res.status(200).json({
  success: true,
  status: 1,
  message: "Shipment updated successfully",
  data: updatedShipment,
});

      return res.status(200).json({
        success: true,
        status: 1,
        message: "Shipment updated successfully",
        data: updatedShipment,
      });
    } catch (error) {
      console.error("Update shipment error:", error);

      return res.status(500).json({
        success: false,
        status: 0,
        message: error.message,
      });
    }
  };