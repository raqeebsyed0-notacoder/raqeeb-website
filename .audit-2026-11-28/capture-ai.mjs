import { chromium } from 'playwright';
import fs from 'node:fs';
import path from 'node:path';

const OUT = path.resolve('.audit-2026-11-28');
const PAGES = path.join(OUT, 'pages');
const BASE_LIVE = 'https://raqeeb-website-mu.vercel.app/';
const BASE_LOCAL = 'http://127.0.0.1:4173/';

const ai = ['agent-fleet', 'skills-library', 'orio-operations', 'leadjin-portal', 'approval-inbox', 'paperclip-plugin', 'hermes-engine', 'automations'];
const routes = [
  ...ai.map(s => [`detail-${s}`, `#/projects/ai/${s}`]),
  ['grid-all', '#/projects/all'],
];

const browser = await chromium.launch({ headless: true });
const out = [];
for (const base of [[BASE_LIVE, 'live'], [BASE_LOCAL, 'local']]) {
  for (const [name, hash] of routes) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const errs = [];
    page.on('pageerror', e => errs.push(String(e)));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    try {
      await page.goto(base[0] + hash, { waitUntil: 'load', timeout: 45000 });
      await page.waitForTimeout(1400);
      await page.evaluate(async () => {
        const step = window.innerHeight;
        for (let y = 0; y < document.body.scrollHeight; y += step) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
        window.scrollTo(0, 0);
      });
      await page.waitForTimeout(300);
      const d = await page.evaluate(() => ({
        url: location.href,
        title: document.title,
        description: document.querySelector('meta[name="description"]')?.getAttribute('content') || null,
        h1: [...document.querySelectorAll('h1')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        h2: [...document.querySelectorAll('h2')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        h3: [...document.querySelectorAll('h3')].map(e => e.textContent.replace(/\s+/g, ' ').trim()),
        textLen: (document.body.innerText || '').length,
        text: (document.body.innerText || ''),
        imgs: document.querySelectorAll('img').length,
        imgsNoAlt: [...document.querySelectorAll('img')].filter(i => !i.getAttribute('alt')).length,
        bundle: [...document.querySelectorAll('script[src]')].map(s => s.getAttribute('src')),
      }));
      d.name = name; d.env = base[1]; d.errs = errs;
      fs.writeFileSync(path.join(PAGES, `${name}.${base[1]}.json`), JSON.stringify(d, null, 1));
      out.push({ name, env: base[1], ok: true, h1: d.h1, len: d.textLen, errs: errs.length });
      console.log(`${base[1]} ${name} h1=${JSON.stringify(d.h1)} len=${d.textLen} errs=${errs.length}`);
    } catch (e) {
      out.push({ name, env: base[1], ok: false, error: String(e).slice(0, 160) });
      console.log(`${base[1]} ${name} FAIL ${String(e).slice(0, 120)}`);
    }
    await ctx.close();
  }
}
fs.writeFileSync(path.join(OUT, 'ai-baseline.json'), JSON.stringify(out, null, 1));
await browser.close();
