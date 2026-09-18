// Render check: build output served locally, verify PDFDeckViewer on Buyology & Nasi
import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';

const root = 'E:/raqeeb-website/dist';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml' };

const server = createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  let file = join(root, p);
  if (!existsSync(file) || statSync(file).isDirectory()) file = join(root, 'index.html');
  try {
    const data = readFileSync(file);
    res.writeHead(200, { 'Content-Type': mime[extname(file)] || 'application/octet-stream' });
    res.end(data);
  } catch { res.writeHead(404); res.end(); }
});

await new Promise(r => server.listen(4173, r));

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

for (const [name, url] of [
  ['BUY', '/projects/brand-identity/buyology'],
  ['NASI', '/projects/brand-identity/nasi-packaging'],
]) {
  await page.goto(`http://localhost:4173${url}`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(600);

  const result = await page.evaluate(() => {
    const frame = document.querySelector('[style*="aspect-ratio"]');
    const img = document.querySelector('[style*="aspect-ratio"] img');
    const counter = [...document.querySelectorAll('span.font-mono')].map(s => s.textContent).find(t => t && t.includes('Page'));
    const squeeze = document.querySelector('[data-squeeze], .squeeze, [class*="slat"]');
    const overlay = document.querySelector('.bg-gradient-to-t');
    const prev = document.querySelector('button[aria-label="Previous slide"]');
    const next = document.querySelector('button[aria-label="Next slide"]');
    return {
      hasFrame: !!frame,
      frameRatio: frame ? getComputedStyle(frame).aspectRatio : null,
      imgLoaded: img ? img.naturalWidth > 0 : false,
      imgObjectFit: img ? getComputedStyle(img).objectFit : null,
      counter: counter || null,
      hasSqueezeUI: !!squeeze || !!overlay,
      hasNavButtons: !!prev && !!next,
    };
  });
  console.log(name, JSON.stringify(result));
  await page.screenshot({ path: `E:/raqeeb-website/render-${name.toLowerCase()}.png`, fullPage: false });
}

await browser.close();
server.close();
console.log('DONE');
process.exit(0);
