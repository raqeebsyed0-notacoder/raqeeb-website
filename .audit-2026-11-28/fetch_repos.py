import json, subprocess, re, os

R = 'raqeebsyed0-notacoder'
base = 'https://raw.githubusercontent.com'

def get(repo, path, outdir):
    dst = os.path.join(outdir, path.replace('/', '__'))
    if not os.path.exists(dst):
        subprocess.run(['curl', '-sL', f'{base}/{repo}/HEAD/{path}', '-o', dst], check=False)
    return dst

def tree(repo):
    f = f'/tmp/{repo}.tree.json'
    if not os.path.exists(f):
        subprocess.run(['curl', '-s', f'https://api.github.com/repos/{R}/{repo}/git/trees/HEAD?recursive=1', '-o', f], check=False)
    return json.load(open(f)).get('tree', [])

for repo, outdir, files in [
    ('hermes-approval-and-rejection-plugin', '/tmp/apv', ['README.md', 'plugin.yaml', 'dashboard/plugin_api.py', 'desktop/plugin.js', 'docs/COVERAGE-MAP.md', 'dashboard/manifest.json']),
    ('orio', '/tmp/orio', ['README.md', 'DESIGN.md', 'HANDOFF.md', 'dashboard/plugin_api.py', 'dashboard/manifest.json', 'DEMO_WALKTHROUGH.md']),
]:
    os.makedirs(outdir, exist_ok=True)
    print('=' * 20, repo)
    for p in files:
        d = get(repo, p, outdir)
        print(f'{p}: {os.path.getsize(d) if os.path.exists(d) else "MISSING"} bytes')
    # whole-repo text grep for keywords
    paths = [t['path'] for t in tree(repo) if t['type'] == 'blob' and re.search(r'\.(md|py|js|yaml|yml|json|ts|tsx|mjs)$', t['path'])]
    for kw in ['siyuan', 'hash gate', 'hash-gat', 'sha256']:
        hits = []
        for p in paths[:80]:
            d = get(repo, p, outdir)
            try:
                txt = open(d, errors='ignore').read().lower()
            except Exception:
                continue
            if kw in txt:
                hits.append(p)
        print(f'  keyword "{kw}": {len(hits)} files -> {hits[:5]}')
