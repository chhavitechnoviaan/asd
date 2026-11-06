// import { glassSuccess, glassError } from "../../utils/glassAlert";
// import { useState, useRef, useEffect } from "react";
// import {
//   FaPlus, FaMagnifyingGlass, FaXmark, FaCloudArrowUp,
//   FaChevronDown, FaCopy, FaRobot, FaTriangleExclamation,
//   FaFloppyDisk, FaPaperPlane, FaCheck
// } from "react-icons/fa6";
// import API from "../../api/axios"; 

// const Toggle = ({ checked, onChange }) => (
//   <div onClick={() => onChange(!checked)}
//     className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
//     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
//   </div>
// );

// const initialRows = [
//   { id: 1, country: "United states", code: "US", vat: "0%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 2, country: "United Kingdom", code: "US", vat: "12%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 3, country: "Germany", code: "US", vat: "23%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 4, country: "India", code: "US", vat: "8%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 5, country: "china", code: "US", vat: "3%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 6, country: "Dubai", code: "US", vat: "12%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 7, country: "Saudi Arabia", code: "US", vat: "0%", customDuty: "Variable", restriction: "FDA approval for food items", status: "Active" },
//   { id: 8, country: "France", code: "FR", vat: "20%", customDuty: "Variable", restriction: "EU compliance required", status: "Active" },
//   { id: 9, country: "Japan", code: "JP", vat: "10%", customDuty: "Variable", restriction: "JIS certification required", status: "Active" },
// ];

// const ITEMS_PER_PAGE = 7;
// const DOC_OPTIONS = ["Invoice", "COO", "Bill of Landing", "Packing List", "Insurance", "Custom Declaration", "Certificate of Origin", "Health Certificate"];

// function EditModal({ row, onClose, onSave }) {
//   const [form, setForm] = useState({ ...row });
//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-4">
//       <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
//         <div className="flex items-center justify-between mb-5">
//           <h3 className="text-base font-semibold text-gray-800">Edit Country Rule</h3>
//           <button onClick={onClose} className="w-7 h-7 flex items-center justify-center text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg"><FaXmark /></button>
//         </div>
//         <div className="flex flex-col gap-4 mb-6">

// {/* Country */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">Country</label>
//   <input
//     value={form.destinationCountry?.name || ""}
//     disabled
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-100"
//   />
// </div>

// {/* Code */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">Code</label>
//   <input
//     value={form.destinationCountry?.code || ""}
//     disabled
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-100"
//   />
// </div>

// {/* VAT */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">VAT/GST</label>
//   <input
//     value={form.taxRules?.vatGst || ""}
//     onChange={(e) =>
//       setForm(prev => ({
//         ...prev,
//         taxRules: {
//           ...prev.taxRules,
//           vatGst: e.target.value
//         }
//       }))
//     }
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
//   />
// </div>

// {/* Custom Duty */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">Custom Duty</label>
//   <input
//     value={form.taxRules?.customsDuty || ""}
//     onChange={(e) =>
//       setForm(prev => ({
//         ...prev,
//         taxRules: {
//           ...prev.taxRules,
//           customsDuty: e.target.value
//         }
//       }))
//     }
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
//   />
// </div>

// {/* Import Restriction */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">Import Restriction</label>
//   <input
//     value={form.importRestrictions || ""}
//     onChange={(e) => set("importRestrictions", e.target.value)}
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
//   />
// </div>

// {/* Status */}
// <div>
//   <label className="block text-xs font-medium text-gray-500 mb-1.5">Status</label>
//   <select
//     value={form.status}
//     onChange={(e) => set("status", e.target.value)}
//     className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm"
//   >
//     <option value="active">Active</option>
//     <option value="inactive">Inactive</option>
//   </select>
// </div>

// </div>
//         <div className="flex gap-2">
//           <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium">Cancel</button>
//           <button onClick={() => { onSave(form); onClose(); }} className="flex-1 px-4 py-2.5 text-sm text-white bg-teal-500 rounded-xl hover:bg-teal-600 font-medium">Save</button>
//         </div>
//       </div>
//     </div>
//   );
// }

// function AddCountryRulePage({ onCancel, onSave }) {
//   const fileRef = useRef();
//   const [uploadedFiles, setUploadedFiles] = useState([]);
//   const [docs, setDocs] = useState(["Invoice", "COO", "Bill of Landing", "Packing List", "Insurance", "Custom Declaration"]);
//   const [categories, setCategories] = useState(["Electronics"]);
//   const [catInput, setCatInput] = useState("");
//   const [savedDraft, setSavedDraft] = useState(false);

//   const [form, setForm] = useState({
//     ruleName: "Electronics Import Restriction",
//     hsCode: "",
//     originCountry: "",
//     destinationCountry: "",
//     ruleCode: "RUL-2025-000124",
//     ruleType: "Import Restriction",
//     status: true,
//     sourceCountry: "",
//     destCountry: "",
//     applicableRegion: "Import Restriction",
//     tradeZone: "ASEAN",
//     customsApproval: true,
//     licenseRequired: true,
//     complianceNotes: "All electronics items must comply with safety standards and required BIS certification additional documentation may be required based on product specifications",
//     customsDuty: "12.50",
//     importTax: "18.00",
//     exportTax: "0.00",
//     vatGst: "5.00",
//     currency: "USD- US Dollar",
//     penaltyCharges: "2,00000/-",
//     calcFormula: "(CD+IT+VAT+Panelty)",
//     autoApplyCondition: "Value > ₹1,00000",
//     shipmentType: "All Shipment",
//     vendorRule: true,
//     smartValidation: true,
//     triggerNotification: true,
//   });

//   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

//   const copyToClipboard = (val) => navigator.clipboard.writeText(val);

//   const removeDoc = (d) => setDocs(prev => prev.filter(x => x !== d));
//   const addDoc = (d) => { if (!docs.includes(d)) setDocs(prev => [...prev, d]); };
//   const removeCategory = (c) => setCategories(prev => prev.filter(x => x !== c));
//   const addCategory = () => { if (catInput.trim() && !categories.includes(catInput.trim())) { setCategories(prev => [...prev, catInput.trim()]); setCatInput(""); } };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setUploadedFiles(prev => [...prev, ...files]);
//   };

//   const handleDrop = (e) => {
//     e.preventDefault();
//     const files = Array.from(e.dataTransfer.files);
//     setUploadedFiles(prev => [...prev, ...files]);
//   };

//   const collectData = () => ({
//     basicRuleInfo: { ruleName: form.ruleName, hsCode: form.hsCode, originCountry: form.originCountry, destinationCountry: form.destinationCountry, ruleCode: form.ruleCode, ruleType: form.ruleType, status: form.status ? "Active" : "Inactive" },
//     countryConfig: { sourceCountry: form.sourceCountry, destCountry: form.destCountry, applicableRegion: form.applicableRegion, tradeZone: form.tradeZone },
//     compliance: { requiredDocuments: docs, customsApproval: form.customsApproval, licenseRequired: form.licenseRequired, restrictedCategories: categories, complianceNotes: form.complianceNotes, uploadedFiles: uploadedFiles.map(f => f.name) },
//     taxDuty: { customsDuty: form.customsDuty, importTax: form.importTax, exportTax: form.exportTax, vatGst: form.vatGst, currency: form.currency, penaltyCharges: form.penaltyCharges, calcFormula: form.calcFormula },
//     ruleAutomation: { autoApplyCondition: form.autoApplyCondition, shipmentType: form.shipmentType, vendorRule: form.vendorRule, smartValidation: form.smartValidation, triggerNotification: form.triggerNotification },
//   });

//   const handleSaveDraft = () => { setSavedDraft(true); setTimeout(() => setSavedDraft(false), 2500); };
//   const handleSaveRule = async () => {
//     try {
//       const data = collectData();
  
//       const payload = {
//         ruleName: data.basicRuleInfo.ruleName,
//         hsCode: data.basicRuleInfo.hsCode,
//         originCountry: data.basicRuleInfo.originCountry,
//         ruleCode: data.basicRuleInfo.ruleCode,
//         ruleType: data.basicRuleInfo.ruleType,
//         status: data.basicRuleInfo.status.toLowerCase(),
//         importRestrictions: data.compliance.complianceNotes,
//         sourceCountry: data.countryConfig.sourceCountry,
//         destinationCountry: data.basicRuleInfo.destinationCountry || data.countryConfig.destCountry,
//         region: data.countryConfig.applicableRegion,
//         tradeZone: data.countryConfig.tradeZone,
  
//         taxRules: {
//           customsDuty: Number(data.taxDuty.customsDuty),
//           importTax: Number(data.taxDuty.importTax),
//           exportTax: Number(data.taxDuty.exportTax),
//           vatGst: Number(data.taxDuty.vatGst),
//           currency: data.taxDuty.currency,
        
//           penalty: Number(
//             data.taxDuty.penaltyCharges
//               ?.replace(/,/g, "")
//               .replace(/[^\d.]/g, "")
//           ),
        
//           formula: data.taxDuty.calcFormula,
//         },
  
//         compliance: {
//           documents: data.compliance.requiredDocuments,
//           customsApproval: data.compliance.customsApproval,
//           licenseRequired: data.compliance.licenseRequired,
//           restrictedCategories: data.compliance.restrictedCategories,
//           notes: data.compliance.complianceNotes,
//           files: data.compliance.uploadedFiles,
//         },
  
//         automation: {
//           condition: data.ruleAutomation.autoApplyCondition,
//           shipmentType: data.ruleAutomation.shipmentType,
//           vendorSpecific: data.ruleAutomation.vendorRule,
//           smartValidation: data.ruleAutomation.smartValidation,
//           triggerNotification: data.ruleAutomation.triggerNotification,
//         }
//       };
  
//       await API.post("/country-rules", payload);
  
//       alert("Rule Created ✅");
//       onCancel();
  
//     } catch (err) {
//       console.log(err);
//       alert("Error creating rule ❌");
//     }
//   };

//   const [countries, setCountries] = useState([]);

// const fetchCountries = async () => {
//   try {
//     const res = await API.get("/country");
//     setCountries(res.data.data);
//   } catch (err) {
//     console.log(err);
//   }
// };

// useEffect(() => {
//   fetchCountries();
// }, []);

//   const [stats, setStats] = useState({});

// const fetchStats = async () => {
//   const res = await API.get("/country-rules/stats");
//   setStats(res.data.data);
// };

// useEffect(() => {
//   fetchStats();
// }, []);

//   const liveCalc = {
//     assessable: 1800,
//     customsDuty: ((parseFloat(form.customsDuty) || 0) / 100 * 1800).toFixed(2),
//     importTax: ((parseFloat(form.importTax) || 0) / 100 * 1800).toFixed(2),
//     vatGst: ((parseFloat(form.vatGst) || 0) / 100 * 1800).toFixed(2),
//     penalty: 500,
//   };
//   const totalPayable = (1800 + parseFloat(liveCalc.customsDuty) + parseFloat(liveCalc.importTax) + parseFloat(liveCalc.vatGst) + 500).toFixed(2);

//   return (
//     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
//       <div className="max-w-4xl mx-auto">
//         <div className="flex items-start justify-between gap-3 mb-6">
//           <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Add Country Rule</h1>
//             <p className="text-xs text-gray-400 mt-0.5">Add country Rule</p>
//           </div>
//           <button onClick={handleSaveRule} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
//             <FaPlus className="text-xs" /> Add Country Rule
//           </button>
//         </div>

//         <div className="flex flex-col gap-4">

//           {/* HEADER BANNER */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
//             <div className="w-8 h-8 bg-teal-100 rounded-lg flex-shrink-0" />
//             <div>
//               <p className="text-sm font-semibold text-gray-800">Create New Country Trade Rule</p>
//               <p className="text-xs text-gray-400 mt-0.5">Define import/export restrictions, compliance requirements, taxation rules, ands trade conditions for specific countries.</p>
//             </div>
//           </div>

//           {/* SECTION 1 - Basic Rule Information */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
//               <h2 className="text-sm font-semibold text-gray-800">Basic Rule Information</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule name</label>
//                 <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                   value={form.ruleName} onChange={e => set("ruleName", e.target.value)} />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">HS Code</label>
//                 <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                   value={form.hsCode} onChange={e => set("hsCode", e.target.value)} />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Origin Country</label>
//                 <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                   value={form.originCountry} onChange={e => set("originCountry", e.target.value)} />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Destination Country</label>
//                 <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                   value={form.destinationCountry} onChange={e => set("destinationCountry", e.target.value)} />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule name</label>
//                 <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
//                   <input className="flex-1 text-sm outline-none min-w-0" value={form.ruleCode} onChange={e => set("ruleCode", e.target.value)} />
//                   <button onClick={() => copyToClipboard(form.ruleCode)} className="text-gray-400 hover:text-teal-500 transition-colors flex-shrink-0">
//                     <FaCopy className="text-sm" />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule Type</label>
//                 <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//                   value={form.ruleType} onChange={e => set("ruleType", e.target.value)}>
//                   <option>Import Restriction</option>
//                   <option>Export Restriction</option>
//                   <option>Tax Rule</option>
//                   <option>Compliance Rule</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
//                 <div className="flex items-center gap-2 mt-2">
//                   <Toggle checked={form.status} onChange={v => set("status", v)} />
//                   <span className="text-sm text-gray-700 font-medium">Active</span>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SECTION 2 - Country Configuration */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
//               <h2 className="text-sm font-semibold text-gray-800">Country Configuration</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Source Country</label>
//                 <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
//                 <select
//   value={form.sourceCountry}
//   onChange={(e) => set("sourceCountry", e.target.value)}
// >
//   <option value="">Select</option>
//   {countries.map(c => (
//     <option key={c._id} value={c._id}>
//       {c.name}
//     </option>
//   ))}
// </select>
//                   <button onClick={() => set("sourceCountry", "")} className="text-gray-400 hover:text-gray-600"><FaXmark className="text-xs" /></button>
//                   <FaChevronDown className="text-gray-400 text-xs" />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Destination Country</label>
//                 <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
//                 <select
//   value={form.destCountry}
//   onChange={(e) => set("destCountry", e.target.value)}
// >
//   <option value="">Select</option>
//   {countries.map(c => (
//     <option key={c._id} value={c._id}>
//       {c.name}
//     </option>
//   ))}
// </select>
//                   <button onClick={() => copyToClipboard(form.destCountry)} className="text-gray-400 hover:text-teal-500 transition-colors">
//                     <FaCopy className="text-sm" />
//                   </button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Applicable Region</label>
//                 <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//                   value={form.applicableRegion} onChange={e => set("applicableRegion", e.target.value)}>
//                   <option>Import Restriction</option>
//                   <option>Asia Pacific</option>
//                   <option>Europe</option>
//                   <option>Middle East</option>
//                 </select>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Trade Zone</label>
//                 <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//                   value={form.tradeZone} onChange={e => set("tradeZone", e.target.value)}>
//                   <option>ASEAN</option>
//                   <option>EU</option>
//                   <option>NAFTA</option>
//                   <option>GCC</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* SECTION 3 - Compliance & Documentation */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
//               <h2 className="text-sm font-semibold text-gray-800">Compliance & Documentation</h2>
//             </div>

//             <div className="mb-4">
//               <label className="block text-xs font-medium text-gray-600 mb-1.5">Required Documents</label>
//               <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap gap-1.5 items-center min-h-[44px] focus-within:border-teal-500 transition-all">
//                 {docs.map(d => (
//                   <span key={d} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
//                     {d}
//                     <button onClick={() => removeDoc(d)} className="text-gray-400 hover:text-gray-700"><FaXmark className="text-xs" /></button>
//                   </span>
//                 ))}
//                 <select className="text-xs outline-none bg-transparent text-teal-500 cursor-pointer"
//                   onChange={e => { if (e.target.value) addDoc(e.target.value); e.target.value = ""; }}>
//                   <option value="">+ Add</option>
//                   {DOC_OPTIONS.filter(d => !docs.includes(d)).map(d => <option key={d} value={d}>{d}</option>)}
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//               <div className="flex flex-wrap gap-4">
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-medium text-gray-600">Customs Approval Required</span>
//                   <Toggle checked={form.customsApproval} onChange={v => set("customsApproval", v)} />
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <span className="text-xs font-medium text-gray-600">License Required</span>
//                   <Toggle checked={form.licenseRequired} onChange={v => set("licenseRequired", v)} />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Restricted Product Categories</label>
//                 <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap gap-1.5 items-center min-h-[44px]">
//                   {categories.map(c => (
//                     <span key={c} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
//                       {c}
//                       <button onClick={() => removeCategory(c)} className="text-gray-400 hover:text-gray-700"><FaXmark className="text-xs" /></button>
//                     </span>
//                   ))}
//                   <input className="text-xs outline-none bg-transparent placeholder-teal-400 text-gray-600 w-20"
//                     placeholder="Add more..." value={catInput} onChange={e => setCatInput(e.target.value)}
//                     onKeyDown={e => e.key === "Enter" && addCategory()} />
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Compliance Notes</label>
//                 <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all"
//                   rows={4} value={form.complianceNotes} onChange={e => set("complianceNotes", e.target.value)} />
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Upload Compliance Files</label>
//                 <div
//                   onDrop={handleDrop} onDragOver={e => e.preventDefault()}
//                   onClick={() => fileRef.current.click()}
//                   className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all min-h-[100px]">
//                   <FaCloudArrowUp className="text-teal-400 text-2xl mb-2" />
//                   <p className="text-xs font-medium text-gray-600">Drag & drop files here</p>
//                   <p className="text-xs text-gray-400">or click to browse</p>
//                   <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
//                 </div>
//                 <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
//                 {uploadedFiles.length > 0 && (
//                   <div className="mt-2 flex flex-col gap-1">
//                     {uploadedFiles.map((f, i) => (
//                       <div key={i} className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-lg px-3 py-1.5">
//                         <FaCheck className="text-teal-500 text-xs flex-shrink-0" />
//                         <span className="text-xs text-gray-600 truncate flex-1">{f.name}</span>
//                         <button onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">
//                           <FaXmark className="text-xs" />
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* SECTION 4 - Tax & Duty Rules */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
//               <h2 className="text-sm font-semibold text-gray-800">Tax & Duty Rules</h2>
//             </div>
//             <div className="flex flex-col lg:flex-row gap-4">
//               <div className="flex-1">
//                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
//                   {[
//                     ["Customs Duty (%)", "customsDuty"],
//                     ["Import Tax (%)", "importTax"],
//                     ["Export Tax (%)", "exportTax"],
//                     ["VAT/GST (%)", "vatGst"],
//                   ].map(([label, key]) => (
//                     <div key={key}>
//                       <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
//                       <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                         value={form[key]} onChange={e => set(key, e.target.value)} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1.5">Currency</label>
//                     <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//                       value={form.currency} onChange={e => set("currency", e.target.value)}>
//                       <option>USD- US Dollar</option>
//                       <option>EUR- Euro</option>
//                       <option>INR- Indian Rupee</option>
//                       <option>AED- UAE Dirham</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1.5">Penalty Charges</label>
//                     <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
//                       value={form.penaltyCharges}
//                       onChange={(e) => {
//                         const value = e.target.value.replace(/[^\d.]/g, "");
//                         set("penaltyCharges", value);
//                       }}
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-xs font-medium text-gray-600 mb-1.5">Calculation Formula</label>
//                     <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
//                       <input className="flex-1 text-sm outline-none min-w-0" value={form.calcFormula} onChange={e => set("calcFormula", e.target.value)} />
//                       <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">fx</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="w-full lg:w-56 bg-teal-50 border border-teal-100 rounded-xl p-4 flex-shrink-0">
//                 <p className="text-xs font-semibold text-teal-700 mb-3">Live Calculation Preview</p>
//                 <div className="flex flex-col gap-1.5">
//                   {[
//                     ["Assessable Value (USD)", `${liveCalc.assessable}.00`],
//                     [`Customs Duty (${form.customsDuty}%)`, liveCalc.customsDuty],
//                     [`Import Tax (${form.importTax}%)`, liveCalc.importTax],
//                     [`VATGST (${form.vatGst}%)`, liveCalc.vatGst],
//                     ["Penalty Charges", "500.00"],
//                   ].map(([label, val]) => (
//                     <div key={label} className="flex justify-between">
//                       <span className="text-xs text-gray-500">{label}</span>
//                       <span className="text-xs text-gray-700 font-medium">{val}</span>
//                     </div>
//                   ))}
//                   <div className="border-t border-teal-200 pt-2 mt-1 flex justify-between">
//                     <span className="text-xs font-semibold text-gray-700">Total Payable (USD)</span>
//                     <span className="text-xs font-bold text-teal-600">{parseFloat(totalPayable).toLocaleString()}/-</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SECTION 5 - AI Trade Intelligence */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
//               <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2"><FaRobot className="text-teal-500" /> AI Trade Intelligence</h2>
//             </div>
//             <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
//               <div className="flex flex-col sm:flex-row gap-4">
//                 <div className="flex-shrink-0">
//                   <p className="text-xs font-semibold text-gray-700 mb-2">AI Risk Score</p>
//                   <div className="flex items-end gap-2">
//                     <div className="relative w-20 h-20">
//                       <div className="w-20 h-20 rounded-full border-8 border-gray-100 flex items-center justify-center bg-white">
//                         <div>
//                           <p className="text-lg font-bold text-gray-800 text-center">75</p>
//                           <p className="text-xs text-gray-400 text-center">/100</p>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <p className="text-xs font-semibold text-orange-500">High Risk</p>
//                     </div>
//                   </div>
//                   <div className="mt-2 flex flex-col gap-1">
//                     <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Fraud Probability</span><span className="font-semibold text-orange-500">72%</span></div>
//                     <p className="text-xs text-orange-400">High</p>
//                     <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Restricted Goods Alerts</span><span className="font-semibold text-red-500">3 Alerts</span></div>
//                     <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Political Risk Indicator</span><span className="font-semibold text-orange-400">Medium</span></div>
//                     <div className="mt-1">
//                       <span className="text-xs bg-orange-100 text-orange-500 border border-orange-200 px-2 py-1 rounded-lg font-medium">Proceed with caution</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="flex-1 flex flex-col sm:flex-row gap-4">
//                   <div className="flex-1">
//                     <p className="text-xs font-semibold text-gray-700 mb-2">Trade Recommendation</p>
//                     <p className="text-xs text-gray-500">High Compliance risk due to product category and trade route history. Additional scrtuiny recommended.</p>
//                   </div>
//                   <div className="flex-1">
//                     <p className="text-xs font-semibold text-gray-700 mb-2">AI Suggestions</p>
//                     <ul className="flex flex-col gap-1">
//                       {["Verify BIS certification", "Check updated import regulation", "Ensure proper documentation", "monitor shipment closely"].map(s => (
//                         <li key={s} className="text-xs text-gray-500 flex items-start gap-1.5"><span className="text-teal-400 mt-0.5">•</span>{s}</li>
//                       ))}
//                     </ul>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* SECTION 6 - Rule Automation */}
//           <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-4">
//               <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</div>
//               <h2 className="text-sm font-semibold text-gray-800">Rule Automation</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
//               <div className="lg:col-span-2">
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Auto-Apply Condition</label>
//                 <div className="flex items-center gap-2">
//                   <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 flex-1 focus-within:border-teal-500 transition-all">
//                     <span className="text-xs text-gray-600 whitespace-nowrap">{form.autoApplyCondition}</span>
//                     <button onClick={() => set("autoApplyCondition", "")} className="text-gray-400 hover:text-gray-600"><FaXmark className="text-xs" /></button>
//                   </div>
//                   <button type="button" aria-label="Search country rules" onClick={runSearch} className="bg-[#0A8981] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-700">Search</button>
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-xs font-medium text-gray-600 mb-1.5">Shipment : Type</label>
//                 <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
//                   value={form.shipmentType} onChange={e => set("shipmentType", e.target.value)}>
//                   <option>All Shipment</option>
//                   <option>Air Freight</option>
//                   <option>Sea Freight</option>
//                   <option>Land Freight</option>
//                 </select>
//               </div>
//               <div>
//                 <p className="text-xs font-medium text-gray-600 mb-1.5">Vendor- Specific Rule</p>
//                 <Toggle checked={form.vendorRule} onChange={v => set("vendorRule", v)} />
//               </div>
//               <div className="flex gap-4 sm:gap-6 lg:flex-col lg:gap-3">
//                 <div>
//                   <p className="text-xs font-medium text-gray-600 mb-1.5">Smart Validation</p>
//                   <Toggle checked={form.smartValidation} onChange={v => set("smartValidation", v)} />
//                 </div>
//                 <div>
//                   <p className="text-xs font-medium text-gray-600 mb-1.5">Trigger Notification</p>
//                   <Toggle checked={form.triggerNotification} onChange={v => set("triggerNotification", v)} />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* BOTTOM ACTIONS */}
//           <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-gray-100 px-4 sm:px-5 py-4 shadow-sm">
//             <button onClick={onCancel} className="w-full sm:w-auto px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
//               Cancel
//             </button>
//             <div className="flex gap-2 w-full sm:w-auto">
//               <button onClick={handleSaveDraft}
//                 className={`flex-1 sm:flex-none flex items-center gap-2 justify-center px-6 py-2.5 text-sm border rounded-xl font-medium transition-all ${savedDraft ? "border-teal-400 text-teal-600 bg-teal-50" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
//                 <FaFloppyDisk className="text-xs" /> {savedDraft ? "Saved!" : "Save as Draft"}
//               </button>
//               <button onClick={handleSaveRule}
//                 className="flex-1 sm:flex-none flex items-center gap-2 justify-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
//                 Save Rule
//               </button>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

// function CountryRulesPage({ onAddClick }) {
//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [search, setSearch] = useState("");
//   const [appliedSearch, setAppliedSearch] = useState("");
//   const [hsSearch, setHsSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [searchError, setSearchError] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalRows,setTotalRows] = useState(0);
//   const [editRow, setEditRow] = useState(null);
//   const handleSearch = (value) => {setSearch(value);setSearchError("");};
//   const runSearch = () => {setPage(1);setAppliedSearch(search.trim());};
//   const filtered = rows.filter(r => {
//     const code = typeof r.hsCode === "object" ? r.hsCode?.code || r.hsCode?.hsCode || "" : String(r.hsCode || "");
//     return !hsSearch.trim() || code.toLowerCase().includes(hsSearch.trim().toLowerCase());
//   });
//   const totalPages = Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));
//   const pageItems = filtered;

//   const handleSaveEdit = async (updated) => {
//     await API.put(`/country-rules/${updated._id}`, {
//       importRestrictions: updated.importRestrictions,
//       status: updated.status,
//       taxRules: {
//         vatGst: Number(updated.taxRules?.vatGst),
//         customsDuty: Number(updated.taxRules?.customsDuty)
//       }
//     });
  
//     fetchRules();      // ✅ refresh
//     setEditRow(null);  // ✅ close modal
//   };

//   const fetchRules = async () => {
//     try {
//       setLoading(true);
  
//       const res = await API.get("/country-rules", {
//         params: {
//           search: appliedSearch,
//           status: statusFilter || undefined,
//           page,
//           limit: ITEMS_PER_PAGE
//         }
//       });
  
//       setRows(Array.isArray(res.data.data) ? res.data.data : []);
//       setTotalRows(Number(res.data.total || 0));
//     } catch (err) {
//       console.log(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchRules();
//   }, [appliedSearch, statusFilter, page]);


//   const [countries, setCountries] = useState([]);

// const fetchCountries = async () => {
//   const res = await API.get("/country");
//   setCountries(res.data.data);
// };

// useEffect(() => {
//   fetchCountries();
// }, []);

//   return (
//     <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
//       {editRow && <EditModal row={editRow} onClose={() => setEditRow(null)} onSave={handleSaveEdit} />}

//       <div className="max-w-6xl mx-auto">
//           <div className="mb-6 flex w-full items-center justify-end ">
//           {/* <div>
//             <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Country Rules</h1>
//             <p className="text-xs sm:text-sm text-gray-400 mt-1">Country-based regulations and tax settings</p>
//           </div> */}
//           <button onClick={onAddClick}
//             className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors shadow-sm whitespace-nowrap">
//             <FaPlus className="text-xs" /> Add Country Rule
//           </button>
//         </div>

//         <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 mb-4">
//           <div className="flex flex-col sm:flex-row gap-3 mb-1">
//             <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all flex-1">
//               <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />
//               <input className="flex-1 text-sm outline-none bg-transparent" placeholder="Search by Country"
//                 value={search} onChange={e => handleSearch(e.target.value)} />
//               <FaChevronDown className="text-gray-400 text-xs flex-shrink-0" />
//             </div>
//             <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all flex-1">
//               <input className="flex-1 text-sm outline-none bg-transparent" placeholder="Type HS Code"
//                 value={hsSearch} onChange={e => { setHsSearch(e.target.value); setPage(1); }} />
//             </div>
//           </div>
//           <div className="mb-3 flex flex-wrap items-center gap-2">
//             <label htmlFor="country-status-filter" className="text-xs font-medium text-slate-600">Status</label>
//             <select id="country-status-filter" value={statusFilter} onChange={e=>{setStatusFilter(e.target.value);setPage(1);}} className="rounded-lg border border-teal-100 bg-white px-3 py-2 text-sm">
//               <option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option>
//             </select>
//             {loading && <span className="text-xs text-slate-500">Loading rules…</span>}
//           </div>
//           {searchError && <p className="text-xs text-red-500 mb-2 px-1">{searchError}</p>}

//           <div className="overflow-x-auto mt-4">
//             <table className="w-full min-w-[600px]">
//               <thead>
//                 <tr className="bg-teal-50">
//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3 rounded-l-xl">Country</th>
//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Code</th>
//                    <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">HS Code</th>
//                     <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Origin Country</th>
//                     <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Destination Country</th>

//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">VAT/GST</th>
//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Custom Duty</th>
//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Import RESTRICTIONS</th>
//                   <th className="text-left text-xs font-semibold text-teal-600 px-3 py-3">Status</th>
//                   <th className="text-center text-xs font-semibold text-teal-600 px-3 py-3 rounded-r-xl">Actions</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {pageItems.length === 0 ? (
//                   <tr><td colSpan={10} className="text-center text-sm text-gray-400 py-10">No results found</td></tr>
//                 ) : pageItems.map(row => (
//                   <tr key={row._id} className="border-t border-gray-100">
//                     <td className="text-sm font-semibold text-gray-800 px-3 py-3">{row.destinationCountry?.name}</td>
//                     <td className="text-sm text-gray-500 px-3 py-3">{row.destinationCountry?.code}</td>
//                      <td className="text-sm text-gray-500 px-3 py-3">{row.hsCode?.hsCode || row.hsCode?.code || "—"}</td>
//                     <td className="text-sm text-gray-500 px-3 py-3">{row.sourceCountry?.name || "—"}</td>
//                     <td className="text-sm text-gray-500 px-3 py-3">{row.destinationCountry?.name || "—"}</td>

//                     <td className="text-sm font-semibold text-gray-800 px-3 py-3">{row.taxRules?.vatGst}%</td>
//                     <td className="text-sm text-gray-600 px-3 py-3">{row.taxRules?.customsDuty}</td>
//                     <td className="text-xs sm:text-sm text-gray-600 px-3 py-3">{row.importRestrictions}</td>
//                     <td className="px-3 py-3">
//                       <span className="text-xs bg-teal-100 text-teal-600 px-2.5 py-1 rounded-lg font-medium">{row.status}</span>
//                     </td>
//                     <td className="text-center px-3 py-3">
//                       <button onClick={() => setEditRow(row)} className="text-teal-500 hover:text-teal-600 text-sm font-medium">Edit</button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {totalPages > 0 && (
//             <div className="flex items-center justify-end gap-2 mt-4 flex-wrap">
//               <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
//                 className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-medium transition-colors">Preview</button>
//               {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
//                 <button key={p} onClick={() => setPage(p)}
//                   className={`w-9 h-9 rounded-xl text-sm font-medium transition-colors ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
//               ))}
//               <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
//                 className="px-4 py-2 text-sm border border-gray-200 rounded-xl text-gray-600 hover:bg-gray-50 disabled:opacity-40 font-medium transition-colors">Next</button>
//             </div>
//           )}
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//           {[["Total Counties", "156"], ["Average VAT Rate", "15.4%"], ["Countries with Restriction", "89"]].map(([label, val]) => (
//             <div key={label} className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm">
//               <p className="text-xs text-gray-400 mb-1">{label}</p>
//               <p className="text-2xl font-bold text-gray-800">{val}</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default function CountryRules() {
//   const [showAdd, setShowAdd] = useState(false);
//   const handleSave = (data) => { console.log("Saved Rule Data:", data); setShowAdd(false); };
//   return showAdd
//     ? <AddCountryRulePage onCancel={() => setShowAdd(false)} onSave={handleSave} />
//     : <CountryRulesPage onAddClick={() => setShowAdd(true)} />;
// }



import { glassSuccess, glassError } from "../../utils/glassAlert";
import { useState, useRef, useEffect } from "react";
import {
  FaPlus, FaMagnifyingGlass, FaXmark, FaCloudArrowUp,
  FaChevronDown, FaCopy, FaRobot, FaTriangleExclamation,
  FaFloppyDisk, FaPaperPlane, FaCheck
} from "react-icons/fa6";
import axios from "axios";
import Swal from "sweetalert2";

const Toggle = ({ checked, onChange }) => (
  <div onClick={() => onChange(!checked)}
    className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
    <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
  </div>
);

// All country-rule operations use the AI service, not the CargoMate /api backend.
// Keep VITE_AI_API_BASE_URL=https://ai-service-nb69.onrender.com/api in frontend/.env.
const countryRuleApi = axios.create({
  baseURL: (import.meta.env.VITE_AI_API_BASE_URL || "https://ai-service-nb69.onrender.com/api").replace(/\/+$/, ""),
  timeout: 30000,
});

const unwrap = (value) => value?.data?.data ?? value?.data ?? value;
const ruleId = (rule) => rule?.id || rule?._id;
const asNumber = (value) => {
  if (value === "" || value == null) return 0;
  const n = Number(String(value).replace(/,/g, "").replace(/[^\d.-]/g, ""));
  return Number.isFinite(n) ? n : 0;
};
const errorMessage = (error) => {
  const detail = error?.response?.data?.detail || error?.response?.data?.message;
  return Array.isArray(detail)
    ? detail.map((item) => `${(item.loc || []).join(".")}: ${item.msg}`).join("; ")
    : typeof detail === "string" ? detail : error?.message || "Request failed";
};
const listFromResponse = (response) => {
  const body = unwrap(response);
  if (Array.isArray(body)) return { list: body, total: body.length };
  const list = body?.items || body?.rules || body?.results || body?.data || [];
  return { list: Array.isArray(list) ? list : [], total: body?.total ?? body?.count ?? (Array.isArray(list) ? list.length : 0) };
};
const currencyCode = (value) => String(value || "USD").split(/[-\s]/)[0].toUpperCase();
const splitComma = (value) => String(value || "").split(",").map((v) => v.trim()).filter(Boolean);
const toForm = (r) => ({
  ruleName: r.rule_name || "", ruleCode: r.rule_id || "", ruleType: r.rule_type || "Import Restriction",
  hsCode: r.hs_code || "", originCountry: r.origin_country || "", destinationCountry: r.destination_country || "",
  status: r.active !== false, sourceCountry: r.source_country || "", destCountry: r.destination_country || "",
  applicableRegion: r.applicable_region || "", tradeZone: r.trade_zone || "ASEAN",
  customsApproval: !!r.customs_approval_required, licenseRequired: !!r.license_required,
  complianceNotes: r.compliance_notes || "", customsDuty: String(r.customs_duty_pct ?? 0),
  importTax: String(r.import_tax_pct ?? 0), exportTax: String(r.export_tax_pct ?? 0),
  vatGst: String(r.vat_pct ?? 0), currency: r.currency || "USD", penaltyCharges: String(r.penalty_charges ?? 0),
  calcFormula: r.calculation_formula || "CD+IT+VAT+Penalty", autoApplyCondition: r.auto_apply_condition || "",
  shipmentType: r.shipment_type || "All Shipment", vendorRule: !!r.vendor_specific,
  smartValidation: !!r.smart_validation, triggerNotification: !!r.trigger_notification,
  country: r.country || "", iso2: r.iso2 || "", aliases: Array.isArray(r.aliases) ? r.aliases.join(", ") : String(r.aliases || ""),
  tradeAgreement: r.trade_agreement || "", importNotes: r.import_notes || "",
  restrictedItems: r.restricted_items || "", aiIntelligence: JSON.stringify(r.ai_intelligence || {}),
});

const ITEMS_PER_PAGE = 7;
const DOC_OPTIONS = ["Invoice", "COO", "Bill of Landing", "Packing List", "Insurance", "Custom Declaration", "Certificate of Origin", "Health Certificate"];

function RuleDetailsModal({ rule, onClose }) {
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[85vh] w-full max-w-2xl overflow-auto rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold text-gray-800">Country Rule Details</h3><button onClick={onClose} aria-label="Close"><FaXmark /></button></div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Object.entries(rule || {}).filter(([key]) => !["_id"].includes(key)).map(([key, value]) => (
            <div key={key} className="rounded-lg border border-gray-100 p-2.5">
              <p className="text-xs font-semibold text-teal-700">{key.replace(/_/g, " ")}</p>
              <p className="break-words text-sm text-gray-700">{typeof value === "object" ? JSON.stringify(value) : String(value ?? "—")}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RuleApiToolModal({ mode, rule, onClose }) {
  const [country, setCountry] = useState(rule?.country || rule?.destination_country || "");
  const [assessableValue, setAssessableValue] = useState("1000");
  const [rates, setRates] = useState({ customs_duty_pct: String(rule?.customs_duty_pct ?? 0), import_tax_pct: String(rule?.import_tax_pct ?? 0), export_tax_pct: String(rule?.export_tax_pct ?? 0), vat_pct: String(rule?.vat_pct ?? 0), penalty_charges: String(rule?.penalty_charges ?? 0), currency: rule?.currency || "USD" });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const isResolve = mode === "resolve";
  const isSavedCalculation = mode === "saved-calculate";
  const title = isResolve ? "Resolve Country Rule" : isSavedCalculation ? "Calculate Saved Rule" : "Live Duty / Tax Calculation";
  const execute = async () => {
    setError("");
    if (isResolve && !country.trim()) return setError("Enter country, ISO2 or alias.");
    if (!isResolve && (!Number.isFinite(Number(assessableValue)) || Number(assessableValue) < 0)) return setError("Enter a valid assessable value.");
    if (isSavedCalculation && !ruleId(rule)) return setError("Saved rule ID is missing.");
    try {
      setLoading(true);
      const response = isResolve
        ? await countryRuleApi.get("/country-rules/resolve", { params: { country: country.trim() } })
        : isSavedCalculation
          ? await countryRuleApi.get(`/country-rules/${encodeURIComponent(ruleId(rule))}/calculate`, { params: { assessable_value: Number(assessableValue) } })
          : await countryRuleApi.get("/country-rules/calculate", { params: { assessable_value: Number(assessableValue), ...Object.fromEntries(Object.entries(rates).map(([k,v]) => [k, k === "currency" ? v : asNumber(v)])) } });
      setResult(unwrap(response));
    } catch (e) { setError(errorMessage(e)); }
    finally { setLoading(false); }
  };
  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/50 p-4" onClick={onClose}>
      <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-5 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="mb-4 flex items-center justify-between"><h3 className="text-lg font-semibold text-gray-800">{title}</h3><button onClick={onClose} aria-label="Close"><FaXmark /></button></div>
        {isResolve ? <label className="block text-sm">Country / ISO2 / Alias<input className="mt-1 w-full rounded-xl border p-2.5" value={country} onChange={e => setCountry(e.target.value)} placeholder="USA / AE / United Arab Emirates" /></label> : <>
          <label className="block text-sm">Assessable (CIF) Value<input type="number" min="0" className="mt-1 w-full rounded-xl border p-2.5" value={assessableValue} onChange={e => setAssessableValue(e.target.value)} /></label>
          {!isSavedCalculation && <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">{Object.entries(rates).map(([key, value]) => <label key={key} className="text-xs font-medium text-gray-600">{key.replace(/_/g, " ")}<input type={key === "currency" ? "text" : "number"} min={key === "currency" ? undefined : "0"} className="mt-1 w-full rounded-lg border p-2 text-sm" value={value} onChange={e => setRates(prev => ({...prev, [key]: e.target.value}))}/></label>)}</div>}
        </>}
        {error && <p role="alert" className="mt-3 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
        <button disabled={loading} onClick={execute} className="mt-4 rounded-xl bg-teal-500 px-5 py-2.5 text-sm font-semibold text-white disabled:opacity-50">{loading ? "Loading..." : "Calculate / Execute"}</button>
        {result !== null && <div className="mt-4"><h4 className="mb-2 font-semibold">API Response</h4><pre className="max-h-72 overflow-auto rounded-xl bg-slate-900 p-3 text-xs text-white">{JSON.stringify(result, null, 2)}</pre></div>}
      </div>
    </div>
  );
}

function AddCountryRulePage({ onCancel, onSave, initialRule = null }) {
  const fileRef = useRef();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [docs, setDocs] = useState(["Invoice", "COO", "Bill of Landing", "Packing List", "Insurance", "Custom Declaration"]);
  const [categories, setCategories] = useState(["Electronics"]);
  const [catInput, setCatInput] = useState("");
  const [savedDraft, setSavedDraft] = useState(false);

  const [form, setForm] = useState({
    ruleName: "Electronics Import Restriction",
    hsCode: "",
    originCountry: "",
    destinationCountry: "",
    ruleCode: "",
    ruleType: "Import Restriction",
    status: true,
    sourceCountry: "",
    destCountry: "",
    applicableRegion: "Import Restriction",
    tradeZone: "ASEAN",
    customsApproval: true,
    licenseRequired: true,
    complianceNotes: "All electronics items must comply with safety standards and required BIS certification additional documentation may be required based on product specifications",
    customsDuty: "12.50",
    importTax: "18.00",
    exportTax: "0.00",
    vatGst: "5.00",
    currency: "USD- US Dollar",
    penaltyCharges: "2,00000/-",
    calcFormula: "(CD+IT+VAT+Panelty)",
    autoApplyCondition: "Value > ₹1,00000",
    shipmentType: "All Shipment",
    vendorRule: true,
    smartValidation: true,
    triggerNotification: true,
    country: "", iso2: "", aliases: "", tradeAgreement: "", importNotes: "", restrictedItems: "", aiIntelligence: "{}",
  });

  useEffect(() => {
    if (initialRule) {
      setForm(toForm(initialRule));
      setDocs(Array.isArray(initialRule.required_documents) ? initialRule.required_documents : []);
      setCategories(Array.isArray(initialRule.restricted_product_categories) ? initialRule.restricted_product_categories : []);
    }
  }, [initialRule]);
  const [savingRule, setSavingRule] = useState(false);
  const runSearch = () => {
    if (!form.autoApplyCondition.trim()) return glassError("Enter an auto-apply condition");
    glassSuccess("Condition ready", "This condition will be included when you save the rule.");
  };
  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const copyToClipboard = (val) => navigator.clipboard.writeText(val);

  const removeDoc = (d) => setDocs(prev => prev.filter(x => x !== d));
  const addDoc = (d) => { if (!docs.includes(d)) setDocs(prev => [...prev, d]); };
  const removeCategory = (c) => setCategories(prev => prev.filter(x => x !== c));
  const addCategory = () => { if (catInput.trim() && !categories.includes(catInput.trim())) { setCategories(prev => [...prev, catInput.trim()]); setCatInput(""); } };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    setUploadedFiles(prev => [...prev, ...files]);
  };

  const collectData = () => ({
    basicRuleInfo: { ruleName: form.ruleName, hsCode: form.hsCode, originCountry: form.originCountry, destinationCountry: form.destinationCountry, ruleCode: form.ruleCode, ruleType: form.ruleType, status: form.status ? "Active" : "Inactive" },
    countryConfig: { sourceCountry: form.sourceCountry, destCountry: form.destCountry, applicableRegion: form.applicableRegion, tradeZone: form.tradeZone },
    compliance: { requiredDocuments: docs, customsApproval: form.customsApproval, licenseRequired: form.licenseRequired, restrictedCategories: categories, complianceNotes: form.complianceNotes, uploadedFiles: uploadedFiles.map(f => f.name) },
    taxDuty: { customsDuty: form.customsDuty, importTax: form.importTax, exportTax: form.exportTax, vatGst: form.vatGst, currency: form.currency, penaltyCharges: form.penaltyCharges, calcFormula: form.calcFormula },
    ruleAutomation: { autoApplyCondition: form.autoApplyCondition, shipmentType: form.shipmentType, vendorRule: form.vendorRule, smartValidation: form.smartValidation, triggerNotification: form.triggerNotification },
  });

  const handleSaveDraft = () => { setSavedDraft(true); setTimeout(() => setSavedDraft(false), 2500); };
  const handleSaveRule = async () => {
    if (!form.ruleName.trim() || !(form.destinationCountry || form.destCountry || form.country).trim()) {
      return glassError("Required details missing", "Enter rule name and destination country.");
    }
    let intelligence;
    try { intelligence = JSON.parse(form.aiIntelligence || "{}"); }
    catch { return glassError("Invalid AI intelligence JSON", "Please enter a valid JSON object."); }
    const payload = {
      rule_name: form.ruleName.trim(),
      rule_type: form.ruleType,
      hs_code: form.hsCode.trim(),
      origin_country: form.originCountry,
      destination_country: form.destinationCountry || form.destCountry || form.country,
      active: Boolean(form.status),
      source_country: form.sourceCountry,
      applicable_region: form.applicableRegion,
      trade_zone: form.tradeZone,
      required_documents: docs,
      customs_approval_required: Boolean(form.customsApproval),
      license_required: Boolean(form.licenseRequired),
      restricted_product_categories: categories,
      compliance_notes: form.complianceNotes,
      compliance_files: initialRule?.compliance_files || [],
      customs_duty_pct: asNumber(form.customsDuty),
      import_tax_pct: asNumber(form.importTax),
      export_tax_pct: asNumber(form.exportTax),
      vat_pct: asNumber(form.vatGst),
      currency: currencyCode(form.currency),
      penalty_charges: asNumber(form.penaltyCharges),
      calculation_formula: form.calcFormula,
      auto_apply_condition: form.autoApplyCondition,
      shipment_type: form.shipmentType,
      vendor_specific: Boolean(form.vendorRule),
      smart_validation: Boolean(form.smartValidation),
      trigger_notification: Boolean(form.triggerNotification),
      ai_intelligence: intelligence,
      country: form.country || form.destinationCountry || form.destCountry,
      iso2: form.iso2.trim().toUpperCase(),
      aliases: splitComma(form.aliases),
      trade_agreement: form.tradeAgreement,
      import_notes: form.importNotes,
      restricted_items: form.restrictedItems,
    };
    // Omit rule_id when creating so the AI backend can generate a unique one.
    if (form.ruleCode.trim()) payload.rule_id = form.ruleCode.trim();
    // AI API accepts file metadata/URLs only, not raw File objects inside JSON.
    // Existing UI file selection remains, but upload requires a dedicated file endpoint.
    if (uploadedFiles.length) return glassError("Files not uploaded", "Please upload files using the AI service file endpoint first; this JSON API does not upload binary files.");
    try {
      setSavingRule(true);
      const response = initialRule
        ? await countryRuleApi.put(`/country-rules/${encodeURIComponent(ruleId(initialRule))}`, payload)
        : await countryRuleApi.post("/country-rules", payload);
      await glassSuccess(initialRule ? "Country rule updated" : "Country rule created");
      onSave?.(unwrap(response));
    } catch (err) {
      console.error("AI country rule save failed:", err);
      glassError("Country rule request failed", errorMessage(err));
    } finally { setSavingRule(false); }
  };

  const [countries] = useState([]); // Country selectors are free-text via AI payload; do not call legacy /country.

  const liveCalc = {
    assessable: 1800,
    customsDuty: ((parseFloat(form.customsDuty) || 0) / 100 * 1800).toFixed(2),
    importTax: ((parseFloat(form.importTax) || 0) / 100 * 1800).toFixed(2),
    vatGst: ((parseFloat(form.vatGst) || 0) / 100 * 1800).toFixed(2),
    penalty: 500,
  };
  const totalPayable = (1800 + parseFloat(liveCalc.customsDuty) + parseFloat(liveCalc.importTax) + parseFloat(liveCalc.vatGst) + 500).toFixed(2);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-start justify-between gap-3 mb-6">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-gray-800">{initialRule ? "Edit Country Rule" : "Add Country Rule"}</h1>
            <p className="text-xs text-gray-400 mt-0.5">Add country Rule</p>
          </div>
          <button onClick={handleSaveRule} disabled={savingRule} className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
            <FaPlus className="text-xs" /> {initialRule ? "Update Country Rule" : "Add Country Rule"}
          </button>
        </div>

        <div className="flex flex-col gap-4">

          {/* HEADER BANNER */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-start gap-3 shadow-sm">
            <div className="w-8 h-8 bg-teal-100 rounded-lg flex-shrink-0" />
            <div>
              <p className="text-sm font-semibold text-gray-800">Create New Country Trade Rule</p>
              <p className="text-xs text-gray-400 mt-0.5">Define import/export restrictions, compliance requirements, taxation rules, ands trade conditions for specific countries.</p>
            </div>
          </div>

          {/* SECTION 1 - Basic Rule Information */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">1</div>
              <h2 className="text-sm font-semibold text-gray-800">Basic Rule Information</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule name</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                  value={form.ruleName} onChange={e => set("ruleName", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">HS Code</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                  value={form.hsCode} onChange={e => set("hsCode", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Origin Country</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                  value={form.originCountry} onChange={e => set("originCountry", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Destination Country</label>
                <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                  value={form.destinationCountry} onChange={e => set("destinationCountry", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule name</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
                  <input className="flex-1 text-sm outline-none min-w-0" value={form.ruleCode} onChange={e => set("ruleCode", e.target.value)} />
                  <button onClick={() => copyToClipboard(form.ruleCode)} className="text-gray-400 hover:text-teal-500 transition-colors flex-shrink-0">
                    <FaCopy className="text-sm" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Rule Type</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                  value={form.ruleType} onChange={e => set("ruleType", e.target.value)}>
                  <option>Import Restriction</option>
                  <option>Export Restriction</option>
                  <option>Tax Rule</option>
                  <option>Compliance Rule</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Status</label>
                <div className="flex items-center gap-2 mt-2">
                  <Toggle checked={form.status} onChange={v => set("status", v)} />
                  <span className="text-sm text-gray-700 font-medium">Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Additional fields required by the AI /country-rules API */}
          <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
            <h2 className="mb-3 text-sm font-semibold text-gray-800">Country Identification & Trade Details</h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {[
                ["country", "Country Name"], ["iso2", "ISO2 Code"], ["aliases", "Aliases (comma separated)"],
                ["tradeAgreement", "Trade Agreement"], ["importNotes", "Import Notes"], ["restrictedItems", "Restricted Items"],
              ].map(([key, label]) => <label key={key} className="text-xs font-medium text-gray-600">{label}<input className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2.5 text-sm" value={form[key] || ""} onChange={e => set(key, e.target.value)} /></label>)}
              <label className="sm:col-span-2 text-xs font-medium text-gray-600">AI Intelligence (JSON)<textarea className="mt-1 w-full rounded-xl border border-gray-200 px-3 py-2 text-sm" rows={2} value={form.aiIntelligence} onChange={e => set("aiIntelligence", e.target.value)} /></label>
            </div>
          </div>

          {/* SECTION 2 - Country Configuration */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">2</div>
              <h2 className="text-sm font-semibold text-gray-800">Country Configuration</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Source Country</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
                <input className="min-w-0 flex-1 text-sm outline-none" placeholder="Source country" value={form.sourceCountry} onChange={(e) => set("sourceCountry", e.target.value)} />
                  <button onClick={() => set("sourceCountry", "")} className="text-gray-400 hover:text-gray-600"><FaXmark className="text-xs" /></button>
                  <FaChevronDown className="text-gray-400 text-xs" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Destination Country</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
                <input className="min-w-0 flex-1 text-sm outline-none" placeholder="Destination country" value={form.destCountry} onChange={(e) => { set("destCountry", e.target.value); set("destinationCountry", e.target.value); }} />
                  <button onClick={() => copyToClipboard(form.destCountry)} className="text-gray-400 hover:text-teal-500 transition-colors">
                    <FaCopy className="text-sm" />
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Applicable Region</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                  value={form.applicableRegion} onChange={e => set("applicableRegion", e.target.value)}>
                  <option>Import Restriction</option>
                  <option>Asia Pacific</option>
                  <option>Europe</option>
                  <option>Middle East</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Trade Zone</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                  value={form.tradeZone} onChange={e => set("tradeZone", e.target.value)}>
                  <option>ASEAN</option>
                  <option>EU</option>
                  <option>NAFTA</option>
                  <option>GCC</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 3 - Compliance & Documentation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">3</div>
              <h2 className="text-sm font-semibold text-gray-800">Compliance & Documentation</h2>
            </div>

            <div className="mb-4">
              <label className="block text-xs font-medium text-gray-600 mb-1.5">Required Documents</label>
              <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap gap-1.5 items-center min-h-[44px] focus-within:border-teal-500 transition-all">
                {docs.map(d => (
                  <span key={d} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                    {d}
                    <button onClick={() => removeDoc(d)} className="text-gray-400 hover:text-gray-700"><FaXmark className="text-xs" /></button>
                  </span>
                ))}
                <select className="text-xs outline-none bg-transparent text-teal-500 cursor-pointer"
                  onChange={e => { if (e.target.value) addDoc(e.target.value); e.target.value = ""; }}>
                  <option value="">+ Add</option>
                  {DOC_OPTIONS.filter(d => !docs.includes(d)).map(d => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">Customs Approval Required</span>
                  <Toggle checked={form.customsApproval} onChange={v => set("customsApproval", v)} />
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-medium text-gray-600">License Required</span>
                  <Toggle checked={form.licenseRequired} onChange={v => set("licenseRequired", v)} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Restricted Product Categories</label>
                <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex flex-wrap gap-1.5 items-center min-h-[44px]">
                  {categories.map(c => (
                    <span key={c} className="flex items-center gap-1 bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-lg">
                      {c}
                      <button onClick={() => removeCategory(c)} className="text-gray-400 hover:text-gray-700"><FaXmark className="text-xs" /></button>
                    </span>
                  ))}
                  <input className="text-xs outline-none bg-transparent placeholder-teal-400 text-gray-600 w-20"
                    placeholder="Add more..." value={catInput} onChange={e => setCatInput(e.target.value)}
                    onKeyDown={e => e.key === "Enter" && addCategory()} />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Compliance Notes</label>
                <textarea className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 resize-none transition-all"
                  rows={4} value={form.complianceNotes} onChange={e => set("complianceNotes", e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Upload Compliance Files</label>
                <div
                  onDrop={handleDrop} onDragOver={e => e.preventDefault()}
                  onClick={() => fileRef.current.click()}
                  className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex flex-col items-center justify-center cursor-pointer hover:border-teal-400 hover:bg-teal-50/30 transition-all min-h-[100px]">
                  <FaCloudArrowUp className="text-teal-400 text-2xl mb-2" />
                  <p className="text-xs font-medium text-gray-600">Drag & drop files here</p>
                  <p className="text-xs text-gray-400">or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">PDF, DOC, DOCX (Max 10MB)</p>
                </div>
                <input ref={fileRef} type="file" multiple accept=".pdf,.doc,.docx" className="hidden" onChange={handleFileUpload} />
                {uploadedFiles.length > 0 && (
                  <div className="mt-2 flex flex-col gap-1">
                    {uploadedFiles.map((f, i) => (
                      <div key={i} className="flex items-center gap-2 bg-teal-50 border border-teal-100 rounded-lg px-3 py-1.5">
                        <FaCheck className="text-teal-500 text-xs flex-shrink-0" />
                        <span className="text-xs text-gray-600 truncate flex-1">{f.name}</span>
                        <button onClick={() => setUploadedFiles(prev => prev.filter((_, idx) => idx !== i))} className="text-gray-400 hover:text-red-500">
                          <FaXmark className="text-xs" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* SECTION 4 - Tax & Duty Rules */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">4</div>
              <h2 className="text-sm font-semibold text-gray-800">Tax & Duty Rules</h2>
            </div>
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-3">
                  {[
                    ["Customs Duty (%)", "customsDuty"],
                    ["Import Tax (%)", "importTax"],
                    ["Export Tax (%)", "exportTax"],
                    ["VAT/GST (%)", "vatGst"],
                  ].map(([label, key]) => (
                    <div key={key}>
                      <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
                      <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                        value={form[key]} onChange={e => set(key, e.target.value)} />
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Currency</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                      value={form.currency} onChange={e => set("currency", e.target.value)}>
                      <option>USD- US Dollar</option>
                      <option>EUR- Euro</option>
                      <option>INR- Indian Rupee</option>
                      <option>AED- UAE Dirham</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Penalty Charges</label>
                    <input className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all"
                      value={form.penaltyCharges}
                      onChange={(e) => {
                        const value = e.target.value.replace(/[^\d.]/g, "");
                        set("penaltyCharges", value);
                      }}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-600 mb-1.5">Calculation Formula</label>
                    <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
                      <input className="flex-1 text-sm outline-none min-w-0" value={form.calcFormula} onChange={e => set("calcFormula", e.target.value)} />
                      <span className="text-xs bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded font-medium">fx</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="w-full lg:w-56 bg-teal-50 border border-teal-100 rounded-xl p-4 flex-shrink-0">
                <p className="text-xs font-semibold text-teal-700 mb-3">Live Calculation Preview</p>
                <div className="flex flex-col gap-1.5">
                  {[
                    ["Assessable Value (USD)", `${liveCalc.assessable}.00`],
                    [`Customs Duty (${form.customsDuty}%)`, liveCalc.customsDuty],
                    [`Import Tax (${form.importTax}%)`, liveCalc.importTax],
                    [`VATGST (${form.vatGst}%)`, liveCalc.vatGst],
                    ["Penalty Charges", "500.00"],
                  ].map(([label, val]) => (
                    <div key={label} className="flex justify-between">
                      <span className="text-xs text-gray-500">{label}</span>
                      <span className="text-xs text-gray-700 font-medium">{val}</span>
                    </div>
                  ))}
                  <div className="border-t border-teal-200 pt-2 mt-1 flex justify-between">
                    <span className="text-xs font-semibold text-gray-700">Total Payable (USD)</span>
                    <span className="text-xs font-bold text-teal-600">{parseFloat(totalPayable).toLocaleString()}/-</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 5 - AI Trade Intelligence */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">5</div>
              <h2 className="text-sm font-semibold text-gray-800 flex items-center gap-2"><FaRobot className="text-teal-500" /> AI Trade Intelligence</h2>
            </div>
            <div className="bg-teal-50 border border-teal-100 rounded-xl p-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-shrink-0">
                  <p className="text-xs font-semibold text-gray-700 mb-2">AI Risk Score</p>
                  <div className="flex items-end gap-2">
                    <div className="relative w-20 h-20">
                      <div className="w-20 h-20 rounded-full border-8 border-gray-100 flex items-center justify-center bg-white">
                        <div>
                          <p className="text-lg font-bold text-gray-800 text-center">75</p>
                          <p className="text-xs text-gray-400 text-center">/100</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-orange-500">High Risk</p>
                    </div>
                  </div>
                  <div className="mt-2 flex flex-col gap-1">
                    <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Fraud Probability</span><span className="font-semibold text-orange-500">72%</span></div>
                    <p className="text-xs text-orange-400">High</p>
                    <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Restricted Goods Alerts</span><span className="font-semibold text-red-500">3 Alerts</span></div>
                    <div className="flex justify-between text-xs gap-4"><span className="text-gray-500">Political Risk Indicator</span><span className="font-semibold text-orange-400">Medium</span></div>
                    <div className="mt-1">
                      <span className="text-xs bg-orange-100 text-orange-500 border border-orange-200 px-2 py-1 rounded-lg font-medium">Proceed with caution</span>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-2">Trade Recommendation</p>
                    <p className="text-xs text-gray-500">High Compliance risk due to product category and trade route history. Additional scrtuiny recommended.</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-gray-700 mb-2">AI Suggestions</p>
                    <ul className="flex flex-col gap-1">
                      {["Verify BIS certification", "Check updated import regulation", "Ensure proper documentation", "monitor shipment closely"].map(s => (
                        <li key={s} className="text-xs text-gray-500 flex items-start gap-1.5"><span className="text-teal-400 mt-0.5">•</span>{s}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 6 - Rule Automation */}
          <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-7 h-7 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0">6</div>
              <h2 className="text-sm font-semibold text-gray-800">Rule Automation</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 items-start">
              <div className="lg:col-span-2">
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Auto-Apply Condition</label>
                <div className="flex items-center gap-2">
                  <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 flex-1 focus-within:border-teal-500 transition-all">
                    <span className="text-xs text-gray-600 whitespace-nowrap">{form.autoApplyCondition}</span>
                    <button onClick={() => set("autoApplyCondition", "")} className="text-gray-400 hover:text-gray-600"><FaXmark className="text-xs" /></button>
                  </div>
                  <button type="button" aria-label="Search country rules" onClick={runSearch} className="bg-[#0A8981] text-white px-3 py-1.5 rounded-lg text-xs font-semibold hover:bg-teal-700">Search</button>
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1.5">Shipment : Type</label>
                <select className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
                  value={form.shipmentType} onChange={e => set("shipmentType", e.target.value)}>
                  <option>All Shipment</option>
                  <option>Air Freight</option>
                  <option>Sea Freight</option>
                  <option>Land Freight</option>
                </select>
              </div>
              <div>
                <p className="text-xs font-medium text-gray-600 mb-1.5">Vendor- Specific Rule</p>
                <Toggle checked={form.vendorRule} onChange={v => set("vendorRule", v)} />
              </div>
              <div className="flex gap-4 sm:gap-6 lg:flex-col lg:gap-3">
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1.5">Smart Validation</p>
                  <Toggle checked={form.smartValidation} onChange={v => set("smartValidation", v)} />
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-600 mb-1.5">Trigger Notification</p>
                  <Toggle checked={form.triggerNotification} onChange={v => set("triggerNotification", v)} />
                </div>
              </div>
            </div>
          </div>

          {/* BOTTOM ACTIONS */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white rounded-2xl border border-gray-100 px-4 sm:px-5 py-4 shadow-sm">
            <button onClick={onCancel} className="w-full sm:w-auto px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">
              Cancel
            </button>
            <div className="flex gap-2 w-full sm:w-auto">
              <button onClick={handleSaveDraft}
                className={`flex-1 sm:flex-none flex items-center gap-2 justify-center px-6 py-2.5 text-sm border rounded-xl font-medium transition-all ${savedDraft ? "border-teal-400 text-teal-600 bg-teal-50" : "border-gray-300 text-gray-700 hover:bg-gray-50"}`}>
                <FaFloppyDisk className="text-xs" /> {savedDraft ? "Saved!" : "Save as Draft"}
              </button>
              <button onClick={handleSaveRule} disabled={savingRule}
                className="flex-1 sm:flex-none flex items-center gap-2 justify-center bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
                {savingRule ? "Saving..." : initialRule ? "Update Rule" : "Save Rule"}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

function CountryRulesPage({ onAddClick, refreshKey, onEditClick }) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [hsSearch, setHsSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [selectedRule, setSelectedRule] = useState(null);
  const [tool, setTool] = useState(null);
  const [toolRule, setToolRule] = useState(null);
  const [actionLoading, setActionLoading] = useState("");
  const [deletedRefresh, setDeletedRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    const fetchRules = async () => {
      try {
        setLoading(true); setError("");
        const result = await countryRuleApi.get("/country-rules", { params: { page, limit: ITEMS_PER_PAGE, ...(search.trim() ? { search: search.trim() } : {}), ...(statusFilter ? { active: statusFilter === "active" } : {}), ...(hsSearch.trim() ? { hs_code: hsSearch.trim() } : {}) } });
        if (!active) return;
        const { list, total } = listFromResponse(result);
        // Filter locally too for AI APIs that ignore query params.
        const filtered = list.filter(r =>
          (!search.trim() || [r.country, r.destination_country, r.rule_name, r.iso2].some(v => String(v || "").toLowerCase().includes(search.trim().toLowerCase()))) &&
          (!hsSearch.trim() || String(r.hs_code || "").toLowerCase().includes(hsSearch.trim().toLowerCase())) &&
          (!statusFilter || Boolean(r.active) === (statusFilter === "active"))
        );
        setRows(filtered);
        setTotalRows(Number(total) || filtered.length);
      } catch (e) { if (active) setError(errorMessage(e)); }
      finally { if (active) setLoading(false); }
    };
    fetchRules();
    return () => { active = false; };
  }, [page, search, hsSearch, statusFilter, refreshKey, deletedRefresh]);
  const totalPages = Math.max(1, Math.ceil(totalRows / ITEMS_PER_PAGE));
  const averageVat = rows.length ? (rows.reduce((sum, r) => sum + asNumber(r.vat_pct), 0) / rows.length).toFixed(1) : "0.0";
  const restrictionCount = rows.filter(r => r.restricted_items || (r.restricted_product_categories || []).length || r.import_notes).length;
  const getOne = async (r, action = "view") => {
    const id = ruleId(r);
    if (!id) return glassError("Missing rule ID", "The AI service did not return an id.");
    try {
      setActionLoading(`${action}:${id}`);
      const response = await countryRuleApi.get(`/country-rules/${encodeURIComponent(id)}`);
      const fullRule = unwrap(response);
      if (action === "edit") onEditClick(fullRule);
      else setSelectedRule(fullRule);
    } catch (e) { glassError("Unable to load country rule", errorMessage(e)); }
    finally { setActionLoading(""); }
  };
  const deleteRule = async (r) => {
    const id = ruleId(r);
    if (!id) return glassError("Missing rule ID");
    const confirmation = await Swal.fire({ title: "Delete country rule?", text: `Delete ${r.rule_name || r.country || "this rule"}?`, icon: "warning", showCancelButton: true, confirmButtonText: "Delete", confirmButtonColor: "#dc2626" });
    if (!confirmation.isConfirmed) return;
    try {
      setActionLoading(`delete:${id}`);
      await countryRuleApi.delete(`/country-rules/${encodeURIComponent(id)}`);
      await glassSuccess("Country rule deleted");
      setDeletedRefresh(v => v + 1);
    } catch (e) { glassError("Delete failed", errorMessage(e)); }
    finally { setActionLoading(""); }
  };
  const showTool = (mode, rule = null) => { setTool(mode); setToolRule(rule); };
  return (
    <div className="min-h-screen bg-gray-50 p-1 sm:p-1">
      {selectedRule && <RuleDetailsModal rule={selectedRule} onClose={() => setSelectedRule(null)} />}
      {tool && <RuleApiToolModal mode={tool} rule={toolRule} onClose={() => setTool(null)} />}
      <div className="max-w-6xl mx-auto">
        <div className="mb-6 flex w-full flex-wrap items-center justify-end gap-2">
          <button onClick={() => showTool("resolve")} className="rounded-xl border border-teal-300 bg-white px-3 py-2 text-xs font-semibold text-teal-700">Resolve Country</button>
          <button onClick={() => showTool("calculate")} className="rounded-xl border border-teal-300 bg-white px-3 py-2 text-xs font-semibold text-teal-700">Calculate Duty / Tax</button>
          <button onClick={onAddClick} className="flex items-center gap-2 rounded-xl bg-teal-500 px-3 py-2 text-xs font-medium text-white shadow-sm hover:bg-teal-600 sm:px-4 sm:text-sm"><FaPlus className="text-xs" /> Add Country Rule</button>
        </div>
        <div className="mb-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-3 flex flex-col gap-3 sm:flex-row">
            <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5"><FaMagnifyingGlass className="text-gray-400" /><input placeholder="Search by Country" className="min-w-0 flex-1 bg-transparent text-sm outline-none" value={search} onChange={e => { setSearch(e.target.value); setPage(1); }}/></div>
            <div className="flex flex-1 items-center rounded-xl border border-gray-200 px-3 py-2.5"><input placeholder="Type HS Code" className="min-w-0 flex-1 bg-transparent text-sm outline-none" value={hsSearch} onChange={e => { setHsSearch(e.target.value); setPage(1); }}/></div>
          </div>
          <div className="mb-3 flex items-center gap-2"><label className="text-xs font-medium text-slate-600">Status</label><select className="rounded-lg border border-teal-100 bg-white px-3 py-2 text-sm" value={statusFilter} onChange={e => {setStatusFilter(e.target.value); setPage(1);}}><option value="">All statuses</option><option value="active">Active</option><option value="inactive">Inactive</option></select>{loading && <span className="text-xs text-gray-500">Loading rules…</span>}</div>
          {error && <p role="alert" className="mb-2 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">{error}</p>}
          <div className="overflow-x-auto mt-4">
            <table className="w-full min-w-[900px]">
              <thead><tr className="bg-teal-50">{["Country", "Code", "HS Code", "Origin Country", "Destination Country", "VAT/GST", "Custom Duty", "Import RESTRICTIONS", "Status", "Actions"].map(label => <th key={label} className="px-3 py-3 text-left text-xs font-semibold text-teal-600">{label}</th>)}</tr></thead>
              <tbody>{rows.length === 0 ? <tr><td colSpan={10} className="py-10 text-center text-sm text-gray-400">{loading ? "Loading..." : "No results found"}</td></tr> : rows.map((r, index) => <tr key={ruleId(r) || index} className="border-t border-gray-100">
                <td className="px-3 py-3 text-sm font-semibold text-gray-800">{r.country || r.destination_country || "—"}</td>
                <td className="px-3 py-3 text-sm text-gray-500">{r.iso2 || "—"}</td>
                <td className="px-3 py-3 text-sm text-gray-500">{r.hs_code || "—"}</td>
                <td className="px-3 py-3 text-sm text-gray-500">{r.origin_country || r.source_country || "—"}</td>
                <td className="px-3 py-3 text-sm text-gray-500">{r.destination_country || "—"}</td>
                <td className="px-3 py-3 text-sm font-semibold text-gray-800">{r.vat_pct ?? 0}%</td>
                <td className="px-3 py-3 text-sm text-gray-600">{r.customs_duty_pct ?? 0}</td>
                <td className="max-w-[260px] px-3 py-3 text-xs text-gray-600">{r.import_notes || r.restricted_items || r.compliance_notes || "—"}</td>
                <td className="px-3 py-3"><span className={`rounded-lg px-2.5 py-1 text-xs font-medium ${r.active !== false ? "bg-teal-100 text-teal-700" : "bg-gray-100 text-gray-500"}`}>{r.active !== false ? "active" : "inactive"}</span></td>
                <td className="px-3 py-3"><div className="flex flex-wrap items-center gap-2 text-xs font-semibold">
                  <button disabled={!!actionLoading} onClick={() => getOne(r)} className="text-sky-700">View</button>
                  <button disabled={!!actionLoading} onClick={() => getOne(r,"edit")} className="text-teal-600">Edit</button>
                  <button disabled={!!actionLoading} onClick={() => deleteRule(r)} className="text-rose-600">Delete</button>
                  <button disabled={!!actionLoading} onClick={() => showTool("saved-calculate",r)} className="text-indigo-600">Calculate</button>
                </div></td>
              </tr>)}</tbody>
            </table>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
            <button disabled={page === 1} onClick={() => setPage(v => Math.max(1, v-1))} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40">Previous</button>
            <span className="text-xs text-gray-500">Page {page} of {totalPages}</span>
            <button disabled={page === totalPages} onClick={() => setPage(v => Math.min(totalPages, v+1))} className="rounded-xl border px-4 py-2 text-sm disabled:opacity-40">Next</button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {[["Total Countries / Rules", totalRows], ["Average VAT Rate (visible)", `${averageVat}%`], ["Rules With Restrictions (visible)", restrictionCount]].map(([label, val]) => (
            <div key={label} className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm"><p className="mb-1 text-xs text-gray-400">{label}</p><p className="text-2xl font-bold text-gray-800">{val}</p></div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function CountryRules() {
  const [showAdd, setShowAdd] = useState(false);
  const [editRule, setEditRule] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const handleSaved = () => { setShowAdd(false); setEditRule(null); setRefreshKey(v => v + 1); };
  return showAdd || editRule
    ? <AddCountryRulePage key={ruleId(editRule) || "new"} initialRule={editRule} onCancel={() => { setShowAdd(false); setEditRule(null); }} onSave={handleSaved} />
    : <CountryRulesPage refreshKey={refreshKey} onAddClick={() => setShowAdd(true)} onEditClick={r => setEditRule(r)} />;
}
