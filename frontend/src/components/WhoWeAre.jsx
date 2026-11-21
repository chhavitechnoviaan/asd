// // import { Target, Compass, Rocket } from "lucide-react";
// // import globeShipImage from "../assets/globe-ship.jpg";

// // const tabs = [
// //   { icon: Target, label: "Our Purpose" },
// //   { icon: Compass, label: "Our Direction" },
// //   { icon: Rocket, label: "Our Ambition" },
// // ];

// // export default function WhoWeAre() {
// //   return (
// //     <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
// //       <p className="text-xs font-semibold text-blue-600 uppercase">
// //         Company Story
// //       </p>
// //       <h2 className="mt-1 text-xl sm:text-2xl font-bold text-gray-900">
// //         Built for a Complex World of Logistics
// //       </h2>
// //       <p className="mt-2 text-sm text-gray-500 max-w-2xl">
// //         ASD CargoMate was built to simplify the complexity of global
// //         logistics, helping businesses of every size discover better routes,
// //         compare rates, and ship with confidence using real-time, AI-driven
// //         intelligence.
// //       </p>

// //       <div className="mt-6 rounded-2xl overflow-hidden relative h-48 sm:h-56">
// //         <img
// //           src={globeShipImage}
// //           alt="Global shipping network"
// //           className="absolute inset-0 w-full h-full object-cover"
// //         />
// //       </div>

// //       <div className="mt-6 flex items-center gap-4">
// //         {tabs.map(({ icon: Icon, label }) => (
// //           <div key={label} className="flex items-center gap-1.5 text-xs text-gray-500">
// //             <Icon className="w-4 h-4 text-blue-600" />
// //             {label}
// //           </div>
// //         ))}
// //       </div>

// //       <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
// //         <div>
// //           <p className="text-sm font-bold text-gray-900">Vision</p>
// //           <p className="mt-1 text-xs text-gray-500">
// //             To become the world's most trusted AI-powered logistics
// //             intelligence platform, connecting businesses and markets
// //             seamlessly across borders.
// //           </p>
// //         </div>
// //         <div>
// //           <p className="text-sm font-bold text-gray-900">Mission</p>
// //           <p className="mt-1 text-xs text-gray-500">
// //             To simplify global shipping through smart insights, automation,
// //             and transparent, real-time data for every stakeholder in the
// //             trade chain.
// //           </p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// import {
//   Target,
//   Compass,
//   Rocket,
//   Eye,
//   Flag,
//   ArrowUpRight,
//   Globe2,
//   Sparkles,
// } from "lucide-react";

// import globeShipImage from "../assets/globe-ship.jpg";

// const tabs = [
//   {
//     icon: Target,
//     label: "Our Purpose",
//   },
//   {
//     icon: Compass,
//     label: "Our Direction",
//   },
//   {
//     icon: Rocket,
//     label: "Our Ambition",
//   },
// ];

// export default function WhoWeAre() {
//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#031827] via-[#061F34] to-[#063747] py-14 text-white sm:py-20">

//       {/* Background Grid */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.12]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(56,189,248,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.25) 1px, transparent 1px)",
//           backgroundSize: "56px 56px",
//         }}
//       />

//       {/* Cyan Glow */}
//       <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl" />

//       <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

//       {/* Main Container */}
//       <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">

//         {/* Heading Section */}
//         <div className="max-w-3xl">

//           {/* Badge */}
//           {/* <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2">
//             <Sparkles className="h-3.5 w-3.5 text-[#5EEAD4]" />

//             <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#A5F3FC]">
//               Company Story
//             </span>
//           </div> */}

//           {/* Title */}
//           <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
//             Built for a{" "}
//             <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
//               Complex World
//             </span>{" "}
//             of Logistics
//           </h2>

//           {/* Description */}
//           <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
//             ASD CargoMate was built to simplify the complexity
//             of global logistics, helping businesses of every
//             size discover better routes, compare rates, and
//             ship with confidence using real-time, AI-driven
//             intelligence.
//           </p>
//         </div>

//         {/* Main Image */}
//         <div className="group relative mt-9 overflow-hidden rounded-2xl border border-cyan-400/20 bg-[#06283B] shadow-[0_20px_60px_rgba(0,0,0,0.25)]">

//           <div className="relative h-56 overflow-hidden sm:h-72 md:h-80">

//             <img
//               src={globeShipImage}
//               alt="Global shipping network"
//               className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
//             />

//             {/* Soft Overlay - Image remains visible */}
//             <div className="absolute inset-0 bg-gradient-to-r from-[#031827]/45 via-[#031827]/10 to-transparent" />

//             {/* Image Badge */}
//             <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-cyan-300/30 bg-[#031827]/75 px-4 py-2 backdrop-blur-md">
//               <Globe2 className="h-4 w-4 text-[#5EEAD4]" />

//               <span className="text-xs font-semibold text-white">
//                 Connecting Global Trade
//               </span>
//             </div>

//             {/* Top Right Decorative Icon */}
//             <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-white/10 backdrop-blur-md">
//               <ArrowUpRight className="h-4 w-4 text-white" />
//             </div>
//           </div>
//         </div>

//         {/* Purpose / Direction / Ambition */}
//         <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-6">
//           {tabs.map(({ icon: Icon, label }) => (
//             <div
//               key={label}
//               className="group flex items-center gap-3 rounded-xl border border-cyan-300/15 bg-white/[0.05] px-4 py-3.5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:bg-cyan-300/[0.08]"
//             >
//               <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-cyan-300/20 bg-cyan-300/10">
//                 <Icon className="h-5 w-5 text-[#67E8F9]" />
//               </div>

//               <span className="text-sm font-semibold text-slate-100">
//                 {label}
//               </span>
//             </div>
//           ))}
//         </div>

//         {/* Vision & Mission Cards */}
//         <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

//           {/* Vision */}
//           <div className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-gradient-to-br from-white/[0.08] to-cyan-400/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/40 hover:shadow-[0_15px_40px_rgba(6,182,212,0.08)]">

//             <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
//               <Eye className="h-5 w-5 text-[#67E8F9]" />
//             </div>

//             <h3 className="text-lg font-bold text-white">
//               Our{" "}
//               <span className="text-[#67E8F9]">
//                 Vision
//               </span>
//             </h3>

//             <p className="mt-3 text-sm leading-7 text-slate-300">
//               To become the world's most trusted AI-powered
//               logistics intelligence platform, connecting
//               businesses and markets seamlessly across borders.
//             </p>
//           </div>

//           {/* Mission */}
//           <div className="group relative overflow-hidden rounded-2xl border border-teal-300/20 bg-gradient-to-br from-white/[0.08] to-teal-400/[0.03] p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-teal-300/40 hover:shadow-[0_15px_40px_rgba(20,184,166,0.08)]">

//             <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-teal-300/20 bg-teal-400/10">
//               <Flag className="h-5 w-5 text-[#5EEAD4]" />
//             </div>

//             <h3 className="text-lg font-bold text-white">
//               Our{" "}
//               <span className="text-[#5EEAD4]">
//                 Mission
//               </span>
//             </h3>

//             <p className="mt-3 text-sm leading-7 text-slate-300">
//               To simplify global shipping through smart insights,
//               automation, and transparent, real-time data for
//               every stakeholder in the trade chain.
//             </p>
//           </div>
//         </div>

//         {/* Bottom Accent Line */}
//         <div className="mt-10 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />

//       </div>
//     </section>
//   );
// }



import {
  Target,
  Compass,
  Rocket,
  Eye,
  Flag,
  ArrowUpRight,
  Globe2,
} from "lucide-react";

import globeShipImage from "../assets/globe-ship.jpg";

const tabs = [
  {
    icon: Target,
    label: "Our Purpose",
  },
  {
    icon: Compass,
    label: "Our Direction",
  },
  {
    icon: Rocket,
    label: "Our Ambition",
  },
];

export default function WhoWeAre() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-white via-[#1677C8]/10 to-[#2563EB]/15 py-14 sm:py-20">

      {/* Blue Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.12) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      {/* Blue Background Glows */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#1677C8]/15 blur-3xl" />

      <div className="pointer-events-none absolute -left-32 bottom-0 h-80 w-80 rounded-full bg-[#2563EB]/10 blur-3xl" />

      {/* Main Container */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">

        {/* Heading Section */}
        <div className="max-w-3xl">

          {/* Main Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-[#2563EB] sm:text-4xl">
            Built for a{" "}
            <span className="bg-gradient-to-r from-[#000000] to-[#262c31] bg-clip-text text-transparent">
              Complex World
            </span>{" "}
            of Logistics
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600 sm:text-base">
            ASD CargoMate was built to simplify the complexity
            of global logistics, helping businesses of every
            size discover better routes, compare rates, and
            ship with confidence using real-time, AI-driven
            intelligence.
          </p>
        </div>

        {/* Main Image */}
        <div className="group relative mt-9 overflow-hidden rounded-2xl border border-[#1677C8]/25 bg-white shadow-[0_20px_60px_rgba(37,99,235,0.12)]">

          <div className="relative h-56 overflow-hidden sm:h-72 md:h-80">

            <img
              src={globeShipImage}
              alt="Global shipping network"
              className="absolute inset-0 h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
            />

            {/* Soft Blue Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/35 via-[#1677C8]/10 to-transparent" />

            {/* Image Badge */}
            <div className="absolute bottom-5 left-5 flex items-center gap-2 rounded-full border border-white/50 bg-white/90 px-4 py-2 shadow-sm backdrop-blur-md">

              <Globe2 className="h-4 w-4 text-[#1677C8]" />

              <span className="text-xs font-semibold text-[#2563EB]">
                Connecting Global Trade
              </span>
            </div>

            {/* Top Right Decorative Icon */}
            <div className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-white/50 bg-white/90 shadow-sm backdrop-blur-md">

              <ArrowUpRight className="h-4 w-4 text-[#2563EB]" />

            </div>
          </div>
        </div>

        {/* Purpose / Direction / Ambition */}
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">

          {tabs.map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="group flex items-center gap-3 rounded-xl border border-[#1677C8]/20 bg-white/90 px-4 py-3.5 shadow-[0_8px_25px_rgba(37,99,235,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:bg-white hover:shadow-[0_12px_30px_rgba(37,99,235,0.14)]"
            >

              {/* Icon Box */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#1677C8]/20 bg-[#1677C8]/10 transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">

                <Icon className="h-5 w-5 text-[#1677C8] transition-colors duration-300 group-hover:text-white" />

              </div>

              <span className="text-sm font-semibold text-[#2563EB]">
                {label}
              </span>

            </div>
          ))}
        </div>

        {/* Vision & Mission Cards */}
        <div className="mt-6 grid grid-cols-1 gap-5 md:grid-cols-2">

          {/* Vision Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-gradient-to-br from-white to-[#1677C8]/10 p-6 shadow-[0_10px_35px_rgba(37,99,235,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]">

            {/* Top Blue Accent */}
            <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1677C8] to-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />

            {/* Vision Icon */}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-[#1677C8]/10 transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB]">

              <Eye className="h-5 w-5 text-[#1677C8] transition-colors duration-300 group-hover:text-white" />

            </div>

            {/* Vision Heading */}
            <h3 className="text-lg font-bold text-[#2563EB]">
              Our{" "}
              <span className="text-[#1677C8]">
                Vision
              </span>
            </h3>

            {/* Vision Description */}
            <p className="mt-3 text-sm leading-7 text-slate-600">
              To become the world's most trusted AI-powered
              logistics intelligence platform, connecting
              businesses and markets seamlessly across borders.
            </p>

          </div>

          {/* Mission Card */}
          <div className="group relative overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-gradient-to-br from-white to-[#2563EB]/10 p-6 shadow-[0_10px_35px_rgba(37,99,235,0.07)] transition-all duration-300 hover:-translate-y-1 hover:border-[#2563EB] hover:shadow-[0_15px_40px_rgba(37,99,235,0.15)]">

            {/* Top Blue Accent */}
            <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1677C8] to-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />

            {/* Mission Icon */}
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-[#2563EB]/10 transition-all duration-300 group-hover:border-[#2563EB] group-hover:bg-[#2563EB]">

              <Flag className="h-5 w-5 text-[#2563EB] transition-colors duration-300 group-hover:text-white" />

            </div>

            {/* Mission Heading */}
            <h3 className="text-lg font-bold text-[#2563EB]">
              Our{" "}
              <span className="text-[#1677C8]">
                Mission
              </span>
            </h3>

            {/* Mission Description */}
            <p className="mt-3 text-sm leading-7 text-slate-600">
              To simplify global shipping through smart insights,
              automation, and transparent, real-time data for
              every stakeholder in the trade chain.
            </p>

          </div>
        </div>

        {/* Bottom Blue Accent Line */}
        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-[#2563EB]/40 to-transparent" />

      </div>
    </section>
  );
}
