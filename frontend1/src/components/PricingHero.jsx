// import { Ban, Bookmark } from "lucide-react";
// import pricingHeroImage from "../assets/pricing-hero.png";

// export default function PricingHero() {
//   return (
//     <div className="relative w-full h-64 sm:h-72 md:h-80 bg-blue-950 overflow-hidden">
//       <img
//         src={pricingHeroImage}
//         alt="Global logistics network"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-blue-950/40" />
//       <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-white leading-snug">
//           Simple, Transparent Pricing
//           <br />
//           Built for <span className="text-blue-400">Every Business</span>
//         </h1>
//         <p className="mt-3 text-sm text-blue-100 max-w-md">
//           Choose the plan that fits your needs and scale as you grow. All
//           plans include access to our core AI-powered features.
//         </p>
//         <div className="mt-4 flex items-center gap-5 text-xs text-blue-100">
//           <span className="flex items-center gap-1.5">
//             <Ban className="w-3.5 h-3.5" />
//             No Setup Fees
//           </span>
//           <span className="flex items-center gap-1.5">
//             <Bookmark className="w-3.5 h-3.5" />
//             Cancel Anytime
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Ban, Bookmark, Sparkles } from "lucide-react";
import pricingHeroImage from "../assets/pricing-hero.png";

export default function PricingHero() {
  return (
    <section className="relative isolate w-full min-h-[340px] overflow-hidden border-b border-cyan-400/20 bg-[#03182B] sm:min-h-[380px] lg:min-h-[410px]">

      {/* Background Image - Keep Visible */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={pricingHeroImage}
          alt="Global logistics network"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-95"
        />

        {/* Dark Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/65 via-[#ffff]/15 to-[#06334A]/25" />

        {/* Subtle Navy Tint */}
        <div className="absolute inset-0 bg-[#001426]/10" />
      </div>

      {/* Decorative Neon Glows */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />

      <div className="pointer-events-none absolute bottom-0 right-1/4 h-48 w-72 rounded-full bg-[#2563EB]/10 blur-3xl" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[340px] max-w-6xl flex-col justify-center px-5 py-12 sm:min-h-[380px] sm:px-8 lg:min-h-[410px]">

        {/* Badge */}
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/35 bg-teal-400/10 px-4 py-2 shadow-[0_0_20px_rgba(20,184,166,0.08)] backdrop-blur-md">

          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2563EB]/15">
            <Sparkles className="h-3.5 w-3.5 text-[#ffffff]" />
          </span>

          <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#ffffff] sm:text-[11px]">
            Flexible Plans for Global Trade
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl text-3xl font-extrabold leading-[1.2] tracking-tight text-white sm:text-4xl lg:text-[44px]">

          Simple, Transparent
          <br />

          <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#2563EB] bg-clip-text text-transparent">
            Pricing
          </span>

          <br />

          <span className="text-white">
            Built for Every Business
          </span>
        </h1>

        {/* Description */}
        <p className="mt-5 max-w-xl text-sm leading-7 text-slate-300 sm:text-[15px]">
          Choose the plan that fits your needs and scale as you grow.
          All plans include access to our core AI-powered features.
        </p>

        {/* Feature Badges */}
        <div className="mt-7 flex flex-wrap items-center gap-3">

          {/* No Setup Fees */}
          <div className="group inline-flex items-center gap-2.5 rounded-xl border border-cyan-400/25 bg-[#082C43]/75 px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-400/15">
              <Ban className="h-4 w-4 text-[#2563EB]" />
            </span>

            <span className="text-xs font-semibold text-slate-100">
              No Setup Fees
            </span>
          </div>

          {/* Cancel Anytime */}
          <div className="group inline-flex items-center gap-2.5 rounded-xl border border-cyan-400/25 bg-[#082C43]/75 px-4 py-2.5 shadow-[0_4px_20px_rgba(0,0,0,0.12)] backdrop-blur-md transition-all duration-300 hover:border-cyan-300/60 hover:bg-cyan-400/10">

            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-400/15">
              <Bookmark className="h-4 w-4 text-[#2563EB]" />
            </span>

            <span className="text-xs font-semibold text-slate-100">
              Cancel Anytime
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Neon Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
    </section>
  );
}
