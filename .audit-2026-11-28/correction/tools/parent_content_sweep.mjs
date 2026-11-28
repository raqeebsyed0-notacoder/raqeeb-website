// Parent's own check of the two content criteria the QA lane did not measure:
//  c3 every design project page carries the delivered-facts and what-to-look-at blocks
//  c5 no page claims running scheduled workflows, and the automations page states paused
// page.evaluate() runs in the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';
import { readFileSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4181';
const routes = JSON.parse(
  readFileSync('/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/baseline-routes.json', 'utf8')
).routes.map((r) => r.hash);

const designRoutes = routes.filter((h) => {
  const m = h.match(/^#\/projects\/([^/]+)\/([^/]+)$/);
  return Boolean(m) && m[1] !== 'ai';
});
const aiRoutes = routes.filter((h) => h.includes('#/projects/ai/'));

const browser = await chromium.launch();
const missingBlocks = [];
const runningClaims = [];
const aiMissing = [];

for (const hash of routes) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/${hash}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(280);
  const data = await page.evaluate(() => ({
    h2: [...document.querySelectorAll('h2')].map((e) => e.textContent.trim().toLowerCase()),
    text: document.body.innerText.toLowerCase(),
  }));
  if (designRoutes.includes(hash)) {
    const hasFacts = data.h2.some((h) => h.includes('what was delivered'));
    const hasLook = data.h2.some((h) => h.includes('what to look at'));
    const hasEyebrow = /·/.test(await page.textContent('body'));
    if (!hasFacts || !hasLook || !hasEyebrow) missingBlocks.push([hash, { hasFacts, hasLook, hasEyebrow }]);
  }
  if (aiRoutes.includes(hash)) {
    const need = ['how it works', 'my contribution', 'verified at audit', 'limits'];
    const missing = need.filter((n) => !data.h2.some((h) => h.includes(n)));
    if (missing.length) aiMissing.push([hash, missing]);
  }
  const bad = ['38+', 'zero human intervention', 'scheduled background workflows'];
  const hits = bad.filter((b) => data.text.includes(b));
  if (hits.length) runningClaims.push([hash, hits]);
  await page.close();
}

// the automations page must state the paused state
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto(`${BASE}/#/projects/ai/automations`, { waitUntil: 'domcontentloaded' });
await page.waitForTimeout(300);
const automationsText = (await page.textContent('body')).toLowerCase();
await page.close();
await browser.close();

console.log('design routes checked:', designRoutes.length, '| missing blocks:', JSON.stringify(missingBlocks));
console.log('AI routes checked:', aiRoutes.length, '| missing sections:', JSON.stringify(aiMissing));
console.log('pages with a running-workflow claim:', JSON.stringify(runningClaims));
console.log('automations states paused:', automationsText.includes('paused'));
console.log('automations mentions 47 jobs:', /47/.test(automationsText));
