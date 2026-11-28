import { aiProjects } from '../data/ai-projects'
import { Navbar } from '../components/Layout'

// Third-party host asset (CloudFront CDN) — kept exactly as-is, do not replace with an image
const featuredOrder = ['leadjin-portal', 'orio-operations', 'agent-fleet', 'approval-inbox']

export default function HomePage() {
  const featured = featuredOrder
    .map((slug) => aiProjects.find((p) => p.slug === slug))
    .filter((p): p is typeof aiProjects[number] => Boolean(p))

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video — third-party host asset (CloudFront CDN), kept exactly as-is */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover lg:scale-[1.2]"
      >
        <source
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260725_114042_d2ed2a89-f2fa-449b-9609-da456344257b.mp4"
          type="video/mp4"
        />
      </video>

      {/* Legibility scrim over the third-party hero video, so the copy holds contrast on bright frames */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/25"
      />

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        <Navbar />
        <div className="flex-1 pb-12">
          {/* Eyebrow */}
          <p className="text-xs uppercase tracking-[0.3em] text-white/60">
            AI IMPLEMENTATION · AGENT SYSTEMS · AUTOMATION
          </p>

          {/* Hero Headline */}
          <h1 className="mt-4 text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal leading-[0.85]">
            I TURN BUSINESS PROBLEMS INTO WORKING AI SYSTEMS
          </h1>

          <p className="mt-6 text-lg text-white/80 max-w-3xl">
            Agent fleets, automation pipelines and integrations: built with AI
            coding agents, wired into the tools a business already runs, then
            tested until they hold.
          </p>

          <p className="mt-6 text-sm leading-relaxed text-white/70 max-w-3xl">
            I came to AI through design and sales, not through a research lab.
            Visual communication taught me to structure information so a
            decision becomes obvious. Client work taught me what a business needs
            before it needs a tool. Now I build that as systems: agents that
            hold a real role, skills that make their behaviour repeatable, and
            automation that removes the manual step.
          </p>

          {/* Primary and secondary CTAs */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="#/projects/ai"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90 transition-colors"
            >
              See the AI work
            </a>
            <a
              href="#/process"
              className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase border border-white/20 hover:border-white/40 transition-colors"
            >
              How I work
            </a>
          </div>

          {/* Featured Work — read from src/data, in audited order with status label */}
          <div className="mt-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              Featured
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {featured.map((p) => (
                <a
                  key={p.slug}
                  href={`#/projects/ai/${p.slug}`}
                  className="group flex flex-col overflow-hidden rounded-lg border border-white/10 bg-[#0a0a0a] transition-all hover:border-white/30 hover:bg-neutral-950"
                >
                  <div className="aspect-video overflow-hidden bg-neutral-900 relative">
                    <img
                      src={p.architecture}
                      alt={`${p.title} architecture diagram`}
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                      loading="lazy"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <h3 className="text-lg font-semibold text-white group-hover:text-red-400 transition-colors">
                      {p.title}
                    </h3>
                    <p className="mt-1 text-xs uppercase tracking-widest text-white/50">
                      {p.status}
                    </p>
                    <p className="mt-2 text-sm text-white/70 line-clamp-2">
                      {p.lede}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* AI capability presentation */}
          <div className="mt-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              AI capabilities
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                'AI implementation and agent systems',
                'Automation and scheduled workflows',
                'Integration between AI runtimes and business tools',
                'CRM and data pipeline design',
                'Requirements translation and workflow design',
                'Testing, validation and failure triage',
              ].map((cap) => (
                <div
                  key={cap}
                  className="rounded-lg border border-white/10 p-4 bg-[#0a0a0a]/50"
                >
                  <p className="text-sm text-white/80">{cap}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Design background block */}
          <div className="mt-16">
            <h2 className="text-xs uppercase tracking-[0.3em] text-white/50 mb-8">
              Design background
            </h2>
            <p className="text-sm text-white/70 max-w-3xl">
              25 design projects: brand systems, presentations, campaign
              creative and websites. The foundation the AI work is built on.
            </p>
          </div>
        </div>

        {/* Contact CTA */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-sm text-white/60 mb-4">
            If a workflow eats hours of your week, tell me what it is and who
            does it now.
          </p>
          <a
            href="mailto:raqeebsyed0@gmail.com"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm tracking-wide uppercase bg-white text-black hover:bg-white/90 transition-colors"
          >
            Let's talk
          </a>
        </div>
      </div>
    </div>
  )
}
