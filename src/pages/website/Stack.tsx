import { Check } from 'lucide-react'
import { BrandIcon } from '../../components/icons/brand'
import { techStack } from './data'
import { Reveal, SectionHeading } from './motion'

const GUARANTEES = [
  'Penyerahan repository Git',
  'Integrasi serverless cepat',
  'Dokumentasi teknis mudah dipahami',
]

function Row({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const animation = reverse
    ? '[animation:marquee-reverse_38s_linear_infinite]'
    : '[animation:marquee_32s_linear_infinite]'

  // Jarak antar pill dipasang sebagai mr-3 di tiap pill, bukan gap-3 di track.
  // Dengan gap di track, 24 anak hanya menghasilkan 23 jarak, sehingga -50%
  // berhenti setengah jarak lebih awal dan loop tersentak ±6px tiap putaran.
  // Sebagai margin, tiap salinan membawa jarak penutupnya sendiri dan lebar
  // kedua salinan identik — perpindahan -50% jatuh tepat di batas salinan.
  const copy = (hidden: boolean) => (
    <div className="flex" aria-hidden={hidden || undefined}>
      {items.map((tech) => (
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
    // Mask dipasang di wrapper pemotong, bukan di track yang bergerak, supaya
    // gradasi tepi tetap diam dan konsisten di kedua sisi.
    <div className="group/row mask-fade-x relative overflow-hidden">
      {/* Salinan kedua hanya pengisi visual agar loop mulus, jadi disembunyikan
          dari screen reader supaya 12 nama teknologi tidak dibacakan dua kali. */}
      <div
        className={`flex w-max will-change-transform ${animation} group-hover/row:[animation-play-state:paused] motion-reduce:animate-none`}
      >
        {copy(false)}
        {copy(true)}
      </div>
    </div>
  )
}

export default function Stack() {
  // Kedua baris memakai seluruh stack, hanya titik awalnya digeser separuh
  // supaya baris atas dan bawah tidak sejajar memperlihatkan item yang sama.
  const half = Math.ceil(techStack.length / 2)
  const rowTop = techStack
  const rowBottom = [...techStack.slice(half), ...techStack.slice(0, half)]

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="04"
          eyebrow="Perangkat Kerja"
          title={
            <>
              Teknologi yang kami pakai{' '}
              {/* Break hanya di md+. Di mobile "Teknologi yang kami pakai" sudah
                  wrap sendiri, jadi <br /> yang tanpa syarat menyisakan baris
                  tengah berisi satu kata ("pakai"). */}
              <br className="hidden md:inline" />
              <span className="font-serif italic text-white/35">setiap hari.</span>
            </>
          }
        />
      </div>

      {/* Dua baris berlawanan arah, diberi perspektif tipis agar berdimensi */}
      <div
        className="mt-12 space-y-3"
        style={{ perspective: '900px' }}
      >
        <div style={{ transform: 'rotateX(7deg)' }}>
          <Row items={rowTop} />
        </div>
        <div style={{ transform: 'rotateX(-7deg)' }}>
          <Row items={rowBottom} reverse />
        </div>
      </div>

      <div className="mx-auto mt-12 max-w-6xl px-5 md:px-8">
        <Reveal delay={0.1}>
          <ul className="flex flex-wrap gap-x-8 gap-y-2.5">
            {GUARANTEES.map((g) => (
              <li key={g} className="flex items-center gap-2 text-xs text-white/42">
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
