import { useRef } from 'react'
import { useInView } from 'framer-motion'
import { ShieldCheck, Sparkles } from 'lucide-react'
import { LightCone } from '../../components/atmosphere'
import { PricingCard } from '../../components/ServicePricingCard'
import { tiers, WA_LINK } from './data'
import { Reveal, SectionHeading } from './motion'

const assurances = [
  { Icon: ShieldCheck, label: 'Garansi bug 1 tahun' },
  { Icon: Sparkles, label: 'Tanpa biaya wajib bulanan' },
]

export default function Pricing() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="harga" ref={ref} className="relative overflow-hidden py-24 md:py-32">
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
                Bayar sekali.{' '}
                <br />
                <span className="font-serif italic text-[#F8D16A]">Milik Anda selamanya.</span>
              </>
            }
            deck="Pilihan investasi terjangkau tanpa ada biaya tambahan wajib bulanan."
            className="max-w-2xl"
          />

          <Reveal delay={0.14}>
            <ul className="flex flex-col gap-2.5 lg:items-end">
              {assurances.map(({ Icon, label }) => (
                <li key={label} className="flex items-center gap-2.5 text-[13px] text-white/45">
                  <Icon className="h-4 w-4 text-[#F8D16A]/70" strokeWidth={1.6} />
                  {label}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
          {tiers.map((tier, i) => (
            <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="mx-auto mt-14 max-w-xl text-center text-sm leading-relaxed text-white/40">
            Butuh integrasi sistem pendaftaran khusus, sistem booking, atau ingin membuat web
            multi-bahasa?{' '}
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
