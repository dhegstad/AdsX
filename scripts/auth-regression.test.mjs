import test from 'node:test';
import assert from 'node:assert/strict';
import { betterAuth } from 'better-auth';
import { memoryAdapter } from 'better-auth/adapters/memory';

// Import the application's options with inert credentials. Tests use memory only.
process.env.BETTER_AUTH_URL='http://localhost:3100';
process.env.DATABASE_URL='postgresql://test:test@127.0.0.1:1/test';
process.env.GOOGLE_CLIENT_ID='test-google-client';
process.env.GOOGLE_CLIENT_SECRET='test-google-secret';
const {auth: configured}=await import('../src/lib/auth.ts');
function fixture(){
 const db={user:[],session:[],account:[],verification:[]};
 const auth=betterAuth({...configured.options,baseURL:'http://localhost:3100',secret:'local-test-only-secret-not-used-by-any-real-account-2026',database:memoryAdapter(db),rateLimit:{enabled:false}});
 const call=(path,body,cookie)=>auth.handler(new Request('http://localhost:3100/api/auth/'+path,{method:body?'POST':'GET',headers:{...(body?{'content-type':'application/json',origin:'http://localhost:3100'}:{}),...(cookie?{cookie}:{})},...(body?{body:JSON.stringify(body)}:{})}));
 return {db,call};
}
const cookieOf=r=>r.headers.getSetCookie().map(x=>x.split(';')[0]).join('; ');
test('email signup, authenticated session, signout, and password signin work in isolation',async()=>{
 const {call}=fixture();
 const initial=await call('get-session');assert.equal(initial.status,200);assert.equal(await initial.json(),null);
 const signup=await call('sign-up/email',{email:'merchant@example.test',password:'Test-password-94821',name:'Test Merchant'});assert.equal(signup.status,200);const cookie=cookieOf(signup);assert(cookie);
 const session=await call('get-session',null,cookie);assert.equal((await session.json()).user.email,'merchant@example.test');
 const out=await call('sign-out',{},cookie);assert.equal(out.status,200);
 const expired=await call('get-session',null,cookie);assert.equal(await expired.json(),null);
 const wrong=await call('sign-in/email',{email:'merchant@example.test',password:'Wrong-password-abc'});assert.equal(wrong.status,401);
 const signin=await call('sign-in/email',{email:'merchant@example.test',password:'Test-password-94821'});assert.equal(signin.status,200);
 const resumed=await call('get-session',null,cookieOf(signin));assert.equal((await resumed.json()).user.email,'merchant@example.test');
});
test('Google authorization preserves required scopes without making an OAuth network request',async()=>{
 const {call}=fixture();const response=await call('sign-in/social',{provider:'google',callbackURL:'/dashboard'});assert.equal(response.status,200);const result=await response.json();const u=new URL(result.url);assert.equal(u.hostname,'accounts.google.com');assert.equal(u.searchParams.get('access_type'),'offline');assert.equal(u.searchParams.get('prompt'),'consent');
 const scopes=u.searchParams.get('scope').split(' ');for(const scope of ['openid','email','profile','https://www.googleapis.com/auth/webmasters.readonly','https://www.googleapis.com/auth/indexing'])assert(scopes.includes(scope));assert(u.searchParams.get('state'));assert(u.searchParams.get('code_challenge'));
});
test('untrusted origins cannot initiate email sign-in',async()=>{
 const {db}=fixture();const isolated=betterAuth({...configured.options,baseURL:'http://localhost:3100',secret:'local-test-only-secret-not-used-by-any-real-account-2026',database:memoryAdapter(db)});
 const r=await isolated.handler(new Request('http://localhost:3100/api/auth/sign-in/email',{method:'POST',headers:{origin:'https://untrusted.example','content-type':'application/json'},body:JSON.stringify({email:'merchant@example.test',password:'Wrong-password-abc'})}));assert.equal(r.status,403);
});
