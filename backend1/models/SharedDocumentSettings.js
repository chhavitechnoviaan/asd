const mongoose = require("mongoose");

const documentFieldSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      trim: true,
    },
    label: {
      type: String,
      required: true,
      trim: true,
    },
    enabled: {
      type: Boolean,
      default: true,
    },
  },
  { _id: false }
);

const sharedDocumentSettingsSchema = new mongoose.Schema(
  {
    configKey: {
      type: String,
      default: "global",
      unique: true,
      required: true,
    },

    sectionTitle: {
      type: String,
      default: "Documents Uploaded",
    },

    sectionDesc: {
      type: String,
      default: "Upload all relevant documents",
    },

    fields: {
      type: [documentFieldSchema],
      default: [],
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.SharedDocumentSettings ||
  mongoose.model("SharedDocumentSettings", sharedDocumentSettingsSchema);