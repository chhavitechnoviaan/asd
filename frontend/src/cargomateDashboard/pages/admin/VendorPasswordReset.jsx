import { useState } from "react";
import API from "../../api/axios";
import Swal from "sweetalert2";
export default function VendorPasswordReset({vendorId}) {
  const [password,setPassword]=useState("");
  const [confirm,setConfirm]=useState("");
  const [visible,setVisible]=useState(false);
  const [busy,setBusy]=useState(false);
  const [message,setMessage]=useState("");
  const [error,setError]=useState("");
  const save=async(e)=>{
    e.preventDefault();setError("");setMessage("");
    if(password.length<12 || password.length>128) return setError("Password must have 12–128 characters");
    if(password!==confirm)return setError("Passwords do not match");
    const confirmation = await Swal.fire({
      icon: "warning",
      title: "Reset vendor password?",
      text: "The vendor's current sessions will be invalidated.",
      showCancelButton: true,
      confirmButtonText: "Yes, reset password",
      cancelButtonText: "Cancel",
      confirmButtonColor: "#002259",
      cancelButtonColor: "#64748b",
      background: "#ffffff",
      color: "#002259",
      reverseButtons: true,
      customClass: { popup: "rounded-2xl", confirmButton: "rounded-lg", cancelButton: "rounded-lg" },
    });
    if (!confirmation.isConfirmed) return;
    setBusy(true);
    try { await API.patch(`/vendors/${vendorId}/password`,{newPassword:password});setPassword("");setConfirm("");setMessage("Password reset successfully");await Swal.fire({icon:"success",title:"Password updated",text:"Vendor password reset successfully. Existing sessions have been invalidated.",confirmButtonColor:"#14B8A6",background:"#ffffff",color:"#002259",customClass:{popup:"rounded-2xl"}}); }
    catch(e){const msg=e.response?.data?.message||"Password reset failed";setError(msg);await Swal.fire({icon:"error",title:"Password reset failed",text:msg,confirmButtonColor:"#002259",background:"#ffffff",color:"#002259",customClass:{popup:"rounded-2xl"}});}
    finally{setBusy(false);}
  };
  return <form onSubmit={save} className="mt-4 space-y-3 rounded-xl border border-teal-100 bg-white p-4">
    <h4 className="text-sm font-semibold text-[#002259]">Change Vendor Password</h4>
    <p className="text-xs text-slate-500">Main Admin only. Password is never displayed and current sessions will be invalidated.</p>
    <label className="block text-xs font-semibold">New Password<input required autoComplete="new-password" minLength={12} maxLength={128} type={visible?"text":"password"} value={password} onChange={e=>setPassword(e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label>
    <label className="block text-xs font-semibold">Confirm Password<input required autoComplete="new-password" type={visible?"text":"password"} value={confirm} onChange={e=>setConfirm(e.target.value)} className="mt-1 w-full rounded-lg border p-2" /></label>
    <label className="flex items-center gap-2 text-xs"><input type="checkbox" checked={visible} onChange={e=>setVisible(e.target.checked)} /> Show passwords</label>
    {error&&<p role="alert" className="text-xs text-red-600">{error}</p>}{message&&<p role="status" className="text-xs text-teal-700">{message}</p>}
    <button disabled={busy} className="rounded-lg bg-teal-600 px-4 py-2 text-xs font-bold text-white disabled:opacity-60">{busy?"Updating...":"Update Password"}</button>
  </form>;
}
