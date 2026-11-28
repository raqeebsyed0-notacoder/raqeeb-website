STATUS: DONE — both page files written, all five verify checks pass, tsc clean for the two in-scope files.

# LANE BRIEF — pages-a (Home + Projects) — repair of the failed main-pages node

## What I did
- Finished/replaced src/pages/HomePage.tsx:
  - Corrected the aiProjects import to `../data/ai-projects` (the data lane's audited bundle; the brief's import contract).
  - Featured card now renders the audited `lede` (was `summary` from the previous lane's loose import bundle).
  - Kept the hero video element and its CloudFront URL exactly as-is (code comment notes the third-party host asset).
  - Kept eyebrow, H1, subhead, intro, primary CTA (#/projects/ai "See the AI work"), secondary CTA (#/process "How I work"), capability block, design-background block, contact CTA.
- Replaced src/pages/ProjectsPage.tsx with the audited WORK page:
  - H1 "WORK" + audited lead ("Seven AI systems and twenty-five design projects. The AI work is the current practice. The design work is the foundation it stands on.").
  - AI systems FIRST: every entry from aiProjects with its real status label; diagram links where links exist; no "Demo coming soon", no "placeholder", no empty decorative slot.
  - Design projects grouped by the four design categories (brand-identity, presentation-design, social-media, websites), each card linking /projects/<category-slug>/<slug>; the previous lane's placeholder carousels/slices were removed.
- Removed out-of-scope content only where it was placeholder (the old carousel, presentation carousel, social/websites .slice(0, N) stubs) — the audited content is generated from src/data.

## Files changed
- src/pages/HomePage.tsx — 2 content fixes (import path, featured card short line); no visual redesign.
- src/pages/ProjectsPage.tsx — full rewrite inside scope.

## VERIFY (quote)
- grep -n "38+" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx → no match (exit 1)
- grep -in "coming soon\|placeholder" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx → no match (exit 1)
- grep -n "I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS" src/pages/HomePage.tsx → line 37, 1 match
- grep -n "data/ai-projects" src/pages/HomePage.tsx src/pages/ProjectsPage.tsx → present in both files
- npx tsc --noEmit -p tsconfig.app.json → errors in my two files: NONE (all remaining errors are pre-existing/out-of-scope: src/data/ai-projects.ts unused statusMap; src/components (ai-project-detail, scroll-velocity); src/pages/CategoryPage)

## Still open
- src/data/ai-projects.ts ships an unused `statusMap` const (data lane, not mine). The shared types.ts contract has no `skills` field, so the AI card drop of the skills chip was intentional to keep the build green.
- The audited lead copy says "Seven AI systems..." while the data bundle ships 8 aiProjects entries; every entry was rendered as the brief requires ("every entry from aiProjects"). Count discrepancy is in the source copy, not the pages.
