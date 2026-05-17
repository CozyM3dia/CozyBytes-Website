import { motion } from 'framer-motion'
import { Zap, Smile, Monitor, MapPin } from 'lucide-react'
import FluidFlowBackground from '../components/FluidFlowBackground'

const features = [
  { icon: Zap, label: 'Super Cepat', desc: '3 hari rata-rata' },
  { icon: Smile, label: 'Proses Nyaman', desc: 'Tanpa ribet' },
  { icon: Monitor, label: 'Responsif & Modern', desc: 'Mobile-first' },
  { icon: MapPin, label: 'Fokus Lokal', desc: 'Tim Indonesia' },
]

export default function HeroSection() {
  return (
    <section
      id="beranda"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-24 pb-16"
      style={{
        background: 'radial-gradient(ellipse 80% 60% at 50% -10%, rgba(0,255,255,0.18) 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(13,27,61,0.6) 0%, transparent 70%), #000',
      }}
    >
      <FluidFlowBackground />

      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.22) 45%, #000 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-5xl mx-auto px-5 sm:px-6 flex flex-col items-center text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="cyan-glass rounded-full px-3 sm:px-4 py-2 mb-6 inline-flex items-center gap-2 max-w-full"
        >
          <span className="w-2 h-2 rounded-full bg-[#00FFFF] inline-block animate-pulse flex-shrink-0" />
          <span className="text-[#00FFFF] text-[10px] sm:text-xs font-semibold tracking-wider uppercase truncate">Pembuatan Website Super Cepat</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-[1.65rem] sm:text-5xl md:text-7xl font-serif leading-tight mb-6"
          style={{ fontFamily: '"Instrument Serif", serif' }}
        >
          Website Bisnis yang{' '}
          <em className="text-[#00FFFF] not-italic">Cepat,</em>
          <br />
          <em className="text-[#00FFFF] not-italic">Nyaman,</em> dan{' '}
          <span className="text-white">Modern</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-white/60 text-sm sm:text-lg max-w-xl mb-8 leading-relaxed"
        >
          Kami bantu bisnis lokal Indonesia tampil profesional di dunia digital — mulai dari landing page hingga toko online.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center w-full sm:w-auto mb-16 px-4 sm:px-0"
        >
          <a
            href="https://wa.me/6285894514719"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary w-full sm:w-auto text-center"
          >
            Mulai Sekarang →
          </a>
        </motion.div>

        {/* Device mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative flex items-end justify-center gap-2 sm:gap-4 mb-16 w-full"
          style={{ perspective: '1000px' }}
        >
          {/* Laptop */}
          <div
            className="relative w-[240px] sm:w-[340px]"
            style={{ transform: 'rotateX(6deg)' }}
          >
            <div className="liquid-glass rounded-xl p-1 w-full" style={{ boxShadow: '0 0 60px rgba(0,255,255,0.1)' }}>
              {/* Screen */}
              <div className="rounded-lg overflow-hidden" style={{ background: 'rgba(0,255,255,0.03)', border: '1px solid rgba(0,255,255,0.2)', aspectRatio: '340/200' }}>
                {/* Mock UI */}
                <div className="flex items-center gap-1 px-3 py-2" style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div className="w-2 h-2 rounded-full bg-red-500/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500/60" />
                  <div className="w-2 h-2 rounded-full bg-green-500/60" />
                  <div className="flex-1 mx-3 rounded-full h-3" style={{ background: 'rgba(255,255,255,0.05)' }} />
                </div>
                <div className="p-4 flex flex-col gap-2">
                  <div className="h-4 rounded-full w-3/4" style={{ background: 'rgba(0,255,255,0.2)' }} />
                  <div className="h-3 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.1)' }} />
                  <div className="h-3 rounded-full w-2/3" style={{ background: 'rgba(255,255,255,0.06)' }} />
                  <div className="mt-2 h-7 rounded-full w-1/3" style={{ background: 'rgba(0,255,255,0.25)' }} />
                </div>
              </div>
              {/* Keyboard base */}
              <div className="h-3 rounded-b-lg" style={{ background: 'rgba(255,255,255,0.03)' }} />
            </div>
            <div className="h-2 rounded-full mx-8" style={{ background: 'rgba(255,255,255,0.05)' }} />
          </div>

          {/* Phone */}
          <div className="hidden sm:block liquid-glass rounded-2xl p-1 mb-2" style={{ width: 90, boxShadow: '0 0 40px rgba(0,255,255,0.08)' }}>
            <div className="rounded-xl overflow-hidden" style={{ background: 'rgba(0,255,255,0.03)', border: '1px solid rgba(0,255,255,0.2)', height: 160 }}>
              <div className="flex justify-center pt-2 pb-1">
                <div className="w-8 h-1 rounded-full" style={{ background: 'rgba(255,255,255,0.2)' }} />
              </div>
              <div className="px-2 flex flex-col gap-1.5">
                <div className="h-2.5 rounded-full" style={{ background: 'rgba(0,255,255,0.2)' }} />
                <div className="h-2 rounded-full w-3/4" style={{ background: 'rgba(255,255,255,0.1)' }} />
                <div className="h-2 rounded-full w-1/2" style={{ background: 'rgba(255,255,255,0.06)' }} />
                <div className="mt-1 h-5 rounded-full" style={{ background: 'rgba(0,255,255,0.2)' }} />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Feature bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-3xl"
        >
          {features.map(({ icon: Icon, label, desc }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
              whileHover={{
                scale: 1.08,
                y: -6,
                boxShadow: '0 8px 30px rgba(0,255,255,0.25), 0 0 15px rgba(0,255,255,0.15)',
              }}
              className="cyan-glass rounded-xl px-3 sm:px-4 py-3 flex items-center gap-2 sm:gap-3 cursor-pointer transition-colors min-w-0"
              style={{ willChange: 'transform' }}
            >
              <motion.div
                className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: 'rgba(0,255,255,0.1)' }}
                whileHover={{ rotate: 10, scale: 1.1 }}
              >
                <Icon className="w-4 h-4 text-[#00FFFF]" />
              </motion.div>
              <div>
                <div className="text-white text-xs font-semibold">{label}</div>
                <div className="text-white/50 text-xs">{desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
