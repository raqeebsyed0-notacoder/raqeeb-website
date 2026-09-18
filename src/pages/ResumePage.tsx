import { useState } from 'react'
import PageLayout from '../components/PageLayout'
import { Download, Mail, Phone, MapPin } from 'lucide-react'

const tools = [
  { name: 'Figma', level: 95, category: 'Design' },
  { name: 'Adobe Photoshop', level: 90, category: 'Design' },
  { name: 'Adobe Illustrator', level: 88, category: 'Design' },
  { name: 'Adobe InDesign', level: 85, category: 'Design' },
  { name: 'PowerPoint', level: 95, category: 'Presentation' },
  { name: 'Google Slides', level: 90, category: 'Presentation' },
  { name: 'AI Image Generators', level: 85, category: 'AI' },
  { name: 'Video Editing', level: 70, category: 'AI' },
  { name: 'Motion Graphics', level: 65, category: 'AI' },
  { name: 'Print Production', level: 88, category: 'Production' },
]

const clients = [
  { name: 'Euphoria Experiences', metric: 'Agency Identity + Web' },
  { name: 'Buyology', metric: 'Brand Guidelines' },
  { name: 'GRC', metric: '3 Website Iterations' },
  { name: 'Jalal', metric: 'Event Presentation' },
  { name: 'Marsa Atelier', metric: 'Architecture Web' },
  { name: 'Najd Sands', metric: 'Hospitality Web' },
]

export default function ResumePage() {
  const [activeTab, setActiveTab] = useState<'experience' | 'tools'>('experience')

  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-12">
          <div>
            <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
              Resume
            </p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase font-normal leading-[0.9]">
              Raqeeb Hussain
            </h1>
          </div>
          <a
            href="/Raqeeb_Hussain_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-4 py-2 text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90 transition-colors"
          >
            <Download size={16} />
            Download PDF
          </a>
        </div>

        {/* Contact strip */}
        <div className="flex flex-wrap gap-6 text-xs text-white/50 mb-12 pb-8 border-b border-white/10">
          <span className="flex items-center gap-1.5">
            <Mail size={12} />
            raqeebsyed0@gmail.com
          </span>
          <span className="flex items-center gap-1.5">
            <Phone size={12} />
            +966 58 308 1453
          </span>
          <span className="flex items-center gap-1.5">
            <MapPin size={12} />
            Dammam, Saudi Arabia
          </span>
        </div>

        {/* Tab toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setActiveTab('experience')}
            className={`text-xs uppercase tracking-widest pb-2 border-b-2 transition-colors ${
              activeTab === 'experience'
                ? 'border-white text-white'
                : 'border-transparent text-white/50 hover:text-white/70'
            }`}
          >
            Experience & Clients
          </button>
          <button
            onClick={() => setActiveTab('tools')}
            className={`text-xs uppercase tracking-widest pb-2 border-b-2 transition-colors ${
              activeTab === 'tools'
                ? 'border-white text-white'
                : 'border-transparent text-white/50 hover:text-white/70'
            }`}
          >
            Tool Stack
          </button>
        </div>

        {activeTab === 'experience' && (
          <div className="space-y-8">
            {/* Summary */}
            <section>
              <h3 className="text-xs text-white/50 uppercase tracking-widest mb-3">
                Profile
              </h3>
              <p className="text-sm text-white/80 leading-relaxed max-w-2xl">
                Visual designer creating clear, polished work across brands, presentations, campaigns and digital experiences. Combines structured design thinking with AI-assisted creative production to deliver high-quality visual communication for corporate and brand clients.
              </p>
            </section>

            {/* Clients with metrics */}
            <section>
              <h3 className="text-xs text-white/50 uppercase tracking-widest mb-3">
                Selected Clients
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {clients.map((c) => (
                  <div key={c.name} className="border border-white/10 p-4">
                    <p className="text-sm text-white/90 mb-1">{c.name}</p>
                    <p className="text-xs text-white/50">{c.metric}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Core strengths */}
            <section>
              <h3 className="text-xs text-white/50 uppercase tracking-widest mb-3">
                Core Strengths
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {[
                  'Presentation Design',
                  'Brand Identity Systems',
                  'Information Hierarchy',
                  'Proposal Design',
                  'Corporate Communications',
                  'Print-Ready Artwork',
                  'Visual Storytelling',
                  'AI Image Development',
                  'Campaign Creative',
                ].map((skill) => (
                  <p key={skill} className="text-xs text-white/70 py-1">
                    {skill}
                  </p>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <div key={tool.name} className="flex items-center gap-4">
                <div className="flex-1">
                  <div className="flex justify-between items-baseline mb-1">
                    <p className="text-sm text-white/80">{tool.name}</p>
                    <span className="text-[10px] text-white/40 uppercase tracking-wider">
                      {tool.category}
                    </span>
                  </div>
                  <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/60 rounded-full transition-all duration-500"
                      style={{ width: `${tool.level}%` }}
                    />
                  </div>
                </div>
                <span className="text-xs text-white/40 w-8 text-right">{tool.level}%</span>
              </div>
            ))}
          </div>
        )}

        {/* Download CTA */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <a
            href="/Raqeeb_Hussain_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm tracking-wide uppercase hover:bg-white/90 transition-colors"
          >
            <Download size={16} />
            Download Full Resume (PDF)
          </a>
        </div>
      </div>
    </PageLayout>
  )
}