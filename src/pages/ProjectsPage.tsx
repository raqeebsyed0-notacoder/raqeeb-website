import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, getAiProjects } from '../data/portfolio'
import { Link } from 'react-router-dom'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

export default function ProjectsPage() {
  const presentations = getProjectsByCategory('presentation')
  const socialMedia = getProjectsByCategory('social-media')
  const websites = getProjectsByCategory('websites')
  const aiProjects = getAiProjects()

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">Portfolio</p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-wide uppercase font-normal leading-[0.9]">
            Selected<br /><span className="font-pixel font-normal text-[1.1em]">Work</span>
          </h1>
        </div>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">Brand Identity</h2>
            <Link to="/projects/brand-identity" className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">View All →</Link>
          </div>
          <div className="mb-16">
            <SqueezeCarousel
              slides={[
                { id: 'buyology', slug: 'buyology', image: 'assets/projects/buyology/buyology-banner.png', title: 'Buyology', subtitle: 'Visual identity system', aspectRatio: '2501 / 834', objectFit: 'cover' },
                { id: 'euphoria-experiences-brand', slug: 'euphoria-experiences-brand', image: 'assets/brand/euphoria/euphoria-banner.png', title: 'Euphoria', subtitle: 'Brand mark & identity', aspectRatio: '2501 / 834', objectFit: 'cover' },
              ]}
              gap={16} slatWidth={10} radius={8} controls={true}
              label="Brand Identity Gallery"
              categorySlug="brand-identity"
            />
          </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">Presentations</h2>
            <Link to="/projects/presentation" className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">View All →</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {presentations.map((p, i) => (
              <Link key={p.id} to={`/projects/presentation/${p.slug}`} className="group block flex-shrink-0 w-[70%] sm:w-[50%] md:w-[35%]">
                <div className="aspect-video overflow-hidden bg-[#0a0a0a] relative">
                  <img src={p.thumbnail} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end px-4 pb-4">
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mb-1">{String(i + 1).padStart(2, '0')}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">Social Media</h2>
            <Link to="/projects/social-media" className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">View All →</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {socialMedia.slice(0, 5).map((p) => (
              <Link key={p.id} to={`/projects/social-media/${p.slug}`} className="group block">
                <div className="aspect-square overflow-hidden bg-[#0a0a0a]">
                  <img src={p.thumbnail} alt={p.title} className="h-full w-full object-cover" loading="lazy" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">Websites</h2>
            <Link to="/projects/websites" className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websites.slice(0, 2).map((p) => (
              <Link key={p.id} to={`/projects/websites/${p.slug}`} className="group block">
                <div className="aspect-video overflow-hidden bg-[#0a0a0a] rounded-lg relative">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover object-top" loading="lazy" />
                </div>
              </Link>
            ))}
          </div>
        </section>

        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">AI & Automation</h2>
            <Link to="/projects/ai" className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {aiProjects.map((p) => (
              <div
                key={p.id}
                className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a]"
              >
                <div className="aspect-video overflow-hidden">
                  <img
                    src={p.architecture}
                    alt=""
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{p.title}</h3>
                    <span className="text-[10px] uppercase tracking-widest text-white/50">{p.status}</span>
                  </div>
                  <p className="mt-1 text-sm text-white/70">{p.role}</p>
                  <p className="mt-2 text-sm text-white/60">{p.summary}</p>
                  <div className="mt-3 flex flex-wrap items-center gap-2">
                    {p.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full px-2 py-0.5 text-[10px] uppercase tracking-widest text-white/40"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3 flex items-center justify-between gap-3 border-t border-white/5 pt-3">
                    <div className="flex -space-x-2">
                      {p.screenshots.slice(0, 2).map((s) => (
                        <img
                          key={s}
                          src={s}
                          alt=""
                          className="h-10 w-10 rounded border border-[#0a0a0a] object-cover"
                          loading="lazy"
                        />
                      ))}
                    </div>
                    <a
                      href={p.demos[0]?.url}
                      target="_blank"
                      rel="noreferrer"
                      className="flex items-center gap-1.5 text-xs text-white/60 transition-colors hover:text-white"
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
                      {p.demos[0]?.label}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
