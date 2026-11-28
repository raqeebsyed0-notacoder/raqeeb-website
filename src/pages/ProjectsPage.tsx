import { aiProjects } from '../data/ai-projects'
import { projects, categories } from '../data/portfolio'
import PageLayout from '../components/PageLayout'
import { Link } from 'react-router-dom'

const categoryGridColumns: Record<string, string> = {
  'brand-identity': 'grid-cols-1 sm:grid-cols-2',
  'presentation-design': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
  'social-media': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3',
  'websites': 'grid-cols-1 sm:grid-cols-2 md:grid-cols-4',
}

const designCategories = categories.filter((c) => c.id !== 'ai')

export default function ProjectsPage() {


  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-wide uppercase font-normal leading-[0.9]">
            WORK
          </h1>
          <p className="mt-4 max-w-3xl text-lg text-white/80">
            Eight AI systems and twenty-five design projects. The AI work is the
            current practice. The design work is the foundation it stands on.
          </p>
        </div>









        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">AI &amp; Automation</h2>
            <Link
              to="/projects/ai"
              className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiProjects.map((p) => (
              <Link
                key={p.slug}
                to={`/projects/ai/${p.slug}`}
                className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] transition-all hover:border-white/30 hover:bg-neutral-950"
              >
                <div className="aspect-video overflow-hidden bg-neutral-900 relative">
                  <img
                    src={p.architecture}
                    alt={`${p.title} architecture diagram`}
                    className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                      {p.title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-white/50 border border-white/10 rounded px-2 py-0.5">
                      {p.status}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{p.role}</p>
                  <p className="mt-2 text-sm text-white/70 line-clamp-2">
                    {p.lede}
                  </p>

                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {p.links?.map((link) =>
                      link.type === 'repo' ? (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener"
                          className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
                          </svg>
                          {link.label}
                        </a>
                      ) : (
                        <a
                          key={link.label}
                          href={link.url}
                          className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                        >
                          <svg
                            width="14"
                            height="14"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <polygon points="5 3 19 12 5 21 5 3" />
                          </svg>
                          {link.label}
                        </a>
                      )
                    )}
                    {p.demos?.filter((d) => d.url).map((demo) => (
                      <a
                        key={demo.label}
                        href={demo.url}
                        className="flex items-center gap-1.5 text-xs text-red-400 font-medium"
                      >
                        <svg
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                        {demo.label}
                      </a>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Design projects — grouped by the four design categories */}
        {designCategories.map((category) => {
          const categoryProjects = projects.filter(
            (p) => p.category === category.id
          )
          return (
            <section key={category.id} className="mb-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl tracking-wide uppercase font-normal">
                  {category.title}
                </h2>
                <Link
                  to={`/projects/${category.slug}`}
                  className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
                >
                  View All →
                </Link>
              </div>
              <div
                className={`grid ${categoryGridColumns[category.slug]} gap-4`}
              >
                {categoryProjects.map((p) => (
                  <Link
                    key={p.slug}
                    to={`/projects/${category.slug}/${p.slug}`}
                    className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] transition-all hover:border-white/30 hover:bg-neutral-950"
                  >
                    <div className="aspect-video overflow-hidden bg-neutral-900 relative">
                      <img
                        src={p.thumbnail}
                        alt={`${p.title} project cover`}
                        className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-xs text-white/50">
                        {p.client ?? category.shortTitle}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )
        })}
      </div>
    </PageLayout>
  )
}
