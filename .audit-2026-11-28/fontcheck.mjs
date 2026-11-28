import { chromium } from 'playwright';
const b = await chromium.launch({ headless: true });
for (const [label, url] of [['local', 'http://127.0.0.1:4173/#/'], ['live', 'https://raqeeb-website-mu.vercel.app/#/']]) {
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 } });
  const p = await ctx.newPage();
  const failed = [];
  p.on('requestfailed', r => failed.push(`${r.url().slice(0, 90)} :: ${r.failure()?.errorText}`));
  const reqs = [];
  p.on('request', r => { const u = r.url(); if (/font|\.mp4|onlinewebfonts|cloudfront|googleapis/.test(u)) reqs.push(u.slice(0, 90)); });
  await p.goto(url, { waitUntil: 'load', timeout: 45000 });
  await p.waitForTimeout(2500);
  const fonts = await p.evaluate(() => [...document.fonts].map(f => f.family + ' ' + f.status).slice(0, 8));
  const bodyFont = await p.evaluate(() => getComputedStyle(document.body).fontFamily);
  console.log(`${label} FAILED_COUNT=${failed.length} :: ${failed.join(' || ')}`);
  console.log(label, '| font/video requests:', [...new Set(reqs)].slice(0, 6));
  console.log(label, '| body font:', bodyFont, '| document.fonts:', fonts);
  await ctx.close();
}
await b.close();
