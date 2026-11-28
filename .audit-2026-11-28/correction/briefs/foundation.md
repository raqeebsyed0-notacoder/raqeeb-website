# LANE BRIEF — foundation (metadata, canonical, OG, /projects/all, local font)

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## TASK
Give every route its own metadata, give the site a real share card, fix the crashing /projects/all
route, and stop depending on a third-party font host.

## DELIVERABLE
- src/lib/seo.ts (new)
- src/components/route-meta.tsx (new)
- src/App.tsx (route fix + mount RouteMeta)
- index.html (static fallback metadata, remove Google Fonts links)
- src/index.css (font stack)

## SCOPE
Write only those five files. Everything else belongs to other lanes.

## CONTRACT — the data you read (already written by the data lane)
src/data/portfolio.ts exports `categories: Category[]` (each: slug, title, description, lede, note,
seoTitle, seoDescription) and `projects: Project[]` (each: category, slug, title, lede, facts,
seoTitle, seoDescription, thumbnail).
src/data/ai-projects.ts exports `aiProjects: AiProject[]` (each: slug, title, lede, seoTitle,
seoDescription, architecture).
If a field is missing when you start, read the file and use what is there with a sane fallback; do not
edit the data files.

## WHAT TO BUILD
1. `src/lib/seo.ts` — one route→metadata resolver. Input: the router pathname (no hash). Output:
   `{ title, description, image, url }`.
   - '/' '/about' '/process' '/projects' '/resume' → the audited titles and metas from
     .audit-2026-11-28/report/content_main.json (`pages.*.seo`).
   - '/projects/<category>' → the category's seoTitle/seoDescription, image = a real existing asset.
   - '/projects/ai/<slug>' → the AI project's seoTitle/seoDescription, image = its architecture PNG.
   - '/projects/<cat>/<slug>' (design) → the project's seoTitle/seoDescription, image = its thumbnail.
   - unknown → site default. Never the same title for two routes.
2. `src/components/route-meta.tsx` — a component mounted ONCE inside the Router that on every location
   change sets: document.title, meta name=description, meta property=og:title/og:description/og:image/
   og:url/og:type, name=twitter:card/title/description, and link rel=canonical. Create the tags if
   absent, update in place if present (no duplicates). og:image must be an absolute URL
   https://raqeeb-website-mu.vercel.app/<path> pointing at a file that exists in public/.
   Canonical = `https://raqeeb-website-mu.vercel.app/#<pathname>` — the site is a hash-router SPA and
   that is its real address per route; put a one-line code comment saying so.
3. `src/App.tsx` — add `<Route path="/projects/all" element={<Navigate to="/projects" replace />} />`
   ABOVE the `:category` route so the crashing grid route is retired to /projects (do not leave it
   rendering), and mount `<RouteMeta />` once inside `<HashRouter>`.
4. `index.html` — replace the single generic title/description/OG with the AI Implementation Specialist
   positioning (audited home seo title + meta), add og:image (absolute URL of an existing asset),
   og:url, og:type=website, keep twitter tags, keep lang/lang and viewport. Remove the three
   fonts.googleapis/gstatic links.
5. Local type: first look for a real local Inter/Playfair/Questrial woff2/ttf under
   /home/euphoria/euphoria-v2/work/raqeeb-website/public/ and node_modules. If a real binary exists,
   self-host it with @font-face in src/index.css. If none exists, set the body stack to
   `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif`
   and remove the external request, with a comment stating no binary ships in the repo. Never invent
   or download a font binary.

## VERIFY (quote output)
- `grep -c "fonts.googleapis" index.html` → 0.
- `grep -n "projects/all" src/App.tsx` → the redirect route present.
- `node -e` on your own resolver is not required; instead: build is the verify node's job — here run
  `npx tsc --noEmit -p tsconfig.app.json` and report only errors in YOUR five files.
- `grep -c "og:image" index.html` → ≥1, and the referenced file path exists (`ls` it).

## STOP WHEN
Five files written, checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/foundation.md (status line 1) + the DAG handoff path.
