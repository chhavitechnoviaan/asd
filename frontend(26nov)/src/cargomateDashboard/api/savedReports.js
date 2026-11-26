import {getSession} from "../../lib/auth";
import {reportRequest} from "../../lib/accountApi";
const base=()=>{const x=(import.meta.env.VITE_API_URL||"http://localhost:8000/api").replace(/\/$/,"");return x.endsWith("/api")?x:`${x}/api`;};
export const listSavedReports=async()=>{const result=await reportRequest("?limit=100");return Array.isArray(result)?result:result?.reports||[];};
export const saveAnalysisReport=async({name,module,description,result,category="Analytics & Trends"})=>{
  if(!result || (typeof result==="object" && !Object.keys(result).length))throw Error("Generate an analysis result before saving");
  const saved=await reportRequest("","POST",{reportName:name,description:description||"",category,module:"Analytics",type:"Analytics",dataSource:module,reportData:result});
  window.dispatchEvent(new Event("cargomate:report-saved"));return saved;
};
export const removeSavedReport=id=>reportRequest(`/${encodeURIComponent(id)}`,"DELETE");
export async function getReportPdfBlob(id,{preview=false}={}) {
  const token=getSession()?.token;if(!token)throw Error("Please sign in again");
  const res=await fetch(`${base()}/reports/${encodeURIComponent(id)}/pdf${preview?"?preview=1":""}`,{headers:{Authorization:`Bearer ${token}`}});
  if(!res.ok){const d=await res.json().catch(()=>({}));throw Error(d.message||`PDF generation failed (${res.status})`);}
  return res.blob();
}
export async function savePdfToDevice(id,filename) {
  const blob=await getReportPdfBlob(id);const url=URL.createObjectURL(blob);
  const a=document.createElement("a");a.href=url;a.download=(filename||"CargoMate-Report").replace(/[^a-z0-9 _.-]/gi,"_")+".pdf";document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),30000);
}
