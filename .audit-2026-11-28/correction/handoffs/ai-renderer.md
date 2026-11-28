STATUS: DONE — AI case-study renderer rewritten; all three brief greps return zero matches and tsc reports no errors in the file.

# DAG HANDOFF — raqeeb-correction/ai-renderer

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch portfolio-correction)
Brief: .audit-2026-11-28/correction/briefs/ai-renderer.md
Precondition: read ../data-apply.md first — STATUS: DONE, so the data contract was available.

## What I did
Rewrote src/components/ai-project-detail.tsx in full against the audited AiProject contract. Page order now matches the audit:
1. Back link, status pill (`status`), mono eyebrow, h1 (`title`), `lede` standfirst, `role`.
2. "How it works" — numbered bullets from `how`.
3. "My contribution" — `contribution`.
4. "Verified at audit" — `verified`, labelled "What was checked at audit time" so it reads as an audit record, not a live claim.
5. "Limits" — `limits` verbatim, unsoftened.
6. "Architecture" — `architecture` image with alt "System architecture diagram for <project title>" and caption "System architecture diagram"; screenshot grid rendered when `screenshots` has entries.
7. "System links" — `diagram` links open the in-app HTMLEmbedViewer (button + new-tab + close); every other type is an anchor with target=_blank rel=noopener noreferrer. Only `link.label` and `link.type` are visible; URLs are never printed as text.
8. "Demonstrations" — real `<video controls poster=…>` elements built from `demos` URLs (poster derived as `<basename>-poster.jpg`, which matches the two on-disk OrIO posters); no empty slot and no pending-state copy.
9. "Stack" chips from `stack`. Prev/next navigation retained. Near-black panels, mono section labels, single red accent, no new dependency.

Removed: agentContent import and all SOUL.md/SKILL.md hover reveals; "Responsible Agent Seat" and "Procedural Skills & Capabilities" blocks; the skills-library deep-dive with triple-provenance / curator hygiene / Rule 0 shorthand; the "Demo video coming soon" pending state and "Verified Footage" badge; visible raw asset paths; the hover-panel CSS injected via <style>.

## Files changed
- src/components/ai-project-detail.tsx — full rewrite (23,320 -> 12,348 bytes). Only SCOPE path touched.
- .audit-2026-11-28/correction/handoffs/ai-renderer.md — this handoff.
No data/, pages, App.tsx or viewer file was touched.

## VERIFY (quoted output, run from the repo root)
$ grep -in "seatSouls\|skillContent\|SOUL.md\|coming soon\|placeholder\|triple-provenance\|curator hygiene\|Rule 0 gates\|recovery-action disposition\|Step 0 pre-flight\|Responsible Agent Seat\|skillDetails" src/components/ai-project-detail.tsx
(no output; v1_exit=1 — zero matches)

$ grep -n "assets/ai/" src/components/ai-project-detail.tsx
(no output; v2_exit=1 — zero matches; all media paths come from data)

$ grep -n "status" src/components/ai-project-detail.tsx
55:              {project.status}
(the status pill is at lines 52-56; v3_exit=0)

$ npx tsc --noEmit -p tsconfig.app.json
src/components/ui/scroll-velocity.tsx(31,24): error TS6133: 't' is declared but its value is never read.
src/components/ui/scroll-velocity.tsx(31,27): error TS6133: 'delta' is declared but its value is never read.
src/components/ui/scroll-velocity.tsx(41,14): error TS6133: 'move' is declared but its value is never read.
src/pages/CategoryPage.tsx(120,50): error TS18048: 'cat' is possibly 'undefined'.
src/pages/CategoryPage.tsx(122,63): error TS18048: 'cat' is possibly 'undefined'.
tsc_exit=2
Errors in src/components/ai-project-detail.tsx: NONE (the 23 errors previously reported there are gone). The five remaining errors are in other files and outside this SCOPE.

## Still open
- No commit and no push made: the lane brief says "No commits, no push". The rewritten file is left on disk, unstaged; if a commit is wanted, stage by name only: git add -- src/components/ai-project-detail.tsx.
- All 8 audited AI projects currently have empty `screenshots` arrays, so the screenshot grid branch is implemented but not exercised by current data.
- No rendered-site capture was run in this lane: the brief's VERIFY is source-grep + tsc only, and rendered proof belongs to the run's verify lane.
- The 5 out-of-scope tsc errors above remain for their owning lanes (scroll-velocity, CategoryPage).
