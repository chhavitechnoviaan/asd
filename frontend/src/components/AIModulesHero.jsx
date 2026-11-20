// import portMapImage from "../assets/port-map.jpg";

// export default function AIModulesHero() {
//   return (
//     <div className="relative w-full h-64 sm:h-72 md:h-80 bg-gradient-to-b from-blue-950 to-blue-950 overflow-hidden">
//       <img
//         src={portMapImage}
//         alt="Global trade network"
//         className="absolute inset-0 w-full h-full object-cover object-right"
//       />
//       <div className="absolute inset-0 bg-blue-950/70" />
//       <div className="relative max-w-4xl mx-auto h-full flex flex-col justify-center px-4 sm:px-6">
//         <h1 className="text-2xl sm:text-3xl font-bold text-white">
//           AI Modules
//         </h1>
//         <p className="mt-1 text-sm sm:text-base text-blue-300 font-semibold">
//           Smarter Tools. Intelligent Trade.
//         </p>
//         <p className="mt-3 text-xs sm:text-sm text-blue-100 max-w-xl">
//           Explore our suite of AI-Powered modules designed to simplify every
//           step of global trade - from discovery to delivery.
//         </p>
//       </div>
//     </div>
//   );
// }




import { Sparkles, Globe2 } from "lucide-react";
import portMapImage from "../assets/port-map.jpg";

export default function AIModulesHero() {
  return (
    <section className="relative isolate w-full min-h-[310px] overflow-hidden bg-[#031525] sm:min-h-[350px] md:min-h-[390px]">

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={portMapImage}
          alt="Global trade and logistics network"
          className="h-full w-full object-cover object-center opacity-75"
        />

        {/* Dark gradient: text readable, image visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031525]/95 via-[#06253B]/85 to-[#073A4A]/30" />
      </div>

      {/* Cyan & Teal Glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-teal-400/20 blur-3xl" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[310px] max-w-6xl flex-col justify-center px-5 py-12 sm:min-h-[350px] sm:px-8 md:min-h-[390px]">

        {/* Badge */}
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#5EEAD4]" />

          <span className="text-[11px] font-bold tracking-wide text-[#99F6E4]">
            AI-Powered Trade Intelligence
          </span>
        </div>

        {/* Heading */}
        <h1 className="max-w-2xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl md:text-5xl">
          AI{" "}
          <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
            Modules
          </span>
        </h1>

        {/* Subtitle */}
        <div className="mt-4 flex items-center gap-2">
          <Globe2 className="h-5 w-5 shrink-0 text-[#5EEAD4]" />

          <p className="text-base font-bold text-[#C4F5F4] sm:text-lg">
            Smarter Tools. Intelligent Trade.
          </p>
        </div>

        {/* Description */}
        <p className="mt-4 max-w-xl text-sm leading-7 text-slate-300 sm:text-base">
          Explore our suite of AI-powered modules designed
          to simplify every step of global trade — from
          discovery to delivery.
        </p>

        {/* Decorative Accent */}
        {/* <div className="mt-7 flex items-center gap-2">
          <span className="h-1.5 w-10 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
          <span className="h-1.5 w-3 rounded-full bg-cyan-400/50" />
          <span className="h-1.5 w-3 rounded-full bg-sky-400/30" />
        </div> */}
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
    </section>
  );
}
