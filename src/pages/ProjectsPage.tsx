import PageLayout from '../components/PageLayout'
import { getProjectsByCategory } from '../data/portfolio'
import { Link } from 'react-router-dom'

export default function ProjectsPage() {
  const brandIdentity = getProjectsByCategory('brand-identity')
  const presentations = getProjectsByCategory('presentation')
  const socialMedia = getProjectsByCategory('social-media')
  const websites = getProjectsByCategory('websites')

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        {/* Editorial header */}
        <div className="mb-16">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
            Portfolio
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-wide uppercase font-normal leading-[0.9]">
            Selected
            <br />
            <span className="font-pixel font-normal text-[1.1em]">Work</span>
          </h1>
        </div>

        {/* Brand Identity — Large editorial feature */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">
              Brand Identity
            </h2>
            <Link
              to="/projects/brand-identity"
              className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Featured project - large */}
            <Link
              to={`/projects/brand-identity/${brandIdentity[0]?.slug}`}
              className="group block md:row-span-2"
            >
              <div className="aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/5] overflow-hidden bg-[#0a0a0a]">
                <img
                  src={brandIdentity[0]?.thumbnail}
                  alt={brandIdentity[0]?.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 className="text-lg sm:text-xl tracking-wide uppercase font-normal mt-4">
                {brandIdentity[0]?.title}
              </h3>
              {brandIdentity[0]?.client && (
                <p className="text-sm text-white/50 mt-1">{brandIdentity[0]?.client}</p>
              )}
            </Link>
            {/* Supporting projects */}
            <div className="space-y-6">
              {brandIdentity.slice(1, 3).map((project) => (
                <Link
                  key={project.id}
                  to={`/projects/brand-identity/${project.slug}`}
                  className="group block"
                >
                  <div className="aspect-[16/9] overflow-hidden bg-[#0a0a0a]">
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="text-base tracking-wide uppercase font-normal mt-3">
                    {project.title}
                  </h3>
                  {project.client && (
                    <p className="text-xs text-white/50 mt-1">{project.client}</p>
                  )}
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Presentations — Horizontal carousel style */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">
              Presentations
            </h2>
            <Link
              to="/projects/presentation"
              className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              View All →
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {presentations.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/presentation/${project.slug}`}
                className="group block flex-shrink-0 w-[70%] sm:w-[50%] md:w-[35%]"
              >
                <div className="aspect-video overflow-hidden bg-[#0a0a0a] relative">
                  {/* Simulated presentation cover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900 flex flex-col justify-center px-6">
                    <p className="text-[10px] text-white/50 uppercase tracking-[0.3em] mb-2">
                      {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-lg sm:text-xl tracking-wide uppercase font-normal leading-tight">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-white/60 mt-2">{project.client}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Social Media — Grid with varied sizes */}
        <section className="mb-24">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">
              Social Media
            </h2>
            <Link
              to="/projects/social-media"
              className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
            {socialMedia.slice(0, 5).map((project) => (
              <Link
                key={project.id}
                to={`/projects/social-media/${project.slug}`}
                className="group block"
              >
                <div className="aspect-square overflow-hidden bg-[#0a0a0a]">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <p className="text-xs text-white/60 mt-2 truncate">{project.title}</p>
              </Link>
            ))}
          </div>
        </section>

        {/* Websites — Large feature with device frames */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl tracking-wide uppercase font-normal">
              Websites
            </h2>
            <Link
              to="/projects/websites"
              className="text-xs text-white/50 hover:text-white transition-colors uppercase tracking-widest"
            >
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {websites.slice(0, 2).map((project) => (
              <Link
                key={project.id}
                to={`/projects/websites/${project.slug}`}
                className="group block"
              >
                <div className="aspect-video overflow-hidden bg-[#0a0a0a] rounded-lg relative">
                  <img
                    src={project.thumbnail}
                    alt={project.title}
                    className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    loading="lazy"
                  />
                  {/* Browser chrome overlay */}
                  <div className="absolute top-0 left-0 right-0 h-6 bg-black/60 flex items-center px-2 gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-yellow-500/60" />
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500/60" />
                  </div>
                </div>
                <h3 className="text-base tracking-wide uppercase font-normal mt-3">
                  {project.title}
                </h3>
                {project.client && (
                  <p className="text-xs text-white/50 mt-1">{project.client}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </PageLayout>
  )
}
