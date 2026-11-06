// import { useState } from "react";
// import { Users } from "lucide-react";

// export default function PartiesContact() {
//   const initialFormData = {
//     shipperCompanyName: "ABC Exports Pvt. Ltd.",
//     shipperContactPerson: "Aarav sharma",
//     shipperEmail: "aarav.sharma@gmail.com",
//     shipperPhone: "+91 74833 65549",
//     consigneeCompanyName: "Global Imports Inc.",
//     consigneeContactPerson: "John Williams",
//     consigneeEmail: "john.williams@gmail.com",
//     consigneePhone: "+1 202 555 0147",
//   };

//   const [editMode, setEditMode] = useState(false);

//   const [formData, setFormData] = useState(initialFormData);

//   const [savedData, setSavedData] = useState(initialFormData);

//   const handleChange = (field) => (e) => {
//     setFormData((prev) => ({
//       ...prev,
//       [field]: e.target.value,
//     }));
//   };

//   const handleEdit = () => {
//     setSavedData(formData);
//     setEditMode(true);
//   };

//   const handleCancel = () => {
//     setFormData(savedData);
//     setEditMode(false);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       // API remains same - uncomment when backend integration is needed

//       // const res = await fetch("/api/shipment/parties-contact", {
//       //   method: "POST",
//       //   headers: { "Content-Type": "application/json" },
//       //   body: JSON.stringify(formData),
//       // });

//       // const data = await res.json();

//       // Frontend save
//       setSavedData(formData);
//       setEditMode(false);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const inputClass =
//     "w-full border border-gray-300 rounded-full px-4 py-2 text-sm text-gray-600 disabled:bg-gray-50";

//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="w-full max-w-2xl mx-auto bg-white rounded-2xl  p-4 sm:p-6"
//     >
//       <div className="flex items-center justify-between mb-6 gap-3">
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
//             <Users className="w-6 h-6 text-blue-500" />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//               Parties & Contact
//             </h2>
//             <p className="text-sm text-gray-500 truncate">
//               Manage shipper, consignee & contact details.
//             </p>
//           </div>
//         </div>

//         <button
//           type="button"
//           onClick={editMode ? handleCancel : handleEdit}
//           className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0"
//         >
//           {editMode ? "Cancel" : "Edit Details"}
//         </button>
//       </div>

//       <div className="space-y-4">
//         <h3 className="font-semibold text-gray-900 text-sm">Shipper</h3>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Company Name
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperCompanyName}
//               onChange={handleChange("shipperCompanyName")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperContactPerson}
//               onChange={handleChange("shipperContactPerson")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Category Name
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperEmail}
//               onChange={handleChange("shipperEmail")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Category Name
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.shipperPhone}
//               onChange={handleChange("shipperPhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>

//         <h3 className="font-semibold text-gray-900 text-sm">Consignee</h3>

//         <div className="grid sm:grid-cols-2 gap-4">
//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Company Name
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeCompanyName}
//               onChange={handleChange("consigneeCompanyName")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeContactPerson}
//               onChange={handleChange("consigneeContactPerson")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Email
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneeEmail}
//               onChange={handleChange("consigneeEmail")}
//               className={inputClass}
//             />
//           </div>

//           <div>
//             <label className="block text-sm text-gray-700 mb-1">
//               Contact Person
//             </label>
//             <input
//               disabled={!editMode}
//               value={formData.consigneePhone}
//               onChange={handleChange("consigneePhone")}
//               className={inputClass}
//             />
//           </div>
//         </div>
//       </div>

//       {editMode && (
//         <div className="flex justify-end mt-6">
//           <button
//             type="submit"
//             className="px-6 py-2 rounded-full bg-blue-500 text-white text-sm hover:bg-blue-600"
//           >
//             Save
//           </button>
//         </div>
//       )}
//     </form>
//   );
// }


import { useEffect, useState } from "react";
import {
  Users,
  Building2,
  UserCheck,
  MapPin,
  Pencil,
  CheckCircle2,
  AlertCircle,
  X,
  Save,
  ShieldCheck,
  ArrowRight,
} from "lucide-react";
import { updateShipment } from "../../api/ShipmentApi";

export default function PartiesContact({
  shipment,
  shipmentId,
  onUpdated,
}) {
  const getInitialData = () => ({
    exporterCompanyName: shipment?.exporter?.companyName || "",
    exporterContactPerson: shipment?.exporter?.contactPerson || "",
    importerCompanyName: shipment?.importer?.companyName || "",
    importerAddress: shipment?.importer?.address || "",
  });

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(getInitialData());
  const [savedData, setSavedData] = useState(getInitialData());
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null); // { type: 'success' | 'error', message: '' }

  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  useEffect(() => {
    const data = getInitialData();
    setFormData(data);
    setSavedData(data);
  }, [
    shipment?.exporter?.companyName,
    shipment?.exporter?.contactPerson,
    shipment?.importer?.companyName,
    shipment?.importer?.address,
  ]);

  const handleChange = (field) => (e) => {
    setFormData((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleEdit = () => {
    setSavedData({ ...formData });
    setEditMode(true);
  };

  const handleCancel = () => {
    setFormData(savedData);
    setEditMode(false);
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();

    try {
      setSaving(true);

      await updateShipment(shipmentId, {
        exporter: {
          companyName: formData.exporterCompanyName,
          contactPerson: formData.exporterContactPerson,
        },
        importer: {
          companyName: formData.importerCompanyName,
          address: formData.importerAddress,
        },
      });

      setSavedData(formData);
      setEditMode(false);
      showToast("success", "Parties and contact information updated successfully!");

      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      console.error("Failed to update parties:", err);
      const errMsg =
        err?.response?.data?.message || "Failed to update parties information.";
      showToast("error", errMsg);
    } finally {
      setSaving(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full bg-white rounded-2xl border border-slate-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-5 sm:p-7 space-y-6"
    >
      {/* Toast Alert */}
      {toast && (
        <div
          className={`px-4 py-3 rounded-xl text-xs font-semibold flex items-center justify-between border transition-all ${
            toast.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-rose-50 text-rose-800 border-rose-200"
          }`}
        >
          <div className="flex items-center gap-2">
            {toast.type === "success" ? (
              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
            ) : (
              <AlertCircle size={16} className="text-rose-600 shrink-0" />
            )}
            <span>{toast.message}</span>
          </div>
          <button
            type="button"
            onClick={() => setToast(null)}
            className="text-current opacity-60 hover:opacity-100"
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0 shadow-2xs">
            <Users size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Parties & Contacts Directory
              </h2>
              {editMode && (
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                  Editing Mode
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Legal entity names, authorized consignors, and consignee delivery addresses.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {!editMode ? (
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl border border-indigo-200 bg-indigo-50/70 text-indigo-700 text-xs font-bold hover:bg-indigo-100 transition-all shadow-2xs"
            >
              <Pencil size={13} />
              Edit Details
            </button>
          ) : (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCancel}
                disabled={saving}
                className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all shadow-2xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={saving}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs disabled:opacity-60"
              >
                <Save size={13} />
                {saving ? "Saving..." : "Save Changes"}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Two Column Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* CARD 1: EXPORTER */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center">
                <Building2 size={14} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Origin Party (Exporter / Shipper)
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Consignor
            </span>
          </div>

          <div className="space-y-4">
            <Field
              label="Customer / Company Legal Name"
              placeholder="e.g. Global Exports Pvt. Ltd."
              value={formData.exporterCompanyName}
              onChange={handleChange("exporterCompanyName")}
              disabled={!editMode}
            />

            <Field
              label="Authorized Contact Person"
              placeholder="e.g. Rahul Sharma (Operations Head)"
              value={formData.exporterContactPerson}
              onChange={handleChange("exporterContactPerson")}
              disabled={!editMode}
            />
          </div>
        </div>

        {/* CARD 2: IMPORTER / CONSIGNEE */}
        <div className="rounded-2xl border border-slate-200/90 bg-slate-50/40 p-5 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center">
                <MapPin size={14} />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                Destination Party (Consignee / Buyer)
              </h3>
            </div>
            <span className="text-[10px] font-semibold text-slate-400 uppercase">
              Recipient
            </span>
          </div>

          <div className="space-y-4">
            <Field
              label="Consignee / Buyer Name"
              placeholder="e.g. Acme Imports LLC"
              value={formData.importerCompanyName}
              onChange={handleChange("importerCompanyName")}
              disabled={!editMode}
            />

            <Field
              label="Consignee Delivery Address"
              placeholder="e.g. Warehouse 4B, Jebel Ali Free Zone, Dubai"
              value={formData.importerAddress}
              onChange={handleChange("importerAddress")}
              disabled={!editMode}
            />
          </div>
        </div>
      </div>

      {/* Bottom Sticky Action Footer (When Editing) */}
      {editMode && (
        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
          <span className="text-xs text-slate-400">
            Ensure company name matches the legal invoice and registration documents.
          </span>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleCancel}
              disabled={saving}
              className="px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-all"
            >
              Discard Changes
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-all shadow-xs disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  disabled,
  placeholder,
}) {
  return (
    <div className="w-full">
      <label className="block text-xs font-semibold text-slate-700 mb-1.5 tracking-wide">
        {label}
      </label>

      <input
        type="text"
        disabled={disabled}
        value={value ?? ""}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs text-slate-900 placeholder-slate-400 transition-all focus:border-indigo-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-500/10 disabled:cursor-not-allowed disabled:border-slate-200/70 disabled:bg-slate-100/70 disabled:text-slate-600 font-medium"
      />
    </div>
  );
}