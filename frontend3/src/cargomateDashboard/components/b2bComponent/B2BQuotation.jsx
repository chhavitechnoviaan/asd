
import React, { useMemo, useState } from "react";
import {
  LuFileText,
  LuBuilding2,
  LuUser,
  LuCircleCheck,
  LuCircleX,
  LuSend,
  LuLoaderCircle,
  LuFileCheck,
  LuArrowRight,
  LuShip,
  LuCalendar,
  LuTriangleAlert,
  LuX,
} from "react-icons/lu";

export default function B2BQuotation({ shipment, quotation, onClose, onAccept, onReject }) {
  const [showRejectBox, setShowRejectBox] = useState(false);
  const [rejectReason, setRejectReason]   = useState("");
  const [loading, setLoading]             = useState(false);

  /* ── Normalize shipment and quotation payloads ── */
  const shipmentData =
    shipment?.data?.shipment ||
    shipment?.data?.shipmentData ||
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

  const quotationData =
    quotation?.data?.quotation ||
    quotation?.quotation ||
    quotation?.data ||
    quotation ||
    {};

  const pick = (...values) => {
    for (const value of values) {
      if (value !== undefined && value !== null && value !== "") {
        if (typeof value === "object" && !Array.isArray(value)) {
          const nested = value.name || value.companyName || value.contactPerson ||
            value.city || value.label || value.value || value.country;
          if (nested !== undefined && nested !== null && nested !== "") return nested;
          continue;
        }
        return value;
      }
    }
    return "";
  };

  const asText = (value) => {
    if (value === undefined || value === null || value === "") return "";
    if (typeof value === "object") {
      return pick(value.name, value.companyName, value.contactPerson, value.city, value.label, value.value, value.country);
    }
    return String(value);
  };

  const quotationId = pick(quotationData?._id, quotationData?.quotationId, quotationData?.id);
  const quotationNumber = pick(
    quotationData?.quotationNumber,
    quotationData?.quoteNumber,
    quotationData?.quotationNo,
    quotationId,
    "Quotation"
  );

  const header = shipmentData?.header || {};
  const shipmentInfo = shipmentData?.shipmentInfo || shipmentData?.shipmentInfoData || shipmentData?.shipment || {};
  const parties = shipmentData?.parties || shipmentData?.partyDetails || shipmentData?.shipmentParties || {};
  const exporter = parties?.exporter || shipmentData?.exporter || shipmentInfo?.exporter ||
    shipmentData?.customer || shipmentData?.buyer || shipmentInfo?.buyer || {};
  const route = shipmentData?.route || shipmentData?.shippingRoute ||
    shipmentInfo?.route || header?.route || shipmentData?.routeDetails || {};
  const overview = shipmentData?.overview || {};
  const activity = Array.isArray(shipmentData?.activity)
    ? shipmentData.activity
    : Array.isArray(shipmentData?.activities)
      ? shipmentData.activities
      : Array.isArray(shipmentData?.timeline) ? shipmentData.timeline : [];

  const submittedActivity = activity.find((item) =>
    ["SHIPMENT_SUBMITTED", "SUBMITTED"].includes(item?.type)
  );

  const shipmentReferenceId = pick(
    header?.shipmentId,
    shipmentData?.shipmentId,
    shipmentInfo?.shipmentId,
    shipmentData?.sbNumber,
    shipmentData?.referenceNumber,
    shipmentData?.bookingNo,
    shipmentData?.bookingNumber,
    shipmentInfo?.bookingNo,
    shipmentData?._id
  );

  const originCountry = pick(
    route?.originCountry, route?.origin?.country,
    typeof route?.origin === "string" ? route.origin : "",
    shipmentData?.originCountry, shipmentInfo?.originCountry
  );
  const destinationCountry = pick(
    route?.destinationCountry, route?.destination?.country,
    typeof route?.destination === "string" ? route.destination : "",
    shipmentData?.destinationCountry, shipmentInfo?.destinationCountry
  );
  const portOfLoading = pick(
    route?.portOfLoading, route?.loadingPort, route?.originPort,
    shipmentData?.portOfLoading, shipmentInfo?.portOfLoading,
    [route?.originCity, route?.originCountry].filter(Boolean).join(", "),
    route?.origin?.city ? [route.origin.city, route.origin.country].filter(Boolean).join(", ") : ""
  );
  const portOfDischarge = pick(
    route?.portOfDischarge, route?.dischargePort, route?.destinationPort,
    shipmentData?.portOfDischarge, shipmentInfo?.portOfDischarge,
    [route?.destinationCity, route?.destinationCountry].filter(Boolean).join(", "),
    route?.destination?.city ? [route.destination.city, route.destination.country].filter(Boolean).join(", ") : ""
  );

  const shipmentType = pick(shipmentInfo?.shipmentType, shipmentInfo?.type, shipmentData?.shipmentType, shipmentData?.type, header?.shipmentType);
  const shipmentMode = pick(shipmentInfo?.shipmentMode, shipmentInfo?.mode, shipmentData?.shipmentMode, shipmentData?.mode, route?.mode, header?.mode);
  const incoterm = pick(shipmentInfo?.incoterm, shipmentData?.incoterm, shipmentData?.shipmentTerms?.incoterm, header?.incoterm);

  const submittedDate = pick(
    submittedActivity?.createdAt,
    overview?.createdOn,
    shipmentData?.submittedAt,
    shipmentData?.shipmentDate,
    shipmentData?.createdAt
  );

  const rawCharges = quotationData?.charges || quotationData?.chargeDetails || quotationData?.pricing?.charges || [];
  const charges = Array.isArray(rawCharges) ? rawCharges : [];

  const subtotal = useMemo(() => {
    if (quotationData?.subtotal !== undefined && quotationData?.subtotal !== null) {
      return Number(quotationData.subtotal || 0);
    }
    return charges.reduce((total, item) =>
      total + Number(item?.amount ?? item?.price ?? item?.value ?? 0), 0
    );
  }, [quotationData, charges]);

  const discount = Number(quotationData?.discount || 0);
  const tax = Number(quotationData?.tax || 0);
  const totalAmount = quotationData?.totalAmount !== undefined && quotationData?.totalAmount !== null
    ? Number(quotationData.totalAmount || 0)
    : subtotal - discount + tax;
  const currency = quotationData?.currency || "INR";

  const formatCurrency = (amount) => {
    const safeCurrency = /^[A-Z]{3}$/.test(currency) ? currency : "INR";
    try {
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency: safeCurrency,
        maximumFractionDigits: 2,
      }).format(Number(amount || 0));
    } catch {
      return `${currency} ${Number(amount || 0).toLocaleString("en-IN")}`;
    }
  };

  const formatDate = (date) => {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return asText(date);
    return parsed.toLocaleDateString("en-IN", {
      day: "2-digit", month: "short", year: "numeric",
    });
  };

  const handleAccept = async () => {
    try {
      setLoading(true);
      if (onAccept) await onAccept();
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to accept quotation");
    } finally { setLoading(false); }
  };

  const handleReject = async () => {
    if (!rejectReason.trim()) { alert("Please enter rejection reason"); return; }
    try {
      setLoading(true);
      if (onReject) await onReject(rejectReason.trim());
    } catch (err) {
      alert(err?.response?.data?.message || "Failed to reject quotation");
    } finally { setLoading(false); }
  };

  const status = quotationData?.status || "Shared";
  const statusConfig = {
    Accepted: { cls:"bg-emerald-50 text-emerald-700 border-emerald-200", dot:"bg-emerald-500" },
    Rejected: { cls:"bg-rose-50 text-rose-700 border-rose-200",         dot:"bg-rose-500" },
    Shared:   { cls:"bg-purple-50 text-purple-700 border-purple-200",   dot:"bg-purple-500" },
  };
  const { cls: statusCls = "bg-slate-100 text-slate-600 border-slate-200",
          dot: statusDot = "bg-slate-400" } = statusConfig[status] || {};

  return (
    <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-3 sm:p-5"
      style={{ fontFamily:"'Poppins', sans-serif" }}>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap" rel="stylesheet" />

      <div className="w-full max-w-6xl h-[92vh] bg-white rounded-3xl shadow-[0_32px_80px_rgba(0,0,0,0.22)] border border-slate-200/80 flex flex-col overflow-hidden">

        {/* ══ HEADER ══ */}
        <div className="shrink-0 flex items-center justify-between px-6 sm:px-8 py-4 border-b border-slate-200 bg-white">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/25">
              <LuFileText size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-base font-extrabold text-slate-900 tracking-tight leading-none">
                Freight Quotation
              </h1>
              <p className="text-[11px] text-slate-400 font-medium mt-0.5">{quotationNumber}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full border ${statusCls}`}>
              <span className={`w-1.5 h-1.5 rounded-full ${statusDot}`} />
              {status}
            </span>
            <button onClick={onClose}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 hover:text-slate-800 transition">
              <LuX size={16} />
            </button>
          </div>
        </div>

        {/* ══ BODY ══ */}
        <div className="flex-1 overflow-y-auto px-6 sm:px-8 py-5 space-y-4 bg-slate-50/30">

          {/* ── Hero Summary Card ── */}
          <div className="bg-gradient-to-r from-blue-700 to-indigo-600 rounded-2xl p-5 sm:p-6 text-white shadow-lg shadow-blue-500/20">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 items-center">
              <div>
                <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wider">Quotation No.</p>
                <p className="text-white font-black text-sm mt-1 tracking-tight">{quotationNumber}</p>
                <p className="text-blue-200 text-[10px] mt-1.5">
                  Issued: {formatDate(quotationData?.sharedAt || quotationData?.createdAt)}
                </p>
              </div>
              <div className="text-center">
                <p className="text-blue-200 text-[11px] font-semibold uppercase tracking-wider mb-1">Total Amount</p>
                <p className="text-3xl font-black tracking-tight text-white">{formatCurrency(totalAmount)}</p>
                <p className="text-blue-200 text-[10px] mt-1">{currency} • Inclusive of all charges</p>
              </div>
              <div className="sm:text-right">
                <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/20 rounded-xl px-3 py-2">
                  <LuCalendar size={13} className="text-blue-200" />
                  <div>
                    <p className="text-blue-200 text-[10px] font-medium">Valid Until</p>
                    <p className="text-white font-bold text-xs">{formatDate(quotationData?.validUntil)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── From / To ── */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* From */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <LuBuilding2 size={14} />
                </div>
                <span className="text-[10px] font-black text-blue-700 uppercase tracking-widest">From (Freight Agent)</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 mb-0.5">ASD Company</p>
              <p className="text-xs text-slate-400 font-medium">Admin / Company Details</p>
              <div className="mt-3 pt-3 border-t border-slate-100">
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  ✓ Verified Partner
                </span>
              </div>
            </div>

            {/* To */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2 mb-3.5">
                <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                  <LuUser size={14} />
                </div>
                <span className="text-[10px] font-black text-indigo-700 uppercase tracking-widest">To (Exporter)</span>
              </div>
              <p className="text-sm font-extrabold text-slate-900 mb-1">
                {pick(exporter?.companyName, exporter?.name, exporter?.contactPerson, exporter?.businessName) || "Exporter"}
              </p>
              <div className="space-y-0.5">
                {exporter?.contactPerson && <p className="text-xs text-slate-500 font-medium">👤 {exporter.contactPerson}</p>}
                {exporter?.email  && <p className="text-xs text-slate-500">✉️ {exporter.email}</p>}
                {exporter?.mobile && <p className="text-xs text-slate-500">📱 {exporter.mobile}</p>}
              </div>
            </div>
          </div>

          {/* ── Shipment Details ── */}
          <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
            <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-teal-50 text-teal-600 flex items-center justify-center">
                <LuShip size={14} />
              </div>
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Shipment Details</h3>
              {(originCountry || destinationCountry) && (
                <div className="ml-auto flex items-center gap-1.5 text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200/70 px-3 py-1 rounded-full">
                  <span>{originCountry || "Origin"}</span>
                  <LuArrowRight size={11} />
                  <span>{destinationCountry || "Dest."}</span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                ["Shipment Route", [originCountry, destinationCountry].filter(Boolean).join(" → ")],
                ["Shipment Type", shipmentType],
                ["Shipment Mode", shipmentMode],
                ["Port of Loading", portOfLoading],
                ["Port of Discharge", portOfDischarge],
                ["Incoterm", incoterm],
                ["Submitted On", formatDate(submittedDate)],
                ["Reference ID", shipmentReferenceId],
              ].filter(([, value]) => value !== undefined && value !== null && value !== "").map(([label, value]) => (
                <div key={label} className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
                  <p className="text-xs font-bold text-slate-900 leading-tight">{asText(value)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ── Charges Table + Summary ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

            {/* Charges Table */}
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 shadow-[0_2px_6px_rgba(0,0,0,0.02)] overflow-hidden">
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Charges Breakdown</h3>
                <span className="text-[11px] font-bold text-blue-600 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200/70">
                  {charges.length} Items
                </span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs border-collapse min-w-[500px]">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-200/80 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                      <th className="py-3 px-4 w-10">#</th>
                      <th className="py-3 px-4">Charge Name</th>
                      <th className="py-3 px-4">Description</th>
                      <th className="py-3 px-4 text-right">Amount ({currency})</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {charges.length > 0 ? charges.map((charge, idx) => (
                      <tr key={charge?._id || idx} className="hover:bg-slate-50/60 transition-colors">
                        <td className="py-3 px-4 font-bold text-slate-400">
                          {String(idx+1).padStart(2,"0")}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-800">
                          {pick(charge?.name, charge?.chargeName, charge?.title, charge?.description) || "-"}
                        </td>
                        <td className="py-3 px-4 text-slate-500 whitespace-pre-line">
                          {pick(charge?.description, charge?.details, charge?.remark, charge?.notes) || "-"}
                        </td>
                        <td className="py-3 px-4 text-right font-extrabold text-slate-900">
                          {formatCurrency(charge?.amount || charge?.price || charge?.value || 0)}
                        </td>
                      </tr>
                    )) : (
                      <tr>
                        <td colSpan={4} className="py-10 text-center text-slate-400 text-xs">
                          No charges available for this quotation.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between px-5 py-3.5 border-t border-slate-100 bg-blue-600">
                <p className="text-white font-bold text-xs uppercase tracking-wider">Total {currency}</p>
                <p className="text-white font-black text-sm">{formatCurrency(totalAmount)}</p>
              </div>
            </div>

            {/* Summary Card */}
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)] h-fit">
              <h3 className="text-sm font-extrabold text-slate-900 tracking-tight mb-4 pb-3 border-b border-slate-100">
                Price Summary
              </h3>
              <div className="space-y-3 text-xs">
                {[
                  ["Sub Total",    formatCurrency(subtotal),  false],
                  ["Discount",    `-${formatCurrency(discount)}`, "discount"],
                  ["Tax / GST",    formatCurrency(tax),       false],
                ].map(([label, val, type]) => (
                  <div key={label} className="flex justify-between items-center pb-3 border-b border-slate-50">
                    <span className="text-slate-500 font-medium">{label}</span>
                    <span className={`font-bold ${type === "discount" ? "text-emerald-600" : "text-slate-800"}`}>
                      {val}
                    </span>
                  </div>
                ))}
                {/* Total */}
                <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-blue-600 mt-2">
                  <span className="text-white font-extrabold text-xs uppercase tracking-wider">Total</span>
                  <span className="text-white font-black text-sm">{formatCurrency(totalAmount)}</span>
                </div>
              </div>

              {/* Quote meta */}
              <div className="mt-4 space-y-2">
                {[
                  ["Version",     quotationData?.quoteVersion || "-"],
                  ["Freight Amt", formatCurrency(quotationData?.freightQuote)],
                  ["Valid From",  formatDate(quotationData?.validFrom)],
                  ["Valid Until", formatDate(quotationData?.validUntil)],
                ].map(([label, val]) => (
                  <div key={label} className="flex justify-between text-[11px]">
                    <span className="text-slate-400 font-medium">{label}</span>
                    <span className="font-bold text-slate-700">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Notes ── */}
          {quotationData?.notes && (
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-[10px] font-black text-amber-700 uppercase tracking-widest">📝 Notes</span>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-line font-medium">
                {quotationData.notes}
              </p>
            </div>
          )}

          {/* ── Terms & Conditions ── */}
          {quotationData?.termsAndConditions && (
            <div className="bg-white rounded-2xl border border-slate-200/80 p-5 shadow-[0_2px_6px_rgba(0,0,0,0.02)]">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-7 h-7 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center">
                  <LuFileCheck size={14} />
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 tracking-tight">Terms & Conditions</h3>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed whitespace-pre-line font-medium">
                {quotationData.termsAndConditions}
              </p>
            </div>
          )}

          {/* ── Previously Submitted Rejection Reason ── */}
          {status === "Rejected" && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
              <div className="flex items-start gap-3">
                <div className="w-9 h-9 shrink-0 rounded-xl bg-rose-100 text-rose-600 flex items-center justify-center">
                  <LuCircleX size={18} />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-extrabold text-rose-800">
                    You rejected this quotation
                  </h3>
                  <p className="text-xs text-rose-700 mt-1">
                    Your rejection has been submitted successfully.
                  </p>
                  <div className="mt-3 rounded-xl border border-rose-200 bg-white/80 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-rose-500 mb-1.5">
                      Your rejection reason
                    </p>
                    <p className="text-xs leading-relaxed text-slate-700 whitespace-pre-line">
                      {asText(quotationData?.rejectionReason) || "No rejection reason was recorded."}
                    </p>
                  </div>
                  {quotationData?.rejectedAt && (
                    <p className="text-[10px] text-rose-600 mt-2">
                      Rejected on: {formatDate(quotationData.rejectedAt)}
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* ── Reject Reason Box ── */}
          {showRejectBox && (
            <div className="bg-rose-50 border border-rose-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
              <LuTriangleAlert size={16} className="text-rose-600" />
                <p className="text-sm font-extrabold text-rose-700">Reason for Denying Quotation</p>
              </div>
              <textarea
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
                rows={3}
                placeholder="Please describe why you are rejecting this quotation..."
                className="w-full border border-rose-200 bg-white rounded-xl px-4 py-3 text-xs font-medium text-slate-800 placeholder-slate-400 outline-none focus:border-rose-400 focus:ring-4 focus:ring-rose-500/10 resize-none transition"
              />
            </div>
          )}
        </div>

        {/* ══ STICKY FOOTER ══ */}
        <div className="shrink-0 border-t border-slate-200 bg-white/95 backdrop-blur-sm px-6 sm:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3">

            {/* Back */}
            <button onClick={onClose} disabled={loading}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-2xs">
              <LuArrowRight size={14} className="rotate-180" />
              Back to Shipments
            </button>

            {/* Actions */}
            <div className="flex w-full sm:w-auto gap-2.5">

              {/* SHARED → Accept / Reject */}
              {status === "Shared" && (
                <>
                  {!showRejectBox ? (
                    <button onClick={handleAccept} disabled={loading}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition shadow-sm shadow-blue-500/25 disabled:opacity-60">
                      {loading
                        ? <><LuLoaderCircle className="animate-spin" size={14} /> Processing…</>
                        : <><LuCircleCheck size={14} /> Accept Quotation</>}
                    </button>
                  ) : (
                    <button onClick={handleReject} disabled={loading}
                      className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition shadow-sm shadow-rose-500/25 disabled:opacity-60">
                      {loading
                        ? <><LuLoaderCircle className="animate-spin" size={14} /> Submitting…</>
                        : <><LuSend size={14} /> Submit Denial</>}
                    </button>
                  )}

                  <button
                    onClick={() => { setShowRejectBox(v => !v); setRejectReason(""); }}
                    disabled={loading}
                    className={`flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs font-bold transition disabled:opacity-60 ${
                      showRejectBox
                        ? "border border-slate-200 text-slate-600 hover:bg-slate-50"
                        : "bg-rose-500 hover:bg-rose-600 text-white shadow-sm shadow-rose-500/25"
                    }`}
                  >
                    <LuCircleX size={14} />
                    {showRejectBox ? "Cancel" : "Deny Quotation"}
                  </button>
                </>
              )}

              {/* Accepted */}
              {status === "Accepted" && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-extrabold">
                  <LuCircleCheck size={15} /> Quotation Accepted
                </div>
              )}

              {/* Rejected */}
              {status === "Rejected" && (
                <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-rose-50 text-rose-700 border border-rose-200 rounded-xl text-xs font-extrabold">
                  <LuCircleX size={15} /> You Rejected This Quotation
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Sub-components ─── */
function DetailItem({ label, value }) {
  return (
    <div className="bg-slate-50/70 rounded-xl p-3 border border-slate-100">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">{label}</p>
      <p className="text-xs font-bold text-slate-900">{value || "-"}</p>
    </div>
  );
}

function InfoCard({ label, value }) {
  return (
    <div className="bg-white border border-slate-200/80 rounded-xl p-4">
      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1.5">{label}</p>
      <p className="text-sm font-bold text-slate-900">{value || "-"}</p>
    </div>
  );
}