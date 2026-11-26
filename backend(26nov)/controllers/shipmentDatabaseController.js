// const Shipment = require("../models/Shipment");

// exports.getDashboard = async (req, res) => {
//     try {

//         const filter = {};

//         const { from, to, origin, destination, exporter, importer, status, hsCode } = req.query;

//         if (from && to) {
//             filter.shipmentDate = {
//                 $gte: new Date(from),
//                 $lte: new Date(to)
//             };
//         }

//         if (origin) filter["route.originCountry"] = origin;
//         if (destination) filter["route.destinationCountry"] = destination;
//         if (exporter) filter["exporter.companyName"] = exporter;
//         if (importer) filter["importer.companyName"] = importer;
//         if (status) filter.status = status;
//         if (hsCode) filter["cargo.hsCode"] = hsCode;

//         const totalShipments = await Shipment.countDocuments(filter);

//         const totalValue = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     total: { $sum: "$cargo.value" }
//                 }
//             }
//         ]);

//         const exporters = await Shipment.distinct("exporter.companyName", filter);
//         const suppliers = await Shipment.distinct("supplier.companyName", filter);
//         const countries = await Shipment.distinct("route.originCountry", filter);

//         const avgShipmentValue = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     avg: { $avg: "$cargo.value" }
//                 }
//             }
//         ]);

//         const avgLeadTime = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     avg: { $avg: "$leadTime" }
//                 }
//             }
//         ]);

//         return res.status(200).json({
//             status: 1,
//             message: "Shipment dashboard fetched successfully",
//             data: {
//                 totalShipments,
//                 totalValue: totalValue[0]?.total || 0,
//                 totalExporters: exporters.length,
//                 totalSuppliers: suppliers.length,
//                 countries: countries.length,
//                 avgShipmentValue: Math.round(avgShipmentValue[0]?.avg || 0),
//                 avgLeadTime: Math.round(avgLeadTime[0]?.avg || 0)
//             }
//         });

//     } catch (error) {

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getShipments = async (req, res) => {
//     try {

//         const page = parseInt(req.query.page) || 1;
//         const limit = parseInt(req.query.limit) || 50;
//         const skip = (page - 1) * limit;

//         const filter = {};

//         if (req.query.origin)
//             filter["route.originCountry"] = req.query.origin;

//         if (req.query.destination)
//             filter["route.destinationCountry"] = req.query.destination;

//         if (req.query.exporter)
//             filter["exporter.companyName"] = req.query.exporter;

//         if (req.query.importer)
//             filter["importer.companyName"] = req.query.importer;

//         if (req.query.hsCode)
//             filter["cargo.hsCode"] = req.query.hsCode;

//         if (req.query.status)
//             filter.status = req.query.status;

//         const total = await Shipment.countDocuments(filter);

//         const shipments = await Shipment.find(filter)
//             .populate("cargo.hsCode", "hsCode description")
//             .sort({ shipmentDate: -1 })
//             .skip(skip)
//             .limit(limit);

//         return res.status(200).json({
//             status: 1,
//             total,
//             page,
//             pages: Math.ceil(total / limit),
//             data: shipments
//         });

//     } catch (error) {

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getFilterOptions = async (req, res) => {
//     try {

//         const hsCodes = await Shipment.distinct("cargo.hsCode");

//         const originCountries = await Shipment.distinct("route.originCountry");

//         const destinationCountries = await Shipment.distinct("route.destinationCountry");

//         const importers = await Shipment.distinct("importer.companyName");

//         const exporters = await Shipment.distinct("exporter.companyName");

//         const ports = await Shipment.distinct("route.originCity");

//         return res.status(200).json({
//             status: 1,
//             data: {
//                 hsCodes,
//                 originCountries,
//                 destinationCountries,
//                 importers,
//                 exporters,
//                 ports
//             }
//         });

//     } catch (error) {

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.exportReport = async (req, res) => {
//     try {

//         const filter = {};

//         const { from, to, origin, destination, exporter, importer, status, hsCode } = req.query;

//         if (from && to) {
//             filter.shipmentDate = {
//                 $gte: new Date(from),
//                 $lte: new Date(to)
//             };
//         }

//         if (origin) filter["route.originCountry"] = origin;
//         if (destination) filter["route.destinationCountry"] = destination;
//         if (exporter) filter["exporter.companyName"] = exporter;
//         if (importer) filter["importer.companyName"] = importer;
//         if (hsCode) filter["cargo.hsCode"] = hsCode;
//         if (status) filter.status = status;

//         const report = await Shipment.find(filter)
//             .populate("cargo.hsCode", "hsCode description")
//             .sort({ shipmentDate: -1 });

//         return res.status(200).json({
//             status: 1,
//             message: "Shipment report fetched successfully",
//             totalRecords: report.length,
//             data: report
//         });

//     } catch (error) {

//         console.log("Export Report Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// mahima code //

const MasterDataBatch = require("../models/MasterDataBatch");

// ==========================================
// HELPERS
// ==========================================

const normalizeKey = (key = "") =>
  String(key).toLowerCase().replace(/[^a-z0-9]/g, "");

const clean = (value) => String(value ?? "").trim();

const getValue = (record, aliases = []) => {
  const keys = Object.keys(record || {});
  const normalizedAliases = aliases.map(normalizeKey);

  const matchedKey = keys.find((key) =>
    normalizedAliases.includes(normalizeKey(key))
  );

  return matchedKey ? record[matchedKey] : "";
};

const toNumber = (value) => {
  if (typeof value === "number") return value;

  const parsed = Number(
    String(value ?? "")
      .replace(/,/g, "")
      .replace(/[^0-9.-]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

const normalizeMonth = (value) => {
  const month = clean(value).toLowerCase();
  if (!month) return "";

  const months = [
    "January", "February", "March", "April",
    "May", "June", "July", "August",
    "September", "October", "November", "December",
  ];

  const matched = months.find(
    (item) => item.toLowerCase() === month ||
      item.toLowerCase().startsWith(month)
  );

  return matched || month.charAt(0).toUpperCase() + month.slice(1);
};

const monthNumber = (month) => {
  const months = [
    "january", "february", "march", "april",
    "may", "june", "july", "august",
    "september", "october", "november", "december",
  ];

  return months.indexOf(clean(month).toLowerCase()) + 1;
};

const uniqueValues = (records, field) => [
  ...new Set(records.map((item) => clean(item[field])).filter(Boolean)),
].sort((a, b) => a.localeCompare(b));

// ==========================================
// LOAD IMPORT + EXPORT RECORDS
// ==========================================

const getAllShipmentRecords = async () => {
  const batches = await MasterDataBatch.find({
    dataType: { $in: ["import", "export"] },
  })
    .select("dataType records headers fileName createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const records = [];

  batches.forEach((batch) => {
    (batch.records || []).forEach((raw, index) => {
      const type = batch.dataType;

      const hsCode = clean(
        getValue(raw, [
          "HS Code", "HSCode", "HS_Code",
          "ITC HS Code", "HSN Code", "Commodity Code",
        ])
      );

      const productName = clean(
        getValue(raw, [
          "Product Description", "Product Name",
          "Product", "Description", "Commodity",
          "Item Description", "Goods Description",
        ])
      );

      const country = clean(
        getValue(raw, [
          "Country", "Destination Country",
          "Origin Country", "Country of Origin",
          "Country of Destination", "Import Country",
        ])
      );

      const quantity = toNumber(
        getValue(raw, ["Quantity", "Qty", "Net Quantity"])
      );

      const value = toNumber(
        getValue(raw, [
          "FOB Value", "FOB", "Assess Value",
          "Assessment Value", "Access Value",
          "Invoice Value", "Export Value",
          "Total Value", "Value",
        ])
      );

      const month = normalizeMonth(
        getValue(raw, ["Month", "Export Month", "Shipment Month"])
      );

      const year = clean(
        getValue(raw, ["Year", "Export Year", "Shipment Year"])
      );

      const exporter = clean(
        getValue(raw, [
          "Exporter", "Exporter Name",
          "Shipper", "Shipper Name", "Indian Exporter",
        ])
      );

      const importer = clean(
        getValue(raw, [
          "Importer", "Importer Name",
          "Importer Names", "Consignee",
          "Consignee Name", "Buyer", "Buyer Name",
        ])
      );

      const buyer = clean(
        getValue(raw, [
          "Buyer",
          "Buyer Name",
          "Consignee",
          "Consignee Name",
          "Cosignee",
          "Cosignee Name",
        ])
      );

      const supplier = clean(
        getValue(raw, [
          "Supplier", "Supplier Name", "Supplier Names",
        ])
      );

      // Use the same field names for both directions.
      records.push({
        ...raw,

        _id: `${batch._id}-${index + 1}`,
        shipmentId: `${type.toUpperCase()}-${String(batch._id).slice(-6).toUpperCase()}-${String(index + 1).padStart(5, "0")}`,

        type: type === "import" ? "Import" : "Export",

        batchId: batch._id,
        fileName: batch.fileName || "",
        uploadedAt: batch.createdAt || null,
        rowNumber: index + 1,

        hsCode,
        productName,
        country,
        quantity,
        value,
        month,
        year,

        exporter,
        importer,
buyer,
supplier,

        // Unified company field for table/filter display
        company: type === "import"
          ? (supplier || importer)
          : (exporter || importer),
      });
    });
  });

  return records;
};

// ==========================================
// FILTER RECORDS
// ==========================================

const filterShipmentRecords = (records, query = {}) => {
    const {
        search,
        type,
        from,
        to,
        hsCode,
        country,
        exporter,
        importer,
        supplier,
        buyer,
        month,
        year,
      } = query;

  const searchText = clean(search).toLowerCase();

  const selected = (actual, expected) => {
    if (!expected || expected === "All") return true;

    return clean(actual).toLowerCase() ===
      clean(expected).toLowerCase();
  };

  const getRecordDate = (item) => {
    if (!item.year) return null;

    const month = monthNumber(item.month);
    if (!month) return null;

    return new Date(Number(item.year), month - 1, 1);
  };

  const fromDate = from ? new Date(`${from}T00:00:00`) : null;
  const toDate = to ? new Date(`${to}T23:59:59.999`) : null;

  return records.filter((item) => {
    if (type && type !== "All") {
      if (item.type.toLowerCase() !== type.toLowerCase()) return false;
    }

    if (!selected(item.hsCode, hsCode)) return false;
    if (!selected(item.country, country)) return false;
    if (!selected(item.exporter, exporter)) return false;
    if (!selected(item.importer, importer)) return false;
    if (!selected(item.supplier, supplier)) return false;
    if (!selected(item.buyer, buyer)) return false;
    if (!selected(item.month, month)) return false;
    if (!selected(item.year, year)) return false;

    const recordDate = getRecordDate(item);

    if (fromDate && (!recordDate || recordDate < fromDate)) return false;
    if (toDate && (!recordDate || recordDate > toDate)) return false;

    if (searchText) {
      const searchable = Object.entries(item)
        .filter(([key]) => !key.startsWith("_"))
        .map(([, value]) => clean(value).toLowerCase())
        .join(" ");

      if (!searchable.includes(searchText)) return false;
    }

    return true;
  });
};

const getFilteredRecords = async (req) => {
  const records = await getAllShipmentRecords();
  return filterShipmentRecords(records, req.query);
};

// ==========================================
// PAGINATION
// ==========================================

const paginate = (records, page = 1, limit = 10) => {
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));

  const totalRecords = records.length;
  const totalPages = Math.ceil(totalRecords / pageSize);
  const start = (currentPage - 1) * pageSize;

  return {
    records: records.slice(start, start + pageSize),
    pagination: {
      currentPage,
      limit: pageSize,
      totalRecords,
      totalPages,
      hasNextPage: currentPage < totalPages,
      hasPrevPage: currentPage > 1,
    },
  };
};

// ==========================================
// DASHBOARD STATS
// ==========================================

exports.getDashboard = async (req, res) => {
  try {
    const records = await getFilteredRecords(req);

    const imports = records.filter((item) => item.type === "Import");
    const exports = records.filter((item) => item.type === "Export");

    const totalValue = records.reduce(
      (sum, item) => sum + item.value, 0
    );

    const totalImportValue = imports.reduce(
      (sum, item) => sum + item.value, 0
    );

    const totalExportValue = exports.reduce(
      (sum, item) => sum + item.value, 0
    );

    const totalQuantity = records.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    return res.status(200).json({
      status: 1,
      message: "Combined shipment dashboard fetched successfully",

      data: {
        totalShipments: records.length,

        totalImports: imports.length,
        totalExports: exports.length,

        totalValue,
        totalImportValue,
        totalExportValue,

        totalImporters: new Set(
          records.map((item) => item.importer).filter(Boolean)
        ).size,

        totalExporters: new Set(
          records.map((item) => item.exporter).filter(Boolean)
        ).size,

        totalSuppliers: new Set(
          records.map((item) => item.supplier).filter(Boolean)
        ).size,

        totalCountries: new Set(
          records.map((item) => item.country).filter(Boolean)
        ).size,

        totalQuantity,

        avgShipmentValue: records.length
          ? Math.round(totalValue / records.length)
          : 0,
      },
    });
  } catch (error) {
    console.error("Shipment Dashboard Error:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};

// ==========================================
// SHIPMENTS LIST
// ==========================================

exports.getShipments = async (req, res) => {
    try {
      const records = await getFilteredRecords(req);
  
      const sorted = records.sort((a, b) => {
        const dateA = Number(a.year) * 12 + monthNumber(a.month);
        const dateB = Number(b.year) * 12 + monthNumber(b.month);
  
        if (dateB !== dateA) return dateB - dateA;
  
        return new Date(b.uploadedAt || 0) -
          new Date(a.uploadedAt || 0);
      });
  
      const result = paginate(
        sorted,
        req.query.page,
        req.query.limit
      );
  
      return res.status(200).json({
        status: 1,
        message: "Combined import/export records fetched successfully",
        data: result.records,
        pagination: result.pagination,
      });
    } catch (error) {
      console.error("Get Shipments Error:", error);
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
      const records = await getAllShipmentRecords();
  
      return res.status(200).json({
        status: 1,
        data: {
          types: ["Import", "Export"],
          hsCodes: uniqueValues(records, "hsCode"),
          countries: uniqueValues(records, "country"),
          exporters: uniqueValues(records, "exporter"),
          importers: uniqueValues(records, "importer"),
          suppliers: uniqueValues(records, "supplier"),
          buyers: uniqueValues(records, "buyer"),
          months: uniqueValues(records, "month"),
          years: uniqueValues(records, "year").sort(
            (a, b) => Number(b) - Number(a)
          ),
        },
      });
    } catch (error) {
      console.error("Shipment Filter Options Error:", error);
      return res.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  };

// ==========================================
// EXPORT REPORT
// ==========================================

exports.exportReport = async (req, res) => {
  try {
    const records = await getFilteredRecords(req);

    const sorted = records.sort((a, b) => {
      const dateA = Number(a.year) * 12 + monthNumber(a.month);
      const dateB = Number(b.year) * 12 + monthNumber(b.month);
      return dateB - dateA;
    });

    return res.status(200).json({
      status: 1,
      message: "Combined shipment report fetched successfully",
      totalRecords: sorted.length,
      data: sorted,
    });
  } catch (error) {
    console.error("Shipment Export Report Error:", error);
    return res.status(500).json({
      status: 0,
      message: error.message,
    });
  }
};