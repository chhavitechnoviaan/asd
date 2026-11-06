// import {
//   FiX,
//   FiTruck,
//   FiCalendar,
//   FiChevronDown,
//   FiInfo,
//   FiWifi,
//   FiMapPin,
//   FiBox,
//   FiCheck,
//   FiDownload,
//   FiAlertTriangle,
//   FiEdit3,
//   FiLink2,
//   FiArrowLeft,
//   FiSave,
//   FiPlus,
//   FiCopy,
//   FiStar,
//   FiTrendingUp,
//   FiDatabase,
//   FiAlertCircle,
//   FiAnchor,
//   FiCpu,
//   FiHash,
//   FiGift,
//   FiMap,
//   FiFile,
//   FiPackage,
//   FiRadio,
//   FiFileText,
//   FiUsers,
//   FiBookmark,
//   FiClipboard,
//   FiBarChart2,
//   FiCreditCard,
//   FiBell,
//   FiHelpCircle,
//   FiSettings,
//   FiChevronRight,
//   FiShare2,
//   FiSend,
//   FiClock,
//   FiDollarSign,
//   FiAward,
//   FiShoppingCart,
//   FiFolder,
//   FiPercent,
//   FiShield,
//   FiZap,
//   FiEye,
//   FiCheckCircle,
//   FiExternalLink,
//   FiUploadCloud,
//   FiPhone,
//   FiSearch,
//   FiMail,
//   FiSun,
//   FiUser,
//   FiGlobe,
//   FiMessageSquare,
// } from "react-icons/fi";


// const messages = [
//   {
//     id: 1,
//     initials: "IC",
//     name: "IndiGo Cargo",
//     subject: "Freight Confirmation - PLN - 2025 - 04 - 24 - 000123",
//     preview: "Dear Team, Your Booking has been confirmed for shipment",
//     time: "10:30 AM",
//     link: true,
//     star: true,
//     dot: true,
//     active: true,
//   },
//   {
//     id: 2,
//     initials: "SC",
//     name: "Sea Connect Logistics",
//     subject: "Update Freight Quote",
//     preview: "Please fing the updated freight quote for your refrence",
//     time: "Yesterday",
//     link: false,
//     star: true,
//     dot: true,
//   },
//   {
//     id: 3,
//     initials: "CB",
//     name: "Custom Broker",
//     subject: "Document Verification Update",
//     preview: "Your documents for shipment PLN - 2025 - 04 - 24 - 0012...",
//     time: "Yesterday",
//     link: true,
//     star: true,
//     dot: true,
//   },
//   {
//     id: 4,
//     initials: "RD",
//     name: "RoDTEP Department",
//     subject: "Incentive Claim Approved",
//     preview: "Your RoDTEP claim has been updated. Please find the details....",
//     time: "23 Apr, 2025",
//     link: false,
//     star: true,
//     dot: false,
//   },
//   {
//     id: 5,
//     initials: "EX",
//     name: "Export Support Team",
//     subject: "Export compliance update",
//     preview: "important update regarding export compliance guidelines",
//     time: "23 Apr, 2025",
//     link: false,
//     star: false,
//     dot: false,
//   },
// ];

// export default function MessagesModal({ onClose }) {
//   return (
//     <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/80 p-3 sm:p-6">
//       <div className="w-full max-w-md sm:max-w-2xl bg-white rounded-2xl shadow-2xl flex flex-col max-h-[80vh]">
//         <div className="p-4 sm:p-6 shrink-0">
//           <div className="flex items-start justify-between">
//             <div className="flex items-center gap-3">
//               <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-teal-100 text-teal-600 flex items-center justify-center shrink-0">
//                 <FiMail size={18} />
//               </div>
//               <div>
//                 <h2 className="text-base sm:text-lg font-bold text-gray-900">
//                   Messages
//                 </h2>
//                 <p className="text-xs text-gray-500">
//                   View and manage your emails.
//                 </p>
//               </div>
//             </div>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-gray-600 shrink-0"
//             >
//               <FiX size={20} />
//             </button>
//           </div>
 
//           <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
//             <span className="inline-flex items-center gap-2 text-teal-600 font-semibold text-xs sm:text-sm">
//               Inbox
//               <span className="bg-teal-600 text-white text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
//                 8
//               </span>
//             </span>
//             <button className="inline-flex items-center gap-2 bg-teal-600 hover:bg-teal-700 text-white text-xs font-medium px-4 py-2 rounded-full w-full sm:w-auto justify-center">
//               <FiEdit3 size={14} />
//               Compose Mail
//             </button>
//           </div>
 
//           <div className="mt-4 relative">
//             <input
//               type="text"
//               placeholder="Search emails..."
//               className="w-full border border-gray-200 rounded-xl pl-4 pr-10 py-2.5 text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500"
//             />
//             <FiSearch
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
//               size={16}
//             />
//           </div>
//         </div>

//         <div className="overflow-y-auto px-4 sm:px-6 pb-4 sm:pb-6 pr-1">
//           <div className="space-y-3">
//             {messages.map((m) => (
//               <div
//                 key={m.id}
//                 className={`border border-gray-100 rounded-xl p-3 flex gap-3 ${
//                   m.active ? "bg-gray-50" : ""
//                 }`}
//               >
//                 <div className="w-9 h-9 rounded-full bg-teal-50 text-teal-700 font-bold text-xs flex items-center justify-center shrink-0">
//                   {m.initials}
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-start justify-between gap-2">
//                     <p className="text-xs sm:text-sm font-bold text-gray-900 truncate">
//                       {m.name}
//                     </p>
//                     <span className="text-[11px] text-gray-400 whitespace-nowrap shrink-0">
//                       {m.time}
//                     </span>
//                   </div>
//                   <p className="text-xs font-semibold text-gray-800 truncate">
//                     {m.subject}
//                   </p>
//                   <div className="flex items-center justify-between gap-2 mt-0.5">
//                     <p className="text-[11px] sm:text-xs text-gray-500 truncate">
//                       {m.preview}
//                     </p>
//                     <div className="flex items-center gap-2 shrink-0">
//                       {m.link && (
//                         <FiLink2 size={13} className="text-gray-400" />
//                       )}
//                       <FiStar
//                         size={13}
//                         className={
//                           m.star
//                             ? "text-gray-900 fill-current"
//                             : "text-gray-300"
//                         }
//                       />
//                       {m.dot && (
//                         <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { useCallback, useEffect, useMemo, useState } from "react";
import { FiX, FiMail, FiSearch, FiRefreshCw, FiFileText } from "react-icons/fi";
import API from "../api/axios";

// Messages shows published notices addressed to the logged-in User/B2B account.
// The backend /notices endpoint filters audience, publication and active status.
export default function MessagesModal({ onClose }) {
  const [notices, setNotices] = useState([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const { data } = await API.get("/notices");
      if (data?.status === 0) throw Error(data?.message || "Unable to fetch notices");
      const items = Array.isArray(data?.data) ? data.data : [];
      const now = Date.now();
      setNotices(items.filter(n =>
        n.status === "published" && n.isActive !== false &&
        (!n.scheduleDate || new Date(n.scheduleDate).getTime() <= now)
      ));
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Unable to load notices");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { load(); }, [load]);
  const visible = useMemo(() => notices.filter(n =>
    [n.title, n.subtitle, n.description, n.details].some(x =>
      String(x || "").toLowerCase().includes(search.trim().toLowerCase())
    )
  ), [notices, search]);

  return (
    <div role="dialog" aria-modal="true" aria-label="Admin notices" className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6" onClick={onClose}>
      <div className="flex w-full max-w-2xl max-h-[85vh] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl" onClick={e=>e.stopPropagation()}>
        <div className="flex items-start justify-between border-b px-5 py-5 sm:px-7">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-teal-50 p-3 text-teal-600"><FiMail size={20}/></div>
            <div><h2 className="text-lg font-bold text-slate-900">Messages & Notices</h2>
              <p className="text-xs text-slate-500">Official announcements from CargoMate Admin</p></div>
          </div>
          <button type="button" aria-label="Close" onClick={onClose} className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"><FiX size={20}/></button>
        </div>
        <div className="flex items-center gap-3 border-b px-5 py-3 sm:px-7">
          <div className="relative flex-1">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/>
            <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search admin notices" className="w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-3 text-sm outline-none focus:border-teal-500"/>
          </div>
          <button type="button" onClick={load} aria-label="Refresh notices" className="rounded-xl border border-slate-200 p-3 text-teal-700"><FiRefreshCw/></button>
        </div>
        <div className="overflow-y-auto p-5 sm:p-7">
          {loading && <p role="status" className="py-8 text-center text-sm text-slate-500">Loading notices...</p>}
          {!loading && error && <div role="alert" className="rounded-xl bg-red-50 p-4 text-sm text-red-700">{error} <button onClick={load} className="ml-3 underline">Retry</button></div>}
          {!loading && !error && !visible.length && <p className="py-8 text-center text-sm text-slate-500">No admin notices available.</p>}
          {!loading && !error && <div className="space-y-3">{visible.map(n=>(
            <button key={n._id || n.id} onClick={()=>setSelected(n)} className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 p-4 text-left transition hover:border-teal-300 hover:bg-teal-50/30">
              <span className="rounded-xl bg-teal-50 p-2.5 text-teal-700"><FiFileText/></span>
              <span className="min-w-0 flex-1">
                <span className="flex flex-wrap items-start justify-between gap-2">
                  <strong className="text-sm text-slate-900">{n.title || "Admin notice"}</strong>
                  <span className="text-xs text-slate-400">{n.createdAt ? new Date(n.createdAt).toLocaleDateString("en-IN") : ""}</span>
                </span>
                <span className="mt-1 block text-xs text-slate-500">{n.subtitle || n.description || "View notice"}</span>
              </span>
            </button>
          ))}</div>}
        </div>
      </div>
      {selected && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/60 p-3" onClick={e=>{e.stopPropagation();setSelected(null);}}>
          <div className="max-h-[80vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-6 shadow-xl" onClick={e=>e.stopPropagation()}>
            <div className="flex justify-between gap-4"><h3 className="text-lg font-bold text-slate-900">{selected.title}</h3><button type="button" onClick={()=>setSelected(null)} aria-label="Close notice"><FiX/></button></div>
            {selected.subtitle && <p className="mt-2 text-sm font-semibold text-teal-700">{selected.subtitle}</p>}
            {selected.description && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{selected.description}</p>}
            {selected.details && <p className="mt-3 whitespace-pre-wrap text-sm text-slate-700">{selected.details}</p>}
            {selected.image && <img src={selected.image.startsWith("http") ? selected.image : `${(import.meta.env.VITE_API_URL || "http://localhost:8000/api").replace(/\/api\/?$/, "")}${selected.image.startsWith("/") ? "" : "/"}${selected.image}`} alt="Notice attachment" className="mt-4 max-h-64 w-full rounded-xl object-contain" />}
          </div>
        </div>
      )}
    </div>
  );
}
