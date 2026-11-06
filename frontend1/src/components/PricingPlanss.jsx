import { useEffect, useState } from "react";
import { Check, Building2, UserRound } from "lucide-react";
import { pricingPlans } from "../data/pricingPlans";

const labels = { aiChatbot: "AI Chatbot", hsLookup: "HS Code Lookup", incentiveChecker: "Incentive Checker", shipmentPlanning: "Shipment Planning", shipmentCost: "Shipment Cost Analysis", governmentSchemes: "Government Schemes", countryRules: "Country Rules", tradeResearch: "B2B Trade Research" };
export function usePublicPlans() {
 const [plans,setPlans]=useState([]),[loading,setLoading]=useState(true),[failed,setFailed]=useState(false);
 useEffect(()=>{const ctrl=new AbortController();const origin=(import.meta.env.VITE_API_BASE_URL||import.meta.env.VITE_API_URL||"http://localhost:8000").replace(/\/api\/?$/,"");
 fetch(`${origin}/api/ai-subscription/plans`,{signal:ctrl.signal}).then(r=>{if(!r.ok)throw Error(`Pricing API ${r.status}`);return r.json()}).then(r=>setPlans(Array.isArray(r.data)?r.data:[])).catch(e=>{if(e.name!=="AbortError")setFailed(true)}).finally(()=>setLoading(false));return ()=>ctrl.abort();},[]);return {plans,loading,failed};
}
export {labels as planFeatureLabels};
export default function PricingPlans({ onGetStarted, pricingState, billing, onBillingChange }) {
 const {plans,loading}=pricingState;
 const datasets=[{audience:"user",heading:"User Plans",sub:"For individuals and small businesses",icon:UserRound},{audience:"b2b",heading:"B2B Plans",sub:"For vendors, logistics businesses and trade partners",icon:Building2}];
 const hasRemote=plans.length>0;
 return <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
 <h2 className="text-center text-2xl font-bold text-slate-900">Choose the Right Plan for You</h2>
 <p className="text-center text-sm text-slate-500 mt-2">Subscription plans and feature limits configured by CargoMate Admin</p>
 <div className="mt-6 flex justify-center"><div className="bg-slate-100 rounded-full p-1 flex gap-1">{["monthly","yearly"].map(period=><button key={period} onClick={()=>onBillingChange(period)} className={`text-sm font-semibold rounded-full px-5 py-2 transition ${billing===period?"bg-[#0D9488] text-white":"text-slate-600"}`}>{period==="monthly"?"Monthly":"Yearly"}</button>)}</div></div>
 {hasRemote?datasets.map(({audience,heading,sub,icon:Icon})=>{
 const visible=plans.filter(p=>(p.audience||"user")===audience && p.planType===billing && p.status==="active");
 return <div key={audience} className="mt-10"><div className="flex items-center gap-2 mb-4"><span className="rounded-lg bg-teal-50 p-2 text-teal-700"><Icon size={19}/></span><div><h3 className="font-bold text-xl text-slate-900">{heading}</h3><p className="text-sm text-slate-500">{sub}</p></div></div>
 {visible.length?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{visible.map(plan=><article key={plan._id} className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col hover:shadow-md transition"><div className="flex items-start justify-between"><h4 className="font-bold text-lg text-slate-900">{plan.name}</h4><span className="rounded-full bg-teal-50 text-teal-700 text-[11px] px-3 py-1 font-semibold">{audience==="b2b"?"B2B Plan":"User Plan"}</span></div><p className="text-xs text-slate-500 mt-2">{plan.description||"CargoMate AI plan"}</p><p className="text-3xl font-bold text-slate-900 my-5">₹{Number(plan.price||0).toLocaleString("en-IN")} <span className="text-sm font-normal text-slate-500">/{billing==="monthly"?"month":"year"}</span></p><ul className="space-y-3 flex-1">{Object.entries(plan.featureLimits||{}).map(([key,value])=><li className="flex items-center gap-2 text-xs text-slate-700" key={key}><Check size={14} className="text-teal-600"/><span>{labels[key]||key}: <strong>{value}</strong>/month</span></li>)}</ul><button onClick={()=>onGetStarted({...plan,monthly:plan.price,yearly:plan.price,icon:Check,tagline:plan.description||"CargoMate AI plan",features:Object.entries(plan.featureLimits||{}).map(([key,value])=>`${labels[key]||key}: ${value}/month`)})} className="mt-6 rounded-xl border border-teal-600 text-teal-700 font-semibold py-2.5 hover:bg-teal-50">Get Started</button></article>)}</div>:<p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No {heading.toLowerCase()} configured for {billing} billing.</p>}</div>;
 }):loading?<p className="mt-8 text-center text-slate-500">Loading plans...</p>:<div className="mt-8"><p className="text-center text-amber-700 text-xs mb-4">Default pricing displayed while admin plans are unavailable.</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{pricingPlans.map(plan=><article className="border rounded-xl p-5 flex flex-col" key={plan.id}><strong>{plan.name}</strong><p className="my-4 font-bold">{plan.monthly===null?"Custom":`$${billing==="yearly"?plan.yearly:plan.monthly}`}</p><ul className="text-xs text-slate-600 space-y-2 flex-1">{plan.features.map(v=><li key={v}>✓ {v}</li>)}</ul><button className="mt-4 border border-teal-500 rounded-lg p-2" onClick={()=>onGetStarted(plan)}>Get Started</button></article>)}</div></div>}
 </section>;
}
