// import { useEffect, useState } from "react";
// import { Check, Building2, UserRound } from "lucide-react";
// import { pricingPlans } from "../data/pricingPlans";

// const labels = { aiChatbot: "AI Chatbot", hsLookup: "HS Code Lookup", incentiveChecker: "Incentive Checker", shipmentPlanning: "Shipment Planning", shipmentCost: "Shipment Cost Analysis", governmentSchemes: "Government Schemes", countryRules: "Country Rules", tradeResearch: "B2B Trade Research" };
// export function usePublicPlans() {
//  const [plans,setPlans]=useState([]),[loading,setLoading]=useState(true),[failed,setFailed]=useState(false);
//  useEffect(()=>{const ctrl=new AbortController();const origin=(import.meta.env.VITE_API_BASE_URL||import.meta.env.VITE_API_URL||"http://localhost:8000").replace(/\/api\/?$/,"");
//  fetch(`${origin}/api/ai-subscription/plans`,{signal:ctrl.signal}).then(r=>{if(!r.ok)throw Error(`Pricing API ${r.status}`);return r.json()}).then(r=>setPlans(Array.isArray(r.data)?r.data:[])).catch(e=>{if(e.name!=="AbortError")setFailed(true)}).finally(()=>setLoading(false));return ()=>ctrl.abort();},[]);return {plans,loading,failed};
// }
// export {labels as planFeatureLabels};
// export default function PricingPlans({ onGetStarted, pricingState, billing, onBillingChange }) {
//  const {plans,loading}=pricingState;
//  const datasets=[{audience:"user",heading:"User Plans",sub:"For individuals and small businesses",icon:UserRound},{audience:"b2b",heading:"B2B Plans",sub:"For vendors, logistics businesses and trade partners",icon:Building2}];
//  const hasRemote=plans.length>0;
//  return <section className="max-w-7xl mx-auto px-4 py-12 sm:py-16">
//  <h2 className="text-center text-2xl font-bold text-slate-900">Choose the Right Plan for You</h2>
//  <p className="text-center text-sm text-slate-500 mt-2">Subscription plans and feature limits configured by CargoMate Admin</p>
//  <div className="mt-6 flex justify-center"><div className="bg-slate-100 rounded-full p-1 flex gap-1">{["monthly","yearly"].map(period=><button key={period} onClick={()=>onBillingChange(period)} className={`text-sm font-semibold rounded-full px-5 py-2 transition ${billing===period?"bg-[#0D9488] text-white":"text-slate-600"}`}>{period==="monthly"?"Monthly":"Yearly"}</button>)}</div></div>
//  {hasRemote?datasets.map(({audience,heading,sub,icon:Icon})=>{
//  const visible=plans.filter(p=>(p.audience||"user")===audience && p.planType===billing && p.status==="active");
//  return <div key={audience} className="mt-10"><div className="flex items-center gap-2 mb-4"><span className="rounded-lg bg-teal-50 p-2 text-teal-700"><Icon size={19}/></span><div><h3 className="font-bold text-xl text-slate-900">{heading}</h3><p className="text-sm text-slate-500">{sub}</p></div></div>
//  {visible.length?<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">{visible.map(plan=><article key={plan._id} className="border border-slate-200 rounded-2xl p-6 bg-white shadow-sm flex flex-col hover:shadow-md transition"><div className="flex items-start justify-between"><h4 className="font-bold text-lg text-slate-900">{plan.name}</h4><span className="rounded-full bg-teal-50 text-teal-700 text-[11px] px-3 py-1 font-semibold">{audience==="b2b"?"B2B Plan":"User Plan"}</span></div><p className="text-xs text-slate-500 mt-2">{plan.description||"CargoMate AI plan"}</p><p className="text-3xl font-bold text-slate-900 my-5">₹{Number(plan.price||0).toLocaleString("en-IN")} <span className="text-sm font-normal text-slate-500">/{billing==="monthly"?"month":"year"}</span></p><ul className="space-y-3 flex-1">{Object.entries(plan.featureLimits||{}).map(([key,value])=><li className="flex items-center gap-2 text-xs text-slate-700" key={key}><Check size={14} className="text-teal-600"/><span>{labels[key]||key}: <strong>{value}</strong>/month</span></li>)}</ul><button onClick={()=>onGetStarted({...plan,monthly:plan.price,yearly:plan.price,icon:Check,tagline:plan.description||"CargoMate AI plan",features:Object.entries(plan.featureLimits||{}).map(([key,value])=>`${labels[key]||key}: ${value}/month`)})} className="mt-6 rounded-xl border border-teal-600 text-teal-700 font-semibold py-2.5 hover:bg-teal-50">Get Started</button></article>)}</div>:<p className="rounded-xl bg-slate-50 p-5 text-sm text-slate-500">No {heading.toLowerCase()} configured for {billing} billing.</p>}</div>;
//  }):loading?<p className="mt-8 text-center text-slate-500">Loading plans...</p>:<div className="mt-8"><p className="text-center text-amber-700 text-xs mb-4">Default pricing displayed while admin plans are unavailable.</p><div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">{pricingPlans.map(plan=><article className="border rounded-xl p-5 flex flex-col" key={plan.id}><strong>{plan.name}</strong><p className="my-4 font-bold">{plan.monthly===null?"Custom":`$${billing==="yearly"?plan.yearly:plan.monthly}`}</p><ul className="text-xs text-slate-600 space-y-2 flex-1">{plan.features.map(v=><li key={v}>✓ {v}</li>)}</ul><button className="mt-4 border border-teal-500 rounded-lg p-2" onClick={()=>onGetStarted(plan)}>Get Started</button></article>)}</div></div>}
//  </section>;
// }



import { useEffect, useState } from "react";
import {
  Check,
  Building2,
  UserRound,
  Sparkles,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

import { pricingPlans } from "../data/pricingPlans";

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

export { labels as planFeatureLabels };

export function usePublicPlans() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();

    const origin = (
      import.meta.env.VITE_API_BASE_URL ||
      import.meta.env.VITE_API_URL ||
      "http://localhost:8000"
    )
      .replace(/\/api\/?$/, "")
      .replace(/\/$/, "");

    fetch(`${origin}/api/ai-subscription/plans`, {
      signal: ctrl.signal,
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Pricing API ${response.status}`);
        }
        return response.json();
      })
      .then((response) => {
        setPlans(
          Array.isArray(response.data) ? response.data : []
        );
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          setFailed(true);
        }
      })
      .finally(() => {
        if (!ctrl.signal.aborted) {
          setLoading(false);
        }
      });

    return () => ctrl.abort();
  }, []);

  return { plans, loading, failed };
}

const datasets = [
  {
    audience: "user",
    heading: "User Plans",
    sub: "For individuals and small businesses",
    icon: UserRound,
  },
  {
    audience: "b2b",
    heading: "B2B Plans",
    sub: "For vendors, logistics businesses and trade partners",
    icon: Building2,
  },
];

const formatPrice = (price) =>
  Number(price || 0).toLocaleString("en-IN");

export default function PricingPlans({
  onGetStarted,
  pricingState,
  billing = "monthly",
  onBillingChange,
}) {
  const {
    plans = [],
    loading = false,
    failed = false,
  } = pricingState || {};

  const hasRemote = plans.length > 0;

  const renderPlanCard = (plan, index, audience) => {
    const features = Object.entries(
      plan.featureLimits || {}
    );

    const isFeatured = index === 1;
    const price = Number(plan.price || 0);

    const selectedPlan = {
      ...plan,
      monthly: price,
      yearly: price,
      icon: Check,
      tagline: plan.description || "CargoMate AI plan",
      features: features.map(
        ([key, value]) =>
          `${labels[key] || key}: ${value}/month`
      ),
    };

    return (
      <article
        key={plan._id || plan.id || index}
        className={`group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white/95 p-5 shadow-[0_8px_30px_rgba(8,71,96,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-[0_16px_40px_rgba(8,145,178,0.13)] sm:p-6 ${
          isFeatured
            ? "border-teal-300 ring-1 ring-teal-100"
            : "border-[#D7EAF0]"
        }`}
      >
        {/* Decorative Glow */}
        <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-cyan-100/70 blur-3xl" />

        {isFeatured && (
          <div className="absolute right-0 top-0 rounded-bl-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] px-3 py-1.5 text-[10px] font-extrabold uppercase tracking-wide text-[#062337]">
            Featured
          </div>
        )}

        <div className="relative z-10 flex flex-1 flex-col">
          {/* Plan Type */}
          <div className="flex items-center gap-2">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#E0F2FE] text-teal-600">
              <Sparkles className="h-5 w-5" />
            </span>

            <span className="rounded-full border border-teal-200 bg-teal-50 px-3 py-1 text-[10px] font-semibold text-teal-700">
              {audience === "b2b"
                ? "B2B Plan"
                : "User Plan"}
            </span>
          </div>

          {/* Plan Heading */}
          <h4 className="mt-5 text-xl font-extrabold tracking-tight text-[#102A43]">
            {plan.name}
          </h4>

          <p className="mt-2 min-h-[38px] text-xs leading-5 text-slate-500">
            {plan.description || "CargoMate AI plan"}
          </p>

          {/* Price */}
          <div className="mt-5 border-b border-[#DCEEF2] pb-5">
            <div className="flex flex-wrap items-baseline gap-1">
              <span className="bg-gradient-to-r from-[#0D9488] via-[#0891B2] to-[#0284C7] bg-clip-text text-3xl font-extrabold text-transparent sm:text-4xl">
                ₹{formatPrice(price)}
              </span>

              <span className="text-xs font-medium text-slate-500">
                /{billing === "monthly" ? "month" : "year"}
              </span>
            </div>

            <p className="mt-2 flex items-center gap-1.5 text-[11px] font-medium text-teal-700">
              <ShieldCheck className="h-3.5 w-3.5" />
              Transparent pricing
            </p>
          </div>

          {/* Features */}
          <div className="mt-5 flex-1">
            <p className="mb-4 text-xs font-bold uppercase tracking-wider text-[#16425B]">
              What's Included
            </p>

            <ul className="space-y-3">
              {features.length ? (
                features.map(([key, value]) => (
                  <li
                    key={key}
                    className="flex items-start gap-2.5 text-xs leading-5 text-slate-600"
                  >
                    <span className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-teal-100">
                      <Check className="h-3 w-3 text-teal-700" />
                    </span>

                    <span>
                      {labels[key] || key}:{" "}
                      <strong className="font-semibold text-[#102A43]">
                        {value}
                      </strong>
                      /month
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-xs text-slate-500">
                  Contact us for plan features.
                </li>
              )}
            </ul>
          </div>

          {/* CTA */}
          <button
            type="button"
            onClick={() => onGetStarted?.(selectedPlan)}
            className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] px-5 py-3 text-sm font-extrabold text-[#062337] shadow-[0_8px_22px_rgba(20,184,166,0.16)] transition-all duration-300 hover:from-[#2DD4BF] hover:to-[#67E8F9] hover:shadow-[0_12px_28px_rgba(20,184,166,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
          >
            Get Started
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </article>
    );
  };

  return (
    <section className="relative isolate overflow-hidden border-y border-[#DCEFF3] bg-gradient-to-b from-[#EAF9FC] via-[#F8FCFF] to-[#EAF9F6] py-14 sm:py-20">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-20 h-96 w-96 rounded-full bg-teal-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-cyan-200/30 blur-3xl" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.09) 1px, transparent 1px)",
          backgroundSize: "55px 55px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm">
            <Zap className="h-3.5 w-3.5 text-teal-600" />

            <span className="text-[11px] font-bold uppercase tracking-widest text-teal-700">
              Flexible AI-Powered Plans
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl lg:text-4xl">
            Choose the{" "}
            <span className="bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0284C7] bg-clip-text text-transparent">
              Right Plan
            </span>{" "}
            for You
          </h2>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            Subscription plans and feature limits configured
            by CargoMate Admin.
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="mt-8 flex justify-center">
          <div className="inline-flex gap-1 rounded-full border border-[#CBEAE9] bg-white/90 p-1.5 shadow-[0_4px_18px_rgba(8,71,96,0.06)]">
            {["monthly", "yearly"].map((period) => (
              <button
                key={period}
                type="button"
                onClick={() => onBillingChange?.(period)}
                aria-pressed={billing === period}
                className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-300 ${
                  billing === period
                    ? "bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] text-[#062337] shadow-md"
                    : "text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                }`}
              >
                {period === "monthly"
                  ? "Monthly"
                  : "Yearly"}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Plans */}
        {hasRemote ? (
          datasets.map(
            ({ audience, heading, sub, icon: Icon }) => {
              const visible = plans.filter(
                (plan) =>
                  (plan.audience || "user") === audience &&
                  plan.planType === billing &&
                  plan.status === "active"
              );

              return (
                <div key={audience} className="mt-12">
                  {/* Category Heading */}
                  <div className="mb-6 flex items-center gap-3">
                    <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-teal-200 bg-white text-teal-600 shadow-sm">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <h3 className="text-xl font-extrabold text-[#102A43]">
                        {heading}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                        {sub}
                      </p>
                    </div>
                  </div>

                  {visible.length ? (
                    <div className="grid grid-cols-1 items-stretch gap-5 sm:grid-cols-2 lg:grid-cols-3">
                      {visible.map((plan, index) =>
                        renderPlanCard(
                          plan,
                          index,
                          audience
                        )
                      )}
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-[#D7EAF0] bg-white/80 px-5 py-6 text-sm text-slate-500">
                      No {heading.toLowerCase()} configured
                      for {billing} billing.
                    </div>
                  )}
                </div>
              );
            }
          )
        ) : loading ? (
          <div className="mt-12 text-center text-sm text-teal-700">
            Loading plans...
          </div>
        ) : (
          <div className="mt-12">
            <p className="mb-6 text-center text-xs text-amber-700">
              {failed
                ? "Default pricing displayed while admin plans are unavailable."
                : "No admin plans are available. Showing default pricing."}
            </p>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {pricingPlans.map((plan) => (
                <article
                  key={plan.id}
                  className="flex flex-col rounded-2xl border border-[#D7EAF0] bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
                    <Sparkles className="h-5 w-5" />
                  </div>

                  <h4 className="mt-4 text-lg font-bold text-[#102A43]">
                    {plan.name}
                  </h4>

                  <p className="my-5 text-3xl font-extrabold text-teal-700">
                    {plan.monthly === null
                      ? "Custom"
                      : `$${billing === "yearly" ? plan.yearly : plan.monthly}`}
                  </p>

                  <ul className="flex-1 space-y-3">
                    {plan.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs leading-5 text-slate-600"
                      >
                        <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-600" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => onGetStarted?.(plan)}
                    className="mt-6 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-400 to-cyan-300 px-4 py-3 text-sm font-bold text-[#062337] transition hover:from-teal-300 hover:to-cyan-200"
                  >
                    Get Started
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Trust Highlights */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-7 gap-y-3 border-t border-[#CFE7ED] pt-7">
          <span className="flex items-center gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 text-teal-600" />
            Transparent Pricing
          </span>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Check className="h-4 w-4 text-teal-600" />
            AI-Powered Features
          </span>

          <span className="flex items-center gap-2 text-xs text-slate-500">
            <Zap className="h-4 w-4 text-teal-600" />
            Built for Global Trade
          </span>
        </div>
      </div>
    </section>
  );
}
