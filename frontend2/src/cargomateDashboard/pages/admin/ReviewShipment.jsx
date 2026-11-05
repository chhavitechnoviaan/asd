// import { useState } from "react";
// import {
//   MapPin,
//   Pencil,
//   FileText,
//   FileSignature,
//   Share2,
//   RefreshCcw,
// } from "lucide-react";
// import {
//   FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
//   FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
// } from "react-icons/fa6";
// const tabs = ["Shipment Details", "Parties & Contacts", "Cargo Details", "Documents", "Charges"];
// import PartiesContact from "./Parties&Contact"
// import CargoDetails from "./CargoDetails"
// import Documents from "./Documents"
// import Charges from "./Charges"
// import ShipmentDetails from "./ShipmentDetails"
// import Quotation from "./Quotation"
// import CreateNewInvoice from "./CreateNewInvoice";
// const actions = [
//   { icon: Pencil, bg: "bg-purple-50", color: "text-purple-600", title: "Edit Shipment", desc: "Make changes to shipment details." },
//   { icon: FileSignature, bg: "bg-blue-50", color: "text-blue-600", title: "Create quotation", desc: "Generate and share quotation",},
//   // { icon: Share2, bg: "bg-orange-50", color: "text-orange-500", title: "Share Quotation", desc: "Share quotation with client." },
//   { icon: RefreshCcw, bg: "bg-blue-50", color: "text-blue-500", title: "Change Status", desc: "Change Shipment status." },
//     { icon: FileText, bg: "bg-green-50", color: "text-green-600", title: "Create Invoice", desc: "Create invoice for this shipment." },

// ];

// export default function ReviewShipment({onClose}) {
//   const [activeTab, setActiveTab] = useState("Shipment Details");
//   const [viewShipmentDetail, setViewShipmentDetail] = useState(false)
//   const [showQuotationModal, setShowQuotationModal] = useState(false);
//   const [editBasicInfo, setEditBasicInfo] = useState(false);
//   const [newInvoice, setNewInvoice] = useState(false)
//   const [basicInfo, setBasicInfo] = useState({
//   shipmentType: "Export",
//   transportMode: "Sea",
//   incoterm: "FOB",
//   priority: "Medium",
//   referenceNo: "REF-2025-789",
//   bookingNo: "BK-4587",
//   etd: "25 May, 2025",
//   eta: "05 June, 2025",
// });

// const initialRoute = {
//   origin: "Nhava Sheva Port,India",
//   destination: "Rotterdam Port, Netherlands",
//   placeOfReceipt: "Indore, Madhya Pradesh",
//   finalDelivery: "Rotterdam Warehouse,NL",
// };
// const [route, setRoute] = useState(initialRoute);
// const [originalRoute, setOriginalRoute] = useState(initialRoute);
// const [editRoute, setEditRoute] = useState(false);

// const handleBasicInfoChange = (key) => (e) => {
//   setBasicInfo((prev) => ({
//     ...prev,
//     [key]: e.target.value,
//   }));
// };

// const saveBaseInfo = () => {

//             try {
//               // API call yaha kar sakte ho
//               // await fetch("/api/shipment/basic-info", {
//               //   method: "PUT",
//               //   headers: {
//               //     "Content-Type": "application/json",
//               //   },
//               //   body: JSON.stringify(basicInfo),
//               // });

//               setEditBasicInfo(false);
//             } catch (error) {
//               console.error("Failed to save basic information", error);
//             }
          
// }
//   const handleProceed = async () => {
//     try {
//       await fetch("/api/shipments/SHP-250520-0001/proceed", { method: "POST" });
//     } catch (err) {}
//   };

//   const handleRouteChange = (key) => (e) => {
//   setRoute((prev) => ({
//     ...prev,
//     [key]: e.target.value,
//   }));
// };

// const handleRouteEdit = () => {
//   setOriginalRoute(route);
//   setEditRoute(true);
// };

// const handleRouteCancel = () => {
//   setRoute(originalRoute);
//   setEditRoute(false);
// };

// const handleRouteSave = async () => {
//   try {
//     // API call yaha kar sakte ho
//     // await fetch("/api/shipment/route", {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(route),
//     // });

//     setOriginalRoute(route);
//     setEditRoute(false);
//   } catch (error) {
//     console.error("Failed to save route", error);
//   }
// };

// const initialCargo = {
//   productName: "Allnonds (Blached)",
//   hsCode: "0802.12.00",
//   packagingType: "Cartons",
//   totalPackages: "120",
//   netWeight: "1500.00 KG",
//   grossWeight: "1650.00 KG",
//   volume: "3.250 CBM",
//   cargoDescription: "Food Products",
// };

// const [cargo, setCargo] = useState(initialCargo);
// const [originalCargo, setOriginalCargo] = useState(initialCargo);
// const [editCargo, setEditCargo] = useState(false);

// const handleCargoChange = (key) => (e) => {
//   setCargo((prev) => ({
//     ...prev,
//     [key]: e.target.value,
//   }));
// };

// const handleCargoEdit = () => {
//   setOriginalCargo(cargo);
//   setEditCargo(true);
// };

// const handleCargoCancel = () => {
//   setCargo(originalCargo);
//   setEditCargo(false);
// };

// const handleCargoSave = async () => {
//   try {
//     // API call yaha kar sakte ho
//     // await fetch("/api/shipment/cargo-information", {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(cargo),
//     // });

//     setOriginalCargo(cargo);
//     setEditCargo(false);
//   } catch (error) {
//     console.error("Failed to save cargo information", error);
//   }
// };

// const initialAdditionalInfo = {
//   specialInstructions: "Handle with care, keep away from moisture",
//   insuranceRequired: "Yes",
//   inspectionRequired: "Yes",
//   remarks: "Please ensure time delivery",
// };

// const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo);
// const [originalAdditionalInfo, setOriginalAdditionalInfo] =
//   useState(initialAdditionalInfo);
// const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);

// const handleAdditionalInfoChange = (key) => (e) => {
//   setAdditionalInfo((prev) => ({
//     ...prev,
//     [key]: e.target.value,
//   }));
// };

// const handleAdditionalInfoEdit = () => {
//   setOriginalAdditionalInfo(additionalInfo);
//   setEditAdditionalInfo(true);
// };

// const handleAdditionalInfoCancel = () => {
//   setAdditionalInfo(originalAdditionalInfo);
//   setEditAdditionalInfo(false);
// };

// const handleAdditionalInfoSave = async () => {
//   try {
//     // API call yaha kar sakte ho
//     // await fetch("/api/shipment/additional-information", {
//     //   method: "PUT",
//     //   headers: {
//     //     "Content-Type": "application/json",
//     //   },
//     //   body: JSON.stringify(additionalInfo),
//     // });

//     setOriginalAdditionalInfo(additionalInfo);
//     setEditAdditionalInfo(false);
//   } catch (error) {
//     console.error("Failed to save additional information", error);
//   }
// };

//   return (
//   <div className="fixed inset-0 z-30 flex items-center justify-center bg-black/50  ">
//    {!viewShipmentDetail && (  
//     <div className="w-full max-h-[90vh] overflow-y-auto hide-scrollbar ">
    
//     <div className="w-full max-w-7xl mx-auto grid lg:grid-cols-[70%_30%] gap-4">
//       <div className=" bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//         <div className="flex justify-between items-start"> 
//         <div className="flex items-center gap-3 mb-4">
//           <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
//             <MapPin className="w-5 h-5 text-purple-600" />
//           </div>
//           <div>
//             <h2 className="text-xl font-bold text-gray-900">Review Shipment</h2>
//             <p className="text-sm text-gray-500">Review, edit shipment details, create invoice or share quotation.</p>
//           </div>
//         </div>
//             <div> <button onClick={onClose}> <FaXmark className="text-lg"/></button></div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 border border-gray-100 rounded-lg p-3 mb-4 text-xs">
//           <div>
//             <p className="text-gray-400">Shipment ID</p>
//             <p className="font-semibold text-gray-900">SHP-250520-0001</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Submitted By</p>
//             <p className="font-semibold text-gray-900">Aarav Sharma</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Company</p>
//             <p className="font-semibold text-gray-900">ABC Pvt. Ltd.</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Submitted On</p>
//             <p className="font-semibold text-gray-900">20 May 2025, 10:30 PM</p>
//           </div>
//           <div>
//             <p className="text-gray-400">Current Status</p>
//             <p className="font-semibold text-orange-500">Under Review</p>
//           </div>
//         </div>

//         <div className="flex gap-4 overflow-x-auto border-b border-gray-200 mb-4">
//           {tabs.map((tab, i) => (
//             <button
//               key={i}
//               onClick={() => setActiveTab(tab)}
//               className={`whitespace-nowrap text-sm pb-2 border-b-2 ${
//                 activeTab === tab
//                   ? "text-purple-600 border-purple-600 font-medium"
//                   : "text-gray-500 border-transparent"
//               }`}
//             >
//               {tab}
//             </button>
//           ))}
//         </div>

//         {activeTab === "Shipment Details" && (
//           <div className="space-y-4">
//             <div className="border border-gray-300 rounded-lg   ">
//              <div className="border border-gray-100 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-3">
//               <p className="font-semibold text-gray-900 text-sm">
//                 Basic Information
//               </p>

//               {!editBasicInfo ? (
//                 <button
//                   type="button"
//                   onClick={() => setEditBasicInfo(true)}
//                   className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//                 >
//                   Edit Section
//                 </button>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={() => setEditBasicInfo(false)}
//                     className="text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     onClick={saveBaseInfo}
//                     className="text-xs text-white bg-blue-600 rounded-lg px-3 py-1.5"
//                   >
//                     Save
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

//               {/* Shipment Type */}
//               <div>
//                 <p className="text-xs text-gray-400">Shipment Type</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.shipmentType}
//                     onChange={handleBasicInfoChange("shipmentType")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.shipmentType}
//                   </p>
//                 )}
//               </div>

//               {/* Mode of Transport */}
//               <div>
//                 <p className="text-xs text-gray-400">Mode of Transport</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.transportMode}
//                     onChange={handleBasicInfoChange("transportMode")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.transportMode}
//                   </p>
//                 )}
//               </div>

//               {/* Incoterm */}
//               <div>
//                 <p className="text-xs text-gray-400">Incoterm</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.incoterm}
//                     onChange={handleBasicInfoChange("incoterm")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.incoterm}
//                   </p>
//                 )}
//               </div>

//               {/* Priority */}
//               <div>
//                 <p className="text-xs text-gray-400">Priority</p>

//                 {editBasicInfo ? (
//                   <select
//                     value={basicInfo.priority}
//                     onChange={handleBasicInfoChange("priority")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 ) : (
//                   <p className="font-medium text-orange-500">
//                     {basicInfo.priority}
//                   </p>
//                 )}
//               </div>

//               {/* Reference No */}
//               <div>
//                 <p className="text-xs text-gray-400">Reference No.</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.referenceNo}
//                     onChange={handleBasicInfoChange("referenceNo")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.referenceNo}
//                   </p>
//                 )}
//               </div>

//               {/* Booking No */}
//               <div>
//                 <p className="text-xs text-gray-400">Booking No.</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.bookingNo}
//                     onChange={handleBasicInfoChange("bookingNo")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.bookingNo}
//                   </p>
//                 )}
//               </div>

//               {/* ETD */}
//               <div>
//                 <p className="text-xs text-gray-400">ETD (expected)</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.etd}
//                     onChange={handleBasicInfoChange("etd")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.etd}
//                   </p>
//                 )}
//               </div>

//               {/* ETA */}
//               <div>
//                 <p className="text-xs text-gray-400">ETA (expected)</p>

//                 {editBasicInfo ? (
//                   <input
//                     value={basicInfo.eta}
//                     onChange={handleBasicInfoChange("eta")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {basicInfo.eta}
//                   </p>
//                 )}
//               </div>

//             </div>
//           </div>
//             </div>

//           <div className="border border-gray-300 rounded-lg p-4">
//   <div className="flex items-center justify-between mb-3">
//     <p className="font-semibold text-gray-900 text-sm">Route</p>

//     {!editRoute ? (
//       <button
//         type="button"
//         onClick={handleRouteEdit}
//         className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//       >
//         Edit Section
//       </button>
//     ) : (
//       <div className="flex items-center gap-2">
//         <button
//           type="button"
//           onClick={handleRouteCancel}
//           className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//         >
//           Cancel
//         </button>

//         <button
//           type="button"
//           onClick={handleRouteSave}
//           className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
//         >
//           Save
//         </button>
//       </div>
//     )}
//   </div>

//   <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

//     {/* From */}
//     <div>
//       <p className="text-xs text-gray-400">From (Origin)</p>

//       {editRoute ? (
//         <input
//           value={route.origin}
//           onChange={handleRouteChange("origin")}
//           className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//         />
//       ) : (
//         <p className="font-medium text-gray-900">
//           {route.origin}
//         </p>
//       )}
//     </div>

//     {/* To */}
//     <div>
//       <p className="text-xs text-gray-400">To (Destination)</p>

//       {editRoute ? (
//         <input
//           value={route.destination}
//           onChange={handleRouteChange("destination")}
//           className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//         />
//       ) : (
//         <p className="font-medium text-gray-900">
//           {route.destination}
//         </p>
//       )}
//     </div>

//     {/* Place of receipt */}
//     <div>
//       <p className="text-xs text-gray-400">Place of receipt</p>

//       {editRoute ? (
//         <input
//           value={route.placeOfReceipt}
//           onChange={handleRouteChange("placeOfReceipt")}
//           className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//         />
//       ) : (
//         <p className="font-medium text-gray-900">
//           {route.placeOfReceipt}
//         </p>
//       )}
//     </div>

//     {/* Final Delivery */}
//     <div>
//       <p className="text-xs text-gray-400">Final Delivery</p>

//       {editRoute ? (
//         <input
//           value={route.finalDelivery}
//           onChange={handleRouteChange("finalDelivery")}
//           className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//         />
//       ) : (
//         <p className="font-medium text-gray-900">
//           {route.finalDelivery}
//         </p>
//       )}
//     </div>

//   </div>
//           </div>

//             <div className="border border-gray-300 rounded-lg p-4">
//             <div className="flex items-center justify-between mb-3">
//               <p className="font-semibold text-gray-900 text-sm">
//                 Cargo Information
//               </p>

//               {!editCargo ? (
//                 <button
//                   type="button"
//                   onClick={handleCargoEdit}
//                   className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//                 >
//                   Edit Section
//                 </button>
//               ) : (
//                 <div className="flex items-center gap-2">
//                   <button
//                     type="button"
//                     onClick={handleCargoCancel}
//                     className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//                   >
//                     Cancel
//                   </button>

//                   <button
//                     type="button"
//                     onClick={handleCargoSave}
//                     className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
//                   >
//                     Save
//                   </button>
//                 </div>
//               )}
//             </div>

//             <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

//               {/* Product Name */}
//               <div>
//                 <p className="text-xs text-gray-400">Product Name</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.productName}
//                     onChange={handleCargoChange("productName")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.productName}
//                   </p>
//                 )}
//               </div>

//               {/* HS Code */}
//               <div>
//                 <p className="text-xs text-gray-400">HS Code</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.hsCode}
//                     onChange={handleCargoChange("hsCode")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.hsCode}
//                   </p>
//                 )}
//               </div>

//               {/* Packaging Type */}
//               <div>
//                 <p className="text-xs text-gray-400">Packaging Type</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.packagingType}
//                     onChange={handleCargoChange("packagingType")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.packagingType}
//                   </p>
//                 )}
//               </div>

//               {/* Total Packages */}
//               <div>
//                 <p className="text-xs text-gray-400">Total Packages</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.totalPackages}
//                     onChange={handleCargoChange("totalPackages")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.totalPackages}
//                   </p>
//                 )}
//               </div>

//               {/* Net Weight */}
//               <div>
//                 <p className="text-xs text-gray-400">Net weight</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.netWeight}
//                     onChange={handleCargoChange("netWeight")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.netWeight}
//                   </p>
//                 )}
//               </div>

//               {/* Gross Weight */}
//               <div>
//                 <p className="text-xs text-gray-400">Gross Weight</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.grossWeight}
//                     onChange={handleCargoChange("grossWeight")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.grossWeight}
//                   </p>
//                 )}
//               </div>

//               {/* Volume */}
//               <div>
//                 <p className="text-xs text-gray-400">Volume (CBM)</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.volume}
//                     onChange={handleCargoChange("volume")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.volume}
//                   </p>
//                 )}
//               </div>

//               {/* Cargo Description */}
//               <div>
//                 <p className="text-xs text-gray-400">Cargo Description</p>

//                 {editCargo ? (
//                   <input
//                     value={cargo.cargoDescription}
//                     onChange={handleCargoChange("cargoDescription")}
//                     className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                   />
//                 ) : (
//                   <p className="font-medium text-gray-900">
//                     {cargo.cargoDescription}
//                   </p>
//                 )}
//               </div>

//             </div>
//           </div>


//           <div className="border border-gray-300 rounded-lg p-4">
//         <div className="flex items-center justify-between mb-3">
//           <p className="font-semibold text-gray-900 text-sm">
//             Additional Information
//           </p>

//           {!editAdditionalInfo ? (
//             <button
//               type="button"
//               onClick={handleAdditionalInfoEdit}
//               className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//             >
//               Edit Section
//             </button>
//           ) : (
//             <div className="flex items-center gap-2">
//               <button
//                 type="button"
//                 onClick={handleAdditionalInfoCancel}
//                 className="text-xs text-blue-600 border border-blue-200 rounded-lg px-3 py-1.5"
//               >
//                 Cancel
//               </button>

//               <button
//                 type="button"
//                 onClick={handleAdditionalInfoSave}
//                 className="text-xs text-white bg-blue-600 border border-blue-600 rounded-lg px-3 py-1.5"
//               >
//                 Save
//               </button>
//             </div>
//           )}
//         </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">

//             {/* Special Instructions */}
//             <div>
//               <p className="text-xs text-gray-400">
//                 Special Instructions
//               </p>

//               {editAdditionalInfo ? (
//                 <input
//                   value={additionalInfo.specialInstructions}
//                   onChange={handleAdditionalInfoChange("specialInstructions")}
//                   className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                 />
//               ) : (
//                 <p className="font-medium text-gray-900">
//                   {additionalInfo.specialInstructions}
//                 </p>
//               )}
//             </div>

//             {/* Insurance Required */}
//             <div>
//               <p className="text-xs text-gray-400">
//                 Insurance Required
//               </p>

//               {editAdditionalInfo ? (
//                 <select
//                   value={additionalInfo.insuranceRequired}
//                   onChange={handleAdditionalInfoChange("insuranceRequired")}
//                   className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                 >
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               ) : (
//                 <p className="font-medium text-gray-900">
//                   {additionalInfo.insuranceRequired}
//                 </p>
//               )}
//             </div>

//             {/* Inspection Required */}
//             <div>
//               <p className="text-xs text-gray-400">
//                 Inspection required
//               </p>

//               {editAdditionalInfo ? (
//                 <select
//                   value={additionalInfo.inspectionRequired}
//                   onChange={handleAdditionalInfoChange("inspectionRequired")}
//                   className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                 >
//                   <option value="Yes">Yes</option>
//                   <option value="No">No</option>
//                 </select>
//               ) : (
//                 <p className="font-medium text-gray-900">
//                   {additionalInfo.inspectionRequired}
//                 </p>
//               )}
//             </div>

//             {/* Remarks */}
//             <div>
//               <p className="text-xs text-gray-400">
//                 Remarks
//               </p>

//               {editAdditionalInfo ? (
//                 <input
//                   value={additionalInfo.remarks}
//                   onChange={handleAdditionalInfoChange("remarks")}
//                   className="w-full mt-1 border border-gray-200 rounded-lg px-2 py-1.5 text-sm"
//                 />
//               ) : (
//                 <p className="font-medium text-gray-900">
//                   {additionalInfo.remarks}
//                 </p>
//               )}
//             </div>

//           </div>
//         </div>

//             <div className="bg-purple-50 rounded-lg p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
//               <div>
//                 <p className="font-semibold text-gray-900 text-sm">Ready To Proceed?</p>
//                 <p className="text-xs text-gray-500">
//                   You can edit shipment details, create invoice, or share quotation with your client.
//                 </p>
//               </div>
//               <button
//                 onClick={handleProceed}
//                 className="px-5 py-2 rounded-full bg-purple-600 text-white text-sm font-medium whitespace-nowrap"
//               >
//                 Proceed to next step
//               </button>
//             </div>
//           </div>
//         )}

//         {activeTab !== "Shipment Details" && (
//           <p className="text-sm text-gray-500">{activeTab} content goes here.</p>
//         )}

//         {activeTab === "Parties & Contacts" && (
//           <PartiesContact />
//         )}
//          {activeTab === "Cargo Details" && (
//           <CargoDetails />
//          )}
//           {activeTab === "Documents" && (
//             <Documents />
//           )}
//            {activeTab === "Charges" && (
//             <Charges />
//            )}                            
//       </div>

//       <div className="space-y-4">
//         <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//           <p className="font-bold text-gray-900 mb-4">Actions</p>
//           <div className="space-y-3">
//             {actions.map((a,i) => {
//               const Icon = a.icon;
//               return (
//                 <button
//                onClick={() => {
//                       if (a.title === "Create quotation") {
//                         //  setViewShipmentDetail(false)
//                          setShowQuotationModal(true);
//                       }else if (a.title === "Create Invoice") {
//                         setNewInvoice(true)
//                       }
//                     }}
//                   key={a.title}
//                   className={`w-full flex items-center gap-3 rounded-lg p-3 text-left ${a.bg}`}
//                 >
//                   <Icon className={`w-4 h-4 ${a.color} shrink-0`} />
//                   <div>
//                     <p className={`text-sm font-semibold ${a.color}`}>{a.title}</p>
//                     <p className="text-xs text-gray-500">{a.desc}</p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//           <p className="font-bold text-gray-900 mb-4">Shipment Summary</p>
//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span className="text-gray-500">Total cargo value</span>
//               <span className="text-gray-900">₹8,75,000.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Total Charges</span>
//               <span className="text-gray-900">₹1,24,500.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Insurance Value</span>
//               <span className="text-gray-900">₹50,000.00</span>
//             </div>
//             <div className="flex justify-between pt-2 border-t border-gray-100">
//               <span className="text-gray-900 font-semibold">Total Payable</span>
//               <span className="text-purple-600 font-bold">₹1,74,500.00</span>
//             </div>
//             <div className="flex justify-between">
//               <span className="text-gray-500">Payment Status</span>
//               <span className="text-blue-600 font-medium">Pending</span>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//           <p className="font-bold text-gray-900 mb-4">Client Details</p>
//           <div className="flex items-center gap-3 mb-1">
//             <span className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold shrink-0">
//               AS
//             </span>
//             <div>
//               <p className="font-semibold text-gray-900 text-sm">Aarav Sharma</p>
//               <p className="text-xs text-gray-500">ABC Export Pvt. Ltd.</p>
//             </div>
//           </div>
//           <p className="text-xs text-gray-500 mt-2">aarav.sharma@gmail.com</p>
//           <p className="text-xs text-gray-500 mb-4">+91 74833 65549</p>
//           <button onClick={() => setViewShipmentDetail(true)} className="w-full py-2.5 rounded-lg border border-gray-300 text-gray-800 text-sm font-medium">
//             View Full Details
//           </button>
//         </div>
//       </div>
//     </div>
//     </div>
  
//   )}

//     {
//       viewShipmentDetail && (
//           <ShipmentDetails  onClose={() => setViewShipmentDetail(false)}/>
//       )
//     }

//       { showQuotationModal && <Quotation  onClose={() => setShowQuotationModal(false)} />}

//       {newInvoice && <CreateNewInvoice onClose={() => setNewInvoice(false)} />}
        
//     </div>
//   );
// }

// mahima code //

import { useEffect, useState } from "react";
import {
  MapPin,
  Pencil,
  FileText,
  FileSignature,
  Share2,
  RefreshCcw,
  CheckCircle2,
  AlertCircle,
  Lock,
  X,
  ExternalLink,
  ChevronRight,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  Box,
  Truck,
  DollarSign,
  AlertTriangle,
} from "lucide-react";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaXmark,
  FaChevronDown,
  FaStar,
  FaTruck,
  FaBoxOpen,
  FaWarehouse,
  FaFileContract,
} from "react-icons/fa6";

const tabs = [
  "Shipment Details",
  "Parties & Contacts",
  "Cargo Details",
  "Documents",
  "Charges",
];

import PartiesContact from "./Parties&Contact";
import CargoDetails from "./CargoDetails";
import Documents from "./Documents";
import Charges from "./Charges";
import ShipmentDetails from "./ShipmentDetails";
import CreateQuotation from "./Quotation";
import CreateNewInvoice from "./CreateNewInvoice";
import {
  getShipmentDetails,
  getQuotationByShipment,
  approveShipment,
  rejectShipment,
  holdShipment,
  updateShipment,

} from "../../services/shipmentApi";

export default function ReviewShipment({ shipmentId, onClose }) {
  const [activeTab, setActiveTab] = useState("Shipment Details");
  const [shipment, setShipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [toast, setToast] = useState(null); // { type: 'success' | 'error' | 'warning', message: '' }

  const [viewShipmentDetail, setViewShipmentDetail] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [showQuotationModal, setShowQuotationModal] = useState(false);
  const [newInvoice, setNewInvoice] = useState(false);
  const [quotation, setQuotation] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusUpdating, setStatusUpdating] = useState(false);
  const [quotationUpdating, setQuotationUpdating] = useState(false);

  // Edit States
  const [editBasicInfo, setEditBasicInfo] = useState(false);
  const [editRoute, setEditRoute] = useState(false);
  const [editCargo, setEditCargo] = useState(false);
  const [editAdditionalInfo, setEditAdditionalInfo] = useState(false);

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => {
      setToast(null);
    }, 4500);
  };

  const formatDateForInput = (date) => {
    if (!date) return "";
    try {
      return new Date(date).toISOString().split("T")[0];
    } catch {
      return "";
    }
  };

  const formatDateForDisplay = (date) => {
    if (!date) return "-";
  
    const parsedDate = new Date(date);
  
    if (Number.isNaN(parsedDate.getTime())) return "-";
  
    return parsedDate.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // State forms
  const [basicInfo, setBasicInfo] = useState({
    shipmentType: "",
    transportMode: "",
    incoterm: "",
    priority: "Medium",
    referenceNo: "",
    bookingNo: "",
    etd: "",
    eta: "",
  });

  const initialRoute = {
    origin: "",
    destination: "",
    placeOfReceipt: "",
    finalDelivery: "",
  };
  const [route, setRoute] = useState(initialRoute);
  const [originalRoute, setOriginalRoute] = useState(initialRoute);

  const initialCargo = {
    productName: "",
    hsCode: "",
    packagingType: "",
    totalPackages: "",
    netWeight: "",
    grossWeight: "",
    volume: "",
    cargoDescription: "",
  };
  const [cargo, setCargo] = useState(initialCargo);
  const [originalCargo, setOriginalCargo] = useState(initialCargo);

  const initialAdditionalInfo = {
    specialInstructions: "",
    insuranceRequired: "No",
    inspectionRequired: "No",
    remarks: "",
  };
  const [additionalInfo, setAdditionalInfo] = useState(initialAdditionalInfo);
  const [originalAdditionalInfo, setOriginalAdditionalInfo] =
    useState(initialAdditionalInfo);

  // Sync Data Helper
  const syncShipmentState = (data) => {
    setShipment(data);
  
    const cleanNumStr = (val) => {
      if (val === null || val === undefined || val === "") return "";
      return String(val);
    };
  
    const cargoData = data.cargo || {};
  
    // HS Code: manually entered value first, then populated HSCode reference
    const hsCodeValue =
    cargoData.hsCodeText ||
    cargoData.hsCode?.hsCode ||
    cargoData.hsCode?.code ||
    cargoData.hsCode?.hsCodeCode ||
    cargoData.hsCode?.name ||
    (typeof cargoData.hsCode === "string"
      ? cargoData.hsCode
      : "") ||
    "";
  
    // Basic Information
    setBasicInfo({
      shipmentType: data.shipmentType || "-",
      transportMode: data.shipmentMode || data.route?.mode || "-",
      incoterm: data.incoterm || "-",
      priority: data.priority || "Medium",
      referenceNo: data.referenceNumber || data.sbNumber || "-",
      bookingNo: data.bookingNo || "",
      etd: formatDateForInput(data.etd),
      eta: formatDateForInput(data.eta || data.expectedEta),
    });
  
    // Route
    const routeData = {
      origin:
        [data.route?.originCity, data.route?.originCountry]
          .filter(Boolean)
          .join(", ") || "-",
      destination:
        [data.route?.destinationCity, data.route?.destinationCountry]
          .filter(Boolean)
          .join(", ") || "-",
      placeOfReceipt: data.route?.originCity || "",
      finalDelivery: data.route?.destinationCity || "",
    };
  
    setRoute(routeData);
    setOriginalRoute(routeData);
  
    // Cargo
    const rawVolume =
      cargoData.volumeCBM ??
      cargoData.volume ??
      cargoData.volumetricWeight ??
      "";
  
    const rawNetWeight = cargoData.netWeight ?? cargoData.weight ?? "";
    const rawGrossWeight = cargoData.grossWeight ?? "";
    const rawPackages =
      cargoData.packages ??
      cargoData.quantity ??
      cargoData.totalPackages ??
      "";
  
    const cargoState = {
      productName: cargoData.productName || cargoData.name || "",
      hsCode: hsCodeValue,
      packagingType:
        cargoData.packingType ||
        cargoData.packagingType ||
        data.additionalInformation?.packagingType ||
        "",
      totalPackages: cleanNumStr(rawPackages),
      netWeight: cleanNumStr(rawNetWeight),
      grossWeight: cleanNumStr(rawGrossWeight),
      volume: cleanNumStr(rawVolume),
      cargoDescription:
        cargoData.productDescription || cargoData.description || "",
    };
  
    setCargo(cargoState);
    setOriginalCargo(cargoState);
  
    // Additional Information
    const additionalData = {
      specialInstructions:
        data.notes || data.additionalInformation?.specialHandling || "",
      insuranceRequired: data.insuranceRequired ? "Yes" : "No",
      inspectionRequired: data.additionalInformation?.inspectionRequired
        ? "Yes"
        : "No",
      remarks: data.additionalInformation?.remarks || "",
    };
  
    setAdditionalInfo(additionalData);
    setOriginalAdditionalInfo(additionalData);
  };

  // Always load the saved quotation from MongoDB; React state is not persistent.
  const fetchExistingQuotation = async () => {
    try {
      const res = await getQuotationByShipment(shipmentId);
      const list = res.data?.data || res.data?.quotations || [];
      const latestQuotation = Array.isArray(list)
        ? list[0] || null
        : list || null;
      setQuotation(latestQuotation);
      return latestQuotation;
    } catch (err) {
      console.error("Failed to fetch shipment quotation:", err);
      setQuotation(null);
      return null;
    }
  };

  const fetchShipment = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      setError("");

      const res = await getShipmentDetails(shipmentId);

      console.log("GET SHIPMENT API RESPONSE:", res.data);
      console.log("GET SHIPMENT CARGO:", res.data?.data?.cargo);
      
      const data = res.data.data || res.data.shipment || res.data;
      
      syncShipmentState(data);
      await fetchExistingQuotation();
    } catch (err) {
      console.error("Review shipment error:", err);
      setError("Failed to load shipment details.");
      showToast("error", "Failed to fetch latest shipment details.");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    if (!shipmentId) {
      setError("Shipment ID is missing.");
      setLoading(false);
      return;
    }
    fetchShipment();
  }, [shipmentId]);

  // Handle Basic Info Changes
  const handleBasicInfoChange = (key) => (e) => {
    setBasicInfo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const saveBaseInfo = async () => {
    try {
      const payload = {
        shipmentType: basicInfo.shipmentType,
        shipmentMode: basicInfo.transportMode,
        incoterm: basicInfo.incoterm,
        priority: basicInfo.priority,
        etd: basicInfo.etd || null,
        eta: basicInfo.eta || null,
      };

      await updateShipment(shipmentId, payload);
      await fetchShipment(true);
      setEditBasicInfo(false);
      showToast("success", "Basic information updated successfully!");
    } catch (err) {
      console.error("Failed to save basic information:", err);
      showToast("error", "Failed to save basic information.");
    }
  };

  // Route Handlers
  const handleRouteChange = (key) => (e) => {
    setRoute((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleRouteSave = async () => {
    try {
      const currentRoute = shipment?.route || {};
      await updateShipment(shipmentId, {
        route: {
          originCity: route.placeOfReceipt.trim(),
          destinationCity: route.finalDelivery.trim(),
          originCountry: currentRoute.originCountry || "",
          destinationCountry: currentRoute.destinationCountry || "",
          mode: currentRoute.mode || basicInfo.transportMode || "",
          warehouse: currentRoute.warehouse || "",
        },
      });
      await fetchShipment(true);
      setEditRoute(false);
      showToast("success", "Route details updated successfully!");
    } catch (err) {
      console.error("Failed to save route:", err);
      showToast("error", err.response?.data?.message || "Failed to save route details.");
    }
  };

  // Cargo Handlers
  const handleCargoChange = (key) => (e) => {
    setCargo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleCargoSave = async () => {
    try {
      const cleanNum = (value) => {
        if (value === "" || value === "-" || value === null || value === undefined) {
          return null;
        }
        const parsed = Number(value);
        return Number.isFinite(parsed) ? parsed : null;
      };

      const packages = cleanNum(cargo.totalPackages);
      const netWeight = cleanNum(cargo.netWeight);
      const grossWeight = cleanNum(cargo.grossWeight);
      const volumeCBM = cleanNum(cargo.volume);

      await updateShipment(shipmentId, {
        cargo: {
          productName: cargo.productName.trim(),
      
          // Manually entered HS Code
          hsCodeText: String(cargo.hsCode || "").trim(),
      
          packages,
          quantity: packages,
          netWeight,
          grossWeight,
          volumeCBM,
          packingType: cargo.packagingType.trim(),
          productDescription: cargo.cargoDescription.trim(),
        },
      
        additionalInformation: {
          packagingType: cargo.packagingType.trim(),
        },
      });

      await fetchShipment(true);
      setEditCargo(false);
      showToast("success", "Cargo details updated successfully!");
    } catch (err) {
      console.error("Failed to save cargo:", err);
      showToast("error", err.response?.data?.message || "Failed to save cargo details.");
    }
  };

  // Additional Info Handlers
  const handleAdditionalInfoChange = (key) => (e) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [key]: e.target.value,
    }));
  };

  const handleAdditionalInfoSave = async () => {
    try {
      await updateShipment(shipmentId, {
        notes: additionalInfo.specialInstructions,
        insuranceRequired: additionalInfo.insuranceRequired === "Yes",
        additionalInformation: {
          inspectionRequired: additionalInfo.inspectionRequired === "Yes",
          remarks: additionalInfo.remarks,
        },
      });
      await fetchShipment(true);
      setEditAdditionalInfo(false);
      showToast("success", "Additional information updated successfully!");
    } catch (err) {
      console.error("Failed to save additional information:", err);
      showToast("error", err.response?.data?.message || "Failed to save additional info.");
    }
  };

  // Status Change Handler
  const handleStatusChange = async (newStatus) => {
    try {
      setStatusUpdating(true);
      if (newStatus === "Approved") {
        await approveShipment(shipmentId);
      } else if (newStatus === "Rejected") {
        await rejectShipment(shipmentId, { reason: "Status updated by admin" });
      } else if (newStatus === "Hold") {
        await holdShipment(shipmentId);
      } else {
        await updateShipment(shipmentId, {
          workflowStatus: newStatus,
          approvalStatus: newStatus,
          shipmentStatus: newStatus,
        });
      }

      await fetchShipment(true);
      setShowStatusModal(false);
      showToast("success", `Shipment status updated to "${newStatus}"!`);
    } catch (err) {
      console.error("Status update error:", err);
      showToast("error", "Failed to update shipment status.");
    } finally {
      setStatusUpdating(false);
    }
  };

  // Client Details helper
// Applicant Details
// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

// ==========================================
// DYNAMIC APPLICANT PROFILE
// ==========================================

const applicant =
  shipment?.exporter ||
  shipment?.parties?.exporter ||
  shipment?.applicant ||
  {};

const user =
  shipment?.userId && typeof shipment.userId === "object"
    ? shipment.userId
    : {};

const getValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      typeof value !== "object" &&
      String(value).trim() !== ""
  ) || "-";

const clientName = getValue(
  applicant?.contactPerson,
  applicant?.name,
  user?.name,
  shipment?.customerName
);

const companyName = getValue(
  applicant?.companyName,
  applicant?.company,
  user?.companyName
);

const clientEmail = getValue(
  applicant?.email,
  user?.email
);

const clientPhone = getValue(
  applicant?.phone,
  applicant?.mobile,
  user?.phone
);

const applicantAddress = getValue(
  applicant?.address,
  user?.address
);

const applicantCountry = getValue(
  applicant?.country,
  user?.country
);

const applicantCity = getValue(
  applicant?.city,
  user?.city
);

const applicantGST = getValue(
  applicant?.gstNumber,
  applicant?.gstin,
  user?.gstNumber,
  user?.gstin
);

const applicantIEC = getValue(
  applicant?.importExportId,
  user?.importExportId
);

const applicantBusinessType = getValue(
  applicant?.businessType,
  user?.businessType,
  user?.accountType
);

const initials =
  clientName !== "-"
    ? clientName
        .split(/\s+/)
        .filter(Boolean)
        .map((word) => word[0])
        .slice(0, 2)
        .join("")
        .toUpperCase()
    : "CL";

  // Quotation status is authoritative; shipment metadata is only a fallback.
  const quotationStatus = quotation?.status || shipment?.quotationStatus || "";
  const quotationExists = Boolean(
    quotation?._id || quotation?.quotationNumber || quotation?.id ||
    shipment?.quotationId || shipment?.quotation || shipment?.quotationNumber ||
    ["Draft", "Shared", "Accepted", "Rejected", "Expired"].includes(quotationStatus)
  );
  const quotationAccepted = quotationStatus === "Accepted";
  const invoiceAlreadyGenerated = Boolean(
    shipment?.invoiceId || shipment?.invoice?._id ||
    ["Generated", "Sent"].includes(shipment?.invoiceStatus)
  );

  // Actions list (Strictly ordered: Quotation, Invoice, Share, Change Status)
  const actionList = [
    {
      title: quotationExists ? `Quotation ${quotationStatus || "Created"}` : "Create Quotation",
      desc: quotationExists
        ? `Quotation status: ${quotationStatus || "Created"}.`
        : "Generate commercial freight quotation.",
      icon: FileSignature,
      color: quotationExists
        ? "text-emerald-700 bg-emerald-50 border-emerald-200/80"
        : "text-indigo-600 bg-indigo-50 border-indigo-200/80 hover:bg-indigo-100/60",
      disabled: quotationExists || quotationUpdating,
      action: () => {
        if (quotationExists) {
          showToast("warning", "Quotation has already been created. Please proceed to invoice.");
          return;
        }
        setShowQuotationModal(true);
      },
    },
    {
      title: invoiceAlreadyGenerated ? "Invoice Generated" : "Create Invoice",
      desc: invoiceAlreadyGenerated
        ? "An invoice already exists for this shipment."
        : quotationAccepted
        ? "Quotation accepted. You can now generate the invoice."
        : "Invoice can be generated only after the customer accepts the quotation.",
      icon: FileText,
      color: "text-emerald-600 bg-emerald-50 border-emerald-200/80 hover:bg-emerald-100/60",
      disabled: !quotationAccepted || invoiceAlreadyGenerated,
      action: () => {
        if (!quotationAccepted) {
          showToast("warning", "Invoice can be generated only after the customer accepts the quotation.");
          return;
        }
        if (invoiceAlreadyGenerated) {
          showToast("warning", "An invoice has already been generated for this shipment.");
          return;
        }
        setNewInvoice(true);
      },
    },
    // {
    //   title: "Share Quotation",
    //   desc: "Send quotation PDF link to client.",
    //   icon: Share2,
    //   color: "text-purple-600 bg-purple-50 border-purple-200/80 hover:bg-purple-100/60",
    //   action: () => {
    //     if (!quotationExists) {
    //       showToast("warning", "No active quotation found to share. Please create one first.");
    //       return;
    //     }
    //     showToast("success", "Quotation shared successfully with client email!");
    //   },
    // },
    {
      title: "Refresh Status",
      desc: "Fetch the latest shipment, quotation and invoice status.",
      icon: RefreshCcw,
      color: "text-sky-600 bg-sky-50 border-sky-200/80 hover:bg-sky-100/60",
      disabled: statusUpdating,
      action: async () => {
        try {
          setStatusUpdating(true);
          await fetchShipment(true);
          showToast("success", "Latest status refreshed successfully!");
        } catch (err) {
          showToast("error", "Failed to refresh status.");
        } finally {
          setStatusUpdating(false);
        }
      },
    },
  ];

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="bg-white rounded-3xl p-8 shadow-2xl flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-semibold text-slate-700">
            Loading Shipment Details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !shipment) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4">
        <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl text-center">
          <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-3">
            <AlertCircle size={24} />
          </div>
          <h3 className="text-base font-bold text-slate-900">Unable to Load</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            {error || "Shipment record could not be found."}
          </p>
          <button
            onClick={onClose}
            className="w-full py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-slate-800 transition-all"
          >
            Close Modal
          </button>
        </div>
      </div>
    );
  }

  const currentShipmentStatus =
  shipment?.invoiceStatus === "Sent"
    ? "Invoice Sent"
    : shipment?.invoiceStatus === "Generated"
    ? "Invoice Generated"
    : quotationStatus === "Accepted"
    ? "Quotation Accepted"
    : quotationStatus === "Rejected"
    ? "Quotation Rejected"
    : quotationStatus === "Expired"
    ? "Quotation Expired"
    : quotationStatus === "Shared"
    ? "Quotation Sent"
    : quotationStatus === "Draft"
    ? "Quotation Draft"
    : shipment?.workflowStatus ||
      shipment?.approvalStatus ||
      (shipment?.shipmentStatus === "Submitted"
        ? "Pending Review"
        : shipment?.shipmentStatus) ||
      "Pending Review";

   

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-3 sm:p-5 overflow-hidden">
      {!viewShipmentDetail && (
        <div className="w-full max-w-7xl max-h-[92vh] flex flex-col bg-white rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          {/* TOAST NOTIFICATION BANNER */}
          {toast && (
            <div
              className={`px-6 py-3 text-xs font-semibold flex items-center justify-between border-b transition-all ${
                toast.type === "success"
                  ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                  : toast.type === "warning"
                  ? "bg-amber-50 text-amber-800 border-amber-200"
                  : "bg-rose-50 text-rose-800 border-rose-200"
              }`}
            >
              <div className="flex items-center gap-2">
                {toast.type === "success" && <CheckCircle2 size={16} />}
                {toast.type === "warning" && <AlertTriangle size={16} />}
                {toast.type === "error" && <AlertCircle size={16} />}
                <span>{toast.message}</span>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-current opacity-60 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          )}

          {/* STATIC TOP HEADER */}
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shadow-2xs">
                <MapPin size={20} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                    Review Consignment
                  </h2>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200/80">
                    {shipment.referenceNumber || shipment.sbNumber || "REF"}
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify cargo specifications, generate quotation, invoice, and track workflow.
                </p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50 text-slate-400 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all"
            >
              <X size={18} />
            </button>
          </div>

          {/* TOP METRIC / STATUS STRIP */}
          <div className="px-6 py-3 bg-slate-50/70 border-b border-slate-200/80 grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs shrink-0">
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Shipment ID
              </p>
              <p className="font-bold text-slate-900 mt-0.5">
                {shipment.referenceNumber || shipment.sbNumber || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Submitted By
              </p>
              <p className="font-bold text-slate-900 mt-0.5 truncate">
                {shipment.exporter?.contactPerson || clientName || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Company / Exporter
              </p>
              <p className="font-bold text-slate-900 mt-0.5 truncate">
                {shipment.exporter?.companyName || companyName || "-"}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-semibold text-slate-400 uppercase">
                Submitted On
              </p>
              <p className="font-bold text-slate-900 mt-0.5">
                {shipment.createdAt
                  ? new Date(shipment.createdAt).toLocaleDateString("en-GB")
                  : "-"}
              </p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-[10px] font-semibold text-slate-400 uppercase">
                  Current Status
                </p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                  <span className="font-bold text-amber-700">
                    {currentShipmentStatus}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => fetchShipment(true)}
                title="Refresh Status"
                className="p-1 rounded-lg hover:bg-slate-200/70 text-slate-500 transition-all"
              >
                <RefreshCcw size={13} />
              </button>
            </div>
          </div>

          {/* MAIN MODAL SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-5 sm:p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* =======================================================
                  LEFT AREA (COLUMNS 1 TO 8): TABS & FORM SECTIONS
                 ======================================================= */}
              <div className="lg:col-span-8 space-y-5">
                {/* Clean Tab Pills */}
                <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-slate-100">
                  {tabs.map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`whitespace-nowrap px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                        activeTab === tab
                          ? "bg-indigo-600 text-white shadow-xs"
                          : "text-slate-500 hover:text-slate-900 hover:bg-slate-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {activeTab === "Shipment Details" && (
                  <div className="space-y-4">
                    {/* SECTION 1: BASIC INFORMATION */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            1
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Basic Information
                          </h3>
                        </div>

                        {!editBasicInfo ? (
                          <button
                            type="button"
                            onClick={() => setEditBasicInfo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setBasicInfo({
                                  shipmentType: shipment.shipmentType || "-",
                                  transportMode: shipment.shipmentMode || shipment.route?.mode || "-",
                                  incoterm: shipment.incoterm || "-",
                                  priority: shipment.priority || "Medium",
                                  referenceNo: shipment.referenceNumber || shipment.sbNumber || "-",
                                  bookingNo: shipment.bookingNo || "",
                                  etd: formatDateForInput(shipment.etd),
                                  eta: formatDateForInput(shipment.eta),
                                });
                                setEditBasicInfo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={saveBaseInfo}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Shipment Type
                          </p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.shipmentType}
                              onChange={handleBasicInfoChange("shipmentType")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Export">Export</option>
                              <option value="Import">Import</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.shipmentType}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Mode of Transport
                          </p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.transportMode}
                              onChange={handleBasicInfoChange("transportMode")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Air">Air</option>
                              <option value="Sea">Sea</option>
                              <option value="Road">Road</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.transportMode}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">Incoterm</p>
                          {editBasicInfo ? (
                            <input
                              value={basicInfo.incoterm}
                              onChange={handleBasicInfoChange("incoterm")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {basicInfo.incoterm}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">Priority</p>
                          {editBasicInfo ? (
                            <select
                              value={basicInfo.priority}
                              onChange={handleBasicInfoChange("priority")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                          ) : (
                            <span className="font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-md">
                              {basicInfo.priority}
                            </span>
                          )}
                        </div>

                        {/* Reference No (Read-Only) */}
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <p className="text-slate-400 font-medium">Reference No.</p>
                            <Lock size={10} className="text-slate-400" />
                          </div>
                          <p className="font-bold text-slate-600 bg-slate-100/80 px-2.5 py-1.5 rounded-lg border border-slate-200/60 inline-block">
                            {basicInfo.referenceNo}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Booking Number
                          </p>
                          {editBasicInfo ? (
                            <input
                              value={basicInfo.bookingNo}
                              placeholder="e.g. BKG-9921"
                              onChange={handleBasicInfoChange("bookingNo")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                            {basicInfo.bookingNo || shipment.bookingNo || "Generating..."}
                          </p>
                          )}
                        </div>

                        <div>
  <p className="text-slate-400 font-medium mb-1">
    Expected ETD
  </p>

  {editBasicInfo ? (
    <input
      type="date"
      value={basicInfo.etd}
      onChange={handleBasicInfoChange("etd")}
      className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
    />
  ) : (
    <p className="font-bold text-slate-900">
      {formatDateForDisplay(shipment.etd)}
    </p>
  )}
</div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Expected ETA
                          </p>
                          {editBasicInfo ? (
                            <input
                              type="date"
                              value={basicInfo.eta}
                              onChange={handleBasicInfoChange("eta")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2 py-1.5 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                            {formatDateForDisplay(shipment.eta || shipment.expectedEta)}
                          </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: ROUTE */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            2
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Transit & Port Route
                          </h3>
                        </div>

                        {!editRoute ? (
                          <button
                            type="button"
                            onClick={() => setEditRoute(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setRoute(originalRoute);
                                setEditRoute(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleRouteSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Origin Country/Port
                          </p>
                          <p className="font-bold text-slate-900">{route.origin}</p>
                        </div>
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Destination Country/Port
                          </p>
                          <p className="font-bold text-slate-900">
                            {route.destination}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Place of Receipt (City)
                          </p>
                          {editRoute ? (
                            <input
                              value={route.placeOfReceipt}
                              onChange={handleRouteChange("placeOfReceipt")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {route.placeOfReceipt}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Final Delivery (City)
                          </p>
                          {editRoute ? (
                            <input
                              value={route.finalDelivery}
                              onChange={handleRouteChange("finalDelivery")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {route.finalDelivery}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: CARGO SPECIFICATIONS */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            3
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Cargo & Volume Information
                          </h3>
                        </div>

                        {!editCargo ? (
                          <button
                            type="button"
                            onClick={() => setEditCargo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setCargo(originalCargo);
                                setEditCargo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleCargoSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Product Name
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.productName}
                              onChange={handleCargoChange("productName")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.productName || "-"}
                            </p>
                          )}
                        </div>

                        {/* HS Code */}
                        <div>
                          <div className="flex items-center gap-1 mb-1">
                            <p className="text-slate-400 font-medium">HS Code</p>
                            <Lock size={10} className="text-slate-400" />
                          </div>
                          <p className="font-bold text-slate-800 bg-slate-100 px-2 py-1 rounded-md inline-block">
                            {cargo.hsCode || "-"}
                          </p>
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Packaging Type
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.packagingType}
                              onChange={handleCargoChange("packagingType")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.packagingType || "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Total Packages
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.totalPackages}
                              onChange={handleCargoChange("totalPackages")}
                              placeholder="e.g. 50"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.totalPackages || "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Net Weight (KG)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.netWeight}
                              onChange={handleCargoChange("netWeight")}
                              placeholder="Net wt in KG"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.netWeight ? `${cargo.netWeight} KG` : "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Gross Weight (KG)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.grossWeight}
                              onChange={handleCargoChange("grossWeight")}
                              placeholder="Gross wt in KG"
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {cargo.grossWeight ? `${cargo.grossWeight} KG` : "-"}
                            </p>
                          )}
                        </div>

                        {/* Volume Field (Fixed sync bug!) */}
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Volume (CBM)
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.volume}
                              onChange={handleCargoChange("volume")}
                              placeholder="e.g. 200"
                              className="w-full rounded-xl border border-indigo-300 bg-indigo-50/40 px-2.5 py-2 text-xs font-bold text-slate-900 focus:bg-white focus:border-indigo-600 focus:outline-none"
                            />
                          ) : (
                            <p className="font-extrabold text-indigo-700 bg-indigo-50/80 px-2 py-0.5 rounded-md inline-block">
                              {cargo.volume ? `${cargo.volume} CBM` : "-"}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Cargo Description
                          </p>
                          {editCargo ? (
                            <input
                              value={cargo.cargoDescription}
                              onChange={handleCargoChange("cargoDescription")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900 truncate">
                              {cargo.cargoDescription || "-"}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* SECTION 4: ADDITIONAL INFO */}
                    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-indigo-50 text-indigo-700 font-bold text-xs flex items-center justify-center">
                            4
                          </span>
                          <h3 className="text-sm font-bold text-slate-900">
                            Compliance & Special Instructions
                          </h3>
                        </div>

                        {!editAdditionalInfo ? (
                          <button
                            type="button"
                            onClick={() => setEditAdditionalInfo(true)}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100 border border-indigo-200/60 rounded-xl px-3 py-1.5 transition-all"
                          >
                            <Pencil size={12} />
                            Edit Section
                          </button>
                        ) : (
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                setAdditionalInfo(originalAdditionalInfo);
                                setEditAdditionalInfo(false);
                              }}
                              className="text-xs font-semibold text-slate-600 border border-slate-200 rounded-xl px-3 py-1.5 hover:bg-slate-50"
                            >
                              Cancel
                            </button>
                            <button
                              type="button"
                              onClick={handleAdditionalInfoSave}
                              className="text-xs font-semibold text-white bg-indigo-600 rounded-xl px-3.5 py-1.5 hover:bg-indigo-700 shadow-xs"
                            >
                              Save Changes
                            </button>
                          </div>
                        )}
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Special Handling
                          </p>
                          {editAdditionalInfo ? (
                            <input
                              value={additionalInfo.specialInstructions}
                              onChange={handleAdditionalInfoChange(
                                "specialInstructions"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.specialInstructions}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Insurance Required
                          </p>
                          {editAdditionalInfo ? (
                            <select
                              value={additionalInfo.insuranceRequired}
                              onChange={handleAdditionalInfoChange(
                                "insuranceRequired"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.insuranceRequired}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Inspection Required
                          </p>
                          {editAdditionalInfo ? (
                            <select
                              value={additionalInfo.inspectionRequired}
                              onChange={handleAdditionalInfoChange(
                                "inspectionRequired"
                              )}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            >
                              <option value="Yes">Yes</option>
                              <option value="No">No</option>
                            </select>
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.inspectionRequired}
                            </p>
                          )}
                        </div>

                        <div>
                          <p className="text-slate-400 font-medium mb-1">
                            Admin Remarks
                          </p>
                          {editAdditionalInfo ? (
                            <input
                              value={additionalInfo.remarks}
                              onChange={handleAdditionalInfoChange("remarks")}
                              className="w-full rounded-xl border border-slate-200 bg-slate-50 px-2.5 py-2 text-xs font-semibold focus:bg-white focus:border-indigo-500 focus:outline-none"
                            />
                          ) : (
                            <p className="font-bold text-slate-900">
                              {additionalInfo.remarks}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* OTHER TABS */}
                {activeTab === "Parties & Contacts" && (
                  <PartiesContact
                    shipment={shipment}
                    shipmentId={shipmentId}
                    onUpdated={() => fetchShipment(true)}
                  />
                )}
{activeTab === "Cargo Details" && (
  <CargoDetails
    shipment={shipment}
    shipmentId={shipment?._id || shipment?.id}
    onUpdated={() => fetchShipment(true)}
  />
)}

                {activeTab === "Documents" && <Documents shipment={shipment} />}

                {activeTab === "Charges" && (
                  <Charges
                    shipment={shipment}
                    shipmentId={shipmentId}
                    onUpdated={() => fetchShipment(true)}
                  />
                )}
              </div>

              {/* =======================================================
                  RIGHT AREA (COLUMNS 9 TO 12): ACTIONS, SUMMARY & CLIENT
                 ======================================================= */}
              <div className="lg:col-span-4 space-y-5">
                {/* ACTIONS CARD (Edit Shipment Removed, strictly ordered!) */}
                <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
                  <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
                    <h3 className="text-sm font-extrabold text-slate-900">
                      Operations & Actions
                    </h3>
                    <span className="text-[10px] font-semibold text-slate-400 uppercase">
                      Admin Tasks
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {actionList.map((a) => {
                      const Icon = a.icon;
                      return (
                        <button
                          key={a.title}
                          type="button"
                          onClick={a.action}
                          disabled={a.disabled}
                          className={`w-full flex items-center gap-3.5 rounded-2xl border p-3.5 text-left transition-all duration-150 disabled:cursor-not-allowed disabled:opacity-90 ${a.color}`}
                        >
                          <div className="w-8 h-8 rounded-xl bg-white shadow-2xs flex items-center justify-center shrink-0">
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold leading-tight">
                              {a.title}
                            </p>
                            <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                              {a.desc}
                            </p>
                          </div>
                          <ChevronRight size={14} className="opacity-50" />
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* SHIPMENT SUMMARY CARD */}
             {/* FINANCIAL SUMMARY CARD */}
<div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
  <h3 className="text-sm font-extrabold text-slate-900 mb-3 pb-2 border-b border-slate-100">
    Financial Summary
  </h3>

  {!quotation ? (
    <p className="text-xs text-slate-400 text-center py-5">
      No quotation generated yet.
    </p>
  ) : (
    <div className="space-y-3 text-xs">
      <div className="flex justify-between">
        <span className="font-semibold text-slate-700">
          Quotation No.
        </span>
        <span className="font-bold text-slate-900">
          {quotation.quotationNumber || "-"}
        </span>
      </div>

      <div className="border-t border-slate-100 pt-3 space-y-3">
        {quotation.charges?.map((charge, index) => (
          <div
            key={charge._id || index}
            className="flex justify-between items-start gap-3"
          >
            <div className="min-w-0">
              <p className="font-medium text-slate-700">
                {charge.name}
              </p>
              {charge.description && (
                <p className="text-[10px] text-slate-400 mt-0.5">
                  {charge.description}
                </p>
              )}
            </div>

            <span className="font-semibold text-slate-900 whitespace-nowrap">
              {charge.currency || quotation.currency}{" "}
              {Number(charge.amount || 0).toLocaleString("en-IN")}
            </span>
          </div>
        ))}
      </div>

      <div className="border-t border-slate-100 pt-3 space-y-2">
        <div className="flex justify-between text-slate-600">
          <span>Subtotal</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.subtotal || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Discount</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.discount || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between text-slate-600">
          <span>Tax</span>
          <span>
            {quotation.currency}{" "}
            {Number(quotation.tax || 0).toLocaleString("en-IN")}
          </span>
        </div>

        <div className="flex justify-between items-center border-t border-slate-200 pt-3 font-bold">
          <span className="text-slate-900">Grand Total</span>
          <span className="text-indigo-600 text-sm">
            {quotation.currency}{" "}
            {Number(quotation.totalAmount || 0).toLocaleString("en-IN")}
          </span>
        </div>
      </div>
    </div>
  )}
</div>

                {/* CLIENT DETAILS CARD */}
              {/* DYNAMIC APPLICANT PROFILE CARD */}
<div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-2xs">
  <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
    <h3 className="text-sm font-extrabold text-slate-900">
      Applicant Profile
    </h3>

    <span className="text-[10px] font-semibold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg">
      Applicant
    </span>
  </div>

  {/* Applicant Basic Info */}
  <div className="flex items-center gap-3 mb-4">
    <span className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-700 font-extrabold text-sm flex items-center justify-center shrink-0">
      {initials}
    </span>

    <div className="min-w-0">
      <p className="font-bold text-slate-900 text-sm truncate">
        {clientName}
      </p>

      <p className="text-[11px] text-slate-500 truncate mt-0.5">
        {companyName}
      </p>
    </div>
  </div>

  {/* Applicant Contact Details */}
  <div className="space-y-3 text-xs">

    <div className="flex items-start gap-2.5">
      <Mail size={14} className="text-slate-400 shrink-0 mt-0.5" />
      <div className="min-w-0">
        <p className="text-[10px] text-slate-400 mb-0.5">
          Email Address
        </p>
        <p className="font-semibold text-slate-700 break-all">
          {clientEmail}
        </p>
      </div>
    </div>

    <div className="flex items-start gap-2.5">
      <Phone size={14} className="text-slate-400 shrink-0 mt-0.5" />
      <div>
        <p className="text-[10px] text-slate-400 mb-0.5">
          Phone Number
        </p>
        <p className="font-semibold text-slate-700">
          {clientPhone}
        </p>
      </div>
    </div>

 







   
  </div>

  {/* <div className="mt-4 pt-3 border-t border-slate-100">
    <button
      type="button"
      onClick={() => {
        setSelectedShipment(shipment);
        setViewShipmentDetail(true);
      }}
      className="w-full py-2.5 rounded-xl border border-slate-200 bg-slate-50/70 hover:bg-slate-100 text-slate-700 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all"
    >
      <ExternalLink size={13} />
      View Full Account Details
    </button>
  </div> */}
</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW FULL SHIPMENT DETAIL MODAL */}
      {viewShipmentDetail && selectedShipment && (
        <ShipmentDetails
          shipment={selectedShipment}
          onClose={() => {
            setViewShipmentDetail(false);
            setSelectedShipment(null);
          }}
        />
      )}

      {/* CREATE QUOTATION MODAL */}
      {showQuotationModal && (
        <CreateQuotation
          shipment={shipment}
          onClose={() => setShowQuotationModal(false)}
          onSuccess={async () => {
            setShowQuotationModal(false);
            setQuotationUpdating(true);
            try {
              // The backend creates the quotation and links it to the shipment.
              await fetchShipment(true);
              await fetchExistingQuotation();
              showToast(
                "success",
                "Quotation saved successfully. You can now proceed to create the invoice."
              );
            } catch (err) {
              console.error("Failed to reload saved quotation:", err);
              showToast("warning", "Quotation was created. Please refresh the quotation details.");
            } finally {
              setQuotationUpdating(false);
            }
          }}
        />
      )}

      {/* CREATE NEW INVOICE MODAL */}
      {newInvoice && (
        <CreateNewInvoice
          shipment={shipment}
          quotation={quotation}
          onClose={() => setNewInvoice(false)}
          onSuccess={async (invoice) => {
            setNewInvoice(false);
          
            await fetchShipment(true);
            await fetchExistingQuotation();
          
            showToast("success", "Invoice generated successfully!");
          }}
        />
      )}

      {/* CHANGE STATUS DIALOG MODAL */}
      {showStatusModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center bg-slate-900/50 backdrop-blur-2xs p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-slate-200">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
              <h3 className="text-base font-extrabold text-slate-900">
                Change Shipment Status
              </h3>
              <button
                onClick={() => setShowStatusModal(false)}
                className="text-slate-400 hover:text-slate-800"
              >
                <X size={16} />
              </button>
            </div>

            <p className="text-xs text-slate-500 mb-4">
              Select the new workflow status to update the database and refresh the dashboard:
            </p>

            <div className="space-y-2">
              {[
                { label: "Pending Review", color: "text-amber-700 bg-amber-50" },
                { label: "Quotation Sent", color: "text-purple-700 bg-purple-50" },
                { label: "Approved", color: "text-emerald-700 bg-emerald-50" },
                { label: "Hold", color: "text-orange-700 bg-orange-50" },
                { label: "Rejected", color: "text-rose-700 bg-rose-50" },
              ].map((st) => (
                <button
                  key={st.label}
                  disabled={statusUpdating}
                  onClick={() => handleStatusChange(st.label)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold text-left flex items-center justify-between transition-all hover:scale-[1.01] ${st.color}`}
                >
                  <span>{st.label}</span>
                  {currentShipmentStatus === st.label && (
                    <CheckCircle2 size={14} />
                  )}
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                fetchShipment(true);
                setShowStatusModal(false);
                showToast("success", "Shipment status refreshed from database!");
              }}
              className="w-full mt-4 py-2 border border-slate-200 text-slate-600 rounded-xl text-xs font-semibold hover:bg-slate-50 flex items-center justify-center gap-1.5"
            >
              <RefreshCcw size={12} />
              Just Refresh from Server
            </button>
          </div>
        </div>
      )}
    </div>
  );
}