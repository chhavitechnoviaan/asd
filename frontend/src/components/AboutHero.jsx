// import portMapImage from "../assets/port-map.jpg";

// export default function AboutHero() {
//   return (
//     <div className="relative w-full h-64 sm:h-72 md:h-80 overflow-hidden">
//       <img
//         src={portMapImage}
//         alt="Global logistics network"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-blue-950/70" />
//       <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-white">
//           About ASD CargoMate
//         </h1>
//         <p className="mt-2 text-sm sm:text-base text-blue-200">
//           Smarter Decisions. Seamless Shipping. Powered by AI.
//         </p>
//         <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-2xl">
//           ASD CargoMate is an AI-powered logistics intelligence platform
//           built to simplify global shipping. We combine data, technology,
//           and industry expertise to help businesses plan, compare, and
//           ship with confidence.
//         </p>
//       </div>
//     </div>
//   );
// }

import { Sparkles, Globe2 } from "lucide-react";
import portMapImage from "../assets/port-map.jpg";

export default function AboutHero() {
  return (
    <section className="relative isolate w-full overflow-hidden border-b border-[#2563EB] bg-[#2563EB]">

      {/* Background Image - Full Visibility */}
      <img
        src={portMapImage}
        alt="Global logistics network"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      {/* Light Overlay - Text readable, image visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#F4FCFF]/95 via-[#EAF9FC]/75 to-[#EAF9FC]/10" />

      {/* Soft Cyan Glow */}
      <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-cyan-200/20 blur-3xl" />

      {/* Hero Content */}
      <div className="relative z-10 mx-auto flex min-h-[320px] max-w-6xl flex-col justify-center px-5 py-12 sm:px-8 md:min-h-[370px] lg:px-10">

        {/* Badge */}
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#2563EB] bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />

          <span className="text-[11px] font-semibold text-[#2563EB]">
            AI-POWERED GLOBAL LOGISTICS
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl md:text-5xl">
          About{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#60A5FA] bg-clip-text text-transparent">
            ASD CargoMate
          </span>
        </h1>

        {/* Subheading */}
        <p className="mt-4 max-w-xl text-base font-semibold text-[#1D5266] sm:text-lg">
          Smarter Decisions. Seamless Shipping.
          Powered by AI.
        </p>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-7 text-[#516A7B] sm:text-base">
          ASD CargoMate is an AI-powered logistics
          intelligence platform built to simplify global
          shipping. We combine data, technology, and
          industry expertise to help businesses plan,
          compare, and ship with confidence.
        </p>

        {/* Bottom Tagline */}
        <div className="mt-5 flex items-center gap-2">
          <Globe2 className="h-4 w-4 text-[#2563EB]" />

          <span className="text-xs font-semibold text-[#2563EB] sm:text-sm">
            Ask smarter. Plan better. Ship globally.
          </span>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-300 to-transparent" />
    </section>
  );
}
