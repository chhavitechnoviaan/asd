// import {
//     FileText,
//     DollarSign,
//     X,
//   } from "lucide-react";
  
//   const toNumber = (value) => {
//     if (
//       value === null ||
//       value === undefined ||
//       value === ""
//     ) {
//       return 0;
//     }
  
//     return Number(String(value).replace(/,/g, "")) || 0;
//   };
  
//   const formatAmount = (value) => {
//     return toNumber(value).toLocaleString("en-IN", {
//       minimumFractionDigits: 2,
//       maximumFractionDigits: 2,
//     });
//   };
  
//   const formatDate = (date) => {
//     if (!date) return "-";
  
//     return new Date(date).toLocaleDateString("en-GB", {
//       day: "2-digit",
//       month: "short",
//       year: "numeric",
//     });
//   };
  
//   export default function ViewInvoiceModal({
//     invoice,
//     onClose,
//   }) {
//     if (!invoice) return null;
  
//     const items =
//       invoice.items ||
//       invoice.invoiceItems ||
//       [];
  
//     /* ================================
//        CALCULATIONS
//     ================================= */
  
//     const subtotal =
//       invoice.subtotal ??
//       items.reduce((sum, item) => {
//         const qty = toNumber(
//           item.qty ?? item.quantity
//         );
  
//         const unitPrice = toNumber(
//           item.unitPrice ?? item.price
//         );
  
//         return sum + qty * unitPrice;
//       }, 0);
  
//     const freightCharges = toNumber(
//       invoice.freightCharges
//     );
  
//     const insuranceCharges = toNumber(
//       invoice.insuranceCharges
//     );
  
//     const handlingCharges = toNumber(
//       invoice.handlingCharges
//     );
  
//     const discount = toNumber(
//       invoice.discount
//     );
  
//     const taxableAmount =
//       invoice.taxableAmount ??
//       Math.max(
//         0,
//         subtotal +
//           freightCharges +
//           insuranceCharges +
//           handlingCharges -
//           discount
//       );
  
//     const cgst =
//       invoice.cgst ??
//       taxableAmount * 0.09;
  
//     const sgst =
//       invoice.sgst ??
//       taxableAmount * 0.09;
  
//     const totalAmount =
//       invoice.totalAmount ??
//       taxableAmount +
//         cgst +
//         sgst;
  
//     return (
//       <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6">
  
//         <div className="w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl p-4 sm:p-6">
  
//           {/* ================= HEADER ================= */}
  
//           <div className="w-full flex items-center justify-between mb-6 gap-3">
  
//             <div className="flex items-center gap-3">
  
//               <div className="w-11 h-11 rounded-full bg-purple-50 flex items-center justify-center shrink-0">
//                 <FileText className="w-5 h-5 text-purple-600" />
//               </div>
  
//               <div>
//                 <h2 className="text-xl font-bold text-gray-900">
//                   Invoice Details
//                 </h2>
  
//                 <p className="text-sm text-gray-500">
//                   Review complete invoice information
//                 </p>
//               </div>
  
//             </div>
  
//             <div className="flex items-center gap-3">
  
//               <span
//                 className={`px-3 py-1 rounded-full text-xs font-semibold ${
//                   invoice.status === "Paid"
//                     ? "bg-green-50 text-green-600"
//                     : invoice.status === "Overdue"
//                     ? "bg-red-50 text-red-600"
//                     : "bg-yellow-50 text-yellow-600"
//                 }`}
//               >
//                 {invoice.status || "Pending"}
//               </span>
  
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center"
//               >
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
  
//             </div>
  
//           </div>
  
//           <div className="grid lg:grid-cols-3 gap-4">
  
//             {/* ================= LEFT SECTION ================= */}
  
//             <div className="lg:col-span-2 space-y-4">
  
//               {/* ================= INVOICE INFORMATION ================= */}
  
//               <div className="border border-gray-100 rounded-lg p-4">
  
//                 <p className="text-purple-600 font-semibold text-sm mb-4">
//                   Invoice Information
//                 </p>
  
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
  
//                   <InvoiceField
//                     label="Invoice Number"
//                     value={invoice.invoiceNumber}
//                   />
  
//                   <InvoiceField
//                     label="Invoice Date"
//                     value={formatDate(invoice.invoiceDate)}
//                   />
  
//                   <InvoiceField
//                     label="Due Date"
//                     value={formatDate(invoice.dueDate)}
//                   />
  
//                   <InvoiceField
//                     label="Currency"
//                     value={invoice.currency || "INR"}
//                   />
  
//                   <InvoiceField
//                     label="Bill To"
//                     value={invoice.billTo}
//                   />
  
//                   <div className="sm:col-span-2">
//                     <InvoiceField
//                       label="Address"
//                       value={invoice.address}
//                     />
//                   </div>
  
//                   <InvoiceField
//                     label="Payment Terms"
//                     value={invoice.paymentTerms}
//                   />
  
//                   <InvoiceField
//                     label="Payment Mode"
//                     value={invoice.paymentMode}
//                   />
  
//                   <InvoiceField
//                     label="PO/Reference No"
//                     value={invoice.poReference}
//                   />
  
//                 </div>
  
//               </div>
  
//               {/* ================= INVOICE ITEMS ================= */}
  
//               <div className="border border-gray-100 rounded-lg p-4">
  
//                 <p className="text-purple-600 font-semibold text-sm mb-4">
//                   Invoice Items
//                 </p>
  
//                 <div className="overflow-x-auto">
  
//                   <div className="min-w-[700px]">
  
//                     {/* TABLE HEADER */}
  
//                     <div className="grid grid-cols-6 text-xs font-semibold text-gray-700 pb-2 border-b border-gray-100">
  
//                       <span>#</span>
  
//                       <span className="col-span-2">
//                         Description
//                       </span>
  
//                       <span>HS Code</span>
  
//                       <span>Qty</span>
  
//                       <span>Amount</span>
  
//                     </div>
  
//                     {/* TABLE ROWS */}
  
//                     {items.length > 0 ? (
//                       items.map((item, index) => {
  
//                         const qty =
//                           item.qty ??
//                           item.quantity ??
//                           0;
  
//                         const unitPrice =
//                           item.unitPrice ??
//                           item.price ??
//                           0;
  
//                         const amount =
//                           toNumber(qty) *
//                           toNumber(unitPrice);
  
//                         return (
//                           <div
//                             key={item._id || item.id || index}
//                             className="grid grid-cols-6 items-center py-3 border-b border-gray-50 text-sm"
//                           >
  
//                             <span>
//                               {index + 1}
//                             </span>
  
//                             <span className="col-span-2 text-gray-700">
//                               {item.description || "-"}
//                             </span>
  
//                             <span className="text-gray-500 text-xs">
//                               {item.hsCode || "-"}
//                             </span>
  
//                             <span className="text-gray-500">
//                               {qty} {item.unit || ""}
//                             </span>
  
//                             <span className="text-gray-700 font-medium">
//                               ₹{formatAmount(amount)}
//                             </span>
  
//                           </div>
//                         );
//                       })
//                     ) : (
//                       <div className="py-8 text-center text-sm text-gray-400">
//                         No invoice items available
//                       </div>
//                     )}
  
//                   </div>
  
//                 </div>
  
//               </div>
  
//               {/* ================= ADDITIONAL CHARGES ================= */}
  
//               <div className="border border-gray-100 rounded-lg p-4">
  
//                 <div className="flex items-center gap-2 mb-4">
  
//                   <DollarSign className="w-4 h-4 text-purple-600" />
  
//                   <p className="text-purple-600 font-semibold text-sm">
//                     Additional Charges
//                   </p>
  
//                 </div>
  
//                 <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
  
//                   <InvoiceField
//                     label="Freight Charges"
//                     value={`₹${formatAmount(freightCharges)}`}
//                   />
  
//                   <InvoiceField
//                     label="Insurance Charges"
//                     value={`₹${formatAmount(insuranceCharges)}`}
//                   />
  
//                   <InvoiceField
//                     label="Handling Charges"
//                     value={`₹${formatAmount(handlingCharges)}`}
//                   />
  
//                   <InvoiceField
//                     label="Discount"
//                     value={`₹${formatAmount(discount)}`}
//                   />
  
//                 </div>
  
//                 <div className="mt-4">
  
//                   <InvoiceField
//                     label="Notes to Customer"
//                     value={invoice.notes}
//                   />
  
//                 </div>
  
//               </div>
  
//             </div>
  
//             {/* ================= RIGHT SUMMARY ================= */}
  
//             <div className="space-y-4">
  
//               <div className="border border-gray-100 rounded-lg p-4 sticky top-2">
  
//                 <p className="text-purple-600 font-semibold text-sm mb-4">
//                   Invoice Summary
//                 </p>
  
//                 <div className="space-y-3 text-sm">
  
//                   <SummaryRow
//                     label="Items Subtotal"
//                     value={`₹${formatAmount(subtotal)}`}
//                   />
  
//                   <SummaryRow
//                     label="Freight"
//                     value={`₹${formatAmount(freightCharges)}`}
//                   />
  
//                   <SummaryRow
//                     label="Insurance"
//                     value={`₹${formatAmount(insuranceCharges)}`}
//                   />
  
//                   <SummaryRow
//                     label="Handling"
//                     value={`₹${formatAmount(handlingCharges)}`}
//                   />
  
//                   <div className="flex justify-between">
  
//                     <span className="text-gray-500">
//                       Discount
//                     </span>
  
//                     <span className="text-red-500">
//                       - ₹{formatAmount(discount)}
//                     </span>
  
//                   </div>
  
//                   <div className="pt-3 border-t border-gray-100">
  
//                     <SummaryRow
//                       label="Taxable Amount"
//                       value={`₹${formatAmount(taxableAmount)}`}
//                     />
  
//                   </div>
  
//                   <SummaryRow
//                     label="CGST (9%)"
//                     value={`₹${formatAmount(cgst)}`}
//                   />
  
//                   <SummaryRow
//                     label="SGST (9%)"
//                     value={`₹${formatAmount(sgst)}`}
//                   />
  
//                   <div className="flex justify-between pt-4 mt-2 border-t border-gray-100">
  
//                     <span className="text-purple-600 font-bold">
//                       Total Amount
//                     </span>
  
//                     <span className="text-purple-600 font-bold text-base">
//                       ₹{formatAmount(totalAmount)}
//                     </span>
  
//                   </div>
  
//                 </div>
  
//               </div>
  
//             </div>
  
//           </div>
  
//           {/* ================= FOOTER ================= */}
  
//           <div className="flex justify-end mt-6 pt-4 border-t border-gray-100">
  
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-6 py-2.5 rounded-lg bg-gray-100 text-gray-700 text-sm font-medium hover:bg-gray-200"
//             >
//               Close
//             </button>
  
//           </div>
  
//         </div>
  
//       </div>
//     );
//   }
  
  
//   /* ================================
//      REUSABLE FIELD
//   ================================ */
  
//   function InvoiceField({ label, value }) {
//     return (
//       <div>
//         <label className="block text-xs text-gray-500 mb-1">
//           {label}
//         </label>
  
//         <div className="min-h-[38px] flex items-center px-3 py-2 rounded-lg bg-gray-50 border border-gray-100 text-sm text-gray-800">
//           {value || "-"}
//         </div>
//       </div>
//     );
//   }
  
  
//   /* ================================
//      SUMMARY ROW
//   ================================ */
  
//   function SummaryRow({ label, value }) {
//     return (
//       <div className="flex justify-between gap-4">
  
//         <span className="text-gray-500">
//           {label}
//         </span>
  
//         <span className="text-gray-900 font-medium text-right">
//           {value}
//         </span>
  
//       </div>
//     );
//   }


// mahima code //
import React from "react";
import { X, Printer, FileText, Building2, MapPin, Package, CreditCard, ReceiptText, IndianRupee } from "lucide-react";

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") return 0;
  const parsed = Number(String(value).replace(/,/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
};

const formatAmount = (value, currency = "INR") => {
  const amount = toNumber(value);
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: currency || "INR",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  } catch {
    return `${currency || "INR"} ${amount.toLocaleString("en-IN", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
};

const formatDate = (value) => {
  if (!value) return "-";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return String(value);
  return date.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const display = (...values) => {
  const value = values.find((item) => item !== undefined && item !== null && item !== "");
  if (Array.isArray(value)) return value.filter(Boolean).join(", ") || "-";
  if (typeof value === "object") return Object.values(value).filter(Boolean).join(", ") || "-";
  return value === undefined ? "-" : String(value);
};

const addressText = (value) => {
  if (!value) return "-";
  if (typeof value === "string") return value;
  return [
    value.address,
    value.addressLine1,
    value.addressLine2,
    value.city,
    value.state,
    value.postalCode,
    value.zipCode,
    value.country,
  ].filter(Boolean).join(", ") || "-";
};

const SectionTitle = ({ icon: Icon, children }) => (
  <div className="flex items-center gap-2.5 bg-[#eef3f8] border-b border-[#d8e2ec] px-4 py-3 text-[#17365d] font-semibold">
    {Icon ? <Icon className="h-5 w-5 shrink-0 text-[#17365d]" /> : null}
    <span>{children}</span>
  </div>
);

const Section = ({ icon, title, children, className = "" }) => (
  <section className={`overflow-hidden rounded-lg border border-[#cbd7e3] bg-white ${className}`}>
    <SectionTitle icon={icon}>{title}</SectionTitle>
    <div className="p-4">{children}</div>
  </section>
);

const DetailField = ({ label, value, className = "" }) => (
  <div className={`min-w-0 ${className}`}>
    <div className="text-[11px] font-semibold uppercase tracking-wide text-slate-500">{label}</div>
    <div className="mt-1 break-words text-sm font-medium leading-5 text-[#172b4d]">{display(value)}</div>
  </div>
);

const InfoCard = ({ title, icon, name, address, email, phone, extra }) => (
  <Section icon={icon} title={title} className="h-full">
    <div className="space-y-1.5">
      <div className="text-[15px] font-bold uppercase text-[#142b4e]">{display(name)}</div>
      <p className="whitespace-pre-line text-sm leading-6 text-slate-700">{addressText(address)}</p>
      {email ? <p className="break-all text-sm text-slate-600">{email}</p> : null}
      {phone ? <p className="text-sm text-slate-600">{phone}</p> : null}
      {extra ? <p className="text-sm text-slate-600">{extra}</p> : null}
    </div>
  </Section>
);

export default function ViewInvoiceModal({ invoice, onClose }) {
  if (!invoice) return null;

  const company = invoice.companyDetails || {};
  const consignee = invoice.consignee || {};
  const shipment = invoice.shipmentDetails || {};
  const bank = invoice.bankDetails || {};
  const items = Array.isArray(invoice.items) ? invoice.items : (invoice.invoiceItems || []);
  const currency = invoice.currency || "INR";
  const symbolAmount = (value) => formatAmount(value, currency);

  const calculatedSubtotal = items.reduce((sum, item) => {
    const qty = toNumber(item.qty ?? item.quantity);
    const rate = toNumber(item.unitPrice ?? item.price);
    return sum + toNumber(item.total ?? item.lineTotal ?? qty * rate);
  }, 0);
  const subtotal = toNumber(invoice.subtotal ?? calculatedSubtotal);
  const freight = toNumber(invoice.freightCharges);
  const insurance = toNumber(invoice.insuranceCharges);
  const handling = toNumber(invoice.handlingCharges);
  const discount = toNumber(invoice.discount);
  const taxable = toNumber(invoice.taxableAmount ?? Math.max(0, subtotal + freight + insurance + handling - discount));
  const cgst = toNumber(invoice.cgst);
  const sgst = toNumber(invoice.sgst);
  const igst = toNumber(invoice.igst);
  const totalTax = toNumber(invoice.totalTax ?? (cgst + sgst + igst));
  const roundOff = toNumber(invoice.roundOff);
  const total = toNumber(invoice.totalAmount ?? (taxable + totalTax + roundOff));

  const shipmentRecord = invoice.shipment || {};
  const packageLabel = [
    shipment.packages ? `${shipment.packages} PCS` : "",
    shipment.packageType,
  ].filter(Boolean).join(" - ");
  const grossWeight = shipment.grossWeight !== undefined && shipment.grossWeight !== null && shipment.grossWeight !== ""
    ? `${toNumber(shipment.grossWeight).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${shipment.grossWeightUnit || "kg"}`
    : "-";
  const chargeableWeight = shipment.chargeableWeight !== undefined && shipment.chargeableWeight !== null && shipment.chargeableWeight !== ""
    ? `${toNumber(shipment.chargeableWeight).toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${shipment.chargeableWeightUnit || "kg"}`
    : "-";

  const portLoading = display(shipment.portOfLoading, shipmentRecord.route?.originCity && shipmentRecord.route?.originCountry
    ? `${shipmentRecord.route.originCity}, ${shipmentRecord.route.originCountry}` : shipmentRecord.route?.originCity || shipmentRecord.route?.originCountry);
  const portDischarge = display(shipment.portOfDischarge, shipmentRecord.route?.destinationCity && shipmentRecord.route?.destinationCountry
    ? `${shipmentRecord.route.destinationCity}, ${shipmentRecord.route.destinationCountry}` : shipmentRecord.route?.destinationCity || shipmentRecord.route?.destinationCountry);
  const airline = typeof shipment.airline === "object"
    ? display(shipment.airline.name, shipment.airline.code)
    : display(shipment.airline, shipmentRecord.carrier?.name, shipmentRecord.carrier?.code);
  const paymentTerms = invoice.paymentTerms || shipmentRecord.paymentTerms;

  const handlePrint = () => {
    const invoiceElement = document.getElementById("customer-invoice");

    if (!invoiceElement) {
      window.print();
      return;
    }

    // Print only the invoice, not the dashboard/modal behind it.
    const printWindow = window.open("", "_blank", "width=1100,height=850");

    if (!printWindow) {
      alert("Please allow pop-ups for this site to print the invoice.");
      return;
    }

    const pageStyles = Array.from(
      document.querySelectorAll('link[rel="stylesheet"], style')
    )
      .map((element) => element.outerHTML)
      .join("\\n");

    const invoiceHtml = invoiceElement.outerHTML;

    printWindow.document.open();
    printWindow.document.write(`<!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Invoice - ${String(invoice.invoiceNumber || "Customer").replace(/[<>]/g, "")}</title>
          <base href="${window.location.origin}/" />
          ${pageStyles}
          <style>
            @page {
              size: A4 portrait;
              margin: 12mm;
            }

            html, body {
              width: 100%;
              min-height: 100%;
              margin: 0 !important;
              padding: 0 !important;
              background: #fff !important;
              color: #172b4d;
              -webkit-print-color-adjust: exact !important;
              print-color-adjust: exact !important;
            }

            body {
              font-family: Arial, Helvetica, sans-serif;
            }

            #customer-invoice {
              display: block !important;
              position: static !important;
              width: 100% !important;
              max-width: none !important;
              margin: 0 auto !important;
              padding: 0 !important;
              box-shadow: none !important;
              overflow: visible !important;
              background: #fff !important;
            }

            #customer-invoice * {
              visibility: visible !important;
              box-sizing: border-box;
            }

            #customer-invoice table {
              width: 100% !important;
              min-width: 0 !important;
              table-layout: fixed;
              border-collapse: collapse;
            }

            #customer-invoice th,
            #customer-invoice td {
              overflow-wrap: anywhere;
              word-break: normal;
            }

            #customer-invoice section,
            #customer-invoice header,
            #customer-invoice footer,
            #customer-invoice tr {
              break-inside: avoid;
              page-break-inside: avoid;
            }

            #customer-invoice img {
              max-width: 100%;
              object-fit: contain;
            }

            .no-print {
              display: none !important;
            }

            @media screen {
              body { padding: 18px !important; background: #e5e7eb !important; }
              #customer-invoice {
                max-width: 190mm !important;
                min-height: 267mm;
                padding: 10mm !important;
                box-shadow: 0 2px 14px rgba(0,0,0,.12) !important;
              }
            }
          </style>
        </head>
        <body>
          ${invoiceHtml}
          <script>
            window.addEventListener("load", async () => {
              try {
                if (document.fonts && document.fonts.ready) {
                  await document.fonts.ready;
                }
                const images = Array.from(document.images);
                await Promise.all(images.map((img) => {
                  if (img.complete) return Promise.resolve();
                  return new Promise((resolve) => {
                    img.onload = resolve;
                    img.onerror = resolve;
                  });
                }));
              } catch (error) {
                console.warn("Invoice print preparation:", error);
              }

              setTimeout(() => {
                window.focus();
                window.print();
              }, 300);
            });

            window.addEventListener("afterprint", () => {
              window.close();
            });
          </script>
        </body>
      </html>`);
    printWindow.document.close();
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-slate-950/60 p-2 backdrop-blur-sm sm:p-5">
      <div className="invoice-modal relative flex max-h-[96vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <div className="no-print flex shrink-0 items-center justify-between border-b border-slate-200 bg-white px-4 py-3 sm:px-6">
          <div>
            <h2 className="text-lg font-bold text-[#17365d]">Invoice Details</h2>
            <p className="text-xs text-slate-500">Customer invoice view</p>
          </div>
          <div className="flex items-center gap-2">
            <span className={`rounded-full px-3 py-1 text-xs font-semibold ${
              invoice.status === "Paid" ? "bg-emerald-50 text-emerald-700" :
              invoice.status === "Overdue" ? "bg-rose-50 text-rose-700" :
              "bg-amber-50 text-amber-700"
            }`}>{invoice.status || "Pending"}</span>
            <button type="button" onClick={handlePrint} className="inline-flex items-center gap-2 rounded-lg bg-[#17365d] px-3 py-2 text-sm font-semibold text-white hover:bg-[#102744]">
              <Printer className="h-4 w-4" /> Print
            </button>
            <button type="button" onClick={onClose} aria-label="Close invoice" className="rounded-lg p-2 text-slate-500 hover:bg-slate-100">
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="invoice-scroll min-h-0 overflow-y-auto bg-slate-100 p-2 sm:p-5">
          <article id="customer-invoice" className="invoice-paper mx-auto max-w-[1000px] bg-white p-4 text-[#172b4d] shadow-sm sm:p-7">
            {/* Invoice heading */}
            <header className="grid gap-5 border-b-[3px] border-[#17365d] pb-4 md:grid-cols-[1.25fr_0.9fr]">
              <div className="flex min-w-0 items-start gap-3">
                {company.logo ? (
                  <img src={company.logo} alt="Company logo" className="h-20 w-20 shrink-0 object-contain" />
                ) : (
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#eef3f8] text-[#17365d]">
                    <Building2 className="h-8 w-8" />
                  </div>
                )}
                <div className="min-w-0">
                  <h1 className="text-xl font-extrabold tracking-tight text-[#102b50] sm:text-2xl">{display(company.companyName, invoice.companyName, "ASD LOGISTICS")}</h1>
                  <p className="mt-1 whitespace-pre-line text-sm leading-5 text-slate-700">{addressText(company.address)}</p>
                  {company.email ? <p className="break-all text-sm text-slate-700">{company.email}</p> : null}
                  {company.phone ? <p className="text-sm text-slate-700">{company.phone}</p> : null}
                </div>
              </div>
              <div className="md:text-right">
                <h2 className="text-3xl font-black uppercase tracking-tight text-[#17365d] sm:text-4xl">Freight Invoice</h2>
                <div className="mt-3 grid grid-cols-[auto_10px_1fr] gap-x-2 gap-y-1 text-left text-sm md:ml-auto md:max-w-[330px]">
                  <span className="font-semibold">Invoice No.</span><span>:</span><span>{display(invoice.invoiceNumber)}</span>
                  <span className="font-semibold">Date</span><span>:</span><span>{formatDate(invoice.invoiceDate)}</span>
                  <span className="font-semibold">Due Date</span><span>:</span><span>{formatDate(invoice.dueDate)}</span>
                  <span className="font-semibold">Currency</span><span>:</span><span>{currency}{currency === "INR" ? " - Indian Rupee" : ""}</span>
                </div>
              </div>
            </header>

            {/* Bill to and consignee */}
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              <InfoCard
                title="Bill To"
                icon={Building2}
                name={invoice.billTo}
                address={invoice.address}
                email={invoice.customerEmail || invoice.userId?.email}
                phone={invoice.customerPhone || invoice.userId?.phone}
              />
              <InfoCard
                title="Consignee"
                icon={MapPin}
                name={consignee.name}
                address={consignee.address}
                email={consignee.email}
                phone={consignee.phone}
                extra={consignee.country}
              />
            </div>

            {/* Shipment details */}
            <Section icon={Package} title="Shipment Details" className="mt-4">
              <div className="grid gap-x-5 md:grid-cols-2">
                <div className="divide-y divide-slate-200">
                  <DetailField label="AWB / B.L. No." value={display(shipment.awbNumber, shipmentRecord.awbNumber, shipmentRecord.sbNumber)} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="AWB Date" value={formatDate(shipment.awbDate)} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Port of Loading" value={portLoading} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Port of Discharge" value={portDischarge} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Airline" value={airline} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                </div>
                <div className="divide-y divide-slate-200 md:border-l md:border-slate-200 md:pl-5">
                  <DetailField label="Packages" value={display(packageLabel, shipment.packages)} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Gross Weight" value={grossWeight} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Chargeable Weight" value={chargeableWeight} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Payment Terms" value={paymentTerms} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                  <DetailField label="Country of Origin" value={display(shipment.countryOfOrigin, shipmentRecord.route?.originCountry)} className="grid grid-cols-[42%_1fr] gap-2 py-2" />
                </div>
              </div>
              {(invoice.paymentMode || invoice.poReference) ? (
                <div className="mt-3 grid gap-3 border-t border-slate-200 pt-3 sm:grid-cols-2">
                  {invoice.paymentMode ? <DetailField label="Payment Mode" value={invoice.paymentMode} /> : null}
                  {invoice.poReference ? <DetailField label="PO / Reference" value={invoice.poReference} /> : null}
                </div>
              ) : null}
            </Section>

            {/* Item table */}
            <div className="mt-4 overflow-hidden rounded-lg border border-[#cbd7e3]">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-sm">
                  <thead className="bg-[#eef3f8] text-[#17365d]">
                    <tr>
                      <th className="border-b border-r border-[#d5e0eb] px-3 py-3 text-left">No.</th>
                      <th className="border-b border-r border-[#d5e0eb] px-3 py-3 text-left">Description</th>
                      <th className="border-b border-r border-[#d5e0eb] px-3 py-3 text-left">HS Code</th>
                      <th className="border-b border-r border-[#d5e0eb] px-3 py-3 text-right">Weight / Qty</th>
                      <th className="border-b border-r border-[#d5e0eb] px-3 py-3 text-right">Rate ({currency})</th>
                      <th className="border-b border-[#d5e0eb] px-3 py-3 text-right">Amount ({currency})</th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.length ? items.map((item, index) => {
                      const qty = toNumber(item.qty ?? item.quantity);
                      const rate = toNumber(item.unitPrice ?? item.price);
                      const amount = toNumber(item.total ?? item.lineTotal ?? qty * rate);
                      return (
                        <tr key={item._id || item.id || index} className="odd:bg-white even:bg-slate-50/70">
                          <td className="border-b border-r border-slate-200 px-3 py-3">{String(index + 1).padStart(2, "0")}</td>
                          <td className="border-b border-r border-slate-200 px-3 py-3 font-medium">{display(item.description)}</td>
                          <td className="border-b border-r border-slate-200 px-3 py-3">{display(item.hsCode)}</td>
                          <td className="border-b border-r border-slate-200 px-3 py-3 text-right">{display(qty)} {item.unit || ""}</td>
                          <td className="border-b border-r border-slate-200 px-3 py-3 text-right tabular-nums">{formatAmount(rate, currency)}</td>
                          <td className="border-b border-slate-200 px-3 py-3 text-right font-semibold tabular-nums">{formatAmount(amount, currency)}</td>
                        </tr>
                      );
                    }) : (
                      <tr><td colSpan={6} className="px-3 py-8 text-center text-slate-500">No invoice line items available.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Payment and totals */}
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Section icon={CreditCard} title="Payment Details">
                <div className="divide-y divide-slate-200">
                  <DetailField label="Account Name" value={bank.accountName} className="grid grid-cols-[38%_1fr] gap-2 py-2" />
                  <DetailField label="Account No." value={bank.accountNumber} className="grid grid-cols-[38%_1fr] gap-2 py-2" />
                  <DetailField label="Bank" value={bank.bankName} className="grid grid-cols-[38%_1fr] gap-2 py-2" />
                  <DetailField label="Branch" value={bank.branch} className="grid grid-cols-[38%_1fr] gap-2 py-2" />
                  <DetailField label="IFSC Code" value={bank.ifscCode} className="grid grid-cols-[38%_1fr] gap-2 py-2" />
                </div>
              </Section>

              <Section icon={ReceiptText} title="Invoice Summary">
                <div className="space-y-2.5 text-sm">
                  <SummaryRow label="Subtotal" value={symbolAmount(subtotal)} />
                  {freight !== 0 ? <SummaryRow label="Freight Charges" value={symbolAmount(freight)} /> : null}
                  {insurance !== 0 ? <SummaryRow label="Insurance Charges" value={symbolAmount(insurance)} /> : null}
                  {handling !== 0 ? <SummaryRow label="Handling Charges" value={symbolAmount(handling)} /> : null}
                  {discount !== 0 ? <SummaryRow label="Discount" value={`- ${symbolAmount(discount)}`} negative /> : null}
                  <div className="border-t border-slate-200 pt-2"><SummaryRow label="Taxable Amount" value={symbolAmount(taxable)} bold /></div>
                  {cgst !== 0 ? <SummaryRow label="CGST" value={symbolAmount(cgst)} /> : null}
                  {sgst !== 0 ? <SummaryRow label="SGST" value={symbolAmount(sgst)} /> : null}
                  {igst !== 0 ? <SummaryRow label="IGST" value={symbolAmount(igst)} /> : null}
                  {totalTax !== 0 && cgst === 0 && sgst === 0 && igst === 0 ? <SummaryRow label="Total Tax" value={symbolAmount(totalTax)} /> : null}
                  <SummaryRow label="Round Off" value={symbolAmount(roundOff)} />
                  <div className="mt-3 flex items-center justify-between gap-3 rounded-md bg-[#17365d] px-4 py-3 text-white">
                    <span className="font-bold uppercase tracking-wide">Total Amount</span>
                    <span className="text-lg font-extrabold tabular-nums">{symbolAmount(total)}</span>
                  </div>
                </div>
              </Section>
            </div>

            {/* Amount in words */}
            {invoice.amountInWords ? (
              <Section icon={IndianRupee} title="Amount in Words" className="mt-4">
                <p className="text-sm font-medium leading-6 text-[#172b4d]">{invoice.amountInWords}</p>
              </Section>
            ) : null}

            {/* Notes and declaration */}
            {(invoice.notes || invoice.declaration) ? (
              <Section icon={FileText} title="Notes & Declaration" className="mt-4">
                <div className="space-y-2 whitespace-pre-line text-sm leading-6 text-slate-700">
                  {invoice.notes ? <p>{invoice.notes}</p> : null}
                  {invoice.declaration ? <p>{invoice.declaration}</p> : null}
                </div>
              </Section>
            ) : null}

            {/* Footer */}
            <footer className="mt-5 border-t-2 border-[#17365d] pt-3 text-xs text-slate-600">
              <p className="text-center">This is a system-generated invoice and does not require a signature.</p>
              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-slate-200 pt-3">
                <div className="flex flex-wrap gap-x-5 gap-y-1">
                  {invoice.gstin ? <span><strong className="text-[#172b4d]">GSTIN:</strong> {invoice.gstin}</span> : null}
                  {invoice.pan ? <span><strong className="text-[#172b4d]">PAN:</strong> {invoice.pan}</span> : null}
                </div>
                <span>Page 1 of 1</span>
              </div>
            </footer>
          </article>
        </div>
      </div>

      <style>{`
        @media print {
          @page { size: A4; margin: 10mm; }
          html, body { background: #fff !important; }
          body * { visibility: hidden !important; }
          #customer-invoice, #customer-invoice * { visibility: visible !important; }
          #customer-invoice {
            position: absolute !important;
            inset: 0 auto auto 0 !important;
            width: 100% !important;
            max-width: none !important;
            margin: 0 !important;
            padding: 0 !important;
            box-shadow: none !important;
          }
          .no-print { display: none !important; }
          .invoice-modal { display: block !important; max-height: none !important; overflow: visible !important; box-shadow: none !important; }
          .invoice-scroll { overflow: visible !important; padding: 0 !important; background: #fff !important; }
          #customer-invoice section, #customer-invoice table, #customer-invoice footer { break-inside: avoid; }
        }
      `}</style>
    </div>
  );
}

function SummaryRow({ label, value, bold = false, negative = false }) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className={`${bold ? "font-semibold text-[#172b4d]" : "text-slate-600"}`}>{label}</span>
      <span className={`${bold ? "font-semibold" : "font-medium"} ${negative ? "text-rose-600" : "text-[#172b4d]"} text-right tabular-nums`}>{value}</span>
    </div>
  );
}