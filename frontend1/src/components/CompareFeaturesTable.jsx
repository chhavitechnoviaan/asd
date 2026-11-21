// // // import { CheckCircle2, Minus } from "lucide-react";
// // // import { pricingPlans,compareRows } from "../data/pricingPlans";
// // // import { planFeatureLabels } from "./PricingPlanss";
// // // export default function CompareFeaturesTable({plans=[],billing="monthly"}){
// // //  const visible=plans.filter(p=>p.planType===billing&&p.status==="active").sort((a,b)=>a.audience.localeCompare(b.audience)||a.price-b.price);
// // //  const keys=[...new Set(visible.flatMap(p=>Object.keys(p.featureLimits||{})))];
// // //  return <section className="max-w-7xl mx-auto px-4 pb-16"><h2 className="text-center text-xl font-bold text-slate-900 mb-6">Compare Features</h2><div className="overflow-x-auto rounded-2xl border border-slate-200"><table className="min-w-[720px] w-full text-sm"><thead className="bg-slate-50"><tr><th className="text-left p-4">Feature</th>{visible.length?visible.map(p=><th className="text-center p-4" key={p._id}>{p.name}<span className="block text-xs font-medium text-teal-700">{p.audience==="b2b"?"B2B Plan":"User Plan"}</span><small className="text-slate-500">₹{p.price}/{billing==="yearly"?"year":"month"}</small></th>):pricingPlans.map(p=><th className="text-center p-4" key={p.id}>{p.name}</th>)}</tr></thead><tbody>{visible.length?keys.map(k=><tr key={k} className="border-t border-slate-100"><td className="p-4 font-medium">{planFeatureLabels[k]||k}</td>{visible.map(p=><td className="p-4 text-center" key={p._id}>{p.featureLimits?.[k]===undefined?"—":`${p.featureLimits[k]} / month`}</td>)}</tr>):compareRows.map(row=><tr key={row.label} className="border-t border-slate-100"><td className="p-4">{row.label}</td>{row.values.map((v,i)=><td className="p-4 text-center" key={i}>{row.isText?v:v?<CheckCircle2 size={17} className="text-teal-600 mx-auto"/>:<Minus size={17} className="text-slate-300 mx-auto"/>}</td>)}</tr>)}</tbody></table></div></section>
// // // }




// // import {
// //   CheckCircle2,
// //   Minus,
// //   GitCompareArrows,
// //   Sparkles,
// //   ShieldCheck,
// // } from "lucide-react";

// // import {
// //   pricingPlans,
// //   compareRows,
// // } from "../data/pricingPlans";

// // import { planFeatureLabels } from "./PricingPlanss";

// // export default function CompareFeaturesTable({
// //   plans = [],
// //   billing = "monthly",
// // }) {
// //   const visible = plans
// //     .filter(
// //       (plan) =>
// //         plan.planType === billing &&
// //         plan.status === "active"
// //     )
// //     .sort(
// //       (a, b) =>
// //         (a.audience || "user").localeCompare(
// //           b.audience || "user"
// //         ) ||
// //         Number(a.price || 0) - Number(b.price || 0)
// //     );

// //   const keys = [
// //     ...new Set(
// //       visible.flatMap((plan) =>
// //         Object.keys(plan.featureLimits || {})
// //       )
// //     ),
// //   ];

// //   const formatPrice = (price) =>
// //     Number(price || 0).toLocaleString("en-IN");

// //   return (
// //     <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#2563EB] via-[#7bbce7] to-[#2563EB] py-14 sm:py-20">

// //       {/* Background Effects */}
// //       <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-teal-500/10 blur-3xl" />

// //       <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

// //       {/* Subtle Grid */}
// //       <div
// //         className="pointer-events-none absolute inset-0 opacity-20"
// //         style={{
// //           backgroundImage:
// //             "linear-gradient(rgba(34,211,238,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.09) 1px, transparent 1px)",
// //           backgroundSize: "56px 56px",
// //         }}
// //       />

// //       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

// //         {/* Heading */}
// //         <div className="mx-auto mb-9 max-w-2xl text-center">

// //           <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/25 bg-[#2563EB]/10 px-4 py-2">
// //             <GitCompareArrows className="h-3.5 w-3.5 text-[#f8f8f8]" />

// //             <span className="text-[11px] font-bold uppercase tracking-widest text-[#ffffff]">
// //               Plan Comparison
// //             </span>
// //           </div>

// //           <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
// //             Compare{" "}
// //             <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
// //               Features
// //             </span>
// //           </h2>

// //           <p className="mt-3 text-sm leading-6 text-slate-300">
// //             Explore plan benefits, compare feature limits,
// //             and find the right CargoMate solution for
// //             your business.
// //           </p>
// //         </div>

// //         {/* Table Container */}
// //         <div className="overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#071F31]/90 shadow-[0_20px_65px_rgba(0,0,0,0.22)]">

// //           <div className="overflow-x-auto">
// //             <table className="w-full min-w-[720px] border-collapse text-sm">

// //               {/* Table Header */}
// //               <thead>
// //                 <tr className="border-b border-cyan-400/20 bg-gradient-to-r from-[#0B3046] via-[#0B344B] to-[#0B3046]">

// //                   <th
// //                     scope="col"
// //                     className="sticky left-0 z-20 min-w-[190px] border-r border-cyan-400/10 bg-[#0B3046] px-5 py-6 text-left"
// //                   >
// //                     <div className="flex items-center gap-2">
// //                       <Sparkles className="h-4 w-4 text-[#5EEAD4]" />

// //                       <span className="font-bold text-white">
// //                         Features
// //                       </span>
// //                     </div>

// //                     <p className="mt-2 text-[11px] font-normal text-slate-400">
// //                       Compare available benefits
// //                     </p>
// //                   </th>

// //                   {visible.length
// //                     ? visible.map((plan, index) => (
// //                         <th
// //                           scope="col"
// //                           key={plan._id || plan.id || index}
// //                           className="min-w-[160px] px-5 py-5 text-center"
// //                         >
// //                           <div className="flex flex-col items-center gap-2">

// //                             <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-teal-400/20 bg-teal-400/10 text-[#5EEAD4]">
// //                               <ShieldCheck className="h-4 w-4" />
// //                             </span>

// //                             <span className="text-sm font-bold text-white">
// //                               {plan.name}
// //                             </span>

// //                             <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-[10px] font-semibold text-[#99F6E4]">
// //                               {plan.audience === "b2b"
// //                                 ? "B2B Plan"
// //                                 : "User Plan"}
// //                             </span>

// //                             <span className="mt-1 text-base font-extrabold text-[#67E8F9]">
// //                               ₹{formatPrice(plan.price)}
// //                             </span>

// //                             <span className="text-[11px] font-normal text-slate-400">
// //                               /
// //                               {billing === "yearly"
// //                                 ? "year"
// //                                 : "month"}
// //                             </span>
// //                           </div>
// //                         </th>
// //                       ))
// //                     : pricingPlans.map((plan) => (
// //                         <th
// //                           scope="col"
// //                           key={plan.id}
// //                           className="min-w-[150px] px-5 py-6 text-center"
// //                         >
// //                           <span className="text-sm font-bold text-white">
// //                             {plan.name}
// //                           </span>
// //                         </th>
// //                       ))}
// //                 </tr>
// //               </thead>

// //               {/* Table Body */}
// //               <tbody>
// //                 {visible.length
// //                   ? keys.map((key, rowIndex) => (
// //                       <tr
// //                         key={key}
// //                         className={`group border-b border-white/[0.07] transition-colors hover:bg-cyan-400/[0.07] ${
// //                           rowIndex % 2 === 0
// //                             ? "bg-white/[0.025]"
// //                             : "bg-transparent"
// //                         }`}
// //                       >
// //                         <th
// //                           scope="row"
// //                           className="sticky left-0 z-10 border-r border-cyan-400/10 bg-[#092436] px-5 py-4 text-left text-xs font-semibold text-slate-200"
// //                         >
// //                           {planFeatureLabels[key] || key}
// //                         </th>

// //                         {visible.map((plan, index) => {
// //                           const value =
// //                             plan.featureLimits?.[key];

// //                           return (
// //                             <td
// //                               key={plan._id || plan.id || index}
// //                               className="px-5 py-4 text-center"
// //                             >
// //                               {value === undefined ||
// //                               value === null ? (
// //                                 <Minus className="mx-auto h-4 w-4 text-slate-500" />
// //                               ) : (
// //                                 <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-teal-400/15 bg-teal-400/[0.07] px-3 py-1.5 text-xs font-semibold text-[#99F6E4]">
// //                                   <CheckCircle2 className="h-3.5 w-3.5 shrink-0" />

// //                                   {String(value)} / month
// //                                 </span>
// //                               )}
// //                             </td>
// //                           );
// //                         })}
// //                       </tr>
// //                     ))
// //                   : compareRows.map((row, rowIndex) => (
// //                       <tr
// //                         key={row.label}
// //                         className={`border-b border-white/[0.07] transition-colors hover:bg-cyan-400/[0.07] ${
// //                           rowIndex % 2 === 0
// //                             ? "bg-white/[0.025]"
// //                             : "bg-transparent"
// //                         }`}
// //                       >
// //                         <th
// //                           scope="row"
// //                           className="sticky left-0 z-10 border-r border-cyan-400/10 bg-[#092436] px-5 py-4 text-left text-xs font-semibold text-slate-200"
// //                         >
// //                           {row.label}
// //                         </th>

// //                         {row.values.map((value, index) => (
// //                           <td
// //                             key={index}
// //                             className="px-5 py-4 text-center text-xs text-slate-300"
// //                           >
// //                             {row.isText ? (
// //                               <span className="font-medium text-[#A5F3FC]">
// //                                 {value}
// //                               </span>
// //                             ) : value ? (
// //                               <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-teal-400/10">
// //                                 <CheckCircle2 className="h-4 w-4 text-[#5EEAD4]" />
// //                               </span>
// //                             ) : (
// //                               <Minus className="mx-auto h-4 w-4 text-slate-500" />
// //                             )}
// //                           </td>
// //                         ))}
// //                       </tr>
// //                     ))}
// //               </tbody>
// //             </table>
// //           </div>

// //           {/* Table Footer */}
// //           <div className="flex flex-wrap items-center justify-between gap-3 border-t border-cyan-400/15 bg-[#092A3D] px-5 py-4">

// //             <span className="flex items-center gap-2 text-[11px] text-slate-400">
// //               <ShieldCheck className="h-4 w-4 text-[#5EEAD4]" />
// //               Compare CargoMate AI subscription features
// //             </span>

// //             <span className="rounded-full border border-teal-400/20 bg-teal-400/10 px-3 py-1 text-[10px] font-semibold text-[#99F6E4]">
// //               {billing === "monthly"
// //                 ? "Monthly Billing"
// //                 : "Yearly Billing"}
// //             </span>
// //           </div>
// //         </div>

// //         {/* Bottom Note */}
// //         <p className="mt-5 text-center text-xs leading-5 text-slate-400">
// //           Plan features and limits are based on the
// //           available subscription configuration.
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }



// import {
//   CheckCircle2,
//   Minus,
//   GitCompareArrows,
//   Sparkles,
//   ShieldCheck,
// } from "lucide-react";

// import {
//   pricingPlans,
//   compareRows,
// } from "../data/pricingPlans";

// import { planFeatureLabels } from "./PricingPlanss";

// export default function CompareFeaturesTable({
//   plans = [],
//   billing = "monthly",
// }) {
//   const visible = plans
//     .filter(
//       (plan) =>
//         plan.planType === billing &&
//         plan.status === "active"
//     )
//     .sort(
//       (a, b) =>
//         (a.audience || "user").localeCompare(
//           b.audience || "user"
//         ) ||
//         Number(a.price || 0) - Number(b.price || 0)
//     );

//   const keys = [
//     ...new Set(
//       visible.flatMap((plan) =>
//         Object.keys(plan.featureLimits || {})
//       )
//     ),
//   ];

//   const formatPrice = (price) =>
//     Number(price || 0).toLocaleString("en-IN");

//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#1677C8]/10 to-[#2563EB]/15 py-14 sm:py-20">

//       {/* Background Blue Glows */}
//       <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#1677C8]/10 blur-3xl" />

//       <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#2563EB]/10 blur-3xl" />

//       {/* Subtle Blue Grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-20"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(37,99,235,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,0.10) 1px, transparent 1px)",
//           backgroundSize: "56px 56px",
//         }}
//       />

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Heading */}
//         <div className="mx-auto mb-9 max-w-2xl text-center">

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 rounded-full border border-[#1677C8]/25 bg-white/90 px-4 py-2 shadow-sm">

//             <GitCompareArrows className="h-3.5 w-3.5 text-[#1677C8]" />

//             <span className="text-[11px] font-bold uppercase tracking-widest text-[#2563EB]">
//               Plan Comparison
//             </span>

//           </div>

//           {/* Main Heading */}
//           <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#2563EB] sm:text-3xl lg:text-4xl">

//             Compare{" "}

//             <span className="bg-gradient-to-r from-[#1677C8] to-[#2563EB] bg-clip-text text-transparent">
//               Features
//             </span>

//           </h2>

//           {/* Description */}
//           <p className="mt-3 text-sm leading-6 text-slate-600">
//             Explore plan benefits, compare feature limits,
//             and find the right CargoMate solution for
//             your business.
//           </p>
//         </div>

//         {/* Table Container */}
//         <div className="overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-white shadow-[0_20px_65px_rgba(37,99,235,0.12)]">

//           <div className="overflow-x-auto">
//             <table className="w-full min-w-[720px] border-collapse text-sm">

//               {/* Table Header */}
//               <thead>
//                 <tr className="border-b border-[#1677C8]/20 bg-gradient-to-r from-[#1677C8]/10 via-white to-[#2563EB]/10">

//                   {/* Features Header */}
//                   <th
//                     scope="col"
//                     className="sticky left-0 z-20 min-w-[190px] border-r border-[#1677C8]/15 bg-[#EFF6FF] px-5 py-6 text-left"
//                   >
//                     <div className="flex items-center gap-2">

//                       <Sparkles className="h-4 w-4 text-[#1677C8]" />

//                       <span className="font-bold text-[#2563EB]">
//                         Features
//                       </span>

//                     </div>

//                     <p className="mt-2 text-[11px] font-normal text-slate-500">
//                       Compare available benefits
//                     </p>
//                   </th>

//                   {/* Dynamic Plans */}
//                   {visible.length
//                     ? visible.map((plan, index) => (
//                         <th
//                           scope="col"
//                           key={plan._id || plan.id || index}
//                           className="min-w-[160px] px-5 py-5 text-center"
//                         >
//                           <div className="flex flex-col items-center gap-2">

//                             {/* Plan Icon */}
//                             <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-[#1677C8]/10 text-[#1677C8]">
//                               <ShieldCheck className="h-4 w-4" />
//                             </span>

//                             {/* Plan Name */}
//                             <span className="text-sm font-bold text-[#2563EB]">
//                               {plan.name}
//                             </span>

//                             {/* Plan Audience */}
//                             <span className="rounded-full border border-[#1677C8]/20 bg-[#1677C8]/10 px-3 py-1 text-[10px] font-semibold text-[#1677C8]">
//                               {plan.audience === "b2b"
//                                 ? "B2B Plan"
//                                 : "User Plan"}
//                             </span>

//                             {/* Plan Price */}
//                             <span className="mt-1 text-base font-extrabold text-[#2563EB]">
//                               ₹{formatPrice(plan.price)}
//                             </span>

//                             {/* Billing Period */}
//                             <span className="text-[11px] font-normal text-slate-500">
//                               /
//                               {billing === "yearly"
//                                 ? "year"
//                                 : "month"}
//                             </span>

//                           </div>
//                         </th>
//                       ))
//                     : pricingPlans.map((plan) => (
//                         <th
//                           scope="col"
//                           key={plan.id}
//                           className="min-w-[150px] px-5 py-6 text-center"
//                         >
//                           <span className="text-sm font-bold text-[#2563EB]">
//                             {plan.name}
//                           </span>
//                         </th>
//                       ))}

//                 </tr>
//               </thead>

//               {/* Table Body */}
//               <tbody>

//                 {visible.length
//                   ? keys.map((key, rowIndex) => (
//                       <tr
//                         key={key}
//                         className={`group border-b border-[#1677C8]/10 transition-colors hover:bg-[#1677C8]/10 ${
//                           rowIndex % 2 === 0
//                             ? "bg-white"
//                             : "bg-[#1677C8]/[0.03]"
//                         }`}
//                       >

//                         {/* Feature Name */}
//                         <th
//                           scope="row"
//                           className={`sticky left-0 z-10 border-r border-[#1677C8]/10 px-5 py-4 text-left text-xs font-semibold text-slate-700 ${
//                             rowIndex % 2 === 0
//                               ? "bg-white"
//                               : "bg-[#F4F9FF]"
//                           }`}
//                         >
//                           {planFeatureLabels[key] || key}
//                         </th>

//                         {/* Feature Values */}
//                         {visible.map((plan, index) => {
//                           const value =
//                             plan.featureLimits?.[key];

//                           return (
//                             <td
//                               key={plan._id || plan.id || index}
//                               className="px-5 py-4 text-center"
//                             >

//                               {value === undefined ||
//                               value === null ? (

//                                 <Minus className="mx-auto h-4 w-4 text-slate-400" />

//                               ) : (

//                                 <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#1677C8]/20 bg-[#1677C8]/10 px-3 py-1.5 text-xs font-semibold text-[#2563EB]">

//                                   <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#1677C8]" />

//                                   {String(value)} / month

//                                 </span>

//                               )}

//                             </td>
//                           );
//                         })}

//                       </tr>
//                     ))
//                   : compareRows.map((row, rowIndex) => (
//                       <tr
//                         key={row.label}
//                         className={`border-b border-[#1677C8]/10 transition-colors hover:bg-[#1677C8]/10 ${
//                           rowIndex % 2 === 0
//                             ? "bg-white"
//                             : "bg-[#1677C8]/[0.03]"
//                         }`}
//                       >

//                         {/* Feature Name */}
//                         <th
//                           scope="row"
//                           className={`sticky left-0 z-10 border-r border-[#1677C8]/10 px-5 py-4 text-left text-xs font-semibold text-slate-700 ${
//                             rowIndex % 2 === 0
//                               ? "bg-white"
//                               : "bg-[#F4F9FF]"
//                           }`}
//                         >
//                           {row.label}
//                         </th>

//                         {/* Feature Values */}
//                         {row.values.map((value, index) => (
//                           <td
//                             key={index}
//                             className="px-5 py-4 text-center text-xs text-slate-600"
//                           >

//                             {row.isText ? (

//                               <span className="font-medium text-[#2563EB]">
//                                 {value}
//                               </span>

//                             ) : value ? (

//                               <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#1677C8]/10">

//                                 <CheckCircle2 className="h-4 w-4 text-[#1677C8]" />

//                               </span>

//                             ) : (

//                               <Minus className="mx-auto h-4 w-4 text-slate-400" />

//                             )}

//                           </td>
//                         ))}

//                       </tr>
//                     ))}

//               </tbody>
//             </table>
//           </div>

//           {/* Table Footer */}
//           <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#1677C8]/15 bg-gradient-to-r from-[#1677C8]/10 to-[#2563EB]/10 px-5 py-4">

//             <span className="flex items-center gap-2 text-[11px] text-slate-600">

//               <ShieldCheck className="h-4 w-4 text-[#1677C8]" />

//               Compare CargoMate AI subscription features

//             </span>

//             <span className="rounded-full border border-[#1677C8]/20 bg-white px-3 py-1 text-[10px] font-semibold text-[#2563EB]">
//               {billing === "monthly"
//                 ? "Monthly Billing"
//                 : "Yearly Billing"}
//             </span>

//           </div>
//         </div>

//         {/* Bottom Note */}
//         <p className="mt-5 text-center text-xs leading-5 text-slate-500">
//           Plan features and limits are based on the
//           available subscription configuration.
//         </p>

//       </div>
//     </section>
//   );
// }


import {
  CheckCircle2,
  Minus,
  GitCompareArrows,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

import {
  pricingPlans,
  compareRows,
} from "../data/pricingPlans";

import { planFeatureLabels } from "./PricingPlanss";

export default function CompareFeaturesTable({
  plans = [],
  billing = "monthly",
}) {
  const visible = plans
    .filter(
      (plan) =>
        plan.planType === billing &&
        plan.status === "active"
    )
    .sort(
      (a, b) =>
        (a.audience || "user").localeCompare(
          b.audience || "user"
        ) ||
        Number(a.price || 0) - Number(b.price || 0)
    );

  const keys = [
    ...new Set(
      visible.flatMap((plan) =>
        Object.keys(plan.featureLimits || {})
      )
    ),
  ];

  const formatPrice = (price) =>
    Number(price || 0).toLocaleString("en-IN");

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#061A35] via-[#0B2F61] to-[#123E83] py-14 text-white sm:py-20">

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-40 top-10 h-96 w-96 rounded-full bg-[#1677C8]/20 blur-3xl" />

      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#2563EB]/25 blur-3xl" />

      {/* Digital Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.10) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#1677C8] to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 backdrop-blur-sm">
            <GitCompareArrows className="h-3.5 w-3.5 text-white" />

            <span className="text-[11px] font-bold uppercase tracking-widest text-white">
              Plan Comparison
            </span>
          </div>

          {/* Heading */}
          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
            Compare{" "}
            <span className="bg-gradient-to-r from-white via-[#93C5FD] to-[#60A5FA] bg-clip-text text-transparent">
              Features
            </span>
          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-white/75">
            Explore plan benefits, compare feature limits,
            and find the right CargoMate solution for
            your business.
          </p>
        </div>

        {/* Table Container */}
        <div className="overflow-hidden rounded-2xl border border-[#1677C8]/35 bg-[#071C39] shadow-[0_20px_65px_rgba(0,0,0,0.30)]">

          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] border-collapse text-sm">

              {/* Table Header */}
              <thead>
                <tr className="border-b border-white/15 bg-gradient-to-r from-[#123E83] via-[#2563EB] to-[#1677C8]">

                  {/* Features Column */}
                  <th
                    scope="col"
                    className="sticky left-0 z-20 min-w-[190px] border-r border-white/15 bg-[#123E83] px-5 py-6 text-left"
                  >
                    <div className="flex items-center gap-2">
                      <Sparkles className="h-4 w-4 text-white" />

                      <span className="font-bold text-white">
                        Features
                      </span>
                    </div>

                    <p className="mt-2 text-[11px] font-normal text-white/70">
                      Compare available benefits
                    </p>
                  </th>

                  {/* Dynamic Plans */}
                  {visible.length
                    ? visible.map((plan, index) => (
                        <th
                          scope="col"
                          key={plan._id || plan.id || index}
                          className="min-w-[160px] px-5 py-5 text-center"
                        >
                          <div className="flex flex-col items-center gap-2">

                            {/* Plan Icon */}
                            <span className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/25 bg-white/15 text-white">
                              <ShieldCheck className="h-4 w-4" />
                            </span>

                            {/* Plan Name */}
                            <span className="text-sm font-bold text-white">
                              {plan.name}
                            </span>

                            {/* Audience */}
                            <span className="rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[10px] font-semibold text-white">
                              {plan.audience === "b2b"
                                ? "B2B Plan"
                                : "User Plan"}
                            </span>

                            {/* Price */}
                            <span className="mt-1 text-base font-extrabold text-white">
                              ₹{formatPrice(plan.price)}
                            </span>

                            {/* Billing Period */}
                            <span className="text-[11px] font-normal text-white/75">
                              /
                              {billing === "yearly"
                                ? "year"
                                : "month"}
                            </span>
                          </div>
                        </th>
                      ))
                    : pricingPlans.map((plan) => (
                        <th
                          scope="col"
                          key={plan.id}
                          className="min-w-[150px] px-5 py-6 text-center"
                        >
                          <span className="text-sm font-bold text-white">
                            {plan.name}
                          </span>
                        </th>
                      ))}
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {visible.length
                  ? keys.map((key, rowIndex) => (
                      <tr
                        key={key}
                        className={`group border-b border-white/10 transition-colors hover:bg-[#2563EB]/20 ${
                          rowIndex % 2 === 0
                            ? "bg-[#071C39]"
                            : "bg-[#0B2850]"
                        }`}
                      >

                        {/* Feature Name */}
                        <th
                          scope="row"
                          className={`sticky left-0 z-10 border-r border-white/10 px-5 py-4 text-left text-xs font-semibold text-white ${
                            rowIndex % 2 === 0
                              ? "bg-[#071C39]"
                              : "bg-[#0B2850]"
                          }`}
                        >
                          {planFeatureLabels[key] || key}
                        </th>

                        {/* Feature Values */}
                        {visible.map((plan, index) => {
                          const value =
                            plan.featureLimits?.[key];

                          return (
                            <td
                              key={plan._id || plan.id || index}
                              className="px-5 py-4 text-center"
                            >
                              {value === undefined ||
                              value === null ? (
                                <Minus className="mx-auto h-4 w-4 text-white/40" />
                              ) : (
                                <span className="inline-flex items-center justify-center gap-1.5 rounded-lg border border-[#1677C8]/40 bg-[#2563EB]/20 px-3 py-1.5 text-xs font-semibold text-white">

                                  <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-[#60A5FA]" />

                                  {String(value)} / month
                                </span>
                              )}
                            </td>
                          );
                        })}
                      </tr>
                    ))
                  : compareRows.map((row, rowIndex) => (
                      <tr
                        key={row.label}
                        className={`border-b border-white/10 transition-colors hover:bg-[#2563EB]/20 ${
                          rowIndex % 2 === 0
                            ? "bg-[#071C39]"
                            : "bg-[#0B2850]"
                        }`}
                      >

                        {/* Feature Name */}
                        <th
                          scope="row"
                          className={`sticky left-0 z-10 border-r border-white/10 px-5 py-4 text-left text-xs font-semibold text-white ${
                            rowIndex % 2 === 0
                              ? "bg-[#071C39]"
                              : "bg-[#0B2850]"
                          }`}
                        >
                          {row.label}
                        </th>

                        {/* Feature Values */}
                        {row.values.map((value, index) => (
                          <td
                            key={index}
                            className="px-5 py-4 text-center text-xs text-white/80"
                          >
                            {row.isText ? (
                              <span className="font-medium text-[#93C5FD]">
                                {value}
                              </span>
                            ) : value ? (
                              <span className="mx-auto flex h-7 w-7 items-center justify-center rounded-full bg-[#2563EB]/25">
                                <CheckCircle2 className="h-4 w-4 text-[#60A5FA]" />
                              </span>
                            ) : (
                              <Minus className="mx-auto h-4 w-4 text-white/40" />
                            )}
                          </td>
                        ))}
                      </tr>
                    ))}
              </tbody>
            </table>
          </div>

          {/* Table Footer */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/15 bg-[#0B2850] px-5 py-4">

            <span className="flex items-center gap-2 text-[11px] text-white/75">
              <ShieldCheck className="h-4 w-4 text-[#60A5FA]" />
              Compare CargoMate AI subscription features
            </span>

            <span className="rounded-full border border-[#1677C8]/40 bg-[#2563EB]/20 px-3 py-1 text-[10px] font-semibold text-white">
              {billing === "monthly"
                ? "Monthly Billing"
                : "Yearly Billing"}
            </span>
          </div>
        </div>

        {/* Bottom Note */}
        <p className="mt-5 text-center text-xs leading-5 text-white/65">
          Plan features and limits are based on the
          available subscription configuration.
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB] to-transparent" />
    </section>
  );
}
