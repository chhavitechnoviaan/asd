// // import { MessageCircleQuestion } from "lucide-react";
// // import policyHeroImage from "../assets/policy-hero.jpg";

// // export default function PolicyPage({
// //   title,
// //   subtitle,
// //   items,
// //   lastUpdated,
// //   ctaQuestion,
// //   onClose,
// //   onContact,
// // }) {
// //   return (
// //     <div className="min-h-screen bg-gray-100 py-8 px-4">
// //       <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
// //         <div className="relative h-56 sm:h-64 overflow-hidden">
// //           <img
// //             src={policyHeroImage}
// //             alt="Cargo ship at night"
// //             className="absolute inset-0 w-full h-full object-cover"
// //           />
// //           <div className="absolute inset-0 bg-blue-950/40" />
// //           <div className="relative h-full flex flex-col justify-center px-5 sm:px-8">
// //             <h1 className="text-2xl sm:text-3xl font-bold text-white">
// //               {title}
// //             </h1>
// //             <p className="mt-2 text-sm text-blue-50 max-w-md">{subtitle}</p>
// //           </div>
// //         </div>

// //         <div className="p-5 sm:p-8">
// //           <div className="space-y-3">
// //             {items.map(({ icon: Icon, title: itemTitle, desc }, i) => (
// //               <div
// //                 key={itemTitle}
// //                 className="border border-gray-200 rounded-xl p-4 flex items-start gap-3"
// //               >
// //                 <Icon className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
// //                 <div>
// //                   <p className="text-sm font-bold text-blue-600">
// //                     {i + 1}. {itemTitle}
// //                   </p>
// //                   <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
// //                 </div>
// //               </div>
// //             ))}
// //           </div>

// //           <div className="mt-4 flex items-center justify-between">
// //             {lastUpdated && (
// //               <p className="text-xs text-gray-400">
// //                 Last Updated: {lastUpdated}
// //               </p>
// //             )}
// //             <button
// //               onClick={onClose}
// //               className="border border-gray-300 text-gray-700 text-sm font-semibold rounded-lg px-6 py-2 ml-auto"
// //             >
// //               Close
// //             </button>
// //           </div>

// //           <div className="mt-6 bg-blue-600 rounded-2xl p-5 sm:p-6 flex flex-col sm:flex-row items-center gap-4">
// //             <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center shrink-0">
// //               <MessageCircleQuestion className="w-5 h-5 text-white" />
// //             </div>
// //             <div className="flex-1 text-center sm:text-left">
// //               <p className="text-white font-bold">
// //                 Let's Connect and Grow Together
// //               </p>
// //               <p className="text-blue-100 text-sm mt-0.5">{ctaQuestion}</p>
// //             </div>
// //             <button onClick={onContact || (() => { window.location.href = "/contactpage"; })} className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-5 py-2 shrink-0">
// //               Contact us
// //             </button>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import {
//   MessageCircleQuestion,
//   ArrowRight,
//   ArrowLeft,
//   ShieldCheck,
//   CalendarDays,
//   Sparkles,
// } from "lucide-react";

// import policyHeroImage from "../assets/policy-hero.jpg";

// export default function PolicyPage({
//   title,
//   subtitle,
//   items = [],
//   lastUpdated,
//   ctaQuestion,
//   onClose,
//   onContact,
// }) {
//   const handleContact = () => {
//     if (onContact) {
//       onContact();
//     } else {
//       window.location.href = "/contactpage";
//     }
//   };

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[#031729] px-4 py-10 sm:px-6 sm:py-14">

//       {/* Background Glows */}
//       <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-teal-500/10 blur-3xl" />
//       <div className="pointer-events-none absolute -right-32 top-96 h-96 w-96 rounded-full bg-cyan-500/10 blur-3xl" />

//       <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-[#061E33] shadow-[0_25px_80px_rgba(0,0,0,0.25)]">

//         {/* HERO SECTION */}
//         <section className="relative isolate min-h-[280px] overflow-hidden sm:min-h-[330px]">

//           {/* Hero Image */}
//           <img
//             src={policyHeroImage}
//             alt="Global cargo shipping network"
//             className="absolute inset-0 h-full w-full object-cover object-center"
//           />

//           {/* Dark Overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#031729]/95 via-[#06243A]/85 to-[#06334A]/35" />

//           {/* Decorative Glow */}
//           <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

//           {/* Grid Pattern */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-20"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
//               backgroundSize: "48px 48px",
//             }}
//           />

//           {/* Hero Content */}
//           <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-6 py-10 sm:min-h-[330px] sm:px-10 lg:px-12">

//             {/* Badge */}
//             <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 backdrop-blur-sm">
//               <span className="h-2 w-2 rounded-full bg-teal-400 shadow-[0_0_10px_rgba(45,212,191,0.8)]" />

//               <span className="text-[10px] font-bold uppercase tracking-wider text-teal-200">
//                 ASD CargoMate • Legal & Policies
//               </span>
//             </div>

//             {/* Heading */}
//             <h1 className="max-w-2xl bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-3xl font-extrabold tracking-tight text-transparent sm:text-4xl lg:text-5xl">
//               {title}
//             </h1>

//             {/* Subtitle */}
//             <p className="mt-4 max-w-xl text-sm leading-7 text-slate-200 sm:text-base">
//               {subtitle}
//             </p>

//             {/* Last Updated */}
//             {lastUpdated && (
//               <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cyan-400/20 bg-[#082B43]/80 px-3 py-2 text-xs font-medium text-cyan-200">
//                 <CalendarDays className="h-4 w-4 text-teal-300" />
//                 Last Updated: {lastUpdated}
//               </div>
//             )}
//           </div>

//           {/* Bottom Glow Line */}
//           <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
//         </section>

//         {/* POLICY CONTENT */}
//         <section className="relative px-5 py-10 sm:px-8 sm:py-12 lg:px-12">

//           {/* Section Heading */}
//           <div className="mb-8">

//             <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-teal-300">
//               <Sparkles className="h-4 w-4" />
//               Important Information
//             </div>

//             <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
//               Policy{" "}
//               <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
//                 Guidelines
//               </span>
//             </h2>

//             <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-400">
//               Please review the following information to understand
//               our policies, responsibilities, and service guidelines.
//             </p>
//           </div>

//           {/* POLICY CARDS */}
//           <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
//             {items.map(
//               ({ icon: Icon, title: itemTitle, desc }, i) => (
//                 <article
//                   key={`${itemTitle}-${i}`}
//                   className="group relative overflow-hidden rounded-2xl border border-cyan-400/15 bg-gradient-to-br from-[#0B2A42]/90 to-[#071E33]/95 p-5 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-1 hover:border-teal-400/50 hover:shadow-[0_15px_35px_rgba(6,182,212,0.12)] sm:p-6"
//                 >

//                   {/* Card Glow */}
//                   <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-400/5 blur-3xl transition-all group-hover:bg-cyan-400/10" />

//                   <div className="relative flex items-start gap-4">

//                     {/* Icon Container */}
//                     <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-400/25 bg-gradient-to-br from-teal-400/15 to-cyan-400/10 text-teal-300">
//                       {Icon ? (
//                         <Icon className="h-5 w-5" />
//                       ) : (
//                         <ShieldCheck className="h-5 w-5" />
//                       )}
//                     </div>

//                     {/* Card Content */}
//                     <div className="min-w-0 flex-1">

//                       <span className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
//                         Section {String(i + 1).padStart(2, "0")}
//                       </span>

//                       <h3 className="mt-1 text-sm font-bold leading-6 text-white sm:text-base">
//                         {itemTitle}
//                       </h3>

//                       <p className="mt-2 text-xs leading-6 text-slate-300 sm:text-[13px]">
//                         {desc}
//                       </p>
//                     </div>
//                   </div>

//                   {/* Bottom Accent */}
//                   <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
//                 </article>
//               )
//             )}
//           </div>

//           {/* ACTION ROW */}
//           <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

//             <div className="inline-flex items-center gap-2 text-xs text-slate-400">
//               <ShieldCheck className="h-4 w-4 text-teal-400" />
//               Transparency. Trust. Global Trade.
//             </div>

//             <button
//               type="button"
//               onClick={onClose}
//               className="group inline-flex items-center gap-2 rounded-xl border border-cyan-400/25 bg-[#0B2A42] px-5 py-2.5 text-sm font-semibold text-slate-200 transition-all hover:border-teal-400/60 hover:bg-[#10344E] hover:text-white"
//             >
//               <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
//               Close
//             </button>
//           </div>

//           {/* CONTACT CTA */}
//           <div className="relative mt-10 overflow-hidden rounded-3xl border border-cyan-400/25 bg-gradient-to-r from-[#061B30] via-[#092E45] to-[#06384A] p-6 shadow-[0_12px_40px_rgba(0,0,0,0.15)] sm:p-8">

//             {/* Decorative Glows */}
//             <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
//             <div className="pointer-events-none absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-teal-400/10 blur-3xl" />

//             <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

//               {/* CTA Text */}
//               <div className="flex items-start gap-4">

//                 <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-teal-400/30 bg-teal-400/10">
//                   <MessageCircleQuestion className="h-6 w-6 text-teal-300" />
//                 </div>

//                 <div className="max-w-xl">

//                   <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-teal-300">
//                     <Sparkles className="h-3.5 w-3.5" />
//                     We're Here to Help
//                   </div>

//                   <h3 className="text-lg font-extrabold text-white sm:text-xl">
//                     Let's Connect and{" "}
//                     <span className="bg-gradient-to-r from-teal-300 to-cyan-300 bg-clip-text text-transparent">
//                       Grow Together
//                     </span>
//                   </h3>

//                   <p className="mt-2 text-sm leading-6 text-slate-300">
//                     {ctaQuestion}
//                   </p>
//                 </div>
//               </div>

//               {/* Contact Button */}
//               <button
//                 type="button"
//                 onClick={handleContact}
//                 className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EEAD4] to-[#67E8F9] px-6 py-3 text-sm font-bold text-[#06243A] shadow-[0_8px_22px_rgba(20,184,166,0.2)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(20,184,166,0.35)]"
//               >
//                 Contact Us

//                 <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
//               </button>
//             </div>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }





import {
  MessageCircleQuestion,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  CalendarDays,
  Sparkles,
} from "lucide-react";

import policyHeroImage from "../assets/policy-hero.jpg";

export default function PolicyPage({
  title,
  subtitle,
  items = [],
  lastUpdated,
  ctaQuestion,
  onClose,
  onContactSupport,
  onContact,
}) {
  const handleContact = () => {
    const contactHandler = onContactSupport || onContact;

    if (typeof contactHandler === "function") {
      contactHandler();
    } else {
      window.location.assign("/contactpage");
    }
  };

  const handleClose = () => {
    if (typeof onClose === "function") {
      onClose();
    } else {
      window.location.assign("/");
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-gradient-to-br from-white via-[#1677C8]/10 to-[#2563EB]/15 px-4 py-10 sm:px-6 sm:py-14">

      {/* Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-20 h-80 w-80 rounded-full bg-[#1677C8]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 top-96 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />

      {/* Main Container */}
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-[#1677C8]/20 bg-white shadow-[0_25px_80px_rgba(37,99,235,0.12)]">

        {/* HERO SECTION */}
        <section className="relative isolate min-h-[280px] overflow-hidden sm:min-h-[330px]">

          {/* Hero Image */}
          <img
            src={policyHeroImage}
            alt="Global cargo shipping network"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />

          {/* Royal Blue Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#123E83]/95 via-[#2563EB]/80 to-[#1677C8]/35" />

          {/* Decorative Glow */}
          <div className="pointer-events-none absolute -right-16 -top-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

          {/* Digital Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)",
              backgroundSize: "48px 48px",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 flex min-h-[280px] flex-col justify-center px-6 py-10 sm:min-h-[330px] sm:px-10 lg:px-12">

            {/* Badge */}
            <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/15 px-4 py-2 backdrop-blur-sm">

              <span className="h-2 w-2 rounded-full bg-white" />

              <span className="text-[10px] font-bold uppercase tracking-wider text-white">
                ASD CargoMate • Legal & Policies
              </span>

            </div>

            {/* Heading */}
            <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 max-w-xl text-sm leading-7 text-white/90 sm:text-base">
              {subtitle}
            </p>

            {/* Last Updated */}
            {lastUpdated && (
              <div className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/15 px-3 py-2 text-xs font-medium text-white backdrop-blur-sm">

                <CalendarDays className="h-4 w-4" />

                Last Updated: {lastUpdated}

              </div>
            )}

          </div>

          {/* Bottom Accent */}
          <div className="absolute inset-x-0 bottom-0 h-[3px] bg-gradient-to-r from-[#1677C8] via-white to-[#2563EB]" />

        </section>

        {/* POLICY CONTENT */}
        <section className="relative bg-gradient-to-b from-white via-[#F7FAFF] to-white px-5 py-10 sm:px-8 sm:py-12 lg:px-12">

          {/* Section Heading */}
          <div className="mb-8">

            <div className="mb-3 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#1677C8]">

              <Sparkles className="h-4 w-4" />

              Important Information

            </div>

            <h2 className="text-2xl font-extrabold text-[#2563EB] sm:text-3xl">

              Policy{" "}

              <span className="bg-gradient-to-r from-[#1677C8] to-[#2563EB] bg-clip-text text-transparent">
                Guidelines
              </span>

            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
              Please review the following information to understand
              our policies, responsibilities, and service guidelines.
            </p>

          </div>

          {/* POLICY CARDS */}
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

            {items.map(
              ({ icon: Icon, title: itemTitle, desc }, i) => (
                <article
                  key={`${itemTitle}-${i}`}
                  className="group relative overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-gradient-to-br from-white to-[#1677C8]/[0.06] p-5 shadow-[0_8px_30px_rgba(37,99,235,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-[0_15px_35px_rgba(37,99,235,0.15)] sm:p-6"
                >

                  {/* Card Glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-[#1677C8]/10 opacity-0 blur-3xl transition-opacity duration-300 group-hover:opacity-100" />

                  {/* Top Accent */}
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1677C8] to-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />

                  <div className="relative flex items-start gap-4">

                    {/* Icon Container */}
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-[#1677C8]/10 text-[#1677C8] transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">

                      {Icon ? (
                        <Icon className="h-5 w-5" />
                      ) : (
                        <ShieldCheck className="h-5 w-5" />
                      )}

                    </div>

                    {/* Card Content */}
                    <div className="min-w-0 flex-1">

                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#1677C8]">
                        Section {String(i + 1).padStart(2, "0")}
                      </span>

                      <h3 className="mt-1 text-sm font-bold leading-6 text-[#2563EB] sm:text-base">
                        {itemTitle}
                      </h3>

                      <p className="mt-2 text-xs leading-6 text-slate-600 sm:text-[13px]">
                        {desc}
                      </p>

                    </div>
                  </div>

                  {/* Bottom Accent */}
                  <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                </article>
              )
            )}

          </div>

          {/* ACTION ROW */}
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4">

            <div className="inline-flex items-center gap-2 text-xs text-slate-600">

              <ShieldCheck className="h-4 w-4 text-[#1677C8]" />

              Transparency. Trust. Global Trade.

            </div>

            {/* Close Button */}
            <button
              type="button"
              onClick={handleClose}
              className="group inline-flex items-center gap-2 rounded-xl border border-[#1677C8]/25 bg-white px-5 py-2.5 text-sm font-semibold text-[#2563EB] shadow-sm transition-all duration-300 hover:border-[#2563EB] hover:bg-[#2563EB] hover:text-white"
            >

              <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />

              Close

            </button>

          </div>

          {/* CONTACT CTA */}
          <div className="relative mt-10 overflow-hidden rounded-3xl border border-[#1677C8]/30 bg-gradient-to-r from-[#123E83] via-[#2563EB] to-[#1677C8] p-6 shadow-[0_12px_40px_rgba(37,99,235,0.18)] sm:p-8">

            {/* Decorative Glows */}
            <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

            <div className="pointer-events-none absolute -bottom-20 left-20 h-52 w-52 rounded-full bg-[#1677C8]/25 blur-3xl" />

            <div className="relative flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-center">

              {/* CTA Text */}
              <div className="flex items-start gap-4">

                {/* CTA Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/30 bg-white/15">

                  <MessageCircleQuestion className="h-6 w-6 text-white" />

                </div>

                <div className="max-w-xl">

                  <div className="mb-2 inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-white/85">

                    <Sparkles className="h-3.5 w-3.5" />

                    We're Here to Help

                  </div>

                  <h3 className="text-lg font-extrabold text-white sm:text-xl">

                    Let's Connect and{" "}

                    <span className="text-white">
                      Grow Together
                    </span>

                  </h3>

                  <p className="mt-2 text-sm leading-6 text-white/85">
                    {ctaQuestion}
                  </p>

                </div>
              </div>

              {/* Contact Button */}
              <button
                type="button"
                onClick={handleContact}
                className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-xl border border-white bg-white px-6 py-3 text-sm font-bold text-[#2563EB] shadow-[0_8px_22px_rgba(0,0,0,0.12)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#EFF6FF] hover:shadow-[0_12px_28px_rgba(0,0,0,0.18)]"
              >

                Contact Us

                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />

              </button>

            </div>
          </div>

        </section>
      </div>
    </main>
  );
}
