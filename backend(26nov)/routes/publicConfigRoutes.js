const express = require("express");
const AdminSettings = require("../models/AdminSettings");
const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const settings = await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"}).lean();
    const general = settings?.general || {};
    const social = settings?.socialLogin || {};
    res.set("Cache-Control", "no-store");
    res.json({success:true, data:{
      companyName:general.companyName || "CargoMate",
      websiteTitle:general.websiteTitle || "ASD CargoMate",
      description:general.description || "",
      socialUrl:general.socialUrl || "",
      systemLogo:general.systemLogo?.url || "",
      loadingLogo:general.loadingLogo?.url || "",
      maintenanceMode: general.maintenanceMode === true,
      socialLogin: {
        google:{enabled:social.google?.enabled===true && Boolean(social.google?.clientId), clientId:social.google?.enabled ? social.google?.clientId || "" : ""},
        facebook:{enabled:social.facebook?.enabled===true && Boolean(social.facebook?.clientId), clientId:social.facebook?.enabled ? social.facebook?.clientId || "" : ""}
      }
    }});
  } catch (e) {res.status(500).json({success:false,message:"Unable to load website settings"});}
});
module.exports = router;
