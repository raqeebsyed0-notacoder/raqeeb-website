import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Layers, BookOpen, CheckCircle2, Clock, Code2 } from 'lucide-react'
import PageLayout from './PageLayout'
import { getAiProjects, getCategoryBySlug, type AiProject } from '../data/portfolio'

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

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <Link to={`/projects/${categorySlug}`} className="text-sm text-white/50 hover:text-white transition-colors mb-8 inline-block">
          ← Back to {categoryTitle}
        </Link>

        {/* Hero section */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase font-normal leading-[0.9] mb-6">
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
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Live Systems & Interactive Architecture</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.links.map((link) => (
                <a
                  key={link.url}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col justify-between p-5 rounded-xl border border-neutral-800 bg-neutral-950 hover:border-white/30 transition-all hover:bg-neutral-900/50"
                >
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono bg-white/5 text-white/60 border border-white/10">
                      {link.type === 'diagram' && <Layers className="w-3 h-3 text-red-400" />}
                      {link.type === 'portal' && <Code2 className="w-3 h-3 text-emerald-400" />}
                      {link.type}
                    </span>
                    <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                      {link.label}
                    </h3>
                    <p className="text-xs text-white/40 mt-1 font-mono truncate">
                      {link.url}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Stack */}
        <section className="mb-12">
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
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Architecture</h2>
            <figure className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={project.architecture}
                alt={`${project.title} architecture diagram`}
                className="w-full h-auto block"
              />
              <figcaption className="flex items-center justify-between px-5 py-3 border-t border-neutral-800 text-sm text-white/50">
                <span>System architecture diagram</span>
                {project.links?.find((l) => l.type === 'diagram') && (
                  <a
                    href={project.links.find((l) => l.type === 'diagram')?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Open interactive viewer <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </figcaption>
            </figure>
          </section>
        )}

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Screenshots & Workflows</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.screenshots.map((src, i) => (
                <div key={i} className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img src={src} alt={`${project.title} visual ${i + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Special Deep-Dive for Skills Library */}
        {project.slug === 'skills-library' && (
          <section className="mb-12 rounded-xl border border-neutral-800 bg-neutral-950/80 p-6 sm:p-8">
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
          </section>
        )}

        {/* Agent and skills */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Responsible Agent Seat</h2>
            <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                <h3 className="font-mono text-sm font-semibold text-white">{project.agent}</h3>
              </div>
              <p className="text-xs text-white/50 leading-relaxed">
                Autonomous profile assigned to execute and govern this domain with bounded tool access and dedicated memory isolation.
              </p>
            </div>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Procedural Skills & Capabilities</h2>
            <div className="space-y-3">
              {project.skillDetails && project.skillDetails.length > 0 ? (
                project.skillDetails.map((skill) => (
                  <div key={skill.name} className="rounded-xl border border-neutral-800 bg-neutral-950 p-4">
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
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Demonstrations & Video Telemetry</h2>
          {project.demos.length === 0 ? (
            <div className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 p-8 text-center">
              <span className="text-sm tracking-wide text-white/50">Demo video coming soon — awaiting founder production footage</span>
            </div>
          ) : (
            <div className="space-y-6">
              {project.demos.map((demo, i) => (
                <div key={`${demo.label}-${i}`} className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <div className="flex items-center justify-between px-5 py-3 border-b border-neutral-800 text-sm">
                    <span className="font-semibold text-white/80">{demo.label}</span>
                    {demo.url ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Verified Footage
                      </span>
                    ) : (
                      <span className="text-xs text-white/40">Slot active — pending footage</span>
                    )}
                  </div>
                  {demo.url ? (
                    <video
                      controls
                      src={demo.url}
                      aria-label={demo.label}
                      className="w-full h-auto block bg-black"
                      playsInline
                    />
                  ) : (
                    <div className="flex flex-col aspect-video items-center justify-center bg-neutral-900/60 p-6 text-center">
                      <Clock className="w-8 h-8 text-white/20 mb-3" />
                      <span className="text-sm font-medium tracking-wide text-white/70">Demo video coming soon</span>
                      <p className="text-xs text-white/40 mt-1 max-w-sm">
                        Production screen capture slot reserved; awaiting live deployment recording.
                      </p>
                    </div>
                  )}
                </div>
              ))}
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
