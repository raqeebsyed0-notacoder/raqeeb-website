# LANE BRIEF — pages-b (About, Process, Resume) — repair of the failed main-pages node

Repo: /home/euphoria/euphoria-v2/work/raqeeb-website (branch `portfolio-correction`)
No commits, no push, no npm install. Absolute paths only.

## WHY THIS LANE EXISTS
The previous lane died in a repetition loop before touching these three files. You own exactly them.

## TASK
Replace AboutPage.tsx, ProcessPage.tsx and ResumePage.tsx with the audited copy.

## DELIVERABLE
src/pages/AboutPage.tsx, src/pages/ProcessPage.tsx, src/pages/ResumePage.tsx

## SCOPE
Write only those three files plus your handoff. Do not touch HomePage, ProjectsPage, CategoryPage,
ProjectDetailPage, Layout, App, index.html or src/data/.

## HOW TO WRITE (the previous lane died here — read this)
- `read_file` each file FIRST with limit 2000 (a paginated read makes write_file refuse). Then
  `write_file` the complete new content, one file at a time.
- Never write source files from a terminal/python heredoc. Never loop.

## COPY SOURCE (verbatim)
/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/report/content_main.json
 — `pages.about`, `pages.process`, `pages.resume`.

## ABOUT
- H1 "RAQEEB HUSSAIN", role line "AI Implementation Specialist · Design and Visual Communication foundation".
- The four-paragraph audited narrative, word for word.
- Disciplines in the NEW order: 01 AI IMPLEMENTATION, 02 BUSINESS PROBLEM SOLVING, 03 BRAND IDENTITY
  SYSTEMS, 04 PRESENTATION AND COMMUNICATION DESIGN, 05 DIGITAL AND CAMPAIGN DESIGN.
- The four audited principles (PROBLEM BEFORE TOOL, ONE OWNER PER SYSTEM, VERIFY BEFORE CLAIMING,
  THE ARTEFACT IS THE ARGUMENT).
- Heading order: h1 first, then h2 for each block. The current page opens at h3 — fix it.
- Remove "38+ scheduled background workflows" and any claim that automation is running.

## PROCESS
- H1 "HOW I WORK", the audited page lead, then the SEVEN audited steps 01 DIAGNOSE … 07 OPERATE with their
  text verbatim.
- The audited capability groups: AI SYSTEMS / AUTOMATION / INTEGRATION / DESIGN.
- CTA: "Have a workflow in mind? Tell me what it costs you today." linking to mailto:raqeebsyed0@gmail.com.
- No claim that background automation runs across projects. Scheduler state is paused by decision.

## RESUME
- H1 "RAQEEB HUSSAIN", the audited summary.
- Sections in this order: AI SYSTEMS BUILT (five bullets, verbatim), CORE STRENGTHS, DESIGN BACKGROUND,
  SELECTED CLIENTS.
- ADD a verified EXPERIENCE section. The source of truth is the shipped PDF at
  /home/euphoria/euphoria-v2/work/raqeeb-website/public/Raqeeb_Hussain_Resume.pdf — run
  `pdftotext public/Raqeeb_Hussain_Resume.pdf -` and use these lines VERBATIM, inventing nothing:
    · Senior Graphic Designer, Euphoria Experiences — Jan 2026 to Present, Dammam, KSA
    · Visual Communications & Pre-Sales Specialist, White Graphics Advertising Co. — Nov 2024 to Jan 2026, Dammam, KSA
    · Senior Creative & Marketing Specialist, Tawasol Advertising Agency / Mounts & Seas Entertainments — Jan 2023 to Oct 2023, KSA & India
    · Marketing Communications Specialist, Learn Bay / Eloappz / D Third Eye Studio — Aug 2020 to Dec 2022, India
- ADD the verified education line: BA Journalism & Mass Communication, IMS Unison University (2017-2020),
  fluent English, conversational Arabic and Urdu.
- Keep the existing download link to Raqeeb_Hussain_Resume.pdf (the file exists, 2 pages) and add one short
  line that the PDF is the design-era version.
- Do not invent employers, dates, metrics or qualifications beyond the PDF.

## VERIFY (quote output)
- `grep -n "38+" <your three files>` → no match.
- `grep -n "Jan 2026" src/pages/ResumePage.tsx` → the verified experience line present.
- `grep -n "AI IMPLEMENTATION" src/pages/AboutPage.tsx` → present as discipline 01.
- `grep -n "07 OPERATE\|OPERATE" src/pages/ProcessPage.tsx` → present.
- `npx tsc --noEmit -p tsconfig.app.json` → report ONLY errors in your three files.

## STOP WHEN
Three files written, checks quoted, handoff at
.audit-2026-11-28/correction/handoffs/pages-b.md (status line 1) + the DAG handoff path.
