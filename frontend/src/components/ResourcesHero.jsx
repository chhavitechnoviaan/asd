// import { useState } from "react";
// import { Search } from "lucide-react";
// import heroImage from "../assets/resources-hero.png";

// export default function ResourcesHero() {
//   const [query, setQuery] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleSearch = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/resources/search", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ query }),
//       });
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative w-full h-72 sm:h-80 md:h-96 bg-blue-950 overflow-hidden">
//       <img
//         src={heroImage}
//         alt="Global trade network"
//         className="absolute inset-0 w-full h-full object-cover"
//       />
//       <div className="absolute inset-0 bg-blue-950/40" />
//       <div className="relative max-w-2xl mx-auto h-full flex flex-col items-center justify-center text-center px-4">
//         <h1 className="text-3xl sm:text-4xl font-bold text-white">
//           Resources
//         </h1>
//         <p className="mt-3 text-sm sm:text-base text-blue-100">
//           Your go-to hub for the latest update, guides and insights on
//           global trade, compliance and logistics
//         </p>

//         <form
//           onSubmit={handleSearch}
//           className="mt-6 w-full flex items-center bg-white rounded-full shadow-lg overflow-hidden"
//         >
//           <input
//             type="text"
//             value={query}
//             onChange={(e) => setQuery(e.target.value)}
//             placeholder="Search for blogs,update,guides,FAQs..."
//             className="flex-1 px-5 py-3 text-sm text-gray-700 outline-none"
//           />
//           <button
//             type="submit"
//             disabled={loading}
//             className="m-1.5 w-10 h-10 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded-full disabled:opacity-60"
//           >
//             <Search className="w-4 h-4 text-gray-600" />
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }




import { useState } from "react";
import {
  Search,
  Sparkles,
  ArrowRight,
  Loader2,
  BookOpen,
} from "lucide-react";

import heroImage from "../assets/resources-hero.png";

export default function ResourcesHero() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!query.trim() || loading) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/resources/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          query: query.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Unable to search resources.");
      }

      const data = await response.json();
      console.log("Resource search results:", data);

    } catch (error) {
      console.error("Resource search error:", error);
      setError("Unable to search right now. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative isolate w-full min-h-[380px] overflow-hidden border-b border-cyan-100 bg-gradient-to-br from-[#EAF9FC] via-[#F5FCFF] to-[#E8F9F6] sm:min-h-[420px]">

      {/* Background Image */}
      <div className="pointer-events-none absolute inset-0">

        <img
          src={heroImage}
          alt="Global trade and logistics network"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-100"
        />

        {/* Light Overlay - Image Remains Visible */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#F0FCFF]/55 via-white/15 to-[#EAF9FC]/10" />

      </div>

      {/* Decorative Glows */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-teal-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-cyan-200/30 blur-3xl" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "linear-gradient(rgba(8,145,178,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(8,145,178,0.12) 1px, transparent 1px)",
          backgroundSize: "52px 52px",
        }}
      />

      {/* Main Content */}
      <div className="relative z-10 mx-auto flex min-h-[380px] max-w-6xl flex-col items-center justify-center px-4 py-12 text-center sm:min-h-[420px] sm:px-6">

        

        {/* Heading */}
        <h1 className="text-4xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl lg:text-[54px]">

          Explore Our{" "}

          <span className="bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#0284C7] bg-clip-text text-transparent">
            Resources
          </span>

        </h1>

        {/* Description */}
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white sm:text-base">

          Your go-to hub for the latest updates, guides and insights
          on global trade, compliance and logistics.

        </p>

        {/* Search Form */}
        <form
          onSubmit={handleSearch}
          role="search"
          className="mt-8 w-full max-w-2xl"
        >

          <div className="group flex items-center gap-2 rounded-2xl border border-[#C8E8ED] bg-white/95 p-2 shadow-[0_10px_35px_rgba(8,71,96,0.10)] backdrop-blur-md transition-all duration-300 focus-within:border-teal-400 focus-within:shadow-[0_12px_40px_rgba(20,184,166,0.15)]">

            {/* Search Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#E2F9F5] to-[#E5F6FF]">

              <Search className="h-5 w-5 text-[#0D9488]" />

            </div>

            {/* Input */}
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search blogs, updates, guides, FAQs..."
              aria-label="Search resources"
              className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm text-[#102A43] outline-none placeholder:text-slate-400"
            />

            {/* Search Button */}
            <button
              type="submit"
              disabled={loading || !query.trim()}
              className="group/btn inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] px-4 text-sm font-bold text-[#06243A] shadow-[0_5px_18px_rgba(20,184,166,0.18)] transition-all duration-300 hover:from-[#0D9488] hover:to-[#06B6D4] hover:text-white hover:shadow-[0_8px_24px_rgba(20,184,166,0.25)] disabled:cursor-not-allowed disabled:opacity-50 sm:px-6"
            >

              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span className="hidden sm:inline">
                    Searching...
                  </span>
                </>
              ) : (
                <>
                  <span className="hidden sm:inline">
                    Search
                  </span>

                  <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                </>
              )}

            </button>

          </div>

          {error && (
            <p role="alert" className="mt-3 text-sm text-red-600">
              {error}
            </p>
          )}

        </form>

        {/* Bottom Supporting Text */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs text-white">

          <BookOpen className="h-4 w-4 text-teal-600" />

          <span>
            Discover insights to make smarter global trade decisions.
          </span>

        </div>

      </div>

      {/* Bottom Accent */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />

    </section>
  );
}
