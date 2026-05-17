import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { ContainerScroll } from '../components/ui/container-scroll-animation'

const projects = [
  {
    name: 'Warung Kopi Nusantara',
    type: 'Landing Page',
    time: '2 hari',
    gradient: 'linear-gradient(135deg, #0D1B3D 0%, #0a2a1a 100%)',
    mockAccent: 'rgba(0,255,180,0.25)',
  },
  {
    name: 'Studio Rupa Design',
    type: 'Company Profile',
    time: '4 hari',
    gradient: 'linear-gradient(135deg, #1a0a2a 0%, #2D1B3D 100%)',
    mockAccent: 'rgba(180,0,255,0.25)',
  },
  {
    name: 'Toko Batik Elegan',
    type: 'Toko Online',
    time: '5 hari',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #3D2D00 100%)',
    mockAccent: 'rgba(255,200,0,0.25)',
  },
  {
    name: 'Klinik Sehat Prima',
    type: 'Company Profile',
    time: '3 hari',
    gradient: 'linear-gradient(135deg, #001a2a 0%, #0D2A3D 100%)',
    mockAccent: 'rgba(0,200,255,0.25)',
  },
  {
    name: 'Restoran Padang Jaya',
    type: 'Landing Page',
    time: '2 hari',
    gradient: 'linear-gradient(135deg, #2a0a0a 0%, #3D1B1B 100%)',
    mockAccent: 'rgba(255,80,0,0.25)',
  },
  {
    name: 'Online Butik Syari',
    type: 'Toko Online',
    time: '6 hari',
    gradient: 'linear-gradient(135deg, #1a0a1a 0%, #2D003D 100%)',
    mockAccent: 'rgba(255,0,200,0.25)',
  },
]

function MockBrowserContent({
  gradient,
  mockAccent,
  time,
}: {
  gradient: string
  mockAccent: string
  time: string
}) {
  return (
    <div
      className="w-full h-full relative flex flex-col"
      style={{ background: gradient }}
    >
      {/* Time badge */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 cyan-glass rounded-full px-4 py-1.5 text-xs md:text-sm font-semibold text-[#00FFFF] z-10">
        {time}
      </div>

      {/* Browser bar */}
      <div className="flex items-center gap-2 p-4 md:p-8 pb-0">
        <div className="flex gap-2">
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/10" />
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/10" />
          <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 mx-3 h-4 md:h-6 rounded-full bg-white/[0.04] max-w-sm" />
      </div>

      {/* Page content mock */}
      <div className="flex-1 m-4 md:m-8 rounded-xl md:rounded-2xl border border-white/[0.06] p-6 md:p-12 flex flex-col gap-4 md:gap-6">
        {/* Nav mock */}
        <div className="flex items-center justify-between mb-3 md:mb-6">
          <div
            className="h-4 md:h-6 w-24 md:w-40 rounded-full"
            style={{ background: mockAccent }}
          />
          <div className="flex gap-3 md:gap-5">
            <div className="h-3 md:h-4 w-12 md:w-20 rounded-full bg-white/[0.06]" />
            <div className="h-3 md:h-4 w-12 md:w-20 rounded-full bg-white/[0.06]" />
            <div className="h-3 md:h-4 w-12 md:w-20 rounded-full bg-white/[0.06] hidden md:block" />
            <div className="h-3 md:h-4 w-12 md:w-20 rounded-full bg-white/[0.06] hidden lg:block" />
          </div>
        </div>

        {/* Hero mock */}
        <div className="flex-1 flex flex-col justify-center items-center gap-4 md:gap-6">
          <div
            className="h-6 md:h-12 w-3/5 rounded-full"
            style={{ background: mockAccent }}
          />
          <div className="h-4 md:h-6 w-2/4 rounded-full bg-white/[0.06]" />
          <div className="h-4 md:h-6 w-2/5 rounded-full bg-white/[0.04]" />
          <div className="flex gap-3 md:gap-4 mt-3 md:mt-6">
            <div
              className="h-10 md:h-14 w-28 md:w-44 rounded-full"
              style={{ background: mockAccent }}
            />
            <div className="h-10 md:h-14 w-24 md:w-36 rounded-full bg-white/[0.04] border border-white/[0.06]" />
          </div>
        </div>

        {/* Cards row mock */}
        <div className="grid grid-cols-3 gap-3 md:gap-5 mt-auto">
          {[0, 1, 2].map((j) => (
            <div
              key={j}
              className="rounded-lg md:rounded-xl bg-white/[0.03] border border-white/[0.04] h-20 md:h-40"
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  return (
    <div className="bg-black min-h-screen">
      <Navbar />

      {/* Header */}
      <section
        className="pt-36 pb-16 md:pb-24"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,255,0.08) 0%, transparent 60%)',
        }}
      >
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <span className="text-[#00FFFF] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Portofolio
            </span>
            <h1
              className="text-5xl md:text-7xl lg:text-8xl leading-tight mb-4"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Semua <em className="text-[#00FFFF] italic">Karya</em> Kami
            </h1>
            <p className="text-white/50 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
              Dari landing page hingga toko online — setiap proyek dibuat
              dengan dedikasi penuh.
            </p>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-10"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-1.5"
            >
              <div className="w-1.5 h-2.5 rounded-full bg-[#00FFFF]/60" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll showcase */}
      <section className="px-4 pt-10 md:px-6 md:pt-14">
        {projects.map((project, i) => (
          <ContainerScroll
            key={project.name}
            titleComponent={
              <div className="mb-12 md:mb-16 flex flex-col items-center">
                <span className="text-[#00FFFF] text-xs md:text-sm font-semibold tracking-widest uppercase mb-4 block text-center">
                  {project.type}
                  <span className="text-white/20 mx-3">—</span>
                  <span className="text-white/30 font-mono">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </span>
                <h2
                  className="text-5xl md:text-[5.25rem] lg:text-[7rem] font-bold text-white leading-[1.02] tracking-tight text-center"
                  style={{ fontFamily: '"Instrument Serif", serif' }}
                >
                  {project.name}
                </h2>
              </div>
            }
          >
            <MockBrowserContent
              gradient={project.gradient}
              mockAccent={project.mockAccent}
              time={project.time}
            />
          </ContainerScroll>
        ))}

        {/* And many more bubble */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex justify-center mt-12 mb-4"
        >
          <div className="px-6 py-3 rounded-full border border-white/10 bg-white/[0.02] backdrop-blur-md text-white/60 italic text-sm md:text-base">
            ... and many more
          </div>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="pb-24 pt-8">
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <p className="text-white/50 mb-5 text-sm">
              Tertarik untuk proyek berikutnya?
            </p>
            <motion.a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary"
            >
              <MessageCircle className="w-4 h-4" />
              Konsultasi Gratis
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
