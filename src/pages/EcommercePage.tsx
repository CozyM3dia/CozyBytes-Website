import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { ShoppingCart, CreditCard, Package, Smartphone, Search, Bell, MessageCircle, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard, PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20toko%20online.'

const tiers: PricingTier[] = [
  {
    name: 'Starter',
    subtitle: 'Paket',
    tagline: 'Untuk kamu yang baru mulai berjualan online. Simpel dan langsung aktif.',
    oldPrice: 'Rp 2.998.000',
    savings: 'Hemat Rp 1.499.000',
    price: 'Rp 1.499.000',
    period: 'Bayar sekali, toko selamanya',
    discount: '50% OFF',
    discountTone: 'cyan',
    cta: 'Pilih Paket Starter',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Hingga 50 produk' },
      { available: true, label: 'Mobile friendly' },
      { available: true, label: 'Integrasi WhatsApp order' },
      { available: true, label: 'SEO basic' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: <>Maks <strong>3x</strong> revisi</> },
      { available: false, label: 'Payment gateway otomatis' },
      { available: false, label: 'Dashboard admin custom' },
      { available: false, label: 'Free maintenance 1 tahun' },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Paket',
    tagline: 'Toko online lengkap dengan sistem pembayaran otomatis. Favorit UMKM aktif.',
    oldPrice: 'Rp 6.000.000',
    savings: 'Hemat Rp 3 juta',
    price: 'Rp 3.000.000',
    period: 'Bayar sekali, toko selamanya',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling banyak dipilih',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Produk unlimited' },
      { available: true, label: 'Mobile friendly' },
      { available: true, label: 'Payment gateway (QRIS, transfer)' },
      { available: true, label: 'Dashboard admin' },
      { available: true, label: 'Manajemen pesanan' },
      { available: true, label: 'SEO friendly' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN'] },
      { available: true, label: <>Maks <strong>5x</strong> revisi</> },
    ],
  },
  {
    name: 'Enterprise',
    subtitle: 'Paket',
    tagline: 'Solusi e-commerce penuh untuk bisnis yang serius tumbuh lebih jauh.',
    oldPrice: 'Rp 9.000.000',
    savings: 'Hemat Rp 4.2 juta',
    price: 'Rp 4.799.000',
    period: 'Bayar sekali, toko selamanya',
    discount: '47% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Enterprise',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Produk unlimited' },
      { available: true, label: 'Mobile friendly + PWA' },
      { available: true, label: 'Multi payment gateway' },
      { available: true, label: 'Dashboard admin advanced' },
      { available: true, label: 'Manajemen pesanan & inventory' },
      { available: true, label: 'SEO advanced + Google Analytics' },
      { available: true, label: 'WhatsApp chat widget' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN', 'PRIORITY'] },
      { available: true, label: <><strong>Unlimited</strong> revisi</> },
    ],
  },
]

const features = [
  {
    icon: ShoppingCart,
    title: 'Katalog Produk Lengkap',
    desc: 'Tampilkan produk dengan foto berkualitas, deskripsi menarik, dan kategori yang rapi — memudahkan pelanggan menemukan apa yang mereka cari.',
  },
  {
    icon: CreditCard,
    title: 'Payment Gateway Otomatis',
    desc: 'Terima pembayaran online via QRIS, transfer bank, kartu kredit, dan dompet digital — semua otomatis terkonfirmasi tanpa repot manual.',
  },
  {
    icon: Package,
    title: 'Manajemen Pesanan & Stok',
    desc: 'Kelola pesanan masuk, lacak status pengiriman, dan pantau stok produk dari satu dashboard yang mudah digunakan.',
  },
  {
    icon: Smartphone,
    title: 'Pengalaman Belanja Mobile',
    desc: 'Mayoritas pembeli online menggunakan HP. Toko Anda tampil sempurna dan nyaman digunakan di semua ukuran layar.',
  },
  {
    icon: Search,
    title: 'SEO Produk Teroptimasi',
    desc: 'Produk Anda mudah ditemukan di Google. Struktur SEO yang benar membantu pelanggan baru menemukan toko Anda secara organik.',
  },
  {
    icon: Bell,
    title: 'Notifikasi Pesanan Masuk',
    desc: 'Tidak ada pesanan yang terlewat. Sistem otomatis mengirim notifikasi setiap kali ada order baru masuk ke toko Anda.',
  },
]

export default function EcommercePage() {
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
              Layanan E-Commerce
            </span>
            <h1
              className="mb-5 text-4xl sm:text-6xl md:text-7xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Toko Online yang <br />
              <em className="text-[#00FFFF] italic">Memudahkan Penjualan</em>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55">
              Buka toko online dan mulai berjualan 24 jam sehari. Sistem e-commerce lengkap dengan katalog produk, payment otomatis, dan manajemen pesanan yang mudah dikelola.
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
              Fitur Toko Online
            </span>
            <h2
              className="text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Semua yang Dibutuhkan <br />
              <em className="text-[#00FFFF] italic">Toko Online Modern</em>
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

      {/* Process strip */}
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
                  Mengapa Pilih Kami
                </span>
                <h2 className="mb-4 text-2xl md:text-3xl leading-snug" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  Toko online aktif, <em className="text-[#00FFFF] italic">Anda fokus jualan</em>
                </h2>
                <ul className="space-y-3">
                  {[
                    'Setup lengkap dari nol hingga toko siap berjualan',
                    'Integrasi payment gateway populer Indonesia',
                    'Dashboard admin mudah tanpa skill teknis',
                    'Desain toko yang menarik dan meningkatkan kepercayaan',
                    'Dukungan teknis jika ada masalah setelah live',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00FFFF]/15 text-[10px] font-bold text-[#00FFFF]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="rounded-2xl border border-white/10 bg-zinc-900/50 overflow-hidden" style={{ minHeight: '220px' }}>
                  <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-900/80">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <span className="ml-3 text-[9px] text-white/25">Toko Online Anda</span>
                  </div>
                  <div className="p-4 grid grid-cols-2 gap-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="rounded-xl border border-white/8 bg-white/[0.03] p-3 space-y-2">
                        <div className="h-14 rounded-lg bg-white/5" />
                        <div className="h-2.5 w-3/4 rounded-md bg-white/8" />
                        <div className="h-2 w-1/2 rounded-md bg-[#00FFFF]/15" />
                        <div className="h-6 w-full rounded-lg bg-[#00FFFF]/10 border border-[#00FFFF]/20" />
                      </div>
                    ))}
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
              Pilih Paket <em className="text-[#00FFFF] italic">E-Commerce</em>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Investasi sekali, toko online berjalan terus. Pilih paket sesuai skala bisnis Anda.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35">
            Butuh fitur khusus untuk toko Anda?{' '}
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
              Buka Toko Sekarang
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Mulai Jual Online, <em className="text-[#00FFFF] italic">Hari Ini</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Ceritakan bisnis Anda dan kami bantu wujudkan toko online yang siap menghasilkan.
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
