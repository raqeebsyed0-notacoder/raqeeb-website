import sqlite3, os
p = '/home/euphoria/euphoria-v2/work/leadjin/app/leadjin.db'
print('db exists:', os.path.exists(p), os.path.getsize(p) if os.path.exists(p) else 0, 'bytes', 'mtime', os.path.getmtime(p) if os.path.exists(p) else 0)
c = sqlite3.connect(f'file:{p}?mode=ro', uri=True)
tabs = [r[0] for r in c.execute("select name from sqlite_master where type='table'").fetchall()]
print('tables:', len(tabs))
for t in ['leads', 'intent_signals', 'company_cache', 'users', 'verification_records', 'outreach_messages']:
    try:
        print(f'{t}:', c.execute(f'select count(*) from {t}').fetchone()[0])
    except Exception as e:
        print(t, 'ERR', e)
