// import React, { useState, useEffect } from "react";
// import { getShipmentTracker } from "../../api/ShipmentApi";
// import {
//   X,
//   Calendar,
//   Clock,
//   CheckCircle2,
//   Circle,
//   Maximize2,
//   Plane,
//   MapPin,
// } from "lucide-react";
// import { renderToStaticMarkup } from "react-dom/server";
// import {
//   MapContainer,
//   TileLayer,
//   Marker,
//   Polyline,
// } from "react-leaflet";
// import L from "leaflet";
// import "leaflet/dist/leaflet.css";

// const originPosition = [11.1085, 77.3411];
// const currentPosition = [24.4667, 58.5];
// const destinationPosition = [25.2048, 55.2708];

// function StatusBadge({ status }) {
//   return (
//     <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-orange-100 text-orange-600">
//       {status || "Pending"}
//     </span>
//   );
// }

// function TrackingStep({ step, isLast }) {
//   const isDone = step.status === "done";
//   const isCurrent = step.status === "current";

//   return (
//     <div className="flex gap-3">
//       <div className="flex flex-col items-center">
//         {isDone ? (
//           <span className="w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0">
//             <CheckCircle2
//               className="w-5 h-5 text-emerald-500 -m-px"
//               strokeWidth={2}
//               fill="white"
//             />
//           </span>
//         ) : isCurrent ? (
//           <span className="w-5 h-5 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 ring-4 ring-orange-100">
//             <span className="w-2 h-2 rounded-full bg-white" />
//           </span>
//         ) : (
//           <Circle
//             className="w-5 h-5 text-gray-300 flex-shrink-0"
//             strokeWidth={2}
//           />
//         )}

//         {!isLast && (
//           <span
//             className={`w-px flex-1 min-h-[28px] ${
//               isDone ? "bg-emerald-300" : "bg-gray-200"
//             }`}
//           />
//         )}
//       </div>

//       <div className="pb-5">
//         <p
//           className={`text-sm font-medium ${
//             isCurrent
//               ? "text-orange-600"
//               : isDone
//               ? "text-gray-900"
//               : "text-gray-400"
//           }`}
//         >
//           {step.title}
//         </p>

//         <p
//           className={`text-xs mt-0.5 ${
//             isDone || isCurrent ? "text-gray-500" : "text-gray-400"
//           }`}
//         >
//           {step.location}
//         </p>

//         <p
//           className={`text-xs mt-0.5 ${
//             isDone || isCurrent ? "text-gray-400" : "text-gray-300"
//           }`}
//         >
//           {step.date}
//         </p>

//         {step.note && (
//           <p
//             className={`text-xs italic mt-0.5 ${
//               isDone || isCurrent ? "text-gray-400" : "text-gray-300"
//             }`}
//           >
//             {step.note}
//           </p>
//         )}
//       </div>
//     </div>
//   );
// }

// const currentLocationIcon = L.divIcon({
//   html: renderToStaticMarkup(
//     <div className="flex flex-col items-center -translate-y-2">
//       <div className="bg-gray-900 rounded-full p-1.5 shadow-lg border-2 border-white">
//         <MapPin
//           className="w-3.5 h-3.5 text-white"
//           fill="white"
//         />
//       </div>
//     </div>
//   ),
//   className: "",
//   iconSize: [28, 28],
//   iconAnchor: [14, 28],
// });

// const destinationIcon = L.divIcon({
//   html: renderToStaticMarkup(
//     <div className="w-3 h-3 rounded-full bg-red-500 ring-4 ring-red-200 border border-white" />
//   ),
//   className: "",
//   iconSize: [14, 14],
//   iconAnchor: [7, 7],
// });

// const originIcon = L.divIcon({
//   html: renderToStaticMarkup(
//     <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-200 border border-white" />
//   ),
//   className: "",
//   iconSize: [14, 14],
//   iconAnchor: [7, 7],
// });

// function TrackingMap({
//   origin = originPosition,
//   current = currentPosition,
//   destination = destinationPosition,
// }) {
//   return (
//     <div className="relative w-full h-56 sm:h-72 md:h-80 rounded-lg overflow-hidden border border-gray-100">
//       <MapContainer
//         center={current}
//         zoom={4}
//         scrollWheelZoom={false}
//         zoomControl={false}
//         className="w-full h-full"
//       >
//         <TileLayer
//           url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           attribution="&copy; OpenStreetMap contributors"
//         />

//         <Polyline
//           positions={[origin, current, destination]}
//           pathOptions={{
//             color: "#f97316",
//             weight: 2,
//             dashArray: "6 6",
//           }}
//         />

//         <Marker position={origin} icon={originIcon} />
//         <Marker position={current} icon={currentLocationIcon} />
//         <Marker position={destination} icon={destinationIcon} />
//       </MapContainer>

//       <button
//         type="button"
//         className="absolute top-3 right-3 z-[1000] bg-white rounded-md px-2 py-1.5 shadow text-gray-600 hover:bg-gray-50"
//       >
//         <Maximize2 className="w-3.5 h-3.5" />
//       </button>
//     </div>
//   );
// }

// export default function ShipmentTrackingModal({
//   open = false,
//   onClose = () => {},
//   shipmentId = "",
// }) {
//   const [trackingData, setTrackingData] = useState(null);
//   const [trackingLoading, setTrackingLoading] = useState(false);
//   const [trackingError, setTrackingError] = useState("");

//   /*
//     Parent se MongoDB _id aa raha hai.
//   */
//   const trackingId = shipmentId?.trim() || "";

//   useEffect(() => {
//     if (!open || !trackingId) {
//       return;
//     }

//     let isMounted = true;

//     const fetchTracker = async () => {
//       try {
//         setTrackingLoading(true);
//         setTrackingError("");

//         console.log(
//           "ShipmentTrackingModal - API ID:",
//           trackingId
//         );

//         const response = await getShipmentTracker(trackingId);

//         if (!isMounted) return;

//         console.log(
//           "ShipmentTrackingModal - API Response:",
//           response?.data
//         );

//         const data =
//           response?.data?.data ??
//           response?.data ??
//           response;

//         setTrackingData(data);
//       } catch (error) {
//         console.error(
//           "Shipment tracker API error:",
//           error
//         );

//         if (!isMounted) return;

//         setTrackingError(
//           error?.response?.data?.message ||
//             "Unable to fetch tracking details."
//         );

//         setTrackingData(null);
//       } finally {
//         if (isMounted) {
//           setTrackingLoading(false);
//         }
//       }
//     };

//     fetchTracker();

//     return () => {
//       isMounted = false;
//     };
//   }, [open, trackingId]);

//   useEffect(() => {
//     if (!open) {
//       setTrackingData(null);
//       setTrackingError("");
//       setTrackingLoading(false);
//     }
//   }, [open]);

//   /*
//     IMPORTANT:
//     shipment prop ki zarurat nahi hai.
//     Parent already MongoDB _id pass kar raha hai.
//   */
//   if (!open) return null;

//   const tracker =
//     trackingData?.tracking ||
//     trackingData?.shipment ||
//     trackingData?.data ||
//     trackingData ||
//     {};

//   const referenceNumber =
//     tracker.referenceNumber ||
//     tracker.sbNumber ||
//     "-";

//   const shipmentStatus =
//     tracker.shipmentStatus ||
//     tracker.status ||
//     "Pending";

//   const mode =
//     tracker.route?.mode ||
//     "-";

//   const originCity =
//     tracker.route?.originCity ||
//     tracker.route?.origin?.city ||
//     "-";

//   const originCountry =
//     tracker.route?.originCountry ||
//     tracker.route?.origin?.country ||
//     "-";

//   const destinationCity =
//     tracker.route?.destinationCity ||
//     tracker.route?.destination?.city ||
//     "-";

//   const destinationCountry =
//     tracker.route?.destinationCountry ||
//     tracker.route?.destination?.country ||
//     "-";

//   const etd = tracker.etd
//     ? new Date(tracker.etd).toLocaleDateString()
//     : "-";

//   const eta = tracker.eta
//     ? new Date(tracker.eta).toLocaleDateString()
//     : "-";

//   const transitTime =
//     tracker.transitTime ||
//     "-";

//   const timeline =
//     tracker.trackingTimeline ||
//     tracker.timeline ||
//     tracker.trackingHistory ||
//     [];

//   const trackingSteps =
//     Array.isArray(timeline) && timeline.length > 0
//       ? timeline.map((item, index) => ({
//           title:
//             item.status ||
//             item.title ||
//             item.event ||
//             `Tracking Update ${index + 1}`,

//           location:
//             item.location?.city
//               ? `${item.location.city}${
//                   item.location.country
//                     ? `, ${item.location.country}`
//                     : ""
//                 }`
//               : item.location?.name ||
//                 item.location ||
//                 "-",

//           date:
//             item.createdAt
//               ? new Date(
//                   item.createdAt
//                 ).toLocaleString()
//               : item.date
//               ? new Date(
//                   item.date
//                 ).toLocaleString()
//               : "-",

//           note:
//             item.note ||
//             item.description ||
//             "",

//           status:
//             item.current === true ||
//             item.isCurrent === true
//               ? "current"
//               : index === timeline.length - 1
//               ? "current"
//               : "done",
//         }))
//       : [
//           {
//             title: shipmentStatus,

//             location:
//               tracker.liveTracking?.location?.city ||
//               tracker.currentLocation?.city ||
//               `${originCity}, ${originCountry}`,

//             date:
//               tracker.updatedAt
//                 ? new Date(
//                     tracker.updatedAt
//                   ).toLocaleString()
//                 : "-",

//             status: "current",
//           },
//         ];

//   const currentLocation =
//     tracker.liveTracking?.location?.city ||
//     tracker.currentLocation?.city ||
//     `${originCity}, ${originCountry}`;

//   const currentCountry =
//     tracker.liveTracking?.location?.country ||
//     tracker.currentLocation?.country ||
//     "";

//   const lastUpdate =
//     tracker.liveTracking?.lastUpdate ||
//     tracker.lastUpdate ||
//     tracker.updatedAt ||
//     null;

//   const apiOrigin =
//     tracker.liveTracking?.originCoordinates ||
//     tracker.originCoordinates;

//   const apiCurrent =
//     tracker.liveTracking?.coordinates ||
//     tracker.liveTracking?.currentCoordinates ||
//     tracker.currentCoordinates;

//   const apiDestination =
//     tracker.liveTracking?.destinationCoordinates ||
//     tracker.destinationCoordinates;

//   const mapOrigin =
//     Array.isArray(apiOrigin) &&
//     apiOrigin.length === 2
//       ? apiOrigin
//       : originPosition;

//   const mapCurrent =
//     Array.isArray(apiCurrent) &&
//     apiCurrent.length === 2
//       ? apiCurrent
//       : currentPosition;

//   const mapDestination =
//     Array.isArray(apiDestination) &&
//     apiDestination.length === 2
//       ? apiDestination
//       : destinationPosition;

//   return (
//     <div className="fixed inset-0 z-[9999] flex items-center justify-center p-3 sm:p-6 bg-black/50">
//       <div className="bg-white w-full max-w-6xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">

//         {/* HEADER */}
//         <div className="flex items-start justify-between px-4 sm:px-6 pt-5 pb-4 border-b border-gray-100 flex-shrink-0">
//           <div>
//             <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
//               Shipment Tracking
//             </h2>

//             <p className="text-xs sm:text-sm text-gray-500 mt-1">
//               Track your shipment in real-time and get the latest update.
//             </p>
//           </div>

//           <button
//             type="button"
//             onClick={onClose}
//             className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600"
//           >
//             <X className="w-5 h-5" />
//           </button>
//         </div>

//         {/* BODY */}
//         <div className="overflow-y-auto px-4 sm:px-6 py-4 space-y-4">

         

//           {trackingError && (
//             <div className="border border-orange-100 bg-orange-50 rounded-lg px-3 py-2 text-xs text-orange-600">
//               {trackingError}
//             </div>
//           )}

//           {/* SUMMARY */}
//           <div className="border border-gray-100 rounded-xl px-4 py-3 flex flex-wrap gap-4 sm:gap-8 items-center">

//             <StatusBadge status={shipmentStatus} />

//             <div className="min-w-[110px]">
//               <p className="text-[10px] text-gray-400">
//                 {mode}
//               </p>

//               <p className="text-xs font-semibold text-gray-900">
//                 {referenceNumber}
//               </p>
//             </div>

//             <div className="min-w-[140px] flex items-center gap-2">

//               <div>
//                 <p className="text-[10px] text-gray-400">
//                   Route
//                 </p>

//                 <p className="text-xs font-semibold text-gray-900">
//                   {originCity}, {originCountry}
//                 </p>
//               </div>

//               <Plane className="w-3.5 h-3.5 text-gray-300 rotate-90" />

//               <div>
//                 <p className="text-[10px] text-gray-400 invisible">
//                   Route
//                 </p>

//                 <p className="text-xs font-semibold text-gray-900">
//                   {destinationCity}, {destinationCountry}
//                 </p>
//               </div>

//             </div>

//             <div className="min-w-[90px]">
//               <p className="text-[10px] text-gray-400">
//                 ETD
//               </p>

//               <p className="text-xs font-semibold text-gray-900">
//                 {etd}
//               </p>
//             </div>

//             <div className="min-w-[90px]">
//               <p className="text-[10px] text-gray-400">
//                 ETA
//               </p>

//               <p className="text-xs font-semibold text-gray-900">
//                 {eta}
//               </p>
//             </div>

//             <div className="min-w-[90px]">
//               <p className="text-[10px] text-gray-400">
//                 Transit Time
//               </p>

//               <p className="text-xs font-semibold text-gray-900">
//                 {transitTime}
//               </p>
//             </div>

//           </div>

//           {/* MAIN GRID */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

//             {/* TRACKING */}
//             <div className="lg:col-span-1 border border-gray-100 rounded-xl p-4">

//               <h3 className="text-sm font-semibold text-gray-900 mb-4">
//                 Shipment Status & Tracking
//               </h3>

//               <div>
//                 {trackingSteps.map((step, idx) => (
//                   <TrackingStep
//                     key={`${step.title}-${idx}`}
//                     step={step}
//                     isLast={
//                       idx ===
//                       trackingSteps.length - 1
//                     }
//                   />
//                 ))}
//               </div>

//               <button
//                 type="button"
//                 className="w-full text-center text-xs font-medium text-gray-600 border border-gray-200 rounded-lg py-2 mt-2 hover:bg-gray-50"
//               >
//                 View Full Tracking History
//               </button>

//             </div>

//             {/* MAP */}
//             <div className="lg:col-span-2 border border-gray-100 rounded-xl p-4">

//               <div className="flex items-center justify-between mb-3">

//                 <h3 className="text-sm font-semibold text-gray-900">
//                   Live Tracking Map
//                 </h3>

//                 <button
//                   type="button"
//                   className="text-xs font-medium text-emerald-600 flex items-center gap-1"
//                 >
//                   View Fullscreen
//                   <Maximize2 className="w-3 h-3" />
//                 </button>

//               </div>

//               <TrackingMap
//                 origin={mapOrigin}
//                 current={mapCurrent}
//                 destination={mapDestination}
//               />

//               <div className="grid grid-cols-3 gap-2 mt-3 text-center">

//                 {/* CURRENT LOCATION */}
//                 <div className="border border-gray-100 rounded-lg py-2">

//                   <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
//                     <MapPin className="w-3 h-3" />
//                     Current Location
//                   </p>

//                   <p className="text-xs font-semibold text-gray-900 mt-0.5">
//                     {currentLocation}
//                   </p>

//                   <p className="text-[10px] text-gray-400">
//                     {currentCountry}
//                   </p>

//                 </div>

//                 {/* LAST UPDATE */}
//                 <div className="border border-gray-100 rounded-lg py-2">

//                   <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
//                     <Calendar className="w-3 h-3" />
//                     Last Update
//                   </p>

//                   <p className="text-xs font-semibold text-gray-900 mt-0.5">
//                     {lastUpdate
//                       ? new Date(
//                           lastUpdate
//                         ).toLocaleString()
//                       : "-"}
//                   </p>

//                 </div>

//                 {/* NEXT UPDATE */}
//                 <div className="border border-gray-100 rounded-lg py-2">

//                   <p className="text-[10px] text-gray-400 flex items-center justify-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     Next Update
//                   </p>

//                   <p className="text-xs font-semibold text-gray-900 mt-0.5">
//                     {eta}
//                   </p>

//                   <p className="text-[10px] text-gray-400">
//                     Estimated arrival
//                   </p>

//                 </div>

//               </div>

//             </div>

//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }




import React, { useEffect, useMemo, useState } from "react";
import { getShipmentTracker } from "../../api/ShipmentApi";
import { X, Plane, Ship, Truck, MapPin, Package, CalendarDays, Clock3, RefreshCw, CheckCircle2, AlertCircle, ArrowRight, History } from "lucide-react";

const text = (v) => v == null || v === "" ? "Not available" : String(v);
const date = (v) => {
  if (!v) return "Not available";
  const d = new Date(v);
  return Number.isNaN(d.getTime()) ? "Not available" : d.toLocaleString("en-IN", {dateStyle:"medium",timeStyle:"short"});
};
const place = (v) => [v?.city, v?.country].filter(Boolean).join(", ") || "Not available";
const stat = (v) => String(v || "Pending");
const stateStyle = (v) => /deliver|arriv|complete/i.test(stat(v)) ? "bg-emerald-100 text-emerald-800" : /delay|exception|hold|fail/i.test(stat(v)) ? "bg-rose-100 text-rose-700" : "bg-cyan-100 text-cyan-800";

export default function ShipmentTrackingModal({open=false,onClose=()=>{},shipmentId="",initialData=null}) {
  const [data,setData] = useState(initialData);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");
  const [expanded,setExpanded] = useState(true);
  const refresh = async () => {
    if (!shipmentId) return;
    setLoading(true); setError("");
    try {
      const res = await getShipmentTracker(shipmentId);
      setData(res?.data?.data ?? null);
    } catch (e) {
      setError(e?.response?.data?.message || "Unable to load shipment tracking. Please try again.");
    } finally {setLoading(false);}
  };
  useEffect(() => { if (open) refresh(); else {setData(null);setError("");} },[open,shipmentId]);
  useEffect(() => {
    if(!open)return;
    const onKey = e => {if(e.key==="Escape")onClose();};
    document.addEventListener("keydown",onKey);
    return()=>document.removeEventListener("keydown",onKey);
  },[open,onClose]);

  const header=data?.header || data?.shipment || data || {};
  const info=data?.shipmentInfo || {};
  const transport=data?.transportInfo || {};
  const origin=header?.route?.origin || {city:info?.route?.originCity,country:info?.route?.originCountry};
  const destination=header?.route?.destination || {city:info?.route?.destinationCity,country:info?.route?.destinationCountry};
  const status=header.shipmentStatus || data?.liveTracking?.currentStatus || header.trackingStatus || "Pending";
  const mode=header.mode || info?.route?.mode || "Air";
  const reference=header.referenceNumber || header.shipmentId || transport.awbNumber || shipmentId;
  const timeline=useMemo(()=>Array.isArray(data?.trackingTimeline)?[...data.trackingTimeline].sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt)):[],[data]);
  const latest=timeline.findLast?.(t=>t.current) || timeline[timeline.length-1];
  const current=data?.liveTracking?.location || latest?.location;
  const segments=useMemo(()=>{
    const locations=[origin,...timeline.map(t=>t.location).filter(l=>l?.city),destination];
    return locations.filter((v,i)=>i===0 || place(v)!==place(locations[i-1])).slice(0,5);
  },[data]);
  if(!open)return null;
  const ModeIcon=/sea|ocean|ship/i.test(mode)?Ship:/road|truck/i.test(mode)?Truck:Plane;
  return <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/65 backdrop-blur-sm p-3 sm:p-6" onMouseDown={e=>{if(e.target===e.currentTarget)onClose();}}>
    <section role="dialog" aria-modal="true" aria-label="Shipment tracking details" className="w-full max-w-5xl max-h-[94vh] overflow-hidden rounded-[26px] bg-white shadow-[0_30px_100px_rgba(2,20,32,.35)] flex flex-col">
      <header className="relative overflow-hidden bg-gradient-to-r from-[#082f49] via-[#0b5967] to-[#0d9488] px-5 py-6 sm:px-8 text-white shrink-0">
        <div className="absolute right-20 top-0 h-44 w-44 rounded-full bg-cyan-300/10 blur-3xl"/>
        <div className="relative flex justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-cyan-100"><span className="inline-block h-2 w-2 rounded-full bg-emerald-300"/> Shipment Operations Hub · Live Tracker</div>
            <h2 className="mt-2 text-2xl sm:text-3xl font-black">Shipment Tracking Details</h2>
            <p className="mt-1 text-sm text-cyan-50">Reference / AWB: <strong className="text-white">{text(reference)}</strong></p>
          </div>
          <button type="button" onClick={onClose} aria-label="Close tracking" className="h-9 w-9 rounded-xl bg-white/15 hover:bg-white/25 flex items-center justify-center"><X size={19}/></button>
        </div>
        <div className="relative mt-5 flex flex-wrap items-center gap-3">
          <span className={`rounded-full px-3 py-1 text-xs font-bold ${stateStyle(status)}`}>{status}</span>
          <span className="rounded-full bg-white/15 px-3 py-1 text-xs font-semibold">{text(mode)} Shipment</span>
          <button type="button" onClick={refresh} disabled={loading} className="ml-auto inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/15 px-3 py-2 text-xs font-bold hover:bg-white/25 disabled:opacity-60"><RefreshCw size={14} className={loading?"animate-spin":""}/>{loading?"Refreshing":"Refresh tracking"}</button>
        </div>
      </header>
      <div className="overflow-y-auto bg-[#f5fafb] p-4 sm:p-7 space-y-5">
        {error && <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700"><AlertCircle size={17}/>{error}</div>}
        {loading && !data ? <div className="py-20 text-center text-slate-500">Loading tracking information…</div> : <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              ["Origin",place(origin),MapPin],
              ["Destination",place(destination),MapPin],
              ["Pieces",info.quantity ?? data?.cargo?.quantity,Package],
              ["Weight",info.weight == null ? null : `${info.weight} kg`,Package],
            ].map(([label,value,Icon])=><div key={label} className="rounded-2xl border border-cyan-100 bg-white/90 p-4 shadow-sm">
              <div className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wide text-slate-500"><Icon size={15} className="text-teal-600"/>{label}</div>
              <p className="mt-2 text-sm sm:text-base font-extrabold text-slate-900 break-words">{text(value)}</p>
            </div>)}
          </div>
          <div className="rounded-3xl border border-cyan-100 bg-white p-5 sm:p-7 shadow-sm">
            <div className="flex items-center justify-between gap-3"><h3 className="text-base font-extrabold text-slate-900">Shipment Journey</h3><span className="text-xs font-semibold text-teal-700">Route overview</span></div>
            <div className="mt-6 flex items-center justify-between gap-1 sm:gap-4">
              <div className="min-w-0 flex-1"><div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-br from-teal-600 to-emerald-500 text-white flex items-center justify-center shadow-lg"><MapPin size={22}/></div><p className="mt-2 text-center text-xs sm:text-sm font-extrabold text-slate-800 truncate">{text(origin?.city)}</p><p className="text-center text-[10px] text-slate-500">Origin</p></div>
              <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-400"/>
              <div className="h-14 w-14 shrink-0 rounded-full bg-gradient-to-br from-[#0e7490] to-[#082f49] text-white flex items-center justify-center shadow-lg"><ModeIcon size={25}/></div>
              <div className="h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-400 to-teal-400"/>
              <div className="min-w-0 flex-1"><div className="h-12 w-12 mx-auto rounded-full bg-gradient-to-br from-cyan-600 to-blue-600 text-white flex items-center justify-center shadow-lg"><MapPin size={22}/></div><p className="mt-2 text-center text-xs sm:text-sm font-extrabold text-slate-800 truncate">{text(destination?.city)}</p><p className="text-center text-[10px] text-slate-500">Destination</p></div>
            </div>
            <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-2xl bg-cyan-50/70 p-4">
              <div><p className="text-xs text-slate-500">Current location</p><p className="font-bold text-slate-800">{place(current)}</p></div>
              <div><p className="text-xs text-slate-500">Estimated arrival</p><p className="font-bold text-slate-800">{date(header.eta || transport.eta)}</p></div>
              <div><p className="text-xs text-slate-500">Last update</p><p className="font-bold text-slate-800">{date(data?.liveTracking?.lastUpdate || latest?.createdAt)}</p></div>
            </div>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <div className="flex items-center gap-2"><CalendarDays size={18} className="text-teal-700"/><h3 className="font-extrabold text-slate-900">Flight / Transport Schedule</h3></div>
              <div className="mt-4 space-y-3">
                <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4"><div><p className="text-xs text-slate-500">Departure · {text(origin?.city)}</p><p className="font-bold text-slate-800">{date(header.etd || transport.etd)}</p></div><ArrowRight className="text-teal-600"/><div className="text-right"><p className="text-xs text-slate-500">Arrival · {text(destination?.city)}</p><p className="font-bold text-slate-800">{date(header.eta || transport.eta)}</p></div></div>
                <div className="grid grid-cols-2 gap-3"><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">Carrier</p><p className="text-sm font-bold text-slate-900">{text(transport.carrier || info.carrier)}</p></div><div className="rounded-xl border border-slate-100 p-3"><p className="text-xs text-slate-500">AWB / Reference</p><p className="text-sm font-bold text-slate-900 break-all">{text(transport.awbNumber || reference)}</p></div></div>
                <p className="text-[11px] text-slate-500">Flight numbers and individual flight legs appear only when supplied by the tracking provider.</p>
              </div>
            </div>
            <div className="rounded-3xl border border-slate-200 bg-white p-5 sm:p-6 shadow-sm">
              <button type="button" className="w-full flex items-center justify-between" onClick={()=>setExpanded(v=>!v)} aria-expanded={expanded}><span className="flex items-center gap-2 font-extrabold text-slate-900"><History size={18} className="text-teal-700"/>Shipment History <span className="rounded-full bg-teal-50 px-2 py-0.5 text-xs text-teal-700">{timeline.length}</span></span><span className="text-xs text-teal-700">{expanded?"Hide":"Show"}</span></button>
              {expanded && <div className="mt-5 max-h-[380px] overflow-y-auto">
                {timeline.length ? [...timeline].reverse().map((event,i)=><div key={event._id||i} className="relative border-l-2 border-teal-100 pl-5 pb-5 last:pb-0"><span className={`absolute -left-[7px] top-1 h-3 w-3 rounded-full ${i===0?"bg-teal-600":"bg-amber-400"}`}/><div className="flex flex-wrap items-start justify-between gap-2"><p className="text-sm font-bold text-slate-900">{text(event.status || event.event)}</p><p className="text-xs text-slate-500">{date(event.createdAt || event.date)}</p></div><p className="mt-1 text-xs text-slate-600">{place(event.location)}</p>{(event.remarks || event.note || event.description) && <p className="mt-1 text-xs text-slate-500">{event.remarks || event.note || event.description}</p>}</div>) : <div className="rounded-xl bg-slate-50 p-5 text-center text-sm text-slate-500">No tracking events have been recorded for this shipment yet.</div>}
              </div>}
            </div>
          </div>
          <p className="text-xs text-slate-500 text-center">Tracking events are sourced from your shipment tracking API. Missing schedule or location data is shown as unavailable, not estimated.</p>
        </>}
      </div>
    </section>
  </div>;
}
