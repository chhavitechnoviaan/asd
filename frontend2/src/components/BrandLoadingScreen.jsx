import {useEffect,useState} from "react";
import logo from "../assets/logo.png";
import {apiBase,DEFAULT_SITE} from "../lib/publicConfig";

/** Screen appears only while initial public branding is loading, maximum 3 seconds. */
export default function BrandLoadingScreen({children}){
 const [branding,setBranding]=useState(DEFAULT_SITE),[ready,setReady]=useState(false);
 useEffect(()=>{
  let active=true;
  const controller=new AbortController();
  const timeout=setTimeout(()=>{controller.abort();if(active)setReady(true)},3000);
  fetch(`${apiBase()}/public-config`,{signal:controller.signal,cache:"no-store"})
   .then(r=>{if(!r.ok)throw Error("Branding unavailable");return r.json()})
   .then(body=>{if(active&&body?.data)setBranding({...DEFAULT_SITE,...body.data})})
   .catch(()=>{})
   .finally(()=>{clearTimeout(timeout);if(active)setReady(true)});
  return()=>{active=false;controller.abort();clearTimeout(timeout)};
 },[]);
 if(ready)return children;
 return <div role="status" aria-label="Loading CargoMate" className="fixed inset-0 z-[9999] bg-[#F9FAFB] flex items-center justify-center">
  <div className="flex flex-col items-center gap-5 rounded-3xl bg-white/90 shadow-xl border border-teal-100 py-12 px-16">
   <img src={branding.loadingLogo||branding.systemLogo||logo} alt={branding.companyName||"CargoMate"} className="h-20 max-w-[220px] object-contain"/>
   <div className="w-10 h-10 border-4 border-[#D5F5EF] border-t-[#14B8A6] rounded-full animate-spin"/>
   <span className="text-sm text-[#002259]">{branding.websiteTitle||"Loading CargoMate"}</span>
  </div>
 </div>
}
