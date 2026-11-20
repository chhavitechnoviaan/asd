const test = require('node:test');
const assert = require('node:assert/strict');
const {hasPermission} = require('../middleware/permissionAccess');
for(const mode of ['plain','map']) {
  const permissions={vendors:{view:true,add:true,edit:true,delete:true},masterData:{view:true,add:false,edit:false,delete:false}};
  const user={roleId:{permissions:mode==='map'?new Map(Object.entries(permissions)):permissions}};
  test(`${mode}: vendor GET allowed`,()=>assert.equal(hasPermission(user,'vendors','view'),true));
  test(`${mode}: master data GET allowed`,()=>assert.equal(hasPermission(user,'masterData','view'),true));
  test(`${mode}: master data upload denied`,()=>assert.equal(hasPermission(user,'masterData','add'),false));
  test(`${mode}: missing role denied`,()=>assert.equal(hasPermission({roleId:null},'vendors','view'),false));
}

// Regression: nested Map and Mongoose-like getter wrappers.
test('nested maps grant only explicit true', () => {
 const user={roleId:{permissions:new Map([['vendors',new Map([['view',true],['edit',false]])]])}};
 assert.equal(hasPermission(user,'vendors','view'),true);
 assert.equal(hasPermission(user,'vendors','edit'),false);
});
test('missing permissions always deny', () => {
 assert.equal(hasPermission({roleId:{permissions:{}}},'vendors','view'),false);
 assert.equal(hasPermission({roleId:{permissions:{vendors:{view:'true'}}}},'vendors','view'),false);
});
