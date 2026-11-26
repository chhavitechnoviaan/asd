// import { useState } from "react";
// import { ArrowRight } from "lucide-react";
// import AIModulesHero from "../components/AIModulesHero";
// import ModuleDetailModal from "../components/ModuleDetailModal";
// import Footer from "../components/Footer";
// import NeedHelp from "../components/NeedHelpBanner";
// import { aiModules } from "../data/aiModules";

// export default function AIModulesPage({ onNavigate }) {
//   const [selectedModule, setSelectedModule] = useState(null);

//   return (
//     <div>
//       <AIModulesHero />

//       <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
//         <h2 className="text-center text-lg sm:text-xl font-bold text-gray-900">
//           All AI Modules
//         </h2>
//         <p className="mt-1 text-center text-sm text-gray-500">
//           Click on any module to explore its features, demos, screenshots and
//           workflow
//         </p>

//         <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
//           {aiModules.map((m) => (
//             <button
//               key={m.id}
//               onClick={() => setSelectedModule(m)}
//               className="border border-gray-200 rounded-xl p-4 text-left hover:border-blue-300"
//             >
//               <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center">
//                 <m.icon className="w-4 h-4 text-blue-600" />
//               </div>
//               <p className="mt-3 text-sm font-bold text-gray-900">
//                 {m.title}
//               </p>
//               <p className="mt-1 text-xs text-gray-500">{m.cardDesc}</p>
//               <ArrowRight className="mt-2 w-4 h-4 text-blue-600" />
//             </button>
//           ))}
//         </div>
//       </div>
//       <NeedHelp />
     
//       <Footer onNavigate={onNavigate} />

//       <ModuleDetailModal
//         module={selectedModule}
//         onClose={() => setSelectedModule(null)}
//       />
//     </div>
//   );
// }




import { useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";

import AIModulesHero from "../components/AIModulesHero";
import ModuleDetailModal from "../components/ModuleDetailModal";
import Footer from "../components/Footer";
import NeedHelp from "../components/NeedHelpBanner";
import { aiModules } from "../data/aiModules";

export default function AIModulesPage({ onNavigate }) {
  const [selectedModule, setSelectedModule] = useState(null);

  return (
    <div className="min-h-screen bg-[#F8FCFD]">

      {/* Hero Section */}
      <AIModulesHero />

      {/* All AI Modules */}
      <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#F0FBFD] via-[#F8FCFF] to-white">

        {/* Background Glows */}
        <div className="pointer-events-none absolute -left-24 top-20 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-[#2563EB]/25 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">

          {/* Section Heading */}
          <div className="mx-auto max-w-2xl text-center">

            {/* Badge */}
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#2563EB] bg-white/80 px-4 py-1.5 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-[#2563EB]" />

              <span className="text-[11px] font-bold uppercase tracking-wider text-[#2563EB]">
                Explore Our AI Solutions
              </span>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl">
              All{" "}
              <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#0284C7] bg-clip-text text-transparent">
                AI Modules
              </span>
            </h2>

            {/* Description */}
            <p className="mt-3 text-sm leading-7 text-slate-500 sm:text-base">
              Click on any module to explore its features,
              demos, screenshots and workflow.
            </p>
          </div>

          {/* Module Cards */}
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

            {aiModules.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedModule(m)}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D8EDF2] bg-white/90 p-5 text-left shadow-[0_6px_24px_rgba(8,71,96,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-[#2563EB] hover:shadow-[0_16px_38px_rgba(8,145,178,0.12)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
              >

                {/* Top Accent */}
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-sky-400 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#E0F2FE] text-[#2563EB] transition-all duration-300 group-hover:scale-110 group-hover:from-[#2563EB] group-hover:to-[#2563EB] group-hover:text-white">
                  <m.icon className="h-5 w-5" />
                </div>

                {/* Module Title */}
                <h3 className="mt-5 text-sm font-bold leading-6 text-[#102A43] transition-colors group-hover:text-[#2563EB]">
                  {m.title}
                </h3>

                {/* Description */}
                <p className="mt-2 flex-1 text-xs leading-6 text-slate-500">
                  {m.cardDesc}
                </p>

                {/* Explore Action */}
                <div className="mt-5 flex items-center justify-between border-t border-[#E7F2F5] pt-4">

                  <span className="text-xs font-bold text-[#2563EB]">
                    Explore Module
                  </span>

                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-teal-100 bg-teal-50 text-[#2563EB] transition-all duration-300 group-hover:translate-x-1 group-hover:border-[#2563EB] group-hover:bg-[#2563EB] group-hover:text-white">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Bottom Accent */}
          {/* <div className="mt-12 flex items-center justify-center gap-2">
            <span className="h-1.5 w-8 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
            <span className="h-1.5 w-2 rounded-full bg-cyan-200" />
            <span className="h-1.5 w-2 rounded-full bg-sky-200" />
          </div> */}
        </div>
      </section>

      {/* Need Help Section */}
      <NeedHelp />

      {/* Footer */}
      <Footer onNavigate={onNavigate} />

      {/* Module Details Modal */}
      <ModuleDetailModal
        module={selectedModule}
        onClose={() => setSelectedModule(null)}
      />
    </div>
  );
}
