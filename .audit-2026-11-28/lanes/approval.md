# Audit handoff — Hermes Approval/Rejection plugin (approval-inbox)

File: /home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/lanes/approval.md
Repo: https://github.com/raqeebsyed0-notacoder/hermes-approval-and-rejection-plugin (cloned to /tmp/approval-audit, NOT modified)
Run: `python -m pytest tests/ -q` under the project venv (/home/euphoria/euphoria-v2/apps/hermes/source-v2026.8.27/.venv/bin/python) -> **35 passed in 1.22s**

---

## 1. Purpose in one plain business line

A single Desktop approval inbox through which the Founder (human) reviews any action the default agent carries — a task, post, reel/video, PDF, or generic artifact — accepts it (approve), stops it (reject), or leaves it open with notes (review); approvals are only routed through the default agent, so specialists never contact the Founder directly.

---

## 2. Real architecture

**Panel UI** — `desktop/plugin.js`
- React pane built on `@hermes/plugin-sdk` components (Badge, Button, ConfirmDialog, EmptyState, ErrorState, GlyphSpinner, host, Input, ScrollArea, SearchField, SegmentedControl, useMutation, useQuery).
- Registered three surface areas: `ROUTES_AREA` ('routes') → page path `/approval-inbox`; `SIDEBAR_NAV_AREA` ('sidebar.nav') → nav entry; `PALETTE_AREA` ('palette') → "Approval Inbox: Open" action.
- Every decision is a React mutation (`useDecide`) over `rest('/items')` / `rest('/decide')` / `rest('/preview/...')` / `rest('/page/...')` / `rest('/submit')`.

**Backend** — `dashboard/plugin_api.py`
- FastAPI `APIRouter` mounted at `/api/plugins/approval-inbox/` (prefix in tests: `app.include_router(router, prefix="/api/plugins/approval-inbox")`).
- Endpoints: GET `/health`, GET `/items`, POST `/submit`, POST `/decide`, GET `/preview/{msg_id}`, GET `/files/{msg_id}/{name}`, GET `/page/{msg_id}/{name}`, GET `/ops/log`.

**Authoritative storage (agent mail ledger)** — `work/mail/`
- `ledger.jsonl` — append-only requests (kind=approval, `to` contains "founder"); parsed for display items.
- `approvals.jsonl` — per-message decision records keyed by `msg_id` (`_decisions_by_msg`).
- `mailbox/<agent>/` — per-agent mailboxes; default mailbox inspected for the reply that wakes the default agent.

**Local plugin state dir** — default `work/approval-inbox/` (env `APPROVAL_INBOX_DATA`)
- `files/` — attachments per `msg_id` (subdir named from msg_id), each with a `manifest.json`; served at `/files/{msg_id}/{name}`.
- `approved_versions.jsonl` — sidecar of approved versions (eventual-consistency metadata file, plugin-local).
- `ops.log` — durable append-only ops log (bounded in-memory deque + disk).
- `outbound-verdicts/*.json` — parked verdicts written when the Paperclip write 401s or is unconfigured.
- `finance/spend-register.jsonl` — auto-recorded spend entries written on approve when `metadata.spend_usd` is present (ceiling_usd pinned at 22.0).

**State model** — each item: `msg_id, ts, type, owner, originating_agent, work_id, subject, artifact{name, version, hash, preview_url}, preview_url, attachments[], next_action, status, decision`.
- Canonical statuses: `pending`, `approved`, `rejected`, `reget`. Canonicalisation happens once in `_requests()` (verb -> state map) and `normaliseStatus()` in the panel; a decided request can never read back as pending.
- Origin classification (`_origin_of`): declared `meta.origin` of `paperclip`/`agent` wins; otherwise `work_id` matching `^EUP-\d+$` -> paperclip, else `agent`.

---

## 3. Actual approve / reject / revise flow with file paths and state transitions

All panel actions go through `decide.mutate({ item, decision, note })` in `desktop/plugin.js`, POSTing to `rest('/decide')` in `dashboard/plugin_api.py`. The `note` (reason) is deliberately NOT length-validated; an over-long note is clipped in the handler (`_clip_note`, `MAX_NOTE_CHARS = 20000`) rather than refusing the decision.

**Approve** (panel: ConfirmDialog naming artifact + version → `decide` 'approve')
1. Backend: validate verb (400), find request (404), check not already decided (409), version guard `artifact_version != artifact.version` → 409.
2. Actor resolution: `x-hermes-user` header (`_resolve_actor`).
3. Note clipped (never refused).
4. `agent-mail approve --msg-id --decision --note --task-id` (via `_run_agent_mail`); nonzero rc → 500.
5. Records approved-version sidecar `work/approval-inbox/approved_versions.jsonl` (authorized:true, artifact, next_action, actor).
6. Writes spend entry to `work/finance/spend-register.jsonl` when `metadata.spend_usd` present.
7. Trigger (`_trigger_default`): origin decides where the verdict goes.
   - Paperclip-origin item → `_trigger_paperclip`: PATCH Paperclip issue to `done` (approve) / `todo` (reject) / note-only status unchanged (review).
   - Agent-origin item → try live-session injection (`plugins.entries.approval-inbox.allow_gateway_injection`, `_live_session_key` = most recent non-lazy session); on miss → `hermes kanban --board default create --assignee default --idempotency-key approval-{msg_id}` then bounded one-shot `hermes kanban --board default dispatch --max 1`.
8. Trigger failure is reported in the response but the decision is never voided.
**Panel file:** `desktop/plugin.js:616-660` (`_trigger_default`), `desktop/plugin.js:229-255` (`useDecide`), `desktop/plugin.js:588-595` (ConfirmDialog + approve mutate).
**Backend file:** `dashboard/plugin_api.py:943-1060` (decide), `:582-660` (_trigger_default), `:533-579` (_trigger_paperclip).

**Reject** (panel: textarea + `Send rejection` → `decide` 'reject')
1. Same validation chain (unknown→404, not-pending→409, version skip).
2. `agent-mail approve --decision reject` writes the verdict + note to the ledger; the item stays in the ledger with status `rejected` (not deleted).
3. Trigger: paperclip-origin → PATCH issue to `todo` with the note (returned to owner); agent-origin → live session inject, else board-card fallback.
**Panel file:** `desktop/plugin.js:784-793` (sendReject — close/clear only after server accepts).
**Backend file:** `dashboard/plugin_api.py:988-999` (decide reject path), `:533-579`.

**Review / "Add review"** (panel: `add review` button, async two-step → `decide` 'review') — a NOTE, never a ruling.
1. Item stays `pending`; no decision record, no sidecar, no version change.
2. Paperclip-origin → `REVIEW NOTE` comment on the Paperclip issue (no status field).
3. Agent-origin → injected into the live session as a note.
**Panel file:** `desktop/plugin.js:795-803` (sendReview), `:967-987` (review branch in decide).
**Backend file:** `dashboard/plugin_api.py:967-987`.

**Re-get / rework (Retry Studio)** (panel: `Request new version` → `handleRetrySubmit`)
1. `decide` 'reject' with note `Re-get requested: ${retryNote}`.
2. `rest('/submit')` with `subject: Re-get: <subject>`, `artifact.version = curVer + 1` (version incremented), hash/preview/next_action carried over.
3. New pending item appears in the inbox.
**Panel file:** `desktop/plugin.js:805-840`; **backend file:** `dashboard/plugin_api.py:756-806` (submit).

**State transitions**
```
pending → approved   (decision=approve, version sidecar written, trigger dispatched)
pending → rejected   (decision=reject, no sidecar, item retained, note returned to owner)
pending → reget      (reject whose note mentions re-get/rework/retry)
pending → pending    (review leaves status untouched; decision=none, note only)
```

---

## 4. Explicit yes/no: does SiYuan appear anywhere in the code?

**NO.**

Grep command and output:
```
$ grep -rin SiYuan /tmp/approval-audit
/tmp/approval-audit/README.md:7:Approvals live in the Desktop inbox (this plugin). There is no SiYuan
dependency and no external approval authority.

$ grep -ric SiYuan /tmp/approval-audit
/tmp/approval-audit/README.md:1   (every other file, incl. desktop/plugin.js, dashboard/plugin_api.py,
dashboard/manifest.json, __init__.py, tools/ci.sh, tests/* — 0 occurrences)
```

---

## 5. Explicit yes/no: does content-hash gating appear?

**NO.**

Grep command and output:
```
$ grep -rin content-hash /tmp/approval-audit
(no matches outside .git internals; 0 in all source and docs files)

$ grep -ric content-hash /tmp/approval-audit
(all files 0)
```

What the code actually does instead: `sha256` of each attachment is computed and stored in the manifest (`"sha256": hashlib.sha256(raw).hexdigest()`) and `artifact.hash` is echoed through from the submit payload into `item.artifact.hash`. Nothing verifies a content hash against persisted bytes, and there is no content-addressable gating — `artifact.hash` is metadata only, never compared to stored content. The real gate is magic-byte sniffing (`_sniff`: PNG/jpeg/gif/webp/mp4/webm/pdf root-element checks) plus base64 validity plus size caps.

---

## 6. What is stubbed, unfinished, or hardcoded

- **Prototype; Desktop install/activation held pending design review** — `docs/COVERAGE-MAP.md` line 3: "prototype; Desktop install/activation held pending design review."
- **External OAE (email) copy is best-effort.** A locally-delivered request never 500s: on nonzero rc and a local ledger hit, it returns an `oae_warning` and stores the files. `dashboard/plugin_api.py:789-801` (`submit`).
- **Trigger dispatch is a best-effort bounded one-shot tick.** `dispatch --max 1` runs once; there is no daemon watching the kanban board. A created task stays in `todo` until something dispatches it, and dispatch trouble is reported, never voids the decision. (`dashboard/plugin_api.py:640-655`)
- **No content-hash gating** — artifact hash is metadata only; nothing verifies bytes against hash (see §5).
- **`register()` is a no-op for core agent tools** — the plugin does not register tools/hooks/middleware; its surfaces are the dashboard API router + desktop renderer. `plugin.yaml` carries an empty `capabilities` block; `dashboard/plugin_api.py` deliberately avoids a hard import of the gateway runtime (`tui_gateway.server` resolved lazily, `_live_session_key`).
- **Hardcoded defaults:** `_HERMES_BIN_CANDIDATES` (two absolute `hermes` paths), `APPROVAL_INBOX_BOARD = "default"`, `HERMES_HOME` default `/home/euphoria/euphoria-v2/.hermes`, spend `ceiling_usd = 22.0`, max inline limits (8MB image, 20MB video).
- **Attachment policy:** `ALLOWED_TYPES` whitelist (images, video, pdf, md, html); content-sniffing, size caps.
- **Panel save-door** (`doorByFile`) is keyed by file name and captured per preview read; the native `captureGatewayFileDownload` SDK door is used so the save always streams the gateway's own persisted path through the Electron bridge.
- **No content-hash gating appears anywhere** (§5).

---

## 7. Evidence of tests or a real run

- `bash tools/ci.sh` (README CI): pytest → VERSIONS_OK → ESM_OK → UI smoke → `hermes plugins validate` → CI PASS.
- Real run (venv python with `hermes_cli` installed):
  ```
  $ python -m pytest tests/ -q -p no:cacheprovider
  ..............................................................  [100%]
  35 passed in 1.22s
  ```
- Earlier captured run (`tests/last-run.txt`): `...... [100%] 6 passed in 0.41s`.
- UI smoke (Node):
  - `surface-check.mjs` → 0 missing from proven surface, 0 quoted-area fails, 0 stringified bodies.
  - `load-smoke.mjs` → `REGISTER-OK areas: ["routes","sidebar.nav","palette"]`.
  - `render-check.mjs` → `RENDER-CHECK-OK: rows, formats, statuses, group headers, URL schemes, the PDF save and reader all verified on the rendered tree`.
  - `action-check.mjs` → `ACTION-CHECK-OK: 34 controls pressed and asserted (34 passed)`.
- ESM gate: `node --input-type=module --check < desktop/plugin.js` → `ESM_OK`.
- Version sync: `plugin.yaml=0.9.8 manifest=0.9.8 plugin.js=0.9.8` → `VERSIONS_OK`.

---

## 8. Limitations

- **Live-session injection is opt-in and fail-closed.** Decision delivery prefers the Founder's live session only when `plugins.entries.approval-inbox.allow_gateway_injection` is `true`; otherwise decisions fall back to the board card.
- **4 live-session tests fail under the system python** (`ModuleNotFoundError: hermes_cli`) but **35 pass under the project venv** (the real CI target).
- **Dispatch is best-effort** — no daemon watches the kanban board; a created task sits in `todo` until dispatched, and dispatch trouble is reported, never voids the decision.
- **No content-hash gating** — a stale or tampered `artifact.hash` is stored and echoed but never verified against bytes (§5).
- **Paperclip config is read from env/.env at trigger time** and a missing `PAPERCLIP_API_URL`/`PAPERCLIP_COMPANY_ID` parks the verdict on disk (`outbound-verdicts/*.json`) instead of losing it.
- **`approvals.jsonl` keeps only the last decision per msg_id** (`_decisions_by_msg`); the panel's `_requests` derives status/state from those decisions.
- **Plugin is a prototype**; Desktop install/activation held pending design review.

---

## 9. Portfolio claims vs. what the code actually supports

| Claim | Verdict | Evidence |
|---|---|---|
| A single Desktop approval inbox for the Founder is the only human-review surface; specialists never contact the Founder | **Supported** | README.md; `desktop/plugin.js` registers route `PAGE_PATH='/approval-inbox'` in ROUTES_AREA |
| Approvals are routed through the default agent only | **Supported** | `dashboard/plugin_api.py:582-660` (_trigger_default) always wakes `kanban --assignee default`; no specialist path in code |
| "There is no SiYuan dependency" | **Supported** | grep `SiYuan` → README.md:7 only; zero occurrences in source files |
| Content-hash gating prevents tampered artifacts | **Unsupported** | grep `content-hash` → 0 matches; artifact.hash is metadata-only, nothing verified against bytes |
| Reject deletes the item | **Unsupported** | reject path leaves item in ledger with status `rejected`; test_reject_no_sidecar asserts item still exists |
| Review changes item status | **Unsupported** | review is a NOTE; status stays `pending` (`dashboard/plugin_api.py:967-987`) |
| Approve records version sidecar + wakes default agent | **Supported** | `approved_versions.jsonl` written and `_trigger_default` dispatches via kanban |
| Files stored per msg_id under `work/approval-inbox/files/` | **Supported** | `FILES_DIR` env default; `_store_attachments` writes per msg_id; `/files/{msg_id}/{name}` serves them |
| Panel live-session injection is opt-in fail-closed | **Supported** | `_gateway_injection_allowed` reads `allow_gateway_injection: true` config; defaults false (`dashboard/plugin_api.py:348-359`) |
| Paperclip-origin verdicts are answered in Paperclip | **Supported** | `_origin_of` + `_trigger_paperclip` (`EUP-\d+` work_id → PATCH issue: done/todo/note-only) |
| Trigger failure voids the decision | **Unsupported** | `_trigger_default` failure returns reason; decision already recorded; tests assert trigger failures never raise (`test_trigger_failure_never_raises`) |
| External email copy is required for the inbox to work | **Unsupported** | local delivery always succeeds; a failed OAE copy returns `oae_warning`, not 500 |
| Sync with an external approval authority (SiYuan) is part of scope | **Unsupported** | Repo explicitly "no external approval authority" |

---

STATUS: DONE
