import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Search, Check, Mail, RefreshCw, ChevronLeft, ChevronRight } from "lucide-react";
import API from "../../api/axios";

// The bell and this page deliberately use the same per-user /notifications API.
export default function AlertsNotificationsDashboard() {
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
    setLoading(true); setError("");
    try {
      const { data } = await API.get("/notifications");
      setNotifications(Array.isArray(data?.data) ? data.data : []);
    } catch (e) { setError(e.response?.data?.message || e.response?.data?.msg || "Unable to fetch notifications"); }
    finally { setLoading(false); }
  }, []);
  useEffect(() => {
    load();
    const onFocus = () => load();
    const onChanged = () => load();
    window.addEventListener("focus", onFocus);
    window.addEventListener("cargomate:notifications-changed", onChanged);
    return () => { window.removeEventListener("focus", onFocus); window.removeEventListener("cargomate:notifications-changed", onChanged); };
  }, [load]);
  const categories = [...new Set(notifications.map(n => n.category).filter(Boolean))];
  const urgencies = [...new Set(notifications.map(n => n.urgency).filter(Boolean))];
  const filtered = useMemo(() => notifications.filter(n =>
    (tab === "All" || (tab === "Unread" ? !n.isRead : n.isRead)) &&
    (!category || n.category === category) && (!urgency || n.urgency === urgency) &&
    (!search || `${n.title || ""} ${n.message || ""}`.toLowerCase().includes(search.toLowerCase()))
  ), [notifications, tab, category, urgency, search]);
  const lastPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const currentPage = Math.min(page, lastPage);
  const visible = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const unread = notifications.filter(n => !n.isRead).length;
  const markRead = async (id) => {
    try {
      await API.put(`/notifications/${id}/read`);
      setNotifications(items => items.map(n => n._id === id ? { ...n, isRead:true } : n));
      window.dispatchEvent(new Event("cargomate:notifications-changed"));
    } catch(e) { setError(e.response?.data?.message || "Could not mark read"); }
  };
  const markAll = async () => {
    try {
      await API.put("/notifications/read-all");
      setNotifications(items => items.map(n => ({ ...n, isRead:true })));
      window.dispatchEvent(new Event("cargomate:notifications-changed"));
    } catch(e) { setError(e.response?.data?.message || "Could not mark all as read"); }
  };
  return (
    <div className="cm-module-theme w-full min-h-screen bg-[#f8fafc] p-2 text-xs text-slate-700">
      <div className="flex flex-wrap items-center justify-end gap-2 mb-4">
        <div className="relative"><Search size={14} className="absolute right-3 top-2.5 text-slate-400"/><input value={search} onChange={e=>{setSearch(e.target.value);setPage(1)}} placeholder="Search notifications..." className="rounded-lg border border-slate-200 bg-white py-2 pl-3 pr-9"/></div>
        <select aria-label="Notification type" value={category} onChange={e=>{setCategory(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Types</option>{categories.map(c=><option key={c}>{c}</option>)}</select>
        <select aria-label="Urgency" value={urgency} onChange={e=>{setUrgency(e.target.value);setPage(1)}} className="rounded-lg border border-slate-200 bg-white p-2"><option value="">All Urgency</option>{urgencies.map(u=><option key={u}>{u}</option>)}</select>
        <button onClick={load} aria-label="Refresh" className="rounded-lg border bg-white p-2"><RefreshCw size={15}/></button>
      </div>
      <div className="flex flex-wrap gap-2 items-center mb-4">
        {[["All",notifications.length],["Unread",unread],["Read",notifications.length-unread]].map(([t,count])=><button key={t} onClick={()=>{setTab(t);setPage(1)}} className={`px-3 py-1.5 border rounded-lg font-semibold ${tab===t?"bg-blue-50 text-blue-600 border-blue-200":"bg-white text-slate-600 border-slate-200"}`}>{t} <span className="ml-1">{count}</span></button>)}
        <button onClick={markAll} disabled={!unread} className="inline-flex items-center gap-1 text-blue-600 disabled:opacity-40"><Check size={14}/> Mark all as read</button>
      </div>
      {error && <div role="alert" className="p-3 mb-3 rounded-lg bg-red-50 text-red-700">{error}</div>}
      <div className="rounded-xl bg-white border border-slate-200 overflow-hidden shadow-sm">
        {loading ? <p className="p-6 text-center">Loading notifications...</p> : !visible.length ? <p className="p-6 text-center text-slate-500">No notifications found</p> : <div className="divide-y divide-slate-100">{visible.map(n=><div key={n._id} className="p-4 flex gap-3 items-start hover:bg-slate-50">
          <span className="p-2 rounded-lg bg-blue-50 text-blue-500"><Mail size={15}/></span><div className="flex-1"><p className="font-bold text-slate-900">{n.title}</p><p className="text-slate-500 mt-1">{n.message}</p><p className="text-[10px] text-slate-400 mt-2">{n.category || "System"} · {n.createdAt ? new Date(n.createdAt).toLocaleString("en-IN") : ""}</p></div>
          {!n.isRead ? <button onClick={()=>markRead(n._id)} className="text-blue-600 whitespace-nowrap">Mark read</button> : <span className="text-emerald-600">Read</span>}
        </div>)}</div>}
        <div className="p-3 border-t bg-slate-50 flex items-center justify-between"><span className="text-slate-500">Showing {filtered.length ? (currentPage-1)*pageSize+1 : 0}–{Math.min(currentPage*pageSize, filtered.length)} of {filtered.length}</span><div className="flex items-center gap-2"><button aria-label="Previous page" onClick={()=>setPage(p=>Math.max(1,p-1))} disabled={currentPage===1}><ChevronLeft size={16}/></button><span>{currentPage} / {lastPage}</span><button aria-label="Next page" onClick={()=>setPage(p=>Math.min(lastPage,p+1))} disabled={currentPage===lastPage}><ChevronRight size={16}/></button></div></div>
      </div>
    </div>
  );
}
