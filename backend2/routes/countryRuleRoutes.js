const express = require("express");
const router = express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const ctrl = require("../controllers/countryRuleController");

router.post("/", protect, adminOnly, ctrl.createRule);
router.get("/", ctrl.getRules);
router.get("/stats", ctrl.getStats);
router.get("/:id", ctrl.getSingleRule);
router.put("/:id", protect, adminOnly, ctrl.updateRule);
router.delete("/:id", protect, adminOnly, ctrl.deleteRule);

module.exports = router;