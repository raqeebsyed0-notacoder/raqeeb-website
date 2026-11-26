# Layout & media fix specs — A1–A4 (AI-segment audit)

- **DAG:** `aifp-1126b` — deliverable `work/raqeeb-website/.dag-fix/layout-spec.md`
- **Scope:** build-ready specs only. **No product file is changed by this run** (`src/` and `public/` are read-only here).
- **Sources read:** `.dag-verify/report-data.json` (findings A1–A9), `src/data/portfolio.ts`, `src/components/ai-project-detail.tsx`, and the approved `.dag-fix/contract.md` (Founder ruling 2026-11-26 on fixed rectangles). Paths for the two audit-cited files were resolved by filename only: `src/pages/CategoryPage.tsx`, `src/components/html-embed-viewer.tsx` — their contents were **not** re-read in this run; their line numbers below are quoted from `report-data.json` and marked `audit-cited`.
- **Ruling applied:** A2 and A4 each use **one fixed rectangle**. Archify = **3.5 : 1** (measured 416 × 119 px); video = **16 : 9** (measured 1278 × 719 px), capped by max-height.

## Summary — exact edit site and measurable acceptance

| Finding | Primary file:line (verified by read) | Concrete edit | Primary acceptance (command → value) |
|---|---|---|---|
| A1 | `src/components/ai-project-detail.tsx:182-194` (guard at `:183`); `src/data/portfolio.ts:807-810, 845, 879, 922, 956, 985, 1014, 1048` | Delete the whole Screenshots & Workflows block; empty all 8 screenshot arrays | `grep -c 'Screenshots & Workflows' …/ai-project-detail.tsx` → `0` |
| A2 | `src/components/ai-project-detail.tsx:77` (and `:74` grid) | Lock every Archify card to one `aspect-[3.5/1]` rectangle | `grep -c 'aspect-\[3.5/1\]' …/ai-project-detail.tsx` → `1` |
| A3 | `src/components/ai-project-detail.tsx:56, 72, 145, 158, 230, 282`; `:57` | `mb-12`→`mb-6` on 6 sections (7th dies with A1); `leading-[0.9]`→`leading-[1.2]` | `grep -c 'mb-12' …/ai-project-detail.tsx` → `1` |
| A4 | `src/components/ai-project-detail.tsx:299-307`, edit at `:305` | One `aspect-[16/9]` video box, `max-h` 320/360/420 | `grep -c 'aspect-\[16/9\]' …/ai-project-detail.tsx` → `1` |

---

## A1 — Remove screenshots; stop mislabelling diagrams as screenshots

**Audit evidence (`report-data.json:16-21`).** `screenshotsSection true` on all 8 AI pages; `imgCount 3` on agent-fleet, `2` on the other seven. Four projects point a diagram PNG into `screenshots` (skills-library, approval-inbox, hermes-engine, automations). Founder: screenshots are not required in this segment — only Archify + a video with a skill.

**Root cause, exact lines (verified):**
- `src/components/ai-project-detail.tsx:183` — `{project.screenshots.length > 0 && (` gates the section.
- `src/components/ai-project-detail.tsx:184-194` — the `<section className="mb-12">…Screenshots & Workflows…</section>` body; `:189` is the `<img src={src} …>` that renders the mislabelled diagram.
- `src/data/portfolio.ts:807-810` (agent-fleet, multi-line), `:845` (skills-library), `:879` (orio-operations), `:922` (leadjin-portal), `:956` (approval-inbox), `:985` (paperclip-plugin), `:1014` (hermes-engine), `:1048` (automations) — all eight `screenshots` arrays.

**Concrete edits:**

1. `ai-project-detail.tsx:182-194` — delete the entire block below (comment, guard, section, grid, map). No replacement. The `Screenshots & Workflows` heading, the `project.screenshots.length` guard and the `project.screenshots.map` all disappear together.

```
        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="mb-12">
            <h2 ...>Screenshots & Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((src, i) => ( … <img src={src} … /> … ))}
            </div>
          </section>
        )}
```

2. `portfolio.ts` — in each of the 8 `aiProjects` entries, set `screenshots: []`. Keep the field (the interface at `portfolio.ts:53` declares `screenshots: string[]` as required). Example, `portfolio.ts:845`:

```
- screenshots: ['assets/ai/diagrams/platform/fig1-skills-path.png'],
+ screenshots: [],
```

Apply the same to `:807-810` (collapse the 4-line array to `screenshots: [],`), `:879`, `:922`, `:956`, `:985`, `:1014`, `:1048`. The diagram PNGs are **not deleted** — they remain reachable through `architecture` and `links` (`type: 'diagram'`), which is the correct labelling.

3. Dependent gallery guard, **audit-cited** — `src/pages/CategoryPage.tsx:70` currently feeds `screenshot[0]` into the gallery hero tile. With the arrays now empty this must fall back to `project.architecture` (or a dedicated thumbnail), never a diagram presented as a screenshot. Also applies to the gallery ratios in A2 below. Line number from `report-data.json:20`; file not re-read this run.

**Acceptance commands (run from `work/raqeeb-website`):**

```
grep -c 'Screenshots & Workflows'    src/components/ai-project-detail.tsx   # expect 0
grep -c 'project.screenshots'        src/components/ai-project-detail.tsx   # expect 0
grep -c 'screenshots: \[\]'          src/data/portfolio.ts                  # expect 8
grep -c "screenshot\[0\]"            src/pages/CategoryPage.tsx             # expect 0   (audit-cited)
npm run build                                                               # expect exit 0
```

`assetAlt` (`ai-project-detail.tsx:16-25`) stays: it is still used by the Architecture `<img>` at `:163`. No unused-symbol fallout.

---

## A2 — One fixed rectangle for every Archify surface (Founder ruling)

**Audit evidence (`report-data.json:23-29`).** agent-fleet and orio-operations render 2 boxes; the other six render 1. Every card measures 416 × 119 px. The gallery hard-codes 8 different ratios (3200/3528 → 1280/6621) and the embed viewer is 4/3.

**Ruling applied — one rectangle, everywhere:** **3.5 : 1 (416 × 119 px)**. `width: 100%` + `aspect-ratio: 3.5 / 1`; height derives from width, so absolute px scale with the column but the ratio never changes. Box *count* is unchanged (the two 2-diagram pages keep both cards — content is preserved); only the geometry is standardised.

**Root cause, exact lines:**
- `src/components/ai-project-detail.tsx:74` — the `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4` wrapper (kept; its cards get the fixed rectangle).
- `src/components/ai-project-detail.tsx:77` — `cardClass`, the shared class string applied to every link card at `:103` and `:107`. This is the single place to enforce the rectangle.
- **audit-cited:** `src/pages/CategoryPage.tsx:58-67` (8 hard-coded aspect ratios), `:70` (gallery hero from `screenshot[0]` — see A1); `src/components/html-embed-viewer.tsx:29` (viewer fixed to 4/3).

**Concrete edits:**

1. `ai-project-detail.tsx:77` — add the fixed rectangle to `cardClass` (before → after):

```
- const cardClass = 'group flex flex-col justify-between text-left p-5 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-white/30 transition-all hover:bg-neutral-900/50'
+ const cardClass = 'group flex flex-col justify-between text-left p-5 aspect-[3.5/1] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 hover:border-white/30 transition-all hover:bg-neutral-900/50'
```

One edit at `:77` updates all cards (both button and anchor variants at `:103`/`:107`). `:74` keeps the per-breakpoint grid (`1 → sm:2 → lg:3`) from the contract; no per-project ratio remains.

2. **audit-cited** — `src/pages/CategoryPage.tsx:58-67`: replace the eight per-project aspect-ratio values with the single `aspect-[3.5/1]` on every gallery tile, and apply the `:70` hero fallback from A1.

3. **audit-cited** — `src/components/html-embed-viewer.tsx:29`: change the fixed `4 / 3` viewer ratio to `3.5 / 1` so the opened viewer matches the card rectangle.

**Acceptance commands:**

```
grep -c 'aspect-\[3.5/1\]'   src/components/ai-project-detail.tsx      # expect 1
grep -c 'aspect-\[3.5/1\]'   src/pages/CategoryPage.tsx                # expect 1   (audit-cited)
grep -Ec '3\.5 ?/ ?1|3\.5/1' src/components/html-embed-viewer.tsx      # expect >=1 (audit-cited)
grep -c '4 ?/ ?3'            src/components/html-embed-viewer.tsx      # expect 0   (audit-cited)
npm run build                                                          # expect exit 0
```

Browser spot-check (one fixed shape on all 8 pages): each Archify card's `getBoundingClientRect()` gives `width / height ≈ 3.5` (±0.05) at 375, 768 and 1280.

---

## A3 — Halve section spacing; relax hero leading

**Audit evidence (`report-data.json:31-37`).** Scroll height 2865–5712 px (3.2–6.3 screens at 1440 × 900); LeadJin 6.3, OrIO 5.3. Seven/eight stacked `mb-12` sections plus `leading-[0.9]` on the hero.

**Interaction with A1:** A1 deletes the Screenshots section, which contains the `mb-12` at `:184`. So A3 edits **six** live sections, not seven: `:56, :72, :145, :158, :230, :282`. The `mb-12` at `:198` (skills-library deep-dive) is out of scope per `.dag-fix/contract.md` and stays.

**Root cause, exact lines (verified):**

| Line | Section | Before → after |
|---|---|---|
| `:56` | Hero `<div>` | `mb-12` → `mb-6` |
| `:72` | Live Systems & Interactive Archify | `mb-12` → `mb-6` |
| `:145` | Stack | `mb-12` → `mb-6` |
| `:158` | Architecture | `mb-12` → `mb-6` |
| `:230` | Agent and skills (`className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8"`) | `mb-12` → `mb-6` only; grid classes unchanged |
| `:282` | Demos | `mb-12` → `mb-6` |
| `:57` | Hero `<h1>` | `leading-[0.9]` → `leading-[1.2]`; `mb-6` on the h1 stays |
| `:198` | Skills-library deep-dive | **unchanged** (`mb-12`) — out of scope |

`mb-12` = 48 px → `mb-6` = 24 px (halved, per contract). Leading 0.9 → 1.2 on the `text-4xl … lg:text-7xl` hero. Together with A1's removed section this cuts the tallest page substantially without dropping content.

**Acceptance commands:**

```
grep -c 'mb-12'              src/components/ai-project-detail.tsx   # expect 1  (only :198)
grep -c 'mb-6'                src/components/ai-project-detail.tsx   # expect >=7 (h1 + 6 sections + deep-dive)
grep -c 'leading-\[0\.9\]'    src/components/ai-project-detail.tsx   # expect 0
grep -c 'leading-\[1\.2\]'    src/components/ai-project-detail.tsx   # expect 1
npm run build                                                       # expect exit 0
```

Rendered check (reference baseline `report-data.json`: 2865–5712 px, LeadJin 6.3 screens, OrIO 5.3): post-fix `document.documentElement.scrollHeight` is below the pre-fix value on every AI page and no page exceeds ~5 screens at 1440 × 900. Zero horizontal overflow at 375 / 768 / 1280 (`report-render.json` reference: overflow 0, page errors 0).

---

## A4 — One fixed rectangle for both OrIO videos (Founder ruling)

**Audit evidence (`report-data.json:39-45`).** Both demos render at 1278 × 719 px; OrIO is 4794 px tall (5.3 screens). Cause: `ai-project-detail.tsx:305` uses `w-full h-auto`, so each box grows with width.

**Ruling applied — one rectangle for every demo video:** **16 : 9**, both demos identical. Cap: **320 px** at 375, **360 px** at 768, **420 px** at 1280 (contract §1 / §4). The `aspect-[16/9]` stops auto-grow; the `max-h-*` is the height cap that actually shortens the page. Labels stay untouched.

**Root cause, exact lines (verified):**
- `src/components/ai-project-detail.tsx:299-307` — `<video>`; the edit target is `:305`, `className="w-full h-auto block bg-black"`.
- `src/data/portfolio.ts:908-911` — the two demo entries; **data unchanged**, confirming the labels `Operations Pilot Walkthrough` and `Market Intelligence Feature Demo` and their URLs survive.

**Concrete edit — `ai-project-detail.tsx:305`:**

```
-                    className="w-full h-auto block bg-black"
+                    className="w-full aspect-[16/9] max-h-[320px] md:max-h-[360px] lg:max-h-[420px] object-cover block bg-black"
```

`w-full` + `aspect-[16/9]` = one fixed 16:9 rectangle for every available demo (not just OrIO); `max-h-[320px] md:max-h-[360px] lg:max-h-[420px]` caps it at each breakpoint; `object-cover` keeps the poster/frame filling the box when height is capped. No change to `controls`, `src` (`:301`), `poster` (`:302`, via `demoPoster()`), `aria-label` (`:304`) or `playsInline` (`:306`).

**Acceptance commands:**

```
grep -c 'aspect-\[16/9\]'                 src/components/ai-project-detail.tsx   # expect 1
grep -c 'max-h-\[320px\]'                 src/components/ai-project-detail.tsx   # expect 1
grep -c 'max-h-\[420px\]'                 src/components/ai-project-detail.tsx   # expect 1
grep -c 'w-full h-auto block bg-black'    src/components/ai-project-detail.tsx   # expect 0
grep -c 'Operations Pilot Walkthrough'    src/data/portfolio.ts                  # expect 1  (label intact)
grep -c 'Market Intelligence Feature Demo' src/data/portfolio.ts                 # expect 1  (label intact)
npm run build                                                                    # expect exit 0
```

Rendered check on OrIO: both `<video>` boxes report the same `width / height` ratio (16/9 ±0.05) and height ≤ 420 px at 1280, ≤ 360 px at 768, ≤ 320 px at 375; page height below the 4794 px baseline; both demo labels still visible.

---

## Verification of this run

- Only this file was written: `work/raqeeb-website/.dag-fix/layout-spec.md`. No `src/` or `public/` file was touched. `git status --short -- work/raqeeb-website/src work/raqeeb-website/public` is empty (confirmed before and after writing).
- Every quoted line number in the three SCOPE files was read directly; each finding carries at least one `grep -c` acceptance with an exact expected integer. The two `CategoryPage.tsx` / `html-embed-viewer.tsx` edit sites are quoted from `report-data.json` and explicitly labelled audit-cited, not re-verified here.
- Fixed-rectangle values (3.5 : 1 for Archify/gallery/viewer; 16 : 9 + 320/360/420 px for video) and spacing values (`mb-6`, `leading-[1.2]`) match the approved `.dag-fix/contract.md`.

## Open (Founder-owned, not part of A1–A4)

Per `.dag-fix/contract.md` §7: OrIO SOUL/reason/"service engineer" wording (A7), Market Intelligence plugin promotion, skill-page rewrite wording (A9), and any override of the settled 3.5:1 Archify ratio. None block these four specs.
