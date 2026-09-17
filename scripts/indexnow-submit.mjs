import fs from 'node:fs';
import { buildIndexNowPayload, checkPublishedPage } from './indexnow-lib.mjs';

const args = process.argv.slice(2);
const submit = args.includes('--submit');
const files = args.filter(arg => arg !== '--submit');
if (!files.length || files.some(file => !/^docs\/growth\/[a-z0-9-]+\.json$/.test(file))) {
  throw new Error('Usage: node scripts/indexnow-submit.mjs docs/growth/sprint-YYYY-MM-DD.json [--submit]');
}
const config = JSON.parse(fs.readFileSync('config/indexnow.json', 'utf8'));
const key = fs.readFileSync(`public/${config.keyFile}`, 'utf8').trim();
const payload = buildIndexNowPayload(config, key, files.map(file => JSON.parse(fs.readFileSync(file, 'utf8'))));

if (!submit) {
  console.log(JSON.stringify({ mode: 'dry-run', urlCount: payload.urlList.length, urls: payload.urlList }, null, 2));
} else {
  const keyResponse = await fetch(payload.keyLocation, { signal: AbortSignal.timeout(15000) });
  if (keyResponse.status !== 200 || keyResponse.url !== payload.keyLocation || (await keyResponse.text()).trim() !== key) {
    throw new Error('Publish the matching domain-verification file before submitting.');
  }
  // Validate every published page before sending one external notification.
  for (let i = 0; i < payload.urlList.length; i += 5) {
    await Promise.all(payload.urlList.slice(i, i + 5).map(async url => {
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      checkPublishedPage(url, response, await response.text());
    }));
  }
  const response = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST', headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(payload), signal: AbortSignal.timeout(30000),
  });
  const outcome = response.status === 200 ? 'received' : response.status === 202 ? 'received-key-validation-pending' : 'failed';
  console.log(JSON.stringify({ submittedAt: new Date().toISOString(), endpoint: 'https://api.indexnow.org/indexnow',
    httpStatus: response.status, outcome, urlCount: payload.urlList.length, urls: payload.urlList,
    note: 'Receipt is not proof of crawling, indexing, ranking, or AI citation.' }, null, 2));
  if (outcome === 'failed') { console.error((await response.text()).slice(0, 500)); process.exitCode = 1; }
}
