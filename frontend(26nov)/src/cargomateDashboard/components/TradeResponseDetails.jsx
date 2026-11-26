import React from "react";
import { ShieldAlert, Database, CheckCircle2 } from "lucide-react";
const safe=(v)=>typeof v==="string"?v:String(v??"");
export default function TradeResponseDetails({data}){
 if(!data||typeof data!=="object")return null;
 const results=data.results&&typeof data.results==="object"?Object.entries(data.results):[];
 return <div className="mt-4 space-y-4 text-sm text-slate-700">
 {results.map(([engine,detail])=><section key={engine} className="rounded-xl border border-blue-100 bg-white p-4 space-y-3"><div className="flex gap-2 items-center font-bold text-slate-900"><Database size={17} className="text-teal-600"/>{engine.replaceAll("_"," ").toUpperCase()}</div>{detail?.query&&<p><b>Query:</b> {safe(detail.query)}</p>}{detail?.best_match&&<div className="bg-amber-50 rounded-lg p-3 border border-amber-100"><p className="font-semibold">Nearest text match — not verified</p><p><strong>{safe(detail.best_match.hs_code)}</strong> — {safe(detail.best_match.description)}</p><p className="text-xs mt-1">{safe(detail.best_match.rationale)}</p>{detail.best_match.needs_verification&&<span className="text-xs font-semibold text-amber-700">Verification required</span>}</div>}
 {Array.isArray(detail?.candidates)&&<div><h4 className="font-bold mb-2">HS Code Candidates ({detail.candidates.length})</h4><div className="overflow-x-auto"><table className="w-full text-left text-xs"><thead className="bg-slate-50"><tr><th className="p-2">HS Code</th><th className="p-2">Description</th><th className="p-2">Source</th></tr></thead><tbody>{detail.candidates.map((candidate,i)=><tr className="border-t" key={candidate.hs_code+String(i)}><td className="p-2 font-bold text-slate-900 whitespace-nowrap">{safe(candidate.hs_code)}</td><td className="p-2">{safe(candidate.description)}</td><td className="p-2 text-slate-500">{safe(candidate.source)}</td></tr>)}</tbody></table></div></div>}{Array.isArray(detail?.sources)&&<p className="text-xs"><b>Engine sources:</b> {detail.sources.join(", ")}</p>}</section>)}
 {Array.isArray(data.engines_used)&&data.engines_used.length>0&&<p className="text-xs flex items-center gap-2"><CheckCircle2 size={14} className="text-teal-600"/><b>Engines used:</b> {data.engines_used.join(", ")}</p>}
 {Array.isArray(data.sources)&&data.sources.length>0&&<p className="text-xs"><b>Sources:</b> {data.sources.join(", ")}</p>}
 {data.session_id&&<p className="text-xs text-slate-500"><b>Session ID:</b> {safe(data.session_id)}</p>}
 {data.disclaimer&&<div className="rounded-lg bg-slate-50 border border-slate-200 p-3 text-xs text-slate-600 flex items-start gap-2"><ShieldAlert size={16} className="shrink-0 text-amber-600"/><span>{safe(data.disclaimer)}</span></div>}
 </div>
}
