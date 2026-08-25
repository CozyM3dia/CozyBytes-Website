import { Check } from 'lucide-react'
import { BrandIcon } from '../../components/icons/brand'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { stackGuarantees, techStack } from './data'

/* ================================================================== *
 * Marquee satu baris. Jarak antar pill memakai mr-3 per pill, bukan
 * gap-3 di track: dengan gap, 24 anak hanya menghasilkan 23 jarak
 * sehingga perpindahan -50% berhenti setengah jarak lebih awal dan
 * loop tersentak tiap putaran. Salinan kedua aria-hidden agar 12 nama
 * teknologi tidak dibacakan dua kali.
 * ================================================================== */

function Row() {
  const copy = (hidden: boolean) => (
    <div className="flex" aria-hidden={hidden || undefined}>
      {techStack.map((tech) => (
        <span
          key={tech}
          className="mr-3 flex shrink-0 items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-3 transition-colors duration-300 hover:border-[#00FFFF]/30 hover:bg-[#00FFFF]/[0.04]"
        >
          <BrandIcon name={tech} className="h-[17px] w-[17px] shrink-0 text-white/50" />
          <span className="whitespace-nowrap font-mono text-[13px] text-white/65">{tech}</span>
        </span>
      ))}
    </div>
  )

  return (
    // Mask dipasang di wrapper pemotong supaya gradasi tepi tetap diam
    // saat track bergerak.
    <div className="group/row mask-fade-x relative overflow-hidden">
      <div className="flex w-max will-change-transform [animation:marquee_30s_linear_infinite] group-hover/row:[animation-play-state:paused] motion-reduce:animate-none">
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}

export default function Stack() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Fondasi Teknis"
          title={
            <>
              Fondasi teknis{' '}
              <span className="font-serif italic text-white/35">toko Anda.</span>
            </>
          }
        />
      </div>

      <div className="mt-12">
        <Row />
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <Reveal delay={0.1}>
          <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
            {stackGuarantees.map((g) => (
              <li key={g} className="flex items-center gap-2 text-xs text-white/50">
                <Check className="h-3.5 w-3.5 shrink-0 text-[#00FFFF]" strokeWidth={2.5} />
                {g}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
