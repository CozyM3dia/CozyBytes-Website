import { Fragment, useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { SectionLabel, Reveal } from './ui'

const STATEMENT =
  'Di Bandar Lampung, Cozybytes Media lahir dari tiga pemuda yang percaya setiap bisnis — sekecil apa pun — berhak punya representasi digital yang premium.'

const STATEMENT_CLASS =
  'font-display text-3xl font-medium leading-[1.25] tracking-tight text-white sm:text-4xl md:text-[2.9rem]'

interface WordProps {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  accent?: boolean
}

function Word({ children, progress, range, accent }: WordProps) {
  const opacity = useTransform(progress, range, [0.12, 1])
  return (
    <motion.span
      style={{ opacity }}
      className={accent ? 'font-serif italic text-[#00FFFF]' : undefined}
    >
      {children}
    </motion.span>
  )
}

export default function Manifesto() {
  const reduce = useReducedMotion()
  const statementRef = useRef<HTMLDivElement>(null)
  const imgRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: statementRef,
    offset: ['start 0.85', 'start 0.35'],
  })

  const { scrollYProgress: imageProgress } = useScroll({
    target: imgRef,
    offset: ['start end', 'end start'],
  })

  const y = useTransform(imageProgress, [0, 1], ['-8%', '8%'])

  const words = STATEMENT.split(' ')
  const total = words.length

  return (
    <section id="manifesto" className="relative px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="01" title="Cerita Kami" />
        </Reveal>

        <div ref={statementRef} className="mt-4">
          {reduce ? (
            <p className={STATEMENT_CLASS}>{STATEMENT}</p>
          ) : (
            <p className={STATEMENT_CLASS}>
              {words.map((word, i) => (
                <Fragment key={`${word}-${i}`}>
                  {i > 0 ? ' ' : null}
                  <Word
                    progress={scrollYProgress}
                    range={[i / total, (i + 1) / total]}
                    accent={word.startsWith('premium')}
                  >
                    {word}
                  </Word>
                </Fragment>
              ))}
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-12 items-start md:mt-24 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <div
              ref={imgRef}
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)]"
            >
              <div className="aspect-[4/5] overflow-hidden rounded-2xl">
                <motion.img
                  src="/about_story.jpg"
                  alt="Ruang kerja tim Cozybytes Media di Bandar Lampung"
                  width={900}
                  height={900}
                  loading="lazy"
                  decoding="async"
                  style={{ y: reduce ? '0%' : y }}
                  className="h-full w-full scale-[1.15] object-cover"
                />
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
              <span>Studio kami — Bandar Lampung</span>
              <span className="h-1.5 w-1.5 bg-[#00FFFF]/60" />
            </div>
          </Reveal>

          <div className="space-y-6 text-lg leading-relaxed text-white/60 lg:col-span-7">
            <Reveal>
              <p>
                Sebagai tim yang juga merintis, kami paham betul tantangan UMKM dan startup lokal.
                Anggaran terbatas sering jadi penghalang website berkualitas. Di situlah kami
                hadir — menjembatani jaraknya.
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <p>
                Kami gabungkan estetika modern, keahlian teknis (SEO &amp; UI/UX), dan copywriting
                yang berpusat pada konversi. Bukan sekadar bikin website — kami merancang{' '}
                <span className="text-[#00FFFF]">aset digital</span> yang bekerja siang-malam
                untukmu.
              </p>
            </Reveal>
            <div className="mt-8 h-px w-16 bg-gradient-to-r from-[#00FFFF]/50 to-transparent" />
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
              Sejak hari pertama · dibangun dengan niat
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
