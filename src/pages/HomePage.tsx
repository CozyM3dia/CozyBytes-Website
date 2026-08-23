import { Helmet } from 'react-helmet-async'
import { lazy, Suspense } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'

// Below-fold sections are code-split so main chunk is ~150KB lighter and TBT drops.
// They are also wrapped with content-visibility auto via CSS so browser skips layout until scrolled.
// SSR (prerender) resolves them immediately so the prerendered HTML keeps full content;
// on the client they resolve staggered so React commits each section in its own
// <50ms task instead of one 180ms long task (keeps TBT at 0 after FCP).
function lazySection(importer: () => Promise<{ default: React.ComponentType }>, clientDelay: number) {
  if (import.meta.env.SSR) return lazy(importer)
  return lazy(
    () =>
      new Promise<{ default: React.ComponentType }>((resolve, reject) => {
        setTimeout(() => importer().then(resolve, reject), clientDelay)
      })
  )
}

const AboutSection = lazySection(() => import('../sections/AboutSection'), 0)
const ServicesSection = lazySection(() => import('../sections/ServicesSection'), 150)
const ProcessSection = lazySection(() => import('../sections/ProcessSection'), 300)
const CTASection = lazySection(() => import('../sections/CTASection'), 450)
const ContactSection = lazySection(() => import('../sections/ContactSection'), 600)

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Jasa Pembuatan Website Profesional, Cepat & Anti Ribet | Cozybytes Media</title>
        <meta name="description" content="Website yang bikin calon pelanggan langsung percaya. Kami bangun cepat, rapi, dan mudah ditemukan di Google. Harga jelas dari awal mulai Rp 1.499.000, kebanyakan selesai dalam hitungan hari." />
        <link rel="canonical" href="https://cozybytes.media/" />
        <meta property="og:title" content="Jasa Pembuatan Website Profesional, Cepat & Anti Ribet | Cozybytes Media" />
        <meta property="og:description" content="Website yang bikin calon pelanggan langsung percaya. Kami bangun cepat, rapi, dan mudah ditemukan di Google. Harga jelas dari awal mulai Rp 1.499.000." />
        <meta property="og:url" content="https://cozybytes.media/" />
        <meta property="og:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/og-image.jpg" />
      </Helmet>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <HeroSection />
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" aria-hidden="true" />}>
          <AboutSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" aria-hidden="true" />}>
          <ServicesSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[400px] bg-zinc-950" aria-hidden="true" />}>
          <ProcessSection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[320px] bg-zinc-950" aria-hidden="true" />}>
          <CTASection />
        </Suspense>
        <Suspense fallback={<div className="min-h-[320px] bg-zinc-950" aria-hidden="true" />}>
          <ContactSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  )
}
