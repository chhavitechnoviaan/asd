// import bannerImage from "../assets/module-cta-banner.png";

// export default function NeedHelpBanner() {
//   return (
//     <div className="relative w-full overflow-hidden">
//       <img
//         src={bannerImage}
//         alt="Global network"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14 flex flex-col sm:flex-row items-center justify-between gap-4">
//         <div className="text-center sm:text-left">
//           <h2 className="text-lg sm:text-xl font-bold text-white">
//             Need help Choosing the Right Module?
//           </h2>
//           <p className="mt-1 text-sm text-blue-100">
//             Our experts can help you find the perfect solution for your
//             business.
//           </p>
//         </div>
//         <button className="bg-white text-blue-700 text-sm font-semibold rounded-lg px-6 py-2.5 shrink-0">
//           Talk to an Expert
//         </button>
       
//       </div>
//     </div>
//   );
// }



import { ArrowUpRight, Headset, Sparkles } from "lucide-react";
import bannerImage from "../assets/module-cta-banner.png";

export default function NeedHelpBanner({ onNavigate }) {
  const handleTalkToExpert = () => {
    onNavigate?.("Contact Us");
  };

  return (
    <section className="relative isolate w-full overflow-hidden bg-[#031525]">

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={bannerImage}
          alt="Global logistics network"
          className="h-full w-full object-cover object-center opacity-75"
        />

        {/* Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#031525]/95 via-[#06253B]/85 to-[#073A4A]/45" />
      </div>

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-[#2563EB]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-[#2563EB] blur-3xl" />

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-80"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top Accent Line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#2563EB]/60 to-transparent" />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center justify-between gap-7 px-5 py-12 sm:flex-row sm:px-8 sm:py-14 lg:py-16">

        {/* Left Content */}
        <div className="max-w-2xl text-center sm:text-left">

          {/* Badge */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-[#ffffff]" />

            <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffffff]">
              Expert Guidance
            </span>
          </div>

          {/* Heading */}
          <h2 className="text-xl font-extrabold tracking-tight text-white sm:text-2xl lg:text-3xl">
            Need Help Choosing the{" "}
            <span className="bg-gradient-to-r from-[#2563EB] via-[#2563EB] to-[#93C5FD] bg-clip-text text-transparent">
              Right Module?
            </span>
          </h2>

          {/* Description */}
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
            Our experts can help you find the perfect solution
            for your business.
          </p>

          {/* Supporting Text */}
          <div className="mt-4 inline-flex items-center gap-2 text-xs font-medium text-[#ffffff]">
            <Headset className="h-4 w-4" />
            Personalized guidance for smarter logistics
          </div>
        </div>

        {/* Right CTA Button */}
        <div className="w-full shrink-0 sm:w-auto">
          <button
            type="button"
            onClick={handleTalkToExpert}
            className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#ffffff] to-[#ffffff] px-7 py-3.5 text-sm font-bold text-[#032337] shadow-[0_8px_25px_rgba(34,211,238,0.2)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_12px_30px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300 sm:w-auto"
          >
            Talk to an Expert

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
    </section>
  );
}
