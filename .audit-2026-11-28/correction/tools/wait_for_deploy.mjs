import { chromium } from 'playwright';

const BASE = 'https://raqeeb-website-mu.vercel.app';
const deadline = Date.now() + 12 * 60 * 1000;
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errs = [];
page.on('pageerror', (e) => errs.push(String(e.message).slice(0, 120)));

let attempt = 0;
let landed = null;

while (Date.now() < deadline) {
  attempt += 1;
  try {
    await page.goto(BASE + '/?cb=' + Date.now() + '#/projects/nope', { waitUntil: 'networkidle', timeout: 45000 });
    await page.waitForTimeout(800);
    const state = await page.evaluate(() => ({ hash: location.hash, h1: (document.querySelector('h1') || {}).innerText || '' }));
    landed = state;
    if (state.hash === '#/projects' && state.h1.trim() === 'WORK') {
      console.log('DEPLOYED: mistyped project URL redirects to the work index');
      console.log('attempt', attempt, 'observed', JSON.stringify(state), 'pageErrors', errs.length);
      await browser.close();
      process.exit(0);
    }
  } catch (e) {
    console.log('attempt', attempt, 'error', String(e.message).slice(0, 120));
  }
  await sleep(20000);
}

console.log('TIMEOUT: production still serving the old build');
console.log('last observed', JSON.stringify(landed), 'pageErrors', errs.length);
await browser.close();
process.exit(1);
