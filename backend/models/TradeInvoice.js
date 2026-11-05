// mahima code //
const mongoose = require("mongoose");

/* ==========================================
   INVOICE ITEM
========================================== */
const invoiceItemSchema = new mongoose.Schema(
  {
    name: { type: String, default: "", trim: true },
    description: { type: String, default: "", trim: true },
    hsCode: { type: String, default: "", trim: true },
    qty: { type: Number, default: 0, min: 0 },
    unit: { type: String, default: "", trim: true },
    unitPrice: { type: Number, default: 0, min: 0 },
    total: { type: Number, default: 0, min: 0 },
  },
  { _id: false }
);

const companyDetailsSchema = new mongoose.Schema(
  {
    companyName: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    logo: { type: String, default: "" },
  },
  { _id: false }
);

const consigneeDetailsSchema = new mongoose.Schema(
  {
    name: { type: String, default: "" },
    address: { type: String, default: "" },
    email: { type: String, default: "" },
    phone: { type: String, default: "" },
    country: { type: String, default: "" },
  },
  { _id: false }
);

const shipmentDetailsSchema = new mongoose.Schema(
  {
    awbNumber: { type: String, default: "" },
    awbDate: { type: Date, default: null },
    portOfLoading: { type: String, default: "" },
    portOfDischarge: { type: String, default: "" },
    airline: { type: String, default: "" },
    packages: { type: Number, default: 0, min: 0 },
    packageType: { type: String, default: "" },
    grossWeight: { type: Number, default: 0, min: 0 },
    grossWeightUnit: { type: String, default: "kg" },
    chargeableWeight: { type: Number, default: 0, min: 0 },
    chargeableWeightUnit: { type: String, default: "kg" },
    countryOfOrigin: { type: String, default: "" },
  },
  { _id: false }
);

const bankDetailsSchema = new mongoose.Schema(
  {
    accountName: { type: String, default: "" },
    accountNumber: { type: String, default: "" },
    bankName: { type: String, default: "" },
    branch: { type: String, default: "" },
    ifscCode: { type: String, default: "" },
  },
  { _id: false }
);

const tradeInvoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: { type: String, required: true, unique: true, trim: true },
    invoiceDate: { type: Date, default: Date.now },
    dueDate: { type: Date, default: null },
    currency: { type: String, default: "INR", trim: true },
    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue", "Cancelled"],
      default: "Pending",
    },
    party: { type: String, default: "" },
    type: {
      type: String,
      enum: ["Commercial Invoice", "Proforma Invoice", "Tax Invoice", "Service Invoice"],
      default: "Commercial Invoice",
    },
    country: { type: String, default: "" },
    invoiceValue: { type: Number, default: 0 },
    remarks: { type: String, default: "" },
    billTo: { type: String, default: "" },
    address: { type: String, default: "" },
    consignee: { type: consigneeDetailsSchema, default: () => ({}) },
    companyDetails: { type: companyDetailsSchema, default: () => ({}) },
    gstin: { type: String, default: "", trim: true },
    pan: { type: String, default: "", trim: true },
    paymentTerms: { type: String, default: "" },
    paymentMode: { type: String, default: "" },
    poReference: { type: String, default: "" },
    bankDetails: { type: bankDetailsSchema, default: () => ({}) },
    shipmentDetails: { type: shipmentDetailsSchema, default: () => ({}) },
    items: { type: [invoiceItemSchema], default: [] },
    freightCharges: { type: Number, default: 0 },
    insuranceCharges: { type: Number, default: 0 },
    handlingCharges: { type: Number, default: 0 },
    discount: { type: Number, default: 0 },
    subtotal: { type: Number, default: 0 },
    taxableAmount: { type: Number, default: 0 },
    cgst: { type: Number, default: 0 },
    sgst: { type: Number, default: 0 },
    igst: { type: Number, default: 0 },
    totalTax: { type: Number, default: 0 },
    roundOff: { type: Number, default: 0 },
    totalAmount: { type: Number, default: 0 },
    amountInWords: { type: String, default: "" },
    notes: { type: String, default: "" },
    declaration: { type: String, default: "" },
    attachment: { type: String, default: null },
    shipment: { type: mongoose.Schema.Types.ObjectId, ref: "Shipment", index: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    quotation: { type: mongoose.Schema.Types.ObjectId, ref: "Quotation", default: null },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.TradeInvoice || mongoose.model("TradeInvoice", tradeInvoiceSchema);