// Shared data interfaces for the Raqeeb portfolio correction (audited copy).
// Contract per .audit-2026-11-28/correction/briefs/data.md — exact field names
// the renderers are written against.

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
  pdfRatio?: string;
  liveUrl?: string;
  liveFront?: string;
  liveUrls?: { label: string; url: string }[];
  // audited copy
  eyebrow: string;
  lede: string;
  facts: string;
  look: string;
  seoTitle: string;
  seoDescription: string;
}

export interface Category {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  sourceFolder: string;
  lede: string;
  note: string;
  seoTitle: string;
  seoDescription: string;
}

export interface AiProject {
  id: string;
  title: string;
  slug: string;
  eyebrow: string;
  lede: string;
  how: string[];
  contribution: string;
  verified: string;
  limits: string;
  status: 'Running' | 'Pilot' | 'Paused' | 'Archived';
  role: string;
  stack: string[];
  architecture: string;
  screenshots: string[];
  links: { label: string; url: string; type: 'diagram' | 'portal' | 'external' | 'repo' }[];
  demos: { label: string; url: string }[];
  seoTitle: string;
  seoDescription: string;
}
