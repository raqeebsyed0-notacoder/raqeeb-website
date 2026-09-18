import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, getCategory } from '../data/portfolio'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

const brandSlides = [
  { id: 'buyology', image: 'https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&w=1200&q=80', title: 'Buyology', subtitle: 'Visual identity system' },
  { id: 'nasi-packaging', image: 'https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=1200&q=80', title: 'Nasi Packaging', subtitle: 'FMCG visual system' },
  { id: 'euphoria-brand', image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80', title: 'Euphoria', subtitle: 'Brand mark & identity' },
]

const presentationSlides = [
  { id: 'blaize', image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80', title: 'Blaize', subtitle: 'AI hardware pitch deck' },
  { id: 'flowserve', image: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=1200&q=80', title: 'Flowserve', subtitle: 'Widescreen keynote system' },
]

const socialSlides = [
  { id: 'arata', image: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80', title: 'Arata', subtitle: 'Visual campaign system' },
  { id: 'dot-key', image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=1200&q=80', title: 'Dot & Key', subtitle: 'Visual drop campaign' },
]

const websiteSlides = [
  { id: 'euphoria-web', image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80', title: 'Euphoria Web', subtitle: 'Dark-mode UI design' },
  { id: 'marsa-atelier', image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80', title: 'Marsa Atelier', subtitle: 'Storefront UI concept' },
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