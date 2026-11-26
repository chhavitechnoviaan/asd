const {notifyAction}=require('./actionNotification');
const {recordAdminActivity}=require('./adminActivity');
const User=require('../models/user');

async function business(req,{userId,title,message,type='System',relatedId,admin=true,eventKey,affectedAccount}){
  if(userId) await notifyAction({userId,title,message,type,relatedId,eventKey});
  if(admin){
    const staff=req.user?.isInternalStaff;
    const actor=req.user?.name||'Account owner';
    let account=affectedAccount;
    if(userId && !account){
      try { account=await User.findById(userId).select('name roleId').populate('roleId','name').lean(); }
      catch(e){ console.error('Affected account lookup:',e.message); }
    }
    const role=String(account?.roleId?.name||'').toLowerCase();
    const label=({user:'User',b2b:'Partner',admin:'Admin'})[role]||account?.roleId?.name||'Unavailable';
    const details=userId?` | Affected account name: ${account?.name||'Unavailable'} | Account role: ${label}`:'';
    await recordAdminActivity({title:staff?'Sub-admin activity: '+title:title,message:message+details+' | Performed by: '+actor+(staff?' | Performed by role: '+(req.user.roleId?.name||'Staff'):''),relatedId,type,eventKey,category:staff?'Sub-admin Activity':'System',mainAdminOnly:!!staff});
    if(staff)req.staffAlertHandled=true;
  }
}
module.exports={business};
