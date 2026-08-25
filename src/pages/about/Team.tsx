import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from 'framer-motion'
import { EASE, SPRING, teamMembers } from './shared'
import type { TeamMember } from './shared'
import { SectionLabel, Reveal } from './ui'
import { LightCone } from '../../components/atmosphere'

function MemberRow({ member, index }: { member: TeamMember; index: number }) {
  const reduce = useReducedMotion()
  const flipped = index % 2 === 1
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, SPRING)
  const sry = useSpring(ry, SPRING)

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 14)
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 14)
  }

  const onLeave = () => {
    rx.set(0)
    ry.set(0)
  }

  return (
    <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
      <div
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group relative lg:col-span-5 ${
          flipped ? 'lg:order-2 lg:col-start-8' : 'lg:order-1 lg:col-start-1'
        }`}
        style={{ perspective: 1000 }}
      >
        <span
          aria-hidden="true"
          className="absolute -left-6 -top-10 z-0 font-serif text-[7rem] leading-none select-none md:text-[9rem]"
          style={{
            WebkitTextStroke: '1px rgba(255,255,255,0.09)',
            color: 'transparent',
          }}
        >
          {String(index + 1).padStart(2, '0')}
        </span>

        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
          className="relative z-10 overflow-hidden rounded-3xl border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.5)] transition-colors duration-500 group-hover:border-[#00FFFF]/30"
        >
          <div className="aspect-[4/5] w-full transition-transform duration-700 group-hover:scale-[1.03]">
            <img
              src={member.image}
              alt={`${member.name}, ${member.role} Cozybytes Media`}
              className="h-full w-full object-cover grayscale-[35%] transition-[filter] duration-700 group-hover:grayscale-0"
              width={901}
              height={1200}
              loading="eager"
              decoding="async"
            />
          </div>

          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/50 px-3.5 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] group-hover:animate-pulse" />
            <span className="font-mono text-[11px] text-white/80">{member.owns}</span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduce ? false : { opacity: 0, x: flipped ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={`lg:col-span-6 ${
          flipped ? 'lg:order-1 lg:col-start-1' : 'lg:order-2 lg:col-start-7'
        }`}
      >
        <span className="inline-flex items-center gap-3">
          <span className="rounded-full border border-[#00FFFF]/30 bg-[#00FFFF]/[0.06] px-3 py-1 font-mono text-[10px] uppercase tracking-[0.2em] text-[#00FFFF]">
            {member.role}
          </span>
          <span className="h-px w-10 bg-white/15" />
          <span className="font-mono text-[10px] tracking-[0.2em] text-white/30">
            {String(index + 1).padStart(2, '0')}
          </span>
        </span>
        <h3 className="mt-5 font-display text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
          {member.name}
        </h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-white/55 md:text-lg">
          {member.desc}
        </p>
      </motion.div>
    </div>
  )
}

export default function Team() {
  return (
    <section id="tim" className="relative overflow-hidden px-6 py-28 md:py-40">
      <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-20" />
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="03" title="Tim Kami" />
          <h2 className="font-display font-medium leading-[1.05] tracking-tight text-4xl md:text-6xl">
            Orang di balik
            <br />
            <span className="font-serif italic text-[#00FFFF]">setiap piksel.</span>
          </h2>
        </Reveal>

        <div className="mt-20 space-y-24 md:mt-28 md:space-y-32">
          {teamMembers.map((member, i) => (
            <MemberRow key={member.name} member={member} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
