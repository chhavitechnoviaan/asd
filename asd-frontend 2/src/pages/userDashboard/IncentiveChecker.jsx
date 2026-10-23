import { useEffect, useState } from "react";
import {
  FiArrowLeft, FiSave, FiDownload, FiPlus, FiCopy,
  FiChevronRight, FiExternalLink, FiDatabase, FiPhone,
  FiMail, FiCheckCircle, FiXCircle, FiShare2, FiBookmark,
  FiMessageSquare, FiInfo, FiAlertTriangle, FiAlertCircle,
  FiBell, FiGrid, FiX
} from "react-icons/fi";
import { MdOutlineAccountBalance, MdOutlineLocationOn, MdOutlineOpenInNew } from "react-icons/md";
import { BsGraphUpArrow } from "react-icons/bs";
import Shipment from "../../components/ShipmentForm";
import poster2 from "../../assets/Images/webp/poster2.webp"
import { estimateIncentives, calculateMeis } from "../../api/CargoMateApi"

const breakdownRows = [
  {
    scheme: "RoDTEP",
    fullName: "Remission of Duties or Taxes on Exported Products",
    type: "Central",
    typeColor: "bg-emerald-100 text-emerald-700",
    applicableOn: "Export Value",
    rate: "4%",
    benefit: "₹4,992",
    eligibility: "Eligible",
    eligible: true,
  },
  {
    scheme: "Drawbacks",
    fullName: "",
    type: "Central",
    typeColor: "bg-emerald-100 text-emerald-700",
    applicableOn: "Export Value",
    rate: "0.5%",
    benefit: "₹624",
    eligibility: "Eligible",
    eligible: true,
  },
  // {
  //   scheme: "State Incentive – Tamil Nadu",
  //   fullName: "Export Promotion Policy",
  //   type: "State",
  //   typeColor: "bg-orange-100 text-orange-600",
  //   applicableOn: "Export Value",
  //   rate: "2%",
  //   benefit: "₹2,496",
  //   eligibility: "Eligible",
  //   eligible: true,
  // },
  // {
  //   scheme: "IGST Refund (on Exports)",
  //   fullName: "",
  //   type: "Central",
  //   typeColor: "bg-emerald-100 text-emerald-700",
  //   applicableOn: "Tax Paid",
  //   rate: "0%",
  //   benefit: "₹0",
  //   eligibility: "Not Applicable",
  //   eligible: false,
  // },
];

const auditLog = [
  { color: "bg-teal-500", time: "09:25 AM", text: "Search Submitted by Arjun Soni" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Data Validated" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Incentives Matched" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Result Generated" },
  { color: "bg-teal-500", time: "09:25 AM", text: "Report Saved" },
];

const assumptions = [
  "Product is 100% cotton, knitted, for men.",
  "Shipment value and details provided are correct.",
  "Export under HS code 6109.10.00.",
  "Input Tax Credit is available.",
  "Rates are as per current notifications and may change.",
];

const dataSources = [
  { icon: FiDatabase, label: "DGFT (India)" },
  { icon: FiDatabase, label: "Trade APIs" },
  { icon: FiDatabase, label: "ICEGATE" },
  { icon: FiBell, label: "Notifications" },
  { icon: FiGrid, label: "State Export Policies" },
  { icon: FiDatabase, label: "Public Schemes Database" },
];

const emptySearch = {
  hsCode: "",
  product: "",
  origin: "",
  destination: "",
  value: "",
  quantity: "",
};

function SearchPopup({ onClose, onSubmit, initial }) {
  const [form, setForm] = useState(initial);
  const [error, setError] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (error) setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.hsCode.trim()) {
      setError("HS Code is required");
      return;
    }
    onSubmit(form);
  }

  const fields = [
    { name: "hsCode", label: "HS Code", placeholder: "e.g. 6109.10.00", required: true },
    { name: "product", label: "Product", placeholder: "e.g. T-shirts, singlets and other vests, of cotton" },
    { name: "origin", label: "Origin Country", placeholder: "e.g. India" },
    { name: "destination", label: "Destination Country", placeholder: "e.g. United Arab Emirates (UAE)" },
    { name: "value", label: "Shipment Value", placeholder: "e.g. ₹1,24,680" },
    { name: "quantity", label: "Quantity", placeholder: "e.g. 500 kg" },
  ];
 
 
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl border border-gray-200 shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto "
      >
        <div className="flex items-center justify-between px-4 sm:px-5 py-3 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
              <FiDatabase className="text-blue-500 text-base" />
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">Your Search</p>
              <p className="text-[11px] text-gray-500">Enter shipment details to check applicable incentives.</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100"
          >
            <FiX size={16} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-4 sm:px-5 py-4">
          {fields.map(({ name, label, placeholder, required }) => (
            <div key={name} className={name === "product" ? "sm:col-span-2" : ""}>
              <label htmlFor={name} className="block text-[10px] text-gray-400 font-medium mb-1">
                {label}{required && <span className="text-red-400"> *</span>}
              </label>
              <input
                id={name}
                name={name}
                value={form[name]}
                onChange={handleChange}
                placeholder={placeholder}
                autoFocus={name === "hsCode"}
                className={`w-full border rounded-lg px-3 py-2 text-xs font-semibold text-gray-800 placeholder:font-normal placeholder:text-gray-400 outline-none focus:border-teal-500 focus:ring-1 focus:ring-teal-500 ${
                  name === "hsCode" && error ? "border-red-300" : "border-gray-200"
                }`}
              />
              {name === "hsCode" && error && (
                <p className="text-[10px] text-red-500 mt-1">{error}</p>
              )}
            </div>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 px-4 sm:px-5 py-3 border-t border-gray-100">
          <button
            type="button"
            onClick={onClose}
            className="border border-gray-200 bg-white text-gray-700 text-xs font-medium px-4 py-2 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

const getIncentiveUserScope = () => {
  for (const key of ["userId", "user_id", "email", "userEmail"]) { const value = localStorage.getItem(key); if (value) return value.toLowerCase().replace(/[^a-z0-9_-]/g, "_"); }
  for (const key of ["currentUser", "user", "userInfo"]) { try { const value = JSON.parse(localStorage.getItem(key) || "null"); if (value?.id || value?._id || value?.email) return String(value.id || value._id || value.email).toLowerCase().replace(/[^a-z0-9_-]/g, "_"); } catch {} }
  return "current_user";
};

const readMetric = (source, keys) => {
  if (!source) return null;
  for (const key of keys) {
    const parts = key.split("."); let value = source;
    for (const part of parts) value = value?.[part];
    if (value !== undefined && value !== null && value !== "" && Number.isFinite(Number(value))) return Number(value);
  }
  return null;
};
const formatINR = (value) => value == null ? "—" : new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
const makeReportId = () => `INC-${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).slice(2, 6).toUpperCase()}`;

export default function IncentiveChecker() {
  const [copied, setCopied] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [search, setSearch] = useState(emptySearch);
   const [shipment, setShipment] = useState("")
   const [activeTab, setActiveTab] = useState("Incentive Checker");
  const [apiResults, setApiResults] = useState(null);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [reportInfo, setReportInfo] = useState(() => {
    try { const saved = JSON.parse(localStorage.getItem(`cargomate_incentive_reports_${getIncentiveUserScope()}`) || "[]"); return saved[0] || null; } catch { return null; }
  });
  const [auditEntries, setAuditEntries] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`cargomate_incentive_audit_${getIncentiveUserScope()}`) || "[]"); } catch { return []; }
  });

  useEffect(() => { localStorage.setItem(`cargomate_incentive_audit_${getIncentiveUserScope()}`, JSON.stringify(auditEntries.slice(0, 50))); }, [auditEntries]);

  const runIncentiveCheck = async (data) => {
    setApiLoading(true); setApiError(""); setApiResults(null);
    const numericValue = Number(String(data.value || "").replace(/[^0-9.]/g, ""));
    const numericQuantity = Number(String(data.quantity || "").replace(/[^0-9.]/g, ""));
    try {
      const payload = {
        hs_code: data.hsCode,
        product_description: data.product,
        origin_country: data.origin,
        destination_country: data.destination,
        country_of_export: data.origin,
        country_of_import: data.destination,
        shipment_value: numericValue,
        fob_value: numericValue,
        fob_value_inr: numericValue,
        quantity: Number.isFinite(numericQuantity) ? numericQuantity : undefined,
        quantity_kg: Number.isFinite(numericQuantity) ? numericQuantity : undefined,
      };
      const [estimate, meis] = await Promise.allSettled([
        estimateIncentives(payload),
        calculateMeis(payload),
      ]);
      const results = { estimate: estimate.status === "fulfilled" ? (estimate.value?.data ?? estimate.value) : null, meis: meis.status === "fulfilled" ? (meis.value?.data ?? meis.value) : null };
      if (!results.estimate && !results.meis) throw estimate.reason || meis.reason || new Error("Incentive APIs failed");
      setApiResults(results);
      const generatedAt = new Date().toISOString();
      const report = { id: makeReportId(), generatedAt, generatedBy: localStorage.getItem("userName") || localStorage.getItem("name") || "Current user", input: payload, result: results };
      setReportInfo(report);
      try {
        const reportKey = `cargomate_incentive_reports_${getIncentiveUserScope()}`;
        const existingReports = JSON.parse(localStorage.getItem(reportKey) || "[]");
        localStorage.setItem(reportKey, JSON.stringify([report, ...existingReports.filter(item => item.id !== report.id)].slice(0, 50)));
      } catch (storageError) { console.warn("Unable to persist incentive report locally", storageError); }
      const entry = { id: report.id, time: new Date(generatedAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }), text: `Incentive and MEIS estimate generated for ${data.product || data.hsCode}`, createdAt: generatedAt };
      setAuditEntries(prev => [entry, ...prev].slice(0, 50));
      if (estimate.status === "rejected" || meis.status === "rejected") {
        setApiError([estimate.status === "rejected" ? `Incentive estimate failed: ${estimate.reason?.message || "request failed"}` : "", meis.status === "rejected" ? `MEIS estimate failed: ${meis.reason?.message || "request failed"}` : ""].filter(Boolean).join(" · "));
      }
    } catch (err) { setApiError(err?.response?.data?.detail || err?.response?.data?.message || err.message || "Unable to calculate incentives."); }
    finally { setApiLoading(false); }
  };

  // function handleCopy() {
  //   setCopied(true);
  //   setTimeout(() => setCopied(false), 1500);
  // }

   const showView = () => {
    setShowDetails(true);
    setTimeout(() => {
      document.getElementById("sectionId")?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };
  const estimateBreakdown = apiResults?.estimate?.breakdown || apiResults?.estimate?.schemes || apiResults?.estimate?.incentives || apiResults?.estimate?.data?.breakdown || apiResults?.estimate?.result?.breakdown || [];
  const incentiveTotal = readMetric(apiResults?.estimate, ["estimated_total_incentive", "estimated_total_incentive_inr", "total_incentive", "total_incentive_inr", "total_benefit", "data.total_incentive", "result.total_incentive"]);
  const meisTotal = readMetric(apiResults?.meis, ["estimated_total_meis_benefit", "estimated_meis_benefit", "total_meis_benefit", "meis_benefit", "total_benefit", "estimated_benefit", "data.total_meis_benefit", "result.meis_benefit"]);

  return (
    <div className=" bg-gray-50  flex-1 overflow-y-auto pt-14">
     {activeTab === "Incentive Checker" && showPopup && (
       <SearchPopup
         initial={emptySearch}
         onClose={() => setShowPopup(false)}
         onSubmit={(data) => {
           setSearch(data);
           setShowPopup(false);
           runIncentiveCheck(data);
         }}
       />
     )}
     {activeTab === "Incentive Checker" && ( <div>
      {(apiLoading || apiError || apiResults) && <div className="mx-4 sm:mx-6 mt-3 rounded-lg border bg-white p-3 text-xs">
        {apiLoading && <p className="text-blue-700">Calculating incentives from the live API…</p>}
        {apiError && <p className="text-red-600">{apiError}</p>}
        {apiResults && <details><summary className="font-semibold text-gray-800 mb-1 cursor-pointer">View raw API responses</summary><pre className="max-h-48 overflow-auto whitespace-pre-wrap break-words text-gray-600">{JSON.stringify(apiResults, null, 2)}</pre></details>}
      </div>}
      <div className=" border-gray-200 px-4 sm:px-6 py-3">
       
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Incentive Checker</h1>
            <p className="text-xs text-gray-500 mt-0.5">Find applicable incentives and estimated benefits for your shipment.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiArrowLeft size={12} /> New Search
            </button> */}
            {/* <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiSave size={12} /> Save Report
            </button>
            <button className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50">
              <FiDownload size={12} /> Download Report (PDF)
            </button> */}
            <button  onClick={() => {
                setShipment("shipment")
                setActiveTab("")
              }}
            className="flex items-center gap-1.5 bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold px-3 py-1.5 rounded-lg">
              <FiPlus size={12} /> Create Shipment 
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-3 sm:px-4 lg:px-6 py-4 grid grid-cols-1 xl:grid-cols-[1fr_290px] gap-4">
        <div className="flex flex-col gap-4 min-w-0">

          <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-lg px-3 py-2.5 text-xs text-teal-800">
            <FiInfo size={14} className="text-teal-500 flex-shrink-0 mt-0.5" />
            This result is based on the data sources and assumptions listed below. Please review before making any trade decisions.
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                <FiDatabase className="text-blue-500 text-base" />
              </div>
              <p className="text-sm font-semibold text-gray-900">Your Search</p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-3">
              {[
                ["HS Code", search.hsCode],
                ["Product", search.product],
                ["Origin Country", search.origin],
                ["Destination Country", search.destination],
                ["Shipment Value", search.value],
                ["Quantity", search.quantity],
              ].map(([k, v]) => (
                <div key={k}>
                  <p className="text-[10px] text-gray-400 font-medium mb-0.5">{k}</p>
                  <p className="text-xs font-semibold text-gray-800 leading-tight">{v || "-"}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pt-2 border-t border-gray-100">
              <p className="text-[10px] text-gray-400">
                Search ID: {reportInfo?.id || "Not generated yet"} &nbsp;•&nbsp; {reportInfo?.generatedAt ? new Date(reportInfo.generatedAt).toLocaleString() : "Run a calculation to generate a report"} &nbsp;•&nbsp; User: {reportInfo?.generatedBy || localStorage.getItem("userName") || localStorage.getItem("name") || "Current user"}
              </p>
              <button
                onClick={showView}
                className="flex items-center gap-1.5 border border-gray-200 bg-white text-gray-600 text-[11px] font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 w-fit"
              >
                 View Detail   </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-800 mb-3">Estimated Total Incentive (INR)</p>
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-4 items-center">
              <div>
                <p className="text-2xl font-bold text-gray-900">{formatINR(readMetric(apiResults?.estimate, ["estimated_total_incentive", "estimated_total_incentive_inr", "total_incentive", "total_incentive_inr", "total_benefit", "data.total_incentive", "result.total_incentive"]))}</p>
                <div className="mt-2 flex items-center gap-1.5">
                  <span className="text-[11px] text-gray-500 font-medium">Total Incentive Rate</span>
                  <span className="bg-teal-100 text-teal-700 text-[11px] font-semibold px-2 py-0.5 rounded-full">{readMetric(apiResults?.estimate, ["total_incentive_rate_pct", "incentive_rate_pct", "total_rate_pct", "rate_pct", "data.rate_pct"]) != null ? `${readMetric(apiResults?.estimate, ["total_incentive_rate_pct", "incentive_rate_pct", "total_rate_pct", "rate_pct", "data.rate_pct"])}%` : "API estimate"}</span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-teal-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdOutlineAccountBalance className="text-teal-500 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Central Incentives</p>
                    <p className="text-lg font-bold text-gray-900">{formatINR(readMetric(apiResults?.estimate, ["central_incentives", "central_incentive", "central_incentive_inr", "central_total", "data.central_incentive"]))}</p>
                    <p className="text-[10px] text-gray-400">From API response</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <MdOutlineLocationOn className="text-red-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">State Incentives</p>
                    <p className="text-lg font-bold text-gray-900">{formatINR(readMetric(apiResults?.estimate, ["state_incentives", "state_incentive", "state_incentive_inr", "state_total", "data.state_incentive"]))}</p>
                    <p className="text-[10px] text-gray-400">From API response</p>
                  </div>
                </div>
                <div className="border border-gray-100 rounded-xl p-3 flex items-start gap-3">
                  <div className="w-9 h-9 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                    <BsGraphUpArrow className="text-blue-400 text-2xl" />
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-500 font-medium">Estimated Total MEIS Benefit</p>
                    <p className="text-lg font-bold text-gray-900">{formatINR(readMetric(apiResults?.meis, ["estimated_total_meis_benefit", "estimated_meis_benefit", "total_meis_benefit", "meis_benefit", "total_benefit", "estimated_benefit", "data.total_meis_benefit", "result.meis_benefit"]))}</p>
                    <p className="text-[10px] text-gray-400">Calculated by /incentive/meis</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-[10px] text-gray-400 mt-3">
              Incentives are subject to eligibility and compliance with applicable scheme conditions.
            </p>
          </div>

          {showDetails && (
          <div className="bg-white border border-gray-200 rounded-xl p-4" id="sectionId">
         
              <div className=" flex justify-between items-center mb-3">
                   <p className="text-base pl-3 font-semibold text-gray-800 ">Incentive Breakdown</p>
              {/* <button className="flex items-center  border border-gray-200 text-teal-600 text-xs font-medium px-2 py-2 rounded-lg hover:bg-teal-50  justify-center">
                View Scheme Details & Eligibility 
              </button> */}
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead>
                  <tr className="bg-gray-50">
                    {["Scheme / Program", "Type", "Applicable On", "Rate / Benefit", "Estimated Benefit (INR)", "Eligibility"].map((h, i) => (
                      <th
                        key={h}
                        className={`text-left text-[11px] font-semibold text-gray-500 px-3 py-2.5 ${i === 0 ? "rounded-l-lg" : ""} ${i === 5 ? "rounded-r-lg" : ""}`}
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {(Array.isArray(estimateBreakdown) ? estimateBreakdown : []).map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="px-3 py-3">
                        <p className="text-xs font-semibold text-gray-800">{row.scheme || row.name || row.scheme_name || row.program || "Incentive scheme"}</p>
                        {(row.fullName || row.description || row.full_name) && <p className="text-[10px] text-gray-400 mt-0.5">{row.fullName || row.description || row.full_name}</p>}
                      </td>
                      <td className="px-3 py-3">
                        <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${row.typeColor}`}>
                          {row.type}
                        </span>
                      </td>
                      <td className="px-3 py-3 text-xs text-gray-600 font-medium">{row.applicableOn || row.applicable_on || row.basis || "—"}</td>
                      <td className="px-3 py-3 text-xs text-gray-700 font-medium">{row.rate || row.rate_pct || row.rate_percent || "—"}</td>
                      <td className="px-3 py-3 text-xs font-semibold text-gray-900">{formatINR(readMetric(row, ["benefit", "estimated_benefit", "benefit_inr", "amount", "amount_inr", "value"]))}</td>
                      <td className="px-3 py-3">
                        <div className={`flex items-center gap-1 text-xs font-medium ${row.eligible ? "text-emerald-600" : "text-gray-400"}`}>
                          {row.eligible
                            ? <FiCheckCircle size={13} className="text-emerald-500" />
                            : <FiXCircle size={13} className="text-gray-400" />}
                          {row.eligibility}
                        </div>
                      </td>
                    </tr>
                  ))}
                  {!estimateBreakdown.length && <tr className="border-t border-gray-100"><td colSpan={6} className="px-3 py-5 text-xs text-gray-500">{apiResults?.estimate ? "The API did not return a line-item breakdown. See the complete response in Report Information." : "Run a calculation to view actual scheme-wise benefits."}</td></tr>}
                </tbody>
              </table>
                   <div className="border-t-2 border-gray-200 ">
                    <span  className="px-3 py-3 text-xs font-bold text-gray-800 text-right">Total Estimated Incentive</span>
                    <span className="px-3 py-3 text-sm font-bold text-emerald-600">{formatINR(incentiveTotal)}</span>
                    <div />
                  </div>
            </div>
          
          </div>
          )}

      <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 min-w-0  mb-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4  ">
              <p className="text-sm font-semibold text-gray-800 mb-3">Data Sources Used</p>
              <div className="grid grid-cols-2 gap-y-2 gap-x-3">
                {dataSources.map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-1.5 text-xs text-gray-600">
                    <Icon size={12} className="text-gray-400 flex-shrink-0" /> {label}
                  </div>
                ))}
              </div>
              {/* <button className="mt-3 text-teal-500 text-xs font-medium hover:underline flex items-center gap-1">
                View All Sources <FiChevronRight size={12} />
              </button> */}
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-gray-800 mb-3">Assumptions</p>
              <ul className="flex flex-col gap-1.5">
                {assumptions.map((a, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-xs text-gray-600">
                    <span className="text-gray-400 mt-0.5 flex-shrink-0">•</span> {a}
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-800 mb-2">Disclaimer</p>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Incentives are subject to change as per government notifications. Please verify with official sources before making any business decisions.
                </p>
                {/* <button className="mt-2 text-blue-500 text-xs font-medium hover:underline">Read Full Disclaimer</button> */}
              </div>
           
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-semibold text-gray-800 mb-1">Need Help?</p>
                <p className="text-xs text-gray-500 mb-2 pt-3">Our trade experts are here to help you.</p>
                <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-1">
                  <FiPhone size={11} className="text-teal-500 " /> +91 22 1234 5678
                </div>
                <div className="flex items-center gap-1.5 text-xs pt-2 text-gray-600 mb-3">
                  <FiMail size={11} className="text-teal-500" /> support@asdcargomate.com
                </div>
                {/* <button className="w-full border border-gray-200 text-gray-700 text-xs font-medium py-2 rounded-lg hover:bg-gray-50 flex items-center justify-center gap-1.5">
                  <FiMessageSquare size={12} /> Chat with Expert
                </button> */}
              </div>
      </div>
          
        </div>

        <div className="flex flex-col gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Result Summary</p>
            {[
              { icon: FiCheckCircle, iconColor: "text-teal-500", label: "Best Applicable Scheme", value: apiResults?.estimate?.best_scheme || apiResults?.estimate?.best_applicable_scheme || "See API result", valueColor: "" },
              { icon: FiAlertCircle, iconColor: "text-teal-500", label: "Total Incentive (INR)", value: formatINR(incentiveTotal), valueColor: "" },
              { icon: FiAlertTriangle, iconColor: "text-orange-400", label: "Estimated MEIS (INR)", value: formatINR(meisTotal), valueColor: "" },
              { icon: FiInfo, iconColor: "text-blue-400", label: "Based On", value: apiResults ? "Live API calculation" : "Awaiting calculation", valueColor: "" },
              { icon: FiCheckCircle, iconColor: "text-emerald-500", label: "Input Tax Credit", value: apiResults?.estimate?.input_tax_credit ?? apiResults?.estimate?.inputTaxCredit ?? "Not supplied", valueColor: "" },
            ].map(({ icon: Icon, iconColor, label, value }, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0 text-xs gap-2">
                <div className="flex items-center gap-2 text-gray-500">
                  <Icon size={13} className={iconColor} /> {label}
                </div>
                <span className="font-semibold text-gray-900 text-right">{value}</span>
              </div>
            ))}
            <button onClick={() => {
                setShipment("shipment")
                setActiveTab("")
              }} className="mt-3 w-full bg-teal-500 hover:bg-teal-600 text-white text-xs font-semibold py-2.5 rounded-xl">
              Create Shipment 
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">Report Information</p>
            {[
              ["Report ID", reportInfo?.id || "Not generated yet"],
              ["Generated On", reportInfo?.generatedAt ? new Date(reportInfo.generatedAt).toLocaleString() : "—"],
              ["Generated By", reportInfo?.generatedBy || localStorage.getItem("userName") || localStorage.getItem("name") || "Current user"],
              ["Product", search.product || "—"],
              ["HS Code", search.hsCode || "—"],
              ["Shipment Value (INR)", search.value || "—"],
              ["Estimated Incentive (INR)", formatINR(readMetric(reportInfo?.result?.estimate, ["estimated_total_incentive", "estimated_total_incentive_inr", "total_incentive", "total_incentive_inr", "total_benefit", "data.total_incentive", "result.total_incentive"]))],
              ["Estimated MEIS Benefit (INR)", formatINR(readMetric(reportInfo?.result?.meis, ["estimated_total_meis_benefit", "estimated_meis_benefit", "total_meis_benefit", "meis_benefit", "total_benefit", "estimated_benefit", "data.total_meis_benefit", "result.meis_benefit"]))],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between py-1.5 text-[11px] border-b border-gray-100 last:border-0">
                <span className="text-gray-500">{k}</span>
                <span className="text-gray-800 font-medium">{v}</span>
              </div>
            ))}
            {reportInfo && <details className="mt-3 text-[11px] text-gray-500"><summary className="cursor-pointer font-semibold">View complete calculation report</summary><pre className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-2">{JSON.stringify(reportInfo, null, 2)}</pre></details>}
            <button onClick={() => { if (reportInfo) { const blob = new Blob([JSON.stringify(reportInfo, null, 2)], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `${reportInfo.id}.json`; a.click(); URL.revokeObjectURL(url); } }} disabled={!reportInfo} className="mt-3 w-full flex items-center justify-center gap-2 border border-gray-200 bg-white text-teal-600 text-xs font-medium py-2 rounded-lg hover:bg-teal-50 disabled:opacity-50">
              <FiDownload size={12} /> Download Report (JSON)
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <p className="text-sm font-semibold text-gray-900 mb-1">Save & Share</p>
            <p className="text-[11px] text-gray-500 mb-3">Save this report for future reference or share with your team.</p>
            <div className="grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-1 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                <FiBookmark size={14} /> Save to Saved Reports
              </button>
              <button className="flex items-center justify-center gap-1.5 border border-gray-200 bg-white text-gray-700 text-[11px] font-medium py-2 rounded-lg hover:bg-gray-50">
                <FiShare2 size={12} /> Share Report
              </button>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-gray-900">Audit Log (This Search)</p>
              <span className="text-[10px] text-gray-400">{auditEntries.length} events</span>
            </div>
            {auditEntries.length ? auditEntries.slice(0, 6).map((entry) => (
              <div key={entry.id} className="flex items-start gap-2 py-1.5 border-b border-gray-100 last:border-0">
                <span className="w-2 h-2 rounded-full bg-teal-500 flex-shrink-0 mt-1" />
                <span className="text-[10px] text-gray-400 whitespace-nowrap">{entry.time}</span>
                <span className="text-[11px] text-gray-600">{entry.text}</span>
              </div>
            )) : <p className="text-[11px] text-gray-400">Successful incentive searches will appear here.</p>}
          </div>
        </div>
      </div>

    

           <div className="min-w-0 mx-6"> 
             <img src={poster2}  className='w-full max-h-60 mb-4' />
            </div>
          </div> )}


          {shipment === "shipment" && (
                 <div>
                   <Shipment setActiveTab={setActiveTab} setShipment={setShipment} currentTab={"Incentive Checker"} />
                 </div>
               )
               }
    </div>
  );
}