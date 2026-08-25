import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { faqs, tiers } from './landing/data'
import Hero from './landing/Hero'
import Diagnosis from './landing/Diagnosis'
import Anatomy from './landing/Anatomy'
import Capabilities from './landing/Capabilities'
import Comparison from './landing/Comparison'
import Stack from './landing/Stack'
import Process from './landing/Process'
import Pricing from './landing/Pricing'
import Faq from './landing/Faq'
import Closing from './landing/Closing'

const PAGE_URL = 'https://cozybytes.media/layanan/landing-page'
const PAGE_TITLE = 'Jasa Pembuatan Landing Page Konversi Tinggi & Ads-Ready | Cozybytes'
const PAGE_DESC =
  'Landing page yang terbuka kurang dari 2 detik di HP, jadi budget iklan Anda tidak terbuang sia-sia. Meta Pixel, TikTok Pixel, dan tombol WhatsApp sudah terpasang. Sewa mulai Rp 99 ribu per bulan, atau beli putus.'
const OG_DESC =
  'Landing page yang terbuka kurang dari 2 detik di HP, jadi budget iklan Anda tidak terbuang. Pixel iklan dan tombol WhatsApp sudah terpasang. Sewa mulai Rp 99 ribu per bulan.'

/**
 * Harga numerik untuk schema Offer diambil dari daftar tier agar tidak pernah
 * out of sync. Paket sewa diberi awalan subtitle-nya ("Sewa Bulanan") karena
 * nama tier sendiri hanya menyebut periodenya; paket beli putus sudah jelas
 * dari namanya sendiri.
 */
const offerSchema = tiers.map((tier) => ({
  '@type': 'Offer',
  name: tier.subtitle === 'Sewa' ? `${tier.subtitle} ${tier.name}` : tier.name,
  price: tier.price.replace(/[^0-9]/g, ''),
  priceCurrency: 'IDR',
}))

export default function LandingPageServicePage() {
  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/25 selection:text-[#00FFFF]">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="jasa landing page, landing page iklan, landing page UMKM, cozybytes"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://cozybytes.media/services/landing.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/landing.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Jasa Pembuatan Landing Page',
            serviceType: 'Landing Page Development',
            description:
              'Landing page ringan untuk iklan Facebook, TikTok, dan Google Ads. Mobile-first, tracking pixel terpasang, integrasi WhatsApp.',
            url: PAGE_URL,
            areaServed: 'Indonesia',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Cozybytes Media',
              url: 'https://cozybytes.media',
            },
            offers: offerSchema,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Beranda',
                item: 'https://cozybytes.media/',
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Layanan Landing Page',
                item: PAGE_URL,
              },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <main id="main-content" tabIndex={-1} className="outline-none">
        <Hero />
        <Diagnosis />
        <Anatomy />
        <Capabilities />
        <Comparison />
        <Stack />
        <Process />
        <Pricing />
        <Faq />
        <Closing />
      </main>

      <Footer />
    </div>
  )
}
