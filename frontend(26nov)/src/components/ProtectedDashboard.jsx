import {useEffect,useState} from "react";
import {Navigate} from "react-router-dom";
import {authApi,getSession,clearSession} from "../lib/auth";
export default function ProtectedDashboard({role,children}) {const [state,setState]=useState("checking"); const session=getSession(); useEffect(()=>{let active=true;if(!session?.token || session.role!==role){setState("denied");return;} authApi("me", null, session.token)
.then((data) => {
  const userRole = String(
    data.user?.role ||
    data.user?.roleId?.name ||
    data.user?.roleName ||
    ""
  ).trim().toLowerCase();

  if (active) {
    setState(userRole === role ? "allowed" : "denied");
  }
})
.catch(() => {
  clearSession();
  if (active) setState("denied");
});return()=>{active=false}},[role,session?.token]); if(state==="checking")return <div className="min-h-screen grid place-items-center">Checking access…</div>;return state==="allowed"?children:<Navigate to="/login" replace/>}
