// // // // import { ArrowUpRight, Sparkles, Ship, Globe2, Plane, MapPin, MessageCircle, ClipboardList } from "lucide-react";
// // // // import globeImage from "../assets/asd-holographic-globe.png";
// // // // import { useNavigate } from "react-router-dom";
// // // // import "./HeroSearch.css";

// // // // export default function HeroSearch() {
// // // //   const navigate = useNavigate();
// // // //   return (
// // // //     <section className="asd-hero relative isolate overflow-hidden">
// // // //       <div className="asd-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
// // // //       <div className="relative mx-auto grid max-w-7xl min-h-[650px] grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">
// // // //         <div className="relative z-20 order-2 lg:order-1">
// // // //           <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
// // // //             <span className="asd-live-dot h-2 w-2 rounded-full bg-teal-400" />
// // // //             AI-Powered Global Trade &amp; Logistics
// // // //           </div>
// // // //           <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
// // // //             <span className="asd-gradient-text">Ask. Plan. Ship.</span>
// // // //           </h1>
// // // //           <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
// // // //             Your Global Trade Journey, Powered by AI.
// // // //           </h2>
// // // //           <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
// // // //             From EXIM benefits and compliance to freight insights and shipment planning, get everything you need to make smarter trade decisions — all in one intelligent platform.
// // // //           </p>
// // // //           <p className="mt-5 text-base font-bold text-teal-200 sm:text-lg">
// // // //             Ask smarter. Plan better. Ship globally.
// // // //           </p>
// // // //           <div className="mt-7 flex flex-wrap items-center gap-3">
// // // //             <button type="button" onClick={() => window.location.assign("/signup")}
// // // //               className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// // // //               Get Started <ArrowUpRight size={17} />
// // // //             </button>
// // // //             <button type="button" onClick={() => document.getElementById("asd-hero-features")?.scrollIntoView({ behavior: "smooth" })}
// // // //               className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// // // //               Explore Platform
// // // //             </button>
// // // //           </div>
// // // //         </div>

// // // //         <div className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]" aria-label="Animated glowing globe representing worldwide trade">
// // // //           <div className="asd-globe-ambient absolute" aria-hidden="true" />
// // // //           <div className="asd-orbit asd-orbit-one absolute" aria-hidden="true" />
// // // //           <div className="asd-orbit asd-orbit-two absolute" aria-hidden="true" />
// // // //           <div className="asd-orbit asd-orbit-three absolute" aria-hidden="true" />
// // // //           <div className="asd-globe-frame relative z-10">
// // // //             <div className="asd-globe-halo absolute inset-0" aria-hidden="true" />
// // // //             <img src={globeImage} alt="Blue digital globe" className="asd-globe-img relative h-full w-full object-contain" />
// // // //             <div className="asd-globe-shine absolute inset-0 pointer-events-none" aria-hidden="true" />
// // // //           </div>
// // // //           <div className="asd-globe-floor absolute" aria-hidden="true" />
// // // //           <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// // // //             <Plane size={16} className="text-cyan-300" /> Global connectivity
// // // //           </div>
// // // //           <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// // // //             <MapPin size={16} className="text-teal-300" /> Worldwide logistics
// // // //           </div>
// // // //           <div className="asd-orbit-dot asd-orbit-dot-one absolute" aria-hidden="true" />
// // // //           <div className="asd-orbit-dot asd-orbit-dot-two absolute" aria-hidden="true" />
// // // //         </div>
// // // //       </div>
// // // //       <div id="asd-hero-features" className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-10 sm:grid-cols-3 sm:px-8 lg:px-10">
// // // //         <div className="asd-feature-tile rounded-2xl p-5">
// // // //           <MessageCircle size={23} className="text-teal-300" />
// // // //           <h3 className="mt-4 text-lg font-bold text-white">ASK</h3>
// // // //           <p className="mt-1 text-sm text-slate-300">Get instant AI-powered trade answers.</p>
// // // //         </div>
// // // //         <div className="asd-feature-tile rounded-2xl p-5">
// // // //           <ClipboardList size={23} className="text-teal-300" />
// // // //           <h3 className="mt-4 text-lg font-bold text-white">PLAN</h3>
// // // //           <p className="mt-1 text-sm text-slate-300">Discover benefits, insights and smarter strategies.</p>
// // // //         </div>
// // // //         <div className="asd-feature-tile rounded-2xl p-5">
// // // //           <Ship size={23} className="text-teal-300" />
// // // //           <h3 className="mt-4 text-lg font-bold text-white">SHIP</h3>
// // // //           <p className="mt-1 text-sm text-slate-300">Move your business confidently across borders.</p>
// // // //         </div>
// // // //       </div>
// // // //       <div className="asd-hero-bottom relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-slate-300 sm:px-8 lg:px-10">
// // // //         <span className="flex items-center gap-2"><Sparkles size={15} className="text-cyan-300" /> Powered by intelligence. Built for global trade.</span>
// // // //         <span className="flex items-center gap-2"><Globe2 size={15} className="text-teal-300" /> Ask. Plan. Ship.</span>
// // // //       </div>
// // // //     </section>
// // // //   );
// // // // }




// // // import { ArrowUpRight, Sparkles, Ship, Globe2, Plane, MapPin, MessageCircle, ClipboardList } from "lucide-react";
// // // import RotatingEarth from "./RotatingEarth";
// // // import { useNavigate } from "react-router-dom";
// // // import "./HeroSearch.css";

// // // export default function HeroSearch() {
// // //   const navigate = useNavigate();
// // //   return (
// // //     <section className="asd-hero relative isolate overflow-hidden">
// // //       <div className="asd-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
// // //       <div className="relative mx-auto grid max-w-7xl min-h-[650px] grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">
// // //         <div className="relative z-20 order-2 lg:order-1">
// // //           <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
// // //             <span className="asd-live-dot h-2 w-2 rounded-full bg-teal-400" />
// // //             AI-Powered Global Trade &amp; Logistics
// // //           </div>
// // //           <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
// // //             <span className="asd-gradient-text">Ask. Plan. Ship.</span>
// // //           </h1>
// // //           <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
// // //             Your Global Trade Journey, Powered by AI.
// // //           </h2>
// // //           <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
// // //             From EXIM benefits and compliance to freight insights and shipment planning, get everything you need to make smarter trade decisions — all in one intelligent platform.
// // //           </p>
// // //           <p className="mt-5 text-base font-bold text-teal-200 sm:text-lg">
// // //             Ask smarter. Plan better. Ship globally.
// // //           </p>
// // //           <div className="mt-7 flex flex-wrap items-center gap-3">
// // //             <button type="button" onClick={() => window.location.assign("/signup")}
// // //               className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// // //               Get Started <ArrowUpRight size={17} />
// // //             </button>
// // //             <button type="button" onClick={() => document.getElementById("asd-hero-features")?.scrollIntoView({ behavior: "smooth" })}
// // //               className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// // //               Explore Platform
// // //             </button>
// // //           </div>
// // //         </div>

// // //         <div className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]" aria-label="Animated glowing globe representing worldwide trade">
// // //           <div className="asd-globe-ambient absolute" aria-hidden="true" />
// // //           <div className="asd-orbit asd-orbit-one absolute" aria-hidden="true" />
// // //           <div className="asd-orbit asd-orbit-two absolute" aria-hidden="true" />
// // //           <div className="asd-orbit asd-orbit-three absolute" aria-hidden="true" />
// // //           <div className="asd-globe-frame relative z-10">
// // //             <div className="asd-globe-halo absolute inset-0" aria-hidden="true" />
// // //             <RotatingEarth />
// // //             <div className="asd-globe-shine absolute inset-0 pointer-events-none" aria-hidden="true" />
// // //           </div>
// // //           <div className="asd-globe-floor absolute" aria-hidden="true" />
// // //           <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// // //             <Plane size={16} className="text-cyan-300" /> Global connectivity
// // //           </div>
// // //           <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// // //             <MapPin size={16} className="text-teal-300" /> Worldwide logistics
// // //           </div>
// // //           <div className="asd-orbit-dot asd-orbit-dot-one absolute" aria-hidden="true" />
// // //           <div className="asd-orbit-dot asd-orbit-dot-two absolute" aria-hidden="true" />
// // //         </div>
// // //       </div>
// // //       <div id="asd-hero-features" className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-3 sm:px-8 lg:px-10">
// // //         <div className="asd-feature-tile rounded-2xl p-5">
// // //           <MessageCircle size={23} className="text-teal-300" />
// // //           <h3 className="mt-4 text-lg font-bold text-white">ASK</h3>
// // //           <p className="mt-1 text-sm text-slate-300">Get instant AI-powered trade answers.</p>
// // //         </div>
// // //         <div className="asd-feature-tile rounded-2xl p-5">
// // //           <ClipboardList size={23} className="text-teal-300" />
// // //           <h3 className="mt-4 text-lg font-bold text-white">PLAN</h3>
// // //           <p className="mt-1 text-sm text-slate-300">Discover benefits, insights and smarter strategies.</p>
// // //         </div>
// // //         <div className="asd-feature-tile rounded-2xl p-5">
// // //           <Ship size={23} className="text-teal-300" />
// // //           <h3 className="mt-4 text-lg font-bold text-white">SHIP</h3>
// // //           <p className="mt-1 text-sm text-slate-300">Move your business confidently across borders.</p>
// // //         </div>
// // //       </div>
// // //       {/* <div className="asd-hero-bottom relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-slate-300 sm:px-8 lg:px-10">
// // //         <span className="flex items-center gap-2"><Sparkles size={15} className="text-cyan-300" /> Powered by intelligence. Built for global trade.</span>
// // //         <span className="flex items-center gap-2"><Globe2 size={15} className="text-teal-300" /> Ask. Plan. Ship.</span>
// // //       </div> */}
// // //     </section>
// // //   );
// // // }



// // import { ArrowUpRight, Sparkles, Ship, Globe2, Plane, MapPin, MessageCircle, ClipboardList } from "lucide-react";
// // import RotatingEarth from "./RotatingEarth";
// // import { useNavigate } from "react-router-dom";
// // import "./HeroSearch.css";

// // export default function HeroSearch() {
// //   const navigate = useNavigate();
// //   return (
// //     <section className="asd-hero relative isolate overflow-hidden">
// //       <div className="asd-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
// //       <div className="relative mx-auto grid max-w-7xl min-h-[650px] grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">
// //         <div className="relative z-20 order-2 lg:order-1">
// //           <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
// //             <span className="asd-live-dot h-2 w-2 rounded-full bg-teal-400" />
// //             AI-Powered Global Trade &amp; Logistics
// //           </div>
// //           <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
// //             <span className="asd-gradient-text">Ask. Plan. Ship.</span>
// //           </h1>
// //           <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
// //             Your Global Trade Journey, Powered by AI.
// //           </h2>
// //           <p className="mt-5 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
// //             From EXIM benefits and compliance to freight insights and shipment planning, get everything you need to make smarter trade decisions — all in one intelligent platform.
// //           </p>
// //           <p className="mt-5 text-base font-bold text-teal-200 sm:text-lg">
// //             Ask smarter. Plan better. Ship globally.
// //           </p>
// //           <div className="mt-7 flex flex-wrap items-center gap-3">
// //             <button type="button" onClick={() => window.location.assign("/signup")}
// //               className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold text-slate-950 transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// //               Get Started <ArrowUpRight size={17} />
// //             </button>
// //             <button type="button" onClick={() => navigate("/contactpage")}
// //               className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan-300">
// //               Explore Platform
// //             </button>
// //           </div>
// //         </div>

// //         <div className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]" aria-label="Animated glowing globe representing worldwide trade">
// //           <div className="asd-globe-ambient absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-one absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-two absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-three absolute" aria-hidden="true" />
// //           <div className="asd-globe-frame relative z-10">
// //             <div className="asd-globe-halo absolute inset-0" aria-hidden="true" />
// //             <RotatingEarth />
// //             <div className="asd-globe-shine absolute inset-0 pointer-events-none" aria-hidden="true" />
// //           </div>
// //           <div className="asd-globe-floor absolute" aria-hidden="true" />
// //           <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// //             <Plane size={16} className="text-cyan-300" /> Global connectivity
// //           </div>
// //           <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// //             <MapPin size={16} className="text-teal-300" /> Worldwide logistics
// //           </div>
// //           <div className="asd-orbit-dot asd-orbit-dot-one absolute" aria-hidden="true" />
// //           <div className="asd-orbit-dot asd-orbit-dot-two absolute" aria-hidden="true" />
// //         </div>
// //       </div>
// //       <div id="asd-hero-features" className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-3 sm:px-8 lg:px-10">
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <MessageCircle size={23} className="text-teal-300" />
// //           <h3 className="mt-4 text-lg font-bold text-white">ASK</h3>
// //           <p className="mt-1 text-sm text-slate-300">Get instant AI-powered trade answers.</p>
// //         </div>
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <ClipboardList size={23} className="text-teal-300" />
// //           <h3 className="mt-4 text-lg font-bold text-white">PLAN</h3>
// //           <p className="mt-1 text-sm text-slate-300">Discover benefits, insights and smarter strategies.</p>
// //         </div>
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <Ship size={23} className="text-teal-300" />
// //           <h3 className="mt-4 text-lg font-bold text-white">SHIP</h3>
// //           <p className="mt-1 text-sm text-slate-300">Move your business confidently across borders.</p>
// //         </div>
// //       </div>
// //       {/* <div className="asd-hero-bottom relative z-10 mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-5 py-4 text-xs text-slate-300 sm:px-8 lg:px-10">
// //         <span className="flex items-center gap-2"><Sparkles size={15} className="text-cyan-300" /> Powered by intelligence. Built for global trade.</span>
// //         <span className="flex items-center gap-2"><Globe2 size={15} className="text-teal-300" /> Ask. Plan. Ship.</span>
// //       </div> */}
// //     </section>
// //   );
// // }



// // import { ArrowUpRight, Ship, Plane, MapPin, MessageCircle, ClipboardList } from "lucide-react";
// // import RotatingEarth from "./RotatingEarth";
// // import { useNavigate } from "react-router-dom";
// // import "./HeroSearch.css";

// // export default function HeroSearch() {
// //   const navigate = useNavigate();
// //   return (
// //     <section className="asd-hero relative isolate overflow-hidden">
// //       <div className="asd-hero-grid absolute inset-0 pointer-events-none" aria-hidden="true" />
// //       <div className="relative mx-auto grid max-w-7xl min-h-[650px] grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">
// //         <div className="relative z-20 order-2 lg:order-1">
// //           <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
// //             <span className="asd-live-dot h-2 w-2 rounded-full" />
// //             AI-Powered Global Trade &amp; Logistics
// //           </div>
// //           <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
// //             <span className="asd-gradient-text">Ask. Plan. Ship.</span>
// //           </h1>
// //           <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
// //             Your Global Trade Journey, Powered by AI.
// //           </h2>
// //           <p className="mt-5 max-w-xl text-base leading-8 text-white-300 sm:text-lg">
// //             From EXIM benefits and compliance to freight insights and shipment planning, get everything you need to make smarter trade decisions — all in one intelligent platform.
// //           </p>
// //           <p className="asd-hero-tagline mt-5 text-base font-bold sm:text-lg">Ask smarter. Plan better. Ship globally.</p>
// //           <div className="mt-7 flex flex-wrap items-center gap-3">
// //             <button type="button" onClick={() => navigate("/signup")}
// //               className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
// //               Get Started <ArrowUpRight size={17} />
// //             </button>
// //             <button type="button" onClick={() => navigate("/contactpage")}
// //               className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300">
// //               Explore Platform
// //             </button>
// //           </div>
// //         </div>
// //         <div className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]" aria-label="Animated glowing globe representing worldwide trade">
// //           <div className="asd-globe-ambient absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-one absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-two absolute" aria-hidden="true" />
// //           <div className="asd-orbit asd-orbit-three absolute" aria-hidden="true" />
// //           <div className="asd-globe-frame relative z-10">
// //             <div className="asd-globe-halo absolute inset-0" aria-hidden="true" />
// //             <RotatingEarth />
// //             <div className="asd-globe-shine absolute inset-0 pointer-events-none" aria-hidden="true" />
// //           </div>
// //           <div className="asd-globe-floor absolute" aria-hidden="true" />
// //           <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// //             <Plane size={16} className="asd-float-icon" /> Global connectivity
// //           </div>
// //           <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold text-white">
// //             <MapPin size={16} className="asd-float-icon" /> Worldwide logistics
// //           </div>
// //           <div className="asd-orbit-dot asd-orbit-dot-one absolute" aria-hidden="true" />
// //           <div className="asd-orbit-dot asd-orbit-dot-two absolute" aria-hidden="true" />
// //         </div>
// //       </div>
// //       <div id="asd-hero-features" className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-3 sm:px-8 lg:px-10">
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <MessageCircle size={23} className="asd-feature-icon" />
// //           <h3 className="mt-4 text-lg font-bold text-white">ASK</h3>
// //           <p className="mt-1 text-sm text-slate-300">Get instant AI-powered trade answers.</p>
// //         </div>
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <ClipboardList size={23} className="asd-feature-icon" />
// //           <h3 className="mt-4 text-lg font-bold text-white">PLAN</h3>
// //           <p className="mt-1 text-sm text-slate-300">Discover benefits, insights and smarter strategies.</p>
// //         </div>
// //         <div className="asd-feature-tile rounded-2xl p-5">
// //           <Ship size={23} className="asd-feature-icon" />
// //           <h3 className="mt-4 text-lg font-bold text-white">SHIP</h3>
// //           <p className="mt-1 text-sm text-slate-300">Move your business confidently across borders.</p>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }



// import {
//   ArrowUpRight,
//   Ship,
//   Plane,
//   MapPin,
//   MessageCircle,
//   ClipboardList,
// } from "lucide-react";

// import RotatingEarth from "./RotatingEarth";
// import { useNavigate } from "react-router-dom";
// import "./HeroSearch.css";

// export default function HeroSearch() {
//   const navigate = useNavigate();

//   return (
//     <section className="asd-hero relative isolate overflow-hidden">

//       {/* Background Grid */}
//       <div
//         className="asd-hero-grid pointer-events-none absolute inset-0"
//         aria-hidden="true"
//       />

//       <div className="relative mx-auto grid min-h-[650px] max-w-7xl grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">

//         {/* Left Content */}
//         <div className="relative z-20 order-2 lg:order-1">

//           {/* Badge */}
//           <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
//             <span className="asd-live-dot h-2 w-2 rounded-full" />
//             AI-Powered Global Trade &amp; Logistics
//           </div>

//           {/* Main Heading */}
//           <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
//             <span className="asd-gradient-text">
//               Ask. Plan. Ship.
//             </span>
//           </h1>

//           <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
//             Your Global Trade Journey, Powered by AI.
//           </h2>

//           <p className="mt-5 max-w-xl text-base leading-8 text-[#EFF6FF] sm:text-lg">
//             From EXIM benefits and compliance to freight insights
//             and shipment planning, get everything you need to
//             make smarter trade decisions — all in one
//             intelligent platform.
//           </p>

//           <p className="asd-hero-tagline mt-5 text-base font-bold sm:text-lg">
//             Ask smarter. Plan better. Ship globally.
//           </p>

//           {/* Buttons */}
//           <div className="mt-7 flex flex-wrap items-center gap-3">

//             <button
//               type="button"
//               onClick={() => navigate("/signup")}
//               className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
//             >
//               Get Started
//               <ArrowUpRight size={17} />
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/contactpage")}
//               className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
//             >
//               Explore Platform
//             </button>

//           </div>
//         </div>

//         {/* Right Globe */}
//         <div
//           className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]"
//           aria-label="Animated glowing globe representing worldwide trade"
//         >

//           <div
//             className="asd-globe-ambient absolute"
//             aria-hidden="true"
//           />

//           {/* Globe Orbits */}
//           <div
//             className="asd-orbit asd-orbit-one absolute"
//             aria-hidden="true"
//           />
//           <div
//             className="asd-orbit asd-orbit-two absolute"
//             aria-hidden="true"
//           />
//           <div
//             className="asd-orbit asd-orbit-three absolute"
//             aria-hidden="true"
//           />

//           {/* Rotating Earth */}
//           <div className="asd-globe-frame relative z-10">

//             <div
//               className="asd-globe-halo absolute inset-0"
//               aria-hidden="true"
//             />

//             <RotatingEarth />

//             <div
//               className="asd-globe-shine pointer-events-none absolute inset-0"
//               aria-hidden="true"
//             />

//           </div>

//           <div
//             className="asd-globe-floor absolute"
//             aria-hidden="true"
//           />

//           {/* Floating Badges */}
//           <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
//             <Plane size={16} className="asd-float-icon" />
//             Global connectivity
//           </div>

//           <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
//             <MapPin size={16} className="asd-float-icon" />
//             Worldwide logistics
//           </div>

//           {/* Orbit Dots */}
//           <div
//             className="asd-orbit-dot asd-orbit-dot-one absolute"
//             aria-hidden="true"
//           />
//           <div
//             className="asd-orbit-dot asd-orbit-dot-two absolute"
//             aria-hidden="true"
//           />

//         </div>
//       </div>

//       {/* Bottom Feature Cards */}
//       <div
//         id="asd-hero-features"
//         className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-3 sm:px-8 lg:px-10"
//       >

//         {/* ASK */}
//         <div className="asd-feature-tile rounded-2xl p-5">
//           <div className="asd-feature-icon-box">
//             <MessageCircle size={23} className="asd-feature-icon" />
//           </div>

//           <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
//             ASK
//           </h3>

//           <p className="mt-1 text-sm text-slate-600">
//             Get instant AI-powered trade answers.
//           </p>
//         </div>

//         {/* PLAN */}
//         <div className="asd-feature-tile rounded-2xl p-5">
//           <div className="asd-feature-icon-box">
//             <ClipboardList size={23} className="asd-feature-icon" />
//           </div>

//           <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
//             PLAN
//           </h3>

//           <p className="mt-1 text-sm text-slate-600">
//             Discover benefits, insights and smarter strategies.
//           </p>
//         </div>

//         {/* SHIP */}
//         <div className="asd-feature-tile rounded-2xl p-5">
//           <div className="asd-feature-icon-box">
//             <Ship size={23} className="asd-feature-icon" />
//           </div>

//           <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
//             SHIP
//           </h3>

//           <p className="mt-1 text-sm text-slate-600">
//             Move your business confidently across borders.
//           </p>
//         </div>

//       </div>
//     </section>
//   );
// }






////////////////////////////////////////////////////////////////////////




import {
  ArrowUpRight,
  Ship,
  Plane,
  MapPin,
  MessageCircle,
  ClipboardList,
} from "lucide-react";

import RotatingEarth from "./RotatingEarth";
import { useNavigate } from "react-router-dom";
import "./HeroSearch.css";

export default function HeroSearch() {
  const navigate = useNavigate();

  return (
    <section className="asd-hero relative isolate overflow-hidden">

      {/* Background Grid */}
      <div
        className="asd-hero-grid pointer-events-none absolute inset-0"
        aria-hidden="true"
      />

      <div className="relative mx-auto grid min-h-[650px] max-w-7xl grid-cols-1 items-center gap-5 px-5 py-12 sm:px-8 lg:grid-cols-2 lg:gap-8 lg:px-10 lg:py-16">

        {/* Left Content */}
        <div className="relative z-20 order-2 lg:order-1">

          {/* Badge */}
          <div className="asd-hero-eyebrow inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-bold">
            <span className="asd-live-dot h-2 w-2 rounded-full" />
            AI-Powered Global Trade &amp; Logistics
          </div>

          {/* Main Heading */}
          <h1 className="mt-6 max-w-2xl text-[2.8rem] font-black leading-[1.1] tracking-tight text-white sm:text-5xl xl:text-[3.8rem]">
            <span className="asd-gradient-text">
              Ask. Plan. Ship.
            </span>
          </h1>

          <h2 className="mt-6 max-w-2xl text-2xl font-bold leading-snug text-white sm:text-3xl">
            Your Global Trade Journey, Powered by AI.
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-[#EFF6FF] sm:text-lg">
            From EXIM benefits and compliance to freight insights
            and shipment planning, get everything you need to
            make smarter trade decisions — all in one
            intelligent platform.
          </p>

          <p className="asd-hero-tagline mt-5 text-base font-bold sm:text-lg">
            Ask smarter. Plan better. Ship globally.
          </p>

          {/* Buttons */}
          <div className="mt-7 flex flex-wrap items-center gap-3">

            <button
              type="button"
              onClick={() => navigate("/signup")}
              className="asd-primary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-bold transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Get Started
              <ArrowUpRight size={17} />
            </button>

            <button
              type="button"
              onClick={() => navigate("/contactpage")}
              className="asd-secondary-btn inline-flex items-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold transition hover:-translate-y-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-300"
            >
              Explore Platform
            </button>

          </div>
        </div>

        {/* Right Globe */}
        <div
          className="asd-globe-stage relative order-1 flex min-h-[370px] items-center justify-center lg:order-2 lg:min-h-[570px]"
          aria-label="Animated glowing globe representing worldwide trade"
        >

          <div
            className="asd-globe-ambient absolute"
            aria-hidden="true"
          />

          {/* Globe Orbits */}
          <div
            className="asd-orbit asd-orbit-one absolute"
            aria-hidden="true"
          />
          <div
            className="asd-orbit asd-orbit-two absolute"
            aria-hidden="true"
          />
          <div
            className="asd-orbit asd-orbit-three absolute"
            aria-hidden="true"
          />

          {/* Rotating Earth */}
          <div className="asd-globe-frame relative z-10">

            <div
              className="asd-globe-halo absolute inset-0"
              aria-hidden="true"
            />

            <RotatingEarth />

            <div
              className="asd-globe-shine pointer-events-none absolute inset-0"
              aria-hidden="true"
            />

          </div>

          <div
            className="asd-globe-floor absolute"
            aria-hidden="true"
          />

          {/* Floating Badges */}
          <div className="asd-float asd-float-top absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
            <Plane size={16} className="asd-float-icon" />
            Global connectivity
          </div>

          <div className="asd-float asd-float-bottom absolute z-20 flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-semibold">
            <MapPin size={16} className="asd-float-icon" />
            Worldwide logistics
          </div>

          {/* Orbit Dots */}
          <div
            className="asd-orbit-dot asd-orbit-dot-one absolute"
            aria-hidden="true"
          />
          <div
            className="asd-orbit-dot asd-orbit-dot-two absolute"
            aria-hidden="true"
          />

        </div>
      </div>

      {/* Bottom Feature Cards */}
      <div
        id="asd-hero-features"
        className="relative z-10 mx-auto grid max-w-7xl grid-cols-1 gap-4 px-5 pb-5 sm:grid-cols-3 sm:px-8 lg:px-10"
      >

        {/* ASK */}
        <div className="asd-feature-tile rounded-2xl p-5">
          <div className="asd-feature-icon-box">
            <MessageCircle size={23} className="asd-feature-icon" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
            ASK
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Get instant AI-powered trade answers.
          </p>
        </div>

        {/* PLAN */}
        <div className="asd-feature-tile rounded-2xl p-5">
          <div className="asd-feature-icon-box">
            <ClipboardList size={23} className="asd-feature-icon" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
            PLAN
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Discover benefits, insights and smarter strategies.
          </p>
        </div>

        {/* SHIP */}
        <div className="asd-feature-tile rounded-2xl p-5">
          <div className="asd-feature-icon-box">
            <Ship size={23} className="asd-feature-icon" />
          </div>

          <h3 className="mt-4 text-lg font-bold text-[#2563EB]">
            SHIP
          </h3>

          <p className="mt-1 text-sm text-slate-600">
            Move your business confidently across borders.
          </p>
        </div>

      </div>
    </section>
  );
}
