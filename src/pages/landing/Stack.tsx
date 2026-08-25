import { Check } from 'lucide-react'
import { BrandIcon } from '../../components/icons/brand'
import { stackGuarantees, techStack } from './data'
import { Reveal, SectionHeading } from '../../components/section/motion'

// Jarak antar pill dipasang sebagai mr-3 di tiap pill, bukan gap-3 di track.
// Dengan gap di track, 24 anak hanya menghasilkan 23 jarak, sehingga -50%
// berhenti setengah jarak lebih awal dan loop tersentak ±6px tiap putaran.
// Sebagai margin, tiap salinan membawa jarak penutupnya sendiri dan lebar
// kedua salinan identik — perpindahan -50% jatuh tepat di batas salinan.
function Bus({ items }: { items: string[] }) {
  const copy = (hidden: boolean) => (
    <div className="flex" aria-hidden={hidden || undefined}>
      {items.map((tech) => (
        <span
          key={tech}
          className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-3 transition-colors duration-300 hover:border-[#00FFFF]/30 hover:bg-[#00FFFF]/[0.04]"
        >
          <BrandIcon name={tech} className="h-[17px] w-[17px] shrink-0 text-white/55" />
          <span className="whitespace-nowrap font-mono text-[13px] text-white/70">{tech}</span>
        </span>
      ))}
    </div>
  )

  // Mask dipasang di wrapper pemotong, bukan di track yang bergerak, supaya
  // gradasi tepi tetap diam dan konsisten di kedua sisi.
  return (
    <div className="group/bus mask-fade-x relative overflow-hidden py-1">
      {/* Salinan kedua hanya pengisi visual agar loop mulus, jadi disembunyikan
          dari screen reader supaya 12 nama teknologi tidak dibacakan dua kali. */}
      <div className="flex w-max will-change-transform [animation:marquee_34s_linear_infinite] group-hover/bus:[animation-play-state:paused] motion-reduce:animate-none">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section className="relative overflow-hidden py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="05"
          eyebrow="Perangkat Kerja"
          title={
            <>
              Infrastruktur ringan,{' '}
              <br className="hidden md:inline" />
              <span className="font-serif italic text-white/35">siap pasang pixel.</span>
            </>
          }
        />

        {/* Panel instrumen: satu jalur sinyal berisi seluruh perangkat kerja */}
        <Reveal delay={0.08}>
          <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.008]">
            <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-black/30 px-5 py-3">
              <span className="flex items-center gap-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.6s_ease-in-out_infinite]" />
                <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/55">
                  Jalur sinyal
                </span>
              </span>
              <span className="font-mono text-[11px] tabular-nums text-white/50">
                {techStack.length} perangkat
              </span>
            </div>

            <div className="px-3 py-5">
              <Bus items={techStack} />
            </div>

            <ul className="flex flex-wrap gap-x-8 gap-y-2.5 border-t border-white/[0.07] bg-black/20 px-5 py-4">
              {stackGuarantees.map((g) => (
                <li key={g} className="flex items-center gap-2 text-xs text-white/55">
                  <Check className="h-3.5 w-3.5 shrink-0 text-[#00FFFF]" strokeWidth={2.5} />
                  {g}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
