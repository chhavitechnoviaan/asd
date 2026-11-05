const mongoose = require("mongoose");
const MasterDataBatch = require("../models/MasterDataBatch");



// Upload CSV data
exports.uploadCsvData = async (req, res) => {
  try {
    const { dataType, fileName, headers, records } = req.body;

    if (!["import", "export"].includes(dataType)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid data type. Use import or export.",
      });
    }

    if (!fileName || !Array.isArray(headers) || !headers.length) {
      return res.status(400).json({
        status: 0,
        message: "File name and CSV headers are required.",
      });
    }

    if (!Array.isArray(records) || !records.length) {
      return res.status(400).json({
        status: 0,
        message: "CSV file has no data rows.",
      });
    }

    const cleanHeaders = headers.map((header) =>
      String(header).trim()
    );

    if (cleanHeaders.some((header) => !header)) {
      return res.status(400).json({
        status: 0,
        message: "CSV contains an empty column header.",
      });
    }

    const batch = await MasterDataBatch.create({
      dataType,
      fileName: String(fileName).trim(),
      headers: cleanHeaders,
      records,
      rowCount: records.length,
      uploadedBy: req.user?._id || req.user?.id || null,
    });

    return res.status(201).json({
      status: 1,
      message: "CSV data uploaded successfully.",
      data: batch,
    });
  } catch (error) {
    console.error("CSV Upload Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Failed to upload CSV data.",
      error: error.message,
    });
  }
};

// Get Import or Export data separately
exports.getCsvData = async (req, res) => {
  try {
    const { dataType } = req.params;

    if (!["import", "export"].includes(dataType)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid data type.",
      });
    }

    const batches = await MasterDataBatch.find({ dataType })
      .sort({ createdAt: -1 })
      .lean();

    // Merge headers from all uploaded batches in this section.
    const headers = [
      ...new Set(batches.flatMap((batch) => batch.headers || [])),
    ];

    // Keep records from every upload, newest batch first.
    const records = batches.flatMap((batch) =>
      (batch.records || []).map((record, index) => ({
        ...record,
        _batchId: batch._id,
        _fileName: batch.fileName,
        _uploadedAt: batch.createdAt,
        _rowNumber: index + 1,
      }))
    );

    return res.json({
      status: 1,
      data: {
        dataType,
        headers,
        records,
        batches: batches.map((batch) => ({
          _id: batch._id,
          fileName: batch.fileName,
          rowCount: batch.rowCount,
          createdAt: batch.createdAt,
        })),
      },
    });
  } catch (error) {
    console.error("CSV Fetch Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Failed to fetch CSV data.",
      error: error.message,
    });
  }
};


// ==========================================
// DELETE COMPLETE CSV BATCH
// ==========================================

exports.deleteCsvBatch = async (req, res) => {
  try {
    const { batchId } = req.params;

    if (!batchId || !mongoose.Types.ObjectId.isValid(batchId)) {
      return res.status(400).json({
        status: 0,
        message: "Invalid CSV batch ID.",
      });
    }

    const deletedBatch = await MasterDataBatch.findByIdAndDelete(batchId);

    if (!deletedBatch) {
      return res.status(404).json({
        status: 0,
        message: "CSV file not found.",
      });
    }

    return res.status(200).json({
      status: 1,
      message: `${deletedBatch.fileName} deleted successfully.`,
      data: {
        _id: deletedBatch._id,
        fileName: deletedBatch.fileName,
        deletedRows: deletedBatch.rowCount,
      },
    });
  } catch (error) {
    console.error("CSV Delete Error:", error);

    return res.status(500).json({
      status: 0,
      message: "Failed to delete CSV file.",
      error: error.message,
    });
  }
};