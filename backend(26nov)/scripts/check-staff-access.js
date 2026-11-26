// Run with STAFF_EMAIL=staff@example.com node scripts/check-staff-access.js
require('dotenv').config();
const mongoose=require('mongoose');
const User=require('../models/user');
const {allowedForStaff}=require('../middleware/staffPolicy');
(async()=>{
  if(!process.env.STAFF_EMAIL||!process.env.MONGO_URI)throw Error('STAFF_EMAIL and MONGO_URI required');
  await mongoose.connect(process.env.MONGO_URI);
  const account=await User.findOne({email:process.env.STAFF_EMAIL.trim().toLowerCase()}).populate('roleId');
  if(!account)throw Error('Staff account not found');
  const role=account.roleId;
  console.log(JSON.stringify({name:account.name,role:role?.name,roleStatus:role?.status,accountStatus:account.status,isInternalStaff:account.isInternalStaff,
    vendorView:allowedForStaff(account,'GET','/api/vendors'),
    vendorStats:allowedForStaff(account,'GET','/api/vendors/stats/all'),
    vendorEdit:allowedForStaff(account,'PUT','/api/vendors/id'),
    plansView:allowedForStaff(account,'GET','/api/ai-subscription/plans')},null,2));
})().catch(e=>{console.error(e.message);process.exitCode=1}).finally(()=>mongoose.disconnect());
