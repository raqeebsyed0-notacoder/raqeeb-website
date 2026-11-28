// Parent's own metadata sweep over the served build: 43 routes, unique title + description,
// canonical present, page errors. Independent of the QA lane's run.
// page.evaluate() runs in the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4181';
const routes = JSON.parse(
  readFileSync('/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/baseline-routes.json', 'utf8')
).routes.map((r) => r.hash);

const browser = await chromium.launch();
const rows = [];
for (const hash of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const errs = [];
  page.on('pageerror', (e) => errs.push(e.message));
  await page.goto(`${BASE}/${hash}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(320);
  const meta = await page.evaluate(() => ({
    title: document.title,
    desc: document.querySelector('meta[name="description"]')?.content || '',
    og: document.querySelector('meta[property="og:title"]')?.content || '',
    canonical: document.querySelector('link[rel="canonical"]')?.href || '',
    h1: document.querySelector('h1')?.textContent?.trim() || '',
  }));
  rows.push({ hash, ...meta, errors: errs });
  await page.close();
}
await browser.close();

const titles = new Map();
const descs = new Map();
for (const r of rows) {
  titles.set(r.title, (titles.get(r.title) || 0) + 1);
  descs.set(r.desc, (descs.get(r.desc) || 0) + 1);
}
const dupTitles = [...titles].filter(([, n]) => n > 1);
const dupDescs = [...descs].filter(([, n]) => n > 1);
const missing = rows.filter((r) => !r.title || !r.desc || !r.canonical);
const withErrors = rows.filter((r) => r.errors.length);
console.log('routes:', rows.length);
console.log('distinct titles:', titles.size, 'distinct descriptions:', descs.size);
console.log('duplicate titles:', JSON.stringify(dupTitles));
console.log('duplicate descriptions:', JSON.stringify(dupDescs.map(([d, n]) => [d.slice(0, 60), n])));
console.log('routes missing title/desc/canonical:', JSON.stringify(missing.map((r) => r.hash)));
console.log('routes with page errors:', JSON.stringify(withErrors.map((r) => [r.hash, r.errors[0]])));
console.log('sample:', JSON.stringify(rows.slice(0, 3).map((r) => [r.hash, r.title, r.desc.slice(0, 50)]), null, 1));
