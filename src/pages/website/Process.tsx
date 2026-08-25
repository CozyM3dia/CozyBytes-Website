import { useRef } from 'react'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EASE, processSteps, WA_LINK } from './data'
import { Reveal, SectionHeading } from './motion'

function Step({
  step,
  index,
}: {
  step: (typeof processSteps)[number]
  index: number
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.7, delay: index * 0.05, ease: EASE }}
      className="group relative pb-14 last:pb-0"
    >
      {/* Titik node di atas rail */}
      <span
        aria-hidden
        className="absolute -left-[calc(2.5rem+5px)] top-1.5 h-[9px] w-[9px] rounded-full border border-[#00FFFF]/40 bg-[#0a0a0c] transition-all duration-500 group-hover:border-[#00FFFF] group-hover:bg-[#00FFFF] group-hover:shadow-[0_0_14px_rgba(0,255,255,0.6)] md:-left-[calc(3.5rem+5px)]"
      />
      {/* Garis penghubung ke konten */}
      <span
        aria-hidden
        className="absolute -left-10 top-[9px] h-px w-6 origin-left scale-x-0 bg-gradient-to-r from-[#00FFFF]/60 to-transparent transition-transform duration-500 group-hover:scale-x-100 md:-left-14 md:w-10"
      />

      <div className="flex flex-wrap items-center gap-3">
        <span className="font-mono text-[11px] font-bold text-[#00FFFF]/65">{step.step}</span>
        <span className="rounded-full border border-white/[0.08] bg-white/[0.02] px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/35">
          {step.duration}
        </span>
      </div>

      <h3 className="font-display mt-2 text-xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1.5 md:text-2xl">
        {step.title}
      </h3>
      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/50">{step.desc}</p>

      <div className="mt-4 flex items-center gap-2.5 text-[11px] text-white/35">
        <ArrowRight className="h-3 w-3 text-[#00FFFF]/50" strokeWidth={2} />
        <span className="font-mono uppercase tracking-[0.14em]">Output</span>
        <span className="text-white/55">{step.deliverable}</span>
      </div>
    </motion.li>
  )
}

export default function Process() {
  const railRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 78%', 'end 62%'],
  })
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 })
  const glowY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section className="relative border-t border-white/5 py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="05"
                eyebrow="Alur Kerja"
                title={
                  <>
                    Dari brief{' '}
                    <br />
                    <span className="font-serif italic text-[#00FFFF]">sampai live.</span>
                  </>
                }
                deck="Kami membagi proses pengerjaan ke dalam fase-fase pendek agar Anda dapat memberikan masukan secara berkala."
              />

              <Reveal delay={0.18}>
                <div className="mt-9 rounded-2xl border border-white/[0.07] bg-white/[0.015] p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                    Total durasi
                  </p>
                  <p className="font-display mt-1.5 text-3xl font-medium tracking-tight text-white">
                    3–7 <span className="text-lg text-white/40">hari kerja</span>
                  </p>
                  <p className="mt-3 text-xs leading-relaxed text-white/40">
                    Paket Premium 10–14 hari kerja karena cakupan halaman lebih banyak dan
                    integrasi sistem blog.
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-[#00FFFF] underline-offset-4 hover:underline"
                  >
                    Mulai dari tahap brief
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <div ref={railRef} className="relative pl-10 md:pl-14">
              {/* Rail dasar */}
              <span
                aria-hidden
                className="absolute left-0 top-0 h-full w-px bg-white/[0.08]"
              />
              {/* Rail terisi mengikuti scroll */}
              <motion.span
                aria-hidden
                style={{ scaleY }}
                className="absolute left-0 top-0 h-full w-px origin-top bg-gradient-to-b from-[#00FFFF] via-[#00FFFF]/60 to-[#00FFFF]/10"
              />
              {/* Titik cahaya di ujung progres */}
              <motion.span
                aria-hidden
                style={{ top: glowY }}
                className="absolute -left-[3px] h-[7px] w-[7px] -translate-y-1/2 rounded-full bg-[#00FFFF] shadow-[0_0_16px_rgba(0,255,255,0.85)]"
              />

              <ol>
                {processSteps.map((step, i) => (
                  <Step key={step.step} step={step} index={i} />
                ))}
              </ol>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
