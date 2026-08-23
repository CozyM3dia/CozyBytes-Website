import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { Users, Layers, Target, Clock, type LucideIcon } from 'lucide-react'
import { EASE } from './shared'

interface Stat {
  value: number
  pad: boolean
  suffix: string
  label: string
  Icon: LucideIcon
}

const STATS: Stat[] = [
  { value: 3, pad: true, suffix: '', label: 'Founder, satu garis visi', Icon: Users },
  { value: 5, pad: true, suffix: '', label: 'Layanan inti end-to-end', Icon: Layers },
  { value: 100, pad: false, suffix: '%', label: 'Fokus pada konversi', Icon: Target },
  { value: 24, pad: false, suffix: '/7', label: 'Aset bekerja untukmu', Icon: Clock },
]

function useCountUp(target: number, active: boolean, durationMs = 1600, reduce = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / durationMs)
      setVal(Math.round(target * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, durationMs, reduce])
  return reduce ? target : val
}

function StatCell({ stat, index, active }: { stat: Stat; index: number; active: boolean }) {
  const reduce = useReducedMotion() ?? false
  const val = useCountUp(stat.value, active, 1600, reduce)
  const display = stat.pad ? String(val).padStart(2, '0') : String(val)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: EASE }}
      className="bg-zinc-950 p-8 md:p-12"
    >
      <stat.Icon className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} />
      <div
        className="pt-6 font-serif text-6xl leading-none md:text-7xl"
        style={{
          background: 'linear-gradient(180deg, #FFFFFF 30%, rgba(0,255,255,0.65) 100%)',
          WebkitBackgroundClip: 'text',
          backgroundClip: 'text',
          color: 'transparent',
        }}
      >
        {display}
        {stat.suffix && (
          <span className="align-baseline text-4xl text-[#00FFFF] md:text-5xl">{stat.suffix}</span>
        )}
      </div>
      <p className="mt-4 text-sm text-white/40">{stat.label}</p>
      <div className="mt-5 h-px w-16 bg-gradient-to-r from-[#00FFFF]/60 to-transparent" />
    </motion.div>
  )
}

export default function StatsBand() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} className="relative px-6 py-20 md:py-28">
      <div className="mx-auto max-w-6xl">
        <div className="grid grid-cols-2 gap-px border border-white/[0.07] bg-white/[0.07] lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatCell key={stat.label} stat={stat} index={i} active={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
