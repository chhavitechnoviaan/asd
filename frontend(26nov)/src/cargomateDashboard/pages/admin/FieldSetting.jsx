// import { useState } from "react";
// import { Pencil, Trash2 } from "lucide-react";
// import AddNewField from "./AddNewField";

// const Toggle = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={onChange}
//     className={`w-9 h-5 rounded-full flex items-center px-0.5 shrink-0 transition-colors ${
//       checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
//     }`}
//   >
//     <span className="w-4 h-4 bg-white rounded-full shadow" />
//   </button>
// );

// export default function FieldSettings({
//   validationVar,
//   currencyVar,
//   title,
//   subtitle,
//   titleUnderline = false,
//   fieldsBoxHeading,
//   fieldsBoxSubtext,
//   initialFields,
//   addButtonLabel = "Add new field",
//   sectionBoxHeading = "Field settings",
//   sectionBoxSubtext,
//   sectionTitlePlaceholder,
//   sectionDescPlaceholder,
//   highlightFieldsBox = false,
//   apiEndpoint = "/api/field-settings",
//   modalContext = "",
// }) {
//   const [fields, setFields] = useState(initialFields);
//   const [editingId, setEditingId] = useState(null);
//   const [editLabel, setEditLabel] = useState("");
//   const [showAddModal, setShowAddModal] = useState(false);
//   const [sectionTitle, setSectionTitle] = useState("");
//   const [sectionDesc, setSectionDesc] = useState("");

//   const toggleField = (id) => {
//     setFields((prev) => prev.map((f) => (f.id === id ? { ...f, enabled: !f.enabled } : f)));
//   };

//   const startEdit = (field) => {
//     setEditingId(field.id);
//     setEditLabel(field.label);
//   };

//   const saveEdit = (id) => {
//     setFields((prev) => prev.map((f) => (f.id === id ? { ...f, label: editLabel } : f)));
//     setEditingId(null);
//   };

//   const deleteField = (id) => {
//     setFields((prev) => prev.filter((f) => f.id !== id));
//   };

//   const handleAddField = (field) => {
//     setFields((prev) => [
//       ...prev,
//       { id: Date.now(), label: field.label || "New Field", type: field.type, enabled: field.required },
//     ]);
//     setShowAddModal(false);
//   };

//   const handleSave = async () => {
//     try {
//       await fetch(apiEndpoint, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ fields, sectionTitle, sectionDesc }),
//       });
//     } catch (err) {}
//   };

//   const handleReset = () => {
//     setFields(initialFields);
//     setSectionTitle("");
//     setSectionDesc("");
//   };

//   return (
//     <div className="w-full max-w-xl mx-auto bg-white rounded-2xl  p-4 sm:p-6">
//       <div className="flex items-center justify-between mb-6 gap-3">
//         <div>
//           <h2
//             className={`text-lg sm:text-xl font-bold text-gray-900 ${
//               titleUnderline ? "underline" : ""
//             }`}
//           >
//             {title}
//           </h2>
//           <p className="text-xs text-gray-500">{subtitle}</p>
//         </div>
//         <button
//           onClick={handleSave}
//           className="px-4 py-2 rounded-lg bg-green-600 text-white text-sm font-medium shrink-0"
//         >
//           Save Changes
//         </button>
//       </div>

//       <div
//         className={`border rounded-lg p-4 mb-4 ${
//           highlightFieldsBox ? "border-blue-400 ring-2 ring-blue-100" : "border-gray-200"
//         }`}
//       >
//         {fieldsBoxHeading && <p className="font-semibold text-gray-900 text-sm">{fieldsBoxHeading}</p>}
//         {fieldsBoxSubtext && <p className="text-xs text-gray-500 mb-3">{fieldsBoxSubtext}</p>}

//         <div className={`space-y-3 ${fieldsBoxHeading ? "mt-3" : ""}`}>
//           {fields.map((f) => (
//             <div key={f.id} className="flex items-center justify-between gap-2">
//               {editingId === f.id ? (
//                 <input
//                   value={editLabel}
//                   onChange={(e) => setEditLabel(e.target.value)}
//                   className="border border-gray-300 rounded-lg px-2 py-1 text-sm flex-1"
//                 />
//               ) : (
//                 <span className="text-sm text-gray-800">{f.label}</span>
//               )}
//               <div className="flex items-center gap-3 shrink-0">
//                 {f.type && (
//                   <span
//                     className={`text-sm font-medium ${f.typeColor || "text-blue-600"}`}
//                   >
//                     {f.type}
//                   </span>
//                 )}
//                 <Toggle checked={f.enabled} onChange={() => toggleField(f.id)} />
//                 {editingId === f.id ? (
//                   <button onClick={() => saveEdit(f.id)} className="text-xs text-green-600 font-medium">
//                     Save
//                   </button>
//                 ) : (
//                   <button onClick={() => startEdit(f)}>
//                     <Pencil className="w-4 h-4 text-gray-700" />
//                   </button>
//                 )}
//                 <button onClick={() => deleteField(f.id)}>
//                   <Trash2 className="w-4 h-4 text-red-500" />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-center mt-4">
//           <button
//             onClick={() => setShowAddModal(true)}
//             className="px-4 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600 w-full sm:w-auto"
//           >
//             {addButtonLabel}
//           </button>
//         </div>
//       </div>

//       <div className="border border-gray-200 rounded-lg p-4">
//         {sectionBoxHeading && (
//           <p className="font-semibold text-gray-900 text-sm">{sectionBoxHeading}</p>
//         )}
//         {sectionBoxSubtext && <p className="text-xs text-gray-500 mb-4">{sectionBoxSubtext}</p>}

//         <label className="block text-sm text-gray-700 mb-1 mt-3">Section Title</label>
//         <input
//           value={sectionTitle}
//           onChange={(e) => setSectionTitle(e.target.value)}
//           placeholder={sectionTitlePlaceholder}
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         />

//         <label className="block text-sm text-gray-700 mb-1">Section description (optional)</label>
//         <textarea
//           value={sectionDesc}
//           onChange={(e) => setSectionDesc(e.target.value)}
//           placeholder={sectionDescPlaceholder}
//           rows={3}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-600 mb-4"
//         />

//         <button onClick={handleReset} className="text-sm text-red-500 font-medium">
//           Reset To Default
//         </button>
//       </div>

//       {showAddModal && (
//         <AddNewField
//           validationVar={validationVar}
//           currencyVar={currencyVar}
//           placeVar={true}
//           context={modalContext}
//           onCancel={() => setShowAddModal(false)}
//           onSave={handleAddField}
//         />
//       )}
//     </div>
//   );
// }



// mahima code //
import { useEffect, useMemo, useState } from "react";
import {
  Pencil,
  Trash2,
  Plus,
  RotateCcw,
  Save,
  FileText,
  Search,
  X,
  Check,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { toast } from "react-toastify";
import API from "../../api/axios";
import AddNewField from "./AddNewField";

// Toggle component
const Toggle = ({ checked, onChange }) => (
  <button
    type="button"
    role="switch"
    aria-checked={checked}
    onClick={onChange}
    className={`relative w-11 h-6 rounded-full flex items-center transition-all duration-200 shrink-0 ${
      checked ? "bg-green-500" : "bg-gray-300"
    }`}
  >
    <span
      className={`absolute w-4 h-4 bg-white rounded-full shadow transition-all duration-200 ${
        checked ? "translate-x-6" : "translate-x-1"
      }`}
    />
  </button>
);

const createKey = (label) =>
  `${String(label || "document")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")}-${Date.now()}`;

const normalizeFields = (fields = []) =>
  fields.map((field, index) => ({
    ...field,
    id: field.id || field.key || `document-${index}`,
    key: field.key || field.id || createKey(field.label),
    label: field.label || "New Document",
    enabled: field.enabled !== false,
  }));

export default function FieldSettings({
  
  
  validationVar,
  currencyVar,
  title,
  subtitle,
  titleUnderline = false,
  fieldsBoxHeading,
  fieldsBoxSubtext,
  initialFields = [],
  addButtonLabel = "Add new field",
  sectionBoxHeading = "Field settings",
  sectionBoxSubtext,
  sectionTitlePlaceholder,
  sectionDescPlaceholder,
  highlightFieldsBox = false,
  apiEndpoint = "/settings/documents-upload-settings",
  modalContext = "",
}) {
  const [fields, setFields] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editLabel, setEditLabel] = useState("");
  const [showAddModal, setShowAddModal] = useState(false);

  const [sectionTitle, setSectionTitle] = useState(
    sectionTitlePlaceholder || ""
  );
  const [sectionDesc, setSectionDesc] = useState(
    sectionDescPlaceholder || ""
  );

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [resetting, setResetting] = useState(false);
  const [search, setSearch] = useState("");

  // Fetch settings from backend
  const fetchSettings = async () => {
    try {
      setLoading(true);

      const res = await API.get(apiEndpoint);
      // Supports { status, data }, { data: { data } }, and direct config responses.
      let data = res.data;
      data = data?.data ?? data;
      data = data?.data ?? data;
      data = data?.documentsUpload ?? data;

      if (data && Array.isArray(data.fields)) {
        setFields(normalizeFields(data.fields || []));
        setSectionTitle(data.sectionTitle || "");
        setSectionDesc(data.sectionDesc || "");
      }
    } catch (error) {
      console.error("Document settings fetch error:", error);
      toast.error(
        error.response?.data?.message ||
          "Unable to load document settings"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, [apiEndpoint]);

  // Toggle field
  const toggleField = (id) => {
    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, enabled: !field.enabled }
          : field
      )
    );
  };

  // Edit field
  const startEdit = (field) => {
    setEditingId(field.id);
    setEditLabel(field.label);
  };

  const saveEdit = (id) => {
    const label = editLabel.trim();

    if (!label) {
      toast.error("Document name cannot be empty");
      return;
    }

    setFields((prev) =>
      prev.map((field) =>
        field.id === id
          ? { ...field, label }
          : field
      )
    );

    setEditingId(null);
    setEditLabel("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditLabel("");
  };

  // Delete field
  const deleteField = (id) => {
    setFields((prev) => prev.filter((field) => field.id !== id));

    if (editingId === id) {
      cancelEdit();
    }

    toast.info("Document field removed. Save changes to confirm.");
  };

  // Add new field
  const handleAddField = (field) => {
    const label = String(field.label || "").trim();

    if (!label) {
      toast.error("Please enter document name");
      return;
    }

    const duplicate = fields.some(
      (item) => item.label.toLowerCase() === label.toLowerCase()
    );

    if (duplicate) {
      toast.error("This document field already exists");
      return;
    }

    const key = createKey(label);

    setFields((prev) => [
      ...prev,
      {
        id: key,
        key,
        label,
        enabled: true,
      },
    ]);

    setShowAddModal(false);
    toast.success("New document field added");
  };


  const handleSave = async () => {
    console.log("SAVE BUTTON CLICKED");
    if (!sectionTitle.trim()) {
      toast.error("Please enter section title");
      return;
    }
  
    if (fields.some((field) => !field.label.trim())) {
      toast.error("All document names are required");
      return;
    }
  
    try {
      setSaving(true);
  
      const payload = {
        sectionTitle: sectionTitle.trim(),
        sectionDesc: sectionDesc.trim(),
        fields: fields.map((field) => ({
          key: field.key,
          label: field.label.trim(),
          enabled: Boolean(field.enabled),
        })),
      };

      console.log("API BASE URL:", API.defaults.baseURL);
console.log("TOKEN:", localStorage.getItem("token"));
console.log("SAVE PAYLOAD:", payload);

const res = await API.put(apiEndpoint, payload);
  
      console.log("Sending document settings:", payload);
  
      
  
      console.log("Document settings response:", res.data);
  
      if (res.data?.status !== 1) {
        throw new Error(
          res.data?.message || "Document settings save failed"
        );
      }
  
      const savedData = res.data.data;
  
      setFields(normalizeFields(savedData.fields || []));
      setSectionTitle(savedData.sectionTitle || "");
      setSectionDesc(savedData.sectionDesc || "");
  
      toast.success("Document settings saved successfully");
  
    } catch (error) {
      console.error("DOCUMENT SAVE ERROR:", error);
      console.error("SERVER RESPONSE:", error.response?.data);
  
      toast.error(
        error.response?.data?.message ||
        error.message ||
        "Failed to save document settings"
      );
    } finally {
      setSaving(false);
    }
  };

  
  // Reset settings
  const handleReset = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to reset document settings to default?"
    );

    if (!confirmed) return;

    try {
      setResetting(true);

      const res = await API.post(`${apiEndpoint}/reset`);

      const data = res.data?.data;

      if (data) {
        setFields(normalizeFields(data.fields || []));
        setSectionTitle(data.sectionTitle || "");
        setSectionDesc(data.sectionDesc || "");
      }

      setEditingId(null);
      setEditLabel("");

      toast.success(
        res.data?.message || "Document settings reset successfully"
      );
    } catch (error) {
      console.error("Document settings reset error:", error);
      toast.error(
        error.response?.data?.message || "Unable to reset settings"
      );
    } finally {
      setResetting(false);
    }
  };

  const activeCount = useMemo(
    () => fields.filter((field) => field.enabled).length,
    [fields]
  );

  const filteredFields = useMemo(
    () =>
      fields.filter((field) =>
        field.label.toLowerCase().includes(search.toLowerCase())
      ),
    [fields, search]
  );

  return (
    <div className="w-full min-h-full bg-gray-50/70 px-3 py-5 sm:px-6 sm:py-7">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center">
                <FileText size={21} />
              </div>

              <div>
                <h2
                  className={`text-xl sm:text-2xl font-bold text-gray-900 ${
                    titleUnderline ? "underline" : ""
                  }`}
                >
                  {title}
                </h2>

                <p className="text-sm text-gray-500 mt-0.5">
                  {subtitle}
                </p>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold shadow-sm transition-all disabled:opacity-60"
          >
            {saving ? (
              <Loader2 size={17} className="animate-spin" />
            ) : (
              <Save size={17} />
            )}

            {saving ? "Saving..." : "Save Changes"}
          </button>
        </div>

        {/* Shared configuration notice */}
        <div className="mb-5 flex items-start gap-3 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3">
          <AlertCircle size={18} className="mt-0.5 shrink-0 text-blue-600" />
          <div>
            <p className="text-sm font-semibold text-blue-900">
              Shared document requirements
            </p>
            <p className="mt-0.5 text-xs leading-relaxed text-blue-800">
              Changes saved here apply to all B2B and Normal User shipment forms.
              Enabled document fields will be shown to both user types.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">
              Total Document Fields
            </p>
            <p className="text-2xl font-bold text-gray-900 mt-1">
              {fields.length}
            </p>
          </div>

          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <p className="text-xs text-gray-500 font-medium">
              Active Documents
            </p>
            <p className="text-2xl font-bold text-green-600 mt-1">
              {activeCount}
            </p>
          </div>
        </div>

        {/* Document fields card */}
        <div
          className={`bg-white border rounded-2xl p-4 sm:p-6 mb-5 shadow-sm ${
            highlightFieldsBox
              ? "border-teal-300 ring-2 ring-teal-50"
              : "border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div>
              <h3 className="text-base font-bold text-gray-900">
                {fieldsBoxHeading}
              </h3>

              {fieldsBoxSubtext && (
                <p className="text-xs text-gray-500 mt-1">
                  {fieldsBoxSubtext}
                </p>
              )}
            </div>

            <div className="relative w-full sm:w-56">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search documents..."
                className="w-full pl-9 pr-3 py-2.5 text-sm border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-teal-100 focus:border-teal-400"
              />
            </div>
          </div>

          {/* Table heading */}
          <div className="hidden sm:grid grid-cols-[1fr_90px_90px] gap-4 px-4 py-3 bg-gray-50 rounded-lg text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <span>Document Name</span>
            <span className="text-center">Status</span>
            <span className="text-center">Actions</span>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="py-12 flex flex-col items-center justify-center text-gray-400">
              <Loader2 size={28} className="animate-spin text-teal-500" />
              <p className="text-sm mt-3">Loading document settings...</p>
            </div>
          ) : filteredFields.length === 0 ? (
            <div className="py-12 text-center">
              <AlertCircle
                size={28}
                className="mx-auto text-gray-300"
              />
              <p className="text-sm text-gray-500 mt-3">
                {fields.length === 0
                  ? "No document fields added yet"
                  : "No matching documents found"}
              </p>
            </div>
          ) : (
            <div className="divide-y divide-gray-100">
              {filteredFields.map((field, index) => (
                <div
                  key={field.id}
                  className="grid grid-cols-1 sm:grid-cols-[1fr_90px_90px] gap-3 sm:gap-4 items-center px-3 sm:px-4 py-4 hover:bg-gray-50/70 transition-colors"
                >
                  {/* Name */}
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 shrink-0 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                      <FileText size={17} />
                    </div>

                    {editingId === field.id ? (
                      <input
                        autoFocus
                        value={editLabel}
                        onChange={(e) => setEditLabel(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveEdit(field.id);
                          if (e.key === "Escape") cancelEdit();
                        }}
                        className="flex-1 min-w-0 border border-teal-400 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-100"
                      />
                    ) : (
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-800 break-words">
                          {field.label}
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Document {index + 1}
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Toggle */}
                  <div className="flex items-center justify-between sm:justify-center">
                    <span className="sm:hidden text-xs text-gray-500">
                      Visibility
                    </span>

                    <div className="flex items-center gap-2">
                      <Toggle
                        checked={field.enabled}
                        onChange={() => toggleField(field.id)}
                      />

                      <span
                        className={`hidden sm:inline text-xs font-medium ${
                          field.enabled
                            ? "text-green-600"
                            : "text-gray-400"
                        }`}
                      >
                        {field.enabled ? "Active" : "Hidden"}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between sm:justify-center gap-3">
                    <span className="sm:hidden text-xs text-gray-500">
                      Actions
                    </span>

                    <div className="flex items-center gap-2">
                      {editingId === field.id ? (
                        <>
                          <button
                            type="button"
                            onClick={() => saveEdit(field.id)}
                            title="Save label"
                            className="w-8 h-8 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 flex items-center justify-center"
                          >
                            <Check size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={cancelEdit}
                            title="Cancel"
                            className="w-8 h-8 rounded-lg bg-gray-100 text-gray-500 hover:bg-gray-200 flex items-center justify-center"
                          >
                            <X size={16} />
                          </button>
                        </>
                      ) : (
                        <button
                          type="button"
                          onClick={() => startEdit(field)}
                          title="Edit document"
                          className="w-8 h-8 rounded-lg text-gray-500 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-center transition-colors"
                        >
                          <Pencil size={17} />
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() => deleteField(field.id)}
                        title="Delete document"
                        className="w-8 h-8 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 flex items-center justify-center transition-colors"
                      >
                        <Trash2 size={17} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add field */}
          <div className="flex justify-center border-t border-gray-100 pt-5 mt-2">
            <button
              type="button"
              onClick={() => setShowAddModal(true)}
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-600 text-white text-sm font-semibold transition-all disabled:opacity-50"
            >
              <Plus size={18} />
              {addButtonLabel}
            </button>
          </div>
        </div>

        {/* Section settings */}
        {/* <div className="bg-white border border-gray-200 rounded-2xl p-4 sm:p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-base font-bold text-gray-900">
              {sectionBoxHeading}
            </h3>

            {sectionBoxSubtext && (
              <p className="text-xs text-gray-500 mt-1">
                {sectionBoxSubtext}
              </p>
            )}
          </div>

          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Title
              </label>

              <input
                type="text"
                value={sectionTitle}
                onChange={(e) => setSectionTitle(e.target.value)}
                placeholder={sectionTitlePlaceholder}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Section Description
                <span className="text-gray-400 font-normal ml-1">
                  (Optional)
                </span>
              </label>

              <textarea
                value={sectionDesc}
                onChange={(e) => setSectionDesc(e.target.value)}
                placeholder={sectionDescPlaceholder}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-700 outline-none focus:border-teal-400 focus:ring-2 focus:ring-teal-50 resize-y transition-all"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 mt-6 pt-5">
            <div>
              <p className="text-sm font-medium text-gray-800">
                Restore default settings
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Restore the original document fields and section details.
              </p>
            </div>

            <button
              type="button"
              onClick={handleReset}
              disabled={resetting || loading}
              className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-red-500 hover:text-red-600 disabled:opacity-50"
            >
              {resetting ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <RotateCcw size={16} />
              )}

              {resetting ? "Resetting..." : "Reset To Default"}
            </button>
          </div>
        </div> */}
      </div>

      {/* Add Field Modal */}
      {showAddModal && (
        <AddNewField
          validationVar={validationVar}
          currencyVar={currencyVar}
          placeVar={true}
          context={modalContext}
          onCancel={() => setShowAddModal(false)}
          onSave={handleAddField}
        />
      )}
    </div>
  );
}