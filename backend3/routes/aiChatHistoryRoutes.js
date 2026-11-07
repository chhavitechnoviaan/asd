const router = require("express").Router();
const { randomUUID } = require("node:crypto");
const { protect } = require("../middleware/authMiddleware");
const ChatSession=require("../models/AIChatSession");
const base = () => (process.env.CARGOMATE_AI_API_URL || "https://ai-service-nb69.onrender.com/api").replace(/\/+$/, "");
const headers = () => ({"Content-Type":"application/json", ...(process.env.CARGOMATE_AI_API_TOKEN ? {Authorization:`Bearer ${process.env.CARGOMATE_AI_API_TOKEN}`} : {})});
const validSession = value => typeof value === "string" && /^[a-zA-Z0-9_-]{1,150}$/.test(value);
// Create an account-owned session before sending any stream request.
router.post("/session", protect, async (req, res) => {
 try {
  const role = String(req.user?.roleName || req.user?.roleId?.name || "").trim().toLowerCase();
  if (role !== "admin" || req.user?.isInternalStaff) return res.status(403).json({message:"Main Admin access required"});
  const sessionId = `web-${randomUUID()}`;
  await ChatSession.create({owner:req.user._id,sessionId,title:"New conversation"});
  return res.status(201).json({session_id:sessionId});
 } catch (error) {return res.status(500).json({message:"Unable to create chat session"});}
});
router.get("/history", protect, async(req,res)=>{
 try {
  if (!validSession(req.query.session_id)) return res.status(400).json({message:"Valid session_id required"});
  const owned=await ChatSession.findOne({owner:req.user._id,sessionId:req.query.session_id});
  if(!owned)return res.status(404).json({message:"Chat session not found"});
  const url = new URL(base()+"/chat/history");
  url.searchParams.set("session_id",req.query.session_id);
  url.searchParams.set("limit",String(Math.min(1000,Math.max(1,Number(req.query.limit)||200))));
  const up=await fetch(url,{headers:headers(),signal:AbortSignal.timeout(30000)});
  return res.status(up.status).type("json").send(await up.text());
 }catch(error){return res.status(502).json({message:"Chat history service unavailable"});}
});
router.post("/stream",protect,async(req,res)=>{
 try {
  const role = String(req.user?.roleName || req.user?.roleId?.name || "").toLowerCase();
  const isAdmin = ["admin","main admin","super admin"].includes(role) || req.user?.isMainAdmin === true;
  if (!isAdmin) return res.status(403).json({message:"Admin access required"});
  if (!req.body?.message || typeof req.body.message!=="string" || req.body.message.length>8000) return res.status(400).json({message:"Message required (max 8000 characters)"});
  const payload={message:req.body.message};
  // A session ID is a reference to private history; never accept one owned by another account.
  if (req.body.session_id !== undefined) {
    if (!validSession(req.body.session_id)) return res.status(400).json({message:"Invalid session_id"});
    const owned = await ChatSession.findOne({owner:req.user._id,sessionId:req.body.session_id});
    if (!owned) return res.status(403).json({message:"Chat session does not belong to this account"});
    payload.session_id=req.body.session_id;
  }
  const upstream=await fetch(base()+"/chat/stream",{method:"POST",headers:{...headers(),Accept:"text/event-stream"},body:JSON.stringify(payload),signal:AbortSignal.timeout(120000)});
  if(!upstream.ok){return res.status(upstream.status === 403 ? 502 : upstream.status).json({message:upstream.status === 403 ? "AI provider rejected the backend request (403). Verify AI provider credentials and endpoint." : "AI upstream request failed",upstreamStatus:upstream.status,detail:(await upstream.text()).slice(0,500)});}
  res.writeHead(200,{"Content-Type":"text/event-stream; charset=utf-8","Cache-Control":"no-cache, no-transform","Connection":"keep-alive","X-Accel-Buffering":"no"});
  const reader=upstream.body.getReader();
  res.on("close",()=>reader.cancel().catch(()=>{}));
  let eventBuffer="";let stored=false;
  while(true){const {done,value}=await reader.read();if(done)break;const chunk=Buffer.from(value);res.write(chunk);eventBuffer+=chunk.toString("utf8");const parts=eventBuffer.split(/\r?\n\r?\n/);eventBuffer=parts.pop()||"";for(const part of parts){for(const line of part.split(/\r?\n/)){if(!line.startsWith("data:"))continue;try{const event=JSON.parse(line.slice(5).trim());if(event.type==="session"&&validSession(event.session_id)&&!stored){
      stored=true;
      const duplicate=await ChatSession.findOne({sessionId:event.session_id,owner:{$ne:req.user._id}});
      if (!duplicate) await ChatSession.updateOne({owner:req.user._id,sessionId:event.session_id},{$setOnInsert:{title:req.body.message.slice(0,100)}},{upsert:true});
    }}catch{}}}}
  
  res.end();
 }catch(e){if(!res.headersSent)res.status(502).json({message:"AI stream unavailable"});else res.end();}
});
module.exports=router;
