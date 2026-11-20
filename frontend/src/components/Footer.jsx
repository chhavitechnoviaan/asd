// // // // // import { Mail, Phone, MapPin, Clock } from "lucide-react";
// // // // // import {
// // // // //   FaFacebookF,
// // // // //   FaInstagram,
// // // // //   FaLinkedinIn,
// // // // //   FaXTwitter,
// // // // // } from "react-icons/fa6";

// // // // // const product = [
// // // // //   { label: "Home", page: "Home" },
// // // // //   { label: "Pricing", page: "Pricing" },
// // // // //   { label: "AI Module", page: "AI Module" },
// // // // //   { label: "Resources", page: "Resources" },
// // // // // ];

// // // // // const company = [
// // // // //   { label: "Home", page: "Home" },
// // // // //   { label: "About Us", page: "About" },
// // // // //   { label: "Contact", page: "Contact Us" },
// // // // // ];

// // // // // const legal = [
// // // // //   { label: "Refund Policy", page: "Refund Policy" },
// // // // //   { label: "Privacy Policy", page: "Privacy Policy" },
// // // // //   { label: "Terms & Conditions", page: "Terms & Conditions" },
// // // // // ];

// // // // // const helpCenter = [{ label: "Help Center", page: "Help Center" }];

// // // // // const footerLinks = {
// // // // //   Product: product,
// // // // //   Company: company,
// // // // //   Legal: legal,
// // // // //   "Help Center": helpCenter,
// // // // // };

// // // // // const socialIcons = [
// // // // //   { Icon: FaFacebookF, label: "Facebook" },
// // // // //   { Icon: FaInstagram, label: "Instagram" },
// // // // //   { Icon: FaLinkedinIn, label: "LinkedIn" },
// // // // //   { Icon: FaXTwitter, label: "X" },
// // // // // ];

// // // // // export default function Footer({ onNavigate }) {
// // // // //   return (
// // // // //     <footer className="bg-gray-900 text-gray-400 px-4 sm:px-8 md:px-12 lg:px-16 pt-12 pb-6">
// // // // //       <div className="max-w-6xl mx-auto">
// // // // //         <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 mb-10">
// // // // //           <div className="col-span-2 sm:col-span-3 lg:col-span-1">
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => onNavigate?.("Home")}
// // // // //               aria-label="Go to Home"
// // // // //             >
// // // // //               <h3 className="text-white font-bold text-sm mb-2">
// // // // //                 ASD CargoMate<sup className="text-xs">™</sup>
// // // // //               </h3>
// // // // //             </button>

// // // // //             <p className="text-gray-400 text-xs leading-relaxed mb-4">
// // // // //               AI-powered logistics intelligence platform helping businesses
// // // // //               plan, compare and ship with confidence.
// // // // //             </p>

// // // // //             <div className="space-y-2 text-xs text-gray-400 mb-4">
// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
// // // // //                 <a href="mailto:support@asdcargomate.com" className="hover:text-white">
// // // // //                   support@asdcargomate.com
// // // // //                 </a>
// // // // //               </div>

// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
// // // // //                 <a href="tel:+9118001234567" className="hover:text-white">
// // // // //                   +91 1800 123 4567
// // // // //                 </a>
// // // // //               </div>

// // // // //               <div className="flex items-start gap-2">
// // // // //                 <MapPin className="w-3.5 h-3.5 text-blue-400 mt-0.5 shrink-0" />
// // // // //                 <span>
// // // // //                   2nd Floor, Logistics Park, Gurgaon, Haryana, India
// // // // //                 </span>
// // // // //               </div>

// // // // //               <div className="flex items-center gap-2">
// // // // //                 <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
// // // // //                 <span>Mon-Sat: 9:00 AM - 6:00 PM</span>
// // // // //               </div>
// // // // //             </div>

// // // // //             <div className="flex items-center gap-3">
// // // // //               {socialIcons.map(({ Icon, label }) => (
// // // // //                 <button
// // // // //                   key={label}
// // // // //                   type="button"
// // // // //                   aria-label={label}
// // // // //                   title={label}
// // // // //                   className="w-8 h-8 bg-gray-700 hover:bg-blue-600 rounded-full flex items-center justify-center transition-colors"
// // // // //                 >
// // // // //                   <Icon size={13} className="text-gray-300" />
// // // // //                 </button>
// // // // //               ))}
// // // // //             </div>
// // // // //           </div>

// // // // //           {Object.entries(footerLinks).map(([heading, links]) => (
// // // // //             <div key={heading}>
// // // // //               <h4 className="text-white font-semibold text-sm mb-4">
// // // // //                 {heading}
// // // // //               </h4>

// // // // //               <ul className="space-y-2.5">
// // // // //                 {links.map(({ label, page }) => (
// // // // //                   <li key={label}>
// // // // //                     <button
// // // // //                       type="button"
// // // // //                       onClick={() => onNavigate?.(page)}
// // // // //                       className="text-gray-400 hover:text-white text-xs transition-colors text-left"
// // // // //                     >
// // // // //                       {label}
// // // // //                     </button>
// // // // //                   </li>
// // // // //                 ))}
// // // // //               </ul>
// // // // //             </div>
// // // // //           ))}
// // // // //         </div>

// // // // //         <div className="border-t border-gray-700 pt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
// // // // //           <p className="text-gray-500 text-xs text-center sm:text-left">
// // // // //             © 2026 ASD CargoMate. A product of ASD Logistics (MSME). All
// // // // //             rights reserved.
// // // // //           </p>

// // // // //           <div className="flex items-center gap-4">
// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => onNavigate?.("Refund Policy")}
// // // // //               className="text-gray-400 hover:text-white text-xs transition-colors"
// // // // //             >
// // // // //               Refund
// // // // //             </button>

// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => onNavigate?.("Privacy Policy")}
// // // // //               className="text-gray-400 hover:text-white text-xs transition-colors"
// // // // //             >
// // // // //               Privacy
// // // // //             </button>

// // // // //             <button
// // // // //               type="button"
// // // // //               onClick={() => onNavigate?.("Terms & Conditions")}
// // // // //               className="text-gray-400 hover:text-white text-xs transition-colors"
// // // // //             >
// // // // //               Terms
// // // // //             </button>
// // // // //           </div>
// // // // //         </div>
// // // // //       </div>
// // // // //     </footer>
// // // // //   );
// // // // // }

// // // // import {
// // // //   Mail,
// // // //   Phone,
// // // //   MapPin,
// // // //   Clock,
// // // //   Globe2,
// // // //   Sparkles,
// // // //   ArrowUpRight,
// // // // } from "lucide-react";

// // // // import {
// // // //   FaFacebookF,
// // // //   FaInstagram,
// // // //   FaLinkedinIn,
// // // //   FaXTwitter,
// // // // } from "react-icons/fa6";

// // // // const product = [
// // // //   { label: "Home", page: "Home" },
// // // //   { label: "Pricing", page: "Pricing" },
// // // //   { label: "AI Module", page: "AI Module" },
// // // //   { label: "Resources", page: "Resources" },
// // // // ];

// // // // const company = [
// // // //   { label: "Home", page: "Home" },
// // // //   { label: "About Us", page: "About" },
// // // //   { label: "Contact", page: "Contact Us" },
// // // // ];

// // // // const legal = [
// // // //   { label: "Refund Policy", page: "Refund Policy" },
// // // //   { label: "Privacy Policy", page: "Privacy Policy" },
// // // //   {
// // // //     label: "Terms & Conditions",
// // // //     page: "Terms & Conditions",
// // // //   },
// // // // ];

// // // // const helpCenter = [
// // // //   { label: "Help Center", page: "Help Center" },
// // // // ];

// // // // const footerLinks = {
// // // //   Product: product,
// // // //   Company: company,
// // // //   Legal: legal,
// // // //   "Help Center": helpCenter,
// // // // };

// // // // const socialIcons = [
// // // //   { Icon: FaFacebookF, label: "Facebook" },
// // // //   { Icon: FaInstagram, label: "Instagram" },
// // // //   { Icon: FaLinkedinIn, label: "LinkedIn" },
// // // //   { Icon: FaXTwitter, label: "X" },
// // // // ];

// // // // export default function Footer({ onNavigate }) {
// // // //   return (
// // // //     <footer className="relative isolate overflow-hidden border-t border-[#D9EDF2] bg-gradient-to-b from-[#EAF9FC] via-[#F3FBFD] to-white text-slate-600">
// // // //       {/* Background glow */}
// // // //       <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />
// // // //       <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-200/20 blur-3xl" />

// // // //       <div className="relative z-10 mx-auto max-w-6xl px-4 pb-7 pt-14 sm:px-6 sm:pt-16">
// // // //         {/* Main Footer */}
// // // //         <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:grid-cols-5 lg:gap-8">
// // // //           {/* Brand & Contact */}
// // // //           <div className="col-span-2 sm:col-span-3 lg:col-span-1">
// // // //             <button
// // // //               type="button"
// // // //               onClick={() => onNavigate?.("Home")}
// // // //               aria-label="Go to Home"
// // // //               className="flex items-center gap-3 text-left"
// // // //             >
// // // //               <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-gradient-to-br from-[#DDF9F5] to-[#DDEFFF] text-[#089FAB] shadow-sm">
// // // //                 <Globe2 className="h-6 w-6" />
// // // //               </span>

// // // //               <span className="text-lg font-extrabold tracking-tight text-[#102A43]">
// // // //                 ASD{" "}
// // // //                 <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
// // // //                   CargoMate
// // // //                 </span>
// // // //                 <sup className="ml-0.5 text-[10px] text-slate-400">
// // // //                   ™
// // // //                 </sup>
// // // //               </span>
// // // //             </button>

// // // //             <p className="mt-5 max-w-xs text-sm leading-6 text-slate-500">
// // // //               AI-powered logistics intelligence platform
// // // //               helping businesses plan, compare and ship
// // // //               with confidence.
// // // //             </p>

// // // //             <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5">
// // // //               <Sparkles className="h-3.5 w-3.5 text-teal-600" />
// // // //               <span className="text-[11px] font-semibold text-teal-700">
// // // //                 Ask. Plan. Ship.
// // // //               </span>
// // // //             </div>

// // // //             {/* Contact Information */}
// // // //             <div className="mt-6 space-y-3 text-xs">
// // // //               <div className="flex items-center gap-3">
// // // //                 <Mail className="h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // // //                 <a
// // // //                   href="mailto:support@asdcargomate.com"
// // // //                   className="break-all text-slate-500 transition-colors hover:text-[#089FAB]"
// // // //                 >
// // // //                   support@asdcargomate.com
// // // //                 </a>
// // // //               </div>

// // // //               <div className="flex items-center gap-3">
// // // //                 <Phone className="h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // // //                 <a
// // // //                   href="tel:+9118001234567"
// // // //                   className="text-slate-500 transition-colors hover:text-[#089FAB]"
// // // //                 >
// // // //                   +91 1800 123 4567
// // // //                 </a>
// // // //               </div>

// // // //               <div className="flex items-start gap-3">
// // // //                 <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // // //                 <span className="leading-5 text-slate-500">
// // // //                   2nd Floor, Logistics Park, Gurgaon,
// // // //                   Haryana, India
// // // //                 </span>
// // // //               </div>

// // // //               <div className="flex items-center gap-3">
// // // //                 <Clock className="h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // // //                 <span className="text-slate-500">
// // // //                   Mon-Sat: 9:00 AM - 6:00 PM
// // // //                 </span>
// // // //               </div>
// // // //             </div>

// // // //             {/* Social Media */}
// // // //             <div className="mt-6 flex items-center gap-3">
// // // //               {socialIcons.map(({ Icon, label }) => (
// // // //                 <span
// // // //                   key={label}
// // // //                   title={label}
// // // //                   className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7EAF0] bg-white text-[#0B8998] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-[0_8px_20px_rgba(6,182,212,0.13)]"
// // // //                 >
// // // //                   <Icon size={15} />
// // // //                 </span>
// // // //               ))}
// // // //             </div>
// // // //           </div>

// // // //           {/* Footer Navigation */}
// // // //           {Object.entries(footerLinks).map(
// // // //             ([heading, links]) => (
// // // //               <div key={heading}>
// // // //                 <h4 className="relative mb-5 inline-block text-sm font-bold text-[#14314C]">
// // // //                   {heading}

// // // //                   <span className="absolute -bottom-2 left-0 h-0.5 w-7 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
// // // //                 </h4>

// // // //                 <ul className="space-y-3">
// // // //                   {links.map(({ label, page }) => (
// // // //                     <li key={`${heading}-${label}`}>
// // // //                       <button
// // // //                         type="button"
// // // //                         onClick={() => onNavigate?.(page)}
// // // //                         className="group inline-flex items-center gap-1 text-left text-xs leading-5 text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-[#089FAB]"
// // // //                       >
// // // //                         <span>{label}</span>

// // // //                         <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
// // // //                       </button>
// // // //                     </li>
// // // //                   ))}
// // // //                 </ul>
// // // //               </div>
// // // //             )
// // // //           )}
// // // //         </div>

// // // //         {/* Divider */}
// // // //         <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#C7E6ED] to-transparent" />

// // // //         {/* Copyright and Legal */}
// // // //         <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">
// // // //           <p className="text-xs leading-6 text-slate-500">
// // // //             © 2026 ASD CargoMate. A product of ASD
// // // //             Logistics (MSME). All rights reserved.
// // // //           </p>

// // // //           <div className="flex flex-wrap items-center justify-center gap-5">
// // // //             {[
// // // //               { label: "Refund", page: "Refund Policy" },
// // // //               { label: "Privacy", page: "Privacy Policy" },
// // // //               {
// // // //                 label: "Terms",
// // // //                 page: "Terms & Conditions",
// // // //               },
// // // //             ].map(({ label, page }) => (
// // // //               <button
// // // //                 key={label}
// // // //                 type="button"
// // // //                 onClick={() => onNavigate?.(page)}
// // // //                 className="text-xs font-medium text-slate-500 transition-colors hover:text-[#089FAB]"
// // // //               >
// // // //                 {label}
// // // //               </button>
// // // //             ))}
// // // //           </div>
// // // //         </div>
// // // //       </div>
// // // //     </footer>
// // // //   );
// // // // }

// // // import {
// // //   Mail,
// // //   Phone,
// // //   MapPin,
// // //   Clock,
// // //   Globe2,
// // //   Sparkles,
// // //   ArrowUpRight,
// // // } from "lucide-react";

// // // import {
// // //   FaFacebookF,
// // //   FaInstagram,
// // //   FaLinkedinIn,
// // //   FaXTwitter,
// // // } from "react-icons/fa6";

// // // // Product Links
// // // const product = [
// // //   { label: "Home", page: "Home" },
// // //   { label: "Pricing", page: "Pricing" },
// // //   { label: "AI Module", page: "AI Module" },
// // //   { label: "Resources", page: "Resources" },
// // // ];

// // // // Company Links
// // // const company = [
// // //   { label: "Home", page: "Home" },
// // //   { label: "About Us", page: "About" },
// // //   { label: "Contact", page: "Contact Us" },
// // // ];

// // // // Legal Links
// // // const legal = [
// // //   { label: "Refund Policy", page: "Refund Policy" },
// // //   { label: "Privacy Policy", page: "Privacy Policy" },
// // //   {
// // //     label: "Terms & Conditions",
// // //     page: "Terms & Conditions",
// // //   },
// // // ];

// // // // Help Center
// // // const helpCenter = [
// // //   { label: "Help Center", page: "Help Center" },
// // // ];

// // // const footerLinks = {
// // //   Product: product,
// // //   Company: company,
// // //   Legal: legal,
// // //   "Help Center": helpCenter,
// // // };

// // // // Social Media Icons
// // // const socialIcons = [
// // //   { Icon: FaFacebookF, label: "Facebook" },
// // //   { Icon: FaInstagram, label: "Instagram" },
// // //   { Icon: FaLinkedinIn, label: "LinkedIn" },
// // //   { Icon: FaXTwitter, label: "X" },
// // // ];

// // // // Bottom Legal Links
// // // const bottomLinks = [
// // //   { label: "Refund", page: "Refund Policy" },
// // //   { label: "Privacy", page: "Privacy Policy" },
// // //   { label: "Terms", page: "Terms & Conditions" },
// // // ];

// // // export default function Footer({ onNavigate }) {
// // //   return (
// // //     <footer className="relative isolate overflow-hidden border-t border-[#D9EDF2] bg-gradient-to-b from-[#EAF9FC] via-[#F3FBFD] to-white text-slate-600">

// // //       {/* Background Glow */}
// // //       <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-200/25 blur-3xl" />

// // //       <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-teal-200/20 blur-3xl" />

// // //       <div className="relative z-10 mx-auto max-w-7xl px-4 pb-7 pt-14 sm:px-6 lg:px-8 sm:pt-16">

// // //         {/* Main Footer */}
// // //         <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-4 lg:grid-cols-6 lg:gap-8">

// // //           {/* Brand & Contact Section */}
// // //           <div className="col-span-2 sm:col-span-4 lg:col-span-2">

// // //             {/* Brand Logo */}
// // //             <button
// // //               type="button"
// // //               onClick={() => onNavigate?.("Home")}
// // //               aria-label="Go to Home"
// // //               className="flex items-center gap-3 text-left"
// // //             >
// // //               <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-gradient-to-br from-[#DDF9F5] to-[#DDEFFF] text-[#089FAB] shadow-sm">
// // //                 <Globe2 className="h-6 w-6" />
// // //               </span>

// // //               <span className="text-lg font-extrabold tracking-tight text-[#102A43]">
// // //                 ASD{" "}
// // //                 <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
// // //                   CargoMate
// // //                 </span>

// // //                 <sup className="ml-0.5 text-[10px] text-slate-400">
// // //                   ™
// // //                 </sup>
// // //               </span>
// // //             </button>

// // //             {/* Brand Description */}
// // //             <p className="mt-5 max-w-sm text-sm leading-6 text-slate-500">
// // //               AI-powered logistics intelligence platform
// // //               helping businesses plan, compare and ship
// // //               with confidence.
// // //             </p>

// // //             {/* Brand Tagline */}
// // //             <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-3 py-1.5">
// // //               <Sparkles className="h-3.5 w-3.5 text-teal-600" />

// // //               <span className="text-[11px] font-semibold text-teal-700">
// // //                 Ask. Plan. Ship.
// // //               </span>
// // //             </div>

// // //             {/* Contact Information */}
// // //             <div className="mt-6 space-y-4 text-xs">

// // //               {/* Email */}
// // //               <div className="flex items-start gap-3">
// // //                 <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // //                 <a
// // //                   href="mailto:support@asdcargomate.com"
// // //                   className="break-all leading-5 text-slate-500 transition-colors hover:text-[#089FAB]"
// // //                 >
// // //                   support@asdcargomate.com
// // //                 </a>
// // //               </div>

// // //               {/* Phone */}
// // //               <div className="flex items-start gap-3">
// // //                 <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // //                 <a
// // //                   href="tel:+9118001234567"
// // //                   className="leading-5 text-slate-500 transition-colors hover:text-[#089FAB]"
// // //                 >
// // //                   +91 1800 123 4567
// // //                 </a>
// // //               </div>

// // //               {/* Updated Company Address */}
// // //               <div className="flex items-start gap-3">
// // //                 <MapPin className="mt-1 h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // //                 <div className="min-w-0">
// // //                   <p className="mb-1 font-bold text-[#14314C]">
// // //                     ASD LOGISTICS PVT LTD
// // //                   </p>

// // //                   <address className="not-italic leading-6 text-slate-500">
// // //                     VENKATA SAI NILAYAM,
// // //                     <br />
// // //                     H N.21-59/10, GR &amp; 1ST FLOOR,
// // //                     <br />
// // //                     HUDA COLONY, STREET NO.5,
// // //                     <br />
// // //                     R.B. NAGAR, SHAMSHABAD,
// // //                     <br />
// // //                     HYDERABAD - 501218.
// // //                   </address>
// // //                 </div>
// // //               </div>

// // //               {/* Working Hours */}
// // //               <div className="flex items-start gap-3">
// // //                 <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />

// // //                 <span className="leading-5 text-slate-500">
// // //                   Mon-Sat: 9:00 AM - 6:00 PM
// // //                 </span>
// // //               </div>
// // //             </div>

// // //             {/* Social Media */}
// // //             <div className="mt-6 flex items-center gap-3">
// // //               {socialIcons.map(({ Icon, label }) => (
// // //                 <span
// // //                   key={label}
// // //                   title={label}
// // //                   aria-label={label}
// // //                   className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D7EAF0] bg-white text-[#0B8998] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-600 hover:shadow-[0_8px_20px_rgba(6,182,212,0.13)]"
// // //                 >
// // //                   <Icon size={15} />
// // //                 </span>
// // //               ))}
// // //             </div>
// // //           </div>

// // //           {/* Footer Navigation */}
// // //           {Object.entries(footerLinks).map(
// // //             ([heading, links]) => (
// // //               <div key={heading} className="col-span-1">

// // //                 <h4 className="relative mb-6 inline-block text-sm font-bold text-[#14314C]">
// // //                   {heading}

// // //                   <span className="absolute -bottom-2 left-0 h-0.5 w-7 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
// // //                 </h4>

// // //                 <ul className="space-y-3">
// // //                   {links.map(({ label, page }) => (
// // //                     <li key={`${heading}-${label}`}>
// // //                       <button
// // //                         type="button"
// // //                         onClick={() => onNavigate?.(page)}
// // //                         className="group inline-flex items-center gap-1 text-left text-xs leading-5 text-slate-500 transition-all duration-200 hover:translate-x-1 hover:text-[#089FAB]"
// // //                       >
// // //                         <span>{label}</span>

// // //                         <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
// // //                       </button>
// // //                     </li>
// // //                   ))}
// // //                 </ul>
// // //               </div>
// // //             )
// // //           )}
// // //         </div>

// // //         {/* Footer Divider */}
// // //         <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#C7E6ED] to-transparent" />

// // //         {/* Copyright & Legal Section */}
// // //         <div className="flex flex-col items-center justify-between gap-5 pt-7 text-center sm:flex-row sm:text-left">

// // //           <p className="text-xs leading-6 text-slate-500">
// // //             © 2026 ASD CargoMate. A product of
// // //             ASD Logistics (MSME). All rights reserved.
// // //           </p>

// // //           <div className="flex flex-wrap items-center justify-center gap-5">
// // //             {bottomLinks.map(({ label, page }) => (
// // //               <button
// // //                 key={label}
// // //                 type="button"
// // //                 onClick={() => onNavigate?.(page)}
// // //                 className="text-xs font-medium text-slate-500 transition-colors hover:text-[#089FAB]"
// // //               >
// // //                 {label}
// // //               </button>
// // //             ))}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     </footer>
// // //   );
// // // }

// // import {
// //   Mail,
// //   Phone,
// //   MapPin,
// //   Clock,
// //   Globe2,
// //   Sparkles,
// //   ArrowUpRight,
// // } from "lucide-react";

// // import {
// //   FaFacebookF,
// //   FaInstagram,
// //   FaLinkedinIn,
// //   FaXTwitter,
// // } from "react-icons/fa6";

// // const footerLinks = {
// //   Product: [
// //     { label: "Home", page: "Home" },
// //     { label: "Pricing", page: "Pricing" },
// //     { label: "AI Module", page: "AI Module" },
// //     { label: "Resources", page: "Resources" },
// //   ],
// //   Company: [
// //     { label: "Home", page: "Home" },
// //     { label: "About Us", page: "About" },
// //     { label: "Contact", page: "Contact Us" },
// //   ],
// //   Legal: [
// //     { label: "Refund Policy", page: "Refund Policy" },
// //     { label: "Privacy Policy", page: "Privacy Policy" },
// //     {
// //       label: "Terms & Conditions",
// //       page: "Terms & Conditions",
// //     },
// //   ],
// //   "Help Center": [
// //     { label: "Help Center", page: "Help Center" },
// //   ],
// // };

// // const socialIcons = [
// //   { Icon: FaFacebookF, label: "Facebook" },
// //   { Icon: FaInstagram, label: "Instagram" },
// //   { Icon: FaLinkedinIn, label: "LinkedIn" },
// //   { Icon: FaXTwitter, label: "X" },
// // ];

// // const bottomLinks = [
// //   { label: "Refund", page: "Refund Policy" },
// //   { label: "Privacy", page: "Privacy Policy" },
// //   { label: "Terms", page: "Terms & Conditions" },
// // ];

// // export default function Footer({ onNavigate }) {
// //   return (
// //     <footer className="relative overflow-hidden border-t border-[#D6EBF0] bg-gradient-to-br from-[#EAF9FC] via-[#F5FCFD] to-[#EAFBF8] text-slate-600">

// //       {/* Subtle background glow */}
// //       <div className="pointer-events-none absolute -left-24 -top-20 h-56 w-56 rounded-full bg-cyan-200/20 blur-3xl" />
// //       <div className="pointer-events-none absolute -right-20 bottom-0 h-56 w-56 rounded-full bg-teal-200/20 blur-3xl" />

// //       <div className="relative mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">

// //         {/* Top: Brand and Navigation */}
// //         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.5fr_3fr] lg:gap-12">

// //           {/* Brand */}
// //           <div>
// //             <button
// //               type="button"
// //               onClick={() => onNavigate?.("Home")}
// //               className="flex items-center gap-2.5 text-left"
// //               aria-label="Go to Home"
// //             >
// //               <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-teal-200 bg-teal-50 text-[#089FAB]">
// //                 <Globe2 className="h-5 w-5" />
// //               </span>

// //               <span className="text-base font-extrabold text-[#102A43]">
// //                 ASD{" "}
// //                 <span className="bg-gradient-to-r from-[#14B8A6] to-[#0EA5E9] bg-clip-text text-transparent">
// //                   CargoMate
// //                 </span>
// //                 <sup className="ml-0.5 text-[9px] text-slate-400">
// //                   ™
// //                 </sup>
// //               </span>
// //             </button>

// //             <p className="mt-3 max-w-sm text-xs leading-5 text-slate-500">
// //               AI-powered logistics intelligence platform
// //               helping businesses plan, compare and ship
// //               with confidence.
// //             </p>

// //             <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1">
// //               <Sparkles className="h-3 w-3 text-teal-600" />
// //               <span className="text-[10px] font-semibold text-teal-700">
// //                 Ask. Plan. Ship.
// //               </span>
// //             </div>

// //             {/* Social Icons */}
// //             <div className="mt-4 flex items-center gap-2">
// //               {socialIcons.map(({ Icon, label }) => (
// //                 <span
// //                   key={label}
// //                   title={label}
// //                   className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D7EAF0] bg-white text-[#0B8998] transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:bg-cyan-50"
// //                 >
// //                   <Icon size={13} />
// //                 </span>
// //               ))}
// //             </div>
// //           </div>

// //           {/* Navigation Columns */}
// //           <div className="grid grid-cols-2 gap-x-5 gap-y-6 sm:grid-cols-4 sm:gap-6">
// //             {Object.entries(footerLinks).map(
// //               ([heading, links]) => (
// //                 <div key={heading}>
// //                   <h4 className="relative mb-4 inline-block text-xs font-bold text-[#14314C]">
// //                     {heading}
// //                     <span className="absolute -bottom-1.5 left-0 h-0.5 w-6 rounded-full bg-teal-400" />
// //                   </h4>

// //                   <ul className="space-y-2">
// //                     {links.map(({ label, page }) => (
// //                       <li key={`${heading}-${label}`}>
// //                         <button
// //                           type="button"
// //                           onClick={() => onNavigate?.(page)}
// //                           className="group inline-flex items-center gap-1 text-left text-[11px] leading-5 text-slate-500 transition-colors hover:text-[#089FAB]"
// //                         >
// //                           {label}
// //                           <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
// //                         </button>
// //                       </li>
// //                     ))}
// //                   </ul>
// //                 </div>
// //               )
// //             )}
// //           </div>
// //         </div>

// //         {/* Compact Contact Strip */}
// //         <div className="mt-7 grid grid-cols-1 gap-4 rounded-xl border border-[#D6EBF0] bg-white/65 px-4 py-4 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1.1fr_1.8fr] lg:items-start">

// //           {/* Email */}
// //           <div className="flex items-start gap-2">
// //             <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />
// //             <a
// //               href="mailto:support@asdcargomate.com"
// //               className="break-all text-[11px] leading-5 text-slate-600 hover:text-[#089FAB]"
// //             >
// //               support@asdcargomate.com
// //             </a>
// //           </div>

// //           {/* Phone */}
// //           <div className="flex items-start gap-2">
// //             <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />
// //             <a
// //               href="tel:+9118001234567"
// //               className="text-[11px] leading-5 text-slate-600 hover:text-[#089FAB]"
// //             >
// //               +91 1800 123 4567
// //             </a>
// //           </div>

// //           {/* Working Hours */}
// //           <div className="flex items-start gap-2">
// //             <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />
// //             <span className="text-[11px] leading-5 text-slate-600">
// //               Mon-Sat: 9:00 AM - 6:00 PM
// //             </span>
// //           </div>

// //           {/* Company Address */}
// //           <div className="flex items-start gap-2">
// //             <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0AA6B5]" />
// //             <div className="min-w-0 text-[11px] leading-5">
// //               <p className="font-bold text-[#14314C]">
// //                 ASD LOGISTICS PVT LTD
// //               </p>
// //               <address className="not-italic text-slate-500">
// //                 VENKATA SAI NILAYAM, H N.21-59/10,
// //                 GR &amp; 1ST FLOOR, HUDA COLONY,
// //                 STREET NO.5, R.B. NAGAR, SHAMSHABAD,
// //                 HYDERABAD - 501218.
// //               </address>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Bottom Bar */}
// //         <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t border-[#D6EBF0] pt-5 text-center sm:flex-row sm:text-left">
// //           <p className="text-[11px] leading-5 text-slate-500">
// //             © 2026 ASD CargoMate. A product of
// //             ASD Logistics (MSME). All rights reserved.
// //           </p>

// //           <div className="flex items-center gap-4">
// //             {bottomLinks.map(({ label, page }) => (
// //               <button
// //                 key={label}
// //                 type="button"
// //                 onClick={() => onNavigate?.(page)}
// //                 className="text-[11px] font-medium text-slate-500 transition-colors hover:text-[#089FAB]"
// //               >
// //                 {label}
// //               </button>
// //             ))}
// //           </div>
// //         </div>
// //       </div>
// //     </footer>
// //   );
// // }

// import {
//   Mail,
//   Phone,
//   MapPin,
//   Clock,
//   Globe2,
//   Sparkles,
//   ArrowUpRight,
// } from "lucide-react";

// import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa6";

// // import {
// //   FaFacebookF,
// //   FaInstagram,
// //   FaLinkedinIn,
// //   FaXTwitter,
// // } from "react-icons/fa6";

// const footerLinks = {
//   Product: [
//     { label: "Home", page: "Home" },
//     { label: "Pricing", page: "Pricing" },
//     { label: "AI Module", page: "AI Module" },
//     { label: "Resources", page: "Resources" },
//   ],
//   Company: [
//     { label: "Home", page: "Home" },
//     { label: "About Us", page: "About" },
//     { label: "Contact", page: "Contact Us" },
//   ],
//   Legal: [
//     { label: "Refund Policy", page: "Refund Policy" },
//     { label: "Privacy Policy", page: "Privacy Policy" },
//     { label: "Terms & Conditions", page: "Terms & Conditions" },
//   ],
//   "Help Center": [{ label: "Help Center", page: "Help Center" }],
// };

// // const socials = [
// //   { Icon: FaFacebookF, label: "Facebook" },
// //   { Icon: FaInstagram, label: "Instagram" },
// //   { Icon: FaLinkedinIn, label: "LinkedIn" },
// //   { Icon: FaXTwitter, label: "X" },
// // ];

// const socials = [
//   {
//     Icon: FaFacebookF,
//     label: "Facebook",
//     url: "https://www.facebook.com/asdcargomate/",
//   },
//   {
//     Icon: FaInstagram,
//     label: "Instagram",
//     url: "https://www.instagram.com/asdcargomate/",
//   },
//   {
//     Icon: FaYoutube,
//     label: "YouTube",
//     url: "https://www.youtube.com/@asdcargomate",
//   },
// ];

// const legalBottom = [
//   { label: "Refund", page: "Refund Policy" },
//   { label: "Privacy", page: "Privacy Policy" },
//   { label: "Terms", page: "Terms & Conditions" },
// ];

// export default function Footer({ onNavigate }) {
//   return (
//     <footer className="relative overflow-hidden border-t border-cyan-100 bg-gradient-to-br from-[#EAF9FC] via-[#F8FCFF] to-[#EAF9F6]">
//       <div className="pointer-events-none absolute -left-24 -top-24 h-60 w-60 rounded-full bg-cyan-200/20 blur-3xl" />

//       <div className="relative mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
//         {/* Main Content */}
//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.4fr_3fr] lg:gap-12">
//           {/* Brand */}
//           <div>
//             <button
//               type="button"
//               onClick={() => onNavigate?.("Home")}
//               className="flex items-center gap-2.5 text-left"
//             >
//               <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-[#089FAB]">
//                 <Globe2 className="h-5 w-5" />
//               </span>

//               <span className="text-lg font-extrabold tracking-tight text-[#102A43]">
//                 ASD{" "}
//                 <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
//                   CargoMate
//                 </span>
//                 <sup className="ml-0.5 text-[9px] text-slate-400">™</sup>
//               </span>
//             </button>

//             <p className="mt-3 max-w-xs text-xs leading-6 text-slate-500">
//               AI-powered logistics intelligence for smarter global shipping.
//             </p>

//             {/* <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-teal-200 bg-teal-50 px-3 py-1">
//               <Sparkles className="h-3 w-3 text-teal-600" />
//               <span className="text-[10px] font-semibold text-teal-700">
//                 Ask. Plan. Ship.
//               </span>
//             </div> */}

//             {/* <div className="mt-4 flex gap-2">
//               {socials.map(({ Icon, label }) => (
//                 <span
//                   key={label}
//                   title={label}
//                   className="flex h-8 w-8 items-center justify-center rounded-full border border-cyan-100 bg-white text-[#089FAB] shadow-sm transition-all hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50"
//                 >
//                   <Icon size={13} />
//                 </span>
//               ))}
//             </div> */}
// <div className="flex items-start gap-2 mt-5">
//             <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#089FAB]" />
//             <div className="min-w-0 text-[11px] leading-5">
//               <p className="font-bold text-[#102A43]">ASD LOGISTICS PVT LTD</p>
//               <address className="not-italic text-slate-500">
//                 VENKATA SAI NILAYAM, H N.21-59/10, GR &amp; 1ST FLOOR, HUDA
//                 COLONY, STREET NO.5, R.B. NAGAR, SHAMSHABAD, HYDERABAD - 501218.
//               </address>
//             </div>
//           </div>
//             {/* Social Media Links */}
       
//           </div>

//           {/* Navigation */}
//           <div className="grid grid-cols-2 gap-x-6 gap-y-6 sm:grid-cols-4">
//             {Object.entries(footerLinks).map(([heading, links]) => (
//               <div key={heading}>
//                 <h4 className="mb-4 text-xs font-bold text-[#102A43]">
//                   {heading}
//                   <span className="mt-1.5 block h-0.5 w-6 rounded-full bg-teal-400" />
//                 </h4>

//                 <ul className="space-y-2">
//                   {links.map(({ label, page }) => (
//                     <li key={`${heading}-${label}`}>
//                       <button
//                         type="button"
//                         onClick={() => onNavigate?.(page)}
//                         className="group inline-flex items-center gap-1 text-left text-[11px] leading-5 text-slate-500 transition-colors hover:text-teal-600"
//                       >
//                         {label}
//                         <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
//                       </button>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Contact Row */}
//         <div className="mt-7 grid grid-cols-1 gap-20  pt-5 sm:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1.2fr_2fr]">
          

//           <div>
//             <div className="flex items-start gap-2">
//               <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#089FAB]" />
//               <a
//                 href="mailto:support@asdcargomate.com"
//                 className="break-all text-[11px] leading-5 text-slate-600 hover:text-teal-600"
//               >
//                 support@asdcargomate.com
//               </a>
//             </div>

//             <div className="flex items-start gap-2">
//               <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#089FAB]" />
//               <a
//                 href="tel:+9118001234567"
//                 className="text-[11px] leading-5 text-slate-600 hover:text-teal-600"
//               >
//                 +91 1800 123 4567
//               </a>
//             </div>

//             <div className="flex items-start gap-2">
//               <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#089FAB]" />
//               <span className="text-[11px] leading-5 text-slate-600">
//                 Mon-Sat: 9 AM - 6 PM
//               </span>
//             </div>
//           </div>

//                <div className="mt-4 flex items-center gap-2.5">
//               {socials.map(({ Icon, label, url }) => (
//                 <a
//                   key={label}
//                   href={url}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   aria-label={`Visit ASD CargoMate on ${label}`}
//                   title={label}
//                   className="group flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-[#089FAB] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 hover:text-white hover:shadow-[0_6px_18px_rgba(20,184,166,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
//                 >
//                   <Icon size={15} />
//                 </a>
//               ))}
//             </div>
//         </div>

//         {/* Bottom Bar */}
//         <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-[#D5E9EE] pt-4 text-center sm:flex-row sm:text-left">
//           <p className="text-[11px] text-slate-500">
//             © 2026 ASD CargoMate. A product of ASD Logistics (MSME). All rights
//             reserved.
//           </p>

//           <div className="flex items-center gap-4">
//             {legalBottom.map(({ label, page }) => (
//               <button
//                 key={label}
//                 type="button"
//                 onClick={() => onNavigate?.(page)}
//                 className="text-[11px] font-medium text-slate-500 transition-colors hover:text-teal-600"
//               >
//                 {label}
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }




import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe2,
  ArrowUpRight,
} from "lucide-react";

import {
  FaFacebookF,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const footerLinks = {
  QuickLinks: [
    { label: "Home", page: "Home" },
    { label: "About Us", page: "About" },
    { label: "AI Module", page: "AI Module" },
    { label: "Pricing", page: "Pricing" },
    { label: "Resources", page: "Resources" },
  ],
  Legal: [
    { label: "Refund Policy", page: "Refund Policy" },
    { label: "Privacy Policy", page: "Privacy Policy" },
    {
      label: "Terms & Conditions",
      page: "Terms & Conditions",
    },
  ],
   Contact: [
    { label: "Contact", page: "Contact Us" },
  ],
  "Help Center": [
    { label: "Help Center", page: "Help Center" },
  ],
};

const socials = [
  {
    Icon: FaFacebookF,
    label: "Facebook",
    url: "https://www.facebook.com/asdcargomate/",
  },
  {
    Icon: FaInstagram,
    label: "Instagram",
    url: "https://www.instagram.com/asdcargomate/",
  },
  {
    Icon: FaYoutube,
    label: "YouTube",
    url: "https://www.youtube.com/@asdcargomate",
  },
];

const legalBottom = [
  { label: "Refund", page: "Refund Policy" },
  { label: "Privacy", page: "Privacy Policy" },
  { label: "Terms", page: "Terms & Conditions" },
];

export default function Footer({ onNavigate }) {
  return (
    <footer className="relative overflow-hidden border-t border-[#D5E9EE] bg-gradient-to-br from-[#EAF9FC] via-[#F8FCFF] to-[#ECFAF7] text-slate-600">

      {/* Background Glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-cyan-200/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 py-9 sm:px-8 lg:px-10">

        {/* MAIN FOOTER */}
        <div className="grid grid-cols-1 gap-9 lg:grid-cols-[1.45fr_3fr] lg:gap-14">

          {/* LEFT: BRAND + ADDRESS */}
          <div className="min-w-0">

            {/* Logo */}
            <button
              type="button"
              onClick={() => onNavigate?.("Home")}
              aria-label="Go to Home"
              className="flex items-center gap-3 text-left"
            >
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-teal-200 bg-teal-50 text-[#089FAB] shadow-sm">
                <Globe2 className="h-5 w-5" />
              </span>

              <span className="text-lg font-extrabold tracking-tight text-[#102A43]">
                ASD{" "}
                <span className="bg-gradient-to-r from-teal-500 to-cyan-500 bg-clip-text text-transparent">
                  CargoMate
                </span>
                <sup className="ml-0.5 text-[9px] text-slate-400">
                  ™
                </sup>
              </span>
            </button>

            {/* Description */}
            <p className="mt-3 max-w-sm text-xs leading-5 text-slate-500">
              AI-powered logistics intelligence for smarter
              global shipping.
            </p>

            {/* Address */}
            <div className="mt-5 flex items-start gap-3">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-[#089FAB]">
                <MapPin className="h-4 w-4" />
              </span>

              <div className="min-w-0">
                <p className="text-xs font-bold text-[#102A43]">
                  ASD LOGISTICS PVT LTD
                </p>

                <address className="mt-1 max-w-sm text-[11px] not-italic leading-[19px] text-slate-500">
                  VENKATA SAI NILAYAM,
                  H N.21-59/10, GR &amp; 1ST FLOOR,
                  HUDA COLONY, STREET NO.5,
                  R.B. NAGAR, SHAMSHABAD,
                  HYDERABAD - 501218.
                </address>
              </div>
            </div>
          </div>

          {/* RIGHT: NAVIGATION */}
          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-6 gap-y-7 sm:grid-cols-4 sm:gap-5"
          >
            {Object.entries(footerLinks).map(
              ([heading, links]) => (
                <div key={heading} className="min-w-0">
                  <h4 className="mb-4 text-xs font-bold text-[#102A43]">
                    {heading}
                    <span className="mt-2 block h-0.5 w-7 rounded-full bg-gradient-to-r from-teal-400 to-cyan-400" />
                  </h4>

                  <ul className="space-y-2.5">
                    {links.map(({ label, page }) => (
                      <li key={`${heading}-${label}`}>
                        <button
                          type="button"
                          onClick={() => onNavigate?.(page)}
                          className="group inline-flex items-center gap-1 text-left text-[11px] leading-5 text-slate-500 transition-colors duration-200 hover:text-[#089FAB]"
                        >
                          <span>{label}</span>

                          <ArrowUpRight className="h-3 w-3 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )
            )}
          </nav>
        </div>

        {/* CONTACT + SOCIAL ROW */}
        <div className="mt-7 grid grid-cols-1 gap-4 border-t border-[#D5E9EE] pt-5 sm:grid-cols-2 lg:grid-cols-[1.35fr_1fr_1.2fr_auto] lg:items-center lg:gap-6">

          {/* Email */}
          <a
            href="mailto:support@asdcargomate.com"
            className="flex min-w-0 items-center gap-2.5 text-[11px] text-slate-600 transition-colors hover:text-teal-600"
          >
            <Mail className="h-4 w-4 shrink-0 text-[#089FAB]" />
            <span className="break-all">
              support@asdcargomate.com
            </span>
          </a>

          {/* Phone */}
          <a
            href="tel:+9118001234567"
            className="flex items-center gap-2.5 text-[11px] text-slate-600 transition-colors hover:text-teal-600"
          >
            <Phone className="h-4 w-4 shrink-0 text-[#089FAB]" />
            <span>+91 1800 123 4567</span>
          </a>

          {/* Working Hours */}
          <div className="flex items-center gap-2.5 text-[11px] text-slate-600">
            <Clock className="h-4 w-4 shrink-0 text-[#089FAB]" />
            <span>Mon-Sat: 9 AM - 6 PM</span>
          </div>

          {/* Social Media */}
          <div className="flex items-center gap-2 lg:justify-end">
            {socials.map(({ Icon, label, url }) => (
              <a
                key={label}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ASD CargoMate on ${label}`}
                title={label}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-cyan-100 bg-white text-[#089FAB] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-300 hover:bg-gradient-to-br hover:from-teal-500 hover:to-cyan-500 hover:text-white hover:shadow-[0_6px_18px_rgba(20,184,166,0.25)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-500"
              >
                <Icon size={15} />
              </a>
            ))}
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="mt-5 flex flex-col items-center justify-between gap-3 border-t border-[#D5E9EE] pt-4 text-center sm:flex-row sm:text-left">

          <p className="text-[11px] leading-5 text-slate-500">
            © 2026 ASD CargoMate. A product of ASD
            Logistics (MSME). All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            {legalBottom.map(({ label, page }) => (
              <button
                key={label}
                type="button"
                onClick={() => onNavigate?.(page)}
                className="text-[11px] font-medium text-slate-500 transition-colors hover:text-[#089FAB]"
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
