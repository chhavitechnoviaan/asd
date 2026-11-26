const TradeInvoice = require("../models/TradeInvoice");
const Shipment = require("../models/Shipment");
const B2BQuotation = require("../models/quotationModel");
const Setting = require("../models/Setting");
// ==========================================
// POPULATION CONFIG
// ==========================================

const shipmentPopulate = {
  path: "shipment",
  populate: [
    {
      path: "userId",
      select: "name companyName country address email phone",
    },
    {
      path: "b2bCompanyId",
      select: "company location email phone",
    },
  ],
};



const getMappedUserId = (req) =>
  req.user?.mappedUserId || req.user?._id;

// Safely get the first non-empty value from multiple possible paths.
const firstValue = (...values) =>
  values.find(
    (value) =>
      value !== undefined &&
      value !== null &&
      value !== ""
  );

const toNumber = (value, fallback = 0) => {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : fallback;
};

// Indian numbering system: Crore, Lakh, Thousand, Hundred.
const numberToWords = (value) => {
  const number = Math.round(toNumber(value) * 100) / 100;
  if (number === 0) return "Zero";

  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven",
    "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen",
    "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen",
    "Nineteen",
  ];
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty",
    "Sixty", "Seventy", "Eighty", "Ninety",
  ];

  const underThousand = (n) => {
    let result = "";
    if (n >= 100) {
      result += `${ones[Math.floor(n / 100)]} Hundred `;
      n %= 100;
    }
    if (n >= 20) {
      result += `${tens[Math.floor(n / 10)]} `;
      n %= 10;
    }
    if (n > 0) result += `${ones[n]} `;
    return result.trim();
  };

  const integerToWords = (n) => {
    if (n === 0) return "Zero";
    const parts = [];
    const groups = [
      ["Crore", 10000000],
      ["Lakh", 100000],
      ["Thousand", 1000],
      ["", 1],
    ];

    for (const [label, divisor] of groups) {
      if (n >= divisor) {
        const amount = Math.floor(n / divisor);
        parts.push(
          `${underThousand(amount)}${label ? ` ${label}` : ""}`.trim()
        );
        n %= divisor;
      }
    }
    return parts.join(" ").trim();
  };

  const rupees = Math.floor(number);
  const paise = Math.round((number - rupees) * 100);
  let words = `${integerToWords(rupees)} Rupees`;
  if (paise > 0) words += ` and ${integerToWords(paise)} Paise`;
  return `${words} Only`;
};

// ==========================================
// CREATE INVOICE
// ==========================================

exports.createInvoice = async (req, res) => {
  try {
    let invoiceData = req.body?.invoice || req.body;

    // Support JSON string payloads (e.g. multipart FormData).
    if (typeof invoiceData === "string") {
      try {
        invoiceData = JSON.parse(invoiceData);
      } catch {
        return res.status(400).json({
          success: false,
          message: "Invalid invoice JSON payload",
        });
      }
    }

    if (!invoiceData || typeof invoiceData !== "object") {
      return res.status(400).json({
        success: false,
        message: "Invoice data is required",
      });
    }

    const {
      shipmentId,
      quotationId,
      invoiceNumber,
      invoiceDate,
      dueDate,
      currency,
      billTo,
      address,
      consignee,
      companyDetails,
      gstin,
      pan,
      paymentTerms,
      paymentMode,
      poReference,
      bankDetails,
      shipmentDetails: submittedShipmentDetails,
      items,
      freightCharges,
      insuranceCharges,
      handlingCharges,
      discount,
      cgst: submittedCgst,
      sgst: submittedSgst,
      igst: submittedIgst,
      roundOff: submittedRoundOff,
      notes,
      country,
      type,
    } = invoiceData;

    if (!shipmentId) {
      return res.status(400).json({
        success: false,
        message: "Shipment ID is required",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // ==========================================
    // VALIDATE SHIPMENT & ACCESS
    // ==========================================

    const mappedUserId = getMappedUserId(req);
    const isAdmin = req.user.roleName === "admin";

    if (!isAdmin) {
      return res.status(403).json({
        success: false,
        message: "Only admin can generate an invoice",
      });
    }

    const shipmentQuery = isAdmin
      ? { _id: shipmentId }
      : { _id: shipmentId, userId: mappedUserId };

    const shipment = await Shipment.findOne(shipmentQuery)
      .populate("userId")
      .populate("b2bCompanyId");

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found or access denied",
      });
    }

    const invoiceUserId =
      shipment.userId?._id || shipment.userId || mappedUserId;

    if (!invoiceUserId) {
      return res.status(400).json({
        success: false,
        message: "User could not be identified for this shipment",
      });
    }

    // ==========================================
    // BILL TO DETAILS
    // ==========================================

    const company = shipment.b2bCompanyId || {};
    const shipmentUser = shipment.userId || {};

    let finalBillTo = billTo || "";
    let finalAddress = address || "";

    if (shipment.createdByRole === "B2B") {
      if (!finalBillTo) {
        finalBillTo = company.company || "";
      }
      if (!finalAddress) {
        finalAddress = [
          company.location?.address,
          company.location?.city,
          company.location?.state,
          company.location?.country,
        ].filter(Boolean).join(", ");
      }
    } else {
      if (!finalBillTo) {
        finalBillTo =
          shipmentUser.companyName || shipmentUser.name || "";
      }
      if (!finalAddress) {
        finalAddress = shipmentUser.address || "";
      }
    }

    if (!finalBillTo) {
      return res.status(400).json({
        success: false,
        message: "Bill To details are required",
      });
    }

    // ==========================================
    // VALIDATE ACCEPTED QUOTATION
    // ==========================================
    let quotation = null;

    if (quotationId) {
      quotation = await B2BQuotation.findById(quotationId);
    } else {
      quotation = await B2BQuotation.findOne({ shipmentId: shipment._id })
        .sort({ createdAt: -1 });
    }

    if (!quotation) {
      return res.status(400).json({
        success: false,
        message: "No quotation found for this shipment. Create and send a quotation first.",
      });
    }

    const linkedShipmentId = quotation.shipmentId || quotation.shipment;
    if (!linkedShipmentId || linkedShipmentId.toString() !== shipment._id.toString()) {
      return res.status(400).json({
        success: false,
        message: "Selected quotation does not belong to this shipment",
      });
    }

    const creatorRole = String(shipment.createdByRole || "").trim().toLowerCase();
    const customerType = String(shipment.customerType || "").trim().toLowerCase();

    // Explicit B2B markers always take priority, including Admin-created
    // shipments that are actually linked to a B2B company.
    const isB2BShipment =
      creatorRole === "b2b" ||
      customerType === "b2b" ||
      Boolean(shipment.b2bCompanyId);

    const isAdminCreatedShipment = creatorRole === "admin" && !isB2BShipment;
    const isAdminOnlyShipment =
      !isB2BShipment &&
      (
        creatorRole === "user" ||
        customerType === "individual" ||
        !creatorRole ||
        isAdminCreatedShipment
      );

    // Normal User and Admin-created non-B2B invoices are prepared internally
    // by Admin after quotation creation. B2B still requires acceptance.
    if (!isAdminOnlyShipment && quotation.status !== "Accepted") {
      return res.status(409).json({
        success: false,
        message: `Invoice cannot be generated. Quotation status is ${quotation.status}. Customer acceptance is required.`,
        quotationStatus: quotation.status,
      });
    }

    const existingInvoice = await TradeInvoice.findOne({
      $or: [{ shipment: shipment._id }, { quotation: quotation._id }],
    });
    if (existingInvoice) {
      return res.status(409).json({
        success: false,
        message: "An invoice already exists for this shipment/quotation.",
        data: existingInvoice,
      });
    }

    // ==========================================
    // PREPARE ITEMS
    // ==========================================

    if (items !== undefined && !Array.isArray(items)) {
      return res.status(400).json({
        success: false,
        message: "Invoice items must be an array",
      });
    }

    const formattedItems = (items || []).map((item) => {
      const qty = Math.max(0, toNumber(item.qty));
      const unitPrice = Math.max(0, toNumber(item.unitPrice));

      return {
        name: item.name || "",
        description: item.description || "",
        qty,
        unit: item.unit || "",
        unitPrice,
        total: Math.round(qty * unitPrice * 100) / 100,
      };
    });

    // ==========================================
    // CALCULATIONS
    // ==========================================

    const subtotal = formattedItems.reduce(
      (sum, item) => sum + item.total,
      0
    );

    const parsedFreightCharges = Math.max(0, toNumber(freightCharges));
    const parsedInsuranceCharges = Math.max(0, toNumber(insuranceCharges));
    const parsedHandlingCharges = Math.max(0, toNumber(handlingCharges));
    const parsedDiscount = Math.max(0, toNumber(discount));

    const taxableAmount = Math.max(
      0,
      subtotal +
        parsedFreightCharges +
        parsedInsuranceCharges +
        parsedHandlingCharges -
        parsedDiscount
    );

    // Preserve current 9% CGST + 9% SGST behavior unless the
    // frontend explicitly submits tax amounts or an IGST amount.
    const igst = Math.max(0, toNumber(submittedIgst));
    let cgst = 0;
    let sgst = 0;

    if (igst > 0) {
      cgst = 0;
      sgst = 0;
    } else if (
      submittedCgst !== undefined ||
      submittedSgst !== undefined
    ) {
      cgst = Math.max(0, toNumber(submittedCgst));
      sgst = Math.max(0, toNumber(submittedSgst));
    } else {
      cgst = taxableAmount * 0.09;
      sgst = taxableAmount * 0.09;
    }

    const totalTax =
      Math.round((cgst + sgst + igst) * 100) / 100;

    const beforeRoundOff =
      Math.round((taxableAmount + totalTax) * 100) / 100;

    const roundOff =
      submittedRoundOff !== undefined
        ? toNumber(submittedRoundOff)
        : Math.round(beforeRoundOff) - beforeRoundOff;

    const totalAmount =
      Math.round((beforeRoundOff + roundOff) * 100) / 100;

    // ==========================================
    // SNAPSHOT COMPANY DETAILS
    // Prefer values explicitly submitted by admin.
    // Configure defaults in the frontend/settings later.
    // ==========================================

    const finalCompanyDetails = {
      companyName: firstValue(
        companyDetails?.companyName,
        companyDetails?.name,
        ""
      ),
      address: firstValue(companyDetails?.address, ""),
      email: firstValue(companyDetails?.email, ""),
      phone: firstValue(companyDetails?.phone, ""),
      logo: firstValue(
        companyDetails?.logo,
        companyDetails?.companyLogo,
        ""
      ),
    };

    // ==========================================
    // SNAPSHOT CONSIGNEE DETAILS
    // Shipment importer is used as the default consignee.
    // ==========================================

    const importer =
      shipment.importer ||
      shipment.parties?.importer ||
      {};

    const finalConsignee = {
      name: firstValue(
        consignee?.name,
        consignee?.companyName,
        importer.companyName,
        importer.name,
        ""
      ),
      address: firstValue(
        consignee?.address,
        importer.address,
        importer.fullAddress,
        ""
      ),
      email: firstValue(
        consignee?.email,
        importer.email,
        ""
      ),
      phone: firstValue(
        consignee?.phone,
        importer.phone,
        importer.mobile,
        ""
      ),
      country: firstValue(
        consignee?.country,
        importer.country,
        shipment.route?.destinationCountry,
        ""
      ),
    };

    // ==========================================
    // SNAPSHOT SHIPMENT DETAILS
    // Explicitly submitted values take precedence.
    // Fallback paths cover common shipment structures.
    // ==========================================

    const cargo =
      shipment.cargo ||
      shipment.shipmentInfo ||
      shipment.goods ||
      {};

    const header = shipment.header || {};
    const route = shipment.route || {};

    const finalShipmentDetails = {
      awbNumber: firstValue(
        submittedShipmentDetails?.awbNumber,
        submittedShipmentDetails?.awb,
        shipment.awbNumber,
        shipment.awbNo,
        shipment.blNumber,
        shipment.sbNumber,
        header.awbNumber,
        header.awbNo,
        ""
      ),
      awbDate: firstValue(
        submittedShipmentDetails?.awbDate,
        shipment.awbDate,
        shipment.blDate,
        null
      ),
      portOfLoading: firstValue(
        submittedShipmentDetails?.portOfLoading,
        shipment.portOfLoading,
        route.portOfLoading,
        route.originPort,
        route.origin,
        ""
      ),
      portOfDischarge: firstValue(
        submittedShipmentDetails?.portOfDischarge,
        shipment.portOfDischarge,
        route.portOfDischarge,
        route.destinationPort,
        route.destination,
        ""
      ),
      airline: firstValue(
        submittedShipmentDetails?.airline,
        shipment.airline,
        shipment.carrier,
        shipment.carrierName,
        ""
      ),
      packages: Math.max(
        0,
        toNumber(firstValue(
          submittedShipmentDetails?.packages,
          cargo.totalPackages,
          cargo.packages,
          shipment.totalPackages,
          shipment.packages,
          0
        ))
      ),
      packageType: firstValue(
        submittedShipmentDetails?.packageType,
        cargo.packageType,
        cargo.packagingType,
        shipment.packageType,
        ""
      ),
      grossWeight: Math.max(
        0,
        toNumber(firstValue(
          submittedShipmentDetails?.grossWeight,
          cargo.grossWeight,
          shipment.grossWeight,
          0
        ))
      ),
      grossWeightUnit: firstValue(
        submittedShipmentDetails?.grossWeightUnit,
        cargo.grossWeightUnit,
        shipment.grossWeightUnit,
        "kg"
      ),
      chargeableWeight: Math.max(
        0,
        toNumber(firstValue(
          submittedShipmentDetails?.chargeableWeight,
          cargo.chargeableWeight,
          shipment.chargeableWeight,
          0
        ))
      ),
      chargeableWeightUnit: firstValue(
        submittedShipmentDetails?.chargeableWeightUnit,
        cargo.chargeableWeightUnit,
        shipment.chargeableWeightUnit,
        "kg"
      ),
      countryOfOrigin: firstValue(
        submittedShipmentDetails?.countryOfOrigin,
        route.originCountry,
        shipment.countryOfOrigin,
        ""
      ),
    };

    const finalBankDetails = {
      accountName: firstValue(bankDetails?.accountName, ""),
      accountNumber: firstValue(bankDetails?.accountNumber, ""),
      bankName: firstValue(bankDetails?.bankName, ""),
      branch: firstValue(bankDetails?.branch, ""),
      ifscCode: firstValue(bankDetails?.ifscCode, ""),
    };

    // ==========================================
    // CREATE INVOICE
    // ==========================================
// Generate invoice number from the logged-in admin's settings.
// The sequence increment is atomic, so concurrent requests
// cannot receive the same sequence number.

const invoiceSettings = await Setting.findOneAndUpdate(
  { userId: req.user._id },
  {
    $inc: {
      invoiceSequence: 1
    }
  },
  {
    new: true,
    upsert: true,
    setDefaultsOnInsert: true
  }
);

const savedPrefix = String(
  invoiceSettings.invoicePrefix || "INV-"
).trim();

const normalizedPrefix = savedPrefix.replace(/-+$/, "");

const finalInvoiceNumber =
  `${normalizedPrefix}-${String(invoiceSettings.invoiceSequence).padStart(4, "0")}`;

    const invoice = await TradeInvoice.create({
      invoiceNumber: finalInvoiceNumber,
      invoiceDate: invoiceDate ? new Date(invoiceDate) : new Date(),
      dueDate: dueDate ? new Date(dueDate) : null,
      currency: currency || "INR",
      status: "Pending",

      // Existing legacy fields are retained for dashboards/reports.
      party: finalBillTo,
      type: type || "Commercial Invoice",
      country: firstValue(
        country,
        finalConsignee.country,
        company.location?.country,
        ""
      ),
      invoiceValue: totalAmount,
      remarks: notes || "",

      // Billing
      billTo: finalBillTo,
      address: finalAddress,

      // New reference-invoice sections
      companyDetails: finalCompanyDetails,
      consignee: finalConsignee,
      shipmentDetails: finalShipmentDetails,
      bankDetails: finalBankDetails,
      gstin: gstin || "",
      pan: pan || "",

      // Payment
      paymentTerms: paymentTerms || "",
      paymentMode: paymentMode || "",
      poReference: poReference || "",

      // Items and charges
      items: formattedItems,
      freightCharges: parsedFreightCharges,
      insuranceCharges: parsedInsuranceCharges,
      handlingCharges: parsedHandlingCharges,
      discount: parsedDiscount,

      // Tax and totals
      subtotal: Math.round(subtotal * 100) / 100,
      taxableAmount: Math.round(taxableAmount * 100) / 100,
      cgst: Math.round(cgst * 100) / 100,
      sgst: Math.round(sgst * 100) / 100,
      igst: Math.round(igst * 100) / 100,
      totalTax,
      roundOff: Math.round(roundOff * 100) / 100,
      totalAmount,
      amountInWords: numberToWords(totalAmount),

      notes: notes || "",

      // Relations
      userId: invoiceUserId,
      shipment: shipmentId,
      quotation: quotation._id,
      createdBy: req.user?._id || null,
    });

    // UPDATE SHIPMENT WORKFLOW STATUS AFTER INVOICE GENERATION
// Update shipment workflow after invoice generation
shipment.invoiceId = invoice._id;
shipment.invoiceStatus = "Generated";
shipment.workflowStatus = "Invoice Generated";
shipment.lastStatusUpdatedAt = new Date();

if (!Array.isArray(shipment.statusHistory)) {
  shipment.statusHistory = [];
}

shipment.statusHistory.push({
  status: "Invoice Generated",
  updatedBy: req.user?._id,
  remarks: `Invoice ${invoice.invoiceNumber} generated successfully`,
  updatedAt: new Date(),
});

await shipment.save();

    return res.status(201).json({
      success: true,
      message: "Invoice created successfully",
      data: invoice,
    });
  } catch (error) {
    console.error("CREATE INVOICE ERROR:", error);

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Invoice number already exists. Please use a unique invoice number.",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Failed to create invoice",
      error: error.message,
    });
  }
};

// ==========================================
// GET INVOICES BY SHIPMENT
// ==========================================

exports.getInvoicesByShipment = async (req, res) => {
  try {
    const { shipmentId } = req.params;
    const mappedUserId = getMappedUserId(req);

    const shipmentQuery =
      req.user?.roleName === "admin"
        ? { _id: shipmentId }
        : { _id: shipmentId, userId: mappedUserId };

    const shipment = await Shipment.findOne(shipmentQuery);

    if (!shipment) {
      return res.status(404).json({
        success: false,
        message: "Shipment not found or access denied",
      });
    }

    const creatorRole = String(shipment.createdByRole || "").trim().toLowerCase();
    const customerType = String(shipment.customerType || "").trim().toLowerCase();
    const isB2BShipment = creatorRole === "b2b" || customerType === "b2b" || Boolean(shipment.b2bCompanyId);
    if (req.user?.roleName !== "admin" && !isB2BShipment) {
      return res.status(403).json({ success: false, message: "Invoices for Normal User shipments are Admin-only." });
    }

    const invoices = await TradeInvoice.find({ shipment: shipmentId })
      .populate(shipmentPopulate)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      data: invoices,
    });
  } catch (error) {
    console.error("GET INVOICES ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch invoices",
      error: error.message,
    });
  }
};

// ==========================================
// GET SINGLE INVOICE
// ==========================================

exports.getInvoiceById = async (req, res) => {
  try {
    const invoice = await TradeInvoice.findById(req.params.invoiceId)
      .populate(shipmentPopulate)
      .populate("createdBy", "name email companyName");

    if (!invoice) {
      return res.status(404).json({
        success: false,
        message: "Invoice not found",
      });
    }

    const invoiceShipment = await Shipment.findById(invoice.shipment);
    const creatorRole = String(invoiceShipment?.createdByRole || "").trim().toLowerCase();
    const customerType = String(invoiceShipment?.customerType || "").trim().toLowerCase();
    const isB2BShipment = creatorRole === "b2b" || customerType === "b2b" || Boolean(invoiceShipment?.b2bCompanyId);
    if (req.user?.roleName !== "admin" && !isB2BShipment) {
      return res.status(403).json({ success: false, message: "Invoices for Normal User shipments are Admin-only." });
    }

    if (req.user?.roleName !== "admin") {
      const mappedUserId = getMappedUserId(req);
      const invoiceShipmentUserId =
        invoice.shipment?.userId?._id ||
        invoice.shipment?.userId;

      if (
        !invoiceShipmentUserId ||
        invoiceShipmentUserId.toString() !== mappedUserId.toString()
      ) {
        return res.status(403).json({
          success: false,
          message: "Access denied",
        });
      }
    }

    return res.status(200).json({
      success: true,
      data: invoice,
    });
  } catch (error) {
    console.error("GET SINGLE INVOICE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch invoice",
      error: error.message,
    });
  }
};

// ==========================================
// MARK INVOICE AS SENT
// This records the send state in CargoMate. It does not send email/SMS.
// ==========================================
exports.sendInvoice = async (req, res) => {
  try {
    if (req.user?.roleName !== "admin") {
      return res.status(403).json({ success: false, message: "Only admin can send invoices" });
    }

    const invoice = await TradeInvoice.findById(req.params.invoiceId);
    if (!invoice) {
      return res.status(404).json({ success: false, message: "Invoice not found" });
    }

    const shipment = await Shipment.findById(invoice.shipment);
    if (!shipment) {
      return res.status(404).json({ success: false, message: "Linked shipment not found" });
    }

    const creatorRole = String(shipment.createdByRole || "").trim().toLowerCase();
    const customerType = String(shipment.customerType || "").trim().toLowerCase();
    const isB2BShipment = creatorRole === "b2b" || customerType === "b2b" || Boolean(shipment.b2bCompanyId);
    if (!isB2BShipment) {
      return res.status(403).json({ success: false, message: "Normal User invoices are Admin-only and cannot be shared or marked as sent." });
    }

    if (shipment.invoiceStatus === "Sent") {
      return res.status(200).json({ success: true, message: "Invoice is already marked as sent", data: invoice });
    }

    shipment.invoiceStatus = "Sent";
    shipment.workflowStatus = "Invoice Sent";
    shipment.lastStatusUpdatedAt = new Date();
    if (!Array.isArray(shipment.statusHistory)) shipment.statusHistory = [];
    shipment.statusHistory.push({
      status: "Invoice Sent",
      updatedBy: req.user._id,
      remarks: `Invoice ${invoice.invoiceNumber} marked as sent`,
      updatedAt: new Date(),
    });
    await shipment.save();

    return res.status(200).json({
      success: true,
      message: "Invoice marked as sent. Email/SMS delivery is not configured by this endpoint.",
      data: { invoice, shipmentStatus: shipment.workflowStatus },
    });
  } catch (error) {
    console.error("SEND INVOICE ERROR:", error);
    return res.status(500).json({ success: false, message: "Failed to mark invoice as sent", error: error.message });
  }
};