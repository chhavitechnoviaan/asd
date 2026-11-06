const mongoose = require("mongoose");

const MasterDataBatchSchema = new mongoose.Schema(
  {
    dataType: {
      type: String,
      enum: ["import", "export"],
      required: true,
      index: true,
    },

    fileName: {
      type: String,
      required: true,
      trim: true,
    },

    headers: {
      type: [String],
      required: true,
    },

    records: {
      type: [mongoose.Schema.Types.Mixed],
      default: [],
    },

    rowCount: {
      type: Number,
      default: 0,
    },

    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("MasterDataBatch", MasterDataBatchSchema);