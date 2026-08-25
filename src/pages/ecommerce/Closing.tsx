import { motion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { MagneticButton, SplitLines } from '../../components/section/motion'
import { EASE, WA_LINK } from './data'

export default function Closing() {
  return (
    <section className="relative overflow-hidden py-28 md:py-36">
      {/* Cahaya bawah + grid bergerak: kesan lantai gudang/logistik */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 42% at 50% 108%, rgba(0,255,255,0.09) 0%, transparent 62%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          maskImage: 'linear-gradient(to bottom, transparent, black 55%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 55%)',
          animation: 'grid-drift 7s linear infinite',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-3"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.4s_ease-in-out_infinite]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
            08 — Mulai
          </span>
        </motion.span>

        <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl">
          <SplitLines
            as="span"
            lines={[
              <>Toko online milik Anda.</>,
              <span key="l2" className="font-serif italic text-[#00FFFF]">
                Pembayaran otomatis 24 jam.
              </span>,
            ]}
          />
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.35, ease: EASE }}
          className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-white/55"
        >
          Hubungi tim kami untuk konsultasi alur checkout otomatis yang paling sesuai dengan jenis
          barang dagangan Anda.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.45, ease: EASE }}
          className="mt-10"
        >
          <MagneticButton
            href={WA_LINK}
            ariaLabel="Konsultasi alur checkout via WhatsApp"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#00FFFF] px-8 py-4 text-sm font-bold text-black shadow-[0_0_38px_rgba(0,255,255,0.3)] transition-shadow hover:shadow-[0_0_56px_rgba(0,255,255,0.45)]"
          >
            <MessageCircle className="relative h-4 w-4" />
            <span className="relative">Konsultasi via WhatsApp</span>
            <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/3 bg-white/50 group-hover:[animation:sheen_0.9s_ease-out]"
            />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}
