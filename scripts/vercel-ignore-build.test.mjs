import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { execFileSync } from 'node:child_process';
import { shouldSkipBuild } from './vercel-ignore-build.mjs';

test('deployment comparison includes all commits and fails open without a safe base', () => {
  const cwd = mkdtempSync(path.join(tmpdir(), 'adsx-build-'));
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim();
  const commit = (file) => {
    mkdirSync(path.dirname(path.join(cwd, file)), { recursive: true });
    writeFileSync(path.join(cwd, file), String(Date.now()));
    git('add', '.'); git('commit', '-m', file);
    return git('rev-parse', 'HEAD');
  };
  try {
    git('init'); git('config', 'user.name', 'Test'); git('config', 'user.email', 'test@example.com');
    const base = commit('package.json');
    commit('docs/growth/record.md');
    const env = { VERCEL_ENV: 'production', VERCEL_GIT_PREVIOUS_SHA: base };
    assert.equal(shouldSkipBuild({ cwd, env }), true);
    commit('src/content/blog/new.mdx');
    commit('docs/growth/second-record.md');
    assert.equal(shouldSkipBuild({ cwd, env }), false, 'content in an earlier commit still builds');
    assert.equal(shouldSkipBuild({ cwd, env: {} }), false);
    assert.equal(shouldSkipBuild({ cwd, env: { ...env, VERCEL_GIT_PREVIOUS_SHA: 'a'.repeat(40) } }), false);
    const codeBase = git('rev-parse', 'HEAD');
    git('rm', 'src/content/blog/new.mdx'); git('commit', '-m', 'remove page');
    assert.equal(shouldSkipBuild({ cwd, env: { ...env, VERCEL_GIT_PREVIOUS_SHA: codeBase } }), false);
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});
