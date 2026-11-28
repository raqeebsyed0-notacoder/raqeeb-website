# LANE BRIEF — main-pages

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only. Design system stays: near-black, paper,
one accent, existing type and grid. No new dependency, no template swap, no AI gradients.

## TASK
Replace the five main pages with the audited AI-first copy.

## DELIVERABLE
src/pages/HomePage.tsx, AboutPage.tsx, ProcessPage.tsx, ProjectsPage.tsx, ResumePage.tsx

## SCOPE
Write only those five files under /home/euphoria/euphoria-v2/work/raqeeb-website/src/pages/ .
Do not touch src/data/, components/, App.tsx, index.html or CategoryPage/ProjectDetailPage.

## COPY SOURCE (verbatim)
/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_main.json
 — `pages.home|about|process|projects|resume`. Also the audit HTML sections 5 (exact fields:
 eyebrow, H1, subheadline, intro, CTAs, disciplines order, principles, seven steps, capability groups,
 resume sections, seo title + meta).

## REQUIRED PER PAGE
HOME — eyebrow "AI IMPLEMENTATION · AGENT SYSTEMS · AUTOMATION"; H1 "I TURN BUSINESS PROBLEMS INTO
WORKING AI SYSTEMS"; the audited subheadline and intro; primary CTA to #/projects/ai, secondary to
#/process; featured work in this order: LeadJin, OrIO Operations, Agent Fleet, Approval Inbox —
read them from src/data (import { aiProjects }) and link to /projects/ai/<slug> with a status label;
then AI capability presentation, then the design background block, then the contact CTA.
The hero video element: KEEP it exactly as it is (a CloudFront URL) and add a one-line code comment
noting it is a third-party host asset. Do not replace it with an image, do not delete it.
ABOUT — H1 RAQEEB HUSSAIN, role line "AI Implementation Specialist · Design and Visual Communication
foundation", the four-paragraph audited narrative, disciplines in the new 01-05 order, the four principles.
Headings: h1 then h2 for each block (the current page opens at h3 — fix the order).
PROCESS — H1 HOW I WORK, the page lead, the seven steps 01-07 with the audited text, capability groups
(AI SYSTEMS / AUTOMATION / INTEGRATION / DESIGN), CTA line. No claim that background automation is
running: the automations state is paused by decision.
PROJECTS — H1 WORK, page lead, AI systems FIRST with their real status labels and repository links
where the data carries one, then the 25 design projects grouped by their four categories. Remove every
"Demo video coming soon", every "placeholder" string and any decorative empty slot.
RESUME — H1 RAQEEB HUSSAIN, the audited summary, the four sections (AI SYSTEMS BUILT, CORE STRENGTHS,
DESIGN BACKGROUND, SELECTED CLIENTS), the download link kept only if the file exists — it does:
public/Raqeeb_Hussain_Resume.pdf (2 pages) — with the existing href. Do NOT invent employment history,
employers, dates, metrics or qualifications; where the audit says the owner must supply it, omit it.

## VERIFY (quote the output in your handoff)
- `grep -n "38+" <your five files>` → no match.
- `grep -in "coming soon\|placeholder" <your five files>` → no match.
- `grep -n "I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS" src/pages/HomePage.tsx` → 1 match.
- `npx tsc --noEmit -p tsconfig.app.json` → report ONLY errors in your five files. Errors in files you
  do not own are other lanes' in-flight work; ignore them and say so.

## STOP WHEN
Five pages written, the four checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/main-pages.md (status on line 1) + the DAG handoff path.
