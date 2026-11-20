const router=require("express").Router();
const {protect}=require("../middleware/authMiddleware");
const quota=require("../middleware/subscriptionLimit");
const ChatSession=require("../models/AIChatSession");
const paths={
 chat:{method:"POST",upstream:"/chat",feature:"aiChatbot"},
 lookup:{method:"GET",upstream:"/lookup",feature:"hsLookup"},
 incentiveEstimate:{method:"GET",upstream:"/incentives/estimate",feature:"incentiveChecker"},
 incentiveMeis:{method:"GET",upstream:"/incentives/meis",feature:"incentiveChecker"},
 tradeResearch:{method:"GET",upstream:"/tradestat/commodity-country-trend",feature:"tradeResearch"},
 governmentSchemes:{method:"GET",upstream:"/schemes",feature:"governmentSchemes"},
 countryRules:{method:"GET",upstream:"/country-rules",feature:"countryRules"},
};
for(const [key,definition] of Object.entries(paths)){
 router[definition.method.toLowerCase()](`/${key}`,protect,...(key==="incentiveMeis"?[]:[quota(definition.feature)]),async(req,res)=>{
  try{
   const raw=process.env.CARGOMATE_AI_API_URL||"https://ai-service-nb69.onrender.com/api";
   const target=new URL(raw.replace(/\/+$/,"")+definition.upstream);
   if(definition.method==="GET")for(const [k,value] of Object.entries(req.query||{})){
    if(Array.isArray(value))value.forEach(v=>target.searchParams.append(k,String(v)));
    else if(typeof value==="string")target.searchParams.set(k,value);
   }
   const upstream=await fetch(target,{method:definition.method,headers:{"Accept":"application/json","Content-Type":"application/json",...(process.env.CARGOMATE_AI_API_TOKEN?{Authorization:`Bearer ${process.env.CARGOMATE_AI_API_TOKEN}`}:{})},...(definition.method==="POST"?{body:JSON.stringify(req.body)}:{ }),signal:AbortSignal.timeout(55000)});
   const contentType=upstream.headers.get("content-type")||"";
   const body=await upstream.text();
   if(key==="chat"&&upstream.ok){try{const parsed=JSON.parse(body);const sid=parsed.session_id;if(typeof sid==="string"&&/^[a-zA-Z0-9_-]{1,150}$/.test(sid))await ChatSession.updateOne({owner:req.user._id,sessionId:sid},{$setOnInsert:{title:String(req.body?.message||"").slice(0,100)}},{upsert:true});}catch{}}
   res.status(upstream.status).type(contentType.includes("json")?"json":"text").send(body);
  }catch(e){res.status(502).json({status:0,message:e.name==="TimeoutError"?"Trade assistant timed out. Please retry.":"Trade assistant is temporarily unavailable"});}
 });
}

// Customer/B2B streaming, protected by the SAME AI Chatbot quota as /chat.
// Sessions are account-owned; do not trust user-supplied session identifiers without checking ownership.
router.post('/chat/stream',protect,quota('aiChatbot'),async(req,res)=>{
 try {
  const message=typeof req.body?.message==='string'?req.body.message.trim():'';
  if(!message||message.length>8000)return res.status(400).json({message:'Message required (max 8000 characters)'});
  const sessionId=req.body?.session_id;
  if(sessionId!==undefined && (typeof sessionId!=='string'|| !/^[A-Za-z0-9_-]{1,150}$/.test(sessionId))) return res.status(400).json({message:'Invalid session_id'});
  if(sessionId){
   const other=await ChatSession.findOne({sessionId,owner:{$ne:req.user._id}});
   if(other)return res.status(403).json({message:'Session belongs to another account'});
   await ChatSession.updateOne({owner:req.user._id,sessionId},{$setOnInsert:{title:message.slice(0,100)}},{upsert:true});
  }
  const base=(process.env.CARGOMATE_AI_API_URL||'https://ai-service-nb69.onrender.com/api').replace(/\/+$/,'');
  const response=await fetch(base+'/chat/stream',{method:'POST',headers:{'Content-Type':'application/json',Accept:'text/event-stream',...(process.env.CARGOMATE_AI_API_TOKEN?{Authorization:`Bearer ${process.env.CARGOMATE_AI_API_TOKEN}`}:{})},body:JSON.stringify({message,...(sessionId?{session_id:sessionId}:{})}),signal:AbortSignal.timeout(120000)});
  if(!response.ok)return res.status(response.status===403?502:response.status).json({message:'AI stream upstream rejected request',upstreamStatus:response.status});
  res.writeHead(200,{'Content-Type':'text/event-stream; charset=utf-8','Cache-Control':'no-cache, no-transform','X-Accel-Buffering':'no'});
  const reader=response.body.getReader();
  let buffer='';
  res.on('close',()=>reader.cancel().catch(()=>{}));
  while(true){
   const {done,value}=await reader.read();if(done)break;
   const chunk=Buffer.from(value);res.write(chunk);
   buffer+=chunk.toString('utf8');
   const events=buffer.split(/\r?\n\r?\n/);buffer=events.pop()||'';
   for(const raw of events){
    for(const line of raw.split(/\r?\n/)){
     if(!line.startsWith('data:'))continue;
     try {
      const event=JSON.parse(line.slice(5).trim());
      if(event.type==='session' && /^[A-Za-z0-9_-]{1,150}$/.test(event.session_id||'')){
       const conflict=await ChatSession.findOne({sessionId:event.session_id,owner:{$ne:req.user._id}});
       if(!conflict) await ChatSession.updateOne({owner:req.user._id,sessionId:event.session_id},{$setOnInsert:{title:message.slice(0,100)}},{upsert:true});
      }
     }catch{}
    }
   }
  }
  res.end();
 }catch(e){if(!res.headersSent)return res.status(502).json({message:'AI streaming unavailable'});res.end();}
});

module.exports=router;
