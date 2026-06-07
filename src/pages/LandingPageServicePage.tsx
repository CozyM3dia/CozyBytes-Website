import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Target, MessageCircle, Rocket, BarChart2, Smartphone, RefreshCw, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard, PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20landing%20page.'

const tiers: PricingTier[] = [
  {
    name: 'Bulanan',
    subtitle: 'Sewa',
    tagline: 'Mulai hadir online tanpa komitmen panjang.',
    price: 'Rp 99rb',
    period: '/ bulan',
    discount: 'Sewa Bulanan',
    discountTone: 'cyan',
    cta: 'Pilih Bulanan',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page' },
      { available: true, label: 'Free domain .my.id / .biz.id / .web.id' },
      { available: true, label: 'Mobile friendly' },
      { available: true, label: 'Integrasi WhatsApp' },
      { available: false, label: 'Tidak termasuk SEO' },
      { available: false, label: 'Tidak termasuk ownership' },
      { available: false, label: 'Website offline jika berhenti sewa' },
    ],
  },
  {
    name: 'Tahunan',
    subtitle: 'Sewa',
    tagline: 'Setahun penuh, pelanggan baru terus datang.',
    oldPrice: 'Rp 1.188.000',
    savings: 'Hemat Rp 238rb',
    price: 'Rp 950rb',
    period: '/ tahun',
    discount: 'Hemat 20%',
    discountTone: 'gold',
    cta: 'Pilih Tahunan',
    highlighted: true,
    specialBadge: 'Paling hemat',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page' },
      { available: true, label: 'Free domain .my.id / .biz.id / .web.id' },
      { available: true, label: 'Mobile friendly' },
      { available: true, label: 'Integrasi WhatsApp' },
      { available: true, label: 'Priority maintenance & support' },
      { available: false, label: 'Tidak termasuk SEO' },
      { available: false, label: 'Tidak termasuk ownership' },
      { available: false, label: 'Website offline jika berhenti sewa' },
    ],
  },
  {
    name: 'Ownership',
    subtitle: 'Beli',
    tagline: 'Bayar sekali, landing page milik kamu selamanya.',
    price: 'Rp 1.299rb',
    period: 'sekali bayar',
    discount: 'Milik Selamanya',
    discountTone: 'violet',
    cta: 'Pilih Ownership',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page' },
      { available: true, label: 'Free domain .my.id / .biz.id / .web.id' },
      { available: true, label: 'Mobile friendly' },
      { available: true, label: 'Integrasi WhatsApp' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Tutorial kelola website' },
    ],
  },
]

const features = [
  {
    icon: Target,
    title: 'Fokus Satu Tujuan',
    desc: 'Satu halaman, satu pesan, satu aksi. Desain tanpa distraksi yang mendorong pengunjung langsung bertindak.',
  },
  {
    icon: MessageCircle,
    title: 'Integrasi WhatsApp CTA',
    desc: 'Tombol WhatsApp yang strategis membuat calon pelanggan langsung menghubungi Anda — tanpa hambatan.',
  },
  {
    icon: Rocket,
    title: 'Live dalam 3–5 Hari',
    desc: 'Tidak perlu menunggu berminggu-minggu. Landing page Anda aktif dan siap menerima trafik iklan dalam hitungan hari.',
  },
  {
    icon: BarChart2,
    title: 'Ads-Ready',
    desc: 'Dioptimalkan untuk campaign Facebook Ads, Instagram Ads, dan Google Ads. Konversi lebih tinggi, biaya iklan lebih efisien.',
  },
  {
    icon: Smartphone,
    title: 'Mobile-First',
    desc: 'Mayoritas klik iklan datang dari HP. Landing page kami didesain mobile-first untuk pengalaman terbaik di semua perangkat.',
  },
  {
    icon: RefreshCw,
    title: 'Update Konten Mudah',
    desc: 'Ingin ganti promo atau ubah penawaran? Tim kami siap bantu update konten kapan pun Anda butuhkan.',
  },
]

export default function LandingPageServicePage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

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
              Layanan Landing Page
            </span>
            <h1
              className="mb-5 text-4xl sm:text-6xl md:text-7xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Landing Page yang <br />
              <em className="text-[#00FFFF] italic">Mengkonversi Pengunjung</em>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55">
              Ubah klik iklan Anda menjadi pelanggan nyata. Landing page kami didesain khusus untuk memaksimalkan konversi setiap rupiah yang Anda keluarkan untuk iklan.
            </p>
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
              Keunggulan Landing Page
            </span>
            <h2
              className="text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Dirancang untuk <em className="text-[#00FFFF] italic">Konversi Maksimal</em>
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

      {/* Use cases */}
      <section className="py-16 overflow-hidden bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div
            className="relative rounded-3xl overflow-hidden border border-white/8 p-8 md:p-12"
            style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%), #0a0a0d' }}
          >
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
                  Cocok Untuk
                </span>
                <h2 className="mb-4 text-2xl md:text-3xl leading-snug" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  Landing page ideal untuk <em className="text-[#00FFFF] italic">berbagai kebutuhan</em>
                </h2>
                <ul className="space-y-3">
                  {[
                    'Promosi produk & penawaran terbatas waktu',
                    'Campaign Facebook & Instagram Ads',
                    'Pendaftaran event atau webinar',
                    'Pre-order & peluncuran produk baru',
                    'Layanan lokal yang ingin mudah ditemukan',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00FFFF]/15 text-[10px] font-bold text-[#00FFFF]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden flex flex-col" style={{ minHeight: '220px' }}>
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-900/80">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 p-5 flex flex-col items-center justify-center space-y-3 text-center">
                    <div className="h-5 w-2/3 rounded-lg bg-[#F8D16A]/20 mx-auto" />
                    <div className="h-3 w-4/5 rounded-md bg-white/8" />
                    <div className="h-3 w-3/5 rounded-md bg-white/6" />
                    <div className="mt-3 h-9 w-36 rounded-full bg-[#00FFFF]/20 border border-[#00FFFF]/30 flex items-center justify-center mx-auto">
                      <span className="text-[10px] text-[#00FFFF] font-bold">Chat WhatsApp</span>
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
              Pilih Model <em className="text-[#00FFFF] italic">Landing Page</em>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Mulai hadir online dengan harga yang fleksibel. Sewa bulanan, tahunan, atau beli selamanya.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35">
            Masih bingung pilih yang mana?{' '}
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
              Mulai Sekarang
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Siap Tingkatkan <em className="text-[#00FFFF] italic">Konversi Iklan</em> Anda?
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Konsultasi gratis, tanpa kewajiban. Ceritakan kebutuhan bisnis Anda dan kami bantu wujudkan.
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
