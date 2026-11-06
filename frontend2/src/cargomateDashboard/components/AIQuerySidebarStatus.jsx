import { useEffect, useState } from "react";
import API from "../api/axios";
export default function AIQuerySidebarStatus({onUpgrade,variant="user"}){
 const [data,setData]=useState(null);
 useEffect(()=>{let active=true;const load=async()=>{try{const res=await API.get("/ai-subscription/me");if(active)setData(res.data?.data||null);}catch{if(active)setData(null)}};load();const id=setInterval(load,30000);return()=>{active=false;clearInterval(id)}},[]);
 const usage=data?.features?.aiChatbot;const sub=data?.subscription;
 return <div className="rounded-xl p-4 text-white bg-[#152A4E]"><h3 className="font-semibold text-sm mb-3">AI Queries Left</h3><div className="text-center bg-[#0B48B2] rounded-lg p-3"><p className="font-semibold text-xs">{sub?.planId?.name||"No Active Plan"}</p><p className="text-xl font-bold mt-2">{usage?`${usage.remaining} / ${usage.limit}`:"— / —"}</p><p className="text-xs text-slate-300 mt-1">Monthly Queries Remaining</p>{usage&&<p className="text-[11px] text-slate-300 mt-1">{usage.used} used</p>}{sub?.expiryDate&&<p className="text-[11px] text-slate-300 mt-2">Valid till {new Date(sub.expiryDate).toLocaleDateString("en-GB")}</p>}</div><button onClick={onUpgrade} className="mt-3 bg-teal-500 hover:bg-teal-600 rounded-lg w-full py-2 text-xs font-semibold">{sub?"Change Plan":"Upgrade Plan"}</button></div>
}
