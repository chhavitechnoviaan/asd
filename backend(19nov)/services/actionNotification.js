const Notification=require("../models/Notification");
async function notifyAction({userId,title,message,type="System",relatedId,actionLink}){
 if(!userId)return;
 try{await Notification.create({userId,title,message,category:"System",urgency:"Information",type,relatedId,actionLink});}
 catch(e){console.error("Notification creation failed",e.message)}
}
module.exports={notifyAction};
