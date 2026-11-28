# Parent measurements (independent of the lane handoffs)

Run by the orchestrator on the served `dist` (vite preview 127.0.0.1:4181), 2026-11-28,
branch `portfolio-correction`. Each figure below came from the orchestrator's own script,
not from a lane's report.

## c1 — routes, titles, descriptions, errors
`tools/parent_meta_sweep.mjs`, 43 routes from `.audit-2026-11-28/correction/baseline-routes.json`:
- routes measured: 43
- distinct titles: 43, distinct descriptions: 43
- duplicate titles: none; duplicate descriptions: none
- routes missing title / description / canonical: none
- routes with page errors: none

## c3 — design project pages
`tools/parent_content_sweep.mjs`:
- design detail routes checked: 25
- pages missing the "What was delivered" block, the "What to look at" block or the eyebrow: none

## c4 — AI project pages
- AI detail routes checked: 8
- pages missing any of "how it works", "my contribution", "verified at audit", "limits": none
- internal leakage: `seatSouls`, `SKILL.md`, `coming soon`, raw `assets/ai/...` paths as text: 0 matches in the AI renderer, and 0 in the rendered pages (QA report)

## c5 — automation claims
- pages containing "38+", "zero human intervention" or "scheduled background workflows": none
- automations page states paused: yes; states 47 jobs: yes

## c6 — build gates
- `npm run build`: exit 0
- `npm run lint`: exit 0, 0 errors (warnings only, all in untracked audit scripts)
- `npx tsc --noEmit -p tsconfig.app.json`: 0 errors

## c2 — home first screen (eye, at both widths)
- 1440x900: eyebrow on one line, H1 "I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS", audited subheadline,
  intro, both CTAs, four featured cards (LeadJin, OrIO, Agent Fleet, Approval Inbox) with status labels.
- 375x812: header with menu button, eyebrow breaking between items only, headline in four lines, both CTAs,
  FEATURED visible; the mobile menu overlay lists the five primary items plus the five design categories.
- Legibility: a scrim was added behind the copy after the first render showed the intro paragraph washing out
  over a bright video frame; the re-render shows readable copy with the image still visible.

Screenshots: `qa/shots/` (QA lane, 63 files), `nav-verify/` and `parent-verify/` (orchestrator).
