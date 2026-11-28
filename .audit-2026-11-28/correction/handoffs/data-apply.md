STATUS: DONE
LANE: data-apply (raqeeb-correction)
Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch portfolio-correction)
SCOPE: src/data/ + this handoff only.

## What I did
1. Dry-ran `python3 .audit-2026-11-28/correction/tools/apply_design_copy.py`; output matched the
   expected prior round exactly (inserted=25 design, 5 categories, 6 blocks removed, 8 summary
   fields removed), so no STOP condition applied.
2. Ran the same script with `--apply`; output:
   - `A design: inserted=25 already=0 missing=[]`
   - `B categories: inserted=5 already=0 missing=[]`
   - `C removed: ['export interface Project {', 'export interface Category {', 'export interface SkillInfo {', 'export interface AiProjectLink {', 'export interface AiProject {', 'aiProjects array']`
   - `D summary removed: ai=8 types_clean=True`
   - `READBACK portfolio.ts: eyebrow=25 facts=25 look=25 lede=30 seoTitle=30 aiProjects_refs=4 iface=0 types_import=2`
3. Deleted `src/data/agentContent.ts` with `rm`.
4. Removed the unexported, unused `statusMap` constant from `src/data/ai-projects.ts` — the only
   TypeScript error inside my SCOPE (TS6133). Statuses are already set inline on each project.

## Files changed
- `src/data/portfolio.ts` — audited eyebrow/lede/facts/look/seoTitle/seoDescription added to 25
  design projects and lede/note/seoTitle/seoDescription to 5 categories; local interfaces replaced
  with type imports; legacy `aiProjects` array removed and re-exported from `./ai-projects`.
- `src/data/ai-projects.ts` — 8 `summary` fields removed by the transform; dead `statusMap` removed.
- `src/data/types.ts` — `summary: string` removed from the `AiProject` interface by the transform.
- `src/data/agentContent.ts` — deleted.
- This handoff (also copied to the DAG handoff path).

## VERIFY — the five quoted values
1. `grep -c 'eyebrow:' src/data/portfolio.ts` -> **25**
2. `grep -c '    facts:' src/data/portfolio.ts` -> **25**
3. `ls src/data/agentContent.ts` -> **absent** (`ls: cannot access 'src/data/agentContent.ts': No such file or directory`)
4. `grep -c 'summary' src/data/ai-projects.ts` -> **0**
5. `npx tsc --noEmit -p tsconfig.app.json` -> **0 errors in `src/data/*`**. Remaining 28 errors are
   all outside my SCOPE, in files parallel agents are editing:
   - `src/components/ai-project-detail.tsx` (23) — still imports the deleted `agentContent` and
     reads removed `summary` / `skillDetails` / `agent` fields (ai-renderer lane).
   - `src/components/ui/scroll-velocity.tsx` (3) — unused locals.
   - `src/pages/CategoryPage.tsx` (2) — possibly-undefined `cat`.
   Extra check: `grep -rc 'agentContent' src/data/*.ts` -> 0 in ai-projects.ts, portfolio.ts, types.ts.

## Still open (outside my SCOPE)
- The component/page lanes must update `ai-project-detail.tsx`, `scroll-velocity.tsx` and
  `CategoryPage.tsx` before the full build is clean. I did not touch them.
- Two untracked MP4 assets already present in `src/data/` predate my work; left untouched and unstaged.
