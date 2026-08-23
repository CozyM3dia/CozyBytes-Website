import { motion } from 'framer-motion'
import { ArrowRight, Check, MessageCircle } from 'lucide-react'
import { EASE } from './shared'
import { Reveal } from './ui'

const trustItems = ['Balasan < 24 jam', 'Konsultasi gratis', 'Dikerjakan founder langsung']

export default function ClosingCTA() {
  return (
    <section className="relative overflow-hidden px-6 pb-32 pt-8 md:pb-44">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(ellipse at center, rgba(0,255,255,0.10) 0%, transparent 70%)' }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 select-none font-display text-[16vw] leading-none"
        style={{
          WebkitTextStroke: '1px rgba(255,255,255,0.04)',
          color: 'transparent',
        }}
      >
        MULAI
      </div>

      <div className="relative mx-auto max-w-4xl text-center">
        <div className="mx-auto mb-16 h-px w-24 bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent" />

        <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/35">
          Langkah selanjutnya
        </p>

        <Reveal>
          <h2 className="mt-6 font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-6xl">
            Mulai dari satu
            <br />
            percakapan <span className="font-serif italic text-[#00FFFF]">kecil.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-6 max-w-md text-lg leading-relaxed text-white/55">
            Ceritakan bisnismu sekarang — kami jawab dalam hitungan jam, bukan hari. Tanpa formulir panjang, tanpa komitmen.
          </p>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <motion.a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2, ease: EASE }}
              className="btn-primary inline-flex items-center gap-3 px-8 py-4 text-base"
            >
              <MessageCircle className="h-5 w-5" />
              Hubungi via WhatsApp
            </motion.a>
            <a
              href="/layanan"
              className="group inline-flex items-center gap-2 rounded-full border border-white/10 px-8 py-4 text-base text-white/80 transition-all duration-300 hover:border-[#00FFFF]/40 hover:bg-[#00FFFF]/[0.04] hover:text-[#00FFFF]"
            >
              Lihat Layanan
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </Reveal>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-[13px] text-white/40">
          {trustItems.map((item) => (
            <span key={item} className="inline-flex items-center gap-2">
              <Check className="h-4 w-4 text-emerald-300/70" strokeWidth={1.5} />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
