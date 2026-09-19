import PageLayout from '../components/PageLayout'
import { getProjectsByCategory } from '../data/portfolio'
import { Link } from 'react-router-dom'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

export default function ProjectsPage() {
  const brandIdentity = getProjectsByCategory('brand-identity')
  const presentations = getProjectsByCategory('presentation')
  const socialMedia = getProjectsByCategory('social-media')
  const websites = getProjectsByCategory('websites')

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
                { id: 'buyology', slug: 'buyology', image: '/assets/projects/buyology/buyology-banner.png', title: 'Buyology', subtitle: 'Visual identity system', aspectRatio: '2501 / 834', objectFit: 'cover' },
                { id: 'euphoria-experiences-brand', slug: 'euphoria-experiences-brand', image: '/assets/brand/euphoria/euphoria-banner.png', title: 'Euphoria', subtitle: 'Brand mark & identity', aspectRatio: '2501 / 834', objectFit: 'cover' },
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
      </div>
    </PageLayout>
  )
}
