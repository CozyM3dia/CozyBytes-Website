import { motion } from 'framer-motion'
import { Reveal, SectionHeading, SpotlightCard } from '../../components/section/motion'
import { EASE, featuresList, paymentPills } from './data'

/* ================================================================== *
 * Enam kemampuan toko. Fitur pembayaran dipromosikan jadi sel lebar
 * dengan deret metode bayar; sisanya baris ledger dua kolom.
 * ================================================================== */

export default function Capabilities() {
  const [lead, ...rest] = featuresList
  const LeadIcon = lead.icon

  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Fitur Toko Online"
          title={
            <>
              Transaksi selesai sendiri,{' '}
              <span className="font-serif italic text-white/35">tanpa admin manual.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {/* ---------- Sel utama: pembayaran otomatis ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: EASE }}
            className="md:col-span-2"
          >
            <SpotlightCard className="h-full rounded-2xl border border-[#00FFFF]/15 bg-gradient-to-br from-[#00FFFF]/[0.07] via-transparent to-transparent p-7 md:p-9">
              <div className="grid items-center gap-8 md:grid-cols-[1.4fr_1fr]">
                <div>
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#00FFFF]/25 bg-[#00FFFF]/10">
                    <LeadIcon className="h-5 w-5 text-[#00FFFF]" strokeWidth={1.75} />
                  </span>
                  <h3 className="font-display mt-5 text-xl font-medium tracking-tight text-white md:text-2xl">
                    {lead.title}
                  </h3>
                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{lead.desc}</p>
                </div>

                {/* Deret metode bayar — chip mono seperti denominal di struk */}
                <ul className="flex flex-wrap gap-2 md:justify-end">
                  {paymentPills.map((pill) => (
                    <li
                      key={pill}
                      className="rounded-full border border-white/[0.1] bg-black/30 px-3.5 py-1.5 font-mono text-[11px] text-white/65"
                    >
                      {pill}
                    </li>
                  ))}
                </ul>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* ---------- Lima sel berikut ---------- */}
          {rest.map((feature, i) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.7, delay: (i % 2) * 0.08, ease: EASE }}
              >
                <SpotlightCard className="h-full rounded-2xl border border-white/[0.08] bg-white/[0.015] p-7">
                  <div className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/[0.09] bg-white/[0.03]">
                      <Icon className="h-[18px] w-[18px] text-[#00FFFF]" strokeWidth={1.75} />
                    </span>
                    <span
                      aria-hidden
                      className="font-mono text-[11px] tabular-nums text-white/25 transition-colors duration-300 group-hover/spot:text-[#00FFFF]/60"
                    >
                      {String(i + 2).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="font-display mt-5 text-lg font-medium tracking-tight text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-white/50">{feature.desc}</p>
                </SpotlightCard>
              </motion.div>
            )
          })}
        </div>

        <Reveal delay={0.1}>
          <p className="mt-10 max-w-2xl text-[13px] leading-relaxed text-white/45">
            Seluruh fitur di atas dikonfigurasikan lewat{' '}
            <a
              href="#harga"
              className="font-semibold text-[#00FFFF] underline-offset-4 hover:underline"
            >
              konfigurator di bawah
            </a>{' '}
            — Anda hanya memakai yang dibutuhkan.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
