// const KEY = "cargomate-pending-plan";
// export function savePendingPlan(plan, addOns = []) {
//   sessionStorage.setItem(KEY, JSON.stringify({ id: String(plan._id), name: plan.name, audience: plan.audience, billing: plan.planType, addOns, createdAt: Date.now() }));
// }
// export function readPendingPlan(role) {
//   try {
//     const p = JSON.parse(sessionStorage.getItem(KEY));
//     if (!p || !p.id || !["user", "b2b"].includes(p.audience) || !["monthly", "yearly"].includes(p.billing) || Date.now() - p.createdAt > 86400000) return null;
//     return !role || p.audience === role ? p : null;
//   } catch { return null; }
// }
// export function clearPendingPlan() { sessionStorage.removeItem(KEY); }
// export function dashboardOptions(role) {
//   return { replace: true, ...(readPendingPlan(role) ? { state: { activeTab: "UpgradePlan" } } : {}) };
// }



const KEY = "cargomate-pending-plan";
export function savePendingPlan(plan, addOns = []) {
  sessionStorage.setItem(KEY, JSON.stringify({ id: String(plan._id), name: plan.name, audience: plan.audience, billing: plan.planType, addOns, createdAt: Date.now() }));
}
export function readPendingPlan(role) {
  try {
    const p = JSON.parse(sessionStorage.getItem(KEY));
    if (!p || !p.id || !["user", "b2b"].includes(p.audience) || !["monthly", "yearly"].includes(p.billing) || Date.now() - p.createdAt > 86400000) return null;
    return !role || p.audience === role ? p : null;
  } catch { return null; }
}
export function clearPendingPlan() { sessionStorage.removeItem(KEY); }
export function dashboardOptions(role) {
  return { replace: true, ...(readPendingPlan(role) ? { state: { activeTab: "UpgradePlan" } } : {}) };
}
