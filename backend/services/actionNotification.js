// const Notification=require("../models/Notification");
// async function notifyAction({userId,title,message,type="System",relatedId,actionLink}){
//  if(!userId)return;
//  try{await Notification.create({userId,title,message,category:"System",urgency:"Information",type,relatedId,actionLink});}
//  catch(e){console.error("Notification creation failed",e.message)}
// }
// module.exports={notifyAction};

const Notification=require('../models/Notification');
const User=require('../models/user');
const {enqueue}=require('./notificationMail');
async function notifyAction({userId,title,message,type='System',relatedId,actionLink,eventKey,urgency='Information',category='System',skipEmail=false}){if(!userId)return;try{const user=await User.findById(userId).populate('roleId','name').select('email roleId').lean();if(!user)return;const role=user.roleId?.name;const link=actionLink||`/${role==='b2b'?'b2b':role==='admin'?'admin':'user'}-dashboard`;const data={userId,title,message,type,relatedId,actionLink:link,urgency,category};let n;if(eventKey){const key=`${userId}:${eventKey}`;n=await Notification.findOneAndUpdate({eventKey:key},{$setOnInsert:{...data,eventKey:key}},{upsert:true,new:true});}else n=await Notification.create(data);if(!skipEmail)await enqueue(String(n._id),user.email,n);return n;}catch(e){console.error('Notification creation failed',e.message);}}
module.exports={notifyAction};
