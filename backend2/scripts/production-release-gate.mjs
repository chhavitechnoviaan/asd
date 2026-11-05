/**
 * CargoMate live release gate. Execute only against an isolated staging backend.
 * Strict by design: critical unconfigured integrations are failures, not passes.
 * Never logs access tokens, passwords, or provider payloads.
 *
 * API_BASE_URL=https://staging.example.com/api \
 * ADMIN_EMAIL=... ADMIN_PASSWORD=... \
 * SUBADMIN_EMAIL=... SUBADMIN_PASSWORD=... \
 * USER_EMAIL=... USER_PASSWORD=... \
 * B2B_EMAIL=... B2B_PASSWORD=... \
 * AI_STREAM_TEST=1 node backend/scripts/production-release-gate.mjs
 */
import { writeFileSync } from 'node:fs';
const base = (process.env.API_BASE_URL || '').replace(/\/+$/, '');
const rows = [];
const add = (name, result, detail = '') => { rows.push({name,result,detail}); console.log(`${result.padEnd(5)} ${name}${detail ? `: ${detail}` : ''}`); };
const withTimeout = (milliseconds = 15000) => AbortSignal.timeout(milliseconds);
async function request(method, path, {token, json, timeout = 15000} = {}) {
  const headers = {'Accept':'application/json'};
  if (token) headers.Authorization = `Bearer ${token}`;
  if (json !== undefined) headers['Content-Type'] = 'application/json';
  const response = await fetch(`${base}${path}`, {method,headers,body:json===undefined?undefined:JSON.stringify(json),signal:withTimeout(timeout)});
  let body;
  const ct = response.headers.get('content-type') || '';
  if (ct.includes('application/json')) { try { body=await response.json(); } catch { body=null; } }
  return {response,body};
}
async function check(name, fn) {
  try { const result = await fn(); if (result === true) add(name,'PASS'); else add(name,'FAIL',typeof result==='string'?result:'Unexpected response'); }
  catch (error) { add(name,'FAIL',error.name === 'TimeoutError'?'Request timeout':error.message.replace(/Bearer\s+\S+/g,'Bearer [REDACTED]')); }
}
async function signIn(label, emailKey, passwordKey, type) {
  if (!process.env[emailKey] || !process.env[passwordKey]) {add(`${label} login`,'FAIL',`Missing ${emailKey}/${passwordKey}`);return null;}
  let token=null;
  await check(`${label} login`,async()=>{
    const {response,body}=await request('POST','/auth/login',{json:{email:process.env[emailKey],password:process.env[passwordKey],type}});
    token=body?.token || body?.data?.token || body?.accessToken;
    return response.ok && typeof token === 'string' && token.length>20 ? true : `HTTP ${response.status}; no usable token`;
  });
  return token;
}
async function main(){
  if(!/^https:\/\//.test(base)) {add('Staging URL HTTPS','FAIL','Set API_BASE_URL=https://.../api');return;}
  await check('MongoDB health',async()=>{const {response,body}=await request('GET','/health');return response.ok&&body?.database==='connected'||`HTTP ${response.status}; DB not connected`;});
  await check('Public branding',async()=>{const {response}=await request('GET','/public-config');return response.ok||`HTTP ${response.status}`;});
  await check('Unauthenticated notifications blocked',async()=>{const {response}=await request('GET','/notifications');return [401,403].includes(response.status)||`HTTP ${response.status}`;});
  await check('Unauthenticated AI history blocked',async()=>{const {response}=await request('GET','/ai-chat/history?session_id=invalid');return [401,403].includes(response.status)||`HTTP ${response.status}`;});
  const admin=await signIn('Main Admin','ADMIN_EMAIL','ADMIN_PASSWORD','admin');
  const staff=await signIn('Sub-admin','SUBADMIN_EMAIL','SUBADMIN_PASSWORD','admin');
  const user=await signIn('User','USER_EMAIL','USER_PASSWORD','user');
  const b2b=await signIn('B2B','B2B_EMAIL','B2B_PASSWORD','b2b');
  for(const [role,token] of [['Admin',admin],['Sub-admin',staff],['User',user],['B2B',b2b]]){
    if (!token) {add(`${role} /auth/me`,'FAIL','Login prerequisite failed');continue;}
    await check(`${role} /auth/me`,async()=>{const {response,body}=await request('GET','/auth/me',{token});return response.ok&&Boolean(body)||`HTTP ${response.status}`;});
  }
  if(admin){
    await check('Admin notifications from DB',async()=>{const {response,body}=await request('GET','/notifications',{token:admin});return response.ok&&Array.isArray(body?.data)||`HTTP ${response.status}; missing data array`;});
    await check('AI session creation',async()=>{
      const {response,body}=await request('POST','/ai-chat/session',{token:admin,json:{}});
      if(!response.ok||!body?.session_id)return `HTTP ${response.status}; session not created`;
      main.sessionId=body.session_id;
      return true;
    });
    if(main.sessionId){
      await check('Admin AI history owned session',async()=>{const {response}=await request('GET',`/ai-chat/history?session_id=${encodeURIComponent(main.sessionId)}`,{token:admin,timeout:40000});return response.ok||`HTTP ${response.status}; upstream history may be missing before first message`;});
      if(user)await check('User cannot read Admin AI history',async()=>{const {response}=await request('GET',`/ai-chat/history?session_id=${encodeURIComponent(main.sessionId)}`,{token:user});return [403,404].includes(response.status)||`HTTP ${response.status}`;});
      if(process.env.AI_STREAM_TEST==='1'){
        await check('Admin AI live streaming',async()=>{
          const response=await fetch(`${base}/ai-chat/stream`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${admin}`,Accept:'text/event-stream'},body:JSON.stringify({message:'Hello',session_id:main.sessionId}),signal:withTimeout(125000)});
          if(!response.ok)return `HTTP ${response.status}`;
          const ct=response.headers.get('content-type')||'';
          if(!ct.includes('text/event-stream'))return 'Wrong content type';
          const reader=response.body?.getReader(); if(!reader)return 'No response stream';
          let eventCount=0;let bytes=0;
          while(true){const {done,value}=await reader.read();if(done)break;bytes+=value.byteLength;eventCount+=new TextDecoder().decode(value).split('data:').length-1;if(bytes>2000000){await reader.cancel();break;}}
          return eventCount>0||`No SSE events (${bytes} bytes)`;
        });
      } else add('Admin AI live streaming','FAIL','Set AI_STREAM_TEST=1 and ensure staging AI provider is connected');
    }
  }
  if(staff)await check('Sub-admin denied Main Admin roles management',async()=>{const {response}=await request('POST','/roles',{token:staff,json:{name:'release-test-do-not-create'}});return [401,403].includes(response.status)||`HTTP ${response.status}`;});
  if(user)await check('User denied Admin roles listing',async()=>{const {response}=await request('GET','/roles',{token:user});return [401,403].includes(response.status)||`HTTP ${response.status}`;});
}
await main();
const passed=rows.filter(x=>x.result==='PASS').length;const failed=rows.filter(x=>x.result==='FAIL').length;
const output={timestamp:new Date().toISOString(),baseUrl:base,passed,failed,checks:rows};
writeFileSync(process.env.RELEASE_REPORT_PATH||'release-gate-report.json',JSON.stringify(output,null,2));
console.log(`\nRELEASE ${failed===0&&passed>0?'GATE PASSED':'GATE FAILED'}: ${passed} passed; ${failed} failed.`);
process.exitCode=failed===0&&passed>0?0:1;
