// import bannerImage from "../assets/resources-help.png";

// export default function NeedMoreHelpBanner({ onNavigate }) {
//   return (
//     <div className="relative w-full bg-blue-950 overflow-hidden">
//       <img
//         src={bannerImage}
//         alt="Workspace"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-gradient-to-r from-blue-950 via-blue-950/70 to-transparent" />

//       <div className="relative max-w-4xl mx-auto px-4 sm:px-6 py-14 sm:py-20">
//         <h2 className="text-2xl sm:text-3xl font-bold text-white">
//           Need More Help?
//         </h2>
//         <p className="mt-3 text-sm text-blue-100 max-w-sm">
//           Our resources are here to help you stay ahead in your global trade
//           journey. Can't find what you are looking for?
//         </p>
//         <button
//           onClick={() => onNavigate?.("Contact Us")}
//           className="mt-6 bg-white text-blue-950 text-sm font-semibold rounded-lg px-6 py-3"
//         >
//           Contact Support
//         </button>
//       </div>
//     </div>
//   );
// }



import {
  ArrowUpRight,
  Headphones,
  Sparkles,
} from "lucide-react";

import bannerImage from "../assets/resources-help.png";

export default function NeedMoreHelpBanner({ onNavigate }) {
  return (
    <section className="relative isolate w-full overflow-hidden bg-[#03182B]">

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">
        <img
          src={bannerImage}
          alt="Global logistics support workspace"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-75"
        />

        {/* Dark Overlay - Image Remains Visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#2563EB]/95 via-[#05243A]/15 to-[#06384A]/35" />
      </div>

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-500/10 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-cyan-400/15 blur-3xl" />

      {/* Subtle Grid Pattern */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[300px] max-w-6xl flex-col justify-center px-5 py-12 sm:min-h-[340px] sm:px-8 lg:px-10">

        {/* Badge */}
        <div className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-[#2563EB]/30 bg-teal-400/10 px-4 py-2 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-[#ffffff]" />

          <span className="text-[10px] font-bold uppercase tracking-wider text-[#ffffff]">
            We're Here to Help
          </span>
        </div>

        {/* Heading */}
        <h2 className="max-w-xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
          Need More{" "}
          <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
            Help?
          </span>
        </h2>

        {/* Description */}
        <p className="mt-4 max-w-lg text-sm leading-7 text-slate-300 sm:text-[15px]">
          Our resources are here to help you stay ahead in your
          global trade journey. Can't find what you're looking for?
          Our support team is ready to assist you.
        </p>

        {/* Contact Button */}
        <div className="mt-7">
          <button
            type="button"
            onClick={() => onNavigate?.("Contact Us")}
            className="group inline-flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-[#ffffff] to-[#ffffff] px-6 py-3.5 text-sm font-bold text-[#06243A] shadow-[0_8px_28px_rgba(20,184,166,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(34,211,238,0.35)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
          >
            <Headphones className="h-4 w-4" />

            Contact Support

            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>

      {/* Bottom Accent Line */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/70 to-transparent" />
    </section>
  );
}
