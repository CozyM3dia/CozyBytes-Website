import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { LightCone } from '../../components/atmosphere'
import { PricingCard } from '../../components/ServicePricingCard'
import { Reveal, SectionHeading } from '../../components/section/motion'
import { tiers, WA_LINK } from './data'

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="harga" ref={ref} className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
      <LightCone tint="gold" className="left-1/2 -translate-x-1/2 -top-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(248,209,106,0.055) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-14 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            index="06"
            eyebrow="Investasi"
            title={
              <>
                Pilih paket desain{' '}
                <span className="font-serif italic text-[#F8D16A]">UI/UX website Anda.</span>
              </>
            }
            deck="Investasikan anggaran pada tampilan web yang meyakinkan calon pembeli."
            className="max-w-2xl"
          />
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-white/50">
            Butuh desain UI/UX untuk aplikasi Android/iOS atau dashboard admin khusus?{' '}
            <a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#00FFFF] decoration-[#00FFFF]/40 underline-offset-4 hover:underline"
            >
              Konsultasikan custom requirements Anda
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
