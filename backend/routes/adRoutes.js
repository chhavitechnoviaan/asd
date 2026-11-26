const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const crypto = require("crypto");
const storage = require("../utils/storage");
const ctrl = require("../controllers/adController");
const { protect, adminOnly } =
  require("../middleware/authMiddleware");
// Ad images are saved in persistent server storage.
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    const allowed = ["image/jpeg", "image/png", "image/webp", "image/gif"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, and GIF image files are allowed."));
    }
    cb(null, true);
  },
});

function uploadAdImage(req, res, next) {
  upload.single("file")(req, res, (multerError) => {
    if (multerError) {
      const message = multerError.code === "LIMIT_FILE_SIZE"
        ? "Image must be 10 MB or smaller."
        : multerError.message || "Unable to read ad image.";
      return res.status(400).json({ status: 0, message });
    }

    if (!req.file) return next();

    storage.saveImage('ads', req.file.buffer).then(result => { req.file.path=(process.env.PUBLIC_BACKEND_URL || "https://api.asdcargomate.com").replace(/\/$/, "")+result.url; req.file.filename=result.name; next(); }).catch(err => { console.error('Ad image upload:',err.message); res.status(400).json({status:0,message:'Unable to save valid image on server.'}); });
  });
}

// Public endpoint used by dashboard placements.
router.get("/placement", ctrl.getAdsByLocation);
router.post("/", protect, adminOnly, uploadAdImage, ctrl.createAd);
router.get("/", protect, adminOnly, ctrl.getAds);
router.put("/:id", protect, adminOnly, ctrl.updateAd);
router.delete("/:id", protect, adminOnly, ctrl.deleteAd);
router.post("/duplicate/:id", protect, adminOnly, ctrl.duplicateAd);
router.post("/status/:id", protect, adminOnly, ctrl.changeStatus);
router.post("/priority", protect, adminOnly, ctrl.updatePriority);
router.get("/preview/:id", protect, adminOnly, ctrl.getAdPreview);
router.get("/stats", protect, adminOnly, ctrl.getStats);
router.get("/performance", protect, adminOnly, ctrl.getPerformance);
router.get("/analytics", protect, adminOnly, ctrl.getAnalytics);

module.exports = router;
