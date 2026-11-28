import re, json
src = open('/home/euphoria/euphoria-v2/work/raqeeb-website/src/data/portfolio.ts').read()
block = src.split('export const projects: Project[] = [')[1].split('export const aiProjects')[0]
# split on top-level object starts
chunks = re.split(r"\n  \{\n", block)
rows = []
for c in chunks:
    def g(k):
        m = re.search(rf"{k}: '([^']*)'", c)
        return m.group(1) if m else None
    def gnum(k):
        m = re.search(rf"{k}: (\d+)", c)
        return int(m.group(1)) if m else None
    if not g('slug'):
        continue
    media = len(re.findall(r"'assets/[^']+'", c)) - 1
    rows.append({
        'title': g('title'), 'slug': g('slug'), 'category': g('category'),
        'year': gnum('year'), 'client': g('client'), 'description': g('description'),
        'media': max(media, 1), 'liveUrl': g('liveUrl'), 'pdfRatio': g('pdfRatio'),
        'colors': len(re.findall(r"#[0-9A-Fa-f]{6}", c)),
    })
json.dump(rows, open('/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/design-projects.json', 'w'), indent=1)
print('projects:', len(rows))
for r in rows:
    print(f"{r['category'][:12]:12} | {str(r['year']):5} | media={r['media']:3} | {r['title'][:42]:42} | {(r['description'] or '')[:90]}")
