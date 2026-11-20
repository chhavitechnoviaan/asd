// import { Clock, HandCoins, ShieldAlert, Globe } from "lucide-react";

// const reasons = [
//   {
//     icon: Clock,
//     title: "Save Time",
//     desc: "Automate tasks and reduce manual effort.",
//   },
//   {
//     icon: HandCoins,
//     title: "Cut Costs",
//     desc: "Compare rates and choose the best.",
//   },
//   {
//     icon: ShieldAlert,
//     title: "Reduce Risk",
//     desc: "Get AI insights and compliance alerts.",
//   },
//   {
//     icon: Globe,
//     title: "Scale Globally",
//     desc: "Ship confidently anywhere in the world.",
//   },
// ];

// export default function WhyChooseUs() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
//       <div className="text-center">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//           Why Choose <span className="text-blue-600">ASD CARGOMATE?</span>
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Empowering businesses with AI-driven logistics intelligence.
//         </p>
//       </div>

//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {reasons.map(({ icon: Icon, title, desc }) => (
//           <div
//             key={title}
//             className="border border-gray-200 rounded-xl p-4 flex items-start gap-3"
//           >
//             <Icon className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
//             <div>
//               <p className="text-sm font-bold text-gray-900">{title}</p>
//               <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }




import {
  Clock,
  HandCoins,
  ShieldAlert,
  Globe,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const reasons = [
  {
    icon: Clock,
    title: "Save Time",
    desc: "Automate tasks and reduce manual effort.",
  },
  {
    icon: HandCoins,
    title: "Cut Costs",
    desc: "Compare rates and choose the best.",
  },
  {
    icon: ShieldAlert,
    title: "Reduce Risk",
    desc: "Get AI insights and compliance alerts.",
  },
  {
    icon: Globe,
    title: "Scale Globally",
    desc: "Ship confidently anywhere in the world.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="relative isolate overflow-hidden bg-[#03192C] py-16 sm:py-20">
      {/* Navy-to-teal background */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031625] via-[#06243B] to-[#073746]" />

      {/* Digital grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* Background glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal-400/10 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            THE CARGOMATE ADVANTAGE
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Why Choose{" "}
            <span className="bg-gradient-to-r from-[#52E8D6] via-[#54DFF5] to-[#8CBFFF] bg-clip-text text-transparent">
              ASD CARGOMATE?
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Empowering businesses with AI-driven logistics
            intelligence.
          </p>
        </div>

        {/* Advantage Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-b from-[#10354A]/90 to-[#082235]/95 p-6 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-[0_16px_40px_rgba(6,182,212,0.16)]"
            >
              {/* Animated top accent */}
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

              {/* Hover glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/0 blur-2xl transition-colors duration-300 group-hover:bg-cyan-400/10" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/25 bg-gradient-to-br from-teal-400/20 to-cyan-400/10 text-[#58E6E4] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.22)]">
                  <Icon
                    className="h-7 w-7"
                    strokeWidth={1.8}
                  />
                </div>

                <span className="text-sm font-bold tracking-widest text-cyan-200/25">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>

              <div className="relative mt-7 flex flex-1 flex-col">
                <h3 className="text-lg font-bold text-white">
                  {title}
                </h3>

                <p className="mt-3 text-sm leading-6 text-slate-300/85">
                  {desc}
                </p>
              </div>

              {/* <div className="relative mt-7 flex items-center justify-between border-t border-cyan-300/10 pt-4">
                <span className="text-[11px] font-semibold tracking-wide text-teal-200/70">
                  CARGOMATE BENEFIT
                </span>

                <ArrowUpRight className="h-4 w-4 text-cyan-200/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </div> */}
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/60" />

          <p className="text-xs font-medium tracking-wide text-teal-200/80">
            Smarter Logistics. Stronger Business. Global Growth.
          </p>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/60" />
        </div>
      </div>
    </section>
  );
}
