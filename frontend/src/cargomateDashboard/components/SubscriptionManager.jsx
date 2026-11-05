import React, { useEffect, useState } from "react";
import API from "../api/axios";
const labels = {
  aiChatbot: "AI Chatbot",
  hsLookup: "HS Code Lookup",
  incentiveChecker: "Incentive Checker",
  shipmentPlanning: "Shipment Planning",
  shipmentCost: "Shipment Cost Analysis",
  governmentSchemes: "Government Schemes",
  countryRules: "Country Rules",
  tradeResearch: "B2B Trade Research",
};
const defaultLimits = {
  user: {
    Basic: [50, 50, 10, 5, 5, 10, 10, 0],
    Premium: [200, 200, 50, 20, 25, 50, 50, 0],
    Platinum: [500, 500, 150, 50, 100, 150, 150, 0],
  },
  b2b: {
    Basic: [100, 100, 20, 10, 10, 20, 20, 10],
    Premium: [400, 500, 100, 50, 50, 100, 100, 50],
    Platinum: [1000, 2000, 500, 200, 200, 300, 500, 200],
  },
};
const keys = Object.keys(labels);
const getAudience = () => (location.pathname.includes("b2b") ? "b2b" : "user");
function Card({ children }) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      {children}
    </div>
  );
}
export default function SubscriptionManager({
  mode = "upgrade",
  onChangePlan,
}) {
  const [plans, setPlans] = useState([]),
    [mine, setMine] = useState(null),
    [loading, setLoading] = useState(true),
    [error, setError] = useState(""),
    [busy, setBusy] = useState(""),
    [billing, setBilling] = useState("monthly");
  const audience = getAudience();
  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const [a, b] = await Promise.all([
        API.get("/ai-subscription/plans?audience=" + audience),
        API.get("/ai-subscription/me"),
      ]);
      setPlans(a.data.data || []);
      setMine(b.data.data);
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load subscriptions");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);
  const buy = async (plan) => {
    setBusy(plan._id);
    setError("");
    try {
      const {
        data: { data: order },
      } = await API.post("/ai-subscription/order", { planId: plan._id });
      if (!window.Razorpay) {
        await new Promise((resolve, reject) => {
          const s = document.createElement("script");
          s.src = "https://checkout.razorpay.com/v1/checkout.js";
          s.onload = resolve;
          s.onerror = () => reject(new Error("Razorpay checkout unavailable"));
          document.body.appendChild(s);
        });
      }
      new window.Razorpay({
        key: order.keyId,
        amount: order.amount,
        currency: order.currency,
        order_id: order.orderId,
        name: "ASD CargoMate",
        description: order.planName,
        handler: async (response) => {
          try {
            await API.post("/ai-subscription/verify", response);
            await load();
            alert("Subscription activated");
          } catch (e) {
            setError(
              e.response?.data?.message || "Payment verification failed",
            );
          } finally {
            setBusy("");
          }
        },
        modal: { ondismiss: () => setBusy("") },
      }).open();
    } catch (e) {
      setError(e.response?.data?.message || e.message);
      setBusy("");
    }
  };
  if (loading)
    return (
      <div className="p-6 text-sm text-slate-500">
        Loading subscription details...
      </div>
    );
  const current = mine?.subscription;
  const activeId = current?.planId?._id;
  const visible = plans.filter(
    (plan) =>
      plan.audience === audience &&
      plan.planType === billing &&
      plan.status === "active",
  );
  const display = (n) => `₹${Number(n || 0).toLocaleString("en-IN")}`;
  const theme = {
    Basic: {
      border: "border-blue-200",
      button: "bg-blue-600 hover:bg-blue-700",
      color: "text-blue-700",
      badge: "bg-blue-50 text-blue-700",
      circle: "bg-blue-50",
    },
    Premium: {
      border: "border-teal-300",
      button: "bg-teal-600 hover:bg-teal-700",
      color: "text-teal-700",
      badge: "bg-teal-50 text-teal-700",
      circle: "bg-teal-50",
    },
    Platinum: {
      border: "border-violet-200",
      button: "bg-violet-600 hover:bg-violet-700",
      color: "text-violet-700",
      badge: "bg-violet-50 text-violet-700",
      circle: "bg-violet-50",
    },
  };
  const compareKeys = keys.filter(
    (k) => audience === "b2b" || k !== "tradeResearch",
  );
  return (
    <div className="bg-[#F7F9FC] min-h-screen p-1 md:p-1 space-y-5 mt-1">
      <div className="flex flex-wrap items-start justify-end gap-3">
        {/* <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {mode === "upgrade" ? "Subscription Plans" : "My Subscription"}
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            {audience === "b2b" ? "B2B" : "User"} plan benefits, billing and
            monthly AI usage
          </p>
        </div> */}
        <div className="flex gap-1 rounded-xl bg-white border border-slate-200 p-1">
          {["monthly", "yearly"].map((v) => (
            <button
              key={v}
              onClick={() => setBilling(v)}
              className={`px-4 py-2 text-sm rounded-lg font-semibold ${billing === v ? "bg-teal-500 text-white" : "text-slate-600 hover:bg-slate-50"}`}
            >
              {v === "monthly" ? "Monthly" : "Yearly"}
            </button>
          ))}
        </div>
      </div>
      {error && (
        <div
          role="alert"
          className="border border-red-200 rounded-xl bg-red-50 p-4 text-sm text-red-700"
        >
          {error}
        </div>
      )}
      {current && (
        <Card>
          <div className="flex flex-wrap justify-between gap-3 items-center">
            <div>
              <div className="text-xs text-slate-500">Current active plan</div>
              <b className="text-lg text-slate-900">
                {current.planId?.name || "Subscription"}
              </b>
              <p className="text-sm text-slate-500">
                Purchased:{" "}
                {new Date(current.startDate).toLocaleDateString("en-IN")} ·
                Valid till:{" "}
                {new Date(current.expiryDate).toLocaleDateString("en-IN")}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="text-right">
                <span className="text-xs text-slate-500">
                  AI Chatbot queries remaining
                </span>
                <p className="font-bold text-xl text-teal-700">
                  {mine?.features?.aiChatbot?.remaining ?? 0} /{" "}
                  {mine?.features?.aiChatbot?.limit ?? 0}
                </p>
              </div>
              {mode !== "upgrade" && (
                <button
                  onClick={() => onChangePlan?.()}
                  className="bg-teal-600 text-white rounded-lg px-4 py-2 text-sm"
                >
                  Change Plan
                </button>
              )}
            </div>
          </div>
        </Card>
      )}
      {(mode === "upgrade" || !current) && (
        <>
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {audience === "b2b" ? "B2B Panel Plans" : "User Panel Plans"}
            </h2>
            <p className="text-sm text-slate-500">
              Only plans published by Admin for this account type
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5 items-stretch">
            {visible.map((plan) => {
              const t = theme[plan.tier] || theme.Basic;
              const limits = plan.featureLimits || {};
              return (
                <div
                  key={plan._id}
                  className={`relative bg-white rounded-2xl border ${t.border} p-5 md:p-6 shadow-sm flex flex-col min-h-[440px] hover:-translate-y-0.5 hover:shadow-lg transition-all duration-200`}
                >
                  <div className="flex justify-between gap-3">
                    <div>
                      <div
                        className={`w-11 h-11 rounded-full ${t.circle} flex items-center justify-center ${t.color} font-bold text-xl`}
                      >
                        {plan.tier?.charAt(0)}
                      </div>
                      <h3 className="font-bold text-xl mt-3">{plan.name}</h3>
                      <p className="text-xs text-slate-500 mt-1">
                        {plan.description ||
                          "Smart trade tools for your business"}
                      </p>
                    </div>
                    {plan.isPopular || plan.isRecommended ? (
                      <span
                        className={`self-start rounded-full px-3 py-1 text-[10px] font-semibold ${t.badge}`}
                      >
                        {plan.isPopular ? "Most Popular" : "Recommended"}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900">
                    {display(plan.price)}
                    <span className="text-sm font-normal text-slate-500">
                      {" "}
                      / {billing === "monthly" ? "month" : "year"}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 my-3 border-b border-slate-100 pb-3">
                    Free trial: {plan.trialDays ?? 7} days
                  </div>
                  <div className="flex-1 space-y-2">
                    {compareKeys.map((k) => (
                      <div
                        key={k}
                        className="flex justify-between gap-2 border-b border-slate-100 py-1.5 text-xs"
                      >
                        <span className="text-slate-600">✓ {labels[k]}</span>
                        <span className="font-bold text-slate-900">
                          {Number(limits[k] ?? 0)} / month
                        </span>
                      </div>
                    ))}
                  </div>
                  <button
                    disabled={busy !== "" || plan._id === activeId}
                    onClick={() => buy(plan)}
                    className={`mt-5 w-full rounded-lg py-3 text-white text-sm font-semibold ${plan._id === activeId ? "bg-slate-300" : t.button} disabled:opacity-60`}
                  >
                    {plan._id === activeId
                      ? "Current Plan"
                      : busy === plan._id
                        ? "Opening payment..."
                        : `Choose ${plan.tier}`}
                  </button>
                </div>
              );
            })}
            {!visible.length && (
              <div className="col-span-full rounded-2xl bg-white border border-dashed border-slate-300 p-10 text-center text-slate-500">
                No {audience.toUpperCase()} plans configured for {billing}{" "}
                billing. Please contact Admin.
              </div>
            )}
          </div>
          <div className="bg-white border rounded-2xl overflow-x-auto">
            <div className="p-5 border-b font-bold text-slate-900">
              Compare Features
            </div>
            <table className="w-full min-w-[600px] text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-5 py-3 text-left">Features</th>
                  {visible.map((plan) => (
                    <th className="px-5 py-3 text-center" key={plan._id}>
                      {plan.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {compareKeys.map((k) => (
                  <tr className="border-t" key={k}>
                    <td className="px-5 py-3 text-slate-700">{labels[k]}</td>
                    {visible.map((plan) => (
                      <td key={plan._id} className="px-5 py-3 text-center">
                        {Number(plan.featureLimits?.[k] ?? 0)} / month
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
      {mode === "subscription" && (
        <>
          <h2 className="font-bold text-slate-900">Feature Usage This Cycle</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {Object.entries(mine?.features || {})
              .filter(([k]) => audience === "b2b" || k !== "tradeResearch")
              .map(([k, v]) => (
                <Card key={k}>
                  <div className="flex justify-between text-sm">
                    <b>{labels[k] || k}</b>
                    <span>
                      {v.used} / {v.limit}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    {v.remaining} remaining
                  </p>
                  <div className="h-2 rounded bg-slate-100 mt-2">
                    <div
                      className="h-2 rounded bg-teal-500"
                      style={{
                        width: `${v.limit ? Math.min(100, (v.used / v.limit) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </Card>
              ))}
          </div>
          <h2 className="font-bold text-slate-900">Invoices</h2>
          <Card>
            {(mine?.invoices || []).length ? (
              mine.invoices.map((i) => (
                <div
                  key={i._id}
                  className="border-b py-3 text-sm flex justify-between gap-2 flex-wrap"
                >
                  <span>
                    {i.invoiceNumber} ·{" "}
                    {new Date(i.createdAt).toLocaleDateString("en-IN")}
                  </span>
                  <span>
                    {display(i.amount)} · {i.status}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-500">No invoices yet</p>
            )}
          </Card>
        </>
      )}
      {!current && mode === "subscription" && (
        <Card>
          <p className="text-sm">
            No active subscription. Free testing is unlimited only when
            explicitly enabled in backend.
          </p>
          <button
            className="bg-teal-600 text-white p-2 rounded mt-3"
            onClick={() => onChangePlan?.()}
          >
            Upgrade Plan
          </button>
        </Card>
      )}
    </div>
  );
}
