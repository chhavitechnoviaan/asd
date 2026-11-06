// // // import "./CargoMateAdminTheme2026.css";
// // // import { usePublicConfig } from "../../../lib/publicConfig";
// // // import AccountProfile, {
// // //   AccountBadge,
// // // } from "../../../components/AccountProfile";
// // // import { clearSession } from "../../../lib/auth";
// // // import { useNavigate } from "react-router-dom";
// // // import { useState, useEffect } from "react";
// // // import {
// // //   FiMenu,
// // //   FiSearch,
// // //   FiBell,
// // //   FiMail,
// // //   FiSun,
// // //   FiMoon,
// // //   FiPlus,
// // //   FiUsers,
// // //   FiShield,
// // //   FiCreditCard,
// // //   FiDatabase,
// // //   FiFileText,
// // //   FiGlobe,
// // //   FiPackage,
// // //   FiTruck,
// // //   FiCpu,
// // //   FiPieChart,
// // //   FiLink,
// // //   FiMonitor,
// // //   FiHelpCircle,
// // //   FiGrid,
// // //   FiSettings,
// // //   FiChevronRight,
// // //   FiUserPlus,
// // //   FiUserCheck,
// // //   FiPlusCircle,
// // //   FiAlertCircle,
// // //   FiCheckCircle,
// // //   FiXCircle,
// // //   FiHome,
// // //   FiCamera,
// // //   FiLock,
// // //   FiSend,
// // // } from "react-icons/fi";
// // // import {
// // //   FaTrash,
// // //   FaCheck,
// // //   FaBox,
// // //   FaBell,
// // //   FaChevronLeft,
// // //   FaFileLines,
// // //   FaListCheck,
// // //   FaGripVertical,
// // //   FaPlus,
// // //   FaSliders,
// // //   FaEye,
// // //   FaClock,
// // //   FaUser,
// // //   FaFloppyDisk,
// // //   FaPaperPlane,
// // //   FaUsers,
// // //   FaIndianRupeeSign,
// // //   FaRotate,
// // // } from "react-icons/fa6";

// // // import {
// // //   FiEdit,
// // //   FiTrash2,
// // //   FiCheck,
// // //   FiDollarSign,
// // //   FiRefreshCw,
// // //   FiUser,
// // // } from "react-icons/fi";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   AreaChart,
// // //   Area,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // // } from "recharts";
// // // import {
// // //   MdDashboard,
// // //   MdPeople,
// // //   MdSecurity,
// // //   MdSubscriptions,
// // //   MdStorage,
// // //   MdDescription,
// // //   MdPublic,
// // //   MdBusiness,
// // //   MdLocalShipping,
// // //   MdAnnouncement,
// // //   MdSmartToy,
// // //   MdInsights,
// // //   MdApi,
// // //   MdCampaign,
// // //   MdSupportAgent,
// // //   MdWidgets,
// // //   MdSettings,
// // // } from "react-icons/md";
// // // import { RxCross1 } from "react-icons/rx";
// // // import { FaCalendarAlt, FaTimes } from "react-icons/fa";

// // // import RolesPermission from "./RolesPermission";
// // // import SubAdmins from "./SubAdmins";
// // // import API from "../../api/axios";
// // // import Settings from "./Settings";
// // // import MasterData from "./MasterData";
// // // import HSRules from "./HsRules";
// // // import CountryRules from "./CountryRules";
// // // import DGFTSchemes from "./DgftScheme";
// // // import Shipment from "./Shipment";
// // // import VendorsPartners from "./VendorsPartners";
// // // import NoticesSection from "./Notices";
// // // import AdminNotifications from "./AdminNotifications";
// // // import AiAssistant from "./AiAssistant";
// // // import TradeIntelligence from "./TradeIntelligence";
// // // import Modules from "./Modules";
// // // import Support from "./Support";
// // // import APIIntegrations from "./ApiIntegrations";
// // // import AdManagement from "./AdManagement";
// // // import UsersSection from "./Users";
// // // import PlanSection from "./PlansSubscriptions";
// // // import WhatsappBot from "./WhatsappBot";
// // // import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
// // // import { HiOutlineDocumentText } from "react-icons/hi";
// // // import { RiWhatsappLine } from "react-icons/ri";
// // // import { FiX } from "react-icons/fi";
// // // import ai from "../../assets/icon/ai.png";
// // // import user from "../../assets/icon/user.png";
// // // import suppliers from "../../assets/icon/suppliers.png";
// // // import linear from "../../assets/icon/linear.png";
// // // import anal from "../../assets/icon/analytical.png";
// // // import vector from "../../assets/icon/vector.png";
// // // import time from "../../assets/icon/time.png";
// // // import document from "../../assets/icon/document.png";
// // // import order from "../../assets/icon/orders.png";

// // // import logo from "../../assets/Images/logo.png";
// // // import CreateNewInvoice from "./CreateNewInvoice";

// // // import MessagesModal from "../../components/Messages";
// // // import NotificationsModal from "../../components/Notifications";
// // // import MyAccount from "../admin/MyAccount";

// // // const fabActions = [
// // //   {
// // //     label: "New Booking",
// // //     icon: <BsCalendarCheck size={22} className="text-teal-600" />,
// // //   },
// // //   {
// // //     label: "Add Vendor",
// // //     icon: <BsPersonPlus size={22} className="text-teal-600" />,
// // //   },
// // //   {
// // //     label: "Report",
// // //     icon: <HiOutlineDocumentText size={22} className="text-teal-600" />,
// // //   },
// // //   {
// // //     label: "WhatsApp Bot",
// // //     icon: <RiWhatsappLine size={22} className="text-teal-600" />,
// // //   },
// // // ];

// // // const navItems = [
// // //   { icon: MdDashboard, label: "Admin Dashboard", color: "text-orange-400" },
// // //   { icon: MdPeople, label: "Users", color: "text-yellow-400" },
// // //   { icon: MdPeople, label: "Vendors/ Partners", color: "text-green-400" },
// // //   { icon: MdSecurity, label: "Roles & Permissions", color: "text-purple-400" },
// // //   { icon: MdPeople, label: "Sub-admins", color: "text-teal-400" },
// // //   {
// // //     icon: MdSubscriptions,
// // //     label: "Plans/ Subscription",
// // //     color: "text-teal-400",
// // //   },
// // //   { icon: MdStorage, label: "Master Data", color: "text-blue-400" },
// // //   { icon: MdDescription, label: "HS Rules", color: "text-red-400" },
// // //   { icon: MdPublic, label: "Country Rules", color: "text-indigo-400" },
// // //   { icon: MdBusiness, label: "DGFT Schemes", color: "text-pink-400" },
// // //   { icon: MdLocalShipping, label: "Shipment", color: "text-cyan-400" },
// // //   { icon: MdAnnouncement, label: "Notices", color: "text-amber-400" },
// // //   { icon: FiBell, label: "Notifications", color: "text-teal-400" },

// // //   { icon: MdSmartToy, label: "AI Assistant", color: "text-blue-500" },
// // //   // { icon: MdInsights, label: "Trade Intelligence", color: "text-rose-400" },
// // //   // { icon: MdApi, label: "API Integrations", color: "text-emerald-400" },
// // //   { icon: MdCampaign, label: "Ad Managment", color: "text-yellow-500" },
// // //   { icon: MdSupportAgent, label: "Support", color: "text-orange-500" },
// // //   // { icon: MdWidgets, label: "Modules", color: "text-indigo-500" },
// // //   { icon: MdSettings, label: "Settings", color: "text-gray-400" },
// // // ];

// // // const quickActions = [
// // //   { icon: user, label: "Add User" },
// // //   { icon: order, label: "Add Vendor" },
// // //   { icon: FiShield, label: "Add Role" },
// // //   { icon: FiUserPlus, label: "Add Sub-admin" },
// // //   { icon: suppliers, label: "Add Plan" },
// // //   { icon: FiPlus, label: "Create Notice" },
// // // ];

// // // function CreateNotice({ setShowNotice }) {
// // //   const [title, setTitle] = useState("");
// // //   const [desc, setDesc] = useState("");
// // //   const [date, setDate] = useState("");
// // //   const [image, setImage] = useState(null);
// // //   const [preview, setPreview] = useState(null);
// // //   const [errors, setErrors] = useState({});

// // //   const handleImage = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setImage(file);
// // //       setPreview(URL.createObjectURL(file));
// // //     }
// // //   };

// // //   const removeImage = () => {
// // //     setImage(null);
// // //     setPreview(null);
// // //   };

// // //   const validate = () => {
// // //     let err = {};
// // //     if (!title.trim()) err.title = "Title required";
// // //     if (!desc.trim()) err.desc = "Description required";
// // //     if (!date) err.date = "Date required";
// // //     setErrors(err);
// // //     return Object.keys(err).length === 0;
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!validate()) return;

// // //     const data = {
// // //       title,
// // //       desc,
// // //       date,
// // //       image,
// // //     };

// // //     console.log("Submit:", data);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 sm:px-6">
// // //       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
// // //         <div className="flex items-center justify-between  mb-4">
// // //           <h2 className="text-lg sm:text-xl font-semibold ">Create Notice</h2>
// // //           <button>
// // //             <RxCross1 onClick={() => setShowNotice((prev) => !prev)} />
// // //           </button>
// // //         </div>

// // //         <div className="mb-3">
// // //           <label className="text-sm text-gray-700">Title</label>
// // //           <input
// // //             type="text"
// // //             placeholder="Give One Title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// // //               errors.title
// // //                 ? "border-red-400 focus:ring-red-400"
// // //                 : "focus:ring-teal-500"
// // //             }`}
// // //           />
// // //           {errors.title && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
// // //           )}
// // //         </div>

// // //         <div className="mb-3">
// // //           <label className="text-sm text-gray-700">Description</label>
// // //           <textarea
// // //             rows="3"
// // //             placeholder="Type Description here..."
// // //             value={desc}
// // //             onChange={(e) => setDesc(e.target.value)}
// // //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 ${
// // //               errors.desc
// // //                 ? "border-red-400 focus:ring-red-400"
// // //                 : "focus:ring-teal-500"
// // //             }`}
// // //           />
// // //           {errors.desc && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
// // //           )}
// // //         </div>

// // //         <div className="mb-3 flex flex-col  ">
// // //           <label className="text-sm text-gray-700">Add image (optional)</label>

// // //           <label className="mt-2 self-start bg-teal-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-teal-600 transition">
// // //             Upload Image
// // //             <input
// // //               type="file"
// // //               accept="image/*"
// // //               onChange={handleImage}
// // //               className="hidden"
// // //             />
// // //           </label>

// // //           {preview && (
// // //             <div className="mt-3 relative w-32 h-32">
// // //               <img
// // //                 src={preview}
// // //                 alt="preview"
// // //                 className="w-full h-full object-cover rounded-md border"
// // //               />
// // //               <button
// // //                 onClick={removeImage}
// // //                 className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full text-sm"
// // //               >
// // //                 <FaTimes />
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="mb-5">
// // //           <label className="text-sm text-gray-700">Schedule Date</label>
// // //           <div className="relative mt-1">
// // //             <input
// // //               type="date"
// // //               value={date}
// // //               onChange={(e) => setDate(e.target.value)}
// // //               className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// // //                 errors.date
// // //                   ? "border-red-400 focus:ring-red-400"
// // //                   : "focus:ring-teal-500"
// // //               }`}
// // //             />
// // //             {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-sm pointer-events-none" /> */}
// // //           </div>
// // //           {errors.date && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
// // //           )}
// // //         </div>

// // //         <button
// // //           onClick={handleSubmit}
// // //           className="w-full bg-teal-500 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
// // //         >
// // //           Publish Notice
// // //         </button>

// // //         <button
// // //           type="button"
// // //           onClick={() => setShowNotice(false)}
// // //           className="w-full mt-2 border py-2 rounded-md text-sm text-gray-500 hover:bg-teal-500 hover:text-white transition"
// // //         >
// // //           Cancel
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // export default function AdminDashboard({ profileMode = false }) {
// // //   const navigate = useNavigate();
// // //   const siteBranding = usePublicConfig();
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
// // //   const [activeNav, setActiveNav] = useState(
// // //     profileMode ? "My Profile" : "Admin Dashboard",
// // //   );
// // //   // React may reuse the dashboard instance when navigating to /admin-profile.
// // //   // Reset the section so an open User/Vendor drawer cannot cover the profile route.
// // //   useEffect(() => {
// // //     setActiveNav(profileMode ? "My Profile" : "Admin Dashboard");
// // //   }, [profileMode]);
// // //   const [staffAccess, setStaffAccess] = useState(null);
// // //   useEffect(() => {
// // //     let active = true;
// // //     API.get("/auth/me")
// // //       .then(({ data }) => {
// // //         if (!active) return;
// // //         if (data?.user?.isInternalStaff)
// // //           setStaffAccess(data.user.permissions || {});
// // //       })
// // //       .catch(() => {});
// // //     return () => {
// // //       active = false;
// // //     };
// // //   }, []);
// // //   const menuModules = {
// // //     "Admin Dashboard": "dashboard",
// // //     Users: "users",
// // //     "Vendors/ Partners": "vendors",
// // //     "Plans/ Subscription": "plans",
// // //     "Master Data": "masterData",
// // //     "HS Rules": "hsRules",
// // //     "Country Rules": "countryRules",
// // //     "DGFT Schemes": "dgftSchemes",
// // //     Shipment: "shipment",
// // //     Notices: "dashboard",
// // //     Notifications: "dashboard",
// // //     "AI Assistant": "aiAssistant",
// // //     "Ad Managment": "ads",
// // //     Support: "support",
// // //     Settings: "settings",
// // //   };
// // //   const visibleAdminNav =
// // //     staffAccess === null
// // //       ? navItems
// // //       : navItems.filter(
// // //           (item) =>
// // //             !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
// // //             staffAccess[menuModules[item.label]]?.view === true,
// // //         );
// // //   // Never keep a sub-admin on a tab they cannot view, even when arriving via a direct link.
// // //   useEffect(() => {
// // //     if (staffAccess === null || profileMode) return;
// // //     const permitted = navItems.filter(
// // //       (item) =>
// // //         !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
// // //         staffAccess[menuModules[item.label]]?.view === true,
// // //     );
// // //     if (!permitted.some((item) => item.label === activeNav))
// // //       setActiveNav(permitted[0]?.label || "Access Restricted");
// // //   }, [staffAccess, activeNav, profileMode]);
// // //   const may = (module, action = "view") =>
// // //     staffAccess === null || staffAccess?.[module]?.[action] === true;

// // //   const [showNotice, setShowNotice] = useState(false);
// // //   const [showAddPlan, setShowAddPlan] = useState(false);
// // //   const [showBot, setShowBot] = useState(false);
// // //   const [fabOpen, setFabOpen] = useState(false);
// // //   const [messages, setMessage] = useState(false);
// // //   const [noticeMode, setNoticeMode] = useState("list");
// // //   const [notifications, setNotifications] = useState(false);
// // //   const [account, setAccount] = useState(false);

// // //   const [createIntent, setCreateIntent] = useState(0);
// // //   const [dashboardData, setDashboardData] = useState(null);
// // //   const [dashboardError, setDashboardError] = useState("");
// // //   const refreshDashboard = async () => {
// // //     try {
// // //       const { data } = await API.get("/admin/dashboard");
// // //       setDashboardData(data);
// // //       setDashboardError("");
// // //     } catch (e) {
// // //       setDashboardError(
// // //         e.response?.data?.message || "Dashboard data unavailable",
// // //       );
// // //     }
// // //   };
// // //   useEffect(() => {
// // //     if (activeNav === "Admin Dashboard") refreshDashboard();
// // //   }, [activeNav]);
// // //   const dashboardStats = dashboardData?.stats || {};
// // //   const dashboardCards = [
// // //     {
// // //       label: "Total Users",
// // //       value: dashboardStats.totalUsers,
// // //       icon: user,
// // //       bg: "bg-teal-50",
// // //       color: "text-teal-600",
// // //     },
// // //     {
// // //       label: "Total Subscription",
// // //       value: dashboardStats.totalSubscription,
// // //       icon: suppliers,
// // //       bg: "bg-teal-50",
// // //       color: "text-teal-600",
// // //     },
// // //     {
// // //       label: "Total Shipment",
// // //       value: dashboardStats.totalShipment,
// // //       icon: ai,
// // //       bg: "bg-sky-50",
// // //       color: "text-sky-600",
// // //     },
// // //     {
// // //       label: "Revenue",
// // //       value:
// // //         dashboardStats.revenue == null
// // //           ? null
// // //           : `₹${Number(dashboardStats.revenue).toLocaleString("en-IN")}`,
// // //       icon: linear,
// // //       bg: "bg-green-50",
// // //       color: "text-green-600",
// // //     },
// // //     {
// // //       label: "Active Vendors",
// // //       value: dashboardStats.activeVendors,
// // //       icon: vector,
// // //       bg: "bg-teal-50",
// // //       color: "text-teal-600",
// // //     },
// // //     {
// // //       label: "Plans Sold",
// // //       value: dashboardStats.paidSubscriptions,
// // //       icon: order,
// // //       bg: "bg-violet-50",
// // //       color: "text-violet-600",
// // //     },
// // //     {
// // //       label: "B2B Subscriptions",
// // //       value: dashboardStats.b2bSubscriptions,
// // //       icon: suppliers,
// // //       bg: "bg-teal-50",
// // //       color: "text-teal-600",
// // //     },
// // //     {
// // //       label: "B2B Plans Created",
// // //       value: dashboardStats.b2bPlans,
// // //       icon: order,
// // //       bg: "bg-teal-50",
// // //       color: "text-teal-600",
// // //     },
// // //   ];
// // //   const dashboardRevenue = dashboardData?.charts?.revenueGrowth || [];
// // //   const dashboardGrowth = dashboardData?.charts?.userGrowth || [];
// // //   const dashboardActivity = dashboardData?.recentActivity || [];
// // //   const dashboardAlerts = [
// // //     { label: "Unread", count: dashboardStats.unreadNotifications },
// // //     { label: "Read", count: dashboardStats.readNotifications },
// // //   ];
// // //   const quickActionPermissions = {
// // //     "Add User": ["users", "add"],
// // //     "Add Vendor": ["vendors", "add"],
// // //     "Add Role": null,
// // //     "Add Sub-admin": null,
// // //     "Add Plan": ["plans", "add"],
// // //     "Create Notice": ["dashboard", "add"],
// // //   };
// // //   const canUseQuickAction = (label) => {
// // //     const rule = quickActionPermissions[label];
// // //     if (!rule) return staffAccess === null;
// // //     return may(rule[0], rule[1]);
// // //   };
// // //   const actionNavigation = (label) => {
// // //     if (!canUseQuickAction(label)) return;
// // //     const mapping = {
// // //       "Add User": "Users",
// // //       "Add Vendor": "Vendors/ Partners",
// // //       "Add Role": "Roles & Permissions",
// // //       "Add Sub-admin": "Sub-admins",
// // //       "Add Plan": "Plans/ Subscription",
// // //       "Create Notice": "Notices",
// // //     };
// // //     const target = mapping[label];
// // //     if (!target) return;
// // //     if (
// // //       staffAccess !== null &&
// // //       ["Roles & Permissions", "Sub-admins"].includes(target)
// // //     )
// // //       return;
// // //     setActiveNav(target);
// // //     setCreateIntent((n) => n + 1);
// // //     if (target === "Notices") setNoticeMode("create");
// // //   };

// // //   const handleFabAction = (label) => {
// // //     if (label === "WhatsApp Bot") {
// // //       setShowBot(true);
// // //       setFabOpen(false);
// // //     } else setFabOpen(false);
// // //   };

// // //   return (
// // //     <div className="cargomate-admin-shell flex min-h-screen bg-[#F9FAFB] ">
// // //       {/* Overlay for mobile */}

// // //       {sidebarOpen && (
// // //         <div
// // //           className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
// // //           onClick={() => setSidebarOpen(false)}
// // //         />
// // //       )}

// // //       {/* Sidebar */}
// // //       <aside
// // //         className={`
// // //           fixed lg:static inset-y-0 left-0 z-30 w-52 xl:w-60
// // //             text-white bg-white flex flex-col
// // //           transform transition-transform duration-300 ease-in-out
// // //           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
// // //           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
// // //         `}
// // //       >
// // //         {/* Logo */}
// // //         <div className="flex items-center gap-2 px-4 py-2 justify-center border-b border-gray-700">
// // //           <img src={siteBranding.systemLogo || logo} className="h-12" />
// // //         </div>

// // //         {/* Nav */}
// // //         <nav className="flex-1 overflow-y-auto pr-3 py-7 space-y-0.5 bg-gray-900">
// // //           {visibleAdminNav.map(({ icon: Icon, label, color }) => (
// // //             <button
// // //               key={label}
// // //               onClick={() => {
// // //                 setActiveNav(label);
// // //                 if (label === "Notices") setNoticeMode("list");
// // //                 setShowBot(false);
// // //                 setSidebarOpen(false);
// // //               }}
// // //               className={`w-full flex items-center gap-2 py-3 pl-10 rounded-r-lg  text-md font-semibold transition-colors text-left
// // //                 ${
// // //                   activeNav === label
// // //                     ? "bg-teal-500 text-white"
// // //                     : "text-gray-400 hover:bg-gray-700 hover:text-white"
// // //                 }`}
// // //             >
// // //               <Icon size={18} className={`${color} flex-shrink-0`} />
// // //               <span className="truncate text-[0.9rem] ">{label}</span>
// // //             </button>
// // //           ))}
// // //         </nav>
// // //       </aside>

// // //       <div className="flex-1 flex flex-col w-full">
// // //         {/* Topbar */}
// // //         <header className="bg-white border-b border-gray-200  px-3 sm:px-4 py-1 flex items-center gap-3 flex-shrink-0">
// // //           <button
// // //             className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
// // //             title="Toggle admin sidebar"
// // //             aria-label="Toggle admin sidebar"
// // //             onClick={() => {
// // //               if (window.innerWidth >= 1024)
// // //                 setDesktopSidebarVisible((v) => !v);
// // //               else setSidebarOpen(true);
// // //             }}
// // //           >
// // //             <FiMenu size={18} />
// // //           </button>

// // //           <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
// // //             <div className="relative">
// // //               <FiSearch
// // //                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
// // //                 size={14}
// // //               />
// // //               <input
// // //                 type="text"
// // //                 placeholder="Search"
// // //                 className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
// // //               />
// // //             </div>
// // //           </div>

// // //           <div className="flex items-center gap-1.5 ml-auto">
// // //             <button
// // //               onClick={() => setActiveNav("Notifications")}
// // //               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
// // //             >
// // //               <FiBell size={16} />
// // //               {dashboardStats.unreadNotifications > 0 && (
// // //                 <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] text-white">
// // //                   {dashboardStats.unreadNotifications}
// // //                 </span>
// // //               )}
// // //             </button>
// // //             <button
// // //               onClick={() => setMessage(true)}
// // //               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
// // //             >
// // //               <FiMail size={16} />
// // //             </button>

// // //             <AccountBadge />
// // //           </div>
// // //         </header>

// // //         {/* Page Content */}

// // //         <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
// // //           {!profileMode &&
// // //             !["Access Restricted", "Plans/ Subscription"].includes(
// // //               activeNav,
// // //             ) && (
// // //             //   <div
// // //             //     className="cm-unified-hero"
// // //             //     aria-label={`${activeNav} management`}
// // //             //   >
// // //             //     <span className="cm-unified-hero-mark">
// // //             //       <FiGrid size={22} />
// // //             //     </span>
// // //             //     <div className="min-w-0">
// // //             //       <p className="cm-unified-kicker">CARGOMATE ADMIN</p>
// // //             //       <div className="flex gap-20 w-full">
// // //             //          <h1>{activeNav}</h1>
// // //             //          <div className="flex justify-end mb-3  ml-80">
// // //             //     {may("dashboard", "add") && (
// // //             //       <button
// // //             //         onClick={() => {
// // //             //           setActiveNav("Notices");
// // //             //           setNoticeMode("create");
// // //             //         }}
// // //             //         className="flex items-center gap-1.5 bg-white hover:bg-white-600 text-teal-500 
// // //             // text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
// // //             //       >
// // //             //         <FiPlus size={13} />
// // //             //         <span> Create Notice</span>
// // //             //       </button>
// // //             //     )}
// // //             //   </div>
// // //             //       </div>
                 
// // //             //       <p className="cm-unified-desc">
// // //             //         Manage {activeNav.toLowerCase()} securely from the CargoMate
// // //             //         workspace
// // //             //       </p>
// // //             //     </div>

                
// // //             //   </div>

            
// // // <div className="cm-unified-hero">
// // //   <span className="cm-unified-hero-mark">
// // //     <FiGrid size={22} />
// // //   </span>

// // //   <div className="flex-1 min-w-0">
// // //     <p className="cm-unified-kicker">CARGOMATE ADMIN</p>

// // //     <div className="flex flex-wrap items-center justify-between gap-4 w-full">
// // //       <h1>{activeNav}</h1>

// // //       {activeNav === "Admin Dashboard" &&
// // //         may("dashboard", "add") && (
// // //           <button
// // //             type="button"
// // //             onClick={() => {
// // //               setActiveNav("Notices");
// // //               setNoticeMode("create");
// // //             }}
// // //             className="ml-auto flex shrink-0 items-center gap-2
// // //               bg-white text-[#0A8981] hover:bg-[#E6FFFA]
// // //               text-sm font-semibold px-5 py-2.5 rounded-xl
// // //               shadow-sm transition-all duration-200"
// // //           >
// // //             <FiPlus size={16} />
// // //             Create Notice
// // //           </button>
// // //         )}
// // //     </div>

// // //     <p className="cm-unified-desc">
// // //       Manage {activeNav.toLowerCase()} securely from the
// // //       CargoMate workspace
// // //     </p>
// // //   </div>
// // // </div>

// // //             )}
// // //           {activeNav === "My Profile" && <AccountProfile embedded />}
// // //           {activeNav === "Notifications" && may("dashboard") && (
// // //             <AdminNotifications
// // //               onBack={() => setActiveNav("Admin Dashboard")}
// // //               onChanged={refreshDashboard}
// // //             />
// // //           )}
// // //           {activeNav === "Access Restricted" && (
// // //             <div className="p-8 text-slate-600">
// // //               No administrative modules are assigned to this account. Contact
// // //               the Main Admin.
// // //             </div>
// // //           )}
// // //           {activeNav === "Admin Dashboard" && may("dashboard") && (
// // //             <div className="">
// // //               {dashboardError && (
// // //                 <div
// // //                   role="alert"
// // //                   className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-2 mb-4 text-sm"
// // //                 >
// // //                   {dashboardError}
// // //                 </div>
// // //               )}
             

// // //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-2 sm:gap-3 mb-4">
// // //                 {dashboardCards.map(
// // //                   ({ label, value, icon: Icon, color, bg }) => (
// // //                     <div
// // //                       onClick={() => {
// // //                         if (label === "Total Users") {
// // //                           setActiveNav("Users");
// // //                         } else if (label === "Active Vendors") {
// // //                           setActiveNav("Vendors/ Partners");
// // //                         }
// // //                       }}
// // //                       key={label}
// // //                       className="bg-white/90 backdrop-blur-md cursor-pointer rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,34,89,0.05)] hover:shadow-[0_14px_35px_rgba(20,184,166,0.12)] hover:-translate-y-0.5 transition-all border border-teal-100 flex flex-col gap-2"
// // //                     >
// // //                       <p className="text-gray-500 text-sm font-medium leading-tight">
// // //                         {label}
// // //                       </p>
// // //                       <div className="flex items-center justify-between">
// // //                         <p className="text-gray-800 font-bold text-sm sm:text-base">
// // //                           {value == null ? "—" : value}
// // //                         </p>
// // //                         <div className="bg-teal-50 w-7 h-7 flex items-center justify-center rounded-md">
// // //                           {typeof Icon === "string" ? (
// // //                             <img src={Icon} alt="icon" className="w-4 h-4" />
// // //                           ) : (
// // //                             <Icon className={color} size={16} />
// // //                           )}{" "}
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                   ),
// // //                 )}
// // //               </div>

// // //               {/* Charts Row 1 */}
// // //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
// // //                 {/* Area Chart */}
// // //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-100 ">
// // //                   <p className="text-xs sm:text-base  xl:text-lg font-semibold text-gray-500 mb-3">
// // //                     Subscription Revenue (INR)
// // //                   </p>
// // //                   <ResponsiveContainer width="100%" height={140}>
// // //                     <AreaChart data={dashboardRevenue}>
// // //                       <defs>
// // //                         <linearGradient
// // //                           id="colorVal"
// // //                           x1="0"
// // //                           y1="0"
// // //                           x2="0"
// // //                           y2="1"
// // //                         >
// // //                           <stop
// // //                             offset="5%"
// // //                             stopColor="#14B8A6"
// // //                             stopOpacity={0.3}
// // //                           />
// // //                           <stop
// // //                             offset="95%"
// // //                             stopColor="#14B8A6"
// // //                             stopOpacity={0}
// // //                           />
// // //                         </linearGradient>
// // //                       </defs>
// // //                       <CartesianGrid
// // //                         strokeDasharray="4 4"
// // //                         stroke="#d1d5db"
// // //                         strokeOpacity={0.8}
// // //                         vertical={false}
// // //                       />
// // //                       <XAxis
// // //                         dataKey="name"
// // //                         tick={{ fontSize: 10 }}
// // //                         axisLine={false}
// // //                         tickLine={false}
// // //                       />
// // //                       <Tooltip contentStyle={{ fontSize: 11 }} />
// // //                       <Area
// // //                         type="monotone"
// // //                         dataKey="value"
// // //                         stroke="#14B8A6"
// // //                         strokeWidth={2}
// // //                         fill="url(#colorVal)"
// // //                       />
// // //                     </AreaChart>
// // //                   </ResponsiveContainer>
// // //                 </div>

// // //                 {/* Bar Chart */}
// // //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // //                   <p className="text-xs sm:text-base xl:text-lg font-semibold text-gray-500 mb-3">
// // //                     Plans Sold by Month
// // //                   </p>
// // //                   <ResponsiveContainer width="100%" height={140}>
// // //                     <BarChart data={dashboardRevenue} barCategoryGap="30%">
// // //                       <CartesianGrid
// // //                         strokeDasharray="4 4"
// // //                         stroke="#d1d5db"
// // //                         strokeOpacity={0.8}
// // //                         vertical={false}
// // //                       />
// // //                       <XAxis
// // //                         dataKey="name"
// // //                         tick={{ fontSize: 10 }}
// // //                         axisLine={false}
// // //                         tickLine={false}
// // //                       />
// // //                       <Tooltip contentStyle={{ fontSize: 11 }} />
// // //                       <Bar
// // //                         dataKey="sales"
// // //                         fill="#14B8A6"
// // //                         radius={[3, 3, 0, 0]}
// // //                       />
// // //                     </BarChart>
// // //                   </ResponsiveContainer>
// // //                 </div>
// // //               </div>

// // //               {/* Bottom Row */}
// // //               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // //                 {/* Quick Actions */}
// // //                 <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 h-fit ">
// // //                   <p className="text-sm sm:text-base xl:text-lg  border-b-2 font-medium text-gray-800 mb-3">
// // //                     Quick Action
// // //                   </p>
// // //                   <div className="space-y-2">
// // //                     {quickActions
// // //                       .filter(({ label }) => canUseQuickAction(label))
// // //                       .map(({ icon: Icon, label }) => (
// // //                         <button
// // //                           key={label}
// // //                           onClick={() => actionNavigation(label)}
// // //                           className="w-full flex items-center shadow-sm gap-2 px-3 py-2 border border-teal-100 rounded-lg hover:bg-teal-50 text-sm text-gray-700 transition-colors"
// // //                         >
// // //                           {typeof Icon === "string" ? (
// // //                             <img src={Icon} alt="icon" className="w-4 h-4" />
// // //                           ) : (
// // //                             <Icon
// // //                               size={13}
// // //                               className="text-teal-500 flex-shrink-0"
// // //                             />
// // //                           )}

// // //                           <span className="font-medium">{label}</span>
// // //                         </button>
// // //                       ))}
// // //                   </div>
// // //                 </div>

// // //                 {/* User Growth */}
// // //                 <div className="rounded-xl p-0 flex flex-col">
// // //                   <div className="shadow-md border p-3 rounded-xl sm:p-4 border-gray-100 bg-white">
// // //                     <p className="text-xs sm:text-base  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // //                       User Growth
// // //                     </p>
// // //                     <div className="flex-1">
// // //                       <ResponsiveContainer width="100%" height={160}>
// // //                         <AreaChart
// // //                           data={dashboardGrowth}
// // //                           margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
// // //                         >
// // //                           <defs>
// // //                             <linearGradient
// // //                               id="ugGrad"
// // //                               x1="0"
// // //                               y1="0"
// // //                               x2="0"
// // //                               y2="1"
// // //                             >
// // //                               <stop
// // //                                 offset="5%"
// // //                                 stopColor="#14B8A6"
// // //                                 stopOpacity={0.25}
// // //                               />
// // //                               <stop
// // //                                 offset="95%"
// // //                                 stopColor="#14B8A6"
// // //                                 stopOpacity={0}
// // //                               />
// // //                             </linearGradient>
// // //                           </defs>

// // //                           <CartesianGrid
// // //                             strokeDasharray="6 6"
// // //                             stroke="#d1d5db"
// // //                             vertical={false}
// // //                             strokeOpacity={0.8}
// // //                           />

// // //                           <XAxis
// // //                             dataKey="name"
// // //                             tick={{ fontSize: 10 }}
// // //                             axisLine={false}
// // //                             tickLine={false}
// // //                           />

// // //                           <YAxis hide domain={["auto", "auto"]} />

// // //                           <Tooltip contentStyle={{ fontSize: 11 }} />

// // //                           <Area
// // //                             type="monotone"
// // //                             dataKey="value"
// // //                             stroke="#14B8A6"
// // //                             strokeWidth={2}
// // //                             fill="url(#ugGrad)"
// // //                           />
// // //                         </AreaChart>
// // //                       </ResponsiveContainer>
// // //                     </div>
// // //                   </div>

// // //                   {/* Recent Activity below on mobile / same card medium+ */}
// // //                   <div className="mt-3 pt-3 border-t border-gray-100 shadow-md rounded-xl p-3 sm:p-4 bg-white">
// // //                     <p className="text-sm sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-2">
// // //                       Recent Activity
// // //                     </p>
// // //                     <div className="space-y-1.5">
// // //                       {dashboardActivity.map(({ title, createdAt }, i) => (
// // //                         <div
// // //                           key={i}
// // //                           className="flex justify-between items-start gap-2"
// // //                         >
// // //                           <p className="text-[0.8rem]  sm:text-sm font-medium text-[#4D4D4D]  leading-snug">
// // //                             {title}
// // //                           </p>
// // //                           <p className=" text-xs sm:text-sm text-[#9A9A9A]    font-medium flex-shrink-0">
// // //                             {createdAt
// // //                               ? new Date(createdAt).toLocaleString("en-IN")
// // //                               : ""}
// // //                           </p>
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>
// // //                 </div>

// // //                 {/* Alerts + System Status */}
// // //                 <div className="flex flex-col gap-3">
// // //                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // //                     <p className="text-xs sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // //                       Alert & Notification
// // //                     </p>
// // //                     <div className="space-y-2">
// // //                       {dashboardAlerts.map(({ count, label }) => (
// // //                         <div
// // //                           key={label}
// // //                           onClick={() => setActiveNav("Notifications")}
// // //                           role="button"
// // //                           tabIndex={0}
// // //                           onKeyDown={(e) => {
// // //                             if (e.key === "Enter")
// // //                               setActiveNav("Notifications");
// // //                           }}
// // //                           className="cursor-pointer flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 hover:bg-teal-50 rounded-lg"
// // //                         >
// // //                           <div className="flex items-center gap-2">
// // //                             <span className="bg-[#14B8A6] text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
// // //                               {count ?? "—"}
// // //                             </span>
// // //                             <span className="text-xs sm:text-base  font-medium text-gray-700">
// // //                               {label}
// // //                             </span>
// // //                           </div>
// // //                           <FiChevronRight
// // //                             size={20}
// // //                             className="text-xs sm:text-sm font-mediumtext-gray-400"
// // //                           />
// // //                         </div>
// // //                       ))}
// // //                     </div>
// // //                   </div>

// // //                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // //                     <p className="text-xs sm:text-sm border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // //                       System Status
// // //                     </p>
// // //                     <div className="space-y-2">
// // //                       <div className="flex items-center  justify-between ">
// // //                         <div className="flex items-center gap-2">
// // //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// // //                           <span className="text-xs sm:text-sm font-medium text-gray-600">
// // //                             API Status
// // //                           </span>
// // //                         </div>

// // //                         <div className="flex items-center gap-1.5">
// // //                           <span className="text-xs sm:text-sm text-slate-500 font-medium">
// // //                             Check monitoring
// // //                           </span>
// // //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// // //                         </div>
// // //                       </div>
// // //                       <div className="flex items-center justify-between">
// // //                         <div className="flex items-center gap-2">
// // //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// // //                           <span className="text-xs sm:text-sm  font-medium text-gray-600">
// // //                             Server Status
// // //                           </span>{" "}
// // //                         </div>

// // //                         {/* <span className="w-2 h-2 bg-green-400 rounded-full" /> */}
// // //                       </div>
// // //                       <p className="text-xs  text-[#787B7F] font-medium">
// // //                         Verify system health from monitoring
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           )}

// // //           {activeNav === "Users" && may("users") && (
// // //             <UsersSection
// // //               setShowNotice={setShowNotice}
// // //               permissions={
// // //                 staffAccess?.users ?? (staffAccess === null ? null : {})
// // //               }
// // //             />
// // //           )}

// // //           {/* {activeNav === "Roles & Permissions" && staffAccess === null && (
// // //             <RolesPermission openCreateIntent={createIntent} />
// // //           )} */}
          
// // // {activeNav === "Roles & Permissions" && staffAccess === null && (
// // //   // <button
// // //   //   type="button"
// // //   //   onClick={() => setCreateIntent((prev) => prev + 1)}
// // //   //   className="ml-auto flex shrink-0 items-center gap-2
// // //   //     bg-white text-[#0A8981] hover:bg-[#E6FFFA]
// // //   //     text-sm font-semibold px-5 py-2.5 rounded-xl
// // //   //     shadow-sm transition-all duration-200"
// // //   // >
// // //   //   <FiPlus size={16} />
// // //   //   Create Role
// // //   // </button>

// // //   <RolesPermission openCreateIntent={createIntent} />
// // // )}

// // //           {activeNav === "Sub-admins" && staffAccess === null && (
// // //             <SubAdmins openCreateIntent={createIntent} />
// // //           )}

// // //           {activeNav === "Plans/ Subscription" && may("plans") && (
// // //             <PlanSection
// // //               openCreateIntent={createIntent}
// // //               showAddPlan={showAddPlan}
// // //               setShowAddPlan={setShowAddPlan}
// // //               permissions={
// // //                 staffAccess?.plans ?? (staffAccess === null ? null : {})
// // //               }
// // //             />
// // //           )}

// // //           {/* //  {activeNav === "Master Data" && may("masterData") && <MasterData/>}
// // //           //  {activeNav === "HS Rules" && may("hsRules") && <HSRules/>}
// // //           //  {activeNav === "Country Rules" && may("countryRules") && <CountryRules/>}
// // //           //  {activeNav === "DGFT Schemes" && may("dgftSchemes") && <DGFTSchemes/>}

// // //           //  {activeNav === "Shipment" && may("shipment") && <Shipment /> }


// // //           //  {activeNav === "Vendors/ Partners" && may("vendors") && <VendorsPartners permissions={staffAccess?.vendors ?? (staffAccess === null ? null : {})} /> }
// // //           //  {activeNav === "AI Assistant" && may("aiAssistant") && <AiAssistant /> } */}

// // //           {activeNav === "Master Data" && may("masterData") && <MasterData />}
// // //           {activeNav === "HS Rules" && may("hsRules") && <HSRules />}
// // //           {activeNav === "Country Rules" && may("countryRules") && (
// // //             <CountryRules />
// // //           )}
// // //           {activeNav === "DGFT Schemes" && may("dgftSchemes") && (
// // //             <DGFTSchemes />
// // //           )}

// // //           {activeNav === "Shipment" && may("shipment") && <Shipment />}

// // //           {activeNav === "Notices" && (
// // //             <NoticesSection mode={noticeMode} setMode={setNoticeMode} />
// // //           )}
// // //           {activeNav === "Vendors/ Partners" && may("vendors") && (
// // //             <VendorsPartners />
// // //           )}
// // //           {activeNav === "AI Assistant" && may("aiAssistant") && (
// // //             <AiAssistant />
// // //           )}

// // //           {/* //  {activeNav === "Master Data" && <MasterData/>}
// // //           //  {activeNav === "HS Rules" && <HSRules/>}
// // //           //  {activeNav === "Country Rules" && <CountryRules/>}
// // //           //  {activeNav === "DGFT Schemes" && <DGFTSchemes/>}

// // //           //  {activeNav === "Shipment" && <Shipment /> }
// // //           //  {activeNav === "Notices" && <NoticesSection mode={noticeMode} setMode={setNoticeMode} /> }


// // //           //  {activeNav === "Vendors/ Partners" && <VendorsPartners /> }
// // //           //  {activeNav === "AI Assistant" && <AiAssistant /> } */}

// // //           {activeNav === "Trade Intelligence" && <TradeIntelligence />}

// // //           {activeNav === "API Integrations" && <APIIntegrations />}

// // //           {activeNav === "Ad Managment" && may("ads") && <AdManagement />}
// // //           {activeNav === "Support" && may("support") && <Support />}
// // //           {activeNav === "Modules" && <Modules />}
// // //           {activeNav === "Settings" && may("settings") && <Settings />}
// // //           {showBot && (
// // //             <WhatsappBot
// // //               showBot={showBot}
// // //               setShowBot={setShowBot}
// // //               fabOpen={fabOpen}
// // //               setFabOpen={setFabOpen}
// // //             />
// // //           )}

// // //           {/* <CreateNewInvoice /> */}
// // //         </main>
// // //       </div>
// // //       {messages && <MessagesModal onClose={() => setMessage(false)} />}
// // //       {notifications && (
// // //         <NotificationsModal onClose={() => setNotifications(false)} />
// // //       )}

// // //       {/* Modal removed - full page navigation used */}

// // //       {/* {showNotice && <CreateNotice setShowNotice={setShowNotice} />} */}
// // //       {fabOpen && (
// // //         <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
// // //       )}

// // //       <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
// // //         {fabOpen && (
// // //           <div className="flex flex-col gap-2 items-end mb-1">
// // //             {fabActions.map((a, i) => (
// // //               <button
// // //                 key={i}
// // //                 onClick={() => {
// // //                   handleFabAction(a.label);
// // //                   setActiveNav("");
// // //                 }}
// // //                 className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2.5 hover:bg-gray-50 transition-all"
// // //               >
// // //                 <span className="text-sm font-medium text-gray-700">
// // //                   {a.label}
// // //                 </span>
// // //                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
// // //                   {a.icon}
// // //                 </div>
// // //               </button>
// // //             ))}
// // //           </div>
// // //         )}
// // //         <button
// // //           onClick={() => setFabOpen(!fabOpen)}
// // //           className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${fabOpen ? "bg-gray-600" : "bg-teal-500 hover:bg-teal-600"}`}
// // //         >
// // //           {fabOpen ? <FiX size={22} /> : <FiPlus size={24} />}
// // //         </button>
// // //       </div>

// // //       {account && <MyAccount onClose={() => setAccount(false)} />}
// // //     </div>
// // //   );
// // // }

// // // {
// // //   /* import AccountProfile, {AccountBadge} from "../../../components/AccountProfile";
// // // import { useState, useEffect } from "react";
// // // import {
// // //   FiMenu,
// // //   FiSearch,
// // //   FiBell,
// // //   FiMail,
// // //   FiSun,
// // //   FiMoon,
// // //   FiPlus,
// // //   FiUsers,
// // //   FiShield,
// // //   FiCreditCard,
// // //   FiDatabase,
// // //   FiFileText,
// // //   FiGlobe,
// // //   FiPackage,
// // //   FiTruck,
// // //   FiCpu,
// // //   FiPieChart,
// // //   FiLink,
// // //   FiMonitor,
// // //   FiHelpCircle,
// // //   FiGrid,
// // //   FiSettings,
// // //   FiChevronRight,
// // //   FiUserPlus,
// // //   FiUserCheck,
// // //   FiPlusCircle,
// // //   FiAlertCircle,
// // //   FiCheckCircle,
// // //   FiXCircle,
// // //   FiHome,
// // //   FiCamera,
// // //   FiLock,
// // //   FiSend,
// // // } from "react-icons/fi";
// // // import {
// // //   FaTrash,
// // //   FaCheck,
// // //   FaBox,
// // //   FaBell,
// // //   FaChevronLeft,
// // //   FaFileLines,
// // //   FaListCheck,
// // //   FaGripVertical,
// // //   FaPlus,
// // //   FaSliders,
// // //   FaEye,
// // //   FaClock,
// // //   FaUser,
// // //   FaFloppyDisk,
// // //   FaPaperPlane,
// // //   FaUsers,
// // //   FaIndianRupeeSign,
// // //   FaRotate,
// // // } from "react-icons/fa6";

// // // import {
// // //   FiEdit,
// // //   FiTrash2,
// // //   FiCheck,
// // //   FiDollarSign,
// // //   FiRefreshCw,
// // //   FiUser,
// // // } from "react-icons/fi";
// // // import {
// // //   LineChart,
// // //   Line,
// // //   AreaChart,
// // //   Area,
// // //   BarChart,
// // //   Bar,
// // //   XAxis,
// // //   YAxis,
// // //   Tooltip,
// // //   ResponsiveContainer,
// // //   CartesianGrid,
// // // } from "recharts";
// // // import {
// // //   MdDashboard,
// // //   MdPeople,
// // //   MdSecurity,
// // //   MdSubscriptions,
// // //   MdStorage,
// // //   MdDescription,
// // //   MdPublic,
// // //   MdBusiness,
// // //   MdLocalShipping,
// // //   MdSmartToy,
// // //   MdInsights,
// // //   MdApi,
// // //   MdCampaign,
// // //   MdSupportAgent,
// // //   MdWidgets,
// // //   MdSettings,
// // // } from "react-icons/md";
// // // import { RxCross1 } from "react-icons/rx";
// // // import { FaCalendarAlt, FaTimes } from "react-icons/fa";

// // // import RolesPermission from "./RolesPermission";
// // // import SubAdmins from "./SubAdmins";
// // // import API from "../../api/axios";
// // // import Settings from './Settings'
// // // import MasterData from "./MasterData";
// // // import HSRules from "./HsRules";
// // // import CountryRules from "./CountryRules";
// // // import DGFTSchemes from "./DgftScheme";
// // // import Shipment from "./Shipment";
// // // import VendorsPartners from "./VendorsPartners";
// // // import AiAssistant from "./AiAssistant";
// // // import TradeIntelligence from "./TradeIntelligence";
// // // import Modules from "./Modules";
// // // import Support from "./Support";
// // // import APIIntegrations from "./ApiIntegrations";
// // // import AdManagement from "./AdManagement";
// // // import UsersSection from './Users'
// // // import PlanSection from "./PlansSubscriptions";
// // // import WhatsappBot from "./WhatsappBot";
// // // import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
// // // import { HiOutlineDocumentText } from "react-icons/hi";
// // // import { RiWhatsappLine } from "react-icons/ri";
// // // import { FiX, } from "react-icons/fi";
// // // import ai from '../../assets/icon/ai.png'
// // // import user from '../../assets/icon/user.png'
// // // import suppliers from '../../assets/icon/suppliers.png'
// // // import linear from '../../assets/icon/linear.png'
// // // import anal from '../../assets/icon/analytical.png'
// // // import vector from '../../assets/icon/vector.png'
// // // import time from '../../assets/icon/time.png'
// // // import document from '../../assets/icon/document.png'
// // // import order from '../../assets/icon/orders.png'

// // // import logo from "../../assets/Images/logo.png";
// // // import CreateNewInvoice from "./CreateNewInvoice";

// // // import MessagesModal from "../../components/Messages";
// // // import NotificationsModal from "../../components/Notifications";
// // // import MyAccount from "../admin/MyAccount";

// // // const fabActions = [
// // //   { label: "New Booking", icon: <BsCalendarCheck size={22} className="text-teal-600" /> },
// // //   { label: "Add Vendor", icon: <BsPersonPlus size={22} className="text-teal-600" /> },
// // //   { label: "Report", icon: <HiOutlineDocumentText size={22} className="text-teal-600" /> },
// // //   { label: "WhatsApp Bot", icon: <RiWhatsappLine size={22} className="text-teal-600" /> },
// // // ];


// // // const revenueLineData = [
// // //   { name: "Jun", value: 40 },
// // //   { name: "Feb", value: 70 },
// // //   { name: "Mar", value: 45 },
// // //   { name: "Apr", value: 60 },
// // //   { name: "May", value: 95 },
// // // ];

// // // const revenueBarData = [
// // //   { name: "Q1", a: 60, b: 40, c: 30 },
// // //   { name: "Q2", a: 80, b: 65, c: 50 },
// // //   { name: "Q3", a: 70, b: 55, c: 85 },
// // // ];

// // // const userGrowthData = [
// // //   { name: "Jan", value: 0 },
// // //   { name: "Feb", value: 30 },
// // //   { name: "Mar", value: 50 },
// // //   { name: "Apr", value: 50 },
// // //   { name: "May", value: 100 },
// // //   { name: "June", value: 50 },
// // //   { name: "July", value: 50 },
// // //   { name: "Aug", value: 60 },

// // //   { name: "Sep", value: 50 },
// // //   { name: "Oct", value: 150 },
// // // ];

// // // const navItems = [
// // //   { icon: MdDashboard, label: "Admin Dashboard", color: "text-orange-400" },
// // //   { icon: MdPeople, label: "Users", color: "text-yellow-400" },
// // //     { icon: MdPeople, label: "Vendors/ Partners", color: "text-green-400" },
// // //   { icon: MdSecurity, label: "Roles & Permissions", color: "text-purple-400" },
// // //   { icon: MdPeople, label: "Sub-admins", color: "text-teal-400" },
// // //   { icon: MdSubscriptions, label: "Plans/ Subscription", color: "text-teal-400" },
// // //   { icon: MdStorage, label: "Master Data", color: "text-blue-400" },
// // //   { icon: MdDescription, label: "HS Rules", color: "text-red-400" },
// // //   { icon: MdPublic, label: "Country Rules", color: "text-indigo-400" },
// // //   { icon: MdBusiness, label: "DGFT Schemes", color: "text-pink-400" },
// // //   { icon: MdLocalShipping, label: "Shipment", color: "text-cyan-400" },
// // //   { icon: MdAnnouncement, label: "Notices", color: "text-amber-400" },

// // //   { icon: MdSmartToy, label: "AI Assistant", color: "text-blue-500" },
// // //   // { icon: MdInsights, label: "Trade Intelligence", color: "text-rose-400" },
// // //   // { icon: MdApi, label: "API Integrations", color: "text-emerald-400" },
// // //   { icon: MdCampaign, label: "Ad Managment", color: "text-yellow-500" },
// // //   { icon: MdSupportAgent, label: "Support", color: "text-orange-500" },
// // //   // { icon: MdWidgets, label: "Modules", color: "text-indigo-500" },
// // //   { icon: MdSettings, label: "Settings", color: "text-gray-400" },
// // // ];

// // // const statCards = [
// // //   {
// // //     label: "Total Users",
// // //     value: "12,450",
// // //     icon: user,
// // //     bg:"bg-orange-100", 
// // //     color: "text-orange-400",
// // //   },
// // //   {
// // //     label: "Total Subscription",
// // //     value: "860",
// // //     icon: suppliers,
// // //     bg:"bg-orange-100", 
// // //     color: "text-yellow-500",
// // //   },
// // //   {
// // //     label: "Total Shipment",
// // //     value: "4,320",
// // //     icon: ai,
// // //     bg:"bg-sky-100", 
// // //     color: "text-blue-500",
// // //   },
// // //   {
// // //     label: "Revenue",
// // //     value: "128,500",
// // //     icon: linear,
// // //     bg:"bg-green-100", 
// // //     color: "text-green-500",
// // //   },
// // //   {
// // //     label: "Pending Approvals",
// // //     value: "15",
// // //     icon: time,
// // //     bg:"bg-yellow-100", 
// // //     color: "text-yellow-500",
// // //   },
// // //   {
// // //     label: "Active Vendors",
// // //     value: "32",
// // //     icon: vector,
// // //     bg:"bg-green-100", 
// // //     color: "text-green-500",
// // //   },
// // // ];

// // // const quickActions = [
// // //   { icon: user, label: "Add User" },
// // //   { icon: order, label: "Add Vendor" },
// // //   { icon: suppliers, label: "Add Plan" },
// // //   { icon: anal, label: "Add Hs Rule" },
// // //   { icon: document, label: "Add Country Rule" },
// // // ];

// // // const alerts = [
// // //   { count: 5, label: "Pending", color: "bg-red-500" },
// // //   { count: 2, label: "Compliance", color: "bg-orange-500" },
// // //   { count: 1, label: "API Failure Alert", color: "bg-yellow-500" },
// // // ];

// // // const recentActivity = [
// // //   { text: "Aditya Added a New Shipment", time: "5 min ago" },
// // //   { text: "Vendor xyz Approved", time: "20 min ago" },
// // //   { text: "Suresh Updated User Role", time: "1 hr ago" },
// // //   { text: "API Connection Failed", time: "1 hr ago" },
// // // ];

// // // function CreateNotice({ setShowNotice }) {
// // //   const [title, setTitle] = useState("");
// // //   const [desc, setDesc] = useState("");
// // //   const [date, setDate] = useState("");
// // //   const [image, setImage] = useState(null);
// // //   const [preview, setPreview] = useState(null);
// // //   const [errors, setErrors] = useState({});

// // //   const handleImage = (e) => {
// // //     const file = e.target.files[0];
// // //     if (file) {
// // //       setImage(file);
// // //       setPreview(URL.createObjectURL(file));
// // //     }
// // //   };

// // //   const removeImage = () => {
// // //     setImage(null);
// // //     setPreview(null);
// // //   };

// // //   const validate = () => {
// // //     let err = {};
// // //     if (!title.trim()) err.title = "Title required";
// // //     if (!desc.trim()) err.desc = "Description required";
// // //     if (!date) err.date = "Date required";
// // //     setErrors(err);
// // //     return Object.keys(err).length === 0;
// // //   };

// // //   const handleSubmit = () => {
// // //     if (!validate()) return;

// // //     const data = {
// // //       title,
// // //       desc,
// // //       date,
// // //       image,
// // //     };

// // //     console.log("Submit:", data);
// // //   };

// // //   return (
// // //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 sm:px-6">
// // //       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
// // //         <div className="flex items-center justify-between  mb-4">
// // //           <h2 className="text-lg sm:text-xl font-semibold ">Create Notice</h2>
// // //           <button>
// // //             <RxCross1 onClick={() => setShowNotice((prev) => !prev)} />
// // //           </button>
// // //         </div>

// // //         <div className="mb-3">
// // //           <label className="text-sm text-gray-700">Title</label>
// // //           <input
// // //             type="text"
// // //             placeholder="Give One Title"
// // //             value={title}
// // //             onChange={(e) => setTitle(e.target.value)}
// // //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// // //               errors.title
// // //                 ? "border-red-400 focus:ring-red-400"
// // //                 : "focus:ring-teal-500"
// // //             }`}
// // //           />
// // //           {errors.title && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
// // //           )}
// // //         </div>

// // //         <div className="mb-3">
// // //           <label className="text-sm text-gray-700">Description</label>
// // //           <textarea
// // //             rows="3"
// // //             placeholder="Type Description here..."
// // //             value={desc}
// // //             onChange={(e) => setDesc(e.target.value)}
// // //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 ${
// // //               errors.desc
// // //                 ? "border-red-400 focus:ring-red-400"
// // //                 : "focus:ring-teal-500"
// // //             }`}
// // //           />
// // //           {errors.desc && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
// // //           )}
// // //         </div>

// // //         <div className="mb-3 flex flex-col  ">
// // //           <label className="text-sm text-gray-700">Add image (optional)</label>

// // //           <label className="mt-2 self-start bg-teal-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-teal-600 transition">
// // //             Upload Image
// // //             <input
// // //               type="file"
// // //               accept="image/*"
// // //               onChange={handleImage}
// // //               className="hidden"
// // //             />
// // //           </label>

// // //           {preview && (
// // //             <div className="mt-3 relative w-32 h-32">
// // //               <img
// // //                 src={preview}
// // //                 alt="preview"
// // //                 className="w-full h-full object-cover rounded-md border"
// // //               />
// // //               <button
// // //                 onClick={removeImage}
// // //                 className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full text-sm"
// // //               >
// // //                 <FaTimes />
// // //               </button>
// // //             </div>
// // //           )}
// // //         </div>

// // //         <div className="mb-5">
// // //           <label className="text-sm text-gray-700">Schedule Date</label>
// // //           <div className="relative mt-1">
// // //             <input
// // //               type="date"
// // //               value={date}
// // //               onChange={(e) => setDate(e.target.value)}
// // //               className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// // //                 errors.date
// // //                   ? "border-red-400 focus:ring-red-400"
// // //                   : "focus:ring-teal-500"
// // //               }`}
// // //             />
// // //             {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-sm pointer-events-none" /> */
// // // }
// // // {
// // //   /* </div>
// // //           {errors.date && (
// // //             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
// // //           )}
// // //         </div>

// // //         <button
// // //           onClick={handleSubmit}
// // //           className="w-full bg-teal-500 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
// // //         >
// // //           Publish Notice
// // //         </button>

// // //         <button
// // //           type="button"
// // //           onClick={() => setShowNotice(false)}
// // //           className="w-full mt-2 border py-2 rounded-md text-sm text-gray-500 hover:bg-teal-500 hover:text-white transition"
// // //         >
// // //           Cancel
// // //         </button>
// // //       </div>
// // //     </div>
// // //   );
// // // }



// // // export default function AdminDashboard({profileMode=false}) {
// // //   const [sidebarOpen, setSidebarOpen] = useState(false);
// // //   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
// // //   const [activeNav, setActiveNav] = useState(profileMode ? "My Profile" : "Admin Dashboard");
// // //   const [staffAccess, setStaffAccess] = useState(null);
// // //   useEffect(() => {
// // //     let active=true;
// // //     API.get("/auth/me").then(({data}) => {
// // //       if (!active) return;
// // //       if (data?.user?.isInternalStaff) setStaffAccess(data.user.permissions || {});
// // //     }).catch(() => {});
// // //     return () => {active=false};
// // //   }, []);
// // //   const menuModules = {"Admin Dashboard":"dashboard","Users":"users","Vendors/ Partners":"vendors","Plans/ Subscription":"plans","Master Data":"masterData","HS Rules":"hsRules","Country Rules":"countryRules","DGFT Schemes":"dgftSchemes","Shipment":"shipment","AI Assistant":"aiAssistant","Ad Managment":"ads","Support":"support","Settings":"settings"};
// // //   const visibleAdminNav = staffAccess === null ? navItems : navItems.filter(item => !["Roles & Permissions","Sub-admins"].includes(item.label) && staffAccess[menuModules[item.label]]?.view === true);
// // //   // Never keep a sub-admin on a tab they cannot view, even when arriving via a direct link.
// // //   useEffect(() => {
// // //     if (staffAccess === null || profileMode) return;
// // //     const permitted = navItems.filter(item => !["Roles & Permissions", "Sub-admins"].includes(item.label) && staffAccess[menuModules[item.label]]?.view === true);
// // //     if (!permitted.some(item => item.label === activeNav)) setActiveNav(permitted[0]?.label || "Access Restricted");
// // //   }, [staffAccess, activeNav, profileMode]);
// // //   const may = (module, action="view") => staffAccess === null || staffAccess?.[module]?.[action] === true;

// // //   const [showNotice, setShowNotice] = useState(false);
// // //   const [showAddPlan, setShowAddPlan] = useState(false);
// // //    const [showBot, setShowBot] = useState(false);
// // //     const [fabOpen, setFabOpen] = useState(false);
// // //     const [messages, setMessage] = useState(false)
// // //   const [notifications, setNotifications] = useState(false)
// // //   const [account, setAccount] = useState(false)
  
// // //   const handleFabAction = (label) => {
// // //     if (label === "WhatsApp Bot") { setShowBot(true); setFabOpen(false); }
// // //     else setFabOpen(false);
// // //   };

// // //   return (
// // //     <div className="cargomate-admin-shell flex min-h-screen bg-[#F9FAFB] ">
// // //       {/* Overlay for mobile */
// // // }

// // // // {sidebarOpen && (
// // // //   <div
// // // //     className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
// // // //     onClick={() => setSidebarOpen(false)}
// // // //   />
// // // // )}

// // // // {/* Sidebar */}
// // // // <aside
// // // //   className={`
// // // //     fixed lg:static inset-y-0 left-0 z-30 w-52 xl:w-60
// // // //       text-white bg-white flex flex-col
// // // //     transform transition-transform duration-300 ease-in-out
// // // //     ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
// // // //     ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
// // // //   `}
// // // // >
// // // //   {/* Logo */}
// // // //   <div className="flex items-center gap-2 px-4 py-2 justify-center border-b border-gray-700">

// // // //      <img src={logo} className="h-12" />
// // // //   </div>

// // // //   {/* Nav */}
// // // //   <nav className="flex-1 overflow-y-auto pr-3 py-7 space-y-0.5 bg-gray-900">
// // // //     {visibleAdminNav.map(({ icon: Icon, label, color }) => (
// // // //       <button
// // // //         key={label}
// // // //         onClick={() => {
// // // //           setActiveNav(label);
// // // //           if (label === "Notices") setNoticeMode("list");
// // // //           setShowBot(false)
// // // //           setSidebarOpen(false);
// // // //         }}
// // // //         className={`w-full flex items-center gap-2 py-3 pl-10 rounded-r-lg  text-md font-semibold transition-colors text-left
// // // //           ${
// // // //             activeNav === label
// // // //               ? "bg-teal-500 text-white"
// // // //               : "text-gray-400 hover:bg-gray-700 hover:text-white"
// // // //           }`}
// // // //       >
// // // //         <Icon size={18} className={`${color} flex-shrink-0`} />
// // // //         <span className="truncate text-[0.9rem] ">{label}</span>
// // // //       </button>
// // // //     ))}
// // // //   </nav>
// // // // </aside>

// // // // <div className="flex-1 flex flex-col w-full">
// // // //   {/* Topbar */}
// // // //   <header className="bg-white border-b border-gray-200  px-3 sm:px-4 py-1 flex items-center gap-3 flex-shrink-0">
// // // //     <button
// // // //       className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
// // // //       title="Toggle admin sidebar"
// // // //       aria-label="Toggle admin sidebar"
// // // //       onClick={() => {if(window.innerWidth>=1024)setDesktopSidebarVisible(v=>!v);else setSidebarOpen(true)}}
// // // //     >
// // // //       <FiMenu size={18} />
// // // //     </button>

// // // //     <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
// // // //       <div className="relative">
// // // //         <FiSearch
// // // //           className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
// // // //           size={14}
// // // //         />
// // // //         <input
// // // //           type="text"
// // // //           placeholder="Search"
// // // //           className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
// // // //         />
// // // //       </div>
// // // //     </div>

// // // //       <div className="flex items-center gap-1.5 ml-auto">
// // // //       <button onClick={() => setNotifications(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative">
// // // //            <FiBell size={16} />
// // // //            <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
// // // //          </button>
// // // //          <button onClick={() => setMessage(true)} className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600">
// // // //            <FiMail size={16} />
// // // //          </button>

// // // //       <AccountBadge />
// // // //     </div>
// // // //   </header>

// // // //   {/* Page Content */}

// // // //   <main className="flex-1 overflow-y-auto overflow-x-hidden bg-gray-50 p-3 sm:p-4 min-w-0">
// // // //     {activeNav === "My Profile" && <AccountProfile embedded />}
// // // //     {activeNav === "Admin Dashboard" && (
// // // //       <div className="">
// // // //         <div
// // // //           className="flex justify-end mb-3  "
// // // //         >
// // // //           <button onClick={() => { setActiveNav("Notices"); setNoticeMode("create"); }}
// // // //             className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white
// // // //       text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
// // // //           >
// // // //             <FiPlus size={13} />
// // // //             <span> Create Notice</span>
// // // //           </button>
// // // //         </div>

// // // //         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-2 sm:gap-3 mb-4">
// // // //           {statCards.map(({ label, value, icon: Icon, color, bg }) => (
// // // //             <div
// // // //             onClick={() => {
// // // //               if(label === "Total Users") {
// // // //                   setActiveNav("Users")
// // // //               }else if(label === "Active Vendors") {
// // // //                  setActiveNav("Vendors/ Partners")
// // // //               }
// // // //             }}
// // // //               key={label}
// // // //               className="bg-white cursor-pointer  rounded-xl p-3 shadow-md border border-gray-100 flex flex-col gap-1"
// // // //             >
// // // //               <p className="text-gray-500 text-sm font-medium  leading-tight">
// // // //                 {label}
// // // //               </p>
// // // //               <div className="flex items-center justify-between">
// // // //                 <p className="text-gray-800 font-bold text-sm sm:text-base">
// // // //                   {value}
// // // //                 </p>
// // // //                 <div className={`${bg} w-7 h-7 flex items-center justify-center rounded-md`}>
// // // //                 {
// // // //                   typeof Icon === "string" ? (
// // // //                     <img src={Icon} alt="icon" className="w-4 h-4" />
// // // //                   ) : (
// // // //                     <Icon className={color} size={16} />
// // // //                   )
// // // //                 } </div>

// // // //               </div>
// // // //             </div>
// // // //           ))}
// // // //         </div>

// // // //         {/* Charts Row 1 */}
// // // //         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
// // // //           {/* Area Chart */}
// // // //           <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-100 ">
// // // //             <p className="text-xs sm:text-base  xl:text-lg font-semibold text-gray-500 mb-3">
// // // //               Revenue Growth
// // // //             </p>
// // // //             <ResponsiveContainer width="100%" height={140}>
// // // //               <AreaChart data={revenueLineData}>
// // // //                 <defs>
// // // //                   <linearGradient
// // // //                     id="colorVal"
// // // //                     x1="0"
// // // //                     y1="0"
// // // //                     x2="0"
// // // //                     y2="1"
// // // //                   >
// // // //                     <stop
// // // //                       offset="5%"
// // // //                       stopColor="#3b82f6"
// // // //                       stopOpacity={0.3}
// // // //                     />
// // // //                     <stop
// // // //                       offset="95%"
// // // //                       stopColor="#3b82f6"
// // // //                       stopOpacity={0}
// // // //                     />
// // // //                   </linearGradient>
// // // //                 </defs>
// // // //                 <CartesianGrid
// // // //                   strokeDasharray="4 4"
// // // //                   stroke="#d1d5db"
// // // //                   strokeOpacity={0.8}
// // // //                   vertical={false}
// // // //                 />
// // // //                 <XAxis
// // // //                   dataKey="name"
// // // //                   tick={{ fontSize: 10 }}
// // // //                   axisLine={false}
// // // //                   tickLine={false}
// // // //                 />
// // // //                 <Tooltip contentStyle={{ fontSize: 11 }} />
// // // //                 <Area
// // // //                   type="monotone"
// // // //                   dataKey="value"
// // // //                   stroke="#3b82f6"
// // // //                   strokeWidth={2}
// // // //                   fill="url(#colorVal)"
// // // //                 />
// // // //               </AreaChart>
// // // //             </ResponsiveContainer>
// // // //           </div>

// // // //           {/* Bar Chart */}
// // // //           <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // // //             <p className="text-xs sm:text-base xl:text-lg font-semibold text-gray-500 mb-3">
// // // //               Revenue Growth
// // // //             </p>
// // // //             <ResponsiveContainer width="100%" height={140}>
// // // //               <BarChart data={revenueBarData} barCategoryGap="30%">
// // // //               <CartesianGrid
// // // //                   strokeDasharray="4 4"
// // // //                   stroke="#d1d5db"
// // // //                   strokeOpacity={0.8}
// // // //                   vertical={false}
// // // //                 />
// // // //                 <XAxis
// // // //                   dataKey="name"
// // // //                   tick={{ fontSize: 10 }}
// // // //                   axisLine={false}
// // // //                   tickLine={false}
// // // //                 />
// // // //                 <Tooltip contentStyle={{ fontSize: 11 }} />
// // // //                 <Bar dataKey="a" fill="#3b82f6" radius={[3, 3, 0, 0]} />
// // // //                 <Bar dataKey="b" fill="#93c5fd" radius={[3, 3, 0, 0]} />
// // // //                 <Bar dataKey="c" fill="#f59e0b" radius={[3, 3, 0, 0]} />
// // // //               </BarChart>
// // // //             </ResponsiveContainer>
// // // //           </div>
// // // //         </div>

// // // //         {/* Bottom Row */}
// // // //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// // // //           {/* Quick Actions */}
// // // //           <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 h-fit ">
// // // //             <p className="text-sm sm:text-base xl:text-lg  border-b-2 font-medium text-gray-800 mb-3">
// // // //               Quick Action
// // // //             </p>
// // // //             <div className="space-y-2">
// // // //               {quickActions.map(({ icon: Icon, label }) => (
// // // //                 <button
// // // //                   key={label}
// // // //                   className="w-full flex items-center shadow-sm  gap-2 px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 text-sm text-gray-700 transition-colors"
// // // //                 >
// // // //                    {
// // // //                   typeof Icon === "string" ? (
// // // //                     <img src={Icon} alt="icon" className="w-4 h-4" />
// // // //                   ) : (
// // // //                     <Icon  size={13} className="text-teal-500 flex-shrink-0" />
// // // //                   )
// // // //                 }

// // // //                   <span className="font-medium">{label}</span>
// // // //                 </button>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* User Growth */}
// // // //           <div className="rounded-xl p-0 flex flex-col">
// // // //             <div className="shadow-md border p-3 rounded-xl sm:p-4 border-gray-100 bg-white">
// // // //               <p className="text-xs sm:text-base  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // // //                 User Growth
// // // //               </p>
// // // //               <div className="flex-1">
// // // //               <ResponsiveContainer width="100%" height={160}>
// // // //                     <AreaChart
// // // //                       data={userGrowthData}
// // // //                       margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
// // // //                     >
// // // //                       <defs>
// // // //                         <linearGradient
// // // //                           id="ugGrad"
// // // //                           x1="0"
// // // //                           y1="0"
// // // //                           x2="0"
// // // //                           y2="1"
// // // //                         >
// // // //                           <stop
// // // //                             offset="5%"
// // // //                             stopColor="#3b82f6"
// // // //                             stopOpacity={0.25}
// // // //                           />
// // // //                           <stop
// // // //                             offset="95%"
// // // //                             stopColor="#3b82f6"
// // // //                             stopOpacity={0}
// // // //                           />
// // // //                         </linearGradient>
// // // //                       </defs>

// // // //                       <CartesianGrid
// // // //                         strokeDasharray="6 6"
// // // //                         stroke="#d1d5db"
// // // //                         vertical={false}
// // // //                         strokeOpacity={0.8}
// // // //                       />

// // // //                       <XAxis
// // // //                         dataKey="name"
// // // //                         tick={{ fontSize: 10 }}
// // // //                         axisLine={false}
// // // //                         tickLine={false}
// // // //                       />

// // // //                       <YAxis
// // // //                         hide
// // // //                         domain={['auto', 'auto']}
// // // //                       />

// // // //                       <Tooltip contentStyle={{ fontSize: 11 }} />

// // // //                       <Area
// // // //                         type="monotone"
// // // //                         dataKey="value"
// // // //                         stroke="#3b82f6"
// // // //                         strokeWidth={2}
// // // //                         fill="url(#ugGrad)"
// // // //                       />
// // // //                     </AreaChart>
// // // //                   </ResponsiveContainer>
// // // //               </div>
// // // //             </div>

// // // //             {/* Recent Activity below on mobile / same card medium+ */}
// // // //             <div className="mt-3 pt-3 border-t border-gray-100 shadow-md rounded-xl p-3 sm:p-4 bg-white">
// // // //               <p className="text-sm sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-2">
// // // //                 Recent Activity
// // // //               </p>
// // // //               <div className="space-y-1.5">
// // // //                 {recentActivity.map(({ text, time }, i) => (
// // // //                   <div
// // // //                     key={i}
// // // //                     className="flex justify-between items-start gap-2"
// // // //                   >
// // // //                     <p className="text-[0.8rem]  sm:text-sm font-medium text-[#4D4D4D]  leading-snug">
// // // //                       {text}
// // // //                     </p>
// // // //                     <p
// // // //                       className=" text-xs sm:text-sm text-[#9A9A9A]    font-medium flex-shrink-0"

// // // //                     >
// // // //                       {time}
// // // //                     </p>
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>
// // // //           </div>

// // // //           {/* Alerts + System Status */}
// // // //           <div className="flex flex-col gap-3">
// // // //             <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // // //               <p className="text-xs sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // // //                 Alert & Notification
// // // //               </p>
// // // //               <div className="space-y-2">
// // // //                 {alerts.map(({ count, label, color }) => (
// // // //                   <div
// // // //                     key={label}
// // // //                     className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0"
// // // //                   >
// // // //                     <div className="flex items-center gap-2">
// // // //                       <span
// // // //                         className={`${color} text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0`}
// // // //                       >
// // // //                         {count}
// // // //                       </span>
// // // //                       <span className="text-xs sm:text-base  font-medium text-gray-700">
// // // //                         {label}
// // // //                       </span>
// // // //                     </div>
// // // //                     <FiChevronRight size={20} className="text-xs sm:text-sm font-mediumtext-gray-400" />
// // // //                   </div>
// // // //                 ))}
// // // //               </div>
// // // //             </div>

// // // //             <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// // // //               <p className="text-xs sm:text-sm border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// // // //                 System Status
// // // //               </p>
// // // //               <div className="space-y-2">
// // // //                 <div className="flex items-center  justify-between ">
// // // //                   <div className="flex items-center gap-2">
// // // //                   <span className="w-2 h-2 bg-green-400 rounded-full" />
// // // //                     <span className="text-xs sm:text-sm font-medium text-gray-600">

// // // //                     API Status
// // // //                   </span>
// // // //                    </div>

// // // //                   <div className="flex items-center gap-1.5">
// // // //                     <span className="text-xs sm:text-sm text-green-400 font-medium">
// // // //                       Active
// // // //                     </span>
// // // //                     <span className="w-2 h-2 bg-green-400 rounded-full" />
// // // //                   </div>
// // // //                 </div>
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div className="flex items-center gap-2">
// // // //                     <span className="w-2 h-2 bg-green-400 rounded-full" />

// // // //                   <span className="text-xs sm:text-sm  font-medium text-gray-600">
// // // //                     Server Status
// // // //                   </span> </div>

// // // //                   {/* <span className="w-2 h-2 bg-green-400 rounded-full" /> */}
// // // //                 </div>
// // // //                 <p className="text-xs  text-[#787B7F] font-medium">
// // // //                   All System Operational
// // // //                 </p>
// // // //               </div>
// // // //             </div>
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // // )}
// // // {
// // //   /* 
// // //           {activeNav === "Users" && may("users") && (
// // //             <UsersSection setShowNotice={setShowNotice} />
// // //           )}

// // //           {activeNav === "Roles & Permissions" && staffAccess === null && <RolesPermission/>}
// // //           {activeNav === "Sub-admins" && staffAccess === null && <SubAdmins/>}

// // //           {activeNav === "Plans/ Subscription" && may("plans") && (
// // //             <PlanSection
// // //               showAddPlan={showAddPlan}
// // //               setShowAddPlan={setShowAddPlan}
// // //             />
// // //           )}

// // //            {activeNav === "Master Data" && may("masterData") && <MasterData/>}
// // //            {activeNav === "HS Rules" && may("hsRules") && <HSRules/>}
// // //            {activeNav === "Country Rules" && may("countryRules") && <CountryRules/>}
// // //            {activeNav === "DGFT Schemes" && may("dgftSchemes") && <DGFTSchemes/>}

// // //            {activeNav === "Shipment" && may("shipment") && <Shipment /> }


// // //            {activeNav === "Vendors/ Partners" && may("vendors") && <VendorsPartners /> }
// // //            {activeNav === "AI Assistant" && may("aiAssistant") && <AiAssistant /> }
// // //            {activeNav === "Trade Intelligence" && <TradeIntelligence /> }

// // //            {activeNav === "API Integrations" && <APIIntegrations/> }
           
// // //            {activeNav === "Ad Managment" && may("ads") && <AdManagement/> }
// // //            {activeNav === "Support" && may("support") && <Support /> }
// // //            {activeNav === "Modules" && <Modules /> } 
// // //            {activeNav === "Settings" && may("settings") && <Settings/>}
// // //             {showBot && <WhatsappBot showBot={showBot} setShowBot={setShowBot} fabOpen={fabOpen} setFabOpen={setFabOpen}/>  }


        
// // //            {/* <CreateNewInvoice /> */
// // // }
// // // //         </main>
// // // //       </div>
// // // //           {messages && (<MessagesModal onClose={() => setMessage(false)} />)}
// // // //           {notifications && (<NotificationsModal onClose={() => setNotifications(false)} />)}

// // // //       {showNotice && <CreateNotice setShowNotice={setShowNotice} />}

// // // //       {fabOpen && <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />}

// // // //       <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
// // // //         {fabOpen && (
// // // //           <div className="flex flex-col gap-2 items-end mb-1">
// // // //             {fabActions.map((a, i) => (
// // // //               <button key={i} onClick={() => {
// // // //                 handleFabAction(a.label)
// // // //                 setActiveNav("")
// // // //               }} className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2.5 hover:bg-gray-50 transition-all">
// // // //                 <span className="text-sm font-medium text-gray-700">{a.label}</span>
// // // //                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">{a.icon}</div>
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         )}
// // // //         <button onClick={() => setFabOpen(!fabOpen)} className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${fabOpen ? "bg-gray-600" : "bg-teal-500 hover:bg-teal-600"}`}>
// // // //           {fabOpen ? <FiX size={22} /> : <FiPlus size={24} />}
// // // //         </button>
// // // //       </div>

// // // //       {account && <MyAccount onClose={() => setAccount(false)} />}

// // // //     </div>
// // // //   );
// // // // }



// // // mahima code //
// // import "./CargoMateAdminTheme2026.css";
// // import { usePublicConfig } from "../../../lib/publicConfig";
// // import AccountProfile, {
// //   AccountBadge,
// // } from "../../../components/AccountProfile";
// // import { clearSession } from "../../../lib/auth";
// // import { useNavigate } from "react-router-dom";
// // import { useState, useEffect } from "react";
// // import {
// //   FiMenu,
// //   FiSearch,
// //   FiBell,
// //   FiMail,
// //   FiSun,
// //   FiMoon,
// //   FiPlus,
// //   FiUsers,
// //   FiShield,
// //   FiCreditCard,
// //   FiDatabase,
// //   FiFileText,
// //   FiGlobe,
// //   FiPackage,
// //   FiTruck,
// //   FiCpu,
// //   FiPieChart,
// //   FiLink,
// //   FiMonitor,
// //   FiHelpCircle,
// //   FiGrid,
// //   FiSettings,
// //   FiChevronRight,
// //   FiUserPlus,
// //   FiUserCheck,
// //   FiPlusCircle,
// //   FiAlertCircle,
// //   FiCheckCircle,
// //   FiXCircle,
// //   FiHome,
// //   FiCamera,
// //   FiLock,
// //   FiSend,
// // } from "react-icons/fi";
// // import {
// //   FaTrash,
// //   FaCheck,
// //   FaBox,
// //   FaBell,
// //   FaChevronLeft,
// //   FaFileLines,
// //   FaListCheck,
// //   FaGripVertical,
// //   FaPlus,
// //   FaSliders,
// //   FaEye,
// //   FaClock,
// //   FaUser,
// //   FaFloppyDisk,
// //   FaPaperPlane,
// //   FaUsers,
// //   FaIndianRupeeSign,
// //   FaRotate,
// // } from "react-icons/fa6";

// // import {
// //   FiEdit,
// //   FiTrash2,
// //   FiCheck,
// //   FiDollarSign,
// //   FiRefreshCw,
// //   FiUser,
// // } from "react-icons/fi";
// // import {
// //   LineChart,
// //   Line,
// //   AreaChart,
// //   Area,
// //   BarChart,
// //   Bar,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// //   ResponsiveContainer,
// //   CartesianGrid,
// // } from "recharts";
// // import {
// //   MdDashboard,
// //   MdPeople,
// //   MdSecurity,
// //   MdSubscriptions,
// //   MdStorage,
// //   MdDescription,
// //   MdPublic,
// //   MdBusiness,
// //   MdLocalShipping,
// //   MdAnnouncement,
// //   MdSmartToy,
// //   MdInsights,
// //   MdApi,
// //   MdCampaign,
// //   MdSupportAgent,
// //   MdWidgets,
// //   MdSettings,
// // } from "react-icons/md";
// // import { RxCross1 } from "react-icons/rx";
// // import { FaCalendarAlt, FaTimes } from "react-icons/fa";

// // import RolesPermission from "./RolesPermission";
// // import SubAdmins from "./SubAdmins";
// // import API from "../../api/axios";
// // import Settings from "./Settings";
// // import MasterData from "./MasterData";
// // import HSRules from "./HsRules";
// // import CountryRules from "./CountryRules";
// // import DGFTSchemes from "./DgftScheme";
// // import Shipment from "./Shipment";
// // import VendorsPartners from "./VendorsPartners";
// // import NoticesSection from "./Notices";
// // import AdminNotifications from "./AdminNotifications";
// // import AiAssistant from "./AiAssistant";
// // import TradeIntelligence from "./TradeIntelligence";
// // import Modules from "./Modules";
// // import Support from "./Support";
// // import APIIntegrations from "./ApiIntegrations";
// // import AdManagement from "./AdManagement";
// // import UsersSection from "./Users";
// // import PlanSection from "./PlansSubscriptions";
// // import WhatsappBot from "./WhatsappBot";
// // import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
// // import { HiOutlineDocumentText } from "react-icons/hi";
// // import { RiWhatsappLine } from "react-icons/ri";
// // import { FiX } from "react-icons/fi";
// // import ai from "../../assets/icon/ai.png";
// // import user from "../../assets/icon/user.png";
// // import suppliers from "../../assets/icon/suppliers.png";
// // import linear from "../../assets/icon/linear.png";
// // import anal from "../../assets/icon/analytical.png";
// // import vector from "../../assets/icon/vector.png";
// // import time from "../../assets/icon/time.png";
// // import document from "../../assets/icon/document.png";
// // import order from "../../assets/icon/orders.png";

// // import logo from "../../assets/Images/logo.png";
// // import CreateNewInvoice from "./CreateNewInvoice";

// // import MessagesModal from "../../components/Messages";
// // import NotificationsModal from "../../components/Notifications";
// // import MyAccount from "../admin/MyAccount";

// // const fabActions = [
// //   {
// //     label: "New Booking",
// //     icon: <BsCalendarCheck size={22} className="text-teal-600" />,
// //   },
// //   {
// //     label: "Add Vendor",
// //     icon: <BsPersonPlus size={22} className="text-teal-600" />,
// //   },
// //   {
// //     label: "Report",
// //     icon: <HiOutlineDocumentText size={22} className="text-teal-600" />,
// //   },
// //   {
// //     label: "WhatsApp Bot",
// //     icon: <RiWhatsappLine size={22} className="text-teal-600" />,
// //   },
// // ];

// // const navItems = [
// //   { icon: MdDashboard, label: "Admin Dashboard", color: "text-orange-400" },
// //   { icon: MdPeople, label: "Users", color: "text-yellow-400" },
// //   { icon: MdPeople, label: "Vendors/ Partners", color: "text-green-400" },
// //   { icon: MdSecurity, label: "Roles & Permissions", color: "text-purple-400" },
// //   { icon: MdPeople, label: "Sub-admins", color: "text-teal-400" },
// //   {
// //     icon: MdSubscriptions,
// //     label: "Plans/ Subscription",
// //     color: "text-teal-400",
// //   },
// //   { icon: MdStorage, label: "Master Data", color: "text-blue-400" },
// //   { icon: MdDescription, label: "HS Rules", color: "text-red-400" },
// //   { icon: MdPublic, label: "Country Rules", color: "text-indigo-400" },
// //   { icon: MdBusiness, label: "DGFT Schemes", color: "text-pink-400" },
// //   { icon: MdLocalShipping, label: "Shipment", color: "text-cyan-400" },
// //   { icon: MdAnnouncement, label: "Notices", color: "text-amber-400" },
// //   { icon: FiBell, label: "Notifications", color: "text-teal-400" },

// //   { icon: MdSmartToy, label: "AI Assistant", color: "text-blue-500" },
// //   // { icon: MdInsights, label: "Trade Intelligence", color: "text-rose-400" },
// //   // { icon: MdApi, label: "API Integrations", color: "text-emerald-400" },
// //   { icon: MdCampaign, label: "Ad Managment", color: "text-yellow-500" },
// //   { icon: MdSupportAgent, label: "Support", color: "text-orange-500" },
// //   // { icon: MdWidgets, label: "Modules", color: "text-indigo-500" },
// //   { icon: MdSettings, label: "Settings", color: "text-gray-400" },
// // ];

// // const quickActions = [
// //   { icon: user, label: "Add User" },
// //   { icon: order, label: "Add Vendor" },
// //   { icon: FiShield, label: "Add Role" },
// //   { icon: FiUserPlus, label: "Add Sub-admin" },
// //   { icon: suppliers, label: "Add Plan" },
// //   { icon: FiPlus, label: "Create Notice" },
// //   { icon: anal, label: "Add Hs Rule" },
// //   { icon: document, label: "Add Country Rule" },
// // ];

// // function CreateNotice({ setShowNotice }) {
// //   const [title, setTitle] = useState("");
// //   const [desc, setDesc] = useState("");
// //   const [date, setDate] = useState("");
// //   const [image, setImage] = useState(null);
// //   const [preview, setPreview] = useState(null);
// //   const [errors, setErrors] = useState({});

// //   const handleImage = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setImage(file);
// //       setPreview(URL.createObjectURL(file));
// //     }
// //   };

// //   const removeImage = () => {
// //     setImage(null);
// //     setPreview(null);
// //   };

// //   const validate = () => {
// //     let err = {};
// //     if (!title.trim()) err.title = "Title required";
// //     if (!desc.trim()) err.desc = "Description required";
// //     if (!date) err.date = "Date required";
// //     setErrors(err);
// //     return Object.keys(err).length === 0;
// //   };

// //   const handleSubmit = () => {
// //     if (!validate()) return;

// //     const data = {
// //       title,
// //       desc,
// //       date,
// //       image,
// //     };

// //     console.log("Submit:", data);
// //   };

// //   return (
// //     <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 sm:px-6">
// //       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
// //         <div className="flex items-center justify-between  mb-4">
// //           <h2 className="text-lg sm:text-xl font-semibold ">Create Notice</h2>
// //           <button>
// //             <RxCross1 onClick={() => setShowNotice((prev) => !prev)} />
// //           </button>
// //         </div>

// //         <div className="mb-3">
// //           <label className="text-sm text-gray-700">Title</label>
// //           <input
// //             type="text"
// //             placeholder="Give One Title"
// //             value={title}
// //             onChange={(e) => setTitle(e.target.value)}
// //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// //               errors.title
// //                 ? "border-red-400 focus:ring-red-400"
// //                 : "focus:ring-teal-500"
// //             }`}
// //           />
// //           {errors.title && (
// //             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
// //           )}
// //         </div>

// //         <div className="mb-3">
// //           <label className="text-sm text-gray-700">Description</label>
// //           <textarea
// //             rows="3"
// //             placeholder="Type Description here..."
// //             value={desc}
// //             onChange={(e) => setDesc(e.target.value)}
// //             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 ${
// //               errors.desc
// //                 ? "border-red-400 focus:ring-red-400"
// //                 : "focus:ring-teal-500"
// //             }`}
// //           />
// //           {errors.desc && (
// //             <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
// //           )}
// //         </div>

// //         <div className="mb-3 flex flex-col  ">
// //           <label className="text-sm text-gray-700">Add image (optional)</label>

// //           <label className="mt-2 self-start bg-teal-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-teal-600 transition">
// //             Upload Image
// //             <input
// //               type="file"
// //               accept="image/*"
// //               onChange={handleImage}
// //               className="hidden"
// //             />
// //           </label>

// //           {preview && (
// //             <div className="mt-3 relative w-32 h-32">
// //               <img
// //                 src={preview}
// //                 alt="preview"
// //                 className="w-full h-full object-cover rounded-md border"
// //               />
// //               <button
// //                 onClick={removeImage}
// //                 className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full text-sm"
// //               >
// //                 <FaTimes />
// //               </button>
// //             </div>
// //           )}
// //         </div>

// //         <div className="mb-5">
// //           <label className="text-sm text-gray-700">Schedule Date</label>
// //           <div className="relative mt-1">
// //             <input
// //               type="date"
// //               value={date}
// //               onChange={(e) => setDate(e.target.value)}
// //               className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
// //                 errors.date
// //                   ? "border-red-400 focus:ring-red-400"
// //                   : "focus:ring-teal-500"
// //               }`}
// //             />
// //             {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-sm pointer-events-none" /> */}
// //           </div>
// //           {errors.date && (
// //             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
// //           )}
// //         </div>

// //         <button
// //           onClick={handleSubmit}
// //           className="w-full bg-teal-500 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
// //         >
// //           Publish Notice
// //         </button>

// //         <button
// //           type="button"
// //           onClick={() => setShowNotice(false)}
// //           className="w-full mt-2 border py-2 rounded-md text-sm text-gray-500 hover:bg-teal-500 hover:text-white transition"
// //         >
// //           Cancel
// //         </button>
// //       </div>
// //     </div>
// //   );
// // }

// // export default function AdminDashboard({ profileMode = false }) {
// //   const navigate = useNavigate();
// //   const siteBranding = usePublicConfig();
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
// //   const [activeNav, setActiveNav] = useState(
// //     profileMode ? "My Profile" : "Admin Dashboard",
// //   );
// //   // React may reuse the dashboard instance when navigating to /admin-profile.
// //   // Reset the section so an open User/Vendor drawer cannot cover the profile route.
// //   useEffect(() => {
// //     setActiveNav(profileMode ? "My Profile" : "Admin Dashboard");
// //   }, [profileMode]);
// //   const [staffAccess, setStaffAccess] = useState(null);
// //   useEffect(() => {
// //     let active = true;
// //     const refreshEffectivePermissions = () => API.get("/auth/me")
// //       .then(({ data }) => {
// //         if (!active) return;
// //         // Backend is authoritative: refresh when returning to the tab after role changes.
// //         setStaffAccess(data?.user?.isInternalStaff ? (data.user.permissions || {}) : null);
// //       })
// //       .catch(() => {
// //         // Never treat an unreadable role as unrestricted Admin access.
// //         if (active) setStaffAccess({});
// //       });
// //     refreshEffectivePermissions();
// //     window.addEventListener("focus", refreshEffectivePermissions);
// //     return () => {
// //       active = false;
// //       window.removeEventListener("focus", refreshEffectivePermissions);
// //     };
// //   }, []);
// //   const menuModules = {
// //     "Admin Dashboard": "dashboard",
// //     Users: "users",
// //     "Vendors/ Partners": "vendors",
// //     "Plans/ Subscription": "plans",
// //     "Master Data": "masterData",
// //     "HS Rules": "hsRules",
// //     "Country Rules": "countryRules",
// //     "DGFT Schemes": "dgftSchemes",
// //     Shipment: "shipment",
// //     Notices: "dashboard",
// //     Notifications: "dashboard",
// //     "AI Assistant": "aiAssistant",
// //     "Ad Managment": "ads",
// //     "Trade Intelligence": "tradeIntelligence",
// //     "API Integrations": "integrations",
// //     Modules: "modules",
// //     Support: "support",
// //     Settings: "settings",
// //   };
// //   const visibleAdminNav =
// //     staffAccess === null
// //       ? navItems
// //       : navItems.filter(
// //           (item) =>
// //             !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
// //             staffAccess[menuModules[item.label]]?.view === true,
// //         );
// //   // Never keep a sub-admin on a tab they cannot view, even when arriving via a direct link.
// //   useEffect(() => {
// //     if (staffAccess === null || profileMode) return;
// //     const permitted = navItems.filter(
// //       (item) =>
// //         !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
// //         staffAccess[menuModules[item.label]]?.view === true,
// //     );
// //     if (!permitted.some((item) => item.label === activeNav))
// //       setActiveNav(permitted[0]?.label || "Access Restricted");
// //   }, [staffAccess, activeNav, profileMode]);
// //   const may = (module, action = "view") =>
// //     staffAccess === null || staffAccess?.[module]?.[action] === true;

// //   const [showNotice, setShowNotice] = useState(false);
// //   const [showAddPlan, setShowAddPlan] = useState(false);
// //   const [showBot, setShowBot] = useState(false);
// //   const [fabOpen, setFabOpen] = useState(false);
// //   const [messages, setMessage] = useState(false);
// //   const [noticeMode, setNoticeMode] = useState("list");
// //   const [notifications, setNotifications] = useState(false);
// //   const [account, setAccount] = useState(false);

// //   const [createIntent, setCreateIntent] = useState(0);
// //   const [dashboardData, setDashboardData] = useState(null);
// //   const [dashboardError, setDashboardError] = useState("");
// //   const refreshDashboard = async () => {
// //     try {
// //       const { data } = await API.get("/admin/dashboard");
// //       setDashboardData(data);
// //       setDashboardError("");
// //     } catch (e) {
// //       setDashboardError(
// //         e.response?.data?.message || "Dashboard data unavailable",
// //       );
// //     }
// //   };
// //   useEffect(() => {
// //     if (activeNav === "Admin Dashboard") refreshDashboard();
// //   }, [activeNav]);
// //   const dashboardStats = dashboardData?.stats || {};
// //   const dashboardCards = [
// //     {
// //       label: "Total Users",
// //       value: dashboardStats.totalUsers,
// //       icon: user,
// //       bg: "bg-teal-50",
// //       color: "text-teal-600",
// //     },
// //     {
// //       label: "Total Subscription",
// //       value: dashboardStats.totalSubscription,
// //       icon: suppliers,
// //       bg: "bg-teal-50",
// //       color: "text-teal-600",
// //     },
// //     {
// //       label: "Total Shipment",
// //       value: dashboardStats.totalShipment,
// //       icon: ai,
// //       bg: "bg-sky-50",
// //       color: "text-sky-600",
// //     },
// //     {
// //       label: "Revenue",
// //       value:
// //         dashboardStats.revenue == null
// //           ? null
// //           : `₹${Number(dashboardStats.revenue).toLocaleString("en-IN")}`,
// //       icon: linear,
// //       bg: "bg-green-50",
// //       color: "text-green-600",
// //     },
// //     {
// //       label: "Pending Approvals",
// //       value: dashboardStats.pendingApprovals,
// //       icon: time,
// //       bg: "bg-amber-50",
// //       color: "text-amber-600",
// //     },
// //     {
// //       label: "Active Vendors",
// //       value: dashboardStats.activeVendors,
// //       icon: vector,
// //       bg: "bg-teal-50",
// //       color: "text-teal-600",
// //     },
// //     {
// //       label: "Plans Sold",
// //       value: dashboardStats.paidSubscriptions,
// //       icon: order,
// //       bg: "bg-violet-50",
// //       color: "text-violet-600",
// //     },
// //     {
// //       label: "B2B Subscriptions",
// //       value: dashboardStats.b2bSubscriptions,
// //       icon: suppliers,
// //       bg: "bg-teal-50",
// //       color: "text-teal-600",
// //     },
// //     {
// //       label: "B2B Plans Created",
// //       value: dashboardStats.b2bPlans,
// //       icon: order,
// //       bg: "bg-teal-50",
// //       color: "text-teal-600",
// //     },
// //   ];
// //   const dashboardRevenue = dashboardData?.charts?.revenueGrowth || [];
// //   const dashboardGrowth = dashboardData?.charts?.userGrowth || [];
// //   const dashboardActivity = dashboardData?.recentActivity || [];
// //   const dashboardAlerts = [
// //     { label: "Unread", count: dashboardStats.unreadNotifications },
// //     { label: "Read", count: dashboardStats.readNotifications },
// //     ...(dashboardStats.complianceAlerts != null
// //       ? [{ label: "Compliance", count: dashboardStats.complianceAlerts }]
// //       : []),
// //     ...(dashboardStats.apiFailureAlerts != null
// //       ? [{ label: "API Failure Alert", count: dashboardStats.apiFailureAlerts }]
// //       : []),
// //   ];
// //   const quickActionPermissions = {
// //     "Add User": ["users", "add"],
// //     "Add Vendor": ["vendors", "add"],
// //     "Add Role": null,
// //     "Add Sub-admin": null,
// //     "Add Plan": ["plans", "add"],
// //     "Create Notice": ["dashboard", "add"],
// //     "Add Hs Rule": ["hsRules", "add"],
// //     "Add Country Rule": ["countryRules", "add"],
// //   };
// //   const canUseQuickAction = (label) => {
// //     const rule = quickActionPermissions[label];
// //     if (!rule) return staffAccess === null;
// //     return may(rule[0], rule[1]);
// //   };
// //   const actionNavigation = (label) => {
// //     if (!canUseQuickAction(label)) return;
// //     const mapping = {
// //       "Add User": "Users",
// //       "Add Vendor": "Vendors/ Partners",
// //       "Add Role": "Roles & Permissions",
// //       "Add Sub-admin": "Sub-admins",
// //       "Add Plan": "Plans/ Subscription",
// //       "Create Notice": "Notices",
// //       "Add Hs Rule": "HS Rules",
// //       "Add Country Rule": "Country Rules",
// //     };
// //     const target = mapping[label];
// //     if (!target) return;
// //     if (
// //       staffAccess !== null &&
// //       ["Roles & Permissions", "Sub-admins"].includes(target)
// //     )
// //       return;
// //     setActiveNav(target);
// //     setCreateIntent((n) => n + 1);
// //     if (target === "Notices") setNoticeMode("create");
// //   };

// //   const handleFabAction = (label) => {
// //     if (label === "WhatsApp Bot") {
// //       setShowBot(true);
// //       setFabOpen(false);
// //     } else setFabOpen(false);
// //   };

// //   return (
// //     <div className="cargomate-admin-shell flex h-screen w-full min-w-0 overflow-hidden bg-[#F9FAFB] ">
// //       {/* Overlay for mobile */}

// //       {sidebarOpen && (
// //         <div
// //           className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
// //           onClick={() => setSidebarOpen(false)}
// //         />
// //       )}

// //       {/* Sidebar */}
// //       <aside
// //         className={`
// //           fixed lg:static inset-y-0 left-0 z-30 w-52 xl:w-60
// //             text-white bg-white flex flex-col
// //           transform transition-transform duration-300 ease-in-out
// //           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
// //           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
// //         `}
// //       >
// //         {/* Logo */}
// //         <div className="flex items-center gap-2 px-4 py-2 justify-center border-b border-gray-700">
// //           <img src={siteBranding.systemLogo || logo} className="h-12" />
// //         </div>

// //         {/* Nav */}
// //         <nav className="flex-1 overflow-y-auto pr-3 py-7 space-y-0.5 bg-gray-900">
// //           {visibleAdminNav.map(({ icon: Icon, label, color }) => (
// //             <button
// //               key={label}
// //               onClick={() => {
// //                 setActiveNav(label);
// //                 if (label === "Notices") setNoticeMode("list");
// //                 setShowBot(false);
// //                 setSidebarOpen(false);
// //               }}
// //               className={`w-full flex items-center gap-2 py-3 pl-10 rounded-r-lg  text-md font-semibold transition-colors text-left
// //                 ${
// //                   activeNav === label
// //                     ? "bg-teal-500 text-white"
// //                     : "text-gray-400 hover:bg-gray-700 hover:text-white"
// //                 }`}
// //             >
// //               <Icon size={18} className={`${color} flex-shrink-0`} />
// //               <span className="truncate text-[0.9rem] ">{label}</span>
// //             </button>
// //           ))}
// //         </nav>
// //       </aside>

// //       <div className="flex-1 min-w-0 min-h-0 flex flex-col w-full overflow-hidden">
// //         {/* Topbar */}
// //         <header className="bg-white border-b border-gray-200  px-3 sm:px-4 py-1 flex items-center gap-3 flex-shrink-0">
// //           <button
// //             className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
// //             title="Toggle admin sidebar"
// //             aria-label="Toggle admin sidebar"
// //             onClick={() => {
// //               if (window.innerWidth >= 1024)
// //                 setDesktopSidebarVisible((v) => !v);
// //               else setSidebarOpen(true);
// //             }}
// //           >
// //             <FiMenu size={18} />
// //           </button>

// //           <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
// //             <div className="relative">
// //               <FiSearch
// //                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
// //                 size={14}
// //               />
// //               <input
// //                 type="text"
// //                 placeholder="Search"
// //                 className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
// //               />
// //             </div>
// //           </div>

// //           <div className="flex items-center gap-1.5 ml-auto">
// //             <button
// //               onClick={() => setActiveNav("Notifications")}
// //               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
// //             >
// //               <FiBell size={16} />
// //               {dashboardStats.unreadNotifications > 0 && (
// //                 <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] text-white">
// //                   {dashboardStats.unreadNotifications}
// //                 </span>
// //               )}
// //             </button>
// //             <button
// //               onClick={() => setMessage(true)}
// //               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
// //             >
// //               <FiMail size={16} />
// //             </button>

// //             <AccountBadge />
// //           </div>
// //         </header>

// //         {/* Page Content */}

// //         <main className={`min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain bg-gray-50 ${activeNav === "Shipment" ? "p-0" : "p-3 sm:p-4 lg:p-6"}`}>
// //           {!profileMode &&
// //             !["Access Restricted", "Plans/ Subscription"].includes(
// //               activeNav,
// //             ) && (
// //             //   <div
// //             //     className="cm-unified-hero"
// //             //     aria-label={`${activeNav} management`}
// //             //   >
// //             //     <span className="cm-unified-hero-mark">
// //             //       <FiGrid size={22} />
// //             //     </span>
// //             //     <div className="min-w-0">
// //             //       <p className="cm-unified-kicker">CARGOMATE ADMIN</p>
// //             //       <div className="flex gap-20 w-full">
// //             //          <h1>{activeNav}</h1>
// //             //          <div className="flex justify-end mb-3  ml-80">
// //             //     {may("dashboard", "add") && (
// //             //       <button
// //             //         onClick={() => {
// //             //           setActiveNav("Notices");
// //             //           setNoticeMode("create");
// //             //         }}
// //             //         className="flex items-center gap-1.5 bg-white hover:bg-white-600 text-teal-500 
// //             // text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
// //             //       >
// //             //         <FiPlus size={13} />
// //             //         <span> Create Notice</span>
// //             //       </button>
// //             //     )}
// //             //   </div>
// //             //       </div>
                 
// //             //       <p className="cm-unified-desc">
// //             //         Manage {activeNav.toLowerCase()} securely from the CargoMate
// //             //         workspace
// //             //       </p>
// //             //     </div>

                
// //             //   </div>

            
// // <div className="cm-unified-hero">
// //   <span className="cm-unified-hero-mark">
// //     <FiGrid size={22} />
// //   </span>

// //   <div className="flex-1 min-w-0">
// //     <p className="cm-unified-kicker">CARGOMATE ADMIN</p>

// //     <div className="flex flex-wrap items-center justify-between gap-4 w-full">
// //       <h1>{activeNav}</h1>

// //       {activeNav === "Admin Dashboard" &&
// //         may("dashboard", "add") && (
// //           <button
// //             type="button"
// //             onClick={() => {
// //               setActiveNav("Notices");
// //               setNoticeMode("create");
// //             }}
// //             className="ml-auto flex shrink-0 items-center gap-2
// //               bg-white text-[#0A8981] hover:bg-[#E6FFFA]
// //               text-sm font-semibold px-5 py-2.5 rounded-xl
// //               shadow-sm transition-all duration-200"
// //           >
// //             <FiPlus size={16} />
// //             Create Notice
// //           </button>
// //         )}
// //     </div>

// //     <p className="cm-unified-desc">
// //       Manage {activeNav.toLowerCase()} securely from the
// //       CargoMate workspace
// //     </p>
// //   </div>
// // </div>

// //             )}
// //           {activeNav === "My Profile" && <AccountProfile embedded />}
// //           {activeNav === "Notifications" && may("dashboard") && (
// //             <AdminNotifications
// //               onBack={() => setActiveNav("Admin Dashboard")}
// //               onChanged={refreshDashboard}
// //             />
// //           )}
// //           {activeNav === "Access Restricted" && (
// //             <div className="p-8 text-slate-600">
// //               No administrative modules are assigned to this account. Contact
// //               the Main Admin.
// //             </div>
// //           )}
// //           {activeNav === "Admin Dashboard" && may("dashboard") && (
// //             <div className="">
// //               {dashboardError && (
// //                 <div
// //                   role="alert"
// //                   className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-2 mb-4 text-sm"
// //                 >
// //                   {dashboardError}
// //                 </div>
// //               )}
             

// //               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mb-4">
// //                 {dashboardCards.map(
// //                   ({ label, value, icon: Icon, color, bg }) => (
// //                     <div
// //                       onClick={() => {
// //                         if (label === "Total Users") {
// //                           setActiveNav("Users");
// //                         } else if (label === "Active Vendors") {
// //                           setActiveNav("Vendors/ Partners");
// //                         }
// //                       }}
// //                       key={label}
// //                       className="bg-white/90 backdrop-blur-md cursor-pointer rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,34,89,0.05)] hover:shadow-[0_14px_35px_rgba(20,184,166,0.12)] hover:-translate-y-0.5 transition-all border border-teal-100 flex flex-col gap-2"
// //                     >
// //                       <p className="text-gray-500 text-sm font-medium leading-tight">
// //                         {label}
// //                       </p>
// //                       <div className="flex items-center justify-between">
// //                         <p className="text-gray-800 font-bold text-sm sm:text-base">
// //                           {value == null ? "—" : value}
// //                         </p>
// //                         <div className="bg-teal-50 w-7 h-7 flex items-center justify-center rounded-md">
// //                           {typeof Icon === "string" ? (
// //                             <img src={Icon} alt="icon" className="w-4 h-4" />
// //                           ) : (
// //                             <Icon className={color} size={16} />
// //                           )}{" "}
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ),
// //                 )}
// //               </div>

// //               {/* Charts Row 1 */}
// //               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
// //                 {/* Area Chart */}
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-100 ">
// //                   <p className="text-xs sm:text-base  xl:text-lg font-semibold text-gray-500 mb-3">
// //                     Subscription Revenue (INR)
// //                   </p>
// //                   <ResponsiveContainer width="100%" height={140}>
// //                     <AreaChart data={dashboardRevenue}>
// //                       <defs>
// //                         <linearGradient
// //                           id="colorVal"
// //                           x1="0"
// //                           y1="0"
// //                           x2="0"
// //                           y2="1"
// //                         >
// //                           <stop
// //                             offset="5%"
// //                             stopColor="#14B8A6"
// //                             stopOpacity={0.3}
// //                           />
// //                           <stop
// //                             offset="95%"
// //                             stopColor="#14B8A6"
// //                             stopOpacity={0}
// //                           />
// //                         </linearGradient>
// //                       </defs>
// //                       <CartesianGrid
// //                         strokeDasharray="4 4"
// //                         stroke="#d1d5db"
// //                         strokeOpacity={0.8}
// //                         vertical={false}
// //                       />
// //                       <XAxis
// //                         dataKey="name"
// //                         tick={{ fontSize: 10 }}
// //                         axisLine={false}
// //                         tickLine={false}
// //                       />
// //                       <Tooltip contentStyle={{ fontSize: 11 }} />
// //                       <Area
// //                         type="monotone"
// //                         dataKey="value"
// //                         stroke="#14B8A6"
// //                         strokeWidth={2}
// //                         fill="url(#colorVal)"
// //                       />
// //                     </AreaChart>
// //                   </ResponsiveContainer>
// //                 </div>

// //                 {/* Bar Chart */}
// //                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// //                   <p className="text-xs sm:text-base xl:text-lg font-semibold text-gray-500 mb-3">
// //                     Plans Sold by Month
// //                   </p>
// //                   <ResponsiveContainer width="100%" height={140}>
// //                     <BarChart data={dashboardRevenue} barCategoryGap="30%">
// //                       <CartesianGrid
// //                         strokeDasharray="4 4"
// //                         stroke="#d1d5db"
// //                         strokeOpacity={0.8}
// //                         vertical={false}
// //                       />
// //                       <XAxis
// //                         dataKey="name"
// //                         tick={{ fontSize: 10 }}
// //                         axisLine={false}
// //                         tickLine={false}
// //                       />
// //                       <Tooltip contentStyle={{ fontSize: 11 }} />
// //                       <Bar
// //                         dataKey="sales"
// //                         fill="#14B8A6"
// //                         radius={[3, 3, 0, 0]}
// //                       />
// //                     </BarChart>
// //                   </ResponsiveContainer>
// //                 </div>
// //               </div>

// //               {/* Bottom Row */}
// //               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
// //                 {/* Quick Actions */}
// //                 <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 h-fit ">
// //                   <p className="text-sm sm:text-base xl:text-lg  border-b-2 font-medium text-gray-800 mb-3">
// //                     Quick Action
// //                   </p>
// //                   <div className="space-y-2">
// //                     {quickActions
// //                       .filter(({ label }) => canUseQuickAction(label))
// //                       .map(({ icon: Icon, label }) => (
// //                         <button
// //                           key={label}
// //                           onClick={() => actionNavigation(label)}
// //                           className="w-full flex items-center shadow-sm gap-2 px-3 py-2 border border-teal-100 rounded-lg hover:bg-teal-50 text-sm text-gray-700 transition-colors"
// //                         >
// //                           {typeof Icon === "string" ? (
// //                             <img src={Icon} alt="icon" className="w-4 h-4" />
// //                           ) : (
// //                             <Icon
// //                               size={13}
// //                               className="text-teal-500 flex-shrink-0"
// //                             />
// //                           )}

// //                           <span className="font-medium">{label}</span>
// //                         </button>
// //                       ))}
// //                   </div>
// //                 </div>

// //                 {/* User Growth */}
// //                 <div className="rounded-xl p-0 flex flex-col">
// //                   <div className="shadow-md border p-3 rounded-xl sm:p-4 border-gray-100 bg-white">
// //                     <p className="text-xs sm:text-base  xl:text-lg font-semibold text-[#787B7F] mb-3">
// //                       User Growth
// //                     </p>
// //                     <div className="flex-1">
// //                       <ResponsiveContainer width="100%" height={160}>
// //                         <AreaChart
// //                           data={dashboardGrowth}
// //                           margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
// //                         >
// //                           <defs>
// //                             <linearGradient
// //                               id="ugGrad"
// //                               x1="0"
// //                               y1="0"
// //                               x2="0"
// //                               y2="1"
// //                             >
// //                               <stop
// //                                 offset="5%"
// //                                 stopColor="#14B8A6"
// //                                 stopOpacity={0.25}
// //                               />
// //                               <stop
// //                                 offset="95%"
// //                                 stopColor="#14B8A6"
// //                                 stopOpacity={0}
// //                               />
// //                             </linearGradient>
// //                           </defs>

// //                           <CartesianGrid
// //                             strokeDasharray="6 6"
// //                             stroke="#d1d5db"
// //                             vertical={false}
// //                             strokeOpacity={0.8}
// //                           />

// //                           <XAxis
// //                             dataKey="name"
// //                             tick={{ fontSize: 10 }}
// //                             axisLine={false}
// //                             tickLine={false}
// //                           />

// //                           <YAxis hide domain={["auto", "auto"]} />

// //                           <Tooltip contentStyle={{ fontSize: 11 }} />

// //                           <Area
// //                             type="monotone"
// //                             dataKey="value"
// //                             stroke="#14B8A6"
// //                             strokeWidth={2}
// //                             fill="url(#ugGrad)"
// //                           />
// //                         </AreaChart>
// //                       </ResponsiveContainer>
// //                     </div>
// //                   </div>

// //                   {/* Recent Activity below on mobile / same card medium+ */}
// //                   <div className="mt-3 pt-3 border-t border-gray-100 shadow-md rounded-xl p-3 sm:p-4 bg-white">
// //                     <p className="text-sm sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-2">
// //                       Recent Activity
// //                     </p>
// //                     <div className="space-y-1.5">
// //                       {dashboardActivity.map(({ title, createdAt }, i) => (
// //                         <div
// //                           key={i}
// //                           className="flex justify-between items-start gap-2"
// //                         >
// //                           <p className="text-[0.8rem]  sm:text-sm font-medium text-[#4D4D4D]  leading-snug">
// //                             {title}
// //                           </p>
// //                           <p className=" text-xs sm:text-sm text-[#9A9A9A]    font-medium flex-shrink-0">
// //                             {createdAt
// //                               ? new Date(createdAt).toLocaleString("en-IN")
// //                               : ""}
// //                           </p>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {/* Alerts + System Status */}
// //                 <div className="flex flex-col gap-3">
// //                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// //                     <p className="text-xs sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// //                       Alert & Notification
// //                     </p>
// //                     <div className="space-y-2">
// //                       {dashboardAlerts.map(({ count, label }) => (
// //                         <div
// //                           key={label}
// //                           onClick={() => setActiveNav("Notifications")}
// //                           role="button"
// //                           tabIndex={0}
// //                           onKeyDown={(e) => {
// //                             if (e.key === "Enter")
// //                               setActiveNav("Notifications");
// //                           }}
// //                           className="cursor-pointer flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 hover:bg-teal-50 rounded-lg"
// //                         >
// //                           <div className="flex items-center gap-2">
// //                             <span className="bg-[#14B8A6] text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
// //                               {count ?? "—"}
// //                             </span>
// //                             <span className="text-xs sm:text-base  font-medium text-gray-700">
// //                               {label}
// //                             </span>
// //                           </div>
// //                           <FiChevronRight
// //                             size={20}
// //                             className="text-xs sm:text-sm font-mediumtext-gray-400"
// //                           />
// //                         </div>
// //                       ))}
// //                     </div>
// //                   </div>

// //                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
// //                     <p className="text-xs sm:text-sm border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
// //                       System Status
// //                     </p>
// //                     <div className="space-y-2">
// //                       <div className="flex items-center  justify-between ">
// //                         <div className="flex items-center gap-2">
// //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// //                           <span className="text-xs sm:text-sm font-medium text-gray-600">
// //                             API Status
// //                           </span>
// //                         </div>

// //                         <div className="flex items-center gap-1.5">
// //                           <span className="text-xs sm:text-sm text-slate-500 font-medium">
// //                             Check monitoring
// //                           </span>
// //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// //                         </div>
// //                       </div>
// //                       <div className="flex items-center justify-between">
// //                         <div className="flex items-center gap-2">
// //                           <span className="w-2 h-2 bg-green-400 rounded-full" />
// //                           <span className="text-xs sm:text-sm  font-medium text-gray-600">
// //                             Server Status
// //                           </span>{" "}
// //                         </div>

// //                         {/* <span className="w-2 h-2 bg-green-400 rounded-full" /> */}
// //                       </div>
// //                       <p className="text-xs  text-[#787B7F] font-medium">
// //                         Verify system health from monitoring
// //                       </p>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeNav === "Users" && may("users") && (
// //             <UsersSection
// //               setShowNotice={setShowNotice}
// //               permissions={
// //                 staffAccess?.users ?? (staffAccess === null ? null : {})
// //               }
// //             />
// //           )}

// //           {/* {activeNav === "Roles & Permissions" && staffAccess === null && (
// //             <RolesPermission openCreateIntent={createIntent} />
// //           )} */}
          
// // {activeNav === "Roles & Permissions" && staffAccess === null && (
// //   // <button
// //   //   type="button"
// //   //   onClick={() => setCreateIntent((prev) => prev + 1)}
// //   //   className="ml-auto flex shrink-0 items-center gap-2
// //   //     bg-white text-[#0A8981] hover:bg-[#E6FFFA]
// //   //     text-sm font-semibold px-5 py-2.5 rounded-xl
// //   //     shadow-sm transition-all duration-200"
// //   // >
// //   //   <FiPlus size={16} />
// //   //   Create Role
// //   // </button>

// //   <RolesPermission openCreateIntent={createIntent} />
// // )}

// //           {activeNav === "Sub-admins" && staffAccess === null && (
// //             <SubAdmins openCreateIntent={createIntent} />
// //           )}

// //           {activeNav === "Plans/ Subscription" && may("plans") && (
// //             <PlanSection
// //               openCreateIntent={createIntent}
// //               showAddPlan={showAddPlan}
// //               setShowAddPlan={setShowAddPlan}
// //               permissions={
// //                 staffAccess?.plans ?? (staffAccess === null ? null : {})
// //               }
// //             />
// //           )}

// //           {/* //  {activeNav === "Master Data" && may("masterData") && <MasterData/>}
// //           //  {activeNav === "HS Rules" && may("hsRules") && <HSRules/>}
// //           //  {activeNav === "Country Rules" && may("countryRules") && <CountryRules/>}
// //           //  {activeNav === "DGFT Schemes" && may("dgftSchemes") && <DGFTSchemes/>}

// //           //  {activeNav === "Shipment" && may("shipment") && <Shipment /> }


// //           //  {activeNav === "Vendors/ Partners" && may("vendors") && <VendorsPartners permissions={staffAccess?.vendors ?? (staffAccess === null ? null : {})} /> }
// //           //  {activeNav === "AI Assistant" && may("aiAssistant") && <AiAssistant /> } */}

// //           {activeNav === "Master Data" && may("masterData") && <MasterData />}
// //           {activeNav === "HS Rules" && may("hsRules") && <HSRules />}
// //           {activeNav === "Country Rules" && may("countryRules") && (
// //             <CountryRules />
// //           )}
// //           {activeNav === "DGFT Schemes" && may("dgftSchemes") && (
// //             <DGFTSchemes />
// //           )}

// //           {activeNav === "Shipment" && may("shipment") && <Shipment />}

// //           {activeNav === "Notices" && (
// //             <NoticesSection mode={noticeMode} setMode={setNoticeMode} />
// //           )}
// //           {activeNav === "Vendors/ Partners" && may("vendors") && (
// //             <VendorsPartners />
// //           )}
// //           {activeNav === "AI Assistant" && may("aiAssistant") && (
// //             <AiAssistant />
// //           )}

// //           {/* //  {activeNav === "Master Data" && <MasterData/>}
// //           //  {activeNav === "HS Rules" && <HSRules/>}
// //           //  {activeNav === "Country Rules" && <CountryRules/>}
// //           //  {activeNav === "DGFT Schemes" && <DGFTSchemes/>}

// //           //  {activeNav === "Shipment" && <Shipment /> }
// //           //  {activeNav === "Notices" && <NoticesSection mode={noticeMode} setMode={setNoticeMode} /> }


// //           //  {activeNav === "Vendors/ Partners" && <VendorsPartners /> }
// //           //  {activeNav === "AI Assistant" && <AiAssistant /> } */}

// //           {activeNav === "Trade Intelligence" && may("tradeIntelligence") && <TradeIntelligence />}

// //           {activeNav === "API Integrations" && may("integrations") && <APIIntegrations />}

// //           {activeNav === "Ad Managment" && may("ads") && <AdManagement />}
// //           {activeNav === "Support" && may("support") && <Support />}
// //           {activeNav === "Modules" && may("modules") && <Modules />}
// //           {activeNav === "Settings" && may("settings") && <Settings />}
// //           {showBot && (
// //             <WhatsappBot
// //               showBot={showBot}
// //               setShowBot={setShowBot}
// //               fabOpen={fabOpen}
// //               setFabOpen={setFabOpen}
// //             />
// //           )}

// //           {/* <CreateNewInvoice /> */}
// //         </main>
// //       </div>
// //       {messages && <MessagesModal onClose={() => setMessage(false)} />}
// //       {notifications && (
// //         <NotificationsModal onClose={() => setNotifications(false)} />
// //       )}

// //       {/* Modal removed - full page navigation used */}

// //       {/* {showNotice && <CreateNotice setShowNotice={setShowNotice} />} */}
// //       {fabOpen && (
// //         <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
// //       )}

// //       <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
// //         {fabOpen && (
// //           <div className="flex flex-col gap-2 items-end mb-1">
// //             {fabActions.map((a, i) => (
// //               <button
// //                 key={i}
// //                 onClick={() => {
// //                   handleFabAction(a.label);
// //                   setActiveNav("");
// //                 }}
// //                 className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2.5 hover:bg-gray-50 transition-all"
// //               >
// //                 <span className="text-sm font-medium text-gray-700">
// //                   {a.label}
// //                 </span>
// //                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
// //                   {a.icon}
// //                 </div>
// //               </button>
// //             ))}
// //           </div>
// //         )}
// //         <button
// //           onClick={() => setFabOpen(!fabOpen)}
// //           className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${fabOpen ? "bg-gray-600" : "bg-teal-500 hover:bg-teal-600"}`}
// //         >
// //           {fabOpen ? <FiX size={22} /> : <FiPlus size={24} />}
// //         </button>
// //       </div>

// //       {account && <MyAccount onClose={() => setAccount(false)} />}
// //     </div>
// //   );
// // }


// // mahima code //
// import "./CargoMateAdminTheme2026.css";
// import { usePublicConfig } from "../../../lib/publicConfig";
// import AccountProfile, {
//   AccountBadge,
// } from "../../../components/AccountProfile";
// import { clearSession } from "../../../lib/auth";
// import { useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import {
//   FiMenu,
//   FiSearch,
//   FiBell,
//   FiMail,
//   FiSun,
//   FiMoon,
//   FiPlus,
//   FiUsers,
//   FiShield,
//   FiCreditCard,
//   FiDatabase,
//   FiFileText,
//   FiGlobe,
//   FiPackage,
//   FiTruck,
//   FiCpu,
//   FiPieChart,
//   FiLink,
//   FiMonitor,
//   FiHelpCircle,
//   FiGrid,
//   FiSettings,
//   FiChevronRight,
//   FiUserPlus,
//   FiUserCheck,
//   FiPlusCircle,
//   FiAlertCircle,
//   FiCheckCircle,
//   FiXCircle,
//   FiHome,
//   FiCamera,
//   FiLock,
//   FiSend,
// } from "react-icons/fi";
// import {
//   FaTrash,
//   FaCheck,
//   FaBox,
//   FaBell,
//   FaChevronLeft,
//   FaFileLines,
//   FaListCheck,
//   FaGripVertical,
//   FaPlus,
//   FaSliders,
//   FaEye,
//   FaClock,
//   FaUser,
//   FaFloppyDisk,
//   FaPaperPlane,
//   FaUsers,
//   FaIndianRupeeSign,
//   FaRotate,
// } from "react-icons/fa6";

// import {
//   FiEdit,
//   FiTrash2,
//   FiCheck,
//   FiDollarSign,
//   FiRefreshCw,
//   FiUser,
// } from "react-icons/fi";
// import {
//   LineChart,
//   Line,
//   AreaChart,
//   Area,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   Tooltip,
//   ResponsiveContainer,
//   CartesianGrid,
// } from "recharts";
// import {
//   MdDashboard,
//   MdPeople,
//   MdSecurity,
//   MdSubscriptions,
//   MdStorage,
//   MdDescription,
//   MdPublic,
//   MdBusiness,
//   MdLocalShipping,
//   MdAnnouncement,
//   MdSmartToy,
//   MdInsights,
//   MdApi,
//   MdCampaign,
//   MdSupportAgent,
//   MdWidgets,
//   MdSettings,
// } from "react-icons/md";
// import { RxCross1 } from "react-icons/rx";
// import { FaCalendarAlt, FaTimes } from "react-icons/fa";

// import RolesPermission from "./RolesPermission";
// import SubAdmins from "./SubAdmins";
// import API from "../../api/axios";
// import Settings from "./Settings";
// import MasterData from "./MasterData";
// import HSRules from "./HsRules";
// import CountryRules from "./CountryRules";
// import DGFTSchemes from "./DgftScheme";
// import Shipment from "./Shipment";
// import VendorsPartners from "./VendorsPartners";
// import NoticesSection from "./Notices";
// import AdminNotifications from "./AdminNotifications";
// import AiAssistant from "./AiAssistant";
// import TradeIntelligence from "./TradeIntelligence";
// import Modules from "./Modules";
// import Support from "./Support";
// import APIIntegrations from "./ApiIntegrations";
// import AdManagement from "./AdManagement";
// import UsersSection from "./Users";
// import PlanSection from "./PlansSubscriptions";
// import WhatsappBot from "./WhatsappBot";
// import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
// import { HiOutlineDocumentText } from "react-icons/hi";
// import { RiWhatsappLine } from "react-icons/ri";
// import { FiX } from "react-icons/fi";
// import ai from "../../assets/icon/ai.png";
// import user from "../../assets/icon/user.png";
// import suppliers from "../../assets/icon/suppliers.png";
// import linear from "../../assets/icon/linear.png";
// import anal from "../../assets/icon/analytical.png";
// import vector from "../../assets/icon/vector.png";
// import time from "../../assets/icon/time.png";
// import document from "../../assets/icon/document.png";
// import order from "../../assets/icon/orders.png";

// import logo from "../../assets/Images/logo.png";
// import CreateNewInvoice from "./CreateNewInvoice";

// import MessagesModal from "../../components/Messages";
// import NotificationsModal from "../../components/Notifications";
// import MyAccount from "../admin/MyAccount";

// const fabActions = [
//   {
//     label: "New Booking",
//     icon: <BsCalendarCheck size={22} className="text-teal-600" />,
//   },
//   {
//     label: "Add Vendor",
//     icon: <BsPersonPlus size={22} className="text-teal-600" />,
//   },
//   {
//     label: "Report",
//     icon: <HiOutlineDocumentText size={22} className="text-teal-600" />,
//   },
//   {
//     label: "WhatsApp Bot",
//     icon: <RiWhatsappLine size={22} className="text-teal-600" />,
//   },
// ];

// const navItems = [
//   { icon: MdDashboard, label: "Admin Dashboard", color: "text-orange-400" },
//   { icon: MdPeople, label: "Users", color: "text-yellow-400" },
//   { icon: MdPeople, label: "Vendors/ Partners", color: "text-green-400" },
//   { icon: MdSecurity, label: "Roles & Permissions", color: "text-purple-400" },
//   { icon: MdPeople, label: "Sub-admins", color: "text-teal-400" },
//   {
//     icon: MdSubscriptions,
//     label: "Plans/ Subscription",
//     color: "text-teal-400",
//   },
//   { icon: MdStorage, label: "Master Data", color: "text-blue-400" },
//   { icon: MdDescription, label: "HS Rules", color: "text-red-400" },
//   { icon: MdPublic, label: "Country Rules", color: "text-indigo-400" },
//   { icon: MdBusiness, label: "DGFT Schemes", color: "text-pink-400" },
//   { icon: MdLocalShipping, label: "Shipment", color: "text-cyan-400" },
//   { icon: MdAnnouncement, label: "Notices", color: "text-amber-400" },
//   { icon: FiBell, label: "Notifications", color: "text-teal-400" },

//   { icon: MdSmartToy, label: "AI Assistant", color: "text-blue-500" },
//   // { icon: MdInsights, label: "Trade Intelligence", color: "text-rose-400" },
//   // { icon: MdApi, label: "API Integrations", color: "text-emerald-400" },
//   { icon: MdCampaign, label: "Ad Managment", color: "text-yellow-500" },
//   { icon: MdSupportAgent, label: "Support", color: "text-orange-500" },
//   // { icon: MdWidgets, label: "Modules", color: "text-indigo-500" },
//   { icon: MdSettings, label: "Settings", color: "text-gray-400" },
// ];

// const quickActions = [
//   { icon: user, label: "Add User" },
//   { icon: order, label: "Add Vendor" },
//   { icon: FiShield, label: "Add Role" },
//   { icon: FiUserPlus, label: "Add Sub-admin" },
//   { icon: suppliers, label: "Add Plan" },
//   { icon: FiPlus, label: "Create Notice" },
//   { icon: anal, label: "Add Hs Rule" },
//   { icon: document, label: "Add Country Rule" },
// ];

// function CreateNotice({ setShowNotice }) {
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [date, setDate] = useState("");
//   const [image, setImage] = useState(null);
//   const [preview, setPreview] = useState(null);
//   const [errors, setErrors] = useState({});

//   const handleImage = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImage(file);
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const removeImage = () => {
//     setImage(null);
//     setPreview(null);
//   };

//   const validate = () => {
//     let err = {};
//     if (!title.trim()) err.title = "Title required";
//     if (!desc.trim()) err.desc = "Description required";
//     if (!date) err.date = "Date required";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;

//     const data = {
//       title,
//       desc,
//       date,
//       image,
//     };

//     console.log("Submit:", data);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 sm:px-6">
//       <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
//         <div className="flex items-center justify-between  mb-4">
//           <h2 className="text-lg sm:text-xl font-semibold ">Create Notice</h2>
//           <button>
//             <RxCross1 onClick={() => setShowNotice((prev) => !prev)} />
//           </button>
//         </div>

//         <div className="mb-3">
//           <label className="text-sm text-gray-700">Title</label>
//           <input
//             type="text"
//             placeholder="Give One Title"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
//               errors.title
//                 ? "border-red-400 focus:ring-red-400"
//                 : "focus:ring-teal-500"
//             }`}
//           />
//           {errors.title && (
//             <p className="text-red-500 text-sm mt-1">{errors.title}</p>
//           )}
//         </div>

//         <div className="mb-3">
//           <label className="text-sm text-gray-700">Description</label>
//           <textarea
//             rows="3"
//             placeholder="Type Description here..."
//             value={desc}
//             onChange={(e) => setDesc(e.target.value)}
//             className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 ${
//               errors.desc
//                 ? "border-red-400 focus:ring-red-400"
//                 : "focus:ring-teal-500"
//             }`}
//           />
//           {errors.desc && (
//             <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
//           )}
//         </div>

//         <div className="mb-3 flex flex-col  ">
//           <label className="text-sm text-gray-700">Add image (optional)</label>

//           <label className="mt-2 self-start bg-teal-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-teal-600 transition">
//             Upload Image
//             <input
//               type="file"
//               accept="image/*"
//               onChange={handleImage}
//               className="hidden"
//             />
//           </label>

//           {preview && (
//             <div className="mt-3 relative w-32 h-32">
//               <img
//                 src={preview}
//                 alt="preview"
//                 className="w-full h-full object-cover rounded-md border"
//               />
//               <button
//                 onClick={removeImage}
//                 className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full text-sm"
//               >
//                 <FaTimes />
//               </button>
//             </div>
//           )}
//         </div>

//         <div className="mb-5">
//           <label className="text-sm text-gray-700">Schedule Date</label>
//           <div className="relative mt-1">
//             <input
//               type="date"
//               value={date}
//               onChange={(e) => setDate(e.target.value)}
//               className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
//                 errors.date
//                   ? "border-red-400 focus:ring-red-400"
//                   : "focus:ring-teal-500"
//               }`}
//             />
//             {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-sm pointer-events-none" /> */}
//           </div>
//           {errors.date && (
//             <p className="text-red-500 text-sm mt-1">{errors.date}</p>
//           )}
//         </div>

//         <button
//           onClick={handleSubmit}
//           className="w-full bg-teal-500 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
//         >
//           Publish Notice
//         </button>

//         <button
//           type="button"
//           onClick={() => setShowNotice(false)}
//           className="w-full mt-2 border py-2 rounded-md text-sm text-gray-500 hover:bg-teal-500 hover:text-white transition"
//         >
//           Cancel
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function AdminDashboard({ profileMode = false }) {
//   const navigate = useNavigate();
//   const siteBranding = usePublicConfig();
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
//   const [activeNav, setActiveNav] = useState(
//     profileMode ? "My Profile" : "Admin Dashboard",
//   );
//   // React may reuse the dashboard instance when navigating to /admin-profile.
//   // Reset the section so an open User/Vendor drawer cannot cover the profile route.
//   useEffect(() => {
//     setActiveNav(profileMode ? "My Profile" : "Admin Dashboard");
//   }, [profileMode]);
//   const [staffAccess, setStaffAccess] = useState(null);
//   useEffect(() => {
//     let active = true;
//     const refreshEffectivePermissions = () => API.get("/auth/me")
//       .then(({ data }) => {
//         if (!active) return;
//         // Backend is authoritative: refresh when returning to the tab after role changes.
//         setStaffAccess(data?.user?.isInternalStaff ? (data.user.permissions || {}) : null);
//       })
//       .catch(() => {
//         // Never treat an unreadable role as unrestricted Admin access.
//         if (active) setStaffAccess({});
//       });
//     refreshEffectivePermissions();
//     window.addEventListener("focus", refreshEffectivePermissions);
//     return () => {
//       active = false;
//       window.removeEventListener("focus", refreshEffectivePermissions);
//     };
//   }, []);
//   const menuModules = {
//     "Admin Dashboard": "dashboard",
//     Users: "users",
//     "Vendors/ Partners": "vendors",
//     "Plans/ Subscription": "plans",
//     "Master Data": "masterData",
//     "HS Rules": "hsRules",
//     "Country Rules": "countryRules",
//     "DGFT Schemes": "dgftSchemes",
//     Shipment: "shipment",
//     Notices: "dashboard",
//     Notifications: "dashboard",
//     "AI Assistant": "aiAssistant",
//     "Ad Managment": "ads",
//     "Trade Intelligence": "tradeIntelligence",
//     "API Integrations": "integrations",
//     Modules: "modules",
//     Support: "support",
//     Settings: "settings",
//   };
//   const visibleAdminNav =
//     staffAccess === null
//       ? navItems
//       : navItems.filter(
//           (item) =>
//             !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
//             staffAccess[menuModules[item.label]]?.view === true,
//         );
//   // Never keep a sub-admin on a tab they cannot view, even when arriving via a direct link.
//   useEffect(() => {
//     if (staffAccess === null || profileMode) return;
//     const permitted = navItems.filter(
//       (item) =>
//         !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
//         staffAccess[menuModules[item.label]]?.view === true,
//     );
//     if (!permitted.some((item) => item.label === activeNav))
//       setActiveNav(permitted[0]?.label || "Access Restricted");
//   }, [staffAccess, activeNav, profileMode]);
//   const may = (module, action = "view") =>
//     staffAccess === null || staffAccess?.[module]?.[action] === true;

//   const [showNotice, setShowNotice] = useState(false);
//   const [showAddPlan, setShowAddPlan] = useState(false);
//   const [showBot, setShowBot] = useState(false);
//   const [fabOpen, setFabOpen] = useState(false);
//   const [messages, setMessage] = useState(false);
//   const [noticeMode, setNoticeMode] = useState("list");
//   const [notifications, setNotifications] = useState(false);
//   const [account, setAccount] = useState(false);

//   const [createIntent, setCreateIntent] = useState(0);
//   const [dashboardData, setDashboardData] = useState(null);
//   const [dashboardError, setDashboardError] = useState("");
//   const refreshDashboard = async () => {
//     try {
//       const { data } = await API.get("/admin/dashboard");
//       setDashboardData(data);
//       setDashboardError("");
//     } catch (e) {
//       setDashboardError(
//         e.response?.data?.message || "Dashboard data unavailable",
//       );
//     }
//   };
//   useEffect(() => {
//     if (activeNav === "Admin Dashboard") refreshDashboard();
//   }, [activeNav]);
//   const dashboardStats = dashboardData?.stats || {};
//   const dashboardCards = [
//     {
//       label: "Total Users",
//       value: dashboardStats.totalUsers,
//       icon: user,
//       bg: "bg-teal-50",
//       color: "text-teal-600",
//     },
//     {
//       label: "Total Subscription",
//       value: dashboardStats.totalSubscription,
//       icon: suppliers,
//       bg: "bg-teal-50",
//       color: "text-teal-600",
//     },
//     {
//       label: "Total Shipment",
//       value: dashboardStats.totalShipment,
//       icon: ai,
//       bg: "bg-sky-50",
//       color: "text-sky-600",
//     },
//     {
//       label: "Revenue",
//       value:
//         dashboardStats.revenue == null
//           ? null
//           : `₹${Number(dashboardStats.revenue).toLocaleString("en-IN")}`,
//       icon: linear,
//       bg: "bg-green-50",
//       color: "text-green-600",
//     },
//     {
//       label: "Pending Approvals",
//       value: dashboardStats.pendingApprovals,
//       icon: time,
//       bg: "bg-amber-50",
//       color: "text-amber-600",
//     },
//     {
//       label: "Active Vendors",
//       value: dashboardStats.activeVendors,
//       icon: vector,
//       bg: "bg-teal-50",
//       color: "text-teal-600",
//     },
//     {
//       label: "Plans Sold",
//       value: dashboardStats.paidSubscriptions,
//       icon: order,
//       bg: "bg-violet-50",
//       color: "text-violet-600",
//     },
//     {
//       label: "B2B Subscriptions",
//       value: dashboardStats.b2bSubscriptions,
//       icon: suppliers,
//       bg: "bg-teal-50",
//       color: "text-teal-600",
//     },
//     {
//       label: "B2B Plans Created",
//       value: dashboardStats.b2bPlans,
//       icon: order,
//       bg: "bg-teal-50",
//       color: "text-teal-600",
//     },
//   ];
//   const dashboardRevenue = dashboardData?.charts?.revenueGrowth || [];
//   const dashboardGrowth = dashboardData?.charts?.userGrowth || [];
//   const dashboardActivity = dashboardData?.recentActivity || [];
//   const dashboardAlerts = [
//     { label: "Unread", count: dashboardStats.unreadNotifications },
//     { label: "Read", count: dashboardStats.readNotifications },
//     ...(dashboardStats.complianceAlerts != null
//       ? [{ label: "Compliance", count: dashboardStats.complianceAlerts }]
//       : []),
//     ...(dashboardStats.apiFailureAlerts != null
//       ? [{ label: "API Failure Alert", count: dashboardStats.apiFailureAlerts }]
//       : []),
//   ];
//   const quickActionPermissions = {
//     "Add User": ["users", "add"],
//     "Add Vendor": ["vendors", "add"],
//     "Add Role": null,
//     "Add Sub-admin": null,
//     "Add Plan": ["plans", "add"],
//     "Create Notice": ["dashboard", "add"],
//     "Add Hs Rule": ["hsRules", "add"],
//     "Add Country Rule": ["countryRules", "add"],
//   };
//   const canUseQuickAction = (label) => {
//     const rule = quickActionPermissions[label];
//     if (!rule) return staffAccess === null;
//     return may(rule[0], rule[1]);
//   };
//   const actionNavigation = (label) => {
//     if (!canUseQuickAction(label)) return;
//     const mapping = {
//       "Add User": "Users",
//       "Add Vendor": "Vendors/ Partners",
//       "Add Role": "Roles & Permissions",
//       "Add Sub-admin": "Sub-admins",
//       "Add Plan": "Plans/ Subscription",
//       "Create Notice": "Notices",
//       "Add Hs Rule": "HS Rules",
//       "Add Country Rule": "Country Rules",
//     };
//     const target = mapping[label];
//     if (!target) return;
//     if (
//       staffAccess !== null &&
//       ["Roles & Permissions", "Sub-admins"].includes(target)
//     )
//       return;
//     setActiveNav(target);
//     setCreateIntent((n) => n + 1);
//     if (target === "Notices") setNoticeMode("create");
//   };

//   const handleFabAction = (label) => {
//     if (label === "WhatsApp Bot") {
//       setShowBot(true);
//       setFabOpen(false);
//     } else setFabOpen(false);
//   };

//   return (
//     <div className="cargomate-admin-shell flex h-screen w-full min-w-0 overflow-hidden bg-[#F9FAFB] ">
//       {/* Overlay for mobile */}

//       {sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <aside
//         className={`
//           fixed lg:static inset-y-0 left-0 z-30 w-52 xl:w-60
//             text-white bg-white flex flex-col
//           transform transition-transform duration-300 ease-in-out
//           ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
//           ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
//         `}
//       >
//         {/* Logo */}
//         <div className="flex items-center gap-2 px-4 py-2 justify-center border-b border-gray-700">
//           <img src={siteBranding.systemLogo || logo} className="h-12" />
//         </div>

//         {/* Nav */}
//         <nav className="flex-1 overflow-y-auto pr-3 py-7 space-y-0.5 bg-gray-900">
//           {visibleAdminNav.map(({ icon: Icon, label, color }) => (
//             <button
//               key={label}
//               onClick={() => {
//                 setActiveNav(label);
//                 if (label === "Notices") setNoticeMode("list");
//                 setShowBot(false);
//                 setSidebarOpen(false);
//               }}
//               className={`w-full flex items-center gap-2 py-3 pl-10 rounded-r-lg  text-md font-semibold transition-colors text-left
//                 ${
//                   activeNav === label
//                     ? "bg-teal-500 text-white"
//                     : "text-gray-400 hover:bg-gray-700 hover:text-white"
//                 }`}
//             >
//               <Icon size={18} className={`${color} flex-shrink-0`} />
//               <span className="truncate text-[0.9rem] ">{label}</span>
//             </button>
//           ))}
//         </nav>
//       </aside>

//       <div className="flex-1 min-w-0 min-h-0 flex flex-col w-full overflow-hidden">
//         {/* Topbar */}
//         <header className="bg-white border-b border-gray-200  px-3 sm:px-4 py-1 flex items-center gap-3 flex-shrink-0">
//           <button
//             className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
//             title="Toggle admin sidebar"
//             aria-label="Toggle admin sidebar"
//             onClick={() => {
//               if (window.innerWidth >= 1024)
//                 setDesktopSidebarVisible((v) => !v);
//               else setSidebarOpen(true);
//             }}
//           >
//             <FiMenu size={18} />
//           </button>

//           <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
//             <div className="relative">
//               <FiSearch
//                 className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
//                 size={14}
//               />
//               <input
//                 type="text"
//                 placeholder="Search"
//                 className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
//               />
//             </div>
//           </div>

//           <div className="flex items-center gap-1.5 ml-auto">
//             <button
//               onClick={() => setActiveNav("Notifications")}
//               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
//             >
//               <FiBell size={16} />
//               {dashboardStats.unreadNotifications > 0 && (
//                 <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] text-white">
//                   {dashboardStats.unreadNotifications}
//                 </span>
//               )}
//             </button>
//             <button
//               onClick={() => setMessage(true)}
//               className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
//             >
//               <FiMail size={16} />
//             </button>

//             <AccountBadge />
//           </div>
//         </header>

//         {/* Page Content */}

//         <main className={`min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain bg-gray-50 ${activeNav === "Shipment" ? "p-0" : "p-3 sm:p-4 lg:p-6"}`}>
//           {!profileMode &&
//             !["Access Restricted", "Plans/ Subscription"].includes(
//               activeNav,
//             ) && (
//             //   <div
//             //     className="cm-unified-hero"
//             //     aria-label={`${activeNav} management`}
//             //   >
//             //     <span className="cm-unified-hero-mark">
//             //       <FiGrid size={22} />
//             //     </span>
//             //     <div className="min-w-0">
//             //       <p className="cm-unified-kicker">CARGOMATE ADMIN</p>
//             //       <div className="flex gap-20 w-full">
//             //          <h1>{activeNav}</h1>
//             //          <div className="flex justify-end mb-3  ml-80">
//             //     {may("dashboard", "add") && (
//             //       <button
//             //         onClick={() => {
//             //           setActiveNav("Notices");
//             //           setNoticeMode("create");
//             //         }}
//             //         className="flex items-center gap-1.5 bg-white hover:bg-white-600 text-teal-500 
//             // text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
//             //       >
//             //         <FiPlus size={13} />
//             //         <span> Create Notice</span>
//             //       </button>
//             //     )}
//             //   </div>
//             //       </div>
                 
//             //       <p className="cm-unified-desc">
//             //         Manage {activeNav.toLowerCase()} securely from the CargoMate
//             //         workspace
//             //       </p>
//             //     </div>

                
//             //   </div>

            
// <div className="cm-unified-hero">
//   <span className="cm-unified-hero-mark">
//     <FiGrid size={22} />
//   </span>

//   <div className="flex-1 min-w-0">
//     <p className="cm-unified-kicker">CARGOMATE ADMIN</p>

//     <div className="flex flex-wrap items-center justify-between gap-4 w-full">
//       <h1>{activeNav}</h1>

//       {activeNav === "Admin Dashboard" &&
//         may("dashboard", "add") && (
//           <button
//             type="button"
//             onClick={() => {
//               setActiveNav("Notices");
//               setNoticeMode("create");
//             }}
//             className="ml-auto flex shrink-0 items-center gap-2
//               bg-white text-[#0A8981] hover:bg-[#E6FFFA]
//               text-sm font-semibold px-5 py-2.5 rounded-xl
//               shadow-sm transition-all duration-200"
//           >
//             <FiPlus size={16} />
//             Create Notice
//           </button>
//         )}
//     </div>

//     <p className="cm-unified-desc">
//       Manage {activeNav.toLowerCase()} securely from the
//       CargoMate workspace
//     </p>
//   </div>
// </div>

//             )}
//           {activeNav === "My Profile" && <AccountProfile embedded />}
//           {activeNav === "Notifications" && may("dashboard") && (
//             <AdminNotifications
//               onBack={() => setActiveNav("Admin Dashboard")}
//               onChanged={refreshDashboard}
//             />
//           )}
//           {activeNav === "Access Restricted" && (
//             <div className="p-8 text-slate-600">
//               No administrative modules are assigned to this account. Contact
//               the Main Admin.
//             </div>
//           )}
//           {activeNav === "Admin Dashboard" && may("dashboard") && (
//             <div className="">
//               {dashboardError && (
//                 <div
//                   role="alert"
//                   className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-2 mb-4 text-sm"
//                 >
//                   {dashboardError}
//                 </div>
//               )}
             

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mb-4">
//                 {dashboardCards.map(
//                   ({ label, value, icon: Icon, color, bg }) => (
//                     <div
//                       onClick={() => {
//                         if (label === "Total Users") {
//                           setActiveNav("Users");
//                         } else if (label === "Active Vendors") {
//                           setActiveNav("Vendors/ Partners");
//                         }
//                       }}
//                       key={label}
//                       className="bg-white/90 backdrop-blur-md cursor-pointer rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,34,89,0.05)] hover:shadow-[0_14px_35px_rgba(20,184,166,0.12)] hover:-translate-y-0.5 transition-all border border-teal-100 flex flex-col gap-2"
//                     >
//                       <p className="text-gray-500 text-sm font-medium leading-tight">
//                         {label}
//                       </p>
//                       <div className="flex items-center justify-between">
//                         <p className="text-gray-800 font-bold text-sm sm:text-base">
//                           {value == null ? "—" : value}
//                         </p>
//                         <div className="bg-teal-50 w-7 h-7 flex items-center justify-center rounded-md">
//                           {typeof Icon === "string" ? (
//                             <img src={Icon} alt="icon" className="w-4 h-4" />
//                           ) : (
//                             <Icon className={color} size={16} />
//                           )}{" "}
//                         </div>
//                       </div>
//                     </div>
//                   ),
//                 )}
//               </div>

//               {/* Charts Row 1 */}
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
//                 {/* Area Chart */}
//                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-100 ">
//                   <p className="text-xs sm:text-base  xl:text-lg font-semibold text-gray-500 mb-3">
//                     Subscription Revenue (INR)
//                   </p>
//                   <ResponsiveContainer width="100%" height={140}>
//                     <AreaChart data={dashboardRevenue}>
//                       <defs>
//                         <linearGradient
//                           id="colorVal"
//                           x1="0"
//                           y1="0"
//                           x2="0"
//                           y2="1"
//                         >
//                           <stop
//                             offset="5%"
//                             stopColor="#14B8A6"
//                             stopOpacity={0.3}
//                           />
//                           <stop
//                             offset="95%"
//                             stopColor="#14B8A6"
//                             stopOpacity={0}
//                           />
//                         </linearGradient>
//                       </defs>
//                       <CartesianGrid
//                         strokeDasharray="4 4"
//                         stroke="#d1d5db"
//                         strokeOpacity={0.8}
//                         vertical={false}
//                       />
//                       <XAxis
//                         dataKey="name"
//                         tick={{ fontSize: 10 }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <Tooltip contentStyle={{ fontSize: 11 }} />
//                       <Area
//                         type="monotone"
//                         dataKey="value"
//                         stroke="#14B8A6"
//                         strokeWidth={2}
//                         fill="url(#colorVal)"
//                       />
//                     </AreaChart>
//                   </ResponsiveContainer>
//                 </div>

//                 {/* Bar Chart */}
//                 <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
//                   <p className="text-xs sm:text-base xl:text-lg font-semibold text-gray-500 mb-3">
//                     Plans Sold by Month
//                   </p>
//                   <ResponsiveContainer width="100%" height={140}>
//                     <BarChart data={dashboardRevenue} barCategoryGap="30%">
//                       <CartesianGrid
//                         strokeDasharray="4 4"
//                         stroke="#d1d5db"
//                         strokeOpacity={0.8}
//                         vertical={false}
//                       />
//                       <XAxis
//                         dataKey="name"
//                         tick={{ fontSize: 10 }}
//                         axisLine={false}
//                         tickLine={false}
//                       />
//                       <Tooltip contentStyle={{ fontSize: 11 }} />
//                       <Bar
//                         dataKey="sales"
//                         fill="#14B8A6"
//                         radius={[3, 3, 0, 0]}
//                       />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>

//               {/* Bottom Row */}
//               <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//                 {/* Quick Actions */}
//                 <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 h-fit ">
//                   <p className="text-sm sm:text-base xl:text-lg  border-b-2 font-medium text-gray-800 mb-3">
//                     Quick Action
//                   </p>
//                   <div className="space-y-2">
//                     {quickActions
//                       .filter(({ label }) => canUseQuickAction(label))
//                       .map(({ icon: Icon, label }) => (
//                         <button
//                           key={label}
//                           onClick={() => actionNavigation(label)}
//                           className="w-full flex items-center shadow-sm gap-2 px-3 py-2 border border-teal-100 rounded-lg hover:bg-teal-50 text-sm text-gray-700 transition-colors"
//                         >
//                           {typeof Icon === "string" ? (
//                             <img src={Icon} alt="icon" className="w-4 h-4" />
//                           ) : (
//                             <Icon
//                               size={13}
//                               className="text-teal-500 flex-shrink-0"
//                             />
//                           )}

//                           <span className="font-medium">{label}</span>
//                         </button>
//                       ))}
//                   </div>
//                 </div>

//                 {/* User Growth */}
//                 <div className="rounded-xl p-0 flex flex-col">
//                   <div className="shadow-md border p-3 rounded-xl sm:p-4 border-gray-100 bg-white">
//                     <p className="text-xs sm:text-base  xl:text-lg font-semibold text-[#787B7F] mb-3">
//                       User Growth
//                     </p>
//                     <div className="flex-1">
//                       <ResponsiveContainer width="100%" height={160}>
//                         <AreaChart
//                           data={dashboardGrowth}
//                           margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
//                         >
//                           <defs>
//                             <linearGradient
//                               id="ugGrad"
//                               x1="0"
//                               y1="0"
//                               x2="0"
//                               y2="1"
//                             >
//                               <stop
//                                 offset="5%"
//                                 stopColor="#14B8A6"
//                                 stopOpacity={0.25}
//                               />
//                               <stop
//                                 offset="95%"
//                                 stopColor="#14B8A6"
//                                 stopOpacity={0}
//                               />
//                             </linearGradient>
//                           </defs>

//                           <CartesianGrid
//                             strokeDasharray="6 6"
//                             stroke="#d1d5db"
//                             vertical={false}
//                             strokeOpacity={0.8}
//                           />

//                           <XAxis
//                             dataKey="name"
//                             tick={{ fontSize: 10 }}
//                             axisLine={false}
//                             tickLine={false}
//                           />

//                           <YAxis hide domain={["auto", "auto"]} />

//                           <Tooltip contentStyle={{ fontSize: 11 }} />

//                           <Area
//                             type="monotone"
//                             dataKey="value"
//                             stroke="#14B8A6"
//                             strokeWidth={2}
//                             fill="url(#ugGrad)"
//                           />
//                         </AreaChart>
//                       </ResponsiveContainer>
//                     </div>
//                   </div>

//                   {/* Recent Activity below on mobile / same card medium+ */}
//                   <div className="mt-3 pt-3 border-t border-gray-100 shadow-md rounded-xl p-3 sm:p-4 bg-white">
//                     <p className="text-sm sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-2">
//                       Recent Activity
//                     </p>
//                     <div className="space-y-1.5">
//                       {dashboardActivity.map(({ title, createdAt }, i) => (
//                         <div
//                           key={i}
//                           className="flex justify-between items-start gap-2"
//                         >
//                           <p className="text-[0.8rem]  sm:text-sm font-medium text-[#4D4D4D]  leading-snug">
//                             {title}
//                           </p>
//                           <p className=" text-xs sm:text-sm text-[#9A9A9A]    font-medium flex-shrink-0">
//                             {createdAt
//                               ? new Date(createdAt).toLocaleString("en-IN")
//                               : ""}
//                           </p>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>

//                 {/* Alerts + System Status */}
//                 <div className="flex flex-col gap-3">
//                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
//                     <p className="text-xs sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
//                       Alert & Notification
//                     </p>
//                     <div className="space-y-2">
//                       {dashboardAlerts.map(({ count, label }) => (
//                         <div
//                           key={label}
//                           onClick={() => setActiveNav("Notifications")}
//                           role="button"
//                           tabIndex={0}
//                           onKeyDown={(e) => {
//                             if (e.key === "Enter")
//                               setActiveNav("Notifications");
//                           }}
//                           className="cursor-pointer flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 hover:bg-teal-50 rounded-lg"
//                         >
//                           <div className="flex items-center gap-2">
//                             <span className="bg-[#14B8A6] text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
//                               {count ?? "—"}
//                             </span>
//                             <span className="text-xs sm:text-base  font-medium text-gray-700">
//                               {label}
//                             </span>
//                           </div>
//                           <FiChevronRight
//                             size={20}
//                             className="text-xs sm:text-sm font-mediumtext-gray-400"
//                           />
//                         </div>
//                       ))}
//                     </div>
//                   </div>

//                   <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
//                     <p className="text-xs sm:text-sm border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
//                       System Status
//                     </p>
//                     <div className="space-y-2">
//                       <div className="flex items-center  justify-between ">
//                         <div className="flex items-center gap-2">
//                           <span className="w-2 h-2 bg-green-400 rounded-full" />
//                           <span className="text-xs sm:text-sm font-medium text-gray-600">
//                             API Status
//                           </span>
//                         </div>

//                         <div className="flex items-center gap-1.5">
//                           <span className="text-xs sm:text-sm text-slate-500 font-medium">
//                             Check monitoring
//                           </span>
//                           <span className="w-2 h-2 bg-green-400 rounded-full" />
//                         </div>
//                       </div>
//                       <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-2">
//                           <span className="w-2 h-2 bg-green-400 rounded-full" />
//                           <span className="text-xs sm:text-sm  font-medium text-gray-600">
//                             Server Status
//                           </span>{" "}
//                         </div>

//                         {/* <span className="w-2 h-2 bg-green-400 rounded-full" /> */}
//                       </div>
//                       <p className="text-xs  text-[#787B7F] font-medium">
//                         Verify system health from monitoring
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeNav === "Users" && may("users") && (
//             <UsersSection
//               setShowNotice={setShowNotice}
//               permissions={
//                 staffAccess?.users ?? (staffAccess === null ? null : {})
//               }
//             />
//           )}

//           {/* {activeNav === "Roles & Permissions" && staffAccess === null && (
//             <RolesPermission openCreateIntent={createIntent} />
//           )} */}
          
// {activeNav === "Roles & Permissions" && staffAccess === null && (
//   // <button
//   //   type="button"
//   //   onClick={() => setCreateIntent((prev) => prev + 1)}
//   //   className="ml-auto flex shrink-0 items-center gap-2
//   //     bg-white text-[#0A8981] hover:bg-[#E6FFFA]
//   //     text-sm font-semibold px-5 py-2.5 rounded-xl
//   //     shadow-sm transition-all duration-200"
//   // >
//   //   <FiPlus size={16} />
//   //   Create Role
//   // </button>

//   <RolesPermission openCreateIntent={createIntent} />
// )}

//           {activeNav === "Sub-admins" && staffAccess === null && (
//             <SubAdmins openCreateIntent={createIntent} />
//           )}

//           {activeNav === "Plans/ Subscription" && may("plans") && (
//             <PlanSection
//               openCreateIntent={createIntent}
//               showAddPlan={showAddPlan}
//               setShowAddPlan={setShowAddPlan}
//               permissions={
//                 staffAccess?.plans ?? (staffAccess === null ? null : {})
//               }
//             />
//           )}

//           {/* //  {activeNav === "Master Data" && may("masterData") && <MasterData/>}
//           //  {activeNav === "HS Rules" && may("hsRules") && <HSRules/>}
//           //  {activeNav === "Country Rules" && may("countryRules") && <CountryRules/>}
//           //  {activeNav === "DGFT Schemes" && may("dgftSchemes") && <DGFTSchemes/>}

//           //  {activeNav === "Shipment" && may("shipment") && <Shipment /> }


//           //  {activeNav === "Vendors/ Partners" && may("vendors") && <VendorsPartners permissions={staffAccess?.vendors ?? (staffAccess === null ? null : {})} /> }
//           //  {activeNav === "AI Assistant" && may("aiAssistant") && <AiAssistant /> } */}

//           {activeNav === "Master Data" && may("masterData") && <MasterData />}
//           {activeNav === "HS Rules" && may("hsRules") && <HSRules />}
//           {activeNav === "Country Rules" && may("countryRules") && (
//             <CountryRules />
//           )}
//           {activeNav === "DGFT Schemes" && may("dgftSchemes") && (
//             <DGFTSchemes />
//           )}

//           {activeNav === "Shipment" && may("shipment") && <Shipment />}

//           {activeNav === "Notices" && (
//             <NoticesSection mode={noticeMode} setMode={setNoticeMode} />
//           )}
//           {activeNav === "Vendors/ Partners" && may("vendors") && (
//             <VendorsPartners />
//           )}
//           {activeNav === "AI Assistant" && may("aiAssistant") && (
//             <AiAssistant />
//           )}

//           {/* //  {activeNav === "Master Data" && <MasterData/>}
//           //  {activeNav === "HS Rules" && <HSRules/>}
//           //  {activeNav === "Country Rules" && <CountryRules/>}
//           //  {activeNav === "DGFT Schemes" && <DGFTSchemes/>}

//           //  {activeNav === "Shipment" && <Shipment /> }
//           //  {activeNav === "Notices" && <NoticesSection mode={noticeMode} setMode={setNoticeMode} /> }


//           //  {activeNav === "Vendors/ Partners" && <VendorsPartners /> }
//           //  {activeNav === "AI Assistant" && <AiAssistant /> } */}

//           {activeNav === "Trade Intelligence" && may("tradeIntelligence") && <TradeIntelligence />}

//           {activeNav === "API Integrations" && may("integrations") && <APIIntegrations />}

//           {activeNav === "Ad Managment" && may("ads") && <AdManagement />}
//           {activeNav === "Support" && may("support") && <Support />}
//           {activeNav === "Modules" && may("modules") && <Modules />}
//           {activeNav === "Settings" && may("settings") && <Settings />}
//           {showBot && (
//             <WhatsappBot
//               showBot={showBot}
//               setShowBot={setShowBot}
//               fabOpen={fabOpen}
//               setFabOpen={setFabOpen}
//             />
//           )}

//           {/* <CreateNewInvoice /> */}
//         </main>
//       </div>
//       {messages && <MessagesModal onClose={() => setMessage(false)} />}
//       {notifications && (
//         <NotificationsModal onClose={() => setNotifications(false)} />
//       )}

//       {/* Modal removed - full page navigation used */}

//       {/* {showNotice && <CreateNotice setShowNotice={setShowNotice} />} */}
//       {fabOpen && (
//         <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
//       )}

//       <div className="fixed bottom-6 right-6 flex flex-col items-end gap-3 z-40">
//         {fabOpen && (
//           <div className="flex flex-col gap-2 items-end mb-1">
//             {fabActions.map((a, i) => (
//               <button
//                 key={i}
//                 onClick={() => {
//                   handleFabAction(a.label);
//                   setActiveNav("");
//                 }}
//                 className="flex items-center gap-3 bg-white rounded-full shadow-lg px-4 py-2.5 hover:bg-gray-50 transition-all"
//               >
//                 <span className="text-sm font-medium text-gray-700">
//                   {a.label}
//                 </span>
//                 <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
//                   {a.icon}
//                 </div>
//               </button>
//             ))}
//           </div>
//         )}
//         <button
//           onClick={() => setFabOpen(!fabOpen)}
//           className={`w-14 h-14 rounded-full shadow-xl flex items-center justify-center text-white transition-all ${fabOpen ? "bg-gray-600" : "bg-teal-500 hover:bg-teal-600"}`}
//         >
//           {fabOpen ? <FiX size={22} /> : <FiPlus size={24} />}
//         </button>
//       </div>

//       {account && <MyAccount onClose={() => setAccount(false)} />}
//     </div>
//   );
// }



// mahima code //
import "./CargoMateAdminTheme2026.css";
import { usePublicConfig } from "../../../lib/publicConfig";
import AccountProfile, {
  AccountBadge,
} from "../../../components/AccountProfile";
import { clearSession } from "../../../lib/auth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  FiMenu,
  FiSearch,
  FiBell,
  FiMail,
  FiSun,
  FiMoon,
  FiPlus,
  FiUsers,
  FiShield,
  FiCreditCard,
  FiDatabase,
  FiFileText,
  FiGlobe,
  FiPackage,
  FiTruck,
  FiCpu,
  FiPieChart,
  FiLink,
  FiMonitor,
  FiHelpCircle,
  FiGrid,
  FiSettings,
  FiChevronRight,
  FiUserPlus,
  FiUserCheck,
  FiPlusCircle,
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
  FiHome,
  FiCamera,
  FiLock,
  FiSend,
} from "react-icons/fi";
import {
  FaTrash,
  FaCheck,
  FaBox,
  FaBell,
  FaChevronLeft,
  FaFileLines,
  FaListCheck,
  FaGripVertical,
  FaPlus,
  FaSliders,
  FaEye,
  FaClock,
  FaUser,
  FaFloppyDisk,
  FaPaperPlane,
  FaUsers,
  FaIndianRupeeSign,
  FaRotate,
} from "react-icons/fa6";

import {
  FiEdit,
  FiTrash2,
  FiCheck,
  FiDollarSign,
  FiRefreshCw,
  FiUser,
} from "react-icons/fi";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import {
  MdDashboard,
  MdPeople,
  MdSecurity,
  MdSubscriptions,
  MdStorage,
  MdDescription,
  MdPublic,
  MdBusiness,
  MdLocalShipping,
  MdAnnouncement,
  MdSmartToy,
  MdInsights,
  MdApi,
  MdCampaign,
  MdSupportAgent,
  MdWidgets,
  MdSettings,
} from "react-icons/md";
import { RxCross1 } from "react-icons/rx";
import { FaCalendarAlt, FaTimes } from "react-icons/fa";

import RolesPermission from "./RolesPermission";
import SubAdmins from "./SubAdmins";
import API from "../../api/axios";
import Settings from "./Settings";
import MasterData from "./MasterData";
import HSRules from "./HsRules";
import CountryRules from "./CountryRules";
import DGFTSchemes from "./DgftScheme";
import Shipment from "./Shipment";
import VendorsPartners from "./VendorsPartners";
import NoticesSection from "./Notices";
import AdminNotifications from "./AdminNotifications";
import AiAssistant from "./AiAssistant";
import TradeIntelligence from "./TradeIntelligence";
import Modules from "./Modules";
import Support from "./Support";
import APIIntegrations from "./ApiIntegrations";
import AdManagement from "./AdManagement";
import UsersSection from "./Users";
import PlanSection from "./PlansSubscriptions";
import WhatsappBot from "./WhatsappBot";
import { BsCalendarCheck, BsPersonPlus, BsGraphUp } from "react-icons/bs";
import { HiOutlineDocumentText } from "react-icons/hi";
import { RiWhatsappLine } from "react-icons/ri";
import { FiX } from "react-icons/fi";
import ai from "../../assets/icon/ai.png";
import user from "../../assets/icon/user.png";
import suppliers from "../../assets/icon/suppliers.png";
import linear from "../../assets/icon/linear.png";
import anal from "../../assets/icon/analytical.png";
import vector from "../../assets/icon/vector.png";
import time from "../../assets/icon/time.png";
import document from "../../assets/icon/document.png";
import order from "../../assets/icon/orders.png";

import logo from "../../assets/Images/logo.png";
import CreateNewInvoice from "./CreateNewInvoice";

import MessagesModal from "../../components/Messages";
import NotificationsModal from "../../components/Notifications";
import MyAccount from "../admin/MyAccount";

const fabActions = [
  {
    label: "New Booking",
    icon: <BsCalendarCheck size={22} className="text-teal-600" />,
  },
  {
    label: "Add Vendor",
    icon: <BsPersonPlus size={22} className="text-teal-600" />,
  },
  {
    label: "Report",
    icon: <HiOutlineDocumentText size={22} className="text-teal-600" />,
  },
  {
    label: "WhatsApp Bot",
    icon: <RiWhatsappLine size={22} className="text-teal-600" />,
  },
];

const navItems = [
  { icon: MdDashboard, label: "Admin Dashboard", color: "text-orange-400" },
  { icon: MdPeople, label: "Users", color: "text-yellow-400" },
  { icon: MdPeople, label: "Vendors/ Partners", color: "text-green-400" },
  { icon: MdSecurity, label: "Roles & Permissions", color: "text-purple-400" },
  { icon: MdPeople, label: "Sub-admins", color: "text-teal-400" },
  {
    icon: MdSubscriptions,
    label: "Plans/ Subscription",
    color: "text-teal-400",
  },
  { icon: MdStorage, label: "Master Data", color: "text-blue-400" },
  { icon: MdDescription, label: "HS Rules", color: "text-red-400" },
  { icon: MdPublic, label: "Country Rules", color: "text-indigo-400" },
  { icon: MdBusiness, label: "DGFT Schemes", color: "text-pink-400" },
  { icon: MdLocalShipping, label: "Shipment", color: "text-cyan-400" },
  { icon: MdAnnouncement, label: "Notices", color: "text-amber-400" },
  { icon: FiBell, label: "Notifications", color: "text-teal-400" },

  { icon: MdSmartToy, label: "AI Assistant", color: "text-blue-500" },
  // { icon: MdInsights, label: "Trade Intelligence", color: "text-rose-400" },
  // { icon: MdApi, label: "API Integrations", color: "text-emerald-400" },
  { icon: MdCampaign, label: "Ad Managment", color: "text-yellow-500" },
  { icon: MdSupportAgent, label: "Support", color: "text-orange-500" },
  // { icon: MdWidgets, label: "Modules", color: "text-indigo-500" },
  { icon: MdSettings, label: "Settings", color: "text-gray-400" },
];

const quickActions = [
  { icon: user, label: "User" },
  { icon: order, label: "Vendor" },
  { icon: FiShield, label: "Add Role" },
  { icon: FiUserPlus, label: "Add Sub-admin" },
  { icon: suppliers, label: "Add Plan" },
  { icon: FiPlus, label: "Create Notice" },
  { icon: anal, label: "Add Hs Rule" },
  { icon: document, label: "Add Country Rule" },
];

function CreateNotice({ setShowNotice }) {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [date, setDate] = useState("");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const removeImage = () => {
    setImage(null);
    setPreview(null);
  };

  const validate = () => {
    let err = {};
    if (!title.trim()) err.title = "Title required";
    if (!desc.trim()) err.desc = "Description required";
    if (!date) err.date = "Date required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const data = {
      title,
      desc,
      date,
      image,
    };

    console.log("Submit:", data);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center px-3 sm:px-6">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-4 sm:p-6">
        <div className="flex items-center justify-between  mb-4">
          <h2 className="text-lg sm:text-xl font-semibold ">Create Notice</h2>
          <button>
            <RxCross1 onClick={() => setShowNotice((prev) => !prev)} />
          </button>
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-700">Title</label>
          <input
            type="text"
            placeholder="Give One Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`w-full mt-1 px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:ring-red-400"
                : "focus:ring-teal-500"
            }`}
          />
          {errors.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>

        <div className="mb-3">
          <label className="text-sm text-gray-700">Description</label>
          <textarea
            rows="3"
            placeholder="Type Description here..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            className={`w-full mt-1 px-3 py-2 border rounded-md text-sm resize-none focus:outline-none focus:ring-2 ${
              errors.desc
                ? "border-red-400 focus:ring-red-400"
                : "focus:ring-teal-500"
            }`}
          />
          {errors.desc && (
            <p className="text-red-500 text-sm mt-1">{errors.desc}</p>
          )}
        </div>

        <div className="mb-3 flex flex-col  ">
          <label className="text-sm text-gray-700">Add image (optional)</label>

          <label className="mt-2 self-start bg-teal-500 text-white px-4 py-2 rounded-md text-sm cursor-pointer hover:bg-teal-600 transition">
            Upload Image
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="mt-3 relative w-32 h-32">
              <img
                src={preview}
                alt="preview"
                className="w-full h-full object-cover rounded-md border"
              />
              <button
                onClick={removeImage}
                className="absolute -top-2 -right-2 bg-black text-white p-1 rounded-full text-sm"
              >
                <FaTimes />
              </button>
            </div>
          )}
        </div>

        <div className="mb-5">
          <label className="text-sm text-gray-700">Schedule Date</label>
          <div className="relative mt-1">
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className={`w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-2 ${
                errors.date
                  ? "border-red-400 focus:ring-red-400"
                  : "focus:ring-teal-500"
              }`}
            />
            {/* <FaCalendarAlt className="absolute right-3 top-3 text-gray-400 text-sm pointer-events-none" /> */}
          </div>
          {errors.date && (
            <p className="text-red-500 text-sm mt-1">{errors.date}</p>
          )}
        </div>

        <button
          onClick={handleSubmit}
          className="w-full bg-teal-500 text-white py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition disabled:opacity-50"
        >
          Publish Notice
        </button>

        <button
          type="button"
          onClick={() => setShowNotice(false)}
          className="w-full mt-2 border py-2 rounded-md text-sm text-gray-500 hover:bg-teal-500 hover:text-white transition"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default function AdminDashboard({ profileMode = false }) {
  const navigate = useNavigate();
  const siteBranding = usePublicConfig();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarVisible, setDesktopSidebarVisible] = useState(true);
  const [activeNav, setActiveNav] = useState(
    profileMode ? "My Profile" : "Admin Dashboard",
  );
  // React may reuse the dashboard instance when navigating to /admin-profile.
  // Reset the section so an open User/Vendor drawer cannot cover the profile route.
  useEffect(() => {
    setActiveNav(profileMode ? "My Profile" : "Admin Dashboard");
  }, [profileMode]);
  const [staffAccess, setStaffAccess] = useState(null);
  useEffect(() => {
    let active = true;
    const refreshEffectivePermissions = () => API.get("/auth/me")
      .then(({ data }) => {
        if (!active) return;
        // Backend is authoritative: refresh when returning to the tab after role changes.
        setStaffAccess(data?.user?.isInternalStaff ? (data.user.permissions || {}) : null);
      })
      .catch(() => {
        // Never treat an unreadable role as unrestricted Admin access.
        if (active) setStaffAccess({});
      });
    refreshEffectivePermissions();
    window.addEventListener("focus", refreshEffectivePermissions);
    return () => {
      active = false;
      window.removeEventListener("focus", refreshEffectivePermissions);
    };
  }, []);
  const menuModules = {
    "Admin Dashboard": "dashboard",
    Users: "users",
    "Vendors/ Partners": "vendors",
    "Plans/ Subscription": "plans",
    "Master Data": "masterData",
    "HS Rules": "hsRules",
    "Country Rules": "countryRules",
    "DGFT Schemes": "dgftSchemes",
    Shipment: "shipment",
    Notices: "dashboard",
    Notifications: "dashboard",
    "AI Assistant": "aiAssistant",
    "Ad Managment": "ads",
    "Trade Intelligence": "tradeIntelligence",
    "API Integrations": "integrations",
    Modules: "modules",
    Support: "support",
    Settings: "settings",
  };
  const visibleAdminNav =
    staffAccess === null
      ? navItems
      : navItems.filter(
          (item) =>
            !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
            staffAccess[menuModules[item.label]]?.view === true,
        );
  // Never keep a sub-admin on a tab they cannot view, even when arriving via a direct link.
  useEffect(() => {
    if (staffAccess === null || profileMode) return;
    const permitted = navItems.filter(
      (item) =>
        !["Roles & Permissions", "Sub-admins"].includes(item.label) &&
        staffAccess[menuModules[item.label]]?.view === true,
    );
    if (!permitted.some((item) => item.label === activeNav))
      setActiveNav(permitted[0]?.label || "Access Restricted");
  }, [staffAccess, activeNav, profileMode]);
  const may = (module, action = "view") =>
    staffAccess === null || staffAccess?.[module]?.[action] === true;

  const [showNotice, setShowNotice] = useState(false);
  const [showAddPlan, setShowAddPlan] = useState(false);
  const [showBot, setShowBot] = useState(false);
  const [fabOpen, setFabOpen] = useState(false);
  const [messages, setMessage] = useState(false);
  const [noticeMode, setNoticeMode] = useState("list");
  const [notifications, setNotifications] = useState(false);
  const [account, setAccount] = useState(false);

  const [createIntent, setCreateIntent] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [dashboardError, setDashboardError] = useState("");
  const refreshDashboard = async () => {
    try {
      const { data } = await API.get("/admin/dashboard");
      setDashboardData(data);
      setDashboardError("");
    } catch (e) {
      setDashboardError(
        e.response?.data?.message || "Dashboard data unavailable",
      );
    }
  };
  useEffect(() => {
    if (activeNav === "Admin Dashboard") refreshDashboard();
  }, [activeNav]);
  const dashboardStats = dashboardData?.stats || {};
  const dashboardCards = [
    {
      label: "Total Users",
      value: dashboardStats.totalUsers,
      icon: user,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      label: "Total Subscription",
      value: dashboardStats.totalSubscription,
      icon: suppliers,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      label: "Total Shipment",
      value: dashboardStats.totalShipment,
      icon: ai,
      bg: "bg-sky-50",
      color: "text-sky-600",
    },
    {
      label: "Revenue",
      value:
        dashboardStats.revenue == null
          ? null
          : `₹${Number(dashboardStats.revenue).toLocaleString("en-IN")}`,
      icon: linear,
      bg: "bg-green-50",
      color: "text-green-600",
    },
    {
      label: "Pending Approvals",
      value: dashboardStats.pendingApprovals,
      icon: time,
      bg: "bg-amber-50",
      color: "text-amber-600",
    },
    {
      label: "Active Vendors",
      value: dashboardStats.activeVendors,
      icon: vector,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      label: "Plans Sold",
      value: dashboardStats.paidSubscriptions,
      icon: order,
      bg: "bg-violet-50",
      color: "text-violet-600",
    },
    {
      label: "B2B Subscriptions",
      value: dashboardStats.b2bSubscriptions,
      icon: suppliers,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
    {
      label: "B2B Plans Created",
      value: dashboardStats.b2bPlans,
      icon: order,
      bg: "bg-teal-50",
      color: "text-teal-600",
    },
  ];
  const dashboardRevenue = dashboardData?.charts?.revenueGrowth || [];
  const dashboardGrowth = dashboardData?.charts?.userGrowth || [];
  const dashboardActivity = dashboardData?.recentActivity || [];
  const dashboardAlerts = [
    { label: "Unread", count: dashboardStats.unreadNotifications },
    { label: "Read", count: dashboardStats.readNotifications },
    ...(dashboardStats.complianceAlerts != null
      ? [{ label: "Compliance", count: dashboardStats.complianceAlerts }]
      : []),
    ...(dashboardStats.apiFailureAlerts != null
      ? [{ label: "API Failure Alert", count: dashboardStats.apiFailureAlerts }]
      : []),
  ];
  const quickActionPermissions = {
    "Add User": ["users", "add"],
    "Add Vendor": ["vendors", "add"],
    "Add Role": null,
    "Add Sub-admin": null,
    "Add Plan": ["plans", "add"],
    "Create Notice": ["dashboard", "add"],
    "Add Hs Rule": ["hsRules", "add"],
    "Add Country Rule": ["countryRules", "add"],
  };
  const canUseQuickAction = (label) => {
    const rule = quickActionPermissions[label];
    if (!rule) return staffAccess === null;
    return may(rule[0], rule[1]);
  };
  const actionNavigation = (label) => {
    if (!canUseQuickAction(label)) return;
    const mapping = {
      "Add User": "Users",
      "Add Vendor": "Vendors/ Partners",
      "Add Role": "Roles & Permissions",
      "Add Sub-admin": "Sub-admins",
      "Add Plan": "Plans/ Subscription",
      "Create Notice": "Notices",
      "Add Hs Rule": "HS Rules",
      "Add Country Rule": "Country Rules",
    };
    const target = mapping[label];
    if (!target) return;
    if (
      staffAccess !== null &&
      ["Roles & Permissions", "Sub-admins"].includes(target)
    )
      return;
    setActiveNav(target);
    setCreateIntent((n) => n + 1);
    if (target === "Notices") setNoticeMode("create");
  };

  const handleFabAction = (label) => {
    if (label === "WhatsApp Bot") {
      setShowBot(true);
      setFabOpen(false);
    } else setFabOpen(false);
  };

  return (
    <div className="cargomate-admin-shell flex h-screen w-full min-w-0 overflow-hidden bg-[#F9FAFB] ">
      {/* Overlay for mobile */}

      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed lg:static inset-y-0 left-0 z-30 w-52 xl:w-60
            text-white bg-white flex flex-col
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          ${desktopSidebarVisible ? "lg:translate-x-0" : "lg:hidden"} flex-shrink-0
        `}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 px-4 py-2 justify-center border-b border-gray-700">
          <img src={siteBranding.systemLogo || logo} className="h-12" />
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto pr-3 py-7 space-y-0.5 bg-gray-900">
          {visibleAdminNav.map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              onClick={() => {
                setActiveNav(label);
                if (label === "Notices") setNoticeMode("list");
                setShowBot(false);
                setSidebarOpen(false);
              }}
              className={`w-full flex items-center gap-2 py-3 pl-10 rounded-r-lg  text-md font-semibold transition-colors text-left
                ${
                  activeNav === label
                    ? "bg-teal-500 text-white"
                    : "text-gray-400 hover:bg-gray-700 hover:text-white"
                }`}
            >
              <Icon size={18} className={`${color} flex-shrink-0`} />
              <span className="truncate text-[0.9rem] ">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <div className="flex-1 min-w-0 min-h-0 flex flex-col w-full overflow-hidden">
        {/* Topbar */}
        <header className="bg-white border-b border-gray-200  px-3 sm:px-4 py-1 flex items-center gap-3 flex-shrink-0">
          <button
            className="p-1.5 rounded-md hover:bg-gray-100 text-gray-600"
            title="Toggle admin sidebar"
            aria-label="Toggle admin sidebar"
            onClick={() => {
              if (window.innerWidth >= 1024)
                setDesktopSidebarVisible((v) => !v);
              else setSidebarOpen(true);
            }}
          >
            <FiMenu size={18} />
          </button>

          <div className="flex-1 max-w-xs sm:max-w-sm md:max-w-md">
            <div className="relative">
              <FiSearch
                className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400"
                size={14}
              />
              <input
                type="text"
                placeholder="Search"
                className="w-full pl-8 pr-3 py-1.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-1 focus:ring-teal-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-1.5 ml-auto">
            <button
              onClick={() => setActiveNav("Notifications")}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 relative"
            >
              <FiBell size={16} />
              {dashboardStats.unreadNotifications > 0 && (
                <span className="absolute -top-1 -right-1 min-w-4 rounded-full bg-red-500 px-1 text-center text-[10px] text-white">
                  {dashboardStats.unreadNotifications}
                </span>
              )}
            </button>
            <button
              onClick={() => setMessage(true)}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600"
            >
              <FiMail size={16} />
            </button>

            <AccountBadge />
          </div>
        </header>

        {/* Page Content */}

        <main className={`min-h-0 min-w-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-y-contain bg-gray-50 ${activeNav === "Shipment" ? "p-0" : "p-3 sm:p-4 lg:p-6"}`}>
          {!profileMode &&
            !["Access Restricted", "Plans/ Subscription"].includes(
              activeNav,
            ) && (
            //   <div
            //     className="cm-unified-hero"
            //     aria-label={`${activeNav} management`}
            //   >
            //     <span className="cm-unified-hero-mark">
            //       <FiGrid size={22} />
            //     </span>
            //     <div className="min-w-0">
            //       <p className="cm-unified-kicker">CARGOMATE ADMIN</p>
            //       <div className="flex gap-20 w-full">
            //          <h1>{activeNav}</h1>
            //          <div className="flex justify-end mb-3  ml-80">
            //     {may("dashboard", "add") && (
            //       <button
            //         onClick={() => {
            //           setActiveNav("Notices");
            //           setNoticeMode("create");
            //         }}
            //         className="flex items-center gap-1.5 bg-white hover:bg-white-600 text-teal-500 
            // text-sm font-semibold px-3 py-2 rounded-lg transition-colors"
            //       >
            //         <FiPlus size={13} />
            //         <span> Create Notice</span>
            //       </button>
            //     )}
            //   </div>
            //       </div>
                 
            //       <p className="cm-unified-desc">
            //         Manage {activeNav.toLowerCase()} securely from the CargoMate
            //         workspace
            //       </p>
            //     </div>

                
            //   </div>

            
<div className="cm-unified-hero">
  <span className="cm-unified-hero-mark">
    <FiGrid size={22} />
  </span>

  <div className="flex-1 min-w-0">
    <p className="cm-unified-kicker">CARGOMATE ADMIN</p>

    <div className="flex flex-wrap items-center justify-between gap-4 w-full">
      <h1>{activeNav}</h1>

      {activeNav === "Admin Dashboard" &&
        may("dashboard", "add") && (
          <button
            type="button"
            onClick={() => {
              setActiveNav("Notices");
              setNoticeMode("create");
            }}
            className="ml-auto flex shrink-0 items-center gap-2
              bg-white text-[#0A8981] hover:bg-[#E6FFFA]
              text-sm font-semibold px-5 py-2.5 rounded-xl
              shadow-sm transition-all duration-200"
          >
            <FiPlus size={16} />
            Create Notice
          </button>
        )}
    </div>

    <p className="cm-unified-desc">
      Manage {activeNav.toLowerCase()} securely from the
      CargoMate workspace
    </p>
  </div>
</div>

            )}
          {activeNav === "My Profile" && <AccountProfile embedded />}
          {activeNav === "Notifications" && may("dashboard") && (
            <AdminNotifications
              onBack={() => setActiveNav("Admin Dashboard")}
              onChanged={refreshDashboard}
            />
          )}
          {activeNav === "Access Restricted" && (
            <div className="p-8 text-slate-600">
              No administrative modules are assigned to this account. Contact
              the Main Admin.
            </div>
          )}
          {activeNav === "Admin Dashboard" && may("dashboard") && (
            <div className="">
              {dashboardError && (
                <div
                  role="alert"
                  className="rounded-xl border border-amber-200 bg-amber-50 text-amber-800 px-4 py-2 mb-4 text-sm"
                >
                  {dashboardError}
                </div>
              )}
             

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3 mb-4">
                {dashboardCards.map(
                  ({ label, value, icon: Icon, color, bg }) => (
                    <div
                      onClick={() => {
                        if (label === "Total Users") {
                          setActiveNav("Users");
                        } else if (label === "Active Vendors") {
                          setActiveNav("Vendors/ Partners");
                        }
                      }}
                      key={label}
                      className="bg-white/90 backdrop-blur-md cursor-pointer rounded-2xl p-4 shadow-[0_10px_30px_rgba(0,34,89,0.05)] hover:shadow-[0_14px_35px_rgba(20,184,166,0.12)] hover:-translate-y-0.5 transition-all border border-teal-100 flex flex-col gap-2"
                    >
                      <p className="text-gray-500 text-sm font-medium leading-tight">
                        {label}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-gray-800 font-bold text-sm sm:text-base">
                          {value == null ? "—" : value}
                        </p>
                        <div className="bg-teal-50 w-7 h-7 flex items-center justify-center rounded-md">
                          {typeof Icon === "string" ? (
                            <img src={Icon} alt="icon" className="w-4 h-4" />
                          ) : (
                            <Icon className={color} size={16} />
                          )}{" "}
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>

              {/* Charts Row 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-3">
                {/* Area Chart */}
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border-2 border-gray-100 ">
                  <p className="text-xs sm:text-base  xl:text-lg font-semibold text-gray-500 mb-3">
                    Subscription Revenue (INR)
                  </p>
                  <ResponsiveContainer width="100%" height={140}>
                    <AreaChart data={dashboardRevenue}>
                      <defs>
                        <linearGradient
                          id="colorVal"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="5%"
                            stopColor="#14B8A6"
                            stopOpacity={0.3}
                          />
                          <stop
                            offset="95%"
                            stopColor="#14B8A6"
                            stopOpacity={0}
                          />
                        </linearGradient>
                      </defs>
                      <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#d1d5db"
                        strokeOpacity={0.8}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Area
                        type="monotone"
                        dataKey="value"
                        stroke="#14B8A6"
                        strokeWidth={2}
                        fill="url(#colorVal)"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>

                {/* Bar Chart */}
                <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                  <p className="text-xs sm:text-base xl:text-lg font-semibold text-gray-500 mb-3">
                    Plans Sold by Month
                  </p>
                  <ResponsiveContainer width="100%" height={140}>
                    <BarChart data={dashboardRevenue} barCategoryGap="30%">
                      <CartesianGrid
                        strokeDasharray="4 4"
                        stroke="#d1d5db"
                        strokeOpacity={0.8}
                        vertical={false}
                      />
                      <XAxis
                        dataKey="name"
                        tick={{ fontSize: 10 }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <Tooltip contentStyle={{ fontSize: 11 }} />
                      <Bar
                        dataKey="sales"
                        fill="#14B8A6"
                        radius={[3, 3, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bottom Row */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Quick Actions */}
                <div className="bg-white rounded-xl p-3 sm:p-5 shadow-md border border-gray-100 h-fit ">
                  <p className="text-sm sm:text-base xl:text-lg  border-b-2 font-medium text-gray-800 mb-3">
                    Quick Action
                  </p>
                  <div className="space-y-2">
                    {quickActions
                      .filter(({ label }) => canUseQuickAction(label))
                      .map(({ icon: Icon, label }) => (
                        <button
                          key={label}
                          onClick={() => actionNavigation(label)}
                          className="w-full flex items-center shadow-sm gap-2 px-3 py-2 border border-teal-100 rounded-lg hover:bg-teal-50 text-sm text-gray-700 transition-colors"
                        >
                          {typeof Icon === "string" ? (
                            <img src={Icon} alt="icon" className="w-4 h-4" />
                          ) : (
                            <Icon
                              size={13}
                              className="text-teal-500 flex-shrink-0"
                            />
                          )}

                          <span className="font-medium">{label}</span>
                        </button>
                      ))}
                  </div>
                </div>

                {/* User Growth */}
                <div className="rounded-xl p-0 flex flex-col">
                  <div className="shadow-md border p-3 rounded-xl sm:p-4 border-gray-100 bg-white">
                    <p className="text-xs sm:text-base  xl:text-lg font-semibold text-[#787B7F] mb-3">
                      User Growth
                    </p>
                    <div className="flex-1">
                      <ResponsiveContainer width="100%" height={160}>
                        <AreaChart
                          data={dashboardGrowth}
                          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
                        >
                          <defs>
                            <linearGradient
                              id="ugGrad"
                              x1="0"
                              y1="0"
                              x2="0"
                              y2="1"
                            >
                              <stop
                                offset="5%"
                                stopColor="#14B8A6"
                                stopOpacity={0.25}
                              />
                              <stop
                                offset="95%"
                                stopColor="#14B8A6"
                                stopOpacity={0}
                              />
                            </linearGradient>
                          </defs>

                          <CartesianGrid
                            strokeDasharray="6 6"
                            stroke="#d1d5db"
                            vertical={false}
                            strokeOpacity={0.8}
                          />

                          <XAxis
                            dataKey="name"
                            tick={{ fontSize: 10 }}
                            axisLine={false}
                            tickLine={false}
                          />

                          <YAxis hide domain={["auto", "auto"]} />

                          <Tooltip contentStyle={{ fontSize: 11 }} />

                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#14B8A6"
                            strokeWidth={2}
                            fill="url(#ugGrad)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Recent Activity below on mobile / same card medium+ */}
                  <div className="mt-3 pt-3 border-t border-gray-100 shadow-md rounded-xl p-3 sm:p-4 bg-white">
                    <p className="text-sm sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-2">
                      Recent Activity
                    </p>
                    <div className="space-y-1.5">
                      {dashboardActivity.map(({ title, createdAt }, i) => (
                        <div
                          key={i}
                          className="flex justify-between items-start gap-2"
                        >
                          <p className="text-[0.8rem]  sm:text-sm font-medium text-[#4D4D4D]  leading-snug">
                            {title}
                          </p>
                          <p className=" text-xs sm:text-sm text-[#9A9A9A]    font-medium flex-shrink-0">
                            {createdAt
                              ? new Date(createdAt).toLocaleString("en-IN")
                              : ""}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Alerts + System Status */}
                <div className="flex flex-col gap-3">
                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                    <p className="text-xs sm:text-base border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
                      Alert & Notification
                    </p>
                    <div className="space-y-2">
                      {dashboardAlerts.map(({ count, label }) => (
                        <div
                          key={label}
                          onClick={() => setActiveNav("Notifications")}
                          role="button"
                          tabIndex={0}
                          onKeyDown={(e) => {
                            if (e.key === "Enter")
                              setActiveNav("Notifications");
                          }}
                          className="cursor-pointer flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0 hover:bg-teal-50 rounded-lg"
                        >
                          <div className="flex items-center gap-2">
                            <span className="bg-[#14B8A6] text-white text-sm font-bold w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0">
                              {count ?? "—"}
                            </span>
                            <span className="text-xs sm:text-base  font-medium text-gray-700">
                              {label}
                            </span>
                          </div>
                          <FiChevronRight
                            size={20}
                            className="text-xs sm:text-sm font-mediumtext-gray-400"
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-3 sm:p-4 shadow-md border border-gray-100">
                    <p className="text-xs sm:text-sm border-b-2  xl:text-lg font-semibold text-[#787B7F] mb-3">
                      System Status
                    </p>
                    <div className="space-y-2">
                      <div className="flex items-center  justify-between ">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-xs sm:text-sm font-medium text-gray-600">
                            API Status
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className="text-xs sm:text-sm text-slate-500 font-medium">
                            Check monitoring
                          </span>
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 bg-green-400 rounded-full" />
                          <span className="text-xs sm:text-sm  font-medium text-gray-600">
                            Server Status
                          </span>{" "}
                        </div>

                        {/* <span className="w-2 h-2 bg-green-400 rounded-full" /> */}
                      </div>
                      <p className="text-xs  text-[#787B7F] font-medium">
                        Verify system health from monitoring
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === "Users" && may("users") && (
            <UsersSection
              setShowNotice={setShowNotice}
              permissions={
                staffAccess?.users ?? (staffAccess === null ? null : {})
              }
            />
          )}

          {/* {activeNav === "Roles & Permissions" && staffAccess === null && (
            <RolesPermission openCreateIntent={createIntent} />
          )} */}
          
{activeNav === "Roles & Permissions" && staffAccess === null && (
  // <button
  //   type="button"
  //   onClick={() => setCreateIntent((prev) => prev + 1)}
  //   className="ml-auto flex shrink-0 items-center gap-2
  //     bg-white text-[#0A8981] hover:bg-[#E6FFFA]
  //     text-sm font-semibold px-5 py-2.5 rounded-xl
  //     shadow-sm transition-all duration-200"
  // >
  //   <FiPlus size={16} />
  //   Create Role
  // </button>

  <RolesPermission openCreateIntent={createIntent} />
)}

          {activeNav === "Sub-admins" && staffAccess === null && (
            <SubAdmins openCreateIntent={createIntent} />
          )}

          {activeNav === "Plans/ Subscription" && may("plans") && (
            <PlanSection
              openCreateIntent={createIntent}
              showAddPlan={showAddPlan}
              setShowAddPlan={setShowAddPlan}
              permissions={
                staffAccess?.plans ?? (staffAccess === null ? null : {})
              }
            />
          )}

          {/* //  {activeNav === "Master Data" && may("masterData") && <MasterData/>}
          //  {activeNav === "HS Rules" && may("hsRules") && <HSRules/>}
          //  {activeNav === "Country Rules" && may("countryRules") && <CountryRules/>}
          //  {activeNav === "DGFT Schemes" && may("dgftSchemes") && <DGFTSchemes/>}

          //  {activeNav === "Shipment" && may("shipment") && <Shipment /> }


          //  {activeNav === "Vendors/ Partners" && may("vendors") && <VendorsPartners permissions={staffAccess?.vendors ?? (staffAccess === null ? null : {})} /> }
          //  {activeNav === "AI Assistant" && may("aiAssistant") && <AiAssistant /> } */}

          {activeNav === "Master Data" && may("masterData") && <MasterData />}
          {activeNav === "HS Rules" && may("hsRules") && <HSRules />}
          {activeNav === "Country Rules" && may("countryRules") && (
            <CountryRules />
          )}
          {activeNav === "DGFT Schemes" && may("dgftSchemes") && (
            <DGFTSchemes />
          )}

          {activeNav === "Shipment" && may("shipment") && <Shipment />}

          {activeNav === "Notices" && (
            <NoticesSection mode={noticeMode} setMode={setNoticeMode} />
          )}
          {activeNav === "Vendors/ Partners" && may("vendors") && (
            <VendorsPartners />
          )}
          {activeNav === "AI Assistant" && may("aiAssistant") && (
            <AiAssistant />
          )}

          {/* //  {activeNav === "Master Data" && <MasterData/>}
          //  {activeNav === "HS Rules" && <HSRules/>}
          //  {activeNav === "Country Rules" && <CountryRules/>}
          //  {activeNav === "DGFT Schemes" && <DGFTSchemes/>}

          //  {activeNav === "Shipment" && <Shipment /> }
          //  {activeNav === "Notices" && <NoticesSection mode={noticeMode} setMode={setNoticeMode} /> }


          //  {activeNav === "Vendors/ Partners" && <VendorsPartners /> }
          //  {activeNav === "AI Assistant" && <AiAssistant /> } */}

          {activeNav === "Trade Intelligence" && may("tradeIntelligence") && <TradeIntelligence />}

          {activeNav === "API Integrations" && may("integrations") && <APIIntegrations />}

          {activeNav === "Ad Managment" && may("ads") && <AdManagement />}
          {activeNav === "Support" && may("support") && <Support />}
          {activeNav === "Modules" && may("modules") && <Modules />}
          {activeNav === "Settings" && may("settings") && <Settings />}
          {showBot && (
            <WhatsappBot
              showBot={showBot}
              setShowBot={setShowBot}
              fabOpen={fabOpen}
              setFabOpen={setFabOpen}
            />
          )}

          {/* <CreateNewInvoice /> */}
        </main>
      </div>
      {messages && <MessagesModal onClose={() => setMessage(false)} />}
      {notifications && (
        <NotificationsModal onClose={() => setNotifications(false)} />
      )}

      {/* Modal removed - full page navigation used */}

      {/* {showNotice && <CreateNotice setShowNotice={setShowNotice} />} */}
      {fabOpen && (
        <div className="fixed inset-0 z-30" onClick={() => setFabOpen(false)} />
      )}

      {account && <MyAccount onClose={() => setAccount(false)} />}
    </div>
  );
}
