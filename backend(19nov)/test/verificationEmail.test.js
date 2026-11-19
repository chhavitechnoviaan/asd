const { test } = require('node:test');
const assert = require('node:assert/strict');
const Module = require('node:module');
const crypto = require('node:crypto');
const originalLoad = Module._load;
let lastSent, account, storedHash;
const fakeSettings={emailSms:{emailVerificationEnabled:true,smtp:{host:'smtp.example.test',port:587,encryption:'TLS',username:'noreply@example.test',password:'encrypted-test-value'}}};
const FakeUser={
  async findOne(filter){return filter.emailVerificationTokenHash===storedHash && account.emailVerificationExpiresAt>new Date() ? account : null;},
  async findOneAndUpdate(filter,update){
    if(filter.emailVerificationTokenHash!==storedHash||!storedHash)return null;
    storedHash=null;
    account.emailVerified=update.$set.emailVerified;
    account.verificationRequired=update.$set.verificationRequired;
    return account;
  }
};
Module._load=function(request,parent,isMain){
  if(request==='../models/AdminSettings')return {findOne:()=>({lean:async()=>fakeSettings})};
  if(request==='../utils/settingSecrets')return {decrypt:()=>"smtp-password"};
  if(request==='nodemailer')return {createTransport:()=>({sendMail:async mail=>(lastSent=mail),verify:async()=>true,close:()=>{}})};
  if(request==='../models/user')return FakeUser;
  return originalLoad.apply(this,arguments);
};
process.env.PUBLIC_FRONTEND_URL='https://staging.cargomate.example';
const email=require('../services/verificationEmail');
test('Single-use verification token is hashed, expires in 30 min, and consumes exactly once',async()=>{
  account={_id:'mock-user-id',email:'demo@example.test',emailVerified:false,async save(){storedHash=this.emailVerificationTokenHash;}};
  const start=Date.now();
  assert.equal(await email.sendVerificationEmail(account,await email.getVerificationSettings()),true);
  assert.match(storedHash,/^[a-f0-9]{64}$/);
  assert.ok(account.emailVerificationExpiresAt.getTime()-start<=30*60*1000+1000);
  assert.ok(account.emailVerificationExpiresAt.getTime()-start>=29*60*1000);
  const token=new URL(lastSent.text.match(/https:\/\/\S+/)[0]).searchParams.get('token');
  assert.notEqual(token,storedHash);
  assert.equal(crypto.createHash('sha256').update(token).digest('hex'),storedHash);
  const verified=await email.verifyToken(token);
  assert.equal(verified.emailVerified,true);
  assert.equal(account.verificationRequired,false);
  assert.equal(await email.verifyToken(token),null);
});
test('Resend throttled for 60 seconds and SMTP test performs connection check',async()=>{
  const settings=await email.getVerificationSettings();
  await assert.rejects(()=>email.sendVerificationEmail(account,settings),{status:429});
  assert.equal(await email.testSmtpConnection(),true);
});

process.on("exit",()=>{Module._load=originalLoad});
