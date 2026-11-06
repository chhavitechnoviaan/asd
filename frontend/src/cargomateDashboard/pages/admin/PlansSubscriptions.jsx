// import Swal from "sweetalert2";
// import React,{useEffect,useState} from "react";
// import API from "../../api/axios";
// const featureNames={aiChatbot:"AI Chatbot",hsLookup:"HS Code Lookup",incentiveChecker:"Incentive Checker",shipmentPlanning:"Shipment Planning",shipmentCost:"Shipment Cost Analysis",governmentSchemes:"Government Schemes",countryRules:"Country Rules",tradeResearch:"B2B Trade Research"};
// const initial={name:"",audience:"user",tier:"Basic",planType:"monthly",price:0,featureLimits:{},features:[],description:""};
// export default function PlanSection(){const [plans,setPlans]=useState([]),[audience,setAudience]=useState("user"),[billing,setBilling]=useState("monthly"),[editing,setEditing]=useState(null),[form,setForm]=useState(initial),[error,setError]=useState(""),[saving,setSaving]=useState(false);
//  const reload=async()=>{try{const r=await API.get("/ai-subscription/plans");setPlans(r.data.data||[]);}catch(e){setError(e.response?.data?.message||"Unable to load plans")}};
//  useEffect(()=>{reload()},[]);
//  const submit=async e=>{e.preventDefault();setSaving(true);setError("");try{const data={...form,price:Number(form.price),featureLimits:Object.fromEntries(Object.entries(form.featureLimits||{}).map(([k,v])=>[k,Number(v)]))};if(editing)await API.patch(`/ai-subscription/plans/${editing}`,data);else await API.post("/ai-subscription/plans",data);setEditing(null);setForm(initial);await reload();await Swal.fire({icon:"success",title:"Plan saved",text:"Subscription plan updated successfully",confirmButtonColor:"#0D9488"});}catch(e){const msg=e.response?.data?.message||"Save failed";setError(msg);await Swal.fire({icon:"error",title:"Unable to save plan",text:msg,confirmButtonColor:"#0D9488"})}finally{setSaving(false)}};
//  return <div className="p-5 space-y-5 bg-gray-50 min-h-screen"><div className="flex justify-between flex-wrap items-center gap-3"><div><h1 className="text-2xl font-bold text-slate-900">Plan & Subscription</h1><p className="text-sm text-gray-500">Manage User and B2B AI plan prices, quotas and features</p></div><button onClick={()=>{setEditing(null);setForm({...initial,audience,planType:billing,name:`${audience.toUpperCase()} Basic`});}} className="rounded-lg bg-teal-600 text-white px-4 py-2">+ Add Plan</button></div>
//  <div className="flex gap-3"><select value={audience} onChange={e=>setAudience(e.target.value)} className="border rounded-lg px-3 py-2"><option value="user">User Plans</option><option value="b2b">B2B Plans</option></select><select value={billing} onChange={e=>setBilling(e.target.value)} className="border rounded-lg px-3 py-2"><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></div>
//  {error&&<p className="text-red-600">{error}</p>}
//  <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">{plans.filter(p=>p.audience===audience&&p.planType===billing).map(plan=><div key={plan._id} className={`overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg ${plan.tier?.toLowerCase()==="premium"?"border-teal-200 bg-gradient-to-b from-emerald-50 to-white":plan.tier?.toLowerCase()==="platinum"?"border-violet-200 bg-gradient-to-b from-violet-50 to-white":"border-blue-200 bg-gradient-to-b from-blue-50 to-white"} p-5`}><div className="flex justify-between"><h3 className="font-bold">{plan.name}</h3><button onClick={()=>{setEditing(plan._id);setForm({...initial,...plan,featureLimits:plan.featureLimits||{}})}} className="text-teal-700 text-sm">Edit</button></div><div className="text-3xl tracking-tight text-slate-900 font-extrabold my-4">₹{plan.price}<small className="font-normal text-xs"> / {billing}</small></div><p className="text-xs text-gray-500 mb-2">{plan.tier} · {plan.status}</p>{Object.entries(featureNames).filter(([k])=>audience==="b2b"||k!=="tradeResearch").map(([k,label])=><div key={k} className="flex justify-between border-b py-2 text-xs"><span>{label}</span><b>{plan.featureLimits?.[k]??0}</b></div>)}</div>)}</div>
//  {(editing||form.name)&&<form onSubmit={submit} className="bg-white border rounded-xl p-5 space-y-4 max-w-3xl"><h2 className="font-bold">{editing?"Edit Plan":"Add Plan"}</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-3"><label className="text-sm">Plan name<input required className="border rounded-lg p-2 w-full" value={form.name} onChange={e=>setForm({...form,name:e.target.value})}/></label><label className="text-sm">Price (₹)<input required min="0" type="number" className="border rounded-lg p-2 w-full" value={form.price} onChange={e=>setForm({...form,price:e.target.value})}/></label><label className="text-sm">Audience<select disabled={!!editing} className="border rounded-lg p-2 w-full" value={form.audience} onChange={e=>setForm({...form,audience:e.target.value})}><option value="user">User</option><option value="b2b">B2B</option></select></label><label className="text-sm">Tier<select disabled={!!editing} className="border rounded-lg p-2 w-full" value={form.tier} onChange={e=>setForm({...form,tier:e.target.value})}>{["Basic","Premium","Platinum"].map(x=><option key={x}>{x}</option>)}</select></label></div><label className="text-sm">Billing cycle<select className="border rounded-lg p-2 ml-2" value={form.planType} onChange={e=>setForm({...form,planType:e.target.value})}><option value="monthly">Monthly</option><option value="yearly">Yearly</option></select></label><h3 className="font-semibold">Monthly feature limits (0 = unavailable)</h3><div className="grid grid-cols-1 md:grid-cols-2 gap-3">{Object.entries(featureNames).filter(([k])=>form.audience==="b2b"||k!=="tradeResearch").map(([k,label])=><label key={k} className="text-xs">{label}<input type="number" min="0" className="border rounded-lg p-2 w-full" value={form.featureLimits?.[k]??0} onChange={e=>setForm({...form,featureLimits:{...form.featureLimits,[k]:e.target.value}})}/></label>)}</div><label className="text-sm block">Extra feature labels (comma separated)<input className="border rounded-lg p-2 w-full" value={(form.features||[]).join(", ")} onChange={e=>setForm({...form,features:e.target.value.split(",").map(x=>x.trim()).filter(Boolean)})}/></label><div className="flex gap-3"><button disabled={saving} className="bg-teal-600 text-white rounded-lg px-5 py-2">{saving?"Saving...":"Save Plan"}</button><button type="button" onClick={()=>{setEditing(null);setForm(initial)}} className="border rounded-lg px-5 py-2">Cancel</button></div></form>}
//  </div>;
// }

import React, { useCallback, useEffect, useMemo, useState } from "react";
import Swal from "sweetalert2";
import API from "../../api/axios";

const NAVY = "#002259";
const TEAL = "#14B8A6";

const FEATURE_NAMES = {
  aiChatbot: "AI Chatbot",
  hsLookup: "HS Code Lookup",
  incentiveChecker: "Incentive Checker",
  shipmentPlanning: "Shipment Planning",
  shipmentCost: "Shipment Cost Analysis",
  governmentSchemes: "Government Schemes",
  countryRules: "Country Rules",
  tradeResearch: "B2B Trade Research",
};

const TIER_THEME = {
  basic: {
    accent: "#2563EB",
    pale: "#EFF6FF",
    border: "#DBEAFE",
    tag: "Essential",
    icon: "✦",
  },
  premium: {
    accent: TEAL,
    pale: "#F0FDFA",
    border: "#99F6E4",
    tag: "Most popular",
    icon: "✧",
  },
  platinum: {
    accent: "#7C3AED",
    pale: "#F5F3FF",
    border: "#DDD6FE",
    tag: "Best value",
    icon: "◆",
  },
};

const createInitial = (audience = "user", planType = "monthly") => ({
  name: "",
  audience,
  tier: "Basic",
  planType,
  price: 0,
  featureLimits: {},
  features: [],
  description: "",
});

const money = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const ButtonIcon = ({ name, size = 18 }) => {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "plus")
    return (
      <svg {...common}>
        <path d="M12 5v14M5 12h14" />
      </svg>
    );
  if (name === "edit")
    return (
      <svg {...common}>
        <path d="m16 5 3 3-10 10-4 1 1-4L16 5Z" />
        <path d="m14 7 3 3" />
      </svg>
    );
  if (name === "close")
    return (
      <svg {...common}>
        <path d="M18 6 6 18M6 6l12 12" />
      </svg>
    );
  if (name === "check")
    return (
      <svg {...common}>
        <path d="m5 12 4 4L19 6" />
      </svg>
    );
  if (name === "calendar")
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="16" rx="2" />
        <path d="M7 3v4M17 3v4M3 10h18" />
      </svg>
    );
  if (name === "users")
    return (
      <svg {...common}>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 21v-2a6 6 0 0 1 12 0v2M17 6a3 3 0 0 1 0 6M17 15a5 5 0 0 1 4 5v1" />
      </svg>
    );
  if (name === "shield")
    return (
      <svg {...common}>
        <path d="m12 2 8 4v6c0 5-3.5 8.5-8 10-4.5-1.5-8-5-8-10V6l8-4Z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    );
  return null;
};

const showAlert = (type, title, text) =>
  Swal.fire({
    icon: type,
    title,
    text,
    confirmButtonText: "Okay",
    confirmButtonColor: NAVY,
    background: "#fff",
    color: NAVY,
    customClass: {
      popup: "cargomate-swal-popup",
      title: "cargomate-swal-title",
      confirmButton: "cargomate-swal-confirm",
    },
  });

const inputClass =
  "mt-1.5 h-11 w-full rounded-xl border border-[#DCE5EF] bg-white px-3.5 text-sm text-[#002259] outline-none transition focus:border-[#14B8A6] focus:ring-4 focus:ring-[#14B8A6]/10 disabled:bg-slate-100";
const labelClass = "block text-xs font-semibold tracking-wide text-[#4B6280]";

function PlanCard({ plan, onEdit, canEdit }) {
  const tier = String(plan.tier || "basic").toLowerCase();
  const palette = TIER_THEME[tier] || TIER_THEME.basic;
  const listed = Object.entries(FEATURE_NAMES).filter(
    ([key]) => plan.audience === "b2b" || key !== "tradeResearch",
  );
  const enabledCount = listed.filter(
    ([key]) => Number(plan.featureLimits?.[key] || 0) > 0,
  ).length;

  return (
    <article
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-[22px] border bg-white shadow-[0_8px_30px_rgba(0,34,89,0.055)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_44px_rgba(0,34,89,0.13)]"
      style={{ borderColor: palette.border }}
    >
      <div
        className="relative overflow-hidden px-5 pb-5 pt-5 sm:px-6"
        style={{
          background: `linear-gradient(135deg,${palette.pale},#ffffff 88%)`,
        }}
      >
        <div
          className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 rounded-full opacity-40"
          style={{ background: palette.border }}
        />
        <div className="relative flex items-start justify-between gap-2">
          <span
            className="inline-flex h-11 w-11 items-center justify-center rounded-2xl text-xl font-bold shadow-sm"
            style={{ background: "#fff", color: palette.accent }}
            aria-hidden="true"
          >
            {palette.icon}
          </span>
          <span
            className="rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide"
            style={{
              borderColor: palette.border,
              backgroundColor: "#ffffffcc",
              color: palette.accent,
            }}
          >
            {palette.tag}
          </span>
        </div>
        <div className="relative mt-4 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-xl font-extrabold text-[#002259]">
              {plan.name}
            </h3>
            <p className="mt-1 min-h-[34px] text-xs leading-relaxed text-[#5C718F]">
              {plan.description ||
                `Designed for ${plan.audience === "b2b" ? "growing businesses" : "individual users"} and trade professionals.`}
            </p>
          </div>
          {canEdit && (
            <button
              type="button"
              onClick={() => onEdit(plan)}
              className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-[#D8E4EC] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#002259] transition hover:border-[#14B8A6] hover:text-[#0D9488]"
              aria-label={`Edit ${plan.name}`}
            >
              <ButtonIcon name="edit" size={14} /> Edit
            </button>
          )}
        </div>
        <div className="relative mt-4 flex flex-wrap items-baseline gap-2">
          <strong className="text-[30px] font-black leading-none tracking-tight text-[#002259]">
            {money(plan.price)}
          </strong>
          <span className="text-xs font-medium text-[#5C718F]">
            / {plan.planType === "yearly" ? "year" : "month"}
          </span>
        </div>
        <div className="relative mt-4 flex flex-wrap items-center gap-2">
          <span
            className="rounded-full px-2.5 py-1 text-[11px] font-semibold"
            style={{
              color: plan.status === "inactive" ? "#B45309" : "#0F766E",
              background: plan.status === "inactive" ? "#FEF3C7" : "#CCFBF1",
            }}
          >
            {plan.status === "inactive" ? "Inactive" : "Active"}
          </span>
          <span className="text-[11px] font-medium text-[#6B8199]">
            {enabledCount} active features
          </span>
        </div>
      </div>
      <div className="flex flex-1 flex-col px-5 pb-5 pt-4 sm:px-6">
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.14em] text-[#8291A7]">
          Included monthly limits
        </p>
        <div className="flex-1 divide-y divide-[#ECF1F6]">
          {listed.map(([key, label]) => {
            const value = Number(plan.featureLimits?.[key] ?? 0);
            return (
              <div
                key={key}
                className="flex items-center justify-between gap-3 py-2.5 text-xs"
              >
                <span className="flex items-center gap-2 text-[#385573]">
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                    style={{ background: palette.pale, color: palette.accent }}
                  >
                    <ButtonIcon name="check" size={12} />
                  </span>
                  {label}
                </span>
                <strong
                  className={`whitespace-nowrap text-right ${value ? "text-[#002259]" : "text-[#A1ABBA]"}`}
                >
                  {value
                    ? `${value.toLocaleString("en-IN")} / mo`
                    : "Not included"}
                </strong>
              </div>
            );
          })}
        </div>
        {Array.isArray(plan.features) && plan.features.length > 0 && (
          <div className="mt-3 rounded-xl bg-[#F6F9FC] px-3 py-2 text-xs text-[#55708E]">
            + {plan.features.join(" · ")}
          </div>
        )}
        {canEdit && (
          <button
            type="button"
            onClick={() => onEdit(plan)}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white shadow-md transition hover:brightness-95 focus:outline-none focus:ring-4 focus:ring-[#14B8A6]/20"
            style={{
              background:
                tier === "premium"
                  ? TEAL
                  : tier === "platinum"
                    ? "#7C3AED"
                    : NAVY,
            }}
          >
            <ButtonIcon name="edit" size={16} /> Manage Plan
          </button>
        )}
      </div>
    </article>
  );
}

function PlanEditor({ form, setForm, editing, saving, onSubmit, onClose }) {
  const change = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));
  const features = Object.entries(FEATURE_NAMES).filter(
    ([key]) => form.audience === "b2b" || key !== "tradeResearch",
  );

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#00152F]/65 p-3 backdrop-blur-[5px] sm:p-6"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !saving) onClose();
      }}
      role="presentation"
    >
      <section
        className="flex max-h-[92dvh] w-full max-w-3xl flex-col overflow-hidden rounded-[24px] bg-white shadow-[0_24px_100px_rgba(0,17,50,0.32)]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="plan-editor-title"
      >
        <div className="relative shrink-0 overflow-hidden bg-[#0D9488] px-5 py-5 text-white sm:px-7">
          <div className="pointer-events-none absolute -right-14 -top-24 h-48 w-48 rounded-full bg-[#14B8A6]/25 blur-2xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="text-white">
              <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.18em] text-white">
                Plan management
              </p>
              <h2 id="plan-editor-title" className="text-xl font-extrabold text-white">
                {editing
                  ? "Edit Subscription Plan"
                  : "Create New Subscription Plan"}
              </h2>
              <p className="mt-1 text-xs text-white">
                Manage pricing, audience and monthly feature quotas.
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              aria-label="Close editor"
              className="rounded-xl border border-white/20 p-2 text-white/80 hover:bg-white/10"
            >
              <ButtonIcon name="close" size={19} />
            </button>
          </div>
        </div>
        <form
          id="plan-editor-form"
          onSubmit={onSubmit}
          className="min-h-0 flex-1 space-y-6 overflow-y-auto px-5 py-6 sm:px-7"
        >
          <div>
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E6FAF8] text-[#0D9488]">
                <ButtonIcon name="shield" size={17} />
              </span>
              <h3 className="font-bold text-[#002259]">Plan information</h3>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className={labelClass}>
                Plan name
                <input
                  autoFocus
                  required
                  maxLength={100}
                  className={inputClass}
                  value={form.name}
                  onChange={(e) => change("name", e.target.value)}
                  placeholder="e.g. Premium"
                />
              </label>
              <label className={labelClass}>
                Price (₹)
                <input
                  required
                  min="0"
                  step="0.01"
                  type="number"
                  className={inputClass}
                  value={form.price}
                  onChange={(e) => change("price", e.target.value)}
                />
              </label>
              <label className={labelClass}>
                Audience
                <select
                  disabled={Boolean(editing)}
                  className={inputClass}
                  value={form.audience}
                  onChange={(e) => change("audience", e.target.value)}
                >
                  <option value="user">User</option>
                  <option value="b2b">B2B</option>
                </select>
              </label>
              <label className={labelClass}>
                Plan tier
                <select
                  disabled={Boolean(editing)}
                  className={inputClass}
                  value={form.tier}
                  onChange={(e) => change("tier", e.target.value)}
                >
                  {["Basic", "Premium", "Platinum"].map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label className={labelClass}>
                Billing cycle
                <select
                  className={inputClass}
                  value={form.planType}
                  onChange={(e) => change("planType", e.target.value)}
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </label>
              <label className={labelClass}>
                Description
                <input
                  className={inputClass}
                  value={form.description || ""}
                  onChange={(e) => change("description", e.target.value)}
                  placeholder="Short plan description"
                />
              </label>
            </div>
          </div>
          <div>
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="font-bold text-[#002259]">
                  Feature usage limits
                </h3>
                <p className="mt-1 text-xs text-[#7185A0]">
                  Monthly quotas for each feature. Set 0 to disable access.
                </p>
              </div>
              <span className="whitespace-nowrap rounded-full bg-[#E6FAF8] px-3 py-1 text-[11px] font-bold text-[#0F766E]">
                Monthly quota
              </span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {features.map(([key, label]) => (
                <label
                  key={key}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[#E5ECF4] bg-[#FAFCFF] px-3 py-3.5"
                >
                  <span className="text-xs font-semibold leading-snug text-[#385573]">
                    {label}
                  </span>
                  <input
                    type="number"
                    min="0"
                    step="1"
                    className="h-9 w-24 shrink-0 rounded-lg border border-[#CBD8E6] bg-white px-2 text-right text-sm font-bold text-[#002259] outline-none focus:border-[#14B8A6]"
                    value={form.featureLimits?.[key] ?? 0}
                    onChange={(e) =>
                      setForm((prev) => ({
                        ...prev,
                        featureLimits: {
                          ...(prev.featureLimits || {}),
                          [key]: e.target.value,
                        },
                      }))
                    }
                    aria-label={`${label} monthly limit`}
                  />
                </label>
              ))}
            </div>
          </div>
          <label className={labelClass}>
            Extra feature labels (comma-separated)
            <input
              className={inputClass}
              value={(form.features || []).join(", ")}
              onChange={(e) =>
                change(
                  "features",
                  e.target.value
                    .split(",")
                    .map((x) => x.trim())
                    .filter(Boolean),
                )
              }
              placeholder="Priority support, Export reports"
            />
          </label>
        </form>
        <footer className="flex shrink-0 items-center justify-end gap-3 border-t border-[#E9EEF4] bg-[#F8FAFD] px-5 py-4 sm:px-7">
          <button
            type="button"
            disabled={saving}
            onClick={onClose}
            className="rounded-xl border border-[#D6E0EC] bg-white px-5 py-2.5 text-sm font-bold text-[#385573] hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            form="plan-editor-form"
            disabled={saving}
            className="inline-flex items-center gap-2 rounded-xl bg-[#14B8A6] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-teal-600/15 transition hover:bg-[#0D9488] disabled:cursor-wait disabled:opacity-60"
          >
            {saving ? (
              "Saving…"
            ) : (
              <>
                <ButtonIcon name="check" size={16} />{" "}
                {editing ? "Save Changes" : "Create Plan"}
              </>
            )}
          </button>
        </footer>
      </section>
    </div>
  );
}

export default function PlanSection({
  openCreateIntent = 0,
  permissions = null,
}) {
  const canAdd = permissions === null || permissions?.add === true;
  const canEdit = permissions === null || permissions?.edit === true;
  const canView = permissions === null || permissions?.view === true;
  const [plans, setPlans] = useState([]);
  const [audience, setAudience] = useState("user");
  const [billing, setBilling] = useState("monthly");
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(createInitial());
  const [editorOpen, setEditorOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const reload = useCallback(async () => {
    setLoading(true);
    try {
      const response = await API.get("/ai-subscription/plans");
      setPlans(response.data?.data || []);
      setError("");
    } catch (err) {
      const message = err.response?.data?.message || "Unable to load plans";
      setError(message);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (!editorOpen) return undefined;
    const onEscape = (event) => {
      if (event.key === "Escape" && !saving) setEditorOpen(false);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [editorOpen, saving]);

  const visiblePlans = useMemo(() => {
    const rank = { basic: 0, premium: 1, platinum: 2 };
    return plans
      .filter((plan) => plan.audience === audience && plan.planType === billing)
      .sort(
        (a, b) =>
          (rank[String(a.tier).toLowerCase()] ?? 99) -
          (rank[String(b.tier).toLowerCase()] ?? 99),
      );
  }, [plans, audience, billing]);

  const openNew = () => {
    if (!canAdd) return;
    setEditing(null);
    setForm({
      ...createInitial(audience, billing),
      name: `${audience === "b2b" ? "B2B" : "User"} Basic`,
    });
    setEditorOpen(true);
  };

  useEffect(() => {
    if (openCreateIntent > 0) openNew();
  }, [openCreateIntent]);

  const openEdit = (plan) => {
    if (!canEdit) return;
    setEditing(plan._id);
    setForm({
      ...createInitial(audience, billing),
      ...plan,
      featureLimits: { ...(plan.featureLimits || {}) },
      features: Array.isArray(plan.features) ? [...plan.features] : [],
    });
    setEditorOpen(true);
  };

  const submit = async (event) => {
    event.preventDefault();
    if (editing ? !canEdit : !canAdd) return;
    setSaving(true);
    setError("");
    try {
      const data = {
        ...form,
        price: Number(form.price),
        featureLimits: Object.fromEntries(
          Object.entries(form.featureLimits || {}).map(([key, value]) => [
            key,
            Number(value),
          ]),
        ),
      };
      if (editing) await API.patch(`/ai-subscription/plans/${editing}`, data);
      else await API.post("/ai-subscription/plans", data);
      setEditorOpen(false);
      setEditing(null);
      setForm(createInitial(audience, billing));
      await reload();
      await showAlert(
        "success",
        editing ? "Plan updated" : "Plan created",
        "Subscription plan saved successfully.",
      );
    } catch (err) {
      const message =
        err.response?.data?.message || "Unable to save plan. Please try again.";
      setError(message);
      await showAlert("error", "Unable to save plan", message);
    } finally {
      setSaving(false);
    }
  };

  if (!canView)
    return (
      <div role="alert" className="p-6 text-slate-600">
        You do not have permission to view subscription plans.
      </div>
    );

  return (
    <div className="cm-admin-teal-page min-h-screen bg-[#F9FAFB] px-1 py-1 text-[#002259] sm:px-1 lg:px-1">
      <style>{`.cargomate-swal-popup{border-radius:22px!important;border:1px solid #e0eeee!important;box-shadow:0 20px 80px rgba(0,34,89,.18)!important;backdrop-filter:blur(10px)}.cargomate-swal-title{color:#002259!important;font-weight:800!important}.cargomate-swal-confirm{border-radius:11px!important;padding:11px 28px!important;font-weight:700!important;background:linear-gradient(105deg,#002259,#14B8A6)!important}`}</style>
      <div className="mx-auto max-w-[1500px] space-y-6">
        <header className="cm-teal-hero relative overflow-hidden rounded-[24px] bg-[#0A8981] px-5 py-6 text-white shadow-[0_14px_44px_rgba(0,34,89,.15)] sm:px-7 sm:py-7">
          <div className="pointer-events-none absolute -right-12 -top-28 h-64 w-64 rounded-full bg-[#14B8A6]/15 blur-3xl" />
          <div className="relative flex flex-wrap items-center justify-between gap-5">
            <div className="flex items-start gap-3">
              <span className="mt-0.5 inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-[#5DE3D5]">
                <ButtonIcon name="shield" size={23} />
              </span>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#66E2D5]">
                  CargoMate Admin
                </span>
                <h1 className="mt-1 text-2xl font-black tracking-tight sm:text-[28px]">
                  Subscription Plans
                </h1>
                <p className="mt-1 text-sm text-white/70">
                  Create and manage User & B2B plan pricing, limits and
                  features.
                </p>
              </div>
            </div>
            {canAdd && (
              <button
                type="button"
                onClick={openNew}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-[#14B8A6] shadow-lg shadow-white/10 transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-white/15"
              >
                <ButtonIcon name="plus" size={19} /> Add New Plan
              </button>
            )}
          </div>
        </header>

        <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#E1E9F2] bg-white p-3 shadow-sm sm:px-5">
          <div className="flex flex-wrap items-center gap-3">
            <div
              className="flex rounded-xl bg-[#EFF4F8] p-1"
              role="tablist"
              aria-label="Audience"
            >
              {[
                ["user", "User Plans"],
                ["b2b", "B2B Plans"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={audience === value}
                  onClick={() => setAudience(value)}
                  className={`rounded-lg px-4 py-2.5 text-xs font-bold transition sm:text-sm ${audience === value ? "bg-[#0A8981] text-white shadow-sm" : "text-[#6C7F99] hover:text-[#002259]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
            <div className="hidden h-7 w-px bg-[#E1E9F2] sm:block" />
            <div
              className="flex rounded-xl bg-[#EFF4F8] p-1"
              role="tablist"
              aria-label="Billing cycle"
            >
              {[
                ["monthly", "Monthly"],
                ["yearly", "Yearly"],
              ].map(([value, label]) => (
                <button
                  key={value}
                  role="tab"
                  aria-selected={billing === value}
                  onClick={() => setBilling(value)}
                  className={`rounded-lg px-4 py-2.5 text-xs font-bold transition sm:text-sm ${billing === value ? "bg-[#14B8A6] text-white shadow-sm" : "text-[#6C7F99] hover:text-[#002259]"}`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full bg-[#E6FAF8] px-3 py-2 text-xs font-bold text-[#0F766E]">
            <ButtonIcon name="users" size={15} />
            {visiblePlans.length} Plans
          </span>
        </section>

        <div>
          <h2 className="text-xl font-extrabold text-[#002259]">
            {audience === "b2b" ? "B2B Panel Plans" : "User Panel Plans"}
          </h2>
          <p className="mt-1 text-sm text-[#7185A0]">
            Plans shown to{" "}
            {audience === "b2b"
              ? "businesses and logistics partners"
              : "individual users and small businesses"}
            .
          </p>
        </div>

        {error && (
          <div
            role="alert"
            className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700"
          >
            {error}{" "}
            <button type="button" className="ml-3 underline" onClick={reload}>
              Retry
            </button>
          </div>
        )}

        {loading ? (
          <div className="grid gap-5 lg:grid-cols-3">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="h-[440px] animate-pulse rounded-[22px] border border-[#E1E9F2] bg-white p-6"
              >
                <div className="h-12 w-12 rounded-xl bg-slate-100" />
                <div className="mt-6 h-5 w-32 rounded bg-slate-100" />
                <div className="mt-5 h-9 w-40 rounded bg-slate-100" />
                <div className="mt-8 space-y-4">
                  {[0, 1, 2, 3, 4].map((x) => (
                    <div key={x} className="h-4 rounded bg-slate-100" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : visiblePlans.length ? (
          <div className="grid items-stretch gap-5 md:grid-cols-2 xl:grid-cols-3">
            {visiblePlans.map((plan) => (
              <PlanCard
                key={plan._id}
                plan={plan}
                onEdit={openEdit}
                canEdit={canEdit}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-[22px] border border-dashed border-[#B8D9DD] bg-white px-5 py-14 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E6FAF8] text-[#0D9488]">
              <ButtonIcon name="plus" size={25} />
            </div>
            <h3 className="mt-4 text-lg font-bold text-[#002259]">
              No plans found
            </h3>
            <p className="mt-2 text-sm text-[#7185A0]">
              Create your first {audience.toUpperCase()} {billing} plan to get
              started.
            </p>
            {canAdd && (
              <button
                type="button"
                onClick={openNew}
                className="mt-5 rounded-xl bg-[#14B8A6] px-5 py-2.5 text-sm font-bold text-white"
              >
                Create Plan
              </button>
            )}
          </div>
        )}

        {/* <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-[#DDE9F1] bg-white p-4 text-xs text-[#5C718F]">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#E6FAF8] text-[#0D9488]">
            <ButtonIcon name="calendar" size={19} />
          </span>
          <p className="flex-1">
            <strong className="text-[#002259]">Subscription management:</strong>{" "}
            Prices and limits are controlled by Admin. A value of 0 means the
            feature is unavailable. These limits are per month even when billing
            is yearly.
          </p>
        </div> */}
      </div>

      {editorOpen && (editing ? canEdit : canAdd) && (
        <PlanEditor
          form={form}
          setForm={setForm}
          editing={editing}
          saving={saving}
          onSubmit={submit}
          onClose={() => {
            setEditorOpen(false);
            setEditing(null);
          }}
        />
      )}
    </div>
  );
}
