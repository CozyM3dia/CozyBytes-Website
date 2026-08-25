import { motion } from 'framer-motion'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { EASE, featuresList } from './data'

/* ================================================================== *
 * Cakupan layanan sebagai lembar spesifikasi: baris bernomor dengan
 * tick ukur di kiri, deskripsi mengalir di kanan. Header menempel di
 * kolom kiri saat scroll.
 * ================================================================== */

export default function Capabilities() {
  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          {/* Kolom kiri — menempel saat scroll */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="02"
                eyebrow="Cakupan Layanan"
                title={
                  <>
                    Dari riset{' '}
                    <span className="font-serif italic text-white/35">sampai handoff.</span>
                  </>
                }
                deck="Enam cakupan kerja yang bisa masuk ke proyek desain Anda, apa pun skala paketnya."
              />
            </div>
          </div>

          {/* Kolom kanan — baris spesifikasi */}
          <ol className="lg:col-span-7">
            {featuresList.map((feature, i) => {
              const Icon = feature.icon
              return (
                <motion.li
                  key={feature.title}
                  initial={{ opacity: 0, y: 22 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.65, delay: i * 0.06, ease: EASE }}
                  className="group relative border-b border-white/[0.06] py-7 first:border-t"
                >
                  <div className="flex items-start gap-5">
                    {/* Tick ukur vertikal yang memanjang saat hover */}
                    <span aria-hidden className="relative mt-1 h-10 w-px shrink-0 overflow-hidden bg-white/[0.09]">
                      <span className="absolute inset-x-0 top-0 h-1/3 bg-[#00FFFF] transition-all duration-500 group-hover:h-full" />
                    </span>

                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.02] transition-colors duration-300 group-hover:border-[#00FFFF]/30">
                      <Icon className="h-[18px] w-[18px] text-[#00FFFF]" strokeWidth={1.75} />
                    </span>

                    <div className="min-w-0">
                      <div className="flex items-baseline gap-3">
                        <span className="font-mono text-[11px] tabular-nums text-white/30">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <h3 className="font-display text-lg font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:text-xl">
                          {feature.title}
                        </h3>
                      </div>
                      <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
                        {feature.desc}
                      </p>
                    </div>
                  </div>
                </motion.li>
              )
            })}
          </ol>
        </div>

        <Reveal delay={0.08}>
          <p className="mt-10 max-w-2xl text-[13px] leading-relaxed text-white/45">
            Rincian hasil yang Anda terima ada di{' '}
            <a
              href="#harga"
              className="font-semibold text-[#00FFFF] underline-offset-4 hover:underline"
            >
              daftar serah terima
            </a>{' '}
            di bawah.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
