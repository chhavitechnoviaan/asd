// const Quotation = require("../models/quotation");
// const Shipment = require("../models/Shipment");


// // ================================
// // CREATE QUOTATION
// // ================================
// exports.createQuotation = async (req, res) => {
//   try {
//     const {
//         shipmentId,
//         charges,
//         discount,
//         tax,
//         currency,
//         validFrom,
//         validUntil,
//         quoteVersion,
//         freightQuote,
//         notes,
//         termsAndConditions,
//       } = req.body;

//     console.log("========== CREATE QUOTATION ==========");
//     console.log("Request Body:", req.body);

//     // Check shipment
//     const shipment = await Shipment.findById(shipmentId);

//     if (!shipment) {
//       return res.status(404).json({
//         success: false,
//         message: "Shipment not found",
//       });
//     }

//     // Calculate subtotal
//     const subtotal = (charges || []).reduce(
//       (total, item) =>
//         total + Number(item.amount || 0),
//       0
//     );

//     const totalAmount =
//     subtotal -
//     Number(discount || 0) +
//     Number(tax || 0);

//     // Generate quotation number
//     const quotationNumber =
//       `QT-${Date.now()}`;

//     const quotation =
//       await Quotation.create({
//         shipmentId,

//         quotationNumber,

//         charges,

//         subtotal,

//         tax: tax || 0,

//         totalAmount,

//         currency: currency || "USD",

//         validUntil,

//         notes,

//         status: "Draft",

//         createdBy: req.user?._id || null,

//         discount: discount || 0,
// validFrom,
// quoteVersion,
// freightQuote: freightQuote || 0,
// termsAndConditions,
//       });

//     console.log(
//       "QUOTATION CREATED:",
//       quotation
//     );

//     console.log(
//       "========== CREATE QUOTATION END =========="
//     );

//     return res.status(201).json({
//       success: true,
//       message: "Quotation created successfully",
//       data: quotation,
//     });

//   } catch (error) {

//     console.error(
//       "CREATE QUOTATION ERROR:",
//       error
//     );

//     return res.status(500).json({
//       success: false,
//       message: "Failed to create quotation",
//       error: error.message,
//     });
//   }
// };



// // ================================
// // GET QUOTATION BY SHIPMENT
// // ================================
// exports.getQuotationByShipment =
//   async (req, res) => {
//     try {

//       const { shipmentId } = req.params;

//       const quotations =
//         await Quotation.find({
//           shipmentId,
//         })
//           .sort({ createdAt: -1 });

//       return res.status(200).json({
//         success: true,
//         data: quotations,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch quotations",
//         error: error.message,
//       });
//     }
//   };



// // ================================
// // GET SINGLE QUOTATION
// // ================================
// exports.getQuotationById =
//   async (req, res) => {
//     try {

//       const quotation =
//         await Quotation.findById(
//           req.params.id
//         )
//           .populate("shipmentId");

//       if (!quotation) {
//         return res.status(404).json({
//           success: false,
//           message: "Quotation not found",
//         });
//       }

//       return res.status(200).json({
//         success: true,
//         data: quotation,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch quotation",
//         error: error.message,
//       });
//     }
//   };



// // ================================
// // SHARE QUOTATION
// // ================================
// exports.shareQuotation = async (req, res) => {
//     try {
//       const quotation = await Quotation.findById(req.params.id);
  
//       if (!quotation) {
//         return res.status(404).json({
//           success: false,
//           message: "Quotation not found",
//         });
//       }
  
//       if (quotation.status === "Shared") {
//         return res.status(400).json({
//           success: false,
//           message: "Quotation is already shared",
//         });
//       }
  
//       quotation.status = "Shared";
//       quotation.sharedAt = new Date();
  
//       await quotation.save();
  
//       return res.status(200).json({
//         success: true,
//         message: "Quotation shared with B2B successfully",
//         data: quotation,
//       });
  
//     } catch (error) {
//       console.error("SHARE QUOTATION ERROR:", error);
  
//       return res.status(500).json({
//         success: false,
//         message: "Failed to share quotation",
//         error: error.message,
//       });
//     }
//   };


//  // ================================
// // GET MY SHARED QUOTATIONS - B2B
// // ================================
// exports.getMySharedQuotations = async (req, res) => {
//     try {
//       const userId = req.user?._id;
  
//       if (!userId) {
//         return res.status(401).json({
//           success: false,
//           message: "User not authenticated",
//         });
//       }
  
//       const quotations = await Quotation.find({
//         status: "Shared",
//       })
//         .populate({
//           path: "shipmentId",
//           match: {
//             userId: userId,
//           },
//         })
//         .sort({ createdAt: -1 });
  
//       // Sirf wahi quotations rakho
//       // jinki shipment logged-in B2B user ki hai
//       const userQuotations = quotations.filter(
//         (quotation) => quotation.shipmentId
//       );
  
//       return res.status(200).json({
//         success: true,
//         message: "Shared quotations fetched successfully",
//         data: userQuotations,
//       });
  
//     } catch (error) {
//       console.error(
//         "GET MY SHARED QUOTATIONS ERROR:",
//         error
//       );
  
//       return res.status(500).json({
//         success: false,
//         message: "Failed to fetch shared quotations",
//         error: error.message,
//       });
//     }
//   }; 


// // ================================
// // ACCEPT QUOTATION
// // ================================
// exports.acceptQuotation =
//   async (req, res) => {
//     try {

//       const quotation =
//         await Quotation.findById(
//           req.params.id
//         );

//       if (!quotation) {
//         return res.status(404).json({
//           success: false,
//           message: "Quotation not found",
//         });
//       }

//       if (
//         quotation.status !== "Shared"
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             "Only shared quotations can be accepted",
//         });
//       }

//       quotation.status = "Accepted";

//       quotation.acceptedAt =
//         new Date();

//       await quotation.save();

//       return res.status(200).json({
//         success: true,
//         message:
//           "Quotation accepted successfully",
//         data: quotation,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message:
//           "Failed to accept quotation",
//         error: error.message,
//       });
//     }
//   };



// // ================================
// // REJECT QUOTATION
// // ================================
// exports.rejectQuotation =
//   async (req, res) => {
//     try {

//       const {
//         rejectionReason,
//       } = req.body;

//       const quotation =
//         await Quotation.findById(
//           req.params.id
//         );

//       if (!quotation) {
//         return res.status(404).json({
//           success: false,
//           message: "Quotation not found",
//         });
//       }

//       if (
//         quotation.status !== "Shared"
//       ) {
//         return res.status(400).json({
//           success: false,
//           message:
//             "Only shared quotations can be rejected",
//         });
//       }

//       quotation.status = "Rejected";

//       quotation.rejectionReason =
//         rejectionReason || "";

//       quotation.rejectedAt =
//         new Date();

//       await quotation.save();

//       return res.status(200).json({
//         success: true,
//         message:
//           "Quotation rejected successfully",
//         data: quotation,
//       });

//     } catch (error) {

//       return res.status(500).json({
//         success: false,
//         message:
//           "Failed to reject quotation",
//         error: error.message,
//       });
//     }
//   };


// mahima code //
const Quotation = require("../models/quotationModel");
const Shipment = require("../models/Shipment");



// Replace your existing exports.createQuotation with this function.
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
      quoteVersion,
      freightQuote,
      notes,
      termsAndConditions,
    } = req.body;

    if (!shipmentId) {
      return res.status(400).json({ success: false, message: "shipmentId is required" });
    }

    const shipment = await Shipment.findById(shipmentId);
    if (!shipment) {
      return res.status(404).json({ success: false, message: "Shipment not found" });
    }

    // Prevent duplicate quotations for the same shipment.
    const existingQuotation = await Quotation.findOne({ shipmentId }).sort({ createdAt: -1 });
    if (existingQuotation) {
      // Repair the shipment link for quotations created before this workflow update.
      shipment.quotationId = existingQuotation._id;
      shipment.quotationStatus = existingQuotation.status;
      shipment.workflowStatus =
        existingQuotation.status === "Shared" ? "Quotation Sent" :
        existingQuotation.status === "Accepted" ? "Quotation Accepted" :
        existingQuotation.status === "Rejected" ? "Quotation Rejected" :
        "Quotation Draft";
      shipment.lastStatusUpdatedAt = new Date();
      await shipment.save();

      return res.status(200).json({
        success: true,
        message: "A quotation already exists for this shipment. Reusing the saved quotation.",
        data: existingQuotation,
        alreadyExists: true,
      });
    }

    const subtotal = (charges || []).reduce(
      (total, item) => total + Number(item.amount || 0),
      0
    );
    const totalAmount = subtotal - Number(discount || 0) + Number(tax || 0);

    const quotation = await Quotation.create({
      shipmentId,
      quotationNumber: `QT-${Date.now()}`,
      charges,
      subtotal,
      tax: tax || 0,
      totalAmount,
      currency: currency || "USD",
      validFrom,
      validUntil,
      quoteVersion,
      freightQuote: freightQuote || 0,
      notes,
      termsAndConditions,
      status: "Draft",
      createdBy: req.user?._id || null,
      discount: discount || 0,
    });

    // Persist the workflow progress on the shipment itself.
    shipment.quotationId = quotation._id;
    shipment.quotationStatus = "Draft";
    shipment.workflowStatus = "Quotation Draft";
    shipment.lastStatusUpdatedAt = new Date();
    shipment.statusHistory.push({
      status: "Quotation Draft",
      updatedBy: req.user?._id,
      remarks: `Quotation ${quotation.quotationNumber} created and linked to shipment`,
      updatedAt: new Date(),
    });
    await shipment.save();

    return res.status(201).json({
      success: true,
      message: "Quotation created and linked to shipment successfully",
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
        return res.status(404).json({
          success: false,
          message: "Quotation not found",
        });
      }

      return res.status(200).json({
        success: true,
        data: quotation,
      });

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
        status: "Shared",
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
      const userQuotations = quotations.filter(
        (quotation) => quotation.shipmentId
      );
  
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

    quotation.status = "Rejected";
    quotation.rejectionReason = rejectionReason || "";
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