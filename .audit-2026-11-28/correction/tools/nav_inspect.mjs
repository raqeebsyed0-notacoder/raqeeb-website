// Inspect the real header DOM so the nav check targets the right nodes.
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4181';
const browser = await chromium.launch();

for (const [w, h, hash, tag] of [
  [1440, 900, '#/', 'desktop-home'],
  [1440, 900, '#/projects/ai', 'desktop-ai'],
  [375, 812, '#/', 'mobile-home'],
]) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(`${BASE}/${hash}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  const links = await page.$$eval('a', (els) =>
    els.slice(0, 14).map((e) => `${e.textContent.trim().replace(/\s+/g, ' ').slice(0, 24)} -> ${e.getAttribute('href')}`)
  );
  const buttons = await page.$$eval('button', (els) =>
    els.slice(0, 6).map((e) => `${e.getAttribute('aria-label') || e.textContent.trim().slice(0, 16) || '(icon)'} [${e.className.slice(0, 30)}]`)
  );
  const navHtml = await page.evaluate(() => {
    const n = document.querySelector('nav');
    if (!n) return 'NO <nav> ELEMENT';
    return n.outerHTML.slice(0, 260);
  });
  console.log(`\n=== ${tag} ===`);
  console.log('nav element:', navHtml.replace(/\s+/g, ' '));
  console.log('links:', JSON.stringify(links, null, 0));
  console.log('buttons:', JSON.stringify(buttons));
  await page.close();
}
await browser.close();
