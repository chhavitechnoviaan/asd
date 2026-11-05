const User=require("../models/user");
const Notification=require("../models/Notification");
/** Best effort: notification failures must not roll back an already committed action. */
async function recordAdminActivity({title,message,actorId,relatedId,type="System"}) {
 try {
  const Role=require("../models/Role");
  const adminRole=await Role.findOne({name:"admin"}).select("_id");
  const users=await User.find({$or:[...(adminRole?[{roleId:adminRole._id}]:[]),{isInternalStaff:true}],status:{$ne:"inactive"}}).select("_id");
  const distinct=[...new Set([...users.map(u=>String(u._id)),...(actorId?[String(actorId)]:[])])];
  if(distinct.length) await Notification.insertMany(distinct.map(userId=>({userId,title,message,type,category:"System",urgency:"Information",...(relatedId?{relatedId}:{}),actionLink:"/admin-dashboard"})),{ordered:false});
 }catch(error){console.error("Admin activity notification:",error.message);}
}
module.exports={recordAdminActivity};
