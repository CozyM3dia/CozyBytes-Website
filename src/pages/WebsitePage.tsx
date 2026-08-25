import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { faqs, tiers } from './website/data'
import Hero from './website/Hero'
import Diagnosis from './website/Diagnosis'
import Capabilities from './website/Capabilities'
import Comparison from './website/Comparison'
import Stack from './website/Stack'
import Process from './website/Process'
import Pricing from './website/Pricing'
import Faq from './website/Faq'
import Closing from './website/Closing'

const PAGE_URL = 'https://cozybytes.media/layanan/website'
const PAGE_TITLE =
  'Jasa Pembuatan Website Company Profile Custom & Profesional | Cozybytes'
const PAGE_DESC =
  'Website company profile yang ditulis dari nol, bukan dari template. Cepat dibuka, aman, dan mudah ditemukan calon klien di Google. Domain dan hosting gratis setahun pertama, selesai dalam 3 sampai 7 hari kerja.'
const OG_DESC =
  'Website company profile yang ditulis dari nol, bukan dari template. Cepat dibuka, aman, dan mudah ditemukan calon klien di Google. Gratis domain dan hosting setahun pertama.'

/** Harga numerik untuk schema Offer diambil dari daftar tier agar tidak pernah out of sync. */
const offerSchema = tiers.map((tier) => ({
  '@type': 'Offer',
  name: `Paket ${tier.name}`,
  price: tier.price.replace(/[^0-9]/g, ''),
  priceCurrency: 'IDR',
}))

export default function WebsitePage() {
  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/25 selection:text-[#00FFFF]">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="jasa pembuatan website company profile, website custom, web developer Lampung, cozybytes"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://cozybytes.media/services/company.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/company.jpg" />
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
            name: 'Jasa Pembuatan Website Company Profile',
            serviceType: 'Web Development',
            description:
              'Pembuatan website company profile custom dengan framework modern. Cepat, aman, SEO-ready, dan source code diserahkan penuh.',
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
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Layanan Website Company Profile',
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
