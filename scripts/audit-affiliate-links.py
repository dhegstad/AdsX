#!/usr/bin/env python3
"""Crawl AdsX public pages without clicking affiliate links or submitting forms.

Seeds: live sitemap, built public routes, and recursively discovered internal
anchors. Reports every Shopify/Impact anchor, its page, tags and destination.
Network redirect tests are a separate, explicitly marked test-click exercise.
"""
import argparse
import concurrent.futures
import datetime
import json
from pathlib import Path
import re
import time
import urllib.error
import urllib.parse
import urllib.request
import xml.etree.ElementTree as ET
from html.parser import HTMLParser


class Page(HTMLParser):
    def __init__(self, html):
        super().__init__(convert_charrefs=True)
        self.links = []
        self.anchor = None
        self.title = ''
        self.in_title = False
        self.feed(html)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a':
            self.anchor = {**attrs, 'text': ''}
            if 'href' in attrs:
                self.links.append(self.anchor)
        if tag == 'title':
            self.in_title = True

    def handle_data(self, data):
        if self.anchor is not None:
            self.anchor['text'] += data
        if self.in_title:
            self.title += data

    def handle_endtag(self, tag):
        if tag == 'a':
            self.anchor = None
        if tag == 'title':
            self.in_title = False


def fetch(url):
    for attempt in range(2):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'AdsXLinkAudit/1.0 (+https://www.adsx.com)'})
            with urllib.request.urlopen(request, timeout=25) as response:
                content_type = response.headers.get('Content-Type', '')
                body = response.read().decode('utf-8', errors='replace') if any(t in content_type for t in ('html', 'xml', 'text')) else ''
                return {'url': url, 'status': response.status, 'finalUrl': response.url, 'contentType': content_type, 'body': body}
        except urllib.error.HTTPError as error:
            if error.code in (429, 500, 502, 503, 504) and not attempt:
                time.sleep(1)
                continue
            return {'url': url, 'status': error.code, 'finalUrl': error.url, 'error': str(error)}
        except (OSError, TimeoutError) as error:
            if not attempt:
                continue
            return {'url': url, 'status': 0, 'error': str(error)}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--base', default='https://www.adsx.com')
    parser.add_argument('--output', required=True)
    parser.add_argument('--build-dir', default='.next')
    parser.add_argument('--workers', type=int, default=6)
    args = parser.parse_args()
    base = args.base.rstrip('/')
    origin = urllib.parse.urlsplit(base)
    hosts = {origin.netloc, 'www.adsx.com', 'adsx.com'}

    def internal(href, page=base + '/'):
        url = urllib.parse.urlsplit(urllib.parse.urljoin(page, href))
        if url.scheme not in ('http', 'https') or url.netloc not in hosts:
            return None
        # No API requests, authenticated pages, Next internals, or sign-out.
        if re.match(r'^/(?:api|dashboard|_next|_not-found|_global-error|logout|signout)(?:/|$)', url.path):
            return None
        # Query/fragment variants share the same page and affiliate link code.
        return base + (url.path or '/')

    sitemap = fetch(base + '/sitemap.xml')
    if sitemap['status'] != 200:
        raise RuntimeError('Sitemap unavailable: ' + str(sitemap['status']))
    root = ET.fromstring(sitemap['body'])
    seeds = {internal(node.text) for node in root.findall('.//{*}loc')}
    sitemap_count = len(seeds)
    manifest = Path(args.build_dir) / 'prerender-manifest.json'
    if manifest.exists():
        for route in json.loads(manifest.read_text())['routes']:
            if not re.search(r'\.(?:xml|txt|webmanifest|png|jpg|ico)$', route):
                seeds.add(internal(route))
    seeds.discard(None)
    pending = set(seeds)
    pages = {}
    incoming = {}
    affiliate = []
    shopify_direct = []
    external = set()
    issues = []
    tag_pages = {}
    while pending:
        batch = sorted(pending)
        pending = set()
        with concurrent.futures.ThreadPoolExecutor(max_workers=args.workers) as pool:
            for result in pool.map(fetch, batch):
                body = result.pop('body', '')
                url = result['url']
                pages[url] = result
                if result['status'] != 200:
                    issues.append({'page': url, 'type': 'internal_http_error', 'status': result['status']})
                    continue
                if 'html' not in result.get('contentType', ''):
                    continue
                page = Page(body)
                result['title'] = page.title
                result['anchorCount'] = len(page.links)
                result['affiliateCount'] = 0
                result['directShopifyCount'] = 0
                for anchor in page.links:
                    href = anchor['href']
                    target = internal(href, url)
                    if target:
                        incoming.setdefault(target, set()).add(url)
                        if target not in pages and target not in batch:
                            pending.add(target)
                        continue
                    parsed = urllib.parse.urlsplit(urllib.parse.urljoin(url, href))
                    if parsed.scheme not in ('http', 'https'):
                        continue
                    external.add(urllib.parse.urlunsplit(parsed))
                    host = parsed.hostname or ''
                    row = {'page': url, 'href': href, 'text': ' '.join(anchor['text'].split()), 'rel': anchor.get('rel', '')}
                    if host == 'pxf.io' or host.endswith('.pxf.io'):
                        params = urllib.parse.parse_qs(parsed.query, keep_blank_values=True)
                        row.update({'subId1': params.get('subId1', [''])[0], 'subId2': params.get('subId2', [''])[0], 'destination': params.get('u', ['(Impact default)'])[0]})
                        affiliate.append(row)
                        result['affiliateCount'] += 1
                        if parsed.scheme != 'https' or host != 'shopify.pxf.io' or parsed.path != '/c/6318547/3797171/13624':
                            issues.append({**row, 'type': 'unexpected_affiliate_identity'})
                        for key in ('subId1', 'subId2'):
                            if len(params.get(key, [])) != 1 or not row[key]:
                                issues.append({**row, 'type': 'missing_or_duplicate_' + key})
                        expected_slug = urllib.parse.urlsplit(result['finalUrl']).path.rstrip('/').split('/')[-1]
                        if urllib.parse.urlsplit(result['finalUrl']).path.startswith('/topics/'):
                            expected_slug = 'topic-' + expected_slug
                        if expected_slug and row['subId1'] != expected_slug:
                            issues.append({**row, 'type': 'incorrect_page_source', 'expectedSubId1': expected_slug})
                        if row['subId2'] not in ('inline', 'cta-top', 'cta-mid', 'cta-footer'):
                            issues.append({**row, 'type': 'unknown_placement'})
                        if 'sponsored' not in row['rel'].split():
                            issues.append({**row, 'type': 'missing_sponsored_rel'})
                        if any(key.lower() == 'impacttest' for key in params):
                            issues.append({**row, 'type': 'test_flag_in_published_link'})
                        if row['subId1']:
                            tag_pages.setdefault(row['subId1'], set()).add(url)
                        if row['destination'] != '(Impact default)':
                            destination = urllib.parse.urlsplit(row['destination'])
                            if destination.scheme != 'https' or destination.hostname not in ('shopify.com', 'www.shopify.com'):
                                issues.append({**row, 'type': 'unexpected_affiliate_destination'})
                    elif host == 'shopify.com' or host.endswith('.shopify.com') or host == 'shopify.dev' or host.endswith('.shopify.dev'):
                        row['host'] = host
                        shopify_direct.append(row)
                        result['directShopifyCount'] += 1
                        if host in ('shopify.com', 'www.shopify.com') and not re.match(r'^/(?:[a-z]{2}(?:-[a-z]{2})?/)?1mbb(?:/|$)', parsed.path, re.I):
                            issues.append({**row, 'type': 'untracked_shopify_marketing_link'})
                if len(pages) % 100 == 0:
                    print(f'Crawled {len(pages)} URLs; {len(affiliate)} affiliate anchors', flush=True)
        pending.difference_update(pages)
        if len(pages) + len(pending) > 10000:
            raise RuntimeError('Crawl limit exceeded; investigate URL expansion')

    for tag, urls in tag_pages.items():
        canonical = {pages[url].get('finalUrl', url).rstrip('/') for url in urls}
        if len(canonical) > 1:
            issues.append({'type': 'source_id_collision', 'subId1': tag, 'pages': sorted(urls)})
    for issue in issues:
        if issue['type'] == 'internal_http_error':
            issue['linkedFrom'] = sorted(incoming.get(issue['page'], set()))
    report = {
        'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(),
        'base': base,
        'scope': 'Public sitemap, built routes, recursively linked internal URLs; HTML anchor inventory. Excludes authenticated/API routes. Does not click affiliate links or verify Impact conversions.',
        'summary': {'sitemapUrls': sitemap_count, 'seedUrls': len(seeds), 'checkedUrls': len(pages), 'htmlPages': sum('html' in p.get('contentType', '') for p in pages.values()), 'blogPosts': len({urllib.parse.urlsplit(p.get('finalUrl', p['url'])).path for p in pages.values() if p['status'] == 200 and re.match(r'^/blog/[^/]+/?$', urllib.parse.urlsplit(p.get('finalUrl', p['url'])).path)}), 'affiliateAnchors': len(affiliate), 'pagesWithAffiliateLinks': sum(p.get('affiliateCount', 0) > 0 for p in pages.values()), 'directShopifyAnchors': len(shopify_direct), 'uniqueExternalUrls': len(external), 'issues': len(issues)},
        'issues': issues,
        'pages': [pages[key] for key in sorted(pages)],
        'affiliateLinks': affiliate,
        'directShopifyLinks': shopify_direct,
        'externalUrls': sorted(external),
    }
    path = Path(args.output)
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(report, indent=2) + '\n')
    print(json.dumps(report['summary'], indent=2))
    print('Report:', path)
    return bool(issues)


if __name__ == '__main__':
    raise SystemExit(main())
