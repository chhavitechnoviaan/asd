// const r=require("express").Router();const c=require("../controllers/aiSubscriptionController");const {protect,adminOnly}=require("../middleware/authMiddleware");
// r.get("/plans",c.list);r.get("/me",protect,c.my);r.post("/trial",protect,c.startTrial);r.get("/invoices/:id/pdf",protect,c.invoicePdf);r.post("/order",protect,c.order);r.post("/verify",protect,c.verify);r.post("/plans",protect,adminOnly,c.create);r.patch("/plans/:id",protect,adminOnly,c.update);module.exports=r;



const r=require("express").Router();const c=require("../controllers/aiSubscriptionController");const {protect,adminOnly}=require("../middleware/authMiddleware");
const primaryAdminOnly=(req,res,next)=>req.user?.roleName==="admin"&&!req.user?.isInternalStaff?next():res.status(403).json({message:"Primary admin only"});
r.get("/plans",c.list);r.get("/admin/plans",protect,primaryAdminOnly,c.adminListPlans);r.get("/me",protect,c.my);r.post("/trial",protect,c.startTrial);r.get("/invoices/:id/pdf",protect,c.invoicePdf);r.post("/order",protect,c.order);r.post("/verify",protect,c.verify);r.post("/plans",protect,adminOnly,c.create);r.patch("/plans/:id",protect,adminOnly,c.update);r.delete("/plans/:id",protect,primaryAdminOnly,c.deletePlan);r.post("/admin/customers/:userId/plan",protect,primaryAdminOnly,c.adminChangeCustomerPlan);module.exports=r;
