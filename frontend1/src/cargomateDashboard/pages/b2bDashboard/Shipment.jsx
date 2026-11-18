// import React, { useState, useEffect, useMemo } from "react";
// import ReactCountryFlag from "react-country-flag";
// import axios from "axios";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// import {
//   getShipments,
//   getDashboard,
//   getShipmentStatusOverview,
//   getShipmentTracker,
//   getShipmentsByMode,
//   getTopOriginCountries,
//   getRecentAlerts,
//   getTopDestinationCountries,
//   getFilterOptions,
//   getShipmentDetails,
// } from "../../api/ShipmentApi";
// import {
//   getQuotationByShipment,
//   acceptQuotation,
//   rejectQuotation,
// } from "../../api/QuotationApi";
// import B2BQuotation from "../../components/b2bComponent/B2BQuotation";
// import {
//   CalendarDays,
//   Download,
//   Plus,
//   Search,
//   ChevronDown,
//   Square,
//   RectangleHorizontal,
//   CheckCircle2,
//   Clover,
//   ArrowUpCircle,
//   Gem,
//   MoreVertical,
//   Anchor,
//   Plane,
//   ChevronLeft,
//   ChevronRight,
//   AlertTriangle,
//   AlertCircle,
//   Info,
//   Clock,
//   Check,
//   MapPin,
//   ArrowRight,
//   RotateCcw,
//   Eye,
//   Trash2,
//   FileText,
//   Filter,
//   Layers,
//   TrendingUp,
//   TrendingDown,
//   Ship,
//   Truck,
// } from "lucide-react";
// import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

// import ShipmentForm from "../../components/ShipmentForm";
// import ViewShipment from "../../components/b2bComponent/ShipmentView";
// import ShipmentTrackingModal from "../../components/b2bComponent/ShipmentTracking";
// import RecentHighRiskAlertsModal from "../../components/b2bComponent/RecentHighRisk";
// import DateRangeModal from "../../components/b2bComponent/DateRange";
// import ExportReport from "../../components/b2bComponent/ExportReport";

// const COUNTRY_CODES = {
//   China: "CN",
//   India: "IN",
//   "South Korea": "KR",
//   Netherlands: "NL",
//   Germany: "DE",
//   UAE: "AE",
//   USA: "US",
//   Japan: "JP",
//   Australia: "AU",
//   Singapore: "SG",
//   Indonesia: "ID",
//   Belgium: "BE",
// };

// const getHsCodeLabel = (cargo = {}) => {
//   const hs = cargo.hsCode;
//   if (cargo.hsCodeText && String(cargo.hsCodeText).trim()) {
//     return String(cargo.hsCodeText).trim();
//   }
//   if (hs && typeof hs === "object") {
//     return hs.hsCode || hs.code || hs.value || hs.name || "Not provided";
//   }
//   if (typeof hs === "string" && hs.trim()) {
//     return hs.trim();
//   }
//   return "Not provided";
// };

// const getShipmentValue = (shipment = {}) => {
//   const cargoValue = shipment.cargo?.value;
//   const invoiceValue = shipment.invoice?.invoiceValue;
//   const value = cargoValue ?? invoiceValue;
//   return value === null || value === undefined || value === ""
//     ? null
//     : Number(value);
// };

// const formatShipmentValue = (shipment = {}) => {
//   const value = getShipmentValue(shipment);
//   if (value === null || !Number.isFinite(value)) return "Not provided";

//   const currency = shipment.cargo?.currency || shipment.invoice?.currency || shipment.currency || "INR";
//   try {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   } catch {
//     return `${currency} ${value.toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     })}`;
//   }
// };

// const formatShipmentDate = (date) => {
//   if (!date) return "Not scheduled";
//   const parsed = new Date(date);
//   if (Number.isNaN(parsed.getTime())) return "Not scheduled";
//   return parsed.toLocaleDateString("en-GB", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };

// const getShipmentDeclaredValue = (shipment = {}) => {
//   const rawValue =
//     shipment.cargo?.value ??
//     shipment.amount ??
//     shipment.value ??
//     shipment.invoice?.invoiceValue;

//   if (rawValue === null || rawValue === undefined || rawValue === "") return null;
//   const parsed = Number(rawValue);
//   return Number.isFinite(parsed) ? parsed : null;
// };

// const formatDeclaredValue = (shipment = {}) => {
//   const value = getShipmentDeclaredValue(shipment);
//   if (value === null) return "Not provided";

//   const currency =
//     shipment.cargo?.currency ||
//     shipment.currency ||
//     shipment.invoice?.currency ||
//     "INR";

//   try {
//     return new Intl.NumberFormat("en-IN", {
//       style: "currency",
//       currency,
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     }).format(value);
//   } catch {
//     return `${currency} ${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
//   }
// };

// const getEtaStatus = (shipment = {}) => {
//   const status = String(shipment.shipmentStatus || shipment.status || "").toLowerCase();
//   if (status.includes("deliver")) return "Delivered";
//   if (!shipment.eta) return "ETA not set";

//   const etaDate = new Date(shipment.eta);
//   if (Number.isNaN(etaDate.getTime())) return "ETA not set";

//   const today = new Date();
//   today.setHours(0, 0, 0, 0);
//   etaDate.setHours(0, 0, 0, 0);

//   return etaDate < today ? "Overdue" : "On schedule";
// };

// function Flag({ country, size = 15 }) {
//   return (
//     <ReactCountryFlag
//       countryCode={COUNTRY_CODES[country] || "US"}
//       svg
//       style={{
//         width: size,
//         height: size,
//         borderRadius: "3px",
//         boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
//       }}
//     />
//   );
// }

// function StatusBadge({ status }) {
//   const styles = {
//     "In Transit": "bg-blue-50 text-blue-700 border-blue-200/80",
//     Pending: "bg-amber-50 text-amber-700 border-amber-200/80",
//     Delayed: "bg-rose-50 text-rose-700 border-rose-200/80",
//     Exception: "bg-purple-50 text-purple-700 border-purple-200/80",
//     Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
//     Approved: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
//     Active: "bg-teal-50 text-teal-700 border-teal-200/80",
//     "Quotation Sent": "bg-blue-50 text-blue-700 border-blue-200/80",
//     "Quotation Rejected": "bg-rose-50 text-rose-700 border-rose-200/80",
//     "Quotation Accepted": "bg-emerald-50 text-emerald-700 border-emerald-200/80",
//     "Quotation Draft": "bg-amber-50 text-amber-700 border-amber-200/80",
//   };

//   const dots = {
//     "In Transit": "bg-blue-500",
//     Pending: "bg-amber-500",
//     Delayed: "bg-rose-500",
//     Exception: "bg-purple-500",
//     Delivered: "bg-emerald-500",
//     Approved: "bg-indigo-500",
//     Active: "bg-teal-500",
//     "Quotation Sent": "bg-blue-500",
//     "Quotation Rejected": "bg-rose-500",
//     "Quotation Accepted": "bg-emerald-500",
//     "Quotation Draft": "bg-amber-500",
//   };

//   const badgeStyle = styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
//   const dotColor = dots[status] || "bg-slate-400";

//   return (
//     <span
//       className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs whitespace-nowrap ${badgeStyle}`}
//     >
//       <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
//       {status || "Unknown"}
//     </span>
//   );
// }

// function SectionCard({ children, className = "" }) {
//   return (
//     <div
//       className={`bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all duration-200 ${className}`}
//     >
//       {children}
//     </div>
//   );
// }

// function DropdownButton({ text, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition shadow-2xs shrink-0"
//     >
//       {text} <ChevronDown size={12} className="text-slate-400" />
//     </button>
//   );
// }

// export default function Shipment({ setActiveTab: setParentTab, activeTab: parentTab, currectTab }) {
//   const [activeTab, setActiveTab] = useState("All Shipments");
//   const [dashboard, setDashboard] = useState({});
//   const [shipments, setShipments] = useState([]);
//   const [statusOverview, setStatusOverview] = useState([]);
//   const [shipmentModes, setShipmentModes] = useState([]);
//   const [originCountries, setOriginCountries] = useState([]);
//   const [shipmentTracker, setShipmentTracker] = useState(null);
//   const [trackingId, setTrackingId] = useState("");
//   const [trackingShipmentId, setTrackingShipmentId] = useState("");
//   const [trackingLoading, setTrackingLoading] = useState(false);
//   const [showTrackingModal, setShowTrackingModal] = useState(false);
//   const [trackingError, setTrackingError] = useState("");
//   const [showShipmentView, setShowShipmentView] = useState(false);
//   const [viewShipmentId, setViewShipmentId] = useState(null);
//   const [editShipmentId, setEditShipmentId] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const ITEMS_PER_PAGE = 10;
//   const [destinationCountries, setDestinationCountries] = useState([]);
//   const [recentAlerts, setRecentAlerts] = useState([]);
//   const [filters, setFilters] = useState({
//     status: ["All Status", "Active", "Inactive", "Pending", "Approved", "Completed", "Expired", "Draft", "Under Review"],
//     origins: ["India", "USA", "China"],
//     destinations: ["India", "USA", "China"],
//     modes: ["Sea freight", "Air Freight", "Rail Freight", "Road Freight", "Multimodal", "Express"],
//   });
//   const [loading, setLoading] = useState(false);
//   const [shipment, setShipment] = useState("");
//   const [highRisk, setHighRisk] = useState(false);
//   const [startDate, setStartDate] = useState(null);
//   const [endDate, setEndDate] = useState(null);
//   const [shipmentStartDate, setShipmentStartDate] = useState(null);
//   const [shipmentEndDate, setShipmentEndDate] = useState(null);
//   const [dateRange, setDateRange] = useState(false);
//   const [exportReport, setExportReport] = useState(false);

//   const [showQuotation, setShowQuotation] = useState(false);
//   const [selectedShipment, setSelectedShipment] = useState(null);
//   const [selectedQuotation, setSelectedQuotation] = useState(null);
//   const [quotationLoading, setQuotationLoading] = useState(false);

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedStatus, setSelectedStatus] = useState("");
//   const [selectedOrigin, setSelectedOrigin] = useState("");
//   const [selectedDestination, setSelectedDestination] = useState("");
//   const [selectedMode, setSelectedMode] = useState("");

//   // Menu State with Fixed Coordinates
//   const [openMenu, setOpenMenu] = useState(null);
//   const [menuCoords, setMenuCoords] = useState({ top: 0, right: 0 });

//   const [appliedFilters, setAppliedFilters] = useState({
//     search: "",
//     status: "",
//     origin: "",
//     destination: "",
//     mode: "",
//     startDate: null,
//     endDate: null,
//   });

//   const fetchShipments = async () => {
//     try {
//       setLoading(true);
//       const res = await getShipments();
//       setShipments(res.data?.data || []);
//     } catch (err) {
//       console.error("FETCH SHIPMENTS ERROR:", err?.response?.data || err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchDashboard = async () => {
//     try {
//       const res = await getDashboard();
//       setDashboard(res.data.data || {});
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchStatusOverview = async () => {
//     try {
//       const res = await getShipmentStatusOverview();
//       setStatusOverview(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchShipmentModes = async () => {
//     try {
//       const res = await getShipmentsByMode();
//       setShipmentModes(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchTopOriginCountries = async () => {
//     try {
//       const res = await getTopOriginCountries();
//       setOriginCountries(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchTopDestinationCountries = async () => {
//     try {
//       const res = await getTopDestinationCountries();
//       setDestinationCountries(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const fetchRecentAlerts = async () => {
//     try {
//       const res = await getRecentAlerts();
//       setRecentAlerts(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Resolve shipment reference / SB number / AWB / Mongo ID before requesting tracking.
//   const fetchShipmentTracker = async (identifier) => {
//     const value = String(identifier || "").trim();
//     if (!value) { setTrackingError("Enter a shipment reference or ID."); return null; }
//     const matched = shipments.find((item) =>
//       [item._id, item.referenceNumber, item.sbNumber,
//        item.awbNumber, item.additionalInformation?.awbNumber]
//         .filter(Boolean)
//         .some((ref) => String(ref).toLowerCase() === value.toLowerCase())
//     );
//     if (!matched?._id) {
//       setTrackingError("Shipment not found in your list.");
//       setShipmentTracker(null);
//       return null;
//     }
//     setTrackingLoading(true);
//     setTrackingError("");
//     try {
//       const res = await getShipmentTracker(matched._id);
//       const data = res.data?.data || null;
//       if (!data) throw new Error("Tracking details unavailable.");
//       setShipmentTracker(data);
//       setTrackingShipmentId(matched._id);
//       setTrackingId(value);
//       return data;
//     } catch (error) {
//       setTrackingError(error?.response?.data?.message || error.message || "Tracking failed.");
//       setShipmentTracker(null);
//       return null;
//     } finally {
//       setTrackingLoading(false);
//     }
//   };

//   const fetchFilterOptions = async () => {
//     try {
//       const res = await getFilterOptions();
//       setFilters(res.data.data || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleApplyFilters = () => {
//     setAppliedFilters({
//       search: searchQuery,
//       status: selectedStatus,
//       origin: selectedOrigin,
//       destination: selectedDestination,
//       mode: selectedMode,
//       startDate: startDate,
//       endDate: endDate,
//     });
//   };

//   const handleResetFilters = () => {
//     setSearchQuery("");
//     setSelectedStatus("");
//     setSelectedOrigin("");
//     setSelectedDestination("");
//     setSelectedMode("");
//     setStartDate(null);
//     setEndDate(null);

//     setAppliedFilters({
//       search: "",
//       status: "",
//       origin: "",
//       destination: "",
//       mode: "",
//       startDate: null,
//       endDate: null,
//     });
//   };

//   // Only remove from the current UI list; do not claim to delete on server.
//   const handleRemoveFromView = (id) => {
//     if (window.confirm("Remove this shipment from the current list? (Not deleted from server)")) {
//       setShipments((prev) => prev.filter((item) => item._id !== id));
//     }
//   };

//   // Fixed dropdown toggle handler
//   const handleMenuClick = (e, index) => {
//     e.stopPropagation();
//     if (openMenu === index) {
//       setOpenMenu(null);
//       return;
//     }
//     const rect = e.currentTarget.getBoundingClientRect();
//     const spaceBelow = window.innerHeight - rect.bottom;
//     const openUpward = spaceBelow < 160;

//     setMenuCoords({
//       top: openUpward ? rect.top - 145 : rect.bottom + 6,
//       right: window.innerWidth - rect.right,
//     });
//     setOpenMenu(index);
//   };

//   const filteredShipments = useMemo(() => {
//     return shipments.filter((s) => {
//       const shipmentId = s.referenceNumber || s.sbNumber || "";
//       const awbNumber = s.additionalInformation?.awbNumber || "";
//       const product = s.cargo?.productName || "";
//       const hsCode = getHsCodeLabel(s.cargo || {});
//       const status = s.shipmentStatus || s.status || "";
//       const origin = [s.route?.originCity, s.route?.originCountry].filter(Boolean).join(" ");
//       const destination = [s.route?.destinationCity, s.route?.destinationCountry].filter(Boolean).join(" ");
//       const mode = s.shipmentMode || s.route?.mode || "";
//       const shipmentDate = s.shipmentDate ? new Date(s.shipmentDate) : null;

//       const searchText = `
//         ${shipmentId}
//         ${awbNumber}
//         ${product}
//         ${hsCode}
//         ${origin}
//         ${destination}
//       `.toLowerCase();

//       if (appliedFilters.search && !searchText.includes(appliedFilters.search.toLowerCase())) {
//         return false;
//       }
//       if (appliedFilters.status && status !== appliedFilters.status) {
//         return false;
//       }
//       if (appliedFilters.origin && !origin.toLowerCase().includes(appliedFilters.origin.toLowerCase())) {
//         return false;
//       }
//       if (appliedFilters.destination && !destination.toLowerCase().includes(appliedFilters.destination.toLowerCase())) {
//         return false;
//       }
//       if (appliedFilters.mode && mode.toLowerCase() !== appliedFilters.mode.toLowerCase()) {
//         return false;
//       }
//       if (
//         appliedFilters.startDate &&
//         (!shipmentDate || shipmentDate < new Date(new Date(appliedFilters.startDate).setHours(0, 0, 0, 0)))
//       ) {
//         return false;
//       }
//       if (
//         appliedFilters.endDate &&
//         (!shipmentDate || shipmentDate > new Date(new Date(appliedFilters.endDate).setHours(23, 59, 59, 999)))
//       ) {
//         return false;
//       }

//       return true;
//     });
//   }, [shipments, appliedFilters]);

//   const totalPages = Math.max(1, Math.ceil(filteredShipments.length / ITEMS_PER_PAGE));
//   const paginatedShipments = filteredShipments.slice(
//     (currentPage - 1) * ITEMS_PER_PAGE,
//     currentPage * ITEMS_PER_PAGE
//   );
//   useEffect(() => { setCurrentPage(1); setOpenMenu(null); }, [appliedFilters]);
//   useEffect(() => { setCurrentPage((page) => Math.min(page, totalPages)); }, [totalPages]);

//   const KPI_STATS = [
//     {
//       title: "Total Shipments",
//       value: dashboard.totalShipments || shipments.length || 0,
//       change: "—",
//       icon: Square,
//       bg: "bg-blue-50 text-blue-600 border-blue-100",
//       up: true,
//     },
//     {
//       title: "In Transit",
//       value: dashboard.inTransit || 0,
//       change: "—",
//       icon: RectangleHorizontal,
//       bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
//       up: true,
//     },
//     {
//       title: "Delivered",
//       value: dashboard.delivered || 0,
//       change: "—",
//       icon: CheckCircle2,
//       bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
//       up: true,
//     },
//     {
//       title: "Delayed",
//       value: dashboard.delayed || 0,
//       change: "—",
//       icon: Clover,
//       bg: "bg-amber-50 text-amber-600 border-amber-100",
//       up: false,
//     },
//     {
//       title: "Exceptions",
//       value: dashboard.exception || 0,
//       change: "—",
//       icon: ArrowUpCircle,
//       bg: "bg-rose-50 text-rose-600 border-rose-100",
//       up: false,
//     },
//     {
//       title: "Shipment Value",
//       value: dashboard.shipmentValue === null || dashboard.shipmentValue === undefined
//         ? "Not available"
//         : new Intl.NumberFormat("en-IN", {
//             style: "currency",
//             currency: "INR",
//             maximumFractionDigits: 2,
//           }).format(Number(dashboard.shipmentValue) || 0),
//       change: "—",
//       icon: Gem,
//       bg: "bg-violet-50 text-violet-600 border-violet-100",
//       up: true,
//     },
//   ];

//   const STATUS_OVERVIEW = statusOverview.map((item) => ({
//     name: item._id,
//     value: item.count,
//     percent:
//       dashboard.totalShipments > 0
//         ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
//         : "0%",
//     color:
//       item._id === "In Transit"
//         ? "#3B82F6"
//         : item._id === "Delivered"
//         ? "#10B981"
//         : item._id === "Pending"
//         ? "#F59E0B"
//         : item._id === "Delayed"
//         ? "#EF4444"
//         : "#8B5CF6",
//   }));

//   const SHIPMENTS_BY_MODE = shipmentModes.map((item) => ({
//     name: item._id,
//     value: item.count,
//     percent:
//       dashboard.totalShipments > 0
//         ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
//         : "0%",
//     color:
//       item._id === "Sea"
//         ? "#3B82F6"
//         : item._id === "Air"
//         ? "#06B6D4"
//         : item._id === "Road"
//         ? "#F59E0B"
//         : "#8B5CF6",
//   }));

//   const TOP_ORIGINS = originCountries.map((item) => ({
//     country: item._id,
//     value: item.shipments,
//     percent:
//       dashboard.totalShipments > 0
//         ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
//         : "0%",
//     width:
//       dashboard.totalShipments > 0
//         ? `${(item.shipments / dashboard.totalShipments) * 100}%`
//         : "0%",
//   }));

//   const timeline = shipmentTracker?.trackingTimeline?.length
//     ? shipmentTracker.trackingTimeline
//     : (shipmentTracker?.statusHistory || []);
//   const currentTrackIndex = timeline.findIndex((item) => item.current === true);
//   const TRACKER_STEPS = timeline.map((item, idx) => ({
//     label: item.status || "Update",
//     date: (item.createdAt || item.updatedAt)
//       ? formatShipmentDate(item.createdAt || item.updatedAt) : "-",
//     done: currentTrackIndex === -1 ? true : idx <= currentTrackIndex,
//     current: idx === currentTrackIndex,
//   }));

//   useEffect(() => {
//     fetchShipments();
//     fetchDashboard();
//     fetchStatusOverview();
//     fetchShipmentModes();
//     fetchTopOriginCountries();
//     fetchTopDestinationCountries();
//     fetchRecentAlerts();
//     fetchFilterOptions();
//   }, []);

//   useEffect(() => {
//     if (shipments.length > 0 && !shipmentTracker) {
//       const first = shipments[0];
//       fetchShipmentTracker(first.referenceNumber || first.sbNumber || first._id);
//     }
//   }, [shipments]);

//   // Close dropdown on click outside or on page scroll
//   useEffect(() => {
//     const handleClose = () => setOpenMenu(null);
//     document.addEventListener("click", handleClose);
//     window.addEventListener("scroll", handleClose, true);
//     window.addEventListener("resize", handleClose);
//     return () => {
//       document.removeEventListener("click", handleClose);
//       window.removeEventListener("scroll", handleClose, true);
//       window.removeEventListener("resize", handleClose);
//     };
//   }, []);

//   const handleViewQuotation = async (shipmentData) => {
//     if (!shipmentData?._id) return window.alert("Shipment ID not found");
//     setQuotationLoading(true);
//     try {
//       const response = await getQuotationByShipment(shipmentData._id);
//       const payload = response.data?.data?.quotation ?? response.data?.data ?? response.data?.quotation ?? null;
//       const quotations = Array.isArray(payload) ? payload : payload ? [payload] : [];
//       // Show the latest sent quotation, including rejected/accepted responses.
//       const latestQuotation = [...quotations].sort(
//         (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
//       )[0];

//       const quotation =
//         latestQuotation &&
//         ["Shared", "Rejected", "Accepted"].includes(latestQuotation.status)
//           ? latestQuotation
//           : null;

//       if (!quotation) {
//         window.alert("No quotation has been sent for this shipment yet.");
//         return;
//       }
//       setSelectedShipment(shipmentData);
//       setSelectedQuotation(quotation);
//       setShowQuotation(true);
//     } catch (error) {
//       window.alert(error?.response?.data?.message || "Unable to fetch quotation");
//     } finally {
//       setQuotationLoading(false);
//     }
//   };

//   const handleAcceptQuotation = async () => {
//     if (!selectedQuotation?._id) return;
//     try {
//       const response = await acceptQuotation(selectedQuotation._id);
//       const updated = response.data?.data?.quotation ?? response.data?.data;
//       setSelectedQuotation(updated?._id ? updated : (old) => ({ ...old, status: "Accepted" }));
//       await fetchShipments();
//       window.alert(response.data?.message || "Quotation accepted successfully");
//     } catch (error) {
//       window.alert(error?.response?.data?.message || "Unable to accept quotation");
//       throw error;
//     }
//   };

//   const handleRejectQuotation = async (reason) => {
//     if (!selectedQuotation?._id) return;
//     try {
//       const response = await rejectQuotation(selectedQuotation._id, reason);
//       const updated = response.data?.data?.quotation ?? response.data?.data;
//       setSelectedQuotation(updated?._id ? updated : (old) => ({ ...old, status: "Rejected" }));
//       await fetchShipments();
//       window.alert(response.data?.message || "Quotation rejected successfully");
//     } catch (error) {
//       window.alert(error?.response?.data?.message || "Unable to reject quotation");
//       throw error;
//     }
//   };

//   return (
//     <div
//       className="min-h-screen w-full bg-[#F8FAFC] text-slate-700 antialiased font-['Poppins',sans-serif]"
//       style={{ fontFamily: "'Poppins', sans-serif" }}
//     >
//       <link
//         href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
//         rel="stylesheet"
//       />

//       {!shipment && (
//         <div className="max-w-[1540px] mx-auto p-1 sm:p-1 lg:p-1 space-y-6">
//           {/* Top Header */}
//           <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 pb-2 border-b border-slate-200/70">
//             {/* <div>
//               <div className="flex items-center gap-2.5">
//                 <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
//                   <Ship size={20} />
//                 </div>
//                 <div>
//                   <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
//                     Shipment Operations Hub
//                   </h1>
//                   <p className="text-xs text-slate-400 font-medium">
//                     Monitor freight tracking, customs status, and supply-chain metrics.
//                   </p>
//                 </div>
//               </div>
//             </div> */}

//             <div className="flex items-center gap-2.5 flex-wrap">
//               <div className="relative">
//                 <DatePicker
//                   selected={shipmentStartDate}
//                   onChange={(dates) => {
//                     const [start, end] = dates;
//                     setShipmentStartDate(start);
//                     setShipmentEndDate(end);
//                   }}
//                   startDate={shipmentStartDate}
//                   endDate={shipmentEndDate}
//                   selectsRange
//                   dateFormat="dd MMM yyyy"
//                   placeholderText="01 Apr 2025 - 24 Apr 2025"
//                   className="bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 pl-3.5 pr-9 py-2.5 rounded-xl shadow-2xs hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition outline-none cursor-pointer"
//                 />
//                 <CalendarDays
//                   size={15}
//                   className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                 />
//               </div>

//               <button
//                 onClick={() => setExportReport(true)}
//                 className="inline-flex items-center gap-2 bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 px-4 py-2.5 rounded-xl shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition"
//               >
//                 <Download size={14} className="text-slate-500" /> Export CSV
//               </button>

//               <button
//                 onClick={() => { setEditShipmentId(null); setShipment("shipment"); }}
//                 className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/25 transition active:scale-95"
//               >
//                 <Plus size={15} /> New Shipment
//               </button>
//             </div>
//           </div>

//           {/* Metric KPI Cards */}
//           <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
//             {KPI_STATS.map((stat, idx) => {
//               const Icon = stat.icon;
//               return (
//                 <div
//                   key={idx}
//                   className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between"
//                 >
//                   <div className="flex items-center justify-between">
//                     <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
//                       {stat.title}
//                     </span>
//                     <div
//                       className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${stat.bg}`}
//                     >
//                       <Icon size={16} />
//                     </div>
//                   </div>
//                   <div className="mt-3">
//                     <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
//                       {stat.value}
//                     </h3>
//                     <div className="flex items-center gap-1 mt-1">
//                       {stat.up ? (
//                         <TrendingUp size={12} className="text-emerald-500" />
//                       ) : (
//                         <TrendingDown size={12} className="text-rose-500" />
//                       )}
//                       <span
//                         className={`text-[10px] font-bold ${
//                           stat.up ? "text-emerald-600" : "text-rose-600"
//                         }`}
//                       >
//                         {stat.change}
//                       </span>
//                       <span className="text-[10px] text-slate-400">trend unavailable</span>
//                     </div>
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           {/* Filters Bar Card */}
//           <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-3">
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 items-end">
//               {/* Search */}
//               <div className="xl:col-span-2">
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
//                   Search Shipment
//                 </label>
//                 <div className="relative">
//                   <input
//                     value={searchQuery}
//                     onChange={(e) => setSearchQuery(e.target.value)}
//                     placeholder="Search by B/L, Container, Ref..."
//                     className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition"
//                   />
//                   <Search
//                     size={14}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                   />
//                 </div>
//               </div>

//               {/* Date Range */}
//               <div>
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
//                   Date Range
//                 </label>
//                 <div className="relative">
//                   <DatePicker
//                     selected={startDate}
//                     onChange={(dates) => {
//                       const [start, end] = dates;
//                       setStartDate(start);
//                       setEndDate(end);
//                     }}
//                     startDate={startDate}
//                     endDate={endDate}
//                     selectsRange
//                     dateFormat="dd MMM yyyy"
//                     placeholderText="Select Dates"
//                     className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
//                   />
//                   <CalendarDays
//                     size={14}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                   />
//                 </div>
//               </div>

//               {/* Status */}
//               <div>
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
//                   Status
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={selectedStatus}
//                     onChange={(e) => setSelectedStatus(e.target.value)}
//                     className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
//                   >
//                     <option value="">All Statuses</option>
//                     {filters.status?.map((st) => (
//                       <option key={st} value={st}>
//                         {st}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown
//                     size={13}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                   />
//                 </div>
//               </div>

//               {/* Origin */}
//               <div>
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
//                   Origin
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={selectedOrigin}
//                     onChange={(e) => setSelectedOrigin(e.target.value)}
//                     className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
//                   >
//                     <option value="">All Origins</option>
//                     {filters.origins?.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown
//                     size={13}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                   />
//                 </div>
//               </div>

//               {/* Destination */}
//               <div>
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
//                   Destination
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={selectedDestination}
//                     onChange={(e) => setSelectedDestination(e.target.value)}
//                     className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
//                   >
//                     <option value="">All Destinations</option>
//                     {filters.destinations?.map((c) => (
//                       <option key={c} value={c}>
//                         {c}
//                       </option>
//                     ))}
//                   </select>
//                   <ChevronDown
//                     size={13}
//                     className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
//                   />
//                 </div>
//               </div>

//               {/* Transport Mode — preserved from first dashboard */}
//               <div>
//                 <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Transport Mode</label>
//                 <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}
//                   className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-4 text-xs">
//                   <option value="">All Modes</option>
//                   {(filters.modes || []).map((mode) => (
//                     <option key={mode} value={mode}>{mode}</option>
//                   ))}
//                 </select>
//               </div>

//               {/* Actions */}
//               <div className="flex items-center gap-2">
//                 <button
//                   onClick={handleApplyFilters}
//                   className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 px-3 text-xs font-bold transition shadow-2xs"
//                 >
//                   <Filter size={13} /> Apply
//                 </button>
//                 <button
//                   onClick={handleResetFilters}
//                   className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
//                   title="Reset Filters"
//                 >
//                   <RotateCcw size={14} />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Full Width Shipments Table */}
//           <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
//             <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
//               <div className="flex items-center gap-2.5">
//                 <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
//                   All Consignments
//                 </h2>
//                 <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
//                   {filteredShipments.length} Active
//                 </span>
//               </div>
//               <p className="text-xs text-slate-400 font-medium">
//                 ETD and ETA from shipment records
//               </p>
//             </div>

//             <div className="w-full overflow-x-auto">
//               <table className="w-full text-left text-xs border-collapse min-w-[980px]">
//                 <thead>
//                   <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
//                     <th className="py-3 px-4 w-10 text-center">
//                       <input type="checkbox" className="accent-blue-600 rounded cursor-pointer" />
//                     </th>
//                     <th className="py-3 px-4">Shipment / B.L No.</th>
//                     <th className="py-3 px-4">Route (Origin → Dest.)</th>
//                     <th className="py-3 px-4 text-center">Status</th>
//                     <th className="py-3 px-4">ETD / ATD</th>
//                     {/* <th className="py-3 px-4">ETA Status</th> */}
//                     <th className="py-3 px-4 text-center">Mode</th>
//                     <th className="py-3 px-4">Commodity / HS</th>
//                     <th className="py-3 px-4 text-right">Declared Value</th>
//                     <th className="py-3 px-4 text-center">Actions</th>
//                   </tr>
//                 </thead>
//                 <tbody className="divide-y divide-slate-100">
//                   {filteredShipments.length === 0 ? (
//                     <tr>
//                       <td colSpan={10} className="py-14 text-center text-slate-400 text-xs">
//                         No shipments found matching the applied filter criteria.
//                       </td>
//                     </tr>
//                   ) : (
//                     paginatedShipments.map((s, i) => (
//                       <tr
//                         key={s._id || i}
//                         className="hover:bg-slate-50/90 transition-colors duration-150 group"
//                       >
//                         {/* Checkbox */}
//                         <td className="py-3.5 px-4 text-center">
//                           <input type="checkbox" className="accent-blue-600 rounded cursor-pointer" />
//                         </td>

//                         {/* Shipment / B.L No */}
//                         <td className="py-3.5 px-4 whitespace-nowrap">
//                           <span className="font-extrabold text-slate-900 group-hover:text-blue-600 transition block">
//                             {s.referenceNumber || s.sbNumber || "REF-UNASSIGNED"}
//                           </span>
//                           <span className="text-[10px] font-medium text-slate-400">
//                             AWB: {s.additionalInformation?.awbNumber || "Pending"}
//                           </span>
//                         </td>

//                         {/* Route */}
//                         <td className="py-3.5 px-4 whitespace-nowrap">
//                           <div className="flex items-center gap-2">
//                             <div className="flex items-center gap-1.5 font-bold text-slate-800">
//                               <Flag country={s.route?.originCountry} size={14} />
//                               <span>{s.route?.originCity || s.route?.originCountry || "Not provided"}</span>
//                             </div>
//                             <ArrowRight size={12} className="text-slate-400 shrink-0" />
//                             <div className="flex items-center gap-1.5 font-bold text-slate-800">
//                               <Flag country={s.route?.destinationCountry} size={14} />
//                               <span>{s.route?.destinationCity || s.route?.destinationCountry || "Not provided"}</span>
//                             </div>
//                           </div>
//                           <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
//                             {s.route?.originCountry || "Not provided"} → {s.route?.destinationCountry || "Not provided"}
//                           </span>
//                         </td>

//                         {/* Status */}
//                         <td className="py-3.5 px-4 text-center whitespace-nowrap">
//                           <StatusBadge status={s.shipmentStatus || s.status} />
//                         </td>

//                         {/* ETD / ATD */}
//                         <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
//                           <div>
//                             ETD:{" "}
//                             <span className="font-bold text-slate-800">
//                               {s.etd ? new Date(s.etd).toLocaleDateString("en-GB") : "-"}
//                             </span>
//                           </div>
//                           <div className="text-[10px] text-slate-400">
//                             ATD: {s.atd ? new Date(s.atd).toLocaleDateString("en-GB") : "-"}
//                           </div>
//                         </td>

//                         {/* ETA date + derived ETA status */}
//                         {/* <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
//                           <div className="font-bold text-slate-800">
//                             {s.eta ? new Date(s.eta).toLocaleDateString("en-GB") : "Not scheduled"}
//                           </div>
//                           <span className={`text-[10px] font-semibold block mt-0.5 ${
//                             getEtaStatus(s) === "Overdue"
//                               ? "text-rose-600"
//                               : getEtaStatus(s) === "Delivered"
//                               ? "text-emerald-600"
//                               : getEtaStatus(s) === "On schedule"
//                               ? "text-blue-600"
//                               : "text-slate-400"
//                           }`}>
//                             {getEtaStatus(s)}
//                           </span>
//                           {s.etaNote && (
//                             <span className="text-[10px] font-semibold text-rose-500 block">{s.etaNote}</span>
//                           )}
//                         </td> */}

//                         {/* Mode */}
//                         <td className="py-3.5 px-4 text-center whitespace-nowrap">
//                           <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600">
//                             {s.route?.mode === "Air" ? (
//                               <Plane size={14} />
//                             ) : s.route?.mode === "Road" ? (
//                               <Truck size={14} />
//                             ) : (
//                               <Anchor size={14} />
//                             )}
//                           </span>
//                         </td>

//                         {/* Commodity / HS Code */}
//                         <td className="py-3.5 px-4 whitespace-nowrap">
//                           <div className="font-bold text-slate-800 truncate max-w-[170px]">
//                             {s.cargo?.productName || "General Goods"}
//                           </div>
//                           <div className="text-[10px] font-semibold text-blue-600">
//                             HS: {getHsCodeLabel(s.cargo || {})}
//                           </div>
//                         </td>

//                         {/* Declared Value */}
//                         <td className="py-3.5 px-4 text-right font-black text-slate-900 whitespace-nowrap">
//                           {formatDeclaredValue(s)}
//                         </td>

//                         {/* Actions Trigger */}
//                         <td className="py-3.5 px-4 text-center whitespace-nowrap">
//                           <button
//                             onClick={(e) => handleMenuClick(e, s._id)}
//                             className={`p-1.5 rounded-xl transition ${
//                               openMenu === s._id
//                                 ? "bg-blue-50 text-blue-600 shadow-2xs"
//                                 : "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
//                             }`}
//                           >
//                             <MoreVertical size={16} />
//                           </button>
//                         </td>
//                       </tr>
//                     ))
//                   )}
//                 </tbody>
//               </table>
//             </div>

//             {/* Working pagination: 10 records per page */}
//             <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-slate-100 text-xs text-slate-500">
//               <span>
//                 Showing {filteredShipments.length ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
//                 {Math.min(currentPage * ITEMS_PER_PAGE, filteredShipments.length)} of {filteredShipments.length} shipments
//               </span>
//               <div className="flex items-center gap-2">
//                 <button disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
//                   className="px-3 py-1.5 border rounded-lg disabled:opacity-40">Prev</button>
//                 <span className="font-semibold text-slate-700">Page {currentPage} / {totalPages}</span>
//                 <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
//                   className="px-3 py-1.5 border rounded-lg disabled:opacity-40">Next</button>
//               </div>
//             </div>
//           </div>

//           {/* Lower Section (Tracker, Alerts, Analytics) */}
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//             {/* Shipment Tracker Card */}
//             <SectionCard className="lg:col-span-2">
//               <div className="flex justify-between items-center mb-4">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
//                     <MapPin size={15} />
//                   </div>
//                   <div>
//                     <h3 className="font-black text-sm text-slate-900 tracking-tight">
//                       Shipment Tracking & Carrier Lookup
//                     </h3>
//                     <p className="text-[11px] text-slate-400">
//                       Tracking:{" "}
//                       <span className="font-bold text-slate-700">
//                         {shipmentTracker?.referenceNumber || shipmentTracker?.sbNumber || "N/A"}
//                       </span>
//                     </p>
//                   </div>
//                 </div>
//                 <StatusBadge status={shipmentTracker?.shipmentStatus || "Not available"} />
//               </div>

//               <div className="mb-4 space-y-2">
//                 <div className="flex items-center gap-2">
//                   <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
//                     onKeyDown={async (e) => { if (e.key === "Enter") await fetchShipmentTracker(trackingId); }}
//                     placeholder="Shipment reference / SB / AWB number"
//                     className="flex-1 min-w-0 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500" />
//                   <button disabled={trackingLoading || !trackingId.trim()}
//                     onClick={() => fetchShipmentTracker(trackingId)}
//                     className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs disabled:opacity-40">
//                     {trackingLoading ? "Tracking..." : "Track"}
//                   </button>
//                   <button disabled={!shipmentTracker || !trackingShipmentId}
//                     onClick={() => setShowTrackingModal(true)}
//                     className="border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs disabled:opacity-40">
//                     View
//                   </button>
//                 </div>
//                 {trackingError && <p className="text-xs text-rose-600">{trackingError}</p>}
//               </div>

//               {/* Map Graphic Box */}
//               <div
//                 className="relative h-36 rounded-2xl overflow-hidden border border-slate-200/80 p-4 flex flex-col justify-between"
//                 style={{
//                   background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
//                 }}
//               >
//                 <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full opacity-60">
//                   <path
//                     d="M 40 70 Q 180 15 360 60"
//                     fill="none"
//                     stroke="#38BDF8"
//                     strokeWidth="3"
//                     strokeDasharray="6 4"
//                   />
//                   <circle cx="40" cy="70" r="5" fill="#38BDF8" />
//                   <circle cx="360" cy="60" r="5" fill="#34D399" />
//                 </svg>

//                 <div className="relative z-10 flex justify-between text-white text-xs">
//                   <span className="font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">
//                     Origin: {shipmentTracker?.route?.originCity || "N/A"} (IN)
//                   </span>
//                   <span className="font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">
//                     Dest: {shipmentTracker?.route?.destinationCity || "N/A"} (NL)
//                   </span>
//                 </div>

//                 <div className="relative z-10 grid grid-cols-3 gap-2 text-white/90 text-center bg-white/5 backdrop-blur-md p-2 rounded-xl">
//                   <div>
//                     <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
//                       Location
//                     </span>
//                     <span className="text-xs font-bold">
//                       {shipmentTracker?.liveTracking?.location?.city || shipmentTracker?.currentLocation?.city || "N/A"}
//                     </span>
//                   </div>
//                   <div>
//                     <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
//                       Speed / Mode
//                     </span>
//                     <span className="text-xs font-bold">{shipmentTracker?.liveTracking?.speed || "Not available"} • {shipmentTracker?.route?.mode || "N/A"}</span>
//                   </div>
//                   <div>
//                     <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
//                       Days to Arrival
//                     </span>
//                     <span className="text-xs font-bold text-teal-300">
//                       {shipmentTracker?.eta
//                         ? `${Math.max(
//                             0,
//                             Math.ceil(
//                               (new Date(shipmentTracker.eta) - new Date()) /
//                                 (1000 * 60 * 60 * 24)
//                             )
//                           )} Days`
//                         : "Not available"}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               {/* Progress Milestones Stepper */}
//               <div className="flex items-center justify-between mt-5 px-1">
//                 {TRACKER_STEPS.length === 0 ? <p className="text-xs text-slate-400">No tracking updates available.</p> : TRACKER_STEPS.map((step, i) => (
//                   <div key={i} className="flex-1 flex flex-col items-center relative">
//                     {i !== 0 && (
//                       <div
//                         className={`absolute top-2.5 right-1/2 w-full h-[2px] -z-10 ${
//                           TRACKER_STEPS[i - 1].done ? "bg-blue-600" : "bg-slate-200"
//                         }`}
//                       />
//                     )}
//                     <div
//                       className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
//                         step.done
//                           ? "bg-blue-600 text-white shadow-xs"
//                           : step.current
//                           ? "bg-white border-2 border-blue-600 text-blue-600 ring-4 ring-blue-500/10"
//                           : "bg-white border border-slate-200 text-slate-400"
//                       }`}
//                     >
//                       {step.done ? <Check size={12} /> : i + 1}
//                     </div>
//                     <span
//                       className={`text-[9px] font-bold mt-1.5 text-center leading-tight ${
//                         step.current ? "text-blue-600 font-extrabold" : "text-slate-600"
//                       }`}
//                     >
//                       {step.label}
//                     </span>
//                     <span className="text-[9px] text-slate-400">{step.date}</span>
//                   </div>
//                 ))}
//               </div>
//             </SectionCard>

//             {/* Recent Alerts Card */}
//             <SectionCard>
//               <div className="flex justify-between items-center mb-3.5">
//                 <div className="flex items-center gap-2">
//                   <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
//                     <AlertTriangle size={15} />
//                   </div>
//                   <h3 className="font-black text-sm text-slate-900 tracking-tight">
//                     Recent Risk Alerts
//                   </h3>
//                 </div>
//                 <button
//                   className="text-blue-600 hover:text-blue-700 text-xs font-bold transition"
//                   onClick={() => setHighRisk(true)}
//                 >
//                   View All →
//                 </button>
//               </div>

//               <div className="space-y-3">
//                 {recentAlerts.length === 0 ? (
//                   <div className="text-center py-8 text-slate-400 text-xs font-medium">
//                     No active high-risk alerts.
//                   </div>
//                 ) : (
//                   recentAlerts.slice(0, 4).map((a, i) => {
//                     const isCritical = a.type === "Critical";
//                     const isWarning = a.type === "Warning";
//                     const bg = isCritical
//                       ? "bg-rose-50 border-rose-200/80"
//                       : isWarning
//                       ? "bg-amber-50 border-amber-200/80"
//                       : "bg-blue-50 border-blue-200/80";
//                     const textColor = isCritical
//                       ? "text-rose-700"
//                       : isWarning
//                       ? "text-amber-700"
//                       : "text-blue-700";

//                     return (
//                       <div
//                         key={a._id || i}
//                         className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${bg}`}
//                       >
//                         <AlertCircle size={15} className={`shrink-0 mt-0.5 ${textColor}`} />
//                         <div className="flex-1 min-w-0">
//                           <p className={`text-xs font-bold leading-tight ${textColor}`}>
//                             {a.title || "Customs Clearance Delay Notice"}
//                           </p>
//                           <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
//                             {a.message || "Port of Hamburg reported labor disruption."}
//                           </p>
//                           <span className="text-[9px] text-slate-400 font-semibold block mt-1">
//                             {a.createdAt
//                               ? new Date(a.createdAt).toLocaleTimeString([], {
//                                   hour: "2-digit",
//                                   minute: "2-digit",
//                                 })
//                               : "10:30 AM"}
//                           </span>
//                         </div>
//                       </div>
//                     );
//                   })
//                 )}
//               </div>
//             </SectionCard>
//           </div>

//           {/* Analytics Overview Strip */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
//             {/* Status Overview Donut */}
//             <SectionCard>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
//                   Status Distribution
//                 </h3>
//                 <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="relative w-28 h-28 shrink-0">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={STATUS_OVERVIEW}
//                         innerRadius={36}
//                         outerRadius={54}
//                         dataKey="value"
//                         stroke="none"
//                       >
//                         {STATUS_OVERVIEW.map((entry, index) => (
//                           <Cell key={index} fill={entry.color} />
//                         ))}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                     <span className="font-black text-sm text-slate-900 leading-none">
//                       {dashboard.totalShipments || shipments.length || 0}
//                     </span>
//                     <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
//                       Total
//                     </span>
//                   </div>
//                 </div>
//                 <div className="space-y-1.5 flex-1 text-xs">
//                   {STATUS_OVERVIEW.map((r, i) => (
//                     <div key={i} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className="w-2.5 h-2.5 rounded-full shrink-0"
//                           style={{ backgroundColor: r.color }}
//                         />
//                         <span className="text-slate-600 font-medium text-[11px]">{r.name}</span>
//                       </div>
//                       <span className="font-bold text-slate-900 text-[11px]">
//                         {r.value} ({r.percent})
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </SectionCard>

//             {/* Shipments by Mode Donut */}
//             <SectionCard>
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
//                   Shipments by Transport Mode
//                 </h3>
//                 <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
//               </div>
//               <div className="flex items-center gap-4">
//                 <div className="relative w-28 h-28 shrink-0">
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={SHIPMENTS_BY_MODE}
//                         innerRadius={36}
//                         outerRadius={54}
//                         dataKey="value"
//                         stroke="none"
//                       >
//                         {SHIPMENTS_BY_MODE.map((entry, index) => (
//                           <Cell key={index} fill={entry.color} />
//                         ))}
//                       </Pie>
//                     </PieChart>
//                   </ResponsiveContainer>
//                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
//                     <span className="font-black text-sm text-slate-900 leading-none">
//                       {SHIPMENTS_BY_MODE.length || 3}
//                     </span>
//                     <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
//                       Modes
//                     </span>
//                   </div>
//                 </div>
//                 <div className="space-y-1.5 flex-1 text-xs">
//                   {SHIPMENTS_BY_MODE.map((r, i) => (
//                     <div key={i} className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <div
//                           className="w-2.5 h-2.5 rounded-full shrink-0"
//                           style={{ backgroundColor: r.color }}
//                         />
//                         <span className="text-slate-600 font-medium text-[11px]">{r.name}</span>
//                       </div>
//                       <span className="font-bold text-slate-900 text-[11px]">
//                         {r.value} ({r.percent})
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </SectionCard>

//             {/* Top Origin Countries Bar */}
//             <SectionCard className="sm:col-span-2 lg:col-span-1">
//               <div className="flex justify-between items-center mb-4">
//                 <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
//                   Top Origin Corridors
//                 </h3>
//                 <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
//               </div>
//               <div className="space-y-3">
//                 {TOP_ORIGINS.length === 0 ? (
//                   <div className="text-xs text-slate-400 text-center py-6">
//                     No origin corridor data available.
//                   </div>
//                 ) : (
//                   TOP_ORIGINS.map((c, i) => (
//                     <div key={i} className="text-xs">
//                       <div className="flex justify-between items-center mb-1">
//                         <span className="font-semibold text-slate-800 flex items-center gap-2">
//                           <Flag country={c.country} size={15} /> {c.country}
//                         </span>
//                         <span className="font-black text-slate-900">
//                           {c.value}{" "}
//                           <span className="text-slate-400 font-medium">({c.percent})</span>
//                         </span>
//                       </div>
//                       <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
//                         <div
//                           className="bg-blue-600 h-full rounded-full transition-all duration-500"
//                           style={{ width: c.width }}
//                         />
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </SectionCard>
//           </div>
//         </div>
//       )}

//       {/* 
//         FLOATING ACTION DROPDOWN PORTAL:
//         Table ke container se completely bahar open hoga, z-[9999] par floating.
//       */}
//       {openMenu !== null && filteredShipments.some((item) => item._id === openMenu) && (
//         <div
//           style={{
//             position: "fixed",
//             top: `${menuCoords.top}px`,
//             right: `${menuCoords.right}px`,
//             zIndex: 9999,
//           }}
//           onClick={(e) => e.stopPropagation()}
//           className="w-44 bg-white border border-slate-200/90 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-1.5 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150"
//         >
//           <button onClick={() => {
//             setViewShipmentId(openMenu);
//             setShowShipmentView(true);
//             setOpenMenu(null);
//           }} className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50">
//             <Eye size={14} /> View Details
//           </button>

//           {/* Second version: allow Draft editing directly from the row menu. */}
//           {String(filteredShipments.find((item) => item._id === openMenu)?.shipmentStatus || "").toLowerCase() === "draft" && (
//             <button
//               onClick={() => {
//                 setEditShipmentId(openMenu);
//                 setShowShipmentView(false);
//                 setViewShipmentId(null);
//                 setShipment("shipment");
//                 setOpenMenu(null);
//               }}
//               className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-amber-700 hover:bg-amber-50"
//             >
//               <FileText size={14} /> Edit Draft
//             </button>
//           )}

//           <button
//             onClick={() => {
//               handleViewQuotation(filteredShipments.find((item) => item._id === openMenu));
//               setOpenMenu(null);
//             }}
//             disabled={quotationLoading}
//             className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition disabled:opacity-50"
//           >
//             <FileText size={14} className="text-purple-500" /> Quotation
//           </button>

//           <div className="h-px bg-slate-100 my-0.5" />

//           <button
//             onClick={() => {
//               handleRemoveFromView(openMenu);
//               setOpenMenu(null);
//             }}
//             className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
//           >
//             <Trash2 size={14} /> Remove from view
//           </button>
//         </div>
//       )}

//       {/* Shipment Form Component */}
//       {shipment === "shipment" && (
//         <ShipmentForm
//           setActiveTab={setActiveTab}
//           setShipment={setShipment}
//           currentTab={"Shipments"}
//           editId={editShipmentId}
//           editShipmentId={editShipmentId}
//           onSaved={() => {
//             setEditShipmentId(null);
//             setShipment("");
//             fetchShipments();
//             fetchDashboard();
//             fetchStatusOverview();
//             fetchShipmentModes();
//             fetchTopOriginCountries();
//             fetchTopDestinationCountries();
//             fetchRecentAlerts();
//           }}
//         />
//       )}

//       {/* Quotation Modal */}
//       {/* Shipment View / Edit from first version */}
//       {showShipmentView && viewShipmentId && (
//         <ViewShipment
//           shipmentId={viewShipmentId}
//           onBack={() => { setShowShipmentView(false); setViewShipmentId(null); }}
//           onEdit={() => {
//             setEditShipmentId(viewShipmentId);
//             setShowShipmentView(false);
//             setViewShipmentId(null);
//             setShipment("shipment");
//           }}
//         />
//       )}

//       {showQuotation && selectedShipment && selectedQuotation && (
//         <B2BQuotation
//           shipment={selectedShipment}
//           quotation={selectedQuotation}
//           onAccept={handleAcceptQuotation}
//           onReject={handleRejectQuotation}
//           onClose={() => {
//             setShowQuotation(false);
//             setSelectedQuotation(null);
//             setSelectedShipment(null);
//           }}
//         />
//       )}

//       {/* Tracking modal preserved from first version */}
//       {showTrackingModal && (
//         <ShipmentTrackingModal
//           open={showTrackingModal}
//           shipmentId={trackingShipmentId}
//           onClose={() => setShowTrackingModal(false)}
//         />
//       )}

//       {/* High Risk Alerts Modal */}
//       {highRisk && <RecentHighRiskAlertsModal onClose={() => setHighRisk(false)} />}

//       {/* Date Range Modal */}
//       {dateRange && <DateRangeModal onClose={() => setDateRange(false)} />}

//       {/* Export Report Modal */}
//       {exportReport && <ExportReport onClose={() => setExportReport(false)} />}
//     </div>
//   );
// }


import React, { useState, useEffect, useMemo } from "react";
import CarrierTrackingResolver from "../../components/CarrierTrackingResolver";
import ReactCountryFlag from "react-country-flag";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import {
  getShipments,
  getDashboard,
  getShipmentStatusOverview,
  getShipmentTracker,
  getShipmentsByMode,
  getTopOriginCountries,
  getRecentAlerts,
  getTopDestinationCountries,
  getFilterOptions,
  getShipmentDetails,
} from "../../api/ShipmentApi";
import {
  getQuotationByShipment,
  acceptQuotation,
  rejectQuotation,
} from "../../api/QuotationApi";
import B2BQuotation from "../../components/b2bComponent/B2BQuotation";
import {
  CalendarDays,
  Download,
  Plus,
  Search,
  ChevronDown,
  Square,
  RectangleHorizontal,
  CheckCircle2,
  Clover,
  ArrowUpCircle,
  Gem,
  MoreVertical,
  Anchor,
  Plane,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  AlertCircle,
  Info,
  Clock,
  Check,
  MapPin,
  ArrowRight,
  RotateCcw,
  Eye,
  Trash2,
  FileText,
  Filter,
  Layers,
  TrendingUp,
  TrendingDown,
  Ship,
  Truck,
} from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import ShipmentForm from "../../components/ShipmentForm";
import ViewShipment from "../../components/b2bComponent/ShipmentView";
import ShipmentTrackingModal from "../../components/b2bComponent/ShipmentTracking";
import RecentHighRiskAlertsModal from "../../components/b2bComponent/RecentHighRisk";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import ExportReport from "../../components/b2bComponent/ExportReport";

const COUNTRY_CODES = {
  China: "CN",
  India: "IN",
  "South Korea": "KR",
  Netherlands: "NL",
  Germany: "DE",
  UAE: "AE",
  USA: "US",
  Japan: "JP",
  Australia: "AU",
  Singapore: "SG",
  Indonesia: "ID",
  Belgium: "BE",
};

const getHsCodeLabel = (cargo = {}) => {
  const hs = cargo.hsCode;
  if (cargo.hsCodeText && String(cargo.hsCodeText).trim()) {
    return String(cargo.hsCodeText).trim();
  }
  if (hs && typeof hs === "object") {
    return hs.hsCode || hs.code || hs.value || hs.name || "Not provided";
  }
  if (typeof hs === "string" && hs.trim()) {
    return hs.trim();
  }
  return "Not provided";
};

const getShipmentValue = (shipment = {}) => {
  const cargoValue = shipment.cargo?.value;
  const invoiceValue = shipment.invoice?.invoiceValue;
  const value = cargoValue ?? invoiceValue;
  return value === null || value === undefined || value === ""
    ? null
    : Number(value);
};

const formatShipmentValue = (shipment = {}) => {
  const value = getShipmentValue(shipment);
  if (value === null || !Number.isFinite(value)) return "Not provided";

  const currency = shipment.cargo?.currency || shipment.invoice?.currency || shipment.currency || "INR";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const formatShipmentDate = (date) => {
  if (!date) return "Not scheduled";
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return "Not scheduled";
  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getShipmentDeclaredValue = (shipment = {}) => {
  const rawValue =
    shipment.cargo?.value ??
    shipment.amount ??
    shipment.value ??
    shipment.invoice?.invoiceValue;

  if (rawValue === null || rawValue === undefined || rawValue === "") return null;
  const parsed = Number(rawValue);
  return Number.isFinite(parsed) ? parsed : null;
};

const formatDeclaredValue = (shipment = {}) => {
  const value = getShipmentDeclaredValue(shipment);
  if (value === null) return "Not provided";

  const currency =
    shipment.cargo?.currency ||
    shipment.currency ||
    shipment.invoice?.currency ||
    "INR";

  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  } catch {
    return `${currency} ${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
};

const getEtaStatus = (shipment = {}) => {
  const status = String(shipment.shipmentStatus || shipment.status || "").toLowerCase();
  if (status.includes("deliver")) return "Delivered";
  if (!shipment.eta) return "ETA not set";

  const etaDate = new Date(shipment.eta);
  if (Number.isNaN(etaDate.getTime())) return "ETA not set";

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  etaDate.setHours(0, 0, 0, 0);

  return etaDate < today ? "Overdue" : "On schedule";
};

function Flag({ country, size = 15 }) {
  return (
    <ReactCountryFlag
      countryCode={COUNTRY_CODES[country] || "US"}
      svg
      style={{
        width: size,
        height: size,
        borderRadius: "3px",
        boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
      }}
    />
  );
}

function StatusBadge({ status }) {
  const styles = {
    "In Transit": "bg-blue-50 text-blue-700 border-blue-200/80",
    Pending: "bg-amber-50 text-amber-700 border-amber-200/80",
    Delayed: "bg-rose-50 text-rose-700 border-rose-200/80",
    Exception: "bg-purple-50 text-purple-700 border-purple-200/80",
    Delivered: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    Approved: "bg-indigo-50 text-indigo-700 border-indigo-200/80",
    Active: "bg-teal-50 text-teal-700 border-teal-200/80",
    "Quotation Sent": "bg-blue-50 text-blue-700 border-blue-200/80",
    "Quotation Rejected": "bg-rose-50 text-rose-700 border-rose-200/80",
    "Quotation Accepted": "bg-emerald-50 text-emerald-700 border-emerald-200/80",
    "Quotation Draft": "bg-amber-50 text-amber-700 border-amber-200/80",
  };

  const dots = {
    "In Transit": "bg-blue-500",
    Pending: "bg-amber-500",
    Delayed: "bg-rose-500",
    Exception: "bg-purple-500",
    Delivered: "bg-emerald-500",
    Approved: "bg-indigo-500",
    Active: "bg-teal-500",
    "Quotation Sent": "bg-blue-500",
    "Quotation Rejected": "bg-rose-500",
    "Quotation Accepted": "bg-emerald-500",
    "Quotation Draft": "bg-amber-500",
  };

  const badgeStyle = styles[status] || "bg-slate-50 text-slate-700 border-slate-200";
  const dotColor = dots[status] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-1 rounded-full border shadow-2xs whitespace-nowrap ${badgeStyle}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dotColor}`} />
      {status || "Unknown"}
    </span>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-slate-200/80 rounded-2xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:border-slate-300 transition-all duration-200 ${className}`}
    >
      {children}
    </div>
  );
}

function DropdownButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 rounded-xl px-2.5 py-1.5 text-[11px] font-semibold text-slate-700 transition shadow-2xs shrink-0"
    >
      {text} <ChevronDown size={12} className="text-slate-400" />
    </button>
  );
}
export default function Shipment({
  setActiveTab: setParentTab,
  activeTab: parentTab,
  currectTab,
  accountType = "b2b",
}) {
  const [activeTab, setActiveTab] = useState("All Shipments");
  const [dashboard, setDashboard] = useState({});
  const [shipments, setShipments] = useState([]);
  const [statusOverview, setStatusOverview] = useState([]);
  const [shipmentModes, setShipmentModes] = useState([]);
  const [originCountries, setOriginCountries] = useState([]);
  const [shipmentTracker, setShipmentTracker] = useState(null);
  const [trackingId, setTrackingId] = useState("");
  const [trackingShipmentId, setTrackingShipmentId] = useState("");
  const [trackingLoading, setTrackingLoading] = useState(false);
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [trackingError, setTrackingError] = useState("");
  const [showShipmentView, setShowShipmentView] = useState(false);
  const [viewShipmentId, setViewShipmentId] = useState(null);
  const [editShipmentId, setEditShipmentId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 10;
  const [destinationCountries, setDestinationCountries] = useState([]);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [filters, setFilters] = useState({
    status: ["All Status", "Active", "Inactive", "Pending", "Approved", "Completed", "Expired", "Draft", "Under Review"],
    origins: ["India", "USA", "China"],
    destinations: ["India", "USA", "China"],
    modes: ["Sea freight", "Air Freight", "Rail Freight", "Road Freight", "Multimodal", "Express"],
  });
  const [loading, setLoading] = useState(false);
  const [shipment, setShipment] = useState("");
  const [highRisk, setHighRisk] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [shipmentStartDate, setShipmentStartDate] = useState(null);
  const [shipmentEndDate, setShipmentEndDate] = useState(null);
  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);

  const [showQuotation, setShowQuotation] = useState(false);
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [quotationLoading, setQuotationLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedOrigin, setSelectedOrigin] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("");
  const [selectedMode, setSelectedMode] = useState("");

  // Menu State with Fixed Coordinates
  const [openMenu, setOpenMenu] = useState(null);
  const [menuCoords, setMenuCoords] = useState({ top: 0, right: 0 });

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    status: "",
    origin: "",
    destination: "",
    mode: "",
    startDate: null,
    endDate: null,
  });

  const fetchShipments = async () => {
    try {
      setLoading(true);
      const res = await getShipments();
      setShipments(res.data?.data || []);
    } catch (err) {
      console.error("FETCH SHIPMENTS ERROR:", err?.response?.data || err);
    } finally {
      setLoading(false);
    }
  };

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();
      setDashboard(res.data.data || {});
    } catch (err) {
      console.log(err);
    }
  };

  const fetchStatusOverview = async () => {
    try {
      const res = await getShipmentStatusOverview();
      setStatusOverview(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchShipmentModes = async () => {
    try {
      const res = await getShipmentsByMode();
      setShipmentModes(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopOriginCountries = async () => {
    try {
      const res = await getTopOriginCountries();
      setOriginCountries(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTopDestinationCountries = async () => {
    try {
      const res = await getTopDestinationCountries();
      setDestinationCountries(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchRecentAlerts = async () => {
    try {
      const res = await getRecentAlerts();
      setRecentAlerts(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // Resolve shipment reference / SB number / AWB / Mongo ID before requesting tracking.
  const fetchShipmentTracker = async (identifier) => {
    const value = String(identifier || "").trim();
    if (!value) { setTrackingError("Enter a shipment reference or ID."); return null; }
    const matched = shipments.find((item) =>
      [item._id, item.referenceNumber, item.sbNumber,
       item.awbNumber, item.additionalInformation?.awbNumber]
        .filter(Boolean)
        .some((ref) => String(ref).toLowerCase() === value.toLowerCase())
    );
    if (!matched?._id) {
      setTrackingError("Shipment not found in your list.");
      setShipmentTracker(null);
      return null;
    }
    setTrackingLoading(true);
    setTrackingError("");
    try {
      const res = await getShipmentTracker(matched._id);
      const data = res.data?.data || null;
      if (!data) throw new Error("Tracking details unavailable.");
      setShipmentTracker(data);
      setTrackingShipmentId(matched._id);
      setTrackingId(value);
      return data;
    } catch (error) {
      setTrackingError(error?.response?.data?.message || error.message || "Tracking failed.");
      setShipmentTracker(null);
      return null;
    } finally {
      setTrackingLoading(false);
    }
  };

  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      setFilters(res.data.data || []);
    } catch (error) {
      console.error(error);
    }
  };

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery,
      status: selectedStatus,
      origin: selectedOrigin,
      destination: selectedDestination,
      mode: selectedMode,
      startDate: startDate,
      endDate: endDate,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedStatus("");
    setSelectedOrigin("");
    setSelectedDestination("");
    setSelectedMode("");
    setStartDate(null);
    setEndDate(null);

    setAppliedFilters({
      search: "",
      status: "",
      origin: "",
      destination: "",
      mode: "",
      startDate: null,
      endDate: null,
    });
  };

  // Only remove from the current UI list; do not claim to delete on server.
  const handleRemoveFromView = (id) => {
    if (window.confirm("Remove this shipment from the current list? (Not deleted from server)")) {
      setShipments((prev) => prev.filter((item) => item._id !== id));
    }
  };

  // Fixed dropdown toggle handler
  const handleMenuClick = (e, index) => {
    e.stopPropagation();
    if (openMenu === index) {
      setOpenMenu(null);
      return;
    }
    const rect = e.currentTarget.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const openUpward = spaceBelow < 160;

    setMenuCoords({
      top: openUpward ? rect.top - 145 : rect.bottom + 6,
      right: window.innerWidth - rect.right,
    });
    setOpenMenu(index);
  };

  const filteredShipments = useMemo(() => {
    return shipments.filter((s) => {
      const shipmentId = s.referenceNumber || s.sbNumber || "";
      const awbNumber = s.additionalInformation?.awbNumber || "";
      const product = s.cargo?.productName || "";
      const hsCode = getHsCodeLabel(s.cargo || {});
      const status = s.shipmentStatus || s.status || "";
      const origin = [s.route?.originCity, s.route?.originCountry].filter(Boolean).join(" ");
      const destination = [s.route?.destinationCity, s.route?.destinationCountry].filter(Boolean).join(" ");
      const mode = s.shipmentMode || s.route?.mode || "";
      const shipmentDate = s.shipmentDate ? new Date(s.shipmentDate) : null;

      const searchText = `
        ${shipmentId}
        ${awbNumber}
        ${product}
        ${hsCode}
        ${origin}
        ${destination}
      `.toLowerCase();

      if (appliedFilters.search && !searchText.includes(appliedFilters.search.toLowerCase())) {
        return false;
      }
      if (appliedFilters.status && status !== appliedFilters.status) {
        return false;
      }
      if (appliedFilters.origin && !origin.toLowerCase().includes(appliedFilters.origin.toLowerCase())) {
        return false;
      }
      if (appliedFilters.destination && !destination.toLowerCase().includes(appliedFilters.destination.toLowerCase())) {
        return false;
      }
      if (appliedFilters.mode && mode.toLowerCase() !== appliedFilters.mode.toLowerCase()) {
        return false;
      }
      if (
        appliedFilters.startDate &&
        (!shipmentDate || shipmentDate < new Date(new Date(appliedFilters.startDate).setHours(0, 0, 0, 0)))
      ) {
        return false;
      }
      if (
        appliedFilters.endDate &&
        (!shipmentDate || shipmentDate > new Date(new Date(appliedFilters.endDate).setHours(23, 59, 59, 999)))
      ) {
        return false;
      }

      return true;
    });
  }, [shipments, appliedFilters]);

  const totalPages = Math.max(1, Math.ceil(filteredShipments.length / ITEMS_PER_PAGE));
  const paginatedShipments = filteredShipments.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  useEffect(() => { setCurrentPage(1); setOpenMenu(null); }, [appliedFilters]);
  useEffect(() => { setCurrentPage((page) => Math.min(page, totalPages)); }, [totalPages]);

  const KPI_STATS = [
    {
      title: "Total Shipments",
      value: dashboard.totalShipments || shipments.length || 0,
      change: "—",
      icon: Square,
      bg: "bg-blue-50 text-blue-600 border-blue-100",
      up: true,
    },
    {
      title: "In Transit",
      value: dashboard.inTransit || 0,
      change: "—",
      icon: RectangleHorizontal,
      bg: "bg-indigo-50 text-indigo-600 border-indigo-100",
      up: true,
    },
    {
      title: "Delivered",
      value: dashboard.delivered || 0,
      change: "—",
      icon: CheckCircle2,
      bg: "bg-emerald-50 text-emerald-600 border-emerald-100",
      up: true,
    },
    {
      title: "Delayed",
      value: dashboard.delayed || 0,
      change: "—",
      icon: Clover,
      bg: "bg-amber-50 text-amber-600 border-amber-100",
      up: false,
    },
    {
      title: "Exceptions",
      value: dashboard.exception || 0,
      change: "—",
      icon: ArrowUpCircle,
      bg: "bg-rose-50 text-rose-600 border-rose-100",
      up: false,
    },
    {
      title: "Shipment Value",
      value: dashboard.shipmentValue === null || dashboard.shipmentValue === undefined
        ? "Not available"
        : new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 2,
          }).format(Number(dashboard.shipmentValue) || 0),
      change: "—",
      icon: Gem,
      bg: "bg-violet-50 text-violet-600 border-violet-100",
      up: true,
    },
  ];

  const STATUS_OVERVIEW = statusOverview.map((item) => ({
    name: item._id,
    value: item.count,
    percent:
      dashboard.totalShipments > 0
        ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
        : "0%",
    color:
      item._id === "In Transit"
        ? "#3B82F6"
        : item._id === "Delivered"
        ? "#10B981"
        : item._id === "Pending"
        ? "#F59E0B"
        : item._id === "Delayed"
        ? "#EF4444"
        : "#8B5CF6",
  }));

  const SHIPMENTS_BY_MODE = shipmentModes.map((item) => ({
    name: item._id,
    value: item.count,
    percent:
      dashboard.totalShipments > 0
        ? ((item.count / dashboard.totalShipments) * 100).toFixed(1) + "%"
        : "0%",
    color:
      item._id === "Sea"
        ? "#3B82F6"
        : item._id === "Air"
        ? "#06B6D4"
        : item._id === "Road"
        ? "#F59E0B"
        : "#8B5CF6",
  }));

  const TOP_ORIGINS = originCountries.map((item) => ({
    country: item._id,
    value: item.shipments,
    percent:
      dashboard.totalShipments > 0
        ? ((item.shipments / dashboard.totalShipments) * 100).toFixed(1) + "%"
        : "0%",
    width:
      dashboard.totalShipments > 0
        ? `${(item.shipments / dashboard.totalShipments) * 100}%`
        : "0%",
  }));

  const timeline = shipmentTracker?.trackingTimeline?.length
    ? shipmentTracker.trackingTimeline
    : (shipmentTracker?.statusHistory || []);
  const currentTrackIndex = timeline.findIndex((item) => item.current === true);
  const TRACKER_STEPS = timeline.map((item, idx) => ({
    label: item.status || "Update",
    date: (item.createdAt || item.updatedAt)
      ? formatShipmentDate(item.createdAt || item.updatedAt) : "-",
    done: currentTrackIndex === -1 ? true : idx <= currentTrackIndex,
    current: idx === currentTrackIndex,
  }));

  useEffect(() => {
    fetchShipments();
    fetchDashboard();
    fetchStatusOverview();
    fetchShipmentModes();
    fetchTopOriginCountries();
    fetchTopDestinationCountries();
    fetchRecentAlerts();
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    if (shipments.length > 0 && !shipmentTracker) {
      const first = shipments[0];
      fetchShipmentTracker(first.referenceNumber || first.sbNumber || first._id);
    }
  }, [shipments]);

  // Close dropdown on click outside or on page scroll
  useEffect(() => {
    const handleClose = () => setOpenMenu(null);
    document.addEventListener("click", handleClose);
    window.addEventListener("scroll", handleClose, true);
    window.addEventListener("resize", handleClose);
    return () => {
      document.removeEventListener("click", handleClose);
      window.removeEventListener("scroll", handleClose, true);
      window.removeEventListener("resize", handleClose);
    };
  }, []);

  const handleViewQuotation = async (shipmentData) => {
    if (!shipmentData?._id) return window.alert("Shipment ID not found");
    setQuotationLoading(true);
    try {
      const response = await getQuotationByShipment(shipmentData._id);
      const payload = response.data?.data?.quotation ?? response.data?.data ?? response.data?.quotation ?? null;
      const quotations = Array.isArray(payload) ? payload : payload ? [payload] : [];
      // Show the latest sent quotation, including rejected/accepted responses.
      const latestQuotation = [...quotations].sort(
        (a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
      )[0];

      const quotation =
        latestQuotation &&
        ["Shared", "Rejected", "Accepted"].includes(latestQuotation.status)
          ? latestQuotation
          : null;

      if (!quotation) {
        window.alert("No quotation has been sent for this shipment yet.");
        return;
      }
      setSelectedShipment(shipmentData);
      setSelectedQuotation(quotation);
      setShowQuotation(true);
    } catch (error) {
      window.alert(error?.response?.data?.message || "Unable to fetch quotation");
    } finally {
      setQuotationLoading(false);
    }
  };

  const handleAcceptQuotation = async () => {
    if (!selectedQuotation?._id) return;
    try {
      const response = await acceptQuotation(selectedQuotation._id);
      const updated = response.data?.data?.quotation ?? response.data?.data;
      setSelectedQuotation(updated?._id ? updated : (old) => ({ ...old, status: "Accepted" }));
      await fetchShipments();
      window.alert(response.data?.message || "Quotation accepted successfully");
    } catch (error) {
      window.alert(error?.response?.data?.message || "Unable to accept quotation");
      throw error;
    }
  };

  const handleRejectQuotation = async (reason) => {
    if (!selectedQuotation?._id) return;
    try {
      const response = await rejectQuotation(selectedQuotation._id, reason);
      const updated = response.data?.data?.quotation ?? response.data?.data;
      setSelectedQuotation(updated?._id ? updated : (old) => ({ ...old, status: "Rejected" }));
      await fetchShipments();
      window.alert(response.data?.message || "Quotation rejected successfully");
    } catch (error) {
      window.alert(error?.response?.data?.message || "Unable to reject quotation");
      throw error;
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-[#F8FAFC] text-slate-700 antialiased font-['Poppins',sans-serif]"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
        rel="stylesheet"
      />

      {!shipment && (
        <div className="max-w-[1540px] mx-auto p-1 sm:p-1 lg:p-1 space-y-6">
          {/* Top Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-end gap-4 pb-2 border-b border-slate-200/70">
            {/* <div>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
                  <Ship size={20} />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    Shipment Operations Hub
                  </h1>
                  <p className="text-xs text-slate-400 font-medium">
                    Monitor freight tracking, customs status, and supply-chain metrics.
                  </p>
                </div>
              </div>
            </div> */}

            <div className="flex items-center gap-2.5 flex-wrap">
              <div className="relative">
                <DatePicker
                  selected={shipmentStartDate}
                  onChange={(dates) => {
                    const [start, end] = dates;
                    setShipmentStartDate(start);
                    setShipmentEndDate(end);
                  }}
                  startDate={shipmentStartDate}
                  endDate={shipmentEndDate}
                  selectsRange
                  dateFormat="dd MMM yyyy"
                  placeholderText="01 Apr 2025 - 24 Apr 2025"
                  className="bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 pl-3.5 pr-9 py-2.5 rounded-xl shadow-2xs hover:border-slate-300 focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition outline-none cursor-pointer"
                />
                <CalendarDays
                  size={15}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>

              <button
                onClick={() => setExportReport(true)}
                className="inline-flex items-center gap-2 bg-white border border-slate-200/90 text-xs font-semibold text-slate-700 px-4 py-2.5 rounded-xl shadow-2xs hover:bg-slate-50 hover:border-slate-300 transition"
              >
                <Download size={14} className="text-slate-500" /> Export CSV
              </button>

              <button
                onClick={() => { setEditShipmentId(null); setShipment("shipment"); }}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-sm shadow-blue-500/25 transition active:scale-95"
              >
                <Plus size={15} /> New Shipment
              </button>
            </div>
          </div>

          {/* Metric KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {KPI_STATS.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-[0_2px_6px_rgba(0,0,0,0.02)] hover:shadow-md hover:border-slate-300/80 transition-all duration-200 flex flex-col justify-between"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center border shrink-0 ${stat.bg}`}
                    >
                      <Icon size={16} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
                      {stat.value}
                    </h3>
                    <div className="flex items-center gap-1 mt-1">
                      {stat.up ? (
                        <TrendingUp size={12} className="text-emerald-500" />
                      ) : (
                        <TrendingDown size={12} className="text-rose-500" />
                      )}
                      <span
                        className={`text-[10px] font-bold ${
                          stat.up ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {stat.change}
                      </span>
                      <span className="text-[10px] text-slate-400">trend unavailable</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filters Bar Card */}
          <div className="bg-white border border-slate-200/80 rounded-2xl p-4 sm:p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-3 items-end">
              {/* Search */}
              <div className="xl:col-span-2">
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Search Shipment
                </label>
                <div className="relative">
                  <input
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by B/L, Container, Ref..."
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition"
                  />
                  <Search
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Date Range */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Date Range
                </label>
                <div className="relative">
                  <DatePicker
                    selected={startDate}
                    onChange={(dates) => {
                      const [start, end] = dates;
                      setStartDate(start);
                      setEndDate(end);
                    }}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    dateFormat="dd MMM yyyy"
                    placeholderText="Select Dates"
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
                  />
                  <CalendarDays
                    size={14}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Status
                </label>
                <div className="relative">
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
                  >
                    <option value="">All Statuses</option>
                    {filters.status?.map((st) => (
                      <option key={st} value={st}>
                        {st}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Origin */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Origin
                </label>
                <div className="relative">
                  <select
                    value={selectedOrigin}
                    onChange={(e) => setSelectedOrigin(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
                  >
                    <option value="">All Origins</option>
                    {filters.origins?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Destination */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">
                  Destination
                </label>
                <div className="relative">
                  <select
                    value={selectedDestination}
                    onChange={(e) => setSelectedDestination(e.target.value)}
                    className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-8 text-xs font-medium text-slate-800 appearance-none outline-none focus:bg-white focus:border-blue-600 focus:ring-4 focus:ring-blue-500/10 transition cursor-pointer"
                  >
                    <option value="">All Destinations</option>
                    {filters.destinations?.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={13}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* Transport Mode — preserved from first dashboard */}
              <div>
                <label className="text-[10px] text-slate-500 font-bold uppercase tracking-wider block mb-1.5">Transport Mode</label>
                <select value={selectedMode} onChange={(e) => setSelectedMode(e.target.value)}
                  className="w-full bg-slate-50/70 border border-slate-200 rounded-xl py-2 pl-3 pr-4 text-xs">
                  <option value="">All Modes</option>
                  {(filters.modes || []).map((mode) => (
                    <option key={mode} value={mode}>{mode}</option>
                  ))}
                </select>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleApplyFilters}
                  className="flex-1 inline-flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-2 px-3 text-xs font-bold transition shadow-2xs"
                >
                  <Filter size={13} /> Apply
                </button>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center justify-center p-2 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 transition"
                  title="Reset Filters"
                >
                  <RotateCcw size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Full Width Shipments Table */}
          <div className="bg-white rounded-3xl border border-slate-200/80 shadow-[0_2px_12px_rgba(0,0,0,0.03)] overflow-hidden">
            <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
                  All Consignments
                </h2>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/70">
                  {filteredShipments.length} Active
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium">
                ETD and ETA from shipment records
              </p>
            </div>

            <div className="w-full overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse min-w-[980px]">
                <thead>
                  <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    <th className="py-3 px-4 w-10 text-center">
                      <input type="checkbox" className="accent-blue-600 rounded cursor-pointer" />
                    </th>
                    <th className="py-3 px-4">Shipment / B.L No.</th>
                    <th className="py-3 px-4">Route (Origin → Dest.)</th>
                    <th className="py-3 px-4 text-center">Status</th>
                    <th className="py-3 px-4">ETD / ATD</th>
                    {/* <th className="py-3 px-4">ETA Status</th> */}
                    <th className="py-3 px-4 text-center">Mode</th>
                    <th className="py-3 px-4">Commodity / HS</th>
                    <th className="py-3 px-4 text-right">Declared Value</th>
                    <th className="py-3 px-4 text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredShipments.length === 0 ? (
                    <tr>
                      <td colSpan={10} className="py-14 text-center text-slate-400 text-xs">
                        No shipments found matching the applied filter criteria.
                      </td>
                    </tr>
                  ) : (
                    paginatedShipments.map((s, i) => (
                      <tr
                        key={s._id || i}
                        className="hover:bg-slate-50/90 transition-colors duration-150 group"
                      >
                        {/* Checkbox */}
                        <td className="py-3.5 px-4 text-center">
                          <input type="checkbox" className="accent-blue-600 rounded cursor-pointer" />
                        </td>

                        {/* Shipment / B.L No */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <span className="font-extrabold text-slate-900 group-hover:text-blue-600 transition block">
                            {s.referenceNumber || s.sbNumber || "REF-UNASSIGNED"}
                          </span>
                          <span className="text-[10px] font-medium text-slate-400">
                            AWB: {s.additionalInformation?.awbNumber || "Pending"}
                          </span>
                        </td>

                        {/* Route */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <Flag country={s.route?.originCountry} size={14} />
                              <span>{s.route?.originCity || s.route?.originCountry || "Not provided"}</span>
                            </div>
                            <ArrowRight size={12} className="text-slate-400 shrink-0" />
                            <div className="flex items-center gap-1.5 font-bold text-slate-800">
                              <Flag country={s.route?.destinationCountry} size={14} />
                              <span>{s.route?.destinationCity || s.route?.destinationCountry || "Not provided"}</span>
                            </div>
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium block mt-0.5">
                            {s.route?.originCountry || "Not provided"} → {s.route?.destinationCountry || "Not provided"}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <StatusBadge status={s.shipmentStatus || s.status} />
                        </td>

                        {/* ETD / ATD */}
                        <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
                          <div>
                            ETD:{" "}
                            <span className="font-bold text-slate-800">
                              {s.etd ? new Date(s.etd).toLocaleDateString("en-GB") : "-"}
                            </span>
                          </div>
                          <div className="text-[10px] text-slate-400">
                            ATD: {s.atd ? new Date(s.atd).toLocaleDateString("en-GB") : "-"}
                          </div>
                        </td>

                        {/* ETA date + derived ETA status */}
                        {/* <td className="py-3.5 px-4 whitespace-nowrap font-medium text-slate-600">
                          <div className="font-bold text-slate-800">
                            {s.eta ? new Date(s.eta).toLocaleDateString("en-GB") : "Not scheduled"}
                          </div>
                          <span className={`text-[10px] font-semibold block mt-0.5 ${
                            getEtaStatus(s) === "Overdue"
                              ? "text-rose-600"
                              : getEtaStatus(s) === "Delivered"
                              ? "text-emerald-600"
                              : getEtaStatus(s) === "On schedule"
                              ? "text-blue-600"
                              : "text-slate-400"
                          }`}>
                            {getEtaStatus(s)}
                          </span>
                          {s.etaNote && (
                            <span className="text-[10px] font-semibold text-rose-500 block">{s.etaNote}</span>
                          )}
                        </td> */}

                        {/* Mode */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-slate-100 text-slate-600">
                            {s.route?.mode === "Air" ? (
                              <Plane size={14} />
                            ) : s.route?.mode === "Road" ? (
                              <Truck size={14} />
                            ) : (
                              <Anchor size={14} />
                            )}
                          </span>
                        </td>

                        {/* Commodity / HS Code */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="font-bold text-slate-800 truncate max-w-[170px]">
                            {s.cargo?.productName || "General Goods"}
                          </div>
                          <div className="text-[10px] font-semibold text-blue-600">
                            HS: {getHsCodeLabel(s.cargo || {})}
                          </div>
                        </td>

                        {/* Declared Value */}
                        <td className="py-3.5 px-4 text-right font-black text-slate-900 whitespace-nowrap">
                          {formatDeclaredValue(s)}
                        </td>

                        {/* Actions Trigger */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <button
                            onClick={(e) => handleMenuClick(e, s._id)}
                            className={`p-1.5 rounded-xl transition ${
                              openMenu === s._id
                                ? "bg-blue-50 text-blue-600 shadow-2xs"
                                : "text-slate-400 hover:text-slate-800 hover:bg-slate-100"
                            }`}
                          >
                            <MoreVertical size={16} />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Working pagination: 10 records per page */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 p-4 border-t border-slate-100 text-xs text-slate-500">
              <span>
                Showing {filteredShipments.length ? (currentPage - 1) * ITEMS_PER_PAGE + 1 : 0} to{" "}
                {Math.min(currentPage * ITEMS_PER_PAGE, filteredShipments.length)} of {filteredShipments.length} shipments
              </span>
              <div className="flex items-center gap-2">
                <button disabled={currentPage <= 1} onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  className="px-3 py-1.5 border rounded-lg disabled:opacity-40">Prev</button>
                <span className="font-semibold text-slate-700">Page {currentPage} / {totalPages}</span>
                <button disabled={currentPage >= totalPages} onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  className="px-3 py-1.5 border rounded-lg disabled:opacity-40">Next</button>
              </div>
            </div>
          </div>

          {/* Lower Section (Tracker, Alerts, Analytics) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
            {/* Shipment Tracker Card */}
            <SectionCard className="lg:col-span-2">
              <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                    <MapPin size={15} />
                  </div>
                  <div>
                    <h3 className="font-black text-sm text-slate-900 tracking-tight">
                      Active Live Tracker
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Tracking:{" "}
                      <span className="font-bold text-slate-700">
                        {shipmentTracker?.referenceNumber || shipmentTracker?.sbNumber || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>
                <StatusBadge status={shipmentTracker?.shipmentStatus || "Not available"} />
              </div>

              <div className="mb-4 space-y-2">
                <div className="flex items-center gap-2">
                  <input value={trackingId} onChange={(e) => setTrackingId(e.target.value)}
                    onKeyDown={async (e) => { if (e.key === "Enter") await fetchShipmentTracker(trackingId); }}
                    placeholder="Shipment reference / SB / AWB number"
                    className="flex-1 min-w-0 border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-blue-500" />
                  <button disabled={trackingLoading || !trackingId.trim()}
                    onClick={() => fetchShipmentTracker(trackingId)}
                    className="bg-blue-600 text-white px-3 py-2 rounded-lg text-xs disabled:opacity-40">
                    {trackingLoading ? "Tracking..." : "Track"}
                  </button>
                  <button disabled={!shipmentTracker || !trackingShipmentId}
                    onClick={() => setShowTrackingModal(true)}
                    className="border border-blue-200 text-blue-700 px-3 py-2 rounded-lg text-xs disabled:opacity-40">
                    View
                  </button>
                </div>
                {trackingError && <p className="text-xs text-rose-600">{trackingError}</p>}
                <CarrierTrackingResolver />
              </div>

              {/* Map Graphic Box */}
              <div
                className="relative h-36 rounded-2xl overflow-hidden border border-slate-200/80 p-4 flex flex-col justify-between"
                style={{
                  background: "linear-gradient(135deg, #1E293B 0%, #0F172A 100%)",
                }}
              >
                <svg viewBox="0 0 400 120" className="absolute inset-0 w-full h-full opacity-60">
                  <path
                    d="M 40 70 Q 180 15 360 60"
                    fill="none"
                    stroke="#38BDF8"
                    strokeWidth="3"
                    strokeDasharray="6 4"
                  />
                  <circle cx="40" cy="70" r="5" fill="#38BDF8" />
                  <circle cx="360" cy="60" r="5" fill="#34D399" />
                </svg>

                <div className="relative z-10 flex justify-between text-white text-xs">
                  <span className="font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    Origin: {shipmentTracker?.route?.originCity || "N/A"} (IN)
                  </span>
                  <span className="font-bold bg-white/10 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    Dest: {shipmentTracker?.route?.destinationCity || "N/A"} (NL)
                  </span>
                </div>

                <div className="relative z-10 grid grid-cols-3 gap-2 text-white/90 text-center bg-white/5 backdrop-blur-md p-2 rounded-xl">
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Location
                    </span>
                    <span className="text-xs font-bold">
                      {shipmentTracker?.liveTracking?.location?.city || shipmentTracker?.currentLocation?.city || "N/A"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Speed / Mode
                    </span>
                    <span className="text-xs font-bold">{shipmentTracker?.liveTracking?.speed || "Not available"} • {shipmentTracker?.route?.mode || "N/A"}</span>
                  </div>
                  <div>
                    <span className="text-[9px] uppercase tracking-wider text-slate-400 block font-semibold">
                      Days to Arrival
                    </span>
                    <span className="text-xs font-bold text-teal-300">
                      {shipmentTracker?.eta
                        ? `${Math.max(
                            0,
                            Math.ceil(
                              (new Date(shipmentTracker.eta) - new Date()) /
                                (1000 * 60 * 60 * 24)
                            )
                          )} Days`
                        : "Not available"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Progress Milestones Stepper */}
              <div className="flex items-center justify-between mt-5 px-1">
                {TRACKER_STEPS.length === 0 ? <p className="text-xs text-slate-400">No tracking updates available.</p> : TRACKER_STEPS.map((step, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center relative">
                    {i !== 0 && (
                      <div
                        className={`absolute top-2.5 right-1/2 w-full h-[2px] -z-10 ${
                          TRACKER_STEPS[i - 1].done ? "bg-blue-600" : "bg-slate-200"
                        }`}
                      />
                    )}
                    <div
                      className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        step.done
                          ? "bg-blue-600 text-white shadow-xs"
                          : step.current
                          ? "bg-white border-2 border-blue-600 text-blue-600 ring-4 ring-blue-500/10"
                          : "bg-white border border-slate-200 text-slate-400"
                      }`}
                    >
                      {step.done ? <Check size={12} /> : i + 1}
                    </div>
                    <span
                      className={`text-[9px] font-bold mt-1.5 text-center leading-tight ${
                        step.current ? "text-blue-600 font-extrabold" : "text-slate-600"
                      }`}
                    >
                      {step.label}
                    </span>
                    <span className="text-[9px] text-slate-400">{step.date}</span>
                  </div>
                ))}
              </div>
            </SectionCard>

            {/* Recent Alerts Card */}
            <SectionCard>
              <div className="flex justify-between items-center mb-3.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                    <AlertTriangle size={15} />
                  </div>
                  <h3 className="font-black text-sm text-slate-900 tracking-tight">
                    Recent Risk Alerts
                  </h3>
                </div>
                <button
                  className="text-blue-600 hover:text-blue-700 text-xs font-bold transition"
                  onClick={() => setHighRisk(true)}
                >
                  View All →
                </button>
              </div>

              <div className="space-y-3">
                {recentAlerts.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-xs font-medium">
                    No active high-risk alerts.
                  </div>
                ) : (
                  recentAlerts.slice(0, 4).map((a, i) => {
                    const isCritical = a.type === "Critical";
                    const isWarning = a.type === "Warning";
                    const bg = isCritical
                      ? "bg-rose-50 border-rose-200/80"
                      : isWarning
                      ? "bg-amber-50 border-amber-200/80"
                      : "bg-blue-50 border-blue-200/80";
                    const textColor = isCritical
                      ? "text-rose-700"
                      : isWarning
                      ? "text-amber-700"
                      : "text-blue-700";

                    return (
                      <div
                        key={a._id || i}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 transition-all ${bg}`}
                      >
                        <AlertCircle size={15} className={`shrink-0 mt-0.5 ${textColor}`} />
                        <div className="flex-1 min-w-0">
                          <p className={`text-xs font-bold leading-tight ${textColor}`}>
                            {a.title || "Customs Clearance Delay Notice"}
                          </p>
                          <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                            {a.message || "Port of Hamburg reported labor disruption."}
                          </p>
                          <span className="text-[9px] text-slate-400 font-semibold block mt-1">
                            {a.createdAt
                              ? new Date(a.createdAt).toLocaleTimeString([], {
                                  hour: "2-digit",
                                  minute: "2-digit",
                                })
                              : "10:30 AM"}
                          </span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </SectionCard>
          </div>

          {/* Analytics Overview Strip */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Status Overview Donut */}
            <SectionCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  Status Distribution
                </h3>
                <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={STATUS_OVERVIEW}
                        innerRadius={36}
                        outerRadius={54}
                        dataKey="value"
                        stroke="none"
                      >
                        {STATUS_OVERVIEW.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-black text-sm text-slate-900 leading-none">
                      {dashboard.totalShipments || shipments.length || 0}
                    </span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
                      Total
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1 text-xs">
                  {STATUS_OVERVIEW.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="text-slate-600 font-medium text-[11px]">{r.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">
                        {r.value} ({r.percent})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Shipments by Mode Donut */}
            <SectionCard>
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  Shipments by Transport Mode
                </h3>
                <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
              </div>
              <div className="flex items-center gap-4">
                <div className="relative w-28 h-28 shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={SHIPMENTS_BY_MODE}
                        innerRadius={36}
                        outerRadius={54}
                        dataKey="value"
                        stroke="none"
                      >
                        {SHIPMENTS_BY_MODE.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className="font-black text-sm text-slate-900 leading-none">
                      {SHIPMENTS_BY_MODE.length || 3}
                    </span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase mt-0.5">
                      Modes
                    </span>
                  </div>
                </div>
                <div className="space-y-1.5 flex-1 text-xs">
                  {SHIPMENTS_BY_MODE.map((r, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="text-slate-600 font-medium text-[11px]">{r.name}</span>
                      </div>
                      <span className="font-bold text-slate-900 text-[11px]">
                        {r.value} ({r.percent})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            {/* Top Origin Countries Bar */}
            <SectionCard className="sm:col-span-2 lg:col-span-1">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-extrabold text-sm text-slate-900 tracking-tight">
                  Top Origin Corridors
                </h3>
                <DropdownButton text="This Month" onClick={() => setDateRange(true)} />
              </div>
              <div className="space-y-3">
                {TOP_ORIGINS.length === 0 ? (
                  <div className="text-xs text-slate-400 text-center py-6">
                    No origin corridor data available.
                  </div>
                ) : (
                  TOP_ORIGINS.map((c, i) => (
                    <div key={i} className="text-xs">
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-semibold text-slate-800 flex items-center gap-2">
                          <Flag country={c.country} size={15} /> {c.country}
                        </span>
                        <span className="font-black text-slate-900">
                          {c.value}{" "}
                          <span className="text-slate-400 font-medium">({c.percent})</span>
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-full rounded-full transition-all duration-500"
                          style={{ width: c.width }}
                        />
                      </div>
                    </div>
                  ))
                )}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* 
        FLOATING ACTION DROPDOWN PORTAL:
        Table ke container se completely bahar open hoga, z-[9999] par floating.
      */}
      {openMenu !== null && filteredShipments.some((item) => item._id === openMenu) && (
        <div
          style={{
            position: "fixed",
            top: `${menuCoords.top}px`,
            right: `${menuCoords.right}px`,
            zIndex: 9999,
          }}
          onClick={(e) => e.stopPropagation()}
          className="w-44 bg-white border border-slate-200/90 rounded-2xl shadow-[0_12px_36px_rgba(0,0,0,0.18)] p-1.5 flex flex-col gap-1 text-left animate-in fade-in zoom-in-95 duration-150"
        >
          <button onClick={() => {
            setViewShipmentId(openMenu);
            setShowShipmentView(true);
            setOpenMenu(null);
          }} className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-blue-50">
            <Eye size={14} /> View Details
          </button>

          {/* Second version: allow Draft editing directly from the row menu. */}
          {String(filteredShipments.find((item) => item._id === openMenu)?.shipmentStatus || "").toLowerCase() === "draft" && (
            <button
              onClick={() => {
                setEditShipmentId(openMenu);
                setShowShipmentView(false);
                setViewShipmentId(null);
                setShipment("shipment");
                setOpenMenu(null);
              }}
              className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-amber-700 hover:bg-amber-50"
            >
              <FileText size={14} /> Edit Draft
            </button>
          )}

          <button
            onClick={() => {
              handleViewQuotation(filteredShipments.find((item) => item._id === openMenu));
              setOpenMenu(null);
            }}
            disabled={quotationLoading}
            className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition disabled:opacity-50"
          >
            <FileText size={14} className="text-purple-500" /> Quotation
          </button>

          <div className="h-px bg-slate-100 my-0.5" />

          <button
            onClick={() => {
              handleRemoveFromView(openMenu);
              setOpenMenu(null);
            }}
            className="w-full flex items-center gap-2.5 py-2 px-3 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50 transition"
          >
            <Trash2 size={14} /> Remove from view
          </button>
        </div>
      )}

      {/* Shipment Form Component */}
      {shipment === "shipment" && (
  <ShipmentForm
    setActiveTab={setActiveTab}
    setShipment={setShipment}
    currentTab="Shipments"
    editId={editShipmentId}
    editShipmentId={editShipmentId}
    accountType={accountType}
    isAdmin={false}
    onSaved={() => {
      setEditShipmentId(null);
      setShipment("");
      fetchShipments();
      fetchDashboard();
      fetchStatusOverview();
      fetchShipmentModes();
      fetchTopOriginCountries();
      fetchTopDestinationCountries();
      fetchRecentAlerts();
    }}
  />
)}

      {/* Quotation Modal */}
      {/* Shipment View / Edit from first version */}
      {showShipmentView && viewShipmentId && (
        <ViewShipment
          shipmentId={viewShipmentId}
          onBack={() => { setShowShipmentView(false); setViewShipmentId(null); }}
          onEdit={() => {
            setEditShipmentId(viewShipmentId);
            setShowShipmentView(false);
            setViewShipmentId(null);
            setShipment("shipment");
          }}
        />
      )}

      {showQuotation && selectedShipment && selectedQuotation && (
        <B2BQuotation
          shipment={selectedShipment}
          quotation={selectedQuotation}
          onAccept={handleAcceptQuotation}
          onReject={handleRejectQuotation}
          onClose={() => {
            setShowQuotation(false);
            setSelectedQuotation(null);
            setSelectedShipment(null);
          }}
        />
      )}

      {/* Tracking modal preserved from first version */}
      {showTrackingModal && (
        <ShipmentTrackingModal
          open={showTrackingModal}
          shipmentId={trackingShipmentId}
          onClose={() => setShowTrackingModal(false)}
        />
      )}

      {/* High Risk Alerts Modal */}
      {highRisk && <RecentHighRiskAlertsModal onClose={() => setHighRisk(false)} />}

      {/* Date Range Modal */}
      {dateRange && <DateRangeModal onClose={() => setDateRange(false)} />}

      {/* Export Report Modal */}
      {exportReport && <ExportReport onClose={() => setExportReport(false)} />}
    </div>
  );
}