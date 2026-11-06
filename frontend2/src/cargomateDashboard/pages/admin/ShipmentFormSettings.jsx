// // import { useState } from "react";
// // import { Pencil, Trash2 } from "lucide-react";
// // import AddNewField from "./AddNewField";

// // const Toggle = ({ checked, onChange }) => (
// //   <button
// //     type="button"
// //     onClick={onChange}
// //     className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
// //       checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
// //     }`}
// //   >
// //     <span className="w-4 h-4 bg-white rounded-full shadow" />
// //   </button>
// // );

// // const initialFields = [
// //   { id: 1, label: "Shipment Type", type: "Dropdown", enabled: true },
// //   { id: 2, label: "Shipment Mode", type: "Dropdown", enabled: true },
// //   { id: 3, label: "Shipment Purpose", type: "Dropdown", enabled: true },
// //   { id: 4, label: "Customer / Company Name", type: "Text", enabled: true },
// //   { id: 5, label: "Contact No.", type: "Text", enabled: true },
// //   { id: 6, label: "Reference No.", type: "Text", enabled: true },
// // ];

// // export default function ShipmentFormSettings() {
// //   const [fields, setFields] = useState(initialFields);
// //   const [editingId, setEditingId] = useState(null);
// //   const [editLabel, setEditLabel] = useState("");
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [sectionTitle, setSectionTitle] = useState("");
// //   const [sectionDesc, setSectionDesc] = useState("");

// //   const toggleField = (id) => {
// //     setFields((prev) =>
// //       prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f))
// //     );
// //   };

// //   const startEdit = (field) => {
// //     setEditingId(field.id);
// //     setEditLabel(field.label);
// //   };

// //   const saveEdit = (id) => {
// //     setFields((prev) => prev.map((f) => (f.id === id ? { ...f, label: editLabel } : f)));
// //     setEditingId(null);
// //   };

// //   const deleteField = (id) => {
// //     setFields((prev) => prev.filter((f) => f.id !== id));
// //   };

// //   const handleAddField = (field) => {
// //     setFields((prev) => [
// //       ...prev,
// //       { id: Date.now(), label: field.label || "New Field", type: field.type, enabled: field.required },
// //     ]);
// //     setShowAddModal(false);
// //   };

// //   const handleSave = async () => {
// //     try {
// //       await fetch("/api/shipment-form-settings", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ fields, sectionTitle, sectionDesc }),
// //       });
// //     } catch (err) {}
// //   };

// //   const handleReset = () => {
// //     setFields(initialFields);
// //     setSectionTitle("");
// //     setSectionDesc("");
// //   };

// //   return (
// //     <div className="w-full max-w-xl mx-auto bg-white rounded-2xl  p-4 sm:p-6">
// //       <div className="flex items-center justify-between mb-4 gap-3">
// //         <div>
// //           <h2 className="text-lg sm:text-xl font-bold text-gray-900">Shipment Form Settings</h2>
// //           <p className="text-xs text-gray-500">Manage and customize shipment form fields.</p>
// //         </div>
// //         <button
// //           onClick={handleSave}
// //           className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shrink-0"
// //         >
// //           Save Changes
// //         </button>
// //       </div>

// //       <div className="bg-gray-50 rounded-lg py-2 flex justify-center mb-4">
// //         <span className="bg-green-100 text-green-700 text-sm font-medium px-4 py-1.5 rounded-full">
// //           Basic Shipment Details
// //         </span>
// //       </div>

// //       <div className="border border-gray-200 rounded-lg p-4 mb-4">
// //         <p className="font-semibold text-gray-900 text-sm">Field Management</p>
// //         <p className="text-xs text-gray-500 mb-3">Add, edit or record files.</p>

// //         <div className="space-y-3">
// //           {fields.map((f) => (
// //             <div key={f.id} className="flex items-center justify-between gap-2">
// //               {editingId === f.id ? (
// //                 <input
// //                   value={editLabel}
// //                   onChange={(e) => setEditLabel(e.target.value)}
// //                   className="border border-gray-300 rounded-lg px-2 py-1 text-sm flex-1"
// //                 />
// //               ) : (
// //                 <span className="text-sm text-gray-800">{f.label}</span>
// //               )}
// //               <div className="flex items-center gap-3 shrink-0">
// //                 <span
// //                   className={`text-sm font-medium ${
// //                     f.type === "Dropdown" ? "text-blue-600" : "text-green-600"
// //                   }`}
// //                 >
// //                   {f.type}
// //                 </span>
// //                 <Toggle checked={f.enabled} onChange={() => toggleField(f.id)} />
// //                 {editingId === f.id ? (
// //                   <button onClick={() => saveEdit(f.id)} className="text-xs text-green-600 font-medium">
// //                     Save
// //                   </button>
// //                 ) : (
// //                   <button onClick={() => startEdit(f)}>
// //                     <Pencil className="w-4 h-4 text-gray-700" />
// //                   </button>
// //                 )}
// //                 <button onClick={() => deleteField(f.id)}>
// //                   <Trash2 className="w-4 h-4 text-red-500" />
// //                 </button>
// //               </div>
// //             </div>
// //           ))}
// //         </div>

// //         <div className="flex justify-center mt-4">
// //           <button
// //             onClick={() => setShowAddModal(true)}
// //             className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600"
// //           >
// //             Add new field
// //           </button>
// //         </div>
// //       </div>

// //       <div className="border border-gray-200 rounded-lg p-4">
// //         <p className="font-semibold text-gray-900 text-sm">Section settings</p>
// //         <p className="text-xs text-gray-500 mb-4">Customize this section</p>

// //         <label className="block text-sm text-gray-700 mb-1">Section Title</label>
// //         <input
// //           value={sectionTitle}
// //           onChange={(e) => setSectionTitle(e.target.value)}
// //           placeholder="Basic Shipment Details"
// //           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
// //         />

// //         <label className="block text-sm text-gray-700 mb-1">Section description (optional)</label>
// //         <textarea
// //           value={sectionDesc}
// //           onChange={(e) => setSectionDesc(e.target.value)}
// //           placeholder="Description"
// //           rows={3}
// //           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 mb-4"
// //         />

// //         <button onClick={handleReset} className="text-sm text-red-500 font-medium">
// //           Reset To Default
// //         </button>
// //       </div>

// //       {showAddModal && (
// //         <AddNewField optionsVar={true} placeVar={true} onCancel={() => setShowAddModal(false)} onSave={handleAddField} />
// //       )}
// //     </div>
// //   );
// // }



// /// mahima code //
// import { useEffect, useMemo, useState } from "react";
// import {
//   Plus, Pencil, Trash2, Save, RotateCcw, X, ChevronDown,
//   Settings2, Type, List, CheckCircle2, AlertCircle,
//   GripVertical, Package, Search, Eye
// } from "lucide-react";

// const API_URL = `${import.meta.env.VITE_API_URL}/settings/shipment-form`;

// const defaultFields = [
//   { key: "shipmentType", label: "Shipment Type", useDropdown: true, options: ["Export", "Import", "Re-export"] },
//   { key: "shipmentMode", label: "Shipment Mode", useDropdown: true, options: ["Air", "Sea", "Road", "Rail"] },
//   { key: "shipmentPurpose", label: "Shipment Purpose", useDropdown: true, options: ["Commercial", "Sample", "Personal"] },
//   { key: "companyName", label: "Customer / Company Name", useDropdown: false, options: [] },
//   { key: "contactPerson", label: "Contact Person", useDropdown: false, options: [] },
// ];

// const defaultSection = {
//   title: "Basic Shipment Details",
//   description: "General shipment classification and exporter contact",
//   fields: defaultFields,
// };

// const slugify = (value) =>
//   value
//     .trim()
//     .toLowerCase()
//     .replace(/[^a-z0-9]+/g, "_")
//     .replace(/^_|_$/g, "");

// const Toggle = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={() => onChange(!checked)}
//     role="switch"
//     aria-checked={checked}
//     className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
//       checked ? "bg-indigo-600" : "bg-slate-300"
//     }`}
//   >
//     <span
//       className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
//         checked ? "left-6" : "left-1"
//       }`}
//     />
//   </button>
// );

// function FieldModal({ field, onClose, onSave }) {
//   const [label, setLabel] = useState(field?.label || "");
//   const [useDropdown, setUseDropdown] = useState(field?.useDropdown ?? true);
//   const [options, setOptions] = useState(
//     (field?.options || []).join("\n")
//   );
//   const [error, setError] = useState("");

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     if (!label.trim()) {
//       setError("Please enter a field name.");
//       return;
//     }

//     const parsedOptions = options
//       .split("\n")
//       .map((item) => item.trim())
//       .filter(Boolean);

//     if (useDropdown && !parsedOptions.length) {
//       setError("Add at least one dropdown option.");
//       return;
//     }

//     onSave({
//       ...field,
//       key: field?.key || slugify(label),
//       label: label.trim(),
//       useDropdown,
//       options: useDropdown ? [...new Set(parsedOptions)] : [],
//     });
//   };

//   return (
//     <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
//       <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
//         <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
//           <div>
//             <h3 className="text-lg font-bold text-slate-900">
//               {field ? "Edit Form Field" : "Add New Field"}
//             </h3>
//             <p className="text-xs text-slate-500 mt-1">
//               Configure how this field appears on the shipment form.
//             </p>
//           </div>
//           <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
//             <X size={19} />
//           </button>
//         </div>

//         <form onSubmit={handleSubmit} className="p-6 space-y-5">
//           <div>
//             <label className="block text-sm font-semibold text-slate-700 mb-2">
//               Field Label
//             </label>
//             <input
//               value={label}
//               onChange={(e) => setLabel(e.target.value)}
//               placeholder="e.g. Customer Name"
//               className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 outline-none text-sm"
//               autoFocus
//             />
//           </div>

//           <div className="rounded-xl border border-slate-200 p-4">
//             <div className="flex items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
//                   useDropdown ? "bg-indigo-50 text-indigo-600" : "bg-emerald-50 text-emerald-600"
//                 }`}>
//                   {useDropdown ? <List size={19} /> : <Type size={19} />}
//                 </div>
//                 <div>
//                   <p className="text-sm font-semibold text-slate-800">Input Type</p>
//                   <p className="text-xs text-slate-500">
//                     {useDropdown ? "User selects from options" : "User enters a value"}
//                   </p>
//                 </div>
//               </div>
//               <Toggle checked={useDropdown} onChange={setUseDropdown} />
//             </div>

//             <div className="mt-3 flex justify-between text-xs font-semibold">
//               <span className={!useDropdown ? "text-emerald-600" : "text-slate-400"}>
//                 Text Input
//               </span>
//               <span className={useDropdown ? "text-indigo-600" : "text-slate-400"}>
//                 Dropdown
//               </span>
//             </div>
//           </div>

//           {useDropdown && (
//             <div>
//               <label className="block text-sm font-semibold text-slate-700 mb-2">
//                 Dropdown Options
//               </label>
//               <textarea
//                 value={options}
//                 onChange={(e) => setOptions(e.target.value)}
//                 rows={5}
//                 placeholder={"Export\nImport\nDomestic"}
//                 className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none text-sm resize-none"
//               />
//               <p className="text-xs text-slate-400 mt-1.5">
//                 Enter one option per line.
//               </p>
//             </div>
//           )}

//           {error && (
//             <p className="text-sm text-red-600 flex items-center gap-2">
//               <AlertCircle size={15} /> {error}
//             </p>
//           )}

//           <div className="flex gap-3 pt-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="flex-1 px-4 py-3 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-lg shadow-indigo-600/20"
//             >
//               {field ? "Update Field" : "Add Field"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default function ShipmentFormSettings() {
//   const [section, setSection] = useState(defaultSection);
//   const [showModal, setShowModal] = useState(false);
//   const [editingField, setEditingField] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [resetting, setResetting] = useState(false);
//   const [search, setSearch] = useState("");
//   const [notice, setNotice] = useState({ type: "", message: "" });

//   const filteredFields = useMemo(
//     () => section.fields.filter((field) =>
//       field.label.toLowerCase().includes(search.toLowerCase())
//     ),
//     [section.fields, search]
//   );

//   const showNotice = (type, message) => {
//     setNotice({ type, message });
//     window.setTimeout(() => setNotice({ type: "", message: "" }), 3500);
//   };

//   const loadSettings = async () => {
//     setLoading(true);
//     try {
//       const response = await fetch(API_URL, {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!response.ok) throw new Error("Unable to load shipment settings.");

//       const result = await response.json();
//       const savedSection = result.data?.sections?.[0];

//       if (savedSection) {
//         setSection({
//           ...defaultSection,
//           ...savedSection,
//           fields: savedSection.fields || [],
//         });
//       }
//     } catch (error) {
//       console.error("Shipment settings fetch:", error);
//       showNotice("error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadSettings();
//   }, []);

//   const saveField = (field) => {
//     setSection((prev) => {
//       const exists = prev.fields.some((item) => item.key === field.key);

//       return {
//         ...prev,
//         fields: exists
//           ? prev.fields.map((item) =>
//               item.key === field.key ? field : item
//             )
//           : [...prev.fields, field],
//       };
//     });

//     setShowModal(false);
//     setEditingField(null);
//   };

//   const deleteField = (key) => {
//     if (!window.confirm("Are you sure you want to delete this field?")) return;

//     setSection((prev) => ({
//       ...prev,
//       fields: prev.fields.filter((field) => field.key !== key),
//     }));
//   };

//   const handleSave = async () => {
//     setSaving(true);
//     try {
//       const response = await fetch(API_URL, {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           sections: [section],
//         }),
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Failed to save settings.");
//       }

//       const savedSection = result.data?.sections?.[0];
//       if (savedSection) setSection(savedSection);

//       showNotice("success", "Shipment form settings saved successfully!");
//     } catch (error) {
//       console.error("Shipment settings save:", error);
//       showNotice("error", error.message);
//     } finally {
//       setSaving(false);
//     }
//   };

//   const handleReset = async () => {
//     if (!window.confirm("Reset all shipment form settings to default?")) return;

//     setResetting(true);
//     try {
//       const response = await fetch(`${API_URL}/reset`, {
//         method: "POST",
//         credentials: "include",
//       });

//       const result = await response.json();

//       if (!response.ok) {
//         throw new Error(result.message || "Unable to reset settings.");
//       }

//       const savedSection = result.data?.sections?.[0];
//       setSection(savedSection || defaultSection);
//       showNotice("success", "Default settings restored successfully!");
//     } catch (error) {
//       showNotice("error", error.message);
//     } finally {
//       setResetting(false);
//     }
//   };

//   return (
//     <div className="w-full min-h-full bg-slate-50/70 p-3 sm:p-5 lg:p-7">
//       <div className="max-w-6xl mx-auto space-y-5">

//         {/* Header */}
//         <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 p-6 sm:p-8 text-white shadow-xl">
//           <div className="absolute -right-12 -top-20 w-64 h-64 rounded-full bg-indigo-500/10 blur-3xl" />
//           <div className="relative flex flex-col sm:flex-row sm:items-center justify-between gap-5">
//             <div className="flex gap-4 items-center">
//               <div className="w-14 h-14 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
//                 <Package size={27} />
//               </div>
//               <div>
//                 <div className="flex items-center gap-2 mb-1">
//                   <span className="text-[10px] uppercase tracking-[2px] text-indigo-200 font-bold">
//                     Admin Configuration
//                   </span>
//                   <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
//                 </div>
//                 <h1 className="text-xl sm:text-2xl font-bold">
//                   Shipment Form Settings
//                 </h1>
//                 <p className="text-xs sm:text-sm text-slate-300 mt-1">
//                   Customize the fields displayed on your shipment form.
//                 </p>
//               </div>
//             </div>

//             <button
//               onClick={handleSave}
//               disabled={saving || loading}
//               className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white text-slate-900 text-sm font-bold hover:bg-indigo-50 transition disabled:opacity-50"
//             >
//               <Save size={17} />
//               {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>

//         {/* Notifications */}
//         {notice.message && (
//           <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm border ${
//             notice.type === "success"
//               ? "bg-emerald-50 border-emerald-200 text-emerald-700"
//               : "bg-red-50 border-red-200 text-red-700"
//           }`}>
//             {notice.type === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
//             {notice.message}
//           </div>
//         )}

//         {/* Stats */}
//         <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
//           <div className="bg-white rounded-xl border border-slate-200 p-4">
//             <p className="text-xs text-slate-500">Total Fields</p>
//             <p className="text-2xl font-bold text-slate-900 mt-1">{section.fields.length}</p>
//           </div>
//           <div className="bg-white rounded-xl border border-slate-200 p-4">
//             <p className="text-xs text-slate-500">Dropdown Fields</p>
//             <p className="text-2xl font-bold text-indigo-600 mt-1">
//               {section.fields.filter((f) => f.useDropdown).length}
//             </p>
//           </div>
//           <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2 sm:col-span-1">
//             <p className="text-xs text-slate-500">Text Fields</p>
//             <p className="text-2xl font-bold text-emerald-600 mt-1">
//               {section.fields.filter((f) => !f.useDropdown).length}
//             </p>
//           </div>
//         </div>

//         {/* Main Configuration */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
//           <div className="p-5 sm:p-6 border-b border-slate-100">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//               <div>
//                 <div className="flex items-center gap-2">
//                   <Settings2 size={19} className="text-indigo-600" />
//                   <h2 className="font-bold text-slate-900">Section Configuration</h2>
//                 </div>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Manage your shipment form section and its fields.
//                 </p>
//               </div>
//               <button
//                 onClick={() => {
//                   setEditingField(null);
//                   setShowModal(true);
//                 }}
//                 className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 shadow-md shadow-indigo-600/15"
//               >
//                 <Plus size={17} /> Add New Field
//               </button>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-2">
//                   Section Title
//                 </label>
//                 <input
//                   value={section.title}
//                   onChange={(e) => setSection({ ...section, title: e.target.value })}
//                   placeholder="Enter section title"
//                   className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none text-sm"
//                 />
//               </div>
//               <div>
//                 <label className="block text-xs font-semibold text-slate-600 mb-2">
//                   Section Description
//                 </label>
//                 <input
//                   value={section.description || ""}
//                   onChange={(e) => setSection({ ...section, description: e.target.value })}
//                   placeholder="Enter a short description"
//                   className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-indigo-500 outline-none text-sm"
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Fields */}
//           <div className="p-5 sm:p-6">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
//               <div>
//                 <h3 className="font-bold text-slate-900">Field Management</h3>
//                 <p className="text-xs text-slate-500 mt-1">
//                   Configure the input type and available options.
//                 </p>
//               </div>
//               <div className="relative">
//                 <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
//                 <input
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search fields..."
//                   className="pl-9 pr-3 py-2.5 w-full sm:w-56 rounded-xl border border-slate-200 text-xs outline-none focus:border-indigo-400"
//                 />
//               </div>
//             </div>

//             {loading ? (
//               <div className="py-16 text-center text-sm text-slate-500">
//                 Loading shipment settings...
//               </div>
//             ) : filteredFields.length === 0 ? (
//               <div className="py-14 text-center border border-dashed border-slate-200 rounded-xl">
//                 <Package className="mx-auto text-slate-300 mb-2" size={30} />
//                 <p className="text-sm font-semibold text-slate-700">No fields found</p>
//                 <p className="text-xs text-slate-400 mt-1">Add a new field to get started.</p>
//               </div>
//             ) : (
//               <div className="space-y-3">
//                 {filteredFields.map((field, index) => (
//                   <div
//                     key={field.key}
//                     className="group border border-slate-200 rounded-xl p-4 hover:border-indigo-200 hover:shadow-sm transition-all"
//                   >
//                     <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//                       <div className="flex items-center gap-3 min-w-0">
//                         <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
//                           <GripVertical size={17} />
//                         </div>
//                         <div className="min-w-0">
//                           <p className="text-sm font-semibold text-slate-800 truncate">
//                             {field.label}
//                           </p>
//                           <p className="text-[11px] text-slate-400 mt-1">
//                             Field {String(index + 1).padStart(2, "0")} · {field.key}
//                           </p>
//                         </div>
//                       </div>

//                       <div className="flex items-center justify-between sm:justify-end gap-3">
//                         <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
//                           field.useDropdown
//                             ? "bg-indigo-50 text-indigo-700"
//                             : "bg-emerald-50 text-emerald-700"
//                         }`}>
//                           {field.useDropdown ? <List size={13} /> : <Type size={13} />}
//                           {field.useDropdown ? "Dropdown" : "Text Input"}
//                         </span>

//                         <button
//                           onClick={() => {
//                             setEditingField(field);
//                             setShowModal(true);
//                           }}
//                           title="Edit field"
//                           className="p-2 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50"
//                         >
//                           <Pencil size={16} />
//                         </button>

//                         <button
//                           onClick={() => deleteField(field.key)}
//                           title="Delete field"
//                           className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
//                         >
//                           <Trash2 size={16} />
//                         </button>
//                       </div>
//                     </div>

//                     {field.useDropdown && (
//                       <div className="mt-3 ml-12 flex flex-wrap gap-2">
//                         {(field.options || []).map((option) => (
//                           <span
//                             key={option}
//                             className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600"
//                           >
//                             {option}
//                           </span>
//                         ))}
//                         {(!field.options || !field.options.length) && (
//                           <span className="text-xs text-amber-600">No options configured</span>
//                         )}
//                       </div>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
//             <p className="text-xs text-slate-500">
//               Changes will apply to the shipment form after saving.
//             </p>
//             <button
//               onClick={handleReset}
//               disabled={resetting || loading}
//               className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
//             >
//               <RotateCcw size={15} />
//               {resetting ? "Resetting..." : "Reset To Default"}
//             </button>
//           </div>
//         </div>

//         {/* Preview */}
//         <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
//           <div className="flex items-center gap-2 mb-4">
//             <Eye size={18} className="text-indigo-600" />
//             <h3 className="font-bold text-slate-900">Form Preview</h3>
//           </div>
//           <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
//             <h4 className="text-sm font-bold text-slate-800">{section.title}</h4>
//             {section.description && (
//               <p className="text-xs text-slate-500 mt-1">{section.description}</p>
//             )}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
//               {section.fields.map((field) => (
//                 <div key={field.key}>
//                   <label className="block text-xs font-semibold text-slate-600 mb-2">
//                     {field.label}
//                   </label>
//                   {field.useDropdown ? (
//                     <div className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
//                       Select {field.label}
//                       <ChevronDown size={15} />
//                     </div>
//                   ) : (
//                     <div className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
//                       Enter {field.label}
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//       </div>

//       {showModal && (
//         <FieldModal
//           field={editingField}
//           onClose={() => {
//             setShowModal(false);
//             setEditingField(null);
//           }}
//           onSave={saveField}
//         />
//       )}
//     </div>
//   );
// }


// code ui //

import { useEffect, useMemo, useState } from "react";
import {
  Plus, Pencil, Trash2, Save, RotateCcw, X, ChevronDown,
  Settings2, Type, List, CheckCircle2, AlertCircle,
  GripVertical, Package, Search, Eye
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/settings/shipment-form`;

const defaultFields = [
  { key: "shipmentType", label: "Shipment Type", useDropdown: true, options: ["Export", "Import", "Re-export"] },
  { key: "shipmentMode", label: "Shipment Mode", useDropdown: true, options: ["Air", "Sea", "Road", "Rail"] },
  { key: "shipmentPurpose", label: "Shipment Purpose", useDropdown: true, options: ["Commercial", "Sample", "Personal"] },
  { key: "companyName", label: "Customer / Company Name", useDropdown: false, options: [] },
  { key: "contactPerson", label: "Contact Person", useDropdown: false, options: [] },
];

const defaultSection = {
  title: "Basic Shipment Details",
  description: "General shipment classification and exporter contact",
  fields: defaultFields,
};

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    role="switch"
    aria-checked={checked}
    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
      checked ? "bg-[#0D9488]" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
        checked ? "left-6" : "left-1"
      }`}
    />
  </button>
);

function FieldModal({ field, onClose, onSave }) {
  const [label, setLabel] = useState(field?.label || "");
  const [useDropdown, setUseDropdown] = useState(field?.useDropdown ?? true);
  const [options, setOptions] = useState(
    (field?.options || []).join("\n")
  );
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!label.trim()) {
      setError("Please enter a field name.");
      return;
    }

    const parsedOptions = options
      .split("\n")
      .map((item) => item.trim())
      .filter(Boolean);

    if (useDropdown && !parsedOptions.length) {
      setError("Add at least one dropdown option.");
      return;
    }

    onSave({
      ...field,
      key: field?.key || slugify(label),
      label: label.trim(),
      useDropdown,
      options: useDropdown ? [...new Set(parsedOptions)] : [],
    });
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 backdrop-blur-sm p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              {field ? "Edit Form Field" : "Add New Field"}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Configure how this field appears on the shipment form.
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-slate-100">
            <X size={19} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
              Field Label
            </label>
            <input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="e.g. Customer Name"
              className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none text-sm"
              autoFocus
            />
          </div>

          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                  useDropdown ? "bg-teal-50 text-[#0D9488]" : "bg-teal-50 text-teal-600"
                }`}>
                  {useDropdown ? <List size={19} /> : <Type size={19} />}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-800">Input Type</p>
                  <p className="text-xs text-slate-500">
                    {useDropdown ? "User selects from options" : "User enters a value"}
                  </p>
                </div>
              </div>
              <Toggle checked={useDropdown} onChange={setUseDropdown} />
            </div>

            <div className="mt-3 flex justify-between text-xs font-semibold">
              <span className={!useDropdown ? "text-teal-600" : "text-slate-400"}>
                Text Input
              </span>
              <span className={useDropdown ? "text-[#0D9488]" : "text-slate-400"}>
                Dropdown
              </span>
            </div>
          </div>

          {useDropdown && (
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Dropdown Options
              </label>
              <textarea
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                rows={5}
                placeholder={"Export\nImport\nDomestic"}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none text-sm resize-none"
              />
              <p className="text-xs text-slate-400 mt-1.5">
                Enter one option per line.
              </p>
            </div>
          )}

          {error && (
            <p className="text-sm text-red-600 flex items-center gap-2">
              <AlertCircle size={15} /> {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 text-sm font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-xl bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0A8981] shadow-lg shadow-teal-600/20"
            >
              {field ? "Update Field" : "Add Field"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ShipmentFormSettings() {
  const [section, setSection] = useState(defaultSection);
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState({ type: "", message: "" });

  const filteredFields = useMemo(
    () => section.fields.filter((field) =>
      field.label.toLowerCase().includes(search.toLowerCase())
    ),
    [section.fields, search]
  );

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice({ type: "", message: "" }), 3500);
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error("Unable to load shipment settings.");

      const result = await response.json();
      const savedSection = result.data?.sections?.[0];

      if (savedSection) {
        setSection({
          ...defaultSection,
          ...savedSection,
          fields: savedSection.fields || [],
        });
      }
    } catch (error) {
      console.error("Shipment settings fetch:", error);
      showNotice("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveField = (field) => {
    setSection((prev) => {
      const exists = prev.fields.some((item) => item.key === field.key);

      return {
        ...prev,
        fields: exists
          ? prev.fields.map((item) =>
              item.key === field.key ? field : item
            )
          : [...prev.fields, field],
      };
    });

    setShowModal(false);
    setEditingField(null);
  };

  const deleteField = (key) => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;

    setSection((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.key !== key),
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sections: [section],
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Failed to save settings.");
      }

      const savedSection = result.data?.sections?.[0];
      if (savedSection) setSection(savedSection);

      showNotice("success", "Shipment form settings saved successfully!");
    } catch (error) {
      console.error("Shipment settings save:", error);
      showNotice("error", error.message);
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all shipment form settings to default?")) return;

    setResetting(true);
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: "POST",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to reset settings.");
      }

      const savedSection = result.data?.sections?.[0];
      setSection(savedSection || defaultSection);
      showNotice("success", "Default settings restored successfully!");
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-transparent p-0">
      <div className="w-full space-y-5">

        {/* Settings parent already renders the teal gradient page header.
            Keep this section header light to avoid a duplicate banner. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-teal-100 bg-white px-5 py-5 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0D9488] border border-teal-100">
              <Package size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#0D9488]">Admin Configuration</p>
              <h2 className="text-lg sm:text-xl font-bold text-[#002259] mt-0.5">Shipment Form Settings</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Customize fields displayed on your shipment form.</p>
            </div>
          </div>
          <button type="button" onClick={handleSave} disabled={saving || loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A8981] shadow-sm transition disabled:opacity-50">
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Notifications */}
        {notice.message && (
          <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm border ${
            notice.type === "success"
              ? "bg-teal-50 border-teal-200 text-teal-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {notice.type === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
            {notice.message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Total Fields</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{section.fields.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Dropdown Fields</p>
            <p className="text-2xl font-bold text-[#0D9488] mt-1">
              {section.fields.filter((f) => f.useDropdown).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-500">Text Fields</p>
            <p className="text-2xl font-bold text-teal-600 mt-1">
              {section.fields.filter((f) => !f.useDropdown).length}
            </p>
          </div>
        </div>

        {/* Main Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Settings2 size={19} className="text-[#0D9488]" />
                  <h2 className="font-bold text-slate-900">Section Configuration</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage your shipment form section and its fields.
                </p>
              </div>
              <button
                onClick={() => {
                  setEditingField(null);
                  setShowModal(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0A8981] shadow-md shadow-teal-600/15"
              >
                <Plus size={17} /> Add New Field
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Section Title
                </label>
                <input
                  value={section.title}
                  onChange={(e) => setSection({ ...section, title: e.target.value })}
                  placeholder="Enter section title"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Section Description
                </label>
                <input
                  value={section.description || ""}
                  onChange={(e) => setSection({ ...section, description: e.target.value })}
                  placeholder="Enter a short description"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none text-sm"
                />
              </div>
            </div>
          </div>

          {/* Fields */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-bold text-slate-900">Field Management</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Configure the input type and available options.
                </p>
              </div>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fields..."
                  className="pl-9 pr-3 py-2.5 w-full sm:w-56 rounded-xl border border-slate-200 text-xs outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-sm text-slate-500">
                Loading shipment settings...
              </div>
            ) : filteredFields.length === 0 ? (
              <div className="py-14 text-center border border-dashed border-slate-200 rounded-xl">
                <Package className="mx-auto text-slate-300 mb-2" size={30} />
                <p className="text-sm font-semibold text-slate-700">No fields found</p>
                <p className="text-xs text-slate-400 mt-1">Add a new field to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFields.map((field, index) => (
                  <div
                    key={field.key}
                    className="group border border-slate-200 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                          <GripVertical size={17} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {field.label}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Field {String(index + 1).padStart(2, "0")} · {field.key}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          field.useDropdown
                            ? "bg-teal-50 text-[#087F79]"
                            : "bg-teal-50 text-teal-700"
                        }`}>
                          {field.useDropdown ? <List size={13} /> : <Type size={13} />}
                          {field.useDropdown ? "Dropdown" : "Text Input"}
                        </span>

                        <button
                          onClick={() => {
                            setEditingField(field);
                            setShowModal(true);
                          }}
                          title="Edit field"
                          className="p-2 rounded-lg text-slate-500 hover:text-[#0D9488] hover:bg-teal-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteField(field.key)}
                          title="Delete field"
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {field.useDropdown && (
                      <div className="mt-3 ml-12 flex flex-wrap gap-2">
                        {(field.options || []).map((option) => (
                          <span
                            key={option}
                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600"
                          >
                            {option}
                          </span>
                        ))}
                        {(!field.options || !field.options.length) && (
                          <span className="text-xs text-amber-600">No options configured</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Changes will apply to the shipment form after saving.
            </p>
            <button
              onClick={handleReset}
              disabled={resetting || loading}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <RotateCcw size={15} />
              {resetting ? "Resetting..." : "Reset To Default"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} className="text-[#0D9488]" />
            <h3 className="font-bold text-slate-900">Form Preview</h3>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
            <h4 className="text-sm font-bold text-slate-800">{section.title}</h4>
            {section.description && (
              <p className="text-xs text-slate-500 mt-1">{section.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {section.fields.filter((field) => field.enabled !== false).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    {field.label}
                  </label>
                  {field.useDropdown ? (
                    <div className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
                      Select {field.label}
                      <ChevronDown size={15} />
                    </div>
                  ) : (
                    <div className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
                      Enter {field.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {showModal && (
        <FieldModal
          field={editingField}
          onClose={() => {
            setShowModal(false);
            setEditingField(null);
          }}
          onSave={saveField}
        />
      )}
    </div>
  );
}