// // import { useState } from "react";
// // import { Plus } from "lucide-react";
// // import { pricingFAQs } from "../data/pricingPlans";
// // import FAQAnswerModal from "./FAQAnswerModal";

// // export default function PricingFAQSection() {
// //   const [activeFAQ, setActiveFAQ] = useState(null);

// //   return (
// //     <div className="max-w-4xl mx-auto px-4 pb-12 sm:pb-16">
// //       <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900 mb-6">
// //         Frequently Asked Questions
// //       </h2>

// //       <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
// //         {pricingFAQs.map((faq) => (
// //           <button
// //             key={faq.id}
// //             onClick={() => setActiveFAQ(faq)}
// //             className="flex items-center justify-between bg-gray-50 rounded-lg px-4 py-3 text-left"
// //           >
// //             <span className="text-sm font-medium text-gray-800">
// //               {faq.question}
// //             </span>
// //             <Plus className="w-4 h-4 text-blue-600 shrink-0" />
// //           </button>
// //         ))}
// //       </div>

// //       <FAQAnswerModal faq={activeFAQ} onClose={() => setActiveFAQ(null)} />
// //     </div>
// //   );
// // }



// import { useState } from "react";
// import {
//   Plus,
//   HelpCircle,
//   Sparkles,
//   ArrowUpRight,
// } from "lucide-react";

// import { pricingFAQs } from "../data/pricingPlans";
// import FAQAnswerModal from "./FAQAnswerModal";

// export default function PricingFAQSection() {
//   const [activeFAQ, setActiveFAQ] = useState(null);

//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F8FCFF] via-[#F0FBFC] to-[#EAF8F8] py-12 sm:py-16">

//       {/* Background Glow */}
//       <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-cyan-200/25 blur-3xl" />

//       <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />

//       <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">

//         {/* Section Heading */}
//         <div className="mx-auto mb-9 max-w-2xl text-center">

//           <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm">
//             <Sparkles className="h-3.5 w-3.5 text-teal-600" />

//             <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
//               Help & Support
//             </span>
//           </div>

//           <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl">
//             Frequently Asked{" "}
//             <span className="bg-gradient-to-r from-[#0D9488] to-[#0284C7] bg-clip-text text-transparent">
//               Questions
//             </span>
//           </h2>

//           <p className="mt-3 text-sm leading-6 text-slate-500">
//             Find quick answers to common questions about
//             CargoMate pricing, subscriptions and features.
//           </p>
//         </div>

//         {/* FAQ Cards */}
//         <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

//           {pricingFAQs.map((faq, index) => (
//             <button
//               key={faq.id ?? index}
//               type="button"
//               onClick={() => setActiveFAQ(faq)}
//               aria-label={`View answer: ${faq.question}`}
//               className="group relative flex min-h-[88px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#D8EBF0] bg-white/90 px-5 py-5 text-left shadow-[0_4px_18px_rgba(8,71,96,0.04)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-gradient-to-br hover:from-white hover:to-[#F0FCFA] hover:shadow-[0_12px_28px_rgba(13,148,136,0.11)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
//             >

//               {/* Decorative Glow */}
//               <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-100/50 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

//               {/* Question */}
//               <div className="relative z-10 flex min-w-0 items-center gap-3">

//                 <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-teal-100 bg-gradient-to-br from-[#E5FAF6] to-[#EAF7FF] text-teal-600 transition-colors group-hover:border-teal-200 group-hover:bg-teal-50">
//                   <HelpCircle className="h-4 w-4" />
//                 </span>

//                 <span className="text-sm font-semibold leading-6 text-[#18364D] transition-colors group-hover:text-[#0D9488]">
//                   {faq.question}
//                 </span>
//               </div>

//               {/* Plus Icon */}
//               <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#D5EAF0] bg-[#F3FAFC] text-[#0D9488] transition-all duration-300 group-hover:rotate-90 group-hover:border-teal-400 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:text-white">
//                 <Plus className="h-4 w-4" />
//               </span>
//             </button>
//           ))}
//         </div>

//         {/* Bottom Note */}
//         {/* <div className="mt-8 flex items-center justify-center gap-2 text-center">
//           <ArrowUpRight className="h-4 w-4 text-teal-600" />

//           <p className="text-xs text-slate-500">
//             Click on any question to view the detailed answer.
//           </p>
//         </div> */}
//       </div>

//       {/* Existing FAQ Modal */}
//       <FAQAnswerModal
//         faq={activeFAQ}
//         onClose={() => setActiveFAQ(null)}
//       />
//     </section>
//   );
// }


import { useState } from "react";
import {
  Plus,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { pricingFAQs } from "../data/pricingPlans";
import FAQAnswerModal from "./FAQAnswerModal";

export default function PricingFAQSection() {
  const [activeFAQ, setActiveFAQ] = useState(null);

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#1677C8]/10 to-[#2563EB]/15 py-12 sm:py-16">

      {/* Background Blue Glows */}
      <div className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full bg-[#1677C8]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#2563EB]/15 blur-3xl" />

      {/* Subtle Digital Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.12) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Top Blue Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6">

        {/* Section Heading */}
        <div className="mx-auto mb-9 max-w-2xl text-center">

          {/* Help & Support Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1677C8]/25 bg-white/90 px-4 py-2 shadow-sm">

            <Sparkles className="h-3.5 w-3.5 text-[#1677C8]" />

            <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
              Help & Support
            </span>

          </div>

          {/* Main Heading */}
          <h2 className="mt-4 text-2xl font-extrabold tracking-tight text-[#2563EB] sm:text-3xl">

            Frequently Asked{" "}

            <span className="bg-gradient-to-r from-[#1677C8] to-[#2563EB] bg-clip-text text-transparent">
              Questions
            </span>

          </h2>

          {/* Description */}
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Find quick answers to common questions about
            CargoMate pricing, subscriptions and features.
          </p>

        </div>

        {/* FAQ Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">

          {pricingFAQs.map((faq, index) => (
            <button
              key={faq.id ?? index}
              type="button"
              onClick={() => setActiveFAQ(faq)}
              aria-label={`View answer: ${faq.question}`}
              className="group relative flex min-h-[88px] items-center justify-between gap-4 overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-white/95 px-5 py-5 text-left shadow-[0_4px_18px_rgba(37,99,235,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:bg-gradient-to-br hover:from-white hover:to-[#EFF6FF] hover:shadow-[0_12px_28px_rgba(37,99,235,0.15)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >

              {/* Animated Top Border */}
              <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1677C8] to-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />

              {/* Decorative Blue Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#1677C8]/15 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              {/* Question Content */}
              <div className="relative z-10 flex min-w-0 items-center gap-3">

                {/* Help Icon */}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-gradient-to-br from-[#1677C8]/10 to-[#2563EB]/10 text-[#1677C8] transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">

                  <HelpCircle className="h-4 w-4" />

                </span>

                {/* FAQ Question */}
                <span className="text-sm font-semibold leading-6 text-slate-700 transition-colors duration-300 group-hover:text-[#2563EB]">
                  {faq.question}
                </span>

              </div>

              {/* Plus Icon */}
              <span className="relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[#1677C8]/20 bg-[#1677C8]/10 text-[#2563EB] transition-all duration-300 group-hover:rotate-90 group-hover:border-[#2563EB] group-hover:bg-gradient-to-br group-hover:from-[#1677C8] group-hover:to-[#2563EB] group-hover:text-white">

                <Plus className="h-4 w-4" />

              </span>

            </button>
          ))}

        </div>

        {/* Bottom Note */}
        <div className="mt-8 flex items-center justify-center gap-2 text-center">

          <HelpCircle className="h-4 w-4 text-[#1677C8]" />

          <p className="text-xs text-slate-500">
            Click on any question to view the detailed answer.
          </p>

        </div>

      </div>

      {/* Existing FAQ Answer Modal */}
      <FAQAnswerModal
        faq={activeFAQ}
        onClose={() => setActiveFAQ(null)}
      />

      {/* Bottom Blue Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

    </section>
  );
}
