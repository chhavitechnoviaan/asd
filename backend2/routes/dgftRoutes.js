const express = require("express");
const router = express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const ctrl = require("../controllers/dgftController");

router.post("/", protect, adminOnly, ctrl.createScheme);
router.get("/", ctrl.getSchemes);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getSingleScheme);
router.put("/:id", protect, adminOnly, ctrl.updateScheme);
router.delete("/:id", protect, adminOnly, ctrl.deleteScheme);

module.exports = router;