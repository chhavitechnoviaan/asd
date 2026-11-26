const mongoose = require("mongoose");
const item = new mongoose.Schema({
 key:{type:String,required:true,match:/^[a-z][a-zA-Z0-9_]{0,63}$/},
 label:{type:String,required:true,maxlength:100},
 type:{type:String,enum:["Text","Dropdown","File"],default:"Text"},
 enabled:{type:Boolean,default:true}, required:{type:Boolean,default:false},
 options:{type:[String],default:[]}
},{_id:false});
const section=new mongoose.Schema({title:{type:String,default:""},description:{type:String,default:""},enabled:{type:Boolean,default:true},fields:{type:[item],default:[]},buttons:{draft:{type:String,default:"Save Draft"},analyze:{type:String,default:"Analyze Shipment"},submit:{type:String,default:"Submit to Admin"}},sections:{origin:{type:Boolean,default:true},invoice:{type:Boolean,default:true},product:{type:Boolean,default:true},documents:{type:Boolean,default:true},aiOutput:{type:Boolean,default:true}}},{_id:false});
const schema=new mongoose.Schema({
 singleton:{type:String,default:"SHIPMENT_FORM",unique:true,immutable:true},
 shipmentConfigured:{type:Boolean,default:false},documentsConfigured:{type:Boolean,default:false},
 shipment:{type:section,default:()=>({})},documents:{type:section,default:()=>({})}
},{timestamps:true});
module.exports=mongoose.model("ShipmentFormConfig",schema);
