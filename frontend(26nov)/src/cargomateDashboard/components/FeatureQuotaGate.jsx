import React, { useEffect, useState } from "react";
import API from "../api/axios";

const names = { aiChatbot:"AI Chatbot", hsLookup:"HS Code Lookup", incentiveChecker:"Incentive Checker", shipmentPlanning:"Shipment Planning", shipmentCost:"Shipment Cost Analysis", governmentSchemes:"Government Schemes", countryRules:"Country Rules", tradeResearch:"B2B Trade Research" };

export function useSubscriptionQuotas() {
  const [data, setData] = useState(null);
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      try {
        const response = await API.get("/ai-subscription/me");
        if (mounted) setData(response.data?.data || null);
      } catch (err) {
        if (mounted) console.error("Unable to load quota information", err);
      }
    };
    load();
    window.addEventListener("cargomate:usage-updated", load);
    window.addEventListener("cargomate:subscription-updated", load);
    return () => {
      mounted = false;
      window.removeEventListener("cargomate:usage-updated", load);
      window.removeEventListener("cargomate:subscription-updated", load);
    };
  }, []);
  return data;
}

export default function FeatureQuotaGate({feature, data, onUpgrade, children}) {
  const [apiError, setApiError] = useState(null);
  useEffect(() => {
    const onLocked = event => {
      if (event.detail?.feature === feature) setApiError(event.detail);
    };
    const clear = () => setApiError(null);
    window.addEventListener("cargomate:quota-locked", onLocked);
    window.addEventListener("cargomate:usage-updated", clear);
    window.addEventListener("cargomate:subscription-updated", clear);
    return () => {
      window.removeEventListener("cargomate:quota-locked", onLocked);
      window.removeEventListener("cargomate:usage-updated", clear);
      window.removeEventListener("cargomate:subscription-updated", clear);
    };
  }, [feature]);

  const entry = data?.features?.[feature];
  const freeTesting = data?.unlimitedFreeTesting && !data?.subscription;
  const noSubscription = data != null && !data.subscription && !freeTesting;
  const usedUp = data?.subscription && entry && Number(entry.limit) > 0 && Number(entry.remaining) <= 0;
  const notIncluded = data?.subscription && entry && Number(entry.limit) === 0;
  const locked = Boolean(noSubscription || usedUp || notIncluded || (apiError && !data?.subscription));
  const featureName = names[feature] || "This feature";

  // Do not show a fictitious '0 of 0 queries used' while data is loading or a configured plan limit is missing.
  if (!locked) return <div className="min-w-0">{children}</div>;
  return (
    <section className="min-h-[420px] flex items-center justify-center bg-[#F7F9FC] p-4 md:p-8">
      <div className="w-full max-w-xl rounded-3xl border border-slate-200 bg-white shadow-sm p-7 md:p-10 text-center">
        <div className="mx-auto h-14 w-14 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-2xl" aria-hidden="true">🔒</div>
        <h2 className="text-xl font-bold text-[#101827] mt-5">{featureName} unavailable</h2>
        <p className="mt-3 text-sm text-slate-600 leading-6">
          {noSubscription ? "Choose a subscription to access this feature." : notIncluded ? "This feature is not included in your current plan." : `You've used ${entry.used} of ${entry.limit} monthly requests. Your quota resets next billing cycle.`}
        </p>
        {data?.subscription?.planId?.name && <p className="mt-3 text-xs font-semibold text-teal-700">Current plan: {data.subscription.planId.name}</p>}
        <button type="button" onClick={onUpgrade} className="mt-6 rounded-xl bg-[#0D9488] hover:bg-[#0F766E] transition text-white px-7 py-3 text-sm font-semibold">View & Upgrade Plans</button>
      </div>
    </section>
  );
}

export function SidebarQuota({data,onUpgrade}) {
  const entry = data?.features?.aiChatbot;
  const subscription = data?.subscription;
  const total = Number(entry?.limit || 0);
  const used = Number(entry?.used || 0);
  const remaining = Number(entry?.remaining ?? Math.max(0,total-used));
  const testing = data?.unlimitedFreeTesting && !subscription;
  return (
    <div className="rounded-xl bg-[#172A4F] p-3 text-white shadow-sm border border-white/10">
      <div className="flex items-center justify-between gap-2">
        <h3 className="font-semibold text-sm">AI Chatbot Usage</h3>
        <span className="text-[10px] rounded-full bg-white/10 px-2 py-1 text-slate-200">Monthly</span>
      </div>
      <p className="text-xs text-slate-300 mt-2">{subscription?.planId?.name || (testing ? "Free Testing" : "No Active Plan")}</p>
      <div className="rounded-lg bg-[#1149AA] p-2.5 mt-2">
        <div className="flex items-end justify-between gap-2">
          <strong className="text-xl tabular-nums">{testing ? "∞" : entry ? remaining : "—"}</strong>
          <span className="text-xs text-slate-100">{testing ? "unlimited" : `of ${entry ? total : "—"} left`}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/20 overflow-hidden mt-2" role="progressbar" aria-label="AI chatbot usage" aria-valuemin={0} aria-valuemax={Math.max(total,1)} aria-valuenow={Math.min(used,Math.max(total,1))}>
          <div className="h-full bg-[#2DD4BF] rounded-full transition-all" style={{width:`${total ? Math.min(100,100*used/total) : 0}%`}} />
        </div>
        <p className="text-[11px] text-slate-200 mt-1">{testing ? "Testing mode" : `${used} used this cycle`}</p>
      </div>
      {subscription?.expiryDate && <p className="text-[11px] text-slate-300 mt-2">Valid till {new Date(subscription.expiryDate).toLocaleDateString("en-IN")}</p>}
      {subscription && total === 0 && <p className="text-[11px] text-amber-200 mt-2">AI limit not configured — check Admin plan settings.</p>}
      <button type="button" onClick={onUpgrade} className="rounded-xl w-full bg-[#14B8A6] hover:bg-[#0D9488] text-white font-semibold text-xs py-2 mt-2 transition">{subscription ? "Change Plan" : "Upgrade Plan"}</button>
    </div>
  );
}
