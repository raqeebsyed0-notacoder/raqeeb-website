import { useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight, ExternalLink, Layers } from 'lucide-react'
import PageLayout from './PageLayout'
import { HTMLEmbedViewer } from './html-embed-viewer'
import { getAiProjects, getCategoryBySlug, type AiProject } from '../data/portfolio'

/** Poster frames ship beside each video as <video-basename>-poster.jpg. */
function demoPoster(videoUrl: string): string {
  return `${videoUrl.replace(/\.[^./]+$/, '')}-poster.jpg`
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-12">
      <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-white/40 border-b border-neutral-800 pb-3 mb-5">
        {title}
      </h2>
      {children}
    </section>
  )
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
  // Resolve against the current project so prev/next navigation cannot leave a stale viewer open.
  const activeDiagram = project.links.find((link) => link.url === activeDiagramUrl)
  const primaryDiagram = project.links.find((link) => link.type === 'diagram')

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto pb-16">
        <Link
          to={`/projects/${categorySlug}`}
          className="text-sm text-white/50 hover:text-white transition-colors mb-8 inline-block"
        >
          ← Back to {categoryTitle}
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3 py-1 text-xs font-mono uppercase tracking-wide text-red-400">
              <span className="h-1.5 w-1.5 rounded-full bg-red-400" />
              {project.status}
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
              {project.eyebrow}
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wide uppercase font-normal leading-[1.1] mb-5">
            {project.title}
          </h1>
          <p className="text-lg sm:text-xl text-white/70 max-w-3xl leading-relaxed">{project.lede}</p>
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-white/40 mt-5">{project.role}</p>
        </header>

        <Section title="How it works">
          <ul className="space-y-3">
            {project.how.map((item, i) => (
              <li key={i} className="flex gap-4 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:p-5">
                <span className="font-mono text-xs text-red-400 shrink-0 pt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="text-sm sm:text-base text-white/75 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Section>

        <Section title="My contribution">
          <p className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6 text-base text-white/75 leading-relaxed">
            {project.contribution}
          </p>
        </Section>

        <Section title="Verified at audit">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              What was checked at audit time
            </span>
            <p className="mt-3 text-base text-white/75 leading-relaxed">{project.verified}</p>
          </div>
        </Section>

        <Section title="Limits">
          <div className="rounded-xl border border-neutral-800 bg-neutral-950 p-5 sm:p-6">
            <p className="text-base text-white/75 leading-relaxed">{project.limits}</p>
          </div>
        </Section>

        <Section title="Architecture">
          {project.architecture && (
            <figure className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <img
                src={project.architecture}
                alt={`System architecture diagram for ${project.title}`}
                className="w-full h-auto block"
              />
              <figcaption className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-neutral-800">
                <span className="text-sm text-white/50">System architecture diagram</span>
                {primaryDiagram && (
                  <button
                    type="button"
                    onClick={() => setActiveDiagramUrl(primaryDiagram.url)}
                    className="inline-flex items-center gap-1.5 text-xs text-white/70 hover:text-white transition-colors"
                  >
                    Open interactive viewer <Layers className="w-3.5 h-3.5" />
                  </button>
                )}
              </figcaption>
            </figure>
          )}
          {project.screenshots.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {project.screenshots.map((src, i) => (
                <figure key={src} className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img
                    src={src}
                    alt={`${project.title} screenshot ${i + 1}`}
                    className="w-full h-auto block"
                  />
                  <figcaption className="px-4 py-2 border-t border-neutral-800 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Screenshot {i + 1}
                  </figcaption>
                </figure>
              ))}
            </div>
          )}
        </Section>

        <Section title="System links">
          {project.links.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {project.links.map((link) => {
                const isDiagram = link.type === 'diagram'
                const cardClass = 'group flex flex-col justify-between text-left p-5 aspect-[3.5/1] w-full overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950 hover:border-white/30 transition-all hover:bg-neutral-900/50'
                const content = (
                  <>
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 rounded-md px-2 py-0.5 text-[10px] uppercase tracking-widest font-mono bg-white/5 text-white/60 border border-white/10">
                        {isDiagram && <Layers className="w-3 h-3 text-red-400" />}
                        {link.type}
                      </span>
                      {isDiagram ? (
                        <span className="text-[10px] uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">
                          Open viewer ↗
                        </span>
                      ) : (
                        <ExternalLink className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
                      )}
                    </div>
                    <h3 className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                      {link.label}
                    </h3>
                  </>
                )
                return isDiagram ? (
                  <button
                    key={link.url}
                    type="button"
                    onClick={() => setActiveDiagramUrl(link.url)}
                    className={cardClass}
                  >
                    {content}
                  </button>
                ) : (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={cardClass}
                  >
                    {content}
                  </a>
                )
              })}
            </div>
          )}
          {activeDiagram && (
            <div className="mt-6 rounded-xl border border-neutral-800 bg-neutral-950 p-4 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <h3 className="text-sm font-semibold text-white">{activeDiagram.label}</h3>
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
        </Section>

        {project.demos.length > 0 && (
          <Section title="Demonstrations">
            <div className="space-y-6">
              {project.demos.map((demo, i) => (
                <figure
                  key={`${demo.label}-${i}`}
                  className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800"
                >
                  <figcaption className="px-5 py-3 border-b border-neutral-800 text-sm text-white/70">
                    {demo.label}
                  </figcaption>
                  <video
                    controls
                    src={demo.url}
                    poster={demoPoster(demo.url)}
                    preload="metadata"
                    aria-label={demo.label}
                    className="w-full aspect-[16/9] max-h-[320px] md:max-h-[360px] lg:max-h-[420px] object-cover block bg-black"
                    playsInline
                  />
                </figure>
              ))}
            </div>
          </Section>
        )}

        <Section title="Stack">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((item) => (
              <span
                key={item}
                className="rounded-lg border border-neutral-800 bg-neutral-950 px-3 py-1.5 text-sm text-white/70"
              >
                {item}
              </span>
            ))}
          </div>
        </Section>

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
