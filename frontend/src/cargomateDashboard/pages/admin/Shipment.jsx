// // // import { useState, useRef } from "react";
// // // import {
// // //   FaDownload, FaPlus, FaMagnifyingGlass, FaChevronLeft, FaChevronRight,
// // //   FaShip, FaCheck, FaFileLines, FaBoxOpen, FaCircleExclamation,
// // //   FaUserShield, FaMoneyBill, FaChevronDown, FaCalendar, FaCloudArrowUp,
// // //   FaXmark, FaLightbulb, FaStar, FaClock, FaChartLine, FaUsers, FaBolt
// // // } from "react-icons/fa6";
// // // import { useEffect } from "react";
// // // import API from "../../api/axios";
// // // import PendingReview  from "./PendingReview"
// // // import AIModulesBackendScope from "./AiModules";

// // // const Toggle = ({ checked, onChange }) => (
// // //   <div onClick={() => onChange(!checked)}
// // //     className={`relative w-10 h-6 rounded-full cursor-pointer flex-shrink-0 transition-all duration-200 ${checked ? "bg-teal-500" : "bg-gray-300"}`}>
// // //     <div className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-5" : "left-1"}`} />
// // //   </div>
// // // );

// // // const allRows = Array.from({ length: 30 }, (_, i) => ({
// // //   id: i + 1,
// // //   sb: "SB2025-00321",
// // //   bol: "BOL: MSCU9823441",
// // //   exporter: "Sunfresh Export Pvt Ltd",
// // //   iec: "IEC: 0514092847",
// // //   origin: "HYD ICD – Hamburg, DE",
// // //   hsCode: "6109.10",
// // //   carrier: "MSC",
// // //   mode: "Sea FCL",
// // //   etd: "ETD: 18 Apr 2026",
// // //   eta: "ETA: 12 May 2026",
// // //   status: ["In Transit", "Delivered", "Pending Docs", "Custom Hold"][i % 4],
// // // }));

// // // const ROWS_PER_PAGE = 11;

// // // const statusStyle = (s) => {
// // //   if (s === "In Transit") return "bg-teal-100 text-teal-600";
// // //   if (s === "Delivered") return "bg-green-100 text-green-600";
// // //   if (s === "Pending Docs") return "bg-yellow-100 text-yellow-600";
// // //   if (s === "Custom Hold") return "bg-red-100 text-red-500";
// // //   return "bg-gray-100 text-gray-500";
// // // };

// // // const STEPS = ["Exporter Details", "Cargo Info", "Route & carrier", "Documents"];

// // // function StepSidebar({ currentStep }) {
// // //   return (
// // //     <div className="bg-teal-50 rounded-2xl p-4 sm:p-5 w-full lg:w-56 flex-shrink-0">
// // //       <p className="text-sm font-bold text-gray-800 mb-4">Create Booking</p>
// // //       <div className="flex flex-row lg:flex-col gap-2 lg:gap-0">
// // //         {STEPS.map((s, i) => {
// // //           const done = i < currentStep;
// // //           const active = i === currentStep;
// // //           return (
// // //             <div key={s} className="flex items-start gap-3 lg:mb-4">
// // //               <div className="flex flex-col items-center flex-shrink-0">
// // //                 <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${done ? "bg-teal-500 border-teal-500 text-white" : active ? "bg-white border-teal-500 text-teal-500" : "bg-white border-gray-300 text-gray-400"}`}>
// // //                   {done ? <FaCheck className="text-xs" /> : i + 1}
// // //                 </div>
// // //                 {i < STEPS.length - 1 && <div className={`w-0.5 h-6 mt-1 hidden lg:block ${done ? "bg-teal-500" : "bg-gray-200"}`} />}
// // //               </div>
// // //               <div className="hidden lg:block min-w-0">
// // //                 <p className={`text-xs font-semibold ${active || done ? "text-gray-800" : "text-gray-400"}`}>{s}</p>
// // //                 <p className="text-xs text-gray-400">Step {i + 1} to 4</p>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Step1({ form, set, onNext }) {
// // //   const [errors, setErrors] = useState({});
// // //   const validate = () => {
// // //     const e = {};
// // //     if (!form.companyName.trim()) e.companyName = "Required";
// // //     if (!form.iec1.trim()) e.iec1 = "Required";
// // //     if (!form.contactPerson.trim()) e.contactPerson = "Required";
// // //     if (!form.mobile.trim()) e.mobile = "Required";
// // //     return e;
// // //   };
// // //   const handleNext = () => { const e = validate(); if (Object.keys(e).length) { setErrors(e); return; } onNext(); };
// // //   const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
// // //   const err = (k) => errors[k] ? "border-red-400" : "";
// // //   return (
// // //     <div className="flex-1 min-w-0">
// // //       <h2 className="text-base font-bold text-gray-800 mb-0.5">Exporter Details</h2>
// // //       <p className="text-xs text-gray-400 mb-5">Enter exporter / shipper information</p>
// // //       <div className="flex flex-col gap-4">
// // //         <div>
// // //           <label className="block text-xs font-semibold text-gray-700 mb-1.5">Company Name</label>
// // //           <input className={`${inp} ${err("companyName")}`} placeholder="Company Name" value={form.companyName} onChange={e => { set("companyName", e.target.value); setErrors(p => ({...p, companyName: ""})); }} />
// // //           {errors.companyName && <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>}
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">IEC Number</label>
// // //             <input className={`${inp} ${err("iec1")}`} placeholder="Type IEC Num..." value={form.iec1} onChange={e => { set("iec1", e.target.value); setErrors(p => ({...p, iec1: ""})); }} />
// // //             {errors.iec1 && <p className="text-xs text-red-500 mt-1">{errors.iec1}</p>}
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">IEC Number</label>
// // //             <input className={inp} placeholder="Type IEC Num..." value={form.iec2} onChange={e => set("iec2", e.target.value)} />
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Contact Person</label>
// // //             <input className={`${inp} ${err("contactPerson")}`} placeholder="Type Name" value={form.contactPerson} onChange={e => { set("contactPerson", e.target.value); setErrors(p => ({...p, contactPerson: ""})); }} />
// // //             {errors.contactPerson && <p className="text-xs text-red-500 mt-1">{errors.contactPerson}</p>}
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Mobile Number</label>
// // //             <input className={`${inp} ${err("mobile")}`} placeholder="Type Mobile Number" value={form.mobile} onChange={e => { set("mobile", e.target.value); setErrors(p => ({...p, mobile: ""})); }} />
// // //             {errors.mobile && <p className="text-xs text-red-500 mt-1">{errors.mobile}</p>}
// // //           </div>
// // //         </div>
// // //         <div className="flex justify-end mt-2">
// // //           <button onClick={handleNext} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-xl text-sm font-medium transition-colors">Next</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Step2({ form, set, onNext }) {
// // //   const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
// // //   return (
// // //     <div className="flex-1 min-w-0">
// // //       <h2 className="text-base font-bold text-gray-800 mb-0.5">Cargo Info</h2>
// // //       <p className="text-xs text-gray-400 mb-5">Enter Cargo Information</p>
// // //       <div className="flex flex-col gap-4">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">HS Code</label>
// // //             <input className={inp} placeholder="e.g 6109.10" value={form.hsCode} onChange={e => set("hsCode", e.target.value)} />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Commodity</label>
// // //             <input className={inp} placeholder="Product Discription" value={form.commodity} onChange={e => set("commodity", e.target.value)} />
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Gross Weight (kg)</label>
// // //             <input className={inp} placeholder="0.00" type="number" value={form.grossWeight} onChange={e => set("grossWeight", e.target.value)} />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">No of Packages</label>
// // //             <input className={inp} placeholder="Type IEC Num..." value={form.packages} onChange={e => set("packages", e.target.value)} />
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Invoice Value (USD)</label>
// // //             <input className={inp} placeholder="Type Name" value={form.invoiceValue} onChange={e => set("invoiceValue", e.target.value)} />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Incoterms</label>
// // //             <select className={inp} value={form.incoterms} onChange={e => set("incoterms", e.target.value)}>
// // //               <option value="">Type Mobile Number</option>
// // //               <option>FOB</option><option>CIF</option><option>EXW</option><option>DDP</option>
// // //             </select>
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Packing Type</label>
// // //             <select className={inp} value={form.packingType} onChange={e => set("packingType", e.target.value)}>
// // //               <option>Cartons</option><option>Pallets</option><option>Drums</option><option>Bags</option>
// // //             </select>
// // //           </div>
// // //         </div>
// // //         <div className="flex justify-end mt-2">
// // //           <button onClick={onNext} className="bg-teal-500 hover:bg-teal-600 text-white px-8 py-2.5 rounded-xl text-sm font-medium transition-colors">Next</button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Step3({ form, set, onNext }) {
// // //   const inp = "w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/10 transition-all";
// // //   const [selectedCarrier, setSelectedCarrier] = useState("MSC");
// // //   const carriers = [
// // //     { name: "MSC", price: "$1,090 USD", inr: "= ₹90,072 INR", transit: "30 days", ontime: "91%", reliability: "4.5/5", chosen: "68%", recommended: true, best: true },
// // //     { name: "Mearks Line", price: "$1,240 USD", inr: "= ₹1,02000 INR", transit: "28 days", ontime: "94%", reliability: "4.6/5", chosen: null },
// // //     { name: "CMA CGM", price: "$1,420 USD", inr: "= ₹1,02000 INR", transit: "28 days", ontime: "94%", reliability: "4.6/5", chosen: null },
// // //   ];
// // //   return (
// // //     <div className="flex-1 min-w-0">
// // //       <h2 className="text-base font-bold text-gray-800 mb-0.5">Route and Shipment Details</h2>
// // //       <p className="text-xs text-gray-400 mb-5">Enter Route and Shipment Details</p>
// // //       <div className="flex flex-col gap-4">
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Origin Port</label>
// // //             <input className={inp} placeholder="e.g 6109.10" value={form.originPort} onChange={e => set("originPort", e.target.value)} />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Destination Port</label>
// // //             <input className={inp} placeholder="Product Discription" value={form.destPort} onChange={e => set("destPort", e.target.value)} />
// // //           </div>
// // //         </div>
// // //         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Shipment Mode</label>
// // //             <input className={inp} placeholder="0.00" value={form.shipmentMode} onChange={e => set("shipmentMode", e.target.value)} />
// // //           </div>
// // //           <div>
// // //             <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred ETD</label>
// // //             <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all">
// // //               <input className="flex-1 text-sm outline-none" placeholder="25-04-2026" value={form.etd} onChange={e => set("etd", e.target.value)} />
// // //               <FaCalendar className="text-gray-400 text-sm" />
// // //             </div>
// // //           </div>
// // //         </div>
// // //         <div>
// // //           <label className="block text-xs font-semibold text-gray-700 mb-1.5">Preferred Carrier (optional)</label>
// // //           <select className={inp} value={form.carrier} onChange={e => set("carrier", e.target.value)}>
// // //             <option value="">Let AI recommend best rate</option>
// // //             <option>MSC</option><option>Mearks Line</option><option>CMA CGM</option>
// // //           </select>
// // //         </div>

// // //         <div className="border border-gray-100 rounded-2xl p-4 bg-gray-50">
// // //           <div className="flex items-center justify-between mb-3">
// // //             <div className="flex items-center gap-2">
// // //               <FaBolt className="text-teal-500" />
// // //               <div>
// // //                 <p className="text-sm font-bold text-gray-800">AI Freight Quote- Smart Recommendation</p>
// // //                 <p className="text-xs text-gray-400">Based on <span className="text-teal-500 font-medium">HYD ICD → Hamburg</span> • See FCL • 20 ft</p>
// // //               </div>
// // //             </div>
// // //             <button onClick={onNext} className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition-colors">Next</button>
// // //           </div>

// // //           <div className="bg-white border-2 border-teal-400 rounded-2xl p-4 mb-3">
// // //             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
// // //               <div className="flex items-center gap-3">
// // //                 <div className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center">
// // //                   <span className="text-white text-xs font-bold">M SC</span>
// // //                 </div>
// // //                 <div>
// // //                   <div className="flex items-center gap-2">
// // //                     <span className="text-sm font-bold text-gray-800">MSC</span>
// // //                     <span className="text-xs bg-teal-100 text-teal-600 px-2 py-0.5 rounded-full">Recommended by AI</span>
// // //                   </div>
// // //                   <div className="flex items-center gap-2 mt-0.5">
// // //                     <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">Best Price</span>
// // //                     <span className="text-xs bg-teal-50 text-teal-600 px-2 py-0.5 rounded-full font-medium">Great Reliability</span>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //               <div className="text-right">
// // //                 <p className="text-lg font-bold text-gray-800">$1,090 USD</p>
// // //                 <p className="text-xs text-gray-400">= ₹90,072 INR</p>
// // //                 <div className="flex gap-2 mt-1">
// // //                   <button className="bg-teal-500 hover:bg-teal-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1">Book Now <FaChevronRight className="text-xs" /></button>
// // //                   <button className="border border-teal-500 text-teal-500 px-3 py-1.5 rounded-lg text-xs font-medium">View Details</button>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //             <div className="flex flex-wrap gap-4 text-xs">
// // //               {[["Transit Time", "30 days", <FaClock className="text-teal-500" />], ["On-time Performance", "91%", <FaChartLine className="text-teal-500" />], ["Reliability Score", "4.5/5", <FaStar className="text-yellow-400" />], ["Choose by users", "68%", <FaUsers className="text-teal-500" />]].map(([label, val, icon]) => (
// // //                 <div key={label} className="flex items-center gap-1.5 bg-gray-50 rounded-lg px-2 py-1">
// // //                   {icon}<div><p className="text-gray-400 text-xs">{label}</p><p className="font-semibold text-gray-700">{val}</p></div>
// // //                 </div>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// // //             {carriers.slice(1).map(c => (
// // //               <div key={c.name} className="bg-white border border-gray-100 rounded-2xl p-4">
// // //                 <div className="flex items-center justify-between mb-3">
// // //                   <div className="flex items-center gap-2">
// // //                     <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center">
// // //                       <FaShip className="text-blue-400 text-sm" />
// // //                     </div>
// // //                     <span className="text-sm font-bold text-gray-800">{c.name}</span>
// // //                   </div>
// // //                   <div className="text-right">
// // //                     <p className="text-sm font-bold text-orange-500">{c.price}</p>
// // //                     <p className="text-xs text-gray-400">{c.inr}</p>
// // //                   </div>
// // //                 </div>
// // //                 <div className="flex flex-wrap gap-2 mb-3 text-xs">
// // //                   <div className="flex items-center gap-1"><FaClock className="text-teal-500 text-xs" /><span className="text-gray-500">Transit Time</span><span className="font-semibold text-gray-700">{c.transit}</span></div>
// // //                   <div className="flex items-center gap-1"><FaChartLine className="text-teal-500 text-xs" /><span className="text-gray-500">On-time Performance</span><span className="font-semibold text-gray-700">{c.ontime}</span></div>
// // //                 </div>
// // //                 <div className="flex items-center gap-1 text-xs mb-3">
// // //                   <FaStar className="text-yellow-400 text-xs" /><span className="text-gray-500">Reliability Score</span><span className="font-semibold text-gray-700">{c.reliability}</span>
// // //                 </div>
// // //                 <button className="w-full border border-teal-500 text-teal-500 rounded-xl py-2 text-xs font-medium flex items-center justify-center gap-1 hover:bg-teal-50 transition-colors">
// // //                   View Detail <FaChevronRight className="text-xs" />
// // //                 </button>
// // //               </div>
// // //             ))}
// // //           </div>
// // //         </div>

// // //         <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
// // //           <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
// // //             <FaLightbulb className="text-white text-sm" />
// // //           </div>
// // //           <div>
// // //             <p className="text-sm font-bold text-teal-600 mb-1">AI Insight</p>
// // //             <p className="text-xs text-gray-600">You save <span className="font-bold text-gray-800">₹13,000</span> with <span className="text-teal-600 font-bold">MSC</span> compared to Mearsk</p>
// // //             <p className="text-xs text-gray-600">Transit <span className="text-teal-600 font-semibold">2 days</span> longer but cost is <span className="text-teal-600 font-semibold">15% lower</span></p>
// // //             <p className="text-xs text-gray-700 mt-1">👉 <span className="font-bold">Recommended choice : MSC</span></p>
// // //           </div>
// // //         </div>

// // //         <p className="text-xs text-gray-400 flex items-center gap-1"><FaCheck className="text-teal-400 text-xs" /> All quotes are AI-powered recommendation based on price, reliability, transit & historical performance</p>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Step4({ onSaveDraft, onConfirm }) {
// // //   const fileRef = useRef();
// // //   const [uploadedFiles, setUploadedFiles] = useState({});
// // //   const docSlots = ["Commercial Invoice", "Packing List", "Letter of Credit(Optional)"];
// // //   const requiredDocs = [
// // //     { name: "Commercial Invoice", icon: <FaFileLines className="text-blue-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
// // //     { name: "Packing List", icon: <FaBoxOpen className="text-orange-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
// // //     { name: "Certificate of Origin", icon: <FaUsers className="text-teal-400" />, tag: "If FTA claimed", tagColor: "bg-yellow-100 text-yellow-600" },
// // //     { name: "Quality Certificate", icon: <FaFileLines className="text-purple-400" />, tag: "Required", tagColor: "bg-red-100 text-red-500" },
// // //   ];

// // //   const handleDrop = (e, slot) => {
// // //     e.preventDefault();
// // //     const file = e.dataTransfer.files[0];
// // //     if (file) setUploadedFiles(p => ({ ...p, [slot]: file }));
// // //   };

// // //   const handleFileChange = (e, slot) => {
// // //     const file = e.target.files[0];
// // //     if (file) setUploadedFiles(p => ({ ...p, [slot]: file }));
// // //   };

// // //   return (
// // //     <div className="flex-1 min-w-0">
// // //       <h2 className="text-base font-bold text-gray-800 mb-5">Required Documents</h2>
// // //       <div className="flex flex-col gap-3 mb-5">
// // //         {requiredDocs.map(d => (
// // //           <div key={d.name} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3 bg-white">
// // //             <div className="flex items-center gap-3">
// // //               {d.icon}
// // //               <span className="text-sm text-gray-700">{d.name}</span>
// // //             </div>
// // //             <span className={`text-xs px-2.5 py-1 rounded-lg font-medium ${d.tagColor}`}>{d.tag}</span>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div
// // //         onDrop={e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f) setUploadedFiles(p => ({...p, general: f})); }}
// // //         onDragOver={e => e.preventDefault()}
// // //         onClick={() => fileRef.current.click()}
// // //         className="border-2 border-dashed border-teal-400 rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer hover:bg-teal-50/30 transition-all mb-5"
// // //       >
// // //         <FaCloudArrowUp className="text-teal-400 text-2xl mb-2" />
// // //         <p className="text-sm font-medium text-gray-700">Drag & drop files here or click to browse</p>
// // //         <p className="text-xs text-gray-400 mt-0.5">PDF, JPG, PNG (Max 10 MB each)</p>
// // //       </div>
// // //       <input ref={fileRef} type="file" className="hidden" onChange={e => { const f = e.target.files[0]; if (f) setUploadedFiles(p => ({...p, general: f})); }} />

// // //       <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
// // //         {docSlots.map(slot => (
// // //           <div key={slot}
// // //             onDrop={e => handleDrop(e, slot)}
// // //             onDragOver={e => e.preventDefault()}
// // //           >
// // //             <p className="text-xs font-medium text-gray-600 mb-1.5">{slot}</p>
// // //             <div className="border border-gray-200 rounded-xl px-3 py-2.5 flex items-center gap-2 bg-gray-50 cursor-pointer hover:border-teal-400 transition-all"
// // //               onClick={() => { const inp = document.createElement("input"); inp.type = "file"; inp.onchange = e => handleFileChange(e, slot); inp.click(); }}>
// // //               <FaFileLines className="text-blue-400 text-sm flex-shrink-0" />
// // //               {uploadedFiles[slot] ? (
// // //                 <div className="flex items-center gap-1 flex-1 min-w-0">
// // //                   <span className="text-xs text-gray-600 truncate flex-1">{uploadedFiles[slot].name}</span>
// // //                   <FaCheck className="text-teal-500 text-xs flex-shrink-0" />
// // //                 </div>
// // //               ) : (
// // //                 <span className="text-xs text-gray-400">Upload file</span>
// // //               )}
// // //             </div>
// // //           </div>
// // //         ))}
// // //       </div>

// // //       <div className="flex flex-col sm:flex-row items-center justify-end gap-3 mb-5">
// // //         <button onClick={onSaveDraft} className="w-full sm:w-auto px-6 py-2.5 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Save as Draft</button>
// // //         <button onClick={onConfirm} className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
// // //           Review & Confirm <FaChevronRight className="text-xs" />
// // //         </button>
// // //       </div>

// // //       <div className="bg-teal-50 border border-teal-100 rounded-2xl p-4 flex items-start gap-3">
// // //         <div className="w-10 h-10 bg-teal-500 rounded-full flex items-center justify-center flex-shrink-0">
// // //           <FaLightbulb className="text-white text-sm" />
// // //         </div>
// // //         <div>
// // //           <p className="text-sm font-bold text-teal-600 mb-1">AI Insight</p>
// // //           <p className="text-xs text-gray-600">You save <span className="font-bold text-gray-800">₹13,000</span> with <span className="text-teal-600 font-bold">MSC</span> compared to Mearsk</p>
// // //           <p className="text-xs text-gray-600">Transit <span className="text-teal-600 font-semibold">2 days</span> longer but cost is <span className="text-teal-600 font-semibold">15% lower</span></p>
// // //           <p className="text-xs text-gray-700 mt-1">👉 <span className="font-bold">Recommended choice : MSC</span></p>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function NewBookingPage({ onCancel }) {
// // //   const [step, setStep] = useState(0);
// // //   const [form, setForm] = useState({
// // //     companyName: "", iec1: "", iec2: "", contactPerson: "", mobile: "",
// // //     hsCode: "", commodity: "", grossWeight: "", packages: "", invoiceValue: "", incoterms: "", packingType: "Cartons",
// // //     originPort: "", destPort: "", shipmentMode: "", etd: "", carrier: "",
// // //   });
// // //   const set = (k, v) => setForm(p => ({ ...p, [k]: v }));
// // //   const next = () => setStep(s => Math.min(3, s + 1));

// // //   return (
// // //     <div className="min-h-screen bg-gray-50 p-4 sm:p-6">
// // //       <div className="max-w-5xl mx-auto">
// // //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
// // //           <div>
// // //             <h1 className="text-xl sm:text-2xl font-bold text-gray-800">New Booking</h1>
// // //             <p className="text-xs text-gray-400 mt-0.5">AI-Powered Freight Booking in 4 Easy Steps</p>
// // //           </div>
// // //           <div className="flex gap-2">
// // //             <button className="px-4 py-2 text-sm text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 font-medium transition-colors">Save as Draft</button>
// // //             <button className="px-4 py-2 text-sm text-white bg-teal-500 hover:bg-teal-600 rounded-xl font-medium transition-colors">Review & Confirm</button>
// // //           </div>
// // //         </div>

// // //         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
// // //           <div className="flex flex-col lg:flex-row gap-6">
// // //             <StepSidebar currentStep={step} />
// // //             {step === 0 && <Step1 form={form} set={set} onNext={next} />}
// // //             {step === 1 && <Step2 form={form} set={set} onNext={next} />}
// // //             {step === 2 && <Step3 form={form} set={set} onNext={next} />}
// // //             {step === 3 && <Step4 onSaveDraft={() => {}} onConfirm={onCancel} />}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function Shipment() {
// // //   const [showBooking, setShowBooking] = useState(false);
// // //   const [shipments, setShipments] = useState([]);
// // //   const [pendingReview, setPendingReview ] = useState(false)
// // //   const [stats, setStats] = useState({
// // //     total: 0,
// // //     inTransit: 0,
// // //     delivered: 0,
// // //     pendingDocs: 0,
// // //     customHold: 0,
// // //     revenue: 0
// // //   });
// // //   const [searchError, setSearchError] = useState("");
// // //   const [statusFilter, setStatusFilter] = useState("All Status");
// // //   const [modeFilter, setModeFilter] = useState("All Modes");
// // //   const [page, setPage] = useState(1);
// // //   const [search, setSearch] = useState("");

// // //   const statsData = [
// // //     { label: "Total Shipment", value: stats.total },
// // //     { label: "In Transit", value: stats.inTransit },
// // //     { label: "Delivered", value: stats.delivered },
// // //     { label: "Pending Docs", value: stats.pendingDocs },
// // //     { label: "Custom Hold", value: stats.customHold },
// // //     { label: "Revenue(₹)", value: stats.revenue }
// // //   ];

// // //   const handleSearch = (val) => {
// // //     setSearch(val);
// // //     setSearchError(val.length === 1 ? "Enter at least 2 characters" : "");
// // //     setPage(1);
// // //   };

// // //   const filtered = shipments.filter((s) => {
// // //     const q = search.toLowerCase();

// // //     const matchSearch =
// // //       search.length >= 2
// // //         ? s.sbNumber?.toLowerCase().includes(q) ||
// // //           s.exporter?.companyName?.toLowerCase().includes(q)
// // //         : true;

// // //     const matchStatus =
// // //       statusFilter === "All Status" || s.status === statusFilter;

// // //     const matchMode =
// // //       modeFilter === "All Modes" || s.route?.mode === modeFilter;

// // //     return matchSearch && matchStatus && matchMode;
// // //   });

// // //   const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
// // //   const pageItems = filtered.slice((page - 1) * ROWS_PER_PAGE, page * ROWS_PER_PAGE);

// // //   useEffect(() => {
// // //     fetchShipments();
// // //     fetchStats();
// // //   }, []);

// // //   const fetchShipments = async () => {
// // //     try {
// // //       const res = await API.get("/shipments");
// // //       setShipments(res.data.data);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };

// // //   const fetchStats = async () => {
// // //     try {
// // //       const res = await API.get("/shipments/stats");
// // //       setStats(res.data.data);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };

// // //   return (
// // //     <>
// // //       {showBooking ? (
// // //         <NewBookingPage onCancel={() => setShowBooking(false)} />
// // //       ) : (
// // //         <div className="min-h-screen bg-gray-50  ">
// // //            {!pendingReview && (
// // //              <div className="max-w-7xl mx-auto mb-4 ">

// // //               <div className="flex items-center justify-end mb-5 gap-3">
// // //                 {/* <div>
// // //                   <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Shipment</h1>
// // //                   <p className="text-[0.8rem] sm:text-sm text-gray-400 mt-1">Government schemes list, benefits and policies</p>
// // //                 </div> */}
// // //                 <div className="flex flex-col sm:flex-row gap-2 ">
// // //                   <button onClick={() => {setPendingReview(true)

// // //                   }} className="flex items-center gap-2 border border-teal-500 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
// // //                     Request
// // //                   </button>
// // //                   <button className="flex items-center gap-2 border border-gray-200 text-gray-600 px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium hover:bg-gray-50 transition-colors whitespace-nowrap">
// // //                     <FaDownload className="text-xs" /> Export CSV
// // //                   </button>
// // //                   <button onClick={() => setShowBooking(true)}
// // //                     className="flex items-center gap-2 bg-teal-500 hover:bg-teal-600 text-white px-3 sm:px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors whitespace-nowrap">
// // //                     New Booking
// // //                   </button>
// // //                 </div>
// // //               </div>

// // //               <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-5">
// // //                 {statsData.map(s => (
// // //                   <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-3 sm:p-4 flex flex-col gap-2">
// // //                     <p className="text-xs text-gray-400">{s.label}</p>
// // //                     <div className="flex items-center justify-between">
// // //                       <p className={`text-lg sm:text-2xl font-bold ${s.color}`}>{s.value}</p>
// // //                       {s.icon}
// // //                     </div>
// // //                   </div>
// // //                 ))}
// // //               </div>

// // //               <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-5">
// // //                 <div className="flex flex-col sm:flex-row gap-3 mb-2">
// // //                   <div className="flex items-center border border-gray-200 rounded-xl px-3 py-2.5 gap-2 focus-within:border-teal-500 transition-all flex-1">
// // //                     <FaMagnifyingGlass className="text-gray-400 text-sm flex-shrink-0" />
// // //                     <input className="flex-1 text-sm outline-none bg-transparent" placeholder="Search by SB No., exporter"
// // //                       value={search} onChange={e => handleSearch(e.target.value)} />
// // //                   </div>
// // //                   <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
// // //                     value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}>
// // //                     <option>All Status</option><option>In Transit</option><option>Delivered</option><option>Pending Docs</option><option>Custom Hold</option>
// // //                   </select>
// // //                   <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all"
// // //                     value={modeFilter} onChange={e => { setModeFilter(e.target.value); setPage(1); }}>
// // //                     <option>All Modes</option><option>Sea FCL</option><option>Air</option><option>Land</option>
// // //                   </select>
// // //                   <select className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-teal-500 bg-white transition-all">
// // //                     <option>This Month</option><option>Last Month</option><option>This Year</option>
// // //                   </select>
// // //                 </div>
// // //                 {searchError && <p className="text-xs text-red-500 mb-2 px-1">{searchError}</p>}

// // //                 <div className="overflow-x-auto mt-4">
// // //                   <table className="w-full min-w-[700px]">
// // //                     <thead>
// // //                       <tr className="bg-teal-50">
// // //                         {["SB / AWB NO.", "EXPORTER", "ORIGIN - DESTINATION", "HS CODE", "CARRIER", "MODE", "ETD/ETA", "STATUS", "ACTIONS"].map((h, i) => (
// // //                           <th key={h} className={`text-left text-xs font-semibold text-teal-600 px-3 py-3 ${i === 0 ? "rounded-l-xl" : ""} ${i === 8 ? "rounded-r-xl" : ""}`}>{h}</th>
// // //                         ))}
// // //                       </tr>
// // //                     </thead>
// // //                     <tbody>
// // //                       {pageItems.length === 0 ? (
// // //                         <tr><td colSpan={9} className="text-center text-sm text-gray-400 py-10">No results found</td></tr>
// // //                       ) : pageItems.map(row => (
// // //                         <tr key={row._id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
// // //                           <td className="px-3 py-3">
// // //                             <p className="text-xs font-semibold text-gray-800">{row.sbNumber}</p>
// // //                             <p className="text-xs text-gray-400">{row.bol}</p>
// // //                           </td>
// // //                           <td className="px-3 py-3">
// // //                             <p className="text-xs font-semibold text-gray-800">{row.exporter?.companyName}</p>
// // //                             <p className="text-xs text-gray-400">{row.exporter?.iecNumber}</p>
// // //                           </td>
// // //                           <td className="text-xs text-gray-600 px-3 py-3">{row.route?.origin}</td>
// // //                           <td className="px-3 py-3"><span className="text-xs bg-teal-100 text-teal-600 px-2 py-1 rounded-lg font-medium">{row.cargo?.hsCode?.hsCode}</span></td>
// // //                           <td className="text-xs text-gray-700 px-3 py-3">{row.route?.carrier}</td>
// // //                           <td className="text-xs text-gray-700 px-3 py-3">{row.route?.mode}</td>
// // //                           <td className="px-3 py-3 flex">
// // //                             <p className="text-xs text-gray-600">{new Date(row.etd).toLocaleDateString()}</p>
// // //                             <p className="text-xs text-gray-400">{new Date(row.eta).toLocaleDateString()}</p>
// // //                           </td>
// // //                           <td className="px-3 py-3"><span className={`text-xs px-2.5 py-1 rounded-lg font-medium whitespace-nowrap ${statusStyle(row.status)}`}>{row.status}</span></td>
// // //                           <td className="px-3 py-3"><button className="text-teal-500 hover:text-teal-600 text-xs font-medium">View</button></td>
// // //                         </tr>
// // //                       ))}
// // //                     </tbody>
// // //                   </table>
// // //                 </div>

// // //                 <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-4">
// // //                   <p className="text-xs text-gray-400">Showing 1 to {pageItems.length} of {filtered.length.toLocaleString()},999 result</p>
// // //                   <div className="flex items-center gap-2">
// // //                     <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
// // //                       className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
// // //                       <FaChevronLeft className="text-xs" />
// // //                     </button>
// // //                     {Array.from({ length: Math.min(totalPages, 3) }, (_, i) => i + 1).map(p => (
// // //                       <button key={p} onClick={() => setPage(p)}
// // //                         className={`w-8 h-8 rounded-lg text-sm font-medium transition-colors ${page === p ? "bg-teal-500 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>{p}</button>
// // //                     ))}
// // //                     <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
// // //                       className="w-8 h-8 flex items-center justify-center border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 disabled:opacity-40 transition-colors">
// // //                       <FaChevronRight className="text-xs" />
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>

// // //           )}

// // //         {!pendingReview && (
// // //           <AIModulesBackendScope />
// // //         )}

// // //       {pendingReview && (
// // //         <PendingReview setPendingReview={setPendingReview}  />
// // //       )}

// // //     </div>

// // //   )}
// // // </>
// // //   );
// // // }


// // // mahima code //
// // import { useState, useRef, useEffect, useMemo } from "react";
// // import {
// //   FaDownload,
// //   FaPlus,
// //   FaMagnifyingGlass,
// //   FaChevronLeft,
// //   FaChevronRight,
// //   FaShip,
// //   FaCheck,
// //   FaFileLines,
// //   FaBoxOpen,
// //   FaCloudArrowUp,
// //   FaCalendar,
// //   FaBolt,
// //   FaArrowRight,
// //   FaChevronDown,
// //   FaXmark,
// //   FaPlane,
// //   FaTruck,
// //   FaEye,
// //   FaRotate,
// //   FaFilter,
// //   FaGlobe,
// //   FaBoxesStacked,
// //   FaCircleCheck,
// //   FaClock,
// // } from "react-icons/fa6";

// // import API from "../../api/axios";
// // import PendingReview from "./PendingReview";
// // import AIModulesBackendScope from "./AiModules";
// // import { getAllShipmentsForAdmin } from "../../api/ShipmentApi";

// // const ROWS_PER_PAGE = 10;

// // /* -------------------------------------------------------
// //    HELPERS
// // ------------------------------------------------------- */

// // const getSafeUrl = (url) => {
// //   if (!url || typeof url !== "string") return null;

// //   try {
// //     const value = url.trim();
// //     const formatted = /^https?:\/\//i.test(value) ? value : `https://${value}`;

// //     const parsed = new URL(formatted);

// //     if (!["http:", "https:"].includes(parsed.protocol)) return null;

// //     return parsed.href;
// //   } catch {
// //     return null;
// //   }
// // };

// // const getNameValue = (value) => {
// //   if (!value) return "";

// //   if (typeof value === "object") {
// //     return (
// //       value.name ||
// //       value.companyName ||
// //       value.company ||
// //       value.fullName ||
// //       value.title ||
// //       ""
// //     );
// //   }

// //   return String(value);
// // };

// // const getSupplierName = (row) =>
// //   getNameValue(row.supplier) ||
// //   row.supplierName ||
// //   row.supplierCompany ||
// //   row.vendorName ||
// //   row.Supplier ||
// //   "";

// // const getSupplierLink = (row) => {
// //   const supplier = typeof row.supplier === "object" ? row.supplier : {};

// //   return (
// //     supplier.link ||
// //     supplier.url ||
// //     row.supplierLink ||
// //     row.supplierUrl ||
// //     row.supplierWebsite ||
// //     row.vendorLink ||
// //     ""
// //   );
// // };

// // const getBuyerName = (row) =>
// //   getNameValue(row.buyer) ||
// //   getNameValue(row.consignee) ||
// //   row.buyerName ||
// //   row.consigneeName ||
// //   row.Cosignee ||
// //   row.Buyer ||
// //   "";

// // const getBuyerLink = (row) => {
// //   const buyer = typeof row.buyer === "object" ? row.buyer : {};
// //   const consignee = typeof row.consignee === "object" ? row.consignee : {};

// //   return (
// //     buyer.link ||
// //     buyer.url ||
// //     consignee.link ||
// //     consignee.url ||
// //     row.buyerLink ||
// //     row.buyerUrl ||
// //     row.consigneeLink ||
// //     row.consigneeUrl ||
// //     ""
// //   );
// // };

// // const getStatus = (row) =>
// //   row.shipmentStatus || row.workflowStatus || row.approvalStatus || "Pending";

// // const getMode = (row) =>
// //   row.shipmentMode || row.route?.mode || row.mode || "Sea";

// // const formatDate = (date) => {
// //   if (!date) return "-";

// //   const parsed = new Date(date);

// //   if (Number.isNaN(parsed.getTime())) return "-";

// //   return parsed.toLocaleDateString("en-GB", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // };

// // const statusStyle = (status = "") => {
// //   const s = status.toLowerCase();

// //   if (s.includes("transit")) return "bg-teal-50 text-teal-700 border-teal-200";

// //   if (s.includes("deliver"))
// //     return "bg-emerald-50 text-emerald-700 border-emerald-200";

// //   if (s.includes("approve") || s.includes("assigned"))
// //     return "bg-blue-50 text-blue-700 border-blue-200";

// //   if (s.includes("pending") || s.includes("submitted") || s.includes("review"))
// //     return "bg-amber-50 text-amber-700 border-amber-200";

// //   if (s.includes("custom"))
// //     return "bg-orange-50 text-orange-700 border-orange-200";

// //   if (s.includes("closed"))
// //     return "bg-slate-100 text-slate-600 border-slate-200";

// //   return "bg-slate-100 text-slate-600 border-slate-200";
// // };

// // /* -------------------------------------------------------
// //    LINKED NAME
// // ------------------------------------------------------- */

// // const LinkedName = ({ name, link }) => {
// //   const safeLink = getSafeUrl(link);

// //   if (!name) {
// //     return <span className="text-slate-400">-</span>;
// //   }

// //   if (!safeLink) {
// //     return <span className="font-semibold text-slate-800">{name}</span>;
// //   }

// //   return (
// //     <a
// //       href={safeLink}
// //       target="_blank"
// //       rel="noopener noreferrer"
// //       title={`Open ${name}`}
// //       className="font-semibold text-teal-700 hover:text-teal-900 hover:underline underline-offset-4 transition-colors"
// //     >
// //       {name}
// //     </a>
// //   );
// // };

// // /* -------------------------------------------------------
// //    SMALL UI COMPONENTS
// // ------------------------------------------------------- */

// // function StatCard({ label, value, icon: Icon, color, bg }) {
// //   return (
// //     <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
// //       <div className="flex items-center justify-between gap-2">
// //         <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
// //           {label}
// //         </p>

// //         <div
// //           className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
// //         >
// //           <Icon className={`text-sm ${color}`} />
// //         </div>
// //       </div>

// //       <p
// //         className={`text-xl sm:text-2xl font-extrabold mt-3 tracking-tight ${color}`}
// //       >
// //         {value}
// //       </p>
// //     </div>
// //   );
// // }

// // function StatusBadge({ status }) {
// //   return (
// //     <span
// //       className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyle(
// //         status,
// //       )}`}
// //     >
// //       <span className="w-1.5 h-1.5 rounded-full bg-current" />
// //       {status}
// //     </span>
// //   );
// // }

// // function ModeBadge({ mode }) {
// //   const value = String(mode || "").toLowerCase();

// //   const Icon = value.includes("air")
// //     ? FaPlane
// //     : value.includes("road")
// //       ? FaTruck
// //       : FaShip;

// //   return (
// //     <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
// //       <Icon className="text-slate-400" />
// //       {mode}
// //     </span>
// //   );
// // }

// // function SectionTitle({ title, subtitle }) {
// //   return (
// //     <div>
// //       <h2 className="text-sm font-extrabold text-slate-900">{title}</h2>
// //       {subtitle && (
// //         <p className="text-[11px] text-slate-400 mt-0.5">{subtitle}</p>
// //       )}
// //     </div>
// //   );
// // }

// // /* -------------------------------------------------------
// //    BOOKING WORKFLOW
// // ------------------------------------------------------- */

// // const STEPS = [
// //   "Exporter Details",
// //   "Cargo Information",
// //   "Route & Carrier",
// //   "Documents",
// // ];

// // const inputClass =
// //   "w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all";

// // function FormField({ label, children }) {
// //   return (
// //     <div>
// //       <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
// //         {label}
// //       </label>
// //       {children}
// //     </div>
// //   );
// // }

// // function StepSidebar({ currentStep }) {
// //   return (
// //     <div className="w-full lg:w-56 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
// //       <p className="text-xs font-extrabold text-slate-900 mb-4">
// //         Booking Progress
// //       </p>

// //       <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0">
// //         {STEPS.map((step, index) => {
// //           const done = index < currentStep;
// //           const active = index === currentStep;

// //           return (
// //             <div
// //               key={step}
// //               className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 lg:mb-5"
// //             >
// //               <div
// //                 className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-extrabold border transition-all ${
// //                   done
// //                     ? "bg-teal-500 border-teal-500 text-white"
// //                     : active
// //                       ? "bg-white border-teal-500 text-teal-700 ring-4 ring-teal-500/10"
// //                       : "bg-white border-slate-200 text-slate-400"
// //                 }`}
// //               >
// //                 {done ? <FaCheck /> : index + 1}
// //               </div>

// //               <div className="hidden lg:block">
// //                 <p
// //                   className={`text-xs font-bold ${
// //                     active || done ? "text-slate-900" : "text-slate-400"
// //                   }`}
// //                 >
// //                   {step}
// //                 </p>
// //                 <p className="text-[10px] text-slate-400 mt-0.5">
// //                   Step {index + 1} of 4
// //                 </p>
// //               </div>

// //               <span className="lg:hidden text-[9px] text-slate-500 font-semibold text-center">
// //                 {index + 1}
// //               </span>
// //             </div>
// //           );
// //         })}
// //       </div>
// //     </div>
// //   );
// // }

// // function Step1({ form, set, onNext }) {
// //   const [errors, setErrors] = useState({});

// //   const handleNext = () => {
// //     const nextErrors = {};

// //     if (!form.companyName.trim())
// //       nextErrors.companyName = "Company name is required";

// //     if (!form.contactPerson.trim())
// //       nextErrors.contactPerson = "Contact person is required";

// //     if (!form.mobile.trim()) nextErrors.mobile = "Mobile number is required";

// //     setErrors(nextErrors);

// //     if (!Object.keys(nextErrors).length) onNext();
// //   };

// //   const field = (key, label, placeholder, required = false) => (
// //     <FormField label={`${label}${required ? " *" : ""}`}>
// //       <input
// //         className={`${inputClass} ${
// //           errors[key] ? "border-rose-400 bg-rose-50/30" : ""
// //         }`}
// //         placeholder={placeholder}
// //         value={form[key]}
// //         onChange={(e) => {
// //           set(key, e.target.value);
// //           setErrors((prev) => ({ ...prev, [key]: "" }));
// //         }}
// //       />
// //       {errors[key] && (
// //         <p className="text-[10px] text-rose-500 mt-1">{errors[key]}</p>
// //       )}
// //     </FormField>
// //   );

// //   return (
// //     <div className="flex-1 min-w-0">
// //       <SectionTitle
// //         title="Exporter & Shipper Information"
// //         subtitle="Enter company identity and customs registration details."
// //       />

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
// //         <div className="sm:col-span-2">
// //           {field(
// //             "companyName",
// //             "Company Name",
// //             "e.g. Sunfresh Export Pvt Ltd",
// //             true,
// //           )}
// //         </div>

// //         {field(
// //           "contactPerson",
// //           "Authorized Contact Person",
// //           "Full legal name",
// //           true,
// //         )}
// //         {field("mobile", "Mobile Contact", "+91 98765 43210", true)}
// //       </div>

// //       <div className="flex justify-end mt-6">
// //         <button
// //           onClick={handleNext}
// //           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
// //         >
// //           Continue to Cargo <FaArrowRight className="inline ml-2" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function Step2({ form, set, onNext }) {
// //   return (
// //     <div className="flex-1 min-w-0">
// //       <SectionTitle
// //         title="Cargo & Commercial Information"
// //         subtitle="Provide commodity details, customs codes and shipment valuation."
// //       />

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
// //         <FormField label="HS Code (Manual Entry)">
// //           <input
// //             className={inputClass}
// //             placeholder="Enter HS Code manually (e.g. 6109.10)"
// //             value={form.hsCode}
// //             onChange={(e) => set("hsCode", e.target.value.trimStart())}
// //           />
// //           <p className="text-[10px] text-slate-400 mt-1">
// //             Enter the HS Code provided for your product. No dictionary selection
// //             is required.
// //           </p>
// //         </FormField>

// //         <FormField label="Commodity / Product Description">
// //           <input
// //             className={inputClass}
// //             placeholder="e.g. Cotton Knitted T-Shirts"
// //             value={form.commodity}
// //             onChange={(e) => set("commodity", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Gross Weight (Kg)">
// //           <input
// //             type="number"
// //             className={inputClass}
// //             placeholder="0.00"
// //             value={form.grossWeight}
// //             onChange={(e) => set("grossWeight", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Number of Packages">
// //           <input
// //             className={inputClass}
// //             placeholder="e.g. 150 Cartons"
// //             value={form.packages}
// //             onChange={(e) => set("packages", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Invoice Value (USD)">
// //           <input
// //             className={inputClass}
// //             placeholder="e.g. 25000"
// //             value={form.invoiceValue}
// //             onChange={(e) => set("invoiceValue", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Incoterms">
// //           <select
// //             className={inputClass}
// //             value={form.incoterms}
// //             onChange={(e) => set("incoterms", e.target.value)}
// //           >
// //             <option value="">Select Incoterm</option>
// //             <option>FOB</option>
// //             <option>CIF</option>
// //             <option>EXW</option>
// //             <option>DDP</option>
// //           </select>
// //         </FormField>

// //         <FormField label="Packing Type">
// //           <select
// //             className={inputClass}
// //             value={form.packingType}
// //             onChange={(e) => set("packingType", e.target.value)}
// //           >
// //             <option>Cartons</option>
// //             <option>Pallets</option>
// //             <option>Drums</option>
// //             <option>Bags</option>
// //           </select>
// //         </FormField>
// //       </div>

// //       <div className="flex justify-end mt-6">
// //         <button
// //           onClick={onNext}
// //           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
// //         >
// //           Continue to Route <FaArrowRight className="inline ml-2" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function Step3({ form, set, onNext }) {
// //   return (
// //     <div className="flex-1 min-w-0">
// //       <SectionTitle
// //         title="Route Details"
// //         subtitle="Enter the shipment origin, destination, transport mode and expected departure date."
// //       />

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
// //         <FormField label="Origin Port / ICD">
// //           <input
// //             className={inputClass}
// //             placeholder="e.g. HYD ICD (IN)"
// //             value={form.originPort}
// //             onChange={(e) => set("originPort", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Destination Port">
// //           <input
// //             className={inputClass}
// //             placeholder="e.g. Hamburg (DE)"
// //             value={form.destPort}
// //             onChange={(e) => set("destPort", e.target.value)}
// //           />
// //         </FormField>

// //         <FormField label="Shipment Mode">
// //           <select
// //             className={inputClass}
// //             value={form.shipmentMode}
// //             onChange={(e) => set("shipmentMode", e.target.value)}
// //           >
// //             <option value="">Select Mode</option>
// //             <option>Sea FCL</option>
// //             <option>Sea LCL</option>
// //             <option>Air</option>
// //             <option>Road</option>
// //           </select>
// //         </FormField>

// //         <FormField label="Preferred ETD">
// //           <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 gap-2 bg-white focus-within:border-teal-500">
// //             <input
// //               type="date"
// //               className="flex-1 text-xs outline-none bg-transparent"
// //               value={form.etd}
// //               onChange={(e) => set("etd", e.target.value)}
// //             />
// //             <FaCalendar className="text-slate-400 text-xs" />
// //           </div>
// //         </FormField>
// //       </div>

// //       <div className="flex justify-end mt-6">
// //         <button
// //           onClick={onNext}
// //           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
// //         >
// //           Continue to Documents <FaArrowRight className="inline ml-2" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function Step4({ onSaveDraft, onConfirm }) {
// //   const [files, setFiles] = useState({});
// //   const fileRef = useRef(null);

// //   const docSlots = [
// //     { name: "Commercial Invoice", required: true },
// //     { name: "Packing List", required: true },
// //     { name: "Certificate of Origin", required: false },
// //     { name: "Quality Certificate", required: true },
// //     { name: "Letter of Credit", required: false },
// //   ];

// //   const addFile = (name, file) => {
// //     if (!file) return;

// //     if (file.size > 10 * 1024 * 1024) {
// //       alert("File size should not exceed 10 MB");
// //       return;
// //     }

// //     setFiles((prev) => ({ ...prev, [name]: file }));
// //   };

// //   return (
// //     <div className="flex-1 min-w-0">
// //       <SectionTitle
// //         title="Shipment Documents"
// //         subtitle="Upload the documents required for customs clearance."
// //       />

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
// //         {docSlots.map((doc) => (
// //           <div
// //             key={doc.name}
// //             className="border border-slate-200 rounded-xl p-3.5 bg-white"
// //           >
// //             <div className="flex items-center justify-between gap-2 mb-3">
// //               <div className="flex items-center gap-2">
// //                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
// //                   <FaFileLines className="text-blue-600 text-xs" />
// //                 </div>
// //                 <p className="text-xs font-bold text-slate-800">{doc.name}</p>
// //               </div>

// //               <span
// //                 className={`text-[9px] px-2 py-1 rounded-full font-bold ${
// //                   doc.required
// //                     ? "bg-rose-50 text-rose-600"
// //                     : "bg-slate-100 text-slate-500"
// //                 }`}
// //               >
// //                 {doc.required ? "Required" : "Optional"}
// //               </span>
// //             </div>

// //             <label className="flex items-center gap-2 border border-dashed border-slate-300 hover:border-teal-400 rounded-lg p-2.5 cursor-pointer transition-colors">
// //               <FaCloudArrowUp className="text-teal-600" />

// //               <span className="text-[10px] text-slate-500 truncate flex-1">
// //                 {files[doc.name]?.name || "Choose document"}
// //               </span>

// //               {files[doc.name] && <FaCheck className="text-teal-600 text-xs" />}

// //               <input
// //                 type="file"
// //                 accept=".pdf,.jpg,.jpeg,.png"
// //                 className="hidden"
// //                 onChange={(e) => addFile(doc.name, e.target.files[0])}
// //               />
// //             </label>
// //           </div>
// //         ))}
// //       </div>

// //       <div
// //         onClick={() => fileRef.current?.click()}
// //         onDragOver={(e) => e.preventDefault()}
// //         onDrop={(e) => {
// //           e.preventDefault();
// //           Array.from(e.dataTransfer.files).forEach((file, index) => {
// //             addFile(`Additional Document ${index + 1}`, file);
// //           });
// //         }}
// //         className="mt-4 border-2 border-dashed border-teal-200 rounded-2xl bg-teal-50/30 p-6 text-center cursor-pointer hover:bg-teal-50 transition-colors"
// //       >
// //         <FaCloudArrowUp className="text-2xl text-teal-600 mx-auto mb-2" />
// //         <p className="text-xs font-bold text-slate-800">
// //           Drag & drop additional documents here
// //         </p>
// //         <p className="text-[10px] text-slate-400 mt-1">
// //           PDF, JPG or PNG · Maximum 10 MB per file
// //         </p>

// //         <input
// //           ref={fileRef}
// //           type="file"
// //           multiple
// //           accept=".pdf,.jpg,.jpeg,.png"
// //           className="hidden"
// //           onChange={(e) =>
// //             Array.from(e.target.files).forEach((file, index) =>
// //               addFile(`Additional Document ${index + 1}`, file),
// //             )
// //           }
// //         />
// //       </div>

// //       <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
// //         <button
// //           onClick={onSaveDraft}
// //           className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
// //         >
// //           Save Draft
// //         </button>

// //         <button
// //           onClick={() => onConfirm(files)}
// //           className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
// //         >
// //           Confirm & Submit <FaArrowRight className="inline ml-2" />
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // function NewBookingPage({ onCancel }) {
// //   const [step, setStep] = useState(0);

// //   const [form, setForm] = useState({
// //     companyName: "",
// //     contactPerson: "",
// //     mobile: "",
// //     hsCode: "",
// //     commodity: "",
// //     grossWeight: "",
// //     packages: "",
// //     invoiceValue: "",
// //     incoterms: "",
// //     packingType: "Cartons",
// //     originPort: "",
// //     destPort: "",
// //     shipmentMode: "",
// //     etd: "",
// //   });

// //   const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

// //   const next = () => setStep((prev) => Math.min(3, prev + 1));

// //   return (
// //     <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8 overflow-x-hidden">
// //       <div className="max-w-6xl mx-auto">
// //         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
// //           <div>
// //             <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
// //               Shipment Management
// //             </p>
// //             <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
// //               Create New Booking
// //             </h1>
// //             <p className="text-xs text-slate-500 mt-1">
// //               Complete the booking details in four simple steps.
// //             </p>
// //           </div>

// //           <button
// //             onClick={onCancel}
// //             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50"
// //           >
// //             <FaXmark /> Close Booking
// //           </button>
// //         </div>

// //         <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-7">
// //           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
// //             <StepSidebar currentStep={step} />

// //             {step === 0 && <Step1 form={form} set={set} onNext={next} />}

// //             {step === 1 && <Step2 form={form} set={set} onNext={next} />}

// //             {step === 2 && <Step3 form={form} set={set} onNext={next} />}

// //             {step === 3 && (
// //               <Step4
// //                 onSaveDraft={() =>
// //                   alert("Draft functionality needs backend integration.")
// //                 }
// //                 onConfirm={() => {
// //                   alert("Booking submission needs backend integration.");
// //                 }}
// //               />
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // /* -------------------------------------------------------
// //    MAIN SHIPMENT PAGE
// // ------------------------------------------------------- */

// // export default function Shipment() {
// //   const [showBooking, setShowBooking] = useState(false);
// //   const [shipments, setShipments] = useState([]);
// //   const [pendingReview, setPendingReview] = useState(false);
// //   const [hsList, setHsList] = useState([]);

// //   const [stats, setStats] = useState({
// //     total: 0,
// //     inTransit: 0,
// //     delivered: 0,
// //     pendingDocs: 0,
// //     customHold: 0,
// //     revenue: 0,
// //   });

// //   const [statusFilter, setStatusFilter] = useState("All Status");
// //   const [modeFilter, setModeFilter] = useState("All Modes");
// //   const [search, setSearch] = useState("");
// //   const [page, setPage] = useState(1);
// //   const [loading, setLoading] = useState(true);

// //   /* ---------------- FETCH DATA ---------------- */

// //   const fetchShipments = async () => {
// //     try {
// //       setLoading(true);

// //       const res = await getAllShipmentsForAdmin({
// //         page: 1,
// //         limit: 100,
// //       });

// //       const records =
// //         res?.data?.data?.shipments ||
// //         res?.data?.data ||
// //         res?.data?.shipments ||
// //         [];

// //       setShipments(Array.isArray(records) ? records : []);
// //     } catch (err) {
// //       console.error("Admin shipments error:", err);
// //       setShipments([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchStats = async () => {
// //     try {
// //       const res = await API.get("/shipments/stats");

// //       if (res.data?.data) {
// //         setStats((prev) => ({ ...prev, ...res.data.data }));
// //       }
// //     } catch (err) {
// //       console.error("Shipment stats error:", err);
// //     }
// //   };

// //   const fetchHSCodesList = async () => {
// //     try {
// //       const res = await API.get("/hscodes");

// //       const records = res.data?.data || res.data || [];
// //       setHsList(Array.isArray(records) ? records : []);
// //     } catch (err) {
// //       console.error("HS Codes dictionary load:", err);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchShipments();
// //     fetchStats();
// //     fetchHSCodesList();
// //   }, []);

// //   /* ---------------- HS CODE RESOLVER ---------------- */

// //   const resolveHSCode = (row) => {
// //     const cargo = row?.cargo || {};
// //     const raw =
// //       cargo.hsCodeText ||
// //       cargo.hsCode?.hsCode ||
// //       cargo.hsCode?.code ||
// //       cargo.hsCode?.number ||
// //       cargo.hsCode ||
// //       row.hsCodeText ||
// //       row.hsCode?.hsCode ||
// //       row.hsCode?.code ||
// //       row.hsCode ||
// //       cargo.hscode;

// //     if (raw === undefined || raw === null || raw === "") return "-";

// //     if (typeof raw === "object") {
// //       return raw.hsCode || raw.code || raw.number || "-";
// //     }

// //     const clean = String(raw).trim();

// //     if (/^[0-9a-fA-F]{24}$/.test(clean)) {
// //       const found = hsList.find((item) => String(item._id) === clean);

// //       return found ? found.hsCode || found.code || found.name || "-" : "-";
// //     }

// //     return clean || "-";
// //   };

// //   /* ---------------- SEARCH + FILTER ---------------- */

// //   const filtered = useMemo(() => {
// //     const q = search.trim().toLowerCase();

// //     return shipments.filter((row) => {
// //       const searchableValues = [
// //         row.sbNumber,
// //         row.referenceNumber,
// //         row.bookingNo,
// //         row.bol,
// //         row.exporter?.companyName,
// //         row.company,
// //         getSupplierName(row),
// //         getBuyerName(row),
// //         row.route?.originCity,
// //         row.route?.destinationCity,
// //         row.route?.originPort,
// //         row.route?.destinationPort,
// //         resolveHSCode(row),
// //       ];

// //       const matchSearch =
// //         !q ||
// //         searchableValues.some((value) =>
// //           String(value || "")
// //             .toLowerCase()
// //             .includes(q),
// //         );

// //       const status = getStatus(row);
// //       const mode = getMode(row);

// //       const matchStatus =
// //         statusFilter === "All Status" ||
// //         status.toLowerCase() === statusFilter.toLowerCase();

// //       const matchMode =
// //         modeFilter === "All Modes" ||
// //         mode.toLowerCase().includes(modeFilter.toLowerCase());

// //       return matchSearch && matchStatus && matchMode;
// //     });
// //   }, [shipments, search, statusFilter, modeFilter, hsList]);

// //   const totalPages = Math.max(1, Math.ceil(filtered.length / ROWS_PER_PAGE));

// //   const pageItems = filtered.slice(
// //     (page - 1) * ROWS_PER_PAGE,
// //     page * ROWS_PER_PAGE,
// //   );

// //   useEffect(() => {
// //     if (page > totalPages) setPage(totalPages);
// //   }, [page, totalPages]);

// //   /* ---------------- CSV EXPORT ---------------- */

// //   const exportCSV = () => {
// //     const headers = [
// //       "SB/AWB Number",
// //       "Exporter",
// //       "Supplier",
// //       "Supplier Link",
// //       "Buyer",
// //       "Buyer Link",
// //       "Origin",
// //       "Destination",
// //       "HS Code",
// //       "Mode",
// //       "ETD",
// //       "ETA",
// //       "Status",
// //     ];

// //     const escapeCSV = (value) => `"${String(value ?? "").replace(/"/g, '""')}"`;

// //     const rows = filtered.map((row) => [
// //       row.sbNumber || row.referenceNumber || "",
// //       row.exporter?.companyName || row.company || "",
// //       getSupplierName(row),
// //       getSupplierLink(row),
// //       getBuyerName(row),
// //       getBuyerLink(row),
// //       row.route?.originCity || row.route?.originPort || "",
// //       row.route?.destinationCity || row.route?.destinationPort || "",
// //       resolveHSCode(row),
// //       getMode(row),
// //       row.etd || "",
// //       row.eta || "",
// //       getStatus(row),
// //     ]);

// //     const csv = [
// //       headers.map(escapeCSV).join(","),
// //       ...rows.map((row) => row.map(escapeCSV).join(",")),
// //     ].join("\n");

// //     const blob = new Blob(["\uFEFF" + csv], {
// //       type: "text/csv;charset=utf-8;",
// //     });

// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");

// //     link.href = url;
// //     link.download = `shipments-${new Date().toISOString().slice(0, 10)}.csv`;

// //     document.body.appendChild(link);
// //     link.click();
// //     link.remove();

// //     URL.revokeObjectURL(url);
// //   };

// //   /* ---------------- STATS ---------------- */

// //   const statsData = [
// //     {
// //       label: "Total Shipments",
// //       value: stats.total || shipments.length,
// //       icon: FaBoxesStacked,
// //       color: "text-slate-900",
// //       bg: "bg-slate-100",
// //     },
// //     {
// //       label: "In Transit",
// //       value: stats.inTransit || 0,
// //       icon: FaShip,
// //       color: "text-teal-600",
// //       bg: "bg-teal-50",
// //     },
// //     {
// //       label: "Delivered",
// //       value: stats.delivered || 0,
// //       icon: FaCircleCheck,
// //       color: "text-emerald-600",
// //       bg: "bg-emerald-50",
// //     },
// //     {
// //       label: "Pending Docs",
// //       value: stats.pendingDocs || 0,
// //       icon: FaFileLines,
// //       color: "text-amber-600",
// //       bg: "bg-amber-50",
// //     },
// //     {
// //       label: "Customs Hold",
// //       value: stats.customHold || 0,
// //       icon: FaClock,
// //       color: "text-rose-600",
// //       bg: "bg-rose-50",
// //     },
// //     {
// //       label: "Revenue",
// //       value: `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
// //       icon: FaBolt,
// //       color: "text-indigo-600",
// //       bg: "bg-indigo-50",
// //     },
// //   ];

// //   /* ---------------- PAGE RENDER ---------------- */

// //   if (showBooking) {
// //     return <NewBookingPage onCancel={() => setShowBooking(false)} />;
// //   }

// //   if (pendingReview) {
// //     return (
// //       <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
// //         <PendingReview setPendingReview={setPendingReview} />
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="w-full min-h-screen max-w-full bg-gradient-to-br to-teal-50/30 p-1 sm:p-1 lg:p-1 overflow-x-hidden overflow-y-auto">
// //       <div className="max-w-5xl mx-auto space-y-2">
// //         {/* HEADER */}

// //         <div className="flex flex-col xl:flex-row xl:items-center justify-end gap-4">
// //           {/* <div>
// //             <div className="flex items-center gap-2 mb-1.5">
// //               <span className="w-2 h-2 rounded-full bg-teal-500" />
// //               <p className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.16em]">
// //                 Logistics Management
// //               </p>
// //             </div>

// //             <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
// //               Shipment Database
// //             </h1>

// //             <p className="text-xs text-slate-500 mt-1">
// //               Monitor shipments, manage consignment records and track delivery operations.
// //             </p>
// //           </div> */}

// //           <div className="flex flex-wrap items-center gap-2">
// //             <button
// //               onClick={fetchShipments}
// //               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
// //             >
// //               <FaRotate className={loading ? "animate-spin" : ""} />
// //               Refresh
// //             </button>

// //             <button
// //               onClick={() => setPendingReview(true)}
// //               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-xs font-bold text-teal-700 hover:bg-teal-50 transition-all"
// //             >
// //               <FaClock />
// //               Pending Review
// //             </button>

// //             <button
// //               onClick={exportCSV}
// //               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
// //             >
// //               <FaDownload />
// //               Export CSV
// //             </button>

// //             <button
// //               onClick={() => setShowBooking(true)}
// //               className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
// //             >
// //               <FaPlus />
// //               New Booking
// //             </button>
// //           </div>
// //         </div>

// //         {/* STATS */}

// //         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
// //           {statsData.map((item) => (
// //             <StatCard key={item.label} {...item} />
// //           ))}
// //         </div>

// //         {/* MAIN CONTENT */}

// //         <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.025)] overflow-hidden">
// //           {/* TABLE HEADER */}

// //           <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
// //             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
// //               <div>
// //                 <h2 className="text-sm font-extrabold text-slate-900">
// //                   All Shipments
// //                 </h2>
// //                 <p className="text-[11px] text-slate-400 mt-0.5">
// //                   View and manage all shipment records from one place.
// //                 </p>
// //               </div>

// //               <div className="flex items-center gap-2 text-[11px] text-slate-500">
// //                 <span className="w-2 h-2 bg-teal-500 rounded-full" />
// //                 {filtered.length} Records Found
// //               </div>
// //             </div>
// //           </div>

// //           {/* FILTERS */}

// //           <div className="p-4 sm:px-5 border-b border-slate-100">
// //             <div className="flex flex-col xl:flex-row gap-2.5">
// //               <div className="relative flex-1 min-w-0">
// //                 <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />

// //                 <input
// //                   value={search}
// //                   onChange={(e) => {
// //                     setSearch(e.target.value);
// //                     setPage(1);
// //                   }}
// //                   placeholder="Search SB/AWB, exporter, supplier, buyer, destination..."
// //                   className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
// //                 />
// //               </div>

// //               <div className="flex flex-wrap sm:flex-nowrap gap-2">
// //                 <div className="relative flex-1 sm:flex-none">
// //                   <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

// //                   <select
// //                     value={statusFilter}
// //                     onChange={(e) => {
// //                       setStatusFilter(e.target.value);
// //                       setPage(1);
// //                     }}
// //                     className="w-full sm:w-44 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
// //                   >
// //                     <option>All Status</option>
// //                     <option>Submitted</option>
// //                     <option>Pending Admin Approval</option>
// //                     <option>Pending Review</option>
// //                     <option>Approved</option>
// //                     <option>Carrier Assigned</option>
// //                     <option>In Transit</option>
// //                     <option>Delivered</option>
// //                     <option>Closed</option>
// //                   </select>
// //                   <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
// //                 </div>

// //                 <div className="relative flex-1 sm:flex-none">
// //                   <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

// //                   <select
// //                     value={modeFilter}
// //                     onChange={(e) => {
// //                       setModeFilter(e.target.value);
// //                       setPage(1);
// //                     }}
// //                     className="w-full sm:w-36 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
// //                   >
// //                     <option>All Modes</option>
// //                     <option>Air</option>
// //                     <option>Sea</option>
// //                     <option>Road</option>
// //                   </select>
// //                   <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
// //                 </div>

// //                 {(search ||
// //                   statusFilter !== "All Status" ||
// //                   modeFilter !== "All Modes") && (
// //                   <button
// //                     onClick={() => {
// //                       setSearch("");
// //                       setStatusFilter("All Status");
// //                       setModeFilter("All Modes");
// //                       setPage(1);
// //                     }}
// //                     className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all"
// //                   >
// //                     Clear
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           </div>

// //           {/* TABLE */}

// //           <div className="w-full overflow-x-auto">
// //             <table className="w-full min-w-[1120px] text-left border-collapse">
// //               <thead>
// //                 <tr className="bg-slate-50/80 border-b border-slate-200">
// //                   {[
// //                     "SB / AWB Details",
// //                     "Exporter / Shipper",

// //                     "Origin → Destination",
// //                     "HS Code",
// //                     "Mode",
// //                     "ETD / ETA",
// //                     "Status",
// //                     "Action",
// //                   ].map((heading, index) => (
// //                     <th
// //                       key={heading}
// //                       className={`px-4 py-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap ${
// //                         index === 5 || index === 7 || index === 9
// //                           ? "text-center"
// //                           : ""
// //                       } ${index === 10 ? "text-right" : ""}`}
// //                     >
// //                       {heading}
// //                     </th>
// //                   ))}
// //                 </tr>
// //               </thead>

// //               <tbody className="divide-y divide-slate-100">
// //                 {loading ? (
// //                   <tr>
// //                     <td colSpan={8} className="py-16 text-center">
// //                       <div className="flex flex-col items-center gap-3">
// //                         <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-600 rounded-full animate-spin" />
// //                         <p className="text-xs font-semibold text-slate-500">
// //                           Loading shipment records...
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : pageItems.length === 0 ? (
// //                   <tr>
// //                     <td colSpan={8} className="py-16 text-center">
// //                       <div className="flex flex-col items-center">
// //                         <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
// //                           <FaShip className="text-slate-400 text-lg" />
// //                         </div>
// //                         <p className="text-sm font-bold text-slate-700">
// //                           No shipments found
// //                         </p>
// //                         <p className="text-[11px] text-slate-400 mt-1">
// //                           Try changing your search or filter criteria.
// //                         </p>
// //                       </div>
// //                     </td>
// //                   </tr>
// //                 ) : (
// //                   pageItems.map((row) => {
// //                     const status = getStatus(row);
// //                     const mode = getMode(row);

// //                     const exporter =
// //                       row.exporter?.companyName || row.company || "-";

// //                     const origin =
// //                       row.route?.originCity || row.route?.originPort || "-";

// //                     const destination =
// //                       row.route?.destinationCity ||
// //                       row.route?.destinationPort ||
// //                       "-";

// //                     return (
// //                       <tr
// //                         key={row._id || row.id}
// //                         className="hover:bg-teal-50/20 transition-colors"
// //                       >
// //                         {/* SB / AWB */}

// //                         <td className="px-4 py-3.5 whitespace-nowrap">
// //                           <p className="text-xs font-extrabold text-slate-900">
// //                             {row.sbNumber || row.referenceNumber || "-"}
// //                           </p>
// //                           <p className="text-[10px] text-slate-400 mt-1">
// //                             {row.bol || row.bookingNo || "BOL: Pending"}
// //                           </p>
// //                         </td>

// //                         {/* EXPORTER */}

// //                         <td className="px-4 py-3.5 min-w-[170px]">
// //                           <p className="text-xs font-bold text-slate-800">
// //                             {exporter}
// //                           </p>
// //                         </td>

// //                         {/* ROUTE */}

// //                         <td className="px-4 py-3.5 whitespace-nowrap">
// //                           <div className="flex items-center gap-2">
// //                             <span className="text-[11px] font-semibold text-slate-700">
// //                               {origin}
// //                             </span>
// //                             <FaArrowRight className="text-[9px] text-teal-500" />
// //                             <span className="text-[11px] font-semibold text-slate-700">
// //                               {destination}
// //                             </span>
// //                           </div>
// //                         </td>

// //                         {/* HS CODE */}

// //                         <td className="px-4 py-3.5 text-center whitespace-nowrap">
// //                           <span className="inline-flex px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-[10px] font-extrabold text-teal-700">
// //                             {resolveHSCode(row)}
// //                           </span>
// //                         </td>

// //                         {/* MODE */}

// //                         <td className="px-4 py-3.5 text-center">
// //                           <ModeBadge mode={mode} />
// //                         </td>

// //                         {/* ETD ETA */}

// //                         <td className="px-4 py-3.5 whitespace-nowrap">
// //                           <p className="text-[11px] font-semibold text-slate-700">
// //                             ETD: {formatDate(row.etd)}
// //                           </p>
// //                           <p className="text-[10px] text-slate-400 mt-1">
// //                             ETA: {formatDate(row.eta)}
// //                           </p>
// //                         </td>

// //                         {/* STATUS */}

// //                         <td className="px-4 py-3.5 text-center whitespace-nowrap">
// //                           <StatusBadge status={status} />
// //                         </td>

// //                         {/* ACTION */}

// //                         <td className="px-4 py-3.5 text-right whitespace-nowrap">
// //                           <button
// //                             onClick={() => setPendingReview(true)}
// //                             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-700 text-[10px] font-extrabold transition-all"
// //                           >
// //                             <FaEye />
// //                             Inspect
// //                           </button>
// //                         </td>
// //                       </tr>
// //                     );
// //                   })
// //                 )}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* PAGINATION */}

// //           <div className="px-4 sm:px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
// //             <p className="text-[11px] text-slate-500">
// //               Showing{" "}
// //               <strong className="text-slate-800">
// //                 {filtered.length ? (page - 1) * ROWS_PER_PAGE + 1 : 0}
// //               </strong>{" "}
// //               to{" "}
// //               <strong className="text-slate-800">
// //                 {Math.min(page * ROWS_PER_PAGE, filtered.length)}
// //               </strong>{" "}
// //               of <strong className="text-slate-800">{filtered.length}</strong>{" "}
// //               shipments
// //             </p>

// //             <div className="flex items-center gap-1.5">
// //               <button
// //                 onClick={() => setPage((prev) => Math.max(1, prev - 1))}
// //                 disabled={page === 1}
// //                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
// //               >
// //                 <FaChevronLeft className="text-[10px]" />
// //               </button>

// //               {Array.from({ length: totalPages }, (_, index) => index + 1)
// //                 .filter(
// //                   (number) =>
// //                     number === 1 ||
// //                     number === totalPages ||
// //                     Math.abs(number - page) <= 1,
// //                 )
// //                 .map((number, index, arr) => (
// //                   <div key={number} className="flex items-center gap-1">
// //                     {index > 0 && number - arr[index - 1] > 1 && (
// //                       <span className="px-1 text-slate-400 text-xs">...</span>
// //                     )}

// //                     <button
// //                       onClick={() => setPage(number)}
// //                       className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
// //                         page === number
// //                           ? "bg-teal-600 text-white shadow-sm"
// //                           : "border border-slate-200 text-slate-600 hover:bg-slate-50"
// //                       }`}
// //                     >
// //                       {number}
// //                     </button>
// //                   </div>
// //                 ))}

// //               <button
// //                 onClick={() =>
// //                   setPage((prev) => Math.min(totalPages, prev + 1))
// //                 }
// //                 disabled={page === totalPages}
// //                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
// //               >
// //                 <FaChevronRight className="text-[10px]" />
// //               </button>
// //             </div>
// //           </div>
// //         </div>

// //         {/* AI MODULES */}

// //         <AIModulesBackendScope />
// //       </div>
// //     </div>
// //   );
// // }



// // mahima code //

// import { useState, useRef, useEffect, useMemo } from "react";
// import {
//   FaDownload,
//   FaPlus,
//   FaMagnifyingGlass,
//   FaChevronLeft,
//   FaChevronRight,
//   FaShip,
//   FaCheck,
//   FaFileLines,
//   FaBoxOpen,
//   FaCloudArrowUp,
//   FaCalendar,
//   FaBolt,
//   FaArrowRight,
//   FaChevronDown,
//   FaXmark,
//   FaPlane,
//   FaTruck,
//   FaEye,
//   FaRotate,
//   FaFilter,
//   FaGlobe,
//   FaBoxesStacked,
//   FaCircleCheck,
//   FaClock,
// } from "react-icons/fa6";

// import API from "../../api/axios";
// import PendingReview from "./PendingReview";
// import AIModulesBackendScope from "./AiModules";
// import { getAllShipmentsForAdmin } from "../../api/ShipmentApi";

// const ROWS_PER_PAGE = 10;

// /* -------------------------------------------------------
//    HELPERS
// ------------------------------------------------------- */

// const getSafeUrl = (url) => {
//   if (!url || typeof url !== "string") return null;

//   try {
//     const value = url.trim();
//     const formatted = /^https?:\/\//i.test(value)
//       ? value
//       : `https://${value}`;

//     const parsed = new URL(formatted);

//     if (!["http:", "https:"].includes(parsed.protocol)) return null;

//     return parsed.href;
//   } catch {
//     return null;
//   }
// };

// const getNameValue = (value) => {
//   if (!value) return "";

//   if (typeof value === "object") {
//     return (
//       value.name ||
//       value.companyName ||
//       value.company ||
//       value.fullName ||
//       value.title ||
//       ""
//     );
//   }

//   return String(value);
// };

// const getSupplierName = (row) =>
//   getNameValue(row.supplier) ||
//   row.supplierName ||
//   row.supplierCompany ||
//   row.vendorName ||
//   row.Supplier ||
//   "";

// const getSupplierLink = (row) => {
//   const supplier =
//     typeof row.supplier === "object" ? row.supplier : {};

//   return (
//     supplier.link ||
//     supplier.url ||
//     row.supplierLink ||
//     row.supplierUrl ||
//     row.supplierWebsite ||
//     row.vendorLink ||
//     ""
//   );
// };

// const getBuyerName = (row) =>
//   getNameValue(row.buyer) ||
//   getNameValue(row.consignee) ||
//   row.buyerName ||
//   row.consigneeName ||
//   row.Cosignee ||
//   row.Buyer ||
//   "";

// const getBuyerLink = (row) => {
//   const buyer = typeof row.buyer === "object" ? row.buyer : {};
//   const consignee =
//     typeof row.consignee === "object" ? row.consignee : {};

//   return (
//     buyer.link ||
//     buyer.url ||
//     consignee.link ||
//     consignee.url ||
//     row.buyerLink ||
//     row.buyerUrl ||
//     row.consigneeLink ||
//     row.consigneeUrl ||
//     ""
//   );
// };

// const getStatus = (row) =>
//   row.shipmentStatus ||
//   row.workflowStatus ||
//   row.approvalStatus ||
//   "Pending";

// // Draft shipments are private to the B2B/user side and must not appear in Admin.
// const isDraftShipment = (row) => {
//   const statuses = [
//     row?.shipmentStatus,
//     row?.workflowStatus,
//     row?.approvalStatus,
//     row?.status,
//   ];

//   return statuses.some(
//     (status) => String(status || "").trim().toLowerCase() === "draft"
//   );
// };

// const getMode = (row) =>
//   row.shipmentMode ||
//   row.route?.mode ||
//   row.mode ||
//   "Sea";

// const formatDate = (date) => {
//   if (!date) return "-";

//   const parsed = new Date(date);

//   if (Number.isNaN(parsed.getTime())) return "-";

//   return parsed.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const statusStyle = (status = "") => {
//   const s = status.toLowerCase();

//   if (s.includes("transit"))
//     return "bg-teal-50 text-teal-700 border-teal-200";

//   if (s.includes("deliver"))
//     return "bg-emerald-50 text-emerald-700 border-emerald-200";

//   if (s.includes("approve") || s.includes("assigned"))
//     return "bg-blue-50 text-blue-700 border-blue-200";

//   if (
//     s.includes("pending") ||
//     s.includes("submitted") ||
//     s.includes("review")
//   )
//     return "bg-amber-50 text-amber-700 border-amber-200";

//   if (s.includes("custom"))
//     return "bg-orange-50 text-orange-700 border-orange-200";

//   if (s.includes("closed"))
//     return "bg-slate-100 text-slate-600 border-slate-200";

//   return "bg-slate-100 text-slate-600 border-slate-200";
// };

// /* -------------------------------------------------------
//    LINKED NAME
// ------------------------------------------------------- */

// const LinkedName = ({ name, link }) => {
//   const safeLink = getSafeUrl(link);

//   if (!name) {
//     return <span className="text-slate-400">-</span>;
//   }

//   if (!safeLink) {
//     return (
//       <span className="font-semibold text-slate-800">
//         {name}
//       </span>
//     );
//   }

//   return (
//     <a
//       href={safeLink}
//       target="_blank"
//       rel="noopener noreferrer"
//       title={`Open ${name}`}
//       className="font-semibold text-teal-700 hover:text-teal-900 hover:underline underline-offset-4 transition-colors"
//     >
//       {name}
//     </a>
//   );
// };

// /* -------------------------------------------------------
//    SMALL UI COMPONENTS
// ------------------------------------------------------- */

// function StatCard({ label, value, icon: Icon, color, bg }) {
//   return (
//     <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
//       <div className="flex items-center justify-between gap-2">
//         <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//           {label}
//         </p>

//         <div
//           className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
//         >
//           <Icon className={`text-sm ${color}`} />
//         </div>
//       </div>

//       <p className={`text-xl sm:text-2xl font-extrabold mt-3 tracking-tight ${color}`}>
//         {value}
//       </p>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyle(
//         status
//       )}`}
//     >
//       <span className="w-1.5 h-1.5 rounded-full bg-current" />
//       {status}
//     </span>
//   );
// }

// function ModeBadge({ mode }) {
//   const value = String(mode || "").toLowerCase();

//   const Icon = value.includes("air")
//     ? FaPlane
//     : value.includes("road")
//     ? FaTruck
//     : FaShip;

//   return (
//     <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
//       <Icon className="text-slate-400" />
//       {mode}
//     </span>
//   );
// }

// function SectionTitle({ title, subtitle }) {
//   return (
//     <div>
//       <h2 className="text-sm font-extrabold text-slate-900">
//         {title}
//       </h2>
//       {subtitle && (
//         <p className="text-[11px] text-slate-400 mt-0.5">
//           {subtitle}
//         </p>
//       )}
//     </div>
//   );
// }

// /* -------------------------------------------------------
//    BOOKING WORKFLOW
// ------------------------------------------------------- */

// const STEPS = [
//   "Exporter Details",
//   "Cargo Information",
//   "Route & Carrier",
//   "Documents",
// ];

// const inputClass =
//   "w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all";

// function FormField({ label, children }) {
//   return (
//     <div>
//       <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// function StepSidebar({ currentStep }) {
//   return (
//     <div className="w-full lg:w-56 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
//       <p className="text-xs font-extrabold text-slate-900 mb-4">
//         Booking Progress
//       </p>

//       <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0">
//         {STEPS.map((step, index) => {
//           const done = index < currentStep;
//           const active = index === currentStep;

//           return (
//             <div
//               key={step}
//               className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 lg:mb-5"
//             >
//               <div
//                 className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-extrabold border transition-all ${
//                   done
//                     ? "bg-teal-500 border-teal-500 text-white"
//                     : active
//                     ? "bg-white border-teal-500 text-teal-700 ring-4 ring-teal-500/10"
//                     : "bg-white border-slate-200 text-slate-400"
//                 }`}
//               >
//                 {done ? <FaCheck /> : index + 1}
//               </div>

//               <div className="hidden lg:block">
//                 <p
//                   className={`text-xs font-bold ${
//                     active || done
//                       ? "text-slate-900"
//                       : "text-slate-400"
//                   }`}
//                 >
//                   {step}
//                 </p>
//                 <p className="text-[10px] text-slate-400 mt-0.5">
//                   Step {index + 1} of 4
//                 </p>
//               </div>

//               <span className="lg:hidden text-[9px] text-slate-500 font-semibold text-center">
//                 {index + 1}
//               </span>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// }

// function Step1({ form, set, onNext }) {
//   const [errors, setErrors] = useState({});

//   const handleNext = () => {
//     const nextErrors = {};

//     if (!form.companyName.trim())
//       nextErrors.companyName = "Company name is required";

//     if (!form.contactPerson.trim())
//       nextErrors.contactPerson = "Contact person is required";

//     if (!form.mobile.trim())
//       nextErrors.mobile = "Mobile number is required";

//     setErrors(nextErrors);

//     if (!Object.keys(nextErrors).length) onNext();
//   };

//   const field = (key, label, placeholder, required = false) => (
//     <FormField label={`${label}${required ? " *" : ""}`}>
//       <input
//         className={`${inputClass} ${
//           errors[key] ? "border-rose-400 bg-rose-50/30" : ""
//         }`}
//         placeholder={placeholder}
//         value={form[key]}
//         onChange={(e) => {
//           set(key, e.target.value);
//           setErrors((prev) => ({ ...prev, [key]: "" }));
//         }}
//       />
//       {errors[key] && (
//         <p className="text-[10px] text-rose-500 mt-1">
//           {errors[key]}
//         </p>
//       )}
//     </FormField>
//   );

//   return (
//     <div className="flex-1 min-w-0">
//       <SectionTitle
//         title="Exporter & Shipper Information"
//         subtitle="Enter company identity and customs registration details."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
//         <div className="sm:col-span-2">
//           {field(
//             "companyName",
//             "Company Name",
//             "e.g. Sunfresh Export Pvt Ltd",
//             true
//           )}
//         </div>

//         {field(
//           "contactPerson",
//           "Authorized Contact Person",
//           "Full legal name",
//           true
//         )}
//         {field(
//           "mobile",
//           "Mobile Contact",
//           "+91 98765 43210",
//           true
//         )}
//       </div>

//       <div className="flex justify-end mt-6">
//         <button
//           onClick={handleNext}
//           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
//         >
//           Continue to Cargo <FaArrowRight className="inline ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function Step2({ form, set, onNext }) {
//   return (
//     <div className="flex-1 min-w-0">
//       <SectionTitle
//         title="Cargo & Commercial Information"
//         subtitle="Provide commodity details, customs codes and shipment valuation."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
//         <FormField label="HS Code (Manual Entry)">
//           <input
//             className={inputClass}
//             placeholder="Enter HS Code manually (e.g. 6109.10)"
//             value={form.hsCode}
//             onChange={(e) => set("hsCode", e.target.value.trimStart())}
//           />
//           <p className="text-[10px] text-slate-400 mt-1">
//             Enter the HS Code provided for your product. No dictionary selection is required.
//           </p>
//         </FormField>

//         <FormField label="Commodity / Product Description">
//           <input
//             className={inputClass}
//             placeholder="e.g. Cotton Knitted T-Shirts"
//             value={form.commodity}
//             onChange={(e) => set("commodity", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Gross Weight (Kg)">
//           <input
//             type="number"
//             className={inputClass}
//             placeholder="0.00"
//             value={form.grossWeight}
//             onChange={(e) => set("grossWeight", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Number of Packages">
//           <input
//             className={inputClass}
//             placeholder="e.g. 150 Cartons"
//             value={form.packages}
//             onChange={(e) => set("packages", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Invoice Value (USD)">
//           <input
//             className={inputClass}
//             placeholder="e.g. 25000"
//             value={form.invoiceValue}
//             onChange={(e) => set("invoiceValue", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Incoterms">
//           <select
//             className={inputClass}
//             value={form.incoterms}
//             onChange={(e) => set("incoterms", e.target.value)}
//           >
//             <option value="">Select Incoterm</option>
//             <option>FOB</option>
//             <option>CIF</option>
//             <option>EXW</option>
//             <option>DDP</option>
//           </select>
//         </FormField>

//         <FormField label="Packing Type">
//           <select
//             className={inputClass}
//             value={form.packingType}
//             onChange={(e) => set("packingType", e.target.value)}
//           >
//             <option>Cartons</option>
//             <option>Pallets</option>
//             <option>Drums</option>
//             <option>Bags</option>
//           </select>
//         </FormField>
//       </div>

//       <div className="flex justify-end mt-6">
//         <button
//           onClick={onNext}
//           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
//         >
//           Continue to Route <FaArrowRight className="inline ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function Step3({ form, set, onNext }) {
//   return (
//     <div className="flex-1 min-w-0">
//       <SectionTitle
//         title="Route Details"
//         subtitle="Enter the shipment origin, destination, transport mode and expected departure date."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
//         <FormField label="Origin Port / ICD">
//           <input
//             className={inputClass}
//             placeholder="e.g. HYD ICD (IN)"
//             value={form.originPort}
//             onChange={(e) => set("originPort", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Destination Port">
//           <input
//             className={inputClass}
//             placeholder="e.g. Hamburg (DE)"
//             value={form.destPort}
//             onChange={(e) => set("destPort", e.target.value)}
//           />
//         </FormField>

//         <FormField label="Shipment Mode">
//           <select
//             className={inputClass}
//             value={form.shipmentMode}
//             onChange={(e) => set("shipmentMode", e.target.value)}
//           >
//             <option value="">Select Mode</option>
//             <option>Sea FCL</option>
//             <option>Sea LCL</option>
//             <option>Air</option>
//             <option>Road</option>
//           </select>
//         </FormField>

//         <FormField label="Preferred ETD">
//           <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 gap-2 bg-white focus-within:border-teal-500">
//             <input
//               type="date"
//               className="flex-1 text-xs outline-none bg-transparent"
//               value={form.etd}
//               onChange={(e) => set("etd", e.target.value)}
//             />
//             <FaCalendar className="text-slate-400 text-xs" />
//           </div>
//         </FormField>
//       </div>

//       <div className="flex justify-end mt-6">
//         <button
//           onClick={onNext}
//           className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
//         >
//           Continue to Documents <FaArrowRight className="inline ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function Step4({ onSaveDraft, onConfirm }) {
//   const [files, setFiles] = useState({});
//   const fileRef = useRef(null);

//   const docSlots = [
//     { name: "Commercial Invoice", required: true },
//     { name: "Packing List", required: true },
//     { name: "Certificate of Origin", required: false },
//     { name: "Quality Certificate", required: true },
//     { name: "Letter of Credit", required: false },
//   ];

//   const addFile = (name, file) => {
//     if (!file) return;

//     if (file.size > 10 * 1024 * 1024) {
//       alert("File size should not exceed 10 MB");
//       return;
//     }

//     setFiles((prev) => ({ ...prev, [name]: file }));
//   };

//   return (
//     <div className="flex-1 min-w-0">
//       <SectionTitle
//         title="Shipment Documents"
//         subtitle="Upload the documents required for customs clearance."
//       />

//       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
//         {docSlots.map((doc) => (
//           <div
//             key={doc.name}
//             className="border border-slate-200 rounded-xl p-3.5 bg-white"
//           >
//             <div className="flex items-center justify-between gap-2 mb-3">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
//                   <FaFileLines className="text-blue-600 text-xs" />
//                 </div>
//                 <p className="text-xs font-bold text-slate-800">
//                   {doc.name}
//                 </p>
//               </div>

//               <span
//                 className={`text-[9px] px-2 py-1 rounded-full font-bold ${
//                   doc.required
//                     ? "bg-rose-50 text-rose-600"
//                     : "bg-slate-100 text-slate-500"
//                 }`}
//               >
//                 {doc.required ? "Required" : "Optional"}
//               </span>
//             </div>

//             <label className="flex items-center gap-2 border border-dashed border-slate-300 hover:border-teal-400 rounded-lg p-2.5 cursor-pointer transition-colors">
//               <FaCloudArrowUp className="text-teal-600" />

//               <span className="text-[10px] text-slate-500 truncate flex-1">
//                 {files[doc.name]?.name || "Choose document"}
//               </span>

//               {files[doc.name] && (
//                 <FaCheck className="text-teal-600 text-xs" />
//               )}

//               <input
//                 type="file"
//                 accept=".pdf,.jpg,.jpeg,.png"
//                 className="hidden"
//                 onChange={(e) => addFile(doc.name, e.target.files[0])}
//               />
//             </label>
//           </div>
//         ))}
//       </div>

//       <div
//         onClick={() => fileRef.current?.click()}
//         onDragOver={(e) => e.preventDefault()}
//         onDrop={(e) => {
//           e.preventDefault();
//           Array.from(e.dataTransfer.files).forEach((file, index) => {
//             addFile(`Additional Document ${index + 1}`, file);
//           });
//         }}
//         className="mt-4 border-2 border-dashed border-teal-200 rounded-2xl bg-teal-50/30 p-6 text-center cursor-pointer hover:bg-teal-50 transition-colors"
//       >
//         <FaCloudArrowUp className="text-2xl text-teal-600 mx-auto mb-2" />
//         <p className="text-xs font-bold text-slate-800">
//           Drag & drop additional documents here
//         </p>
//         <p className="text-[10px] text-slate-400 mt-1">
//           PDF, JPG or PNG · Maximum 10 MB per file
//         </p>

//         <input
//           ref={fileRef}
//           type="file"
//           multiple
//           accept=".pdf,.jpg,.jpeg,.png"
//           className="hidden"
//           onChange={(e) =>
//             Array.from(e.target.files).forEach((file, index) =>
//               addFile(`Additional Document ${index + 1}`, file)
//             )
//           }
//         />
//       </div>

//       <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
//         <button
//           onClick={onSaveDraft}
//           className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
//         >
//           Save Draft
//         </button>

//         <button
//           onClick={() => onConfirm(files)}
//           className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
//         >
//           Confirm & Submit <FaArrowRight className="inline ml-2" />
//         </button>
//       </div>
//     </div>
//   );
// }

// function NewBookingPage({ onCancel }) {
//   const [step, setStep] = useState(0);

//   const [form, setForm] = useState({
//     companyName: "",
//     contactPerson: "",
//     mobile: "",
//     hsCode: "",
//     commodity: "",
//     grossWeight: "",
//     packages: "",
//     invoiceValue: "",
//     incoterms: "",
//     packingType: "Cartons",
//     originPort: "",
//     destPort: "",
//     shipmentMode: "",
//     etd: "",
//   });

//   const set = (key, value) =>
//     setForm((prev) => ({ ...prev, [key]: value }));

//   const next = () => setStep((prev) => Math.min(3, prev + 1));

//   return (
//     <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8 overflow-x-hidden">
//       <div className="max-w-6xl mx-auto">
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
//           <div>
//             <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
//               Shipment Management
//             </p>
//             <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
//               Create New Booking
//             </h1>
//             <p className="text-xs text-slate-500 mt-1">
//               Complete the booking details in four simple steps.
//             </p>
//           </div>

//           <button
//             onClick={onCancel}
//             className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50"
//           >
//             <FaXmark /> Close Booking
//           </button>
//         </div>

//         <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-7">
//           <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
//             <StepSidebar currentStep={step} />

//             {step === 0 && (
//               <Step1 form={form} set={set} onNext={next} />
//             )}

//             {step === 1 && (
//               <Step2 form={form} set={set} onNext={next} />
//             )}

//             {step === 2 && (
//               <Step3 form={form} set={set} onNext={next} />
//             )}

//             {step === 3 && (
//               <Step4
//                 onSaveDraft={() => alert("Draft functionality needs backend integration.")}
//                 onConfirm={() => {
//                   alert("Booking submission needs backend integration.");
//                 }}
//               />
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* -------------------------------------------------------
//    MAIN SHIPMENT PAGE
// ------------------------------------------------------- */

// export default function Shipment() {
//   const [showBooking, setShowBooking] = useState(false);
//   const [shipments, setShipments] = useState([]);
//   const [pendingReview, setPendingReview] = useState(false);
//   const [hsList, setHsList] = useState([]);

//   const [stats, setStats] = useState({
//     total: 0,
//     inTransit: 0,
//     delivered: 0,
//     pendingDocs: 0,
//     customHold: 0,
//     revenue: 0,
//   });

//   const [statusFilter, setStatusFilter] = useState("All Status");
//   const [modeFilter, setModeFilter] = useState("All Modes");
//   const [search, setSearch] = useState("");
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(true);

//   /* ---------------- FETCH DATA ---------------- */

//   const fetchShipments = async () => {
//     try {
//       setLoading(true);

//       const res = await getAllShipmentsForAdmin({
//         page: 1,
//         limit: 100,
//       });

//       const records =
//         res?.data?.data?.shipments ||
//         res?.data?.data ||
//         res?.data?.shipments ||
//         [];

//       // Never show user-saved drafts in the Admin shipment database.
//       const adminVisibleShipments = Array.isArray(records)
//         ? records.filter((shipment) => !isDraftShipment(shipment))
//         : [];

//       setShipments(adminVisibleShipments);
//     } catch (err) {
//       console.error("Admin shipments error:", err);
//       setShipments([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStats = async () => {
//     try {
//       const res = await API.get("/shipments/stats");

//       if (res.data?.data) {
//         setStats((prev) => ({ ...prev, ...res.data.data }));
//       }
//     } catch (err) {
//       console.error("Shipment stats error:", err);
//     }
//   };

//   const fetchHSCodesList = async () => {
//     try {
//       const res = await API.get("/hscodes");

//       const records = res.data?.data || res.data || [];
//       setHsList(Array.isArray(records) ? records : []);
//     } catch (err) {
//       console.error("HS Codes dictionary load:", err);
//     }
//   };

//   useEffect(() => {
//     fetchShipments();
//     fetchStats();
//     fetchHSCodesList();
//   }, []);

//   /* ---------------- HS CODE RESOLVER ---------------- */

//   const resolveHSCode = (row) => {
//     const cargo = row?.cargo || {};
//     const raw =
//       cargo.hsCodeText ||
//       cargo.hsCode?.hsCode ||
//       cargo.hsCode?.code ||
//       cargo.hsCode?.number ||
//       cargo.hsCode ||
//       row.hsCodeText ||
//       row.hsCode?.hsCode ||
//       row.hsCode?.code ||
//       row.hsCode ||
//       cargo.hscode;

//     if (raw === undefined || raw === null || raw === "") return "-";

//     if (typeof raw === "object") {
//       return raw.hsCode || raw.code || raw.number || "-";
//     }

//     const clean = String(raw).trim();

//     if (/^[0-9a-fA-F]{24}$/.test(clean)) {
//       const found = hsList.find(
//         (item) => String(item._id) === clean
//       );

//       return found
//         ? found.hsCode || found.code || found.name || "-"
//         : "-";
//     }

//     return clean || "-";
//   };

//   /* ---------------- SEARCH + FILTER ---------------- */

//   const filtered = useMemo(() => {
//     const q = search.trim().toLowerCase();

//     return shipments.filter((row) => {
//       const searchableValues = [
//         row.sbNumber,
//         row.referenceNumber,
//         row.bookingNo,
//         row.bol,
//         row.exporter?.companyName,
//         row.company,
//         getSupplierName(row),
//         getBuyerName(row),
//         row.route?.originCity,
//         row.route?.destinationCity,
//         row.route?.originPort,
//         row.route?.destinationPort,
//         resolveHSCode(row),
//       ];

//       const matchSearch =
//         !q ||
//         searchableValues.some((value) =>
//           String(value || "").toLowerCase().includes(q)
//         );

//       const status = getStatus(row);
//       const mode = getMode(row);

//       const matchStatus =
//         statusFilter === "All Status" ||
//         status.toLowerCase() === statusFilter.toLowerCase();

//       const matchMode =
//         modeFilter === "All Modes" ||
//         mode.toLowerCase().includes(modeFilter.toLowerCase());

//       return matchSearch && matchStatus && matchMode;
//     });
//   }, [shipments, search, statusFilter, modeFilter, hsList]);

//   const totalPages = Math.max(
//     1,
//     Math.ceil(filtered.length / ROWS_PER_PAGE)
//   );

//   const pageItems = filtered.slice(
//     (page - 1) * ROWS_PER_PAGE,
//     page * ROWS_PER_PAGE
//   );

//   useEffect(() => {
//     if (page > totalPages) setPage(totalPages);
//   }, [page, totalPages]);

//   /* ---------------- CSV EXPORT ---------------- */

//   const exportCSV = () => {
//     const headers = [
//       "SB/AWB Number",
//       "Exporter",
//       "Supplier",
//       "Supplier Link",
//       "Buyer",
//       "Buyer Link",
//       "Origin",
//       "Destination",
//       "HS Code",
//       "Mode",
//       "ETD",
//       "ETA",
//       "Status",
//     ];

//     const escapeCSV = (value) =>
//       `"${String(value ?? "").replace(/"/g, '""')}"`;

//     const rows = filtered.map((row) => [
//       row.sbNumber || row.referenceNumber || "",
//       row.exporter?.companyName || row.company || "",
//       getSupplierName(row),
//       getSupplierLink(row),
//       getBuyerName(row),
//       getBuyerLink(row),
//       row.route?.originCity || row.route?.originPort || "",
//       row.route?.destinationCity || row.route?.destinationPort || "",
//       resolveHSCode(row),
//       getMode(row),
//       row.etd || "",
//       row.eta || "",
//       getStatus(row),
//     ]);

//     const csv = [
//       headers.map(escapeCSV).join(","),
//       ...rows.map((row) => row.map(escapeCSV).join(",")),
//     ].join("\n");

//     const blob = new Blob(["\uFEFF" + csv], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.download = `shipments-${new Date()
//       .toISOString()
//       .slice(0, 10)}.csv`;

//     document.body.appendChild(link);
//     link.click();
//     link.remove();

//     URL.revokeObjectURL(url);
//   };

//   /* ---------------- STATS ---------------- */

//   const statsData = [
//     {
//       label: "Total Shipments",
//       value: stats.total || shipments.length,
//       icon: FaBoxesStacked,
//       color: "text-slate-900",
//       bg: "bg-slate-100",
//     },
//     {
//       label: "In Transit",
//       value: stats.inTransit || 0,
//       icon: FaShip,
//       color: "text-teal-600",
//       bg: "bg-teal-50",
//     },
//     {
//       label: "Delivered",
//       value: stats.delivered || 0,
//       icon: FaCircleCheck,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//     },
//     {
//       label: "Pending Docs",
//       value: stats.pendingDocs || 0,
//       icon: FaFileLines,
//       color: "text-amber-600",
//       bg: "bg-amber-50",
//     },
//     {
//       label: "Customs Hold",
//       value: stats.customHold || 0,
//       icon: FaClock,
//       color: "text-rose-600",
//       bg: "bg-rose-50",
//     },
//     {
//       label: "Revenue",
//       value: `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
//       icon: FaBolt,
//       color: "text-indigo-600",
//       bg: "bg-indigo-50",
//     },
//   ];

//   /* ---------------- PAGE RENDER ---------------- */

//   if (showBooking) {
//     return (
//       <NewBookingPage
//         onCancel={() => setShowBooking(false)}
//       />
//     );
//   }

//   if (pendingReview) {
//     return (
//       <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
//         <PendingReview
//           setPendingReview={setPendingReview}
//         />
//       </div>
//     );
//   }

//   return (
// <div className="w-full min-h-screen max-w-full bg-gradient-to-br from-slate-50 via-[#f7f9fc] to-teal-50/30 p-3 sm:p-5 lg:p-7 overflow-x-hidden overflow-y-auto">
//   <div className="max-w-[1600px] mx-auto space-y-5">

//         {/* HEADER */}

//         <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
//           <div>
//             <div className="flex items-center gap-2 mb-1.5">
//               <span className="w-2 h-2 rounded-full bg-teal-500" />
//               <p className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.16em]">
//                 Logistics Management
//               </p>
//             </div>

//             <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
//               Shipment Database
//             </h1>

//             <p className="text-xs text-slate-500 mt-1">
//               Monitor shipments, manage consignment records and track delivery operations.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <button
//               onClick={fetchShipments}
//               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
//             >
//               <FaRotate className={loading ? "animate-spin" : ""} />
//               Refresh
//             </button>

//             <button
//               onClick={() => setPendingReview(true)}
//               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-xs font-bold text-teal-700 hover:bg-teal-50 transition-all"
//             >
//               <FaClock />
//               Pending Review
//             </button>

//             <button
//               onClick={exportCSV}
//               className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
//             >
//               <FaDownload />
//               Export CSV
//             </button>

//             <button
//               onClick={() => setShowBooking(true)}
//               className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
//             >
//               <FaPlus />
//               New Booking
//             </button>
//           </div>
//         </div>

//         {/* STATS */}

//         <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
//           {statsData.map((item) => (
//             <StatCard key={item.label} {...item} />
//           ))}
//         </div>

//         {/* MAIN CONTENT */}

//         <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.025)] overflow-hidden">

//           {/* TABLE HEADER */}

//           <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
//             <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
//               <div>
//                 <h2 className="text-sm font-extrabold text-slate-900">
//                   All Shipments
//                 </h2>
//                 <p className="text-[11px] text-slate-400 mt-0.5">
//                   View and manage all shipment records from one place.
//                 </p>
//               </div>

//               <div className="flex items-center gap-2 text-[11px] text-slate-500">
//                 <span className="w-2 h-2 bg-teal-500 rounded-full" />
//                 {filtered.length} Records Found
//               </div>
//             </div>
//           </div>

//           {/* FILTERS */}

//           <div className="p-4 sm:px-5 border-b border-slate-100">
//             <div className="flex flex-col xl:flex-row gap-2.5">
//               <div className="relative flex-1 min-w-0">
//                 <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />

//                 <input
//                   value={search}
//                   onChange={(e) => {
//                     setSearch(e.target.value);
//                     setPage(1);
//                   }}
//                   placeholder="Search SB/AWB, exporter, supplier, buyer, destination..."
//                   className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
//                 />
//               </div>

//               <div className="flex flex-wrap sm:flex-nowrap gap-2">
//                 <div className="relative flex-1 sm:flex-none">
//                   <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

//                   <select
//                     value={statusFilter}
//                     onChange={(e) => {
//                       setStatusFilter(e.target.value);
//                       setPage(1);
//                     }}
//                     className="w-full sm:w-44 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
//                   >
//                     <option>All Status</option>
//                     <option>Submitted</option>
//                     <option>Pending Admin Approval</option>
//                     <option>Pending Review</option>
//                     <option>Approved</option>
//                     <option>Carrier Assigned</option>
//                     <option>In Transit</option>
//                     <option>Delivered</option>
//                     <option>Closed</option>
//                   </select>
//                   <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
//                 </div>

//                 <div className="relative flex-1 sm:flex-none">
//                   <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

//                   <select
//                     value={modeFilter}
//                     onChange={(e) => {
//                       setModeFilter(e.target.value);
//                       setPage(1);
//                     }}
//                     className="w-full sm:w-36 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
//                   >
//                     <option>All Modes</option>
//                     <option>Air</option>
//                     <option>Sea</option>
//                     <option>Road</option>
//                   </select>
//                   <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
//                 </div>

//                 {(search || statusFilter !== "All Status" || modeFilter !== "All Modes") && (
//                   <button
//                     onClick={() => {
//                       setSearch("");
//                       setStatusFilter("All Status");
//                       setModeFilter("All Modes");
//                       setPage(1);
//                     }}
//                     className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all"
//                   >
//                     Clear
//                   </button>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* TABLE */}

//           <div className="w-full overflow-x-auto">
//             <table className="w-full min-w-[1120px] text-left border-collapse">
//               <thead>
//                 <tr className="bg-slate-50/80 border-b border-slate-200">
//                   {[
//                     "SB / AWB Details",
//                     "Exporter / Shipper",
                   
//                     "Origin → Destination",
//                     "HS Code",
//                                   "Mode",
//                     "ETD / ETA",
//                     "Status",
//                     "Action",
//                   ].map((heading, index) => (
//                     <th
//                       key={heading}
//                       className={`px-4 py-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap ${
//                         index === 5 || index === 7 || index === 9
//                           ? "text-center"
//                           : ""
//                       } ${index === 10 ? "text-right" : ""}`}
//                     >
//                       {heading}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {loading ? (
//                   <tr>
//                     <td
//                       colSpan={8}
//                       className="py-16 text-center"
//                     >
//                       <div className="flex flex-col items-center gap-3">
//                         <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-600 rounded-full animate-spin" />
//                         <p className="text-xs font-semibold text-slate-500">
//                           Loading shipment records...
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : pageItems.length === 0 ? (
//                   <tr>
//                     <td colSpan={8} className="py-16 text-center">
//                       <div className="flex flex-col items-center">
//                         <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
//                           <FaShip className="text-slate-400 text-lg" />
//                         </div>
//                         <p className="text-sm font-bold text-slate-700">
//                           No shipments found
//                         </p>
//                         <p className="text-[11px] text-slate-400 mt-1">
//                           Try changing your search or filter criteria.
//                         </p>
//                       </div>
//                     </td>
//                   </tr>
//                 ) : (
//                   pageItems.map((row) => {
//                     const status = getStatus(row);
//                     const mode = getMode(row);

//                     const exporter =
//                       row.exporter?.companyName ||
//                       row.company ||
//                       "-";

//                     const origin =
//                       row.route?.originCity ||
//                       row.route?.originPort ||
//                       "-";

//                     const destination =
//                       row.route?.destinationCity ||
//                       row.route?.destinationPort ||
//                       "-";

//                     return (
//                       <tr
//                         key={row._id || row.id}
//                         className="hover:bg-teal-50/20 transition-colors"
//                       >
//                         {/* SB / AWB */}

//                         <td className="px-4 py-3.5 whitespace-nowrap">
//                           <p className="text-xs font-extrabold text-slate-900">
//                             {row.sbNumber ||
//                               row.referenceNumber ||
//                               "-"}
//                           </p>
//                           <p className="text-[10px] text-slate-400 mt-1">
//                             {row.bol || row.bookingNo || "BOL: Pending"}
//                           </p>
//                         </td>

//                         {/* EXPORTER */}

//                         <td className="px-4 py-3.5 min-w-[170px]">
//                           <p className="text-xs font-bold text-slate-800">
//                             {exporter}
//                           </p>
//                         </td>

                       

//                         {/* ROUTE */}

//                         <td className="px-4 py-3.5 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <span className="text-[11px] font-semibold text-slate-700">
//                               {origin}
//                             </span>
//                             <FaArrowRight className="text-[9px] text-teal-500" />
//                             <span className="text-[11px] font-semibold text-slate-700">
//                               {destination}
//                             </span>
//                           </div>
//                         </td>

//                         {/* HS CODE */}

//                         <td className="px-4 py-3.5 text-center whitespace-nowrap">
//                           <span className="inline-flex px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-[10px] font-extrabold text-teal-700">
//                             {resolveHSCode(row)}
//                           </span>
//                         </td>

//                         {/* MODE */}

//                         <td className="px-4 py-3.5 text-center">
//                           <ModeBadge mode={mode} />
//                         </td>

//                         {/* ETD ETA */}

//                         <td className="px-4 py-3.5 whitespace-nowrap">
//                           <p className="text-[11px] font-semibold text-slate-700">
//                             ETD: {formatDate(row.etd)}
//                           </p>
//                           <p className="text-[10px] text-slate-400 mt-1">
//                             ETA: {formatDate(row.eta)}
//                           </p>
//                         </td>

//                         {/* STATUS */}

//                         <td className="px-4 py-3.5 text-center whitespace-nowrap">
//                           <StatusBadge status={status} />
//                         </td>

//                         {/* ACTION */}

//                         <td className="px-4 py-3.5 text-right whitespace-nowrap">
//                           <button
//                             onClick={() => setPendingReview(true)}
//                             className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-700 text-[10px] font-extrabold transition-all"
//                           >
//                             <FaEye />
//                             Inspect
//                           </button>
//                         </td>
//                       </tr>
//                     );
//                   })
//                 )}
//               </tbody>
//             </table>
//           </div>

//           {/* PAGINATION */}

//           <div className="px-4 sm:px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
//             <p className="text-[11px] text-slate-500">
//               Showing{" "}
//               <strong className="text-slate-800">
//                 {filtered.length
//                   ? (page - 1) * ROWS_PER_PAGE + 1
//                   : 0}
//               </strong>{" "}
//               to{" "}
//               <strong className="text-slate-800">
//                 {Math.min(page * ROWS_PER_PAGE, filtered.length)}
//               </strong>{" "}
//               of{" "}
//               <strong className="text-slate-800">
//                 {filtered.length}
//               </strong>{" "}
//               shipments
//             </p>

//             <div className="flex items-center gap-1.5">
//               <button
//                 onClick={() => setPage((prev) => Math.max(1, prev - 1))}
//                 disabled={page === 1}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
//               >
//                 <FaChevronLeft className="text-[10px]" />
//               </button>

//               {Array.from(
//                 { length: totalPages },
//                 (_, index) => index + 1
//               )
//                 .filter(
//                   (number) =>
//                     number === 1 ||
//                     number === totalPages ||
//                     Math.abs(number - page) <= 1
//                 )
//                 .map((number, index, arr) => (
//                   <div key={number} className="flex items-center gap-1">
//                     {index > 0 && number - arr[index - 1] > 1 && (
//                       <span className="px-1 text-slate-400 text-xs">
//                         ...
//                       </span>
//                     )}

//                     <button
//                       onClick={() => setPage(number)}
//                       className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
//                         page === number
//                           ? "bg-teal-600 text-white shadow-sm"
//                           : "border border-slate-200 text-slate-600 hover:bg-slate-50"
//                       }`}
//                     >
//                       {number}
//                     </button>
//                   </div>
//                 ))}

//               <button
//                 onClick={() =>
//                   setPage((prev) => Math.min(totalPages, prev + 1))
//                 }
//                 disabled={page === totalPages}
//                 className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
//               >
//                 <FaChevronRight className="text-[10px]" />
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* AI MODULES */}

//         <AIModulesBackendScope />
//       </div>
//     </div>
//   );
// }




// mahima code //

import { useState, useRef, useEffect, useMemo } from "react";
import {
  FaDownload,
  FaPlus,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
  FaShip,
  FaCheck,
  FaFileLines,
  FaBoxOpen,
  FaCloudArrowUp,
  FaCalendar,
  FaBolt,
  FaArrowRight,
  FaChevronDown,
  FaXmark,
  FaPlane,
  FaTruck,
  FaEye,
  FaRotate,
  FaFilter,
  FaGlobe,
  FaBoxesStacked,
  FaCircleCheck,
  FaClock,
} from "react-icons/fa6";

import API from "../../api/axios";
import PendingReview from "./PendingReview";
import AIModulesBackendScope from "./AiModules";
import { getAllShipmentsForAdmin } from "../../api/ShipmentApi";

const ROWS_PER_PAGE = 10;

/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

const getSafeUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  try {
    const value = url.trim();
    const formatted = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    const parsed = new URL(formatted);

    if (!["http:", "https:"].includes(parsed.protocol)) return null;

    return parsed.href;
  } catch {
    return null;
  }
};

const getNameValue = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return (
      value.name ||
      value.companyName ||
      value.company ||
      value.fullName ||
      value.title ||
      ""
    );
  }

  return String(value);
};

const getSupplierName = (row) =>
  getNameValue(row.supplier) ||
  row.supplierName ||
  row.supplierCompany ||
  row.vendorName ||
  row.Supplier ||
  "";

const getSupplierLink = (row) => {
  const supplier =
    typeof row.supplier === "object" ? row.supplier : {};

  return (
    supplier.link ||
    supplier.url ||
    row.supplierLink ||
    row.supplierUrl ||
    row.supplierWebsite ||
    row.vendorLink ||
    ""
  );
};

const getBuyerName = (row) =>
  getNameValue(row.buyer) ||
  getNameValue(row.consignee) ||
  row.buyerName ||
  row.consigneeName ||
  row.Cosignee ||
  row.Buyer ||
  "";

const getBuyerLink = (row) => {
  const buyer = typeof row.buyer === "object" ? row.buyer : {};
  const consignee =
    typeof row.consignee === "object" ? row.consignee : {};

  return (
    buyer.link ||
    buyer.url ||
    consignee.link ||
    consignee.url ||
    row.buyerLink ||
    row.buyerUrl ||
    row.consigneeLink ||
    row.consigneeUrl ||
    ""
  );
};

const getStatus = (row) =>
  row.shipmentStatus ||
  row.workflowStatus ||
  row.approvalStatus ||
  "Pending";

// Draft shipments are private to the B2B/user side and must not appear in Admin.
const isDraftShipment = (row) => {
  const statuses = [
    row?.shipmentStatus,
    row?.workflowStatus,
    row?.approvalStatus,
    row?.status,
  ];

  return statuses.some(
    (status) => String(status || "").trim().toLowerCase() === "draft"
  );
};

const getMode = (row) =>
  row.shipmentMode ||
  row.route?.mode ||
  row.mode ||
  "Sea";

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusStyle = (status = "") => {
  const s = status.toLowerCase();

  if (s.includes("transit"))
    return "bg-teal-50 text-teal-700 border-teal-200";

  if (s.includes("deliver"))
    return "bg-emerald-50 text-emerald-700 border-emerald-200";

  if (s.includes("approve") || s.includes("assigned"))
    return "bg-blue-50 text-blue-700 border-blue-200";

  if (
    s.includes("pending") ||
    s.includes("submitted") ||
    s.includes("review")
  )
    return "bg-amber-50 text-amber-700 border-amber-200";

  if (s.includes("custom"))
    return "bg-orange-50 text-orange-700 border-orange-200";

  if (s.includes("closed"))
    return "bg-slate-100 text-slate-600 border-slate-200";

  return "bg-slate-100 text-slate-600 border-slate-200";
};

/* -------------------------------------------------------
   LINKED NAME
------------------------------------------------------- */

const LinkedName = ({ name, link }) => {
  const safeLink = getSafeUrl(link);

  if (!name) {
    return <span className="text-slate-400">-</span>;
  }

  if (!safeLink) {
    return (
      <span className="font-semibold text-slate-800">
        {name}
      </span>
    );
  }

  return (
    <a
      href={safeLink}
      target="_blank"
      rel="noopener noreferrer"
      title={`Open ${name}`}
      className="font-semibold text-teal-700 hover:text-teal-900 hover:underline underline-offset-4 transition-colors"
    >
      {name}
    </a>
  );
};

/* -------------------------------------------------------
   SMALL UI COMPONENTS
------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </p>

        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
        >
          <Icon className={`text-sm ${color}`} />
        </div>
      </div>

      <p className={`text-xl sm:text-2xl font-extrabold mt-3 tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ModeBadge({ mode }) {
  const value = String(mode || "").toLowerCase();

  const Icon = value.includes("air")
    ? FaPlane
    : value.includes("road")
    ? FaTruck
    : FaShip;

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
      <Icon className="text-slate-400" />
      {mode}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-sm font-extrabold text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   BOOKING WORKFLOW
------------------------------------------------------- */

const STEPS = [
  "Exporter Details",
  "Cargo Information",
  "Route & Carrier",
  "Documents",
];

const inputClass =
  "w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all";

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function StepSidebar({ currentStep }) {
  return (
    <div className="w-full lg:w-56 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <p className="text-xs font-extrabold text-slate-900 mb-4">
        Booking Progress
      </p>

      <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0">
        {STEPS.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 lg:mb-5"
            >
              <div
                className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-extrabold border transition-all ${
                  done
                    ? "bg-teal-500 border-teal-500 text-white"
                    : active
                    ? "bg-white border-teal-500 text-teal-700 ring-4 ring-teal-500/10"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {done ? <FaCheck /> : index + 1}
              </div>

              <div className="hidden lg:block">
                <p
                  className={`text-xs font-bold ${
                    active || done
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Step {index + 1} of 4
                </p>
              </div>

              <span className="lg:hidden text-[9px] text-slate-500 font-semibold text-center">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step1({ form, set, onNext }) {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const nextErrors = {};

    if (!form.companyName.trim())
      nextErrors.companyName = "Company name is required";

    if (!form.contactPerson.trim())
      nextErrors.contactPerson = "Contact person is required";

    if (!form.mobile.trim())
      nextErrors.mobile = "Mobile number is required";

    setErrors(nextErrors);

    if (!Object.keys(nextErrors).length) onNext();
  };

  const field = (key, label, placeholder, required = false) => (
    <FormField label={`${label}${required ? " *" : ""}`}>
      <input
        className={`${inputClass} ${
          errors[key] ? "border-rose-400 bg-rose-50/30" : ""
        }`}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => {
          set(key, e.target.value);
          setErrors((prev) => ({ ...prev, [key]: "" }));
        }}
      />
      {errors[key] && (
        <p className="text-[10px] text-rose-500 mt-1">
          {errors[key]}
        </p>
      )}
    </FormField>
  );

  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Exporter & Shipper Information"
        subtitle="Enter company identity and customs registration details."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div className="sm:col-span-2">
          {field(
            "companyName",
            "Company Name",
            "e.g. Sunfresh Export Pvt Ltd",
            true
          )}
        </div>

        {field(
          "contactPerson",
          "Authorized Contact Person",
          "Full legal name",
          true
        )}
        {field(
          "mobile",
          "Mobile Contact",
          "+91 98765 43210",
          true
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          Continue to Cargo <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step2({ form, set, onNext }) {
  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Cargo & Commercial Information"
        subtitle="Provide commodity details, customs codes and shipment valuation."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <FormField label="HS Code (Manual Entry)">
          <input
            className={inputClass}
            placeholder="Enter HS Code manually (e.g. 6109.10)"
            value={form.hsCode}
            onChange={(e) => set("hsCode", e.target.value.trimStart())}
          />
          <p className="text-[10px] text-slate-400 mt-1">
            Enter the HS Code provided for your product. No dictionary selection is required.
          </p>
        </FormField>

        <FormField label="Commodity / Product Description">
          <input
            className={inputClass}
            placeholder="e.g. Cotton Knitted T-Shirts"
            value={form.commodity}
            onChange={(e) => set("commodity", e.target.value)}
          />
        </FormField>

        <FormField label="Gross Weight (Kg)">
          <input
            type="number"
            className={inputClass}
            placeholder="0.00"
            value={form.grossWeight}
            onChange={(e) => set("grossWeight", e.target.value)}
          />
        </FormField>

        <FormField label="Number of Packages">
          <input
            className={inputClass}
            placeholder="e.g. 150 Cartons"
            value={form.packages}
            onChange={(e) => set("packages", e.target.value)}
          />
        </FormField>

        <FormField label="Invoice Value (USD)">
          <input
            className={inputClass}
            placeholder="e.g. 25000"
            value={form.invoiceValue}
            onChange={(e) => set("invoiceValue", e.target.value)}
          />
        </FormField>

        <FormField label="Incoterms">
          <select
            className={inputClass}
            value={form.incoterms}
            onChange={(e) => set("incoterms", e.target.value)}
          >
            <option value="">Select Incoterm</option>
            <option>FOB</option>
            <option>CIF</option>
            <option>EXW</option>
            <option>DDP</option>
          </select>
        </FormField>

        <FormField label="Packing Type">
          <select
            className={inputClass}
            value={form.packingType}
            onChange={(e) => set("packingType", e.target.value)}
          >
            <option>Cartons</option>
            <option>Pallets</option>
            <option>Drums</option>
            <option>Bags</option>
          </select>
        </FormField>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Continue to Route <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step3({ form, set, onNext }) {
  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Route Details"
        subtitle="Enter the shipment origin, destination, transport mode and expected departure date."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <FormField label="Origin Port / ICD">
          <input
            className={inputClass}
            placeholder="e.g. HYD ICD (IN)"
            value={form.originPort}
            onChange={(e) => set("originPort", e.target.value)}
          />
        </FormField>

        <FormField label="Destination Port">
          <input
            className={inputClass}
            placeholder="e.g. Hamburg (DE)"
            value={form.destPort}
            onChange={(e) => set("destPort", e.target.value)}
          />
        </FormField>

        <FormField label="Shipment Mode">
          <select
            className={inputClass}
            value={form.shipmentMode}
            onChange={(e) => set("shipmentMode", e.target.value)}
          >
            <option value="">Select Mode</option>
            <option>Sea FCL</option>
            <option>Sea LCL</option>
            <option>Air</option>
            <option>Road</option>
          </select>
        </FormField>

        <FormField label="Preferred ETD">
          <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 gap-2 bg-white focus-within:border-teal-500">
            <input
              type="date"
              className="flex-1 text-xs outline-none bg-transparent"
              value={form.etd}
              onChange={(e) => set("etd", e.target.value)}
            />
            <FaCalendar className="text-slate-400 text-xs" />
          </div>
        </FormField>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Continue to Documents <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step4({ onSaveDraft, onConfirm }) {
  const [files, setFiles] = useState({});
  const fileRef = useRef(null);

  const docSlots = [
    { name: "Commercial Invoice", required: true },
    { name: "Packing List", required: true },
    { name: "Certificate of Origin", required: false },
    { name: "Quality Certificate", required: true },
    { name: "Letter of Credit", required: false },
  ];

  const addFile = (name, file) => {
    if (!file) return;

    if (file.size > 10 * 1024 * 1024) {
      alert("File size should not exceed 10 MB");
      return;
    }

    setFiles((prev) => ({ ...prev, [name]: file }));
  };

  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Shipment Documents"
        subtitle="Upload the documents required for customs clearance."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {docSlots.map((doc) => (
          <div
            key={doc.name}
            className="border border-slate-200 rounded-xl p-3.5 bg-white"
          >
            <div className="flex items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center">
                  <FaFileLines className="text-blue-600 text-xs" />
                </div>
                <p className="text-xs font-bold text-slate-800">
                  {doc.name}
                </p>
              </div>

              <span
                className={`text-[9px] px-2 py-1 rounded-full font-bold ${
                  doc.required
                    ? "bg-rose-50 text-rose-600"
                    : "bg-slate-100 text-slate-500"
                }`}
              >
                {doc.required ? "Required" : "Optional"}
              </span>
            </div>

            <label className="flex items-center gap-2 border border-dashed border-slate-300 hover:border-teal-400 rounded-lg p-2.5 cursor-pointer transition-colors">
              <FaCloudArrowUp className="text-teal-600" />

              <span className="text-[10px] text-slate-500 truncate flex-1">
                {files[doc.name]?.name || "Choose document"}
              </span>

              {files[doc.name] && (
                <FaCheck className="text-teal-600 text-xs" />
              )}

              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                className="hidden"
                onChange={(e) => addFile(doc.name, e.target.files[0])}
              />
            </label>
          </div>
        ))}
      </div>

      <div
        onClick={() => fileRef.current?.click()}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          Array.from(e.dataTransfer.files).forEach((file, index) => {
            addFile(`Additional Document ${index + 1}`, file);
          });
        }}
        className="mt-4 border-2 border-dashed border-teal-200 rounded-2xl bg-teal-50/30 p-6 text-center cursor-pointer hover:bg-teal-50 transition-colors"
      >
        <FaCloudArrowUp className="text-2xl text-teal-600 mx-auto mb-2" />
        <p className="text-xs font-bold text-slate-800">
          Drag & drop additional documents here
        </p>
        <p className="text-[10px] text-slate-400 mt-1">
          PDF, JPG or PNG · Maximum 10 MB per file
        </p>

        <input
          ref={fileRef}
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png"
          className="hidden"
          onChange={(e) =>
            Array.from(e.target.files).forEach((file, index) =>
              addFile(`Additional Document ${index + 1}`, file)
            )
          }
        />
      </div>

      <div className="flex flex-col sm:flex-row justify-end gap-2 mt-6 pt-4 border-t border-slate-100">
        <button
          onClick={onSaveDraft}
          className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50"
        >
          Save Draft
        </button>

        <button
          onClick={() => onConfirm(files)}
          className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
        >
          Confirm & Submit <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function NewBookingPage({ onCancel }) {
  const [step, setStep] = useState(0);

  const [form, setForm] = useState({
    companyName: "",
    contactPerson: "",
    mobile: "",
    hsCode: "",
    commodity: "",
    grossWeight: "",
    packages: "",
    invoiceValue: "",
    incoterms: "",
    packingType: "Cartons",
    originPort: "",
    destPort: "",
    shipmentMode: "",
    etd: "",
  });

  const set = (key, value) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const next = () => setStep((prev) => Math.min(3, prev + 1));

  return (
    <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8 overflow-x-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">
              Shipment Management
            </p>
            <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
              Create New Booking
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Complete the booking details in four simple steps.
            </p>
          </div>

          <button
            onClick={onCancel}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold hover:bg-slate-50"
          >
            <FaXmark /> Close Booking
          </button>
        </div>

        <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-7">
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
            <StepSidebar currentStep={step} />

            {step === 0 && (
              <Step1 form={form} set={set} onNext={next} />
            )}

            {step === 1 && (
              <Step2 form={form} set={set} onNext={next} />
            )}

            {step === 2 && (
              <Step3 form={form} set={set} onNext={next} />
            )}

            {step === 3 && (
              <Step4
                onSaveDraft={() => alert("Draft functionality needs backend integration.")}
                onConfirm={() => {
                  alert("Booking submission needs backend integration.");
                }}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------
   MAIN SHIPMENT PAGE
------------------------------------------------------- */

export default function Shipment() {
  const [showBooking, setShowBooking] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [pendingReview, setPendingReview] = useState(false);
  const [hsList, setHsList] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
    pendingDocs: 0,
    customHold: 0,
    revenue: 0,
  });

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modeFilter, setModeFilter] = useState("All Modes");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */

  const fetchShipments = async () => {
    try {
      setLoading(true);

      const res = await getAllShipmentsForAdmin({
        page: 1,
        limit: 100,
      });

      const records =
        res?.data?.data?.shipments ||
        res?.data?.data ||
        res?.data?.shipments ||
        [];

      // Never show user-saved drafts in the Admin shipment database.
      const adminVisibleShipments = Array.isArray(records)
        ? records.filter((shipment) => !isDraftShipment(shipment))
        : [];

      setShipments(adminVisibleShipments);
    } catch (err) {
      console.error("Admin shipments error:", err);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/shipments/stats");

      if (res.data?.data) {
        setStats((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error("Shipment stats error:", err);
    }
  };

  const fetchHSCodesList = async () => {
    try {
      const res = await API.get("/hs");

      const records = res.data?.data || res.data || [];
      setHsList(Array.isArray(records) ? records : []);
    } catch (err) {
      console.error("HS Codes dictionary load:", err);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchStats();
    fetchHSCodesList();
  }, []);

  /* ---------------- HS CODE RESOLVER ---------------- */

  const resolveHSCode = (row) => {
    const cargo = row?.cargo || {};
    const raw =
      cargo.hsCodeText ||
      cargo.hsCode?.hsCode ||
      cargo.hsCode?.code ||
      cargo.hsCode?.number ||
      cargo.hsCode ||
      row.hsCodeText ||
      row.hsCode?.hsCode ||
      row.hsCode?.code ||
      row.hsCode ||
      cargo.hscode;

    if (raw === undefined || raw === null || raw === "") return "-";

    if (typeof raw === "object") {
      return raw.hsCode || raw.code || raw.number || "-";
    }

    const clean = String(raw).trim();

    if (/^[0-9a-fA-F]{24}$/.test(clean)) {
      const found = hsList.find(
        (item) => String(item._id) === clean
      );

      return found
        ? found.hsCode || found.code || found.name || "-"
        : "-";
    }

    return clean || "-";
  };

  /* ---------------- SEARCH + FILTER ---------------- */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return shipments.filter((row) => {
      const searchableValues = [
        row.sbNumber,
        row.referenceNumber,
        row.bookingNo,
        row.bol,
        row.exporter?.companyName,
        row.company,
        getSupplierName(row),
        getBuyerName(row),
        row.route?.originCity,
        row.route?.destinationCity,
        row.route?.originPort,
        row.route?.destinationPort,
        resolveHSCode(row),
      ];

      const matchSearch =
        !q ||
        searchableValues.some((value) =>
          String(value || "").toLowerCase().includes(q)
        );

      const status = getStatus(row);
      const mode = getMode(row);

      const matchStatus =
        statusFilter === "All Status" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      const matchMode =
        modeFilter === "All Modes" ||
        mode.toLowerCase().includes(modeFilter.toLowerCase());

      return matchSearch && matchStatus && matchMode;
    });
  }, [shipments, search, statusFilter, modeFilter, hsList]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ROWS_PER_PAGE)
  );

  const pageItems = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  /* ---------------- CSV EXPORT ---------------- */

  const exportCSV = () => {
    const headers = [
      "SB/AWB Number",
      "Exporter",
      "Supplier",
      "Supplier Link",
      "Buyer",
      "Buyer Link",
      "Origin",
      "Destination",
      "HS Code",
      "Mode",
      "ETD",
      "ETA",
      "Status",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((row) => [
      row.sbNumber || row.referenceNumber || "",
      row.exporter?.companyName || row.company || "",
      getSupplierName(row),
      getSupplierLink(row),
      getBuyerName(row),
      getBuyerLink(row),
      row.route?.originCity || row.route?.originPort || "",
      row.route?.destinationCity || row.route?.destinationPort || "",
      resolveHSCode(row),
      getMode(row),
      row.etd || "",
      row.eta || "",
      getStatus(row),
    ]);

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `shipments-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  /* ---------------- STATS ---------------- */

  const statsData = [
    {
      label: "Total Shipments",
      value: stats.total || shipments.length,
      icon: FaBoxesStacked,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
    {
      label: "In Transit",
      value: stats.inTransit || 0,
      icon: FaShip,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Delivered",
      value: stats.delivered || 0,
      icon: FaCircleCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Docs",
      value: stats.pendingDocs || 0,
      icon: FaFileLines,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Customs Hold",
      value: stats.customHold || 0,
      icon: FaClock,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Revenue",
      value: `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
      icon: FaBolt,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  /* ---------------- PAGE RENDER ---------------- */

  if (showBooking) {
    return (
      <NewBookingPage
        onCancel={() => setShowBooking(false)}
      />
    );
  }

  if (pendingReview) {
    return (
      <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
        <PendingReview
          setPendingReview={setPendingReview}
        />
      </div>
    );
  }

  return (
<div className="w-full min-h-screen max-w-full bg-gradient-to-br from-slate-50 via-[#f7f9fc] to-teal-50/30 p-3 sm:p-5 lg:p-7 overflow-x-hidden overflow-y-auto">
  <div className="max-w-[1600px] mx-auto space-y-5">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <p className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.16em]">
                Logistics Management
              </p>
            </div>

            <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
              Shipment Database
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Monitor shipments, manage consignment records and track delivery operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchShipments}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FaRotate className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={() => setPendingReview(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-xs font-bold text-teal-700 hover:bg-teal-50 transition-all"
            >
              <FaClock />
              Pending Review
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FaDownload />
              Export CSV
            </button>

            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <FaPlus />
              New Booking
            </button>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {statsData.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>

        {/* MAIN CONTENT */}

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.025)] overflow-hidden">

          {/* TABLE HEADER */}

          <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  All Shipments
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  View and manage all shipment records from one place.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                {filtered.length} Records Found
              </div>
            </div>
          </div>

          {/* FILTERS */}

          <div className="p-4 sm:px-5 border-b border-slate-100">
            <div className="flex flex-col xl:flex-row gap-2.5">
              <div className="relative flex-1 min-w-0">
                <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search SB/AWB, exporter, supplier, buyer, destination..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:w-44 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
                  >
                    <option>All Status</option>
                    <option>Submitted</option>
                    <option>Pending Admin Approval</option>
                    <option>Pending Review</option>
                    <option>Approved</option>
                    <option>Carrier Assigned</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

                  <select
                    value={modeFilter}
                    onChange={(e) => {
                      setModeFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:w-36 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
                  >
                    <option>All Modes</option>
                    <option>Air</option>
                    <option>Sea</option>
                    <option>Road</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
                </div>

                {(search || statusFilter !== "All Status" || modeFilter !== "All Modes") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All Status");
                      setModeFilter("All Modes");
                      setPage(1);
                    }}
                    className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  {[
                    "SB / AWB Details",
                    "Exporter / Shipper",
                   
                    "Origin → Destination",
                    "HS Code",
                                  "Mode",
                    "ETD / ETA",
                    "Status",
                    "Action",
                  ].map((heading, index) => (
                    <th
                      key={heading}
                      className={`px-4 py-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap ${
                        index === 5 || index === 7 || index === 9
                          ? "text-center"
                          : ""
                      } ${index === 10 ? "text-right" : ""}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-600 rounded-full animate-spin" />
                        <p className="text-xs font-semibold text-slate-500">
                          Loading shipment records...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                          <FaShip className="text-slate-400 text-lg" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">
                          No shipments found
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Try changing your search or filter criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageItems.map((row) => {
                    const status = getStatus(row);
                    const mode = getMode(row);

                    const exporter =
                      row.exporter?.companyName ||
                      row.company ||
                      "-";

                    const origin =
                      row.route?.originCity ||
                      row.route?.originPort ||
                      "-";

                    const destination =
                      row.route?.destinationCity ||
                      row.route?.destinationPort ||
                      "-";

                    return (
                      <tr
                        key={row._id || row.id}
                        className="hover:bg-teal-50/20 transition-colors"
                      >
                        {/* SB / AWB */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-xs font-extrabold text-slate-900">
                            {row.sbNumber ||
                              row.referenceNumber ||
                              "-"}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {row.bol || row.bookingNo || "BOL: Pending"}
                          </p>
                        </td>

                        {/* EXPORTER */}

                        <td className="px-4 py-3.5 min-w-[170px]">
                          <p className="text-xs font-bold text-slate-800">
                            {exporter}
                          </p>
                        </td>

                       

                        {/* ROUTE */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-700">
                              {origin}
                            </span>
                            <FaArrowRight className="text-[9px] text-teal-500" />
                            <span className="text-[11px] font-semibold text-slate-700">
                              {destination}
                            </span>
                          </div>
                        </td>

                        {/* HS CODE */}

                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-[10px] font-extrabold text-teal-700">
                            {resolveHSCode(row)}
                          </span>
                        </td>

                        {/* MODE */}

                        <td className="px-4 py-3.5 text-center">
                          <ModeBadge mode={mode} />
                        </td>

                        {/* ETD ETA */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-[11px] font-semibold text-slate-700">
                            ETD: {formatDate(row.etd)}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            ETA: {formatDate(row.eta)}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <StatusBadge status={status} />
                        </td>

                        {/* ACTION */}

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => setPendingReview(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-700 text-[10px] font-extrabold transition-all"
                          >
                            <FaEye />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="px-4 sm:px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500">
              Showing{" "}
              <strong className="text-slate-800">
                {filtered.length
                  ? (page - 1) * ROWS_PER_PAGE + 1
                  : 0}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-800">
                {Math.min(page * ROWS_PER_PAGE, filtered.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-800">
                {filtered.length}
              </strong>{" "}
              shipments
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .filter(
                  (number) =>
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - page) <= 1
                )
                .map((number, index, arr) => (
                  <div key={number} className="flex items-center gap-1">
                    {index > 0 && number - arr[index - 1] > 1 && (
                      <span className="px-1 text-slate-400 text-xs">
                        ...
                      </span>
                    )}

                    <button
                      onClick={() => setPage(number)}
                      className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                        page === number
                          ? "bg-teal-600 text-white shadow-sm"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {number}
                    </button>
                  </div>
                ))}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

        {/* AI MODULES */}

        <AIModulesBackendScope />
      </div>
    </div>
  );
}