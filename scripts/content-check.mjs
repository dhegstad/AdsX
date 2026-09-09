import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import { publicationTopics, getContentIntent, getTopicSlugs } from '../src/lib/publication.ts';

const batch = JSON.parse(fs.readFileSync('docs/growth/first-batch.json', 'utf8'));
const slugs = process.argv.slice(2).length ? process.argv.slice(2) : [...batch.map(p => p.slug), 'gumroad-vs-shopify-2026', 'shopify-starter-plan-five-dollars-review'];
const validTopics = new Set(publicationTopics.map(t => t.slug));
const all = new Map(fs.readdirSync('src/content/blog').filter(f => f.endsWith('.mdx')).map(file => {
  const parsed = matter(fs.readFileSync(path.join('src/content/blog', file), 'utf8'));
  return [file.slice(0, -4), parsed];
}));
const errors = [];
function check(ok, message) { if (!ok) errors.push(message); }
function hasRoute(url) {
  const clean = url.split(/[?#]/)[0].replace(/\/$/, '') || '/';
  if (clean.startsWith('/blog/') && all.has(clean.slice(6))) return true;
  if (clean.startsWith('/topics/') && validTopics.has(clean.slice(8))) return true;
  return ['page.tsx', 'route.ts'].some(file => fs.existsSync(path.join('src/app', clean, file)));
}
for (const slug of slugs) {
  const parsed = all.get(slug);
  check(parsed, `${slug}: missing file`);
  if (!parsed) continue;
  const { data, content } = parsed;
  for (const key of ['title','excerpt','date','category','author','intent','topics']) check(Boolean(data[key]), `${slug}: missing ${key}`);
  check(['affiliate','learn','app'].includes(data.intent), `${slug}: invalid intent`);
  check(data.topics?.length > 0 && data.topics.every(t => validTopics.has(t)), `${slug}: invalid topics`);
  for (const key of ['date','updated']) if (data[key]) check(!isNaN(Date.parse(data[key])) && Date.parse(data[key]) <= Date.now(), `${slug}: invalid/future ${key}`);
  if (data.updated) check(Date.parse(data.updated) >= Date.parse(data.date), `${slug}: updated before publication`);
  check(!/^# /m.test(content), `${slug}: body repeats the page H1`);
  check(!/\b(?:TODO|TBD|INSERT SOURCE)\b/.test(content), `${slug}: unfinished placeholder`);
  const links = [...content.matchAll(/\[[^\]]+\]\(([^\s)]+)\)/g)].map(m => m[1]);
  const sources = links.filter(h => /^https:\/\/(?:help\.shopify\.com|shopify\.dev|www\.shopify\.com|gumroad\.com|apps\.shopify\.com)\//.test(h));
  check(new Set(sources).size >= 2, `${slug}: needs at least two relevant primary sources`);
  const internal = links.filter(h => h.startsWith('/'));
  check(new Set(internal).size >= 2, `${slug}: needs two internal connections`);
  for (const href of internal) check(hasRoute(href), `${slug}: broken internal route ${href}`);
  check(getContentIntent({slug,...data}) === data.intent, `${slug}: explicit conversion intent ignored`);
  console.log(`${slug}: ${content.trim().split(/\s+/).length} words, ${new Set(sources).size} sources, ${new Set(internal).size} internal links, ${data.intent}`);
}
for (const topic of publicationTopics) {
  for (const slug of topic.picks) {
    check(all.has(slug), `${topic.slug}: missing curated article ${slug}`);
    if (all.has(slug)) check(getTopicSlugs({slug,...all.get(slug).data}).includes(topic.slug), `${topic.slug}: curated article excluded ${slug}`);
  }
}
check(getContentIntent({slug:'shopify-webhooks-reliability-guide',title:'Shopify Webhooks',category:'Developers'}) === 'learn', 'Developer articles should not get new-store or app promotion');
check(getContentIntent({slug:'post-purchase-surveys',title:'Post-purchase surveys',category:'Shopify'}) === 'learn', 'App promotion is deferred during the publication phase');
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
else console.log(`PASS: ${slugs.length} articles, six curated hubs, links, dates, and reader intent.`);
