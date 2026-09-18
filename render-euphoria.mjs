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

// Test Euphoria HTML embed
await page.goto('http://localhost:4173/projects/brand-identity/euphoria-experiences-brand', { waitUntil: 'networkidle' });
await page.waitForTimeout(800);

const result = await page.evaluate(() => {
  const iframe = document.querySelector('iframe');
  const fullScreenBtn = [...document.querySelectorAll('button')].find(b => b.textContent?.includes('Full Screen'));
  const squeeze = document.querySelector('[class*="slat"]');
  return {
    hasIframe: !!iframe,
    iframeSrc: iframe?.src || null,
    hasFullScreenBtn: !!fullScreenBtn,
    hasSqueezeUI: !!squeeze,
  };
});

console.log('EUPHORIA', JSON.stringify(result));
await page.screenshot({ path: 'E:/raqeeb-website/render-euphoria.png', fullPage: false });

await browser.close();
server.close();
console.log('DONE');
process.exit(0);
