import { motion, useReducedMotion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { EASE, funnelStages, painPoints } from './data'
import { Reveal, SectionHeading } from '../../components/section/motion'

/* ================================================================== *
 * LeakFunnel — komponen tanda tangan halaman ini.
 *
 * Empat batang yang makin menyempit ke bawah, tiap batang membawa satu
 * masalah. Sisi kanan yang hilang digambar sebagai "bocor" bergaris,
 * jadi penyempitan funnel-nya jadi argumen visual, bukan sekadar kartu.
 * ================================================================== */

function LeakRow({
  index,
  stage,
  point,
}: {
  index: number
  stage: (typeof funnelStages)[number]
  point: (typeof painPoints)[number]
}) {
  const reduce = useReducedMotion()
  const leak = 100 - stage.width

  return (
    <motion.li
      initial={{ opacity: 0, y: 22 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: EASE }}
      className="group relative"
    >
      {/* Rel funnel: bagian terisi + bagian bocor */}
      <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.03]">
        <motion.span
          aria-hidden
          className="h-full rounded-l-full"
          style={{
            background: 'linear-gradient(to right, rgba(0,255,255,0.7), rgba(0,255,255,0.22))',
          }}
          initial={reduce ? { width: `${stage.width}%` } : { width: 0 }}
          whileInView={{ width: `${stage.width}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.95, delay: index * 0.08, ease: EASE }}
        />
        <motion.span
          aria-hidden
          className="h-full"
          style={{
            backgroundImage:
              'repeating-linear-gradient(115deg, rgba(248,113,113,0.28) 0px, rgba(248,113,113,0.28) 2px, transparent 2px, transparent 7px)',
          }}
          initial={reduce ? { width: `${leak}%` } : { width: 0 }}
          whileInView={{ width: `${leak}%` }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.95, delay: 0.28 + index * 0.08, ease: EASE }}
        />
      </div>

      <div className="relative flex gap-5 pb-9 pt-5 md:gap-7">
        <span
          aria-hidden
          className="text-outline shrink-0 font-display text-4xl font-medium leading-none transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(0,255,255,0.45)] md:text-5xl"
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <div className="min-w-0">
          <span className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
              {stage.label}
            </span>
            <span className="font-mono text-[11px] tracking-tight text-[#00FFFF]/60">
              {stage.event}
            </span>
          </span>
          <h3 className="font-display mt-2 text-lg font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1.5 md:text-xl">
            {point.title}
          </h3>
          <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/50">{point.desc}</p>
        </div>
      </div>
    </motion.li>
  )
}

export default function Diagnosis() {
  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="01"
                eyebrow="Diagnosa"
                title={
                  <>
                    Anggaran iklan habis,{' '}
                    <br />
                    <span className="font-serif italic text-white/35">penjualan nihil?</span>
                  </>
                }
                deck="Empat penyebab paling umum kenapa traffic iklan tidak berubah menjadi orderan."
              />

              <Reveal delay={0.18}>
                <div className="mt-9 space-y-4">
                  <div className="inline-flex items-center gap-3 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-4 py-2">
                    <TriangleAlert className="h-3.5 w-3.5 text-amber-300/80" strokeWidth={1.75} />
                    <span className="text-xs font-medium text-amber-200/70">
                      Kebocoran terjadi di sepanjang alur, bukan di satu titik
                    </span>
                  </div>
                  <p className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.18em] text-white/50">
                    <span
                      aria-hidden
                      className="h-2.5 w-6 rounded-sm"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(115deg, rgba(248,113,113,0.35) 0px, rgba(248,113,113,0.35) 2px, transparent 2px, transparent 7px)',
                      }}
                    />
                    <span className="font-mono">Bagian bergaris = pengunjung lepas</span>
                  </p>
                </div>
              </Reveal>
            </div>
          </div>

          <ol className="lg:col-span-7">
            {painPoints.map((point, i) => (
              <LeakRow key={point.title} index={i} stage={funnelStages[i]} point={point} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
