# c4-fix handoff — AI stack chips

## What I did
The verify node failed c4 because `/projects/ai/skills-library` rendered the internal file name `SKILL.md` as a Stack chip. I made the single specified data edit, rebuilt, served `dist` on port 4186, and verified the rendered page plus every other AI project page.

## Files changed
- `work/raqeeb-website/src/data/ai-projects.ts` — line 53 only:
  - before: `stack: ['SKILL.md', 'YAML Frontmatter', 'Git', 'Hermes Agent'],`
  - after:  `stack: ['Markdown', 'Git', 'Hermes Agent'],`
- `work/raqeeb-website/.audit-2026-11-28/correction/handoffs/c4-fix.md` — this handoff.
- `/home/euphoria/.omh/dag/local-d8e43dc1c989a3b7020598dfd9e891727b73072f41-0c983c66425ed611/raqeeb-correction/c4-fix.md` — parent-read copy of this handoff.

`git diff -- src/data/ai-projects.ts` on the website repo (root `/home/euphoria/euphoria-v2/work/raqeeb-website`) shows exactly that one hunk; no other SCOPE or out-of-SCOPE source file was touched. The working tree was clean on entry (no failed-attempt edits to keep or undo).

## VERIFY

### Build
```
> vite build
vite v8.3.0 building client environment for production...
✓ 1893 modules transformed.
dist/index.html                   1.88 kB │ gzip:   0.62 kB
dist/assets/index-DVvtHS8k.css   50.17 kB │ gzip:   9.07 kB
dist/assets/index-DYQj_nmV.js   378.57 kB │ gzip: 111.90 kB
✓ built in 1.20s
BUILD_EXIT=0
```
**Build exit code: 0.**

### Grep of the built text
App bundle (`dist/assets/index-DYQj_nmV.js`):

```
$ grep -oE '.{40}Markdown.{60}' dist/assets/index-DYQj_nmV.js
:`Skill authoring & governance`,stack:[`Markdown`,`Git`,`Hermes Agent`],architecture:`assets/ai/diagrams/pla

$ grep -o "SKILL.md" dist/assets/index-DYQj_nmV.js
(no output)

$ grep -rn "YAML Frontmatter" dist/
(no output in the app bundle)
```
`SKILL.md` still appears only in the unrelated static downloadable artifact `dist/assets/brand/euphoria/brand-guideline.html` (a brand guideline file), not in the app bundle and not on any AI project page. Built bundle contains zero occurrences of the seat names `sovereign`, `marshal`, `mason`, `prism`, `herald`, `lantern`, `steward`.

### Rendered page (vite preview, port 4186, HashRouter URL `/#/projects/ai/skills-library`)
Rendered `document.body.innerText` after the `STACK` heading:

```
STACK
Markdown
Git
Hermes Agent
```

**Rendered Stack line: `Markdown / Git / Hermes Agent`** — no `SKILL.md`, no `YAML Frontmatter`. A screenshot was also inspected by eye: the three Stack chips read exactly `Markdown`, `Git`, `Hermes Agent`.

### All AI pages scanned in the rendered browser
```
[agent-fleet]      SKILLmd=false assetsPath=false
[skills-library]   SKILLmd=false assetsPath=false
[orio-operations]  SKILLmd=false assetsPath=false
[leadjin-portal]   SKILLmd=false assetsPath=false
[approval-inbox]   SKILLmd=false assetsPath=false
[paperclip-plugin] SKILLmd=false assetsPath=false
[hermes-engine]    SKILLmd=false assetsPath=false
[automations]      SKILLmd=false assetsPath=false
```
Seat-name check on rendered text: `sovereign=false marshal=false mason=false prism=false herald=false lantern=false steward=false`.

So no AI page renders `SKILL.md`, a seat name, or an `assets/` path as visible text. `assets/ai/...` values exist in the data only as image `src` / link `href` targets, which is their intended use.

## Cleanup
The `vite preview` server started on port 4186 was stopped; port 4186 confirmed down. Temporary Playwright screenshots in `/tmp` were removed. No temp files were created inside the repository.

## Commit
Only SCOPE paths staged by name:
- `git add -- src/data/ai-projects.ts .audit-2026-11-28/correction/handoffs/c4-fix.md`
- `git commit -m "fix(ai): replace SKILL.md stack chip with Markdown on skills-library"`

Commit: see `git log -1 --format=%H` on branch `portfolio-correction` (also reported in the parent handoff and final message).

## Still open
Nothing in this SCOPE. c4 criterion is satisfied on the rendered site.
