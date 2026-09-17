import test from 'node:test';
import assert from 'node:assert/strict';
import { buildIndexNowPayload, checkPublishedPage } from './indexnow-lib.mjs';
const key = '0123456789abcdef0123456789abcdef';
const config = { host: 'www.adsx.com', keyFile: `${key}.txt` };
const manifest = { articles: [{ slug: 'shopify-costs' }], pages: [{ path: '/' }, { path: '/blog/shopify-costs' }] };
test('one batch deduplicates articles and public page paths on the canonical host', () => {
  const p = buildIndexNowPayload(config, key, [manifest, manifest]);
  assert.deepEqual(p.urlList, ['https://www.adsx.com/blog/shopify-costs', 'https://www.adsx.com/']);
  assert.equal(p.keyLocation, `https://www.adsx.com/${key}.txt`);
});
test('rejects foreign, private, parameterized and traversal paths before submitting', () => {
  for (const path of ['https://example.com/', '//example.com', '/api/report', '/login', '/dashboard/users', '/blog/../login', '/blog/x?ref=y', '/blog/x#section', '/blog/%2e%2e']) {
    assert.throws(() => buildIndexNowPayload(config, key, [{ articles: [], pages: [{ path }] }]));
  }
  assert.throws(() => buildIndexNowPayload(config, key, [{ articles: [{ slug: '../login' }] }]));
});
test('rejects wrong ownership configuration and invalid batch sizes', () => {
  assert.throws(() => buildIndexNowPayload({ ...config, host: 'adsx.com' }, key, [manifest]));
  assert.throws(() => buildIndexNowPayload(config, 'wrong', [manifest]));
  assert.throws(() => buildIndexNowPayload(config, key, [{ articles: [] }]));
  assert.throws(() => buildIndexNowPayload(config, key, [{ articles: Array.from({length: 10001}, (_, i) => ({slug: `post-${i}`})) }]));
});
test('live checks reject redirects, errors, noindex and conflicting canonicals', () => {
  const url = 'https://www.adsx.com/blog/shopify-costs';
  const response = { status: 200, url, headers: new Headers() };
  const html = `<link rel="canonical" href="${url}"><meta name="robots" content="index, follow">`;
  assert.doesNotThrow(() => checkPublishedPage(url, response, html));
  assert.doesNotThrow(() => checkPublishedPage('https://www.adsx.com/', {...response, url: 'https://www.adsx.com/'}, '<link rel="canonical" href="https://www.adsx.com">'));
  assert.throws(() => checkPublishedPage(url, {...response, status: 404}, html));
  assert.throws(() => checkPublishedPage(url, {...response, url: 'https://www.adsx.com/'}, html));
  assert.throws(() => checkPublishedPage(url, response, html.replace('index, follow', 'noindex, follow')));
  assert.throws(() => checkPublishedPage(url, {...response, headers: new Headers({'x-robots-tag':'noindex'})}, html));
  assert.throws(() => checkPublishedPage(url, response, html.replace('href="'+url, 'href="https://example.com/')));
});
