/**
 * CargoMate staging smoke test. Requires a RUNNING backend, connected MongoDB,
 * configured providers and valid tokens. Never prints credentials.
 *
 * API_BASE_URL=https://staging-api.example.com/api node scripts/staging-smoke.mjs
 * ADMIN_JWT=... node scripts/staging-smoke.mjs   (also SMTP connectivity)
 * GOOGLE_TEST_TOKEN=... SOCIAL_TEST_ROLE=user node scripts/staging-smoke.mjs
 * FACEBOOK_TEST_TOKEN=... SOCIAL_TEST_ROLE=b2b node scripts/staging-smoke.mjs
 * CUSTOMER_JWT=... TEST_PLAN_ID=... ENABLE_ORDER_SMOKE=1 node scripts/staging-smoke.mjs
 * TEST_INVOICE_ID=... CUSTOMER_JWT=... node scripts/staging-smoke.mjs
 */
const base=(process.env.API_BASE_URL||'http://localhost:8000/api').replace(/\/$/,'');
let failures=0, checks=0;
async function check(name,path,opts={},test=(r)=>r.ok){
  checks++;
  try{
    const response=await fetch(`${base}${path}`,{signal:AbortSignal.timeout(12000),...opts});
    const ok=await test(response);
    console.log(`${ok?'PASS':'FAIL'} ${name} (HTTP ${response.status})`);
    if(!ok)failures++;
    return response;
  }catch(e){failures++;console.log(`FAIL ${name}: ${e.message}`);return null;}
}
const jsonBody=(value)=>({headers:{'Content-Type':'application/json'},method:'POST',body:JSON.stringify(value)});
await check('MongoDB-connected health endpoint','/health',{},async r=>r.ok&&(await r.json()).database==='connected');
await check('Public branding configuration','/public-config',{},async r=>r.ok&&Boolean((await r.json()).data?.websiteTitle));
const admin=process.env.ADMIN_JWT;
if(admin)await check('SMTP credentials + connectivity','/admin-settings/email/test',{...jsonBody({}),headers:{...jsonBody({}).headers,Authorization:`Bearer ${admin}`}});
else console.log('SKIP SMTP live test (set ADMIN_JWT)');
for(const [provider,key] of [['google','GOOGLE_TEST_TOKEN'],['facebook','FACEBOOK_TEST_TOKEN']]){
  if(process.env[key]){
    await check(`${provider} provider sign-in`,'/auth/social',jsonBody({provider,role:process.env.SOCIAL_TEST_ROLE||'user',token:process.env[key]}));
  }else console.log(`SKIP ${provider} live OAuth (set ${key})`);
}
if(process.env.CUSTOMER_JWT&&process.env.TEST_PLAN_ID&&process.env.ENABLE_ORDER_SMOKE==='1'){
  await check('Razorpay TEST-mode order initiation','/ai-subscription/order',{
    ...jsonBody({planId:process.env.TEST_PLAN_ID}),
    headers:{'Content-Type':'application/json',Authorization:`Bearer ${process.env.CUSTOMER_JWT}`}
  },async r=>r.ok&&Boolean((await r.json()).data?.orderId));
}else console.log('SKIP Razorpay live test (needs CUSTOMER_JWT, TEST_PLAN_ID and ENABLE_ORDER_SMOKE=1)');
if(process.env.TEST_INVOICE_ID&&process.env.CUSTOMER_JWT){
  const id=encodeURIComponent(process.env.TEST_INVOICE_ID);
  await check('Subscription invoice PDF header',`/ai-subscription/invoices/${id}/pdf`,{headers:{Authorization:`Bearer ${process.env.CUSTOMER_JWT}`}},async r=>r.ok&&new TextDecoder().decode((await r.arrayBuffer()).slice(0,5))==='%PDF-');
}else console.log('SKIP invoice PDF test (needs TEST_INVOICE_ID and CUSTOMER_JWT)');
console.log(`\n${checks-failures}/${checks} executed smoke checks passed; skipped checks are NOT verified.`);
process.exitCode=failures?1:0;
