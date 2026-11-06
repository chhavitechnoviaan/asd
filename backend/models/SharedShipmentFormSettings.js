
const mongoose = require("mongoose");

const shipmentFieldSchema = new mongoose.Schema(
  {
    key: { type: String, required: true },
    label: { type: String, required: true },
    useDropdown: { type: Boolean, default: true },
    options: { type: [String], default: [] }
  },
  { _id: false }
);

const shipmentSectionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      default: "Basic Shipment Details"
    },
    description: {
      type: String,
      default: ""
    },
    fields: {
      type: [shipmentFieldSchema],
      default: []
    }
  },
  { _id: false }
);

const sharedShipmentFormSettingsSchema = new mongoose.Schema(
  {
    configKey: {
      type: String,
      default: "global",
      unique: true
    },
    sections: {
      type: [shipmentSectionSchema],
      default: []
    },
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "SharedShipmentFormSettings",
  sharedShipmentFormSettingsSchema
);
