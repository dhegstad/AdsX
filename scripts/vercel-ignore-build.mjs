import { execFileSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';

// This hook and its test affect deployment decisions, not application output;
// Vercel executes the version in the new checkout before deciding to build.
const recordsOnly = /^(?:docs\/|gsc-data\/|impact-data\/|\.agents\/|README\.md$|scripts\/vercel-ignore-build(?:\.test)?\.mjs$)/;

export function shouldSkipBuild({ env = process.env, cwd = process.cwd(), remote = 'https://github.com/dhegstad/AdsX.git', report = () => {} } = {}) {
  const git = (...args) => execFileSync('git', args, { cwd, encoding: 'utf8', timeout: 15000, stdio: ['ignore', 'pipe', 'pipe'] }).trim();
  try {
    // Compare the complete change since the last successful deployment, not just
    // HEAD's parent: several commits can arrive before Vercel builds the branch.
    let base = env.VERCEL_GIT_PREVIOUS_SHA;
    if (base && /^0+$/.test(base)) base = undefined;
    const preview = env.VERCEL_ENV === 'preview' || (env.VERCEL_GIT_COMMIT_REF && env.VERCEL_GIT_COMMIT_REF !== 'main');
    if (!base && preview) {
      // Vercel's checkout need not retain an authenticated origin remote.
      // AdsX is public: resolve the baseline through its explicit public URL.
      base = git('ls-remote', remote, 'refs/heads/main').split(/\s/)[0];
      if (!/^[a-f0-9]{40}$/.test(base)) return false;
    }
    if (!base || !/^[a-f0-9]{40}$/.test(base)) { report('No safe deployment baseline.'); return false; }
    try { git('cat-file', '-e', `${base}^{commit}`); }
    catch { git('fetch', '--depth=1', remote, base); }
    const files = git('diff', '--name-only', '--no-renames', '-z', base, 'HEAD').split('\0').filter(Boolean);
    report(`Compared ${files.length} changed paths; ${files.filter(file => !recordsOnly.test(file)).length} affect the application.`);
    return files.every(file => recordsOnly.test(file));
  } catch {
    // A shallow clone, missing ref, or Git failure must never hide a release.
    report('Git comparison unavailable; keeping the build.');
    return false;
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const skip = shouldSkipBuild({ report: console.log });
  console.log(skip ? 'Skipping deployment: only internal records changed.' : 'Building: application changed or comparison unavailable.');
  process.exitCode = skip ? 0 : 1;
}
