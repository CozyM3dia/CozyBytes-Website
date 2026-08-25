import { motion } from 'framer-motion'
import { EASE, featuresList } from './data'
import type { Feature } from './data'
import { Reveal, SectionHeading, SpotlightCard } from '../../components/section/motion'

/**
 * Kartu fitur. Ikon dibaca dari `featuresList[].icon`, tidak di-hardcode di
 * JSX, supaya urutan data dan urutan ikon tidak bisa lepas sinkron.
 */
function Card({
  feature,
  index,
  className = '',
  featured = false,
}: {
  feature: Feature
  index: number
  className?: string
  featured?: boolean
}) {
  const Icon = feature.icon
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: EASE }}
      className={className}
    >
      <SpotlightCard
        className={`flex h-full flex-col rounded-2xl border p-6 transition-colors duration-500 md:p-7 ${
          featured
            ? 'border-[#00FFFF]/20 bg-[linear-gradient(140deg,rgba(0,255,255,0.07)_0%,rgba(0,255,255,0.012)_46%,transparent_100%)] hover:border-[#00FFFF]/35'
            : 'border-white/[0.08] bg-white/[0.018] hover:border-[#00FFFF]/22'
        }`}
      >
        {/* Nomor slot funnel — meneruskan motif telemetri dari hero */}
        <div className="relative flex items-start justify-between gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-white/[0.09] bg-white/[0.03] transition-colors duration-500 group-hover/spot:border-[#00FFFF]/35">
            <Icon className="h-[18px] w-[18px] text-[#00FFFF]" strokeWidth={1.6} />
          </span>
          <span className="flex items-center gap-2 rounded-full border border-white/[0.08] bg-black/25 px-2.5 py-1">
            <span aria-hidden className="h-1 w-1 rounded-full bg-[#00FFFF]/70" />
            <span className="font-mono text-[11px] tracking-[0.1em] text-white/50">
              {feature.signal}
            </span>
          </span>
        </div>

        <h3
          className={`relative mt-6 font-display font-medium tracking-tight text-white ${
            featured ? 'text-2xl md:text-[1.75rem]' : 'text-lg'
          }`}
        >
          {feature.title}
        </h3>
        <p
          className={`relative mt-3 text-sm leading-relaxed text-white/52 ${featured ? 'max-w-md' : ''}`}
        >
          {feature.desc}
        </p>

        <span
          aria-hidden
          className="relative mt-auto flex items-center gap-2 pt-7 opacity-45"
        >
          <span className="h-1.5 w-1.5 rotate-45 border border-[#00FFFF]/50" />
          <span className="h-px flex-1 bg-gradient-to-r from-[#00FFFF]/35 to-transparent" />
          <span className="font-mono text-[11px] tabular-nums text-white/40">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>
      </SpotlightCard>
    </motion.article>
  )
}

export default function Capabilities() {
  const [focus, tracking, mobile, speed, whatsapp, copy] = featuresList

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            index="03"
            eyebrow="Fitur Utama"
            title={
              <>
                Satu halaman.{' '}
                <br />
                <span className="font-serif italic text-[#00FFFF]">Satu tujuan.</span>
              </>
            }
          />
          <Reveal delay={0.16}>
            <p className="max-w-xs border-l border-white/10 pl-5 text-sm leading-relaxed text-white/50">
              Enam hal yang kami pasang di setiap landing page, dari struktur penawaran sampai jalur
              pelacakannya.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-4 md:grid-cols-6">
          <Card feature={focus} index={0} featured className="md:col-span-4" />
          <Card feature={tracking} index={1} className="md:col-span-2" />
          <Card feature={mobile} index={2} className="md:col-span-2" />
          <Card feature={speed} index={3} className="md:col-span-2" />
          <Card feature={whatsapp} index={4} className="md:col-span-2" />
          <Card feature={copy} index={5} featured className="md:col-span-6" />
        </div>
      </div>
    </section>
  )
}
