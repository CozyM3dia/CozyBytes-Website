import { Fragment, useEffect, useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import { ArrowRight, ArrowUpRight, MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ShineBorder } from '../components/ui/shine-border'
import { LightCone } from '../components/atmosphere'
import { SERVICES } from '../data/services'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20mau%20konsultasi%20soal%20layanan.'

const SERVICE_META: Record<string, { tag: string; preview: string }> = {
  '/layanan/website': { tag: 'Bangun Kepercayaan', preview: '/services/company.webp' },
  '/layanan/landing-page': { tag: 'Untuk Iklan', preview: '/services/landing.webp' },
  '/layanan/ecommerce': { tag: 'Jualan Online', preview: '/services/ecommerce.webp' },
  '/layanan/uiux': { tag: 'Modernisasi', preview: '/services/uiux.webp' },
}

const MARQUEE_ITEMS = [
  'Company Profile',
  'Landing Page',
  'E-Commerce',
  'UI/UX Design',
  'Harga Jelas dari Awal',
]

const NOISE_TEXTURE =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E\")"

const ease = [0.22, 1, 0.36, 1] as const

const formatInt = (n: number) => Math.round(n).toLocaleString('id-ID')

function FactDivider() {
  return <span aria-hidden="true" className="inline-block h-1.5 w-1.5 rotate-45 bg-[#00FFFF]/45" />
}

function CountUp({ to, format }: { to: number; format: (n: number) => string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20px' })
  const reduce = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || !inView) return
    if (reduce) {
      el.textContent = format(to)
      return
    }
    const controls = animate(0, to, {
      duration: 1.5,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        el.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, reduce, to, format])

  return <span ref={ref}>{reduce ? format(to) : format(0)}</span>
}

function RevealWords({
  text,
  delay = 0,
  mode = 'mount',
  className,
}: {
  text: string
  delay?: number
  mode?: 'mount' | 'view'
  className?: string
}) {
  const reduce = useReducedMotion()
  if (reduce) return <span className={className}>{text}</span>

  const animProps =
    mode === 'mount'
      ? { initial: { y: '112%' }, animate: { y: 0 } }
      : { initial: { y: '112%' }, whileInView: { y: 0 }, viewport: { once: true, margin: '-60px' } }

  return (
    <span className={className}>
      {text.split(' ').map((word, i, arr) => (
        <Fragment key={`${word}-${i}`}>
          <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              {...animProps}
              transition={{ duration: 0.85, delay: delay + i * 0.08, ease }}
            >
              {word}
            </motion.span>
          </span>
          {i < arr.length - 1 ? ' ' : null}
        </Fragment>
      ))}
    </span>
  )
}

export default function LayananPage() {
  const reduceMotion = useReducedMotion()

  // Floating preview (signature interaction)
  const [previewIndex, setPreviewIndex] = useState<number | null>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const px = useSpring(mx, { stiffness: 180, damping: 24, mass: 0.7 })
  const py = useSpring(my, { stiffness: 180, damping: 24, mass: 0.7 })

  // Hero parallax
  const heroRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const ghostY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const ghostOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  const handleListMove = (e: React.MouseEvent<HTMLUListElement>) => {
    mx.set(e.clientX + 32)
    my.set(e.clientY - 100)
  }

  return (
    <div className="min-h-screen">
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
      <main id="main-content" tabIndex={-1} className="outline-none">

        {/* Hero */}
        <section ref={heroRef} className="relative overflow-hidden pt-32 md:pt-44 pb-14 md:pb-24">
          <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-24" />
          {/* Atmosphere: radial glow + blueprint grid */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-0 h-[480px]"
            style={{
              background:
                'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(0,255,255,0.10) 0%, transparent 70%)',
            }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.028) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.028) 1px, transparent 1px)',
              backgroundSize: '72px 72px',
              maskImage:
                'radial-gradient(ellipse 90% 65% at 50% 0%, black 25%, transparent 78%)',
              WebkitMaskImage:
                'radial-gradient(ellipse 90% 65% at 50% 0%, black 25%, transparent 78%)',
            }}
          />
          {/* Ghost display text w/ scroll parallax */}
          <motion.div
            aria-hidden="true"
            style={{ x: '-50%', y: ghostY, opacity: ghostOpacity }}
            className="pointer-events-none absolute -bottom-24 left-1/2 select-none whitespace-nowrap font-display text-[22vw] font-semibold uppercase leading-none tracking-tight text-transparent lg:-bottom-32 lg:text-[17rem]"
          >
            <span
              className="bg-gradient-to-b from-white/[0.07] to-transparent bg-clip-text"
              style={{ WebkitTextStroke: '1px rgba(255,255,255,0.045)', WebkitTextFillColor: 'transparent' }}
            >
              Layanan
            </span>
          </motion.div>

          <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-6">
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45, ease }}
            >
              <h1 className="font-display text-[2.6rem] leading-[1.05] font-medium tracking-tight sm:text-5xl md:text-6xl lg:text-[4.5rem]">
                <RevealWords text="Layanan Cozybytes." delay={0.1} />
                <br />
                <RevealWords text="Harga jelas dari awal." delay={0.35} className="text-[#00FFFF]" />
              </h1>
              <motion.p
                className="mt-6 max-w-lg text-base leading-relaxed text-white/60 md:text-lg"
                initial={reduceMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7, ease }}
              >
                Pilih yang paling dekat dengan kebutuhan Anda. Kalau masih ragu yang mana,
                kirim pesan saja, nanti kami bantu tentukan.
              </motion.p>

              {/* Fact strip */}
              <motion.div
                className="mt-9 flex flex-wrap items-center gap-x-4 gap-y-3"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.95, ease }}
              >
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Mulai{' '}
                  <span className="font-bold normal-case tracking-normal text-white">
                    Rp&nbsp;<CountUp to={1499000} format={formatInt} />
                  </span>
                </span>
                <FactDivider />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  Selesai{' '}
                  <span className="font-bold normal-case tracking-normal text-white">hitungan hari</span>
                </span>
                <FactDivider />
                <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/40">
                  <span className="font-bold normal-case tracking-normal text-white">Gratis</span>{' '}
                  konsultasi
                </span>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Service index */}
        <section className="mx-auto max-w-6xl px-5 md:px-6 pb-4">
          <motion.div
            className="mb-2 flex items-center gap-4"
            initial={reduceMotion ? false : { opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/35">
              Indeks Layanan
            </span>
            <span className="h-px flex-1 bg-white/[0.08]" />
            <span className="font-mono text-[10px] tracking-[0.25em] text-[#00FFFF]/50">
              01–0{SERVICES.length}
            </span>
          </motion.div>

          <ul
            className="border-t border-white/[0.08]"
            onMouseMove={handleListMove}
            onMouseLeave={() => setPreviewIndex(null)}
          >
            {SERVICES.map((svc, i) => {
              const meta = SERVICE_META[svc.href]
              return (
                <motion.li
                  key={svc.href}
                  initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.07, ease }}
                >
                  <Link
                    to={svc.href}
                    onMouseEnter={() => !reduceMotion && setPreviewIndex(i)}
                    onFocus={() => setPreviewIndex(null)}
                    onMouseMove={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect()
                      e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`)
                      e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`)
                    }}
                    className="group relative block border-b border-white/[0.08] py-7 md:py-9"
                  >
                    {/* Cursor spotlight */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                      style={{
                        background:
                          'radial-gradient(260px circle at var(--mx, 50%) var(--my, 50%), rgba(0,255,255,0.055), transparent 70%)',
                      }}
                    />
                    {/* Cyan sweep on hover */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-[#00FFFF] via-[#00FFFF]/40 to-transparent transition-transform duration-500 ease-out group-hover:scale-x-100"
                    />
                    {/* Ghost numeral */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 select-none font-display text-[8rem] font-medium leading-none text-white opacity-0 transition-opacity duration-500 group-hover:opacity-[0.045] lg:block"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="relative flex items-start gap-4 md:gap-8">
                      <span className="w-7 flex-shrink-0 pt-1.5 font-mono text-xs text-[#00FFFF]/40 transition-colors duration-300 group-hover:text-[#00FFFF] md:pt-3 md:text-sm">
                        {String(i + 1).padStart(2, '0')}
                      </span>

                      <span className="min-w-0 flex-1">
                        <span className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <span className="font-display text-[1.7rem] font-medium leading-tight tracking-tight text-white transition-all duration-300 group-hover:translate-x-1 group-hover:text-[#00FFFF] md:text-4xl lg:text-[2.75rem]">
                            {svc.label}
                          </span>
                          {meta && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/30 transition-colors duration-300 group-hover:text-[#00FFFF]/60">
                              {meta.tag}
                            </span>
                          )}
                        </span>
                        <span className="mt-1.5 block max-w-md text-sm leading-relaxed text-white/45 md:mt-2 md:text-[15px]">
                          {svc.desc}
                        </span>
                      </span>

                      <span
                        aria-hidden="true"
                        className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full border border-white/10 text-white/40 transition-all duration-300 group-hover:border-[#00FFFF] group-hover:bg-[#00FFFF] group-hover:text-black group-hover:shadow-[0_0_24px_rgba(0,255,255,0.35)] md:mt-3 md:h-12 md:w-12"
                      >
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 md:h-5 md:w-5" />
                      </span>
                    </div>
                  </Link>
                </motion.li>
              )
            })}
          </ul>
        </section>

        {/* Display-type marquee */}
        <div className="mt-16 overflow-hidden border-y border-white/[0.06] py-6 md:mt-24 md:py-9" aria-hidden="true">
          <div
            className="flex w-max items-center hover:[animation-play-state:paused] motion-safe:animate-[marquee_32s_linear_infinite]"
            style={{ gap: '4.5rem' }}
          >
            {[0, 1].map((half) => (
              <div key={half} className="flex items-center" style={{ gap: '4.5rem' }}>
                {MARQUEE_ITEMS.map((item, idx) => (
                  <span
                    key={`${half}-${item}`}
                    className="flex items-center whitespace-nowrap"
                    style={{ gap: '4.5rem' }}
                  >
                    {idx % 2 === 0 ? (
                      <span className="font-display text-4xl font-medium uppercase tracking-tight text-white/90 md:text-6xl lg:text-[4rem]">
                        {item}
                      </span>
                    ) : item === 'Harga Jelas dari Awal' ? (
                      <span className="font-serif text-4xl italic text-[#00FFFF]/85 md:text-6xl lg:text-[4rem]">
                        {item}
                      </span>
                    ) : (
                      <span
                        className="font-display text-4xl font-medium uppercase tracking-tight text-transparent md:text-6xl lg:text-[4rem]"
                        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.28)' }}
                      >
                        {item}
                      </span>
                    )}
                    <span className="inline-block h-2 w-2 rotate-45 bg-[#00FFFF]/60" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* Consultation CTA */}
        <section className="mx-auto max-w-6xl px-5 md:px-6 pb-24 pt-14 md:pb-32 md:pt-20">
          <style>{`
            @media (prefers-reduced-motion: no-preference) {
              .cta-dot { animation: cta-bounce 1.2s ease-in-out infinite; }
            }
            @keyframes cta-bounce {
              0%, 60%, 100% { transform: translateY(0); opacity: 0.35; }
              30% { transform: translateY(-3px); opacity: 1; }
            }
          `}</style>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease }}
          >
            <ShineBorder borderRadius={24} borderWidth={1} duration={6} color="#00FFFF" className="block bg-zinc-950 p-0">
              <div className="relative overflow-hidden rounded-3xl">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -left-24 -top-24 h-96 w-96 rounded-full"
                  style={{
                    background:
                      'radial-gradient(circle, rgba(0,255,255,0.09) 0%, transparent 70%)',
                  }}
                />
                <div className="relative z-10 grid gap-10 p-7 sm:p-10 md:grid-cols-[1.1fr_1fr] md:items-center md:gap-14 md:p-14">
                  {/* Copy */}
                  <div>
                    <div className="flex items-center gap-2.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#00FFFF] opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-[#00FFFF]" />
                      </span>
                      <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-[#00FFFF]/70">
                        Slot terbuka bulan ini
                      </span>
                    </div>
                    <h2 className="mt-5 font-serif text-4xl italic leading-[1.12] text-white md:text-[3.25rem]">
                      Belum yakin
                      <br />
                      butuh yang mana?
                    </h2>
                    <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55 md:text-base">
                      Ceritakan bisnis Anda lewat pesan. Kami bantu pilihkan yang paling
                      pas, tanpa paksaan.
                    </p>
                    <div className="mt-8 flex flex-col items-start gap-4">
                      <a
                        href={WA_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-primary px-7 py-3.5 text-sm"
                      >
                        Konsultasi Gratis
                        <ArrowUpRight className="h-4 w-4" />
                      </a>
                      <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-white/30">
                        WhatsApp · 0858-9451-4719 · Balas di jam kerja
                      </p>
                    </div>
                  </div>

                  {/* Chat mockup */}
                  <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 md:p-6">
                    <div className="flex items-center gap-3 border-b border-white/[0.06] pb-4">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#00FFFF]/25 bg-[#00FFFF]/[0.06]">
                        <MessageCircle className="h-4 w-4 text-[#00FFFF]" />
                      </span>
                      <div>
                        <p className="text-sm font-semibold text-white">Cozybytes Media</p>
                        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                          <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
                          WhatsApp · Online
                        </p>
                      </div>
                    </div>
                    <div className="mt-5 flex flex-col gap-3">
                      <div className="max-w-[88%] self-start rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-white/65">
                        Halo Cozybytes! Punya usaha sendiri, bingung mau bikin website
                        yang bagaimana.
                      </div>
                      <div className="max-w-[88%] self-end rounded-2xl rounded-br-md border border-[#00FFFF]/20 bg-[#00FFFF]/[0.07] px-4 py-3 text-sm leading-relaxed text-white/85">
                        Halo! Santai, cerita saja dulu. Nanti kami bantu pilihkan yang
                        paling pas, gratis.
                      </div>
                      <div
                        className="flex items-center gap-1.5 self-end rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/[0.05] px-4 py-2.5"
                        role="img"
                        aria-label="Sedang mengetik"
                      >
                        {[0, 1, 2].map((d) => (
                          <span
                            key={d}
                            className="cta-dot inline-block h-1.5 w-1.5 rounded-full bg-[#00FFFF]"
                            style={{ animationDelay: `${d * 0.18}s` }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ShineBorder>
          </motion.div>
        </section>

      </main>

      {/* Floating service preview — follows cursor with spring physics */}
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          style={{ x: px, y: py }}
          className="pointer-events-none fixed left-0 top-0 z-40 hidden lg:block"
        >
          <AnimatePresence>
            {previewIndex !== null && (
              <motion.div
                key={previewIndex}
                className="relative h-[180px] w-[264px]"
                initial={{ opacity: 0, scale: 0.82, rotate: -5 }}
                animate={{ opacity: 1, scale: 1, rotate: -3 }}
                exit={{ opacity: 0, scale: 0.88, rotate: -1 }}
                transition={{ duration: 0.32, ease }}
              >
                <img
                  src={SERVICE_META[SERVICES[previewIndex].href]?.preview}
                  alt=""
                  width={264}
                  height={180}
                  className="absolute inset-0 h-full w-full rounded-2xl border border-[#00FFFF]/25 object-cover shadow-[0_24px_70px_rgba(0,255,255,0.16),0_10px_30px_rgba(0,0,0,0.6)]"
                />
                <span className="absolute -bottom-px left-6 right-6 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/60 to-transparent" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-30 opacity-[0.032]"
        style={{ backgroundImage: NOISE_TEXTURE }}
      />

      <Footer />
    </div>
  )
}
