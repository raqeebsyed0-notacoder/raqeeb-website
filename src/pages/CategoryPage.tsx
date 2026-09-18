import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, getCategory } from '../data/portfolio'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

const brandSlides = [
  { id: 'buyology', image: '/assets/projects/buyology/buyology-01.png', title: 'Buyology', subtitle: 'Visual identity system' },
  { id: 'nasi-packaging', image: '/assets/brand/nasi/nasi-01.jpg', title: 'Nasi Packaging', subtitle: 'FMCG visual system' },
  { id: 'euphoria-brand', image: '/assets/brand/euphoria/cover.png', title: 'Euphoria', subtitle: 'Brand mark & identity' },
]

const presentationSlides = [
  { id: 'blaize', image: '/assets/presentation/blaize/blaize-01.jpg', title: 'Blaize', subtitle: 'AI hardware pitch deck' },
  { id: 'flowserve', image: '/assets/presentation/flowserve/flowserve-01.jpg', title: 'Flowserve', subtitle: 'Widescreen keynote system' },
]

const socialSlides = [
  { id: 'arata', image: '/assets/social/arata/arata-1.png', title: 'Arata', subtitle: 'Visual campaign system' },
  { id: 'dot-key', image: '/assets/social/dot-and-key/1.png', title: 'Dot & Key', subtitle: 'Visual drop campaign' },
]

const websiteSlides = [
  { id: 'euphoria-web', image: '/assets/websites/euphoria-experiences@1400w.jpg', title: 'Euphoria Web', subtitle: 'Dark-mode UI design' },
  { id: 'marsa-atelier', image: '/assets/websites/marsa-atelier@1400w.jpg', title: 'Marsa Atelier', subtitle: 'Storefront UI concept' },
]

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>()
  const cat = getCategory(category || '')
  const projects = getProjectsByCategory(category || '')

  if (!cat) {
    return (
      <PageLayout>
        <p className="text-white/60">Category not found.</p>
        <Link to="/projects" className="text-red-500 hover:text-red-400 mt-4 inline-block">← Back to projects</Link>
      </PageLayout>
    )
  }

  const slides =
    category === 'brand-identity' ? brandSlides :
    category === 'presentation-design' ? presentationSlides :
    category === 'social-media' ? socialSlides :
    category === 'websites' ? websiteSlides : []

  const label =
    category === 'brand-identity' ? 'Brand Identity Gallery' :
    category === 'presentation-design' ? 'Presentation Design Gallery' :
    category === 'social-media' ? 'Social Media Design Gallery' :
    category === 'websites' ? 'Web & UI Design Gallery' : undefined

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <Link to="/projects" className="text-sm text-white/50 hover:text-white transition-colors mb-8 inline-block">
          ← All Projects
        </Link>

        <h1 className="text-4xl sm:text-5xl md:text-6xl tracking-wide uppercase font-normal leading-[0.9] mb-4">
          {cat.title}
        </h1>
        <p className="text-lg text-white/60 mb-12 max-w-2xl">{cat.description}</p>

        {slides.length > 0 && (
          <div className="-mx-5 sm:-mx-6 md:-mx-10 lg:-mx-14 mb-16">
            <SqueezeCarousel
              slides={slides}
              height={400}
              gap={16}
              slatWidth={10}
              radius={8}
              controls={true}
              label={label}
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id}
              to={`/projects/${category}/${project.slug}`}
              className="group block"
            >
              <div className="aspect-[4/3] overflow-hidden bg-[#0a0a0a] mb-3">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h2 className="text-base tracking-wide uppercase font-normal">
                {project.title}
              </h2>
              {project.client && (
                <p className="text-xs text-white/50 mt-1">{project.client}</p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </PageLayout>
  )
}