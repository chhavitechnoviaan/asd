

// // import React, { useState, useMemo, useEffect } from "react";
// // import {
// //   getDashboard,
// //   getFilterOptions,
// //   getExportTrend,
// //   getCountryDistribution,
// //   getTopProducts,
// //   getTopBuyers,
// //   getTopExporters,
// //   getPortWiseExports,
// //   getRecentShipments
// // } from '../../api/ExportIntelApi';
// // import DatePicker from "react-datepicker";
// // import { getExportIntelligence } from '../../api/CargoMateApi';
// // import "react-datepicker/dist/react-datepicker.css";
// // import ExportReport from "../../components/b2bComponent/ExportReport";
// // import {
// //   CalendarDays,
// //   Download,
// //   Package,
// //   IndianRupee,
// //   Users,
// //   Truck,
// //   Globe,
// //   Clock3,
// //   ChevronDown,
// //   HelpCircle,
// //   Clock,
// // } from "lucide-react";

// // import {
// //   PieChart,
// //   Pie,
// //   Cell,
// //   ResponsiveContainer,
// //   LineChart,
// //   Line,
// //   XAxis,
// //   YAxis,
// //   Tooltip,
// // } from "recharts";

// // const HEADING = "text-[#07156B]";
// // // ==========================================
// // // 1. RAW EXPORT DATA (Image {B06B6444-DD0A-4D01-9B45-F1AF036CA639}.png के अनुसार)
// // // ==========================================

// // /*const INITIAL_PRODUCTS = [
// //   { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "1,985", value: 412.35, share: "21.0%", barWidth: "w-[21%]" },
// //   { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,542", value: 352.80, share: "18.1%", barWidth: "w-[18.1%]" },
// //   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "895", value: 231.40, share: "11.7%", barWidth: "w-[11.7%]" },
// //   { hsCode: "72", desc: "Iron & Steel", shipments: "724", value: 165.70, share: "8.5%", barWidth: "w-[8.5%]" },
// //   { hsCode: "39", desc: "Plastics & Articles", shipments: "628", value: 128.90, share: "6.5%", barWidth: "w-[6.5%]" },
// // ];

// // const INITIAL_LINE_DATA = [
// //   { date: "01 Apr", value: 600 }, { date: "06 Apr", value: 850 }, { date: "11 Apr", value: 780 },
// //   { date: "16 Apr", value: 1100 }, { date: "21 Apr", value: 1020 }, { date: "24 Apr", value: 1245 },
// // ];

// // const INITIAL_PIE_DATA = [
// //   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
// //   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
// //   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
// //   { name: "Germany", value: 208.40, percent: "10.3%", color: "#F59E0B" },
// //   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
// //   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
// //   { name: "Other", value: 268.40, percent: "14.3%", color: "#EC4899" },
// // ];

// // const INITIAL_EXPORTERS = [
// //   { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹125.40 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// //   { name: "Global Industrial Inc.", shipments: "712", value: "₹96.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// //   { name: "Omega Supplies", shipments: "588", value: "₹76.30 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// //   { name: "Prime Exports Ltd.", shipments: "502", value: "₹64.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // ];

// // const INITIAL_BUYERS = [
// //   { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹152.45 Cr", growth: "▲ 18.9%", isUp: true, country: "USA" },
// //   { name: "Global Enterprises", shipments: "1,021", value: "₹128.75 Cr", growth: "▲ 15.2%", isUp: true, country: "UAE" },
// //   { name: "Omega Traders", shipments: "812", value: "₹98.60 Cr", growth: "▲ 11.4%", isUp: true, country: "China" },
// //   { name: "Shree Impex", shipments: "708", value: "₹86.20 Cr", growth: "▲ 9.8%", isUp: true, country: "Germany" },
// // ];

// // const INITIAL_PORTS = [
// //   { name: "Nhava Sheva (Mumbai)", shipments: "2,856", value: "₹412.40 Cr", share: "33.1%" },
// //   { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹286.40 Cr", share: "23.0%" },
// //   { name: "Chennai", shipments: "1,256", value: "₹181.20 Cr", share: "14.5%" },
// //   { name: "Kolkata", shipments: "986", value: "₹134.80 Cr", share: "10.8%" },
// // ];

// // const INITIAL_SHIPMENTS = [
// //   { id: "EXP-2025-2045", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2044", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2043", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.30 Cr", status: "IN TRANSIT" },
// //   { id: "EXP-2025-2042", hsCode: "72", desc: "Iron & Steel", exporter: "Shree Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva", date: "21 Apr 2025", value: "₹ 18.90 Cr", status: "DELIVERED" },
// //   { id: "EXP-2025-2041", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Oceanic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
// // ];*/

// // const getCurrentFinancialYear = (date = new Date()) => {
// //   const year = date.getFullYear();
// //   const startYear = date.getMonth() >= 3 ? year : year - 1;
// //   return `${startYear}-${startYear + 1}`;
// // };

// // const unwrapTradeResponse = (response) =>
// //   response?.data?.data?.query ? response.data.data
// //     : response?.data?.query ? response.data
// //     : response?.data?.data ?? response?.data ?? null;

// // export default function ExportIntelligenceDashboard({setMainTab}) {

// //   const [dashboard, setDashboard] = useState({});
// //   const [filterOptions, setFilterOptions] = useState({});
// //   const [exportTrend, setExportTrend] = useState([]);
// //   const [countryDistribution, setCountryDistribution] = useState([]);
// //   const [countryTotalValue,setCountryTotalValue]=useState(0);
// //   const [topProducts, setTopProducts] = useState([]);
// //   const [topExporters, setTopExporters] = useState([]);
// //   const [topBuyers, setTopBuyers] = useState([]);
// //   const [portWiseExports, setPortWiseExports] = useState([]);
// //   const [recentShipments, setRecentShipments] = useState([]);
// //   // ==========================================
// //   // 2. STATE MANAGEMENT FOR DYNAMIC FILTERS
// //   // ==========================================
// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [topN, setTopN] = useState(10);
// //   const [tradeTrendResult, setTradeTrendResult] = useState(null);
// //   const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
// //   const [tradeTrendError, setTradeTrendError] = useState("");

// //   const runTradeTrendSearch = async () => {
// //     const hsCode = searchQuery.trim();
// //     if (!hsCode) {
// //       setTradeTrendError("Enter an HS code to search export intelligence.");
// //       setTradeTrendResult(null);
// //       return;
// //     }

// //     setTradeTrendLoading(true);
// //     setTradeTrendError("");
// //     try {
// //       const params = {
// //         hs_code: hsCode,
// //         year: getCurrentFinancialYear(shipmentStartDate || new Date()),
// //         top_n: Math.max(1, Number(topN) || 10),
// //         include_trend: true,
// //         values_in: "₹ Crore",
// //       };
// //       const response = await getExportIntelligence(params);
// //       setTradeTrendResult(unwrapTradeResponse(response));
// //     } catch (err) {
// //       setTradeTrendResult(null);
// //       setTradeTrendError(
// //         err?.response?.data?.detail ||
// //         err?.response?.data?.message ||
// //         err.message ||
// //         "Export intelligence search failed."
// //       );
// //     } finally {
// //       setTradeTrendLoading(false);
// //     }
// //   };


// //   const [selectedPort, setSelectedPort] = useState("All Ports");
// //   const [selectedCountry, setSelectedCountry] = useState("All Countries");
// //   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
// //   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
// //    const [shipmentStartDate, setShipmentStartDate] = useState(null);
// //     const [shipmentEndDate, setShipmentEndDate] = useState(null);
// //      const [dateRange, setDateRange] = useState(false)
// //      const [exportReport, setExportReport] = useState(false)

// //   const fetchDashboard = async () => {
// //     try {
// //       const res = await getDashboard();
// //       setDashboard(res.data.data || {});
// //     } catch (err) {
// //         console.error(err);
// //       }
// //   };

// //   const fetchFilterOptions = async () => {
// //     try {
// //       const res = await getFilterOptions();
// //       setFilterOptions(res.data.data || {});
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchExportTrend = async () => {
// //     try {
// //       const res = await getExportTrend();
// //       setExportTrend(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchCountryDistribution = async () => {
// //     try {
// //       const res = await getCountryDistribution();
// //       setCountryDistribution(res.data.data || []);
// //       setCountryTotalValue(res.data.totalValue || 0);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopProducts = async () => {
// //     try {
// //       const res = await getTopProducts();
// //       setTopProducts(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopExporters = async () => {
// //     try {
// //       const res = await getTopExporters();
// //       setTopExporters(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchTopBuyers = async () => {
// //     try {
// //       const res = await getTopBuyers();
// //       setTopBuyers(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchPortWiseExports = async () => {
// //     try {
// //       const res = await getPortWiseExports();
// //       setPortWiseExports(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
// //   const fetchRecentShipments = async () => {
// //     try {
// //       const res = await getRecentShipments();
// //       setRecentShipments(res.data.data || []);
// //     } catch (err) {
// //       console.error(err);
// //     }
// //   };
  
// //   useEffect(() => {
// //     fetchDashboard();
// //     fetchFilterOptions();
// //     fetchExportTrend();
// //     fetchCountryDistribution();
// //     fetchTopProducts();
// //     fetchTopExporters();
// //     fetchTopBuyers();
// //     fetchPortWiseExports();
// //     fetchRecentShipments();
// //   }, []);
  
// //   // Filter application triggers state
// //   const [appliedFilters, setAppliedFilters] = useState({
// //     search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers"
// //   });

// //   const handleApplyFilters = () => {
// //     setAppliedFilters({
// //       search: searchQuery,
// //       port: selectedPort,
// //       country: selectedCountry,
// //       exporter: selectedExporter,
// //       buyer: selectedBuyer
// //     });
// //   };

// //   const handleResetFilters = () => {
// //     setSearchQuery(""); setSelectedPort("All Ports"); setSelectedCountry("All Countries");
// //     setSelectedExporter("All Exporters"); setSelectedBuyer("All Buyers");
// //     setAppliedFilters({ search: "", port: "All Ports", country: "All Countries", exporter: "All Exporters", buyer: "All Buyers" });
// //   };

// //   const INITIAL_STATS = [
// //     { title: "Total Export Shipments", value: tradeTrendResult?.summary?.total_export_shipments ?? dashboard.totalExportShipments ?? 0, change: "", icon: Package, color: "text-blue-500", bg: "bg-blue-50", isUp: true },
// //     { title: "Total Export Value (INR)", value: `₹${Number(tradeTrendResult?.summary?.total_export_value ?? (dashboard.totalExportValue || 0) / 10000000).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`, change: tradeTrendResult?.summary?.growth_pct == null ? "" : `${tradeTrendResult.summary.growth_pct}%`, icon: IndianRupee, color: "text-green-500", bg: "bg-green-50", isUp: true },
// //     { title: "Total Exporters", value: dashboard.totalExporters || 0, change: "", icon: Users, color: "text-cyan-500", bg: "bg-cyan-50", isUp: true },
// //    { title: "Countries of Destination", value: tradeTrendResult?.summary?.countries_of_destination ?? dashboard.countries ?? 0, change: "", icon: Globe, color: "text-purple-500", bg: "bg-purple-50", isUp: true },
// //     { title: "Avg. Shipment Value (INR)", value: `₹${((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L`, change: "", icon: IndianRupee, color: "text-orange-500", bg: "bg-orange-50", isUp: false },
// //       ];
// //   // ==========================================
// //   // 3. MEMOIZED FILTERING LOGIC
// //   // ==========================================
// //  const filteredShipments = useMemo(() => {
// //   return recentShipments.filter((ship) => {
// //     const matchSearch =
// //       ship.cargo?.productName
// //         ?.toLowerCase()
// //         .includes(appliedFilters.search.toLowerCase()) ||
// //       ship.cargo?.hsCode?.hsCode
// //         ?.toString()
// //         .includes(appliedFilters.search);

// //     const matchPort =
// //       appliedFilters.port === "All Ports" ||
// //       ship.route?.originCity === appliedFilters.port;

// //     const matchCountry =
// //       appliedFilters.country === "All Countries" ||
// //       ship.route?.destinationCountry === appliedFilters.country;

// //     const matchExporter =
// //       appliedFilters.exporter === "All Exporters" ||
// //       ship.exporter?.companyName === appliedFilters.exporter;

// //     const matchBuyer =
// //       appliedFilters.buyer === "All Buyers" ||
// //       ship.buyer?.companyName === appliedFilters.buyer;

// //     return (
// //       matchSearch &&
// //       matchPort &&
// //       matchCountry &&
// //       matchExporter &&
// //       matchBuyer
// //     );
// //   });
// // }, [recentShipments, appliedFilters]);

// //   const dynamicPieData = useMemo(() => {
// //     const source = Array.isArray(tradeTrendResult?.exports_by_country)
// //       ? tradeTrendResult.exports_by_country : countryDistribution;
// //     const colors=["#2563EB","#10B981","#8B5CF6","#F59E0B","#6366F1","#94A3B8","#EC4899"];
// //     return source.map((item,index)=>({
// //       name: item.country ?? item.name ?? "Unknown",
// //       value: Number(item.value ?? 0),
// //       percent: `${Number(item.share_pct ?? item.percentage ?? 0).toFixed(2)}%`,
// //       color: colors[index % colors.length],
// //     })).filter((item)=>Number.isFinite(item.value));
// //   },[tradeTrendResult, countryDistribution]);

// //   const computedTotalValue=useMemo(()=>{
// //     if(appliedFilters.country==="All Countries"){
// //       return `₹ ${Number(tradeTrendResult?.summary?.total_export_value ?? (countryTotalValue/10000000)).toFixed(2)} Cr`;
// //     }
// //     const match=dynamicPieData.find(item=>item.name===appliedFilters.country);
// //     if(!match) return "₹0.00 Cr";
// //     return `₹ ${Number(match.value).toFixed(2)} Cr`;
// //   },[dynamicPieData, countryTotalValue, appliedFilters.country]);
  
// //   const lineChartData = useMemo(() => {
// //     return exportTrend.map(item => ({
// //       date: new Date(item._id).toLocaleDateString("en-GB", {
// //         day: "2-digit",month: "short"
// //       }),
// //       value: Number((item.totalValue / 10000000).toFixed(2)),
// //       shipments: item.shipments
// //     }));
// //   }, [exportTrend]);

// //   const totalExportValue = useMemo(() => {
// //     return lineChartData.reduce((sum, item) => sum + item.value, 0);
// //   }, [lineChartData]);

// //   const totalShipments = useMemo(() => {
// //     return lineChartData.reduce((sum, item) => sum + item.shipments, 0);
// //   }, [lineChartData]);

// //   // Live series returned by /export-intelligence.
// //   const liveTradeTrend = useMemo(() => {
// //     const points = tradeTrendResult?.value_trend?.points;
// //     const chartData = Array.isArray(points) ? points.map((point) => ({
// //       year: point.year,
// //       value: Number(point.value ?? 0),
// //     })).filter((point) => Number.isFinite(point.value)) : [];
// //     const latest = chartData[chartData.length - 1];
// //     return {
// //       chartData,
// //       latestValue: Number(latest?.value ?? tradeTrendResult?.summary?.total_export_value ?? 0),
// //       latestYear: latest?.year ?? tradeTrendResult?.summary?.current_year ?? tradeTrendResult?.query?.year ?? null,
// //     };
// //   }, [tradeTrendResult]);

// //   const displayedExportValue = Number(liveTradeTrend.latestValue ?? totalExportValue);

// //   return (
// //     <div className="min-h-screen  overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  flex flex-col justify-between pt-14">
// //       <div>
// //         {/* HEADER */}
// //         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
// //           <div>
// //             <h1 className="text-2xl font-bold text-[#1e293b]">Export Intelligence</h1>
// //             <p className="text-sm text-slate-400 mt-0.5">
// //               Discover export performance, markets, buyers, and opportunities.
// //             </p>
// //           </div>
// //                 <div className="flex gap-3"> 
// //                <div className="relative flex-1 ">
// //                       <DatePicker
// //                         selected={shipmentStartDate}
// //                         onChange={(dates) => {
// //                           const [start, end] = dates;
// //                           setShipmentStartDate(start);
// //                           setShipmentEndDate(end);
// //                         }}
// //                         startDate={shipmentStartDate}
// //                         endDate={shipmentEndDate}
// //                         selectsRange
// //                         dateFormat="dd MMM yyyy"
// //                         placeholderText="01 Apr 2025 - 24 Apr 2025"
// //                         className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
// //                       />
// //                       <CalendarDays
// //                         size={14}
// //                         className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// //                       />
// //                     </div>
// //                     <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
// //                       <Download size={14} className="text-slate-400" />
// //                       Export Report
// //                     </button> </div>
// //         </div>

// //         {/* METRICS STATS GRID */}
// //         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
// //           {INITIAL_STATS.map((item, index) => {
// //             const Icon = item.icon;
// //             return (
// //               <div key={index} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between">
// //                 <div className="flex justify-between items-start">
// //                   <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
// //                     {item.title}
// //                   </span>
// //                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
// //                     <Icon size={18} />
// //                   </div>
// //                 </div>
// //                 <div className="mt-3">
// //                   <h3 className="font-bold text-lg text-slate-800 tracking-tight">{item.value}</h3>
// //                   <span className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}>
// //                     {item.change}
// //                   </span>
// //                 </div>
// //               </div>
// //             );
// //           })}
// //         </div>

// //         {/* TRADE TREND SEARCH */}
// //         <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
// //           <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(140px,0.8fr)_auto] gap-3 items-center">
// //             <input
// //               type="text"
// //               value={searchQuery}
// //               onChange={(e) => setSearchQuery(e.target.value)}
// //               onKeyDown={(e) => { if (e.key === "Enter") { handleApplyFilters(); runTradeTrendSearch(); } }}
// //               placeholder="Search HS Code or Product"
// //               aria-label="HS Code or Product"
// //               className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //             />
// //             <input
// //             type="number"
// //             min="1"
// //             max="100"
// //             value={topN}
// //             onChange={(e) => setTopN(e.target.value)}
// //             aria-label="Number of countries"
// //             placeholder="Top countries (10)"
// //             className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// //           />
// //           <button
// //               type="button"
// //               onClick={() => { handleApplyFilters(); runTradeTrendSearch(); }}
// //               disabled={tradeTrendLoading}
// //               className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 transition disabled:opacity-60"
// //             >
// //               {tradeTrendLoading ? "Searching..." : "Search"}
// //             </button>
// //             <button
// //               type="button"
// //               onClick={() => { handleResetFilters(); setTradeTrendResult(null); setTradeTrendError(""); }}
// //               className="rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium text-xs py-2.5 px-4 transition"
// //             >
// //               Reset
// //             </button>
// //           </div>
// //           {tradeTrendError && <p role="alert" className="mt-3 text-xs text-red-600">{tradeTrendError}</p>}
// //           {tradeTrendLoading && <p className="mt-3 text-xs text-slate-500">Fetching live export trade trends...</p>}
// //         </div>

// //         {tradeTrendResult && (
// //           <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm mb-6">
// //             <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
// //               <div>
// //                 <h3 className="text-sm font-bold text-slate-800">Live Export Trade Trend</h3>
// //                 <p className="text-xs text-slate-500 mt-1">
// //                   HS Code: {tradeTrendResult?.query?.hs_code || searchQuery.trim()} · FY {tradeTrendResult?.query?.year || getCurrentFinancialYear(shipmentStartDate || new Date())} · Values in ₹ Crore
// //                 </p>
// //               </div>
// //               <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold">Live API data</span>
// //             </div>
// //             <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
// //               {(tradeTrendResult.value_trend?.points || []).map((point) => {
// //                 const year = point.year;
// //                 return (
// //                   <div key={year} className="rounded-lg border border-slate-100 bg-slate-50 p-3">
// //                     <p className="text-[10px] text-slate-500">{year}</p>
// //                     <p className="mt-1 text-sm font-bold text-slate-800">
// //                       {`₹${Number(point.value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`}
// //                     </p>
// //                   </div>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         )}

// //         {/* CHARTS LAYER */}
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          
// //           {/* TOP EXPORTED PRODUCTS */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// //             <div>
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="font-bold text-sm text-slate-800">Top Exported Products</h3>
// //                 {/* <button className="text-blue-600 text-xs font-semibold">View All</button> */}
// //               </div>
// //               <div className="space-y-3">
// //                 {topProducts.map((prod, i) => (
// //                   <div key={i} className="text-xs">
// //                     <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
// //                       <span className="font-medium text-slate-400 shrink-0">{prod.hsCode}</span>
// //                       <span className="truncate flex-1 font-medium text-slate-700">{prod.productName}</span>
// //                       <span className="font-semibold text-slate-800 shrink-0">₹ {(prod.value / 10000000).toFixed(2)} Cr</span>
// //                     </div>
// //                     <div className="flex items-center gap-3">
// //                       <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
// //                         <div className="bg-blue-500 h-full rounded-full ${prod.barWidth" style={{ width: `${prod.share}%` }}/>
// //                       </div>
// //                       <span className="text-[10px] text-slate-400 font-medium shrink-0 w-8 text-right">{prod.share}%</span>
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>
// //             </div>
            
// //           </div>

// //           {/* EXPORT VALUE TREND */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
// //             <div className="flex justify-between items-center mb-2">
// //               <h3 className="font-bold text-sm text-slate-800">Export Value Trend (INR)</h3>
// //               <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-0.5 rounded border border-slate-100 font-medium">{liveTradeTrend.latestYear || "Live trend"}</span>
// //             </div>
// //             <div className="mb-4">
// //               <span className="text-xl font-bold text-slate-800">₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
// //               {liveTradeTrend.latestYear && <span className="text-xs text-slate-500 font-medium ml-2">{liveTradeTrend.latestYear}</span>}
// //             </div>
// //             <div className="h-[150px] w-full">
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart data={liveTradeTrend.chartData.length ? liveTradeTrend.chartData : lineChartData}>
// //                   <XAxis dataKey={liveTradeTrend.chartData.length ? "year" : "date"} tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} />
// //                   <YAxis tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} axisLine={false} width={42} />
// //                   <Tooltip formatter={(value) => [`₹${Number(value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`, "Export Value"]} />
// //                   <Line type="monotone" dataKey="value" stroke="#10B981" strokeWidth={2.5} dot={{ fill: '#10B981', r: 3 }} connectNulls />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             </div>
// //             <div className="grid grid-cols-2 gap-4 mt-3 pt-3 border-t border-slate-50 text-center">
// //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// //                 <span className="text-[10px] text-slate-400 font-medium block">Export Value (INR)</span>
// //                 <span className="text-xs font-bold text-slate-700"> ₹{displayedExportValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr</span>
// //               </div>
// //               <div className="bg-slate-50/70 p-2 rounded-xl border border-slate-100">
// //                 <span className="text-[10px] text-slate-400 font-medium block">Export Shipments</span>
// //                 <span className="text-xs font-bold text-slate-700">{totalShipments}</span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* EXPORTS BY COUNTRY OF DESTINATION */}
// //           <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col justify-between">
// //             <div>
// //               <div className="flex justify-between items-center mb-4">
// //                 <h3 className="font-bold text-sm text-slate-800">Exports by Country of Destination</h3>
// //                 {/*<button className="text-blue-600 text-xs font-semibold">View All</button>*/}
// //               </div>
// //               <div className="flex items-center justify-between gap-2">
// //                 <div className="relative w-[120px] h-[120px] shrink-0">
// //                   <ResponsiveContainer width="100%" height="100%">
// //                     <PieChart>
// //                       <Pie data={dynamicPieData} innerRadius={40} outerRadius={55} dataKey="value" stroke="none">
// //                         {dynamicPieData.map((item, index) => <Cell key={index} fill={item.color} />)}
// //                       </Pie>
// //                     </PieChart>
// //                   </ResponsiveContainer>
// //                   <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
// //                     <span className="text-[8px] uppercase text-slate-400 font-semibold">Total Value</span>
// //                     <span className="font-bold text-[11px] text-slate-800 leading-none mt-0.5">{computedTotalValue}</span>
// //                   </div>
// //                 </div>
// //                 <div className="flex-1 space-y-1 pl-2 max-h-[130px] overflow-y-auto">
// //                   {dynamicPieData.slice(0, Math.max(1, Number(topN) || 10)).map((country, idx) => (
// //                     <div key={idx} className="flex items-center justify-between text-[11px]">
// //                       <div className="flex items-center gap-1.5 truncate">
// //                         <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: country.color }} />
// //                         <span className="text-slate-600 font-medium truncate">{country.name}</span>
// //                       </div>
// //                       <span className="text-slate-500 font-semibold ml-1">₹ {(country.value/10000000).toFixed(2)} Cr</span>
// //                     </div>
// //                   ))}
// //                 </div>
// //               </div>
// //             </div>
           
// //           </div>
// //         </div>

// //         {/* DATA TABLE LAYER */}
// //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm overflow-hidden">
// //           <div className="flex justify-between items-center mb-4">
// //             <h3 className="font-bold text-sm text-slate-800">Recent Export Shipments</h3>
// //             {/*<span className="text-xs text-blue-600 font-semibold cursor-pointer hover:underline">Filter</span>*/}
// //           </div>

// //           <div className="overflow-x-auto -mx-5">
// //             <div className="inline-block min-w-full align-middle px-5">
// //               <table className="min-w-full divide-y divide-slate-100 text-xs">
// //                 <thead>
// //                   <tr className="text-left text-slate-400 font-semibold border-b border-slate-100">
// //                     <th className="pb-3 font-medium">Shipment ID</th>
// //                     <th className="pb-3 font-medium">HS Code</th>
// //                     <th className="pb-3 font-medium">Product Description</th>
// //                     <th className="pb-3 font-medium">Exporter</th>
// //                     <th className="pb-3 font-medium">Buyer</th>
// //                     <th className="pb-3 font-medium">Destination Country</th>
// //                     <th className="pb-3 font-medium">Port of Exit</th>
// //                     <th className="pb-3 font-medium">Ship Date</th>
// //                     <th className="pb-3 font-medium">Value (INR)</th>
// //                     <th className="pb-3 font-medium text-center">Status</th>
// //                   </tr>
// //                 </thead>
// //                 <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
// //                   {filteredShipments.length > 0 ? (
// //                     filteredShipments.map((ship, idx) => (
// //                       <tr key={ship._id} className="hover:bg-slate-50/80 transition">
// //                         <td className="py-3.5 text-blue-600 font-semibold">{ship.sbNumber}</td>
// //                         <td className="py-3.5 text-slate-400 font-bold">{ship.cargo?.hsCode?.hsCode || "-"}</td>
// //                         <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700"> {ship.cargo?.productName}</td>
// //                         <td className="py-3.5 truncate text-slate-500">{ship.exporter?.companyName}</td>
// //                         <td className="py-3.5 truncate text-slate-500">{ship.buyer?.companyName}</td>
// //                         <td className="py-3.5 text-slate-700">{ship.route?.destinationCountry}</td>
// //                         <td className="py-3.5 text-slate-500">{ship.route?.originCity || "-"}</td>
// //                         <td className="py-3.5 text-slate-400 whitespace-nowrap">{new Date(ship.shipmentDate).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",})}</td>
// //                         <td className="py-3.5 font-bold text-slate-800">₹ {Number(ship.cargo?.value ?? 0).toFixed(2)}</td>
// //                         <td className="py-3.5 text-center">
// //                           <span className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
// //                             ship.status === "Delivered" ? "bg-green-100 text-green-700" :
// //                             ship.status === "In Transit" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"
// //                           }`}>{ship.shipmentStatus}</span>
// //                         </td>
// //                       </tr>
// //                     ))
// //                   ) : (
// //                     <tr>
// //                       <td colSpan="10" className="py-8 text-center text-slate-400 font-medium">
// //                         No matching export records found.
// //                       </td>
// //                     </tr>
// //                   )}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //           <div className="text-center mt-4 pt-3 border-t border-slate-50">
// //             <button onClick={() => setMainTab && setMainTab("Shipments")} className="text-blue-600 hover:text-blue-700 text-xs font-semibold">
// //               View All Shipments →
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* FOOTER TIMESTAMPS BAR */}
// //       <div className="mt-6 pt-4 mb-10 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
// //         <div className="flex items-center gap-1.5">
// //           <Clock size={14} className="text-slate-300" />
// //           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
// //         </div>
// //         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
// //           <HelpCircle size={14} className="text-slate-300" />
// //           <span>Help Center</span>
// //         </div>
// //       </div>

// //        {exportReport && (
// //                         <ExportReport onClose={() => setExportReport(false)} />
// //                       )}

// //     </div>
// //   );
// // }


// // mahima code //
// import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

// import {
//   getDashboard,
//   getFilterOptions,
//   getExportTrend,
//   getCountryDistribution,
//   getTopProducts,
//   getTopBuyers,
//   getTopExporters,
//   getRecentShipments,
// } from "../../api/ExportIntelApi";

// import {
//   CalendarDays,
//   Download,
//   Package,
//   IndianRupee,
//   Users,
//   Building2,
//   Globe2,
//   ChevronDown,
//   Search,
//   X,
//   Filter,
//   RefreshCw,
//   TrendingUp,
//   ArrowUpRight,
//   Database,
//   MapPin,
//   Boxes,
//   FileSpreadsheet,
//   Loader2,
//   BarChart3,
//   CheckCircle2,
// } from "lucide-react";

// import {
//   PieChart,
//   Pie,
//   Cell,
//   ResponsiveContainer,
//   LineChart,
//   Line,
//   XAxis,
//   YAxis,
//   Tooltip,
//   CartesianGrid,
// } from "recharts";

// // ==========================================
// // CONSTANTS & HELPERS
// // ==========================================

// const COLORS = [
//   "#2563EB",
//   "#10B981",
//   "#8B5CF6",
//   "#F59E0B",
//   "#EC4899",
//   "#06B6D4",
//   "#6366F1",
//   "#F97316",
// ];

// const INITIAL_FILTERS = {
//   search: "",
//   hsCode: "",
//   country: "",
//   exporter: "",
//   buyer: "",
//   month: "",
//   year: "",
// };

// const formatINR = (value = 0) => {
//   const amount = Number(value) || 0;

//   if (amount >= 10000000) {
//     return `₹${(amount / 10000000).toFixed(2)} Cr`;
//   }

//   if (amount >= 100000) {
//     return `₹${(amount / 100000).toFixed(2)} L`;
//   }

//   return `₹${amount.toLocaleString("en-IN", {
//     maximumFractionDigits: 2,
//   })}`;
// };

// const formatCr = (value = 0) =>
//   `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

// const formatNumber = (value = 0) =>
//   Number(value || 0).toLocaleString("en-IN");

// const getMonthName = (month = "") => {
//   const value = String(month).trim();

//   if (!value) return "";

//   const date = new Date(`${value} 1, 2000`);

//   return Number.isNaN(date.getTime())
//     ? value.charAt(0).toUpperCase() + value.slice(1)
//     : date.toLocaleString("en-IN", { month: "short" });
// };

// const getMonthIndex = (month = "") => {
//   const date = new Date(`${month} 1, 2000`);
//   return Number.isNaN(date.getTime()) ? 0 : date.getMonth();
// };

// const getMonthLabel = (id = "") => {
//   const parts = String(id).split("-");
//   const year = parts[0];
//   const month = parts.slice(1).join("-");

//   return `${getMonthName(month)} ${year}`;
// };

// const getResponseData = (response, fallback = []) => {
//   const body = response?.data ?? response;

//   const data =
//     body?.data ??
//     body?.result ??
//     body?.results ??
//     body;

//   return data ?? fallback;
// };

// // ==========================================
// // SEARCHABLE DROPDOWN
// // ==========================================

// const SelectFilter = ({
//   value,
//   onChange,
//   options = [],
//   placeholder = "Select",
//   searchable = true,
// }) => {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");
//   const [position, setPosition] = useState({});

//   const wrapperRef = useRef(null);
//   const buttonRef = useRef(null);
//   const menuRef = useRef(null);

//   const selectedLabel =
//     options.find((item) => item.value === value)?.label || placeholder;

//   const filteredOptions = useMemo(() => {
//     return options.filter((item) =>
//       String(item.label).toLowerCase().includes(search.toLowerCase())
//     );
//   }, [options, search]);

//   const updatePosition = () => {
//     if (!buttonRef.current) return;

//     const rect = buttonRef.current.getBoundingClientRect();
//     const viewportHeight = window.innerHeight;

//     const spaceBelow = viewportHeight - rect.bottom;
//     const spaceAbove = rect.top;

//     const openAbove = spaceBelow < 270 && spaceAbove > spaceBelow;

//     const maxHeight = Math.max(
//       120,
//       Math.min(250, openAbove ? spaceAbove - 12 : spaceBelow - 12)
//     );

//     setPosition({
//       top: openAbove ? "auto" : rect.bottom + 7,
//       bottom: openAbove ? viewportHeight - rect.top + 7 : "auto",
//       left: rect.left,
//       width: rect.width,
//       maxHeight,
//     });
//   };

//   useEffect(() => {
//     if (!open) return;

//     updatePosition();

//     const handleOutside = (event) => {
//       if (
//         wrapperRef.current &&
//         !wrapperRef.current.contains(event.target) &&
//         menuRef.current &&
//         !menuRef.current.contains(event.target)
//       ) {
//         setOpen(false);
//       }
//     };

//     const handleEscape = (event) => {
//       if (event.key === "Escape") setOpen(false);
//     };

//     document.addEventListener("mousedown", handleOutside);
//     document.addEventListener("keydown", handleEscape);
//     window.addEventListener("resize", updatePosition);
//     window.addEventListener("scroll", updatePosition, true);

//     return () => {
//       document.removeEventListener("mousedown", handleOutside);
//       document.removeEventListener("keydown", handleEscape);
//       window.removeEventListener("resize", updatePosition);
//       window.removeEventListener("scroll", updatePosition, true);
//     };
//   }, [open]);

//   const handleSelect = (item) => {
//     onChange(item.value);
//     setOpen(false);
//     setSearch("");
//   };

//   return (
//     <div className="relative min-w-0 w-full" ref={wrapperRef}>
//       <button
//         ref={buttonRef}
//         type="button"
//         onClick={() => {
//           if (!open) updatePosition();
//           setOpen((prev) => !prev);
//         }}
//         className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 text-left text-xs font-semibold transition-all ${
//           open
//             ? "border-blue-500 ring-4 ring-blue-50"
//             : "border-slate-200 hover:border-blue-300"
//         }`}
//       >
//         <span className="truncate text-slate-700">
//           {selectedLabel}
//         </span>

//         <ChevronDown
//           size={15}
//           className={`shrink-0 text-slate-400 transition-transform ${
//             open ? "rotate-180" : ""
//           }`}
//         />
//       </button>

//       {open && (
//         <div
//           ref={menuRef}
//           style={{
//             position: "fixed",
//             top: position.top,
//             bottom: position.bottom,
//             left: position.left,
//             width: position.width,
//             maxHeight: position.maxHeight,
//             zIndex: 9999,
//           }}
//           className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
//         >
//           {searchable && (
//             <div className="sticky top-0 border-b border-slate-100 bg-white p-2">
//               <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2">
//                 <Search
//                   size={13}
//                   className="shrink-0 text-slate-400"
//                 />

//                 <input
//                   autoFocus
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search options..."
//                   className="w-full py-2 text-xs outline-none"
//                 />

//                 {search && (
//                   <button
//                     type="button"
//                     onClick={() => setSearch("")}
//                   >
//                     <X size={13} className="text-slate-400" />
//                   </button>
//                 )}
//               </div>
//             </div>
//           )}

//           <div className="overflow-y-auto py-1">
//             {filteredOptions.map((item, index) => (
//               <button
//                 type="button"
//                 key={`${item.value}-${index}`}
//                 onClick={() => handleSelect(item)}
//                 className={`w-full px-3 py-2.5 text-left text-xs transition hover:bg-blue-50 ${
//                   value === item.value
//                     ? "bg-blue-50 font-bold text-blue-700"
//                     : "text-slate-600"
//                 }`}
//               >
//                 {item.label}
//               </button>
//             ))}

//             {filteredOptions.length === 0 && (
//               <p className="py-5 text-center text-xs text-slate-400">
//                 No options found
//               </p>
//             )}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// // ==========================================
// // STAT CARD
// // ==========================================

// const StatCard = ({ item, loading }) => {
//   const Icon = item.icon;

//   return (
//     <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
//       <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-150" />

//       <div className="relative flex items-start justify-between gap-2">
//         <div className="min-w-0">
//           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
//             {item.title}
//           </p>

//           <h3 className="mt-3 break-words text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl">
//             {loading ? "..." : item.value}
//           </h3>

//           <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
//             <Database size={11} />
//             {item.description}
//           </p>
//         </div>

//         <div
//           className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
//         >
//           <Icon size={19} />
//         </div>
//       </div>
//     </div>
//   );
// };

// // ==========================================
// // SECTION HEADER
// // ==========================================

// const SectionHeader = ({
//   icon: Icon,
//   title,
//   subtitle,
//   right,
// }) => (
//   <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//     <div className="flex items-center gap-3">
//       {Icon && (
//         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//           <Icon size={19} />
//         </div>
//       )}

//       <div>
//         <h3 className="text-sm font-extrabold text-slate-800 sm:text-base">
//           {title}
//         </h3>

//         {subtitle && (
//           <p className="mt-0.5 text-[11px] text-slate-400">
//             {subtitle}
//           </p>
//         )}
//       </div>
//     </div>

//     {right}
//   </div>
// );

// // ==========================================
// // EMPTY STATE
// // ==========================================

// const EmptyState = ({ text }) => (
//   <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
//     <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
//       <Database size={20} />
//     </div>

//     <p className="text-xs font-semibold text-slate-500">
//       {text}
//     </p>
//   </div>
// );

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// export default function ExportIntelligenceDashboard() {
//   const [dashboard, setDashboard] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});

//   const [exportTrend, setExportTrend] = useState([]);
//   const [countryDistribution, setCountryDistribution] = useState([]);

//   const [topProducts, setTopProducts] = useState([]);
//   const [topExporters, setTopExporters] = useState([]);
//   const [topBuyers, setTopBuyers] = useState([]);

//   const [recentShipments, setRecentShipments] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   // FILTER STATES

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedHsCode, setSelectedHsCode] = useState("All");
//   const [selectedCountry, setSelectedCountry] = useState("All Countries");
//   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
//   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
//   const [selectedMonth, setSelectedMonth] = useState("All Months");
//   const [selectedYear, setSelectedYear] = useState("All Years");

//   const [appliedFilters, setAppliedFilters] = useState({
//     search: "",
//     hsCode: "All",
//     country: "All Countries",
//     exporter: "All Exporters",
//     buyer: "All Buyers",
//     month: "All Months",
//     year: "All Years",
//   });

//   // ==========================================
//   // API FETCHING
//   // ==========================================

//   const fetchFilterOptions = async () => {
//     try {
//       const res = await getFilterOptions();
  
//       const data = getResponseData(res, {});
  
//       console.log("FILTER OPTIONS API RESPONSE:", res);
//       console.log("FILTER OPTIONS DATA:", data);
  
//       setFilterOptions({
//         hsCodes: data?.hsCodes || [],
//         countries: data?.countries || [],
//         exporters: data?.exporters || [],
//         buyers: data?.buyers || [],
//         months: data?.months || [],
//         years: data?.years || [],
//       });
//     } catch (err) {
//       console.error("Export filter options error:", err);
//     }
//   };

//   const fetchDashboardData = useCallback(async (filters) => {
//     try {
//       setLoading(true);
//       setError("");
  
//       // Convert UI default values into empty values for backend
//       const apiFilters = {
//         search: filters.search || "",
//         hsCode: filters.hsCode === "All" ? "" : filters.hsCode,
//         country:
//           filters.country === "All Countries" ? "" : filters.country,
//         exporter:
//           filters.exporter === "All Exporters" ? "" : filters.exporter,
//         buyer:
//           filters.buyer === "All Buyers" ? "" : filters.buyer,
//         month:
//           filters.month === "All Months" ? "" : filters.month,
//         year:
//           filters.year === "All Years" ? "" : filters.year,
//       };
  
//       console.log("EXPORT DASHBOARD FILTERS:", apiFilters);
  
//       // Call all APIs independently
//       const results = await Promise.allSettled([
//         getDashboard(apiFilters),
//         getExportTrend(apiFilters),
//         getCountryDistribution(apiFilters),
//         getTopProducts(apiFilters),
//         getTopExporters(apiFilters),
//         getTopBuyers(apiFilters),
//         getRecentShipments(apiFilters),
//       ]);
  
//       const getResult = (index, fallback = []) => {
//         const result = results[index];
  
//         if (result.status === "rejected") {
//           console.error(`Export API ${index + 1} failed:`, result.reason);
//           return fallback;
//         }
  
//         const data = getResponseData(result.value, fallback);
  
//         console.log(`Export API ${index + 1} response:`, result.value);
//         console.log(`Export API ${index + 1} data:`, data);
  
//         return data;
//       };
  
//       setDashboard(getResult(0, {}));
//       setExportTrend(getResult(1, []));
//       setCountryDistribution(getResult(2, []));
//       setTopProducts(getResult(3, []));
//       setTopExporters(getResult(4, []));
//       setTopBuyers(getResult(5, []));
//       setRecentShipments(getResult(6, []));
  
//       const failedApis = results.filter(
//         (result) => result.status === "rejected"
//       );
  
//       if (failedApis.length > 0) {
//         setError(
//           `${failedApis.length} analytics API(s) failed. Check browser console for details.`
//         );
//       }
//     } catch (err) {
//       console.error("Export dashboard error:", err);
  
//       setError(
//         err?.response?.data?.message ||
//           "Unable to load export intelligence data."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   useEffect(() => {
//     fetchFilterOptions();
//   }, []);

//   useEffect(() => {
//     fetchDashboardData(appliedFilters);
//   }, [appliedFilters, fetchDashboardData]);

//   // ==========================================
//   // FILTER HANDLERS
//   // ==========================================

//   const handleApplyFilters = () => {
//     setAppliedFilters({
//       search: searchQuery.trim(),
//       hsCode: selectedHsCode,
//       country: selectedCountry,
//       exporter: selectedExporter,
//       buyer: selectedBuyer,
//       month: selectedMonth,
//       year: selectedYear,
//     });
//   };

//   const handleResetFilters = () => {
//     setSearchQuery("");
//     setSelectedHsCode("All");
//     setSelectedCountry("All Countries");
//     setSelectedExporter("All Exporters");
//     setSelectedBuyer("All Buyers");
//     setSelectedMonth("All Months");
//     setSelectedYear("All Years");

//     setAppliedFilters({
//       search: "",
//       hsCode: "All",
//       country: "All Countries",
//       exporter: "All Exporters",
//       buyer: "All Buyers",
//       month: "All Months",
//       year: "All Years",
//     });
//   };

//   const activeFilterCount = Object.values(appliedFilters).filter(
//     (value) =>
//       value &&
//       !["All", "All Countries", "All Exporters", "All Buyers", "All Months", "All Years"].includes(
//         value
//       )
//   ).length;

//   // ==========================================
//   // STATS
//   // ==========================================

//   const stats = [
//     {
//       title: "Total Export Shipments",
//       value: formatNumber(dashboard.totalExportShipments),
//       icon: Package,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//       description: "Total matching records",
//     },
//     {
//       title: "Total Export Value",
//       value: formatINR(dashboard.totalExportValue),
//       icon: IndianRupee,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//       description: "Based on FOB value",
//     },
//     {
//       title: "Total Exporters",
//       value: formatNumber(dashboard.totalExporters),
//       icon: Building2,
//       color: "text-violet-600",
//       bg: "bg-violet-50",
//       description: "Unique exporter names",
//     },
//     {
//       title: "Total Buyers",
//       value: formatNumber(dashboard.totalBuyers),
//       icon: Users,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//       description: "Unique consignee names",
//     },
//     {
//       title: "Avg. Shipment Value",
//       value: formatINR(dashboard.avgShipmentValue),
//       icon: TrendingUp,
//       color: "text-cyan-600",
//       bg: "bg-cyan-50",
//       description: "Average FOB per shipment",
//     },
//   ];

//   // ==========================================
//   // CHART DATA - ORIGINAL LOGIC PRESERVED
//   // ==========================================

//   const lineChartData = useMemo(() => {
//     return [...exportTrend]
//       .sort((a, b) => {
//         const [yearA, ...monthA] = String(a._id).split("-");
//         const [yearB, ...monthB] = String(b._id).split("-");

//         return (
//           Number(yearA) - Number(yearB) ||
//           getMonthIndex(monthA.join("-")) -
//             getMonthIndex(monthB.join("-"))
//         );
//       })
//       .map((item) => ({
//         date: getMonthLabel(item._id),
//         value: Number(
//           (Number(item.totalValue || 0) / 10000000).toFixed(2)
//         ),
//         shipments: Number(item.shipments || 0),
//       }));
//   }, [exportTrend]);

//   const chartTotalValue = lineChartData.reduce(
//     (sum, item) => sum + item.value,
//     0
//   );

//   const chartTotalShipments = lineChartData.reduce(
//     (sum, item) => sum + item.shipments,
//     0
//   );

//   const countryChartData = useMemo(
//     () =>
//       countryDistribution.map((item, index) => ({
//         name: item.country || "Unknown",
//         value: Number(item.value || 0),
//         percentage: Number(item.percentage || 0),
//         color: COLORS[index % COLORS.length],
//       })),
//     [countryDistribution]
//   );

//   const countryTotalValue = countryChartData.reduce(
//     (sum, item) => sum + item.value,
//     0
//   );

//   // ==========================================
//   // FILTER OPTIONS
//   // ==========================================

//   const makeOptions = (items, defaultLabel) => [
//     { label: defaultLabel, value: defaultLabel },
//     ...items.map((item) => ({
//       label: String(item),
//       value: String(item),
//     })),
//   ];

//   const hsCodeOptions = makeOptions(
//     filterOptions.hsCodes || [],
//     "All"
//   );

//   const countryOptions = makeOptions(
//     filterOptions.countries || [],
//     "All Countries"
//   );

//   const exporterOptions = makeOptions(
//     filterOptions.exporters || [],
//     "All Exporters"
//   );

//   const buyerOptions = makeOptions(
//     filterOptions.buyers || [],
//     "All Buyers"
//   );

//   const monthOptions = makeOptions(
//     filterOptions.months || [],
//     "All Months"
//   );

//   const yearOptions = makeOptions(
//     (filterOptions.years || []).map(String),
//     "All Years"
//   );

//   // ==========================================
//   // CSV EXPORT
//   // ==========================================

//   const handleExportReport = () => {
//     if (!recentShipments.length) return;

//     const headers = [
//       "Shipment ID",
//       "HS Code",
//       "Product Description",
//       "Exporter",
//       "Buyer",
//       "Destination Country",
//       "Quantity",
//       "FOB Value",
//       "Month",
//       "Year",
//     ];

//     const rows = recentShipments.map((item) => [
//       item.shipmentId,
//       item.hsCode,
//       item.productName,
//       item.exporter,
//       item.buyer,
//       item.country,
//       item.quantity,
//       item.value,
//       item.month,
//       item.year,
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) =>
//         row
//           .map((value) =>
//             `"${String(value ?? "").replace(/"/g, '""')}"`
//           )
//           .join(",")
//       )
//       .join("\n");

//     const blob = new Blob(["\uFEFF" + csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.download = "export-intelligence-report.csv";
//     link.click();

//     URL.revokeObjectURL(url);
//   };

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-[#f5f7fb] px-3 pb-8 pt-16 font-sans text-slate-700 sm:px-5 lg:px-7">
//       <div className="mx-auto max-w-[1600px]">

//         {/* HEADER */}

//         <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#102d5c] via-[#17458a] to-[#2563eb] p-5 shadow-lg sm:p-7">
//           <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />

//           <div className="absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

//           <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
//             <div>
//               <div className="mb-3 flex items-center gap-2">
//                 <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
//                   Trade Analytics
//                 </span>

//                 <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200">
//                   <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
//                   Dashboard Overview
//                 </span>
//               </div>

//               <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//                 Export Intelligence
//               </h1>

//               <p className="mt-2 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm">
//                 Analyze export performance, discover leading products,
//                 explore international buyers and understand global
//                 destination markets.
//               </p>
//             </div>

//             <div className="flex flex-wrap items-center gap-2">
//               <div className="flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm">
//                 <CalendarDays size={16} />
//                 All Export Records
//               </div>

//               <button
//                 onClick={handleExportReport}
//                 disabled={!recentShipments.length}
//                 className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
//               >
//                 <Download size={16} />
//                 Export Report
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* ERROR */}

//         {error && (
//           <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
//             <span>{error}</span>

//             <button
//               onClick={() => fetchDashboardData(appliedFilters)}
//               className="flex items-center gap-1.5 font-bold"
//             >
//               <RefreshCw size={14} />
//               Retry
//             </button>
//           </div>
//         )}

//         {/* STATS */}

//         <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
//           {stats.map((item, index) => (
//             <StatCard
//               key={index}
//               item={item}
//               loading={loading}
//             />
//           ))}
//         </div>

//         {/* FILTER PANEL */}

//         <div className="relative z-30 mb-6 overflow-visible rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                 <Filter size={18} />
//               </div>

//               <div>
//                 <h3 className="text-sm font-extrabold text-slate-800">
//                   Search & Filters
//                 </h3>

//                 <p className="mt-0.5 text-[11px] text-slate-400">
//                   Refine your export intelligence data
//                 </p>
//               </div>
//             </div>

//             <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
//               {loading ? "Updating data..." : `${activeFilterCount} Active Filters`}
//             </span>
//           </div>

//           <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
//             {/* SEARCH */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Search Records
//               </label>

//               <div className="relative">
//                 <Search
//                   size={15}
//                   className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//                 />

//                 <input
//                   type="text"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") handleApplyFilters();
//                   }}
//                   placeholder="HS Code, product, exporter..."
//                   className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//                 />
//               </div>
//             </div>

//             {/* HS CODE */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 HS Code
//               </label>

//               <SelectFilter
//                 value={selectedHsCode}
//                 onChange={setSelectedHsCode}
//                 options={hsCodeOptions}
//                 placeholder="All"
//               />
//             </div>

//             {/* COUNTRY */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Destination Country
//               </label>

//               <SelectFilter
//                 value={selectedCountry}
//                 onChange={setSelectedCountry}
//                 options={countryOptions}
//                 placeholder="All Countries"
//               />
//             </div>

//             {/* EXPORTER */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Exporter
//               </label>

//               <SelectFilter
//                 value={selectedExporter}
//                 onChange={setSelectedExporter}
//                 options={exporterOptions}
//                 placeholder="All Exporters"
//               />
//             </div>

//             {/* BUYER */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Buyer / Consignee
//               </label>

//               <SelectFilter
//                 value={selectedBuyer}
//                 onChange={setSelectedBuyer}
//                 options={buyerOptions}
//                 placeholder="All Buyers"
//               />
//             </div>

//             {/* MONTH */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Month
//               </label>

//               <SelectFilter
//                 value={selectedMonth}
//                 onChange={setSelectedMonth}
//                 options={monthOptions}
//                 placeholder="All Months"
//               />
//             </div>

//             {/* YEAR */}

//             <div className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 Year
//               </label>

//               <SelectFilter
//                 value={selectedYear}
//                 onChange={setSelectedYear}
//                 options={yearOptions}
//                 placeholder="All Years"
//               />
//             </div>
//           </div>

//           <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
//             <p className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
//               <CalendarDays size={13} />
//               Showing data based on uploaded export records and selected filters.
//             </p>

//             <div className="flex flex-wrap items-center gap-2">
//               <button
//                 onClick={handleResetFilters}
//                 className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
//               >
//                 <RefreshCw size={14} />
//                 Reset
//               </button>

//               <button
//                 onClick={handleApplyFilters}
//                 disabled={loading}
//                 className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
//               >
//                 {loading ? (
//                   <Loader2 size={14} className="animate-spin" />
//                 ) : (
//                   <Filter size={14} />
//                 )}
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* RECENT EXPORT RECORDS */}

//         <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
//             <SectionHeader
//               icon={FileSpreadsheet}
//               title="Recent Export Shipments"
//               subtitle="Latest matching export records"
//               right={
//                 <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
//                   {formatNumber(recentShipments.length)} Records
//                 </span>
//               }
//             />
//           </div>

//           <div className="max-h-[470px] overflow-auto">
//             <table className="w-full min-w-[1050px] border-collapse text-left">
//               <thead className="sticky top-0 z-10 bg-slate-50">
//                 <tr className="border-b border-slate-200">
//                   {[
//                     "Shipment ID",
//                     "HS Code",
//                     "Product Description",
//                     "Exporter",
//                     "Buyer / Consignee",
//                     "Destination",
//                     "Quantity",
//                     "FOB Value",
//                     "Month",
//                     "Year",
//                   ].map((heading) => (
//                     <th
//                       key={heading}
//                       className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
//                     >
//                       {heading}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {recentShipments.length > 0 ? (
//                   recentShipments.map((ship, index) => (
//                     <tr
//                       key={ship._id || index}
//                       className="transition hover:bg-blue-50/40"
//                     >
//                       <td className="whitespace-nowrap px-4 py-3.5">
//                         <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-blue-700">
//                           {ship.shipmentId || "-"}
//                         </span>
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500">
//                         {ship.hsCode || "-"}
//                       </td>

//                       <td className="max-w-[230px] truncate px-4 py-3.5 text-xs font-semibold text-slate-700">
//                         {ship.productName || "-"}
//                       </td>

//                       <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
//                         {ship.exporter || "-"}
//                       </td>

//                       <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
//                         {ship.buyer || "-"}
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-slate-700">
//                         <span className="flex items-center gap-1.5">
//                           <MapPin size={12} className="text-slate-400" />
//                           {ship.country || "-"}
//                         </span>
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-slate-600">
//                         {formatNumber(ship.quantity)}
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs font-extrabold text-slate-800">
//                         {formatCr(ship.value)}
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
//                         {getMonthName(ship.month) || "-"}
//                       </td>

//                       <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
//                         {ship.year || "-"}
//                       </td>
//                     </tr>
//                   ))
//                 ) : (
//                   <tr>
//                     <td colSpan={10} className="px-4 py-8">
//                       <EmptyState
//                         text={
//                           loading
//                             ? "Loading export records..."
//                             : "No matching export records found"
//                         }
//                       />
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>

//           <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3">
//             <p className="text-[10px] font-medium text-slate-400">
//               Showing latest {recentShipments.length} matching records
//             </p>

//             {loading && (
//               <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
//                 <Loader2 size={12} className="animate-spin" />
//                 Updating
//               </span>
//             )}
//           </div>
//         </div>

//         {/* ANALYTICS - CHART DESIGN AND LOGIC UNCHANGED */}

//         <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

//           {/* EXPORT TREND */}

//           <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
//             <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
//               <div className="flex items-center gap-3">
//                 <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//                   <TrendingUp size={19} />
//                 </div>

//                 <div>
//                   <h3 className="text-sm font-extrabold text-slate-800">
//                     Export Value Trend
//                   </h3>

//                   <p className="mt-0.5 text-[11px] text-slate-400">
//                     Monthly FOB export value
//                   </p>
//                 </div>
//               </div>

//               <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700">
//                 {formatINR(chartTotalValue * 10000000)}
//               </span>
//             </div>

//             <div className="h-[260px] w-full">
//               {loading ? (
//                 <div className="flex h-full items-center justify-center text-slate-400">
//                   <Loader2 className="animate-spin" size={22} />
//                 </div>
//               ) : lineChartData.length ? (
//                 <ResponsiveContainer width="100%" height="100%">
//                   <LineChart
//                     data={lineChartData}
//                     margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
//                   >
//                     <CartesianGrid
//                       strokeDasharray="3 3"
//                       vertical={false}
//                       stroke="#edf1f7"
//                     />

//                     <XAxis
//                       dataKey="date"
//                       tick={{ fill: "#94a3b8", fontSize: 10 }}
//                       tickLine={false}
//                       axisLine={false}
//                       minTickGap={15}
//                     />

//                     <YAxis
//                       tick={{ fill: "#94a3b8", fontSize: 10 }}
//                       tickLine={false}
//                       axisLine={false}
//                       tickFormatter={(value) => `₹${value}Cr`}
//                     />

//                     <Tooltip
//                       contentStyle={{
//                         borderRadius: 12,
//                         border: "1px solid #e2e8f0",
//                         fontSize: 12,
//                       }}
//                       formatter={(value) => [`₹${value} Cr`, "FOB Value"]}
//                     />

//                     <Line
//                       type="monotone"
//                       dataKey="value"
//                       stroke="#2563EB"
//                       strokeWidth={3}
//                       dot={{
//                         r: 4,
//                         fill: "#2563EB",
//                         stroke: "#fff",
//                         strokeWidth: 2,
//                       }}
//                       activeDot={{ r: 6 }}
//                     />
//                   </LineChart>
//                 </ResponsiveContainer>
//               ) : (
//                 <div className="flex h-full items-center justify-center text-xs text-slate-400">
//                   No trend data available
//                 </div>
//               )}
//             </div>

//             <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
//               <div className="rounded-xl bg-slate-50 p-3">
//                 <p className="text-[10px] font-semibold uppercase text-slate-400">
//                   Total Export Value
//                 </p>

//                 <p className="mt-1 text-sm font-extrabold text-slate-800">
//                   {formatINR(chartTotalValue * 10000000)}
//                 </p>
//               </div>

//               <div className="rounded-xl bg-slate-50 p-3">
//                 <p className="text-[10px] font-semibold uppercase text-slate-400">
//                   Export Shipments
//                 </p>

//                 <p className="mt-1 text-sm font-extrabold text-slate-800">
//                   {formatNumber(chartTotalShipments)}
//                 </p>
//               </div>
//             </div>
//           </div>

//           {/* COUNTRY DISTRIBUTION */}

//           <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//             <SectionHeader
//               icon={Globe2}
//               title="Exports by Destination"
//               subtitle="Country-wise FOB value distribution"
//               right={
//                 <span className="text-[10px] font-bold text-slate-400">
//                   {countryChartData.length} Countries
//                 </span>
//               }
//             />

//             <div className="relative mx-auto h-[190px] w-full max-w-[230px]">
//               {loading ? (
//                 <div className="flex h-full items-center justify-center">
//                   <Loader2
//                     size={22}
//                     className="animate-spin text-blue-500"
//                   />
//                 </div>
//               ) : countryChartData.length ? (
//                 <>
//                   <ResponsiveContainer width="100%" height="100%">
//                     <PieChart>
//                       <Pie
//                         data={countryChartData}
//                         dataKey="value"
//                         nameKey="name"
//                         innerRadius={57}
//                         outerRadius={82}
//                         paddingAngle={3}
//                         stroke="none"
//                       >
//                         {countryChartData.map((item, index) => (
//                           <Cell key={index} fill={item.color} />
//                         ))}
//                       </Pie>

//                       <Tooltip
//                         formatter={(value) => [
//                           formatINR(value),
//                           "FOB Value",
//                         ]}
//                       />
//                     </PieChart>
//                   </ResponsiveContainer>

//                   <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
//                     <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                       Total Value
//                     </span>

//                     <span className="mt-1 text-sm font-extrabold text-slate-800">
//                       {formatINR(countryTotalValue)}
//                     </span>
//                   </div>
//                 </>
//               ) : (
//                 <EmptyState text="No country data available" />
//               )}
//             </div>

//             <div className="mt-4 max-h-[145px] space-y-2 overflow-y-auto border-t border-slate-100 pt-4">
//               {countryChartData.slice(0, 8).map((item, index) => (
//                 <div
//                   key={item.name || index}
//                   className="flex items-center justify-between gap-2"
//                 >
//                   <div className="flex min-w-0 items-center gap-2">
//                     <span
//                       className="h-2.5 w-2.5 shrink-0 rounded-full"
//                       style={{ backgroundColor: item.color }}
//                     />

//                     <span className="truncate text-[11px] font-medium text-slate-600">
//                       {item.name}
//                     </span>
//                   </div>

//                   <div className="shrink-0 text-right">
//                     <p className="text-xs font-bold text-slate-800">
//                       {formatINR(item.value)}
//                     </p>

//                     <p className="text-[10px] text-slate-400">
//                       {item.percentage.toFixed(1)}%
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* TOP PRODUCTS / EXPORTERS / BUYERS */}

//         <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">

//           {/* TOP PRODUCTS */}

//           <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//             <SectionHeader
//               icon={Boxes}
//               title="Top Exported Products"
//               subtitle="Highest value product categories"
//               right={
//                 <span className="text-[10px] font-bold text-slate-400">
//                   {topProducts.length} Products
//                 </span>
//               }
//             />

//             <div className="space-y-5">
//               {topProducts.length > 0 ? (
//                 topProducts.slice(0, 5).map((item, index) => (
//                   <div key={`${item.hsCode}-${index}`}>
//                     <div className="mb-2 flex items-start justify-between gap-2">
//                       <div className="min-w-0">
//                         <p className="text-[10px] font-bold text-blue-600">
//                           HS {item.hsCode}
//                         </p>

//                         <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
//                           {item.productName || "Unnamed Product"}
//                         </p>
//                       </div>

//                       <div className="shrink-0 text-right">
//                         <p className="text-xs font-extrabold text-slate-800">
//                           {formatCr(item.value)}
//                         </p>

//                         <p className="mt-0.5 text-[10px] text-slate-400">
//                           {item.share || 0}% of shipments
//                         </p>
//                       </div>
//                     </div>

//                     <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//                       <div
//                         className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
//                         style={{
//                           width: `${Math.min(
//                             100,
//                             Number(item.share || 0)
//                           )}%`,
//                         }}
//                       />
//                     </div>
//                   </div>
//                 ))
//               ) : (
//                 <EmptyState text="No product data available" />
//               )}
//             </div>
//           </div>

//           {/* TOP EXPORTERS */}

//           <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//             <SectionHeader
//               icon={Building2}
//               title="Top Exporters"
//               subtitle="Leading export companies"
//               right={
//                 <span className="text-[10px] font-bold text-slate-400">
//                   {topExporters.length} Exporters
//                 </span>
//               }
//             />

//             {topExporters.length > 0 ? (
//               <div className="space-y-1">
//                 {topExporters.slice(0, 5).map((item, index) => (
//                   <div
//                     key={item.exporter || index}
//                     className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
//                   >
//                     <div className="flex min-w-0 items-center gap-3">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-600">
//                         {String(index + 1).padStart(2, "0")}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-xs font-bold text-slate-700">
//                           {item.exporter || "-"}
//                         </p>

//                         <p className="mt-1 text-[10px] text-slate-400">
//                           {formatNumber(item.shipments)} Shipments
//                         </p>
//                       </div>
//                     </div>

//                     <div className="shrink-0 text-right">
//                       <p className="text-xs font-extrabold text-slate-800">
//                         {formatCr(item.value)}
//                       </p>

//                       <p className="mt-1 text-[9px] font-semibold text-emerald-600">
//                         Export Value
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <EmptyState text="No exporter data available" />
//             )}
//           </div>

//           {/* TOP BUYERS */}

//           <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//             <SectionHeader
//               icon={Globe2}
//               title="Top Buyers"
//               subtitle="Leading international buyers"
//               right={
//                 <span className="text-[10px] font-bold text-slate-400">
//                   {topBuyers.length} Buyers
//                 </span>
//               }
//             />

//             {topBuyers.length > 0 ? (
//               <div className="space-y-1">
//                 {topBuyers.slice(0, 5).map((item, index) => (
//                   <div
//                     key={item.buyer || index}
//                     className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
//                   >
//                     <div className="flex min-w-0 items-center gap-3">
//                       <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xs font-extrabold text-orange-600">
//                         {String(index + 1).padStart(2, "0")}
//                       </div>

//                       <div className="min-w-0">
//                         <p className="truncate text-xs font-bold text-slate-700">
//                           {item.buyer || "-"}
//                         </p>

//                         <p className="mt-1 text-[10px] text-slate-400">
//                           {formatNumber(item.shipments)} Shipments
//                         </p>
//                       </div>
//                     </div>

//                     <div className="shrink-0 text-right">
//                       <p className="text-xs font-extrabold text-slate-800">
//                         {formatCr(item.value)}
//                       </p>

//                       <p className="mt-1 text-[9px] font-semibold text-emerald-600">
//                         Export Value
//                       </p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <EmptyState text="No buyer data available" />
//             )}
//           </div>
//         </div>

//         {/* FOOTER */}

//         <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
//           <p className="text-[10px] font-medium text-slate-400">
//             Export Intelligence Dashboard
//           </p>

//           <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
//             <ArrowUpRight size={12} />
//             Analytics based on uploaded export records and FOB values.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }


import ReportActions from "../../components/ReportActions";

// mahima code //
import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

import {
  getDashboard,
  getFilterOptions,
  getExportTrend,
  getCountryDistribution,
  getTopProducts,
  getTopBuyers,
  getTopExporters,
  getRecentShipments,
} from "../../api/ExportIntelApi";

import {
  CalendarDays,
  Download,
  Package,
  IndianRupee,
  Users,
  Building2,
  Globe2,
  ChevronDown,
  Search,
  X,
  Filter,
  RefreshCw,
  TrendingUp,
  ArrowUpRight,
  Database,
  MapPin,
  Boxes,
  FileSpreadsheet,
  Loader2,
  BarChart3,
  CheckCircle2,
} from "lucide-react";

import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// ==========================================
// CONSTANTS & HELPERS
// ==========================================

const COLORS = [
  "#2563EB",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#EC4899",
  "#06B6D4",
  "#6366F1",
  "#F97316",
];

const INITIAL_FILTERS = {
  search: "",
  hsCode: "",
  country: "",
  exporter: "",
  buyer: "",
  month: "",
  year: "",
};

const formatINR = (value = 0) => {
  const amount = Number(value) || 0;

  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }

  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }

  return `₹${amount.toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;
};

const formatCr = (value = 0) =>
  `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

const formatNumber = (value = 0) =>
  Number(value || 0).toLocaleString("en-IN");

const getMonthName = (month = "") => {
  const value = String(month).trim();

  if (!value) return "";

  const date = new Date(`${value} 1, 2000`);

  return Number.isNaN(date.getTime())
    ? value.charAt(0).toUpperCase() + value.slice(1)
    : date.toLocaleString("en-IN", { month: "short" });
};

const getMonthIndex = (month = "") => {
  const date = new Date(`${month} 1, 2000`);
  return Number.isNaN(date.getTime()) ? 0 : date.getMonth();
};

const getMonthLabel = (id = "") => {
  const parts = String(id).split("-");
  const year = parts[0];
  const month = parts.slice(1).join("-");

  return `${getMonthName(month)} ${year}`;
};

const getResponseData = (response, fallback = []) => {
  const body = response?.data ?? response;

  const data =
    body?.data ??
    body?.result ??
    body?.results ??
    body;

  return data ?? fallback;
};

// ==========================================
// SEARCHABLE DROPDOWN
// ==========================================

const SelectFilter = ({
  value,
  onChange,
  options = [],
  placeholder = "Select",
  searchable = true,
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState({});

  const wrapperRef = useRef(null);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);

  const selectedLabel =
    options.find((item) => item.value === value)?.label || placeholder;

  const filteredOptions = useMemo(() => {
    return options.filter((item) =>
      String(item.label).toLowerCase().includes(search.toLowerCase())
    );
  }, [options, search]);

  const updatePosition = () => {
    if (!buttonRef.current) return;

    const rect = buttonRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const openAbove = spaceBelow < 270 && spaceAbove > spaceBelow;

    const maxHeight = Math.max(
      120,
      Math.min(250, openAbove ? spaceAbove - 12 : spaceBelow - 12)
    );

    setPosition({
      top: openAbove ? "auto" : rect.bottom + 7,
      bottom: openAbove ? viewportHeight - rect.top + 7 : "auto",
      left: rect.left,
      width: rect.width,
      maxHeight,
    });
  };

  useEffect(() => {
    if (!open) return;

    updatePosition();

    const handleOutside = (event) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handleOutside);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);

    return () => {
      document.removeEventListener("mousedown", handleOutside);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  const handleSelect = (item) => {
    onChange(item.value);
    setOpen(false);
    setSearch("");
  };

  return (
    <div className="relative min-w-0 w-full" ref={wrapperRef}>

      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          if (!open) updatePosition();
          setOpen((prev) => !prev);
        }}
        className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 text-left text-xs font-semibold transition-all ${
          open
            ? "border-blue-500 ring-4 ring-blue-50"
            : "border-slate-200 hover:border-blue-300"
        }`}
      >
        <span className="truncate text-slate-700">
          {selectedLabel}
        </span>

        <ChevronDown
          size={15}
          className={`shrink-0 text-slate-400 transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          ref={menuRef}
          style={{
            position: "fixed",
            top: position.top,
            bottom: position.bottom,
            left: position.left,
            width: position.width,
            maxHeight: position.maxHeight,
            zIndex: 9999,
          }}
          className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
        >
          {searchable && (
            <div className="sticky top-0 border-b border-slate-100 bg-white p-2">
              <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2">
                <Search
                  size={13}
                  className="shrink-0 text-slate-400"
                />

                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search options..."
                  className="w-full py-2 text-xs outline-none"
                />

                {search && (
                  <button
                    type="button"
                    onClick={() => setSearch("")}
                  >
                    <X size={13} className="text-slate-400" />
                  </button>
                )}
              </div>
            </div>
          )}

          <div className="overflow-y-auto py-1">
            {filteredOptions.map((item, index) => (
              <button
                type="button"
                key={`${item.value}-${index}`}
                onClick={() => handleSelect(item)}
                className={`w-full px-3 py-2.5 text-left text-xs transition hover:bg-blue-50 ${
                  value === item.value
                    ? "bg-blue-50 font-bold text-blue-700"
                    : "text-slate-600"
                }`}
              >
                {item.label}
              </button>
            ))}

            {filteredOptions.length === 0 && (
              <p className="py-5 text-center text-xs text-slate-400">
                No options found
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({ item, loading }) => {
  const Icon = item.icon;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-150" />

      <div className="relative flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
            {item.title}
          </p>

          <h3 className="mt-3 break-words text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl">
            {loading ? "..." : item.value}
          </h3>

          <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
            <Database size={11} />
            {item.description}
          </p>
        </div>

        <div
          className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
        >
          <Icon size={19} />
        </div>
      </div>
    </div>
  );
};

// ==========================================
// SECTION HEADER
// ==========================================

const SectionHeader = ({
  icon: Icon,
  title,
  subtitle,
  right,
}) => (
  <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
    <div className="flex items-center gap-3">
      {Icon && (
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
          <Icon size={19} />
        </div>
      )}

      <div>
        <h3 className="text-sm font-extrabold text-slate-800 sm:text-base">
          {title}
        </h3>

        {subtitle && (
          <p className="mt-0.5 text-[11px] text-slate-400">
            {subtitle}
          </p>
        )}
      </div>
    </div>

    {right}
  </div>
);

// ==========================================
// EMPTY STATE
// ==========================================

const EmptyState = ({ text }) => (
  <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
    <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
      <Database size={20} />
    </div>

    <p className="text-xs font-semibold text-slate-500">
      {text}
    </p>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ExportIntelligenceDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [filterOptions, setFilterOptions] = useState({});

  const [exportTrend, setExportTrend] = useState([]);
  const [countryDistribution, setCountryDistribution] = useState([]);

  const [topProducts, setTopProducts] = useState([]);
  const [topExporters, setTopExporters] = useState([]);
  const [topBuyers, setTopBuyers] = useState([]);

  const [recentShipments, setRecentShipments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // FILTER STATES

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHsCode, setSelectedHsCode] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedExporter, setSelectedExporter] = useState("All Exporters");
  const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState("All Years");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    hsCode: "All",
    country: "All Countries",
    exporter: "All Exporters",
    buyer: "All Buyers",
    month: "All Months",
    year: "All Years",
  });

  // ==========================================
  // API FETCHING
  // ==========================================

  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
  
      const data = getResponseData(res, {});
  
      console.log("FILTER OPTIONS API RESPONSE:", res);
      console.log("FILTER OPTIONS DATA:", data);
  
      setFilterOptions({
        hsCodes: data?.hsCodes || [],
        countries: data?.countries || [],
        exporters: data?.exporters || [],
        buyers: data?.buyers || [],
        months: data?.months || [],
        years: data?.years || [],
      });
    } catch (err) {
      console.error("Export filter options error:", err);
    }
  };

  const fetchDashboardData = useCallback(async (filters) => {
    try {
      setLoading(true);
      setError("");
  
      // Convert UI default values into empty values for backend
      const apiFilters = {
        search: filters.search || "",
        hsCode: filters.hsCode === "All" ? "" : filters.hsCode,
        country:
          filters.country === "All Countries" ? "" : filters.country,
        exporter:
          filters.exporter === "All Exporters" ? "" : filters.exporter,
        buyer:
          filters.buyer === "All Buyers" ? "" : filters.buyer,
        month:
          filters.month === "All Months" ? "" : filters.month,
        year:
          filters.year === "All Years" ? "" : filters.year,
      };
  
      console.log("EXPORT DASHBOARD FILTERS:", apiFilters);
  
      // Call all APIs independently
      const results = await Promise.allSettled([
        getDashboard(apiFilters),
        getExportTrend(apiFilters),
        getCountryDistribution(apiFilters),
        getTopProducts(apiFilters),
        getTopExporters(apiFilters),
        getTopBuyers(apiFilters),
        getRecentShipments(apiFilters),
      ]);
  
      const getResult = (index, fallback = []) => {
        const result = results[index];
  
        if (result.status === "rejected") {
          console.error(`Export API ${index + 1} failed:`, result.reason);
          return fallback;
        }
  
        const data = getResponseData(result.value, fallback);
  
        console.log(`Export API ${index + 1} response:`, result.value);
        console.log(`Export API ${index + 1} data:`, data);
  
        return data;
      };
  
      setDashboard(getResult(0, {}));
      setExportTrend(getResult(1, []));
      setCountryDistribution(getResult(2, []));
      setTopProducts(getResult(3, []));
      setTopExporters(getResult(4, []));
      setTopBuyers(getResult(5, []));
      setRecentShipments(getResult(6, []));
  
      const failedApis = results.filter(
        (result) => result.status === "rejected"
      );
  
      if (failedApis.length > 0) {
        setError(
          `${failedApis.length} analytics API(s) failed. Check browser console for details.`
        );
      }
    } catch (err) {
      console.error("Export dashboard error:", err);
  
      setError(
        err?.response?.data?.message ||
          "Unable to load export intelligence data."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchDashboardData(appliedFilters);
  }, [appliedFilters, fetchDashboardData]);

  // ==========================================
  // FILTER HANDLERS
  // ==========================================

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery.trim(),
      hsCode: selectedHsCode,
      country: selectedCountry,
      exporter: selectedExporter,
      buyer: selectedBuyer,
      month: selectedMonth,
      year: selectedYear,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedHsCode("All");
    setSelectedCountry("All Countries");
    setSelectedExporter("All Exporters");
    setSelectedBuyer("All Buyers");
    setSelectedMonth("All Months");
    setSelectedYear("All Years");

    setAppliedFilters({
      search: "",
      hsCode: "All",
      country: "All Countries",
      exporter: "All Exporters",
      buyer: "All Buyers",
      month: "All Months",
      year: "All Years",
    });
  };

  const activeFilterCount = Object.values(appliedFilters).filter(
    (value) =>
      value &&
      !["All", "All Countries", "All Exporters", "All Buyers", "All Months", "All Years"].includes(
        value
      )
  ).length;

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      title: "Total Export Shipments",
      value: formatNumber(dashboard.totalExportShipments),
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
      description: "Total matching records",
    },
    {
      title: "Total Export Value",
      value: formatINR(dashboard.totalExportValue),
      icon: IndianRupee,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
      description: "Based on FOB value",
    },
    {
      title: "Total Exporters",
      value: formatNumber(dashboard.totalExporters),
      icon: Building2,
      color: "text-violet-600",
      bg: "bg-violet-50",
      description: "Unique exporter names",
    },
    {
      title: "Total Buyers",
      value: formatNumber(dashboard.totalBuyers),
      icon: Users,
      color: "text-orange-600",
      bg: "bg-orange-50",
      description: "Unique consignee names",
    },
    {
      title: "Avg. Shipment Value",
      value: formatINR(dashboard.avgShipmentValue),
      icon: TrendingUp,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      description: "Average FOB per shipment",
    },
  ];

  // ==========================================
  // CHART DATA - ORIGINAL LOGIC PRESERVED
  // ==========================================

  const lineChartData = useMemo(() => {
    return [...exportTrend]
      .sort((a, b) => {
        const [yearA, ...monthA] = String(a._id).split("-");
        const [yearB, ...monthB] = String(b._id).split("-");

        return (
          Number(yearA) - Number(yearB) ||
          getMonthIndex(monthA.join("-")) -
            getMonthIndex(monthB.join("-"))
        );
      })
      .map((item) => ({
        date: getMonthLabel(item._id),
        value: Number(
          (Number(item.totalValue || 0) / 10000000).toFixed(2)
        ),
        shipments: Number(item.shipments || 0),
      }));
  }, [exportTrend]);

  const chartTotalValue = lineChartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  const chartTotalShipments = lineChartData.reduce(
    (sum, item) => sum + item.shipments,
    0
  );

  const countryChartData = useMemo(
    () =>
      countryDistribution.map((item, index) => ({
        name: item.country || "Unknown",
        value: Number(item.value || 0),
        percentage: Number(item.percentage || 0),
        color: COLORS[index % COLORS.length],
      })),
    [countryDistribution]
  );

  const countryTotalValue = countryChartData.reduce(
    (sum, item) => sum + item.value,
    0
  );

  // ==========================================
  // FILTER OPTIONS
  // ==========================================

  const makeOptions = (items, defaultLabel) => [
    { label: defaultLabel, value: defaultLabel },
    ...items.map((item) => ({
      label: String(item),
      value: String(item),
    })),
  ];

  const hsCodeOptions = makeOptions(
    filterOptions.hsCodes || [],
    "All"
  );

  const countryOptions = makeOptions(
    filterOptions.countries || [],
    "All Countries"
  );

  const exporterOptions = makeOptions(
    filterOptions.exporters || [],
    "All Exporters"
  );

  const buyerOptions = makeOptions(
    filterOptions.buyers || [],
    "All Buyers"
  );

  const monthOptions = makeOptions(
    filterOptions.months || [],
    "All Months"
  );

  const yearOptions = makeOptions(
    (filterOptions.years || []).map(String),
    "All Years"
  );

  // ==========================================
  // CSV EXPORT
  // ==========================================

  const handleExportReport = () => {
    if (!recentShipments.length) return;

    const headers = [
      "Shipment ID",
      "HS Code",
      "Product Description",
      "Exporter",
      "Buyer",
      "Destination Country",
      "Quantity",
      "FOB Value",
      "Month",
      "Year",
    ];

    const rows = recentShipments.map((item) => [
      item.shipmentId,
      item.hsCode,
      item.productName,
      item.exporter,
      item.buyer,
      item.country,
      item.quantity,
      item.value,
      item.month,
      item.year,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) =>
            `"${String(value ?? "").replace(/"/g, '""')}"`
          )
          .join(",")
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "export-intelligence-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-3 pb-8 pt-16 font-sans text-slate-700 sm:px-5 lg:px-7">      <ReportActions module="Export Intelligence" result={(!loading && !error) ? ({dashboard,exportTrend,countryDistribution,topProducts,topExporters,topBuyers,recentShipments,appliedFilters}) : null} query={searchQuery} />

      <div className="mx-auto max-w-[1600px]">

        {/* HEADER */}

        <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#102d5c] via-[#17458a] to-[#2563eb] p-5 shadow-lg sm:p-7">
          <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />

          <div className="absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

          <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
            <div>
              <div className="mb-3 flex items-center gap-2">
                <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
                  Trade Analytics
                </span>

                <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
                  Dashboard Overview
                </span>
              </div>

              <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
                Export Intelligence
              </h1>

              <p className="mt-2 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm">
                Analyze export performance, discover leading products,
                explore international buyers and understand global
                destination markets.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm">
                <CalendarDays size={16} />
                All Export Records
              </div>

              <button
                onClick={handleExportReport}
                disabled={!recentShipments.length}
                className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Download size={16} />
                Export Report
              </button>
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
            <span>{error}</span>

            <button
              onClick={() => fetchDashboardData(appliedFilters)}
              className="flex items-center gap-1.5 font-bold"
            >
              <RefreshCw size={14} />
              Retry
            </button>
          </div>
        )}

        {/* STATS */}

        <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {stats.map((item, index) => (
            <StatCard
              key={index}
              item={item}
              loading={loading}
            />
          ))}
        </div>

        {/* FILTER PANEL */}

        <div className="relative z-30 mb-6 overflow-visible rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <Filter size={18} />
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Search & Filters
                </h3>

                <p className="mt-0.5 text-[11px] text-slate-400">
                  Refine your export intelligence data
                </p>
              </div>
            </div>

            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
              {loading ? "Updating data..." : `${activeFilterCount} Active Filters`}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* SEARCH */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Search Records
              </label>

              <div className="relative">
                <Search
                  size={15}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyFilters();
                  }}
                  placeholder="HS Code, product, exporter..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
                />
              </div>
            </div>

            {/* HS CODE */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                HS Code
              </label>

              <SelectFilter
                value={selectedHsCode}
                onChange={setSelectedHsCode}
                options={hsCodeOptions}
                placeholder="All"
              />
            </div>

            {/* COUNTRY */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Destination Country
              </label>

              <SelectFilter
                value={selectedCountry}
                onChange={setSelectedCountry}
                options={countryOptions}
                placeholder="All Countries"
              />
            </div>

            {/* EXPORTER */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Exporter
              </label>

              <SelectFilter
                value={selectedExporter}
                onChange={setSelectedExporter}
                options={exporterOptions}
                placeholder="All Exporters"
              />
            </div>

            {/* BUYER */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Buyer / Consignee
              </label>

              <SelectFilter
                value={selectedBuyer}
                onChange={setSelectedBuyer}
                options={buyerOptions}
                placeholder="All Buyers"
              />
            </div>

            {/* MONTH */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Month
              </label>

              <SelectFilter
                value={selectedMonth}
                onChange={setSelectedMonth}
                options={monthOptions}
                placeholder="All Months"
              />
            </div>

            {/* YEAR */}

            <div className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Year
              </label>

              <SelectFilter
                value={selectedYear}
                onChange={setSelectedYear}
                options={yearOptions}
                placeholder="All Years"
              />
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4">
            <p className="flex items-center gap-2 text-[10px] font-medium text-slate-400">
              <CalendarDays size={13} />
              Showing data based on uploaded export records and selected filters.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={handleResetFilters}
                className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
              >
                <RefreshCw size={14} />
                Reset
              </button>

              <button
                onClick={handleApplyFilters}
                disabled={loading}
                className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
              >
                {loading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <Filter size={14} />
                )}
                Apply Filters
              </button>
            </div>
          </div>
        </div>

        {/* RECENT EXPORT RECORDS */}

        <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
            <SectionHeader
              icon={FileSpreadsheet}
              title="Recent Export Shipments"
              subtitle="Latest matching export records"
              right={
                <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
                  {formatNumber(recentShipments.length)} Records
                </span>
              }
            />
          </div>

          <div className="max-h-[470px] overflow-auto">
            <table className="w-full min-w-[1050px] border-collapse text-left">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr className="border-b border-slate-200">
                  {[
                    "Shipment ID",
                    "HS Code",
                    "Product Description",
                    "Exporter",
                    "Buyer / Consignee",
                    "Destination",
                    "Quantity",
                    "FOB Value",
                    "Month",
                    "Year",
                  ].map((heading) => (
                    <th
                      key={heading}
                      className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {recentShipments.length > 0 ? (
                  recentShipments.map((ship, index) => (
                    <tr
                      key={ship._id || index}
                      className="transition hover:bg-blue-50/40"
                    >
                      <td className="whitespace-nowrap px-4 py-3.5">
                        <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-blue-700">
                          {ship.shipmentId || "-"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500">
                        {ship.hsCode || "-"}
                      </td>

                      <td className="max-w-[230px] truncate px-4 py-3.5 text-xs font-semibold text-slate-700">
                        {ship.productName || "-"}
                      </td>

                      <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
                        {ship.exporter || "-"}
                      </td>

                      <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
                        {ship.buyer || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-slate-700">
                        <span className="flex items-center gap-1.5">
                          <MapPin size={12} className="text-slate-400" />
                          {ship.country || "-"}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-slate-600">
                        {formatNumber(ship.quantity)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs font-extrabold text-slate-800">
                        {formatCr(ship.value)}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
                        {getMonthName(ship.month) || "-"}
                      </td>

                      <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
                        {ship.year || "-"}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={10} className="px-4 py-8">
                      <EmptyState
                        text={
                          loading
                            ? "Loading export records..."
                            : "No matching export records found"
                        }
                      />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3">
            <p className="text-[10px] font-medium text-slate-400">
              Showing latest {recentShipments.length} matching records
            </p>

            {loading && (
              <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
                <Loader2 size={12} className="animate-spin" />
                Updating
              </span>
            )}
          </div>
        </div>

        {/* ANALYTICS - CHART DESIGN AND LOGIC UNCHANGED */}

        <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

          {/* EXPORT TREND */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5 xl:col-span-2">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <TrendingUp size={19} />
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-slate-800">
                    Export Value Trend
                  </h3>

                  <p className="mt-0.5 text-[11px] text-slate-400">
                    Monthly FOB export value
                  </p>
                </div>
              </div>

              <span className="rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700">
                {formatINR(chartTotalValue * 10000000)}
              </span>
            </div>

            <div className="h-[260px] w-full">
              {loading ? (
                <div className="flex h-full items-center justify-center text-slate-400">
                  <Loader2 className="animate-spin" size={22} />
                </div>
              ) : lineChartData.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={lineChartData}
                    margin={{ top: 10, right: 10, left: 5, bottom: 5 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#edf1f7"
                    />

                    <XAxis
                      dataKey="date"
                      tick={{ fill: "#94a3b8", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      minTickGap={15}
                    />

                    <YAxis
                      tick={{ fill: "#94a3b8", fontSize: 10 }}
                      tickLine={false}
                      axisLine={false}
                      tickFormatter={(value) => `₹${value}Cr`}
                    />

                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: "1px solid #e2e8f0",
                        fontSize: 12,
                      }}
                      formatter={(value) => [`₹${value} Cr`, "FOB Value"]}
                    />

                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#2563EB"
                      strokeWidth={3}
                      dot={{
                        r: 4,
                        fill: "#2563EB",
                        stroke: "#fff",
                        strokeWidth: 2,
                      }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-xs text-slate-400">
                  No trend data available
                </div>
              )}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  Total Export Value
                </p>

                <p className="mt-1 text-sm font-extrabold text-slate-800">
                  {formatINR(chartTotalValue * 10000000)}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-[10px] font-semibold uppercase text-slate-400">
                  Export Shipments
                </p>

                <p className="mt-1 text-sm font-extrabold text-slate-800">
                  {formatNumber(chartTotalShipments)}
                </p>
              </div>
            </div>
          </div>

          {/* COUNTRY DISTRIBUTION */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              icon={Globe2}
              title="Exports by Destination"
              subtitle="Country-wise FOB value distribution"
              right={
                <span className="text-[10px] font-bold text-slate-400">
                  {countryChartData.length} Countries
                </span>
              }
            />

            <div className="relative mx-auto h-[190px] w-full max-w-[230px]">
              {loading ? (
                <div className="flex h-full items-center justify-center">
                  <Loader2
                    size={22}
                    className="animate-spin text-blue-500"
                  />
                </div>
              ) : countryChartData.length ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={countryChartData}
                        dataKey="value"
                        nameKey="name"
                        innerRadius={57}
                        outerRadius={82}
                        paddingAngle={3}
                        stroke="none"
                      >
                        {countryChartData.map((item, index) => (
                          <Cell key={index} fill={item.color} />
                        ))}
                      </Pie>

                      <Tooltip
                        formatter={(value) => [
                          formatINR(value),
                          "FOB Value",
                        ]}
                      />
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                      Total Value
                    </span>

                    <span className="mt-1 text-sm font-extrabold text-slate-800">
                      {formatINR(countryTotalValue)}
                    </span>
                  </div>
                </>
              ) : (
                <EmptyState text="No country data available" />
              )}
            </div>

            <div className="mt-4 max-h-[145px] space-y-2 overflow-y-auto border-t border-slate-100 pt-4">
              {countryChartData.slice(0, 8).map((item, index) => (
                <div
                  key={item.name || index}
                  className="flex items-center justify-between gap-2"
                >
                  <div className="flex min-w-0 items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />

                    <span className="truncate text-[11px] font-medium text-slate-600">
                      {item.name}
                    </span>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-bold text-slate-800">
                      {formatINR(item.value)}
                    </p>

                    <p className="text-[10px] text-slate-400">
                      {item.percentage.toFixed(1)}%
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TOP PRODUCTS / EXPORTERS / BUYERS */}

        <div className="mb-6 grid grid-cols-1 gap-5 lg:grid-cols-3">

          {/* TOP PRODUCTS */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              icon={Boxes}
              title="Top Exported Products"
              subtitle="Highest value product categories"
              right={
                <span className="text-[10px] font-bold text-slate-400">
                  {topProducts.length} Products
                </span>
              }
            />

            <div className="space-y-5">
              {topProducts.length > 0 ? (
                topProducts.slice(0, 5).map((item, index) => (
                  <div key={`${item.hsCode}-${index}`}>
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <div className="min-w-0">
                        <p className="text-[10px] font-bold text-blue-600">
                          HS {item.hsCode}
                        </p>

                        <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                          {item.productName || "Unnamed Product"}
                        </p>
                      </div>

                      <div className="shrink-0 text-right">
                        <p className="text-xs font-extrabold text-slate-800">
                          {formatCr(item.value)}
                        </p>

                        <p className="mt-0.5 text-[10px] text-slate-400">
                          {item.share || 0}% of shipments
                        </p>
                      </div>
                    </div>

                    <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                        style={{
                          width: `${Math.min(
                            100,
                            Number(item.share || 0)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                ))
              ) : (
                <EmptyState text="No product data available" />
              )}
            </div>
          </div>

          {/* TOP EXPORTERS */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              icon={Building2}
              title="Top Exporters"
              subtitle="Leading export companies"
              right={
                <span className="text-[10px] font-bold text-slate-400">
                  {topExporters.length} Exporters
                </span>
              }
            />

            {topExporters.length > 0 ? (
              <div className="space-y-1">
                {topExporters.slice(0, 5).map((item, index) => (
                  <div
                    key={item.exporter || index}
                    className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-600">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-700">
                          {item.exporter || "-"}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          {formatNumber(item.shipments)} Shipments
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-extrabold text-slate-800">
                        {formatCr(item.value)}
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-emerald-600">
                        Export Value
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No exporter data available" />
            )}
          </div>

          {/* TOP BUYERS */}

          <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
            <SectionHeader
              icon={Globe2}
              title="Top Buyers"
              subtitle="Leading international buyers"
              right={
                <span className="text-[10px] font-bold text-slate-400">
                  {topBuyers.length} Buyers
                </span>
              }
            />

            {topBuyers.length > 0 ? (
              <div className="space-y-1">
                {topBuyers.slice(0, 5).map((item, index) => (
                  <div
                    key={item.buyer || index}
                    className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-xs font-extrabold text-orange-600">
                        {String(index + 1).padStart(2, "0")}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate text-xs font-bold text-slate-700">
                          {item.buyer || "-"}
                        </p>

                        <p className="mt-1 text-[10px] text-slate-400">
                          {formatNumber(item.shipments)} Shipments
                        </p>
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <p className="text-xs font-extrabold text-slate-800">
                        {formatCr(item.value)}
                      </p>

                      <p className="mt-1 text-[9px] font-semibold text-emerald-600">
                        Export Value
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState text="No buyer data available" />
            )}
          </div>
        </div>

        {/* FOOTER */}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
          <p className="text-[10px] font-medium text-slate-400">
            Export Intelligence Dashboard
          </p>

          <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
            <ArrowUpRight size={12} />
            Analytics based on uploaded export records and FOB values.
          </p>
        </div>
      </div>
    </div>
  );
}