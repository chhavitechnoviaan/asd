const test=require('node:test');
const assert=require('node:assert/strict');
const {allowedForStaff}=require('../staffPolicy');
function staff(p){return {roleId:{permissions:new Map(Object.entries(p))}}}
const viewer=staff({vendors:{view:true,add:false,edit:false,delete:false},masterData:{view:true,add:false,edit:false,delete:false}});
const editor=staff({vendors:{view:true,add:true,edit:true,delete:true},masterData:{view:true,add:false,edit:false,delete:false}});
for (const [label,method,url,expected] of [
 ['vendors GET', 'GET','/api/vendors',true],
 ['vendors stats GET','GET','/api/vendors/stats/all',true],
 ['vendors PUT','PUT','/api/vendors/123',false],
 ['vendors DELETE','DELETE','/api/vendors/123',false],
 ['master import GET','GET','/api/master-data/import',true],
 ['master export GET','GET','/api/master-data/export',true],
 ['master upload POST','POST','/api/master-data/upload',false],
 ['master batch DELETE','DELETE','/api/master-data/batch/123',false],
]) test('view-only: '+label,()=>assert.equal(allowedForStaff(viewer,method,url).ok,expected));
for(const [method,url] of [['GET','/api/vendors'],['PUT','/api/vendors/123'],['DELETE','/api/vendors/123']]) test('full vendors access: '+method,()=>assert.equal(allowedForStaff(editor,method,url).ok,true));
test('unmapped route defaults deny',()=>assert.equal(allowedForStaff(editor,'GET','/api/unmapped').ok,false));
