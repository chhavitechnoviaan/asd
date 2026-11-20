// import { ArrowRight } from "lucide-react";
// import { resourceCards } from "../data/resourceCards";

// export default function ResourcesGrid({ onSelect }) {
//   return (
//     <div className="max-w-6xl mx-auto px-4 py-12 sm:py-16">
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//         {resourceCards.map((card) => (
//           <div
//             key={card.id}
//             className="border border-gray-200 rounded-xl p-5 flex flex-col items-center text-center"
//           >
//             <div className={`w-14 h-14 rounded-full ${card.color} flex items-center justify-center`}>
//               <card.icon className="w-6 h-6 text-white" />
//             </div>
//             <p className="mt-3 font-bold text-gray-900">{card.title}</p>
//             <p className="mt-1 text-xs text-gray-500">{card.desc}</p>
//             <button
//               onClick={() => onSelect(card)}
//               className="mt-4 flex items-center gap-1 text-sm font-semibold text-blue-600"
//             >
//               Explore
//               <ArrowRight className="w-4 h-4" />
//             </button>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { ArrowUpRight, Sparkles } from "lucide-react";
import { resourceCards } from "../data/resourceCards";

export default function ResourcesGrid({ onSelect }) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-gradient-to-br from-[#EAF9FC] via-[#F8FCFF] to-[#E9F9F5] py-14 sm:py-20">

      {/* Background glow */}
      <div className="pointer-events-none absolute -left-28 -top-28 h-80 w-80 rounded-full bg-cyan-200/40 blur-3xl" />

      <div className="pointer-events-none absolute -right-28 bottom-0 h-80 w-80 rounded-full bg-teal-200/35 blur-3xl" />

      {/* Subtle grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.07) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div className="mx-auto max-w-2xl text-center">

          <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 shadow-sm">
            <Sparkles className="h-4 w-4 text-teal-600" />

            <span className="text-[11px] font-bold uppercase tracking-wider text-teal-700">
              Global Trade Knowledge Hub
            </span>
          </div>

          <h2 className="mt-5 text-2xl font-extrabold tracking-tight text-[#102A43] sm:text-3xl">
            Explore Our{" "}
            <span className="bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0284C7] bg-clip-text text-transparent">
              Resources
            </span>
          </h2>

          <p className="mt-3 text-sm leading-7 text-slate-600">
            Discover expert insights, regulatory updates, trade guides
            and essential resources to make smarter global
            shipping decisions.
          </p>
        </div>

        {/* Resource cards */}
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {resourceCards.map((card) => {
            const Icon = card.icon;

            return (
              <article
                key={card.id}
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#D7EBF0] bg-white/90 p-6 shadow-[0_8px_30px_rgba(8,71,96,0.05)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-cyan-300 hover:shadow-[0_16px_38px_rgba(6,182,212,0.14)]"
              >

                {/* Decorative glow */}
                <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-cyan-200/20 blur-3xl transition-transform duration-500 group-hover:scale-150" />

                {/* Icon */}
                <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl border border-teal-200 bg-gradient-to-br from-[#DDF9F5] via-[#E1FAFF] to-[#DDEFFF] text-[#089FAB] shadow-sm">
                  <Icon className="h-6 w-6" />
                </div>

                {/* Title */}
                <h3 className="relative mt-5 text-base font-bold text-[#102A43]">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="relative mt-2 flex-1 text-xs leading-6 text-slate-500">
                  {card.desc}
                </p>

                {/* Explore button */}
                <button
                  type="button"
                  onClick={() => onSelect?.(card)}
                  className="relative mt-6 flex w-full items-center justify-between border-t border-[#E5F0F3] pt-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
                >
                  <span className="text-xs font-bold text-[#089FAB] transition-colors group-hover:text-teal-700">
                    Explore Resources
                  </span>

                  <span className="flex h-9 w-9 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-teal-600 transition-all duration-300 group-hover:bg-gradient-to-r group-hover:from-teal-500 group-hover:to-cyan-500 group-hover:text-white">
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </button>
              </article>
            );
          })}
        </div>

      </div>
    </section>
  );
}
