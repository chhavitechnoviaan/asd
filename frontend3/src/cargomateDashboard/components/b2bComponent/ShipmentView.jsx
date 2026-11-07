// import React, { useEffect, useState } from "react";
// import {
//   ArrowLeft,
//   Edit3,
//   Package,
//   MapPin,
//   FileText,
//   IndianRupee,
//   Truck,
//   CalendarDays,
//   Box,
//   AlertCircle,
// } from "lucide-react";

// import { getShipmentDetails } from "../../api/ShipmentApi";

// const ViewShipment = ({ shipmentId, onBack, onEdit }) => {
//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   useEffect(() => {
//     if (!shipmentId) {
//       setLoading(false);
//       setError("No shipment selected.");
//       return;
//     }
//     fetchShipmentDetails();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [shipmentId]);

//   const fetchShipmentDetails = async () => {
//     setLoading(true);
//     setError("");
//     try {
//       const response = await getShipmentDetails(shipmentId);
//       const payload = response?.data?.data;

//       if (!payload) {
//         setError("Shipment details not found.");
//         setDetails(null);
//       } else {
//         setDetails(payload);
//       }
//     } catch (err) {
//       console.error("Shipment details error:", err);
//       setError(
//         err.response?.data?.message || "Unable to load shipment details."
//       );
//       setDetails(null);
//     } finally {
//       // IMPORTANT: loading always turns off, success or fail - no infinite spinner
//       setLoading(false);
//     }
//   };

//   const handleEdit = () => {
//     if (onEdit) onEdit(shipmentId);
//   };

//   const formatValue = (value) => {
//     if (value === null || value === undefined || value === "") return "-";
//     if (typeof value === "boolean") return value ? "Yes" : "No";
//     if (typeof value === "object") return JSON.stringify(value);
//     return value;
//   };

//   const formatDate = (value) => {
//     if (!value) return "-";
//     const date = new Date(value);
//     if (Number.isNaN(date.getTime())) return "-";
//     return date.toLocaleDateString("en-IN", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };

//   const DetailItem = ({ label, value }) => (
//     <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
//       <p className="text-[11px] font-medium text-slate-400 mb-1">{label}</p>
//       <p className="text-sm font-semibold text-slate-800 break-words">
//         {formatValue(value)}
//       </p>
//     </div>
//   );

//   if (loading) {
//     return (
//       <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-9 h-9 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
//           <p className="text-sm text-slate-500">Loading shipment details...</p>
//         </div>
//       </div>
//     );
//   }

//   if (error || !details) {
//     return (
//       <div className="fixed inset-0 z-50 bg-[#F8FAFC] overflow-y-auto p-6">
//         <button
//           onClick={onBack}
//           className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-blue-600 mb-6"
//         >
//           <ArrowLeft size={18} />
//           Back
//         </button>
//         <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-xl mx-auto">
//           <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />
//           <h2 className="text-lg font-bold text-slate-800">Unable to load shipment</h2>
//           <p className="text-sm text-slate-500 mt-2">
//             {error || "Shipment details not found."}
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { header = {}, shipmentInfo = {}, overview = {}, documents = [], parties = {} } = details;
//   const exporter = parties.exporter || {};
//   const importer = parties.importer || {};

//   return (
//     <div className="fixed inset-0 z-50 bg-[#F8FAFC] overflow-y-auto p-4 sm:p-6 lg:p-8">
//       <div className="max-w-7xl mx-auto">

//         {/* HEADER */}
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
//           <div>
//             <button
//               onClick={onBack}
//               className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-3 transition"
//             >
//               <ArrowLeft size={17} />
//               Back to Shipments
//             </button>

//             <div className="flex items-center gap-3 flex-wrap">
//               <h1 className="text-2xl sm:text-3xl font-bold text-[#0F172A]">
//                 Shipment Details
//               </h1>
//               <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
//                 {header.shipmentStatus || "Draft"}
//               </span>
//             </div>

//             <p className="text-sm text-slate-500 mt-1">{header.shipmentId || "-"}</p>
//           </div>

//           <button
//             onClick={handleEdit}
//             className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm transition"
//           >
//             <Edit3 size={17} />
//             Edit Shipment
//           </button>
//         </div>

//         {/* SUMMARY */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
//           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
//                 <Package size={19} className="text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400">Shipment / SB No.</p>
//                 <p className="text-sm font-bold text-slate-800">{header.shipmentId || "-"}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
//                 <Truck size={19} className="text-indigo-600" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400">Shipment Mode</p>
//                 <p className="text-sm font-bold text-slate-800">{shipmentInfo.mode || "-"}</p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
//                 <IndianRupee size={19} className="text-emerald-600" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400">Estimated Cost</p>
//                 <p className="text-sm font-bold text-slate-800">
//                   ₹{Number(header.estimatedCost || 0).toLocaleString("en-IN")}
//                 </p>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
//                 <CalendarDays size={19} className="text-orange-500" />
//               </div>
//               <div>
//                 <p className="text-[11px] text-slate-400">ETA</p>
//                 <p className="text-sm font-bold text-slate-800">{formatDate(header.eta)}</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* BASIC + ROUTE */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center">
//                 <Package size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Basic Shipment Details</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Shipment Mode" value={shipmentInfo.mode} />
//               <DetailItem label="Carrier" value={shipmentInfo.carrier?.name} />
//               <DetailItem label="Incoterm" value={shipmentInfo.incoterm} />
//               <DetailItem label="AWB Number" value={shipmentInfo.awbNumber} />
//               <DetailItem label="Transit Time" value={shipmentInfo.transitTime} />
//               <DetailItem label="Total Volume" value={shipmentInfo.totalVolume} />
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-indigo-600 text-white flex items-center justify-center">
//                 <MapPin size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Origin & Destination</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Origin Country" value={header.route?.originCountry} />
//               <DetailItem label="Origin City" value={header.route?.originCity} />
//               <DetailItem label="Destination Country" value={header.route?.destinationCountry} />
//               <DetailItem label="Destination City" value={header.route?.destinationCity} />
//               <DetailItem label="ETD" value={formatDate(header.etd)} />
//               <DetailItem label="ETA" value={formatDate(header.eta)} />
//             </div>
//           </div>
//         </div>

//         {/* INVOICE + PRODUCT */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center">
//                 <FileText size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Invoice & Payment</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Estimated Cost" value={overview.estimatedCost} />
//               <DetailItem label="Paid Amount" value={overview.paidAmount} />
//               <DetailItem label="Balance Amount" value={overview.balanceAmount} />
//               <DetailItem label="Payment Status" value={overview.paymentStatus} />
//               <DetailItem label="Created On" value={formatDate(overview.createdOn)} />
//               <DetailItem label="Created By" value={overview.createdBy?.name} />
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-purple-600 text-white flex items-center justify-center">
//                 <Box size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Product / Cargo Details</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Goods" value={shipmentInfo.goods} />
//               <DetailItem label="HS Code" value={shipmentInfo.hsCode?.hsCode} />
//               <DetailItem label="Quantity" value={shipmentInfo.quantity} />
//               <DetailItem label="Weight" value={shipmentInfo.weight} />
//             </div>
//           </div>
//         </div>

//         {/* PARTIES */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-cyan-600 text-white flex items-center justify-center">
//                 <Package size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Exporter</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Company Name" value={exporter.companyName} />
//               <DetailItem label="Contact Person" value={exporter.contactPerson} />
//               <DetailItem label="Email" value={exporter.email} />
//               <DetailItem label="Phone" value={exporter.phone} />
//               <DetailItem label="Address" value={exporter.address} />
//             </div>
//           </div>

//           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
//             <div className="flex items-center gap-3 mb-5">
//               <div className="w-9 h-9 rounded-full bg-orange-500 text-white flex items-center justify-center">
//                 <MapPin size={17} />
//               </div>
//               <h2 className="text-base font-bold text-slate-800">Importer</h2>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
//               <DetailItem label="Company Name" value={importer.companyName} />
//               <DetailItem label="Contact Person" value={importer.contactPerson} />
//               <DetailItem label="Email" value={importer.email} />
//               <DetailItem label="Phone" value={importer.phone} />
//               <DetailItem label="Address" value={importer.address} />
//             </div>
//           </div>
//         </div>

//         {/* DOCUMENTS */}
//         <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm mb-6">
//           <div className="flex items-center gap-3 mb-5">
//             <div className="w-9 h-9 rounded-full bg-slate-700 text-white flex items-center justify-center">
//               <FileText size={17} />
//             </div>
//             <h2 className="text-base font-bold text-slate-800">Documents</h2>
//           </div>

//           {Array.isArray(documents) && documents.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
//               {documents.map((doc, index) => (
//                 <div key={doc._id || index} className="border border-slate-100 bg-slate-50 rounded-xl p-4">
//                   <p className="text-sm font-semibold text-slate-700">
//                     {doc.documentName || `Document ${index + 1}`}
//                   </p>
//                   <p className="text-[10px] text-slate-400 mt-0.5">{doc.status}</p>
//                   {doc.fileUrl && (
//                     <a
//                       href={doc.fileUrl}
//                       target="_blank"
//                       rel="noreferrer"
//                       className="text-xs font-semibold text-blue-600 hover:underline mt-2 inline-block"
//                     >
//                       View Document
//                     </a>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-5 text-center">
//               No documents uploaded.
//             </div>
//           )}
//         </div>

//         {/* FOOTER ACTIONS */}
//         <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pb-8">
//           <button
//             onClick={onBack}
//             className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50"
//           >
//             ← Back to Shipments
//           </button>

//           <button
//             onClick={handleEdit}
//             className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
//           >
//             <Edit3 size={17} />
//             Edit Shipment
//           </button>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ViewShipment;

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  Edit3,
  Package,
  MapPin,
  FileText,
  IndianRupee,
  Truck,
  CalendarDays,
  Box,
  AlertCircle,
  Eye,
  RefreshCw
} from "lucide-react";

import { getShipmentDetails } from "../../api/ShipmentApi";

// Resolve relative upload paths against the backend origin, not the frontend domain.
const getShipmentDocumentUrl = (fileUrl) => {
  if (!fileUrl) return "";
  if (/^https?:\/\//i.test(fileUrl) || fileUrl.startsWith("data:")) return fileUrl;

  const apiBase = String(import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");
  const backendBase = apiBase.replace(/\/api$/i, "");
  const base = backendBase || window.location.origin;
  return new URL(fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`, base).toString();
};

const isDraftStatus = (shipment) => {
  const status = String(shipment?.shipmentStatus || shipment?.status || "").trim().toLowerCase();
  return status === "draft";
};

const ViewShipment = ({ shipmentId, onBack, onEdit }) => {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!shipmentId) {
      setError("No shipment selected.");
      setLoading(false);
      return;
    }

    fetchShipmentDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shipmentId]);

  const fetchShipmentDetails = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getShipmentDetails(shipmentId);

      // Backend returns { status, message, data }
      const payload =
        response?.data?.data ||
        response?.data?.shipment ||
        response?.data;

      if (!payload || !payload._id) {
        throw new Error("Shipment details not found.");
      }

      console.log("COMPLETE SHIPMENT DETAILS:", payload);
      setDetails(payload);
    } catch (err) {
      console.error("Shipment details error:", err);
      setError(
        err?.response?.data?.message ||
        err?.message ||
        "Unable to load shipment details."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    onEdit?.(shipmentId);
  };

  const formatLabel = (key) => {
    return String(key)
      .replace(/([A-Z])/g, " $1")
      .replace(/[_-]/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
      .trim();
  };

  const formatValue = (value) => {
    if (value === null || value === undefined || value === "") return "-";

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    if (Array.isArray(value)) {
      return value.length ? `${value.length} item(s)` : "-";
    }

    if (typeof value === "object") {
      return value.name || value.companyName || value.hsCode ||
        value._id || JSON.stringify(value);
    }

    return String(value);
  };

  const formatDate = (value) => {
    if (!value) return "-";

    const date = new Date(value);

    if (Number.isNaN(date.getTime())) return value;

    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const ignoredFields = [
    "_id",
    "__v",
    "id",
    "createdAt",
    "updatedAt",
    "updatedBy",
    "updatedById",
    "updated_by",
    "updated_by_id",
    "password",
    "token",
  ];

  const isDateField = (key) =>
    /date|eta|etd|at$/i.test(key);

  const DetailItem = ({ label, value, fieldKey }) => {
    if (
      value === null ||
      value === undefined ||
      value === "" ||
      typeof value === "object"
    ) {
      return null;
    }

    return (
      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 min-w-0">
        <p className="text-[11px] font-medium text-slate-400 mb-1">
          {label}
        </p>

        <p className="text-sm font-semibold text-slate-800 break-words">
          {isDateField(fieldKey)
            ? formatDate(value)
            : formatValue(value)}
        </p>
      </div>
    );
  };

  // Recursively display nested objects and arrays
  const renderFields = (data, level = 0) => {
    if (!data || typeof data !== "object") return null;

    const entries = Array.isArray(data)
      ? data.map((value, index) => [String(index + 1), value])
      : Object.entries(data);

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {entries.map(([key, value]) => {
          if (ignoredFields.includes(key) || /^updated\s*by(_?id)?$/i.test(String(key).replace(/[_-]/g, " "))) return null;

          if (
            value === null ||
            value === undefined ||
            value === ""
          ) {
            return null;
          }

          if (key === "documents") return null;

          if (
            typeof value === "object" &&
            !Array.isArray(value) &&
            !(value instanceof Date)
          ) {
            const nestedEntries = Object.entries(value).filter(
              ([nestedKey, nestedValue]) =>
                !ignoredFields.includes(nestedKey) &&
                nestedValue !== null &&
                nestedValue !== undefined &&
                nestedValue !== ""
            );

            if (!nestedEntries.length) return null;

            return (
              <div
                key={key}
                className="col-span-1 sm:col-span-2 lg:col-span-3 border border-slate-100 rounded-xl p-4 bg-white"
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3">
                  {formatLabel(key)}
                </h4>

                {renderFields(value, level + 1)}
              </div>
            );
          }

          if (Array.isArray(value)) {
            if (!value.length) return null;

            return (
              <div
                key={key}
                className="col-span-1 sm:col-span-2 lg:col-span-3 border border-slate-100 rounded-xl p-4"
              >
                <h4 className="text-sm font-bold text-slate-700 mb-3">
                  {formatLabel(key)}
                </h4>

                <div className="space-y-3">
                  {value.map((item, index) => (
                    <div
                      key={item?._id || index}
                      className="bg-slate-50 rounded-lg p-3"
                    >
                      <p className="text-xs font-semibold text-blue-600 mb-2">
                        {formatLabel(key)} {index + 1}
                      </p>

                      {typeof item === "object"
                        ? renderFields(item, level + 1)
                        : <p className="text-sm text-slate-700">{formatValue(item)}</p>}
                    </div>
                  ))}
                </div>
              </div>
            );
          }

          return (
            <DetailItem
              key={key}
              label={formatLabel(key)}
              fieldKey={key}
              value={value}
            />
          );
        })}
      </div>
    );
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm mb-5">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
          <Icon size={19} className="text-blue-600" />
        </div>

        <h2 className="text-base font-bold text-slate-800">
          {title}
        </h2>
      </div>

      {children}
    </div>
  );

  if (loading) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin mx-auto mb-3" />
          <p className="text-sm text-slate-500">
            Loading shipment details...
          </p>
        </div>
      </div>
    );
  }

  if (error || !details) {
    return (
      <div className="fixed inset-0 z-50 bg-[#F8FAFC] p-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-semibold text-slate-600 mb-6"
        >
          <ArrowLeft size={18} />
          Back to Shipments
        </button>

        <div className="bg-white border border-red-100 rounded-2xl p-8 text-center max-w-xl mx-auto">
          <AlertCircle size={40} className="text-red-500 mx-auto mb-3" />

          <h2 className="text-lg font-bold text-slate-800">
            Unable to load shipment
          </h2>

          <p className="text-sm text-slate-500 mt-2">{error}</p>

          <button
            onClick={fetchShipmentDetails}
            className="mt-5 px-5 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-semibold inline-flex items-center gap-2"
          >
            <RefreshCw size={15} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  const cargo = details.cargo || {};
  const route = details.route || {};
  const documents = details.documents || [];

  const exporter = details.exporter || {};
  const importer = details.importer || {};

  const hsCode =
    cargo.hsCode?.hsCode ||
    cargo.hsCodeText ||
    cargo.hsCode ||
    "-";

  const shipmentNumber =
    details.sbNumber ||
    details.referenceNumber ||
    details._id;

  // Only Draft shipments can be edited. Approved and all other statuses are read-only.
  const canEditShipment = isDraftStatus(details);

  return (
    <div className="fixed inset-0 z-50 bg-[#F8FAFC] overflow-y-auto p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 mb-3"
            >
              <ArrowLeft size={17} />
              Back to Shipments
            </button>

            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
                Shipment Details
              </h1>

              <span className="px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold">
                {details.shipmentStatus || "Draft"}
              </span>
            </div>

            <p className="text-sm text-slate-500 mt-1">
              {shipmentNumber}
            </p>
          </div>

          {canEditShipment && (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold shadow-sm"
            >
              <Edit3 size={17} />
              Edit Shipment
            </button>
          )}
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            {
              label: "Shipment Number",
              value: shipmentNumber,
              icon: Package,
            },
            {
              label: "Shipment Mode",
              value: details.shipmentMode || route.mode,
              icon: Truck,
            },
            {
              label: "Shipment Status",
              value: details.shipmentStatus,
              icon: FileText,
            },
            {
              label: "Created On",
              value: formatDate(details.createdAt),
              icon: CalendarDays,
            },
          ].map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="bg-white border border-slate-200 rounded-2xl p-4 shadow-sm flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Icon size={19} className="text-blue-600" />
                </div>

                <div className="min-w-0">
                  <p className="text-[11px] text-slate-400">
                    {item.label}
                  </p>

                  <p className="text-sm font-bold text-slate-800 break-words">
                    {item.value || "-"}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BASIC SHIPMENT DETAILS */}
        <Section title="Basic Shipment Details" icon={Package}>
          {renderFields({
            customerType: details.customerType,
            shipmentType: details.shipmentType,
            shipmentMode: details.shipmentMode,
            shipmentPurpose: details.shipmentPurpose,
            exporter: details.exporter,
            referenceNumber: details.referenceNumber,
            sbNumber: details.sbNumber,
            bookingNo: details.bookingNo,
            incoterm: details.incoterm,
            etd: details.etd,
            eta: details.eta,
            carrier: details.carrier,
            additionalBasicDetails: details.additionalBasicDetails,
          })}
        </Section>

        {/* ROUTE */}
        <Section title="Origin & Destination Details" icon={MapPin}>
          {renderFields(route)}
        </Section>

        {/* CARGO */}
        <Section title="Product / Cargo Details" icon={Box}>
          {renderFields({
            ...cargo,
            hsCode,
            invoiceAmount: cargo.value ?? details.amount,
            currency: cargo.currency || details.currency,
          })}
        </Section>

        {/* PARTIES */}
        <Section title="Exporter Details" icon={Package}>
          {renderFields(exporter)}
        </Section>

        <Section title="Importer Details" icon={MapPin}>
          {renderFields(importer)}
        </Section>

        {/* PAYMENT */}
        <Section title="Invoice & Payment Details" icon={FileText}>
          {renderFields({
            amount: details.amount,
            currency: details.currency,
            paymentTerms: details.paymentTerms,
            paymentStatus: details.paymentStatus,
            insuranceRequired: details.insuranceRequired,
            exportIncentive: details.exportIncentive,
            invoice: details.invoice,
          })}
        </Section>

        {/* ADDITIONAL INFORMATION */}
        <Section title="Additional Information" icon={FileText}>
          {renderFields(details.additionalInformation || {})}

          {details.notes && (
            <div className="mt-3">
              {renderFields({ notes: details.notes })}
            </div>
          )}
        </Section>

        {/* DOCUMENTS */}
        <Section title="Uploaded Documents" icon={FileText}>
          {Array.isArray(documents) && documents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc, index) => {
                const documentUrl = getShipmentDocumentUrl(doc.fileUrl || doc.url || doc.path);

                return (
                  <div
                    key={doc._id || index}
                    className="border border-slate-200 bg-white rounded-xl p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center shrink-0">
                        <FileText size={20} className="text-blue-600" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-semibold text-slate-800 break-words">
                          {doc.documentName || doc.fileName || `Document ${index + 1}`}
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          {doc.documentType || doc.status || "Uploaded"}
                        </p>
                        {doc.fileSize && (
                          <p className="text-xs text-slate-400 mt-1">
                            {(Number(doc.fileSize) / 1024).toFixed(1)} KB
                          </p>
                        )}
                      </div>
                    </div>

                    {documentUrl ? (
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-slate-100">
                        <a
                          href={documentUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-800"
                        >
                          <Eye size={16} /> View Document
                        </a>
                        <a
                          href={documentUrl}
                          download={doc.fileName || doc.documentName || "document"}
                          className="text-sm font-semibold text-slate-600 hover:text-slate-900"
                        >
                          Download
                        </a>
                      </div>
                    ) : (
                      <p className="text-xs text-red-500 mt-4">Document URL is not available.</p>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-sm text-slate-400 bg-slate-50 border border-dashed border-slate-200 rounded-xl p-6 text-center">
              No documents uploaded.
            </div>
          )}
        </Section>

        {/* STATUS / OTHER SAVED INFORMATION */}
        <Section title="Shipment Status & Other Information" icon={Truck}>
          {renderFields({
            approvalStatus: details.approvalStatus,
            documentStatus: details.documentStatus,
            trackingStatus: details.trackingStatus,
            exceptionStatus: details.exceptionStatus,
            currentStep: details.currentStep,
            statusHistory: details.statusHistory,
          })}
        </Section>

        {/* SHOW OTHER SAVED FIELDS NOT COVERED ABOVE */}
        <Section title="Other Shipment Information" icon={FileText}>
          {renderFields(
            Object.fromEntries(
              Object.entries(details).filter(
                ([key]) =>
                  ![
                    "_id",
                    "__v",
                    "id",
                    "createdAt",
                    "updatedAt",
                    "userId",
                    "cargo",
                    "route",
                    "exporter",
                    "importer",
                    "documents",
                    "additionalInformation",
                    "shipmentType",
                    "shipmentMode",
                    "shipmentPurpose",
                    "customerType",
                    "referenceNumber",
                    "sbNumber",
                    "bookingNo",
                    "incoterm",
                    "etd",
                    "eta",
                    "carrier",
                    "amount",
                    "currency",
                    "paymentTerms",
                    "paymentStatus",
                    "insuranceRequired",
                    "exportIncentive",
                    "invoice",
                    "notes",
                    "shipmentStatus",
                    "approvalStatus",
                    "documentStatus",
                    "trackingStatus",
                    "exceptionStatus",
                    "currentStep",
                    "statusHistory",
                  ].includes(key)
              )
            )
          )}
        </Section>

        {/* FOOTER */}
        <div className="flex flex-col sm:flex-row justify-between gap-3 pb-8">
          <button
            onClick={onBack}
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-semibold text-slate-600 hover:bg-slate-50"
          >
            <ArrowLeft size={16} className="inline mr-2" />
            Back to Shipments
          </button>

          {canEditShipment && (
            <button
              onClick={handleEdit}
              className="flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold"
            >
              <Edit3 size={17} />
              Edit Shipment
            </button>
          )}
        </div>

      </div>
    </div>
  );
};

export default ViewShipment;