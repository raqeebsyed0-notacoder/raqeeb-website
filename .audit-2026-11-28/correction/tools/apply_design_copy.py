#!/usr/bin/env python3
"""Deterministic copy transform for the Raqeeb portfolio correction (v2).

Applies the audited copy from .audit-2026-11-28/report/*.json to src/data/portfolio.ts,
moves the AI projects to src/data/ai-projects.ts, and removes the internal AI dump.
Dry-run by default; pass --apply to write.

Parts:
 A  insert eyebrow/lede/facts/look/seoTitle/seoDescription into each of the 25 design projects
 B  insert lede/note/seoTitle/seoDescription into each of the 5 categories
 C  portfolio.ts: drop its local interfaces, import the shared types, delete the legacy
    aiProjects array, and re-export aiProjects from ./ai-projects (helper functions keep working)
 D  drop the `summary` field from ai-projects.ts and types.ts (it carried internal seat names)
"""
import json
import re
import sys

BASE = "/home/euphoria/euphoria-v2/work/raqeeb-website"
APPLY = "--apply" in sys.argv
PORT = f"{BASE}/src/data/portfolio.ts"
AIP = f"{BASE}/src/data/ai-projects.ts"
TYP = f"{BASE}/src/data/types.ts"

design = json.load(open(f"{BASE}/.audit-2026-11-28/report/content_design.json"))["projects"]
main = json.load(open(f"{BASE}/.audit-2026-11-28/report/content_main.json"))
cats_json = main["pages"]["categories"]

src = open(PORT, encoding="utf-8").read()
report = []


def ts(value):
    v = str(value).replace("\\", "\\\\").replace("'", "\\'")
    v = v.replace("\r", " ").replace("\n", " ")
    return "'" + v + "'"


def object_bounds(text, marker):
    """(open, close) brace indices of the object literal that CONTAINS `marker`."""
    i = text.index(marker)
    start = text.rfind("\n  {", 0, i)
    if start == -1:
        raise ValueError(f"no object start before {marker!r}")
    j = start + 1  # the '{'
    depth = 0
    for k in range(j, len(text)):
        ch = text[k]
        if ch == "{":
            depth += 1
        elif ch == "}":
            depth -= 1
            if depth == 0:
                if k > i:
                    return j, k
                raise ValueError(f"object closed before marker {marker!r}")
    raise ValueError(f"no closing brace for {marker!r}")


# ---------- Part A ----------
inserted = 0
already = 0
missing = []
for entry in design:
    slug = entry["slug"]
    marker = f"id: '{slug}',"
    try:
        _, close = object_bounds(src, marker)
    except ValueError:
        missing.append(slug)
        continue
    if "eyebrow:" in src[src.index(marker):close]:
        already += 1
        continue
    fields = "".join(
        f"\n    {key}: {ts(entry[src_key])},"
        for key, src_key in (
            ("eyebrow", "eyebrow"),
            ("lede", "lede"),
            ("facts", "facts"),
            ("look", "look"),
            ("seoTitle", "seo"),
            ("seoDescription", "meta"),
        )
    )
    src = src[:close] + fields + "\n  " + src[close:]
    inserted += 1

report.append(f"A design: inserted={inserted} already={already} missing={missing}")

# ---------- Part B ----------
cat_inserted = 0
cat_already = 0
cat_missing = []
for cat_id in ("brand-identity", "presentation", "social-media", "websites", "ai"):
    key = cat_id if cat_id in cats_json else {"presentation": "presentation-design"}.get(cat_id, cat_id)
    data = cats_json.get(key)
    if data is None:
        cat_missing.append(cat_id)
        continue
    marker = f"id: '{cat_id}',"
    try:
        _, close = object_bounds(src, marker)
    except ValueError:
        cat_missing.append(cat_id)
        continue
    if "lede:" in src[src.index(marker):close]:
        cat_already += 1
        continue
    fields = "".join(
        f"\n    {k2}: {ts(data[sk])},"
        for k2, sk in (("lede", "lead"), ("note", "note"), ("seoTitle", "seo_title"), ("seoDescription", "meta"))
    )
    src = src[:close] + fields + "\n  " + src[close:]
    cat_inserted += 1

report.append(f"B categories: inserted={cat_inserted} already={cat_already} missing={cat_missing}")

# ---------- Part C ----------
removed = []


def cut_interface(text, marker):
    i = text.find(marker)
    if i == -1:
        return text
    e = text.index("\n}\n", i) + len("\n}\n")
    removed.append(marker)
    return text[:i] + text[e:]


for iface in (
    "export interface Project {",
    "export interface Category {",
    "export interface SkillInfo {",
    "export interface AiProjectLink {",
    "export interface AiProject {",
):
    src = cut_interface(src, iface)

i = src.find("export const aiProjects")
if i != -1:
    e = src.find("\n];\n", i)
    if e != -1:
        src = src[:i] + src[e + len("\n];\n"):]
        removed.append("aiProjects array")

header = (
    "import type { Project, Category, AiProject } from './types'\n"
    "import { aiProjects } from './ai-projects'\n\n"
    "export type { Project, Category, AiProject } from './types'\n"
    "export { aiProjects }\n\n"
)
if "from './types'" not in src:
    src = header + src.lstrip("\n")
report.append(f"C removed: {removed}")

if APPLY:
    open(PORT, "w", encoding="utf-8").write(src)

# ---------- Part D ----------
ai = open(AIP, encoding="utf-8").read()
types = open(TYP, encoding="utf-8").read()
ai_new = re.sub(r"\n    summary: '(?:[^'\\]|\\.)*',", "", ai)
types_new = types.replace(
    "  // kept: the renderers read it (cards + AI detail page); not internal dump content\n  summary: string;\n", ""
)
removed_d = ai.count("\n    summary:") - ai_new.count("\n    summary:")
if APPLY:
    open(AIP, "w", encoding="utf-8").write(ai_new)
    open(TYP, "w", encoding="utf-8").write(types_new)
report.append(f"D summary removed: ai={removed_d} types_clean={'summary: string' not in types_new}")

# ---------- readback ----------
final = open(PORT, encoding="utf-8").read() if APPLY else src
report.append(
    "READBACK portfolio.ts: eyebrow=%d facts=%d look=%d lede=%d seoTitle=%d aiProjects_refs=%d iface=%d types_import=%d"
    % (
        final.count("eyebrow:"),
        final.count("    facts:"),
        final.count("    look:"),
        final.count("    lede:"),
        final.count("    seoTitle:"),
        final.count("aiProjects"),
        final.count("export interface"),
        final.count("from './types'"),
    )
)
print(("APPLIED" if APPLY else "DRY RUN") + " — " + BASE)
for line in report:
    print(" " + line)
