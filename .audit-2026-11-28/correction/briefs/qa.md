# LANE BRIEF — qa (functional + responsive validation)

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
Read-only on source. No commits, no push, no npm install.

## TASK
Validate the built site across all 43 routes at three widths and produce a machine-readable ledger
plus screenshots. You are the measurement, not the fix.

## DELIVERABLE
- .audit-2026-11-28/correction/qa/report.json — one entry per route
- .audit-2026-11-28/correction/qa/summary.md — the human read
- .audit-2026-11-28/correction/qa/shots/<route>-<width>.png
- the playwright script itself under .audit-2026-11-28/correction/qa/

## SCOPE
Write only under /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/qa/ .
If the build fails, STOP and report the exact error — do not patch source.

## STEPS
1. `cd /home/euphoria/euphoria-v2/work/raqeeb-website && npm run build` — quote the exit code and tail.
2. Serve the built dist: `npx vite preview --port 4178 --strictPort` (background) and confirm it answers.
3. Route list: enumerate exactly 43 real pages = 5 main (/, /about, /process, /projects, /resume)
   + 5 category (/projects/ai, /projects/brand-identity, /projects/presentation-design,
   /projects/social-media, /projects/websites) + 25 design detail (/projects/<4 design cats>/<slug>,
   slugs taken from src/data/portfolio.ts) + 8 AI detail (/projects/ai/<slug>, slugs from
   src/data/ai-projects.ts).
   Do NOT take the list from .audit-2026-11-28/baseline.json — that file holds only 36 entries and is
   not the route ledger. Derive the 43 from src/data + src/App.tsx and print the count.
   /projects/all is checked SEPARATELY (it must redirect to /projects without an error) and is not
   counted among the 43.
4. For EVERY route capture, at 1440x900: final URL after redirect, document.title, meta description,
   canonical, og:title, og:image (and whether that image URL answers 200), h1 text + count, h2 count
   and whether an h2 appears before the first h3, count of images missing alt, horizontal overflow
   (scrollWidth > clientWidth + 1), console errors and page errors (full text).
5. Screenshot the required surfaces at 1440x900, 768x1024 and 375x812: /, /about, /process, /projects,
   /resume, the 5 category routes, 3 design detail routes, and all 8 AI routes. 8-bit PNG.
6. Assertions to report as PASS/FAIL with the measured value:
   - 43/43 routes render with zero page errors
   - every route has a non-empty title and meta description, and no two routes share a title
   - /projects/all no longer throws
   - zero images missing alt
   - zero routes with horizontal overflow at 375
7. summary.md: the five assertions, the counts, and a list of every route that failed with its error.

## VERIFY
report.json parses, has 43 entries, and every entry carries the fields above (print the length).

## STOP WHEN
report.json + summary.md + shots are written, handoff at
.audit-2026-11-28/correction/handoffs/qa.md (status line 1) + the DAG handoff path.
