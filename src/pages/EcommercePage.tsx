import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { faqs } from './ecommerce/data'
import Hero from './ecommerce/Hero'
import Diagnosis from './ecommerce/Diagnosis'
import Capabilities from './ecommerce/Capabilities'
import Comparison from './ecommerce/Comparison'
import Stack from './ecommerce/Stack'
import Process from './ecommerce/Process'
import Configurator from './ecommerce/Configurator'
import Faq from './ecommerce/Faq'
import Closing from './ecommerce/Closing'

const PAGE_URL = 'https://cozybytes.media/layanan/ecommerce'
const PAGE_TITLE = 'Jasa Pembuatan Toko Online E-Commerce Custom & Mandiri | Cozybytes'
const PAGE_DESC =
  'Toko online milik sendiri, tanpa potongan komisi marketplace. Pembayaran QRIS dan transfer terkonfirmasi otomatis, ongkir dihitung real-time, dan resi terkirim sendiri ke WhatsApp pembeli.'
const OG_DESC =
  'Toko online milik sendiri, tanpa potongan komisi marketplace. Pembayaran terkonfirmasi otomatis, ongkir real-time, notifikasi WhatsApp ke pembeli.'

export default function EcommercePage() {
  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/25 selection:text-[#00FFFF]">
      <Helmet>
        <title>{PAGE_TITLE}</title>
        <meta name="description" content={PAGE_DESC} />
        <meta
          name="keywords"
          content="jasa toko online, website e-commerce UMKM, payment gateway otomatis, cozybytes"
        />
        <link rel="canonical" href={PAGE_URL} />
        <meta property="og:title" content={PAGE_TITLE} />
        <meta property="og:description" content={OG_DESC} />
        <meta property="og:url" content={PAGE_URL} />
        <meta property="og:image" content="https://cozybytes.media/services/ecommerce.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/ecommerce.jpg" />
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
            name: 'Jasa Pembuatan Toko Online E-Commerce',
            serviceType: 'E-Commerce Development',
            description:
              'Pembuatan toko online mandiri dengan payment gateway otomatis, kalkulasi ongkir real-time, dashboard admin, dan notifikasi WhatsApp. Tanpa komisi penjualan.',
            url: PAGE_URL,
            areaServed: 'Indonesia',
            provider: {
              '@type': 'ProfessionalService',
              name: 'Cozybytes Media',
              url: 'https://cozybytes.media',
            },
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
                name: 'Layanan Toko Online',
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
        <Configurator />
        <Faq />
        <Closing />
      </main>

      <Footer />
    </div>
  )
}
