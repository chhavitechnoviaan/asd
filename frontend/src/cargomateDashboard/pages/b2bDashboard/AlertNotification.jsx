// // // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // // import { Search, Check, Mail, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
// // // import API from "../../api/axios";

// // // // The bell and this page deliberately use the same per-user /notifications API.
// // // export default function AlertsNotificationsDashboard() {
// // //   const [notifications, setNotifications] = useState([]);
// // //   const [loading, setLoading] = useState(true);
// // //   const [error, setError] = useState("");
// // //   const [tab, setTab] = useState("All");
// // //   const [search, setSearch] = useState("");
// // //   const [category, setCategory] = useState("");
// // //   const [urgency, setUrgency] = useState("");
// // //   const [page, setPage] = useState(1);
// // //   const pageSize = 10;
// // //   const load = useCallback(async () => {
// // //     setLoading(true); setError("");
// // //     try {
// // //       const { data } = await API.get("/notifications");
// // //       setNotifications(Array.isArray(data?.data) ? data.data : []);
// // //     } catch (e) { setError(e.response?.data?.message || e.response?.data?.msg || "Unable to fetch notifications"); }
// // //     finally { setLoading(false); }
// // //   }, []);
// // //   useEffect(() => {
// // //     load();
// // //     const onFocus = () => load();
// // //     const onChanged = () => load();
// // //     window.addEventListener("focus", onFocus);
// // //     window.addEventListener("cargomate:notifications-changed", onChanged);
// // //     return () => { window.removeEventListener("focus", onFocus); window.removeEventListener("cargomate:notifications-changed", onChanged); };
// // //   }, [load]);
// // //   const categories = [...new Set(notifications.map(n => n.category).filter(Boolean))];
// // //   const urgencies = [...new Set(notifications.map(n => n.urgency).filter(Boolean))];
// // //   const filtered = useMemo(() => notifications.filter(n =>
// // //     (tab === "All" || (tab === "Unread" ? !n.isRead : n.isRead)) &&
// // //     (!category || n.category === category) && (!urgency || n.urgency === urgency) &&
// // //     (!search || `${n.title || ""} ${n.message || ""}`.toLowerCase().includes(search.toLowerCase()))
// // //   ), [notifications, tab, category, urgency, search]);
// // //   const lastPage = Math.max(1, Math.ceil(filtered.length / pageSize));
// // //   const currentPage = Math.min(page, lastPage);
// // //   const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// // //   const unread = notifications.filter(n => !n.isRead).length;
// // //   const markRead = async (id) => {
// // //     try {
// // //       await API.put(`/notifications/${id}/read`);
// // //       setNotifications(items => items.map(n => n._id === id ? { ...n, isRead:true } : n));
// // //       window.dispatchEvent(new Event("cargomate:notifications-changed"));
// // //     } catch(e) { setError(e.response?.data?.message || "Could not mark read"); }
// // //   };
// // //   const markAll = async () => {
// // //     try {
// // //       await API.put("/notifications/read-all");
// // //       setNotifications(items => items.map(n => ({ ...n, isRead:true })));
// // //       window.dispatchEvent(new Event("cargomate:notifications-changed"));
// // //     } catch(e) { setError(e.response?.data?.message || "Could not mark all as read"); }
// // //   };
// // //   return (
// // //     <div className="cm-module-theme w-full min-h-screen bg-[#f8fafc] p-2 text-xs text-slate-700">
// // //       <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
// // //         <div className="relative"><Search size={14} className="absolute right-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search notifications..." className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9"/></div>
// // //         <select aria-label="Notification type" value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Types</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
// // //         <select aria-label="Urgency" value={urgency} onChange={e=>{setUrgency(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Urgency</option>{urgencies.map(u=><option key={u}>{u}</option>)}</select>
// // //         <button onClick={load} aria-label="Refresh" className="rounded-lg border bg-white p-2"><RefreshCw size={15}/></button>
// // //       </div>
// // //       <div className="flex flex-wrap gap-2 items-center mb-4">
// // //         {[["All",notifications.length],["Unread",unread],["Read",notifications.length-unread]].map(([t,count])=><button key={t} onClick={()=>{setTab(t);setPage(1)}} className={`px-3 py-1.5 border rounded-lg font-semibold ${tab===t?"bg-blue-50 text-blue-600 border-blue-200":"bg-white text-slate-600 border-slate-200"}`}>{t} <span className="ml-1">{count}</span></button>)}
// // //         <button onClick={markAll} disabled={!unread} className="inline-flex items-center gap-1 text-blue-600 disabled:opacity-40"><Check size={14}/> Mark all as read</button>
// // //       </div>
// // //       {error && <div role="alert" className="p-3 mb-3 rounded-lg bg-red-50 text-red-700">{error}</div>}
// // //       <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
// // //         {loading ? <p className="p-6 text-center">Loading notifications...</p> : !visible.length ? <p className="p-6 text-center text-slate-500">No notifications found</p> : <div className="divide-y divide-slate-100">{visible.map(n=><div key={n._id} className="p-4 flex gap-3 items-start hover:bg-slate-50">
// // //           <span className="p-2 rounded-lg bg-blue-50 text-blue-500"><Mail size={15}/></span><div className="flex-1"><p className="font-bold text-slate-900">{n.title}</p><p className="text-slate-500 mt-1">{n.message}</p><p className="text-[10px] text-slate-400 mt-2">{n.category || "System"} · {n.createdAt ? new Date(n.createdAt).toLocaleString("en-IN") : ""}</p></div>
// // //           {!n.isRead ? <button onClick={()=>markRead(n._id)} className="text-blue-600 whitespace-nowrap">Mark read</button> : <span className="text-emerald-600">Read</span>}
// // //         </div>)}</div>}
// // //         <div className="p-3 border-t bg-slate-50 flex items-center justify-between"><span className="text-slate-500">Showing {filtered.length ? (currentPage-1)*pageSize+1 : 0}–{Math.min(currentPage*pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-2"><button aria-label="Previous page" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={currentPage===1}><ChevronLeft size={16}/></button><span>{currentPage} / {lastPage}</span><button aria-label="Next page" onClick={()=>setPage(p=>Math.min(lastPage,p+1))} disabled={currentPage===lastPage}><ChevronRight size={16}/></button></div></div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import React, { useCallback, useEffect, useMemo, useState } from "react";
// // import { Search, Check, Mail, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
// // import API from "../../api/axios";

// // // The bell and this page deliberately use the same per-user /notifications API.
// // export default function AlertsNotificationsDashboard() {
// //   const [notifications, setNotifications] = useState([]);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");
// //   const [tab, setTab] = useState("All");
// //   const [search, setSearch] = useState("");
// //   const [category, setCategory] = useState("");
// //   const [urgency, setUrgency] = useState("");
// //   const [page, setPage] = useState(1);
// //   const pageSize = 10;
// //   const load = useCallback(async () => {
// //     setLoading(true); setError("");
// //     try {
// //       const { data } = await API.get("/notifications");
// //       setNotifications(Array.isArray(data?.data) ? [...data.data].sort((a,b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)) : []);
// //     } catch (e) { setError(e.response?.data?.message || e.response?.data?.msg || "Unable to fetch notifications"); }
// //     finally { setLoading(false); }
// //   }, []);
// //   useEffect(() => {
// //     load();
// //     const onFocus = () => load();
// //     const onChanged = () => load();
// //     window.addEventListener("focus", onFocus);
// //     window.addEventListener("cargomate:notifications-changed", onChanged);
// //     return () => { window.removeEventListener("focus", onFocus); window.removeEventListener("cargomate:notifications-changed", onChanged); };
// //   }, [load]);
// //   const categories = [...new Set(notifications.map(n => n.category).filter(Boolean))];
// //   const urgencies = [...new Set(notifications.map(n => n.urgency).filter(Boolean))];
// //   const filtered = useMemo(() => notifications.filter(n =>
// //     (tab === "All" || (tab === "Unread" ? !n.isRead : n.isRead)) &&
// //     (!category || n.category === category) && (!urgency || n.urgency === urgency) &&
// //     (!search || `${n.title || ""} ${n.message || ""}`.toLowerCase().includes(search.toLowerCase()))
// //   ), [notifications, tab, category, urgency, search]);
// //   const lastPage = Math.max(1, Math.ceil(filtered.length / pageSize));
// //   const currentPage = Math.min(page, lastPage);
// //   const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
// //   const unread = notifications.filter(n => !n.isRead).length;
// //   const markRead = async (id) => {
// //     try {
// //       await API.put(`/notifications/${id}/read`);
// //       setNotifications(items => items.map(n => n._id === id ? { ...n, isRead:true } : n));
// //       window.dispatchEvent(new Event("cargomate:notifications-changed"));
// //     } catch(e) { setError(e.response?.data?.message || "Could not mark read"); }
// //   };
// //   const markAll = async () => {
// //     try {
// //       await API.put("/notifications/read-all");
// //       setNotifications(items => items.map(n => ({ ...n, isRead:true })));
// //       window.dispatchEvent(new Event("cargomate:notifications-changed"));
// //     } catch(e) { setError(e.response?.data?.message || "Could not mark all as read"); }
// //   };
// //   return (
// //     <div className="cm-module-theme w-full min-h-screen bg-[#f8fafc] p-2 text-xs text-slate-700">
// //       <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
// //         <div className="relative"><Search size={14} className="absolute right-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search notifications..." className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9"/></div>
// //         <select aria-label="Notification type" value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Types</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
// //         <select aria-label="Urgency" value={urgency} onChange={e=>{setUrgency(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Urgency</option>{urgencies.map(u=><option key={u}>{u}</option>)}</select>
// //         <button onClick={load} aria-label="Refresh" className="rounded-lg border bg-white p-2"><RefreshCw size={15}/></button>
// //       </div>
// //       <div className="flex flex-wrap gap-2 items-center mb-4">
// //         {[["All",notifications.length],["Unread",unread],["Read",notifications.length-unread]].map(([t,count])=><button key={t} onClick={()=>{setTab(t);setPage(1)}} className={`px-3 py-1.5 border rounded-lg font-semibold ${tab===t?"bg-blue-50 text-blue-600 border-blue-200":"bg-white text-slate-600 border-slate-200"}`}>{t} <span className="ml-1">{count}</span></button>)}
// //         <button onClick={markAll} disabled={!unread} className="inline-flex items-center gap-1 text-blue-600 disabled:opacity-40"><Check size={14}/> Mark all as read</button>
// //       </div>
// //       {error && <div role="alert" className="p-3 mb-3 rounded-lg bg-red-50 text-red-700">{error}</div>}
// //       <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
// //         {loading ? <p className="p-6 text-center">Loading notifications...</p> : !visible.length ? <p className="p-6 text-center text-slate-500">No notifications found</p> : <div className="divide-y divide-slate-100">{visible.map(n=><div key={n._id} className="p-4 flex gap-3 items-start hover:bg-slate-50">
// //           <span className="p-2 rounded-lg bg-blue-50 text-blue-500"><Mail size={15}/></span><div className="flex-1"><p className="font-bold text-slate-900">{n.title}</p><p className="text-slate-500 mt-1">{n.message}</p><p className="text-[10px] text-slate-400 mt-2">{n.category || "System"} · {n.createdAt ? new Date(n.createdAt).toLocaleString("en-IN") : ""}</p></div>
// //           {!n.isRead ? <button onClick={()=>markRead(n._id)} className="text-blue-600 whitespace-nowrap">Mark read</button> : <span className="text-emerald-600">Read</span>}
// //         </div>)}</div>}
// //         <div className="p-3 border-t bg-slate-50 flex items-center justify-between"><span className="text-slate-500">Showing {filtered.length ? (currentPage-1)*pageSize+1 : 0}–{Math.min(currentPage*pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-2"><button aria-label="Previous page" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={currentPage===1}><ChevronLeft size={16}/></button><span>{currentPage} / {lastPage}</span><button aria-label="Next page" onClick={()=>setPage(p=>Math.min(lastPage,p+1))} disabled={currentPage===lastPage}><ChevronRight size={16}/></button></div></div>
// //       </div>
// //     </div>
// //   );
// // }

// import React, { useCallback, useEffect, useMemo, useState } from "react";
// import { Search, Check, Mail, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
// import API from "../../api/axios";

// // The bell and this page deliberately use the same per-user /notifications API.
// export default function AlertsNotificationsDashboard({onBack,onChanged} = {}) {
//   const [notifications, setNotifications] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [tab, setTab] = useState("All");
//   const [search, setSearch] = useState("");
//   const [category, setCategory] = useState("");
//   const [urgency, setUrgency] = useState("");
//   const [page, setPage] = useState(1);
//   const pageSize = 10;
//   const load = useCallback(async () => {
//     setLoading(true); setError("");
//     try {
//       const { data } = await API.get("/notifications");
//       setNotifications(Array.isArray(data?.data) ? [...data.data].sort((a,b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)) : []);
//     } catch (e) { setError(e.response?.data?.message || e.response?.data?.msg || "Unable to fetch notifications"); }
//     finally { setLoading(false); }
//   }, []);
//   useEffect(() => {
//     load();
//     const timer = window.setInterval(load, 60000);
//     const onFocus = () => load();
//     const onChanged = () => load();
//     window.addEventListener("focus", onFocus);
//     window.addEventListener("cargomate:notifications-changed", onChanged);
//     return () => { window.clearInterval(timer); window.removeEventListener("focus", onFocus); window.removeEventListener("cargomate:notifications-changed", onChanged); };
//   }, [load]);
//   const categories = [...new Set(notifications.map(n => n.category).filter(Boolean))];
//   const urgencies = [...new Set(notifications.map(n => n.urgency).filter(Boolean))];
//   const filtered = useMemo(() => notifications.filter(n =>
//     (tab === "All" || (tab === "Unread" ? !n.isRead : n.isRead)) &&
//     (!category || n.category === category) && (!urgency || n.urgency === urgency) &&
//     (!search || `${n.title || ""} ${n.message || ""}`.toLowerCase().includes(search.toLowerCase()))
//   ), [notifications, tab, category, urgency, search]);
//   const lastPage = Math.max(1, Math.ceil(filtered.length / pageSize));
//   const currentPage = Math.min(page, lastPage);
//   const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
//   const unread = notifications.filter(n => !n.isRead).length;
//   const markRead = async (id) => {
//     try {
//       await API.put(`/notifications/${id}/read`);
//       setNotifications(items => items.map(n => n._id === id ? { ...n, isRead:true } : n));
//       window.dispatchEvent(new Event("cargomate:notifications-changed")); onChanged?.();
//     } catch(e) { setError(e.response?.data?.message || "Could not mark read"); }
//   };
//   const markAll = async () => {
//     try {
//       await API.put("/notifications/read-all");
//       setNotifications(items => items.map(n => ({ ...n, isRead:true })));
//       window.dispatchEvent(new Event("cargomate:notifications-changed")); onChanged?.();
//     } catch(e) { setError(e.response?.data?.message || "Could not mark all as read"); }
//   };
//   return (
//     <div className="cm-module-theme w-full min-h-screen bg-[#f8fafc] p-2 text-xs text-slate-700">
//       <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
//         {onBack && <button onClick={onBack} className="mr-auto rounded-lg border bg-white px-3 py-2">Dashboard</button>}
//         <div className="relative"><Search size={14} className="absolute right-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search notifications..." className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9"/></div>
//         <select aria-label="Notification type" value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Types</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
//         <select aria-label="Urgency" value={urgency} onChange={e=>{setUrgency(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Urgency</option>{urgencies.map(u=><option key={u}>{u}</option>)}</select>
//         <button onClick={load} aria-label="Refresh" className="rounded-lg border bg-white p-2"><RefreshCw size={15}/></button>
//       </div>
//       <div className="flex flex-wrap gap-2 items-center mb-4">
//         {[["All",notifications.length],["Unread",unread],["Read",notifications.length-unread]].map(([t,count])=><button key={t} onClick={()=>{setTab(t);setPage(1)}} className={`px-3 py-1.5 border rounded-lg font-semibold ${tab===t?"bg-blue-50 text-blue-600 border-blue-200":"bg-white text-slate-600 border-slate-200"}`}>{t} <span className="ml-1">{count}</span></button>)}
//         <button onClick={markAll} disabled={!unread} className="inline-flex items-center gap-1 text-blue-600 disabled:opacity-40"><Check size={14}/> Mark all as read</button>
//       </div>
//       {error && <div role="alert" className="p-3 mb-3 rounded-lg bg-red-50 text-red-700">{error}</div>}
//       <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
//         {loading ? <p className="p-6 text-center">Loading notifications...</p> : !visible.length ? <p className="p-6 text-center text-slate-500">No notifications found</p> : <div className="divide-y divide-slate-100">{visible.map(n=><div key={n._id} className="p-4 flex gap-3 items-start hover:bg-slate-50" style={{backgroundColor:n.isRead?undefined:"#effcf9"}}>
//           <span className="p-2 rounded-lg bg-blue-50 text-blue-500"><Mail size={15}/></span><div className="flex-1"><p className="font-bold text-slate-900">{n.title}</p><p className="text-slate-500 mt-1">{n.message}</p><p className="text-[10px] text-slate-400 mt-2">{n.category || "System"} · {n.emailStatus ? `Email: ${n.emailStatus === "sent" ? "Accepted by provider" : n.emailStatus} · ` : ""}{n.createdAt ? new Date(n.createdAt).toLocaleString("en-IN", {timeZone:"Asia/Kolkata"}) + " IST" : ""}</p></div>
//           {!n.isRead ? <button onClick={()=>markRead(n._id)} className="text-blue-600 whitespace-nowrap">Mark read</button> : <span className="text-emerald-600">Read</span>}
//         </div>)}</div>}
//         <div className="p-3 border-t bg-slate-50 flex items-center justify-between"><span className="text-slate-500">Showing {filtered.length ? (currentPage-1)*pageSize+1 : 0}–{Math.min(currentPage*pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-2"><button aria-label="Previous page" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={currentPage===1}><ChevronLeft size={16}/></button><span>{currentPage} / {lastPage}</span><button aria-label="Next page" onClick={()=>setPage(p=>Math.min(lastPage,p+1))} disabled={currentPage===lastPage}><ChevronRight size={16}/></button></div></div>
//       </div>
//     </div>
//   );
// }
import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  Search,
  Check,
  Mail,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Bell,
  CheckCheck,
  Shield,
  CreditCard,
  Package,
  FileText,
  Clock,
  UserRound,
} from "lucide-react";
import API from "../../api/axios";

// Keep legacy messages readable without exposing raw account identifiers.
function NotificationDetails({ message }) {
  const parts = String(message || "").split(/\s*\|\s*/);
  const details = [];
  const body = [];
  for (const part of parts) {
    const match = part.match(
      /^(Affected account name|Affected account ID|Account role|Performed by role|Performed by|Role|Reason):\s*(.*)$/i,
    );
    if (!match) {
      body.push(part);
      continue;
    }
    if (/account id/i.test(match[1])) continue;
    details.push([match[1].replace(/^Role$/i, "Staff role"), match[2]]);
  }
  const text = body.join(" | ");
  const reason = text.match(/^(.*?)\s+Reason:\s*(.+)$/is);
  if (reason) details.unshift(["Reason", reason[2]]);
  return (
    <>
      <p className="text-sm leading-relaxed text-slate-600 break-words">
        {reason ? reason[1] : text}
      </p>
      {details.length > 0 && (
        <dl className="mt-3 grid grid-cols-1 gap-x-6 gap-y-2 rounded-xl border border-slate-200/70 bg-slate-50 p-4 sm:grid-cols-2 xl:grid-cols-3">
          {details.map(([label, value], i) => (
            <div key={i} className="min-w-0">
              <dt className="text-[11px] font-medium capitalize text-slate-500">
                {label}
              </dt>
              <dd className="mt-0.5 break-words text-sm font-medium text-slate-800">
                {value}
              </dd>
            </div>
          ))}
        </dl>
      )}
    </>
  );
}
function eventIcon(n) {
  const t = `${n.category || ""} ${n.title || ""}`.toLowerCase();
  if (/denied|security|unauthorized/.test(t))
    return [Shield, "bg-rose-50 text-rose-600"];
  if (/payment|invoice|subscription|plan/.test(t))
    return [CreditCard, "bg-blue-50 text-blue-600"];
  if (/shipment|tracking/.test(t))
    return [Package, "bg-indigo-50 text-indigo-600"];
  if (/document|report/.test(t))
    return [FileText, "bg-violet-50 text-violet-600"];
  if (/staff|sub-admin|account|kyc/.test(t))
    return [UserRound, "bg-sky-50 text-sky-600"];
  return [Bell, "bg-slate-100 text-slate-600"];
}
const emailLabels = {
  sent: "Email accepted",
  pending: "Email queued",
  sending: "Email sending",
  failed: "Email failed",
  "not queued": "Email not queued",
};

// The bell and this page deliberately use the same per-user /notifications API.
export default function AlertsNotificationsDashboard({
  onBack,
  onChanged,
} = {}) {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [tab, setTab] = useState("All");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [urgency, setUrgency] = useState("");
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/notifications");
      setNotifications(
        Array.isArray(data?.data)
          ? [...data.data].sort(
              (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0),
            )
          : [],
      );
    } catch (e) {
      setError(
        e.response?.data?.message ||
          e.response?.data?.msg ||
          "Unable to fetch notifications",
      );
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
    const timer = window.setInterval(load, 60000);
    const onFocus = () => load();
    const onChanged = () => load();
    window.addEventListener("focus", onFocus);
    window.addEventListener("cargomate:notifications-changed", onChanged);
    return () => {
      window.clearInterval(timer);
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("cargomate:notifications-changed", onChanged);
    };
  }, [load]);
  const categories = [
    ...new Set(notifications.map((n) => n.category).filter(Boolean)),
  ];
  const urgencies = [
    ...new Set(notifications.map((n) => n.urgency).filter(Boolean)),
  ];
  const filtered = useMemo(
    () =>
      notifications.filter(
        (n) =>
          (tab === "All" || (tab === "Unread" ? !n.isRead : n.isRead)) &&
          (!category || n.category === category) &&
          (!urgency || n.urgency === urgency) &&
          (!search ||
            `${n.title || ""} ${n.message || ""}`
              .toLowerCase()
              .includes(search.toLowerCase())),
      ),
    [notifications, tab, category, urgency, search],
  );
  const lastPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, lastPage);
  const visible = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize,
  );
  const unread = notifications.filter((n) => !n.isRead).length;
  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications((items) =>
        items.map((n) => (n._id === id ? { ...n, isRead: true } : n)),
      );
      window.dispatchEvent(new Event("cargomate:notifications-changed"));
      onChanged?.();
    } catch (e) {
      setError(e.response?.data?.message || "Could not mark read");
    }
  };
  const markAll = async () => {
    try {
      await API.put("/notifications/read-all");
      setNotifications((items) => items.map((n) => ({ ...n, isRead: true })));
      window.dispatchEvent(new Event("cargomate:notifications-changed"));
      onChanged?.();
    } catch (e) {
      setError(e.response?.data?.message || "Could not mark all as read");
    }
  };
  return (
    <div className="w-full min-w-0 space-y-5 bg-slate-100/80 p-1 text-sm text-slate-700 sm:p-1">
      {/* <header className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-blue-600 text-white shadow-sm">
            <Bell size={23} />
          </span>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
              Notifications
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              Stay up to date with your account activity.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2"
            >
              Dashboard
            </button>
          )}
          <button
            onClick={load}
            aria-label="Refresh notifications"
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 hover:bg-slate-100"
          >
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />{" "}
            Refresh
          </button>
        </div>
      </header> */}
      <div className="grid grid-cols-3 gap-2 sm:gap-4">
        {[
          ["All", notifications.length, Bell],
          ["Unread", unread, Mail],
          ["Read", notifications.length - unread, CheckCheck],
        ].map(([t, count, Icon]) => (
          <button
            key={t}
            aria-pressed={tab === t}
            onClick={() => {
              setTab(t);
              setPage(1);
            }}
            className={`flex min-w-0 items-center gap-3 rounded-xl border p-3 text-left transition sm:p-4 ${tab === t ? "border-blue-300 bg-blue-50 ring-1 ring-blue-100" : "border-slate-200 bg-white hover:border-blue-200"}`}
          >
            <Icon
              size={20}
              className="hidden shrink-0 text-blue-600 sm:block"
            />
            <span>
              <span className="block text-xs font-medium text-slate-500">
                {t}
              </span>
              <span className="block text-xl font-bold text-slate-900">
                {count}
              </span>
            </span>
          </button>
        ))}
      </div>
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="relative min-w-[180px] flex-1">
            <Search
              size={16}
              className="absolute left-3 top-3 text-slate-400"
            />
            <input
              aria-label="Search notifications"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search notifications..."
              className="w-full rounded-lg border border-slate-200 py-2.5 pl-9 pr-3 outline-none focus:border-blue-500"
            />
          </div>
          <select
            aria-label="Notification type"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setPage(1);
            }}
            className="max-w-full rounded-lg border border-slate-200 bg-white p-2.5"
          >
            <option value="">All Types</option>
            {categories.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            aria-label="Urgency"
            value={urgency}
            onChange={(e) => {
              setUrgency(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-slate-200 bg-white p-2.5"
          >
            <option value="">All Urgency</option>
            {urgencies.map((u) => (
              <option key={u}>{u}</option>
            ))}
          </select>
          <button
            onClick={markAll}
            disabled={!unread}
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 font-medium text-blue-600 hover:bg-blue-50 disabled:opacity-40"
          >
            <CheckCheck size={16} /> Mark all as read
          </button>
        </div>
        {error && (
          <div
            role="alert"
            className="m-4 rounded-lg bg-red-50 p-3 text-red-700"
          >
            {error}
          </div>
        )}
        {loading && !notifications.length ? (
          <p className="p-12 text-center text-slate-500">
            Loading notifications...
          </p>
        ) : !visible.length ? (
          <div className="p-12 text-center text-slate-500">
            <Bell className="mx-auto mb-3 text-slate-300" size={32} />
            <p>No notifications found</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {visible.map((n) => {
              const [Icon, tone] = eventIcon(n);
              return (
                <article
                  key={n._id}
                  className={`relative flex items-start gap-3 rounded-2xl border bg-white p-4 shadow-sm transition-all duration-200 hover:border-blue-400 hover:shadow-lg motion-safe:hover:-translate-y-0.5 sm:gap-4 sm:p-5 ${n.isRead ? "border-slate-200" : "border-blue-200 ring-1 ring-blue-100"}`}
                >
                  <span
                    className={`grid h-10 w-10 shrink-0 place-items-center rounded-xl ${tone}`}
                  >
                    <Icon size={19} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-start justify-between gap-2">
                      <h3 className="flex items-center gap-2 text-sm font-semibold text-slate-900 sm:text-base">
                        {!n.isRead && (
                          <span
                            className="shrink-0 rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-blue-700"
                            aria-label="Unread"
                          >
                            New
                          </span>
                        )}
                        {n.title}
                      </h3>
                      {!n.isRead ? (
                        <button
                          onClick={() => markRead(n._id)}
                          className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:border-blue-400 hover:bg-blue-100"
                        >
                          <Check size={14} /> Mark read
                        </button>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                          <Check size={14} /> Read
                        </span>
                      )}
                    </div>
                    <div className="mt-1.5">
                      <NotificationDetails message={n.message} />
                    </div>
                    <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-slate-100 pt-3 text-xs text-slate-500">
                      <span className="rounded-md bg-slate-100 px-2 py-1 font-medium text-slate-600">
                        {n.category || "System"}
                      </span>
                      {n.emailStatus && (
                        <span
                          className={`inline-flex items-center gap-1 ${n.emailStatus === "failed" ? "text-rose-600" : n.emailStatus === "sent" ? "text-emerald-700" : "text-slate-500"}`}
                        >
                          <Mail size={13} />
                          {emailLabels[n.emailStatus] || n.emailStatus}
                        </span>
                      )}
                      {n.createdAt && (
                        <time
                          className="inline-flex items-center gap-1"
                          dateTime={n.createdAt}
                        >
                          <Clock size={13} />
                          {new Date(n.createdAt).toLocaleString("en-IN", {
                            timeZone: "Asia/Kolkata",
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}{" "}
                          IST
                        </time>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
        <footer className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm text-xs text-slate-500">
          <span>
            Showing {filtered.length ? (currentPage - 1) * pageSize + 1 : 0}–
            {Math.min(currentPage * pageSize, filtered.length)} of{" "}
            {filtered.length} notifications
          </span>
          <div className="flex items-center gap-3">
            <button
              aria-label="Previous page"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>
            <span>
              Page {currentPage} of {lastPage}
            </span>
            <button
              aria-label="Next page"
              onClick={() => setPage((p) => Math.min(lastPage, p + 1))}
              disabled={currentPage === lastPage}
              className="rounded-lg border border-slate-200 bg-white p-2 disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </footer>
      </section>
    </div>
  );
}
