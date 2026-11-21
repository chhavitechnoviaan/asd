// // // import ctaImage from "../assets/cta-banner.png";

// // // export default function CTABanner() {
// // //   return (
// // //     <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
// // //       <div className="relative rounded-2xl overflow-hidden h-56 sm:h-64 md:h-72">
// // //         <img
// // //           src={ctaImage}
// // //           alt="Global shipping network"
// // //           className="absolute inset-0 w-full h-full object-cover object-[center_40%]"
// // //         />
// // //         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-900/40 to-transparent" />
// // //         <div className="relative px-6 sm:px-10 py-10 sm:py-14 max-w-md">
// // //           <h2 className="text-xl sm:text-2xl font-bold text-white">
// // //             Ready to Ship Smarter?
// // //           </h2>
// // //           <p className="mt-2 text-sm text-blue-50">
// // //             Join thousands of businesses simplifying logistics with AI.
// // //           </p>
// // //           <button className="mt-6 bg-white text-blue-700 text-sm font-semibold rounded-lg px-6 py-2.5">
// // //             Explore Platform
// // //           </button>
// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }




// // import { ArrowUpRight, Sparkles, Globe2 } from "lucide-react";
// // import ctaImage from "../assets/cta-banner.png";

// // export default function CTABanner({ onNavigate }) {
// //   const handleExplore = () => {
// //     onNavigate?.("AI Module");
// //   };

// //   return (
// //     <section className="relative bg-[#03192C] px-4 py-12 sm:px-6 sm:py-10">
// //       <div className="mx-auto max-w-6xl">
// //         <div className="group relative isolate min-h-[300px] overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#041E32] shadow-[0_20px_60px_rgba(0,12,28,0.28)] sm:min-h-[320px]">
// //           {/* Existing background image */}
// //           <img
// //             src={ctaImage}
// //             alt="Global shipping network"
// //             className="absolute inset-0 h-full w-full object-cover object-[center_40%] opacity-60 transition-transform duration-700 group-hover:scale-105"
// //           />

// //           {/* Dark navy overlay */}
// //           <div className="absolute inset-0 bg-gradient-to-r from-[#031527]/95 via-[#052B40]/85 to-[#063C4A]/35" />

// //           {/* Bottom depth gradient */}
// //           <div className="absolute inset-0 bg-gradient-to-t from-[#021426]/60 via-transparent to-[#041D32]/20" />

// //           {/* Neon glow */}
// //           <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
// //           <div className="pointer-events-none absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />

// //           {/* Digital grid */}
// //           <div
// //             className="pointer-events-none absolute inset-0 opacity-[0.12]"
// //             style={{
// //               backgroundImage:
// //                 "linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)",
// //               backgroundSize: "55px 55px",
// //             }}
// //           />

// //           {/* Top accent */}
// //           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

// //           {/* Banner content */}
// //           <div className="relative z-10 flex min-h-[300px] flex-col justify-center px-6 py-10 sm:min-h-[320px] sm:px-10 md:px-14">
// //             <div className="max-w-xl">
// //               {/* Badge */}
// //               <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-teal-100 backdrop-blur-sm">
// //                 <Sparkles className="h-3.5 w-3.5 text-[#55E7DD]" />
// //                 AI-POWERED GLOBAL LOGISTICS
// //               </div>

// //               {/* Heading */}
// //               <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
// //                 Ready to Ship{" "}
// //                 <span className="bg-gradient-to-r from-[#53E5D6] via-[#5BE3F5] to-[#92C7FF] bg-clip-text text-transparent">
// //                   Smarter?
// //                 </span>
// //               </h2>

// //               {/* Description */}
// //               <p className="mt-4 max-w-md text-sm leading-7 text-slate-200 sm:text-base">
// //                 Join thousands of businesses simplifying
// //                 logistics with AI.
// //               </p>

// //               {/* CTA button */}
// //               <button
// //                 type="button"
// //                 onClick={handleExplore}
// //                 className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#55E7D6] to-[#55DDF4] px-7 py-3.5 text-sm font-bold text-[#042338] shadow-[0_10px_30px_rgba(34,211,238,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
// //               >
// //                 Explore Platform
// //                 <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
// //               </button>

// //               {/* Supporting tagline */}
// //               <div className="mt-7 flex items-center gap-2 text-xs text-cyan-100/75">
// //                 <Globe2 className="h-4 w-4 text-[#55D9E3]" />
// //                 <span>
// //                   Ask smarter. Plan better. Ship globally.
// //                 </span>
// //               </div>
// //             </div>
// //           </div>

// //           {/* Bottom neon line */}
// //           <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }




// import { ArrowUpRight, Sparkles, Globe2 } from "lucide-react";
// import ctaImage from "../assets/cta-banner.png";

// export default function CTABanner({ onNavigate }) {
//   const handleExplore = () => {
//     onNavigate ? onNavigate("Contact Us") : window.location.assign("/contactpage");
//   };

//   return (
//     <section className="relative bg-[#03192C] px-4 py-12 sm:px-6 sm:py-10">
//       <div className="mx-auto max-w-6xl">
//         <div className="group relative isolate min-h-[300px] overflow-hidden rounded-3xl border border-cyan-400/25 bg-[#041E32] shadow-[0_20px_60px_rgba(0,12,28,0.28)] sm:min-h-[320px]">
//           {/* Existing background image */}
//           <img
//             src={ctaImage}
//             alt="Global shipping network"
//             className="absolute inset-0 h-full w-full object-cover object-[center_40%] opacity-60 transition-transform duration-700 group-hover:scale-105"
//           />

//           {/* Dark navy overlay */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#031527]/95 via-[#052B40]/85 to-[#063C4A]/35" />

//           {/* Bottom depth gradient */}
//           <div className="absolute inset-0 bg-gradient-to-t from-[#021426]/60 via-transparent to-[#041D32]/20" />

//           {/* Neon glow */}
//           <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-teal-400/10 blur-3xl" />
//           <div className="pointer-events-none absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-cyan-400/15 blur-3xl" />

//           {/* Digital grid */}
//           <div
//             className="pointer-events-none absolute inset-0 opacity-[0.12]"
//             style={{
//               backgroundImage:
//                 "linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)",
//               backgroundSize: "55px 55px",
//             }}
//           />

//           {/* Top accent */}
//           <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />

//           {/* Banner content */}
//           <div className="relative z-10 flex min-h-[300px] flex-col justify-center px-6 py-10 sm:min-h-[320px] sm:px-10 md:px-14">
//             <div className="max-w-xl">
//               {/* Badge */}
//               <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-[11px] font-semibold tracking-wide text-teal-100 backdrop-blur-sm">
//                 <Sparkles className="h-3.5 w-3.5 text-[#55E7DD]" />
//                 AI-POWERED GLOBAL LOGISTICS
//               </div>

//               {/* Heading */}
//               <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//                 Ready to Ship{" "}
//                 <span className="bg-gradient-to-r from-[#53E5D6] via-[#5BE3F5] to-[#92C7FF] bg-clip-text text-transparent">
//                   Smarter?
//                 </span>
//               </h2>

//               {/* Description */}
//               <p className="mt-4 max-w-md text-sm leading-7 text-slate-200 sm:text-base">
//                 Join thousands of businesses simplifying
//                 logistics with AI.
//               </p>

//               {/* CTA button */}
//               <button
//                 type="button"
//                 onClick={handleExplore}
//                 className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#55E7D6] to-[#55DDF4] px-7 py-3.5 text-sm font-bold text-[#042338] shadow-[0_10px_30px_rgba(34,211,238,0.20)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_14px_35px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
//               >
//                 Explore Platform
//                 <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
//               </button>

//               {/* Supporting tagline */}
//               <div className="mt-7 flex items-center gap-2 text-xs text-cyan-100/75">
//                 <Globe2 className="h-4 w-4 text-[#55D9E3]" />
//                 <span>
//                   Ask smarter. Plan better. Ship globally.
//                 </span>
//               </div>
//             </div>
//           </div>

//           {/* Bottom neon line */}
//           <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
//         </div>
//       </div>
//     </section>
//   );
// }


import { ArrowUpRight, Sparkles, Globe2 } from "lucide-react";
import ctaImage from "../assets/cta-banner.png";

export default function CTABanner({ onNavigate }) {
  const handleExplore = () => {
    if (onNavigate) {
      onNavigate("Contact Us");
    } else {
      window.location.assign("/contactpage");
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#1677C8]/10 to-white px-4 py-12 sm:px-6 sm:py-14">

      {/* Outer Background Glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#1677C8]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">

        {/* Main CTA Banner */}
        <div className="group relative isolate min-h-[300px] overflow-hidden rounded-3xl border border-[#1677C8]/30 bg-[#eff1f3] shadow-[0_20px_60px_rgba(37,99,235,0.18)] sm:min-h-[320px]">

          {/* Existing Background Image */}
          <img
            src={ctaImage}
            alt="Global shipping network"
            className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-95 transition-transform duration-700 group-hover:scale-105"
          />

          {/* Royal Blue Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/95 via-[#1677C8]/85 to-[#2563EB]/45" />

          {/* Soft Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#2563EB]/35 via-transparent to-white/5" />

          {/* Blue Background Glows */}
          <div className="pointer-events-none absolute -left-20 -top-24 h-72 w-72 rounded-full bg-white/15 blur-3xl" />

          <div className="pointer-events-none absolute -right-24 -bottom-28 h-80 w-80 rounded-full bg-[#1677C8]/10 blur-3xl" />

          {/* Digital Grid */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          {/* Top Accent Line */}
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-white/70 to-transparent" />

          {/* Banner Content */}
          <div className="relative z-10 flex min-h-[300px] flex-col justify-center px-6 py-10 sm:min-h-[320px] sm:px-10 md:px-14">

            <div className="max-w-xl">

              {/* Top Badge */}
              <div className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/15 px-4 py-2 text-[11px] font-semibold tracking-wide text-white backdrop-blur-sm">

                <Sparkles className="h-3.5 w-3.5 text-white" />

                AI-POWERED GLOBAL LOGISTICS
              </div>

              {/* Heading */}
              <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">

                Ready to Ship{" "}

                <span className="bg-gradient-to-r from-white via-white to-[#FFFFFF] bg-clip-text text-transparent">
                  Smarter?
                </span>

              </h2>

              {/* Description */}
              <p className="mt-4 max-w-md text-sm leading-7 text-white/90 sm:text-base">
                Join thousands of businesses simplifying
                logistics with AI.
              </p>

              {/* CTA Button */}
              <button
                type="button"
                onClick={handleExplore}
                className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl border border-white bg-white px-7 py-3.5 text-sm font-bold text-[#2563EB] shadow-[0_10px_30px_rgba(37,99,235,0.20)] transition-all duration-300 hover:-translate-y-1 hover:border-[#1677C8] hover:bg-[#1677C8] hover:text-white hover:shadow-[0_14px_35px_rgba(37,99,235,0.30)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
              >
                Explore Platform

                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>

              {/* Supporting Tagline */}
              <div className="mt-7 flex items-center gap-2 text-xs text-white/85">

                <Globe2 className="h-4 w-4 text-white" />

                <span>
                  Ask smarter. Plan better. Ship globally.
                </span>

              </div>
            </div>
          </div>

          {/* Bottom Accent Line */}
          <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-white/50 to-transparent" />

        </div>
      </div>
    </section>
  );
}
