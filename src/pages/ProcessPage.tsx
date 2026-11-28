import PageLayout from '../components/PageLayout'

const steps = [
  {
    n: '01',
    title: 'DIAGNOSE',
    desc: 'Watch the work as it happens today: who does it, how long it takes, where it breaks. The cost of the current process is the business case.',
  },
  {
    n: '02',
    title: 'DEFINE',
    desc: 'One page: the input, the decision, the output, the owner, and what must stay human. Anything that cannot be defined here does not get built.',
  },
  {
    n: '03',
    title: 'DESIGN THE SYSTEM',
    desc: 'Which agents, which tools, which data, which hand-offs. Drawn before it is written, so the shape can be argued with cheaply.',
  },
  {
    n: '04',
    title: 'BUILD WITH AI AGENTS',
    desc: 'Coding agents work against the real repository under written specs. I own the requirement, the review and the failure.',
  },
  {
    n: '05',
    title: 'INTEGRATE',
    desc: 'Wire it into what the business already runs: CRM, mail, registry data, internal boards. An isolated tool changes nothing.',
  },
  {
    n: '06',
    title: 'VERIFY',
    desc: 'Run it against real data, read the output, break it on purpose. A green build is not evidence; the live result is.',
  },
  {
    n: '07',
    title: 'OPERATE',
    desc: 'Monitoring, failure triage and a named owner for every component. Then the next workflow, not a bigger one.',
  },
]

const capabilityGroups = [
  {
    title: 'AI SYSTEMS',
    items: ['Agent fleets and role design', 'Reusable skill libraries', 'Approval and human review layers', 'Runtime configuration'],
  },
  {
    title: 'AUTOMATION',
    items: ['Scheduled workflows', 'Data and news pipelines', 'Failure triage and monitoring'],
  },
  {
    title: 'INTEGRATION',
    items: ['CRM wiring (Twenty, GraphQL)', 'Registry and search data', 'Desktop plugin surfaces'],
  },
  {
    title: 'DESIGN',
    items: ['Brand systems', 'Presentations and proposals', 'Websites and campaign creative'],
  },
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
            HOW I WORK
          </h1>
          <p className="text-lg text-white/60 max-w-2xl">
            A system is not finished when the build passes. It is finished when the live output holds under the work it was built for.
          </p>
        </div>

        <div className="space-y-8 mb-24">
          {steps.map((step) => (
            <div key={step.n} className="border-t border-white/10 pt-8">
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                <div className="md:col-span-1">
                  <span className="font-pixel text-sm text-white/50">{step.n}</span>
                </div>
                <div className="md:col-span-3">
                  <h2 className="text-xl tracking-wide uppercase font-normal">{step.n} {step.title}</h2>
                </div>
                <div className="md:col-span-8">
                  <p className="text-sm text-white/70 leading-relaxed">{step.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mb-16">
          <h2 className="text-xs text-white/50 uppercase tracking-widest mb-8">
            Capabilities
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {capabilityGroups.map((group) => (
              <div key={group.title}>
                <h3 className="font-pixel text-sm uppercase tracking-wide text-white/60 mb-4">
                  {group.title}
                </h3>
                <ul className="space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-white/80">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-white/10 pt-12 text-center">
          <p className="text-base text-white/80 mb-6 max-w-xl mx-auto">
            Have a workflow in mind? Tell me what it costs you today.
          </p>
          <a
            href="mailto:raqeebsyed0@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90 transition-colors"
          >
            Get in touch
          </a>
        </div>
      </div>
    </PageLayout>
  )
}
