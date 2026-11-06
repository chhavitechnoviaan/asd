const {recordAdminActivity}=require("../services/adminActivity");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Role = require("../models/Role");

const safe = u => ({ id:u._id, name:u.name, email:u.email, status:u.status, roleId:u.roleId, isInternalStaff:u.isInternalStaff });
const goodEmail = email => typeof email === "string" && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
async function staffRole(id) {
  const role = await Role.findById(id);
  if (!role || !role.internalOnly) throw Object.assign(new Error("Choose an internal staff role"), {code:400});
  return role;
}
exports.list = async (_req,res) => {
  try {const users=await User.find({isInternalStaff:true}).populate("roleId").sort({createdAt:-1});return res.json({status:1,data:users.map(safe)});}
  catch(e){return res.status(500).json({status:0,message:e.message});}
};
exports.create = async (req,res) => {
  try {
    const {name,email,password,roleId}=req.body;
    if (!name?.trim() || !goodEmail(email) || typeof password!=="string" || password.length<12) return res.status(400).json({status:0,message:"Name, valid email and password of at least 12 characters required"});
    const role=await staffRole(roleId);
    if(role.status!=="active") return res.status(400).json({status:0,message:"Cannot assign inactive role"});
    const normalized=email.toLowerCase().trim();
    if(await User.exists({email:normalized})) return res.status(409).json({status:0,message:"Email already exists"});
    const user=await User.create({name:name.trim(),email:normalized,password:await bcrypt.hash(password,12),roleId:role._id,status:"active",isInternalStaff:true,sessionVersion:0,plan:"Internal Staff"});
    await recordAdminActivity({title:"Sub-admin created",message:`${name.trim()} added as internal staff (${role.name})`,actorId:req.user?._id,relatedId:user._id,type:"User"});
    return res.status(201).json({status:1,data:safe({...user.toObject(),roleId:role})});
  } catch(e){return res.status(e.code||500).json({status:0,message:e.message});}
};
exports.update = async (req,res) => {
  try {
    const user=await User.findOne({_id:req.params.id,isInternalStaff:true});
    if(!user)return res.status(404).json({status:0,message:"Sub-admin not found"});
    const changes=req.body || {};
    if(changes.name!==undefined){if(!String(changes.name).trim())return res.status(400).json({status:0,message:"Name required"});user.name=String(changes.name).trim();}
    if(changes.email!==undefined){if(!goodEmail(changes.email))return res.status(400).json({status:0,message:"Invalid email"});const email=changes.email.trim().toLowerCase();if(await User.exists({email,_id:{$ne:user._id}}))return res.status(409).json({status:0,message:"Email already exists"});user.email=email;}
    if(changes.roleId!==undefined){const role=await staffRole(changes.roleId);if(role.status!=="active")return res.status(400).json({status:0,message:"Cannot assign inactive role"});user.roleId=role._id;}
    if(changes.status!==undefined){if(!["active","inactive"].includes(changes.status))return res.status(400).json({status:0,message:"Invalid status"});user.status=changes.status;}
    if(changes.password!==undefined){if(typeof changes.password!=="string"||changes.password.length<12)return res.status(400).json({status:0,message:"Password must be at least 12 characters"});user.password=await bcrypt.hash(changes.password,12);}
    user.sessionVersion=Number(user.sessionVersion||0)+1;
    await user.save();
    await user.populate("roleId");
    await recordAdminActivity({title:"Sub-admin updated",message:`Staff account ${user.name} was updated`,actorId:req.user?._id,relatedId:user._id,type:"User"});
    return res.json({status:1,data:safe(user)});
  } catch(e){return res.status(e.code||500).json({status:0,message:e.message});}
};
