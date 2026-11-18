
// mahima code //

import { useState, useEffect } from "react";
import {
  FileText,
  Pencil,
  Trash2,
  DollarSign,
} from "lucide-react";
import { FaXmark } from "react-icons/fa6";

import { createInvoice } from "../../api/invoice";


const emptyItem = {
  id: null,
  name: "",
  description: "",
  qty: "",
  unit: "",
  unitPrice: "",
};

const toNumber = (value) => {
  if (value === null || value === undefined || value === "") {
    return 0;
  }

  // Agar value already number hai
  if (typeof value === "number") {
    return Number.isFinite(value) ? value : 0;
  }

  // Agar object hai
  if (typeof value === "object") {
    return toNumber(
      value.amount ??
      value.value ??
      value.price ??
      value.rate ??
      value.total ??
      0
    );
  }

  // String case
  const cleanedValue = String(value)
    .replace(/,/g, "")
    .replace(/[₹$]/g, "")
    .trim();

  const numberValue = Number(cleanedValue);

  return Number.isFinite(numberValue)
    ? numberValue
    : 0;
};


const numberToWords = (value) => {
  const n = Math.round(toNumber(value));
  if (n === 0) return "Zero Rupees Only";
  if (n < 0) return `Minus ${numberToWords(Math.abs(n))}`;

  const ones = ["", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", "Nineteen"];
  const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
  const belowThousand = (num) => {
    let out = "";
    if (num >= 100) out += `${ones[Math.floor(num / 100)]} Hundred `;
    num %= 100;
    if (num >= 20) out += `${tens[Math.floor(num / 10)]} `;
    else if (num > 0) out += `${ones[num]} `;
    return out.trim();
  };

  let num = n;
  const parts = [];
  const crore = Math.floor(num / 10000000); num %= 10000000;
  const lakh = Math.floor(num / 100000); num %= 100000;
  const thousand = Math.floor(num / 1000); num %= 1000;
  if (crore) parts.push(`${belowThousand(crore)} Crore`);
  if (lakh) parts.push(`${belowThousand(lakh)} Lakh`);
  if (thousand) parts.push(`${belowThousand(thousand)} Thousand`);
  if (num) parts.push(belowThousand(num));
  return `${parts.join(" ")} Rupees Only`;
};

const readValue = (...values) =>
  values.find((value) => value !== undefined && value !== null && value !== "") ?? "";

const formatAmount = (value) => {
  return toNumber(value).toLocaleString("en-IN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export default function CreateNewInvoice({
  onClose,
  shipment,
  quotation,
  onSuccess,
}) {
  const [form, setForm] = useState({
    invoiceNumber: "",
    invoiceDate: new Date().toISOString().split("T")[0],
    dueDate: "",
    currency: "INR",

    billTo: "",
    address: "",
    consigneeName: "",
    consigneeAddress: "",

    companyName: "ASD LOGISTICS",
    companyAddress: "Venkata Sai Nilayam, House No. 21-59/10, Huda Colony, R.B. Nagar, Shamshabad, Hyderabad - 501218",
    companyEmail: "asdlogistics1278@gmail.com",
    companyPhone: "",
    gstin: "36AIDPD5495R1ZL",
    pan: "AIDPD5495R",

    awbNumber: "",
    awbDate: "",
    portOfLoading: "",
    portOfDischarge: "",
    airline: "",
    packages: "",
    packageType: "",
    grossWeight: "",
    chargeableWeight: "",
    countryOfOrigin: "",

    accountName: "ASD LOGISTICS",
    accountNumber: "917020036611710",
    bankName: "Axis Bank",
    bankBranch: "Alakapuri",
    ifscCode: "UTIB0004230",

    paymentTerms: "",
    paymentMode: "",
    poReference: "",

    freightCharges: "",
    insuranceCharges: "",
    handlingCharges: "",
    discount: "",
    roundOff: "0",

    notes: "",
    declaration: "Please make payment in favour of ASD Logistics. Thank you for your business.",
  });

  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState(emptyItem);

  /* ================================
     GET DYNAMIC DATA
  ================================= */

  useEffect(() => {
    if (!shipment) return;

    console.log("SHIPMENT DATA:", shipment);
    console.log("QUOTATION DATA:", quotation);

    const cargo =
      shipment?.cargo ||
      shipment?.shipmentInfo ||
      shipment?.goods ||
      {};

    const importer =
      shipment?.parties?.importer ||
      shipment?.importer ||
      shipment?.buyer ||
      {};

    const exporter =
      shipment?.parties?.exporter ||
      shipment?.exporter ||
      {};

    const consignee =
      shipment?.parties?.consignee ||
      shipment?.consignee ||
      shipment?.parties?.importer ||
      importer ||
      {};

    const shipmentDetails = shipment?.shipmentInfo || shipment?.overview || shipment?.header || {};
    const tracking = shipment?.tracking || {};

    /* ================================
       QUOTATION CHARGES -> INVOICE ITEMS
       Quotation schema stores charges as an array of
       { name, description, amount, currency }.
    ================================= */
    const quotationItems = Array.isArray(quotation?.items)
      ? quotation.items
      : Array.isArray(quotation?.quotationItems)
      ? quotation.quotationItems
      : Array.isArray(quotation?.cargoItems)
      ? quotation.cargoItems
      : Array.isArray(quotation?.charges)
      ? quotation.charges
      : [];

    let dynamicItems = [];

    if (quotationItems.length > 0) {
      dynamicItems = quotationItems.map((item, index) => {
        const isCharge = item?.amount !== undefined &&
          item?.qty === undefined && item?.quantity === undefined;
        return {
          id: item?._id || item?.id || index + 1,
          name: isCharge
            ? item?.name || "Shipment charge"
            : item?.name || item?.productName || item?.goods || "Shipment item",
          description: item?.description || (isCharge ? "" : item?.productName || item?.goods || cargo?.productName || ""),
          qty: isCharge ? 1 : toNumber(item?.qty ?? item?.quantity ?? cargo?.quantity ?? cargo?.totalPackages ?? 1),
          unit: item?.unit || (isCharge ? "Service" : cargo?.unit || "Kgs"),
          unitPrice: toNumber(item?.unitPrice ?? item?.price ?? item?.rate ?? item?.amount ?? 0),
        };
      });
    } else {
      dynamicItems = [{
        id: 1,
        name: cargo?.productName || cargo?.goods || shipment?.header?.goods || "Shipment charges",
        description: "",
        qty: toNumber(cargo?.quantity ?? cargo?.totalPackages ?? 1) || 1,
        unit: cargo?.unit || "Shipment",
        unitPrice: toNumber(quotation?.freightQuote ?? quotation?.unitPrice ?? quotation?.price ?? quotation?.rate ?? quotation?.cargoRate ?? 0),
      }];
    }

    setItems(dynamicItems);

    /* ================================
       DYNAMIC CHARGES
    ================================= */

    const freightCharges = toNumber(
      quotation?.freightCharges ?? quotation?.freight ??
      quotation?.pricing?.freight ?? quotation?.priceDetails?.freight ?? 0
    );
    
    const insuranceCharges = toNumber(
      quotation?.insuranceCharges ??
      quotation?.insurance ??
      quotation?.charges?.insurance ??
      quotation?.pricing?.insurance ??
      quotation?.priceDetails?.insurance ??
      0
    );
    
    const handlingCharges = toNumber(
      quotation?.handlingCharges ??
      quotation?.handling ??
      quotation?.charges?.handling ??
      quotation?.pricing?.handling ??
      quotation?.priceDetails?.handling ??
      0
    );
    
    const discount = toNumber(
      quotation?.discount ??
      quotation?.discountAmount ??
      quotation?.charges?.discount ??
      0
    );

    /* ================================
       SET FORM
    ================================= */

    setForm((prev) => ({
      ...prev,

      invoiceNumber: prev.invoiceNumber,

      billTo:
        importer?.companyName ||
        importer?.name ||
        quotation?.billTo ||
        exporter?.companyName ||
        "",

      address:
        importer?.address ||
        importer?.fullAddress ||
        quotation?.address ||
        "",

      currency:
        quotation?.currency ||
        shipment?.currency ||
        prev.currency ||
        "INR",

      consigneeName: readValue(
        consignee?.companyName, consignee?.name, quotation?.consigneeName
      ),
      consigneeAddress: readValue(
        consignee?.address, consignee?.fullAddress, quotation?.consigneeAddress
      ),

      awbNumber: readValue(shipment?.awbNumber, tracking?.awbNumber, shipmentDetails?.awbNumber),
      awbDate: readValue(shipment?.awbDate, tracking?.awbDate, shipmentDetails?.awbDate),
      portOfLoading: readValue(
        shipment?.portOfLoading,
        shipment?.route?.originCity && shipment?.route?.originCountry
          ? `${shipment.route.originCity}, ${shipment.route.originCountry}`
          : shipment?.route?.originCity || shipment?.route?.originCountry
      ),
      portOfDischarge: readValue(
        shipment?.portOfDischarge,
        shipment?.route?.destinationCity && shipment?.route?.destinationCountry
          ? `${shipment.route.destinationCity}, ${shipment.route.destinationCountry}`
          : shipment?.route?.destinationCity || shipment?.route?.destinationCountry
      ),
      airline: readValue(shipment?.carrier?.name, shipment?.carrier?.code, shipmentDetails?.airline),
      packages: readValue(cargo?.packages, shipment?.additionalInformation?.packages, cargo?.quantity),
      packageType: readValue(cargo?.packingType, shipment?.additionalInformation?.packagingType),
      grossWeight: readValue(cargo?.grossWeight, cargo?.weight),
      // Shipment schema has no dedicated chargeableWeight field; keep it blank unless supplied separately.
      chargeableWeight: readValue(cargo?.chargeableWeight, shipment?.chargeableWeight),
      countryOfOrigin: readValue(shipment?.route?.originCountry),

      paymentTerms:
        quotation?.paymentTerms ||
        quotation?.terms ||
        prev.paymentTerms ||
        "",

      paymentMode:
        quotation?.paymentMode ||
        quotation?.paymentMethod ||
        prev.paymentMode ||
        "",

      poReference:
        quotation?.poReference ||
        quotation?.referenceNumber ||
        quotation?.quotationNumber ||
        shipment?.poReference ||
        "",

      freightCharges,
      insuranceCharges,
      handlingCharges,
      discount,

      notes:
        quotation?.notes ||
        quotation?.remarks ||
        prev.notes ||
        "",
    }));
  }, [shipment, quotation]);

  /* ================================
     FORM CHANGE
  ================================= */

  const handleChange = (field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  /* ================================
     EDIT ITEM
  ================================= */

  const startEdit = (item) => {
    setEditingId(item.id);

    setEditValues({
      ...item,
    });
  };

  const saveEdit = (id) => {
    if (!editValues.name?.trim()) {
      alert("Please enter Charge Name.");
      return;
    }
  
    if (toNumber(editValues.qty) <= 0) {
      alert("Quantity must be greater than 0.");
      return;
    }
  
    if (toNumber(editValues.unitPrice) <= 0) {
      alert("Rate must be greater than 0.");
      return;
    }
  
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...editValues,
              id,
            }
          : item
      )
    );
  
    setEditingId(null);
  };

  const deleteItem = (id) => {
    setItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
  };

  /* ================================
     INVOICE CALCULATIONS
  ================================= */

  const subtotal = items.reduce((sum, item) => {
    const qty = toNumber(item.qty);
    const unitPrice = toNumber(item.unitPrice);

    return sum + qty * unitPrice;
  }, 0);

  const freightCharges = toNumber(form.freightCharges);

  const insuranceCharges = toNumber(
    form.insuranceCharges
  );

  const handlingCharges = toNumber(
    form.handlingCharges
  );

  const discount = toNumber(form.discount);

  /* Additional Charges */

  const additionalCharges =
    freightCharges +
    insuranceCharges +
    handlingCharges;

  /*
    Invoice Amount Before Tax
  */

  const taxable = Math.max(
    0,
    subtotal +
      additionalCharges -
      discount
  );

  /*
    GST
  */

  const cgst = taxable * 0.09;

  const sgst = taxable * 0.09;

  /*
    Final Total
  */

  const roundOff = toNumber(form.roundOff);

  const total =
    taxable +
    cgst +
    sgst +
    roundOff;

  const amountInWords = numberToWords(total);

    /* ================================
     REQUIRED FIELD VALIDATION
  ================================= */

  const validateInvoice = () => {
    const requiredFields = [
      ["Invoice Date", form.invoiceDate],
      ["Currency", form.currency],
      ["Bill To", form.billTo],
      ["Billing Address", form.address],

      ["Company Name", form.companyName],
      ["Company Email", form.companyEmail],
      ["Company Phone", form.companyPhone],
      ["GSTIN", form.gstin],
      ["PAN", form.pan],

      ["Consignee Name", form.consigneeName],
      ["Consignee Address", form.consigneeAddress],

      ["Port of Loading", form.portOfLoading],
      ["Port of Discharge", form.portOfDischarge],
      ["Packages", form.packages],
      ["Package Type", form.packageType],
      ["Gross Weight", form.grossWeight],

      ["Bank Account Name", form.accountName],
      ["Account Number", form.accountNumber],
      ["Bank Name", form.bankName],
      ["IFSC Code", form.ifscCode],
    ];

    const missingFields = requiredFields
      .filter(([, value]) => !String(value ?? "").trim())
      .map(([label]) => label);

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      form.companyEmail?.trim() &&
      !emailRegex.test(form.companyEmail.trim())
    ) {
      missingFields.push("Valid Company Email");
    }

    // Numeric validation
    if (form.packages && toNumber(form.packages) <= 0) {
      missingFields.push("Packages must be greater than 0");
    }

    if (form.grossWeight && toNumber(form.grossWeight) <= 0) {
      missingFields.push("Gross Weight must be greater than 0");
    }

    // Invoice items validation
    if (!items.length) {
      missingFields.push("At least one Invoice Item");
    } else {
      items.forEach((item, index) => {
        const itemNumber = index + 1;

        if (!String(item.name ?? "").trim()) {
          missingFields.push(`Item ${itemNumber}: Charge Name`);
        }

        if (toNumber(item.qty) <= 0) {
          missingFields.push(`Item ${itemNumber}: Quantity must be greater than 0`);
        }

        if (toNumber(item.unitPrice) <= 0) {
          missingFields.push(`Item ${itemNumber}: Rate must be greater than 0`);
        }
      });
    }

    return missingFields;
  };

  /* ================================
     SUBMIT
  ================================= */

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate all important fields before creating invoice
    const validationErrors = validateInvoice();
  
    if (validationErrors.length > 0) {
      alert(
        "Please complete the following required fields:\n\n" +
        validationErrors.map((field, index) => `${index + 1}. ${field}`).join("\n")
      );
      return;
    }
  
    try {
  
  
      console.log("SHIPMENT:", shipment);
      console.log("QUOTATION:", quotation);
  
      const shipmentId =
        shipment?._id ||
        shipment?.id ||
        shipment?.shipmentId ||
        shipment?.header?._id ||
        shipment?.header?.shipmentId;
  
      const quotationId =
        quotation?._id ||
        quotation?.id ||
        quotation?.quotationId ||
        quotation?.quotation?._id ||
        quotation?.data?._id ||
        quotation?.data?.quotationId;
  
      if (!shipmentId) {
        console.error("Shipment ID missing:", shipment);
        alert("Shipment ID not found");
        return;
      }
  
      if (!quotationId) {
        console.error("Quotation ID missing:", quotation);
        alert("Quotation ID not found");
        return;
      }
  
      const payload = {
        shipmentId,
        quotationId,
      
        invoiceNumber: form.invoiceNumber,
        invoiceDate: form.invoiceDate,
        dueDate: form.dueDate || null,
      
        currency: form.currency,
      
        billTo: form.billTo,
        address: form.address,
        consignee: {
          name: form.consigneeName,
          address: form.consigneeAddress,
        },

        companyDetails: {
          companyName: form.companyName,
          address: form.companyAddress,
          email: form.companyEmail,
          phone: form.companyPhone,
        },
        gstin: form.gstin,
        pan: form.pan,
        shipmentDetails: {
          awbNumber: form.awbNumber,
          awbDate: form.awbDate || null,
          portOfLoading: form.portOfLoading,
          portOfDischarge: form.portOfDischarge,
          airline: form.airline,
          packages: toNumber(form.packages),
          packageType: form.packageType,
          grossWeight: toNumber(form.grossWeight),
          grossWeightUnit: "kg",
          chargeableWeight: toNumber(form.chargeableWeight),
          chargeableWeightUnit: "kg",
          countryOfOrigin: form.countryOfOrigin,
        },
        bankDetails: {
          accountName: form.accountName,
          accountNumber: form.accountNumber,
          bankName: form.bankName,
          branch: form.bankBranch,
          ifscCode: form.ifscCode,
        },

        paymentTerms: form.paymentTerms,
        paymentMode: form.paymentMode,
        poReference: form.poReference,
      
        items: items.map((item) => ({
          name: item.name || "",
          description: item.description || "",
      
          qty: toNumber(item.qty),
      
          unit: item.unit || "",
      
          unitPrice: toNumber(item.unitPrice),
          total: toNumber(item.qty) * toNumber(item.unitPrice),
        })),
      
        freightCharges: toNumber(form.freightCharges),
      
        insuranceCharges: toNumber(
          form.insuranceCharges
        ),
      
        handlingCharges: toNumber(
          form.handlingCharges
        ),
      
        discount: toNumber(form.discount),
      
        notes: form.notes || "",
        declaration: form.declaration || "",

        subtotal: toNumber(subtotal),
      
        taxableAmount: toNumber(taxable),
      
        cgst: toNumber(cgst),
      
        sgst: toNumber(sgst),
        igst: 0,
        totalTax: toNumber(cgst + sgst),
        roundOff: toNumber(roundOff),
        amountInWords,

        totalAmount: toNumber(total),
      
        // Backend me invoiceValue required hai to
        invoiceValue: toNumber(total),
      };
  
      console.log("CREATE INVOICE PAYLOAD:", payload);
  
      const response = await createInvoice(payload);
  
      console.log("INVOICE CREATED:", response.data);
  
      alert("Invoice created successfully");
  
      if (onSuccess) {
        onSuccess(response.data);
      }
  
      onClose();
  
    } catch (error) {
      console.error("CREATE INVOICE ERROR:", error);
  
      alert(
        error?.response?.data?.message ||
        "Failed to create invoice"
      );
    }
  };

  const inputClass =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#24496b] focus:ring-4 focus:ring-[#24496b]/10";

  const labelClass =
    "mb-1.5 block text-[11px] font-semibold uppercase tracking-[0.08em] text-slate-500";

  return (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 z-[20] flex items-center justify-center bg-slate-950/65 p-0 backdrop-blur-sm sm:p-4 lg:p-6"
    >
      <div className="flex max-h-screen w-full max-w-7xl flex-col overflow-hidden bg-[#f5f7fa] shadow-2xl sm:max-h-[94vh] sm:rounded-3xl">
        {/* HEADER */}
        <div className="relative shrink-0 overflow-hidden bg-gradient-to-r from-[#102b45] via-[#173b5b] to-[#244d70] px-5 py-5 text-white sm:px-8 sm:py-6">
          <div className="pointer-events-none absolute -right-12 -top-24 h-64 w-64 rounded-full border-[35px] border-white/[0.04]" />
          <div className="pointer-events-none absolute -bottom-28 right-48 h-52 w-52 rounded-full bg-cyan-300/[0.07] blur-2xl" />
          <div className="relative flex items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/15 bg-white/10 shadow-inner">
                <FileText className="h-6 w-6 text-cyan-100" />
              </div>
              <div className="min-w-0">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h2 className="text-xl font-bold tracking-tight sm:text-2xl">
                    Create New Invoice
                  </h2>
                  <span className="rounded-full border border-amber-200/25 bg-amber-300/15 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-amber-100">
                    Pending Review
                  </span>
                </div>
                <p className="text-xs text-slate-300 sm:text-sm">
                  Prepare and review billing details for this shipment
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close invoice"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-white/10 text-white transition hover:bg-white/20"
            >
              <FaXmark className="text-lg" />
            </button>
          </div>
        </div>

        {/* SCROLLABLE CONTENT */}
        <div className="min-h-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-7">
          <div className="grid grid-cols-1 items-start gap-5 xl:grid-cols-[minmax(0,1fr)_340px]">
            <div className="space-y-5">
              {/* INVOICE INFORMATION */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#24496b]">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Invoice Information</h3>
                    <p className="mt-0.5 text-xs text-slate-400">Enter invoice, billing and payment details</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-x-4 gap-y-4 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
                <div>
  <label className={labelClass}>Invoice Number *</label>
  <input
    type="text"
    value={form.invoiceNumber}
    readOnly
    placeholder="Generating invoice number..."
    className={`${inputClass} cursor-not-allowed bg-slate-100 font-semibold`}
  />
  <p className="mt-1 text-[10px] text-slate-400">
    Automatically generated from Admin Settings
  </p>
</div>
                  <div>
                    <label className={labelClass}>Invoice Date *</label>
                    <input type="date" value={form.invoiceDate} onChange={handleChange("invoiceDate")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Due Date</label>
                    <input type="date" value={form.dueDate} onChange={handleChange("dueDate")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Currency</label>
                    <input value={form.currency} onChange={handleChange("currency")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Bill To *</label>
                    <input value={form.billTo} onChange={handleChange("billTo")} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Billing Address</label>
                    <input value={form.address} onChange={handleChange("address")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Payment Terms</label>
                    <input value={form.paymentTerms} onChange={handleChange("paymentTerms")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Payment Mode</label>
                    <input value={form.paymentMode} onChange={handleChange("paymentMode")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>PO / Reference No.</label>
                    <input value={form.poReference} onChange={handleChange("poReference")} className={inputClass} />
                  </div>
                </div>
              </section>

              {/* COMPANY, CONSIGNEE & SHIPMENT DETAILS */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <h3 className="text-sm font-bold text-slate-800">Company & Consignee Details</h3>
                  <p className="mt-0.5 text-xs text-slate-400">These details appear in the generated invoice</p>
                </div>
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 sm:p-6">
                  {[
                    ["Company Name", "companyName"], ["Company Email", "companyEmail"],
                    ["Company Phone", "companyPhone"], ["GSTIN", "gstin"], ["PAN", "pan"],
                    ["Consignee Name", "consigneeName"], ["Consignee Address", "consigneeAddress"],
                  ].map(([label, field]) => (
                    <div key={field} className={field === "consigneeAddress" ? "sm:col-span-2" : ""}>
                      <label className={labelClass}>{label}</label>
                      <input value={form[field]} onChange={handleChange(field)} className={inputClass} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className={labelClass}>Company Address</label>
                    <textarea rows={2} value={form.companyAddress} onChange={handleChange("companyAddress")} className={`${inputClass} resize-y`} />
                  </div>
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <h3 className="text-sm font-bold text-slate-800">Shipment Details</h3>
                  <p className="mt-0.5 text-xs text-slate-400">AWB, routing, carrier and cargo information</p>
                </div>
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
                  {[
                    ["AWB / B.L. Number", "awbNumber"], ["AWB Date", "awbDate", "date"],
                    ["Port of Loading", "portOfLoading"], ["Port of Discharge", "portOfDischarge"],
                    ["Airline / Carrier", "airline"], ["Packages", "packages"],
                    ["Package Type", "packageType"], ["Gross Weight (kg)", "grossWeight"], ["Chargeable Weight (kg)", "chargeableWeight"],
                    ["Country of Origin", "countryOfOrigin"],
                  ].map(([label, field, type]) => (
                    <div key={field}>
                      <label className={labelClass}>{label}</label>
                      <input type={type || (["packages", "grossWeight", "chargeableWeight"].includes(field) ? "number" : "text")} min={["packages", "grossWeight", "chargeableWeight"].includes(field) ? "0" : undefined} value={form[field]} onChange={handleChange(field)} className={inputClass} />
                    </div>
                  ))}
                </div>
              </section>

              {/* INVOICE ITEMS */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Invoice Items</h3>
                    <p className="mt-0.5 text-xs text-slate-400">Review the shipment line items and unit pricing</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                    {items.length} {items.length === 1 ? "Item" : "Items"}
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <div className="min-w-[900px]">
                    <div className="grid grid-cols-[42px_minmax(140px,1.1fr)_minmax(180px,1.6fr)_minmax(90px,0.7fr)_minmax(110px,1fr)_minmax(110px,1fr)_90px] gap-3 bg-slate-50 px-5 py-3 text-[10px] font-bold uppercase tracking-[0.08em] text-slate-500 sm:px-6">
                      <span>#</span>
                      <span>Charge Name</span>
                      <span>Description</span>
                      <span>Quantity</span>
                      <span>Rate</span>
                      <span>Amount</span>
                      <span className="text-center">Actions</span>
                    </div>
                    {items.length > 0 ? items.map((item, idx) => {
                      const isEditing = editingId === item.id;
                      return (
                        <div
                          key={item.id}
                          className="grid grid-cols-[42px_minmax(140px,1.1fr)_minmax(180px,1.6fr)_minmax(90px,0.7fr)_minmax(110px,1fr)_minmax(110px,1fr)_90px] items-center gap-3 border-t border-slate-100 px-5 py-4 text-sm transition hover:bg-slate-50/70 sm:px-6"
                        >
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-slate-100 text-xs font-semibold text-slate-500">{idx + 1}</span>
                          {isEditing ? (
                            <input value={editValues.name || ""} onChange={(e) => setEditValues({ ...editValues, name: e.target.value })} placeholder="Charge name" className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-[#24496b]" />
                          ) : (
                            <span className="font-semibold text-slate-700">{item.name || "-"}</span>
                          )}
                          {isEditing ? (
                            <input value={editValues.description || ""} onChange={(e) => setEditValues({ ...editValues, description: e.target.value })} placeholder="Description" className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-[#24496b]" />
                          ) : (
                            <span className="text-xs text-slate-500">{item.description || "-"}</span>
                          )}
                          {isEditing ? (
                            <input type="number" value={editValues.qty} onChange={(e) => setEditValues({ ...editValues, qty: e.target.value })} className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-[#24496b]" />
                          ) : (
                            <span className="text-slate-600">{item.qty} <span className="text-xs text-slate-400">{item.unit}</span></span>
                          )}
                          {isEditing ? (
                            <input type="number" value={editValues.unitPrice} onChange={(e) => setEditValues({ ...editValues, unitPrice: e.target.value })} className="w-full rounded-lg border border-slate-200 px-2.5 py-2 text-xs outline-none focus:border-[#24496b]" />
                          ) : (
                            <span className="font-medium tabular-nums text-slate-700">{form.currency} {formatAmount(item.unitPrice)}</span>
                          )}
                          <span className="font-semibold tabular-nums text-slate-800">{form.currency} {formatAmount(toNumber(item.qty) * toNumber(item.unitPrice))}</span>
                          <div className="flex items-center justify-center gap-1.5">
                            {isEditing ? (
                              <button type="button" onClick={() => saveEdit(item.id)} className="rounded-lg bg-emerald-50 px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition hover:bg-emerald-100">Save</button>
                            ) : (
                              <button type="button" onClick={() => startEdit(item)} aria-label="Edit item" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-blue-50 hover:text-[#24496b]">
                                <Pencil className="h-4 w-4" />
                              </button>
                            )}
                            <button type="button" onClick={() => deleteItem(item.id)} aria-label="Delete item" className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-red-50 hover:text-red-600">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      );
                    }) : (
                      <div className="px-6 py-10 text-center text-sm text-slate-400">No invoice items available.</div>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-slate-100 bg-slate-50/70 px-5 py-3 sm:px-6">
                  <span className="text-xs text-slate-500">Line item subtotal</span>
                  <span className="text-sm font-bold tabular-nums text-slate-800">{form.currency} {formatAmount(subtotal)}</span>
                </div>
              </section>

              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4 sm:px-6">
                  <h3 className="text-sm font-bold text-slate-800">Payment / Bank Details</h3>
                  <p className="mt-0.5 text-xs text-slate-400">Bank account information for receiving payment</p>
                </div>
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-3 sm:p-6">
                  {[
                    ["Account Name", "accountName"], ["Account Number", "accountNumber"],
                    ["Bank", "bankName"], ["Branch", "bankBranch"], ["IFSC Code", "ifscCode"],
                  ].map(([label, field]) => (
                    <div key={field}>
                      <label className={labelClass}>{label}</label>
                      <input value={form[field]} onChange={handleChange(field)} className={inputClass} />
                    </div>
                  ))}
                </div>
              </section>

              {/* ADDITIONAL CHARGES */}
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="flex items-center gap-3 border-b border-slate-100 px-5 py-4 sm:px-6">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-[#24496b]">
                    <DollarSign className="h-4 w-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">Additional Charges</h3>
                    <p className="mt-0.5 text-xs text-slate-400">Add applicable shipment costs and discounts</p>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-4 p-5 sm:grid-cols-2 lg:grid-cols-4 sm:p-6">
                  <div>
                    <label className={labelClass}>Freight Charges</label>
                    <input type="number" value={form.freightCharges} onChange={handleChange("freightCharges")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Insurance Charges</label>
                    <input type="number" value={form.insuranceCharges} onChange={handleChange("insuranceCharges")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Handling Charges</label>
                    <input type="number" value={form.handlingCharges} onChange={handleChange("handlingCharges")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Discount</label>
                    <input type="number" value={form.discount} onChange={handleChange("discount")} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Round Off</label>
                    <input type="number" step="0.01" value={form.roundOff} onChange={handleChange("roundOff")} className={inputClass} />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className={labelClass}>Notes to Customer</label>
                    <textarea rows={3} value={form.notes} onChange={handleChange("notes")} className={`${inputClass} resize-y`} placeholder="Add any additional information for the customer..." />
                  </div>
                  <div className="sm:col-span-2 lg:col-span-4">
                    <label className={labelClass}>Notes & Declaration</label>
                    <textarea rows={2} value={form.declaration} onChange={handleChange("declaration")} className={`${inputClass} resize-y`} />
                  </div>
                </div>
              </section>
            </div>

            {/* SUMMARY */}
            <aside className="space-y-4 xl:sticky xl:top-0">
              <section className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm">
                <div className="bg-gradient-to-r from-[#102b45] to-[#244d70] px-5 py-5 text-white">
                  <p className="text-xs font-semibold uppercase tracking-[0.12em] text-blue-100">Payment Overview</p>
                  <p className="mt-2 text-3xl font-bold tracking-tight tabular-nums">{form.currency} {formatAmount(total)}</p>
                  <p className="mt-1 text-xs text-slate-300">Total invoice amount including tax</p>
                </div>
                <div className="space-y-3 p-5">
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Items Subtotal</span>
                    <span className="font-medium tabular-nums text-slate-800">{form.currency} {formatAmount(subtotal)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Freight</span>
                    <span className="font-medium tabular-nums text-slate-800">{form.currency} {formatAmount(freightCharges)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Insurance</span>
                    <span className="font-medium tabular-nums text-slate-800">{form.currency} {formatAmount(insuranceCharges)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Handling</span>
                    <span className="font-medium tabular-nums text-slate-800">{form.currency} {formatAmount(handlingCharges)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Discount</span>
                    <span className="font-medium tabular-nums text-rose-600">- {form.currency} {formatAmount(discount)}</span>
                  </div>
                  <div className="my-1 border-t border-dashed border-slate-200" />
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Taxable Amount</span>
                    <span className="font-semibold tabular-nums text-slate-800">{form.currency} {formatAmount(taxable)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">CGST (9%)</span>
                    <span className="font-medium tabular-nums text-slate-700">{form.currency} {formatAmount(cgst)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">SGST (9%)</span>
                    <span className="font-medium tabular-nums text-slate-700">{form.currency} {formatAmount(sgst)}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3 text-sm">
                    <span className="text-slate-500">Round Off</span>
                    <span className="font-medium tabular-nums text-slate-700">{form.currency} {formatAmount(roundOff)}</span>
                  </div>
                  <div className="mt-2 flex items-center justify-between gap-3 rounded-xl bg-blue-50 px-4 py-3">
                    <span className="text-sm font-bold text-[#173b5b]">Total Amount</span>
                    <span className="text-base font-extrabold tabular-nums text-[#173b5b]">{form.currency} {formatAmount(total)}</span>
                  </div>
                </div>
              </section>

              <section className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-slate-800">Amount in Words</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{amountInWords}</p>
              </section>

              <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
                <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#24496b]">Before you save</p>
                <p className="mt-1.5 text-xs leading-5 text-slate-600">Please review the billing details, line items and calculated amount before creating this invoice.</p>
              </div>
            </aside>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex shrink-0 flex-col-reverse gap-3 border-t border-slate-200 bg-white px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-7">
          <p className="hidden text-xs text-slate-400 sm:block">Invoice details are linked to the selected shipment and quotation.</p>
          <div className="flex w-full gap-3 sm:w-auto">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 sm:flex-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-[#173b5b] to-[#244d70] px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/15 transition hover:-translate-y-0.5 hover:shadow-xl sm:flex-none"
            >
              <FileText className="h-4 w-4" />
              Save Invoice
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}