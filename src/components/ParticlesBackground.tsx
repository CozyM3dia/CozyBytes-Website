import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  baseX: number
  baseY: number
  vx: number
  vy: number
  size: number
  opacity: number
}

export default function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationId: number
    const dpr = Math.min(window.devicePixelRatio, 2)
    let particles: Particle[] = []
    let w = 0
    let h = 0

    const resize = () => {
      w = canvas.offsetWidth
      h = canvas.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      init()
    }

    const init = () => {
      const count = Math.min(Math.floor((w * h) / 10000), 140)
      particles = Array.from({ length: count }, () => {
        const x = Math.random() * w
        const y = Math.random() * h
        return {
          x,
          y,
          baseX: x,
          baseY: y,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
          size: Math.random() * 1.6 + 0.4,
          opacity: Math.random() * 0.45 + 0.1,
        }
      })
    }

    let t = 0
    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      t += 0.003

      for (const p of particles) {
        p.x += p.vx + Math.sin(p.baseY * 0.004 + t * 2) * 0.18
        p.y += p.vy + Math.cos(p.baseX * 0.004 + t * 1.4) * 0.12

        if (p.x < -10) p.x = w + 10
        if (p.x > w + 10) p.x = -10
        if (p.y < -10) p.y = h + 10
        if (p.y > h + 10) p.y = -10

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0,255,255,${p.opacity})`
        ctx.fill()
      }

      const maxDist = 110
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          if (Math.abs(dx) > maxDist || Math.abs(dy) > maxDist) continue
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < maxDist) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0,255,255,${(1 - dist / maxDist) * 0.1})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      // Subtle wave curves
      for (let wi = 0; wi < 3; wi++) {
        ctx.beginPath()
        const yBase = h * (0.35 + wi * 0.18)
        const freq = 0.005 + wi * 0.002
        const amp = 25 + wi * 15
        const speed = 1.5 + wi * 0.4
        for (let x = 0; x <= w; x += 3) {
          const y =
            yBase +
            Math.sin(x * freq + t * speed) * amp +
            Math.cos(x * freq * 0.6 + t * speed * 0.7 + wi) * amp * 0.5
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        ctx.strokeStyle = `rgba(0,255,255,${0.025 - wi * 0.005})`
        ctx.lineWidth = 1
        ctx.stroke()
      }

      animationId = requestAnimationFrame(draw)
    }

    resize()
    draw()

    const onResize = () => resize()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animationId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 0.65 }}
    />
  )
}
