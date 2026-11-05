// import { LuFileText, LuPackage, LuShip, LuAnchor, LuTruck, LuCircleCheck, LuDownload } from "react-icons/lu";
// import {
//   FaPlus, FaMagnifyingGlass, FaXmark, FaChevronDown,
//   FaStar, FaTruck, FaBoxOpen, FaWarehouse, FaFileContract
// } from "react-icons/fa6";

// const timelineSteps = [
//   { title: "Booking Confirmed", date: "10 Apr 2026", time: "09:45 AM", icon: LuFileText, done: true },
//   { title: "Picked Up", date: "12 Apr 2026", time: "11:20 AM", icon: LuPackage, done: true },
//   { title: "Departed", date: "18 Apr 2026", time: "03:30 PM", icon: LuShip, done: true },
//   { title: "In Transit", date: "20 Apr 2026", time: "04:30 PM", icon: LuAnchor, done: true },
//   { title: "Arrived at destination", date: "", time: "", icon: LuTruck, done: false },
//   { title: "Delivered", date: "", time: "", icon: LuCircleCheck, done: false },
// ];

// const documents = [
//   { name: "Commercial Invoice.pdf", size: "245KB", color: "text-red-500" },
//   { name: "Packing List.pdf", size: "180KB", color: "text-green-500" },
//   { name: "Bill of Lading.pdf", size: "210KB", color: "text-red-500" },
//   { name: "Certificate of Origin.pdf", size: "150KB", color: "text-green-500" },
//   { name: "Insurance Certificate.pdf", size: "175KB", color: "text-orange-500" },
// ];

// export default function ShipmentDetails({onClose}) {
//   return (
//     <div className=" bg-gray-50  flex justify-center  rounded-2xl">
//       <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 p-5 sm:p-8 flex flex-col max-h-[80vh]">
//         <div className="flex justify-between items-start"> 
//         <div className="flex flex-wrap items-center gap-3 mb-6 shrink-0">
//           <div className="w-11 h-11 rounded-full bg-green-100 flex items-center justify-center text-green-600 shrink-0">
//             <LuFileText size={20} />
//           </div>
//           <h1 className="text-xl font-bold text-gray-900">Shipment Details - SB2025-00321</h1>
//           <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-600">In Transit</span>
//         </div>
//         <div> <button onClick={onClose}> <FaXmark className="text-lg"/></button></div>
//         </div>
//         <div className="overflow-y-auto pr-1">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-sm mb-6">
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">SB/AWB No.</p>
//               <p className="text-gray-500 sm:mt-1">SB2025-00321<br />BOL:MSCU9823441</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">ETA/ETD</p>
//               <p className="text-gray-500 sm:mt-1">ETD: 18 APR 2026<br />ETA: 12 MAY 2026</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Exporter</p>
//               <p className="text-gray-500 sm:mt-1">Sunfresh Export Pvt Ltd<br />IEC: 0514092847</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Status</p>
//               <p className="text-green-600 sm:mt-1 font-medium">In Transit</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Origin- Destination</p>
//               <p className="text-gray-500 sm:mt-1">HYD ICD-Hamburg, DE</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Created On</p>
//               <p className="text-gray-500 sm:mt-1">10 Apr 2026, 09:45 AM</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">HS Code</p>
//               <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs bg-green-100 text-green-600">6109.10</span>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Last Updated</p>
//               <p className="text-gray-500 sm:mt-1">20 Apr 2026, 04:30 AM</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Carrier</p>
//               <p className="text-gray-500 sm:mt-1">MSC</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Created By</p>
//               <p className="text-gray-500 sm:mt-1">Ramesh Kumar</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Mode</p>
//               <p className="text-gray-500 sm:mt-1">Sea FCL</p>
//             </div>
//             <div className="flex justify-between sm:block">
//               <p className="font-semibold text-gray-900">Updated By</p>
//               <p className="text-gray-500 sm:mt-1">System</p>
//             </div>
//           </div>

//           <div className="border border-gray-200 rounded-2xl p-4 sm:p-6 mb-6">
//             <p className="text-sm font-semibold text-gray-900 mb-6">Shipment Timeline</p>
//             <div className="overflow-x-auto">
//               <div className="flex items-start justify-between gap-2 min-w-[640px] sm:min-w-0">
//                 {timelineSteps.map((step, i) => {
//                   const Icon = step.icon;
//                   return (
//                     <div key={step.title} className="flex flex-col items-center text-center flex-1 relative">
//                       {i !== timelineSteps.length - 1 && (
//                         <span className="absolute top-6 left-1/2 w-full h-px border-t-2 border-dashed border-gray-200 -z-0" />
//                       )}
//                       <div
//                         className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center mb-3 ${
//                           step.done ? "bg-green-100 text-green-600" : "bg-white border-2 border-gray-200 text-gray-300"
//                         }`}
//                       >
//                         <Icon size={20} />
//                       </div>
//                       <p className="text-xs font-semibold text-gray-900">{step.title}</p>
//                       {step.date && (
//                         <p className="text-[11px] text-gray-400 mt-1">
//                           {step.date}<br />{step.time}
//                         </p>
//                       )}
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//             <div>
//               <p className="text-sm font-semibold text-gray-900 mb-3">Shipment Information</p>
//               <div className="space-y-2 text-sm">
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Commodity</span>
//                   <span className="text-gray-900">Mens/Womens Cotton T-Shirts</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Package</span>
//                   <span className="text-gray-900">1000 Cartons</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Gross Weight</span>
//                   <span className="text-gray-900">12000 KGS</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Net Weight</span>
//                   <span className="text-gray-900">11500 KGS</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Vessel/Voyage</span>
//                   <span className="text-gray-900">MSC AMSTERDAM / 123W</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Port of Loading</span>
//                   <span className="text-gray-900">HYD ICD, India</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Port of Discharge</span>
//                   <span className="text-gray-900">Hamburg, Germany</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Freight Terms</span>
//                   <span className="text-gray-900">FOB</span>
//                 </div>
//                 <div className="flex justify-between">
//                   <span className="text-gray-500">Payment Terms</span>
//                   <span className="text-gray-900">LC at Sight</span>
//                 </div>
//               </div>
//             </div>

//             <div>
//               <p className="text-sm font-semibold text-gray-900 mb-3">Documents</p>
//               <div className="space-y-3">
//                 {documents.map((doc) => (
//                   <div key={doc.name} className="flex items-center justify-between text-sm">
//                     <div className="flex items-center gap-2 text-gray-700">
//                       <LuFileText className={doc.color} size={16} />
//                       {doc.name}
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <span className="text-gray-400">{doc.size}</span>
//                       <button className="text-green-600 font-medium">View</button>
//                       <button className="text-gray-400">
//                         <LuDownload size={16} />
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


// mahima code //
import React from "react";
import {
  LuFileText,
  LuPackage,
  LuShip,
  LuAnchor,
  LuTruck,
  LuCircleCheck,
  LuDownload,
  LuMapPin,
  LuCalendar,
  LuBox,
  LuUser,
  LuGlobe,
  LuClipboardList,
  LuShieldCheck,
} from "react-icons/lu";
import { FaXmark } from "react-icons/fa6";

export default function ShipmentDetails({ shipment, onClose }) {
  // ==========================================
  // NORMALIZE SHIPMENT DATA
  // ==========================================

  const shipmentData =
    shipment?.data?.data ||
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

  const route = shipmentData.route || {};
  const cargo = shipmentData.cargo || {};
  const exporter = shipmentData.exporter || {};
  const importer = shipmentData.importer || {};
  const supplier = shipmentData.supplier || {};
  const buyer = shipmentData.buyer || {};
  const additionalInformation =
    shipmentData.additionalInformation || {};

  const shipmentDocuments = Array.isArray(shipmentData.documents)
    ? shipmentData.documents
    : [];

  // ==========================================
  // HELPERS
  // ==========================================

  const getValue = (...values) => {
    const value = values.find(
      (item) =>
        item !== undefined &&
        item !== null &&
        item !== ""
    );

    if (value === undefined) return "";

    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        value.hsCode ||
        value.code ||
        value.name ||
        value.companyName ||
        value.country ||
        value._id ||
        ""
      );
    }

    if (typeof value === "boolean") {
      return value ? "Yes" : "No";
    }

    return value;
  };

  const formatDate = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) return "";

    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) return "";

    return parsed.toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const formatLabel = (value) => {
    if (!value) return "";

    return String(value)
      .replace(/([A-Z])/g, " $1")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const getFileUrl = (doc) =>
    doc?.url ||
    doc?.fileUrl ||
    doc?.documentUrl ||
    doc?.path ||
    doc?.filePath ||
    "";

  const getDocumentName = (doc) =>
    getValue(
      doc?.documentName,
      doc?.name,
      doc?.fileName,
      doc?.title
    ) || "Shipment Document";

  // ==========================================
  // BASIC SHIPMENT DETAILS
  // ==========================================

  const shipmentReference = getValue(
    shipmentData.sbNumber,
    shipmentData.referenceNumber,
    shipmentData.invoice?.awbNumber,
    shipmentData.invoice?.bookingNo,
    shipmentData._id
  );

  const shipmentStatus = getValue(
    shipmentData.shipmentStatus,
    shipmentData.workflowStatus,
    shipmentData.approvalStatus
  );

  const shipmentType = getValue(
    shipmentData.shipmentType,
    shipmentData.invoice?.shipmentType
  );

  const shipmentMode = getValue(
    shipmentData.shipmentMode,
    shipmentData.invoice?.shipmentMode,
    route.mode
  );

  const shipmentPurpose = getValue(
    shipmentData.shipmentPurpose,
    shipmentData.invoice?.shipmentPurpose
  );

  const createdAt = formatDateTime(shipmentData.createdAt);
  const updatedAt = formatDateTime(shipmentData.updatedAt);

  const etd = formatDate(shipmentData.etd);
  const eta = formatDate(shipmentData.eta);
  const shipmentDate = formatDate(shipmentData.shipmentDate);

  // ==========================================
  // ROUTE DETAILS
  // ==========================================

  const originCity = getValue(route.originCity);
  const originCountry = getValue(route.originCountry);

  const destinationCity = getValue(route.destinationCity);
  const destinationCountry = getValue(route.destinationCountry);

  const origin = [originCity, originCountry]
    .filter(Boolean)
    .join(", ");

  const destination = [destinationCity, destinationCountry]
    .filter(Boolean)
    .join(", ");

  // ==========================================
  // EXPORTER / IMPORTER
  // ==========================================

  const exporterName = getValue(
    exporter.companyName,
    exporter.contactPerson
  );

  const exporterContact = getValue(exporter.contactPerson);
  const exporterEmail = getValue(exporter.email);
  const exporterMobile = getValue(exporter.mobile);

  const importerName = getValue(importer.companyName);
  const importerAddress = getValue(importer.address);
  const importerContact = getValue(importer.contactPerson);
  const importerEmail = getValue(importer.email);
  const importerMobile = getValue(importer.mobile);

  // ==========================================
  // BUYER / SUPPLIER
  // ==========================================

  const buyerName = getValue(buyer.companyName);
  const buyerCountry = getValue(buyer.country);

  const supplierName = getValue(supplier.companyName);
  const supplierCountry = getValue(supplier.country);

  // ==========================================
  // CARGO DETAILS
  // ==========================================

  const productName = getValue(cargo.productName);
  const productDescription = getValue(cargo.productDescription);

  const hsCode = getValue(
    cargo.hsCodeText,
    cargo.hsCode?.hsCode,
    cargo.hsCode?.code
  );

  const category = getValue(cargo.category);
  const quantity = getValue(cargo.quantity);
  const unit = getValue(cargo.unit);

  const packages = getValue(cargo.packages);
  const packingType = getValue(cargo.packingType);

  const weight = getValue(cargo.weight);
  const grossWeight = getValue(cargo.grossWeight);
  const netWeight = getValue(cargo.netWeight);
  const volumetricWeight = getValue(cargo.volumetricWeight);

  const unNumber = getValue(cargo.unNumber);
  const packageMarks = getValue(cargo.packageMarks);

  const dimensions = cargo.dimensions || {};

  const length = getValue(dimensions.length);
  const width = getValue(dimensions.width);
  const height = getValue(dimensions.height);
  const dimensionUnit = getValue(dimensions.unit);

  // ==========================================
  // OTHER SHIPMENT DETAILS
  // ==========================================

  const incoterm = getValue(
    shipmentData.incoterm,
    shipmentData.invoice?.incoterm
  );

  const amount = getValue(shipmentData.amount);
  const currency = getValue(
    shipmentData.currency,
    shipmentData.invoice?.currency
  );

  const paymentTerms = getValue(shipmentData.paymentTerms);

  const insuranceRequired =
    shipmentData.insuranceRequired;

  const exportIncentive =
    shipmentData.exportIncentive;

  const leadTime = getValue(shipmentData.leadTime);

  // ==========================================
  // ADDITIONAL INFORMATION
  // ==========================================

  const additionalPackaging = getValue(
    additionalInformation.packagingType
  );

  const additionalPackages = getValue(
    additionalInformation.packages
  );

  const marksNumbers = getValue(
    additionalInformation.marksNumbers
  );

  const dangerousGoods =
    additionalInformation.dangerousGoods;

  const specialHandling = getValue(
    additionalInformation.specialHandling
  );

  const temperatureControl =
    additionalInformation.temperatureControl;

  // ==========================================
  // CARGO FLAGS
  // ==========================================

  const cargoFlags = [
    { label: "Dangerous Goods", value: cargo.isDangerous },
    {
      label: "Temperature Controlled",
      value: cargo.isTemperatureControlled,
    },
    { label: "Stackable", value: cargo.isStackable },
    { label: "Fragile", value: cargo.isFragile },
    { label: "Contains Battery", value: cargo.hasBattery },
    { label: "Lithium Battery", value: cargo.isLithium },
  ].filter((item) => item.value === true);

  // ==========================================
  // TIMELINE
  // ==========================================

  const statusHistory = Array.isArray(shipmentData.statusHistory)
    ? shipmentData.statusHistory
    : [];

  const timelineSteps = [
    {
      title: "Booking Confirmed",
      statuses: ["Submitted", "Pending Admin Approval"],
      icon: LuFileText,
    },
    {
      title: "Approved",
      statuses: ["Approved", "Carrier Assigned"],
      icon: LuCircleCheck,
    },
    {
      title: "Picked Up",
      statuses: ["Pickup Scheduled", "Picked Up"],
      icon: LuPackage,
    },
    {
      title: "In Transit",
      statuses: [
        "Warehouse Received",
        "Customs Documentation",
        "Customs Clearance",
        "In Transit",
      ],
      icon: LuShip,
    },
    {
      title: "Arrived",
      statuses: [
        "Arrived at Destination",
        "Out for Delivery",
      ],
      icon: LuTruck,
    },
    {
      title: "Delivered",
      statuses: ["Delivered", "Closed"],
      icon: LuCircleCheck,
    },
  ];

  const statusOrder = [
    "Draft",
    "Submitted",
    "Pending Admin Approval",
    "Approved",
    "Carrier Assigned",
    "Pickup Scheduled",
    "Picked Up",
    "Warehouse Received",
    "Customs Documentation",
    "Customs Clearance",
    "In Transit",
    "Arrived at Destination",
    "Out for Delivery",
    "Delivered",
    "Closed",
  ];

  const currentStatusIndex = statusOrder.indexOf(shipmentStatus);

  const getTimelineDate = (step) => {
    const historyItem = statusHistory.find((item) => {
      const status = item.status || item.shipmentStatus;
      return step.statuses.includes(status);
    });

    return historyItem?.createdAt
      ? formatDate(historyItem.createdAt)
      : "";
  };

  const timelineCompleted = (step) => {
    if (currentStatusIndex === -1) return false;

    return step.statuses.some((status) => {
      const index = statusOrder.indexOf(status);
      return index !== -1 && index <= currentStatusIndex;
    });
  };

  // ==========================================
  // REUSABLE UI
  // ==========================================

  const DetailItem = ({ label, value, fullWidth = false }) => {
    if (
      value === undefined ||
      value === null ||
      value === ""
    ) {
      return null;
    }

    return (
      <div
        className={`flex justify-between items-start gap-4 py-2 border-b border-gray-100 last:border-0 ${
          fullWidth ? "sm:col-span-2" : ""
        }`}
      >
        <span className="text-gray-500 text-sm shrink-0">
          {label}
        </span>

        <span className="text-gray-900 text-sm font-medium text-right break-words">
          {value}
        </span>
      </div>
    );
  };

  const Section = ({ title, icon: Icon, children }) => (
    <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
      <div className="flex items-center gap-2 mb-4">
        {Icon && (
          <Icon className="text-blue-600" size={18} />
        )}

        <h3 className="text-sm font-semibold text-gray-900">
          {title}
        </h3>
      </div>

      {children}
    </div>
  );

  // ==========================================
  // RETURN
  // ==========================================

  return (
    <div className="bg-gray-50 flex justify-center rounded-2xl w-full">
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-gray-200 flex flex-col max-h-[85vh] overflow-hidden">

        {/* HEADER */}

        <div className="flex justify-between items-start gap-4 p-5 sm:p-6 border-b border-gray-100 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 shrink-0">
              <LuFileText size={21} />
            </div>

            <div className="min-w-0">
              <h2 className="text-lg sm:text-xl font-bold text-gray-900 break-words">
                Shipment Details
              </h2>

              <p className="text-xs text-gray-500 mt-1">
                Reference: {shipmentReference || "Not Available"}
              </p>

              {shipmentStatus && (
                <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                  {formatLabel(shipmentStatus)}
                </span>
              )}
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 hover:text-gray-900 shrink-0"
            aria-label="Close shipment details"
          >
            <FaXmark size={19} />
          </button>
        </div>

        {/* SCROLLABLE CONTENT */}

        <div className="overflow-y-auto p-5 sm:p-6 space-y-6">

          {/* BASIC DETAILS */}

          <Section title="Basic Shipment Details" icon={LuClipboardList}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <DetailItem
                label="SB / Reference Number"
                value={shipmentReference}
              />

              <DetailItem
                label="Shipment Status"
                value={formatLabel(shipmentStatus)}
              />

              <DetailItem
                label="Shipment Type"
                value={formatLabel(shipmentType)}
              />

              <DetailItem
                label="Shipment Mode"
                value={formatLabel(shipmentMode)}
              />

              <DetailItem
                label="Shipment Purpose"
                value={formatLabel(shipmentPurpose)}
              />

              <DetailItem
                label="Shipment Date"
                value={shipmentDate}
              />

              <DetailItem
                label="Created On"
                value={createdAt}
              />

              <DetailItem
                label="Last Updated"
                value={updatedAt}
              />

              <DetailItem
                label="Lead Time"
                value={leadTime}
              />

              <DetailItem
                label="ETD"
                value={etd}
              />

              <DetailItem
                label="ETA"
                value={eta}
              />

              <DetailItem
                label="Incoterm"
                value={incoterm}
              />
            </div>
          </Section>

          {/* ROUTE DETAILS */}

          {(origin || destination) && (
            <Section title="Shipment Route" icon={LuMapPin}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-600 mb-2">
                    <LuMapPin size={17} />
                    <span className="text-xs font-semibold uppercase">
                      Origin
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    {origin || "-"}
                  </p>
                </div>

                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-600 mb-2">
                    <LuMapPin size={17} />
                    <span className="text-xs font-semibold uppercase">
                      Destination
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-gray-900">
                    {destination || "-"}
                  </p>
                </div>
              </div>

              {route.warehouse && (
                <div className="mt-3">
                  <DetailItem
                    label="Warehouse"
                    value={getValue(route.warehouse)}
                  />
                </div>
              )}
            </Section>
          )}

          {/* EXPORTER / IMPORTER */}

          {(exporterName || importerName) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {exporterName && (
                <Section title="Exporter Details" icon={LuUser}>
                  <DetailItem
                    label="Company Name"
                    value={exporterName}
                  />

                  <DetailItem
                    label="Contact Person"
                    value={exporterContact}
                  />

                  <DetailItem
                    label="Email"
                    value={exporterEmail}
                  />

                  <DetailItem
                    label="Mobile"
                    value={exporterMobile}
                  />
                </Section>
              )}

              {importerName && (
                <Section title="Importer Details" icon={LuGlobe}>
                  <DetailItem
                    label="Company Name"
                    value={importerName}
                  />

                  <DetailItem
                    label="Address"
                    value={importerAddress}
                    fullWidth
                  />

                  <DetailItem
                    label="Contact Person"
                    value={importerContact}
                  />

                  <DetailItem
                    label="Email"
                    value={importerEmail}
                  />

                  <DetailItem
                    label="Mobile"
                    value={importerMobile}
                  />
                </Section>
              )}
            </div>
          )}

          {/* BUYER / SUPPLIER */}

          {(buyerName || supplierName) && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

              {buyerName && (
                <Section title="Buyer Details" icon={LuUser}>
                  <DetailItem
                    label="Company Name"
                    value={buyerName}
                  />

                  <DetailItem
                    label="Country"
                    value={buyerCountry}
                  />
                </Section>
              )}

              {supplierName && (
                <Section title="Supplier Details" icon={LuUser}>
                  <DetailItem
                    label="Company Name"
                    value={supplierName}
                  />

                  <DetailItem
                    label="Country"
                    value={supplierCountry}
                  />
                </Section>
              )}
            </div>
          )}

          {/* CARGO DETAILS */}

          <Section title="Cargo / Product Details" icon={LuPackage}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <DetailItem
                label="Product Name"
                value={productName}
              />

              <DetailItem
                label="HS Code"
                value={hsCode}
              />

              <DetailItem
                label="Category"
                value={category}
              />

              <DetailItem
                label="Quantity"
                value={
                  quantity !== ""
                    ? `${quantity}${unit ? ` ${unit}` : ""}`
                    : ""
                }
              />

              <DetailItem
                label="Total Packages"
                value={packages}
              />

              <DetailItem
                label="Packing Type"
                value={packingType}
              />

              <DetailItem
                label="Weight"
                value={weight}
              />

              <DetailItem
                label="Gross Weight"
                value={grossWeight}
              />

              <DetailItem
                label="Net Weight"
                value={netWeight}
              />

              <DetailItem
                label="Volumetric Weight"
                value={volumetricWeight}
              />

              <DetailItem
                label="UN Number"
                value={unNumber}
              />

              <DetailItem
                label="Package Marks"
                value={packageMarks}
                fullWidth
              />

              <DetailItem
                label="Dimensions"
                value={
                  length !== "" || width !== "" || height !== ""
                    ? `${length || "-"} × ${width || "-"} × ${height || "-"} ${dimensionUnit || ""}`
                    : ""
                }
              />

              <DetailItem
                label="Product Description"
                value={productDescription}
                fullWidth
              />
            </div>

            {cargoFlags.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-3">
                  Cargo Characteristics
                </p>

                <div className="flex flex-wrap gap-2">
                  {cargoFlags.map((flag) => (
                    <span
                      key={flag.label}
                      className="px-3 py-1.5 rounded-full bg-orange-50 text-orange-700 text-xs font-medium"
                    >
                      {flag.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Section>

          {/* ADDITIONAL INFORMATION */}

          <Section
            title="Additional Information"
            icon={LuClipboardList}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
              <DetailItem
                label="Packaging Type"
                value={additionalPackaging}
              />

              <DetailItem
                label="Number of Packages"
                value={additionalPackages}
              />

              <DetailItem
                label="Marks & Numbers"
                value={marksNumbers}
                fullWidth
              />

              <DetailItem
                label="Dangerous Goods"
                value={
                  dangerousGoods === undefined
                    ? ""
                    : dangerousGoods
                      ? "Yes"
                      : "No"
                }
              />

              <DetailItem
                label="Special Handling"
                value={specialHandling}
                fullWidth
              />

              <DetailItem
                label="Temperature Control"
                value={
                  temperatureControl === undefined
                    ? ""
                    : temperatureControl
                      ? "Yes"
                      : "No"
                }
              />
            </div>
          </Section>

          {/* PAYMENT / INSURANCE */}

          {(amount !== "" ||
            paymentTerms ||
            insuranceRequired !== undefined ||
            exportIncentive !== undefined) && (
            <Section title="Payment & Other Details" icon={LuShieldCheck}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                <DetailItem
                  label="Amount"
                  value={
                    amount !== ""
                      ? `${currency ? `${currency} ` : ""}${amount}`
                      : ""
                  }
                />

                <DetailItem
                  label="Payment Terms"
                  value={paymentTerms}
                />

                <DetailItem
                  label="Insurance Required"
                  value={
                    insuranceRequired === undefined
                      ? ""
                      : insuranceRequired
                        ? "Yes"
                        : "No"
                  }
                />

                <DetailItem
                  label="Export Incentive"
                  value={
                    exportIncentive === undefined
                      ? ""
                      : exportIncentive
                        ? "Yes"
                        : "No"
                  }
                />
              </div>
            </Section>
          )}

          {/* TIMELINE */}

          {statusHistory.length > 0 && (
            <Section title="Shipment Timeline" icon={LuCalendar}>
              <div className="space-y-4">
                {statusHistory.map((item, index) => (
                  <div
                    key={item._id || index}
                    className="flex gap-3 items-start"
                  >
                    <div className="w-8 h-8 rounded-full bg-green-50 text-green-600 flex items-center justify-center shrink-0">
                      <LuCircleCheck size={17} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-gray-900">
                        {formatLabel(
                          item.status || item.shipmentStatus || "Status Updated"
                        )}
                      </p>

                      {item.remarks && (
                        <p className="text-xs text-gray-500 mt-1">
                          {item.remarks}
                        </p>
                      )}

                      {item.createdAt && (
                        <p className="text-xs text-gray-400 mt-1">
                          {formatDateTime(item.createdAt)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Section>
          )}

          {/* STATUS PROGRESS */}

          {statusHistory.length === 0 && currentStatusIndex >= 0 && (
            <Section title="Shipment Progress" icon={LuTruck}>
              <div className="overflow-x-auto">
                <div className="flex items-start justify-between min-w-[600px] gap-2">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon;
                    const done = timelineCompleted(step);

                    return (
                      <div
                        key={step.title}
                        className="flex-1 flex flex-col items-center text-center relative"
                      >
                        {index !== timelineSteps.length - 1 && (
                          <span className="absolute top-5 left-1/2 w-full border-t-2 border-dashed border-gray-200" />
                        )}

                        <div
                          className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center ${
                            done
                              ? "bg-green-100 text-green-600"
                              : "bg-white border-2 border-gray-200 text-gray-300"
                          }`}
                        >
                          <Icon size={18} />
                        </div>

                        <p className="text-xs font-medium text-gray-700 mt-2">
                          {step.title}
                        </p>

                        {getTimelineDate(step) && (
                          <p className="text-[10px] text-gray-400 mt-1">
                            {getTimelineDate(step)}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </Section>
          )}

          {/* DOCUMENTS */}

          <Section title="Shipment Documents" icon={LuFileText}>
            {shipmentDocuments.length === 0 ? (
              <div className="text-sm text-gray-400 py-3 text-center">
                No documents uploaded yet.
              </div>
            ) : (
              <div className="space-y-3">
                {shipmentDocuments.map((doc, index) => {
                  const documentName = getDocumentName(doc);
                  const documentUrl = getFileUrl(doc);

                  return (
                    <div
                      key={doc?._id || index}
                      className="flex items-center justify-between gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                          <LuFileText size={18} />
                        </div>

                        <div className="min-w-0">
                          <p className="text-sm font-medium text-gray-800 break-words">
                            {documentName}
                          </p>

                          {doc?.createdAt && (
                            <p className="text-xs text-gray-400 mt-1">
                              {formatDate(doc.createdAt)}
                            </p>
                          )}
                        </div>
                      </div>

                      {documentUrl && (
                        <div className="flex items-center gap-3 shrink-0">
                          <a
                            href={documentUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="text-xs font-medium text-green-600 hover:text-green-700"
                          >
                            View
                          </a>

                          <a
                            href={documentUrl}
                            download
                            target="_blank"
                            rel="noreferrer"
                            className="text-gray-400 hover:text-gray-700"
                            title="Download document"
                          >
                            <LuDownload size={17} />
                          </a>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Section>

          {/* NOTES */}

          {shipmentData.notes && (
            <Section title="Shipment Notes" icon={LuFileText}>
              <p className="text-sm text-gray-600 whitespace-pre-wrap">
                {shipmentData.notes}
              </p>
            </Section>
          )}
        </div>

        {/* FOOTER */}

        <div className="border-t border-gray-100 px-5 sm:px-6 py-3 flex justify-end shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg bg-gray-900 text-white text-sm font-medium hover:bg-gray-800 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}