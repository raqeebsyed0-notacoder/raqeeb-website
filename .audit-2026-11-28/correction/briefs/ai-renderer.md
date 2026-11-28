# LANE BRIEF — ai-renderer

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## TASK
Rebuild the AI case-study page so it shows the working system, its honest status and its limits, and
stops leaking internal operations.

## DELIVERABLE
src/components/ai-project-detail.tsx (rewritten)

## SCOPE
Write only /home/euphoria/euphoria-v2/work/raqeeb-website/src/components/ai-project-detail.tsx .
Do not touch src/data/, pages, App.tsx, or the viewer components.

## HARD REMOVALS (these are the audit's findings — grep must prove them gone)
- `import { seatSouls, skillContent } from '../data/agentContent'` and every SOUL.md / SKILL.md reveal,
  every "responsible agent seat" block and every internal skill name on the page.
  The agentContent.ts data file is deleted by another lane; do not import it.
- Any rendered raw file path (no `assets/ai/diagrams/...` printed as visible text).
- Any "Demo video coming soon" / "video coming soon" / "placeholder" string.
- The words "triple-provenance", "curator hygiene", "Rule 0 gates", "recovery-action disposition",
  "Step 0 pre-flight" — internal shorthand a reader cannot parse.

## DATA CONTRACT (written by the data lane — read it, do not edit it)
AiProject now carries: id, title, slug, eyebrow, lede, how: string[] (4 bullets), contribution,
verified, limits, status ('Running'|'Pilot'|'Paused'|'Archived'), role, stack: string[],
architecture (png path), screenshots: string[], links: {label,url,type}[], demos: {label,url}[],
seoTitle, seoDescription.

## WHAT TO BUILD (same order as the audit)
1. Back link, then status pill (`status`), eyebrow, h1 = title, `lede` as the standfirst.
2. "How it works" — h2, render `how` as bullets.
3. "My contribution" — h2, `contribution`.
4. "Verified at audit" — h2, `verified` (state it as what was verified, not as a live claim).
5. "Limits" — h2, `limits`. Do not soften or delete a limit.
6. The architecture figure: render `architecture` as an image with caption "System architecture
   diagram" and alt text naming the project. If `screenshots` has entries, render them in a grid.
7. Links: for `type: 'diagram'` keep the existing in-app embed behaviour (HtmlEmbedViewer); for
   `type: 'repo'` or 'external' an anchor with target=_blank rel=noopener.
8. Demos: `<video controls poster=...>` with the real mp4/posters the data carries. No empty slot, no
   "coming soon". The two OrIO videos exist at public/assets/ai/videos/.
9. Stack chips from `stack`.
Keep the existing design language (near-black panels, mono labels, one accent). No new dependency.

## VERIFY (quote output)
- `grep -in "seatSouls\|skillContent\|SOUL.md\|coming soon\|placeholder\|triple-provenance" src/components/ai-project-detail.tsx` → 0 matches.
- `grep -n "assets/ai/" src/components/ai-project-detail.tsx` → 0 matches (paths must come from data).
- `grep -n "status" src/components/ai-project-detail.tsx` → the status pill present.
- `npx tsc --noEmit -p tsconfig.app.json` → report only errors in this file.

## STOP WHEN
The file is rewritten, the three greps quote 0, handoff at
.audit-2026-11-28/correction/handoffs/ai-renderer.md (status line 1) + the DAG handoff path.
