const test = require('node:test');
const assert = require('node:assert/strict');
const {allowedForStaff} = require('../middleware/staffPolicy');
const role = (vendors,masterData) => ({roleId:{permissions:{vendors,masterData}}});
const viewOnly={view:true,add:false,edit:false,delete:false};
test('Vendors: view-only can fetch but cannot mutate',()=>{
 const user=role(viewOnly,{});
 assert.equal(allowedForStaff(user,'GET','/api/vendors').ok,true);
 assert.equal(allowedForStaff(user,'GET','/api/vendors/stats/all').ok,true);
 assert.equal(allowedForStaff(user,'PATCH','/api/vendors/123').ok,false);
 assert.equal(allowedForStaff(user,'DELETE','/api/vendors/123').ok,false);
});
test('Master data: view-only can fetch import and export but not upload/delete',()=>{
 const user=role({},viewOnly);
 for(const path of ['/api/master-data/import','/api/master-data/export']) assert.equal(allowedForStaff(user,'GET',path).ok,true);
 assert.equal(allowedForStaff(user,'POST','/api/master-data/upload').ok,false);
 assert.equal(allowedForStaff(user,'DELETE','/api/master-data/batch/123').ok,false);
});
test('Vendor all-actions role permits editing and deleting',()=>{
 const user=role({view:true,add:true,edit:true,delete:true},viewOnly);
 assert.equal(allowedForStaff(user,'GET','/api/vendors').ok,true);
 assert.equal(allowedForStaff(user,'PATCH','/api/vendors/123').ok,true);
 assert.equal(allowedForStaff(user,'DELETE','/api/vendors/123').ok,true);
});
test('Missing permission is denied, not silently granted',()=>{
 const user=role({},{});
 assert.equal(allowedForStaff(user,'GET','/api/vendors').ok,false);
 assert.equal(allowedForStaff(user,'GET','/api/master-data/import').ok,false);
});
