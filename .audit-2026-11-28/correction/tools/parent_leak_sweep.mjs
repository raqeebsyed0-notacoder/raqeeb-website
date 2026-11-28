// Parent's own c4 re-check: no AI page may render an internal skill/file name, a seat name or an asset path.
// page.evaluate() runs in the browser page context (Playwright), not Node eval.
import { chromium } from 'playwright';

const BASE = 'http://127.0.0.1:4181';
const slugs = ['agent-fleet', 'skills-library', 'orio-operations', 'leadjin-portal', 'approval-inbox', 'paperclip-plugin', 'hermes-engine', 'automations'];
const BAD = ['skill.md', 'yaml frontmatter', 'soul.md', 'sovereign', 'marshal', 'mason', 'prism', 'crucible', 'lantern', 'herald', 'steward', 'assets/'];

const browser = await chromium.launch();
const hits = [];
const stacks = {};
for (const slug of slugs) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${BASE}/#/projects/ai/${slug}`, { waitUntil: 'domcontentloaded' });
  await page.waitForTimeout(280);
  const text = (await page.textContent('body')).toLowerCase();
  const bad = BAD.filter((b) => text.includes(b));
  if (bad.length) hits.push([slug, bad]);
  const idx = text.indexOf('stack');
  stacks[slug] = idx >= 0 ? text.slice(idx, idx + 60) : 'no stack section';
  await page.close();
}
await browser.close();
console.log('pages checked:', slugs.length);
console.log('leak hits:', JSON.stringify(hits));
console.log('skills-library stack text:', JSON.stringify(stacks['skills-library']));
