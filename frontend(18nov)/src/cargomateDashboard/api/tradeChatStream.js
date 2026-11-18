import { getSession } from "../../lib/auth";

// The customer/B2B endpoint enforces a quota server-side; never call AI upstream directly.
export async function streamTradeChat({message, session_id, onToken, onSession, signal}) {
  const base=(import.meta.env.VITE_API_URL||"http://localhost:8000/api").replace(/\/+$/,"");
  const token=getSession()?.token;
  if(!token)throw new Error("Please sign in again to use AI Chatbot");
  const url=`${base.endsWith('/api')?base:base+'/api'}/ai-quota/chat/stream`;
  const response=await fetch(url,{
    method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream",Authorization:`Bearer ${token}`},
    body:JSON.stringify({message,...(session_id?{session_id}:{})}),signal,
  });
  if(!response.ok){let payload={};try{payload=await response.json()}catch{}
    const error=new Error(payload.message||`Chat stream failed (${response.status})`);
    error.response={data:payload,status:response.status};throw error;
  }
  if(!response.body)throw new Error("This browser cannot read the AI stream");
  const reader=response.body.getReader(),decoder=new TextDecoder();
  let buffer="",full="",rawFinal=null,finalSession=session_id;
  function consume(block){
    const value=block.split(/\r?\n/).filter(x=>x.startsWith("data:")).map(x=>x.slice(5).trim()).join("\n");
    if(!value)return;
    let event;try{event=JSON.parse(value)}catch{return}
    if(event.type==="session" && event.session_id){finalSession=event.session_id;onSession?.(finalSession)}
    if(event.type==="token"){full+=event.text||"";onToken?.(full)}
    if(event.type==="done"){rawFinal=event;full=event.answer||full;onToken?.(full)}
    if(event.type==="error")throw new Error(event.message||"AI provider error");
  }
  while(true){const {done,value}=await reader.read();if(done)break;
    buffer+=decoder.decode(value,{stream:true});const frames=buffer.split(/\r?\n\r?\n/);buffer=frames.pop()||"";
    frames.forEach(consume);
  }
  if(buffer.trim())consume(buffer);
  return {answer:full,session_id:finalSession,...(rawFinal||{})};
}
