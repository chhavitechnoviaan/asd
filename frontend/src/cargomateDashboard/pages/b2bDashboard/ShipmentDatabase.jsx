// // // import React, { useState, useMemo, useEffect } from "react";
// // // import {
// // //   getDashboard,
// // //   getFilterOptions,
// // //   getShipments,
// // //   exportReport
// // // } from '../../api/ShipmentDatabaseApi';
// // // import DatePicker from "react-datepicker";
// // // import "react-datepicker/dist/react-datepicker.css";
// // // import ExportReport from "../../components/b2bComponent/ExportReport";
// // // import {
// // //   Calendar,  CalendarDays,
// // //   ChevronDown,
// // //   List,
// // //   Clock,
// // //   ChevronLeft,
// // //   ChevronRight,
// // //   TrendingUp,
// // //   TrendingDown,
// // //   HelpCircle,
// // //   Columns,
// // //   Filter,
// // //   RotateCcw,
// // //   Search,
// // //   SlidersHorizontal,
// // //   FileSpreadsheet,
// // //   LayoutGrid,
// // //   Download
// // // } from "lucide-react";
// // // import ReactCountryFlag from "react-country-flag";
// // // const countryCodes = {
// // //   India: "IN",
// // //   China: "CN",
// // //   Germany: "DE",
// // //   USA: "US",
// // //   "United States": "US",
// // //   UAE: "AE",
// // //   "Saudi Arabia": "SA",
// // //   Switzerland: "CH",
// // //   Bangladesh: "BD",
// // //   Brazil: "BR",
// // //   Russia: "RU",
// // //   Japan: "JP",
// // //   France: "FR",
// // //   Singapore: "SG",
// // //   Australia: "AU",
// // // };
// // // const HEADING = "text-[#07156B]";

// // // export default function ShipmentDatabase() {
// // //   // Static Raw Data
// // //   /*const rawShipmentsData = [
// // //     {
// // //       id: "SHP-2025-1045",
// // //       hs: "85",
// // //       desc: "Electrical Machinery & Equipment",
// // //       importer: "ABCImports Pvt. Ltd.",
// // //       exporter: "Global Exports Inc.",
// // //       origin: "China",
// // //       originCode: "CN",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Shenzhen",
// // //       discharge: "Nhava Sheva",
// // //       shipDate: "24 Apr 2025",
// // //       arrDate: "28 Apr 2025",
// // //       value: 45.6,
// // //       status: "Delivered",
// // //     },
// // //     {
// // //       id: "SHP-2025-1044",
// // //       hs: "84",
// // //       desc: "Machinery & Mechanical Appliances",
// // //       importer: "Global Retail Ltd.",
// // //       exporter: "Techno Trade Co.",
// // //       origin: "Germany",
// // //       originCode: "DE",
// // //       dest: "UAE",
// // //       destCode: "AE",
// // //       loading: "Hamburg",
// // //       discharge: "Jebel Ali",
// // //       shipDate: "23 Apr 2025",
// // //       arrDate: "27 Apr 2025",
// // //       value: 38.75,
// // //       status: "Delivered",
// // //     },
// // //     {
// // //       id: "SHP-2025-1043",
// // //       hs: "90",
// // //       desc: "Optical, Medical & Precision Instruments",
// // //       importer: "Medilink Pvt. Ltd.",
// // //       exporter: "Opto Instruments GmbH",
// // //       origin: "USA",
// // //       originCode: "US",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Los Angeles",
// // //       discharge: "Mumbai (JNPT)",
// // //       shipDate: "22 Apr 2025",
// // //       arrDate: "26 Apr 2025",
// // //       value: 28.3,
// // //       status: "In Transit",
// // //     },
// // //     {
// // //       id: "SHP-2025-1042",
// // //       hs: "39",
// // //       desc: "Plastics & Articles",
// // //       importer: "Prime Industries",
// // //       exporter: "Polymer Exports Ltd.",
// // //       origin: "UAE",
// // //       originCode: "AE",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Jebel Ali",
// // //       discharge: "Nhava Sheva",
// // //       shipDate: "21 Apr 2025",
// // //       arrDate: "24 Apr 2025",
// // //       value: 18.9,
// // //       status: "In Transit",
// // //     },
// // //     {
// // //       id: "SHP-2025-1041",
// // //       hs: "72",
// // //       desc: "Iron & Steel",
// // //       importer: "Shree Steel Pvt.Ltd.",
// // //       exporter: "Euro Steel AG",
// // //       origin: "Russia",
// // //       originCode: "RU",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Novorossiysk",
// // //       discharge: "Kandla",
// // //       shipDate: "20 Apr 2025",
// // //       arrDate: "25 Apr 2025",
// // //       value: 16.2,
// // //       status: "Pending",
// // //     },
// // //     {
// // //       id: "SHP-2025-1040",
// // //       hs: "27",
// // //       desc: "Mineral Fuels & Oils",
// // //       importer: "Energy India Ltd.",
// // //       exporter: "Gulf Petroleum LLC",
// // //       origin: "Saudi Arabia",
// // //       originCode: "SA",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Dammam",
// // //       discharge: "Tuticorin",
// // //       shipDate: "19 Apr 2025",
// // //       arrDate: "22 Apr 2025",
// // //       value: 12.45,
// // //       status: "Delivered",
// // //     },
// // //     {
// // //       id: "SHP-2025-1039",
// // //       hs: "30",
// // //       desc: "Pharmaceutical Products",
// // //       importer: "HealthCare Pvt. Ltd.",
// // //       exporter: "Pharma Global",
// // //       origin: "Switzerland",
// // //       originCode: "CH",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Basel",
// // //       discharge: "Mumbai (JNPT)",
// // //       shipDate: "18 Apr 2025",
// // //       arrDate: "21 Apr 2025",
// // //       value: 11.3,
// // //       status: "Delivered",
// // //     },
// // //     {
// // //       id: "SHP-2025-1038",
// // //       hs: "73",
// // //       desc: "Articles of Iron or Steel",
// // //       importer: "Metalix India Corp.",
// // //       exporter: "Metal Trade Corp.",
// // //       origin: "China",
// // //       originCode: "CN",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Tianjin",
// // //       discharge: "Nhava Sheva",
// // //       shipDate: "17 Apr 2025",
// // //       arrDate: "23 Apr 2025",
// // //       value: 10.15,
// // //       status: "In Transit",
// // //     },
// // //     {
// // //       id: "SHP-2025-1037",
// // //       hs: "62",
// // //       desc: "Articles of Apparel & Clothing Accessories",
// // //       importer: "Fashion Hub",
// // //       exporter: "Style Tex Ltd.",
// // //       origin: "Bangladesh",
// // //       originCode: "BD",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Chattogram",
// // //       discharge: "Kolkata",
// // //       shipDate: "16 Apr 2025",
// // //       arrDate: "20 Apr 2025",
// // //       value: 8.75,
// // //       status: "Delivered",
// // //     },
// // //     {
// // //       id: "SHP-2025-1036",
// // //       hs: "48",
// // //       desc: "Paper & Paperboard Articles",
// // //       importer: "Packwell Industries",
// // //       exporter: "Paper Source LLC",
// // //       origin: "Brazil",
// // //       originCode: "BR",
// // //       dest: "India",
// // //       destCode: "IN",
// // //       loading: "Santos",
// // //       discharge: "Cochin",
// // //       shipDate: "15 Apr 2025",
// // //       arrDate: "19 Apr 2025",
// // //       value: 7.6,
// // //       status: "Pending",
// // //     },
// // //   ];*/

// // //   const [dashboard, setDashboard] = useState({});
// // //   const [shipments, setShipments] = useState([]);
// // //   const [filterOptions, setFilterOptions] = useState({});
// // //   const [report, setReport] = useState([]);
// // //   const [loading, setLoading] = useState(false);

// // //   // --- STATES FOR FILTERING ---
// // //   const [searchTerm, setSearchTerm] = useState("");
// // //   const [selectedOrigin, setSelectedOrigin] = useState("All Countries");
// // //   const [selectedDest, setSelectedDest] = useState("All Countries");
// // //   const [selectedImporter, setSelectedImporter] = useState("All Importers");
// // //   const [selectedExporter, setSelectedExporter] = useState("All Exporters");
// // //   const [selectedPort, setSelectedPort] = useState("All Ports");
// // //    const [shipmentStartDate, setShipmentStartDate] = useState(null);
// // //     const [shipmentEndDate, setShipmentEndDate] = useState(null);
// // //      const [dateRange, setDateRange] = useState(false)
// // //      const [exportReport, setExportReport] = useState(false)
// // // const [currentPage, setCurrentPage] = useState(1);
// // // const rowsPerPage = 10;
// // //   const fetchDashboard = async () => {
// // //     try {
// // //       const res = await getDashboard();
// // //       setDashboard(res.data.data || {});
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };
// // //   const fetchShipments = async () => {
// // //     try {
// // //       const res = await getShipments();
// // //       setShipments(res.data.data || []);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };
// // //   const fetchFilterOptions = async () => {
// // //     try {
// // //       const res = await getFilterOptions();
// // //       setFilterOptions(res.data.data || {});
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };
// // //   const fetchReport = async () => {
// // //     try {
// // //       const res = await exportReport();
// // //       setReport(res.data.data || []);
// // //     } catch (err) {
// // //       console.log(err);
// // //     }
// // //   };
// // //   useEffect (() => {
// // //     fetchDashboard();
// // //     fetchShipments();
// // //     fetchFilterOptions();
// // //     fetchReport();
// // //   }, []);

// // //   // --- DYNAMIC DROPDOWN OPTIONS GENERATION ---
// // //   const uniqueOrigins = useMemo(
// // //     () => ["All Countries", ...new Set(shipments.map((s) => s.route?.originCountry).filter(Boolean))],
// // //     [shipments],
// // //   );
// // //   const uniqueDests = useMemo(
// // //     () => ["All Countries", ...new Set(shipments.map((s) => s.route?.destinationCountry).filter(Boolean))],
// // //     [shipments],
// // //   );
// // //   const uniqueImporters = useMemo(
// // //     () => [
// // //       "All Importers",
// // //       ...new Set(shipments.map((s) => s.importer?.companyName).filter(Boolean)),
// // //     ],
// // //     [shipments],
// // //   );
// // //   const uniqueExporters = useMemo(
// // //     () => [
// // //       "All Exporters",
// // //       ...new Set(shipments.map((s) => s.exporter?.companyName).filter(Boolean)),
// // //     ],
// // //     [shipments],
// // //   );
// // //   const uniquePorts = useMemo(
// // //     () => ["All Ports", ...new Set(shipments.map((s) => s.route?.originCity).filter(Boolean))],
// // //     [],
// // //   );

// // //   // --- RESET FILTER FUNCTION ---
// // //   const handleResetFilters = () => {
// // //     setSearchTerm("");
// // //     setSelectedOrigin("All Countries");
// // //     setSelectedDest("All Countries");
// // //     setSelectedImporter("All Importers");
// // //     setSelectedExporter("All Exporters");
// // //     setSelectedPort("All Ports");
// // //       setCurrentPage(1);
// // //   };

// // //   // --- DYNAMIC SEARCH & FILTER LOGIC ---
// // //   const filteredShipments = useMemo(() => {
// // //   return shipments.filter((shipment) => {
// // //     const matchesSearch =
// // //       (shipment.cargo?.hsCode?.description || "")
// // //         .toLowerCase()
// // //         .includes(searchTerm.toLowerCase()) ||
// // //       (shipment.cargo?.hsCode?.hsCode || "")
// // //         .includes(searchTerm) ||
// // //       (shipment.sbNumber || "")
// // //         .toLowerCase()
// // //         .includes(searchTerm.toLowerCase());

// // //     const matchesOrigin =
// // //       selectedOrigin === "All Countries" ||
// // //       shipment.route?.originCountry === selectedOrigin;

// // //     const matchesDest =
// // //       selectedDest === "All Countries" ||
// // //       shipment.route?.destinationCountry === selectedDest;

// // //     const matchesImporter =
// // //       selectedImporter === "All Importers" ||
// // //       shipment.importer?.companyName === selectedImporter;

// // //     const matchesExporter =
// // //       selectedExporter === "All Exporters" ||
// // //       shipment.exporter?.companyName === selectedExporter;

// // //     const matchesPort =
// // //       selectedPort === "All Ports" ||
// // //       shipment.route?.originCity === selectedPort;

// // //     return (
// // //       matchesSearch &&
// // //       matchesOrigin &&
// // //       matchesDest &&
// // //       matchesImporter &&
// // //       matchesExporter &&
// // //       matchesPort
// // //     );
// // //   });
// // // }, [
// // //   shipments,
// // //   searchTerm,
// // //   selectedOrigin,
// // //   selectedDest,
// // //   selectedImporter,
// // //   selectedExporter,
// // //   selectedPort,
// // // ]);
// // // const totalPages = Math.ceil(
// // //   filteredShipments.length / rowsPerPage
// // // );

// // // const paginatedShipments = useMemo(() => {
// // //   const startIndex =
// // //     (currentPage - 1) * rowsPerPage;

// // //   return filteredShipments.slice(
// // //     startIndex,
// // //     startIndex + rowsPerPage
// // //   );
// // // }, [filteredShipments, currentPage]);

// // // const startRow =
// // //   filteredShipments.length === 0
// // //     ? 0
// // //     : (currentPage - 1) * rowsPerPage + 1;

// // // const endRow = Math.min(
// // //   currentPage * rowsPerPage,
// // //   filteredShipments.length
// // // );
// // //   // --- DYNAMIC COUNTERS & STATS COMPUTATION ---
// // //   const totalValue = useMemo(() => {
// // //    return (
// // //      filteredShipments.reduce(
// // //        (sum, item) => sum + (item.cargo?.value || 0),
// // //        0
// // //       ) / 10000000).toFixed(2);
// // //   }, [filteredShipments]);

// // //   const uniqueExportersCount = useMemo(() => {
// // //    return new Set(
// // //      filteredShipments.map((s) => s.exporter?.companyName)).size;
// // // }, [filteredShipments]);

// // //   const handleApplyFilters = () => {
// // //     setAppliedFilters({
// // //       search: searchTerm,
// // //       port: selectedPort,
// // //       origin: selectedOrigin,
// // //       exporter: selectedExporter,
// // //       importer: selectedImporter,
// // //     });
// // //   };
// // // useEffect(() => {
// // //   setCurrentPage(1);
// // // }, [
// // //   searchTerm,
// // //   selectedOrigin,
// // //   selectedDest,
// // //   selectedImporter,
// // //   selectedExporter,
// // //   selectedPort,
// // // ]);
// // //   return (
// // //     <div className="overflow-y-auto  bg-[#f8fafc] p-6  text-slate-700 pt-14">
// // //       {/* --- HEADER SECTION --- */}
// // //       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
// // //         <div>
// // //           <h1 className="text-2xl font-bold text-slate-800">
// // //             Shipment Database
// // //           </h1>
// // //           <p className="text-sm text-slate-500 mt-0.5">
// // //             Explore detailed global shipment records with advanced search and
// // //             filters.
// // //           </p>
// // //         </div>

// // //         <div className="flex flex-wrap items-center gap-3">
// // //             <div className="relative flex-1 md:flex-none">
// // //                        <DatePicker
// // //                          selected={shipmentStartDate}
// // //                          onChange={(dates) => {
// // //                            const [start, end] = dates;
// // //                            setShipmentStartDate(start);
// // //                            setShipmentEndDate(end);
// // //                          }}
// // //                          startDate={shipmentStartDate}
// // //                          endDate={shipmentEndDate}
// // //                          selectsRange
// // //                          dateFormat="dd MMM yyyy"
// // //                          placeholderText="01 Apr 2025 - 24 Apr 2025"
// // //                          className={`bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap outline-none cursor-pointer ${HEADING}`}
// // //                        />
// // //                        <CalendarDays
// // //                          size={14}
// // //                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
// // //                        />
// // //                      </div>

// // //            <button onClick={() => setExportReport(true)} className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2 rounded-xl shadow-xs hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}>
// // //                      <Download size={14} className="text-slate-400" />
// // //                      Export Report
// // //                    </button>

// // //          {/* <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold shadow-sm transition-colors">
// // //             <Filter className="w-4 h-4" />
// // //             <span>Advanced Filters</span>
// // //           </button>*/}
// // //         </div>
// // //       </div>

// // //       {/* --- DYNAMIC STATS CARDS GRID --- */}
// // //       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mb-6">
// // //         {/* Total Shipments - Dynamic */}
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Total Exports Shipments
// // //             </span>
// // //             <div className="p-1.5 bg-blue-50 text-blue-600 rounded-lg">📦</div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">
// // //               {filteredShipments.length}
// // //             </h3>
// // //             <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Total Value - Dynamic */}
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Total Exports Value
// // //             </span>
// // //             <div className="p-1.5 bg-emerald-50 text-emerald-600 rounded-lg">
// // //               ₹
// // //             </div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">
// // //               ₹{totalValue} Cr
// // //             </h3>
// // //             <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Total Exporters - Dynamic */}
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Exporters
// // //             </span>
// // //             <div className="p-1.5 bg-indigo-50 text-indigo-600 rounded-lg">
// // //               👥
// // //             </div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">
// // //               {uniqueExportersCount}
// // //             </h3>
// // //             <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>
// // //           </div>
// // //         </div>

// // //         {/* Baki Standard Static Cards Metrics Layout ke liye
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Suppliers
// // //             </span>
// // //             <div className="p-1.5 bg-cyan-50 text-cyan-600 rounded-lg">🚚</div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">{dashboard.totalSuppliers || 0}</h3>
// // //              <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>
// // //           </div>
// // //         </div>*/}
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Origins
// // //             </span>
// // //             <div className="p-1.5 bg-purple-50 text-purple-600 rounded-lg">
// // //               🌐
// // //             </div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">{dashboard.countries || 0}</h3>
// // //              <span className="text-[11px] text-green-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>
// // //           </div>
// // //         </div>
// // //         <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600  tracking-wider">
// // //               Avg Value
// // //             </span>
// // //             <div className="p-1.5 bg-amber-50 text-amber-600 rounded-lg">
// // //               🔶
// // //             </div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">₹{((dashboard.avgShipmentValue || 0) / 100000).toFixed(2)} L</h3>
// // //              <span className="text-[11px] text-red-600 font-semibold flex items-center gap-0.5 mt-0.5">
// // //               <TrendingUp className="w-3 h-3" />
// // //             </span>
// // //           </div>
// // //         </div>
// // //         {/*<div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-col justify-between">
// // //           <div className="flex items-center justify-between">
// // //             <span className="text-[13px] font-semibold text-slate-600 tracking-wider">
// // //               Lead Time
// // //             </span>
// // //             <div className="p-1.5 bg-red-50 text-red-600 rounded-lg">⏱️</div>
// // //           </div>
// // //           <div className="mt-2">
// // //             <h3 className="text-xl font-bold text-slate-800">
// // //               {dashboard.avgLeadTime || 0} d
// // //                <span className="text-[11px] text-red-600 font-semibold flex items-center gap-0.5 mt-0.5">

// // //             </span>

// // //               </h3>
// // //           </div>
// // //         </div>*/}
// // //       </div>

// // //       {/* --- DYNAMIC FILTERS ROW BAR --- */}
// // //       <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm mb-6">
// // //         <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-3 items-end">
// // //           {/* Input Search Box */}
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               HS Code / Product / ID
// // //             </label>
// // //             <div className="relative">
// // //               <input
// // //                 type="text"
// // //                 value={searchTerm}
// // //                 onChange={(e) => setSearchTerm(e.target.value)}
// // //                 placeholder="Type to search..."
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-8 py-2 focus:outline-none focus:border-blue-500"
// // //               />
// // //               <Search className="w-3 h-3 absolute right-2.5 top-3 text-slate-400" />
// // //             </div>
// // //           </div>

// // //           {/* Origin Dropdown */}
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               Origin Country
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedOrigin}
// // //                 onChange={(e) => setSelectedOrigin(e.target.value)}
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
// // //               >
// // //                 {uniqueOrigins.map((country, i) => (
// // //                   <option key={i} value={country}>
// // //                     {country}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Destination Dropdown */}
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               Destination
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedDest}
// // //                 onChange={(e) => setSelectedDest(e.target.value)}
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
// // //               >
// // //                 {uniqueDests.map((dest, i) => (
// // //                   <option key={i} value={dest}>
// // //                     {dest}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Importer Dropdown
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               Importer
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedImporter}
// // //                 onChange={(e) => setSelectedImporter(e.target.value)}
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
// // //               >
// // //                 {uniqueImporters.map((imp, i) => (
// // //                   <option key={i} value={imp}>
// // //                     {imp}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Exporter Dropdown
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               Exporters
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedExporter}
// // //                 onChange={(e) => setSelectedExporter(e.target.value)}
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
// // //               >
// // //                 {uniqueExporters.map((exp, i) => (
// // //                   <option key={i} value={exp}>
// // //                     {exp}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Loading Port Dropdown
// // //           <div>
// // //             <label className="text-[11px] font-bold text-slate-400 block mb-1 uppercase">
// // //               Port of Loading
// // //             </label>
// // //             <div className="relative">
// // //               <select
// // //                 value={selectedPort}
// // //                 onChange={(e) => setSelectedPort(e.target.value)}
// // //                 className="w-full text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-2 appearance-none focus:outline-none focus:border-blue-500"
// // //               >
// // //                 {uniquePorts.map((port, i) => (
// // //                   <option key={i} value={port}>
// // //                     {port}
// // //                   </option>
// // //                 ))}
// // //               </select>
// // //               <SlidersHorizontal className="w-3 h-3 absolute right-2.5 top-3 text-slate-400 pointer-events-none" />
// // //             </div>
// // //           </div>

// // //           {/* Reset Filters Control */}
// // //           <div className="flex gap-2">
// // //             <button
// // //               onClick={handleApplyFilters}
// // //               className="flex-1  bg-blue-600 hover:bg-blue-700  text-white font-medium text-xs rounded-xl py-2 px-3 transition shadow-sm  w-full whitespace-nowrap"
// // //             >
// // //               Search
// // //             </button>

// // //             <button
// // //               onClick={handleResetFilters}
// // //               className="flex items-center justify-center border border-slate-200 text-red-500 hover:bg-red-50 rounded-lg px-2 py-3 bg-white shadow-sm font-semibold text-xs w-full transition-colors"
// // //             >
// // //               <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset
// // //             </button>
// // //           </div>
// // //         </div>
// // //       </div>

// // //       {/* --- DATA TABLE CONTAINER --- */}
// // //       <div className="bg-white rounded-xl border border-slate-200 shadow-sm ">
// // //         <div className="p-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 bg-slate-50/50">
// // //           <div className="text-sm font-bold text-slate-800">
// // //             Filtered: {filteredShipments.length} Results
// // //           </div>
// // //           <div className="flex items-center gap-3">
// // //             <button className="flex items-center gap-1.5 bg-white border border-slate-200 text-slate-700 font-semibold text-xs px-3 py-1.5 rounded-lg shadow-sm hover:bg-slate-50">
// // //               <Columns className="w-3.5 h-3.5 text-slate-400" /> Columns
// // //             </button>
// // //             <div className="flex items-center border border-slate-200 rounded-lg bg-white p-0.5 shadow-sm">
// // //               <button className="p-1 bg-slate-100 text-slate-700 rounded-md">
// // //                 <List className="w-3.5 h-3.5" />
// // //               </button>
// // //               <button className="p-1 text-slate-400 hover:text-slate-600">
// // //                 <LayoutGrid className="w-3.5 h-3.5" />
// // //               </button>
// // //             </div>
// // //           </div>
// // //         </div>

// // //         <div className="overflow-x-auto">
// // //           <table className="w-full text-left border-collapse">
// // //             <thead>
// // //               <tr className="border-b border-slate-200 bg-slate-50/70 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
// // //                 <th className="py-3 px-4">Shipment ID</th>
// // //                 <th className="py-3 px-3">HS Code</th>
// // //                 <th className="py-3 px-4 max-w-[180px]">Product Description</th>
// // //                 <th className="py-3 px-4">Importer</th>
// // //                 <th className="py-3 px-4">Exporter</th>
// // //                 <th className="py-3 px-3">Origin</th>
// // //                 <th className="py-3 px-3">Dest</th>
// // //                 <th className="py-3 px-4">Port of Loading</th>
// // //                 <th className="py-3 px-4">Port of Discharge</th>
// // //                 <th className="py-3 px-3">Ship Date</th>
// // //                 <th className="py-3 px-3">Arr. Date</th>
// // //                 <th className="py-3 px-4 text-right">Value (INR)</th>
// // //                 <th className="py-3 px-4 text-center">Status</th>
// // //                 {/*<th className="py-3 px-3 text-center">Actions</th>*/}
// // //               </tr>
// // //             </thead>
// // //             <tbody className="divide-y divide-slate-100 text-xs">
// // //               {paginatedShipments.length > 0 ? (
// // //                 paginatedShipments.map((row, idx) => (
// // //                   <tr
// // //                     key={idx}
// // //                     className="hover:bg-slate-50/80 transition-colors"
// // //                   >
// // //                     <td className="py-3.5 px-4 font-semibold text-blue-600 hover:underline cursor-pointer whitespace-nowrap">
// // //                       {row.referenceNumber || row.sbNumber}
// // //                     </td>
// // //                     <td className="py-3.5 px-3 text-slate-500 font-medium">
// // //                       {row.cargo?.hsCode?.hsCode}
// // //                     </td>
// // //                     <td
// // //                       className="py-3.5 px-4 font-medium text-slate-700 max-w-[180px] truncate"
// // //                       title={row.cargo?.description}
// // //                     >
// // //                       {row.cargo?.description}
// // //                     </td>
// // //                     <td className="py-3.5 px-4 font-medium text-slate-600">
// // //                       {row.importer?.companyName}
// // //                     </td>
// // //                     <td className="py-3.5 px-4 font-medium text-slate-600">
// // //                       {row.exporter?.companyName}
// // //                     </td>
// // //                     <td className="py-3.5 px-3 whitespace-nowrap">
// // //                       <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
// // //                         <ReactCountryFlag
// // //                           countryCode={countryCodes[row.route?.originCountry] || ""}
// // //                           svg
// // //                           style={{ width: "18px", height: "13px" }}
// // //                         />
// // //                       </span>
// // //                       <span className="text-slate-600 font-medium align-middle">
// // //                         {row.route?.originCountry}
// // //                       </span>
// // //                     </td>
// // //                     <td className="py-3.5 px-3 whitespace-nowrap">
// // //                       <span className="mr-1.5 inline-flex align-middle shadow-sm rounded-sm ">
// // //                         <ReactCountryFlag
// // //                           countryCode={countryCodes[row.route?.destinationCountry] || ""}
// // //                           svg
// // //                           style={{ width: "18px", height: "13px" }}
// // //                         />
// // //                       </span>
// // //                       <span className="text-slate-600 font-medium align-middle">
// // //                         {row.route?.destinationCountry}
// // //                       </span>
// // //                     </td>
// // //                     <td className="py-3.5 px-4 text-slate-500">
// // //                       {row.route?.originCity}
// // //                     </td>
// // //                     <td className="py-3.5 px-4 text-slate-500">
// // //                       {row.route?.destinationCity}
// // //                     </td>
// // //                     <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
// // //                       {row.shipmentDate ? new Date(row.shipmentDate).toLocaleDateString("en-GB", { day: "2-digit", month: "short",year: "numeric",}) : "-"}
// // //                     </td>
// // //                     <td className="py-3.5 px-3 text-slate-500 whitespace-nowrap">
// // //                       {row.eta ? new Date(row.eta).toLocaleDateString("en-GB", {day: "2-digit", month: "short", year: "numeric",}) : "-"}
// // //                     </td>
// // //                     <td className="py-3.5 px-4 text-right font-bold text-slate-800 whitespace-nowrap">
// // //                       ₹ {(row.cargo?.value / 10000000).toFixed(2)} Cr
// // //                     </td>
// // //                     <td className="py-3.5 px-4 text-center whitespace-nowrap">
// // //                       <span
// // //                         className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide ${
// // //                           row.shipmentStatus === "Delivered"
// // //                             ? "bg-green-50 text-green-600"
// // //                             : row.shipmentStatus === "In Transit"
// // //                               ? "bg-blue-50 text-blue-600"
// // //                               : "bg-orange-50 text-orange-600"
// // //                         }`}
// // //                       >
// // //                         {row.shipmentStatus}
// // //                       </span>
// // //                     </td>
// // //                    {/* <td className="py-3.5 px-3 text-center text-slate-400 hover:text-slate-600 cursor-pointer text-lg font-bold">
// // //                       ⋮
// // //                     </td>*/}
// // //                   </tr>
// // //                 ))
// // //               ) : (
// // //                 <tr>
// // //                   <td
// // //                     colSpan="14"
// // //                     className="text-center py-8 text-slate-400 font-medium"
// // //                   >
// // //                     No data found matching current filters.
// // //                   </td>
// // //                 </tr>
// // //               )}
// // //             </tbody>
// // //           </table>
// // //         </div>

// // //         {/* Footer info pagination */}
// // //         <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex flex-col sm:flex-row items-center justify-between gap-4">
// // //           <div className="text-xs font-semibold text-slate-400">
// // //            Showing {startRow}-{endRow} of{" "}
// // //   {filteredShipments.length} rows
// // //           </div>
// // //           <div className="flex items-center gap-1">
// // //   <button
// // //     type="button"
// // //     onClick={() =>
// // //       setCurrentPage((prev) =>
// // //         Math.max(prev - 1, 1)
// // //       )
// // //     }
// // //     disabled={currentPage === 1}
// // //     className={`p-1.5 rounded-lg border border-slate-200 bg-white ${
// // //       currentPage === 1
// // //         ? "text-slate-300 cursor-not-allowed"
// // //         : "text-slate-500 hover:bg-slate-100"
// // //     }`}
// // //   >
// // //     <ChevronLeft className="w-3.5 h-3.5" />
// // //   </button>

// // //   {Array.from(
// // //     { length: totalPages },
// // //     (_, index) => index + 1
// // //   ).map((page) => (
// // //     <button
// // //       key={page}
// // //       type="button"
// // //       onClick={() => setCurrentPage(page)}
// // //       className={`px-3 py-1 rounded-lg text-xs font-bold border ${
// // //         currentPage === page
// // //           ? "bg-blue-600 text-white border-blue-600"
// // //           : "bg-white text-slate-600 border-slate-200 hover:bg-slate-100"
// // //       }`}
// // //     >
// // //       {page}
// // //     </button>
// // //   ))}

// // //   <button
// // //     type="button"
// // //     onClick={() =>
// // //       setCurrentPage((prev) =>
// // //         Math.min(prev + 1, totalPages)
// // //       )
// // //     }
// // //     disabled={
// // //       currentPage === totalPages ||
// // //       totalPages === 0
// // //     }
// // //     className={`p-1.5 rounded-lg border border-slate-200 bg-white ${
// // //       currentPage === totalPages ||
// // //       totalPages === 0
// // //         ? "text-slate-300 cursor-not-allowed"
// // //         : "text-slate-500 hover:bg-slate-100"
// // //     }`}
// // //   >
// // //     <ChevronRight className="w-3.5 h-3.5" />
// // //   </button>
// // // </div>
// // //         </div>

// // //       </div>
// // //        {exportReport && (
// // //                                <ExportReport onClose={() => setExportReport(false)} />
// // //                              )}
// // //     <div className="mt-5 pt-3 border-t border-slate-200/60 flex flex-col sm:flex-row justify-between items-center text-xs text-slate-400 gap-2">
// // //         <div className="flex items-center gap-1.5">
// // //           <Clock size={13} className="text-slate-300" />
// // //           <span>All data is updated daily. Last updated on 24 Apr 2025, 09:30 AM</span>
// // //         </div>
// // //         <div className="flex items-center gap-1 cursor-pointer hover:text-slate-500">
// // //           <HelpCircle size={13} className="text-slate-300" />
// // //           <span>Help Center</span>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // // mahima code //
// // import React, { useState, useEffect, useCallback } from "react";
// // import {
// //   getDashboard,
// //   getFilterOptions,
// //   getShipments,
// //   exportReport,
// // } from "../../api/ShipmentDatabaseApi";

// // import {
// //   Search,
// //   Filter,
// //   RotateCcw,
// //   FileSpreadsheet,
// //   ChevronLeft,
// //   ChevronRight,
// //   Package,
// //   TrendingUp,
// //   Users,
// //   Globe,
// //   Truck,
// //   CalendarDays,
// //   RefreshCw,
// //   Download,
// //   Boxes,
// //   IndianRupee,
// //   Layers,
// //   ArrowUpRight,
// //   ArrowDownRight,
// //   Ship,
// //   Database,
// //   SlidersHorizontal,
// //   FileDown,
// //   Activity,
// //   CheckCircle2,
// // } from "lucide-react";

// // // ==========================================
// // // CONSTANTS & HELPERS
// // // ==========================================

// // const initialFilters = {
// //   search: "",
// //   type: "All Types",
// //   country: "All Countries",
// //   hsCode: "All HS Codes",
// //   importer: "All Importers",
// //   exporter: "All Exporters",
// //   supplier: "All Suppliers",
// //   buyer: "All Buyers",
// //   month: "All Months",
// //   year: "All Years",
// // };

// // const getResponseData = (res) => res?.data?.data ?? res?.data ?? {};

// // const getRecordArray = (data) => {
// //   if (Array.isArray(data)) return data;
// //   if (Array.isArray(data?.shipments)) return data.shipments;
// //   if (Array.isArray(data?.records)) return data.records;
// //   if (Array.isArray(data?.data)) return data.data;
// //   return [];
// // };

// // const formatCurrency = (value) =>
// //   `₹${(Number(value) || 0).toLocaleString("en-IN", {
// //     maximumFractionDigits: 2,
// //   })}`;

// // const formatCrore = (value) =>
// //   `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

// // const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

// // const formatDate = (date) => {
// //   if (!date) return "-";

// //   const parsed = new Date(date);

// //   return Number.isNaN(parsed.getTime())
// //     ? "-"
// //     : parsed.toLocaleDateString("en-GB", {
// //         day: "2-digit",
// //         month: "short",
// //         year: "numeric",
// //       });
// // };

// // const getMonthName = (month) => {
// //   if (!month) return "-";

// //   const value = String(month);

// //   const months = [
// //     "January",
// //     "February",
// //     "March",
// //     "April",
// //     "May",
// //     "June",
// //     "July",
// //     "August",
// //     "September",
// //     "October",
// //     "November",
// //     "December",
// //   ];

// //   if (/^\d+$/.test(value)) {
// //     return months[Number(value) - 1] || value;
// //   }

// //   return value;
// // };

// // // ==========================================
// // // STAT CARD
// // // ==========================================

// // const StatCard = ({
// //   title,
// //   value,
// //   subtitle,
// //   icon: Icon,
// //   iconStyle,
// //   accent,
// // }) => (
// //   <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]">
// //     <div className={`absolute left-0 top-0 h-full w-[3px] ${accent}`} />

// //     <div className="flex items-start justify-between gap-3">
// //       <div className="min-w-0">
// //         <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
// //           {title}
// //         </p>

// //         <h3 className="mt-3 break-words text-[23px] font-extrabold tracking-tight text-slate-900">
// //           {value}
// //         </h3>

// //         <p className="mt-1.5 text-[10px] font-medium text-slate-400">
// //           {subtitle}
// //         </p>
// //       </div>

// //       <div
// //         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
// //       >
// //         <Icon size={19} strokeWidth={2.1} />
// //       </div>
// //     </div>
// //   </div>
// // );

// // // ==========================================
// // // FILTER SELECT
// // // ==========================================

// // const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
// //   <div className="min-w-0">
// //     <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
// //       {label}
// //     </label>

// //     <select
// //       value={value}
// //       onChange={(e) => onChange(e.target.value)}
// //       className="h-[42px] w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
// //     >
// //       <option value={allLabel}>{allLabel}</option>

// //       {(options || []).map((item, index) => (
// //         <option key={`${item}-${index}`} value={item}>
// //           {item}
// //         </option>
// //       ))}
// //     </select>
// //   </div>
// // );

// // // ==========================================
// // // SUMMARY VALUE CARD
// // // ==========================================

// // const ValueCard = ({
// //   title,
// //   value,
// //   subtitle,
// //   icon: Icon,
// //   theme,
// //   percentage,
// // }) => (
// //   <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
// //     <div className="flex items-start justify-between">
// //       <div>
// //         <p className="text-xs font-semibold text-slate-500">{title}</p>

// //         <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
// //           {value}
// //         </h3>

// //         <p className="mt-1.5 text-[11px] text-slate-400">{subtitle}</p>
// //       </div>

// //       <div className={`rounded-xl p-3 ${theme}`}>
// //         <Icon size={21} />
// //       </div>
// //     </div>

// //     {percentage !== undefined && (
// //       <div className="mt-4">
// //         <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-400">
// //           <span>Share of total trade value</span>
// //           <span>{percentage.toFixed(1)}%</span>
// //         </div>

// //         <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
// //           <div
// //             className="h-full rounded-full bg-current transition-all duration-500"
// //             style={{
// //               width: `${Math.min(100, Math.max(0, percentage))}%`,
// //             }}
// //           />
// //         </div>
// //       </div>
// //     )}
// //   </div>
// // );

// // // ==========================================
// // // MAIN COMPONENT
// // // ==========================================

// // export default function ShipmentDatabase() {
// //   const [dashboard, setDashboard] = useState({});
// //   const [shipments, setShipments] = useState([]);
// //   const [filterOptions, setFilterOptions] = useState({});

// //   const [loading, setLoading] = useState(true);
// //   const [refreshing, setRefreshing] = useState(false);
// //   const [exporting, setExporting] = useState(false);

// //   const [activeTab, setActiveTab] = useState("all");
// //   const [filters, setFilters] = useState(initialFilters);
// //   const [appliedFilters, setAppliedFilters] = useState(initialFilters);

// //   const [page, setPage] = useState(1);
// //   const [limit, setLimit] = useState(10);
// //   const [totalPages, setTotalPages] = useState(1);
// //   const [totalRecords, setTotalRecords] = useState(0);

// //   const updateFilter = (key, value) => {
// //     setFilters((prev) => ({ ...prev, [key]: value }));
// //   };

// //   // ==========================================
// //   // QUERY BUILDER
// //   // ==========================================

// //   const buildQuery = useCallback((filterValues) => {
// //     const query = {};

// //     if (filterValues.search.trim()) {
// //       query.search = filterValues.search.trim();
// //     }

// //     if (filterValues.type !== "All Types") {
// //       query.type = filterValues.type;
// //     }

// //     if (filterValues.country !== "All Countries") {
// //       query.country = filterValues.country;
// //     }

// //     if (filterValues.hsCode !== "All HS Codes") {
// //       query.hsCode = filterValues.hsCode;
// //     }

// //     if (filterValues.importer !== "All Importers") {
// //       query.importer = filterValues.importer;
// //     }

// //     if (filterValues.exporter !== "All Exporters") {
// //       query.exporter = filterValues.exporter;
// //     }

// //     if (filterValues.supplier !== "All Suppliers") {
// //       query.supplier = filterValues.supplier;
// //     }

// //     if (filterValues.buyer !== "All Buyers") {
// //       query.buyer = filterValues.buyer;
// //     }

// //     if (filterValues.month !== "All Months") {
// //       query.month = filterValues.month;
// //     }

// //     if (filterValues.year !== "All Years") {
// //       query.year = filterValues.year;
// //     }

// //     return query;
// //   }, []);

// //   const getTabFilters = useCallback(() => {
// //     const query = buildQuery(appliedFilters);

// //     if (activeTab === "import") {
// //       query.type = "import";
// //     } else if (activeTab === "export") {
// //       query.type = "export";
// //     }

// //     return query;
// //   }, [activeTab, appliedFilters, buildQuery]);

// //   // ==========================================
// //   // API CALLS
// //   // ==========================================

// //   const fetchDashboard = useCallback(async () => {
// //     try {
// //       const query = getTabFilters();
// //       const res = await getDashboard(query);
// //       setDashboard(getResponseData(res));
// //     } catch (error) {
// //       console.error("Dashboard error:", error);
// //     }
// //   }, [getTabFilters]);

// //   const fetchFilters = useCallback(async () => {
// //     try {
// //       const res = await getFilterOptions();
// //       const data = getResponseData(res);

// //       console.log("FILTER OPTIONS API RESPONSE:", data);
// //       console.log("BUYERS:", data.buyers);

// //       setFilterOptions(data);
// //     } catch (error) {
// //       console.error("Filter options error:", error);
// //     }
// //   }, []);

// //   const fetchShipments = useCallback(async () => {
// //     try {
// //       setLoading(true);

// //       const query = {
// //         ...getTabFilters(),
// //         page,
// //         limit,
// //       };

// //       const res = await getShipments(query);
// //       const response = res?.data || {};

// //       const rows = Array.isArray(response.data)
// //         ? response.data
// //         : getRecordArray(response.data);

// //       setShipments(rows);

// //       const pagination = response.pagination || {};

// //       setTotalPages(Number(pagination.totalPages || 1));
// //       setTotalRecords(Number(pagination.totalRecords || 0));
// //     } catch (error) {
// //       console.error("Shipment fetch error:", error);

// //       setShipments([]);
// //       setTotalPages(1);
// //       setTotalRecords(0);
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, [appliedFilters, page, limit, buildQuery, getTabFilters]);

// //   useEffect(() => {
// //     fetchFilters();
// //   }, [fetchFilters]);

// //   useEffect(() => {
// //     fetchDashboard();
// //   }, [fetchDashboard]);

// //   useEffect(() => {
// //     fetchShipments();
// //   }, [fetchShipments]);

// //   // ==========================================
// //   // FILTER ACTIONS
// //   // ==========================================

// //   const handleApplyFilters = () => {
// //     setPage(1);
// //     setAppliedFilters({ ...filters });
// //   };

// //   const handleResetFilters = () => {
// //     setFilters(initialFilters);
// //     setAppliedFilters(initialFilters);
// //     setPage(1);
// //   };

// //   const handleRefresh = async () => {
// //     try {
// //       setRefreshing(true);

// //       await Promise.all([fetchDashboard(), fetchFilters(), fetchShipments()]);
// //     } finally {
// //       setRefreshing(false);
// //     }
// //   };

// //   // ==========================================
// //   // CSV EXPORT
// //   // ==========================================

// //   const handleExport = async () => {
// //     try {
// //       setExporting(true);

// //       const query = getTabFilters();
// //       const res = await exportReport(query);
// //       const rows = getRecordArray(getResponseData(res));

// //       if (!rows.length) {
// //         alert("No records available to export.");
// //         return;
// //       }

// //       const columns = [
// //         "shipmentId",
// //         "type",
// //         "hsCode",
// //         "productName",
// //         ...(activeTab !== "export" ? ["importer"] : []),
// //         ...(activeTab !== "import" ? ["exporter"] : []),
// //         ...(activeTab !== "export" ? ["supplier"] : []),
// //         ...(activeTab !== "import" ? ["buyer"] : []),
// //         "country",
// //         "quantity",
// //         "value",
// //         "month",
// //         "year",
// //         "fileName",
// //         "uploadedAt",
// //       ];

// //       const escapeCSV = (value) => {
// //         const text = value == null ? "" : String(value);
// //         return `"${text.replace(/"/g, '""')}"`;
// //       };

// //       const csv = [
// //         columns.join(","),
// //         ...rows.map((row) =>
// //           columns.map((column) => escapeCSV(row[column])).join(","),
// //         ),
// //       ].join("\n");

// //       const blob = new Blob(["\uFEFF" + csv], {
// //         type: "text/csv;charset=utf-8;",
// //       });

// //       const url = URL.createObjectURL(blob);
// //       const link = document.createElement("a");

// //       link.href = url;
// //       link.download = `shipment-database-${new Date()
// //         .toISOString()
// //         .slice(0, 10)}.csv`;

// //       document.body.appendChild(link);
// //       link.click();
// //       link.remove();

// //       URL.revokeObjectURL(url);
// //     } catch (error) {
// //       console.error("Export error:", error);
// //       alert("Unable to export shipment report.");
// //     } finally {
// //       setExporting(false);
// //     }
// //   };

// //   // ==========================================
// //   // DISPLAY HELPERS
// //   // ==========================================

// //   const goToPage = (nextPage) => {
// //     if (nextPage < 1 || nextPage > totalPages) return;
// //     setPage(nextPage);
// //   };

// //   const getTypeStyle = (type) =>
// //     String(type).toLowerCase() === "import"
// //       ? "border-emerald-200 bg-emerald-50 text-emerald-700"
// //       : "border-blue-200 bg-blue-50 text-blue-700";

// //   const filterList = (key) =>
// //     Array.isArray(filterOptions[key]) ? filterOptions[key] : [];

// //   const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;

// //   const endRecord = Math.min(page * limit, totalRecords);

// //   const totalValue = Number(dashboard.totalValue || 0);
// //   const importValue = Number(dashboard.totalImportValue || 0);
// //   const exportValue = Number(dashboard.totalExportValue || 0);

// //   const importPercentage = totalValue ? (importValue / totalValue) * 100 : 0;

// //   const exportPercentage = totalValue ? (exportValue / totalValue) * 100 : 0;

// //   const activeFilterCount =
// //     Object.entries(appliedFilters).filter(
// //       ([key, value]) => key !== "search" && value !== initialFilters[key],
// //     ).length + (appliedFilters.search ? 1 : 0);

// //   // ==========================================
// //   // STATS
// //   // ==========================================

// //   const stats = [
// //     {
// //       title: "Total Shipments",
// //       value: formatNumber(dashboard.totalShipments),
// //       subtitle: "Combined trade records",
// //       icon: Package,
// //       accent: "bg-blue-600",
// //       iconStyle: "bg-blue-50 text-blue-600",
// //     },
// //     {
// //       title: "Total Imports",
// //       value: formatNumber(dashboard.totalImports),
// //       subtitle: "Import intelligence",
// //       icon: Download,
// //       accent: "bg-emerald-500",
// //       iconStyle: "bg-emerald-50 text-emerald-600",
// //     },
// //     {
// //       title: "Total Exports",
// //       value: formatNumber(dashboard.totalExports),
// //       subtitle: "Export intelligence",
// //       icon: TrendingUp,
// //       accent: "bg-indigo-500",
// //       iconStyle: "bg-indigo-50 text-indigo-600",
// //     },
// //     {
// //       title: "Total Trade Value",
// //       value: formatCrore(totalValue),
// //       subtitle: "Combined trade value",
// //       icon: IndianRupee,
// //       accent: "bg-amber-500",
// //       iconStyle: "bg-amber-50 text-amber-600",
// //     },
// //     {
// //       title: "Importers",
// //       value: formatNumber(dashboard.totalImporters),
// //       subtitle: "Unique importers",
// //       icon: Users,
// //       accent: "bg-violet-500",
// //       iconStyle: "bg-violet-50 text-violet-600",
// //     },
// //     {
// //       title: "Exporters",
// //       value: formatNumber(dashboard.totalExporters),
// //       subtitle: "Unique exporters",
// //       icon: Truck,
// //       accent: "bg-cyan-500",
// //       iconStyle: "bg-cyan-50 text-cyan-600",
// //     },
// //     {
// //       title: "Countries",
// //       value: formatNumber(dashboard.totalCountries),
// //       subtitle: "Trade destinations",
// //       icon: Globe,
// //       accent: "bg-rose-500",
// //       iconStyle: "bg-rose-50 text-rose-600",
// //     },
// //   ];

// //   // ==========================================
// //   // UI
// //   // ==========================================

// //   return (
// //     <div className="cm-module-theme min-h-screen bg-[#f4f7fc] px-1 pb-8 pt-14 font-sans text-slate-700 sm:px-1 lg:px-1">
// //       {/* ================================== */}
// //       {/* PREMIUM HEADER */}
// //       {/* ================================== */}

// //       <section className="relative mb-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#102b63] via-[#174b9b] to-[#1674c8] p-5 text-white shadow-[0_12px_35px_rgba(20,65,130,0.20)] sm:p-7 lg:p-8">
// //         <div className="pointer-events-none absolute -right-12 -top-28 h-80 w-80 rounded-full border border-white/10" />
// //         <div className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/10" />
// //         <div className="pointer-events-none absolute -bottom-32 right-[22%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

// //         <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
// //           <div>
// //             {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
// //               <Activity size={13} className="text-cyan-200" />
// //               <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-50">
// //                 Trade Analytics
// //               </span>
// //               <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
// //             </div> */}

// //             <div className="flex items-center gap-3  text-white">
// //               <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
// //                 <Boxes size={25} />
// //               </div>

// //               <div className=" text-white">
// //                 <h1 className="font-extrabold text-white text-2xl tracking-tight sm:text-3xl">
// //                   Shipment Database
// //                 </h1>
// //                 <p className="mt-1 text-xs text-blue-100 sm:text-sm">
// //                   Unified global import & export intelligence platform
// //                 </p>
// //               </div>
// //             </div>

// //             <div className="mt-6 flex flex-wrap gap-2">
// //               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
// //                 <Database size={14} className="text-cyan-200" />
// //                 <span className="text-[11px] font-semibold">
// //                   {formatNumber(dashboard.totalShipments)} Total Records
// //                 </span>
// //               </div>

// //               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
// //                 <ArrowDownRight size={14} className="text-emerald-300" />
// //                 <span className="text-[11px] font-semibold">
// //                   {formatNumber(dashboard.totalImports)} Imports
// //                 </span>
// //               </div>

// //               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
// //                 <ArrowUpRight size={14} className="text-cyan-200" />
// //                 <span className="text-[11px] font-semibold">
// //                   {formatNumber(dashboard.totalExports)} Exports
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap items-center gap-2">
// //             <button
// //               onClick={handleRefresh}
// //               disabled={refreshing}
// //               className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-60"
// //             >
// //               <RefreshCw
// //                 size={15}
// //                 className={refreshing ? "animate-spin" : ""}
// //               />
// //               {refreshing ? "Refreshing..." : "Refresh Data"}
// //             </button>

// //             <button
// //               onClick={handleExport}
// //               disabled={exporting}
// //               className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-blue-800 shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-60"
// //             >
// //               {exporting ? (
// //                 <RefreshCw size={15} className="animate-spin" />
// //               ) : (
// //                 <FileDown size={16} />
// //               )}
// //               {exporting ? "Exporting..." : "Export Report"}
// //             </button>
// //           </div>
// //         </div>

// //         {/* <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
// //           <div className="flex items-center gap-2 text-[11px] text-blue-100">
// //             <CheckCircle2 size={14} className="text-emerald-300" />
// //             Import Intelligence + Export Intelligence
// //           </div>

// //           <div className="text-[10px] font-medium tracking-wide text-blue-100/80">
// //             UNIFIED TRADE OVERVIEW
// //           </div>
// //         </div> */}
// //       </section>

// //       {/* ================================== */}
// //       {/* IMPORT / EXPORT TABS */}
// //       {/* ================================== */}

// //       <section className="mb-6">
// //         <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_3px_15px_rgba(15,23,42,0.035)] sm:flex-row sm:items-center">
// //           <div>
// //             <h2 className="text-sm font-extrabold text-slate-800">
// //               Shipment Intelligence
// //             </h2>
// //             <p className="mt-1 text-[11px] text-slate-400">
// //               Select the trade category you want to explore
// //             </p>
// //           </div>

// //           <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1.5">
// //             <button
// //               onClick={() => {
// //                 setActiveTab("all");
// //                 setPage(1);
// //               }}
// //               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
// //                 activeTab === "all"
// //                   ? "bg-white text-blue-700 shadow-sm"
// //                   : "text-slate-500 hover:text-slate-800"
// //               }`}
// //             >
// //               <Layers size={15} />
// //               All Shipments
// //             </button>

// //             <button
// //               onClick={() => {
// //                 setActiveTab("import");
// //                 setPage(1);
// //               }}
// //               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
// //                 activeTab === "import"
// //                   ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
// //                   : "text-slate-500 hover:text-emerald-700"
// //               }`}
// //             >
// //               <ArrowDownRight size={16} />
// //               Imports
// //             </button>

// //             <button
// //               onClick={() => {
// //                 setActiveTab("export");
// //                 setPage(1);
// //               }}
// //               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
// //                 activeTab === "export"
// //                   ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
// //                   : "text-slate-500 hover:text-blue-700"
// //               }`}
// //             >
// //               <ArrowUpRight size={16} />
// //               Exports
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================================== */}
// //       {/* KPI CARDS */}
// //       {/* ================================== */}

// //       <section className="mb-6">
// //         <div className="mb-3 flex items-center justify-between">
// //           <div>
// //             <h2 className="text-sm font-extrabold text-slate-800">
// //               {activeTab === "import"
// //                 ? "Import Overview"
// //                 : activeTab === "export"
// //                   ? "Export Overview"
// //                   : "Trade Overview"}
// //             </h2>

// //             <p className="mt-0.5 text-[11px] text-slate-400">
// //               {activeTab === "import"
// //                 ? "Import shipment performance indicators"
// //                 : activeTab === "export"
// //                   ? "Export shipment performance indicators"
// //                   : "Combined import and export performance indicators"}
// //             </p>
// //           </div>

// //           <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
// //             LIVE SUMMARY
// //           </span>
// //         </div>

// //         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
// //           {stats.map((item) => (
// //             <StatCard key={item.title} {...item} />
// //           ))}
// //         </div>
// //       </section>

// //       {/* ================================== */}
// //       {/* TRADE VALUE COMPARISON */}
// //       {/* ================================== */}

// //       <section className="mb-6">
// //         <div className="mb-3">
// //           <h2 className="text-sm font-extrabold text-slate-800">
// //             {activeTab === "import"
// //               ? "Import Value Analysis"
// //               : activeTab === "export"
// //                 ? "Export Value Analysis"
// //                 : "Trade Value Analysis"}
// //           </h2>
// //           <p className="mt-0.5 text-[11px] text-slate-400">
// //             Import and export value contribution
// //           </p>
// //         </div>

// //         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
// //           {activeTab !== "export" && (
// //             <ValueCard
// //               title="Total Import Value"
// //               value={formatCrore(importValue)}
// //               subtitle="Combined import assessment value"
// //               icon={ArrowDownRight}
// //               theme="bg-emerald-50 text-emerald-600"
// //               percentage={importPercentage}
// //             />
// //           )}

// //           {activeTab !== "import" && (
// //             <ValueCard
// //               title="Total Export Value"
// //               value={formatCrore(exportValue)}
// //               subtitle="Combined export trade value"
// //               icon={ArrowUpRight}
// //               theme="bg-blue-50 text-blue-600"
// //               percentage={exportPercentage}
// //             />
// //           )}

// //           <ValueCard
// //             title={
// //               activeTab === "import"
// //                 ? "Average Import Value"
// //                 : activeTab === "export"
// //                   ? "Average Export Value"
// //                   : "Average Shipment Value"
// //             }
// //             value={formatCurrency(dashboard.avgShipmentValue)}
// //             subtitle="Average value per shipment record"
// //             icon={IndianRupee}
// //             theme="bg-amber-50 text-amber-600"
// //           />
// //         </div>
// //       </section>

// //       {/* ================================== */}
// //       {/* SEARCH & FILTERS */}
// //       {/* ================================== */}

// //       <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.035)]">
// //         <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
// //               <SlidersHorizontal size={19} />
// //             </div>

// //             <div>
// //               <h2 className="text-sm font-extrabold text-slate-800">
// //                 Search & Filters
// //               </h2>
// //               <p className="mt-0.5 text-[11px] text-slate-400">
// //                 Find shipment records using multiple parameters
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap items-center gap-2">
// //             {activeFilterCount > 0 && (
// //               <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-700">
// //                 {activeFilterCount} Active Filters
// //               </span>
// //             )}

// //             <button
// //               onClick={handleResetFilters}
// //               className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
// //             >
// //               <RotateCcw size={13} />
// //               Reset Filters
// //             </button>
// //           </div>
// //         </div>

// //         <div className="p-5">
// //           <div className="mb-4">
// //             <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
// //               Global Search
// //             </label>

// //             <div className="relative">
// //               <Search
// //                 size={17}
// //                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
// //               />

// //               <input
// //                 value={filters.search}
// //                 onChange={(e) => updateFilter("search", e.target.value)}
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") handleApplyFilters();
// //                 }}
// //                 placeholder="Search HS code, product, importer, exporter, supplier..."
// //                 className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-xs font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
// //               />
// //             </div>
// //           </div>

// //           <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
// //             <FilterSelect
// //               label="Shipment Type"
// //               value={filters.type}
// //               onChange={(v) => updateFilter("type", v)}
// //               options={filterList("types")}
// //               allLabel="All Types"
// //             />

// //             <FilterSelect
// //               label="Country"
// //               value={filters.country}
// //               onChange={(v) => updateFilter("country", v)}
// //               options={filterList("countries")}
// //               allLabel="All Countries"
// //             />

// //             <FilterSelect
// //               label="HS Code"
// //               value={filters.hsCode}
// //               onChange={(v) => updateFilter("hsCode", v)}
// //               options={filterList("hsCodes")}
// //               allLabel="All HS Codes"
// //             />

// //             {activeTab !== "export" && (
// //               <FilterSelect
// //                 label="Importer"
// //                 value={filters.importer}
// //                 onChange={(v) => updateFilter("importer", v)}
// //                 options={filterList("importers")}
// //                 allLabel="All Importers"
// //               />
// //             )}

// //             {activeTab !== "import" && (
// //               <FilterSelect
// //                 label="Exporter"
// //                 value={filters.exporter}
// //                 onChange={(v) => updateFilter("exporter", v)}
// //                 options={filterList("exporters")}
// //                 allLabel="All Exporters"
// //               />
// //             )}

// //             {activeTab !== "export" && (
// //               <FilterSelect
// //                 label="Supplier"
// //                 value={filters.supplier}
// //                 onChange={(v) => updateFilter("supplier", v)}
// //                 options={filterList("suppliers")}
// //                 allLabel="All Suppliers"
// //               />
// //             )}

// //             {activeTab !== "import" && (
// //               <FilterSelect
// //                 label="Buyer"
// //                 value={filters.buyer}
// //                 onChange={(v) => updateFilter("buyer", v)}
// //                 options={filterList("buyers")}
// //                 allLabel="All Buyers"
// //               />
// //             )}

// //             <FilterSelect
// //               label="Month"
// //               value={filters.month}
// //               onChange={(v) => updateFilter("month", v)}
// //               options={filterList("months")}
// //               allLabel="All Months"
// //             />

// //             <FilterSelect
// //               label="Year"
// //               value={filters.year}
// //               onChange={(v) => updateFilter("year", v)}
// //               options={filterList("years")}
// //               allLabel="All Years"
// //             />
// //           </div>

// //           <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
// //             <p className="text-[11px] text-slate-400">
// //               Select your criteria and apply filters to update the dashboard.
// //             </p>

// //             <button
// //               onClick={handleApplyFilters}
// //               className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-7 text-xs font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-600/30"
// //             >
// //               <Filter size={15} />
// //               Apply Filters
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================================== */}
// //       {/* SHIPMENT TABLE */}
// //       {/* ================================== */}

// //       <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_18px_rgba(15,23,42,0.045)]">
// //         {/* Table Header */}
// //         <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
// //           <div className="flex items-center gap-3">
// //             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
// //               <Ship size={19} />
// //             </div>

// //             <div>
// //               <h2 className="text-sm font-extrabold text-slate-800">
// //                 {activeTab === "import"
// //                   ? "Import Shipment Records"
// //                   : activeTab === "export"
// //                     ? "Export Shipment Records"
// //                     : "All Shipment Records"}
// //               </h2>

// //               <p className="mt-0.5 text-[11px] text-slate-400">
// //                 {formatNumber(totalRecords)} matching records found
// //               </p>
// //             </div>
// //           </div>

// //           <div className="flex flex-wrap items-center gap-2">
// //             <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
// //               <span className="text-[10px] font-semibold text-slate-500">
// //                 Rows
// //               </span>

// //               <select
// //                 value={limit}
// //                 onChange={(e) => {
// //                   setLimit(Number(e.target.value));
// //                   setPage(1);
// //                 }}
// //                 className="bg-transparent text-xs font-bold text-slate-700 outline-none"
// //               >
// //                 <option value={10}>10</option>
// //                 <option value={25}>25</option>
// //                 <option value={50}>50</option>
// //                 <option value={100}>100</option>
// //               </select>
// //             </div>

// //             <button
// //               onClick={handleExport}
// //               disabled={exporting}
// //               className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
// //             >
// //               <FileSpreadsheet size={14} />
// //               Export CSV
// //             </button>
// //           </div>
// //         </div>

// //         {/* Table */}
// //         <div className="overflow-x-auto">
// //           <table className="w-full min-w-[1350px] border-collapse text-left">
// //             <thead>
// //               <tr className="border-b border-slate-200 bg-[#f7f9fd]">
// //                 {[
// //                   "Shipment ID",
// //                   "Type",
// //                   "HS Code",
// //                   "Product Description",
// //                   ...(activeTab !== "export" ? ["Importer"] : []),
// //                   ...(activeTab !== "import" ? ["Exporter"] : []),
// //                   ...(activeTab !== "export" ? ["Supplier"] : []),
// //                   ...(activeTab !== "import" ? ["Buyer"] : []),
// //                   "Country",
// //                   "Quantity",
// //                   "Value (INR)",
// //                   "Month / Year",
// //                   "Uploaded",
// //                 ].map((heading) => (
// //                   <th
// //                     key={heading}
// //                     className="whitespace-nowrap px-4 py-4 text-[10px] font-extrabold uppercase tracking-[0.07em] text-slate-500"
// //                   >
// //                     {heading}
// //                   </th>
// //                 ))}
// //               </tr>
// //             </thead>

// //             <tbody className="divide-y divide-slate-100">
// //               {loading ? (
// //                 <tr>
// //                   <td colSpan="12" className="py-20 text-center">
// //                     <div className="flex flex-col items-center gap-3">
// //                       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
// //                         <RefreshCw size={22} className="animate-spin" />
// //                       </div>

// //                       <div>
// //                         <p className="text-xs font-bold text-slate-700">
// //                           Loading shipment records
// //                         </p>
// //                         <p className="mt-1 text-[11px] text-slate-400">
// //                           Please wait while we fetch your data...
// //                         </p>
// //                       </div>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ) : shipments.length > 0 ? (
// //                 shipments.map((row, index) => (
// //                   <tr
// //                     key={row._id || row.shipmentId || index}
// //                     className="group transition-colors hover:bg-blue-50/50"
// //                   >
// //                     <td className="whitespace-nowrap px-4 py-4">
// //                       <p className="text-[11px] font-extrabold text-blue-700">
// //                         {row.shipmentId || row._id || "-"}
// //                       </p>

// //                       <p
// //                         className="mt-1 max-w-[145px] truncate text-[10px] text-slate-400"
// //                         title={row.fileName || ""}
// //                       >
// //                         {row.fileName || "Source file"}
// //                       </p>
// //                     </td>

// //                     <td className="px-4 py-4">
// //                       <span
// //                         className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold ${getTypeStyle(
// //                           row.type,
// //                         )}`}
// //                       >
// //                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
// //                         {row.type || "-"}
// //                       </span>
// //                     </td>

// //                     <td className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-slate-700">
// //                       {row.hsCode || "-"}
// //                     </td>

// //                     <td
// //                       className="max-w-[220px] truncate px-4 py-4 text-[11px] font-semibold text-slate-600"
// //                       title={row.productName || ""}
// //                     >
// //                       {row.productName || "-"}
// //                     </td>

// //                     {activeTab !== "export" && (
// //                       <td
// //                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
// //                         title={row.importer || ""}
// //                       >
// //                         {row.importer || "-"}
// //                       </td>
// //                     )}

// //                     {activeTab !== "import" && (
// //                       <td
// //                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
// //                         title={row.exporter || ""}
// //                       >
// //                         {row.exporter || "-"}
// //                       </td>
// //                     )}

// //                     {activeTab !== "export" && (
// //                       <td
// //                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
// //                         title={row.supplier || ""}
// //                       >
// //                         {row.supplier || "-"}
// //                       </td>
// //                     )}

// //                     {activeTab !== "import" && (
// //                       <td
// //                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
// //                         title={row.buyer || row.Cosignee || ""}
// //                       >
// //                         {row.buyer || row.Cosignee || "-"}
// //                       </td>
// //                     )}

// //                     <td className="whitespace-nowrap px-4 py-4">
// //                       <div className="flex items-center gap-2">
// //                         <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
// //                           <Globe size={13} />
// //                         </div>

// //                         <span className="text-[11px] font-medium text-slate-600">
// //                           {row.country || "-"}
// //                         </span>
// //                       </div>
// //                     </td>

// //                     <td className="whitespace-nowrap px-4 py-4 text-right text-[11px] font-semibold text-slate-600">
// //                       {row.quantity == null ? "-" : formatNumber(row.quantity)}
// //                     </td>

// //                     <td className="whitespace-nowrap px-4 py-4 text-right">
// //                       <span className="text-[11px] font-extrabold text-slate-800">
// //                         {formatCurrency(row.value)}
// //                       </span>
// //                     </td>

// //                     <td className="whitespace-nowrap px-4 py-4">
// //                       <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
// //                         <CalendarDays size={13} className="text-slate-400" />
// //                         {getMonthName(row.month)} {row.year || ""}
// //                       </div>
// //                     </td>

// //                     <td className="whitespace-nowrap px-4 py-4 text-[11px] text-slate-500">
// //                       {formatDate(row.uploadedAt)}
// //                     </td>
// //                   </tr>
// //                 ))
// //               ) : (
// //                 <tr>
// //                   <td
// //                     colSpan={11 + (activeTab === "all" ? 2 : 1)}
// //                     className="py-20 text-center"
// //                   >
// //                     <div className="flex flex-col items-center">
// //                       <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
// //                         <Package size={26} />
// //                       </div>

// //                       <p className="text-sm font-extrabold text-slate-700">
// //                         No shipment records found
// //                       </p>

// //                       <p className="mt-1 text-xs text-slate-400">
// //                         Try changing your search criteria or resetting filters.
// //                       </p>

// //                       <button
// //                         onClick={handleResetFilters}
// //                         className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[11px] font-bold text-blue-700 transition hover:bg-blue-100"
// //                       >
// //                         <RotateCcw size={13} />
// //                         Clear Filters
// //                       </button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               )}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* ================================== */}
// //         {/* PAGINATION */}
// //         {/* ================================== */}

// //         <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:items-center">
// //           <p className="text-[11px] text-slate-500">
// //             Showing{" "}
// //             <span className="font-extrabold text-slate-800">{startRecord}</span>{" "}
// //             to{" "}
// //             <span className="font-extrabold text-slate-800">{endRecord}</span>{" "}
// //             of{" "}
// //             <span className="font-extrabold text-slate-800">
// //               {formatNumber(totalRecords)}
// //             </span>{" "}
// //             records
// //           </p>

// //           <div className="flex items-center gap-1.5">
// //             <button
// //               onClick={() => goToPage(1)}
// //               disabled={page <= 1 || loading}
// //               className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
// //             >
// //               First
// //             </button>

// //             <button
// //               onClick={() => goToPage(page - 1)}
// //               disabled={page <= 1 || loading}
// //               className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
// //             >
// //               <ChevronLeft size={16} />
// //             </button>

// //             <span className="flex h-9 min-w-[76px] items-center justify-center rounded-lg bg-blue-700 px-3 text-[11px] font-extrabold text-white shadow-md shadow-blue-700/15">
// //               {page} / {totalPages}
// //             </span>

// //             <button
// //               onClick={() => goToPage(page + 1)}
// //               disabled={page >= totalPages || loading}
// //               className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
// //             >
// //               <ChevronRight size={16} />
// //             </button>

// //             <button
// //               onClick={() => goToPage(totalPages)}
// //               disabled={page >= totalPages || loading}
// //               className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
// //             >
// //               Last
// //             </button>
// //           </div>
// //         </div>
// //       </section>

// //       {/* ================================== */}
// //       {/* FOOTER */}
// //       {/* ================================== */}

// //       <div className="mt-5 flex flex-col justify-between gap-2 px-1 text-[10px] text-slate-400 sm:flex-row sm:items-center">
// //         <div className="flex items-center gap-2">
// //           <Database size={13} />
// //           <span>
// //             Data sourced from Import Intelligence and Export Intelligence
// //           </span>
// //         </div>

// //         <div className="flex items-center gap-2">
// //           <Layers size={13} />
// //           <span>Unified Shipment Database</span>
// //           <span className="text-slate-300">|</span>
// //           <span>Trade Analytics</span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// // mahima code //
// import React, { useState, useEffect, useCallback } from "react";
// import {
//   getDashboard,
//   getFilterOptions,
//   getShipments,
//   exportReport,
// } from "../../api/ShipmentDatabaseApi";

// import {
//   Search,
//   Filter,
//   RotateCcw,
//   FileSpreadsheet,
//   ChevronLeft,
//   ChevronRight,
//   Package,
//   TrendingUp,
//   Users,
//   Globe,
//   Truck,
//   CalendarDays,
//   RefreshCw,
//   Download,
//   Boxes,
//   IndianRupee,
//   Layers,
//   ArrowUpRight,
//   ArrowDownRight,
//   Ship,
//   Database,
//   SlidersHorizontal,
//   FileDown,
//   Activity,
//   CheckCircle2,
// } from "lucide-react";

// // ==========================================
// // CONSTANTS & HELPERS
// // ==========================================

// const initialFilters = {
//   search: "",
//   type: "All Types",
//   country: "All Countries",
//   hsCode: "All HS Codes",
//   importer: "All Importers",
//   exporter: "All Exporters",
//   supplier: "All Suppliers",
//   buyer: "All Buyers",
//   month: "All Months",
//   year: "All Years",
// };

// const getResponseData = (res) => res?.data?.data ?? res?.data ?? {};

// const getRecordArray = (data) => {
//   if (Array.isArray(data)) return data;
//   if (Array.isArray(data?.shipments)) return data.shipments;
//   if (Array.isArray(data?.records)) return data.records;
//   if (Array.isArray(data?.data)) return data.data;
//   return [];
// };

// const formatCurrency = (value) =>
//   `₹${(Number(value) || 0).toLocaleString("en-IN", {
//     maximumFractionDigits: 2,
//   })}`;

// const formatCrore = (value) =>
//   `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

// const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

// const formatDate = (date) => {
//   if (!date) return "-";

//   const parsed = new Date(date);

//   return Number.isNaN(parsed.getTime())
//     ? "-"
//     : parsed.toLocaleDateString("en-GB", {
//         day: "2-digit",
//         month: "short",
//         year: "numeric",
//       });
// };

// const getMonthName = (month) => {
//   if (!month) return "-";

//   const value = String(month);

//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];

//   if (/^\d+$/.test(value)) {
//     return months[Number(value) - 1] || value;
//   }

//   return value;
// };

// // ==========================================
// // STAT CARD
// // ==========================================

// const StatCard = ({
//   title,
//   value,
//   subtitle,
//   icon: Icon,
//   iconStyle,
//   accent,
// }) => (
//   <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]">
//     <div className={`absolute left-0 top-0 h-full w-[3px] ${accent}`} />

//     <div className="flex items-start justify-between gap-3">
//       <div className="min-w-0">
//         <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
//           {title}
//         </p>

//         <h3 className="mt-3 break-words text-[23px] font-extrabold tracking-tight text-slate-900">
//           {value}
//         </h3>

//         <p className="mt-1.5 text-[10px] font-medium text-slate-400">
//           {subtitle}
//         </p>
//       </div>

//       <div
//         className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
//       >
//         <Icon size={19} strokeWidth={2.1} />
//       </div>
//     </div>
//   </div>
// );

// // ==========================================
// // FILTER SELECT
// // ==========================================

// const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
//   <div className="min-w-0">
//     <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
//       {label}
//     </label>

//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="h-[42px] w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
//     >
//       <option value={allLabel}>{allLabel}</option>

//       {(options || []).map((item, index) => (
//         <option key={`${item}-${index}`} value={item}>
//           {item}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// // ==========================================
// // SUMMARY VALUE CARD
// // ==========================================

// const ValueCard = ({
//   title,
//   value,
//   subtitle,
//   icon: Icon,
//   theme,
//   percentage,
// }) => (
//   <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
//     <div className="flex items-start justify-between">
//       <div>
//         <p className="text-xs font-semibold text-slate-500">{title}</p>

//         <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
//           {value}
//         </h3>

//         <p className="mt-1.5 text-[11px] text-slate-400">{subtitle}</p>
//       </div>

//       <div className={`rounded-xl p-3 ${theme}`}>
//         <Icon size={21} />
//       </div>
//     </div>

//     {percentage !== undefined && (
//       <div className="mt-4">
//         <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-400">
//           <span>Share of total trade value</span>
//           <span>{percentage.toFixed(1)}%</span>
//         </div>

//         <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
//           <div
//             className="h-full rounded-full bg-current transition-all duration-500"
//             style={{
//               width: `${Math.min(100, Math.max(0, percentage))}%`,
//             }}
//           />
//         </div>
//       </div>
//     )}
//   </div>
// );

// // ==========================================
// // MAIN COMPONENT
// // ==========================================

// export default function ShipmentDatabase() {
//   const [dashboard, setDashboard] = useState({});
//   const [shipments, setShipments] = useState([]);
//   const [filterOptions, setFilterOptions] = useState({});

//   const [loading, setLoading] = useState(true);
//   const [refreshing, setRefreshing] = useState(false);
//   const [exporting, setExporting] = useState(false);

//   const [activeTab, setActiveTab] = useState("all");
//   const [filters, setFilters] = useState(initialFilters);
//   const [appliedFilters, setAppliedFilters] = useState(initialFilters);

//   const [page, setPage] = useState(1);
//   const [limit, setLimit] = useState(10);
//   const [totalPages, setTotalPages] = useState(1);
//   const [totalRecords, setTotalRecords] = useState(0);

//   const updateFilter = (key, value) => {
//     setFilters((prev) => ({ ...prev, [key]: value }));
//   };

//   // ==========================================
//   // QUERY BUILDER
//   // ==========================================

//   const buildQuery = useCallback((filterValues) => {
//     const query = {};

//     if (filterValues.search.trim()) {
//       query.search = filterValues.search.trim();
//     }

//     if (filterValues.type !== "All Types") {
//       query.type = filterValues.type;
//     }

//     if (filterValues.country !== "All Countries") {
//       query.country = filterValues.country;
//     }

//     if (filterValues.hsCode !== "All HS Codes") {
//       query.hsCode = filterValues.hsCode;
//     }

//     if (filterValues.importer !== "All Importers") {
//       query.importer = filterValues.importer;
//     }

//     if (filterValues.exporter !== "All Exporters") {
//       query.exporter = filterValues.exporter;
//     }

//     if (filterValues.supplier !== "All Suppliers") {
//       query.supplier = filterValues.supplier;
//     }

//     if (filterValues.buyer !== "All Buyers") {
//       query.buyer = filterValues.buyer;
//     }

//     if (filterValues.month !== "All Months") {
//       query.month = filterValues.month;
//     }

//     if (filterValues.year !== "All Years") {
//       query.year = filterValues.year;
//     }

//     return query;
//   }, []);

//   const getTabFilters = useCallback(() => {
//     const query = buildQuery(appliedFilters);

//     if (activeTab === "import") {
//       query.type = "import";
//     } else if (activeTab === "export") {
//       query.type = "export";
//     }

//     return query;
//   }, [activeTab, appliedFilters, buildQuery]);

//   // ==========================================
//   // API CALLS
//   // ==========================================

//   const fetchDashboard = useCallback(async () => {
//     try {
//       const query = getTabFilters();
//       const res = await getDashboard(query);
//       setDashboard(getResponseData(res));
//     } catch (error) {
//       console.error("Dashboard error:", error);
//     }
//   }, [getTabFilters]);

//   const fetchFilters = useCallback(async () => {
//     try {
//       const res = await getFilterOptions();
//       const data = getResponseData(res);

//       console.log("FILTER OPTIONS API RESPONSE:", data);
//       console.log("BUYERS:", data.buyers);

//       setFilterOptions(data);
//     } catch (error) {
//       console.error("Filter options error:", error);
//     }
//   }, []);

//   const fetchShipments = useCallback(async () => {
//     try {
//       setLoading(true);

//       const query = {
//         ...getTabFilters(),
//         page,
//         limit,
//       };

//       const res = await getShipments(query);
//       const response = res?.data || {};

//       const rows = Array.isArray(response.data)
//         ? response.data
//         : getRecordArray(response.data);

//       setShipments(rows);

//       const pagination = response.pagination || {};

//       setTotalPages(Number(pagination.totalPages || 1));
//       setTotalRecords(Number(pagination.totalRecords || 0));
//     } catch (error) {
//       console.error("Shipment fetch error:", error);

//       setShipments([]);
//       setTotalPages(1);
//       setTotalRecords(0);
//     } finally {
//       setLoading(false);
//     }
//   }, [appliedFilters, page, limit, buildQuery, getTabFilters]);

//   useEffect(() => {
//     fetchFilters();
//   }, [fetchFilters]);

//   useEffect(() => {
//     fetchDashboard();
//   }, [fetchDashboard]);

//   useEffect(() => {
//     fetchShipments();
//   }, [fetchShipments]);

//   // ==========================================
//   // FILTER ACTIONS
//   // ==========================================

//   const handleApplyFilters = () => {
//     setPage(1);
//     setAppliedFilters({ ...filters });
//   };

//   const handleResetFilters = () => {
//     setFilters(initialFilters);
//     setAppliedFilters(initialFilters);
//     setPage(1);
//   };

//   const handleRefresh = async () => {
//     try {
//       setRefreshing(true);

//       await Promise.all([fetchDashboard(), fetchFilters(), fetchShipments()]);
//     } finally {
//       setRefreshing(false);
//     }
//   };

//   // ==========================================
//   // CSV EXPORT
//   // ==========================================

//   const handleExport = async () => {
//     try {
//       setExporting(true);

//       const query = getTabFilters();
//       const res = await exportReport(query);
//       const rows = getRecordArray(getResponseData(res));

//       if (!rows.length) {
//         alert("No records available to export.");
//         return;
//       }

//       const columns = [
//         "shipmentId",
//         "type",
//         "hsCode",
//         "productName",
//         ...(activeTab !== "export" ? ["importer"] : []),
//         ...(activeTab !== "import" ? ["exporter"] : []),
//         ...(activeTab !== "export" ? ["supplier"] : []),
//         ...(activeTab !== "import" ? ["buyer"] : []),
//         "country",
//         "quantity",
//         "value",
//         "month",
//         "year",
//         "fileName",
//         "uploadedAt",
//       ];

//       const escapeCSV = (value) => {
//         const text = value == null ? "" : String(value);
//         return `"${text.replace(/"/g, '""')}"`;
//       };

//       const csv = [
//         columns.join(","),
//         ...rows.map((row) =>
//           columns.map((column) => escapeCSV(row[column])).join(","),
//         ),
//       ].join("\n");

//       const blob = new Blob(["\uFEFF" + csv], {
//         type: "text/csv;charset=utf-8;",
//       });

//       const url = URL.createObjectURL(blob);
//       const link = document.createElement("a");

//       link.href = url;
//       link.download = `shipment-database-${new Date()
//         .toISOString()
//         .slice(0, 10)}.csv`;

//       document.body.appendChild(link);
//       link.click();
//       link.remove();

//       URL.revokeObjectURL(url);
//     } catch (error) {
//       console.error("Export error:", error);
//       alert("Unable to export shipment report.");
//     } finally {
//       setExporting(false);
//     }
//   };

//   // ==========================================
//   // DISPLAY HELPERS
//   // ==========================================

//   const goToPage = (nextPage) => {
//     if (nextPage < 1 || nextPage > totalPages) return;
//     setPage(nextPage);
//   };

//   const getTypeStyle = (type) =>
//     String(type).toLowerCase() === "import"
//       ? "border-emerald-200 bg-emerald-50 text-emerald-700"
//       : "border-blue-200 bg-blue-50 text-blue-700";

//   const filterList = (key) =>
//     Array.isArray(filterOptions[key]) ? filterOptions[key] : [];

//   const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;

//   const endRecord = Math.min(page * limit, totalRecords);

//   const totalValue = Number(dashboard.totalValue || 0);
//   const importValue = Number(dashboard.totalImportValue || 0);
//   const exportValue = Number(dashboard.totalExportValue || 0);

//   const importPercentage = totalValue ? (importValue / totalValue) * 100 : 0;

//   const exportPercentage = totalValue ? (exportValue / totalValue) * 100 : 0;

//   const activeFilterCount =
//     Object.entries(appliedFilters).filter(
//       ([key, value]) => key !== "search" && value !== initialFilters[key],
//     ).length + (appliedFilters.search ? 1 : 0);

//   // ==========================================
//   // STATS
//   // ==========================================

//   const stats = [
//     {
//       title: "Total Shipments",
//       value: formatNumber(dashboard.totalShipments),
//       subtitle: "Combined trade records",
//       icon: Package,
//       accent: "bg-blue-600",
//       iconStyle: "bg-blue-50 text-blue-600",
//     },
//     {
//       title: "Total Imports",
//       value: formatNumber(dashboard.totalImports),
//       subtitle: "Import intelligence",
//       icon: Download,
//       accent: "bg-emerald-500",
//       iconStyle: "bg-emerald-50 text-emerald-600",
//     },
//     {
//       title: "Total Exports",
//       value: formatNumber(dashboard.totalExports),
//       subtitle: "Export intelligence",
//       icon: TrendingUp,
//       accent: "bg-indigo-500",
//       iconStyle: "bg-indigo-50 text-indigo-600",
//     },
//     {
//       title: "Total Trade Value",
//       value: formatCrore(totalValue),
//       subtitle: "Combined trade value",
//       icon: IndianRupee,
//       accent: "bg-amber-500",
//       iconStyle: "bg-amber-50 text-amber-600",
//     },
//     {
//       title: "Importers",
//       value: formatNumber(dashboard.totalImporters),
//       subtitle: "Unique importers",
//       icon: Users,
//       accent: "bg-violet-500",
//       iconStyle: "bg-violet-50 text-violet-600",
//     },
//     {
//       title: "Exporters",
//       value: formatNumber(dashboard.totalExporters),
//       subtitle: "Unique exporters",
//       icon: Truck,
//       accent: "bg-cyan-500",
//       iconStyle: "bg-cyan-50 text-cyan-600",
//     },
//     {
//       title: "Countries",
//       value: formatNumber(dashboard.totalCountries),
//       subtitle: "Trade destinations",
//       icon: Globe,
//       accent: "bg-rose-500",
//       iconStyle: "bg-rose-50 text-rose-600",
//     },
//   ];

//   // ==========================================
//   // UI
//   // ==========================================

//   return (
//     <div className="cm-module-theme min-h-screen bg-[#f4f7fc] px-1 pb-8 pt-14 font-sans text-slate-700 sm:px-1 lg:px-1">
//       {/* ================================== */}
//       {/* PREMIUM HEADER */}
//       {/* ================================== */}

//       <section className="relative mb-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#102b63] via-[#174b9b] to-[#1674c8] p-5 text-white shadow-[0_12px_35px_rgba(20,65,130,0.20)] sm:p-7 lg:p-8">
//         <div className="pointer-events-none absolute -right-12 -top-28 h-80 w-80 rounded-full border border-white/10" />
//         <div className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/10" />
//         <div className="pointer-events-none absolute -bottom-32 right-[22%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

//         <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
//           <div>
//             {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
//               <Activity size={13} className="text-cyan-200" />
//               <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-50">
//                 Trade Analytics
//               </span>
//               <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
//             </div> */}

//             <div className="flex items-center gap-3  text-white">
//               <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
//                 <Boxes size={25} />
//               </div>

//               <div className=" text-white">
//                 <h1 className="font-extrabold text-blue-100 text-2xl tracking-tight sm:text-3xl">
//                   Shipment Database
//                 </h1>
//                 <p className="mt-1 text-xs text-blue-100 sm:text-sm">
//                   Unified global import & export intelligence platform
//                 </p>
//               </div>
//             </div>

//             <div className="mt-6 flex flex-wrap gap-2">
//               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
//                 <Database size={14} className="text-cyan-200" />
//                 <span className="text-[11px] font-semibold">
//                   {formatNumber(dashboard.totalShipments)} Total Records
//                 </span>
//               </div>

//               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
//                 <ArrowDownRight size={14} className="text-emerald-300" />
//                 <span className="text-[11px] font-semibold">
//                   {formatNumber(dashboard.totalImports)} Imports
//                 </span>
//               </div>

//               <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
//                 <ArrowUpRight size={14} className="text-cyan-200" />
//                 <span className="text-[11px] font-semibold">
//                   {formatNumber(dashboard.totalExports)} Exports
//                 </span>
//               </div>
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <button
//               onClick={handleRefresh}
//               disabled={refreshing}
//               className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-60"
//             >
//               <RefreshCw
//                 size={15}
//                 className={refreshing ? "animate-spin" : ""}
//               />
//               {refreshing ? "Refreshing..." : "Refresh Data"}
//             </button>

//             <button
//               onClick={handleExport}
//               disabled={exporting}
//               className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-blue-800 shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-60"
//             >
//               {exporting ? (
//                 <RefreshCw size={15} className="animate-spin" />
//               ) : (
//                 <FileDown size={16} />
//               )}
//               {exporting ? "Exporting..." : "Export Report"}
//             </button>
//           </div>
//         </div>

//         {/* <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
//           <div className="flex items-center gap-2 text-[11px] text-blue-100">
//             <CheckCircle2 size={14} className="text-emerald-300" />
//             Import Intelligence + Export Intelligence
//           </div>

//           <div className="text-[10px] font-medium tracking-wide text-blue-100/80">
//             UNIFIED TRADE OVERVIEW
//           </div>
//         </div> */}
//       </section>

//       {/* ================================== */}
//       {/* IMPORT / EXPORT TABS */}
//       {/* ================================== */}

//       <section className="mb-6">
//         <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_3px_15px_rgba(15,23,42,0.035)] sm:flex-row sm:items-center">
//           <div>
//             <h2 className="text-sm font-extrabold text-slate-800">
//               Shipment Intelligence
//             </h2>
//             <p className="mt-1 text-[11px] text-slate-400">
//               Select the trade category you want to explore
//             </p>
//           </div>

//           <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1.5">
//             <button
//               onClick={() => {
//                 setActiveTab("all");
//                 setPage(1);
//               }}
//               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
//                 activeTab === "all"
//                   ? "bg-white text-blue-700 shadow-sm"
//                   : "text-slate-500 hover:text-slate-800"
//               }`}
//             >
//               <Layers size={15} />
//               All Shipments
//             </button>

//             <button
//               onClick={() => {
//                 setActiveTab("import");
//                 setPage(1);
//               }}
//               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
//                 activeTab === "import"
//                   ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
//                   : "text-slate-500 hover:text-emerald-700"
//               }`}
//             >
//               <ArrowDownRight size={16} />
//               Imports
//             </button>

//             <button
//               onClick={() => {
//                 setActiveTab("export");
//                 setPage(1);
//               }}
//               className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
//                 activeTab === "export"
//                   ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
//                   : "text-slate-500 hover:text-blue-700"
//               }`}
//             >
//               <ArrowUpRight size={16} />
//               Exports
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================================== */}
//       {/* KPI CARDS */}
//       {/* ================================== */}

//       <section className="mb-6">
//         <div className="mb-3 flex items-center justify-between">
//           <div>
//             <h2 className="text-sm font-extrabold text-slate-800">
//               {activeTab === "import"
//                 ? "Import Overview"
//                 : activeTab === "export"
//                   ? "Export Overview"
//                   : "Trade Overview"}
//             </h2>

//             <p className="mt-0.5 text-[11px] text-slate-400">
//               {activeTab === "import"
//                 ? "Import shipment performance indicators"
//                 : activeTab === "export"
//                   ? "Export shipment performance indicators"
//                   : "Combined import and export performance indicators"}
//             </p>
//           </div>

//           <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
//             LIVE SUMMARY
//           </span>
//         </div>

//         <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
//           {stats.map((item) => (
//             <StatCard key={item.title} {...item} />
//           ))}
//         </div>
//       </section>

//       {/* ================================== */}
//       {/* TRADE VALUE COMPARISON */}
//       {/* ================================== */}

//       <section className="mb-6">
//         <div className="mb-3">
//           <h2 className="text-sm font-extrabold text-slate-800">
//             {activeTab === "import"
//               ? "Import Value Analysis"
//               : activeTab === "export"
//                 ? "Export Value Analysis"
//                 : "Trade Value Analysis"}
//           </h2>
//           <p className="mt-0.5 text-[11px] text-slate-400">
//             Import and export value contribution
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
//           {activeTab !== "export" && (
//             <ValueCard
//               title="Total Import Value"
//               value={formatCrore(importValue)}
//               subtitle="Combined import assessment value"
//               icon={ArrowDownRight}
//               theme="bg-emerald-50 text-emerald-600"
//               percentage={importPercentage}
//             />
//           )}

//           {activeTab !== "import" && (
//             <ValueCard
//               title="Total Export Value"
//               value={formatCrore(exportValue)}
//               subtitle="Combined export trade value"
//               icon={ArrowUpRight}
//               theme="bg-blue-50 text-blue-600"
//               percentage={exportPercentage}
//             />
//           )}

//           <ValueCard
//             title={
//               activeTab === "import"
//                 ? "Average Import Value"
//                 : activeTab === "export"
//                   ? "Average Export Value"
//                   : "Average Shipment Value"
//             }
//             value={formatCurrency(dashboard.avgShipmentValue)}
//             subtitle="Average value per shipment record"
//             icon={IndianRupee}
//             theme="bg-amber-50 text-amber-600"
//           />
//         </div>
//       </section>

//       {/* ================================== */}
//       {/* SEARCH & FILTERS */}
//       {/* ================================== */}

//       <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.035)]">
//         <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
//               <SlidersHorizontal size={19} />
//             </div>

//             <div>
//               <h2 className="text-sm font-extrabold text-slate-800">
//                 Search & Filters
//               </h2>
//               <p className="mt-0.5 text-[11px] text-slate-400">
//                 Find shipment records using multiple parameters
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             {activeFilterCount > 0 && (
//               <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-700">
//                 {activeFilterCount} Active Filters
//               </span>
//             )}

//             <button
//               onClick={handleResetFilters}
//               className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
//             >
//               <RotateCcw size={13} />
//               Reset Filters
//             </button>
//           </div>
//         </div>

//         <div className="p-5">
//           <div className="mb-4">
//             <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
//               Global Search
//             </label>

//             <div className="relative">
//               <Search
//                 size={17}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
//               />

//               <input
//                 value={filters.search}
//                 onChange={(e) => updateFilter("search", e.target.value)}
//                 onKeyDown={(e) => {
//                   if (e.key === "Enter") handleApplyFilters();
//                 }}
//                 placeholder="Search HS code, product, importer, exporter, supplier..."
//                 className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-xs font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
//               />
//             </div>
//           </div>

//           <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
//             <FilterSelect
//               label="Shipment Type"
//               value={filters.type}
//               onChange={(v) => updateFilter("type", v)}
//               options={filterList("types")}
//               allLabel="All Types"
//             />

//             <FilterSelect
//               label="Country"
//               value={filters.country}
//               onChange={(v) => updateFilter("country", v)}
//               options={filterList("countries")}
//               allLabel="All Countries"
//             />

//             <FilterSelect
//               label="HS Code"
//               value={filters.hsCode}
//               onChange={(v) => updateFilter("hsCode", v)}
//               options={filterList("hsCodes")}
//               allLabel="All HS Codes"
//             />

//             {activeTab !== "export" && (
//               <FilterSelect
//                 label="Importer"
//                 value={filters.importer}
//                 onChange={(v) => updateFilter("importer", v)}
//                 options={filterList("importers")}
//                 allLabel="All Importers"
//               />
//             )}

//             {activeTab !== "import" && (
//               <FilterSelect
//                 label="Exporter"
//                 value={filters.exporter}
//                 onChange={(v) => updateFilter("exporter", v)}
//                 options={filterList("exporters")}
//                 allLabel="All Exporters"
//               />
//             )}

//             {activeTab !== "export" && (
//               <FilterSelect
//                 label="Supplier"
//                 value={filters.supplier}
//                 onChange={(v) => updateFilter("supplier", v)}
//                 options={filterList("suppliers")}
//                 allLabel="All Suppliers"
//               />
//             )}

//             {activeTab !== "import" && (
//               <FilterSelect
//                 label="Buyer"
//                 value={filters.buyer}
//                 onChange={(v) => updateFilter("buyer", v)}
//                 options={filterList("buyers")}
//                 allLabel="All Buyers"
//               />
//             )}

//             <FilterSelect
//               label="Month"
//               value={filters.month}
//               onChange={(v) => updateFilter("month", v)}
//               options={filterList("months")}
//               allLabel="All Months"
//             />

//             <FilterSelect
//               label="Year"
//               value={filters.year}
//               onChange={(v) => updateFilter("year", v)}
//               options={filterList("years")}
//               allLabel="All Years"
//             />
//           </div>

//           <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
//             <p className="text-[11px] text-slate-400">
//               Select your criteria and apply filters to update the dashboard.
//             </p>

//             <button
//               onClick={handleApplyFilters}
//               className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-7 text-xs font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-600/30"
//             >
//               <Filter size={15} />
//               Apply Filters
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================================== */}
//       {/* SHIPMENT TABLE */}
//       {/* ================================== */}

//       <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_18px_rgba(15,23,42,0.045)]">
//         {/* Table Header */}
//         <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
//               <Ship size={19} />
//             </div>

//             <div>
//               <h2 className="text-sm font-extrabold text-slate-800">
//                 {activeTab === "import"
//                   ? "Import Shipment Records"
//                   : activeTab === "export"
//                     ? "Export Shipment Records"
//                     : "All Shipment Records"}
//               </h2>

//               <p className="mt-0.5 text-[11px] text-slate-400">
//                 {formatNumber(totalRecords)} matching records found
//               </p>
//             </div>
//           </div>

//           <div className="flex flex-wrap items-center gap-2">
//             <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
//               <span className="text-[10px] font-semibold text-slate-500">
//                 Rows
//               </span>

//               <select
//                 value={limit}
//                 onChange={(e) => {
//                   setLimit(Number(e.target.value));
//                   setPage(1);
//                 }}
//                 className="bg-transparent text-xs font-bold text-slate-700 outline-none"
//               >
//                 <option value={10}>10</option>
//                 <option value={25}>25</option>
//                 <option value={50}>50</option>
//                 <option value={100}>100</option>
//               </select>
//             </div>

//             {/* <button
//               onClick={handleExport}
//               disabled={exporting}
//               className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
//             >
//               <FileSpreadsheet size={14} />
//               Export CSV
//             </button> */}
//           </div>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="w-full min-w-[1350px] border-collapse text-left">
//             <thead>
//               <tr className="border-b border-slate-200 bg-[#f7f9fd]">
//                 {[
//                   "Shipment ID",
//                   "Type",
//                   "HS Code",
//                   "Product Description",
//                   ...(activeTab !== "export" ? ["Importer"] : []),
//                   ...(activeTab !== "import" ? ["Exporter"] : []),
//                   ...(activeTab !== "export" ? ["Supplier"] : []),
//                   ...(activeTab !== "import" ? ["Buyer"] : []),
//                   "Country",
//                   "Quantity",
//                   "Value (INR)",
//                   "Month / Year",
//                   "Uploaded",
//                 ].map((heading) => (
//                   <th
//                     key={heading}
//                     className="whitespace-nowrap px-4 py-4 text-[10px] font-extrabold uppercase tracking-[0.07em] text-slate-500"
//                   >
//                     {heading}
//                   </th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody className="divide-y divide-slate-100">
//               {loading ? (
//                 <tr>
//                   <td colSpan="12" className="py-20 text-center">
//                     <div className="flex flex-col items-center gap-3">
//                       <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
//                         <RefreshCw size={22} className="animate-spin" />
//                       </div>

//                       <div>
//                         <p className="text-xs font-bold text-slate-700">
//                           Loading shipment records
//                         </p>
//                         <p className="mt-1 text-[11px] text-slate-400">
//                           Please wait while we fetch your data...
//                         </p>
//                       </div>
//                     </div>
//                   </td>
//                 </tr>
//               ) : shipments.length > 0 ? (
//                 shipments.map((row, index) => (
//                   <tr
//                     key={row._id || row.shipmentId || index}
//                     className="group transition-colors hover:bg-blue-50/50"
//                   >
//                     <td className="whitespace-nowrap px-4 py-4">
//                       <p className="text-[11px] font-extrabold text-blue-700">
//                         {row.shipmentId || row._id || "-"}
//                       </p>

//                       <p
//                         className="mt-1 max-w-[145px] truncate text-[10px] text-slate-400"
//                         title={row.fileName || ""}
//                       >
//                         {row.fileName || "Source file"}
//                       </p>
//                     </td>

//                     <td className="px-4 py-4">
//                       <span
//                         className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold ${getTypeStyle(
//                           row.type,
//                         )}`}
//                       >
//                         <span className="h-1.5 w-1.5 rounded-full bg-current" />
//                         {row.type || "-"}
//                       </span>
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-slate-700">
//                       {row.hsCode || "-"}
//                     </td>

//                     <td
//                       className="max-w-[220px] truncate px-4 py-4 text-[11px] font-semibold text-slate-600"
//                       title={row.productName || ""}
//                     >
//                       {row.productName || "-"}
//                     </td>

//                     {activeTab !== "export" && (
//                       <td
//                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
//                         title={row.importer || ""}
//                       >
//                         {row.importer || "-"}
//                       </td>
//                     )}

//                     {activeTab !== "import" && (
//                       <td
//                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
//                         title={row.exporter || ""}
//                       >
//                         {row.exporter || "-"}
//                       </td>
//                     )}

//                     {activeTab !== "export" && (
//                       <td
//                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
//                         title={row.supplier || ""}
//                       >
//                         {row.supplier || "-"}
//                       </td>
//                     )}

//                     {activeTab !== "import" && (
//                       <td
//                         className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
//                         title={row.buyer || row.Cosignee || ""}
//                       >
//                         {row.buyer || row.Cosignee || "-"}
//                       </td>
//                     )}

//                     <td className="whitespace-nowrap px-4 py-4">
//                       <div className="flex items-center gap-2">
//                         <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
//                           <Globe size={13} />
//                         </div>

//                         <span className="text-[11px] font-medium text-slate-600">
//                           {row.country || "-"}
//                         </span>
//                       </div>
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4 text-right text-[11px] font-semibold text-slate-600">
//                       {row.quantity == null ? "-" : formatNumber(row.quantity)}
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4 text-right">
//                       <span className="text-[11px] font-extrabold text-slate-800">
//                         {formatCurrency(row.value)}
//                       </span>
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4">
//                       <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
//                         <CalendarDays size={13} className="text-slate-400" />
//                         {getMonthName(row.month)} {row.year || ""}
//                       </div>
//                     </td>

//                     <td className="whitespace-nowrap px-4 py-4 text-[11px] text-slate-500">
//                       {formatDate(row.uploadedAt)}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td
//                     colSpan={11 + (activeTab === "all" ? 2 : 1)}
//                     className="py-20 text-center"
//                   >
//                     <div className="flex flex-col items-center">
//                       <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
//                         <Package size={26} />
//                       </div>

//                       <p className="text-sm font-extrabold text-slate-700">
//                         No shipment records found
//                       </p>

//                       <p className="mt-1 text-xs text-slate-400">
//                         Try changing your search criteria or resetting filters.
//                       </p>

//                       <button
//                         onClick={handleResetFilters}
//                         className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[11px] font-bold text-blue-700 transition hover:bg-blue-100"
//                       >
//                         <RotateCcw size={13} />
//                         Clear Filters
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* ================================== */}
//         {/* PAGINATION */}
//         {/* ================================== */}

//         <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:items-center">
//           <p className="text-[11px] text-slate-500">
//             Showing{" "}
//             <span className="font-extrabold text-slate-800">{startRecord}</span>{" "}
//             to{" "}
//             <span className="font-extrabold text-slate-800">{endRecord}</span>{" "}
//             of{" "}
//             <span className="font-extrabold text-slate-800">
//               {formatNumber(totalRecords)}
//             </span>{" "}
//             records
//           </p>

//           <div className="flex items-center gap-1.5">
//             <button
//               onClick={() => goToPage(1)}
//               disabled={page <= 1 || loading}
//               className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
//             >
//               First
//             </button>

//             <button
//               onClick={() => goToPage(page - 1)}
//               disabled={page <= 1 || loading}
//               className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               <ChevronLeft size={16} />
//             </button>

//             <span className="flex h-9 min-w-[76px] items-center justify-center rounded-lg bg-blue-700 px-3 text-[11px] font-extrabold text-white shadow-md shadow-blue-700/15">
//               {page} / {totalPages}
//             </span>

//             <button
//               onClick={() => goToPage(page + 1)}
//               disabled={page >= totalPages || loading}
//               className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               <ChevronRight size={16} />
//             </button>

//             <button
//               onClick={() => goToPage(totalPages)}
//               disabled={page >= totalPages || loading}
//               className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
//             >
//               Last
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================================== */}
//       {/* FOOTER */}
//       {/* ================================== */}

//       <div className="mt-5 flex flex-col justify-between gap-2 px-1 text-[10px] text-slate-400 sm:flex-row sm:items-center">
//         <div className="flex items-center gap-2">
//           <Database size={13} />
//           <span>
//             Data sourced from Import Intelligence and Export Intelligence
//           </span>
//         </div>

//         <div className="flex items-center gap-2">
//           <Layers size={13} />
//           <span>Unified Shipment Database</span>
//           <span className="text-slate-300">|</span>
//           <span>Trade Analytics</span>
//         </div>
//       </div>
//     </div>
//   );
// }

// mahima code //
import React, { useState, useEffect, useCallback } from "react";
import {
  getDashboard,
  getFilterOptions,
  getShipments,
  exportReport,
} from "../../api/ShipmentDatabaseApi";

import {
  Search,
  Filter,
  RotateCcw,
  FileSpreadsheet,
  ChevronLeft,
  ChevronRight,
  Package,
  TrendingUp,
  Users,
  Globe,
  Truck,
  CalendarDays,
  RefreshCw,
  Download,
  Boxes,
  IndianRupee,
  Layers,
  ArrowUpRight,
  ArrowDownRight,
  Ship,
  Database,
  SlidersHorizontal,
  FileDown,
  Activity,
  CheckCircle2,
} from "lucide-react";

// ==========================================
// CONSTANTS & HELPERS
// ==========================================

const initialFilters = {
  search: "",
  type: "All Types",
  country: "All Countries",
  hsCode: "All HS Codes",
  importer: "All Importers",
  exporter: "All Exporters",
  supplier: "All Suppliers",
  buyer: "All Buyers",
  month: "All Months",
  year: "All Years",
};

const getResponseData = (res) => res?.data?.data ?? res?.data ?? {};

const getRecordArray = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.shipments)) return data.shipments;
  if (Array.isArray(data?.records)) return data.records;
  if (Array.isArray(data?.data)) return data.data;
  return [];
};

const formatCurrency = (value) =>
  `₹${(Number(value) || 0).toLocaleString("en-IN", {
    maximumFractionDigits: 2,
  })}`;

const formatCrore = (value) =>
  `₹${((Number(value) || 0) / 10000000).toFixed(2)} Cr`;

const formatNumber = (value) => Number(value || 0).toLocaleString("en-IN");

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(date);

  return Number.isNaN(parsed.getTime())
    ? "-"
    : parsed.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
};

const getMonthName = (month) => {
  if (!month) return "-";

  const value = String(month);

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (/^\d+$/.test(value)) {
    return months[Number(value) - 1] || value;
  }

  return value;
};

// ==========================================
// STAT CARD
// ==========================================

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconStyle,
  accent,
}) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.035)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(15,23,42,0.09)]">
    <div className={`absolute left-0 top-0 h-full w-[3px] ${accent}`} />

    <div className="flex items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500">
          {title}
        </p>

        <h3 className="mt-3 break-words text-[23px] font-extrabold tracking-tight text-slate-900">
          {value}
        </h3>

        <p className="mt-1.5 text-[10px] font-medium text-slate-400">
          {subtitle}
        </p>
      </div>

      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconStyle}`}
      >
        <Icon size={19} strokeWidth={2.1} />
      </div>
    </div>
  </div>
);

// ==========================================
// FILTER SELECT
// ==========================================

const FilterSelect = ({ label, value, onChange, options, allLabel }) => (
  <div className="min-w-0">
    <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
      {label}
    </label>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-[42px] w-full min-w-0 rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-xs font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
    >
      <option value={allLabel}>{allLabel}</option>

      {(options || []).map((item, index) => (
        <option key={`${item}-${index}`} value={item}>
          {item}
        </option>
      ))}
    </select>
  </div>
);

// ==========================================
// SUMMARY VALUE CARD
// ==========================================

const ValueCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  theme,
  percentage,
}) => (
  <div className="relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-lg">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-xs font-semibold text-slate-500">{title}</p>

        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-900">
          {value}
        </h3>

        <p className="mt-1.5 text-[11px] text-slate-400">{subtitle}</p>
      </div>

      <div className={`rounded-xl p-3 ${theme}`}>
        <Icon size={21} />
      </div>
    </div>

    {percentage !== undefined && (
      <div className="mt-4">
        <div className="mb-1.5 flex justify-between text-[10px] font-semibold text-slate-400">
          <span>Share of total trade value</span>
          <span>{percentage.toFixed(1)}%</span>
        </div>

        <div className="h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-current transition-all duration-500"
            style={{
              width: `${Math.min(100, Math.max(0, percentage))}%`,
            }}
          />
        </div>
      </div>
    )}
  </div>
);

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function ShipmentDatabase() {
  const [dashboard, setDashboard] = useState({});
  const [shipments, setShipments] = useState([]);
  const [filterOptions, setFilterOptions] = useState({});

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [exporting, setExporting] = useState(false);

  const [activeTab, setActiveTab] = useState("all");
  const [filters, setFilters] = useState(initialFilters);
  const [appliedFilters, setAppliedFilters] = useState(initialFilters);

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  // ==========================================
  // QUERY BUILDER
  // ==========================================

  const buildQuery = useCallback((filterValues) => {
    const query = {};

    if (filterValues.search.trim()) {
      query.search = filterValues.search.trim();
    }

    if (filterValues.type !== "All Types") {
      query.type = filterValues.type;
    }

    if (filterValues.country !== "All Countries") {
      query.country = filterValues.country;
    }

    if (filterValues.hsCode !== "All HS Codes") {
      query.hsCode = filterValues.hsCode;
    }

    if (filterValues.importer !== "All Importers") {
      query.importer = filterValues.importer;
    }

    if (filterValues.exporter !== "All Exporters") {
      query.exporter = filterValues.exporter;
    }

    if (filterValues.supplier !== "All Suppliers") {
      query.supplier = filterValues.supplier;
    }

    if (filterValues.buyer !== "All Buyers") {
      query.buyer = filterValues.buyer;
    }

    if (filterValues.month !== "All Months") {
      query.month = filterValues.month;
    }

    if (filterValues.year !== "All Years") {
      query.year = filterValues.year;
    }

    return query;
  }, []);

  const getTabFilters = useCallback(() => {
    const query = buildQuery(appliedFilters);

    if (activeTab === "import") {
      query.type = "import";
    } else if (activeTab === "export") {
      query.type = "export";
    }

    return query;
  }, [activeTab, appliedFilters, buildQuery]);

  // ==========================================
  // API CALLS
  // ==========================================

  const fetchDashboard = useCallback(async () => {
    try {
      const query = getTabFilters();
      const res = await getDashboard(query);
      setDashboard(getResponseData(res));
    } catch (error) {
      console.error("Dashboard error:", error);
    }
  }, [getTabFilters]);

  const fetchFilters = useCallback(async () => {
    try {
      const res = await getFilterOptions();
      const data = getResponseData(res);

      console.log("FILTER OPTIONS API RESPONSE:", data);
      console.log("BUYERS:", data.buyers);

      setFilterOptions(data);
    } catch (error) {
      console.error("Filter options error:", error);
    }
  }, []);

  const fetchShipments = useCallback(async () => {
    try {
      setLoading(true);

      const query = {
        ...getTabFilters(),
        page,
        limit,
      };

      const res = await getShipments(query);
      const response = res?.data || {};

      const rows = Array.isArray(response.data)
        ? response.data
        : getRecordArray(response.data);

      setShipments(rows);

      const pagination = response.pagination || {};

      setTotalPages(Number(pagination.totalPages || 1));
      setTotalRecords(Number(pagination.totalRecords || 0));
    } catch (error) {
      console.error("Shipment fetch error:", error);

      setShipments([]);
      setTotalPages(1);
      setTotalRecords(0);
    } finally {
      setLoading(false);
    }
  }, [appliedFilters, page, limit, buildQuery, getTabFilters]);

  useEffect(() => {
    fetchFilters();
  }, [fetchFilters]);

  useEffect(() => {
    fetchDashboard();
  }, [fetchDashboard]);

  useEffect(() => {
    fetchShipments();
  }, [fetchShipments]);

  // ==========================================
  // FILTER ACTIONS
  // ==========================================

  const handleApplyFilters = () => {
    setPage(1);
    setAppliedFilters({ ...filters });
  };

  const handleResetFilters = () => {
    setFilters(initialFilters);
    setAppliedFilters(initialFilters);
    setPage(1);
  };

  const handleRefresh = async () => {
    try {
      setRefreshing(true);

      await Promise.all([fetchDashboard(), fetchFilters(), fetchShipments()]);
    } finally {
      setRefreshing(false);
    }
  };

  // ==========================================
  // CSV EXPORT
  // ==========================================

  const handleExport = async () => {
    try {
      setExporting(true);

      const query = getTabFilters();
      const res = await exportReport(query);
      const rows = getRecordArray(getResponseData(res));

      if (!rows.length) {
        alert("No records available to export.");
        return;
      }

      const columns = [
       
        "type",
        "hsCode",
        "productName",
        ...(activeTab !== "export" ? ["importer"] : []),
        ...(activeTab !== "import" ? ["exporter"] : []),
        ...(activeTab !== "export" ? ["supplier"] : []),
        ...(activeTab !== "import" ? ["buyer"] : []),
        "country",
        "quantity",
        "value",
        "month",
        "year",
        "fileName",
        "uploadedAt",
      ];

      const escapeCSV = (value) => {
        const text = value == null ? "" : String(value);
        return `"${text.replace(/"/g, '""')}"`;
      };

      const csv = [
        columns.join(","),
        ...rows.map((row) =>
          columns.map((column) => escapeCSV(row[column])).join(","),
        ),
      ].join("\n");

      const blob = new Blob(["\uFEFF" + csv], {
        type: "text/csv;charset=utf-8;",
      });

      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = url;
      link.download = `shipment-database-${new Date()
        .toISOString()
        .slice(0, 10)}.csv`;

      document.body.appendChild(link);
      link.click();
      link.remove();

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Export error:", error);
      alert("Unable to export shipment report.");
    } finally {
      setExporting(false);
    }
  };

  // ==========================================
  // DISPLAY HELPERS
  // ==========================================

  const goToPage = (nextPage) => {
    if (nextPage < 1 || nextPage > totalPages) return;
    setPage(nextPage);
  };

  const getTypeStyle = (type) =>
    String(type).toLowerCase() === "import"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : "border-blue-200 bg-blue-50 text-blue-700";

  const filterList = (key) =>
    Array.isArray(filterOptions[key]) ? filterOptions[key] : [];

  const startRecord = totalRecords === 0 ? 0 : (page - 1) * limit + 1;

  const endRecord = Math.min(page * limit, totalRecords);

  const totalValue = Number(dashboard.totalValue || 0);
  const importValue = Number(dashboard.totalImportValue || 0);
  const exportValue = Number(dashboard.totalExportValue || 0);

  const importPercentage = totalValue ? (importValue / totalValue) * 100 : 0;

  const exportPercentage = totalValue ? (exportValue / totalValue) * 100 : 0;

  const activeFilterCount =
    Object.entries(appliedFilters).filter(
      ([key, value]) => key !== "search" && value !== initialFilters[key],
    ).length + (appliedFilters.search ? 1 : 0);

  // ==========================================
  // STATS
  // ==========================================

  const stats = [
    {
      title: "Total Shipments",
      value: formatNumber(dashboard.totalShipments),
      subtitle: "Combined trade records",
      icon: Package,
      accent: "bg-blue-600",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      title: "Total Imports",
      value: formatNumber(dashboard.totalImports),
      subtitle: "Import intelligence",
      icon: Download,
      accent: "bg-emerald-500",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      title: "Total Exports",
      value: formatNumber(dashboard.totalExports),
      subtitle: "Export intelligence",
      icon: TrendingUp,
      accent: "bg-indigo-500",
      iconStyle: "bg-indigo-50 text-indigo-600",
    },
    {
      title: "Total Trade Value",
      value: formatCrore(totalValue),
      subtitle: "Combined trade value",
      icon: IndianRupee,
      accent: "bg-amber-500",
      iconStyle: "bg-amber-50 text-amber-600",
    },
    {
      title: "Importers",
      value: formatNumber(dashboard.totalImporters),
      subtitle: "Unique importers",
      icon: Users,
      accent: "bg-violet-500",
      iconStyle: "bg-violet-50 text-violet-600",
    },
    {
      title: "Exporters",
      value: formatNumber(dashboard.totalExporters),
      subtitle: "Unique exporters",
      icon: Truck,
      accent: "bg-cyan-500",
      iconStyle: "bg-cyan-50 text-cyan-600",
    },
    {
      title: "Countries",
      value: formatNumber(dashboard.totalCountries),
      subtitle: "Trade destinations",
      icon: Globe,
      accent: "bg-rose-500",
      iconStyle: "bg-rose-50 text-rose-600",
    },
  ];

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="cm-module-theme min-h-screen bg-[#f4f7fc] px-1 pb-8 pt-14 font-sans text-slate-700 sm:px-1 lg:px-1">
      {/* ================================== */}
      {/* PREMIUM HEADER */}
      {/* ================================== */}

      <section className="relative mb-6 overflow-hidden rounded-[24px] bg-gradient-to-br from-[#102b63] via-[#174b9b] to-[#1674c8] p-5 text-white shadow-[0_12px_35px_rgba(20,65,130,0.20)] sm:p-7 lg:p-8">
        <div className="pointer-events-none absolute -right-12 -top-28 h-80 w-80 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -right-2 -top-16 h-64 w-64 rounded-full border border-white/10" />
        <div className="pointer-events-none absolute -bottom-32 right-[22%] h-72 w-72 rounded-full bg-blue-300/10 blur-3xl" />

        <div className="relative z-10 flex flex-col justify-between gap-6 xl:flex-row xl:items-center">
          <div>
            {/* <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 backdrop-blur-sm">
              <Activity size={13} className="text-cyan-200" />
              <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-50">
                Trade Analytics
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,0.8)]" />
            </div> */}

            <div className="flex items-center gap-3  text-white">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/20 bg-white/10 shadow-inner backdrop-blur-sm">
                <Boxes size={25} />
              </div>

              <div className=" text-white">
                <h1 className="font-extrabold text-blue-100 text-2xl tracking-tight sm:text-3xl">
                  Shipment Database
                </h1>
                <p className="mt-1 text-xs text-blue-100 sm:text-sm">
                  Unified global import & export intelligence platform
                </p>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <Database size={14} className="text-cyan-200" />
                <span className="text-[11px] font-semibold">
                  {formatNumber(dashboard.totalShipments)} Total Records
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <ArrowDownRight size={14} className="text-emerald-300" />
                <span className="text-[11px] font-semibold">
                  {formatNumber(dashboard.totalImports)} Imports
                </span>
              </div>

              <div className="flex items-center gap-2 rounded-xl border border-white/15 bg-white/10 px-3 py-2 backdrop-blur-sm">
                <ArrowUpRight size={14} className="text-cyan-200" />
                <span className="text-[11px] font-semibold">
                  {formatNumber(dashboard.totalExports)} Exports
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={refreshing}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-xs font-bold text-white backdrop-blur-sm transition hover:bg-white/20 disabled:opacity-60"
            >
              <RefreshCw
                size={15}
                className={refreshing ? "animate-spin" : ""}
              />
              {refreshing ? "Refreshing..." : "Refresh Data"}
            </button>

            {/* <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-xs font-extrabold text-blue-800 shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:bg-blue-50 disabled:opacity-60"
            >
              {exporting ? (
                <RefreshCw size={15} className="animate-spin" />
              ) : (
                <FileDown size={16} />
              )}
              {exporting ? "Exporting..." : "Export Report"}
            </button> */}
          </div>
        </div>

        {/* <div className="relative z-10 mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-white/15 pt-4">
          <div className="flex items-center gap-2 text-[11px] text-blue-100">
            <CheckCircle2 size={14} className="text-emerald-300" />
            Import Intelligence + Export Intelligence
          </div>

          <div className="text-[10px] font-medium tracking-wide text-blue-100/80">
            UNIFIED TRADE OVERVIEW
          </div>
        </div> */}
      </section>

      {/* ================================== */}
      {/* IMPORT / EXPORT TABS */}
      {/* ================================== */}

      <section className="mb-6">
        <div className="flex flex-col justify-between gap-4 rounded-2xl border border-slate-200/80 bg-white p-3 shadow-[0_3px_15px_rgba(15,23,42,0.035)] sm:flex-row sm:items-center">
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">
              Shipment Intelligence
            </h2>
            <p className="mt-1 text-[11px] text-slate-400">
              Select the trade category you want to explore
            </p>
          </div>

          <div className="grid grid-cols-3 gap-2 rounded-xl bg-slate-100 p-1.5">
            <button
              onClick={() => {
                setActiveTab("all");
                setPage(1);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
                activeTab === "all"
                  ? "bg-white text-blue-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Layers size={15} />
              All Shipments
            </button>

            <button
              onClick={() => {
                setActiveTab("import");
                setPage(1);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
                activeTab === "import"
                  ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20"
                  : "text-slate-500 hover:text-emerald-700"
              }`}
            >
              <ArrowDownRight size={16} />
              Imports
            </button>

            <button
              onClick={() => {
                setActiveTab("export");
                setPage(1);
              }}
              className={`flex items-center justify-center gap-2 rounded-lg px-3 py-3 text-[11px] font-extrabold transition-all sm:px-5 ${
                activeTab === "export"
                  ? "bg-blue-700 text-white shadow-md shadow-blue-700/20"
                  : "text-slate-500 hover:text-blue-700"
              }`}
            >
              <ArrowUpRight size={16} />
              Exports
            </button>
          </div>
        </div>
      </section>

      {/* ================================== */}
      {/* KPI CARDS */}
      {/* ================================== */}

      <section className="mb-6">
        <div className="mb-3 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-extrabold text-slate-800">
              {activeTab === "import"
                ? "Import Overview"
                : activeTab === "export"
                  ? "Export Overview"
                  : "Trade Overview"}
            </h2>

            <p className="mt-0.5 text-[11px] text-slate-400">
              {activeTab === "import"
                ? "Import shipment performance indicators"
                : activeTab === "export"
                  ? "Export shipment performance indicators"
                  : "Combined import and export performance indicators"}
            </p>
          </div>

          <span className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[10px] font-bold text-slate-500">
            LIVE SUMMARY
          </span>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          {stats.map((item) => (
            <StatCard key={item.title} {...item} />
          ))}
        </div>
      </section>

      {/* ================================== */}
      {/* TRADE VALUE COMPARISON */}
      {/* ================================== */}

      <section className="mb-6">
        <div className="mb-3">
          <h2 className="text-sm font-extrabold text-slate-800">
            {activeTab === "import"
              ? "Import Value Analysis"
              : activeTab === "export"
                ? "Export Value Analysis"
                : "Trade Value Analysis"}
          </h2>
          <p className="mt-0.5 text-[11px] text-slate-400">
            Import and export value contribution
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          {activeTab !== "export" && (
            <ValueCard
              title="Total Import Value"
              value={formatCrore(importValue)}
              subtitle="Combined import assessment value"
              icon={ArrowDownRight}
              theme="bg-emerald-50 text-emerald-600"
              percentage={importPercentage}
            />
          )}

          {activeTab !== "import" && (
            <ValueCard
              title="Total Export Value"
              value={formatCrore(exportValue)}
              subtitle="Combined export trade value"
              icon={ArrowUpRight}
              theme="bg-blue-50 text-blue-600"
              percentage={exportPercentage}
            />
          )}

          <ValueCard
            title={
              activeTab === "import"
                ? "Average Import Value"
                : activeTab === "export"
                  ? "Average Export Value"
                  : "Average Shipment Value"
            }
            value={formatCurrency(dashboard.avgShipmentValue)}
            subtitle="Average value per shipment record"
            icon={IndianRupee}
            theme="bg-amber-50 text-amber-600"
          />
        </div>
      </section>

      {/* ================================== */}
      {/* SEARCH & FILTERS */}
      {/* ================================== */}

      <section className="mb-6 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_15px_rgba(15,23,42,0.035)]">
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
              <SlidersHorizontal size={19} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-800">
                Search & Filters
              </h2>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Find shipment records using multiple parameters
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {activeFilterCount > 0 && (
              <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-[10px] font-bold text-blue-700">
                {activeFilterCount} Active Filters
              </span>
            )}

            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <RotateCcw size={13} />
              Reset Filters
            </button>
          </div>
        </div>

        <div className="p-5">
          <div className="mb-4">
            <label className="mb-1.5 block text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500">
              Global Search
            </label>

            <div className="relative">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                value={filters.search}
                onChange={(e) => updateFilter("search", e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") handleApplyFilters();
                }}
                placeholder="Search HS code, product, importer, exporter, supplier..."
                className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-11 pr-4 text-xs font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
              />
            </div>
          </div>

          <div className="mb-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <FilterSelect
              label="Shipment Type"
              value={filters.type}
              onChange={(v) => updateFilter("type", v)}
              options={filterList("types")}
              allLabel="All Types"
            />

            <FilterSelect
              label="Country"
              value={filters.country}
              onChange={(v) => updateFilter("country", v)}
              options={filterList("countries")}
              allLabel="All Countries"
            />

            <FilterSelect
              label="HS Code"
              value={filters.hsCode}
              onChange={(v) => updateFilter("hsCode", v)}
              options={filterList("hsCodes")}
              allLabel="All HS Codes"
            />

            {activeTab !== "export" && (
              <FilterSelect
                label="Importer"
                value={filters.importer}
                onChange={(v) => updateFilter("importer", v)}
                options={filterList("importers")}
                allLabel="All Importers"
              />
            )}

            {activeTab !== "import" && (
              <FilterSelect
                label="Exporter"
                value={filters.exporter}
                onChange={(v) => updateFilter("exporter", v)}
                options={filterList("exporters")}
                allLabel="All Exporters"
              />
            )}

            {activeTab !== "export" && (
              <FilterSelect
                label="Supplier"
                value={filters.supplier}
                onChange={(v) => updateFilter("supplier", v)}
                options={filterList("suppliers")}
                allLabel="All Suppliers"
              />
            )}

            {activeTab !== "import" && (
              <FilterSelect
                label="Buyer"
                value={filters.buyer}
                onChange={(v) => updateFilter("buyer", v)}
                options={filterList("buyers")}
                allLabel="All Buyers"
              />
            )}

            <FilterSelect
              label="Month"
              value={filters.month}
              onChange={(v) => updateFilter("month", v)}
              options={filterList("months")}
              allLabel="All Months"
            />

            <FilterSelect
              label="Year"
              value={filters.year}
              onChange={(v) => updateFilter("year", v)}
              options={filterList("years")}
              allLabel="All Years"
            />
          </div>

          <div className="flex flex-col justify-between gap-3 border-t border-slate-100 pt-4 sm:flex-row sm:items-center">
            <p className="text-[11px] text-slate-400">
              Select your criteria and apply filters to update the dashboard.
            </p>

            <button
              onClick={handleApplyFilters}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-700 to-blue-600 px-7 text-xs font-extrabold text-white shadow-lg shadow-blue-600/20 transition hover:-translate-y-0.5 hover:shadow-blue-600/30"
            >
              <Filter size={15} />
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* ================================== */}
      {/* SHIPMENT TABLE */}
      {/* ================================== */}

      <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_18px_rgba(15,23,42,0.045)]">
        {/* Table Header */}
        <div className="flex flex-col justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
              <Ship size={19} />
            </div>

            <div>
              <h2 className="text-sm font-extrabold text-slate-800">
                {activeTab === "import"
                  ? "Import Shipment Records"
                  : activeTab === "export"
                    ? "Export Shipment Records"
                    : "All Shipment Records"}
              </h2>

              <p className="mt-0.5 text-[11px] text-slate-400">
                {formatNumber(totalRecords)} matching records found
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2">
              <span className="text-[10px] font-semibold text-slate-500">
                Rows
              </span>

              <select
                value={limit}
                onChange={(e) => {
                  setLimit(Number(e.target.value));
                  setPage(1);
                }}
                className="bg-transparent text-xs font-bold text-slate-700 outline-none"
              >
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </select>
            </div>

            {/* <button
              onClick={handleExport}
              disabled={exporting}
              className="inline-flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-[11px] font-bold text-emerald-700 transition hover:bg-emerald-100 disabled:opacity-60"
            >
              <FileSpreadsheet size={14} />
              Export CSV
            </button> */}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
        <table className="w-full min-w-[1250px] border-collapse text-left">
            <thead>
              <tr className="border-b border-slate-200 bg-[#f7f9fd]">
                {[
                
                  "Type",
                  "HS Code",
                  "Product Description",
                  ...(activeTab !== "export" ? ["Importer"] : []),
                  ...(activeTab !== "import" ? ["Exporter"] : []),
                  ...(activeTab !== "export" ? ["Supplier"] : []),
                  ...(activeTab !== "import" ? ["Buyer"] : []),
                  "Country",
                  "Quantity",
                  "Value (INR)",
                  "Month / Year",
                  "Uploaded",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="whitespace-nowrap px-4 py-4 text-[10px] font-extrabold uppercase tracking-[0.07em] text-slate-500"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan="11" className="py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
                        <RefreshCw size={22} className="animate-spin" />
                      </div>

                      <div>
                        <p className="text-xs font-bold text-slate-700">
                          Loading shipment records
                        </p>
                        <p className="mt-1 text-[11px] text-slate-400">
                          Please wait while we fetch your data...
                        </p>
                      </div>
                    </div>
                  </td>
                </tr>
              ) : shipments.length > 0 ? (
                shipments.map((row, index) => (
                  <tr
                    // key={row._id || row.shipmentId || index}
                    className="group transition-colors hover:bg-blue-50/50"
                  >
                    

                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-[10px] font-extrabold ${getTypeStyle(
                          row.type,
                        )}`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-current" />
                        {row.type || "-"}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[11px] font-bold text-slate-700">
                      {row.hsCode || "-"}
                    </td>

                    <td
                      className="max-w-[220px] truncate px-4 py-4 text-[11px] font-semibold text-slate-600"
                      title={row.productName || ""}
                    >
                      {row.productName || "-"}
                    </td>

                    {activeTab !== "export" && (
                      <td
                        className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
                        title={row.importer || ""}
                      >
                        {row.importer || "-"}
                      </td>
                    )}

                    {activeTab !== "import" && (
                      <td
                        className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
                        title={row.exporter || ""}
                      >
                        {row.exporter || "-"}
                      </td>
                    )}

                    {activeTab !== "export" && (
                      <td
                        className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
                        title={row.supplier || ""}
                      >
                        {row.supplier || "-"}
                      </td>
                    )}

                    {activeTab !== "import" && (
                      <td
                        className="max-w-[180px] truncate px-4 py-4 text-[11px] text-slate-600"
                        title={row.buyer || row.Cosignee || ""}
                      >
                        {row.buyer || row.Cosignee || "-"}
                      </td>
                    )}

                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                          <Globe size={13} />
                        </div>

                        <span className="text-[11px] font-medium text-slate-600">
                          {row.country || "-"}
                        </span>
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right text-[11px] font-semibold text-slate-600">
                      {row.quantity == null ? "-" : formatNumber(row.quantity)}
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-right">
                      <span className="text-[11px] font-extrabold text-slate-800">
                        {formatCurrency(row.value)}
                      </span>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4">
                      <div className="flex items-center gap-1.5 text-[11px] font-medium text-slate-600">
                        <CalendarDays size={13} className="text-slate-400" />
                        {getMonthName(row.month)} {row.year || ""}
                      </div>
                    </td>

                    <td className="whitespace-nowrap px-4 py-4 text-[11px] text-slate-500">
                      {formatDate(row.uploadedAt)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                 colSpan={10 + (activeTab === "all" ? 2 : 1)}
                    className="py-20 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
                        <Package size={26} />
                      </div>

                      <p className="text-sm font-extrabold text-slate-700">
                        No shipment records found
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Try changing your search criteria or resetting filters.
                      </p>

                      <button
                        onClick={handleResetFilters}
                        className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 text-[11px] font-bold text-blue-700 transition hover:bg-blue-100"
                      >
                        <RotateCcw size={13} />
                        Clear Filters
                      </button>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* ================================== */}
        {/* PAGINATION */}
        {/* ================================== */}

        <div className="flex flex-col justify-between gap-3 border-t border-slate-100 bg-[#fbfcfe] px-5 py-4 sm:flex-row sm:items-center">
          <p className="text-[11px] text-slate-500">
            Showing{" "}
            <span className="font-extrabold text-slate-800">{startRecord}</span>{" "}
            to{" "}
            <span className="font-extrabold text-slate-800">{endRecord}</span>{" "}
            of{" "}
            <span className="font-extrabold text-slate-800">
              {formatNumber(totalRecords)}
            </span>{" "}
            records
          </p>

          <div className="flex items-center gap-1.5">
            <button
              onClick={() => goToPage(1)}
              disabled={page <= 1 || loading}
              className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
            >
              First
            </button>

            <button
              onClick={() => goToPage(page - 1)}
              disabled={page <= 1 || loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronLeft size={16} />
            </button>

            <span className="flex h-9 min-w-[76px] items-center justify-center rounded-lg bg-blue-700 px-3 text-[11px] font-extrabold text-white shadow-md shadow-blue-700/15">
              {page} / {totalPages}
            </span>

            <button
              onClick={() => goToPage(page + 1)}
              disabled={page >= totalPages || loading}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ChevronRight size={16} />
            </button>

            <button
              onClick={() => goToPage(totalPages)}
              disabled={page >= totalPages || loading}
              className="hidden h-9 rounded-lg border border-slate-200 bg-white px-3 text-[10px] font-bold text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 sm:block"
            >
              Last
            </button>
          </div>
        </div>
      </section>

      {/* ================================== */}
      {/* FOOTER */}
      {/* ================================== */}

      <div className="mt-5 flex flex-col justify-between gap-2 px-1 text-[10px] text-slate-400 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <Database size={13} />
          <span>
            Data sourced from Import Intelligence and Export Intelligence
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Layers size={13} />
          <span>Unified Shipment Database</span>
          <span className="text-slate-300">|</span>
          <span>Trade Analytics</span>
        </div>
      </div>
    </div>
  );
}