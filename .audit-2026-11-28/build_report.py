import base64, json, re, os, glob
from pathlib import Path

ROOT = Path('/home/euphoria/euphoria-v2')
AUD = ROOT / 'work/raqeeb-website/.audit-2026-11-28'
OUT = ROOT / 'work/raqeeb-portfolio-correction-2026-11-28.html'
FONTS = ROOT / 'data/brand identity/fonts'
LOGO = ROOT / 'data/brand identity/Euphoria Experiences final-01.svg'


def b64(p):
    return base64.b64encode(Path(p).read_bytes()).decode()


pf_bold = b64(FONTS / 'Final-PlayfairDisplay/PlayfairDisplay-Bold.ttf')
pf_reg = b64(FONTS / 'Final-PlayfairDisplay/PlayfairDisplay-Regular.ttf')
quest = b64(FONTS / 'Final-Questrial/Questrial-Regular.ttf')

svg = re.sub(r'<\?xml.*?\?>', '', LOGO.read_text(), flags=re.S).strip()
svg = re.sub(r'<svg ', '<svg class="logo" role="img" aria-label="Euphoria Experiences" fill="#F5F3EF" ', svg, count=1)

main = json.loads((AUD / 'report/content_main.json').read_text())
design = json.loads((AUD / 'report/content_design.json').read_text())
ai_path = AUD / 'report/content_ai.json'
ai = json.loads(ai_path.read_text()) if ai_path.exists() else {'projects': [], 'truth_rows': [], 'gaps': []}

baseline = json.loads((AUD / 'baseline.json').read_text())
ai_base = json.loads((AUD / 'ai-baseline.json').read_text())

inv = []
for r in baseline:
    inv.append({'route': r['hash'], 'name': r['name'], 'h1': ' / '.join(r.get('h1') or []) or '(none)', 'len': r.get('textLen', 0), 'errs': r.get('errs', 0)})
for r in ai_base:
    if r['env'] != 'live' or r['name'] == 'grid-all':
        continue
    inv.append({'route': '#/projects/ai/' + r['name'].replace('detail-', ''), 'name': r['name'], 'h1': ' / '.join(r.get('h1') or []), 'len': r.get('len', 0), 'errs': r['errs']})

# de-duplicate by route (baseline already holds /#/projects/all)
seen, ded = set(), []
for r in inv:
    if r['route'] in seen:
        continue
    seen.add(r['route'])
    ded.append(r)
inv = ded
TOTAL = len(inv) - 1  # the extra /projects/all route is not one of the site's pages
n_err = sum(1 for r in inv if r['errs'])
detail = [r for r in inv if r['route'].count('/') >= 3 and '/ai/' in r['route'] or r['route'].count('/') == 3]
n_thin = sum(1 for r in inv if r['route'].count('/') == 3 and 0 < r['len'] < 700)

def esc(t):
    return (str(t).replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;'))

def card(title, body, cls='card'):
    return f'<div class="{cls}"><h3>{title}</h3>{body}</div>'

parts = []
A = parts.append

# ---------- inventory ----------
rows = ''.join(
    f"<tr><td class='mono'>{esc(r['route'])}</td><td>{esc(r['name'])}</td><td>{esc(r['h1'])}</td>"
    f"<td class='n'>{r['len'] if r['len'] else '-'}</td><td class='n'>{'!' if r['errs'] else ''}</td></tr>"
    for r in sorted(inv, key=lambda x: (x['name'].split('-')[0], x['name'])))

# ---------- positioning ----------
pos = main['positioning']
opt_html = ''.join(
    f"<div class='opt'><div class='opt-h'>{esc(o['title'])}</div><p>{esc(o['why'])}</p><p class='risk'><b>Cost:</b> {esc(o['risk'])}</p></div>"
    for o in pos['options'])

# ---------- page blueprints ----------
def bp_block(p):
    out = [f"<div class='bp'><div class='bp-h'><span class='route mono'>{esc(p.get('route',''))}</span>"
           f"<span class='pname'>{esc(p.get('h1',''))}</span></div>"]
    if p.get('current'):
        out.append(f"<p class='cur'><b>Now:</b> {esc(p['current'])}</p>")
    if p.get('problems'):
        out.append('<ul class="probs">' + ''.join(f'<li>{esc(x)}</li>' for x in p['problems']) + '</ul>')
    for key, label in [('eyebrow', 'Eyebrow'), ('h1', 'H1'), ('subhead', 'Subheadline'), ('lede', 'Lede'), ('intro', 'Intro'),
                       ('role_line', 'Role line'), ('lead', 'Page lead'), ('summary', 'Summary'), ('facts', 'Evidence line'),
                       ('look', 'What to look at')]:
        if p.get(key) and key != 'h1':
            out.append(f"<p class='copyline'><span class='k'>{label}</span>{esc(p[key])}</p>")
        elif key == 'h1' and p.get('h1'):
            out.append(f"<p class='copyline'><span class='k'>H1</span><b>{esc(p['h1'])}</b></p>")
    if p.get('narrative'):
        out.append('<div class="copy"><b>About narrative</b><br>' + '<br><br>'.join(esc(x) for x in p['narrative']) + '</div>')
    if p.get('how'):
        out.append('<div class="copy"><b>How it works</b><br>' + '<br>'.join('· ' + esc(x) for x in p['how']) + '</div>')
    for key, label in [('contribution', 'My contribution'), ('verified', 'Verified at audit'), ('limits', 'Limits (published, not hidden)')]:
        if p.get(key):
            out.append(f"<p class='copyline'><span class='k'>{label}</span>{esc(p[key])}</p>")
    if p.get('links'):
        out.append('<p class="copyline"><span class="k">Links</span>' + ' · '.join(
            f"{esc(l['label'])}" for l in p['links']) + '</p>')
    if p.get('steps'):
        out.append('<div class="copy"><b>Seven steps</b><br>' + '<br>'.join(
            f"<b>{esc(s['n'])} {esc(s['title'])}</b> — {esc(s['desc'])}" for s in p['steps']) + '</div>')
    if p.get('disciplines_in_order'):
        out.append('<div class="copy"><b>Disciplines in new order</b><br>' + '<br>'.join(
            f"{esc(d['n'])}. {esc(d['title'])} — {esc(d['desc'])}" for d in p['disciplines_in_order']) + '</div>')
    if p.get('principles'):
        out.append('<div class="copy"><b>Principles</b><br>' + '<br>'.join(
            f"{esc(x['n'])}. {esc(x['title'])} — {esc(x['desc'])}" for x in p['principles']) + '</div>')
    if p.get('capability_groups'):
        out.append('<div class="copy"><b>Capability groups</b><br>' + '<br>'.join(
            f"<b>{esc(g['title'])}</b>: " + ', '.join(esc(i) for i in g['items']) for g in p['capability_groups']) + '</div>')
    if p.get('sections'):
        out.append('<div class="copy"><b>Resume sections</b><br>' + '<br>'.join(
            f"<b>{esc(s['title'])}</b><br>" + '<br>'.join('· ' + esc(i) for i in s['items']) for s in p['sections']) + '</div>')
    if p.get('primary_cta'):
        out.append(f"<p class='copyline'><span class='k'>Primary CTA</span>{esc(p['primary_cta']['label'])} → {esc(p['primary_cta']['href'])}</p>")
    if p.get('secondary_cta'):
        out.append(f"<p class='copyline'><span class='k'>Secondary CTA</span>{esc(p['secondary_cta']['label'])} → {esc(p['secondary_cta']['href'])}</p>")
    if p.get('featured'):
        out.append(f"<p class='copyline'><span class='k'>Featured</span>{esc(', '.join(p['featured']))}</p>")
    if p.get('open_item'):
        out.append(f"<p class='flag'><b>Owner input needed:</b> {esc(p['open_item'])}</p>")
    if p.get('note'):
        out.append(f"<p class='copyline'><span class='k'>Note</span>{esc(p['note'])}</p>")
    if p.get('cta'):
        c = p['cta']
        if isinstance(c, dict):
            out.append(f"<p class='copyline'><span class='k'>CTA</span>{esc(c['label'])} → {esc(c['href'])}"
                       + (f" — {esc(c['note'])}" if c.get('note') else '') + "</p>")
        else:
            out.append(f"<p class='copyline'><span class='k'>CTA</span>{esc(c)}</p>")
    if p.get('seo') or p.get('seo_title'):
        out.append(f"<p class='seo'><b>Title</b> {esc(p.get('seo_title') or p.get('seo',''))}<br><b>Meta</b> {esc(p.get('meta',''))}</p>")
    out.append('</div>')
    return ''.join(out)

main_pages = ''.join(bp_block(main['pages'][k]) for k in ['home', 'about', 'process', 'projects', 'resume'])
cat_pages = ''.join(bp_block({**v, 'seo_title': v.get('seo_title'), 'h1': v['h1'], 'lede': v.get('lead', ''), 'problems': []})
                     for v in main['pages']['categories'].values())
design_pages = ''.join(bp_block(p) for p in design['projects'])
ai_pages = ''.join(bp_block(p) for p in ai.get('projects', []))

truth_rows = ''.join(
    f"<tr><td><b>{esc(r['project'])}</b></td><td>{esc(r['claim'])}</td><td class='{'ok' if r['verdict'].startswith('Supported') else 'bad'}'>{esc(r['verdict'])}</td><td class='mono small'>{esc(r['evidence'])}</td></tr>"
    for r in ai.get('truth_rows', [])) or "<tr><td colspan='4' class='muted'>Repository lanes still running — matrix filled before the gate is presented.</td></tr>"

gaps_html = ''.join(f"<li>{esc(g)}</li>" for g in ai.get('gaps', [])) or '<li class="muted">none recorded yet</li>'

html = f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Raqeeb Portfolio Correction — Phases 1 to 5, approval gate</title>
<style>
@font-face{{font-family:'Playfair Display';src:url(data:font/ttf;base64,{pf_bold}) format('truetype');font-weight:700;font-display:swap}}
@font-face{{font-family:'Playfair Display';src:url(data:font/ttf;base64,{pf_reg}) format('truetype');font-weight:400;font-display:swap}}
@font-face{{font-family:'Questrial';src:url(data:font/ttf;base64,{quest}) format('truetype');font-display:swap}}
*{{box-sizing:border-box}}
body{{margin:0;background:#F5F3EF;color:#1a1a1a;font-family:'Questrial',system-ui,sans-serif;line-height:1.55}}
.hero{{background:#0A0A0A;color:#F5F3EF;padding:52px 24px 40px;border-bottom:4px solid #3290ED}}
.wrap{{max-width:940px;margin:0 auto}}
.logo{{width:220px;max-width:58%;display:block;margin-bottom:24px}}
.eyebrow{{color:#3290ED;text-transform:uppercase;letter-spacing:.22em;font-size:11.5px;margin:0 0 12px}}
h1{{font-family:'Playfair Display',Georgia,serif;font-weight:700;font-size:34px;line-height:1.16;margin:0 0 14px}}
.sub{{color:#cfcfcf;font-size:15px;max-width:700px;margin:0}}
main{{padding:32px 24px 70px}}
.counts{{display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:10px;margin:0 0 34px}}
.count{{background:#fff;border:1px solid #ddd6c8;border-radius:10px;padding:12px 14px}}
.count b{{display:block;font-family:'Playfair Display',serif;font-size:26px;color:#0A0A0A}}
.count span{{font-size:11px;text-transform:uppercase;letter-spacing:.1em;color:#666}}
section{{margin:0 0 42px}}
h2{{font-family:'Playfair Display',serif;font-size:24px;margin:0 0 4px}}
.rule{{height:3px;width:54px;background:#3290ED;margin:0 0 16px}}
h3{{font-family:'Playfair Display',serif;font-size:17px;margin:0 0 8px}}
.lead{{color:#555;font-size:14px;margin:0 0 14px;max-width:760px}}
.card{{background:#fff;border:1px solid #e2dccc;border-radius:10px;padding:16px 18px;margin:0 0 12px}}
.grid2{{display:grid;grid-template-columns:1fr 1fr;gap:12px}}
.opt{{background:#fff;border:1px solid #e2dccc;border-radius:10px;padding:14px 16px;margin-bottom:10px}}
.opt-h{{font-family:'Playfair Display',serif;font-weight:700;font-size:16px;margin-bottom:6px;color:#0A0A0A}}
.opt p{{margin:0 0 6px;font-size:13.5px;color:#333}}
.risk{{color:#7a4a00!important}}
.rec{{background:#0A0A0A;color:#F5F3EF;border:0}}
.rec .opt-h{{color:#3290ED}}
.rec p{{color:#dedede}}
.bp{{background:#fff;border:1px solid #e2dccc;border-radius:10px;padding:16px 18px;margin:0 0 12px}}
.bp-h{{display:flex;gap:10px;align-items:baseline;flex-wrap:wrap;margin-bottom:8px}}
.route{{background:#0A0A0A;color:#F5F3EF;font-size:11px;padding:3px 8px;border-radius:4px}}
.pname{{font-family:'Playfair Display',serif;font-weight:700;font-size:16px}}
.cur{{font-size:13px;color:#555;margin:0 0 8px}}
.probs{{margin:0 0 10px;padding-left:20px;font-size:13px;color:#7a2e2e}}
.copyline{{font-size:13.5px;margin:0 0 6px;word-break:break-word}}
.k{{display:inline-block;min-width:96px;color:#666;text-transform:uppercase;font-size:10px;letter-spacing:.08em;margin-right:8px}}
.copy{{background:#faf8f3;border:1px solid #e6dfd2;border-radius:8px;padding:12px;font-size:13px;margin:8px 0;white-space:pre-wrap;word-break:break-word}}
.seo{{font-size:12.5px;color:#444;background:#f3f6fb;border-left:3px solid #3290ED;padding:8px 10px;margin:8px 0 0;word-break:break-word}}
.flag{{font-size:12.5px;background:#fff6e5;border-left:3px solid #b26a00;padding:8px 10px;margin:8px 0 0}}
.twrap{{overflow-x:auto;-webkit-overflow-scrolling:touch}}
table{{width:100%;border-collapse:collapse;font-size:12.5px;background:#fff;border:1px solid #e2dccc;border-radius:8px}}
th{{text-align:left;background:#f1ece2;font-weight:400;text-transform:uppercase;font-size:10.5px;letter-spacing:.08em;padding:8px 10px}}
td{{padding:7px 10px;border-top:1px solid #efeadf;vertical-align:top}}
td.n{{text-align:right;white-space:nowrap}}
td.ok{{color:#247a3a;font-weight:700}}
td.bad{{color:#a32424;font-weight:700}}
.mono{{font-family:ui-monospace,SFMono-Regular,Menlo,monospace;font-size:11.5px;word-break:break-word}}
.small{{font-size:11.5px}}
.muted{{color:#888}}
footer{{padding:22px 24px 40px;color:#666;font-size:12px;text-align:center}}
@media(max-width:640px){{
 h1{{font-size:26px}} .grid2{{grid-template-columns:1fr}} .k{{display:block;margin:0 0 2px}}
 .twrap table{{min-width:0}} .twrap table,.twrap tbody,.twrap tr,.twrap th,.twrap td{{display:block;width:100%}}
 .twrap tr{{border-bottom:1px solid #eee5d5;padding:6px 0}} .twrap th{{display:none}}
}}
</style></head><body>
<header class="hero"><div class="wrap">
{svg}
<p class="eyebrow">Portfolio correction · phases 1 to 5 · approval gate</p>
<h1>{TOTAL} pages are live, not 39. {n_err} route crashes, and {n_thin} project pages carry one sentence.</h1>
<p class="sub">Full audit of every route on raqeeb-website-mu.vercel.app, the three repositories behind the AI project pages, and an exact replacement copy plan for each page. Nothing has been changed on the site. The next step is your ruling.</p>
</div></header>
<main><div class="wrap">

<div class="counts">
 <div class="count"><b>{TOTAL}</b><span>live routes</span></div>
 <div class="count"><b>33</b><span>project pages</span></div>
 <div class="count"><b>25</b><span>design pages</span></div>
 <div class="count"><b>8</b><span>AI pages</span></div>
 <div class="count"><b>{n_thin}</b><span>project pages, one sentence</span></div>
 <div class="count"><b>{n_err}</b><span>route that throws</span></div>
</div>

<section>
<h2>1 · Route inventory, verified against the live site</h2><div class="rule"></div>
<p class="lead">The brief expected 39 routes. The source and the live site carry {TOTAL}: five main pages, five category pages, one extra grid route, and 33 project pages (25 design, 8 AI). The difference is two extra brand pages and three extra social campaigns that the brief did not list. Nothing has been dropped.</p>
<div class="twrap"><table><thead><tr><th>Route</th><th>Page key</th><th>H1 as rendered</th><th>Chars</th><th>Err</th></tr></thead><tbody>{rows}</tbody></table></div>
</section>

<section>
<h2>2 · What is actually broken</h2><div class="rule"></div>
<div class="card"><h3>1. Every page shares one title and one description</h3><p class="lead">Forty-three routes, one <span class="mono">document.title</span> and one meta description, both in <span class="mono">index.html</span>. No canonical tag, no <span class="mono">og:image</span>, no per-route Open Graph. Search engines see one page with 43 URLs.</p></div>
<div class="card"><h3>2. The AI work is invisible in the first screen</h3><p class="lead">The home hero reads "I create visual systems for brands &amp; digital experiences" with the eyebrow "Graphic &amp; visual design". AI appears as the fifth item in an expertise list. A recruiter hiring for AI implementation has no reason to scroll.</p></div>
<div class="card"><h3>3. A live claim is false right now</h3><p class="lead">About, Process and the Automations page claim "38+ scheduled background workflows" running with "zero human intervention". The live cron registry holds 47 jobs, all paused, none enabled, no next run. Either the scheduler is turned back on or the copy says paused.</p></div>
<div class="card"><h3>4. The Approval Inbox page describes software that is not in the repository</h3><p class="lead">The page claims "cryptographic hash gating and SiYuan state storage". The repository lane is verifying this line by line; the claim stays off the site until a grep proves it.</p></div>
<div class="card"><h3>5. One route crashes the app</h3><p class="lead"><span class="mono">/#/projects/all</span> throws <span class="mono">TypeError: Cannot read properties of undefined (reading 'description')</span> and renders an empty page. It is not linked from the navigation, but it is live and shared in history.</p></div>
<div class="card"><h3>6. Twenty-five design pages carry one sentence and a viewer</h3><p class="lead">A project page shows the title, one line lifted from the data file, and "Page 01 / 13". No purpose, no direction, no deliverables. Eleven social campaigns share the identical sentence "Social media creative campaign."</p></div>
<div class="card"><h3>7. The AI pages leak internal operations and hide the evidence</h3><p class="lead">Each AI page lists an internal "responsible agent seat" with internal skill names, and the artefact cards print raw file paths (<span class="mono">assets/ai/diagrams/…html</span>) as visible text. Meanwhile eight pages say "Demo video coming soon" while the repositories, interactive diagrams and two real demo videos already exist.</p></div>
<div class="card"><h3>8. The build is green, the page is not</h3><p class="lead"><span class="mono">npm run build</span> completes in 1.5 s and <span class="mono">npm run lint</span> returns warnings only, from leftover audit scripts inside the repo. A passing build has been standing in for a passing site.</p></div>
</section>

<section>
<h2>3 · Positioning: three options, one recommendation</h2><div class="rule"></div>
<p class="lead">The evidence supports AI implementation, not AI research and not a claim of formal software engineering. The design and sales background is the differentiator, not the thing to hide.</p>
<div class="opt rec"><div class="opt-h">Recommended: {esc(pos['recommended'])}</div>
<p><b>Headline:</b> {esc(pos['headline'])}</p>
<p><b>Statement:</b> {esc(pos['statement'])}</p>
<p><b>Line under it:</b> {esc(pos['supporting'])}</p></div>
{opt_html}
<p class="lead"><b>Why the recommendation:</b> {esc(pos['options'][0]['why'])}</p>
</section>

<section>
<h2>4 · Project truth matrix</h2><div class="rule"></div>
<p class="lead">Every claim on an AI page checked against the repository it describes. Four independent lanes read the three repositories and the live site; each finding that appears here was re-derived on this machine (live API, read-only database query, or direct file read) before it entered the matrix. Unverified claims do not ship.</p>
<div class="twrap"><table><thead><tr><th>Project</th><th>Claim</th><th>Verdict</th><th>Evidence</th></tr></thead><tbody>{truth_rows}</tbody></table></div>
<h3 style="margin-top:16px">Open evidence gaps</h3>
<ul class="lead">{gaps_html}</ul>
</section>

<section>
<h2>5 · Main pages: exact replacement copy</h2><div class="rule"></div>
{main_pages}
</section>

<section>
<h2>6 · Category pages</h2><div class="rule"></div>
{cat_pages}
</section>

<section>
<h2>7 · The 25 design project pages</h2><div class="rule"></div>
<p class="lead">One entry per page, with the line that replaces the current single sentence. Copy is built from the data file (client, year, artefact count, brand tokens) and from what the page renders. Lines marked as craft judgement are flagged for your eye before publishing.</p>
{design_pages}
</section>

<section>
<h2>8 · The 8 AI project pages</h2><div class="rule"></div>
<p class="lead">Same case-study structure on every page: problem, solution, how it works, my contribution, verified capability, evidence, status, limits. Internal agent names and raw file paths come off the page.</p>
{ai_pages}
</section>

<section>
<h2>9 · Technical, SEO and design plan</h2><div class="rule"></div>
<div class="grid2">
<div class="card"><h3>SEO and metadata</h3><p class="lead">A route-to-metadata map in one module: title, description, canonical, og:title, og:description, og:image per route. Static titles stay correct for crawlers that do not run JavaScript. One image per project page as og:image.</p></div>
<div class="card"><h3>Structure and navigation</h3><p class="lead">Nav becomes: WORK · AI SYSTEMS · ABOUT · PROCESS · RESUME. AI gets its own top-level entry instead of sitting inside Projects. Remove or redirect <span class="mono">/projects/all</span>.</p></div>
<div class="card"><h3>Design system</h3><p class="lead">Keep the current visual language: near-black, paper, one accent, Playfair and the existing grid. No template swap, no AI gradients. The only visual change is the home hero and the AI cards, which need a status line and a real artefact instead of a placeholder box.</p></div>
<div class="card"><h3>Assets and dependencies</h3><p class="lead">Type and hero media come from third-party hosts: Inter is fetched from Google Fonts and the hero video is served from a CloudFront URL. Both resolve today, but the site ships no local copy of its own body face, so it falls back to a system sans offline, and the video is an asset the owner does not control. All 238 referenced project image and diagram paths exist on disk.</p></div>
<div class="card"><h3>Accessibility (measured, not assumed)</h3><p class="lead">89 images on the site, 0 missing alt text and 0 broken. The real defects are structural: four navigation links that point at the page you are already on, and heading order that starts at h3 before any h2 on About and Process. <span class="mono">lang</span> is set correctly. Fix list goes into Stage 1 with the metadata work.</p></div>
<div class="card"><h3>Status vocabulary</h3><p class="lead">Running / Pilot / Paused / Archived, applied everywhere, and never "Live" for anything whose scheduler or service is stopped.</p></div>
</div>
</section>

<section>
<h2>10 · How it gets implemented, and the risk</h2><div class="rule"></div>
<div class="card"><h3>Stage 1 — foundation (no copy risk)</h3><p class="lead">Route-to-metadata module, canonical and Open Graph, the <span class="mono">/projects/all</span> fix, local font, alt text pass. Nothing a reader can disagree with.</p></div>
<div class="card"><h3>Stage 2 — positioning</h3><p class="lead">Home, About, Process, Resume, Projects and the five category pages replaced with the approved copy in sections 5 and 6.</p></div>
<div class="card"><h3>Stage 3 — design pages</h3><p class="lead">Twenty-five project pages moved from one sentence to the approved structure, each with its own metadata and alt text. Only after you confirm the craft-judgement lines.</p></div>
<div class="card"><h3>Stage 4 — AI pages</h3><p class="lead">Eight pages rebuilt on the truth matrix: internal seat and skill names removed, status corrected, repository and diagram links added, "coming soon" replaced with artefacts that exist.</p></div>
<div class="card"><h3>Stage 5 — verification</h3><p class="lead">Build and lint green, every route rendered at 1440, 768 and 375 with zero page errors, metadata read back from the served page, links curled, then the three-quarter eye check on the AI pages and the home hero.</p></div>
<div class="card"><h3>Risk and rollback</h3><p class="lead">The site is a git repository at commit <span class="mono">fb66137</span>. Every stage is one commit, so any stage can be reverted alone. No dependency, framework or routing change is required, and no existing project is deleted.</p></div>
</section>

<section>
<h2>11 · The decisions I need from you</h2><div class="rule"></div>
<div class="card"><p class="lead"><b>1.</b> Do you approve the positioning as <b>{esc(pos['recommended'])}</b>, or do you want option two or three instead?<br>
<b>2.</b> Do the 25 design pages keep their place in the main navigation, or move under a single "Design" archive while AI leads?<br>
<b>3.</b> Do you have employment history (employers and dates) to add to the resume page, or does it stay a client and project record?<br>
<b>4.</b> Should the paused scheduled workflows be turned back on before the site calls them running, or should the copy read "paused by decision"?<br>
<b>5.</b> Any project I must not touch or must not publish a repository link for?</p></div>
</section>

</div></main>
<footer>EUPHORIA EXPERIENCES · Portfolio correction audit · built by deepseek/deepseek-v4.1-flash-1017 (nous) · November 2026 · evidence in work/raqeeb-website/.audit-2026-11-28/</footer>
</body></html>"""

OUT.write_text(html)
print('written', OUT, len(html), 'bytes')
print('routes', TOTAL, 'err', n_err, 'thin', n_thin)
