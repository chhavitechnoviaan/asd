const express=require("express");
const router=express.Router();
const Model=require("../models/ShipmentFormConfig");
const {protect,adminOnly}=require("../middleware/authMiddleware");
const defaultShipment=[
 {key:"shipmentType",label:"Shipment Type",type:"Dropdown",enabled:true,required:true,options:["Export","Import"]},
 {key:"shipmentMode",label:"Shipment Mode",type:"Dropdown",enabled:true,required:true,options:["Air","Sea","Road"]},
 {key:"shipmentPurpose",label:"Shipment Purpose",type:"Dropdown",enabled:true,required:true,options:["Commercial","Sample","Personal"]},
 {key:"companyName",label:"Customer / Company Name",type:"Text",enabled:true},
 {key:"contactPerson",label:"Contact Person",type:"Text",enabled:true},
 {key:"contactNumber",label:"Contact Number",type:"Text",enabled:true},
 {key:"referenceNumber",label:"Reference No.",type:"Text",enabled:true}
];
const defaultDocuments=["Commercial Invoice","Packing List","MSDS","COO","IEC/GST","Purchase Order","Product Certificate","Other Documents"].map((label,index)=>({key:`doc_${index+1}`,label,type:"File",enabled:true,required:false}));
const defaults={shipment:{title:"Basic Shipment Details",description:"",enabled:true,fields:defaultShipment},documents:{title:"Documents Upload",description:"Upload all relevant documents",enabled:true,fields:defaultDocuments}};
const clean=(value,section)=>{
 if(!value||typeof value!=="object"||!Array.isArray(value.fields)||value.fields.length>50) throw new Error("Invalid field configuration (maximum 50 fields)");
 const keys=new Set();
 const fields=value.fields.map((item)=>{
  const key=String(item.key||"");
  if(!/^[a-z][a-zA-Z0-9_]{0,63}$/.test(key)||keys.has(key)) throw new Error("Field keys must be unique and valid");
  keys.add(key);
  const label=String(item.label||"").trim();
  if(!label||label.length>100) throw new Error("Field labels must be 1–100 characters");
  const type=section==="documents"?"File":String(item.type||"Text");
  if(!["File","Dropdown","Text"].includes(type)) throw new Error("Invalid field type");
  const options=type==="Dropdown"?(Array.isArray(item.options)?item.options:[]).map(v=>String(v).trim()).filter(Boolean).slice(0,30):[];
  return {key,label,type,enabled:item.enabled!==false,required:item.required===true,options};
 });
 const sections={};for(const key of ["origin","invoice","product","documents","aiOutput"])sections[key]=value.sections?.[key]!==false;
 const buttons={};for(const key of ["draft","analyze","submit"])buttons[key]=String(value.buttons?.[key]||({draft:"Save Draft",analyze:"Analyze Shipment",submit:"Submit to Admin"}[key])).slice(0,60);
 return {title:String(value.title||"").slice(0,120),description:String(value.description||"").slice(0,500),enabled:value.enabled!==false,fields,buttons,sections};
};
router.get("/",async(req,res)=>{try{
 const doc=await Model.findOne({singleton:"SHIPMENT_FORM"}).lean();
 res.json({success:true,data:{shipment:doc?.shipmentConfigured?doc.shipment:defaults.shipment,documents:doc?.documentsConfigured?doc.documents:defaults.documents}});
}catch(e){res.status(503).json({success:false,message:"Form configuration unavailable"});}});
router.put("/:section",protect,adminOnly,async(req,res)=>{
 if(!["shipment","documents"].includes(req.params.section)) return res.status(404).json({success:false,message:"Unknown section"});
 try{const section=clean(req.body,req.params.section);
 const record=await Model.findOneAndUpdate({singleton:"SHIPMENT_FORM"},{$set:{[req.params.section]:section,[`${req.params.section}Configured`]:true}}, {new:true,upsert:true,runValidators:true,setDefaultsOnInsert:true});
 res.json({success:true,data:record[req.params.section],message:"Settings saved"});
 }catch(e){res.status(400).json({success:false,message:e.message});}
});
module.exports=router;
