// import { useState } from "react";
// import {
//   FaPlus,
//   FaCircleCheck,
//   FaArrowUpRightFromSquare,
//   FaBuilding,
//   FaXmark,
// } from "react-icons/fa6";
// import { useEffect } from "react";
// import API from "../../api/axios";

// const initialSchemes = [
//   {
//     id: 1,
//     title: "Export Promotion Capital Goods",
//     code: "EPCG- 2024",
//     status: "Active",
//     desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production",
//     benefits: [
//       "Zero customs duty",
//       "Export obligation required",
//       "Valid for 6 years",
//     ],
//     applicants: 245,
//   },
//   {
//     id: 2,
//     title: "Export Promotion Capital Goods",
//     code: "EPCG- 2024",
//     status: "Active",
//     desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production",
//     benefits: [
//       "Zero customs duty",
//       "Export obligation required",
//       "Valid for 6 years",
//     ],
//     applicants: 245,
//   },
//   {
//     id: 3,
//     title: "Export Promotion Capital Goods",
//     code: "EPCG- 2024",
//     status: "Active",
//     desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production",
//     benefits: [
//       "Zero customs duty",
//       "Export obligation required",
//       "Valid for 6 years",
//     ],
//     applicants: 245,
//   },
//   {
//     id: 4,
//     title: "Export Promotion Capital Goods.",
//     code: "EPCG- 2024",
//     status: "Active",
//     desc: "Scheme allows import of capital goods at zero customs duty for pre-production and post production",
//     benefits: [
//       "Zero customs duty",
//       "Export obligation required",
//       "Valid for 6 years",
//     ],
//     applicants: 245,
//   },
// ];

// function AddSchemeModal({ onClose, onAdd }) {
//   const [form, setForm] = useState({
//     title: "",
//     code: "",
//     hsCode: "",
//     destinationCountry: "",
//     fobValue: "",
//     status: "Active",
//     desc: "",
//     benefits: "",
//     applicants: "",
//   });
//   const [errors, setErrors] = useState({});
//   const set = (k, v) => {
//     setForm((p) => ({ ...p, [k]: v }));
//     setErrors((p) => ({ ...p, [k]: "" }));
//   };

//   const validate = () => {
//     const e = {};
//     if (!form.title.trim()) e.title = "Title is required";
//     if (!form.code.trim()) e.code = "Code is required";
//     if (!form.desc.trim()) e.desc = "Description is required";
//     return e;
//   };

//   const handleAdd = async () => {
//     const e = validate();
//     if (Object.keys(e).length) {
//       setErrors(e);
//       return;
//     }

//     try {
//       await API.post("/dgft", {
//         name: form.title,
//         code: form.code,
//         year: new Date().getFullYear(),
//         description: form.desc,
//         benefits: form.benefits
//           .split(",")
//           .map((b) => b.trim())
//           .filter(Boolean),
//         status: form.status.toLowerCase(),
//         applicantsCount: Number(form.applicants || 0),
//         hsCode: form.hsCode,
//         destinationCountry: form.destinationCountry,
//         fobValue: form.fobValue,
//       });

//       onClose();
//       window.location.reload();
//     } catch (err) {
//       console.log(err);
//       alert("Error creating scheme");
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-base font-semibold text-gray-800">
//             Add New Scheme
//           </h3>
//           <button
//             onClick={onClose}
//             className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
//           >
//             <FaXmark />
//           </button>
//         </div>
//         <div className="flex flex-col gap-4 mb-6">
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Scheme Title
//             </label>
//             <input
//               className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.title ? "border-red-400" : "border-gray-200"}`}
//               placeholder="Enter scheme title"
//               value={form.title}
//               onChange={(e) => set("title", e.target.value)}
//             />
//             {errors.title && (
//               <p className="text-xs text-red-500 mt-1">{errors.title}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Scheme Code
//             </label>
//             <input
//               className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all ${errors.code ? "border-red-400" : "border-gray-200"}`}
//               placeholder="e.g. EPCG- 2024"
//               value={form.code}
//               onChange={(e) => set("code", e.target.value)}
//             />
//             {errors.code && (
//               <p className="text-xs text-red-500 mt-1">{errors.code}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               HS Code
//             </label>
//             <input
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//               placeholder="Enter HS code"
//               value={form.hsCode}
//               onChange={(e) => set("hsCode", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Destination Country
//             </label>
//             <input
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//               placeholder="Enter destination country"
//               value={form.destinationCountry}
//               onChange={(e) => set("destinationCountry", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               FOB Value + Currency
//             </label>
//             <input
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//               placeholder="e.g. 5000 USD"
//               value={form.fobValue}
//               onChange={(e) => set("fobValue", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Status
//             </label>
//             <select
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//               value={form.status}
//               onChange={(e) => set("status", e.target.value)}
//             >
//               <option>Active</option>
//               <option>Inactive</option>
//             </select>
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Description
//             </label>
//             <textarea
//               className={`w-full border rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all ${errors.desc ? "border-red-400" : "border-gray-200"}`}
//               rows={3}
//               placeholder="Enter scheme description"
//               value={form.desc}
//               onChange={(e) => set("desc", e.target.value)}
//             />
//             {errors.desc && (
//               <p className="text-xs text-red-500 mt-1">{errors.desc}</p>
//             )}
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Key Benefits (comma separated)
//             </label>
//             <input
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//               placeholder="e.g. Zero customs duty, Valid for 6 years"
//               value={form.benefits}
//               onChange={(e) => set("benefits", e.target.value)}
//             />
//           </div>
//           <div>
//             <label className="block text-xs font-medium text-gray-500 mb-1.5">
//               Applicants
//             </label>
//             <input
//               type="number"
//               className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//               placeholder="Number of applicants"
//               value={form.applicants}
//               onChange={(e) => set("applicants", e.target.value)}
//             />
//           </div>
//         </div>
//         <div className="flex gap-2">
//           <button
//             onClick={onClose}
//             className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors"
//           >
//             Cancel
//           </button>
//           <button
//             onClick={handleAdd}
//             className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium transition-colors"
//           >
//             Add Scheme
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function SchemeCard({ scheme }) {
//   return (
//     <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
//       <div className="flex items-start justify-between gap-2">
//         <div className="min-w-0">
//           <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug">
//             {scheme.name}
//           </h3>
//           <p className="text-xs text-gray-400 mt-0.5">{scheme.code}</p>
//         </div>
//         <span
//           className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${scheme.status === "active" ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-500"}`}
//         >
//           {scheme.status}
//         </span>
//       </div>

//       <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
//         {scheme.description}
//       </p>

//       <div>
//         <p className="text-xs font-bold text-gray-800 mb-1.5">Key Benefits:</p>
//         <div className="flex flex-col gap-1">
//           {scheme.benefits.map((b, i) => (
//             <div key={i} className="flex items-center gap-2">
//               <FaCircleCheck className="text-teal-500 text-xs flex-shrink-0" />
//               <span className="text-xs text-gray-600">{b}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between border-t border-gray-100 pt-3 mt-auto">
//         <p className="text-xs text-gray-500">
//           Applicants:{" "}
//           <span className="font-semibold text-gray-700">
//             {scheme.applicantsCount}
//           </span>
//         </p>
//         <button className="flex items-center gap-1.5 text-xs text-teal-500 hover:text-teal-600 font-medium transition-colors">
//           View Details <FaArrowUpRightFromSquare className="text-xs" />
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function DGFTSchemes() {
//   const [schemes, setSchemes] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const fetchSchemes = async () => {
//     try {
//       const res = await API.get("/dgft");
//       setSchemes(res.data.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   useEffect(() => {
//     fetchSchemes();
//   }, []);

//   const handleAdd = (scheme) => setSchemes((prev) => [...prev, scheme]);

//   const [stats, setStats] = useState({
//     totalSchemes: 0,
//     activeSchemes: 0,
//     totalApplicants: 0,
//     benefitsClaimed: 0,
//   });

//   const fetchStats = async () => {
//     const res = await API.get("/dgft/stats");
//     setStats(res.data.data);
//   };

//   useEffect(() => {
//     fetchStats();
//   }, []);

//   const totalSchemes = schemes.length;
//   const activeSchemes = schemes.filter((s) => s.status === "Active").length;
//   const totalApplicants = schemes.reduce((sum, s) => sum + s.applicants, 0);

//   return (
//     <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
//       {showModal && (
//         <AddSchemeModal onClose={() => setShowModal(false)} onAdd={handleAdd} />
//       )}

//       <div className="max-w-6xl mx-auto">
//         {/* HEADER */}
//         <div className="mb-6 flex w-full items-center justify-end ">
//           {/* <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-800">DGFT Schemes</h1>
//             <p className="text-xs sm:text-sm text-gray-400 mt-1">Government schemes list, benefits and policies</p>
//           </div> */}
//           <button
//             onClick={() => setShowModal(true)}
//             className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"
//           >
//             <FaPlus className="text-xs" /> Add Schemes
//           </button>
//         </div>
//         {/* STATS */}
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
//           {[
//             { label: "Total Schemes", value: stats.totalSchemes },
//             { label: "Active Schemes", value: stats.activeSchemes },
//             {
//               label: "Total Applicants",
//               value: (stats.totalApplicants || 0).toLocaleString(),
//             },
//             { label: "Benefits Claimed", value: stats.benefitsClaimed },
//           ].map(({ label, value }) => (
//             <div
//               key={label}
//               className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"
//             >
//               <p className="text-xs text-gray-400 mb-1">{label}</p>
//               <p className="text-xl sm:text-2xl font-bold text-gray-800">
//                 {value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* INFO BANNER */}
//         {/* <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4 mb-5 flex items-start gap-3">
//           <FaBuilding className="text-blue-400 text-base flex-shrink-0 mt-0.5" />
//           <div>
//             <p className="text-xs sm:text-sm font-semibold text-blue-600 mb-0.5">About DGFT Schemes</p>
//             <p className="text-xs text-blue-500 leading-relaxed">The Directorate General of Foreign Trade (DGFT) operates various schemes to promote Indian exports and support manufacturers with duty benefits and incentives.</p>
//           </div>
//         </div> */}

//         {/* SCHEMES GRID */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
//           {schemes.map((scheme) => (
//             <SchemeCard key={scheme.id} scheme={scheme} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import {
  FaPlus,
  FaCircleCheck,
  FaArrowUpRightFromSquare,
  FaXmark,
} from "react-icons/fa6";

// Swagger/cURL shows /dgft-schemes at the service ROOT, not under /api.
// Accept either https://host or https://host/api in the existing Vite variable.
const AI_BASE = String(
  import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com"
)
  .trim()
  .replace(/\/+$/, "")
  .replace(/\/api$/i, "");

const dgftApi = axios.create({ baseURL: AI_BASE, timeout: 30000 });
const endpoint = "/dgft-schemes";

const pickList = (body) => {
  const payload = body?.data?.data ?? body?.data ?? body;
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.items)) return payload.items;
  if (Array.isArray(payload?.schemes)) return payload.schemes;
  if (Array.isArray(payload?.results)) return payload.results;
  return [];
};
const pickItem = (body) => body?.data?.data ?? body?.data ?? body;
const getId = (scheme) => scheme?.id || scheme?._id || scheme?.item_id;
const errorText = (error) => {
  const detail = error?.response?.data?.detail;
  if (Array.isArray(detail)) return detail.map((entry) => entry.msg || JSON.stringify(entry)).join("; ");
  return (typeof detail === "string" && detail) || error?.response?.data?.message || error?.message || "Request failed";
};
const asList = (value) =>
  String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
const listText = (value) => (Array.isArray(value) ? value.join(", ") : String(value ?? ""));
const numberValue = (value) => (value === "" || value == null ? 0 : Number(value));

const emptyForm = {
  scheme_code: "",
  scheme_name: "",
  scheme_type: "",
  description: "",
  benefit: "",
  benefit_rate_pct: "",
  cap_amount: "",
  cap_currency: "INR",
  hs_code_prefixes: "",
  key_benefits: "",
  eligibility: "",
  required_documents: "",
  administered_by: "",
  notification_ref: "",
  validity: "",
  destination_country: "",
  fob_value: "",
  fob_currency: "USD",
  applicants_count: 0,
  active: true,
};

const toForm = (record = {}) => ({
  ...emptyForm,
  ...Object.fromEntries(
    Object.keys(emptyForm).map((key) => [
      key,
      ["hs_code_prefixes", "key_benefits", "required_documents"].includes(key)
        ? listText(record[key])
        : record[key] ?? emptyForm[key],
    ])
  ),
});

const toPayload = (form) => ({
  scheme_code: form.scheme_code.trim(),
  scheme_name: form.scheme_name.trim(),
  scheme_type: form.scheme_type.trim(),
  description: form.description.trim(),
  benefit: form.benefit.trim(),
  benefit_rate_pct: numberValue(form.benefit_rate_pct),
  cap_amount: numberValue(form.cap_amount),
  cap_currency: form.cap_currency.trim() || "INR",
  hs_code_prefixes: asList(form.hs_code_prefixes),
  key_benefits: asList(form.key_benefits),
  eligibility: form.eligibility.trim(),
  required_documents: asList(form.required_documents),
  administered_by: form.administered_by.trim(),
  notification_ref: form.notification_ref.trim(),
  validity: form.validity.trim(),
  destination_country: form.destination_country.trim(),
  fob_value: numberValue(form.fob_value),
  fob_currency: form.fob_currency.trim() || "USD",
  applicants_count: numberValue(form.applicants_count),
  active: Boolean(form.active),
});

const fields = [
  { key: "scheme_name", label: "Scheme Title", required: true },
  { key: "scheme_code", label: "Scheme Code", required: true, placeholder: "e.g. RoDTEP" },
  { key: "scheme_type", label: "Scheme Type" },
  { key: "description", label: "Description", textarea: true, required: true },
  { key: "benefit", label: "Benefit" },
  { key: "benefit_rate_pct", label: "Benefit Rate (%)", type: "number", step: "any" },
  { key: "cap_amount", label: "Cap Amount", type: "number", step: "any" },
  { key: "cap_currency", label: "Cap Currency", placeholder: "INR" },
  { key: "hs_code_prefixes", label: "HS Code Prefixes (comma separated)", placeholder: "61, 62, 63" },
  { key: "key_benefits", label: "Key Benefits (comma separated)", textarea: true },
  { key: "eligibility", label: "Eligibility", textarea: true },
  { key: "required_documents", label: "Required Documents (comma separated)", textarea: true },
  { key: "administered_by", label: "Administered By" },
  { key: "notification_ref", label: "Notification Reference" },
  { key: "validity", label: "Validity" },
  { key: "destination_country", label: "Destination Country" },
  { key: "fob_value", label: "FOB Value", type: "number", step: "any" },
  { key: "fob_currency", label: "FOB Currency", placeholder: "USD" },
  { key: "applicants_count", label: "Applicants Count", type: "number", step: "1" },
];

function SchemeModal({ mode, scheme, onClose, onSaved }) {
  const [form, setForm] = useState(() => toForm(scheme));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [detail, setDetail] = useState(scheme || null);
  const readOnly = mode === "view";
  const editing = mode === "edit";
  const schemeId = getId(scheme);

  useEffect(() => {
    if (!schemeId || !["view", "edit"].includes(mode)) return;
    let alive = true;
    dgftApi.get(`${endpoint}/${encodeURIComponent(schemeId)}`)
      .then(({ data }) => {
        if (!alive) return;
        const item = pickItem(data);
        setDetail(item);
        setForm(toForm(item));
      })
      .catch((err) => { if (alive) setError(`Unable to load scheme details: ${errorText(err)}`); });
    return () => { alive = false; };
  }, [schemeId, mode]);

  const set = (key, value) => setForm((previous) => ({ ...previous, [key]: value }));
  const save = async (event) => {
    event.preventDefault();
    if (!form.scheme_code.trim() || !form.scheme_name.trim() || !form.description.trim()) {
      setError("Scheme Title, Code and Description are required.");
      return;
    }
    if (["benefit_rate_pct", "cap_amount", "fob_value", "applicants_count"].some((k) => !Number.isFinite(numberValue(form[k])))) {
      setError("Please enter valid numeric values.");
      return;
    }
    if (numberValue(form.applicants_count) < 0) {
      setError("Applicants Count cannot be negative.");
      return;
    }
    try {
      setSaving(true);
      setError("");
      const body = toPayload(form);
      if (editing) {
        if (!schemeId) throw new Error("Scheme ID is missing");
        await dgftApi.put(`${endpoint}/${encodeURIComponent(schemeId)}`, body);
      } else {
        await dgftApi.post(endpoint, body);
      }
      await onSaved();
      onClose();
    } catch (err) {
      setError(errorText(err));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[80] px-4" onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div role="dialog" aria-modal="true" aria-label={readOnly ? "Scheme Details" : editing ? "Edit Scheme" : "Add New Scheme"} className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-base font-semibold text-gray-800">{readOnly ? "Scheme Details" : editing ? "Edit Scheme" : "Add New Scheme"}</h3>
          <button type="button" aria-label="Close" onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
        </div>
        {error && <div role="alert" className="rounded-lg bg-red-50 border border-red-200 p-3 mb-4 text-xs text-red-700">{error}</div>}
        <form onSubmit={save}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {fields.map(({ key, label, required, textarea, type, step, placeholder }) => (
              <label key={key} className={textarea ? "sm:col-span-2" : ""}>
                <span className="block text-xs font-medium text-gray-500 mb-1.5">{label}{required && " *"}</span>
                {textarea ? (
                  <textarea rows={key === "description" ? 3 : 2} disabled={readOnly} value={form[key] ?? ""} placeholder={placeholder} onChange={(e) => set(key, e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 disabled:bg-gray-50" />
                ) : (
                  <input type={type || "text"} step={step} min={type === "number" ? 0 : undefined} disabled={readOnly} value={form[key] ?? ""} placeholder={placeholder || label} onChange={(e) => set(key, e.target.value)} className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 disabled:bg-gray-50" />
                )}
              </label>
            ))}
            <label className="flex items-center gap-2 text-xs font-medium text-gray-600 sm:col-span-2">
              <input type="checkbox" checked={!!form.active} disabled={readOnly} onChange={(e) => set("active", e.target.checked)} className="accent-teal-500" /> Active Scheme
            </label>
          </div>
          {readOnly && detail && <p className="text-xs text-gray-400 mb-4">Scheme ID: {getId(detail) || "Not available"}</p>}
          <div className="flex gap-2">
            <button type="button" onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">{readOnly ? "Close" : "Cancel"}</button>
            {!readOnly && <button type="submit" disabled={saving} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium disabled:opacity-50">{saving ? "Saving..." : editing ? "Update Scheme" : "Add Scheme"}</button>}
          </div>
        </form>
      </div>
    </div>
  );
}

function SchemeCard({ scheme, onView, onEdit, onDelete, deleting }) {
  const active = scheme.active === true;
  const benefits = Array.isArray(scheme.key_benefits) ? scheme.key_benefits : [];
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5 flex flex-col gap-3">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-gray-800 leading-snug">{scheme.scheme_name || "Untitled Scheme"}</h3>
          <p className="text-xs text-gray-400 mt-0.5">{scheme.scheme_code || "—"}</p>
        </div>
        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-shrink-0 ${active ? "bg-teal-100 text-teal-600" : "bg-gray-100 text-gray-500"}`}>{active ? "active" : "inactive"}</span>
      </div>
      <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">{scheme.description || "No description"}</p>
      <div>
        <p className="text-xs font-bold text-gray-800 mb-1.5">Key Benefits:</p>
        <div className="flex flex-col gap-1">
          {benefits.length ? benefits.map((benefit, i) => (
            <div key={i} className="flex items-center gap-2"><FaCircleCheck className="text-teal-500 text-xs flex-shrink-0" /><span className="text-xs text-gray-600">{benefit}</span></div>
          )) : <span className="text-xs text-gray-400">{scheme.benefit || "Not specified"}</span>}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-2 border-t border-gray-100 pt-3 mt-auto">
        <p className="text-xs text-gray-500">Applicants: <span className="font-semibold text-gray-700">{scheme.applicants_count ?? 0}</span></p>
        <div className="flex items-center flex-wrap gap-3">
          <button type="button" onClick={() => onView(scheme)} className="flex items-center gap-1.5 text-xs text-teal-500 hover:text-teal-600 font-medium">View Details <FaArrowUpRightFromSquare className="text-xs" /></button>
          <button type="button" onClick={() => onEdit(scheme)} className="text-xs font-medium text-sky-600 hover:text-sky-700">Edit</button>
          <button type="button" disabled={deleting} onClick={() => onDelete(scheme)} className="text-xs font-medium text-red-600 hover:text-red-700 disabled:opacity-50">{deleting ? "Deleting..." : "Delete"}</button>
        </div>
      </div>
    </div>
  );
}

export default function DGFTSchemes() {
  const [schemes, setSchemes] = useState([]);
  const [modal, setModal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const fetchSchemes = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (search.trim()) params.q = search.trim();
      if (status !== "all") params.active = status === "active";
      const response = await dgftApi.get(endpoint, { params });
      setSchemes(pickList(response.data));
    } catch (err) {
      setError(`Unable to load DGFT Schemes: ${errorText(err)}`);
    } finally {
      setLoading(false);
    }
  }, [search, status]);

  useEffect(() => { fetchSchemes(); }, [fetchSchemes]);

  const deleteScheme = async (scheme) => {
    const id = getId(scheme);
    if (!id) { setError("Scheme ID missing; cannot delete this scheme."); return; }
    if (!window.confirm(`Delete scheme \"${scheme.scheme_name || scheme.scheme_code}\"? This action cannot be undone.`)) return;
    try {
      setDeletingId(String(id));
      setError("");
      await dgftApi.delete(`${endpoint}/${encodeURIComponent(id)}`);
      await fetchSchemes();
    } catch (err) {
      setError(`Delete failed: ${errorText(err)}`);
    } finally {
      setDeletingId("");
    }
  };

  const stats = {
    totalSchemes: schemes.length,
    activeSchemes: schemes.filter((scheme) => scheme.active === true).length,
    totalApplicants: schemes.reduce((total, scheme) => total + (Number(scheme.applicants_count) || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
      {modal && <SchemeModal key={`${modal.mode}-${getId(modal.scheme) || "new"}`} mode={modal.mode} scheme={modal.scheme} onClose={() => setModal(null)} onSaved={fetchSchemes} />}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex w-full items-center justify-end">
          <button type="button" onClick={() => setModal({ mode: "add" })} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap"><FaPlus className="text-xs" /> Add Schemes</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6">
          {[
            { label: "Total Schemes", value: stats.totalSchemes },
            { label: "Active Schemes", value: stats.activeSchemes },
            { label: "Total Applicants", value: stats.totalApplicants.toLocaleString() },
            { label: "Benefits Claimed", value: "—" },
          ].map(({ label, value }) => (
            <div key={label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4"><p className="text-xs text-gray-400 mb-1">{label}</p><p className="text-xl sm:text-2xl font-bold text-gray-800">{value}</p></div>
          ))}
        </div>
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search scheme code, name or type" className="flex-1 min-w-[210px] rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-teal-500" />
          <select value={status} onChange={(event) => setStatus(event.target.value)} className="rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm outline-none"><option value="all">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>
          <button type="button" onClick={fetchSchemes} className="rounded-xl border border-teal-200 bg-white px-4 py-2 text-sm font-medium text-teal-600 hover:bg-teal-50">Refresh</button>
        </div>
        {error && <div role="alert" className="mb-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700">{error}</div>}
        {loading ? <p className="py-8 text-center text-sm text-gray-500">Loading DGFT Schemes...</p> : schemes.length === 0 ? <p className="py-8 text-center text-sm text-gray-500">No schemes found.</p> : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
            {schemes.map((scheme, index) => (
              <SchemeCard key={getId(scheme) || `${scheme.scheme_code}-${index}`} scheme={scheme} onView={(item) => setModal({ mode: "view", scheme: item })} onEdit={(item) => setModal({ mode: "edit", scheme: item })} onDelete={deleteScheme} deleting={deletingId === String(getId(scheme))} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
