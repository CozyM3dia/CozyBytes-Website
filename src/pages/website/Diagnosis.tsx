import { motion } from 'framer-motion'
import { TriangleAlert } from 'lucide-react'
import { EASE, painPoints } from './data'
import { Reveal, SectionHeading } from './motion'

export default function Diagnosis() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Kolom kiri — menempel saat scroll */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="01"
                eyebrow="Diagnosa"
                title={
                  <>
                    Kenapa website template{' '}
                    <br />
                    <span className="font-serif italic text-white/35">sering mengecewakan?</span>
                  </>
                }
                deck="Empat masalah yang paling sering kami temukan saat klien pindah dari website lamanya ke Cozybytes."
              />

              <Reveal delay={0.2}>
                <div className="mt-9 inline-flex items-center gap-3 rounded-full border border-amber-300/20 bg-amber-300/[0.06] px-4 py-2">
                  <TriangleAlert className="h-3.5 w-3.5 text-amber-300/80" strokeWidth={1.75} />
                  <span className="text-xs font-medium text-amber-200/70">
                    4 dari 4 klien mengalami minimal dua hal ini
                  </span>
                </div>
              </Reveal>
            </div>
          </div>

          {/* Kolom kanan — baris masalah */}
          <ol className="lg:col-span-7">
            {painPoints.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.07, ease: EASE }}
                className="group relative"
              >
                {/* Garis pemisah yang tergambar saat masuk viewport */}
                <motion.span
                  aria-hidden
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.9, delay: i * 0.07, ease: EASE }}
                  className="block h-px origin-left bg-white/[0.09]"
                />

                <div className="relative overflow-hidden py-8 md:py-9">
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        'radial-gradient(ellipse 55% 100% at 0% 50%, rgba(0,255,255,0.06), transparent 68%)',
                    }}
                  />

                  <div className="relative flex gap-5 md:gap-7">
                    <span
                      aria-hidden
                      className="text-outline shrink-0 font-display text-4xl font-medium leading-none transition-all duration-500 group-hover:[-webkit-text-stroke:1px_rgba(0,255,255,0.45)] md:text-5xl"
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>

                    <div className="min-w-0">
                      <span className="font-mono text-[10px] uppercase tracking-[0.26em] text-white/30">
                        {item.tag}
                      </span>
                      <h3 className="font-display mt-2 text-lg font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1.5 md:text-xl">
                        {item.title}
                      </h3>
                      <p className="mt-2.5 max-w-xl text-sm leading-relaxed text-white/48">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.li>
            ))}
            <span aria-hidden className="block h-px bg-white/[0.09]" />
          </ol>
        </div>
      </div>
    </section>
  )
}
