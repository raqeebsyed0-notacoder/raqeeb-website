// Orchestrator's own render of the delivered report page: top band, ledger band, readiness band.
// page.evaluate() runs in the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const FILE = 'file:///home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/FINAL-REPORT-2026-11-28.html';
const OUT = '/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/parent-verify';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function view(width, height, tag, anchors) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('pageerror', (e) => errors.push(`${tag}: ${e.message}`));
  await page.goto(FILE, { waitUntil: 'load' });
  await page.waitForTimeout(500);
  await page.screenshot({ path: `${OUT}/report-${tag}-top.png` });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  const fonts = await page.evaluate(() => document.fonts.size);
  for (const a of anchors) {
    const ok = await page.evaluate((needle) => {
      const els = [...document.querySelectorAll('h2, h3, strong, p, div')];
      const hit = els.find((e) => e.textContent.trim().toLowerCase().startsWith(needle.toLowerCase()));
      if (!hit) return false;
      hit.scrollIntoView({ block: 'start' });
      return true;
    }, a);
    await page.waitForTimeout(300);
    await page.screenshot({ path: `${OUT}/report-${tag}-${a.replace(/\W+/g, '-').toLowerCase()}.png` });
    console.log(`${tag}: anchor "${a}" ${ok ? 'found' : 'NOT FOUND'}`);
  }
  console.log(`${tag}: overflow=${overflow}px fontsLoaded=${fonts} errors=${errors.length}`);
  await page.close();
}

await view(1440, 900, '1440', ['Route completion ledger', 'AI project corrections', 'Readiness']);
await view(390, 844, '390', ['Route completion ledger']);
console.log('PAGE ERRORS:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
