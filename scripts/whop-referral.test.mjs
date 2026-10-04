import test from 'node:test';
import assert from 'node:assert/strict';
import { WHOP_REFERRAL_URL, isWhopReferralUrl, trackWhopReferralClick } from '../src/lib/whop-referral.ts';
import { withShopifyAffiliate } from '../src/lib/affiliate.ts';

test('the dashboard-issued Whop code stays intact through Shopify routing', () => {
  assert.equal(isWhopReferralUrl(WHOP_REFERRAL_URL), true);
  assert.equal(withShopifyAffiliate(WHOP_REFERRAL_URL, { slug: 'whop-vs-shopify', placement: 'inline' }), WHOP_REFERRAL_URL);
});

test('documentation, unowned codes, lookalike hosts and ambiguous codes are not AdsX Whop referrals', () => {
  for (const url of [
    'https://docs.whop.com/launch-your-business', 'https://whop.com/network/pricing/',
    'https://whop.com/start/?code=someone-else', 'https://whop.com/start/',
    'https://whop.com.evil.example/start/?code=YDMPYR',
    'https://whop.com@evil.example/start/?code=YDMPYR',
    'https://whop.com/start/?code=YDMPYR&code=someone-else',
    'http://whop.com/start/?code=YDMPYR', '/start/?code=YDMPYR',
  ]) assert.equal(isWhopReferralUrl(url), false, url);
});

test('Whop click events identify the provider and host page without customer data', () => {
  const prior = globalThis.window;
  const events = [];
  try {
    globalThis.window = { gtag: (...args) => events.push(args) };
    trackWhopReferralClick('whop-checkout-links-guide');
    assert.deepEqual(events, [['event', 'whop_referral_click', { provider: 'whop', post_slug: 'whop-checkout-links-guide', placement: 'inline' }]]);
    globalThis.window = {};
    assert.doesNotThrow(() => trackWhopReferralClick('whop-ecommerce-guide'));
  } finally {
    if (prior === undefined) delete globalThis.window;
    else globalThis.window = prior;
  }
});
