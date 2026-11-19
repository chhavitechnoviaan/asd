const router = require("express").Router();
const {protect,adminOnly} = require("../middleware/authMiddleware");
const StaffActivity = require("../models/StaffActivity");
router.get("/",protect,adminOnly,async(req,res)=>{try{const limit=Math.min(Math.max(Number(req.query.limit)||50,1),200);const items=await StaffActivity.find().sort({createdAt:-1}).limit(limit).lean();res.json({status:1,items});}catch(err){res.status(500).json({status:0,message:"Unable to load activity"});}});
module.exports=router;
