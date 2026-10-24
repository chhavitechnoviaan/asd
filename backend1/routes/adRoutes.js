const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const ctrl = require("../controllers/adController");

const uploadDir = path.join(__dirname, "..", "uploads", "ads");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
    const base = path.basename(file.originalname || "ad-image", ext)
      .replace(/[^a-zA-Z0-9_-]/g, "-")
      .slice(0, 50) || "ad-image";
    cb(null, `${Date.now()}-${base}${safeExt}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024, files: 1 },
  fileFilter: (_req, file, cb) => {
    if (!["image/jpeg", "image/png", "image/webp", "image/gif"].includes(file.mimetype)) {
      return cb(new Error("Only JPG, PNG, WEBP, and GIF image files are allowed."));
    }
    cb(null, true);
  }
});

// Public endpoint used by dashboard placements; register before admin routes.
router.get("/placement", ctrl.getAdsByLocation);
router.post("/", (req, res, next) => {
  upload.single("file")(req, res, (err) => {
    if (err) {
      const message = err.code === "LIMIT_FILE_SIZE"
        ? "Image must be 10 MB or smaller."
        : err.message || "Unable to upload image.";
      return res.status(400).json({ status: 0, message });
    }
    next();
  });
}, ctrl.createAd);
router.get("/", ctrl.getAds);
router.put("/:id", ctrl.updateAd);
router.delete("/:id", ctrl.deleteAd);
router.post("/duplicate/:id", ctrl.duplicateAd);
router.post("/status/:id", ctrl.changeStatus);
router.post("/priority", ctrl.updatePriority);
router.get("/preview/:id", ctrl.getAdPreview);
router.get("/stats", ctrl.getStats);
router.get("/performance", ctrl.getPerformance);
router.get("/analytics", ctrl.getAnalytics);

module.exports = router;
