import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { faqs, tiers } from './uiux/data'
import Hero from './uiux/Hero'
import Diagnosis from './uiux/Diagnosis'
import Capabilities from './uiux/Capabilities'
import Comparison from './uiux/Comparison'
import Deliverables from './uiux/Deliverables'
import Process from './uiux/Process'
import Pricing from './uiux/Pricing'
import Faq from './uiux/Faq'
import Closing from './uiux/Closing'

const PAGE_URL = 'https://cozybytes.media/layanan/uiux'
const PAGE_TITLE = 'Jasa Desain UI/UX & Redesign Website Profesional | Cozybytes'
const PAGE_DESC =
  'Website lama Anda kami tata ulang supaya rapi, nyaman dipakai pengunjung, dan sesuai warna brand. Lengkap dengan prototype interaktif yang bisa diklik dan aset siap diserahkan ke programmer. Mulai Rp 999.000.'
const OG_DESC =
  'Website lama Anda kami tata ulang supaya rapi, nyaman dipakai pengunjung, dan sesuai warna brand. Lengkap dengan prototype interaktif dan aset siap coding.'

/** Harga numerik untuk schema Offer diambil dari daftar tier agar tidak pernah out of sync. */
const offerSchema = tiers.map((tier) => ({
  '@type': 'Offer',
  name: `Paket ${tier.name}`,
  price: tier.price.replace(/[^0-9]/g, ''),
  priceCurrency: 'IDR',
}))

export default function UIUXPage() {
  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/25 selection:text-[#00FFFF]">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="jasa desain UI UX website, redesign website, wireframe, cozybytes"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://cozybytes.media/services/uiux.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/uiux.jpg" />
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
            name: 'Jasa Desain UI/UX & Redesign Website',
            serviceType: 'UI/UX Design',
            description:
              'Desain ulang tampilan dan alur navigasi website. Wireframe, prototype interaktif, design system, dan handoff developer.',
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
                name: 'Layanan Desain UI/UX',
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
        <Deliverables />
        <Process />
        <Pricing />
        <Faq />
        <Closing />
      </main>

      <Footer />
    </div>
  )
}
