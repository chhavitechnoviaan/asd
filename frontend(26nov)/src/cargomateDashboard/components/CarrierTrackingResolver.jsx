// // // import { useState } from "react";
// // // import axios from "axios";
// // // // The AI service resolves carriers, not live GPS status or ETA.
// // // const baseURL=(import.meta.env.VITE_AI_API_BASE_URL||"https://ai-service-nb69.onrender.com").replace(/\/+$/,"").replace(/\/api$/,"");
// // // const client=axios.create({baseURL,timeout:30000,headers:{Accept:"application/json"}});
// // // export default function CarrierTrackingResolver(){
// // //   const [identifier,setIdentifier]=useState("");
// // //   const [mode,setMode]=useState("auto");
// // //   const [busy,setBusy]=useState(false);
// // //   const [result,setResult]=useState(null);
// // //   const [error,setError]=useState("");
// // //   const track=async(e)=>{
// // //     e.preventDefault();setError("");setResult(null);
// // //     const normalized=identifier.trim().toUpperCase().replace(/\s/g,"");
// // //     const sea=/^[A-Z]{4}\d{7}$/.test(normalized);
// // //     const air=/^\d{3}-?\d{8}$/.test(normalized);
// // //     const chosen=mode==="auto"?(sea?"sea":air?"air":null):mode;
// // //     if(!chosen){setError("Enter an 11-digit AWB or container number (4 letters + 7 digits).");return;}
// // //     setBusy(true);
// // //     try {
// // //       const param=chosen==="sea"?{container:normalized}:{awb:normalized};
// // //       const validate=chosen==="sea"?"/tracking/container/validate":"/tracking/validate";
// // //       const lookup=chosen==="sea"?"/tracking/container":"/tracking";
// // //       const validation=await client.get(validate,{params:param});
// // //       const checked=validation.data?.data||validation.data;
// // //       if(checked?.valid===false){setError(checked.reason||"Invalid tracking number");return;}
// // //       const response=await client.get(lookup,{params:param});
// // //       const data=response.data?.data||response.data;
// // //       if(data?.valid_format===false||data?.valid===false)throw new Error(data.reason||"Invalid tracking number");
// // //       setResult({...data,mode:chosen});
// // //     }catch(e){setError(e.response?.data?.reason||e.response?.data?.detail||e.response?.data?.message||e.message||"Unable to resolve carrier");}
// // //     finally{setBusy(false);}
// // //   };
// // //   const url=result?.tracking_url;
// // //   const safeUrl=typeof url==="string"&&/^https:\/\/[^\s]+$/i.test(url)?url:null;
// // //   return <section className="mt-3 rounded-xl border border-teal-100 bg-teal-50/40 p-3 text-xs">
// // //     <h4 className="font-bold text-slate-800">Air / Sea Carrier Tracking (AI Service)</h4>
// // //     <p className="mt-1 text-slate-500">Validate AWB or container number and open the carrier’s official tracking website.</p>
// // //     <form onSubmit={track} className="mt-3 flex flex-wrap gap-2">
// // //       <select aria-label="Tracking type" value={mode} onChange={e=>setMode(e.target.value)} className="rounded-lg border bg-white px-2 py-2"><option value="auto">Auto detect</option><option value="air">Air AWB</option><option value="sea">Sea container</option></select>
// // //       <input required placeholder="232-19702745 / MSKU0439196" value={identifier} onChange={e=>setIdentifier(e.target.value)} className="min-w-[180px] flex-1 rounded-lg border bg-white px-3 py-2" />
// // //       <button disabled={busy} className="rounded-lg bg-teal-600 px-4 py-2 font-bold text-white disabled:opacity-50">{busy?"Validating...":"Resolve"}</button>
// // //     </form>
// // //     {error&&<p role="alert" className="mt-2 text-rose-700">{error}</p>}
// // //     {result&&<div className="mt-3 space-y-2 rounded-lg bg-white p-3">
// // //       <p><strong>Reference:</strong> {result.formatted_awb||result.container||identifier}</p>
// // //       <p><strong>Carrier:</strong> {result.carrier?.airline||result.carrier?.line||"Unknown"} {result.carrier?.iata||result.carrier?.scac||""}</p>
// // //       <p><strong>Resolution:</strong> {result.status||"Resolved"} — Carrier identified; not a live location update.</p>
// // //       {safeUrl&&<a href={safeUrl} target="_blank" rel="noopener noreferrer" className="inline-block rounded-md bg-blue-600 px-3 py-2 font-bold text-white">Open Official Tracking</a>}
// // //       <p className="text-slate-500">{result.disclaimer||"Location and ETA require the carrier's authorized API."}</p>
// // //     </div>}
// // //   </section>;
// // // }

// // import { useState } from "react";
// // import axios from "axios";
// // import { MapPin, Package, Scale, RefreshCw, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";

// // const baseURL = (import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com").replace(/\/+$/, "").replace(/\/api$/, "");
// // const client = axios.create({ baseURL, timeout: 45000, headers: { Accept: "application/json" } });
// // const show = (value) => value === null || value === undefined || value === "" ? "Not available" : String(value);
// // const validLink = (url) => { try { const u = new URL(url); return u.protocol === "https:" ? u.href : null; } catch { return null; } };
// // const fmt = (date) => { if (!date) return "Not available"; const parsed = new Date(date); return Number.isNaN(parsed.getTime()) ? String(date) : parsed.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); };
// // const card = "rounded-xl border border-slate-200 bg-white p-4 shadow-sm";

// // export default function CarrierTrackingResolver() {
// //   const [identifier, setIdentifier] = useState("");
// //   const [mode, setMode] = useState("auto");
// //   const [busy, setBusy] = useState(false);
// //   const [result, setResult] = useState(null);
// //   const [error, setError] = useState("");
// //   const [tab, setTab] = useState("Overview");
// //   const track = async (e) => {
// //     e?.preventDefault?.();
// //     setError("");
// //     const normalized = identifier.trim().toUpperCase().replace(/\s/g, "");
// //     const sea = /^[A-Z]{4}\d{7}$/.test(normalized);
// //     // Accept IATA standard 3+8 AWB, with or without a dash, plus API-supported 3-7-1 grouping.
// //     const air = /^\d{3}-?\d{7}-?\d$/.test(normalized);
// //     const chosen = mode === "auto" ? (sea ? "sea" : air ? "air" : null) : mode;
// //     if (!chosen || (chosen === "air" && !air) || (chosen === "sea" && !sea)) {
// //       setError("Enter a valid 11-digit AWB (e.g. 071-6353630-3) or container number (4 letters + 7 digits).");
// //       return;
// //     }
// //     setBusy(true);
// //     setResult(null);
// //     try {
// //       const params = chosen === "sea" ? { container: normalized } : { awb: normalized, live: true };
// //       const validationPath = chosen === "sea" ? "/tracking/container/validate" : "/tracking/validate";
// //       const endpoint = chosen === "sea" ? "/tracking/container" : "/tracking";
// //       const validation = await client.get(validationPath, { params: chosen === "air" ? { awb: normalized } : params });
// //       const checked = validation.data?.data || validation.data;
// //       if (checked?.valid === false || checked?.valid_format === false) throw new Error(checked.reason || "Invalid tracking number");
// //       const response = await client.get(endpoint, { params });
// //       const data = response.data?.data || response.data;
// //       if (data?.valid === false || data?.valid_format === false) throw new Error(data.reason || "Invalid tracking number");
// //       setResult({ ...data, mode: chosen });
// //       setTab("Overview");
// //     } catch (err) {
// //       const detail = err.response?.data?.detail;
// //       setError(err.response?.data?.reason || (typeof detail === "string" ? detail : null) || err.response?.data?.message || err.message || "Tracking request failed");
// //     } finally { setBusy(false); }
// //   };
// //   const live = result?.live_tracking;
// //   const hasLive = Boolean(result?.live_supported && live && live.live !== false);
// //   const route = Array.isArray(live?.route) ? live.route : [live?.origin, live?.destination].filter(Boolean);
// //   const flights = Array.isArray(live?.flights) ? live.flights : [];
// //   const events = Array.isArray(live?.events) ? live.events : [];
// //   const carrierLink = validLink(result?.tracking_url);
// //   const current = live?.current_status || result?.current_status || result?.status;
// //   const tabs = ["Overview", "Tracking History", "Flight Schedule"];
// //   return <section className="mt-4 min-w-0 rounded-2xl border border-cyan-200 bg-gradient-to-b from-[#f0fbff] to-white p-3 text-sm shadow-sm sm:p-5">
// //     <div className="flex flex-wrap items-start justify-between gap-3">
// //       <div><p className="text-xs font-bold uppercase tracking-wider text-teal-700">Shipment Operations Hub · Live Tracker</p><h3 className="mt-1 text-lg font-extrabold text-[#0b2942]">Air / Sea Carrier Tracking (AI Service)</h3><p className="mt-1 text-xs text-slate-500">Resolve your AWB or container and view available carrier tracking information inline.</p></div>
// //       {result && <button type="button" onClick={() => track()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-teal-200 bg-white px-3 py-2 text-xs font-bold text-teal-700 disabled:opacity-50"><RefreshCw size={14} className={busy ? "animate-spin" : ""}/> Refresh Tracking</button>}
// //     </div>
// //     <form onSubmit={track} className="mt-4 flex flex-wrap gap-2">
// //       <select aria-label="Tracking type" value={mode} onChange={e => setMode(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-800"><option value="auto">Auto detect</option><option value="air">Air AWB</option><option value="sea">Sea container</option></select>
// //       <input required aria-label="AWB or container number" placeholder="071-6353630-3 / MSKU0439196" value={identifier} onChange={e => setIdentifier(e.target.value)} className="min-w-[180px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-800 outline-none focus:border-teal-500" />
// //       <button type="submit" disabled={busy} className="rounded-lg bg-gradient-to-r from-teal-600 to-cyan-600 px-5 py-2.5 font-bold text-white disabled:opacity-50">{busy ? "Fetching tracking..." : "Resolve"}</button>
// //     </form>
// //     {error && <p role="alert" className="mt-3 flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-rose-700"><AlertCircle size={16}/>{error}</p>}
// //     {result && <div className="mt-5 space-y-4" aria-live="polite">
// //       <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-gradient-to-r from-[#082e49] to-[#0b8f8a] p-4 text-white sm:p-5">
// //         <div><p className="text-xs text-cyan-100">Shipment Tracking Overview</p><h4 className="mt-1 text-xl font-extrabold">{show(result.formatted_awb || result.container || identifier)}</h4><p className="mt-1 text-xs text-cyan-100">{show(live?.carrier || result.carrier?.airline || result.carrier?.line)} {result.carrier?.iata ? `(${result.carrier.iata})` : ""}</p></div>
// //         <div className="flex flex-wrap items-center gap-2"><span className="rounded-full bg-white/20 px-3 py-1.5 text-xs font-bold">{show(current)}</span><span className="rounded-full bg-white/15 px-3 py-1.5 text-xs">{hasLive ? "Carrier live data" : "Carrier link / resolution"}</span></div>
// //       </div>
// //       <div className="flex gap-2 overflow-x-auto border-b border-slate-200 pb-2">{tabs.map(t => <button type="button" key={t} onClick={() => setTab(t)} className={`shrink-0 rounded-lg px-3 py-2 text-xs font-bold ${tab === t ? "bg-teal-600 text-white" : "bg-white text-slate-600 hover:bg-teal-50"}`}>{t}</button>)}</div>
// //       {tab === "Overview" && <>
// //         <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">{[[MapPin,"Origin",live?.origin],[MapPin,"Destination",live?.destination],[Package,"Pieces",live?.pieces],[Scale,"Weight",live?.weight || (live?.weight_kg != null ? `${live.weight_kg} Kg` : null)]].map(([Icon,label,value]) => <div key={label} className={card}><div className="flex items-center gap-2 text-xs font-bold text-slate-500"><Icon size={15} className="text-teal-600"/>{label}</div><p className="mt-2 text-base font-extrabold text-slate-900">{show(value)}</p></div>)}</div>
// //         <div className={card}><h4 className="font-extrabold text-slate-900">Shipment Journey</h4>{route.length > 0 ? <div className="mt-5 flex flex-wrap items-center gap-2">{route.map((stop,i) => <div key={`${stop}-${i}`} className="flex items-center gap-2"><div className="rounded-xl border border-teal-200 bg-teal-50 px-4 py-3 text-center"><MapPin className="mx-auto mb-1 text-teal-600" size={18}/><strong className="text-slate-900">{show(stop)}</strong><p className="text-[10px] text-slate-500">{i===0?"Origin":i===route.length-1?"Destination":"Transit"}</p></div>{i<route.length-1 && <span className="text-xl font-bold text-cyan-500">→</span>}</div>)}</div> : <p className="mt-3 text-slate-500">Route is not available from the carrier.</p>}</div>
// //         <div className="grid gap-3 sm:grid-cols-3">{[["Current status",current],["Last fetched",live?.fetched_at ? fmt(live.fetched_at) : null],["Tracking events",live?.event_count ?? (hasLive ? events.length : null)]].map(([label,value]) => <div key={label} className={card}><p className="text-xs text-slate-500">{label}</p><p className="mt-1 font-bold text-slate-900">{show(value)}</p></div>)}</div>
// //         <div className={card}><div className="flex flex-wrap items-center justify-between gap-3"><h4 className="font-bold text-slate-900">Recent Tracking Activity</h4><button type="button" onClick={() => setTab("Tracking History")} className="text-xs font-bold text-teal-700">View full history →</button></div>{events.length ? events.slice(0,4).map((ev,i) => <div key={i} className="mt-3 flex gap-3 border-t border-slate-100 pt-3"><CheckCircle2 size={17} className="shrink-0 text-teal-600"/><div><p className="font-semibold text-slate-800">{show(ev.event)}</p><p className="text-xs text-slate-500">{show(ev.timestamp)} · {show(ev.detail)}</p></div></div>) : <p className="mt-3 text-xs text-slate-500">No carrier events available.</p>}</div>
// //       </>}
// //       {tab === "Tracking History" && <div className={card}><h4 className="font-extrabold text-slate-900">Tracking History ({events.length})</h4>{events.length ? <ol className="mt-4 space-y-0">{events.map((ev,i) => <li key={i} className="relative border-l-2 border-teal-100 pb-5 pl-6 last:pb-0"><span className={`absolute -left-[7px] top-0 h-3 w-3 rounded-full ring-4 ring-white ${ev.stage === "current" || ev.dot_color === "green" ? "bg-emerald-500" : "bg-amber-400"}`}/><div className="flex flex-wrap justify-between gap-2"><strong className="text-slate-900">{show(ev.event)}</strong><span className="text-xs text-slate-500">{show(ev.timestamp)}</span></div><p className="mt-1 text-xs text-slate-600">{show(ev.detail)}</p><p className="mt-1 text-[11px] font-medium text-teal-700">{[ev.from,ev.to].filter(Boolean).join(" → ")} {ev.milestone ? `· ${ev.milestone}` : ""}</p></li>)}</ol> : <p className="mt-3 text-slate-500">Carrier has not supplied event history.</p>}</div>}
// //       {tab === "Flight Schedule" && <div className={card}><h4 className="font-extrabold text-slate-900">{result.mode === "sea" ? "Carrier Schedule" : "Flight Schedule"}</h4>{flights.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[450px] text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr>{["Flight","From","To","Date","Status"].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{flights.map((f,i)=><tr key={i} className="border-t border-slate-100 text-slate-800">{[f.flight,f.from,f.to,f.date,f.status].map((v,j)=><td key={j} className="p-3">{show(v)}</td>)}</tr>)}</tbody></table></div> : <p className="mt-3 text-slate-500">No schedule information provided by the carrier.</p>}</div>}
// //       <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-100 bg-cyan-50/70 p-4"><p className="max-w-2xl text-xs leading-5 text-slate-600">{result.disclaimer || "Tracking information is provided by the carrier. Verify critical shipment details with the official carrier."}</p>{carrierLink && <a href={carrierLink} target="_blank" rel="noopener noreferrer" className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-[#0b2942] px-4 py-2.5 text-xs font-bold text-white">Official Carrier Tracking <ExternalLink size={14}/></a>}</div>
// //     </div>}
// //   </section>;
// // }

// import { useState } from "react";
// import axios from "axios";
// import { MapPin, Package, Scale, RefreshCw, ExternalLink, CheckCircle2, AlertCircle, Plane, Ship, Clock3, ArrowRight, CalendarDays, Route, FileText } from "lucide-react";

// const baseURL = (import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com").replace(/\/+$/, "").replace(/\/api$/, "");
// const client = axios.create({ baseURL, timeout: 45000, headers: { Accept: "application/json" } });
// const show = (v) => v === null || v === undefined || v === "" ? "Not available" : String(v);
// const safeLink = (url) => { try { const u = new URL(url); return u.protocol === "https:" ? u.href : null; } catch { return null; } };
// const fmt = (v) => { if (!v) return "Not available"; const d = new Date(v); return Number.isNaN(d.getTime()) ? String(v) : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }); };
// const panel = "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

// export default function CarrierTrackingResolver() {
//   const [identifier, setIdentifier] = useState("");
//   const [mode, setMode] = useState("auto");
//   const [busy, setBusy] = useState(false);
//   const [result, setResult] = useState(null);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState("Overview");
//   const track = async (e) => {
//     e?.preventDefault?.();
//     const value = identifier.trim().toUpperCase().replace(/\s/g, "");
//     const sea = /^[A-Z]{4}\d{7}$/.test(value);
//     const air = /^\d{3}-?\d{7}-?\d$/.test(value);
//     const selected = mode === "auto" ? (sea ? "sea" : air ? "air" : null) : mode;
//     setError("");
//     if (!selected || (selected === "air" && !air) || (selected === "sea" && !sea)) {
//       setError("Enter a valid 11-digit AWB (e.g. 071-6353630-3) or container number (4 letters and 7 digits)."); return;
//     }
//     setBusy(true);
//     try {
//       const params = selected === "sea" ? { container: value } : { awb: value, live: true };
//       const endpoint = selected === "sea" ? "/tracking/container" : "/tracking";
//       const response = await client.get(endpoint, { params });
//       const data = response.data?.data || response.data;
//       if (data?.valid === false || data?.valid_format === false) throw Error(data.reason || "Invalid tracking number");
//       setResult({ ...data, mode: selected }); setTab("Overview");
//     } catch (err) {
//       const detail = err.response?.data?.detail;
//       setError(err.response?.data?.reason || (typeof detail === "string" ? detail : null) || err.response?.data?.message || err.message || "Tracking request failed");
//     } finally { setBusy(false); }
//   };
//   const live = result?.live_tracking;
//   const hasLive = Boolean(result?.live_supported && live && live.live !== false);
//   const route = Array.isArray(live?.route) ? live.route : [live?.origin, live?.destination].filter(Boolean);
//   const flights = Array.isArray(live?.flights) ? live.flights : [];
//   const events = Array.isArray(live?.events) ? live.events : [];
//   const current = live?.current_status || result?.current_status || result?.status;
//   const link = safeLink(result?.tracking_url);
//   const delivered = /deliver/i.test(current || "");
//   const tabs = ["Overview", "Tracking", "Flight Schedule", "Activity Log"];
//   return <section className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-slate-200 bg-[#f7fafc] text-sm shadow-sm">
//     <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-white p-4 sm:p-5">
//       <div><p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">Shipment Operations Hub · Active Live Tracker</p><h2 className="mt-1 text-xl font-extrabold text-[#0b2942]">Shipment Tracking</h2><p className="mt-1 text-xs text-slate-500">Track air waybills and sea containers with live carrier updates.</p></div>
//       {result && <button type="button" onClick={() => track()} disabled={busy} className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"><RefreshCw size={14} className={busy ? "animate-spin" : ""}/>Refresh Tracking</button>}
//     </div>
//     <div className="p-3 sm:p-5">
//       <form onSubmit={track} className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3">
//         <select aria-label="Tracking type" value={mode} onChange={e => setMode(e.target.value)} className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-700"><option value="auto">Auto detect</option><option value="air">Air AWB</option><option value="sea">Sea container</option></select>
//         <input required aria-label="AWB or container number" placeholder="Enter AWB / Container number" value={identifier} onChange={e => setIdentifier(e.target.value)} className="min-w-[180px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-teal-500" />
//         <button type="submit" disabled={busy} className="rounded-lg bg-[#009d90] px-5 py-2.5 font-bold text-white hover:bg-[#087e78] disabled:opacity-50">{busy ? "Resolving..." : "Resolve"}</button>
//       </form>
//       {error && <div role="alert" className="mt-3 flex gap-2 rounded-xl bg-rose-50 p-3 text-rose-700"><AlertCircle size={16}/>{error}</div>}
//       {result && <div className="mt-4 space-y-4" aria-live="polite">
//         <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
//           <div className="flex items-center gap-3"><span className={`rounded-lg px-3 py-2 text-xs font-bold ${delivered ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>{show(current)}</span><div><p className="text-[11px] text-slate-500">{result.mode === "sea" ? "Sea Freight" : "Air Freight"}</p><h3 className="font-extrabold text-[#0b2942]">{show(result.formatted_awb || result.container || identifier)}</h3></div></div>
//           <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600"><span><strong className="block text-slate-500">Carrier</strong>{show(live?.carrier || result.carrier?.airline || result.carrier?.line)}</span><span><strong className="block text-slate-500">Route</strong>{show(live?.origin)} <ArrowRight size={12} className="inline"/> {show(live?.destination)}</span><span><strong className="block text-slate-500">Live data</strong>{hasLive ? "Available" : "Carrier link only"}</span></div>
//         </div>
//         <nav aria-label="Tracking details" className="flex gap-1 overflow-x-auto border-b border-slate-200">{tabs.map(t => <button key={t} type="button" onClick={() => setTab(t)} className={`shrink-0 border-b-2 px-4 py-3 text-xs font-semibold ${tab === t ? "border-[#009d90] text-[#008d82]" : "border-transparent text-slate-500 hover:text-slate-900"}`}>{t}</button>)}</nav>
//         {tab === "Overview" && <>
//           <div className="grid gap-4 lg:grid-cols-2">
//             <div className={panel}><h3 className="mb-5 font-bold text-slate-900">Shipment Status & Tracking</h3><ol className="space-y-0">{(events.length ? [...events].reverse().filter((e,i,a) => i === 0 || e.milestone !== a[i-1].milestone).slice(-8) : []).map((ev,i,a) => <li key={i} className="relative border-l-2 border-emerald-100 pb-5 pl-6 last:pb-0"><span className={`absolute -left-[10px] top-0 grid h-[18px] w-[18px] place-items-center rounded-full text-white ${i === a.length-1 ? "bg-amber-500" : "bg-emerald-500"}`}><CheckCircle2 size={13}/></span><p className="font-semibold text-slate-800">{show(ev.event)}</p><p className="mt-1 text-xs text-slate-500">{show(ev.from)} → {show(ev.to)}</p><p className="text-xs text-slate-400">{show(ev.timestamp)}</p></li>)}{!events.length && <li className="text-slate-500">No live milestones supplied by carrier.</li>}</ol><button type="button" onClick={()=>setTab("Tracking")} className="mt-5 w-full rounded-lg bg-[#edf7f8] px-4 py-2.5 text-xs font-bold text-teal-700">View Full Tracking History</button></div>
//             <div className={panel}><div className="flex items-center justify-between"><h3 className="font-bold text-slate-900">Live Tracking Route</h3><Route className="text-teal-600" size={18}/></div><div className="mt-4 flex min-h-[230px] flex-col justify-center rounded-xl border border-[#d7eaf0] bg-gradient-to-br from-[#edf7fb] via-white to-[#e7f8f4] p-5"><div className="flex flex-wrap items-center justify-center gap-2">{route.length ? route.map((stop,i) => <div key={`${stop}-${i}`} className="flex items-center gap-2"><div className="flex min-w-20 flex-col items-center rounded-xl border border-teal-200 bg-white p-3 shadow-sm"><MapPin size={22} className="text-teal-600"/><strong className="mt-2 text-slate-900">{show(stop)}</strong><small className="text-slate-500">{i===0 ? "Origin" : i===route.length-1 ? "Destination" : "Transit"}</small></div>{i<route.length-1 && <ArrowRight size={18} className="text-teal-500"/>}</div>) : <p className="text-slate-500">Route unavailable</p>}</div></div><div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs sm:grid-cols-3"><div><span className="text-slate-400">Current status</span><strong className="mt-1 block text-slate-900">{show(current)}</strong></div><div><span className="text-slate-400">Last update</span><strong className="mt-1 block text-slate-900">{fmt(live?.fetched_at)}</strong></div><div><span className="text-slate-400">Events</span><strong className="mt-1 block text-slate-900">{show(live?.event_count ?? (hasLive ? events.length : null))}</strong></div></div></div>
//           </div>
//           <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">{[[MapPin,"Origin",live?.origin],[MapPin,"Destination",live?.destination],[Package,"Pieces",live?.pieces],[Scale,"Weight",live?.weight || (live?.weight_kg != null ? `${live.weight_kg} Kg` : null)]].map(([Icon,label,value])=><div key={label} className={panel}><div className="flex items-center gap-2 text-xs text-slate-500"><Icon size={15} className="text-teal-600"/>{label}</div><p className="mt-2 font-bold text-slate-900">{show(value)}</p></div>)}</div>
//           <div className={panel}><div className="mb-3 flex items-center justify-between"><h3 className="font-bold text-slate-900">Recent Tracking Activity</h3><button type="button" onClick={()=>setTab("Activity Log")} className="text-xs font-semibold text-teal-700">View All Events</button></div>{events.length ? events.slice(0,4).map((ev,i)=><div key={i} className="flex gap-3 border-t border-slate-100 py-3"><CheckCircle2 size={16} className="shrink-0 text-teal-600"/><div><p className="font-semibold text-slate-800">{show(ev.event)}</p><p className="mt-1 text-xs text-slate-500">{show(ev.timestamp)} · {show(ev.detail)}</p></div></div>) : <p className="text-slate-500">No events available.</p>}</div>
//         </>}
//         {(tab === "Tracking" || tab === "Activity Log") && <div className={panel}><h3 className="mb-4 font-bold text-slate-900">Tracking History ({events.length})</h3>{events.length ? <ol>{events.map((ev,i)=><li key={i} className="relative border-l-2 border-teal-100 pb-5 pl-6 last:pb-0"><span className={`absolute -left-[7px] top-0 h-3 w-3 rounded-full ring-4 ring-white ${ev.stage === "current" || ev.dot_color === "green" ? "bg-emerald-500" : "bg-amber-400"}`}/><div className="flex flex-wrap justify-between gap-2"><strong className="text-slate-900">{show(ev.event)}</strong><span className="text-xs text-slate-500">{show(ev.timestamp)}</span></div><p className="mt-1 text-xs text-slate-600">{show(ev.detail)}</p><p className="mt-1 text-[11px] text-teal-700">{[ev.from,ev.to].filter(Boolean).join(" → ")} {ev.milestone ? `· ${ev.milestone}` : ""}</p></li>)}</ol> : <p className="text-slate-500">Carrier has not supplied event history.</p>}</div>}
//         {tab === "Flight Schedule" && <div className={panel}><h3 className="font-bold text-slate-900">{result.mode === "sea" ? "Carrier Schedule" : "Flight Schedule"}</h3>{flights.length ? <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[450px] text-left text-xs"><thead className="bg-slate-50 text-slate-500"><tr>{["Flight","From","To","Date","Status"].map(h=><th key={h} className="p-3">{h}</th>)}</tr></thead><tbody>{flights.map((f,i)=><tr key={i} className="border-t border-slate-100 text-slate-800">{[f.flight,f.from,f.to,f.date,f.status].map((v,j)=><td key={j} className="p-3">{show(v)}</td>)}</tr>)}</tbody></table></div> : <p className="mt-3 text-slate-500">No schedule supplied by the carrier.</p>}</div>}
//         <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-100 bg-cyan-50 p-4"><p className="max-w-2xl text-xs leading-5 text-slate-600">{result.disclaimer || "Tracking information is provided by the carrier. Verify important shipment details on the official carrier website."}</p>{link && <a href={link} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-[#0b2942] px-4 py-2.5 text-xs font-bold text-white">Track on Carrier Website <ExternalLink size={14}/></a>}</div>
//       </div>}
//     </div>
//   </section>;
// }

import { useState } from "react";
import axios from "axios";
import {
  MapPin,
  Package,
  Scale,
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Plane,
  Ship,
  Clock3,
  ArrowRight,
  CalendarDays,
  Route,
  FileText,
} from "lucide-react";

const baseURL = (
  import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com"
)
  .replace(/\/+$/, "")
  .replace(/\/api$/, "");
const client = axios.create({
  baseURL,
  timeout: 45000,
  headers: { Accept: "application/json" },
});
const show = (v) =>
  v === null || v === undefined || v === "" ? "Not available" : String(v);
const safeLink = (url) => {
  try {
    const u = new URL(url);
    return u.protocol === "https:" ? u.href : null;
  } catch {
    return null;
  }
};
const fmt = (v) => {
  if (!v) return "Not available";
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? String(v)
    : d.toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" });
};
const panel =
  "rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5";

export default function CarrierTrackingResolver({
  onResolved,
  initialResult = null,
  onBack,
}) {
  const [identifier, setIdentifier] = useState(
    initialResult?.awb ||
      initialResult?.formatted_awb ||
      initialResult?.container ||
      "",
  );
  const [mode, setMode] = useState(initialResult?.mode || "auto");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(initialResult);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("Overview");
  const track = async (e) => {
    e?.preventDefault?.();
    const value = identifier.trim().toUpperCase().replace(/\s/g, "");
    const sea = /^[A-Z]{4}\d{7}$/.test(value);
    const air = /^\d{3}-?\d{7}-?\d$/.test(value);
    const selected =
      mode === "auto" ? (sea ? "sea" : air ? "air" : null) : mode;
    setError("");
    if (
      !selected ||
      (selected === "air" && !air) ||
      (selected === "sea" && !sea)
    ) {
      setError(
        "Enter a valid 11-digit AWB (e.g. 071-6353630-3) or container number (4 letters and 7 digits).",
      );
      return;
    }
    setBusy(true);
    try {
      const params =
        selected === "sea" ? { container: value } : { awb: value, live: true };
      const endpoint = selected === "sea" ? "/tracking/container" : "/tracking";
      const response = await client.get(endpoint, { params });
      const data = response.data?.data || response.data;
      if (data?.valid === false || data?.valid_format === false)
        throw Error(data.reason || "Invalid tracking number");
      const resolved = { ...data, mode: selected };
      setResult(resolved);
      setTab("Overview");
      onResolved?.(resolved);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        err.response?.data?.reason ||
          (typeof detail === "string" ? detail : null) ||
          err.response?.data?.message ||
          err.message ||
          "Tracking request failed",
      );
    } finally {
      setBusy(false);
    }
  };
  const live = result?.live_tracking;
  const hasLive = Boolean(
    result?.live_supported && live && live.live !== false,
  );
  const route = Array.isArray(live?.route)
    ? live.route
    : [live?.origin, live?.destination].filter(Boolean);
  const flights = Array.isArray(live?.flights) ? live.flights : [];
  const events = Array.isArray(live?.events) ? live.events : [];
  const current =
    live?.current_status || result?.current_status || result?.status;
  const link = safeLink(result?.tracking_url);
  const delivered = /deliver/i.test(current || "");
  const tabs = ["Overview", "Tracking", "Flight Schedule", "Activity Log"];
  return (
    <section className="mt-5 min-w-0 overflow-hidden rounded-2xl border border-slate-200 text-sm shadow-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200  p-4 sm:p-5">
       
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
            Shipment Operations Hub · Active Live Tracker
          </p>
          <h2 className="mt-1 text-xl font-extrabold text-[#0b2942]">
            Shipment Tracking
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Track air waybills and sea containers with live carrier updates.
          </p>
        </div>
       {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-teal-700 hover:bg-teal-50"
          >
            ← Back to Shipment Operations Hub
          </button>
        )}
      </div>
      <div className="p-3 sm:p-5">
        {!initialResult && (
          <form
            onSubmit={track}
            className="flex flex-wrap gap-2 rounded-xl border border-slate-200 bg-white p-3"
          >
            <select
              aria-label="Tracking type"
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-slate-700"
            >
              <option value="auto">Auto detect</option>
              <option value="air">Air AWB</option>
              <option value="sea">Sea container</option>
            </select>
            <input
              required
              aria-label="AWB or container number"
              placeholder="Enter AWB / Container number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="min-w-[180px] flex-1 rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-teal-500"
            />
            <button
              type="submit"
              disabled={busy}
              className="rounded-lg bg-[#009d90] px-5 py-2.5 font-bold text-white hover:bg-[#087e78] disabled:opacity-50"
            >
              {busy ? "Resolving..." : "Resolve"}
            </button>
          </form>
        )}
        {error && (
          <div
            role="alert"
            className="mt-3 flex gap-2 rounded-xl bg-rose-50 p-3 text-rose-700"
          >
            <AlertCircle size={16} />
            {error}
          </div>
        )}
        {result && (
          <div className="mt-4 space-y-4" aria-live="polite">
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4">
              <div className="flex items-center gap-3">
                <span
                  className={`rounded-lg px-3 py-2 text-xs font-bold ${delivered ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
                >
                  {show(current)}
                </span>
                <div>
                  <p className="text-[11px] text-slate-500">
                    {result.mode === "sea" ? "Sea Freight" : "Air Freight"}
                  </p>
                  <h3 className="font-extrabold text-[#0b2942]">
                    {show(
                      result.formatted_awb || result.container || identifier,
                    )}
                  </h3>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
                <span>
                  <strong className="block text-slate-500">Carrier</strong>
                  {show(
                    live?.carrier ||
                      result.carrier?.airline ||
                      result.carrier?.line,
                  )}
                </span>
                <span>
                  <strong className="block text-slate-500">Route</strong>
                  {show(live?.origin)}{" "}
                  <ArrowRight size={12} className="inline" />{" "}
                  {show(live?.destination)}
                </span>
                <span>
                  <strong className="block text-slate-500">Live data</strong>
                  {hasLive ? "Available" : "Carrier link only"}
                </span>
              </div>
            </div>
            <nav
              aria-label="Tracking details"
              className="flex gap-1 overflow-x-auto border-b border-slate-200"
            >
              {tabs.map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className={`shrink-0 border-b-2 px-4 py-3 text-xs font-semibold ${tab === t ? "border-[#009d90] text-[#008d82]" : "border-transparent text-slate-500 hover:text-slate-900"}`}
                >
                  {t}
                </button>
              ))}
            </nav>
            {tab === "Overview" && (
              <>
                <div className="grid gap-4 lg:grid-cols-2">
                  <div className={panel}>
                    <h3 className="mb-5 font-bold text-slate-900">
                      Shipment Status & Tracking
                    </h3>
                    <ol className="space-y-0">
                      {(events.length
                        ? [...events]
                            .reverse()
                            .filter(
                              (e, i, a) =>
                                i === 0 || e.milestone !== a[i - 1].milestone,
                            )
                            .slice(-8)
                        : []
                      ).map((ev, i, a) => (
                        <li
                          key={i}
                          className="relative border-l-2 border-emerald-100 pb-5 pl-6 last:pb-0"
                        >
                          <span
                            className={`absolute -left-[10px] top-0 grid h-[18px] w-[18px] place-items-center rounded-full text-white ${i === a.length - 1 ? "bg-amber-500" : "bg-emerald-500"}`}
                          >
                            <CheckCircle2 size={13} />
                          </span>
                          <p className="font-semibold text-slate-800">
                            {show(ev.event)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {show(ev.from)} → {show(ev.to)}
                          </p>
                          <p className="text-xs text-slate-400">
                            {show(ev.timestamp)}
                          </p>
                        </li>
                      ))}
                      {!events.length && (
                        <li className="text-slate-500">
                          No live milestones supplied by carrier.
                        </li>
                      )}
                    </ol>
                    <button
                      type="button"
                      onClick={() => setTab("Tracking")}
                      className="mt-5 w-full rounded-lg bg-[#edf7f8] px-4 py-2.5 text-xs font-bold text-teal-700"
                    >
                      View Full Tracking History
                    </button>
                  </div>
                  <div className={panel}>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-slate-900">
                        Live Tracking Route
                      </h3>
                      <Route className="text-teal-600" size={18} />
                    </div>
                    <div className="mt-4 flex min-h-[230px] flex-col justify-center rounded-xl border border-[#d7eaf0] bg-gradient-to-br from-[#edf7fb] via-white to-[#e7f8f4] p-5">
                      <div className="flex flex-wrap items-center justify-center gap-2">
                        {route.length ? (
                          route.map((stop, i) => (
                            <div
                              key={`${stop}-${i}`}
                              className="flex items-center gap-2"
                            >
                              <div className="flex min-w-20 flex-col items-center rounded-xl border border-teal-200 bg-white p-3 shadow-sm">
                                <MapPin size={22} className="text-teal-600" />
                                <strong className="mt-2 text-slate-900">
                                  {show(stop)}
                                </strong>
                                <small className="text-slate-500">
                                  {i === 0
                                    ? "Origin"
                                    : i === route.length - 1
                                      ? "Destination"
                                      : "Transit"}
                                </small>
                              </div>
                              {i < route.length - 1 && (
                                <ArrowRight
                                  size={18}
                                  className="text-teal-500"
                                />
                              )}
                            </div>
                          ))
                        ) : (
                          <p className="text-slate-500">Route unavailable</p>
                        )}
                      </div>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4 text-xs sm:grid-cols-3">
                      <div>
                        <span className="text-slate-400">Current status</span>
                        <strong className="mt-1 block text-slate-900">
                          {show(current)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Last update</span>
                        <strong className="mt-1 block text-slate-900">
                          {fmt(live?.fetched_at)}
                        </strong>
                      </div>
                      <div>
                        <span className="text-slate-400">Events</span>
                        <strong className="mt-1 block text-slate-900">
                          {show(
                            live?.event_count ??
                              (hasLive ? events.length : null),
                          )}
                        </strong>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    [MapPin, "Origin", live?.origin],
                    [MapPin, "Destination", live?.destination],
                    [Package, "Pieces", live?.pieces],
                    [
                      Scale,
                      "Weight",
                      live?.weight ||
                        (live?.weight_kg != null
                          ? `${live.weight_kg} Kg`
                          : null),
                    ],
                  ].map(([Icon, label, value]) => (
                    <div key={label} className={panel}>
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Icon size={15} className="text-teal-600" />
                        {label}
                      </div>
                      <p className="mt-2 font-bold text-slate-900">
                        {show(value)}
                      </p>
                    </div>
                  ))}
                </div>
                <div className={panel}>
                  <div className="mb-3 flex items-center justify-between">
                    <h3 className="font-bold text-slate-900">
                      Recent Tracking Activity
                    </h3>
                    <button
                      type="button"
                      onClick={() => setTab("Activity Log")}
                      className="text-xs font-semibold text-teal-700"
                    >
                      View All Events
                    </button>
                  </div>
                  {events.length ? (
                    events.slice(0, 4).map((ev, i) => (
                      <div
                        key={i}
                        className="flex gap-3 border-t border-slate-100 py-3"
                      >
                        <CheckCircle2
                          size={16}
                          className="shrink-0 text-teal-600"
                        />
                        <div>
                          <p className="font-semibold text-slate-800">
                            {show(ev.event)}
                          </p>
                          <p className="mt-1 text-xs text-slate-500">
                            {show(ev.timestamp)} · {show(ev.detail)}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-500">No events available.</p>
                  )}
                </div>
              </>
            )}
            {(tab === "Tracking" || tab === "Activity Log") && (
              <div className={panel}>
                <h3 className="mb-4 font-bold text-slate-900">
                  Tracking History ({events.length})
                </h3>
                {events.length ? (
                  <ol>
                    {events.map((ev, i) => (
                      <li
                        key={i}
                        className="relative border-l-2 border-teal-100 pb-5 pl-6 last:pb-0"
                      >
                        <span
                          className={`absolute -left-[7px] top-0 h-3 w-3 rounded-full ring-4 ring-white ${ev.stage === "current" || ev.dot_color === "green" ? "bg-emerald-500" : "bg-amber-400"}`}
                        />
                        <div className="flex flex-wrap justify-between gap-2">
                          <strong className="text-slate-900">
                            {show(ev.event)}
                          </strong>
                          <span className="text-xs text-slate-500">
                            {show(ev.timestamp)}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-slate-600">
                          {show(ev.detail)}
                        </p>
                        <p className="mt-1 text-[11px] text-teal-700">
                          {[ev.from, ev.to].filter(Boolean).join(" → ")}{" "}
                          {ev.milestone ? `· ${ev.milestone}` : ""}
                        </p>
                      </li>
                    ))}
                  </ol>
                ) : (
                  <p className="text-slate-500">
                    Carrier has not supplied event history.
                  </p>
                )}
              </div>
            )}
            {tab === "Flight Schedule" && (
              <div className={panel}>
                <h3 className="font-bold text-slate-900">
                  {result.mode === "sea"
                    ? "Carrier Schedule"
                    : "Flight Schedule"}
                </h3>
                {flights.length ? (
                  <div className="mt-4 overflow-x-auto">
                    <table className="w-full min-w-[450px] text-left text-xs">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          {["Flight", "From", "To", "Date", "Status"].map(
                            (h) => (
                              <th key={h} className="p-3">
                                {h}
                              </th>
                            ),
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {flights.map((f, i) => (
                          <tr
                            key={i}
                            className="border-t border-slate-100 text-slate-800"
                          >
                            {[f.flight, f.from, f.to, f.date, f.status].map(
                              (v, j) => (
                                <td key={j} className="p-3">
                                  {show(v)}
                                </td>
                              ),
                            )}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="mt-3 text-slate-500">
                    No schedule supplied by the carrier.
                  </p>
                )}
              </div>
            )}
            <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-cyan-100 bg-cyan-50 p-4">
              <p className="max-w-2xl text-xs leading-5 text-slate-600">
                {result.disclaimer ||
                  "Tracking information is provided by the carrier. Verify important shipment details on the official carrier website."}
              </p>
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0b2942] px-4 py-2.5 text-xs font-bold text-white"
                >
                  Track on Carrier Website <ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
