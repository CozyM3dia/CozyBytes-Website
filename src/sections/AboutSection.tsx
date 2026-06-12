import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, Clock, Heart } from 'lucide-react'

const stats = [
  { value: 15, suffix: '+', label: 'Proyek Selesai', icon: Rocket },
  { value: 3, suffix: ' Hari', label: 'Rata-rata Delivery', icon: Clock },
  { value: 100, suffix: '%', label: 'Klien Puas', icon: Heart },
]

function AnimatedCounter({ target, suffix, started }: { target: number; suffix: string; started: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!started) return
    let frame: number
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
  }, [started, target])

  return <>{count}{suffix}</>
}

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative py-28 md:py-36 overflow-hidden"
    >
      {/* Atmospheric background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 65%, rgba(0,255,255,0.05) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-display text-4xl md:text-5xl mb-6 font-medium leading-[1.08] tracking-tight">
            Kami paham susahnya mencari
            <br />
            <span className="text-[#00FFFF]">jasa web yang bisa diandalkan.</span>
          </h2>
          <p className="text-white/60 text-base leading-relaxed max-w-2xl">
            Banyak pemilik usaha kecewa karena mendapat website lambat dengan desain seadanya.
            Di Cozybytes, kami mengerjakan proyek Anda secara serius. Tampilannya rapi, loading cepat,
            dan strukturnya jelas agar pengunjung langsung memahami layanan yang Anda jual.
          </p>
        </motion.div>

        {/* Stats strip */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
                whileHover={{ y: -3 }}
                className={`relative text-center py-10 md:py-0 md:px-6 cursor-default ${
                  i > 0 ? 'border-t md:border-t-0 md:border-l border-white/[0.06]' : ''
                }`}
              >
                {/* Category label */}
                <div className="flex items-center justify-center gap-2 mb-5">
                  <Icon className="w-3.5 h-3.5 text-[#00FFFF]/50" strokeWidth={1.5} />
                  <span className="text-[10px] font-semibold tracking-[0.25em] uppercase text-white/35">
                    {stat.label}
                  </span>
                </div>

                {/* The number */}
                <div className="relative">
                  <span className="font-display inline-block text-[4.5rem] font-medium leading-[0.9] tracking-tight text-white sm:text-[5.5rem] md:text-[4.5rem] lg:text-[6rem]">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} started={inView} />
                  </span>

                  {/* Entry glow pulse */}
                  {inView && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.3 }}
                      animate={{ opacity: [0, 0.25, 0], scale: [0.3, 1.8, 2.5] }}
                      transition={{ duration: 2, delay: 0.4 + i * 0.15, ease: 'easeOut' }}
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-[#00FFFF] blur-3xl pointer-events-none"
                    />
                  )}
                </div>

                {/* Accent underline */}
                <motion.div
                  initial={{ scaleX: 0 }}
                  animate={inView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                  className="mx-auto mt-6 h-px w-16 origin-center"
                  style={{ background: 'linear-gradient(to right, transparent, rgba(0,255,255,0.4), transparent)' }}
                />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
