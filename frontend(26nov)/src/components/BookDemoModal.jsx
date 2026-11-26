// import { useState } from "react";
// import { Calendar, CheckCircle, X } from "lucide-react";

// export default function BookDemoModal({ isOpen, onClose, onNavigate }) {
//   const [submitted, setSubmitted] = useState(false);
//   const [form, setForm] = useState({
//     fullName: "",
//     companyName: "",
//     workEmail: "",
//     phone: "",
//     preferredDate: "",
//     preferredTime: "",
//     message: "",
//   });

//   if (!isOpen) return null;

//   const handleChange = (field) => (e) => {
//     setForm({ ...form, [field]: e.target.value });
//   };

//   const handleClose = () => {
//     setSubmitted(false);
//     setForm({
//       fullName: "",
//       companyName: "",
//       workEmail: "",
//       phone: "",
//       preferredDate: "",
//       preferredTime: "",
//       message: "",
//     });
//     onClose();
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch("/api/demo-requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//     } catch (err) {
//       console.error(err);
//     }
//     setSubmitted(true);
//   };

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
//       <div className="relative w-full max-w-md rounded-xl bg-white p-8">
//         <button
//           onClick={handleClose}
//           className="absolute right-5 top-5 text-gray-400 hover:text-gray-600"
//         >
//           <X className="h-5 w-5" />
//         </button>

//         {!submitted ? (
//           <>
//             <div className="mb-6 flex items-start gap-4">
//               <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-blue-100">
//                 <Calendar className="h-6 w-6 text-blue-600" />
//               </div>
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">Book a Demo</h2>
//                 <p className="text-blue-600">See ASD CARGOMATE in Action</p>
//               </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   required
//                   value={form.fullName}
//                   onChange={handleChange("fullName")}
//                   placeholder="Enter Full Name"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Company Name
//                 </label>
//                 <input
//                   type="text"
//                   value={form.companyName}
//                   onChange={handleChange("companyName")}
//                   placeholder="Enter Company Name"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Work Email
//                 </label>
//                 <input
//                   type="email"
//                   required
//                   value={form.workEmail}
//                   onChange={handleChange("workEmail")}
//                   placeholder="Enter Your Work Email"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   value={form.phone}
//                   onChange={handleChange("phone")}
//                   placeholder="Enter Your Phone Number"
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700">
//                     Preferred Date
//                   </label>
//                   <input
//                     type="date"
//                     value={form.preferredDate}
//                     onChange={handleChange("preferredDate")}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                   />
//                 </div>
//                 <div>
//                   <label className="mb-1 block text-sm font-medium text-gray-700">
//                     Preferred Time
//                   </label>
//                   <input
//                     type="time"
//                     value={form.preferredTime}
//                     onChange={handleChange("preferredTime")}
//                     className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Message (Optional)
//                 </label>
//                 <textarea
//                   rows={3}
//                   value={form.message}
//                   onChange={handleChange("message")}
//                   placeholder="Tell us what you'd like to explore..."
//                   className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={handleClose}
//                   className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//                 >
//                   <Calendar className="h-4 w-4" />
//                   Book a Demo
//                 </button>
//               </div>
//             </form>
//           </>
//         ) : (
//           <div className="flex flex-col items-center py-4 text-center">
//             <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-green-500">
//               <CheckCircle className="h-10 w-10 text-white" />
//             </div>
//             <h2 className="text-xl font-bold text-gray-900">
//               Demo Request Recieved!
//             </h2>
//             <p className="mt-2 font-medium text-blue-600">
//               Thank you for booking a demo with ASD CARGOMATE
//             </p>
//             <p className="mt-2 max-w-xs text-sm text-gray-500">
//               Our Team will review your request and contact you shortly to
//               confirm your preference date and time.
//             </p>
//             <div className="mt-6 flex w-full gap-3">
//               <button
//                 onClick={handleClose}
//                 className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 <CheckCircle className="h-4 w-4" />
//                 Done
//               </button>
//               <button
//                 onClick={() => {
//                   handleClose();
//                   if (onNavigate) onNavigate("Home");
//                 }}
//                 className="flex-1 rounded-lg border border-gray-300 py-2.5 text-sm font-medium text-blue-600 hover:bg-gray-50"
//               >
//                 Back to Home
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { CalendarDays, CheckCircle2, X, Sparkles, ArrowRight, Loader2, ShieldCheck } from "lucide-react";

const emptyForm = { fullName: "", companyName: "", workEmail: "", phone: "", preferredDate: "", preferredTime: "", message: "" };
const fieldClass = "w-full rounded-xl border border-cyan-300/20 bg-[#0A2840] px-4 py-3 text-sm text-white placeholder:text-slate-400 outline-none transition focus:border-teal-300 focus:ring-2 focus:ring-teal-300/20 [color-scheme:dark]";

export default function BookDemoModal({ isOpen, onClose, onNavigate }) {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState(emptyForm);
  if (!isOpen) return null;

  const handleChange = (field) => (e) => setForm((current) => ({ ...current, [field]: e.target.value }));
  const handleClose = () => {
    if (submitting) return;
    setSubmitted(false);
    setError("");
    setForm(emptyForm);
    onClose?.();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError("");
    try {
      const response = await fetch("/api/demo-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Demo request could not be submitted. Please try again.");
      setSubmitted(true);
    } catch (err) {
      console.error("Demo booking failed:", err);
      setError("Unable to submit your request right now. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-[#020D1B]/85 px-3 py-6 backdrop-blur-md sm:px-5" role="dialog" aria-modal="true" aria-labelledby="book-demo-title" onMouseDown={(e) => { if (e.target === e.currentTarget) handleClose(); }}>
      <div className="relative my-auto w-full max-w-2xl overflow-hidden rounded-[26px] border border-cyan-300/20 bg-[#061B30] shadow-[0_25px_100px_rgba(0,0,0,.6)]">
        <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-cyan-400/15 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-teal-400/10 blur-3xl" />
        <button type="button" onClick={handleClose} aria-label="Close demo form" className="absolute right-4 top-4 z-20 rounded-full border border-white/15 bg-white/10 p-2 text-slate-200 transition hover:bg-white/20"><X size={18} /></button>
        <div className="relative border-b border-cyan-300/15 bg-gradient-to-r from-[#08253D] via-[#09364B] to-[#061B30] px-6 pb-5 pt-7 sm:px-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-300/25 bg-teal-300/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-teal-200"><Sparkles size={13} /> ASD CargoMate Experience</div>
          <h2 id="book-demo-title" className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">{submitted ? "You're on Your Way!" : "See Smarter Logistics in Action"}</h2>
          <p className="mt-2 max-w-lg text-sm leading-6 text-slate-300">{submitted ? "Your demo request has been received." : "Book a personalized walkthrough of ASD CargoMate's AI-powered trade and logistics platform."}</p>
        </div>
        {submitted ? (
          <div className="relative px-6 py-10 text-center sm:px-8">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl border border-teal-300/30 bg-teal-300/10"><CheckCircle2 size={42} className="text-teal-300" /></div>
            <h3 className="mt-5 text-xl font-bold text-white">Demo Request Received!</h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-300">Thank you for your interest in ASD CargoMate. Our team will contact you to confirm your preferred date and time.</p>
            <div className="mt-7 flex flex-wrap justify-center gap-3"><button type="button" onClick={handleClose} className="rounded-xl bg-gradient-to-r from-teal-300 to-cyan-300 px-7 py-3 text-sm font-bold text-[#06243A]">Done</button><button type="button" onClick={() => { handleClose(); onNavigate ? onNavigate("Home") : window.location.assign("/"); }} className="rounded-xl border border-cyan-300/30 px-7 py-3 text-sm font-semibold text-white hover:bg-white/10">Back to Home</button></div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="relative max-h-[65vh] space-y-4 overflow-y-auto px-6 py-6 sm:px-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {[
                { key: "fullName", label: "Full Name", placeholder: "Your full name", required: true },
                { key: "companyName", label: "Company Name", placeholder: "Your organization" },
                { key: "workEmail", label: "Work Email", placeholder: "name@company.com", type: "email", required: true },
                { key: "phone", label: "Phone Number", placeholder: "+91 98765 43210", type: "tel" },
                { key: "preferredDate", label: "Preferred Date", type: "date", min: new Date().toLocaleDateString("en-CA") },
                { key: "preferredTime", label: "Preferred Time", type: "time" },
              ].map(({ key, label, placeholder, type = "text", required, min }) => (
                <label key={key} className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-200">{label}{required && <span className="ml-1 text-teal-300">*</span>}</span><input type={type} required={required} min={min} value={form[key]} onChange={handleChange(key)} placeholder={placeholder} className={fieldClass} /></label>
              ))}
            </div>
            <label className="block"><span className="mb-1.5 block text-xs font-semibold text-slate-200">Anything you'd like us to cover? <span className="font-normal text-slate-400">(Optional)</span></span><textarea rows={3} value={form.message} onChange={handleChange("message")} placeholder="Tell us about your logistics needs..." className={`${fieldClass} resize-y`} /></label>
            {error && <p role="alert" className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-sm text-rose-200">{error}</p>}
            <div className="flex items-center gap-2 text-xs text-slate-400"><ShieldCheck size={15} className="shrink-0 text-teal-300" /> Your details will only be used to coordinate your demo.</div>
            <div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row"><button type="button" onClick={handleClose} disabled={submitting} className="rounded-xl border border-cyan-300/25 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:bg-white/10 sm:flex-1">Cancel</button><button type="submit" disabled={submitting} className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#5EEAD4] to-[#67E8F9] px-6 py-3 text-sm font-extrabold text-[#06243A] shadow-[0_8px_25px_rgba(34,211,238,.15)] transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-60 sm:flex-[2]">{submitting ? <Loader2 size={17} className="animate-spin" /> : <CalendarDays size={17} />}{submitting ? "Submitting..." : "Book My Demo"}{!submitting && <ArrowRight size={16} />}</button></div>
          </form>
        )}
      </div>
    </div>
  );
}
