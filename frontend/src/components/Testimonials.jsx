// // import { Star } from "lucide-react";

// // const testimonials = [
// //   {
// //     quote:
// //       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
// //     name: "Sanjeev Singh",
// //     company: "S&S Associates",
// //   },
// //   {
// //     quote:
// //       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
// //     name: "Rahul Pal",
// //     company: "S&S Associates",
// //   },
// //   {
// //     quote:
// //       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
// //     name: "Dev Narayan",
// //     company: "S&S Associates",
// //   },
// // ];

// // export default function Testimonials() {
// //   return (
// //     <div className="max-w-6xl mx-auto px-4 pb-12 sm:pb-16">
// //       <h2 className="text-center text-xl sm:text-2xl font-bold text-gray-900">
// //         Loved by <span className="text-blue-600">Global Logistics Leaders</span>
// //       </h2>

// //       <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
// //         {testimonials.map(({ quote, name, company }, i) => (
// //           <div
// //             key={i}
// //             className="border border-gray-200 rounded-xl p-4"
// //           >
// //             <p className="text-xs text-gray-500">{quote}</p>
// //             <p className="mt-4 text-sm font-bold text-gray-900">{name}</p>
// //             <p className="text-xs text-gray-400">{company}</p>
// //             <div className="mt-2 flex gap-0.5">
// //               {Array.from({ length: 5 }).map((_, star) => (
// //                 <Star
// //                   key={star}
// //                   className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400"
// //                 />
// //               ))}
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




// import {
//   Star,
//   Quote,
//   MessageCircleHeart,
// } from "lucide-react";

// const testimonials = [
//   {
//     quote:
//       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
//     name: "Sanjeev Singh",
//     company: "S&S Associates",
//   },
//   {
//     quote:
//       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
//     name: "Rahul Pal",
//     company: "S&S Associates",
//   },
//   {
//     quote:
//       "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
//     name: "Dev Narayan",
//     company: "S&S Associates",
//   },
// ];

// export default function Testimonials() {
//   return (
//     <section className="relative isolate overflow-hidden bg-gradient-to-b from-[#EDF9FC] via-[#F5FBFD] to-white py-16 sm:py-20">
//       {/* Background glow */}
//       <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />
//       <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-teal-200/25 blur-3xl" />

//       {/* Soft grid background */}
//       <div
//         className="pointer-events-none absolute inset-0 opacity-[0.15]"
//         style={{
//           backgroundImage:
//             "linear-gradient(rgba(20,184,166,.10) 1px, transparent 1px), linear-gradient(90deg, rgba(20,184,166,.10) 1px, transparent 1px)",
//           backgroundSize: "64px 64px",
//         }}
//       />

//       <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">
//         {/* Heading */}
//         <div className="mx-auto max-w-2xl text-center">
//           <div className="inline-flex items-center gap-2 rounded-full border border-teal-200 bg-teal-50 px-4 py-2 text-xs font-semibold tracking-wide text-teal-700">
//             <MessageCircleHeart className="h-3.5 w-3.5" />
//             CLIENT SUCCESS STORIES
//           </div>

//           <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#102A43] sm:text-4xl">
//             Loved by{" "}
//             <span className="bg-gradient-to-r from-[#14B8A6] via-[#06B6D4] to-[#1596D2] bg-clip-text text-transparent">
//               Global Logistics Leaders
//             </span>
//           </h2>

//           <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-500 sm:text-base">
//             Discover how businesses are transforming
//             their global logistics journey with
//             smarter AI-powered solutions.
//           </p>
//         </div>

//         {/* Testimonial Cards */}
//         <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
//           {testimonials.map(
//             ({ quote, name, company }, index) => {
//               const initials = name
//                 .split(" ")
//                 .map((word) => word[0])
//                 .join("")
//                 .slice(0, 2)
//                 .toUpperCase();

//               return (
//                 <article
//                   key={`${name}-${index}`}
//                   className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#DCEEF3] bg-white/95 p-6 shadow-[0_10px_35px_rgba(12,74,110,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-cyan-300 hover:shadow-[0_20px_45px_rgba(6,182,212,0.13)] sm:p-7"
//                 >
//                   {/* Hover accent */}
//                   <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-teal-400 to-cyan-400 transition-transform duration-300 group-hover:scale-x-100" />

//                   {/* Decorative glow */}
//                   <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-cyan-100/0 blur-2xl transition-colors duration-300 group-hover:bg-cyan-100/60" />

//                   {/* Quote icon and stars */}
//                   <div className="relative flex items-start justify-between gap-3">
//                     <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-teal-100 bg-gradient-to-br from-[#DDF9F5] to-[#E5F5FF]">
//                       <Quote
//                         className="h-6 w-6 text-[#0DA6AD]"
//                         strokeWidth={1.8}
//                       />
//                     </div>

//                     <div
//                       className="flex items-center gap-1"
//                       aria-label="5 out of 5 stars"
//                     >
//                       {Array.from({ length: 5 }).map(
//                         (_, star) => (
//                           <Star
//                             key={star}
//                             className="h-4 w-4 fill-amber-400 text-amber-400"
//                           />
//                         )
//                       )}
//                     </div>
//                   </div>

//                   {/* Testimonial */}
//                   <div className="relative mt-6 flex-1">
//                     <p className="text-sm leading-7 text-slate-600">
//                       “{quote}”
//                     </p>
//                   </div>

//                   {/* Customer */}
//                   <div className="relative mt-7 flex items-center gap-3 border-t border-[#E5F0F3] pt-5">
//                     <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-teal-200 bg-gradient-to-br from-[#DDF9F5] to-[#DDEFFF] text-sm font-bold text-[#087F8C]">
//                       {initials}
//                     </div>

//                     <div className="min-w-0 flex-1">
//                       <h3 className="text-sm font-bold text-[#14314C]">
//                         {name}
//                       </h3>

//                       <p className="mt-1 text-xs text-slate-500">
//                         {company}
//                       </p>
//                     </div>

//                     <div className="h-8 w-1 rounded-full bg-gradient-to-b from-teal-400 to-cyan-400 opacity-60 transition-opacity group-hover:opacity-100" />
//                   </div>
//                 </article>
//               );
//             }
//           )}
//         </div>

//         {/* Bottom caption */}
//         <div className="mt-10 flex items-center justify-center gap-3 text-center">
//           <span className="h-px w-8 bg-gradient-to-r from-transparent to-teal-400/60" />

//           <p className="text-xs font-medium tracking-wide text-teal-700/80">
//             Built for Smarter Global Trade
//           </p>

//           <span className="h-px w-8 bg-gradient-to-l from-transparent to-teal-400/60" />
//         </div>
//       </div>
//     </section>
//   );
// }




import {
  Star,
  Quote,
  MessageCircleHeart,
} from "lucide-react";

const testimonials = [
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Sanjeev Singh",
    company: "S&S Associates",
  },
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Rahul Pal",
    company: "S&S Associates",
  },
  {
    quote:
      "ASD CARGOMATE has transformed the way we plan and execute our shipments. The AI insights are incredibly accurate!",
    name: "Dev Narayan",
    company: "S&S Associates",
  },
];

export default function Testimonials() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-br from-[#FFFFFF] via-[#1677C8]/10 to-[#2563EB]/15 py-16 sm:py-20">

      {/* Blue Background Glows */}
      <div className="pointer-events-none absolute -left-32 top-0 h-80 w-80 rounded-full bg-[#1677C8]/15 blur-3xl" />

      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-[#2563EB]/15 blur-3xl" />

      {/* Blue Grid Background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.20]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(37,99,235,.12) 1px, transparent 1px), linear-gradient(90deg, rgba(37,99,235,.12) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6">

        {/* Section Heading */}
        <div className="mx-auto max-w-2xl text-center">

          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#1677C8]/25 bg-white/80 px-4 py-2 text-xs font-semibold tracking-wide text-[#2563EB] shadow-sm">
            <MessageCircleHeart className="h-3.5 w-3.5 text-[#1677C8]" />
            CLIENT SUCCESS STORIES
          </div>

          {/* Main Heading */}
          <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#2563EB] sm:text-4xl">
            Loved by{" "}
            <span className="bg-gradient-to-r from-[#1677C8] to-[#2563EB] bg-clip-text text-transparent">
              Global Logistics Leaders
            </span>
          </h2>

          {/* Description */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 sm:text-base">
            Discover how businesses are transforming
            their global logistics journey with
            smarter AI-powered solutions.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {testimonials.map(
            ({ quote, name, company }, index) => {
              const initials = name
                .split(" ")
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase();

              return (
                <article
                  key={`${name}-${index}`}
                  className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[#1677C8]/20 bg-white p-6 shadow-[0_10px_35px_rgba(37,99,235,0.08)] transition-all duration-300 hover:-translate-y-2 hover:border-[#2563EB] hover:shadow-[0_20px_45px_rgba(37,99,235,0.18)] sm:p-7"
                >

                  {/* Animated Top Blue Line */}
                  <div className="absolute inset-x-0 top-0 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-[#1677C8] to-[#2563EB] transition-transform duration-300 group-hover:scale-x-100" />

                  {/* Decorative Blue Glow */}
                  <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-[#1677C8]/0 blur-2xl transition-colors duration-300 group-hover:bg-[#1677C8]/10" />

                  {/* Quote Icon and Stars */}
                  <div className="relative flex items-start justify-between gap-3">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-[#1677C8]/20 bg-gradient-to-br from-[#1677C8]/10 to-[#2563EB]/10 transition-all duration-300 group-hover:scale-110 group-hover:border-[#2563EB]/40">
                      <Quote
                        className="h-6 w-6 text-[#1677C8]"
                        strokeWidth={1.8}
                      />
                    </div>

                    {/* Five Stars */}
                    <div
                      className="flex items-center gap-1"
                      aria-label="5 out of 5 stars"
                    >
                      {Array.from({ length: 5 }).map(
                        (_, star) => (
                          <Star
                            key={star}
                            className="h-4 w-4 fill-[#f8d616] text-[#f2f535]"
                          />
                        )
                      )}
                    </div>
                  </div>

                  {/* Testimonial Text */}
                  <div className="relative mt-6 flex-1">
                    <p className="text-sm leading-7 text-slate-600">
                      “{quote}”
                    </p>
                  </div>

                  {/* Customer Information */}
                  <div className="relative mt-7 flex items-center gap-3 border-t border-[#1677C8]/15 pt-5">

                    {/* Avatar */}
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#1677C8]/25 bg-gradient-to-br from-[#1677C8]/15 to-[#2563EB]/15 text-sm font-bold text-[#2563EB] transition-all duration-300 group-hover:border-[#2563EB]/50">
                      {initials}
                    </div>

                    {/* Customer Name */}
                    <div className="min-w-0 flex-1">

                      <h3 className="text-sm font-bold text-[#2563EB]">
                        {name}
                      </h3>

                      <p className="mt-1 text-xs text-slate-500">
                        {company}
                      </p>

                    </div>

                    {/* Right Blue Accent */}
                    <div className="h-8 w-1 rounded-full bg-gradient-to-b from-[#1677C8] to-[#2563EB] opacity-60 transition-opacity duration-300 group-hover:opacity-100" />

                  </div>
                </article>
              );
            }
          )}
        </div>

        {/* Bottom Caption */}
        <div className="mt-10 flex items-center justify-center gap-3 text-center">

          <span className="h-px w-8 bg-gradient-to-r from-transparent to-[#1677C8]/60" />

          <p className="text-xs font-medium tracking-wide text-[#2563EB]">
            Built for Smarter Global Trade
          </p>

          <span className="h-px w-8 bg-gradient-to-l from-transparent to-[#2563EB]/60" />

        </div>

      </div>
    </section>
  );
}
