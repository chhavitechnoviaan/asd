const mongoose=require("mongoose");
const Report=require("../models/Report");
const {renderPdf}=require("../utils/brandedReportPdf");
exports.pdf=async(req,res)=>{
  try {
    if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({status:0,message:"Invalid report ID"});
    const userId=req.user?._id||req.user?.id;
    const report=await Report.findOne({_id:req.params.id,userId,isDeleted:false});
    if(!report)return res.status(404).json({status:0,message:"Report not found"});
    await Report.updateOne({_id:report._id},{$inc:{totalDownloads:1}});
    renderPdf(res,report,{inline:req.query.preview==="1"});
  }catch(e){console.error("Branded PDF error",e);if(!res.headersSent)res.status(500).json({status:0,message:"Could not generate PDF"});else res.end();}
};
