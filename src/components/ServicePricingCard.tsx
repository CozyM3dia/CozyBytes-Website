import { motion } from 'framer-motion'
import { Check, MessageCircle, Star, X } from 'lucide-react'

export type Feature = {
  label: React.ReactNode
  available: boolean
  badges?: string[]
}

export type PricingTier = {
  name: string
  subtitle: string
  tagline: string
  oldPrice?: string
  savings?: string
  price: string
  period: string
  discount: string
  discountTone: 'cyan' | 'gold' | 'violet'
  cta: string
  highlighted?: boolean
  specialBadge?: string
  buttonTone: 'cyan' | 'gold' | 'dark'
  ctaHref: string
  features: Feature[]
}

const discountClasses = {
  cyan: 'border-[#00FFFF]/30 bg-[#00FFFF]/10 text-[#00FFFF]',
  gold: 'border-[#F8D16A]/50 bg-[#F8D16A]/15 text-[#F8D16A]',
  violet: 'border-violet-300/40 bg-violet-400/15 text-violet-200',
}

const buttonClasses = {
  cyan: 'bg-[#00FFFF] text-black shadow-[0_0_28px_rgba(0,255,255,0.28)] hover:shadow-[0_0_42px_rgba(0,255,255,0.38)]',
  gold: 'bg-[#F8D16A] text-[#171103] shadow-[0_0_34px_rgba(248,209,106,0.35)] hover:shadow-[0_0_54px_rgba(248,209,106,0.48)]',
  dark: 'bg-[#08080b] text-white border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.45)] hover:border-violet-200/40',
}

function FeatureRow({ feature }: { feature: Feature }) {
  return (
    <li className={`flex items-start gap-3 text-sm leading-relaxed ${feature.available ? 'text-white/76' : 'text-white/28 line-through'}`}>
      <span className={`mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full ${feature.available ? 'bg-emerald-400/12 text-emerald-300' : 'bg-white/[0.03] text-white/25'}`}>
        {feature.available ? <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> : <X className="h-3.5 w-3.5" strokeWidth={2.5} />}
      </span>
      <span className="min-w-0">
        {feature.label}
        {feature.badges?.map((badge) => (
          <span key={badge} className="ml-2 inline-flex translate-y-[-1px] rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/10 px-2 py-0.5 text-[10px] font-bold tracking-wider text-[#00FFFF]">
            {badge}
          </span>
        ))}
      </span>
    </li>
  )
}

export function PricingCard({ tier, index, inView }: { tier: PricingTier; index: number; inView: boolean }) {
  const cardInner = (
    <>
      <div className={`pointer-events-none absolute inset-x-8 top-0 h-px ${tier.highlighted ? 'bg-gradient-to-r from-transparent via-[#F8D16A] to-transparent' : 'bg-gradient-to-r from-transparent via-[#00FFFF]/40 to-transparent'}`} />
      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div className="absolute -right-24 top-12 h-56 w-56 rounded-full bg-[#00FFFF]/10 blur-3xl" />
        <div className="absolute -bottom-20 left-8 h-52 w-52 rounded-full bg-[#F8D16A]/10 blur-3xl" />
      </div>

      <div className={`relative z-10 flex flex-1 flex-col rounded-[26.5px] px-6 py-7 md:px-7 ${tier.highlighted ? 'bg-[#050507]' : 'bg-[#050507]/88 backdrop-blur-xl'}`}>
        <div className="mb-5 flex min-h-9 flex-wrap items-center justify-between gap-2">
          <span className={`rounded-full border px-3 py-1 text-xs font-bold tracking-widest ${discountClasses[tier.discountTone]}`}>
            {tier.discount}
          </span>
          {tier.specialBadge && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-[#F8D16A]/35 bg-[#F8D16A]/12 px-3 py-1 text-xs font-bold text-[#F8D16A]">
              <Star className="h-3.5 w-3.5 fill-current" />
              {tier.specialBadge}
            </span>
          )}
        </div>

        <div className="mb-6">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-white/38">{tier.subtitle}</p>
          <h3 className={`font-display mt-1 text-4xl font-medium leading-none tracking-tight md:text-5xl ${tier.highlighted ? 'text-[#F8D16A]' : 'text-white'}`}>
            {tier.name}
          </h3>
          <p className="mt-4 min-h-[3.25rem] text-sm leading-relaxed text-white/52">{tier.tagline}</p>
        </div>

        <div className="mb-7 rounded-2xl border border-white/8 bg-white/[0.025] p-4">
          {tier.oldPrice && (
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <span className="text-white/34 line-through">{tier.oldPrice}</span>
              {tier.savings && <span className="rounded-full bg-emerald-400/10 px-2.5 py-1 text-xs font-bold text-emerald-300">{tier.savings}</span>}
            </div>
          )}
          <div className={`${tier.oldPrice ? 'mt-2' : ''} text-3xl font-black tracking-tight text-white md:text-[2.35rem]`}>{tier.price}</div>
          <p className="mt-2 text-xs font-medium text-white/40">{tier.period}</p>
        </div>

        <motion.a
          href={tier.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          whileTap={{ scale: 0.98 }}
          className={`mb-7 inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3.5 text-sm font-black transition-all ${buttonClasses[tier.buttonTone]}`}
        >
          <MessageCircle className="h-4 w-4" />
          {tier.cta}
        </motion.a>

        <ul className="flex flex-1 flex-col gap-3.5">
          {tier.features.map((feature, i) => (
            <FeatureRow key={`${tier.name}-${i}`} feature={feature} />
          ))}
        </ul>
      </div>
    </>
  )

  if (tier.highlighted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 46, scale: 1.02 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1.04 } : {}}
        transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: -10, scale: 1.055, transition: { duration: 0.24, ease: 'easeOut' } }}
        className="group relative flex h-full w-full min-h-full flex-col md:-translate-y-3"
      >
        <svg className="pointer-events-none absolute inset-0 h-full w-full" style={{ zIndex: 20, overflow: 'visible' }} fill="none">
          <rect style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', x: '1px', y: '1px', rx: '27px', fill: 'none', stroke: 'rgba(248,209,106,0.14)', strokeWidth: '1.5' }} />
          <rect style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', x: '1px', y: '1px', rx: '27px', fill: 'none', stroke: 'rgba(248,209,106,0.55)', strokeWidth: '7', strokeLinecap: 'round', strokeDasharray: '80 2920', animation: 'svgBorderTrail 4s linear infinite', filter: 'blur(5px)' }} />
          <rect style={{ width: 'calc(100% - 2px)', height: 'calc(100% - 2px)', x: '1px', y: '1px', rx: '27px', fill: 'none', stroke: '#F8D16A', strokeWidth: '2', strokeLinecap: 'round', strokeDasharray: '80 2920', animation: 'svgBorderTrail 4s linear infinite' }} />
        </svg>
        <article className="relative flex h-full w-full min-h-full flex-col overflow-hidden rounded-[28px] bg-[#050507] shadow-[0_0_80px_rgba(248,209,106,0.12),0_0_90px_rgba(0,255,255,0.06)]">
          {cardInner}
        </article>
      </motion.div>
    )
  }

  return (
    <motion.article
      initial={{ opacity: 0, y: 46, scale: 0.98 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.65, delay: 0.12 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -7, scale: 1.015, transition: { duration: 0.24, ease: 'easeOut' } }}
      className="group relative flex h-full w-full min-h-full flex-col overflow-hidden rounded-[28px] border border-white/10 p-1 bg-white/[0.018] shadow-[0_26px_70px_rgba(0,0,0,0.28)]"
    >
      {cardInner}
    </motion.article>
  )
}
