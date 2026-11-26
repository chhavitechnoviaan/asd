// // Usage (from backend directory): node scripts/check-staff-role.js 6ae862604ae147c96b58d662
// require('dotenv').config();
// const mongoose = require('mongoose');
// const User = require('../models/user');
// const Role = require('../models/Role');
// (async () => {
//   const id = process.argv[2];
//   if (!mongoose.isValidObjectId(id)) throw Error('Provide a valid user ObjectId');
//   const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
//   if (!uri) throw Error('MONGO_URI or MONGODB_URI not set');
//   await mongoose.connect(uri);
//   const user = await User.findById(id).select('name email isInternalStaff roleId status sessionVersion').lean();
//   if (!user) throw Error('User not found');
//   const role = user.roleId ? await Role.findById(user.roleId).lean() : null;
//   const keys = ['vendors','masterData','hsRules','countryRules','dgftSchemes','dashboard'];
//   const permissions = Object.fromEntries(keys.map(k => [k, role?.permissions?.[k] || null]));
//   console.log(JSON.stringify({ user: {id:String(user._id),name:user.name,isInternalStaff:user.isInternalStaff,status:user.status,roleId:String(user.roleId||'')}, role:role && {id:String(role._id),name:role.name,status:role.status,internalOnly:role.internalOnly}, permissions },null,2));
//   await mongoose.disconnect();
// })().catch(e=>{console.error(e.message);process.exitCode=1;mongoose.disconnect().catch(()=>{});});



// Usage (from backend directory): node scripts/check-staff-role.js 6ae862604ae147c96b58d662
require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/user');
const Role = require('../models/Role');
(async () => {
  const id = process.argv[2];
  if (!mongoose.isValidObjectId(id)) throw Error('Provide a valid user ObjectId');
  const uri = process.env.MONGO_URI || process.env.MONGODB_URI;
  if (!uri) throw Error('MONGO_URI or MONGODB_URI not set');
  await mongoose.connect(uri);
  const user = await User.findById(id).select('name email isInternalStaff roleId status sessionVersion').lean();
  if (!user) throw Error('User not found');
  const role = user.roleId ? await Role.findById(user.roleId).lean() : null;
  const keys = ['vendors','masterData','hsRules','countryRules','dgftSchemes','dashboard'];
  const permissions = Object.fromEntries(keys.map(k => [k, role?.permissions?.[k] || null]));
  console.log(JSON.stringify({ user: {id:String(user._id),name:user.name,isInternalStaff:user.isInternalStaff,status:user.status,roleId:String(user.roleId||'')}, role:role && {id:String(role._id),name:role.name,status:role.status,internalOnly:role.internalOnly}, permissions },null,2));
  await mongoose.disconnect();
})().catch(e=>{console.error(e.message);process.exitCode=1;mongoose.disconnect().catch(()=>{});});
