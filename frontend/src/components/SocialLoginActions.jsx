import {useEffect,useRef,useState} from "react";
import {usePublicConfig} from "../lib/publicConfig";
import {authApi,saveSession} from "../lib/auth";
import {errorAlert} from "../lib/alerts";
import {useNavigate} from "react-router-dom";
let googleLoader;
function loadGoogle(){if(window.google?.accounts?.id)return Promise.resolve();if(!googleLoader)googleLoader=new Promise((resolve,reject)=>{const script=document.createElement("script");script.src="https://accounts.google.com/gsi/client";script.async=true;script.onload=resolve;script.onerror=reject;document.head.appendChild(script);});return googleLoader;}
let facebookLoader;
function loadFacebook(clientId){if(window.FB)return Promise.resolve();if(!facebookLoader)facebookLoader=new Promise((resolve,reject)=>{window.fbAsyncInit=()=>{window.FB.init({appId:clientId,cookie:false,xfbml:false,version:"v21.0"});resolve();};const script=document.createElement("script");script.src="https://connect.facebook.net/en_US/sdk.js";script.async=true;script.onerror=reject;document.head.appendChild(script);});return facebookLoader;}
export default function SocialLoginActions({role}){
 const site=usePublicConfig(),nav=useNavigate(),googleContainer=useRef(null);const [busy,setBusy]=useState(false);
 const google=site.socialLogin?.google,facebook=site.socialLogin?.facebook;
 const validGoogleClient=/^[0-9]+-[A-Za-z0-9_-]+\.apps\.googleusercontent\.com$/.test(google?.clientId||"");
 const validFacebookApp=/^[0-9]{8,}$/.test(facebook?.clientId||"");
 const finish=async(provider,token)=>{try{setBusy(true);const response=await authApi("social",{provider,token,role});saveSession(response.token,response.user.role);nav(`/${response.user.role}-dashboard`,{replace:true});}catch(e){await errorAlert(e.message);}finally{setBusy(false)}};
 useEffect(()=>{if(!google?.enabled||!validGoogleClient||!googleContainer.current)return;let active=true;loadGoogle().then(()=>{if(!active||!googleContainer.current)return;googleContainer.current.replaceChildren();window.google.accounts.id.initialize({client_id:google.clientId,callback:({credential})=>{if(credential)finish("google",credential)}});window.google.accounts.id.renderButton(googleContainer.current,{theme:"outline",size:"large",width:280,text:"continue_with"});}).catch(()=>{errorAlert("Google sign-in could not load. Check network and Google OAuth settings.");});return()=>{active=false};},[google?.enabled,google?.clientId,role]);
 const facebookLogin=async()=>{if(!validFacebookApp){await errorAlert("Facebook App ID is not configured correctly");return;}try{await loadFacebook(facebook.clientId);window.FB.login(response=>{if(response.authResponse?.accessToken)finish("facebook",response.authResponse.accessToken);},{scope:"public_profile,email"});}catch(e){errorAlert("Facebook login is not available")}};
 if(role==="admin"||(!google?.enabled&&!facebook?.enabled))return null;
 return <div className="mt-4 pt-4 border-t border-slate-100"><p className="text-center text-xs text-slate-400 mb-3">or continue with</p><div className="flex flex-col items-center gap-2">{google?.enabled&&(validGoogleClient?<div ref={googleContainer} aria-label="Login with Google"/>:<p role="alert" className="text-xs text-amber-700">Google login is not configured. Contact the administrator.</p>)}{facebook?.enabled&&<button type="button" disabled={busy} onClick={facebookLogin} className="border border-slate-200 rounded-lg px-5 py-2.5 text-sm w-[280px] hover:bg-slate-50">Continue with Facebook</button>}</div></div>;
}
