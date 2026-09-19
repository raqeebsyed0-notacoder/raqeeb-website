import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, getCategory } from '../data/portfolio'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

const brandSlides = [
  { id: 'buyology', slug: 'buyology', image: '/assets/projects/buyology/buyology-banner.png', title: 'Buyology', subtitle: 'Visual identity system', aspectRatio: '2501 / 834', objectFit: 'cover' },
  { id: 'euphoria-brand', slug: 'euphoria-experiences-brand', image: '/assets/brand/euphoria/euphoria-banner.png', title: 'Euphoria', subtitle: 'Brand mark & identity', aspectRatio: '2501 / 834', objectFit: 'cover' },
]

const presentationSlides = [
  { id: 'blaize', slug: 'blaize', image: '/assets/presentation/blaize/blaize-01.jpg', title: 'Blaize', subtitle: 'AI hardware pitch deck', aspectRatio: '2000 / 1125', objectFit: 'cover' },
  { id: 'flowserve', slug: 'flowserve', image: '/assets/presentation/flowserve/flowserve-01.jpg', title: 'Flowserve', subtitle: 'Widescreen keynote system', aspectRatio: '2481 / 1754', objectFit: 'cover' },
]

const socialSlides = [
  { id: 'arata', slug: 'arata', image: '/assets/social/arata/arata-1.png', title: 'Arata', subtitle: 'Visual campaign system', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'dot-key', slug: 'dot-and-key', image: '/assets/social/dot-and-key/1.png', title: 'Dot & Key', subtitle: 'Visual drop campaign', aspectRatio: '1080 / 1080', objectFit: 'cover' },
]

const websiteSlides = [
  { id: 'euphoria-web', slug: 'euphoria-website', image: '/assets/websites/euphoria-experiences@1400w.jpg', title: 'Euphoria Web', subtitle: 'Dark-mode UI design', aspectRatio: '1400 / 9000', objectFit: 'cover' },
  { id: 'marsa-atelier', slug: 'marsa-atelier', image: '/assets/websites/marsa-atelier@1400w.jpg', title: 'Marsa Atelier', subtitle: 'Storefront UI concept', aspectRatio: '381 / 1500', objectFit: 'cover' },
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
          <div className="-mx-5 sm:-mx-6 md:-mx-10 lg:-mx-14">
            <SqueezeCarousel
              slides={slides}
              height={400}
              gap={16}
              slatWidth={10}
              radius={8}
              controls={true}
              label={label}
              categorySlug={category}
            />
          </div>
        )}
      </div>
    </PageLayout>
  )
}