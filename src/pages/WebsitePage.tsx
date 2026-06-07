import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Globe, Smartphone, Zap, Search, Shield, Headphones, MessageCircle, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20company%20profile.'

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    subtitle: 'Paket',
    tagline: 'Tampil profesional online. Company profile simpel, cepat, langsung aktif.',
    oldPrice: 'Rp 2.998.000',
    savings: 'Hemat Rp 1.499.000',
    price: 'Rp 1.499.000',
    period: 'Bayar sekali, website selamanya',
    discount: '50% OFF',
    discountTone: 'cyan',
    cta: 'Pilih Paket Basic',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO basic' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Tutorial kelola website' },
      { available: true, label: <><strong>Hingga 3 halaman</strong></> },
      { available: true, label: 'Support teknis 3 bulan' },
      { available: true, label: <>Maks <strong>3x</strong> revisi</> },
      { available: false, label: 'Konsultasi branding' },
      { available: false, label: 'Free maintenance 1 tahun' },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Paket',
    tagline: 'Company profile lengkap & serius. Favorit UMKM dan bisnis berkembang.',
    oldPrice: 'Rp 6.000.000',
    savings: 'Hemat Rp 3.001.000',
    price: 'Rp 2.999.000',
    period: 'Bayar sekali, website selamanya',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling banyak dipilih',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO friendly' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Tutorial kelola website' },
      { available: true, label: <><strong>Hingga 5 halaman</strong></> },
      { available: true, label: 'Konsultasi branding & desain' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN'] },
      { available: true, label: <>Maks <strong>5x</strong> revisi</> },
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Paket',
    tagline: 'Company profile premium. Untuk bisnis yang ingin tampil beda dan siap tumbuh.',
    oldPrice: 'Rp 9.000.000',
    savings: 'Hemat Rp 4.2 juta',
    price: 'Rp 4.799.000',
    period: 'Bayar sekali, website selamanya',
    discount: '47% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Premium',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO advanced + Google Analytics' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Tutorial 1-on-1 via Zoom' },
      { available: true, label: <><strong>Hingga 10 halaman</strong> + Blog</> },
      { available: true, label: 'Konsultasi branding & desain' },
      { available: true, label: 'WhatsApp chat widget' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN', 'PRIORITY'] },
      { available: true, label: <><strong>Unlimited</strong> revisi</> },
    ],
  },
]

const features = [
  {
    icon: Globe,
    title: 'Domain & Hosting Gratis',
    desc: 'Gratis domain dan hosting selama 1 tahun pertama — tidak perlu pusing soal teknis, kami yang urus.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First Design',
    desc: 'Lebih dari 70% pengguna internet browsing lewat HP. Website Anda tampil sempurna di semua ukuran layar.',
  },
  {
    icon: Zap,
    title: 'Loading Super Cepat',
    desc: 'Setiap detik penundaan = pelanggan hilang. Kami optimalkan performa agar website Anda muat dalam hitungan detik.',
  },
  {
    icon: Search,
    title: 'SEO-Ready',
    desc: 'Dibangun dengan struktur yang ramah Google sejak hari pertama — agar bisnis Anda mudah ditemukan secara organik.',
  },
  {
    icon: Shield,
    title: 'Akses Penuh (Ownership)',
    desc: 'Website 100% milik Anda. Kami tidak mengunci Anda di platform kami — kebebasan total ada di tangan Anda.',
  },
  {
    icon: Headphones,
    title: 'Support & Maintenance',
    desc: 'Tim kami siap bantu jika ada masalah teknis. Tidak perlu khawatir — Anda tidak sendirian setelah website live.',
  },
]

export default function WebsitePage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <Helmet>
        <title>Jasa Pembuatan Company Profile Website untuk Bisnis & UMKM | Cozybytes Media</title>
        <meta name="description" content="Company profile website yang membangun kepercayaan calon klien sejak detik pertama. Custom design, SEO-ready, mobile-first. Domain & hosting gratis 1 tahun. Mulai Rp 1.499.000. Konsultasi gratis." />
        <meta name="keywords" content="jasa company profile website, bikin company profile online, website company profile UMKM, jasa pembuatan company profile profesional, company profile bisnis Lampung, Cozybytes Media" />
        <link rel="canonical" href="https://cozybytes.media/layanan/website" />
        <meta property="og:title" content="Jasa Pembuatan Company Profile Website Profesional | Cozybytes Media" />
        <meta property="og:description" content="Company profile website profesional. SEO-ready, mobile-first, domain & hosting gratis 1 tahun. Mulai Rp 1.499.000. Konsultasi gratis via WhatsApp." />
        <meta property="og:url" content="https://cozybytes.media/layanan/website" />
      </Helmet>

      {/* Hero */}
      <section
        className="relative pt-36 pb-24 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,255,0.13) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 50% 45%, rgba(248,209,106,0.06) 0%, transparent 70%), #000',
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-32 h-px w-[86vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-[8%] top-48 h-64 w-64 rounded-full bg-[#00FFFF]/8 blur-3xl" />
          <div className="absolute right-[10%] top-64 h-72 w-72 rounded-full bg-[#F8D16A]/7 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Jasa Company Profile
            </span>
            <h1
              className="mb-5 text-4xl sm:text-6xl md:text-7xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Company profile yang bikin <br />
              <em className="text-[#00FFFF] italic">calon klien langsung percaya.</em>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55">
              Tanpa company profile yang kuat, bisnis Anda terlihat tidak serius. Kami bangun company profile digital yang meyakinkan — desain profesional, SEO-ready, dan siap tayang dalam kurang dari 3 hari kerja.
            </p>
            {/* Trust signals */}
            <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/40">
              <span className="flex items-center gap-1.5"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />15+ bisnis aktif</span>
              <span>·</span>
              <span>Selesai &lt; 3 hari kerja</span>
              <span>·</span>
              <span>Konsultasi gratis, tanpa komitmen</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2 px-7 py-3.5 text-sm font-bold"
              >
                <MessageCircle className="h-4 w-4" />
                Konsultasi Gratis
              </motion.a>
              <a
                href="#harga"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/70 hover:text-white hover:border-white/30 transition-all"
              >
                Lihat Harga
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-12 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Yang Anda Dapatkan
            </span>
            <h2
              className="text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Semua yang Dibutuhkan <br />
              <em className="text-[#00FFFF] italic">Company Profile Modern</em>
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-2xl border border-white/8 bg-white/[0.025] p-6 hover:border-[#00FFFF]/20 transition-colors"
              >
                <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-[#00FFFF]/10">
                  <f.icon className="h-5 w-5 text-[#00FFFF]" />
                </div>
                <h3 className="mb-2 text-base font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/50">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visual mockup strip */}
      <section className="py-16 overflow-hidden bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div
            className="relative rounded-3xl overflow-hidden border border-white/8 p-8 md:p-12"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%), #0a0a0d',
            }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
                  Proses Kami
                </span>
                <h2 className="mb-4 text-2xl md:text-3xl leading-snug" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  Dari konsep ke company profile live <em className="text-[#00FFFF] italic">dalam &lt; 3 hari kerja</em>
                </h2>
                <ul className="space-y-3">
                  {['Konsultasi & brief kebutuhan bisnis Anda', 'Desain UI/UX custom sesuai brand', 'Pengembangan & integrasi fitur', 'Review bersama + revisi', 'Go live & serah terima penuh'].map((step, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00FFFF]/15 text-[10px] font-bold text-[#00FFFF]">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden aspect-video flex flex-col">
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-900/80">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <div className="ml-3 h-4 flex-1 max-w-32 rounded-full bg-white/5 flex items-center justify-center">
                      <span className="text-[9px] text-white/25">cozybytes.id</span>
                    </div>
                  </div>
                  <div className="flex-1 p-4 space-y-2.5">
                    <div className="h-6 w-1/2 rounded-lg bg-[#00FFFF]/15" />
                    <div className="h-3 w-4/5 rounded-md bg-white/8" />
                    <div className="h-3 w-3/5 rounded-md bg-white/6" />
                    <div className="mt-4 grid grid-cols-3 gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="h-14 rounded-xl bg-white/5 border border-white/8" />
                      ))}
                    </div>
                  </div>
                </div>
                <div className="pointer-events-none absolute -bottom-6 left-8 right-8 h-8 rounded-b-full blur-xl" style={{ background: 'rgba(0,255,255,0.12)' }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="harga" ref={pricingRef} className="py-24 md:py-32 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Harga Transparan
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-6xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Pilih Paket <em className="text-[#00FFFF] italic">Company Profile</em>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Tiga pilihan harga yang jelas. Bayar sekali, company profile milik Anda selamanya — tanpa biaya langganan tersembunyi.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35">
            Belum yakin paket mana yang cocok?{' '}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#00FFFF] hover:underline">
              Konsultasi gratis via WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-[#09090B] relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,255,255,0.06) 0%, transparent 70%)' }} />
        <div className="relative z-10 mx-auto max-w-2xl px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12"
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent" />
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Siap Mulai?
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Ceritakan <em className="text-[#00FFFF] italic">Kebutuhan</em> Bisnis Anda
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Konsultasi gratis, tidak ada kewajiban. Kami bantu Anda temukan solusi yang paling tepat.
            </p>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 text-sm font-bold px-8 py-4"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Gratis Sekarang
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
