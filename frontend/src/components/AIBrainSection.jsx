// import { Cpu, TrendingUp, ShieldCheck, LineChart } from "lucide-react";
// import aiChipImage from "../assets/ai-chip.jpg";

// const points = [
//   {
//     icon: Cpu,
//     title: "AI-Powered Automation",
//     desc: "Automates repetitive logistics tasks with intelligent workflows.",
//   },
//   {
//     icon: TrendingUp,
//     title: "Predictive Supply Chain",
//     desc: "Forecasts demand and disruptions before they happen.",
//   },
//   {
//     icon: ShieldCheck,
//     title: "Risk & Compliance Alerts",
//     desc: "Flags compliance issues before shipments are affected.",
//   },
//   {
//     icon: LineChart,
//     title: "Real-Time Analytics",
//     desc: "Turns live shipping data into actionable business insights.",
//   },
// ];

// export default function AIBrainSection() {
//   return (
//     <div className="relative w-full bg-blue-950 overflow-hidden">
//       <img
//         src={aiChipImage}
//         alt="AI technology"
//         className="absolute inset-0 w-full h-full object-cover opacity-60"
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/80 to-transparent" />

//       <div className="relative max-w-5xl mx-auto px-4 py-12 sm:py-16">
//         <p className="text-xs font-semibold text-blue-300 uppercase">
//           AI Engine
//         </p>
//         <h2 className="mt-1 text-xl sm:text-2xl font-bold text-white max-w-md">
//           The Brain Behind CargoMate
//         </h2>
//         <p className="mt-2 text-sm text-blue-100 max-w-md">
//           Our AI engine processes millions of data points across ports,
//           carriers, and trade routes to give you smarter, faster shipping
//           decisions.
//         </p>

//         <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-lg">
//           {points.map(({ icon: Icon, title, desc }) => (
//             <div key={title} className="flex items-start gap-3">
//               <Icon className="w-5 h-5 text-blue-300 shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm font-bold text-white">{title}</p>
//                 <p className="mt-0.5 text-xs text-blue-200">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  Cpu,
  TrendingUp,
  ShieldCheck,
  LineChart,
  Sparkles,
  BrainCircuit,
  ArrowUpRight,
} from "lucide-react";

import aiChipImage from "../assets/ai-chip.jpg";

const points = [
  {
    icon: Cpu,
    title: "AI-Powered Automation",
    desc: "Automates repetitive logistics tasks with intelligent workflows.",
  },
  {
    icon: TrendingUp,
    title: "Predictive Supply Chain",
    desc: "Forecasts demand and disruptions before they happen.",
  },
  {
    icon: ShieldCheck,
    title: "Risk & Compliance Alerts",
    desc: "Flags compliance issues before shipments are affected.",
  },
  {
    icon: LineChart,
    title: "Real-Time Analytics",
    desc: "Turns live shipping data into actionable business insights.",
  },
];

export default function AIBrainSection() {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#031827] text-white">

      {/* Background Image */}
      <img
        src={aiChipImage}
        alt="AI technology powering global logistics"
        className="absolute inset-0 h-full w-full object-cover object-[65%_center] opacity-90"
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#031827] via-[#041D30]/95 to-[#062A40]/25" />

      {/* Soft Neon Glow */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-400/10 blur-3xl" />

      {/* Subtle Digital Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(56,189,248,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(56,189,248,0.2) 1px, transparent 1px)",
          backgroundSize: "54px 54px",
        }}
      />

      {/* Top Accent */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-20 lg:px-10">

        {/* Header */}
        <div className="max-w-xl">

          {/* Badge */}
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#5EEAD4]" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#A5F3FC]">
              AI Engine
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-3xl font-extrabold leading-tight tracking-tight sm:text-4xl">
            The Brain Behind{" "}
            <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
              CargoMate
            </span>
          </h2>

          {/* Description */}
          <p className="mt-5 max-w-lg text-sm leading-7 text-slate-300 sm:text-base">
            Our AI engine processes millions of data points
            across ports, carriers, and trade routes to give
            you smarter, faster shipping decisions.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-9 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {points.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-cyan-300/20 bg-[#061F34]/85 p-5 shadow-[0_8px_25px_rgba(0,0,0,0.15)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/50 hover:bg-[#082D43]/90 hover:shadow-[0_12px_35px_rgba(6,182,212,0.12)]"
            >
              {/* Icon */}
              <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-300/20 bg-cyan-400/10">
                <Icon className="h-5 w-5 text-[#67E8F9]" />
              </div>

              {/* Title */}
              <h3 className="text-sm font-bold text-white">
                {title}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-6 text-slate-300">
                {desc}
              </p>

              {/* Decorative Arrow */}
              <ArrowUpRight className="absolute right-5 top-5 h-4 w-4 text-cyan-300/50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-cyan-300" />

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* Bottom Label */}
        <div className="mt-8 inline-flex items-center gap-2 text-xs font-medium text-[#A5F3FC]">
          <BrainCircuit className="h-4 w-4" />
          Intelligent technology for smarter global trade
        </div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-teal-400/50 to-transparent" />
    </section>
  );
}
