import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import AboutHero from './about/Hero'
import Marquee from './about/Marquee'
import Manifesto from './about/Manifesto'
import StatsBand from './about/StatsBand'
import Craft from './about/Craft'
import Team from './about/Team'
import Values from './about/Values'
import QuoteInterlude from './about/QuoteInterlude'
import ClosingCTA from './about/ClosingCTA'
import { SectionBeam } from '../components/atmosphere'

const teamMembers = [
  { name: 'Sibgha Alfirdausi Rambe', role: 'Founder' },
  { name: 'Ubaidillah Rafi Ussalam', role: 'Co-Founder' },
  { name: 'Hanan Ghaffari', role: 'Co-Founder' },
]

const CHAPTERS = [
  { id: 'manifesto', label: 'Cerita' },
  { id: 'craft', label: 'Kekuatan' },
  { id: 'tim', label: 'Tim' },
  { id: 'nilai', label: 'Nilai' },
]

function ProgressRail() {
  const [active, setActive] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id)
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    for (const { id } of CHAPTERS) {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    }
    return () => observer.disconnect()
  }, [])

  return (
    <nav
      aria-label="Navigasi bab"
      className="fixed right-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-5 xl:flex"
    >
      {CHAPTERS.map(({ id, label }) => {
        const isActive = active === id
        return (
          <a key={id} href={`#${id}`} className="group flex items-center justify-end gap-3">
            <span
              className={`font-mono text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${
                isActive ? 'text-[#00FFFF]/80' : 'text-white/0 group-hover:text-white/50'
              }`}
            >
              {label}
            </span>
            <span
              className={`rounded-full transition-all duration-300 ${
                isActive ? 'h-6 w-[2px] bg-[#00FFFF]' : 'h-[6px] w-[2px] bg-white/25 group-hover:bg-white/60'
              }`}
            />
          </a>
        )
      })}
    </nav>
  )
}

export default function AboutPage() {
  return (
    <div className="relative min-h-screen overflow-x-clip text-white/90">
      <Helmet>
        <title>Tentang Kami | Cozybytes Media</title>
        <meta name="description" content="Kenalan dengan tim di balik Cozybytes Media. Kami studio web kecil dari Bandar Lampung yang membantu UMKM dan bisnis lokal tampil profesional di internet." />
        <link rel="canonical" href="https://cozybytes.media/about" />
        <meta property="og:title" content="Tentang Kami | Cozybytes Media" />
        <meta property="og:description" content="Kenalan dengan tim di balik Cozybytes Media. Studio web dari Bandar Lampung yang membantu UMKM tampil profesional di internet." />
        <meta property="og:url" content="https://cozybytes.media/about" />
        <meta property="og:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Tentang Cozybytes Media',
            url: 'https://cozybytes.media/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'Cozybytes Media',
              url: 'https://cozybytes.media',
              member: teamMembers.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
            },
          })}
        </script>
      </Helmet>
      <div className="relative z-10">
        <Navbar />
        <main id="main-content" tabIndex={-1} className="outline-none">
          <ProgressRail />
          <AboutHero />
          <Marquee />
          <Manifesto />
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionBeam />
          </div>
          <StatsBand />
          <Craft />
          <Team />
          <Values />
          <div className="relative mx-auto max-w-6xl px-6">
            <SectionBeam />
          </div>
          <QuoteInterlude />
          <ClosingCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
