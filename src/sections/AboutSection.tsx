import { useRef, useEffect, useState } from 'react'
import { motion, useInView, useMotionValue, useMotionTemplate } from 'framer-motion'
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

function StatCard({ value, suffix, label, icon: Icon, i, inView }: { value: number; suffix: string; label: string; icon: any; i: number; inView: boolean }) {
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  return (
    <motion.div
      key={label}
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: 0.2 + i * 0.15, type: 'spring', bounce: 0.3 }}
      onMouseMove={onMouseMove}
      whileHover={{
        scale: 1.03,
        y: -4,
        boxShadow: '0 20px 40px rgba(0,255,255,0.1), 0 0 20px rgba(0,255,255,0.05)',
      }}
      className="group relative rounded-2xl p-px cursor-pointer overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(0,255,255,0.4), rgba(0,255,255,0.05), rgba(0,255,255,0.2))',
      }}
    >
      {/* Spotlight overlay */}
      <motion.div
        className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{
          background: useMotionTemplate`radial-gradient(350px circle at ${mouseX}px ${mouseY}px, rgba(0,255,255,0.15), transparent 80%)`,
        }}
      />
      
      <div className="relative z-10 rounded-2xl bg-zinc-950/90 backdrop-blur-xl px-6 py-10 text-center overflow-hidden h-full flex flex-col justify-between min-h-[220px]">
        {/* Background glow base */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background: 'radial-gradient(circle at 50% 30%, rgba(0,255,255,0.1) 0%, transparent 70%)',
          }}
        />

        {/* Icon */}
        <motion.div
          className="relative mx-auto mb-4 w-14 h-14 rounded-2xl flex items-center justify-center"
          style={{ background: 'rgba(0,255,255,0.06)', border: '1px solid rgba(0,255,255,0.2)' }}
          whileHover={{ rotate: 12, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Icon className="w-6 h-6 text-[#00FFFF]" />
        </motion.div>

        <div>
          {/* Number */}
          <div className="relative text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-white to-[#00FFFF] mb-3 tracking-tight">
            <AnimatedCounter target={value} suffix={suffix} started={inView} />
          </div>

          {/* Label */}
          <div className="relative text-white/50 text-xs font-semibold tracking-widest uppercase">
            {label}
          </div>
        </div>
      </div>
    </motion.div>
  )
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
            Kami Memahami{' '}
            <em className="text-white/30 italic">Kesulitan</em> Mencari{' '}
            <em className="text-[#00FFFF] italic">Jasa Web</em> yang Dapat Diandalkan.
          </h2>

          <p className="text-white/60 text-base leading-relaxed max-w-2xl mb-12">
            Banyak pemilik usaha kecewa karena mendapat website lambat dengan desain seadanya. Di Cozybytes, kami mengerjakan proyek Anda secara serius. Tampilannya rapi, loading cepat, dan strukturnya jelas agar pengunjung langsung memahami layanan yang Anda jual.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, i) => (
            <StatCard key={stat.label} {...stat} i={i} inView={inView} />
          ))}
        </div>
      </div>
    </section>
  )
}
