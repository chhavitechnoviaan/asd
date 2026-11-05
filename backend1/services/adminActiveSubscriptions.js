// Resolve the customer's current subscription from the authoritative Subscription collection.
// The legacy User.plan string is not a reliable purchased-plan source.
const Subscription = require("../models/Subscription");

async function withActiveSubscriptions(users) {
  const list = users.map(user => typeof user.toObject === "function" ? user.toObject() : { ...user });
  if (!list.length) return list;
  const ids = list.map(user => user._id);
  const records = await Subscription.find({
    userId: { $in: ids }, status: "Active",
    $or: [{ expiryDate: { $gt: new Date() } }, { expiryDate: null }]
  }).sort({ startDate: -1, createdAt: -1 })
    .populate("planId", "name tier audience planType")
    .lean();
  const byUser = new Map();
  for (const record of records) {
    const key = String(record.userId);
    if (!byUser.has(key)) byUser.set(key, record);
  }
  return list.map(user => {
    const active = byUser.get(String(user._id));
    return {
      ...user,
      // null explicitly means no active subscription; do not fall back to stale user.plan.
      purchasedPlan: active?.planId?.name || null,
      subscription: active ? {
        _id: active._id,
        planId: active.planId,
        status: active.status,
        isTrial: Boolean(active.isTrial),
        startDate: active.startDate,
        expiryDate: active.expiryDate
      } : null
    };
  });
}
module.exports = { withActiveSubscriptions };
