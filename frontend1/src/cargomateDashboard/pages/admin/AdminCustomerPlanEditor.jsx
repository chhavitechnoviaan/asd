import { useEffect, useState } from "react";
import API from "../../api/axios";

// Customer subscription change, explicitly an admin adjustment (not a Razorpay purchase).
export default function AdminCustomerPlanEditor({ customer, audience, onUpdated }) {
  const [plans, setPlans] = useState([]);
  const [planId, setPlanId] = useState("");
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const customerId = customer?._id || customer?.id;
  useEffect(() => {
    let mounted = true;
    setLoading(true);
    API.get("/ai-subscription/admin/plans")
      .then(({ data }) => {
        if (mounted) setPlans((data?.data || []).filter(p => String(p.audience).toLowerCase() === audience && p.status === "active"));
      })
      .catch(e => { if (mounted) setError(e.response?.data?.message || "Unable to load plans. Main admin access required."); })
      .finally(() => { if (mounted) setLoading(false); });
    return () => { mounted = false; };
  }, [audience]);

  const apply = async () => {
    if (!customerId || !planId || reason.trim().length < 5) { setError("Choose a plan and enter a reason (minimum 5 characters)."); return; }
    if (!window.confirm("Change this customer's active subscription? This is a manual admin adjustment and does not collect payment.")) return;
    setSaving(true); setError(""); setNotice("");
    try {
      await API.post(`/ai-subscription/admin/customers/${customerId}/plan`, { planId, reason: reason.trim() });
      setNotice("Subscription updated. Refresh the customer list to see the current plan.");
      setPlanId("");setReason("");
      onUpdated?.();
    } catch(e) { setError(e.response?.data?.message || "Unable to change subscription"); }
    finally { setSaving(false); }
  };
  return <div className="mt-4 space-y-3 rounded-xl border border-teal-100 bg-teal-50/50 p-4">
    <h4 className="text-sm font-bold text-[#002259]">Change {audience === "b2b" ? "B2B" : "User"} Subscription (Admin)</h4>
    <p className="text-xs text-slate-600">Current: {customer?.purchasedPlan || "No active plan"}. Manual assignment only; existing invoices are not changed and no payment is charged.</p>
    <select disabled={loading || saving} aria-label="Select replacement plan" value={planId} onChange={e=>setPlanId(e.target.value)} className="w-full rounded-lg border border-slate-200 bg-white p-2 text-sm">
      <option value="">{loading ? "Loading plans..." : "Choose active plan"}</option>
      {plans.map(p => <option key={p._id} value={p._id}>{p.name} — {p.tier} / {p.planType} (₹{p.price})</option>)}
    </select>
    <textarea rows={2} value={reason} onChange={e=>setReason(e.target.value)} placeholder="Reason for manual plan change (required)" className="w-full rounded-lg border border-slate-200 p-2 text-sm" />
    {error && <p role="alert" className="text-xs text-red-700">{error}</p>}
    {notice && <p role="status" className="text-xs text-teal-700">{notice}</p>}
    <button type="button" onClick={apply} disabled={saving || loading || !planId || reason.trim().length < 5} className="rounded-lg bg-[#0D9488] px-4 py-2 text-xs font-bold text-white disabled:opacity-50">{saving ? "Updating..." : "Apply Plan Change"}</button>
  </div>;
}
