import {useEffect,useRef,useState} from "react";
import {createPortal} from "react-dom";
import {useNavigate} from "react-router-dom";
import {accountRequest} from "../lib/accountApi";
import {getAccountSummary} from "../cargomateDashboard/api/SettingsApi";
import {getSession,clearSession,authApi} from "../lib/auth";
import {successAlert,errorAlert} from "../lib/alerts";
export function AccountBadge(){
  const nav=useNavigate();
  const role=getSession()?.role||"user";
  const [user,setUser]=useState(null);
  const [serverKycStatus,setServerKycStatus]=useState(null);
  const [open,setOpen]=useState(false);
  const triggerRef=useRef(null);
  const dropdownRef=useRef(null);
  const [position,setPosition]=useState({top:64,right:12});
  useEffect(()=>{
    if(!open)return;
    const positionDropdown=()=>{
      const rect=triggerRef.current?.getBoundingClientRect();
      if(rect)setPosition({top:Math.min(rect.bottom+8,window.innerHeight-80),right:Math.max(12,window.innerWidth-rect.right)});
    };
    const onOutside=(event)=>{
      if(!triggerRef.current?.contains(event.target) && !dropdownRef.current?.contains(event.target))setOpen(false);
    };
    positionDropdown();
    window.addEventListener("resize",positionDropdown);
    document.addEventListener("pointerdown",onOutside);
    return()=>{window.removeEventListener("resize",positionDropdown);document.removeEventListener("pointerdown",onOutside);};
  },[open]);
  useEffect(()=>{let current=true;accountRequest("/").then(d=>{if(current)setUser(d.user)}).catch(()=>{});return()=>{current=false}},[]);
  useEffect(()=>{if(role!=="b2b")return;let mounted=true;getAccountSummary().then(res=>{const status=res?.data?.data?.user?.kycStatus; if(mounted)setServerKycStatus(status ?? null);}).catch(()=>{});return()=>{mounted=false};},[role]);
  const logout=()=>{clearSession();nav("/login",{replace:true})};
  return <div ref={triggerRef} className="relative group" onMouseEnter={()=>setOpen(true)}>
    <button type="button" aria-expanded={open} onClick={()=>setOpen(v=>!v)} onFocus={()=>setOpen(true)} className="flex items-center gap-2 px-2 py-1 text-left rounded-xl hover:bg-teal-50 focus-visible:outline focus-visible:outline-teal-500" title="Open account menu">
      {user?.profileImage?<img src={user.profileImage} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>:<span className="w-10 h-10 rounded-full bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white flex items-center justify-center font-bold">{(user?.name||role)[0].toUpperCase()}</span>}
      <span className="hidden sm:block"><strong className="block text-xs text-slate-800">{user?.name||"My Account"}</strong><small className="text-slate-500 uppercase">{user?.isInternalStaff ? "SUB-ADMIN" : role}</small>{role === "b2b" && String(serverKycStatus ?? user?.kycStatus ?? "").toLowerCase() === "verified" && <small className="block text-[10px] font-semibold text-emerald-700">✓ KYC Verified</small>}</span>
      <span className="text-slate-400">⌄</span>
    </button>
    {open&&createPortal(<div ref={dropdownRef} className="fixed z-[9999] w-72 max-w-[calc(100vw-24px)]" style={{top:position.top,right:position.right}} onMouseLeave={()=>setOpen(false)} onClick={e=>e.stopPropagation()}>
      <div className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-[0_18px_50px_rgba(0,34,89,0.15)]">
        <div className="p-4 bg-gradient-to-br from-[#0D9488] via-[#14B8A6] to-[#6EDFD0] text-white">
          <p className="text-[10px] uppercase tracking-[0.22em] opacity-90">{user?.isInternalStaff?"Team member":"CargoMate Admin"}</p>
          <p className="mt-1 text-lg font-semibold break-words">{user?.name||"My Account"}</p>
          <p className="mt-1 text-xs break-all opacity-95">{user?.email||""}</p>
          <p className="mt-2 inline-block rounded-full bg-white/20 px-2 py-1 text-xs">{user?.roleId?.name|| (user?.isInternalStaff?"Sub-admin":role.toUpperCase())}</p>
          {role==="b2b" && String(serverKycStatus ?? user?.kycStatus ?? "").toLowerCase()==="verified" && <span className="ml-2 inline-block rounded-full bg-white/20 border border-white/40 px-2 py-1 text-xs font-semibold">✓ KYC Verified</span>}
        </div>
        <div className="p-2 space-y-1">
          <button type="button" onClick={()=>{setOpen(false);nav(`/${role}-profile`)}} className="w-full rounded-lg px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-teal-50">View My Profile</button>
          <button type="button" onClick={logout} className="w-full rounded-lg px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50">Logout</button>
        </div>
      </div>
    </div>, document.body)}
  </div>;
}
export default function AccountProfile({ embedded=false }) {
  const nav=useNavigate();
  const role=getSession()?.role||"user";
  const [staff,setStaff]=useState(null);
  const [user,setUser]=useState(null);
  const [serverKycStatus,setServerKycStatus]=useState(null);
  const [name,setName]=useState("");
  const [phone,setPhone]=useState("");
  const [oldPassword,setOldPassword]=useState("");
  const [newPassword,setNewPassword]=useState("");
  const [busy,setBusy]=useState(false);
  useEffect(()=>{
    let mounted=true;
    if(role==="admin")authApi("me",undefined,getSession()?.token).then(d=>{if(mounted)setStaff(d.user)}).catch(()=>{});
    accountRequest("/").then(d=>{if(mounted){setUser(d.user);setName(d.user?.name||"");setPhone(d.user?.phone||"")}}).catch(e=>errorAlert(e.message));
    return()=>{mounted=false};
  },[role]);
  useEffect(()=>{if(role!=="b2b")return;let mounted=true;getAccountSummary().then(res=>{const status=res?.data?.data?.user?.kycStatus; if(mounted)setServerKycStatus(status ?? null);}).catch(()=>{});return()=>{mounted=false};},[role]);
  const perform=async fn=>{setBusy(true);try{await fn()}catch(e){await errorAlert(e.message)}finally{setBusy(false)}};
  const save=()=>perform(async()=>{const data=await accountRequest("/","PUT",{name,phone});setUser(data);await successAlert("Profile updated successfully")});
  const changePassword=()=>perform(async()=>{
    if(newPassword.length<8)throw Error("New password must have at least 8 characters");
    await accountRequest("/password","PUT",{oldPassword,newPassword});
    setOldPassword("");setNewPassword("");
    await successAlert("Password updated successfully");
  });
  const upload=async file=>{
    if(!file)return;
    if(!["image/png","image/jpeg","image/webp"].includes(file.type)||file.size>2*1024*1024){await errorAlert("Use a JPG, PNG or WebP image under 2 MB");return}
    const reader=new FileReader();reader.onload=()=>perform(async()=>{const data=await accountRequest("/image","POST",{profileImage:reader.result});setUser(data);await successAlert("Profile photo updated")});reader.readAsDataURL(file);
  };
  const displayRole=staff?.isInternalStaff ? (staff?.roleId?.name||"Sub-admin") : role==="admin" ? "Main Admin" : role.toUpperCase();
  const inputs=[{label:"Full name",value:name,set:setName},{label:"Phone number",value:phone,set:setPhone}];
  return <main className={`${embedded?"w-full":"min-h-screen"} bg-[#F9FAFB] p-3 sm:p-6 lg:p-8 text-slate-900`}>
    <div className="mx-auto max-w-5xl space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div><p className="text-xs font-semibold tracking-widest text-teal-600 uppercase">CargoMate workspace</p><h1 className="mt-1 text-2xl font-bold text-[#002259]">My Account</h1><p className="text-sm text-slate-500">Account details, permissions and security</p></div>
        <button onClick={()=>nav(`/${role}-dashboard`)} className="rounded-xl bg-white border border-teal-100 px-4 py-2 text-sm text-teal-700 hover:bg-teal-50">Back to dashboard</button>
      </div>
      <section className="relative overflow-hidden rounded-3xl border border-teal-100 bg-white shadow-[0_15px_55px_rgba(0,34,89,0.06)]">
        <div className="bg-gradient-to-r from-[#0D9488] via-[#14B8A6] to-[#8EE9E0] p-6 sm:p-8 text-white">
          <div className="flex items-center gap-5 flex-wrap">
            {user?.profileImage?<img src={user.profileImage} alt="Your profile" className="h-20 w-20 rounded-2xl border-2 border-white/40 object-cover"/>:<div className="h-20 w-20 rounded-2xl bg-white/20 grid place-items-center text-4xl font-semibold">{(name||"A")[0].toUpperCase()}</div>}
            <div className="min-w-0"><p className="text-xs font-semibold uppercase tracking-[0.24em] opacity-80">{displayRole}</p><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl sm:text-3xl font-semibold break-words">{name||"My Account"}</h2>{role === "b2b" && String(serverKycStatus ?? user?.kycStatus ?? "").toLowerCase() === "verified" && <span className="rounded-full bg-white/25 border border-white/60 px-3 py-1 text-xs font-semibold" title="KYC approved by CargoMate">✓ KYC Verified</span>}</div><p className="text-sm break-all opacity-90 mt-1">{user?.email||""}</p></div>
          </div>
        </div>
        <div className="p-5 sm:p-7 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="space-y-4">
            <h3 className="text-lg font-bold text-[#002259]">Personal information</h3>
            {inputs.map(field=><label key={field.label} className="block text-sm font-medium text-slate-600">{field.label}<input className="block mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100" value={field.value} onChange={e=>field.set(e.target.value)}/></label>)}
            <label className="block text-sm font-medium text-slate-600">Email address<input readOnly value={user?.email||""} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"/></label>
            <label className="block text-sm font-medium text-slate-600">Assigned role<input readOnly value={displayRole} className="mt-1 block w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-500"/></label>
            <div className="flex flex-wrap gap-3"><button disabled={busy} onClick={save} className="rounded-xl bg-[#14B8A6] px-5 py-3 text-white text-sm font-semibold hover:bg-[#0D9488] disabled:opacity-60">Save Profile</button><label className="cursor-pointer rounded-xl border border-teal-200 px-4 py-3 text-sm font-medium text-teal-700 hover:bg-teal-50">Change photo<input type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={e=>upload(e.target.files?.[0])}/></label></div>
          </section>
          <section className="space-y-4">
            <div className="rounded-2xl bg-[#F4FBFA] border border-teal-100 p-5">
              <h3 className="font-bold text-[#002259]">Access & Permissions</h3>
              <p className="text-sm text-slate-500 mt-1">{staff?.isInternalStaff?"Your permissions are assigned by Main Admin.":role==="admin"?"Main Admin has full administrative access.":"Permissions follow your account type."}</p>
              {staff?.isInternalStaff&&<div className="mt-4 space-y-2 max-h-64 overflow-y-auto">{Object.entries(staff.permissions||{}).filter(([,a])=>Object.values(a||{}).some(Boolean)).map(([module,actions])=><div key={module} className="flex justify-between gap-2 border-b border-teal-100 py-2 text-sm"><span className="capitalize font-medium">{module}</span><span className="text-right text-teal-700">{Object.entries(actions||{}).filter(([,v])=>v===true).map(([k])=>k).join(" · ")}</span></div>)}</div>}
            </div>
            <div className="rounded-2xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-[#002259]">Security</h3>
              <input type="password" placeholder="Current password" value={oldPassword} onChange={e=>setOldPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3"/>
              <input type="password" placeholder="New password (8+ characters)" value={newPassword} onChange={e=>setNewPassword(e.target.value)} className="w-full border rounded-xl px-4 py-3"/>
              <button disabled={busy} onClick={changePassword} className="w-full rounded-xl bg-[#002259] px-4 py-3 text-sm font-semibold text-white hover:bg-[#123C73] disabled:opacity-60">Change password</button>
              <button onClick={()=>{clearSession();nav("/login",{replace:true})}} className="w-full text-left text-sm font-medium text-red-600 py-2 hover:underline">Sign out</button>
            </div>
          </section>
        </div>
      </section>
    </div>
  </main>;
}
