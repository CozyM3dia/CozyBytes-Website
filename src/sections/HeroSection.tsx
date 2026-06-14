import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import FluidFlowBackground from '../components/FluidFlowBackground'

const EASE = [0.22, 1, 0.36, 1] as const
const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

export default function HeroSection() {
  const reduce = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)

  // Pointer parallax: normalized -0.5..0.5 across the section
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const handleMove = (e: React.MouseEvent) => {
    if (reduce) return
    const rect = sectionRef.current?.getBoundingClientRect()
    if (!rect) return
    mx.set((e.clientX - rect.left) / rect.width - 0.5)
    my.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const handleLeave = () => {
    mx.set(0)
    my.set(0)
  }

  // Laptop tilt (base rotateX 8 / rotateY -12, parallax adds delta)
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [13, 3]), SPRING)
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-18, -6]), SPRING)
  const laptopX = useSpring(useTransform(mx, [-0.5, 0.5], [-14, 14]), SPRING)
  // Phone sits closer to viewer: deeper parallax travel
  const phoneX = useSpring(useTransform(mx, [-0.5, 0.5], [26, -26]), SPRING)
  const phoneY = useSpring(useTransform(my, [-0.5, 0.5], [20, -20]), SPRING)

  return (
    <section
      id="beranda"
      ref={sectionRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-20"
      style={{ background: 'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08) 0%, transparent 60%), #000' }}
    >
      <FluidFlowBackground />

      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.3) 50%, rgba(9,9,11,0.8) 100%), linear-gradient(180deg, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0) 30%, rgba(9,9,11,0.95) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col items-center justify-between px-6 md:px-12 lg:flex-row lg:items-start lg:px-16">
        {/* LEFT: editorial copy */}
        <div className="relative z-20 flex w-full flex-col items-start pt-10 lg:w-1/2 lg:pt-32">
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 80, damping: 20 }}
            className="mb-8 flex items-center gap-3"
          >
            <span className="h-px w-8 bg-[#00FFFF]" />
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">Cozybytes Media</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.1 }}
            className="font-display text-[2.7rem] font-medium leading-[1.02] tracking-tight text-white sm:text-[3.6rem] md:text-[4.2rem] lg:text-[4.6rem]"
          >
            Website <br className="hidden lg:block" />
            Profesional. <br />
            <span className="text-[#00FFFF]">Tanpa Pusing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.2 }}
            className="mt-8 max-w-md text-lg font-normal leading-relaxed text-white/90 drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)] sm:text-xl"
          >
            Bikin calon pelanggan langsung percaya sejak buka halaman pertama. Website kamu cepat, rapi, dan gampang ditemukan di Google. Kebanyakan selesai dalam 3 hari.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 70, damping: 20, delay: 0.3 }}
            className="mt-12 flex flex-col items-start gap-4"
          >
            <div className="flex flex-wrap items-center gap-6">
              <motion.a
                href="https://wa.me/6285894514719"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                className="btn-primary text-sm tracking-wide shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,255,255,0.5)]"
              >
                Mulai Konsultasi
              </motion.a>
              <a
                href="#layanan"
                className="group flex items-center gap-2 text-sm font-medium uppercase tracking-wide text-zinc-300 transition-colors hover:text-white"
              >
                Lihat Layanan
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </div>
            <div className="text-xs font-medium tracking-wide text-zinc-500">
              <span className="font-mono font-bold text-white/60">15+</span> bisnis telah beralih ke Cozybytes bulan ini
            </div>
          </motion.div>
        </div>

        {/* RIGHT: interactive mockup */}
        <div
          className="pointer-events-none relative mt-24 h-[400px] w-full sm:h-[500px] lg:mt-0 lg:min-h-[600px] lg:w-1/2"
          style={{ perspective: '1200px' }}
        >
          {/* Laptop */}
          <motion.div
            initial={{ opacity: 0, x: 100, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, delay: 0.3 }}
            className="absolute -right-10 top-0 z-10 w-[120%] lg:-right-32 lg:top-20 lg:w-[140%]"
          >
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
                    <LiveBadge reduce={!!reduce} />
                  </div>

                  {/* Build progress bar */}
                  <BuildProgress reduce={!!reduce} />

                  {/* Content building in */}
                  <div className="flex flex-col gap-4 p-4 sm:gap-6 sm:p-6">
                    <div className="flex items-center justify-between">
                      <motion.div
                        initial={reduce ? false : { scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 0.8 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 16, delay: 0.7 }}
                        className="h-8 w-8 rounded-full bg-gradient-to-tr from-[#00FFFF] to-blue-500 blur-[2px] sm:h-12 sm:w-12"
                      />
                      <div className="flex gap-2 sm:gap-3">
                        {[0, 1].map((i) => (
                          <Bar key={i} reduce={!!reduce} delay={0.8 + i * 0.1} className="h-1.5 w-12 sm:h-2 sm:w-16" />
                        ))}
                      </div>
                    </div>

                    <div className="mt-2 flex gap-4 sm:mt-4 sm:gap-6">
                      <div className="flex w-1/3 flex-col gap-2 sm:gap-3">
                        <Bar reduce={!!reduce} delay={1.0} className="h-2 w-full sm:h-3" accent />
                        <Bar reduce={!!reduce} delay={1.1} className="h-2 w-3/4 sm:h-3" />
                        <Bar reduce={!!reduce} delay={1.2} className="h-2 w-5/6 sm:h-3" />
                        <motion.div
                          initial={reduce ? false : { opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 1.35, ease: EASE }}
                          className="mt-2 h-16 w-full rounded-xl border border-white/10 bg-zinc-900/50 sm:mt-4 sm:h-24"
                        />
                      </div>
                      <div className="flex flex-1 flex-col gap-3 sm:gap-4">
                        <motion.div
                          initial={reduce ? false : { opacity: 0, scale: 0.96 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.6, delay: 1.0, ease: EASE }}
                          className="relative h-24 w-full overflow-hidden rounded-2xl border border-white/5 bg-gradient-to-br from-zinc-800 to-zinc-900 sm:h-40"
                        >
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00FFFF]/10 to-transparent" />
                          {!reduce && (
                            <motion.div
                              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/[0.06] to-transparent"
                              animate={{ x: ['-120%', '320%'] }}
                              transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 1.4 }}
                            />
                          )}
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-1 h-2 rounded-b-xl border-t border-white/10 bg-zinc-800/50 sm:h-4" />
              </div>
            </motion.div>
          </motion.div>

          {/* Phone */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateZ: -10, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, rotateZ: -5, filter: 'blur(0px)' }}
            transition={{ type: 'spring', stiffness: 60, damping: 15, delay: 0.5 }}
            className="absolute -bottom-10 left-0 z-30 w-[110px] sm:-bottom-20 sm:w-[140px] lg:-left-12 lg:w-[180px]"
          >
            <motion.div style={{ x: phoneX, y: phoneY }}>
              <div
                className="liquid-glass rounded-[1.5rem] border border-white/10 p-1 backdrop-blur-3xl sm:rounded-[2rem] sm:p-1.5"
                style={{ boxShadow: '-10px 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.2)' }}
              >
                <div className="relative h-[220px] overflow-hidden rounded-[1.3rem] border border-zinc-800 bg-zinc-950 sm:h-[280px] sm:rounded-[1.7rem] lg:h-[360px]">
                  <div className="absolute inset-x-0 top-0 z-20 flex h-4 items-start justify-center pt-1 sm:h-6 sm:pt-2">
                    <div className="h-3 w-8 rounded-full bg-black sm:h-4 sm:w-12" />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-b from-[#00FFFF]/10 to-transparent" />
                  <div className="flex flex-col gap-2 p-3 pt-8 sm:gap-4 sm:p-4 sm:pt-10">
                    <motion.div
                      initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.9, ease: EASE }}
                      className="h-16 rounded-xl border border-white/5 bg-zinc-900 sm:h-24"
                    />
                    <Bar reduce={!!reduce} delay={1.05} className="h-2 w-3/4 sm:h-4" accent />
                    <Bar reduce={!!reduce} delay={1.15} className="h-1.5 w-1/2 sm:h-3" />
                    <div className="mt-1 grid grid-cols-2 gap-1.5 sm:mt-2 sm:gap-2">
                      {[0, 1].map((i) => (
                        <motion.div
                          key={i}
                          initial={reduce ? false : { opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.45, delay: 1.25 + i * 0.1, ease: EASE }}
                          className="h-10 rounded-lg border border-white/5 bg-zinc-900 sm:h-16"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
    <motion.div
      initial={reduce ? false : { scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      className={`origin-left rounded-full ${accent ? 'bg-[#00FFFF]/25' : 'bg-zinc-800'} ${className}`}
    />
  )
}

function BuildProgress({ reduce }: { reduce: boolean }) {
  return (
    <div className="absolute left-0 right-0 top-[41px] h-px bg-white/[0.04]">
      <motion.div
        className="h-full origin-left bg-[#00FFFF]"
        style={{ boxShadow: '0 0 8px rgba(0,255,255,0.6)' }}
        initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 1.3, delay: 0.4, ease: EASE }}
      />
    </div>
  )
}

function LiveBadge({ reduce }: { reduce: boolean }) {
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 16, delay: 1.7 }}
      className="flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-1.5 py-0.5"
    >
      <span className="relative flex h-1.5 w-1.5">
        {!reduce && (
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
        )}
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
      </span>
      <span className="font-mono text-[7px] font-semibold text-emerald-300">LIVE</span>
    </motion.div>
  )
}
