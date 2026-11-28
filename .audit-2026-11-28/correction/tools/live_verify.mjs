import { chromium } from 'playwright';

const BASE = 'https://raqeeb-website-mu.vercel.app';
const routes = [
  ['home', '/'],
  ['projects', '/#/projects'],
  ['ai-index', '/#/projects/ai'],
  ['ai-skills', '/#/projects/ai/skills-library'],
  ['ai-orio', '/#/projects/ai/orio-operations'],
  ['design-buyology', '/#/projects/brand/buyology'],
  ['about', '/#/about'],
  ['process', '/#/process'],
  ['resume', '/#/resume'],
  ['all-redirect', '/#/projects/all'],
];

const browser = await chromium.launch();
const out = { base: BASE, routes: [], home: {}, mobile: {}, errors: [] };

const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 160)));

for (const [name, path] of routes) {
  const before = errs.length;
  await page.goto(BASE + path, { waitUntil: 'networkidle', timeout: 45000 });
  await page.waitForTimeout(700);
  const m = await page.evaluate(() => ({
    url: location.href,
    title: document.title,
    desc: (document.querySelector('meta[name=\"description\"]') || {}).content || '',
    h1: (document.querySelector('h1') || {}).innerText || '',
    canon: (document.querySelector('link[rel=\"canonical\"]') || {}).href || '',
    bodyLen: document.body.innerText.trim().length,
  }));
  out.routes.push({ name, path, ...m, newErrors: errs.length - before });
}

// home first screen, both widths
await page.goto(BASE + '/', { waitUntil: 'networkidle' });
await page.waitForTimeout(600);
out.home = await page.evaluate(() => {
  const h1 = document.querySelector('h1');
  const txt = document.body.innerText;
  const eyebrowLine = txt.split('\n').find((l) => l.includes('AI IMPLEMENTATION')) || '';
  return { h1: h1 ? h1.innerText.replace(/\s+/g, ' ').trim() : '', eyebrowLine: eyebrowLine.trim(), h1Visible: !!h1 };
});
await page.screenshot({ path: '/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/live-verify/live-home-1440.png' });

const mobile = await browser.newPage({ viewport: { width: 375, height: 812 } });
const merrs = [];
mobile.on('pageerror', (e) => merrs.push(String(e.message).slice(0, 160)));
for (const p of ['/', '/#/projects', '/#/projects/ai/orio-operations']) {
  await mobile.goto(BASE + p, { waitUntil: 'networkidle', timeout: 45000 });
  await mobile.waitForTimeout(600);
  const o = await mobile.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  out.mobile[p] = { overflow: o, errors: merrs.length };
}
await mobile.goto(BASE + '/', { waitUntil: 'networkidle' });
await mobile.waitForTimeout(500);
await mobile.screenshot({ path: '/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/live-verify/live-home-375.png' });

out.errors = errs.concat(merrs);
console.log(JSON.stringify(out, null, 1));
await browser.close();
