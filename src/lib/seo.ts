import { aiProjects, categories, projects } from '../data/portfolio'

// Public origin of this hash-router SPA; every emitted URL is absolute.
export const SITE_ORIGIN = 'https://raqeeb-website-mu.vercel.app'

// Real files under public/ — safe to use as share-card images.
const DEFAULT_IMAGE_PATH = 'assets/brand/euphoria/cover.png'
const CATEGORY_IMAGES: Record<string, string> = {
  'brand-identity': 'assets/brand/euphoria/cover.png',
  'presentation-design': 'assets/presentation/blaize/blaize-01.jpg',
  'social-media': 'assets/social/arata/arata-1.png',
  websites: 'assets/websites/marsa-atelier@1400w.jpg',
  ai: 'assets/ai/diagrams/fleet/fleet-topology.png',
}

export interface RouteMeta {
  title: string
  description: string
  image: string
  url: string
}

// Audited page copy: .audit-2026-11-28/report/content_main.json -> pages.* (seo_title / meta).
const PAGES: Record<string, { title: string; description: string }> = {
  '/': {
    title: 'Raqeeb Hussain — AI Implementation Specialist | Agent Systems, Automation & Integration',
    description:
      'AI implementation specialist in Dammam, Saudi Arabia. I build agent workflows, automation pipelines and integrations, with a design and business background. Work: LeadJin, OrIO, Agent Fleet, Approval Inbox.',
  },
  '/about': {
    title: 'About Raqeeb Hussain — AI Implementation Specialist in Dammam',
    description:
      'From visual communication and client-facing sales to AI implementation: how Raqeeb Hussain designs and builds agent systems, automation and integrations.',
  },
  '/process': {
    title: 'How I Work — AI Implementation Process | Raqeeb Hussain',
    description:
      'Seven steps from problem to running system: diagnose, define, design, build with AI agents, integrate, verify, operate.',
  },
  '/projects': {
    title: 'Work — AI Systems and Design Projects | Raqeeb Hussain',
    description:
      'Seven AI systems and twenty-five design projects: agent fleets, CRM lead generation, operations consoles, approval layers, brand identity, presentations and campaigns.',
  },
  '/resume': {
    title: 'Resume — Raqeeb Hussain, AI Implementation Specialist',
    description:
      'Resume of Raqeeb Hussain: AI implementation, agent systems, automation and integration, on a foundation of brand and communication design. Dammam, Saudi Arabia.',
  },
}

const absoluteImage = (path: string | undefined): string =>
  `${SITE_ORIGIN}/${(path || DEFAULT_IMAGE_PATH).replace(/^\/+/, '')}`

const build = (
  title: string,
  description: string,
  imagePath: string | undefined,
  pathname: string,
): RouteMeta => ({
  title,
  description,
  image: absoluteImage(imagePath),
  url: `${SITE_ORIGIN}/#${pathname}`,
})

const SITE_DEFAULT: RouteMeta = build(
  PAGES['/'].title,
  PAGES['/'].description,
  DEFAULT_IMAGE_PATH,
  '/',
)

/**
 * Resolve one router pathname (no hash) to its unique metadata.
 * Unknown paths resolve to the site default and never borrow a named route's title.
 */
export function resolveRouteMeta(pathname: string): RouteMeta {
  const clean = (pathname || '/').split(/[?#]/)[0].replace(/\/+$/, '') || '/'
  const segments = clean.split('/').filter(Boolean)

  const page = PAGES[clean]
  if (page) return build(page.title, page.description, DEFAULT_IMAGE_PATH, clean)

  if (segments[0] === 'projects') {
    // /projects/<category>
    if (segments.length === 2) {
      const category = categories.find((c) => c.slug === segments[1])
      if (category) {
        return build(
          category.seoTitle,
          category.seoDescription,
          CATEGORY_IMAGES[category.slug] || DEFAULT_IMAGE_PATH,
          clean,
        )
      }
    }

    // /projects/ai/<slug> and /projects/<category>/<slug>
    if (segments.length === 3) {
      if (segments[1] === 'ai') {
        const ai = aiProjects.find((p) => p.slug === segments[2])
        if (ai) return build(ai.seoTitle, ai.seoDescription, ai.architecture, clean)
      } else {
        const category = segments[1]
        const design =
          projects.find(
            (p) =>
              p.slug === segments[2] &&
              (p.category === category || p.category === category.replace(/-design$/, '')),
          ) || projects.find((p) => p.slug === segments[2])
        if (design) {
          return build(design.seoTitle, design.seoDescription, design.thumbnail, clean)
        }
      }
    }
  }

  return SITE_DEFAULT
}
