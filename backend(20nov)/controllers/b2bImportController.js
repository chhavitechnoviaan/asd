// const Shipment = require("../models/Shipment");

// exports.getDashboard = async (req, res) => {
//     try {

//         const filter = {};

//         const {
//             from,
//             to,
//             origin,
//             destination,
//             exporter,
//             importer,
//             supplier,
//             buyer,
//             status,
//             hsCode
//         } = req.query;

//         if (from && to) {
//             filter.shipmentDate = {
//                 $gte: new Date(from),
//                 $lte: new Date(to)
//             };
//         }

//         if (origin) {
//             filter["route.origin"] = origin;
//         }

//         if (destination) {
//             filter["route.destination"] = destination;
//         }

//         if (exporter) {
//             filter["exporter.companyName"] = exporter;
//         }

//         if (importer) {
//             filter["importer.companyName"] = importer;
//         }

//         if (supplier) {
//             filter["supplier.companyName"] = supplier;
//         }

//         if (buyer) {
//             filter["buyer.companyName"] = buyer;
//         }

//         if (status) {
//             filter.status = status;
//         }

//         if (hsCode) {
//             filter["cargo.hsCode"] = hsCode;
//         }

//         const totalShipments = await Shipment.countDocuments(filter);

//         const totalImportValue = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     total: {
//                         $sum: "$cargo.value"
//                     }
//                 }
//             }
//         ]);

//         const importers = await Shipment.distinct(
//             "importer.companyName",
//             filter
//         );

//         const suppliers = await Shipment.distinct(
//             "supplier.companyName",
//             filter
//         );

//         const countries = await Shipment.distinct(
//             "route.origin",
//             filter
//         );

//         const avgShipmentValue = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     avg: {
//                         $avg: "$cargo.value"
//                     }
//                 }
//             }
//         ]);

//         const avgLeadTime = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: null,
//                     avg: {
//                         $avg: "$leadTime"
//                     }
//                 }
//             }
//         ]);

//         return res.status(200).json({
//             status: 1,
//             message: "Dashboard fetched successfully",
//             data: {
//                 totalShipments,
//                 totalImportValue: totalImportValue[0]?.total || 0,
//                 totalImporters: importers.length,
//                 totalSuppliers: suppliers.length,
//                 countries: countries.length,
//                 avgShipmentValue: Math.round(avgShipmentValue[0]?.avg || 0),
//                 avgLeadTime: Math.round(avgLeadTime[0]?.avg || 0)
//             }
//         });

//     } catch (error) {

//         console.log("Dashboard Error :", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Import Trend Graph
//  */
// exports.getImportTrend = async (req, res) => {

//     try{

//         const trend = await Shipment.aggregate([

//             {

//                 $group:{

//                     _id:{

//                         $dateToString:{

//                             format:"%Y-%m-%d",

//                             date:"$shipmentDate"

//                         }

//                     },

//                     totalValue:{

//                         $sum:"$cargo.value"

//                     },

//                     shipments:{

//                         $sum:1

//                     }

//                 }

//             },

//             {

//                 $sort:{

//                     "_id":1

//                 }

//             }

//         ]);

//         return res.json({

//             status:1,

//             data:trend

//         });

//     }

//     catch(error){

//         res.status(500).json({

//             status:0,

//             message:error.message

//         });

//     }

// }


// /**
//  * Top Imported Products
//  */
// exports.getTopProducts = async (req, res) => {

//     try {

//         const products = await Shipment.aggregate([

//             {

//                 $group:{
//                     _id:{
//                         hsCode:"$cargo.hsCode",
//                         product:"$cargo.productName"
//                     },
//                     shipments:{$sum:1},
//                     value:{$sum:"$cargo.value"}
//                 }

//             },

//             {

//                 $sort:{

//                     shipments:-1

//                 }

//             },

//             {

//                 $limit:5

//             }

//         ]);

//         return res.json({

//             status:1,

//             data:products

//         });

//     }

//     catch(error){

//         res.status(500).json({

//             status:0,

//             message:error.message

//         });

//     }

// }


// /**
//  * Top Suppliers
//  */
// exports.getTopSuppliers = async (req, res) => {
//     try {

//         const suppliers = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$supplier.companyName",
//                     shipments: { $sum: 1 },
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             { $sort: { shipments: -1 } },
//             { $limit: 5 }
//         ]);

//         res.status(200).json({
//             status: 1,
//             data: suppliers
//         });

//     } catch (error) {

//         console.log("Top Suppliers Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Top Importers
//  */
// exports.getTopImporters = async (req, res) => {
//     try {

//         const importers = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$importer.companyName",
//                     shipments: { $sum: 1 },
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             { $sort: { shipments: -1 } },
//             { $limit: 5 }
//         ]);

//         res.status(200).json({
//             status: 1,
//             data: importers
//         });

//     } catch (error) {

//         console.log("Top Importers Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Country Distribution (Pie Chart)
//  */
// exports.getCountryDistribution = async (req, res) => {
//     try {

//         const countries = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$route.destinationCountry",
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             {
//                 $sort: { value: -1 }
//             }
//         ]);

//         const totalValue = countries.reduce((sum, item) => sum + item.value, 0);

//         const result = countries.map(item => ({
//             country: item._id,
//             value: item.value,
//             percentage: totalValue
//                 ? ((item.value / totalValue) * 100).toFixed(2)
//                 : 0
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Country distribution fetched successfully",
//             totalValue,
//             data: result
//         });

//     } catch (error) {

//         console.log("Country Distribution Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Port Wise Imports
//  */
// exports.getPortWiseImports = async (req, res) => {
//     try {

//         const ports = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$route.destinatonCity",
//                     shipments: { $sum: 1 },
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             { $sort: { shipments: -1 } }
//         ]);

//         res.status(200).json({
//             status: 1,
//             data: ports
//         });

//     } catch (error) {

//         console.log("Port Wise Imports Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Recent Shipments
//  */
// exports.getRecentShipments = async (req, res) => {
//     try {

//         const shipments = await Shipment.find()
//             .populate("cargo.hsCode", "hsCode description")
//             .sort({ shipmentDate: -1 })
//             .limit(10);

//         res.status(200).json({
//             status: 1,
//             data: shipments
//         });

//     } catch (error) {

//         console.log("Recent Shipments Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// /**
//  * Filters Dropdown
//  */
// exports.getFilterOptions = async (req, res) => {

//     try {

//         const hsCodes = await Shipment.distinct("cargo.hsCode");

//         const ports = await Shipment.distinct("route.originCity");

//         const countries = await Shipment.distinct("route.destinationCountry");

//         const exporters = await Shipment.distinct("exporter.companyName");

//         const buyers = await Shipment.distinct("buyer.companyName");

//         return res.status(200).json({

//             status:1,

//             data:{

//                 hsCodes,

//                 ports,

//                 countries,

//                 exporters,

//                 buyers

//             }

//         });

//     } catch (error) {

//         res.status(500).json({

//             status:0,

//             message:error.message

//         });

//     }

// }


// mahima code //
const MasterDataBatch = require("../models/MasterDataBatch");

const normalizeKey = (key = "") =>
  String(key).toLowerCase().replace(/[^a-z0-9]/g, "");

const getValue = (record, aliases = []) => {
  const keys = Object.keys(record || {});
  const normalizedAliases = aliases.map(normalizeKey);

  const matchedKey = keys.find((key) =>
    normalizedAliases.includes(normalizeKey(key))
  );

  return matchedKey ? record[matchedKey] : "";
};

const parseAmount = (value) => {
  if (typeof value === "number") return value;

  const parsed = Number(
    String(value || "")
      .replace(/,/g, "")
      .replace(/[₹$]/g, "")
      .trim()
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

const cleanText = (value) => String(value ?? "").trim();

const normalizeCountry = (value) => {
  const country = cleanText(value);
  return country
    ? country.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase())
    : "";
};

const normalizeMonth = (value) => {
  const month = cleanText(value).toLowerCase();
  if (!month) return "";

  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];

  const matched = months.findIndex(
    (item) => item === month || item.startsWith(month)
  );

  return matched >= 0
    ? months[matched].charAt(0).toUpperCase() + months[matched].slice(1)
    : month.charAt(0).toUpperCase() + month.slice(1);
};

const monthNumber = (month) => {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december",
  ];

  return months.indexOf(String(month || "").toLowerCase()) + 1;
};

const loadImportRecords = async () => {
  const batches = await MasterDataBatch.find({ dataType: "import" })
    .select("records headers fileName createdAt")
    .sort({ createdAt: -1 })
    .lean();

  const records = [];

  batches.forEach((batch) => {
    (batch.records || []).forEach((record, index) => {
      const hsCode = cleanText(
        getValue(record, ["HS Code", "HSCode", "HS_Code"])
      );

      const supplier = cleanText(
        getValue(record, ["Supplier Names", "Supplier Name", "Supplier"])
      );

      const importer = cleanText(
        getValue(record, ["Importer Names", "Importer Name", "Importer"])
      );

      const productName = cleanText(
        getValue(record, [
          "Product Description",
          "Product Name",
          "Description",
        ])
      );

      const country = normalizeCountry(
        getValue(record, ["Country", "Origin Country", "Country of Origin"])
      );

      const quantity = parseAmount(
        getValue(record, ["Quantity", "Qty"])
      );

      const value = parseAmount(
        getValue(record, [
          "Access Value",
          "Assess Value",
          "Assessment Value",
          "Value",
        ])
      );

      const month = normalizeMonth(
        getValue(record, ["Month"])
      );

      const year = Number(
        getValue(record, ["Year"])
      ) || 0;

      records.push({
        shipmentId: `${batch._id}-${index + 1}`,
        hsCode,
        supplier,
        importer,
        productName,
        country,
        quantity,
        value,
        month,
        year,
        fileName: batch.fileName || "",
        uploadedAt: batch.createdAt || null,
        rowNumber: index + 1,
      });
    });
  });

  return records;
};

const applyFilters = (records, query = {}) => {
  const {
    search,
    hsCode,
    country,
    supplier,
    importer,
    month,
    year,
  } = query;

  const searchText = cleanText(search).toLowerCase();

  return records.filter((item) => {
    if (hsCode && hsCode !== "All" &&
        item.hsCode !== hsCode) return false;

    if (country && country !== "All Countries" &&
        item.country.toLowerCase() !== country.toLowerCase()) return false;

    if (supplier && supplier !== "All Suppliers" &&
        item.supplier !== supplier) return false;

    if (importer && importer !== "All Importers" &&
        item.importer !== importer) return false;

    if (month && month !== "All Months" &&
        item.month.toLowerCase() !== month.toLowerCase()) return false;

    if (year && year !== "All Years" &&
        String(item.year) !== String(year)) return false;

    if (searchText) {
      const searchable = [
        item.hsCode,
        item.supplier,
        item.importer,
        item.productName,
        item.country,
        item.month,
        item.year,
      ].join(" ").toLowerCase();

      if (!searchable.includes(searchText)) return false;
    }

    return true;
  });
};

const sendError = (res, error, label) => {
  console.error(`${label}:`, error);
  return res.status(500).json({
    status: 0,
    message: error.message,
  });
};

// Dashboard Stats
exports.getDashboard = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);

    const totalImportValue = records.reduce(
      (sum, item) => sum + item.value, 0
    );

    const totalQuantity = records.reduce(
      (sum, item) => sum + item.quantity, 0
    );

    const importers = new Set(records.map((x) => x.importer).filter(Boolean));
    const suppliers = new Set(records.map((x) => x.supplier).filter(Boolean));
    const countries = new Set(records.map((x) => x.country).filter(Boolean));

    return res.json({
      status: 1,
      message: "Import dashboard fetched successfully",
      data: {
        totalShipments: records.length,
        totalImportValue,
        totalImporters: importers.size,
        totalSuppliers: suppliers.size,
        countries: countries.size,
        totalQuantity,
        avgShipmentValue: records.length
          ? Math.round(totalImportValue / records.length)
          : 0,
        avgLeadTime: null,
      },
    });
  } catch (error) {
    return sendError(res, error, "Import Dashboard Error");
  }
};

// Import Trend - grouped by Month and Year
exports.getImportTrend = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);
    const grouped = {};

    records.forEach((item) => {
      const key = `${item.year}-${String(monthNumber(item.month)).padStart(2, "0")}`;

      if (!item.year || !monthNumber(item.month)) return;

      if (!grouped[key]) {
        grouped[key] = {
          _id: key,
          month: item.month,
          year: item.year,
          totalValue: 0,
          shipments: 0,
        };
      }

      grouped[key].totalValue += item.value;
      grouped[key].shipments += 1;
    });

    const data = Object.values(grouped).sort((a, b) =>
      a._id.localeCompare(b._id)
    );

    return res.json({ status: 1, data });
  } catch (error) {
    return sendError(res, error, "Import Trend Error");
  }
};

// Top Products
exports.getTopProducts = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);
    const grouped = {};

    records.forEach((item) => {
      const key = item.hsCode || item.productName || "Unknown";

      if (!grouped[key]) {
        grouped[key] = {
          _id: {
            hsCode: item.hsCode,
            product: item.productName,
          },
          shipments: 0,
          quantity: 0,
          value: 0,
        };
      }

      grouped[key].shipments += 1;
      grouped[key].quantity += item.quantity;
      grouped[key].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return res.json({ status: 1, data });
  } catch (error) {
    return sendError(res, error, "Top Products Error");
  }
};

// Top Suppliers
exports.getTopSuppliers = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);
    const grouped = {};

    records.forEach((item) => {
      if (!item.supplier) return;

      if (!grouped[item.supplier]) {
        grouped[item.supplier] = {
          _id: item.supplier,
          shipments: 0,
          value: 0,
          country: item.country,
        };
      }

      grouped[item.supplier].shipments += 1;
      grouped[item.supplier].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return res.json({ status: 1, data });
  } catch (error) {
    return sendError(res, error, "Top Suppliers Error");
  }
};

// Top Importers
exports.getTopImporters = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);
    const grouped = {};

    records.forEach((item) => {
      if (!item.importer) return;

      if (!grouped[item.importer]) {
        grouped[item.importer] = {
          _id: item.importer,
          shipments: 0,
          value: 0,
          country: item.country,
        };
      }

      grouped[item.importer].shipments += 1;
      grouped[item.importer].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    return res.json({ status: 1, data });
  } catch (error) {
    return sendError(res, error, "Top Importers Error");
  }
};

// Country Distribution
exports.getCountryDistribution = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);
    const grouped = {};

    records.forEach((item) => {
      if (!item.country) return;

      grouped[item.country] = (grouped[item.country] || 0) + item.value;
    });

    const totalValue = Object.values(grouped).reduce(
      (sum, value) => sum + value, 0
    );

    const data = Object.entries(grouped)
      .map(([country, value]) => ({
        country,
        value,
        percentage: totalValue
          ? Number(((value / totalValue) * 100).toFixed(2))
          : 0,
      }))
      .sort((a, b) => b.value - a.value);

    return res.json({
      status: 1,
      message: "Country distribution fetched successfully",
      totalValue,
      data,
    });
  } catch (error) {
    return sendError(res, error, "Country Distribution Error");
  }
};

// CSV does not contain port information.
exports.getPortWiseImports = async (req, res) => {
  return res.json({
    status: 1,
    message: "Port information is not available in uploaded import data",
    data: [],
  });
};

// Recent Import Records
exports.getRecentShipments = async (req, res) => {
  try {
    const records = applyFilters(await loadImportRecords(), req.query);

    return res.json({
      status: 1,
      data: records.slice(0, 100),
      total: records.length,
    });
  } catch (error) {
    return sendError(res, error, "Recent Import Records Error");
  }
};

// Filter Options
exports.getFilterOptions = async (req, res) => {
  try {
    const records = await loadImportRecords();

    const unique = (key) => [
      ...new Set(records.map((item) => item[key]).filter(Boolean)),
    ].sort((a, b) => String(a).localeCompare(String(b)));

    return res.json({
      status: 1,
      data: {
        hsCodes: unique("hsCode"),
        countries: unique("country"),
        suppliers: unique("supplier"),
        importers: unique("importer"),
        months: unique("month"),
        years: unique("year").sort((a, b) => Number(b) - Number(a)),
      },
    });
  } catch (error) {
    return sendError(res, error, "Import Filters Error");
  }
};