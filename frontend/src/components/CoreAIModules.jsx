// import {
//   Search,
//   Tag,
//   Waypoints,
//   PackageSearch,
//   FileText,
//   Users,
// } from "lucide-react";

// const modules = [
//   {
//     icon: Search,
//     title: "AI Search",
//     desc: "Ask anything get instant, accurate shipping information.",
//   },
//   {
//     icon: Tag,
//     title: "Rate Explorer",
//     desc: "Compare real-time rates from multiple carriers.",
//   },
//   {
//     icon: Waypoints,
//     title: "Route Planner",
//     desc: "Discover the fastest & most effective routes.",
//   },
//   {
//     icon: PackageSearch,
//     title: "Shipment Tracker",
//     desc: "Track your shipment in real time with AI updates.",
//   },
//   {
//     icon: FileText,
//     title: "Document AI",
//     desc: "Automate document check and compliance clearance.",
//   },
//   {
//     icon: Users,
//     title: "Exporters",
//     desc: "Visualize performance with advance AI analytics.",
//   },
// ];

// export default function CoreAIModules() {
//   return (
//     <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
//       <div className="text-center">
//         <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
//           Core <span className="text-blue-600">AI Modules</span>
//         </h2>
//         <p className="mt-2 text-sm text-gray-500">
//           Powerful modules built to automate, optimize, and accelerate your
//           logistics operations.
//         </p>
//       </div>

//       <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
//         {modules.map(({ icon: Icon, title, desc }) => (
//           <div
//             key={title}
//             className="bg-blue-50 rounded-xl p-4 flex flex-col items-start"
//           >
//             <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center">
//               <Icon className="w-4 h-4 text-blue-600" />
//             </div>
//             <p className="mt-3 text-sm font-bold text-gray-900">{title}</p>
//             <p className="mt-1 text-xs text-gray-500">{desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }





import {
  Search,
  Tag,
  Waypoints,
  PackageSearch,
  FileText,
  Users,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

const modules = [
  {
    icon: Search,
    title: "AI Search",
    desc: "Ask anything, get instant, accurate shipping information.",
  },
  {
    icon: Tag,
    title: "Rate Explorer",
    desc: "Compare real-time rates from multiple carriers.",
  },
  {
    icon: Waypoints,
    title: "Route Planner",
    desc: "Discover the fastest & most effective routes.",
  },
  {
    icon: PackageSearch,
    title: "Shipment Tracker",
    desc: "Track your shipment in real time with AI updates.",
  },
  {
    icon: FileText,
    title: "Document AI",
    desc: "Automate document checks and compliance clearance.",
  },
  {
    icon: Users,
    title: "Exporters",
    desc: "Visualize performance with advanced AI analytics.",
  },
];

export default function CoreAIModules() {
  return (
    <section className="relative isolate overflow-hidden bg-[#03182B] py-16 sm:py-20">
      {/* Background gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031625] via-[#06243B] to-[#073746]" />

      {/* Grid pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* Neon background glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-200">
            <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
            INTELLIGENT LOGISTICS SOLUTIONS
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Core{" "}
            <span className="bg-gradient-to-r from-[#52E8D6] via-[#54DFF5] to-[#8CBFFF] bg-clip-text text-transparent">
              AI Modules
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
            Powerful AI-driven modules built to automate,
            optimize, and accelerate your global logistics
            operations.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {modules.map(({ icon: Icon, title, desc }, index) => (
            <div
              key={title}
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-b from-[#10354A]/90 to-[#082235]/95 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-[0_16px_40px_rgba(6,182,212,0.16)]"
            >
              {/* Top neon line */}
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

              {/* Decorative glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-300 group-hover:bg-cyan-400/10" />

              <div className="relative flex items-start justify-between">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-teal-400/20 to-cyan-400/10 text-[#58E6E4] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.22)]">
                  <Icon
                    className="h-6 w-6"
                    strokeWidth={1.8}
                  />
                </div>

                <ArrowUpRight className="h-4 w-4 text-cyan-200/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
              </div>

              <div className="relative mt-6 flex flex-1 flex-col">
                <span className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-teal-300/65">
                  MODULE {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-base font-bold leading-6 text-white">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-300/85">
                  {desc}
                </p>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-400/25 to-transparent" />
            </div>
          ))}
        </div>

        {/* Bottom tagline */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/60" />
          <p className="text-xs font-medium tracking-wide text-teal-200/80">
            Smarter Technology. Seamless Global Trade.
          </p>
          <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/60" />
        </div>
      </div>
    </section>
  );
}
