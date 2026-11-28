# LANE BRIEF — data (all site copy data)

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## TASK
Rewrite the site's data module so the 5 categories, the 25 design projects and the 8 AI projects
carry the audited copy, and the internal agent dump stops existing.

## DELIVERABLE
- src/data/types.ts (new): the shared interfaces
- src/data/portfolio.ts (rewritten): categories + 25 design projects
- src/data/ai-projects.ts (new): the 8 AI projects
- src/data/agentContent.ts DELETED (git rm is not needed; just delete the file)

## SCOPE
Write only under /home/euphoria/euphoria-v2/work/raqeeb-website/src/data/ .
Do not touch pages, components, App.tsx or index.html.

## COPY SOURCE (read in full, use verbatim)
- /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_design.json
  (25 entries: slug,title,cat,year,media,route,current,problem,h1,eyebrow,lede,facts,look,seo,meta)
- /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_ai.json
  (8 entries: route,h1,eyebrow,lede,how,contribution,verified,limits,links,seo,meta)
- /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_main.json
  (`pages.categories` holds the 5 category ledes/notes/seo)
Do not invent copy. If a field is absent in the JSON, use the audit HTML
/home/euphoria/euphoria-v2/work/raqeeb-portfolio-correction-2026-11-28.html sections 6 and 7 to fill it.
Keep every existing media path, thumbnail, pdfRatio, liveUrl, liveFront, liveUrls, brandColors,
brandFonts, year and client exactly as they are today.

## CONTRACT (exact field names — the renderers are written against this)
```ts
export interface Project {            // unchanged fields kept
  id; title; slug; category: 'brand-identity'|'presentation'|'social-media'|'websites';
  sourceFolder; year: number|null; client: string|null; description: string|null;
  thumbnail; media: string[]; mediaTypes: string[]; originalFiles: string[];
  brandColors?; brandFonts?; pdfRatio?; liveUrl?; liveFront?; liveUrls?;
  // ADD:
  eyebrow: string;        // "BRAND IDENTITY · 2025 · 13-PAGE DOCUMENT"
  lede: string;           // the audited lede
  facts: string;          // the audited evidence line
  look: string;           // the audited "what to look at" line
  seoTitle: string; seoDescription: string;
}
export interface Category {
  id; slug; title; shortTitle; description; sourceFolder;
  lede: string; note: string; seoTitle: string; seoDescription: string;
}
export interface AiProject {
  id; title; slug;
  eyebrow: string;        // "OPERATIONS CONSOLE · DRILLING SERVICES · PILOT"
  lede: string;
  how: string[];          // 4 bullets from the audit "How it works"
  contribution: string;
  verified: string;
  limits: string;
  status: 'Running'|'Pilot'|'Paused'|'Archived';
  role: string;           // short subtitle used by the AI carousel, e.g. "Fleet coordination"
  stack: string[]; architecture: string; screenshots: string[];
  links: { label: string; url: string; type: 'diagram'|'portal'|'external'|'repo' }[];
  demos: { label: string; url: string }[];
  seoTitle: string; seoDescription: string;
}
```
REMOVE from AiProject: agent, owner, company, why_created, day_to_day_value, skills, skillDetails.
`description` on Project must equal the audited `lede` is NOT required — keep `description` as the
audited lede so any list card reads the same line.

## STATUS VOCABULARY (must match the audit)
agent-fleet Running · skills-library Running · orio-operations Pilot · leadjin-portal Pilot ·
approval-inbox Running · paperclip-plugin Running · hermes-engine Running · automations Paused.
The automations summary/lede must say the scheduler is paused by decision (47 jobs, all paused).
No page may claim "38+" workflows running.

## DEMOS (real files that exist — use them)
- assets/ai/videos/orio-operations-pilot-demo.mp4
- assets/ai/videos/orio-market-intelligence-demo.mp4
- posters: assets/ai/videos/orio-*-poster.jpg
No demo url may be empty, and no "coming soon" text may appear in the data.

## VERIFY
- `cd <repo> && npx tsc --noEmit -p tsconfig.app.json` → report only errors in src/data/*; 0 expected.
- `grep -c "agentContent" src/data/*.ts` → 0 ; `ls src/data/agentContent.ts` → absent.
- `grep -c "38+" src/data/*.ts` → 0.
- 25 design entries and 8 AI entries present: print the counts from a node -e/json check.

## STOP WHEN
The four files are written/removed, the counts print 25 and 8, and the handoff is at
.audit-2026-11-28/correction/handoffs/data.md (status DONE/BLOCKED/ESCALATE on line 1) plus the DAG
handoff path in your goal marker.
