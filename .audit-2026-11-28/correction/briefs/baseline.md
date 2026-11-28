# LANE BRIEF — baseline (role=baseline)

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`, base fb504cb)
No commits, no push, no npm install, absolute paths only.

## TASK
Record the pre-change baseline of the Raqeeb portfolio site, so every later claim has a before-state.

## DELIVERABLE
/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/baseline.md
plus the raw JSON your script prints next to it (baseline-routes.json).

## SCOPE
Write only under /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/correction/ .
Read anything in the repo. Change no source file.

## STEPS
1. Record: `git -C <repo> rev-parse HEAD`, branch, `git status --short` (tracked only).
2. Record `npm run build` exit code + tail, `npm run lint` error count, and the full list of
   `npx tsc --noEmit -p tsconfig.app.json` errors (these are the known pre-existing errors).
2. Route list: enumerate the 43 real pages yourself = 5 main (/, /about, /process, /projects, /resume)
   + 5 category (/projects/ai, /projects/brand-identity, /projects/presentation-design,
   /projects/social-media, /projects/websites) + 25 design detail (from src/data/portfolio.ts)
   + 8 AI detail (from src/data/ai-projects.ts). Do not use .audit-2026-11-28/baseline.json as the
   ledger (it holds 36 entries); print the count you derived. /projects/all is checked separately as a
   redirect and is not one of the 43.
4. Serve the current build (`npx vite preview --port 4173 --strictPort` in background) and drive it
   with a playwright script (chromium is installed; `node` + `playwright` are in node_modules).
   For EVERY route collect: document.title, meta[name=description], meta[property="og:image"],
   link[rel=canonical], h1 text, h1 count, h2 count, page errors and console errors.
5. Confirm and quote the /projects/all failure: the exact page error text and the rendered h1.
6. Count images with no alt attribute, and count distinct document.title values across the 43 routes.
7. Baseline screenshots at 1440x900 for: /, /about, /projects, /projects/ai, /projects/ai/orio-operations,
   /projects/brand-identity/buyology — into .audit-2026-11-28/correction/baseline-shots/.

## VERIFY
baseline.md exists and carries all seven items above with the values you measured, and a one-line verdict.

## STOP WHEN
baseline.md + baseline-routes.json are written. Do not fix anything you find; you are the before-state.
Write the same handoff to the DAG handoff path named in your goal marker, and to
.audit-2026-11-28/correction/handoffs/baseline.md — status DONE / BLOCKED / ESCALATE on line 1.
