import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

const projects = [
  {
    name: 'Warung Kopi Nusantara',
    type: 'Landing Page',
    time: '2 hari',
    gradient: 'linear-gradient(135deg, #0D1B3D 0%, #0a2a1a 100%)',
    accent: 'rgba(0,255,180,0.3)',
  },
  {
    name: 'Studio Rupa Design',
    type: 'Company Profile',
    time: '4 hari',
    gradient: 'linear-gradient(135deg, #1a0a2a 0%, #2D1B3D 100%)',
    accent: 'rgba(180,0,255,0.3)',
  },
  {
    name: 'Toko Batik Elegan',
    type: 'Toko Online',
    time: '5 hari',
    gradient: 'linear-gradient(135deg, #1a1a0a 0%, #3D2D00 100%)',
    accent: 'rgba(255,200,0,0.3)',
  },
  {
    name: 'Klinik Sehat Prima',
    type: 'Company Profile',
    time: '3 hari',
    gradient: 'linear-gradient(135deg, #001a2a 0%, #0D2A3D 100%)',
    accent: 'rgba(0,200,255,0.3)',
  },
]

export default function PortfolioPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portofolio" ref={ref} className="py-24">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <span className="text-[#00FFFF] text-xs font-semibold tracking-widest uppercase mb-3 block">
              Portofolio
            </span>
            <h2
              className="text-4xl md:text-5xl leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Karya <em className="text-[#00FFFF] italic">Terbaru</em>
            </h2>
          </div>
        </motion.div>

        {/* 2x2 Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {projects.map(({ name, type, time, gradient, accent }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
              whileHover={{ y: -4 }}
              className="relative rounded-2xl overflow-hidden group cursor-pointer"
              style={{ background: gradient, minHeight: 220 }}
            >
              {/* Glow accent */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `radial-gradient(circle at 50% 50%, ${accent} 0%, transparent 70%)` }}
              />

              {/* Completion badge */}
              <div className="absolute top-4 right-4 cyan-glass rounded-full px-3 py-1 text-xs font-semibold text-[#00FFFF]">
                {time}
              </div>

              {/* Mock screen content */}
              <div className="absolute inset-4 top-12 rounded-xl opacity-20" style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                <div className="p-3 flex flex-col gap-2">
                  <div className="h-2 rounded-full w-1/2 bg-white/30" />
                  <div className="h-1.5 rounded-full w-3/4 bg-white/20" />
                  <div className="h-1.5 rounded-full w-2/3 bg-white/15" />
                </div>
              </div>

              {/* Bottom overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)' }}>
                <div className="text-white/50 text-xs mb-1">{type}</div>
                <div className="text-white font-semibold">{name}</div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: 'rgba(0,0,0,0.4)' }}>
                <Link
                  to="/portfolio"
                  className="liquid-glass rounded-full px-5 py-2 text-white text-sm font-semibold flex items-center gap-2"
                  onClick={(e) => e.stopPropagation()}
                >
                  Lihat Detail <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* See all link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex justify-center"
        >
          <Link
            to="/portfolio"
            className="liquid-glass rounded-full px-6 py-3 text-white text-sm font-semibold flex items-center gap-2 hover:bg-white/5 transition-colors"
            style={{ border: '1px solid rgba(255,255,255,0.1)' }}
          >
            Lihat Karya Lainnya <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
