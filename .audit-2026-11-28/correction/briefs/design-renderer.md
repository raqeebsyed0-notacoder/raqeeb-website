# LANE BRIEF — design-renderer

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only. Keep the visual language: near-black, paper,
one accent, existing type and grid. No new dependency.

## TASK
Make the design project page and the category pages render the audited structure instead of one
sentence and an empty gallery.

## DELIVERABLE
src/pages/ProjectDetailPage.tsx, src/pages/CategoryPage.tsx

## SCOPE
Write only those two files under /home/euphoria/euphoria-v2/work/raqeeb-website/src/pages/ .
Do not touch src/data/, Layout.tsx, App.tsx, or the five main pages.

## DATA CONTRACT (already written by the data lane — read it, do not edit it)
Project now carries: `eyebrow` ("BRAND IDENTITY · 2025 · 13-PAGE DOCUMENT"), `lede`, `facts`
(evidence line), `look` (what to look at), plus `seoTitle`, `seoDescription`.
Category now carries: `lede`, `note`.
AiProject now carries `role` (short subtitle) instead of the old description fields.

## WHAT TO BUILD
ProjectDetailPage.tsx (design projects only — the `category === 'ai'` branch stays as it is):
1. eyelabel `project.eyebrow` (mono, uppercase, muted) → h1 `project.title` → `project.lede` as the
   standfirst (larger than body, max-w-2xl) → the existing live-site block → the media viewer
   (keep PDFDeckViewer for pdf decks and the masonry grid for images).
2. After the media: a "What was delivered" block rendering `project.facts`, then a "What to look at"
   block rendering `project.look`, each with an h2 label (h2, not h3 — heading order matters).
3. Keep prev/next navigation and the back link. Keep alt text on every image; improve it to
   `${project.title} page ${i+1}` only if it is currently weaker.
CategoryPage.tsx:
1. Render `cat.lede` as the page standfirst and `cat.note` as a small line under the gallery.
   Keep the h1 = cat.title. Never read `cat.description` unguarded — `cat` can be undefined.
2. Remove the `category === 'all'` branches entirely: App.tsx now redirects /projects/all to
   /projects, and an unknown category must render the existing "Category not found" block.
3. The AI carousel subtitle uses `p.role`; keep that. Do not print any `assets/...` path as text.

## VERIFY (quote output)
- `grep -n "eyebrow\|facts\|look" src/pages/ProjectDetailPage.tsx` → all three rendered.
- `grep -c "'all'" src/pages/CategoryPage.tsx` → 0.
- `npx tsc --noEmit -p tsconfig.app.json` → report only errors in your two files.

## STOP WHEN
Both files written, checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/design-renderer.md (status line 1) + the DAG handoff path.
