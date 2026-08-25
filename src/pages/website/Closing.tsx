import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { EASE, WA_LINK } from './data'
import { Hairline, MagneticButton, SplitLines } from './motion'

const ASSURANCES = [
  'Tanpa biaya awal',
  'Tanpa komitmen',
  'Balasan di hari yang sama',
]

export default function Closing() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pb-20 md:pt-32">
      {/* Cahaya naik dari dasar halaman */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 55% at 50% 108%, rgba(0,255,255,0.12) 0%, transparent 68%)',
        }}
      />
      {/* Lingkaran konsentris — gema dari sistem atmosfer situs */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 grid h-[80%] place-items-end justify-center overflow-hidden"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="absolute rounded-full border border-[#00FFFF]/[0.07]"
            style={{
              width: `${34 + i * 22}vmin`,
              height: `${34 + i * 22}vmin`,
              bottom: `${-12 - i * 6}vmin`,
              animation: reduce
                ? undefined
                : `ring-breathe ${11 + i * 2}s ease-in-out ${i * -2.5}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage:
            'radial-gradient(ellipse 55% 50% at 50% 55%, black 5%, transparent 72%)',
          WebkitMaskImage:
            'radial-gradient(ellipse 55% 50% at 50% 55%, black 5%, transparent 72%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.span
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/[0.06] px-4 py-1.5"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.4s_ease-in-out_infinite]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-[#00FFFF]/85">
            Slot pengerjaan terbuka
          </span>
        </motion.span>

        <SplitLines
          as="div"
          className="font-display text-[2.4rem] font-medium leading-[1.04] tracking-tight sm:text-5xl md:text-[4rem]"
          stagger={0.1}
          lines={[
            <>Profil bisnis Anda,</>,
            <span key="l2" className="font-serif italic text-[#00FFFF]">
              lebih kredibel.
            </span>,
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.24, ease: EASE }}
          className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-white/50"
        >
          Ceritakan kebutuhan bisnis Anda ke tim kami. Kami balas dengan rekomendasi paket,
          estimasi waktu, dan struktur halaman yang sesuai.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.34, ease: EASE }}
          className="mt-11 flex flex-col items-center gap-4"
        >
          <MagneticButton
            href={WA_LINK}
            strength={14}
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-[#00FFFF] px-8 py-4 text-sm font-bold text-black shadow-[0_0_40px_rgba(0,255,255,0.3)] transition-shadow hover:shadow-[0_0_64px_rgba(0,255,255,0.45)]"
          >
            <MessageCircle className="relative h-4 w-4" />
            <span className="relative">Konsultasi via WhatsApp</span>
            <ArrowUpRight className="relative h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/3 bg-white/50 group-hover:[animation:sheen_0.9s_ease-out]"
            />
          </MagneticButton>

          <ul className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
            {ASSURANCES.map((item) => (
              <li
                key={item}
                className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.16em] text-white/32"
              >
                <span aria-hidden className="h-1 w-1 rounded-full bg-[#00FFFF]/50" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <Hairline className="mt-14" />
      </div>
    </section>
  )
}
