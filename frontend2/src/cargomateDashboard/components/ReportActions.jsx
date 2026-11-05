import React,{useState} from "react";
import {Save,Eye,Download,Loader2} from "lucide-react";
import {saveAnalysisReport,getReportPdfBlob,savePdfToDevice} from "../api/savedReports";
export default function ReportActions({module,result,query,name,category="Analytics & Trends"}){
 const [busy,setBusy]=useState(false),[error,setError]=useState(""),[saved,setSaved]=useState(null),[pdfUrl,setPdfUrl]=useState("");
 const close=()=>{if(pdfUrl)URL.revokeObjectURL(pdfUrl);setPdfUrl("");};
 const store=async()=>{setBusy(true);setError("");try{const row=await saveAnalysisReport({name:name||`${module} - ${new Date().toLocaleDateString("en-GB")}`,module,description:query,result,category});setSaved(row);return row;}catch(e){setError(e.message);return null;}finally{setBusy(false);}};
 const pdf=async(download=false)=>{setBusy(true);setError("");try{const row=saved||await store();if(!row?._id)return;if(download)await savePdfToDevice(row._id,row.reportName);else{close();const b=await getReportPdfBlob(row._id,{preview:true});setPdfUrl(URL.createObjectURL(b));}}catch(e){setError(e.message);}finally{setBusy(false);}};
 return <div className="my-4 rounded-2xl border border-teal-100 bg-white p-3 shadow-sm">
  <div className="flex flex-wrap items-center gap-2"><span className="mr-auto text-xs font-semibold text-slate-700">{module} report {saved&&<span className="text-teal-600">• Saved</span>}</span>
  <button disabled={busy||!result} onClick={store} className="rounded-lg border border-teal-200 px-3 py-2 text-xs font-semibold text-teal-700 disabled:opacity-40"><Save size={14} className="mr-1 inline"/>Save Report</button>
  <button disabled={busy||!result} onClick={()=>pdf(false)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs font-semibold disabled:opacity-40"><Eye size={14} className="mr-1 inline"/>View PDF</button>
  <button disabled={busy||!result} onClick={()=>pdf(true)} className="rounded-lg bg-teal-600 px-3 py-2 text-xs font-semibold text-white disabled:opacity-40"><Download size={14} className="mr-1 inline"/>Download PDF</button></div>
  {busy&&<p className="mt-2 text-xs text-slate-500"><Loader2 size={13} className="mr-1 inline animate-spin"/>Processing…</p>}{error&&<p role="alert" className="mt-2 text-xs text-red-600">{error}</p>}
  {pdfUrl&&<div className="fixed inset-0 z-[9999] flex flex-col bg-slate-950/85 p-4"><div className="mx-auto mb-2 flex w-full max-w-5xl justify-between text-white"><span>ASD CargoMate • Report Preview</span><button onClick={close}>✕ Close</button></div><iframe title="Saved report PDF" src={pdfUrl} className="mx-auto h-full w-full max-w-5xl rounded-lg bg-white"/></div>}
 </div>;
}
