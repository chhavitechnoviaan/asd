import {useEffect,useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {authApi} from "../lib/auth";
import {usePublicConfig} from "../lib/publicConfig";
import fallbackLogo from "../assets/logo.png";

export default function VerifyEmailPage(){
  const location=useLocation(),navigate=useNavigate(),site=usePublicConfig();
  const token=new URLSearchParams(location.search).get("token")||"";
  const [state,setState]=useState({busy:true,message:"Verifying your email...",ok:false});
  useEffect(()=>{
    let active=true;
    if(!/^[a-f0-9]{64}$/.test(token)){setState({busy:false,ok:false,message:"Invalid verification link."});return;}
    authApi("email-verification/confirm",{token}).then(data=>{if(active)setState({busy:false,ok:true,message:data.message||"Email verified"});})
      .catch(error=>{if(active)setState({busy:false,ok:false,message:error.message});});
    return()=>{active=false};
  },[token]);
  return <div className="min-h-screen bg-[#F9FAFB] grid place-items-center p-4"><main className="bg-white border border-teal-100 shadow-xl rounded-3xl max-w-md w-full p-8 text-center">
    <img src={site.systemLogo||fallbackLogo} alt={site.companyName||"CargoMate"} className="h-16 object-contain mx-auto mb-7"/>
    <div className={`mx-auto rounded-full w-14 h-14 flex items-center justify-center text-2xl mb-4 ${state.ok?"bg-teal-50 text-teal-700":"bg-slate-100 text-slate-600"}`}>{state.busy?"…":state.ok?"✓":"!"}</div>
    <h1 className="text-xl font-bold text-[#002259]">{state.busy?"Verifying Email":state.ok?"Email Verified":"Verification Not Completed"}</h1>
    <p role="status" className="text-slate-500 mt-3">{state.message}</p>
    <button onClick={()=>navigate("/login")} className="mt-7 bg-[#14B8A6] hover:bg-[#0D9488] text-white rounded-xl px-6 py-3 font-semibold">Go to Login</button>
  </main></div>
}
