import { motion } from 'framer-motion'
import { EASE } from './shared'
import { Crosshair, Rings } from '../../components/atmosphere'

const QUOTE =
  'Bukan sekadar bikin website — kami merancang aset digital yang bekerja siang-malam untukmu.'
const HIGHLIGHT = new Set(['aset', 'digital'])

export default function QuoteInterlude() {
  return (
    <section className="relative overflow-hidden px-6 py-32 md:py-48">
      <Rings count={4} />
      <Crosshair className="absolute left-[7%] top-[24%]" />
      <Crosshair className="absolute bottom-[26%] right-[8%]" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 60% at 50% 50%, rgba(0,255,255,0.07), transparent 70%)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 select-none font-serif text-[14rem] leading-none text-[#00FFFF]/[0.06] md:text-[20rem]"
      >
        &ldquo;
      </span>
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <blockquote className="font-serif text-3xl italic leading-snug text-white/90 md:text-5xl">
          {QUOTE.split(' ').map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0.08, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.55, delay: i * 0.045, ease: EASE }}
              className={`mr-[0.3em] inline-block${HIGHLIGHT.has(word) ? ' text-[#00FFFF]' : ''}`}
            >
              {word}
            </motion.span>
          ))}
        </blockquote>
        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
          Prinsip kerja Cozybytes Media
        </p>
      </div>
    </section>
  )
}
