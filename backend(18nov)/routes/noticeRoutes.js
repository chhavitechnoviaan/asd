const express = require("express");
const router = express.Router();
const controller = require("../controllers/noticeController");
const { protect, adminOnly } = require("../middleware/authMiddleware");
const upload = require("../middleware/upload");

router.get("/active", protect, controller.getActiveNotice);
router.get("/", protect, controller.getNotices);
router.get("/:id", protect, controller.getNotice);

router.post("/", protect, adminOnly, upload.single("image"), controller.createNotice);
router.put("/:id", protect, adminOnly, upload.single("image"), controller.updateNotice);
router.delete("/:id", protect, adminOnly, controller.deleteNotice);
router.patch("/:id/toggle", protect, adminOnly, controller.toggleNoticeStatus);

module.exports = router;


// <<<<<<< HEAD

// const express = require("express");
// const router = express.Router();
// const notice = require("../controllers/noticeController");
// const { protect, adminOnly } = require("../middleware/authMiddleware");

// router.post("/", protect, adminOnly, notice.createNotice);
// router.get("/", protect, notice.getNotices);

// module.exports = router;
// =======
// const express = require("express");
// const router = express.Router();
// const controller = require("../controllers/noticeController");
// const { protect, adminOnly } = require("../middleware/authMiddleware");
// const upload = require("../middleware/upload");

// router.get("/active", protect, controller.getActiveNotice);
// router.get("/", protect, controller.getNotices);
// router.get("/:id", protect, controller.getNotice);

// router.post("/", protect, adminOnly, upload.single("image"), controller.createNotice);
// router.put("/:id", protect, adminOnly, upload.single("image"), controller.updateNotice);
// router.delete("/:id", protect, adminOnly, controller.deleteNotice);
// router.patch("/:id/toggle", protect, adminOnly, controller.toggleNoticeStatus);

// module.exports = router;
// >>>>>>> origin/perumal
