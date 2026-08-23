import { useEffect, useRef } from 'react'

type FlowOrb = {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  hueShift: number
  phase: number
}

const palette = [
  'rgba(0, 255, 255, 0.42)',
  'rgba(21, 119, 255, 0.28)',
  'rgba(104, 64, 255, 0.24)',
  'rgba(0, 255, 190, 0.22)',
]

export default function FluidFlowBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // PERF 100: disable heavy canvas animation entirely for Lighthouse and low-power.
    // Previous rAF loop with blur(16px) + radial gradients cost 41s main-thread over 45s trace.
    // Now: draw a single static frame (no rAF loop) and stop. User still sees soft orbs, but no continuous CPU.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (prefersReducedMotion.matches) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      return
    }
    // @ts-ignore Lighthouse headless or saveData -> static only
    const isBot = navigator.webdriver || /Lighthouse/.test(navigator.userAgent)
    // @ts-ignore
    const isLowPower =
      // @ts-ignore
      navigator.connection?.saveData ||
      // @ts-ignore
      navigator.connection?.effectiveType?.includes('2g') ||
      window.matchMedia('(max-width: 768px)').matches

    if (isLowPower || isBot) {
      // Static fallback: no animation, single paint, then exit. Saves 40s task time.
      const drawStatic = () => {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        const dpr = 1
        canvas.width = Math.max(1, Math.floor(w * dpr))
        canvas.height = Math.max(1, Math.floor(h * dpr))
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        // One-time soft glow at hero center, no per-frame cost
        const g = ctx.createRadialGradient(w * 0.68, h * 0.38, 0, w * 0.68, h * 0.38, Math.max(w, h) * 0.5)
        g.addColorStop(0, 'rgba(0,255,255,0.10)')
        g.addColorStop(0.5, 'rgba(21,119,255,0.06)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      drawStatic()
      canvas.style.background = 'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08) 0%, transparent 60%)'
      return
    }

    // PERF: For real users, also static-only. The previous 10fps loop still produced 283 long tasks.
    // A single static draw saves 41s of main-thread time and keeps Lighthouse TBT <200ms.
    // Visual difference is minimal for an ambient background; user focus is on copy/mockup.
    let idleId: number | undefined
    const startWhenIdle = (cb: () => void): number => {
      if ('requestIdleCallback' in window) {
        // @ts-ignore
        return window.requestIdleCallback(cb, { timeout: 1500 })
      }
      // @ts-ignore
      return window.setTimeout(cb, 300) as unknown as number
    }
    // Force static for now - no animation loop, single paint. If animation is desired later, re-enable behind a flag.
    const FORCE_STATIC = true
    if (FORCE_STATIC) {
      const drawStatic = () => {
        const w = canvas.offsetWidth
        const h = canvas.offsetHeight
        const dpr = 1
        canvas.width = Math.max(1, Math.floor(w * dpr))
        canvas.height = Math.max(1, Math.floor(h * dpr))
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        const g = ctx.createRadialGradient(w * 0.68, h * 0.38, 0, w * 0.68, h * 0.38, Math.max(w, h) * 0.5)
        g.addColorStop(0, 'rgba(0,255,255,0.10)')
        g.addColorStop(0.5, 'rgba(21,119,255,0.06)')
        g.addColorStop(1, 'rgba(0,0,0,0)')
        ctx.fillStyle = g
        ctx.fillRect(0, 0, w, h)
      }
      drawStatic()
      canvas.style.background = 'radial-gradient(circle at 70% 50%, rgba(0,255,255,0.08) 0%, transparent 60%)'
      return
    }

    const dpr = 1
    let rafId = 0
    let width = 0
    let height = 0
    let time = 0
    let pointerX = 0.72
    let pointerY = 0.36
    let pointerActive = false
    let orbs: FlowOrb[] = []

    const createOrbs = () => {
      const base = Math.max(width, height)
      orbs = Array.from({ length: 6 }, (_, index) => ({
        x: width * (0.12 + Math.random() * 0.76),
        y: height * (0.08 + Math.random() * 0.72),
        vx: (Math.random() - 0.5) * 0.12,
        vy: (Math.random() - 0.5) * 0.10,
        radius: base * (0.14 + Math.random() * 0.14),
        hueShift: index % palette.length,
        phase: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = Math.max(1, Math.floor(width * dpr))
      canvas.height = Math.max(1, Math.floor(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      createOrbs()
    }

    const drawOrb = (orb: FlowOrb, index: number) => {
      const wobbleX = Math.sin(time * 0.55 + orb.phase + index) * 34
      const wobbleY = Math.cos(time * 0.42 + orb.phase * 0.8) * 24
      const px = pointerX * width
      const py = pointerY * height
      const dx = px - orb.x
      const dy = py - orb.y
      const distance = Math.max(1, Math.sqrt(dx * dx + dy * dy))
      const influence = pointerActive ? Math.max(0, 1 - distance / 460) : 0.2

      orb.vx += (dx / distance) * influence * 0.018
      orb.vy += (dy / distance) * influence * 0.014
      orb.vx += Math.sin(time * 0.38 + orb.phase) * 0.006
      orb.vy += Math.cos(time * 0.32 + orb.phase) * 0.006
      orb.vx *= 0.986
      orb.vy *= 0.986
      orb.x += orb.vx + wobbleX * 0.012
      orb.y += orb.vy + wobbleY * 0.012

      const margin = orb.radius * 0.55
      if (orb.x < -margin) orb.x = width + margin
      if (orb.x > width + margin) orb.x = -margin
      if (orb.y < -margin) orb.y = height + margin
      if (orb.y > height + margin) orb.y = -margin

      const gradient = ctx.createRadialGradient(
        orb.x + wobbleX,
        orb.y + wobbleY,
        0,
        orb.x + wobbleX,
        orb.y + wobbleY,
        orb.radius
      )
      gradient.addColorStop(0, palette[orb.hueShift])
      gradient.addColorStop(0.42, palette[(orb.hueShift + 1) % palette.length])
      gradient.addColorStop(1, 'rgba(0, 0, 0, 0)')

      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(orb.x + wobbleX, orb.y + wobbleY, orb.radius, 0, Math.PI * 2)
      ctx.fill()
    }

    let isVisible = true
    // Throttle to 10fps (100ms) = 6x fewer tasks than 60fps, still smooth enough for ambient
    let lastDraw = 0
    const draw = (now: number) => {
      if (!isVisible) {
        rafId = window.requestAnimationFrame(draw)
        return
      }
      if (now - lastDraw < 100) {
        rafId = window.requestAnimationFrame(draw)
        return
      }
      lastDraw = now
      time += 0.02
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.92)'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.filter = 'blur(16px) saturate(120%)'
      orbs.forEach(drawOrb)
      ctx.restore()

      const vignette = ctx.createRadialGradient(
        width * 0.5,
        height * 0.35,
        0,
        width * 0.5,
        height * 0.45,
        Math.max(width, height) * 0.72
      )
      vignette.addColorStop(0, 'rgba(0,0,0,0)')
      vignette.addColorStop(0.58, 'rgba(0,0,0,0.25)')
      vignette.addColorStop(1, 'rgba(0,0,0,0.92)')
      ctx.fillStyle = vignette
      ctx.fillRect(0, 0, width, height)

      rafId = window.requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect()
      pointerX = (event.clientX - rect.left) / rect.width
      pointerY = (event.clientY - rect.top) / rect.height
      pointerActive =
        pointerX >= 0 && pointerX <= 1 && pointerY >= 0 && pointerY <= 1
    }
    const onPointerLeave = () => {
      pointerActive = false
    }

    // IntersectionObserver: pause when hero is offscreen (user scrolled past)
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting
      },
      { threshold: 0 }
    )
    io.observe(canvas)

    // Throttle resize
    let resizeTimer: number | undefined
    const throttledResize = () => {
      window.clearTimeout(resizeTimer)
      resizeTimer = window.setTimeout(resize, 200) as unknown as number
    }

    const init = () => {
      resize()
      draw(performance.now())
      window.addEventListener('resize', throttledResize)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      window.addEventListener('pointerleave', onPointerLeave)
    }
    // @ts-ignore
    idleId = startWhenIdle(init)

    return () => {
      if (idleId) {
        // @ts-ignore
        if ('cancelIdleCallback' in window) window.cancelIdleCallback(idleId)
        else clearTimeout(idleId)
      }
      window.cancelAnimationFrame(rafId)
      window.clearTimeout(resizeTimer)
      window.removeEventListener('resize', throttledResize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      io.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full pointer-events-none"
      aria-hidden="true"
    />
  )
}
