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

//         if (origin) filter["route.originCountry"] = origin;
//         if (destination) filter["route.destinationCountry"] = destination;
//         if (exporter) filter["exporter.companyName"] = exporter;
//         if (buyer) filter["buyer.companyName"] = buyer;
//         if (status) filter.shipmentStatus = status;
//         if (hsCode) filter["cargo.hsCode"] = hsCode;

//         const totalExportShipments = await Shipment.countDocuments(filter);

//         const totalExportValue = await Shipment.aggregate([
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
//         const countries = await Shipment.distinct("route.origin", filter);

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
//             message: "Export dashboard fetched successfully",
//             data: {
//                 totalExportShipments,
//                 totalExportValue: totalExportValue[0]?.total || 0,
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

// exports.getExportTrend = async (req, res) => {
//     try {

//         const filter = {};

//         const { from, to } = req.query;

//         if (from && to) {
//             filter.shipmentDate = {
//                 $gte: new Date(from),
//                 $lte: new Date(to)
//             };
//         }

//         const trend = await Shipment.aggregate([
//             { $match: filter },
//             {
//                 $group: {
//                     _id: {
//                         $dateToString: {
//                             format: "%Y-%m-%d",
//                             date: "$shipmentDate"
//                         }
//                     },
//                     totalValue: {
//                         $sum: "$cargo.value"
//                     },
//                     shipments: {
//                         $sum: 1
//                     }
//                 }
//             },
//             {
//                 $sort: {
//                     "_id": 1
//                 }
//             }
//         ]);

//         return res.status(200).json({
//             status: 1,
//             message: "Export trend fetched successfully",
//             data: trend
//         });

//     } catch (error) {

//         console.log("Export Trend Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };


// exports.getTopProducts = async (req, res) => {
//     try {

//         const totalShipments = await Shipment.countDocuments();

//         const products = await Shipment.aggregate([
//             {
//                 $lookup: {
//                     from: "hscodes",
//                     localField: "cargo.hsCode",
//                     foreignField: "_id",
//                     as: "hsCode"
//                 }
//             },
//             {
//                 $unwind: {
//                     path: "$hsCode",
//                     preserveNullAndEmptyArrays: true
//                 }
//             },
//             {
//                 $group: {
//                     _id: {
//                         hsCode: "$hsCode.hsCode",
//                         productName: "$cargo.productName"
//                     },
//                     shipments: {
//                         $sum: 1
//                     },
//                     value: {
//                         $sum: "$cargo.value"
//                     }
//                 }
//             },
//             {
//                 $sort: {
//                     shipments: -1
//                 }
//             },
//             {
//                 $limit: 5
//             }
//         ]);

//         const data = products.map(item => ({
//             hsCode: item._id.hsCode || "-",
//             productName: item._id.productName,
//             shipments: item.shipments,
//             value: item.value,
//             share: totalShipments
//                 ? ((item.shipments / totalShipments) * 100).toFixed(1)
//                 : 0
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Top exported products fetched successfully",
//             data
//         });

//     } catch (error) {

//         console.log("Top Products Error:", error);

//         res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getTopExporters = async (req, res) => {
//     try {

//         const exporters = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$exporter.companyName",
//                     shipments: {
//                         $sum: 1
//                     },
//                     value: {
//                         $sum: "$cargo.value"
//                     }
//                 }
//             },
//             {
//                 $sort: {
//                     shipments: -1
//                 }
//             },
//             {
//                 $limit: 5
//             }
//         ]);

//         const data = exporters.map(item => ({
//             exporter: item._id || "-",
//             shipments: item.shipments,
//             value: item.value,
//             growth: 0
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Top exporters fetched successfully",
//             data
//         });

//     } catch (error) {

//         console.log("Top Exporters Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getTopBuyers = async (req, res) => {
//     try {

//         const buyers = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$buyer.companyName",
//                     shipments: { $sum: 1 },
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             {
//                 $sort: {
//                     shipments: -1
//                 }
//             },
//             {
//                 $limit: 5
//             }
//         ]);

//         const data = buyers.map(item => ({
//             buyer: item._id || "-",
//             shipments: item.shipments,
//             value: item.value,
//             growth: 0
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Top buyers fetched successfully",
//             data
//         });

//     } catch (error) {

//         console.log("Top Buyers Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getCountryDistribution = async (req, res) => {
//     try {

//         const countries = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$route.destinationCountry",
//                     value: { $sum: "$cargo.value" },
//                     shipments: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: {
//                     value: -1
//                 }
//             }
//         ]);

//         const totalValue = countries.reduce((sum, item) => sum + item.value, 0);

//         const data = countries.map(item => ({
//             country: item._id || "-",
//             shipments: item.shipments,
//             value: item.value,
//             percentage: totalValue
//                 ? Number(((item.value / totalValue) * 100).toFixed(2))
//                 : 0
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Country distribution fetched successfully",
//             totalValue,
//             data
//         });

//     } catch (error) {

//         console.log("Country Distribution Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getPortWiseExports = async (req, res) => {
//     try {

//         const ports = await Shipment.aggregate([
//             {
//                 $group: {
//                     _id: "$route.destinationCity",
//                     shipments: { $sum: 1 },
//                     value: { $sum: "$cargo.value" }
//                 }
//             },
//             {
//                 $sort: {
//                     shipments: -1
//                 }
//             }
//         ]);

//         const totalShipments = ports.reduce((sum, item) => sum + item.shipments, 0);

//         const data = ports.map(item => ({
//             port: item._id || "-",
//             shipments: item.shipments,
//             value: item.value,
//             share: totalShipments ? ((item.shipments / totalShipments) * 100).toFixed(1) : "0.0"
//         }));

//         return res.status(200).json({
//             status: 1,
//             message: "Port wise exports fetched successfully",
//             data
//         });

//     } catch (error) {

//         console.log("Port Wise Export Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getRecentShipments = async (req, res) => {
//     try {

//         const shipments = await Shipment.find()
//             .populate("cargo.hsCode", "hsCode description")
//             .sort({ shipmentDate: -1 })
//             .limit(10);

//         return res.status(200).json({
//             status: 1,
//             message: "Recent export shipments fetched successfully",
//             data: shipments
//         });

//     } catch (error) {

//         console.log("Recent Shipments Error:", error);

//         return res.status(500).json({
//             status: 0,
//             message: error.message
//         });

//     }
// };

// exports.getFilterOptions = async (req, res) => {
//     try {

//         const hsCodes = await Shipment.find().populate("cargo.hsCode", "hsCode").select("cargo.hsCode");
//         const ports = await Shipment.distinct("route.originCity");
//         const countries = await Shipment.distinct("route.destinationCountry");
//         const exporters = await Shipment.distinct("exporter.companyName");
//         const buyers = await Shipment.distinct("buyer.companyName");
//         const formattedHsCodes = [...new Set(hsCodes.map(item => item.cargo?.hsCode?.hsCode).filter(Boolean))];

//         return res.status(200).json({
//             status: 1,
//             message: "Filter options fetched successfully",
//             data: {
//                 hsCodes: formattedHsCodes,
//                 ports,
//                 countries,
//                 exporters,
//                 buyers
//             }
//         });

//     } catch (error) {

//         console.log("Filter Options Error:", error);

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

const clean = (value) => {
  if (value === null || value === undefined) return "";
  return String(value).trim();
};

const getValue = (record, possibleKeys = []) => {
  if (!record || typeof record !== "object") return "";

  const recordKeys = Object.keys(record);

  for (const key of possibleKeys) {
    const matchedKey = recordKeys.find(
      (item) => normalizeKey(item) === normalizeKey(key)
    );

    if (
      matchedKey !== undefined &&
      record[matchedKey] !== null &&
      record[matchedKey] !== undefined &&
      clean(record[matchedKey]) !== ""
    ) {
      return record[matchedKey];
    }
  }

  return "";
};

const toNumber = (value) => {
  if (typeof value === "number") return value;

  const parsed = Number(
    String(value ?? "").replace(/[^0-9.-]/g, "")
  );

  return Number.isFinite(parsed) ? parsed : 0;
};

const uniqueCount = (records, field) => {
  const values = records
    .map((item) => clean(item[field]).toLowerCase())
    .filter(Boolean);

  return new Set(values).size;
};

// ==========================================
// DYNAMIC RECORD FORMATTER
// ==========================================

const formatRecord = (record, batch) => {
  const raw = record && typeof record === "object" ? record : {};

  const hsCode = clean(
    getValue(raw, [
      "HS Code",
      "HSCode",
      "HS_CODE",
      "HS CODE",
      "ITC HS Code",
      "ITC HS",
      "HSN Code",
      "HSN",
      "Commodity Code",
    ])
  );

  const buyer = clean(
    getValue(raw, [
      "Consignee",
      "Cosignee",
      "Consignee Name",
      "Buyer",
      "Buyer Name",
      "Importer",
      "Importer Name",
    ])
  );

  const country = clean(
    getValue(raw, [
      "Country",
      "Destination Country",
      "Destination",
      "Country of Destination",
      "Import Country",
    ])
  );

  const exporter = clean(
    getValue(raw, [
      "Exporter",
      "Exporter Name",
      "Shipper",
      "Shipper Name",
      "Indian Exporter",
    ])
  );

  const productName = clean(
    getValue(raw, [
      "Product Description",
      "Product Name",
      "Product",
      "Commodity",
      "Description",
      "Item Description",
      "Goods Description",
    ])
  );

  const quantity = toNumber(
    getValue(raw, [
      "Quantity",
      "Qty",
      "Export Quantity",
      "Net Quantity",
    ])
  );

  const value = toNumber(
    getValue(raw, [
      "FOB Value",
      "FOBValue",
      "FOB VALUE",
      "FOB",
      "Assess Value",
      "AssessValue",
      "Invoice Value",
      "Export Value",
      "Total Value",
    ])
  );

  const month = clean(
    getValue(raw, [
      "Month",
      "Export Month",
      "Shipment Month",
    ])
  );
  
  const year = clean(
    getValue(raw, [
      "Year",
      "year",
      "Export Year",
      "Shipment Year",
    ])
  );

  return {
    ...raw,
  
    _id: `${batch._id}-${record._rowIndex}`,
    shipmentId: `EXP-${String(record._rowIndex + 1).padStart(5, "0")}`,
  
    _batchId: batch._id,
    _fileName: batch.fileName,
    _uploadedAt: batch.createdAt,
    _rowNumber: record._rowIndex + 1,
  
    hsCode,
    buyer,
    country,
    exporter,
    productName,
    quantity,
    value,
    month,
    year,
  };
};

// ==========================================
// LOAD ALL EXPORT RECORDS
// ==========================================

const getAllExportRecords = async () => {
  const batches = await MasterDataBatch.find({
    dataType: "export",
  })
    .select("dataType records headers fileName createdAt")
    .sort({ createdAt: -1 })
    .lean();

  console.log("Export batches found:", batches.length);

  const records = [];

  batches.forEach((batch) => {
    (batch.records || []).forEach((record, index) => {
      records.push(
        formatRecord(
          {
            ...record,
            _rowIndex: index,
          },
          batch
        )
      );
    });
  });

  console.log("Total export records:", records.length);

  if (records.length > 0) {
    console.log("First formatted export record:", records[0]);
  }

  return records;
};

// ==========================================
// FILTER RECORDS
// ==========================================

const filterRecords = (records, query = {}) => {
  const {
    search = "",
    hsCode = "",
    country = "",
    exporter = "",
    buyer = "",
    month = "",
    year = "",
  } = query;

  const searchText = clean(search).toLowerCase();

  const matches = (recordValue, selectedValue) => {
    if (!selectedValue || selectedValue === "All") return true;

    return clean(recordValue).toLowerCase() ===
      clean(selectedValue).toLowerCase();
  };

  return records.filter((record) => {
    // Search across ALL original CSV fields
    const searchableValues = Object.entries(record)
      .filter(([key]) => !key.startsWith("_"))
      .map(([, value]) => clean(value).toLowerCase());

    const searchMatch =
      !searchText ||
      searchableValues.some((value) =>
        value.includes(searchText)
      );

    return (
      searchMatch &&
      matches(record.hsCode, hsCode) &&
      matches(record.country, country) &&
      matches(record.exporter, exporter) &&
      matches(record.buyer, buyer) &&
      matches(record.month, month) &&
      matches(record.year, year)
    );
  });
};

// ==========================================
// FILTERED DATA
// ==========================================

const getFilteredData = async (req) => {
  const records = await getAllExportRecords();

  return filterRecords(records, req.query);
};


const paginate = (records, page = 1, limit = 10) => {
  const currentPage = Math.max(1, Number(page) || 1);
  const pageSize = Math.min(100, Math.max(1, Number(limit) || 10));
  const start = (currentPage - 1) * pageSize;

  return {
    records: records.slice(start, start + pageSize),
    pagination: {
      currentPage,
      limit: pageSize,
      totalRecords: records.length,
      totalPages: Math.ceil(records.length / pageSize),
      hasNextPage: start + pageSize < records.length,
      hasPrevPage: currentPage > 1,
    },
  };
};

// ==========================================
// DASHBOARD STATS
// ==========================================

exports.getDashboard = async (req, res) => {
  try {
    const records = await getFilteredData(req);

    const totalExportValue = records.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const totalExportShipments = records.length;

    return res.status(200).json({
      status: 1,
      message: "Export dashboard fetched successfully",
      data: {
        totalExportShipments,
        totalExportValue,
        totalExporters: uniqueCount(records, "exporter"),
        totalBuyers: uniqueCount(records, "buyer"),
        avgShipmentValue: totalExportShipments
          ? Math.round(totalExportValue / totalExportShipments)
          : 0,
      },
    });
  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// FILTER OPTIONS
// ==========================================


exports.getFilterOptions = async (req, res) => {
    try {
      const records = await getAllExportRecords();
  
      const getUnique = (field) => [
        ...new Set(
          records
            .map((item) => clean(item[field]))
            .filter(Boolean)
        ),
      ].sort((a, b) => a.localeCompare(b));
  
      return res.status(200).json({
        status: 1,
        data: {
          hsCodes: getUnique("hsCode"),
          countries: getUnique("country"),
          exporters: getUnique("exporter"),
          buyers: getUnique("buyer"),
          months: getUnique("month"),
          years: getUnique("year"),
        },
      });
    } catch (error) {
      console.error("Filter Options Error:", error);
  
      return res.status(500).json({
        status: 0,
        message: error.message,
      });
    }
  };
  

// ==========================================
// RECENT / FILTERED SHIPMENTS
// ==========================================

exports.getRecentShipments = async (req, res) => {
  try {
    const records = await getFilteredData(req);

    const sorted = records.sort((a, b) => {
      const dateA = new Date(`${a.year} ${a.month} 1`).getTime() || 0;
      const dateB = new Date(`${b.year} ${b.month} 1`).getTime() || 0;
      return dateB - dateA;
    });

    const result = paginate(sorted, req.query.page, req.query.limit);

    res.status(200).json({
      status: 1,
      message: "Export records fetched successfully",
      data: result.records,
      pagination: result.pagination,
    });
  } catch (error) {
    console.error("Shipments Error:", error);
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// EXPORT TREND
// ==========================================

exports.getExportTrend = async (req, res) => {
  try {
    const records = await getFilteredData(req);
    const grouped = {};

    records.forEach((item) => {
        const key = `${item.year}-${item.month.toLowerCase()}`;

      if (!grouped[key]) {
        grouped[key] = { _id: key, totalValue: 0, shipments: 0 };
      }

      grouped[key].totalValue += item.value;
      grouped[key].shipments += 1;
    });

    const data = Object.values(grouped).sort((a, b) =>
      a._id.localeCompare(b._id)
    );

    res.status(200).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// TOP PRODUCTS
// ==========================================

exports.getTopProducts = async (req, res) => {
  try {
    const records = await getFilteredData(req);
    const grouped = {};

    records.forEach((item) => {
      const key = `${item.hsCode}-${item.productName}`;

      if (!grouped[key]) {
        grouped[key] = {
          hsCode: item.hsCode,
          productName: item.productName,
          shipments: 0,
          value: 0,
        };
      }

      grouped[key].shipments += 1;
      grouped[key].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    const total = records.length;

    res.status(200).json({
      status: 1,
      data: data.map((item) => ({
        ...item,
        share: total
          ? Number(((item.shipments / total) * 100).toFixed(1))
          : 0,
      })),
    });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// TOP EXPORTERS
// ==========================================

exports.getTopExporters = async (req, res) => {
  try {
    const records = await getFilteredData(req);
    const grouped = {};

    records.forEach((item) => {
      if (!item.exporter) return;

      const key = item.exporter.toLowerCase();

      if (!grouped[key]) {
        grouped[key] = {
          exporter: item.exporter,
          shipments: 0,
          value: 0,
        };
      }

      grouped[key].shipments += 1;
      grouped[key].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    res.status(200).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// TOP BUYERS
// ==========================================

exports.getTopBuyers = async (req, res) => {
  try {
    const records = await getFilteredData(req);
    const grouped = {};

    records.forEach((item) => {
      if (!item.buyer) return;

      const key = item.buyer.toLowerCase();

      if (!grouped[key]) {
        grouped[key] = {
          buyer: item.buyer,
          shipments: 0,
          value: 0,
        };
      }

      grouped[key].shipments += 1;
      grouped[key].value += item.value;
    });

    const data = Object.values(grouped)
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);

    res.status(200).json({ status: 1, data });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// COUNTRY DISTRIBUTION
// ==========================================

exports.getCountryDistribution = async (req, res) => {
  try {
    const records = await getFilteredData(req);
    const grouped = {};

    records.forEach((item) => {
      const key = item.country || "Unknown";

      if (!grouped[key]) {
        grouped[key] = { country: key, value: 0, shipments: 0 };
      }

      grouped[key].value += item.value;
      grouped[key].shipments += 1;
    });

    const countries = Object.values(grouped).sort(
      (a, b) => b.value - a.value
    );

    const totalValue = countries.reduce(
      (sum, item) => sum + item.value,
      0
    );

    const data = countries.map((item) => ({
      ...item,
      percentage: totalValue
        ? Number(((item.value / totalValue) * 100).toFixed(2))
        : 0,
    }));

    res.status(200).json({ status: 1, totalValue, data });
  } catch (error) {
    res.status(500).json({ status: 0, message: error.message });
  }
};

// ==========================================
// PORT WISE EXPORTS
// CSV DOES NOT CONTAIN PORT COLUMN
// ==========================================

exports.getPortWiseExports = async (req, res) => {
  res.status(200).json({
    status: 1,
    message: "Port information is not available in uploaded export data",
    data: [],
  });
};