// const mongoose = require("mongoose");

// const settingSchema = new mongoose.Schema({

//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true,
//         unique:true
//     },
//     language:{
//         type:String,
//         default:"English"
//     },

//     timezone:{
//         type:String,
//         default:"Asia/Kolkata"
//     },

//     currency:{
//         type:String,
//         default:"INR"
//     },

//     theme:{
//         type:String,
//         enum:["Light","Dark","System"],
//         default:"Light"
//     },

//     dashboardLayout:{
//         type:String,
//         default:"Default"
//     },

//     units:{
//         type:String,
//         default:"Metric"
//     },
//     defaultCountry:String,

//     defaultPage:{
//         type:String,
//         default:"Dashboard"
//     },

//     itemsPerPage:{
//         type:Number,
//         default:25
//     },
//     emailNotification:{
//         type:Boolean,
//         default:true
//     },
//     billingEmail: {
//   type: String,
//   default: ""
// },

// billingCompanyName: {
//   type: String,
//   default: ""
// },

// billingGstNumber: {
//   type: String,
//   default: ""
// },

//     pushNotification:{
//         type:Boolean,
//         default:true
//     },

//     smsNotification:{
//         type:Boolean,
//         default:false
//     },
//     twoFactorAuth:{
//         type:Boolean,
//         default:false
//     },

//     sessionTimeout:{
//         type:Number,
//         default:30
//     },

//     apiKey:String

// },{
//     timestamps:true
// });

// module.exports=mongoose.model("Setting",settingSchema);




const mongoose = require("mongoose");

const shipmentFieldSchema = new mongoose.Schema(
    {
      key: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      useDropdown: {
        type: Boolean,
        default: true
      },
      options: {
        type: [String],
        default: []
      }
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
        default: () => [
          {
            key: "shipmentType",
            label: "Shipment Type",
            useDropdown: true,
            options: ["Export", "Import", "Re-export"]
          },
          {
            key: "shipmentMode",
            label: "Shipment Mode",
            useDropdown: true,
            options: ["Air", "Sea", "Road", "Rail"]
          },
          {
            key: "shipmentPurpose",
            label: "Shipment Purpose",
            useDropdown: true,
            options: ["Commercial", "Sample", "Personal"]
          },
          {
            key: "companyName",
            label: "Customer / Company Name",
            useDropdown: false,
            options: []
          },
          {
            key: "contactPerson",
            label: "Contact Person",
            useDropdown: false,
            options: []
          }
        ]
      }
    },
    { _id: false }
  );

  const documentUploadFieldSchema = new mongoose.Schema(
    {
      key: {
        type: String,
        required: true
      },
      label: {
        type: String,
        required: true
      },
      enabled: {
        type: Boolean,
        default: true
      }
    },
    { _id: false }
  );
  
  const documentsUploadSchema = new mongoose.Schema(
    {
      sectionTitle: {
        type: String,
        default: "Documents Uploaded"
      },
      sectionDesc: {
        type: String,
        default: "Upload all relevant documents"
      },
      fields: {
        type: [documentUploadFieldSchema],
        default: () => [
          { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
          { key: "packing-list", label: "Packing List", enabled: true },
          { key: "msds", label: "MSDS", enabled: true },
          { key: "coo", label: "COO", enabled: true },
          { key: "iec-gst", label: "IEC/GST", enabled: true },
          { key: "purchase-order", label: "Purchase Order", enabled: true },
          { key: "product-certificate", label: "Product Certificate", enabled: true },
          { key: "other-documents", label: "Other Documents", enabled: true }
        ]
      }
    },
    { _id: false }
  );

const settingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },

    language: {
      type: String,
      default: "English"
    },

    timezone: {
      type: String,
      default: "Asia/Kolkata"
    },

    currency: {
      type: String,
      default: "INR"
    },

    invoicePrefix: {
      type: String,
      default: "INV-"
    },

    invoiceSequence: {
      type: Number,
      default: 0
    },

    theme: {
      type: String,
      enum: ["Light", "Dark", "System"],
      default: "Light"
    },

    dashboardLayout: {
      type: String,
      default: "Default"
    },

    units: {
      type: String,
      default: "Metric"
    },

    defaultCountry: String,

    defaultPage: {
      type: String,
      default: "Dashboard"
    },

    itemsPerPage: {
      type: Number,
      default: 25
    },

    emailNotification: {
      type: Boolean,
      default: true
    },

    billingEmail: {
      type: String,
      default: ""
    },

    billingCompanyName: {
      type: String,
      default: ""
    },

    billingGstNumber: {
      type: String,
      default: ""
    },

    pushNotification: {
      type: Boolean,
      default: true
    },

    smsNotification: {
      type: Boolean,
      default: false
    },

    twoFactorAuth: {
      type: Boolean,
      default: false
    },

    sessionTimeout: {
      type: Number,
      default: 30
    },

    apiKey: String,

    // Dynamic Shipment Form Settings
    shipmentForm: {
      sections: {
        type: [shipmentSectionSchema],
        default: () => [
          {
            title: "Basic Shipment Details",
            description: "",
            fields: [
              {
                key: "shipmentType",
                label: "Shipment Type",
                useDropdown: true,
                options: ["Export", "Import", "Re-export"]
              },
              {
                key: "shipmentMode",
                label: "Shipment Mode",
                useDropdown: true,
                options: ["Air", "Sea", "Road", "Rail"]
              },
              {
                key: "shipmentPurpose",
                label: "Shipment Purpose",
                useDropdown: true,
                options: ["Commercial", "Sample", "Personal"]
              }
            ]
          }
        ]
      }
    },

    // Dynamic Documents Upload Settings
documentsUpload: {
    type: documentsUploadSchema,
    default: () => ({
      sectionTitle: "Documents Uploaded",
      sectionDesc: "Upload all relevant documents",
      fields: [
        { key: "commercial-invoice", label: "Commercial Invoice", enabled: true },
        { key: "packing-list", label: "Packing List", enabled: true },
        { key: "msds", label: "MSDS", enabled: true },
        { key: "coo", label: "COO", enabled: true },
        { key: "iec-gst", label: "IEC/GST", enabled: true },
        { key: "purchase-order", label: "Purchase Order", enabled: true },
        { key: "product-certificate", label: "Product Certificate", enabled: true },
        { key: "other-documents", label: "Other Documents", enabled: true }
      ]
    })
  }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Setting", settingSchema);