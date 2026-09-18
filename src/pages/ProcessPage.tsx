import PageLayout from '../components/PageLayout'

const steps = [
  {
    number: '01',
    title: 'DISCOVER',
    description: 'Understanding your brand, audience, goals, and constraints through research and conversation.',
  },
  {
    number: '02',
    title: 'DEFINE',
    description: 'Synthesizing insights into a clear creative direction, strategy, and scope of work.',
  },
  {
    number: '03',
    title: 'DESIGN',
    description: 'Crafting visual solutions — identities, presentations, campaigns, digital experiences — with precision and restraint.',
  },
  {
    number: '04',
    title: 'REFINE',
    description: 'Iterating based on feedback until every detail is polished and the work is production-ready.',
  },
  {
    number: '05',
    title: 'DELIVER',
    description: 'Handing off final assets, files, and guidelines — ready for print, development, or distribution.',
  },
]

const capabilities = [
  { category: 'Brand', items: ['Logo Systems', 'Visual Identity', 'Brand Guidelines', 'Packaging'] },
  { category: 'Presentation', items: ['Executive Decks', 'Event Presentations', 'Proposals', 'Brochures'] },
  { category: 'Digital', items: ['Social Media Creative', 'Web Concepts', 'UI Systems', 'AI-Assisted Production'] },
]

export default function ProcessPage() {
  return (
    <PageLayout>
      <div className="max-w-5xl mx-auto">
        <div className="mb-16">
          <p className="text-xs text-white/50 uppercase tracking-widest mb-4">
            Process
          </p>
          <h1 className="text-4xl sm:text-5xl md:text-7xl tracking-wide uppercase font-normal leading-[0.9] mb-6">
            How I
            <br />
            <span className="font-pixel font-normal text-[1.1em]">Work</span>
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            A structured yet flexible approach to every project — from first conversation to final delivery.
          </p>
        </div>

        {/* Process Steps */}
        <div className="space-y-8 mb-24">
          {steps.map((step) => (
            <div key={step.number} className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-1">
                  <span className="font-pixel text-sm text-white/50">{step.number}</span>
                </div>
                <div className="md:col-span-3">
                  <h3 className="text-xl tracking-wide uppercase font-normal">{step.title}</h3>
                </div>
                <div className="md:col-span-8">
                  <p className="text-sm text-white/70 leading-relaxed">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Capabilities */}
        <div className="mb-16">
          <h2 className="text-xs text-white/50 uppercase tracking-widest mb-8">
            Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {capabilities.map((cap) => (
              <div key={cap.category}>
                <h3 className="font-pixel text-sm uppercase tracking-wide text-white/60 mb-4">
                  {cap.category}
                </h3>
                <ul className="space-y-2">
                  {cap.items.map((item) => (
                    <li key={item} className="text-sm text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-sm text-white/60 mb-4">
            Have a project in mind?
          </p>
          <a
            href="mailto:raqeebsyed0@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90 transition-colors"
          >
            Let's talk
          </a>
        </div>
      </div>
    </PageLayout>
  )
}
