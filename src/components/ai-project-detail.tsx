import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Layers, BookOpen, CheckCircle2, Clock, Code2 } from 'lucide-react'
import PageLayout from './PageLayout'
import { HTMLEmbedViewer } from './html-embed-viewer'
import { getAiProjects, getCategoryBySlug, type AiProject } from '../data/portfolio'
import { seatSouls, skillContent } from '../data/agentContent'

/** The single standard pending state used for every demo slot without footage. */
const PENDING_DEMO_MESSAGE = 'Demo video coming soon — awaiting founder production footage'

/** Poster frames ship beside each video as <video-basename>-poster.jpg. */
function demoPoster(videoUrl: string): string {
  return `${videoUrl.replace(/\.[^./]+$/, '')}-poster.jpg`
}

/** Human-readable, content-descriptive label derived from an asset path. */
function assetAlt(projectTitle: string, assetPath: string): string {
  const name = (assetPath.split('/').pop() ?? '')
    .replace(/\.[^.]+$/, '')
    .replace(/[-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .trim()
  const kind = assetPath.includes('/diagrams/') ? 'diagram' : 'screenshot'
  return `${name || 'Project'} ${kind} for ${projectTitle}`
}

/** Verbatim SOUL.md text exported by the content build, keyed by seat id. */
const soulBySeat = new Map(seatSouls.map((s) => [s.id, s]))

/** Verbatim SKILL.md text exported by the content build, keyed by skill name. */
const skillByName = new Map(skillContent.map((s) => [s.name, s]))

/** Seat code extracted from the agent field (e.g. "sovereign (CEO & governance owner)" -> "sovereign"). */
function extractSeat(agent: string): string {
  return agent.split(' (').shift() ?? ''
}

/** Returns true when the seat has real SOUL text to reveal; otherwise the existing plain text is kept. */
function seatHasSoul(agent: string): boolean {
  return Boolean(soulBySeat.get(extractSeat(agent))?.content?.trim())
}

interface AiProjectDetailProps {
  project: AiProject
  categorySlug: string
}

export default function AiProjectDetail({ project, categorySlug }: AiProjectDetailProps) {
  const categoryTitle = getCategoryBySlug(categorySlug)?.title || 'AI & Automation'
  const allProjects = getAiProjects()
  const idx = allProjects.findIndex((p) => p.slug === project.slug)
  const prev = idx > 0 ? allProjects[idx - 1] : null
  const next = idx !== -1 && idx < allProjects.length - 1 ? allProjects[idx + 1] : null

  const [activeDiagramUrl, setActiveDiagramUrl] = useState<string | null>(null)
  // Looking the URL up against the current project keeps the viewer from
  // showing a stale diagram after prev/next navigation reuses this component.
  const activeDiagram = project.links?.find((link) => link.url === activeDiagramUrl)
  const primaryDiagram = project.links?.find((link) => link.type === 'diagram')

  const availableDemos = project.demos.filter((demo) => demo.url && demo.url.trim())
  const hasPendingDemos = project.demos.length > availableDemos.length

  return (
    <PageLayout>
      <style>{`
        :root {
          --hp-bg: #09090b;
          --hp-border: rgba(255,255,255,0.10);
          --hp-text: #fafafa;
          --hp-muted: #9ca3af;
          --hp-radius: 0.5rem;
          --hp-max-h: 320px;
          --hp-z: 50;
          --hp-backdrop: rgba(0,0,0,0.5);
        }
        .hp-panel {
          opacity: 0;
          pointer-events: none;
          transform: translateX(14px);
          transition: opacity 160ms ease, transform 160ms ease;
        }
        .group:hover > .hp-panel,
        .group:focus-within > .hp-panel {
          display: block;
          opacity: 1;
          pointer-events: auto;
          transform: translateX(0);
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        <Link to={`/projects/${categorySlug}`} className="text-sm text-white/50 hover:text-white transition-colors mb-8 inline-block">
          ← Back to {categoryTitle}
        </Link>

        {/* Hero section */}
        <div className="mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase font-normal leading-[1.2] mb-6">
            {project.title}
          </h1>
          <div className="flex flex-wrap items-center gap-4">
            <p className="text-lg text-white/60">{project.role}</p>
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs uppercase tracking-wide text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {project.status}
            </span>
          </div>
          <p className="text-base text-white/70 mt-4 max-w-3xl leading-relaxed">{project.summary}</p>
        </div>

        {/* Live Systems & Interactive Archify Diagrams */}
        {project.links && project.links.length > 0 && (
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Live Systems & Interactive Architecture</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.links.map((link) => {
                const isDiagram = link.type === 'diagram' && link.url.toLowerCase().endsWith('.html')
                const cardClass = 'group flex flex-col justify-between text-left p-5 aspect-[3.5/1] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 hover:border-white/30 transition-all hover:bg-neutral-900/50'
                const card = (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono bg-white/5 text-white/60 border border-white/10">
                        {link.type === 'diagram' && <Layers className="w-3 h-3 text-red-400" />}
                        {link.type === 'portal' && <Code2 className="w-3 h-3 text-emerald-400" />}
                        {link.type}
                      </span>
                      {isDiagram ? (
                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">Open viewer ↗</span>
                      ) : (
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                        {link.label}
                      </h3>
                      <p className="text-xs text-white/40 mt-1 font-mono truncate">
                        {link.url}
                      </p>
                    </div>
                  </>
                )
                return isDiagram ? (
                  <button key={link.url} type="button" onClick={() => setActiveDiagramUrl(link.url)} className={cardClass}>
                    {card}
                  </button>
                ) : (
                  <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" className={cardClass}>
                    {card}
                  </a>
                )
              })}
            </div>
            {activeDiagram && (
              <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="min-w-0">
                    <h3 className="text-sm font-semibold text-white">{activeDiagram.label}</h3>
                    <p className="text-xs text-white/40 font-mono mt-0.5 truncate">{activeDiagram.url}</p>
                  </div>
                  <div className="flex items-center gap-3 shrink-0">
                    <a
                      href={activeDiagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs text-white/60 hover:text-white transition-colors"
                    >
                      New tab <ExternalLink className="w-3 h-3" />
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveDiagramUrl(null)}
                      className="px-3 py-1 text-xs text-white/70 hover:text-white border border-white/20 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition"
                    >
                      ✕ Close viewer
                    </button>
                  </div>
                </div>
                <HTMLEmbedViewer src={activeDiagram.url} title={activeDiagram.label} />
              </div>
            )}
          </section>
        )}

        {/* Stack */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Stack</h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span key={item} className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-sm text-white/70">
                {item}
              </span>
            ))}
          </div>
        </section>

        {/* Architecture */}
        {project.architecture && (
          <section className="mb-6">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Architecture</h2>
            <figure className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={project.architecture}
                alt={assetAlt(project.title, project.architecture)}
                className="w-full h-auto block"
              />
              <figcaption className="flex items-center justify-between px-5 py-3 border-t border-neutral-800 text-sm text-white/50">
                <span>System architecture diagram</span>
                {primaryDiagram && (
                  <button
                    type="button"
                    onClick={() => setActiveDiagramUrl(primaryDiagram.url)}
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Open interactive viewer <Layers className="w-3 h-3" />
                  </button>
                )}
              </figcaption>
            </figure>
          </section>
        )}

        {/* Special Deep-Dive for Skills Library */}
        {project.slug === 'skills-library' && (
          <section className="mb-6 rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <BookOpen className="w-5 h-5 text-red-400" />
              <h2 className="text-lg font-semibold uppercase tracking-wide text-white">Skill Authoring & Governance Framework</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div className="p-4 rounded-lg border border-neutral-800/80 bg-neutral-900/40">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 block mb-2">01 / Specification</span>
                <h3 className="font-semibold text-white mb-1">Standardized SKILL.md</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Every skill encapsulates YAML frontmatter (name, trigger, version, tags) with rigorous step-by-step procedures, references, and validation scripts.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-neutral-800/80 bg-neutral-900/40">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 block mb-2">02 / Provenance</span>
                <h3 className="font-semibold text-white mb-1">Triple Provenance</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Maintained via upstream adaptation (<code className="text-white/80">UPSTREAM_MANIFEST.md</code>), seat projection (<code className="text-white/80">PROJECTION_MANIFEST.json</code>), and operational runbook capture.
                </p>
              </div>
              <div className="p-4 rounded-lg border border-neutral-800/80 bg-neutral-900/40">
                <span className="text-xs font-mono uppercase tracking-widest text-red-400 block mb-2">03 / Verification</span>
                <h3 className="font-semibold text-white mb-1">Curator Hygiene Gate</h3>
                <p className="text-white/60 text-xs leading-relaxed">
                  Automated curator sweeps eliminate stale instructions, enforce Rule 0 gates, and audit live tool usage across all agent seats.
                </p>
              </div>
            </div>
            {/* A9: roadmap-listed skills in the skills library have no SKILL.md yet */}
            <div className="mt-6 grid grid-cols-1 gap-6 text-sm">
              {project.skillDetails.filter((s) => s.status === 'roadmap').map((skill) => (
                <div key={skill.name} className="p-4 rounded-lg border border-amber-500/30 bg-amber-500/10">
                  <div className="flex items-center justify-between gap-3 mb-1">
                    <span className="font-mono text-xs font-semibold text-white">{skill.name}</span>
                    <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-amber-400">
                      <Clock className="w-2.5 h-2.5" /> Roadmap
                    </span>
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed">{skill.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Agent and skills */}
        <section className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="group relative">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Responsible Agent Seat</h2>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <h3 className="font-mono text-sm font-semibold text-white">{project.agent}</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Autonomous profile assigned to execute and govern this domain with bounded tool access and dedicated memory isolation.
              </p>
              {/* A6: SOUL.md reveal — verbatim text from agentContent */}
              {seatHasSoul(project.agent) && (() => {
                const soul = soulBySeat.get(extractSeat(project.agent))
                return (
                  <div
                    className="hidden hp-panel absolute right-0 top-0 z-[50] w-80 sm:w-96 max-h-[320px] overflow-y-auto rounded-lg border border-white/10 bg-neutral-950 p-4 shadow-2xl"
                    role="dialog"
                    aria-label={`SOUL.md for ${extractSeat(project.agent)}`}
                    style={{
                      backgroundColor: 'var(--hp-bg)',
                      borderColor: 'var(--hp-border)',
                      color: 'var(--hp-text)',
                      maxHeight: 'var(--hp-max-h)',
                      zIndex: 'var(--hp-z)',
                    }}
                  >
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-sm font-mono font-semibold text-white">{soul?.name ?? extractSeat(project.agent)}</span>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">SOUL.md</span>
                    </div>
                    <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-white/80">
                      {soul?.content}
                    </pre>
                  </div>
                )
              })()}
            </div>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Procedural Skills & Capabilities</h2>
            <div className="space-y-3">
              {project.skillDetails && project.skillDetails.length > 0 ? (
                project.skillDetails.map((skill) => (
                  <div
                    key={skill.name}
                    className="group relative rounded-xl border border-neutral-800 bg-neutral-950 p-4"
                  >
                    <div className="flex items-center justify-between gap-3 mb-1">
                      <span className="font-mono text-xs font-semibold text-white">{skill.name}</span>
                      {skill.status === 'installed' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-emerald-400">
                          <CheckCircle2 className="w-2.5 h-2.5" /> Installed
                        </span>
                      )}
                      {skill.status === 'roadmap' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-amber-500/30 bg-amber-500/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-amber-400">
                          <Clock className="w-2.5 h-2.5" /> Roadmap
                        </span>
                      )}
                      {skill.status === 'project' && (
                        <span className="inline-flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 text-[9px] uppercase tracking-widest text-blue-400">
                          Project Skill
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-white/70 leading-relaxed">{skill.description}</p>
                    {/* A5: SKILL.md reveal — verbatim text from agentContent */}
                    {skillByName.get(skill.name)?.content?.trim() ? (() => {
                      const source = skillByName.get(skill.name)
                      return (
                        <div
                          className="hidden hp-panel absolute right-0 top-0 z-[50] w-80 sm:w-96 max-h-[320px] overflow-y-auto rounded-lg border border-white/10 bg-neutral-950 p-4 shadow-2xl"
                          role="dialog"
                          aria-label={`SKILL.md for ${skill.name}`}
                          style={{
                            backgroundColor: 'var(--hp-bg)',
                            borderColor: 'var(--hp-border)',
                            color: 'var(--hp-text)',
                            maxHeight: 'var(--hp-max-h)',
                            zIndex: 'var(--hp-z)',
                          }}
                        >
                          <div className="flex items-center justify-between gap-2 mb-2">
                            <span className="text-sm font-mono font-semibold text-white">{skill.name}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-white/40">SKILL.md</span>
                          </div>
                          <pre className="whitespace-pre-wrap break-words font-mono text-xs leading-relaxed text-white/80">
                            {source?.content}
                          </pre>
                        </div>
                      )
                    })() : null}
                  </div>
                ))
              ) : (
                project.skills.map((skill) => (
                  <div key={skill} className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white/80 font-mono">
                    {skill}
                  </div>
                ))
              )}
            </div>
          </div>
        </section>

        {/* Demos */}
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Demonstrations & Video Telemetry</h2>
          {availableDemos.length === 0 ? (
            <div className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 p-8 text-center">
              <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
              <span className="text-sm font-medium tracking-wide text-white/70">{PENDING_DEMO_MESSAGE}</span>
            </div>
          ) : (
            <div className="space-y-6">
              {availableDemos.map((demo, i) => (
                <div key={`${demo.label}-${i}`} className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 text-sm">
                    <span className="font-semibold text-white/80">{demo.label}</span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Footage
                    </span>
                  </div>
                  <video
                    controls
                    src={demo.url}
                    poster={demoPoster(demo.url)}
                    preload="metadata"
                    aria-label={demo.label}
                    className="w-full aspect-[16/9] max-h-[320px] md:max-h-[360px] lg:max-h-[420px] object-cover block bg-black"
                    playsInline
                  />
                </div>
              ))}
              {hasPendingDemos && (
                <div className="rounded-xl bg-neutral-950 border border-neutral-800 p-6 text-center">
                  <Clock className="w-8 h-8 text-white/20 mx-auto mb-3" />
                  <span className="text-sm font-medium tracking-wide text-white/70">{PENDING_DEMO_MESSAGE}</span>
                </div>
              )}
            </div>
          )}
        </section>

        {/* Prev/Next navigation */}
        <div className="mt-16 flex items-center justify-between border-t border-neutral-800 pt-8">
          {prev ? (
            <Link
              to={`/projects/${categorySlug}/${prev.slug}`}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="text-sm uppercase tracking-wide">{prev.title}</span>
            </Link>
          ) : (
            <div />
          )}
          {next ? (
            <Link
              to={`/projects/${categorySlug}/${next.slug}`}
              className="flex items-center gap-3 text-white/60 hover:text-white transition-colors"
            >
              <span className="text-sm uppercase tracking-wide">{next.title}</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          ) : (
            <div />
          )}
        </div>
      </div>
    </PageLayout>
  )
}
