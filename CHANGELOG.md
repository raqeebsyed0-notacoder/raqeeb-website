# Changelog

**Date:** 2026-11-26
**Scope of this change:** approved three-page AI content draft + remaining UI gaps
**Source of record:** `.content-draft/ai-content-3pages.md` (per-section citations), `src/data/portfolio.ts` (aiProjects facts)

---

## AboutPage.tsx

- **Disciplines** — appended new 'AI & Automation' entry as the 5th item in `disciplines` (after 'Website & Digital Design'). Source: portfolio.ts project titles/stati at lines 800, 835, 869, 912, 946, 975, 1004, 1038; Skills Library summary line 837; Automations summary line 1040. *(draft §1a)*
- **Tools** — replaced the 'AI & Image' row (`['AI Image Generators', 'Video Editing', 'Motion Graphics']`, `Advanced`) with 'AI & Automation' (`['Agent Fleet', 'Skills Library', 'OrIO Operations', 'LeadJin Portal', 'Approval Inbox', 'Paperclip Plugin', 'Hermes Engine', 'Automations']`, `Live`). Levels: 6 Live / 2 Pilot per portfolio.ts. *(draft §1b)*
- **Bio** — replaced the one-line bio with the approved wording including '8 AI & automation systems' and '38+ scheduled background workflows'. *(draft §1c)*

## ProcessPage.tsx

- **Steps** — inserted step 06 'AUTOMATE' after DELIVER (numeric level retained: `06`). Sources: portfolio.ts Automations line 1040 ('38+ autonomous cron workflows'), Agent Fleet line 802 ('9 autonomous seat profiles'), Approval Inbox line 948 (Founder routing). *(draft §2a)*
- **Capabilities** — appended 4th category 'AI Systems' with the 8 system titles. *(draft §2b)*

## ResumePage.tsx

- **Profile paragraph** — replaced with the approved wording citing '8 AI & automation systems' and '38+ scheduled background workflows'. *(draft §3a)*
- **Core Strengths** — appended the 8 system titles as new items. *(draft §3b)*
- **Tools** — the 3c 'n/a level' tool rows are **skipped** per instruction; existing numeric levels are retained. No render change made for 'n/a' rows.

## CategoryPage.tsx

- **All-projects category view** (`category === 'all'`, route `#/projects/all`) now renders an `<h1>All Projects</h1>` and all 33 portfolio slides (25 static projects + 8 AI projects). Sources: portfolio.ts `aiProjects` (8 entries) and 25 static projects. *(draft §1a/§2a/§2b)*

## index.css

- **Contrast override** — the `.text-white\/40` override raises text-white/40 to white/70 (`rgba(255,255,255,0.7) !important`). Measured contrast: ~9.9:1 on #000, ~8.7:1 on #141414 — meets WCAG AA 4.5:1. No further change required. *(audit A4 fix)*

## .qa-audit-2026-11-26/state.md

- **A15** — corrected the stale nine-demo count to seven (source has seven empty demo slots).

## CHANGELOG.md

- Created this per-page change log.

---

*Citations are from the approved draft and `src/data/portfolio.ts`; no invented facts were used.*
