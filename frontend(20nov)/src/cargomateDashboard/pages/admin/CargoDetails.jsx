// // import { useState } from "react";
// // import { Package } from "lucide-react";

// // const fields = [
// //   ["productName", "Product Name"],
// //   ["hsCode", "HS Code"],
// //   ["packagingType", "Packaging Type"],
// //   ["totalPackages", "Total Packages"],
// //   ["netWeight", "Net Weight"],
// //   ["grossWeight", "Gross Weight"],
// //   ["volume", "Volume (CBM)"],
// //   ["cargoDescription", "Cargo Description"],
// //   ["dimensions", "Dimensions (Per Package)"],
// //   ["stackable", "Stackable"],
// //   ["fragile", "Fragile"],
// //   ["dg", "DG (Dangerous Goods)"],
// //   ["tempControl", "Temperature Control"],
// // ];

// // export default function CargoDetails() {
// //   const [editMode, setEditMode] = useState(false);
// //   const [data, setData] = useState({
// //     productName: "Almonds (Blanched)",
// //     hsCode: "0802.12.00",
// //     packagingType: "Cartons",
// //     totalPackages: "120",
// //     netWeight: "1500.00 KG",
// //     grossWeight: "1650.00 KG",
// //     volume: "3.250 CBM",
// //     cargoDescription: "Food Products",
// //     dimensions: "100*80*60 Cm",
// //     stackable: "Yes",
// //     fragile: "No",
// //     dg: "No",
// //     tempControl: "2-8 C",
// //   });

// //   const handleChange = (key) => (e) => setData({ ...data, [key]: e.target.value });

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     try {
// //       await fetch("/api/shipment/cargo-details", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(data),
// //       });
// //       setEditMode(false);
// //     } catch (err) {}
// //   };

// //   return (
// //     <form
// //       onSubmit={handleSubmit}
// //       className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
// //     >
// //       <div className="flex items-center justify-between mb-6 gap-3">
// //         <div className="flex items-center gap-3 min-w-0">
// //           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
// //             <Package className="w-6 h-6 text-blue-500" />
// //           </div>
// //           <div className="min-w-0">
// //             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Cargo Details</h2>
// //             <p className="text-sm text-gray-500 truncate">View and manage cargo Information</p>
// //           </div>
// //         </div>
// //         <button
// //           type="button"
// //           onClick={() => setEditMode((v) => !v)}
// //           className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
// //         >
// //           {editMode ? "Cancel" : "Edit Details"}
// //         </button>
// //       </div>

// //       <div className="grid sm:grid-cols-2 gap-4">
// //         {fields.map(([key, label]) => (
// //           <div key={key}>
// //             <p className="text-sm text-gray-900 font-medium mb-1">{label}</p>
// //             {editMode ? (
// //               <input
// //                 value={data[key]}
// //                 onChange={handleChange(key)}
// //                 className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600"
// //               />
// //             ) : (
// //               <p className="text-sm text-gray-500">{data[key]}</p>
// //             )}
// //           </div>
// //         ))}
// //       </div>

// //       {editMode && (
// //         <div className="flex justify-end mt-6">
// //           <button
// //             type="submit"
// //             className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
// //           >
// //             Save
// //           </button>
// //         </div>
// //       )}
// //     </form>
// //   );
// // }

// // mahima code //

// import { useEffect, useState } from "react";
// import {
//   Package, Pencil, Save, X, CheckCircle2, AlertCircle, Box, Scale,
//   Maximize2, ShieldAlert, Hash, Tag, FileText, Ruler, DollarSign,
// } from "lucide-react";
// import { updateShipment } from "../../api/ShipmentApi";

// const EMPTY_CARGO = {
//   productName: "",
//   productDescription: "",
//   category: "",
//   cargoType: "General",
//   quantity: "",
//   unit: "",
//   weight: "",
//   netWeight: "",
//   grossWeight: "",
//   volumetricWeight: "",
//   packages: "",
//   packingType: "",
//   unNumber: "",
//   packageMarks: "",
//   isDangerous: false,
//   isTemperatureControlled: false,
//   isStackable: false,
//   isFragile: false,
//   hasBattery: false,
//   isLithium: false,
//   dimensions: { length: "", width: "", height: "", unit: "CM" },
//   volumeCBM: "",
//   value: "",
//   currency: "INR",
// };

// const numericFields = [
//   "quantity", "weight", "netWeight", "grossWeight", "volumetricWeight",
//   "packages", "volumeCBM", "value",
// ];
// const booleanFields = [
//   "isDangerous", "isTemperatureControlled", "isStackable",
//   "isFragile", "hasBattery", "isLithium",
// ];

// const getInitialData = (shipment) => {
//   const record =
//     shipment?.data?.data ||
//     shipment?.data?.shipment ||
//     shipment?.data ||
//     shipment?.shipment ||
//     shipment ||
//     {};

//   const cargo =
//     record?.cargo ||
//     record?.shipmentInfo?.cargo ||
//     {};

//   // Empty string ko bhi missing value treat karega
//   const firstFilled = (...values) =>
//     values.find(
//       (value) =>
//         value !== undefined &&
//         value !== null &&
//         value !== ""
//     ) ?? "";

//   const hsCodeValue = firstFilled(
//     cargo.hsCodeText,
//     cargo.hsCode?.hsCode,
//     cargo.hsCode?.code,
//     typeof cargo.hsCode === "string" ? cargo.hsCode : ""
//   );

//   return {
//     ...EMPTY_CARGO,
//     ...cargo,

//     hsCodeText: hsCodeValue,

//     // WEIGHT
//     weight: firstFilled(
//       cargo.weight,
//       record.weight,
//       record.shipmentInfo?.weight
//     ),

//     netWeight: firstFilled(
//       cargo.netWeight,
//       record.netWeight
//     ),

//     grossWeight: firstFilled(
//       cargo.grossWeight,
//       record.grossWeight
//     ),

//     volumetricWeight: firstFilled(
//       cargo.volumetricWeight,
//       record.volumetricWeight
//     ),

//     // VOLUME
//     volumeCBM: firstFilled(
//       cargo.volumeCBM,
//       record.volumeCBM,
//       record.totalVolume,
//       record.shipmentInfo?.volume
//     ),

//     // CARGO VALUE
//     value: firstFilled(
//       cargo.value,
//       record.value,
//       record.invoice?.invoiceValue
//     ),

//     currency: firstFilled(
//       cargo.currency,
//       record.currency,
//       record.invoice?.currency,
//       "INR"
//     ),

//     dimensions: {
//       ...EMPTY_CARGO.dimensions,
//       ...(cargo.dimensions || {}),

//       length: cargo.dimensions?.length ?? "",
//       width: cargo.dimensions?.width ?? "",
//       height: cargo.dimensions?.height ?? "",
//       unit: cargo.dimensions?.unit || "CM",
//     },
//   };
// };

// const toNumberOrNull = (value) =>
//   value === "" || value === null || value === undefined ? null : Number(value);

// export default function CargoDetails({ shipment, shipmentId, onUpdated }) {
//   // Accept the ID from the prop, or derive it from the shipment object.
//   const shipmentRecord =
//     shipment?.data?.data || shipment?.data?.shipment || shipment?.data || shipment?.shipment || shipment;
//   const resolvedShipmentId =
//     shipmentId || shipmentRecord?._id || shipmentRecord?.id;
//   const [editMode, setEditMode] = useState(false);
//   const [data, setData] = useState(() => getInitialData(shipment));
//   const [savedData, setSavedData] = useState(() => getInitialData(shipment));
//   const [saving, setSaving] = useState(false);
//   const [toast, setToast] = useState(null);

//   useEffect(() => {
//     const initial = getInitialData(shipment);
//     setData(initial);
//     setSavedData(initial);
//   }, [shipment]);

//   const showToast = (type, message) => {
//     setToast({ type, message });
//     window.setTimeout(() => setToast(null), 4000);
//   };

//   const handleChange = (key) => (event) => {
//     const value = booleanFields.includes(key)
//       ? event.target.value === "true"
//       : event.target.value;
//     setData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleDimensionChange = (key) => (event) => {
//     setData((prev) => ({
//       ...prev,
//       dimensions: { ...prev.dimensions, [key]: event.target.value },
//     }));
//   };

//   const handleEdit = () => {
//     const latest = getInitialData(shipment);
//     setData(latest);
//     setSavedData(latest);
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     setData(savedData);
//     setEditMode(false);
//   };

//   const handleSubmit = async (event) => {
//     event?.preventDefault();
//     try {
//       setSaving(true);

//       const cargoPayload = {
//         hsCodeText: data.hsCodeText,
//         productName: data.productName,
//         productDescription: data.productDescription,
//         category: data.category,
//         cargoType: data.cargoType,
//         quantity: toNumberOrNull(data.quantity),
//         unit: data.unit,
//         weight: toNumberOrNull(data.weight),
//         netWeight: toNumberOrNull(data.netWeight),
//         grossWeight: toNumberOrNull(data.grossWeight),
//         volumetricWeight: toNumberOrNull(data.volumetricWeight),
//         packages: toNumberOrNull(data.packages),
//         packingType: data.packingType,
//         unNumber: data.unNumber,
//         packageMarks: data.packageMarks,
//         isDangerous: Boolean(data.isDangerous),
//         isTemperatureControlled: Boolean(data.isTemperatureControlled),
//         isStackable: Boolean(data.isStackable),
//         isFragile: Boolean(data.isFragile),
//         hasBattery: Boolean(data.hasBattery),
//         isLithium: Boolean(data.isLithium),
//         dimensions: {
//           length: toNumberOrNull(data.dimensions.length),
//           width: toNumberOrNull(data.dimensions.width),
//           height: toNumberOrNull(data.dimensions.height),
//           unit: data.dimensions.unit || "CM",
//         },
//         volumeCBM: toNumberOrNull(data.volumeCBM),
//         value: toNumberOrNull(data.value),
//         currency: data.currency,
//       };

//       if (!resolvedShipmentId || resolvedShipmentId === "undefined" || resolvedShipmentId === "null") {
//         throw new Error("Shipment ID is missing. Please pass shipmentId or a shipment object containing _id.");
//       }

//       const response = await updateShipment(resolvedShipmentId, { cargo: cargoPayload });
//       console.log("UPDATE API RESPONSE:", response.data);
// console.log("SAVED CARGO:", response.data?.data?.cargo);
//       const responseData = response?.data;

//       if (responseData?.status === 0 || responseData?.success === false) {
//         throw new Error(responseData?.message || "Unable to update cargo details.");
//       }

//       if (
//         responseData?.status !== 1 ||
//         responseData?.success !== true ||
//         !responseData?.data
//       ) {
//         throw new Error(
//           responseData?.message || "Cargo details were not confirmed as saved."
//         );
//       }
      
//       const refreshed = getInitialData(responseData.data);

//       setData(refreshed);
//       setSavedData(refreshed);
//       setEditMode(false);
      
//       if (onUpdated) {
//         await onUpdated();
//       }
      
//       showToast("success", "Cargo details updated successfully.");
//     } catch (error) {
//       console.error("Failed to update cargo:", error);
//       showToast(
//         "error",
//         error?.response?.data?.message || error?.message ||
//           "Failed to update cargo specifications."
//       );
//     } finally {
//       setSaving(false);
//     }
//   };

//   console.log("CargoDetails shipment:", shipment);
// console.log("CargoDetails shipmentId prop:", shipmentId);
// console.log("Resolved shipment ID:", resolvedShipmentId);

//   return (
//     <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-7 space-y-6">
//       {toast && (
//         <div className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border ${
//           toast.type === "success"
//             ? "bg-emerald-50 text-emerald-800 border-emerald-200"
//             : "bg-rose-50 text-rose-800 border-rose-200"
//         }`}>
//           <div className="flex items-center gap-2">
//             {toast.type === "success"
//               ? <CheckCircle2 size={16} className="text-emerald-600" />
//               : <AlertCircle size={16} className="text-rose-600" />}
//             <span>{toast.message}</span>
//           </div>
//           <button type="button" onClick={() => setToast(null)} aria-label="Close notification">
//             <X size={14} />
//           </button>
//         </div>
//       )}

//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
//         <div className="flex items-center gap-3.5 min-w-0">
//           <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
//             <Package size={20} />
//           </div>
//           <div>
//             <div className="flex items-center gap-2">
//               <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Cargo Specifications & Properties</h2>
//               {editMode && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">Editing Mode</span>}
//             </div>
//             <p className="text-xs text-slate-500 mt-0.5">Product, quantity, weight, dimensions, value and cargo safety declarations.</p>
//           </div>
//         </div>
//         <div className="flex items-center gap-2 shrink-0">
//           {!editMode ? (
//             <button type="button" onClick={handleEdit} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-700 text-xs font-bold hover:bg-indigo-100">
//               <Pencil size={13} /> Edit Details
//             </button>
//           ) : (
//             <>
//               <button type="button" onClick={handleCancel} disabled={saving} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60">Cancel</button>
//               <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-60">
//                 <Save size={13} /> {saving ? "Saving..." : "Save Changes"}
//               </button>
//             </>
//           )}
//         </div>
//       </div>

//       <SectionCard title="Product Information" icon={Box}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <TextField label="Product Name" value={data.productName} editMode={editMode} onChange={handleChange("productName")} />
//           <TextField label="Product Category" value={data.category} editMode={editMode} onChange={handleChange("category")} />
//           <SelectField label="Cargo Type" value={data.cargoType} editMode={editMode} onChange={handleChange("cargoType")} options={["General", "Dangerous", "Perishable", "Live"]} />
//           <TextField label="HS Code" value={data.hsCodeText} editMode={editMode} onChange={handleChange("hsCodeText")} placeholder="Enter HS Code manually" />
//           <TextField label="Quantity" value={data.quantity} editMode={editMode} onChange={handleChange("quantity")} type="number" />
//           <TextField label="Unit" value={data.unit} editMode={editMode} onChange={handleChange("unit")} placeholder="e.g. Pieces, Cartons, Kg" />
//           <div className="sm:col-span-2 lg:col-span-3">
//             <TextField label="Product Description" value={data.productDescription} editMode={editMode} onChange={handleChange("productDescription")} multiline />
//           </div>
//         </div>
//         <p className="text-[11px] text-slate-400">Enter the HS Code manually. It is saved as text.</p>
//       </SectionCard>

//       <SectionCard title="Weight & Packaging Specifications" icon={Scale}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <TextField label="Weight (Kg)" value={data.weight} editMode={editMode} onChange={handleChange("weight")} type="number" />
//           <TextField label="Net Weight (Kg)" value={data.netWeight} editMode={editMode} onChange={handleChange("netWeight")} type="number" />
//           <TextField label="Gross Weight (Kg)" value={data.grossWeight} editMode={editMode} onChange={handleChange("grossWeight")} type="number" />
//           <TextField label="Volumetric Weight" value={data.volumetricWeight} editMode={editMode} onChange={handleChange("volumetricWeight")} type="number" />
//           <TextField label="Number of Packages" value={data.packages} editMode={editMode} onChange={handleChange("packages")} type="number" />
//           <TextField label="Packing Type" value={data.packingType} editMode={editMode} onChange={handleChange("packingType")} />
//           <TextField label="Volume (CBM)" value={data.volumeCBM} editMode={editMode} onChange={handleChange("volumeCBM")} type="number" />
//         </div>
//       </SectionCard>

//       <SectionCard title="Dimensions (L × W × H)" icon={Maximize2}>
//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//           <TextField label="Length" value={data.dimensions.length} editMode={editMode} onChange={handleDimensionChange("length")} type="number" />
//           <TextField label="Width" value={data.dimensions.width} editMode={editMode} onChange={handleDimensionChange("width")} type="number" />
//           <TextField label="Height" value={data.dimensions.height} editMode={editMode} onChange={handleDimensionChange("height")} type="number" />
//           <SelectField label="Dimension Unit" value={data.dimensions.unit} editMode={editMode} onChange={handleDimensionChange("unit")} options={["CM", "INCH"]} />
//         </div>
//       </SectionCard>

//       <SectionCard title="Cargo Value & Declaration" icon={DollarSign}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//           <TextField label="Cargo Value" value={data.value} editMode={editMode} onChange={handleChange("value")} type="number" />
//           <SelectField label="Currency" value={data.currency} editMode={editMode} onChange={handleChange("currency")} options={["INR", "USD", "EUR", "GBP", "SGD", "AED"]} />
//           <TextField label="UN Number (if Dangerous Goods)" value={data.unNumber} editMode={editMode} onChange={handleChange("unNumber")} />
//           <div className="sm:col-span-2 lg:col-span-3">
//             <TextField label="Package Marks & Numbers" value={data.packageMarks} editMode={editMode} onChange={handleChange("packageMarks")} multiline />
//           </div>
//         </div>
//       </SectionCard>

//       <SectionCard title="Handling, Safety & Dangerous Goods (DG)" icon={ShieldAlert}>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
//           <BooleanField label="Dangerous Goods (DG)" value={data.isDangerous} editMode={editMode} onChange={handleChange("isDangerous")} />
//           <BooleanField label="Temperature Controlled" value={data.isTemperatureControlled} editMode={editMode} onChange={handleChange("isTemperatureControlled")} />
//           <BooleanField label="Stackable" value={data.isStackable} editMode={editMode} onChange={handleChange("isStackable")} />
//           <BooleanField label="Fragile" value={data.isFragile} editMode={editMode} onChange={handleChange("isFragile")} />
//           <BooleanField label="Battery Included" value={data.hasBattery} editMode={editMode} onChange={handleChange("hasBattery")} />
//           <BooleanField label="Lithium Battery" value={data.isLithium} editMode={editMode} onChange={handleChange("isLithium")} />
//         </div>
//       </SectionCard>

//       {editMode && (
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
//           <span className="text-xs text-slate-400">Verify cargo weights, dimensions and dangerous goods declarations before saving.</span>
//           <div className="flex items-center gap-2.5">
//             <button type="button" onClick={handleCancel} disabled={saving} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60">Discard Changes</button>
//             <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-60">
//               <Save size={13} /> {saving ? "Saving..." : "Save Changes"}
//             </button>
//           </div>
//         </div>
//       )}
//     </form>
//   );
// }

// function SectionCard({ title, icon: Icon, children }) {
//   return (
//     <section className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 space-y-4">
//       <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
//         <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center"><Icon size={14} /></div>
//         <h3 className="text-sm font-bold text-slate-900">{title}</h3>
//       </div>
//       {children}
//     </section>
//   );
// }

// function TextField({ label, value, editMode, onChange, type = "text", placeholder = "—", multiline = false }) {
//   const cls = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100/70 disabled:text-slate-600";
//   return (
//     <div className="w-full">
//       <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">{label}</label>
//       {editMode ? (
//         multiline
//           ? <textarea rows={3} value={value ?? ""} onChange={onChange} placeholder={placeholder} className={`${cls} resize-y`} />
//           : <input type={type} step={type === "number" ? "any" : undefined} value={value ?? ""} onChange={onChange} placeholder={placeholder} className={cls} />
//       ) : (
//         <div className="min-h-[38px] rounded-xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 whitespace-pre-wrap break-words">{value === "" || value === null || value === undefined ? "—" : value}</div>
//       )}
//     </div>
//   );
// }

// function SelectField({ label, value, editMode, onChange, options }) {
//   return (
//     <div className="w-full">
//       <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">{label}</label>
//       {editMode ? (
//         <select value={value ?? ""} onChange={onChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10">
//           {options.map((option) => <option key={option} value={option}>{option}</option>)}
//         </select>
//       ) : (
//         <div className="min-h-[38px] rounded-xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800">{value || "—"}</div>
//       )}
//     </div>
//   );
// }

// function BooleanField({ label, value, editMode, onChange }) {
//   return (
//     <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 flex items-center justify-between gap-3">
//       <span className="text-xs font-semibold text-slate-700">{label}</span>
//       {editMode ? (
//         <select value={String(Boolean(value))} onChange={onChange} className="min-w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none">
//           <option value="true">Yes</option>
//           <option value="false">No</option>
//         </select>
//       ) : (
//         <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
//           value ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
//         }`}>{value ? "Yes" : "No"}</span>
//       )}
//     </div>
//   );
// }


// mahima code //
import { useEffect, useState } from "react";
import {
  Package, Pencil, Save, X, CheckCircle2, AlertCircle, Box,
  Maximize2, ShieldAlert, Hash, Tag, FileText, Ruler, DollarSign,
} from "lucide-react";
import { updateShipment } from "../../api/ShipmentApi";

const EMPTY_CARGO = {
  productName: "",
  productDescription: "",
  category: "",
  cargoType: "General",
  quantity: "",
  unit: "",
  weight: "",
  netWeight: "",
  grossWeight: "",
  volumetricWeight: "",
  packages: "",
  packingType: "",
  unNumber: "",
  packageMarks: "",
  isDangerous: false,
  isTemperatureControlled: false,
  isStackable: false,
  isFragile: false,
  hasBattery: false,
  isLithium: false,
  dimensions: { length: "", width: "", height: "", unit: "CM" },
  volumeCBM: "",
  value: "",
  currency: "INR",
};

const numericFields = [
  "quantity", "packages", "value",
];
const booleanFields = [
  "isDangerous", "isTemperatureControlled", "isStackable",
  "isFragile", "hasBattery", "isLithium",
];

const getInitialData = (shipment) => {
  const record =
    shipment?.data?.data ||
    shipment?.data?.shipment ||
    shipment?.data ||
    shipment?.shipment ||
    shipment ||
    {};

  const cargo =
    record?.cargo ||
    record?.shipmentInfo?.cargo ||
    {};

  // Empty string ko bhi missing value treat karega
  const firstFilled = (...values) =>
    values.find(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    ) ?? "";

  const hsCodeValue = firstFilled(
    cargo.hsCodeText,
    cargo.hsCode?.hsCode,
    cargo.hsCode?.code,
    typeof cargo.hsCode === "string" ? cargo.hsCode : ""
  );

  return {
    ...EMPTY_CARGO,
    ...cargo,

    hsCodeText: hsCodeValue,

    // CARGO VALUE
    value: firstFilled(
      cargo.value,
      record.amount,
      record.value,
      record.invoice?.invoiceValue
    ),

    currency: firstFilled(
      cargo.currency,
      record.currency,
      record.invoice?.currency,
      "INR"
    ),

    dimensions: {
      ...EMPTY_CARGO.dimensions,
      ...(cargo.dimensions || {}),

      length: cargo.dimensions?.length ?? "",
      width: cargo.dimensions?.width ?? "",
      height: cargo.dimensions?.height ?? "",
      unit: cargo.dimensions?.unit || "CM",
    },
  };
};

const toNumberOrNull = (value) =>
  value === "" || value === null || value === undefined ? null : Number(value);

export default function CargoDetails({ shipment, shipmentId, onUpdated }) {
  // Accept the ID from the prop, or derive it from the shipment object.
  const shipmentRecord =
    shipment?.data?.data || shipment?.data?.shipment || shipment?.data || shipment?.shipment || shipment;
  const resolvedShipmentId =
    shipmentId || shipmentRecord?._id || shipmentRecord?.id;
  const [editMode, setEditMode] = useState(false);
  const [data, setData] = useState(() => getInitialData(shipment));
  const [savedData, setSavedData] = useState(() => getInitialData(shipment));
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    const initial = getInitialData(shipment);
    setData(initial);
    setSavedData(initial);
  }, [shipment]);

  const showToast = (type, message) => {
    setToast({ type, message });
    window.setTimeout(() => setToast(null), 4000);
  };

  const handleChange = (key) => (event) => {
    const value = booleanFields.includes(key)
      ? event.target.value === "true"
      : event.target.value;
    setData((prev) => ({ ...prev, [key]: value }));
  };

  const handleDimensionChange = (key) => (event) => {
    setData((prev) => ({
      ...prev,
      dimensions: { ...prev.dimensions, [key]: event.target.value },
    }));
  };

  const handleEdit = () => {
    const latest = getInitialData(shipment);
    setData(latest);
    setSavedData(latest);
    setEditMode(true);
  };

  const handleCancel = () => {
    setData(savedData);
    setEditMode(false);
  };

  const handleSubmit = async (event) => {
    event?.preventDefault();
    try {
      setSaving(true);

      const cargoPayload = {
        hsCodeText: data.hsCodeText,
        productName: data.productName,
        productDescription: data.productDescription,
        category: data.category,
        cargoType: data.cargoType,
        quantity: toNumberOrNull(data.quantity),
        unit: data.unit,
        packages: toNumberOrNull(data.packages),
        packingType: data.packingType,
        unNumber: data.unNumber,
        packageMarks: data.packageMarks,
        isDangerous: Boolean(data.isDangerous),
        isTemperatureControlled: Boolean(data.isTemperatureControlled),
        isStackable: Boolean(data.isStackable),
        isFragile: Boolean(data.isFragile),
        hasBattery: Boolean(data.hasBattery),
        isLithium: Boolean(data.isLithium),
        dimensions: {
          length: toNumberOrNull(data.dimensions.length),
          width: toNumberOrNull(data.dimensions.width),
          height: toNumberOrNull(data.dimensions.height),
          unit: data.dimensions.unit || "CM",
        },
        value: toNumberOrNull(data.value),
        currency: data.currency,
      };

      if (!resolvedShipmentId || resolvedShipmentId === "undefined" || resolvedShipmentId === "null") {
        throw new Error("Shipment ID is missing. Please pass shipmentId or a shipment object containing _id.");
      }

      const response = await updateShipment(resolvedShipmentId, { cargo: cargoPayload });
      console.log("UPDATE API RESPONSE:", response.data);
console.log("SAVED CARGO:", response.data?.data?.cargo);
      const responseData = response?.data;

      if (responseData?.status === 0 || responseData?.success === false) {
        throw new Error(responseData?.message || "Unable to update cargo details.");
      }

      if (
        responseData?.status !== 1 ||
        responseData?.success !== true ||
        !responseData?.data
      ) {
        throw new Error(
          responseData?.message || "Cargo details were not confirmed as saved."
        );
      }
      
      const refreshed = getInitialData(responseData.data);

      setData(refreshed);
      setSavedData(refreshed);
      setEditMode(false);
      
      if (onUpdated) {
        await onUpdated();
      }
      
      showToast("success", "Cargo details updated successfully.");
    } catch (error) {
      console.error("Failed to update cargo:", error);
      showToast(
        "error",
        error?.response?.data?.message || error?.message ||
          "Failed to update cargo specifications."
      );
    } finally {
      setSaving(false);
    }
  };

  console.log("CargoDetails shipment:", shipment);
console.log("CargoDetails shipmentId prop:", shipmentId);
console.log("Resolved shipment ID:", resolvedShipmentId);

  return (
    <form onSubmit={handleSubmit} className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-7 space-y-6">
      {toast && (
        <div className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border ${
          toast.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-rose-50 text-rose-800 border-rose-200"
        }`}>
          <div className="flex items-center gap-2">
            {toast.type === "success"
              ? <CheckCircle2 size={16} className="text-emerald-600" />
              : <AlertCircle size={16} className="text-rose-600" />}
            <span>{toast.message}</span>
          </div>
          <button type="button" onClick={() => setToast(null)} aria-label="Close notification">
            <X size={14} />
          </button>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Package size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">Cargo Specifications & Properties</h2>
              {editMode && <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">Editing Mode</span>}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">Product, quantity, weight, dimensions, value and cargo safety declarations.</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {!editMode ? (
            <button type="button" onClick={handleEdit} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-700 text-xs font-bold hover:bg-indigo-100">
              <Pencil size={13} /> Edit Details
            </button>
          ) : (
            <>
              <button type="button" onClick={handleCancel} disabled={saving} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60">Cancel</button>
              <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-60">
                <Save size={13} /> {saving ? "Saving..." : "Save Changes"}
              </button>
            </>
          )}
        </div>
      </div>

      <SectionCard title="Product Information" icon={Box}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="Product Name" value={data.productName} editMode={editMode} onChange={handleChange("productName")} />
          <TextField label="Product Category" value={data.category} editMode={editMode} onChange={handleChange("category")} />
          <SelectField label="Cargo Type" value={data.cargoType} editMode={editMode} onChange={handleChange("cargoType")} options={["General", "Dangerous", "Perishable", "Live"]} />
          <TextField label="HS Code" value={data.hsCodeText} editMode={editMode} onChange={handleChange("hsCodeText")} placeholder="Enter HS Code manually" />
          <TextField label="Quantity" value={data.quantity} editMode={editMode} onChange={handleChange("quantity")} type="number" />
          <TextField label="Unit" value={data.unit} editMode={editMode} onChange={handleChange("unit")} placeholder="e.g. Pieces, Cartons, Kg" />
          <div className="sm:col-span-2 lg:col-span-3">
            <TextField label="Product Description" value={data.productDescription} editMode={editMode} onChange={handleChange("productDescription")} multiline />
          </div>
        </div>
        <p className="text-[11px] text-slate-400">Enter the HS Code manually. It is saved as text.</p>
      </SectionCard>

      <SectionCard title="Packaging Specifications" icon={Box}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="Number of Packages" value={data.packages} editMode={editMode} onChange={handleChange("packages")} type="number" />
          <TextField label="Packing Type" value={data.packingType} editMode={editMode} onChange={handleChange("packingType")} />
        </div>
      </SectionCard>

      <SectionCard title="Dimensions (L × W × H)" icon={Maximize2}>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <TextField label="Length" value={data.dimensions.length} editMode={editMode} onChange={handleDimensionChange("length")} type="number" />
          <TextField label="Width" value={data.dimensions.width} editMode={editMode} onChange={handleDimensionChange("width")} type="number" />
          <TextField label="Height" value={data.dimensions.height} editMode={editMode} onChange={handleDimensionChange("height")} type="number" />
          <SelectField label="Dimension Unit" value={data.dimensions.unit} editMode={editMode} onChange={handleDimensionChange("unit")} options={["CM", "INCH"]} />
        </div>
      </SectionCard>

      <SectionCard title="Cargo Value & Declaration" icon={DollarSign}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <TextField label="Cargo Value" value={data.value} editMode={editMode} onChange={handleChange("value")} type="number" />
          <SelectField label="Currency" value={data.currency} editMode={editMode} onChange={handleChange("currency")} options={["INR", "USD", "EUR", "GBP", "SGD", "AED"]} />
          <TextField label="UN Number (if Dangerous Goods)" value={data.unNumber} editMode={editMode} onChange={handleChange("unNumber")} />
          <div className="sm:col-span-2 lg:col-span-3">
            <TextField label="Package Marks & Numbers" value={data.packageMarks} editMode={editMode} onChange={handleChange("packageMarks")} multiline />
          </div>
        </div>
      </SectionCard>

      <SectionCard title="Handling, Safety & Dangerous Goods (DG)" icon={ShieldAlert}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          <BooleanField label="Dangerous Goods (DG)" value={data.isDangerous} editMode={editMode} onChange={handleChange("isDangerous")} />
          <BooleanField label="Temperature Controlled" value={data.isTemperatureControlled} editMode={editMode} onChange={handleChange("isTemperatureControlled")} />
          <BooleanField label="Stackable" value={data.isStackable} editMode={editMode} onChange={handleChange("isStackable")} />
          <BooleanField label="Fragile" value={data.isFragile} editMode={editMode} onChange={handleChange("isFragile")} />
          <BooleanField label="Battery Included" value={data.hasBattery} editMode={editMode} onChange={handleChange("hasBattery")} />
          <BooleanField label="Lithium Battery" value={data.isLithium} editMode={editMode} onChange={handleChange("isLithium")} />
        </div>
      </SectionCard>

      {editMode && (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">Verify cargo weights, dimensions and dangerous goods declarations before saving.</span>
          <div className="flex items-center gap-2.5">
            <button type="button" onClick={handleCancel} disabled={saving} className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 disabled:opacity-60">Discard Changes</button>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 disabled:opacity-60">
              <Save size={13} /> {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function SectionCard({ title, icon: Icon, children }) {
  return (
    <section className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-5 space-y-4">
      <div className="flex items-center gap-2 pb-3 border-b border-slate-200/60">
        <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center"><Icon size={14} /></div>
        <h3 className="text-sm font-bold text-slate-900">{title}</h3>
      </div>
      {children}
    </section>
  );
}

function TextField({ label, value, editMode, onChange, type = "text", placeholder = "—", multiline = false }) {
  const cls = "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100/70 disabled:text-slate-600";
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">{label}</label>
      {editMode ? (
        multiline
          ? <textarea rows={3} value={value ?? ""} onChange={onChange} placeholder={placeholder} className={`${cls} resize-y`} />
          : <input type={type} step={type === "number" ? "any" : undefined} value={value ?? ""} onChange={onChange} placeholder={placeholder} className={cls} />
      ) : (
        <div className="min-h-[38px] rounded-xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800 whitespace-pre-wrap break-words">{value === "" || value === null || value === undefined ? "—" : value}</div>
      )}
    </div>
  );
}

function SelectField({ label, value, editMode, onChange, options }) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">{label}</label>
      {editMode ? (
        <select value={value ?? ""} onChange={onChange} className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-900 focus:border-indigo-500 focus:outline-none focus:ring-4 focus:ring-indigo-500/10">
          {options.map((option) => <option key={option} value={option}>{option}</option>)}
        </select>
      ) : (
        <div className="min-h-[38px] rounded-xl border border-slate-200/70 bg-white px-3.5 py-2.5 text-xs font-bold text-slate-800">{value || "—"}</div>
      )}
    </div>
  );
}

function BooleanField({ label, value, editMode, onChange }) {
  return (
    <div className="rounded-xl border border-slate-200/70 bg-white p-3.5 flex items-center justify-between gap-3">
      <span className="text-xs font-semibold text-slate-700">{label}</span>
      {editMode ? (
        <select value={String(Boolean(value))} onChange={onChange} className="min-w-20 rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs font-bold text-slate-800 focus:border-indigo-500 focus:outline-none">
          <option value="true">Yes</option>
          <option value="false">No</option>
        </select>
      ) : (
        <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${
          value ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-slate-100 text-slate-600 border-slate-200"
        }`}>{value ? "Yes" : "No"}</span>
      )}
    </div>
  );
}