// const User=require("../models/user");
// const Notification=require("../models/Notification");
// /** Best effort: notification failures must not roll back an already committed action. */
// async function recordAdminActivity({title,message,actorId,relatedId,type="System"}) {
//  try {
//   const Role=require("../models/Role");
//   const adminRole=await Role.findOne({name:"admin"}).select("_id");
//   const users=await User.find({$or:[...(adminRole?[{roleId:adminRole._id}]:[]),{isInternalStaff:true}],status:{$ne:"inactive"}}).select("_id");
//   const distinct=[...new Set([...users.map(u=>String(u._id)),...(actorId?[String(actorId)]:[])])];
//   if(distinct.length) await Notification.insertMany(distinct.map(userId=>({userId,title,message,type,category:"System",urgency:"Information",...(relatedId?{relatedId}:{}),actionLink:"/admin-dashboard"})),{ordered:false});
//  }catch(error){console.error("Admin activity notification:",error.message);}
// }
// module.exports={recordAdminActivity};


const User=require('../models/user');
const {notifyAction}=require('./actionNotification');
const {enqueue}=require('./notificationMail');
const crypto=require('crypto');
async function recordAdminActivity({title,message,relatedId,type='System',module,eventKey,category='System',mainAdminOnly=false}){try{const users=await User.find({status:{$ne:'inactive'},accountStatus:{$ne:'Inactive'}}).select('roleId isInternalStaff').populate('roleId').lean();module=module||(/^New User/.test(title)?"users":/^New B2B/.test(title)?"vendors":/^Role/.test(title)?"roles":/^Sub-admin/.test(title)?"subAdmins":undefined);const key=eventKey||crypto.randomUUID();for(const u of users){const r=u.roleId;if(r?.status==='inactive')continue;if(r?.name==='admin'||(!mainAdminOnly&&u.isInternalStaff&&module&&r?.permissions?.[module]?.view&&r?.permissions?.notifications?.view))await notifyAction({userId:u._id,title,message,relatedId,type,category,eventKey:'admin:'+key,actionLink:'/admin-dashboard',skipEmail:true});}await enqueue('admin:'+key,process.env.ADMIN_NOTIFICATION_EMAIL||'asdcargomate@gmail.com',{title,message,actionLink:'/admin-dashboard'});}catch(e){console.error('Admin notification:',e.message);}}
module.exports={recordAdminActivity};
