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
    commit('scripts/vercel-ignore-build.mjs');
    const env = { VERCEL_ENV: 'production', VERCEL_GIT_PREVIOUS_SHA: base };
    assert.equal(shouldSkipBuild({ cwd, remote: cwd, env }), true);
    commit('src/content/blog/new.mdx');
    commit('docs/growth/second-record.md');
    assert.equal(shouldSkipBuild({ cwd, remote: cwd, env }), false, 'content in an earlier commit still builds');
    assert.equal(shouldSkipBuild({ cwd, remote: cwd, env: {} }), false);
    assert.equal(shouldSkipBuild({ cwd, remote: cwd, env: { ...env, VERCEL_GIT_PREVIOUS_SHA: 'a'.repeat(40) } }), false);
    const codeBase = git('rev-parse', 'HEAD');
    git('rm', 'src/content/blog/new.mdx'); git('commit', '-m', 'remove page');
    assert.equal(shouldSkipBuild({ cwd, remote: cwd, env: { ...env, VERCEL_GIT_PREVIOUS_SHA: codeBase } }), false);
  } finally { rmSync(cwd, { recursive: true, force: true }); }
});

test('a first preview resolves public main without a local origin remote', () => {
  const root = mkdtempSync(path.join(tmpdir(), 'adsx-preview-'));
  const cwd = path.join(root, 'checkout');
  const remote = path.join(root, 'remote.git');
  mkdirSync(cwd);
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: 'pipe' }).trim();
  try {
    git('init', '-b', 'main'); git('config', 'user.name', 'Test'); git('config', 'user.email', 'test@example.com');
    writeFileSync(path.join(cwd, 'package.json'), '{}'); git('add', '.'); git('commit', '-m', 'app');
    git('clone', '--bare', cwd, remote);
    git('switch', '-c', 'records'); mkdirSync(path.join(cwd, 'docs'));
    writeFileSync(path.join(cwd, 'docs', 'release.md'), 'Verified'); git('add', '.'); git('commit', '-m', 'records');
    const env = { VERCEL_GIT_COMMIT_REF: 'records', VERCEL_GIT_PREVIOUS_SHA: '0'.repeat(40) };
    assert.equal(shouldSkipBuild({ cwd, remote, env }), true);
    writeFileSync(path.join(cwd, 'package.json'), '{"changed":true}'); git('add', '.'); git('commit', '-m', 'app update');
    assert.equal(shouldSkipBuild({ cwd, remote, env }), false);
  } finally { rmSync(root, { recursive: true, force: true }); }
});
