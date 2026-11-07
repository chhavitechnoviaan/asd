import React from "react";
function inline(text){
 return String(text).split(/(\*\*[^*]+\*\*)/g).map((chunk,i)=>chunk.startsWith("**")&&chunk.endsWith("**")?<strong key={i} className="font-semibold text-slate-900">{chunk.slice(2,-2)}</strong>:<React.Fragment key={i}>{chunk}</React.Fragment>);
}
export default function FormattedAIReply({text,onSuggestion}){
 const lines=String(text||"").replace(/\r\n/g,"\n").split("\n");
 return <div className="space-y-2 leading-6 text-[13px] sm:text-sm text-slate-700 break-words">
 {lines.map((line,i)=>{
  const t=line.trim();if(!t)return <div key={i} className="h-1"/>;
  const heading=t.match(/^#{1,4}\s+(.+)$/);
  if(heading)return <h4 key={i} className="text-[14px] sm:text-base font-bold text-slate-900 border-b border-blue-100 pb-1 pt-2">{inline(heading[1])}</h4>;
  const bullet=t.match(/^(?:[-*•]|\d+[.)])\s+(.+)$/);
  if(bullet){
    const suggestion=bullet[1].replace(/\*\*/g, "").trim();
    const clickable=typeof onSuggestion==="function" && suggestion.length>=3 && suggestion.length<=65 && !/\b\d{6,}\b/.test(suggestion);
    return <div key={i} className="flex items-start gap-2 pl-1"><span className="text-[#0D9488] font-black mt-0.5">•</span>{clickable
      ? <button type="button" onClick={()=>onSuggestion(suggestion)} title={`Ask about ${suggestion}`} className="flex-1 text-left text-[#0A8981] underline decoration-teal-200 underline-offset-4 hover:text-teal-700 focus-visible:outline-2 focus-visible:outline-teal-500">{inline(bullet[1])} ↗</button>
      : <p className="flex-1">{inline(bullet[1])}</p>}</div>;
  }
  return <p key={i}>{inline(t.replace(/^\*\*(.+)\*\*$/,'**$1**'))}</p>;
 })}
 </div>;
}
