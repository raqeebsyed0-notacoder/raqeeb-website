// Parent-side read of the two page classes the audit rebuilt: one design detail page and
// one AI detail page, captured at the blocks a reader reaches, at the reader's width.
// page.evaluate() runs in the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';
import { mkdirSync } from 'node:fs';

const BASE = 'http://127.0.0.1:4181';
const OUT = '/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/parent-verify';
mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const errors = [];

async function shot(hash, name, headingText) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  page.on('pageerror', (e) => errors.push(`${hash}: ${e.message}`));
  await page.goto(`${BASE}/${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);
  await page.screenshot({ path: `${OUT}/${name}-top-1440.png` });
  if (headingText) {
    const found = await page.evaluate((t) => {
      const hs = [...document.querySelectorAll('h2, h3')];
      const h = hs.find((e) => e.textContent.trim().toLowerCase().includes(t.toLowerCase()));
      if (!h) return false;
      h.scrollIntoView({ block: 'start' });
      return true;
    }, headingText);
    await page.waitForTimeout(350);
    await page.screenshot({ path: `${OUT}/${name}-${headingText.replace(/\W+/g, '-').toLowerCase()}-1440.png` });
    console.log(`${name}: heading "${headingText}" ${found ? 'found and scrolled to' : 'NOT FOUND'}`);
  }
  const h2s = await page.$$eval('h2', (els) => els.map((e) => e.textContent.trim()).filter(Boolean));
  const title = await page.title();
  const desc = await page.getAttribute('meta[name="description"]', 'content');
  const canonical = await page.getAttribute('link[rel="canonical"]', 'href');
  console.log(`${name}: title=${JSON.stringify(title)}`);
  console.log(`${name}: desc=${JSON.stringify((desc || '').slice(0, 90))}`);
  console.log(`${name}: canonical=${JSON.stringify(canonical)}`);
  console.log(`${name}: h2s=${JSON.stringify(h2s.slice(0, 8))}`);
  await page.close();
}

await shot('#/projects/brand-identity/buyology', 'design-buyology', 'What was delivered');
await shot('#/projects/ai/orio-operations', 'ai-orio', 'Limits');
await shot('#/resume', 'resume', 'Experience');
await shot('#/projects/all', 'all-redirect', null);
console.log('PAGE ERRORS:', errors.length ? JSON.stringify(errors) : 'none');
await browser.close();
