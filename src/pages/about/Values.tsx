import { motion } from 'framer-motion'
import { EASE, values } from './shared'
import type { Value } from './shared'
import { SectionLabel, Reveal } from './ui'

function ValueRow({ value, index }: { value: Value; index: number }) {
  const number = String(index + 1).padStart(2, '0')
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: EASE }}
      className="group relative grid gap-3 border-b border-white/[0.08] py-10 transition-colors duration-500 hover:bg-white/[0.015] md:grid-cols-12 md:items-start md:gap-6"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 70% 120% at 0% 50%, rgba(0,255,255,0.06), transparent 60%)',
        }}
      />
      <div className="relative font-serif text-6xl leading-none select-none md:col-span-3 md:text-7xl">
        <span
          style={{ WebkitTextStroke: '1px rgba(255,255,255,0.18)', color: 'transparent' }}
        >
          {number}
        </span>
        <span className="absolute inset-0 text-[#00FFFF] opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {number}
        </span>
      </div>
      <div className="md:col-span-9">
        <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1.5 md:text-3xl">
          {value.title}
        </h3>
        <p className="mt-3 max-w-lg text-base leading-relaxed text-white/55">{value.desc}</p>
      </div>
    </motion.div>
  )
}

export default function Values() {
  return (
    <section id="nilai" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-12 lg:gap-20">
        <Reveal className="lg:col-span-5">
          <div className="self-start lg:sticky lg:top-32">
            <SectionLabel index="04" title="Nilai Kami" />
            <h2 className="font-display text-4xl font-medium leading-[1.06] tracking-tight md:text-5xl">
              Tiga prinsip
              <br />
              yang kami{' '}
              <span className="font-serif italic text-[#00FFFF]">pegang.</span>
            </h2>
            <p className="mt-6 max-w-xs text-base leading-relaxed text-white/50">
              Bukan slogan di dinding — ini cara kami memperlakukan setiap proyek dan setiap klien.
            </p>
            <div className="ml-1 mt-10 hidden h-24 w-px bg-gradient-to-b from-[#00FFFF]/50 to-transparent lg:block" />
          </div>
        </Reveal>
        <div className="border-t border-white/[0.08] lg:col-span-7">
          {values.map((value, i) => (
            <ValueRow key={value.title} value={value} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
