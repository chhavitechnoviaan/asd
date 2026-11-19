const mongoose = require("mongoose");

const invoiceItemSchema = new mongoose.Schema(
  {
    description: {
      type: String,
      required: true,
      trim: true,
    },

    hsCode: {
      type: String,
      default: "",
    },

    qty: {
      type: Number,
      required: true,
      default: 0,
    },

    unit: {
      type: String,
      default: "",
    },

    unitPrice: {
      type: Number,
      required: true,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },
  },
  { _id: true }
);

const invoiceSchema = new mongoose.Schema(
  {
    // ==========================================
    // RELATION
    // ==========================================

    shipmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shipment",
      required: true,
    },

    // ==========================================
// USER RELATION
// ==========================================

userId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true,
  index: true,
},

    quotationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Quotation",
      default: null,
    },

    // ==========================================
    // INVOICE INFORMATION
    // ==========================================

    invoiceNumber: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    invoiceDate: {
      type: Date,
      required: true,
      default: Date.now,
    },

    dueDate: {
      type: Date,
      default: null,
    },

    currency: {
      type: String,
      default: "INR",
    },

    

    // ==========================================
    // BILLING DETAILS
    // ==========================================

    billTo: {
      type: String,
      required: true,
    },

    address: {
      type: String,
      default: "",
    },

    // ==========================================
    // PAYMENT DETAILS
    // ==========================================

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

    // ==========================================
    // INVOICE ITEMS
    // ==========================================

    items: {
      type: [invoiceItemSchema],
      default: [],
    },

    // ==========================================
    // ADDITIONAL CHARGES
    // ==========================================

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

    // ==========================================
    // TAX
    // ==========================================

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

    totalTax: {
      type: Number,
      default: 0,
    },

    totalAmount: {
      type: Number,
      default: 0,
    },

    // ==========================================
    // OTHER
    // ==========================================

    notes: {
      type: String,
      default: "",
    },

    attachment: {
      type: String,
      default: null,
    },

    // ==========================================
    // STATUS
    // ==========================================

    status: {
      type: String,
      enum: [
        "Draft",
        "Pending Review",
        "Generated",
        "Shared",
        "Paid",
        "Cancelled",
      ],
      default: "Pending Review",
    },

    generatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    paidAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.AdminInvoice ||
  mongoose.model("AdminInvoice", invoiceSchema);