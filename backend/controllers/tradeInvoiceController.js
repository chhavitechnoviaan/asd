// const TradeInvoice = require("../models/TradeInvoice");

// exports.getDashboard = async (req,res)=>{
//     try{
    
//     const totalInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id});
    
//     const paidInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
//     status:"Paid"
//     });
    
//     const pendingInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
//     status:"Pending"
//     });
    
//     const overdueInvoices=await TradeInvoice.countDocuments({createdBy:req.user._id,
//     status:"Overdue"
//     });
    
//     const invoiceStats=await TradeInvoice.aggregate([
//     {
// $match:{
// createdBy:req.user._id
// }
// },
//     {
//     $group:{
//     _id:null,
//     totalValue:{$sum:"$invoiceValue"},
//     averageValue:{$avg:"$invoiceValue"}
//     }
//     }
//     ]);
    
//     res.json({
//     status:1,
//     data:{
//     totalInvoices,
//     paidInvoices,
//     pendingInvoices,
//     overdueInvoices,
//     totalInvoiceValue:invoiceStats[0]?.totalValue||0,
//     averageInvoiceValue:invoiceStats[0]?.averageValue||0
//     }
//     });
    
//     }catch(error){
    
//     res.status(500).json({
//     status:0,
//     message:error.message
//     });
    
//     }
//     };

//     exports.getInvoices=async(req,res)=>{
//         try{
        
//         const {search,status,type,country}=req.query;
        
//         let filter={createdBy:req.user._id};
        
//         if(search){
        
//         filter.$or=[
//         {
//         invoiceNumber:{
//         $regex:search,
//         $options:"i"
//         }
//         },
//         {
//         party:{
//         $regex:search,
//         $options:"i"
//         }
//         }
//         ];
        
//         }
        
//         if(status) filter.status=status;
        
//         if(type) filter.type=type;
        
//         if(country) filter.country=country;
        
//         const invoices=await TradeInvoice.find(filter)
//         .sort({
//         createdAt:-1
//         });
        
//         res.json({
//         status:1,
//         data:invoices
//         });
        
//         }catch(error){
        
//         res.status(500).json({
//         status:0,
//         message:error.message
//         });
        
//         }
//         };

//         exports.getStatusSummary=async(req,res)=>{
//             try{
            
//             const data=await TradeInvoice.aggregate([
//             {
// $match:{
// createdBy:req.user._id
// }
// },
//             {
//             $group:{
//             _id:"$status",
//             count:{
//             $sum:1
//             }
//             }
//             }
//             ]);
            
//             res.json({
//             status:1,
//             data
//             });
            
//             }catch(error){
            
//             res.status(500).json({
//             status:0,
//             message:error.message
//             });
            
//             }
//             };

//             exports.getValueTrend=async(req,res)=>{
//                 try{
                
//                 const trend=await TradeInvoice.aggregate([
//                 {
// $match:{
// createdBy:req.user._id
// }
// },
//                 {
//                 $group:{
//                 _id:{
//                 month:{
//                 $month:"$invoiceDate"
//                 }
//                 },
//                 value:{
//                 $sum:"$invoiceValue"
//                 }
//                 }
//                 },
//                 {
//                 $sort:{
//                 "_id.month":1
//                 }
//                 }
//                 ]);
                
//                 res.json({
//                 status:1,
//                 data:trend
//                 });
                
//                 }catch(error){
                
//                 res.status(500).json({
//                 status:0,
//                 message:error.message
//                 });
                
//                 }
//                 };

//                 exports.getRecentInvoices=async(req,res)=>{
//                     try{
                    
//                     const invoices=await TradeInvoice.find({createdBy:req.user._id})
//                     .sort({
//                     invoiceDate:-1
//                     })
//                     .limit(10);
                    
//                     res.json({
//                     status:1,
//                     data:invoices
//                     });
                    
//                     }catch(error){
                    
//                     res.status(500).json({
//                     status:0,
//                     message:error.message
//                     });
                    
//                     }
//                     };

//                     exports.getTopParties=async(req,res)=>{
//                         try{
                        
//                         const parties=await TradeInvoice.aggregate([
//                             {
// $match:{
// createdBy:req.user._id
// }
// },
//                         {
//                         $group:{
//                         _id:"$party",
//                         total:{
//                         $sum:"$invoiceValue"
//                         }
//                         }
//                         },
//                         {
//                         $sort:{
//                         total:-1
//                         }
//                         },
//                         {
//                         $limit:5
//                         }
//                         ]);
                        
//                         res.json({
//                         status:1,
//                         data:parties
//                         });
                        
//                         }catch(error){
                        
//                         res.status(500).json({
//                         status:0,
//                         message:error.message
//                         });
                        
//                         }
//                         };

//                         exports.getOverdueInvoices=async(req,res)=>{
//                             try{
                            
//                             const invoices=await TradeInvoice.find({
//                             createdBy:req.user._id,
//                             status:"Overdue"
//                             })
//                             .sort({
//                             dueDate:1
//                             });
                            
//                             res.json({
//                             status:1,
//                             data:invoices
//                             });
                            
//                             }catch(error){
                            
//                             res.status(500).json({
//                             status:0,
//                             message:error.message
//                             });
                            
//                             }
//                             };

//                             exports.getInsights=async(req,res)=>{
//                                 try{
                                
//                                 const paid=await TradeInvoice.countDocuments({
//                                 createdBy:req.user._id,
//                                 status:"Paid"
//                                 });
                                
//                                 const overdue=await TradeInvoice.countDocuments({
//                                 createdBy:req.user._id,
//                                 status:"Overdue"
//                                 });
                                
//                                 const pendingAmount=await TradeInvoice.aggregate([
//                                 {
//                                 $match:{
//                                 createdBy:req.user._id,
//                                 status:"Pending"
//                                 }
//                                 },
//                                 {
//                                 $group:{
//                                 _id:null,
//                                 amount:{
//                                 $sum:"$invoiceValue"
//                                 }
//                                 }
//                                 }
//                                 ]);
                                
//                                 res.json({
//                                 status:1,
//                                 data:{
//                                 paidInvoices:paid,
//                                 overdueInvoices:overdue,
//                                 pendingAmount:pendingAmount[0]?.amount||0
//                                 }
//                                 });
                                
//                                 }catch(error){
                                
//                                 res.status(500).json({
//                                 status:0,
//                                 message:error.message
//                                 });
                                
//                                 }
//                                 };

//                                 exports.getFilterOptions=async(req,res)=>{
//                                     try{
                                    
//                                     const countries=await TradeInvoice.distinct("country",{createdBy:req.user._id});
                                    
//                                     const types=await TradeInvoice.distinct("type",{createdBy:req.user._id});
                                    
//                                     const statuses=await TradeInvoice.distinct("status",{createdBy:req.user._id});
                                    
//                                     res.json({
//                                     status:1,
//                                     data:{
//                                     countries,
//                                     types,
//                                     statuses
//                                     }
//                                     });
                                    
//                                     }catch(error){
                                    
//                                     res.status(500).json({
//                                     status:0,
//                                     message:error.message
//                                     });
                                    
//                                     }
//                                     };

                                    

// mahima code //

const TradeInvoice = require("../models/TradeInvoice");
const Shipment = require("../models/Shipment");

const getMappedUserId = (req) =>
  req.user?.mappedUserId || req.user?._id;

const isAdmin = (req) => req.user?.roleName === "admin";

// Return a shipment-based scope for non-admin users.
// Admins can see all invoices.
const getInvoiceScope = async (req) => {
  if (isAdmin(req)) return {};

  const mappedUserId = getMappedUserId(req);

  if (!mappedUserId) {
    return { _id: null };
  }

  const userShipments = await Shipment.find({
    userId: mappedUserId,
  }).select("_id");

  return {
    shipment: {
      $in: userShipments.map((shipment) => shipment._id),
    },
  };
};

const applyInvoiceSearch = (filter, search) => {
  if (!search) return;

  filter.$and = [
    ...(filter.$and || []),
    {
      $or: [
        { invoiceNumber: { $regex: search, $options: "i" } },
        { party: { $regex: search, $options: "i" } },
        { billTo: { $regex: search, $options: "i" } },
      ],
    },
  ];
};

// ==========================================
// DASHBOARD SUMMARY
// ==========================================

exports.getDashboard = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const [
      totalInvoices,
      paidInvoices,
      pendingInvoices,
      overdueInvoices,
      invoiceStats,
    ] = await Promise.all([
      TradeInvoice.countDocuments(scope),
      TradeInvoice.countDocuments({ ...scope, status: "Paid" }),
      TradeInvoice.countDocuments({ ...scope, status: "Pending" }),
      TradeInvoice.countDocuments({ ...scope, status: "Overdue" }),
      TradeInvoice.aggregate([
        { $match: scope },
        {
          $group: {
            _id: null,
            totalValue: { $sum: "$invoiceValue" },
            averageValue: { $avg: "$invoiceValue" },
          },
        },
      ]),
    ]);

    return res.json({
      status: 1,
      data: {
        totalInvoices,
        paidInvoices,
        pendingInvoices,
        overdueInvoices,
        totalInvoiceValue: invoiceStats[0]?.totalValue || 0,
        averageInvoiceValue: invoiceStats[0]?.averageValue || 0,
      },
    });
  } catch (error) {
    console.error("GET INVOICE DASHBOARD ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// GET / FILTER INVOICES
// ==========================================

exports.getInvoices = async (req, res) => {
  try {
    const {
      search,
      status,
      type,
      country,
      partyType,
    } = req.query;

    const filter = await getInvoiceScope(req);

    if (status) filter.status = status;
    if (type) filter.type = type;

    applyInvoiceSearch(filter, search);

    const invoices = await TradeInvoice.find(filter)
      .populate({
        path: "shipment",
        select: `
          userId
          customerType
          createdByRole
          b2bCompanyId
          exporter
          importer
          route
          awbNumber
          sbNumber
          bookingNo
          cargo
        `,
      })
      .sort({ createdAt: -1 });

    const formattedInvoices = invoices.map((invoice) => {
      const invoiceData = invoice.toObject();
      const shipment = invoiceData.shipment || {};
      const party = invoiceData.party || "";

      const exporterName =
        shipment.exporter?.companyName || "";
      const importerName =
        shipment.importer?.companyName || "";

      let dynamicCountry = invoiceData.country || "";

      if (
        party.trim().toLowerCase() ===
        exporterName.trim().toLowerCase()
      ) {
        dynamicCountry = shipment.route?.originCountry || "";
      } else if (
        party.trim().toLowerCase() ===
        importerName.trim().toLowerCase()
      ) {
        dynamicCountry = shipment.route?.destinationCountry || "";
      }

      if (!dynamicCountry) {
        dynamicCountry =
          shipment.route?.destinationCountry ||
          shipment.route?.originCountry ||
          "N/A";
      }

      return {
        ...invoiceData,
        country: dynamicCountry,
        partyType:
          shipment.customerType ||
          (shipment.b2bCompanyId ? "B2B" : "Individual"),
      };
    });

    let finalInvoices = formattedInvoices;

    if (country) {
      finalInvoices = finalInvoices.filter(
        (invoice) =>
          invoice.country?.toLowerCase() === country.toLowerCase()
      );
    }

    if (partyType) {
      finalInvoices = finalInvoices.filter(
        (invoice) =>
          invoice.partyType?.toLowerCase() === partyType.toLowerCase()
      );
    }

    return res.json({
      status: 1,
      data: finalInvoices,
    });
  } catch (error) {
    console.error("GET INVOICES ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// STATUS SUMMARY
// ==========================================

exports.getStatusSummary = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const data = await TradeInvoice.aggregate([
      { $match: scope },
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    return res.json({ status: 1, data });
  } catch (error) {
    console.error("GET INVOICE STATUS SUMMARY ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// VALUE TREND
// ==========================================

exports.getValueTrend = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const trend = await TradeInvoice.aggregate([
      { $match: scope },
      {
        $group: {
          _id: {
            year: { $year: "$invoiceDate" },
            month: { $month: "$invoiceDate" },
          },
          value: { $sum: "$invoiceValue" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1 } },
    ]);

    return res.json({ status: 1, data: trend });
  } catch (error) {
    console.error("GET INVOICE VALUE TREND ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// RECENT INVOICES
// ==========================================

exports.getRecentInvoices = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const invoices = await TradeInvoice.find(scope)
      .populate("shipment", "sbNumber awbNumber bookingNo route")
      .sort({ invoiceDate: -1, createdAt: -1 })
      .limit(10);

    return res.json({ status: 1, data: invoices });
  } catch (error) {
    console.error("GET RECENT INVOICES ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// TOP PARTIES
// ==========================================

exports.getTopParties = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const parties = await TradeInvoice.aggregate([
      { $match: scope },
      {
        $group: {
          _id: "$party",
          total: { $sum: "$invoiceValue" },
        },
      },
      { $sort: { total: -1 } },
      { $limit: 5 },
    ]);

    return res.json({ status: 1, data: parties });
  } catch (error) {
    console.error("GET TOP INVOICE PARTIES ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// OVERDUE INVOICES
// ==========================================

exports.getOverdueInvoices = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const invoices = await TradeInvoice.find({
      ...scope,
      status: "Overdue",
    })
      .populate("shipment", "sbNumber awbNumber bookingNo route")
      .sort({ dueDate: 1 });

    return res.json({ status: 1, data: invoices });
  } catch (error) {
    console.error("GET OVERDUE INVOICES ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// INSIGHTS
// ==========================================

exports.getInsights = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const [paid, overdue, pendingAmount] = await Promise.all([
      TradeInvoice.countDocuments({
        ...scope,
        status: "Paid",
      }),
      TradeInvoice.countDocuments({
        ...scope,
        status: "Overdue",
      }),
      TradeInvoice.aggregate([
        {
          $match: {
            ...scope,
            status: "Pending",
          },
        },
        {
          $group: {
            _id: null,
            amount: { $sum: "$invoiceValue" },
          },
        },
      ]),
    ]);

    return res.json({
      status: 1,
      data: {
        paidInvoices: paid,
        overdueInvoices: overdue,
        pendingAmount: pendingAmount[0]?.amount || 0,
      },
    });
  } catch (error) {
    console.error("GET INVOICE INSIGHTS ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// FILTER OPTIONS
// ==========================================

exports.getFilterOptions = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);

    const [countries, types, statuses] = await Promise.all([
      TradeInvoice.distinct("country", scope),
      TradeInvoice.distinct("type", scope),
      TradeInvoice.distinct("status", scope),
    ]);

    return res.json({
      status: 1,
      data: {
        countries,
        types,
        statuses,
      },
    });
  } catch (error) {
    console.error("GET INVOICE FILTER OPTIONS ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// CREATE INVOICE FROM ACCEPTED QUOTATION
// POST /trade-invoices
// ==========================================

const Quotation = require("../models/quotationModel");

const makeInvoiceNumber = () => {
  const now = new Date();
  const datePart = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const randomPart = Math.floor(100000 + Math.random() * 900000);
  return `INV-${datePart}-${randomPart}`;
};

const toNumber = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : 0;
};

exports.createInvoiceFromAcceptedQuotation = async (req, res) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({
        status: 0,
        message: "Only admin can generate an invoice.",
      });
    }

    const { shipmentId, quotationId, dueDate, type, paymentTerms, paymentMode,
      poReference, gstin, pan, bankDetails, companyDetails, notes, remarks,
      freightCharges, insuranceCharges, handlingCharges, discount,
      cgst, sgst, igst, roundOff, items: requestedItems } = req.body;

    if (!shipmentId || !quotationId) {
      return res.status(400).json({
        status: 0,
        message: "shipmentId and quotationId are required.",
      });
    }

    const [shipment, quotation] = await Promise.all([
      Shipment.findById(shipmentId),
      Quotation.findById(quotationId),
    ]);

    if (!shipment) {
      return res.status(404).json({ status: 0, message: "Shipment not found." });
    }

    if (!quotation || String(quotation.shipmentId) !== String(shipment._id)) {
      return res.status(404).json({
        status: 0,
        message: "Quotation not found for this shipment.",
      });
    }

    if (quotation.status !== "Accepted") {
      return res.status(400).json({
        status: 0,
        message: "Invoice can only be generated after quotation acceptance.",
      });
    }

    const existingInvoice = await TradeInvoice.findOne({
      $or: [{ shipment: shipment._id }, { quotation: quotation._id }],
    });

    if (existingInvoice) {
      return res.status(409).json({
        status: 0,
        message: "An invoice has already been generated for this shipment/quotation.",
        data: existingInvoice,
      });
    }

    if (!shipment.userId) {
      return res.status(400).json({
        status: 0,
        message: "Shipment does not have an assigned user.",
      });
    }

    const exporter = shipment.exporter || {};
    const importer = shipment.importer || {};
    const cargo = shipment.cargo || {};
    const route = shipment.route || {};
    const consignee = {
      name: importer.companyName || shipment.buyer?.companyName || "",
      address: importer.address || "",
      email: importer.email || "",
      phone: importer.mobile || "",
      country: route.destinationCountry || shipment.buyer?.country || "",
    };

    const quoteItems = Array.isArray(requestedItems) && requestedItems.length
      ? requestedItems
      : (quotation.charges || []).map((charge) => ({
          description: charge.name || charge.description || "Quotation charge",
          hsCode: cargo.hsCodeText || "",
          qty: 1,
          unit: "Service",
          unitPrice: toNumber(charge.amount),
          total: toNumber(charge.amount),
        }));

    const items = quoteItems.map((item) => {
      const qty = toNumber(item.qty);
      const unitPrice = toNumber(item.unitPrice);
      return {
        description: item.description || "",
        hsCode: item.hsCode || cargo.hsCodeText || "",
        qty,
        unit: item.unit || "",
        unitPrice,
        total: item.total !== undefined ? toNumber(item.total) : qty * unitPrice,
      };
    });

    const subtotal = toNumber(quotation.subtotal) ||
      items.reduce((sum, item) => sum + item.total, 0);
    const invoiceDiscount = discount !== undefined
      ? toNumber(discount)
      : toNumber(quotation.discount);
    const invoiceFreight = toNumber(freightCharges);
    const invoiceInsurance = toNumber(insuranceCharges);
    const invoiceHandling = toNumber(handlingCharges);
    const taxableAmount = Math.max(
      0,
      subtotal + invoiceFreight + invoiceInsurance + invoiceHandling - invoiceDiscount
    );
    const invoiceCgst = toNumber(cgst);
    const invoiceSgst = toNumber(sgst);
    const invoiceIgst = toNumber(igst);
    const totalTax = invoiceCgst + invoiceSgst + invoiceIgst;
    const calculatedTotal = taxableAmount + totalTax + toNumber(roundOff);
    const totalAmount = calculatedTotal || toNumber(quotation.totalAmount);

    const invoice = await TradeInvoice.create({
      invoiceNumber: makeInvoiceNumber(),
      invoiceDate: new Date(),
      dueDate: dueDate || null,
      currency: quotation.currency || shipment.currency || "INR",
      status: "Pending",
      party: importer.companyName || exporter.companyName || consignee.name,
      type: type || "Commercial Invoice",
      country: route.destinationCountry || route.originCountry || "",
      invoiceValue: totalAmount,
      remarks: remarks || "",
      billTo: importer.companyName || shipment.buyer?.companyName || "",
      address: importer.address || "",
      consignee,
      companyDetails: companyDetails || {},
      gstin: gstin || "",
      pan: pan || "",
      paymentTerms: paymentTerms || shipment.paymentTerms || "",
      paymentMode: paymentMode || "",
      poReference: poReference || "",
      bankDetails: bankDetails || {},
      shipmentDetails: {
        awbNumber: shipment.awbNumber || "",
        awbDate: shipment.shipmentDate || null,
        portOfLoading: [route.originCity, route.originCountry].filter(Boolean).join(", "),
        portOfDischarge: [route.destinationCity, route.destinationCountry].filter(Boolean).join(", "),
        airline: shipment.carrier?.name || "",
        packages: toNumber(cargo.packages || shipment.additionalInformation?.packages),
        packageType: cargo.packingType || shipment.additionalInformation?.packagingType || "",
        grossWeight: toNumber(cargo.grossWeight || cargo.weight),
        grossWeightUnit: "kg",
        chargeableWeight: toNumber(cargo.volumetricWeight || cargo.weight),
        chargeableWeightUnit: "kg",
        countryOfOrigin: route.originCountry || "",
      },
      items,
      freightCharges: invoiceFreight,
      insuranceCharges: invoiceInsurance,
      handlingCharges: invoiceHandling,
      discount: invoiceDiscount,
      subtotal,
      taxableAmount,
      cgst: invoiceCgst,
      sgst: invoiceSgst,
      igst: invoiceIgst,
      totalTax,
      roundOff: toNumber(roundOff),
      totalAmount,
      notes: notes || quotation.notes || "",
      shipment: shipment._id,
      userId: shipment.userId,
      quotation: quotation._id,
      createdBy: req.user?._id || req.user?.id || null,
    });

    shipment.invoiceId = invoice._id;
    shipment.invoiceStatus = "Generated";
    shipment.workflowStatus = "Invoice Generated";
    shipment.invoice = {
      invoiceNumber: invoice.invoiceNumber,
      invoiceDate: invoice.invoiceDate,
      invoiceValue: invoice.totalAmount,
      currency: invoice.currency,
    };
    shipment.statusHistory.push({
      status: "Invoice Generated",
      updatedBy: req.user?._id || req.user?.id || null,
      remarks: `Invoice ${invoice.invoiceNumber} generated from accepted quotation.`,
      updatedAt: new Date(),
    });

    await shipment.save();

    return res.status(201).json({
      status: 1,
      message: "Invoice generated successfully.",
      data: invoice,
    });
  } catch (error) {
    console.error("CREATE INVOICE FROM QUOTATION ERROR:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// GET SINGLE INVOICE
// GET /trade-invoices/:id
// ==========================================

exports.getInvoiceById = async (req, res) => {
  try {
    const scope = await getInvoiceScope(req);
    const invoice = await TradeInvoice.findOne({
      _id: req.params.id,
      ...scope,
    })
      .populate("shipment")
      .populate("quotation");

    if (!invoice) {
      return res.status(404).json({ status: 0, message: "Invoice not found." });
    }

    return res.json({ status: 1, data: invoice });
  } catch (error) {
    console.error("GET INVOICE BY ID ERROR:", error);
    return res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// SEND INVOICE (MARK AS SENT)
// PUT /trade-invoices/:id/send
// ==========================================

exports.sendInvoice = async (req, res) => {
  try {
    if (!isAdmin(req)) {
      return res.status(403).json({ status: 0, message: "Only admin can send invoices." });
    }

    const invoice = await TradeInvoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ status: 0, message: "Invoice not found." });
    }

    const shipment = await Shipment.findById(invoice.shipment);
    if (!shipment) {
      return res.status(404).json({ status: 0, message: "Linked shipment not found." });
    }

    if (invoice.status === "Cancelled") {
      return res.status(400).json({ status: 0, message: "Cancelled invoice cannot be sent." });
    }

    shipment.invoiceStatus = "Sent";
    shipment.workflowStatus = "Invoice Sent";
    shipment.statusHistory.push({
      status: "Invoice Sent",
      updatedBy: req.user?._id || req.user?.id || null,
      remarks: `Invoice ${invoice.invoiceNumber} sent to customer.`,
      updatedAt: new Date(),
    });

    await shipment.save();

    return res.json({
      status: 1,
      message: "Invoice marked as sent. Connect your email/notification service separately if delivery is required.",
      data: invoice,
    });
  } catch (error) {
    console.error("SEND INVOICE ERROR:", error);
    return res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// UPDATE INVOICE STATUS
// PUT /trade-invoices/:id/status
// ==========================================

exports.updateInvoiceStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const allowedStatuses = ["Paid", "Pending", "Overdue", "Cancelled"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        status: 0,
        message: `Invalid invoice status. Allowed: ${allowedStatuses.join(", ")}`,
      });
    }

    const scope = await getInvoiceScope(req);
    const invoice = await TradeInvoice.findOne({ _id: req.params.id, ...scope });

    if (!invoice) {
      return res.status(404).json({ status: 0, message: "Invoice not found." });
    }

    if (!isAdmin(req) && status !== "Paid") {
      return res.status(403).json({
        status: 0,
        message: "Customers can only mark an invoice as Paid through the payment flow.",
      });
    }

    invoice.status = status;
    await invoice.save();

    if (status === "Paid" && invoice.shipment) {
      await Shipment.findByIdAndUpdate(invoice.shipment, {
        paymentStatus: "Paid",
        paidAmount: invoice.totalAmount,
        balanceAmount: 0,
        workflowStatus: "Invoice Paid",
      });
    }

    return res.json({
      status: 1,
      message: "Invoice status updated successfully.",
      data: invoice,
    });
  } catch (error) {
    console.error("UPDATE INVOICE STATUS ERROR:", error);
    return res.status(500).json({ status: 0, message: error.message });
  }
};