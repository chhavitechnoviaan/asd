const test = require('node:test');
const assert = require('node:assert/strict');
const {allowedForStaff} = require('../middleware/staffPolicy');
const staff = (permissions={}) => ({roleId:{permissions}});

test('Staff cannot manage roles or sub-admins',()=>{
  const user=staff({roles:{view:true,edit:true,add:true},subAdmins:{view:true,add:true}});
  assert.equal(allowedForStaff(user,'GET','/api/roles').ok,false);
  assert.equal(allowedForStaff(user,'POST','/api/admin/sub-admins').ok,false);
});
test('Read-only users role cannot mutate users',()=>{
  const user=staff({users:{view:true,add:false,edit:false,delete:false}});
  assert.equal(allowedForStaff(user,'GET','/api/users?page=1').ok,true);
  assert.equal(allowedForStaff(user,'PUT','/api/users/123').ok,false);
  assert.equal(allowedForStaff(user,'DELETE','/api/users/123').ok,false);
});
test('Live permission changes take effect on next request',()=>{
  const user=staff({plans:{view:true,edit:false}});
  assert.equal(allowedForStaff(user,'PATCH','/api/ai-subscription/plans/123').ok,false);
  user.roleId.permissions.plans.edit=true;
  assert.equal(allowedForStaff(user,'PATCH','/api/ai-subscription/plans/123').ok,true);
});
test('Unknown API is denied by default',()=>{
  assert.equal(allowedForStaff(staff({}),'GET','/api/unknown/admin-secrets').ok,false);
});
test('Support ticket read does not enable resolving',()=>{
  const user=staff({support:{view:true,edit:false}});
  assert.equal(allowedForStaff(user,'GET','/api/help-support/tickets').ok,true);
  assert.equal(allowedForStaff(user,'PATCH','/api/help-support/tickets/123').ok,false);
});
test('Settings read does not grant write',()=>{
  const user=staff({settings:{view:true,edit:false}});
  assert.equal(allowedForStaff(user,'GET','/api/admin-settings').ok,true);
  assert.equal(allowedForStaff(user,'PUT','/api/admin-settings/general').ok,false);
});
test('Shipment view cannot approve shipment',()=>{
  const user=staff({shipment:{view:true,edit:false}});
  assert.equal(allowedForStaff(user,'GET','/api/shipments/admin/all').ok,true);
  assert.equal(allowedForStaff(user,'POST','/api/shipments/123/approve').ok,false);
});
test('Staff cannot use customer-only shipment operations',()=>{
  const user=staff({shipment:{add:true,edit:true,view:true}});
  assert.equal(allowedForStaff(user,'POST','/api/shipments/step1').ok,false);
});
test('Staff can read own profile',()=>{
  assert.equal(allowedForStaff(staff({}),'GET','/api/profile').ok,true);
});
