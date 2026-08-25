import { motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, MessageCircle } from 'lucide-react'
import { EASE, WA_LINK } from './data'
import { Hairline, MagneticButton, SplitLines } from '../../components/section/motion'

const ASSURANCES = ['Tanpa biaya awal', 'Tanpa komitmen', 'Balasan di hari yang sama']

export default function Closing() {
  const reduce = useReducedMotion()

  return (
    <section className="relative overflow-hidden pb-16 pt-24 md:pb-20 md:pt-36">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 62% 52% at 50% 106%, rgba(0,255,255,0.12) 0%, transparent 68%)',
        }}
      />
      {/* Kerucut menyempit ke bawah — gema motif funnel dari seluruh halaman,
          dibalik jadi cahaya yang mengumpul ke satu titik aksi. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[70%] overflow-hidden"
      >
        {[0, 1, 2, 3].map((i) => (
          <span
            key={i}
            className="absolute bottom-0 left-1/2 h-px -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FFFF]/[0.16] to-transparent"
            style={{
              width: `${88 - i * 19}%`,
              bottom: `${8 + i * 9}%`,
              animation: reduce
                ? undefined
                : `ring-breathe ${9 + i * 1.6}s ease-in-out ${i * -1.8}s infinite`,
            }}
          />
        ))}
      </div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
          maskImage: 'radial-gradient(ellipse 55% 50% at 50% 55%, black 5%, transparent 72%)',
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
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] text-[#00FFFF]/85">
            Slot pengerjaan terbuka
          </span>
        </motion.span>

        <SplitLines
          as="div"
          className="font-display text-[2.2rem] font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]"
          stagger={0.1}
          lines={[
            <>Berhenti membuang</>,
            <>anggaran iklan.</>,
            <span key="l3" className="font-serif italic text-[#00FFFF]">
              Mulai mengubahnya jadi pembeli.
            </span>,
          ]}
        />

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.26, ease: EASE }}
          className="mx-auto mt-7 max-w-md text-[15px] leading-relaxed text-white/50"
        >
          Diskusikan produk jualan Anda dengan tim developer &amp; copywriting kami untuk merancang
          alur konversi terbaik.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.36, ease: EASE }}
          className="mt-11 flex flex-col items-center gap-4"
        >
          <MagneticButton
            href={WA_LINK}
            strength={14}
            ariaLabel="Konsultasi via WhatsApp untuk mulai merancang alur konversi"
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
                className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50"
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
