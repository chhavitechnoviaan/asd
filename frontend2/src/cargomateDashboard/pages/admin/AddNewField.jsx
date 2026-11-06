// import { useState } from "react";

// const Toggle = ({ checked, onChange }) => (
//   <button
//     type="button"
//     onClick={onChange}
//     className={`w-9 h-5 rounded-full flex items-center px-0.5 transition-colors ${
//       checked ? "bg-green-500 justify-end" : "bg-gray-300 justify-start"
//     }`}
//   >
//     <span className="w-4 h-4 bg-white rounded-full shadow" />
//   </button>
// );

// export default function AddNewField({validationVar, currencyVar, optionsVar, placeVar, context = "", onCancel, onSave }) {
//   const [label, setLabel] = useState("");
//   const [type, setType] = useState("Currency");
//   const [required, setRequired] = useState(true);
//   const [showInSummary, setShowInSummary] = useState(true);
//   const [showInPdf, setShowInPdf] = useState(true);
//   const [place,setPlace] = useState("")
//     const [options, setOptions] = useState("");
//   const [currency, setCurrency] = useState("")
//   const [validation, setValidation] = useState("")
  
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const field = { label, type, required, showInSummary, showInPdf };
//     try {
//       await fetch("/api/fields", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(field),
//       });
//     } catch (err) {}
//     if (onSave) onSave(field);
//   };

//   return (
//     <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-white rounded-2xl shadow-xl p-5 sm:p-6 w-full max-w-sm"
//       >
//         <h3 className="text-lg font-bold text-gray-900 mb-1">
//           Add New Field {context && <span className="text-gray-500 font-normal ">({context})</span>}
//         </h3>
//         <p className="text-sm text-gray-500 mb-4">Field Properties</p>
//         <p className="text-xs text-gray-400 -mt-3 mb-4">Configure selected field properties</p>

//         <label className="block text-sm text-gray-700 mb-1">Field Label</label>
//         <input
//           value={label}
//           onChange={(e) => setLabel(e.target.value)}
//           placeholder="Task Name"
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         />

//         <label className="block text-sm text-gray-700 mb-1">Field Type</label>
//         <select
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         >
//           <option>Currency</option>
//           <option>Number</option>
//           <option>Text</option>
//           <option>Dropdown</option>
//           <option>Score</option>
//         </select>

//         <div className="flex items-center justify-between mb-4">
//           <span className="text-sm text-gray-700">Required Field</span>
//         </div>
//         <div className="flex items-center gap-2 mb-4">
//           <Toggle checked={required} onChange={() => setRequired((v) => !v)} />
//           <span className="text-sm text-gray-500">Yes, this field is required</span>
//         </div>

//       {placeVar && ( <div>
//          <label className="block text-sm text-gray-700 mb-1">Place holder</label>
//         <input
//           value={place}
//           onChange={(e) => setPlace(e.target.value)}
//           placeholder="Enter task name"
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         /></div>
//         )}

//       {optionsVar && ( 
//          <div className="w-full">
//               <label className="block text-sm   text-gray-800 mb-2">
//                 Options (one per line)
//               </label>
//               <textarea
//                 rows={4}
//                 value={options}
//                 onChange={(e) => setOptions(e.target.value)}
//                 placeholder={`Export Import Domestic`}
//                 className="w-full rounded-2xl border border-gray-300 px-4 py-3 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
//               />
//             </div> )}
        
//         {currencyVar && (
//             <div>
//          <label className="block text-sm text-gray-700 mb-1">Currency</label>
//         <input
//           value={currency}
//           onChange={(e) => setCurrency(e.target.value)}
//           placeholder="INR"
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         /></div>

//         )}

//        { validationVar && (
//            <div>
//          <label className="block text-sm text-gray-700 mb-1">Validation</label>
//         <input
//           value={validation}
//           onChange={(e) => setValidation(e.target.value)}
//           placeholder="Select validation"
//           className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 mb-4"
//         /></div>
//        )}
//         <label className="flex items-center gap-2 mb-2">
//           <input
//             type="checkbox"
//             checked={showInSummary}
//             onChange={() => setShowInSummary((v) => !v)}
//             className="w-4 h-4 accent-green-600"
//           />
//           <span className="text-sm text-gray-700">Show in Summary</span>
//         </label>
//         <label className="flex items-center gap-2 mb-6">
//           <input
//             type="checkbox"
//             checked={showInPdf}
//             onChange={() => setShowInPdf((v) => !v)}
//             className="w-4 h-4 accent-green-600"
//           />
//           <span className="text-sm text-gray-700">Show in PDF/Print</span>
//         </label>

//         <div className="flex justify-end gap-3">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-5 py-2 rounded-lg bg-teal-500 text-white text-sm hover:bg-teal-600"
//           >
//             Update field
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// }

// mahima code // 

import { useState } from "react";
import {
  X,
  FileText,
  Plus,
  Check,
  AlertCircle,
  List,
  Settings2,
} from "lucide-react";

export default function AddNewField({
  validationVar,
  currencyVar,
  optionsVar,
  placeVar,
  context = "",
  onCancel,
  onSave,
}) {
  const isDocumentContext = context === "documents";

  const [label, setLabel] = useState("");
  const [type, setType] = useState("Currency");
  const [required, setRequired] = useState(true);
  const [showInSummary, setShowInSummary] = useState(true);
  const [showInPdf, setShowInPdf] = useState(true);

  const [place, setPlace] = useState("");
  const [options, setOptions] = useState("");
  const [currency, setCurrency] = useState("");
  const [validation, setValidation] = useState("");

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanLabel = label.trim();

    if (!cleanLabel) {
      setError(
        isDocumentContext
          ? "Please enter document name"
          : "Please enter field label"
      );
      return;
    }

    // Documents Upload Settings
    // Only label and enabled are required by backend.
    if (isDocumentContext) {
      const field = {
        label: cleanLabel,
        enabled: true,
      };

      onSave?.(field);
      return;
    }

    // Other field settings
    const field = {
      label: cleanLabel,
      type,
      required,
      showInSummary,
      showInPdf,
      placeholder: place,
      options: options
        .split("\n")
        .map((item) => item.trim())
        .filter(Boolean),
      currency,
      validation,
    };

    onSave?.(field);
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-50";

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-950/50 backdrop-blur-sm p-3 sm:p-5"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onCancel?.();
      }}
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header */}
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-gray-100 bg-white px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
              {isDocumentContext ? (
                <FileText size={22} />
              ) : (
                <Settings2 size={22} />
              )}
            </div>

            <div>
              <h2 className="text-lg font-bold text-gray-900">
                {isDocumentContext
                  ? "Add New Document"
                  : "Add New Field"}
              </h2>

              <p className="mt-0.5 text-xs text-gray-500">
                {isDocumentContext
                  ? "Create a document upload field for shipment forms."
                  : "Configure the properties of your new field."}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onCancel}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
          >
            <X size={19} />
          </button>
        </div>

        {/* Body */}
        <div className="space-y-5 px-5 py-6 sm:px-6">

          {/* Document-specific form */}
          {isDocumentContext ? (
            <>
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Document Name
                  <span className="ml-1 text-red-500">*</span>
                </label>

                <div className="relative">
                  <FileText
                    size={17}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    autoFocus
                    type="text"
                    value={label}
                    onChange={(e) => {
                      setLabel(e.target.value);
                      setError("");
                    }}
                    placeholder="e.g. Certificate of Origin"
                    className={`${inputClass} pl-10`}
                  />
                </div>

                <p className="mt-2 text-xs text-gray-400">
                  Enter the document name that users will see in their shipment form.
                </p>
              </div>

              <div className="rounded-xl border border-teal-100 bg-teal-50/70 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-white text-teal-600">
                    <List size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-gray-800">
                      Document Upload Field
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      This document will be added to the admin configuration.
                      Once you save the settings, it can appear in the user's
                      shipment document section.
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              {/* Generic field form */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Field Label <span className="text-red-500">*</span>
                </label>

                <input
                  autoFocus
                  value={label}
                  onChange={(e) => {
                    setLabel(e.target.value);
                    setError("");
                  }}
                  placeholder="Enter field name"
                  className={inputClass}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-gray-700">
                  Field Type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className={inputClass}
                >
                  <option>Currency</option>
                  <option>Number</option>
                  <option>Text</option>
                  <option>Dropdown</option>
                  <option>Score</option>
                </select>
              </div>

              {placeVar && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Placeholder
                  </label>

                  <input
                    value={place}
                    onChange={(e) => setPlace(e.target.value)}
                    placeholder="Enter placeholder"
                    className={inputClass}
                  />
                </div>
              )}

              {optionsVar && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Dropdown Options
                  </label>

                  <textarea
                    rows={4}
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    placeholder={"Export\nImport\nDomestic"}
                    className={`${inputClass} resize-none`}
                  />
                  <p className="mt-1 text-xs text-gray-400">
                    Enter one option per line.
                  </p>
                </div>
              )}

              {currencyVar && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Currency
                  </label>

                  <input
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    placeholder="INR"
                    className={inputClass}
                  />
                </div>
              )}

              {validationVar && (
                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700">
                    Validation
                  </label>

                  <input
                    value={validation}
                    onChange={(e) => setValidation(e.target.value)}
                    placeholder="Select validation"
                    className={inputClass}
                  />
                </div>
              )}

              {/* Generic field properties */}
              <div className="space-y-4 rounded-xl border border-gray-100 bg-gray-50 p-4">
                <h3 className="text-sm font-semibold text-gray-800">
                  Field Properties
                </h3>

                <label className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">
                      Required Field
                    </p>
                    <p className="text-xs text-gray-400">
                      User must fill this field
                    </p>
                  </div>

                  <input
                    type="checkbox"
                    checked={required}
                    onChange={(e) => setRequired(e.target.checked)}
                    className="h-4 w-4 accent-teal-600"
                  />
                </label>

                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">
                    Show in Summary
                  </span>

                  <input
                    type="checkbox"
                    checked={showInSummary}
                    onChange={(e) =>
                      setShowInSummary(e.target.checked)
                    }
                    className="h-4 w-4 accent-teal-600"
                  />
                </label>

                <label className="flex items-center justify-between gap-3">
                  <span className="text-sm text-gray-700">
                    Show in PDF / Print
                  </span>

                  <input
                    type="checkbox"
                    checked={showInPdf}
                    onChange={(e) =>
                      setShowInPdf(e.target.checked)
                    }
                    className="h-4 w-4 accent-teal-600"
                  />
                </label>
              </div>
            </>
          )}

          {/* Error */}
          {error && (
            <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2.5 text-sm text-red-600">
              <AlertCircle size={17} />
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 flex flex-col-reverse gap-3 border-t border-gray-100 bg-white px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-xl border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-700"
          >
            <Plus size={17} />

            {isDocumentContext ? "Add Document" : "Add Field"}
          </button>
        </div>
      </form>
    </div>
  );
}