import { useParams, Link } from 'react-router-dom'
import PageLayout from '../components/PageLayout'
import { getProjectsByCategory, getCategory } from '../data/portfolio'
import SqueezeCarousel from '../components/ui/carousel-squeeze'

const brandSlides = [
  { id: 'buyology', slug: 'buyology', image: 'assets/projects/buyology/buyology-banner.png', title: 'Buyology', subtitle: 'Visual identity system', aspectRatio: '2501 / 834', objectFit: 'cover' },
  { id: 'euphoria-brand', slug: 'euphoria-experiences-brand', image: 'assets/brand/euphoria/euphoria-banner.png', title: 'Euphoria', subtitle: 'Brand mark & identity', aspectRatio: '2501 / 834', objectFit: 'cover' },
]

const presentationSlides = [
  { id: 'blaize', slug: 'blaize', image: 'assets/presentation/blaize/blaize-01.jpg', title: 'Blaize', subtitle: 'AI hardware pitch deck', aspectRatio: '2000 / 1125', objectFit: 'cover' },
  { id: 'chashmawala', slug: 'chashmawala', image: 'assets/presentation/chashmawala/chashmawala-01.jpg', title: 'Dr. Chashmawala', subtitle: 'Brand proposal', aspectRatio: '2000 / 1125', objectFit: 'cover' },
  { id: 'flowserve', slug: 'flowserve', image: 'assets/presentation/flowserve/flowserve-01.jpg', title: 'Flowserve', subtitle: 'Widescreen keynote', aspectRatio: '2481 / 1754', objectFit: 'cover' },
  { id: 'jalal', slug: 'jalal', image: 'assets/presentation/jalal/jalal-01.jpg', title: 'Jalal', subtitle: 'Event presentation', aspectRatio: '1754 / 1241', objectFit: 'cover' },
  { id: 'shafa-al-shams', slug: 'shafa-al-shams', image: 'assets/presentation/shafa-al-shams/shafa-al-shams-01.jpg', title: 'Shafa Al Shams', subtitle: 'Presentation deck', aspectRatio: '2000 / 1125', objectFit: 'cover' },
  { id: 'stage-nine', slug: 'stage-nine', image: 'assets/presentation/stage-nine/stage-nine-01.jpg', title: 'Stage Nine', subtitle: 'Brand proposal', aspectRatio: '2000 / 1125', objectFit: 'cover' },
  { id: 'trillium', slug: 'trillium', image: 'assets/presentation/trillium/trillium-01.jpg', title: 'Trillium', subtitle: 'Event proposal', aspectRatio: '2481 / 1754', objectFit: 'cover' },
  { id: 'white-graphics-brochure', slug: 'white-graphics-brochure', image: 'assets/presentation/white-graphics-brochure/white-graphics-brochure-01.jpg', title: 'White Graphics', subtitle: 'Corporate brochure', aspectRatio: '1813 / 1241', objectFit: 'cover' },
]

const socialSlides = [
  { id: 'arata', slug: 'arata', image: 'assets/social/arata/arata-1.png', title: 'Arata', subtitle: 'Visual campaign system', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'dot-and-key', slug: 'dot-and-key', image: 'assets/social/dot-and-key/1.png', title: 'Dot & Key', subtitle: 'Visual drop campaign', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'euphoria-campaign', slug: 'euphoria-campaign', image: 'assets/social/euphoria/1.webp', title: 'Euphoria', subtitle: 'Campaign creative', aspectRatio: '1408 / 1760', objectFit: 'cover' },
  { id: 'learnbay', slug: 'learnbay', image: 'assets/social/learnbay/1.png', title: 'Learnbay', subtitle: 'Campaign creative', aspectRatio: '2000 / 2000', objectFit: 'cover' },
  { id: 'new-herbs', slug: 'new-herbs', image: 'assets/social/new-herbs/1.png', title: 'New Herbs', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'nirmalaya', slug: 'nirmalaya', image: 'assets/social/nirmalaya/1.png', title: 'Nirmalaya', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'organic-b', slug: 'organic-b', image: 'assets/social/organic-b/1.png', title: 'Organic B', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'rustic-art', slug: 'rustic-art', image: 'assets/social/rustic-art/2.png', title: 'Rustic Art', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'satthwa', slug: 'satthwa', image: 'assets/social/satthwa/1.png', title: 'Satthwa', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
  { id: 'ustraa', slug: 'ustraa', image: 'assets/social/ustraa/1.png', title: 'Ustraa', subtitle: 'Campaign creative', aspectRatio: '1080 / 1080', objectFit: 'cover' },
]

const websiteSlides = [
  { id: 'euphoria-web', slug: 'euphoria-website', image: 'assets/websites/live/euphoria.jpg', title: 'Euphoria Web', subtitle: 'Live site — click to visit', aspectRatio: '1400 / 788', objectFit: 'cover' },
  { id: 'grc', slug: 'grc', image: 'assets/websites/live/grc-v1.jpg', title: 'GRC Evolution', subtitle: 'Live sites v1–v3 — click to visit', aspectRatio: '1400 / 788', objectFit: 'cover' },
  { id: 'marsa-atelier', slug: 'marsa-atelier', image: 'assets/websites/marsa-atelier-hero@1400w.jpg', title: 'Marsa Atelier', subtitle: 'Live site — click to visit', aspectRatio: '1400 / 788', objectFit: 'cover' },
  { id: 'najd-sands', slug: 'najd-sands', image: 'assets/websites/live/najd.jpg', title: 'Najd Sands', subtitle: 'Live site — click to visit', aspectRatio: '1400 / 788', objectFit: 'cover' },
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