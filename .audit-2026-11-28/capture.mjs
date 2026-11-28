import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://raqeeb-website-mu.vercel.app/';
const OUT = path.resolve('.audit-2026-11-28');
const PAGES = path.join(OUT, 'pages');
fs.mkdirSync(PAGES, { recursive: true });

const src = fs.readFileSync('src/data/portfolio.ts', 'utf8');
const pairs = [...src.matchAll(/slug: '([^']+)',\s*\n\s*category: '([^']+)'/gm)].map(m => [m[1], m[2]]);
const slugToCategory = Object.fromEntries(pairs);
const slugToRouteCat = c => (c === 'presentation' ? 'presentation-design' : c);
const projectSlugs = Object.keys(slugToCategory);
const gridSlugs = ['brand-identity', 'presentation-design', 'social-media', 'websites', 'ai', 'all'];

const routes = [
  ['home', '#/'],
  ['about', '#/about'],
  ['process', '#/process'],
  ['projects', '#/projects'],
  ['resume', '#/resume'],
  ...gridSlugs.map(s => [`grid-${s}`, `#/projects/${s}`]),
  ...projectSlugs.map(s => [`detail-${s}`, `#/projects/${slugToRouteCat(slugToCategory[s])}/${s}`]),
];

const browser = await chromium.launch({ headless: true });
const results = [];
const meta = [];
for (const [name, hash] of routes) {
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  const errs = [];
  const failed = [];
  page.on('pageerror', e => errs.push(String(e)));
  page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
  page.on('requestfailed', r => failed.push(`${r.url()} :: ${r.failure()?.errorText}`));
  try {
    await page.goto(BASE + hash, { waitUntil: 'load', timeout: 45000 });
    await page.waitForTimeout(1200);
    // scroll to force lazy content
    await page.evaluate(async () => {
      const step = window.innerHeight;
      for (let y = 0; y < document.body.scrollHeight; y += step) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 120));
      }
      window.scrollTo(0, 0);
    });
    await page.waitForTimeout(400);
    const dom = await page.evaluate(() => {
      const metaTag = n => document.querySelector(`meta[name="${n}"]`)?.getAttribute('content') || null;
      const ogTag = n => document.querySelector(`meta[property="${n}"]`)?.getAttribute('content') || null;
      return {
        url: location.href,
        title: document.title,
        description: metaTag('description'),
        ogTitle: ogTag('og:title'),
        ogDescription: ogTag('og:description'),
        ogImage: ogTag('og:image'),
        canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href') || null,
        h1: [...document.querySelectorAll('h1')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        h2: [...document.querySelectorAll('h2')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        h3: [...document.querySelectorAll('h3')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        textLen: (document.body.innerText || '').length,
        text: (document.body.innerText || '').replace(/\n{3,}/g, '\n\n').trim(),
        brokenImgs: [...document.querySelectorAll('img')].filter(i => i.complete && i.naturalWidth === 0).map(i => i.getAttribute('src')),
        imgCount: document.querySelectorAll('img').length,
        imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.getAttribute('alt')).length,
        emptyLinks: [...document.querySelectorAll('a')].filter(a => !a.getAttribute('href') || a.getAttribute('href') === '#').length,
        links: [...new Set([...document.querySelectorAll('a')].map(a => a.getAttribute('href')).filter(Boolean))],
        btnTexts: [...new Set([...document.querySelectorAll('a[class*="btn"], button')].map(e => e.textContent.replace(/\s+/g, ' ').trim()).filter(Boolean))],
        videos: [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc || v.getAttribute('src'), readyState: v.readyState, err: v.error?.message || null })),
        placeholders: (document.body.innerText.match(/coming soon|lorem ipsum|placeholder|TODO/gi) || []),
        scriptBundles: [...document.querySelectorAll('script[src]')].map(s => s.getAttribute('src')),
      };
    });
    dom.name = name; dom.hash = hash; dom.errs = errs; dom.failed = failed; dom.ok = true;
    delete dom.text;
    fs.writeFileSync(path.join(PAGES, `${name}.json`), JSON.stringify({ ...dom, text: (await page.evaluate(() => document.body.innerText)) }, null, 1));
    results.push({ name, hash, ok: true, title: dom.title, h1: dom.h1, textLen: dom.textLen, errs: errs.length, failed: failed.length, placeholders: dom.placeholders });
    console.log(`${name} ok title="${dom.title}" h1=${JSON.stringify(dom.h1)} len=${dom.textLen} errs=${errs.length} failed=${failed.length} ph=${dom.placeholders.length}`);
  } catch (e) {
    results.push({ name, hash, ok: false, error: String(e) });
    console.log(`${name} FAIL ${String(e).slice(0, 200)}`);
  }
  await context.close();
}
fs.writeFileSync(path.join(OUT, 'baseline.json'), JSON.stringify(results, null, 1));
await browser.close();
console.log('routes:', routes.length, 'ok:', results.filter(r => r.ok).length);
