import React,{useEffect,useState} from "react";
import {FileText,Eye,Download,Trash2,RefreshCw} from "lucide-react";
import {listSavedReports,getReportPdfBlob,savePdfToDevice,removeSavedReport} from "../api/savedReports";
export default function SavedReportsLibrary(){
 const [reports,setReports]=useState([]),[loading,setLoading]=useState(true),[error,setError]=useState(""),[search,setSearch]=useState(""),[previewUrl,setPreviewUrl]=useState("");
 const load=async()=>{setLoading(true);setError("");try{setReports(await listSavedReports());}catch(e){setError(e.message);}finally{setLoading(false);}};
 useEffect(()=>{load();const listener=()=>load();window.addEventListener("cargomate:report-saved",listener);return()=>window.removeEventListener("cargomate:report-saved",listener);},[]);
 const close=()=>{if(previewUrl)URL.revokeObjectURL(previewUrl);setPreviewUrl("");};
 useEffect(()=>()=>{if(previewUrl)URL.revokeObjectURL(previewUrl);},[previewUrl]);
 const preview=async(id)=>{try{setError("");const blob=await getReportPdfBlob(id,{preview:true});close();setPreviewUrl(URL.createObjectURL(blob));}catch(e){setError(e.message);}};
 const download=async(r)=>{try{setError("");await savePdfToDevice(r._id,r.reportName);}catch(e){setError(e.message);}};
 const remove=async(r)=>{if(!window.confirm(`Delete ${r.reportName}?`))return;try{await removeSavedReport(r._id);setReports(v=>v.filter(x=>x._id!==r._id));}catch(e){setError(e.message);}};
 const shown=reports.filter(r=>`${r.reportName} ${r.dataSource} ${r.description}`.toLowerCase().includes(search.toLowerCase()));
 return <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
 <div className="mb-5 flex flex-wrap items-center justify-between gap-3"><div><h2 className="text-xl font-bold text-[#11203B]">Saved Reports</h2><p className="text-xs text-slate-500">Your analysis archive • PDF preview and download</p></div><button onClick={load} className="rounded-lg border px-3 py-2 text-xs"><RefreshCw size={14} className="mr-1 inline"/>Refresh</button></div>
 <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search reports or analysis module..." className="mb-4 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm"/>
 {error&&<p role="alert" className="mb-3 rounded-lg bg-red-50 p-3 text-xs text-red-700">{error}</p>}
 {loading?<p className="text-sm text-slate-500">Loading saved reports...</p>:!shown.length?<p className="rounded-xl bg-slate-50 p-8 text-center text-sm text-slate-500">No saved reports found. Run an analysis and choose Save Report.</p>:<div className="grid gap-3">{shown.map(r=><article key={r._id} className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 p-3 hover:border-teal-300"><div className="rounded-lg bg-teal-50 p-2 text-teal-700"><FileText size={20}/></div><div className="min-w-[180px] flex-1"><h3 className="text-sm font-bold text-slate-900">{r.reportName}</h3><p className="text-xs text-slate-500">{r.dataSource||r.module} • {new Date(r.createdAt).toLocaleString("en-IN")}</p><p className="mt-1 line-clamp-1 text-xs text-slate-600">{r.description}</p></div><button onClick={()=>preview(r._id)} className="rounded-lg border px-3 py-2 text-xs"><Eye size={14} className="mr-1 inline"/>View PDF</button><button onClick={()=>download(r)} className="rounded-lg bg-teal-600 px-3 py-2 text-xs text-white"><Download size={14} className="mr-1 inline"/>Download</button><button title="Delete report" onClick={()=>remove(r)} className="rounded-lg border border-red-100 p-2 text-red-500"><Trash2 size={15}/></button></article>)}</div>}
 {previewUrl&&<div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/90 p-4"><div className="mx-auto mb-2 flex w-full max-w-5xl justify-between text-sm text-white"><strong>ASD CargoMate — PDF Preview</strong><button onClick={close}>✕ Close</button></div><iframe title="PDF Preview" src={previewUrl} className="mx-auto h-full w-full max-w-5xl rounded-lg bg-white"/></div>}
 </section>;
}
