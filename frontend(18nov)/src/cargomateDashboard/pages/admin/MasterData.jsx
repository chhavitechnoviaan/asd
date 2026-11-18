// // import React, { useState, useMemo } from "react";
// // import ReactCountryFlag from "react-country-flag";
// // import Swal from "sweetalert2";
// // import {
// //   Search,
// //   Globe,
// //   Anchor,
// //   Building2,
// //   RotateCcw,
// //   Plus,
// //   Upload,
// //   LayoutGrid,
// //   Eye,
// //   Edit2,
// //   X,
// //   Check,
// //   Download,
// //   Calendar,
// //   ChevronLeft,
// //   ChevronRight,
// //   ChevronDown,
// //   UploadCloud,
// //   Info,
// //   FileText
// // } from "lucide-react";

// // // ISO Country Code mapping for flag rendering
// // const countryCodes = {
// //   India: "IN",
// //   China: "CN",
// //   Germany: "DE",
// //   USA: "US",
// //   "United States": "US",
// //   UAE: "AE",
// //   "Saudi Arabia": "SA",
// //   Switzerland: "CH",
// //   Bangladesh: "BD",
// //   Brazil: "BR",
// //   Russia: "RU",
// //   Japan: "JP",
// //   France: "FR",
// //   Singapore: "SG",
// //   Australia: "AU",
// //   "South Korea": "KR",
// //   Sweden: "SE",
// //   Belgium: "BE",
// //   "United Kingdom": "GB",
// //   UK: "GB",
// //   Italy: "IT",
// //   Netherlands: "NL",
// //   Vietnam: "VN",
// //   Malaysia: "MY",
// //   Thailand: "TH",
// //   Canada: "CA",
// // };

// // // Initial realistic dataset matching the exact screenshot records
// // const initialShipmentRecords = [
// //   {
// //     _id: "SHIP001",
// //     hsCode: "84713010",
// //     description: "Dell Latitude Business Laptop",
// //     importer: "TechNova India Pvt Ltd",
// //     exporter: "Dell Technologies USA",
// //     originCountry: "United States",
// //     destinationCountry: "India",
// //     portOfLoading: "New York",
// //     portOfDischarge: "Mumbai",
// //     shipDate: "2026-08-05",
// //     arrivalDate: "2026-08-20",
// //     value: 24500000,
// //     status: "Delivered",
// //   },
// //   {
// //     _id: "SHIP002",
// //     hsCode: "85171300",
// //     description: "Smartphone Devices",
// //     importer: "Reliance Digital India",
// //     exporter: "Samsung Electronics",
// //     originCountry: "South Korea",
// //     destinationCountry: "India",
// //     portOfLoading: "Busan",
// //     portOfDischarge: "Chennai",
// //     shipDate: "2026-08-10",
// //     arrivalDate: "2026-08-27",
// //     value: 18200000,
// //     status: "In Transit",
// //   },
// //   {
// //     _id: "SHIP003",
// //     hsCode: "87032300",
// //     description: "Passenger Motor Vehicles",
// //     importer: "Tata Motors Limited",
// //     exporter: "Toyota Motor Corporation",
// //     originCountry: "Japan",
// //     destinationCountry: "India",
// //     portOfLoading: "Yokohama",
// //     portOfDischarge: "Mumbai",
// //     shipDate: "2026-07-28",
// //     arrivalDate: "2026-08-25",
// //     value: 68500000,
// //     status: "In Transit",
// //   },
// //   {
// //     _id: "SHIP004",
// //     hsCode: "85044090",
// //     description: "Industrial Power Transformer",
// //     importer: "Adani Power Limited",
// //     exporter: "Siemens Germany",
// //     originCountry: "Germany",
// //     destinationCountry: "India",
// //     portOfLoading: "Hamburg",
// //     portOfDischarge: "Mundra",
// //     shipDate: "2026-08-01",
// //     arrivalDate: "2026-08-18",
// //     value: 32600000,
// //     status: "Delivered",
// //   },
// //   {
// //     _id: "SHIP005",
// //     hsCode: "30049099",
// //     description: "Medicines and Pharmaceuticals",
// //     importer: "Sun Pharma Industries",
// //     exporter: "Pfizer Inc.",
// //     originCountry: "United States",
// //     destinationCountry: "India",
// //     portOfLoading: "Los Angeles",
// //     portOfDischarge: "Nhava Sheva",
// //     shipDate: "2026-08-12",
// //     arrivalDate: "2026-08-30",
// //     value: 12800000,
// //     status: "In Transit",
// //   },
// //   {
// //     _id: "SHIP006",
// //     hsCode: "94036000",
// //     description: "Premium Wooden Office Furniture",
// //     importer: "Urban Living India",
// //     exporter: "IKEA Sweden",
// //     originCountry: "Sweden",
// //     destinationCountry: "India",
// //     portOfLoading: "Gothenburg",
// //     portOfDischarge: "Chennai",
// //     shipDate: "2026-08-08",
// //     arrivalDate: "2026-08-29",
// //     value: 7600000,
// //     status: "Pending",
// //   },
// //   {
// //     _id: "SHIP007",
// //     hsCode: "85423100",
// //     description: "Electronic Integrated Circuits",
// //     importer: "Wipro Technologies",
// //     exporter: "Intel Corporation",
// //     originCountry: "United States",
// //     destinationCountry: "India",
// //     portOfLoading: "San Francisco",
// //     portOfDischarge: "Mumbai",
// //     shipDate: "2026-07-30",
// //     arrivalDate: "2026-08-22",
// //     value: 41500000,
// //     status: "Delivered",
// //   },
// //   {
// //     _id: "SHIP008",
// //     hsCode: "62034200",
// //     description: "Men's Cotton Apparel",
// //     importer: "Reliance Retail",
// //     exporter: "H&M Sweden",
// //     originCountry: "Sweden",
// //     destinationCountry: "India",
// //     portOfLoading: "Stockholm",
// //     portOfDischarge: "Nhava Sheva",
// //     shipDate: "2026-08-03",
// //     arrivalDate: "2026-08-21",
// //     value: 9400000,
// //     status: "In Transit",
// //   },
// //   {
// //     _id: "SHIP009",
// //     hsCode: "10063020",
// //     description: "Basmati Rice Export Consignment",
// //     importer: "Al Maya Group UAE",
// //     exporter: "KRBL Limited India",
// //     originCountry: "India",
// //     destinationCountry: "UAE",
// //     portOfLoading: "Kandla",
// //     portOfDischarge: "Jebel Ali",
// //     shipDate: "2026-08-14",
// //     arrivalDate: "2026-08-24",
// //     value: 15600000,
// //     status: "Delivered",
// //   },
// //   {
// //     _id: "SHIP010",
// //     hsCode: "84148090",
// //     description: "Industrial Rotary Air Compressors",
// //     importer: "L&T Heavy Engineering",
// //     exporter: "Atlas Copco Belgium",
// //     originCountry: "Belgium",
// //     destinationCountry: "India",
// //     portOfLoading: "Antwerp",
// //     portOfDischarge: "Chennai",
// //     shipDate: "2026-07-25",
// //     arrivalDate: "2026-08-19",
// //     value: 28900000,
// //     status: "In Transit",
// //   },
// // ];

// // // Available columns for toggle
// // const allColumns = [
// //   { key: "hsCode", label: "HS CODE" },
// //   { key: "description", label: "PRODUCT DESCRIPTION" },
// //   { key: "importer", label: "IMPORTER" },
// //   { key: "exporter", label: "EXPORTER" },
// //   { key: "originCountry", label: "ORIGIN" },
// //   { key: "destinationCountry", label: "DESTINATION" },
// //   { key: "portOfLoading", label: "PORT OF LOADING" },
// //   { key: "portOfDischarge", label: "PORT OF DISCHARGE" },
// //   { key: "shipDate", label: "SHIP DATE" },
// //   { key: "arrivalDate", label: "ARRIVAL DATE" },
// //   { key: "value", label: "VALUE (INR)" },
// //   { key: "actions", label: "ACTIONS" },
// // ];

// // export default function MasterData() {
// //   const [records, setRecords] = useState(initialShipmentRecords);

// //   // Filter form states
// //   const [filterInputs, setFilterInputs] = useState({
// //     search: "",
// //     originCountry: "All Countries",
// //     destinationCountry: "All Countries",
// //     importer: "All Importers",
// //     exporter: "All Exporters",
// //     portOfLoading: "All Ports",
// //   });

// //   const [appliedFilters, setAppliedFilters] = useState({
// //     search: "",
// //     originCountry: "All Countries",
// //     destinationCountry: "All Countries",
// //     importer: "All Importers",
// //     exporter: "All Exporters",
// //     portOfLoading: "All Ports",
// //   });

// //   // Table controls (Default 6 records to match screenshot exactly)
// //   const [pageSize, setPageSize] = useState(6);
// //   const [currentPage, setCurrentPage] = useState(1);
// //   const [visibleColumns, setVisibleColumns] = useState(
// //     allColumns.reduce((acc, col) => ({ ...acc, [col.key]: true }), {})
// //   );
// //   const [showColumnsDropdown, setShowColumnsDropdown] = useState(false);

// //   // Modal States
// //   const [showAddModal, setShowAddModal] = useState(false);
// //   const [showBulkModal, setShowBulkModal] = useState(false);
// //   const [viewingRecord, setViewingRecord] = useState(null);
// //   const [editingRecord, setEditingRecord] = useState(null);

// //   // Form State for "Add New Record" / "Edit Record"
// //   const [recordForm, setRecordForm] = useState({
// //     hsCode: "",
// //     description: "",
// //     importer: "",
// //     exporter: "",
// //     originCountry: "",
// //     destinationCountry: "",
// //     portOfLoading: "",
// //     portOfDischarge: "",
// //     shipDate: "",
// //     arrivalDate: "",
// //     value: "",
// //     status: "In Transit",
// //   });

// //   // Bulk Upload state
// //   const [uploadedFile, setUploadedFile] = useState(null);
// //   const [isDragging, setIsDragging] = useState(false);

// //   // Format Value in INR matching screenshot (e.g. ₹ 2.45 Cr, ₹ 1.82 Cr)
// //   const formatValueINR = (val) => {
// //     if (typeof val === "string" && val.includes("₹")) return val;
// //     const num = Number(val);
// //     if (isNaN(num)) return val ? `₹ ${val}` : "₹ 0.00";
// //     if (num >= 10000000) {
// //       return `₹ ${(num / 10000000).toFixed(2)} Cr`;
// //     }
// //     if (num >= 100000) {
// //       return `₹ ${(num / 100000).toFixed(2)} L`;
// //     }
// //     return `₹ ${num.toLocaleString("en-IN")}`;
// //   };

// //   // Format Date matching screenshot (e.g. 05 Aug 2026)
// //   const formatDate = (dateStr) => {
// //     if (!dateStr) return "-";
// //     const d = new Date(dateStr);
// //     if (isNaN(d.getTime())) return dateStr;
// //     const day = String(d.getDate()).padStart(2, "0");
// //     const monthNames = [
// //       "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
// //       "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
// //     ];
// //     return `${day} ${monthNames[d.getMonth()]} ${d.getFullYear()}`;
// //   };

// //   // Unique options for filter dropdowns
// //   const uniqueOrigins = useMemo(() => {
// //     const list = Array.from(new Set(records.map((r) => r.originCountry).filter(Boolean)));
// //     return ["All Countries", ...list.sort()];
// //   }, [records]);

// //   const uniqueDests = useMemo(() => {
// //     const list = Array.from(new Set(records.map((r) => r.destinationCountry).filter(Boolean)));
// //     return ["All Countries", ...list.sort()];
// //   }, [records]);

// //   const uniqueImporters = useMemo(() => {
// //     const list = Array.from(new Set(records.map((r) => r.importer).filter(Boolean)));
// //     return ["All Importers", ...list.sort()];
// //   }, [records]);

// //   const uniqueExporters = useMemo(() => {
// //     const list = Array.from(new Set(records.map((r) => r.exporter).filter(Boolean)));
// //     return ["All Exporters", ...list.sort()];
// //   }, [records]);

// //   const uniquePorts = useMemo(() => {
// //     const list = Array.from(new Set(records.map((r) => r.portOfLoading).filter(Boolean)));
// //     return ["All Ports", ...list.sort()];
// //   }, [records]);

// //   // Apply filters
// //   const handleApplyFilters = () => {
// //     setAppliedFilters({ ...filterInputs });
// //     setCurrentPage(1);
// //   };

// //   // Reset filters
// //   const handleResetFilters = () => {
// //     const reset = {
// //       search: "",
// //       originCountry: "All Countries",
// //       destinationCountry: "All Countries",
// //       importer: "All Importers",
// //       exporter: "All Exporters",
// //       portOfLoading: "All Ports",
// //     };
// //     setFilterInputs(reset);
// //     setAppliedFilters(reset);
// //     setCurrentPage(1);
// //   };

// //   // Filter records based on appliedFilters
// //   const filteredRecords = useMemo(() => {
// //     return records.filter((r) => {
// //       if (appliedFilters.search.trim()) {
// //         const q = appliedFilters.search.toLowerCase();
// //         const matchHs = (r.hsCode || "").toLowerCase().includes(q);
// //         const matchDesc = (r.description || "").toLowerCase().includes(q);
// //         const matchId = (r._id || "").toLowerCase().includes(q);
// //         if (!matchHs && !matchDesc && !matchId) return false;
// //       }
// //       if (
// //         appliedFilters.originCountry !== "All Countries" &&
// //         r.originCountry !== appliedFilters.originCountry
// //       ) {
// //         return false;
// //       }
// //       if (
// //         appliedFilters.destinationCountry !== "All Countries" &&
// //         r.destinationCountry !== appliedFilters.destinationCountry
// //       ) {
// //         return false;
// //       }
// //       if (
// //         appliedFilters.importer !== "All Importers" &&
// //         r.importer !== appliedFilters.importer
// //       ) {
// //         return false;
// //       }
// //       if (
// //         appliedFilters.exporter !== "All Exporters" &&
// //         r.exporter !== appliedFilters.exporter
// //       ) {
// //         return false;
// //       }
// //       if (
// //         appliedFilters.portOfLoading !== "All Ports" &&
// //         r.portOfLoading !== appliedFilters.portOfLoading
// //       ) {
// //         return false;
// //       }
// //       return true;
// //     });
// //   }, [records, appliedFilters]);

// //   // Pagination calculation
// //   const totalRecords = filteredRecords.length;
// //   const totalPages = Math.ceil(totalRecords / pageSize) || 1;
// //   const startIndex = (currentPage - 1) * pageSize;
// //   const paginatedRecords = filteredRecords.slice(startIndex, startIndex + pageSize);

// //   // Column visibility toggle
// //   const toggleColumn = (key) => {
// //     setVisibleColumns((prev) => ({ ...prev, [key]: !prev[key] }));
// //   };

// //   // Open Add Record Modal
// //   const handleOpenAddModal = () => {
// //     setEditingRecord(null);
// //     setRecordForm({
// //       hsCode: "",
// //       description: "",
// //       importer: "",
// //       exporter: "",
// //       originCountry: "",
// //       destinationCountry: "",
// //       portOfLoading: "",
// //       portOfDischarge: "",
// //       shipDate: "",
// //       arrivalDate: "",
// //       value: "",
// //       status: "In Transit",
// //     });
// //     setShowAddModal(true);
// //   };

// //   // Open Edit Modal
// //   const handleEditClick = (rec) => {
// //     setEditingRecord(rec);
// //     setRecordForm({
// //       hsCode: rec.hsCode || "",
// //       description: rec.description || "",
// //       importer: rec.importer || "",
// //       exporter: rec.exporter || "",
// //       originCountry: rec.originCountry || "",
// //       destinationCountry: rec.destinationCountry || "",
// //       portOfLoading: rec.portOfLoading || "",
// //       portOfDischarge: rec.portOfDischarge || "",
// //       shipDate: rec.shipDate || "",
// //       arrivalDate: rec.arrivalDate || "",
// //       value: rec.value || "",
// //       status: rec.status || "In Transit",
// //     });
// //     setShowAddModal(true);
// //   };

// //   // Save Record (Add or Update)
// //   const handleSaveRecord = (e) => {
// //     e.preventDefault();
// //     if (!recordForm.hsCode.trim() || !recordForm.description.trim()) {
// //       Swal.fire({
// //         icon: "warning",
// //         title: "Required Fields",
// //         text: "Please provide both HS Code and Product Description.",
// //       });
// //       return;
// //     }

// //     if (editingRecord) {
// //       setRecords((prev) =>
// //         prev.map((r) =>
// //           r._id === editingRecord._id
// //             ? { ...r, ...recordForm, value: Number(recordForm.value) || recordForm.value }
// //             : r
// //         )
// //       );
// //       Swal.fire({
// //         icon: "success",
// //         title: "Record Updated",
// //         text: "The master data record has been successfully updated.",
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });
// //     } else {
// //       const newId = `SHIP${String(records.length + 1).padStart(3, "0")}`;
// //       const newRec = {
// //         _id: newId,
// //         ...recordForm,
// //         value: Number(recordForm.value) || recordForm.value,
// //       };
// //       setRecords((prev) => [newRec, ...prev]);
// //       Swal.fire({
// //         icon: "success",
// //         title: "Record Added",
// //         text: "The new master data record has been successfully saved.",
// //         timer: 1500,
// //         showConfirmButton: false,
// //       });
// //     }

// //     setShowAddModal(false);
// //     setEditingRecord(null);
// //   };

// //   // Download CSV Template
// //   const handleDownloadTemplate = () => {
// //     const headers = [
// //       "hsCode",
// //       "description",
// //       "importer",
// //       "exporter",
// //       "originCountry",
// //       "destinationCountry",
// //       "portOfLoading",
// //       "portOfDischarge",
// //       "shipDate",
// //       "arrivalDate",
// //       "value",
// //       "status"
// //     ];
// //     const sampleRow = [
// //       "84713010",
// //       "Dell Latitude Business Laptop",
// //       "TechNova India Pvt Ltd",
// //       "Dell Technologies USA",
// //       "United States",
// //       "India",
// //       "New York",
// //       "Mumbai",
// //       "2026-08-05",
// //       "2026-08-20",
// //       "24500000",
// //       "Delivered"
// //     ];
// //     const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), sampleRow.join(",")].join("\n");
// //     const encodedUri = encodeURI(csvContent);
// //     const link = document.createElement("a");
// //     link.setAttribute("href", encodedUri);
// //     link.setAttribute("download", "master_data_template.csv");
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   // CSV Validation & Import
// //   const handleValidateCSV = () => {
// //     if (!uploadedFile) {
// //       Swal.fire({
// //         icon: "warning",
// //         title: "No File Selected",
// //         text: "Please select or drop a CSV file to validate.",
// //       });
// //       return;
// //     }

// //     const reader = new FileReader();
// //     reader.onload = (e) => {
// //       try {
// //         const text = e.target.result;
// //         const lines = text.split(/\r\n|\n/).filter((line) => line.trim() !== "");
// //         if (lines.length <= 1) {
// //           Swal.fire({
// //             icon: "warning",
// //             title: "Empty CSV",
// //             text: "The CSV file does not contain any data rows.",
// //           });
// //           return;
// //         }

// //         const newRecords = [];
// //         for (let i = 1; i < lines.length; i++) {
// //           const cols = lines[i].split(",").map((c) => c.trim().replace(/^["']|["']$/g, ""));
// //           if (cols.length >= 2) {
// //             newRecords.push({
// //               _id: `CSV-${Date.now()}-${i}`,
// //               hsCode: cols[0] || "84713010",
// //               description: cols[1] || "Imported Product",
// //               importer: cols[2] || "Sample Importer",
// //               exporter: cols[3] || "Sample Exporter",
// //               originCountry: cols[4] || "United States",
// //               destinationCountry: cols[5] || "India",
// //               portOfLoading: cols[6] || "New York",
// //               portOfDischarge: cols[7] || "Mumbai",
// //               shipDate: cols[8] || new Date().toISOString().split("T")[0],
// //               arrivalDate: cols[9] || new Date(Date.now() + 15 * 86400000).toISOString().split("T")[0],
// //               value: Number(cols[10]) || 15000000,
// //               status: cols[11] || "Delivered",
// //             });
// //           }
// //         }

// //         setRecords((prev) => [...newRecords, ...prev]);
// //         setUploadedFile(null);
// //         setShowBulkModal(false);

// //         Swal.fire({
// //           icon: "success",
// //           title: "Import Successful",
// //           text: `Successfully validated and imported ${newRecords.length} records.`,
// //           timer: 1800,
// //           showConfirmButton: false,
// //         });
// //       } catch (err) {
// //         Swal.fire({
// //           icon: "error",
// //           title: "CSV Parse Error",
// //           text: "Failed to parse the CSV file. Please make sure it follows the template format.",
// //         });
// //       }
// //     };
// //     reader.readAsText(uploadedFile);
// //   };

// //   return (
// //     <div className="cm-admin-teal-page w-full max-w-full space-y-2 text-slate-800">
// //       {/* 1. Header with Title and Top Buttons */}
// //       <div className="flex flex-wrap items-center justify-between gap-3">
// //         <div>
// //           <h1 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight leading-tight">
// //             Master Data
// //           </h1>
// //           <p className="text-[11px] text-gray-500">
// //             Manage import, export and shipment records.
// //           </p>
// //         </div>

// //         <div className="flex items-center gap-2.5 shrink-0">
// //           {/* Add New Button */}
// //           <button
// //             onClick={handleOpenAddModal}
// //             className="flex items-center gap-1.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
// //           >
// //             <Plus size={16} />
// //             <span>Add New</span>
// //           </button>

// //           {/* Bulk Upload CSV Button */}
// //           <button
// //             onClick={() => {
// //               setUploadedFile(null);
// //               setShowBulkModal(true);
// //             }}
// //             className="flex items-center gap-1.5 border border-[#00897B] text-[#00897B] hover:bg-teal-50/70 bg-white text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-lg transition-colors shadow-xs cursor-pointer"
// //           >
// //             <Upload size={15} />
// //             <span>Bulk Upload CSV</span>
// //           </button>
// //         </div>
// //       </div>

// //       {/* 2. Top Filter Bar Card (Compact Single-Row Design) */}
// //       <div className="bg-white rounded-xl border border-gray-200/90 p-2 shadow-xs w-full overflow-hidden">
// //         <div className="flex flex-wrap xl:flex-nowrap items-end gap-2 w-full">
// //           {/* HS Code / Product / ID */}
// //           <div className="flex-1 min-w-[150px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               HS Code / Product / ID
// //             </label>
// //             <div className="relative">
// //               <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
// //               <input
// //                 type="text"
// //                 value={filterInputs.search}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, search: e.target.value })
// //                 }
// //                 onKeyDown={(e) => {
// //                   if (e.key === "Enter") handleApplyFilters();
// //                 }}
// //                 placeholder="Search HS code, product or ID..."
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-8 pr-2.5 text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B]"
// //               />
// //             </div>
// //           </div>

// //           {/* Origin Country */}
// //           <div className="w-[110px] sm:w-[120px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               Origin Country
// //             </label>
// //             <div className="relative">
// //               <Globe className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               <select
// //                 value={filterInputs.originCountry}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, originCountry: e.target.value })
// //                 }
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
// //               >
// //                 {uniqueOrigins.map((country, i) => (
// //                   <option key={i} value={country}>
// //                     {country}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Destination */}
// //           <div className="w-[110px] sm:w-[120px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               Destination
// //             </label>
// //             <div className="relative">
// //               <Globe className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               <select
// //                 value={filterInputs.destinationCountry}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, destinationCountry: e.target.value })
// //                 }
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
// //               >
// //                 {uniqueDests.map((dest, i) => (
// //                   <option key={i} value={dest}>
// //                     {dest}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Importer */}
// //           <div className="w-[110px] sm:w-[120px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               Importer
// //             </label>
// //             <div className="relative">
// //               <Building2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               <select
// //                 value={filterInputs.importer}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, importer: e.target.value })
// //                 }
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
// //               >
// //                 {uniqueImporters.map((imp, i) => (
// //                   <option key={i} value={imp}>
// //                     {imp}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Exporter */}
// //           <div className="w-[110px] sm:w-[120px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               Exporter
// //             </label>
// //             <div className="relative">
// //               <Building2 className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               <select
// //                 value={filterInputs.exporter}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, exporter: e.target.value })
// //                 }
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
// //               >
// //                 {uniqueExporters.map((exp, i) => (
// //                   <option key={i} value={exp}>
// //                     {exp}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Port of Loading */}
// //           <div className="w-[110px] sm:w-[120px]">
// //             <label className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-0.5">
// //               Port of Loading
// //             </label>
// //             <div className="relative">
// //               <Anchor className="w-3.5 h-3.5 absolute left-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //               <select
// //                 value={filterInputs.portOfLoading}
// //                 onChange={(e) =>
// //                   setFilterInputs({ ...filterInputs, portOfLoading: e.target.value })
// //                 }
// //                 className="w-full h-[30px] text-xs bg-white border border-gray-200 rounded-lg pl-7 pr-5 text-gray-700 focus:outline-none focus:ring-1 focus:ring-[#00897B] focus:border-[#00897B] appearance-none cursor-pointer"
// //               >
// //                 {uniquePorts.map((port, i) => (
// //                   <option key={i} value={port}>
// //                     {port}
// //                   </option>
// //                 ))}
// //               </select>
// //               <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //             </div>
// //           </div>

// //           {/* Buttons: Apply & Reset */}
// //           <div className="flex items-center gap-1.5 shrink-0">
// //             <button
// //               onClick={handleApplyFilters}
// //               className="h-[30px] px-3.5 bg-[#00897B] hover:bg-[#00796B] text-white text-xs font-semibold rounded-lg transition-colors shadow-xs cursor-pointer flex items-center justify-center whitespace-nowrap"
// //             >
// //               Apply Filters
// //             </button>
// //             <button
// //               onClick={handleResetFilters}
// //               className="h-[30px] px-3 border border-[#00897B] text-[#00897B] hover:bg-teal-50/60 bg-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1 cursor-pointer whitespace-nowrap"
// //             >
// //               <RotateCcw size={12} />
// //               <span>Reset</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 3. Controls Bar: Records selector & Columns toggle */}
// //       <div className="flex items-center justify-between">
// //         {/* Records Dropdown */}
// //         <div className="relative inline-block">
// //           <select
// //             value={pageSize}
// //             onChange={(e) => {
// //               setPageSize(Number(e.target.value));
// //               setCurrentPage(1);
// //             }}
// //             className="bg-white border border-gray-200 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 pr-6 focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none shadow-xs cursor-pointer"
// //           >
// //             <option value={6}>6 records</option>
// //             <option value={10}>10 records</option>
// //             <option value={20}>20 records</option>
// //             <option value={50}>50 records</option>
// //           </select>
// //           <ChevronDown className="w-3 h-3 absolute right-1.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
// //         </div>

// //         {/* Columns Toggle Dropdown */}
// //         <div className="relative">
// //           <button
// //             onClick={() => setShowColumnsDropdown((prev) => !prev)}
// //             className="flex items-center gap-1.5 bg-white border border-gray-200 hover:border-gray-300 text-gray-700 text-xs font-medium rounded-lg px-2.5 py-1.5 shadow-xs transition-colors cursor-pointer"
// //           >
// //             <LayoutGrid size={13} className="text-gray-500" />
// //             <span>Columns</span>
// //             <ChevronDown size={13} className="text-gray-400" />
// //           </button>

// //           {showColumnsDropdown && (
// //             <>
// //               <div
// //                 className="fixed inset-0 z-20"
// //                 onClick={() => setShowColumnsDropdown(false)}
// //               />
// //               <div className="absolute right-0 mt-1.5 w-48 bg-white rounded-xl shadow-lg border border-gray-100 p-2 z-30 space-y-0.5">
// //                 <p className="text-[10px] font-bold text-gray-400 px-2 py-1 uppercase tracking-wider">
// //                   Toggle Columns
// //                 </p>
// //                 {allColumns.map((col) => (
// //                   <label
// //                     key={col.key}
// //                     className="flex items-center gap-2 px-2 py-1 hover:bg-gray-50 rounded-lg text-xs text-gray-700 cursor-pointer select-none"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={visibleColumns[col.key]}
// //                       onChange={() => toggleColumn(col.key)}
// //                       className="rounded text-teal-600 focus:ring-teal-500"
// //                     />
// //                     <span>{col.label}</span>
// //                   </label>
// //                 ))}
// //               </div>
// //             </>
// //           )}
// //         </div>
// //       </div>

// //       {/* 4. Trade Records Table Card */}
// //       <div className="bg-white rounded-xl border border-gray-200/90 shadow-xs w-full overflow-hidden">
// //         <div className="overflow-x-auto w-full">
// //           <table className="w-full text-left border-collapse text-[11px]">
// //             <thead>
// //               <tr className="border-b border-gray-200 bg-gray-50/70 text-[10px] font-bold uppercase tracking-wider text-gray-500">
// //                 {visibleColumns.hsCode && <th className="py-1.5 px-2.5 whitespace-nowrap">HS CODE</th>}
// //                 {visibleColumns.description && <th className="py-1.5 px-2.5 whitespace-nowrap min-w-[170px]">PRODUCT DESCRIPTION</th>}
// //                 {visibleColumns.importer && <th className="py-1.5 px-2.5 whitespace-nowrap">IMPORTER</th>}
// //                 {visibleColumns.exporter && <th className="py-1.5 px-2.5 whitespace-nowrap">EXPORTER</th>}
// //                 {visibleColumns.originCountry && <th className="py-1.5 px-2.5 whitespace-nowrap">ORIGIN</th>}
// //                 {visibleColumns.destinationCountry && <th className="py-1.5 px-2.5 whitespace-nowrap">DESTINATION</th>}
// //                 {visibleColumns.portOfLoading && <th className="py-1.5 px-2.5 whitespace-nowrap">PORT OF LOADING</th>}
// //                 {visibleColumns.portOfDischarge && <th className="py-1.5 px-2.5 whitespace-nowrap">PORT OF DISCHARGE</th>}
// //                 {visibleColumns.shipDate && <th className="py-1.5 px-2.5 whitespace-nowrap">SHIP DATE</th>}
// //                 {visibleColumns.arrivalDate && <th className="py-1.5 px-2.5 whitespace-nowrap">ARRIVAL DATE</th>}
// //                 {visibleColumns.value && <th className="py-1.5 px-2.5 whitespace-nowrap font-bold text-gray-800">VALUE (INR)</th>}
// //                 {visibleColumns.actions && <th className="py-1.5 px-2.5 text-center whitespace-nowrap">ACTIONS</th>}
// //               </tr>
// //             </thead>
// //             <tbody className="divide-y divide-gray-100">
// //               {paginatedRecords.map((row) => (
// //                 <tr
// //                   key={row._id}
// //                   className="hover:bg-teal-50/20 transition-colors text-gray-700"
// //                 >
// //                   {/* HS Code */}
// //                   {visibleColumns.hsCode && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap font-medium text-gray-900">
// //                       {row.hsCode}
// //                     </td>
// //                   )}

// //                   {/* Product Description */}
// //                   {visibleColumns.description && (
// //                     <td className="py-1.5 px-2.5 font-medium text-gray-800 max-w-[200px] truncate">
// //                       {row.description}
// //                     </td>
// //                   )}

// //                   {/* Importer */}
// //                   {visibleColumns.importer && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600 max-w-[140px] truncate">
// //                       {row.importer}
// //                     </td>
// //                   )}

// //                   {/* Exporter */}
// //                   {visibleColumns.exporter && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600 max-w-[140px] truncate">
// //                       {row.exporter}
// //                     </td>
// //                   )}

// //                   {/* Origin with Flag */}
// //                   {visibleColumns.originCountry && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap">
// //                       <span className="mr-1.5 inline-flex align-middle shadow-xs rounded-xs">
// //                         <ReactCountryFlag
// //                           countryCode={countryCodes[row.originCountry] || ""}
// //                           svg
// //                           style={{ width: "16px", height: "12px" }}
// //                         />
// //                       </span>
// //                       <span className="text-gray-700 font-medium align-middle">
// //                         {row.originCountry}
// //                       </span>
// //                     </td>
// //                   )}

// //                   {/* Destination with Flag */}
// //                   {visibleColumns.destinationCountry && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap">
// //                       <span className="mr-1.5 inline-flex align-middle shadow-xs rounded-xs">
// //                         <ReactCountryFlag
// //                           countryCode={countryCodes[row.destinationCountry] || ""}
// //                           svg
// //                           style={{ width: "16px", height: "12px" }}
// //                         />
// //                       </span>
// //                       <span className="text-gray-700 font-medium align-middle">
// //                         {row.destinationCountry}
// //                       </span>
// //                     </td>
// //                   )}

// //                   {/* Port of Loading */}
// //                   {visibleColumns.portOfLoading && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
// //                       {row.portOfLoading}
// //                     </td>
// //                   )}

// //                   {/* Port of Discharge */}
// //                   {visibleColumns.portOfDischarge && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
// //                       {row.portOfDischarge}
// //                     </td>
// //                   )}

// //                   {/* Ship Date */}
// //                   {visibleColumns.shipDate && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
// //                       {formatDate(row.shipDate)}
// //                     </td>
// //                   )}

// //                   {/* Arrival Date */}
// //                   {visibleColumns.arrivalDate && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-gray-600">
// //                       {formatDate(row.arrivalDate)}
// //                     </td>
// //                   )}

// //                   {/* Value (INR) */}
// //                   {visibleColumns.value && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap font-bold text-gray-900">
// //                       {formatValueINR(row.value)}
// //                     </td>
// //                   )}

// //                   {/* Actions (Eye & Pencil) */}
// //                   {visibleColumns.actions && (
// //                     <td className="py-1.5 px-2.5 whitespace-nowrap text-center">
// //                       <div className="flex items-center justify-center gap-1.5">
// //                         <button
// //                           onClick={() => setViewingRecord(row)}
// //                           className="p-1 text-gray-400 hover:text-teal-600 hover:bg-teal-50 rounded transition-colors cursor-pointer"
// //                           title="View Details"
// //                         >
// //                           <Eye size={15} />
// //                         </button>
// //                         <button
// //                           onClick={() => handleEditClick(row)}
// //                           className="p-1 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors cursor-pointer"
// //                           title="Edit Record"
// //                         >
// //                           <Edit2 size={15} />
// //                         </button>
// //                       </div>
// //                     </td>
// //                   )}
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Table Pagination Footer */}
// //         <div className="py-2 px-3 border-t border-gray-100 flex items-center justify-between gap-3 bg-white pr-20 sm:pr-24">
// //           <p className="text-xs text-gray-500">
// //             Showing {totalRecords === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, totalRecords)} of {totalRecords} records
// //           </p>

// //           <div className="flex items-center gap-1.5">
// //             {/* Prev Button */}
// //             <button
// //               onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
// //               disabled={currentPage === 1}
// //               className="w-6 h-6 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer text-xs"
// //             >
// //               &lt;
// //             </button>

// //             {/* Page Number Buttons */}
// //             {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
// //               <button
// //                 key={pageNum}
// //                 onClick={() => setCurrentPage(pageNum)}
// //                 className={`w-6 h-6 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
// //                   currentPage === pageNum
// //                     ? "bg-[#00897B] text-white"
// //                     : "border border-gray-200 text-gray-700 hover:bg-gray-50"
// //                 }`}
// //               >
// //                 {pageNum}
// //               </button>
// //             ))}

// //             {/* Next Button */}
// //             <button
// //               onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
// //               disabled={currentPage === totalPages}
// //               className="px-2.5 h-7 rounded-lg border border-gray-200 text-xs font-medium text-gray-600 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer flex items-center gap-0.5"
// //             >
// //               <span>Next</span>
// //               <span>&gt;</span>
// //             </button>
// //           </div>
// //         </div>
// //       </div>

// //       {/* 5. ADD / EDIT RECORD MODAL (Popup - No Scrolling Down!) */}
// //       {showAddModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
// //           <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
// //             {/* Header */}
// //             <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
// //               <h3 className="text-base font-bold text-gray-900">
// //                 {editingRecord ? `Edit Record (${editingRecord._id})` : "Add New Record"}
// //               </h3>
// //               <button
// //                 type="button"
// //                 onClick={() => {
// //                   setShowAddModal(false);
// //                   setEditingRecord(null);
// //                 }}
// //                 className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
// //               >
// //                 <X size={18} />
// //               </button>
// //             </div>

// //             {/* Form */}
// //             <form onSubmit={handleSaveRecord} className="p-5 overflow-y-auto space-y-3.5">
// //               {/* Row 1 */}
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     HS Code <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.hsCode}
// //                     onChange={(e) => setRecordForm({ ...recordForm, hsCode: e.target.value })}
// //                     placeholder="Enter HS code"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Product Description <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.description}
// //                     onChange={(e) => setRecordForm({ ...recordForm, description: e.target.value })}
// //                     placeholder="Enter product description"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 2 */}
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Importer <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.importer}
// //                     onChange={(e) => setRecordForm({ ...recordForm, importer: e.target.value })}
// //                     placeholder="Select or enter importer"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Exporter <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.exporter}
// //                     onChange={(e) => setRecordForm({ ...recordForm, exporter: e.target.value })}
// //                     placeholder="Select or enter exporter"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 3 */}
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Origin Country <span className="text-red-500">*</span>
// //                   </label>
// //                   <select
// //                     value={recordForm.originCountry}
// //                     onChange={(e) => setRecordForm({ ...recordForm, originCountry: e.target.value })}
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
// //                   >
// //                     <option value="">Select origin country</option>
// //                     {Object.keys(countryCodes).map((c, i) => (
// //                       <option key={i} value={c}>{c}</option>
// //                     ))}
// //                   </select>
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Destination Country <span className="text-red-500">*</span>
// //                   </label>
// //                   <select
// //                     value={recordForm.destinationCountry}
// //                     onChange={(e) => setRecordForm({ ...recordForm, destinationCountry: e.target.value })}
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500 bg-white"
// //                   >
// //                     <option value="">Select destination country</option>
// //                     {Object.keys(countryCodes).map((c, i) => (
// //                       <option key={i} value={c}>{c}</option>
// //                     ))}
// //                   </select>
// //                 </div>
// //               </div>

// //               {/* Row 4 */}
// //               <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Port of Loading <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.portOfLoading}
// //                     onChange={(e) => setRecordForm({ ...recordForm, portOfLoading: e.target.value })}
// //                     placeholder="Select or enter port of loading"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Port of Discharge <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="text"
// //                     required
// //                     value={recordForm.portOfDischarge}
// //                     onChange={(e) => setRecordForm({ ...recordForm, portOfDischarge: e.target.value })}
// //                     placeholder="Select or enter port of discharge"
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>
// //               </div>

// //               {/* Row 5 */}
// //               <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Ship Date <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="date"
// //                     required
// //                     value={recordForm.shipDate}
// //                     onChange={(e) => setRecordForm({ ...recordForm, shipDate: e.target.value })}
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Arrival Date <span className="text-red-500">*</span>
// //                   </label>
// //                   <input
// //                     type="date"
// //                     required
// //                     value={recordForm.arrivalDate}
// //                     onChange={(e) => setRecordForm({ ...recordForm, arrivalDate: e.target.value })}
// //                     className="w-full h-[36px] text-xs px-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                   />
// //                 </div>

// //                 <div>
// //                   <label className="block text-xs font-semibold text-gray-700 mb-1">
// //                     Value (INR) <span className="text-red-500">*</span>
// //                   </label>
// //                   <div className="relative">
// //                     <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-xs">₹</span>
// //                     <input
// //                       type="number"
// //                       required
// //                       value={recordForm.value}
// //                       onChange={(e) => setRecordForm({ ...recordForm, value: e.target.value })}
// //                       placeholder="Enter value"
// //                       className="w-full h-[36px] text-xs pl-6 pr-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
// //                     />
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Buttons */}
// //               <div className="pt-3 border-t border-gray-100 flex items-center justify-end gap-2.5">
// //                 <button
// //                   type="button"
// //                   onClick={() => {
// //                     setShowAddModal(false);
// //                     setEditingRecord(null);
// //                   }}
// //                   className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
// //                 >
// //                   Cancel
// //                 </button>
// //                 <button
// //                   type="submit"
// //                   className="px-5 py-2 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg shadow-xs transition-colors cursor-pointer"
// //                 >
// //                   Save Record
// //                 </button>
// //               </div>
// //             </form>
// //           </div>
// //         </div>
// //       )}

// //       {/* 6. BULK UPLOAD CSV MODAL (Popup - No Scrolling Down!) */}
// //       {showBulkModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
// //           <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
// //             {/* Header */}
// //             <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
// //               <div>
// //                 <h3 className="text-base font-bold text-gray-900">Bulk Upload CSV</h3>
// //                 <p className="text-xs text-gray-500 mt-0.5">Import multiple trade records at once.</p>
// //               </div>
// //               <div className="flex items-center gap-2.5">
// //                 <button
// //                   type="button"
// //                   onClick={handleDownloadTemplate}
// //                   className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#00897B] hover:text-[#00796B] transition-colors whitespace-nowrap cursor-pointer"
// //                   title="Download sample CSV template"
// //                 >
// //                   <Download size={14} className="shrink-0" />
// //                   <span>Download CSV Template</span>
// //                 </button>
// //                 <button
// //                   type="button"
// //                   onClick={() => setShowBulkModal(false)}
// //                   className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
// //                 >
// //                   <X size={18} />
// //                 </button>
// //               </div>
// //             </div>

// //             {/* Body */}
// //             <div className="p-5 space-y-4">
// //               <div
// //                 onDragOver={(e) => {
// //                   e.preventDefault();
// //                   setIsDragging(true);
// //                 }}
// //                 onDragLeave={() => setIsDragging(false)}
// //                 onDrop={(e) => {
// //                   e.preventDefault();
// //                   setIsDragging(false);
// //                   if (e.dataTransfer.files && e.dataTransfer.files[0]) {
// //                     setUploadedFile(e.dataTransfer.files[0]);
// //                   }
// //                 }}
// //                 onClick={() => document.getElementById("csv-modal-input").click()}
// //                 className={`border-2 border-dashed rounded-xl p-8 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
// //                   isDragging
// //                     ? "border-[#00897B] bg-teal-50/50"
// //                     : "border-[#80cbc4] hover:border-[#00897B] bg-[#e0f2f1]/25 hover:bg-[#e0f2f1]/40"
// //                 }`}
// //               >
// //                 <div className="w-12 h-12 rounded-full bg-teal-100/70 text-[#00897B] flex items-center justify-center mb-2.5">
// //                   <UploadCloud size={28} />
// //                 </div>
// //                 <p className="text-xs font-bold text-gray-800">
// //                   {uploadedFile ? uploadedFile.name : "Drag & drop your CSV file here"}
// //                 </p>
// //                 <p className="text-xs text-gray-500 mt-0.5">
// //                   or <span className="text-[#00897B] font-semibold underline">browse files</span>
// //                 </p>
// //                 <span className="text-[10px] text-gray-400 mt-1.5">
// //                   .csv files only
// //                 </span>
// //                 <input
// //                   id="csv-modal-input"
// //                   type="file"
// //                   accept=".csv"
// //                   className="hidden"
// //                   onChange={(e) => {
// //                     if (e.target.files && e.target.files[0]) {
// //                       setUploadedFile(e.target.files[0]);
// //                     }
// //                   }}
// //                 />
// //               </div>

// //               {/* Informational Alert Box */}
// //               <div className="bg-[#e1f5fe]/80 border border-[#b3e5fc] rounded-xl p-3 flex items-center gap-2.5 text-[#0288d1] text-xs">
// //                 <Info size={16} className="shrink-0 text-[#0288d1]" />
// //                 <span>Match the template columns before uploading.</span>
// //               </div>
// //             </div>

// //             {/* Footer */}
// //             <div className="px-5 py-3.5 bg-gray-50/80 border-t border-gray-100 flex items-center justify-end gap-2.5">
// //               <button
// //                 type="button"
// //                 onClick={() => setShowBulkModal(false)}
// //                 className="px-4 py-2 text-xs font-semibold text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
// //               >
// //                 Cancel
// //               </button>
// //               <button
// //                 type="button"
// //                 onClick={handleValidateCSV}
// //                 className="px-5 py-2 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg shadow-xs transition-colors cursor-pointer"
// //               >
// //                 Validate & Preview
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       {/* 7. VIEW RECORD DETAILS MODAL */}
// //       {viewingRecord && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-in fade-in duration-200">
// //           <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-gray-100">
// //             <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
// //               <div>
// //                 <h3 className="text-base font-bold text-gray-900">Shipment Details</h3>
// //                 <p className="text-xs text-gray-400">{viewingRecord._id}</p>
// //               </div>
// //               <button
// //                 onClick={() => setViewingRecord(null)}
// //                 className="text-gray-400 hover:text-gray-600 p-1 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
// //               >
// //                 <X size={18} />
// //               </button>
// //             </div>

// //             <div className="p-5 space-y-3.5 text-xs">
// //               <div className="bg-gray-50 rounded-xl p-3.5 border border-gray-100 space-y-2">
// //                 <div className="flex justify-between">
// //                   <span className="font-semibold text-gray-500">HS Code:</span>
// //                   <span className="font-bold text-gray-900">{viewingRecord.hsCode}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-semibold text-gray-500">Product:</span>
// //                   <span className="font-semibold text-gray-800 text-right max-w-[240px]">{viewingRecord.description}</span>
// //                 </div>
// //                 <div className="flex justify-between">
// //                   <span className="font-semibold text-gray-500">Value (INR):</span>
// //                   <span className="font-bold text-emerald-700">{formatValueINR(viewingRecord.value)}</span>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3">
// //                 <div className="border border-gray-100 rounded-xl p-3">
// //                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Importer</p>
// //                   <p className="font-semibold text-gray-800">{viewingRecord.importer}</p>
// //                   <p className="text-[11px] text-gray-500 mt-1">{viewingRecord.destinationCountry}</p>
// //                 </div>
// //                 <div className="border border-gray-100 rounded-xl p-3">
// //                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Exporter</p>
// //                   <p className="font-semibold text-gray-800">{viewingRecord.exporter}</p>
// //                   <p className="text-[11px] text-gray-500 mt-1">{viewingRecord.originCountry}</p>
// //                 </div>
// //               </div>

// //               <div className="grid grid-cols-2 gap-3">
// //                 <div className="border border-gray-100 rounded-xl p-3">
// //                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Port of Loading</p>
// //                   <p className="font-semibold text-gray-800">{viewingRecord.portOfLoading}</p>
// //                   <p className="text-[11px] text-gray-500 mt-1">Ship Date: {formatDate(viewingRecord.shipDate)}</p>
// //                 </div>
// //                 <div className="border border-gray-100 rounded-xl p-3">
// //                   <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">Port of Discharge</p>
// //                   <p className="font-semibold text-gray-800">{viewingRecord.portOfDischarge}</p>
// //                   <p className="text-[11px] text-gray-500 mt-1">Arrival Date: {formatDate(viewingRecord.arrivalDate)}</p>
// //                 </div>
// //               </div>
// //             </div>

// //             <div className="px-5 py-3.5 bg-gray-50 border-t border-gray-100 flex justify-end">
// //               <button
// //                 onClick={() => setViewingRecord(null)}
// //                 className="px-5 py-1.5 text-xs font-semibold text-white bg-[#00897B] hover:bg-[#00796B] rounded-lg transition-colors cursor-pointer"
// //               >
// //                 Close
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}
// //     </div>
// //   );
// // }



// // mahima code //
// import React, { useEffect, useMemo, useRef, useState } from "react";
// import API from "../../api/axios";
// import toast from "react-hot-toast";

// // ============================================
// // CSV PARSER
// // ============================================
// const parseCSV = (text) => {
//   const rows = [];
//   let row = [];
//   let cell = "";
//   let insideQuotes = false;

//   text = text.replace(/^\uFEFF/, "");

//   for (let i = 0; i < text.length; i++) {
//     const char = text[i];
//     const next = text[i + 1];

//     if (char === '"') {
//       if (insideQuotes && next === '"') {
//         cell += '"';
//         i++;
//       } else {
//         insideQuotes = !insideQuotes;
//       }
//     } else if (char === "," && !insideQuotes) {
//       row.push(cell);
//       cell = "";
//     } else if ((char === "\n" || char === "\r") && !insideQuotes) {
//       if (char === "\r" && next === "\n") i++;
//       row.push(cell);
//       rows.push(row);
//       row = [];
//       cell = "";
//     } else {
//       cell += char;
//     }
//   }

//   row.push(cell);
//   rows.push(row);

//   const nonBlankRows = rows.filter((r) =>
//     r.some((value) => String(value).trim() !== "")
//   );

//   if (nonBlankRows.length < 2) {
//     throw new Error("CSV file does not contain any data rows.");
//   }

//   const rawHeaders = nonBlankRows[0].map((h) => String(h).trim());

//   const validColumns = rawHeaders
//     .map((header, index) => ({ header, index }))
//     .filter((item) => item.header !== "");

//   if (!validColumns.length) {
//     throw new Error("CSV headers are missing.");
//   }

//   const usedNames = new Set();

//   const headers = validColumns.map(({ header }) => {
//     let name = header;
//     let count = 2;

//     while (usedNames.has(name)) {
//       name = `${header}_${count++}`;
//     }

//     usedNames.add(name);
//     return name;
//   });

//   const records = nonBlankRows
//     .slice(1)
//     .map((csvRow) => {
//       const record = {};

//       validColumns.forEach((column, index) => {
//         record[headers[index]] = String(
//           csvRow[column.index] ?? ""
//         ).trim();
//       });

//       return record;
//     })
//     .filter((record) =>
//       Object.values(record).some((value) => value !== "")
//     );

//   return { headers, records };
// };

// // ============================================
// // HELPERS
// // ============================================
// const normalize = (value) =>
//   String(value ?? "")
//     .toLowerCase()
//     .replace(/[^a-z0-9]/g, "");

// const getMatchingHeader = (headers, keywords) => {
//   return headers.find((header) => {
//     const normalizedHeader = normalize(header);

//     return keywords.some((keyword) =>
//       normalizedHeader.includes(normalize(keyword))
//     );
//   });
// };

// const getUniqueOptions = (records, header) => {
//   if (!header) return [];

//   return [
//     ...new Set(
//       records
//         .map((record) => String(record[header] ?? "").trim())
//         .filter(Boolean)
//     ),
//   ].sort((a, b) => a.localeCompare(b));
// };

// // ============================================
// // FILTER SELECT
// // ============================================
// const FilterSelect = ({ label, value, onChange, options, icon }) => (
//   <div className="min-w-0">
//     <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
//       {icon && <span className="text-blue-500">{icon}</span>}
//       {label}
//     </label>

//     <select
//       value={value}
//       onChange={(e) => onChange(e.target.value)}
//       className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-[13px] font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
//     >
//       <option value="">All</option>
//       {options.map((option) => (
//         <option key={option} value={option}>
//           {option}
//         </option>
//       ))}
//     </select>
//   </div>
// );

// // ============================================
// // STAT CARD
// // ============================================
// const StatCard = ({ title, value, subtitle, icon, color }) => (
//   <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)] sm:p-5">
//     <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

//     <div className="relative flex items-center justify-between gap-3">
//       <div className="min-w-0">
//         <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[11px]">
//           {title}
//         </p>

//         <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-800 sm:text-[28px]">
//           {Number(value || 0).toLocaleString("en-IN")}
//         </h3>

//         <p className="mt-1.5 text-[11px] font-medium text-slate-400">
//           {subtitle}
//         </p>
//       </div>

//       <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm sm:h-14 sm:w-14 ${color}`}>
//         {icon}
//       </div>
//     </div>
//   </div>
// );

// // ============================================
// // MASTER DATA
// // ============================================
// const MasterData = () => {
//   const [activeTab, setActiveTab] = useState("import");

//   const [importData, setImportData] = useState({
//     headers: [],
//     records: [],
//     batches: [],
//   });

//   const [exportData, setExportData] = useState({
//     headers: [],
//     records: [],
//     batches: [],
//   });

//   const [loading, setLoading] = useState(false);
//   const [uploading, setUploading] = useState(false);

//   const fileInputRef = useRef(null);

//   const emptyFilters = {
//     search: "",
//     destination: "",
//     importer: "",
//     exporter: "",
//     port: "",
//   };

//   const [draftFilters, setDraftFilters] = useState(emptyFilters);
//   const [appliedFilters, setAppliedFilters] = useState(emptyFilters);

//   const [currentPage, setCurrentPage] = useState(1);
//   const pageSize = 10;

//   const currentData =
//     activeTab === "import" ? importData : exportData;

//   // ============================================
//   // FETCH DATA
//   // ============================================
//   const fetchData = async (type = activeTab) => {
//     try {
//       setLoading(true);

//       const response = await API.get(`/master-data/${type}`);
//       const result = response.data?.data || {};

//       const formattedData = {
//         headers: result.headers || [],
//         records: result.records || [],
//         batches: result.batches || [],
//       };

//       if (type === "import") {
//         setImportData(formattedData);
//       } else {
//         setExportData(formattedData);
//       }
//     } catch (error) {
//       console.error("Fetch CSV data error:", error);

//       toast.error(
//         error.response?.data?.message || "Failed to load data."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData(activeTab);
//   }, [activeTab]);

//   // ============================================
//   // DETECT CSV COLUMNS
//   // ============================================
//   const columns = useMemo(() => {
//     const headers = currentData.headers;

//     return {
//       destination: getMatchingHeader(headers, [
//         "destination country",
//         "destination",
//         "dest country",
//         "country of destination",
//         "country",
//       ]),

//       importer: getMatchingHeader(headers, [
//         "importer",
//         "buyer",
//         "consignee",
//         "cosignee",
//       ]),

//       exporter: getMatchingHeader(headers, [
//         "exporter",
//         "seller",
//         "shipper",
//       ]),

//       port: getMatchingHeader(headers, [
//         "port of loading",
//         "loading port",
//         "port of discharge",
//         "discharge port",
//         "port",
//       ]),
//     };
//   }, [currentData.headers]);

//   // ============================================
//   // FILTER OPTIONS
//   // ============================================
//   const filterOptions = useMemo(
//     () => ({
//       destination: getUniqueOptions(
//         currentData.records,
//         columns.destination
//       ),
//       importer: getUniqueOptions(
//         currentData.records,
//         columns.importer
//       ),
//       exporter: getUniqueOptions(
//         currentData.records,
//         columns.exporter
//       ),
//       port: getUniqueOptions(
//         currentData.records,
//         columns.port
//       ),
//     }),
//     [currentData.records, columns]
//   );

//   // ============================================
//   // FILTER RECORDS
//   // ============================================
//   const filteredRecords = useMemo(() => {
//     return currentData.records.filter((record) => {
//       const searchValue = appliedFilters.search.trim().toLowerCase();

//       if (searchValue) {
//         const matchesSearch = currentData.headers.some((header) =>
//           String(record[header] ?? "")
//             .toLowerCase()
//             .includes(searchValue)
//         );

//         if (!matchesSearch) return false;
//       }

//       const checks = [
//         ["destination", columns.destination],
//         ["importer", columns.importer],
//         ["exporter", columns.exporter],
//         ["port", columns.port],
//       ];

//       for (const [filterKey, header] of checks) {
//         const selectedValue = appliedFilters[filterKey];

//         if (
//           selectedValue &&
//           header &&
//           String(record[header] ?? "").trim().toLowerCase() !==
//             selectedValue.trim().toLowerCase()
//         ) {
//           return false;
//         }
//       }

//       return true;
//     });
//   }, [
//     currentData.records,
//     currentData.headers,
//     appliedFilters,
//     columns,
//   ]);

//   // ============================================
//   // PAGINATION
//   // ============================================
//   const totalRecords = filteredRecords.length;
//   const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

//   const paginatedRecords = useMemo(() => {
//     const startIndex = (currentPage - 1) * pageSize;

//     return filteredRecords.slice(startIndex, startIndex + pageSize);
//   }, [filteredRecords, currentPage]);

//   useEffect(() => {
//     setCurrentPage((prev) => Math.min(prev, totalPages));
//   }, [totalPages]);

//   const startRecord =
//     totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;

//   const endRecord = Math.min(currentPage * pageSize, totalRecords);

//   const getPageNumbers = () => {
//     const pages = [];
//     const maxVisible = 5;

//     let start = Math.max(1, currentPage - 2);
//     let end = Math.min(totalPages, start + maxVisible - 1);

//     if (end - start < maxVisible - 1) {
//       start = Math.max(1, end - maxVisible + 1);
//     }

//     for (let i = start; i <= end; i++) {
//       pages.push(i);
//     }

//     return pages;
//   };

//   // ============================================
//   // FILTER HANDLERS
//   // ============================================
//   const updateDraftFilter = (key, value) => {
//     setDraftFilters((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   const handleApplyFilters = () => {
//     setAppliedFilters({ ...draftFilters });
//     setCurrentPage(1);
//   };

//   const handleResetFilters = () => {
//     setDraftFilters({ ...emptyFilters });
//     setAppliedFilters({ ...emptyFilters });
//     setCurrentPage(1);
//   };

//   // ============================================
//   // DELETE CSV BATCH
//   // ============================================
//   const handleDeleteBatch = async (batchId, fileName) => {
//     const confirmed = window.confirm(
//       `Are you sure you want to delete "${fileName}"?\n\nAll records uploaded through this CSV will be permanently deleted.`
//     );

//     if (!confirmed) return;

//     try {
//       const response = await API.delete(
//         `/master-data/batch/${batchId}`
//       );

//       if (response.data?.status === 1) {
//         toast.success(
//           response.data.message || "CSV deleted successfully."
//         );

//         await fetchData(activeTab);
//       } else {
//         toast.error(
//           response.data?.message || "Failed to delete CSV."
//         );
//       }
//     } catch (error) {
//       console.error("Delete CSV error:", error);

//       toast.error(
//         error.response?.data?.message || "Failed to delete CSV file."
//       );
//     }
//   };

//   // ============================================
//   // CSV UPLOAD
//   // ============================================
//   const handleFileChange = async (event) => {
//     const file = event.target.files?.[0];

//     if (!file) return;

//     if (!file.name.toLowerCase().endsWith(".csv")) {
//       toast.error("Please select a CSV file.");
//       event.target.value = "";
//       return;
//     }

//     try {
//       setUploading(true);

//       const text = await file.text();
//       const { headers, records } = parseCSV(text);

//       if (!records.length) {
//         throw new Error("No valid records found in CSV.");
//       }

//       await API.post("/master-data/upload", {
//         dataType: activeTab,
//         fileName: file.name,
//         headers,
//         records,
//       });

//       toast.success(
//         `${activeTab === "import" ? "Import" : "Export"} CSV uploaded successfully.`
//       );

//       setCurrentPage(1);
//       handleResetFilters();
//       await fetchData(activeTab);
//     } catch (error) {
//       console.error("CSV upload error:", error);

//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "CSV upload failed."
//       );
//     } finally {
//       setUploading(false);
//       event.target.value = "";
//     }
//   };

//   // ============================================
//   // TAB CHANGE
//   // ============================================
//   const handleTabChange = (tab) => {
//     if (activeTab === tab) return;

//     setActiveTab(tab);
//     setCurrentPage(1);
//     setDraftFilters({ ...emptyFilters });
//     setAppliedFilters({ ...emptyFilters });
//   };

//   // ============================================
//   // UI
//   // ============================================
//   return (
//     <div className="cm-admin-teal-page min-h-full w-full min-w-0 bg-[#f5f7fc] p-1 sm:p-1 lg:p-1">

//       {/* PAGE HEADER */}
//       {/* <div className="mb-5 flex flex-wrap items-center justify-between gap-4"> */}
//         {/* <div className="flex min-w-0 items-center gap-3"> */}
//           {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#086A65] to-[#14B8A6] text-2xl text-white shadow-lg shadow-teal-600/20">
//             <svg
//               width="23"
//               height="23"
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.8"
//               strokeLinecap="round"
//               strokeLinejoin="round"
//             >
//               <path d="M3 3h18v18H3z" />
//               <path d="M3 9h18M9 21V9" />
//               <path d="M7 6h.01M12 6h.01M17 6h.01" />
//             </svg>
//           </div> */}

//           {/* <div className="min-w-0">
//             <div className="flex flex-wrap items-center gap-2">
//               <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
//                 Master Data
//               </h1>
//               <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#0A8981]">
//                 Database
//               </span>
//             </div>

//             <p className="mt-1 text-xs text-slate-500 sm:text-sm">
//               Manage, organize and explore your import & export records
//             </p>
//           </div> */}
//         {/* </div> */}

//         {/* <input
//           ref={fileInputRef}
//           type="file"
//           accept=".csv,text/csv"
//           hidden
//           onChange={handleFileChange}
//         />

//         <button
//           onClick={() => fileInputRef.current?.click()}
//           disabled={uploading}
//           className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {uploading ? (
//             <>
//               <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               Uploading...
//             </>
//           ) : (
//             <>
//               <span className="text-xl leading-none">＋</span>
//               Upload CSV
//             </>
//           )}
//         </button> */}
//       {/* </div> */}

//       {/* TABS */}
//       <div className="mb-5 flex w-full flex-wrap items-center justify-between gap-3">
//         <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
//           {["import", "export"].map((tab) => (
//             <button
//               key={tab}
//               onClick={() => handleTabChange(tab)}
//               className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
//                 activeTab === tab
//                   ? "bg-gradient-to-r from-[#0A8981] to-[#14B8A6] text-white shadow-md shadow-teal-600/20"
//                   : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
//               }`}
//             >
//               <span>{tab === "import" ? "↓" : "↑"}</span>
//               {tab === "import" ? "Import Data" : "Export Data"}
//             </button>
//           ))}

  
//         </div>

//         <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
//           <span className={`h-2 w-2 rounded-full ${loading ? "animate-pulse bg-amber-400" : "bg-emerald-500"}`} />
//           <span className="text-[11px] font-semibold text-slate-500">
//             {loading ? "Syncing data..." : "Data synchronized"}
//           </span>

//                         <input
//           ref={fileInputRef}
//           type="file"
//           accept=".csv,text/csv"
//           hidden
//           onChange={handleFileChange}
//         />

//         <button
//           onClick={() => fileInputRef.current?.click()}
//           disabled={uploading}
//           className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:opacity-60"
//         >
//           {uploading ? (
//             <>
//               <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
//               Uploading...
//             </>
//           ) : (
//             <>
//               <span className="text-xl leading-none">＋</span>
//               Upload CSV
//             </>
//           )}
//         </button>
//         </div>
//       </div>

//       {/* STATS */}
//       <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
//         <StatCard
//           title="Total Records"
//           value={currentData.records.length}
//           subtitle="All uploaded records"
//           icon="▤"
//           color="bg-blue-50 text-[#0A8981]"
//         />

//         <StatCard
//           title="CSV Uploads"
//           value={currentData.batches.length}
//           subtitle="Total uploaded files"
//           icon="▣"
//           color="bg-violet-50 text-violet-600"
//         />

//         <StatCard
//           title="Total Columns"
//           value={currentData.headers.length}
//           subtitle="Available data fields"
//           icon="▦"
//           color="bg-emerald-50 text-emerald-600"
//         />

//         <StatCard
//           title="Filtered Records"
//           value={totalRecords}
//           subtitle="Records matching filters"
//           icon="⌕"
//           color="bg-amber-50 text-amber-600"
//         />
//       </div>

//       {/* SEARCH & FILTERS */}
//       <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

//         <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0A8981]">
//               ⌕
//             </div>

//             <div>
//               <h3 className="text-sm font-extrabold text-slate-800">
//                 Search & Filters
//               </h3>
//               <p className="mt-0.5 text-[11px] text-slate-400">
//                 Refine records using available CSV fields
//               </p>
//             </div>
//           </div>

//           <div className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
//             {totalRecords.toLocaleString("en-IN")} Results
//           </div>
//         </div>

//         <div className="p-4 sm:p-5">
//           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

//             {/* SEARCH */}
//             <div className="min-w-0 xl:col-span-2">
//               <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
//                 <span className="text-blue-500">⌕</span>
//                 Search All Fields
//               </label>

//               <div className="relative">
//                 <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
//                   ⌕
//                 </span>

//                 <input
//                   type="text"
//                   value={draftFilters.search}
//                   onChange={(e) =>
//                     updateDraftFilter("search", e.target.value)
//                   }
//                   onKeyDown={(e) => {
//                     if (e.key === "Enter") handleApplyFilters();
//                   }}
//                   placeholder="Search records, companies, countries..."
//                   className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-[13px] font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
//                 />
//               </div>
//             </div>

//             <FilterSelect
//               label="Destination"
//               icon="⌖"
//               value={draftFilters.destination}
//               onChange={(value) => updateDraftFilter("destination", value)}
//               options={filterOptions.destination}
//             />

//             <FilterSelect
//               label="Importer / Buyer"
//               icon="▣"
//               value={draftFilters.importer}
//               onChange={(value) => updateDraftFilter("importer", value)}
//               options={filterOptions.importer}
//             />

//             <FilterSelect
//               label="Exporter"
//               icon="▤"
//               value={draftFilters.exporter}
//               onChange={(value) => updateDraftFilter("exporter", value)}
//               options={filterOptions.exporter}
//             />

//             <FilterSelect
//               label="Port"
//               icon="⌖"
//               value={draftFilters.port}
//               onChange={(value) => updateDraftFilter("port", value)}
//               options={filterOptions.port}
//             />
//           </div>

//           <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
//             <p className="text-[11px] text-slate-400">
//               Select your filters and apply to view matching records.
//             </p>

//             <div className="flex w-full flex-wrap gap-2 sm:w-auto">
//               <button
//                 onClick={handleResetFilters}
//                 className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
//               >
//                 ↺ Reset
//               </button>

//               <button
//                 onClick={handleApplyFilters}
//                 className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-6 text-xs font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-none"
//               >
//                 <span>⌕</span>
//                 Apply Filters
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* UPLOAD HISTORY */}
//       {currentData.batches.length > 0 && (
//         <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

//           <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
//             <div className="flex items-center gap-3">
//               <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
//                 ▣
//               </div>

//               <div>
//                 <h3 className="text-sm font-extrabold text-slate-800">
//                   Upload History
//                 </h3>
//                 <p className="mt-0.5 text-[11px] text-slate-400">
//                   {currentData.batches.length} uploaded files
//                 </p>
//               </div>
//             </div>

//             <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
//               {activeTab === "import" ? "IMPORT FILES" : "EXPORT FILES"}
//             </span>
//           </div>

//           <div className="flex gap-3 overflow-x-auto p-4 sm:p-5">
//             {currentData.batches.map((batch) => (
//               <div
//                 key={batch._id}
//                 className="flex min-w-[260px] max-w-[320px] shrink-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
//               >
//                 <div className="flex min-w-0 items-center gap-3">
//                   <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
//                     ▤
//                   </div>

//                   <div className="min-w-0">
//                     <p className="truncate text-xs font-bold text-slate-700" title={batch.fileName}>
//                       {batch.fileName}
//                     </p>

//                     <p className="mt-1 text-[10px] font-medium text-slate-400">
//                       {Number(batch.rowCount || 0).toLocaleString("en-IN")} rows
//                       {" · "}
//                       {batch.createdAt
//                         ? new Date(batch.createdAt).toLocaleDateString()
//                         : ""}
//                     </p>
//                   </div>
//                 </div>

//                 <button
//                   type="button"
//                   onClick={() =>
//                     handleDeleteBatch(batch._id, batch.fileName)
//                   }
//                   className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 text-[11px] font-bold text-red-500 transition hover:border-red-200 hover:bg-red-50"
//                   title="Delete this CSV file"
//                 >
//                   <span>×</span>
//                   Delete
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* RECORDS TABLE */}
//       <section className="flex min-h-[520px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

//         {/* TABLE HEADER */}
//         <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
//           <div className="flex items-center gap-3">
//             <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0A8981]">
//               ▤
//             </div>

//             <div>
//               <h3 className="text-sm font-extrabold text-slate-800">
//                 {activeTab === "import"
//                   ? "Import Records"
//                   : "Export Records"}
//               </h3>

//               <p className="mt-1 text-[11px] text-slate-400">
//                 Showing {startRecord.toLocaleString("en-IN")}–{endRecord.toLocaleString("en-IN")} of{" "}
//                 {totalRecords.toLocaleString("en-IN")} matching records
//               </p>
//             </div>
//           </div>

//           <div className="flex items-center gap-2">
//             <span className="rounded-lg border border-teal-100 bg-teal-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
//               {currentData.headers.length} Columns
//             </span>

//             <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">
//               10 / Page
//             </span>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div
//           className="w-full max-h-[560px] flex-1 overflow-auto"
//           style={{
//             overscrollBehavior: "contain",
//             WebkitOverflowScrolling: "touch",
//           }}
//         >
//           {loading ? (
//             <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-medium text-slate-400">
//               <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
//               Loading master data...
//             </div>
//           ) : paginatedRecords.length === 0 ? (
//             <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
//               <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
//                 ▤
//               </div>

//               <h4 className="text-sm font-bold text-slate-700">
//                 {currentData.records.length === 0
//                   ? "No data uploaded yet"
//                   : "No matching records found"}
//               </h4>

//               <p className="mt-1.5 max-w-sm text-xs text-slate-400">
//                 Upload a CSV file or change your search filters to see records here.
//               </p>

//               {currentData.records.length > 0 && (
//                 <button
//                   onClick={handleResetFilters}
//                   className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-[#0A8981] transition hover:bg-blue-100"
//                 >
//                   Clear Filters
//                 </button>
//               )}
//             </div>
//           ) : (
//             <table className="w-max min-w-full border-collapse text-left">
//               <thead className="sticky top-0 z-20 bg-[#f5f7fc]">
//                 <tr>
//                   <th className="sticky left-0 z-30 whitespace-nowrap border-b border-r border-slate-200 bg-[#f5f7fc] px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
//                     #
//                   </th>

//                   {currentData.headers.map((header) => (
//                     <th
//                       key={header}
//                       className="whitespace-nowrap border-b border-slate-200 px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500"
//                     >
//                       {header}
//                     </th>
//                   ))}
//                 </tr>
//               </thead>

//               <tbody className="divide-y divide-slate-100">
//                 {paginatedRecords.map((record, index) => (
//                   <tr
//                     key={`${record._batchId || "batch"}-${record._rowNumber || index}-${index}`}
//                     className="group transition-colors hover:bg-blue-50/50"
//                   >
//                     <td className="sticky left-0 z-10 whitespace-nowrap border-r border-slate-100 bg-white px-4 py-3 text-xs font-bold text-slate-400 transition-colors group-hover:bg-blue-50">
//                       {(currentPage - 1) * pageSize + index + 1}
//                     </td>

//                     {currentData.headers.map((header) => (
//                       <td
//                         key={header}
//                         title={String(record[header] ?? "")}
//                         className="max-w-[300px] truncate whitespace-nowrap px-4 py-3 text-[12px] font-medium text-slate-600"
//                       >
//                         {record[header] !== undefined &&
//                         record[header] !== ""
//                           ? record[header]
//                           : "—"}
//                       </td>
//                     ))}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           )}
//         </div>

//         {/* PAGINATION */}
//         <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:px-5">
//           <p className="text-[11px] font-medium text-slate-400">
//             Showing{" "}
//             <span className="font-bold text-slate-700">
//               {startRecord}–{endRecord}
//             </span>{" "}
//             of{" "}
//             <span className="font-bold text-slate-700">
//               {totalRecords.toLocaleString("en-IN")}
//             </span>{" "}
//             records
//           </p>

//           <div className="flex flex-wrap items-center gap-1.5">
//             <button
//               onClick={() => setCurrentPage(1)}
//               disabled={currentPage === 1 || totalRecords === 0}
//               className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-xs font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
//               title="First page"
//             >
//               «
//             </button>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.max(1, prev - 1))
//               }
//               disabled={currentPage === 1 || totalRecords === 0}
//               className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               Previous
//             </button>

//             {getPageNumbers().map((page) => (
//               <button
//                 key={page}
//                 onClick={() => setCurrentPage(page)}
//                 className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-bold transition ${
//                   currentPage === page
//                     ? "bg-gradient-to-r from-[#0A8981] to-[#14B8A6] text-white shadow-md shadow-teal-600/20"
//                     : "border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981]"
//                 }`}
//               >
//                 {page}
//               </button>
//             ))}

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) =>
//                   Math.min(totalPages, prev + 1)
//                 )
//               }
//               disabled={currentPage >= totalPages || totalRecords === 0}
//               className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
//             >
//               Next
//             </button>

//             <button
//               onClick={() => setCurrentPage(totalPages)}
//               disabled={currentPage >= totalPages || totalRecords === 0}
//               className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-xs font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
//               title="Last page"
//             >
//               »
//             </button>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default MasterData;


// mahima code //
import React, { useEffect, useMemo, useRef, useState } from "react";
import API from "../../api/axios";
import toast from "react-hot-toast";

// ============================================
// CSV PARSER
// ============================================
const parseCSV = (text) => {
  const rows = [];
  let row = [];
  let cell = "";
  let insideQuotes = false;

  text = text.replace(/^\uFEFF/, "");

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (insideQuotes && next === '"') {
        cell += '"';
        i++;
      } else {
        insideQuotes = !insideQuotes;
      }
    } else if (char === "," && !insideQuotes) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !insideQuotes) {
      if (char === "\r" && next === "\n") i++;
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }

  row.push(cell);
  rows.push(row);

  const nonBlankRows = rows.filter((r) =>
    r.some((value) => String(value).trim() !== "")
  );

  if (nonBlankRows.length < 2) {
    throw new Error("CSV file does not contain any data rows.");
  }

  const rawHeaders = nonBlankRows[0].map((h) => String(h).trim());

  const validColumns = rawHeaders
    .map((header, index) => ({ header, index }))
    .filter((item) => item.header !== "");

  if (!validColumns.length) {
    throw new Error("CSV headers are missing.");
  }

  const usedNames = new Set();

  const headers = validColumns.map(({ header }) => {
    let name = header;
    let count = 2;

    while (usedNames.has(name)) {
      name = `${header}_${count++}`;
    }

    usedNames.add(name);
    return name;
  });

  const records = nonBlankRows
    .slice(1)
    .map((csvRow) => {
      const record = {};

      validColumns.forEach((column, index) => {
        record[headers[index]] = String(
          csvRow[column.index] ?? ""
        ).trim();
      });

      return record;
    })
    .filter((record) =>
      Object.values(record).some((value) => value !== "")
    );

  return { headers, records };
};

// ============================================
// HELPERS
// ============================================
const normalize = (value) =>
  String(value ?? "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const getMatchingHeader = (headers, keywords) => {
  return headers.find((header) => {
    const normalizedHeader = normalize(header);

    return keywords.some((keyword) =>
      normalizedHeader.includes(normalize(keyword))
    );
  });
};

const getUniqueOptions = (records, header) => {
  if (!header) return [];

  return [
    ...new Set(
      records
        .map((record) => String(record[header] ?? "").trim())
        .filter(Boolean)
    ),
  ].sort((a, b) => a.localeCompare(b));
};

// ============================================
// CLIENT CSV TEMPLATES
// ============================================
const CSV_TEMPLATES = {
  import: {
    headers: [
      "HS Code",
      "Supplier Names",
      "Importer Names",
      "Product Description",
      "Country",
      "Quantity",
      "Access Value",
      "Month",
      "Year",
    ],
    sample: [
      "84149090",
      "S R Exim",
      "African Forage Mali Sarl",
      "Spare Kit-Airend Ii Stage",
      "Mali",
      "1",
      "95,000.00",
      "june",
      "2000",
    ],
  },

  export: {
    headers: [
      "HS Code",
      "Cosignee",
      "Country",
      "Exporter",
      "Product Description",
      "Quantity",
      "FOB Value",
      "Month",
      "year",
    ],
    sample: [
      "84149090",
      "African Forage Mali Sarl",
      "Mali",
      "S R Exim",
      "Spare Kit-Airend Ii Stage",
      "1",
      "95,000.00",
      "june",
      "2000",
    ],
  },
};

// ============================================
// DOWNLOAD SAMPLE CSV
// ============================================
const downloadSampleCSV = (type) => {
  const template = CSV_TEMPLATES[type];

  const escapeCSVValue = (value) => {
    const stringValue = String(value ?? "");

    if (
      stringValue.includes(",") ||
      stringValue.includes('"') ||
      stringValue.includes("\n")
    ) {
      return `"${stringValue.replace(/"/g, '""')}"`;
    }

    return stringValue;
  };

  const csvContent = [
    template.headers.map(escapeCSVValue).join(","),
    template.sample.map(escapeCSVValue).join(","),
  ].join("\r\n");

  const blob = new Blob(["\uFEFF" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `${type}_master_data_sample.csv`;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

// ============================================
// VALIDATE CSV HEADERS
// ============================================
const validateCSVHeaders = (uploadedHeaders, type) => {
  const expectedHeaders = CSV_TEMPLATES[type].headers;

  const normalizeHeader = (header) =>
    String(header ?? "").trim().toLowerCase();

  const uploaded = uploadedHeaders.map(normalizeHeader);
  const expected = expectedHeaders.map(normalizeHeader);

  const missingHeaders = expectedHeaders.filter(
    (header) => !uploaded.includes(normalizeHeader(header))
  );

  const extraHeaders = uploadedHeaders.filter(
    (header) => !expected.includes(normalizeHeader(header))
  );

  const wrongOrder =
    missingHeaders.length === 0 &&
    extraHeaders.length === 0 &&
    uploaded.some((header, index) => header !== expected[index]);

  if (missingHeaders.length || extraHeaders.length || wrongOrder) {
    let message = `${type === "import" ? "Import" : "Export"} CSV format is incorrect.`;

    if (missingHeaders.length) {
      message += ` Missing columns: ${missingHeaders.join(", ")}.`;
    }

    if (extraHeaders.length) {
      message += ` Invalid columns: ${extraHeaders.join(", ")}.`;
    }

    if (wrongOrder) {
      message += " Please arrange columns in the exact sample order.";
    }

    throw new Error(message);
  }
};

// ============================================
// FILTER SELECT
// ============================================
const FilterSelect = ({ label, value, onChange, options, icon }) => (
  <div className="min-w-0">
    <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
      {icon && <span className="text-blue-500">{icon}</span>}
      {label}
    </label>

    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 text-[13px] font-medium text-slate-700 outline-none transition-all hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
    >
      <option value="">All</option>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  </div>
);

// ============================================
// STAT CARD
// ============================================
const StatCard = ({ title, value, subtitle, icon, color }) => (
  <div className="group relative overflow-hidden rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.03)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_28px_rgba(15,23,42,0.07)] sm:p-5">
    <div className="absolute -right-7 -top-7 h-24 w-24 rounded-full bg-slate-50 transition-transform duration-500 group-hover:scale-150" />

    <div className="relative flex items-center justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.13em] text-slate-400 sm:text-[11px]">
          {title}
        </p>

        <h3 className="mt-2 text-2xl font-extrabold tracking-tight text-slate-800 sm:text-[28px]">
          {Number(value || 0).toLocaleString("en-IN")}
        </h3>

        <p className="mt-1.5 text-[11px] font-medium text-slate-400">
          {subtitle}
        </p>
      </div>

      <div className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-xl shadow-sm sm:h-14 sm:w-14 ${color}`}>
        {icon}
      </div>
    </div>
  </div>
);

// ============================================
// MASTER DATA
// ============================================
const MasterData = () => {
  const [activeTab, setActiveTab] = useState("import");

  const [importData, setImportData] = useState({
    headers: [],
    records: [],
    batches: [],
  });

  const [exportData, setExportData] = useState({
    headers: [],
    records: [],
    batches: [],
  });

  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  const fileInputRef = useRef(null);

  const emptyFilters = {
    search: "",
    destination: "",
    importer: "",
    exporter: "",
    port: "",
  };

  const [draftFilters, setDraftFilters] = useState(emptyFilters);
  const [appliedFilters, setAppliedFilters] = useState(emptyFilters);

  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 10;

  const currentData =
    activeTab === "import" ? importData : exportData;

  // ============================================
  // FETCH DATA
  // ============================================
  const fetchData = async (type = activeTab) => {
    try {
      setLoading(true);

      const response = await API.get(`/master-data/${type}`);
      const result = response.data?.data || {};

      const formattedData = {
        headers: result.headers || [],
        records: result.records || [],
        batches: result.batches || [],
      };

      if (type === "import") {
        setImportData(formattedData);
      } else {
        setExportData(formattedData);
      }
    } catch (error) {
      console.error("Fetch CSV data error:", error);

      toast.error(
        error.response?.data?.message || "Failed to load data."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(activeTab);
  }, [activeTab]);

  // ============================================
  // DETECT CSV COLUMNS
  // ============================================
  const columns = useMemo(() => {
    const headers = currentData.headers;

    return {
      destination: getMatchingHeader(headers, [
        "destination country",
        "destination",
        "dest country",
        "country of destination",
        "country",
      ]),

      importer: getMatchingHeader(headers, [
        "importer",
        "buyer",
        "consignee",
        "cosignee",
      ]),

      exporter: getMatchingHeader(headers, [
        "exporter",
        "seller",
        "shipper",
      ]),

      port: getMatchingHeader(headers, [
        "port of loading",
        "loading port",
        "port of discharge",
        "discharge port",
        "port",
      ]),
    };
  }, [currentData.headers]);

  // ============================================
  // FILTER OPTIONS
  // ============================================
  const filterOptions = useMemo(
    () => ({
      destination: getUniqueOptions(
        currentData.records,
        columns.destination
      ),
      importer: getUniqueOptions(
        currentData.records,
        columns.importer
      ),
      exporter: getUniqueOptions(
        currentData.records,
        columns.exporter
      ),
      port: getUniqueOptions(
        currentData.records,
        columns.port
      ),
    }),
    [currentData.records, columns]
  );

  // ============================================
  // FILTER RECORDS
  // ============================================
  const filteredRecords = useMemo(() => {
    return currentData.records.filter((record) => {
      const searchValue = appliedFilters.search.trim().toLowerCase();

      if (searchValue) {
        const matchesSearch = currentData.headers.some((header) =>
          String(record[header] ?? "")
            .toLowerCase()
            .includes(searchValue)
        );

        if (!matchesSearch) return false;
      }

      const checks = [
        ["destination", columns.destination],
        ["importer", columns.importer],
        ["exporter", columns.exporter],
        ["port", columns.port],
      ];

      for (const [filterKey, header] of checks) {
        const selectedValue = appliedFilters[filterKey];

        if (
          selectedValue &&
          header &&
          String(record[header] ?? "").trim().toLowerCase() !==
            selectedValue.trim().toLowerCase()
        ) {
          return false;
        }
      }

      return true;
    });
  }, [
    currentData.records,
    currentData.headers,
    appliedFilters,
    columns,
  ]);

  // ============================================
  // PAGINATION
  // ============================================
  const totalRecords = filteredRecords.length;
  const totalPages = Math.max(1, Math.ceil(totalRecords / pageSize));

  const paginatedRecords = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;

    return filteredRecords.slice(startIndex, startIndex + pageSize);
  }, [filteredRecords, currentPage]);

  useEffect(() => {
    setCurrentPage((prev) => Math.min(prev, totalPages));
  }, [totalPages]);

  const startRecord =
    totalRecords === 0 ? 0 : (currentPage - 1) * pageSize + 1;

  const endRecord = Math.min(currentPage * pageSize, totalRecords);

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  // ============================================
  // FILTER HANDLERS
  // ============================================
  const updateDraftFilter = (key, value) => {
    setDraftFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleApplyFilters = () => {
    setAppliedFilters({ ...draftFilters });
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setDraftFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
    setCurrentPage(1);
  };

  // ============================================
  // DELETE CSV BATCH
  // ============================================
  const handleDeleteBatch = async (batchId, fileName) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${fileName}"?\n\nAll records uploaded through this CSV will be permanently deleted.`
    );

    if (!confirmed) return;

    try {
      const response = await API.delete(
        `/master-data/batch/${batchId}`
      );

      if (response.data?.status === 1) {
        toast.success(
          response.data.message || "CSV deleted successfully."
        );

        await fetchData(activeTab);
      } else {
        toast.error(
          response.data?.message || "Failed to delete CSV."
        );
      }
    } catch (error) {
      console.error("Delete CSV error:", error);

      toast.error(
        error.response?.data?.message || "Failed to delete CSV file."
      );
    }
  };

  // ============================================
  // CSV UPLOAD
  // ============================================
  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.name.toLowerCase().endsWith(".csv")) {
      toast.error("Please select a CSV file.");
      event.target.value = "";
      return;
    }

    try {
      setUploading(true);

      const text = await file.text();
      const { headers, records } = parseCSV(text);
      validateCSVHeaders(headers, activeTab);

      if (!records.length) {
        throw new Error("No valid records found in CSV.");
      }

      await API.post("/master-data/upload", {
        dataType: activeTab,
        fileName: file.name,
        headers,
        records,
      });

      toast.success(
        `${activeTab === "import" ? "Import" : "Export"} CSV uploaded successfully.`
      );

      setCurrentPage(1);
      handleResetFilters();
      await fetchData(activeTab);
    } catch (error) {
      console.error("CSV upload error:", error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "CSV upload failed."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  // ============================================
  // TAB CHANGE
  // ============================================
  const handleTabChange = (tab) => {
    if (activeTab === tab) return;

    setActiveTab(tab);
    setCurrentPage(1);
    setDraftFilters({ ...emptyFilters });
    setAppliedFilters({ ...emptyFilters });
  };

  // ============================================
  // UI
  // ============================================
  return (
    <div className="cm-admin-teal-page min-h-full w-full min-w-0 bg-[#f5f7fc] p-1 sm:p-1 lg:p-1">

      {/* PAGE HEADER */}
      {/* <div className="mb-5 flex flex-wrap items-center justify-between gap-4"> */}
        {/* <div className="flex min-w-0 items-center gap-3"> */}
          {/* <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#086A65] to-[#14B8A6] text-2xl text-white shadow-lg shadow-teal-600/20">
            <svg
              width="23"
              height="23"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 3h18v18H3z" />
              <path d="M3 9h18M9 21V9" />
              <path d="M7 6h.01M12 6h.01M17 6h.01" />
            </svg>
          </div> */}

          {/* <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
                Master Data
              </h1>
              <span className="rounded-full border border-teal-100 bg-teal-50 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#0A8981]">
                Database
              </span>
            </div>

            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Manage, organize and explore your import & export records
            </p>
          </div> */}
        {/* </div> */}

        {/* <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>
              <span className="text-xl leading-none">＋</span>
              Upload CSV
            </>
          )}
        </button> */}
      {/* </div> */}

      {/* TABS */}
      <div className="mb-5 flex w-full flex-wrap items-center justify-between gap-3">
        <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm">
          {["import", "export"].map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-xs font-bold transition-all sm:text-sm ${
                activeTab === tab
                  ? "bg-gradient-to-r from-[#0A8981] to-[#14B8A6] text-white shadow-md shadow-teal-600/20"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800"
              }`}
            >
              <span>{tab === "import" ? "↓" : "↑"}</span>
              {tab === "import" ? "Import Data" : "Export Data"}
            </button>
          ))}

  
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-sm">
          <span className={`h-2 w-2 rounded-full ${loading ? "animate-pulse bg-amber-400" : "bg-emerald-500"}`} />
          <span className="text-[11px] font-semibold text-slate-500">
            {loading ? "Syncing data..." : "Data synchronized"}
          </span>

                        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,text/csv"
          hidden
          onChange={handleFileChange}
        />

        <button
          onClick={() => fileInputRef.current?.click()}
          disabled={uploading}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-5 text-sm font-bold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/25 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {uploading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Uploading...
            </>
          ) : (
            <>
              <span className="text-xl leading-none">＋</span>
              Upload CSV
            </>
          )}
        </button>
        </div>
      </div>

      {/* CSV SAMPLE & UPLOAD INSTRUCTIONS */}
<div className="mb-5 rounded-2xl border border-slate-200/80 bg-white p-4 shadow-[0_3px_14px_rgba(15,23,42,0.035)] sm:p-5">
  <div className="flex flex-wrap items-center justify-between gap-4">
    <div>
      <h3 className="text-sm font-extrabold text-slate-800">
        CSV Upload Format
      </h3>

      <p className="mt-1 text-xs text-slate-500">
        Download the sample CSV and follow the required column format
        before uploading your data.
      </p>
    </div>

    <button
      type="button"
      onClick={() => downloadSampleCSV(activeTab)}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-xl border border-teal-200 bg-teal-50 px-4 text-xs font-bold text-[#0A8981] transition hover:border-teal-300 hover:bg-teal-100"
    >
      <span>↓</span>
      Download {activeTab === "import" ? "Import" : "Export"} Sample CSV
    </button>
  </div>

  <div className="mt-4 rounded-xl bg-slate-50 p-3 sm:p-4">
    <p className="mb-2 text-[11px] font-bold uppercase tracking-wider text-slate-500">
      Required CSV Columns
    </p>

    <div className="flex flex-wrap gap-2">
      {CSV_TEMPLATES[activeTab].headers.map((header) => (
        <span
          key={header}
          className="rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-[11px] font-semibold text-slate-700"
        >
          {header}
        </span>
      ))}
    </div>
  </div>

  <div className="mt-3 flex items-start gap-2 text-[11px] leading-5 text-slate-500">
    <span className="mt-0.5 text-[#0A8981]">ⓘ</span>

    <p>
      Please keep all 9 column names and their order exactly as shown
      in the sample file. Individual row values can be blank, but
      the CSV must contain at least one data row.
    </p>
  </div>
</div>

      {/* STATS */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Total Records"
          value={currentData.records.length}
          subtitle="All uploaded records"
          icon="▤"
          color="bg-blue-50 text-[#0A8981]"
        />

        <StatCard
          title="CSV Uploads"
          value={currentData.batches.length}
          subtitle="Total uploaded files"
          icon="▣"
          color="bg-violet-50 text-violet-600"
        />

        <StatCard
          title="Total Columns"
          value={currentData.headers.length}
          subtitle="Available data fields"
          icon="▦"
          color="bg-emerald-50 text-emerald-600"
        />

        <StatCard
          title="Filtered Records"
          value={totalRecords}
          subtitle="Records matching filters"
          icon="⌕"
          color="bg-amber-50 text-amber-600"
        />
      </div>

      {/* SEARCH & FILTERS */}
      <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0A8981]">
              ⌕
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                Search & Filters
              </h3>
              <p className="mt-0.5 text-[11px] text-slate-400">
                Refine records using available CSV fields
              </p>
            </div>
          </div>

          <div className="rounded-full border border-teal-100 bg-teal-50 px-3 py-1.5 text-[11px] font-bold text-blue-700">
            {totalRecords.toLocaleString("en-IN")} Results
          </div>
        </div>

        <div className="p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

            {/* SEARCH */}
            <div className="min-w-0 xl:col-span-2">
              <label className="mb-2 flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-slate-500">
                <span className="text-blue-500">⌕</span>
                Search All Fields
              </label>

              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-lg text-slate-400">
                  ⌕
                </span>

                <input
                  type="text"
                  value={draftFilters.search}
                  onChange={(e) =>
                    updateDraftFilter("search", e.target.value)
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleApplyFilters();
                  }}
                  placeholder="Search records, companies, countries..."
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50/70 pl-10 pr-3 text-[13px] font-medium text-slate-700 outline-none transition-all placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10"
                />
              </div>
            </div>

            <FilterSelect
              label="Destination"
              icon="⌖"
              value={draftFilters.destination}
              onChange={(value) => updateDraftFilter("destination", value)}
              options={filterOptions.destination}
            />

            <FilterSelect
              label="Importer / Buyer"
              icon="▣"
              value={draftFilters.importer}
              onChange={(value) => updateDraftFilter("importer", value)}
              options={filterOptions.importer}
            />

            <FilterSelect
              label="Exporter"
              icon="▤"
              value={draftFilters.exporter}
              onChange={(value) => updateDraftFilter("exporter", value)}
              options={filterOptions.exporter}
            />

            <FilterSelect
              label="Port"
              icon="⌖"
              value={draftFilters.port}
              onChange={(value) => updateDraftFilter("port", value)}
              options={filterOptions.port}
            />
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
            <p className="text-[11px] text-slate-400">
              Select your filters and apply to view matching records.
            </p>

            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <button
                onClick={handleResetFilters}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 text-xs font-bold text-slate-600 transition hover:border-slate-300 hover:bg-slate-50 sm:flex-none"
              >
                ↺ Reset
              </button>

              <button
                onClick={handleApplyFilters}
                className="inline-flex h-10 flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#0A8981] to-[#14B8A6] px-6 text-xs font-bold text-white shadow-md shadow-blue-600/15 transition hover:-translate-y-0.5 hover:shadow-lg sm:flex-none"
              >
                <span>⌕</span>
                Apply Filters
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* UPLOAD HISTORY */}
      {currentData.batches.length > 0 && (
        <div className="mb-5 overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50 text-lg text-violet-600">
                ▣
              </div>

              <div>
                <h3 className="text-sm font-extrabold text-slate-800">
                  Upload History
                </h3>
                <p className="mt-0.5 text-[11px] text-slate-400">
                  {currentData.batches.length} uploaded files
                </p>
              </div>
            </div>

            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-[10px] font-bold text-slate-500">
              {activeTab === "import" ? "IMPORT FILES" : "EXPORT FILES"}
            </span>
          </div>

          <div className="flex gap-3 overflow-x-auto p-4 sm:p-5">
            {currentData.batches.map((batch) => (
              <div
                key={batch._id}
                className="flex min-w-[260px] max-w-[320px] shrink-0 items-center justify-between gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 transition hover:border-blue-200 hover:bg-blue-50/40"
              >
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-lg text-emerald-600">
                    ▤
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-xs font-bold text-slate-700" title={batch.fileName}>
                      {batch.fileName}
                    </p>

                    <p className="mt-1 text-[10px] font-medium text-slate-400">
                      {Number(batch.rowCount || 0).toLocaleString("en-IN")} rows
                      {" · "}
                      {batch.createdAt
                        ? new Date(batch.createdAt).toLocaleDateString()
                        : ""}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    handleDeleteBatch(batch._id, batch.fileName)
                  }
                  className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-red-100 bg-white px-3 text-[11px] font-bold text-red-500 transition hover:border-red-200 hover:bg-red-50"
                  title="Delete this CSV file"
                >
                  <span>×</span>
                  Delete
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* RECORDS TABLE */}
      <section className="flex min-h-[520px] w-full min-w-0 flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-[0_3px_14px_rgba(15,23,42,0.035)]">

        {/* TABLE HEADER */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-lg text-[#0A8981]">
              ▤
            </div>

            <div>
              <h3 className="text-sm font-extrabold text-slate-800">
                {activeTab === "import"
                  ? "Import Records"
                  : "Export Records"}
              </h3>

              <p className="mt-1 text-[11px] text-slate-400">
                Showing {startRecord.toLocaleString("en-IN")}–{endRecord.toLocaleString("en-IN")} of{" "}
                {totalRecords.toLocaleString("en-IN")} matching records
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg border border-teal-100 bg-teal-50 px-3 py-1.5 text-[10px] font-bold text-blue-700">
              {currentData.headers.length} Columns
            </span>

            <span className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-[10px] font-bold text-slate-500">
              10 / Page
            </span>
          </div>
        </div>

        {/* TABLE */}
        <div
          className="w-full max-h-[560px] flex-1 overflow-auto"
          style={{
            overscrollBehavior: "contain",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loading ? (
            <div className="flex min-h-64 items-center justify-center gap-3 text-sm font-medium text-slate-400">
              <span className="h-5 w-5 animate-spin rounded-full border-2 border-blue-500 border-t-transparent" />
              Loading master data...
            </div>
          ) : paginatedRecords.length === 0 ? (
            <div className="flex min-h-64 flex-col items-center justify-center px-4 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100 text-3xl">
                ▤
              </div>

              <h4 className="text-sm font-bold text-slate-700">
                {currentData.records.length === 0
                  ? "No data uploaded yet"
                  : "No matching records found"}
              </h4>

              <p className="mt-1.5 max-w-sm text-xs text-slate-400">
                Upload a CSV file or change your search filters to see records here.
              </p>

              {currentData.records.length > 0 && (
                <button
                  onClick={handleResetFilters}
                  className="mt-4 rounded-lg bg-blue-50 px-4 py-2 text-xs font-bold text-[#0A8981] transition hover:bg-blue-100"
                >
                  Clear Filters
                </button>
              )}
            </div>
          ) : (
            <table className="w-max min-w-full border-collapse text-left">
              <thead className="sticky top-0 z-20 bg-[#f5f7fc]">
                <tr>
                  <th className="sticky left-0 z-30 whitespace-nowrap border-b border-r border-slate-200 bg-[#f5f7fc] px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500">
                    #
                  </th>

                  {currentData.headers.map((header) => (
                    <th
                      key={header}
                      className="whitespace-nowrap border-b border-slate-200 px-4 py-3.5 text-[10px] font-extrabold uppercase tracking-[0.12em] text-slate-500"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {paginatedRecords.map((record, index) => (
                  <tr
                    key={`${record._batchId || "batch"}-${record._rowNumber || index}-${index}`}
                    className="group transition-colors hover:bg-blue-50/50"
                  >
                    <td className="sticky left-0 z-10 whitespace-nowrap border-r border-slate-100 bg-white px-4 py-3 text-xs font-bold text-slate-400 transition-colors group-hover:bg-blue-50">
                      {(currentPage - 1) * pageSize + index + 1}
                    </td>

                    {currentData.headers.map((header) => (
                      <td
                        key={header}
                        title={String(record[header] ?? "")}
                        className="max-w-[300px] truncate whitespace-nowrap px-4 py-3 text-[12px] font-medium text-slate-600"
                      >
                        {record[header] !== undefined &&
                        record[header] !== ""
                          ? record[header]
                          : "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* PAGINATION */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-t border-slate-100 bg-white px-4 py-3 sm:px-5">
          <p className="text-[11px] font-medium text-slate-400">
            Showing{" "}
            <span className="font-bold text-slate-700">
              {startRecord}–{endRecord}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-700">
              {totalRecords.toLocaleString("en-IN")}
            </span>{" "}
            records
          </p>

          <div className="flex flex-wrap items-center gap-1.5">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1 || totalRecords === 0}
              className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-xs font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
              title="First page"
            >
              «
            </button>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.max(1, prev - 1))
              }
              disabled={currentPage === 1 || totalRecords === 0}
              className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Previous
            </button>

            {getPageNumbers().map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`flex h-9 min-w-9 items-center justify-center rounded-lg px-2.5 text-xs font-bold transition ${
                  currentPage === page
                    ? "bg-gradient-to-r from-[#0A8981] to-[#14B8A6] text-white shadow-md shadow-teal-600/20"
                    : "border border-slate-200 text-slate-500 hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981]"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) =>
                  Math.min(totalPages, prev + 1)
                )
              }
              disabled={currentPage >= totalPages || totalRecords === 0}
              className="flex h-9 items-center justify-center rounded-lg border border-slate-200 px-3 text-[11px] font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
            >
              Next
            </button>

            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage >= totalPages || totalRecords === 0}
              className="flex h-9 min-w-9 items-center justify-center rounded-lg border border-slate-200 px-2 text-xs font-bold text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-[#0A8981] disabled:cursor-not-allowed disabled:opacity-40"
              title="Last page"
            >
              »
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MasterData;