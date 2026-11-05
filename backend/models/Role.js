const mongoose = require("mongoose");

const permissionSchema = {
  view: { type: Boolean, default: false },
  add: { type: Boolean, default: false },
  edit: { type: Boolean, default: false },
  delete: { type: Boolean, default: false }
};

const roleSchema = new mongoose.Schema({
  description: { type: String, default: "" },
  status: { type: String, enum: ["active", "inactive"], default: "active" },
  internalOnly: { type: Boolean, default: false },
  name: {
    type: String,
    required: true,
    unique: true
  },

  permissions: {
    dashboard: permissionSchema,
    booking: permissionSchema,
    shipment: permissionSchema,
    tracking: permissionSchema,
    documents: permissionSchema,
    earnings: permissionSchema,
    ads: permissionSchema,
    support: permissionSchema,
    settings: permissionSchema,
    users: { ...permissionSchema, changePlan: { type: Boolean, default: false } },
    vendors: { ...permissionSchema, kycApprove: { type: Boolean, default: false }, changePlan: { type: Boolean, default: false } },
    plans: permissionSchema,
    masterData: permissionSchema,
    hsRules: permissionSchema,
    countryRules: permissionSchema,
    dgftSchemes: permissionSchema,
    aiAssistant: permissionSchema,
    roles: permissionSchema,
    subAdmins: permissionSchema
  }

}, { timestamps: true });

module.exports = mongoose.model("Role", roleSchema);