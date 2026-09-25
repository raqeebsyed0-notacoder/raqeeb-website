import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getProject, getNextProject, getPreviousProject, getCategoryBySlug } from '../data/portfolio'
import { ArrowLeft, ArrowRight, ExternalLink } from 'lucide-react'
import { PDFDeckViewer } from '../components/pdf-deck-viewer'

export default function ProjectDetailPage() {
  const { category, slug } = useParams<{ category: string; slug: string }>()
  const project = getProject(category || '', slug || '')
  const next = project ? getNextProject(project) : null
  const prev = project ? getPreviousProject(project) : null

  if (!project) {
    return (
      <PageLayout>
        <p className="text-white/60">Project not found.</p>
        <Link to="/projects" className="text-red-500 hover:text-red-400 mt-4 inline-block">← Back to projects</Link>
      </PageLayout>
    )
  }

  const categorySlug = category || project.category
  const categoryInfo = getCategoryBySlug(categorySlug)
  const categoryTitle = categoryInfo?.title || project.category.replace(/-/g, ' ')

  const isPdf = project.mediaTypes.includes('pdf')

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
          {project.client && (
            <p className="text-lg text-white/60">{project.client}</p>
          )}
          {project.description && (
            <p className="text-base text-white/70 mt-4 max-w-2xl">{project.description}</p>
          )}
        </div>

        {/* Live site preview — front page visible, click opens full site */}
        {project.liveUrl && project.liveFront && (
          <div className="mb-12">
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800 hover:border-white/30 transition-colors"
            >
              <div className="overflow-hidden">
                <img
                  src={project.liveFront}
                  alt={`${project.title} live front page — click to open full site`}
                  className="w-full h-auto object-cover object-top aspect-[16/10] group-hover:scale-[1.01] transition-transform duration-500"
                />
              </div>
              <div className="flex items-center justify-between px-5 py-4">
                <span className="text-sm text-white/60">Live front page — click to open the full website</span>
                <span className="flex items-center gap-2 text-sm text-white group-hover:text-red-400 transition-colors">
                  Visit live site <ExternalLink className="w-4 h-4" />
                </span>
              </div>
            </a>
            {project.liveUrls && project.liveUrls.length > 0 && (
              <div className="flex flex-wrap gap-3 mt-4">
                {project.liveUrls.map((v) => (
                  <a
                    key={v.url}
                    href={v.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 text-sm text-white/70 hover:text-white border border-white/20 hover:border-white/40 rounded-lg bg-neutral-900 hover:bg-neutral-800 transition"
                  >
                    {v.label} <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Media rendering */}
        {isPdf ? (
          <PDFDeckViewer
            slides={project.media.map((src, i) => ({ id: i, image: src, alt: `${project.title} page ${i + 1}` }))}
            ratio={project.pdfRatio || '16/9'}
          />
        ) : (
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6">
            {project.media.map((src, i) => (
              <div key={i} className="mb-6 break-inside-avoid rounded-xl overflow-hidden bg-neutral-950 border border-neutral-800">
                <img
                  src={src}
                  alt={`${project.title} ${i + 1}`}
                  className="w-full h-auto block"
                />
              </div>
            ))}
          </div>
        )}

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
