// // // import ModuleHero from "../../components/ModuleHero";
// // // import { usePublicConfig } from "../../../lib/publicConfig";
// // // import FeatureQuotaGate, {
// // //   useSubscriptionQuotas,
// // //   SidebarQuota,
// // // } from "../../components/FeatureQuotaGate";
// // // import AIQuerySidebarStatus from "../../components/AIQuerySidebarStatus";
// // // import AccountProfile, {
// // //   AccountBadge,
// // // } from "../../../components/AccountProfile";
// // // import React, { useState, useRef, useEffect } from "react";
// // // import DashboardAdPlacement from "../../components/DashboardAdPlacement";
// // // import logo from "../../assets/Images/logo.png";
// // // import axios from "axios";
// // // // import { FiAlertCircle } from "react-icons/fi";

// // // import { FaRupeeSign } from "react-icons/fa";

// // // import {
// // //   FiX,
// // //   FiAlertTriangle,
// // //   FiEdit3,
// // //   FiLink2,
// // //   FiArrowLeft,
// // //   FiSave,
// // //   FiDownload,
// // //   FiPlus,
// // //   FiInfo,
// // //   FiCopy,
// // //   FiStar,
// // //   FiDatabase,
// // //   FiAlertCircle,
// // //   FiAnchor,
// // //   FiCpu,
// // //   FiHash,
// // //   FiGift,
// // //   FiTruck,
// // //   FiMap,
// // //   FiPackage,
// // //   FiRadio,
// // //   FiFileText,
// // //   FiUsers,
// // //   FiBookmark,
// // //   FiClipboard,
// // //   FiBarChart2,
// // //   FiCreditCard,
// // //   FiBell,
// // //   FiHelpCircle,
// // //   FiSettings,
// // //   FiChevronRight,
// // //   FiShare2,
// // //   FiSend,
// // //   FiCheck,
// // //   FiClock,
// // //   FiDollarSign,
// // //   FiAward,
// // //   FiShoppingCart,
// // //   FiFolder,
// // //   FiPercent,
// // //   FiZap,
// // //   FiEye,
// // //   FiCheckCircle,
// // //   FiExternalLink,
// // //   FiCalendar,
// // //   FiChevronDown,
// // //   FiUploadCloud,
// // //   FiWifi,
// // //   FiMapPin,
// // //   FiPhone,
// // //   FiSearch,
// // //   FiMail,
// // //   FiSun,
// // // } from "react-icons/fi";
// // // import Shipment from "../../components/ShipmentForm";
// // // import calculator from "../../assets/Images/webp/calculator.webp";
// // // import checker from "../../assets/Images/webp/checker.webp";
// // // import shipment from "../../assets/Images/webp/shipment.webp";
// // // import Chatbot from "../../components/Chatbot";

// // // import { BsAirplane } from "react-icons/bs";
// // // import { MdOutlineRocketLaunch } from "react-icons/md";
// // // import HSCodeLookup from "./HsCodeLookUp";
// // // import IncentiveChecker from "./IncentiveChecker";
// // // import ShipmentPlanning from "./ShipmentPlanning";
// // // import FreightCalculator from "./FreightCalculator";
// // // import AiCargoMateAssistant from "./AiCargoMateAssistant";

// // // import robot from "../../assets/Images/webp/robot.webp";

// // // import {
// // //   MdMenu,
// // //   MdLocalShipping,
// // //   MdDescription,
// // //   MdPsychology,
// // //   MdPayments,
// // //   MdDoubleArrow,
// // //   MdBolt,
// // //   MdAdd,
// // //   MdForum,
// // //   MdCloudUpload,
// // //   MdMyLocation,
// // //   MdCalculate,
// // //   MdSavings,
// // //   MdHelp,
// // //   MdDownload,
// // //   MdTrendingFlat,
// // //   MdCheckCircle,
// // //   MdStorage,
// // //   MdApi,
// // //   MdSync,
// // //   MdDashboard,
// // //   MdSettings,
// // //   MdArrowUpward,
// // //   MdQrCode2,
// // //   MdCheckroom,
// // //   MdPerson,
// // // } from "react-icons/md";

// // // import { FaAnchor, FaShip } from "react-icons/fa";

// // // import { MdMonitor } from "react-icons/md";

// // // import SavedReports from "./SavedReport";
// // // import Saved from "./Saved";

// // // import AuditLogs from "./AuditLogs";
// // // import AnalyticsTrends from "./Analysis&Trends";

// // // import UpgradePlan from "./UpgradePlan";
// // // import Subscription from "./Subscription";
// // // import NotificationDashboard from "./Notification";
// // // import HelpSupportDashboard from "./Help&Support";
// // // import NoticeBanner from "../../components/NoticeBanner";
// // // import ProfileSettingsDashboard from "./ProfileSettings";
// // // import { useNavigate, useLocation } from "react-router-dom";
// // // import MessagesModal from "../../components/Messages";
// // // import NotificationsModal from "../../components/Notifications";
// // // import FreightCalculatorModal from "../../components/FreightCalculator";
// // // import IncentivesCheckerModal from "../../components/IncentiveChecker";
// // // import TrackShipmentModal from "../../components/userComponent/TrackShipment";
// // // import UploadDocumentationModal from "../../components/userComponent/UploadDocumentation";
// // // import EditAdditionalInformation from "../../components/userComponent/EditAdditionalInformation";
// // // import EditGoodsInformation from "../../components/userComponent/EditGoodsInformation";
// // // import EditPartiesInformation from "../../components/userComponent/EditPartiesInformation";
// // // import BookShipment from "../../components/userComponent/BookShipment";
// // // import TrackShipment from "../../components/userComponent/TrackShipment";
// // // import FullDisclaimer from "../../components/userComponent/FullDisclaimer";
// // // import RiskInsights from "../../components/userComponent/RiskInsights";
// // // import SharePlan from "../../components/userComponent/SharePlan";
// // // import CertificateOfOrigin from "../../components/userComponent/CertificateOfOrigin";
// // // import NewQueryModal from "../../components/userComponent/NewQuery";
// // // import ViewTradeInformation from "../../components/userComponent/ViewTradeInformation";
// // // import ViewShipmentEligibility from "../../components/userComponent/ViewShipmentEligibility";
// // // import VendorInsightsDetailedAnalytics from "../../components/userComponent/VendorInsightDetailAnalytics";
// // // import ShareReportModal from "../../components/userComponent/ShareReport";
// // // import SaveReportModal from "../../components/userComponent/SaveReport";
// // // import ResultSummaryModal from "../../components/userComponent/ResultSummary";
// // // import PartnerAnalysis from "../../components/userComponent/PartnerAnalysis";
// // // import FiltersModal from "../../components/userComponent/Filters";
// // // import DownloadReportModal from "../../components/userComponent/DownloadReport";
// // // import DataSourceModal from "../../components/userComponent/DataSource";
// // // import AuditLogSettingsModal from "../../components/userComponent/AuditLogSettings";
// // // import AllDecliningCountriesModal from "../../components/userComponent/AllDecliningCountries";

// // // import AllPortsOfArrivalModal from "../../components/userComponent/AllPortsOfArrival";

// // // import AISmartSummary from "../../components/userComponent/AiSmartSummary";
// // // import UploadDocumentModal from "../../components/userComponent/UploadDocument";
// // // import AllDocumentsTemplateModal from "../../components/userComponent/AllDocumentTemplate";
// // // import CostBreakdownModal from "../../components/userComponent/CostBreakDown";
// // // import FullRouteScheduleModal from "../../components/userComponent/FullRouteSchedule";
// // // import InsightsModal from "../../components/userComponent/Insights";
// // // import WeightVolumeSummaryModal from "../../components/userComponent/WeightVolumeSummary";

// // // import FullDocumentsModal from "../../components/userComponent/FullDocument";

// // // import StorageDetailsModal from "../../components/userComponent/StorageDetails";

// // // const C = {
// // //   primary: "#00685f",
// // //   secondary: "#006398",
// // //   tertiary: "#a33900",
// // //   bg: "#f8f9ff",
// // //   surface: "#f8f9ff",
// // //   onSurface: "#0d1c2e",
// // //   onSurfaceVariant: "#3d4947",
// // //   outlineVariant: "#bcc9c6",
// // //   scLowest: "#ffffff",
// // //   scLow: "#eff4ff",
// // //   sc: "#e6eeff",
// // //   scHigh: "#dce9ff",
// // //   scHighest: "#d5e3fc",
// // //   error: "#ba1a1a",
// // //   errorContainer: "#ffdad6",
// // //   tertiaryFixed: "#ffdbce",
// // //   tertiaryContainer: "#cc4900",
// // //   primaryFixed: "#89f5e7",
// // //   secondaryFixed: "#cce5ff",
// // // };

// // // function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
// // //   return (
// // //     <div
// // //       className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
// // //       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
// // //     >
// // //       <div className="flex justify-between items-start mb-2">
// // //         <span
// // //           className="text-sm  font-semibold  leading-4"
// // //           // style={{ color: C.onSurfaceVariant }}
// // //         >
// // //           {label}
// // //         </span>
// // //       </div>
// // //       <div className="flex justify-between " style={{ color: C.onSurface }}>
// // //         <div className="text-2xl font-bold  "> {value}</div>
// // //         <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
// // //           <Icon size={22} style={{ color: iconColor }} />
// // //         </div>
// // //       </div>
// // //       <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
// // //         <MdArrowUpward size={10} className="" />
// // //         <span className="text-[10px] font-normal">{change}</span>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function QuickActionBtn({ id, icon: Icon, label, bgcolor, textColor }) {
// // //   const [active, setActive] = useState("");

// // //   return (
// // //     <>
// // //       <button
// // //         className="flex flex-col items-center gap-1 group"
// // //         style={{ backgroundColor: bgcolor }}
// // //       >
// // //         <div
// // //           onClick={() => setActive(id)}
// // //           className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors"
// // //         >
// // //           <Icon size={24} style={{ color: textColor }} />
// // //           <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
// // //             {label}
// // //           </span>
// // //         </div>
// // //       </button>

// // //       {active === "freight" && (
// // //         <FreightCalculatorModal onClose={() => setActive(null)} />
// // //       )}

// // //       {active === "upload" && (
// // //         <UploadDocumentationModal onClose={() => setActive(null)} />
// // //       )}
// // //       {active === "track" && (
// // //         <TrackShipmentModal onClose={() => setActive(null)} />
// // //       )}
// // //       {active === "incentives" && (
// // //         <IncentivesCheckerModal onClose={() => setActive(null)} />
// // //       )}
// // //     </>
// // //   );
// // // }

// // // function ActivityItem({
// // //   dotColor,
// // //   iconBg,
// // //   icon: Icon,
// // //   iconColor,
// // //   title,
// // //   subtitle,
// // //   time,
// // //   tag,
// // // }) {
// // //   return (
// // //     <div
// // //       className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
// // //       style={{ borderColor: C.outlineVariant }}
// // //     >
// // //       <div
// // //         className="p-2  rounded-lg h-fit"
// // //         style={{ backgroundColor: iconBg }}
// // //       >
// // //         {typeof Icon === "string" ? (
// // //           <img src={Icon || null} alt="icon" className="w-5 h-5" />
// // //         ) : (
// // //           React.createElement(Icon, {
// // //             size: 22,
// // //             style: { color: iconColor },
// // //           })
// // //         )}
// // //       </div>
// // //       <div className="flex-1 justify-">
// // //         <div className="font-normal text-sm" style={{ color: C.onSurface }}>
// // //           {title}
// // //         </div>
// // //         {subtitle && (
// // //           <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
// // //             {subtitle}
// // //           </p>
// // //         )}
// // //         <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
// // //           {time}
// // //         </div>
// // //         {tag && (
// // //           <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
// // //             <MdCheckCircle size={12} />
// // //             {tag}
// // //           </div>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function DetailCard({ tag, title, children, setShipment, setActiveTab }) {
// // //   const [active, setActive] = useState("");
// // //   const [value, setValue] = useState("");

// // //   return (
// // //     <div
// // //       className="p-4 rounded-xl border flex flex-col justify-between"
// // //       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
// // //     >
// // //       <div className="flex flex-col    mb-4">
// // //         <div className="flex  justify-between">
// // //           <h4 className="text-sm font-bold">{title}</h4>
// // //           <button className="text-[10px] font-bold uppercase text-[#00A896]">
// // //             View All
// // //           </button>
// // //         </div>
// // //         <div className="flex justify-start">
// // //           <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
// // //             {tag}
// // //           </span>
// // //         </div>
// // //       </div>
// // //       <div>{children}</div>
// // //       <div>
// // //         <button
// // //           onClick={() => {
// // //             setShipment("shipment");
// // //             setActiveTab("");
// // //           }}
// // //           className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]"
// // //         >
// // //           Create Shipment from this result
// // //         </button>
// // //         <button
// // //           onClick={() => setActive("report")}
// // //           className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  "
// // //         >
// // //           <MdDownload size={16} className="" /> Download Report (PDF)
// // //         </button>
// // //       </div>

// // //       {active === "report" && (
// // //         <DownloadReportModal
// // //           onClose={() => setActive(null)}
// // //           setValue={setValue}
// // //           value={value}
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // const sidebarSections = [
// // //   {
// // //     title: "AI & Trade Tools",
// // //     items: [
// // //       {
// // //         icon: FiCpu,
// // //         label: "AI Chatbot",
// // //         badgeColor: "bg-teal-500",
// // //       },
// // //       {
// // //         icon: FiCpu,
// // //         label: "AI CargoMate Assistant",
// // //         badge: "",
// // //         badgeColor: "bg-teal-500",
// // //       },
// // //       { icon: FiHash, label: "HS Code Lookup" },
// // //       { icon: FiGift, label: "Incentive Checker" },
// // //       { icon: FiTruck, label: "Freight Calculator" },
// // //       { icon: FiMap, label: "Shipment Planning" },
// // //       {
// // //         icon: FiBookmark,
// // //         label: "Saved",
// // //         // badge: "New",
// // //         badgeColor: "bg-[#2B7FFF]",
// // //       },
// // //       // { icon: FiClipboard, label: "Audit Logs" },
// // //       // { icon: FiBarChart2, label: "Analytics & Trends" },
// // //     ],
// // //   },
// // //   // {
// // //   //   title: "Reports & Insights",
// // //   //   items: [
// // //   //     {
// // //   //       icon: FiBookmark,
// // //   //       label: "Saved",
// // //   //       // badge: "New",
// // //   //       badgeColor: "bg-[#2B7FFF]",
// // //   //     },
// // //   //     // { icon: FiClipboard, label: "Audit Logs" },
// // //   //     // { icon: FiBarChart2, label: "Analytics & Trends" },
// // //   //   ],
// // //   // },
// // //   {
// // //     title: "Account & Support",
// // //     items: [
// // //       {
// // //         icon: FiCreditCard,
// // //         label: "Subscription",
// // //         badge: undefined,
// // //         badgeColor: "bg-[#00BBA7]",
// // //       },
// // //       {
// // //         icon: FiBell,
// // //         label: "Notifications",
// // //         badge: "",
// // //         badgeColor: "bg-red-500",
// // //       },
// // //       { icon: FiHelpCircle, label: "Help & Support" },
// // //       // { icon: FiSettings, label: "Profile Settings" },
// // //     ],
// // //   },
// // // ];

// // // function Field({ label, placeholder, select }) {
// // //   return (
// // //     <div>
// // //       <label className="block text-sm font-semibold text-gray-900 mb-1.5">
// // //         {label}
// // //       </label>
// // //       {select ? (
// // //         <div className="relative">
// // //           <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
// // //             <option>{placeholder}</option>
// // //           </select>
// // //           <FiChevronDown
// // //             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
// // //             size={16}
// // //           />
// // //         </div>
// // //       ) : (
// // //         <input
// // //           type="text"
// // //           placeholder={placeholder}
// // //           className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
// // //         />
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // function SectionCard({ number, title, subtitle, children }) {
// // //   return (
// // //     <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
// // //       <div className="flex items-center gap-2">
// // //         <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
// // //           {number}
// // //         </span>
// // //         <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
// // //       </div>
// // //       {subtitle && (
// // //         <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">
// // //           {subtitle}
// // //         </p>
// // //       )}
// // //       <div className="mt-4 space-y-4">{children}</div>
// // //     </div>
// // //   );
// // // }

// // // function Label({ children }) {
// // //   return (
// // //     <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
// // //       {children}
// // //       <span className="text-red-500 ml-0.5">*</span>
// // //     </label>
// // //   );
// // // }

// // // function Input({ label, placeholder, value, required = true }) {
// // //   return (
// // //     <div>
// // //       {required ? (
// // //         <Label>{label}</Label>
// // //       ) : (
// // //         <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
// // //           {label}
// // //         </label>
// // //       )}
// // //       <input
// // //         type="text"
// // //         defaultValue={value}
// // //         placeholder={placeholder}
// // //         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //       />
// // //     </div>
// // //   );
// // // }

// // // function DateInput({ label }) {
// // //   return (
// // //     <div>
// // //       <label className="block text-xs font-semibold text-gray-700 mb-1">
// // //         {label}
// // //       </label>
// // //       <div className="relative">
// // //         <input
// // //           type="text"
// // //           placeholder="Select date"
// // //           className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// // //         />
// // //         <FiCalendar
// // //           size={14}
// // //           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Select({ label, placeholder, required = true }) {
// // //   return (
// // //     <div>
// // //       {required ? (
// // //         <Label>{label}</Label>
// // //       ) : (
// // //         <label className="block text-xs font-semibold text-gray-700 mb-1">
// // //           {label}
// // //         </label>
// // //       )}
// // //       <div className="relative">
// // //         <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
// // //           <option>{placeholder}</option>
// // //         </select>
// // //         <FiChevronDown
// // //           size={14}
// // //           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
// // //         />
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function RadioGroup({ label, defaultValue = "no" }) {
// // //   return (
// // //     <div>
// // //       <Label>{label}</Label>
// // //       <div className="flex items-center gap-4 mt-2">
// // //         <label className="flex items-center gap-1.5 text-sm text-gray-700">
// // //           <input
// // //             type="radio"
// // //             className="accent-blue-600"
// // //             defaultChecked={defaultValue === "yes"}
// // //           />
// // //           Yes
// // //         </label>
// // //         <label className="flex items-center gap-1.5 text-sm text-gray-700">
// // //           <input
// // //             type="radio"
// // //             className="accent-blue-600"
// // //             defaultChecked={defaultValue === "no"}
// // //           />
// // //           No
// // //         </label>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // function Grid2({ children }) {
// // //   return (
// // //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
// // //   );
// // // }

// // // const docTypes = [
// // //   {
// // //     label: "Commercial Invoice",
// // //     icon: FiFileText,
// // //     color: "text-blue-600 bg-blue-50",
// // //   },
// // //   {
// // //     label: "Packing List",
// // //     icon: FiClipboard,
// // //     color: "text-orange-600 bg-orange-50",
// // //   },
// // //   { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
// // //   { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
// // //   { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
// // //   {
// // //     label: "Purchase Order",
// // //     icon: FiShoppingCart,
// // //     color: "text-orange-600 bg-orange-50",
// // //   },
// // //   {
// // //     label: "Product Certificate",
// // //     icon: FiAward,
// // //     color: "text-purple-600 bg-purple-50",
// // //   },
// // //   {
// // //     label: "Other Documents",
// // //     icon: FiFolder,
// // //     color: "text-gray-500 bg-gray-100",
// // //   },
// // // ];

// // // const aiTopStats = [
// // //   {
// // //     label: "Suggested HS Code",
// // //     value: "8517.12.00",
// // //     color: "bg-blue-50 text-blue-700",
// // //   },
// // //   {
// // //     label: "Required Documents",
// // //     value: "7 Documents",
// // //     color: "bg-green-50 text-green-700",
// // //   },
// // //   {
// // //     label: "Freight Estimate",
// // //     value: "₹24,860",
// // //     color: "bg-orange-50 text-orange-700",
// // //   },
// // //   {
// // //     label: "RoDTEP / Incentive",
// // //     value: "Eligible (2.5%)",
// // //     color: "bg-purple-50 text-purple-700",
// // //   },
// // // ];

// // // const aiBottomStats = [
// // //   { label: "Compliance Requirements", value: "12", sub: "Requirements" },
// // //   { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
// // //   { label: "Estimated Timeline", value: "8-10 Days" },
// // //   { label: "Recommended Action", value: "Proceed with Booking", green: true },
// // // ];

// // // const modals = [
// // //   { key: "report", label: "Download Report" },
// // //   { key: "freight", label: "Freight Calculator" },
// // //   { key: "upload", label: "Upload Documentation" },
// // //   { key: "track", label: "Track Shipment" },
// // //   { key: "incentives", label: "Incentives Checker" },
// // // ];

// // // const navItems = [
// // //   { icon: MdDashboard, label: "Dashboard" },
// // //   { icon: MdLocalShipping, label: "Shipments" },
// // //   { icon: MdDescription, label: "Documents" },
// // //   { icon: MdMonitor, label: "Analytics" },
// // //   { icon: MdSettings, label: "Settings" },
// // // ];

// // // const statCards = [
// // //   {
// // //     label: "Active Shipments",
// // //     value: "18",
// // //     change: "12% vs last month",
// // //     iconBg: C.scHigh,
// // //     icon: MdLocalShipping,
// // //     iconColor: C.primary,
// // //   },
// // //   {
// // //     label: "Pending Docs",
// // //     value: "7",
// // //     change: "8% vs last month",
// // //     iconBg: C.tertiaryFixed,
// // //     icon: MdDescription,
// // //     iconColor: C.tertiary,
// // //   },
// // //   {
// // //     label: "AI Queries Left",
// // //     value: "42/100",
// // //     change: "8% vs last month",
// // //     iconBg: C.scHighest,
// // //     icon: MdPsychology,
// // //     iconColor: C.secondary,
// // //   },
// // //   {
// // //     label: "Incentives",
// // //     value: "₹86,420",
// // //     change: "10% vs last month",
// // //     iconBg: C.primaryFixed,
// // //     icon: MdPayments,
// // //     iconColor: C.primary,
// // //   },
// // // ];

// // // const quickActions = [
// // //   // {
// // //   //   id: "shipment",
// // //   //   icon: MdAdd,
// // //   //   label: "Create Shipment",
// // //   //   bgcolor: "#F0FDFA",
// // //   //   textColor: "#00A896",
// // //   // },
// // //   {
// // //     id: "cargo",
// // //     icon: MdForum,
// // //     label: "Ask CargoMate",
// // //     bgcolor: "#F0FDFA",
// // //     textColor: "#2563EB",
// // //   },
// // //   {
// // //     id: "upload",
// // //     icon: MdCloudUpload,
// // //     label: "Upload Docs",
// // //     bgcolor: "#FFF7ED",
// // //     textColor: "#F97316",
// // //   },
// // //   {
// // //     id: "track",
// // //     icon: MdMyLocation,
// // //     label: "Track Shipment",
// // //     bgcolor: "#F0FDFA",
// // //     textColor: "#4F46E5",
// // //   },
// // //   {
// // //     id: "freight",
// // //     icon: MdCalculate,
// // //     label: "Freight Calculation",
// // //     bgcolor: "#F0FDFA",
// // //     textColor: "#0891B2",
// // //   },
// // //   {
// // //     id: "incentives",
// // //     icon: MdSavings,
// // //     label: "Incentive Checker",
// // //     bgcolor: "#FDF2F8",
// // //     textColor: "#DB2777",
// // //   },
// // // ];

// // // const shipments = [
// // //   {
// // //     id: "AS0-2025-104",
// // //     route: "Nhava Sheva - Dubai",
// // //     status: "Transit",
// // //     statusBg: C.scHigh,
// // //     statusColor: C.secondary,
// // //     eta: "29 Apr 2025",
// // //     mode: "Sea",
// // //     vendor: "Oceanic Logistics",
// // //     amount: "₹1,24,860",
// // //   },
// // //   {
// // //     id: "ASD-2025-103",
// // //     route: "Delhi - New York",
// // //     status: "Delayed",
// // //     statusBg: C.errorContainer,
// // //     statusColor: C.error,
// // //     eta: "27 Apr 2025",
// // //     mode: "Air",
// // //     vendor: "SkyFreight Global",
// // //     amount: "₹2,48,600",
// // //   },
// // //   {
// // //     id: "ASD-2025-102",
// // //     route: "Mumbai - London",
// // //     status: "Pending",
// // //     statusBg: C.tertiaryFixed,
// // //     statusColor: C.tertiary,
// // //     eta: "30 Apr 2025",
// // //     mode: "Sea",
// // //     vendor: "SwiftLogix",
// // //     amount: "₹98,450",
// // //   },
// // //   {
// // //     id: "ASD-2025-101",
// // //     route: "Mumbai - London",
// // //     status: "Delivered",
// // //     statusBg: C.tertiaryFixed,
// // //     statusColor: C.tertiary,
// // //     eta: "30 Apr 2025",
// // //     mode: "Sea",
// // //     vendor: "SwiftLogix",
// // //     amount: "₹98,450",
// // //   },
// // // ];

// // // export default function UserDashboard({ profileMode = false }) {
// // //   const siteBranding = usePublicConfig();
// // //   const quotaData = useSubscriptionQuotas();
// // //   const navigate = useNavigate();
//   // const location = useLocation();
//   // const location = useLocation();

// // //   const [active, setActive] = useState(null);
// // //   const [activeTab, setActiveTab] = useState(() => location.state?.activeTab || "AI CargoMate Assistant");
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
// // //   const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
// // //   // const content = tabContent[analysisTab];
// // //   const [showNotifications, setShowNotifications] = useState(false);
// // //   const [showMessages, setShowMessages] = useState(false);
// // //   const [activeNav, setActiveNav] = useState(0);
// // //   const [shipment, setShipment] = useState("");
// // //   const [auditLogs, setAuditLogs] = useState(false);

// // //   const userAdLocationByTab = {
// // //     "AI Chatbot": "User Dashboard - AI Chatbot",
// // //     "AI CargoMate Assistant": "User Dashboard - AI CargoMate Assistant",
// // //     "HS Code Lookup": "User Dashboard - HS Code Lookup",
// // //     "Incentive Checker": "User Dashboard - Incentive Checker",
// // //     "Freight Calculator": "User Dashboard - Freight Calculator",
// // //     "Shipment Planning": "User Dashboard - Shipment Planning",
// // //     Saved: "User Dashboard - Saved",
// // //     Subscription: "User Dashboard - Subscription",
// // //     Notifications: "User Dashboard - Notifications",
// // //     "Help & Support": "User Dashboard - Help & Support",
// // //   };
// // //   const activeAdLocation = userAdLocationByTab[activeTab];

// // //   return (
// // //     <div className="flex h-screen bg-gray-100  ">
// // //       {sidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
// // //           onClick={() => setSidebarOpen(false)}
// // //         />
// // //       )}
// // //       <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
// // //         <button
// // //           className="p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
// // //           title="Toggle dashboard sidebar"
// // //           aria-label="Toggle dashboard sidebar"
// // //           onClick={() => {
// // //             if (window.innerWidth >= 1024) setDesktopSidebarVisible((v) => !v);
// // //             else setSidebarOpen((v) => !v);
// // //           }}
// // //         >
// // //           <MdMenu size={18} />
// // //         </button>

// // //         <div className="lg:flex items-center sm:w-60 hidden justify-center gap-2 px-4 py-2">
// // //           <img
// // //             src={siteBranding.systemLogo || logo}
// // //             className="h-10 cursor-pointer"
// // //             onClick={() => navigate("/")}
// // //           />
// // //         </div>

// // //         <NoticeBanner />

// // //         <div className="flex items-center gap-1.5 ml-auto">
// // //           <button
// // //             onClick={() => setShowNotifications(true)}
// // //             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
// // //           >
// // //             <FiBell size={16} />
// // //             <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // //           </button>
// // //           <button
// // //             onClick={() => setShowMessages(true)}
// // //             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
// // //           >
// // //             <FiMail size={16} />
// // //           </button>

// // //           <AccountBadge />
// // //         </div>
// // //       </header>

// // //       <aside
// // //         className={`
// // //           fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60
// // //            bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
// // //           transform transition-transform duration-300 ease-in-out
// // //           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
// // //           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
// // //         `}
// // //       >
// // //         <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
// // //           {/* <button className="w-full hover:bg-teal-500 hover:text-white px-4 py-2 flex items-center gap-2 text-[#8aa0bc] rounded-r-lg text-xs text-left transition-colors" onClick={() => setActiveTab("AI CargoMate Chatbot")} >
// // //               AI CargoMate Chatbot</button> */}

// // //           {sidebarSections.map((section) => (
// // //             <div key={section.title} className="  ">
// // //               <p
// // //                 onClick={() => {
// // //                   if (section.items.length === 0) {
// // //                     if (profileMode) { navigate("/user-dashboard", { state: { activeTab: section.title } }); return; }
//                     // setActiveTab(section.title);
// // //                   }
// // //                 }}
// // //                 className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
// // //                     ${section.items.length === 0 && activeTab === "AI CargoMate Assistant" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
// // //                   `}
// // //               >
// // //                 {section.title}
// // //               </p>
// // //               {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
// // //                 <button
// // //                   key={label}
// // //                   className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
// // //                     ${
// // //                       activeTab === label
// // //                         ? "bg-teal-500 text-white rounded-r-lg "
// // //                         : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
// // //                     }`}
// // //                   onClick={() => {
// // //                     setActiveTab(label);
// // //                     setSidebarOpen(false);
// // //                   }}
// // //                 >
// // //                   <div className=" flex gap-3 px-4 py-2">
// // //                     <Icon className="text-base  flex-shrink-0" />
// // //                     <span className="flex-1 font-normal text-xs  truncate  ">
// // //                       {label}
// // //                     </span>
// // //                     {badge && (
// // //                       <span
// // //                         className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
// // //                       >
// // //                         {badge}
// // //                       </span>
// // //                     )}
// // //                   </div>
// // //                 </button>
// // //               ))}
// // //             </div>
// // //           ))}
// // //           <SidebarQuota
// // //             data={quotaData}
// // //             onUpgrade={() => setActiveTab("UpgradePlan")}
// // //           />
// // //         </nav>
// // //       </aside>

// // //       <main className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#f3f6fb]">
// // //         {!profileMode &&
// // //           !["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab) && (
// // //             <div
// // //               className="cm-module-shell cm-theme-intelligence mt-3"
// // //               key={`user-header-${activeTab}`}
// // //             >
// // //               <ModuleHero title={activeTab} role="user" />
// // //             </div>
// // //           )}
// // //         <div
// // //           className={
// // //             ["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab)
// // //               ? ""
// // //               : "cm-workspace cm-theme-intelligence"
// // //           }
// // //         >
// // //           {profileMode ? (
// // //             <AccountProfile embedded />
// // //           ) : (
// // //             <>
// // //               {activeTab === "AI Chatbot" && (
// // //                 <FeatureQuotaGate
// // //                   feature="aiChatbot"
// // //                   data={quotaData}
// // //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// // //                 >
// // //                   {" "}
// // //                   <Chatbot />{" "}
// // //                 </FeatureQuotaGate>
// // //               )}
// // //               {activeTab === "AI CargoMate Assistant" && (
// // //                 <AiCargoMateAssistant />
// // //               )}

// // //               {activeTab === "HS Code Lookup" && (
// // //                 <FeatureQuotaGate
// // //                   feature="hsLookup"
// // //                   data={quotaData}
// // //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// // //                 >
// // //                   {" "}
// // //                   <HSCodeLookup />{" "}
// // //                 </FeatureQuotaGate>
// // //               )}
// // //               {activeTab === "Incentive Checker" && (
// // //                 <FeatureQuotaGate
// // //                   feature="incentiveChecker"
// // //                   data={quotaData}
// // //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// // //                 >
// // //                   {" "}
// // //                   <IncentiveChecker />{" "}
// // //                 </FeatureQuotaGate>
// // //               )}
// // //               {activeTab === "Shipment Planning" && (
// // //                 <FeatureQuotaGate
// // //                   feature="shipmentPlanning"
// // //                   data={quotaData}
// // //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// // //                 >

// // //                   <ShipmentPlanning
// // //                     setActiveTab={setActiveTab}
// // //                     activeTab={activeTab}
// // //                   />
// // //                 </FeatureQuotaGate>
// // //               )}
// // //               {activeTab === "Freight Calculator" && <FreightCalculator />}

// // //               {activeTab === "Saved" && <Saved />}
// // //               {/* {activeTab === "Audit Logs" && <AuditLogs />}
// // //         {activeTab === "Analytics & Trends" && <AnalyticsTrends />} */}
// // //               {activeTab === "AI CargoMate Chatbot" && <Chatbot />}

// // //               {activeTab === "Subscription" && (
// // //                 <Subscription
// // //                   onChangePlan={() => setActiveTab("UpgradePlan")}
// // //                 />
// // //               )}
// // //               {activeTab === "Notifications" && <NotificationDashboard />}
// // //               {activeTab === "Help & Support" && <HelpSupportDashboard />}
// // //               {/* {activeTab === "Profile Settings" && <ProfileSettingsDashboard />} */}

// // //               {activeTab === "UpgradePlan" && <UpgradePlan />}
// // //             </>
// // //           )}

// // //           {showNotifications && (
// // //             <NotificationsModal onClose={() => setShowNotifications(false)} />
// // //           )}
// // //           {showMessages && (
// // //             <MessagesModal onClose={() => setShowMessages(false)} />
// // //           )}

// // //           {shipment === "shipment" && (
// // //             <div>
// // //               <Shipment
// // //                 setActiveTab={setActiveTab}
// // //                 setShipment={setShipment}
// // //                 currentTab={"Dashboard"}
// // //               />
// // //             </div>
// // //           )}

// // //           {auditLogs && (
// // //             <AuditLogSettingsModal onClose={() => setAuditLogs(false)} />
// // //           )}
// // //         </div>
// // //       </main>
// // //     </div>
// // //   );
// // // }


// // import ModuleHero from "../../components/ModuleHero";
// // import { usePublicConfig } from "../../../lib/publicConfig";
// // import FeatureQuotaGate, {
// //   useSubscriptionQuotas,
// //   SidebarQuota,
// // } from "../../components/FeatureQuotaGate";
// // import AIQuerySidebarStatus from "../../components/AIQuerySidebarStatus";
// // import AccountProfile, {
// //   AccountBadge,
// // } from "../../../components/AccountProfile";
// // import React, { useState, useRef, useEffect } from "react";
// // import DashboardAdPlacement from "../../components/DashboardAdPlacement";
// // import logo from "../../assets/Images/logo.png";
// // import axios from "axios";
// // import { getMyShipments } from "../../services/shipmentApi";
// // // import { FiAlertCircle } from "react-icons/fi";

// // import { FaRupeeSign } from "react-icons/fa";

// // import {
// //   FiX,
// //   FiAlertTriangle,
// //   FiEdit3,
// //   FiLink2,
// //   FiArrowLeft,
// //   FiSave,
// //   FiDownload,
// //   FiPlus,
// //   FiInfo,
// //   FiCopy,
// //   FiStar,
// //   FiDatabase,
// //   FiAlertCircle,
// //   FiAnchor,
// //   FiCpu,
// //   FiHash,
// //   FiGift,
// //   FiTruck,
// //   FiMap,
// //   FiPackage,
// //   FiRadio,
// //   FiFileText,
// //   FiUsers,
// //   FiBookmark,
// //   FiClipboard,
// //   FiBarChart2,
// //   FiCreditCard,
// //   FiBell,
// //   FiHelpCircle,
// //   FiSettings,
// //   FiChevronRight,
// //   FiShare2,
// //   FiSend,
// //   FiCheck,
// //   FiClock,
// //   FiDollarSign,
// //   FiAward,
// //   FiShoppingCart,
// //   FiFolder,
// //   FiPercent,
// //   FiZap,
// //   FiEye,
// //   FiCheckCircle,
// //   FiExternalLink,
// //   FiCalendar,
// //   FiChevronDown,
// //   FiUploadCloud,
// //   FiWifi,
// //   FiMapPin,
// //   FiPhone,
// //   FiSearch,
// //   FiMail,
// //   FiSun,
// //   FiRefreshCw,
// // } from "react-icons/fi";
// // import Shipment from "../../components/ShipmentForm";
// // import calculator from "../../assets/Images/webp/calculator.webp";
// // import checker from "../../assets/Images/webp/checker.webp";
// // import shipment from "../../assets/Images/webp/shipment.webp";
// // import Chatbot from "../../components/Chatbot";

// // import { BsAirplane } from "react-icons/bs";
// // import { MdOutlineRocketLaunch } from "react-icons/md";
// // import HSCodeLookup from "./HsCodeLookUp";
// // import IncentiveChecker from "./IncentiveChecker";
// // import ShipmentPlanning from "./ShipmentPlanning";
// // import FreightCalculator from "./FreightCalculator";
// // import AiCargoMateAssistant from "./AiCargoMateAssistant";

// // import robot from "../../assets/Images/webp/robot.webp";

// // import {
// //   MdMenu,
// //   MdLocalShipping,
// //   MdDescription,
// //   MdPsychology,
// //   MdPayments,
// //   MdDoubleArrow,
// //   MdBolt,
// //   MdAdd,
// //   MdForum,
// //   MdCloudUpload,
// //   MdMyLocation,
// //   MdCalculate,
// //   MdSavings,
// //   MdHelp,
// //   MdDownload,
// //   MdTrendingFlat,
// //   MdCheckCircle,
// //   MdStorage,
// //   MdApi,
// //   MdSync,
// //   MdDashboard,
// //   MdSettings,
// //   MdArrowUpward,
// //   MdQrCode2,
// //   MdCheckroom,
// //   MdPerson,
// // } from "react-icons/md";

// // import { FaAnchor, FaShip } from "react-icons/fa";

// // import { MdMonitor } from "react-icons/md";

// // import SavedReports from "./SavedReport";
// // import Saved from "./Saved";

// // import AuditLogs from "./AuditLogs";
// // import AnalyticsTrends from "./Analysis&Trends";

// // import UpgradePlan from "./UpgradePlan";
// // import Subscription from "./Subscription";
// // import NotificationDashboard from "../b2bDashboard/AlertNotification";
// // import HelpSupportDashboard from "./Help&Support";
// // import NoticeBanner from "../../components/NoticeBanner";
// // import ProfileSettingsDashboard from "./ProfileSettings";
// // import { useNavigate, useLocation } from "react-router-dom";
// // import MessagesModal from "../../components/Messages";
// // import FreightCalculatorModal from "../../components/FreightCalculator";
// // import IncentivesCheckerModal from "../../components/IncentiveChecker";
// // import TrackShipmentModal from "../../components/userComponent/TrackShipment";
// // import UploadDocumentationModal from "../../components/userComponent/UploadDocumentation";
// // import EditAdditionalInformation from "../../components/userComponent/EditAdditionalInformation";
// // import EditGoodsInformation from "../../components/userComponent/EditGoodsInformation";
// // import EditPartiesInformation from "../../components/userComponent/EditPartiesInformation";
// // import BookShipment from "../../components/userComponent/BookShipment";
// // import TrackShipment from "../../components/userComponent/TrackShipment";
// // import FullDisclaimer from "../../components/userComponent/FullDisclaimer";
// // import RiskInsights from "../../components/userComponent/RiskInsights";
// // import SharePlan from "../../components/userComponent/SharePlan";
// // import CertificateOfOrigin from "../../components/userComponent/CertificateOfOrigin";
// // import NewQueryModal from "../../components/userComponent/NewQuery";
// // import ViewTradeInformation from "../../components/userComponent/ViewTradeInformation";
// // import ViewShipmentEligibility from "../../components/userComponent/ViewShipmentEligibility";
// // import VendorInsightsDetailedAnalytics from "../../components/userComponent/VendorInsightDetailAnalytics";
// // import ShareReportModal from "../../components/userComponent/ShareReport";
// // import SaveReportModal from "../../components/userComponent/SaveReport";
// // import ResultSummaryModal from "../../components/userComponent/ResultSummary";
// // import PartnerAnalysis from "../../components/userComponent/PartnerAnalysis";
// // import FiltersModal from "../../components/userComponent/Filters";
// // import DownloadReportModal from "../../components/userComponent/DownloadReport";
// // import DataSourceModal from "../../components/userComponent/DataSource";
// // import AuditLogSettingsModal from "../../components/userComponent/AuditLogSettings";
// // import AllDecliningCountriesModal from "../../components/userComponent/AllDecliningCountries";

// // import AllPortsOfArrivalModal from "../../components/userComponent/AllPortsOfArrival";

// // import AISmartSummary from "../../components/userComponent/AiSmartSummary";
// // import UploadDocumentModal from "../../components/userComponent/UploadDocument";
// // import AllDocumentsTemplateModal from "../../components/userComponent/AllDocumentTemplate";
// // import CostBreakdownModal from "../../components/userComponent/CostBreakDown";
// // import FullRouteScheduleModal from "../../components/userComponent/FullRouteSchedule";
// // import InsightsModal from "../../components/userComponent/Insights";
// // import WeightVolumeSummaryModal from "../../components/userComponent/WeightVolumeSummary";

// // import FullDocumentsModal from "../../components/userComponent/FullDocument";

// // import StorageDetailsModal from "../../components/userComponent/StorageDetails";

// // const C = {
// //   primary: "#00685f",
// //   secondary: "#006398",
// //   tertiary: "#a33900",
// //   bg: "#f8f9ff",
// //   surface: "#f8f9ff",
// //   onSurface: "#0d1c2e",
// //   onSurfaceVariant: "#3d4947",
// //   outlineVariant: "#bcc9c6",
// //   scLowest: "#ffffff",
// //   scLow: "#eff4ff",
// //   sc: "#e6eeff",
// //   scHigh: "#dce9ff",
// //   scHighest: "#d5e3fc",
// //   error: "#ba1a1a",
// //   errorContainer: "#ffdad6",
// //   tertiaryFixed: "#ffdbce",
// //   tertiaryContainer: "#cc4900",
// //   primaryFixed: "#89f5e7",
// //   secondaryFixed: "#cce5ff",
// // };

// // function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
// //   return (
// //     <div
// //       className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
// //       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
// //     >
// //       <div className="flex justify-between items-start mb-2">
// //         <span
// //           className="text-sm  font-semibold  leading-4"
// //           // style={{ color: C.onSurfaceVariant }}
// //         >
// //           {label}
// //         </span>
// //       </div>
// //       <div className="flex justify-between " style={{ color: C.onSurface }}>
// //         <div className="text-2xl font-bold  "> {value}</div>
// //         <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
// //           <Icon size={22} style={{ color: iconColor }} />
// //         </div>
// //       </div>
// //       <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
// //         <MdArrowUpward size={10} className="" />
// //         <span className="text-[10px] font-normal">{change}</span>
// //       </div>
// //     </div>
// //   );
// // }

// // function QuickActionBtn({ id, icon: Icon, label, bgcolor, textColor }) {
// //   const [active, setActive] = useState("");

// //   return (
// //     <>
// //       <button
// //         className="flex flex-col items-center gap-1 group"
// //         style={{ backgroundColor: bgcolor }}
// //       >
// //         <div
// //           onClick={() => setActive(id)}
// //           className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors"
// //         >
// //           <Icon size={24} style={{ color: textColor }} />
// //           <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
// //             {label}
// //           </span>
// //         </div>
// //       </button>

// //       {active === "freight" && (
// //         <FreightCalculatorModal onClose={() => setActive(null)} />
// //       )}

// //       {active === "upload" && (
// //         <UploadDocumentationModal onClose={() => setActive(null)} />
// //       )}
// //       {active === "track" && (
// //         <TrackShipmentModal onClose={() => setActive(null)} />
// //       )}
// //       {active === "incentives" && (
// //         <IncentivesCheckerModal onClose={() => setActive(null)} />
// //       )}
// //     </>
// //   );
// // }

// // function ActivityItem({
// //   dotColor,
// //   iconBg,
// //   icon: Icon,
// //   iconColor,
// //   title,
// //   subtitle,
// //   time,
// //   tag,
// // }) {
// //   return (
// //     <div
// //       className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
// //       style={{ borderColor: C.outlineVariant }}
// //     >
// //       <div
// //         className="p-2  rounded-lg h-fit"
// //         style={{ backgroundColor: iconBg }}
// //       >
// //         {typeof Icon === "string" ? (
// //           <img src={Icon || null} alt="icon" className="w-5 h-5" />
// //         ) : (
// //           React.createElement(Icon, {
// //             size: 22,
// //             style: { color: iconColor },
// //           })
// //         )}
// //       </div>
// //       <div className="flex-1 justify-">
// //         <div className="font-normal text-sm" style={{ color: C.onSurface }}>
// //           {title}
// //         </div>
// //         {subtitle && (
// //           <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
// //             {subtitle}
// //           </p>
// //         )}
// //         <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
// //           {time}
// //         </div>
// //         {tag && (
// //           <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
// //             <MdCheckCircle size={12} />
// //             {tag}
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // function DetailCard({ tag, title, children, setShipment, setActiveTab }) {
// //   const [active, setActive] = useState("");
// //   const [value, setValue] = useState("");

// //   return (
// //     <div
// //       className="p-4 rounded-xl border flex flex-col justify-between"
// //       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
// //     >
// //       <div className="flex flex-col    mb-4">
// //         <div className="flex  justify-between">
// //           <h4 className="text-sm font-bold">{title}</h4>
// //           <button className="text-[10px] font-bold uppercase text-[#00A896]">
// //             View All
// //           </button>
// //         </div>
// //         <div className="flex justify-start">
// //           <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
// //             {tag}
// //           </span>
// //         </div>
// //       </div>
// //       <div>{children}</div>
// //       <div>
// //         <button
// //           onClick={() => {
// //             setShipment("shipment");
// //             setActiveTab("");
// //           }}
// //           className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]"
// //         >
// //           Create Shipment from this result
// //         </button>
// //         <button
// //           onClick={() => setActive("report")}
// //           className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  "
// //         >
// //           <MdDownload size={16} className="" /> Download Report (PDF)
// //         </button>
// //       </div>

// //       {active === "report" && (
// //         <DownloadReportModal
// //           onClose={() => setActive(null)}
// //           setValue={setValue}
// //           value={value}
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // const sidebarSections = [
// //   {
// //     title: "AI & Trade Tools",
// //     items: [
// //       {
// //         icon: FiCpu,
// //         label: "AI Chatbot",
// //         badgeColor: "bg-teal-500",
// //       },
// //       {
// //         icon: FiCpu,
// //         label: "AI CargoMate Assistant",
// //         badge: "",
// //         badgeColor: "bg-teal-500",
// //       },
// //       { icon: FiHash, label: "HS Code Lookup" },
// //       { icon: FiGift, label: "Incentive Checker" },
// //       { icon: FiTruck, label: "Freight Calculator" },
// //       { icon: FiMap, label: "Shipment Planning" },
// //       {
// //         icon: FiBookmark,
// //         label: "Saved",
// //         // badge: "New",
// //         badgeColor: "bg-[#2B7FFF]",
// //       },
// //       // { icon: FiClipboard, label: "Audit Logs" },
// //       // { icon: FiBarChart2, label: "Analytics & Trends" },
// //     ],
// //   },
// //   // {
// //   //   title: "Reports & Insights",
// //   //   items: [
// //   //     {
// //   //       icon: FiBookmark,
// //   //       label: "Saved",
// //   //       // badge: "New",
// //   //       badgeColor: "bg-[#2B7FFF]",
// //   //     },
// //   //     // { icon: FiClipboard, label: "Audit Logs" },
// //   //     // { icon: FiBarChart2, label: "Analytics & Trends" },
// //   //   ],
// //   // },
// //   {
// //     title: "Shipments",
// //     items: [
// //       { icon: MdLocalShipping, label: "Submitted Shipments" },
// //     ],
// //   },
// //   {
// //     title: "Account & Support",
// //     items: [
// //       {
// //         icon: FiCreditCard,
// //         label: "Subscription",
// //         badge: undefined,
// //         badgeColor: "bg-[#00BBA7]",
// //       },
// //       {
// //         icon: FiBell,
// //         label: "Notifications",
// //         badge: "",
// //         badgeColor: "bg-red-500",
// //       },
// //       { icon: FiHelpCircle, label: "Help & Support" },
// //       // { icon: FiSettings, label: "Profile Settings" },
// //     ],
// //   },
// // ];

// // function Field({ label, placeholder, select }) {
// //   return (
// //     <div>
// //       <label className="block text-sm font-semibold text-gray-900 mb-1.5">
// //         {label}
// //       </label>
// //       {select ? (
// //         <div className="relative">
// //           <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
// //             <option>{placeholder}</option>
// //           </select>
// //           <FiChevronDown
// //             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
// //             size={16}
// //           />
// //         </div>
// //       ) : (
// //         <input
// //           type="text"
// //           placeholder={placeholder}
// //           className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
// //         />
// //       )}
// //     </div>
// //   );
// // }

// // function SectionCard({ number, title, subtitle, children }) {
// //   return (
// //     <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
// //       <div className="flex items-center gap-2">
// //         <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
// //           {number}
// //         </span>
// //         <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
// //       </div>
// //       {subtitle && (
// //         <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">
// //           {subtitle}
// //         </p>
// //       )}
// //       <div className="mt-4 space-y-4">{children}</div>
// //     </div>
// //   );
// // }

// // function Label({ children }) {
// //   return (
// //     <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
// //       {children}
// //       <span className="text-red-500 ml-0.5">*</span>
// //     </label>
// //   );
// // }

// // function Input({ label, placeholder, value, required = true }) {
// //   return (
// //     <div>
// //       {required ? (
// //         <Label>{label}</Label>
// //       ) : (
// //         <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
// //           {label}
// //         </label>
// //       )}
// //       <input
// //         type="text"
// //         defaultValue={value}
// //         placeholder={placeholder}
// //         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //       />
// //     </div>
// //   );
// // }

// // function DateInput({ label }) {
// //   return (
// //     <div>
// //       <label className="block text-xs font-semibold text-gray-700 mb-1">
// //         {label}
// //       </label>
// //       <div className="relative">
// //         <input
// //           type="text"
// //           placeholder="Select date"
// //           className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
// //         />
// //         <FiCalendar
// //           size={14}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function Select({ label, placeholder, required = true }) {
// //   return (
// //     <div>
// //       {required ? (
// //         <Label>{label}</Label>
// //       ) : (
// //         <label className="block text-xs font-semibold text-gray-700 mb-1">
// //           {label}
// //         </label>
// //       )}
// //       <div className="relative">
// //         <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
// //           <option>{placeholder}</option>
// //         </select>
// //         <FiChevronDown
// //           size={14}
// //           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
// //         />
// //       </div>
// //     </div>
// //   );
// // }

// // function RadioGroup({ label, defaultValue = "no" }) {
// //   return (
// //     <div>
// //       <Label>{label}</Label>
// //       <div className="flex items-center gap-4 mt-2">
// //         <label className="flex items-center gap-1.5 text-sm text-gray-700">
// //           <input
// //             type="radio"
// //             className="accent-blue-600"
// //             defaultChecked={defaultValue === "yes"}
// //           />
// //           Yes
// //         </label>
// //         <label className="flex items-center gap-1.5 text-sm text-gray-700">
// //           <input
// //             type="radio"
// //             className="accent-blue-600"
// //             defaultChecked={defaultValue === "no"}
// //           />
// //           No
// //         </label>
// //       </div>
// //     </div>
// //   );
// // }

// // function Grid2({ children }) {
// //   return (
// //     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
// //   );
// // }

// // const docTypes = [
// //   {
// //     label: "Commercial Invoice",
// //     icon: FiFileText,
// //     color: "text-blue-600 bg-blue-50",
// //   },
// //   {
// //     label: "Packing List",
// //     icon: FiClipboard,
// //     color: "text-orange-600 bg-orange-50",
// //   },
// //   { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
// //   { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
// //   { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
// //   {
// //     label: "Purchase Order",
// //     icon: FiShoppingCart,
// //     color: "text-orange-600 bg-orange-50",
// //   },
// //   {
// //     label: "Product Certificate",
// //     icon: FiAward,
// //     color: "text-purple-600 bg-purple-50",
// //   },
// //   {
// //     label: "Other Documents",
// //     icon: FiFolder,
// //     color: "text-gray-500 bg-gray-100",
// //   },
// // ];

// // const aiTopStats = [
// //   {
// //     label: "Suggested HS Code",
// //     value: "8517.12.00",
// //     color: "bg-blue-50 text-blue-700",
// //   },
// //   {
// //     label: "Required Documents",
// //     value: "7 Documents",
// //     color: "bg-green-50 text-green-700",
// //   },
// //   {
// //     label: "Freight Estimate",
// //     value: "₹24,860",
// //     color: "bg-orange-50 text-orange-700",
// //   },
// //   {
// //     label: "RoDTEP / Incentive",
// //     value: "Eligible (2.5%)",
// //     color: "bg-purple-50 text-purple-700",
// //   },
// // ];

// // const aiBottomStats = [
// //   { label: "Compliance Requirements", value: "12", sub: "Requirements" },
// //   { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
// //   { label: "Estimated Timeline", value: "8-10 Days" },
// //   { label: "Recommended Action", value: "Proceed with Booking", green: true },
// // ];

// // const modals = [
// //   { key: "report", label: "Download Report" },
// //   { key: "freight", label: "Freight Calculator" },
// //   { key: "upload", label: "Upload Documentation" },
// //   { key: "track", label: "Track Shipment" },
// //   { key: "incentives", label: "Incentives Checker" },
// // ];

// // const navItems = [
// //   { icon: MdDashboard, label: "Dashboard" },
// //   { icon: MdLocalShipping, label: "Shipments" },
// //   { icon: MdDescription, label: "Documents" },
// //   { icon: MdMonitor, label: "Analytics" },
// //   { icon: MdSettings, label: "Settings" },
// // ];

// // const statCards = [
// //   {
// //     label: "Active Shipments",
// //     value: "18",
// //     change: "12% vs last month",
// //     iconBg: C.scHigh,
// //     icon: MdLocalShipping,
// //     iconColor: C.primary,
// //   },
// //   {
// //     label: "Pending Docs",
// //     value: "7",
// //     change: "8% vs last month",
// //     iconBg: C.tertiaryFixed,
// //     icon: MdDescription,
// //     iconColor: C.tertiary,
// //   },
// //   {
// //     label: "AI Queries Left",
// //     value: "42/100",
// //     change: "8% vs last month",
// //     iconBg: C.scHighest,
// //     icon: MdPsychology,
// //     iconColor: C.secondary,
// //   },
// //   {
// //     label: "Incentives",
// //     value: "₹86,420",
// //     change: "10% vs last month",
// //     iconBg: C.primaryFixed,
// //     icon: MdPayments,
// //     iconColor: C.primary,
// //   },
// // ];

// // const quickActions = [
// //   // {
// //   //   id: "shipment",
// //   //   icon: MdAdd,
// //   //   label: "Create Shipment",
// //   //   bgcolor: "#F0FDFA",
// //   //   textColor: "#00A896",
// //   // },
// //   {
// //     id: "cargo",
// //     icon: MdForum,
// //     label: "Ask CargoMate",
// //     bgcolor: "#F0FDFA",
// //     textColor: "#2563EB",
// //   },
// //   {
// //     id: "upload",
// //     icon: MdCloudUpload,
// //     label: "Upload Docs",
// //     bgcolor: "#FFF7ED",
// //     textColor: "#F97316",
// //   },
// //   {
// //     id: "track",
// //     icon: MdMyLocation,
// //     label: "Track Shipment",
// //     bgcolor: "#F0FDFA",
// //     textColor: "#4F46E5",
// //   },
// //   {
// //     id: "freight",
// //     icon: MdCalculate,
// //     label: "Freight Calculation",
// //     bgcolor: "#F0FDFA",
// //     textColor: "#0891B2",
// //   },
// //   {
// //     id: "incentives",
// //     icon: MdSavings,
// //     label: "Incentive Checker",
// //     bgcolor: "#FDF2F8",
// //     textColor: "#DB2777",
// //   },
// // ];

// // const shipments = [
// //   {
// //     id: "AS0-2025-104",
// //     route: "Nhava Sheva - Dubai",
// //     status: "Transit",
// //     statusBg: C.scHigh,
// //     statusColor: C.secondary,
// //     eta: "29 Apr 2025",
// //     mode: "Sea",
// //     vendor: "Oceanic Logistics",
// //     amount: "₹1,24,860",
// //   },
// //   {
// //     id: "ASD-2025-103",
// //     route: "Delhi - New York",
// //     status: "Delayed",
// //     statusBg: C.errorContainer,
// //     statusColor: C.error,
// //     eta: "27 Apr 2025",
// //     mode: "Air",
// //     vendor: "SkyFreight Global",
// //     amount: "₹2,48,600",
// //   },
// //   {
// //     id: "ASD-2025-102",
// //     route: "Mumbai - London",
// //     status: "Pending",
// //     statusBg: C.tertiaryFixed,
// //     statusColor: C.tertiary,
// //     eta: "30 Apr 2025",
// //     mode: "Sea",
// //     vendor: "SwiftLogix",
// //     amount: "₹98,450",
// //   },
// //   {
// //     id: "ASD-2025-101",
// //     route: "Mumbai - London",
// //     status: "Delivered",
// //     statusBg: C.tertiaryFixed,
// //     statusColor: C.tertiary,
// //     eta: "30 Apr 2025",
// //     mode: "Sea",
// //     vendor: "SwiftLogix",
// //     amount: "₹98,450",
// //   },
// // ];

// // const formatShipmentDate = (date) => {
// //   if (!date) return "—";

// //   const parsedDate = new Date(date);

// //   if (Number.isNaN(parsedDate.getTime())) return "—";

// //   return parsedDate.toLocaleDateString("en-IN", {
// //     day: "2-digit",
// //     month: "short",
// //     year: "numeric",
// //   });
// // };


// // function SubmittedShipmentsTable({ shipments, loading, error, onRefresh }) {
// //   const [search, setSearch] = useState("");
// //   const [statusFilter, setStatusFilter] = useState("All");

// //   const getValue = (...values) =>
// //     values.find((value) => value !== undefined && value !== null && String(value).trim() !== "") ?? "-";

// //   const getRoute = (item = {}) => {
// //     const route = item.route && typeof item.route === "object" ? item.route : {};
// //     const origin = [
// //       route.originCity || item.originCity,
// //       route.originCountry || item.originCountry,
// //     ].filter(Boolean).join(", ");
// //     const destination = [
// //       route.destinationCity || item.destinationCity,
// //       route.destinationCountry || item.destinationCountry,
// //     ].filter(Boolean).join(", ");
// //     return `${origin || "-"} → ${destination || "-"}`;
// //   };

// //   const formatDate = (value) => {
// //     if (!value) return "-";
// //     const date = new Date(value);
// //     return Number.isNaN(date.getTime())
// //       ? "-"
// //       : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
// //   };

// //   const getStatus = (item) => getValue(item.shipmentStatus, item.status, "Submitted");
// //   const getReference = (item) => getValue(item.referenceNumber, item.sbNumber, item.shipmentNumber, item.bookingNo, item._id);
// //   const getMode = (item) => getValue(item.shipmentMode, item.route?.mode, item.transportMode);
// //   const getCommodity = (item) => getValue(item.cargo?.commodity, item.cargo?.productName, item.commodity, item.goodsDescription, item.cargo?.description);
// //   const getValueLabel = (item) => {
// //     const amount = item.cargo?.value ?? item.cargoValue ?? item.shipmentValue ?? item.value;
// //     if (amount === undefined || amount === null || amount === "") return "-";
// //     const currency = item.cargo?.currency || item.currency || "INR";
// //     return `${currency} ${Number(amount).toLocaleString("en-IN")}`;
// //   };

// //   const statuses = ["All", ...new Set(shipments.map((item) => String(getStatus(item))))];
// //   const filtered = shipments.filter((item) => {
// //     const query = search.toLowerCase();
// //     const matchesSearch = [
// //       getReference(item),
// //       getRoute(item),
// //       getCommodity(item),
// //       getMode(item),
// //       getStatus(item),
// //     ].join(" ").toLowerCase().includes(query);
// //     const matchesStatus = statusFilter === "All" || getStatus(item) === statusFilter;
// //     return matchesSearch && matchesStatus;
// //   });

// //   const statusClass = (status) => {
// //     const normalized = String(status).toLowerCase();
// //     if (["approved", "delivered", "completed"].includes(normalized)) return "bg-emerald-50 text-emerald-700";
// //     if (["rejected", "delayed", "exception"].includes(normalized)) return "bg-red-50 text-red-700";
// //     if (["in transit", "transit", "under review", "pending review", "submitted", "pending"].includes(normalized)) return "bg-amber-50 text-amber-700";
// //     return "bg-slate-100 text-slate-700";
// //   };

// //   return (
// //     <div className="p-4 sm:p-6">
// //       <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
// //         <div>
// //           <h2 className="text-lg sm:text-xl font-bold text-gray-900">Submitted Shipments</h2>
// //           <p className="text-xs sm:text-sm text-gray-500 mt-1">Track the status of shipments submitted to the admin.</p>
// //         </div>
// //         <button type="button" onClick={onRefresh} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
// //           <FiRefreshCw size={14} /> Refresh
// //         </button>
// //       </div>

// //       <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
// //         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 border-b border-gray-100">
// //           <div>
// //             <h3 className="text-sm font-bold text-slate-800">All Shipments</h3>
// //             <p className="text-[11px] text-slate-500 mt-0.5">{filtered.length} shipment(s) found</p>
// //           </div>
// //           <div className="flex flex-col sm:flex-row gap-2">
// //             <div className="relative">
// //               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
// //               <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shipment..." className="w-full sm:w-56 rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-teal-500" />
// //             </div>
// //             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-teal-500">
// //               {statuses.map((status) => <option key={status} value={status}>{status === "All" ? "All Statuses" : status}</option>)}
// //             </select>
// //           </div>
// //         </div>

// //         {loading ? (
// //           <div className="p-10 text-center text-sm text-slate-500">Loading submitted shipments...</div>
// //         ) : error ? (
// //           <div className="p-8 text-center">
// //             <p className="text-sm text-red-600">{error}</p>
// //             <button onClick={onRefresh} className="mt-3 text-xs font-semibold text-teal-700">Try again</button>
// //           </div>
// //         ) : filtered.length === 0 ? (
// //           <div className="p-10 text-center">
// //             <MdLocalShipping className="mx-auto text-slate-300" size={32} />
// //             <p className="mt-2 text-sm font-semibold text-slate-700">No submitted shipments found</p>
// //             <p className="mt-1 text-xs text-slate-500">Your submitted shipments will appear here.</p>
// //           </div>
// //         ) : (
// //           <div className="overflow-x-auto">
// //             <table className="min-w-[1050px] w-full text-left">
// //               <thead className="bg-slate-50 border-b border-slate-100">
// //                 <tr className="text-[10px] uppercase tracking-wide text-slate-500">
// //                   <th className="px-4 py-3 font-bold">Shipment / B.L No.</th>
// //                   <th className="px-4 py-3 font-bold">Origin → Destination</th>
// //                   <th className="px-4 py-3 font-bold">Status</th>
// //                   <th className="px-4 py-3 font-bold">ETD / ATD</th>
// //                   <th className="px-4 py-3 font-bold">ETA</th>
// //                   <th className="px-4 py-3 font-bold">Mode</th>
// //                   <th className="px-4 py-3 font-bold">Commodity</th>
// //                   <th className="px-4 py-3 font-bold text-right">Value</th>
// //                 </tr>
// //               </thead>
// //               <tbody className="divide-y divide-slate-100">
// //                 {filtered.map((item) => {
// //                   const status = getStatus(item);
// //                   return (
// //                     <tr key={item._id || getReference(item)} className="hover:bg-slate-50/70 transition-colors">
// //                       <td className="px-4 py-3">
// //                         <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{getReference(item)}</span>
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{getRoute(item)}</span>
// //                       </td>
// //                       <td className="px-4 py-3">
// //                         <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${statusClass(status)}`}>{status}</span>
// //                       </td>
// //                       <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatShipmentDate(item.etd)}</td>
// //                       <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatShipmentDate(item.eta)}</td>
// //                       <td className="px-4 py-3 text-xs text-slate-600">{getMode(item)}</td>
// //                       <td className="px-4 py-3 text-xs text-slate-600 max-w-[180px] truncate">{getCommodity(item)}</td>
// //                       <td className="px-4 py-3 text-xs text-slate-700 text-right whitespace-nowrap">{getValueLabel(item)}</td>
// //                     </tr>
// //                   );
// //                 })}
// //               </tbody>
// //             </table>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

// // export default function UserDashboard({ profileMode = false }) {
// //   const siteBranding = usePublicConfig();
// //   const quotaData = useSubscriptionQuotas();
// //   const navigate = useNavigate();

// //   const [active, setActive] = useState(null);
// //   const [activeTab, setActiveTab] = useState(() => location.state?.activeTab || "AI CargoMate Assistant");
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
// //   const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
// //   // const content = tabContent[analysisTab];
// //   const [showMessages, setShowMessages] = useState(false);
// //   const [activeNav, setActiveNav] = useState(0);
// //   const [shipment, setShipment] = useState("");
// //   const [auditLogs, setAuditLogs] = useState(false);
// //   const [submittedShipments, setSubmittedShipments] = useState([]);
// //   const [shipmentsLoading, setShipmentsLoading] = useState(false);
// //   const [shipmentsError, setShipmentsError] = useState("");

// //   const fetchSubmittedShipments = async () => {
// //     setShipmentsLoading(true);
// //     setShipmentsError("");

// //     try {
// //       const response = await getMyShipments();

// //       const payload =
// //         response?.data?.data ??
// //         response?.data?.shipments ??
// //         response?.data ??
// //         [];

// //       const records = Array.isArray(payload)
// //         ? payload
// //         : Array.isArray(payload?.data)
// //           ? payload.data
// //           : Array.isArray(payload?.shipments)
// //             ? payload.shipments
// //             : [];

// //       const submitted = records.filter((item) => {
// //         const status = String(
// //           item.shipmentStatus ||
// //           item.status ||
// //           item.workflowStatus ||
// //           ""
// //         ).toLowerCase().trim().replace(/_/g, " ");

// //         return [
// //           "submitted",
// //           "submitted to admin",
// //           "pending",
// //           "pending review",
// //           "under review",
// //           "admin review",
// //           "in review",
// //           "approved",
// //           "rejected",
// //           "on hold",
// //         ].includes(status);
// //       });

// //       setSubmittedShipments(submitted);
// //     } catch (error) {
// //       console.error("Error fetching submitted shipments:", error);

// //       setShipmentsError(
// //         error?.response?.data?.message ||
// //         "Unable to load submitted shipments. Please try again."
// //       );
// //     } finally {
// //       setShipmentsLoading(false);
// //     }
// //   };



// //   useEffect(() => {
// //     if (activeTab === "Submitted Shipments") fetchSubmittedShipments();
// //   }, [activeTab]);

// //   const userAdLocationByTab = {
// //     "AI Chatbot": "User Dashboard - AI Chatbot",
// //     "AI CargoMate Assistant": "User Dashboard - AI CargoMate Assistant",
// //     "HS Code Lookup": "User Dashboard - HS Code Lookup",
// //     "Incentive Checker": "User Dashboard - Incentive Checker",
// //     "Freight Calculator": "User Dashboard - Freight Calculator",
// //     "Shipment Planning": "User Dashboard - Shipment Planning",
// //     Saved: "User Dashboard - Saved",
// //     Subscription: "User Dashboard - Subscription",
// //     Notifications: "User Dashboard - Notifications",
// //     "Help & Support": "User Dashboard - Help & Support",
// //   };
// //   const activeAdLocation = userAdLocationByTab[activeTab];

// //   return (
// //     <div className="flex h-screen bg-gray-100  ">
// //       {sidebarOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}
// //       <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
// //         <button
// //           className="p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
// //           title="Toggle dashboard sidebar"
// //           aria-label="Toggle dashboard sidebar"
// //           onClick={() => {
// //             if (window.innerWidth >= 1024) setDesktopSidebarVisible((v) => !v);
// //             else setSidebarOpen((v) => !v);
// //           }}
// //         >
// //           <MdMenu size={18} />
// //         </button>

// //         <div className="lg:flex items-center sm:w-60 hidden justify-center gap-2 px-4 py-2">
// //           <img
// //             src={siteBranding.systemLogo || logo}
// //             className="h-10 cursor-pointer"
// //             onClick={() => navigate("/")}
// //           />
// //         </div>

// //         <NoticeBanner />

// //         <div className="flex items-center gap-1.5 ml-auto">
// //           <button
// //             onClick={() => { setActiveTab("Notifications"); setSidebarOpen(false); }}
// //             aria-label="Open Notifications page"
// //             title="Notifications"
// //             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
// //           >
// //             <FiBell size={16} />
// //             <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
// //           </button>
// //           <button
// //             onClick={() => setShowMessages(true)}
// //             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
// //           >
// //             <FiMail size={16} />
// //           </button>

// //           <AccountBadge />
// //         </div>
// //       </header>

// //       <aside
// //         className={`
// //           fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60
// //            bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
// //           transform transition-transform duration-300 ease-in-out
// //           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
// //           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
// //         `}
// //       >
// //         <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
// //           {/* <button className="w-full hover:bg-teal-500 hover:text-white px-4 py-2 flex items-center gap-2 text-[#8aa0bc] rounded-r-lg text-xs text-left transition-colors" onClick={() => setActiveTab("AI CargoMate Chatbot")} >
// //               AI CargoMate Chatbot</button> */}

// //           {sidebarSections.map((section) => (
// //             <div key={section.title} className="  ">
// //               <p
// //                 onClick={() => {
// //                   if (section.items.length === 0) {
// //                     setActiveTab(section.title);
// //                   }
// //                 }}
// //                 className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
// //                     ${section.items.length === 0 && activeTab === "AI CargoMate Assistant" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
// //                   `}
// //               >
// //                 {section.title}
// //               </p>
// //               {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
// //                 <button
// //                   key={label}
// //                   className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
// //                     ${
// //                       activeTab === label
// //                         ? "bg-teal-500 text-white rounded-r-lg "
// //                         : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
// //                     }`}
// //                   onClick={() => {
// //                     setActiveTab(label);
// //                     setSidebarOpen(false);
// //                   }}
// //                 >
// //                   <div className=" flex gap-3 px-4 py-2">
// //                     <Icon className="text-base  flex-shrink-0" />
// //                     <span className="flex-1 font-normal text-xs  truncate  ">
// //                       {label}
// //                     </span>
// //                     {badge && (
// //                       <span
// //                         className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
// //                       >
// //                         {badge}
// //                       </span>
// //                     )}
// //                   </div>
// //                 </button>
// //               ))}
// //             </div>
// //           ))}
// //           <SidebarQuota
// //             data={quotaData}
// //             onUpgrade={() => setActiveTab("UpgradePlan")}
// //           />
// //         </nav>
// //       </aside>

// //       <main className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#f3f6fb]">
// //         {!profileMode &&
// //           !["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab) && (
// //             <div
// //               className="cm-module-shell cm-theme-intelligence mt-3"
// //               key={`user-header-${activeTab}`}
// //             >
// //               <ModuleHero title={activeTab} role="user" />
// //             </div>
// //           )}
// //         <div
// //           className={
// //             ["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab)
// //               ? ""
// //               : "cm-workspace cm-theme-intelligence"
// //           }
// //         >
// //           {profileMode ? (
// //             <AccountProfile embedded />
// //           ) : (
// //             <>
// //               {activeTab === "Submitted Shipments" && (
// //                 <SubmittedShipmentsTable
// //                   shipments={submittedShipments}
// //                   loading={shipmentsLoading}
// //                   error={shipmentsError}
// //                   onRefresh={fetchSubmittedShipments}
// //                 />
// //               )}
// //               {activeTab === "AI Chatbot" && (
// //                 <FeatureQuotaGate
// //                   feature="aiChatbot"
// //                   data={quotaData}
// //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// //                 >
// //                   {" "}
// //                   <Chatbot />{" "}
// //                 </FeatureQuotaGate>
// //               )}
// //               {activeTab === "AI CargoMate Assistant" && (
// //                 <AiCargoMateAssistant />
// //               )}

// //               {activeTab === "HS Code Lookup" && (
// //                 <FeatureQuotaGate
// //                   feature="hsLookup"
// //                   data={quotaData}
// //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// //                 >
// //                   {" "}
// //                   <HSCodeLookup />{" "}
// //                 </FeatureQuotaGate>
// //               )}
// //               {activeTab === "Incentive Checker" && (
// //                 <FeatureQuotaGate
// //                   feature="incentiveChecker"
// //                   data={quotaData}
// //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// //                 >
// //                   {" "}
// //                   <IncentiveChecker />{" "}
// //                 </FeatureQuotaGate>
// //               )}
// //               {activeTab === "Shipment Planning" && (
// //                 <FeatureQuotaGate
// //                   feature="shipmentPlanning"
// //                   data={quotaData}
// //                   onUpgrade={() => setActiveTab("UpgradePlan")}
// //                 >

// //                   <ShipmentPlanning
// //                     setActiveTab={setActiveTab}
// //                     activeTab={activeTab}
// //                     setShipment={setShipment}
// //                   />
// //                   {shipment === "shipment" && (
// //                     <div className="mt-4">
// //                       <Shipment
// //                         setActiveTab={setActiveTab}
// //                         setShipment={setShipment}
// //                         currentTab={"Shipment Planning"}
// //                         onSaved={() => {
// //                           setShipment("");
// //                           fetchSubmittedShipments();
// //                         }}
// //                       />
// //                     </div>
// //                   )}
// //                 </FeatureQuotaGate>
// //               )}
// //               {activeTab === "Freight Calculator" && <FreightCalculator />}

// //               {activeTab === "Saved" && <Saved />}
// //               {/* {activeTab === "Audit Logs" && <AuditLogs />}
// //         {activeTab === "Analytics & Trends" && <AnalyticsTrends />} */}
// //               {activeTab === "AI CargoMate Chatbot" && <Chatbot />}

// //               {activeTab === "Subscription" && (
// //                 <Subscription
// //                   onChangePlan={() => setActiveTab("UpgradePlan")}
// //                 />
// //               )}
// //               {activeTab === "Notifications" && <NotificationDashboard />}
// //               {activeTab === "Help & Support" && <HelpSupportDashboard />}
// //               {/* {activeTab === "Profile Settings" && <ProfileSettingsDashboard />} */}

// //               {activeTab === "UpgradePlan" && <UpgradePlan />}
// //             </>
// //           )}

// //           {showMessages && (
// //             <MessagesModal onClose={() => setShowMessages(false)} />
// //           )}

// //           {auditLogs && (
// //             <AuditLogSettingsModal onClose={() => setAuditLogs(false)} />
// //           )}
// //         </div>
// //       </main>
// //     </div>
// //   );
// // }


// import ModuleHero from "../../components/ModuleHero";
// import { usePublicConfig } from "../../../lib/publicConfig";
// import FeatureQuotaGate, {
//   useSubscriptionQuotas,
//   SidebarQuota,
// } from "../../components/FeatureQuotaGate";
// import AIQuerySidebarStatus from "../../components/AIQuerySidebarStatus";
// import AccountProfile, {
//   AccountBadge,
// } from "../../../components/AccountProfile";
// import React, { useState, useRef, useEffect } from "react";
// import DashboardAdPlacement from "../../components/DashboardAdPlacement";
// import logo from "../../assets/Images/logo.png";
// import axios from "axios";
// import { getMyShipments } from "../../services/shipmentApi";
// // import { FiAlertCircle } from "react-icons/fi";

// import { FaRupeeSign } from "react-icons/fa";

// import {
//   FiX,
//   FiAlertTriangle,
//   FiEdit3,
//   FiLink2,
//   FiArrowLeft,
//   FiSave,
//   FiDownload,
//   FiPlus,
//   FiInfo,
//   FiCopy,
//   FiStar,
//   FiDatabase,
//   FiAlertCircle,
//   FiAnchor,
//   FiCpu,
//   FiHash,
//   FiGift,
//   FiTruck,
//   FiMap,
//   FiPackage,
//   FiRadio,
//   FiFileText,
//   FiUsers,
//   FiBookmark,
//   FiClipboard,
//   FiBarChart2,
//   FiCreditCard,
//   FiBell,
//   FiHelpCircle,
//   FiSettings,
//   FiChevronRight,
//   FiShare2,
//   FiSend,
//   FiCheck,
//   FiClock,
//   FiDollarSign,
//   FiAward,
//   FiShoppingCart,
//   FiFolder,
//   FiPercent,
//   FiZap,
//   FiEye,
//   FiCheckCircle,
//   FiExternalLink,
//   FiCalendar,
//   FiChevronDown,
//   FiUploadCloud,
//   FiWifi,
//   FiMapPin,
//   FiPhone,
//   FiSearch,
//   FiMail,
//   FiSun,
//   FiRefreshCw,
// } from "react-icons/fi";
// import Shipment from "../../components/ShipmentForm";
// import calculator from "../../assets/Images/webp/calculator.webp";
// import checker from "../../assets/Images/webp/checker.webp";
// import shipment from "../../assets/Images/webp/shipment.webp";
// import Chatbot from "../../components/Chatbot";

// import { BsAirplane } from "react-icons/bs";
// import { MdOutlineRocketLaunch } from "react-icons/md";
// import HSCodeLookup from "./HsCodeLookUp";
// import IncentiveChecker from "./IncentiveChecker";
// import ShipmentPlanning from "./ShipmentPlanning";
// import FreightCalculator from "./FreightCalculator";
// import AiCargoMateAssistant from "./AiCargoMateAssistant";

// import robot from "../../assets/Images/webp/robot.webp";

// import {
//   MdMenu,
//   MdLocalShipping,
//   MdDescription,
//   MdPsychology,
//   MdPayments,
//   MdDoubleArrow,
//   MdBolt,
//   MdAdd,
//   MdForum,
//   MdCloudUpload,
//   MdMyLocation,
//   MdCalculate,
//   MdSavings,
//   MdHelp,
//   MdDownload,
//   MdTrendingFlat,
//   MdCheckCircle,
//   MdStorage,
//   MdApi,
//   MdSync,
//   MdDashboard,
//   MdSettings,
//   MdArrowUpward,
//   MdQrCode2,
//   MdCheckroom,
//   MdPerson,
// } from "react-icons/md";

// import { FaAnchor, FaShip } from "react-icons/fa";

// import { MdMonitor } from "react-icons/md";

// import SavedReports from "./SavedReport";
// import Saved from "./Saved";

// import AuditLogs from "./AuditLogs";
// import AnalyticsTrends from "./Analysis&Trends";

// import UpgradePlan from "./UpgradePlan";
// import Subscription from "./Subscription";
// import NotificationDashboard from "../b2bDashboard/AlertNotification";
// import HelpSupportDashboard from "./Help&Support";
// import NoticeBanner from "../../components/NoticeBanner";
// import ProfileSettingsDashboard from "./ProfileSettings";
// import { useNavigate, useLocation } from "react-router-dom";
// import MessagesModal from "../../components/Messages";
// import NotificationsModal from "../../components/Notifications";
// import FreightCalculatorModal from "../../components/FreightCalculator";
// import IncentivesCheckerModal from "../../components/IncentiveChecker";
// import TrackShipmentModal from "../../components/userComponent/TrackShipment";
// import UploadDocumentationModal from "../../components/userComponent/UploadDocumentation";
// import EditAdditionalInformation from "../../components/userComponent/EditAdditionalInformation";
// import EditGoodsInformation from "../../components/userComponent/EditGoodsInformation";
// import EditPartiesInformation from "../../components/userComponent/EditPartiesInformation";
// import BookShipment from "../../components/userComponent/BookShipment";
// import TrackShipment from "../../components/userComponent/TrackShipment";
// import FullDisclaimer from "../../components/userComponent/FullDisclaimer";
// import RiskInsights from "../../components/userComponent/RiskInsights";
// import SharePlan from "../../components/userComponent/SharePlan";
// import CertificateOfOrigin from "../../components/userComponent/CertificateOfOrigin";
// import NewQueryModal from "../../components/userComponent/NewQuery";
// import ViewTradeInformation from "../../components/userComponent/ViewTradeInformation";
// import ViewShipmentEligibility from "../../components/userComponent/ViewShipmentEligibility";
// import VendorInsightsDetailedAnalytics from "../../components/userComponent/VendorInsightDetailAnalytics";
// import ShareReportModal from "../../components/userComponent/ShareReport";
// import SaveReportModal from "../../components/userComponent/SaveReport";
// import ResultSummaryModal from "../../components/userComponent/ResultSummary";
// import PartnerAnalysis from "../../components/userComponent/PartnerAnalysis";
// import FiltersModal from "../../components/userComponent/Filters";
// import DownloadReportModal from "../../components/userComponent/DownloadReport";
// import DataSourceModal from "../../components/userComponent/DataSource";
// import AuditLogSettingsModal from "../../components/userComponent/AuditLogSettings";
// import AllDecliningCountriesModal from "../../components/userComponent/AllDecliningCountries";

// import AllPortsOfArrivalModal from "../../components/userComponent/AllPortsOfArrival";

// import AISmartSummary from "../../components/userComponent/AiSmartSummary";
// import UploadDocumentModal from "../../components/userComponent/UploadDocument";
// import AllDocumentsTemplateModal from "../../components/userComponent/AllDocumentTemplate";
// import CostBreakdownModal from "../../components/userComponent/CostBreakDown";
// import FullRouteScheduleModal from "../../components/userComponent/FullRouteSchedule";
// import InsightsModal from "../../components/userComponent/Insights";
// import WeightVolumeSummaryModal from "../../components/userComponent/WeightVolumeSummary";

// import FullDocumentsModal from "../../components/userComponent/FullDocument";

// import StorageDetailsModal from "../../components/userComponent/StorageDetails";

// const C = {
//   primary: "#00685f",
//   secondary: "#006398",
//   tertiary: "#a33900",
//   bg: "#f8f9ff",
//   surface: "#f8f9ff",
//   onSurface: "#0d1c2e",
//   onSurfaceVariant: "#3d4947",
//   outlineVariant: "#bcc9c6",
//   scLowest: "#ffffff",
//   scLow: "#eff4ff",
//   sc: "#e6eeff",
//   scHigh: "#dce9ff",
//   scHighest: "#d5e3fc",
//   error: "#ba1a1a",
//   errorContainer: "#ffdad6",
//   tertiaryFixed: "#ffdbce",
//   tertiaryContainer: "#cc4900",
//   primaryFixed: "#89f5e7",
//   secondaryFixed: "#cce5ff",
// };

// function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
//   return (
//     <div
//       className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
//       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
//     >
//       <div className="flex justify-between items-start mb-2">
//         <span
//           className="text-sm  font-semibold  leading-4"
//           // style={{ color: C.onSurfaceVariant }}
//         >
//           {label}
//         </span>
//       </div>
//       <div className="flex justify-between " style={{ color: C.onSurface }}>
//         <div className="text-2xl font-bold  "> {value}</div>
//         <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
//           <Icon size={22} style={{ color: iconColor }} />
//         </div>
//       </div>
//       <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
//         <MdArrowUpward size={10} className="" />
//         <span className="text-[10px] font-normal">{change}</span>
//       </div>
//     </div>
//   );
// }

// function QuickActionBtn({ id, icon: Icon, label, bgcolor, textColor }) {
//   const [active, setActive] = useState("");

//   return (
//     <>
//       <button
//         className="flex flex-col items-center gap-1 group"
//         style={{ backgroundColor: bgcolor }}
//       >
//         <div
//           onClick={() => setActive(id)}
//           className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors"
//         >
//           <Icon size={24} style={{ color: textColor }} />
//           <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
//             {label}
//           </span>
//         </div>
//       </button>

//       {active === "freight" && (
//         <FreightCalculatorModal onClose={() => setActive(null)} />
//       )}

//       {active === "upload" && (
//         <UploadDocumentationModal onClose={() => setActive(null)} />
//       )}
//       {active === "track" && (
//         <TrackShipmentModal onClose={() => setActive(null)} />
//       )}
//       {active === "incentives" && (
//         <IncentivesCheckerModal onClose={() => setActive(null)} />
//       )}
//     </>
//   );
// }

// function ActivityItem({
//   dotColor,
//   iconBg,
//   icon: Icon,
//   iconColor,
//   title,
//   subtitle,
//   time,
//   tag,
// }) {
//   return (
//     <div
//       className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
//       style={{ borderColor: C.outlineVariant }}
//     >
//       <div
//         className="p-2  rounded-lg h-fit"
//         style={{ backgroundColor: iconBg }}
//       >
//         {typeof Icon === "string" ? (
//           <img src={Icon || null} alt="icon" className="w-5 h-5" />
//         ) : (
//           React.createElement(Icon, {
//             size: 22,
//             style: { color: iconColor },
//           })
//         )}
//       </div>
//       <div className="flex-1 justify-">
//         <div className="font-normal text-sm" style={{ color: C.onSurface }}>
//           {title}
//         </div>
//         {subtitle && (
//           <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
//             {subtitle}
//           </p>
//         )}
//         <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
//           {time}
//         </div>
//         {tag && (
//           <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
//             <MdCheckCircle size={12} />
//             {tag}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// function DetailCard({ tag, title, children, setShipment, setActiveTab }) {
//   const [active, setActive] = useState("");
//   const [value, setValue] = useState("");

//   return (
//     <div
//       className="p-4 rounded-xl border flex flex-col justify-between"
//       style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
//     >
//       <div className="flex flex-col    mb-4">
//         <div className="flex  justify-between">
//           <h4 className="text-sm font-bold">{title}</h4>
//           <button className="text-[10px] font-bold uppercase text-[#00A896]">
//             View All
//           </button>
//         </div>
//         <div className="flex justify-start">
//           <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
//             {tag}
//           </span>
//         </div>
//       </div>
//       <div>{children}</div>
//       <div>
//         <button
//           onClick={() => {
//             setShipment("shipment");
//             setActiveTab("");
//           }}
//           className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]"
//         >
//           Create Shipment from this result
//         </button>
//         <button
//           onClick={() => setActive("report")}
//           className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  "
//         >
//           <MdDownload size={16} className="" /> Download Report (PDF)
//         </button>
//       </div>

//       {active === "report" && (
//         <DownloadReportModal
//           onClose={() => setActive(null)}
//           setValue={setValue}
//           value={value}
//         />
//       )}
//     </div>
//   );
// }

// const sidebarSections = [
//   {
//     title: "AI & Trade Tools",
//     items: [
//       {
//         icon: FiCpu,
//         label: "AI Chatbot",
//         badgeColor: "bg-teal-500",
//       },
//       {
//         icon: FiCpu,
//         label: "AI CargoMate Assistant",
//         badge: "",
//         badgeColor: "bg-teal-500",
//       },
//       { icon: FiHash, label: "HS Code Lookup" },
//       { icon: FiGift, label: "Incentive Checker" },
//       { icon: FiTruck, label: "Freight Calculator" },
//       { icon: FiMap, label: "Shipment Planning" },
//       {
//         icon: FiBookmark,
//         label: "Saved",
//         // badge: "New",
//         badgeColor: "bg-[#2B7FFF]",
//       },
//       // { icon: FiClipboard, label: "Audit Logs" },
//       // { icon: FiBarChart2, label: "Analytics & Trends" },
//     ],
//   },
//   // {
//   //   title: "Reports & Insights",
//   //   items: [
//   //     {
//   //       icon: FiBookmark,
//   //       label: "Saved",
//   //       // badge: "New",
//   //       badgeColor: "bg-[#2B7FFF]",
//   //     },
//   //     // { icon: FiClipboard, label: "Audit Logs" },
//   //     // { icon: FiBarChart2, label: "Analytics & Trends" },
//   //   ],
//   // },
//   {
//     title: "Shipments",
//     items: [
//       { icon: MdLocalShipping, label: "Submitted Shipments" },
//     ],
//   },
//   {
//     title: "Account & Support",
//     items: [
//       {
//         icon: FiCreditCard,
//         label: "Subscription",
//         badge: undefined,
//         badgeColor: "bg-[#00BBA7]",
//       },
//       {
//         icon: FiBell,
//         label: "Notifications",
//         badge: "",
//         badgeColor: "bg-red-500",
//       },
//       { icon: FiHelpCircle, label: "Help & Support" },
//       // { icon: FiSettings, label: "Profile Settings" },
//     ],
//   },
// ];

// function Field({ label, placeholder, select }) {
//   return (
//     <div>
//       <label className="block text-sm font-semibold text-gray-900 mb-1.5">
//         {label}
//       </label>
//       {select ? (
//         <div className="relative">
//           <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
//             <option>{placeholder}</option>
//           </select>
//           <FiChevronDown
//             className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//             size={16}
//           />
//         </div>
//       ) : (
//         <input
//           type="text"
//           placeholder={placeholder}
//           className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
//         />
//       )}
//     </div>
//   );
// }

// function SectionCard({ number, title, subtitle, children }) {
//   return (
//     <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
//       <div className="flex items-center gap-2">
//         <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
//           {number}
//         </span>
//         <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
//       </div>
//       {subtitle && (
//         <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">
//           {subtitle}
//         </p>
//       )}
//       <div className="mt-4 space-y-4">{children}</div>
//     </div>
//   );
// }

// function Label({ children }) {
//   return (
//     <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
//       {children}
//       <span className="text-red-500 ml-0.5">*</span>
//     </label>
//   );
// }

// function Input({ label, placeholder, value, required = true }) {
//   return (
//     <div>
//       {required ? (
//         <Label>{label}</Label>
//       ) : (
//         <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <input
//         type="text"
//         defaultValue={value}
//         placeholder={placeholder}
//         className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//       />
//     </div>
//   );
// }

// function DateInput({ label }) {
//   return (
//     <div>
//       <label className="block text-xs font-semibold text-gray-700 mb-1">
//         {label}
//       </label>
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="Select date"
//           className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
//         />
//         <FiCalendar
//           size={14}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
//         />
//       </div>
//     </div>
//   );
// }

// function Select({ label, placeholder, required = true }) {
//   return (
//     <div>
//       {required ? (
//         <Label>{label}</Label>
//       ) : (
//         <label className="block text-xs font-semibold text-gray-700 mb-1">
//           {label}
//         </label>
//       )}
//       <div className="relative">
//         <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
//           <option>{placeholder}</option>
//         </select>
//         <FiChevronDown
//           size={14}
//           className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
//         />
//       </div>
//     </div>
//   );
// }

// function RadioGroup({ label, defaultValue = "no" }) {
//   return (
//     <div>
//       <Label>{label}</Label>
//       <div className="flex items-center gap-4 mt-2">
//         <label className="flex items-center gap-1.5 text-sm text-gray-700">
//           <input
//             type="radio"
//             className="accent-blue-600"
//             defaultChecked={defaultValue === "yes"}
//           />
//           Yes
//         </label>
//         <label className="flex items-center gap-1.5 text-sm text-gray-700">
//           <input
//             type="radio"
//             className="accent-blue-600"
//             defaultChecked={defaultValue === "no"}
//           />
//           No
//         </label>
//       </div>
//     </div>
//   );
// }

// function Grid2({ children }) {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
//   );
// }

// const docTypes = [
//   {
//     label: "Commercial Invoice",
//     icon: FiFileText,
//     color: "text-blue-600 bg-blue-50",
//   },
//   {
//     label: "Packing List",
//     icon: FiClipboard,
//     color: "text-orange-600 bg-orange-50",
//   },
//   { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
//   { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
//   { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
//   {
//     label: "Purchase Order",
//     icon: FiShoppingCart,
//     color: "text-orange-600 bg-orange-50",
//   },
//   {
//     label: "Product Certificate",
//     icon: FiAward,
//     color: "text-purple-600 bg-purple-50",
//   },
//   {
//     label: "Other Documents",
//     icon: FiFolder,
//     color: "text-gray-500 bg-gray-100",
//   },
// ];

// const aiTopStats = [
//   {
//     label: "Suggested HS Code",
//     value: "8517.12.00",
//     color: "bg-blue-50 text-blue-700",
//   },
//   {
//     label: "Required Documents",
//     value: "7 Documents",
//     color: "bg-green-50 text-green-700",
//   },
//   {
//     label: "Freight Estimate",
//     value: "₹24,860",
//     color: "bg-orange-50 text-orange-700",
//   },
//   {
//     label: "RoDTEP / Incentive",
//     value: "Eligible (2.5%)",
//     color: "bg-purple-50 text-purple-700",
//   },
// ];

// const aiBottomStats = [
//   { label: "Compliance Requirements", value: "12", sub: "Requirements" },
//   { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
//   { label: "Estimated Timeline", value: "8-10 Days" },
//   { label: "Recommended Action", value: "Proceed with Booking", green: true },
// ];

// const modals = [
//   { key: "report", label: "Download Report" },
//   { key: "freight", label: "Freight Calculator" },
//   { key: "upload", label: "Upload Documentation" },
//   { key: "track", label: "Track Shipment" },
//   { key: "incentives", label: "Incentives Checker" },
// ];

// const navItems = [
//   { icon: MdDashboard, label: "Dashboard" },
//   { icon: MdLocalShipping, label: "Shipments" },
//   { icon: MdDescription, label: "Documents" },
//   { icon: MdMonitor, label: "Analytics" },
//   { icon: MdSettings, label: "Settings" },
// ];

// const statCards = [
//   {
//     label: "Active Shipments",
//     value: "18",
//     change: "12% vs last month",
//     iconBg: C.scHigh,
//     icon: MdLocalShipping,
//     iconColor: C.primary,
//   },
//   {
//     label: "Pending Docs",
//     value: "7",
//     change: "8% vs last month",
//     iconBg: C.tertiaryFixed,
//     icon: MdDescription,
//     iconColor: C.tertiary,
//   },
//   {
//     label: "AI Queries Left",
//     value: "42/100",
//     change: "8% vs last month",
//     iconBg: C.scHighest,
//     icon: MdPsychology,
//     iconColor: C.secondary,
//   },
//   {
//     label: "Incentives",
//     value: "₹86,420",
//     change: "10% vs last month",
//     iconBg: C.primaryFixed,
//     icon: MdPayments,
//     iconColor: C.primary,
//   },
// ];

// const quickActions = [
//   // {
//   //   id: "shipment",
//   //   icon: MdAdd,
//   //   label: "Create Shipment",
//   //   bgcolor: "#F0FDFA",
//   //   textColor: "#00A896",
//   // },
//   {
//     id: "cargo",
//     icon: MdForum,
//     label: "Ask CargoMate",
//     bgcolor: "#F0FDFA",
//     textColor: "#2563EB",
//   },
//   {
//     id: "upload",
//     icon: MdCloudUpload,
//     label: "Upload Docs",
//     bgcolor: "#FFF7ED",
//     textColor: "#F97316",
//   },
//   {
//     id: "track",
//     icon: MdMyLocation,
//     label: "Track Shipment",
//     bgcolor: "#F0FDFA",
//     textColor: "#4F46E5",
//   },
//   {
//     id: "freight",
//     icon: MdCalculate,
//     label: "Freight Calculation",
//     bgcolor: "#F0FDFA",
//     textColor: "#0891B2",
//   },
//   {
//     id: "incentives",
//     icon: MdSavings,
//     label: "Incentive Checker",
//     bgcolor: "#FDF2F8",
//     textColor: "#DB2777",
//   },
// ];

// const shipments = [
//   {
//     id: "AS0-2025-104",
//     route: "Nhava Sheva - Dubai",
//     status: "Transit",
//     statusBg: C.scHigh,
//     statusColor: C.secondary,
//     eta: "29 Apr 2025",
//     mode: "Sea",
//     vendor: "Oceanic Logistics",
//     amount: "₹1,24,860",
//   },
//   {
//     id: "ASD-2025-103",
//     route: "Delhi - New York",
//     status: "Delayed",
//     statusBg: C.errorContainer,
//     statusColor: C.error,
//     eta: "27 Apr 2025",
//     mode: "Air",
//     vendor: "SkyFreight Global",
//     amount: "₹2,48,600",
//   },
//   {
//     id: "ASD-2025-102",
//     route: "Mumbai - London",
//     status: "Pending",
//     statusBg: C.tertiaryFixed,
//     statusColor: C.tertiary,
//     eta: "30 Apr 2025",
//     mode: "Sea",
//     vendor: "SwiftLogix",
//     amount: "₹98,450",
//   },
//   {
//     id: "ASD-2025-101",
//     route: "Mumbai - London",
//     status: "Delivered",
//     statusBg: C.tertiaryFixed,
//     statusColor: C.tertiary,
//     eta: "30 Apr 2025",
//     mode: "Sea",
//     vendor: "SwiftLogix",
//     amount: "₹98,450",
//   },
// ];

// const formatShipmentDate = (date) => {
//   if (!date) return "—";

//   const parsedDate = new Date(date);

//   if (Number.isNaN(parsedDate.getTime())) return "—";

//   return parsedDate.toLocaleDateString("en-IN", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//   });
// };


// function SubmittedShipmentsTable({ shipments, loading, error, onRefresh }) {
//   const [search, setSearch] = useState("");
//   const [statusFilter, setStatusFilter] = useState("All");

//   const getValue = (...values) =>
//     values.find((value) => value !== undefined && value !== null && String(value).trim() !== "") ?? "-";

//   const getRoute = (item = {}) => {
//     const route = item.route && typeof item.route === "object" ? item.route : {};
//     const origin = [
//       route.originCity || item.originCity,
//       route.originCountry || item.originCountry,
//     ].filter(Boolean).join(", ");
//     const destination = [
//       route.destinationCity || item.destinationCity,
//       route.destinationCountry || item.destinationCountry,
//     ].filter(Boolean).join(", ");
//     return `${origin || "-"} → ${destination || "-"}`;
//   };

//   const formatDate = (value) => {
//     if (!value) return "-";
//     const date = new Date(value);
//     return Number.isNaN(date.getTime())
//       ? "-"
//       : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
//   };

//   const getStatus = (item) => getValue(item.shipmentStatus, item.status, "Submitted");
//   const getReference = (item) => getValue(item.referenceNumber, item.sbNumber, item.shipmentNumber, item.bookingNo, item._id);
//   const getMode = (item) => getValue(item.shipmentMode, item.route?.mode, item.transportMode);
//   const getCommodity = (item) => getValue(item.cargo?.commodity, item.cargo?.productName, item.commodity, item.goodsDescription, item.cargo?.description);
//   const getValueLabel = (item) => {
//     const amount = item.cargo?.value ?? item.cargoValue ?? item.shipmentValue ?? item.value;
//     if (amount === undefined || amount === null || amount === "") return "-";
//     const currency = item.cargo?.currency || item.currency || "INR";
//     return `${currency} ${Number(amount).toLocaleString("en-IN")}`;
//   };

//   const statuses = ["All", ...new Set(shipments.map((item) => String(getStatus(item))))];
//   const filtered = shipments.filter((item) => {
//     const query = search.toLowerCase();
//     const matchesSearch = [
//       getReference(item),
//       getRoute(item),
//       getCommodity(item),
//       getMode(item),
//       getStatus(item),
//     ].join(" ").toLowerCase().includes(query);
//     const matchesStatus = statusFilter === "All" || getStatus(item) === statusFilter;
//     return matchesSearch && matchesStatus;
//   });

//   const statusClass = (status) => {
//     const normalized = String(status).toLowerCase();
//     if (["approved", "delivered", "completed"].includes(normalized)) return "bg-emerald-50 text-emerald-700";
//     if (["rejected", "delayed", "exception"].includes(normalized)) return "bg-red-50 text-red-700";
//     if (["in transit", "transit", "under review", "pending review", "submitted", "pending"].includes(normalized)) return "bg-amber-50 text-amber-700";
//     return "bg-slate-100 text-slate-700";
//   };

//   return (
//     <div className="p-4 sm:p-6">
//       <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
//         <div>
//           <h2 className="text-lg sm:text-xl font-bold text-gray-900">Submitted Shipments</h2>
//           <p className="text-xs sm:text-sm text-gray-500 mt-1">Track the status of shipments submitted to the admin.</p>
//         </div>
//         <button type="button" onClick={onRefresh} className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 hover:bg-gray-50">
//           <FiRefreshCw size={14} /> Refresh
//         </button>
//       </div>

//       <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
//         <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 p-4 border-b border-gray-100">
//           <div>
//             <h3 className="text-sm font-bold text-slate-800">All Shipments</h3>
//             <p className="text-[11px] text-slate-500 mt-0.5">{filtered.length} shipment(s) found</p>
//           </div>
//           <div className="flex flex-col sm:flex-row gap-2">
//             <div className="relative">
//               <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
//               <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search shipment..." className="w-full sm:w-56 rounded-lg border border-slate-200 pl-9 pr-3 py-2 text-xs outline-none focus:ring-2 focus:ring-teal-500" />
//             </div>
//             <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-600 outline-none focus:ring-2 focus:ring-teal-500">
//               {statuses.map((status) => <option key={status} value={status}>{status === "All" ? "All Statuses" : status}</option>)}
//             </select>
//           </div>
//         </div>

//         {loading ? (
//           <div className="p-10 text-center text-sm text-slate-500">Loading submitted shipments...</div>
//         ) : error ? (
//           <div className="p-8 text-center">
//             <p className="text-sm text-red-600">{error}</p>
//             <button onClick={onRefresh} className="mt-3 text-xs font-semibold text-teal-700">Try again</button>
//           </div>
//         ) : filtered.length === 0 ? (
//           <div className="p-10 text-center">
//             <MdLocalShipping className="mx-auto text-slate-300" size={32} />
//             <p className="mt-2 text-sm font-semibold text-slate-700">No submitted shipments found</p>
//             <p className="mt-1 text-xs text-slate-500">Your submitted shipments will appear here.</p>
//           </div>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-[1050px] w-full text-left">
//               <thead className="bg-slate-50 border-b border-slate-100">
//                 <tr className="text-[10px] uppercase tracking-wide text-slate-500">
//                   <th className="px-4 py-3 font-bold">Shipment / B.L No.</th>
//                   <th className="px-4 py-3 font-bold">Origin → Destination</th>
//                   <th className="px-4 py-3 font-bold">Status</th>
//                   <th className="px-4 py-3 font-bold">ETD / ATD</th>
//                   {/* <th className="px-4 py-3 font-bold">ETA</th> */}
//                   <th className="px-4 py-3 font-bold">Mode</th>
//                   <th className="px-4 py-3 font-bold">Commodity</th>
//                   <th className="px-4 py-3 font-bold text-right">Value</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-slate-100">
//                 {filtered.map((item) => {
//                   const status = getStatus(item);
//                   return (
//                     <tr key={item._id || getReference(item)} className="hover:bg-slate-50/70 transition-colors">
//                       <td className="px-4 py-3">
//                         <span className="text-xs font-bold text-slate-800 whitespace-nowrap">{getReference(item)}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className="text-xs font-medium text-slate-700 whitespace-nowrap">{getRoute(item)}</span>
//                       </td>
//                       <td className="px-4 py-3">
//                         <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold whitespace-nowrap ${statusClass(status)}`}>{status}</span>
//                       </td>
//                       <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatShipmentDate(item.etd)}</td>
//                       {/* <td className="px-4 py-3 text-xs text-slate-600 whitespace-nowrap">{formatShipmentDate(item.eta)}</td> */}
//                       <td className="px-4 py-3 text-xs text-slate-600">{getMode(item)}</td>
//                       <td className="px-4 py-3 text-xs text-slate-600 max-w-[180px] truncate">{getCommodity(item)}</td>
//                       <td className="px-4 py-3 text-xs text-slate-700 text-right whitespace-nowrap">{getValueLabel(item)}</td>
//                     </tr>
//                   );
//                 })}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default function UserDashboard({ profileMode = false }) {
//   const siteBranding = usePublicConfig();
//   const quotaData = useSubscriptionQuotas();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const [active, setActive] = useState(null);
//   const [activeTab, setActiveTab] = useState(() => location.state?.activeTab || "AI CargoMate Assistant");
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   // The profile and dashboard paths can reuse the same React component instance.
//   // Respond to router state changes, not only the initial useState value.
//   useEffect(() => {
//     if (!profileMode && location.state?.activeTab) setActiveTab(location.state.activeTab);
//   }, [profileMode, location.state?.activeTab]);

//   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
//   const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
//   // const content = tabContent[analysisTab];
//   const [showNotifications, setShowNotifications] = useState(false);
//   const [showMessages, setShowMessages] = useState(false);
//   const [activeNav, setActiveNav] = useState(0);
//   const [shipment, setShipment] = useState("");
//   const [auditLogs, setAuditLogs] = useState(false);
//   const [submittedShipments, setSubmittedShipments] = useState([]);
//   const [shipmentsLoading, setShipmentsLoading] = useState(false);
//   const [shipmentsError, setShipmentsError] = useState("");

//   const fetchSubmittedShipments = async () => {
//     setShipmentsLoading(true);
//     setShipmentsError("");
  
//     try {
//       const response = await getMyShipments();
  
//       const payload =
//         response?.data?.data ??
//         response?.data?.shipments ??
//         response?.data ??
//         [];
  
//       const records = Array.isArray(payload)
//         ? payload
//         : Array.isArray(payload?.data)
//           ? payload.data
//           : Array.isArray(payload?.shipments)
//             ? payload.shipments
//             : [];
  
//       const submitted = records.filter((item) => {
//         const status = String(
//           item.shipmentStatus ||
//           item.status ||
//           item.workflowStatus ||
//           ""
//         ).toLowerCase().trim().replace(/_/g, " ");
  
//         return [
//           "submitted",
//           "submitted to admin",
//           "pending",
//           "pending review",
//           "under review",
//           "admin review",
//           "in review",
//           "approved",
//           "rejected",
//           "on hold",
//         ].includes(status);
//       });
  
//       setSubmittedShipments(submitted);
//     } catch (error) {
//       console.error("Error fetching submitted shipments:", error);
  
//       setShipmentsError(
//         error?.response?.data?.message ||
//         "Unable to load submitted shipments. Please try again."
//       );
//     } finally {
//       setShipmentsLoading(false);
//     }
//   };

  

//   useEffect(() => {
//     if (activeTab === "Submitted Shipments") fetchSubmittedShipments();
//   }, [activeTab]);

//   const userAdLocationByTab = {
//     "AI Chatbot": "User Dashboard - AI Chatbot",
//     "AI CargoMate Assistant": "User Dashboard - AI CargoMate Assistant",
//     "HS Code Lookup": "User Dashboard - HS Code Lookup",
//     "Incentive Checker": "User Dashboard - Incentive Checker",
//     "Freight Calculator": "User Dashboard - Freight Calculator",
//     "Shipment Planning": "User Dashboard - Shipment Planning",
//     Saved: "User Dashboard - Saved",
//     Subscription: "User Dashboard - Subscription",
//     Notifications: "User Dashboard - Notifications",
//     "Help & Support": "User Dashboard - Help & Support",
//   };
//   const activeAdLocation = userAdLocationByTab[activeTab];

//   return (
//     <div className="flex h-screen bg-gray-100  ">
//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}
//       <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
//         <button
//           className="p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
//           title="Toggle dashboard sidebar"
//           aria-label="Toggle dashboard sidebar"
//           onClick={() => {
//             if (window.innerWidth >= 1024) setDesktopSidebarVisible((v) => !v);
//             else setSidebarOpen((v) => !v);
//           }}
//         >
//           <MdMenu size={18} />
//         </button>

//         <div className="lg:flex items-center sm:w-60 hidden justify-center gap-2 px-4 py-2">
//           <img
//             src={siteBranding.systemLogo || logo}
//             className="h-10 cursor-pointer"
//             onClick={() => navigate("/")}
//           />
//         </div>

//         <NoticeBanner />

//         <div className="flex items-center gap-1.5 ml-auto">
//           <button
//             onClick={() => { setActiveTab("Notifications"); setSidebarOpen(false); }}
//             aria-label="Open Notifications page"
//             title="Notifications"
//              //onClick={() => setShowNotifications(true)}

//             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
//           >
//             <FiBell size={16} />
//             <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
//           </button>
//           <button
//             onClick={() => setShowMessages(true)}
//             className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
//           >
//             <FiMail size={16} />
//           </button>

//           <AccountBadge />
//         </div>
//       </header>

//       <aside
//         className={`
//           fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60
//            bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
//           transform transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
//         `}
//       >
//         <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
//           {/* <button className="w-full hover:bg-teal-500 hover:text-white px-4 py-2 flex items-center gap-2 text-[#8aa0bc] rounded-r-lg text-xs text-left transition-colors" onClick={() => setActiveTab("AI CargoMate Chatbot")} >
//               AI CargoMate Chatbot</button> */}

//           {sidebarSections.map((section) => (
//             <div key={section.title} className="  ">
//               <p
//                 onClick={() => {
//                   if (section.items.length === 0) {
//                     if (profileMode) { navigate("/user-dashboard", { state: { activeTab: section.title } }); return; }
//                     setActiveTab(section.title);
//                   }
//                 }}
//                 className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
//                     ${section.items.length === 0 && activeTab === "AI CargoMate Assistant" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
//                   `}
//               >
//                 {section.title}
//               </p>
//               {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
//                 <button
//                   key={label}
//                   className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
//                     ${
//                       activeTab === label
//                         ? "bg-teal-500 text-white rounded-r-lg "
//                         : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
//                     }`}
//                   onClick={() => {
//                     if (profileMode) { navigate("/user-dashboard", { state: { activeTab: label } }); return; }
//                     setActiveTab(label);
//                     setSidebarOpen(false);
//                   }}
//                 >
//                   <div className=" flex gap-3 px-4 py-2">
//                     <Icon className="text-base  flex-shrink-0" />
//                     <span className="flex-1 font-normal text-xs  truncate  ">
//                       {label}
//                     </span>
//                     {badge && (
//                       <span
//                         className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
//                       >
//                         {badge}
//                       </span>
//                     )}
//                   </div>
//                 </button>
//               ))}
//             </div>
//           ))}
//           <SidebarQuota
//             data={quotaData}
//             onUpgrade={() => profileMode ? navigate("/user-dashboard", { state: { activeTab: "UpgradePlan" } }) : setActiveTab("UpgradePlan")}
//           />
//         </nav>
//       </aside>

//       <main className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#f3f6fb]">
//         {!profileMode &&
//           !["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab) && (
//             <div
//               className="cm-module-shell cm-theme-intelligence mt-3"
//               key={`user-header-${activeTab}`}
//             >
//               <ModuleHero title={activeTab} role="user" />
//             </div>
//           )}
//         <div
//           className={
//             ["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab)
//               ? ""
//               : "cm-workspace cm-theme-intelligence"
//           }
//         >
//           {profileMode ? (
//             <AccountProfile embedded />
//           ) : (
//             <>
//               {activeTab === "Submitted Shipments" && (
//                 <SubmittedShipmentsTable
//                   shipments={submittedShipments}
//                   loading={shipmentsLoading}
//                   error={shipmentsError}
//                   onRefresh={fetchSubmittedShipments}
//                 />
//               )}
//               {activeTab === "AI Chatbot" && (
//                 <FeatureQuotaGate
//                   feature="aiChatbot"
//                   data={quotaData}
//                   onUpgrade={() => setActiveTab("UpgradePlan")}
//                 >
//                   {" "}
//                   <Chatbot />{" "}
//                 </FeatureQuotaGate>
//               )}
//               {activeTab === "AI CargoMate Assistant" && (
//                 <AiCargoMateAssistant />
//               )}

//               {activeTab === "HS Code Lookup" && (
//                 <FeatureQuotaGate
//                   feature="hsLookup"
//                   data={quotaData}
//                   onUpgrade={() => setActiveTab("UpgradePlan")}
//                 >
//                   {" "}
//                   <HSCodeLookup />{" "}
//                 </FeatureQuotaGate>
//               )}
//               {activeTab === "Incentive Checker" && (
//                 <FeatureQuotaGate
//                   feature="incentiveChecker"
//                   data={quotaData}
//                   onUpgrade={() => setActiveTab("UpgradePlan")}
//                 >
//                   {" "}
//                   <IncentiveChecker />{" "}
//                 </FeatureQuotaGate>
//               )}
//               {activeTab === "Shipment Planning" && (
//                 <FeatureQuotaGate
//                   feature="shipmentPlanning"
//                   data={quotaData}
//                   onUpgrade={() => setActiveTab("UpgradePlan")}
//                 >

//                   <ShipmentPlanning
//                     setActiveTab={setActiveTab}
//                     activeTab={activeTab}
//                     setShipment={setShipment}
//                   />
//                   {shipment === "shipment" && (
//                     <div className="mt-4">
//                 <Shipment
//   accountType="user"
//   isAdmin={false}
//   setActiveTab={setActiveTab}
//   setShipment={setShipment}
//   currentTab="Shipment Planning"
//   onSaved={() => {
//     setShipment("");
//     setActiveTab("Submitted Shipments");
//   }}
// />
//                     </div>
//                   )}
//                 </FeatureQuotaGate>
//               )}
//               {activeTab === "Freight Calculator" && <FreightCalculator />}

//               {activeTab === "Saved" && <Saved />}
//               {/* {activeTab === "Audit Logs" && <AuditLogs />}
//         {activeTab === "Analytics & Trends" && <AnalyticsTrends />} */}
//               {activeTab === "AI CargoMate Chatbot" && <Chatbot />}

//               {activeTab === "Subscription" && (
//                 <Subscription
//                   onChangePlan={() => setActiveTab("UpgradePlan")}
//                 />
//               )}
//               {activeTab === "Notifications" && <NotificationDashboard />}
//               {activeTab === "Help & Support" && <HelpSupportDashboard />}
//               {/* {activeTab === "Profile Settings" && <ProfileSettingsDashboard />} */}

//               {activeTab === "UpgradePlan" && <UpgradePlan />}
//             </>
//           )}

//           {showNotifications && (
//             <NotificationsModal onClose={() => setShowNotifications(false)} />
//           )}
//           {showMessages && (
//             <MessagesModal onClose={() => setShowMessages(false)} />
//           )}

//           {auditLogs && (
//             <AuditLogSettingsModal onClose={() => setAuditLogs(false)} />
//           )}
//         </div>
//       </main>
//     </div>
//   );
// }

import ModuleHero from "../../components/ModuleHero";
import { usePublicConfig } from "../../../lib/publicConfig";
import FeatureQuotaGate, {
  useSubscriptionQuotas,
  SidebarQuota,
} from "../../components/FeatureQuotaGate";
import AIQuerySidebarStatus from "../../components/AIQuerySidebarStatus";
import AccountProfile, {
  AccountBadge,
} from "../../../components/AccountProfile";
import React, { useState, useRef, useEffect } from "react";
import DashboardAdPlacement from "../../components/DashboardAdPlacement";
import logo from "../../assets/Images/logo.png";
import axios from "axios";
import { getMyShipments, getShipmentDetails } from "../../services/shipmentApi";
// import { FiAlertCircle } from "react-icons/fi";

import { FaRupeeSign } from "react-icons/fa";

import {
  FiX,
  FiAlertTriangle,
  FiEdit3,
  FiLink2,
  FiArrowLeft,
  FiSave,
  FiDownload,
  FiPlus,
  FiInfo,
  FiCopy,
  FiStar,
  FiDatabase,
  FiAlertCircle,
  FiAnchor,
  FiCpu,
  FiHash,
  FiGift,
  FiTruck,
  FiMap,
  FiPackage,
  FiRadio,
  FiFileText,
  FiUsers,
  FiBookmark,
  FiClipboard,
  FiBarChart2,
  FiCreditCard,
  FiBell,
  FiHelpCircle,
  FiSettings,
  FiChevronRight,
  FiShare2,
  FiSend,
  FiCheck,
  FiClock,
  FiDollarSign,
  FiAward,
  FiShoppingCart,
  FiFolder,
  FiPercent,
  FiZap,
  FiEye,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
  FiChevronDown,
  FiUploadCloud,
  FiWifi,
  FiMapPin,
  FiPhone,
  FiSearch,
  FiMail,
  FiSun,
  FiRefreshCw,
} from "react-icons/fi";
import Shipment from "../../components/ShipmentForm";
import calculator from "../../assets/Images/webp/calculator.webp";
import checker from "../../assets/Images/webp/checker.webp";
import shipment from "../../assets/Images/webp/shipment.webp";
import Chatbot from "../../components/Chatbot";

import { BsAirplane } from "react-icons/bs";
import { MdOutlineRocketLaunch } from "react-icons/md";
import HSCodeLookup from "./HsCodeLookUp";
import IncentiveChecker from "./IncentiveChecker";
import ShipmentPlanning from "./ShipmentPlanning";
import FreightCalculator from "./FreightCalculator";
import AiCargoMateAssistant from "./AiCargoMateAssistant";

import robot from "../../assets/Images/webp/robot.webp";

import {
  MdMenu,
  MdLocalShipping,
  MdDescription,
  MdPsychology,
  MdPayments,
  MdDoubleArrow,
  MdBolt,
  MdAdd,
  MdForum,
  MdCloudUpload,
  MdMyLocation,
  MdCalculate,
  MdSavings,
  MdHelp,
  MdDownload,
  MdTrendingFlat,
  MdCheckCircle,
  MdStorage,
  MdApi,
  MdSync,
  MdDashboard,
  MdSettings,
  MdArrowUpward,
  MdQrCode2,
  MdCheckroom,
  MdPerson,
} from "react-icons/md";

import { FaAnchor, FaShip } from "react-icons/fa";

import { MdMonitor } from "react-icons/md";

import SavedReports from "./SavedReport";
import Saved from "./Saved";

import AuditLogs from "./AuditLogs";
import AnalyticsTrends from "./Analysis&Trends";

import UpgradePlan from "./UpgradePlan";
import Subscription from "./Subscription";
import NotificationDashboard from "./Notification";
import HelpSupportDashboard from "./Help&Support";
import NoticeBanner from "../../components/NoticeBanner";
import ProfileSettingsDashboard from "./ProfileSettings";
import { useNavigate, useLocation } from "react-router-dom";
import MessagesModal from "../../components/Messages";
import NotificationsModal from "../../components/Notifications";
import FreightCalculatorModal from "../../components/FreightCalculator";
import IncentivesCheckerModal from "../../components/IncentiveChecker";
import TrackShipmentModal from "../../components/userComponent/TrackShipment";
import UploadDocumentationModal from "../../components/userComponent/UploadDocumentation";
import EditAdditionalInformation from "../../components/userComponent/EditAdditionalInformation";
import EditGoodsInformation from "../../components/userComponent/EditGoodsInformation";
import EditPartiesInformation from "../../components/userComponent/EditPartiesInformation";
import BookShipment from "../../components/userComponent/BookShipment";
import TrackShipment from "../../components/userComponent/TrackShipment";
import FullDisclaimer from "../../components/userComponent/FullDisclaimer";
import RiskInsights from "../../components/userComponent/RiskInsights";
import SharePlan from "../../components/userComponent/SharePlan";
import CertificateOfOrigin from "../../components/userComponent/CertificateOfOrigin";
import NewQueryModal from "../../components/userComponent/NewQuery";
import ViewTradeInformation from "../../components/userComponent/ViewTradeInformation";
import ViewShipmentEligibility from "../../components/userComponent/ViewShipmentEligibility";
import VendorInsightsDetailedAnalytics from "../../components/userComponent/VendorInsightDetailAnalytics";
import ShareReportModal from "../../components/userComponent/ShareReport";
import SaveReportModal from "../../components/userComponent/SaveReport";
import ResultSummaryModal from "../../components/userComponent/ResultSummary";
import PartnerAnalysis from "../../components/userComponent/PartnerAnalysis";
import FiltersModal from "../../components/userComponent/Filters";
import DownloadReportModal from "../../components/userComponent/DownloadReport";
import DataSourceModal from "../../components/userComponent/DataSource";
import AuditLogSettingsModal from "../../components/userComponent/AuditLogSettings";
import AllDecliningCountriesModal from "../../components/userComponent/AllDecliningCountries";

import AllPortsOfArrivalModal from "../../components/userComponent/AllPortsOfArrival";

import AISmartSummary from "../../components/userComponent/AiSmartSummary";
import UploadDocumentModal from "../../components/userComponent/UploadDocument";
import AllDocumentsTemplateModal from "../../components/userComponent/AllDocumentTemplate";
import CostBreakdownModal from "../../components/userComponent/CostBreakDown";
import FullRouteScheduleModal from "../../components/userComponent/FullRouteSchedule";
import InsightsModal from "../../components/userComponent/Insights";
import WeightVolumeSummaryModal from "../../components/userComponent/WeightVolumeSummary";

import FullDocumentsModal from "../../components/userComponent/FullDocument";

import StorageDetailsModal from "../../components/userComponent/StorageDetails";

const C = {
  primary: "#00685f",
  secondary: "#006398",
  tertiary: "#a33900",
  bg: "#f8f9ff",
  surface: "#f8f9ff",
  onSurface: "#0d1c2e",
  onSurfaceVariant: "#3d4947",
  outlineVariant: "#bcc9c6",
  scLowest: "#ffffff",
  scLow: "#eff4ff",
  sc: "#e6eeff",
  scHigh: "#dce9ff",
  scHighest: "#d5e3fc",
  error: "#ba1a1a",
  errorContainer: "#ffdad6",
  tertiaryFixed: "#ffdbce",
  tertiaryContainer: "#cc4900",
  primaryFixed: "#89f5e7",
  secondaryFixed: "#cce5ff",
};

function StatCard({ label, value, change, iconBg, icon: Icon, iconColor }) {
  return (
    <div
      className=" flex-1 min-w-0 p-3 rounded-xl border shadow-sm"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex justify-between items-start mb-2">
        <span
          className="text-sm  font-semibold  leading-4"
          // style={{ color: C.onSurfaceVariant }}
        >
          {label}
        </span>
      </div>
      <div className="flex justify-between " style={{ color: C.onSurface }}>
        <div className="text-2xl font-bold  "> {value}</div>
        <div className="p-1 rounded-lg" style={{ backgroundColor: iconBg }}>
          <Icon size={22} style={{ color: iconColor }} />
        </div>
      </div>
      <div className="flex items-center gap-1 mt-1 text-[#00A63E]">
        <MdArrowUpward size={10} className="" />
        <span className="text-[10px] font-normal">{change}</span>
      </div>
    </div>
  );
}

function QuickActionBtn({ id, icon: Icon, label, bgcolor, textColor }) {
  const [active, setActive] = useState("");

  return (
    <>
      <button
        className="flex flex-col items-center gap-1 group"
        style={{ backgroundColor: bgcolor }}
      >
        <div
          onClick={() => setActive(id)}
          className="w-full  aspect-square rounded-xl flex  flex-col items-center justify-center transition-colors"
        >
          <Icon size={24} style={{ color: textColor }} />
          <span className="text-[10px] text-center font-bold px-2 py-1 rounded-md">
            {label}
          </span>
        </div>
      </button>

      {active === "freight" && (
        <FreightCalculatorModal onClose={() => setActive(null)} />
      )}

      {active === "upload" && (
        <UploadDocumentationModal onClose={() => setActive(null)} />
      )}
      {active === "track" && (
        <TrackShipmentModal onClose={() => setActive(null)} />
      )}
      {active === "incentives" && (
        <IncentivesCheckerModal onClose={() => setActive(null)} />
      )}
    </>
  );
}

function ActivityItem({
  dotColor,
  iconBg,
  icon: Icon,
  iconColor,
  title,
  subtitle,
  time,
  tag,
}) {
  return (
    <div
      className="flex gap-3 sm:gap-4 pb-4 sm:px-0 px-5 relative items-center  justify-around"
      style={{ borderColor: C.outlineVariant }}
    >
      <div
        className="p-2  rounded-lg h-fit"
        style={{ backgroundColor: iconBg }}
      >
        {typeof Icon === "string" ? (
          <img src={Icon || null} alt="icon" className="w-5 h-5" />
        ) : (
          React.createElement(Icon, {
            size: 22,
            style: { color: iconColor },
          })
        )}
      </div>
      <div className="flex-1 justify-">
        <div className="font-normal text-sm" style={{ color: C.onSurface }}>
          {title}
        </div>
        {subtitle && (
          <p className="text-[11px]" style={{ color: C.onSurfaceVariant }}>
            {subtitle}
          </p>
        )}
        <div className="text-[10px] mt-1" style={{ color: C.onSurfaceVariant }}>
          {time}
        </div>
        {tag && (
          <div className="flex items-center gap-1 mt-1 text-[10px] font-bold text-[#00A63E]">
            <MdCheckCircle size={12} />
            {tag}
          </div>
        )}
      </div>
    </div>
  );
}

function DetailCard({ tag, title, children, setShipment, setActiveTab }) {
  const [active, setActive] = useState("");
  const [value, setValue] = useState("");

  return (
    <div
      className="p-4 rounded-xl border flex flex-col justify-between"
      style={{ backgroundColor: C.scLowest, borderColor: C.outlineVariant }}
    >
      <div className="flex flex-col    mb-4">
        <div className="flex  justify-between">
          <h4 className="text-sm font-bold">{title}</h4>
          <button className="text-[10px] font-bold uppercase text-[#00A896]">
            View All
          </button>
        </div>
        <div className="flex justify-start">
          <span className="text-[10px] font-bold uppercase text-[#94A3B8]">
            {tag}
          </span>
        </div>
      </div>
      <div>{children}</div>
      <div>
        <button
          onClick={() => {
            setShipment("shipment");
            setActiveTab("");
          }}
          className="w-full py-2 mb-2  font-bold rounded-lg text-[9px] text-white bg-[#0FB5A9]"
        >
          Create Shipment from this result
        </button>
        <button
          onClick={() => setActive("report")}
          className="w-full text-xs flex items-center text-[#2563EB] justify-center gap-2 font-bold  "
        >
          <MdDownload size={16} className="" /> Download Report (PDF)
        </button>
      </div>

      {active === "report" && (
        <DownloadReportModal
          onClose={() => setActive(null)}
          setValue={setValue}
          value={value}
        />
      )}
    </div>
  );
}

const sidebarSections = [
  {
    title: "AI & Trade Tools",
    items: [
      {
        icon: FiCpu,
        label: "AI Chatbot",
        badgeColor: "bg-teal-500",
      },
      {
        icon: FiCpu,
        label: "AI CargoMate Assistant",
        badge: "",
        badgeColor: "bg-teal-500",
      },
      { icon: FiHash, label: "HS Code Lookup" },
      { icon: FiGift, label: "Incentive Checker" },
      { icon: FiTruck, label: "Freight Calculator" },
      { icon: FiMap, label: "Shipment Planning" },
      {
        icon: FiBookmark,
        label: "Saved",
        // badge: "New",
        badgeColor: "bg-[#2B7FFF]",
      },
      // { icon: FiClipboard, label: "Audit Logs" },
      // { icon: FiBarChart2, label: "Analytics & Trends" },
    ],
  },
  // {
  //   title: "Reports & Insights",
  //   items: [
  //     {
  //       icon: FiBookmark,
  //       label: "Saved",
  //       // badge: "New",
  //       badgeColor: "bg-[#2B7FFF]",
  //     },
  //     // { icon: FiClipboard, label: "Audit Logs" },
  //     // { icon: FiBarChart2, label: "Analytics & Trends" },
  //   ],
  // },
  {
    title: "Shipments",
    items: [
      { icon: MdLocalShipping, label: "Submitted Shipments" },
    ],
  },
  {
    title: "Account & Support",
    items: [
      {
        icon: FiCreditCard,
        label: "Subscription",
        badge: undefined,
        badgeColor: "bg-[#00BBA7]",
      },
      {
        icon: FiBell,
        label: "Notifications",
        badge: "",
        badgeColor: "bg-red-500",
      },
      { icon: FiHelpCircle, label: "Help & Support" },
      // { icon: FiSettings, label: "Profile Settings" },
    ],
  },
];

function Field({ label, placeholder, select }) {
  return (
    <div>
      <label className="block text-sm font-semibold text-gray-900 mb-1.5">
        {label}
      </label>
      {select ? (
        <div className="relative">
          <select className="w-full appearance-none border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500">
            <option>{placeholder}</option>
          </select>
          <FiChevronDown
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            size={16}
          />
        </div>
      ) : (
        <input
          type="text"
          placeholder={placeholder}
          className="w-full border border-gray-200 rounded-lg px-3.5 py-2.5 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
      )}
    </div>
  );
}

function SectionCard({ number, title, subtitle, children }) {
  return (
    <div className="bg-white grid grid-cols-1 border border-gray-200 rounded-xl p-2 shadow-sm">
      <div className="flex items-center gap-2">
        <span className="w-5 h-5 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
          {number}
        </span>
        <h3 className="text-sm font-bold  text-gray-900">{title}</h3>
      </div>
      {subtitle && (
        <p className="text-xs text-gray-500 whitespace-nowrap mt-1 ml-7">
          {subtitle}
        </p>
      )}
      <div className="mt-4 space-y-4">{children}</div>
    </div>
  );
}

function Label({ children }) {
  return (
    <label className="block text-xs xl:text-[11px]  font-semibold text-gray-700 mb-1">
      {children}
      <span className="text-red-500 ml-0.5">*</span>
    </label>
  );
}

function Input({ label, placeholder, value, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs whitespace-nowrap font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        type="text"
        defaultValue={value}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}

function DateInput({ label }) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <input
          type="text"
          placeholder="Select date"
          className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <FiCalendar
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        />
      </div>
    </div>
  );
}

function Select({ label, placeholder, required = true }) {
  return (
    <div>
      {required ? (
        <Label>{label}</Label>
      ) : (
        <label className="block text-xs font-semibold text-gray-700 mb-1">
          {label}
        </label>
      )}
      <div className="relative">
        <select className="w-full appearance-none border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>{placeholder}</option>
        </select>
        <FiChevronDown
          size={14}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, defaultValue = "no" }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="flex items-center gap-4 mt-2">
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "yes"}
          />
          Yes
        </label>
        <label className="flex items-center gap-1.5 text-sm text-gray-700">
          <input
            type="radio"
            className="accent-blue-600"
            defaultChecked={defaultValue === "no"}
          />
          No
        </label>
      </div>
    </div>
  );
}

function Grid2({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{children}</div>
  );
}

const docTypes = [
  {
    label: "Commercial Invoice",
    icon: FiFileText,
    color: "text-blue-600 bg-blue-50",
  },
  {
    label: "Packing List",
    icon: FiClipboard,
    color: "text-orange-600 bg-orange-50",
  },
  { label: "MSDS", icon: FiAward, color: "text-purple-600 bg-purple-50" },
  { label: "COO", icon: FiAward, color: "text-green-600 bg-green-50" },
  { label: "IEC / GST", icon: FiCreditCard, color: "text-blue-600 bg-blue-50" },
  {
    label: "Purchase Order",
    icon: FiShoppingCart,
    color: "text-orange-600 bg-orange-50",
  },
  {
    label: "Product Certificate",
    icon: FiAward,
    color: "text-purple-600 bg-purple-50",
  },
  {
    label: "Other Documents",
    icon: FiFolder,
    color: "text-gray-500 bg-gray-100",
  },
];

const aiTopStats = [
  {
    label: "Suggested HS Code",
    value: "8517.12.00",
    color: "bg-blue-50 text-blue-700",
  },
  {
    label: "Required Documents",
    value: "7 Documents",
    color: "bg-green-50 text-green-700",
  },
  {
    label: "Freight Estimate",
    value: "₹24,860",
    color: "bg-orange-50 text-orange-700",
  },
  {
    label: "RoDTEP / Incentive",
    value: "Eligible (2.5%)",
    color: "bg-purple-50 text-purple-700",
  },
];

const aiBottomStats = [
  { label: "Compliance Requirements", value: "12", sub: "Requirements" },
  { label: "Risk Score", value: "Low Risk", sub: "(18/100)", green: true },
  { label: "Estimated Timeline", value: "8-10 Days" },
  { label: "Recommended Action", value: "Proceed with Booking", green: true },
];

const modals = [
  { key: "report", label: "Download Report" },
  { key: "freight", label: "Freight Calculator" },
  { key: "upload", label: "Upload Documentation" },
  { key: "track", label: "Track Shipment" },
  { key: "incentives", label: "Incentives Checker" },
];

const navItems = [
  { icon: MdDashboard, label: "Dashboard" },
  { icon: MdLocalShipping, label: "Shipments" },
  { icon: MdDescription, label: "Documents" },
  { icon: MdMonitor, label: "Analytics" },
  { icon: MdSettings, label: "Settings" },
];

const statCards = [
  {
    label: "Active Shipments",
    value: "18",
    change: "12% vs last month",
    iconBg: C.scHigh,
    icon: MdLocalShipping,
    iconColor: C.primary,
  },
  {
    label: "Pending Docs",
    value: "7",
    change: "8% vs last month",
    iconBg: C.tertiaryFixed,
    icon: MdDescription,
    iconColor: C.tertiary,
  },
  {
    label: "AI Queries Left",
    value: "42/100",
    change: "8% vs last month",
    iconBg: C.scHighest,
    icon: MdPsychology,
    iconColor: C.secondary,
  },
  {
    label: "Incentives",
    value: "₹86,420",
    change: "10% vs last month",
    iconBg: C.primaryFixed,
    icon: MdPayments,
    iconColor: C.primary,
  },
];

const quickActions = [
  // {
  //   id: "shipment",
  //   icon: MdAdd,
  //   label: "Create Shipment",
  //   bgcolor: "#F0FDFA",
  //   textColor: "#00A896",
  // },
  {
    id: "cargo",
    icon: MdForum,
    label: "Ask CargoMate",
    bgcolor: "#F0FDFA",
    textColor: "#2563EB",
  },
  {
    id: "upload",
    icon: MdCloudUpload,
    label: "Upload Docs",
    bgcolor: "#FFF7ED",
    textColor: "#F97316",
  },
  {
    id: "track",
    icon: MdMyLocation,
    label: "Track Shipment",
    bgcolor: "#F0FDFA",
    textColor: "#4F46E5",
  },
  {
    id: "freight",
    icon: MdCalculate,
    label: "Freight Calculation",
    bgcolor: "#F0FDFA",
    textColor: "#0891B2",
  },
  {
    id: "incentives",
    icon: MdSavings,
    label: "Incentive Checker",
    bgcolor: "#FDF2F8",
    textColor: "#DB2777",
  },
];

const shipments = [
  {
    id: "AS0-2025-104",
    route: "Nhava Sheva - Dubai",
    status: "Transit",
    statusBg: C.scHigh,
    statusColor: C.secondary,
    eta: "29 Apr 2025",
    mode: "Sea",
    vendor: "Oceanic Logistics",
    amount: "₹1,24,860",
  },
  {
    id: "ASD-2025-103",
    route: "Delhi - New York",
    status: "Delayed",
    statusBg: C.errorContainer,
    statusColor: C.error,
    eta: "27 Apr 2025",
    mode: "Air",
    vendor: "SkyFreight Global",
    amount: "₹2,48,600",
  },
  {
    id: "ASD-2025-102",
    route: "Mumbai - London",
    status: "Pending",
    statusBg: C.tertiaryFixed,
    statusColor: C.tertiary,
    eta: "30 Apr 2025",
    mode: "Sea",
    vendor: "SwiftLogix",
    amount: "₹98,450",
  },
  {
    id: "ASD-2025-101",
    route: "Mumbai - London",
    status: "Delivered",
    statusBg: C.tertiaryFixed,
    statusColor: C.tertiary,
    eta: "30 Apr 2025",
    mode: "Sea",
    vendor: "SwiftLogix",
    amount: "₹98,450",
  },
];

const formatShipmentDate = (date) => {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "—";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};


function SubmittedShipmentsTable({ shipments, loading, error, onRefresh }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedShipment, setSelectedShipment] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState("");
  const [documentPreview, setDocumentPreview] = useState(null);

  const getValue = (...values) =>
    values.find((value) => value !== undefined && value !== null && String(value).trim() !== "") ?? "-";

  const getRoute = (item = {}) => {
    const route = item.route && typeof item.route === "object" ? item.route : {};
    const origin = [route.originCity || item.originCity, route.originCountry || item.originCountry]
      .filter(Boolean).join(", ");
    const destination = [route.destinationCity || item.destinationCity, route.destinationCountry || item.destinationCountry]
      .filter(Boolean).join(", ");
    return { origin: origin || "-", destination: destination || "-" };
  };

  const formatDate = (value) => {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime())
      ? "—"
      : date.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
  };

  const getStatus = (item) => getValue(item.shipmentStatus, item.status, item.workflowStatus, "Submitted");
  const getReference = (item) => getValue(item.referenceNumber, item.sbNumber, item.shipmentNumber, item.bookingNo, item._id);
  const getMode = (item) => getValue(item.shipmentMode, item.route?.mode, item.transportMode);
  const getCommodity = (item) => getValue(item.cargo?.commodity, item.cargo?.productName, item.commodity, item.goodsDescription, item.cargo?.description);
  const getValueLabel = (item) => {
    const amount = item.cargo?.value ?? item.cargoValue ?? item.shipmentValue ?? item.value;
    if (amount === undefined || amount === null || amount === "") return "—";
    const currency = item.cargo?.currency || item.currency || "INR";
    return `${currency} ${Number(amount).toLocaleString("en-IN")}`;
  };

  const statusClass = (status) => {
    const normalized = String(status).toLowerCase();
    if (["approved", "delivered", "completed"].includes(normalized)) return "bg-emerald-50 text-emerald-700 ring-emerald-600/15";
    if (["rejected", "delayed", "exception"].includes(normalized)) return "bg-rose-50 text-rose-700 ring-rose-600/15";
    if (["in transit", "transit"].includes(normalized)) return "bg-sky-50 text-sky-700 ring-sky-600/15";
    if (["under review", "pending review", "submitted", "pending", "on hold"].includes(normalized)) return "bg-amber-50 text-amber-700 ring-amber-600/15";
    return "bg-slate-100 text-slate-600 ring-slate-500/10";
  };

  const openShipmentDetails = async (shipment) => {
    const shipmentId = shipment?._id || shipment?.id;
    setSelectedShipment(shipment);
    setDetailsError("");
    if (!shipmentId) {
      setDetailsError("Shipment ID is missing. Unable to load complete details.");
      return;
    }
    setDetailsLoading(true);
    try {
      const response = await getShipmentDetails(shipmentId);
      const payload = response?.data?.data ?? response?.data?.shipment ?? response?.data ?? shipment;
      setSelectedShipment(payload?.shipment ?? payload);
    } catch (requestError) {
      console.error("Error fetching shipment details:", requestError);
      setDetailsError(requestError?.response?.data?.message || "Unable to load complete shipment details. Please try again.");
    } finally {
      setDetailsLoading(false);
    }
  };

  const closeShipmentDetails = () => {
    setSelectedShipment(null);
    setDetailsError("");
    setDetailsLoading(false);
  };

  const detailLabel = (key) => String(key)
    .replace(/([A-Z])/g, " $1")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

  const hiddenAuditKeys = new Set([
    "_id", "__v", "id", "createdAt", "updatedAt", "createdBy",
    "updatedBy", "updateBy", "lastUpdatedBy", "modifiedBy",
    "createdByName", "updatedByName", "updateByName",
    "lastUpdatedByName", "modifiedByName", "update by", "updated by",
    "last updated by", "modified by", "created by",
  ]);

  // Shipment documents are stored in the ShipmentDocument collection.
  // The API returns records shaped like: { documentName, fileName, fileUrl, status }.
  const getApiOrigin = () => {
    const configured = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_BASE_URL || "";
    if (!configured) return window.location.origin;
    try {
      const parsed = new URL(configured, window.location.origin);
      return parsed.origin;
    } catch {
      return window.location.origin;
    }
  };

  const getDocumentUrl = (fileUrl) => {
    if (!fileUrl || typeof fileUrl !== "string") return "";
    const raw = fileUrl.trim().replace(/\\/g, "/");
    if (/^(https?:|blob:|data:)/i.test(raw)) return raw;

    // Backend stores the path as /uploads/documents/<generated filename>.
    const normalizedPath = raw.startsWith("/")
      ? raw
      : raw.startsWith("uploads/")
        ? `/${raw}`
        : raw.startsWith("documents/")
          ? `/uploads/${raw}`
          : `/uploads/documents/${raw}`;

    return `${getApiOrigin()}${normalizedPath}`;
  };

  const getDocumentMeta = (document, index = 0) => {
    if (typeof document === "string") {
      const url = getDocumentUrl(document);
      return {
        url,
        name: decodeURIComponent(document.split("/").pop()?.split("?")[0] || `Document ${index + 1}`),
        type: "",
        status: "Uploaded",
      };
    }

    const fileUrl =
      document?.fileUrl ||
      document?.resolvedFileUrl ||
      document?.url ||
      document?.documentUrl ||
      document?.path ||
      document?.filePath ||
      "";

    return {
      url: getDocumentUrl(fileUrl),
      name: document?.fileName || document?.originalName || document?.originalname ||
        document?.documentName || document?.name || `Document ${index + 1}`,
      type: document?.documentType || "",
      status: document?.status || "Uploaded",
      size: document?.fileSize || "",
    };
  };

  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState("");
  const [previewObjectUrl, setPreviewObjectUrl] = useState("");

  useEffect(() => () => {
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
  }, [previewObjectUrl]);

  const closeDocumentPreview = () => {
    if (previewObjectUrl) URL.revokeObjectURL(previewObjectUrl);
    setPreviewObjectUrl("");
    setDocumentPreview(null);
    setPreviewError("");
    setPreviewLoading(false);
  };

  const openDocumentPreview = async (document, index = 0) => {
    const meta = getDocumentMeta(document, index);
    if (!meta.url) {
      setPreviewError("Document URL is missing in the saved document record.");
      setDocumentPreview({ ...meta, type: "other" });
      return;
    }

    const extension = (meta.name || meta.url).split("?")[0].split(".").pop().toLowerCase();
    const type = ["png", "jpg", "jpeg", "webp", "gif"].includes(extension)
      ? "image"
      : extension === "pdf" ? "pdf" : "other";

    setDocumentPreview({ ...meta, type });
    setPreviewError("");
    setPreviewLoading(true);

    try {
      // Fetch as a Blob so preview/download works with authenticated API setups too.
      const response = await axios.get(meta.url, {
        responseType: "blob",
        withCredentials: true,
      });
      const blob = response.data instanceof Blob
        ? response.data
        : new Blob([response.data], { type: response.headers?.["content-type"] });
      const objectUrl = URL.createObjectURL(blob);
      setPreviewObjectUrl(objectUrl);
      setDocumentPreview((current) => current ? { ...current, previewUrl: objectUrl } : current);
    } catch (error) {
      console.error("SHIPMENT DOCUMENT PREVIEW ERROR:", error);
      setPreviewError(
        error?.response?.status === 404
          ? "File not found on the server. The saved file path may be incorrect."
          : error?.response?.status === 401 || error?.response?.status === 403
            ? "You are not authorized to open this document. Please sign in again."
            : "Unable to load this file from the backend. Check the backend URL and uploads static route."
      );
    } finally {
      setPreviewLoading(false);
    }
  };

  const downloadDocument = async (document, index = 0) => {
    const meta = getDocumentMeta(document, index);
    if (!meta.url) {
      window.alert("Document URL is missing in the saved document record.");
      return;
    }
    try {
      const response = await axios.get(meta.url, {
        responseType: "blob",
        withCredentials: true,
      });
      const blob = response.data instanceof Blob
        ? response.data
        : new Blob([response.data], { type: response.headers?.["content-type"] });
      const objectUrl = URL.createObjectURL(blob);
      const anchor = window.document.createElement("a");
      anchor.href = objectUrl;
      anchor.download = meta.name || `shipment-document-${index + 1}`;
      window.document.body.appendChild(anchor);
      anchor.click();
      anchor.remove();
      URL.revokeObjectURL(objectUrl);
    } catch (error) {
      console.error("SHIPMENT DOCUMENT DOWNLOAD ERROR:", error);
      window.alert(
        error?.response?.data?.message ||
        "Download failed. Please verify that the backend file URL is accessible."
      );
    }
  };

  const renderDocument = (document, index = 0) => {
    const meta = getDocumentMeta(document, index);
    const extension = (meta.name || meta.url).split("?")[0].split(".").pop().toLowerCase();
    const isImage = ["png", "jpg", "jpeg", "webp", "gif"].includes(extension);
    const isPdf = extension === "pdf";

    return (
      <div key={document?._id || `${meta.name}-${index}`}
        className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${isImage ? "bg-violet-50 text-violet-700" : isPdf ? "bg-rose-50 text-rose-700" : "bg-blue-50 text-blue-700"}`}>
          <FiFileText size={21} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="break-words text-sm font-bold text-slate-800">{meta.name}</p>
          <div className="mt-1 flex flex-wrap items-center gap-2 text-[11px] text-slate-500">
            {meta.type && <span>{meta.type}</span>}
            <span className="rounded-full bg-emerald-50 px-2 py-0.5 font-semibold text-emerald-700">{meta.status}</span>
            {meta.size && <span>{Number(meta.size) > 1024 ? `${(Number(meta.size) / 1024).toFixed(1)} KB` : `${meta.size} bytes`}</span>}
          </div>
        </div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => openDocumentPreview(document, index)}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-3.5 py-2.5 text-xs font-bold text-teal-800 transition hover:bg-teal-100">
            <FiEye size={14} /> Preview
          </button>
          <button type="button" onClick={() => downloadDocument(document, index)}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-700 px-3.5 py-2.5 text-xs font-bold text-white transition hover:bg-teal-800">
            <FiDownload size={14} /> Download
          </button>
        </div>
      </div>
    );
  };

  const renderDocumentsSection = (documents) => {
    const list = Array.isArray(documents)
      ? documents
      : documents && typeof documents === "object"
        ? Object.values(documents)
        : [];
    const validDocuments = list.filter((item) => {
      if (typeof item === "string") return Boolean(item);
      return Boolean(item?.fileUrl || item?.resolvedFileUrl || item?.url || item?.documentUrl || item?.path || item?.filePath);
    });

    // return (
    //   <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
    //     <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
    //       <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">5</span>
    //       <div>
    //         <h4 className="text-sm font-bold text-slate-900">5. Documents Uploaded</h4>
    //         <p className="mt-0.5 text-[10px] text-slate-500">Preview or download files attached to this shipment</p>
    //       </div>
    //       <span className="ml-auto rounded-full bg-teal-50 px-2.5 py-1 text-[10px] font-bold text-teal-700">{validDocuments.length} file(s)</span>
    //     </div>
    //     <div className="space-y-3 p-4 sm:p-5">
    //       {validDocuments.length ? validDocuments.map((doc, index) => renderDocument(doc, index)) : (
    //         <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 px-4 py-8 text-center">
    //           <FiFolder className="mx-auto text-slate-400" size={25} />
    //           <p className="mt-2 text-sm font-semibold text-slate-700">No uploaded documents found</p>
    //           <p className="mt-1 text-xs text-slate-500">Documents will appear here after they are uploaded successfully.</p>
    //         </div>
    //       )}
    //     </div>
    //   </section>
    // );
  };

  const renderDetailValue = (value, key = "") => {
    if (value === null || value === undefined || value === "") {
      return <span className="text-slate-400">Not provided</span>;
    }
    if (typeof value === "boolean") return value ? "Yes" : "No";


    if (Array.isArray(value)) {
      if (!value.length) return <span className="text-slate-400">No records</span>;
      return (
        <div className="space-y-2">
          {value.map((entry, index) => (
            <div key={entry?._id || entry?.id || index} className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              {renderDetailValue(entry, key)}
            </div>
          ))}
        </div>
      );
    }

    if (typeof value === "object") {
      const meta = getDocumentMeta(value, key);
      const looksLikeDocument = /document|file|upload|attachment/i.test(key) ||
        Boolean(value.fileUrl || value.filePath || value.documentUrl || value.documentPath);
      if (looksLikeDocument && meta.url) return renderDocument(value, key);

      const entries = Object.entries(value).filter(([childKey, childValue]) =>
        !hiddenAuditKeys.has(childKey) &&
        childValue !== undefined && childValue !== null && childValue !== ""
      );
      if (!entries.length) return <span className="text-slate-400">Not provided</span>;
      return (
        <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
          {entries.map(([childKey, childValue]) => (
            <div key={childKey} className="min-w-0">
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-slate-400">{detailLabel(childKey)}</p>
              <div className="break-words text-[13px] font-medium leading-5 text-slate-700">{renderDetailValue(childValue, childKey)}</div>
            </div>
          ))}
        </div>
      );
    }

    if (/date|etd|eta|atd|dateof/i.test(key)) {
      const parsed = new Date(value);
      if (!Number.isNaN(parsed.getTime())) return formatDate(value);
    }
    return String(value);
  };

  const renderDetailSection = (title, data, icon = FiFileText, number = "") => {
    if (!data || typeof data !== "object") return null;
    const excluded = [...hiddenAuditKeys, "documents", "shipmentDocuments", "attachments"];
    const entries = Object.entries(data).filter(([key, value]) =>
      !excluded.includes(key) && value !== undefined && value !== null && value !== ""
    );
    if (!entries.length) return null;
    const Icon = icon;
    return (
      <section className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 bg-slate-50/70 px-4 py-3 sm:px-5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white">{number || <Icon size={14} />}</span>
          <div className="min-w-0">
            <h4 className="text-sm font-bold text-slate-900">{title}</h4>
            <p className="mt-0.5 text-[10px] text-slate-500">Shipment form details · Read only</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-x-5 gap-y-4 p-4 sm:grid-cols-2 sm:p-5 lg:grid-cols-3">
          {entries.map(([key, value]) => {
            const nested = value && typeof value === "object";
            return (
              <div key={key} className={`min-w-0 ${nested ? "sm:col-span-2 lg:col-span-3" : ""}`}>
                <label className="mb-1.5 block text-[11px] font-semibold text-slate-600">{detailLabel(key)}</label>
                <div className={`min-h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2.5 text-[13px] leading-5 text-slate-800 ${nested ? "bg-white" : "break-words"}`}>
                  {renderDetailValue(value, key)}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  };

  const statuses = ["All", ...new Set(shipments.map((item) => String(getStatus(item))))];
  const filtered = shipments.filter((item) => {
    const route = getRoute(item);
    const query = search.toLowerCase();
    const matchesSearch = [getReference(item), route.origin, route.destination, getCommodity(item), getMode(item), getStatus(item)]
      .join(" ").toLowerCase().includes(query);
    return matchesSearch && (statusFilter === "All" || getStatus(item) === statusFilter);
  });

  const approvedCount = shipments.filter((item) => ["approved", "delivered", "completed"].includes(String(getStatus(item)).toLowerCase())).length;
  const pendingCount = shipments.filter((item) => ["submitted", "pending", "pending review", "under review"].includes(String(getStatus(item)).toLowerCase())).length;

  return (
    <div className="min-h-full bg-[#f5f8fa] px-3 py-5 sm:px-6 sm:py-7 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-teal-100 bg-white px-3 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-teal-700 shadow-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" /> Shipment workspace
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-[30px]">Submitted Shipments</h2>
            <p className="mt-1.5 max-w-xl text-sm leading-6 text-slate-500">A clear view of every shipment you have submitted, with status and complete shipment information.</p>
          </div>
          <button type="button" onClick={onRefresh} disabled={loading}
            className="inline-flex h-10 items-center justify-center gap-2 self-start rounded-xl border border-slate-200 bg-white px-4 text-xs font-semibold text-slate-700 shadow-sm transition hover:border-teal-200 hover:bg-teal-50 hover:text-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:self-auto">
            <FiRefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh list
          </button>
        </div>

        {/* Summary strip */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
            <div className="flex items-center justify-between">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Total shipments</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{shipments.length}</p></div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-700"><FiPackage size={20} /></span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
            <div className="flex items-center justify-between">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">In review</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{pendingCount}</p></div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600"><FiClock size={20} /></span>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-2xl border border-emerald-100 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)]">
            <div className="flex items-center justify-between">
              <div><p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-slate-400">Approved / completed</p><p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">{approvedCount}</p></div>
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><FiCheckCircle size={20} /></span>
            </div>
          </div>
        </div>

        {/* Table panel */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.045)]">
          <div className="flex flex-col gap-4 border-b border-slate-100 px-5 py-5 lg:flex-row lg:items-center lg:justify-between sm:px-6">
            <div>
              <h3 className="text-base font-bold tracking-tight text-slate-900">Shipment overview</h3>
              <p className="mt-1 text-xs text-slate-500">Showing <span className="font-semibold text-slate-700">{filtered.length}</span> of {shipments.length} shipments</p>
            </div>
            <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto">
              <div className="relative flex-1 sm:w-64">
                <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by ID, route, commodity..."
                  className="h-10 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-xs text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10" />
              </div>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}
                className="h-10 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-600 outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10">
                {statuses.map((status) => <option key={status} value={status}>{status === "All" ? "All statuses" : status}</option>)}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center px-5 py-20">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"><FiRefreshCw className="animate-spin" size={21} /></span>
              <p className="mt-4 text-sm font-semibold text-slate-700">Loading your shipments</p>
              <p className="mt-1 text-xs text-slate-400">Please wait while we fetch the latest information.</p>
            </div>
          ) : error ? (
            <div className="px-5 py-16 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-rose-50 text-rose-600"><FiAlertTriangle size={21} /></span>
              <p className="mt-3 text-sm font-semibold text-slate-800">We couldn't load your shipments</p>
              <p className="mt-1 text-xs text-slate-500">{error}</p>
              <button onClick={onRefresh} className="mt-4 rounded-xl bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-teal-700">Try again</button>
            </div>
          ) : filtered.length === 0 ? (
            <div className="px-5 py-16 text-center">
              <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400"><MdLocalShipping size={26} /></span>
              <p className="mt-4 text-sm font-semibold text-slate-800">{shipments.length ? "No matching shipments" : "No submitted shipments yet"}</p>
              <p className="mt-1 text-xs text-slate-500">{shipments.length ? "Try changing your search or status filter." : "Your submitted shipments will appear here once available."}</p>
              {(search || statusFilter !== "All") && <button onClick={() => { setSearch(""); setStatusFilter("All"); }} className="mt-3 text-xs font-semibold text-teal-700 hover:text-teal-900">Clear filters</button>}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1210px] text-left">
                <thead className="bg-[#f8fafb]">
                  <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                    <th className="px-5 py-4">Shipment</th>
                    <th className="px-5 py-4">Route</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">ETD / ATD</th>
                    <th className="px-5 py-4">ETA</th>
                    <th className="px-5 py-4">Mode</th>
                    <th className="px-5 py-4">Commodity</th>
                    <th className="px-5 py-4 text-right">Cargo value</th>
                    <th className="px-5 py-4 text-right"> </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filtered.map((item) => {
                    const status = getStatus(item);
                    const route = getRoute(item);
                    return (
                      <tr key={item._id || getReference(item)} className="group transition-colors hover:bg-[#f8fcfb]">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-teal-700 transition group-hover:bg-teal-100"><FiPackage size={16} /></span>
                            <div className="min-w-0"><p className="whitespace-nowrap text-xs font-bold text-slate-800">{getReference(item)}</p><p className="mt-1 text-[10px] text-slate-400">Shipment reference</p></div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex min-w-[190px] items-center gap-2">
                            <div className="min-w-0"><p className="max-w-[125px] truncate text-xs font-semibold text-slate-700">{route.origin}</p><p className="mt-1 text-[10px] text-slate-400">Origin</p></div>
                            <span className="h-px w-7 shrink-0 bg-slate-300" />
                            <div className="min-w-0"><p className="max-w-[125px] truncate text-xs font-semibold text-slate-700">{route.destination}</p><p className="mt-1 text-[10px] text-slate-400">Destination</p></div>
                          </div>
                        </td>
                        <td className="px-5 py-4"><span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] font-bold ring-1 ring-inset ${statusClass(status)}`}><span className="h-1.5 w-1.5 rounded-full bg-current opacity-70" />{status}</span></td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">{formatDate(item.etd || item.atd)}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">{formatDate(item.eta)}</td>
                        <td className="px-5 py-4"><span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1.5 text-[10px] font-semibold text-slate-600">{getMode(item)}</span></td>
                        <td className="max-w-[180px] px-5 py-4"><p className="truncate text-xs font-medium text-slate-600" title={getCommodity(item)}>{getCommodity(item)}</p></td>
                        <td className="whitespace-nowrap px-5 py-4 text-right text-xs font-bold text-slate-700">{getValueLabel(item)}</td>
                        <td className="px-5 py-4 text-right">
                          <button type="button" onClick={() => openShipmentDetails(item)}
                            className="inline-flex items-center gap-2 whitespace-nowrap rounded-xl border border-teal-200 bg-white px-3 py-2 text-[11px] font-bold text-teal-700 shadow-sm transition hover:border-teal-600 hover:bg-teal-600 hover:text-white">
                            <FiEye size={13} /> View details <FiChevronRight size={13} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/60 px-5 py-3.5">
            <p className="text-[10px] text-slate-400">Shipment information is based on the latest saved records.</p>
            <p className="text-[10px] font-semibold text-slate-500">{filtered.length} record{filtered.length === 1 ? "" : "s"}</p>
          </div>
        </div>
      </div>

      {/* Premium shipment details drawer-style modal */}
      {selectedShipment && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/65 p-2 backdrop-blur-sm sm:p-5"
          onMouseDown={(event) => { if (event.target === event.currentTarget) closeShipmentDetails(); }}>
          <div className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-[22px] border border-white/20 bg-[#f5f8fa] shadow-[0_25px_100px_rgba(2,8,23,0.35)]">
            <div className="relative overflow-hidden bg-[#073b3b] px-5 py-5 text-white sm:px-7 sm:py-6">
              <div className="pointer-events-none absolute -right-10 -top-24 h-64 w-64 rounded-full border-[36px] border-white/[0.04]" />
              <div className="pointer-events-none absolute -bottom-28 right-44 h-52 w-52 rounded-full bg-teal-400/10 blur-2xl" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0 mb-48">
                  <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.2em] text-teal-200">Shipment overview</p>
                  <h3 className="text-xl font-bold tracking-tight sm:text-2xl">Shipment details</h3>
                  <p className="mt-1.5 truncate text-xs text-teal-100/75">{getReference(selectedShipment)}</p>
                </div>
                <button type="button" onClick={closeShipmentDetails} aria-label="Close shipment details"
                  className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20"><FiX size={18} /></button>
              </div>
              <div className="relative mt-5 flex flex-wrap items-center gap-2.5">
                <span className={`inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold ${String(getStatus(selectedShipment)).toLowerCase() === "rejected" ? "text-rose-700" : "text-teal-800"}`}>
                  <span className="h-1.5 w-1.5 rounded-full bg-current" /> {getStatus(selectedShipment)}
                </span>
                <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-semibold text-teal-50">{getMode(selectedShipment)} shipment</span>
              </div>
            </div>

            <div className="min-h-0 flex-1 space-y-4 overflow-y-auto p-3 sm:p-6">
              {detailsLoading ? (
                <div className="flex min-h-[280px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white">
                  <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-600"><FiRefreshCw className="animate-spin" size={22} /></span>
                  <p className="mt-4 text-sm font-semibold text-slate-800">Loading shipment details</p>
                  <p className="mt-1 text-xs text-slate-400">Fetching all saved shipment information...</p>
                </div>
              ) : detailsError ? (
                <div className="rounded-2xl border border-rose-200 bg-white p-6 text-center">
                  <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-rose-50 text-rose-600"><FiAlertTriangle size={20} /></span>
                  <p className="mt-3 text-sm font-semibold text-slate-800">Details couldn't be loaded</p>
                  <p className="mt-1 text-xs text-slate-500">{detailsError}</p>
                  <button type="button" onClick={() => openShipmentDetails(selectedShipment)} className="mt-4 rounded-xl bg-teal-700 px-4 py-2.5 text-xs font-semibold text-white hover:bg-teal-800">Try again</button>
                </div>
              ) : (
                <>
                  <section className="overflow-hidden rounded-2xl border border-teal-100 bg-white shadow-sm">
                    <div className="grid grid-cols-1 divide-y divide-slate-100 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                      <div className="p-4 sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Origin</p><p className="mt-2 text-sm font-bold text-slate-800">{getRoute(selectedShipment).origin}</p></div>
                      <div className="p-4 sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Destination</p><p className="mt-2 text-sm font-bold text-slate-800">{getRoute(selectedShipment).destination}</p></div>
                      <div className="p-4 sm:p-5"><p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400">Cargo value</p><p className="mt-2 text-sm font-bold text-slate-800">{getValueLabel(selectedShipment)}</p></div>
                    </div>
                  </section>
                  {renderDetailSection("1. Basic Shipment Details", {
                    shipmentType: selectedShipment.shipmentType,
                    shipmentMode: selectedShipment.shipmentMode,
                    shipmentPurpose: selectedShipment.shipmentPurpose,
                    customerType: selectedShipment.customerType,
                    referenceNumber: selectedShipment.referenceNumber,
                    exporter: selectedShipment.exporter || selectedShipment.shipper,
                    buyer: selectedShipment.buyer,
                    supplier: selectedShipment.supplier,
                    notifyParty: selectedShipment.notifyParty,
                    customFields: selectedShipment.customFields,
                  }, FiPackage, 1)}
                  {renderDetailSection("2. Route & Transit Details", {
                    route: selectedShipment.route,
                    importer: selectedShipment.importer || selectedShipment.consignee,
                    incoterm: selectedShipment.incoterm,
                    etd: selectedShipment.etd,
                    eta: selectedShipment.eta,
                    shipmentDate: selectedShipment.shipmentDate,
                    leadTime: selectedShipment.leadTime,
                    transitTime: selectedShipment.transitTime,
                    totalVolume: selectedShipment.totalVolume,
                    priority: selectedShipment.priority,
                    bookingNo: selectedShipment.bookingNo,
                    notes: selectedShipment.notes,
                  }, FiMapPin, 2)}
                  {renderDetailSection("3. Product & Cargo Specifications", {
                    cargo: selectedShipment.cargo,
                    additionalInformation: selectedShipment.additionalInformation || selectedShipment.additionalInfo,
                  }, FiTruck, 3)}
                  {renderDetailSection("4. Invoice Valuation & Commercials", {
                    amount: selectedShipment.amount ?? selectedShipment.cargo?.value,
                    currency: selectedShipment.currency ?? selectedShipment.cargo?.currency,
                    paymentTerms: selectedShipment.paymentTerms,
                    insuranceRequired: selectedShipment.insuranceRequired,
                    exportIncentive: selectedShipment.exportIncentive,
                  }, FiCreditCard, 4)}
                  {renderDocumentsSection(
                    selectedShipment.documents || selectedShipment.shipmentDocuments || selectedShipment.attachments || []
                  )}
                </>
              )}
            </div>
            <div className="flex items-center justify-between border-t border-slate-200 bg-white px-4 py-3 sm:px-6">
              <p className="hidden text-[10px] text-slate-400 sm:block">CargoMate · Shipment record</p>
              <button type="button" onClick={closeShipmentDetails} className="ml-auto rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 transition hover:bg-slate-50">Close details</button>
            </div>
          </div>
          {documentPreview && (
            <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/80 p-3 sm:p-6"
              onMouseDown={(event) => { if (event.target === event.currentTarget) closeDocumentPreview(); }}>
              <div className="flex max-h-[94vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3 sm:px-5">
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-slate-800">Document preview</p>
                    <p className="truncate text-[11px] text-slate-500">{documentPreview.name}</p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button type="button" onClick={() => downloadDocument({ fileUrl: documentPreview.url, fileName: documentPreview.name })}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-teal-700 px-3 py-2 text-[11px] font-semibold text-white hover:bg-teal-800"><FiDownload size={13}/> Download</button>
                    <button type="button" onClick={closeDocumentPreview}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-50" aria-label="Close preview"><FiX size={17}/></button>
                  </div>
                </div>
                <div className="min-h-[320px] flex-1 overflow-auto bg-slate-100 p-2 sm:p-4">
                  {previewLoading ? (
                    <div className="flex min-h-[320px] items-center justify-center gap-3 text-sm font-semibold text-slate-600"><FiRefreshCw className="animate-spin" /> Loading document preview...</div>
                  ) : previewError ? (
                    <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-xl bg-white p-8 text-center">
                      <FiAlertTriangle size={30} className="text-rose-500"/>
                      <p className="max-w-xl text-sm font-semibold text-slate-800">{previewError}</p>
                      <p className="max-w-xl break-all text-xs text-slate-400">{documentPreview.url}</p>
                    </div>
                  ) : documentPreview.previewUrl && documentPreview.type === "image" ? (
                    <img src={documentPreview.previewUrl} alt={documentPreview.name} className="mx-auto max-h-[76vh] max-w-full rounded-lg object-contain"/>
                  ) : documentPreview.previewUrl && documentPreview.type === "pdf" ? (
                    <iframe title={documentPreview.name} src={documentPreview.previewUrl} className="h-[76vh] w-full rounded-lg border-0 bg-white"/>
                  ) : documentPreview.previewUrl ? (
                    <div className="flex min-h-[320px] flex-col items-center justify-center gap-3 rounded-xl bg-white p-8 text-center">
                      <FiFileText size={36} className="text-teal-700"/>
                      <p className="text-sm font-semibold text-slate-700">Preview is not supported for this file type.</p>
                      <button type="button" onClick={() => downloadDocument({ fileUrl: documentPreview.url, fileName: documentPreview.name })}
                        className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white">Download file</button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function UserDashboard({ profileMode = false }) {
  const siteBranding = usePublicConfig();
  const quotaData = useSubscriptionQuotas();
  const navigate = useNavigate();
  const location = useLocation();

  const [active, setActive] = useState(null);
  const [activeTab, setActiveTab] = useState(() => location.state?.activeTab || "AI CargoMate Assistant");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);

  // React Router may reuse this component while moving from profile to dashboard.
  // Apply the selected sidebar destination on every new route-state change.
  useEffect(() => {
    if (!profileMode && location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [profileMode, location.state?.activeTab]);
  const [analysisTab, setAnalysisTab] = useState("HS Code Analysis");
  // const content = tabContent[analysisTab];
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [activeNav, setActiveNav] = useState(0);
  const [shipment, setShipment] = useState("");
  const [auditLogs, setAuditLogs] = useState(false);
  const [submittedShipments, setSubmittedShipments] = useState([]);
  const [shipmentsLoading, setShipmentsLoading] = useState(false);
  const [shipmentsError, setShipmentsError] = useState("");

  const fetchSubmittedShipments = async () => {
    setShipmentsLoading(true);
    setShipmentsError("");
  
    try {
      const response = await getMyShipments();
  
      const payload =
        response?.data?.data ??
        response?.data?.shipments ??
        response?.data ??
        [];
  
      const records = Array.isArray(payload)
        ? payload
        : Array.isArray(payload?.data)
          ? payload.data
          : Array.isArray(payload?.shipments)
            ? payload.shipments
            : [];
  
      const submitted = records.filter((item) => {
        const status = String(
          item.shipmentStatus ||
          item.status ||
          item.workflowStatus ||
          ""
        ).toLowerCase().trim().replace(/_/g, " ");
  
        return [
          "submitted",
          "submitted to admin",
          "pending",
          "pending review",
          "under review",
          "admin review",
          "in review",
          "approved",
          "rejected",
          "on hold",
        ].includes(status);
      });
  
      setSubmittedShipments(submitted);
    } catch (error) {
      console.error("Error fetching submitted shipments:", error);
  
      setShipmentsError(
        error?.response?.data?.message ||
        "Unable to load submitted shipments. Please try again."
      );
    } finally {
      setShipmentsLoading(false);
    }
  };

  

  useEffect(() => {
    if (activeTab === "Submitted Shipments") fetchSubmittedShipments();
  }, [activeTab]);

  const userAdLocationByTab = {
    "AI Chatbot": "User Dashboard - AI Chatbot",
    "AI CargoMate Assistant": "User Dashboard - AI CargoMate Assistant",
    "HS Code Lookup": "User Dashboard - HS Code Lookup",
    "Incentive Checker": "User Dashboard - Incentive Checker",
    "Freight Calculator": "User Dashboard - Freight Calculator",
    "Shipment Planning": "User Dashboard - Shipment Planning",
    Saved: "User Dashboard - Saved",
    Subscription: "User Dashboard - Subscription",
    Notifications: "User Dashboard - Notifications",
    "Help & Support": "User Dashboard - Help & Support",
  };
  const activeAdLocation = userAdLocationByTab[activeTab];

  return (
    <div className="flex h-screen bg-gray-100  ">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <header className="fixed top-0 w-full z-30 pr-3 bg-white border-b border-gray-200     py-0 flex items-center gap-3  ">
        <button
          className="p-1.5 pl-4 rounded-md hover:bg-gray-100 text-gray-600"
          title="Toggle dashboard sidebar"
          aria-label="Toggle dashboard sidebar"
          onClick={() => {
            if (window.innerWidth >= 1024) setDesktopSidebarVisible((v) => !v);
            else setSidebarOpen((v) => !v);
          }}
        >
          <MdMenu size={18} />
        </button>

        <div className="lg:flex items-center sm:w-60 hidden justify-center gap-2 px-4 py-2">
          <img
            src={siteBranding.systemLogo || logo}
            className="h-10 cursor-pointer"
            onClick={() => navigate("/")}
          />
        </div>

        <NoticeBanner />

        <div className="flex items-center gap-1.5 ml-auto">
          <button
            onClick={() => {
              if (profileMode) {
                navigate("/user-dashboard", { state: { activeTab: "Notifications" } });
              } else {
                setShowNotifications(true);
              }
            }}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
          >
            <FiBell size={16} />
            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
          </button>
          <button
            onClick={() => setShowMessages(true)}
            className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
          >
            <FiMail size={16} />
          </button>

          <AccountBadge />
        </div>
      </header>

      <aside
        className={`
          fixed lg:sticky top-14 bottom-0 lg:top-16   left-0  z-20 w-60  
           bg-white text-white flex flex-col sm:h-[calc(104vh-5rem)]  h-[calc(105vh-5rem)]
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
        `}
      >
        <nav className="flex-1 overflow-y-auto py-3  bg-gray-900 pr-2">
          {/* <button className="w-full hover:bg-teal-500 hover:text-white px-4 py-2 flex items-center gap-2 text-[#8aa0bc] rounded-r-lg text-xs text-left transition-colors" onClick={() => setActiveTab("AI CargoMate Chatbot")} >
              AI CargoMate Chatbot</button> */}

          {sidebarSections.map((section) => (
            <div key={section.title} className="  ">
              <p
                onClick={() => {
                  if (section.items.length === 0) {
                    if (profileMode) {
                      navigate("/user-dashboard", { state: { activeTab: section.title } });
                      return;
                    }
                    setActiveTab(section.title);
                  }
                }}
                className={`px-4 py-2 text-[0.7rem] font-normal cursor-pointer uppercase tracking-widest
                    ${section.items.length === 0 && activeTab === "AI CargoMate Assistant" ? " bg-teal-500 rounded-r-lg text-white" : "text-white hover:bg-teal-500 rounded-r-lg hover:text-white"}
                  `}
              >
                {section.title}
              </p>
              {section.items.map(({ icon: Icon, label, badge, badgeColor }) => (
                <button
                  key={label}
                  className={`w-full   flex items-center gap-2  rounded-r-lg text-xs text-left transition-colors
                    ${
                      activeTab === label
                        ? "bg-teal-500 text-white rounded-r-lg "
                        : "text-[#8aa0bc] hover:bg-teal-500 hover:text-white rounded-r-lg"
                    }`}
                  onClick={() => {
                    setSidebarOpen(false);
                    if (profileMode) {
                      navigate("/user-dashboard", { state: { activeTab: label } });
                      return;
                    }
                    setActiveTab(label);
                  }}
                >
                  <div className=" flex gap-3 px-4 py-2">
                    <Icon className="text-base  flex-shrink-0" />
                    <span className="flex-1 font-normal text-xs  truncate  ">
                      {label}
                    </span>
                    {badge && (
                      <span
                        className={`${badgeColor} text-white text-[9px] px-1.5 py-0.5 rounded-full font-normal`}
                      >
                        {badge}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          ))}
          <SidebarQuota
            data={quotaData}
            onUpgrade={() => {
              if (profileMode) {
                navigate("/user-dashboard", { state: { activeTab: "UpgradePlan" } });
              } else {
                setActiveTab("UpgradePlan");
              }
            }}
          />
        </nav>
      </aside>

      <main className="w-full min-w-0 flex-1 overflow-y-auto overflow-x-hidden bg-[#f3f6fb]">
        {!profileMode &&
          !["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab) && (
            <div
              className="cm-module-shell cm-theme-intelligence mt-3"
              key={`user-header-${activeTab}`}
            >
              <ModuleHero title={activeTab} role="user" />
            </div>
          )}
        <div
          className={
            ["AI Chatbot", "AI CargoMate Chatbot"].includes(activeTab)
              ? ""
              : "cm-workspace cm-theme-intelligence"
          }
        >
          {profileMode ? (
            <AccountProfile embedded />
          ) : (
            <>
              {activeTab === "Submitted Shipments" && (
                <SubmittedShipmentsTable
                  shipments={submittedShipments}
                  loading={shipmentsLoading}
                  error={shipmentsError}
                  onRefresh={fetchSubmittedShipments}
                />
              )}
              {activeTab === "AI Chatbot" && (
                <FeatureQuotaGate
                  feature="aiChatbot"
                  data={quotaData}
                  onUpgrade={() => setActiveTab("UpgradePlan")}
                >
                  {" "}
                  <Chatbot />{" "}
                </FeatureQuotaGate>
              )}
              {activeTab === "AI CargoMate Assistant" && (
                <AiCargoMateAssistant />
              )}

              {activeTab === "HS Code Lookup" && (
                <FeatureQuotaGate
                  feature="hsLookup"
                  data={quotaData}
                  onUpgrade={() => setActiveTab("UpgradePlan")}
                >
                  {" "}
                  <HSCodeLookup />{" "}
                </FeatureQuotaGate>
              )}
              {activeTab === "Incentive Checker" && (
                <FeatureQuotaGate
                  feature="incentiveChecker"
                  data={quotaData}
                  onUpgrade={() => setActiveTab("UpgradePlan")}
                >
                  {" "}
                  <IncentiveChecker />{" "}
                </FeatureQuotaGate>
              )}
              {activeTab === "Shipment Planning" && (
                <FeatureQuotaGate
                  feature="shipmentPlanning"
                  data={quotaData}
                  onUpgrade={() => setActiveTab("UpgradePlan")}
                >
                  
                  <ShipmentPlanning
                    setActiveTab={setActiveTab}
                    activeTab={activeTab}
                    setShipment={setShipment}
                  />
                  {shipment === "shipment" && (
                    <div className="mt-4">
                <Shipment
  accountType="user"
  isAdmin={false}
  setActiveTab={setActiveTab}
  setShipment={setShipment}
  currentTab="Shipment Planning"
  onSaved={() => {
    setShipment("");
    setActiveTab("Submitted Shipments");
  }}
/>
                    </div>
                  )}
                </FeatureQuotaGate>
              )}
              {activeTab === "Freight Calculator" && <FreightCalculator />}

              {activeTab === "Saved" && <Saved />}
              {/* {activeTab === "Audit Logs" && <AuditLogs />}
        {activeTab === "Analytics & Trends" && <AnalyticsTrends />} */}
              {activeTab === "AI CargoMate Chatbot" && <Chatbot />}

              {activeTab === "Subscription" && (
                <Subscription
                  onChangePlan={() => setActiveTab("UpgradePlan")}
                />
              )}
              {activeTab === "Notifications" && <NotificationDashboard />}
              {activeTab === "Help & Support" && <HelpSupportDashboard />}
              {/* {activeTab === "Profile Settings" && <ProfileSettingsDashboard />} */}

              {activeTab === "UpgradePlan" && <UpgradePlan />}
            </>
          )}

          {showNotifications && (
            <NotificationsModal onClose={() => setShowNotifications(false)} />
          )}
          {showMessages && (
            <MessagesModal onClose={() => setShowMessages(false)} />
          )}

          {auditLogs && (
            <AuditLogSettingsModal onClose={() => setAuditLogs(false)} />
          )}
        </div>
      </main>
    </div>
  );
}
