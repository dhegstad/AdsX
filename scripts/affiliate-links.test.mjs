import test from 'node:test';
import assert from 'node:assert/strict';
import { SHOPIFY_AFFILIATE_LINK, SHOPIFY_FREE_TRIAL_URL, shopifyAffiliateHref, withShopifyAffiliate, isAffiliateUrl, trackAffiliateClick } from '../src/lib/affiliate.ts';

const tags = { slug: 'shopify-startup-cost-calculator', placement: 'inline' };
const parsed = href => new URL(href);

test('every signup builder explicitly targets Shopify free trial with the AdsX publisher and page tags', () => {
  for (const placement of ['inline', 'cta-top', 'cta-mid', 'cta-footer']) {
    const url = parsed(shopifyAffiliateHref({ ...tags, placement }));
    assert.equal(url.origin + url.pathname, SHOPIFY_AFFILIATE_LINK);
    assert.equal(url.searchParams.get('u'), SHOPIFY_FREE_TRIAL_URL);
    assert.equal(url.searchParams.get('subId1'), tags.slug);
    assert.equal(url.searchParams.get('subId2'), placement);
    assert.equal(url.searchParams.has('impacttest'), false);
  }
});

test('existing untagged Impact links acquire both page attribution and an explicit signup destination', () => {
  const url = parsed(withShopifyAffiliate(SHOPIFY_AFFILIATE_LINK, tags));
  assert.equal(url.searchParams.get('u'), SHOPIFY_FREE_TRIAL_URL);
  assert.equal(url.searchParams.get('subId1'), tags.slug);
  assert.equal(url.searchParams.get('subId2'), 'inline');
});

test('root Shopify URLs use the tracked signup flow, including HTTP and protocol-relative links', () => {
  for (const href of ['https://shopify.com', 'https://www.shopify.com/', 'http://www.shopify.com', '//www.shopify.com']) {
    const url = parsed(withShopifyAffiliate(href, tags));
    assert.equal(url.origin + url.pathname, SHOPIFY_AFFILIATE_LINK);
    assert.equal(url.searchParams.get('u'), SHOPIFY_FREE_TRIAL_URL);
  }
});

test('pricing and source links retain their intended destination, query and fragment through Impact', () => {
  for (const destination of ['https://www.shopify.com/no-en/pricing', 'https://www.shopify.com/blog/validate-product-ideas?example=1&section=2#steps']) {
    const url = parsed(withShopifyAffiliate(destination, tags));
    assert.equal(url.searchParams.get('u'), destination);
    assert.equal(url.searchParams.get('subId1'), tags.slug);
  }
});

test('HTTP deep links are upgraded to HTTPS in both direct and existing Impact links', () => {
  const target = 'http://www.shopify.com/blog';
  for (const href of [target, `${SHOPIFY_AFFILIATE_LINK}?u=${encodeURIComponent(target)}`]) {
    assert.equal(parsed(withShopifyAffiliate(href, tags)).searchParams.get('u'), 'https://www.shopify.com/blog');
  }
});

test('copied source tags are replaced once with the current page while brand metadata is preserved', () => {
  const href = `${SHOPIFY_AFFILIATE_LINK}?subId1=old-post&SubId1=other&subId2=cta-top&sharedid=campaign&param1=brand-value`;
  const url = parsed(withShopifyAffiliate(href, tags));
  assert.deepEqual([...url.searchParams].filter(([key]) => /^subid1$/i.test(key)), [['subId1', tags.slug]]);
  assert.deepEqual([...url.searchParams].filter(([key]) => /^subid2$/i.test(key)), [['subId2', 'inline']]);
  assert.equal(url.searchParams.get('sharedid'), 'campaign');
  assert.equal(url.searchParams.get('param1'), 'brand-value');
});

test('restricted 1MBB program references keep their dedicated enrollment destination', () => {
  for (const href of ['https://www.shopify.com/1mbb', 'https://www.shopify.com/ca/1mbb?ref=program']) {
    assert.equal(withShopifyAffiliate(href, tags), href);
  }
});

test('documentation, app listings and non-Shopify destinations are not replaced with a signup page', () => {
  for (const href of ['/topics', '#costs', 'mailto:hello@adsx.com', 'https://help.shopify.com/en/manual', 'https://shopify.dev/docs', 'https://apps.shopify.com/flow', 'https://other.pxf.io/example', 'https://notpxf.io/example', 'https://www.shopify.com.example.org/', 'not a URL']) {
    assert.equal(withShopifyAffiliate(href, tags), href);
    assert.equal(isAffiliateUrl(href), false);
  }
  assert.equal(isAffiliateUrl(SHOPIFY_AFFILIATE_LINK), true);
});

test('new affiliate deep links reject unrelated hosts, embedded credentials and unsafe protocols', () => {
  for (const deepLink of ['https://example.org', 'https://www.shopify.com.evil.test/', 'https://example.org@www.shopify.com/pricing', 'javascript:alert(1)', 'ftp://www.shopify.com/pricing']) {
    assert.throws(() => shopifyAffiliateHref({ ...tags, deepLink }));
  }
});

test('long article identities retain their complete slug up to the documented 255-character limit', () => {
  const slug = 'long-shopify-article-'.repeat(5) + 'one';
  assert.equal(parsed(shopifyAffiliateHref({ ...tags, slug })).searchParams.get('subId1'), slug);
  assert.equal(parsed(shopifyAffiliateHref({ ...tags, slug: 'x'.repeat(300) })).searchParams.get('subId1').length, 255);
});

test('affiliate navigation does not depend on a browser or GA4 being available', () => {
  assert.doesNotThrow(() => trackAffiliateClick(tags));
  globalThis.window = {};
  try {
    assert.doesNotThrow(() => trackAffiliateClick(tags));
    const events = [];
    globalThis.window.gtag = (...args) => events.push(args);
    trackAffiliateClick(tags);
    assert.deepEqual(events, [['event', 'affiliate_click', { post_slug: tags.slug, placement: tags.placement }]]);
  } finally {
    delete globalThis.window;
  }
});
