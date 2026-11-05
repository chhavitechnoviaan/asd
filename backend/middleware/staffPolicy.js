// // Explicit, default-deny route authorisation for internal staff. This is
// // evaluated on EVERY authenticated request using the latest database role.
// const read = (method) => method === 'GET' || method === 'HEAD';
// const rules = [
//   [/^\/api\/admin\/sub-admins(?:\/|$)/, () => null], // Main Admin only
//   [/^\/api\/(?:roles|users-roles)(?:\/|$)/, () => null],
//   [/^\/api\/admin\/dashboard(?:\/|$)/, () => ['dashboard','view']],
//   [/^\/api\/admin-settings(?:\/|$)/, (m) => ['settings', read(m) ? 'view':'edit']],
//   [/^\/api\/ai-subscription\/plans(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':'edit']],
//   [/^\/api\/ai-subscription\/admin(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/plans(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/users(?:\/|$)/, (m,p) => {
//     if (/\/reset-password\//.test(p) || /\/toggle\//.test(p) || /\/invite\//.test(p)) return null;
//     if (/\/hs-lookup|\/incentive|\/freight/.test(p)) return null;
//     return ['users',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit'];
//   }],
//   [/^\/api\/vendors(?:\/|$)/, (m,p) => ['vendors',/\/kyc\/approve|\/kyc\/reject/.test(p)?'kycApprove':/\/suspend/.test(p)?'edit':read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/shipments(?:\/|$)/, (m,p) => {
//     if (/\/step\d|\/upload-docs|\/save-draft|\/analyze|\/submit/.test(p)) return null;
//     if (/\/assign-carrier|\/tracking$/.test(p) && !read(m)) return ['shipment','edit'];
//     return ['shipment', read(m)?'view':m==='POST'?'add':'edit'];
//   }],
//   [/^\/api\/quotations(?:\/|$)/, (m,p) => /\/accept|\/reject|\/my-quotations/.test(p)?null:['shipment',read(m)?'view':m==='POST'?'add':'edit']],
//   [/^\/api\/(?:master|items)(?:\/|$)/, (m) => ['masterData',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/hs(?:\/|$)/, (m) => ['hsRules',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/country-rules(?:\/|$)/, (m) => ['countryRules',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/dgft(?:\/|$)/, (m) => ['dgftSchemes',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/ads(?:\/|$)/, (m,p) => ['ads',read(m)?'view':m==='DELETE'?'delete':m==='POST'&&!/\/status|\/priority/.test(p)?'add':'edit']],
//   [/^\/api\/help-support(?:\/|$)/, (m,p) => {
//     if (/\/ticket$/.test(p) && m==='POST') return null; // staff can't create customer tickets here
//     return ['support',read(m)?'view':'edit'];
//   }],
//   [/^\/api\/settings(?:\/|$)/, () => null], // personal settings handled via separate account/profile APIs
//   [/^\/api\/document(?:s)?(?:\/|$)/, (m) => ['documents',read(m)?'view':m==='DELETE'?'delete':'add']],
//   [/^\/api\/notice(?:s)?(?:\/|$)/, (m)=>['dashboard',read(m)?'view':'add']],
//   [/^\/api\/alerts-notifications\/alerts(?:\/|$)/, (m)=>['support',read(m)?'view':m==='DELETE'?'delete':'edit']],
//   [/^\/api\/trade-invoices(?:\/|$)/, (m)=>['shipment',read(m)?'view':'edit']],
// ];
// const personal = [
//   /^\/api\/auth\/me(?:\/|$)/,
//   /^\/api\/profile(?:\/|$)/,
//   /^\/api\/notifications(?:\/|$)/,
//   /^\/api\/alerts-notifications\/notifications(?:\/|$)/,
// ];
// function allowedForStaff(user, method, url) {
//   const path = url.split('?')[0];
//   if (personal.some((r)=>r.test(path))) return { ok: true, personal: true };
//   const found = rules.find(([regex])=>regex.test(path));
//   if (!found) return {ok:false,reason:'Staff API not authorized'};
//   const requirement = found[1](method,path);
//   if (!requirement) return {ok:false,reason:'Main Admin only or customer-only operation'};
//   const [module, action] = requirement;
//   const permissions = user.roleId?.permissions;
//   const entry = permissions?.get ? permissions.get(module) : permissions?.[module];
//   return {ok:entry?.[action]===true, module, action, reason:`Permission denied: ${module}.${action}`};
// }
// module.exports = { allowedForStaff };

// Explicit, default-deny route authorisation for internal staff. This is
// evaluated on EVERY authenticated request using the latest database role.
const read = (method) => method === 'GET' || method === 'HEAD';
const rules = [
  [/^\/api\/admin\/sub-admins(?:\/|$)/, () => null], // Main Admin only
  [/^\/api\/(?:roles|users-roles)(?:\/|$)/, () => null],
  [/^\/api\/admin\/dashboard(?:\/|$)/, () => ['dashboard','view']],
  [/^\/api\/admin-settings(?:\/|$)/, (m) => ['settings', read(m) ? 'view':'edit']],
  [/^\/api\/ai-subscription\/plans(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':'edit']],
  [/^\/api\/ai-subscription\/admin(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/plans(?:\/|$)/, (m) => ['plans',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/users(?:\/|$)/, (m,p) => {
    if (/\/reset-password\//.test(p) || /\/toggle\//.test(p) || /\/invite\//.test(p)) return null;
    if (/\/hs-lookup|\/incentive|\/freight/.test(p)) return null;
    return ['users',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit'];
  }],
  [/^\/api\/vendors(?:\/|$)/, (m,p) => ['vendors',/\/kyc\/approve|\/kyc\/reject/.test(p)?'kycApprove':/\/suspend/.test(p)?'edit':read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/shipments(?:\/|$)/, (m,p) => {
    if (/\/step\d|\/upload-docs|\/save-draft|\/analyze|\/submit/.test(p)) return null;
    if (/\/assign-carrier|\/tracking$/.test(p) && !read(m)) return ['shipment','edit'];
    return ['shipment', read(m)?'view':m==='POST'?'add':'edit'];
  }],
  [/^\/api\/quotations(?:\/|$)/, (m,p) => /\/accept|\/reject|\/my-quotations/.test(p)?null:['shipment',read(m)?'view':m==='POST'?'add':'edit']],
  [/^\/api\/(?:master|items)(?:\/|$)/, (m) => ['masterData',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/hs(?:\/|$)/, (m) => ['hsRules',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/country-rules(?:\/|$)/, (m) => ['countryRules',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/dgft(?:\/|$)/, (m) => ['dgftSchemes',read(m)?'view':m==='POST'?'add':m==='DELETE'?'delete':'edit']],
  [/^\/api\/ads(?:\/|$)/, (m,p) => ['ads',read(m)?'view':m==='DELETE'?'delete':m==='POST'&&!/\/status|\/priority/.test(p)?'add':'edit']],
  [/^\/api\/help-support(?:\/|$)/, (m,p) => {
    if (/\/ticket$/.test(p) && m==='POST') return null; // staff can't create customer tickets here
    return ['support',read(m)?'view':'edit'];
  }],
  [/^\/api\/settings(?:\/|$)/, () => null], // personal settings handled via separate account/profile APIs
  [/^\/api\/document(?:s)?(?:\/|$)/, (m) => ['documents',read(m)?'view':m==='DELETE'?'delete':'add']],
  [/^\/api\/notice(?:s)?(?:\/|$)/, (m)=>['dashboard',read(m)?'view':'add']],
  [/^\/api\/alerts-notifications\/alerts(?:\/|$)/, (m)=>['support',read(m)?'view':m==='DELETE'?'delete':'edit']],
  [/^\/api\/trade-invoices(?:\/|$)/, (m)=>['shipment',read(m)?'view':'edit']],
];
const personal = [
  /^\/api\/auth\/me(?:\/|$)/,
  /^\/api\/profile(?:\/|$)/,
  /^\/api\/notifications(?:\/|$)/,
  /^\/api\/alerts-notifications\/notifications(?:\/|$)/,
];
function allowedForStaff(user, method, url) {
  const path = url.split('?')[0];
  if (personal.some((r)=>r.test(path))) return { ok: true, personal: true };
  const found = rules.find(([regex])=>regex.test(path));
  if (!found) return {ok:false,reason:`Staff API route is not mapped to a module: ${method} ${path}`};
  const requirement = found[1](method,path);
  if (!requirement) return {ok:false,reason:'Main Admin only or customer-only operation'};
  const [module, action] = requirement;
  const permissions = user.roleId?.permissions;
  const entry = permissions?.get ? permissions.get(module) : permissions?.[module];
  return {ok:entry?.[action]===true, module, action, reason:`Permission denied: ${module}.${action}`};
}
module.exports = { allowedForStaff };
