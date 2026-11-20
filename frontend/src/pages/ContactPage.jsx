// import { useState } from "react";
// import {
//   Building2,
//   Mail,
//   Phone,
//   Calendar,
//   ArrowRight,
//   UserCircle,
//   Clock3,
//   Rocket,
//   Wrench,
//   Handshake,
//   User,
// } from "lucide-react";
// import Footer from "../components/Footer";
// import BookDemoModal from "../components/BookDemoModal";
// import contactHero from "../assets/resources-hero.png";

// const subjects = [
//   "General Inquiry",
//   "Technical Support",
//   "Partnership Opportunity",
//   "Billing Question",
//   "Product Demo Request",
// ];

// const whyContactUs = [
//   {
//     icon: UserCircle,
//     title: "Expert Assistance",
//     description: "Get help from our trade experts",
//   },
//   {
//     icon: Clock3,
//     title: "Quick Response",
//     description: "We aim to respond within 24 hours",
//   },
//   {
//     icon: Rocket,
//     title: "Product Demo",
//     description: "See how ASD CARGOMATE can transform your business",
//   },
//   {
//     icon: Wrench,
//     title: "Technical Support",
//     description: "Resolve issues and get the support you need",
//   },
//   {
//     icon: Handshake,
//     title: "Partnership Inquiries",
//     description: "Explore partnership and integration opportunities",
//   },
// ];

// export default function ContactPage({ onNavigate }) {
//   const [isDemoOpen, setIsDemoOpen] = useState(false);
//   const [form, setForm] = useState({
//     fullName: "",
//     workEmail: "",
//     phone: "",
//     subject: "",
//     message: "",
//   });

//   const handleChange = (field) => (e) => {
//     setForm({ ...form, [field]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await fetch("/api/contact-requests", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(form),
//       });
//       setForm({
//         fullName: "",
//         workEmail: "",
//         phone: "",
//         subject: "",
//         message: "",
//       });
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   return (
//     <div className="w-full">
      
//       <section
//         className="relative inset-0 w-full h-full object-cover"
//         style={{ backgroundImage: `url(${contactHero})` }}
//       >
//         <div className="absolute inset-0 bg-blue-950/40" />
//         <div className="relative mx-auto max-w-6xl px-6 py-24">
//           <h1 className="text-5xl font-extrabold text-white">Contact Us</h1>
//           <p className="mt-3 text-3xl font-bold text-blue-400">
//             We're Here to Help You Succeed
//           </p>
//           <p className="mt-6 max-w-xl text-lg text-gray-200">
//             Have questions or need assistance? Get in touch with our team
//             and we'll get back to you as soon as possible.
//           </p>
//         </div>
//       </section>

//       <section className="mx-auto max-w-6xl px-6 py-12">
//         <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
//           <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
//             <Building2 className="h-8 w-8 flex-shrink-0 text-blue-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Office</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 ASD CARGOMATE Pvt. Ltd.
//                 <br />
//                 601, 6th Floor, Udyog Vihar,
//                 <br />
//                 Phase V, Gurugram,
//                 <br />
//                 Haryana – 122016, India
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
//             <Mail className="h-8 w-8 flex-shrink-0 text-blue-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Email</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 info@cargomate.com
//                 <br />
//                 support@cargomate.com
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
//             <Phone className="h-8 w-8 flex-shrink-0 text-blue-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Phone</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 +91 11 6912 2200
//                 <br />
//                 +91 98765 43210
//                 <br />
//                 (Mon – Sat | 9:00 AM – 6:00 PM)
//               </p>
//             </div>
//           </div>

//           <div className="flex items-start gap-4 rounded-xl border border-gray-200 p-6">
//             <Calendar className="h-8 w-8 flex-shrink-0 text-blue-600" />
//             <div>
//               <h3 className="font-semibold text-gray-900">Demo Booking</h3>
//               <p className="mt-1 text-sm text-gray-500">
//                 Book a personalized demo with our product experts.
//               </p>
//               <button
//                 onClick={() => setIsDemoOpen(true)}
//                 className="mt-2 flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700"
//               >
//                 Book a Demo
//                 <ArrowRight className="h-4 w-4" />
//               </button>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-6xl px-6 pb-12">
//         <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           <div className="rounded-xl border border-gray-200 p-6">
//             <h2 className="text-center text-lg font-bold text-blue-600">
//               Support Form
//             </h2>
//             <p className="mt-1 text-center text-sm text-gray-500">
//               Fill out the form and our support team will get back to you
//               shortly.
//             </p>

//             <form onSubmit={handleSubmit} className="mt-6 space-y-4">
//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Full Name *
//                 </label>
//                 <div className="relative">
//                   <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="text"
//                     required
//                     value={form.fullName}
//                     onChange={handleChange("fullName")}
//                     placeholder="Enter your full name"
//                     className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Work Email *
//                 </label>
//                 <div className="relative">
//                   <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="email"
//                     required
//                     value={form.workEmail}
//                     onChange={handleChange("workEmail")}
//                     placeholder="Enter your work email"
//                     className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Phone Number
//                 </label>
//                 <div className="relative">
//                   <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
//                   <input
//                     type="tel"
//                     value={form.phone}
//                     onChange={handleChange("phone")}
//                     placeholder="Enter your phone number"
//                     className="w-full rounded-lg border border-gray-300 py-2.5 pl-10 pr-4 text-sm outline-none focus:border-blue-500"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Subject *
//                 </label>
//                 <select
//                   required
//                   value={form.subject}
//                   onChange={handleChange("subject")}
//                   className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm text-gray-600 outline-none focus:border-blue-500"
//                 >
//                   <option value="">Select a subject</option>
//                   {subjects.map((subject) => (
//                     <option key={subject} value={subject}>
//                       {subject}
//                     </option>
//                   ))}
//                 </select>
//               </div>

//               <div>
//                 <label className="mb-1 block text-sm font-medium text-gray-700">
//                   Message *
//                 </label>
//                 <textarea
//                   required
//                   rows={4}
//                   value={form.message}
//                   onChange={handleChange("message")}
//                   placeholder="How can we help you?"
//                   className="w-full resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-blue-500"
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white hover:bg-blue-700"
//               >
//                 Submit Request
//               </button>
//             </form>
//           </div>

//           <div className="rounded-xl border border-gray-200 p-6">
//             <h2 className="text-center text-lg font-bold text-blue-600">
//               Office Location
//             </h2>
//             <div className="mt-4 overflow-hidden rounded-lg border border-gray-200">
//               <iframe
//                 title="ASD CargoMate Office Location"
//                 src="https://www.google.com/maps?q=Udyog+Vihar+Phase+V+Gurugram+Haryana+122016&output=embed"
//                 className="h-96 w-full"
//                 loading="lazy"
//               />
//             </div>
//           </div>

//           <div className="rounded-xl border border-gray-200 p-6">
//             <h2 className="text-lg font-bold text-blue-600">
//               Why Contact Us?
//             </h2>
//             <div className="mt-6 space-y-6">
//               {whyContactUs.map(({ icon: Icon, title, description }) => (
//                 <div key={title} className="flex items-start gap-4">
//                   <Icon className="h-6 w-6 flex-shrink-0 text-blue-600" />
//                   <div>
//                     <h3 className="font-semibold text-gray-900">{title}</h3>
//                     <p className="mt-0.5 text-sm text-gray-500">
//                       {description}
//                     </p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="mx-auto max-w-6xl px-6 pb-16">
//         <div className="flex flex-col items-start justify-between gap-6 rounded-xl bg-blue-600 p-10 md:flex-row md:items-center">
//           <div>
//             <h2 className="text-2xl font-bold text-white">
//               Let's Connect and Grow Together
//             </h2>
//             <p className="mt-2 max-w-xl text-blue-100">
//               Whether you have a question, need support, or want to explore
//               how we can work together, our team is ready to assist you.
//             </p>
//           </div>
//           <button
//             onClick={() => setIsDemoOpen(true)}
//             className="flex-shrink-0 rounded-lg bg-white px-6 py-3 text-sm font-semibold text-blue-600 hover:bg-blue-50"
//           >
//             Book a demo
//           </button>
//         </div>
//       </section>

//       <Footer onNavigate={onNavigate} />

//       <BookDemoModal
//         isOpen={isDemoOpen}
//         onClose={() => setIsDemoOpen(false)}
//         onNavigate={onNavigate}
//       />
//     </div>
//   );
// }

import { useState } from "react";
import {
  Building2, Mail, Phone, Calendar, ArrowRight, UserCircle,
  Clock3, Rocket, Wrench, Handshake, User, MapPin,
  Sparkles, Send, CheckCircle2, AlertCircle,
} from "lucide-react";
import Footer from "../components/Footer";
import BookDemoModal from "../components/BookDemoModal";
import contactHero from "../assets/resources-hero.png";

const subjects = [
  "General Inquiry", "Technical Support", "Partnership Opportunity",
  "Billing Question", "Product Demo Request",
];

const whyContactUs = [
  { icon: UserCircle, title: "Expert Assistance", description: "Get help from our trade experts" },
  { icon: Clock3, title: "Quick Response", description: "We aim to respond within 24 hours" },
  { icon: Rocket, title: "Product Demo", description: "See how ASD CargoMate can transform your business" },
  { icon: Wrench, title: "Technical Support", description: "Resolve issues and get the support you need" },
  { icon: Handshake, title: "Partnership Inquiries", description: "Explore partnership and integration opportunities" },
];

const officeAddress = "VENKATA SAI NILAYAM, H N.21-59/10, GR & 1ST FLOOR, HUDA COLONY, STREET NO.5, R.B. NAGAR, SHAMSHABAD, HYDERABAD - 501218, INDIA";
const mapUrl = `https://www.google.com/maps?q=${encodeURIComponent(officeAddress)}&output=embed`;
const fieldClass = "w-full rounded-xl border border-[#CFE5EC] bg-[#F8FCFE] px-4 py-3 text-sm text-[#15344C] placeholder:text-slate-400 outline-none transition focus:border-teal-400 focus:bg-white focus:ring-4 focus:ring-teal-500/10";

export default function ContactPage({ onNavigate }) {
  const [isDemoOpen, setIsDemoOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", text: "" });
  const [form, setForm] = useState({ fullName: "", workEmail: "", phone: "", subject: "", message: "" });

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
    if (feedback.text) setFeedback({ type: "", text: "" });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setFeedback({ type: "", text: "" });
    try {
      const response = await fetch("/api/contact-requests", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) throw new Error("Unable to submit your request. Please try again.");
      setForm({ fullName: "", workEmail: "", phone: "", subject: "", message: "" });
      setFeedback({ type: "success", text: "Your request has been submitted successfully." });
    } catch (error) {
      console.error("Contact request failed:", error);
      setFeedback({ type: "error", text: "Your request could not be sent. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="w-full bg-[#F7FCFD]">
      {/* Light-themed hero; the original background image stays visible */}
      <section className="relative isolate overflow-hidden border-b border-[#D5EBF1] bg-gradient-to-r from-[#E8F9FC] via-[#F2FBFF] to-[#E5F8F5]">
        <img src={contactHero} alt="Global trade and logistics network" className="absolute inset-0 h-full w-full object-cover object-center opacity-95" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#EFFCFF]/65 via-[#EFFCFF]/40 to-[#E9FAF7]/5" />
        <div className="pointer-events-none absolute -right-20 -top-28 h-80 w-80 rounded-full bg-cyan-300/25 blur-3xl" />
        <div className="relative mx-auto flex min-h-[310px] max-w-6xl flex-col justify-center px-5 py-12 sm:min-h-[350px] sm:px-8 lg:px-10">
          <span className="mb-5 inline-flex w-fit items-center gap-2 rounded-full border border-teal-200 bg-white/80 px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-teal-700 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4" /> Let's Connect
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight text-[#102A43] sm:text-5xl">
            Contact <span className="bg-gradient-to-r from-[#0D9488] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">Us</span>
          </h1>
          <h2 className="mt-3 text-xl font-bold text-[#edeff0] sm:text-2xl">We're Here to Help You Succeed</h2>
          <p className="mt-4 max-w-xl text-sm leading-7 text-slate-900 sm:text-base">
            Have questions or need assistance? Get in touch with our team and we'll get back to you as soon as possible.
          </p>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
      </section>

      {/* Contact information */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8 lg:px-10">
        <div className="mb-7 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-teal-600">Get In Touch</p>
          <h2 className="mt-2 text-2xl font-extrabold text-[#102A43] sm:text-3xl">We're Just a Message Away</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-5 shadow-[0_8px_30px_rgba(8,71,96,0.05)]">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Building2 className="h-5 w-5" /></span>
            <h3 className="font-bold text-[#102A43]">Office</h3>
            <p className="mt-2 text-xs font-semibold text-[#16435A]">ASD LOGISTICS PVT LTD</p>
            <address className="mt-1 text-xs not-italic leading-6 text-slate-500">{officeAddress}</address>
          </article>
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-5 shadow-[0_8px_30px_rgba(8,71,96,0.05)]">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-50 text-cyan-600"><Mail className="h-5 w-5" /></span>
            <h3 className="font-bold text-[#102A43]">Email Support</h3>
            <a href="mailto:support@asdcargomate.com" className="mt-2 block break-all text-xs leading-6 text-slate-500 hover:text-teal-600">support@asdcargomate.com</a>
          </article>
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-5 shadow-[0_8px_30px_rgba(8,71,96,0.05)]">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-50 text-sky-600"><Phone className="h-5 w-5" /></span>
            <h3 className="font-bold text-[#102A43]">Call Us</h3>
            <a href="tel:+9118001234567" className="mt-2 block text-xs leading-6 text-slate-500 hover:text-teal-600">+91 1800 123 4567</a>
            <p className="mt-1 text-xs leading-6 text-slate-500">Mon–Sat · 9:00 AM – 6:00 PM</p>
          </article>
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-5 shadow-[0_8px_30px_rgba(8,71,96,0.05)]">
            <span className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 text-teal-600"><Calendar className="h-5 w-5" /></span>
            <h3 className="font-bold text-[#102A43]">Demo Booking</h3>
            <p className="mt-2 text-xs leading-6 text-slate-500">Book a personalized demo with our product experts.</p>
            <button type="button" onClick={() => setIsDemoOpen(true)} className="mt-3 inline-flex items-center gap-2 text-xs font-bold text-teal-700 hover:text-cyan-700">Book a Demo <ArrowRight className="h-4 w-4" /></button>
          </article>
        </div>
      </section>

      {/* Support form, map, and reasons */}
      <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-6 shadow-[0_10px_35px_rgba(8,71,96,0.05)]">
            <h2 className="text-lg font-extrabold text-[#102A43]">Support Form</h2>
            <p className="mt-1 text-xs leading-6 text-slate-500">Fill out the form and our support team will get back to you shortly.</p>
            <form onSubmit={handleSubmit} className="mt-5 space-y-4">
              <div><label htmlFor="contact-name" className="mb-1.5 block text-xs font-semibold text-[#16435A]">Full Name *</label><div className="relative"><User className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-teal-600" /><input id="contact-name" required value={form.fullName} onChange={handleChange("fullName")} placeholder="Enter your full name" className={`${fieldClass} pl-10`} /></div></div>
              <div><label htmlFor="contact-email" className="mb-1.5 block text-xs font-semibold text-[#16435A]">Work Email *</label><div className="relative"><Mail className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-teal-600" /><input id="contact-email" type="email" required value={form.workEmail} onChange={handleChange("workEmail")} placeholder="Enter your work email" className={`${fieldClass} pl-10`} /></div></div>
              <div><label htmlFor="contact-phone" className="mb-1.5 block text-xs font-semibold text-[#16435A]">Phone Number</label><div className="relative"><Phone className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-teal-600" /><input id="contact-phone" type="tel" value={form.phone} onChange={handleChange("phone")} placeholder="Enter your phone number" className={`${fieldClass} pl-10`} /></div></div>
              <div><label htmlFor="contact-subject" className="mb-1.5 block text-xs font-semibold text-[#16435A]">Subject *</label><select id="contact-subject" required value={form.subject} onChange={handleChange("subject")} className={fieldClass}><option value="">Select a subject</option>{subjects.map((subject) => <option key={subject} value={subject}>{subject}</option>)}</select></div>
              <div><label htmlFor="contact-message" className="mb-1.5 block text-xs font-semibold text-[#16435A]">Message *</label><textarea id="contact-message" required rows={4} value={form.message} onChange={handleChange("message")} placeholder="How can we help you?" className={`${fieldClass} resize-y`} /></div>
              {feedback.text && <p role="status" className={`flex items-start gap-2 rounded-lg p-3 text-xs ${feedback.type === "success" ? "bg-teal-50 text-teal-700" : "bg-red-50 text-red-700"}`}>{feedback.type === "success" ? <CheckCircle2 className="h-4 w-4 shrink-0" /> : <AlertCircle className="h-4 w-4 shrink-0" />}{feedback.text}</p>}
              <button type="submit" disabled={submitting} className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] px-5 py-3 text-sm font-bold text-[#06243A] shadow-[0_8px_20px_rgba(20,184,166,0.18)] transition hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"><Send className="h-4 w-4" />{submitting ? "Submitting..." : "Submit Request"}</button>
            </form>
          </article>
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-6 shadow-[0_10px_35px_rgba(8,71,96,0.05)]">
            <h2 className="flex items-center gap-2 text-lg font-extrabold text-[#102A43]"><MapPin className="h-5 w-5 text-teal-600" /> Office Location</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500">Visit our office in Shamshabad, Hyderabad.</p>
            <div className="mt-5 overflow-hidden rounded-xl border border-[#D5EAF0]"><iframe title="ASD Logistics Office Location" src={mapUrl} className="h-[360px] w-full" loading="lazy" referrerPolicy="no-referrer-when-downgrade" /></div>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(officeAddress)}`} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-teal-700 hover:text-cyan-700">Open in Google Maps <ArrowRight className="h-4 w-4" /></a>
          </article>
          <article className="rounded-2xl border border-[#D5EAF0] bg-white p-6 shadow-[0_10px_35px_rgba(8,71,96,0.05)]">
            <h2 className="text-lg font-extrabold text-[#102A43]">Why Contact Us?</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500">Real people, expert guidance, smarter solutions.</p>
            <div className="mt-6 space-y-5">{whyContactUs.map(({ icon: Icon, title, description }) => <div key={title} className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#E9F9F8] text-teal-600"><Icon className="h-5 w-5" /></span><div><h3 className="text-sm font-bold text-[#102A43]">{title}</h3><p className="mt-1 text-xs leading-5 text-slate-500">{description}</p></div></div>)}</div>
          </article>
        </div>
      </section>

      {/* Light CTA */}
      {/* <section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-10">
        <div className="relative overflow-hidden rounded-3xl border border-[#CDE9EE] bg-gradient-to-r from-[#DDF8F5] via-[#E8F9FC] to-[#DDEFFF] p-6 shadow-[0_12px_40px_rgba(8,71,96,0.07)] sm:p-9">
          <div className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-cyan-300/25 blur-3xl" />
          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div><span className="mb-3 inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-700"><Sparkles className="h-3.5 w-3.5" /> Let's Grow Together</span><h2 className="text-xl font-extrabold text-[#102A43] sm:text-2xl">Let's Connect and <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">Grow Together</span></h2><p className="mt-2 max-w-xl text-sm leading-6 text-slate-600">Whether you have a question, need support, or want to explore how we can work together, our team is ready to assist you.</p></div>
            <button type="button" onClick={() => setIsDemoOpen(true)} className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-gradient-to-r from-[#14B8A6] to-[#22D3EE] px-6 py-3 text-sm font-bold text-[#06243A] shadow-[0_8px_22px_rgba(20,184,166,0.22)] transition hover:-translate-y-0.5 hover:shadow-lg">Book a Demo <ArrowRight className="h-4 w-4" /></button>
          </div>
        </div>
      </section> */}


<section className="mx-auto max-w-6xl px-5 pb-14 sm:px-8 lg:px-10">
  <div className="relative isolate overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-[#03182B] via-[#06263D] to-[#073D4B] p-6 shadow-[0_18px_50px_rgba(2,24,43,0.22)] sm:p-9 lg:p-10">

    {/* Decorative Cyan Glow */}
    <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl" />

    {/* Decorative Teal Glow */}
    <div className="pointer-events-none absolute -bottom-24 left-16 h-56 w-56 rounded-full bg-teal-400/10 blur-3xl" />

    {/* Subtle Grid Background */}
    <div
      className="pointer-events-none absolute inset-0 opacity-20"
      style={{
        backgroundImage:
          "linear-gradient(rgba(34,211,238,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.12) 1px, transparent 1px)",
        backgroundSize: "42px 42px",
      }}
    />

    {/* Content */}
    <div className="relative z-10 flex flex-col items-start justify-between gap-7 sm:flex-row sm:items-center">

      {/* Text */}
      <div className="max-w-xl">

        {/* Badge */}
        <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-teal-400/30 bg-teal-400/10 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wider text-teal-200 backdrop-blur-sm">
          <Sparkles className="h-3.5 w-3.5 text-teal-300" />
          Let's Grow Together
        </span>

        {/* Heading */}
        <h2 className="text-xl font-extrabold leading-tight tracking-tight text-white sm:text-2xl lg:text-[28px]">
          Let's Connect and{" "}
          <span className="bg-gradient-to-r from-[#5EEAD4] via-[#67E8F9] to-[#93C5FD] bg-clip-text text-transparent">
            Grow Together
          </span>
        </h2>

        {/* Description */}
        <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
          Whether you have a question, need support, or want to
          explore how we can work together, our team is ready
          to assist you.
        </p>
      </div>

      {/* Book Demo Button */}
      <button
        type="button"
        onClick={() => setIsDemoOpen(true)}
        className="group inline-flex shrink-0 items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-[#2DD4BF] to-[#67E8F9] px-7 py-3.5 text-sm font-bold text-[#06243A] shadow-[0_8px_25px_rgba(20,184,166,0.22)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(34,211,238,0.32)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
      >
        Book a Demo

        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>

    {/* Bottom Glow Line */}
    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent" />
  </div>
</section>

      <Footer onNavigate={onNavigate} />
      <BookDemoModal isOpen={isDemoOpen} onClose={() => setIsDemoOpen(false)} onNavigate={onNavigate} />
    </main>
  );
}
