// // // // // // // // // const crypto=require("crypto");
// // // // // // // // // const AdminSettings=require("../models/AdminSettings");
// // // // // // // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // // // // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // // // // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // // // // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // // // // // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // // // // // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // // // // // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // // // // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // // // // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // // exports.my=async(req,res)=>{try{const data=await summary(req.user._id);const invoices=await Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30);res.json({status:1,data:{...data,invoices}});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // // // // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // // // // // // Admin listing includes inactive plans so their history remains visible.
// // // // // // // // // exports.adminPlans = async (req,res) => {
// // // // // // // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // // // // // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // // // // // // };
// // // // // // // // // exports.deletePlan = async (req,res) => {
// // // // // // // // //   try {
// // // // // // // // //     const plan = await Plan.findById(req.params.id);
// // // // // // // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // // // // // // //     const linked = await Subscription.exists({planId:plan._id});
// // // // // // // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // // // // // // //     await Plan.deleteOne({_id:plan._id});
// // // // // // // // //     return res.json({status:1,message:"Plan deleted"});
// // // // // // // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // // // // // // };
// // // // // // // // // // Manual changes are not payments and do not create paid invoices.
// // // // // // // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // // // // // // //   try {
// // // // // // // // //     const mongoose = require("mongoose");
// // // // // // // // //     const User = require("../models/user");
// // // // // // // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // // // // // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // // // // // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // // // // // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // // // // // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // // // // // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // // // // // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // // // // // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // // // // // // //     const plan=await Plan.findById(req.body.planId);
// // // // // // // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // // // // // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // // // // // // //     const now=new Date(), expires=new Date(now);
// // // // // // // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // // // // // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false});
// // // // // // // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // // // // // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // // // // // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // // // // // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // // // // // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // // // // // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // // // // // // };
// // // // // // // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // // // // // // Claim a trial only once per account, independent of plan selection.
// // // // // // // // // exports.startTrial=async(req,res)=>{try{
// // // // // // // // //  const plan=await Plan.findById(req.body.planId);
// // // // // // // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // // // // // // //  const User=require("../models/user");
// // // // // // // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // // // // // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // // // // // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // // // // // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // // // // // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // // // // // // //  res.status(201).json({status:1,data:sub});
// // // // // // // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // // // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // // // // // // exports.webhook=async(req,res)=>{try{
// // // // // // // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // // // // // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // // // // // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // // // // // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // // // // // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // // // // // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // // // // // // //  const payment=payload.payload?.payment?.entity;
// // // // // // // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // // // // // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // // // // // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // // // // // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // // // // // // //  res.json({ok:true});
// // // // // // // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // // // // // // exports.invoicePdf=async(req,res)=>{try{
// // // // // // // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // // // // // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // // // // // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // // // // // // //  const snap=invoice.billingSnapshot||{}, verified=snap.verified===true;
// // // // // // // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // // // // // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // // // // // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // // // // // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // // // // // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // // // // // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // // // // // // //  doc.rect(0,0,595,114).fill(navy);
// // // // // // // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // // // // // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // // // // // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // // // // // // //  doc.font("Helvetica").fontSize(10).text(verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // // // // // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // // // // // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // // // // // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair("Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // // // // // // //  pair("Payment method",invoice.paymentMethod||"Razorpay",47,223);pair("Payment status",invoice.status,310,223);
// // // // // // // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // // // // // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // // // // // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // // // // // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // // // // // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // // // // // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // // // // // // //  if(verified){
// // // // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // // // // // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // // // // // // //    doc.text(snap.address||"",312,450,{width:230});
// // // // // // // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // // // // // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // // // // // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // // // // // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // // // // // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // // // // // // //  }else{
// // // // // // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // // // // // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // // // // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // // // // // // //  }
// // // // // // // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // // // // // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // // // // // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // // // // // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // // // // // const crypto=require("crypto");
// // // // // // // // const AdminSettings=require("../models/AdminSettings");
// // // // // // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // // // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // // // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // // // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // // // // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // // // // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // // // // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // // // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // // // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // exports.my=async(req,res)=>{try{const data=await summary(req.user._id);const invoices=await Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30);res.json({status:1,data:{...data,invoices}});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // // // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // // // // // Admin listing includes inactive plans so their history remains visible.
// // // // // // // // exports.adminPlans = async (req,res) => {
// // // // // // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // // // // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // // // // // };
// // // // // // // // exports.deletePlan = async (req,res) => {
// // // // // // // //   try {
// // // // // // // //     const plan = await Plan.findById(req.params.id);
// // // // // // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // // // // // //     const linked = await Subscription.exists({planId:plan._id});
// // // // // // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // // // // // //     await Plan.deleteOne({_id:plan._id});
// // // // // // // //     return res.json({status:1,message:"Plan deleted"});
// // // // // // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // // // // // };
// // // // // // // // // Manual changes are not payments and do not create paid invoices.
// // // // // // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // // // // // //   try {
// // // // // // // //     const mongoose = require("mongoose");
// // // // // // // //     const User = require("../models/user");
// // // // // // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // // // // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // // // // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // // // // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // // // // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // // // // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // // // // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // // // // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // // // // // //     const plan=await Plan.findById(req.body.planId);
// // // // // // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // // // // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // // // // // //     const now=new Date(), expires=new Date(now);
// // // // // // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // // // // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false});
// // // // // // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // // // // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // // // // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // // // // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // // // // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // // // // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // // // // // };
// // // // // // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // // // // // Claim a trial only once per account, independent of plan selection.
// // // // // // // // exports.startTrial=async(req,res)=>{try{
// // // // // // // //  const plan=await Plan.findById(req.body.planId);
// // // // // // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // // // // // //  const User=require("../models/user");
// // // // // // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // // // // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // // // // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // // // // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // // // // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // // // // // //  res.status(201).json({status:1,data:sub});
// // // // // // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // // // // // exports.webhook=async(req,res)=>{try{
// // // // // // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // // // // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // // // // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // // // // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // // // // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // // // // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // // // // // //  const payment=payload.payload?.payment?.entity;
// // // // // // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // // // // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // // // // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // // // // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // // // // // //  res.json({ok:true});
// // // // // // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // // // // // exports.invoicePdf=async(req,res)=>{try{
// // // // // // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // // // // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // // // // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // // // // // //  const snap=invoice.billingSnapshot||{}, verified=snap.verified===true;
// // // // // // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // // // // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // // // // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // // // // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // // // // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // // // // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // // // // // //  doc.rect(0,0,595,114).fill(navy);
// // // // // // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // // // // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // // // // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // // // // // //  doc.font("Helvetica").fontSize(10).text(verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // // // // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // // // // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // // // // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair("Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // // // // // //  pair("Payment method",invoice.paymentMethod||"Razorpay",47,223);pair("Payment status",invoice.status,310,223);
// // // // // // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // // // // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // // // // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // // // // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // // // // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // // // // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // // // // // //  if(verified){
// // // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // // // // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // // // // // //    doc.text(snap.address||"",312,450,{width:230});
// // // // // // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // // // // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // // // // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // // // // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // // // // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // // // // // //  }else{
// // // // // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // // // // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // // // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // // // // // //  }
// // // // // // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // // // // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // // // // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // // // // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};




// // // // // // // const crypto=require("crypto");
// // // // // // // const AdminSettings=require("../models/AdminSettings");
// // // // // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // // // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // // // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // // // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // exports.my=async(req,res)=>{try{const data=await summary(req.user._id);const invoices=await Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30);res.json({status:1,data:{...data,invoices}});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // // // // Admin listing includes inactive plans so their history remains visible.
// // // // // // // exports.adminPlans = async (req,res) => {
// // // // // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // // // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // // // // };
// // // // // // // exports.deletePlan = async (req,res) => {
// // // // // // //   try {
// // // // // // //     const plan = await Plan.findById(req.params.id);
// // // // // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // // // // //     const linked = await Subscription.exists({planId:plan._id});
// // // // // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // // // // //     await Plan.deleteOne({_id:plan._id});
// // // // // // //     return res.json({status:1,message:"Plan deleted"});
// // // // // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // // // // };
// // // // // // // // Manual changes are not payments and do not create paid invoices.
// // // // // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // // // // //   try {
// // // // // // //     const mongoose = require("mongoose");
// // // // // // //     const User = require("../models/user");
// // // // // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // // // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // // // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // // // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // // // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // // // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // // // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // // // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // // // // //     const plan=await Plan.findById(req.body.planId);
// // // // // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // // // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // // // // //     const now=new Date(), expires=new Date(now);
// // // // // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // // // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false});
// // // // // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // // // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // // // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // // // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // // // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // // // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // // // // };
// // // // // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // // // // Claim a trial only once per account, independent of plan selection.
// // // // // // // exports.startTrial=async(req,res)=>{try{
// // // // // // //  const plan=await Plan.findById(req.body.planId);
// // // // // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // // // // //  const User=require("../models/user");
// // // // // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // // // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // // // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // // // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // // // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // // // // //  res.status(201).json({status:1,data:sub});
// // // // // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // // // // exports.webhook=async(req,res)=>{try{
// // // // // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // // // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // // // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // // // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // // // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // // // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // // // // //  const payment=payload.payload?.payment?.entity;
// // // // // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // // // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // // // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // // // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // // // // //  res.json({ok:true});
// // // // // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // // // // exports.invoicePdf=async(req,res)=>{try{
// // // // // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // // // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // // // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // // // // //  const snap=invoice.billingSnapshot||{}, verified=snap.verified===true;
// // // // // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // // // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // // // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // // // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // // // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // // // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // // // // //  doc.rect(0,0,595,114).fill(navy);
// // // // // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // // // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // // // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // // // // //  doc.font("Helvetica").fontSize(10).text(verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // // // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // // // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // // // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair("Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // // // // //  pair("Payment method",invoice.paymentMethod||"Razorpay",47,223);pair("Payment status",invoice.status,310,223);
// // // // // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // // // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // // // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // // // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // // // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // // // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // // // // //  if(verified){
// // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // // // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // // // // //    doc.text(snap.address||"",312,450,{width:230});
// // // // // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // // // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // // // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // // // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // // // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // // // // //  }else{
// // // // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // // // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // // // // //  }
// // // // // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // // // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // // // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // // // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // // // // // Downloadable assignment confirmation; intentionally NOT a tax invoice or payment receipt.
// // // // // // // exports.adminAssignmentPdf = async (req,res) => {
// // // // // // //  try {
// // // // // // //   const mongoose=require("mongoose");
// // // // // // //   if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid assignment ID"});
// // // // // // //   const sub=await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:"Admin"}).populate("planId","name tier planType").populate("activatedBy","name email");
// // // // // // //   if(!sub)return res.status(404).json({message:"Assignment record not found"});
// // // // // // //   const PDFDocument=require("pdfkit");
// // // // // // //   const doc=new PDFDocument({size:"A4",margin:48});
// // // // // // //   res.setHeader("Content-Type","application/pdf");
// // // // // // //   res.setHeader("Content-Disposition",`attachment; filename="ASD-Admin-Assignment-${sub._id}.pdf"`);
// // // // // // //   doc.pipe(res);
// // // // // // //   doc.fontSize(20).fillColor("#0e7774").text("ASD CargoMate");
// // // // // // //   doc.moveDown(.4).fontSize(16).fillColor("#1f2937").text("Admin Plan Assignment Confirmation");
// // // // // // //   doc.moveDown(.5).fontSize(10).fillColor("#6b7280").text("This document confirms a manual plan assignment. It is NOT a payment invoice or GST tax invoice.");
// // // // // // //   doc.moveDown(1).fillColor("#111827").fontSize(11);
// // // // // // //   const line=(label,value)=>{doc.font("Helvetica-Bold").text(`${label}: `,{continued:true}).font("Helvetica").text(String(value??"-"));doc.moveDown(.45);};
// // // // // // //   line("Reference",String(sub._id));line("Plan",sub.planId?.name||"Plan");line("Status",sub.status);
// // // // // // //   line("Activated by",sub.activatedBy?.name||"Admin");line("Activation date",new Date(sub.startDate).toLocaleDateString("en-IN"));
// // // // // // //   line("Valid until",new Date(sub.expiryDate).toLocaleDateString("en-IN"));
// // // // // // //   line("Billing cycle",sub.billingCycle);line("Reason",sub.activationReason||"Not provided");
// // // // // // //   line("Payment collected","INR 0 (admin assignment)");
// // // // // // //   doc.moveDown(1).fontSize(9).fillColor("#6b7280").text("System-generated assignment record. No payment transaction is represented by this document.");
// // // // // // //   doc.end();
// // // // // // //  }catch(e){console.error("Admin assignment PDF",e);if(!res.headersSent)res.status(500).json({message:"Unable to generate assignment record"});else res.end();}
// // // // // // // };




// // // // // // const crypto=require("crypto");
// // // // // // const AdminSettings=require("../models/AdminSettings");
// // // // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // exports.my=async(req,res)=>{
// // // // // //  try {
// // // // // //   const data=await summary(req.user._id);
// // // // // //   const [invoices,adminAssignments]=await Promise.all([
// // // // // //    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
// // // // // //    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
// // // // // //   ]);
// // // // // //   res.set("Cache-Control","no-store");
// // // // // //   res.json({status:1,data:{...data,invoices,adminAssignments}});
// // // // // //  } catch(e) {res.status(500).json({message:e.message});}
// // // // // // };
// // // // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // // // Admin listing includes inactive plans so their history remains visible.
// // // // // // exports.adminPlans = async (req,res) => {
// // // // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // // // };
// // // // // // exports.deletePlan = async (req,res) => {
// // // // // //   try {
// // // // // //     const plan = await Plan.findById(req.params.id);
// // // // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // // // //     const linked = await Subscription.exists({planId:plan._id});
// // // // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // // // //     await Plan.deleteOne({_id:plan._id});
// // // // // //     return res.json({status:1,message:"Plan deleted"});
// // // // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // // // };
// // // // // // // Manual changes are not payments and do not create paid invoices.
// // // // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // // // //   try {
// // // // // //     const mongoose = require("mongoose");
// // // // // //     const User = require("../models/user");
// // // // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // // // //     const plan=await Plan.findById(req.body.planId);
// // // // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // // // //     const now=new Date(), expires=new Date(now);
// // // // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
// // // // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // // // };
// // // // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // // // Claim a trial only once per account, independent of plan selection.
// // // // // // exports.startTrial=async(req,res)=>{try{
// // // // // //  const plan=await Plan.findById(req.body.planId);
// // // // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // // // //  const User=require("../models/user");
// // // // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // // // //  res.status(201).json({status:1,data:sub});
// // // // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // // // exports.webhook=async(req,res)=>{try{
// // // // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // // // //  const payment=payload.payload?.payment?.entity;
// // // // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // // // //  res.json({ok:true});
// // // // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // // // exports.invoicePdf=async(req,res)=>{try{
// // // // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // // // //  const snap=invoice.billingSnapshot||{}, verified=snap.verified===true;
// // // // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // // // //  doc.rect(0,0,595,114).fill(navy);
// // // // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // // // //  doc.font("Helvetica").fontSize(10).text(verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair("Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // // // //  pair("Payment method",invoice.paymentMethod||"Razorpay",47,223);pair("Payment status",invoice.status,310,223);
// // // // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // // // //  if(verified){
// // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // // // //    doc.text(snap.address||"",312,450,{width:230});
// // // // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // // // //  }else{
// // // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // // // //  }
// // // // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // // // // Downloadable assignment confirmation; intentionally NOT a tax invoice or payment receipt.
// // // // // // exports.adminAssignmentPdf = async (req,res) => {
// // // // // //  try {
// // // // // //   const mongoose=require("mongoose");
// // // // // //   if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid assignment ID"});
// // // // // //   const sub=await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:"Admin"}).populate("planId","name tier planType").populate("activatedBy","name email");
// // // // // //   if(!sub)return res.status(404).json({message:"Assignment record not found"});
// // // // // //   const PDFDocument=require("pdfkit");
// // // // // //   const doc=new PDFDocument({size:"A4",margin:48});
// // // // // //   res.setHeader("Content-Type","application/pdf");
// // // // // //   res.setHeader("Content-Disposition",`attachment; filename="ASD-Admin-Assignment-${sub._id}.pdf"`);
// // // // // //   doc.pipe(res);
// // // // // //   doc.fontSize(20).fillColor("#0e7774").text("ASD CargoMate");
// // // // // //   doc.moveDown(.4).fontSize(16).fillColor("#1f2937").text("Admin Plan Assignment Confirmation");
// // // // // //   doc.moveDown(.5).fontSize(10).fillColor("#6b7280").text("This document confirms a manual plan assignment. It is NOT a payment invoice or GST tax invoice.");
// // // // // //   doc.moveDown(1).fillColor("#111827").fontSize(11);
// // // // // //   const line=(label,value)=>{doc.font("Helvetica-Bold").text(`${label}: `,{continued:true}).font("Helvetica").text(String(value??"-"));doc.moveDown(.45);};
// // // // // //   line("Reference",String(sub._id));line("Plan",sub.planId?.name||"Plan");line("Status",sub.status);
// // // // // //   line("Activated by",sub.activatedBy?.name||"Admin");line("Activation date",new Date(sub.startDate).toLocaleDateString("en-IN"));
// // // // // //   line("Valid until",new Date(sub.expiryDate).toLocaleDateString("en-IN"));
// // // // // //   line("Billing cycle",sub.billingCycle);line("Reason",sub.activationReason||"Not provided");
// // // // // //   doc.moveDown(1).fontSize(9).fillColor("#6b7280").text("System-generated administrative confirmation. This is not a tax invoice or payment receipt.");
// // // // // //   doc.end();
// // // // // //  }catch(e){console.error("Admin assignment PDF",e);if(!res.headersSent)res.status(500).json({message:"Unable to generate assignment record"});else res.end();}
// // // // // // };




// // // // // const crypto=require("crypto");
// // // // // const AdminSettings=require("../models/AdminSettings");
// // // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // // exports.my=async(req,res)=>{
// // // // //  try {
// // // // //   const data=await summary(req.user._id);
// // // // //   const [invoices,adminAssignments]=await Promise.all([
// // // // //    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
// // // // //    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
// // // // //   ]);
// // // // //   res.set("Cache-Control","no-store");
// // // // //   res.json({status:1,data:{...data,invoices,adminAssignments}});
// // // // //  } catch(e) {res.status(500).json({message:e.message});}
// // // // // };
// // // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // // Admin listing includes inactive plans so their history remains visible.
// // // // // exports.adminPlans = async (req,res) => {
// // // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // // };
// // // // // exports.deletePlan = async (req,res) => {
// // // // //   try {
// // // // //     const plan = await Plan.findById(req.params.id);
// // // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // // //     const linked = await Subscription.exists({planId:plan._id});
// // // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // // //     await Plan.deleteOne({_id:plan._id});
// // // // //     return res.json({status:1,message:"Plan deleted"});
// // // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // // };
// // // // // // Manual changes are not payments and do not create paid invoices.
// // // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // // //   try {
// // // // //     const mongoose = require("mongoose");
// // // // //     const User = require("../models/user");
// // // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // // //     const plan=await Plan.findById(req.body.planId);
// // // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // // //     const now=new Date(), expires=new Date(now);
// // // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
// // // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // // };
// // // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // // Claim a trial only once per account, independent of plan selection.
// // // // // exports.startTrial=async(req,res)=>{try{
// // // // //  const plan=await Plan.findById(req.body.planId);
// // // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // // //  const User=require("../models/user");
// // // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // // //  res.status(201).json({status:1,data:sub});
// // // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // // exports.webhook=async(req,res)=>{try{
// // // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // // //  const payment=payload.payload?.payment?.entity;
// // // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // // //  res.json({ok:true});
// // // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // // exports.invoicePdf=async(req,res)=>{try{
// // // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // // //  const isAdmin=invoice.status==="Admin Activated" || invoice.paymentMethod==="Admin Assignment";
// // // // //  const snap=invoice.billingSnapshot||{}, verified=!isAdmin && snap.verified===true;
// // // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // // //  doc.rect(0,0,595,114).fill(navy);
// // // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // // //  doc.font("Helvetica").fontSize(10).text(isAdmin?"ADMIN-ACTIVATED SUBSCRIPTION INVOICE":verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair(isAdmin?"Activated on":"Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // // //  pair(isAdmin?"Activation type":"Payment method",isAdmin?"Manual admin activation":invoice.paymentMethod||"Razorpay",47,223);pair(isAdmin?"Plan status":"Payment status",isAdmin?"Activated by Admin":invoice.status,310,223);
// // // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // // //  if(verified){
// // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // // //    doc.text(snap.address||"",312,450,{width:230});
// // // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // // //  }else if(isAdmin){
// // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Activated by Admin",62,544);
// // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("Manual subscription activation. No payment receipt is issued for this action.",62,569,{width:465});
// // // // //  }else{
// // // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // // //  }
// // // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // // // Downloadable assignment confirmation; intentionally NOT a tax invoice or payment receipt.
// // // // // exports.adminAssignmentPdf = async (req,res) => {
// // // // //  try {
// // // // //   const mongoose=require("mongoose");
// // // // //   if(!mongoose.isValidObjectId(req.params.id))return res.status(400).json({message:"Invalid assignment ID"});
// // // // //   const sub=await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:"Admin"}).populate("planId","name tier planType").populate("activatedBy","name email");
// // // // //   if(!sub)return res.status(404).json({message:"Assignment record not found"});
// // // // //   const PDFDocument=require("pdfkit");
// // // // //   const doc=new PDFDocument({size:"A4",margin:48});
// // // // //   res.setHeader("Content-Type","application/pdf");
// // // // //   res.setHeader("Content-Disposition",`attachment; filename="ASD-Admin-Assignment-${sub._id}.pdf"`);
// // // // //   doc.pipe(res);
// // // // //   doc.fontSize(20).fillColor("#0e7774").text("ASD CargoMate");
// // // // //   doc.moveDown(.4).fontSize(16).fillColor("#1f2937").text("Admin Plan Assignment Confirmation");
// // // // //   doc.moveDown(.5).fontSize(10).fillColor("#6b7280").text("This document confirms a manual plan assignment. It is NOT a payment invoice or GST tax invoice.");
// // // // //   doc.moveDown(1).fillColor("#111827").fontSize(11);
// // // // //   const line=(label,value)=>{doc.font("Helvetica-Bold").text(`${label}: `,{continued:true}).font("Helvetica").text(String(value??"-"));doc.moveDown(.45);};
// // // // //   line("Reference",String(sub._id));line("Plan",sub.planId?.name||"Plan");line("Status",sub.status);
// // // // //   line("Activated by",sub.activatedBy?.name||"Admin");line("Activation date",new Date(sub.startDate).toLocaleDateString("en-IN"));
// // // // //   line("Valid until",new Date(sub.expiryDate).toLocaleDateString("en-IN"));
// // // // //   line("Billing cycle",sub.billingCycle);line("Reason",sub.activationReason||"Not provided");
// // // // //   doc.moveDown(1).fontSize(9).fillColor("#6b7280").text("System-generated administrative confirmation. This is not a tax invoice or payment receipt.");
// // // // //   doc.end();
// // // // //  }catch(e){console.error("Admin assignment PDF",e);if(!res.headersSent)res.status(500).json({message:"Unable to generate assignment record"});else res.end();}
// // // // // };





// // // // const crypto=require("crypto");
// // // // const AdminSettings=require("../models/AdminSettings");
// // // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // // exports.my=async(req,res)=>{
// // // //  try {
// // // //   const data=await summary(req.user._id);
// // // //   const [invoices,adminAssignments]=await Promise.all([
// // // //    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
// // // //    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
// // // //   ]);
// // // //   res.set("Cache-Control","no-store");
// // // //   res.json({status:1,data:{...data,invoices,adminAssignments}});
// // // //  } catch(e) {res.status(500).json({message:e.message});}
// // // // };
// // // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // // Admin listing includes inactive plans so their history remains visible.
// // // // exports.adminPlans = async (req,res) => {
// // // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // // };
// // // // exports.deletePlan = async (req,res) => {
// // // //   try {
// // // //     const plan = await Plan.findById(req.params.id);
// // // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // // //     const linked = await Subscription.exists({planId:plan._id});
// // // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // // //     await Plan.deleteOne({_id:plan._id});
// // // //     return res.json({status:1,message:"Plan deleted"});
// // // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // // };
// // // // // Manual changes are not payments and do not create paid invoices.
// // // // exports.adminChangeCustomerPlan = async (req,res) => {
// // // //   try {
// // // //     const mongoose = require("mongoose");
// // // //     const User = require("../models/user");
// // // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // // //     const plan=await Plan.findById(req.body.planId);
// // // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // // //     const now=new Date(), expires=new Date(now);
// // // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
// // // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // // //     // Existing paid invoices and Razorpay transactions are not modified.
// // // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // // };
// // // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // // Claim a trial only once per account, independent of plan selection.
// // // // exports.startTrial=async(req,res)=>{try{
// // // //  const plan=await Plan.findById(req.body.planId);
// // // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // // //  const User=require("../models/user");
// // // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // // //  res.status(201).json({status:1,data:sub});
// // // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // // exports.webhook=async(req,res)=>{try{
// // // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // // //  const signature=String(req.get("x-razorpay-signature")||"");
// // // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // // //  const payload=JSON.parse(req.body.toString("utf8"));
// // // //  const payment=payload.payload?.payment?.entity;
// // // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // // //  res.json({ok:true});
// // // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // // exports.invoicePdf=async(req,res)=>{try{
// // // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // // //  const isAdmin=invoice.status==="Admin Activated" || invoice.paymentMethod==="Admin Assignment";
// // // //  const snap=invoice.billingSnapshot||{}, verified=!isAdmin && snap.verified===true;
// // // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // // //  const doc=new PDFDocument({size:"A4",margin:46});
// // // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // // //  doc.rect(0,0,595,114).fill(navy);
// // // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // // //  doc.font("Helvetica").fontSize(10).text(isAdmin?"ADMIN-ACTIVATED SUBSCRIPTION INVOICE":verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair(isAdmin?"Activated on":"Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // // //  pair(isAdmin?"Activation type":"Payment method",isAdmin?"Manual admin activation":invoice.paymentMethod||"Razorpay",47,223);pair(isAdmin?"Plan status":"Payment status",isAdmin?"Activated by Admin":invoice.status,310,223);
// // // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // // //  if(verified){
// // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // // //    doc.text(snap.address||"",312,450,{width:230});
// // // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // // //  }else if(isAdmin){
// // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Activated by Admin",62,544);
// // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("Manual subscription activation. No payment receipt is issued for this action.",62,569,{width:465});
// // // //  }else{
// // // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // // //  }
// // // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // // Downloadable assignment confirmation; intentionally NOT a tax invoice or payment receipt.
// // // // // Legacy assignment download endpoint: match the branded subscription invoice layout.
// // // // // This is an admin activation confirmation, not proof of payment or a GST invoice.
// // // // exports.adminAssignmentPdf = async (req, res) => {
// // // //   try {
// // // //     const mongoose = require("mongoose");
// // // //     const PDFDocument = require("pdfkit");
// // // //     const fs = require("fs");
// // // //     const path = require("path");
// // // //     if (!mongoose.isValidObjectId(req.params.id))
// // // //       return res.status(400).json({ message: "Invalid assignment ID" });
// // // //     const sub = await Subscription.findOne({
// // // //       _id: req.params.id, userId: req.user._id, activationSource: "Admin"
// // // //     }).populate("planId", "name tier planType").populate("activatedBy", "name email");
// // // //     if (!sub) return res.status(404).json({ message: "Assignment record not found" });
// // // //     const User = require("../models/user");
// // // //     const customer = await User.findById(req.user._id).select("name email").lean();
// // // //     const date = value => value ? new Date(value).toLocaleDateString("en-IN") : "—";
// // // //     const doc = new PDFDocument({ size: "A4", margin: 46 });
// // // //     const navy = "#10213C", teal = "#0D9488", grey = "#5B6C82";
// // // //     res.setHeader("Content-Type", "application/pdf");
// // // //     res.setHeader("Content-Disposition", `attachment; filename="ASD-Admin-Assignment-${sub._id}.pdf"`);
// // // //     doc.pipe(res);

// // // //     // Same branded header and watermark as paid subscription receipts.
// // // //     doc.rect(0, 0, 595, 114).fill(navy);
// // // //     const logo = path.join(__dirname, "../assets/cargomate_invoice_logo.png");
// // // //     if (fs.existsSync(logo)) {
// // // //       doc.image(logo, 47, 19, { fit: [106, 74] });
// // // //       doc.save().opacity(0.045).image(logo, 105, 250, { fit: [385, 320] }).restore();
// // // //     }
// // // //     doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate", 167, 37);
// // // //     doc.font("Helvetica").fontSize(10).text("ADMIN-ACTIVATED SUBSCRIPTION INVOICE", 169, 67);
// // // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING", 46, 137);
// // // //     doc.moveTo(46, 159).lineTo(549, 159).lineWidth(2).strokeColor(teal).stroke();
// // // //     const pair = (label, value, x, y) => {
// // // //       doc.fillColor(grey).font("Helvetica").fontSize(9).text(label, x, y, { width: 225 });
// // // //       doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value || "—"), x, y + 15, { width: 225 });
// // // //     };
// // // //     pair("Invoice reference", `ASD-ADMIN-${String(sub._id).slice(-12).toUpperCase()}`, 47, 176);
// // // //     pair("Activated on", date(sub.startDate), 310, 176);
// // // //     pair("Activation type", "Manual admin activation", 47, 223);
// // // //     pair("Activation status", "Activated by Admin", 310, 223);

// // // //     doc.roundedRect(46, 277, 503, 113, 10).fill("#EFF6F8");
// // // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription", 63, 295);
// // // //     doc.font("Helvetica").fontSize(10).fillColor(grey)
// // // //       .text(`Plan: ${sub.planId?.name || "Subscription"}`, 63, 320)
// // // //       .text(`Billing period: ${sub.billingCycle || "—"}`, 63, 341)
// // // //       .text(`Valid: ${date(sub.startDate)} to ${date(sub.expiryDate)}`, 63, 362);
// // // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to", 47, 415);
// // // //     doc.font("Helvetica").fontSize(10).fillColor(grey)
// // // //       .text(customer?.name || "Customer", 47, 434, { width: 260 })
// // // //       .text(customer?.email || "", 47, 450, { width: 260 });

// // // //     doc.roundedRect(46, 529, 503, 84, 9).fill("#F1F8F6");
// // // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Activated by Admin", 62, 543);
// // // //     doc.fillColor(grey).font("Helvetica").fontSize(9)
// // // //       .text(`Assigned by: ${sub.activatedBy?.name || "Admin"}`, 62, 563, { width: 465 });
// // // //     if (sub.activationReason)
// // // //       doc.text(`Reason: ${String(sub.activationReason).slice(0, 180)}`, 62, 581, { width: 465, height: 28, ellipsis: true });
// // // //     doc.moveTo(46, 695).lineTo(549, 695).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // // //     doc.font("Helvetica").fillColor(grey).fontSize(9)
// // // //       .text("System-generated admin activation confirmation. Not a payment receipt or GST tax invoice.", 46, 710, { width: 503 });
// // // //     doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.", 46, 760, { width: 503, align: "center" });
// // // //     doc.end();
// // // //   } catch (e) {
// // // //     console.error("Admin assignment PDF", e);
// // // //     if (!res.headersSent) res.status(500).json({ message: "Unable to generate assignment record" });
// // // //     else res.end();
// // // //   }
// // // // };





// // // const crypto=require("crypto");
// // // const AdminSettings=require("../models/AdminSettings");
// // // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// // //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// // //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// // //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // // exports.my=async(req,res)=>{
// // //  try {
// // //   const data=await summary(req.user._id);
// // //   const [invoices,adminAssignments]=await Promise.all([
// // //    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
// // //    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
// // //   ]);
// // //   res.set("Cache-Control","no-store");
// // //   res.json({status:1,data:{...data,invoices,adminAssignments}});
// // //  } catch(e) {res.status(500).json({message:e.message});}
// // // };
// // // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // // Admin listing includes inactive plans so their history remains visible.
// // // exports.adminPlans = async (req,res) => {
// // //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// // //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // // };
// // // exports.deletePlan = async (req,res) => {
// // //   try {
// // //     const plan = await Plan.findById(req.params.id);
// // //     if (!plan) return res.status(404).json({message:"Plan not found"});
// // //     const linked = await Subscription.exists({planId:plan._id});
// // //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// // //     await Plan.deleteOne({_id:plan._id});
// // //     return res.json({status:1,message:"Plan deleted"});
// // //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // // };
// // // // Manual changes are not payments and do not create paid invoices.
// // // exports.adminChangeCustomerPlan = async (req,res) => {
// // //   try {
// // //     const mongoose = require("mongoose");
// // //     const User = require("../models/user");
// // //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// // //       return res.status(400).json({message:"Invalid user or plan ID"});
// // //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// // //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// // //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// // //     if (!user) return res.status(404).json({message:"Customer not found"});
// // //     const roleName=String(user.roleId?.name||"").toLowerCase();
// // //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// // //     const plan=await Plan.findById(req.body.planId);
// // //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// // //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// // //     const now=new Date(), expires=new Date(now);
// // //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// // //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
// // //     // Keep the legacy User.planId reference aligned with the active subscription.
// // //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// // //     // Existing paid invoices and Razorpay transactions are not modified.
// // //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// // //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// // //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // // };
// // // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // // Claim a trial only once per account, independent of plan selection.
// // // exports.startTrial=async(req,res)=>{try{
// // //  const plan=await Plan.findById(req.body.planId);
// // //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// // //  const User=require("../models/user");
// // //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// // //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// // //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// // //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// // //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// // //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// // //  res.status(201).json({status:1,data:sub});
// // //  }catch(e){res.status(500).json({message:e.message});}};

// // // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // // exports.webhook=async(req,res)=>{try{
// // //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// // //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// // //  const signature=String(req.get("x-razorpay-signature")||"");
// // //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// // //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// // //  const payload=JSON.parse(req.body.toString("utf8"));
// // //  const payment=payload.payload?.payment?.entity;
// // //  if(!payment?.order_id)return res.status(200).json({ok:true});
// // //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// // //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// // //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// // //  res.json({ok:true});
// // //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // exports.invoicePdf=async(req,res)=>{try{
// // //  const PDFDocument=require("pdfkit"), fs=require("fs"), path=require("path");
// // //  const invoice=await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:"subscriptionId",populate:{path:"planId"}}).populate("userId","name email");
// // //  if(!invoice)return res.status(404).json({message:"Invoice not found"});
// // //  const isAdmin=invoice.status==="Admin Activated" || invoice.paymentMethod==="Admin Assignment";
// // //  const snap=invoice.billingSnapshot||{}, verified=!isAdmin && snap.verified===true;
// // //  const money=n=>`INR ${Number(n||0).toLocaleString("en-IN",{minimumFractionDigits:2,maximumFractionDigits:2})}`;
// // //  const date=v=>v?new Date(v).toLocaleDateString("en-IN"):'—';
// // //  const name=String(invoice.invoiceNumber||"invoice").replace(/[^a-zA-Z0-9_-]/g,"_");
// // //  const doc=new PDFDocument({size:"A4",margin:46});
// // //  const navy="#10213C",teal="#0D9488",grey="#5B6C82";
// // //  res.setHeader("Content-Type","application/pdf");res.setHeader("Content-Disposition",`attachment; filename="${name}.pdf"`);doc.pipe(res);
// // //  doc.rect(0,0,595,114).fill(navy);
// // //  const logo=path.join(__dirname,"../assets/cargomate_invoice_logo.png");
// // //  if(fs.existsSync(logo)){doc.image(logo,47,19,{fit:[106,74]});doc.save().opacity(.045).image(logo,105,250,{fit:[385,320]}).restore();}
// // //  doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate",167,37);
// // //  doc.font("Helvetica").fontSize(10).text(isAdmin?"ADMIN-ACTIVATED SUBSCRIPTION INVOICE":verified?"SUBSCRIPTION TAX INVOICE":"SUBSCRIPTION PAYMENT RECEIPT",169,67);
// // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING",46,137);
// // //  doc.moveTo(46,159).lineTo(549,159).lineWidth(2).strokeColor(teal).stroke();
// // //  const pair=(label,value,x,y)=>{doc.fillColor(grey).font("Helvetica").fontSize(9).text(label,x,y,{width:225});doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value||"—"),x,y+15,{width:225});};
// // //  pair("Invoice number",invoice.invoiceNumber,47,176);pair(isAdmin?"Activated on":"Paid on",date(invoice.paidAt||invoice.createdAt),310,176);
// // //  pair(isAdmin?"Activation type":"Payment method",isAdmin?"Manual admin activation":invoice.paymentMethod||"Razorpay",47,223);pair(isAdmin?"Plan status":"Payment status",isAdmin?"Activated by Admin":invoice.status,310,223);
// // //  doc.roundedRect(46,277,503,113,10).fill("#EFF6F8");
// // //  const sub=invoice.subscriptionId, plan=sub?.planId;
// // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription",63,295);
// // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(`Plan: ${plan?.name||"Subscription"}`,63,320);
// // //  doc.text(`Billing period: ${sub?.billingCycle||"—"}`,63,341);
// // //  doc.text(`Valid: ${date(sub?.startDate)} to ${date(sub?.expiryDate)}`,63,362);
// // //  doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to",47,415);
// // //  doc.font("Helvetica").fontSize(10).fillColor(grey).text(snap.customerName||invoice.userId?.name||"Customer",47,434,{width:260});
// // //  doc.text(snap.customerAddress||invoice.userId?.email||"",47,450,{width:260});
// // //  if(verified && snap.customerGstin)doc.text(`GSTIN: ${snap.customerGstin}`,47,478,{width:260});
// // //  if(verified){
// // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Supplier",312,415);
// // //    doc.font("Helvetica").fillColor(grey).fontSize(10).text(snap.companyName||"",312,434,{width:230});
// // //    doc.text(snap.address||"",312,450,{width:230});
// // //    doc.text(`GSTIN: ${snap.gstin||"Not provided"}`,312,482,{width:230});
// // //    if(snap.hsnSac)doc.text(`SAC/HSN: ${snap.hsnSac}`,312,502,{width:230});
// // //    doc.moveTo(46,540).lineTo(549,540).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // //    const rows=[["Taxable value",snap.taxableAmount],["CGST",snap.cgst],["SGST",snap.sgst],["IGST",snap.igst],["Amount paid",invoice.amount]];
// // //    rows.forEach(([label,value],i)=>{const y=551+i*22;doc.fillColor(i===4?navy:grey).font(i===4?"Helvetica-Bold":"Helvetica").fontSize(i===4?12:10).text(label,48,y).text(money(value),347,y,{width:201,align:"right"});});
// // //  }else if(isAdmin){
// // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Plan price",62,544);
// // //    doc.fillColor(teal).font("Helvetica-Bold").fontSize(16).text(listedPlanPrice === null ? "Price unavailable" : money(listedPlanPrice),300,542,{width:231,align:"right"});
// // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("Activated by Admin - listed plan price only; this is not proof of payment.",62,577,{width:465});
// // //  }else{
// // //    doc.roundedRect(46,529,503,70,9).fill("#F1F8F6");
// // //    doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Total payment received",62,545);
// // //    doc.fillColor(teal).fontSize(16).text(money(invoice.amount),300,542,{width:231,align:"right"});
// // //    doc.fillColor(grey).font("Helvetica").fontSize(9).text("This is a payment receipt. GST details have not been verified for this transaction.",62,577,{width:465});
// // //  }
// // //  doc.moveTo(46,695).lineTo(549,695).strokeColor("#D5E1E8").stroke();
// // //  doc.font("Helvetica").fillColor(grey).fontSize(9).text("System-generated document. No manual signature is required.",46,710,{width:500});
// // //  doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.",46,760,{width:503,align:"center"});doc.end();
// // //  }catch(e){console.error("Invoice render error",e);if(!res.headersSent)res.status(500).json({message:"Invoice generation failed"});else res.end();}};

// // // // Downloadable assignment confirmation; intentionally NOT a tax invoice or payment receipt.
// // // // Legacy assignment download endpoint: match the branded subscription invoice layout.
// // // // This is an admin activation confirmation, not proof of payment or a GST invoice.
// // // exports.adminAssignmentPdf = async (req, res) => {
// // //   try {
// // //     const mongoose = require("mongoose");
// // //     const PDFDocument = require("pdfkit");
// // //     const fs = require("fs");
// // //     const path = require("path");
// // //     if (!mongoose.isValidObjectId(req.params.id))
// // //       return res.status(400).json({ message: "Invalid assignment ID" });
// // //     const sub = await Subscription.findOne({
// // //       _id: req.params.id, userId: req.user._id, activationSource: "Admin"
// // //     }).populate("planId", "name tier planType price").populate("activatedBy", "name email");
// // //     if (!sub) return res.status(404).json({ message: "Assignment record not found" });
// // //     const User = require("../models/user");
// // //     const customer = await User.findById(req.user._id).select("name email").lean();
// // //     const date = value => value ? new Date(value).toLocaleDateString("en-IN") : "—";
// // //     const doc = new PDFDocument({ size: "A4", margin: 46 });
// // //     const navy = "#10213C", teal = "#0D9488", grey = "#5B6C82";
// // //     res.setHeader("Content-Type", "application/pdf");
// // //     res.setHeader("Content-Disposition", `attachment; filename="ASD-Admin-Assignment-${sub._id}.pdf"`);
// // //     doc.pipe(res);

// // //     // Same branded header and watermark as paid subscription receipts.
// // //     doc.rect(0, 0, 595, 114).fill(navy);
// // //     const logo = path.join(__dirname, "../assets/cargomate_invoice_logo.png");
// // //     if (fs.existsSync(logo)) {
// // //       doc.image(logo, 47, 19, { fit: [106, 74] });
// // //       doc.save().opacity(0.045).image(logo, 105, 250, { fit: [385, 320] }).restore();
// // //     }
// // //     doc.fillColor("white").font("Helvetica-Bold").fontSize(21).text("ASD CargoMate", 167, 37);
// // //     doc.font("Helvetica").fontSize(10).text("ADMIN-ACTIVATED SUBSCRIPTION INVOICE", 169, 67);
// // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("INVOICE & BILLING", 46, 137);
// // //     doc.moveTo(46, 159).lineTo(549, 159).lineWidth(2).strokeColor(teal).stroke();
// // //     const pair = (label, value, x, y) => {
// // //       doc.fillColor(grey).font("Helvetica").fontSize(9).text(label, x, y, { width: 225 });
// // //       doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text(String(value || "—"), x, y + 15, { width: 225 });
// // //     };
// // //     pair("Invoice reference", `ASD-ADMIN-${String(sub._id).slice(-12).toUpperCase()}`, 47, 176);
// // //     pair("Activated on", date(sub.startDate), 310, 176);
// // //     pair("Activation type", "Manual admin activation", 47, 223);
// // //     pair("Activation status", "Activated by Admin", 310, 223);

// // //     doc.roundedRect(46, 277, 503, 113, 10).fill("#EFF6F8");
// // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(13).text("Subscription", 63, 295);
// // //     doc.font("Helvetica").fontSize(10).fillColor(grey)
// // //       .text(`Plan: ${sub.planId?.name || "Subscription"}`, 63, 320)
// // //       .text(`Billing period: ${sub.billingCycle || "—"}`, 63, 341)
// // //       .text(`Valid: ${date(sub.startDate)} to ${date(sub.expiryDate)}`, 63, 362);
// // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(11).text("Billed to", 47, 415);
// // //     doc.font("Helvetica").fontSize(10).fillColor(grey)
// // //       .text(customer?.name || "Customer", 47, 434, { width: 260 })
// // //       .text(customer?.email || "", 47, 450, { width: 260 });

// // //     // Use the plan's catalog price, NOT subscription.amount (admin assignment records may store 0).
// // //     const listedPrice = sub.planId?.price == null || !Number.isFinite(Number(sub.planId.price))
// // //       ? null : Number(sub.planId.price);
// // //     doc.roundedRect(46, 529, 503, 101, 9).fill("#F1F8F6");
// // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(12).text("Plan price", 62, 543);
// // //     doc.fillColor(teal).font("Helvetica-Bold").fontSize(16)
// // //       .text(listedPrice === null ? "Price unavailable" : `INR ${listedPrice.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 295, 540, { width: 236, align: "right" });
// // //     doc.fillColor(navy).font("Helvetica-Bold").fontSize(10).text("Activated by Admin", 62, 568);
// // //     doc.fillColor(grey).font("Helvetica").fontSize(9)
// // //       .text(`Assigned by: ${sub.activatedBy?.name || "Admin"}`, 62, 585, { width: 465 });
// // //     if (sub.activationReason)
// // //       doc.text(`Reason: ${String(sub.activationReason).slice(0, 160)}`, 62, 601, { width: 465, height: 23, ellipsis: true });
// // //     doc.moveTo(46, 695).lineTo(549, 695).strokeColor("#D5E1E8").lineWidth(1).stroke();
// // //     doc.font("Helvetica").fillColor(grey).fontSize(9)
// // //       .text("System-generated admin activation confirmation. Not a payment receipt or GST tax invoice.", 46, 710, { width: 503 });
// // //     doc.fillColor(teal).fontSize(9).text("ASD CargoMate  |  Ask. Plan. Ship.", 46, 760, { width: 503, align: "center" });
// // //     doc.end();
// // //   } catch (e) {
// // //     console.error("Admin assignment PDF", e);
// // //     if (!res.headersSent) res.status(500).json({ message: "Unable to generate assignment record" });
// // //     else res.end();
// // //   }
// // // };






// // const crypto=require("crypto");
// // const AdminSettings=require("../models/AdminSettings");
// // const {decrypt,encrypt}=require("../utils/settingSecrets");
// // const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// // const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// // const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
// //  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
// //  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
// //  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// // const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// // exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// // exports.my=async(req,res)=>{
// //  try {
// //   const data=await summary(req.user._id);
// //   const [invoices,adminAssignments]=await Promise.all([
// //    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
// //    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
// //   ]);
// //   res.set("Cache-Control","no-store");
// //   res.json({status:1,data:{...data,invoices,adminAssignments}});
// //  } catch(e) {res.status(500).json({message:e.message});}
// // };
// // exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// // exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// // exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// // exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // // Admin listing includes inactive plans so their history remains visible.
// // exports.adminPlans = async (req,res) => {
// //   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
// //   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// // };
// // exports.deletePlan = async (req,res) => {
// //   try {
// //     const plan = await Plan.findById(req.params.id);
// //     if (!plan) return res.status(404).json({message:"Plan not found"});
// //     const linked = await Subscription.exists({planId:plan._id});
// //     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
// //     await Plan.deleteOne({_id:plan._id});
// //     return res.json({status:1,message:"Plan deleted"});
// //   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// // };
// // // Manual changes are not payments and do not create paid invoices.
// // exports.adminChangeCustomerPlan = async (req,res) => {
// //   try {
// //     const mongoose = require("mongoose");
// //     const User = require("../models/user");
// //     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
// //       return res.status(400).json({message:"Invalid user or plan ID"});
// //     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
// //       return res.status(400).json({message:"A reason of 5+ characters is required"});
// //     const user=await User.findById(req.params.userId).populate("roleId", "name");
// //     if (!user) return res.status(404).json({message:"Customer not found"});
// //     const roleName=String(user.roleId?.name||"").toLowerCase();
// //     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
// //     const plan=await Plan.findById(req.body.planId);
// //     if (!plan || plan.status!=="active" || plan.audience!==roleName)
// //       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
// //     const now=new Date(), expires=new Date(now);
// //     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
// //     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
// //     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
// //     // Keep the legacy User.planId reference aligned with the active subscription.
// //     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
// //     // Existing paid invoices and Razorpay transactions are not modified.
// //     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
// //     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
// //   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// // };
// // exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // // Claim a trial only once per account, independent of plan selection.
// // exports.startTrial=async(req,res)=>{try{
// //  const plan=await Plan.findById(req.body.planId);
// //  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
// //  const User=require("../models/user");
// //  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
// //  if(!claimed)return res.status(409).json({message:"Free trial already used"});
// //  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
// //  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
// //  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
// //  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
// //  res.status(201).json({status:1,data:sub});
// //  }catch(e){res.status(500).json({message:e.message});}};

// // // Razorpay's webhook body must be read as RAW bytes before express.json().
// // exports.webhook=async(req,res)=>{try{
// //  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
// //  if(!secret)return res.status(503).json({message:"Webhook not configured"});
// //  const signature=String(req.get("x-razorpay-signature")||"");
// //  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
// //  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
// //  const payload=JSON.parse(req.body.toString("utf8"));
// //  const payment=payload.payload?.payment?.entity;
// //  if(!payment?.order_id)return res.status(200).json({ok:true});
// //  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
// //  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
// //  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
// //  res.json({ok:true});
// //  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // // Shared branded invoice PDF renderer. Existing subscription/payment/webhook logic preserved.
// // const renderSubscriptionInvoice = async (req, res, assignmentOnly = false) => {
// //   try {
// //     const PDFDocument = require('pdfkit');
// //     const fs = require('fs');
// //     const path = require('path');
// //     const User = require('../models/user');
// //     let invoice, sub, customer;
// //     if (assignmentOnly) {
// //       sub = await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:'Admin'}).populate('planId').populate('activatedBy','name email');
// //       if (!sub) return res.status(404).json({message:'Admin assignment not found'});
// //       customer = await User.findById(req.user._id).lean();
// //     } else {
// //       invoice = await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:'subscriptionId',populate:{path:'planId'}}).populate('userId','name email companyName address');
// //       if (!invoice) return res.status(404).json({message:'Invoice not found'});
// //       sub = invoice.subscriptionId;
// //       customer = invoice.userId;
// //     }
// //     const plan = sub?.planId;
// //     const isAdmin = assignmentOnly || invoice?.status === 'Admin Activated' || invoice?.paymentMethod === 'Admin Assignment';
// //     const snap = invoice?.billingSnapshot || {};
// //     const money = n => Number.isFinite(Number(n)) ? 'INR '+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}) : 'Not available';
// //     const dt = d => d ? new Date(d).toLocaleDateString('en-IN') : '—';
// //     const navy='#10213C', teal='#078887', pale='#E5F7F6', grey='#5B6C82', border='#BBDCDD';
// //     const doc=new PDFDocument({size:'A4',margin:32,autoFirstPage:true});
// //     const fileName = String(invoice?.invoiceNumber || `ASD-ADMIN-${String(sub._id).slice(-12).toUpperCase()}`).replace(/[^a-zA-Z0-9_-]/g,'_');
// //     res.setHeader('Content-Type','application/pdf');
// //     res.setHeader('Content-Disposition',`attachment; filename="${fileName}.pdf"`);
// //     doc.pipe(res);
// //     const text=(str,x,y,w=240,size=9,color=navy,bold=false,opts={})=>doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size).fillColor(color).text(String(str??'—'),x,y,{width:w,...opts});
// //     const rect=(x,y,w,h,fill=pale,stroke=border)=>{doc.roundedRect(x,y,w,h,4).fillAndStroke(fill,stroke);};
// //     const title=(label,x,y,w)=>{doc.rect(x,y,w,24).fill(pale);text(label,x+10,y+7,w-20,10,navy,true);};
// //     const line=(label,value,x,y,w=235)=>{text(label,x,y,105,8,grey);text(value,x+108,y,w-112,9,navy,true);};
// //     const full=531, left=32, right=304, col=259;
// //     const logo=path.join(__dirname,'../assets/cargomate_invoice_logo.png');
// //     if(fs.existsSync(logo))doc.image(logo,35,22,{fit:[105,80]});
// //     text('ASD CargoMate',143,31,235,21,navy,true);
// //     text('Ask. Plan. Ship.',145,58,180,11,navy,true);
// //     text('SUBSCRIPTION INVOICE',342,35,218,16,navy,true,{align:'right'});
// //     text(isAdmin?'ACTIVATED BY ADMIN':'SUBSCRIPTION PAYMENT',342,57,218,9,teal,true,{align:'right'});
// //     text('ASD LOGISTICS PVT LTD',34,102,270,11,navy,true);
// //     text('VENKATA SAI NILAYAM, H N.21-59/10, GR & 1ST FLOOR',34,119,310,8,grey);
// //     text('HUDA COLONY, STREET NO.5, R.B. NAGAR, SHAMSHABAD',34,131,325,8,grey);
// //     text('HYDERABAD - 501218',34,143,260,8,grey);
// //     text('Invoice No.: '+(invoice?.invoiceNumber||fileName),335,104,225,9,navy,true,{align:'right'});
// //     text('Invoice Date: '+dt(invoice?.createdAt||sub?.createdAt),335,121,225,9,grey,false,{align:'right'});
// //     text('Currency: INR',335,138,225,9,grey,false,{align:'right'});
// //     rect(left,168,col,116,'#FFFFFF');rect(right,168,col,116,'#FFFFFF');title('BILL TO',left,168,col);title('SUBSCRIPTION DETAILS',right,168,col);
// //     text(customer?.name||snap.customerName||'Customer',left+10,200,col-20,10,navy,true);
// //     text(customer?.email||'',left+10,217,col-20,9,grey);
// //     text(customer?.companyName||'',left+10,233,col-20,9,grey);
// //     text(String(customer?.address||snap.customerAddress||'').slice(0,130),left+10,248,col-20,8,grey);
// //     line('Plan',plan?.name||'Subscription',right+9,196,col-15);
// //     line('Panel',plan?.audience==='b2b'?'B2B Vendor':'User',right+9,212,col-15);
// //     line('Billing cycle',sub?.billingCycle||plan?.planType||'—',right+9,228,col-15);
// //     line('Valid from',dt(sub?.startDate),right+9,244,col-15);
// //     line('Valid until',dt(sub?.expiryDate),right+9,260,col-15);
// //     // Item table: actual catalog price, never treat an admin assignment as a paid transaction.
// //     doc.rect(left,300,full,27).fill(teal);
// //     [['DESCRIPTION',left+10,300],['QTY',348,50],['UNIT PRICE (INR)',395,90],['AMOUNT (INR)',487,72]].forEach(([v,x,w])=>text(v,x,309,w,8,'#FFFFFF',true));
// //     rect(left,327,full,44,'#FFFFFF');
// //     const price=Number(plan?.price);
// //     const planPrice=Number.isFinite(price)?price:null;
// //     text(`${plan?.name||'Subscription'} Plan - ${plan?.audience==='b2b'?'B2B Vendor':'User'} Panel`,left+10,337,290,10,navy,true);
// //     text(`${sub?.billingCycle||'Monthly'} subscription`,left+10,353,280,8,grey);
// //     text('1',353,343,40,9,navy,true);
// //     text(planPrice===null?'N/A':money(planPrice),396,343,90,9,navy,true);
// //     text(planPrice===null?'N/A':money(planPrice),485,343,76,9,navy,true,{align:'right'});
// //     // Show limits only if stored on the assigned plan. No invented quota values.
// //     title('INCLUDED PLAN LIMITS',left,389,full);
// //     const limits = plan?.featureLimits;
// //     const limitRows = limits instanceof Map ? [...limits.entries()] : (limits && typeof limits==='object' ? Object.entries(limits) : []);
// //     const safeLimits = limitRows.filter(([,v])=>v!==null&&v!==undefined).slice(0,7);
// //     if(safeLimits.length){safeLimits.forEach(([k,v],i)=>{const y=419+i*19;if(i%2===0)doc.rect(left,y,full,19).fill('#F5FAFA');text(String(k).replace(/([A-Z])/g,' $1'),left+12,y+5,370,8,navy);text(String(v),450,y+5,100,8,navy,true,{align:'right'});});}
// //     else text('Included features and limits are determined by the selected plan.',left+10,422,full-20,9,grey);
// //     const summaryY=Math.max(451,425+safeLimits.length*19);
// //     rect(left,summaryY,col,103,'#FFFFFF');rect(right,summaryY,col,103,'#FFFFFF');
// //     title(isAdmin?'ACTIVATION DETAILS':'PAYMENT DETAILS',left,summaryY,col);
// //     title('INVOICE SUMMARY',right,summaryY,col);
// //     if(isAdmin){
// //       line('Status','Activated by Admin',left+9,summaryY+34,col-15);
// //       line('Assigned by',sub?.activatedBy?.name||'Admin',left+9,summaryY+52,col-15);
// //       text(`Reason: ${String(sub?.activationReason||'Manual plan activation').slice(0,100)}`,left+9,summaryY+72,col-18,8,grey);
// //     } else {
// //       line('Payment method',invoice?.paymentMethod||'—',left+9,summaryY+34,col-15);
// //       line('Payment date',dt(invoice?.paidAt),left+9,summaryY+52,col-15);
// //       line('Status',invoice?.status||'—',left+9,summaryY+70,col-15);
// //     }
// //     if(!isAdmin && snap.verified===true){
// //       line('Taxable value',money(snap.taxableAmount),right+9,summaryY+29,col-15);
// //       line('CGST',money(snap.cgst),right+9,summaryY+45,col-15);
// //       line('SGST / IGST',`${money(snap.sgst)} / ${money(snap.igst)}`,right+9,summaryY+61,col-15);
// //       line('Total paid',money(invoice?.amount),right+9,summaryY+79,col-15);
// //     } else {
// //       line('Plan price',planPrice===null?'N/A':money(planPrice),right+9,summaryY+35,col-15);
// //       line(isAdmin?'Activation status':'Amount paid',isAdmin?'Admin Activated':money(invoice?.amount),right+9,summaryY+56,col-15);
// //     }
// //     title('SUBSCRIPTION NOTES',left,summaryY+119,full);
// //     text(isAdmin?'This document records an administrator-assigned subscription. The plan price is shown for reference only. This document is not proof of payment or a GST tax invoice.':'This is a subscription payment record. Tax amounts are not represented unless verified in billing records.',left+10,summaryY+152,full-20,9,grey);
// //     const footerY=760;
// //     doc.moveTo(left,footerY).lineTo(563,footerY).strokeColor(border).stroke();
// //     text('Thank you for choosing ASD CargoMate.',left,footerY+10,full,10,navy,true,{align:'center'});
// //     text('System-generated document • No manual signature required',left,footerY+26,full,8,grey,false,{align:'center'});
// //     doc.end();
// //   } catch(e) {
// //     console.error('Subscription invoice PDF error',e);
// //     if(!res.headersSent)res.status(500).json({message:'Unable to generate invoice PDF'});else res.end();
// //   }
// // };
// // exports.invoicePdf=(req,res)=>renderSubscriptionInvoice(req,res,false);
// // exports.adminAssignmentPdf=(req,res)=>renderSubscriptionInvoice(req,res,true);






// const crypto=require("crypto");
// const AdminSettings=require("../models/AdminSettings");
// const {decrypt,encrypt}=require("../utils/settingSecrets");
// const Plan=require("../models/Plan");const Subscription=require("../models/Subscription");const Payment=require("../models/SubscriptionPayment");const Invoice=require("../models/Invoice");const Notification=require("../models/Notification");const {summary,defaults}=require("../services/subscriptionFeatures");
// const audienceFor=req=>req.user.roleName==="b2b"?"b2b":"user";
// const credentials=async()=>{const settings=await AdminSettings.findOne({singleton:"ADMIN_SETTINGS"});const configured=settings?.paymentGateway?.razorpay;
//  if(configured?.enabled){const key=configured.key,secret=decrypt(configured.secret);if(key&&secret)return {key,secret};}
//  const key=process.env.RAZORPAY_KEY_ID,secret=process.env.RAZORPAY_KEY_SECRET;
//  if(key&&secret)return {key,secret};const error=Error("Razorpay credentials are missing; configure Admin Settings or backend environment");error.status=503;throw error;};
// const api=async(path,opts={},override)=>{const {key,secret}=override||await credentials();const r=await fetch(`https://api.razorpay.com/v1/${path}`,{...opts,headers:{Authorization:"Basic "+Buffer.from(key+":"+secret).toString("base64"),"Content-Type":"application/json",...(opts.headers||{})}});const data=await r.json();if(!r.ok)throw Error(data.error?.description||"Razorpay rejected request");return data;};
// exports.list=async(req,res)=>{try{const audience=req.query.audience;const q={status:"active"};if(["user","b2b"].includes(audience))q.audience=audience;const plans=await Plan.find(q).sort({price:1});res.json({status:1,data:plans});}catch(e){res.status(500).json({message:e.message});}};
// exports.my=async(req,res)=>{
//  try {
//   const data=await summary(req.user._id);
//   const [invoices,adminAssignments]=await Promise.all([
//    Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
//    Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
//   ]);
//   res.set("Cache-Control","no-store");
//   res.json({status:1,data:{...data,invoices,adminAssignments}});
//  } catch(e) {res.status(500).json({message:e.message});}
// };
// exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
// exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await Notification.create({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",actionLink:"/user-dashboard",urgency:"Information"});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
// exports.create=async(req,res)=>{try{const {name,audience,tier,price,planType,featureLimits,features}=req.body;if(!name||!["user","b2b"].includes(audience)||!["Basic","Premium","Platinum"].includes(tier)||!Number.isFinite(Number(price))||Number(price)<0||!["monthly","yearly"].includes(planType))return res.status(400).json({message:"Invalid plan"});const clean=Object.fromEntries(Object.entries(featureLimits||defaults(audience,tier)).filter(([k,v])=>/^[a-zA-Z]+$/.test(k)&&Number.isInteger(Number(v))&&Number(v)>=0).map(([k,v])=>[k,Number(v)]));const doc=await Plan.create({name,audience,tier,price:Number(price),planType,featureLimits:clean,features:Array.isArray(features)?features.filter(x=>typeof x==="string"):[],status:"active"});res.status(201).json({status:1,data:doc});}catch(e){res.status(500).json({message:e.message});}};
// exports.update=async(req,res)=>{try{const allowed=["name","price","featureLimits","features","status","trialDays","description","planType"];const updates=Object.fromEntries(allowed.filter(k=>Object.hasOwn(req.body,k)).map(k=>[k,req.body[k]]));const doc=await Plan.findByIdAndUpdate(req.params.id,{$set:updates},{new:true,runValidators:true});if(!doc)return res.status(404).json({message:"Not found"});res.json({status:1,data:doc});}catch(e){res.status(400).json({message:e.message});}};
// // Admin listing includes inactive plans so their history remains visible.
// exports.adminPlans = async (req,res) => {
//   try { const plans = await Plan.find({}).sort({createdAt:-1}); return res.json({status:1,data:plans}); }
//   catch (e) { return res.status(500).json({message:"Could not list plans"}); }
// };
// exports.deletePlan = async (req,res) => {
//   try {
//     const plan = await Plan.findById(req.params.id);
//     if (!plan) return res.status(404).json({message:"Plan not found"});
//     const linked = await Subscription.exists({planId:plan._id});
//     if (linked) return res.status(409).json({message:"Plan is linked to subscription history. Deactivate instead of deleting."});
//     await Plan.deleteOne({_id:plan._id});
//     return res.json({status:1,message:"Plan deleted"});
//   } catch(e) { return res.status(400).json({message:"Unable to delete plan"}); }
// };
// // Manual changes are not payments and do not create paid invoices.
// exports.adminChangeCustomerPlan = async (req,res) => {
//   try {
//     const mongoose = require("mongoose");
//     const User = require("../models/user");
//     if (!mongoose.isValidObjectId(req.params.userId) || !mongoose.isValidObjectId(req.body?.planId))
//       return res.status(400).json({message:"Invalid user or plan ID"});
//     if (typeof req.body?.reason !== "string" || req.body.reason.trim().length < 5)
//       return res.status(400).json({message:"A reason of 5+ characters is required"});
//     const user=await User.findById(req.params.userId).populate("roleId", "name");
//     if (!user) return res.status(404).json({message:"Customer not found"});
//     const roleName=String(user.roleId?.name||"").toLowerCase();
//     if (!(["user","b2b"].includes(roleName)))return res.status(400).json({message:"Only User and B2B customer plans can be changed"});
//     const plan=await Plan.findById(req.body.planId);
//     if (!plan || plan.status!=="active" || plan.audience!==roleName)
//       return res.status(400).json({message:"Selected plan must be active and match customer audience"});
//     const now=new Date(), expires=new Date(now);
//     expires.setUTCMonth(expires.getUTCMonth()+(plan.planType==="yearly"?12:1));
//     await Subscription.updateMany({userId:user._id,status:"Active"},{$set:{status:"Cancelled"}});
//     const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
//     // Keep the legacy User.planId reference aligned with the active subscription.
//     await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
//     // Existing paid invoices and Razorpay transactions are not modified.
//     console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
//     return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
//   } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
// };
// exports.expiryAlerts=async()=>{const now=new Date(),until=new Date(now.getTime()+15*86400000);const subs=await Subscription.find({status:"Active",expiryDate:{$gte:now,$lte:until}}).populate("planId");for(const s of subs){const day=now.toISOString().slice(0,10);const exists=await Notification.exists({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`});if(!exists)await Notification.create({userId:s.userId,relatedId:s._id,title:`Subscription expiry reminder ${day}`,message:`Your ${s.planId?.name||"plan"} expires on ${s.expiryDate.toLocaleDateString("en-IN")}. Renew or upgrade.`,category:"System",type:"System",urgency:"Warning",actionText:"Upgrade plan",actionLink:"/user-dashboard"});}};

// // Claim a trial only once per account, independent of plan selection.
// exports.startTrial=async(req,res)=>{try{
//  const plan=await Plan.findById(req.body.planId);
//  if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||plan.trialDays<=0)return res.status(400).json({message:"Trial unavailable for this plan"});
//  const User=require("../models/user");
//  const claimed=await User.findOneAndUpdate({_id:req.user._id,trialClaimedAt:{$exists:false}},{$set:{trialClaimedAt:new Date()}},{new:true});
//  if(!claimed)return res.status(409).json({message:"Free trial already used"});
//  const now=new Date(),expiry=new Date(now.getTime()+Math.min(plan.trialDays,7)*86400000);
//  await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});
//  const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,billingCycle:"Monthly",startDate:now,expiryDate:expiry,status:"Active",amount:0,isTrial:true});
//  await Notification.create({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
//  res.status(201).json({status:1,data:sub});
//  }catch(e){res.status(500).json({message:e.message});}};

// // Razorpay's webhook body must be read as RAW bytes before express.json().
// exports.webhook=async(req,res)=>{try{
//  const secret=process.env.RAZORPAY_WEBHOOK_SECRET;
//  if(!secret)return res.status(503).json({message:"Webhook not configured"});
//  const signature=String(req.get("x-razorpay-signature")||"");
//  const expected=crypto.createHmac("sha256",secret).update(req.body).digest("hex");
//  if(signature.length!==expected.length||!crypto.timingSafeEqual(Buffer.from(signature),Buffer.from(expected)))return res.status(401).end();
//  const payload=JSON.parse(req.body.toString("utf8"));
//  const payment=payload.payload?.payment?.entity;
//  if(!payment?.order_id)return res.status(200).json({ok:true});
//  if(payload.event==="payment.failed")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{status:"Failed",paymentId:payment.id}});
//  // Captures are reconciled through verified order/payment records. Do not activate on webhook alone.
//  if(payload.event==="payment.captured")await Payment.updateOne({orderId:payment.order_id,status:"Created"},{$set:{capturedAt:new Date(),paymentId:payment.id}});
//  res.json({ok:true});
//  }catch(e){console.error("Razorpay webhook error:",e.message);res.status(500).json({message:"Webhook processing failed"});}};

// // Shared branded invoice PDF renderer. Existing subscription/payment/webhook logic preserved.
// const renderSubscriptionInvoice = async (req, res, assignmentOnly = false) => {
//   try {
//     const PDFDocument = require('pdfkit');
//     const fs = require('fs');
//     const path = require('path');
//     const User = require('../models/user');
//     let invoice, sub, customer;
//     if (assignmentOnly) {
//       sub = await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:'Admin'}).populate('planId').populate('activatedBy','name email');
//       if (!sub) return res.status(404).json({message:'Admin assignment not found'});
//       customer = await User.findById(req.user._id).lean();
//     } else {
//       invoice = await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:'subscriptionId',populate:{path:'planId'}}).populate('userId','name email companyName address');
//       if (!invoice) return res.status(404).json({message:'Invoice not found'});
//       sub = invoice.subscriptionId;
//       customer = invoice.userId;
//     }
//     const plan = sub?.planId;
//     const isAdmin = assignmentOnly || invoice?.status === 'Admin Activated' || invoice?.paymentMethod === 'Admin Assignment';
//     const snap = invoice?.billingSnapshot || {};
//     const money = n => Number.isFinite(Number(n)) ? 'INR '+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}) : 'Not available';
//     const dt = d => d ? new Date(d).toLocaleDateString('en-IN') : '—';
//     const navy='#10213C', teal='#078887', pale='#E5F7F6', grey='#5B6C82', border='#BBDCDD';
//     const doc=new PDFDocument({size:'A4',margin:32,autoFirstPage:true});
//     const fileName = String(invoice?.invoiceNumber || `ASD-ADMIN-${String(sub._id).slice(-12).toUpperCase()}`).replace(/[^a-zA-Z0-9_-]/g,'_');
//     res.setHeader('Content-Type','application/pdf');
//     res.setHeader('Content-Disposition',`attachment; filename="${fileName}.pdf"`);
//     doc.pipe(res);
//     const text=(str,x,y,w=240,size=9,color=navy,bold=false,opts={})=>doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size).fillColor(color).text(String(str??'—'),x,y,{width:w,...opts});
//     const rect=(x,y,w,h,fill=pale,stroke=border)=>{doc.roundedRect(x,y,w,h,4).fillAndStroke(fill,stroke);};
//     const title=(label,x,y,w)=>{doc.rect(x,y,w,24).fill(pale);text(label,x+10,y+7,w-20,10,navy,true);};
//     const line=(label,value,x,y,w=235)=>{text(label,x,y,105,8,grey);text(value,x+108,y,w-112,9,navy,true);};
//     const full=531, left=32, right=304, col=259;
//     const logo=path.join(__dirname,'../assets/cargomate_invoice_logo.png');
//     if(fs.existsSync(logo))doc.image(logo,35,16,{fit:[235,90]});
//     text('SUBSCRIPTION INVOICE',342,35,218,16,navy,true,{align:'right'});
//     text(isAdmin?'ACTIVATED BY ADMIN':'SUBSCRIPTION PAYMENT',342,57,218,9,teal,true,{align:'right'});
//     text('ASD LOGISTICS PVT LTD',34,102,270,11,navy,true);
//     text('VENKATA SAI NILAYAM, H N.21-59/10, GR & 1ST FLOOR',34,119,310,8,grey);
//     text('HUDA COLONY, STREET NO.5, R.B. NAGAR, SHAMSHABAD',34,131,325,8,grey);
//     text('HYDERABAD - 501218',34,143,260,8,grey);
//     text('Invoice No.: '+(invoice?.invoiceNumber||fileName),335,104,225,9,navy,true,{align:'right'});
//     text('Invoice Date: '+dt(invoice?.createdAt||sub?.createdAt),335,121,225,9,grey,false,{align:'right'});
//     text('Currency: INR',335,138,225,9,grey,false,{align:'right'});
//     rect(left,168,col,116,'#FFFFFF');rect(right,168,col,116,'#FFFFFF');title('BILL TO',left,168,col);title('SUBSCRIPTION DETAILS',right,168,col);
//     text(customer?.name||snap.customerName||'Customer',left+10,200,col-20,10,navy,true);
//     text(customer?.email||'',left+10,217,col-20,9,grey);
//     text(customer?.companyName||'',left+10,233,col-20,9,grey);
//     text(String(customer?.address||snap.customerAddress||'').slice(0,130),left+10,248,col-20,8,grey);
//     line('Plan',plan?.name||'Subscription',right+9,196,col-15);
//     line('Panel',plan?.audience==='b2b'?'B2B Vendor':'User',right+9,212,col-15);
//     line('Billing cycle',sub?.billingCycle||plan?.planType||'—',right+9,228,col-15);
//     line('Valid from',dt(sub?.startDate),right+9,244,col-15);
//     line('Valid until',dt(sub?.expiryDate),right+9,260,col-15);
//     // Item table: actual catalog price, never treat an admin assignment as a paid transaction.
//     doc.rect(left,300,full,27).fill(teal);
//     [['DESCRIPTION',left+10,300],['QTY',348,50],['UNIT PRICE (INR)',395,90],['AMOUNT (INR)',487,72]].forEach(([v,x,w])=>text(v,x,309,w,8,'#FFFFFF',true));
//     rect(left,327,full,44,'#FFFFFF');
//     const price=Number(plan?.price);
//     const planPrice=Number.isFinite(price)?price:null;
//     text(`${plan?.name||'Subscription'} Plan - ${plan?.audience==='b2b'?'B2B Vendor':'User'} Panel`,left+10,337,290,10,navy,true);
//     text(`${sub?.billingCycle||'Monthly'} subscription`,left+10,353,280,8,grey);
//     text('1',353,343,40,9,navy,true);
//     text(planPrice===null?'N/A':money(planPrice),396,343,90,9,navy,true);
//     text(planPrice===null?'N/A':money(planPrice),485,343,76,9,navy,true,{align:'right'});
//     // Show limits only if stored on the assigned plan. No invented quota values.
//     title('INCLUDED PLAN LIMITS',left,389,full);
//     const limits = plan?.featureLimits;
//     const limitRows = limits instanceof Map ? [...limits.entries()] : (limits && typeof limits==='object' ? Object.entries(limits) : []);
//     const safeLimits = limitRows.filter(([,v])=>v!==null&&v!==undefined).slice(0,7);
//     if(safeLimits.length){safeLimits.forEach(([k,v],i)=>{const y=419+i*19;if(i%2===0)doc.rect(left,y,full,19).fill('#F5FAFA');text(String(k).replace(/([A-Z])/g,' $1'),left+12,y+5,370,8,navy);text(String(v),450,y+5,100,8,navy,true,{align:'right'});});}
//     else text('Included features and limits are determined by the selected plan.',left+10,422,full-20,9,grey);
//     const summaryY=Math.max(451,425+safeLimits.length*19);
//     rect(left,summaryY,col,103,'#FFFFFF');rect(right,summaryY,col,103,'#FFFFFF');
//     title(isAdmin?'ACTIVATION DETAILS':'PAYMENT DETAILS',left,summaryY,col);
//     title('INVOICE SUMMARY',right,summaryY,col);
//     if(isAdmin){
//       line('Status','Activated by Admin',left+9,summaryY+34,col-15);
//       line('Assigned by',sub?.activatedBy?.name||'Admin',left+9,summaryY+52,col-15);
//       text(`Reason: ${String(sub?.activationReason||'Manual plan activation').slice(0,100)}`,left+9,summaryY+72,col-18,8,grey);
//     } else {
//       line('Payment method',invoice?.paymentMethod||'—',left+9,summaryY+34,col-15);
//       line('Payment date',dt(invoice?.paidAt),left+9,summaryY+52,col-15);
//       line('Status',invoice?.status||'—',left+9,summaryY+70,col-15);
//     }
//     if(!isAdmin && snap.verified===true){
//       line('Taxable value',money(snap.taxableAmount),right+9,summaryY+29,col-15);
//       line('CGST',money(snap.cgst),right+9,summaryY+45,col-15);
//       line('SGST / IGST',`${money(snap.sgst)} / ${money(snap.igst)}`,right+9,summaryY+61,col-15);
//       line('Total paid',money(invoice?.amount),right+9,summaryY+79,col-15);
//     } else {
//       line('Plan price',planPrice===null?'N/A':money(planPrice),right+9,summaryY+35,col-15);
//       line(isAdmin?'Activation status':'Amount paid',isAdmin?'Admin Activated':money(invoice?.amount),right+9,summaryY+56,col-15);
//     }
//     title('SUBSCRIPTION NOTES',left,summaryY+119,full);
//     text(isAdmin?'This document records an administrator-assigned subscription. The plan price is shown for reference only. This document is not proof of payment or a GST tax invoice.':'This is a subscription payment record. Tax amounts are not represented unless verified in billing records.',left+10,summaryY+152,full-20,9,grey);
//     const footerY=760;
//     doc.moveTo(left,footerY).lineTo(563,footerY).strokeColor(border).stroke();
//     text('Thank you for choosing ASD CargoMate.',left,footerY+10,full,10,navy,true,{align:'center'});
//     text('System-generated document • No manual signature required',left,footerY+26,full,8,grey,false,{align:'center'});
//     doc.end();
//   } catch(e) {
//     console.error('Subscription invoice PDF error',e);
//     if(!res.headersSent)res.status(500).json({message:'Unable to generate invoice PDF'});else res.end();
//   }
// };
// exports.invoicePdf=(req,res)=>renderSubscriptionInvoice(req,res,false);
// exports.adminAssignmentPdf=(req,res)=>renderSubscriptionInvoice(req,res,true);





const {notifyAction: subscriptionNotify}=require("../services/actionNotification");
const {recordAdminActivity: subscriptionAdmin}=require("../services/adminActivity");

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
exports.my=async(req,res)=>{
 try {
  const data=await summary(req.user._id);
  const [invoices,adminAssignments]=await Promise.all([
   Invoice.find({userId:req.user._id}).sort({createdAt:-1}).limit(30),
   Subscription.find({userId:req.user._id,activationSource:"Admin"}).sort({createdAt:-1}).limit(30).populate("planId","name tier planType").populate("activatedBy","name email")
  ]);
  res.set("Cache-Control","no-store");
  res.json({status:1,data:{...data,invoices,adminAssignments}});
 } catch(e) {res.status(500).json({message:e.message});}
};
exports.order=async(req,res)=>{try{const plan=await Plan.findById(req.body.planId);if(!plan||plan.status!=="active"||plan.audience!==audienceFor(req)||!Number.isFinite(plan.price)||plan.price<=0)return res.status(400).json({message:"Invalid plan or price"});const amountPaise=Math.round(plan.price*100);const credential=await credentials();const order=await api("orders",{method:"POST",body:JSON.stringify({amount:amountPaise,currency:"INR",receipt:crypto.randomUUID().slice(0,35),notes:{userId:String(req.user._id),planId:String(plan._id)}})},credential);await Payment.create({userId:req.user._id,planId:plan._id,orderId:order.id,amountPaise,gatewayKeyId:credential.key,gatewaySecretEncrypted:encrypt(credential.secret)});res.json({status:1,data:{orderId:order.id,amount:amountPaise,currency:"INR",keyId:credential.key,planName:plan.name}});}catch(e){res.status(e.status||502).json({message:e.message});}};
exports.verify=async(req,res)=>{try{const {razorpay_order_id:orderId,razorpay_payment_id:paymentId,razorpay_signature:signature}=req.body;if(!orderId||!paymentId||!signature)return res.status(400).json({message:"Missing payment parameters"});const record=await Payment.findOne({orderId,userId:req.user._id}).select("+gatewaySecretEncrypted");if(!record)return res.status(404).json({message:"Order not found"});const orderCredential=record.gatewaySecretEncrypted ? {key:record.gatewayKeyId,secret:decrypt(record.gatewaySecretEncrypted)} : await credentials();const expected=crypto.createHmac("sha256",orderCredential.secret).update(orderId+"|"+paymentId).digest("hex");if(expected.length!==signature.length||!crypto.timingSafeEqual(Buffer.from(expected),Buffer.from(signature)))return res.status(400).json({message:"Invalid signature"});const payment=await api(`payments/${encodeURIComponent(paymentId)}`,{},orderCredential);if(payment.order_id!==orderId||payment.status!=="captured"||payment.amount!==record.amountPaise||payment.currency!=="INR")return res.status(400).json({message:"Payment not captured or order mismatch"});const claimed=await Payment.findOneAndUpdate({_id:record._id,status:"Created"},{$set:{status:"Paid",paymentId,verifiedAt:new Date()}},{new:true});if(!claimed)return res.json({status:1,message:"Payment already processed"});const plan=await Plan.findById(record.planId);const now=new Date(),expiry=new Date(now);expiry.setUTCMonth(expiry.getUTCMonth()+(plan.planType==="yearly"?12:1));await Subscription.updateMany({userId:req.user._id,status:"Active"},{$set:{status:"Cancelled"}});const sub=await Subscription.create({userId:req.user._id,planId:plan._id,audience:plan.audience,razorpayOrderId:orderId,razorpayPaymentId:paymentId,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expiry,nextBillingDate:expiry,amount:plan.price,status:"Active"});await Invoice.create({invoiceNumber:"ASD-"+orderId,userId:req.user._id,subscriptionId:sub._id,amount:plan.price,paymentMethod:"Razorpay",status:"Paid",paidAt:now});await subscriptionNotify({userId:req.user._id,title:"Subscription activated",message:`${plan.name} active until ${expiry.toLocaleDateString("en-IN")}`,category:"System",type:"Payment",eventKey:`payment:${orderId}`,relatedId:sub._id,urgency:"Information"});await subscriptionAdmin({title:"Payment successful",message:`Subscription ${plan.name} payment received.`,type:"Payment",module:"plans",relatedId:sub._id,eventKey:`payment:${orderId}`});res.json({status:1,data:sub});}catch(e){res.status(500).json({message:e.message});}};
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
    const sub=await Subscription.create({userId:user._id,planId:plan._id,audience:plan.audience,billingCycle:plan.planType==="yearly"?"Yearly":"Monthly",startDate:now,expiryDate:expires,nextBillingDate:expires,amount:0,status:"Active",isTrial:false,activationSource:"Admin",activatedBy:req.user._id,activationReason:req.body.reason.trim()});
    // Keep the legacy User.planId reference aligned with the active subscription.
    await User.updateOne({_id:user._id},{$set:{planId:plan._id}});
    // Existing paid invoices and Razorpay transactions are not modified.
    console.info("ADMIN_PLAN_CHANGE",JSON.stringify({adminId:String(req.user._id),userId:String(user._id),planId:String(plan._id),reason:req.body.reason.trim(),subscriptionId:String(sub._id)}));
    return res.json({status:1,data:sub,message:"Plan assigned without charging payment"});
  } catch(e) { console.error("adminChangeCustomerPlan",e); return res.status(500).json({message:"Unable to assign plan"}); }
};
exports.expiryAlerts=async()=>{const now=new Date();const subs=await Subscription.find({status:"Active",expiryDate:{$lte:new Date(Date.now()+15*86400000)}}).populate("planId");for(const s of subs){const days=Math.ceil((s.expiryDate-now)/86400000);if([15,7,3,1].includes(days)||days<=0)await subscriptionNotify({userId:s.userId,relatedId:s._id,title:days<=0?"Subscription expired":`Subscription expires in ${days} days`,message:`Your ${s.planId?.name||"plan"} expiry date is ${s.expiryDate.toLocaleDateString("en-IN")}.`,type:"Subscription",urgency:"Warning",eventKey:`expiry:${s._id}:${Math.max(0,days)}`});}};

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
 await subscriptionNotify({userId:req.user._id,title:"Trial activated",message:`${plan.name} trial valid until ${expiry.toLocaleDateString("en-IN")}`,category:"System",eventKey:`trial:${plan._id}:${expiry.toISOString()}`,type:"System",actionLink:audienceFor(req)==="b2b"?"/b2b-dashboard":"/user-dashboard"});
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

// Shared branded invoice PDF renderer. Existing subscription/payment/webhook logic preserved.
const renderSubscriptionInvoice = async (req, res, assignmentOnly = false) => {
  try {
    const PDFDocument = require('pdfkit');
    const fs = require('fs');
    const path = require('path');
    const User = require('../models/user');
    let invoice, sub, customer;
    if (assignmentOnly) {
      sub = await Subscription.findOne({_id:req.params.id,userId:req.user._id,activationSource:'Admin'}).populate('planId').populate('activatedBy','name email');
      if (!sub) return res.status(404).json({message:'Admin assignment not found'});
      customer = await User.findById(req.user._id).lean();
    } else {
      invoice = await Invoice.findOne({_id:req.params.id,userId:req.user._id}).populate({path:'subscriptionId',populate:{path:'planId'}}).populate('userId','name email companyName address');
      if (!invoice) return res.status(404).json({message:'Invoice not found'});
      sub = invoice.subscriptionId;
      customer = invoice.userId;
    }
    const plan = sub?.planId;
    const isAdmin = assignmentOnly || invoice?.status === 'Admin Activated' || invoice?.paymentMethod === 'Admin Assignment';
    const snap = invoice?.billingSnapshot || {};
    const money = n => Number.isFinite(Number(n)) ? 'INR '+Number(n).toLocaleString('en-IN',{minimumFractionDigits:2,maximumFractionDigits:2}) : 'Not available';
    const dt = d => d ? new Date(d).toLocaleDateString('en-IN') : '—';
    const navy='#10213C', teal='#078887', pale='#E5F7F6', grey='#5B6C82', border='#BBDCDD';
    const doc=new PDFDocument({size:'A4',margin:32,autoFirstPage:true});
    const fileName = String(invoice?.invoiceNumber || `ASD-ADMIN-${String(sub._id).slice(-12).toUpperCase()}`).replace(/[^a-zA-Z0-9_-]/g,'_');
    res.setHeader('Content-Type','application/pdf');
    res.setHeader('Content-Disposition',`attachment; filename="${fileName}.pdf"`);
    doc.pipe(res);
    const text=(str,x,y,w=240,size=9,color=navy,bold=false,opts={})=>doc.font(bold?'Helvetica-Bold':'Helvetica').fontSize(size).fillColor(color).text(String(str??'—'),x,y,{width:w,...opts});
    const rect=(x,y,w,h,fill=pale,stroke=border)=>{doc.roundedRect(x,y,w,h,4).fillAndStroke(fill,stroke);};
    const title=(label,x,y,w)=>{doc.rect(x,y,w,24).fill(pale);text(label,x+10,y+7,w-20,10,navy,true);};
    const line=(label,value,x,y,w=235)=>{text(label,x,y,105,8,grey);text(value,x+108,y,w-112,9,navy,true);};
    const full=531, left=32, right=304, col=259;
    const logo=path.join(__dirname,'../assets/cargomate_invoice_logo.png');
    if(fs.existsSync(logo))doc.image(logo,35,16,{fit:[235,90]});
    text('SUBSCRIPTION INVOICE',342,35,218,16,navy,true,{align:'right'});
    text(isAdmin?'ACTIVATED BY ADMIN':'SUBSCRIPTION PAYMENT',342,57,218,9,teal,true,{align:'right'});
    text('ASD LOGISTICS PVT LTD',34,102,270,11,navy,true);
    text('VENKATA SAI NILAYAM, H N.21-59/10, GR & 1ST FLOOR',34,119,310,8,grey);
    text('HUDA COLONY, STREET NO.5, R.B. NAGAR, SHAMSHABAD',34,131,325,8,grey);
    text('HYDERABAD - 501218',34,143,260,8,grey);
    text('Invoice No.: '+(invoice?.invoiceNumber||fileName),335,104,225,9,navy,true,{align:'right'});
    text('Invoice Date: '+dt(invoice?.createdAt||sub?.createdAt),335,121,225,9,grey,false,{align:'right'});
    text('Currency: INR',335,138,225,9,grey,false,{align:'right'});
    rect(left,168,col,116,'#FFFFFF');rect(right,168,col,116,'#FFFFFF');title('BILL TO',left,168,col);title('SUBSCRIPTION DETAILS',right,168,col);
    text(customer?.name||snap.customerName||'Customer',left+10,200,col-20,10,navy,true);
    text(customer?.email||'',left+10,217,col-20,9,grey);
    text(customer?.companyName||'',left+10,233,col-20,9,grey);
    text(String(customer?.address||snap.customerAddress||'').slice(0,130),left+10,248,col-20,8,grey);
    line('Plan',plan?.name||'Subscription',right+9,196,col-15);
    line('Panel',plan?.audience==='b2b'?'B2B Vendor':'User',right+9,212,col-15);
    line('Billing cycle',sub?.billingCycle||plan?.planType||'—',right+9,228,col-15);
    line('Valid from',dt(sub?.startDate),right+9,244,col-15);
    line('Valid until',dt(sub?.expiryDate),right+9,260,col-15);
    // Item table: actual catalog price, never treat an admin assignment as a paid transaction.
    doc.rect(left,300,full,27).fill(teal);
    [['DESCRIPTION',left+10,300],['QTY',348,50],['UNIT PRICE (INR)',395,90],['AMOUNT (INR)',487,72]].forEach(([v,x,w])=>text(v,x,309,w,8,'#FFFFFF',true));
    rect(left,327,full,44,'#FFFFFF');
    const price=Number(plan?.price);
    const planPrice=Number.isFinite(price)?price:null;
    text(`${plan?.name||'Subscription'} Plan - ${plan?.audience==='b2b'?'B2B Vendor':'User'} Panel`,left+10,337,290,10,navy,true);
    text(`${sub?.billingCycle||'Monthly'} subscription`,left+10,353,280,8,grey);
    text('1',353,343,40,9,navy,true);
    text(planPrice===null?'N/A':money(planPrice),396,343,90,9,navy,true);
    text(planPrice===null?'N/A':money(planPrice),485,343,76,9,navy,true,{align:'right'});
    // Show limits only if stored on the assigned plan. No invented quota values.
    title('INCLUDED PLAN LIMITS',left,389,full);
    const limits = plan?.featureLimits;
    const limitRows = limits instanceof Map ? [...limits.entries()] : (limits && typeof limits==='object' ? Object.entries(limits) : []);
    const safeLimits = limitRows.filter(([,v])=>v!==null&&v!==undefined).slice(0,7);
    if(safeLimits.length){safeLimits.forEach(([k,v],i)=>{const y=419+i*19;if(i%2===0)doc.rect(left,y,full,19).fill('#F5FAFA');text(String(k).replace(/([A-Z])/g,' $1'),left+12,y+5,370,8,navy);text(String(v),450,y+5,100,8,navy,true,{align:'right'});});}
    else text('Included features and limits are determined by the selected plan.',left+10,422,full-20,9,grey);
    const summaryY=Math.max(451,425+safeLimits.length*19);
    rect(left,summaryY,col,103,'#FFFFFF');rect(right,summaryY,col,103,'#FFFFFF');
    title(isAdmin?'ACTIVATION DETAILS':'PAYMENT DETAILS',left,summaryY,col);
    title('INVOICE SUMMARY',right,summaryY,col);
    if(isAdmin){
      line('Status','Activated by Admin',left+9,summaryY+34,col-15);
      line('Assigned by',sub?.activatedBy?.name||'Admin',left+9,summaryY+52,col-15);
      text(`Reason: ${String(sub?.activationReason||'Manual plan activation').slice(0,100)}`,left+9,summaryY+72,col-18,8,grey);
    } else {
      line('Payment method',invoice?.paymentMethod||'—',left+9,summaryY+34,col-15);
      line('Payment date',dt(invoice?.paidAt),left+9,summaryY+52,col-15);
      line('Status',invoice?.status||'—',left+9,summaryY+70,col-15);
    }
    if(!isAdmin && snap.verified===true){
      line('Taxable value',money(snap.taxableAmount),right+9,summaryY+29,col-15);
      line('CGST',money(snap.cgst),right+9,summaryY+45,col-15);
      line('SGST / IGST',`${money(snap.sgst)} / ${money(snap.igst)}`,right+9,summaryY+61,col-15);
      line('Total paid',money(invoice?.amount),right+9,summaryY+79,col-15);
    } else {
      line('Plan price',planPrice===null?'N/A':money(planPrice),right+9,summaryY+35,col-15);
      line(isAdmin?'Activation status':'Amount paid',isAdmin?'Admin Activated':money(invoice?.amount),right+9,summaryY+56,col-15);
    }
    title('SUBSCRIPTION NOTES',left,summaryY+119,full);
    text(isAdmin?'This document records an administrator-assigned subscription. The plan price is shown for reference only. This document is not proof of payment or a GST tax invoice.':'This is a subscription payment record. Tax amounts are not represented unless verified in billing records.',left+10,summaryY+152,full-20,9,grey);
    const footerY=760;
    doc.moveTo(left,footerY).lineTo(563,footerY).strokeColor(border).stroke();
    text('Thank you for choosing ASD CargoMate.',left,footerY+10,full,10,navy,true,{align:'center'});
    text('System-generated document • No manual signature required',left,footerY+26,full,8,grey,false,{align:'center'});
    doc.end();
  } catch(e) {
    console.error('Subscription invoice PDF error',e);
    if(!res.headersSent)res.status(500).json({message:'Unable to generate invoice PDF'});else res.end();
  }
};
exports.invoicePdf=(req,res)=>renderSubscriptionInvoice(req,res,false);
exports.adminAssignmentPdf=(req,res)=>renderSubscriptionInvoice(req,res,true);
