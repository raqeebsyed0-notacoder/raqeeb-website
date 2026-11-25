# AI & Automation — live surface shots manifest

Scope: dag:ai-portfolio/live-shots — probes of the live AI surfaces, then screenshots of every
surface that answered HTTP 200 with real rendered content. Probes: `curl http://127.0.0.1:3000`,
`:3102`, `:4096`, `:3001`. Screenshots taken with Playwright 1.63.0 (devDependency of raqeeb-website).

Shot dir: `public/assets/ai/shots/` (relative paths below).

## Shot registry

| Card ID (surface key) | Surface | Port | HTTP | Rendered title (real content) | Shot path | Size |
|---|---|---|---|---|---|---|
| `raqeeb-portfolio@:3000` | Raqeeb Hussain portfolio frontend | 3000 | 200 | Sign in or Create an account | `raqeeb-portfolio-3000.png` | 15,963 B |
| `paperclip@:3102` | Euphoria Paperclip (agent platform) | 3102 | 200 | Dashboard • Euphoria • Paperclip | `paperclip-ui-3102.png` | 80,674 B |
| `leadjin@:3001` | LEADJIN \| Regional Intelligence (PWA) | 3001 | 200 | LEADJIN \| Regional Intelligence | `leadjin-3001.png` | 424,142 B |

## Open items (surfaces NOT reachable - no shot invented)

| Surface | Port | Probing result | Reason | Status |
|---|---|---|---|---|
| (unnamed) | 4096 | 302 Found → `/login?next=/` | Requires authentication; not a 200 | OPEN |
| `raqeeb-portfolio@:3000` (auth-gated path) | 3000 | 200, rendered "Sign in or Create an account" | Surface is live; the public root shows the auth UI | SEEN — screenshot above |

## Notes

- All three screenshots are valid PNGs (8-byte signature verified), full-page, 1280×900 viewport @1x.
- Manifest keys use live surface identifiers (`name@port`) because the eight project-card ids of the
  AI & Automation segment are assigned by the ai-portfolio card-build step (next DAG step), which is
  out of this subagent's SCOPE. The later step can remap card ids → these shot paths.
