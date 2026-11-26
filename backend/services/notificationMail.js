const mongoose=require('mongoose');
const {buildNotificationEmail}=require('./notificationEmailTemplate');
const nodemailer=require('nodemailer');
const schema=new mongoose.Schema({key:{type:String,unique:true},to:String,recipientName:String,title:String,message:String,link:String,state:{type:String,default:'pending'},attempts:{type:Number,default:0},nextAt:{type:Date,default:Date.now},error:String},{timestamps:true});
const Job=mongoose.model('NotificationMailJob',schema);
const enabled=()=>String(process.env.EMAIL_NOTIFICATIONS_ENABLED||'true').trim().toLowerCase()==='true';
async function enqueue(key,to,n){if(!enabled()||!to)return;await Job.updateOne({key},{$setOnInsert:{key,to,recipientName:n.recipientName,title:n.title,message:n.message,link:n.actionLink,state:'pending',nextAt:new Date(),attempts:0}},{upsert:true});}

const {getVerificationSettings}=require('./verificationEmail');
const {decrypt}=require('../utils/settingSecrets');
let lastWarning='';
function warn(message){if(lastWarning!==message){console.error('[notification-mail]',message);lastWarning=message;}}
async function delivery(){
 const sender=process.env.SMTP_FROM_EMAIL||process.env.SMTP_FROM;
 const apiKey=process.env.BREVO_API_KEY;
 if(apiKey){if(!sender)throw Error('SMTP_FROM_EMAIL is required for Brevo API');return {sender,send:async mail=>{
 const payload={sender:{name:mail.from.name,email:sender},to:[{email:mail.to}],subject:mail.subject,textContent:mail.text,htmlContent:mail.html};
 const response=await fetch('https://api.brevo.com/v3/smtp/email',{method:'POST',headers:{'api-key':apiKey,'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(20000)});
 if(!response.ok){const e=Error('Brevo API HTTP '+response.status);e.code='BREVO_'+response.status;throw e;}return response.json();
 },close(){}};}
 const {smtp}=await getVerificationSettings();
 const configured=!!(smtp.host&&smtp.username&&smtp.password);
 const host=configured?smtp.host:process.env.SMTP_HOST;
 const user=configured?smtp.username:process.env.SMTP_USER;
 const pass=configured?decrypt(smtp.password):process.env.SMTP_PASS;
 const port=Number(configured?smtp.port:process.env.SMTP_PORT||587);
 const secure=configured?String(smtp.encryption).toUpperCase()==='SSL':port===465;
 if(!host||!user||!pass||!sender)throw Error('Configure SMTP host, username, password and SMTP_FROM_EMAIL, or BREVO_API_KEY');
 const transport=nodemailer.createTransport({host,port,secure,requireTLS:!secure,auth:{user,pass},connectionTimeout:10000,greetingTimeout:10000,socketTimeout:20000});
 return {sender,send:async mail=>{const info=await transport.sendMail(mail);if(!info.accepted?.length)throw Error('SMTP did not accept recipient');return info;},close:()=>transport.close()};
}
async function run(){
 if(!enabled()){warn('Email notifications disabled');return;}
 let transport;try{transport=await delivery();lastWarning='';}catch(e){warn(e.message);return;}
 try{
 await Job.updateMany({state:'sending',attempts:{$gte:5},nextAt:{$lte:new Date()}},{$set:{state:'failed',error:'Worker lease expired after final attempt; delivery uncertain'}});
 for(let i=0;i<20;i++){
 const j=await Job.findOneAndUpdate({state:{$in:['pending','sending']},nextAt:{$lte:new Date()},attempts:{$lt:5}},{$set:{state:'sending',nextAt:new Date(Date.now()+300000)},$inc:{attempts:1}},{returnDocument:'after'});if(!j)break;
 try{const base=(process.env.PUBLIC_FRONTEND_URL||'').replace(/\/$/,'');const url=/^https:\/\//.test(base)&&/^\/(admin|b2b|user)-dashboard/.test(j.link||'')?base+j.link:'';
 const mail={from:{name:process.env.SMTP_FROM_NAME||'ASD CargoMate',address:transport.sender},to:j.to,subject:j.title,...buildNotificationEmail(j,url)};
 await transport.send(mail);await Job.updateOne({_id:j._id},{$set:{state:'sent',error:''}});console.info('[notification-mail] accepted',String(j._id));
 }catch(e){const detail=[e.code,e.responseCode,e.message].filter(Boolean).join(' ').replace(/[\r\n]/g,' ').slice(0,500);console.error('[notification-mail] job',String(j._id),'attempt',j.attempts,detail);await Job.updateOne({_id:j._id},{$set:{state:j.attempts>=5?'failed':'pending',nextAt:new Date(Date.now()+60000*2**j.attempts),error:detail}});}
 }
 }finally{transport.close();}
}
module.exports={enqueue,run};
