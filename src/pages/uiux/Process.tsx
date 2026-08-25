import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { EASE, workflowSteps } from './data'

/* ================================================================== *
 * Lima fase kerja sebagai lintasan produksi desain — rel vertikal
 * dengan node yang menyala, label fase mono di kanan tiap judul.
 * ================================================================== */

const PHASE_TAGS = ['RISET', 'WIREFRAME', 'VISUAL', 'PROTOTYPE', 'HANDOFF']

export default function Process() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Kolom kiri — menempel saat scroll */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="05"
                eyebrow="Alur Kerja"
                title={
                  <>
                    Alur kerja{' '}
                    <span className="font-serif italic text-[#00FFFF]">kolaboratif.</span>
                  </>
                }
                deck="Dari brainstorming hingga serah terima aset, Anda terlibat di setiap fase."
              />

              <Reveal delay={0.18}>
                <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-white/[0.09] bg-white/[0.02] px-4 py-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.4s_ease-in-out_infinite]" />
                  <span className="text-xs font-medium text-white/55">
                    Review bersama di setiap transisi fase
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Kolom kanan — lintasan fase */}
          <ol className="relative lg:col-span-7">
            {/* Rel berhenti di item terakhir: last:pb-0 menghapus padding
                bawah penutup, jadi rel tidak menggantung. */}
            <span
              aria-hidden
              className="absolute bottom-0 left-[7px] top-2 w-px bg-gradient-to-b from-[#00FFFF]/40 via-white/[0.08] to-white/[0.04]"
            />
            {workflowSteps.map((step, i) => (
              <motion.li
                key={step.step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                className="relative pb-10 pl-10 last:pb-0"
              >
                {/* Titik fase + denyut ring */}
                <span aria-hidden className="absolute left-0 top-1.5">
                  <span className="relative block h-[15px] w-[15px] rounded-full border border-[#00FFFF]/40 bg-[#0a0a0c]">
                    <span className="absolute inset-0 rounded-full bg-[#00FFFF] [animation:node-ping_3s_ease-out_infinite]" />
                    <span className="absolute inset-0 scale-[0.42] rounded-full bg-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.6)]" />
                  </span>
                </span>

                <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
                  <span className="font-mono text-[11px] tabular-nums text-white/35">
                    {step.step}
                  </span>
                  <span
                    className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] uppercase tracking-[0.16em] ${
                      i === workflowSteps.length - 1
                        ? 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]'
                        : 'border-white/[0.09] text-white/45'
                    }`}
                  >
                    {PHASE_TAGS[i]}
                  </span>
                </div>

                <h3 className="font-display mt-2.5 text-lg font-medium tracking-tight text-white md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">{step.desc}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
