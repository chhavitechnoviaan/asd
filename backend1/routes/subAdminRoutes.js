const express = require("express");
const router=express.Router();
const {protect,adminOnly}=require("../middleware/authMiddleware");
const controller=require("../controllers/subAdminController");
router.use(protect,adminOnly);
router.get("/",controller.list);
router.post("/",controller.create);
router.patch("/:id",controller.update);
module.exports=router;
