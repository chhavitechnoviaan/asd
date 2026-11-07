// // // import React, { useState, useMemo, useEffect } from "react";
// // // import {
// // //   getDashboard,
// // //   getFilterOptions,
// // //   getImportTrend,
// // //   getCountryDistribution,
// // //   getTopProducts,
// // //   getTopSuppliers,
// // //   getTopImporters,
// // //   getPortWiseImports,
// // //   getRecentShipments,
// // // } from "../../api/ImportIntelApi";
// // // import DatePicker from "react-datepicker";
// // // import { getImportIntelligence } from "../../api/CargoMateApi";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import ExportReport from "../../components/b2bComponent/ExportReport";
// // // import {
// // //   CalendarDays,
// // //   Download,
// // //   Package,
// // //   IndianRupee,
// // //   Users,
// // //   Truck,
// // //   Globe,
// // //   Clock3,
// // //   ChevronDown,
// // // } from "lucide-react";

// // // import {
// // //   ResponsiveContainer,
// // //   LineChart,
// // //   Line,
// // //   BarChart,
// // //   Bar,
// // //   YAxis,
// // //   CartesianGrid,
// // //   XAxis,
// // //   Tooltip,
// // // } from "recharts";
// // // const HEADING = "text-[#07156B]";
// // // // ==========================================
// // // // 1. RAW DATA (यह डेटा API से आ सकता है)
// // // // ==========================================

// // // /*const INITIAL_PRODUCTS = [
// // //   { hsCode: "85", desc: "Electrical Machinery & Equipment", shipments: "2,145", value: 412.50, share: "33.1%", barWidth: "w-[33%]" },
// // //   { hsCode: "84", desc: "Machinery & Mechanical Appliances", shipments: "1,745", value: 286.40, share: "23.0%", barWidth: "w-[23%]" },
// // //   { hsCode: "90", desc: "Optical, Medical & Precision Instruments", shipments: "1,055", value: 201.20, share: "16.1%", barWidth: "w-[16%]" },
// // //   { hsCode: "72", desc: "Iron & Steel", shipments: "955", value: 178.10, share: "14.3%", barWidth: "w-[14%]" },
// // //   { hsCode: "39", desc: "Plastics & Articles", shipments: "882", value: 167.60, share: "13.5%", barWidth: "w-[13.5%]" },
// // // ];

// // // const INITIAL_LINE_DATA = [
// // //   { date: "15 Apr", value: 1100 }, { date: "16 Apr", value: 1150 }, { date: "17 Apr", value: 1120 },
// // //   { date: "18 Apr", value: 1220 }, { date: "19 Apr", value: 1245 }, { date: "20 Apr", value: 1210 },
// // //   { date: "21 Apr", value: 1230 }, { date: "22 Apr", value: 1260 }, { date: "23 Apr", value: 1280 },
// // //   { date: "24 Apr", value: 1320 },
// // // ];

// // // const INITIAL_PIE_DATA = [
// // //   { name: "USA", value: 512.35, percent: "27.3%", color: "#2563EB" },
// // //   { name: "UAE", value: 302.80, percent: "16.1%", color: "#10B981" },
// // //   { name: "China", value: 268.40, percent: "14.3%", color: "#8B5CF6" },
// // //   { name: "Germany", value: 208.40, percent: "11.1%", color: "#F59E0B" },
// // //   { name: "Bangladesh", value: 268.40, percent: "14.3%", color: "#6366F1" },
// // //   { name: "Netherland", value: 268.40, percent: "14.3%", color: "#94A3B8" },
// // //   { name: "Other", value: 148.10, percent: "7.6%", color: "#EC4899" },
// // // ];

// // // const INITIAL_SUPPLIERS = [
// // //   { name: "ABC Trading Co. Ltd.", shipments: "845", value: "₹120.45 Cr", growth: "▲ 18.2%", country: "USA" },
// // //   { name: "Global Industries Inc.", shipments: "712", value: "₹88.75 Cr", growth: "▲ 12.2%", country: "UAE" },
// // //   { name: "Omega Suppliers", shipments: "655", value: "₹76.20 Cr", growth: "▲ 11.4%", country: "China" },
// // //   { name: "Prime Exports Ltd.", shipments: "582", value: "₹64.10 Cr", growth: "▲ 9.5%", country: "Germany" },
// // // ];

// // // const INITIAL_IMPORTERS = [
// // //   { name: "ABC Imports Pvt. Ltd.", shipments: "1,245", value: "₹182.45 Cr", growth: "▲ 18.2%", country: "USA" },
// // //   { name: "Global Enterprises", shipments: "1,021", value: "₹138.75 Cr", growth: "▲ 15.2%", country: "UAE" },
// // //   { name: "Omega Traders", shipments: "812", value: "₹96.20 Cr", growth: "▲ 11.4%", country: "China" },
// // //   { name: "Shiva Trades", shipments: "755", value: "₹84.10 Cr", growth: "▲ 9.5%", country: "Germany" },
// // // ];

// // // const INITIAL_PORTS = [
// // //   { name: "Nhava Sheva (Mumbai)", shipments: "2,895", value: "₹ 412.50 Cr", share: "33.1%" },
// // //   { name: "Mundra (Gujarat)", shipments: "1,745", value: "₹ 286.40 Cr", share: "23.0%" },
// // //   { name: "Chennai", shipments: "1,055", value: "₹ 201.20 Cr", share: "16.1%" },
// // //   { name: "Kolkata", shipments: "955", value: "₹ 124.10 Cr", share: "10.0%" },
// // // ];

// // // const INITIAL_SHIPMENTS = [
// // //   { id: "EXP-2025-2845", hsCode: "85", desc: "Electrical Machinery & Equipment", exporter: "ABC Exports Pvt. Ltd.", buyer: "Global Retail Inc.", country: "USA", port: "Nhava Sheva (Mumbai)", date: "24 Apr 2025", value: "₹ 45.80 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2844", hsCode: "84", desc: "Machinery & Mechanical Appliances", exporter: "Global Trade Solutions", buyer: "TechMart USA", country: "UAE", port: "Mundra (Gujarat)", date: "23 Apr 2025", value: "₹ 38.75 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2843", hsCode: "90", desc: "Optical, Medical & Precision Instruments", exporter: "Prime Exports Ltd.", buyer: "Mega Traders LLC", country: "Germany", port: "Chennai", date: "22 Apr 2025", value: "₹ 28.50 Cr", status: "IN TRANSIT" },
// // //   { id: "EXP-2025-2842", hsCode: "72", desc: "Iron & Steel", exporter: "Shiva Exports", buyer: "Euro International GmbH", country: "China", port: "Nhava Sheva (Mumbai)", date: "21 Apr 2025", value: "₹ 18.10 Cr", status: "DELIVERED" },
// // //   { id: "EXP-2025-2841", hsCode: "39", desc: "Plastics & Articles", exporter: "Omega Exports Pvt. Ltd.", buyer: "Domestic Distributors", country: "Bangladesh", port: "Kolkata", date: "20 Apr 2025", value: "₹ 16.20 Cr", status: "PENDING" },
// // // ];*/

// // // const getCurrentFinancialYear = (date = new Date()) => {
// // //   const year = date.getFullYear();
// // //   const startYear = date.getMonth() >= 3 ? year : year - 1;
// // //   return `${startYear}-${startYear + 1}`;
// // // };

// // // const unwrapTradeResponse = (response) =>
// // //   response?.data?.data?.query
// // //     ? response.data.data
// // //     : response?.data?.query
// // //       ? response.data
// // //       : (response?.data?.data ?? response?.data ?? null);

// // // export default function ImportIntelligence({ setMainTab }) {
// // //   const [dashboard, setDashboard] = useState({});
// // //   const [filterOptions, setFilterOptions] = useState({});
// // //   const [importTrend, setImportTrend] = useState([]);
// // //   const [countryDistribution, setCountryDistribution] = useState([]);
// // //   const [topProducts, setTopProducts] = useState([]);
// // //   const [topSuppliers, setTopSuppliers] = useState([]);
// // //   const [topImporters, setTopImporters] = useState([]);
// // //   const [portWiseImports, setPortWiseImports] = useState([]);
// // //   const [recentShipments, setRecentShipments] = useState([]);

// // //   const [searchQuery, setSearchQuery] = useState("");
// // //   const [topN, setTopN] = useState(10);
// // //   const [tradeTrendResult, setTradeTrendResult] = useState(null);
// // //   const [tradeTrendLoading, setTradeTrendLoading] = useState(false);
// // //   const [tradeTrendError, setTradeTrendError] = useState("");

// // //   const runTradeTrendSearch = async () => {
// // //     const hsCode = searchQuery.trim();
// // //     if (!hsCode) {
// // //       setTradeTrendError("Enter an HS code to search import intelligence.");
// // //       setTradeTrendResult(null);
// // //       return;
// // //     }

// // //     setTradeTrendLoading(true);
// // //     setTradeTrendError("");
// // //     try {
// // //       const params = {
// // //         hs_code: hsCode,
// // //         year: getCurrentFinancialYear(shipmentStartDate || new Date()),
// // //         top_n: Math.max(1, Number(topN) || 10),
// // //         include_trend: true,
// // //         values_in: "₹ Crore",
// // //       };
// // //       const response = await getImportIntelligence(params);
// // //       setTradeTrendResult(unwrapTradeResponse(response));
// // //     } catch (err) {
// // //       setTradeTrendResult(null);
// // //       setTradeTrendError(
// // //         err?.response?.data?.detail ||
// // //           err?.response?.data?.message ||
// // //           err.message ||
// // //           "Import intelligence search failed.",
// // //       );
// // //     } finally {
// // //       setTradeTrendLoading(false);
// // //     }
// // //   };

// // //   const [selectedHsCode, setSelectedHsCode] = useState("All HsCode");
// // //   const [selectedPort, setSelectedPort] = useState("All Ports");
// // //   const [selectedCountry, setSelectedCountry] = useState("All Countries");
// // //   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
// // //   const [selectedBuyer, setSelectedBuyer] = useState("All Buyers");
// // //   const [shipmentStartDate, setShipmentStartDate] = useState(null);
// // //   const [shipmentEndDate, setShipmentEndDate] = useState(null);
// // //   const [dateRange, setDateRange] = useState(false);
// // //   const [exportReport, setExportReport] = useState(false);

// // //   // Filter Active State (ताकि 'Apply Filters' पर ही बड़े बदलाव दिखें)
// // //   const [appliedFilters, setAppliedFilters] = useState({
// // //     search: "",
// // //     hsCode: "All",
// // //     port: "All Ports",
// // //     country: "All Countries",
// // //     exporter: "All Exporters",
// // //     buyer: "All Buyers",
// // //   });

// // //   const fetchDashboard = async () => {
// // //     try {
// // //       const res = await getDashboard();
// // //       setDashboard(res.data.data || {});
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchFilterOptions = async () => {
// // //     try {
// // //       const res = await getFilterOptions();
// // //       setFilterOptions(res.data.data || {});
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchImportTrend = async () => {
// // //     try {
// // //       const res = await getImportTrend();
// // //       setImportTrend(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchCountryDistribution = async () => {
// // //     try {
// // //       const res = await getCountryDistribution();
// // //       setCountryDistribution(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchTopProducts = async () => {
// // //     try {
// // //       const res = await getTopProducts();
// // //       setTopProducts(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchTopSuppliers = async () => {
// // //     try {
// // //       const res = await getTopSuppliers();
// // //       setTopSuppliers(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchTopImporters = async () => {
// // //     try {
// // //       const res = await getTopImporters();
// // //       setTopImporters(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchPortWiseImports = async () => {
// // //     try {
// // //       const res = await getPortWiseImports();
// // //       setPortWiseImports(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };

// // //   const fetchRecentShipments = async () => {
// // //     try {
// // //       const res = await getRecentShipments();
// // //       setRecentShipments(res.data.data || []);
// // //     } catch (err) {
// // //       console.error(err);
// // //     }
// // //   };
// // //   const handleApplyFilters = () => {
// // //     setAppliedFilters({
// // //       search: searchQuery,
// // //       hsCode: selectedHsCode,
// // //       port: selectedPort,
// // //       country: selectedCountry,
// // //       exporter: selectedExporter,
// // //       buyer: selectedBuyer,
// // //     });
// // //   };

// // //   const handleResetFilters = () => {
// // //     setSearchQuery("");
// // //     setSelectedHsCode("All");
// // //     setSelectedPort("All Ports");
// // //     setSelectedCountry("All Countries");
// // //     setSelectedExporter("All Exporters");
// // //     setSelectedBuyer("All Buyers");

// // //     setAppliedFilters({
// // //       search: "",
// // //       hsCode: "All",
// // //       port: "All Ports",
// // //       country: "All Countries",
// // //       exporter: "All Exporters",
// // //       buyer: "All Buyers",
// // //     });
// // //   };

// // //   useEffect(() => {
// // //     fetchDashboard();
// // //     fetchFilterOptions();
// // //     fetchImportTrend();
// // //     fetchCountryDistribution();
// // //     fetchTopProducts();
// // //     fetchTopSuppliers();
// // //     fetchTopImporters();
// // //     fetchPortWiseImports();
// // //     fetchRecentShipments();
// // //   }, []);
// // //   // Aggregate all origin-country values for the summary cards.
// // //   const importsByCountryForStats = Array.isArray(tradeTrendResult?.imports_by_country)
// // //     ? tradeTrendResult.imports_by_country
// // //     : countryDistribution;

// // //   const countryImportAggregates = useMemo(() => {
// // //     const countries = Array.isArray(importsByCountryForStats) ? importsByCountryForStats : [];
// // //     const totalValue = countries.reduce((sum, country) => sum + (Number(country.value ?? 0) || 0), 0);
// // //     const previousTotal = countries.reduce((sum, country) => sum + (Number(country.previous_value ?? 0) || 0), 0);
// // //     const growthPct = previousTotal > 0 ? ((totalValue - previousTotal) / previousTotal) * 100 : 0;
// // //     return { count: countries.length, totalValue, previousTotal, growthPct };
// // //   }, [importsByCountryForStats]);

// // //   const INITIAL_STATS = [
// // //     {
// // //       title: "Total Import Shipments",
// // //       value: countryImportAggregates.count,
// // //       change: "",
// // //       icon: Package,
// // //       color: "text-blue-500",
// // //       bg: "bg-blue-50",
// // //       isUp: true,
// // //     },
// // //     {
// // //       title: "Total Import Value",
// // //       value: `₹${Number(tradeTrendResult?.summary?.total_import_value ?? (dashboard.totalImportValue || 0) / 10000000).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`,
// // //        change: `${tradeTrendResult?.summary?.growth_pct >= 0 ? "▲" : "▼"} ${Math.abs(tradeTrendResult?.summary?.growth_pct).toFixed(1)}% `,
// // //       icon: IndianRupee,
// // //       color: "text-green-500",
// // //       bg: "bg-green-50",
// // //       isUp: true,
// // //     },
// // //     {
// // //       title: "Total Importers",
// // //       value: dashboard.totalImporters || 0,
// // //       change: "-",
// // //       icon: Users,
// // //       color: "text-cyan-500",
// // //       bg: "bg-cyan-50",
// // //       isUp: true,
// // //     },

// // //     {
// // //       title: "Countries of Origin",
// // //       value:
// // //         tradeTrendResult?.summary?.countries_of_origin ??
// // //         dashboard.countries ??
// // //         0,
// // //       change: "-",
// // //       icon: Globe,
// // //       color: "text-purple-500",
// // //       bg: "bg-purple-50",
// // //       isUp: true,
// // //     },
// // //     {
// // //       title: "Avg. Shipment Value (INR)",
// // //       value: `₹${countryImportAggregates.totalValue.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`,
// // //       change: `${countryImportAggregates.growthPct >= 0 ? "▲" : "▼"} ${Math.abs(countryImportAggregates.growthPct).toFixed(1)}% vs previous value`,
// // //       icon: IndianRupee,
// // //       color: "text-orange-500",
// // //       bg: "bg-orange-50",
// // //       isUp: countryImportAggregates.growthPct >= 0,
// // //     },
// // //   ];

// // //   const normalizedProductValues = topProducts.map((p) => Number(p.value ?? 0));
// // //   const maxValue = normalizedProductValues.length
// // //     ? Math.max(...normalizedProductValues, 1)
// // //     : 1;
// // //   const PRODUCTS = topProducts.map((item) => {
// // //     const value = Number(item.value ?? 0);
// // //     const share = (value / maxValue) * 100;
// // //     return {
// // //       hsCode: item._id?.hsCode || "-",
// // //       desc: item._id?.product || "-",
// // //       shipments: Number(item.shipments ?? 0),
// // //       value,
// // //       share: `${share.toFixed(0)}%`,
// // //       barWidth: `${share}%`,
// // //     };
// // //   });
// // //   const LINE_DATA = importTrend.map((item) => ({
// // //     date: new Date(item._id).toLocaleDateString("en-GB", {
// // //       day: "2-digit",
// // //       month: "short",
// // //     }),
// // //     value: item.totalValue / 10000000, // Crores
// // //   }));
// // //   const totalImportValue = importTrend.reduce(
// // //     (sum, item) => sum + item.totalValue,
// // //     0,
// // //   );

// // //   // Live series returned by /import-intelligence.
// // //   const liveTradeTrend = useMemo(() => {
// // //     const points = tradeTrendResult?.value_trend?.points;
// // //     const summary = tradeTrendResult?.summary ?? {};
// // //     const pointData = Array.isArray(points)
// // //       ? points
// // //           .map((point) => ({
// // //             year: point.year,
// // //             value: Number(point.value ?? 0),
// // //           }))
// // //           .filter((point) => Number.isFinite(point.value))
// // //       : [];
// // //     const summaryYearData = [
// // //       ...(summary.previous_year != null
// // //         ? [{ year: "Previous Year", value: Number(summary.previous_year) }]
// // //         : []),
// // //       ...(summary.current_year != null
// // //         ? [{ year: "Current Year", value: Number(summary.current_year) }]
// // //         : []),
// // //     ].filter((point) => Number.isFinite(point.value));
// // //     const chartData = pointData.length ? pointData : summaryYearData;
// // //     const latest = chartData[chartData.length - 1];
// // //     return {
// // //       chartData,
// // //       latestValue: Number(summary.total_import_value ?? latest?.value ?? 0),
// // //       latestYear: latest?.year ?? tradeTrendResult?.query?.year ?? null,
// // //       previousYearValue: Number(summary.previous_year ?? 0),
// // //       currentYearValue: Number(summary.current_year ?? 0),
// // //       growthPct: Number(summary.growth_pct ?? 0),
// // //     };
// // //   }, [tradeTrendResult]);

// // //   const displayedImportValue = Number(
// // //     liveTradeTrend.latestValue ?? totalImportValue / 10000000,
// // //   );

// // //   const PIE_COLORS = [
// // //     "#2563EB",
// // //     "#10B981",
// // //     "#8B5CF6",
// // //     "#F59E0B",
// // //     "#6366F1",
// // //     "#94A3B8",
// // //     "#EC4899",
// // //   ];
// // //   // ==========================================
// // //   // 3. DYNAMIC FILTERING LOGIC (useMemo से परफॉर्मेंस बूस्ट)
// // //   // ==========================================

// // //   // Dynamic Shipments Table
// // //   const filteredShipments = useMemo(() => {
// // //     return recentShipments.filter((ship) => {
// // //       const hsCode = ship.cargo?.hsCode?.hsCode?.toString() || "";

// // //       const exporter = ship.exporter?.companyName || "";

// // //       const buyer = ship.buyer?.companyName || "";

// // //       const country = ship.route?.destinationCountry || "";

// // //       const port = ship.route?.originCity || "";

// // //       const search = `${ship.sbNumber}
// // //        ${ship.cargo?.productName}
// // //        ${hsCode}
// // //        ${exporter}
// // //        ${buyer}
// // //        ${country}
// // //        ${port}`.toLowerCase();

// // //       return (
// // //         (appliedFilters.search === "" ||
// // //           search.includes(appliedFilters.search.toLowerCase())) &&
// // //         (appliedFilters.hsCode === "All" || hsCode === appliedFilters.hsCode) &&
// // //         (appliedFilters.port === "All Ports" || port === appliedFilters.port) &&
// // //         (appliedFilters.country === "All Countries" ||
// // //           country === appliedFilters.country) &&
// // //         (appliedFilters.exporter === "All Exporters" ||
// // //           exporter === appliedFilters.exporter) &&
// // //         (appliedFilters.buyer === "All Buyers" ||
// // //           buyer === appliedFilters.buyer)
// // //       );
// // //     });
// // //   }, [recentShipments, appliedFilters]);
// // //   // Dynamic Pie/Donut Chart Data
// // //   const dynamicPieData = useMemo(() => {
// // //     const source = Array.isArray(tradeTrendResult?.imports_by_country)
// // //       ? tradeTrendResult.imports_by_country
// // //       : countryDistribution;
// // //     return source
// // //       .map((item, index) => ({
// // //         name: item.country ?? item.name ?? "Unknown",
// // //         value: Number(item.value ?? 0),
// // //         previousValue: Number(item.previous_value ?? 0),
// // //         growthPct: Number(item.growth_pct ?? (
// // //           Number(item.previous_value ?? 0) > 0
// // //             ? ((Number(item.value ?? 0) - Number(item.previous_value)) / Number(item.previous_value)) * 100
// // //             : 0
// // //         )),
// // //         sharePct: Number(item.share_pct ?? item.percentage ?? 0),
// // //         percent: `${Number(item.share_pct ?? item.percentage ?? 0).toFixed(2)}%`,
// // //         color: PIE_COLORS[index % PIE_COLORS.length],
// // //       }))
// // //       .filter((item) => Number.isFinite(item.value));
// // //   }, [tradeTrendResult, countryDistribution]);

// // //   return (
// // //     <div className="min-h-screen overflow-y-auto bg-[#f8fafc] p-6 text-slate-700 antialiased  pt-14">
// // //       {/* HEADER SECTION */}
// // //       <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-[#1e293b]">
// // //             Import Intelligence
// // //           </h1>
// // //           <p className="text-xs text-slate-500 mt-0.5 font-semibold">
// // //             Get actionable insights on global imports, products, suppliers and
// // //             markets.
// // //           </p>
// // //         </div>

// // //         <div className="flex items-center gap-3 w-full lg:w-auto">
// // //           <div className="relative flex-1 md:flex-none">
// // //             <DatePicker
// // //               selected={shipmentStartDate}
// // //               onChange={(dates) => {
// // //                 const [start, end] = dates;
// // //                 setShipmentStartDate(start);
// // //                 setShipmentEndDate(end);
// // //               }}
// // //               startDate={shipmentStartDate}
// // //               endDate={shipmentEndDate}
// // //               selectsRange
// // //               dateFormat="dd MMM yyyy"
// // //               placeholderText="01 Apr 2025 - 24 Apr 2025"
// // //               className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
// // //             />
// // //             <CalendarDays
// // //               size={14}
// // //               className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// // //             />
// // //           </div>
// // //           <button
// // //             onClick={() => setExportReport(true)}
// // //             className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}
// // //           >
// // //             <Download size={14} className="text-slate-400" />
// // //             Export Report
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {/* STATS CARD GRID */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
// // //         {INITIAL_STATS.map((item, index) => {
// // //           const Icon = item.icon;
// // //           return (
// // //             <div
// // //               key={index}
// // //               className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm flex flex-col justify-between"
// // //             >
// // //               <div className="flex justify-between items-start gap-1">
// // //                 <span className="text-[13px] font-medium text-slate-600 leading-tight block max-w-[85%]">
// // //                   {item.title}
// // //                 </span>
// // //                 <div
// // //                   className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}
// // //                 >
// // //                   <Icon size={16} />
// // //                 </div>
// // //               </div>
// // //               <div className="mt-3">
// // //                 <h3 className="font-bold text-lg text-slate-800 tracking-tight">
// // //                   {item.value}
// // //                 </h3>
// // //                 <span
// // //                   className={`text-[10px] font-medium block mt-0.5 ${item.isUp ? "text-green-500" : "text-red-500"}`}
// // //                 >
// // //                   {item.change}
// // //                 </span>
// // //               </div>
// // //             </div>
// // //           );
// // //         })}
// // //       </div>

// // //       {/* TRADE TREND SEARCH */}
// // //       <div className="bg-white border border-slate-100 rounded-2xl p-3 shadow-sm mb-6">
// // //         <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(140px,0.8fr)_auto] gap-3 items-center">
// // //           <input
// // //             type="text"
// // //             value={searchQuery}
// // //             onChange={(e) => setSearchQuery(e.target.value)}
// // //             onKeyDown={(e) => {
// // //               if (e.key === "Enter") {
// // //                 handleApplyFilters();
// // //                 runTradeTrendSearch();
// // //               }
// // //             }}
// // //             placeholder="Search HS Code or Product"
// // //             aria-label="HS Code or Product"
// // //             className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// // //           />
// // //           <input
// // //             type="number"
// // //             min="1"
// // //             max="100"
// // //             value={topN}
// // //             onChange={(e) => setTopN(e.target.value)}
// // //             aria-label="Number of countries"
// // //             placeholder="Top countries (10)"
// // //             className="w-full min-w-0 bg-white border border-slate-200 rounded-xl py-2.5 px-3 text-xs text-slate-700 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
// // //           />
// // //           <button
// // //             type="button"
// // //             onClick={() => {
// // //               handleApplyFilters();
// // //               runTradeTrendSearch();
// // //             }}
// // //             disabled={tradeTrendLoading}
// // //             className="w-full rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs py-2.5 px-4 transition disabled:opacity-60"
// // //           >
// // //             {tradeTrendLoading ? "Searching..." : "Search"}
// // //           </button>
// // //           <button
// // //             type="button"
// // //             onClick={() => {
// // //               handleResetFilters();
// // //               setTradeTrendResult(null);
// // //               setTradeTrendError("");
// // //             }}
// // //             className="rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-slate-700 hover:bg-slate-50 font-medium text-xs py-2.5 px-4 transition"
// // //           >
// // //             Reset
// // //           </button>
// // //         </div>
// // //         {tradeTrendError && (
// // //           <p role="alert" className="mt-3 text-xs text-red-600">
// // //             {tradeTrendError}
// // //           </p>
// // //         )}
// // //         {tradeTrendLoading && (
// // //           <p className="mt-3 text-xs text-slate-500">
// // //             Fetching live import trade trends...
// // //           </p>
// // //         )}
// // //       </div>

// // //       {/* ROW 1: IMPORT VALUE TREND + COUNTRY ORIGIN */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //         {/* IMPORT VALUE TREND */}
// // //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
// // //           <div className="flex justify-between items-center mb-2">
// // //             <h3 className="font-bold text-sm text-slate-800">
// // //               Import Value Trend (INR)
// // //             </h3>
// // //             <span className="text-[10px] text-slate-400 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
// // //               {liveTradeTrend.latestYear || "Yearly trend"}
// // //             </span>
// // //           </div>
// // //           <div className="mb-3">
// // //             <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
// // //               <span className="text-xl font-bold text-slate-800">
// // //                 ₹
// // //                 {Number(
// // //                   tradeTrendResult?.summary?.total_import_value ??
// // //                     displayedImportValue ??
// // //                     0,
// // //                 ).toLocaleString("en-IN", {
// // //                   minimumFractionDigits: 2,
// // //                   maximumFractionDigits: 2,
// // //                 })}{" "}
// // //                 Cr
// // //               </span>
// // //               <span
// // //                 className={`text-xs font-semibold ${liveTradeTrend.growthPct >= 0 ? "text-emerald-600" : "text-red-500"}`}
// // //               >
// // //                 {liveTradeTrend.growthPct >= 0 ? "▲" : "▼"}{" "}
// // //                 {Math.abs(liveTradeTrend.growthPct).toFixed(1)}% vs previous
// // //                 year
// // //               </span>
// // //             </div>
// // //             <div className="grid grid-cols-2 gap-2 mt-3">
// // //               <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
// // //                 <p className="text-[10px] text-slate-500">Previous Year</p>
// // //                 <p className="text-xs font-bold text-slate-800">
// // //                   ₹
// // //                   {liveTradeTrend.previousYearValue.toLocaleString("en-IN", {
// // //                     minimumFractionDigits: 2,
// // //                     maximumFractionDigits: 2,
// // //                   })}{" "}
// // //                   Cr
// // //                 </p>
// // //               </div>
// // //               <div className="rounded-xl border border-slate-100 bg-slate-50 px-3 py-2">
// // //                 <p className="text-[10px] text-slate-500">Current Year</p>
// // //                 <p className="text-xs font-bold text-slate-800">
// // //                   ₹
// // //                   {liveTradeTrend.currentYearValue.toLocaleString("en-IN", {
// // //                     minimumFractionDigits: 2,
// // //                     maximumFractionDigits: 2,
// // //                   })}{" "}
// // //                   Cr
// // //                 </p>
// // //               </div>
// // //             </div>
// // //           </div>
// // //           <div className="h-[180px] w-full">
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <LineChart
// // //                 data={
// // //                   liveTradeTrend.chartData.length
// // //                     ? liveTradeTrend.chartData
// // //                     : LINE_DATA
// // //                 }
// // //               >
// // //                 <XAxis
// // //                   dataKey={liveTradeTrend.chartData.length ? "year" : "date"}
// // //                   tick={{ fill: "#94a3b8", fontSize: 10 }}
// // //                   tickLine={false}
// // //                   axisLine={false}
// // //                 />
// // //                 <Tooltip
// // //                   formatter={(value) => [
// // //                     `₹${Number(value ?? 0).toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr`,
// // //                     "Import Value",
// // //                   ]}
// // //                 />
// // //                 <Line
// // //                   type="monotone"
// // //                   dataKey="value"
// // //                   stroke="#10B981"
// // //                   strokeWidth={2.5}
// // //                   dot={{ fill: "#10B981", r: 3 }}
// // //                   connectNulls
// // //                 />
// // //               </LineChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //         </div>

// // //         {/* IMPORTS BY COUNTRY */}
// // //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
// // //           <div className="flex justify-between items-center mb-2 gap-2">
// // //             <div>
// // //               <h3 className="font-bold text-sm text-slate-800">Imports by Country of Origin</h3>
// // //               <p className="text-[10px] text-slate-400 mt-1">Current vs previous import value · ₹ Crore</p>
// // //             </div>
// // //             <span className="text-[10px] text-slate-400 whitespace-nowrap">{dynamicPieData.length} countries</span>
// // //           </div>
// // //           <div className="h-[190px] w-full">
// // //             <ResponsiveContainer width="100%" height="100%">
// // //               <BarChart data={dynamicPieData.slice(0, Math.max(1, Number(topN) || 10))} margin={{ top: 8, right: 8, left: -18, bottom: 4 }} barCategoryGap="28%">
// // //                 <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
// // //                 <XAxis dataKey="name" tick={{ fill: "#64748b", fontSize: 9 }} tickLine={false} axisLine={false} interval={0} />
// // //                 <YAxis tick={{ fill: "#94a3b8", fontSize: 9 }} tickLine={false} axisLine={false} />
// // //                 <Tooltip
// // //                   formatter={(value, name) => [
// // //                     `₹${Number(value ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`,
// // //                     name === "value" || name === "Current Value" ? "Current Value" : "Previous Value",
// // //                   ]}
// // //                   labelFormatter={(label) => `Country: ${label}`}
// // //                 />
// // //                 <Bar dataKey="previousValue" name="Previous Value" fill="#cbd5e1" radius={[4, 4, 0, 0]} />
// // //                 <Bar dataKey="value" name="Current Value" fill="#2563eb" radius={[4, 4, 0, 0]} />
// // //               </BarChart>
// // //             </ResponsiveContainer>
// // //           </div>
// // //           <div className="mt-3 space-y-2 max-h-[135px] overflow-y-auto pr-1">
// // //             {dynamicPieData.slice(0, Math.max(1, Number(topN) || 10)).map((country, idx) => (
// // //               <div key={`${country.name}-${idx}`} className="rounded-lg bg-slate-50 px-3 py-2">
// // //                 <div className="flex items-center justify-between gap-2">
// // //                   <span className="text-[11px] font-semibold text-slate-700 truncate">{country.name}</span>
// // //                   <span className="text-[11px] font-bold text-slate-800 whitespace-nowrap">
// // //                     ₹{country.value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 mt-1 text-[10px]">
// // //                   <span className="text-slate-500">Previous: ₹{country.previousValue.toLocaleString("en-IN", { maximumFractionDigits: 2 })} Cr</span>
// // //                   <span className={country.growthPct >= 0 ? "text-emerald-600 font-semibold" : "text-red-500 font-semibold"}>
// // //                     {country.growthPct >= 0 ? "▲" : "▼"} {Math.abs(country.growthPct).toFixed(1)}%
// // //                   </span>
// // //                   <span className="text-slate-500">Share {country.sharePct.toFixed(2)}%</span>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             {!dynamicPieData.length && <p className="text-xs text-slate-400">No country data available.</p>}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* ROW 2: LIVE IMPORT TRADE TREND + TOP IMPORTED PRODUCTS */}
// // //       <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
// // //         {tradeTrendResult && (
// // //           <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm">
// // //             <div className="flex flex-wrap items-start justify-between gap-2 mb-4">
// // //               <div>
// // //                 <h3 className="text-sm font-bold text-slate-800">Value Trend</h3>
// // //                 <p className="text-xs text-slate-500 mt-1">
// // //                   Country: {tradeTrendResult?.value_trend?.country || "—"} · {tradeTrendResult?.value_trend?.metric || "Values in ₹ Crore"}
// // //                 </p>
// // //                 <p className="text-[10px] text-slate-400 mt-1">
// // //                   {tradeTrendResult?.value_trend?.basis || "Multi-year import value series"}
// // //                 </p>
// // //               </div>
// // //               <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-1 text-[10px] font-semibold">Live API data</span>
// // //             </div>
// // //             <div className="h-[230px] w-full">
// // //               <ResponsiveContainer width="100%" height="100%">
// // //                 <LineChart data={liveTradeTrend.chartData} margin={{ top: 10, right: 10, left: -12, bottom: 4 }}>
// // //                   <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eef2f7" />
// // //                   <XAxis dataKey="year" tick={{ fill: "#64748b", fontSize: 9 }} tickLine={false} axisLine={false} />
// // //                   <YAxis tick={{ fill: "#94a3b8", fontSize: 10 }} tickLine={false} axisLine={false} />
// // //                   <Tooltip
// // //                     formatter={(value) => [
// // //                       `₹${Number(value ?? 0).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} Cr`,
// // //                       "Import Value",
// // //                     ]}
// // //                     labelFormatter={(label) => `Financial year: ${label}`}
// // //                   />
// // //                   <Line type="monotone" dataKey="value" name="Import Value" stroke="#2563eb" strokeWidth={2.5} dot={{ fill: "#2563eb", r: 4 }} activeDot={{ r: 6 }} />
// // //                 </LineChart>
// // //               </ResponsiveContainer>
// // //             </div>
// // //             {!liveTradeTrend.chartData.length && <p className="text-xs text-slate-400 mt-2">No value_trend points returned by the API yet.</p>}
// // //           </div>
// // //         )}

// // //         {/* TOP IMPORTED PRODUCTS */}
// // //         <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm flex flex-col">
// // //           <div className="flex justify-between items-center mb-4">
// // //             <h3 className="font-bold text-sm text-slate-800">
// // //               Top Imported Products
// // //             </h3>
// // //             <span className="text-[10px] text-slate-400">By import value</span>
// // //           </div>
// // //           <div className="space-y-4">
// // //             {PRODUCTS.map((prod, i) => (
// // //               <div key={i} className="text-xs">
// // //                 <div className="flex justify-between items-start text-slate-600 mb-1.5 gap-2">
// // //                   <span className="font-semibold text-slate-400 shrink-0">
// // //                     {prod.hsCode}
// // //                   </span>
// // //                   <span className="truncate flex-1 font-medium text-slate-700">
// // //                     {prod.desc}
// // //                   </span>
// // //                   <span className="font-semibold text-slate-800 shrink-0">
// // //                     ₹{(Number(prod.value ?? 0) / 10000000).toFixed(2)} Cr
// // //                   </span>
// // //                 </div>
// // //                 <div className="flex items-center gap-3">
// // //                   <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
// // //                     <div
// // //                       className="bg-gradient-to-r from-blue-500 to-emerald-400 h-full rounded-full transition-all duration-500"
// // //                       style={{ width: prod.barWidth }}
// // //                     />
// // //                   </div>
// // //                   <span className="text-[10px] text-slate-500 font-semibold shrink-0 w-8 text-right">
// // //                     {prod.share}
// // //                   </span>
// // //                 </div>
// // //               </div>
// // //             ))}
// // //             {!PRODUCTS.length && (
// // //               <p className="text-xs text-slate-400">
// // //                 No imported product data available.
// // //               </p>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* DYNAMIC SHIPMENTS TABLE */}
// // //       <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm pb-10 ">
// // //         <div className="flex justify-between items-center mb-4">
// // //           <h3 className="font-bold text-sm text-slate-800">
// // //             Recent Import Shipments
// // //           </h3>
// // //           <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded-md font-medium">
// // //             Showing {filteredShipments.length} Records
// // //           </span>
// // //         </div>

// // //         <div className="overflow-x-auto -mx-5">
// // //           <div className="inline-block min-w-full align-middle px-5">
// // //             <table className="min-w-full divide-y divide-slate-100 text-xs">
// // //               <thead>
// // //                 <tr className="text-left text-slate-400 font-semibold uppercase tracking-wider border-b border-slate-100">
// // //                   <th className="pb-3 font-medium">Shipment ID</th>
// // //                   <th className="pb-3 font-medium">HS Code</th>
// // //                   <th className="pb-3 font-medium">Product Description</th>
// // //                   <th className="pb-3 font-medium">Exporter</th>
// // //                   <th className="pb-3 font-medium">Buyer</th>
// // //                   <th className="pb-3 font-medium">Destination Country</th>
// // //                   <th className="pb-3 font-medium">Port of Exit</th>
// // //                   <th className="pb-3 font-medium">Ship Date</th>
// // //                   <th className="pb-3 font-medium">Value (INR)</th>
// // //                   <th className="pb-3 font-medium text-center">Status</th>
// // //                 </tr>
// // //               </thead>
// // //               <tbody className="divide-y divide-slate-50 text-slate-600 font-medium">
// // //                 {filteredShipments.length > 0 ? (
// // //                   filteredShipments.map((ship, idx) => (
// // //                     <tr key={idx} className="hover:bg-slate-50/80 transition">
// // //                       <td className="py-3.5 text-blue-600 font-semibold">
// // //                         {ship.sbNumber}
// // //                       </td>
// // //                       <td className="py-3.5 text-slate-400 font-bold">
// // //                         {ship.cargo?.hsCode?.hsCode || "-"}
// // //                       </td>
// // //                       <td className="py-3.5 max-w-[180px] truncate font-semibold text-slate-700">
// // //                         {ship.cargo?.productName ||
// // //                           ship.cargo?.description ||
// // //                           "-"}
// // //                       </td>
// // //                       <td className="py-3.5 truncate text-slate-500">
// // //                         {ship.exporter?.companyName || "-"}
// // //                       </td>
// // //                       <td className="py-3.5 truncate text-slate-500">
// // //                         {ship.buyer?.companyName || "-"}
// // //                       </td>
// // //                       <td className="py-3.5 text-slate-700">
// // //                         {ship.route?.destinationCountry || "-"}
// // //                       </td>
// // //                       <td className="py-3.5 text-slate-500">
// // //                         {ship.route?.originCity || "-"}
// // //                       </td>
// // //                       <td className="py-3.5 text-slate-400 whitespace-nowrap">
// // //                         {new Date(ship.shipmentDate).toLocaleDateString(
// // //                           "en-GB",
// // //                           { day: "2-digit", month: "short", year: "numeric" },
// // //                         )}
// // //                       </td>
// // //                       <td className="py-3.5 font-bold text-slate-800">
// // //                         ₹{" "}
// // //                         {(Number(ship.cargo?.value ?? 0) / 10000000).toFixed(2)}{" "}
// // //                         Cr
// // //                       </td>
// // //                       <td className="py-3.5 text-center">
// // //                         <span
// // //                           className={`inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
// // //                             ship.shipmentStatus === "Delivered"
// // //                               ? "bg-green-100 text-green-700"
// // //                               : ship.shipmentStatus === "In Transit"
// // //                                 ? "bg-blue-100 text-blue-700"
// // //                                 : "bg-orange-100 text-orange-700"
// // //                           }`}
// // //                         >
// // //                           {ship.shipmentStatus}
// // //                         </span>
// // //                       </td>
// // //                     </tr>
// // //                   ))
// // //                 ) : (
// // //                   <tr>
// // //                     <td
// // //                       colSpan="10"
// // //                       className="py-8 text-center text-slate-400 font-medium"
// // //                     >
// // //                       No matching records found. Try changing filters!
// // //                     </td>
// // //                   </tr>
// // //                 )}
// // //               </tbody>
// // //             </table>
// // //           </div>
// // //         </div>

// // //         <div className="text-center ">
// // //           <button
// // //             className="text-blue-600 text-xs font-semibold text-center mt-4 pt-2 border-t border-slate-50"
// // //             onClick={() => setMainTab && setMainTab("Shipments")}
// // //           >
// // //             View All Shipments →
// // //           </button>
// // //         </div>
// // //       </div>

// // //       {exportReport && <ExportReport onClose={() => setExportReport(false)} />}
// // //     </div>
// // //   );
// // // }

// // import React, { useState, useEffect, useMemo, useRef } from "react";
// // import {
// //   getDashboard,
// //   getFilterOptions,
// //   getImportTrend,
// //   getCountryDistribution,
// //   getTopProducts,
// //   getTopSuppliers,
// //   getTopImporters,
// //   getRecentShipments,
// // } from "../../api/ImportIntelApi";

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
// //   Search,
// //   X,
// //   Filter,
// //   RefreshCw,
// //   TrendingUp,
// //   ArrowUpRight,
// //   Database,
// //   MapPin,
// //   Boxes,
// //   FileSpreadsheet,
// //   Loader2,
// //   BarChart3,
// //   Building2,
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
// //   CartesianGrid,
// // } from "recharts";

// // // ==========================================
// // // CONSTANTS & HELPERS
// // // ==========================================

// // const PIE_COLORS = [
// //   "#2563EB",
// //   "#10B981",
// //   "#8B5CF6",
// //   "#F59E0B",
// //   "#6366F1",
// //   "#EC4899",
// //   "#0EA5E9",
// //   "#F97316",
// // ];

// // const formatCr = (value) =>
// //   `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

// // const formatNumber = (value) =>
// //   (Number(value) || 0).toLocaleString("en-IN");

// // const formatLakh = (value) =>
// //   `₹${((Number(value) || 0) / 100000).toFixed(2)} L`;

// // const getResponseData = (response) =>
// //   response?.data?.data ?? [];

// // const makeOptions = (items, defaultLabel) => [
// //   { label: defaultLabel, value: defaultLabel },
// //   ...items.map((item) => ({
// //     label: String(item),
// //     value: String(item),
// //   })),
// // ];

// // const CustomTooltip = ({ active, payload, label }) => {
// //   if (!active || !payload?.length) return null;

// //   return (
// //     <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
// //       <p className="mb-1 text-xs font-semibold text-slate-500">
// //         {label}
// //       </p>
// //       <p className="text-sm font-bold text-slate-800">
// //         ₹{Number(payload[0].value).toFixed(2)} Cr
// //       </p>
// //     </div>
// //   );
// // };

// // // ==========================================
// // // SEARCHABLE DROPDOWN
// // // ==========================================

// // const SelectFilter = ({
// //   value,
// //   onChange,
// //   options = [],
// //   placeholder = "Select",
// //   searchable = true,
// // }) => {
// //   const [open, setOpen] = useState(false);
// //   const [search, setSearch] = useState("");
// //   const [position, setPosition] = useState({});
// //   const wrapperRef = useRef(null);
// //   const buttonRef = useRef(null);
// //   const menuRef = useRef(null);

// //   const selectedLabel =
// //     options.find((item) => item.value === value)?.label || placeholder;

// //   const filteredOptions = useMemo(() => {
// //     return options.filter((item) =>
// //       String(item.label).toLowerCase().includes(search.toLowerCase())
// //     );
// //   }, [options, search]);

// //   const updatePosition = () => {
// //     if (!buttonRef.current) return;

// //     const rect = buttonRef.current.getBoundingClientRect();
// //     const viewportHeight = window.innerHeight;
// //     const spaceBelow = viewportHeight - rect.bottom;
// //     const spaceAbove = rect.top;
// //     const openAbove = spaceBelow < 270 && spaceAbove > spaceBelow;

// //     const maxHeight = Math.max(
// //       120,
// //       Math.min(250, openAbove ? spaceAbove - 12 : spaceBelow - 12)
// //     );

// //     setPosition({
// //       top: openAbove ? "auto" : rect.bottom + 7,
// //       bottom: openAbove ? viewportHeight - rect.top + 7 : "auto",
// //       left: rect.left,
// //       width: rect.width,
// //       maxHeight,
// //     });
// //   };

// //   useEffect(() => {
// //     if (!open) return;

// //     updatePosition();

// //     const handleOutside = (event) => {
// //       if (
// //         wrapperRef.current &&
// //         !wrapperRef.current.contains(event.target) &&
// //         menuRef.current &&
// //         !menuRef.current.contains(event.target)
// //       ) {
// //         setOpen(false);
// //       }
// //     };

// //     const handleEscape = (event) => {
// //       if (event.key === "Escape") setOpen(false);
// //     };

// //     document.addEventListener("mousedown", handleOutside);
// //     document.addEventListener("keydown", handleEscape);
// //     window.addEventListener("resize", updatePosition);
// //     window.addEventListener("scroll", updatePosition, true);

// //     return () => {
// //       document.removeEventListener("mousedown", handleOutside);
// //       document.removeEventListener("keydown", handleEscape);
// //       window.removeEventListener("resize", updatePosition);
// //       window.removeEventListener("scroll", updatePosition, true);
// //     };
// //   }, [open]);

// //   const handleSelect = (item) => {
// //     onChange(item.value);
// //     setOpen(false);
// //     setSearch("");
// //   };

// //   return (
// //     <div className="relative min-w-0 w-full" ref={wrapperRef}>
// //       <button
// //         ref={buttonRef}
// //         type="button"
// //         onClick={() => {
// //           if (!open) updatePosition();
// //           setOpen((prev) => !prev);
// //         }}
// //         className={`flex h-11 w-full items-center justify-between gap-2 rounded-xl border bg-white px-3 text-left text-xs font-semibold transition-all ${
// //           open
// //             ? "border-blue-500 ring-4 ring-blue-50"
// //             : "border-slate-200 hover:border-blue-300"
// //         }`}
// //       >
// //         <span className="truncate text-slate-700">{selectedLabel}</span>
// //         <ChevronDown
// //           size={15}
// //           className={`shrink-0 text-slate-400 transition-transform ${
// //             open ? "rotate-180" : ""
// //           }`}
// //         />
// //       </button>

// //       {open && (
// //         <div
// //           ref={menuRef}
// //           style={{
// //             position: "fixed",
// //             top: position.top,
// //             bottom: position.bottom,
// //             left: position.left,
// //             width: position.width,
// //             maxHeight: position.maxHeight,
// //             zIndex: 9999,
// //           }}
// //           className="flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl"
// //         >
// //           {searchable && (
// //             <div className="sticky top-0 border-b border-slate-100 bg-white p-2">
// //               <div className="flex items-center gap-2 rounded-lg border border-slate-200 px-2">
// //                 <Search size={13} className="shrink-0 text-slate-400" />
// //                 <input
// //                   autoFocus
// //                   value={search}
// //                   onChange={(e) => setSearch(e.target.value)}
// //                   placeholder="Search options..."
// //                   className="w-full py-2 text-xs outline-none"
// //                 />
// //                 {search && (
// //                   <button type="button" onClick={() => setSearch("")}>
// //                     <X size={13} className="text-slate-400" />
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           <div className="overflow-y-auto py-1">
// //             {filteredOptions.map((item, index) => (
// //               <button
// //                 type="button"
// //                 key={`${item.value}-${index}`}
// //                 onClick={() => handleSelect(item)}
// //                 className={`w-full px-3 py-2.5 text-left text-xs transition hover:bg-blue-50 ${
// //                   value === item.value
// //                     ? "bg-blue-50 font-bold text-blue-700"
// //                     : "text-slate-600"
// //                 }`}
// //               >
// //                 {item.label}
// //               </button>
// //             ))}

// //             {filteredOptions.length === 0 && (
// //               <p className="py-5 text-center text-xs text-slate-400">
// //                 No options found
// //               </p>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // };

// // // ==========================================
// // // STAT CARD
// // // ==========================================

// // const StatCard = ({ item }) => {
// //   const Icon = item.icon;

// //   return (
// //     <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
// //       <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-300 group-hover:scale-150" />

// //       <div className="relative flex items-start justify-between gap-2">
// //         <div className="min-w-0">
// //           <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400 sm:text-[11px]">
// //             {item.title}
// //           </p>

// //           <h3 className="mt-3 break-words text-xl font-extrabold tracking-tight text-slate-800 sm:text-2xl">
// //             {item.value}
// //           </h3>

// //           <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
// //             <Database size={11} />
// //             Filtered import data
// //           </p>
// //         </div>

// //         <div
// //           className={`relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${item.bg} ${item.color}`}
// //         >
// //           <Icon size={19} />
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // // ==========================================
// // // SECTION HEADER
// // // ==========================================

// // const SectionHeader = ({ icon: Icon, title, subtitle, right }) => (
// //   <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
// //     <div className="flex items-center gap-3">
// //       {Icon && (
// //         <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
// //           <Icon size={19} />
// //         </div>
// //       )}

// //       <div>
// //         <h3 className="text-sm font-extrabold text-slate-800 sm:text-base">
// //           {title}
// //         </h3>
// //         {subtitle && (
// //           <p className="mt-0.5 text-[11px] text-slate-400">
// //             {subtitle}
// //           </p>
// //         )}
// //       </div>
// //     </div>

// //     {right}
// //   </div>
// // );

// // // ==========================================
// // // EMPTY STATE
// // // ==========================================

// // const EmptyState = ({ text }) => (
// //   <div className="flex min-h-[150px] flex-col items-center justify-center text-center">
// //     <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
// //       <Database size={20} />
// //     </div>
// //     <p className="text-xs font-semibold text-slate-500">{text}</p>
// //   </div>
// // );

// // // ==========================================
// // // MAIN COMPONENT
// // // ==========================================

// // export default function ImportIntelligence() {
// //   const [dashboard, setDashboard] = useState({});
// //   const [filterOptions, setFilterOptions] = useState({});
// //   const [importTrend, setImportTrend] = useState([]);
// //   const [countryDistribution, setCountryDistribution] = useState([]);
// //   const [topProducts, setTopProducts] = useState([]);
// //   const [topSuppliers, setTopSuppliers] = useState([]);
// //   const [topImporters, setTopImporters] = useState([]);
// //   const [recentShipments, setRecentShipments] = useState([]);

// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState("");

// //   const [searchQuery, setSearchQuery] = useState("");
// //   const [selectedHsCode, setSelectedHsCode] = useState("All");
// //   const [selectedCountry, setSelectedCountry] = useState("All Countries");
// //   const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
// //   const [selectedImporter, setSelectedImporter] = useState("All Importers");
// //   const [selectedMonth, setSelectedMonth] = useState("All Months");
// //   const [selectedYear, setSelectedYear] = useState("All Years");

// //   const [appliedFilters, setAppliedFilters] = useState({
// //     search: "",
// //     hsCode: "All",
// //     country: "All Countries",
// //     supplier: "All Suppliers",
// //     importer: "All Importers",
// //     month: "All Months",
// //     year: "All Years",
// //   });

// //   // ==========================================
// //   // API FETCHING
// //   // ==========================================

// //   const fetchFilterOptions = async () => {
// //     try {
// //       const res = await getFilterOptions();
// //       setFilterOptions(getResponseData(res) || {});
// //     } catch (err) {
// //       console.error("Import filter options error:", err);
// //     }
// //   };

// //   const fetchDashboardData = async (filters) => {
// //     try {
// //       setLoading(true);
// //       setError("");

// //       const [
// //         dashboardRes,
// //         trendRes,
// //         countryRes,
// //         productsRes,
// //         suppliersRes,
// //         importersRes,
// //         shipmentsRes,
// //       ] = await Promise.all([
// //         getDashboard(filters),
// //         getImportTrend(filters),
// //         getCountryDistribution(filters),
// //         getTopProducts(filters),
// //         getTopSuppliers(filters),
// //         getTopImporters(filters),
// //         getRecentShipments(filters),
// //       ]);

// //       setDashboard(getResponseData(dashboardRes) || {});
// //       setImportTrend(getResponseData(trendRes) || []);
// //       setCountryDistribution(getResponseData(countryRes) || []);
// //       setTopProducts(getResponseData(productsRes) || []);
// //       setTopSuppliers(getResponseData(suppliersRes) || []);
// //       setTopImporters(getResponseData(importersRes) || []);
// //       setRecentShipments(getResponseData(shipmentsRes) || []);
// //     } catch (err) {
// //       console.error("Import dashboard error:", err);
// //       setError(
// //         err?.response?.data?.message ||
// //           "Unable to load import dashboard data."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchFilterOptions();
// //   }, []);

// //   useEffect(() => {
// //     fetchDashboardData(appliedFilters);
// //   }, [appliedFilters]);

// //   // ==========================================
// //   // FILTER HANDLERS
// //   // ==========================================

// //   const handleApplyFilters = () => {
// //     setAppliedFilters({
// //       search: searchQuery.trim(),
// //       hsCode: selectedHsCode,
// //       country: selectedCountry,
// //       supplier: selectedSupplier,
// //       importer: selectedImporter,
// //       month: selectedMonth,
// //       year: selectedYear,
// //     });
// //   };

// //   const handleResetFilters = () => {
// //     setSearchQuery("");
// //     setSelectedHsCode("All");
// //     setSelectedCountry("All Countries");
// //     setSelectedSupplier("All Suppliers");
// //     setSelectedImporter("All Importers");
// //     setSelectedMonth("All Months");
// //     setSelectedYear("All Years");

// //     setAppliedFilters({
// //       search: "",
// //       hsCode: "All",
// //       country: "All Countries",
// //       supplier: "All Suppliers",
// //       importer: "All Importers",
// //       month: "All Months",
// //       year: "All Years",
// //     });
// //   };

// //   // ==========================================
// //   // STATS
// //   // ==========================================

// //   const stats = [
// //     {
// //       title: "Total Import Shipments",
// //       value: formatNumber(dashboard.totalShipments),
// //       icon: Package,
// //       color: "text-blue-600",
// //       bg: "bg-blue-50",
// //     },
// //     {
// //       title: "Total Import Value",
// //       value: formatCr(dashboard.totalImportValue),
// //       icon: IndianRupee,
// //       color: "text-emerald-600",
// //       bg: "bg-emerald-50",
// //     },
// //     {
// //       title: "Total Importers",
// //       value: formatNumber(dashboard.totalImporters),
// //       icon: Users,
// //       color: "text-cyan-600",
// //       bg: "bg-cyan-50",
// //     },
// //     {
// //       title: "Total Suppliers",
// //       value: formatNumber(dashboard.totalSuppliers),
// //       icon: Truck,
// //       color: "text-violet-600",
// //       bg: "bg-violet-50",
// //     },
// //     {
// //       title: "Countries of Origin",
// //       value: formatNumber(dashboard.countries),
// //       icon: Globe,
// //       color: "text-indigo-600",
// //       bg: "bg-indigo-50",
// //     },
// //     {
// //       title: "Avg. Shipment Value",
// //       value: formatLakh(dashboard.avgShipmentValue),
// //       icon: IndianRupee,
// //       color: "text-orange-600",
// //       bg: "bg-orange-50",
// //     },
// //     // {
// //     //   title: "Avg. Lead Time",
// //     //   value: "N/A",
// //     //   icon: Clock3,
// //     //   color: "text-rose-600",
// //     //   bg: "bg-rose-50",
// //     // },
// //   ];

// //   const formatShipmentId = (ship, index) => {
// //     // Agar backend se proper shipment ID aa rahi hai
// //     if (ship?.shipmentId && /^SHP-\d+$/i.test(ship.shipmentId)) {
// //       return ship.shipmentId.toUpperCase();
// //     }

// //     // Fallback: readable ID
// //     return `SHP-${String(index + 1).padStart(5, "0")}`;
// //   };
// //   // ==========================================
// //   // CHART DATA
// //   // ==========================================

// //   const maxProductValue = Math.max(
// //     1,
// //     ...topProducts.map((item) => Number(item.value) || 0)
// //   );

// //   const products = topProducts.map((item) => ({
// //     hsCode: item._id?.hsCode || "-",
// //     desc: item._id?.product || "-",
// //     shipments: item.shipments || 0,
// //     value: Number(item.value) || 0,
// //     share: (
// //       ((Number(item.value) || 0) / maxProductValue) *
// //       100
// //     ).toFixed(0),
// //     barWidth: `${
// //       ((Number(item.value) || 0) / maxProductValue) * 100
// //     }%`,
// //   }));

// //   const lineData = importTrend.map((item) => {
// //     const dateValue = item._id || item.date;

// //     const date = dateValue
// //       ? new Date(dateValue).toLocaleDateString("en-GB", {
// //           day: "2-digit",
// //           month: "short",
// //         })
// //       : `${item.month || ""} ${item.year || ""}`;

// //     return {
// //       date,
// //       value: (Number(item.totalValue) || 0) / 10000000,
// //     };
// //   });

// //   const totalImportValue = importTrend.reduce(
// //     (sum, item) => sum + (Number(item.totalValue) || 0),
// //     0
// //   );

// //   const dynamicPieData = countryDistribution.map((item, index) => ({
// //     name: item.country || item._id || "Unknown",
// //     value: (Number(item.value) || 0) / 10000000,
// //     percent: `${Number(item.percentage) || 0}%`,
// //     color: PIE_COLORS[index % PIE_COLORS.length],
// //   }));

// //   const totalPieValue = dynamicPieData.reduce(
// //     (sum, item) => sum + item.value,
// //     0
// //   );

// //   // ==========================================
// //   // FILTER OPTIONS
// //   // ==========================================

// //   const hsCodeOptions = makeOptions(filterOptions.hsCodes || [], "All");
// //   const countryOptions = makeOptions(
// //     filterOptions.countries || [],
// //     "All Countries"
// //   );
// //   const supplierOptions = makeOptions(
// //     filterOptions.suppliers || [],
// //     "All Suppliers"
// //   );
// //   const importerOptions = makeOptions(
// //     filterOptions.importers || [],
// //     "All Importers"
// //   );
// //   const monthOptions = makeOptions(
// //     filterOptions.months || [],
// //     "All Months"
// //   );
// //   const yearOptions = makeOptions(
// //     (filterOptions.years || []).map(String),
// //     "All Years"
// //   );

// //   // ==========================================
// //   // EXPORT CSV
// //   // ==========================================

// //   const handleExportReport = () => {
// //     const headers = [
// //       "Shipment ID",
// //       "HS Code",
// //       "Product Description",
// //       "Supplier",
// //       "Importer",
// //       "Country",
// //       "Quantity",
// //       "Month",
// //       "Year",
// //       "Value (INR)",
// //     ];

// //     const rows = recentShipments.map((ship, index) => [
// //       formatShipmentId(ship, index),
// //       ship.hsCode,
// //       ship.productName,
// //       ship.supplier,
// //       ship.importer,
// //       ship.country,
// //       ship.quantity,
// //       ship.month,
// //       ship.year,
// //       ship.value,
// //     ]);

// //     const csvContent = [headers, ...rows]
// //       .map((row) =>
// //         row
// //           .map((value) =>
// //             `"${String(value ?? "").replace(/"/g, '""')}"`
// //           )
// //           .join(",")
// //       )
// //       .join("\n");

// //     const blob = new Blob(["\uFEFF" + csvContent], {
// //       type: "text/csv;charset=utf-8;",
// //     });

// //     const url = URL.createObjectURL(blob);
// //     const link = document.createElement("a");

// //     link.href = url;
// //     link.download = "import-intelligence-report.csv";
// //     link.click();

// //     URL.revokeObjectURL(url);
// //   };

// //   // ==========================================
// //   // UI
// //   // ==========================================

// //   return (
// //     <div className="min-h-screen bg-[#f5f7fb] px-3 pb-8 pt-16 font-sans text-slate-700 sm:px-5 lg:px-7">

// //       {/* HEADER */}
// //       <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#102d5c] via-[#17458a] to-[#2563eb] p-5 shadow-lg sm:p-7">
// //         <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />
// //         <div className="absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

// //         <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
// //           <div>
// //             <div className="mb-3 flex items-center gap-2">
// //               <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
// //                 Trade Analytics
// //               </span>
// //               <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200">
// //                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
// //                 Dashboard Overview
// //               </span>
// //             </div>

// //             <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
// //               Import Intelligence
// //             </h1>

// //             <p className="mt-2 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm">
// //               Explore import performance, discover leading products, analyze
// //               suppliers and understand global trade markets.
// //             </p>
// //           </div>

// //           <div className="flex flex-wrap items-center gap-2">
// //             <div className="flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm">
// //               <CalendarDays size={16} />
// //               All Import Records
// //             </div>

// //             <button
// //               onClick={handleExportReport}
// //               disabled={!recentShipments.length}
// //               className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
// //             >
// //               <Download size={16} />
// //               Export Report
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ERROR */}
// //       {error && (
// //         <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
// //           {error}
// //           <button onClick={() => fetchDashboardData(appliedFilters)}>
// //             <RefreshCw size={15} />
// //           </button>
// //         </div>
// //       )}

// //       {/* STATS */}
// //       <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
// //         {stats.map((item, index) => (
// //           <StatCard key={index} item={item} />
// //         ))}
// //       </div>

// //       {/* FILTER PANEL */}
// //       <div className="mb-6 overflow-visible rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //         <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
// //               <Filter size={17} />
// //             </div>
// //             <div>
// //               <h3 className="text-sm font-extrabold text-slate-800">
// //                 Search & Filters
// //               </h3>
// //               <p className="mt-0.5 text-[11px] text-slate-400">
// //                 Refine your import intelligence data
// //               </p>
// //             </div>
// //           </div>

// //           <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
// //             {loading ? "Updating data..." : "FILTER READY"}
// //           </span>
// //         </div>

// //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
// //           <div className="min-w-0">
// //             <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //               Search
// //             </label>
// //             <div className="relative">
// //               <Search
// //                 size={15}
// //                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
// //               />
// //               <input
// //                 type="text"
// //                 value={searchQuery}
// //                 onChange={(e) => setSearchQuery(e.target.value)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") handleApplyFilters();
// //                 }}
// //                 placeholder="HS Code or Product"
// //                 className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
// //               />
// //             </div>
// //           </div>

// //           {[
// //             {
// //               label: "HS Code",
// //               value: selectedHsCode,
// //               setter: setSelectedHsCode,
// //               options: hsCodeOptions,
// //               placeholder: "All",
// //             },
// //             {
// //               label: "Country",
// //               value: selectedCountry,
// //               setter: setSelectedCountry,
// //               options: countryOptions,
// //               placeholder: "All Countries",
// //             },
// //             {
// //               label: "Supplier",
// //               value: selectedSupplier,
// //               setter: setSelectedSupplier,
// //               options: supplierOptions,
// //               placeholder: "All Suppliers",
// //             },
// //             {
// //               label: "Importer",
// //               value: selectedImporter,
// //               setter: setSelectedImporter,
// //               options: importerOptions,
// //               placeholder: "All Importers",
// //             },
// //             {
// //               label: "Month",
// //               value: selectedMonth,
// //               setter: setSelectedMonth,
// //               options: monthOptions,
// //               placeholder: "All Months",
// //             },
// //             {
// //               label: "Year",
// //               value: selectedYear,
// //               setter: setSelectedYear,
// //               options: yearOptions,
// //               placeholder: "All Years",
// //             },
// //           ].map((filter) => (
// //             <div key={filter.label} className="min-w-0">
// //               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //                 {filter.label}
// //               </label>
// //               <SelectFilter
// //                 value={filter.value}
// //                 onChange={filter.setter}
// //                 options={filter.options}
// //                 placeholder={filter.placeholder}
// //               />
// //             </div>
// //           ))}
// //         </div>

// //         <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
// //           <button
// //             onClick={handleResetFilters}
// //             className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
// //           >
// //             <RefreshCw size={14} />
// //             Reset
// //           </button>

// //           <button
// //             onClick={handleApplyFilters}
// //             disabled={loading}
// //             className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
// //           >
// //             {loading ? (
// //               <Loader2 size={14} className="animate-spin" />
// //             ) : (
// //               <Filter size={14} />
// //             )}
// //             Apply Filters
// //           </button>
// //         </div>
// //       </div>

// //       {/* RECENT IMPORT RECORDS */}
// //       <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
// //         <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
// //           <SectionHeader
// //             icon={FileSpreadsheet}
// //             title="Recent Import Shipments"
// //             subtitle="Latest matching import records"
// //             right={
// //               <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
// //                 {formatNumber(recentShipments.length)} Records
// //               </span>
// //             }
// //           />
// //         </div>

// //         <div className="max-h-[470px] overflow-auto">
// //           <table className="min-w-[1050px] w-full border-collapse text-left">
// //             <thead className="sticky top-0 z-10 bg-slate-50">
// //               <tr className="border-b border-slate-200">
// //                 {[
// //                   "Shipment ID",
// //                   "HS Code",
// //                   "Product Description",
// //                   "Supplier",
// //                   "Importer",
// //                   "Country",
// //                   "Quantity",
// //                   "Month",
// //                   "Year",
// //                   "Value (INR)",
// //                 ].map((heading) => (
// //                   <th
// //                     key={heading}
// //                     className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
// //                   >
// //                     {heading}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>

// //             <tbody className="divide-y divide-slate-100">
// //               {recentShipments.length > 0 ? (
// //                 recentShipments.map((ship, index) => (
// //                   <tr
// //                     key={ship.shipmentId || index}
// //                     className="transition hover:bg-blue-50/40"
// //                   >
// //                    <td className="whitespace-nowrap px-4 py-3.5">
// //   <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-blue-700">
// //     {formatShipmentId(ship, index)}
// //   </span>
// // </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500">
// //                       {ship.hsCode || "-"}
// //                     </td>
// //                     <td className="max-w-[230px] truncate px-4 py-3.5 text-xs font-semibold text-slate-700">
// //                       {ship.productName || "-"}
// //                     </td>
// //                     <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
// //                       {ship.supplier || "-"}
// //                     </td>
// //                     <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
// //                       {ship.importer || "-"}
// //                     </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-slate-700">
// //                       <span className="flex items-center gap-1.5">
// //                         <MapPin size={12} className="text-slate-400" />
// //                         {ship.country || "-"}
// //                       </span>
// //                     </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-slate-600">
// //                       {formatNumber(ship.quantity)}
// //                     </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
// //                       {ship.month || "-"}
// //                     </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
// //                       {ship.year || "-"}
// //                     </td>
// //                     <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-extrabold text-slate-800">
// //                       {formatCr(ship.value)}
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td colSpan={10} className="px-4 py-8">
// //                     <EmptyState
// //                       text={
// //                         loading
// //                           ? "Loading import records..."
// //                           : "No matching import records found"
// //                       }
// //                     />
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3">
// //           <p className="text-[10px] font-medium text-slate-400">
// //             Showing latest {recentShipments.length} matching records
// //           </p>
// //           {loading && (
// //             <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
// //               <Loader2 size={12} className="animate-spin" />
// //               Updating
// //             </span>
// //           )}
// //         </div>
// //       </div>

// //       {/* ANALYTICS */}
// //       <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">

// //         {/* TOP PRODUCTS */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //           <SectionHeader
// //             icon={Boxes}
// //             title="Top Imported Products"
// //             subtitle="Highest value product categories"
// //             right={
// //               <span className="text-[10px] font-bold text-slate-400">
// //                 {products.length} Products
// //               </span>
// //             }
// //           />

// //           <div className="space-y-5">
// //             {products.length > 0 ? (
// //               products.slice(0, 5).map((prod, index) => (
// //                 <div key={`${prod.hsCode}-${index}`}>
// //                   <div className="mb-2 flex items-center justify-between gap-2">
// //                     <div className="min-w-0">
// //                       <p className="text-[10px] font-bold text-blue-600">
// //                         HS {prod.hsCode}
// //                       </p>
// //                       <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
// //                         {prod.desc}
// //                       </p>
// //                     </div>
// //                     <div className="shrink-0 text-right">
// //                       <p className="text-xs font-extrabold text-slate-800">
// //                         {formatCr(prod.value)}
// //                       </p>
// //                       <p className="mt-0.5 text-[10px] text-slate-400">
// //                         {prod.share}% of top value
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="h-2 overflow-hidden rounded-full bg-slate-100">
// //                     <div
// //                       className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
// //                       style={{ width: prod.barWidth }}
// //                     />
// //                   </div>
// //                 </div>
// //               ))
// //             ) : (
// //               <EmptyState text="No product data available" />
// //             )}
// //           </div>
// //         </div>

// //         {/* IMPORT TREND */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //           <SectionHeader
// //             icon={TrendingUp}
// //             title="Import Value Trend"
// //             subtitle="Import value movement over time"
// //             right={
// //               <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
// //                 Monthly
// //               </span>
// //             }
// //           />

// //           <div className="mb-4">
// //             <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
// //               Total Trend Value
// //             </p>
// //             <h3 className="mt-1 text-2xl font-extrabold text-slate-800">
// //               {formatCr(totalImportValue)}
// //             </h3>
// //           </div>

// //           <div className="h-[210px] w-full">
// //             {lineData.length > 0 ? (
// //               <ResponsiveContainer width="100%" height="100%">
// //                 <LineChart
// //                   data={lineData}
// //                   margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
// //                 >
// //                   <CartesianGrid
// //                     strokeDasharray="3 3"
// //                     vertical={false}
// //                     stroke="#e9eef5"
// //                   />
// //                   <XAxis
// //                     dataKey="date"
// //                     tick={{ fill: "#94a3b8", fontSize: 10 }}
// //                     tickLine={false}
// //                     axisLine={false}
// //                     dy={8}
// //                   />
// //                   <YAxis
// //                     tick={{ fill: "#94a3b8", fontSize: 10 }}
// //                     tickLine={false}
// //                     axisLine={false}
// //                     tickFormatter={(value) => `${value}Cr`}
// //                   />
// //                   <Tooltip content={<CustomTooltip />} />
// //                   <Line
// //                     type="monotone"
// //                     dataKey="value"
// //                     stroke="#2563eb"
// //                     strokeWidth={3}
// //                     dot={{
// //                       fill: "#2563eb",
// //                       stroke: "#fff",
// //                       strokeWidth: 2,
// //                       r: 4,
// //                     }}
// //                     activeDot={{ r: 6, strokeWidth: 0 }}
// //                   />
// //                 </LineChart>
// //               </ResponsiveContainer>
// //             ) : (
// //               <EmptyState text="No trend data available" />
// //             )}
// //           </div>
// //         </div>

// //         {/* COUNTRY DISTRIBUTION */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //           <SectionHeader
// //             icon={Globe}
// //             title="Imports by Country"
// //             subtitle="Country-wise import value distribution"
// //             right={
// //               <span className="text-[10px] font-bold text-slate-400">
// //                 {dynamicPieData.length} Countries
// //               </span>
// //             }
// //           />

// //           <div className="relative mx-auto h-[190px] w-full max-w-[230px]">
// //             {dynamicPieData.length > 0 ? (
// //               <>
// //                 <ResponsiveContainer width="100%" height="100%">
// //                   <PieChart>
// //                     <Pie
// //                       data={dynamicPieData}
// //                       innerRadius={58}
// //                       outerRadius={82}
// //                       paddingAngle={3}
// //                       dataKey="value"
// //                       stroke="none"
// //                     >
// //                       {dynamicPieData.map((item, index) => (
// //                         <Cell key={index} fill={item.color} />
// //                       ))}
// //                     </Pie>
// //                     <Tooltip
// //                       formatter={(value) => [
// //                         `₹${Number(value).toFixed(2)} Cr`,
// //                         "Import Value",
// //                       ]}
// //                     />
// //                   </PieChart>
// //                 </ResponsiveContainer>

// //                 <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
// //                   <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
// //                     Total Value
// //                   </span>
// //                   <span className="mt-1 text-sm font-extrabold text-slate-800">
// //                     ₹{totalPieValue.toFixed(2)} Cr
// //                   </span>
// //                 </div>
// //               </>
// //             ) : (
// //               <EmptyState text="No country data available" />
// //             )}
// //           </div>

// //           <div className="mt-4 max-h-[145px] space-y-2 overflow-y-auto border-t border-slate-100 pt-4">
// //             {dynamicPieData.slice(0, 8).map((country, index) => (
// //               <div
// //                 key={index}
// //                 className="flex items-center justify-between gap-2"
// //               >
// //                 <div className="flex min-w-0 items-center gap-2">
// //                   <span
// //                     className="h-2.5 w-2.5 shrink-0 rounded-full"
// //                     style={{ backgroundColor: country.color }}
// //                   />
// //                   <span className="truncate text-[11px] font-medium text-slate-600">
// //                     {country.name}
// //                   </span>
// //                 </div>
// //                 <span className="shrink-0 text-[10px] font-bold text-slate-700">
// //                   ₹{country.value.toFixed(2)} Cr
// //                 </span>
// //               </div>
// //             ))}
// //           </div>
// //         </div>
// //       </div>

// //       {/* SUPPLIERS & IMPORTERS */}
// //       <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

// //         {/* TOP SUPPLIERS */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //           <SectionHeader
// //             icon={Truck}
// //             title="Top Suppliers"
// //             subtitle="Leading suppliers by import value"
// //           />

// //           {topSuppliers.length > 0 ? (
// //             <div className="space-y-1">
// //               {topSuppliers.slice(0, 5).map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
// //                 >
// //                   <div className="flex min-w-0 items-center gap-3">
// //                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-blue-600">
// //                       {String(index + 1).padStart(2, "0")}
// //                     </div>

// //                     <div className="min-w-0">
// //                       <p className="truncate text-xs font-bold text-slate-700">
// //                         {item._id || item.name || "-"}
// //                       </p>
// //                       <p className="mt-1 text-[10px] text-slate-400">
// //                         {formatNumber(item.shipments)} Records
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="shrink-0 text-right">
// //                     <p className="text-xs font-extrabold text-slate-800">
// //                       {formatCr(item.value)}
// //                     </p>
// //                     <p className="mt-1 text-[9px] font-semibold text-emerald-600">
// //                       Import Value
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <EmptyState text="No supplier data available" />
// //           )}
// //         </div>

// //         {/* TOP IMPORTERS */}
// //         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
// //           <SectionHeader
// //             icon={Building2}
// //             title="Top Importers"
// //             subtitle="Leading importers by import value"
// //           />

// //           {topImporters.length > 0 ? (
// //             <div className="space-y-1">
// //               {topImporters.slice(0, 5).map((item, index) => (
// //                 <div
// //                   key={index}
// //                   className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
// //                 >
// //                   <div className="flex min-w-0 items-center gap-3">
// //                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-600">
// //                       {String(index + 1).padStart(2, "0")}
// //                     </div>

// //                     <div className="min-w-0">
// //                       <p className="truncate text-xs font-bold text-slate-700">
// //                         {item._id || item.name || "-"}
// //                       </p>
// //                       <p className="mt-1 text-[10px] text-slate-400">
// //                         {formatNumber(item.shipments)} Records
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="shrink-0 text-right">
// //                     <p className="text-xs font-extrabold text-slate-800">
// //                       {formatCr(item.value)}
// //                     </p>
// //                     <p className="mt-1 text-[9px] font-semibold text-emerald-600">
// //                       Import Value
// //                     </p>
// //                   </div>
// //                 </div>
// //               ))}
// //             </div>
// //           ) : (
// //             <EmptyState text="No importer data available" />
// //           )}
// //         </div>
// //       </div>

// //       {/* FOOTER */}
// //       <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
// //         <p className="text-[10px] font-medium text-slate-400">
// //           Import Intelligence Dashboard
// //         </p>
// //         <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
// //           <Database size={12} />
// //           Analytics based on uploaded import records
// //         </p>
// //       </div>
// //     </div>
// //   );
// // }

// import ReportActions from "../../components/ReportActions";

// import React, { useState, useEffect, useMemo, useRef } from "react";
// import {
//   getDashboard,
//   getFilterOptions,
//   getImportTrend,
//   getCountryDistribution,
//   getTopProducts,
//   getTopSuppliers,
//   getTopImporters,
//   getRecentShipments,
// } from "../../api/ImportIntelApi";

// import {
//   CalendarDays,
//   Download,
//   Package,
//   IndianRupee,
//   Users,
//   Truck,
//   Globe,
//   Clock3,
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
//   Building2,
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

// const PIE_COLORS = [
//   "#2563EB",
//   "#10B981",
//   "#8B5CF6",
//   "#F59E0B",
//   "#6366F1",
//   "#EC4899",
//   "#0EA5E9",
//   "#F97316",
// ];

// const formatCr = (value) =>
//   `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

// const formatNumber = (value) => (Number(value) || 0).toLocaleString("en-IN");

// const formatLakh = (value) =>
//   `₹${((Number(value) || 0) / 100000).toFixed(2)} L`;

// const getResponseData = (response) => response?.data?.data ?? [];

// const makeOptions = (items, defaultLabel) => [
//   { label: defaultLabel, value: defaultLabel },
//   ...items.map((item) => ({
//     label: String(item),
//     value: String(item),
//   })),
// ];

// const CustomTooltip = ({ active, payload, label }) => {
//   if (!active || !payload?.length) return null;

//   return (
//     <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
//       <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
//       <p className="text-sm font-bold text-slate-800">
//         ₹{Number(payload[0].value).toFixed(2)} Cr
//       </p>
//     </div>
//   );
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
//       String(item.label).toLowerCase().includes(search.toLowerCase()),
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
//       Math.min(250, openAbove ? spaceAbove - 12 : spaceBelow - 12),
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
//         <span className="truncate text-slate-700">{selectedLabel}</span>
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
//                 <Search size={13} className="shrink-0 text-slate-400" />
//                 <input
//                   autoFocus
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   placeholder="Search options..."
//                   className="w-full py-2 text-xs outline-none"
//                 />
//                 {search && (
//                   <button type="button" onClick={() => setSearch("")}>
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

// const StatCard = ({ item }) => {
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
//             {item.value}
//           </h3>

//           <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
//             <Database size={11} />
//             Filtered import data
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

// const SectionHeader = ({ icon: Icon, title, subtitle, right }) => (
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
//           <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>
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
//     <p className="text-xs font-semibold text-slate-500">{text}</p>
//   </div>
// );

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// export default function ImportIntelligence() {
//   const [dashboard, setDashboard] = useState({});
//   const [filterOptions, setFilterOptions] = useState({});
//   const [importTrend, setImportTrend] = useState([]);
//   const [countryDistribution, setCountryDistribution] = useState([]);
//   const [topProducts, setTopProducts] = useState([]);
//   const [topSuppliers, setTopSuppliers] = useState([]);
//   const [topImporters, setTopImporters] = useState([]);
//   const [recentShipments, setRecentShipments] = useState([]);

//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const [searchQuery, setSearchQuery] = useState("");
//   const [selectedHsCode, setSelectedHsCode] = useState("All");
//   const [selectedCountry, setSelectedCountry] = useState("All Countries");
//   const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
//   const [selectedImporter, setSelectedImporter] = useState("All Importers");
//   const [selectedMonth, setSelectedMonth] = useState("All Months");
//   const [selectedYear, setSelectedYear] = useState("All Years");

//   const [appliedFilters, setAppliedFilters] = useState({
//     search: "",
//     hsCode: "All",
//     country: "All Countries",
//     supplier: "All Suppliers",
//     importer: "All Importers",
//     month: "All Months",
//     year: "All Years",
//   });

//   // ==========================================
//   // API FETCHING
//   // ==========================================

//   const fetchFilterOptions = async () => {
//     try {
//       const res = await getFilterOptions();
//       setFilterOptions(getResponseData(res) || {});
//     } catch (err) {
//       console.error("Import filter options error:", err);
//     }
//   };

//   const fetchDashboardData = async (filters) => {
//     try {
//       setLoading(true);
//       setError("");

//       const [
//         dashboardRes,
//         trendRes,
//         countryRes,
//         productsRes,
//         suppliersRes,
//         importersRes,
//         shipmentsRes,
//       ] = await Promise.all([
//         getDashboard(filters),
//         getImportTrend(filters),
//         getCountryDistribution(filters),
//         getTopProducts(filters),
//         getTopSuppliers(filters),
//         getTopImporters(filters),
//         getRecentShipments(filters),
//       ]);

//       setDashboard(getResponseData(dashboardRes) || {});
//       setImportTrend(getResponseData(trendRes) || []);
//       setCountryDistribution(getResponseData(countryRes) || []);
//       setTopProducts(getResponseData(productsRes) || []);
//       setTopSuppliers(getResponseData(suppliersRes) || []);
//       setTopImporters(getResponseData(importersRes) || []);
//       setRecentShipments(getResponseData(shipmentsRes) || []);
//     } catch (err) {
//       console.error("Import dashboard error:", err);
//       setError(
//         err?.response?.data?.message || "Unable to load import dashboard data.",
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchFilterOptions();
//   }, []);

//   useEffect(() => {
//     fetchDashboardData(appliedFilters);
//   }, [appliedFilters]);

//   // ==========================================
//   // FILTER HANDLERS
//   // ==========================================

//   const handleApplyFilters = () => {
//     setAppliedFilters({
//       search: searchQuery.trim(),
//       hsCode: selectedHsCode,
//       country: selectedCountry,
//       supplier: selectedSupplier,
//       importer: selectedImporter,
//       month: selectedMonth,
//       year: selectedYear,
//     });
//   };

//   const handleResetFilters = () => {
//     setSearchQuery("");
//     setSelectedHsCode("All");
//     setSelectedCountry("All Countries");
//     setSelectedSupplier("All Suppliers");
//     setSelectedImporter("All Importers");
//     setSelectedMonth("All Months");
//     setSelectedYear("All Years");

//     setAppliedFilters({
//       search: "",
//       hsCode: "All",
//       country: "All Countries",
//       supplier: "All Suppliers",
//       importer: "All Importers",
//       month: "All Months",
//       year: "All Years",
//     });
//   };

//   // ==========================================
//   // STATS
//   // ==========================================

//   const stats = [
//     {
//       title: "Total Import Shipments",
//       value: formatNumber(dashboard.totalShipments),
//       icon: Package,
//       color: "text-blue-600",
//       bg: "bg-blue-50",
//     },
//     {
//       title: "Total Import Value",
//       value: formatCr(dashboard.totalImportValue),
//       icon: IndianRupee,
//       color: "text-emerald-600",
//       bg: "bg-emerald-50",
//     },
//     {
//       title: "Total Importers",
//       value: formatNumber(dashboard.totalImporters),
//       icon: Users,
//       color: "text-cyan-600",
//       bg: "bg-cyan-50",
//     },
//     {
//       title: "Total Suppliers",
//       value: formatNumber(dashboard.totalSuppliers),
//       icon: Truck,
//       color: "text-violet-600",
//       bg: "bg-violet-50",
//     },
//     {
//       title: "Countries of Origin",
//       value: formatNumber(dashboard.countries),
//       icon: Globe,
//       color: "text-indigo-600",
//       bg: "bg-indigo-50",
//     },
//     {
//       title: "Avg. Shipment Value",
//       value: formatLakh(dashboard.avgShipmentValue),
//       icon: IndianRupee,
//       color: "text-orange-600",
//       bg: "bg-orange-50",
//     },
//     // {
//     //   title: "Avg. Lead Time",
//     //   value: "N/A",
//     //   icon: Clock3,
//     //   color: "text-rose-600",
//     //   bg: "bg-rose-50",
//     // },
//   ];

//   const formatShipmentId = (ship, index) => {
//     // Agar backend se proper shipment ID aa rahi hai
//     if (ship?.shipmentId && /^SHP-\d+$/i.test(ship.shipmentId)) {
//       return ship.shipmentId.toUpperCase();
//     }

//     // Fallback: readable ID
//     return `SHP-${String(index + 1).padStart(5, "0")}`;
//   };
//   // ==========================================
//   // CHART DATA
//   // ==========================================

//   const maxProductValue = Math.max(
//     1,
//     ...topProducts.map((item) => Number(item.value) || 0),
//   );

//   const products = topProducts.map((item) => ({
//     hsCode: item._id?.hsCode || "-",
//     desc: item._id?.product || "-",
//     shipments: item.shipments || 0,
//     value: Number(item.value) || 0,
//     share: (((Number(item.value) || 0) / maxProductValue) * 100).toFixed(0),
//     barWidth: `${((Number(item.value) || 0) / maxProductValue) * 100}%`,
//   }));

//   const lineData = importTrend.map((item) => {
//     const dateValue = item._id || item.date;

//     const date = dateValue
//       ? new Date(dateValue).toLocaleDateString("en-GB", {
//           day: "2-digit",
//           month: "short",
//         })
//       : `${item.month || ""} ${item.year || ""}`;

//     return {
//       date,
//       value: (Number(item.totalValue) || 0) / 10000000,
//     };
//   });

//   const totalImportValue = importTrend.reduce(
//     (sum, item) => sum + (Number(item.totalValue) || 0),
//     0,
//   );

//   const dynamicPieData = countryDistribution.map((item, index) => ({
//     name: item.country || item._id || "Unknown",
//     value: (Number(item.value) || 0) / 10000000,
//     percent: `${Number(item.percentage) || 0}%`,
//     color: PIE_COLORS[index % PIE_COLORS.length],
//   }));

//   const totalPieValue = dynamicPieData.reduce(
//     (sum, item) => sum + item.value,
//     0,
//   );

//   // ==========================================
//   // FILTER OPTIONS
//   // ==========================================

//   const hsCodeOptions = makeOptions(filterOptions.hsCodes || [], "All");
//   const countryOptions = makeOptions(
//     filterOptions.countries || [],
//     "All Countries",
//   );
//   const supplierOptions = makeOptions(
//     filterOptions.suppliers || [],
//     "All Suppliers",
//   );
//   const importerOptions = makeOptions(
//     filterOptions.importers || [],
//     "All Importers",
//   );
//   const monthOptions = makeOptions(filterOptions.months || [], "All Months");
//   const yearOptions = makeOptions(
//     (filterOptions.years || []).map(String),
//     "All Years",
//   );

//   // ==========================================
//   // EXPORT CSV
//   // ==========================================

//   const handleExportReport = () => {
//     const headers = [
//       "Shipment ID",
//       "HS Code",
//       "Product Description",
//       "Supplier",
//       "Importer",
//       "Country",
//       "Quantity",
//       "Month",
//       "Year",
//       "Value (INR)",
//     ];

//     const rows = recentShipments.map((ship, index) => [
//       formatShipmentId(ship, index),
//       ship.hsCode,
//       ship.productName,
//       ship.supplier,
//       ship.importer,
//       ship.country,
//       ship.quantity,
//       ship.month,
//       ship.year,
//       ship.value,
//     ]);

//     const csvContent = [headers, ...rows]
//       .map((row) =>
//         row
//           .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
//           .join(","),
//       )
//       .join("\n");

//     const blob = new Blob(["\uFEFF" + csvContent], {
//       type: "text/csv;charset=utf-8;",
//     });

//     const url = URL.createObjectURL(blob);
//     const link = document.createElement("a");

//     link.href = url;
//     link.download = "import-intelligence-report.csv";
//     link.click();

//     URL.revokeObjectURL(url);
//   };

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="min-h-screen bg-[#f5f7fb] px-1 pb-8 pt-16 font-sans text-slate-700 sm:px-1 lg:px-1">
//       {/* HEADER */}
//       <div className="relative mb-6 overflow-hidden rounded-2xl bg-gradient-to-r from-[#102d5c] via-[#17458a] to-[#2563eb] p-5 shadow-lg sm:p-7">
//         <div className="absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/5" />
//         <div className="absolute -bottom-28 right-1/4 h-56 w-56 rounded-full bg-white/5 blur-2xl" />

//         <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
//           <div>
//             <div className="mb-3 flex items-center gap-2">
//               <span className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-blue-100">
//                 Trade Analytics
//               </span>
//               <span className="flex items-center gap-1.5 text-[10px] font-semibold text-emerald-200">
//                 <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
//                 Dashboard Overview
//               </span>
//             </div>

//             <h1 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//               Import Intelligence
//             </h1>

//             <p className="mt-2 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm">
//               Explore import performance, discover leading products, analyze
//               suppliers and understand global trade markets.
//             </p>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <div className="flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm">
//               <CalendarDays size={16} />
//               All Import Records
//             </div>

//             <button
//               onClick={handleExportReport}
//               disabled={!recentShipments.length}
//               className="flex h-11 items-center justify-center gap-2 rounded-xl bg-white px-4 text-xs font-bold text-blue-700 shadow-md transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-50"
//             >
//               <Download size={16} />
//               Export Report
//             </button>
//           </div>
//         </div>
//       </div>
//  <ReportActions module="Import Intelligence" result={(!loading && !error) ? ({dashboard,importTrend,countryDistribution,topProducts,topSuppliers,topImporters,recentShipments,appliedFilters}) : null} query={searchQuery} />
//       {/* ERROR */}
//       {error && (
//         <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
//           {error}
//           <button onClick={() => fetchDashboardData(appliedFilters)}>
//             <RefreshCw size={15} />
//           </button>
//         </div>
//       )}

//       {/* STATS */}
//       <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
//         {stats.map((item, index) => (
//           <StatCard key={index} item={item} />
//         ))}
//       </div>

//       {/* FILTER PANEL */}
//       <div className="mb-6 overflow-visible rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//         <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
//           <div className="flex items-center gap-3">
//             <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//               <Filter size={17} />
//             </div>
//             <div>
//               <h3 className="text-sm font-extrabold text-slate-800">
//                 Search & Filters
//               </h3>
//               <p className="mt-0.5 text-[11px] text-slate-400">
//                 Refine your import intelligence data
//               </p>
//             </div>
//           </div>

//           <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
//             {loading ? "Updating data..." : "FILTER READY"}
//           </span>
//         </div>

//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
//           <div className="min-w-0">
//             <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//               Search
//             </label>
//             <div className="relative">
//               <Search
//                 size={15}
//                 className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
//               />
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleApplyFilters();
//                 }}
//                 placeholder="HS Code or Product"
//                 className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
//               />
//             </div>
//           </div>

//           {[
//             {
//               label: "HS Code",
//               value: selectedHsCode,
//               setter: setSelectedHsCode,
//               options: hsCodeOptions,
//               placeholder: "All",
//             },
//             {
//               label: "Country",
//               value: selectedCountry,
//               setter: setSelectedCountry,
//               options: countryOptions,
//               placeholder: "All Countries",
//             },
//             {
//               label: "Supplier",
//               value: selectedSupplier,
//               setter: setSelectedSupplier,
//               options: supplierOptions,
//               placeholder: "All Suppliers",
//             },
//             {
//               label: "Importer",
//               value: selectedImporter,
//               setter: setSelectedImporter,
//               options: importerOptions,
//               placeholder: "All Importers",
//             },
//             {
//               label: "Month",
//               value: selectedMonth,
//               setter: setSelectedMonth,
//               options: monthOptions,
//               placeholder: "All Months",
//             },
//             {
//               label: "Year",
//               value: selectedYear,
//               setter: setSelectedYear,
//               options: yearOptions,
//               placeholder: "All Years",
//             },
//           ].map((filter) => (
//             <div key={filter.label} className="min-w-0">
//               <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
//                 {filter.label}
//               </label>
//               <SelectFilter
//                 value={filter.value}
//                 onChange={filter.setter}
//                 options={filter.options}
//                 placeholder={filter.placeholder}
//               />
//             </div>
//           ))}
//         </div>

//         <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
//           <button
//             onClick={handleResetFilters}
//             className="flex h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-bold text-slate-500 transition hover:bg-slate-50 hover:text-slate-700"
//           >
//             <RefreshCw size={14} />
//             Reset
//           </button>

//           <button
//             onClick={handleApplyFilters}
//             disabled={loading}
//             className="flex h-10 items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 text-xs font-bold text-white shadow-md shadow-blue-100 transition hover:bg-blue-700 disabled:opacity-60"
//           >
//             {loading ? (
//               <Loader2 size={14} className="animate-spin" />
//             ) : (
//               <Filter size={14} />
//             )}
//             Apply Filters
//           </button>
//         </div>
//       </div>

//       {/* RECENT IMPORT RECORDS */}
//       <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
//         <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
//           <SectionHeader
//             icon={FileSpreadsheet}
//             title="Recent Import Shipments"
//             subtitle="Latest matching import records"
//             right={
//               <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
//                 {formatNumber(recentShipments.length)} Records
//               </span>
//             }
//           />
//         </div>

//         <div className="max-h-[470px] overflow-auto">
//           <table className="min-w-[1050px] w-full border-collapse text-left">
//             <thead className="sticky top-0 z-10 bg-slate-50">
//               <tr className="border-b border-slate-200">
//                 {[
//                   "Shipment ID",
//                   "HS Code",
//                   "Product Description",
//                   "Supplier",
//                   "Importer",
//                   "Country",
//                   "Quantity",
//                   "Month",
//                   "Year",
//                   "Value (INR)",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="whitespace-nowrap px-4 py-3 text-[10px] font-extrabold uppercase tracking-wider text-slate-400"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {recentShipments.length > 0 ? (
//                 recentShipments.map((ship, index) => (
//                   <tr
//                     key={ship.shipmentId || index}
//                     className="transition hover:bg-blue-50/40"
//                   >
//                     <td className="whitespace-nowrap px-4 py-3.5">
//                       <span className="inline-flex items-center rounded-lg border border-blue-100 bg-blue-50 px-2.5 py-1 text-[11px] font-extrabold tracking-wide text-blue-700">
//                         {formatShipmentId(ship, index)}
//                       </span>
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500">
//                       {ship.hsCode || "-"}
//                     </td>
//                     <td className="max-w-[230px] truncate px-4 py-3.5 text-xs font-semibold text-slate-700">
//                       {ship.productName || "-"}
//                     </td>
//                     <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
//                       {ship.supplier || "-"}
//                     </td>
//                     <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
//                       {ship.importer || "-"}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-semibold text-slate-700">
//                       <span className="flex items-center gap-1.5">
//                         <MapPin size={12} className="text-slate-400" />
//                         {ship.country || "-"}
//                       </span>
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-xs font-medium text-slate-600">
//                       {formatNumber(ship.quantity)}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
//                       {ship.month || "-"}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
//                       {ship.year || "-"}
//                     </td>
//                     <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-extrabold text-slate-800">
//                       {formatCr(ship.value)}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan={10} className="px-4 py-8">
//                     <EmptyState
//                       text={
//                         loading
//                           ? "Loading import records..."
//                           : "No matching import records found"
//                       }
//                     />
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 bg-slate-50/50 px-4 py-3">
//           <p className="text-[10px] font-medium text-slate-400">
//             Showing latest {recentShipments.length} matching records
//           </p>
//           {loading && (
//             <span className="flex items-center gap-1.5 text-[10px] font-semibold text-blue-600">
//               <Loader2 size={12} className="animate-spin" />
//               Updating
//             </span>
//           )}
//         </div>
//       </div>

//       {/* ANALYTICS */}
//       <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
//         {/* TOP PRODUCTS */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <SectionHeader
//             icon={Boxes}
//             title="Top Imported Products"
//             subtitle="Highest value product categories"
//             right={
//               <span className="text-[10px] font-bold text-slate-400">
//                 {products.length} Products
//               </span>
//             }
//           />

//           <div className="space-y-5">
//             {products.length > 0 ? (
//               products.slice(0, 5).map((prod, index) => (
//                 <div key={`${prod.hsCode}-${index}`}>
//                   <div className="mb-2 flex items-center justify-between gap-2">
//                     <div className="min-w-0">
//                       <p className="text-[10px] font-bold text-blue-600">
//                         HS {prod.hsCode}
//                       </p>
//                       <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
//                         {prod.desc}
//                       </p>
//                     </div>
//                     <div className="shrink-0 text-right">
//                       <p className="text-xs font-extrabold text-slate-800">
//                         {formatCr(prod.value)}
//                       </p>
//                       <p className="mt-0.5 text-[10px] text-slate-400">
//                         {prod.share}% of top value
//                       </p>
//                     </div>
//                   </div>

//                   <div className="h-2 overflow-hidden rounded-full bg-slate-100">
//                     <div
//                       className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
//                       style={{ width: prod.barWidth }}
//                     />
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <EmptyState text="No product data available" />
//             )}
//           </div>
//         </div>

//         {/* IMPORT TREND */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <SectionHeader
//             icon={TrendingUp}
//             title="Import Value Trend"
//             subtitle="Import value movement over time"
//             right={
//               <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
//                 Monthly
//               </span>
//             }
//           />

//           <div className="mb-4">
//             <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
//               Total Trend Value
//             </p>
//             <h3 className="mt-1 text-2xl font-extrabold text-slate-800">
//               {formatCr(totalImportValue)}
//             </h3>
//           </div>

//           <div className="h-[210px] w-full">
//             {lineData.length > 0 ? (
//               <ResponsiveContainer width="100%" height="100%">
//                 <LineChart
//                   data={lineData}
//                   margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
//                 >
//                   <CartesianGrid
//                     strokeDasharray="3 3"
//                     vertical={false}
//                     stroke="#e9eef5"
//                   />
//                   <XAxis
//                     dataKey="date"
//                     tick={{ fill: "#94a3b8", fontSize: 10 }}
//                     tickLine={false}
//                     axisLine={false}
//                     dy={8}
//                   />
//                   <YAxis
//                     tick={{ fill: "#94a3b8", fontSize: 10 }}
//                     tickLine={false}
//                     axisLine={false}
//                     tickFormatter={(value) => `${value}Cr`}
//                   />
//                   <Tooltip content={<CustomTooltip />} />
//                   <Line
//                     type="monotone"
//                     dataKey="value"
//                     stroke="#2563eb"
//                     strokeWidth={3}
//                     dot={{
//                       fill: "#2563eb",
//                       stroke: "#fff",
//                       strokeWidth: 2,
//                       r: 4,
//                     }}
//                     activeDot={{ r: 6, strokeWidth: 0 }}
//                   />
//                 </LineChart>
//               </ResponsiveContainer>
//             ) : (
//               <EmptyState text="No trend data available" />
//             )}
//           </div>
//         </div>

//         {/* COUNTRY DISTRIBUTION */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <SectionHeader
//             icon={Globe}
//             title="Imports by Country"
//             subtitle="Country-wise import value distribution"
//             right={
//               <span className="text-[10px] font-bold text-slate-400">
//                 {dynamicPieData.length} Countries
//               </span>
//             }
//           />

//           <div className="relative mx-auto h-[190px] w-full max-w-[230px]">
//             {dynamicPieData.length > 0 ? (
//               <>
//                 <ResponsiveContainer width="100%" height="100%">
//                   <PieChart>
//                     <Pie
//                       data={dynamicPieData}
//                       innerRadius={58}
//                       outerRadius={82}
//                       paddingAngle={3}
//                       dataKey="value"
//                       stroke="none"
//                     >
//                       {dynamicPieData.map((item, index) => (
//                         <Cell key={index} fill={item.color} />
//                       ))}
//                     </Pie>
//                     <Tooltip
//                       formatter={(value) => [
//                         `₹${Number(value).toFixed(2)} Cr`,
//                         "Import Value",
//                       ]}
//                     />
//                   </PieChart>
//                 </ResponsiveContainer>

//                 <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
//                   <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
//                     Total Value
//                   </span>
//                   <span className="mt-1 text-sm font-extrabold text-slate-800">
//                     ₹{totalPieValue.toFixed(2)} Cr
//                   </span>
//                 </div>
//               </>
//             ) : (
//               <EmptyState text="No country data available" />
//             )}
//           </div>

//           <div className="mt-4 max-h-[145px] space-y-2 overflow-y-auto border-t border-slate-100 pt-4">
//             {dynamicPieData.slice(0, 8).map((country, index) => (
//               <div
//                 key={index}
//                 className="flex items-center justify-between gap-2"
//               >
//                 <div className="flex min-w-0 items-center gap-2">
//                   <span
//                     className="h-2.5 w-2.5 shrink-0 rounded-full"
//                     style={{ backgroundColor: country.color }}
//                   />
//                   <span className="truncate text-[11px] font-medium text-slate-600">
//                     {country.name}
//                   </span>
//                 </div>
//                 <span className="shrink-0 text-[10px] font-bold text-slate-700">
//                   ₹{country.value.toFixed(2)} Cr
//                 </span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* SUPPLIERS & IMPORTERS */}
//       <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
//         {/* TOP SUPPLIERS */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <SectionHeader
//             icon={Truck}
//             title="Top Suppliers"
//             subtitle="Leading suppliers by import value"
//           />

//           {topSuppliers.length > 0 ? (
//             <div className="space-y-1">
//               {topSuppliers.slice(0, 5).map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
//                 >
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-blue-600">
//                       {String(index + 1).padStart(2, "0")}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-bold text-slate-700">
//                         {item._id || item.name || "-"}
//                       </p>
//                       <p className="mt-1 text-[10px] text-slate-400">
//                         {formatNumber(item.shipments)} Records
//                       </p>
//                     </div>
//                   </div>

//                   <div className="shrink-0 text-right">
//                     <p className="text-xs font-extrabold text-slate-800">
//                       {formatCr(item.value)}
//                     </p>
//                     <p className="mt-1 text-[9px] font-semibold text-emerald-600">
//                       Import Value
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <EmptyState text="No supplier data available" />
//           )}
//         </div>

//         {/* TOP IMPORTERS */}
//         <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
//           <SectionHeader
//             icon={Building2}
//             title="Top Importers"
//             subtitle="Leading importers by import value"
//           />

//           {topImporters.length > 0 ? (
//             <div className="space-y-1">
//               {topImporters.slice(0, 5).map((item, index) => (
//                 <div
//                   key={index}
//                   className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
//                 >
//                   <div className="flex min-w-0 items-center gap-3">
//                     <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-600">
//                       {String(index + 1).padStart(2, "0")}
//                     </div>

//                     <div className="min-w-0">
//                       <p className="truncate text-xs font-bold text-slate-700">
//                         {item._id || item.name || "-"}
//                       </p>
//                       <p className="mt-1 text-[10px] text-slate-400">
//                         {formatNumber(item.shipments)} Records
//                       </p>
//                     </div>
//                   </div>

//                   <div className="shrink-0 text-right">
//                     <p className="text-xs font-extrabold text-slate-800">
//                       {formatCr(item.value)}
//                     </p>
//                     <p className="mt-1 text-[9px] font-semibold text-emerald-600">
//                       Import Value
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <EmptyState text="No importer data available" />
//           )}
//         </div>
//       </div>

//       {/* FOOTER */}
//       <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
//         <p className="text-[10px] font-medium text-slate-400">
//           Import Intelligence Dashboard
//         </p>
//         <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
//           <Database size={12} />
//           Analytics based on uploaded import records
//         </p>
//       </div>
//     </div>
//   );
// }


import ReportActions from "../../components/ReportActions";

import React, { useState, useEffect, useMemo, useRef } from "react";
import {
  getDashboard,
  getFilterOptions,
  getImportTrend,
  getCountryDistribution,
  getTopProducts,
  getTopSuppliers,
  getTopImporters,
  getRecentShipments,
} from "../../api/ImportIntelApi";

import {
  CalendarDays,
  Download,
  Package,
  IndianRupee,
  Users,
  Truck,
  Globe,
  Clock3,
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
  Building2,
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

const PIE_COLORS = [
  "#2563EB",
  "#10B981",
  "#8B5CF6",
  "#F59E0B",
  "#6366F1",
  "#EC4899",
  "#0EA5E9",
  "#F97316",
];

const formatCr = (value) =>
  `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

const formatNumber = (value) => (Number(value) || 0).toLocaleString("en-IN");

const formatLakh = (value) =>
  `₹${((Number(value) || 0) / 100000).toFixed(2)} L`;

const getResponseData = (response) => response?.data?.data ?? [];

const makeOptions = (items, defaultLabel) => [
  { label: defaultLabel, value: defaultLabel },
  ...items.map((item) => ({
    label: String(item),
    value: String(item),
  })),
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-xl">
      <p className="mb-1 text-xs font-semibold text-slate-500">{label}</p>
      <p className="text-sm font-bold text-slate-800">
        ₹{Number(payload[0].value).toFixed(2)} Cr
      </p>
    </div>
  );
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
      String(item.label).toLowerCase().includes(search.toLowerCase()),
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
      Math.min(250, openAbove ? spaceAbove - 12 : spaceBelow - 12),
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
        <span className="truncate text-slate-700">{selectedLabel}</span>
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
                <Search size={13} className="shrink-0 text-slate-400" />
                <input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search options..."
                  className="w-full py-2 text-xs outline-none"
                />
                {search && (
                  <button type="button" onClick={() => setSearch("")}>
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

const StatCard = ({ item }) => {
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
            {item.value}
          </h3>

          <p className="mt-2 flex items-center gap-1 text-[10px] font-medium text-slate-400">
            <Database size={11} />
            Filtered import data
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

const SectionHeader = ({ icon: Icon, title, subtitle, right }) => (
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
          <p className="mt-0.5 text-[11px] text-slate-400">{subtitle}</p>
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
    <p className="text-xs font-semibold text-slate-500">{text}</p>
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ImportIntelligence() {
  const [dashboard, setDashboard] = useState({});
  const [filterOptions, setFilterOptions] = useState({});
  const [importTrend, setImportTrend] = useState([]);
  const [countryDistribution, setCountryDistribution] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [topSuppliers, setTopSuppliers] = useState([]);
  const [topImporters, setTopImporters] = useState([]);
  const [recentShipments, setRecentShipments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHsCode, setSelectedHsCode] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [selectedSupplier, setSelectedSupplier] = useState("All Suppliers");
  const [selectedImporter, setSelectedImporter] = useState("All Importers");
  const [selectedMonth, setSelectedMonth] = useState("All Months");
  const [selectedYear, setSelectedYear] = useState("All Years");

  const [appliedFilters, setAppliedFilters] = useState({
    search: "",
    hsCode: "All",
    country: "All Countries",
    supplier: "All Suppliers",
    importer: "All Importers",
    month: "All Months",
    year: "All Years",
  });

  // ==========================================
  // API FETCHING
  // ==========================================

  const fetchFilterOptions = async () => {
    try {
      const res = await getFilterOptions();
      setFilterOptions(getResponseData(res) || {});
    } catch (err) {
      console.error("Import filter options error:", err);
    }
  };

  const fetchDashboardData = async (filters) => {
    try {
      setLoading(true);
      setError("");

      const [
        dashboardRes,
        trendRes,
        countryRes,
        productsRes,
        suppliersRes,
        importersRes,
        shipmentsRes,
      ] = await Promise.all([
        getDashboard(filters),
        getImportTrend(filters),
        getCountryDistribution(filters),
        getTopProducts(filters),
        getTopSuppliers(filters),
        getTopImporters(filters),
        getRecentShipments(filters),
      ]);

      setDashboard(getResponseData(dashboardRes) || {});
      setImportTrend(getResponseData(trendRes) || []);
      setCountryDistribution(getResponseData(countryRes) || []);
      setTopProducts(getResponseData(productsRes) || []);
      setTopSuppliers(getResponseData(suppliersRes) || []);
      setTopImporters(getResponseData(importersRes) || []);
      setRecentShipments(getResponseData(shipmentsRes) || []);
    } catch (err) {
      console.error("Import dashboard error:", err);
      setError(
        err?.response?.data?.message || "Unable to load import dashboard data.",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFilterOptions();
  }, []);

  useEffect(() => {
    fetchDashboardData(appliedFilters);
  }, [appliedFilters]);

  // ==========================================
  // FILTER HANDLERS
  // ==========================================

  const handleApplyFilters = () => {
    setAppliedFilters({
      search: searchQuery.trim(),
      hsCode: selectedHsCode,
      country: selectedCountry,
      supplier: selectedSupplier,
      importer: selectedImporter,
      month: selectedMonth,
      year: selectedYear,
    });
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setSelectedHsCode("All");
    setSelectedCountry("All Countries");
    setSelectedSupplier("All Suppliers");
    setSelectedImporter("All Importers");
    setSelectedMonth("All Months");
    setSelectedYear("All Years");

    setAppliedFilters({
      search: "",
      hsCode: "All",
      country: "All Countries",
      supplier: "All Suppliers",
      importer: "All Importers",
      month: "All Months",
      year: "All Years",
    });
  };

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      title: "Total Import Shipments",
      value: formatNumber(dashboard.totalShipments),
      icon: Package,
      color: "text-blue-600",
      bg: "bg-blue-50",
    },
    {
      title: "Total Import Value",
      value: formatCr(dashboard.totalImportValue),
      icon: IndianRupee,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      title: "Total Importers",
      value: formatNumber(dashboard.totalImporters),
      icon: Users,
      color: "text-cyan-600",
      bg: "bg-cyan-50",
    },
    {
      title: "Total Suppliers",
      value: formatNumber(dashboard.totalSuppliers),
      icon: Truck,
      color: "text-violet-600",
      bg: "bg-violet-50",
    },
    {
      title: "Countries of Origin",
      value: formatNumber(dashboard.countries),
      icon: Globe,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
    {
      title: "Avg. Shipment Value",
      value: formatLakh(dashboard.avgShipmentValue),
      icon: IndianRupee,
      color: "text-orange-600",
      bg: "bg-orange-50",
    },
    // {
    //   title: "Avg. Lead Time",
    //   value: "N/A",
    //   icon: Clock3,
    //   color: "text-rose-600",
    //   bg: "bg-rose-50",
    // },
  ];

  const formatShipmentId = (ship, index) => {
    // Agar backend se proper shipment ID aa rahi hai
    if (ship?.shipmentId && /^SHP-\d+$/i.test(ship.shipmentId)) {
      return ship.shipmentId.toUpperCase();
    }

    // Fallback: readable ID
    return `SHP-${String(index + 1).padStart(5, "0")}`;
  };
  // ==========================================
  // CHART DATA
  // ==========================================

  const maxProductValue = Math.max(
    1,
    ...topProducts.map((item) => Number(item.value) || 0),
  );

  const products = topProducts.map((item) => ({
    hsCode: item._id?.hsCode || "-",
    desc: item._id?.product || "-",
    shipments: item.shipments || 0,
    value: Number(item.value) || 0,
    share: (((Number(item.value) || 0) / maxProductValue) * 100).toFixed(0),
    barWidth: `${((Number(item.value) || 0) / maxProductValue) * 100}%`,
  }));

  const lineData = importTrend.map((item) => {
    const dateValue = item._id || item.date;

    const date = dateValue
      ? new Date(dateValue).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
        })
      : `${item.month || ""} ${item.year || ""}`;

    return {
      date,
      value: (Number(item.totalValue) || 0) / 10000000,
    };
  });

  const totalImportValue = importTrend.reduce(
    (sum, item) => sum + (Number(item.totalValue) || 0),
    0,
  );

  const dynamicPieData = countryDistribution.map((item, index) => ({
    name: item.country || item._id || "Unknown",
    value: (Number(item.value) || 0) / 10000000,
    percent: `${Number(item.percentage) || 0}%`,
    color: PIE_COLORS[index % PIE_COLORS.length],
  }));

  const totalPieValue = dynamicPieData.reduce(
    (sum, item) => sum + item.value,
    0,
  );

  // ==========================================
  // FILTER OPTIONS
  // ==========================================

  const hsCodeOptions = makeOptions(filterOptions.hsCodes || [], "All");
  const countryOptions = makeOptions(
    filterOptions.countries || [],
    "All Countries",
  );
  const supplierOptions = makeOptions(
    filterOptions.suppliers || [],
    "All Suppliers",
  );
  const importerOptions = makeOptions(
    filterOptions.importers || [],
    "All Importers",
  );
  const monthOptions = makeOptions(filterOptions.months || [], "All Months");
  const yearOptions = makeOptions(
    (filterOptions.years || []).map(String),
    "All Years",
  );

  // ==========================================
  // EXPORT CSV
  // ==========================================

  const handleExportReport = () => {
    const headers = [
      
      "HS Code",
      "Product Description",
      "Supplier",
      "Importer",
      "Country",
      "Quantity",
      "Month",
      "Year",
      "Value (INR)",
    ];

    const rows = recentShipments.map((ship, index) => [
      
      ship.hsCode,
      ship.productName,
      ship.supplier,
      ship.importer,
      ship.country,
      ship.quantity,
      ship.month,
      ship.year,
      ship.value,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "import-intelligence-report.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-[#f5f7fb] px-1 pb-8 pt-16 font-sans text-slate-700 sm:px-1 lg:px-1">
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
              Import Intelligence
            </h1>

            <p className="mt-2 max-w-xl text-xs leading-6 text-blue-100 sm:text-sm">
              Explore import performance, discover leading products, analyze
              suppliers and understand global trade markets.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex h-11 items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-4 text-xs font-semibold text-white backdrop-blur-sm">
              <CalendarDays size={16} />
              All Import Records
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
 <ReportActions module="Import Intelligence" result={(!loading && !error) ? ({dashboard,importTrend,countryDistribution,topProducts,topSuppliers,topImporters,recentShipments,appliedFilters}) : null} query={searchQuery} />
      {/* ERROR */}
      {error && (
        <div className="mb-5 flex items-center justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-600">
          {error}
          <button onClick={() => fetchDashboardData(appliedFilters)}>
            <RefreshCw size={15} />
          </button>
        </div>
      )}

      {/* STATS */}
      <div className="mb-6 grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-7">
        {stats.map((item, index) => (
          <StatCard key={index} item={item} />
        ))}
      </div>

      {/* FILTER PANEL */}
      <div className="mb-6 overflow-visible rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <Filter size={17} />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Search & Filters
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Refine your import intelligence data
              </p>
            </div>
          </div>

          <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
            {loading ? "Updating data..." : "FILTER READY"}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-7">
          <div className="min-w-0">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Search
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
                placeholder="HS Code or Product"
                className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-xs outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-50"
              />
            </div>
          </div>

          {[
            {
              label: "HS Code",
              value: selectedHsCode,
              setter: setSelectedHsCode,
              options: hsCodeOptions,
              placeholder: "All",
            },
            {
              label: "Country",
              value: selectedCountry,
              setter: setSelectedCountry,
              options: countryOptions,
              placeholder: "All Countries",
            },
            {
              label: "Supplier",
              value: selectedSupplier,
              setter: setSelectedSupplier,
              options: supplierOptions,
              placeholder: "All Suppliers",
            },
            {
              label: "Importer",
              value: selectedImporter,
              setter: setSelectedImporter,
              options: importerOptions,
              placeholder: "All Importers",
            },
            {
              label: "Month",
              value: selectedMonth,
              setter: setSelectedMonth,
              options: monthOptions,
              placeholder: "All Months",
            },
            {
              label: "Year",
              value: selectedYear,
              setter: setSelectedYear,
              options: yearOptions,
              placeholder: "All Years",
            },
          ].map((filter) => (
            <div key={filter.label} className="min-w-0">
              <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                {filter.label}
              </label>
              <SelectFilter
                value={filter.value}
                onChange={filter.setter}
                options={filter.options}
                placeholder={filter.placeholder}
              />
            </div>
          ))}
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-end gap-2 border-t border-slate-100 pt-4">
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

      {/* RECENT IMPORT RECORDS */}
      <div className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-4 sm:p-5">
          <SectionHeader
            icon={FileSpreadsheet}
            title="Recent Import Shipments"
            subtitle="Latest matching import records"
            right={
              <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
                {formatNumber(recentShipments.length)} Records
              </span>
            }
          />
        </div>

        <div className="max-h-[470px] overflow-auto">
          <table className="min-w-[1050px] w-full border-collapse text-left">
          <thead className="sticky top-0 z-10 bg-slate-50">
  <tr className="border-b border-slate-200">
    {[
      "HS Code",
      "Product Description",
      "Supplier",
      "Importer",
      "Country",
      "Quantity",
      "Month",
      "Year",
      "Value (INR)",
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
        key={ship.shipmentId || index}
        className="transition hover:bg-blue-50/40"
      >
        <td className="whitespace-nowrap px-4 py-3.5 text-xs font-bold text-slate-500">
          {ship.hsCode || "-"}
        </td>

        <td className="max-w-[230px] truncate px-4 py-3.5 text-xs font-semibold text-slate-700">
          {ship.productName || "-"}
        </td>

        <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
          {ship.supplier || "-"}
        </td>

        <td className="max-w-[170px] truncate px-4 py-3.5 text-xs text-slate-500">
          {ship.importer || "-"}
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

        <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
          {ship.month || "-"}
        </td>

        <td className="whitespace-nowrap px-4 py-3.5 text-xs text-slate-500">
          {ship.year || "-"}
        </td>

        <td className="whitespace-nowrap px-4 py-3.5 text-right text-xs font-extrabold text-slate-800">
          {formatCr(ship.value)}
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan={9} className="px-4 py-8">
        <EmptyState
          text={
            loading
              ? "Loading import records..."
              : "No matching import records found"
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

      {/* ANALYTICS */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-3">
        {/* TOP PRODUCTS */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            icon={Boxes}
            title="Top Imported Products"
            subtitle="Highest value product categories"
            right={
              <span className="text-[10px] font-bold text-slate-400">
                {products.length} Products
              </span>
            }
          />

          <div className="space-y-5">
            {products.length > 0 ? (
              products.slice(0, 5).map((prod, index) => (
                <div key={`${prod.hsCode}-${index}`}>
                  <div className="mb-2 flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-[10px] font-bold text-blue-600">
                        HS {prod.hsCode}
                      </p>
                      <p className="mt-0.5 truncate text-xs font-semibold text-slate-700">
                        {prod.desc}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-extrabold text-slate-800">
                        {formatCr(prod.value)}
                      </p>
                      <p className="mt-0.5 text-[10px] text-slate-400">
                        {prod.share}% of top value
                      </p>
                    </div>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-500"
                      style={{ width: prod.barWidth }}
                    />
                  </div>
                </div>
              ))
            ) : (
              <EmptyState text="No product data available" />
            )}
          </div>
        </div>

        {/* IMPORT TREND */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            icon={TrendingUp}
            title="Import Value Trend"
            subtitle="Import value movement over time"
            right={
              <span className="rounded-lg bg-emerald-50 px-2.5 py-1 text-[10px] font-bold text-emerald-700">
                Monthly
              </span>
            }
          />

          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Trend Value
            </p>
            <h3 className="mt-1 text-2xl font-extrabold text-slate-800">
              {formatCr(totalImportValue)}
            </h3>
          </div>

          <div className="h-[210px] w-full">
            {lineData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={lineData}
                  margin={{ top: 8, right: 8, left: -18, bottom: 0 }}
                >
                  <CartesianGrid
                    strokeDasharray="3 3"
                    vertical={false}
                    stroke="#e9eef5"
                  />
                  <XAxis
                    dataKey="date"
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    dy={8}
                  />
                  <YAxis
                    tick={{ fill: "#94a3b8", fontSize: 10 }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `${value}Cr`}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#2563eb"
                    strokeWidth={3}
                    dot={{
                      fill: "#2563eb",
                      stroke: "#fff",
                      strokeWidth: 2,
                      r: 4,
                    }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState text="No trend data available" />
            )}
          </div>
        </div>

        {/* COUNTRY DISTRIBUTION */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            icon={Globe}
            title="Imports by Country"
            subtitle="Country-wise import value distribution"
            right={
              <span className="text-[10px] font-bold text-slate-400">
                {dynamicPieData.length} Countries
              </span>
            }
          />

          <div className="relative mx-auto h-[190px] w-full max-w-[230px]">
            {dynamicPieData.length > 0 ? (
              <>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={dynamicPieData}
                      innerRadius={58}
                      outerRadius={82}
                      paddingAngle={3}
                      dataKey="value"
                      stroke="none"
                    >
                      {dynamicPieData.map((item, index) => (
                        <Cell key={index} fill={item.color} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value) => [
                        `₹${Number(value).toFixed(2)} Cr`,
                        "Import Value",
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
                    Total Value
                  </span>
                  <span className="mt-1 text-sm font-extrabold text-slate-800">
                    ₹{totalPieValue.toFixed(2)} Cr
                  </span>
                </div>
              </>
            ) : (
              <EmptyState text="No country data available" />
            )}
          </div>

          <div className="mt-4 max-h-[145px] space-y-2 overflow-y-auto border-t border-slate-100 pt-4">
            {dynamicPieData.slice(0, 8).map((country, index) => (
              <div
                key={index}
                className="flex items-center justify-between gap-2"
              >
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: country.color }}
                  />
                  <span className="truncate text-[11px] font-medium text-slate-600">
                    {country.name}
                  </span>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-slate-700">
                  ₹{country.value.toFixed(2)} Cr
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* SUPPLIERS & IMPORTERS */}
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {/* TOP SUPPLIERS */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            icon={Truck}
            title="Top Suppliers"
            subtitle="Leading suppliers by import value"
          />

          {topSuppliers.length > 0 ? (
            <div className="space-y-1">
              {topSuppliers.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-xs font-extrabold text-blue-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-700">
                        {item._id || item.name || "-"}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {formatNumber(item.shipments)} Records
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-extrabold text-slate-800">
                      {formatCr(item.value)}
                    </p>
                    <p className="mt-1 text-[9px] font-semibold text-emerald-600">
                      Import Value
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No supplier data available" />
          )}
        </div>

        {/* TOP IMPORTERS */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm sm:p-5">
          <SectionHeader
            icon={Building2}
            title="Top Importers"
            subtitle="Leading importers by import value"
          />

          {topImporters.length > 0 ? (
            <div className="space-y-1">
              {topImporters.slice(0, 5).map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-violet-50 text-xs font-extrabold text-violet-600">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-slate-700">
                        {item._id || item.name || "-"}
                      </p>
                      <p className="mt-1 text-[10px] text-slate-400">
                        {formatNumber(item.shipments)} Records
                      </p>
                    </div>
                  </div>

                  <div className="shrink-0 text-right">
                    <p className="text-xs font-extrabold text-slate-800">
                      {formatCr(item.value)}
                    </p>
                    <p className="mt-1 text-[9px] font-semibold text-emerald-600">
                      Import Value
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState text="No importer data available" />
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-4">
        <p className="text-[10px] font-medium text-slate-400">
          Import Intelligence Dashboard
        </p>
        <p className="flex items-center gap-1.5 text-[10px] font-medium text-slate-400">
          <Database size={12} />
          Analytics based on uploaded import records
        </p>
      </div>
    </div>
  );
}