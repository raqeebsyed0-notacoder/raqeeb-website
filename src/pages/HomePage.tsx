import { Navbar, Footer } from '../components/Layout'

export default function HomePage() {
  return (
    <div className="relative h-screen w-full overflow-hidden bg-black text-white">
      {/* Background Video */}
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

      {/* Content Overlay */}
      <div className="relative z-10 flex h-full flex-col px-5 sm:px-6 md:px-10 lg:px-14">
        <Navbar />

        {/* Meta Grid */}
        <div className="mt-4 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {/* Column 1 — Name / Positioning */}
          <div className="flex flex-col">
            <span className="text-2xl font-semibold tracking-wide">RAQEEB</span>
            <span className="font-pixel text-xl tracking-wide">HUSSAIN</span>
            <p className="mt-3 font-pixel text-xs leading-relaxed text-white/80">
              Visual designer creating
              <br />
              clear, polished work across
              <br />
              brands, presentations,
              <br />
              campaigns and digital.
            </p>
          </div>

          {/* Column 2 — Discipline */}
          <div className="flex flex-col">
            <span className="text-2xl font-semibold tracking-wide">GRAPHIC &</span>
            <span className="font-pixel text-xl tracking-wide">VISUAL DESIGN</span>
          </div>

          {/* Column 3 — What I Do */}
          <div className="flex flex-col">
            <span className="font-pixel text-sm uppercase tracking-wide text-white/60">What I Do</span>
            <p className="mt-2 text-sm leading-relaxed text-white/80">
              I turn complex ideas into clear, polished visual communication for brands, presentations, campaigns and digital experiences.
            </p>
          </div>

          {/* Column 4 — Services */}
          <div className="flex flex-col">
            <span className="font-pixel text-sm uppercase tracking-wide text-white/60">My Expertise</span>
            <ul className="mt-2 space-y-1 text-sm text-white/80">
              <li>Brand Identity</li>
              <li>Presentation Design</li>
              <li>Social Media Creative</li>
              <li>Website & Digital Design</li>
              <li>Visual Communication</li>
              <li>AI-Assisted Creative Production</li>
            </ul>
          </div>
        </div>

        {/* Flex Spacer */}
        <div className="flex-1" />

        {/* Bottom Section */}
        <div className="pb-4">
          <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:grid-cols-2 items-end">
            {/* Hero Headline */}
            <div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-[3.75rem] xl:text-[4.25rem] tracking-wide uppercase font-normal leading-[0.85]">
                I CREATE
                <br />
                <span className="font-pixel font-normal text-[1.25em] inline-block leading-none align-baseline">VISUAL SYSTEMS</span>
                <br />
                FOR BRANDS &amp; DIGITAL
                <br />
                <span className="font-pixel font-normal text-[1.25em] inline-block leading-none align-baseline">EXPERIENCES</span>
              </h1>
            </div>

            {/* Right Side — Niche Area */}
            <div className="flex flex-col gap-4 sm:gap-6 justify-end">
              <div className="flex flex-wrap gap-2">
                {['BRAND IDENTITY', 'PRESENTATION DESIGN', 'SOCIAL MEDIA', 'DIGITAL EXPERIENCES'].map((niche) => (
                  <span
                    key={niche}
                    className="bg-[#0B0B0B] px-3 sm:px-4 py-2 text-xs tracking-wide text-white/80"
                  >
                    {niche}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Strip */}
          <div className="mt-4 sm:mt-5 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4 pt-4 border-t border-white/10">
            <p className="text-xs text-white/70">
              Available for freelance, contract and full-time opportunities. {' '}
              <a href="mailto:raqeebsyed0@gmail.com" className="text-red-500 transition-colors hover:text-red-400">Let's talk</a>
            </p>
            <p className="text-xs text-white/70 sm:text-right">
              Brand Identity &bull; Presentations &bull; Social Media &bull; Websites
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
