import React, { useEffect, useState } from "react";
import ReactCountryFlag from "react-country-flag";

import {
  getDocumentDashboard,
  getDocumentsByType,
  getDocumentStatusOverview,
  getDocumentInsights,
  getDashboardExpiringDocuments,
  getStorage,
  getDocuments,
  getRecentUploads,
} from "../../api/DocumentApi";

import ExportReport from "../../components/b2bComponent/ExportReport";
import DateRangeModal from "../../components/b2bComponent/DateRange";
import AllRecentUploadsModal from "../../components/b2bComponent/AllRecentUpload";
import UploadShipment from "../../components/b2bComponent/UploadShipment";

import {
  CalendarDays,
  Download,
  Upload,
  Search,
  ChevronDown,
  FileText,
  Clock,
  CalendarClock,
  CheckCircle2,
  Archive,
  ChevronLeft,
  ChevronRight,
  AlertTriangle,
  FileCheck,
  Sparkles,
  Eye,
  ExternalLink,
  RefreshCw,
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
  CartesianGrid,
  Tooltip,
} from "recharts";

const HEADING = "text-[#07156B]";

const COUNTRY_CODES = {
  China: "CN",
  "S. Korea": "KR",
  Germany: "DE",
  USA: "US",
  India: "IN",
  Singapore: "SG",
  UAE: "AE",
  Belgium: "BE",
  Netherlands: "NL",
};

const COLORS = [
  "#2563EB",
  "#10B981",
  "#1E3A8A",
  "#F59E0B",
  "#B91C1C",
  "#94A3B8",
];

const DOCUMENT_TYPE_OPTIONS = [
  "Required",
  "If Applicable",
  "Not Required",
];

const STATUS_OPTIONS = [
  "Pending",
  "Uploaded",
  "Verified",
  "Rejected",
  "Expired",
  "In Transit",
  "Not Required",
];

// -------------------------------------
// Helper functions
// -------------------------------------

const getResponseData = (res) => res?.data?.data;

const getList = (data) => {
  if (Array.isArray(data)) return data;
  if (Array.isArray(data?.documents)) return data.documents;
  if (Array.isArray(data?.results)) return data.results;
  return [];
};

const getDocumentName = (doc) => {
  return doc?.documentName || "Unnamed Document";
};

const getFileName = (doc) => {
  return (
    doc?.fileName ||
    doc?.fileUrl?.split("?")[0]?.split("/").pop() ||
    "View Document"
  );
};

const getShipmentNumber = (doc) => {
  const shipment = doc?.shipmentId;

  if (shipment && typeof shipment === "object") {
    return shipment.sbNumber || shipment.referenceNumber || "-";
  }

  return doc?.shipmentNumber || "-";
};

const getShipmentId = (doc) => {
  if (doc?.shipmentId && typeof doc.shipmentId === "object") {
    return doc.shipmentId._id;
  }

  return doc?.shipmentId || "";
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) return "-";

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const getUploaderName = (doc) => {
  if (doc?.uploadedBy && typeof doc.uploadedBy === "object") {
    return doc.uploadedBy.name || doc.uploadedBy.email || "User";
  }

  return "User";
};

const getDocumentFileUrl = (doc) => {
  const rawUrl = doc?.fileUrl || doc?.url || "";

  if (!rawUrl) return "";

  // Already absolute URL
  if (/^https?:\/\//i.test(rawUrl)) return rawUrl;

  const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5002";

  // Relative upload path
  const cleanPath = rawUrl.startsWith("/")
    ? rawUrl
    : `/${rawUrl}`;

  return `${API_BASE.replace(/\/$/, "")}${cleanPath}`;
};

// -------------------------------------
// Small components
// -------------------------------------

function Flag({ country, size = 14 }) {
  const countryCode = COUNTRY_CODES[country];

  if (!countryCode) {
    return <span className="text-slate-400">—</span>;
  }

  return (
    <ReactCountryFlag
      countryCode={countryCode}
      svg
      style={{
        width: size,
        height: size,
        borderRadius: "2px",
      }}
    />
  );
}

function StatusBadge({ status }) {
  const styles = {
    Verified: "bg-green-100 text-green-700",
    "In Transit": "bg-blue-100 text-blue-700",
    Pending: "bg-amber-100 text-amber-700",
    Uploaded: "bg-indigo-100 text-indigo-700",
    Rejected: "bg-rose-100 text-rose-700",
    Expired: "bg-red-100 text-red-700",
    "Not Required": "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${
        styles[status] || "bg-slate-100 text-slate-600"
      }`}
    >
      {status || "Pending"}
    </span>
  );
}

function DocumentTypeBadge({ type }) {
  const styles = {
    Required: "bg-blue-50 text-blue-700",
    "If Applicable": "bg-amber-50 text-amber-700",
    "Not Required": "bg-slate-100 text-slate-600",
  };

  return (
    <span
      className={`text-[10px] font-bold px-2.5 py-1 rounded-lg whitespace-nowrap ${
        styles[type] || "bg-slate-100 text-slate-600"
      }`}
    >
      {type || "-"}
    </span>
  );
}

const DOC_STYLES = {
  "Commercial Invoice": "bg-slate-800",
  "Packing List": "bg-teal-500",
  "Bill of Lading": "bg-blue-500",
  "Certificate of Origin": "bg-sky-500",
  "Insurance Certificate": "bg-indigo-700",
  "Phytosanitary Certificate": "bg-teal-600",
  "Import License": "bg-amber-500",
  "Customs Declaration": "bg-purple-600",
  MSDS: "bg-slate-900",
  "Inspection Report": "bg-slate-500",
};

function DocIcon({ type }) {
  return (
    <div
      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 text-white ${
        DOC_STYLES[type] || "bg-blue-600"
      }`}
    >
      <FileText size={16} />
    </div>
  );
}

function SectionCard({ children, className = "" }) {
  return (
    <div
      className={`bg-white border border-slate-100 rounded-2xl p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

function ViewAllHeader({ title, text = "View All", onClick }) {
  return (
    <div className="flex justify-between items-center mb-3">
      <h3 className={`font-bold text-sm ${HEADING}`}>{title}</h3>

      {onClick && (
        <button
          className="text-blue-600 text-[11px] font-bold shrink-0"
          onClick={onClick}
        >
          {text} →
        </button>
      )}
    </div>
  );
}

function EmptyState({ message = "No documents found." }) {
  return (
    <div className="py-12 flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center mb-3">
        <FileText size={24} className="text-blue-500" />
      </div>

      <p className={`text-sm font-bold ${HEADING}`}>
        No Documents Found
      </p>

      <p className="text-xs text-slate-400 mt-1 text-center">
        {message}
      </p>
    </div>
  );
}

// -------------------------------------
// Main dashboard
// -------------------------------------

export default function DocumentsDashboard() {
  const [dashboard, setDashboard] = useState({});
  const [documents, setDocuments] = useState([]);
  const [documentsByType, setDocumentsByType] = useState([]);
  const [statusOverview, setStatusOverview] = useState([]);
  const [documentInsights, setDocumentInsights] = useState({});
  const [expiringDocuments, setExpiringDocuments] = useState([]);
  const [recentUploads, setRecentUploads] = useState([]);
  const [storage, setStorage] = useState({});
  const [previewDocument, setPreviewDocument] = useState(null);

  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState(false);
  const [exportReport, setExportReport] = useState(false);
  const [uploadShipment, setUploadShipment] = useState(false);
  const [recentUpload, setRecentUpload] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // -------------------------------------
  // Fetch all dashboard data
  // -------------------------------------

  const fetchDashboardData = async () => {
    setLoading(true);

    const results = await Promise.allSettled([
      getDocumentDashboard(),
      getDocuments(),
      getDocumentsByType(),
      getDocumentStatusOverview(),
      getDocumentInsights(),
      getDashboardExpiringDocuments(),
      getRecentUploads({ limit: 5 }),
      getStorage(),
    ]);

    const [
      dashboardRes,
      documentsRes,
      typeRes,
      statusRes,
      insightsRes,
      expiringRes,
      recentRes,
      storageRes,
    ] = results;

    if (dashboardRes.status === "fulfilled") {
      setDashboard(getResponseData(dashboardRes.value) || {});
    } else {
      console.error("Dashboard fetch error:", dashboardRes.reason);
    }

    if (documentsRes.status === "fulfilled") {
      setDocuments(getList(getResponseData(documentsRes.value)));
    } else {
      console.error("Documents fetch error:", documentsRes.reason);
      setDocuments([]);
    }

    if (typeRes.status === "fulfilled") {
      setDocumentsByType(getList(getResponseData(typeRes.value)));
    }

    if (statusRes.status === "fulfilled") {
      setStatusOverview(getList(getResponseData(statusRes.value)));
    }

    if (insightsRes.status === "fulfilled") {
      setDocumentInsights(getResponseData(insightsRes.value) || {});
    }

    if (expiringRes.status === "fulfilled") {
      setExpiringDocuments(getList(getResponseData(expiringRes.value)));
    }

    if (recentRes.status === "fulfilled") {
      setRecentUploads(getList(getResponseData(recentRes.value)));
    } else {
      console.error("Recent uploads fetch error:", recentRes.reason);
      setRecentUploads([]);
    }

    if (storageRes.status === "fulfilled") {
      setStorage(getResponseData(storageRes.value) || {});
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // All returned documents are already scoped by the authenticated user in the backend.
  const filteredDocuments = documents;

  // -------------------------------------
  // Pagination
  // -------------------------------------

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocuments.length / itemsPerPage)
  );

  const paginatedDocuments = filteredDocuments.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(totalPages);
    }
  }, [currentPage, totalPages]);

  // -------------------------------------
  // Dashboard calculations
  // -------------------------------------

  const KPI_STATS = [
    {
      title: "Total Documents",
      value: dashboard.totalDocuments ?? documents.length,
      icon: FileText,
      bg: "bg-blue-50",
      color: "text-blue-500",
    },
    {
      title: "Uploaded This Month",
      value: dashboard.uploadedThisMonth ?? 0,
      icon: Upload,
      bg: "bg-emerald-50",
      color: "text-emerald-500",
    },
    // {
    //   title: "Pending Verification",
    //   value: dashboard.pendingVerification ?? 0,
    //   icon: Clock,
    //   bg: "bg-orange-50",
    //   color: "text-orange-500",
    // },
    // {
    //   title: "Expiring Soon",
    //   value: dashboard.expiringSoon ?? expiringDocuments.length,
    //   icon: CalendarClock,
    //   bg: "bg-rose-50",
    //   color: "text-rose-500",
    // },
    // {
    //   title: "Verified Documents",
    //   value: dashboard.verifiedDocuments ?? 0,
    //   icon: CheckCircle2,
    //   bg: "bg-teal-50",
    //   color: "text-teal-500",
    // },
  ];

  const totalDocumentsByType = documentsByType.reduce(
    (sum, item) => sum + (Number(item.count) || 0),
    0
  );

  const DOC_TYPE_DIST = documentsByType.map((item, index) => ({
    name: item._id || "Other",
    value: Number(item.count) || 0,
    percent:
      totalDocumentsByType > 0
        ? (
            ((Number(item.count) || 0) / totalDocumentsByType) *
            100
          ).toFixed(1) + "%"
        : "0%",
    color: COLORS[index % COLORS.length],
  }));

  const STATUS_TREND = statusOverview.map((item) => ({
    date: item._id
      ? new Date(item._id).toLocaleDateString("en-IN", {
          day: "2-digit",
          month: "short",
        })
      : "-",
    verified: item.verified || 0,
    transit: item.transit || 0,
    pending: item.pending || 0,
    expired: item.expired || 0,
  }));

  const DOC_INSIGHTS = [
    {
      icon: FileCheck,
      bg: "bg-blue-50",
      color: "text-blue-500",
      text: "Document Verification Rate",
      sub: `${documentInsights.verificationRate ?? 0}% (${
        documentInsights.verified ?? 0
      } of ${documentInsights.total ?? 0} verified)`,
    },
    {
      icon: Clock,
      bg: "bg-orange-50",
      color: "text-orange-500",
      text: "Pending Verification",
      sub: `${documentInsights.pending ?? 0} documents are pending verification`,
    },
    {
      icon: FileText,
      bg: "bg-rose-50",
      color: "text-rose-500",
      text: "Expired Documents",
      sub: `${documentInsights.expired ?? 0} documents have expired`,
    },
  ];

  // -------------------------------------
  // Render
  // -------------------------------------

  return (
    <div className="cm-module-theme min-h-screen w-full bg-[#F8FAFC] text-slate-600 font-sans antialiased py-1">
      <div className="max-w-[1500px] mx-auto p-1 sm:p-1 md:p-1">

        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mt-1   mb-1">
          {/* <div>
            <h1 className={`text-xl sm:text-2xl font-bold tracking-tight ${HEADING}`}>
              Documents
            </h1>

            <p className="text-[11px] sm:text-xs text-slate-400 mt-1">
              Manage, organize and track all your shipment documents in one place.
            </p>
          </div> */}

          <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
            {/* <div className="relative flex-1 md:flex-none">
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
                placeholderText="Select date range"
                className={`w-full bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold pl-3 pr-9 py-2.5 rounded-xl shadow-sm outline-none cursor-pointer ${HEADING}`}
              />

              <CalendarDays
                size={14}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div> */}

            {/* <button
              onClick={() => setExportReport(true)}
              className={`flex-1 md:flex-none flex items-center justify-center gap-2 bg-white border border-slate-200 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2.5 rounded-xl shadow-sm hover:bg-slate-50 transition whitespace-nowrap ${HEADING}`}
            >
              <Download size={14} />
              Export Report
            </button> */}

            {/* <button
              onClick={() => setUploadShipment(true)}
              className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-[11px] sm:text-xs font-semibold px-3 sm:px-4 py-2.5 rounded-xl text-white shadow-sm transition whitespace-nowrap"
            >
              <Upload size={14} />
              Upload Shipment
            </button> */}
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-5">
          {KPI_STATS.map((stat, idx) => {
            const Icon = stat.icon;

            return (
              <div
                key={idx}
                className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition duration-200"
              >
                <div className="flex justify-between items-start gap-2">
                  <span className={`text-[10px] sm:text-[11px] font-bold leading-tight ${HEADING}`}>
                    {stat.title}
                  </span>

                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${stat.bg} ${stat.color}`}>
                    <Icon size={15} />
                  </div>
                </div>

                <div className="mt-2.5">
                  <h4 className={`text-sm sm:text-lg font-bold tracking-tight ${HEADING}`}>
                    {stat.value}
                  </h4>
                </div>
              </div>
            );
          })}

          {/* Storage */}
          {/* <div className="bg-white border border-slate-100 p-3 sm:p-3.5 rounded-2xl shadow-sm flex flex-col justify-between hover:shadow-md transition">
            <div className="flex justify-between items-start gap-2">
              <span className={`text-[10px] sm:text-[11px] font-semibold ${HEADING}`}>
                Storage Used
              </span>

              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 bg-indigo-50 text-indigo-500">
                <Archive size={15} />
              </div>
            </div>

            <div className="mt-2.5">
              <h4 className={`text-sm sm:text-base font-extrabold ${HEADING}`}>
                {((storage.totalStorage || 0) / (1024 * 1024)).toFixed(2)} MB
              </h4>

              <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden mt-1.5">
                <div
                  className="bg-blue-500 h-full rounded-full"
                  style={{ width: "100%" }}
                />
              </div>

              <span className="text-[9px] font-bold block mt-1 text-slate-400">
                {storage.documents || 0} Documents
              </span>
            </div>
          </div> */}
        </div>

        {/* Document List - automatically scoped to the logged-in user's shipments */}
        {/* Document List */}
        <SectionCard className="mb-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <div>
              <h3 className={`font-bold text-base ${HEADING}`}>
                Document List
              </h3>

              <p className="text-[10px] text-slate-400 mt-0.5">
                Documents uploaded against your shipments.
              </p>
            </div>

            <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">
              {filteredDocuments.length} Documents
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-[11px] min-w-[1050px]">
              <thead>
                <tr className="text-[10px] text-[#07156B] uppercase font-bold border-b border-slate-100 bg-slate-50/70">
                  <th className="text-left py-3 px-2">#</th>
                  <th className="text-left py-3 px-2">Document Name</th>
                  <th className="text-left py-3 px-2">Type</th>
                  <th className="text-left py-3 px-2">Shipment / Ref No.</th>
                  <th className="text-left py-3 px-2">Related To</th>
                  {/* <th className="text-left py-3 px-2">Country</th> */}
                  <th className="text-left py-3 px-2">Uploaded By</th>
                  <th className="text-left py-3 px-2">Upload Date</th>
                  {/* <th className="text-left py-3 px-2">Expiry Date</th> */}
                  <th className="text-left py-3 px-2">Status</th>
                  <th className="text-center py-3 px-2">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan="11" className="py-12 text-center">
                      <div className="flex items-center justify-center gap-2 text-blue-600 text-xs font-semibold">
                        <RefreshCw size={15} className="animate-spin" />
                        Loading documents...
                      </div>
                    </td>
                  </tr>
                ) : paginatedDocuments.length > 0 ? (
                  paginatedDocuments.map((d, index) => {
                    const fileUrl = getDocumentFileUrl(d);

                    return (
                      <tr
                        key={d._id}
                        className="hover:bg-blue-50/40 transition-colors"
                      >
                        <td className="py-3 px-2 text-slate-400 font-semibold">
                          {(currentPage - 1) * itemsPerPage + index + 1}
                        </td>

                        {/* Document Name */}
                        <td className="py-3 px-2">
                          <div className="flex items-center gap-2.5 min-w-[200px]">
                            <DocIcon type={d.documentName} />

                            <div className="min-w-0">
                              <p className={`font-bold text-[11px] ${HEADING}`}>
                                {getDocumentName(d)}
                              </p>

                              <p
                                className="text-[10px] text-slate-400 max-w-[170px] truncate mt-0.5"
                                title={getFileName(d)}
                              >
                                {getFileName(d)}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Required Type */}
                        <td className="py-3 px-2">
                          <DocumentTypeBadge type={d.documentType} />
                        </td>

                        {/* Shipment */}
                        <td className={`py-3 px-2 font-bold whitespace-nowrap ${HEADING}`}>
                          {getShipmentNumber(d)}
                        </td>

                        {/* Related To */}
                        <td className="py-3 px-2 text-slate-500 font-medium whitespace-nowrap">
                          {d.relatedTo || "Shipment"}
                        </td>

                        {/* Country */}
                        {/* <td className="py-3 px-2 whitespace-nowrap">
                          <span className="flex items-center gap-1.5 text-slate-600 font-medium">
                            <Flag country={d.country} />
                            {d.country || "-"}
                          </span>
                        </td> */}

                        {/* Uploaded By */}
                        <td className="py-3 px-2 text-slate-600 whitespace-nowrap">
                          {getUploaderName(d)}
                        </td>

                        {/* Upload Date */}
                        <td className="py-3 px-2 text-slate-500 font-medium whitespace-nowrap">
                          {formatDate(d.uploadedDate || d.createdAt)}
                        </td>

                        {/* Expiry Date */}
                        {/* <td className="py-3 px-2 text-slate-500 font-medium whitespace-nowrap">
                          {formatDate(d.expiryDate)}
                        </td> */}

                        {/* Status */}
                        <td className="py-3 px-2">
                          <StatusBadge status={d.status} />
                        </td>

                        {/* Action */}
                        <td className="py-3 px-2 text-center">
  {fileUrl ? (
    <button
      type="button"
      onClick={() =>
        setPreviewDocument({
          ...d,
          previewUrl: fileUrl,
        })
      }
      title="Preview document"
      className="inline-flex items-center justify-center w-8 h-8 rounded-lg text-blue-600 hover:bg-blue-50 transition"
    >
      <Eye size={15} />
    </button>
  ) : (
    <span className="text-slate-300">—</span>
  )}
</td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="11">
                      <EmptyState message="Documents uploaded through the shipment form will appear here." />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {!loading && filteredDocuments.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-4 pt-3 border-t border-slate-100">
              <span className="text-[11px] text-slate-500 font-medium">
                Showing{" "}
                {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(currentPage * itemsPerPage, filteredDocuments.length)}{" "}
                of {filteredDocuments.length} documents
              </span>

              <div className="flex items-center gap-1.5">
                <button
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronLeft size={14} />
                </button>

                <span className="text-xs font-bold text-blue-700 px-3">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                  className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40"
                >
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          )}
        </SectionCard>

        {/* Analytics */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 mb-5">

          {/* Documents by Type */}
          <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>
                Documents by Type
              </h3>

              <button
                onClick={() => setDateRange(true)}
                className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600"
              >
                This Month
                <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>

            {DOC_TYPE_DIST.length > 0 ? (
              <div className="flex items-center gap-3">
                <div className="relative w-[120px] h-[120px] shrink-0">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={DOC_TYPE_DIST}
                        innerRadius={36}
                        outerRadius={56}
                        dataKey="value"
                        stroke="none"
                      >
                        {DOC_TYPE_DIST.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <span className={`font-black text-base ${HEADING}`}>
                      {totalDocumentsByType}
                    </span>
                    <span className="text-[8px] text-slate-400 font-bold uppercase">
                      Total
                    </span>
                  </div>
                </div>

                <div className="space-y-1.5 flex-1 text-[10px]">
                  {DOC_TYPE_DIST.map((r, i) => (
                    <div key={i} className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5 min-w-0">
                        <div
                          className="w-2 h-2 rounded-full shrink-0"
                          style={{ backgroundColor: r.color }}
                        />
                        <span className="text-slate-600 font-semibold truncate max-w-[100px]">
                          {r.name}
                        </span>
                      </div>

                      <span className={`font-bold whitespace-nowrap ${HEADING}`}>
                        {r.value} ({r.percent})
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <EmptyState message="Document category statistics will appear here." />
            )}

            <p className="text-[9px] text-slate-400 mt-3">
              Based on the document distribution returned by your dashboard API.
            </p>
          </SectionCard>

          <SectionCard>
            <ViewAllHeader
              title="Recent Uploads"
              onClick={() => setRecentUpload(true)}
            />

            <div className="overflow-x-auto">
              <table className="w-full text-[11px] min-w-[450px]">
                <thead>
                  <tr className="text-[9px] text-slate-400 uppercase font-bold border-b border-slate-100">
                    <th className="text-left pb-3 font-bold">Document</th>
                    <th className="text-left pb-3 font-bold">Type</th>
                    <th className="text-left pb-3 font-bold">Date</th>
                    <th className="text-left pb-3 font-bold">Uploaded By</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-50">
                  {recentUploads.length > 0 ? (
                    recentUploads.map((u) => (
                      <tr key={u._id}>
                        <td className="py-2.5">
                          <div className="flex items-center gap-2 min-w-[170px]">
                            <DocIcon type={u.documentName} />

                            <div className="min-w-0">
                              <p className={`text-[11px] font-bold ${HEADING}`}>
                                {getDocumentName(u)}
                              </p>

                              {u.fileUrl ? (
                                <a
                                  href={getDocumentFileUrl(u)}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="text-[10px] text-blue-600 hover:underline block max-w-[140px] truncate"
                                >
                                  {getFileName(u)}
                                </a>
                              ) : (
                                <span className="text-[10px] text-slate-400">
                                  No file
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        <td className="py-2.5 whitespace-nowrap">
                          <DocumentTypeBadge type={u.documentType} />
                        </td>

                        <td className="py-2.5 text-slate-500 whitespace-nowrap">
                          {formatDate(u.uploadedDate || u.createdAt)}
                        </td>

                        <td className="py-2.5 text-slate-600 whitespace-nowrap">
                          {getUploaderName(u)}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="py-6 text-center">
                        <p className="text-xs text-slate-400">
                          No recent uploads found.
                        </p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </SectionCard>

          {/* Status Overview */}
          {/* <SectionCard>
            <div className="flex justify-between items-center mb-3">
              <h3 className={`font-bold text-sm ${HEADING}`}>
                Document Status Overview
              </h3>

              <button
                onClick={() => setDateRange(true)}
                className="flex items-center gap-1 bg-white border border-slate-200 rounded-lg px-2 py-1 text-[10px] font-semibold text-slate-600"
              >
                This Month
                <ChevronDown size={11} className="text-slate-400" />
              </button>
            </div>

            {STATUS_TREND.length > 0 ? (
              <>
                <div className="h-[130px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={STATUS_TREND}
                      margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid stroke="#F1F5F9" vertical={false} />

                      <XAxis
                        dataKey="date"
                        tick={{ fill: "#94a3b8", fontSize: 8 }}
                        tickLine={false}
                        axisLine={false}
                      />

                      <YAxis
                        tick={{ fill: "#94a3b8", fontSize: 9 }}
                        tickLine={false}
                        axisLine={false}
                        width={30}
                      />

                      <Tooltip />

                      <Line
                        type="monotone"
                        dataKey="verified"
                        stroke="#10B981"
                        strokeWidth={2}
                        dot={false}
                      />

                      <Line
                        type="monotone"
                        dataKey="transit"
                        stroke="#06B6D4"
                        strokeWidth={2}
                        dot={false}
                      />

                      <Line
                        type="monotone"
                        dataKey="pending"
                        stroke="#F59E0B"
                        strokeWidth={2}
                        dot={false}
                      />

                      <Line
                        type="monotone"
                        dataKey="expired"
                        stroke="#EF4444"
                        strokeWidth={2}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-wrap gap-3 justify-center mt-2 text-[10px] font-semibold text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    Verified
                  </span>

                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-cyan-500" />
                    In Transit
                  </span>

                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-amber-400" />
                    Pending
                  </span>

                  <span className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-rose-500" />
                    Expired
                  </span>
                </div>
              </>
            ) : (
              <EmptyState message="Document status statistics will appear here." />
            )}
          </SectionCard> */}

          {/* Insights */}
          {/* <SectionCard>
            <div className="flex items-center gap-1.5 mb-4">
              <Sparkles size={14} className="text-blue-500" />

              <h3 className={`font-bold text-sm ${HEADING}`}>
                Document Insights
              </h3>
            </div>

            <div className="space-y-4">
              {DOC_INSIGHTS.map((s, i) => {
                const Icon = s.icon;

                return (
                  <div key={i} className="flex items-start gap-2.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${s.bg} ${s.color}`}
                    >
                      <Icon size={15} />
                    </div>

                    <div>
                      <p className="text-[11px] text-slate-700 font-semibold leading-snug">
                        {s.text}
                      </p>

                      <p className="text-[10px] text-slate-400 font-medium mt-1">
                        {s.sub}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </SectionCard> */}
        </div>

        {/* Expiring and Recent Uploads */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-4">

          {/* Expiring Soon */}
          {/* <SectionCard>
            <ViewAllHeader title="Expiring Soon" />

            <div className="space-y-2.5">
              {expiringDocuments.length > 0 ? (
                expiringDocuments.map((doc) => {
                  const daysLeft = Math.ceil(
                    (new Date(doc.expiryDate) - new Date()) /
                      (1000 * 60 * 60 * 24)
                  );

                  const level =
                    daysLeft <= 7
                      ? "critical"
                      : daysLeft <= 30
                        ? "warn"
                        : "safe";

                  const badgeStyles = {
                    warn: "bg-amber-100 text-amber-700",
                    critical: "bg-rose-100 text-rose-700",
                    safe: "bg-green-100 text-green-700",
                  };

                  return (
                    <div
                      key={doc._id}
                      className="flex items-center justify-between gap-2 border border-slate-100 rounded-xl p-3 hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center shrink-0">
                          <AlertTriangle size={14} className="text-orange-500" />
                        </div>

                        <div className="min-w-0">
                          <p className={`text-[11px] font-bold ${HEADING}`}>
                            {getShipmentNumber(doc)}
                          </p>

                          <p className="text-[10px] text-slate-500 truncate">
                            {getDocumentName(doc)}
                          </p>

                          <p className="text-[10px] text-slate-400 mt-0.5">
                            Expires on {formatDate(doc.expiryDate)}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-1 rounded-full whitespace-nowrap ${badgeStyles[level]}`}
                      >
                        {daysLeft < 0
                          ? "Expired"
                          : `${daysLeft} days left`}
                      </span>
                    </div>
                  );
                })
              ) : (
                <EmptyState message="No documents are expiring soon." />
              )}
            </div>
          </SectionCard> */}

          {/* Recent Uploads */}
         
        </div>
      </div>

      {/* Document Preview Modal */}
{previewDocument && (
  <div
    className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6"
    onClick={() => setPreviewDocument(null)}
  >
    <div
      className="bg-white w-full max-w-5xl h-[90vh] rounded-2xl shadow-2xl flex flex-col overflow-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Modal Header */}
      <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-4 border-b border-slate-100">
        <div className="min-w-0">
          <h3 className="text-sm sm:text-base font-bold text-[#07156B] truncate">
            {getDocumentName(previewDocument)}
          </h3>

          <p className="text-[10px] text-slate-400 mt-1 truncate">
            {getFileName(previewDocument)}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <a
            href={previewDocument.previewUrl}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-50 text-blue-600 text-xs font-semibold hover:bg-blue-100"
          >
            <ExternalLink size={14} />
            <span className="hidden sm:inline">Open</span>
          </a>

          <button
            type="button"
            onClick={() => setPreviewDocument(null)}
            className="w-9 h-9 flex items-center justify-center rounded-lg bg-slate-100 text-slate-600 hover:bg-rose-50 hover:text-rose-600"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 bg-slate-100 flex items-center justify-center overflow-auto p-3">
        {/\.(jpg|jpeg|png|gif|webp|bmp|svg)(\?.*)?$/i.test(
          previewDocument.previewUrl
        ) ? (
          <img
            src={previewDocument.previewUrl}
            alt={getDocumentName(previewDocument)}
            className="max-w-full max-h-full object-contain rounded-lg shadow-sm"
          />
        ) : /\.pdf(\?.*)?$/i.test(previewDocument.previewUrl) ? (
          <iframe
            src={previewDocument.previewUrl}
            title={getDocumentName(previewDocument)}
            className="w-full h-full bg-white rounded-lg"
          />
        ) : (
          <div className="text-center bg-white rounded-2xl p-8 max-w-sm shadow-sm">
            <FileText size={45} className="mx-auto text-blue-500 mb-3" />

            <h3 className="font-bold text-[#07156B] text-sm">
              Preview not available
            </h3>

            <p className="text-xs text-slate-400 mt-2 mb-5">
              This file type cannot be previewed here. Open or download the file instead.
            </p>

            <a
              href={previewDocument.previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-semibold hover:bg-blue-700"
            >
              <ExternalLink size={14} />
              Open Document
            </a>
          </div>
        )}
      </div>
    </div>
  </div>
)}


      {/* Modals */}
      {exportReport && (
        <ExportReport onClose={() => setExportReport(false)} />
      )}

      {dateRange && (
        <DateRangeModal onClose={() => setDateRange(false)} />
      )}

      {uploadShipment && (
        <UploadShipment
          onClose={() => {
            setUploadShipment(false);
            fetchDashboardData();
          }}
        />
      )}

      {recentUpload && (
        <AllRecentUploadsModal
          onClose={() => setRecentUpload(false)}
        />
      )}
    </div>

    
  );
}