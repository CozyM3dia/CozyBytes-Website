import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'
import { capabilities, EASE } from './data'
import type { Capability, CapabilityVisual } from './data'
import { Reveal, SectionHeading, SpotlightCard } from './motion'

/* ================================================================== *
 * Visual bespoke per kapabilitas. Semua CSS/SVG, tanpa aset gambar,
 * dan berhenti bergerak saat pengguna minta reduced motion.
 * ================================================================== */

function DesignVisual() {
  return (
    <div aria-hidden className="relative h-full w-full">
      {/* Tumpukan artboard yang saling geser saat hover */}
      <div className="absolute right-6 top-1/2 h-[78%] w-[52%] -translate-y-1/2">
        <div className="absolute inset-0 translate-x-6 translate-y-5 rotate-[6deg] rounded-xl border border-white/[0.07] bg-white/[0.015] transition-transform duration-700 group-hover/spot:translate-x-9 group-hover/spot:rotate-[9deg]" />
        <div className="absolute inset-0 translate-x-3 translate-y-2.5 rotate-[3deg] rounded-xl border border-white/[0.09] bg-[#0c0c10] transition-transform duration-700 group-hover/spot:translate-x-5 group-hover/spot:rotate-[5deg]" />
        <div className="absolute inset-0 overflow-hidden rounded-xl border border-[#00FFFF]/25 bg-[#08080b] shadow-[0_22px_60px_rgba(0,0,0,0.55)] transition-transform duration-700 group-hover/spot:-translate-y-1.5">
          <div className="flex items-center gap-1 border-b border-white/[0.06] px-3 py-2">
            <span className="h-1 w-1 rounded-full bg-[#00FFFF]/60" />
            <span className="h-1 w-1 rounded-full bg-white/20" />
            <span className="h-1 w-1 rounded-full bg-white/20" />
          </div>
          <div className="space-y-2 p-3.5">
            <div className="h-1.5 w-2/3 rounded-full bg-[#00FFFF]/45" />
            <div className="h-1 w-full rounded-full bg-white/12" />
            <div className="h-1 w-5/6 rounded-full bg-white/10" />
            <div className="mt-3 grid grid-cols-3 gap-1.5">
              <div className="h-6 rounded bg-white/[0.05]" />
              <div className="h-6 rounded bg-white/[0.05]" />
              <div className="h-6 rounded bg-[#00FFFF]/12" />
            </div>
          </div>
        </div>
      </div>
      {/* Garis ukur bergaya blueprint */}
      <div className="absolute bottom-5 left-6 right-6 flex items-center gap-2 opacity-40">
        <span className="h-2 w-px bg-[#00FFFF]/50" />
        <span className="h-px flex-1 bg-gradient-to-r from-[#00FFFF]/40 to-transparent" />
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/35">12 COL</span>
      </div>
    </div>
  )
}

function MobileVisual() {
  return (
    <div aria-hidden className="relative flex h-full w-full items-end justify-center gap-3 pb-1">
      {[
        { w: 'w-9', h: 'h-14', label: '360' },
        { w: 'w-14', h: 'h-20', label: '768' },
        { w: 'w-20', h: 'h-24', label: '1440' },
      ].map((d, i) => (
        <div key={d.label} className="flex flex-col items-center gap-1.5">
          <div
            className={`${d.w} ${d.h} overflow-hidden rounded-md border border-white/12 bg-[#0a0a0d] transition-all duration-500 group-hover/spot:border-[#00FFFF]/35`}
            style={{ transitionDelay: `${i * 70}ms` }}
          >
            <div className="h-1 w-full bg-[#00FFFF]/30" />
            <div className="space-y-1 p-1.5">
              <div className="h-[3px] w-3/4 rounded-full bg-white/20" />
              <div className="h-[3px] w-full rounded-full bg-white/10" />
              <div className="h-[3px] w-2/3 rounded-full bg-white/10" />
            </div>
          </div>
          <span className="font-mono text-[7px] text-white/25">{d.label}</span>
        </div>
      ))}
    </div>
  )
}

function SpeedVisual() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="relative flex h-full w-full flex-col justify-center gap-3 px-1">
      {[
        { label: 'Cozybytes', value: 96, tone: 'bg-[#00FFFF]', text: 'text-[#00FFFF]', ms: '0.4s' },
        { label: 'Template CMS', value: 34, tone: 'bg-white/22', text: 'text-white/35', ms: '3.8s' },
      ].map((bar, i) => (
        <div key={bar.label} className="space-y-1.5">
          <div className="flex items-baseline justify-between">
            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-white/40">
              {bar.label}
            </span>
            <span className={`font-mono text-[10px] font-bold ${bar.text}`}>{bar.ms}</span>
          </div>
          <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <motion.div
              className={`h-full rounded-full ${bar.tone}`}
              initial={reduce ? { width: `${bar.value}%` } : { width: 0 }}
              whileInView={{ width: `${bar.value}%` }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 1.1, delay: 0.15 + i * 0.18, ease: EASE }}
            />
          </div>
        </div>
      ))}
      <span className="mt-1 font-mono text-[8px] tracking-[0.18em] text-white/22">
        LARGEST CONTENTFUL PAINT
      </span>
    </div>
  )
}

function SeoVisual() {
  return (
    <div aria-hidden className="relative h-full w-full">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(rgba(0,255,255,0.16) 1px, transparent 1px)',
          backgroundSize: '17px 17px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, black, transparent 76%)',
          WebkitMaskImage: 'radial-gradient(ellipse 70% 70% at 50% 45%, black, transparent 76%)',
          opacity: 0.5,
        }}
      />
      <div className="relative flex h-full flex-col justify-center gap-1.5">
        {[
          { rank: '01', w: 'w-[86%]', active: true },
          { rank: '02', w: 'w-[70%]', active: false },
          { rank: '03', w: 'w-[58%]', active: false },
        ].map((row) => (
          <div key={row.rank} className="flex items-center gap-2.5">
            <span
              className={`font-mono text-[9px] font-bold ${row.active ? 'text-[#00FFFF]' : 'text-white/22'}`}
            >
              {row.rank}
            </span>
            <div
              className={`${row.w} rounded-r-full py-1.5 pl-2.5 pr-3 transition-all duration-500 ${
                row.active
                  ? 'border border-[#00FFFF]/25 bg-[#00FFFF]/[0.07] group-hover/spot:w-[94%]'
                  : 'border border-white/[0.06] bg-white/[0.015]'
              }`}
            >
              <div
                className={`h-1 rounded-full ${row.active ? 'w-2/3 bg-[#00FFFF]/60' : 'w-1/2 bg-white/15'}`}
              />
              <div className="mt-1 h-[3px] w-full rounded-full bg-white/[0.08]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

function SecurityVisual() {
  const reduce = useReducedMotion()
  return (
    <div aria-hidden className="relative grid h-full w-full place-items-center">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="absolute rounded-full border border-[#00FFFF]/12"
          style={{
            width: `${44 + i * 30}%`,
            aspectRatio: '1',
            animation: reduce ? undefined : `ring-breathe ${8 + i * 2}s ease-in-out infinite`,
            animationDelay: `${i * -1.6}s`,
          }}
        />
      ))}
      <div className="relative flex flex-col items-center gap-2">
        <svg viewBox="0 0 24 28" className="h-9 w-9" fill="none">
          <path
            d="M12 1.5 22 5v9c0 6.2-4.2 11-10 12.5C6.2 25 2 20.2 2 14V5l10-3.5Z"
            stroke="rgba(0,255,255,0.55)"
            strokeWidth="1.2"
            fill="rgba(0,255,255,0.05)"
          />
          <path
            d="m8 13.6 2.9 2.9L16.4 11"
            stroke="#00FFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-mono text-[8px] tracking-[0.2em] text-white/35">NO SQL · NO PLUGIN</span>
      </div>
    </div>
  )
}

function CodeVisual() {
  const lines = [
    { indent: 0, w: 'w-[58%]', tone: 'bg-[#00FFFF]/40' },
    { indent: 1, w: 'w-[74%]', tone: 'bg-white/14' },
    { indent: 2, w: 'w-[52%]', tone: 'bg-white/10' },
    { indent: 1, w: 'w-[66%]', tone: 'bg-white/12' },
    { indent: 0, w: 'w-[40%]', tone: 'bg-[#00FFFF]/28' },
  ]
  return (
    <div aria-hidden className="relative h-full w-full">
      <div className="flex h-full flex-col justify-center gap-2 font-mono">
        {lines.map((l, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="w-3 text-right text-[8px] text-white/18">{i + 1}</span>
            <span
              className={`h-1.5 rounded-full ${l.w} ${l.tone}`}
              style={{ marginLeft: l.indent * 10 }}
            />
          </div>
        ))}
      </div>
      <span className="absolute bottom-0 right-0 rounded-md border border-white/[0.08] bg-white/[0.02] px-2 py-1 font-mono text-[8px] tracking-[0.14em] text-white/35">
        main → yours
      </span>
    </div>
  )
}

const VISUALS: Record<CapabilityVisual, () => ReactNode> = {
  design: DesignVisual,
  mobile: MobileVisual,
  speed: SpeedVisual,
  seo: SeoVisual,
  security: SecurityVisual,
  code: CodeVisual,
}

/* ================================================================== *
 * Kartu
 * ================================================================== */

function Card({
  cap,
  index,
  className = '',
  visualClass = '',
  featured = false,
}: {
  cap: Capability
  index: number
  className?: string
  visualClass?: string
  featured?: boolean
}) {
  const Visual = VISUALS[cap.visual]
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
      className={className}
    >
      <SpotlightCard
        className={`flex h-full flex-col rounded-2xl border p-6 transition-colors duration-500 md:p-7 ${
          featured
            ? 'border-[#00FFFF]/20 bg-[linear-gradient(140deg,rgba(0,255,255,0.07)_0%,rgba(0,255,255,0.012)_45%,transparent_100%)] hover:border-[#00FFFF]/35'
            : 'border-white/[0.08] bg-white/[0.018] hover:border-[#00FFFF]/22'
        }`}
      >
        <div className="relative flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.03] transition-colors duration-500 group-hover/spot:border-[#00FFFF]/35">
            <cap.Icon className="h-[18px] w-[18px] text-[#00FFFF]" strokeWidth={1.6} />
          </span>
          <span className="rounded-full border border-white/[0.07] bg-black/25 px-2.5 py-1 font-mono text-[9px] tracking-[0.12em] text-white/38">
            {cap.metric}
          </span>
        </div>

        <h3
          className={`relative mt-6 font-display font-medium tracking-tight text-white ${featured ? 'text-2xl md:text-[1.75rem]' : 'text-lg'}`}
        >
          {cap.title}
        </h3>
        <p
          className={`relative mt-3 text-sm leading-relaxed text-white/52 ${featured ? 'max-w-sm' : ''}`}
        >
          {cap.desc}
        </p>

        <div className={`relative mt-6 flex-1 ${visualClass}`}>
          <Visual />
        </div>
      </SpotlightCard>
    </motion.div>
  )
}

export default function Capabilities() {
  const [design, mobile, speed, seo, security, code] = capabilities

  return (
    <section className="relative py-24 md:py-32">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="02"
            eyebrow="Keunggulan Layanan"
            title={
              <>
                Bersih, cepat,{' '}
                <br />
                <span className="font-serif italic text-[#00FFFF]">dan handal.</span>
              </>
            }
          />
          <Reveal delay={0.16}>
            <p className="max-w-xs border-l border-white/10 pl-5 text-sm leading-relaxed text-white/45">
              Enam standar teknis yang kami terapkan di setiap proyek, bukan daftar fitur tambahan
              berbayar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Card
            cap={design}
            index={0}
            featured
            className="md:col-span-4"
            visualClass="min-h-[190px]"
          />
          <Card cap={speed} index={1} className="md:col-span-2" visualClass="min-h-[130px]" />
          <Card cap={mobile} index={2} className="md:col-span-2" visualClass="min-h-[120px]" />
          <Card cap={seo} index={3} className="md:col-span-2" visualClass="min-h-[120px]" />
          <Card cap={security} index={4} className="md:col-span-2" visualClass="min-h-[120px]" />
          <Card cap={code} index={5} className="md:col-span-6" visualClass="min-h-[110px]" />
        </div>
      </div>
    </section>
  )
}
