const crypto=require("crypto");
const AdminSettings=require("../models/AdminSettings");
const {decrypt,encrypt}=require("../utils/settingSecrets");
const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
 if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
 const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
 if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
exports.my=async(req,res)=>{try{const data=await summary(req.user._id);const invoices=await Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30);res.json({status:1,data:{...data,invoices}});}catch(e){res.status(500).json({message:e.message});}};
exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// Admin listing includes inactive plans so their history remains visible.
exports.adminPlans = async (req,res) => {
  try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
  catch (e) { return res.status(500).json({message:"Could not list plans"}); }
};
exports.deletePlan = async (req,res) => {
  try {
    const plan = await Plan.findById(req.params.id);
    if (!plan) return res.status(404).json({message:"Plan not found"});
    const linked = await Subscription.exists({planId:plan._id});
    if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
    await Plan.deleteOne({_id:plan._id});
    return res.json({status:1,message:"Plan deleted"});
  } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
};
// Manual changes are not payments and do not create paid invoices.
exports.adminChangeCustomerPlan = async (req,res) => {
  try {
    const mongoose = require("mongoose");
    const User = require("../models/user");
    if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
      return res.status(400).json({message:"Invalid user or plan ID"});
    if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
      return res.status(400).json({message:"A reason of 5+ characters is required"});
    const user=await User.findById(req.params.userId).populate("roleId", "name");
    if (!user) return res.status(404).json({message:"Customer not found"});
    const roleName=String(user.roleId?.name||"").toLowerCase();
    if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
    const plan=await Plan.findById(req.body.planId);
    if (!plan || plan.status!=="active" || plan.audience!==roleName)
      return res.status(400).json({message:"Selected plan must be active and match customer audience"});
    const now=new Date(), expires=new Date(now);
    expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
    await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
    const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false});
    // Keep the legacy User.planId reference aligned with the active subscription.
    await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
    // Existing paid invoices and Razorpay transactions are not modified.
    console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
    return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
  } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
};
exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// Claim a trial only once per account, independent of plan selection.
exports.startTrial=async(req,res)=>{try{
 const plan=await Plan.findById(req.body.planId);
 if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
 const User=require("../models/user");
 const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
 if(!claimed)return res.status(409).json({message:"Free trial already used"});
 const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
 await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
 const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
 await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
 res.status(201).json({status:1,data:sub});
 }catch(e){res.status(500).json({message:e.message});}};

// Razorpay's webhook body must be read as RAW bytes before express.json().
exports.webhook=async(req,res)=>{try{
 const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
 if(!secret)return res.status(503).json({message:"Webhook not configured"});
 const signature=String(req.get("x-razorpay-signature")||"");
 const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
 if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
 const payload=JSON.parse(req.body.toString("utf8"));
 const payment=payload.payload?.payment?.entity;
 if(!payment?.order_id)return res.status(200).json({ok:true});
 if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
 // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
 if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
 res.json({ok:true});
 }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

exports.invoicePdf=async(req,res)=>{try{
 const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
 const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
 if(!invoice)return res.status(404).json({message:"Invoice not found"});
 const snap=invoice.billingSnapshot||{}, verified=snap.verified===true;
 const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
 const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
 const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
 const doc=new PDFDocument({size:"A4",margin:46});
 const navy="#10213C",teal="#0D9488",grey="#5B6C82";
 res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
 doc.rect(0,0,595,114).fill(navy);
 const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
 if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
 doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
 doc.font("Helvetica").fontSize(10).text(verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
 doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
 doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
 const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
 pair("Invoice number",invoice.invoiceNumber,47,176);pair("Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
 pair("Payment method",invoice.paymentMethod||"Razorpay",47,223);pair("Payment status",invoice.status,310,223);
 doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
 const sub=invoice.subscriptionId, plan=sub?.planId;
 doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
 doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
 doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
 doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
 doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
 doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
 doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
 if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
 if(verified){
   doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
   doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
   doc.text(snap.address||"",312,450,{width:230});
   doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
   if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
   doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
   const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
   rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
 }else{
   doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
   doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
   doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
   doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
 }
 doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
 doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
 doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
 }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};
