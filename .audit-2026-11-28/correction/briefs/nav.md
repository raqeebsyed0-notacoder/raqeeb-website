# LANE BRIEF — nav

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## TASK
Rebuild the header navigation so AI leads and design work stays reachable.

## DELIVERABLE
src/components/Layout.tsx

## SCOPE
Write only /home/euphoria/euphoria-v2/work/raqeeb-website/src/components/Layout.tsx .
Do not touch pages, data, App.tsx or index.html.

## WHAT TO BUILD
- Primary nav, in this order: WORK (/projects) · AI SYSTEMS (/projects/ai) · ABOUT (/about) ·
  PROCESS (/process) · RESUME (/resume).
- Keep the wordmark link to "/" and the footer exactly as it is.
- Keep the design work discoverable: the existing category menu (the five category links built from
  the `categories` array) stays, reachable from WORK on desktop and inside the mobile menu. Do not
  delete design categories from the site.
- Active state: the current route's nav item is marked `aria-current="page"` and must not render as a
  link to the page you are already on (the audit found four self-referencing nav links). Use
  `useLocation`; `/projects/ai` must mark AI SYSTEMS active, `/projects/<design-cat>` and
  `/projects/<cat>/<slug>` must mark WORK active.
- Mobile: the menu button opens and closes, the menu closes on navigate, every item is reachable, and
  the existing focus-visible ring is preserved. Do not change the visual language.

## VERIFY (quote output)
- `grep -n "aria-current" src/components/Layout.tsx` → present.
- `grep -n "to=\"/projects/ai\"\|to=\"/about\"\|to=\"/process\"\|to=\"/resume\"\|to=\"/projects\"" src/components/Layout.tsx`
  → all five entries present.
- `npx tsc --noEmit -p tsconfig.app.json` → report only errors in Layout.tsx (other lanes are editing
  other files in parallel; ignore theirs).

## STOP WHEN
Layout.tsx written, checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/nav.md (status line 1) + the DAG handoff path.
