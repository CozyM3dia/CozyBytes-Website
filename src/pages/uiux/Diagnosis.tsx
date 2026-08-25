import { motion } from 'framer-motion'
import { AlertTriangle } from 'lucide-react'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { EASE, accentMap, painPoints } from './data'

/* ================================================================== *
 * Empat temuan audit, dibaca seperti anotasi redline di atas kertas
 * kerja: nomor besar, kicker mono, dan garis ukur yang "menandai"
 * masalah. Grid asimetris — kartu pertama lebar dua kolom sebagai
 * titik fokus, bukan 2x2 seragam.
 * ================================================================== */

export default function Diagnosis() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(0,255,255,0.06) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            index="01"
            eyebrow="Audit Cepat"
            title={
              <>
                Tampilan berantakan membuat pembeli{' '}
                <span className="font-serif italic text-[#00FFFF]">ragu.</span>
              </>
            }
            deck="Empat sinyal paling sering yang bikin calon pembeli menutup tab dalam 3 detik — dan yang kami rapikan di setiap redesign."
            className="max-w-2xl"
          />

          <Reveal delay={0.14}>
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.09] bg-white/[0.02] px-4 py-2">
              <AlertTriangle className="h-3.5 w-3.5 text-amber-300/80" strokeWidth={1.75} />
              <span className="text-xs font-medium text-white/55">
                4 pain → 4 fix • Cozybytes audit
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
          {painPoints.map((point, i) => {
            const Icon = point.icon
            const accent = accentMap[point.accent]
            const wide = i === 0
            return (
              <motion.article
                key={point.num}
                initial={{ opacity: 0, y: 26 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.75, delay: i * 0.08, ease: EASE }}
                className={`group relative ${wide ? 'md:col-span-2' : ''}`}
              >
                {/* Glow aksen saat hover */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[28px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: `radial-gradient(ellipse 60% 55% at 30% 20%, ${accent.glow}, transparent 70%)` }}
                />

                <div
                  className={`relative h-full rounded-[28px] border border-white/[0.08] bg-white/[0.015] p-7 transition-colors duration-500 md:p-8 ${accent.border}`}
                >
                  {/* Garis ukur atas — penanda redline */}
                  <span aria-hidden className="absolute inset-x-8 top-0 h-px overflow-hidden">
                    <span className={`block h-full w-1/3 ${accent.line} opacity-40`} />
                  </span>

                  <div className="flex items-start justify-between gap-5">
                    <span
                      className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors duration-300 ${accent.iconBg}`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <span
                      aria-hidden
                      className="text-outline select-none font-display text-6xl font-medium leading-none md:text-7xl"
                    >
                      {point.num}
                    </span>
                  </div>

                  <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
                    {point.kicker}
                  </p>
                  <h3 className="font-display mt-2 text-xl font-medium tracking-tight text-white md:text-2xl">
                    {point.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/50">
                    {point.desc}
                  </p>
                </div>
              </motion.article>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.015] px-6 py-5">
            <p className="text-sm leading-relaxed text-white/55">
              Semua masalah di atas bisa kami audit <span className="font-semibold text-[#00FFFF]">gratis</span> dari
              link website lama Anda.
            </p>
            <a
              href="#harga"
              className="inline-flex items-center gap-2 rounded-full border border-[#00FFFF]/30 px-5 py-2.5 text-[13px] font-semibold text-[#00FFFF] transition-colors hover:bg-[#00FFFF]/10"
            >
              Audit Gratis
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
