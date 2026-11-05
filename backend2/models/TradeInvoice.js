// const mongoose = require("mongoose");

// const tradeInvoiceSchema = new mongoose.Schema({

//   invoiceNumber:{
//     type:String,
//     required:true,
//     unique:true
//   },

//   invoiceDate:{
//     type:Date,
//     default:Date.now
//   },

//   dueDate:Date,

//   party:{
//     type:String,
//     required:true
//   },

//   type:{
//     type:String,
//     enum:[
//       "Commercial Invoice",
//       "Proforma Invoice",
//       "Tax Invoice",
//       "Service Invoice"
//     ],
//     default:"Commercial Invoice"
//   },

//   country:String,

//   invoiceValue:{
//     type:Number,
//     default:0
//   },

//   currency:{
//     type:String,
//     default:"INR"
//   },

//   status:{
//     type:String,
//     enum:[
//       "Paid",
//       "Pending",
//       "Overdue",
//       "Cancelled"
//     ],
//     default:"Pending"
//   },

//   shipment:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"Shipment"
//   },

//   remarks:String,

//   createdBy:{
//     type:mongoose.Schema.Types.ObjectId,
//     ref:"User"
//   }

// },{
//   timestamps:true
// });

// module.exports=mongoose.model("TradeInvoice",tradeInvoiceSchema);


// mahima code //

const mongoose = require("mongoose");

/* ==========================================
   INVOICE ITEM
========================================== */

const invoiceItemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      default: "",
      trim: true,
    },

    hsCode: {
      type: String,
      default: "",
      trim: true,
    },

    qty: {
      type: Number,
      default: 0,
      min: 0,
    },

    unit: {
      type: String,
      default: "",
      trim: true,
    },

    unitPrice: {
      type: Number,
      default: 0,
      min: 0,
    },

    // Line amount = qty * unitPrice
    total: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    _id: false,
  }
);

/* ==========================================
   COMPANY DETAILS SNAPSHOT
========================================== */

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

/* ==========================================
   CONSIGNEE DETAILS
========================================== */

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

/* ==========================================
   SHIPMENT DETAILS SNAPSHOT
   These values are copied from Shipment at
   invoice creation time so old invoices remain
   unchanged if the shipment is edited later.
========================================== */

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

/* ==========================================
   BANK / PAYMENT DETAILS SNAPSHOT
========================================== */

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

/* ==========================================
   TRADE INVOICE
========================================== */

const tradeInvoiceSchema = new mongoose.Schema(
  {
    /* ================= BASIC INVOICE ================= */

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    invoiceDate: {
      type: Date,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    currency: {
      type: String,
      default: "INR",
      trim: true,
    },

    status: {
      type: String,
      enum: ["Paid", "Pending", "Overdue", "Cancelled"],
      default: "Pending",
    },

    /* ================= OLD / BASIC FIELDS ================= */

    party: {
      type: String,
      default: "",
    },

    type: {
      type: String,
      enum: [
        "Commercial Invoice",
        "Proforma Invoice",
        "Tax Invoice",
        "Service Invoice",
      ],
      default: "Commercial Invoice",
    },

    country: {
      type: String,
      default: "",
    },

    invoiceValue: {
      type: Number,
      default: 0,
    },

    remarks: {
      type: String,
      default: "",
    },

    /* ================= BILLING DETAILS ================= */

    billTo: {
      type: String,
      default: "",
    },

    address: {
      type: String,
      default: "",
    },

    /* ================= CONSIGNEE ================= */

    consignee: {
      type: consigneeDetailsSchema,
      default: () => ({}),
    },

    /* ================= COMPANY DETAILS ================= */

    companyDetails: {
      type: companyDetailsSchema,
      default: () => ({}),
    },

    gstin: {
      type: String,
      default: "",
      trim: true,
    },

    pan: {
      type: String,
      default: "",
      trim: true,
    },

    /* ================= PAYMENT DETAILS ================= */

    paymentTerms: {
      type: String,
      default: "",
    },

    paymentMode: {
      type: String,
      default: "",
    },

    poReference: {
      type: String,
      default: "",
    },

    bankDetails: {
      type: bankDetailsSchema,
      default: () => ({}),
    },

    /* ================= SHIPMENT SNAPSHOT ================= */

    shipmentDetails: {
      type: shipmentDetailsSchema,
      default: () => ({}),
    },

    /* ================= INVOICE ITEMS ================= */

    items: {
      type: [invoiceItemSchema],
      default: [],
    },

    /* ================= ADDITIONAL CHARGES ================= */

    freightCharges: {
      type: Number,
      default: 0,
    },

    insuranceCharges: {
      type: Number,
      default: 0,
    },

    handlingCharges: {
      type: Number,
      default: 0,
    },

    discount: {
      type: Number,
      default: 0,
    },

    /* ================= TAX & CALCULATIONS ================= */

    subtotal: {
      type: Number,
      default: 0,
    },

    taxableAmount: {
      type: Number,
      default: 0,
    },

    cgst: {
      type: Number,
      default: 0,
    },

    sgst: {
      type: Number,
      default: 0,
    },

    // Supports IGST invoices as well; existing CGST/SGST fields remain.
    igst: {
      type: Number,
      default: 0,
    },

    totalTax: {
      type: Number,
      default: 0,
    },

    roundOff: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    amountInWords: {
      type: String,
      default: "",
    },

    notes: {
      type: String,
      default: "",
    },

    /* ================= ATTACHMENT ================= */

    attachment: {
      type: String,
      default: null,
    },

    /* ================= RELATIONS ================= */

    shipment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      index: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    quotation: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.TradeInvoice ||
  mongoose.model("TradeInvoice", tradeInvoiceSchema);