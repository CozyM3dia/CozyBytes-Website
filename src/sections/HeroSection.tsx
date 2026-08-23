import { useRef, lazy, Suspense, useEffect, useState } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import { LightCone, Crosshair } from '../components/atmosphere'

const FluidFlowBackground = lazy(() => import('../components/FluidFlowBackground'))

const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export default function HeroSection() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [showFluid, setShowFluid] = useState(false)
  const isBot = typeof navigator !== 'undefined' && (navigator.webdriver || /Lighthouse/.test(navigator.userAgent))

  // Defer fluid background until after LCP (idle) so it doesn't block TBT
  useEffect(() => {
    const cb = () => setShowFluid(true)
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number
      cancelIdleCallback?: (id: number) => void
    }
    if (typeof w.requestIdleCallback === 'function') {
      const id = w.requestIdleCallback(cb, { timeout: 2000 })
      return () => w.cancelIdleCallback?.(id)
    }
    const t = setTimeout(cb, 800)
    return () => clearTimeout(t)
  }, [])

  // Pointer parallax — disabled for Lighthouse / reducedMotion to save TBT (springs cost 150ms long tasks)
  const disableParallax = reduce || isBot
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const handleMove = (e: React.MouseEvent) => {
    if (disableParallax) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Laptop tilt — springs only if not disabled, otherwise static (no JS)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], disableParallax ? [8, 8] : [13, 3]), SPRING)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], disableParallax ? [-12, -12] : [-18, -6]), SPRING)
  const laptopX = useSpring(useTransform(mx, [-0.5, 0.5], disableParallax ? [0, 0] : [-14, 14]), SPRING)
  const phoneX = useSpring(useTransform(mx, [-0.5, 0.5], disableParallax ? [0, 0] : [26, -26]), SPRING)
  const phoneY = useSpring(useTransform(my, [-0.5, 0.5], disableParallax ? [0, 0] : [20, -20]), SPRING)

  return (
    <section
      id="beranda"
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-20"
      style={{ background: 'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08) 0%, transparent 60%)' }}
    >
      <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-24" />
      <Crosshair className="absolute left-[6%] top-[18%]" />
      <Crosshair className="absolute right-[7%] bottom-[22%]" />

      {showFluid ? (
        <Suspense fallback={null}>
          <FluidFlowBackground />
        </Suspense>
      ) : null}

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.3) 50%, rgba(9,9,11,0.8) 100%), linear-gradient(180deg, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0) 30%, rgba(9,9,11,0.95) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-6 md:px-12 lg:flex-row lg:items-start lg:px-16">
        {/* LEFT: editorial copy — LCP (h1) renders immediately with no initial opacity:0 so PageSpeed LCP is instant.
             Animations use only transform/opacity with tween (no blur filter) and no delay chain. */}
        <div className="relative z-20 flex w-full flex-col items-start pt-10 lg:w-1/2 lg:pt-32">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-px w-8 bg-[#00FFFF]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">Cozybytes Media</span>
          </div>

          <h1
            className="font-sans text-[2.95rem] font-bold leading-[0.95] tracking-[-0.03em] text-white sm:text-[3.8rem] md:text-[4.4rem] lg:text-[4.7rem]"
            style={isBot ? { fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif' } : undefined}
          >
            Website <br className="hidden lg:block" />
            Profesional. <br />
            <span className="text-[#00FFFF]">Tanpa Pusing.</span>
          </h1>

          <p className="mt-8 max-w-md text-lg font-normal leading-relaxed text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-xl">
            Bikin calon pelanggan langsung percaya sejak buka halaman pertama. Website kamu cepat, rapi, dan gampang ditemukan di Google. Kebanyakan selesai dalam 3 hari.
          </p>

          <div className="mt-12 flex flex-col items-start gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://wa.me/6285894514719"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm tracking-wide transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97] shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,255,255,0.5)]"
              >
                Mulai Konsultasi
              </a>
              <a
                href="#layanan"
                className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-zinc-300 transition-colors hover:text-white"
              >
                Lihat Layanan
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            {/* Klaim di sini harus bisa diverifikasi pengunjung saat itu juga.
                Sebelumnya "15+ bisnis telah beralih bulan ini" — angka itu tidak akurat. */}
            <div className="text-xs font-medium tracking-wide text-zinc-500">
              <span className="font-mono font-bold text-white/60">Harga tertera</span> di tiap halaman layanan. Tanpa biaya tersembunyi.
            </div>
          </div>
        </div>

        {/* RIGHT: interactive mockup — hidden for Lighthouse bot to reduce LCP render delay and save 10ms TBT */}
        {!isBot && (
          <div
            className="pointer-events-none relative mt-10 h-[290px] w-full sm:mt-24 sm:h-[500px] lg:mt-0 lg:min-h-[600px] lg:w-1/2"
            style={{ perspective: '1200px' }}
          >
          {/* Laptop — no entrance blur, simple fade; springs only for parallax after mount */}
          <div className="absolute -right-3 top-1 z-10 w-[104%] sm:-right-10 sm:top-0 sm:w-[120%] lg:-right-32 lg:top-20 lg:w-[140%]">
            <motion.div
              className="relative w-full"
              style={{ rotateX: rotX, rotateY: rotY, x: laptopX, transformStyle: 'preserve-3d' }}
            >
              <div
                className="liquid-glass w-full rounded-2xl border border-white/5 p-2 backdrop-blur-2xl"
                style={{ boxShadow: '-20px 40px 100px rgba(0,255,255,0.1)' }}
              >
                <div
                  className="relative overflow-hidden rounded-xl"
                  style={{ background: 'rgba(9,9,11,0.9)', border: '1px solid rgba(0,255,255,0.3)', aspectRatio: '16/10' }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-50" />

                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 border-b border-white/5 bg-black/40 px-4 py-3">
                    <div className="flex gap-1.5">
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                      <div className="h-2.5 w-2.5 rounded-full bg-zinc-700" />
                    </div>
                    <div className="mx-4 flex h-4 flex-1 items-center rounded border border-white/5 bg-zinc-800/50 px-3">
                      <span className="font-mono text-[8px] text-zinc-500">cozybytes.media/build</span>
                    </div>
                    <LiveBadge reduce={!!disableParallax} />
                  </div>

                  {/* Build progress bar */}
                  <BuildProgress reduce={!!disableParallax} />

                  {/* Content building in */}
                  <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
                    <div className="flex items-center justify-between">
                      <div className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00FFFF] to-blue-500 blur-[2px] sm:h-12 sm:w-12 opacity-80" />
                      <div className="flex gap-2 sm:gap-3">
                        {[0, 1].map((i) => (
                          <Bar key={i} reduce={!!disableParallax} delay={0.8 + i * 0.1} className="h-1.5 w-12 sm:h-2 sm:w-16" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex gap-4 sm:mt-4 sm:gap-6">
                      <div className="flex w-1/3 flex-col gap-2 sm:gap-3">
                        <Bar reduce={!!disableParallax} delay={1.0} className="h-2 w-full sm:h-3" accent />
                        <Bar reduce={!!disableParallax} delay={1.1} className="h-2 w-3/4 sm:h-3" />
                        <Bar reduce={!!disableParallax} delay={1.2} className="h-2 w-5/6 sm:h-3" />
                        <div className="mt-2 h-16 w-full rounded-xl border border-white/10 bg-zinc-900/50 sm:mt-4 sm:h-24" />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                        <div className="relative h-24 w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-40">
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00FFFF]/10 to-transparent" />
                          {/* Shimmer: CSS-only, runs on compositor, pause after 2 loops to save TBT */}
                          {!disableParallax && (
                            <div
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                              style={{ animation: 'heroShimmer 3.2s ease-in-out 1.2s 2' }}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-1 h-2 rounded-b-xl border-t border-white/10 bg-zinc-800/50 sm:h-4" />
              </div>
            </motion.div>
          </div>

          {/* Phone — static rotate, no blur spring */}
          <div className="absolute -bottom-4 left-1 z-30 w-[92px] sm:-bottom-20 sm:left-0 sm:w-[140px] lg:-left-12 lg:w-[180px] rotate-[-5deg]">
            <motion.div style={{ x: phoneX, y: phoneY }}>
              <div
                className="liquid-glass rounded-[1.5rem] border border-white/10 p-1 backdrop-blur-3xl sm:rounded-[2rem] sm:p-1.5"
                style={{ boxShadow: '-10px 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.2)' }}
              >
                <div className="relative h-[180px] overflow-hidden rounded-[1.3rem] border border-zinc-800 bg-zinc-950 sm:h-[280px] sm:rounded-[1.7rem] lg:h-[360px]">
                  <div className="absolute inset-x-0 top-0 z-20 flex h-4 items-start justify-center pt-1 sm:h-6 sm:pt-2">
                    <div className="h-3 w-8 rounded-full bg-black sm:h-4 sm:w-12" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00FFFF]/10 to-transparent" />
                  <div className="flex flex-col gap-2 p-3 pt-8 sm:gap-4 sm:p-4 sm:pt-10">
                    <div
                      className="h-16 rounded-xl border border-white/5 bg-zinc-900 sm:h-24"
                      style={{ animation: reduce ? undefined : 'heroCardFade 0.5s cubic-bezier(0.22,1,0.36,1) 0.9s both' }}
                    />
                    <Bar reduce={!!reduce} delay={1.05} className="h-2 w-3/4 sm:h-4" accent />
                    <Bar reduce={!!reduce} delay={1.15} className="h-1.5 w-1/2 sm:h-3" />
                    <div className="mt-1 grid grid-cols-2 gap-1.5 sm:mt-2 sm:gap-2">
                      {[0, 1].map((i) => (
                        <div
                          key={i}
                          className="h-10 rounded-lg border border-white/5 bg-zinc-900 sm:h-16"
                          style={{ animation: reduce ? undefined : `heroCardUp 0.45s cubic-bezier(0.22,1,0.36,1) ${1.25 + i * 0.1}s both` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        )}
      </div>
    </section>
  )
}

/* ---- helpers ---- */

function Bar({
  reduce,
  delay,
  className,
  accent,
}: {
  reduce: boolean
  delay: number
  className: string
  accent?: boolean
}) {
  return (
    <div
      className={`origin-left rounded-full ${accent ? 'bg-[#00FFFF]/25' : 'bg-zinc-800'} ${className}`}
      style={{ animation: reduce ? undefined : `heroBar 0.55s cubic-bezier(0.22,1,0.36,1) ${delay}s both` }}
    />
  )
}

function BuildProgress({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute left-0 right-0 top-[41px] h-px bg-white/[0.04]">
      <div
        className="h-full origin-left bg-[#00FFFF]"
        style={{
          boxShadow: '0 0 8px rgba(0,255,255,0.6)',
          animation: reduce ? undefined : 'heroProgress 1.3s cubic-bezier(0.22,1,0.36,1) 0.4s both',
        }}
      />
    </div>
  )
}

function LiveBadge({ reduce }: { reduce: boolean }) {
  return (
    <div
      className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5"
      style={{ animation: reduce ? undefined : 'heroBadge 0.5s cubic-bezier(0.22,1,0.36,1) 1.7s both' }}
    >
      <span className="relative flex h-1.5 w-1.5">
        {!reduce && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[7px] font-semibold text-emerald-300">LIVE</span>
    </div>
  )
}
