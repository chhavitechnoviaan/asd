const test = require('node:test');
const assert = require('node:assert/strict');
const { allowedForStaff } = require('../middleware/staffPolicy');

const staff = (permissions) => ({ roleId: { permissions } });

test('vendors.view permits reading counts/list but not edit, delete or KYC', () => {
  const user = staff({vendors:{view:true,add:false,edit:false,delete:false}});
  assert.equal(allowedForStaff(user,'GET','/api/vendors').ok,true);
  assert.equal(allowedForStaff(user,'GET','/api/vendors/stats/all').ok,true);
  assert.equal(allowedForStaff(user,'PUT','/api/vendors/123').ok,false);
  assert.equal(allowedForStaff(user,'DELETE','/api/vendors/123').ok,false);
  assert.equal(allowedForStaff(user,'PATCH','/api/vendors/123/kyc/approve').ok,false);
});

test('plans.view permits read, denies creation and editing', () => {
  const user = staff({plans:{view:true,add:false,edit:false,delete:false}});
  assert.equal(allowedForStaff(user,'GET','/api/ai-subscription/plans').ok,true);
  assert.equal(allowedForStaff(user,'POST','/api/ai-subscription/plans').ok,false);
  assert.equal(allowedForStaff(user,'PATCH','/api/ai-subscription/plans/123').ok,false);
});

test('vendors.edit does not grant delete; plans.add does not grant edit', () => {
  const user = staff({vendors:{view:true,edit:true,delete:false},plans:{view:true,add:true,edit:false}});
  assert.equal(allowedForStaff(user,'PUT','/api/vendors/123').ok,true);
  assert.equal(allowedForStaff(user,'DELETE','/api/vendors/123').ok,false);
  assert.equal(allowedForStaff(user,'POST','/api/ai-subscription/plans').ok,true);
  assert.equal(allowedForStaff(user,'PATCH','/api/ai-subscription/plans/123').ok,false);
});

test('staff view grants vendor/master/support/settings read only, not privileged writes', () => {
  const user = staff({vendors:{view:true},masterData:{view:true},support:{view:true},settings:{view:true}});
  const {allowedForStaff} = require('../middleware/staffPolicy');
  for (const path of ['/api/vendors','/api/vendors/stats/all','/api/master-data/import','/api/master-data/export','/api/help-support/dashboard','/api/help-support/tickets','/api/admin-settings']) {
    assert.equal(allowedForStaff(user,'GET',path).ok,true,`${path} should be readable`);
  }
  assert.equal(allowedForStaff(user,'POST','/api/master-data/upload').ok,false);
  assert.equal(allowedForStaff(user,'DELETE','/api/master-data/batch/123').ok,false);
  assert.equal(allowedForStaff(user,'PUT','/api/admin-settings/general').ok,false);
  assert.equal(allowedForStaff(user,'POST','/api/help-support/ticket/123/reply').ok,false);
});
