# Tech Audit — Raqeeb Hussain portfolio live site
**Source audit date:** 2026-11-28 · **Live site:** https://raqeeb-website-mu.vercel.app/#/
**Captures read:** `.audit-2026-11-28/pages/*.json` (44 route captures) · **Baseline:** `baseline.json` · **Source:** `src/`, `index.html` · **Commands:** `npm run build`, `npm run lint`, `curl` status checks.
**Rule applied:** no site file was edited (read-only audit).

---

## 1. Page titles — 1 distinct title across all 44 routes
- Total routes captured: **44** (5 main + 5 categories + `/projects/all` + 25 detail pages + 8 AI detail pages).
- Distinct `<title>` values: **1** — `Raqeeb Hussain - Graphic & Visual Designer`
  - File read: every `pages/*.json` `title` field. Derived count from JSON.
  - Shared by all 44 routes (e.g. `home`, `detail-buyology`, `grid-all`, `detail-agent-fleet`).

## 2. Meta descriptions — 1 distinct description, shared by all 44 routes
- Distinct non-null `description` values: **1**.
- Content (179 chars): `Raqeeb Hussain is a graphic and visual designer based in Dammam, Saudi Arabia. Specializing in brand identity, presentation design, social media creative, and digital experiences.`
- Routes sharing it: **all 44** (home, about, process, projects, resume, all 5 category grids, grid-all, all 25 detail pages, all 8 AI detail pages).
- File read: every `pages/*.json` `description` field.

## 3. Canonical & Open Graph coverage per route
- `canonical` : **null on all 44 routes (0/44 have a canonical tag)** — no route self-lists itself.
- `og:image` : **null on all 44 routes (0/44)** — no open-graph image is set on any route.
- `og:title` / `og:description` : set on **35/44** routes; **null on 9/44** — every `.live`-captured AI detail page (detail-agent-fleet, detail-approval-inbox, detail-automations, detail-hermes-engine, detail-skills-library, detail-leadjin-portal, detail-orio-operations, detail-paperclip-plugin) **and** `/projects/all`.
  - File read: `pages/*.json` `canonical`, `ogTitle`, `ogDescription`, `ogImage`.
  - Note: the 9 routes missing OG show a sparse capture schema (no `description`/`ogTitle`/`canonical` keys) — their live captures recorded no SEO block; all other routes carry the same 179-char description plus an ogTitle matching the `<title>`.

## 4. Heading hierarchy — one `<h1>` per route, but two routes violate heading *order*
- `h1` count per route from JSON: **every route has exactly 1 `h1`, except `grid-all` which has 0**. No route has multiple `h1` elements.
- Capture-level empty `h2` arrays: **33/44**; empty `h3` arrays: **27/44** (these arrays hold captured heading text; many headings are styled spans/divs in source, so JSON `h2`/`h3` emptiness does not equal "no headings").
- `grid-all` → zero `h1` (see finding 6).
- File read: `pages/*.json` `h1`/`h2`/`h3` arrays; source: `src/pages/*.tsx`, `src/components/ai-project-detail.tsx`, `src/components/ui/carousel-squeeze.tsx`.
- **Source-level heading-order defects (semantic DOM):**
  - `src/pages/ProcessPage.tsx` — `<h2>` "Capabilities" (line 82) renders AFTER `<h3>` step titles (line 70) and `<h3>` capability categories (line 88). Order: h1 → h3 → h2 → h3. Heading jump (h1→h3 then back to h2).
  - `src/pages/AboutPage.tsx` — `<h3>` disciplines (line 116) renders before `<h2>` "Clients & Collaborations" (line 156) and `<h2>` "Design Principles" (line 172). Order: h1 → h3 → h2 → h2 → h3.
  - `src/pages/CategoryPage.tsx` — two `<h1>` candidate elements (line 50 "Category not found" and line 119 "All Projects"/category title) are mutually exclusive (one renders per branch) — no duplicate-h1 defect in practice.
  - Most visual "headings" are non-semantic styled spans/divs (`font-pixel`, `text-4xl` classes) rather than `<h1>–<h6>`, so screen-reader heading navigation is partially unavailable (see finding 10).

## 5. Images — 89 total, 0 missing alt, 0 broken
- Totals across 44 routes: `imgCount` **89** · `imgsNoAlt` **0** · `brokenImgs` **0**.
- Per-route distribution: 12 routes with 0 images; 16 routes with 1; 2 routes with 2; 8 routes with 3; 4 routes with 4; 1 route with 5 (`detail-grc`); 1 route with **24** (`projects` — the category grid).
- `imgsNoAlt` is 0 on every route, so no route currently lacks alt text (the detail pages use `alt={`${project.title} page ${i+1}`}`, detail cover images use meaningful alt, and `projects` uses empty alt only on decorative index thumbs `alt=""`).
- File read: `pages/*.json` `imgCount`/`imgsNoAlt`/`brokenImgs` per route.

## 6. `/projects/all` (`grid-all`) — exact error and what renders
- Error captured in `pages/grid-all.json` (also `grid-all.live.json`, `grid-all.local.json`): `TypeError: Cannot read properties of undefined (reading 'description')`.
- What renders: completely empty — `h1: []`, `textLen: 0`, `text: ""`, no `h2`/`h3`, no links, no placeholders. The route's own capture threw while reading a `description` that is undefined, so the page body never populated.
- Orphan route: `links: []` in its capture — no internal page links to `#/projects/all` anywhere in the site (category grids link to their own slug, never to `all`), so the route is unreachable from the nav (see finding 8).
- File read: `pages/grid-all.json`, `pages/grid-all.live.json`, `pages/grid-all.local.json`.

## 7. External asset dependencies (fonts, video host) and failure mode
- **Video host:** `https://d8j0ntlcm91z4.cloudfront.net/...` (Amazon CloudFront). Served on `home` as the hero `<video>` source (`src/pages/HomePage.tsx`). The live capture recorded **`2 × net::ERR_ABORTED`** for that video URL in each route's `failed` list — the dominant external asset on the homepage aborts rather than playing cleanly.
- **Fonts:** Google Fonts "Inter" (`fonts.googleapis.com` + `fonts.gstatic.com` preconnected, `index.html` links) with `font-family: 'Questrial', 'ui-monospace', monospace` as the pixel-font fallback.
- File read: `pages/home.json` `videos`/`failed`; `index.html`; `src/index.css` (`--font-pixel`), `src/pages/HomePage.tsx` video `<source>`.

## 8. Link inventory
- **Internal route links:** **43 distinct hash links** (e.g. `#/about`, `#/process`, `#/projects`, `#/resume`, `#/projects/:category`, `#/projects/:category/:slug`, 8 AI routes `#/projects/ai/*`).
- **External links:** **6** (all verified `HTTP 200` via `curl -s -o /dev/null -w "%{http_code}" -L --max-time 25`):
  - detail-grc ×3 → `https://euphoria-vision.com/static/preview/grc-v{1,2,3}/index.html`
  - detail-euphoria-website → `https://euphoriaexperiences.com/`
  - detail-marsa-atelier → `https://euphoria-vision.com/static/preview/marsa-atelier-2026-06-04/index.html`
  - detail-najd-sands → `https://euphoria-vision.com/static/preview/najd-sands-2026-06-04/index.html`
- **Self-loop links:** **4** — the About/Process/Projects/Resume pages each carry a nav link pointing to its own route (`#/about`, `#/process`, `#/projects`, `#/resume`). Not 404s; minor redundancy.
- **No external `404`s** on the 6 checked URLs.
- **Mailto:** 35 routes carry `mailto:raqeebsyed0@gmail.com` (all except the 9 .live-captured AI routes + `grid-all`).
- **Orphan route:** `#/projects/all` has zero inbound internal links.
- File read: `pages/*.json` `links` per route; `src/data/portfolio.ts` `liveUrl`/`liveUrls`; curl status output above.

## 9. Navigation & CTA inventory
- **Header (Navbar, `src/components/Layout.tsx`):** logo "RAQEEB HUSSAIN" → `/#/`; 4 nav links **ABOUT / PROCESS / PROJECTS / RESUME** (hash paths) + a mobile fullscreen dialog menu (role="dialog", aria-modal, Escape-to-close, focus returns to toggle). The PROJECTS link has a hover dropdown listing the 5 categories.
- **Footer (`src/components/Layout.tsx`):** two footer strips on every page — "Available for freelance, contract and full-time opportunities." + mailto "Let's talk"; and a services strip "Brand Identity · Presentations · Social Media · Websites · AI & Automation".
- **Hero (HomePage):** no button CTA — only the "I CREATE VISUAL SYSTEMS FOR BRANDS & DIGITAL EXPERIENCES" h1 and a "Let's talk" mailto in the footer strip.
- **ProjectDetail:** "Live front page. Click to open the full site" card + "Visit live site" links (external) — no in-site CTA beyond back links.
- **Process/Resume/About:** "Let's talk" mailto CTA; Resume adds "Download Full Resume (PDF)"; About adds "View Resume" / "Get in Touch".
- File read: `src/components/Layout.tsx`, `src/pages/HomePage.tsx`, `src/pages/ProcessPage.tsx`, `src/pages/ResumePage.tsx`, `src/pages/AboutPage.tsx`, `src/pages/ProjectDetailPage.tsx`.

## 10. Accessibility — lang present; several defects visible in the DOM
- `lang` attribute: `index.html` declares `<html lang="en">` (present). No dynamic language switching; English-only.
- `aria` present where expected: mobile-menu button `aria-label` ("Open/Close menu"), `aria-expanded`/`aria-controls`; mobile dialog `role="dialog"` + `aria-modal="true"`; carousel `role="region"` + `aria-label` + `aria-label` on prev/next svg buttons + `sr-only` status live region (`src/components/ui/carousel-squeeze.tsx`).
- Focus-order hints present: mobile menu returns focus to the trigger on close; scrollable presentations region is `tabIndex={0}`, `role="region"` with `aria-label` and arrow-key handling (`src/pages/ProjectsPage.tsx`).
- **Defects:**
  1. Non-semantic headings: major "headings" are styled spans/divs (e.g. HomePage "GRAPHIC &" / "VISUAL DESIGN" / "VISUAL SYSTEMS" spans, `font-pixel`), so heading navigation is incomplete.
  2. Heading order violations on ProcessPage (h3 before h2) and AboutPage (h3 before h2) — finding 4.
  3. Hero hero video has `autoPlay muted loop` with no `<track>` captions and no reduced-motion fallback.
  4. 4 self-loop nav links (finding 8).
  5. Icon-only close button in the mobile menu (only aria-label, no visible text) — acceptable but worth noting.
- File read: `index.html`, `src/components/Layout.tsx`, `src/pages/*.tsx`, `src/components/ui/carousel-squeeze.tsx`.

## 11. Build facts (quote of results)
- `cd /home/euphoria/euphoria-v2/work/raqeeb-website && npm run build 2>&1 | tail -5`
  ```
  vite v8.3.0 building client environment for production...
  ✓ 1891 modules transformed.
  rendering chunks...
  (!) Some chunks are larger than 500 kB after minification. Consider:
  - Using dynamic import() to code-split the application
  ✓ built in 1.09s
  ```
  (exit 0; `dist/index.html` 1.58 kB, `dist/assets/index-CWiT9ct0.css` 52.04 kB, `dist/assets/index-Yj9FpTjx.js` 578.78 kB.)
- `cd /home/euphoria/euphoria-v2/work/raqeeb-website && npm run lint 2>&1 | tail -5`
  ```
  > raqeeb-website@0.0.0 lint
  > oxlint
  [9 warnings] eslint(no-unused-vars): unused vars in .dag-verify/, .audit-2026-11-25/, .audit-2026-11-28/, src/components/ui/ (e.g. `e` parameter, `skills`, `name`, `categorySlugs`, `meta`, `t`, `delta`); no errors, exit 0
  ```
  (exit 0, 0 errors, 9 warnings.)

---

STATUS: DONE
Audit deliverables written to `/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/lanes/tech.md`.
