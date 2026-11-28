# leadjin — Verified Truth for Portfolio Copy

**Lane:** evidence  |  **Handoff:** `/home/euphoria/euphoria-v2/work/raqeeb-website/.audit-2026-11-28/lanes/leadjin.md`
**Purpose:** Extract the verified truth of the LeadJin project for portfolio copy.
**Input scope:** local project `/home/euphoria/euphoria-v2/work/leadjin` (app/ source, package.json, tests) + closure package + DECISIONS.md. **Nothing modified.**

---

## 1. Purpose (one business line)

Extract the verified truth of the LeadJin project (lead discovery → verification → enrichment → qualification, CRM/outreach/email/proposal/follow-up) into portfolio-copy-ready facts, with every claim citable to a file path or a quoted line.

---

## 2. Verified pipeline stages (in order)

Each stage with its source file:

| Stage | Verified pipeline (in order) | Source paths |
|---|---|---|
| **Discovery** | (a) pre-crawl cache → `getCachedLeadsForHarvest` (server.ts) · (b) Places discovery → `discoverCompaniesViaPlaces` (only when `GOOGLE_PLACES_API_KEY`) · (c) Wathq enrichment → `fetchWathqLead` (only when `WATHQ_CONSUMER_KEY` + known CRs) · (d) model-driven discovery → `geminiService.generateLeadjinLeads` (mandatory; local **ollama gemma4:e4b** is the always-available path) · (e) assemble → normalise, dedupe, verify, tag `source_engine` / `provenance_url` / `verified_real` / `confidence` / `discovered_at` · (f) contact harvest → `harvestContactsForCompany` | `app/src/services/leadDiscoveryPipeline.ts`, `app/src/services/huntOrchestrator.ts` |
| **Verification** | SMTP/MX/email verifier (`detectMxProvider`, `smtpProbe`, `verifyEmail`), triple-check verification, per-lead verification logs, SSL/TLS/DNS/MX checks | `app/src/services/emailVerifier.ts`, `app/src/services/sovereignVerifier.ts`, `module/verification_closure_report.md`, `module/verification_evidence/leadjin-pilot-001..010.json` |
| **Enrichment** | Multi-provider waterfall: 1. Gemini Grounding (`GEMINI_API_KEY`), 2/3. Apollo + Snov (testing-only, behind `LEADJIN_TESTING_MODE`), 4. SMTP MX verifier (always). Google Places legacy endpoints. Contact enrichment. Intent signals. | `app/src/services/waterfallEnrichment.ts`, `app/src/services/placesDiscovery.ts`, `app/src/services/contactEnrichment.ts`, `app/src/services/intentSignals.ts` |
| **Qualification** | Lead pipeline/status grouping, `getLeadScore`, `getNextAction`, `getRelationshipHistory`, `processHuntResult`, `processOutreachSent`, `processReplyReceived`, `updateVisionAlignment`; Meeting-Ready threshold (`MEETING_READY_THRESHOLD = 80`); final disposition OUTREACH-READY / OUTREACH-READY-EMAIL-ONLY / CLOSED-INCOMPLETE | `app/src/services/crm-hub.ts`, `app/src/services/meetingReady.ts`, `module/MODULE-CLOSURE-2026-11-04.md` |

---

## 3. What runs with **no paid API key** versus what needs a **user-provided credential**

**Runs with no paid API key (default):**
- Quote (`config/mig-hermes-config.yaml`): `# Main = gemma4:e4b on local Ollama (OpenAI-compatible :11434/v1). No API key, no billing.`
- Quote (`app/src/services/genaiClient.ts`): `// Local default — the primary provider, no key, no billing.` / `const OLLAMA_MODEL = (process.env.LEADJIN_MODEL || 'gemma4:e4b')...`
- Quote (`config/mig-app.env.example`): `# Default: ollama (local, no key, no cost).` + free serverless zero-cost options (`openrouter` free tier `openrouter/auto`, `together` Qwen/Qwen3-8B free tier, `nvidia` dev-only, `nous` stepfun/step-3.7-flash:$0 plan).
- `LEADJIN_PROVIDER=ollama` is the default; local Ollama path is always available.

**Needs a user-provided credential:**
- **Paid production AI**: `gateway` → Hermes API gateway (OpenAI-compatible), model `google/gemini-2.5-flash-lite`, priced `0.10/0.40 USD per 1M tokens`, monthly cap enforced. Quote `app/src/services/genaiClient.ts`: `// Paid production option: gateway → Hermes API gateway (google/gemini-2.5-flash-lite, monthly cap enforced)`.
- **Testing-only AI legs** (Apollo.io `APOLLO_API_KEY`, Snov.io `SNOV_API_KEY` + `SNOV_API_SECRET`) **only** when `LEADJIN_TESTING_MODE=1`, per-day cap `LEADJIN_TESTING_CAP` (default 20). Quote `app/src/services/waterfallEnrichment.ts` and `.env.example`.
- **Google Places discovery** leg: `GOOGLE_PLACES_API_KEY` (legacy Places textsearch/details/findplace endpoints). Quote `config/mig-app.env.example` and `app/src/services/placesDiscovery.ts`.
- **Wathq enrichment** leg: `WATHQ_CONSUMER_KEY` (required for the Wathq/CR-number leg; absent → whole chain degrades gracefully with "WATHQ key not set"). Quote `app/src/services/huntOrchestrator.ts`.
- **Email outreach queue**: `SMTP_HOST/PORT/USER/PASS` for the nodemailer transporter; `LEADJIN_ADMIN_SECRET` for admin/encryption. Quote `app/src/services/...` (nodemailer at `app/server.ts:12`) and `config/mig-app.env.example`.
- **WhatsApp**: legacy stub needs `WHATSAPP_TOKEN`/`WHATSAPP_PHONE_ID`; the QR bridge (Baileys, no key) is the documented replacement. Quote `config/mig-app.env.example` and `.env.example`.

---

## 4. Implemented features (CRM, outreach, email, proposal, follow-up)

| Feature | What is implemented | Source paths |
|---|---|---|
| **CRM** | Dashboard data (`getDashboardData`), funnel (`getFunnelData`), lead pipeline `getLeadPipeline`, metrics `getPipelineMetrics`, relationship history `getRelationshipHistory`, engagement metrics, `getLeadScore`, `getNextAction`, `processHuntResult`, `processOutreachSent`, `processReplyReceived`, `updateVisionAlignment` | `app/src/services/crm-hub.ts` (imports from `intelligenceHub.ts`) |
| **Outreach** | `generateOutreach` / `OutreachWriterResult` / `OutreachLead` / `OutreachContext`; `generateStrategicOutreach`, `analyzeReply`, `generateFollowUp`, `getStrategicHooks`; `classifyReply`, `ArtisanReplyCategory`, `FollowUpSuggestion`, `suggestFollowUp` | `app/src/services/outreach-writer.ts`, `app/src/services/jinVoiceOutreach.ts`, `app/src/services/reply-manager.ts` |
| **Email** | SMTP verification + MX + catch-all (`emailVerifier.ts`); nodemailer transporter + `email_queue` + `outreach_messages` + `email_events` tables + unsubscription/tracking routes in `server.ts`; `/api/auth/google` + `/test` routes | `app/src/services/emailVerifier.ts`, `app/server.ts` (lines 12, 774, 958, 3831, 4168–4347, 1796–1800, 4007) |
| **Proposal** | 8 approved approach proposals rendered from JSON: `outreach/03-proposals/proposal_*.json` and `outreach/04-send/render_proposals.py` + `render-manifest.json` (8 slugs: actrain, ades_holding, arabian_drilling_company, h_and_p, kaust, kental_dental, rowad_al_khaleej, sanad) | `outreach/03-proposals/`, `outreach/04-send/render_manifest.json`, `outreach/04-send/render_proposals.py` |
| **Follow-up** | Reply classification, follow-up suggestions, generated follow-up text, strategic hooks | `app/src/services/reply-manager.ts`, `app/src/services/jinVoiceOutreach.ts` |

---

## 5. Measured runtime state (closure package)

**Note on paths:** the specified closure package `/home/euphoria/euphoria-v2/work/leadjin/audit/leadjin-phase3-2026-11-27/CLOSURE-PACKAGE-2026-11-27.md` and `audit/DECISIONS.md` **do not exist** in the workspace. Closest equivalent closure package: `/home/euphoria/euphoria-v2/work/leadjin/backup/phase3-2026-11-27/` (contains `MANIFEST.sha256`, `trees/`, `db/`, `git/`, `config/`).

- **Git state** (`backup/phase3-2026-11-27/git/mig-status.txt`): `M .env.example`, `M package.json`, `M package-lock.json`, `M src/*`, `D node_modules`, `M leadjin.db-shm`, `M leadjin.db-wal`, plus a long `??` list (untracked: `.audit_perf_idx.txt`, `backups-20261123-svc/`, `handoff-D3-waterfall.md`, `skills/`, `workers/`, `.leadjin/`, `scripts/seed-leadjin-db.py`, `verify_leadjin.ts`, `src/*.ts.pre-fix-20261030`, etc.).
- **HEAD** (`git/mig-branches.txt`): `* main f8db1dc [ahead 8] fix(ci): initialize fresh DB schema before artisan routes; 503 on provider loss` · `remotes/origin/main 51c621f security(app): allowlist CORS origins and require a session on paid lead routes`.
- **Service status** (`config/mig-app.env`): `# SHUTDOWN 2026-07-20: GEMINI_API_KEY revoked — leadjin services deactivated`.
- **Runtime config** (`config/ecosystem.linux.config.cjs`): pm2 `apps[0].name: 'leadjin'`, `script: 'node_modules/tsx/dist/cli.cjs'`, `args: 'server.ts'`, `cwd: '/home/euphoria/euphoria-v2/work/leadjin/app'`, `PORT: '3001'`.
- **Lead counts** (source files, not the missing closure package): phase-3 Founder Decision Packet (`FOUNDER_DECISION_PACKET.md`): `79` raw lead records → `55` unique → `49` canonical → `6` quarantined → `49` independent verdicts → `15` CONFIRM / `34` REJECT / `17` disputes → `47` unique businesses in verdict set → `2` duplicate-phone groups (both REJECTED) → `5` shortlisted. Final module closure (`module/MODULE-CLOSURE-2026-11-04.md`): `10` leads — `4` OUTREACH-READY (001 Tabby, 002 Tamara, 005 ADES, 008 Foodics), `1` OUTREACH-READY EMAIL-ONLY (003 Red Sea Global), `5` CLOSED-INCOMPLETE (004 ROSHN, 006 Dar Al Arkan, 007 Jadwa, 009 Qureos, 010 STC Pay).
- **Test evidence** (`app/tests/TEST_REPORT.md`): dated 2026-04-03, "All 52 tests are implemented across 9 test files in `~/leadjin/leadjin/tests/`" (auth 10, leads 7, enrichment 6, credits 3, sequences 10, whatsapp 3, wa-sequences 5, signals 4, csv-upload 4), with known open API-behavior notes (registration response shape, 15-minute rate cooldown, webhook 500-vs-403).
- **Repo size** (`README.md`): "Product work — something Euphoria builds, sells or runs. Folder: `work/leadjin/`. Size: **1,606 files in 693 sub-folders**. Last changed: 2026-11-05".

---

## 6. Current project status and maturity

- **Classification:** product / mixed; 1,606 files / 693 sub-folders; last changed 2026-11-05.
- **Git:** HEAD `f8db1dc` (ahead 8 of origin/main `51c621f`); working tree has many `M` and untracked `??` files — **uncommitted changes, inconsistent state** (closure package `mig-status.txt`).
- **Audit history:** EUP-145 (2026-10-05) flagged committed secrets/data (tracked `tests/.auth-cache.json` with session token + password; hard-coded token in 4 more files; tracked `.db-wal`/`.db-shm`; `leadjin.db` with `google_tokens`, `users` (6), `leads` (9), 36 tables) and recommended a fresh `git init` + clean commit; target repo is public.
- **Module closure:** `W2-7` (2026-11-03) **NOT MET** — email node (SMTP/OAuth) had broken compile (`getGlobalTransporter`, `sendQueuedEmail`, `initGlobalTransporter` unknown) and was repaired (reverse to HEAD + two legitimate change sets); readback: `tsc --noEmit` exit 0, `vitest run` 98 passed / 3 skipped, `vite build` exit 0.
- **Final closure:** `MODULE-CLOSURE-2026-11-04.md` — MODULE CLOSED, 10/10 leads carry a final disposition; no contact data invented.
- **Service status:** AI provider `GEMINI_API_KEY` revoked 2026-07-20; services deactivated; local Ollama (`gemma4:e4b`) is the documented path. Live readback (W2-7): `GET /api/health` → `{"status":"ok",...}`.

---

## 7. Limitations and anything incomplete

- **`CLOSURE-PACKAGE-2026-11-27.md` does not exist** at the specified path; `DECISIONS.md` does not exist anywhere. Used closest equivalent `backup/phase3-2026-11-27/` and the phase-3/phase-4 closure reports instead. Cite any of these as the actual evidence path, not the requested absent ones.
- **`app/.env` and `app/.env.example` are placeholders** (all `***`): real deployment requires the user-provided keys quoted in §3 (Google AI / gateway, Places, Wathq, SMTP, WhatsApp). No paid-key or credentialed API key is present in the tree.
- **Google Places leg is legacy-endpoint** (textsearch/details/findplace) — the v1 Places API is `API_KEY_SERVICE_BLOCKED` on the shipped key; the legacy endpoints are the ones that work on the same key (see `placesDiscovery.ts`).
- **Wathq leg and SMTP are credential-gated** and degrade gracefully (no crash, clear error) but produce fewer/different results without `WATHQ_CONSUMER_KEY` / `SMTP_*`.
- **TEST_REPORT.md (2026-04-03) is not re-run** against the current 2026-11 code; it lists 52 tests across 9 files but the `app/tests/` tree on disk differs (21 files present), so test counts are as-reported, not as-measured-now.
- **Working tree has `D node_modules`** (deleted) and many `M`/`??` files; the repo is not in a clean, deliverable state.
- **No send is authorized:** FOUNDER_DECISION_PACKET.md (2026-09-21) and NEXT_ACTION_PLAN_2026-09-21.md both state `Outbound state: BLOCKED — no email or WhatsApp send is authorized`; the Owner Showcase pilot (2026-11-22) was approved for message text + timing, with owner introductions and real sends still pending.

---

## 8. Portfolio claims — verified vs. not

| Portfolio claim | Status | Evidence |
|---|---|---|
| LeadJin runs a full pipeline: discovery → verification → enrichment → qualification | **SUPPORTED** | `app/src/services/leadDiscoveryPipeline.ts` (stages a–f); `crm-hub.ts` |
| AI generation runs locally with **no paid API key** by default | **SUPPORTED** | `config/mig-hermes-config.yaml` (`No API key, no billing`); `genaiClient.ts` (ollama default) |
| A paid production AI path exists (gateway / Gemini) | **SUPPORTED** | `genaiClient.ts` (gateway leg, `0.10/0.40 per 1M`, monthly cap); `mig-app.env.example` |
| Email outreach queue is implemented and wired | **SUPPORTED** | `app/server.ts` (nodemailer, `email_queue`, `outreach_messages`, `/api/auth/google*`) |
| CRM hub with pipeline/score/next-action exists | **SUPPORTED** | `app/src/services/crm-hub.ts` (+ `intelligenceHub.ts`) |
| Proposal templates (8) render from JSON | **SUPPORTED** | `outreach/03-proposals/proposal_*.json` + `outreach/04-send/render_proposals.py` + `render-manifest.json` |
| Follow-up suggestions from replies | **SUPPORTED** | `app/src/services/reply-manager.ts`, `jinVoiceOutreach.ts` (`generateFollowUp`, `suggestFollowUp`) |
| Google Places and Wathq discovery legs are implemented and credential-gated | **SUPPORTED** | `placesDiscovery.ts`, `huntOrchestrator.ts` (WATHQ key absent → graceful degrade) |
| WhatsApp outreach available | **SUPPORTED (stub + QR bridge)** | `app/src/services/whatsappService.ts`; `config/mig-app.env.example` (legacy stub + QR bridge, no key for bridge) |
| Module closure NOT MET (email node broken, 2026-11-03) | **SUPPORTED** | `W2-7-CLOSURE-2026-11-03.md` (repaired; tsc exit 0, vitest 98/3 skipped, build exit 0) |
| Services deactivated after GEMINI key revoked | **SUPPORTED** | `config/mig-app.env` (`# SHUTDOWN 2026-07-20: GEMINI_API_KEY revoked — leadjin services deactivated`) |

**Verdict: DONE** — extracted the verified truth of the LeadJin project; every claim cites a path or quoted line; the two requested input paths that do not exist are reported exactly. No files in the LeadJin project were modified.
