/**
 * Route QA — Raqeeb portfolio correction (dag:raqeeb-correction/qa)
 * Read-only on source. Writes ONLY under .audit-2026-11-28/correction/qa/.
 *
 * Run:  node --experimental-strip-types qa-run.mjs
 * Needs: vite preview already serving dist at http://127.0.0.1:4178
 */
import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(HERE, '../../../');              // .../raqeeb-website
const BASE = process.env.QA_BASE || 'http://127.0.0.1:4178';
const WIDTHS = [
  { w: 1440, h: 900, key: '1440x900' },
  { w: 768, h: 1024, key: '768x1024' },
  { w: 375, h: 812, key: '375x812' },
];

/* ------------------------------------------------------------------ *
 * 1. Derive the 43 routes from the real exported data (not baseline) *
 * ------------------------------------------------------------------ */
const SCRATCH = path.join(HERE, '_scratch');
fs.mkdirSync(SCRATCH, { recursive: true });
for (const f of ['portfolio.ts', 'ai-projects.ts', 'types.ts']) {
  let src = fs.readFileSync(path.join(REPO, 'src/data', f), 'utf8');
  if (f !== 'types.ts') {
    src = src.replace(/from '\.\/ai-projects'/g, "from './ai-projects.ts'")
             .replace(/from '\.\/types'/g, "from './types.ts'");
  }
  fs.writeFileSync(path.join(SCRATCH, f), src);
}
const { categories, projects, aiProjects } = await import(
  pathToFileURL(path.join(SCRATCH, 'portfolio.ts')).href
);

const MAIN = ['/', '/about', '/process', '/projects', '/resume'];
const CATEGORY_ROUTES = categories.map((c) => `/projects/${c.slug}`);
const designDetailRoutes = [];
for (const c of categories.filter((c) => c.slug !== 'ai')) {
  for (const p of projects.filter((p) => p.category === c.id)) {
    designDetailRoutes.push(`/projects/${c.slug}/${p.slug}`);
  }
}
const AI_DETAIL_ROUTES = aiProjects.map((p) => `/projects/ai/${p.slug}`);
const ROUTES = [...MAIN, ...CATEGORY_ROUTES, ...designDetailRoutes, ...AI_DETAIL_ROUTES];

console.log(`categoryRoutes=${CATEGORY_ROUTES.length}`);
console.log(`designDetailRoutes=${designDetailRoutes.length}`);
console.log(`aiDetailRoutes=${AI_DETAIL_ROUTES.length}`);
console.log(`ROUTE_COUNT=${ROUTES.length}`);
if (ROUTES.length !== 43) {
  console.error('FATAL: expected 43 routes, derived ' + ROUTES.length);
  process.exit(2);
}
if (new Set(ROUTES).size !== ROUTES.length) {
  console.error('FATAL: duplicate routes in derived list');
  process.exit(2);
}

/* ------------------------------------------------------------------ *
 * 2. Surfaces to screenshot: 5 main + 5 category + 3 design + 8 AI   *
 * ------------------------------------------------------------------ */
const shotRoutes = new Set([
  ...MAIN,
  ...CATEGORY_ROUTES,
  // three design details spanning three categories
  '/projects/brand-identity/buyology',
  '/projects/presentation-design/blaize',
  '/projects/social-media/arata',
  ...AI_DETAIL_ROUTES,
]);
const SHOTS_DIR = path.join(HERE, 'shots');
fs.mkdirSync(SHOTS_DIR, { recursive: true });

function shotName(route, key) {
  const r = route === '/' ? 'home' : route.replace(/^\/+|\/+$/g, '').replace(/[^a-zA-Z0-9]+/g, '-');
  return `${r}-${key}.png`;
}

/* ------------------------------------------------------------------ *
 * 3. Browser + per-route measurement                                  *
 * ------------------------------------------------------------------ */
const browser = await chromium.launch({ headless: true, args: ['--no-sandbox'] });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await context.newPage();

let consoleErrors = [];
let pageErrors = [];
page.on('console', (msg) => {
  if (msg.type() === 'error') consoleErrors.push(msg.text());
});
page.on('pageerror', (err) => pageErrors.push(err.message || String(err)));

const SLEEP = (ms) => new Promise((r) => setTimeout(r, ms));

async function gotoRoute(route) {
  // query before the hash forces a full document load on every route
  const url = `${BASE}/?qa=${encodeURIComponent(route)}#${route}`;
  consoleErrors = [];
  pageErrors = [];
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 20000 });
  await page.waitForSelector('h1', { timeout: 8000 }).catch(() => {});
  await SLEEP(350); // let RouteMeta effect settle
}

async function measureDom() {
  return page.evaluate(() => {
    const q = (sel) => document.querySelector(sel);
    const content = (sel) => q(sel)?.getAttribute('content') ?? null;
    const h1s = Array.from(document.querySelectorAll('h1')).map((e) => (e.textContent || '').trim());
    const h2s = Array.from(document.querySelectorAll('h2'));
    const h3s = Array.from(document.querySelectorAll('h3'));
    const firstH2 = h2s[0];
    const firstH3 = h3s[0];
    let h2BeforeH3 = false;
    if (firstH2) {
      if (!firstH3) h2BeforeH3 = true;
      else h2BeforeH3 = (firstH2.compareDocumentPosition(firstH3) & Node.DOCUMENT_POSITION_FOLLOWING) !== 0;
    }
    const missingAlt = Array.from(document.images).filter(
      (img) => !img.hasAttribute('alt') || (img.getAttribute('alt') || '').trim() === ''
    );
    const de = document.documentElement;
    return {
      finalUrl: location.href,
      title: document.title,
      description: content('meta[name="description"]'),
      canonical: q('link[rel="canonical"]')?.href ?? null,
      ogTitle: content('meta[property="og:title"]'),
      ogImage: content('meta[property="og:image"]'),
      h1: h1s,
      h1Count: h1s.length,
      h2Count: h2s.length,
      h2BeforeH3,
      imagesMissingAlt: missingAlt.length,
      missingAltSources: missingAlt.map((i) => i.currentSrc || i.src || '(no src)'),
      scrollWidth: de.scrollWidth,
      clientWidth: de.clientWidth,
      overflow: de.scrollWidth > de.clientWidth + 1,
    };
  });
}

const routes = [];
for (const route of ROUTES) {
  await page.setViewportSize({ width: 1440, height: 900 });
  await gotoRoute(route);
  const m1440 = await measureDom();
  const taken = [];
  if (shotRoutes.has(route)) {
    await page.screenshot({ path: path.join(SHOTS_DIR, shotName(route, '1440x900')), type: 'png' });
    taken.push('1440x900');
  }

  // 375 overflow for EVERY route (not just the screenshot subset)
  await page.setViewportSize({ width: 375, height: 812 });
  await SLEEP(250);
  const m375 = await measureDom();
  if (shotRoutes.has(route)) {
    await page.screenshot({ path: path.join(SHOTS_DIR, shotName(route, '375x812')), type: 'png' });
    taken.push('375x812');
  }

  // 768 screenshot for the subset
  if (shotRoutes.has(route)) {
    await page.setViewportSize({ width: 768, height: 1024 });
    await SLEEP(250);
    await page.screenshot({ path: path.join(SHOTS_DIR, shotName(route, '768x1024')), type: 'png' });
    taken.push('768x1024');
  }

  routes.push({
    route,
    finalUrl: m1440.finalUrl,
    title: m1440.title,
    description: m1440.description,
    canonical: m1440.canonical,
    ogTitle: m1440.ogTitle,
    ogImage: m1440.ogImage,
    h1: m1440.h1,
    h1Count: m1440.h1Count,
    h2Count: m1440.h2Count,
    h2BeforeH3: m1440.h2BeforeH3,
    imagesMissingAlt: m1440.imagesMissingAlt,
    missingAltSources: m1440.missingAltSources,
    overflow1440: { scrollWidth: m1440.scrollWidth, clientWidth: m1440.clientWidth, overflow: m1440.overflow },
    overflow375: { scrollWidth: m375.scrollWidth, clientWidth: m375.clientWidth, overflow: m375.overflow },
    consoleErrors: [...consoleErrors],
    pageErrors: [...pageErrors],
    screenshots: taken,
  });
  process.stdout.write('.');
}
console.log('\nmeasured routes=' + routes.length);

/* ------------------------------------------------------------------ *
 * 4. /projects/all redirect check (separate, not among the 43)       *
 * ------------------------------------------------------------------ */
await page.setViewportSize({ width: 1440, height: 900 });
await gotoRoute('/projects/all');
const allCheck = {
  initialRoute: '/projects/all',
  finalUrl: page.url(),
  hash: new URL(page.url()).hash,
  redirectedToProjects: new URL(page.url()).hash === '#/projects',
  h1: await page.locator('h1').allTextContents().catch(() => []),
  pageErrors: [...pageErrors],
  consoleErrors: [...consoleErrors],
};

/* ------------------------------------------------------------------ *
 * 5. og:image reachability (unique URLs, GET with timeout)            *
 * ------------------------------------------------------------------ */
const imageStatus = {};
for (const url of [...new Set(routes.map((r) => r.ogImage).filter(Boolean))]) {
  try {
    const ctl = new AbortController();
    const t = setTimeout(() => ctl.abort(), 8000);
    let res = await fetch(url, { method: 'GET', redirect: 'follow', signal: ctl.signal });
    clearTimeout(t);
    imageStatus[url] = res.status;
  } catch (e) {
    imageStatus[url] = `ERR: ${e.name || e.message}`;
  }
}
for (const r of routes) r.ogImageStatus = r.ogImage ? (imageStatus[r.ogImage] ?? null) : null;

await browser.close();

/* ------------------------------------------------------------------ *
 * 6. Assertions (PASS/FAIL with measured value)                      *
 * ------------------------------------------------------------------ */
const zeroPageErrors = routes.filter((r) => r.pageErrors.length === 0).length;
const a1 = { name: '43/43 routes render with zero page errors', pass: zeroPageErrors === 43, measured: `${zeroPageErrors}/43` };

const badMeta = routes.filter((r) => !r.title || !r.title.trim() || !r.description || !r.description.trim());
const titles = routes.map((r) => r.title);
const dupTitles = titles.filter((t, i) => titles.indexOf(t) !== i);
const a2 = {
  name: 'every route has non-empty title + meta description, no two routes share a title',
  pass: badMeta.length === 0 && dupTitles.length === 0,
  measured: `badMeta=${badMeta.length}, duplicateTitles=${dupTitles.length}, uniqueTitles=${new Set(titles).size}/43`,
};

const a3 = {
  name: '/projects/all no longer throws',
  pass: allCheck.redirectedToProjects && allCheck.pageErrors.length === 0,
  measured: `finalHash=${allCheck.hash}, pageErrors=${allCheck.pageErrors.length}`,
};

const imgFail = routes.filter((r) => r.imagesMissingAlt > 0);
const a4 = {
  name: 'zero images missing alt',
  pass: imgFail.length === 0,
  measured: `routesWithMissingAlt=${imgFail.length}, totalMissingAlt=${routes.reduce((s, r) => s + r.imagesMissingAlt, 0)}`,
};

const overflow375 = routes.filter((r) => r.overflow375.overflow);
const a5 = {
  name: 'zero routes with horizontal overflow at 375',
  pass: overflow375.length === 0,
  measured: `routesWithOverflow375=${overflow375.length}`,
};
const assertions = [a1, a2, a3, a4, a5];

/* ------------------------------------------------------------------ *
 * 7. Write deliverables                                               *
 * ------------------------------------------------------------------ */
fs.writeFileSync(path.join(HERE, 'report.json'), JSON.stringify(routes, null, 2) + '\n');

const shotCount = fs.readdirSync(SHOTS_DIR).filter((f) => f.endsWith('.png')).length;
const lines = [];
lines.push('# Route QA — Raqeeb portfolio correction');
lines.push('');
lines.push(`Generated: ${new Date().toISOString()}`);
lines.push(`Base: ${BASE} (vite preview of dist, port 4178)`);
lines.push(`Routes measured: ${routes.length} (5 main + 5 category + 25 design detail + 8 AI detail)`);
lines.push(`Screenshots written: ${shotCount} (21 surfaces x 3 widths)`);
lines.push(`og:image reachability: ${Object.entries(imageStatus).map(([u, s]) => `${u} -> ${s}`).join(' | ')}`);
lines.push('');
lines.push('## Assertions');
lines.push('');
for (const a of assertions) lines.push(`- [${a.pass ? 'PASS' : 'FAIL'}] ${a.name} — measured: ${a.measured}`);
lines.push('');
lines.push('## /projects/all redirect');
lines.push('');
lines.push(`initial=/projects/all final=${allCheck.finalUrl} hash=${allCheck.hash} pageErrors=${allCheck.pageErrors.length} consoleErrors=${allCheck.consoleErrors.length} h1=${JSON.stringify(allCheck.h1)}`);
lines.push('');
lines.push('## Counts');
lines.push('');
lines.push(`- routes=43, with h1=${routes.filter(r=>r.h1Count>0).length}, with h2=${routes.filter(r=>r.h2Count>0).length}`);
lines.push(`- routes with h2 before first h3=${routes.filter(r=>r.h2BeforeH3).length}`);
lines.push(`- routes with console errors=${routes.filter(r=>r.consoleErrors.length>0).length}, with page errors=${routes.filter(r=>r.pageErrors.length>0).length}`);
lines.push(`- overflow at 1440=${routes.filter(r=>r.overflow1440.overflow).length}, overflow at 375=${overflow375.length}`);
lines.push('');
lines.push('## Failed routes (with error)');
lines.push('');
const failed = routes.filter((r) =>
  r.pageErrors.length || r.consoleErrors.length || r.imagesMissingAlt ||
  r.overflow375.overflow || !r.title?.trim() || !r.description?.trim() ||
  (r.ogImageStatus !== null && typeof r.ogImageStatus !== 'number')
);
if (!failed.length) lines.push('- none');
for (const r of failed) {
  lines.push(`- ${r.route}`);
  if (r.pageErrors.length) lines.push(`  - pageErrors: ${JSON.stringify(r.pageErrors)}`);
  if (r.consoleErrors.length) lines.push(`  - consoleErrors: ${JSON.stringify(r.consoleErrors)}`);
  if (r.imagesMissingAlt) lines.push(`  - imagesMissingAlt: ${r.imagesMissingAlt} ${JSON.stringify(r.missingAltSources)}`);
  if (r.overflow375.overflow) lines.push(`  - overflow375: scrollWidth=${r.overflow375.scrollWidth} clientWidth=${r.overflow375.clientWidth}`);
  if (!r.title?.trim()) lines.push('  - empty title');
  if (!r.description?.trim()) lines.push('  - empty meta description');
  if (r.ogImageStatus !== null && typeof r.ogImageStatus !== 'number') lines.push(`  - ogImageStatus: ${r.ogImageStatus}`);
}
lines.push('');
lines.push('## Screenshots');
lines.push('');
lines.push('shots/<route>-<width>.png — 8-bit PNG at 1440x900, 768x1024, 375x812 for 21 surfaces (5 main, 5 category, 3 design detail, 8 AI).');
fs.writeFileSync(path.join(HERE, 'summary.md'), lines.join('\n') + '\n');

// remove scratch data copies (deliverables stay clean)
fs.rmSync(SCRATCH, { recursive: true, force: true });

console.log('WROTE report.json entries=' + routes.length);
console.log('WROTE summary.md screenshots=' + shotCount);
for (const a of assertions) console.log(`ASSERT ${a.pass ? 'PASS' : 'FAIL'} :: ${a.name} :: ${a.measured}`);
