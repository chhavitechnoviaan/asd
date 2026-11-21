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





// import {
//   Search,
//   Tag,
//   Waypoints,
//   PackageSearch,
//   FileText,
//   Users,
//   Sparkles,
//   ArrowUpRight,
// } from "lucide-react";

// const modules = [
//   {
//     icon: Search,
//     title: "AI Search",
//     desc: "Ask anything, get instant, accurate shipping information.",
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
//     desc: "Automate document checks and compliance clearance.",
//   },
//   {
//     icon: Users,
//     title: "Exporters",
//     desc: "Visualize performance with advanced AI analytics.",
//   },
// ];

// export default function CoreAIModules() {
//   return (
//     <section className="relative isolate overflow-hidden bg-[#03182B] py-16 sm:py-20">
//       {/* Background gradient */}
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#031625] via-[#06243B] to-[#073746]" />

//       {/* Grid pattern */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.12]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(34,211,238,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,.18) 1px, transparent 1px)",
//           backgroundSize: "65px 65px",
//         }}
//       />

//       {/* Neon background glow */}
//       <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[110px]" />
//       <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-teal-400/10 blur-[110px]" />

//       <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
//         {/* Heading */}
//         <div className="mx-auto max-w-2xl text-center">
//           <div className="inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-4 py-2 text-xs font-semibold tracking-wide text-teal-200">
//             <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
//             INTELLIGENT LOGISTICS SOLUTIONS
//           </div>

//           <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
//             Core{" "}
//             <span className="bg-gradient-to-r from-[#52E8D6] via-[#54DFF5] to-[#8CBFFF] bg-clip-text text-transparent">
//               AI Modules
//             </span>
//           </h2>

//           <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
//             Powerful AI-driven modules built to automate,
//             optimize, and accelerate your global logistics
//             operations.
//           </p>
//         </div>

//         {/* Cards */}
//         <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
//           {modules.map(({ icon: Icon, title, desc }, index) => (
//             <div
//               key={title}
//               className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-cyan-300/15 bg-gradient-to-b from-[#10354A]/90 to-[#082235]/95 p-5 shadow-[0_12px_35px_rgba(0,0,0,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300/60 hover:shadow-[0_16px_40px_rgba(6,182,212,0.16)]"
//             >
//               {/* Top neon line */}
//               <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

//               {/* Decorative glow */}
//               <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-cyan-400/0 blur-2xl transition-all duration-300 group-hover:bg-cyan-400/10" />

//               <div className="relative flex items-start justify-between">
//                 <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-cyan-400/25 bg-gradient-to-br from-teal-400/20 to-cyan-400/10 text-[#58E6E4] transition-all duration-300 group-hover:scale-110 group-hover:border-cyan-300/50 group-hover:shadow-[0_0_22px_rgba(34,211,238,0.22)]">
//                   <Icon
//                     className="h-6 w-6"
//                     strokeWidth={1.8}
//                   />
//                 </div>

//                 <ArrowUpRight className="h-4 w-4 text-cyan-200/30 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-300" />
//               </div>

//               <div className="relative mt-6 flex flex-1 flex-col">
//                 <span className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-teal-300/65">
//                   MODULE {String(index + 1).padStart(2, "0")}
//                 </span>

//                 <h3 className="text-base font-bold leading-6 text-white">
//                   {title}
//                 </h3>

//                 <p className="mt-3 text-xs leading-6 text-slate-300/85">
//                   {desc}
//                 </p>
//               </div>

//               <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-400/25 to-transparent" />
//             </div>
//           ))}
//         </div>

//         {/* Bottom tagline */}
//         <div className="mt-12 flex items-center justify-center gap-3 text-center">
//           <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/60" />
//           <p className="text-xs font-medium tracking-wide text-teal-200/80">
//             Smarter Technology. Seamless Global Trade.
//           </p>
//           <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/60" />
//         </div>
//       </div>
//     </section>
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
    <section className="relative isolate overflow-hidden bg-[#EFF6FF] py-16 sm:py-20">

      {/* Light Blue Background Gradient */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#EFF6FF]" />

      {/* Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,236,.18) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,236,.18) 1px, transparent 1px)",
          backgroundSize: "65px 65px",
        }}
      />

      {/* Blue Background Glow */}
      <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-[#2563EC]/10 blur-[110px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-[#1D4ED8]/10 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EC]/30 bg-[#DBEAFE] px-4 py-2 text-xs font-semibold tracking-wide text-[#2563EC]">
            <Sparkles className="h-3.5 w-3.5 text-[#2563EC]" />
            INTELLIGENT LOGISTICS SOLUTIONS
          </div>

          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#0a0a0c] sm:text-4xl">
            Core{" "}
            <span className="bg-gradient-to-r from-[#2563EC] to-[#1D4ED8] bg-clip-text text-transparent">
              AI Modules
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
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
              className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DBEAFE] bg-gradient-to-b from-white to-[#EFF6FF] p-5 shadow-[0_12px_35px_rgba(37,99,236,0.08)] backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:border-[#1D4ED8] hover:shadow-[0_16px_40px_rgba(37,99,236,0.16)]"
            >

              {/* Top Blue Line */}
              <div className="absolute inset-x-0 top-0 h-[2px] origin-left scale-x-0 bg-gradient-to-r from-[#2563EC] to-[#1D4ED8] transition-transform duration-300 group-hover:scale-x-100" />

              {/* Decorative Glow */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#2563EC]/0 blur-2xl transition-all duration-300 group-hover:bg-[#2563EC]/10" />

              <div className="relative flex items-start justify-between">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#2563EC]/25 bg-gradient-to-br from-[#DBEAFE] to-[#EFF6FF] text-[#2563EC] transition-all duration-300 group-hover:scale-110 group-hover:border-[#1D4ED8]/50 group-hover:shadow-[0_0_22px_rgba(37,99,236,0.22)]">
                  <Icon
                    className="h-6 w-6"
                    strokeWidth={1.8}
                  />
                </div>

                <ArrowUpRight className="h-4 w-4 text-[#2563EC]/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1D4ED8]" />
              </div>

              <div className="relative mt-6 flex flex-1 flex-col">

                <span className="mb-2 text-[10px] font-semibold tracking-[0.18em] text-[#2563EC]/70">
                  MODULE {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="text-base font-bold leading-6 text-[#1D4ED8]">
                  {title}
                </h3>

                <p className="mt-3 text-xs leading-6 text-slate-600">
                  {desc}
                </p>
              </div>

              <div className="mt-6 h-px w-full bg-gradient-to-r from-[#2563EC]/25 to-transparent" />
            </div>
          ))}
        </div>

        {/* Bottom Tagline */}
        <div className="mt-12 flex items-center justify-center gap-3 text-center">

          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#2563EC]/60" />

          <p className="text-xs font-medium tracking-wide text-[#2563EC]">
            Smarter Technology. Seamless Global Trade.
          </p>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#2563EC]/60" />

        </div>
      </div>
    </section>
  );
}


// import {
//   Search,
//   Tag,
//   Waypoints,
//   PackageSearch,
//   FileText,
//   Users,
//   Sparkles,
//   ArrowUpRight,
// } from "lucide-react";

// const modules = [
//   {
//     icon: Search,
//     title: "AI Search",
//     desc: "Ask anything, get instant, accurate shipping information.",
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
//     desc: "Automate document checks and compliance clearance.",
//   },
//   {
//     icon: Users,
//     title: "Exporters",
//     desc: "Visualize performance with advanced AI analytics.",
//   },
// ];

// export default function CoreAIModules() {
//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#EFF6FF] via-[#F8FAFF] to-white py-16 sm:py-24">

//       {/* Soft Blue Background */}
//       <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-[#2563EC]/10 blur-3xl" />
//       <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-[#93C5FD]/20 blur-3xl" />

//       {/* Light Grid Pattern */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-40"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(37,99,236,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,236,.06) 1px, transparent 1px)",
//           backgroundSize: "55px 55px",
//         }}
//       />

//       <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

//         {/* Heading */}
//         <div className="mx-auto max-w-3xl text-center">

//           <div className="inline-flex items-center gap-2 rounded-full border border-[#BFDBFE] bg-[#DBEAFE]/70 px-5 py-2.5 text-xs font-bold tracking-wide text-[#2563EC]">
//             <Sparkles className="h-4 w-4" />
//             INTELLIGENT LOGISTICS SOLUTIONS
//           </div>

//           <h2 className="mt-6 text-3xl font-extrabold tracking-tight text-[#0F172A] sm:text-4xl lg:text-5xl">
//             Core{" "}
//             <span className="bg-gradient-to-r from-[#2563EC] to-[#1D4ED8] bg-clip-text text-transparent">
//               AI Modules
//             </span>
//           </h2>

//           <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
//             Powerful AI-driven modules built to automate,
//             optimize, and accelerate your global logistics
//             operations.
//           </p>

//           <div className="mx-auto mt-6 h-1 w-20 rounded-full bg-gradient-to-r from-[#2563EC] to-[#93C5FD]" />
//         </div>

//         {/* Module Cards */}
//         <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">

//           {modules.map(({ icon: Icon, title, desc }, index) => (
//             <div
//               key={title}
//               className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DBEAFE] bg-white p-6 shadow-[0_8px_30px_rgba(37,99,236,0.06)] transition-all duration-300 hover:-translate-y-2 hover:border-[#1D4ED8] hover:bg-[#F8FAFF] hover:shadow-[0_18px_40px_rgba(37,99,236,0.16)]"
//             >

//               {/* Animated Top Border */}
//               <div className="absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-[#2563EC] to-[#1D4ED8] transition-transform duration-300 group-hover:scale-x-100" />

//               {/* Hover Glow */}
//               <div className="pointer-events-none absolute -right-12 -top-12 h-28 w-28 rounded-full bg-[#2563EC]/0 blur-2xl transition-all duration-300 group-hover:bg-[#2563EC]/10" />

//               {/* Icon & Arrow */}
//               <div className="relative flex items-start justify-between">

//                 <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-[#BFDBFE] bg-[#EFF6FF] text-[#2563EC] transition-all duration-300 group-hover:scale-110 group-hover:border-[#1D4ED8] group-hover:bg-[#1D4ED8] group-hover:text-white group-hover:shadow-[0_8px_20px_rgba(37,99,236,0.25)]">
//                   <Icon
//                     className="h-7 w-7"
//                     strokeWidth={1.8}
//                   />
//                 </div>

//                 <ArrowUpRight className="h-5 w-5 text-[#94A3B8] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1D4ED8]" />
//               </div>

//               {/* Module Information */}
//               <div className="relative mt-7 flex flex-1 flex-col">

//                 <span className="mb-3 text-[10px] font-bold tracking-[0.18em] text-[#2563EC]/70">
//                   MODULE {String(index + 1).padStart(2, "0")}
//                 </span>

//                 <h3 className="text-base font-bold leading-6 text-[#0F172A] transition-colors duration-300 group-hover:text-[#1D4ED8]">
//                   {title}
//                 </h3>

//                 <p className="mt-3 text-xs leading-6 text-slate-500">
//                   {desc}
//                 </p>
//               </div>

//               {/* Bottom Decorative Line */}
//               <div className="mt-6 h-px w-full bg-gradient-to-r from-[#DBEAFE] to-transparent transition-all duration-300 group-hover:from-[#2563EC]" />

//             </div>
//           ))}
//         </div>

//         {/* Bottom Tagline */}
//         <div className="mt-14 flex items-center justify-center gap-3 text-center">

//           <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#2563EC]" />

//           <p className="text-xs font-semibold tracking-wide text-[#2563EC]">
//             Smarter Technology. Seamless Global Trade.
//           </p>

//           <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#2563EC]" />

//         </div>
//       </div>
//     </section>
//   );
// }
