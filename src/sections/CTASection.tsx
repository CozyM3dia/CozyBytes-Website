import { useEffect, useMemo, useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['Berikutnya', 'Profesional', 'Digital', 'Modern', 'Terdepan'],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  return (
    <section
      ref={ref}
      className="py-52 lg:py-72 relative overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(0,255,255,0.12) 0%, rgba(13,27,61,0.2) 50%, transparent 100%)',
      }}
    >
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-center justify-center gap-14"
        >
          {/* Heading with rotating word */}
          <div className="flex flex-col gap-8">
            <h2
              className="text-3xl sm:text-5xl md:text-7xl tracking-tight text-center leading-tight"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              <span className="text-white">
                Siap Bawa Bisnismu
                <br />
                ke Level
              </span>
              <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
                &nbsp;
                {titles.map((title, index) => (
                  <motion.span
                    key={index}
                    className="absolute font-sans font-bold text-[#00FFFF]"
                    style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
                    initial={{ opacity: 0, y: '-100' }}
                    transition={{ type: 'spring', stiffness: 50 }}
                    animate={
                      titleNumber === index
                        ? { y: 0, opacity: 1 }
                        : {
                            y: titleNumber > index ? -150 : 150,
                            opacity: 0,
                          }
                    }
                  >
                    {title}
                  </motion.span>
                ))}
              </span>
            </h2>

            <p className="text-lg md:text-xl leading-relaxed tracking-tight text-white/50 max-w-2xl text-center">
              Konsultasi gratis, tanpa komitmen. Ceritakan kebutuhanmu dan kita
              cari solusi terbaik bareng.
            </p>
          </div>

          {/* CTAs Wrapper */}
          <div className="flex flex-col items-center gap-5">
            <motion.a
              href="/pricing"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full border border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF] text-sm font-bold shadow-[0_0_20px_rgba(0,255,255,0.2)] hover:bg-[#00FFFF]/20 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-all"
            >
              <span className="w-2 h-2 rounded-full bg-[#00FFFF] animate-pulse" />
              Cek Harga & Paket (Pricing) →
            </motion.a>

            {/* CTA WhatsApp */}
            <motion.a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="btn-primary text-base px-8 py-4 inline-flex shadow-[0_0_30px_rgba(0,255,255,0.3)]"
            >
              <MessageCircle className="w-5 h-5" />
              Hubungi via WhatsApp
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
