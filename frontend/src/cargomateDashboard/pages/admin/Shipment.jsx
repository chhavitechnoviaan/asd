import { useState, useRef, useEffect, useMemo } from "react";
import {
  FaDownload,
  FaPlus,
  FaMagnifyingGlass,
  FaChevronLeft,
  FaChevronRight,
  FaShip,
  FaCheck,
  FaFileLines,
  FaBoxOpen,
  FaCloudArrowUp,
  FaCalendar,
  FaBolt,
  FaArrowRight,
  FaChevronDown,
  FaXmark,
  FaPlane,
  FaTruck,
  FaEye,
  FaRotate,
  FaFilter,
  FaGlobe,
  FaBoxesStacked,
  FaCircleCheck,
  FaClock,
} from "react-icons/fa6";

import API from "../../api/axios";
import PendingReview from "./PendingReview";
import AIModulesBackendScope from "./AiModules";
import { getAllShipmentsForAdmin } from "../../api/ShipmentApi";
import ShipmentForm from "../../../cargomateDashboard/components/ShipmentForm";

const ROWS_PER_PAGE = 10;

/* -------------------------------------------------------
   HELPERS
------------------------------------------------------- */

const getSafeUrl = (url) => {
  if (!url || typeof url !== "string") return null;

  try {
    const value = url.trim();
    const formatted = /^https?:\/\//i.test(value)
      ? value
      : `https://${value}`;

    const parsed = new URL(formatted);

    if (!["http:", "https:"].includes(parsed.protocol)) return null;

    return parsed.href;
  } catch {
    return null;
  }
};

const getNameValue = (value) => {
  if (!value) return "";

  if (typeof value === "object") {
    return (
      value.name ||
      value.companyName ||
      value.company ||
      value.fullName ||
      value.title ||
      ""
    );
  }

  return String(value);
};

const getSupplierName = (row) =>
  getNameValue(row.supplier) ||
  row.supplierName ||
  row.supplierCompany ||
  row.vendorName ||
  row.Supplier ||
  "";

const getSupplierLink = (row) => {
  const supplier =
    typeof row.supplier === "object" ? row.supplier : {};

  return (
    supplier.link ||
    supplier.url ||
    row.supplierLink ||
    row.supplierUrl ||
    row.supplierWebsite ||
    row.vendorLink ||
    ""
  );
};

const getBuyerName = (row) =>
  getNameValue(row.buyer) ||
  getNameValue(row.consignee) ||
  row.buyerName ||
  row.consigneeName ||
  row.Cosignee ||
  row.Buyer ||
  "";

const getBuyerLink = (row) => {
  const buyer = typeof row.buyer === "object" ? row.buyer : {};
  const consignee =
    typeof row.consignee === "object" ? row.consignee : {};

  return (
    buyer.link ||
    buyer.url ||
    consignee.link ||
    consignee.url ||
    row.buyerLink ||
    row.buyerUrl ||
    row.consigneeLink ||
    row.consigneeUrl ||
    ""
  );
};

const getStatus = (row) =>
  row.shipmentStatus ||
  row.workflowStatus ||
  row.approvalStatus ||
  "Pending";

// Draft shipments are private to the B2B/user side and must not appear in Admin.
const isDraftShipment = (row) => {
  const statuses = [
    row?.shipmentStatus,
    row?.workflowStatus,
    row?.approvalStatus,
    row?.status,
  ];

  return statuses.some(
    (status) => String(status || "").trim().toLowerCase() === "draft"
  );
};

const getMode = (row) =>
  row.shipmentMode ||
  row.route?.mode ||
  row.mode ||
  "Sea";

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) return "-";

  return parsed.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusStyle = (status = "") => {
  const s = status.toLowerCase();

  if (s.includes("transit"))
    return "bg-teal-50 text-teal-700 border-teal-200";

  if (s.includes("deliver"))
    return "bg-emerald-50 text-emerald-700 border-emerald-200";

  if (s.includes("approve") || s.includes("assigned"))
    return "bg-blue-50 text-blue-700 border-blue-200";

  if (
    s.includes("pending") ||
    s.includes("submitted") ||
    s.includes("review")
  )
    return "bg-amber-50 text-amber-700 border-amber-200";

  if (s.includes("custom"))
    return "bg-orange-50 text-orange-700 border-orange-200";

  if (s.includes("closed"))
    return "bg-slate-100 text-slate-600 border-slate-200";

  return "bg-slate-100 text-slate-600 border-slate-200";
};

/* -------------------------------------------------------
   LINKED NAME
------------------------------------------------------- */

const LinkedName = ({ name, link }) => {
  const safeLink = getSafeUrl(link);

  if (!name) {
    return <span className="text-slate-400">-</span>;
  }

  if (!safeLink) {
    return (
      <span className="font-semibold text-slate-800">
        {name}
      </span>
    );
  }

  return (
    <a
      href={safeLink}
      target="_blank"
      rel="noopener noreferrer"
      title={`Open ${name}`}
      className="font-semibold text-teal-700 hover:text-teal-900 hover:underline underline-offset-4 transition-colors"
    >
      {name}
    </a>
  );
};

/* -------------------------------------------------------
   SMALL UI COMPONENTS
------------------------------------------------------- */

function StatCard({ label, value, icon: Icon, color, bg }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-2xl p-4 shadow-[0_2px_8px_rgba(15,23,42,0.025)] hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="flex items-center justify-between gap-2">
        <p className="text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
          {label}
        </p>

        <div
          className={`w-9 h-9 rounded-xl flex items-center justify-center ${bg}`}
        >
          <Icon className={`text-sm ${color}`} />
        </div>
      </div>

      <p className={`text-xl sm:text-2xl font-extrabold mt-3 tracking-tight ${color}`}>
        {value}
      </p>
    </div>
  );
}

function StatusBadge({ status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${statusStyle(
        status
      )}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function ModeBadge({ mode }) {
  const value = String(mode || "").toLowerCase();

  const Icon = value.includes("air")
    ? FaPlane
    : value.includes("road")
    ? FaTruck
    : FaShip;

  return (
    <span className="inline-flex items-center gap-1.5 text-[10px] font-bold text-slate-600 bg-slate-100 border border-slate-200 px-2.5 py-1 rounded-lg whitespace-nowrap">
      <Icon className="text-slate-400" />
      {mode}
    </span>
  );
}

function SectionTitle({ title, subtitle }) {
  return (
    <div>
      <h2 className="text-sm font-extrabold text-slate-900">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[11px] text-slate-400 mt-0.5">
          {subtitle}
        </p>
      )}
    </div>
  );
}

/* -------------------------------------------------------
   BOOKING WORKFLOW
------------------------------------------------------- */

const STEPS = [
  "Exporter Details",
  "Cargo Information",
  "Route & Carrier",
  "Documents",
];

const inputClass =
  "w-full border border-slate-200 bg-white rounded-xl px-3.5 py-2.5 text-xs text-slate-800 placeholder-slate-400 outline-none focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all";

function FormField({ label, children }) {
  return (
    <div>
      <label className="block text-[11px] font-bold text-slate-600 mb-1.5">
        {label}
      </label>
      {children}
    </div>
  );
}

function StepSidebar({ currentStep }) {
  return (
    <div className="w-full lg:w-56 shrink-0 bg-slate-50 border border-slate-200 rounded-2xl p-4">
      <p className="text-xs font-extrabold text-slate-900 mb-4">
        Booking Progress
      </p>

      <div className="grid grid-cols-4 lg:grid-cols-1 gap-2 lg:gap-0">
        {STEPS.map((step, index) => {
          const done = index < currentStep;
          const active = index === currentStep;

          return (
            <div
              key={step}
              className="flex flex-col lg:flex-row items-center lg:items-start gap-2 lg:gap-3 lg:mb-5"
            >
              <div
                className={`w-8 h-8 shrink-0 rounded-xl flex items-center justify-center text-[11px] font-extrabold border transition-all ${
                  done
                    ? "bg-teal-500 border-teal-500 text-white"
                    : active
                    ? "bg-white border-teal-500 text-teal-700 ring-4 ring-teal-500/10"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                {done ? <FaCheck /> : index + 1}
              </div>

              <div className="hidden lg:block">
                <p
                  className={`text-xs font-bold ${
                    active || done
                      ? "text-slate-900"
                      : "text-slate-400"
                  }`}
                >
                  {step}
                </p>
                <p className="text-[10px] text-slate-400 mt-0.5">
                  Step {index + 1} of 4
                </p>
              </div>

              <span className="lg:hidden text-[9px] text-slate-500 font-semibold text-center">
                {index + 1}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Step1({ form, set, onNext }) {
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    const nextErrors = {};

    if (!form.companyName.trim())
      nextErrors.companyName = "Company name is required";

    if (!form.contactPerson.trim())
      nextErrors.contactPerson = "Contact person is required";

    if (!form.mobile.trim())
      nextErrors.mobile = "Mobile number is required";

    setErrors(nextErrors);

    if (!Object.keys(nextErrors).length) onNext();
  };

  const field = (key, label, placeholder, required = false) => (
    <FormField label={`${label}${required ? " *" : ""}`}>
      <input
        className={`${inputClass} ${
          errors[key] ? "border-rose-400 bg-rose-50/30" : ""
        }`}
        placeholder={placeholder}
        value={form[key]}
        onChange={(e) => {
          set(key, e.target.value);
          setErrors((prev) => ({ ...prev, [key]: "" }));
        }}
      />
      {errors[key] && (
        <p className="text-[10px] text-rose-500 mt-1">
          {errors[key]}
        </p>
      )}
    </FormField>
  );

  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Exporter & Shipper Information"
        subtitle="Enter company identity and customs registration details."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <div className="sm:col-span-2">
          {field(
            "companyName",
            "Company Name",
            "e.g. Sunfresh Export Pvt Ltd",
            true
          )}
        </div>

        {field(
          "contactPerson",
          "Authorized Contact Person",
          "Full legal name",
          true
        )}
        {field(
          "mobile",
          "Mobile Contact",
          "+91 98765 43210",
          true
        )}
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={handleNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold transition-all"
        >
          Continue to Cargo <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step2({ form, set, onNext }) {
  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Cargo & Commercial Information"
        subtitle="Provide commodity details, customs codes and shipment valuation."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <FormField label="HS Code (Manual Entry)">
          <input
            className={inputClass}
            placeholder="Enter HS Code manually (e.g. 6109.10)"
            value={form.hsCode}
            onChange={(e) => set("hsCode", e.target.value.trimStart())}
          />
          <p className="text-[10px] text-slate-400 mt-1">
            Enter the HS Code provided for your product. No dictionary selection is required.
          </p>
        </FormField>

        <FormField label="Commodity / Product Description">
          <input
            className={inputClass}
            placeholder="e.g. Cotton Knitted T-Shirts"
            value={form.commodity}
            onChange={(e) => set("commodity", e.target.value)}
          />
        </FormField>

        <FormField label="Gross Weight (Kg)">
          <input
            type="number"
            className={inputClass}
            placeholder="0.00"
            value={form.grossWeight}
            onChange={(e) => set("grossWeight", e.target.value)}
          />
        </FormField>

        <FormField label="Number of Packages">
          <input
            className={inputClass}
            placeholder="e.g. 150 Cartons"
            value={form.packages}
            onChange={(e) => set("packages", e.target.value)}
          />
        </FormField>

        <FormField label="Invoice Value (USD)">
          <input
            className={inputClass}
            placeholder="e.g. 25000"
            value={form.invoiceValue}
            onChange={(e) => set("invoiceValue", e.target.value)}
          />
        </FormField>

        <FormField label="Incoterms">
          <select
            className={inputClass}
            value={form.incoterms}
            onChange={(e) => set("incoterms", e.target.value)}
          >
            <option value="">Select Incoterm</option>
            <option>FOB</option>
            <option>CIF</option>
            <option>EXW</option>
            <option>DDP</option>
          </select>
        </FormField>

        <FormField label="Packing Type">
          <select
            className={inputClass}
            value={form.packingType}
            onChange={(e) => set("packingType", e.target.value)}
          >
            <option>Cartons</option>
            <option>Pallets</option>
            <option>Drums</option>
            <option>Bags</option>
          </select>
        </FormField>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Continue to Route <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step3({ form, set, onNext }) {
  return (
    <div className="flex-1 min-w-0">
      <SectionTitle
        title="Route Details"
        subtitle="Enter the shipment origin, destination, transport mode and expected departure date."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
        <FormField label="Origin Port / ICD">
          <input
            className={inputClass}
            placeholder="e.g. HYD ICD (IN)"
            value={form.originPort}
            onChange={(e) => set("originPort", e.target.value)}
          />
        </FormField>

        <FormField label="Destination Port">
          <input
            className={inputClass}
            placeholder="e.g. Hamburg (DE)"
            value={form.destPort}
            onChange={(e) => set("destPort", e.target.value)}
          />
        </FormField>

        <FormField label="Shipment Mode">
          <select
            className={inputClass}
            value={form.shipmentMode}
            onChange={(e) => set("shipmentMode", e.target.value)}
          >
            <option value="">Select Mode</option>
            <option>Sea FCL</option>
            <option>Sea LCL</option>
            <option>Air</option>
            <option>Road</option>
          </select>
        </FormField>

        <FormField label="Preferred ETD">
          <div className="flex items-center border border-slate-200 rounded-xl px-3.5 py-2.5 gap-2 bg-white focus-within:border-teal-500">
            <input
              type="date"
              className="flex-1 text-xs outline-none bg-transparent"
              value={form.etd}
              onChange={(e) => set("etd", e.target.value)}
            />
            <FaCalendar className="text-slate-400 text-xs" />
          </div>
        </FormField>
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={onNext}
          className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold"
        >
          Continue to Documents <FaArrowRight className="inline ml-2" />
        </button>
      </div>
    </div>
  );
}

function Step4({ form, set, onSaveDraft, onConfirm, loading, documents, uploadedDocs, onUpload }) {
  const fileRefs = useRef({});
  const [extraFiles, setExtraFiles] = useState([]);
  const addFile = (key, label, file, required = false) => {
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) return alert("File size should not exceed 10 MB");
    onUpload(key, label, file, required);
  };
  const slots = documents.length ? documents : [
    { key: "commercial-invoice", label: "Commercial Invoice", required: true },
    { key: "packing-list", label: "Packing List", required: true },
    { key: "certificate-of-origin", label: "Certificate of Origin", required: false },
  ];
  return (
    <div className="flex-1 min-w-0">
      <SectionTitle title="Shipment Documents" subtitle="Upload required documents. PDF, JPG or PNG up to 10 MB each." />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-5">
        {slots.map((doc, i) => {
          const key = doc.key || String(doc.label || doc.name || `document-${i}`).toLowerCase().replace(/[^a-z0-9]+/g, "-");
          const label = doc.label || doc.name || `Document ${i + 1}`;
          const uploaded = uploadedDocs[key];
          return <div key={key} className="border border-slate-200 rounded-xl p-3.5 bg-white">
            <div className="flex items-center justify-between gap-2 mb-3"><p className="text-xs font-bold text-slate-800">{label}</p><span className={`text-[9px] px-2 py-1 rounded-full font-bold ${doc.required ? "bg-rose-50 text-rose-600" : "bg-slate-100 text-slate-500"}`}>{doc.required ? "Required" : "Optional"}</span></div>
            {uploaded ? <p className="text-[10px] text-emerald-700 mb-2 truncate"><FaCheck className="inline mr-1"/> {uploaded.originalName || uploaded.fileName || uploaded.documentName || "Uploaded"}</p> : null}
            <label className="flex items-center gap-2 border border-dashed border-slate-300 hover:border-teal-400 rounded-lg p-2.5 cursor-pointer"><FaCloudArrowUp className="text-teal-600"/><span className="text-[10px] text-slate-500 truncate flex-1">Choose document</span><input ref={el => fileRefs.current[key] = el} type="file" accept=".pdf,.jpg,.jpeg,.png" className="hidden" onChange={e => addFile(key, label, e.target.files?.[0], !!doc.required)}/></label>
          </div>;
        })}
      </div>
      <div className="mt-5 flex flex-col sm:flex-row justify-end gap-2 border-t border-slate-100 pt-4">
        <button disabled={loading} onClick={onSaveDraft} className="px-5 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-xs font-bold hover:bg-slate-50 disabled:opacity-50">Save Draft</button>
        <button disabled={loading} onClick={onConfirm} className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold disabled:opacity-50">{loading ? "Saving..." : "Confirm & Submit"} <FaArrowRight className="inline ml-2"/></button>
      </div>
    </div>
  );
}

function NewBookingPage({ onCancel, onSaved }) {
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [shipmentId, setShipmentId] = useState("");
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [docSettings, setDocSettings] = useState([]);
  const [formSettings, setFormSettings] = useState([]);
  const [form, setForm] = useState({
    shipmentType: "Export", shipmentMode: "Sea", shipmentPurpose: "Commercial", customerType: "Individual",
    exporter: { companyName: "", contactPerson: "", email: "", phone: "", address: "", country: "India", iec: "", gst: "" },
    customFields: {},
    route: { originCountry: "India", originCity: "", destinationCountry: "", destinationCity: "", originPort: "", destinationPort: "" },
    importer: { companyName: "", address: "", contactPerson: "", email: "", phone: "" },
    incoterm: "", etd: "", eta: "",
    cargo: { productName: "", productDescription: "", hsCode: "", hsCodeText: "", category: "", quantity: "", unit: "", weight: "", netWeight: "", grossWeight: "", volumetricWeight: "", packages: "", packingType: "Cartons", unNumber: "", packageMarks: "", isDangerous: false, isTemperatureControlled: false, isStackable: false, isFragile: false, hasBattery: false, isLithium: false, dimensions: { length: "", width: "", height: "", unit: "CM" } },
    amount: "", currency: "USD", paymentTerms: "", insuranceRequired: false, exportIncentive: false,
    additionalInformation: { packagingType: "", packages: "", marksNumbers: "", dangerousGoods: false, specialHandling: false, temperatureControl: false },
  });
  const set = (key, value) => setForm(prev => ({ ...prev, [key]: value }));
  const setNested = (parent, key, value) => setForm(prev => ({ ...prev, [parent]: { ...prev[parent], [key]: value } }));
  const setCargo = (key, value) => setForm(prev => ({ ...prev, cargo: { ...prev.cargo, [key]: value } }));
  const setDimension = (key, value) => setForm(prev => ({ ...prev, cargo: { ...prev.cargo, dimensions: { ...prev.cargo.dimensions, [key]: value } } }));
  const input = (label, value, onChange, opts={}) => <FormField label={`${label}${opts.required ? " *" : ""}`}><input type={opts.type || "text"} min={opts.min} className={inputClass} placeholder={opts.placeholder || "Enter " + label.toLowerCase()} value={value ?? ""} onChange={e => onChange(e.target.value)}/></FormField>;
  const select = (label, value, onChange, choices) => <FormField label={label}><select className={inputClass} value={value || ""} onChange={e => onChange(e.target.value)}><option value="">Select {label}</option>{choices.map(v => <option key={v} value={v}>{v}</option>)}</select></FormField>;
  const check = (label, value, onChange) => <label className="flex items-center gap-2 text-[11px] font-semibold text-slate-600 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2"><input type="checkbox" checked={!!value} onChange={e => onChange(e.target.checked)} className="accent-teal-600"/>{label}</label>;
  useEffect(() => {
    let active = true;
    Promise.all([API.get("/settings/shipment-form"), API.get("/settings/documents-upload-settings")]).then(([a,b]) => {
      if (!active) return;
      let f = a?.data?.data?.data || a?.data?.data || a?.data || {};
      setFormSettings(Array.isArray(f.sections) ? f.sections : []);
      let d = b?.data?.data?.data || b?.data?.data || b?.data || {};
      setDocSettings(Array.isArray(d.fields) ? d.fields.filter(x => x.enabled !== false) : []);
    }).catch(err => console.warn("Shipment form settings could not load", err));
    return () => { active = false; };
  }, []);
  const saveAll = async () => {
    let id = shipmentId;
    const first = {
      shipmentType: form.shipmentType, shipmentMode: form.shipmentMode, shipmentPurpose: form.shipmentPurpose,
      customerType: form.customerType, exporter: form.exporter, customFields: form.customFields,
      currency: form.currency || "INR", paymentTerms: form.paymentTerms,
      amount: form.amount === "" ? undefined : Number(form.amount),
      insuranceRequired: !!form.insuranceRequired, exportIncentive: !!form.exportIncentive,
      createdByRole: "Admin",
    };
    const second = { route: { ...form.route, mode: form.shipmentMode }, importer: form.importer, shipmentMode: form.shipmentMode, etd: form.etd || null, eta: form.eta || null, incoterm: form.incoterm };
    const third = { cargo: { ...form.cargo, hsCode: null, hsCodeText: form.cargo.hsCodeText || form.cargo.hsCode || "", quantity: form.cargo.quantity === "" ? undefined : Number(form.cargo.quantity), weight: form.cargo.weight === "" ? undefined : Number(form.cargo.weight), netWeight: form.cargo.netWeight === "" ? undefined : Number(form.cargo.netWeight), grossWeight: form.cargo.grossWeight === "" ? undefined : Number(form.cargo.grossWeight), volumetricWeight: form.cargo.volumetricWeight === "" ? undefined : Number(form.cargo.volumetricWeight), packages: form.cargo.packages === "" ? undefined : Number(form.cargo.packages), dimensions: { ...form.cargo.dimensions, length: form.cargo.dimensions.length === "" ? undefined : Number(form.cargo.dimensions.length), width: form.cargo.dimensions.width === "" ? undefined : Number(form.cargo.dimensions.width), height: form.cargo.dimensions.height === "" ? undefined : Number(form.cargo.dimensions.height) } }, paymentTerms: form.paymentTerms, insuranceRequired: !!form.insuranceRequired, exportIncentive: !!form.exportIncentive, additionalInformation: form.additionalInformation };
    if (!id) {
      const res = await API.post("/shipments/step1", first);
      const data = res.data?.data || res.data;
      id = data?._id || data?.shipment?._id;
      if (!id) throw new Error("Shipment ID was not returned by server");
      setShipmentId(id);
    } else await API.put(`/shipments/${id}`, first);
    await API.put(`/shipments/step2/${id}`, second);
    await API.put(`/shipments/step3/${id}`, third);
    return id;
  };
  const uploadDoc = async (key, label, file, required) => {
    try {
      setLoading(true);
      const id = await saveAll();
      const fd = new FormData(); fd.append("shipmentId", id); fd.append("documentType", label); fd.append("documentKey", key); fd.append("required", String(!!required)); fd.append("file", file);
      const res = await API.post("/shipments/upload-docs", fd, { headers: { "Content-Type": "multipart/form-data" } });
      const doc = res.data?.data || res.data;
      setUploadedDocs(prev => ({ ...prev, [key]: doc }));
      alert("Document uploaded successfully");
    } catch (e) { alert(e.response?.data?.message || e.message || "Document upload failed"); }
    finally { setLoading(false); }
  };
  const saveDraftHandler = async () => {
    try { setLoading(true); const id = await saveAll(); await API.patch(`/shipments/${id}/save-draft`); alert("Draft saved successfully"); }
    catch(e) { alert(e.response?.data?.message || e.message || "Draft save failed"); }
    finally { setLoading(false); }
  };
  const submitHandler = async () => {
    const required = [ ["Shipment Type",form.shipmentType], ["Shipment Mode",form.shipmentMode], ["Shipment Purpose",form.shipmentPurpose], ["Exporter Company",form.exporter.companyName], ["Contact Person",form.exporter.contactPerson], ["Origin",form.route.originCity || form.route.originPort], ["Destination",form.route.destinationCity || form.route.destinationPort], ["Importer / Consignee",form.importer.companyName], ["Invoice Value",form.amount], ["Currency",form.currency], ["Product Name",form.cargo.productName], ["HS Code",form.cargo.hsCodeText || form.cargo.hsCode] ];
    const missing = required.filter(x => !String(x[1] ?? "").trim()).map(x => x[0]);
    docSettings.forEach((d,i) => { if (d.required && !uploadedDocs[d.key || String(d.label || `document-${i}`).toLowerCase().replace(/[^a-z0-9]+/g,"-")]) missing.push(`${d.label || "Required"} document`); });
    if (missing.length) return alert("Please complete the following before submitting:\n\n" + missing.join("\n"));
    try { setLoading(true); const id = await saveAll(); await API.post(`/shipments/${id}/submit`); alert("Shipment submitted successfully"); onSaved?.(); }
    catch(e) { alert(e.response?.data?.message || e.message || "Shipment submission failed"); }
    finally { setLoading(false); }
  };
  const next = () => setStep(v => Math.min(3, v+1));
  const back = () => setStep(v => Math.max(0, v-1));
  const nav = <div className="flex justify-between mt-6"><button onClick={back} disabled={step===0} className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40">Back</button><button onClick={next} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-bold">Continue <FaArrowRight className="inline ml-2"/></button></div>;
  return <div className="min-h-screen w-full bg-slate-50 p-3 sm:p-6 lg:p-8 overflow-x-hidden"><div className="max-w-6xl mx-auto">
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6"><div><p className="text-[10px] font-bold text-teal-600 uppercase tracking-widest">Shipment Management</p><h1 className="text-2xl font-extrabold text-slate-900 mt-1">Create New Booking</h1><p className="text-xs text-slate-500 mt-1">Complete all shipment details in four steps.</p></div><button onClick={onCancel} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-600 text-xs font-bold"><FaXmark/> Close Booking</button></div>
    <div className="bg-white border border-slate-200 rounded-3xl shadow-sm p-4 sm:p-6 lg:p-7"><div className="flex flex-col lg:flex-row gap-6 lg:gap-8"><StepSidebar currentStep={step}/><div className="flex-1 min-w-0">
      {step===0 && <><SectionTitle title="Shipment & Exporter Details" subtitle="Basic shipment type, exporter and registration information."/><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">{select("Shipment Type",form.shipmentType,v=>set("shipmentType",v),["Export","Import","Domestic","Transit"])}{select("Shipment Mode",form.shipmentMode,v=>set("shipmentMode",v),["Sea FCL","Sea LCL","Air","Road","Rail"])}{select("Shipment Purpose",form.shipmentPurpose,v=>set("shipmentPurpose",v),["Commercial","Personal","Sample","Return"])}{select("Customer Type",form.customerType,v=>set("customerType",v),["Individual","B2B","Company"])}{input("Company Name",form.exporter.companyName,v=>setNested("exporter","companyName",v),{required:true})}{input("Contact Person",form.exporter.contactPerson,v=>setNested("exporter","contactPerson",v),{required:true})}{input("Email",form.exporter.email,v=>setNested("exporter","email",v),{type:"email"})}{input("Mobile",form.exporter.phone,v=>setNested("exporter","phone",v),{type:"tel"})}{input("Exporter Address",form.exporter.address,v=>setNested("exporter","address",v))}{input("Exporter Country",form.exporter.country,v=>setNested("exporter","country",v))}{input("IEC Number",form.exporter.iec,v=>setNested("exporter","iec",v))}{input("GST Number",form.exporter.gst,v=>setNested("exporter","gst",v))}</div>{formSettings.flatMap(section => Array.isArray(section.fields) ? section.fields : []).filter(field => field.enabled !== false && field.key && !["shipmentType","shipmentMode","shipmentPurpose","companyName","contactPerson"].includes(field.key)).length > 0 && <div className="mt-5 border-t border-slate-100 pt-4"><p className="text-xs font-extrabold text-slate-800 mb-3">Additional Configured Details</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{formSettings.flatMap(section => Array.isArray(section.fields) ? section.fields : []).filter(field => field.enabled !== false && field.key && !["shipmentType","shipmentMode","shipmentPurpose","companyName","contactPerson"].includes(field.key)).map(field => <div key={field.key}>{field.useDropdown ? select(field.label || field.key,form.customFields[field.key],v=>setForm(prev=>({...prev,customFields:{...prev.customFields,[field.key]:v}})),field.options || []) : input(field.label || field.key,form.customFields[field.key],v=>setForm(prev=>({...prev,customFields:{...prev.customFields,[field.key]:v}})))}</div>)}</div></div>}{nav}</>}
      {step===1 && <><SectionTitle title="Route, Importer & Schedule" subtitle="Origin, destination, consignee and expected shipping dates."/><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">{input("Origin Country",form.route.originCountry,v=>setNested("route","originCountry",v))}{input("Origin City / Port / Airport",form.route.originCity,v=>setNested("route","originCity",v),{required:true})}{input("Destination Country",form.route.destinationCountry,v=>setNested("route","destinationCountry",v))}{input("Destination City / Port / Airport",form.route.destinationCity,v=>setNested("route","destinationCity",v),{required:true})}{input("Origin Port / ICD",form.route.originPort,v=>setNested("route","originPort",v))}{input("Destination Port *",form.route.destinationPort,v=>setNested("route","destinationPort",v),{required:true})}{input("Importer / Consignee Company",form.importer.companyName,v=>setNested("importer","companyName",v))}{input("Importer Contact Person",form.importer.contactPerson,v=>setNested("importer","contactPerson",v))}{input("Importer Email",form.importer.email,v=>setNested("importer","email",v),{type:"email"})}{input("Importer Phone",form.importer.phone,v=>setNested("importer","phone",v),{type:"tel"})}<div className="sm:col-span-2">{input("Importer Address",form.importer.address,v=>setNested("importer","address",v))}</div>{select("Incoterm",form.incoterm,v=>set("incoterm",v),["EXW","FCA","FAS","FOB","CFR","CIF","CPT","CIP","DAP","DPU","DDP"])}{input("ETD",form.etd,v=>set("etd",v),{type:"date"})}{input("ETA / Expected Arrival",form.eta,v=>set("eta",v),{type:"date"})}</div>{nav}</>}
      {step===2 && <><SectionTitle title="Cargo & Commercial Information" subtitle="Product classification, quantities, weights, dimensions and invoice details."/><div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">{input("Product Name",form.cargo.productName,v=>setCargo("productName",v),{required:true})}{input("Product Category",form.cargo.category,v=>setCargo("category",v))}{input("HS Code (Manual Entry)",form.cargo.hsCodeText || form.cargo.hsCode,v=>setCargo("hsCodeText",v),{required:true})}{input("Quantity",form.cargo.quantity,v=>setCargo("quantity",v),{type:"number"})}{input("Unit",form.cargo.unit,v=>setCargo("unit",v))}{input("Net Weight (Kg)",form.cargo.netWeight,v=>setCargo("netWeight",v),{type:"number"})}{input("Gross Weight (Kg)",form.cargo.grossWeight,v=>setCargo("grossWeight",v),{type:"number"})}{input("Volumetric Weight",form.cargo.volumetricWeight,v=>setCargo("volumetricWeight",v),{type:"number"})}{input("Number of Packages",form.cargo.packages,v=>setCargo("packages",v),{type:"number"})}{select("Packing Type",form.cargo.packingType,v=>setCargo("packingType",v),["Cartons","Pallets","Drums","Bags","Crates","Container"])}{input("UN Number",form.cargo.unNumber,v=>setCargo("unNumber",v))}{input("Package Marks / Numbers",form.cargo.packageMarks,v=>setCargo("packageMarks",v))}{input("Length",form.cargo.dimensions.length,v=>setDimension("length",v),{type:"number"})}{input("Width",form.cargo.dimensions.width,v=>setDimension("width",v),{type:"number"})}{input("Height",form.cargo.dimensions.height,v=>setDimension("height",v),{type:"number"})}{select("Dimension Unit",form.cargo.dimensions.unit,v=>setDimension("unit",v),["CM","IN","M"])}<div className="sm:col-span-2">{input("Product Description",form.cargo.productDescription,v=>setCargo("productDescription",v))}</div>{input("Invoice Value",form.amount,v=>set("amount",v),{type:"number",required:true})}{select("Invoice Currency",form.currency,v=>set("currency",v),["USD","INR","EUR","GBP","AED","SGD","JPY"])}{select("Payment Terms",form.paymentTerms,v=>set("paymentTerms",v),["Advance Payment","Letter of Credit","Documents against Payment","Documents against Acceptance","Open Account"])}{check("Insurance Required",form.insuranceRequired,v=>set("insuranceRequired",v))}{check("Export Incentive Applicable",form.exportIncentive,v=>set("exportIncentive",v))}</div><div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-4">{check("Dangerous Goods",form.cargo.isDangerous,v=>setCargo("isDangerous",v))}{check("Temperature Controlled",form.cargo.isTemperatureControlled,v=>setCargo("isTemperatureControlled",v))}{check("Stackable",form.cargo.isStackable,v=>setCargo("isStackable",v))}{check("Fragile",form.cargo.isFragile,v=>setCargo("isFragile",v))}{check("Contains Battery",form.cargo.hasBattery,v=>setCargo("hasBattery",v))}{check("Lithium",form.cargo.isLithium,v=>setCargo("isLithium",v))}</div>{nav}</>}
      {step===3 && <Step4 form={form} set={set} loading={loading} documents={docSettings} uploadedDocs={uploadedDocs} onUpload={uploadDoc} onSaveDraft={saveDraftHandler} onConfirm={submitHandler}/>}
    </div></div></div></div></div>;
}

/* -------------------------------------------------------
   MAIN SHIPMENT PAGE
------------------------------------------------------- */

export default function Shipment() {
  const [showBooking, setShowBooking] = useState(false);
  const [shipments, setShipments] = useState([]);
  const [pendingReview, setPendingReview] = useState(false);
  const [hsList, setHsList] = useState([]);

  const [stats, setStats] = useState({
    total: 0,
    inTransit: 0,
    delivered: 0,
    pendingDocs: 0,
    customHold: 0,
    revenue: 0,
  });

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [modeFilter, setModeFilter] = useState("All Modes");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  /* ---------------- FETCH DATA ---------------- */

  const fetchShipments = async () => {
    try {
      setLoading(true);

      const res = await getAllShipmentsForAdmin({
        page: 1,
        limit: 100,
      });

      const records =
        res?.data?.data?.shipments ||
        res?.data?.data ||
        res?.data?.shipments ||
        [];

      // Never show user-saved drafts in the Admin shipment database.
      const adminVisibleShipments = Array.isArray(records)
        ? records.filter((shipment) => !isDraftShipment(shipment))
        : [];

      setShipments(adminVisibleShipments);
    } catch (err) {
      console.error("Admin shipments error:", err);
      setShipments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const res = await API.get("/shipments/stats");

      if (res.data?.data) {
        setStats((prev) => ({ ...prev, ...res.data.data }));
      }
    } catch (err) {
      console.error("Shipment stats error:", err);
    }
  };

  const fetchHSCodesList = async () => {
    try {
      const res = await API.get("/hs");

      const records = res.data?.data || res.data || [];
      setHsList(Array.isArray(records) ? records : []);
    } catch (err) {
      console.error("HS Codes dictionary load:", err);
    }
  };

  useEffect(() => {
    fetchShipments();
    fetchStats();
    fetchHSCodesList();
  }, []);

  /* ---------------- HS CODE RESOLVER ---------------- */

  const resolveHSCode = (row) => {
    const cargo = row?.cargo || {};
    const raw =
      cargo.hsCodeText ||
      cargo.hsCode?.hsCode ||
      cargo.hsCode?.code ||
      cargo.hsCode?.number ||
      cargo.hsCode ||
      row.hsCodeText ||
      row.hsCode?.hsCode ||
      row.hsCode?.code ||
      row.hsCode ||
      cargo.hscode;

    if (raw === undefined || raw === null || raw === "") return "-";

    if (typeof raw === "object") {
      return raw.hsCode || raw.code || raw.number || "-";
    }

    const clean = String(raw).trim();

    if (/^[0-9a-fA-F]{24}$/.test(clean)) {
      const found = hsList.find(
        (item) => String(item._id) === clean
      );

      return found
        ? found.hsCode || found.code || found.name || "-"
        : "-";
    }

    return clean || "-";
  };

  /* ---------------- SEARCH + FILTER ---------------- */

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();

    return shipments.filter((row) => {
      const searchableValues = [
        row.sbNumber,
        row.referenceNumber,
        row.bookingNo,
        row.bol,
        row.exporter?.companyName,
        row.company,
        getSupplierName(row),
        getBuyerName(row),
        row.route?.originCity,
        row.route?.destinationCity,
        row.route?.originPort,
        row.route?.destinationPort,
        resolveHSCode(row),
      ];

      const matchSearch =
        !q ||
        searchableValues.some((value) =>
          String(value || "").toLowerCase().includes(q)
        );

      const status = getStatus(row);
      const mode = getMode(row);

      const matchStatus =
        statusFilter === "All Status" ||
        status.toLowerCase() === statusFilter.toLowerCase();

      const matchMode =
        modeFilter === "All Modes" ||
        mode.toLowerCase().includes(modeFilter.toLowerCase());

      return matchSearch && matchStatus && matchMode;
    });
  }, [shipments, search, statusFilter, modeFilter, hsList]);

  const totalPages = Math.max(
    1,
    Math.ceil(filtered.length / ROWS_PER_PAGE)
  );

  const pageItems = filtered.slice(
    (page - 1) * ROWS_PER_PAGE,
    page * ROWS_PER_PAGE
  );

  useEffect(() => {
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  /* ---------------- CSV EXPORT ---------------- */

  const exportCSV = () => {
    const headers = [
      "SB/AWB Number",
      "Exporter",
      "Supplier",
      "Supplier Link",
      "Buyer",
      "Buyer Link",
      "Origin",
      "Destination",
      "HS Code",
      "Mode",
      "ETD",
      "ETA",
      "Status",
    ];

    const escapeCSV = (value) =>
      `"${String(value ?? "").replace(/"/g, '""')}"`;

    const rows = filtered.map((row) => [
      row.sbNumber || row.referenceNumber || "",
      row.exporter?.companyName || row.company || "",
      getSupplierName(row),
      getSupplierLink(row),
      getBuyerName(row),
      getBuyerLink(row),
      row.route?.originCity || row.route?.originPort || "",
      row.route?.destinationCity || row.route?.destinationPort || "",
      resolveHSCode(row),
      getMode(row),
      row.etd || "",
      row.eta || "",
      getStatus(row),
    ]);

    const csv = [
      headers.map(escapeCSV).join(","),
      ...rows.map((row) => row.map(escapeCSV).join(",")),
    ].join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = `shipments-${new Date()
      .toISOString()
      .slice(0, 10)}.csv`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  };

  /* ---------------- STATS ---------------- */

  const statsData = [
    {
      label: "Total Shipments",
      value: stats.total || shipments.length,
      icon: FaBoxesStacked,
      color: "text-slate-900",
      bg: "bg-slate-100",
    },
    {
      label: "In Transit",
      value: stats.inTransit || 0,
      icon: FaShip,
      color: "text-teal-600",
      bg: "bg-teal-50",
    },
    {
      label: "Delivered",
      value: stats.delivered || 0,
      icon: FaCircleCheck,
      color: "text-emerald-600",
      bg: "bg-emerald-50",
    },
    {
      label: "Pending Docs",
      value: stats.pendingDocs || 0,
      icon: FaFileLines,
      color: "text-amber-600",
      bg: "bg-amber-50",
    },
    {
      label: "Customs Hold",
      value: stats.customHold || 0,
      icon: FaClock,
      color: "text-rose-600",
      bg: "bg-rose-50",
    },
    {
      label: "Revenue",
      value: `₹${Number(stats.revenue || 0).toLocaleString("en-IN")}`,
      icon: FaBolt,
      color: "text-indigo-600",
      bg: "bg-indigo-50",
    },
  ];

  /* ---------------- PAGE RENDER ---------------- */

  if (showBooking) {
    return (
      <ShipmentForm
      currentTab="Shipment"
      setActiveTab={() => setShowBooking(false)}
      setShipment={() => {}}
      onSaved={() => {
        setShowBooking(false);
        fetchShipments();
        fetchStats();
      }}
    />
    );
  }

  if (pendingReview) {
    return (
      <div className="min-h-screen w-full bg-slate-50 overflow-x-hidden">
        <PendingReview
          setPendingReview={setPendingReview}
        />
      </div>
    );
  }

  return (
<div className="w-full min-h-screen max-w-full bg-gradient-to-br from-slate-50 via-[#f7f9fc] to-teal-50/30 p-3 sm:p-5 lg:p-7 overflow-x-hidden overflow-y-auto">
  <div className="max-w-[1600px] mx-auto space-y-5">

        {/* HEADER */}

        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500" />
              <p className="text-[10px] font-bold text-teal-700 uppercase tracking-[0.16em]">
                Logistics Management
              </p>
            </div>

            <h1 className="text-2xl sm:text-[28px] font-extrabold text-slate-900 tracking-tight">
              Shipment Database
            </h1>

            <p className="text-xs text-slate-500 mt-1">
              Monitor shipments, manage consignment records and track delivery operations.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={fetchShipments}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FaRotate className={loading ? "animate-spin" : ""} />
              Refresh
            </button>

            <button
              onClick={() => setPendingReview(true)}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-teal-200 rounded-xl text-xs font-bold text-teal-700 hover:bg-teal-50 transition-all"
            >
              <FaClock />
              Pending Review
            </button>

            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-3.5 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              <FaDownload />
              Export CSV
            </button>

            <button
              onClick={() => setShowBooking(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
            >
              <FaPlus />
              New Booking
            </button>
          </div>
        </div>

        {/* STATS */}

        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-3">
          {statsData.map((item) => (
            <StatCard key={item.label} {...item} />
          ))}
        </div>

        {/* MAIN CONTENT */}

        <div className="bg-white border border-slate-200/80 rounded-2xl shadow-[0_2px_10px_rgba(15,23,42,0.025)] overflow-hidden">

          {/* TABLE HEADER */}

          <div className="px-4 sm:px-5 py-4 border-b border-slate-100">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-extrabold text-slate-900">
                  All Shipments
                </h2>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  View and manage all shipment records from one place.
                </p>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-500">
                <span className="w-2 h-2 bg-teal-500 rounded-full" />
                {filtered.length} Records Found
              </div>
            </div>
          </div>

          {/* FILTERS */}

          <div className="p-4 sm:px-5 border-b border-slate-100">
            <div className="flex flex-col xl:flex-row gap-2.5">
              <div className="relative flex-1 min-w-0">
                <FaMagnifyingGlass className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-xs" />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder="Search SB/AWB, exporter, supplier, buyer, destination..."
                  className="w-full pl-9 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 placeholder:text-slate-400 outline-none focus:bg-white focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 transition-all"
                />
              </div>

              <div className="flex flex-wrap sm:flex-nowrap gap-2">
                <div className="relative flex-1 sm:flex-none">
                  <FaFilter className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

                  <select
                    value={statusFilter}
                    onChange={(e) => {
                      setStatusFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:w-44 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
                  >
                    <option>All Status</option>
                    <option>Submitted</option>
                    <option>Pending Admin Approval</option>
                    <option>Pending Review</option>
                    <option>Approved</option>
                    <option>Carrier Assigned</option>
                    <option>In Transit</option>
                    <option>Delivered</option>
                    <option>Closed</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
                </div>

                <div className="relative flex-1 sm:flex-none">
                  <FaGlobe className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-[10px] pointer-events-none" />

                  <select
                    value={modeFilter}
                    onChange={(e) => {
                      setModeFilter(e.target.value);
                      setPage(1);
                    }}
                    className="w-full sm:w-36 pl-8 pr-8 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-600 outline-none focus:border-teal-500 appearance-none"
                  >
                    <option>All Modes</option>
                    <option>Air</option>
                    <option>Sea</option>
                    <option>Road</option>
                  </select>
                  <FaChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-[9px] pointer-events-none" />
                </div>

                {(search || statusFilter !== "All Status" || modeFilter !== "All Modes") && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setStatusFilter("All Status");
                      setModeFilter("All Modes");
                      setPage(1);
                    }}
                    className="px-3 py-2.5 rounded-xl text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 transition-all"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* TABLE */}

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[1120px] text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/80 border-b border-slate-200">
                  {[
                    "SB / AWB Details",
                    "Exporter / Shipper",
                   
                    "Origin → Destination",
                    "HS Code",
                                  "Mode",
                    "ETD / ETA",
                    "Status",
                    "Action",
                  ].map((heading, index) => (
                    <th
                      key={heading}
                      className={`px-4 py-3 text-[10px] font-extrabold text-slate-500 uppercase tracking-wider whitespace-nowrap ${
                        index === 5 || index === 7 || index === 9
                          ? "text-center"
                          : ""
                      } ${index === 10 ? "text-right" : ""}`}
                    >
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-16 text-center"
                    >
                      <div className="flex flex-col items-center gap-3">
                        <div className="w-8 h-8 border-[3px] border-teal-100 border-t-teal-600 rounded-full animate-spin" />
                        <p className="text-xs font-semibold text-slate-500">
                          Loading shipment records...
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : pageItems.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center">
                      <div className="flex flex-col items-center">
                        <div className="w-12 h-12 bg-slate-100 rounded-2xl flex items-center justify-center mb-3">
                          <FaShip className="text-slate-400 text-lg" />
                        </div>
                        <p className="text-sm font-bold text-slate-700">
                          No shipments found
                        </p>
                        <p className="text-[11px] text-slate-400 mt-1">
                          Try changing your search or filter criteria.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  pageItems.map((row) => {
                    const status = getStatus(row);
                    const mode = getMode(row);

                    const exporter =
                      row.exporter?.companyName ||
                      row.company ||
                      "-";

                    const origin =
                      row.route?.originCity ||
                      row.route?.originPort ||
                      "-";

                    const destination =
                      row.route?.destinationCity ||
                      row.route?.destinationPort ||
                      "-";

                    return (
                      <tr
                        key={row._id || row.id}
                        className="hover:bg-teal-50/20 transition-colors"
                      >
                        {/* SB / AWB */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-xs font-extrabold text-slate-900">
                            {row.sbNumber ||
                              row.referenceNumber ||
                              "-"}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            {row.bol || row.bookingNo || "BOL: Pending"}
                          </p>
                        </td>

                        {/* EXPORTER */}

                        <td className="px-4 py-3.5 min-w-[170px]">
                          <p className="text-xs font-bold text-slate-800">
                            {exporter}
                          </p>
                        </td>

                       

                        {/* ROUTE */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-semibold text-slate-700">
                              {origin}
                            </span>
                            <FaArrowRight className="text-[9px] text-teal-500" />
                            <span className="text-[11px] font-semibold text-slate-700">
                              {destination}
                            </span>
                          </div>
                        </td>

                        {/* HS CODE */}

                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <span className="inline-flex px-2.5 py-1 rounded-lg bg-teal-50 border border-teal-100 text-[10px] font-extrabold text-teal-700">
                            {resolveHSCode(row)}
                          </span>
                        </td>

                        {/* MODE */}

                        <td className="px-4 py-3.5 text-center">
                          <ModeBadge mode={mode} />
                        </td>

                        {/* ETD ETA */}

                        <td className="px-4 py-3.5 whitespace-nowrap">
                          <p className="text-[11px] font-semibold text-slate-700">
                            ETD: {formatDate(row.etd)}
                          </p>
                          <p className="text-[10px] text-slate-400 mt-1">
                            ETA: {formatDate(row.eta)}
                          </p>
                        </td>

                        {/* STATUS */}

                        <td className="px-4 py-3.5 text-center whitespace-nowrap">
                          <StatusBadge status={status} />
                        </td>

                        {/* ACTION */}

                        <td className="px-4 py-3.5 text-right whitespace-nowrap">
                          <button
                            onClick={() => setPendingReview(true)}
                            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-teal-50 hover:bg-teal-100 border border-teal-100 text-teal-700 text-[10px] font-extrabold transition-all"
                          >
                            <FaEye />
                            Inspect
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}

          <div className="px-4 sm:px-5 py-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="text-[11px] text-slate-500">
              Showing{" "}
              <strong className="text-slate-800">
                {filtered.length
                  ? (page - 1) * ROWS_PER_PAGE + 1
                  : 0}
              </strong>{" "}
              to{" "}
              <strong className="text-slate-800">
                {Math.min(page * ROWS_PER_PAGE, filtered.length)}
              </strong>{" "}
              of{" "}
              <strong className="text-slate-800">
                {filtered.length}
              </strong>{" "}
              shipments
            </p>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <FaChevronLeft className="text-[10px]" />
              </button>

              {Array.from(
                { length: totalPages },
                (_, index) => index + 1
              )
                .filter(
                  (number) =>
                    number === 1 ||
                    number === totalPages ||
                    Math.abs(number - page) <= 1
                )
                .map((number, index, arr) => (
                  <div key={number} className="flex items-center gap-1">
                    {index > 0 && number - arr[index - 1] > 1 && (
                      <span className="px-1 text-slate-400 text-xs">
                        ...
                      </span>
                    )}

                    <button
                      onClick={() => setPage(number)}
                      className={`w-8 h-8 rounded-lg text-[11px] font-bold transition-all ${
                        page === number
                          ? "bg-teal-600 text-white shadow-sm"
                          : "border border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      {number}
                    </button>
                  </div>
                ))}

              <button
                onClick={() =>
                  setPage((prev) => Math.min(totalPages, prev + 1))
                }
                disabled={page === totalPages}
                className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50 disabled:opacity-40 transition-all"
              >
                <FaChevronRight className="text-[10px]" />
              </button>
            </div>
          </div>
        </div>

        {/* AI MODULES */}

        <AIModulesBackendScope />
      </div>
    </div>
  );
}