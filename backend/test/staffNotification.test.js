const test=require('node:test');const assert=require('node:assert/strict');
const p=require.resolve('../services/adminActivity');const calls=[];require.cache[p]={id:p,filename:p,loaded:true,exports:{recordAdminActivity:async n=>calls.push(n)}};
const {staffAlert}=require('../services/staffNotification');
const req={user:{isInternalStaff:true,name:'Test',roleId:{name:'IT'}},method:'POST',originalUrl:'/api/users/123',staffPermissionName:'users.edit'};
test('staff mutation routes to main admin',async()=>{await staffAlert(req,200);assert.equal(calls.at(-1).category,'Sub-admin Activity');assert.equal(calls.at(-1).mainAdminOnly,true);});
test('normal reads and notification changes excluded',async()=>{const n=calls.length;await staffAlert({...req,method:'GET'},200);await staffAlert({...req,originalUrl:'/api/notifications/read'},200);assert.equal(calls.length,n);});
test('denied reads and explicit login included',async()=>{await staffAlert({...req,method:'GET'},403);assert.match(calls.at(-1).title,/Access denied/);await staffAlert(req,200,'Login');assert.match(calls.at(-1).title,/Login/);});
