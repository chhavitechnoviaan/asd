// const Setting = require("../models/Setting");
// const User = require("../models/user");
// const Activity = require("../models/Activity");

// exports.getSettings = async (req, res) => {
//     try {
  
//       const settings = await Setting.findOne({
//         userId: req.user._id
//       });
  
//       res.json({
//         status: 1,
//         data: settings
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         status: 0,
//         message: error.message
//       });
  
//     }
//   };

//   exports.updateGeneral = async (req, res) => {
//     try {
  
//       const settings = await Setting.findOneAndUpdate(
  
//         {
//           userId: req.user._id
//         },
  
//         {
//           language: req.body.language,
//           timezone: req.body.timezone,
//           currency: req.body.currency,
//           theme: req.body.theme,
//           dashboardLayout: req.body.dashboardLayout,
//           units: req.body.units
//         },
  
//         {
//           new: true,
//           upsert: true
//         }
  
//       );
  
//       res.json({
//         status: 1,
//         message: "General settings updated",
//         data: settings
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         status: 0,
//         message: error.message
//       });
  
//     }
//   };

//   exports.updatePreferences = async (req, res) => {
//     try {
  
//       const settings = await Setting.findOneAndUpdate(
  
//         {
//           userId: req.user._id
//         },
  
//         {
//           defaultCountry: req.body.defaultCountry,
//           defaultPage: req.body.defaultPage,
//           itemsPerPage: req.body.itemsPerPage
//         },
  
//         {
//           new: true
//         }
  
//       );
  
//       res.json({
//         status: 1,
//         data: settings
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         status: 0,
//         message: error.message
//       });
  
//     }
//   };

//   exports.updateNotifications = async (req, res) => {
//     try {
  
//       const settings = await Setting.findOneAndUpdate(
  
//         {
//           userId: req.user._id
//         },
  
//         {
//           emailNotification: req.body.emailNotification,
//           pushNotification: req.body.pushNotification,
//           smsNotification: req.body.smsNotification
//         },
  
//         {
//           new: true
//         }
  
//       );
  
//       res.json({
//         status: 1,
//         data: settings
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         status: 0,
//         message: error.message
//       });
  
//     }
//   };

//   exports.updateSecurity = async (req, res) => {
//     try {
  
//       const settings = await Setting.findOneAndUpdate(
  
//         {
//           userId: req.user._id
//         },
  
//         {
//           twoFactorAuth: req.body.twoFactorAuth,
//           sessionTimeout: req.body.sessionTimeout
//         },
  
//         {
//           new: true
//         }
  
//       );
  
//       res.json({
//         status: 1,
//         data: settings
//       });
  
//     } catch (error) {
  
//       res.status(500).json({
//         status: 0,
//         message: error.message
//       });
  
//     }
//   };

//   exports.updateBilling = async (req, res) => {
//   try {

//     const settings = await Setting.findOneAndUpdate(
//       {
//         userId: req.user._id
//       },
//       {
//         billingEmail: req.body.billingEmail,
//         billingCompanyName: req.body.billingCompanyName,
//         billingGstNumber: req.body.billingGstNumber
//       },
//       {
//         new: true,
//         upsert: true
//       }
//     );

//     res.json({
//       status: 1,
//       message: "Billing updated successfully",
//       data: settings
//     });

//   } catch (error) {

//     res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };
//   exports.updateTheme = async(req,res)=>{

//     try{
    
//     const settings=await Setting.findOneAndUpdate(
    
//     {
//     userId:req.user._id
//     },
    
//     {
//     theme:req.body.theme
//     },
    
//     {
//     new:true
//     }
    
//     );
    
//     res.json({
    
//     status:1,
    
//     message:"Theme updated successfully",
    
//     data:settings
    
//     });
    
//     }catch(error){
    
//     res.status(500).json({
    
//     status:0,
    
//     message:error.message
    
//     });
    
//     }
    
//     };

//    const bcrypt = require("bcryptjs");

// exports.changePassword = async (req, res) => {
//   try {

//     const {
//       oldPassword,
//       newPassword
//     } = req.body;

//     const user = await User.findById(req.user._id)
//       .select("+password");

//     const match = await bcrypt.compare(
//       oldPassword,
//       user.password
//     );

//     if (!match) {
//       return res.status(400).json({
//         status: 0,
//         message: "Old password is incorrect"
//       });
//     }

//     const hash = await bcrypt.hash(newPassword, 10);

//     user.password = hash;

//     await user.save();

//     res.json({
//       status: 1,
//       message: "Password changed successfully"
//     });

//   } catch (error) {

//     res.status(500).json({
//       status: 0,
//       message: error.message
//     });

//   }
// };

// exports.getActivity=async(req,res)=>{

//     try{
    
//     const activity=await Activity.find({
    
//     userId:req.user._id
    
//     })
    
//     .sort({
    
//     createdAt:-1
    
//     })
    
//     .limit(10);
    
//     res.json({
    
//     status:1,
    
//     data:activity
    
//     });
    
//     }catch(error){
    
//     res.status(500).json({
    
//     status:0,
    
//     message:error.message
    
//     });
    
//     }
    
//     };

//    exports.getAccountSummary = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id)
//       .select(
//         "name email phone companyName gstNumber importExportId businessType " +
//         "country city address accountType plan accountStatus profileCompletion " +
//         "emailVerified phoneVerified gstVerified twoFactorEnabled profileImage " +
//         "designation createdAt lastLogin planExpiry " +
//         "kycStatus kycVerifiedAt kycRejectedAt " +
//         "kycRejectionReasons kycRejectionNote kycDocuments"
//       )
//       .populate("roleId", "name")
//       .populate("planId");

//     const settings = await Setting.findOne({
//       userId: req.user._id
//     });

//     res.json({
//       status: 1,
//       data: {
//         user,
//         theme: settings?.theme,
//         language: settings?.language,
//         currency: settings?.currency,
//         timezone: settings?.timezone
//       }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 0,
//       message: error.message
//     });
//   }
// };
// exports.uploadKYCDocuments = async (req, res) => {
//   try {
//     const documents = req.files || [];

//     if (!documents.length) {
//       return res.status(400).json({
//         status: 0,
//         message: "Please upload at least one document",
//       });
//     }

//     const documentTypes = Array.isArray(req.body.documentTypes)
//       ? req.body.documentTypes
//       : req.body.documentTypes
//       ? [req.body.documentTypes]
//       : [];

//     const documentTitles = Array.isArray(req.body.documentTitles)
//       ? req.body.documentTitles
//       : req.body.documentTitles
//       ? [req.body.documentTitles]
//       : [];

//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         status: 0,
//         message: "User not found",
//       });
//     }

//     documents.forEach((file, index) => {
//       const documentType =
//         documentTypes[index] || "KYC Document";

//       const documentTitle =
//         documentTitles[index] || file.originalname;

//       const newDocument = {
//         type: documentType,
//         title: documentTitle,
//         url: `https://${req.get("host")}/uploads/documents/${file.filename}`,
//         uploadedAt: new Date(),
//       };

//       const existingDocumentIndex = (
//         user.kycDocuments || []
//       ).findIndex(
//         (document) => document.type === documentType
//       );

//       if (existingDocumentIndex !== -1) {
//         user.kycDocuments[existingDocumentIndex] =
//           newDocument;
//       } else {
//         user.kycDocuments.push(newDocument);
//       }
//     });

   
//     await user.save();

//     res.json({
//       status: 1,
//       message: "KYC documents uploaded successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 0,
//       message: error.message,
//     });
//   }
// };
// exports.submitKYC = async (req, res) => {
//   try {
//     const user = await User.findById(req.user._id);

//     if (!user) {
//       return res.status(404).json({
//         status: 0,
//         message: "User not found",
//       });
//     }

//     const REQUIRED_KYC_DOCUMENTS = [
//       "GST Certificate",
//       "IEC Certificate",
//       "PAN Card",
//       "Company Registration",
//       "Address Proof",
//     ];

//     const uploadedTypes = (user.kycDocuments || []).map(
//       (document) => document.type
//     );

//     const missingDocuments = REQUIRED_KYC_DOCUMENTS.filter(
//       (requiredType) => !uploadedTypes.includes(requiredType)
//     );

//     if (missingDocuments.length > 0) {
//       return res.status(400).json({
//         status: 0,
//         message: "Please upload all required KYC documents before submitting.",
//         missingDocuments,
//       });
//     }

//     if (user.kycStatus === "Verified") {
//       return res.status(400).json({
//         status: 0,
//         message: "Your KYC is already verified.",
//       });
//     }

//     user.kycStatus = "Submitted";

//     user.kycVerifiedAt = null;
//     user.kycRejectedAt = null;
//     user.kycRejectionReasons = [];
//     user.kycRejectionNote = "";

//     await user.save();

//     res.json({
//       status: 1,
//       message: "KYC submitted successfully. Your documents are now under review.",
//       data: {
//         user,
//       },
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 0,
//       message: error.message,
//     });
//   }
// };


// mahima code //

const Setting = require("../models/Setting");
const User = require("../models/user");
const Activity = require("../models/Activity");
const SharedDocumentSettings = require("../models/SharedDocumentSettings");

exports.getSettings = async (req, res) => {
    try {
  
      const settings = await Setting.findOne({
        userId: req.user._id
      });
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateGeneral = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          language: req.body.language,
          timezone: req.body.timezone,
          currency: req.body.currency,
          theme: req.body.theme,
          dashboardLayout: req.body.dashboardLayout,
          units: req.body.units
        },
  
        {
          new: true,
          upsert: true
        }
  
      );
  
      res.json({
        status: 1,
        message: "General settings updated",
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updatePreferences = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          defaultCountry: req.body.defaultCountry,
          defaultPage: req.body.defaultPage,
          itemsPerPage: req.body.itemsPerPage
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateNotifications = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          emailNotification: req.body.emailNotification,
          pushNotification: req.body.pushNotification,
          smsNotification: req.body.smsNotification
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateSecurity = async (req, res) => {
    try {
  
      const settings = await Setting.findOneAndUpdate(
  
        {
          userId: req.user._id
        },
  
        {
          twoFactorAuth: req.body.twoFactorAuth,
          sessionTimeout: req.body.sessionTimeout
        },
  
        {
          new: true
        }
  
      );
  
      res.json({
        status: 1,
        data: settings
      });
  
    } catch (error) {
  
      res.status(500).json({
        status: 0,
        message: error.message
      });
  
    }
  };

  exports.updateBilling = async (req, res) => {
  try {

    const settings = await Setting.findOneAndUpdate(
      {
        userId: req.user._id
      },
      {
        billingEmail: req.body.billingEmail,
        billingCompanyName: req.body.billingCompanyName,
        billingGstNumber: req.body.billingGstNumber
      },
      {
        new: true,
        upsert: true
      }
    );

    res.json({
      status: 1,
      message: "Billing updated successfully",
      data: settings
    });

  } catch (error) {

    res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};
  exports.updateTheme = async(req,res)=>{

    try{
    
    const settings=await Setting.findOneAndUpdate(
    
    {
    userId:req.user._id
    },
    
    {
    theme:req.body.theme
    },
    
    {
    new:true
    }
    
    );
    
    res.json({
    
    status:1,
    
    message:"Theme updated successfully",
    
    data:settings
    
    });
    
    }catch(error){
    
    res.status(500).json({
    
    status:0,
    
    message:error.message
    
    });
    
    }
    
    };

   const bcrypt = require("bcryptjs");

exports.changePassword = async (req, res) => {
  try {

    const {
      oldPassword,
      newPassword
    } = req.body;

    const user = await User.findById(req.user._id)
      .select("+password");

    const match = await bcrypt.compare(
      oldPassword,
      user.password
    );

    if (!match) {
      return res.status(400).json({
        status: 0,
        message: "Old password is incorrect"
      });
    }

    const hash = await bcrypt.hash(newPassword, 10);

    user.password = hash;

    await user.save();

    res.json({
      status: 1,
      message: "Password changed successfully"
    });

  } catch (error) {

    res.status(500).json({
      status: 0,
      message: error.message
    });

  }
};

exports.getActivity=async(req,res)=>{

    try{
    
    const activity=await Activity.find({
    
    userId:req.user._id
    
    })
    
    .sort({
    
    createdAt:-1
    
    })
    
    .limit(10);
    
    res.json({
    
    status:1,
    
    data:activity
    
    });
    
    }catch(error){
    
    res.status(500).json({
    
    status:0,
    
    message:error.message
    
    });
    
    }
    
    };

    exports.getAccountSummary = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
      .select(
        "name email phone companyName gstNumber importExportId businessType " +
        "country city address accountType plan accountStatus profileCompletion " +
        "emailVerified phoneVerified gstVerified twoFactorEnabled profileImage " +
        "designation createdAt lastLogin planExpiry " +
        "kycStatus kycVerifiedAt kycRejectedAt " +
        "kycRejectionReasons kycRejectionNote kycDocuments"
      )
      .populate("roleId", "name")
      .populate("planId");

    const settings = await Setting.findOne({
      userId: req.user._id
    });

    res.json({
      status: 1,
      data: {
        user,
        theme: settings?.theme,
        language: settings?.language,
        currency: settings?.currency,
        timezone: settings?.timezone
      }
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};
        
exports.updateInvoiceSettings = async (req, res) => {
  try {
    const invoicePrefix = String(req.body.invoicePrefix || "").trim();

    if (!invoicePrefix) {
      return res.status(400).json({
        status: 0,
        message: "Invoice prefix is required"
      });
    }

    const settings = await Setting.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          invoicePrefix
        },
        $setOnInsert: {
          invoiceSequence: 0
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.json({
      status: 1,
      message: "Invoice settings updated successfully",
      data: settings
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};


const getDefaultShipmentForm = () => ({
  sections: [
    {
      title: "Basic Shipment Details",
      description: "",
      fields: [
        {
          key: "shipmentType",
          label: "Shipment Type",
          useDropdown: true,
          options: ["Export", "Import", "Re-export"]
        },
        {
          key: "shipmentMode",
          label: "Shipment Mode",
          useDropdown: true,
          options: ["Air", "Sea", "Road", "Rail"]
        },
        {
          key: "shipmentPurpose",
          label: "Shipment Purpose",
          useDropdown: true,
          options: ["Commercial", "Sample", "Personal"]
        }
      ]
    }
  ]
});

// GET Shipment Form Settings
exports.getShipmentFormSettings = async (req, res) => {
  try {
    let settings = await Setting.findOne({
      userId: req.user._id
    });

    if (!settings) {
      settings = await Setting.create({
        userId: req.user._id,
        shipmentForm: getDefaultShipmentForm()
      });
    }

    res.status(200).json({
      status: 1,
      data: settings.shipmentForm
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

// UPDATE Shipment Form Settings
exports.updateShipmentFormSettings = async (req, res) => {
  try {
    const { sections } = req.body;

    if (!Array.isArray(sections) || !sections.length) {
      return res.status(400).json({
        status: 0,
        message: "At least one section is required"
      });
    }

    const keys = new Set();

    for (const section of sections) {
      if (!section.title?.trim()) {
        return res.status(400).json({
          status: 400,
          message: "Section title is required"
        });
      }

      if (!Array.isArray(section.fields)) {
        return res.status(400).json({
          status: 400,
          message: "Invalid section fields"
        });
      }

      for (const field of section.fields) {
        if (!field.key || !field.label?.trim()) {
          return res.status(400).json({
            status: 0,
            message: "Field key and label are required"
          });
        }

        if (keys.has(field.key)) {
          return res.status(400).json({
            status: 0,
            message: `Duplicate field key: ${field.key}`
          });
        }

        keys.add(field.key);

        if (
          field.useDropdown &&
          (!Array.isArray(field.options) ||
            field.options.filter(v => String(v).trim()).length === 0)
        ) {
          return res.status(400).json({
            status: 0,
            message: `${field.label} needs at least one dropdown option`
          });
        }
      }
    }

    const cleanSections = sections.map(section => ({
      title: section.title.trim(),
      description: section.description || "",
      fields: section.fields.map(field => ({
        key: field.key,
        label: field.label.trim(),
        useDropdown: Boolean(field.useDropdown),
        options: field.useDropdown
          ? [...new Set(
              (field.options || [])
                .map(v => String(v).trim())
                .filter(Boolean)
            )]
          : []
      }))
    }));

    const settings = await Setting.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          "shipmentForm.sections": cleanSections
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true
      }
    );

    res.status(200).json({
      status: 1,
      message: "Shipment form settings updated successfully",
      data: settings.shipmentForm
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
  }
};

// RESET Shipment Form Settings
exports.resetShipmentFormSettings = async (req, res) => {
  try {
    const settings = await Setting.findOneAndUpdate(
      { userId: req.user._id },
      {
        $set: {
          shipmentForm: getDefaultShipmentForm()
        }
      },
      {
        new: true,
        upsert: true,
        runValidators: true
      }
    );

    res.status(200).json({
      status: 1,
      message: "Shipment form settings reset successfully",
      data: settings.shipmentForm
    });

  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message
    });
    
  }
};

// ==========================================
// RESET DOCUMENT UPLOAD SETTINGS
// ==========================================

exports.resetDocumentsUploadSettings = async (req, res) => {
  try {
    const settings = await SharedDocumentSettings.findOneAndUpdate(
      { configKey: "global" },
      {
        $set: {
          sectionTitle: "Documents Uploaded",
          sectionDesc: "Upload all relevant documents",
          fields: [
            {
              key: "commercial-invoice",
              label: "Commercial Invoice",
              enabled: true,
            },
            {
              key: "packing-list",
              label: "Packing List",
              enabled: true,
            },
            {
              key: "msds",
              label: "MSDS",
              enabled: true,
            },
            {
              key: "coo",
              label: "COO",
              enabled: true,
            },
            {
              key: "iec-gst",
              label: "IEC/GST",
              enabled: true,
            },
            {
              key: "purchase-order",
              label: "Purchase Order",
              enabled: true,
            },
            {
              key: "product-certificate",
              label: "Product Certificate",
              enabled: true,
            },
            {
              key: "other-documents",
              label: "Other Documents",
              enabled: true,
            },
          ],
          updatedBy: req.user._id,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    return res.status(200).json({
      status: 1,
      message: "Shared document settings reset successfully",
      data: {
        sectionTitle: settings.sectionTitle,
        sectionDesc: settings.sectionDesc,
        fields: settings.fields,
      },
    });
  } catch (error) {
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

exports.getDocumentsUploadSettings = async (req, res) => {
  try {
    let settings = await SharedDocumentSettings.findOne({
      configKey: "global",
    }).lean();

    if (!settings) {
      settings = await SharedDocumentSettings.create({
        configKey: "global",
      });

      settings = settings.toObject();
    }

    return res.status(200).json({
      status: 1,
      message: "Shared document settings fetched successfully",
      data: {
        sectionTitle: settings.sectionTitle,
        sectionDesc: settings.sectionDesc,
        fields: settings.fields,
      },
    });
  } catch (error) {
    console.error("Get shared document settings error:", error);

    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

exports.updateDocumentsUploadSettings = async (req, res) => {
  try {
    const { fields, sectionTitle, sectionDesc } = req.body;

    if (!Array.isArray(fields)) {
      return res.status(400).json({
        status: 0,
        message: "Document fields must be an array",
      });
    }

    if (!sectionTitle || !sectionTitle.trim()) {
      return res.status(400).json({
        status: 0,
        message: "Section title is required",
      });
    }

    const keys = new Set();

    const cleanFields = fields.map((field) => {
      const label = String(field.label || "").trim();

      if (!label) {
        throw new Error("Document label is required");
      }

      const key = String(
        field.key ||
          field.id ||
          label
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")
      ).trim();

      if (!key) {
        throw new Error("Document key is required");
      }

      if (keys.has(key)) {
        throw new Error(`Duplicate document field: ${key}`);
      }

      keys.add(key);

      return {
        key,
        label,
        enabled: field.enabled !== false,
      };
    });

    const settings = await SharedDocumentSettings.findOneAndUpdate(
      { configKey: "global" },
      {
        $set: {
          sectionTitle: sectionTitle.trim(),
          sectionDesc: String(sectionDesc || "").trim(),
          fields: cleanFields,
          updatedBy: req.user._id,
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
        setDefaultsOnInsert: true,
      }
    );

    return res.status(200).json({
      status: 1,
      message: "Shared document settings updated successfully",
      data: {
        sectionTitle: settings.sectionTitle,
        sectionDesc: settings.sectionDesc,
        fields: settings.fields,
      },
    });
  } catch (error) {
    console.error("Update shared document settings error:", error);

    return res.status(400).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// KYC MANAGEMENT (preserved from first controller)
// ==========================================

exports.uploadKYCDocuments = async (req, res) => {
  try {
    const documents = req.files || [];

    if (!documents.length) {
      return res.status(400).json({
        status: 0,
        message: "Please upload at least one document",
      });
    }

    const documentTypes = Array.isArray(req.body.documentTypes)
      ? req.body.documentTypes
      : req.body.documentTypes
      ? [req.body.documentTypes]
      : [];

    const documentTitles = Array.isArray(req.body.documentTitles)
      ? req.body.documentTitles
      : req.body.documentTitles
      ? [req.body.documentTitles]
      : [];

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    documents.forEach((file, index) => {
      const documentType =
        documentTypes[index] || "KYC Document";

      const documentTitle =
        documentTitles[index] || file.originalname;

      const newDocument = {
        type: documentType,
        title: documentTitle,
        url: `https://${req.get("host")}/uploads/documents/${file.filename}`,
        uploadedAt: new Date(),
      };

      const existingDocumentIndex = (
        user.kycDocuments || []
      ).findIndex(
        (document) => document.type === documentType
      );

      if (existingDocumentIndex !== -1) {
        user.kycDocuments[existingDocumentIndex] =
          newDocument;
      } else {
        user.kycDocuments.push(newDocument);
      }
    });

   
    await user.save();

    res.json({
      status: 1,
      message: "KYC documents uploaded successfully",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
exports.submitKYC = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        status: 0,
        message: "User not found",
      });
    }

    const REQUIRED_KYC_DOCUMENTS = [
      "GST Certificate",
      "IEC Certificate",
      "PAN Card",
      "Company Registration",
      "Address Proof",
    ];

    const uploadedTypes = (user.kycDocuments || []).map(
      (document) => document.type
    );

    const missingDocuments = REQUIRED_KYC_DOCUMENTS.filter(
      (requiredType) => !uploadedTypes.includes(requiredType)
    );

    if (missingDocuments.length > 0) {
      return res.status(400).json({
        status: 0,
        message: "Please upload all required KYC documents before submitting.",
        missingDocuments,
      });
    }

    if (user.kycStatus === "Verified") {
      return res.status(400).json({
        status: 0,
        message: "Your KYC is already verified.",
      });
    }

    user.kycStatus = "Submitted";

    user.kycVerifiedAt = null;
    user.kycRejectedAt = null;
    user.kycRejectionReasons = [];
    user.kycRejectionNote = "";

    await user.save();

    res.json({
      status: 1,
      message: "KYC submitted successfully. Your documents are now under review.",
      data: {
        user,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};
