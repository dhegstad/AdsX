#!/usr/bin/env python3
"""Check one link per distinct Impact destination, using impacttest=1.

Run manually after the non-clicking audit. Never run this as a recurring crawl:
these are real network requests marked as tests, not customer conversions.
Only report paths, parameter names, publisher identity and cookie names; do not
store browser identifiers or cookies. Uses an isolated cookie jar per check.
"""
import argparse
import concurrent.futures
import datetime
import http.cookiejar
import json
from pathlib import Path
import re
import urllib.error
import urllib.parse
import urllib.request


class NoRedirect(urllib.request.HTTPRedirectHandler):
    def redirect_request(self, *args, **kwargs):
        return None


def check(row):
    jar = http.cookiejar.CookieJar()
    client = urllib.request.build_opener(NoRedirect, urllib.request.HTTPCookieProcessor(jar))
    source = urllib.parse.urlsplit(row['href'])
    params = urllib.parse.parse_qsl(source.query, keep_blank_values=True)
    params = [(key, value) for key, value in params if key.lower() not in ('impacttest', 'subid3')]
    params += [('impacttest', '1'), ('subId3', 'adsx-link-audit-' + datetime.date.today().isoformat())]
    url = urllib.parse.urlunsplit(source._replace(query=urllib.parse.urlencode(params)))
    result = {'destination': row['destination'], 'sourcePage': row['page'], 'testClick': True, 'hops': []}
    for _ in range(12):
        try:
            request = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 AdsXLinkAudit/1.0'})
            response = client.open(request, timeout=30)
        except urllib.error.HTTPError as error:
            response = error
        except (OSError, TimeoutError) as error:
            result['error'] = str(error)
            return result
        parsed = urllib.parse.urlsplit(url)
        query = urllib.parse.parse_qs(parsed.query)
        hop = {'host': parsed.hostname, 'path': parsed.path, 'status': response.status, 'queryKeys': list(query), 'hasImpactClickId': bool(query.get('irclickid')), 'partner': query.get('partner', []), 'cookieNames': sorted({cookie.name for cookie in jar})}
        result['hops'].append(hop)
        if response.status in (301, 302, 303, 307, 308):
            url = urllib.parse.urljoin(url, response.headers['Location'])
            response.close()
            continue
        body = response.read().decode('utf-8', errors='replace')
        title = re.search(r'<title[^>]*>(.*?)</title>', body, re.S | re.I)
        result.update({'finalStatus': response.status, 'finalHost': parsed.hostname, 'finalPath': parsed.path, 'title': re.sub(r'\s+', ' ', title.group(1)).strip() if title else '', 'reachedShopifyWithClickId': parsed.hostname in ('www.shopify.com', 'shopify.com') and hop['hasImpactClickId']})
        response.close()
        return result
    result['error'] = 'Redirect limit reached'
    return result


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--audit', required=True)
    parser.add_argument('--output', required=True)
    args = parser.parse_args()
    audit = json.loads(Path(args.audit).read_text())
    unique = {}
    for row in audit['affiliateLinks']:
        unique.setdefault(row['destination'], row)
    with concurrent.futures.ThreadPoolExecutor(max_workers=2) as pool:
        results = list(pool.map(check, unique.values()))
    report = {'checkedAt': datetime.datetime.now(datetime.timezone.utc).isoformat(), 'testParameter': 'impacttest=1', 'scope': 'One isolated test request per distinct destination. No account creation or payable conversion. Does not verify Impact account reporting.', 'results': results}
    Path(args.output).write_text(json.dumps(report, indent=2) + '\n')
    for result in results:
        print(json.dumps({key: value for key, value in result.items() if key not in ('hops', 'sourcePage')}))


if __name__ == '__main__':
    main()
