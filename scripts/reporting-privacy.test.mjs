import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

test('deterministic audit writes only to the selected private snapshot directory', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'adsx-reporting-'));
  const legacy = fs.existsSync('gsc-worklist.json') ? fs.readFileSync('gsc-worklist.json', 'utf8') : null;
  try {
    const snapshot = path.join(dir, '2026-01-01'); fs.mkdirSync(snapshot);
    fs.writeFileSync(path.join(dir, 'latest.json'), JSON.stringify({snapshot:'2026-01-01',dir:snapshot,siteUrl:'sc-domain:example.test',startDate:'2025-12-01',endDate:'2026-01-01',lastFinalDay:'2025-12-29',days:31,dataState:'final',totals:{clicks:0,impressions:0,position:0},counts:{pages:0},sitemaps:{submitted:0,indexed:0,files:[]}}));
    for (const file of ['pages','queries','dates']) fs.writeFileSync(path.join(snapshot,file+'.json'),'[]');
    const result = spawnSync(process.execPath,['scripts/gsc-audit.mjs'],{env:{...process.env,GSC_DATA_DIR:dir},encoding:'utf8'});
    assert.equal(result.status,0,result.stderr);
    assert(fs.existsSync(path.join(dir,'gsc-worklist.json')));
    const report=fs.readFileSync(path.join(dir,'reports/latest-audit.md'),'utf8');
    assert(!report.includes('82%'));
    assert(!report.includes('safe to remove'));
    assert.equal(fs.existsSync('gsc-worklist.json') ? fs.readFileSync('gsc-worklist.json','utf8') : null,legacy);
  } finally { fs.rmSync(dir,{recursive:true,force:true}); }
});

test('an API key alone cannot trigger the paid review', () => {
  const result=spawnSync(process.execPath,['scripts/gsc-review.mjs'],{env:{...process.env,ANTHROPIC_API_KEY:'unused-test-sentinel',GSC_PAID_REVIEW_ENABLED:''},encoding:'utf8',timeout:3000});
  assert.equal(result.status,0,result.stderr);assert(result.stdout.includes('disabled'));
});

test('the public GitHub workflow cannot publish analytics or run a paid model', () => {
  const workflow=fs.readFileSync('.github/workflows/gsc-nightly.yml','utf8');
  assert(workflow.includes('if: github.event.repository.private == true'));
  assert(!workflow.includes('scripts/gsc-review.mjs'));
  const scripts=JSON.parse(fs.readFileSync('package.json')).scripts;
  assert(!scripts['gsc:nightly'].includes('gsc-review'));
  assert(!scripts['data:nightly'].includes('gsc-review'));
});
