import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import ContactForm from '../components/ContactForm'

const EASE = [0.22, 1, 0.36, 1] as const

export default function ContactSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="kontak" className="relative overflow-hidden py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 20% 0%, rgba(0,255,255,0.07) 0%, transparent 60%)' }} />
      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
            className="lg:col-span-5"
          >
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">Kontak</span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
              Cerita dulu.<br /><span className="text-[#00FFFF]">Gratis kok.</span>
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-white/50">
              Belum yakin butuh paket yang mana? Kirim pesan saja, nanti kami bantu tentukan. Balas cepat via WhatsApp dalam jam kerja.
            </p>

            <div className="mt-8 flex flex-col gap-4">
              <a href="https://wa.me/6285894514719" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-[#00FFFF]/20 transition-colors group">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00FFFF]/10 text-[#00FFFF] group-hover:bg-[#00FFFF] group-hover:text-black transition-colors"><Phone className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold text-white">WhatsApp</span><span className="block text-xs text-white/40">+62 858-9451-4719</span></span>
              </a>
              <a href="mailto:cozybytesmedia@gmail.com" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3 hover:border-white/20 transition-colors">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/5 text-white/70"><Mail className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold text-white">Email</span><span className="block text-xs text-white/40">cozybytesmedia@gmail.com</span></span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-transparent px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] text-white/40"><MapPin className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold text-white/80">Bandar Lampung</span><span className="block text-xs text-white/30">Melayani seluruh Indonesia</span></span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/5 bg-transparent px-4 py-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] text-white/40"><Clock className="h-4 w-4" /></span>
                <span><span className="block text-sm font-semibold text-white/80">Jam kerja</span><span className="block text-xs text-white/30">Senin–Minggu 08:00–21:00 WIB</span></span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.12, ease: EASE }}
            className="lg:col-span-7"
          >
            <ContactForm />
          </motion.div>
        </div>
      </div>
    </section>
  )
}
