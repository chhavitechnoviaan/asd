const {encrypt}=require("../utils/settingSecrets");
const AdminSettings = require("../models/AdminSettings");
const asyncHandler = require("express-async-handler");

/**
 * Create Singleton Settings if not exists
 */
const getOrCreateSettings = async () => {
  let settings = await AdminSettings.findOne({
    singleton: "ADMIN_SETTINGS",
  });

  if (!settings) {
    settings = await AdminSettings.create({
      singleton: "ADMIN_SETTINGS",
    });
  }

  return settings;
};

/**
 * Common Success Response
 */
const sendResponse = (res, message, data = {}) => {
  return res.status(200).json({
    success: true,
    message,
    data,
  });
};

const initializeSettings = (settings) => {

    if (!settings.general)
        settings.general = {};

    if (!settings.socialLogin)
        settings.socialLogin = {};

    if (!settings.ai)
        settings.ai = {};

    if (!settings.emailSms)
        settings.emailSms = {};

    if (!settings.subscription)
        settings.subscription = {};

    if (!settings.paymentGateway)
        settings.paymentGateway = {};

    if (!settings.documents)
        settings.documents = {};

    if (!settings.features)
        settings.features = {};

    if (!settings.security)
        settings.security = {};

    if (!settings.miscellaneous)
        settings.miscellaneous = {};

    if (!settings.noticeBoard)
        settings.noticeBoard = {};

    if (!settings.whatsapp)
        settings.whatsapp = {};

    return settings;
};

/**
 * GET
 * /api/admin-settings
 */

exports.getSettings = asyncHandler(async (req, res) => {

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

  // Mask stored secrets even for authenticated Admins; API responses are not a secret vault.
  const safe=settings.toObject();
  if(safe.socialLogin?.google) safe.socialLogin.google.clientSecret="";
  if(safe.socialLogin?.facebook) safe.socialLogin.facebook.clientSecret="";
  if(safe.emailSms?.smtp) safe.emailSms.smtp.password="";
  if(safe.emailSms?.sms) safe.emailSms.sms.authToken="";
  if(safe.paymentGateway?.razorpay) safe.paymentGateway.razorpay.secret="";
  if(safe.paymentGateway?.stripe) safe.paymentGateway.stripe.secret="";
  if(safe.paymentGateway?.paypal) safe.paymentGateway.paypal.secret="";
  if(safe.ai) safe.ai.apiKey="";
  return sendResponse(res,"Admin settings fetched successfully",safe);

});

/**
 * PUT
 * /api/admin-settings/general
 */

exports.updateGeneralSettings = asyncHandler(async (req, res) => {

  const {
    companyName,
    websiteTitle,
    description,
    socialUrl,
    maintenanceMode,
  } = req.body;

  let settings = await getOrCreateSettings();

settings = initializeSettings(settings);

  if (companyName !== undefined)
    settings.general.companyName = companyName;

  if (websiteTitle !== undefined)
    settings.general.websiteTitle = websiteTitle;

  if (description !== undefined)
    settings.general.description = description;

  if (socialUrl !== undefined)
    settings.general.socialUrl = socialUrl;

  if (maintenanceMode !== undefined)
    settings.general.maintenanceMode = maintenanceMode;

  await settings.save();

  return sendResponse(
    res,
    "General settings updated successfully",
    settings.general
  );

});

/**
 * PUT /api/admin-settings/social
 */

exports.updateSocialLogin = asyncHandler(async (req,res) => {
  const settings=await getOrCreateSettings();
  for(const key of ["google","facebook"]){
    const incoming=req.body?.[key];
    if(!incoming) continue;
    if(!settings.socialLogin) settings.socialLogin={};
    if(!settings.socialLogin[key]) settings.socialLogin[key]={};
    const current=settings.socialLogin[key];
    if(incoming.enabled === true && typeof incoming.clientId === "string") {
      const value = incoming.clientId.trim();
      const valid = key === "google"
        ? /^[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(value)
        : /^[0-9]{8,}$/.test(value);
      if(!valid)return res.status(400).json({success:false,message:key==="google"?"Invalid Google Web OAuth Client ID. Use *.apps.googleusercontent.com, not your email.":"Invalid Meta App ID. Enter the numeric App ID."});
    }
    if(typeof incoming.clientId === "string") current.clientId=incoming.clientId.trim();
    if(typeof incoming.clientSecret === "string" && incoming.clientSecret.trim()) current.clientSecret=encrypt(incoming.clientSecret.trim());
    if(typeof incoming.redirectUrl === "string") current.redirectUrl=incoming.redirectUrl;
    if(typeof incoming.enabled === "boolean"){
      if(incoming.enabled && (!current.clientId || (key==="facebook" && !current.clientSecret)))
        return res.status(400).json({success:false,message:`Configure ${key} credentials first`});
      current.enabled=incoming.enabled;
    }
  }
  await settings.save();
  return sendResponse(res,"Social login settings updated",{
    google:{enabled:settings.socialLogin?.google?.enabled||false,clientId:settings.socialLogin?.google?.clientId||"",clientSecret:""},
    facebook:{enabled:settings.socialLogin?.facebook?.enabled||false,clientId:settings.socialLogin?.facebook?.clientId||"",clientSecret:""}
  });
});

/**
 * PUT /api/admin-settings/ai
 */

exports.updateAISettings = asyncHandler(async (req, res) => {

    const {
        enabled,
        provider,
        model,
        apiKey,
        customInstructions,
        forceInstructions
    } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (enabled !== undefined)
        settings.ai.enabled = enabled;

    if (provider)
        settings.ai.provider = provider;

    if (model)
        settings.ai.model = model;

    if (apiKey)
        settings.ai.apiKey = encrypt(apiKey);

    if (customInstructions !== undefined)
        settings.ai.customInstructions = customInstructions;

    if (forceInstructions !== undefined)
        settings.ai.forceInstructions = forceInstructions;

    await settings.save();

    return sendResponse(
        res,
        "AI settings updated successfully",
        {...settings.ai.toObject(),apiKey:""}
    );

});

/**
 * PUT /api/admin-settings/email
 */

exports.updateEmailSMS = asyncHandler(async (req, res) => {

    const { smtp, sms } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (smtp) {

        if (!settings.emailSms) settings.emailSms = {};
        if (!settings.emailSms.smtp) settings.emailSms.smtp = {};
        if (!settings.emailSms.sms) settings.emailSms.sms = {};
        
        if (smtp) {
            const clean={...smtp};
            if(!clean.password) delete clean.password;else clean.password=encrypt(clean.password);
            Object.assign(settings.emailSms.smtp, clean);
        }
        
        if (sms) {
            Object.assign(settings.emailSms.sms, sms);
        }

    }

    if (sms) {

        settings.emailSms.sms = {
            ...settings.emailSms.sms.toObject(),
            ...sms
        };

    }

    if(typeof req.body.emailVerificationEnabled === "boolean") settings.emailSms.emailVerificationEnabled=req.body.emailVerificationEnabled;
    await settings.save();

    return sendResponse(
        res,
        "Email & SMS settings updated successfully",
        {...settings.emailSms.toObject(),smtp:{...settings.emailSms.smtp.toObject(),password:""},sms:{...settings.emailSms.sms.toObject(),authToken:""}}
    );

});

/**
 * PUT /api/admin-settings/subscription
 */

exports.updateSubscription = asyncHandler(async (req, res) => {

    const {
        autoRenewal,
        trialPeriod
    } = req.body;

    let settings = await getOrCreateSettings();

    settings = initializeSettings(settings);

    if (autoRenewal !== undefined)
        settings.subscription.autoRenewal = autoRenewal;

    if (trialPeriod !== undefined)
        settings.subscription.trialPeriod = trialPeriod;

    await settings.save();

    return sendResponse(
        res,
        "Subscription settings updated successfully",
        settings.subscription
    );

});

/**
 * PUT /api/admin-settings/payment
 */

exports.updatePaymentGateway = asyncHandler(async (req,res) => {
  // CargoMate uses Razorpay only. Existing Stripe/PayPal records remain untouched.
  const incoming=req.body?.razorpay;
  if(!incoming || typeof incoming!=="object") return res.status(400).json({success:false,message:"Razorpay configuration is required"});
  const settings=await getOrCreateSettings();
  if(!settings.paymentGateway)settings.paymentGateway={};
  if(!settings.paymentGateway.razorpay)settings.paymentGateway.razorpay={};
  const current=settings.paymentGateway.razorpay;
  if(typeof incoming.key==="string")current.key=incoming.key.trim();
  if(typeof incoming.secret==="string"&&incoming.secret.trim())current.secret=encrypt(incoming.secret.trim());
  if(typeof incoming.enabled==="boolean"){
    if(incoming.enabled && (!current.key || !current.secret))
      return res.status(400).json({success:false,message:"Configure Razorpay key and secret before enabling"});
    current.enabled=incoming.enabled;
  }
  await settings.save();
  return sendResponse(res,"Razorpay settings updated",{razorpay:{enabled:current.enabled,key:current.key,secret:""}});
});

/**
 * PUT /api/admin-settings/documents
 */

exports.updateDocuments = async (req, res) => {

    try {

        const {
            invoiceTemplate,
            documentPrefix
        } = req.body;

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.documents) {
            settings.documents = {};
        }
        
        if (invoiceTemplate !== undefined) {
            settings.documents.invoiceTemplate = invoiceTemplate;
        }
        
        if (documentPrefix !== undefined) {
            settings.documents.documentPrefix = documentPrefix;
        }
        await settings.save();

        return sendResponse(
            res,
            "Documents updated successfully",
            settings.documents
        );

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

/**
 * PUT /api/admin-settings/features
 */

exports.updateFeatures = async (req, res) => {

    try {
        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.features) {
            settings.features = {};
        }
        
        Object.assign(settings.features, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Features updated successfully",
            settings.features
        );

        await settings.save();

        return sendResponse(
            res,
            "Features updated successfully",
            settings.features
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/security
 */

exports.updateSecurity = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.security) {
            settings.security = {};
        }
        
        Object.assign(settings.security, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Security settings updated successfully",
            settings.security
        );

        await settings.save();

        return sendResponse(
            res,
            "Security settings updated successfully",
            settings.security
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/misc
 */

exports.updateMiscellaneous = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.miscellaneous) {
            settings.miscellaneous = {};
        }
        
        Object.assign(settings.miscellaneous, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Miscellaneous settings updated successfully",
            settings.miscellaneous
        );
        await settings.save();

        return sendResponse(
            res,
            "Miscellaneous settings updated successfully",
            settings.miscellaneous
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/notice
 */

exports.updateNoticeBoard = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

        settings = initializeSettings(settings);

        if (!settings.noticeBoard) {
            settings.noticeBoard = {};
        }
        
        Object.assign(settings.noticeBoard, req.body);
        
        await settings.save();
        
        return sendResponse(
            res,
            "Notice board updated successfully",
            settings.noticeBoard
        );

        await settings.save();

        return sendResponse(
            res,
            "Notice board updated successfully",
            settings.noticeBoard
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

/**
 * PUT /api/admin-settings/whatsapp
 */

exports.updateWhatsapp = async (req, res) => {

    try {

        let settings = await getOrCreateSettings();

settings = initializeSettings(settings);

if (!settings.whatsapp) {
    settings.whatsapp = {};
}

Object.assign(settings.whatsapp, req.body);

await settings.save();

return sendResponse(
    res,
    "Whatsapp settings updated successfully",
    settings.whatsapp
);
        await settings.save();

        return sendResponse(
            res,
            "Whatsapp settings updated successfully",
            settings.whatsapp
        );

    } catch (error) {

        res.status(500).json({

            success: false,
            message: error.message

        });

    }

};

// Keep configuration logos in Cloudinary; only safe URLs and public IDs go in MongoDB.
exports.uploadBrandLogo = asyncHandler(async (req, res) => {
  const field = req.params.kind === "system" ? "systemLogo" : req.params.kind === "loading" ? "loadingLogo" : null;
  if (!field) return res.status(400).json({success:false,message:"Unknown logo type"});
  const data = String(req.body?.image || "");
  const match = data.trim().match(/^data:image\/(png|jpe?g|webp);base64,([A-Za-z0-9+/=\s]+)$/i);
  if (!match) return res.status(400).json({success:false,message:"Please upload PNG, JPG or WebP"});
  const bytes = Buffer.from(match[2].replace(/\s/g,""), "base64");
  if (!bytes.length || bytes.length > 2 * 1024 * 1024) return res.status(400).json({success:false,message:"Maximum image size is 2MB"});
  const valid = (match[1].toLowerCase() === "png" && bytes.subarray(0,8).toString("hex") === "89504e470d0a1a0a") ||
    (["jpeg","jpg"].includes(match[1].toLowerCase()) && bytes.subarray(0,3).toString("hex") === "ffd8ff") ||
    (match[1].toLowerCase() === "webp" && bytes.toString("ascii",0,4) === "RIFF" && bytes.toString("ascii",8,12) === "WEBP");
  if (!valid) return res.status(400).json({success:false,message:"Image data does not match the file type. Export the image as a genuine PNG, JPG or WebP and retry."});
  const cloudinary = require("../config/cloudinary");
  const crypto = require("crypto");
  const result = await new Promise((resolve,reject) => {
    const stream = cloudinary.uploader.upload_stream({folder:"asd-cargomate/branding",public_id:`${req.params.kind}-${Date.now()}-${crypto.randomBytes(5).toString("hex")}`, resource_type:"image"},
      (err, result) => err ? reject(err) : resolve(result));
    stream.end(bytes);
  });
  const settings = await getOrCreateSettings();
  if (!settings.general) settings.general = {};
  settings.general[field] = {url:result.secure_url,public_id:result.public_id};
  await settings.save();
  return sendResponse(res, "Logo uploaded", settings.general[field]);
});


// mahima code //

// const AdminSettings = require("../models/AdminSettings");
// const asyncHandler = require("express-async-handler");

// /**
//  * Create Singleton Settings if not exists
//  */
// const getOrCreateSettings = async () => {
//   let settings = await AdminSettings.findOne({
//     singleton: "ADMIN_SETTINGS",
//   });

//   if (!settings) {
//     settings = await AdminSettings.create({
//       singleton: "ADMIN_SETTINGS",
//     });
//   }

//   return settings;
// };

// /**
//  * Common Success Response
//  */
// const sendResponse = (res, message, data = {}) => {
//   return res.status(200).json({
//     success: true,
//     message,
//     data,
//   });
// };

// const initializeSettings = (settings) => {

//     if (!settings.general)
//         settings.general = {};

//     if (!settings.socialLogin)
//         settings.socialLogin = {};

//     if (!settings.ai)
//         settings.ai = {};

//     if (!settings.emailSms)
//         settings.emailSms = {};

//     if (!settings.subscription)
//         settings.subscription = {};

//     if (!settings.paymentGateway)
//         settings.paymentGateway = {};

//     if (!settings.documents)
//         settings.documents = {};

//     if (!settings.features)
//         settings.features = {};

//     if (!settings.security)
//         settings.security = {};

//     if (!settings.miscellaneous)
//         settings.miscellaneous = {};

//     if (!settings.noticeBoard)
//         settings.noticeBoard = {};

//     if (!settings.whatsapp)
//         settings.whatsapp = {};

//     return settings;
// };

// /**
//  * GET
//  * /api/admin-settings
//  */

// exports.getSettings = asyncHandler(async (req, res) => {

//     let settings = await getOrCreateSettings();

//     settings = initializeSettings(settings);

//   return sendResponse(
//     res,
//     "Admin settings fetched successfully",
//     settings
//   );

// });

// /**
//  * PUT
//  * /api/admin-settings/general
//  */

// exports.updateGeneralSettings = asyncHandler(async (req, res) => {

//   const {
//     companyName,
//     websiteTitle,
//     description,
//     socialUrl,
//     maintenanceMode,
//   } = req.body;

//   let settings = await getOrCreateSettings();

// settings = initializeSettings(settings);

//   if (companyName !== undefined)
//     settings.general.companyName = companyName;

//   if (websiteTitle !== undefined)
//     settings.general.websiteTitle = websiteTitle;

//   if (description !== undefined)
//     settings.general.description = description;

//   if (socialUrl !== undefined)
//     settings.general.socialUrl = socialUrl;

//   if (maintenanceMode !== undefined)
//     settings.general.maintenanceMode = maintenanceMode;

//   await settings.save();

//   return sendResponse(
//     res,
//     "General settings updated successfully",
//     settings.general
//   );

// });

// /**
//  * PUT /api/admin-settings/social
//  */

// exports.updateSocialLogin = asyncHandler(async (req, res) => {

//     const { facebook, google } = req.body;

//     const settings = await AdminSettings.getSingleton();
//     if (!settings.socialLogin) settings.socialLogin = {};
//     if (!settings.socialLogin.facebook) settings.socialLogin.facebook = {};
//     if (!settings.socialLogin.google) settings.socialLogin.google = {};

//     if (facebook) {
//         Object.assign(settings.socialLogin.facebook, facebook);
//     }

//     if (google) {
//         Object.assign(settings.socialLogin.google, google);
//     }

//     await settings.save();

//     return sendResponse(
//         res,
//         "Social login settings updated successfully",
//         settings.socialLogin
//     );

// });

// /**
//  * PUT /api/admin-settings/ai
//  */

// exports.updateAISettings = asyncHandler(async (req, res) => {

//     const {
//         enabled,
//         provider,
//         model,
//         apiKey,
//         customInstructions,
//         forceInstructions
//     } = req.body;

//     let settings = await getOrCreateSettings();

//     settings = initializeSettings(settings);

//     if (enabled !== undefined)
//         settings.ai.enabled = enabled;

//     if (provider)
//         settings.ai.provider = provider;

//     if (model)
//         settings.ai.model = model;

//     if (apiKey)
//         settings.ai.apiKey = apiKey;

//     if (customInstructions !== undefined)
//         settings.ai.customInstructions = customInstructions;

//     if (forceInstructions !== undefined)
//         settings.ai.forceInstructions = forceInstructions;

//     await settings.save();

//     return sendResponse(
//         res,
//         "AI settings updated successfully",
//         settings.ai
//     );

// });

// /**
//  * PUT /api/admin-settings/email
//  */

// exports.updateEmailSMS = asyncHandler(async (req, res) => {

//     const { smtp, sms } = req.body;

//     let settings = await getOrCreateSettings();

//     settings = initializeSettings(settings);

//     if (smtp) {

//         if (!settings.emailSms) settings.emailSms = {};
//         if (!settings.emailSms.smtp) settings.emailSms.smtp = {};
//         if (!settings.emailSms.sms) settings.emailSms.sms = {};
        
//         if (smtp) {
//             Object.assign(settings.emailSms.smtp, smtp);
//         }
        
//         if (sms) {
//             Object.assign(settings.emailSms.sms, sms);
//         }

//     }

//     if (sms) {

//         settings.emailSms.sms = {
//             ...settings.emailSms.sms.toObject(),
//             ...sms
//         };

//     }

//     await settings.save();

//     return sendResponse(
//         res,
//         "Email & SMS settings updated successfully",
//         settings.emailSms
//     );

// });

// /**
//  * PUT /api/admin-settings/subscription
//  */

// exports.updateSubscription = asyncHandler(async (req, res) => {

//     const {
//         autoRenewal,
//         trialPeriod
//     } = req.body;

//     let settings = await getOrCreateSettings();

//     settings = initializeSettings(settings);

//     if (autoRenewal !== undefined)
//         settings.subscription.autoRenewal = autoRenewal;

//     if (trialPeriod !== undefined)
//         settings.subscription.trialPeriod = trialPeriod;

//     await settings.save();

//     return sendResponse(
//         res,
//         "Subscription settings updated successfully",
//         settings.subscription
//     );

// });

// /**
//  * PUT /api/admin-settings/payment
//  */

// exports.updatePaymentGateway = asyncHandler(async (req, res) => {

//     const { stripe, razorpay, paypal } = req.body;

//     let settings = await AdminSettings.getSingleton();

//     if (!settings.paymentGateway)
//         settings.paymentGateway = {};

//     if (stripe) {
//         settings.paymentGateway.stripe = {
//             ...(settings.paymentGateway.stripe || {}),
//             ...stripe,
//         };
//     }

//     if (razorpay) {
//         settings.paymentGateway.razorpay = {
//             ...(settings.paymentGateway.razorpay || {}),
//             ...razorpay,
//         };
//     }

//     if (paypal) {
//         settings.paymentGateway.paypal = {
//             ...(settings.paymentGateway.paypal || {}),
//             ...paypal,
//         };
//     }

//     await settings.save();

//     return res.json({
//         success: true,
//         message: "Payment Gateway Updated",
//         data: settings.paymentGateway,
//     });

// });

// /**
//  * PUT /api/admin-settings/documents
//  */

// exports.updateDocuments = async (req, res) => {

//     try {

//         const {
//             invoiceTemplate,
//             documentPrefix
//         } = req.body;

//         let settings = await getOrCreateSettings();

//         settings = initializeSettings(settings);

//         if (!settings.documents) {
//             settings.documents = {};
//         }
        
//         if (invoiceTemplate !== undefined) {
//             settings.documents.invoiceTemplate = invoiceTemplate;
//         }
        
//         if (documentPrefix !== undefined) {
//             settings.documents.documentPrefix = documentPrefix;
//         }
//         await settings.save();

//         return sendResponse(
//             res,
//             "Documents updated successfully",
//             settings.documents
//         );

//     } catch (error) {

//         res.status(500).json({
//             success: false,
//             message: error.message
//         });

//     }

// };

// /**
//  * PUT /api/admin-settings/features
//  */

// exports.updateFeatures = async (req, res) => {

//     try {
//         let settings = await getOrCreateSettings();

//         settings = initializeSettings(settings);

//         if (!settings.features) {
//             settings.features = {};
//         }
        
//         Object.assign(settings.features, req.body);
        
//         await settings.save();
        
//         return sendResponse(
//             res,
//             "Features updated successfully",
//             settings.features
//         );

//         await settings.save();

//         return sendResponse(
//             res,
//             "Features updated successfully",
//             settings.features
//         );

//     } catch (error) {

//         res.status(500).json({

//             success: false,
//             message: error.message

//         });

//     }

// };

// /**
//  * PUT /api/admin-settings/security
//  */

// exports.updateSecurity = async (req, res) => {

//     try {

//         let settings = await getOrCreateSettings();

//         settings = initializeSettings(settings);

//         if (!settings.security) {
//             settings.security = {};
//         }
        
//         Object.assign(settings.security, req.body);
        
//         await settings.save();
        
//         return sendResponse(
//             res,
//             "Security settings updated successfully",
//             settings.security
//         );

//         await settings.save();

//         return sendResponse(
//             res,
//             "Security settings updated successfully",
//             settings.security
//         );

//     } catch (error) {

//         res.status(500).json({

//             success: false,
//             message: error.message

//         });

//     }

// };

// /**
//  * PUT /api/admin-settings/misc
//  */

// exports.updateMiscellaneous = async (req, res) => {

//     try {

//         let settings = await getOrCreateSettings();

//         settings = initializeSettings(settings);

//         if (!settings.miscellaneous) {
//             settings.miscellaneous = {};
//         }
        
//         Object.assign(settings.miscellaneous, req.body);
        
//         await settings.save();
        
//         return sendResponse(
//             res,
//             "Miscellaneous settings updated successfully",
//             settings.miscellaneous
//         );
//         await settings.save();

//         return sendResponse(
//             res,
//             "Miscellaneous settings updated successfully",
//             settings.miscellaneous
//         );

//     } catch (error) {

//         res.status(500).json({

//             success: false,
//             message: error.message

//         });

//     }

// };

// /**
//  * PUT /api/admin-settings/notice
//  */

// exports.updateNoticeBoard = async (req, res) => {

//     try {

//         let settings = await getOrCreateSettings();

//         settings = initializeSettings(settings);

//         if (!settings.noticeBoard) {
//             settings.noticeBoard = {};
//         }
        
//         Object.assign(settings.noticeBoard, req.body);
        
//         await settings.save();
        
//         return sendResponse(
//             res,
//             "Notice board updated successfully",
//             settings.noticeBoard
//         );

//         await settings.save();

//         return sendResponse(
//             res,
//             "Notice board updated successfully",
//             settings.noticeBoard
//         );

//     } catch (error) {

//         res.status(500).json({

//             success: false,
//             message: error.message

//         });

//     }

// };

// /**
//  * PUT /api/admin-settings/whatsapp
//  */

// exports.updateWhatsapp = async (req, res) => {

//     try {

//         let settings = await getOrCreateSettings();

// settings = initializeSettings(settings);

// if (!settings.whatsapp) {
//     settings.whatsapp = {};
// }

// Object.assign(settings.whatsapp, req.body);

// await settings.save();

// return sendResponse(
//     res,
//     "Whatsapp settings updated successfully",
//     settings.whatsapp
// );
//         await settings.save();

//         return sendResponse(
//             res,
//             "Whatsapp settings updated successfully",
//             settings.whatsapp
//         );

//     } catch (error) {

//         res.status(500).json({

//             success: false,
//             message: error.message

//         });

//     }

// };