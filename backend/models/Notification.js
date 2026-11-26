// const mongoose = require("mongoose");

// const notificationSchema = new mongoose.Schema({

//     userId:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"User",
//         required:true
//     },

//     title:{
//         type:String,
//         required:true
//     },

//     message:{
//         type:String,
//         required:true
//     },

//     category:{
//         type:String,
//         enum:[
//             "Shipment",
//             "Compliance",
//             "Finance",
//             "System"
//         ]
//     },

//     urgency:{
//         type:String,
//         enum:[
//             "Critical",
//             "Warning",
//             "Information"
//         ],
//         default:"Information"
//     },

//     actionText:String,

//     actionLink:String,

//     isRead:{
//         type:Boolean,
//         default:false
//     },

//     type:{
//         type:String,
//         enum:[
//             "Invoice",
//             "Shipment",
//             "Payment",
//             "User",
//             "Document",
//             "Report",
//             "System"
//         ]
//     },
    
//     relatedId:{
//         type:mongoose.Schema.Types.ObjectId
//     }

// },{
//     timestamps:true
// });

// module.exports=mongoose.model("Notification",notificationSchema);


const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({

    eventKey: {type:String, unique:true, sparse:true},
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },

    title:{
        type:String,
        required:true
    },

    message:{
        type:String,
        required:true
    },

    category:{
        type:String,
        enum:[
            "Shipment",
            "Compliance",
            "Finance",
            "Sub-admin Activity",
            "System"
        ]
    },

    urgency:{
        type:String,
        enum:[
            "Critical",
            "Warning",
            "Information"
        ],
        default:"Information"
    },

    actionText:String,

    actionLink:String,

    isRead:{
        type:Boolean,
        default:false
    },

    type:{
        type:String,
        enum:[
            "Invoice",
            "Shipment",
            "Payment",
            "User",
            "Document",
            "Report",
            "Support", "Subscription", "Data Request", "Notice",
            "System"
        ]
    },
    
    relatedId:{
        type:mongoose.Schema.Types.ObjectId
    }

},{
    timestamps:true
});

module.exports=mongoose.model("Notification",notificationSchema);