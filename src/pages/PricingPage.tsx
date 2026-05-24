import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check, MessageCircle, Star, X, ArrowUpRight } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

type Feature = {
  label: React.ReactNode
  available: boolean
  badges?: string[]
}

type PricingTier = {
  name: string
  subtitle: string
  tagline: string
  oldPrice?: string
  savings?: string
  price: string
  period: string
  discount: string
  discountTone: 'cyan' | 'gold' | 'violet'
  cta: string
  highlighted?: boolean
  specialBadge?: string
  buttonTone: 'cyan' | 'gold' | 'dark'
  features: Feature[]
}

const tiers: PricingTier[] = [
  {
    name: 'UMKM',
    subtitle: 'Paket',
    tagline: 'Mulai jejak digitalmu. Simpel, cepat, langsung aktif.',
    oldPrice: 'Rp 2.998.000',
    savings: 'Hemat Rp 1.499.000',
    price: 'Rp 1.499.000',
    period: 'Bayar sekali, website selamanya',
    discount: '50% OFF',
    discountTone: 'cyan',
    cta: 'Pilih Paket UMKM',
    buttonTone: 'cyan',
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO basic' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Tutorial kelola website' },
      { available: true, label: <><strong>1 halaman</strong> landing page</> },
      { available: true, label: 'Support teknis 6 bulan' },
      { available: true, label: <>Maks <strong>3x</strong> revisi</> },
      { available: false, label: 'Konsultasi branding' },
      { available: false, label: 'Free maintenance 1 tahun' },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Paket',
    tagline: 'Lengkap untuk tampil serius. Favorit para pemilik UMKM aktif.',
    oldPrice: 'Rp 6.000.000',
    savings: 'Hemat Rp 3 juta',
    price: 'Rp 3.000.000',
    period: 'Bayar sekali, website selamanya',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling banyak dipilih',
    buttonTone: 'gold',
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO friendly' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Free UI/UX design' },
      { available: true, label: 'Tutorial kelola website' },
      { available: true, label: <><strong>Hingga 5 halaman</strong></> },
      { available: true, label: 'Konsultasi branding & desain' },
      {
        available: true,
        label: <><strong>Free</strong> Maintenance & support</>,
        badges: ['1 TAHUN'],
      },
      { available: true, label: <>Maks <strong>5x</strong> revisi</> },
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Paket',
    tagline: 'Untuk bisnis yang ingin tampil beda dan siap tumbuh lebih jauh.',
    oldPrice: 'Rp 9.000.000',
    savings: 'Hemat Rp 4.2 juta',
    price: 'Rp 4.799.000',
    period: 'Bayar sekali, website selamanya',
    discount: '47% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Premium',
    buttonTone: 'dark',
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO advanced + Google Analytics' },
      { available: true, label: 'Akses penuh (ownership)' },
      { available: true, label: 'Free UI/UX design premium' },
      { available: true, label: 'Tutorial 1-on-1 via Zoom' },
      { available: true, label: <><strong>Hingga 10 halaman</strong> + Blog</> },
      { available: true, label: 'Konsultasi branding & desain' },
      { available: true, label: 'WhatsApp chat widget' },
      {
        available: true,
        label: <><strong>Free</strong> Maintenance & support</>,
        badges: ['1 TAHUN', 'PRIORITY'],
      },
      { available: true, label: <><strong>Unlimited</strong> revisi</> },
    ],
  },
]

const landingTiers: PricingTier[] = [
  {
    name: 'Bulanan',
    subtitle: 'Sewa',
    tagline: 'Mulai hadir online tanpa komitmen panjang.',
    price: 'Rp 99rb',
    period: '/ bulan',
    discount: 'Sewa bulanan',
    discountTone: 'gold',
    cta: 'Pilih Bulanan',
    buttonTone: 'cyan',
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
    tagline: 'Bayar sekali, website milik kamu selamanya.',
    price: 'Rp 1.299rb',
    period: 'sekali bayar',
    discount: 'Milik selamanya',
    discountTone: 'violet',
    cta: 'Pilih Ownership',
    buttonTone: 'dark',
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

const discountClasses = {
  cyan: 'border-[#00FFFF]/30 bg-[#00FFFF]/10 text-[#00FFFF]',
  gold: 'border-[#F8D16A]/50 bg-[#F8D16A]/15 text-[#F8D16A]',
  violet: 'border-violet-300/40 bg-violet-400/15 text-violet-200',
}

const buttonClasses = {
  cyan:
    'bg-[#00FFFF] text-black shadow-[0_0_28px_rgba(0,255,255,0.28)] hover:shadow-[0_0_42px_rgba(0,255,255,0.38)]',
  gold:
    'bg-[#F8D16A] text-[#171103] shadow-[0_0_34px_rgba(248,209,106,0.35)] hover:shadow-[0_0_54px_rgba(248,209,106,0.48)]',
  dark:
    'bg-[#08080b] text-white border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-violet-200/40',
}

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <li
      className={`flex items-start gap-3 text-sm leading-relaxed ${
        feature.available ? 'text-white/76' : 'text-white/28 line-through'
      }`}
    >
      <span
        className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${
          feature.available
            ? 'bg-emerald-400/12 text-emerald-300'
            : 'bg-white/[0.03] text-white/25'
        }`}
      >
        {feature.available ? (
          <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
        ) : (
          <X className="h-3.5 w-3.5" strokeWidth={2.5} />
        )}
      </span>
      <span className="min-w-0">
        {feature.label}
        {feature.badges?.map((badge) => (
          <span
            key={badge}
            className="ml-2 inline-flex translate-y-[-1px] rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#00FFFF]"
          >
            {badge}
          </span>
        ))}
      </span>
    </li>
  )
}

function PricingCard({
  tier,
  index,
  inView,
}: {
  tier: PricingTier
  index: number
  inView: boolean
}) {
  const cardInner = (
    <>
      <div
        className={`pointer-events-none absolute inset-x-8 top-0 h-px ${
          tier.highlighted
            ? 'bg-gradient-to-r from-transparent via-[#F8D16A] to-transparent'
            : 'bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent'
        }`}
      />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-24 top-12 h-56 w-56 rounded-full bg-[#00FFFF]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[#F8D16A]/10 blur-3xl" />
      </div>

      <div className={`relative z-10 flex flex-1 flex-col rounded-[26.5px] px-6 py-7 md:px-7 ${
        tier.highlighted ? 'bg-[#050507]' : 'bg-[#050507]/88 backdrop-blur-xl'
      }`}>
        <div className="mb-5 flex min-h-9 flex-wrap items-center justify-between gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-bold tracking-widest ${discountClasses[tier.discountTone]}`}>
            {tier.discount}
          </span>
          {tier.specialBadge && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F8D16A]/35 bg-[#F8D16A]/12 px-3 py-1 text-xs font-bold text-[#F8D16A]">
              <Star className="h-3.5 w-3.5 fill-current" />
              {tier.specialBadge}
            </span>
          )}
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">
            {tier.subtitle}
          </p>
          <h2
            className={`mt-1 text-4xl leading-none md:text-5xl ${
              tier.highlighted ? 'text-[#F8D16A]' : 'text-white'
            }`}
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {tier.name}
          </h2>
          <p className="mt-4 min-h-[3.25rem] text-sm leading-relaxed text-white/52">
            {tier.tagline}
          </p>
        </div>

        <div className="mb-7 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
          {tier.oldPrice && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/34 line-through">{tier.oldPrice}</span>
              {tier.savings && (
                <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">
                  {tier.savings}
                </span>
              )}
            </div>
          )}
          <div className={`${tier.oldPrice ? 'mt-2' : ''} text-3xl font-black tracking-tight text-white md:text-[2.35rem]`}>
            {tier.price}
          </div>
          <p className="mt-2 text-xs font-medium text-white/40">{tier.period}</p>
        </div>

        <motion.a
          href="https://wa.me/6285894514719"
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className={`mb-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition-all ${buttonClasses[tier.buttonTone]}`}
        >
          <MessageCircle className="h-4 w-4" />
          {tier.cta}
        </motion.a>

        <ul className="flex flex-1 flex-col gap-3.5">
          {tier.features.map((feature, featureIndex) => (
            <FeatureRow key={`${tier.name}-${featureIndex}`} feature={feature} />
          ))}
        </ul>
      </div>
    </>
  )

  if (tier.highlighted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 1.02 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1.04 } : {}}
        transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{
          y: -10,
          scale: 1.055,
          transition: { duration: 0.24, ease: 'easeOut' },
        }}
        className="group relative flex h-full w-full min-h-full flex-col md:-translate-y-3"
      >
        {/* SVG border trail — outside overflow:hidden so it traces the actual rect border */}
        <svg
          className="pointer-events-none absolute inset-0 h-full w-full"
          style={{ zIndex: 20, overflow: 'visible' }}
          fill="none"
        >
          {/* Dim base border always visible */}
          <rect
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              x: '1px',
              y: '1px',
              rx: '27px',
              fill: 'none',
              stroke: 'rgba(248,209,106,0.14)',
              strokeWidth: '1.5',
            }}
          />
          {/* Glow halo layer */}
          <rect
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              x: '1px',
              y: '1px',
              rx: '27px',
              fill: 'none',
              stroke: 'rgba(248,209,106,0.55)',
              strokeWidth: '7',
              strokeLinecap: 'round',
              strokeDasharray: '80 2920',
              animation: 'svgBorderTrail 4s linear infinite',
              filter: 'blur(5px)',
            }}
          />
          {/* Sharp trail */}
          <rect
            style={{
              width: 'calc(100% - 2px)',
              height: 'calc(100% - 2px)',
              x: '1px',
              y: '1px',
              rx: '27px',
              fill: 'none',
              stroke: '#F8D16A',
              strokeWidth: '2',
              strokeLinecap: 'round',
              strokeDasharray: '80 2920',
              animation: 'svgBorderTrail 4s linear infinite',
            }}
          />
        </svg>
        <article className="relative flex h-full w-full min-h-full flex-col overflow-hidden rounded-[28px] bg-[#050507] shadow-[0_0_80px_rgba(248,209,106,0.12),0_0_90px_rgba(0,255,255,0.06)]">
          {cardInner}
        </article>
      </motion.div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 46, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{
        y: -7,
        scale: 1.015,
        transition: { duration: 0.24, ease: 'easeOut' },
      }}
      className="group relative flex h-full w-full min-h-full flex-col overflow-hidden rounded-[28px] border border-white/10 p-1 bg-white/[0.018] shadow-[0_26px_70px_rgba(0,0,0,0.28)]"
    >
      {cardInner}
    </motion.article>
  )
}

export default function PricingPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const landingRef = useRef(null)
  const landingInView = useInView(landingRef, { once: true, margin: '-60px' })

  return (
    <div className="min-h-screen bg-zinc-950">
      <Navbar />

      <section
        ref={ref}
        className="relative overflow-hidden pt-36 pb-24 md:pb-32"
        style={{
          background:
            'radial-gradient(ellipse 72% 38% at 50% 0%, rgba(0,255,255,0.12) 0%, transparent 62%), radial-gradient(ellipse 46% 32% at 50% 42%, rgba(248,209,106,0.065) 0%, transparent 70%), #000',
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-30">
          <div className="absolute left-1/2 top-32 h-px w-[86vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
          <div className="absolute left-[8%] top-48 h-64 w-64 rounded-full bg-[#00FFFF]/8 blur-3xl" />
          <div className="absolute right-[10%] top-64 h-72 w-72 rounded-full bg-[#F8D16A]/7 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Pricing Table
            </span>
            <h1
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-7xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Pilih Paket <em className="text-[#00FFFF] italic">Terbaik</em>
            </h1>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Tiga pilihan harga yang jelas untuk membawa bisnis Anda tampil
              profesional, cepat aktif, dan siap menerima pelanggan baru.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35"
          >
            Masih ragu paket mana yang paling cocok?{' '}
            <a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#00FFFF] hover:underline"
            >
              Konsultasi gratis via WhatsApp
            </a>
          </motion.p>
        </div>
      </section>

      {/* Landing Page Pricing Section */}
      <section
        ref={landingRef}
        className="relative overflow-hidden py-24 md:py-32"
        style={{
          background:
            'radial-gradient(ellipse 72% 38% at 50% 0%, rgba(0,255,255,0.08) 0%, transparent 62%), #09090B',
        }}
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={landingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-14 max-w-2xl text-center"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Landing Page
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-7xl"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Paket <em className="text-[#00FFFF] italic">Landing Page</em>
            </h2>
            <p className="mx-auto max-w-xl text-base leading-relaxed text-white/52">
              Mulai hadir online dengan landing page profesional.
              Pilih model pembayaran yang paling cocok untuk bisnis Anda.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {landingTiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={landingInView} />
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={landingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/35"
          >
            Butuh bantuan memilih?{' '}
            <a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#00FFFF] hover:underline"
            >
              Chat kami via WhatsApp
            </a>
          </motion.p>
        </div>
      </section>

      {/* Custom Project CTA */}
      <section className="relative py-20 md:py-28 overflow-hidden bg-zinc-950">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,255,255,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden rounded-[28px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 text-center"
          >
            {/* Top accent line */}
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent" />

            {/* Ambient glow */}
            <div className="pointer-events-none absolute -top-20 left-1/2 -translate-x-1/2 h-40 w-80 rounded-full bg-[#00FFFF]/8 blur-3xl" />

            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Custom Project
            </span>

            <h2
              className="mb-4 text-3xl sm:text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Butuh <em className="text-[#00FFFF] italic">Sesuatu</em> yang Berbeda?
            </h2>

            <p className="mx-auto mb-8 max-w-lg text-base leading-relaxed text-white/50">
              Website e-commerce, sistem custom, portal bisnis, atau kebutuhan digital lainnya —
              ceritakan ide Anda, kami bantu wujudkan dengan standar terbaik.
            </p>

            <motion.a
              href="https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20untuk%20konsultasi%20project%20custom."
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 text-sm font-bold px-8 py-4"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi Project Custom
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
