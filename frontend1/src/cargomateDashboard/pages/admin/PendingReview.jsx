


// mahima code //


import { useState, useEffect } from "react";
import {
  Clock,
  FileText,
  FileClock,
  Timer,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  Calendar,
  Layers,
  ChevronRight,
  ShieldCheck,
  ExternalLink,
  ChevronLeft,
  ChevronsLeft,
  ChevronsRight,
  MapPin,
} from "lucide-react";
import {
  FaPlus,
  FaMagnifyingGlass,
  FaXmark,
  FaChevronDown,
  FaStar,
  FaTruck,
  FaBoxOpen,
  FaWarehouse,
  FaFileContract,
} from "react-icons/fa6";
import ReviewShipment from "./ReviewShipment";
import {
  getAllShipmentsForAdmin,
  approveShipment,
  rejectShipment,
  holdShipment,
} from "../../api/ShipmentApi";

const getShipmentDecisionStatus = (shipment) => {
  const statuses = [
    shipment?.approvalStatus,
    shipment?.workflowStatus,
    shipment?.status,
    shipment?.shipmentStatus,
  ]
    .filter(Boolean)
    .map((status) => String(status).trim());

  const normalized = statuses.map((status) => status.toLowerCase());

  if (normalized.some((status) => status.includes("reject"))) return "Rejected";

  if (
    normalized.some(
      (status) =>
        status.includes("approv") ||
        status === "accepted" ||
        status.includes("b2b accepted")
    )
  ) {
    return "Approved";
  }

  return statuses[0] || "Pending Review";
};

const getApplicantPhone = (shipment) => {
  const possiblePhoneValues = [
    shipment?.exporter?.mobile,
    shipment?.exporter?.phone,
    shipment?.exporter?.phoneNumber,
    shipment?.exporter?.contactNumber,
    shipment?.userId?.phone,
    shipment?.userId?.mobile,
    shipment?.userId?.phoneNumber,
    shipment?.userId?.contactNumber,
    shipment?.phone,
    shipment?.mobile,
    shipment?.phoneNumber,
    shipment?.contactNumber,
    shipment?.contactDetails?.phone,
    shipment?.contact?.phone,
    shipment?.applicant?.phone,
    shipment?.applicant?.mobile,
    shipment?.user?.phone,
    shipment?.user?.mobile,
    shipment?.user?.phoneNumber,
  ];

  const phone = possiblePhoneValues.find(
    (value) => value !== undefined && value !== null && String(value).trim() !== ""
  );

  if (typeof phone === "object") {
    return (
      phone.number ||
      phone.phone ||
      phone.mobile ||
      [phone.countryCode, phone.value].filter(Boolean).join(" ")
    );
  }

  return phone ? String(phone) : "";
};

export default function PendingReviews({ setPendingReview }) {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [requests, setRequests] = useState([]);
  const [selected, setSelected] = useState(null);
  const [reviews, setReviews] = useState(false);
  const [loading, setLoading] = useState(false);
  const [decisionLoading, setDecisionLoading] = useState(false);
  const [statsData, setStatsData] = useState({});

  const stats = [
    {
      icon: FileText,
      iconColor: "text-amber-600",
      bg: "bg-amber-50 border-amber-100",
      label: "Pending Review",
      value: statsData.pendingReview || 0,
      sub: "Awaiting Action",
    },
    {
      icon: FileClock,
      iconColor: "text-blue-600",
      bg: "bg-blue-50 border-blue-100",
      label: "New Today",
      value: statsData.newToday || 0,
      sub: "Fresh Submissions",
    },
    {
      icon: Timer,
      iconColor: "text-purple-600",
      bg: "bg-purple-50 border-purple-100",
      label: "Quotation Sent",
      value: statsData.quotationSent || 0,
      sub: "Under Customer Review",
    },
    {
      icon: Clock,
      iconColor: "text-emerald-600",
      bg: "bg-emerald-50 border-emerald-100",
      label: "Invoice Generated",
      value: statsData.invoiceGenerated || 0,
      sub: "Billing Ready",
    },
  ];

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending Review":
      case "Pending":
        return "text-amber-800 bg-amber-50 border-amber-200/90";

      case "Quotation Sent":
        return "text-purple-800 bg-purple-50 border-purple-200/90";

      case "Quotation Accepted":
        return "text-blue-800 bg-blue-50 border-blue-200/90";

      case "Invoice Generated":
        return "text-teal-800 bg-teal-50 border-teal-200/90";

      case "B2B Accepted":
      case "Approved":
      case "Paid":
        return "text-emerald-800 bg-emerald-50 border-emerald-200/90";

      case "Rejected":
        return "text-rose-800 bg-rose-50 border-rose-200/90";

      case "Draft":
        return "text-slate-700 bg-slate-100 border-slate-200";

      case "Shared":
        return "text-purple-800 bg-purple-50 border-purple-200/90";

      case "Accepted":
        return "text-sky-800 bg-sky-50 border-sky-200/90";

      default:
        return "text-slate-700 bg-slate-100 border-slate-200";
    }
  };

  const filtered = requests.filter((r) => {
    const term = search.trim().toLowerCase();
    if (!term) return true;
    return (
      r.id?.toLowerCase().includes(term) ||
      r.referenceNumber?.toLowerCase().includes(term) ||
      r.sbNumber?.toLowerCase().includes(term) ||
      r.company?.toLowerCase().includes(term) ||
      r.exporter?.companyName?.toLowerCase().includes(term) ||
      r.userId?.name?.toLowerCase().includes(term) ||
      r.email?.toLowerCase().includes(term) ||
      r.userId?.email?.toLowerCase().includes(term) ||
      r.route?.originCity?.toLowerCase().includes(term) ||
      r.route?.destinationCity?.toLowerCase().includes(term) ||
      r.shipmentType?.toLowerCase().includes(term) ||
      r.workflowStatus?.toLowerCase().includes(term) ||
      r.approvalStatus?.toLowerCase().includes(term) ||
      r.phone?.toLowerCase().includes(term)
    );
  });

  const fetchPendingRequests = async (keepSelectedId = selected?._id) => {
    try {
      setLoading(true);

      const res = await getAllShipmentsForAdmin({
        page: 1,
        limit: 100,
      });

      const data =
        res?.data?.data?.shipments ||
        res?.data?.data ||
        res?.data?.shipments ||
        [];

      const shipmentList = Array.isArray(data) ? data : [];
      setRequests(shipmentList);
      setStatsData(res?.data?.stats || res?.data?.data?.stats || {});

      if (shipmentList.length > 0) {
        const currentShipment =
          shipmentList.find((item) => item._id === keepSelectedId) ||
          shipmentList[0];

        setSelected(currentShipment);
      } else {
        setSelected(null);
      }
    } catch (error) {
      console.log("Pending requests error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingRequests();
  }, []);

  const totalPages = Math.ceil(filtered.length / itemsPerPage) || 1;
  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages);
  }, [currentPage, totalPages]);
  const paginatedRequests = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleDecision = async (decision) => {
    if (!selected?._id || decisionLoading) return;

    const shipmentId = selected._id;
    const nextStatus = decision === "approve" ? "Approved" : "Rejected";

    try {
      setDecisionLoading(true);

      if (decision === "approve") {
        await approveShipment(shipmentId);
      } else if (decision === "reject") {
        await rejectShipment(shipmentId, {
          reason: "Rejected by admin",
        });
      }

      // Update the UI immediately after the API confirms the action.
      setSelected((current) =>
        current?._id === shipmentId
          ? { ...current, approvalStatus: nextStatus }
          : current
      );

      setRequests((current) =>
        current.map((shipment) =>
          shipment._id === shipmentId
            ? { ...shipment, approvalStatus: nextStatus }
            : shipment
        )
      );

      // Refresh server data without switching to the first shipment.
      await fetchPendingRequests(shipmentId);
    } catch (error) {
      console.log("Decision error:", error);
      alert(
        error?.response?.data?.message ||
          `Unable to ${decision} this shipment. Please try again.`
      );
    } finally {
      setDecisionLoading(false);
    }
  };

  return (
    <>
      <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5 items-start overflow-visible">
        {/* =========================================================================
            LEFT COLUMN: STATS & SHIPMENTS TABLE (8 COLUMNS)
           ========================================================================= */}
        <div className="lg:col-span-8 min-w-0 flex flex-col bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-100 pb-5 mb-6">
            <div className="flex items-center gap-3.5">
              <div className="w-11 h-11 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0 shadow-2xs">
                <Clock className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  Pending Shipment Reviews
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Verify documentation, assess compliance, and issue customs approvals.
                </p>
              </div>
            </div>

            <button
              onClick={() => setPendingReview(false)}
              className="w-9 h-9 rounded-xl border border-slate-200 bg-slate-50/60 text-slate-500 hover:text-slate-800 hover:bg-slate-100 flex items-center justify-center transition-all"
              title="Close Panel"
            >
              <FaXmark className="text-sm" />
            </button>
          </div>

          {/* Metric Stats Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 mb-6">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div
                  key={s.label}
                  className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4 transition-all duration-150 hover:bg-white hover:shadow-2xs"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold text-slate-600 line-clamp-1">
                      {s.label}
                    </span>
                    <div
                      className={`w-7 h-7 rounded-lg border flex items-center justify-center ${s.bg}`}
                    >
                      <Icon className={`w-3.5 h-3.5 ${s.iconColor}`} />
                    </div>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 tracking-tight">
                    {s.value}
                  </p>
                  <p className="text-[11px] font-medium text-slate-400 mt-0.5">
                    {s.sub}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by Request ID, Company, Port, or Email..."
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-10 pr-4 py-2.5 text-xs text-slate-800 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs whitespace-nowrap transition-all">
              <Calendar className="w-3.5 h-3.5 text-slate-400" />
              Select Date Range
            </button>
          </div>

          {/* Shipments Data Table (Clean HTML Table to prevent any text overlap) */}
          <div className="w-full max-w-full overflow-x-auto overflow-y-visible rounded-xl border border-slate-200/80 bg-white">
            <table className="w-full text-left border-collapse min-w-[780px]">
              <thead className="sticky top-0 z-10 bg-slate-50">
                <tr className="bg-slate-50/90 border-b border-slate-200/80 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-4 whitespace-nowrap">Request ID</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Source</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Company / Exporter</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Route Details</th>
                  <th className="py-3.5 px-4 whitespace-nowrap">Submitted</th>
                  <th className="py-3.5 px-4 text-center whitespace-nowrap">Status</th>
                  <th className="py-3.5 px-4 text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      <div className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                      Loading pending shipments...
                    </td>
                  </tr>
                ) : paginatedRequests.length > 0 ? (
                  paginatedRequests.map((r) => {
                    const isSelected = selected?._id === r._id;
                    const currentStatus = getShipmentDecisionStatus(r);
                    const origin = r.route?.originCity?.trim();
                    const destination = r.route?.destinationCity?.trim();
                    const hasRoute = origin || destination;

                    return (
                      <tr
                        key={r._id}
                        onClick={() => setSelected(r)}
                        className={`group cursor-pointer transition-colors duration-150 ${
                          isSelected
                            ? "bg-indigo-50/50"
                            : "hover:bg-slate-50/80"
                        }`}
                      >
                        {/* Request ID */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-1 self-stretch rounded-full transition-all ${
                                isSelected ? "bg-indigo-600" : "bg-transparent group-hover:bg-slate-200"
                              }`}
                            />
                            <div>
                              <span className="text-xs font-bold text-indigo-600 hover:text-indigo-700 block tracking-tight">
                                {r.referenceNumber || r.sbNumber || "N/A"}
                              </span>
                              <span className="inline-block mt-0.5 text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-slate-100 text-slate-600">
                                {r.shipmentType || "Export"}
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold border ${String(r.createdByRole || "User").toLowerCase() === "b2b" ? "bg-violet-50 text-violet-700 border-violet-200" : String(r.createdByRole || "User").toLowerCase() === "admin" ? "bg-slate-100 text-slate-700 border-slate-200" : "bg-sky-50 text-sky-700 border-sky-200"}`}>
                            By {String(r.createdByRole || "User").toUpperCase() === "B2B" ? "B2B" : String(r.createdByRole || "User").toUpperCase() === "ADMIN" ? "Admin" : "User"}
                          </span>
                        </td>

                        {/* Company & Email */}
                        <td className="py-3.5 px-4">
                          <p className="text-xs font-bold text-slate-900 leading-tight">
                            {r.exporter?.companyName || r.userId?.name || "-"}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-0.5 truncate max-w-[200px]">
                            {r.userId?.email || r.email || "-"}
                          </p>
                        </td>

                        {/* Clean Route Details (No overlapping) */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          {hasRoute ? (
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs font-medium text-slate-700">
                              <span className="font-semibold text-slate-800">
                                {origin || "Unknown Origin"}
                              </span>
                              <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0" />
                              <span className="font-semibold text-slate-800">
                                {destination || "Unknown Dest"}
                              </span>
                            </div>
                          ) : (
                            <span className="inline-block px-2.5 py-1 rounded-lg bg-slate-100 text-[11px] font-medium text-slate-400">
                              - → -
                            </span>
                          )}
                        </td>

                        {/* Submitted On */}
                        <td className="py-3.5 px-4 whitespace-nowrap">
                          <div className="flex flex-col text-xs">
                            <span className="font-semibold text-slate-700">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleDateString("en-GB")
                                : "-"}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {r.createdAt
                                ? new Date(r.createdAt).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>
                        </td>

                        {/* Status (Never truncated) */}
                        <td className="py-3.5 px-4 text-center whitespace-nowrap">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full border shadow-2xs ${getStatusStyle(
                              currentStatus
                            )}`}
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80" />
                            {currentStatus}
                          </span>
                        </td>

                        {/* Review Action */}
                        <td className="py-3.5 px-4 text-right whitespace-nowrap">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(r);
                              setReviews(true);
                            }}
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 hover:text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-2xs transition-all"
                          >
                            Review
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-xs text-slate-400">
                      No shipment requests found matching your search.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* =========================================================================
              CLEAN MODERN PAGINATION COMPONENT
             ========================================================================= */}
          <div className="shrink-0 flex flex-col md:flex-row items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
            {/* Results Counter & Items Per Page */}
            <div className="flex items-center gap-4">
              <span>
                Showing{" "}
                <strong className="text-slate-800">
                  {filtered.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}
                </strong>{" "}
                to{" "}
                <strong className="text-slate-800">
                  {Math.min(currentPage * itemsPerPage, filtered.length)}
                </strong>{" "}
                of <strong className="text-slate-800">{filtered.length}</strong> entries
              </span>

              <div className="flex items-center gap-1.5">
                <span className="text-slate-400">Rows per page:</span>
                <select
                  value={itemsPerPage}
                  onChange={(e) => {
                    setItemsPerPage(Number(e.target.value));
                    setCurrentPage(1);
                  }}
                  className="rounded-lg border border-slate-200 bg-white px-2 py-1 text-xs font-semibold text-slate-700 focus:border-indigo-500 focus:outline-none"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
            </div>

            {/* Pagination Button Group */}
            <div className="flex items-center gap-1.5">
              {/* First Page */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                title="First Page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              {/* Prev Page */}
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 font-medium transition-all inline-flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                Prev
              </button>

              {/* Page Number Pills */}
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter((page) => {
                    return (
                      page === 1 ||
                      page === totalPages ||
                      Math.abs(page - currentPage) <= 1
                    );
                  })
                  .map((page, index, array) => {
                    const prevPage = array[index - 1];
                    const showEllipsis = prevPage && page - prevPage > 1;

                    return (
                      <div key={page} className="flex items-center gap-1">
                        {showEllipsis && <span className="px-1 text-slate-400">...</span>}
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`w-8 h-8 rounded-lg text-xs font-bold transition-all ${
                            currentPage === page
                              ? "bg-indigo-600 text-white shadow-xs"
                              : "border border-slate-200 text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      </div>
                    );
                  })}
              </div>

              {/* Next Page */}
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 font-medium transition-all inline-flex items-center gap-1"
              >
                Next
                <ChevronRight className="w-3.5 h-3.5" />
              </button>

              {/* Last Page */}
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(totalPages)}
                className="p-1.5 rounded-lg border border-slate-200 text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 transition-all"
                title="Last Page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* =========================================================================
            RIGHT COLUMN: STICKY INSPECTION DRAWER (4 COLUMNS)
           ========================================================================= */}
       <div className="lg:col-span-4 min-h-0 mt-10">
          {selected ? (
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-4 sm:p-5 space-y-4">
              {/* Header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Inspection Drawer
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-0.5">
                    Request Details
                  </h3>
                </div>

                <span
                  className={`text-xs px-2.5 py-0.5 rounded-full font-semibold border ${getStatusStyle(getShipmentDecisionStatus(selected))}`}
                >
                  {getShipmentDecisionStatus(selected)}
                </span>
              </div>

              {/* ID & Date Pill */}
              <div className="rounded-xl border border-indigo-100 bg-indigo-50/40 p-3.5">
                <span className="text-[10px] font-bold uppercase text-indigo-700 tracking-wider">
                  Reference Identifier
                </span>
                <p className="text-base font-extrabold text-slate-900 mt-0.5">
                  {selected.referenceNumber || selected.sbNumber || "N/A"}
                </p>
                <div className="flex items-center gap-1.5 text-xs text-slate-500 mt-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span>
                    Submitted on{" "}
                    {selected.createdAt
                      ? new Date(selected.createdAt).toLocaleString()
                      : "-"}
                  </span>
                </div>
              </div>

              {/* Exporter / Customer Info */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/30 p-3.5">
                <div className="flex items-center gap-2 mb-2.5">
                  <Building2 className="w-4 h-4 text-slate-500" />
                  <span className="text-xs font-bold text-slate-700">
                    Exporter & Applicant
                  </span>
                </div>
                <p className="text-sm font-bold text-slate-900">
                  {selected.exporter?.companyName || selected.userId?.name || "-"}
                </p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{selected.userId?.email || "-"}</span>
                  </div>
                  {/* <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="break-all">
                      {getApplicantPhone(selected) || "Phone number not provided"}
                    </span>
                  </div> */}
                </div>
              </div>

              {/* Transit Route */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/30 p-3.5">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold text-slate-700">
                    Transit & Cargo
                  </span>
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-600">
                    {selected.shipmentType || "Export"}
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs font-semibold text-slate-800 bg-white p-2.5 rounded-lg border border-slate-100">
                  <span>{selected.route?.originCity || "Origin"}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-500 shrink-0 mx-2" />
                  <span>{selected.route?.destinationCity || "Destination"}</span>
                </div>
              </div>

              {/* Quick Metrics */}
              {/* <div className="rounded-xl border border-slate-200/80 p-3.5 bg-slate-50/20">
                <p className="text-xs font-bold text-slate-800 mb-2.5">
                  Compliance & Document Stats
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-medium">Docs</p>
                    <p className="text-sm font-bold text-slate-900 mt-0.5">
                      {selected.documentsUploaded || selected.documents?.length || 0}
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-medium">Risk Score</p>
                    <p className="text-sm font-bold text-emerald-600 mt-0.5">
                      {selected.riskScore || "Low"}
                    </p>
                  </div>
                  <div className="bg-white p-2 rounded-lg border border-slate-100 shadow-2xs">
                    <p className="text-[10px] text-slate-400 font-medium">Compliance</p>
                    <p className="text-sm font-bold text-indigo-600 mt-0.5">
                      {selected.compliance || "Eligible"}
                    </p>
                  </div>
                </div>
              </div> */}

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-1">
                {getShipmentDecisionStatus(selected) === "Approved" ? (
                  <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-semibold text-xs">
                    <CheckCircle2 className="w-4 h-4" />
                    Shipment Approved
                  </div>
                ) : getShipmentDecisionStatus(selected) === "Rejected" ? (
                  <div className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 font-semibold text-xs">
                    <XCircle className="w-4 h-4" />
                    Request Rejected
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleDecision("approve")}
                      disabled={decisionLoading}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      {decisionLoading ? "Processing..." : "Accept & Approve Shipment"}
                    </button>

                    <button
                      onClick={() => handleDecision("reject")}
                      disabled={decisionLoading}
                      className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-rose-50 hover:bg-rose-100/80 border border-rose-200 text-rose-600 font-semibold text-xs transition-all disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <XCircle className="w-4 h-4" />
                      {decisionLoading ? "Processing..." : "Reject Request"}
                    </button>
                  </>
                )}

                <button
                  onClick={() => setReviews(true)}
                  className="w-full flex items-center justify-center gap-2 py-2 px-4 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold shadow-2xs transition-all mt-1"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  Open Full Review Modal
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-8 text-center text-slate-400">
              <Clock className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-xs font-medium">
                Select a shipment from the table to inspect details.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Review Shipment Modal */}
      {reviews && selected && (
        <ReviewShipment
          shipmentId={selected._id}
          onClose={() => setReviews(false)}
        />
      )}
    </>
  );
}