const User = require("../models/user");
const Role = require("../models/Role");
const Subscription = require("../models/Subscription");
const Shipment = require("../models/Shipment");
const Plan = require("../models/Plan");
const Notification = require("../models/Notification");

// Only count captured/verified subscriptions as paid revenue; exclude trials and pending orders.
exports.getDashboard = async (req, res) => {
  try {
    const roles = await Role.find({name: {$in: [/^user$/i, /^b2b$/i]}}).select("name _id").lean();
    const userRole = roles.find(r => r.name.toLowerCase() === "user")?._id;
    const b2bRole = roles.find(r => r.name.toLowerCase() === "b2b")?._id;
    const userFilter = {isInternalStaff: {$ne: true}, ...(userRole ? {roleId: userRole} : {roleId: null})};
    const vendorFilter = {isInternalStaff: {$ne: true}, ...(b2bRole ? {roleId: b2bRole} : {roleId: null})};
    const activeStatus = {status: {$ne: "inactive"}, accountStatus: {$ne: "Inactive"}};
    const paidFilter = {isTrial: {$ne: true}, razorpayPaymentId: {$exists: true, $nin: [null, ""]}, amount: {$gt: 0}};
    const now = new Date();
    const from = new Date(now); from.setHours(0, 0, 0, 0); from.setDate(from.getDate()-13);
    const monthFrom = new Date(now.getFullYear(), now.getMonth()-5, 1);
    const [totalUsers, activeUsers, totalVendors, activeVendors, totalSubscription,
      activeSubscriptions, totalShipment, paidSubscriptions, b2bSubscriptions, b2bPlans, revenueRows, dayRows,
      salesRows, unread, read, recent] = await Promise.all([
      User.countDocuments(userFilter), User.countDocuments({...userFilter, ...activeStatus}),
      User.countDocuments(vendorFilter), User.countDocuments({...vendorFilter,...activeStatus}),
      Subscription.countDocuments({}), Subscription.countDocuments({status:"Active",expiryDate:{$gt:now}}),
      Shipment.countDocuments({}), Subscription.countDocuments(paidFilter),
      Subscription.countDocuments({audience:"b2b"}),Plan.countDocuments({audience:"b2b"}),
      Subscription.aggregate([{$match:paidFilter},{$group:{_id:null,total:{$sum:"$amount"}}}]),
      User.aggregate([{$match:{...userFilter,createdAt:{$gte:from}}},{$group:{_id:{$dateToString:{format:"%Y-%m-%d",date:"$createdAt"}},value:{$sum:1}}}]),
      Subscription.aggregate([{$match:{...paidFilter,createdAt:{$gte:monthFrom}}},{$group:{_id:{$dateToString:{format:"%Y-%m",date:"$createdAt"}},value:{$sum:"$amount"},sales:{$sum:1}}}]),
      Notification.countDocuments({userId:req.user._id,isRead:false}),
      Notification.countDocuments({userId:req.user._id,isRead:true}),
      Notification.find({userId:req.user._id}).select("title message createdAt isRead actionLink").sort({createdAt:-1}).limit(6).lean()
    ]);
    const dayMap = new Map(dayRows.map(x=>[x._id,x.value]));
    const growth = Array.from({length:14}, (_,i)=>{const d=new Date(from); d.setDate(d.getDate()+i); const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; return {name:key, value:dayMap.get(key)||0};});
    const monthMap = new Map(salesRows.map(x=>[x._id,x]));
    const revenueGrowth = Array.from({length:6},(_,i)=>{const d=new Date(now.getFullYear(),now.getMonth()-5+i,1);const key=`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`;const row=monthMap.get(key);return {name:key,value:row?.value||0,sales:row?.sales||0};});
    return res.json({status:1,stats:{totalUsers,activeUsers,totalVendors,activeVendors,totalSubscription,activeSubscriptions,totalShipment,revenue:revenueRows[0]?.total||0,paidSubscriptions,b2bSubscriptions,b2bPlans, unreadNotifications:unread, readNotifications:read},charts:{userGrowth:growth,revenueGrowth},recentActivity:recent});
  } catch(e) { return res.status(500).json({status:0,message:"Unable to load dashboard"}); }
};
