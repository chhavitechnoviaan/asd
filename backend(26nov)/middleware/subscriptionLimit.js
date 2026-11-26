const {consume,refund} = require("../services/subscriptionFeatures");
module.exports = feature => async(req,res,next) => {
  try {
    const reservation = await consume(req.user._id,feature);
    let settled = false;
    const finish = async () => {
      if (settled) return;
      settled = true;
      if (reservation?.reserved && (res.statusCode < 200 || res.statusCode >= 300)) {
        try { await refund(req.user._id, feature, reservation); }
        catch(e) { console.error("Quota rollback failed",e); }
      }
    };
    res.once("finish", finish);
    res.once("close", finish);
    next();
  } catch(e) {
    const status=e.status||500;
    res.status(status).json({status:0,code:status===429?"QUOTA_EXCEEDED":status===402?"SUBSCRIPTION_REQUIRED":"FEATURE_UNAVAILABLE",feature,upgradeRequired:[402,403,429].includes(status),message:e.message});
  }
};
