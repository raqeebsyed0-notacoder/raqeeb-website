import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { Link } from 'react-router-dom'

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState<'disciplines' | 'tools'>('disciplines')

  const disciplines = [
    { title: 'Brand Identity Systems', desc: 'Logo, visual language, packaging, guidelines', icon: '◆' },
    { title: 'Presentation Design', desc: 'Executive decks, event presentations, proposals', icon: '◇' },
    { title: 'Social Media Creative', desc: 'Campaign systems, editorial posters, ad creatives', icon: '○' },
    { title: 'Website & Digital Design', desc: 'UI concepts, digital experiences, web systems', icon: '□' },
    { title: 'Visual Communication', desc: 'Corporate communications, infographics, print', icon: '△' },
    { title: 'AI-Assisted Production', desc: 'AI image generation, concept exploration', icon: '⬡' },
  ]

  const tools = [
    { category: 'Design', items: ['Figma', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign'], level: 'Expert' },
    { category: 'Presentation', items: ['PowerPoint', 'Google Slides', 'Keynote'], level: 'Expert' },
    { category: 'AI & Image', items: ['AI Image Generators', 'Video Editing', 'Motion Graphics'], level: 'Advanced' },
    { category: 'Production', items: ['Print-Ready Artwork', 'Prepress', 'Bilingual Layout'], level: 'Expert' },
  ]

  const clients = [
    'Buyology', 'Nasi', 'Euphoria Experiences', 'White Graphics', 'Blaize', 'Dr. Chashmawala',
    'Flowserve', 'Jalal', 'Shafa Al Shams', 'Stage Nine', 'Trillium', 'Arata',
    'Dot & Key', 'Learnbay', 'New Herbs', 'Nirmalaya', 'Organic B', 'Rustic Art',
    'Satthwa', 'Ustraa', 'GRC', 'Marsa Atelier', 'Najd Sands'
  ]

  const principles = [
    { title: 'Clarity First', desc: 'Strip away noise until the core message stands alone.' },
    { title: 'Structure Before Style', desc: 'Information hierarchy drives every layout decision.' },
    { title: 'Restraint Over Decoration', desc: 'Every element earns its place or gets removed.' },
    { title: 'Context is King', desc: 'Design for the audience, the medium, and the moment.' },
  ]

  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center mb-6 border border-white/10">
                <span className="text-4xl sm:text-5xl font-pixel text-white/40">RH</span>
              </div>
              <h1 className="text-3xl sm:text-4xl tracking-wide uppercase font-normal leading-[0.9] mb-3">
                Raqeeb
                <br />
                <span className="font-pixel font-normal text-[1.1em]">Hussain</span>
              </h1>
              <p className="text-sm text-white/60 mb-6">
                Graphic & Visual Designer — AI-Assisted Creative Production
              </p>
              <p className="text-sm text-white/70 leading-relaxed mb-8">
                Based in Dammam, Saudi Arabia. I translate complex briefs into clear, polished visual communication for brands, presentations, campaigns and digital experiences.
              </p>
              <div className="flex gap-3">
                <Link
                  to="/resume"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black text-xs tracking-wide uppercase hover:bg-white/90 transition-colors"
                >
                  View Resume
                </Link>
                <a
                  href="mailto:raqeebsyed0@gmail.com"
                  className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-xs tracking-wide uppercase hover:border-white/40 transition-colors"
                >
                  Get in Touch
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div className="mb-16">
              <div className="flex gap-4 mb-8">
                <button
                  onClick={() => setActiveTab('disciplines')}
                  className={`text-xs uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                    activeTab === 'disciplines'
                      ? 'border-white text-white'
                      : 'border-transparent text-white/50 hover:text-white/70'
                  }`}
                >
                  Disciplines
                </button>
                <button
                  onClick={() => setActiveTab('tools')}
                  className={`text-xs uppercase tracking-widest pb-2 border-b-2 transition-colors ${
                    activeTab === 'tools'
                      ? 'border-white text-white'
                      : 'border-transparent text-white/50 hover:text-white/70'
                  }`}
                >
                  Tools & Capabilities
                </button>
              </div>

              {activeTab === 'disciplines' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {disciplines.map((d, i) => (
                    <div
                      key={d.title}
                      className="group border border-white/10 p-5 hover:border-white/20 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-lg text-white/40 mt-0.5">{d.icon}</span>
                        <div>
                          <p className="text-xs text-white/40 mb-1">
                            {String(i + 1).padStart(2, '0')}
                          </p>
                          <h3 className="text-sm tracking-wide uppercase font-normal mb-1">
                            {d.title}
                          </h3>
                          <p className="text-xs text-white/60">
                            {d.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'tools' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {tools.map((group) => (
                    <div key={group.category}>
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-xs text-white/50 uppercase tracking-widest">
                          {group.category}
                        </p>
                        <span className="text-[10px] text-white/30 uppercase tracking-wider">
                          {group.level}
                        </span>
                      </div>
                      <ul className="space-y-1">
                        {group.items.map((item) => (
                          <li key={item} className="text-sm text-white/70 flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-white/30" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="mb-16">
              <h2 className="text-xs text-white/50 uppercase tracking-widest mb-4">
                Clients & Collaborations
              </h2>
              <div className="flex flex-wrap gap-2">
                {clients.map((client) => (
                  <span
                    key={client}
                    className="px-3 py-1.5 text-xs text-white/60 border border-white/10 hover:border-white/20 hover:text-white/80 transition-colors"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="text-xs text-white/50 uppercase tracking-widest mb-4">
                Design Principles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {principles.map((p, i) => (
                  <div key={p.title} className="border-l border-white/10 pl-5 py-2">
                    <p className="text-xs text-white/40 mb-1">
                      {String(i + 1).padStart(2, '0')}
                    </p>
                    <h3 className="text-sm tracking-wide uppercase font-normal mb-1">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}