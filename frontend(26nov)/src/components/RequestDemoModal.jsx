// import { useState } from "react";
// import { CalendarDays, X, ShieldCheck } from "lucide-react";

// const jobRoles = [
//   "Operations Manager",
//   "Logistics Head",
//   "Founder / CEO",
//   "Procurement Manager",
//   "Other",
// ];

// export default function RequestDemoModal({ onClose, onSuccess }) {
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     workEmail: "",
//     companyName: "",
//     phone: "",
//     jobRole: "",
//     requirements: "",
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const response = await fetch("/api/request-demo", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });
//       const data = await response.json();
//       console.log(data);
//       onSuccess();
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 bg-black/50 flex items-center justify-center px-4 py-8 z-50 overflow-y-auto">
//       <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg p-6 sm:p-8 relative">
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
//         >
//           <X className="w-5 h-5" />
//         </button>

//         <div className="flex flex-col items-center text-center">
//           <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center">
//             <CalendarDays className="w-7 h-7 text-blue-600" />
//           </div>
//           <h2 className="mt-3 text-xl sm:text-2xl font-bold text-gray-900">
//             Request Demo
//           </h2>
//           <p className="mt-1 text-sm text-gray-500">
//             See how ASD CargoMate can transform your logistics operations.
//           </p>
//         </div>

//         <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <input
//               type="text"
//               name="fullName"
//               value={formData.fullName}
//               onChange={handleChange}
//               placeholder="Full Name*"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
//               required
//             />
//             <input
//               type="email"
//               name="workEmail"
//               value={formData.workEmail}
//               onChange={handleChange}
//               placeholder="Work Email*"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
//               required
//             />
//             <input
//               type="text"
//               name="companyName"
//               value={formData.companyName}
//               onChange={handleChange}
//               placeholder="Company Name *"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               placeholder="Phone Number*"
//               className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500"
//               required
//             />
//           </div>

//           <select
//             name="jobRole"
//             value={formData.jobRole}
//             onChange={handleChange}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 text-gray-700"
//             required
//           >
//             <option value="">Job Role *</option>
//             {jobRoles.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>

//           <textarea
//             name="requirements"
//             value={formData.requirements}
//             onChange={handleChange}
//             placeholder="Tell us about your requirements"
//             rows={3}
//             className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-blue-500 resize-none"
//           />

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg py-3 disabled:opacity-60"
//           >
//             {loading ? "Sending..." : "Request Demo"}
//           </button>

//           <p className="flex items-center justify-center gap-1.5 text-xs text-gray-400">
//             <ShieldCheck className="w-3.5 h-3.5" />
//             We respect your privacy. Your information is safe with us.
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { CalendarDays, X, ShieldCheck, Loader2, ArrowRight } from "lucide-react";

const jobRoles = [
  "Operations Manager", "Logistics Head", "Founder / CEO",
  "Procurement Manager", "Other",
];

const initialForm = {
  fullName: "", workEmail: "", companyName: "",
  phone: "", jobRole: "", requirements: "",
};

const inputClass =
  "w-full min-w-0 rounded-xl border border-[#CDE5EB] bg-white px-4 py-3 text-sm text-[#12324A] placeholder:text-slate-500 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-500/15";

export default function RequestDemoModal({ onClose, onSuccess }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && !loading) onClose?.();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, loading]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/request-demo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!response.ok) throw new Error(`Request failed (${response.status})`);
      onSuccess?.();
    } catch (err) {
      console.error("Request Demo submission failed:", err);
      setError("Your request could not be sent. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto bg-[#061827]/55 p-3 backdrop-blur-sm sm:p-6"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) onClose?.();
      }}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="request-demo-title"
        className="relative my-auto flex w-full max-w-xl flex-col overflow-hidden rounded-3xl border border-[#C9E5EB] bg-[#F7FCFF] shadow-[0_30px_90px_rgba(8,71,96,0.22)]"
        style={{ maxHeight: "calc(100dvh - 24px)" }}
      >
        <div className="relative shrink-0 border-b border-[#C9E5EB] bg-gradient-to-r from-[#E0F8F5] via-[#E9F8FC] to-[#E7F2FF] px-5 py-5 pr-14 sm:px-7">
          <button
            type="button"
            aria-label="Close Request Demo"
            onClick={() => !loading && onClose?.()}
            disabled={loading}
            className="absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-[#B7DDE5] bg-white/80 text-[#16425B] transition hover:bg-[#DDF7F8] disabled:opacity-50"
          >
            <X className="h-5 w-5" />
          </button>
          <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-teal-700">
            <CalendarDays className="h-4 w-4" /> ASD CargoMate
          </div>
          <h2 id="request-demo-title" className="text-2xl font-extrabold text-[#102A43]">
            Request a <span className="text-teal-600">Demo</span>
          </h2>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Discover how AI-powered logistics can simplify your operations.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="min-h-0 flex-1 space-y-4 overflow-y-auto overscroll-contain px-5 py-5 sm:px-7">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[
              { name: "fullName", label: "Full Name", placeholder: "Your name" },
              { name: "workEmail", label: "Work Email", type: "email", placeholder: "name@company.com" },
              { name: "companyName", label: "Company Name", placeholder: "Your company" },
              { name: "phone", label: "Phone Number", type: "tel", placeholder: "+91 98765 43210" },
            ].map(({ name, label, type = "text", placeholder }) => (
              <label key={name} className="block min-w-0">
                <span className="mb-1.5 block text-xs font-semibold text-[#26465C]">{label} *</span>
                <input
                  name={name}
                  type={type}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  className={inputClass}
                  required
                />
              </label>
            ))}
          </div>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#26465C]">Job Role *</span>
            <select
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="" className="bg-white">Select your role</option>
              {jobRoles.map((role) => (
                <option key={role} value={role} className="bg-white">{role}</option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1.5 block text-xs font-semibold text-[#26465C]">Your Requirements (Optional)</span>
            <textarea
              name="requirements"
              value={formData.requirements}
              onChange={handleChange}
              rows={3}
              placeholder="Tell us what you'd like to explore..."
              className={`${inputClass} resize-y`}
            />
          </label>

          {error && (
            <p role="alert" className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
              {error}
            </p>
          )}

          <div className="flex items-start gap-2 text-xs text-slate-500">
            <ShieldCheck className="h-4 w-4 shrink-0 text-teal-600" />
            We use your details only to respond to your demo request.
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#C9E5EB] pt-4 sm:flex-row">
            <button
              type="button"
              onClick={() => onClose?.()}
              disabled={loading}
              className="rounded-xl border border-[#B8DDE5] px-5 py-3 text-sm font-semibold text-[#26465C] hover:bg-[#E6F7FA] disabled:opacity-50 sm:flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EEAD4] to-[#67E8F9] px-5 py-3 text-sm font-extrabold text-[#06243A] transition hover:brightness-110 disabled:opacity-60 sm:flex-[2]"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarDays className="h-4 w-4" />}
              {loading ? "Submitting..." : "Request Demo"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </div>
        </form>
      </div>
    </div>,
    document.body
  );
}
