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
      className="relative min-h-screen flex items-center overflow-hidden pt-20 pb-16"
      style={{
        background: 'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08) 0%, transparent 60%), #000',
      }}
    >
      <FluidFlowBackground />

      {/* Deep vignette for atmosphere */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'linear-gradient(90deg, rgba(9,9,11,0.95) 0%, rgba(9,9,11,0.3) 50%, rgba(9,9,11,0.8) 100%), linear-gradient(180deg, rgba(9,9,11,0.9) 0%, rgba(9,9,11,0) 30%, rgba(9,9,11,0.95) 100%)',
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-16 flex flex-col lg:flex-row items-center lg:items-start justify-between">
        
        {/* LEFT COLUMN: Editorial Typography */}
        <div className="w-full lg:w-1/2 pt-10 lg:pt-32 flex flex-col items-start relative z-20">
          
          <motion.div
            initial={{ opacity: 0, x: -30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 80, damping: 20 }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="w-8 h-[1px] bg-[#00FFFF]" />
            <span className="text-[#00FFFF] text-xs font-semibold tracking-[0.2em] uppercase">Cozybytes Media</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.1 }}
            className="text-[3.2rem] leading-[1.05] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[6.2rem] font-serif text-white tracking-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Website <br className="hidden lg:block"/>
            Profesional. <br/>
            <span className="text-[#00FFFF] italic pr-4">Tanpa Pusing.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.2 }}
            className="text-zinc-400 text-lg sm:text-xl max-w-md mt-8 leading-relaxed font-light"
          >
            Calon pelanggan sering ragu jika bisnis Anda tidak memiliki tampilan digital yang meyakinkan. Cozybytes membantu Anda membangun website yang profesional dan cepat diakses, tanpa perlu repot mengurus teknis. Semua selesai dalam 3 hari.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 70, damping: 20, delay: 0.3 }}
            className="mt-12 flex flex-col items-start gap-4"
          >
            <div className="flex flex-wrap items-center gap-6">
              <a
                href="https://wa.me/6285894514719"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-sm tracking-wide shadow-[0_0_40px_rgba(0,255,255,0.3)] hover:shadow-[0_0_60px_rgba(0,255,255,0.5)]"
              >
                Mulai Konsultasi
              </a>
              <a href="#layanan" className="text-zinc-300 hover:text-white transition-colors text-sm font-medium tracking-wide uppercase group flex items-center gap-2">
                Lihat Layanan 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
            <div className="text-zinc-500 text-xs font-medium tracking-wide flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
              15+ Bisnis telah beralih ke Cozybytes bulan ini
            </div>
          </motion.div>
        </div>

        {/* RIGHT COLUMN: Overlapping Asymmetrical Mockup */}
        <div className="w-full lg:w-1/2 mt-24 lg:mt-0 relative h-[400px] sm:h-[500px] lg:h-auto pointer-events-none">
          <motion.div
            initial={{ opacity: 0, x: 100, rotateY: 20, filter: 'blur(20px)' }}
            animate={{ opacity: 1, x: 0, rotateY: 0, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 50, damping: 20, delay: 0.3 }}
            className="absolute top-0 lg:top-20 -right-10 lg:-right-32 w-[120%] lg:w-[140%] z-10"
            style={{ perspective: '1200px' }}
          >
            <div className="relative w-full" style={{ transform: 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)' }}>
              {/* Laptop Glass Body */}
              <div className="liquid-glass rounded-2xl p-2 w-full backdrop-blur-2xl border border-white/5" style={{ boxShadow: '-20px 40px 100px rgba(0,255,255,0.1)' }}>
                {/* Screen */}
                <div className="rounded-xl overflow-hidden relative" style={{ background: 'rgba(9,9,11,0.9)', border: '1px solid rgba(0,255,255,0.3)', aspectRatio: '16/10' }}>
                  
                  <div className="absolute inset-0 bg-gradient-to-br from-[#00FFFF]/10 to-transparent opacity-50" />
                  
                  {/* Mock UI Editor / Dashboard */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5 bg-black/40">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                      <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    </div>
                    <div className="mx-4 flex-1 h-4 rounded bg-zinc-800/50 border border-white/5 flex items-center px-3">
                      <span className="text-[8px] text-zinc-500 font-mono">cozybytes.media/build</span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-6 flex flex-col gap-4 sm:gap-6">
                    {/* Header mock */}
                    <div className="flex justify-between items-center">
                      <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-gradient-to-tr from-[#00FFFF] to-blue-500 opacity-80 blur-[2px]" />
                      <div className="flex gap-2 sm:gap-3">
                        <div className="w-12 sm:w-16 h-1.5 sm:h-2 rounded-full bg-zinc-800" />
                        <div className="w-12 sm:w-16 h-1.5 sm:h-2 rounded-full bg-zinc-800" />
                      </div>
                    </div>

                    {/* Content mock */}
                    <div className="flex gap-4 sm:gap-6 mt-2 sm:mt-4">
                      <div className="w-1/3 flex flex-col gap-2 sm:gap-3">
                        <div className="w-full h-2 sm:h-3 rounded-full bg-[#00FFFF]/20" />
                        <div className="w-3/4 h-2 sm:h-3 rounded-full bg-zinc-800" />
                        <div className="w-5/6 h-2 sm:h-3 rounded-full bg-zinc-800" />
                        <div className="w-full h-16 sm:h-24 rounded-xl border border-white/10 mt-2 sm:mt-4 bg-zinc-900/50" />
                      </div>
                      <div className="flex-1 flex flex-col gap-3 sm:gap-4">
                        <div className="w-full h-24 sm:h-40 rounded-2xl bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 relative overflow-hidden">
                          <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-[#00FFFF]/10 to-transparent" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Keyboard base */}
                <div className="h-2 sm:h-4 rounded-b-xl bg-zinc-800/50 mt-1 border-t border-white/10" />
              </div>
            </div>
          </motion.div>

          {/* Floating Phone overlapping */}
          <motion.div
            initial={{ opacity: 0, y: 100, rotateZ: -10, filter: 'blur(20px)' }}
            animate={{ opacity: 1, y: 0, rotateZ: -5, filter: 'blur(0px)' }}
            transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.5 }}
            className="absolute -bottom-10 sm:-bottom-20 left-0 lg:-left-12 w-[110px] sm:w-[140px] lg:w-[180px] z-30"
          >
            <div className="liquid-glass rounded-[1.5rem] sm:rounded-[2rem] p-1 sm:p-1.5 backdrop-blur-3xl border border-white/10" style={{ boxShadow: '-10px 20px 40px rgba(0,0,0,0.5), 0 0 30px rgba(0,255,255,0.2)' }}>
              <div className="rounded-[1.3rem] sm:rounded-[1.7rem] overflow-hidden relative bg-zinc-950 border border-zinc-800 h-[220px] sm:h-[280px] lg:h-[360px]">
                <div className="absolute top-0 inset-x-0 h-4 sm:h-6 flex justify-center items-start pt-1 sm:pt-2 z-20">
                  <div className="w-8 sm:w-12 h-3 sm:h-4 bg-black rounded-full" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-b from-[#00FFFF]/10 to-transparent" />
                
                <div className="p-3 sm:p-4 pt-8 sm:pt-10 flex flex-col gap-2 sm:gap-4">
                  <div className="h-16 sm:h-24 rounded-xl bg-zinc-900 border border-white/5" />
                  <div className="h-2 sm:h-4 w-3/4 rounded-full bg-[#00FFFF]/30" />
                  <div className="h-1.5 sm:h-3 w-1/2 rounded-full bg-zinc-800" />
                  
                  <div className="grid grid-cols-2 gap-1.5 sm:gap-2 mt-1 sm:mt-2">
                    <div className="h-10 sm:h-16 rounded-lg bg-zinc-900 border border-white/5" />
                    <div className="h-10 sm:h-16 rounded-lg bg-zinc-900 border border-white/5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

      </div>

      {/* Floating Abstract Features (Asymmetrical layout) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        <div className="max-w-7xl mx-auto w-full h-full relative">
          {features.map(({ icon: Icon, label }, i) => {
            const positions = [
              { top: '20%', left: '4%' },
              { bottom: '20%', left: '35%' },
              { top: '30%', right: '8%' },
              { bottom: '15%', right: '4%' },
            ];
            
            return (
              <motion.div
                key={label}
                initial={{ opacity: 0, scale: 0.8, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 1, delay: 0.6 + i * 0.2, ease: [0.22, 1, 0.36, 1] }}
                className="absolute hidden md:flex flex-col items-center gap-2 mix-blend-plus-lighter opacity-[0.35]"
                style={positions[i]}
              >
                <div className="w-12 h-12 rounded-full border border-[#00FFFF]/20 flex items-center justify-center backdrop-blur-sm bg-black/30 shadow-[0_0_15px_rgba(0,255,255,0.1)]">
                  <Icon className="w-5 h-5 text-[#00FFFF]/70" />
                </div>
                <div className="text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-medium">{label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>

    </section>
  )
}
