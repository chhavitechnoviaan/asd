import { useState } from "react";
import axios from "axios";
// The AI service resolves carriers, not live GPS status or ETA.
const baseURL=(import.meta.env.VITE_AI_API_BASE_URL||"https://ai-service-nb69.onrender.com").replace(/\/+$/,"").replace(/\/api$/,"");
const client=axios.create({baseURL,timeout:30000,headers:{Accept:"application/json"}});
export default function CarrierTrackingResolver(){
  const [identifier,setIdentifier]=useState("");
  const [mode,setMode]=useState("auto");
  const [busy,setBusy]=useState(false);
  const [result,setResult]=useState(null);
  const [error,setError]=useState("");
  const track=async(e)=>{
    e.preventDefault();setError("");setResult(null);
    const normalized=identifier.trim().toUpperCase().replace(/\s/g,"");
    const sea=/^[A-Z]{4}\d{7}$/.test(normalized);
    const air=/^\d{3}-?\d{8}$/.test(normalized);
    const chosen=mode==="auto"?(sea?"sea":air?"air":null):mode;
    if(!chosen){setError("Enter an 11-digit AWB or container number (4 letters + 7 digits).");return;}
    setBusy(true);
    try {
      const param=chosen==="sea"?{container:normalized}:{awb:normalized};
      const validate=chosen==="sea"?"/tracking/container/validate":"/tracking/validate";
      const lookup=chosen==="sea"?"/tracking/container":"/tracking";
      const validation=await client.get(validate,{params:param});
      const checked=validation.data?.data||validation.data;
      if(checked?.valid===false){setError(checked.reason||"Invalid tracking number");return;}
      const response=await client.get(lookup,{params:param});
      const data=response.data?.data||response.data;
      if(data?.valid_format===false||data?.valid===false)throw new Error(data.reason||"Invalid tracking number");
      setResult({...data,mode:chosen});
    }catch(e){setError(e.response?.data?.reason||e.response?.data?.detail||e.response?.data?.message||e.message||"Unable to resolve carrier");}
    finally{setBusy(false);}
  };
  const url=result?.tracking_url;
  const safeUrl=typeof url==="string"&&/^https:\/\/[^\s]+$/i.test(url)?url:null;
  return <section className="mt-3 rounded-xl border border-teal-100 bg-teal-50/40 p-3 text-xs">
    <h4 className="font-bold text-slate-800">Air / Sea Carrier Tracking (AI Service)</h4>
    <p className="mt-1 text-slate-500">Validate AWB or container number and open the carrier’s official tracking website.</p>
    <form onSubmit={track} className="mt-3 flex flex-wrap gap-2">
      <select aria-label="Tracking type" value={mode} onChange={e=>setMode(e.target.value)} className="rounded-lg border bg-white px-2 py-2"><option value="auto">Auto detect</option><option value="air">Air AWB</option><option value="sea">Sea container</option></select>
      <input required placeholder="232-19702745 / MSKU0439196" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="min-w-[180px] flex-1 rounded-lg border bg-white px-3 py-2" />
      <button disabled={busy} className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white disabled:opacity-50">{busy?"Validating...":"Resolve"}</button>
    </form>
    {error&&<p role="alert" className="mt-2 text-rose-700">{error}</p>}
    {result&&<div className="mt-3 space-y-2 rounded-lg bg-white p-3">
      <p><strong>Reference:</strong> {result.formatted_awb||result.container||identifier}</p>
      <p><strong>Carrier:</strong> {result.carrier?.airline||result.carrier?.line||"Unknown"} {result.carrier?.iata||result.carrier?.scac||""}</p>
      <p><strong>Resolution:</strong> {result.status||"Resolved"} — Carrier identified; not a live location update.</p>
      {safeUrl&&<a href={safeUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-md bg-blue-600 px-3 py-2 font-bold text-white">Open Official Tracking</a>}
      <p className="text-slate-500">{result.disclaimer||"Location and ETA require the carrier's authorized API."}</p>
    </div>}
  </section>;
}
