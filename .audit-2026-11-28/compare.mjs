import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const OUT = path.resolve('.audit-2026-11-28');
const PAGES = path.join(OUT, 'pages');
const base = fs.readFileSync('src/data/portfolio.ts', 'utf8');
const pairs = [...base.matchAll(/slug: '([^']+)',\s*\n\s*category: '([^']+)'/gm)].map(m => [m[1], m[2]]);
const slugToCategory = Object.fromEntries(pairs);
const routeCat = c => (c === 'presentation' ? 'presentation-design' : c);
const routes = [
  ['home', '#/'], ['about', '#/about'], ['process', '#/process'], ['projects', '#/projects'], ['resume', '#/resume'],
  ...['brand-identity', 'presentation-design', 'social-media', 'websites', 'ai'].map(s => [`grid-${s}`, `#/projects/${s}`]),
  ...Object.keys(slugToCategory).map(s => [`detail-${s}`, `#/projects/${routeCat(slugToCategory[s])}/${s}`]),
];

const browser = await chromium.launch({ headless: true });
const diffs = [];
for (const [name, hash] of routes) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  try {
    await page.goto('http://127.0.0.1:4173/' + hash, { waitUntil: 'load', timeout: 30000 });
    await page.waitForTimeout(900);
    const text = await page.evaluate(() => document.body.innerText.replace(/\s+/g, ' ').trim());
    const liveFile = path.join(PAGES, `${name}.json`);
    const live = fs.existsSync(liveFile) ? JSON.parse(fs.readFileSync(liveFile, 'utf8')).text.replace(/\s+/g, ' ').trim() : null;
    const lh = live ? crypto.createHash('md5').update(live).digest('hex').slice(0, 8) : 'n/a';
    const nh = crypto.createHash('md5').update(text).digest('hex').slice(0, 8);
    diffs.push({ name, same: lh === nh, liveHash: lh, localHash: nh, liveLen: live ? live.length : 0, localLen: text.length });
  } catch (e) {
    diffs.push({ name, error: String(e).slice(0, 120) });
  }
  await ctx.close();
}

// grid/all error detail
const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p = await ctx.newPage();
const errs = [];
p.on('pageerror', e => errs.push(String(e.stack || e).slice(0, 600)));
await p.goto('http://127.0.0.1:4173/#/projects/all', { waitUntil: 'load', timeout: 30000 });
await p.waitForTimeout(1200);
const bodyHtml = await p.evaluate(() => document.body.innerHTML.slice(0, 600));
await ctx.close();
await browser.close();

fs.writeFileSync(path.join(OUT, 'live-vs-local.json'), JSON.stringify({ diffs, gridAllErrors: errs, gridAllHtml: bodyHtml }, null, 1));
console.log('DIFFS (live vs HEAD build):');
for (const d of diffs) console.log(`${d.name}: ${d.error ? 'ERR ' + d.error : d.same ? 'same' : 'DIFFERENT'} live=${d.liveLen} local=${d.localLen}`);
console.log('grid/all pageerror:', errs.slice(0, 2));
console.log('grid/all html head:', bodyHtml.slice(0, 300));
