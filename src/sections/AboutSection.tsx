import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Rocket, Clock, Heart } from 'lucide-react'

const stats = [
  { value: 15, suffix: '+', label: 'Proyek Selesai', icon: Rocket, color: '#00FFFF' },
  { value: 3, suffix: ' Hari', label: 'Rata-rata Delivery', icon: Clock, color: '#00FFFF' },
  { value: 100, suffix: '%', label: 'Klien Puas', icon: Heart, color: '#00FFFF' },
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
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative py-24 overflow-hidden"
      style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(0,255,255,0.04) 0%, transparent 70%)' }}
    >
      <div className="max-w-5xl mx-auto px-6">
        {/* Top border accent */}
        <div className="h-px mb-12" style={{ background: 'linear-gradient(to right, transparent, rgba(0,255,255,0.2), transparent)' }} />

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2
            className="text-4xl md:text-5xl mb-6 leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Kami percaya website bukan{' '}
            <em className="text-white/30 italic">sekadar</em> tampilan —{' '}
            <em className="text-[#00FFFF] italic">tapi aset bisnis</em> yang bekerja 24 jam.
          </h2>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-12">
            Cozybytes Media adalah agensi web development yang fokus membantu UMKM dan bisnis lokal Indonesia untuk hadir secara profesional di dunia digital, dengan proses yang mudah dan harga yang terjangkau.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {stats.map(({ value, suffix, label, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: 'spring', bounce: 0.3 }}
              whileHover={{
                scale: 1.05,
                y: -4,
                boxShadow: '0 12px 40px rgba(0,255,255,0.2), 0 0 20px rgba(0,255,255,0.1)',
              }}
              className="group relative rounded-2xl p-px cursor-pointer overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(0,255,255,0.3), rgba(0,255,255,0.05), rgba(0,255,255,0.15))',
              }}
            >
              <div className="relative rounded-2xl bg-black/80 backdrop-blur-xl px-6 py-8 text-center overflow-hidden">
                {/* Background glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 30%, rgba(0,255,255,0.08) 0%, transparent 70%)',
                  }}
                />

                {/* Icon */}
                <motion.div
                  className="relative mx-auto mb-4 w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'rgba(0,255,255,0.08)', border: '1px solid rgba(0,255,255,0.15)' }}
                  whileHover={{ rotate: 8 }}
                >
                  <Icon className="w-5 h-5 text-[#00FFFF]" />
                </motion.div>

                {/* Number */}
                <div className="relative text-4xl md:text-5xl font-bold text-[#00FFFF] mb-2 tracking-tight">
                  <AnimatedCounter target={value} suffix={suffix} started={inView} />
                </div>

                {/* Label */}
                <div className="relative text-white/50 text-sm font-medium tracking-wide uppercase">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
