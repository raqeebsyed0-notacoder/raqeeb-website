import PageLayout from '../components/PageLayout'
import { Download, Mail, Phone, MapPin } from 'lucide-react'

const summary =
  'I build working AI systems: agent fleets with defined roles, reusable skill libraries, CRM-connected lead pipelines, operations consoles and human approval layers. Design and sales background: I define the problem in business terms before choosing a tool.'

const sections = [
  {
    title: 'AI SYSTEMS BUILT',
    items: [
      'Agent Fleet: nine agent seats and an orchestration lane under one governed board',
      'Skills Library: versioned, reusable agent procedures',
      'LeadJin: KSA lead discovery, verification and CRM pipeline',
      'OrIO Operations: rig, well and job-cycle console with reconciliation',
      'Approval Inbox: human review in front of irreversible agent actions',
    ],
  },
  {
    title: 'CORE STRENGTHS',
    items: [
      'Requirements and workflow definition',
      'Building with AI coding agents against real repositories',
      'Integration and troubleshooting',
      'Testing and validation of AI output',
      'Presentation and information design',
    ],
  },
  {
    title: 'DESIGN BACKGROUND',
    items: [
      'Brand identity systems',
      'Executive and technical presentations',
      'Campaign and social creative',
      'Website and digital design',
    ],
  },
  {
    title: 'SELECTED CLIENTS',
    items: [
      'Euphoria Experiences',
      'Buyology',
      'GRC',
      'Jalal',
      'Marsa Atelier',
      'Najd Sands',
      'Flowserve',
      'Blaize',
      'White Graphics',
    ],
  },
]

// Verbatim from public/Raqeeb_Hussain_Resume.pdf (pdftotext), via the audited brief.
const experience = [
  'Senior Graphic Designer, Euphoria Experiences — Jan 2026 to Present, Dammam, KSA',
  'Visual Communications & Pre-Sales Specialist, White Graphics Advertising Co. — Nov 2024 to Jan 2026, Dammam, KSA',
  'Senior Creative & Marketing Specialist, Tawasol Advertising Agency / Mounts & Seas Entertainments — Jan 2023 to Oct 2023, KSA & India',
  'Marketing Communications Specialist, Learn Bay / Eloappz / D Third Eye Studio — Aug 2020 to Dec 2022, India',
]

export default function ResumePage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-12">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
            Resume
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl tracking-wide uppercase font-normal leading-[0.9]">
            RAQEEB HUSSAIN
          </h1>
          <p className="text-sm text-white/60 mt-3">AI Implementation Specialist</p>
        </div>

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

        <section className="mb-12">
          <h2 className="text-xs text-white/50 uppercase tracking-widest mb-3">
            Profile
          </h2>
          <p className="text-sm text-white/80 leading-relaxed max-w-2xl">{summary}</p>
        </section>

        {sections.map((section) => (
          <section key={section.title} className="mb-10">
            <h2 className="text-xs text-white/50 uppercase tracking-widest mb-4">
              {section.title}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
              {section.items.map((item) => (
                <li key={item} className="text-sm text-white/80 flex items-start gap-2">
                  <span className="w-1 h-1 rounded-full bg-white/30 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="mb-10">
          <h2 className="text-xs text-white/50 uppercase tracking-widest mb-4">
            EXPERIENCE
          </h2>
          <div className="space-y-3">
            {experience.map((line) => (
              <p key={line} className="text-sm text-white/80 leading-relaxed border-l border-white/10 pl-4">
                {line}
              </p>
            ))}
          </div>
        </section>

        <section className="mb-12">
          <h2 className="text-xs text-white/50 uppercase tracking-widest mb-4">
            EDUCATION &amp; LANGUAGES
          </h2>
          <p className="text-sm text-white/80 leading-relaxed">
            BA Journalism &amp; Mass Communication, IMS Unison University (2017-2020), fluent English, conversational Arabic and Urdu.
          </p>
        </section>

        <div className="mt-12 pt-8 border-t border-white/10">
          <a
            href="Raqeeb_Hussain_Resume.pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-black text-sm tracking-wide uppercase hover:bg-white/90 transition-colors"
          >
            <Download size={16} />
            Download Full Resume (PDF)
          </a>
          <p className="text-xs text-white/50 mt-3">
            This PDF is the design-era version of the resume.
          </p>
        </div>
      </div>
    </PageLayout>
  )
}
