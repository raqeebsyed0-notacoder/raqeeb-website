// Parent verification of the header: nav order, active state, mobile menu, at both widths.
// page.evaluate() here runs inside the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4181';
const SHOTS = '/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/nav-verify';
mkdirSync(SHOTS, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function probe(width, height, hash) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('pageerror', (e) => errors.push(`${hash}@${width}: ${e.message}`));
  await page.goto(`${BASE}/${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(500);
  const nav = await page.$$eval('nav a, nav span[aria-current]', (els) =>
    els.map((e) => e.textContent.trim()).filter((t) => t.length > 2 && t.length < 20)
  );
  const active = await page.$$eval('nav [aria-current="page"]', (els) => els.map((e) => e.textContent.trim()));
  return { page, nav: [...new Set(nav)], active: [...new Set(active)] };
}

let s = await probe(1440, 900, '#/');
await s.page.screenshot({ path: `${SHOTS}/nav-desktop-home-1440.png` });
console.log('DESKTOP home   nav:', JSON.stringify(s.nav), 'active:', JSON.stringify(s.active));
await s.page.close();

s = await probe(1440, 900, '#/projects/ai');
await s.page.screenshot({ path: `${SHOTS}/nav-desktop-ai-1440.png` });
console.log('DESKTOP ai     nav:', JSON.stringify(s.nav), 'active:', JSON.stringify(s.active));
await s.page.close();

s = await probe(1440, 900, '#/projects/brand-identity/buyology');
console.log('DESKTOP design nav:', JSON.stringify(s.nav), 'active:', JSON.stringify(s.active));
await s.page.close();

const page = await browser.newPage({ viewport: { width: 375, height: 812 } });
page.on('pageerror', (e) => errors.push(`mobile: ${e.message}`));
await page.goto(`${BASE}/#/`, { waitUntil: 'networkidle' });
await page.waitForTimeout(500);
const closedNav = await page.$$eval('nav a', (els) => els.filter((e) => e.offsetParent !== null).map((e) => e.textContent.trim()));
await page.screenshot({ path: `${SHOTS}/nav-mobile-closed-375.png` });
await page.click('button[aria-label="Open menu"]');
await page.waitForTimeout(600);
const openNav = await page.$$eval('nav a', (els) => els.filter((e) => e.offsetParent !== null).map((e) => e.textContent.trim()));
await page.screenshot({ path: `${SHOTS}/nav-mobile-open-375.png` });
const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
console.log('MOBILE visible links closed:', JSON.stringify([...new Set(closedNav)]));
console.log('MOBILE visible links open  :', JSON.stringify([...new Set(openNav)]));
console.log('MOBILE horizontal overflow px:', overflow);
console.log('PAGE ERRORS:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
