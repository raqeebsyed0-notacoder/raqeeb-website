# ORIO repository — truth handoff for portfolio audit
**Audit date:** 2026-11-28 (this audit) · **Repo read-only:** yes, nothing in the repo modified
**Repo:** https://github.com/raqeebsyed0-notacoder/orio (branch `main`, HEAD `fe8316a`, 20 commits, clean tree) · cloned to `/tmp/orio-audit`
**Claims below carry a file path or quoted command output. See §8 for the exact test/run evidence.**

---

## 1. Purpose in one plain business line

A local-first **operations console + market-intelligence plugin** for rig/well job-cycle lifecycle work and morning-report extraction review: it turns Ajeez-supplied report files into a local SQLite demo database behind a read-only API, with approval-gated mutation, blocked-by-design external channels, and a separate competitor "tool-size × company" market-intelligence track — so an operations supervisor can see conflicts, approve actions, and inspect competitor intelligence without anything leaving the machine.

## 2. Industry and workflow it serves

- **Upstream oil & gas (well services):** RIH/land, L/D, POOH, casing, cementing, 8-1/2 drilling, MDD/sleeves; identity of a job is **Rig + Well + Job Cycle** (never rig alone). Demo cases: HP-701/HZEM-753612 (RIH confirmed), SP-32/THRY-563004 (product conflict), SP-262/JNAB-122212 (MDD not verified), SP-93/THRY-562606 (dispatch check), HP-707/THRY-961612 (history timeline).
- **Pilot → real product:** Ajeez Sebastian's 90-day AI operations pilot is client #1, **not the only client**; Phase 4 adds per-client workspaces (clients.py) with no fork.
- **Workflow:** morning-report PDF → ingest → SQLite; review views (Today, Rigs & Wells, Lifecycle, Exceptions, Evidence, History, Market Intel, Expansion); supervisor approval gates on demo state; market-intel rows kept strictly separate from operational state.
- **Delivery model:** UI loads ONLY the `desktop-plugins` mirror; backend mounted at `/api/plugins/euphoria-orio-operations/`. Nothing sends, no sockets, no credentials.

## 3. Verified implemented features (each with file path)

| Feature | Evidence / path |
|---|---|
| Multi-day report ingestion: `rig_blocks`/`jobs` gain `report_date` + `source_file`; one row per report day | `data/build_db.py` (SCHEMA), `data/ingest_mr.py` |
| SQLite demo database with 50+ tables (meta, reports, rig_blocks, jobs, evidence, tracker_rows, matrix_rows, innovex_own, actions, exceptions, history, decisions, delivery_outbox…) | `data/build_db.py` SCHEMA + `dashboard/plugin_api.py` `_db()` |
| Backend router, all reads, mounted at `/api/plugins/euphoria-orio-operations/` (FastAPI, stdlib-only) | `dashboard/plugin_api.py` |
| Reads: `/health`, `/meta`, `/reports`, `/rigs`, `/rigs/{rig}/{well}`, `/jobs/{job_id}`, `/lifecycle`, `/exceptions`, `/history`, `/expansion`, `/matrix`, `/matrix/export.csv`, `/matrix/export.xlsx`, `/drafts`, `/mdd/preview`, `/channels/status`, `/delivery/outbox`, `/intelligence/upcoming|suppliers/first-seen|tool-problems|corrections|questions`, `/clients`, `/clients/{slug}` | `dashboard/plugin_api.py` |
| Writes (demo only, attributed): `POST /actions/{id}/decision` approve/reject/incorrect; actor bound **gateway header wins**, forged client claim rejected 400, else `client`/`default` | `dashboard/plugin_api.py` `_resolve_actor`, `decide()` |
| `POST /exceptions/{id}/resolve` with same actor attribution | `dashboard/plugin_api.py` `resolve_exception()` |
| `POST /drafts/email` shapes a delivery payload, stores it blocked in `delivery_outbox` (never sends) | `dashboard/plugin_api.py` `drafts/email`, `delivery/outbox` |
| DeliveryChannel protocol + BlockedChannel stubs (email/onedrive/telegram), `prepare`→local artifact, `deliver`→refuses with machine-readable receipt | `dashboard/channels.py` |
| Phase 4 per-client workspace: `<HERMES_HOME>/state/<client>/orio_demo.db`, `client.json`, `incoming/`, `credentials/`; unknown slugs 404, never auto-create | `dashboard/clients.py` `state_dir/db_path/config_path/resolve_client` |
| Market Intelligence: size × company × provenance × status × location × date_basis filters, CSV + XLSX export, period compare, coverage sheet | `dashboard/plugin_api.py` `_matrix_where`, `matrix()`, `matrix_xlsx()` |
| Cohort splits: `by_company`/`by_size`/`by_location`/`by_status`/`months`/`by_size_company`; UNPROVEN disclosed separately, never in company totals | `dashboard/plugin_api.py` `matrix()` |
| Company alias map: HOWCO→HAL (R3), DAVIS-LYNCH→FET, never-company codes WDV/HDV/TOD answer 400 (rules-v2 R1 corollary) | `data/company_aliases.json`, `_resolve_company()` in `dashboard/plugin_api.py` |
| Lane-7 read-only views over adjudicated registers (upcoming plans, first-seen suppliers, tool problems, reviewer corrections), honestly stale-marked where v2 has no context | `dashboard/intelligence.py` `build_bundle`/v2, `/intelligence/*` in `plugin_api.py` |
| UI: 8 views (Today, Rigs & Wells, Lifecycle, Exceptions, Evidence, History, Market Intel, Expansion), DayPicker (no native `<select>`), SnapshotRail, FilterEmpty, LoadGate, THead | `desktop/plugin.js` (components), `tests/test_day_picker.py`, `tests/test_empty_states.py` |
| Approval gating, ops log, no-network enforcement | `dashboard/plugin_api.py` `_oplog`/`/ops/log`, `tests/**_no_net*` |
| Client onboarding script, sync script, CI script, served-DB drift gate | `tools/onboard_client.sh`, `tools/sync_ui.sh`, `tools/ci.sh`, `tools/check_served_dbs.py` |

## 4. Document / data ingestion approach

**Source files → JSON (once, slow work) → `data/build_db.py` (reads only JSON, fast rebuilds) → SQLite.**

- **MR PDF → dated rig/well index:** `data/ingest_mr.py` (PyMuPDF `fitz`), segments "Last 24 hr operations"/"Next 24 hr plan", adds `report_date`/`source_file`; matches `mr_index.json` legacy contract; standby rigs recorded with well `'?'`.
- **Tracker:** `data/ingest_tracker.py` (XLSX, one sheet per day) → `OrioDatabase_Oct12.json` (40 day-sheets), served rows = 2,302 on the rebuilt DB.
- **Matrix (competitor intelligence):** `data/ingest_matrix.py` (XLSX workbook) → `June2026-adjudicated-v2.json` (135 rows; 123 COUNTED / 6 PENDING_FILE / 3 PENDING_RULING / 3 EXCLUDED), produced from Ajeez's ruled fixture `phase7-ajeez-rulings/adjudicated-rows-v2.json` via `data/ingest_adjudicated.py` (135 rows verified: WFD47/HAL39/FET26/TAM10 + UNPROVEN 1, onshore 91 / offshore 32, innovex_own 13 fenced).
- v1 workbook (`June2026.json`, 131 rows) retired to `data/ingested/matrix/_retired-v1/`; build glob is top-level only, never loaded.
- **Verified ingestion:** `ingest_mr.py` segments the Sep 19 sample to exactly **292 blocks** with 0 first_page mismatches against the known-good index (HANDOFF.md §Proven). AUDIT-2026-10-20.md §1 row 1 recorded `ingest_mr.py` 292/292 with 0 first_page mismatches.
- **Default build serves adjudicated v2**; `data/build_db.py` rejects `*-extracted.json` unless `--include-extracted` is passed (M7/Qualified: quarantined candidates never enter the default build).

## 5. Verification / reconciliation logic (how the system decides something is right)

- **Totals recompute from rows everywhere; no hardcoded demo numbers** — `_with_shares()`, `_provenance_totals()`, `_matrix_coverage()` read the live DB (`dashboard/plugin_api.py`); suites derive expectations from the JSON files (`tests/run_api.py:175-182`).
- **Lineage honesty enforced and tested:** workbook rows carry `source_page='workbook'`; only verified extraction carries an integer page; `zero NULLs`; `test_matrix_separation.py` + `test_matrix_separation.py` lineage checks (`matrix-lineage-honest` PASS: with_source_page==total==123).
- **`meta.built_from` is computed FROM post-insert SELECT counts and self-checked against insert counters** — `data/build_db.py` aborts the build on mismatch (B2+M6 fixed; FIX5).
- **Served-home drift gate** `tools/check_served_dbs.py`: every served HERMES_HOME must match its own content (receipt↔content, status counts sum, `data_tier=demo`); exits 1 on a copy of the stale 185-row DB (FIX5).
- **Extracted-row quarantine:** default build excludes `*-extracted.json`; `--include-extracted` is the only way in, documented "pass only after Ajeez accepts the corpus" (M7).
- **Cross-output equivalence:** `tests/lane_c_check.py` asserts `/matrix` == `/matrix/export.csv` == `/matrix/export.xlsx` == `/matrix/query` on the same selection (details==summary==shares, reconciliation sheet all PASS).
- **No-invention rules:** UNPROVEN rows count in size/location only (`test_matrix_separation.py` `test_provenance_filter_separates_sources`); `WDV/HDV/TOD` → 400 via alias guard; country/responsibility-code fallback in `data/jev_consume.py` COMPANY_TOKENS.
- **Approval forgery:** gateway header wins; body actor mismatch → `400` rejected-forgery and an entry in `/ops/log` (`dashboard/plugin_api.py` `_resolve_actor`, `tests/run_api.py` approve-writes-actor/gateway-bind-wins/forgery-rejected 400).
- **No-external-contact rule:** tests grep `plugin_api.py`/`channels.py`/`jev_consume.py` for socket/urllib/httpx/requests/smtplib/email.mime imports — all absent.
- **Single-bound ranges are open-ended, never 400** (`_resolve_range`); reversed ranges and bad dates → 400 (FIX3).
- **Stale persisted day** falls back to latest and clears on next `/meta` load (FIX3).
- **MD/render truth:** byte checks for sync; render QA (Founder screenshots) kept separate and never claimed by this audit.

## 6. Exception handling

- **Blocked channels (ALL):** email/OneDrive/Telegram are `BlockedChannel` stubs; `deliver()` always returns `{delivered: False, state: 'blocked', reason, unblock_adapter}`; payloads prepared and stored locally. Unblock-day adapters documented only (`dashboard/channels.py`, README).
- **No network at all:** no sockets, no mail libs; responses carry `demo: True`, `external_actions: False` (`/health`); `tests/no-net*` greps clean.
- **HTTP contract:** unknown client slug → 404; bad slug → 400; reversed date range → 400; bad date → 400; unknown job/action/exception → 404; blocked action (e.g., a-hp701-mdd) cannot be approved → 409.
- **Single-bound open ranges:** one bound = range-open with NULL open side, open side never invented; period_compare NULL; summary panel handles it (FIX3).
- **Draft/email never sends:** `POST /drafts/email` stores `{state:'blocked'}` with reason; `/delivery/outbox` discloses it; `/mdd/preview` same pattern.
- **Unknown provenance/status/location filter values → 400** (enum guards in `_matrix_where`); `matrix?provenance=adjudicated` is the only accepted June corpus source.
- **Extract candidates with unknown event dates:** excluded from event-basis ranges, never backfilled; count disclosed as `unknown_event_dates` at the filter scope.
- **Seam errors:** `get_channel('x')` raises KeyError (never guess); `resolve_client` raises UnknownClient → 404; corrupt client profile → UnknownClient with the reason.
- **Persistence:** `rigq` is the only persisted view-filter key; stale day cleared on next meta load; `DayPicker` dismisses on click-outside + Escape + Escape/Tab.
- **Quarantine:** extracted rows refusing acceptance → excluded, with row kept; nothing silently dropped (FIX stage, M7).

## 7. Reports and outputs actually produced

- **Served demo DB** `<HERMES_HOME>/state/<client>/orio_demo.db` (WAL): committed-build values from this audit run (`python3 tests/run_api.py`): reports 2 (2026-09-19: 292 blocks; 2026-10-12: 280 blocks); `matrix_rows` 135 with `COUNTED` 123/PENDING_FILE 6/PENDING_RULING 3/EXCLUDED 3; tracker_rows 2,306 (incl. seed); innovex_own 13; meta receipt self-checked (raised by `check_served_dbs.py` pattern on the old 185-row snapshot).
- **API outputs:** `/matrix` JSON + `/matrix/export.csv` + `/matrix/export.xlsx` + `/matrix/query` JSON (POST); `/intelligence/*` JSON bundles; `/today` cards; `/ops/log` entries.
- **Test/run artifacts (this audit):** `tests/run_api.py` PASS/FAIL run (44 PASS / 4 FAIL, see §8); whole-dir pytest collection (37 collected, 1 ERROR — env gap, not a repo defect); `lane_c_check.py` LANE-C PASS (22 checks); `test_channels_offline.py` LANE-F-CHANNELS 55/0; `test_intelligence_lane7.py` 52 PASS.
- **Repository documentation of past runs:** `HANDOFF.md` (Phase 1–4 status, 62/62 PASS history), `AUDIT-2026-10-20.md` (5 blockers B1–B5, 7 majors M1–M7, 4 minors at audit), `FIX-2026-10-20.md` + `FIX2-6-2026-10-21.md` (defect resolutions + June acceptance recompute), `DESIGN.md`, `DEMO_WALKTHROUGH.md` (10 scenes), `ORIO_TRAINING_REPORT.md` (T1–T7 proof log).

## 8. Test / run evidence — exact command and result

**Commands run in this audit (Linux, same repo, no repo files modified):**

1. `git clone https://github.com/raqeebsyed0-notacoder/orio /tmp/orio-audit` → RC 0, branch `main`, HEAD `fe8316a`.
2. `python3 /tmp/orio-audit/tests/run_api.py` → **RC 1: 44 PASS / 4 FAIL** (`all-report-days n=2`, `rigs-new-day 0`, `meta-latest-day`, `client2-meta`) — because committed data carries **2 report days** (Sep 19 + Oct 12), not the 92-day corpus in the served homes. All other 44 checks PASS incl. `matrix-total 123`, `matrix-companies {WFD 47, HAL 39, FET 26, TAM 10}`, `matrix-locations {onshore 91, offshore 32}`, `approve-demo`, `forbidden-409`, `email-never-sends`, `outbox-stored-locally`.
3. `python3 -m pytest /tmp/orio-audit/tests/ --collect-only -q` → **37 collected, 1 ERROR**: `test_jev_repair.py` needs `jev_adjudicate` module, not installed in this environment (repo CI includes it — see 5).
4. `python3 -m pytest tests/test_api.py tests/test_matrix_separation.py -q` → **15 passed, 6 errors** (6 `hermes_constants` ModuleNotFoundError — missing Hermes venv package in this environment, not a repo defect).
5. `python3 /tmp/orio-audit/tests/lane_c_check.py` → **RC 0, LANE-C PASS (0 failures)**, 22 checks, all xlsx-reconciliation PASS, CSV agrees, export.xlsx agree.
6. `python3 /tmp/orio-audit/tests/test_channels_offline.py` → **RC 0, LANE-F-CHANNELS: 55 passed, 0 failed**.
7. `python3 /tmp/orio-audit/tests/test_intelligence_lane7.py` → **RC 0, 52 PASS, FAILURES: none** (v2 ruled counts FET26/HAL39/TAM10/WFD47 = 123 COUNTED).
8. `python3 -m pytest tests/test_jev_repair.py -v` → RC 2, collection error (missing `jev_adjudicate` in this env).

**Commands quoted from the repo's own audit docs (executed in the Hermes agent venv, Windows-targeted paths, CI runs on commit via pre-commit hook):**

- `bash tools/ci.sh` → EXIT 0; `run_api FAILURES: none`; `pytest 12 + 6 + (16 + 54 subtests)`; lane-7 none; channels **55/0**; LANE-C PASS; ESM_OK; mirror IN SYNC (AUDIT-2026-10-20.md §1; FIX-2026-10-20.md §4).
- Read-only probe of served demo DB (opened RO, no writes): pre-fix `matrix_rows`=131 all `workbook`; post-FIX5 rebuild `meta.built_from`='legacy 292 blocks; ingested 26123 blocks; 2306 tracker rows; 135 matrix rows [adjudicated=135]; 13 innovex_own (fenced); 92 report days', `matrix_status_counts`='COUNTED=123, EXCLUDED=3, PENDING_FILE=6, PENDING_RULING=3' (FIX5-2026-10-21.md §2).

## 9. Maturity: pilot → production-readiness demonstration

**Maturity verdict: pilot — production-ready implementation on demo data, no production load.**

- Proof of productization: commit `e6a3007` "MI-V3 Obj1: ORIO plugin production-ready — adjudicated v2 ingest, rules-v2 aliases, location dimension, full CI"; `ci.sh` green on the Hermes venv (quoted in §8); `HANDOFF.md` logs 62/62 → 38/38 → 46/46 → 62/62 backend suite PASS across Phases 1–4; sync gate enforces three-copy in-sync; served-DB drift gate wired into CI; multi-client onboard clean for client #2 (dry-run).
- Why not production: **local SQLite demo data only** (`data_tier=demo` in every served DB); "Production path: replace the `_db`/query layer with production adapters (OneDrive ingestion → operational datastore). Route shapes stay the same" (plugin_api.py docstring); **email/OneDrive/Telegram permanently BLOCKED** (channels.py); no production panel load, no Ajeez-facing publish; compliance/scope items (July work, production load, mail) explicitly not started (FIX-2026-10-20.md §6 remaining defects, AUDIT-2026-10-20.md §1 handoff).
- The repo is a **productized pilot**: one codebase serves every client (clients.py), with CI gates and a documented onboarding path, but the data it carries today is the 2-report-day committed corpus, and every "production" claim must be tempered by the served-DB-only, demo-only, no-external-send posture.

## 10. Limitations and unfinished areas

1. **Committed corpus = 2 report days** (Sep 19, Oct 12). The audit's served-DB receipts (92 report days, 2,302 tracker rows) came from the profile/prod homes (untracked at audit time), **not from committed repo data** — a from-scratch build reproduces only 2 days.
2. **`all-report-days`/`rigs-new-day`/`meta-latest-day`/`client2-meta` fail** on a from-scratch Linux build for exactly that reason (run_api.py, §8 — evidence, not a defect in the code path).
3. **Jev repair suite never runs** outside the Hermes venv (needs `jev_adjudicate`/`jev_consume` modules + `ORIO_REPAIR_OUT` default; collection ERROR here). It is green in the venv CI (FIX-2026-10-20 §4).
4. **`hermes_constants` package** (needed by tests/client code) is not in this environment — 6 test errors above.
5. **No production data path**: the README's "Production path" is a documented route, not an implemented one. No production panel load exists.
6. **External channels are blocked by design and never exercised live** — no email/OneDrive/Telegram integration, no real MDD send; unblock adapters are documented only.
7. **Render QA not observed here**: no live Hermes desktop shell; UI verdicts are code-observed + test-harness (FIX3 §4 design self-check: "RENDER QA: NOT OBSERVED" — needs Founder screenshots).
8. **Lane-7 views for upcoming/tool-problems remain stale-marked** (pre-v2 registers; context-carrying v2 rows have no report text) — M4 deferred with explicit follow-up (AUDIT-2026-10-20 §3 M4, FIX2).
9. **13-3/8 size rows** (June acceptance) are the ruled set; v1 workbook (131) is retired; the v1 vs v2 delta is documented, not hidden.
10. **No JSON-schema/validation layer for client profiles beyond slug regex** — profiles are JSON with documented shape (clients.py `default_config`); no schema validator present.

## 11. Claims a portfolio site might make that the repo does NOT support

| Portfolio claim | Repo does not support it | Evidence |
|---|---|---|
| "Sends email / OneDrive / Telegram deliveries" | All channels BLOCKED (`deliver()` refuses; payloads stored) | `dashboard/channels.py` `BlockedChannel.deliver`; `POST /drafts/email` → `state='blocked'`; `/channels/status` all blocked |
| "Production-ready multi-client SaaS" | Demo SQLite only; `data_tier=demo`; no production adapter | `dashboard/plugin_api.py` docstring "Production path: replace the _db/… layer"; `check_served_dbs.py` asserts `data_tier=='demo'` |
| "Real-time push / live dashboard" | No sockets, no push, no websockets; request/response only | `dashboard/plugin_api.py` imports: no `socket`/`websocket`; `DESIGN.md` transitions none |
| "Unlimited report days in one build" | Committed `data/ingested/mr` has 2 day JSONs; 91 MR files in `03_Market-Intelligence/` not ingested | `find data/ingested -name '*.json'`; README data table |
| "MD/MDD can ship to customers" | Nothing sends; MDD actions blocked pending Ajeez approval (a-hp701-mdd always `blocked` until approved) | `tests/run_api.py` blocked-409; `dashboard/plugin_api.py` `decide()` approve-blocked 409 |
| "No-test or green CI on any machine" | CI is Windows-targeted (HERMES_HOME = `C:/Users/THinkPad…`, Hermes venv python); Linux run = 44/48 here; 6 env errors above | `tools/ci.sh` absolute Windows paths; §8 evidence |
| "Claims data as market facts" | UNPROVEN disclosed; WDV/HDV/TOD → 400; never-company guards; `source_page` integer only on verified extraction | `_resolve_company()` 400; `matrix()` unproven split; lineage checks |
| "Sync = push to your machine" | Repo edit changes nothing visible; must run `tools/sync_ui.sh` (desktop loads ONLY `desktop-plugins` mirror) | `tools/sync_ui.sh` docstring; `HANDOFF.md` process rules |
| "Full test suite runs everywhere" | `test_jev_repair.py` and `test_matrix_separation.py` require venv packages not in this env | §8 evidence (37 collected, 1 ERROR; 15 passed 6 errors) |
| "Production mail/database" | No production data path; July work, production load, mail not started | `PLUGIN README` "Production path…"; FIX-2026-10-20 §6 items 4–5 |

---

**Status: DONE**

STATUS: DONE
