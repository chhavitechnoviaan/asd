// import React, { useState } from 'react';
// import { createPortal } from 'react-dom';
// import { X, Paperclip } from 'lucide-react';
// import Swal from 'sweetalert2';
// import API from '../api/axios';

// export default function SupportTicketModal({ onClose, onCreated, initialCategory = 'Shipments', initialSubject = '', context = '' }) {
//   const [createForm, setCreateForm] = useState({subject: initialSubject, category: initialCategory, priority: 'Medium', description: '', file: null});
//   const [submitting, setSubmitting] = useState(false);
//   // Handle Create Ticket Submit
//   const handleCreateTicketSubmit = async (e) => {
//     e.preventDefault();
//     if (!createForm.subject.trim()) {
//       Swal.fire({ icon: 'warning', title: 'Subject Required', text: 'Please enter a subject for the ticket.', confirmButtonColor: '#0f766e' });
//       return;
//     }
//     if (!createForm.description.trim()) {
//       Swal.fire({ icon: 'warning', title: 'Description Required', text: 'Please describe your problem or issue in detail.', confirmButtonColor: '#0f766e' });
//       return;
//     }

//     try {
//       setSubmitting(true);
//       const formData = new FormData();
//       formData.append('subject', createForm.subject.trim());
//       formData.append('category', createForm.category);
//       formData.append('priority', createForm.priority);
//       formData.append('description', [createForm.description.trim(), context].filter(Boolean).join('\n\n'));
//       if (createForm.file) {
//         formData.append('attachment', createForm.file);
//       }

//       const res = await API.post('/help-support/ticket', formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//       });

//       if (res.data?.status) {
//         onClose();
//         setCreateForm({
//           subject: '',
//           category: 'Shipments',
//           priority: 'Medium',
//           description: '',
//           file: null
//         });
//         onCreated?.();
//         Swal.fire({
//           icon: 'success',
//           title: 'Ticket Raised!',
//           text: `Your ticket ${res.data.data?.ticketId || ''} has been created successfully. Our team will review and reply shortly.`,
//           confirmButtonColor: '#0f766e'
//         });
//       } else {
//         throw new Error(res.data?.message || "Could not create ticket.");
//       }
//     } catch (err) {
//       Swal.fire({
//         icon: 'error',
//         title: 'Submission Failed',
//         text: err.response?.data?.message || err.message || 'Could not create ticket.',
//         confirmButtonColor: '#0f766e'
//       });
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return createPortal(
// <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/50 p-4">
//           <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-150">
//             <div className="flex items-center justify-between pb-3 border-b border-slate-100">
//               <h3 className="text-base font-bold text-slate-900">Create Support Ticket</h3>
//               <button 
//                 type="button" disabled={submitting} onClick={onClose}
//                 className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
//               >
//                 <X className="w-5 h-5" />
//               </button>
//             </div>

//             <form onSubmit={handleCreateTicketSubmit} className="space-y-4 mt-4 text-xs font-medium">
//               {context && <pre className="max-h-28 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-xs text-slate-600">{context}</pre>}
//               <div>
//                 <label className="block text-slate-700 font-bold mb-1">Subject / Issue Title *</label>
//                 <input 
//                   type="text"
//                   required
//                   placeholder="e.g. Shipment Delay - PLN-2025-04-24-000123"
//                   value={createForm.subject}
//                   onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
//                   className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-3">
//                 <div>
//                   <label className="block text-slate-700 font-bold mb-1">Category</label>
//                   <select 
//                     value={createForm.category}
//                     onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
//                     className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
//                   >
//                     <option value="Shipments">Shipments</option>
//                     <option value="Documents">Documents</option>
//                     <option value="HS Codes">HS Codes</option>
//                     <option value="Freight & Costs">Freight & Costs</option>
//                     <option value="Payment">Payment</option>
//                     <option value="Data Request">Data Request</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div>
//                   <label className="block text-slate-700 font-bold mb-1">Priority</label>
//                   <select 
//                     value={createForm.priority}
//                     onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
//                     className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-teal-500 bg-white"
//                   >
//                     <option value="Low">Low</option>
//                     <option value="Medium">Medium</option>
//                     <option value="High">High</option>
//                   </select>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-slate-700 font-bold mb-1">Description / Message *</label>
//                 <textarea 
//                   required
//                   rows={4}
//                   placeholder="Describe your problem or question in detail..."
//                   value={createForm.description}
//                   onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
//                   className="w-full border border-slate-200 rounded-lg p-3 text-xs focus:outline-none focus:border-teal-500"
//                 ></textarea>
//               </div>

//               <div>
//                 <label className="block text-slate-700 font-bold mb-1">Attachment (Optional)</label>
//                 <div className="flex items-center gap-2">
//                   <label className="cursor-pointer flex items-center gap-1.5 px-3 py-2 border border-dashed border-slate-300 rounded-lg hover:border-teal-500 text-slate-600 transition-colors">
//                     <Paperclip className="w-4 h-4 text-slate-400" />
//                     <span className="text-[11px] font-semibold">{createForm.file ? createForm.file.name : "Choose file (PDF, Doc, Image)"}</span>
//                     <input 
//                       type="file" 
//                       className="hidden" 
//                       onChange={(e) => setCreateForm({ ...createForm, file: e.target.files[0] })}
//                     />
//                   </label>
//                   {createForm.file && (
//                     <button 
//                       type="button" 
//                       onClick={() => setCreateForm({ ...createForm, file: null })}
//                       className="text-red-500 hover:text-red-700 text-[11px] font-bold"
//                     >
//                       Remove
//                     </button>
//                   )}
//                 </div>
//               </div>

//               <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
//                 <button 
//                   type="button"
//                   type="button" disabled={submitting} onClick={onClose}
//                   className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button 
//                   type="submit"
//                   disabled={submitting}
//                   className="px-5 py-2 text-xs font-bold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50"
//                 >
//                   {submitting ? "Submitting..." : "Submit Ticket"}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>, document.body);
// }




import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Paperclip, LifeBuoy, FileText, Send, ChevronDown } from 'lucide-react';
import Swal from 'sweetalert2';
import API from '../api/axios';

export default function SupportTicketModal({ onClose, onCreated, initialCategory = 'Shipments', initialSubject = '', context = '' }) {
  const [createForm, setCreateForm] = useState({subject: initialSubject, category: initialCategory, priority: 'Medium', description: '', file: null});
  const [submitting, setSubmitting] = useState(false);
  // Handle Create Ticket Submit
  const handleCreateTicketSubmit = async (e) => {
    e.preventDefault();
    if (!createForm.subject.trim()) {
      Swal.fire({ icon: 'warning', title: 'Subject Required', text: 'Please enter a subject for the ticket.', confirmButtonColor: '#0f766e' });
      return;
    }
    if (!createForm.description.trim()) {
      Swal.fire({ icon: 'warning', title: 'Description Required', text: 'Please describe your problem or issue in detail.', confirmButtonColor: '#0f766e' });
      return;
    }

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append('subject', createForm.subject.trim());
      formData.append('category', createForm.category);
      formData.append('priority', createForm.priority);
      formData.append('description', [createForm.description.trim(), context].filter(Boolean).join('\n\n'));
      if (createForm.file) {
        formData.append('attachment', createForm.file);
      }

      const res = await API.post('/help-support/ticket', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      if (res.data?.status) {
        onClose();
        setCreateForm({
          subject: '',
          category: 'Shipments',
          priority: 'Medium',
          description: '',
          file: null
        });
        onCreated?.();
        Swal.fire({
          icon: 'success',
          title: 'Ticket Raised!',
          text: `Your ticket ${res.data.data?.ticketId || ''} has been created successfully. Our team will review and reply shortly.`,
          confirmButtonColor: '#0f766e'
        });
      } else {
        throw new Error(res.data?.message || "Could not create ticket.");
      }
    } catch (err) {
      Swal.fire({
        icon: 'error',
        title: 'Submission Failed',
        text: err.response?.data?.message || err.message || 'Could not create ticket.',
        confirmButtonColor: '#0f766e'
      });
    } finally {
      setSubmitting(false);
    }
  };

  const fields = context.split('\n').filter(line => line.trim()).map(line => {
    const index = line.indexOf(':');
    return index < 0 ? ['Details', line] : [line.slice(0, index).trim(), line.slice(index + 1).trim()];
  });
  const [showDetails, setShowDetails] = useState(false);
  return createPortal(
<div className="fixed inset-0 z-[1000] flex items-center justify-center bg-slate-950/50 backdrop-blur-[2px] p-3 sm:p-5">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl max-h-[94dvh] flex flex-col overflow-hidden relative border border-slate-200">
            <div className="flex shrink-0 items-center justify-between gap-3 border-b border-teal-100 bg-gradient-to-r from-teal-50 to-white px-5 py-4 sm:px-6">
              <div className="flex items-center gap-3"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-teal-700 text-white"><LifeBuoy size={22}/></span><div><h3 className="text-lg font-bold text-slate-900">Create Support Ticket</h3><p className="mt-0.5 text-xs text-slate-500">{context ? 'Request additional shipment information' : 'Tell us how we can help you'}</p></div></div>
              <button 
                type="button" disabled={submitting} onClick={onClose}
                className="p-1 rounded-md text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTicketSubmit} id="support-ticket-form" className="min-h-0 flex-1 overflow-y-auto overscroll-contain space-y-4 px-5 py-5 sm:px-6 text-sm font-medium">
              {context && <section className="rounded-xl border border-teal-100 bg-teal-50/40 p-4">
                <div className="mb-3 flex items-center justify-between gap-2"><div className="flex items-center gap-2 text-sm font-bold text-teal-800"><FileText size={16}/> Selected Shipment</div><span className="rounded-md bg-teal-100 px-2 py-1 text-[10px] font-semibold text-teal-800">Data Request</span></div>
                <dl className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">{(showDetails ? fields : fields.slice(0, 6)).map(([key,value],i)=><div key={i} className="min-w-0"><dt className="text-[10px] font-semibold uppercase tracking-wide text-slate-500">{key}</dt><dd className="mt-1 break-words text-xs font-semibold leading-5 text-slate-800">{value || '—'}</dd></div>)}</dl>
                {fields.length > 6 && <button type="button" onClick={()=>setShowDetails(v=>!v)} className="mt-3 flex items-center gap-1 text-xs font-semibold text-teal-700">{showDetails ? 'Show less' : 'View all shipment details'}<ChevronDown size={14} className={showDetails ? 'rotate-180' : ''}/></button>}
              </section>}
              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1.5">Subject / Issue Title *</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Shipment Delay - PLN-2025-04-24-000123"
                  value={createForm.subject}
                  onChange={(e) => setCreateForm({ ...createForm, subject: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-700 font-semibold mb-1.5">Category</label>
                  <select 
                    value={createForm.category}
                    onChange={(e) => setCreateForm({ ...createForm, category: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-white"
                  >
                    <option value="Shipments">Shipments</option>
                    <option value="Documents">Documents</option>
                    <option value="HS Codes">HS Codes</option>
                    <option value="Freight & Costs">Freight & Costs</option>
                    <option value="Payment">Payment</option>
                    <option value="Data Request">Data Request</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs text-slate-700 font-semibold mb-1.5">Priority</label>
                  <select 
                    value={createForm.priority}
                    onChange={(e) => setCreateForm({ ...createForm, priority: e.target.value })}
                    className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1.5">Description / Message *</label>
                <textarea 
                  required
                  rows={3}
                  placeholder="Describe your problem or question in detail..."
                  value={createForm.description}
                  onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-3 text-sm focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-100"
                ></textarea>
              </div>

              <div>
                <label className="block text-xs text-slate-700 font-semibold mb-1.5">Attachment (Optional)</label>
                <div className="flex items-center gap-2">
                  <label className="cursor-pointer flex flex-1 min-w-0 items-center gap-2 px-4 py-3 border border-dashed border-teal-200 bg-slate-50 rounded-xl hover:border-teal-500 text-slate-600 transition-colors">
                    <Paperclip className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold break-all">{createForm.file ? createForm.file.name : "Choose file (PDF, Doc, Image)"}</span>
                    <input 
                      type="file" 
                      className="hidden" 
                      onChange={(e) => setCreateForm({ ...createForm, file: e.target.files[0] })}
                    />
                  </label>
                  {createForm.file && (
                    <button 
                      type="button" 
                      onClick={() => setCreateForm({ ...createForm, file: null })}
                      className="text-red-500 hover:text-red-700 text-[11px] font-bold"
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>

            </form>
              <div className="shrink-0 flex flex-wrap items-center justify-end gap-3 border-t border-slate-200 bg-white px-5 py-4 sm:px-6">
                <button 
                  type="button" disabled={submitting} onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" form="support-ticket-form"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-teal-700 hover:bg-teal-800 rounded-lg transition-colors shadow-sm disabled:opacity-50"
                >
                  <Send size={15}/> {submitting ? "Submitting..." : "Submit Ticket"}
                </button>
              </div>
          </div>
        </div>, document.body);
}
