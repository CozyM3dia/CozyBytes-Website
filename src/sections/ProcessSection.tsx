import { useRef, useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion'
import { MessageCircle, Palette, CheckCircle, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Ngobrol Santai',
    desc: 'Ceritakan kebutuhan bisnis kamu via WhatsApp. Kita diskusi santai tanpa tekanan.',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Desain & Coding',
    desc: 'Tim kami langsung action: desain mockup, revisi, dan coding dengan teknologi modern.',
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Review Bebas Pusing',
    desc: 'Kamu review hasilnya, request perubahan sesuka hati. Revisi tidak dibatasi.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Go Live!',
    desc: 'Website kamu tayang! Kami bantu deploy, setting domain, dan pastikan semua berjalan lancar.',
  },
]

const STEP_DURATION = 5200 // ms per step before auto-advance

const EASE = [0.22, 1, 0.36, 1] as const

/* ============ Mini scenes (the animated stage content) ============ */

function ChatScene({ animate }: { animate: boolean }) {
  const bubbles = [
    { side: 'in', text: 'Halo, saya mau bikin website buat toko saya' },
    { side: 'out', text: 'Siap! Boleh cerita jualannya apa aja?' },
    { side: 'in', text: 'Kopi sama pastry. Pengen yang simpel tapi premium' },
  ]
  return (
    <div className="flex h-full flex-col justify-end gap-2.5 p-6 md:p-8">
      {bubbles.map((b, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, y: 14, scale: 0.96 } : false}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 + i * 0.55, ease: EASE }}
          className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-[13px] leading-snug ${
            b.side === 'out'
              ? 'self-end rounded-br-md bg-[#00FFFF] text-black'
              : 'self-start rounded-bl-md bg-white/[0.07] text-white/85'
          }`}
        >
          {b.text}
        </motion.div>
      ))}
      <motion.div
        initial={animate ? { opacity: 0 } : false}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.1, duration: 0.4 }}
        className="mt-1 flex items-center gap-1 self-start rounded-full bg-white/[0.05] px-3 py-2"
      >
        {[0, 1, 2].map((d) => (
          <motion.span
            key={d}
            className="h-1.5 w-1.5 rounded-full bg-white/40"
            animate={animate ? { opacity: [0.25, 1, 0.25] } : {}}
            transition={{ duration: 1.1, repeat: Infinity, delay: d * 0.18 }}
          />
        ))}
      </motion.div>
    </div>
  )
}

function DesignScene({ animate }: { animate: boolean }) {
  const bars = [
    { w: '70%', accent: true },
    { w: '90%', accent: false },
    { w: '55%', accent: false },
  ]
  return (
    <div className="flex h-full flex-col p-6 md:p-8">
      <div className="flex items-center gap-2 border-b border-white/[0.07] pb-3">
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        <div className="ml-3 flex h-5 flex-1 items-center rounded bg-white/[0.04] px-2.5">
          <span className="font-mono text-[10px] text-white/35">cozybytes.dev</span>
        </div>
      </div>
      <div className="flex flex-1 gap-4 pt-5">
        <div className="flex w-1/3 flex-col gap-2.5">
          {bars.map((b, i) => (
            <motion.div
              key={i}
              initial={animate ? { scaleX: 0 } : false}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.18, ease: EASE }}
              className={`h-2.5 origin-left rounded-full ${b.accent ? 'bg-[#00FFFF]/70' : 'bg-white/12'}`}
              style={{ width: b.w }}
            />
          ))}
          <motion.div
            initial={animate ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.95, ease: EASE }}
            className="mt-2 h-16 rounded-lg border border-white/[0.08] bg-white/[0.02]"
          />
        </div>
        <motion.div
          initial={animate ? { opacity: 0, scale: 0.97 } : false}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.5, ease: EASE }}
          className="relative flex-1 overflow-hidden rounded-xl border border-white/[0.08] bg-gradient-to-br from-[#00FFFF]/[0.06] to-transparent"
        >
          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00FFFF]/10 to-transparent" />
          <motion.span
            className="absolute bottom-4 left-4 h-4 w-[2px] bg-[#00FFFF]"
            animate={animate ? { opacity: [1, 0, 1] } : {}}
            transition={{ duration: 1, repeat: Infinity }}
          />
        </motion.div>
      </div>
    </div>
  )
}

function ReviewScene({ animate }: { animate: boolean }) {
  const items = ['Layout responsif di HP', 'Kecepatan loading', 'Teks penawaran', 'Tombol WhatsApp aktif']
  return (
    <div className="flex h-full flex-col justify-center gap-3 p-6 md:p-8">
      {items.map((label, i) => (
        <motion.div
          key={i}
          initial={animate ? { opacity: 0, x: -16 } : false}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.3 + i * 0.45, ease: EASE }}
          className="flex items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4 py-3"
        >
          <motion.span
            initial={animate ? { scale: 0 } : false}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 320, damping: 18, delay: 0.55 + i * 0.45 }}
            className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00FFFF] text-black"
          >
            <CheckCircle className="h-4 w-4" strokeWidth={2.5} />
          </motion.span>
          <span className="text-[13px] text-white/75">{label}</span>
        </motion.div>
      ))}
    </div>
  )
}

function LaunchScene({ animate }: { animate: boolean }) {
  const [pct, setPct] = useState(animate ? 0 : 100)
  useEffect(() => {
    if (!animate) { setPct(100); return }
    setPct(0)
    let raf: number
    const start = performance.now()
    const dur = 1600
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1)
      setPct(Math.round((1 - Math.pow(1 - p, 3)) * 100))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    const t = setTimeout(() => { raf = requestAnimationFrame(tick) }, 350)
    return () => { clearTimeout(t); cancelAnimationFrame(raf) }
  }, [animate])

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 p-6 md:p-8">
      <motion.div
        initial={animate ? { y: 6 } : false}
        animate={animate ? { y: [-4, 4, -4] } : {}}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative flex h-16 w-16 items-center justify-center rounded-2xl border border-[#00FFFF]/25 bg-[#00FFFF]/10"
      >
        <Rocket className="h-7 w-7 text-[#00FFFF]" />
        <div className="absolute -inset-3 -z-10 rounded-full bg-[#00FFFF]/15 blur-2xl" />
      </motion.div>

      <div className="w-full max-w-[260px]">
        <div className="mb-2 flex items-center justify-between font-mono text-[11px]">
          <span className="text-white/40">deploying...</span>
          <span className="text-[#00FFFF]">{pct}%</span>
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-white/[0.07]">
          <div
            className="h-full rounded-full bg-[#00FFFF] shadow-[0_0_12px_rgba(0,255,255,0.6)] transition-[width] duration-100"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      <AnimatePresence>
        {pct >= 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: 'spring', stiffness: 300, damping: 16 }}
            className="flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-4 py-2"
          >
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-mono text-xs font-semibold text-emerald-300">cozybytes.id · LIVE</span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

const scenes = [ChatScene, DesignScene, ReviewScene, LaunchScene]

/* ============ Section ============ */

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0) // 0..1 of current step

  const select = useCallback((i: number) => {
    setActive(i)
    setProgress(0)
  }, [])

  // Auto-advance driven by rAF (smooth ring), pauses on hover, off when reduced-motion or out of view.
  useEffect(() => {
    if (reduce || !inView || paused) return
    let raf: number
    let start = performance.now()
    const loop = (now: number) => {
      const p = Math.min((now - start) / STEP_DURATION, 1)
      setProgress(p)
      if (p >= 1) {
        setActive((a) => (a + 1) % steps.length)
        start = now
        setProgress(0)
      }
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduce, inView, paused, active])

  const Scene = scenes[active]

  return (
    <section id="cara-kerja" ref={sectionRef} className="relative overflow-hidden bg-zinc-950 py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 50% 45% at 80% 8%, rgba(0,255,255,0.06) 0%, transparent 60%)' }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="mb-14 flex flex-wrap items-end justify-between gap-6 md:mb-20"
        >
          <div>
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Cara Kerja
            </span>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
              Empat langkah.
              <br />
              <span className="text-[#00FFFF]">Tanpa ribet.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/45">
            Dari chat pertama sampai website tayang, kamu selalu tahu prosesnya sampai di mana.
          </p>
        </motion.div>

        {/* Console: step list + live stage */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
          className="grid gap-5 lg:grid-cols-12 lg:gap-6"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          {/* Step list */}
          <div className="flex flex-col gap-2.5 lg:col-span-5">
            {steps.map((step, i) => {
              const Icon = step.icon
              const isActive = active === i
              return (
                <button
                  key={step.num}
                  onClick={() => select(i)}
                  aria-pressed={isActive}
                  className={`group relative overflow-hidden rounded-2xl border p-5 text-left transition-colors duration-300 ${
                    isActive
                      ? 'border-[#00FFFF]/30 bg-[#00FFFF]/[0.04]'
                      : 'border-white/[0.07] bg-white/[0.015] hover:border-white/15 hover:bg-white/[0.03]'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-colors duration-300 ${
                        isActive ? 'border-[#00FFFF]/40 bg-[#00FFFF]/10' : 'border-white/10 bg-white/[0.03]'
                      }`}
                    >
                      <Icon className={`h-5 w-5 transition-colors duration-300 ${isActive ? 'text-[#00FFFF]' : 'text-white/45'}`} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline gap-2.5">
                        <span className={`font-mono text-[11px] font-bold transition-colors duration-300 ${isActive ? 'text-[#00FFFF]/70' : 'text-white/25'}`}>
                          {step.num}
                        </span>
                        <h3 className={`font-display text-lg font-medium tracking-tight transition-colors duration-300 ${isActive ? 'text-white' : 'text-white/60'}`}>
                          {step.title}
                        </h3>
                      </div>
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: EASE }}
                            className="overflow-hidden text-sm leading-relaxed text-white/55"
                          >
                            <span className="mt-1.5 block">{step.desc}</span>
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Auto-advance progress bar (active only) */}
                  {isActive && !reduce && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-white/5">
                      <div
                        className="h-full bg-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.5)]"
                        style={{ width: `${progress * 100}%` }}
                      />
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {/* Live stage */}
          <div className="lg:col-span-7">
            <div className="relative h-[340px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#0a0a0c] shadow-[0_30px_80px_rgba(0,0,0,0.5)] sm:h-[400px]">
              <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#00FFFF]/[0.06] blur-3xl" />
              <AnimatePresence>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? {} : { opacity: 0, y: -10 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="absolute inset-0"
                >
                  <Scene animate={!reduce} />
                </motion.div>
              </AnimatePresence>

              {/* Stage step badge */}
              <div className="pointer-events-none absolute right-4 top-4 font-mono text-[11px] text-white/30">
                {steps[active].num} / 04
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
