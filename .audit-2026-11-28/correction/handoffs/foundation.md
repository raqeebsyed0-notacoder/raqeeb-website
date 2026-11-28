STATUS: DONE
LANE: foundation (per-route metadata, canonical, Open Graph, /projects/all, local font)
Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch portfolio-correction)

## What I did
1. `src/lib/seo.ts` (new): one `resolveRouteMeta(pathname)` resolver. Static routes use the
   audited `seo_title`/`meta` from `.audit-2026-11-28/report/content_main.json` (`pages.*`);
   category, AI-project and design-project routes use their data-lane seoTitle/seoDescription.
   Emits `{ title, description, image, url }`; image and url are absolute on
   `https://raqeeb-website-mu.vercel.app`; unknown paths return the site default. Category images
   and the default OG image are real files in `public/`; AI images are their architecture PNGs,
   design images their thumbnails.
2. `src/components/route-meta.tsx` (new): mounted once inside `HashRouter`; on every location
   change updates document.title, description, og:title/description/image/url/type,
   twitter:card/title/description and link rel=canonical in place (creates tags only when
   absent, so no duplicates). Canonical is `origin/#<pathname>` with the one-line comment
   explaining this is the hash-router SPA's real per-route address.
3. `src/App.tsx`: mounted `<RouteMeta />`, added `/projects/all` → `<Navigate to="/projects"
   replace />` above the `:category` route, so the crashing grid route cannot render.
4. `index.html`: AI Implementation Specialist audited home title/description/OG/Twitter,
   added absolute og:image (existing asset) and og:url, kept og:type=website, lang and viewport,
   removed all three Google Fonts links.
5. `src/index.css`: body stack is
   `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
   with a comment stating no font binary ships in the repo and no external request is made.
   Checked `public/` and `node_modules/`: the only font binaries are three `codicon*.ttf` icon
   fonts in playwright-core, not Inter/Playfair/Questrial, so none was self-hosted and none was
   downloaded or invented.

## Files changed
- `src/lib/seo.ts` (new)
- `src/components/route-meta.tsx` (new)
- `src/App.tsx`, `index.html`, `src/index.css` (edited in place)
- This handoff and the DAG handoff at
  `/home/euphoria/.omh/dag/local-d8e43dc1c989a3b7020598dfd9e891727b73072f41-0c983c66425ed611/raqeeb-correction/foundation.md`.

## VERIFY (quoted output)
- `grep -c "fonts.googleapis" index.html` -> `0`
- `grep -n "projects/all" src/App.tsx` ->
  `21:        <Route path="/projects/all" element={<Navigate to="/projects" replace />} />`
- `npx tsc --noEmit -p tsconfig.app.json` -> exit 2 with 5 errors, all outside my five files:
  `src/components/ui/scroll-velocity.tsx(31,24/31,27/41,14) TS6133` (3) and
  `src/pages/CategoryPage.tsx(120,50/122,63) TS18048` (2). Grep for my five files -> `NONE`.
- `grep -c "og:image" index.html` -> `1`; referenced file
  `ls -l public/assets/brand/euphoria/cover.png` -> exists (91208 bytes).
- One-off resolver check (temp files deleted, nothing committed): 43 named routes checked
  (5 static + 5 categories + 8 AI + 25 design): `unique titles: 43`, `bad image paths: []`,
  `bad canonical urls: []`, `bad shape: []`, unknown route falls back to home default,
  trailing slash normalizes.
- Rendered-site check with a temporary Vite dev server on port 5199 (server stopped, temp files
  removed): home/about/projects/AI-detail/design-detail/resume each showed the correct title,
  description, og:image, og:url and `origin/#<pathname>` canonical; `ogTitleCount:1` and
  `canonicalCount:1` after six navigations (no duplicates); `#/projects/all` resolved to
  `#/projects` with the Work title; `FONT_REQUESTS []`; `PAGE_ERRORS []`.

## Still open
- The 5 `tsc` errors above are in other lanes' files; I did not touch them.
- No commit or push was made, per the brief ("No commits, no push, no npm install"). My five
  paths are left staged/unstaged in the shared working tree for the parent/verify node.
