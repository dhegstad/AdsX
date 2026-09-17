const ORIGIN = 'https://www.adsx.com';

// IndexNow's domain-verification key is deliberately served publicly. It is
// not a Shopify, analytics, hosting, or account credential.
export function buildIndexNowPayload(config, key, manifests) {
  if (config.host !== 'www.adsx.com') throw new Error('Only the canonical AdsX host is supported.');
  if (!/^[a-f0-9]{32}$/.test(key) || config.keyFile !== `${key}.txt`) {
    throw new Error('Invalid domain-verification key file.');
  }
  const paths = manifests.flatMap(manifest => {
    if (!Array.isArray(manifest.articles)) throw new Error('Manifest must contain articles.');
    return [
      ...manifest.articles.map(article => {
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(article.slug)) throw new Error('Invalid article slug.');
        return `/blog/${article.slug}`;
      }),
      ...(manifest.pages ?? []).map(page => page.path),
    ];
  });
  const urlList = [...new Set(paths.map(path => {
    if (typeof path !== 'string' || !/^\/(?:[a-z0-9]+(?:-[a-z0-9]+)*(?:\/[a-z0-9]+(?:-[a-z0-9]+)*)*)?$/.test(path)) {
      throw new Error('Only clean, relative AdsX page paths are supported.');
    }
    if (/^\/(api|login|signup|dashboard|v0)(?:\/|$)/.test(path)) throw new Error('Private routes cannot be submitted.');
    return `${ORIGIN}${path}`;
  }))];
  if (!urlList.length || urlList.length > 10000) throw new Error('Submit between 1 and 10,000 changed URLs.');
  return { host: config.host, key, keyLocation: `${ORIGIN}/${config.keyFile}`, urlList };
}

export function checkPublishedPage(url, response, html) {
  if (response.status !== 200 || response.url !== url) throw new Error(`Not a live canonical URL: ${url}`);
  if (/noindex/i.test(response.headers.get('x-robots-tag') ?? '')) throw new Error(`Noindex header: ${url}`);
  const tags = [...html.matchAll(/<meta\b[^>]*>/gi)].map(match => match[0]);
  if (tags.some(tag => /name=["'](?:robots|bingbot)["']/i.test(tag) && /noindex/i.test(tag))) {
    throw new Error(`Noindex page: ${url}`);
  }
  const canonical = html.match(/<link\b[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)/i)?.[1];
  if (!canonical || new URL(canonical).href !== new URL(url).href) throw new Error(`Canonical mismatch: ${url}`);
}
