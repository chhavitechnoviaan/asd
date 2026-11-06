const Quotation = require("../models/quotation");
const Shipment = require("../models/Shipment");

const getShipmentWorkflowType = (shipment) => {
  const creatorRole = String(shipment?.createdByRole || "").trim().toLowerCase();
  const customerType = String(shipment?.customerType || "").trim().toLowerCase();

  // Explicit B2B markers take priority, even when Admin created the shipment.
  const isB2BShipment =
    creatorRole === "b2b" ||
    customerType === "b2b" ||
    Boolean(shipment?.b2bCompanyId);

  const isAdminOnlyShipment =
    !isB2BShipment &&
    (
      creatorRole === "user" ||
      creatorRole === "admin" ||
      customerType === "individual" ||
      !creatorRole
    );

  return { isB2BShipment, isAdminOnlyShipment };
};

exports.createQuotation = async (req, res) => {
 try {
   const {
     shipmentId,
     charges,
     discount,
     tax,
     currency,
     validFrom,
     validUntil,
     freightQuote,
     notes,
     termsAndConditions,
   } = req.body;

   if (!shipmentId) {
     return res.status(400).json({
       success: false,
       message: "Shipment ID is required",
     });
   }

   const shipment = await Shipment.findById(shipmentId);

   if (!shipment) {
     return res.status(404).json({
       success: false,
       message: "Shipment not found",
     });
   }

   // Do not create another quotation while one is still active,
   // or after the customer has accepted a quotation.
   const existingActiveQuotation = await Quotation.findOne({
     shipmentId,
     status: { $in: ["Draft", "Shared", "Accepted"] },
   }).sort({ createdAt: -1, _id: -1 });

   if (existingActiveQuotation) {
     return res.status(400).json({
       success: false,
       message:
         existingActiveQuotation.status === "Accepted"
           ? "Quotation has already been accepted"
           : "An active quotation already exists",
       data: existingActiveQuotation,
     });
   }

   // A revised quotation is created as a NEW document.
   // Previous rejected/expired quotations and their reasons remain unchanged.
   const quotationCount = await Quotation.countDocuments({ shipmentId });
   const quoteVersion = `V.${quotationCount + 1}`;

   const normalizedCharges = Array.isArray(charges)
     ? charges.map((item, index) => {
         const amount = Number(item?.amount ?? 0);

         if (!Number.isFinite(amount) || amount < 0) {
           throw new Error(`Invalid amount for charge ${index + 1}`);
         }

         return {
           ...item,
           amount,
         };
       })
     : [];

   const normalizedDiscount = Number(discount || 0);
   const normalizedTax = Number(tax || 0);
   const normalizedFreightQuote = Number(freightQuote || 0);

   if (
     !Number.isFinite(normalizedDiscount) ||
     normalizedDiscount < 0 ||
     !Number.isFinite(normalizedTax) ||
     normalizedTax < 0 ||
     !Number.isFinite(normalizedFreightQuote) ||
     normalizedFreightQuote < 0
   ) {
     return res.status(400).json({
       success: false,
       message: "Discount, tax and freight amount must be valid non-negative numbers",
     });
   }

   const subtotal = normalizedCharges.reduce(
     (total, item) => total + item.amount,
     0
   );

   const totalAmount = subtotal - normalizedDiscount + normalizedTax;

   const quotation = await Quotation.create({
     shipmentId,
     quotationNumber: `QT-${Date.now()}`,
     quoteVersion,
     charges: normalizedCharges,
     subtotal,
     discount: normalizedDiscount,
     tax: normalizedTax,
     totalAmount,
     currency: currency || "INR",
     freightQuote: normalizedFreightQuote,
     validFrom,
     validUntil,
     notes,
     termsAndConditions,
     status: "Draft",
     rejectionReason: "",
     createdBy: req.user?._id || null,
   });

   shipment.quotationId = quotation._id;
   shipment.quotationStatus = "Draft";
   shipment.workflowStatus = "Quotation Draft";
   shipment.lastStatusUpdatedAt = new Date();

   if (!Array.isArray(shipment.statusHistory)) {
     shipment.statusHistory = [];
   }

   shipment.statusHistory.push({
     status: "Quotation Draft",
     updatedBy: req.user?._id,
     remarks: `Quotation ${quotation.quotationNumber} (${quoteVersion}) created`,
     updatedAt: new Date(),
   });

   await shipment.save();

   return res.status(201).json({
     success: true,
     message: `Quotation ${quoteVersion} created successfully`,
     data: quotation,
   });
 } catch (error) {
   console.error("CREATE QUOTATION ERROR:", error);

   return res.status(500).json({
     success: false,
     message: "Failed to create quotation",
     error: error.message,
   });
 }
};


// ================================
// GET QUOTATION BY SHIPMENT
// ================================
exports.getQuotationByShipment =
 async (req, res) => {
   try {

     const { shipmentId } = req.params;

     const shipment = await Shipment.findById(shipmentId);
     if (!shipment) return res.status(404).json({ success: false, message: "Shipment not found" });
const role = String(req.user?.roleName || req.user?.role || "").toLowerCase();
      const isAdmin = role === "admin";
      const { isAdminOnlyShipment } = getShipmentWorkflowType(shipment);
      if (!isAdmin && isAdminOnlyShipment) {
        return res.status(403).json({
          success: false,
          message: "Quotation is managed by Admin. Please contact Admin for the quotation."
        });
      }
     const quotations =
       await Quotation.find({
         shipmentId,
       })
         .sort({ createdAt: -1 });

     return res.status(200).json({
       success: true,
       data: quotations,
     });

   } catch (error) {

     return res.status(500).json({
       success: false,
       message: "Failed to fetch quotations",
       error: error.message,
     });
   }
 };



// ================================
// GET SINGLE QUOTATION
// ================================
exports.getQuotationById =
 async (req, res) => {
   try {

     const quotation =
       await Quotation.findById(
         req.params.id
       )
         .populate("shipmentId");

     if (!quotation) {
       return res.status(404).json({ success: false, message: "Quotation not found" });
     }
     const shipment = await Shipment.findById(quotation.shipmentId);
const role = String(req.user?.roleName || req.user?.role || "").toLowerCase();
      const isAdmin = role === "admin";
      const { isAdminOnlyShipment } = getShipmentWorkflowType(shipment);
      if (!isAdmin && isAdminOnlyShipment) {
        return res.status(403).json({
          success: false,
          message: "Quotation is managed by Admin."
        });
      }
     return res.status(200).json({ success: true, data: quotation });

   } catch (error) {

     return res.status(500).json({
       success: false,
       message: "Failed to fetch quotation",
       error: error.message,
     });
   }
 };



// ================================
// SHARE QUOTATION
// ================================
exports.shareQuotation = async (req, res) => {
 try {
   const quotation = await Quotation.findById(req.params.id);

   if (!quotation) {
     return res.status(404).json({
       success: false,
       message: "Quotation not found",
     });
   }

   if (!["Draft"].includes(quotation.status)) {
     return res.status(400).json({
       success: false,
       message: "Only draft quotations can be sent",
     });
   }

   const shipment = await Shipment.findById(quotation.shipmentId);
   if (!shipment) {
     return res.status(404).json({
       success: false,
       message: "Linked shipment not found",
     });
   }

   const { isAdminOnlyShipment } = getShipmentWorkflowType(shipment);


   if (isAdminOnlyShipment) {


     return res.status(403).json({


       success: false,


       message: "This quotation is Admin-only and cannot be shared with the customer."


     });


   }



   quotation.status = "Shared";
   quotation.sharedAt = new Date();
   await quotation.save();

   shipment.quotationId = quotation._id;
   shipment.quotationStatus = "Shared";
   shipment.workflowStatus = "Quotation Sent";
   shipment.lastStatusUpdatedAt = new Date();
   shipment.statusHistory = shipment.statusHistory || [];
   shipment.statusHistory.push({
     status: "Quotation Sent",
     updatedBy: req.user?._id,
     remarks: `Quotation ${quotation.quotationNumber} sent to customer`,
     updatedAt: new Date(),
   });
   await shipment.save();

   return res.status(200).json({
     success: true,
     message: "Quotation sent successfully",
     data: quotation,
   });
 } catch (error) {
   console.error("SHARE QUOTATION ERROR:", error);
   return res.status(500).json({
     success: false,
     message: "Failed to send quotation",
     error: error.message,
   });
 }
};


// ================================
// GET MY SHARED QUOTATIONS - B2B
// ================================
exports.getMySharedQuotations = async (req, res) => {
   try {
     const userId = req.user?._id;
 
     if (!userId) {
       return res.status(401).json({
         success: false,
         message: "User not authenticated",
       });
     }
 
     const quotations = await Quotation.find({
       status: { $in: ["Shared", "Rejected", "Accepted"] },
     })
       .populate({
         path: "shipmentId",
         match: {
           userId: userId,
         },
       })
       .sort({ createdAt: -1 });
 
     // Sirf wahi quotations rakho
     // jinki shipment logged-in B2B user ki hai
     const userQuotations = quotations.filter((quotation) => {
       const shipment = quotation.shipmentId;
       if (!shipment) return false;
       return getShipmentWorkflowType(shipment).isB2BShipment;
     });
 
     return res.status(200).json({
       success: true,
       message: "Shared quotations fetched successfully",
       data: userQuotations,
     });
 
   } catch (error) {
     console.error(
       "GET MY SHARED QUOTATIONS ERROR:",
       error
     );
 
     return res.status(500).json({
       success: false,
       message: "Failed to fetch shared quotations",
       error: error.message,
     });
   }
 }; 


// ================================
// ACCEPT QUOTATION
// ================================
exports.acceptQuotation = async (req, res) => {
 try {
   const quotation = await Quotation.findById(req.params.id);

   if (!quotation) {
     return res.status(404).json({
       success: false,
       message: "Quotation not found",
     });
   }

   if (quotation.status !== "Shared") {
     return res.status(400).json({
       success: false,
       message: "Only sent quotations can be accepted",
     });
   }

   const shipment = await Shipment.findById(quotation.shipmentId);
   if (!shipment) {
     return res.status(404).json({
       success: false,
       message: "Linked shipment not found",
     });
   }

   const { isAdminOnlyShipment } = getShipmentWorkflowType(shipment);
    if (isAdminOnlyShipment) {
      return res.status(403).json({
        success: false,
        message: "This is an Admin-only quotation. Customer response is not part of this workflow."
      });
    }

    const mappedUserId = req.user?.mappedUserId || req.user?._id;
   if (
     req.user?.roleName !== "admin" &&
     shipment.userId?.toString() !== mappedUserId?.toString()
   ) {
     return res.status(403).json({
       success: false,
       message: "You are not allowed to respond to this quotation",
     });
   }
   const linkedShipment = await Shipment.findById(quotation.shipmentId);
   const requesterRole = String(req.user?.roleName || req.user?.role || "").toLowerCase();
   const requesterIsB2B = requesterRole === "b2b" || requesterRole.includes("b2b");
   if (String(linkedShipment?.createdByRole || "User").toLowerCase() === "user" && !requesterIsB2B && requesterRole !== "admin") {
     return res.status(403).json({ success: false, message: "Normal User quotations are handled by Admin." });
   }


   quotation.status = "Accepted";
   quotation.acceptedAt = new Date();
   await quotation.save();

   shipment.quotationId = quotation._id;
   shipment.quotationStatus = "Accepted";
   shipment.workflowStatus = "Quotation Accepted";
   shipment.lastStatusUpdatedAt = new Date();
   shipment.statusHistory = shipment.statusHistory || [];
   shipment.statusHistory.push({
     status: "Quotation Accepted",
     updatedBy: req.user?._id,
     remarks: `Customer accepted quotation ${quotation.quotationNumber}`,
     updatedAt: new Date(),
   });
   await shipment.save();

   return res.status(200).json({
     success: true,
     message: "Quotation accepted successfully",
     data: {
       quotation,
       shipmentStatus: shipment.workflowStatus,
     },
   });
 } catch (error) {
   console.error("ACCEPT QUOTATION ERROR:", error);
   return res.status(500).json({
     success: false,
     message: "Failed to accept quotation",
     error: error.message,
   });
 }
};


// ================================
// REJECT QUOTATION
// ================================
exports.rejectQuotation = async (req, res) => {
 try {
   const { rejectionReason } = req.body;
   if (!rejectionReason || !rejectionReason.trim()) {
     return res.status(400).json({
       success: false,
       message: "Please provide a reason for rejecting this quotation",
     });
   }

   const quotation = await Quotation.findById(req.params.id);

   if (!quotation) {
     return res.status(404).json({
       success: false,
       message: "Quotation not found",
     });
   }

   if (quotation.status !== "Shared") {
     return res.status(400).json({
       success: false,
       message: "Only sent quotations can be rejected",
     });
   }

   const shipment = await Shipment.findById(quotation.shipmentId);
   if (!shipment) {
     return res.status(404).json({
       success: false,
       message: "Linked shipment not found",
     });
   }

   const { isAdminOnlyShipment } = getShipmentWorkflowType(shipment);
    if (isAdminOnlyShipment) {
      return res.status(403).json({
        success: false,
        message: "This is an Admin-only quotation. Customer response is not part of this workflow."
      });
    }

    const mappedUserId = req.user?.mappedUserId || req.user?._id;
   if (
     req.user?.roleName !== "admin" &&
     shipment.userId?.toString() !== mappedUserId?.toString()
   ) {
     return res.status(403).json({
       success: false,
       message: "You are not allowed to respond to this quotation",
     });
   }
   const linkedShipment = await Shipment.findById(quotation.shipmentId);
   const requesterRole = String(req.user?.roleName || req.user?.role || "").toLowerCase();
   const requesterIsB2B = requesterRole === "b2b" || requesterRole.includes("b2b");
   if (String(linkedShipment?.createdByRole || "User").toLowerCase() === "user" && !requesterIsB2B && requesterRole !== "admin") {
     return res.status(403).json({ success: false, message: "Normal User quotations are handled by Admin." });
   }


   quotation.status = "Rejected";
   quotation.rejectionReason = rejectionReason.trim();
   quotation.rejectedAt = new Date();
   await quotation.save();

   shipment.quotationId = quotation._id;
   shipment.quotationStatus = "Rejected";
   shipment.workflowStatus = "Quotation Rejected";
   shipment.lastStatusUpdatedAt = new Date();
   shipment.statusHistory = shipment.statusHistory || [];
   shipment.statusHistory.push({
     status: "Quotation Rejected",
     updatedBy: req.user?._id,
     remarks: rejectionReason
       ? `Quotation rejected: ${rejectionReason}`
       : `Customer rejected quotation ${quotation.quotationNumber}`,
     updatedAt: new Date(),
   });
   await shipment.save();

   return res.status(200).json({
     success: true,
     message: "Quotation rejected successfully",
     data: {
       quotation,
       shipmentStatus: shipment.workflowStatus,
     },
   });
 } catch (error) {
   console.error("REJECT QUOTATION ERROR:", error);
   return res.status(500).json({
     success: false,
     message: "Failed to reject quotation",
     error: error.message,
   });
 }
};


// ==========================================
// UPDATE QUOTATION CHARGES
// ==========================================
exports.updateQuotationCharges = async (req, res) => {
 try {
   const { id } = req.params;
   const { charges } = req.body;

   if (!Array.isArray(charges)) {
     return res.status(400).json({
       success: false,
       message: "Charges must be an array",
     });
   }

   const quotation = await Quotation.findById(id);

   if (!quotation) {
     return res.status(404).json({
       success: false,
       message: "Quotation not found",
     });
   }

   // Validate and normalize charges
   const updatedCharges = charges.map((charge) => {
     const name = String(charge.name || "").trim();
     const amount = Number(charge.amount);

     if (!name) {
       throw new Error("Charge name is required");
     }

     if (!Number.isFinite(amount) || amount < 0) {
       throw new Error(`Invalid amount for charge: ${name}`);
     }

     return {
       ...(charge._id ? { _id: charge._id } : {}),
       name,
       description: String(charge.description || "").trim(),
       amount,
       currency: charge.currency || quotation.currency || "INR",
     };
   });

   const subtotal = updatedCharges.reduce(
     (sum, charge) => sum + charge.amount,
     0
   );

   const discount = Number(quotation.discount || 0);
   const tax = Number(quotation.tax || 0);

   quotation.charges = updatedCharges;
   quotation.subtotal = subtotal;
   quotation.totalAmount = subtotal - discount + tax;

   await quotation.save();

   return res.status(200).json({
     success: true,
     message: "Quotation charges updated successfully",
     data: quotation,
   });
 } catch (error) {
   console.error("UPDATE QUOTATION CHARGES ERROR:", error);

   return res.status(400).json({
     success: false,
     message: error.message || "Failed to update quotation charges",
   });
 }
};