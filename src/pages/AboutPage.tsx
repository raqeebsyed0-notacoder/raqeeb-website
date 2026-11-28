import PageLayout from '../components/PageLayout'
import { Link } from 'react-router-dom'

const narrative = [
  'I started in visual communication: brand systems, presentation design, campaign creative. The work is the same discipline I use now. Take something complicated, find the structure inside it, and make the next decision obvious.',
  'Client-facing work added the second half. Selling design across print, retail and hospitality meant learning what a business is actually trying to move: a deal, a hire, a shipment, a margin. A tool that ignores that is a demo.',
  'In 2025 I started building with AI directly. Not prompting for copy, but running coding agents against real repositories: defining the requirement, writing the instruction, letting the agent build, then reading the failure and fixing it. That loop is the work.',
  'Today I run a fleet of nine agent seats with their own roles, a library of reusable skills that makes their behaviour repeatable, a lead-generation module wired to a CRM, an operations console for a drilling services company, and an approval layer that puts a human in front of anything irreversible.',
]

const disciplines = [
  { n: '01', title: 'AI IMPLEMENTATION', desc: 'Agent systems, workflow automation, integration and validation.' },
  { n: '02', title: 'BUSINESS PROBLEM SOLVING', desc: 'Requirements, process mapping, and deciding what should not be automated.' },
  { n: '03', title: 'BRAND IDENTITY SYSTEMS', desc: 'Logo, visual language, guidelines.' },
  { n: '04', title: 'PRESENTATION AND COMMUNICATION DESIGN', desc: 'Executive decks, proposals, technical documents.' },
  { n: '05', title: 'DIGITAL AND CAMPAIGN DESIGN', desc: 'Websites, social creative, editorial posters.' },
]

const principles = [
  { n: '01', title: 'PROBLEM BEFORE TOOL', desc: 'If the process is wrong, automating it only makes the wrong answer faster.' },
  { n: '02', title: 'ONE OWNER PER SYSTEM', desc: 'Every component has one responsible seat, so a failure has an address.' },
  { n: '03', title: 'VERIFY BEFORE CLAIMING', desc: 'A system is done when the live output proves it, not when the build passes.' },
  { n: '04', title: 'THE ARTEFACT IS THE ARGUMENT', desc: 'Show the working thing, not a description of it.' },
]

export default function AboutPage() {
  return (
    <PageLayout>
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-8">
              <div className="w-56 sm:w-64 aspect-[3/4] rounded-xl overflow-hidden mb-6 border border-white/10">
                <img
                  src="assets/profile.jpg"
                  alt="Raqeeb Hussain"
                  className="w-full h-full object-cover"
                />
              </div>
              <h1 className="text-3xl sm:text-4xl tracking-wide uppercase font-normal leading-[0.9] mb-3">
                RAQEEB HUSSAIN
              </h1>
              <p className="text-sm text-white/60 mb-2">
                AI Implementation Specialist · Design and Visual Communication foundation
              </p>
              <p className="text-xs text-white/50 mb-6">Based in Dammam, Saudi Arabia</p>
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
            <section className="mb-16">
              <h2 className="text-xs text-white/50 uppercase tracking-widest mb-6">
                About
              </h2>
              <div className="space-y-5">
                {narrative.map((paragraph, i) => (
                  <p key={i} className="text-base text-white/80 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </section>

            <section className="mb-16">
              <h2 className="text-xs text-white/50 uppercase tracking-widest mb-6">
                Disciplines
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {disciplines.map((d) => (
                  <div key={d.n} className="border border-white/10 p-5">
                    <p className="font-pixel text-xs text-white/40 mb-2">{d.n}</p>
                    <h3 className="text-sm tracking-wide uppercase font-normal mb-2">
                      {d.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">{d.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2 className="text-xs text-white/50 uppercase tracking-widest mb-6">
                Working Principles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {principles.map((p) => (
                  <div key={p.n} className="border-l border-white/10 pl-5 py-2">
                    <p className="font-pixel text-xs text-white/40 mb-2">{p.n}</p>
                    <h3 className="text-sm tracking-wide uppercase font-normal mb-2">
                      {p.title}
                    </h3>
                    <p className="text-xs text-white/60 leading-relaxed">{p.desc}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </PageLayout>
  )
}
