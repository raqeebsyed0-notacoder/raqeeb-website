# BASELINE — Raqeeb portfolio pre-change state (dag:raqeeb-correction/baseline)

Status: DONE. Recorded before any correction was applied. Do not fix anything here; this is the before-state.

Capture: 2026-11-28T04:58:36.762Z (UTC), `npx vite preview --port 4173 --strictPort` serving the built `dist`, driven by Playwright chromium headless at 1440x900. The served `dist/index.html` was produced at 2026-11-28 07:55:58 +0300 from the clean `fb504cb` tracked tree. Parallel lanes modified `src/components/Layout.tsx` and `src/pages/HomePage.tsx` at 07:57:30/07:57:32 +0300 during the capture window but did not rebuild, so the rendered pages below are the genuine pre-change build. The DAG write scope excluded a capture-script file, so the capture ran inline via `node --input-type=module` from stdin; it only wrote the in-scope `baseline-routes.json` and `baseline-shots/`.

## 1. Git state
- `git -C /home/euphoria/euphoria-v2/work/raqeeb-website rev-parse HEAD` -> `fb504cb233d20133bcc82b2118fbc4904660fe19` (brief base `fb504cb` matches).
- `git branch --show-current` -> `portfolio-correction`.
- `git status --short --untracked-files=no` -> empty (tracked tree clean at capture start). Tracked edits by other lanes appeared after the build, as noted above.

## 2. Build, lint and TypeScript (pre-existing failures)
- `npm run build` exit code **0**. Tail:
```
rendering chunks...
computing gzip size...
dist/index.html                   1.58 kB │ gzip:   0.64 kB
dist/assets/index-CWiT9ct0.css   52.04 kB │ gzip:   9.37 kB
dist/assets/index-CX-kxoL8.js   579.23 kB │ gzip: 186.16 kB

[plugin builtin:vite-reporter] 
(!) Some chunks are larger than 500 kB after minification. Consider:
- Using dynamic import() to code-split the application
- Use build.rolldownOptions.output.codeSplitting to improve chunking: https://rolldown.rs/reference/OutputOptions.codeSplitting
- Adjust chunk size limit for this warning via build.chunkSizeWarningLimit.
✓ built in 2.24s
```
- `npm run lint` exit code **0**, **0 errors**, 10 warnings (all `eslint(no-unused-vars)`, in `.audit-2026-11-25/`, `.dag-verify/`, `.audit-2026-11-28/capture.mjs` and `src/components/ui/scroll-velocity.tsx`). Warning lines:
```
.audit-2026-11-25/live-deploy-gate.mjs:18:13: warning eslint(no-unused-vars): Variable 'name' is declared but never used. Unused variables should start with a '_'. help: Consider removing this declaration.
.audit-2026-11-25/live-deploy-gate.mjs:21:23: warning eslint(no-unused-vars): Parameter 'e' is declared but never used. Unused parameters should start with a '_'. help: Consider removing this parameter.
.audit-2026-11-25/live-deploy-gate.mjs:38:11: warning eslint(no-unused-vars): Catch parameter 'e' is caught but never used. help: Consider handling this error.
.dag-verify/verify-live.mjs:34:7: warning eslint(no-unused-vars): Variable 'skills' is declared but never used. Unused variables should start with a '_'. help: Consider removing this declaration.
.dag-verify/live-broken3.mjs:8:141: warning eslint(no-unused-vars): Parameter 'e' is declared but never used. Unused parameters should start with a '_'. help: Consider removing this parameter.
.audit-2026-11-25/capture.mjs:12:7: warning eslint(no-unused-vars): Variable 'categorySlugs' is declared but never used. Unused variables should start with a '_'. help: Consider removing this declaration.
.audit-2026-11-28/capture.mjs:29:7: warning eslint(no-unused-vars): Variable 'meta' is declared but never used. Unused variables should start with a '_'. help: Consider removing this declaration.
src/components/ui/scroll-velocity.tsx:31:24: warning eslint(no-unused-vars): Parameter 't' is declared but never used. Unused parameters should start with a '_'. help: Consider removing this parameter.
src/components/ui/scroll-velocity.tsx:31:27: warning eslint(no-unused-vars): Parameter 'delta' is declared but never used. Unused parameters should start with a '_'. help: Consider removing this parameter.
src/components/ui/scroll-velocity.tsx:41:14: warning eslint(no-unused-vars): Function 'move' is declared but never used. help: Consider removing this declaration.
```
- `npx tsc --noEmit -p tsconfig.app.json` exit code **2**, **6 errors** (the known pre-existing set):
```
src/components/ai-project-detail.tsx(256,16): error TS18048: 'project.skillDetails' is possibly 'undefined'.
src/components/ui/scroll-velocity.tsx(31,24): error TS6133: 't' is declared but its value is never read.
src/components/ui/scroll-velocity.tsx(31,27): error TS6133: 'delta' is declared but its value is never read.
src/components/ui/scroll-velocity.tsx(41,14): error TS6133: 'move' is declared but its value is never read.
src/pages/CategoryPage.tsx(120,50): error TS18048: 'cat' is possibly 'undefined'.
src/pages/CategoryPage.tsx(122,63): error TS18048: 'cat' is possibly 'undefined'.
```

## 3. Route list (rebuilt from source — audited baseline.json was incomplete)
`.audit-2026-11-28/baseline.json` carries **36** routes, not 43: it was generated by `capture.mjs` using a regex that only matched the 25 design projects (AI projects have no `category:` field), so all 8 AI detail routes are missing. **Per brief step 3 the list was rebuilt from `src/App.tsx` route patterns plus `src/data/portfolio.ts` slugs.** Composition: 5 main + 5 category grids + 25 design details + 8 AI details = **43**. The audit's own `lanes/tech.md` independently records "43 distinct hash links", and `correction/briefs/qa.md` specifies this same composition. `#/projects/all` is an orphan alias with no internal links (tech.md finding 6/8) and is captured separately as the crash case in item 5, not counted among the 43.

## 4. Per-route measurements (all 43)
Collected for every route from the served page: `document.title`, `meta[name=description]`, `meta[property="og:image"]`, `link[rel=canonical]`, h1 text, h1 count, h2 count, page errors, console errors. Full raw data: `baseline-routes.json`. Headline findings:
- **All 43 routes share one `document.title`:** `Raqeeb Hussain - Graphic & Visual Designer` -> **1 distinct title**.
- **All 43 routes share one meta description:** `Raqeeb Hussain is a graphic and visual designer based in Dammam, Saudi Arabia. Specializing in brand identity, presentation design, social media creative, and digital experiences.`
- **`og:image` is null on all 43; `canonical` is null on all 43.**
- h1 count is exactly 1 on all 43; h2 counts: 32 routes with 0, 1 with 1, 1 with 2, 1 with 5, 7 with 6, 1 with 7.
- **0 page errors and 0 console errors on all 43 routes; 43/43 rendered OK.**

| # | hash | h1 text | h1# | h2# | page errs | console errs |
|---:|---|---|---:|---:|---:|---:|
| 1 | `#/` | I CREATEVISUAL SYSTEMSFOR BRANDS & DIGITALEXPERIENCES | 1 | 0 | 0 | 0 |
| 2 | `#/about` | RaqeebHussain | 1 | 2 | 0 | 0 |
| 3 | `#/process` | How IWork | 1 | 1 | 0 | 0 |
| 4 | `#/projects` | SelectedWork | 1 | 5 | 0 | 0 |
| 5 | `#/resume` | Raqeeb Hussain | 1 | 0 | 0 | 0 |
| 6 | `#/projects/brand-identity` | Brand Identity | 1 | 0 | 0 | 0 |
| 7 | `#/projects/presentation-design` | Presentation Design | 1 | 0 | 0 | 0 |
| 8 | `#/projects/social-media` | Social Media | 1 | 0 | 0 | 0 |
| 9 | `#/projects/websites` | Websites | 1 | 0 | 0 | 0 |
| 10 | `#/projects/ai` | AI & Automation | 1 | 0 | 0 | 0 |
| 11 | `#/projects/brand-identity/buyology` | Buyology | 1 | 0 | 0 | 0 |
| 12 | `#/projects/brand-identity/euphoria-experiences-brand` | Euphoria Experiences | 1 | 0 | 0 | 0 |
| 13 | `#/projects/presentation-design/blaize` | Blaize Technical Proposal | 1 | 0 | 0 | 0 |
| 14 | `#/projects/presentation-design/chashmawala` | Dr. Chashmawala Proposal | 1 | 0 | 0 | 0 |
| 15 | `#/projects/presentation-design/flowserve` | Flowserve Event Presentation | 1 | 0 | 0 | 0 |
| 16 | `#/projects/presentation-design/jalal` | Jalal Event Presentation | 1 | 0 | 0 | 0 |
| 17 | `#/projects/presentation-design/shafa-al-shams` | Shafa Al Shams | 1 | 0 | 0 | 0 |
| 18 | `#/projects/presentation-design/stage-nine` | Stage Nine | 1 | 0 | 0 | 0 |
| 19 | `#/projects/presentation-design/trillium` | Trillium Event Proposal | 1 | 0 | 0 | 0 |
| 20 | `#/projects/presentation-design/white-graphics-brochure` | White Graphics Brochure | 1 | 0 | 0 | 0 |
| 21 | `#/projects/social-media/arata` | Arata Campaign | 1 | 0 | 0 | 0 |
| 22 | `#/projects/social-media/dot-and-key` | Dot & Key Campaign | 1 | 0 | 0 | 0 |
| 23 | `#/projects/social-media/euphoria-campaign` | Euphoria Campaign | 1 | 0 | 0 | 0 |
| 24 | `#/projects/social-media/learnbay` | Learnbay Campaign | 1 | 0 | 0 | 0 |
| 25 | `#/projects/social-media/new-herbs` | New Herbs Campaign | 1 | 0 | 0 | 0 |
| 26 | `#/projects/social-media/nirmalaya` | Nirmalaya Campaign | 1 | 0 | 0 | 0 |
| 27 | `#/projects/social-media/organic-b` | Organic B Campaign | 1 | 0 | 0 | 0 |
| 28 | `#/projects/social-media/rustic-art` | Rustic Art Campaign | 1 | 0 | 0 | 0 |
| 29 | `#/projects/social-media/satthwa` | Satthwa Campaign | 1 | 0 | 0 | 0 |
| 30 | `#/projects/social-media/ustraa` | Ustraa Campaign | 1 | 0 | 0 | 0 |
| 31 | `#/projects/social-media/editorial-posters` | Editorial Posters | 1 | 0 | 0 | 0 |
| 32 | `#/projects/websites/euphoria-website` | Euphoria Experiences Website | 1 | 0 | 0 | 0 |
| 33 | `#/projects/websites/grc` | GRC Website Evolution | 1 | 0 | 0 | 0 |
| 34 | `#/projects/websites/marsa-atelier` | Marsa Atelier | 1 | 0 | 0 | 0 |
| 35 | `#/projects/websites/najd-sands` | Najd Sands | 1 | 0 | 0 | 0 |
| 36 | `#/projects/ai/agent-fleet` | Agent Fleet | 1 | 6 | 0 | 0 |
| 37 | `#/projects/ai/skills-library` | Skills Library | 1 | 7 | 0 | 0 |
| 38 | `#/projects/ai/orio-operations` | OrIO Operations | 1 | 6 | 0 | 0 |
| 39 | `#/projects/ai/leadjin-portal` | LeadJin | 1 | 6 | 0 | 0 |
| 40 | `#/projects/ai/approval-inbox` | Approval Inbox | 1 | 6 | 0 | 0 |
| 41 | `#/projects/ai/paperclip-plugin` | Paperclip Plugin | 1 | 6 | 0 | 0 |
| 42 | `#/projects/ai/hermes-engine` | Hermes Runtime Integration | 1 | 6 | 0 | 0 |
| 43 | `#/projects/ai/automations` | Automations | 1 | 6 | 0 | 0 |

## 5. Confirmed `/projects/all` failure
Exact page error text: `TypeError: Cannot read properties of undefined (reading 'description')`.
Rendered h1: **none** (h1 count 0), body text length 0, final URL stays `http://127.0.0.1:4173/#/projects/all` (no redirect). This matches the audit finding in `lanes/tech.md`: `pages/grid-all.json` recorded the same `TypeError`, an empty body, and `links: []` (orphan route).

## 6. Alt-text and distinct-title counts
- Images with **no `alt` attribute: 0** across all 43 routes (also 0 with an empty `alt` attribute; total images measured per route in `baseline-routes.json`).
- Distinct `document.title` values across the 43 routes: **1** — `Raqeeb Hussain - Graphic & Visual Designer`.

## 7. Baseline screenshots (1440x900)
All six written to `baseline-shots/`, each verified 1440x900 PNG (8-bit):
- `home.png` — `/`
- `about.png` — `/about`
- `projects.png` — `/projects`
- `projects-ai.png` — `/projects/ai`
- `orio-operations.png` — `/projects/ai/orio-operations`
- `buyology.png` — `/projects/brand-identity/buyology`

Visual check by eye: `home.png` renders the dark portfolio first screen with headline "I CREATE VISUAL SYSTEMS FOR BRANDS & DIGITAL EXPERIENCES"; `orio-operations.png` renders the AI detail page with headline "ORIO OPERATIONS" and populated architecture/stack sections — neither is blank or an error page.

## VERDICT
Baseline recorded: 43/43 routes render the pre-change build with zero page/console errors, one shared title+description, no `og:image` or canonical tag, and no images missing alt; `/projects/all` crashes with the `description` TypeError and renders nothing; build and lint pass while tsc reports 6 known pre-existing errors.
