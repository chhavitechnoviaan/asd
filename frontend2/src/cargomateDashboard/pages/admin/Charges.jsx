// import { useState } from "react";
// import { DollarSign, Pencil, Trash2, Check } from "lucide-react";

// const initialCharges = [
//   { id: 1, name: "Ocean Freight", type: "Freight", currency: "USD", amount: "1,500.00" },
//   { id: 2, name: "Documentation fees", type: "Local Charges", currency: "USD", amount: "75.00" },
//   { id: 3, name: "Handling charges", type: "Local Charges", currency: "USD", amount: "50.00" },
//   { id: 4, name: "THC", type: "Local Charges", currency: "USD", amount: "100.00" },
// ];

// export default function Charges() {
//   const [charges, setCharges] = useState(initialCharges);
//   const [editingId, setEditingId] = useState(null);
//   const [editValues, setEditValues] = useState({});

//   const startEdit = (charge) => {
//     setEditingId(charge.id);
//     setEditValues(charge);
//   };

//   const saveEdit = async (id) => {
//     setCharges((prev) => prev.map((c) => (c.id === id ? editValues : c)));
//     setEditingId(null);
//     try {
//       await fetch("/api/shipment/charges/" + id, {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(editValues),
//       });
//     } catch (err) {}
//   };

//   const deleteCharge = async (id) => {
//     setCharges((prev) => prev.filter((c) => c.id !== id));
//     try {
//       await fetch("/api/shipment/charges/" + id, { method: "DELETE" });
//     } catch (err) {}
//   };

//   return (
//     <div className="w-full max-w-3xl mx-auto bg-white rounded-2xl ">
//       <div className="flex items-center justify-between gap-3 p-4 sm:p-6 border-b border-gray-100">
//         <div className="flex items-center gap-3 min-w-0">
//           <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
//             <DollarSign className="w-6 h-6 text-purple-500" />
//           </div>
//           <div className="min-w-0">
//             <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Charges</h2>
//             <p className="text-sm text-gray-500 truncate">View and manage shipment charges</p>
//           </div>
//         </div>
//         <button className="px-4 py-1.5 rounded-full border border-blue-300 text-blue-600 text-sm shrink-0">
//           Edit Details
//         </button>
//       </div>

//       <div className="overflow-x-auto">
//         <div className="min-w-[650px]">
//           <div className="grid grid-cols-5 px-4 sm:px-6 py-3 text-sm font-semibold text-gray-900">
//             <span>Charge Name</span>
//             <span>Type</span>
//             <span>Currency</span>
//             <span>Amount</span>
//             <span>Action</span>
//           </div>

//           {charges.map((charge) => {
//             const isEditing = editingId === charge.id;
//             return (
//               <div
//                 key={charge.id}
//                 className="grid grid-cols-5 items-center px-4 sm:px-6 py-3 border-t border-gray-100"
//               >
//                 {isEditing ? (
//                   <input
//                     value={editValues.name}
//                     onChange={(e) => setEditValues({ ...editValues, name: e.target.value })}
//                     className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-700">{charge.name}</span>
//                 )}

//                 {isEditing ? (
//                   <input
//                     value={editValues.type}
//                     onChange={(e) => setEditValues({ ...editValues, type: e.target.value })}
//                     className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-500">{charge.type}</span>
//                 )}

//                 {isEditing ? (
//                   <input
//                     value={editValues.currency}
//                     onChange={(e) => setEditValues({ ...editValues, currency: e.target.value })}
//                     className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-500">{charge.currency}</span>
//                 )}

//                 {isEditing ? (
//                   <input
//                     value={editValues.amount}
//                     onChange={(e) => setEditValues({ ...editValues, amount: e.target.value })}
//                     className="border border-gray-300 rounded-full px-3 py-1 text-sm w-full"
//                   />
//                 ) : (
//                   <span className="text-sm text-gray-500">{charge.amount}</span>
//                 )}

//                 <div className="flex items-center gap-3">
//                   {isEditing ? (
//                     <button onClick={() => saveEdit(charge.id)}>
//                       <Check className="w-4 h-4 text-green-600" />
//                     </button>
//                   ) : (
//                     <button onClick={() => startEdit(charge)}>
//                       <Pencil className="w-4 h-4 text-gray-700" />
//                     </button>
//                   )}
//                   <button onClick={() => deleteCharge(charge.id)}>
//                     <Trash2 className="w-4 h-4 text-gray-900" />
//                   </button>
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </div>
//     </div>
//   );
// }


// mahima code //

import { useEffect, useState } from "react";
import {
  Pencil,
  Trash2,
  Check,
  X,
  Receipt,
  Coins,
  LoaderCircle,
  AlertCircle,
} from "lucide-react";

import {
  getQuotationByShipment,
  updateQuotationCharges,
} from "../../api/quotation";

export default function Charges({
  shipment,
  shipmentId: propShipmentId,
  onUpdated,
}) {
  const [charges, setCharges] = useState([]);
  const [quotation, setQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({});
  const [error, setError] = useState("");

  const shipmentData =
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

  const shipmentId =
    propShipmentId ||
    shipmentData?._id ||
    shipmentData?.mongoId ||
    shipmentData?.header?.mongoId ||
    shipmentData?.header?._id ||
    shipmentData?.shipmentInfo?.mongoId ||
    shipmentData?.shipmentInfo?._id ||
    null;

  // ==========================================
  // FETCH QUOTATION
  // ==========================================
  const fetchCharges = async () => {
    try {
      setLoading(true);
      setError("");

      if (!shipmentId) {
        setCharges([]);
        setQuotation(null);
        setError("Shipment ID not found.");
        return;
      }

      const response = await getQuotationByShipment(shipmentId);

      const quotations = response.data?.data || [];
      const latestQuotation = Array.isArray(quotations)
        ? quotations[0]
        : quotations;

      if (!latestQuotation) {
        setQuotation(null);
        setCharges([]);
        return;
      }

      setQuotation(latestQuotation);

      const quotationCharges = latestQuotation.charges || [];

      setCharges(
        quotationCharges.map((charge, index) => ({
          ...charge,
          _id: charge._id || `charge-${index}`,
          quotationId: latestQuotation._id,
        }))
      );
    } catch (err) {
      console.error("FETCH CHARGES ERROR:", err);
      setError(
        err.response?.data?.message || "Failed to fetch quotation charges."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCharges();
  }, [shipmentId]);

  // ==========================================
  // START EDIT
  // ==========================================
  const startEdit = (charge) => {
    setEditingId(charge._id);

    setEditValues({
      name: charge.name || "",
      description: charge.description || "",
      amount: String(charge.amount ?? 0),
      currency: charge.currency || "INR",
    });

    setError("");
  };

  // ==========================================
  // CANCEL EDIT
  // ==========================================
  const cancelEdit = () => {
    setEditingId(null);
    setEditValues({});
    setError("");
  };

  // ==========================================
  // UPDATE CHARGES IN DATABASE
  // ==========================================
  const persistCharges = async (updatedCharges) => {
    if (!quotation?._id) {
      throw new Error("Quotation ID not found.");
    }

    const payload = {
      charges: updatedCharges.map((charge) => ({
        ...(charge._id && !String(charge._id).startsWith("charge-")
          ? { _id: charge._id }
          : {}),
        name: charge.name,
        description: charge.description || "",
        amount: Number(charge.amount),
        currency: charge.currency || quotation.currency || "INR",
      })),
    };

    const response = await updateQuotationCharges(
      quotation._id,
      payload
    );

    const updatedQuotation =
      response.data?.data || response.data?.quotation;

    if (!updatedQuotation) {
      throw new Error("Updated quotation data was not returned.");
    }

    setQuotation(updatedQuotation);

    setCharges(
      (updatedQuotation.charges || []).map((charge, index) => ({
        ...charge,
        _id: charge._id || `charge-${index}`,
        quotationId: updatedQuotation._id,
      }))
    );

    return updatedQuotation;
  };

  // ==========================================
  // SAVE EDIT
  // ==========================================
  const saveEdit = async (id) => {
    try {
      if (!editValues.name?.trim()) {
        setError("Charge name is required.");
        return;
      }

      const amount = Number(editValues.amount);

      if (
        editValues.amount === "" ||
        !Number.isFinite(amount) ||
        amount < 0
      ) {
        setError("Please enter a valid charge amount.");
        return;
      }

      setSaving(true);
      setError("");

      const updatedCharges = charges.map((charge) =>
        charge._id === id
          ? {
              ...charge,
              name: editValues.name.trim(),
              description: editValues.description.trim(),
              amount,
              currency: editValues.currency || "INR",
            }
          : charge
      );

      await persistCharges(updatedCharges);

      setEditingId(null);
      setEditValues({});

      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      console.error("SAVE CHARGE ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to save charge."
      );
    } finally {
      setSaving(false);
    }
  };

  // ==========================================
  // DELETE CHARGE
  // ==========================================
  const deleteCharge = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this quotation charge?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setError("");

      const updatedCharges = charges.filter(
        (charge) => charge._id !== id
      );

      await persistCharges(updatedCharges);

      if (onUpdated) {
        await onUpdated();
      }
    } catch (err) {
      console.error("DELETE CHARGE ERROR:", err);

      setError(
        err.response?.data?.message ||
        err.message ||
        "Failed to delete charge."
      );
    } finally {
      setSaving(false);
    }
  };

  const totalAmount = charges.reduce(
    (sum, charge) => sum + (Number(charge.amount) || 0),
    0
  );

  const primaryCurrency =
    quotation?.currency ||
    charges[0]?.currency ||
    "INR";

  // ==========================================
  // LOADING
  // ==========================================
  if (loading) {
    return (
      <div className="w-full bg-white rounded-2xl border border-slate-200 p-12 flex flex-col items-center justify-center">
        <LoaderCircle
          size={30}
          className="animate-spin text-indigo-600 mb-3"
        />
        <p className="text-xs font-semibold text-slate-600">
          Fetching quotation charges...
        </p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200 shadow-sm p-5 sm:p-7 space-y-6">

      {/* HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 border border-indigo-100 text-indigo-600 flex items-center justify-center shrink-0">
            <Receipt size={20} />
          </div>

          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900">
                Quotation Freight Charges
              </h2>

              <span className="text-xs px-2.5 py-1 rounded-full font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {charges.length} Line Items
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              Charges received from the client's quotation.
            </p>
          </div>
        </div>

        {charges.length > 0 && (
          <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-2xl border border-slate-200">
            <div>
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Total Quotation Value
              </span>

              <span className="text-sm font-extrabold text-slate-900">
                {primaryCurrency}{" "}
                {totalAmount.toLocaleString("en-IN", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle size={16} className="shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {/* EMPTY STATE */}
      {charges.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-slate-200 p-10 text-center bg-slate-50/40">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-400 mx-auto flex items-center justify-center mb-3">
            <Coins size={24} />
          </div>

          <h3 className="text-sm font-bold text-slate-800">
            No Charges Linked Yet
          </h3>

          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Charges added by the client in the quotation will appear here.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-2xl border border-slate-200 bg-white">

          <table className="w-full text-left border-collapse min-w-[700px]">

            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                <th className="py-3 px-4">Charge Category</th>
                <th className="py-3 px-4">Description / Remarks</th>
                <th className="py-3 px-4 text-center">Currency</th>
                <th className="py-3 px-4 text-right">Amount</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs">

              {charges.map((charge) => {
                const id = charge._id;
                const isEditing = editingId === id;

                return (
                  <tr
                    key={id}
                    className={`transition-colors ${
                      isEditing
                        ? "bg-indigo-50/40"
                        : "hover:bg-slate-50"
                    }`}
                  >

                    {/* NAME */}
                    <td className="py-3 px-4 font-bold text-slate-900">
                      {isEditing ? (
                        <input
                          value={editValues.name}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          placeholder="Charge name"
                          className="w-full rounded-xl border border-indigo-300 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      ) : (
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                          <span>{charge.name || "-"}</span>
                        </div>
                      )}
                    </td>

                    {/* DESCRIPTION */}
                    <td className="py-3 px-4 text-slate-500">
                      {isEditing ? (
                        <input
                          value={editValues.description}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                          placeholder="Description"
                          className="w-full rounded-xl border border-indigo-300 bg-white px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      ) : (
                        <span>{charge.description || "-"}</span>
                      )}
                    </td>

                    {/* CURRENCY */}
                    <td className="py-3 px-4 text-center">
                      <span className="inline-block px-2 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700">
                        {charge.currency || primaryCurrency}
                      </span>
                    </td>

                    {/* AMOUNT */}
                    <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                      {isEditing ? (
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={editValues.amount}
                          onChange={(e) =>
                            setEditValues((prev) => ({
                              ...prev,
                              amount: e.target.value,
                            }))
                          }
                          className="w-28 text-right rounded-xl border border-indigo-300 bg-white px-3 py-2 text-xs font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                      ) : (
                        Number(charge.amount || 0).toLocaleString("en-IN", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })
                      )}
                    </td>

                    {/* ACTIONS */}
                    <td className="py-3 px-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1.5">

                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => saveEdit(id)}
                              className="p-2 rounded-lg bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 disabled:opacity-50"
                              title="Save changes"
                            >
                              {saving ? (
                                <LoaderCircle size={14} className="animate-spin" />
                              ) : (
                                <Check size={14} />
                              )}
                            </button>

                            <button
                              type="button"
                              disabled={saving}
                              onClick={cancelEdit}
                              className="p-2 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 disabled:opacity-50"
                              title="Cancel"
                            >
                              <X size={14} />
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => startEdit(charge)}
                              className="p-2 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 disabled:opacity-50"
                              title="Edit charge"
                            >
                              <Pencil size={14} />
                            </button>

                            <button
                              type="button"
                              disabled={saving}
                              onClick={() => deleteCharge(id)}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 disabled:opacity-50"
                              title="Delete charge"
                            >
                              <Trash2 size={14} />
                            </button>
                          </>
                        )}

                      </div>
                    </td>

                  </tr>
                );
              })}

            </tbody>
          </table>
        </div>
      )}

      {/* SAVE INDICATOR */}
      {saving && (
        <div className="flex items-center gap-2 text-xs text-indigo-600 font-semibold">
          <LoaderCircle size={14} className="animate-spin" />
          Saving quotation changes...
        </div>
      )}

    </div>
  );
}