import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import { comparisons, competitorColumns, EASE } from './data'
import type { CompetitorKey } from './data'
import { SectionHeading } from './motion'

export default function Comparison() {
  const [active, setActive] = useState<CompetitorKey>('wordpress')
  const activeLabel =
    competitorColumns.find((c) => c.key === active)?.label ?? competitorColumns[0].label

  return (
    <section className="relative border-t border-white/[0.06] py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="03"
          eyebrow="Perbandingan"
          title={
            <>
              Kode custom{' '}
              <span className="font-serif italic text-white/30">vs</span>{' '}
              CMS instan.
            </>
          }
          deck="Analisis perbandingan objektif untuk membantu Anda menentukan keputusan terbaik bagi bisnis digital Anda."
        />

        {/* ---------------- Desktop: matriks penuh ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: EASE }}
          className="mt-14 hidden overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.008] md:block"
        >
          <table className="w-full border-collapse text-left">
            <caption className="sr-only">
              Perbandingan layanan Cozybytes dengan WordPress template, desainer freelancer, dan
              platform SaaS
            </caption>
            <thead>
              <tr className="border-b border-white/[0.09] bg-white/[0.02]">
                <th
                  scope="col"
                  className="p-5 font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35"
                >
                  Faktor Penentu
                </th>
                <th scope="col" className="relative p-5">
                  <span
                    aria-hidden
                    className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent"
                  />
                  <span className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] shadow-[0_0_8px_rgba(0,255,255,0.7)]" />
                    <span className="font-display text-sm font-semibold text-[#00FFFF]">
                      Cozybytes Custom Code
                    </span>
                  </span>
                </th>
                {competitorColumns.map((c) => (
                  <th
                    key={c.key}
                    scope="col"
                    className="p-5 text-sm font-semibold text-white/55"
                  >
                    {c.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {comparisons.map((row, i) => (
                <motion.tr
                  key={row.aspect}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group border-b border-white/[0.05] transition-colors last:border-0 hover:bg-white/[0.014]"
                >
                  <th
                    scope="row"
                    className="p-5 text-left text-sm font-semibold text-white/80"
                  >
                    {row.aspect}
                  </th>
                  <td className="relative border-x border-[#00FFFF]/12 bg-[#00FFFF]/[0.045] p-5 text-sm font-medium text-[#00FFFF] transition-colors group-hover:bg-[#00FFFF]/[0.075]">
                    <span className="flex gap-2.5">
                      <Check
                        className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00FFFF]"
                        strokeWidth={2.5}
                      />
                      {row.cozy}
                    </span>
                  </td>
                  {competitorColumns.map((c) => (
                    <td key={c.key} className="p-5 text-sm text-white/45">
                      {row[c.key]}
                    </td>
                  ))}
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* ---------------- Mobile: pilih pembanding ---------------- */}
        <div className="mt-12 md:hidden">
          <div role="tablist" aria-label="Pilih pembanding" className="flex flex-wrap gap-2">
            {competitorColumns.map((c) => {
              const on = active === c.key
              return (
                <button
                  key={c.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(c.key)}
                  className={`rounded-full border px-3.5 py-2 text-[11px] font-semibold transition-colors ${
                    on
                      ? 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]'
                      : 'border-white/[0.09] text-white/45'
                  }`}
                >
                  {c.label}
                </button>
              )
            })}
          </div>

          <div className="mt-6 divide-y divide-white/[0.07] overflow-hidden rounded-2xl border border-white/[0.08]">
            {comparisons.map((row) => (
              <div key={row.aspect} className="p-5">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
                  {row.aspect}
                </span>
                <div className="mt-3.5 space-y-3">
                  <div className="flex gap-2.5 rounded-xl border border-[#00FFFF]/18 bg-[#00FFFF]/[0.05] p-3">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#00FFFF]" strokeWidth={2.5} />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-[#00FFFF]/70">
                        Cozybytes
                      </span>
                      <p className="mt-1 text-[13px] leading-relaxed text-[#00FFFF]">{row.cozy}</p>
                    </div>
                  </div>
                  <div className="flex gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.012] p-3">
                    <X className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white/25" strokeWidth={2.5} />
                    <div>
                      <span className="block text-[10px] font-bold uppercase tracking-wider text-white/35">
                        {activeLabel}
                      </span>
                      <p className="mt-1 text-[13px] leading-relaxed text-white/45">{row[active]}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
