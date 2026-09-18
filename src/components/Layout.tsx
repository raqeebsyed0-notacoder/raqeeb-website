import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { categories } from '../data/portfolio'

const NAV_LINKS = [
  { label: 'ABOUT', path: '/about' },
  { label: 'PROJECTS', path: '/projects' },
  { label: 'CATALOG', path: '/catalog' },
  { label: 'RESUME', path: '/resume' },
]



const STAGGER_DELAYS = [100, 160, 220, 280]

// Client names by category for hover menus
const categoryClients: Record<string, { name: string; slug: string }[]> = {
  'brand-identity': [
    { name: 'Buyology', slug: 'buyology' },
    { name: 'Nasi Packaging', slug: 'nasi-packaging' },
    { name: 'Euphoria', slug: 'euphoria-experiences-brand' },
  ],
  'presentation-design': [
    { name: 'Blaize', slug: 'blaize' },
    { name: 'Chashmawala', slug: 'chashmawala' },
    { name: 'Flowserve', slug: 'flowserve' },
    { name: 'Jalal', slug: 'jalal' },
    { name: 'Shafa Al Shams', slug: 'shafa-al-shams' },
    { name: 'Stage Nine', slug: 'stage-nine' },
    { name: 'Trillium', slug: 'trillium' },
    { name: 'White Graphics', slug: 'white-graphics-brochure' },
  ],
  'social-media': [
    { name: 'Arata', slug: 'arata' },
    { name: 'Dot & Key', slug: 'dot-and-key' },
    { name: 'Euphoria', slug: 'euphoria-campaign' },
    { name: 'Learnbay', slug: 'learnbay' },
    { name: 'New Herbs', slug: 'new-herbs' },
    { name: 'Nirmalaya', slug: 'nirmalaya' },
    { name: 'Organic B', slug: 'organic-b' },
    { name: 'Rustic Art', slug: 'rustic-art' },
    { name: 'Satthwa', slug: 'satthwa' },
    { name: 'Ustraa', slug: 'ustraa' },
  ],
  websites: [
    { name: 'Euphoria Experiences', slug: 'euphoria-website' },
    { name: 'GRC', slug: 'grc' },
    { name: 'Marsa Atelier', slug: 'marsa-atelier' },
    { name: 'Najd Sands', slug: 'najd-sands' },
  ],
}

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const location = useLocation()

  return (
    <>
      <nav className="flex items-center justify-between py-6">
        <Link to="/" className="text-base font-semibold tracking-wide">RAQEEB HUSSAIN</Link>

        <ul className="hidden gap-8 text-sm tracking-wide md:flex">
          {NAV_LINKS.map((link) => (
            <li
              key={link.path}
              className="relative"
              onMouseEnter={() => link.path === '/projects' ? setHoveredCategory('projects') : setHoveredCategory(null)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <Link
                to={link.path}
                className={`transition-opacity hover:opacity-70 ${
                  location.pathname === link.path || location.pathname.startsWith(link.path + '/')
                    ? 'opacity-100'
                    : 'opacity-70'
                }`}
              >
                {link.label}
              </Link>

              {/* Category hover dropdown for PROJECTS */}
              {link.path === '/projects' && hoveredCategory === 'projects' && (
                <div
                  className="absolute top-full left-1/2 -translate-x-1/2 pt-4 z-50"
                  onMouseEnter={() => setHoveredCategory('projects')}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <div className="bg-[#0a0a0a] border border-white/10 rounded-lg p-4 min-w-[200px] shadow-xl">
                    {categories.map((cat) => (
                      <div key={cat.slug} className="mb-3 last:mb-0">
                        <Link
                          to={`/projects/${cat.slug}`}
                          className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors font-semibold"
                        >
                          {cat.title}
                        </Link>
                        <ul className="mt-1 space-y-0.5">
                          {(categoryClients[cat.slug] || []).slice(0, 4).map((client) => (
                            <li key={client.slug}>
                              <Link
                                to={`/projects/${cat.slug}/${client.slug}`}
                                className="text-xs text-white/70 hover:text-white transition-colors"
                              >
                                {client.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ul>

        <button
          className="p-2 transition-opacity hover:opacity-70 md:hidden"
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-6">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-base font-semibold tracking-wide">
            RAQEEB HUSSAIN
          </Link>
          <button
            className="p-2 transition-opacity hover:opacity-70"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={24} />
          </button>
        </div>

        <ul className="flex flex-col items-center justify-center flex-1 gap-8">
          {NAV_LINKS.map((link, i) => (
            <li key={link.path}>
              <Link
                to={link.path}
                className="text-2xl tracking-widest transition-opacity hover:opacity-70"
                style={{ transitionDelay: `${STAGGER_DELAYS[i]}ms` }}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function Footer() {
  return (
    <footer className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4 border-t border-white/10">
      <p className="text-xs text-white/70">
        Available for freelance, contract and full-time opportunities. {' '}
        <a href="mailto:raqeebsyed0@gmail.com" className="text-red-500 transition-colors hover:text-red-400">Let's talk</a>
      </p>
      <p className="text-xs text-white/70 sm:text-right">
        Brand Identity &bull; Presentations &bull; Social Media &bull; Websites
      </p>
    </footer>
  )
}
