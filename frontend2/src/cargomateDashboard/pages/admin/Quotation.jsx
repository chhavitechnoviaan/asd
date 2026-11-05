// import { useState } from "react";
// import { LuX } from "react-icons/lu";
//  import { LuFileText, LuDownload, LuMapPin, LuUser, LuBuilding2, LuFileCheck, LuClipboardCheck } from "react-icons/lu";
// import DenyQuotation from "./DenyQuotation";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// const charges = [
//   { no: "", desc: "Ocean Freight", details: "1 x 20 FT FCL", amount: "\u20b945,000.00" },
//   { no: "1", desc: "Origin Handling Charges", details: "Mumbai cost", amount: "\u20b96,500.00" },
//   { no: "2", desc: "Documentation Charges", details: "Per shipment", amount: "\u20b92,000.00" },
//   { no: "3", desc: "Custom Clearnce", details: "Export", amount: "\u20b94,000.00" },
//   { no: "4", desc: "Destination Charges", details: "Felistone, UK", amount: "\u20b918,500.00" },
//   { no: "5", desc: "Insurance (0.3% of invoice value)", details: "Felistone, UK", amount: "\u20b918,500.00" },
// ];

// const timeline = [
//   { title: "Quotation sent", sub: "on 24 April 2025 by Arjun Soni", color: "bg-pink-400" },
//   { title: "Approved", sub: "on 24 April 2025 by Arjun Soni", color: "bg-green-500" },
//   { title: "Form Submitted", sub: "on 24 April 2025 by xyz traders", color: "bg-blue-400" },
// ];

// export default function Quotation({onClose}) {
//   const navigate = useNavigate()
//   const [deny, setDeny] = useState(false)
//   const denyQuotation = () => {
//       setDeny(true)
//   }
//   return (
//     <div className=" fixed inset-0 z-[20] bg-black/50 backdrop-blur-sm p-4 sm:p-6 flex items-center  transparent justify-center">
//     { !deny && ( 
//        <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl border border-gray-200 p-5 shadow-2xl">
//        <div className="flex flex-col"> 
//         <div className="flex justify-end p-1"> 

//          {/* <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center text-red-500 shrink-0"> */}
//               <LuX onClick={onClose} size={22} className="cursor-pointer" />
            
//              </div>
//         <div className="flex items-center justify-between mb-6">
//           <div className="flex items-center gap-2">
//             <LuFileText className="text-blue-500" size={20} />
//             <h1 className="text-lg font-semibold text-gray-900">Quotation</h1>
//             <span className="px-2 py-0.5 rounded-md text-xs bg-gray-100 text-gray-500">QT-2504-0011</span>
//           </div>
//           <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-300 text-xs font-medium text-gray-700">
//             <LuDownload size={14} /> Download PDF
//           </button>
//         </div>
//         </div>

//         <div className="border border-gray-200 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//           <div>
//             <p className="text-xs text-gray-400">Quotation No.: QT-2025-0001</p>
//             <p className="text-xs text-gray-400">Sent on 24 April 2025 ,11:45</p>
//           </div>
//           <div>
//             <p className="text-xl font-semibold text-blue-600">79,000.00</p>
//             <p className="text-xs text-gray-400">Total Amount</p>
//           </div>
//           <div className="text-sm">
//             <p className="text-gray-500">Status <span className="text-purple-500 font-medium">Quotation Sent</span></p>
//             <p className="text-gray-500">Valid <span className="text-gray-900">08 May 2025</span></p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
//           <div className="border border-gray-200 rounded-xl p-4">
//             <p className="flex items-center gap-2 text-xs text-gray-400 mb-2"><LuBuilding2 size={14} /> From</p>
//             <p className="text-blue-600 font-medium text-sm mb-1">ASD Company</p>
//             <p className="text-xs text-gray-500 leading-relaxed">
//               123, business park, indore<br />
//               9876543213<br />
//               abc@gmail.com
//             </p>
//           </div>
//           <div className="border border-gray-200 rounded-xl p-4">
//             <p className="flex items-center gap-2 text-xs text-gray-400 mb-2"><LuUser size={14} /> To</p>
//             <p className="text-blue-600 font-medium text-sm mb-1">xyz Traders</p>
//             <p className="text-xs text-gray-500 leading-relaxed">
//               xyz@gmail.com<br />
//               9876543213<br />
//               123 market, surat<br />
//               Gujarat- 395002
//             </p>
//           </div>
//         </div>

//         <div className="border border-gray-200 rounded-xl p-4 mb-4">
//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
//             <div>
//               <p className="text-gray-400 mb-1">Shipment Route</p>
//               <p className="text-gray-900 font-medium">IND &gt; UK</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Shipment Type</p>
//               <p className="text-gray-900 font-medium">Export</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Submitted on</p>
//               <p className="text-gray-900 font-medium">24 Apr 2025</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Port of Loading</p>
//               <p className="text-gray-900 font-medium">Mumbai Cost</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Shipment mode</p>
//               <p className="text-gray-900 font-medium">Sea Freight (FCL)</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Approved on</p>
//               <p className="text-gray-900 font-medium">30 Apr 2025</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Port of Discharge</p>
//               <p className="text-gray-900 font-medium">Felistone, UK</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Incoterm</p>
//               <p className="text-gray-900 font-medium">FOB</p>
//             </div>
//             <div>
//               <p className="text-gray-400 mb-1">Requested ID</p>
//               <p className="text-gray-900 font-medium">Req-2504-7612</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-4">
//           <div className="lg:col-span-2 border border-gray-200 rounded-xl p-4">
//             <p className="text-sm font-semibold text-gray-900 mb-3">Charges Breakdown</p>
//             <table className="w-full text-xs">
//               <thead>
//                 <tr className="text-left text-gray-400 border-b border-gray-100">
//                   <th className="pb-2 font-medium w-6">#</th>
//                   <th className="pb-2 font-medium">Description</th>
//                   <th className="pb-2 font-medium">Details</th>
//                   <th className="pb-2 font-medium text-right">Amount (INR)</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {charges.map((c, i) => (
//                   <tr key={i} className="border-b border-gray-50">
//                     <td className="py-2 text-gray-400">{c.no}</td>
//                     <td className="py-2 text-gray-900">{c.desc}</td>
//                     <td className="py-2 text-gray-500">{c.details}</td>
//                     <td className="py-2 text-gray-900 text-right">{c.amount}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//             <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-200">
//               <p className="text-sm font-semibold text-blue-600">Total INR</p>
//               <p className="text-sm font-semibold text-blue-600">₹79,000.00</p>
//             </div>
//           </div>

//           <div className="flex flex-col gap-4">
//             <div className="border border-gray-200 rounded-xl p-4 text-xs space-y-2">
//               <p className="text-gray-400 font-medium mb-1">Summary</p>
//               <div className="flex justify-between text-gray-500"><span>Sub Total</span><span>₹79,000.00</span></div>
//               <div className="flex justify-between text-gray-500"><span>Discount</span><span className="text-green-500">-₹0.00</span></div>
//               <div className="flex justify-between text-gray-500"><span>Tax(0%)</span><span>₹0.00</span></div>
//               <div className="flex justify-between font-semibold text-blue-600 pt-1 border-t border-gray-100"><span>Total Amt</span><span>₹79,000.00</span></div>
//             </div>
//             <div className="border border-gray-200 rounded-xl p-4 text-xs">
//               <p className="text-gray-400 font-medium mb-1">Notes</p>
//               <p className="text-gray-500">This quotation is valid till 08 May 2025</p>
//             </div>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
//           <div className="border border-gray-200 rounded-xl p-3">
//             <p className="text-xs text-gray-400">Quote Version</p>
//             <p className="text-sm font-semibold text-gray-900">V.2</p>
//           </div>
//           <div className="border border-gray-200 rounded-xl p-3">
//             <p className="text-xs text-gray-400">Freight Quote</p>
//             <p className="text-sm font-semibold text-gray-900">1,85,000.00</p>
//           </div>
//           <div className="border border-gray-200 rounded-xl p-3">
//             <p className="text-xs text-gray-400">Valid From</p>
//             <p className="text-sm font-semibold text-gray-900">25 Apr 2025</p>
//           </div>
//           <div className="border border-gray-200 rounded-xl p-3">
//             <p className="text-xs text-gray-400">Valid Until</p>
//             <p className="text-sm font-semibold text-gray-900">8 May 2025</p>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           <div className="lg:col-span-2 border border-gray-200 rounded-xl p-4">
//             <p className="flex items-center gap-2 text-sm font-semibold text-gray-900 mb-2">
//               <LuFileCheck size={16} /> Terms &amp; Conditions
//             </p>
//             <p className="text-xs text-gray-500 leading-relaxed">
//               This quotation valid till the date mentioned above.<br />
//               Freight is subject to change in case of fuel surcharge version.<br />
//               Booking is subject to space availability at time of confirmation.<br />
//               All disputes are subject to Mumbai jurisdiction.
//             </p>
//           </div>
//           <div className="border border-gray-200 rounded-xl p-4">
//             <p className="text-sm font-semibold text-gray-900 mb-3">Activity timeline</p>
//             <div className="space-y-3">
//               {timeline.map((t) => (
//                 <div key={t.title} className="flex gap-2">
//                   <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${t.color}`} />
//                   <div>
//                     <p className="text-xs font-medium text-gray-900">{t.title}</p>
//                     <p className="text-[11px] text-gray-400">{t.sub}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//           <div className="flex justify-between items-center">
//              <div>
//              <button onClick={onClose} className="w-full sm:w-auto px-5 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 flex items-center justify-center gap-2">
//             <LuMapPin size={14} /> Back to Shipment
//           </button>
//           </div>
//         <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
         
//           <button className="w-full sm:w-auto px-5 py-2 rounded-lg bg-blue-600 text-white text-sm font-medium flex items-center justify-center gap-2">
//             <LuClipboardCheck size={14} /> Accept Quotation
//           </button>
//           <button onClick={() => denyQuotation()} className="text-white bg-red-500 px-3 py-1 rounded-lg">
//              Deny Quotation
//           </button>
//         </div> </div>
         
//       </div>
//      )}

//         { deny && (<DenyQuotation setDeny={setDeny} />)}
//        {}
//     </div>
//   );
// }

// mahima code //

import React, { useMemo, useState } from "react";
import {
  LuFileText,
  LuMapPin,
  LuUser,
  LuBuilding2,
  LuFileCheck,
  LuPlus,
  LuTrash2,
  LuSend,
  LuSave,
  LuLoaderCircle,
} from "react-icons/lu";

import {
  createQuotation,
  shareQuotation,
} from "../../api/quotation";

export default function CreateQuotation({
  shipment,
  onClose,
  onSuccess,
}) {
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [createdQuotation, setCreatedQuotation] =
    useState(null);

  // ==========================================
  // NORMALIZE SHIPMENT DATA
  // API RESPONSE STRUCTURE:
  // {
  //   status: 1,
  //   message: "...",
  //   data: {
  //      header,
  //      route,
  //      shipmentInfo,
  //      overview,
  //      parties,
  //      activity
  //   }
  // }
  // ==========================================

  const shipmentData =
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

    console.log("CREATE QUOTATION RECEIVED SHIPMENT:", shipment);
console.log("CREATE QUOTATION NORMALIZED SHIPMENT:", shipmentData);


  // Original MongoDB shipment ID
  // Parent component se aa sakta hai
  const shipmentMongoId =
  shipmentData?._id ||
  shipmentData?.mongoId ||
  shipmentData?.header?.mongoId ||
  shipmentData?.header?._id ||
  shipmentData?.shipmentInfo?.mongoId ||
  shipmentData?.shipmentInfo?._id ||
  shipment?._id ||
  shipment?.data?._id ||
  shipment?.data?.mongoId ||
  null;

console.log("FINAL SHIPMENT MONGODB ID:", shipmentMongoId);
const getValue = (...values) => {
  const value = values.find((item) => item !== undefined && item !== null && item !== "");
  if (value === undefined) return "-";
  if (typeof value === "object") {
    return value.name || value.companyName || value.city || value.label || value.value || value.country || "-";
  }
  return value;
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN");
};

  // Main shipment reference number
  const shipmentReferenceId = getValue(
    shipmentData?.header?.shipmentId,
    shipmentData?.shipmentId,
    shipmentData?.shipmentInfo?.shipmentId,
    shipmentData?.sbNumber,
    shipmentData?.bookingNumber,
    shipmentData?.referenceNumber,
    shipment?.shipmentId,
    shipment?._id
  );

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    quotationNumber: "",
    quoteVersion: "V.1",

    currency: "INR",

    validFrom: new Date()
      .toISOString()
      .split("T")[0],

    validUntil: "",

    freightQuote: "",

    discount: 0,
    tax: 0,

    notes: "",

    termsAndConditions: `This quotation is valid till the date mentioned above.
Freight is subject to change in case of fuel surcharge variation.
Booking is subject to space availability at the time of confirmation.
All disputes are subject to applicable jurisdiction.`,

    charges: [
      {
        name: "",
        description: "",
        amount: "",
      },
    ],
  });

  // ==========================================
// HELPERS
// ==========================================



  // ==========================================
  // CALCULATIONS
  // ==========================================

  const subtotal = useMemo(() => {
    return formData.charges.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );
  }, [formData.charges]);

  const totalAmount = useMemo(() => {
    return (
      subtotal -
      Number(formData.discount || 0) +
      Number(formData.tax || 0)
    );
  }, [
    subtotal,
    formData.discount,
    formData.tax,
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: formData.currency || "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CHARGE CHANGE
  // ==========================================

  const handleChargeChange = (
    index,
    field,
    value
  ) => {
    setFormData((prev) => {
      const updatedCharges = [
        ...prev.charges,
      ];

      updatedCharges[index] = {
        ...updatedCharges[index],
        [field]: value,
      };

      return {
        ...prev,
        charges: updatedCharges,
      };
    });
  };

  // ==========================================
  // ADD CHARGE
  // ==========================================

  const addCharge = () => {
    setFormData((prev) => ({
      ...prev,
      charges: [
        ...prev.charges,
        {
          name: "",
          description: "",
          amount: "",
        },
      ],
    }));
  };

  // ==========================================
  // REMOVE CHARGE
  // ==========================================

  const removeCharge = (index) => {
    setFormData((prev) => ({
      ...prev,
      charges: prev.charges.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ==========================================
  // CREATE QUOTATION
  // ==========================================

  const handleCreateQuotation = async () => {
    // ============================
    // VALIDATE SHIPMENT ID
    // ============================
  
    if (!shipmentMongoId) {
      console.error("SHIPMENT ID NOT FOUND");
      console.log("FULL SHIPMENT OBJECT:", shipment);
      console.log("NORMALIZED SHIPMENT DATA:", shipmentData);
  
      alert(
        "Shipment MongoDB ID not found. Please check shipment data."
      );
  
      return;
    }
  
    // ============================
    // VALIDATE VALID UNTIL
    // ============================
  
    if (!formData.validUntil) {
      alert("Please select valid until date");
      return;
    }
  
    // ============================
    // FILTER VALID CHARGES
    // ============================
  
    const validCharges = formData.charges.filter(
      (item) =>
        item.name?.trim() &&
        item.amount !== "" &&
        Number(item.amount) >= 0
    );
  
    if (!validCharges.length) {
      alert("Please add at least one valid charge");
      return;
    }
  
    try {
      setLoading(true);
  
      const payload = {
        shipmentId: shipmentMongoId,
  
        quotationNumber:
          formData.quotationNumber?.trim() || undefined,
  
        quoteVersion:
          formData.quoteVersion || "V.1",
  
        validFrom:
          formData.validFrom,
  
        validUntil:
          formData.validUntil,
  
        freightQuote:
          Number(formData.freightQuote || 0),
  
        currency:
          formData.currency || "INR",
  
        charges: validCharges.map((item) => ({
          name: item.name.trim(),
  
          description:
            item.description?.trim() || "",
  
          amount:
            Number(item.amount || 0),
  
          currency:
            formData.currency || "INR",
        })),
  
        discount:
          Number(formData.discount || 0),
  
        tax:
          Number(formData.tax || 0),
  
        notes:
          formData.notes?.trim() || "",
  
        termsAndConditions:
          formData.termsAndConditions?.trim() || "",
      };
  
      console.log(
        "FINAL CREATE QUOTATION PAYLOAD:",
        payload
      );
  
      console.log(
        "SHIPMENT ID BEING SENT:",
        shipmentMongoId
      );
  
      const response =
        await createQuotation(payload);


  
      console.log(
        "CREATE QUOTATION RESPONSE:",
        response.data
      );
  
      const quotation =
        response.data?.data ||
        response.data?.quotation ||
        response.data;
  
      setCreatedQuotation(quotation);
  
      alert("Quotation created successfully");
  
      if (onSuccess) {
        onSuccess(quotation);
      }
  
    } catch (error) {
      console.error(
        "CREATE QUOTATION ERROR:",
        error
      );
  
      console.error(
        "BACKEND ERROR:",
        error?.response?.data
      );
  
      alert(
        error?.response?.data?.message ||
        "Failed to create quotation"
      );
  
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SHARE QUOTATION
  // ==========================================

  const handleShareQuotation = async () => {
    if (!shipmentMongoId) {
      alert("Shipment ID not found");
      return;
    }
  
    if (!formData.validUntil) {
      alert("Please select valid until date");
      return;
    }
  
    const validCharges = formData.charges.filter(
      (item) =>
        item.name?.trim() &&
        item.amount !== "" &&
        Number(item.amount) >= 0
    );
  
    if (!validCharges.length) {
      alert("Please add at least one valid charge");
      return;
    }
  
    try {
      setSharing(true);
  
      // 1. CREATE QUOTATION
      const payload = {
        shipmentId: shipmentMongoId,
  
        quotationNumber:
          formData.quotationNumber?.trim() || undefined,
  
        quoteVersion:
          formData.quoteVersion || "V.1",
  
        validFrom: formData.validFrom,
  
        validUntil: formData.validUntil,
  
        freightQuote:
          Number(formData.freightQuote || 0),
  
        currency:
          formData.currency || "INR",
  
        charges: validCharges.map((item) => ({
          name: item.name.trim(),
  
          description:
            item.description?.trim() || "",
  
          amount:
            Number(item.amount || 0),
  
          currency:
            formData.currency || "INR",
        })),
  
        discount:
          Number(formData.discount || 0),
  
        tax:
          Number(formData.tax || 0),
  
        notes:
          formData.notes?.trim() || "",
  
        termsAndConditions:
          formData.termsAndConditions?.trim() || "",
      };
  
      console.log(
        "CREATE + SHARE PAYLOAD:",
        payload
      );
  
      const createResponse =
        await createQuotation(payload);
  
      console.log(
        "CREATE RESPONSE:",
        createResponse.data
      );
  
      const quotation =
        createResponse.data?.data ||
        createResponse.data?.quotation ||
        createResponse.data;
  
      const quotationId =
        quotation?._id ||
        quotation?.id;
  
      if (!quotationId) {
        throw new Error(
          "Quotation created but quotation ID not found"
        );
      }
  
      console.log(
        "CREATED QUOTATION ID:",
        quotationId
      );
  
      // 2. SHARE QUOTATION
      const shareResponse =
        await shareQuotation(quotationId);
  
      console.log(
        "SHARE RESPONSE:",
        shareResponse.data
      );
  
      const sharedQuotation =
        shareResponse.data?.data ||
        shareResponse.data?.quotation ||
        shareResponse.data;
  
      alert(
        "Quotation shared successfully with B2B"
      );
  
      if (onSuccess) {
        onSuccess(sharedQuotation);
      }
  
      // 3. CLOSE POPUP
      onClose();
  
    } catch (error) {
      console.error(
        "CREATE + SHARE ERROR:",
        error
      );
  
      console.error(
        "BACKEND ERROR:",
        error?.response?.data
      );
  
      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to share quotation"
      );
    } finally {
      setSharing(false);
    }
  };

  // ==========================================
  // HELPER VALUES
  // ==========================================

// ==========================================
// NORMALIZED SHIPMENT VALUES
// ==========================================

const header =
  shipmentData?.header ||
  shipment?.header ||
  {};

const shipmentInfo =
  shipmentData?.shipmentInfo ||
  shipmentData?.shipment ||
  shipmentData ||
  {};

const overview =
  shipmentData?.overview ||
  {};

const parties =
  shipmentData?.parties ||
  shipmentData?.partyDetails ||
  shipmentData?.shipmentParties ||
  {};

const route =
  shipmentData?.route ||
  shipmentData?.shippingRoute ||
  shipmentData?.shipmentInfo?.route ||
  header?.route ||
  shipmentData?.routeDetails ||
  {};

const activity =
  shipmentData?.activity ||
  shipmentData?.activities ||
  shipmentData?.timeline ||
  [];

// ==========================================
// EXPORTER / CUSTOMER
// ==========================================

const exporter =
  parties?.exporter ||
  shipmentData?.exporter ||
  shipmentInfo?.exporter ||
  shipmentData?.customer ||
  shipmentData?.buyer ||
  shipmentInfo?.buyer ||
  {};

const importer =
  parties?.importer ||
  shipmentData?.importer ||
  shipmentInfo?.importer ||
  shipmentData?.buyer ||
  shipmentInfo?.buyer ||
  {};

// ==========================================
// ROUTE VALUES
// ==========================================

const originCountry = getValue(
  route?.originCountry,
  route?.origin?.country,
  typeof route?.origin === "string" ? route.origin : "",
  shipmentData?.originCountry,
  shipmentInfo?.originCountry
);

const destinationCountry = getValue(
  route?.destinationCountry,
  route?.destination?.country,
  typeof route?.destination === "string" ? route.destination : "",
  shipmentData?.destinationCountry,
  shipmentInfo?.destinationCountry
);

// Shipment schema stores origin/destination city and country under route.
const portOfLoading = getValue(
  route?.portOfLoading,
  route?.loadingPort,
  route?.originPort,
  route?.originCity ? [route.originCity, route.originCountry].filter(Boolean).join(", ") : "",
  shipmentData?.portOfLoading,
  shipmentInfo?.portOfLoading
);

const portOfDischarge = getValue(
  route?.portOfDischarge,
  route?.dischargePort,
  route?.destinationPort,
  route?.destinationCity ? [route.destinationCity, route.destinationCountry].filter(Boolean).join(", ") : "",
  shipmentData?.portOfDischarge,
  shipmentInfo?.portOfDischarge
);

const shipmentType = getValue(
  shipmentInfo?.shipmentType,
  shipmentInfo?.type,
  shipmentData?.shipmentType,
  shipmentData?.type,
  header?.shipmentType
);

const shipmentMode = getValue(
  shipmentInfo?.shipmentMode,
  shipmentInfo?.mode,
  shipmentData?.shipmentMode,
  shipmentData?.mode,
  route?.mode,
  header?.mode
);

const incoterm = getValue(
  shipmentInfo?.incoterm,
  shipmentData?.incoterm,
  shipmentData?.shipmentTerms?.incoterm,
  header?.incoterm
);

const submittedActivity = Array.isArray(activity)
  ? activity.find(
      (item) =>
        item.type === "SHIPMENT_SUBMITTED" ||
        item.type === "SUBMITTED"
    )
  : null;

const submittedDate = getValue(
  submittedActivity?.createdAt
    ? formatDate(submittedActivity.createdAt)
    : null,

  overview?.createdOn
    ? formatDate(overview.createdOn)
    : null,

  shipmentData?.shipmentDate
    ? formatDate(shipmentData.shipmentDate)
    : null,

  shipmentData?.submittedAt
    ? formatDate(shipmentData.submittedAt)
    : null,

  shipmentData?.createdAt
    ? formatDate(shipmentData.createdAt)
    : null
);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-0 sm:p-4">
      <div className="relative flex max-h-[100dvh] w-full max-w-7xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl sm:max-h-[94vh] sm:rounded-[28px] sm:border sm:border-white/50">
        {/* Premium header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-r from-[#102b46] via-[#173e60] to-[#245a78] px-5 py-5 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/[0.06]" />
          <div className="pointer-events-none absolute right-40 -top-28 h-56 w-56 rounded-full bg-cyan-300/[0.08] blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                <LuFileText size={23} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Create Quotation</h1>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    createdQuotation?.status === "Shared"
                      ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-100"
                      : "border-white/20 bg-white/10 text-slate-100"
                  }`}>
                    {createdQuotation?.status || "New quotation"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-blue-100/80 sm:text-sm">
                  Prepare freight charges, review shipment information and share with your B2B customer.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-blue-100/75">
                  <span className="inline-flex items-center gap-1.5"><LuFileText size={13} /> Quote {formData.quoteVersion || "V.1"}</span>
                  <span className="inline-flex items-center gap-1.5"><LuMapPin size={13} /> Shipment {shipmentReferenceId}</span>
                </div>
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close quotation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white">
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>

        {/* Scrollable form */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Quotation details */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><LuFileText size={17} /></div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Quotation details</h2>
                  <p className="mt-0.5 text-[11px] text-slate-500">Set the quote reference, currency and validity period.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
                <FormField label="Quotation number" hint="Automatically generated by the system after saving">
                  <input type="text" value="Auto-generated" readOnly disabled className={`${fieldClass} cursor-not-allowed bg-slate-100 text-slate-500`} />
                </FormField>
                <FormField label="Quote version">
                  <input type="text" name="quoteVersion" value={formData.quoteVersion} onChange={handleChange} placeholder="V.1" className={fieldClass} />
                </FormField>
                <FormField label="Currency">
                  <select name="currency" value={formData.currency} onChange={handleChange} className={fieldClass}>
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — Pound Sterling</option>
                  </select>
                </FormField>
                <FormField label="Freight quote">
                  <input type="number" min="0" name="freightQuote" value={formData.freightQuote} onChange={handleChange} placeholder="Enter freight quote" className={fieldClass} />
                </FormField>
                <FormField label="Valid from">
                  <input type="date" name="validFrom" value={formData.validFrom} onChange={handleChange} className={fieldClass} />
                </FormField>
                <FormField label="Valid until" required>
                  <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} className={fieldClass} />
                </FormField>
              </div>
            </section>

            {/* From / To */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><LuBuilding2 size={16} /></span>
                  <div><h3 className="text-sm font-semibold text-slate-900">Quotation from</h3><p className="text-[11px] text-slate-500">Service provider</p></div>
                </div>
                <p className="text-base font-semibold text-[#17486a]">ASD Company</p>
                <p className="mt-1 text-xs text-slate-500">Admin / Company Details</p>
              </section>
              <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm"><LuUser size={16} /></span>
                  <div><h3 className="text-sm font-semibold text-slate-900">Quotation to</h3><p className="text-[11px] text-slate-500">Customer / exporter</p></div>
                </div>
                <p className="text-base font-semibold text-[#17486a]">{getValue(exporter?.companyName, exporter?.name, exporter?.contactPerson, exporter?.fullName, shipmentData?.customerName)}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  {getValue(exporter?.contactPerson, exporter?.name, exporter?.fullName) !== "-" && <p>{getValue(exporter?.contactPerson, exporter?.name, exporter?.fullName)}</p>}
                  {getValue(exporter?.email, exporter?.emailAddress, exporter?.contact?.email) !== "-" && <p>{getValue(exporter?.email, exporter?.emailAddress, exporter?.contact?.email)}</p>}
                  {getValue(exporter?.mobile, exporter?.phone, exporter?.mobileNumber, exporter?.contact?.phone) !== "-" && <p>{getValue(exporter?.mobile, exporter?.phone, exporter?.mobileNumber, exporter?.contact?.phone)}</p>}
                </div>
              </section>
            </div>

            {/* Shipment snapshot */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><LuMapPin size={17} /></div>
                <div><h2 className="text-sm font-semibold text-slate-900">Shipment overview</h2><p className="text-[11px] text-slate-500">Reference information linked to this quotation.</p></div>
              </div>
              <div className="mb-4 rounded-xl bg-gradient-to-r from-[#123653] to-[#24617c] p-4 text-white">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-blue-100/70">Shipment route</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold sm:text-base">
                  <span>{originCountry}</span><span className="text-cyan-200">→</span><span>{destinationCountry}</span>
                </div>
                <p className="mt-2 text-[11px] text-blue-100/75">Shipment reference: {shipmentReferenceId}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                <DetailItem label="Shipment type" value={shipmentType} />
                <DetailItem label="Shipment mode" value={shipmentMode} />
                <DetailItem label="Port of loading" value={portOfLoading} />
                <DetailItem label="Port of discharge" value={portOfDischarge} />
                <DetailItem label="Incoterm" value={incoterm} />
                <DetailItem label="Submitted on" value={submittedDate} />

                <DetailItem label="Requested ID" value={shipmentReferenceId} />
              </div>
            </section>

            {/* Charges */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><LuFileCheck size={17} /></div>
                  <div><h2 className="text-sm font-semibold text-slate-900">Charges breakdown</h2><p className="text-[11px] text-slate-500">Add each service charge to the quotation.</p></div>
                </div>
                <button type="button" onClick={addCharge} className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                  <LuPlus size={15} /> Add charge
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {formData.charges.map((charge, index) => (
                    <div key={index} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-[42px_1.1fr_1.2fr_0.8fr_38px] sm:items-end sm:p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-semibold text-slate-500 shadow-sm">#{index + 1}</div>
                      <FormField label="Charge name">
                        <input value={charge.name} onChange={(e) => handleChargeChange(index, "name", e.target.value)} placeholder="e.g. Freight charges" className={fieldClass} />
                      </FormField>
                      <FormField label="Details">
                        <input value={charge.description} onChange={(e) => handleChargeChange(index, "description", e.target.value)} placeholder="Add a short description" className={fieldClass} />
                      </FormField>
                      <FormField label={`Amount (${formData.currency})`}>
                        <input type="number" min="0" value={charge.amount} onChange={(e) => handleChargeChange(index, "amount", e.target.value)} placeholder="0.00" className={fieldClass} />
                      </FormField>
                      <button type="button" disabled={formData.charges.length === 1} onClick={() => removeCharge(index)} aria-label={`Remove charge ${index + 1}`} className="flex h-10 w-10 items-center justify-center rounded-xl text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-slate-300">
                        <LuTrash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                  <span className="text-xs font-semibold text-slate-600">Charges subtotal</span>
                  <span className="text-base font-bold text-[#17486a]">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </section>

            {/* Notes + summary */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.85fr]">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><LuFileText size={17} /></div>
                  <div><h2 className="text-sm font-semibold text-slate-900">Additional notes</h2><p className="text-[11px] text-slate-500">Optional information for the customer.</p></div>
                </div>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={6} placeholder="Enter quotation notes..." className={`${fieldClass} min-h-[130px] resize-y`} />
              </section>
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">Quotation summary</h2>
                <p className="mt-1 text-[11px] text-slate-500">Review the final payable amount.</p>
                <div className="mt-5 space-y-4 text-xs">
                  <div className="flex justify-between gap-3 text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span></div>
                  <FormField label="Discount">
                    <input type="number" min="0" name="discount" value={formData.discount} onChange={handleChange} className={fieldClass} />
                  </FormField>
                  <FormField label="Tax">
                    <input type="number" min="0" name="tax" value={formData.tax} onChange={handleChange} className={fieldClass} />
                  </FormField>
                  <div className="rounded-xl bg-[#123653] p-4 text-white">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-blue-100/70">Total quotation value</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{formatCurrency(totalAmount)}</p>
                    <p className="mt-1 text-[10px] text-blue-100/70">Including entered discount and tax</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Terms */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><LuFileCheck size={17} /></div>
                <div><h2 className="text-sm font-semibold text-slate-900">Terms & conditions</h2><p className="text-[11px] text-slate-500">These terms will be included with the quotation.</p></div>
              </div>
              <textarea name="termsAndConditions" value={formData.termsAndConditions} onChange={handleChange} rows={5} className={`${fieldClass} min-h-[120px] resize-y`} />
            </section>
          </div>
        </div>

        {/* Sticky footer actions */}
        <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7 sm:py-4">
          <div className="mx-auto flex max-w-6xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={onClose} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto">
              <LuMapPin size={15} /> Back to shipment
            </button>
            <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
              <button type="button" onClick={handleShareQuotation} disabled={sharing || loading} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#17486a] to-[#24617c] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto">
                {sharing ? <LuLoaderCircle size={15} className="animate-spin" /> : <LuSend size={15} />}
                {sharing ? "Sharing quotation..." : "Create & share quotation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

function FormField({ label, hint, required, children }) {
  return (
    <label className="block min-w-0">
      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
        {label}{required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-slate-400">{hint}</span>}
    </label>
  );
}

// ==========================================
// DETAIL ITEM
// ==========================================
function DetailItem({ label, value }) {
  if (value === undefined || value === null || value === "" || value === "-") return null;

  return (
    <div className="min-w-0 border-b border-slate-100 pb-3">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="break-words text-xs font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}