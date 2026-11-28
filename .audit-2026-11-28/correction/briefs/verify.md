# LANE BRIEF — verify (role=verify)

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
Trust no handoff. Re-derive every claim from live commands and the served page.

## TASK
Independently verify the run goal. Build the site, serve the built dist, render the routes and measure.
A green handoff is not evidence.

## DELIVERABLE
.audit-2026-11-28/correction/verify.md — one flat `CRITERION <id> #<attempt>: met - <measured value>`
line per criterion (c1..c6), plus the commands you ran and their output.

## SCOPE
Write only .audit-2026-11-28/correction/verify.md and .audit-2026-11-28/correction/verify-shots/ .
Change no source file.

## CRITERIA (verify each with your own measurement)
c1 All 43 routes render with zero page errors and a unique title and meta description read from the served page.
c2 The home first screen leads with the AI implementation eyebrow and the H1 "I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS".
c3 All 25 design project pages carry eyebrow, lede, delivered facts and what-to-look-at blocks instead of one sentence.
c4 All 8 AI pages carry lede, how it works, contribution, verified, limits and status, with no internal seat name, skill name or raw file path rendered.
c5 No page claims scheduled workflows are running; the automations copy states the scheduler is paused by decision.
c6 `npm run build` exits 0, `npm run lint` reports no errors, and `npx tsc --noEmit -p tsconfig.app.json` reports no errors.

## STEPS
1. `git -C <repo> rev-parse --short HEAD` and `git -C <repo> status --short` — record the state you tested.
2. `npm run build` (quote exit code + tail), `npm run lint` (quote error count), `npx tsc --noEmit -p tsconfig.app.json` (quote the error list or 0).
3. `npx vite preview --port 4179 --strictPort` in background; drive with playwright (chromium installed).
   Render all 43 routes; for each capture page errors, document.title, meta description, h1 text.
   Count distinct titles. Confirm /projects/all lands on /projects without an error.
4. Grep the built JS bundle for the forbidden strings `seatSouls`, `SOUL.md`, `coming soon` and count;
   and grep source pages for `38+`.
5. Screenshot at 1440x900: /, /projects/ai/orio-operations, /projects/brand-identity/buyology, /resume.
6. Write one CRITERION line per criterion with the value you measured. If one is unmet, write `unmet - <why>`.

## STOP WHEN
verify.md carries six CRITERION lines and the six commands' measured output.
Also copy the handoff to the DAG handoff path in your goal marker; status word on line 1.
