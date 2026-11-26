// // import { useState } from "react";
// // import { Bot, Package, Leaf, Boxes } from "lucide-react";
// // import RequestDemoModal from "./RequestDemoModal";
// // import ThankYouModal from "./ThankYouModal";

// // const stats = [
// //   { icon: Bot, value: "92%", label: "Smarter Automation" },
// //   { icon: Package, value: "3.5x", label: "Predictive Supply Chain" },
// //   { icon: Leaf, value: "40%", label: "Sustainability Insights" },
// //   { icon: Boxes, value: "120+", label: "Global Commodity" },
// // ];

// // export default function FutureSection() {
// //   const [showDemo, setShowDemo] = useState(false);
// //   const [showThankYou, setShowThankYou] = useState(false);

// //   const handleDemoSuccess = () => {
// //     setShowDemo(false);
// //     setShowThankYou(true);
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
// //       <p className="text-center text-xs font-semibold text-blue-600 uppercase">
// //         Future Ready
// //       </p>
// //       <h2 className="mt-1 text-center text-lg sm:text-xl font-bold text-gray-900">
// //         Building the Future of Logistics
// //       </h2>

// //       <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
// //         {stats.map(({ icon: Icon, value, label }) => (
// //           <div
// //             key={label}
// //             className="border border-gray-200 rounded-xl p-4 text-center"
// //           >
// //             <Icon className="w-5 h-5 text-blue-600 mx-auto" />
// //             <p className="mt-2 text-lg font-bold text-gray-900">{value}</p>
// //             <p className="text-xs text-gray-500">{label}</p>
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-8 bg-blue-700 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
// //         <div className="text-center sm:text-left">
// //           <p className="text-white font-bold">Ready to Ship Smarter?</p>
// //           <p className="text-blue-100 text-sm mt-0.5">
// //             Join thousands of businesses simplifying logistics with AI.
// //           </p>
// //         </div>
// //         <div className="flex gap-3 shrink-0">
// //           <button
// //             onClick={() => setShowDemo(true)}
// //             className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-5 py-2.5"
// //           >
// //             Request Demo
// //           </button>
// //           <button className="border border-white text-white text-sm font-semibold rounded-lg px-5 py-2.5">
// //             Explore Platform
// //           </button>
// //         </div>
// //       </div>

// //       {showDemo && (
// //         <RequestDemoModal
// //           onClose={() => setShowDemo(false)}
// //           onSuccess={handleDemoSuccess}
// //         />
// //       )}
// //       {showThankYou && (
// //         <ThankYouModal onClose={() => setShowThankYou(false)} />
// //       )}
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import {
//   Bot,
//   Package,
//   Leaf,
//   Boxes,
//   Sparkles,
//   ArrowUpRight,
//   ArrowRight,
// } from "lucide-react";

// import RequestDemoModal from "./RequestDemoModal";
// import ThankYouModal from "./ThankYouModal";

// const stats = [
//   {
//     icon: Bot,
//     value: "92%",
//     label: "Smarter Automation",
//     description: "Intelligent workflows",
//   },
//   {
//     icon: Package,
//     value: "3.5x",
//     label: "Predictive Supply Chain",
//     description: "Smarter forecasting",
//   },
//   {
//     icon: Leaf,
//     value: "40%",
//     label: "Sustainability Insights",
//     description: "Efficient operations",
//   },
//   {
//     icon: Boxes,
//     value: "120+",
//     label: "Global Commodity",
//     description: "Worldwide intelligence",
//   },
// ];

// export default function FutureSection({
//   onNavigate,
// }) {
//   const [showDemo, setShowDemo] = useState(false);
//   const [showThankYou, setShowThankYou] =
//     useState(false);

//   const handleDemoSuccess = () => {
//     setShowDemo(false);
//     setShowThankYou(true);
//   };

//   const handleExplore = () => {
//     onNavigate?.("AI Module");
//   };

//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F2FBFD] via-[#F8FCFF] to-[#EAF8FC]">

//       {/* Background Glow */}
//       <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />

//       <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

//       {/* Main Container */}
//       <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

//         {/* Section Header */}
//         <div className="text-center">

//           <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm">
//             <Sparkles className="h-3.5 w-3.5 text-teal-600" />

//             <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#089FAB]">
//               Future Ready
//             </span>
//           </div>

//           <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl lg:text-4xl">
//             Building the Future of{" "}
//             <span className="bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#38BDF8] bg-clip-text text-transparent">
//               Logistics
//             </span>
//           </h2>

//           <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
//             Empowering global trade with intelligent
//             automation, predictive insights, and
//             smarter logistics solutions.
//           </p>
//         </div>

//         {/* Statistics Cards */}
//         <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
//           {stats.map(
//             ({
//               icon: Icon,
//               value,
//               label,
//               description,
//             }) => (
//               <div
//                 key={label}
//                 className="group relative overflow-hidden rounded-2xl border border-[#D7EDF1] bg-white/85 p-5 text-center shadow-[0_8px_30px_rgba(8,71,96,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_16px_35px_rgba(6,182,212,0.12)] sm:p-6"
//               >

//                 {/* Icon */}
//                 <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#E0F2FE] text-[#089FAB] transition-transform duration-300 group-hover:scale-110">
//                   <Icon className="h-6 w-6" />
//                 </div>

//                 {/* Value */}
//                 <p className="mt-5 bg-gradient-to-r from-[#0D9488] to-[#0284C7] bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
//                   {value}
//                 </p>

//                 {/* Label */}
//                 <h3 className="mt-2 text-xs font-bold leading-5 text-[#102A43] sm:text-sm">
//                   {label}
//                 </h3>

//                 {/* Description */}
//                 <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
//                   {description}
//                 </p>

//                 {/* Bottom Hover Line */}
//                 <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
//               </div>
//             )
//           )}
//         </div>

//         {/* CTA Banner */}
      
// <div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#031525] via-[#06253B] to-[#073A4A] p-6 shadow-[0_20px_60px_rgba(0,20,40,0.22)] sm:p-8 lg:p-10">

//   {/* Subtle Grid Background */}
//   <div
//     className="pointer-events-none absolute inset-0 opacity-20"
//     style={{
//       backgroundImage:
//         "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
//       backgroundSize: "42px 42px",
//     }}
//   />

//   {/* Decorative Cyan & Teal Glows */}
//   <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

//   <div className="pointer-events-none absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />

//   {/* Top Accent Line */}
//   <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

//   {/* Main Content */}
//   <div className="relative z-10 flex flex-col items-center justify-between gap-7 lg:flex-row">

//     {/* CTA Text */}
//     <div className="max-w-xl text-center lg:text-left">

//       {/* Badge */}
//       <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 backdrop-blur-sm">
//         <Sparkles className="h-3.5 w-3.5 text-[#5EEAD4]" />

//         <span className="text-[10px] font-bold uppercase tracking-wider text-[#99F6E4]">
//           AI-Powered Global Logistics
//         </span>
//       </div>

//       {/* Heading */}
//       <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
//         Ready to{" "}
//         <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
//           Ship Smarter?
//         </span>
//       </h3>

//       {/* Description */}
//       <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
//         Join thousands of businesses simplifying
//         logistics with AI.
//       </p>
//     </div>

//     {/* CTA Buttons */}
//     <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

//       {/* Request Demo */}
//       <button
//         type="button"
//         onClick={() => setShowDemo(true)}
//         className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EEAD4] to-[#67E8F9] px-6 py-3 text-sm font-bold text-[#032337] shadow-[0_8px_25px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(34,211,238,0.35)]"
//       >
//         Request Demo

//         <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//       </button>

//       {/* Explore Platform */}
//       <button
//         type="button"
//         onClick={handleExplore}
//         className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10"
//       >
//         Explore Platform

//         <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
//       </button>
//     </div>
//   </div>
// </div>

//       </div>

//       {/* Request Demo Modal */}
//       {showDemo && (
//         <RequestDemoModal
//           onClose={() => setShowDemo(false)}
//           onSuccess={handleDemoSuccess}
//         />
//       )}

//       {/* Thank You Modal */}
//       {showThankYou && (
//         <ThankYouModal
//           onClose={() => setShowThankYou(false)}
//         />
//       )}
//     </section>
//   );
// }



import { useState } from "react";
import {
  Bot,
  Package,
  Leaf,
  Boxes,
  Sparkles,
  ArrowUpRight,
  ArrowRight,
} from "lucide-react";

import RequestDemoModal from "./RequestDemoModal";
import ThankYouModal from "./ThankYouModal";

const stats = [
  {
    icon: Bot,
    value: "92%",
    label: "Smarter Automation",
    description: "Intelligent workflows",
  },
  {
    icon: Package,
    value: "3.5x",
    label: "Predictive Supply Chain",
    description: "Smarter forecasting",
  },
  {
    icon: Leaf,
    value: "40%",
    label: "Sustainability Insights",
    description: "Efficient operations",
  },
  {
    icon: Boxes,
    value: "120+",
    label: "Global Commodity",
    description: "Worldwide intelligence",
  },
];

export default function FutureSection({
  onNavigate,
}) {
  const [showDemo, setShowDemo] = useState(false);
  const [showThankYou, setShowThankYou] =
    useState(false);

  const handleDemoSuccess = () => {
    setShowDemo(false);
    setShowThankYou(true);
  };

  const handleExplore = () => {
    onNavigate ? onNavigate("Contact Us") : window.location.assign("/contactpage");
  };

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F2FBFD] via-[#F8FCFF] to-[#EAF8FC]">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-28 top-10 h-72 w-72 rounded-full bg-[#1677C8]200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#1677C8]/30 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20">

        {/* Section Header */}
        <div className="text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#1677C8] bg-white/80 px-4 py-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#1677C8]" />

            <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#1677C8]">
              Future Ready
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl lg:text-4xl">
            Building the Future of{" "}
            <span className="bg-gradient-to-r from-[#1677C8] via-[#1677C8] to-[#38BDF8] bg-clip-text text-transparent">
              Logistics
            </span>
          </h2>

          <p className="mx-auto mt-3 max-w-2xl text-sm leading-7 text-slate-500">
            Empowering global trade with intelligent
            automation, predictive insights, and
            smarter logistics solutions.
          </p>
        </div>

        {/* Statistics Cards */}
        <div className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-5">
          {stats.map(
            ({
              icon: Icon,
              value,
              label,
              description,
            }) => (
              <div
                key={label}
                className="group relative overflow-hidden rounded-2xl border border-[#D7EDF1] bg-white/85 p-5 text-center shadow-[0_8px_30px_rgba(8,71,96,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-[#1677C8] hover:shadow-[0_16px_35px_rgba(6,182,212,0.12)] sm:p-6"
              >

                {/* Icon */}
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#E0F2FE] text-[#1677C8] transition-transform duration-300 group-hover:scale-110">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Value */}
                <p className="mt-5 bg-gradient-to-r from-[#1677C8] to-[#0284C7] bg-clip-text text-2xl font-extrabold text-transparent sm:text-3xl">
                  {value}
                </p>

                {/* Label */}
                <h3 className="mt-2 text-xs font-bold leading-5 text-[#102A43] sm:text-sm">
                  {label}
                </h3>

                {/* Description */}
                <p className="mt-1.5 text-[11px] leading-5 text-slate-500">
                  {description}
                </p>

                {/* Bottom Hover Line */}
                <div className="absolute bottom-0 left-0 h-[3px] w-0 bg-gradient-to-r from-[#1677C8] to-[#1677C8] transition-all duration-300 group-hover:w-full" />
              </div>
            )
          )}
        </div>

        {/* CTA Banner */}
      
<div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan-500/25 bg-gradient-to-br from-[#031525] via-[#1677C8] to-[#28c0ee] p-6 shadow-[0_20px_60px_rgba(0,20,40,0.22)] sm:p-8 lg:p-10">

  {/* Subtle Grid Background */}
  <div
    className="pointer-events-none absolute inset-0 opacity-20"
    style={{
      backgroundImage:
        "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
      backgroundSize: "42px 42px",
    }}
  />

  {/* Decorative Cyan & Teal Glows */}
  <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-400/20 blur-3xl" />

  <div className="pointer-events-none absolute -bottom-28 left-20 h-64 w-64 rounded-full bg-teal-400/15 blur-3xl" />

  {/* Top Accent Line */}
  <div className="absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

  {/* Main Content */}
  <div className="relative z-10 flex flex-col items-center justify-between gap-7 lg:flex-row">

    {/* CTA Text */}
    <div className="max-w-xl text-center lg:text-left">

      {/* Badge */}
      <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 backdrop-blur-sm">
        <Sparkles className="h-3.5 w-3.5 text-[#f6f7f8]" />

        <span className="text-[10px] font-bold uppercase tracking-wider text-[#f0f2f5]">
          AI-Powered Global Logistics
        </span>
      </div>

      {/* Heading */}
      <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
        Ready to{" "}
        <span className="bg-gradient-to-r from-[#09090a] via-[#0b0d0e] to-[#0f1113] bg-clip-text text-transparent">
          Ship Smarter?
        </span>
      </h3>

      {/* Description */}
      <p className="mt-3 max-w-lg text-sm leading-7 text-slate-300">
        Join thousands of businesses simplifying
        logistics with AI.
      </p>
    </div>

    {/* CTA Buttons */}
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">

      {/* Request Demo */}
      <button
        type="button"
        onClick={() => setShowDemo(true)}
        className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#fafbfc] to-[#f0f2f5] px-6 py-3 text-sm font-bold text-[#032337] shadow-[0_8px_25px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(34,211,238,0.35)]"
      >
        Request Demo

        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </button>

      {/* Explore Platform */}
      <button
        type="button"
        onClick={handleExplore}
        className="group inline-flex items-center justify-center gap-2 rounded-xl border border-cyan-300/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/60 hover:bg-cyan-300/10"
      >
        Explore Platform

        <ArrowRight className="h-4 w-4 text-cyan-300 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  </div>
</div>

      </div>

      {/* Request Demo Modal */}
      {showDemo && (
        <RequestDemoModal
          onClose={() => setShowDemo(false)}
          onSuccess={handleDemoSuccess}
        />
      )}

      {/* Thank You Modal */}
      {showThankYou && (
        <ThankYouModal
          onClose={() => setShowThankYou(false)}
        />
      )}
    </section>
  );
}
