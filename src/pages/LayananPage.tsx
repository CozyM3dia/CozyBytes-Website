import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { SERVICES } from '../data/services'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20mau%20konsultasi%20soal%20layanan.'

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-zinc-950">
      <Helmet>
        <title>Layanan Kami | Cozybytes Media</title>
        <meta
          name="description"
          content="Semua layanan Cozybytes Media: company profile, landing page, toko online, dan desain UI/UX. Harga jelas dari awal, kebanyakan selesai dalam hitungan hari."
        />
        <link rel="canonical" href="https://cozybytes.media/layanan" />
        <meta property="og:title" content="Layanan Kami | Cozybytes Media" />
        <meta
          property="og:description"
          content="Company profile, landing page, toko online, dan desain UI/UX. Harga jelas dari awal."
        />
        <meta property="og:url" content="https://cozybytes.media/layanan" />
        <meta property="og:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/og-image.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              { '@type': 'ListItem', position: 2, name: 'Layanan', item: 'https://cozybytes.media/layanan' },
            ],
          })}
        </script>
      </Helmet>

      <Navbar />

      <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20">
        <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h1 className="font-display text-4xl md:text-5xl font-medium leading-[1.08] tracking-tight">
              Layanan Cozybytes.
              <br />
              <span className="text-[#00FFFF]">Harga jelas dari awal.</span>
            </h1>
            <p className="mt-5 max-w-xl text-white/60 leading-relaxed">
              Pilih yang paling dekat dengan kebutuhan Anda. Kalau masih ragu yang mana, kirim pesan
              saja, nanti kami bantu tentukan.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="mx-auto max-w-5xl px-5 md:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      <section className="mx-auto max-w-5xl px-5 md:px-6 py-12 md:py-16">
        <ul className="flex flex-col">
          {SERVICES.map((svc, i) => (
            <motion.li
              key={svc.href}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                to={svc.href}
                className="group flex items-center gap-5 border-b border-white/[0.08] py-7 transition-colors hover:border-[#00FFFF]/30"
              >
                <span className="w-8 flex-shrink-0 font-mono text-xs text-[#00FFFF]/40">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display text-2xl md:text-3xl font-medium tracking-tight text-white transition-colors group-hover:text-[#00FFFF]">
                    {svc.label}
                  </span>
                  <span className="mt-1 block text-sm text-white/45">{svc.desc}</span>
                </span>
                <ArrowRight className="h-5 w-5 flex-shrink-0 text-white/25 transition-all group-hover:translate-x-1 group-hover:text-[#00FFFF]" />
              </Link>
            </motion.li>
          ))}
        </ul>

        <div className="mt-14 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center">
          <p className="mb-4 text-sm text-white/50">Belum yakin butuh yang mana?</p>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-sm"
          >
            Konsultasi Gratis
          </a>
        </div>
      </section>

      <Footer />
    </div>
  )
}
