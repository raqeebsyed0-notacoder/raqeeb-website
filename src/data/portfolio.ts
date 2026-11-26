export interface Project {
  id: string;
  title: string;
  slug: string;
  category: 'brand-identity' | 'presentation' | 'social-media' | 'websites';
  sourceFolder: string;
  year: number | null;
  client: string | null;
  description: string | null;
  thumbnail: string;
  media: string[];
  mediaTypes: string[];
  originalFiles: string[];
  brandColors?: string[];
  brandFonts?: string[];
  pdfRatio?: string; // e.g. "960/540" for PDFDeckViewer aspect ratio
  liveUrl?: string; // full live site URL (opens in new tab)
  liveFront?: string; // front-page capture shown as the link card
  liveUrls?: { label: string; url: string }[]; // multiple live versions (e.g. GRC v1-v3)
}

export interface Category {
  id: string
  slug: string
  title: string
  shortTitle: string
  description: string
  sourceFolder: string
}

export interface SkillInfo {
  name: string;
  description: string;
  status: 'installed' | 'roadmap' | 'project';
  category?: string;
}

export interface AiProjectLink {
  label: string;
  url: string;
  type: 'diagram' | 'portal' | 'external' | 'repo';
}

export interface AiProject {
  id: string;
  title: string;
  slug: string;
  summary: string;
  role: string;
  status: string;
  stack: string[];
  architecture: string; // path to the architecture figure
  screenshots: string[];
  agent: string;
  company: string; // 'NOT-IN-SOURCE' where the approved spec is silent (content-spec.md L11)
  owner: string;
  why_created: string;
  day_to_day_value: string;
  skills: string[];
  skillDetails?: SkillInfo[];
  links?: AiProjectLink[];
  demos: { label: string; url: string }[]; // labelled demo / video slots
}

export const categories: Category[] = [
  {
    id: 'brand-identity',
    slug: 'brand-identity',
    title: 'Brand Identity',
    shortTitle: 'Brand',
    description: 'Logo systems, visual identity, packaging and brand guidelines for companies across sectors.',
    sourceFolder: 'E:\\Portfolio\\Brand Identity',
  },
  {
    id: 'presentation',
    slug: 'presentation-design',
    title: 'Presentation Design',
    shortTitle: 'Deck',
    description: 'Executive presentations, event decks, proposals and corporate brochures.',
    sourceFolder: 'E:\\Portfolio\\Presentations',
  },
  {
    id: 'social-media',
    slug: 'social-media',
    title: 'Social Media',
    shortTitle: 'Social',
    description: 'Campaign creatives, editorial posters, e-commerce ad campaigns and social content systems.',
    sourceFolder: 'E:\\Portfolio\\Social Media',
  },
  {
    id: 'websites',
    slug: 'websites',
    title: 'Websites',
    shortTitle: 'Web',
    description: 'Digital experience design, website concepts and UI systems for brands and services.',
    sourceFolder: 'E:\\Portfolio\\Websites',
  },
  {
    id: 'ai',
    slug: 'ai',
    title: 'AI & Automation',
    shortTitle: 'AI',
    description: 'Autonomous agents, skill libraries and automation systems built on the Hermes runtime.',
    sourceFolder: 'E:\\Portfolio\\AI & Automation',
  },
]

export const projects: Project[] = [
  // ── BRAND IDENTITY ──────────────────────────────────────────────
  {
    id: 'buyology',
    title: 'Buyology',
    slug: 'buyology',
    category: 'brand-identity',
    sourceFolder: 'E:\\Portfolio\\Brand Identity',
    year: 2025,
    client: 'Buyology',
    description: 'Complete brand identity document including visual system, logo guidelines, color palette, typography framework, and brand applications.',
    thumbnail: 'assets/projects/buyology/buyology-01.png',
    media: [
      'assets/projects/buyology/buyology-01.png',
      'assets/projects/buyology/buyology-02.png',
      'assets/projects/buyology/buyology-03.png',
      'assets/projects/buyology/buyology-04.png',
      'assets/projects/buyology/buyology-05.png',
      'assets/projects/buyology/buyology-06.png',
      'assets/projects/buyology/buyology-07.png',
      'assets/projects/buyology/buyology-08.png',
      'assets/projects/buyology/buyology-09.png',
      'assets/projects/buyology/buyology-10.png',
      'assets/projects/buyology/buyology-11.png',
      'assets/projects/buyology/buyology-12.png',
      'assets/projects/buyology/buyology-13.png',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '1920/1289',
    originalFiles: ['E:\\Portfolio\\Brand Identity\\Buyology-Brand Identity Document.pdf'],
    brandColors: ['#FF6B35', '#1B3A5C', '#FFFFFF', '#F5F5F5'],
    brandFonts: ['Biennale', 'Manrope'],
  },
  {
    id: 'euphoria-experiences-brand',
    title: 'Euphoria Experiences',
    slug: 'euphoria-experiences-brand',
    category: 'brand-identity',
    sourceFolder: 'E:\\Portfolio\\Brand Identity',
    year: 2026,
    client: 'Euphoria Experiences',
    description: 'Brand identity and logo design for the creative agency itself.',
    thumbnail: 'assets/brand/euphoria/cover.png',
    media: ['assets/brand/euphoria/cover.png'],
    mediaTypes: ['image'],
    originalFiles: ['E:\\Portfolio\\Brand Identity\\logo\\Euphoria Experiences.pdf'],
  },
  // ── PRESENTATION DESIGN ────────────────────────────────────────
  {
    id: 'blaize',
    title: 'Blaize Technical Proposal',
    slug: 'blaize',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Blaize',
    description: 'Technical proposal document design.',
    thumbnail: 'assets/presentation/blaize/blaize-01.jpg',
    media: [
      'assets/presentation/blaize/blaize-01.jpg',
      'assets/presentation/blaize/blaize-02.jpg',
      'assets/presentation/blaize/blaize-03.jpg',
      'assets/presentation/blaize/blaize-04.jpg',
      'assets/presentation/blaize/blaize-05.jpg',
      'assets/presentation/blaize/blaize-06.jpg',
      'assets/presentation/blaize/blaize-07.jpg',
      'assets/presentation/blaize/blaize-08.jpg',
      'assets/presentation/blaize/blaize-09.jpg',
      'assets/presentation/blaize/blaize-10.jpg',
      'assets/presentation/blaize/blaize-11.jpg',
      'assets/presentation/blaize/blaize-12.jpg',
      'assets/presentation/blaize/blaize-13.jpg',
      'assets/presentation/blaize/blaize-14.jpg',
      'assets/presentation/blaize/blaize-15.jpg',
      'assets/presentation/blaize/blaize-16.jpg',
      'assets/presentation/blaize/blaize-17.jpg',
      'assets/presentation/blaize/blaize-18.jpg',
      'assets/presentation/blaize/blaize-19.jpg',
      'assets/presentation/blaize/blaize-20.jpg',
      'assets/presentation/blaize/blaize-21.jpg',
      'assets/presentation/blaize/blaize-22.jpg',
      'assets/presentation/blaize/blaize-23.jpg',
      'assets/presentation/blaize/blaize-24.jpg',
      'assets/presentation/blaize/blaize-25.jpg',
      'assets/presentation/blaize/blaize-26.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '960/540',
    originalFiles: ['E:\\\\Portfolio\\\\Presentations\\\\Blaize technical proposal.pdf'],
  },
  {
    id: 'chashmawala',
    title: 'Dr. Chashmawala Proposal',
    slug: 'chashmawala',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Dr. Chashmawala',
    description: 'Brand proposal and visual identity presentation.',
    thumbnail: 'assets/presentation/chashmawala/chashmawala-01.jpg',
    media: [
      'assets/presentation/chashmawala/chashmawala-01.jpg',
      'assets/presentation/chashmawala/chashmawala-02.jpg',
      'assets/presentation/chashmawala/chashmawala-03.jpg',
      'assets/presentation/chashmawala/chashmawala-04.jpg',
      'assets/presentation/chashmawala/chashmawala-05.jpg',
      'assets/presentation/chashmawala/chashmawala-06.jpg',
      'assets/presentation/chashmawala/chashmawala-07.jpg',
      'assets/presentation/chashmawala/chashmawala-08.jpg',
      'assets/presentation/chashmawala/chashmawala-09.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '960/540',
    originalFiles: ['E:\\Portfolio\\Presentations\\dr-chashmawala-proposal-light.pdf'],
  },
  {
    id: 'flowserve',
    title: 'Flowserve Event Presentation',
    slug: 'flowserve',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Flowserve',
    description: 'Event presentation design for Flowserve.',
    thumbnail: 'assets/presentation/flowserve/flowserve-01.jpg',
    media: [
      'assets/presentation/flowserve/flowserve-01.jpg',
      'assets/presentation/flowserve/flowserve-02.jpg',
      'assets/presentation/flowserve/flowserve-03.jpg',
      'assets/presentation/flowserve/flowserve-04.jpg',
      'assets/presentation/flowserve/flowserve-05.jpg',
      'assets/presentation/flowserve/flowserve-06.jpg',
      'assets/presentation/flowserve/flowserve-07.jpg',
      'assets/presentation/flowserve/flowserve-08.jpg',
      'assets/presentation/flowserve/flowserve-09.jpg',
      'assets/presentation/flowserve/flowserve-10.jpg',
      'assets/presentation/flowserve/flowserve-11.jpg',
      'assets/presentation/flowserve/flowserve-12.jpg',
      'assets/presentation/flowserve/flowserve-13.jpg',
      'assets/presentation/flowserve/flowserve-14.jpg',
      'assets/presentation/flowserve/flowserve-15.jpg',
      'assets/presentation/flowserve/flowserve-16.jpg',
      'assets/presentation/flowserve/flowserve-17.jpg',
      'assets/presentation/flowserve/flowserve-18.jpg',
      'assets/presentation/flowserve/flowserve-19.jpg',
      'assets/presentation/flowserve/flowserve-20.jpg',
      'assets/presentation/flowserve/flowserve-21.jpg',
      'assets/presentation/flowserve/flowserve-22.jpg',
      'assets/presentation/flowserve/flowserve-23.jpg',
      'assets/presentation/flowserve/flowserve-24.jpg',
      'assets/presentation/flowserve/flowserve-25.jpg',
      'assets/presentation/flowserve/flowserve-26.jpg',
      'assets/presentation/flowserve/flowserve-27.jpg',
      'assets/presentation/flowserve/flowserve-28.jpg',
      'assets/presentation/flowserve/flowserve-29.jpg',
      'assets/presentation/flowserve/flowserve-30.jpg',
      'assets/presentation/flowserve/flowserve-31.jpg',
      'assets/presentation/flowserve/flowserve-32.jpg',
      'assets/presentation/flowserve/flowserve-33.jpg',
      'assets/presentation/flowserve/flowserve-34.jpg',
      'assets/presentation/flowserve/flowserve-35.jpg',
      'assets/presentation/flowserve/flowserve-36.jpg',
      'assets/presentation/flowserve/flowserve-37.jpg',
      'assets/presentation/flowserve/flowserve-38.jpg',
      'assets/presentation/flowserve/flowserve-39.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '1191/842',
    originalFiles: ['E:\\Portfolio\\Presentations\\FLOWSERVE EVENT PRESENTATION.pdf'],
  },
  {
    id: 'jalal',
    title: 'Jalal Event Presentation',
    slug: 'jalal',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Jalal',
    description: 'Event presentation and accompanying A4 booklet design.',
    thumbnail: 'assets/presentation/jalal/jalal-01.jpg',
    media: [
      'assets/presentation/jalal/jalal-01.jpg',
      'assets/presentation/jalal/jalal-02.jpg',
      'assets/presentation/jalal/jalal-03.jpg',
      'assets/presentation/jalal/jalal-04.jpg',
      'assets/presentation/jalal/jalal-05.jpg',
      'assets/presentation/jalal/jalal-06.jpg',
      'assets/presentation/jalal/jalal-07.jpg',
      'assets/presentation/jalal/jalal-08.jpg',
      'assets/presentation/jalal/jalal-09.jpg',
      'assets/presentation/jalal/jalal-10.jpg',
      'assets/presentation/jalal/jalal-11.jpg',
      'assets/presentation/jalal/jalal-12.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '842/595',
    originalFiles: ['E:\\Portfolio\\Presentations\\JALAL EVENT PRESENTATION.pdf',
      'E:\\Portfolio\\Presentations\\Size A4 Booklet Jalal.pdf',],
  },
  {
    id: 'shafa-al-shams',
    title: 'Shafa Al Shams',
    slug: 'shafa-al-shams',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Shafa Al Shams',
    description: 'Presentation deck for Shafa Al Shams.',
    thumbnail: 'assets/presentation/shafa-al-shams/shafa-al-shams-01.jpg',
    media: [
      'assets/presentation/shafa-al-shams/shafa-al-shams-01.jpg',
      'assets/presentation/shafa-al-shams/shafa-al-shams-02.jpg',
      'assets/presentation/shafa-al-shams/shafa-al-shams-03.jpg',
      'assets/presentation/shafa-al-shams/shafa-al-shams-04.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '960/540',
    originalFiles: ['E:\\Portfolio\\Presentations\\Shafa al shams.pdf'],
  },
  {
    id: 'stage-nine',
    title: 'Stage Nine',
    slug: 'stage-nine',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Stage Nine',
    description: 'Brand proposal and visual system presentation.',
    thumbnail: 'assets/presentation/stage-nine/stage-nine-01.jpg',
    media: [
      'assets/presentation/stage-nine/stage-nine-01.jpg',
      'assets/presentation/stage-nine/stage-nine-02.jpg',
      'assets/presentation/stage-nine/stage-nine-03.jpg',
      'assets/presentation/stage-nine/stage-nine-04.jpg',
      'assets/presentation/stage-nine/stage-nine-05.jpg',
      'assets/presentation/stage-nine/stage-nine-06.jpg',
      'assets/presentation/stage-nine/stage-nine-07.jpg',
      'assets/presentation/stage-nine/stage-nine-08.jpg',
      'assets/presentation/stage-nine/stage-nine-09.jpg',
      'assets/presentation/stage-nine/stage-nine-10.jpg',
      'assets/presentation/stage-nine/stage-nine-11.jpg',
      'assets/presentation/stage-nine/stage-nine-12.jpg',
      'assets/presentation/stage-nine/stage-nine-13.jpg',
      'assets/presentation/stage-nine/stage-nine-14.jpg',
      'assets/presentation/stage-nine/stage-nine-15.jpg',
      'assets/presentation/stage-nine/stage-nine-16.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '960/540',
    originalFiles: ['E:\\Portfolio\\Presentations\\Stage Nine.pdf'],
  },
  {
    id: 'trillium',
    title: 'Trillium Event Proposal',
    slug: 'trillium',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'Trillium',
    description: 'Event proposal presentation for Trillium.',
    thumbnail: 'assets/presentation/trillium/trillium-01.jpg',
    media: [
      'assets/presentation/trillium/trillium-01.jpg',
      'assets/presentation/trillium/trillium-02.jpg',
      'assets/presentation/trillium/trillium-03.jpg',
      'assets/presentation/trillium/trillium-04.jpg',
      'assets/presentation/trillium/trillium-05.jpg',
      'assets/presentation/trillium/trillium-06.jpg',
      'assets/presentation/trillium/trillium-07.jpg',
      'assets/presentation/trillium/trillium-08.jpg',
      'assets/presentation/trillium/trillium-09.jpg',
      'assets/presentation/trillium/trillium-10.jpg',
      'assets/presentation/trillium/trillium-11.jpg',
      'assets/presentation/trillium/trillium-12.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '1191/842',
    originalFiles: ['E:\\Portfolio\\Presentations\\TRILLIUM EVENT PROPOSAL.pdf'],
  },
  {
    id: 'white-graphics-brochure',
    title: 'White Graphics Brochure',
    slug: 'white-graphics-brochure',
    category: 'presentation',
    sourceFolder: 'E:\\Portfolio\\Presentations',
    year: 2025,
    client: 'White Graphics',
    description: 'Corporate brochure design for White Graphics.',
    thumbnail: 'assets/presentation/white-graphics-brochure/white-graphics-brochure-01.jpg',
    media: [
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-01.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-02.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-03.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-04.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-05.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-06.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-07.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-08.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-09.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-10.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-11.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-12.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-13.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-14.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-15.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-16.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-17.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-18.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-19.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-20.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-21.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-22.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-23.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-24.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-25.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-26.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-27.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-28.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-29.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-30.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-31.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-32.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-33.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-34.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-35.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-36.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-37.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-38.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-39.jpg',
      'assets/presentation/white-graphics-brochure/white-graphics-brochure-40.jpg',
    ],
    mediaTypes: ['pdf'],
    pdfRatio: '870/595',
    originalFiles: ['E:\\Portfolio\\Presentations\\WHITE GRAPHICS BROCHURE.pdf'],
  },

  // ── SOCIAL MEDIA ───────────────────────────────────────────────
  {
    id: 'arata',
    title: 'Arata Campaign',
    slug: 'arata',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Arata',
    description: 'Social media creative campaign.',
    thumbnail: 'assets/social/arata/arata-1.png',
    media: [
      'assets/social/arata/arata-1.png',
      'assets/social/arata/arata-3.png',
      'assets/social/arata/arata-4.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\arata\\creative ad arata 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\arata\\creative ad arata 3.png',
      'E:\\Portfolio\\Social Media\\_selected\\arata\\creative ad arata 4.png',
    ],
  },
  {
    id: 'dot-and-key',
    title: 'Dot & Key Campaign',
    slug: 'dot-and-key',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Dot & Key',
    description: 'Social media creative campaign.',
    thumbnail: 'assets/social/dot-and-key/1.png',
    media: [
      'assets/social/dot-and-key/1.png',
      'assets/social/dot-and-key/2.png',
      'assets/social/dot-and-key/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\dot-and-key\\1.png',
      'E:\\Portfolio\\Social Media\\_selected\\dot-and-key\\2.png',
      'E:\\Portfolio\\Social Media\\_selected\\dot-and-key\\3.png',
    ],
  },
  {
    id: 'euphoria-campaign',
    title: 'Euphoria Campaign',
    slug: 'euphoria-campaign',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2026,
    client: 'Euphoria Experiences',
    description: 'Editorial social media campaign for the agency brand.',
    thumbnail: 'assets/social/euphoria/1.webp',
    media: [
      'assets/social/euphoria/1.webp',
      'assets/social/euphoria/2.webp',
      'assets/social/euphoria/3.webp',
      'assets/social/euphoria/4.webp',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\euphoria\\1.webp',
      'E:\\Portfolio\\Social Media\\_selected\\euphoria\\2.webp',
      'E:\\Portfolio\\Social Media\\_selected\\euphoria\\3.webp',
      'E:\\Portfolio\\Social Media\\_selected\\euphoria\\4.webp',
    ],
  },
  {
    id: 'learnbay',
    title: 'Learnbay Campaign',
    slug: 'learnbay',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2022,
    client: 'Learnbay',
    description: 'Social media creative campaign for Learnbay.',
    thumbnail: 'assets/social/learnbay/1.png',
    media: [
      'assets/social/learnbay/1.png',
      'assets/social/learnbay/2.png',
      'assets/social/learnbay/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\learnbay\\1.png',
      'E:\\Portfolio\\Social Media\\_selected\\learnbay\\2.png',
      'E:\\Portfolio\\Social Media\\_selected\\learnbay\\Learnbay2.png',
    ],
  },
  {
    id: 'new-herbs',
    title: 'New Herbs Campaign',
    slug: 'new-herbs',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'New Herbs',
    description: 'Social media creative campaign for New Herbs.',
    thumbnail: 'assets/social/new-herbs/1.png',
    media: [
      'assets/social/new-herbs/1.png',
      'assets/social/new-herbs/2.png',
      'assets/social/new-herbs/3.webp',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\new-herbs\\new herbs creative ad 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\new-herbs\\new herbs creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\new-herbs\\new herbs creative ad 3.png',
    ],
  },
  {
    id: 'nirmalaya',
    title: 'Nirmalaya Campaign',
    slug: 'nirmalaya',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Nirmalaya',
    description: 'Social media creative campaign for Nirmalaya.',
    thumbnail: 'assets/social/nirmalaya/1.png',
    media: [
      'assets/social/nirmalaya/1.png',
      'assets/social/nirmalaya/2.webp',
      'assets/social/nirmalaya/3.webp',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\nirmalaya\\nirmalaya creative ad 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\nirmalaya\\nirmalaya creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\nirmalaya\\nirmalaya creative ad 3.png',
    ],
  },
  {
    id: 'organic-b',
    title: 'Organic B Campaign',
    slug: 'organic-b',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Organic B',
    description: 'Social media creative campaign for Organic B.',
    thumbnail: 'assets/social/organic-b/1.png',
    media: [
      'assets/social/organic-b/1.png',
      'assets/social/organic-b/2.webp',
      'assets/social/organic-b/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\organic-b\\organic b creative ad 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\organic-b\\organic b creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\organic-b\\organic b creative ad 3.png',
    ],
  },
  {
    id: 'rustic-art',
    title: 'Rustic Art Campaign',
    slug: 'rustic-art',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Rustic Art',
    description: 'Social media creative campaign for Rustic Art.',
    thumbnail: 'assets/social/rustic-art/2.png',
    media: [
      'assets/social/rustic-art/2.png',
      'assets/social/rustic-art/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\rustic-art\\rustic art creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\rustic-art\\rustic art creative ad 3.png',
    ],
  },
  {
    id: 'satthwa',
    title: 'Satthwa Campaign',
    slug: 'satthwa',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Satthwa',
    description: 'Social media creative campaign for Satthwa.',
    thumbnail: 'assets/social/satthwa/1.png',
    media: [
      'assets/social/satthwa/1.png',
      'assets/social/satthwa/2.webp',
      'assets/social/satthwa/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\satthwa\\satthwa creative ad 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\satthwa\\satthwa creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\satthwa\\satthwa creative ad 3.png',
    ],
  },
  {
    id: 'ustraa',
    title: 'Ustraa Campaign',
    slug: 'ustraa',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2023,
    client: 'Ustraa',
    description: 'Social media creative campaign for Ustraa.',
    thumbnail: 'assets/social/ustraa/1.png',
    media: [
      'assets/social/ustraa/1.png',
      'assets/social/ustraa/2.png',
      'assets/social/ustraa/3.png',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\_selected\\ustraa\\ustraa creative ad 1.png',
      'E:\\Portfolio\\Social Media\\_selected\\ustraa\\ustraa creative ad 2.png',
      'E:\\Portfolio\\Social Media\\_selected\\ustraa\\ustraa creative ad 3.png',
    ],
  },
  {
    id: 'editorial-posters',
    title: 'Editorial Posters',
    slug: 'editorial-posters',
    category: 'social-media',
    sourceFolder: 'E:\\Portfolio\\Social Media',
    year: 2026,
    client: 'Various brands',
    description: 'Editorial and campaign poster designs for various brands.',
    thumbnail: 'assets/social/posters/photo_2026-09-11_03-41-43.jpg',
    media: [
      'assets/social/posters/photo_2026-09-11_03-41-43.jpg',
      'assets/social/posters/photo_2026-09-11_03-41-48.jpg',
      'assets/social/posters/photo_2026-09-11_03-41-53.jpg',
      'assets/social/posters/photo_2026-09-11_03-42-06.jpg',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Social Media\\poster\\photo_2026-09-11_03-41-43.jpg',
      'E:\\Portfolio\\Social Media\\poster\\photo_2026-09-11_03-41-48.jpg',
      'E:\\Portfolio\\Social Media\\poster\\photo_2026-09-11_03-41-53.jpg',
      'E:\\Portfolio\\Social Media\\poster\\photo_2026-09-11_03-42-06.jpg',
    ],
  },

  // ── WEBSITES ───────────────────────────────────────────────────
  {
    id: 'euphoria-website',
    title: 'Euphoria Experiences Website',
    slug: 'euphoria-website',
    category: 'websites',
    sourceFolder: 'E:\\Portfolio\\Websites',
    year: 2026,
    client: 'Euphoria Experiences',
    description: 'Agency website design at desktop and large resolutions.',
    thumbnail: 'assets/websites/live/euphoria.jpg',
    liveUrl: 'https://euphoriaexperiences.com/',
    liveFront: 'assets/websites/live/euphoria.jpg',
    media: [
      'assets/websites/live/euphoria.jpg',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Websites\\web\\euphoria-experiences@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\euphoria-experiences@1920w.jpg',
    ],
  },
  {
    id: 'grc',
    title: 'GRC Website Evolution',
    slug: 'grc',
    category: 'websites',
    sourceFolder: 'E:\\Portfolio\\Websites',
    year: 2026,
    client: 'GRC',
    description: 'Website design iterations exploring visual evolution for GRC.',
    thumbnail: 'assets/websites/live/grc-v1.jpg',
    liveUrl: 'https://euphoria-vision.com/static/preview/grc-v3/index.html',
    liveFront: 'assets/websites/live/grc-v3.jpg',
    liveUrls: [
      { label: 'GRC v1', url: 'https://euphoria-vision.com/static/preview/grc-v1/index.html' },
      { label: 'GRC v2', url: 'https://euphoria-vision.com/static/preview/grc-v2/index.html' },
      { label: 'GRC v3', url: 'https://euphoria-vision.com/static/preview/grc-v3/index.html' },
    ],
    media: [
      'assets/websites/live/grc-v1.jpg',
      'assets/websites/live/grc-v2.jpg',
      'assets/websites/live/grc-v3.jpg',
      'assets/websites/grc-evolution-sheet@1400w.jpg',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Websites\\web\\grc-v1@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-v1@1920w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-v2@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-v2@1920w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-v3@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-v3@1920w.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-evolution-sheet.jpg',
      'E:\\Portfolio\\Websites\\web\\grc-evolution-sheet@1400w.jpg',
    ],
  },
  {
    id: 'marsa-atelier',
    title: 'Marsa Atelier',
    slug: 'marsa-atelier',
    category: 'websites',
    sourceFolder: 'E:\\Portfolio\\Websites',
    year: 2026,
    client: 'Marsa Atelier',
    description: 'Architecture and interior design website concept for Marsa Atelier.',
    thumbnail: 'assets/websites/marsa-atelier-hero@1400w.jpg',
    liveUrl: 'https://euphoria-vision.com/static/preview/marsa-atelier-2026-06-04/index.html',
    liveFront: 'assets/websites/marsa-atelier-hero@1400w.jpg',
    media: [
      'assets/websites/marsa-atelier-hero@1400w.jpg',
      'assets/websites/marsa-atelier-hero@1920w.jpg',
      'assets/websites/marsa-atelier@1400w.jpg',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Websites\\Marsa-Atelier-—-Architecture-Interior-Design-09-11-2026_05_49_AM.png',
      'E:\\Portfolio\\Websites\\web\\marsa-atelier@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\marsa-atelier@1920w.jpg',
      'E:\\Portfolio\\Websites\\web\\marsa-atelier-hero@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\marsa-atelier-hero@1920w.jpg',
    ],
  },
  {
    id: 'najd-sands',
    title: 'Najd Sands',
    slug: 'najd-sands',
    category: 'websites',
    sourceFolder: 'E:\\Portfolio\\Websites',
    year: 2026,
    client: 'Najd Sands',
    description: 'Luxury desert resort website concept for Najd Sands, AlUla.',
    thumbnail: 'assets/websites/live/najd.jpg',
    liveUrl: 'https://euphoria-vision.com/static/preview/najd-sands-2026-06-04/index.html',
    liveFront: 'assets/websites/live/najd.jpg',
    media: [
      'assets/websites/najd-sands-hero@1400w.jpg',
      'assets/websites/najd-sands-hero@1920w.jpg',
      'assets/websites/najd-sands@1400w.jpg',
    ],
    mediaTypes: ['image'],
    originalFiles: [
      'E:\\Portfolio\\Websites\\Najd-Sands-—-Luxury-Desert-Resort-AlUla-09-11-2026_05_48_AM.png',
      'E:\\Portfolio\\Websites\\web\\najd-sands@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\najd-sands@1920w.jpg',
      'E:\\Portfolio\\Websites\\web\\najd-sands-hero@1400w.jpg',
      'E:\\Portfolio\\Websites\\web\\najd-sands-hero@1920w.jpg',
    ],
  },
];

export const aiProjects: AiProject[] = [
  {
    id: 'agent-fleet',
    title: 'Agent Fleet',
    slug: 'agent-fleet',
    summary: 'Multi-agent operating system coordinating 9 autonomous seat profiles (sovereign, marshal, mason, prism, crucible, lantern, herald, steward, mother) and an orchestration lane. Governed through a centralized Paperclip issue board with gateway event routing, model churn loop protection, and automated health monitoring.',
    role: 'Systems architecture & fleet orchestration',
    status: 'Live',
    stack: ['Hermes Agent', 'Paperclip', 'Cron', 'MCP'],
    architecture: 'assets/ai/diagrams/fleet/fleet-topology.png',
    screenshots: [],
    agent: 'sovereign (CEO & governance owner)',
    company: 'NOT-IN-SOURCE',
    owner: 'sovereign (CEO & governance owner)',
    why_created: 'To coordinate 9 autonomous seat profiles and an orchestration lane as one governed system rather than isolated agents.',
    day_to_day_value: 'Fleet runs as one coordinated system: centralized Paperclip issue board, gateway event routing, model churn loop protection, automated health monitoring.',
    skills: ['fleet-model-allocation', 'dispatch-discipline', 'cron-dispatch-triage'],
    skillDetails: [
      {
        name: 'fleet-model-allocation',
        status: 'installed',
        description: 'Apply a Founder-approved model blueprint fleet-wide across all agent profiles in config.yaml.',
      },
      {
        name: 'dispatch-discipline',
        status: 'installed',
        description: 'Pre-dispatch verification checklist: verify slugs, exact key paths, bounded scope, and live readbacks.',
      },
      {
        name: 'cron-dispatch-triage',
        status: 'installed',
        description: 'Triage failed or ownerless cron jobs with live-API re-derivation and explicit verdicts.',
      },
    ],
    links: [
      { label: 'Interactive Fleet Topology (Archify)', url: 'assets/ai/diagrams/fleet/fleet-topology.html', type: 'diagram' },
      { label: 'Fleet Request Journey Sequence (Archify)', url: 'assets/ai/diagrams/fleet/fleet-request-chain.html', type: 'diagram' },
    ],
    demos: [{ label: 'Fleet Overview Walkthrough', url: '' }],
  },
  {
    id: 'skills-library',
    title: 'Skills Library',
    slug: 'skills-library',
    summary: 'Standardized procedural memory framework replacing lossy session context with verifiable, versioned SKILL.md packages. Built on a triple-provenance model (upstream adaptation, per-profile projection, and internal operational capture) governed by automated curator hygiene.',
    role: 'Skill authoring & governance',
    status: 'Live',
    stack: ['SKILL.md', 'YAML Frontmatter', 'Git', 'Hermes Agent'],
    architecture: 'assets/ai/diagrams/platform/fig1-skills-path.png',
    screenshots: [],
    agent: 'steward (Fleet maintainer & skills custodian)',
    company: 'NOT-IN-SOURCE',
    owner: 'steward (Fleet maintainer & skills custodian)',
    why_created: 'To replace lossy session context with verifiable, versioned SKILL.md packages.',
    day_to_day_value: 'Every agent reads the same verifiable SKILL.md; roadmap skills omh-skill-health and omh-skill-scout have no SKILL.md yet.',
    skills: ['skill-maintainer', 'omh-skill-health', 'omh-skill-scout'],
    skillDetails: [
      {
        name: 'skill-maintainer',
        status: 'installed',
        description: 'Track upstream drift, sync, and publish adapted skill libraries across seats (meta-skill).',
      },
      {
        name: 'omh-skill-health',
        status: 'roadmap',
        description: 'OMH plugin capability scoring and skill portfolio health auditing (Roadmap).',
      },
      {
        name: 'omh-skill-scout',
        status: 'roadmap',
        description: 'Skill reuse discovery and redundancy prevention before authoring new skills (Roadmap).',
      },
    ],
    links: [
      { label: 'Interactive Skills Path Dataflow (Archify)', url: 'assets/ai/diagrams/platform/fig1-skills-path.html', type: 'diagram' },
    ],
    demos: [{ label: 'Skill Authoring & Projection Walkthrough', url: '' }],
  },
  {
    id: 'orio-operations',
    title: 'OrIO Operations',
    slug: 'orio-operations',
    summary: 'Operational intelligence console engineered for the Innovex pilot, tracking rig, well, and job-cycle lifecycles in real time. Features automated reconciliation, Material Data Delivery (MDD) verification, and an active market-intelligence feed.',
    role: 'Console design & build',
    status: 'Pilot live',
    stack: ['Hermes Desktop', 'FastAPI', 'SQLite', 'Plugin SDK'],
    architecture: 'assets/ai/diagrams/orio/orio-operations.png',
    screenshots: [],
    agent: 'OrIO (Innovex pilot)',
    company: 'Innovex',
    owner: 'OrIO (Innovex pilot)',
    why_created: 'Built as a real product for the Innovex 90-day AI operations pilot.',
    day_to_day_value: 'Real-time tracking of rig, well and job-cycle lifecycles; automated reconciliation and MDD verification gates; daily operational digest for field operators; active regional market-intelligence feed.',
    skills: ['orio-operations-core', 'orio-market-intelligence', 'orio-validation', 'orio-morning-report'],
    skillDetails: [
      {
        name: 'orio-operations-core',
        status: 'project',
        description: 'Core domain operations and rig lifecycle telemetry (ORIO pilot package).',
      },
      {
        name: 'orio-market-intelligence',
        status: 'project',
        description: 'Automated tracking and extraction of regional market intelligence signals (ORIO pilot).',
      },
      {
        name: 'orio-validation',
        status: 'project',
        description: 'Well telemetry and MDD reconciliation verification gates (ORIO pilot).',
      },
      {
        name: 'orio-morning-report',
        status: 'project',
        description: 'Daily operational digest generation for field operators (ORIO pilot).',
      },
    ],
    links: [
      { label: 'Interactive Operations Architecture (Archify)', url: 'assets/ai/diagrams/orio/orio-operations.html', type: 'diagram' },
      { label: 'Market Intelligence Dataflow (Archify)', url: 'assets/ai/diagrams/orio/orio-market-intel.html', type: 'diagram' },
    ],
    // Posters follow the demoPoster() convention: <video-basename>-poster.jpg.
    // Both matching poster frames ship beside these two mp4s on disk.
    demos: [
      { label: 'Operations Pilot Walkthrough', url: 'assets/ai/videos/orio-operations-pilot-demo.mp4' },
      { label: 'Market Intelligence Feature Demo', url: 'assets/ai/videos/orio-market-intelligence-demo.mp4' },
    ],
  },
  {
    id: 'leadjin-portal',
    title: 'LeadJin Portal',
    slug: 'leadjin-portal',
    summary: 'B2B regional intelligence platform for Saudi Arabia, combining automated discovery pipelines with official commercial registry validation. Feeds verified company profiles, decision-maker contacts, and place data directly into Twenty CRM over GraphQL.',
    role: 'Data pipeline & portal build',
    status: 'Pilot',
    stack: ['React 19', 'Vite', 'Express', 'SQLite', 'Twenty CRM'],
    architecture: 'assets/ai/diagrams/products/leadjin-portal.png',
    screenshots: [],
    agent: 'mason (Fullstack lead)',
    company: 'NOT-IN-SOURCE',
    owner: 'mason (Fullstack lead)',
    why_created: 'To combine automated discovery pipelines with official commercial registry validation and feed verified data into Twenty CRM.',
    day_to_day_value: 'Verified KSA lead discovery fed directly into Twenty CRM; no manual commercial registry lookups; currently a Pilot.',
    skills: ['verified-lead-discovery', 'euphoria-places-lead-discovery', 'twenty-crm'],
    skillDetails: [
      {
        name: 'verified-lead-discovery',
        status: 'installed',
        description: 'Keyless KSA verified-lead discovery pipeline with per-gate evidence URLs.',
      },
      {
        name: 'euphoria-places-lead-discovery',
        status: 'installed',
        description: 'Gated prospecting flow via Google Places for Saudi business entities.',
      },
      {
        name: 'twenty-crm',
        status: 'installed',
        description: 'Twenty CRM GraphQL integration managing stages from NEW to CUSTOMER.',
      },
    ],
    links: [
      { label: 'Interactive Portal Architecture (Archify)', url: 'assets/ai/diagrams/products/leadjin-portal.html', type: 'diagram' },
    ],
    demos: [{ label: 'Pipeline & Discovery Demo', url: '' }],
  },
  {
    id: 'approval-inbox',
    title: 'Approval Inbox',
    slug: 'approval-inbox',
    summary: 'Unified decision gateway inside Hermes Desktop that routes all high-impact actions through the default orchestrator for Founder ruling. Integrates cryptographic hash gating and SiYuan state storage to prevent unverified executions.',
    role: 'Approval workflow design',
    status: 'Live',
    stack: ['Hermes Desktop', 'Plugin SDK', 'Hermes Agent', 'SiYuan'],
    architecture: 'assets/ai/diagrams/products/approval-inbox.png',
    screenshots: [],
    agent: 'steward (Governance custodian)',
    company: 'NOT-IN-SOURCE',
    owner: 'steward (Governance custodian)',
    why_created: 'To route every high-impact action through Founder ruling with cryptographic hash gating and SiYuan state storage.',
    day_to_day_value: 'Every high-impact action needs Founder ruling before execution; hash-gated, SiYuan-stored. Unverified executions are prevented.',
    skills: ['euphoria-approval-queue', 'proposal-send'],
    skillDetails: [
      {
        name: 'euphoria-approval-queue',
        status: 'installed',
        description: 'Founder approval workflow through SiYuan EUPHORIA APPROVALS store.',
      },
      {
        name: 'proposal-send',
        status: 'installed',
        description: 'Verified proposal dispatch with snapshot auditing and OTP safeguards.',
      },
    ],
    links: [
      { label: 'Interactive Architecture Diagram (Archify)', url: 'assets/ai/diagrams/products/approval-inbox.html', type: 'diagram' },
    ],
    demos: [{ label: 'Approval Queue & Decision Flow', url: '' }],
  },
  {
    id: 'paperclip-plugin',
    title: 'Paperclip Plugin',
    slug: 'paperclip-plugin',
    summary: 'Native desktop and agent integration layer connecting Hermes runtimes to Paperclip company boards. Enables autonomous issue checkout, heartbeat reporting, attachment uploads, and recovery-action disposition without breaking context.',
    role: 'Plugin engineering',
    status: 'Live',
    stack: ['Hermes Agent', 'Plugin SDK', 'TypeScript', 'Paperclip API'],
    architecture: 'assets/ai/diagrams/platform/fig3-paperclip.png',
    screenshots: [],
    agent: 'mason (Integration engineer)',
    company: 'NOT-IN-SOURCE',
    owner: 'mason (Integration engineer)',
    why_created: 'To connect Hermes runtimes to Paperclip company boards for autonomous issue checkout, heartbeat reporting, attachment uploads, and recovery disposition.',
    day_to_day_value: 'Agents operate Paperclip company boards autonomously. Checkout, heartbeat, upload and recover happen without breaking context.',
    skills: ['paperclip-sop', 'hermes-plugin-development'],
    skillDetails: [
      {
        name: 'paperclip-sop',
        status: 'installed',
        description: 'Paperclip governance SOP: issues, attachments, runs, and recovery actions.',
      },
      {
        name: 'hermes-plugin-development',
        status: 'installed',
        description: 'Plugin SDK lifecycle: hot-reload, contract registration, and persistence.',
      },
    ],
    links: [
      { label: 'Interactive Plugin Architecture (Archify)', url: 'assets/ai/diagrams/platform/fig3-paperclip.html', type: 'diagram' },
    ],
    demos: [{ label: 'Plugin Execution & Checkout Demo', url: '' }],
  },
  {
    id: 'hermes-engine',
    title: 'Hermes Engine',
    slug: 'hermes-engine',
    summary: 'Customized Hermes runtime distribution embedding enterprise governance: Rule 0 routing gates, Step 0 pre-flight skill validation, and isolated per-profile configuration islands. Ensures deterministic multi-agent execution across local and cloud backends.',
    role: 'Runtime configuration & orchestration',
    status: 'Live',
    stack: ['Hermes Agent', 'Python', 'YAML', 'Plugins'],
    architecture: 'assets/ai/diagrams/platform/fig2-engine-fork.png',
    screenshots: [],
    agent: 'steward (Core runtime maintainer)',
    company: 'NOT-IN-SOURCE',
    owner: 'steward (Core runtime maintainer)',
    why_created: 'To customize the Hermes runtime with enterprise governance (Rule 0, Step 0) for deterministic multi-agent execution.',
    day_to_day_value: 'Deterministic multi-agent execution across local and cloud backends; Rule 0 gates and Step 0 pre-flight validation enforced.',
    skills: ['hermes-agent', 'plugin-discipline', 'omh-routing'],
    skillDetails: [
      {
        name: 'hermes-agent',
        status: 'installed',
        description: 'Core runtime management: profiles, model providers, and bot orchestration.',
      },
      {
        name: 'plugin-discipline',
        status: 'installed',
        description: 'Plugin lifecycle auditing: enforcing standing workflows per installed extension.',
      },
      {
        name: 'omh-routing',
        status: 'roadmap',
        description: 'Mixture-of-agents task delegation and OMH meta-router (Roadmap).',
      },
    ],
    links: [
      { label: 'Interactive Engine Architecture (Archify)', url: 'assets/ai/diagrams/platform/fig2-engine-fork.html', type: 'diagram' },
    ],
    demos: [{ label: 'Runtime Lifecycle & Rule 0 Demo', url: '' }],
  },
  {
    id: 'automations',
    title: 'Automations',
    slug: 'automations',
    summary: 'Scheduled background intelligence infrastructure running 38+ autonomous cron workflows across the fleet. Powers continuous news dedup digests, social media publishing bridges, and live API drift monitoring with zero human intervention.',
    role: 'Automation design & monitoring',
    status: 'Live',
    stack: ['Hermes Agent', 'Cron', 'Paperclip', 'MCP'],
    architecture: 'assets/ai/diagrams/platform/fig4-automations.png',
    screenshots: [],
    agent: 'lantern (Operations & automation lead)',
    company: 'NOT-IN-SOURCE',
    owner: 'lantern (Operations & automation lead)',
    why_created: 'To run 38+ autonomous cron workflows with zero human intervention.',
    day_to_day_value: 'Continuous news dedup digests, social publishing bridges, live API drift monitoring. Zero human intervention.',
    skills: ['cron-dispatch-triage', 'scheduled-cronjob-review', 'topic-digest-cron'],
    skillDetails: [
      {
        name: 'cron-dispatch-triage',
        status: 'installed',
        description: 'Failure detection and auto-recovery for root cron registry jobs.',
      },
      {
        name: 'scheduled-cronjob-review',
        status: 'installed',
        description: 'Scheduled watch verification against live external APIs.',
      },
      {
        name: 'topic-digest-cron',
        status: 'installed',
        description: 'Automated deduplicated news digest pipelines with routing.',
      },
    ],
    links: [
      { label: 'Interactive Automation Workflow (Archify)', url: 'assets/ai/diagrams/platform/fig4-automations.html', type: 'diagram' },
    ],
    demos: [{ label: 'Automated Sweep & Dedup Pipeline', url: '' }],
  },
];

export function getProjectsByCategory(categorySlug: string): Project[] {
  // Resolve slug to category id (e.g. 'presentation-design' → 'presentation')
  const category = getCategoryBySlug(categorySlug)
  const categoryId = category?.id || categorySlug
  return projects.filter((p) => p.category === categoryId);
}

export function getProject(categorySlug: string, projectSlug: string): Project | undefined {
  const category = getCategoryBySlug(categorySlug)
  const categoryId = category?.id || categorySlug
  return projects.find((p) => p.category === categoryId && p.slug === projectSlug);
}

export function getNextProject(project: Project): Project | null {
  const categoryProjects = getProjectsByCategory(project.category);
  const idx = categoryProjects.findIndex((p) => p.id === project.id);
  if (idx === -1 || idx === categoryProjects.length - 1) return null;
  return categoryProjects[idx + 1];
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug)
}

export function getCategoryById(id: string): Category | undefined {
  return categories.find((c) => c.id === id)
}

// Backward compatibility
export const getCategory = getCategoryBySlug

export function getPreviousProject(project: Project): Project | null {
  const categoryProjects = getProjectsByCategory(project.category)
  const idx = categoryProjects.findIndex((p) => p.id === project.id)
  if (idx <= 0) return null
  return categoryProjects[idx - 1]
}

export function getAiProjects(): AiProject[] {
  return aiProjects;
}

export function getAiProject(slug: string): AiProject | undefined {
  return aiProjects.find((p) => p.slug === slug);
}

