// const mongoose = require("mongoose");

// const invoiceSchema = new mongoose.Schema({

//     invoiceNumber: {
//         type: String,
//         unique: true
//     },

//     userId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User"
//     },

//     subscriptionId: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Subscription"
//     },

//     amount: Number,
//     // Tax snapshot belongs to the paid transaction, not to mutable global settings.
//     billingSnapshot: {
//       companyName: String, address: String, gstin: String, stateCode: String,
//       customerName: String, customerAddress: String, customerGstin: String,
//       hsnSac: String, taxableAmount: Number, cgst: Number, sgst: Number, igst: Number,
//       currency: { type: String, default: "INR" }, verified: { type: Boolean, default: false }
//     },

//     paymentMethod: String,

//     status: {
//         type: String,
//         enum: [
//             "Paid",
//             "Pending",
//             "Failed"
//         ],
//         default: "Pending"
//     },

//     invoiceUrl: String,

//     paidAt: Date

// }, {
//     timestamps: true
// });

// module.exports = mongoose.model(
//     "Invoice",
//     invoiceSchema
// );


// mahima code //


const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
  {
    invoiceNumber: {
      type: String,
      unique: true,
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    subscriptionId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subscription",
    },

    amount: Number,

    // Billing and tax details saved at the time of payment
    billingSnapshot: {
      companyName: String,
      address: String,
      gstin: String,
      stateCode: String,

      customerName: String,
      customerAddress: String,
      customerGstin: String,

      hsnSac: String,
      taxableAmount: Number,
      cgst: Number,
      sgst: Number,
      igst: Number,

      currency: {
        type: String,
        default: "INR",
      },

      verified: {
        type: Boolean,
        default: false,
      },
    },

    paymentMethod: String,

    status: {
      type: String,
      enum: ["Paid", "Pending", "Failed"],
      default: "Pending",
    },

    invoiceUrl: String,

    paidAt: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Invoice", invoiceSchema);
