const {recordAdminActivity}=require('./adminActivity');
const crypto=require('crypto');
const labels={users:'Users',vendors:'Partners',plans:'Plans / Subscription',hs:'HS Rules',countryRules:'Country Rules',dgft:'DGFT Schemes'};
async function staffAlert(req, status, explicit){
 const u=req.user;if(!u?.isInternalStaff)return;
 const path=(req.originalUrl||'').split('?')[0];
 if(!explicit && (/^\/api\/(notifications|alerts-notifications)(?:\/|$)/.test(path)||(!['POST','PUT','PATCH','DELETE'].includes(req.method)&&status!==403)))return;
 const permission=req.staffPermissionName||'';
 const module=permission.split('.')[0]||path.split('/')[2]||'Account';
 const action=explicit||permission.split('.')[1]||req.method;
 const outcome=status===403?'Access denied':status>=400?'Request failed':'Request completed';
 const title=`Sub-admin activity: ${action} — ${outcome}`;
 const message=`Performed by: ${u.name||'Staff'} | Role: ${u.roleId?.name||'Staff'} | Module: ${labels[module]||module} | Action: ${action} | Endpoint: ${req.baseUrl||""}${req.route?.path||""} | Status: ${status} | Date/time: ${new Date().toLocaleString('en-IN',{timeZone:'Asia/Kolkata'})} IST`;
 await recordAdminActivity({title,message,category:'Sub-admin Activity',mainAdminOnly:true,eventKey:crypto.randomUUID()});
}
module.exports={staffAlert};
