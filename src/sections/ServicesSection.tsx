import { useRef, useEffect } from 'react'
import { useInView } from 'framer-motion'
import {
  HoverSlider,
  HoverSliderImage,
  HoverSliderImageWrap,
  TextStaggerHover,
  useHoverSliderContext,
} from '@/components/ui/animated-slideshow'
import { motion, AnimatePresence } from 'framer-motion'

const SERVICES = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    tag: 'Konversi Tinggi',
    description: 'Satu halaman khusus untuk mendatangkan pelanggan. Sangat cocok jika Anda sedang menjalankan iklan di media sosial.',
    imageUrl: '/services/landing.png',
  },
  {
    id: 'company-profile',
    title: 'Company Profile',
    tag: 'Profesional',
    description: 'Bangun kredibilitas perusahaan Anda melalui Company Profile profesional yang menampilkan portofolio, visi misi, dan nilai jual secara memukau.',
    imageUrl: '/services/company.png',
  },
  {
    id: 'toko-online',
    title: 'Toko Online',
    tag: 'E-Commerce',
    description: 'Sistem e-commerce yang mempermudah pelanggan memilih barang dan membayar secara otomatis. Anda tidak perlu lagi mencatat pesanan satu per satu.',
    imageUrl: '/services/ecommerce.png',
  },
  {
    id: 'custom-website',
    title: 'Custom Website',
    tag: 'Full Custom',
    description: 'Desain dan fitur dibuat khusus dari nol sesuai kebutuhan unik bisnis Anda, tanpa menggunakan template pasaran.',
    imageUrl: '/services/custom.png',
  },
  {
    id: 'ui-ux',
    title: 'UI/UX Redesign',
    tag: 'Modern',
    description: 'Tampilan website lama terasa ketinggalan zaman? Kami mendesain ulang antarmukanya agar lebih modern, rapi, dan sesuai dengan identitas bisnis Anda saat ini.',
    imageUrl: '/services/uiux.png',
  },
]

function AutoPlayManager({ total, interval }: { total: number, interval: number }) {
  const { activeSlide, changeSlide } = useHoverSliderContext()

  useEffect(() => {
    const timer = setInterval(() => {
      changeSlide((activeSlide + 1) % total)
    }, interval)
    return () => clearInterval(timer)
  }, [activeSlide, total, interval, changeSlide])

  return null
}

function ServiceItem({ svc, index }: { svc: typeof SERVICES[0], index: number }) {
  const { activeSlide } = useHoverSliderContext()
  const isActive = activeSlide === index

  return (
    <div className="group flex flex-col py-3 border-b border-white/8 last:border-0 relative">
      <div className="flex items-center gap-4 relative z-10">
        <span className="text-[#00FFFF]/40 text-xs font-mono w-6 flex-shrink-0">
          {String(index + 1).padStart(2, '0')}
        </span>
        <TextStaggerHover
          index={index}
          text={svc.title}
          className="cursor-pointer text-2xl md:text-3xl font-bold text-white tracking-tight"
          style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
        />
        <span className="ml-auto text-xs text-white/30 group-hover:text-[#00FFFF]/60 transition-colors hidden sm:block">
          {svc.tag}
        </span>
      </div>
      
      {/* Progress Bar Container */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-white/5 overflow-hidden">
        {isActive && (
          <div 
            className="h-full bg-[#00FFFF] origin-left"
            style={{ 
              animation: 'progress 4s linear forwards'
            }}
          />
        )}
      </div>
    </div>
  )
}

function ServiceDescription({ services }: { services: typeof SERVICES }) {
  const { activeSlide } = useHoverSliderContext()
  
  return (
    <div className="w-full md:flex-1 relative flex flex-col justify-center">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSlide}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <p 
            className="text-3xl lg:text-[2.2rem] leading-[1.3] text-white/90 text-justify"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            {services[activeSlide].description}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="layanan" ref={ref} className="py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div
          className="mb-12 transition-all duration-700"
          style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)' }}
        >
          <span className="text-[#00FFFF] text-xs font-semibold tracking-widest uppercase mb-3 block">
            Layanan Kami
          </span>
          <h2
            className="text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Solusi <em className="text-[#00FFFF] italic">Digital</em>
            <br />untuk Bisnis Kamu
          </h2>
        </div>

        {/* Hover Slideshow */}
        <HoverSlider className="flex flex-col md:flex-row gap-10 lg:gap-12 items-start md:items-center">
          <AutoPlayManager total={SERVICES.length} interval={4000} />
          
          {/* Text list */}
          <div className="flex flex-col gap-1 flex-shrink-0 w-full md:w-auto">
            {SERVICES.map((svc, index) => (
              <ServiceItem key={svc.id} svc={svc} index={index} />
            ))}
          </div>

          {/* Image area */}
          <div className="w-full md:w-[340px] lg:w-[400px] flex-shrink-0 relative">
            <HoverSliderImageWrap className="rounded-2xl overflow-hidden aspect-[4/3] relative z-10">
              {SERVICES.map((svc, index) => (
                <div key={svc.id} className="w-full h-full">
                  <HoverSliderImage
                    index={index}
                    imageUrl={svc.imageUrl}
                    alt={svc.title}
                    className="w-full h-full object-cover"
                    loading="eager"
                    decoding="async"
                  />
                </div>
              ))}
            </HoverSliderImageWrap>
            {/* Cyan glow under image */}
            <div
              className="absolute -bottom-4 left-8 right-8 h-8 rounded-b-full blur-xl z-0 pointer-events-none"
              style={{ background: 'rgba(0,255,255,0.15)' }}
            />
          </div>

          {/* Description Area */}
          <ServiceDescription services={SERVICES} />
        </HoverSlider>
      </div>
    </section>
  )
}
