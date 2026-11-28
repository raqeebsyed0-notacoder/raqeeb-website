STATUS: DONE
LANE: design-renderer (raqeeb-correction)
Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch portfolio-correction)
SCOPE: src/pages/ProjectDetailPage.tsx, src/pages/CategoryPage.tsx

## What I did
1. Rewrote src/pages/ProjectDetailPage.tsx:
   - Added eyebrow eyelabel (`project.eyebrow`, mono, uppercase, muted) above the h1
   - Replaced `project.description` with `project.lede` as the standfirst (text-lg, max-w-2xl)
   - Added "What was delivered" block: h2 label + `project.facts`
   - Added "What to look at" block: h2 label + `project.look`
   - Improved masonry image alt text from `${project.title} ${i + 1}` to `${project.title} page ${i + 1}`
2. Rewrote src/pages/CategoryPage.tsx:
   - Removed `category === 'all'` branches from slides selection (fallback: `[]`)
   - Removed `category === 'all'` branch from label expression
   - Replaced `cat.description` with `cat.lede` as the page standfirst (text-lg, max-w-2xl)
   - Added `cat.note` as a small line (text-sm, text-white/50) under the gallery
   - Guarded cat read: `if (!cat)` renders the existing "Category not found" block
   - Removed unused `allSlides` constant
   - Kept AI carousel subtitle using `p.role`

## Files changed
- `src/pages/ProjectDetailPage.tsx` — new structure: eyebrow eyelabel, h1, lede standfirst, live-site block, media viewer, "What was delivered" block, "What to look at" block, prev/next nav
- `src/pages/CategoryPage.tsx` — corrected data rendering: cat.lede standfirst, cat.note under gallery, 'all' branches removed, guarded cat read

## VERIFY
1. `grep -n "eyebrow\|facts\|look" src/pages/ProjectDetailPage.tsx` → all three rendered:
   - line 53: `{project.eyebrow}`
   - line 132: `{project.facts}`
   - line 138: "What to look at"
   - line 141: `{project.look}`
2. `grep -c "'all'" src/pages/CategoryPage.tsx` → 0
3. `npx tsc --noEmit -p tsconfig.app.json` → **0 errors in `src/pages/*`**. Remaining 3 errors are outside my SCOPE in `src/components/ui/scroll-velocity.tsx` (TS6133: unused locals).

## Still open (outside my SCOPE)
- The component lane must update `src/components/ui/scroll-velocity.tsx` (3 TS6133 errors: 't', 'delta', 'move') before the full build is clean. I did not touch it.
