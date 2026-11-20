const ShipmentDocument = require("../models/ShipmentDocument");
const Shipment = require("../models/Shipment");
const Activity = require("../models/Activity");
const fs = require("fs");
const path = require("path");

// Documents are visible only when their shipment belongs to the authenticated user.
const getUserShipmentIds = async (userId) => {
  if (!userId) return [];
  return Shipment.find({ userId }).distinct("_id");
};

const getUserDocumentQuery = async (userId) => ({
  shipmentId: { $in: await getUserShipmentIds(userId) },
});

exports.uploadDocument = async (req, res) => {
  try {
    const { shipmentId, documentName, documentType, expiryDate, remarks } = req.body;
    if (!req.file) {
      return res.status(400).json({ status: 0, message: "Please upload file" });
    }

    // Prevent a user from attaching a document to another user's shipment.
    const ownsShipment = await Shipment.exists({ _id: shipmentId, userId: req.user._id });
    if (!ownsShipment) {
      return res.status(403).json({ status: 0, message: "You can upload documents only to your own shipments." });
    }

    const document = await ShipmentDocument.create({
      shipmentId, documentName, documentType, expiryDate, remarks,
      uploadedBy: req.user._id, fileUrl: req.file.path,
      fileName: req.file.originalname, fileSize: req.file.size, status: "Uploaded",
    });

    await Activity.create({
      shipmentId, userId: req.user._id, type: "DOCUMENT",
      message: `${documentName} uploaded`,
    });

    return res.json({ status: 1, message: "Document uploaded successfully", data: document });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.getDocuments = async (req, res) => {
  try {
    const { search, status, shipmentId, page = 1, limit = 10 } = req.query;
    const query = await getUserDocumentQuery(req.user._id);
    if (shipmentId) query.shipmentId = shipmentId;
    if (status) query.status = status;
    if (search) query.documentName = { $regex: search, $options: "i" };

    const pageNumber = Math.max(1, Number(page) || 1);
    const pageSize = Math.max(1, Number(limit) || 10);
    const documents = await ShipmentDocument.find(query)
      .populate("shipmentId", "sbNumber referenceNumber")
      .populate("uploadedBy", "name email")
      .sort({ createdAt: -1 })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize);
    const total = await ShipmentDocument.countDocuments(query);

    return res.json({
      status: 1, data: documents,
      pagination: { total, page: pageNumber, pages: Math.ceil(total / pageSize) },
    });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.getDashboard = async (req, res) => {
  try {
    const baseQuery = await getUserDocumentQuery(req.user._id);
    const [totalDocuments, required, applicable, notRequired, uploadedThisMonth, expiringSoon] = await Promise.all([
      ShipmentDocument.countDocuments(baseQuery),
      ShipmentDocument.countDocuments({ ...baseQuery, documentType: "Required" }),
      ShipmentDocument.countDocuments({ ...baseQuery, documentType: "If Applicable" }),
      ShipmentDocument.countDocuments({ ...baseQuery, documentType: "Not Required" }),
      ShipmentDocument.countDocuments({ ...baseQuery, createdAt: { $gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1) } }),
      ShipmentDocument.countDocuments({ ...baseQuery, expiryDate: { $gte: new Date(), $lte: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) } }),
    ]);
    return res.json({ status: 1, data: { totalDocuments, required, applicable, notRequired, uploadedThisMonth, expiringSoon } });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.getRecentUploads = async (req, res) => {
  try {
    const query = await getUserDocumentQuery(req.user._id);
    const data = await ShipmentDocument.find(query).populate("shipmentId", "sbNumber referenceNumber").populate("uploadedBy", "name email").sort({ createdAt: -1 }).limit(5);
    return res.json({ status: 1, data });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.getStorage = async (req, res) => {
  try {
    const query = await getUserDocumentQuery(req.user._id);
    const docs = await ShipmentDocument.find(query).select("fileSize");
    const totalStorage = docs.reduce((sum, doc) => sum + (doc.fileSize || 0), 0);
    return res.json({ status: 1, data: { documents: docs.length, totalStorage } });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.getExpiringDocuments = async (req, res) => {
  try {
    const query = await getUserDocumentQuery(req.user._id);
    query.expiryDate = { $gte: new Date(), $lte: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000) };
    const data = await ShipmentDocument.find(query).populate("shipmentId", "sbNumber referenceNumber").sort({ expiryDate: 1 });
    return res.json({ status: 1, data });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.downloadDocument = async (req, res) => {
  try {
    const allowedQuery = await getUserDocumentQuery(req.user._id);
    const document = await ShipmentDocument.findOne({ _id: req.params.id, ...allowedQuery });
    if (!document) return res.status(404).json({ status: 0, message: "Document not found" });
    const filePath = path.resolve(document.fileUrl);
    if (!fs.existsSync(filePath)) return res.status(404).json({ status: 0, message: "Document file not found" });
    return res.download(filePath, document.fileName);
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};

exports.deleteDocument = async (req, res) => {
  try {
    const allowedQuery = await getUserDocumentQuery(req.user._id);
    const document = await ShipmentDocument.findOne({ _id: req.params.id, ...allowedQuery });
    if (!document) return res.status(404).json({ status: 0, message: "Document not found" });
    if (fs.existsSync(document.fileUrl)) fs.unlinkSync(document.fileUrl);
    await ShipmentDocument.findByIdAndDelete(req.params.id);
    return res.json({ status: 1, message: "Document deleted" });
  } catch (err) {
    return res.status(500).json({ status: 0, message: err.message });
  }
};