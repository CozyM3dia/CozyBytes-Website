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

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
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
      orbs = Array.from({ length: 10 }, (_, index) => ({
        x: width * (0.12 + Math.random() * 0.76),
        y: height * (0.08 + Math.random() * 0.72),
        vx: (Math.random() - 0.5) * 0.14,
        vy: (Math.random() - 0.5) * 0.12,
        radius: base * (0.16 + Math.random() * 0.18),
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

    const draw = () => {
      time += prefersReducedMotion.matches ? 0.001 : 0.012
      ctx.clearRect(0, 0, width, height)
      ctx.fillStyle = 'rgba(0, 0, 0, 0.92)'
      ctx.fillRect(0, 0, width, height)

      ctx.save()
      ctx.globalCompositeOperation = 'screen'
      ctx.filter = 'blur(22px) saturate(145%)'
      orbs.forEach(drawOrb)
      ctx.restore()

      ctx.save()
      ctx.globalCompositeOperation = 'overlay'
      ctx.fillStyle = 'rgba(0, 255, 255, 0.035)'
      for (let x = -40; x < width + 40; x += 18) {
        ctx.fillRect(x + Math.sin(time + x * 0.01) * 7, 0, 1, height)
      }
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

    resize()
    draw()

    window.addEventListener('resize', resize)
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)

    return () => {
      window.cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
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
