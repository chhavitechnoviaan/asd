// import { Sparkles, CalendarCheck, AlertTriangle, Globe } from "lucide-react";

// const features = [
//   {
//     icon: Sparkles,
//     title: "AI-Powered Insights",
//     desc: "Get intelligent answers instantly.",
//   },
//   {
//     icon: CalendarCheck,
//     title: "Smart Planning",
//     desc: "Find optimal route and compare rates.",
//   },
//   {
//     icon: AlertTriangle,
//     title: "Faster Decision",
//     desc: "Real-time data for confident actions.",
//   },
//   {
//     icon: Globe,
//     title: "Global Coverage",
//     desc: "Connect and ship worldwide.",
//   },
// ];

// export default function PlatformFeatures() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
//       <div className="text-center">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//           One Platform. <span className="text-blue-600">Endless Opportunities</span>
//         </h2>
//         <p className="mt-2 text-sm text-gray-500 max-w-2xl mx-auto">
//           ASD CARGOMATE is your AI-Powered co-pilot, simplifying global
//           shipping with smart insights, real-time data, and automation.
//         </p>
//       </div>

//       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {features.map(({ icon: Icon, title, desc }) => (
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
  Sparkles,
  CalendarCheck,
  Zap,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Insights",
    desc: "Get intelligent answers instantly.",
  },
  {
    icon: CalendarCheck,
    title: "Smart Planning",
    desc: "Find optimal routes and compare rates.",
  },
  {
    icon: Zap,
    title: "Faster Decisions",
    desc: "Real-time data for confident actions.",
  },
  {
    icon: Globe2,
    title: "Global Coverage",
    desc: "Connect and ship worldwide.",
  },
];

export default function PlatformFeatures() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF9FC] via-[#F4FBFD] to-white py-16 sm:py-20">
      {/* Soft background glow */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-72 w-72 rounded-full bg-cyan-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 right-0 h-72 w-72 rounded-full bg-teal-200/25 blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold tracking-wide text-teal-700">
            <Sparkles className="h-3.5 w-3.5" />
            WHY CHOOSE ASD CARGOMATE
          </span>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl lg:text-4xl">
            One Platform.{" "}
            <span className="bg-gradient-to-r from-[#12B8B0] to-[#1596D2] bg-clip-text text-transparent">
              Endless Opportunities.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            ASD CARGOMATE is your AI-powered co-pilot,
            simplifying global shipping with smart insights,
            real-time data, and automation.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="mt-11 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="group relative overflow-hidden rounded-2xl border border-[#DCEEF3] bg-white/90 p-6 shadow-[0_8px_30px_rgba(15,89,112,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_18px_40px_rgba(6,182,212,0.13)]"
            >
              <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

              <div className="flex items-start justify-between">
                <div className="flex h-13 w-13 items-center justify-center rounded-xl border border-cyan-100 bg-gradient-to-br from-[#DDF9F5] to-[#E5F5FF] p-3 text-[#089FB0] transition-all duration-300 group-hover:scale-105 group-hover:from-[#C7F7F0] group-hover:to-[#CDEFFF]">
                  <Icon className="h-6 w-6" strokeWidth={1.8} />
                </div>

                <ArrowUpRight className="h-4 w-4 text-slate-300 transition-colors group-hover:text-cyan-500" />
              </div>

              <h3 className="mt-6 text-base font-bold text-[#14314C]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
