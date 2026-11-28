# Changelog — Raqeeb portfolio correction

Branch: `portfolio-correction` · Base: `fb504cb` · Head: `692021a`
Scope: the portfolio website source under `work/raqeeb-website`.
`git diff --stat fb504cb`: 21 files changed, 1,641 insertions(+), 1,399 deletions(-).

## Commits, newest first
- `692021a` — a mistyped project or category address redirects to the work index instead of a near-empty page.
- `a5c1520` — record the commit pointer in the c4 handoff (docs only).
- `f9faf4c` — replace the `SKILL.md` stack chip with `Markdown` on the skills-library page.
- `4df172e` — keep each eyebrow item unbroken on a narrow screen.
- `e77e9ef` — delete the unused `scroll-velocity` component (no importers, dead animation code, 3 type errors).
- `7a4ba33` — state eight AI systems in the work page description.
- `46e9e02` — per-route metadata and Open Graph; retire the crashing `/projects/all` route; audited structure on design and AI pages; drop the dead scroll-velocity component.
- `227515a` — restore the header on home, add a hero legibility scrim, state eight AI systems with the live status counts.
- `3ac6d8f` — nav WORK / AI SYSTEMS / ABOUT / PROCESS / RESUME with active state; about, process and resume on the audited copy.
- `4544b0e` — finish HomePage and replace ProjectsPage with audited copy.
- `e4a93e7` — apply audited design copy to portfolio data and delete the `agentContent` dump.

## Files changed and why
| File | Reason |
|---|---|
| `index.html` | AI-specialist title/description/OG/Twitter; absolute og:image and og:url; Google Fonts links removed. |
| `src/App.tsx` | Mount `RouteMeta`; redirect `/projects/all` to `/projects`. |
| `src/components/Layout.tsx` | Navigation order, active state, desktop category menu, mobile menu. |
| `src/components/ai-project-detail.tsx` | Audited AI renderer (status, lede, how, contribution, verified, limits, architecture, links, demos, stack); agentContent reveals removed. |
| `src/components/route-meta.tsx` (new) | Per-route metadata updater inside the router. |
| `src/components/ui/scroll-velocity.tsx` (deleted) | Unused; no importers; three TypeScript errors. |
| `src/data/agentContent.ts` (deleted) | Agent SOUL/SKILL dump no longer rendered. |
| `src/data/ai-projects.ts` | Eight audited AI projects; obsolete summary fields and dead `statusMap` removed. |
| `src/data/portfolio.ts` | Eyebrow/lede/facts/look/seoTitle/seoDescription for 25 design projects and 5 categories; local interfaces replaced by type imports; legacy AI array re-exported. |
| `src/data/types.ts` | Obsolete `summary` field removed from the AI project contract. |
| `src/index.css` | Local system font stack; no external font request. |
| `src/lib/seo.ts` (new) | Single per-route metadata resolver against the production origin. |
| `src/pages/HomePage.tsx` | Import path and featured-card lede corrected; hero video retained. |
| `src/pages/ProjectsPage.tsx` | Work page rewritten: AI systems first with real status, design grouped by category. |
| `src/pages/AboutPage.tsx` | Audited role line, narrative, disciplines, principles; unproven claims removed. |
| `src/pages/ProcessPage.tsx` | Audited seven-step process and capability groups. |
| `src/pages/ResumePage.tsx` | Audited summary and PDF-verified experience; corrected phone. |
| `src/pages/CategoryPage.tsx` | lede/note rendering; `all` branches removed; missing-category guard. |
| `src/pages/ProjectDetailPage.tsx` | Eyebrow, lede, delivered-facts and what-to-look-at blocks. |

## Corrected count
The audited copy said seven AI systems; the live bundle has eight. Copy corrected to eight in `7a4ba33`.

## Post-report fix (verify gate)
- `f9faf4c` — `src/data/ai-projects.ts`: the skills-library stack chip read the internal file name `SKILL.md`;
  replaced with `Markdown` (and `YAML Frontmatter` dropped). Found by the independent verify node as the one
  unmet criterion, fixed on its own repair lane, and re-verified.
- `a5c1520` — handoff pointer note only, no product change.

Branch head is now `a5c1520`. Total commits above base `fb504cb`: ten.

## Not changed (open)
- Canonicals remain `#/` hash URLs (hash-router SPA limitation).
- Home hero video remains a third-party CloudFront asset.
- `public/Raqeeb_Hussain_Resume.pdf` remains the design-era binary.
- Five category pages still have no h2.

EUPHORIA EXPERIENCES · deepseek/deepseek-v4.1-flash-1017 · nous · November 2026
