import { useCallback, useEffect, useRef, useState } from 'react'
import type { CSSProperties, MouseEvent, ReactNode } from 'react'
import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion'
import { EASE, SOFT_SPRING, SPRING } from './tokens'

/* ================================================================== *
 * SplitLines — mask reveal per baris. Tiap baris punya clip sendiri
 * sehingga descender tidak terpotong seperti pada overflow-hidden biasa.
 * ================================================================== */

export function SplitLines({
  lines,
  className = '',
  delay = 0,
  stagger = 0.09,
  as: Tag = 'span',
}: {
  lines: ReactNode[]
  className?: string
  delay?: number
  stagger?: number
  as?: 'span' | 'div'
}) {
  const reduce = useReducedMotion()
  return (
    <Tag className={className}>
      {lines.map((line, i) => (
        <span key={i} className="block overflow-hidden pb-[0.12em]">
          <motion.span
            className="block will-change-transform"
            initial={reduce ? { opacity: 0 } : { y: '112%' }}
            animate={reduce ? { opacity: 1 } : { y: '0%' }}
            transition={{ duration: 0.95, delay: delay + i * stagger, ease: EASE }}
          >
            {line}
            {/* Spasi pemisah antar baris: tiap baris display:block sehingga
                spasi ini tidak terlihat, tapi textContent tetap terbaca wajar
                oleh screen reader dan crawler. */}
            {i < lines.length - 1 ? ' ' : null}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}

/* ================================================================== *
 * Reveal — fade+rise saat masuk viewport
 * ================================================================== */

export function Reveal({
  children,
  delay = 0,
  y = 26,
  className,
  once = true,
  margin = '-70px',
}: {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
  margin?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin }}
      transition={{ duration: 0.75, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

/* ================================================================== *
 * SectionHeading — eyebrow bernomor + judul + deck
 * ================================================================== */

export function SectionHeading({
  index,
  eyebrow,
  title,
  deck,
  align = 'left',
  className = '',
  accent = '#00FFFF',
}: {
  index: string
  eyebrow: string
  title: ReactNode
  deck?: ReactNode
  align?: 'left' | 'center'
  className?: string
  /** Warna nomor + garis eyebrow. Tiap halaman layanan punya aksen sendiri. */
  accent?: string
}) {
  const centered = align === 'center'
  return (
    <div className={`${centered ? 'mx-auto text-center' : ''} ${className}`}>
      <Reveal>
        <span
          className={`mb-6 flex items-center gap-4 ${centered ? 'justify-center' : ''}`}
        >
          <span className="font-mono text-[11px] font-bold" style={{ color: accent }}>
            {index}
          </span>
          <span
            className="h-px w-12"
            style={{ background: `linear-gradient(to right, ${accent}99, transparent)` }}
          />
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/40">
            {eyebrow}
          </span>
        </span>
      </Reveal>
      <Reveal delay={0.06}>
        <h2 className="font-display text-[2rem] font-medium leading-[1.06] tracking-tight sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {deck && (
        <Reveal delay={0.12}>
          <p
            className={`mt-5 max-w-lg text-[15px] leading-relaxed text-white/50 ${centered ? 'mx-auto' : ''}`}
          >
            {deck}
          </p>
        </Reveal>
      )}
    </div>
  )
}

/* ================================================================== *
 * MagneticButton — CTA yang sedikit tertarik ke arah kursor
 * ================================================================== */

export function MagneticButton({
  href,
  children,
  className = '',
  strength = 12,
  external = true,
  ariaLabel,
}: {
  href: string
  children: ReactNode
  className?: string
  strength?: number
  external?: boolean
  ariaLabel?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, SPRING)
  const y = useSpring(my, SPRING)

  const onMove = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set(((e.clientX - r.left) / r.width - 0.5) * strength * 2)
    my.set(((e.clientY - r.top) / r.height - 0.5) * strength)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      aria-label={ariaLabel}
      {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      onMouseMove={onMove}
      onMouseLeave={reset}
      onBlur={reset}
      style={{ x, y }}
      whileTap={{ scale: 0.97 }}
      className={className}
    >
      {children}
    </motion.a>
  )
}

/* ================================================================== *
 * SpotlightCard — gradient mengikuti kursor di dalam kartu.
 * Posisi ditulis ke CSS custom property agar tidak memicu re-render.
 * ================================================================== */

export function SpotlightCard({
  children,
  className = '',
  tint = 'rgba(0,255,255,0.09)',
  radius = 320,
  style,
}: {
  children: ReactNode
  className?: string
  tint?: string
  radius?: number
  style?: CSSProperties
}) {
  const ref = useRef<HTMLDivElement>(null)

  const onMove = useCallback((e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    el.style.setProperty('--spot-x', `${e.clientX - r.left}px`)
    el.style.setProperty('--spot-y', `${e.clientY - r.top}px`)
  }, [])

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={`group/spot relative overflow-hidden ${className}`}
      style={
        {
          '--spot-x': '50%',
          '--spot-y': '0%',
          ...style,
        } as CSSProperties
      }
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background: `radial-gradient(${radius}px circle at var(--spot-x) var(--spot-y), ${tint}, transparent 72%)`,
        }}
      />
      {children}
    </div>
  )
}

/* ================================================================== *
 * TiltCard — parallax 3D ringan
 * ================================================================== */

export function TiltCard({
  children,
  className = '',
  max = 7,
  scale = 1,
}: {
  children: ReactNode
  className?: string
  max?: number
  scale?: number
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const sx = useSpring(mx, SOFT_SPRING)
  const sy = useSpring(my, SOFT_SPRING)
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max])
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max])

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <div ref={ref} onMouseMove={onMove} onMouseLeave={reset} style={{ perspective: 1400 }}>
      <motion.div
        style={{ rotateX, rotateY, scale, transformStyle: 'preserve-3d' }}
        className={className}
      >
        {children}
      </motion.div>
    </div>
  )
}

/* ================================================================== *
 * Counter — count-up sekali saat masuk viewport
 * ================================================================== */

export function Counter({
  to,
  prefix = '',
  suffix = '',
  duration = 1500,
  className = '',
}: {
  to: number
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!inView || reduce) return
    let raf = 0
    const start = performance.now()
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration)
      setVal(Math.round(to * (1 - Math.pow(1 - p, 3))))
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, to, duration, reduce])

  return (
    <span ref={ref} className={className}>
      {prefix}
      {reduce ? to : val}
      {suffix}
    </span>
  )
}

/* ================================================================== *
 * Hairline — divider gradient dengan berkas cahaya berjalan
 * ================================================================== */

export function Hairline({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`relative h-px w-full overflow-hidden ${className}`}
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(255,255,255,0.07) 28%, rgba(0,255,255,0.2) 50%, rgba(255,255,255,0.07) 72%, transparent)',
      }}
    >
      <span className="absolute top-0 h-px w-[16%] bg-gradient-to-r from-transparent via-[#00FFFF] to-transparent [animation:beam-travel_9s_ease-in-out_infinite]" />
    </div>
  )
}
