import json, glob, os
from collections import Counter
p = os.path.expanduser('~/.hermes/cron/jobs.json')
try:
    j = json.load(open(p))
    jobs = j if isinstance(j, list) else j.get('jobs', [])
    print('root cron jobs:', len(jobs))
    print('states:', Counter((x.get('state') or x.get('status')) for x in jobs))
    print('enabled flags:', Counter(bool(x.get('enabled')) for x in jobs))
    print('with next_run:', sum(1 for x in jobs if x.get('next_run_at')))
except Exception as e:
    print('cron read failed:', e)
tot = 0
stores = glob.glob(os.path.expanduser('~/.hermes/profiles/*/cron/jobs.json'))
for f in stores:
    try:
        j = json.load(open(f))
        js = j if isinstance(j, list) else j.get('jobs', [])
        tot += len(js)
    except Exception:
        pass
print('profile stores:', len(stores), 'profile cron jobs total:', tot)
