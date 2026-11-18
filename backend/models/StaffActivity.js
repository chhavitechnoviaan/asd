const mongoose = require("mongoose");
const schema = new mongoose.Schema({actor: {type: mongoose.Schema.Types.ObjectId, ref:"User", index:true}, actorName:String, roleName:String, method:String, path:String, permission:String, statusCode:Number, outcome:String, ip:String}, {timestamps:true});
schema.index({createdAt:-1});
module.exports = mongoose.model("StaffActivity",schema);
