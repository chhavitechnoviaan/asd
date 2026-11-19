import React, { useMemo, useState } from "react";
import {
  LuFileText,
  LuMapPin,
  LuUser,
  LuBuilding2,
  LuFileCheck,
  LuPlus,
  LuTrash2,
  LuSend,
  LuSave,
  LuLoaderCircle,
} from "react-icons/lu";

import {
  createQuotation,
  shareQuotation,
} from "../../api/quotation";

export default function CreateQuotation({
  shipment,
  onClose,
  onSuccess,
  isNormalUserShipment = false,
}) {
  const [loading, setLoading] = useState(false);
  const [sharing, setSharing] = useState(false);
  const [createdQuotation, setCreatedQuotation] =
    useState(null);

  // ==========================================
  // NORMALIZE SHIPMENT DATA
  // API RESPONSE STRUCTURE:
  // {
  //   status: 1,
  //   message: "...",
  //   data: {
  //      header,
  //      route,
  //      shipmentInfo,
  //      overview,
  //      parties,
  //      activity
  //   }
  // }
  // ==========================================

  const shipmentData =
    shipment?.data ||
    shipment?.shipment ||
    shipment?.shipmentData ||
    shipment ||
    {};

    console.log("CREATE QUOTATION RECEIVED SHIPMENT:", shipment);
console.log("CREATE QUOTATION NORMALIZED SHIPMENT:", shipmentData);


  // Original MongoDB shipment ID
  // Parent component se aa sakta hai
  const shipmentMongoId =
  shipmentData?._id ||
  shipmentData?.mongoId ||
  shipmentData?.header?.mongoId ||
  shipmentData?.header?._id ||
  shipmentData?.shipmentInfo?.mongoId ||
  shipmentData?.shipmentInfo?._id ||
  shipment?._id ||
  shipment?.data?._id ||
  shipment?.data?.mongoId ||
  null;

console.log("FINAL SHIPMENT MONGODB ID:", shipmentMongoId);
const getValue = (...values) => {
  return (
    values.find(
      (value) =>
        value !== undefined &&
        value !== null &&
        value !== ""
    ) || "-"
  );
};

const formatDate = (date) => {
  if (!date) return "-";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "-";
  }

  return parsedDate.toLocaleDateString("en-IN");
};

  // Main shipment reference number
  const shipmentReferenceId = getValue(
    shipmentData?.header?.shipmentId,
    shipmentData?.shipmentId,
    shipmentData?.shipmentInfo?.shipmentId,
    shipmentData?.sbNumber,
    shipmentData?.bookingNumber,
    shipmentData?.referenceNumber,
    shipment?.shipmentId,
    shipment?._id
  );

  // ==========================================
  // FORM DATA
  // ==========================================

  const [formData, setFormData] = useState({
    quotationNumber: "",
    quoteVersion: "V.1",

    currency: "INR",

    validFrom: new Date()
      .toISOString()
      .split("T")[0],

    validUntil: "",

    freightQuote: "",

    discount: 0,
    tax: 0,

    notes: "",

    termsAndConditions: `This quotation is valid till the date mentioned above.
Freight is subject to change in case of fuel surcharge variation.
Booking is subject to space availability at the time of confirmation.
All disputes are subject to applicable jurisdiction.`,

    charges: [
      {
        name: "",
        description: "",
        amount: "",
      },
    ],
  });

  // ==========================================
// HELPERS
// ==========================================



  // ==========================================
  // CALCULATIONS
  // ==========================================

  const subtotal = useMemo(() => {
    return formData.charges.reduce(
      (total, item) =>
        total + Number(item.amount || 0),
      0
    );
  }, [formData.charges]);

  const totalAmount = useMemo(() => {
    return (
      subtotal -
      Number(formData.discount || 0) +
      Number(formData.tax || 0)
    );
  }, [
    subtotal,
    formData.discount,
    formData.tax,
  ]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: formData.currency || "INR",
      maximumFractionDigits: 2,
    }).format(Number(amount || 0));
  };

  // ==========================================
  // NORMAL INPUT CHANGE
  // ==========================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // ==========================================
  // CHARGE CHANGE
  // ==========================================

  const handleChargeChange = (
    index,
    field,
    value
  ) => {
    setFormData((prev) => {
      const updatedCharges = [
        ...prev.charges,
      ];

      updatedCharges[index] = {
        ...updatedCharges[index],
        [field]: value,
      };

      return {
        ...prev,
        charges: updatedCharges,
      };
    });
  };

  // ==========================================
  // ADD CHARGE
  // ==========================================

  const addCharge = () => {
    setFormData((prev) => ({
      ...prev,
      charges: [
        ...prev.charges,
        {
          name: "",
          description: "",
          amount: "",
        },
      ],
    }));
  };

  // ==========================================
  // REMOVE CHARGE
  // ==========================================

  const removeCharge = (index) => {
    setFormData((prev) => ({
      ...prev,
      charges: prev.charges.filter(
        (_, i) => i !== index
      ),
    }));
  };

  // ==========================================
  // CREATE QUOTATION
  // ==========================================

  const handleCreateQuotation = async () => {
    // ============================
    // VALIDATE SHIPMENT ID
    // ============================
  
    if (!shipmentMongoId) {
      console.error("SHIPMENT ID NOT FOUND");
      console.log("FULL SHIPMENT OBJECT:", shipment);
      console.log("NORMALIZED SHIPMENT DATA:", shipmentData);
  
      alert(
        "Shipment MongoDB ID not found. Please check shipment data."
      );
  
      return;
    }
  
    // ============================
    // VALIDATE VALID UNTIL
    // ============================
  
    if (!formData.validUntil) {
      alert("Please select valid until date");
      return;
    }
  
    // ============================
    // FILTER VALID CHARGES
    // ============================
  
    const validCharges = formData.charges.filter(
      (item) =>
        item.name?.trim() &&
        item.amount !== "" &&
        Number(item.amount) >= 0
    );
  
    if (!validCharges.length) {
      alert("Please add at least one valid charge");
      return;
    }
  
    try {
      setLoading(true);
  
      const payload = {
        shipmentId: shipmentMongoId,
  
        quotationNumber:
          formData.quotationNumber?.trim() || undefined,
  
        quoteVersion:
          formData.quoteVersion || "V.1",
  
        validFrom:
          formData.validFrom,
  
        validUntil:
          formData.validUntil,
  
        freightQuote:
          Number(formData.freightQuote || 0),
  
        currency:
          formData.currency || "INR",
  
        charges: validCharges.map((item) => ({
          name: item.name.trim(),
  
          description:
            item.description?.trim() || "",
  
          amount:
            Number(item.amount || 0),
  
          currency:
            formData.currency || "INR",
        })),
  
        discount:
          Number(formData.discount || 0),
  
        tax:
          Number(formData.tax || 0),
  
        notes:
          formData.notes?.trim() || "",
  
        termsAndConditions:
          formData.termsAndConditions?.trim() || "",
      };
  
      console.log(
        "FINAL CREATE QUOTATION PAYLOAD:",
        payload
      );
  
      console.log(
        "SHIPMENT ID BEING SENT:",
        shipmentMongoId
      );
  
      const response =
        await createQuotation(payload);


  
      console.log(
        "CREATE QUOTATION RESPONSE:",
        response.data
      );
  
      const quotation =
        response.data?.data ||
        response.data?.quotation ||
        response.data;
  
      setCreatedQuotation(quotation);
  
      alert("Quotation created successfully");
  
      if (onSuccess) {
        onSuccess(quotation);
      }
  
    } catch (error) {
      console.error(
        "CREATE QUOTATION ERROR:",
        error
      );
  
      console.error(
        "BACKEND ERROR:",
        error?.response?.data
      );
  
      alert(
        error?.response?.data?.message ||
        "Failed to create quotation"
      );
  
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // SHARE QUOTATION
  // ==========================================

  const handleShareQuotation = async () => {
    if (!shipmentMongoId) {
      alert("Shipment ID not found");
      return;
    }
  
    if (!formData.validUntil) {
      alert("Please select valid until date");
      return;
    }
  
    const validCharges = formData.charges.filter(
      (item) =>
        item.name?.trim() &&
        item.amount !== "" &&
        Number(item.amount) >= 0
    );
  
    if (!validCharges.length) {
      alert("Please add at least one valid charge");
      return;
    }
  
    try {
      setSharing(true);
  
      // 1. CREATE QUOTATION
      const payload = {
        shipmentId: shipmentMongoId,
  
        quotationNumber:
          formData.quotationNumber?.trim() || undefined,
  
        quoteVersion:
          formData.quoteVersion || "V.1",
  
        validFrom: formData.validFrom,
  
        validUntil: formData.validUntil,
  
        freightQuote:
          Number(formData.freightQuote || 0),
  
        currency:
          formData.currency || "INR",
  
        charges: validCharges.map((item) => ({
          name: item.name.trim(),
  
          description:
            item.description?.trim() || "",
  
          amount:
            Number(item.amount || 0),
  
          currency:
            formData.currency || "INR",
        })),
  
        discount:
          Number(formData.discount || 0),
  
        tax:
          Number(formData.tax || 0),
  
        notes:
          formData.notes?.trim() || "",
  
        termsAndConditions:
          formData.termsAndConditions?.trim() || "",
      };
  
      console.log(
        "CREATE + SHARE PAYLOAD:",
        payload
      );
  
      const createResponse =
        await createQuotation(payload);
  
      console.log(
        "CREATE RESPONSE:",
        createResponse.data
      );
  
      const quotation =
        createResponse.data?.data ||
        createResponse.data?.quotation ||
        createResponse.data;
  
      const quotationId =
        quotation?._id ||
        quotation?.id;
  
      if (!quotationId) {
        throw new Error(
          "Quotation created but quotation ID not found"
        );
      }
  
      console.log(
        "CREATED QUOTATION ID:",
        quotationId
      );
  
      // 2. SHARE QUOTATION
      const shareResponse =
        await shareQuotation(quotationId);
  
      console.log(
        "SHARE RESPONSE:",
        shareResponse.data
      );
  
      const sharedQuotation =
        shareResponse.data?.data ||
        shareResponse.data?.quotation ||
        shareResponse.data;
  
      alert(
        "Quotation shared successfully with B2B"
      );
  
      if (onSuccess) {
        onSuccess(sharedQuotation);
      }
  
      // 3. CLOSE POPUP
      onClose();
  
    } catch (error) {
      console.error(
        "CREATE + SHARE ERROR:",
        error
      );
  
      console.error(
        "BACKEND ERROR:",
        error?.response?.data
      );
  
      alert(
        error?.response?.data?.message ||
        error?.message ||
        "Failed to share quotation"
      );
    } finally {
      setSharing(false);
    }
  };

  // ==========================================
  // HELPER VALUES
  // ==========================================

// ==========================================
// NORMALIZED SHIPMENT VALUES
// ==========================================

const header =
  shipmentData?.header ||
  shipment?.header ||
  {};

const shipmentInfo =
  shipmentData?.shipmentInfo ||
  shipmentData?.shipment ||
  shipmentData ||
  {};

const overview =
  shipmentData?.overview ||
  {};

const parties =
  shipmentData?.parties ||
  shipmentData?.partyDetails ||
  shipmentData?.shipmentParties ||
  {};

const route =
  shipmentData?.route ||
  shipmentData?.shippingRoute ||
  shipmentData?.shipmentInfo?.route ||
  header?.route ||
  shipmentData?.routeDetails ||
  {};

const activity =
  shipmentData?.activity ||
  shipmentData?.activities ||
  shipmentData?.timeline ||
  [];

// ==========================================
// EXPORTER / CUSTOMER
// ==========================================

const exporter =
  parties?.exporter ||
  shipmentData?.exporter ||
  shipmentInfo?.exporter ||
  {};

const importer =
  parties?.importer ||
  shipmentData?.importer ||
  shipmentInfo?.importer ||
  {};

// ==========================================
// ROUTE VALUES
// ==========================================

const originCountry = getValue(
  route?.originCountry,
  route?.origin?.country,
  route?.origin,
  shipmentData?.originCountry,
  shipmentInfo?.originCountry
);

const destinationCountry = getValue(
  route?.destinationCountry,
  route?.destination?.country,
  route?.destination,
  shipmentData?.destinationCountry,
  shipmentInfo?.destinationCountry
);

// Origin / destination can be stored either as strings or as objects
// (for example: { city, country } or { name, label }).
const getLocationLabel = (...values) => {
  for (const value of values) {
    if (value === undefined || value === null || value === "") continue;

    if (typeof value === "object") {
      const city = value.city || value.port || value.name || value.label || value.value || "";
      const country = value.country || "";
      const label = [city, country].filter(Boolean).join(", ");
      if (label) return label;
      continue;
    }

    return String(value);
  }

  return "-";
};

// The shipment form stores the route in origin/destination fields.
// Prefer explicit port fields when available; otherwise use origin/destination.
const portOfLoading = getLocationLabel(
  route?.portOfLoading,
  route?.loadingPort,
  route?.originCity,
  route?.origin?.city,
  route?.origin?.name,
  route?.origin,
  shipmentData?.portOfLoading,
  shipmentInfo?.portOfLoading,
  shipmentData?.originCity,
  shipmentInfo?.originCity,
  shipmentData?.origin
);

const portOfDischarge = getLocationLabel(
  route?.portOfDischarge,
  route?.dischargePort,
  route?.destinationCity,
  route?.destination?.city,
  route?.destination?.name,
  route?.destination,
  shipmentData?.portOfDischarge,
  shipmentInfo?.portOfDischarge,
  shipmentData?.destinationCity,
  shipmentInfo?.destinationCity,
  shipmentData?.destination
);

// ==========================================
// SHIPMENT VALUES
// ==========================================

const shipmentType = getValue(
  shipmentInfo?.shipmentType,
  shipmentInfo?.type,
  shipmentData?.shipmentType,
  shipmentData?.type,
  header?.shipmentType
);

const shipmentMode = getValue(
  shipmentInfo?.mode,
  shipmentInfo?.shipmentMode,
  shipmentData?.mode,
  shipmentData?.shipmentMode,
  header?.mode
);

const incoterm = getValue(
  shipmentInfo?.incoterm,
  shipmentData?.incoterm,
  shipmentData?.shipmentTerms?.incoterm,
  header?.incoterm
);

// ==========================================
// ACTIVITY
// ==========================================

const submittedActivity = Array.isArray(activity)
  ? activity.find(
      (item) =>
        item.type === "SHIPMENT_SUBMITTED" ||
        item.type === "SUBMITTED"
    )
  : null;

const approvedActivity = Array.isArray(activity)
  ? activity.find(
      (item) =>
        item.type === "SHIPMENT_APPROVED" ||
        item.type === "APPROVED"
    )
  : null;

// ==========================================
// DATES
// ==========================================

const submittedDate = getValue(
  submittedActivity?.createdAt
    ? formatDate(submittedActivity.createdAt)
    : null,

  overview?.createdOn
    ? formatDate(overview.createdOn)
    : null,

  shipmentData?.submittedAt
    ? formatDate(shipmentData.submittedAt)
    : null,

  shipmentData?.createdAt
    ? formatDate(shipmentData.createdAt)
    : null
);

const approvedDate = getValue(
  approvedActivity?.createdAt
    ? formatDate(approvedActivity.createdAt)
    : null,

  overview?.approvedAt
    ? formatDate(overview.approvedAt)
    : null,

  shipmentData?.approvedAt
    ? formatDate(shipmentData.approvedAt)
    : null
);

 

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-950/65 backdrop-blur-md p-0 sm:p-4">
      <div className="relative flex max-h-[100dvh] w-full max-w-7xl flex-col overflow-hidden bg-[#f7f9fc] shadow-2xl sm:max-h-[94vh] sm:rounded-[28px] sm:border sm:border-white/50">
        {/* Premium header */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-r from-[#102b46] via-[#173e60] to-[#245a78] px-5 py-5 text-white sm:px-8">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/[0.06]" />
          <div className="pointer-events-none absolute right-40 -top-28 h-56 w-56 rounded-full bg-cyan-300/[0.08] blur-3xl" />
          <div className="relative flex items-start justify-between gap-4">
            <div className="flex min-w-0 items-start gap-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                <LuFileText size={23} />
              </div>
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">Create Quotation</h1>
                  <span className={`rounded-full border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] ${
                    createdQuotation?.status === "Shared"
                      ? "border-emerald-300/30 bg-emerald-300/15 text-emerald-100"
                      : "border-white/20 bg-white/10 text-slate-100"
                  }`}>
                    {createdQuotation?.status || "New quotation"}
                  </span>
                </div>
                <p className="mt-1 text-xs text-blue-100/80 sm:text-sm">
                  Prepare freight charges, review shipment information and share with your B2B customer.
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-blue-100/75">
                  <span className="inline-flex items-center gap-1.5"><LuFileText size={13} /> Quote {formData.quoteVersion || "V.1"}</span>
                  <span className="inline-flex items-center gap-1.5"><LuMapPin size={13} /> Shipment {shipmentReferenceId}</span>
                </div>
              </div>
            </div>
            <button type="button" onClick={onClose} aria-label="Close quotation"
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white">
              <span className="text-xl leading-none">×</span>
            </button>
          </div>
        </div>

        {/* Scrollable form */}
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-7 sm:py-6">
          <div className="mx-auto max-w-6xl space-y-5">
            {/* Quotation details */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-700"><LuFileText size={17} /></div>
                <div>
                  <h2 className="text-sm font-semibold text-slate-900">Quotation details</h2>
                  <p className="mt-0.5 text-[11px] text-slate-500">Set the quote reference, currency and validity period.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
                <FormField label="Quotation number" hint="Leave blank to auto-generate">
                  <input type="text" name="quotationNumber" value={formData.quotationNumber} onChange={handleChange} placeholder="Auto generated" className={fieldClass} />
                </FormField>
                <FormField label="Quote version">
                  <input type="text" name="quoteVersion" value={formData.quoteVersion} onChange={handleChange} placeholder="V.1" className={fieldClass} />
                </FormField>
                <FormField label="Currency">
                  <select name="currency" value={formData.currency} onChange={handleChange} className={fieldClass}>
                    <option value="INR">INR — Indian Rupee</option>
                    <option value="USD">USD — US Dollar</option>
                    <option value="EUR">EUR — Euro</option>
                    <option value="GBP">GBP — Pound Sterling</option>
                  </select>
                </FormField>
                <FormField label="Freight quote">
                  <input type="number" min="0" name="freightQuote" value={formData.freightQuote} onChange={handleChange} placeholder="Enter freight quote" className={fieldClass} />
                </FormField>
                <FormField label="Valid from">
                  <input type="date" name="validFrom" value={formData.validFrom} onChange={handleChange} className={fieldClass} />
                </FormField>
                <FormField label="Valid until" required>
                  <input type="date" name="validUntil" value={formData.validUntil} onChange={handleChange} className={fieldClass} />
                </FormField>
              </div>
            </section>

            {/* From / To */}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-slate-100 text-slate-600"><LuBuilding2 size={16} /></span>
                  <div><h3 className="text-sm font-semibold text-slate-900">Quotation from</h3><p className="text-[11px] text-slate-500">Service provider</p></div>
                </div>
                <p className="text-base font-semibold text-[#17486a]">ASD Company</p>
                <p className="mt-1 text-xs text-slate-500">Admin / Company Details</p>
              </section>
              <section className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm"><LuUser size={16} /></span>
                  <div><h3 className="text-sm font-semibold text-slate-900">Quotation to</h3><p className="text-[11px] text-slate-500">Customer / exporter</p></div>
                </div>
                <p className="text-base font-semibold text-[#17486a]">{getValue(exporter?.companyName, exporter?.name, exporter?.contactPerson, exporter?.fullName, shipmentData?.customerName)}</p>
                <div className="mt-2 space-y-1 text-xs text-slate-500">
                  {getValue(exporter?.contactPerson, exporter?.name, exporter?.fullName) !== "-" && <p>{getValue(exporter?.contactPerson, exporter?.name, exporter?.fullName)}</p>}
                  {getValue(exporter?.email, exporter?.emailAddress, exporter?.contact?.email) !== "-" && <p>{getValue(exporter?.email, exporter?.emailAddress, exporter?.contact?.email)}</p>}
                  {getValue(exporter?.mobile, exporter?.phone, exporter?.mobileNumber, exporter?.contact?.phone) !== "-" && <p>{getValue(exporter?.mobile, exporter?.phone, exporter?.mobileNumber, exporter?.contact?.phone)}</p>}
                </div>
              </section>
            </div>

            {/* Shipment snapshot */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-50 text-cyan-700"><LuMapPin size={17} /></div>
                <div><h2 className="text-sm font-semibold text-slate-900">Shipment overview</h2><p className="text-[11px] text-slate-500">Reference information linked to this quotation.</p></div>
              </div>
              <div className="mb-4 rounded-xl bg-gradient-to-r from-[#123653] to-[#24617c] p-4 text-white">
                <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-blue-100/70">Shipment route</p>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm font-semibold sm:text-base">
                  <span>{originCountry}</span><span className="text-cyan-200">→</span><span>{destinationCountry}</span>
                </div>
                <p className="mt-2 text-[11px] text-blue-100/75">Shipment reference: {shipmentReferenceId}</p>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-5 sm:grid-cols-3 lg:grid-cols-4">
                <DetailItem label="Shipment type" value={shipmentType} />
                <DetailItem label="Shipment mode" value={shipmentMode} />
                <DetailItem label="Port of loading" value={portOfLoading} />
                <DetailItem label="Port of discharge" value={portOfDischarge} />
                <DetailItem label="Incoterm" value={incoterm} />
                <DetailItem label="Submitted on" value={submittedDate} />
                <DetailItem label="Approved on" value={approvedDate} />
                <DetailItem label="Requested ID" value={shipmentReferenceId} />
              </div>
            </section>

            {/* Charges */}
            <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-violet-50 text-violet-700"><LuFileCheck size={17} /></div>
                  <div><h2 className="text-sm font-semibold text-slate-900">Charges breakdown</h2><p className="text-[11px] text-slate-500">Add each service charge to the quotation.</p></div>
                </div>
                <button type="button" onClick={addCharge} className="inline-flex items-center gap-2 rounded-xl border border-blue-200 bg-blue-50 px-3.5 py-2 text-xs font-semibold text-blue-700 transition hover:bg-blue-100">
                  <LuPlus size={15} /> Add charge
                </button>
              </div>
              <div className="p-4 sm:p-6">
                <div className="space-y-3">
                  {formData.charges.map((charge, index) => (
                    <div key={index} className="grid grid-cols-1 gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-3 sm:grid-cols-[42px_1.1fr_1.2fr_0.8fr_38px] sm:items-end sm:p-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-semibold text-slate-500 shadow-sm">#{index + 1}</div>
                      <FormField label="Charge name">
                        <input value={charge.name} onChange={(e) => handleChargeChange(index, "name", e.target.value)} placeholder="e.g. Freight charges" className={fieldClass} />
                      </FormField>
                      <FormField label="Details">
                        <input value={charge.description} onChange={(e) => handleChargeChange(index, "description", e.target.value)} placeholder="Add a short description" className={fieldClass} />
                      </FormField>
                      <FormField label={`Amount (${formData.currency})`}>
                        <input type="number" min="0" value={charge.amount} onChange={(e) => handleChargeChange(index, "amount", e.target.value)} placeholder="0.00" className={fieldClass} />
                      </FormField>
                      <button type="button" disabled={formData.charges.length === 1} onClick={() => removeCharge(index)} aria-label={`Remove charge ${index + 1}`} className="flex h-10 w-10 items-center justify-center rounded-xl text-rose-500 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:text-slate-300">
                        <LuTrash2 size={17} />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="mt-5 flex items-center justify-between rounded-xl border border-blue-100 bg-blue-50/70 px-4 py-3">
                  <span className="text-xs font-semibold text-slate-600">Charges subtotal</span>
                  <span className="text-base font-bold text-[#17486a]">{formatCurrency(subtotal)}</span>
                </div>
              </div>
            </section>

            {/* Notes + summary */}
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.35fr_0.85fr]">
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-50 text-amber-700"><LuFileText size={17} /></div>
                  <div><h2 className="text-sm font-semibold text-slate-900">Additional notes</h2><p className="text-[11px] text-slate-500">Optional information for the customer.</p></div>
                </div>
                <textarea name="notes" value={formData.notes} onChange={handleChange} rows={6} placeholder="Enter quotation notes..." className={`${fieldClass} min-h-[130px] resize-y`} />
              </section>
              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
                <h2 className="text-sm font-semibold text-slate-900">Quotation summary</h2>
                <p className="mt-1 text-[11px] text-slate-500">Review the final payable amount.</p>
                <div className="mt-5 space-y-4 text-xs">
                  <div className="flex justify-between gap-3 text-slate-500"><span>Subtotal</span><span className="font-semibold text-slate-800">{formatCurrency(subtotal)}</span></div>
                  <FormField label="Discount">
                    <input type="number" min="0" name="discount" value={formData.discount} onChange={handleChange} className={fieldClass} />
                  </FormField>
                  <FormField label="Tax">
                    <input type="number" min="0" name="tax" value={formData.tax} onChange={handleChange} className={fieldClass} />
                  </FormField>
                  <div className="rounded-xl bg-[#123653] p-4 text-white">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-blue-100/70">Total quotation value</p>
                    <p className="mt-1 text-2xl font-bold tracking-tight">{formatCurrency(totalAmount)}</p>
                    <p className="mt-1 text-[10px] text-blue-100/70">Including entered discount and tax</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Terms */}
            <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700"><LuFileCheck size={17} /></div>
                <div><h2 className="text-sm font-semibold text-slate-900">Terms & conditions</h2><p className="text-[11px] text-slate-500">These terms will be included with the quotation.</p></div>
              </div>
              <textarea name="termsAndConditions" value={formData.termsAndConditions} onChange={handleChange} rows={5} className={`${fieldClass} min-h-[120px] resize-y`} />
            </section>
          </div>
        </div>

        {/* Sticky footer actions */}
        <div className="shrink-0 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur sm:px-7 sm:py-4">
          <div className="mx-auto flex max-w-6xl flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-between">
            <button type="button" onClick={onClose} className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 sm:w-auto">
              <LuMapPin size={15} /> Back to shipment
            </button>
            <div className="flex w-full flex-col-reverse gap-2 sm:w-auto sm:flex-row">
              <button
                type="button"
                onClick={isNormalUserShipment ? handleCreateQuotation : handleShareQuotation}
                disabled={sharing || loading}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#17486a] to-[#24617c] px-6 py-3 text-xs font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
              >
                {(sharing || loading) ? <LuLoaderCircle size={15} className="animate-spin" /> : (isNormalUserShipment ? <LuSave size={15} /> : <LuSend size={15} />)}
                {loading ? "Saving quotation..." : sharing ? "Sharing quotation..." : isNormalUserShipment ? "Create Quotation" : "Create & share quotation"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const fieldClass = "mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3.5 py-2.5 text-xs text-slate-800 outline-none transition placeholder:text-slate-400 hover:border-slate-300 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10";

function FormField({ label, hint, required, children }) {
  return (
    <label className="block min-w-0">
      <span className="flex items-center gap-1 text-[11px] font-semibold text-slate-600">
        {label}{required && <span className="text-rose-500">*</span>}
      </span>
      {children}
      {hint && <span className="mt-1 block text-[10px] text-slate-400">{hint}</span>}
    </label>
  );
}

// ==========================================
// DETAIL ITEM
// ==========================================
function DetailItem({ label, value }) {
  return (
    <div className="min-w-0 border-b border-slate-100 pb-3">
      <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.08em] text-slate-400">{label}</p>
      <p className="break-words text-xs font-semibold text-slate-800">{value || "-"}</p>
    </div>
  );
}
