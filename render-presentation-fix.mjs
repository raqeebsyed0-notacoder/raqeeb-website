import { chromium } from 'playwright';
import { createServer } from 'http';
import { readFileSync, existsSync, statSync } from 'fs';
import { join, extname } from 'path';

const root = 'E:/raqeeb-website/dist';
const mime = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.jpg': 'image/jpeg' };

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

// Test the actual URL that was failing: /projects/presentation-design/blaize
await page.goto('http://localhost:4173/projects/presentation-design/blaize', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const result = await page.evaluate(() => {
  const notFound = document.body.innerText.includes('Project not found');
  const frame = document.querySelector('[style*="aspect-ratio"]');
  const img = document.querySelector('[style*="aspect-ratio"] img');
  const counter = [...document.querySelectorAll('span.font-mono')].map(s => s.textContent).find(t => t && t.includes('Page'));
  return {
    notFound,
    hasFrame: !!frame,
    frameRatio: frame ? getComputedStyle(frame).aspectRatio : null,
    imgLoaded: img ? img.naturalWidth > 0 : false,
    counter: counter || null,
    heading: document.querySelector('h1')?.textContent || null,
  };
});

console.log('PRESENTATION-PROJECT', JSON.stringify(result));
await page.screenshot({ path: 'E:/raqeeb-website/render-presentation-fix.png', fullPage: false });

await browser.close();
server.close();
console.log('DONE');
process.exit(0);
