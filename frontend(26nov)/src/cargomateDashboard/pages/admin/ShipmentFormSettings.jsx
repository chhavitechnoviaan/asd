


// code ui //

import { useEffect, useMemo, useState } from "react";
import { createPortal } from "react-dom";
import {
  Plus, Pencil, Trash2, Save, RotateCcw, X, ChevronDown,
  Settings2, Type, List, CheckCircle2, AlertCircle,
  GripVertical, Package, Search, Eye
} from "lucide-react";

const API_URL = `${import.meta.env.VITE_API_URL}/settings/shipment-form`;

const getAuthToken = () => {
  const storageKeys = [
    "token",
    "accessToken",
    "authToken",
    "cargomate-session",
  ];

  const storages = [localStorage, sessionStorage];

  for (const storage of storages) {
    for (const key of storageKeys) {
      const raw = storage.getItem(key);

      if (!raw) continue;

      let token = raw.trim();

      try {
        const parsed = JSON.parse(token);

        if (typeof parsed === "string") {
          token = parsed.trim();
        } else if (parsed && typeof parsed === "object") {
          token =
            parsed.token ||
            parsed.accessToken ||
            parsed.access_token ||
            parsed.jwt ||
            parsed.data?.token ||
            parsed.user?.token ||
            "";
        }
      } catch {
        // Value is already a plain string
      }

      token = String(token)
        .replace(/^Bearer\s+/i, "")
        .trim();

      if (token) return token;
    }
  }

  return "";
};

const getAuthHeaders = (includeJson = true) => {
  const token = getAuthToken();

  return {
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(includeJson ? { "Content-Type": "application/json" } : {}),
  };
};  

const defaultFields = [
  { key: "shipmentType", label: "Shipment Type", useDropdown: true, options: ["Export", "Import", "Re-export"] },
  { key: "shipmentMode", label: "Shipment Mode", useDropdown: true, options: ["Air", "Sea", "Road", "Rail"] },
  { key: "shipmentPurpose", label: "Shipment Purpose", useDropdown: true, options: ["Commercial", "Sample", "Personal"] },
  { key: "originCountry", label: "Origin Country", useDropdown: true, options: ["India", "China", "USA"] },
  { key: "destinationCountry", label: "Destination Country", useDropdown: true, options: ["India", "Singapore", "Dubai"] },
  { key: "incoterm", label: "Incoterm", useDropdown: true, options: ["FOB", "CIF", "EXW"] },
  { key: "productCategory", label: "Product Category", useDropdown: true, options: ["Electronics", "Textiles", "General"] },
  { key: "quantityUnit", label: "Quantity Unit", useDropdown: true, options: ["PCS", "KG", "BOX"] },
  { key: "dimensionUnit", label: "Dimension Unit", useDropdown: true, options: ["CM", "INCH"] },
  { key: "packingType", label: "Packing Type", useDropdown: true, options: ["Carton", "Pallet", "Wooden Crate"] },
  { key: "currency", label: "Currency", useDropdown: true, options: ["USD", "INR", "EUR"] },
  { key: "paymentTerms", label: "Payment Terms", useDropdown: true, options: ["Advance", "LC", "Net 30"] },
  { key: "companyName", label: "Customer / Company Name", useDropdown: false, options: [] },
  { key: "contactPerson", label: "Contact Person", useDropdown: false, options: [] },
];

const defaultSection = {
  title: "Basic Shipment Details",
  description: "General shipment classification and exporter contact",
  fields: defaultFields,
};

const removeDuplicateFields = (fields = []) => {
  const seenKeys = new Set();
  const seenLabels = new Set();

  return fields.filter((field) => {
    const key = String(field?.key || "").trim().toLowerCase();
    const label = String(field?.label || "").trim().toLowerCase();

    if (!key || seenKeys.has(key) || (label && seenLabels.has(label))) {
      return false;
    }

    seenKeys.add(key);
    if (label) seenLabels.add(label);

    return true;
  });
};

const slugify = (value) =>
  value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_|_$/g, "");

const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    onClick={() => onChange(!checked)}
    role="switch"
    aria-checked={checked}
    className={`relative w-11 h-6 rounded-full transition-all duration-200 ${
      checked ? "bg-[#0D9488]" : "bg-slate-300"
    }`}
  >
    <span
      className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow-sm transition-all ${
        checked ? "left-6" : "left-1"
      }`}
    />
  </button>
);

function FieldModal({ field, onClose, onSave }) {
  const [label, setLabel] = useState(field?.label || "");
  const [useDropdown, setUseDropdown] = useState(field?.useDropdown ?? true);
  const [options, setOptions] = useState((field?.options || []).join("\n"));
  const [error, setError] = useState("");

  const parsedOptions = [...new Set(
    options.split("\n").map((item) => item.trim()).filter(Boolean)
  )];

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!label.trim()) {
      setError("Please enter a field name.");
      return;
    }

    if (useDropdown && !parsedOptions.length) {
      setError("Please add at least one dropdown option.");
      return;
    }

    onSave({
      ...field,
      key: field?.key || slugify(label),
      label: label.trim(),
      useDropdown,
      options: useDropdown ? parsedOptions : [],
    });
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/60 backdrop-blur-md p-3 sm:p-5"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="shipment-field-modal-title"
        className="flex max-h-[min(82vh,760px)] w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/70 bg-white shadow-[0_24px_80px_rgba(15,23,42,0.28)]"
      >
        {/* Modal header */}
        <div className="relative overflow-hidden border-b border-slate-100 bg-gradient-to-r from-[#F0FDFA] via-white to-[#F8FAFC] px-5 py-5 sm:px-7 sm:py-6">
          <div className="absolute -right-8 -top-12 h-36 w-36 rounded-full bg-teal-100/60 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#0D9488] text-white shadow-lg shadow-teal-700/20">
                {field ? <Pencil size={21} /> : <Plus size={23} />}
              </div>
              <div className="min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#0D9488]">
                  Shipment form configuration
                </p>
                <h3 id="shipment-field-modal-title" className="mt-1 text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                  {field ? "Edit dropdown field" : "Add new field"}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-slate-500 sm:text-sm">
                  Update the field label and control how users enter this information.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close modal"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white/90 text-slate-500 transition hover:border-rose-200 hover:bg-rose-50 hover:text-rose-600"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex min-h-0 flex-1 flex-col">
          <div className="min-h-0 space-y-5 overflow-y-auto overscroll-contain px-5 py-4 sm:px-7 sm:py-5">
            {/* Field label */}
            <div>
              <div className="mb-2 flex items-center justify-between gap-3">
                <label htmlFor="shipment-field-label" className="text-sm font-semibold text-slate-800">
                  Field name <span className="text-rose-500">*</span>
                </label>
                {field?.key && (
                  <span className="rounded-lg bg-slate-100 px-2.5 py-1 font-mono text-[10px] text-slate-500">
                    {field.key}
                  </span>
                )}
              </div>
              <input
                id="shipment-field-label"
                value={label}
                onChange={(event) => {
                  setLabel(event.target.value);
                  if (error) setError("");
                }}
                placeholder="e.g. Origin Country"
                autoFocus
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-[#0D9488] focus:bg-white focus:ring-4 focus:ring-teal-500/10"
              />
            </div>

            {/* Input type */}
            <div>
              <div className="mb-3">
                <p className="text-sm font-semibold text-slate-800">Input type</p>
                <p className="mt-1 text-xs text-slate-500">Choose how this field should appear on the shipment form.</p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={() => setUseDropdown(false)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                    !useDropdown
                      ? "border-[#0D9488] bg-teal-50/70 ring-2 ring-teal-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    !useDropdown ? "bg-[#0D9488] text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <Type size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-800">Text input</span>
                    <span className="mt-0.5 block text-xs text-slate-500">User types their own value</span>
                  </span>
                  <span className={`h-4 w-4 rounded-full border-2 ${
                    !useDropdown ? "border-[#0D9488] bg-[#0D9488] shadow-[inset_0_0_0_3px_white]" : "border-slate-300"
                  }`} />
                </button>

                <button
                  type="button"
                  onClick={() => setUseDropdown(true)}
                  className={`flex items-center gap-3 rounded-2xl border p-4 text-left transition ${
                    useDropdown
                      ? "border-[#0D9488] bg-teal-50/70 ring-2 ring-teal-500/10"
                      : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                  }`}
                >
                  <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                    useDropdown ? "bg-[#0D9488] text-white" : "bg-slate-100 text-slate-500"
                  }`}>
                    <List size={19} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-semibold text-slate-800">Dropdown</span>
                    <span className="mt-0.5 block text-xs text-slate-500">User selects from your options</span>
                  </span>
                  <span className={`h-4 w-4 rounded-full border-2 ${
                    useDropdown ? "border-[#0D9488] bg-[#0D9488] shadow-[inset_0_0_0_3px_white]" : "border-slate-300"
                  }`} />
                </button>
              </div>
            </div>

            {/* Dropdown options */}
            {useDropdown && (
              <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4 sm:p-5">
                <div className="mb-3 flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-slate-800">Dropdown options</p>
                    <p className="mt-1 text-xs text-slate-500">Add one option per line. Empty lines will be ignored.</p>
                  </div>
                  <span className="shrink-0 rounded-full border border-teal-100 bg-white px-2.5 py-1 text-[10px] font-semibold text-[#0D9488]">
                    {parsedOptions.length} options
                  </span>
                </div>
                <textarea
                  value={options}
                  onChange={(event) => {
                    setOptions(event.target.value);
                    if (error) setError("");
                  }}
                  rows={6}
                  placeholder={"India\nChina\nUnited States"}
                  className="w-full resize-y rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0D9488] focus:ring-4 focus:ring-teal-500/10"
                />
                {parsedOptions.length > 0 && (
                  <div className="mt-4">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">Preview</p>
                    <div className="flex flex-wrap gap-2">
                      {parsedOptions.slice(0, 12).map((option) => (
                        <span key={option} className="inline-flex max-w-full items-center rounded-lg border border-teal-100 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
                          {option}
                        </span>
                      ))}
                      {parsedOptions.length > 12 && (
                        <span className="rounded-lg bg-slate-200/70 px-2.5 py-1.5 text-xs font-semibold text-slate-600">
                          +{parsedOptions.length - 12} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {error && (
              <div className="flex items-start gap-2.5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
                <AlertCircle size={17} className="mt-0.5 shrink-0" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Sticky footer */}
          <div className="flex flex-col-reverse gap-2 border-t border-slate-100 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
            <p className="text-[11px] text-slate-400">
              {field ? "Your existing field key will remain unchanged." : "The field key will be generated from its name."}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-teal-700/15 transition hover:bg-[#0A8981] focus:outline-none focus:ring-4 focus:ring-teal-500/20 sm:flex-none"
              >
                <Save size={16} />
                {field ? "Save changes" : "Add field"}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}

export default function ShipmentFormSettings() {
  const [section, setSection] = useState(defaultSection);
  const [showModal, setShowModal] = useState(false);
  const [editingField, setEditingField] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [search, setSearch] = useState("");
  const [notice, setNotice] = useState({ type: "", message: "" });

  const filteredFields = useMemo(
    () => section.fields.filter((field) =>
      field.label.toLowerCase().includes(search.toLowerCase())
    ),
    [section.fields, search]
  );

  const showNotice = (type, message) => {
    setNotice({ type, message });
    window.setTimeout(() => setNotice({ type: "", message: "" }), 3500);
  };

  const loadSettings = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: getAuthHeaders(),
      });

      if (!response.ok) throw new Error("Unable to load shipment settings.");

      const result = await response.json();
      const savedSection = result.data?.sections?.[0];

      if (savedSection) {
        setSection({
          ...defaultSection,
          ...savedSection,
          fields: removeDuplicateFields(savedSection.fields || []),
        });
      }
    } catch (error) {
      console.error("Shipment settings fetch:", error);
      showNotice("error", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSettings();
  }, []);

  const saveField = (field) => {
    setSection((prev) => {
      const exists = prev.fields.some((item) => item.key === field.key);

      return {
        ...prev,
        fields: exists
          ? prev.fields.map((item) =>
              item.key === field.key ? field : item
            )
          : [...prev.fields, field],
      };
    });

    setShowModal(false);
    setEditingField(null);
  };

  const deleteField = (key) => {
    if (!window.confirm("Are you sure you want to delete this field?")) return;

    setSection((prev) => ({
      ...prev,
      fields: prev.fields.filter((field) => field.key !== key),
    }));
  };
  const handleSave = async () => {
    setSaving(true);
  
    try {
      const cleanedSection = {
        ...section,
        fields: removeDuplicateFields(section.fields || []),
      };
  
      const response = await fetch(API_URL, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          sections: [cleanedSection],
        }),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Failed to save settings.");
      }
  
      const savedSection = result.data?.sections?.[0];
  
      if (savedSection) {
        setSection({
          ...savedSection,
          fields: removeDuplicateFields(savedSection.fields || []),
        });
      } else {
        // If API does not return the saved section, keep cleaned data.
        setSection(cleanedSection);
      }
  
      showNotice("success", "Shipment form settings saved successfully!");
    } catch (error) {
      console.error("Shipment settings save:", error);
      showNotice("error", error.message || "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  const handleReset = async () => {
    if (!window.confirm("Reset all shipment form settings to default?")) return;

    setResetting(true);
    try {
      const response = await fetch(`${API_URL}/reset`, {
        method: "POST",
        credentials: "include",
        headers: getAuthHeaders(false),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to reset settings.");
      }

      const savedSection = result.data?.sections?.[0];
      setSection(savedSection || defaultSection);
      showNotice("success", "Default settings restored successfully!");
    } catch (error) {
      showNotice("error", error.message);
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="w-full min-h-full bg-transparent p-0">
      <div className="w-full space-y-5">

        {/* Settings parent already renders the teal gradient page header.
            Keep this section header light to avoid a duplicate banner. */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 rounded-2xl border border-teal-100 bg-white px-5 py-5 sm:px-6 shadow-sm">
          <div className="flex items-center gap-3 min-w-0">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-teal-50 text-[#0D9488] border border-teal-100">
              <Package size={22} />
            </span>
            <div className="min-w-0">
              <p className="text-[10px] font-bold uppercase tracking-[1.8px] text-[#0D9488]">Admin Configuration</p>
              <h2 className="text-lg sm:text-xl font-bold text-[#002259] mt-0.5">Shipment Form Settings</h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">Customize fields displayed on your shipment form.</p>
            </div>
          </div>
          <button type="button" onClick={handleSave} disabled={saving || loading}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#0D9488] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0A8981] shadow-sm transition disabled:opacity-50">
            <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Notifications */}
        {notice.message && (
          <div className={`flex items-center gap-2 rounded-xl px-4 py-3 text-sm border ${
            notice.type === "success"
              ? "bg-teal-50 border-teal-200 text-teal-700"
              : "bg-red-50 border-red-200 text-red-700"
          }`}>
            {notice.type === "success" ? <CheckCircle2 size={17} /> : <AlertCircle size={17} />}
            {notice.message}
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Total Fields</p>
            <p className="text-2xl font-bold text-slate-900 mt-1">{section.fields.length}</p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4">
            <p className="text-xs text-slate-500">Dropdown Fields</p>
            <p className="text-2xl font-bold text-[#0D9488] mt-1">
              {section.fields.filter((f) => f.useDropdown).length}
            </p>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 p-4 col-span-2 sm:col-span-1">
            <p className="text-xs text-slate-500">Text Fields</p>
            <p className="text-2xl font-bold text-teal-600 mt-1">
              {section.fields.filter((f) => !f.useDropdown).length}
            </p>
          </div>
        </div>

        {/* Main Configuration */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-5 sm:p-6 border-b border-slate-100">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <Settings2 size={19} className="text-[#0D9488]" />
                  <h2 className="font-bold text-slate-900">Section Configuration</h2>
                </div>
                <p className="text-xs text-slate-500 mt-1">
                  Manage your shipment form section and its fields.
                </p>
              </div>
              {/* <button
                onClick={() => {
                  setEditingField(null);
                  setShowModal(true);
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#0D9488] text-white text-sm font-semibold hover:bg-[#0A8981] shadow-md shadow-teal-600/15"
              >
                <Plus size={17} /> Add New Field
              </button> */}
            </div>

            {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Section Title
                </label>
                <input
                  value={section.title}
                  onChange={(e) => setSection({ ...section, title: e.target.value })}
                  placeholder="Enter section title"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-2">
                  Section Description
                </label>
                <input
                  value={section.description || ""}
                  onChange={(e) => setSection({ ...section, description: e.target.value })}
                  placeholder="Enter a short description"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:border-teal-500 outline-none text-sm"
                />
              </div>
            </div> */}
          </div>

          {/* Fields */}
          <div className="p-5 sm:p-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <div>
                <h3 className="font-bold text-slate-900">Field Management</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Configure the input type and available options.
                </p>
              </div>
              <div className="relative">
                <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search fields..."
                  className="pl-9 pr-3 py-2.5 w-full sm:w-56 rounded-xl border border-slate-200 text-xs outline-none focus:border-teal-400"
                />
              </div>
            </div>

            {loading ? (
              <div className="py-16 text-center text-sm text-slate-500">
                Loading shipment settings...
              </div>
            ) : filteredFields.length === 0 ? (
              <div className="py-14 text-center border border-dashed border-slate-200 rounded-xl">
                <Package className="mx-auto text-slate-300 mb-2" size={30} />
                <p className="text-sm font-semibold text-slate-700">No fields found</p>
                <p className="text-xs text-slate-400 mt-1">Add a new field to get started.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredFields.map((field, index) => (
                  <div
                    key={field.key}
                    className="group border border-slate-200 rounded-xl p-4 hover:border-teal-200 hover:shadow-sm transition-all"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center shrink-0">
                          <GripVertical size={17} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-slate-800 truncate">
                            {field.label}
                          </p>
                          <p className="text-[11px] text-slate-400 mt-1">
                            Field {String(index + 1).padStart(2, "0")} · {field.key}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between sm:justify-end gap-3">
                        <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold ${
                          field.useDropdown
                            ? "bg-teal-50 text-[#087F79]"
                            : "bg-teal-50 text-teal-700"
                        }`}>
                          {field.useDropdown ? <List size={13} /> : <Type size={13} />}
                          {field.useDropdown ? "Dropdown" : "Text Input"}
                        </span>

                        <button
                          onClick={() => {
                            setEditingField(field);
                            setShowModal(true);
                          }}
                          title="Edit field"
                          className="p-2 rounded-lg text-slate-500 hover:text-[#0D9488] hover:bg-teal-50"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          onClick={() => deleteField(field.key)}
                          title="Delete field"
                          className="p-2 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {field.useDropdown && (
                      <div className="mt-3 ml-12 flex flex-wrap gap-2">
                        {(field.options || []).map((option) => (
                          <span
                            key={option}
                            className="px-2.5 py-1 rounded-md bg-slate-50 border border-slate-200 text-[11px] text-slate-600"
                          >
                            {option}
                          </span>
                        ))}
                        {(!field.options || !field.options.length) && (
                          <span className="text-xs text-amber-600">No options configured</span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="px-5 sm:px-6 py-4 bg-slate-50 border-t border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs text-slate-500">
              Changes will apply to the shipment form after saving.
            </p>
            <button
              onClick={handleReset}
              disabled={resetting || loading}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-600 hover:text-red-700 disabled:opacity-50"
            >
              <RotateCcw size={15} />
              {resetting ? "Resetting..." : "Reset To Default"}
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6">
          <div className="flex items-center gap-2 mb-4">
            <Eye size={18} className="text-[#0D9488]" />
            <h3 className="font-bold text-slate-900">Form Preview</h3>
          </div>
          <div className="rounded-xl bg-slate-50 border border-slate-200 p-4 sm:p-5">
            <h4 className="text-sm font-bold text-slate-800">{section.title}</h4>
            {section.description && (
              <p className="text-xs text-slate-500 mt-1">{section.description}</p>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-5">
              {section.fields.filter((field) => field.enabled !== false).map((field) => (
                <div key={field.key}>
                  <label className="block text-xs font-semibold text-slate-600 mb-2">
                    {field.label}
                  </label>
                  {field.useDropdown ? (
                    <div className="flex items-center justify-between px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
                      Select {field.label}
                      <ChevronDown size={15} />
                    </div>
                  ) : (
                    <div className="px-3 py-2.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-400">
                      Enter {field.label}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {showModal && (
        <FieldModal
          field={editingField}
          onClose={() => {
            setShowModal(false);
            setEditingField(null);
          }}
          onSave={saveField}
        />
      )}
    </div>
  );
}