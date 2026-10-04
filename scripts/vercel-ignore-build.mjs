import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

const recordsOnly = /^(?:docs\/|gsc-data\/|impact-data\/|\.agents\/|README\.md$)/;

export function shouldSkipBuild({ env = process.env, cwd = process.cwd() } = {}) {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  try {
    // Compare the complete change since the last successful deployment, not just
    // HEAD's parent: several commits can arrive before Vercel builds the branch.
    let base = env.VERCEL_GIT_PREVIOUS_SHA;
    if (!base && env.VERCEL_ENV === 'preview') {
      base = git('ls-remote', 'origin', 'refs/heads/main').split(/\s/)[0];
      if (!/^[a-f0-9]{40}$/.test(base)) return false;
      try { git('cat-file', '-e', `${base}^{commit}`); }
      catch { git('fetch', '--depth=1', 'origin', base); }
    }
    if (!base || !/^[a-f0-9]{40}$/.test(base)) return false;
    const files = git('diff', '--name-only', '--no-renames', '-z', base, 'HEAD').split('\0').filter(Boolean);
    return files.every(file => recordsOnly.test(file));
  } catch {
    // A shallow clone, missing ref, or Git failure must never hide a release.
    return false;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const skip = shouldSkipBuild();
  console.log(skip ? 'Skipping deployment: only internal records changed.' : 'Building: application changed or comparison unavailable.');
  process.exitCode = skip ? 0 : 1;
}
