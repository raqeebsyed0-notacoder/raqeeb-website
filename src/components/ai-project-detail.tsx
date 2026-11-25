import { Link } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
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
          <p className="text-base text-white/70 mt-4 max-w-2xl">{project.summary}</p>
        </div>

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
              <figcaption className="px-5 py-3 text-sm text-white/50">System architecture</figcaption>
            </figure>
          </section>
        )}

        {/* Screenshots */}
        {project.screenshots.length > 0 && (
          <section className="mb-12">
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Screenshots</h2>
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
              {project.screenshots.map((src, i) => (
                <div key={i} className="mb-6 break-inside-avoid rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <img src={src} alt={`${project.title} screenshot ${i + 1}`} className="w-full h-auto block" />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Agent and skills */}
        <section className="mb-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Agent</h2>
            <ul className="space-y-2">
              <li className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white/80">
                {project.agent}
              </li>
            </ul>
          </div>
          <div>
            <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Skills</h2>
            <ul className="space-y-2">
              {project.skills.map((skill) => (
                <li key={skill} className="rounded-lg border border-neutral-800 bg-neutral-950 px-4 py-3 text-sm text-white/80">
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Demos */}
        <section className="mb-12">
          <h2 className="text-xs uppercase tracking-wide text-white/40 mb-4">Demos</h2>
          {project.demos.length === 0 ? (
            <div className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
              <div className="flex aspect-video items-center justify-center bg-neutral-900">
                <span className="text-sm tracking-wide text-white/50">Demo video coming soon</span>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {project.demos.map((demo, i) => (
                <div key={`${demo.label}-${i}`} className="rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                  <div className="px-5 py-3 border-b border-neutral-800 text-sm text-white/60">{demo.label}</div>
                  {demo.url ? (
                    <video controls src={demo.url} aria-label={demo.label} className="w-full h-auto block" />
                  ) : (
                    <div className="flex aspect-video items-center justify-center bg-neutral-900">
                      <span className="text-sm tracking-wide text-white/50">Demo video coming soon</span>
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
