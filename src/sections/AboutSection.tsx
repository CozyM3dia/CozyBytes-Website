import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Rocket, Clock, Heart } from 'lucide-react'
import { Crosshair } from '../components/atmosphere'

const EASE = [0.22, 1, 0.36, 1] as const

const metrics = [
  {
    value: 15,
    suffix: '+',
    label: 'Proyek Selesai',
    proof: 'Landing page, company profile, toko online, sampai custom web.',
    icon: Rocket,
    featured: true,
  },
  {
    value: 3,
    suffix: ' Hari',
    label: 'Rata-rata Delivery',
    proof: 'Untuk paket Basic & Pro. Premium 10 sampai 14 hari.',
    icon: Clock,
  },
  {
    value: 100,
    suffix: '%',
    label: 'Klien Puas',
    proof: 'Revisi jalan terus sampai kamu benar-benar oke.',
    icon: Heart,
  },
]

// True when hover-reveal is a bad fit: touch devices, or any viewport below lg.
// Keeps the proof context visible where there is no reliable hover.
function useNoHover() {
  const [noHover, setNoHover] = useState(false)
  useEffect(() => {
    const mq = window.matchMedia('(hover: none), (pointer: coarse), (max-width: 1023px)')
    const update = () => setNoHover(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])
  return noHover
}

function AnimatedCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const reduce = useReducedMotion()
  const [count, setCount] = useState(reduce ? target : 0)

  useEffect(() => {
    if (!started) return
    let frame: number
    if (reduce) {
      frame = requestAnimationFrame(() => setCount(target))
      return () => cancelAnimationFrame(frame)
    }
    const duration = 1500
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }
    frame = requestAnimationFrame(step)
    return () => cancelAnimationFrame(frame)
  }, [started, target, reduce])

  return <>{count}{suffix}</>
}

function MetricRow({
  metric,
  index,
  started,
}: {
  metric: (typeof metrics)[number]
  index: number
  started: boolean
}) {
  const Icon = metric.icon
  const [hovered, setHovered] = useState(false)
  const reduce = useReducedMotion()
  const noHover = useNoHover()
  // No reliable hover (touch / small screens): proof + underline stay open so context is never hidden.
  const showProof = hovered || reduce || noHover

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={started ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.25 + index * 0.12, ease: EASE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      tabIndex={0}
      className="group relative cursor-default rounded-2xl px-5 py-6 outline-none transition-colors duration-300 hover:bg-white/[0.02] focus-visible:bg-white/[0.02]"
    >
      <div className="flex items-center gap-2.5">
        <Icon
          className={`h-3.5 w-3.5 transition-colors duration-300 ${hovered ? 'text-[#00FFFF]' : 'text-[#00FFFF]/45'}`}
          strokeWidth={1.5}
        />
        <span className="text-[10px] font-semibold uppercase tracking-[0.25em] text-white/35 transition-colors duration-300 group-hover:text-white/55">
          {metric.label}
        </span>
      </div>

      <div className="mt-3 flex items-end gap-4">
        <motion.span
          animate={hovered && !reduce ? { scale: 1.03 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 260, damping: 18 }}
          className={`font-display inline-block origin-left font-medium leading-[0.85] tracking-tight text-white ${
            metric.featured
              ? 'text-[5.5rem] sm:text-[7rem] lg:text-[8.5rem]'
              : 'text-[4rem] sm:text-[5rem] lg:text-[5.5rem]'
          }`}
        >
          <AnimatedCounter target={metric.value} suffix={metric.suffix} started={started} />
        </motion.span>
      </div>

      {/* Underline draws on hover */}
      <div className="mt-3 h-px w-full bg-white/[0.07]">
        <motion.div
          className="h-full origin-left bg-[#00FFFF]"
          style={{ boxShadow: '0 0 8px rgba(0,255,255,0.5)' }}
          animate={{ scaleX: showProof ? 1 : 0 }}
          transition={{ duration: 0.5, ease: EASE }}
        />
      </div>

      {/* Proof reveals on hover (grid-rows transition, no layout jank) */}
      <div
        className="grid transition-[grid-template-rows] duration-500 ease-out"
        style={{ gridTemplateRows: showProof ? '1fr' : '0fr' }}
      >
        <div className="overflow-hidden">
          <p className="pt-3 text-sm leading-relaxed text-white/55">{metric.proof}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const reduce = useReducedMotion()

  return (
    <section id="tentang" ref={ref} className="relative overflow-hidden py-28 md:py-36">
      <Crosshair className="absolute right-[8%] top-[16%]" />
      {/* Atmosphere */}
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(ellipse 55% 50% at 75% 55%, rgba(0,255,255,0.06) 0%, transparent 70%)' }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.4]"
        aria-hidden="true"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 70% 50%, black 5%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 70% 50%, black 5%, transparent 75%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left: pain statement */}
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-5"
          >
            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Kami paham susahnya mencari
              <br />
              <span className="text-[#00FFFF]">jasa web yang bisa diandalkan.</span>
            </h2>
            <p className="mt-6 max-w-md text-base leading-relaxed text-white/60">
              Banyak pemilik usaha kecewa karena dapat website lambat dengan desain seadanya. Di Cozybytes, proyekmu kami kerjakan serius: tampilan rapi, loading cepat, dan struktur yang jelas.
            </p>
          </motion.div>

          {/* Right: interactive metrics (featured + 2 secondary) */}
          <div className="relative lg:col-span-7">
            {/* Vertical guide line that draws in */}
            <motion.div
              className="absolute left-0 top-2 hidden w-px origin-top bg-gradient-to-b from-[#00FFFF]/40 to-transparent sm:block"
              style={{ bottom: '0.5rem' }}
              initial={reduce ? false : { scaleY: 0 }}
              animate={inView ? { scaleY: 1 } : {}}
              transition={{ duration: 1, delay: 0.2, ease: EASE }}
            />

            <div className="sm:pl-8">
              {/* Featured metric */}
              <MetricRow metric={metrics[0]} index={0} started={inView} />

              {/* Two secondary, side by side */}
              <div className="mt-2 grid gap-2 border-t border-white/[0.06] pt-2 sm:grid-cols-2">
                <MetricRow metric={metrics[1]} index={1} started={inView} />
                <MetricRow metric={metrics[2]} index={2} started={inView} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
