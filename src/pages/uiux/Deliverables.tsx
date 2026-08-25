import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { deliverableGroups, EASE } from './data'

/* ================================================================== *
 * Serah terima sebagai lembar spesifikasi berkelompok: hasil nyata
 * lebih dulu, standar teknis kedua, nama alat terakhir — bukan 12
 * pill sejajar dengan bobot yang semua sama.
 * ================================================================== */

export default function Deliverables() {
  return (
    <section className="relative border-t border-white/[0.06] py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Serah Terima"
          title={
            <>
              Yang Anda terima{' '}
              <span className="font-serif italic text-white/35">saat serah terima.</span>
            </>
          }
        />

        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {deliverableGroups.map((group, gi) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, delay: gi * 0.1, ease: EASE }}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
                  {group.label}
                </span>
                <span aria-hidden className="h-px flex-1 bg-white/[0.08]" />
              </div>

              <ul className="mt-4 space-y-2.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.015] px-4 py-3 text-[13px] text-white/70 transition-colors duration-300 hover:border-[#00FFFF]/25 hover:text-white"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-[#00FFFF]" strokeWidth={2.5} />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <Reveal delay={0.12}>
          <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2.5">
            {['Aset Gambar & Ikon Rapi', 'Komponen Fleksibel (Variants)', 'Font Komersil Bebas Lisensi'].map(
              (g) => (
                <li key={g} className="flex items-center gap-2 text-xs text-white/50">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#00FFFF]" strokeWidth={2.5} />
                  {g}
                </li>
              ),
            )}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
