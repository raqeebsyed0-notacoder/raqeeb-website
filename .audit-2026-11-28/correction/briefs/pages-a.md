# LANE BRIEF — pages-a (Home + Projects) — repair of the failed main-pages node

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## WHY THIS LANE EXISTS
The previous lane wrote HomePage.tsx and then died in a repetition loop. HomePage is half-done and its
import is wrong. ProjectsPage was never touched. You own exactly these two files.

## TASK
1. Finish/replace HomePage.tsx with the audited AI-first home.
2. Replace ProjectsPage.tsx with the audited WORK page.

## DELIVERABLE
src/pages/HomePage.tsx, src/pages/ProjectsPage.tsx

## SCOPE
Write only those two files plus your handoff file. Do not touch About/Process/Resume, CategoryPage,
ProjectDetailPage, Layout, App, index.html or src/data/.

## HOW TO WRITE (the previous lane died here — read this)
- `read_file` the whole file FIRST with limit 2000 (a partial/paginated read makes write_file refuse
  with "last read with offset/limit pagination"). Then `write_file` the complete new content.
- Never write source files from a terminal/python heredoc. Never loop. One read, one write per file.

## IMPORT CONTRACT (already written by the data lane)
- Design + AI projects: `import { aiProjects } from '../data/ai-projects'` and
  `import { projects, categories } from '../data/portfolio'`.
  The previous lane wrote `import { aiProjects } from '../data/portfolio'` — that is WRONG, fix it.
- AiProject fields: id, title, slug, eyebrow, lede, how[], contribution, verified, limits,
  status ('Running'|'Pilot'|'Paused'|'Archived'), role, stack[], architecture, screenshots[], links[], demos[].
- Project fields include: id, title, slug, category, year, client, lede, eyebrow, facts, look,
  thumbnail, media, pdfRatio?, liveUrl?, liveFront?, liveUrls?.
- Category fields: slug, title, shortTitle, description, lede, note.

## COPY SOURCE (verbatim)
/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_main.json
 — `pages.home` and `pages.projects`.

## HOME (required)
- Eyebrow "AI IMPLEMENTATION · AGENT SYSTEMS · AUTOMATION", H1 "I TURN BUSINESS PROBLEMS INTO WORKING
  AI SYSTEMS", the audited subheadline, the audited intro, primary CTA → #/projects/ai ("See the AI work"),
  secondary CTA → #/process ("How I work").
- Featured work, in this order, read from `aiProjects`: leadjin-portal, orio-operations, agent-fleet,
  approval-inbox. Each card: title, its `lede` or a short line, its `status` label, link to /projects/ai/<slug>.
- Then an AI capability block, then the design-background block, then the contact CTA
  (mailto:raqeebsyed0@gmail.com).
- Keep the existing hero video element and its CloudFront URL exactly as it is (a code comment may note
  it is a third-party host asset). Do not replace it with an image and do not remove it.
- Keep the existing visual language: near-black ground, existing type scale, one accent. No new dependency.

## PROJECTS (required)
- H1 "WORK", the audited page lead ("Seven AI systems and twenty-five design projects...").
- AI systems FIRST: every entry from `aiProjects` with its real status label and, where `links` carries a
  repo, a Repository link. No "Demo video coming soon", no "placeholder", no empty decorative slot.
- Then the 25 design projects grouped by their four categories (skip the `ai` category), each card linking
  to /projects/<category-slug>/<slug> using the existing slug mapping (category id 'presentation' is the
  route slug 'presentation-design').
- Keep the page's existing card/grid styling.

## VERIFY (quote the output in your handoff)
- `grep -n "38+" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx` → no match.
- `grep -in "coming soon\|placeholder" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx` → no match.
- `grep -n "I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS" src/pages/HomePage.tsx` → 1 match.
- `grep -n "data/ai-projects" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx` → present.
- `npx tsc --noEmit -p tsconfig.app.json` → report ONLY errors in your two files.

## STOP WHEN
Both files are written, the five checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/pages-a.md (status on line 1) + the DAG handoff path.
