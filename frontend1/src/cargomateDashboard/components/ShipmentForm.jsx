// mahima code //
import React, { useState, useEffect, useRef } from "react";
import {
  FiChevronDown,
  FiFileText,
  FiClipboard,
  FiAward,
  FiCreditCard,
  FiShoppingCart,
  FiFolder,
  FiTruck,
  FiZap,
  FiUploadCloud,
  FiEye,
  FiSend,
  FiCheckCircle,
  FiExternalLink,
  FiCalendar,
  FiBookmark,
  FiX,
  FiInfo,
  FiBox,
  FiCheck,
  FiShield,
  FiArrowRight,
} from "react-icons/fi";

import {
  createShipment,
  updateShipmentStep2,
  updateShipmentStep3,
  saveDraft,
  analyzeShipment,
  submitShipment,
  getShipmentFormSettings,
  getDocumentsUploadSettings,
  uploadShipmentDocument,
  updateShipment,
  getShipmentDetails,
  deleteShipmentDocument,
} from "../services/shipmentApi";
import { CloudCog } from "lucide-react";

// Convert stored upload paths into absolute backend URLs.
// VITE_API_URL is expected to contain the API base, e.g. https://api.example.com/api.
const getShipmentDocumentUrl = (fileUrl) => {
  if (!fileUrl) return "";
  if (/^https?:\/\//i.test(fileUrl) || fileUrl.startsWith("data:"))
    return fileUrl;

  const apiBase = String(import.meta.env.VITE_API_URL || "").replace(
    /\/+$/,
    "",
  );
  const backendBase = apiBase.replace(/\/api$/i, "");
  const base = backendBase || window.location.origin;
  return new URL(
    fileUrl.startsWith("/") ? fileUrl : `/${fileUrl}`,
    base,
  ).toString();
};

const normalizeDocumentName = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

// Identify the authenticated panel from the login session.
// Auth files also persist this value explicitly to avoid confusing User and B2B accounts.
const getLoggedInAccountType = () => {
  const normalizeType = (value) => {
    const type = String(value || "").trim().toLowerCase();

    // B2B accounts may be identified by role name or account category.
    if (
      type === "b2b" ||
      type.includes("b2b") ||
      type.includes("business") ||
      type.includes("corporate") ||
      type.includes("exporter") ||
      type.includes("importer") ||
      type.includes("shipper")
    ) {
      return "b2b";
    }

    if (
      type === "user" ||
      type.includes("individual") ||
      type.includes("customer")
    ) {
      return "user";
    }

    return "";
  };

  const readStoredObject = (key) => {
    try {
      const raw = localStorage.getItem(key);
      if (!raw) return null;

      try {
        return JSON.parse(raw);
      } catch {
        return raw;
      }
    } catch {
      return null;
    }
  };

  const candidates = [];
  // Read authenticated role from the current CargoMate session first.
try {
  const session = JSON.parse(
    sessionStorage.getItem("cargomate-session") || "null"
  );

  if (session?.role) {
    candidates.push(session.role);
  }
} catch (error) {
  console.error("Unable to read CargoMate session:", error);
}
  const storedAccountType = readStoredObject("accountType");
  if (typeof storedAccountType === "string") {
    candidates.push(storedAccountType);
  } else if (storedAccountType && typeof storedAccountType === "object") {
    candidates.push(
      storedAccountType.accountType,
      storedAccountType.userType,
      storedAccountType.type,
      storedAccountType.role,
      storedAccountType.roleId?.name,
    );
  }

  // Login responses may store the user directly or inside { user: {...} } / { data: {...} }.
  ["user", "authUser", "currentUser", "userData"].forEach((key) => {
    const stored = readStoredObject(key);
    if (!stored || typeof stored !== "object") return;

    const user = stored.user || stored.data?.user || stored.data || stored;
    candidates.push(
      user.accountType,
      user.userType,
      user.type,
      user.role,
      user.roleName,
      user.roleId?.name,
      user.roleId?.roleName,
      ...(Array.isArray(user.roles)
        ? user.roles.flatMap((role) => [
            typeof role === "string" ? role : role?.name,
            role?.roleId?.name,
          ])
        : []),
    );
  });

  // Check role identifiers first: e.g. roleId.name === "b2b"
  // even when accountType === "Exporter".
  const normalized = candidates.map(normalizeType);
  if (normalized.includes("b2b")) return "b2b";
  if (normalized.includes("user")) return "user";

  return "user";
};

/* ==========================================================================
   REUSABLE FORM ATOMS
   ========================================================================== */

function Label({ children, required = true }) {
  return (
    <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
      {children}
      {required && <span className="text-rose-500 ml-1 font-bold">*</span>}
    </label>
  );
}

function Input({
  label,
  placeholder,
  value,
  name,
  onChange,
  required = true,
  disabled = false,
}) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <input
        type="text"
        name={name}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:bg-slate-100 disabled:text-slate-400"
      />
    </div>
  );
}

function DateInput({ label, value, name, onChange, required = false }) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="relative">
        <input
          type="date"
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        />
        <FiCalendar
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function Select({
  label,
  placeholder,
  value,
  name,
  onChange,
  children,
  required = true,
}) {
  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="relative">
        <select
          name={name}
          value={value || ""}
          onChange={onChange}
          className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 transition-all duration-150 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
        >
          <option value="">{placeholder}</option>
          {children}
        </select>
        <FiChevronDown
          size={16}
          className="pointer-events-none absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400"
        />
      </div>
    </div>
  );
}

function RadioGroup({ label, name, value, onChange, required = true }) {
  const isYes = value === true || value === "yes";
  const isNo = value === false || value === "no";

  return (
    <div className="w-full">
      <Label required={required}>{label}</Label>
      <div className="flex items-center gap-2 mt-1.5">
        <button
          type="button"
          onClick={() => onChange(name, true)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isYes
              ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
              : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isYes ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
            }`}
          />
          Yes
        </button>
        <button
          type="button"
          onClick={() => onChange(name, false)}
          className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-semibold border transition-all duration-150 ${
            isNo
              ? "bg-indigo-50 border-indigo-300 text-indigo-700 shadow-xs"
              : "bg-slate-50/60 border-slate-200 text-slate-600 hover:bg-slate-100"
          }`}
        >
          <span
            className={`w-2 h-2 rounded-full ${
              isNo ? "bg-indigo-600 ring-2 ring-indigo-200" : "bg-slate-300"
            }`}
          />
          No
        </button>
      </div>
    </div>
  );
}

function Grid2({ children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
  );
}

function SectionCard({ number, title, subtitle, badge, children }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_14px_rgba(0,0,0,0.05)] transition-all duration-200 p-5 sm:p-6">
      <div className="flex items-start justify-between border-b border-slate-100 pb-4 mb-5">
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold flex items-center justify-center shrink-0 shadow-2xs">
            {number}
          </span>
          <div>
            <h3 className="text-sm sm:text-base font-bold text-slate-900 tracking-tight">
              {title}
            </h3>
            {subtitle && (
              <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
            )}
          </div>
        </div>
        {badge && (
          <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
            {badge}
          </span>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

/* ==========================================================================
   DOCUMENT UPLOAD COMPONENT
   ========================================================================== */

const DEFAULT_DOCUMENT_FIELDS = [
  { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
  { key: "packing-list", label: "Packing List", enabled: true },
  { key: "msds", label: "MSDS", enabled: true },
  { key: "coo", label: "COO", enabled: true },
  { key: "iec-gst", label: "IEC/GST", enabled: true },
  { key: "purchase-order", label: "Purchase Order", enabled: true },
  { key: "product-certificate", label: "Product Certificate", enabled: true },
  { key: "other-documents", label: "Other Documents", enabled: true },
];

const DOCUMENT_ICON_STYLES = [
  "text-blue-600 bg-blue-50 border-blue-100",
  "text-amber-600 bg-amber-50 border-amber-100",
  "text-purple-600 bg-purple-50 border-purple-100",
  "text-emerald-600 bg-emerald-50 border-emerald-100",
  "text-indigo-600 bg-indigo-50 border-indigo-100",
  "text-rose-600 bg-rose-50 border-rose-100",
  "text-teal-600 bg-teal-50 border-teal-100",
  "text-slate-600 bg-slate-50 border-slate-200",
];

function DocumentsUpload({
  uploadedDocs,
  handleDocumentUpload,
  fileInputRef,
  config,
  loading = false,
  loadError = false,
  onRetry,
  onPreview,
  onDelete,
  deletingDocumentKey = "",
}) {
  const visibleDocuments = (
    Array.isArray(config?.fields) ? config.fields : []
  ).filter((document) => document.enabled !== false);

  return (
    <SectionCard
      number={4}
      title={config?.sectionTitle || "Documents Uploaded"}
      subtitle={config?.sectionDesc || "Upload all relevant documents"}
    >
      {loading ? (
        <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-8 text-center">
          <div className="mx-auto h-6 w-6 animate-spin rounded-full border-2 border-indigo-200 border-t-indigo-600" />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            Loading document requirements...
          </p>
        </div>
      ) : loadError ? (
        <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-6 text-center">
          <p className="text-sm font-semibold text-rose-700">
            Unable to load document requirements
          </p>
          <p className="mt-1 text-xs text-rose-600">
            Please try again. The form will use the latest shared settings saved
            by Admin.
          </p>
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-rose-700 border border-rose-200 hover:bg-rose-100"
            >
              Retry
            </button>
          )}
        </div>
      ) : visibleDocuments.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
          {visibleDocuments.map((document, index) => {
            const documentKey =
              document.key ||
              String(document.label || `document-${index}`)
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, "-")
                .replace(/^-|-$/g, "");

            const documentLabel = document.label || "Document";
            const uploadedDocument =
              uploadedDocs[documentKey] ||
              Object.values(uploadedDocs).find(
                (doc) =>
                  normalizeDocumentName(
                    doc.documentName || doc.documentLabel || doc.name,
                  ) === normalizeDocumentName(documentLabel),
              );
            const isUploaded = !!uploadedDocument;
            const documentUrl =
              uploadedDocument?.resolvedFileUrl ||
              getShipmentDocumentUrl(
                uploadedDocument?.fileUrl ||
                  uploadedDocument?.url ||
                  uploadedDocument?.documentUrl ||
                  uploadedDocument?.path,
              );
            const Icon = index === 1 ? FiClipboard : FiFileText;
            const iconStyle =
              DOCUMENT_ICON_STYLES[index % DOCUMENT_ICON_STYLES.length];

            return (
              <div
                key={documentKey}
                className={`group flex flex-col justify-between rounded-xl border p-3.5 text-center transition-all duration-150 ${
                  isUploaded
                    ? "border-emerald-200 bg-emerald-50/30"
                    : "border-slate-200 bg-slate-50/30 hover:border-indigo-200 hover:bg-indigo-50/20"
                }`}
              >
                <div>
                  <div
                    className={`w-9 h-9 rounded-xl mx-auto flex items-center justify-center border shadow-2xs ${iconStyle}`}
                  >
                    <Icon size={16} />
                  </div>

                  <p className="text-xs font-semibold text-slate-800 mt-2.5 break-words">
                    {documentLabel}
                  </p>
                </div>

                <div className="mt-3">
                  {isUploaded && documentUrl && (
                    <div className="mb-2 grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          onPreview?.(
                            uploadedDocument,
                            documentLabel,
                            documentUrl,
                          )
                        }
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-indigo-200 px-2 py-1.5 text-[11px] font-semibold text-indigo-700 hover:bg-indigo-50"
                      >
                        <FiEye size={12} /> Preview
                      </button>
                      <a
                        href={documentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-1 rounded-lg bg-white border border-emerald-200 px-2 py-1.5 text-[11px] font-semibold text-emerald-700 hover:bg-emerald-50"
                      >
                        Open
                      </a>
                    </div>
                  )}
                  <input
                    type="file"
                    hidden
                    accept=".pdf,.jpg,.jpeg,.png"
                    ref={(element) => {
                      fileInputRef.current[documentKey] = element;
                    }}
                    onChange={(event) => {
                      const file = event.target.files?.[0];

                      if (file) {
                        handleDocumentUpload(documentKey, documentLabel, file);
                      }

                      // Allows selecting the same file again after replacing it.
                      event.target.value = "";
                    }}
                  />

                  <button
                    type="button"
                    onClick={() => fileInputRef.current[documentKey]?.click()}
                    className={`w-full py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all duration-150 ${
                      isUploaded
                        ? "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        : "bg-white border border-slate-200 text-indigo-600 hover:border-indigo-300 hover:bg-indigo-50 shadow-2xs"
                    }`}
                  >
                    {isUploaded ? "Replace file" : "+ Upload"}
                  </button>
                  {isUploaded && (
                    <button
                      type="button"
                      disabled={deletingDocumentKey === documentKey}
                      onClick={() => onDelete?.(documentKey, uploadedDocument)}
                      className="mt-1.5 w-full rounded-lg border border-rose-200 bg-rose-50 px-2 py-1.5 text-[11px] font-semibold text-rose-700 hover:bg-rose-100 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      {deletingDocumentKey === documentKey
                        ? "Deleting..."
                        : "Delete"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-4 py-8 text-center">
          <FiFolder className="mx-auto text-slate-400" size={26} />
          <p className="mt-2 text-sm font-semibold text-slate-700">
            No documents available
          </p>
          <p className="mt-1 text-xs text-slate-500">
            The administrator has not enabled any document upload fields.
          </p>
        </div>
      )}

      <div className="flex items-center gap-2 mt-4 pt-3 text-xs text-slate-500 border-t border-slate-100">
        <FiInfo size={14} className="text-slate-400 shrink-0" />
        <span>
          Accepted formats: PDF, JPG, PNG (Max file size: 10MB per document)
        </span>
      </div>
    </SectionCard>
  );
}

function ShipmentValidationModal({ errors, onClose }) {
  if (!errors?.length) return null;

  const groups = [
    {
      title: "Basic Shipment Details",
      items: ["Shipment Type", "Shipment Mode", "Shipment Purpose"],
    },
    {
      title: "Origin & Destination",
      items: [
        "Origin Country",
        "Origin City / Port / Airport",
        "Destination Country",
        "Destination City / Port / Airport",
        "Consignee / Buyer Name",
        "Consignee Address",
      ],
    },
    {
      title: "Invoice & Value",
      items: [
        "Invoice Value",
        "Invoice Value must be greater than 0",
        "Currency",
        "Payment Terms",
      ],
    },
    {
      title: "Product & Cargo Details",
      items: [
        "Product Name",
        "Product Description",
        "Product Category",
        "Quantity",
        "Unit",
        "Net Weight (Kg)",
        "Gross Weight (Kg)",
        "No. of Packages",
        "Packing Type",
        "Package Length",
        "Package Width",
        "Package Height",
      ],
    },
  ];

  const known = new Set(groups.flatMap((group) => group.items));
  const sections = groups
    .map((group) => ({
      ...group,
      missing: errors.filter((item) => group.items.includes(item)),
    }))
    .filter((group) => group.missing.length > 0);
  const otherErrors = errors.filter((item) => !known.has(item));
  if (otherErrors.length)
    sections.push({
      title: "Required Documents / Other Details",
      missing: otherErrors,
    });

  return (
    <div
      className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/60 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shipment-validation-title"
        className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-start gap-3 border-b border-amber-100 bg-amber-50 px-5 py-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
            <FiInfo size={20} />
          </div>
          <div className="min-w-0 flex-1">
            <h2
              id="shipment-validation-title"
              className="text-base font-bold text-slate-900"
            >
              Complete your shipment details
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              Your shipment hasn’t been submitted yet. Please fill in the{" "}
              {errors.length} required{" "}
              {errors.length === 1 ? "field" : "fields"} below.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1.5 text-slate-400 hover:bg-white hover:text-slate-700"
            aria-label="Close"
          >
            <FiX size={19} />
          </button>
        </div>

        <div className="max-h-[55vh] space-y-4 overflow-y-auto px-5 py-4">
          {sections.map((section) => (
            <section key={section.title}>
              <h3 className="mb-2 text-xs font-bold uppercase tracking-wide text-slate-500">
                {section.title}
              </h3>
              <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {section.missing.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2 rounded-lg border border-rose-100 bg-rose-50/70 px-3 py-2 text-sm text-rose-800"
                  >
                    <span className="mt-0.5 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-rose-100 text-[10px] font-bold">
                      !
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-slate-50 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-slate-500">
            Draft saving and document uploads are still available.
          </p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
          >
            Okay, I’ll complete them
          </button>
        </div>
      </div>
    </div>
  );
}

function DocumentPreviewModal({ document, onClose }) {
  if (!document) return null;
  const url = document.url || "";
  const isImage =
    /\.(jpg|jpeg|png|webp|gif)(\?.*)?$/i.test(
      `${document.fileName || ""} ${url}`,
    ) || String(document.mimeType || "").startsWith("image/");
  const isPdf =
    /\.pdf(\?.*)?$/i.test(`${document.fileName || ""} ${url}`) ||
    document.mimeType === "application/pdf";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-3 sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-slate-200 px-4 py-3">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-bold text-slate-900">
              {document.title || "Document Preview"}
            </h3>
            <p className="truncate text-xs text-slate-500">
              {document.fileName || "Uploaded file"}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close preview"
          >
            <FiX size={18} />
          </button>
        </div>
        <div className="min-h-[260px] flex-1 overflow-auto bg-slate-100 p-3 sm:p-5">
          {isImage ? (
            <img
              src={url}
              alt={document.title || "Uploaded document"}
              className="mx-auto max-h-[72vh] max-w-full rounded-lg object-contain shadow-sm"
            />
          ) : isPdf ? (
            <iframe
              title={document.title || "PDF preview"}
              src={url}
              className="h-[72vh] w-full rounded-lg border border-slate-200 bg-white"
            />
          ) : (
            <div className="flex h-64 flex-col items-center justify-center gap-3 text-center">
              <FiFileText size={42} className="text-slate-400" />
              <p className="text-sm font-semibold text-slate-700">
                Preview is not available for this file type.
              </p>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-lg bg-indigo-600 px-4 py-2 text-xs font-semibold text-white hover:bg-indigo-700"
              >
                Open document
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================================
   AI ANALYSIS CARD
   ========================================================================== */

function AIOutputAnalysis({ analysis }) {
  const aiTopStats = [
    {
      label: "Suggested HS Code",
      value: analysis?.hsCode || "--",
      color: "bg-blue-50/70 border-blue-200/80 text-blue-700",
    },
    {
      label: "Required Docs",
      value: analysis?.requiredDocs ? `${analysis.requiredDocs} Files` : "--",
      color: "bg-emerald-50/70 border-emerald-200/80 text-emerald-700",
    },
    {
      label: "Freight Estimate",
      value: analysis?.freightEstimate ? `₹${analysis.freightEstimate}` : "--",
      color: "bg-amber-50/70 border-amber-200/80 text-amber-700",
    },
    {
      label: "RoDTEP Incentive",
      value: analysis?.incentive || "N/A",
      color: "bg-purple-50/70 border-purple-200/80 text-purple-700",
    },
  ];

  const aiBottomStats = [
    {
      label: "Compliance Checklist",
      value: analysis?.complianceCount || "--",
      sub: "Requirements",
    },
    {
      label: "Risk Score Assessment",
      value: analysis?.riskScore || "--",
      sub: analysis?.riskSub || "",
      green: true,
    },
    { label: "Estimated Transit Time", value: analysis?.timeline || "--" },
    {
      label: "Recommended Next Step",
      value: analysis?.recommendation || "--",
      green: true,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3.5 mb-3.5 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center">
            <FiZap size={14} />
          </div>
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-indigo-600 text-white text-xs font-bold flex items-center justify-center">
              5
            </span>
            <h3 className="text-sm font-bold text-slate-900">
              AI Output After Analysis
            </h3>
          </div>
        </div>
        <span className="text-[10px] font-semibold tracking-wide uppercase px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/70">
          Smart Engine
        </span>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {aiTopStats.map((s) => (
          <div
            key={s.label}
            className={`rounded-xl border p-2.5 flex flex-col justify-between ${s.color}`}
          >
            <p className="text-[11px] font-medium opacity-80">{s.label}</p>
            <p className="text-sm font-bold mt-1 tracking-tight">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-2.5">
        {aiBottomStats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-slate-100 bg-slate-50/70 p-2.5"
          >
            <p className="text-[11px] text-slate-500 font-medium">{s.label}</p>
            <p
              className={`text-xs font-bold mt-1 ${s.green ? "text-emerald-600" : "text-slate-800"}`}
            >
              {s.value}
            </p>
            {s.sub && (
              <p className="text-[10px] text-slate-400 mt-0.5">{s.sub}</p>
            )}
          </div>
        ))}
      </div>

      <button
        type="button"
        className="w-full mt-3.5 flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-indigo-600 transition-all shadow-2xs"
      >
        <FiExternalLink size={13} />
        View Full Analysis Report
      </button>
    </div>
  );
}

/* ==========================================================================
   FORM STEP SECTIONS
   ========================================================================== */

function BasicShipmentDetails({
  formData,
  handleDirectChange,
  handleNestedChange,
  referenceNumber,
  config,
}) {
  const fallbackFields = [
    {
      key: "shipmentType",
      label: "Shipment Type",
      useDropdown: true,
      options: ["Export", "Import", "Re-export"],
    },
    {
      key: "shipmentMode",
      label: "Shipment Mode",
      useDropdown: true,
      options: ["Air", "Sea", "Road", "Rail"],
    },
    {
      key: "shipmentPurpose",
      label: "Shipment Purpose",
      useDropdown: true,
      options: ["Commercial", "Sample", "Personal"],
    },
    {
      key: "companyName",
      label: "Customer / Company Name",
      useDropdown: false,
    },
    {
      key: "contactPerson",
      label: "Contact Person",
      useDropdown: false,
    },
  ];

 // These fields are already rendered in their respective sections below.
// Do not render them again inside Basic Shipment Details.
const fieldsRenderedInOtherSections = new Set([
  "originCountry",
  "destinationCountry",
  "incoterm",
  "currency",
  "paymentTerms",
  "productCategory",
  "quantityUnit",
  "dimensionUnit",
  "packingType",
]);

const configuredFields = Array.isArray(config?.fields)
  ? config.fields
  : [];

const fields = [];
const seenKeys = new Set();
const seenLabels = new Set();

configuredFields.forEach((field) => {
  if (!field?.key || fieldsRenderedInOtherSections.has(field.key)) {
    return;
  }

  const normalizedKey = String(field.key).trim().toLowerCase();
  const normalizedLabel = String(field.label || "")
    .trim()
    .toLowerCase();

  if (
    seenKeys.has(normalizedKey) ||
    (normalizedLabel && seenLabels.has(normalizedLabel))
  ) {
    return;
  }

  seenKeys.add(normalizedKey);
  if (normalizedLabel) seenLabels.add(normalizedLabel);

  fields.push(field);
});

// Add the standard Basic Shipment fields only if they are missing.
fallbackFields.forEach((fallback) => {
  const exists = fields.some(
    (field) =>
      field.key === fallback.key ||
      String(field.label || "").trim().toLowerCase() ===
        fallback.label.trim().toLowerCase()
  );

  if (!exists) {
    fields.push(fallback);
  }
});

  const getValue = (key) => {
    switch (key) {
      case "companyName":
        return formData.exporter?.companyName || "";
      case "contactPerson":
        return formData.exporter?.contactPerson || "";
      case "shipmentType":
      case "shipmentMode":
      case "shipmentPurpose":
        return formData[key] || "";
      default:
        return formData.customFields?.[key] ?? "";
    }
  };

  const handleFieldChange = (key, value) => {
    switch (key) {
      case "companyName":
      case "contactPerson":
        handleNestedChange("exporter", key, value);
        break;

      case "shipmentType":
      case "shipmentMode":
      case "shipmentPurpose":
        handleDirectChange({
          target: { name: key, value },
        });
        break;

      default:
        handleNestedChange("customFields", key, value);
        break;
    }
  };

  return (
    <SectionCard
      number={1}
      title={config?.title || "Basic Shipment Details"}
      subtitle={
        config?.description ||
        "General shipment classification and exporter contact"
      }
    >
      <Grid2>
        {fields.map((field) => {
          const value = getValue(field.key);

          return (
            <div key={field.key} className="w-full">
              {field.useDropdown ? (
                <Select
                  label={field.label}
                  placeholder={`Select ${field.label}`}
                  name={field.key}
                  value={value}
                  onChange={(event) =>
                    handleFieldChange(field.key, event.target.value)
                  }
                >
                  {(field.options || []).map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </Select>
              ) : (
                <div className="w-full">
                  <Label required={false}>{field.label}</Label>
                  <input
                    type="text"
                    value={value}
                    onChange={(event) =>
                      handleFieldChange(field.key, event.target.value)
                    }
                    placeholder={`Enter ${field.label}`}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3.5 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              )}
            </div>
          );
        })}

        <Input
          label="Reference No"
          value={referenceNumber || "Auto Generated on Draft/Submit"}
          disabled={true}
          required={false}
        />
      </Grid2>
    </SectionCard>
  );
}

const getShipmentDropdownOptions = (config, key, fallback) => {
  const field = config?.fields?.find((item) => item.key === key);
  return field?.useDropdown && Array.isArray(field.options) && field.options.length
    ? field.options
    : fallback;
};

function OriginDestination({
  formData,
  handleDirectChange,
  handleNestedChange,
  config,
}) {
  return (
    <SectionCard number={2} title="Origin & Destination" subtitle="">
      <Grid2>
        <Select
          label="Origin Country"
          placeholder="Select Country"
          value={formData.route.originCountry}
          onChange={(e) =>
            handleNestedChange("route", "originCountry", e.target.value)
          }
        >
          {getShipmentDropdownOptions(config, "originCountry", ["India", "China", "USA"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
        <Input
          label="Origin City / Port / Airport"
          placeholder="e.g. Mumbai Port (INBOM)"
          value={formData.route.originCity}
          onChange={(e) =>
            handleNestedChange("route", "originCity", e.target.value)
          }
        />
      </Grid2>
      <Grid2>
        <Select
          label="Destination Country"
          placeholder="Select Country"
          value={formData.route.destinationCountry}
          onChange={(e) =>
            handleNestedChange("route", "destinationCountry", e.target.value)
          }
        >
          {getShipmentDropdownOptions(config, "destinationCountry", ["India", "Singapore", "Dubai"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
        <Input
          label="Destination City / Port / Airport"
          placeholder="e.g. Jebel Ali Port (AEJEA)"
          value={formData.route.destinationCity}
          onChange={(e) =>
            handleNestedChange("route", "destinationCity", e.target.value)
          }
        />
      </Grid2>
      <Grid2>
        <Input
          label="Consignee / Buyer Name"
          placeholder="Buyer legal company name"
          value={formData.importer.companyName}
          onChange={(e) =>
            handleNestedChange("importer", "companyName", e.target.value)
          }
        />
        <Input
          label="Consignee Address"
          placeholder="Warehouse or delivery address"
          value={formData.importer.address}
          onChange={(e) =>
            handleNestedChange("importer", "address", e.target.value)
          }
        />
      </Grid2>
      <Grid2>
        <Select
          label="Incoterm"
          required={false}
          placeholder="Select Incoterm"
          value={formData.incoterm}
          onChange={(e) => handleDirectChange(e)}
          name="incoterm"
        >
          {getShipmentDropdownOptions(config, "incoterm", ["FOB", "CIF", "EXW"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
        <DateInput
          label="Expected Shipment Date"
          name="etd"
          value={formData.etd}
          onChange={handleDirectChange}
        />
      </Grid2>
    </SectionCard>
  );
}

function ProductDetails({
  formData,
  handleNestedChange,
  handleRadioChange,
  analysis,
  config,
}) {
  return (
    <SectionCard number={6} title="Product Details" subtitle="">
      <Grid2>
        <Input
          label="Product Name"
          placeholder="e.g. High Density Polymer Resins"
          value={formData.cargo.productName}
          onChange={(e) =>
            handleNestedChange("cargo", "productName", e.target.value)
          }
        />
        <Input
          label="Product Description"
          placeholder="Brief technical or commercial description"
          value={formData.cargo.productDescription}
          onChange={(e) =>
            handleNestedChange("cargo", "productDescription", e.target.value)
          }
        />
      </Grid2>

      <Grid2>
        <Input
          label="HS Code"
          placeholder="Enter HS Code manually"
          value={formData.cargo.hsCodeText || ""}
          onChange={(e) =>
            handleNestedChange("cargo", "hsCodeText", e.target.value)
          }
        />
        <Select
          label="Product Category"
          placeholder="Select category"
          value={formData.cargo.category}
          onChange={(e) =>
            handleNestedChange("cargo", "category", e.target.value)
          }
        >
          {getShipmentDropdownOptions(config, "productCategory", ["Electronics", "Textiles", "General"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
      </Grid2>

      <Grid2>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Quantity"
            placeholder="e.g. 500"
            value={formData.cargo.quantity}
            onChange={(e) =>
              handleNestedChange("cargo", "quantity", e.target.value)
            }
          />
          <Select
            label="Unit"
            placeholder="Unit"
            value={formData.cargo.unit}
            onChange={(e) =>
              handleNestedChange("cargo", "unit", e.target.value)
            }
          >
            {getShipmentDropdownOptions(config, "quantityUnit", ["PCS", "KG", "BOX"]).map((option) => <option key={option} value={option}>{option}</option>)}
          </Select>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Net Weight (Kg)"
            placeholder="Net Wt"
            value={formData.cargo.netWeight || formData.cargo.weight}
            onChange={(e) =>
              handleNestedChange("cargo", "netWeight", e.target.value)
            }
          />
          <Input
            label="Gross Weight (Kg)"
            placeholder="Gross Wt"
            value={formData.cargo.grossWeight}
            onChange={(e) =>
              handleNestedChange("cargo", "grossWeight", e.target.value)
            }
          />
        </div>
      </Grid2>

      {/* DIMENSIONS ROW */}
      <div className="rounded-xl border border-slate-200/90 bg-slate-50/40 p-4">
        <div className="flex items-center justify-between mb-2">
          <Label required={true}>Package Dimensions (L × W × H)</Label>
          <span className="text-[11px] font-medium text-slate-400">
            Unit of measurement
          </span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-2.5">
          <div className="relative">
            <input
              placeholder="Length"
              value={formData.cargo.dimensions?.length || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  length: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">
              L
            </span>
          </div>
          <div className="relative">
            <input
              placeholder="Width"
              value={formData.cargo.dimensions?.width || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  width: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">
              W
            </span>
          </div>
          <div className="relative">
            <input
              placeholder="Height"
              value={formData.cargo.dimensions?.height || ""}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  height: e.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm text-slate-800 placeholder-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[10px] font-semibold text-slate-400 pointer-events-none">
              H
            </span>
          </div>
          <div className="relative">
            <select
              value={formData.cargo.dimensions?.unit || "CM"}
              onChange={(e) =>
                handleNestedChange("cargo", "dimensions", {
                  ...formData.cargo.dimensions,
                  unit: e.target.value,
                })
              }
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/10"
            >
              {getShipmentDropdownOptions(config, "dimensionUnit", ["CM", "INCH"]).map((option) => <option key={option} value={option}>{option}</option>)}
            </select>
            <FiChevronDown
              size={14}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
          </div>
        </div>
      </div>

      <Grid2>
        <Input
          label="Volumetric Weight"
          placeholder="Calculated Amount"
          value={formData.cargo.volumetricWeight}
          onChange={(e) =>
            handleNestedChange("cargo", "volumetricWeight", e.target.value)
          }
        />
        <Input
          label="No. of Packages"
          placeholder="Total cartons or pallets"
          value={formData.cargo.packages}
          onChange={(e) =>
            handleNestedChange("cargo", "packages", e.target.value)
          }
        />
      </Grid2>

      <Grid2>
        <Select
          label="Packing Type"
          placeholder="Select packing type"
          value={formData.cargo.packingType}
          onChange={(e) =>
            handleNestedChange("cargo", "packingType", e.target.value)
          }
        >
          {getShipmentDropdownOptions(config, "packingType", ["Carton", "Pallet", "Wooden Crate"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
        <Input
          label="UN Number (if DG)"
          placeholder="e.g. UN1993"
          required={false}
          value={formData.cargo.unNumber}
          onChange={(e) =>
            handleNestedChange("cargo", "unNumber", e.target.value)
          }
        />
      </Grid2>

      <Input
        label="Package Marks & Numbers"
        placeholder="Shipping mark inscriptions on carton"
        required={false}
        value={formData.cargo.packageMarks}
        onChange={(e) =>
          handleNestedChange("cargo", "packageMarks", e.target.value)
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
        <RadioGroup
          label="Dangerous Goods (DG)"
          name="isDangerous"
          value={formData.cargo.isDangerous}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Temperature Controlled"
          name="isTemperatureControlled"
          value={formData.cargo.isTemperatureControlled}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Stackable"
          name="isStackable"
          value={formData.cargo.isStackable}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Fragile"
          name="isFragile"
          value={formData.cargo.isFragile}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Battery Included"
          name="hasBattery"
          value={formData.cargo.hasBattery}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
        <RadioGroup
          label="Lithium Battery"
          name="isLithium"
          value={formData.cargo.isLithium}
          onChange={(name, val) => handleNestedChange("cargo", name, val)}
        />
      </div>
    </SectionCard>
  );
}

function InvoiceValue({ formData, handleDirectChange, handleRadioChange, config }) {
  return (
    <SectionCard number={3} title="Invoice & Value" subtitle="">
      <Grid2>
        <Input
          label="Invoice Value"
          placeholder="Total invoice amount"
          name="amount"
          value={formData.amount}
          onChange={handleDirectChange}
        />
        <Select
          label="Currency"
          placeholder="Select currency"
          name="currency"
          value={formData.currency}
          onChange={handleDirectChange}
        >
          {getShipmentDropdownOptions(config, "currency", ["USD", "INR", "EUR"]).map((option) => <option key={option} value={option}>{option}</option>)}
        </Select>
      </Grid2>
      <Select
        label="Payment Terms"
        placeholder="Select payment terms"
        name="paymentTerms"
        value={formData.paymentTerms}
        onChange={handleDirectChange}
      >
        {getShipmentDropdownOptions(config, "paymentTerms", ["Advance", "LC", "Net 30"]).map((option) => <option key={option} value={option}>{option}</option>)}
      </Select>
      <Grid2>
        <RadioGroup
          label="Insurance Required"
          name="insuranceRequired"
          value={formData.insuranceRequired}
          onChange={handleRadioChange}
        />
        <RadioGroup
          label="Export Incentive"
          name="exportIncentive"
          value={formData.exportIncentive}
          onChange={handleRadioChange}
        />
      </Grid2>
    </SectionCard>
  );
}

/* ==========================================================================
   SIDEBAR METRIC CARDS
   ========================================================================== */

function DimensionsCard({ calculatedMetrics }) {
  const dimensionRows = [
    {
      label: "Volume Total (CBM)",
      value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--",
    },
    {
      label: "Volumetric Wt (Air)",
      value: calculatedMetrics?.volumetricWeight
        ? `${calculatedMetrics.volumetricWeight} Kg`
        : "--",
    },
    {
      label: "Ocean Volume (CBM)",
      value: calculatedMetrics?.cbm ? `${calculatedMetrics.cbm} CBM` : "--",
    },
    {
      label: "Chargeable Weight",
      value: calculatedMetrics?.chargeableWeight
        ? `${calculatedMetrics.chargeableWeight} Kg`
        : "--",
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
            <FiBox size={14} />
          </div>
          <h3 className="text-sm font-bold text-slate-900">
            Cargo & Weight Metrics
          </h3>
        </div>
        <span className="text-[10px] text-slate-400">Live Calc</span>
      </div>

      <div className="space-y-2.5">
        {dimensionRows.map((r) => (
          <div
            key={r.label}
            className="flex items-center justify-between text-xs py-1"
          >
            <span className="text-slate-500 font-medium">{r.label}</span>
            <span className="font-bold text-slate-800">{r.value}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-3.5 border-t border-slate-100 flex items-center justify-between bg-emerald-50/60 -mx-5 -mb-5 p-4 rounded-b-2xl border-emerald-100/60">
        <div>
          <span className="text-[11px] font-semibold text-emerald-800 block">
            Estimated Freight
          </span>
          <span className="text-[10px] text-emerald-600">
            Standard market rate
          </span>
        </div>
        <span className="text-base font-extrabold text-emerald-700">
          {calculatedMetrics?.estimatedFreight
            ? `₹ ${calculatedMetrics.estimatedFreight}`
            : "--"}
        </span>
      </div>
    </div>
  );
}

function StatusFlowCard({ currentStatus = "Draft" }) {
  const statusFlow = [
    { label: "Draft", sub: "Saved as draft", icon: FiFileText },
    { label: "AI Analyzed", sub: "AI compliance check", icon: FiZap },
    { label: "Submitted", sub: "Ready for admin", icon: FiUploadCloud },
    { label: "Admin Review", sub: "Verification", icon: FiEye },
    { label: "Quotation Sent", sub: "Awaiting rate approval", icon: FiSend },
    { label: "Accepted", sub: "Booking confirmed", icon: FiCheckCircle },
    { label: "Shipment Active", sub: "Cargo in transit", icon: FiTruck },
    {
      label: "Completed",
      sub: "Customs cleared & delivered",
      icon: FiCheckCircle,
    },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5">
      <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-100">
        <h3 className="text-sm font-bold text-slate-900">Workflow Pipeline</h3>
        <span className="text-[11px] font-semibold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-100">
          {currentStatus}
        </span>
      </div>

      <div className="space-y-3.5">
        {statusFlow.map((s, idx) => {
          const Icon = s.icon;
          const isActive = currentStatus === s.label;

          return (
            <div key={s.label} className="flex items-center gap-3 relative">
              <div
                className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all ${
                  isActive
                    ? "bg-indigo-600 text-white shadow-xs ring-4 ring-indigo-500/15"
                    : "bg-slate-100 text-slate-400 border border-slate-200/60"
                }`}
              >
                <Icon size={13} />
              </div>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-xs font-semibold truncate ${
                    isActive ? "text-indigo-950 font-bold" : "text-slate-700"
                  }`}
                >
                  {s.label}
                </p>
                <p className="text-[11px] text-slate-400 truncate">{s.sub}</p>
              </div>
              {isActive && (
                <span className="w-2 h-2 rounded-full bg-indigo-600 animate-pulse shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

const quickTips = [
  "Fill all required fields marked with * for swift processing.",
  "Ensure invoices and packing lists match net/gross weight.",
  "Run 'Analyze Shipment' to verify HS Code validity with AI.",
  "Submit to Admin only after verifying all customs declarations.",
];

function QuickTipsCard() {
  return (
    <div className="bg-gradient-to-br from-amber-50/70 to-orange-50/50 border border-amber-200/60 rounded-2xl p-5 shadow-2xs">
      <div className="flex items-center gap-2 mb-2.5">
        <div className="w-6 h-6 rounded-lg bg-amber-100/80 text-amber-700 flex items-center justify-center shrink-0">
          <FiInfo size={13} />
        </div>
        <h3 className="text-xs font-bold text-amber-950 uppercase tracking-wider">
          Compliance Guidelines
        </h3>
      </div>
      <ul className="space-y-2 text-xs text-amber-900/80">
        {quickTips.map((t, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <span className="text-amber-500 font-bold mt-0.5">•</span>
            <span className="leading-relaxed">{t}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ==========================================================================
   HEADER & FOOTER
   ========================================================================== */

function Header({
  setActiveTab,
  setShipment,
  handleSaveDraft,
  handleAnalyze,
  handleSubmit,
  loading,
  currentTab,
  currentStatus,
  accountType = "user",
}) {
  return (
    <div className="p-1 sm:p-1  mb-1">
      {/* Breadcrumb */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-end gap-1">
        {/* <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              New Shipment Form
            </h1>
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border border-slate-200">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              {currentStatus || "Draft"}
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1 max-w-2xl leading-relaxed">
            Specify origin, destination, cargo dimensions, and trade documents.
            Our logistics intelligence engine will compute HS code compliance,
            risk evaluation, and estimated freight.
          </p>
        </div> */}

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          {accountType === "b2b" && (
            <>
              <button
                type="button"
                onClick={handleSaveDraft}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 shadow-2xs transition-all disabled:opacity-50"
              >
                <FiBookmark size={14} className="text-slate-500" />
                Save Draft
              </button>

              <button
                type="button"
                onClick={handleAnalyze}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-xl bg-indigo-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-indigo-700 transition-all disabled:opacity-50"
              >
                <FiZap size={14} />
                Analyze Shipment
              </button>
            </>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading}
            className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white shadow-xs hover:bg-emerald-700 transition-all disabled:opacity-50"
          >
            <FiSend size={14} />
            {accountType === "admin" ? "Create Shipment" : "Submit to Admin"}
          </button>

          <button
            type="button"
            onClick={() => {
              setShipment?.("");
              setActiveTab?.(currentTab);
            }}
            className="inline-flex items-center gap-1 rounded-xl border border-rose-200 bg-rose-50/50 px-3 py-2.5 text-xs font-semibold text-rose-600 hover:bg-rose-100/70 transition-all"
          >
            <FiX size={14} />
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <div className="border-t border-slate-200/80 mt-10 pt-6 pb-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-400">
      <p>© 2025 ASC CargoMatrix Logistics Hub. All rights reserved.</p>
      <div className="flex items-center gap-5">
        <span className="hover:text-slate-600 cursor-pointer transition-colors">
          Privacy Policy
        </span>
        <span className="hover:text-slate-600 cursor-pointer transition-colors">
          Terms of Operations
        </span>
        <span className="hover:text-slate-600 cursor-pointer transition-colors">
          Customs Support
        </span>
      </div>
    </div>
  );
}

/* ==========================================================================
   MAIN EXPORT COMPONENT
   ========================================================================== */

export default function Shipment({
  setActiveTab,
  setShipment,
  currentTab,
  editShipmentId = null,
  onSaved,
  isAdmin = false,
}) {
  // Admin panel explicitly opts into Admin mode; User/B2B sessions keep
  // their existing account-type detection and workflow.
  const accountType = isAdmin ? "admin" : getLoggedInAccountType();
  const isNormalUser = accountType === "user";
  const [submittedLocked, setSubmittedLocked] = useState(false);
  const [shipmentId, setShipmentId] = useState("");
  const [referenceNumber, setReferenceNumber] = useState("");
  const [currentStatus, setCurrentStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [uploadedDocs, setUploadedDocs] = useState({});
  const [previewDocument, setPreviewDocument] = useState(null);
  const [deletingDocumentKey, setDeletingDocumentKey] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [showValidationModal, setShowValidationModal] = useState(false);
  const fileInputRef = useRef({});

  const [shipmentFormConfig, setShipmentFormConfig] = useState(null);
  const [documentsUploadConfig, setDocumentsUploadConfig] = useState(null);
  const [documentsSettingsLoading, setDocumentsSettingsLoading] =
    useState(true);
  const [documentsSettingsError, setDocumentsSettingsError] = useState(false);

  const fetchDocumentsSettings = async (isMountedCheck = () => true) => {
    try {
      setDocumentsSettingsLoading(true);
      setDocumentsSettingsError(false);

      const response = await getDocumentsUploadSettings();
      if (!isMountedCheck()) return;

      // Shared endpoint response: { status: 1, data: { sectionTitle, sectionDesc, fields } }
      let data = response?.data;
      data = data?.data ?? data;
      data = data?.data ?? data;
      data = data?.documentsUpload ?? data;

      if (Array.isArray(data?.fields)) {
        setDocumentsUploadConfig({
          sectionTitle: data.sectionTitle || "Documents Uploaded",
          sectionDesc: data.sectionDesc || "Upload all relevant documents",
          fields: data.fields,
        });
      } else {
        setDocumentsUploadConfig({ fields: [] });
      }
    } catch (error) {
      console.error("Shared document settings fetch error:", error);
      if (isMountedCheck()) {
        setDocumentsUploadConfig(null);
        setDocumentsSettingsError(true);
      }
    } finally {
      if (isMountedCheck()) setDocumentsSettingsLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;

    const fetchFormSettings = async () => {
      try {
        const shipmentResponse = await getShipmentFormSettings();
        if (!isMounted) return;

        let shipmentData = shipmentResponse?.data;
        shipmentData = shipmentData?.data ?? shipmentData;
        shipmentData = shipmentData?.data ?? shipmentData;

        if (shipmentData?.sections?.length) {
          setShipmentFormConfig(shipmentData.sections[0]);
        }
      } catch (error) {
        console.error("Shipment form settings fetch error:", error);
      }
    };

    fetchFormSettings();
    fetchDocumentsSettings(() => isMounted);

    return () => {
      isMounted = false;
    };
  }, []);

  const [formData, setFormData] = useState({
    // Step 1
    shipmentType: "",
    shipmentMode: "",
    shipmentPurpose: "",
    customerType: "Individual",
    exporter: {
      companyName: "",
      contactPerson: "",
    },
    customFields: {},

    // Step 2
    route: {
      originCountry: "",
      originCity: "",
      destinationCountry: "",
      destinationCity: "",
    },
    importer: {
      companyName: "",
      address: "",
    },
    incoterm: "",
    etd: "",
    eta: "",

    // Step 3
    cargo: {
      productName: "",
      productDescription: "",
      hsCode: "",
      hsCodeText: "",
      category: "",
      quantity: "",
      unit: "",
      weight: "",
      netWeight: "",
      grossWeight: "",
      volumetricWeight: "",
      packages: "",
      packingType: "",
      unNumber: "",
      packageMarks: "",
      isDangerous: false,
      isTemperatureControlled: false,
      isStackable: false,
      isFragile: false,
      hasBattery: false,
      isLithium: false,
      dimensions: {
        length: "",
        width: "",
        height: "",
        unit: "CM",
      },
    },
    amount: "",
    currency: "",
    paymentTerms: "",
    insuranceRequired: false,
    exportIncentive: false,
    additionalInformation: {
      packagingType: "",
      packages: 0,
      marksNumbers: "",
      dangerousGoods: false,
      specialHandling: false,
      temperatureControl: false,
    },
  });

  // Load the selected draft into the existing multi-step form.
  useEffect(() => {
    if (!editShipmentId) return;
    let active = true;
    (async () => {
      try {
        setLoading(true);
        const response = await getShipmentDetails(editShipmentId);
        const data =
          response?.data?.data || response?.data?.shipment || response?.data;
        const shipment = data?.shipment || data;
        if (!active || !shipment?._id) return;
        setShipmentId(shipment._id);
        setReferenceNumber(shipment.referenceNumber || shipment.sbNumber || "");
        setCurrentStatus(shipment.shipmentStatus || "Draft");

        const existingStatus = String(shipment.shipmentStatus || shipment.status || "").toLowerCase();
        if (isNormalUser && ["submitted", "pending", "under review", "admin review"].includes(existingStatus)) {
          setSubmittedLocked(true);
          return;
        }

        // Restore previously uploaded files so draft attachments remain visible in edit mode.
        const savedDocuments = Array.isArray(shipment.documents)
          ? shipment.documents
          : [];
        setUploadedDocs(
          savedDocuments.reduce((acc, doc) => {
            const label =
              doc.documentName || doc.documentLabel || doc.name || "Document";
            const key = normalizeDocumentName(doc.documentKey || label);
            acc[key] = {
              ...doc,
              resolvedFileUrl: getShipmentDocumentUrl(
                doc.fileUrl || doc.url || doc.documentUrl || doc.path,
              ),
            };
            return acc;
          }, {}),
        );
        setFormData((prev) => ({
          ...prev,
          ...shipment,
          exporter: { ...prev.exporter, ...(shipment.exporter || {}) },
          route: { ...prev.route, ...(shipment.route || {}) },
          importer: { ...prev.importer, ...(shipment.importer || {}) },
          cargo: {
            ...prev.cargo,
            ...(shipment.cargo || {}),
            dimensions: {
              ...prev.cargo.dimensions,
              ...(shipment.cargo?.dimensions || {}),
            },
          },
          additionalInformation: {
            ...prev.additionalInformation,
            ...(shipment.additionalInformation || {}),
          },
          customFields: shipment.customFields || {},
          amount: shipment.amount ?? shipment.cargo?.value ?? "",
          currency: shipment.currency || shipment.cargo?.currency || "",
          etd: shipment.etd ? String(shipment.etd).slice(0, 10) : "",
          eta: shipment.eta ? String(shipment.eta).slice(0, 10) : "",
        }));
      } catch (error) {
        console.error("Load draft for editing failed:", error);
        alert(error?.response?.data?.message || "Unable to load this draft.");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, [editShipmentId, isNormalUser]);

  const handleDirectChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleNestedChange = (parentKey, childKey, value) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...prev[parentKey],
        [childKey]: value,
      },
    }));
  };

  const handleRadioChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const saveAllSteps = async () => {
    let currentId = shipmentId;

    const shipmentPayload = {
      shipmentType: formData.shipmentType,
      shipmentMode: formData.shipmentMode,
      shipmentPurpose: formData.shipmentPurpose,
      customerType: formData.customerType,
      accountType,
      ...(isAdmin ? { createdByRole: "Admin" } : {}),

      exporter: {
        ...formData.exporter,
      },

      customFields: formData.customFields || {},

      currency: formData.currency || "INR",

      paymentTerms: formData.paymentTerms || "",

      amount: formData.amount === "" ? undefined : Number(formData.amount),

      insuranceRequired: Boolean(formData.insuranceRequired),
      exportIncentive: Boolean(formData.exportIncentive),
    };

    const step2Payload = {
      route: {
        ...formData.route,
        mode: formData.shipmentMode || "",
      },

      importer: {
        ...formData.importer,
      },

      shipmentMode: formData.shipmentMode,

      etd: formData.etd || null,
      eta: formData.eta || null,
      incoterm: formData.incoterm || "",
    };

  
const invoiceValue =
formData.amount === "" || formData.amount == null
  ? undefined
  : Number(formData.amount);

const step3Payload = {
cargo: {
  ...formData.cargo,

  // Invoice Value cargo ke andar bhi save hogi
  value: invoiceValue,
  currency: formData.currency || "INR",

  // Manual HS Code
  hsCode: null,
  hsCodeText: String(
    formData.cargo.hsCodeText || ""
  ).trim(),

  quantity:
    formData.cargo.quantity === ""
      ? undefined
      : Number(formData.cargo.quantity),

  weight:
    formData.cargo.weight === ""
      ? undefined
      : Number(formData.cargo.weight),

  netWeight:
    formData.cargo.netWeight === ""
      ? undefined
      : Number(formData.cargo.netWeight),

  grossWeight:
    formData.cargo.grossWeight === ""
      ? undefined
      : Number(formData.cargo.grossWeight),

  packages:
    formData.cargo.packages === ""
      ? undefined
      : Number(formData.cargo.packages),

  volumetricWeight:
    formData.cargo.volumetricWeight === ""
      ? undefined
      : Number(formData.cargo.volumetricWeight),

  dimensions: {
    ...formData.cargo.dimensions,
    length:
      formData.cargo.dimensions.length === ""
        ? undefined
        : Number(formData.cargo.dimensions.length),
    width:
      formData.cargo.dimensions.width === ""
        ? undefined
        : Number(formData.cargo.dimensions.width),
    height:
      formData.cargo.dimensions.height === ""
        ? undefined
        : Number(formData.cargo.dimensions.height),
  },
},

// Root-level invoice fields also save honge
amount: invoiceValue,
currency: formData.currency || "INR",

paymentTerms: formData.paymentTerms || "",
insuranceRequired: Boolean(formData.insuranceRequired),
exportIncentive: Boolean(formData.exportIncentive),

additionalInformation: {
  ...formData.additionalInformation,
},
};


    if (!currentId) {
      const response = await createShipment(shipmentPayload);

      const data = response.data?.data || response.data;

      currentId = data._id;

      if (!currentId) {
        throw new Error("Shipment ID was not returned by server");
      }

      setShipmentId(currentId);

      if (data.referenceNumber) {
        setReferenceNumber(data.referenceNumber);
      }
    } else {
      await updateShipment(currentId, shipmentPayload);
    }

    await updateShipmentStep2(currentId, step2Payload);

    await updateShipmentStep3(currentId, step3Payload);

    return currentId;
  };

  const handleSaveDraft = async () => {
    if (isNormalUser) return;
    setLoading(true);
    try {
      const id = await saveAllSteps();
      await saveDraft(id);
      setCurrentStatus("Draft");
      alert("Draft saved successfully!");
    } catch (err) {
      console.error("Save Draft Error:", err);
      alert(err.response?.data?.message || "Failed to save draft.");
    } finally {
      setLoading(false);
    }
  };

  const handleAnalyze = async () => {
    if (isNormalUser) return;
    setLoading(true);
    try {
      const id = await saveAllSteps();
      const res = await analyzeShipment(id);
      const data = res.data?.data || res.data;
      setAnalysis(data);
      setCurrentStatus("AI Analyzed");
      alert("Shipment analyzed successfully!");
    } catch (err) {
      console.error("Analyze Error:", err);
      alert(err.response?.data?.message || "Failed to analyze shipment.");
    } finally {
      setLoading(false);
    }
  };

  // Validate the complete shipment before allowing final submission.
  // Draft saving and document uploads remain available even when the form is incomplete.
  const validateShipmentBeforeSubmit = () => {
    const missing = [];
    const addRequired = (label, value) => {
      if (
        value === undefined ||
        value === null ||
        String(value).trim() === ""
      ) {
        missing.push(label);
      }
    };

    // Basic shipment details
    addRequired("Shipment Type", formData.shipmentType);
    addRequired("Shipment Mode", formData.shipmentMode);
    addRequired("Shipment Purpose", formData.shipmentPurpose);

    // Origin, destination and consignee
    addRequired("Origin Country", formData.route?.originCountry);
    addRequired("Origin City / Port / Airport", formData.route?.originCity);
    addRequired("Destination Country", formData.route?.destinationCountry);
    addRequired(
      "Destination City / Port / Airport",
      formData.route?.destinationCity,
    );
    addRequired("Consignee / Buyer Name", formData.importer?.companyName);
    addRequired("Consignee Address", formData.importer?.address);

    // Invoice and payment
    addRequired("Invoice Value", formData.amount);
    addRequired("Currency", formData.currency);
    addRequired("Payment Terms", formData.paymentTerms);
    if (
      formData.amount !== "" &&
      (!Number.isFinite(Number(formData.amount)) ||
        Number(formData.amount) <= 0)
    ) {
      missing.push("Invoice Value must be greater than 0");
    }

    // Product and cargo details
    addRequired("Product Name", formData.cargo?.productName);
    addRequired("Product Description", formData.cargo?.productDescription);
    addRequired("Product Category", formData.cargo?.category);
    addRequired("Quantity", formData.cargo?.quantity);
    addRequired("Unit", formData.cargo?.unit);
    addRequired(
      "Net Weight (Kg)",
      formData.cargo?.netWeight || formData.cargo?.weight,
    );
    addRequired("Gross Weight (Kg)", formData.cargo?.grossWeight);
    addRequired("No. of Packages", formData.cargo?.packages);
    addRequired("Packing Type", formData.cargo?.packingType);
    addRequired("Package Length", formData.cargo?.dimensions?.length);
    addRequired("Package Width", formData.cargo?.dimensions?.width);
    addRequired("Package Height", formData.cargo?.dimensions?.height);

    // Only documents explicitly marked required in Admin document settings are mandatory.
    const requiredDocumentFields = (documentsUploadConfig?.fields || []).filter(
      (field) => field.enabled !== false && field.required === true,
    );
    requiredDocumentFields.forEach((field, index) => {
      const key = normalizeDocumentName(
        field.key || field.label || `document-${index}`,
      );
      const label = field.label || "Required document";
      if (!uploadedDocs[key]) {
        const matchingDocument = Object.values(uploadedDocs).some(
          (doc) =>
            normalizeDocumentName(
              doc.documentName || doc.documentLabel || doc.name,
            ) === normalizeDocumentName(label),
        );
        if (!matchingDocument) missing.push(`${label} document`);
      }
    });

    return missing;
  };

  const handleSubmit = async () => {
    const missingFields = validateShipmentBeforeSubmit();
    if (missingFields.length > 0) {
      setValidationErrors(missingFields);
      setShowValidationModal(true);
      return;
    }

    setLoading(true);
    try {
      const id = await saveAllSteps();
      await submitShipment(id);
      setCurrentStatus("Submitted");
      if (isNormalUser) setSubmittedLocked(true);
      alert("Shipment submitted to admin successfully!");
      if (onSaved) onSaved();
    } catch (err) {
      console.error("Submit Error:", err);
      alert(err.response?.data?.message || "Failed to submit shipment.");
    } finally {
      setLoading(false);
    }
  };

  const handleDocumentUpload = async (documentKey, documentName, file) => {
    try {
      const id = await saveAllSteps();

      const form = new FormData();
      form.append("shipmentId", id);
      // Keep the configured document label as documentType for compatibility
      // with the existing shipment document upload backend.
      form.append("documentType", documentName);
      form.append("documentKey", documentKey);
      form.append("required", true);
      form.append("file", file);

      const res = await uploadShipmentDocument(form);

      setUploadedDocs((prev) => ({
        ...prev,
        [documentKey]: {
          ...res.data.data,
          resolvedFileUrl: getShipmentDocumentUrl(res.data.data?.fileUrl),
        },
      }));

      alert("Uploaded Successfully");
    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Upload Failed");
    }
  };

  const handleDeleteDocument = async (documentKey, document) => {
    if (!document?._id) {
      alert(
        "Document record ID is missing. Please refresh the shipment and try again.",
      );
      return;
    }
    const confirmed = window.confirm(
      "Are you sure you want to delete this uploaded document?",
    );
    if (!confirmed) return;

    try {
      setDeletingDocumentKey(documentKey);
      await deleteShipmentDocument(shipmentId, document._id);
      setUploadedDocs((prev) => {
        const next = { ...prev };
        delete next[documentKey];
        return next;
      });
      if (previewDocument?._id === document._id) setPreviewDocument(null);
      alert("Document deleted successfully.");
    } catch (error) {
      console.error("Delete shipment document failed:", error);
      alert(error?.response?.data?.message || "Unable to delete document.");
    } finally {
      setDeletingDocumentKey("");
    }
  };

  const handlePreviewDocument = (document, title, url) => {
    setPreviewDocument({
      ...document,
      title,
      url:
        document.resolvedFileUrl ||
        getShipmentDocumentUrl(
          document.fileUrl ||
            document.url ||
            document.documentUrl ||
            document.path,
        ) ||
        url,
    });
  };

  if (submittedLocked) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-5">
        <div className="w-full max-w-lg rounded-2xl border border-emerald-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <FiCheckCircle size={28} />
          </div>
          <h2 className="text-xl font-bold text-slate-900">Shipment Already Submitted</h2>
          <p className="mt-2 text-sm leading-6 text-slate-600">
            This shipment has already been submitted to Admin. You cannot reopen,
            edit, or update the submitted shipment form.
          </p>
          <p className="mt-3 text-xs font-semibold text-slate-500">
            Reference: {referenceNumber || "Submitted shipment"}
          </p>
          <button
            type="button"
            onClick={() => onSaved?.()}
            className="mt-6 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Back to Submitted Shipments
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-1 sm:p-1 lg:p-1 text-slate-800">
      <div className="max-w-[1620px] mx-auto">
        {/* TOP HEADER */}
        <Header
          setActiveTab={setActiveTab}
          setShipment={setShipment}
          handleSaveDraft={handleSaveDraft}
          handleAnalyze={handleAnalyze}
          handleSubmit={handleSubmit}
          loading={loading}
          currentTab={currentTab}
          currentStatus={currentStatus}
          accountType={accountType}
        />

        {/* FULL-WIDTH SHIPMENT FORM */}
        <div className="w-full">
          <div className="w-full space-y-6">
            <BasicShipmentDetails
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleNestedChange={handleNestedChange}
              referenceNumber={referenceNumber}
              config={shipmentFormConfig}
            />

            <OriginDestination
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleNestedChange={handleNestedChange}
              config={shipmentFormConfig}
            />

            <InvoiceValue
              formData={formData}
              handleDirectChange={handleDirectChange}
              handleRadioChange={handleRadioChange}
              config={shipmentFormConfig}
            />

            <DocumentsUpload
              uploadedDocs={uploadedDocs}
              handleDocumentUpload={handleDocumentUpload}
              fileInputRef={fileInputRef}
              config={documentsUploadConfig}
              loading={documentsSettingsLoading}
              loadError={documentsSettingsError}
              onRetry={() => fetchDocumentsSettings()}
              onPreview={handlePreviewDocument}
              onDelete={handleDeleteDocument}
              deletingDocumentKey={deletingDocumentKey}
            />
{accountType === "b2b" && (
  <AIOutputAnalysis analysis={analysis} />
)}

            <ProductDetails
              formData={formData}
              handleNestedChange={handleNestedChange}
              handleRadioChange={handleRadioChange}
              analysis={analysis}
              config={shipmentFormConfig}
            />
          </div>
        </div>

        <ShipmentValidationModal
          errors={showValidationModal ? validationErrors : []}
          onClose={() => setShowValidationModal(false)}
        />

        <DocumentPreviewModal
          document={previewDocument}
          onClose={() => setPreviewDocument(null)}
        />

        {/* FOOTER */}
        <Footer />
      </div>
    </div>
  );
}
