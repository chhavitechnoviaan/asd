// import { Sparkles, Eye, Globe2, Zap, Layers, Brain, Languages } from "lucide-react";

// const pillars = [
//   { icon: Sparkles, label: "AI-Powered Intelligence" },
//   { icon: Eye, label: "End-to-End Visibility" },
//   { icon: Globe2, label: "Global Data Network" },
//   { icon: Zap, label: "Time & Cost Efficiency" },
//   { icon: Layers, label: "Scalable for Every Business" },
// ];

// const techs = [
//   {
//     icon: Brain,
//     title: "Machine Learning Models",
//     desc: "Continuously learning from live shipping data to improve accuracy.",
//   },
//   {
//     icon: Languages,
//     title: "Natural Language Processing",
//     desc: "Understand and respond to shipping queries in plain language.",
//   },
// ];

// export default function WhyCargoMate() {
//   return (
//     <div className="bg-gray-50">
//       <div className="max-w-5xl mx-auto px-4 py-12 sm:py-16">
//         <p className="text-center text-xs font-semibold text-blue-600 uppercase">
//           Why CargoMate?
//         </p>
//         <h2 className="mt-1 text-center text-xl sm:text-2xl font-bold text-gray-900">
//           Smarter by Choice. Stronger by Result.
//         </h2>

//         <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-4">
//           {pillars.map(({ icon: Icon, label }) => (
//             <div
//               key={label}
//               className="bg-white rounded-xl p-4 flex flex-col items-center text-center"
//             >
//               <Icon className="w-5 h-5 text-blue-600" />
//               <p className="mt-2 text-xs font-semibold text-gray-900">
//                 {label}
//               </p>
//             </div>
//           ))}
//         </div>

//         <p className="mt-10 text-xs font-semibold text-blue-600 uppercase">
//           Our Technology
//         </p>
//         <h3 className="mt-1 text-lg sm:text-xl font-bold text-gray-900">
//           Intelligence at the Core
//         </h3>

//         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
//           {techs.map(({ icon: Icon, title, desc }) => (
//             <div
//               key={title}
//               className="bg-white rounded-xl p-4 flex items-start gap-3"
//             >
//               <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//               <div>
//                 <p className="text-sm font-bold text-gray-900">{title}</p>
//                 <p className="mt-0.5 text-xs text-gray-500">{desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }



import {
  Sparkles,
  Eye,
  Globe2,
  Zap,
  Layers,
  Brain,
  Languages,
  ArrowUpRight,
  Cpu,
} from "lucide-react";

const pillars = [
  {
    icon: Sparkles,
    label: "AI-Powered Intelligence",
    desc: "Smarter insights for every shipment.",
  },
  {
    icon: Eye,
    label: "End-to-End Visibility",
    desc: "Stay informed at every step.",
  },
  {
    icon: Globe2,
    label: "Global Data Network",
    desc: "Connect markets across borders.",
  },
  {
    icon: Zap,
    label: "Time & Cost Efficiency",
    desc: "Save time and optimize costs.",
  },
  {
    icon: Layers,
    label: "Scalable for Every Business",
    desc: "Grow with intelligent logistics.",
  },
];

const techs = [
  {
    icon: Brain,
    title: "Machine Learning Models",
    desc: "Continuously learning from live shipping data to improve accuracy.",
  },
  {
    icon: Languages,
    title: "Natural Language Processing",
    desc: "Understand and respond to shipping queries in plain language.",
  },
];

export default function WhyCargoMate() {
  return (
    <section className="relative isolate overflow-hidden border-y border-cyan-100 bg-gradient-to-br from-[#F5FCFF] via-[#EAF9FC] to-[#E7F8F6] py-14 sm:py-20">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-200/25 blur-3xl" />

      {/* Subtle Digital Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.15) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 sm:px-8 lg:px-10">

        {/* Heading Section */}
        <div className="text-center">

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#0AA6B5]" />

            <span className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#087E8B]">
              Why CargoMate?
            </span>
          </div>

          {/* Main Heading */}
          <h2 className="text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl md:text-4xl">
            Smarter by Choice.{" "}
            <span className="bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#60A5FA] bg-clip-text text-transparent">
              Stronger by Result.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
            Empowering global trade with intelligent technology,
            real-time visibility and smarter logistics decisions.
          </p>
        </div>

        {/* Feature Pillars */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {pillars.map(({ icon: Icon, label, desc }) => (
            <div
              key={label}
              className="group relative flex flex-col items-center rounded-2xl border border-[#D5EBF0] bg-white/85 p-5 text-center shadow-[0_8px_25px_rgba(15,118,130,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-teal-300 hover:shadow-[0_15px_35px_rgba(20,184,166,0.12)]"
            >

              {/* Icon */}
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#DDEFFF] text-[#089FAB] transition-all duration-300 group-hover:scale-110">
                <Icon className="h-6 w-6" />
              </div>

              {/* Title */}
              <h3 className="mt-4 text-sm font-bold leading-5 text-[#102A43]">
                {label}
              </h3>

              {/* Description */}
              <p className="mt-2 text-xs leading-5 text-slate-500">
                {desc}
              </p>

              {/* Bottom Accent */}
              <div className="absolute bottom-0 left-1/2 h-[3px] w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400 transition-all duration-300 group-hover:w-1/2" />
            </div>
          ))}
        </div>

        {/* Technology Section */}
        <div className="mt-10">

          {/* Section Heading */}
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white/75 px-3 py-1.5">
                <Cpu className="h-3.5 w-3.5 text-[#0AA6B5]" />

                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#087E8B]">
                  Our Technology
                </span>
              </div>

              <h3 className="text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl">
                Intelligence{" "}
                <span className="bg-gradient-to-r from-teal-500 to-sky-500 bg-clip-text text-transparent">
                  at the Core
                </span>
              </h3>
            </div>

            {/* <p className="max-w-sm text-sm leading-6 text-slate-500">
              Advanced AI capabilities designed to simplify
              complex logistics operations.
            </p> */}
          </div>

          {/* Technology Cards */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {techs.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="group relative flex items-start gap-4 overflow-hidden rounded-2xl border border-[#D5EBF0] bg-white/90 p-6 shadow-[0_8px_25px_rgba(15,118,130,0.05)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:shadow-[0_15px_35px_rgba(6,182,212,0.1)]"
              >

                {/* Icon */}
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-cyan-100 bg-gradient-to-br from-[#DDF9F5] to-[#DDEFFF] text-[#089FAB]">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-[#102A43]">
                    {title}
                  </h4>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {desc}
                  </p>
                </div>

                {/* Decorative Arrow */}
                <ArrowUpRight className="h-4 w-4 shrink-0 text-teal-400 opacity-50 transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:opacity-100" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
