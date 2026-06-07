import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Users, Layout, Palette, Smartphone, FileText, Repeat, MessageCircle, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20UI%2FUX%20design.'

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    subtitle: 'Paket',
    tagline: 'Desain ulang tampilan website untuk tampil lebih segar dan modern.',
    price: 'Rp 999.000',
    period: 'Bayar sekali',
    discount: 'Redesign Ringan',
    discountTone: 'cyan',
    cta: 'Pilih Paket Basic',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Redesign 1–3 halaman' },
      { available: true, label: 'Wireframe dasar' },
      { available: true, label: 'Desain responsif (mobile + desktop)' },
      { available: true, label: 'File desain (Figma)' },
      { available: true, label: <>Maks <strong>3x</strong> revisi</> },
      { available: false, label: 'User research' },
      { available: false, label: 'Prototype interaktif' },
      { available: false, label: 'Brand guide' },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Paket',
    tagline: 'Redesign menyeluruh untuk website yang tampil profesional dan meningkatkan konversi.',
    oldPrice: 'Rp 4.998.000',
    savings: 'Hemat Rp 2 juta',
    price: 'Rp 2.499.000',
    period: 'Bayar sekali',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling banyak dipilih',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Redesign hingga 8 halaman' },
      { available: true, label: 'Wireframe + UI design' },
      { available: true, label: 'Desain responsif (mobile + desktop)' },
      { available: true, label: 'Prototype interaktif' },
      { available: true, label: 'File desain (Figma) + assets' },
      { available: true, label: 'Konsultasi branding & identitas' },
      { available: true, label: <>Maks <strong>5x</strong> revisi</> },
      { available: false, label: 'User research mendalam' },
    ],
  },
  {
    name: 'Full',
    subtitle: 'Paket',
    tagline: 'Proyek desain penuh dari riset hingga handoff — untuk bisnis yang ingin tampil sempurna.',
    oldPrice: 'Rp 7.998.000',
    savings: 'Hemat Rp 4 juta',
    price: 'Rp 3.999.000',
    period: 'Bayar sekali',
    discount: '50% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Full',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Redesign halaman unlimited' },
      { available: true, label: 'User research & persona' },
      { available: true, label: 'Wireframe + UI design premium' },
      { available: true, label: 'Prototype interaktif lengkap' },
      { available: true, label: 'File desain (Figma) + design system' },
      { available: true, label: 'Brand guide lengkap' },
      { available: true, label: 'Konsultasi 1-on-1 via Zoom' },
      { available: true, label: <><strong>Unlimited</strong> revisi</> },
    ],
  },
]

const features = [
  {
    icon: Users,
    title: 'User Research',
    desc: 'Kami pahami siapa pengguna website Anda sebelum mendesain — agar setiap elemen desain benar-benar melayani kebutuhan mereka.',
  },
  {
    icon: Layout,
    title: 'Wireframe & Prototype',
    desc: 'Sebelum desain final, kami bangun kerangka halaman (wireframe) dan prototype interaktif agar Anda bisa merasakan alur website terlebih dahulu.',
  },
  {
    icon: Palette,
    title: 'UI Design Modern',
    desc: 'Tampilan yang kekinian, bersih, dan konsisten dengan identitas brand Anda — meningkatkan kepercayaan pengunjung sejak detik pertama.',
  },
  {
    icon: Smartphone,
    title: 'Responsif Semua Perangkat',
    desc: 'Desain yang sempurna di desktop, tablet, maupun HP — tidak ada elemen yang pecah atau tidak terbaca di layar kecil.',
  },
  {
    icon: FileText,
    title: 'File Figma Siap Pakai',
    desc: 'Semua aset desain terorganisir rapi di Figma. Siap digunakan langsung oleh developer — tidak ada yang perlu diulang dari awal.',
  },
  {
    icon: Repeat,
    title: 'Revisi Hingga Puas',
    desc: 'Kami bekerja sampai Anda benar-benar puas dengan hasilnya. Revisi adalah bagian dari proses, bukan tambahan biaya.',
  },
]

export default function UIUXPage() {
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
              Layanan UI/UX Design
            </span>
            <h1
              className="mb-5 text-4xl sm:text-6xl md:text-7xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Desain UI/UX <br />
              <em className="text-[#00FFFF] italic">Modern & Berkesan</em>
            </h1>
            <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-white/55">
              Website lama terasa ketinggalan zaman? Kami redesign tampilan dan pengalaman pengguna agar website Anda lebih modern, profesional, dan meningkatkan konversi.
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
              Proses Desain Kami
            </span>
            <h2
              className="text-3xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Dari Riset ke Desain <br />
              <em className="text-[#00FFFF] italic">yang Benar-Benar Bekerja</em>
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

      {/* Before/After strip */}
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
                  Layanan Mencakup
                </span>
                <h2 className="mb-4 text-2xl md:text-3xl leading-snug" style={{ fontFamily: '"Instrument Serif", serif' }}>
                  Redesign website lama <em className="text-[#00FFFF] italic">atau desain baru</em> dari nol
                </h2>
                <ul className="space-y-3">
                  {[
                    'Audit desain dan UX website yang sudah ada',
                    'Redesign tampilan agar lebih modern & profesional',
                    'Desain UI/UX untuk website baru dari awal',
                    'Optimasi alur pengguna untuk meningkatkan konversi',
                    'Desain sistem yang konsisten di semua halaman',
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white/60">
                      <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-[#00FFFF]/15 text-[10px] font-bold text-[#00FFFF]">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative">
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-2">
                    <p className="text-[10px] text-white/30 uppercase tracking-widest text-center">Sebelum</p>
                    <div className="rounded-xl border border-white/8 bg-zinc-800/30 overflow-hidden aspect-[3/4]">
                      <div className="h-full p-3 space-y-2 flex flex-col">
                        <div className="h-4 w-full rounded bg-white/10" />
                        <div className="h-2 w-3/4 rounded bg-white/6" />
                        <div className="h-2 w-1/2 rounded bg-white/6" />
                        <div className="flex-1 rounded bg-white/5 mt-2" />
                        <div className="h-4 w-2/3 rounded bg-white/8 mx-auto" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <p className="text-[10px] text-[#00FFFF]/60 uppercase tracking-widest text-center">Sesudah</p>
                    <div className="rounded-xl border border-[#00FFFF]/20 bg-zinc-900/60 overflow-hidden aspect-[3/4] shadow-[0_0_24px_rgba(0,255,255,0.08)]">
                      <div className="h-full p-3 space-y-2 flex flex-col">
                        <div className="h-4 w-full rounded bg-[#00FFFF]/20" />
                        <div className="h-2 w-3/4 rounded bg-white/15" />
                        <div className="h-2 w-1/2 rounded bg-white/10" />
                        <div className="flex-1 rounded bg-[#00FFFF]/5 mt-2 border border-[#00FFFF]/10" />
                        <div className="h-6 w-2/3 rounded-full bg-[#00FFFF]/20 border border-[#00FFFF]/30 mx-auto" />
                      </div>
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
              Pilih Paket <em className="text-[#00FFFF] italic">UI/UX Design</em>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Investasi di desain adalah investasi di kepercayaan pelanggan. Pilih paket yang sesuai kebutuhan.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35">
            Belum yakin scope desain yang Anda butuhkan?{' '}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#00FFFF] hover:underline">
              Diskusi gratis via WhatsApp
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
              Tingkatkan Tampilan
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Website Anda Layak Tampil <em className="text-[#00FFFF] italic">Lebih Baik</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Ceritakan kondisi website Anda sekarang dan ekspektasi desain yang diinginkan. Konsultasi gratis, tanpa kewajiban.
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
