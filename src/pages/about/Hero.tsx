import { useRef } from 'react'
import type { MouseEvent, ReactNode } from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { MapPin, Users } from 'lucide-react'
import { EASE, SPRING, teamMembers } from './shared'
import type { TeamMember } from './shared'

const LINE_DELAYS = [0.05, 0.18, 0.31]

const CARD_POSITIONS = [
  'left-0 top-6 w-[58%] z-20 rotate-[-6deg]',
  'right-0 top-0 w-[52%] z-10 rotate-[4deg]',
  'left-[22%] bottom-0 w-[56%] z-30 rotate-[2deg]',
]

function HeadlineLine({
  children,
  delayIndex,
}: {
  children: ReactNode
  delayIndex: number
}) {
  const reduce = useReducedMotion()
  return (
    <div className="overflow-hidden">
      <motion.span
        className="block"
        initial={reduce ? false : { y: '110%' }}
        animate={{ y: 0 }}
        transition={{ duration: 0.9, delay: LINE_DELAYS[delayIndex], ease: EASE }}
      >
        {children}
      </motion.span>
    </div>
  )
}

function PortraitCard({
  member,
  x,
  y,
  index,
}: {
  member: TeamMember
  x: MotionValue<number>
  y: MotionValue<number>
  index: number
}) {
  const reduce = useReducedMotion()
  return (
    <motion.div style={{ x, y }} className={`absolute ${CARD_POSITIONS[index]}`}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.35 + index * 0.14, ease: EASE }}
        className="overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition-colors duration-500 hover:border-[#00FFFF]/30"
      >
        <div className="relative aspect-[4/5] w-full">
          <img
            src={member.image}
            alt={`${member.name}, ${member.role} Cozybytes Media`}
            width={901}
            height={1200}
            loading={index === 0 ? 'eager' : 'lazy'}
            decoding="async"
            className="h-full w-full object-cover saturate-[1.05]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/50 px-3 py-1 font-mono text-[10px] text-white/85 backdrop-blur-md">
            {member.name.split(' ')[0]}
          </span>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PortraitTrio() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  const tx0 = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), SPRING)
  const ty0 = useSpring(useTransform(my, [-0.5, 0.5], [-15, 15]), SPRING)
  const tx1 = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), SPRING)
  const ty1 = useSpring(useTransform(my, [-0.5, 0.5], [11, -11]), SPRING)
  const tx2 = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), SPRING)
  const ty2 = useSpring(useTransform(my, [-0.5, 0.5], [-21, 21]), SPRING)

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-8 rounded-full bg-[#00FFFF]/10 blur-3xl"
      />
      <PortraitCard member={teamMembers[0]} x={tx0} y={ty0} index={0} />
      <PortraitCard member={teamMembers[1]} x={tx1} y={ty1} index={1} />
      <PortraitCard member={teamMembers[2]} x={tx2} y={ty2} index={2} />
    </div>
  )
}

function ScrollCue() {
  const reduce = useReducedMotion()
  return (
    <div
      aria-hidden
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex"
    >
      <span className="font-mono text-[10px] tracking-[0.35em] text-white/30">GULIR</span>
      <motion.div
        className="h-12 w-px origin-top bg-gradient-to-b from-[#00FFFF]/70 to-transparent"
          animate={
            reduce
              ? { scaleY: 1, opacity: 1 }
              : { scaleY: [0, 1, 1], opacity: [0, 1, 0] }
          }
        transition={
          reduce
            ? undefined
            : { duration: 2.2, repeat: Infinity, ease: 'easeInOut', times: [0, 0.6, 1] }
        }
      />
    </div>
  )
}

export default function AboutHero() {
  return (
    <section className="relative overflow-hidden px-6 pt-36 pb-24 md:pt-44">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 72% 0%, rgba(0,255,255,0.07), transparent 65%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '26px 26px',
          maskImage: 'radial-gradient(ellipse 60% 55% at 35% 40%, black 5%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 35% 40%, black 5%, transparent 75%)',
        }}
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 select-none whitespace-nowrap font-display text-[17vw] leading-none"
        style={{ WebkitTextStroke: '1px rgba(255,255,255,0.05)', color: 'transparent' }}
      >
        COZYBYTES
      </span>

      <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-16 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <div className="mb-8 flex items-center gap-3">
            <span className="h-2 w-2 animate-pulse rounded-full bg-[#00FFFF]" />
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-white/50">
              Tentang Kami
            </span>
          </div>

          <h1 className="font-display font-medium leading-[1.02] tracking-tight text-[13vw] sm:text-7xl lg:text-[5.2rem] xl:text-[6rem]">
            <HeadlineLine delayIndex={0}>Tiga kepala.</HeadlineLine>
            <HeadlineLine delayIndex={1}>Satu visi.</HeadlineLine>
            <HeadlineLine delayIndex={2}>
              <span className="font-serif italic text-[#00FFFF]">Dari Lampung</span> untuk
              Indonesia.
            </HeadlineLine>
          </h1>

          <p className="mt-8 max-w-md text-lg leading-relaxed text-white/55">
            Tim kecil dengan mimpi besar — bantu UMKM dan bisnis melangkah percaya diri di dunia
            digital.
          </p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/45">
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} /> Bandar Lampung
            </span>
            <span className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} /> 3 Founder
            </span>
            <span className="font-mono text-xs text-white/35">5.43°S · 105.26°E</span>
          </div>
        </div>

        <div className="lg:col-span-5">
          <PortraitTrio />
        </div>
      </div>

      <ScrollCue />
    </section>
  )
}
