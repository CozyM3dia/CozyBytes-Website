import type { CSSProperties } from 'react'

type GridVariant = 'lines' | 'dots' | 'graph'

const LINE = 'rgba(255,255,255,0.025)'
const GRAPH_MINOR = 'rgba(255,255,255,0.02)'
const GRAPH_MAJOR = 'rgba(255,255,255,0.05)'

const verticalLines = (color: string, size: number): string =>
  `repeating-linear-gradient(to right, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size}px)`

const horizontalLines = (color: string, size: number): string =>
  `repeating-linear-gradient(to bottom, ${color} 0px, ${color} 1px, transparent 1px, transparent ${size}px)`

const backgrounds: Record<GridVariant, { image: string; size?: string }> = {
  lines: {
    image: `${verticalLines(LINE, 72)}, ${horizontalLines(LINE, 72)}`,
    size: 'auto',
  },
  dots: {
    image: 'radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)',
    size: '26px 26px',
  },
  graph: {
    image: [
      verticalLines(GRAPH_MAJOR, 96),
      horizontalLines(GRAPH_MAJOR, 96),
      verticalLines(GRAPH_MINOR, 24),
      horizontalLines(GRAPH_MINOR, 24),
    ].join(', '),
    size: 'auto',
  },
}

interface GridFieldProps {
  variant?: GridVariant
  className?: string
  mask?: string
}

export function GridField({ variant = 'lines', className = '', mask }: GridFieldProps) {
  const bg = backgrounds[variant]
  const style: CSSProperties = {
    backgroundImage: bg.image,
    backgroundSize: bg.size,
    ...(mask ? { WebkitMaskImage: mask, maskImage: mask } : {}),
  }
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`} style={style} />
  )
}

export function ColumnGuides({ className = '' }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`pointer-events-none absolute inset-0 ${className}`}>
      <div className="absolute left-1/4 h-full w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute left-1/2 h-full w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
      <div className="absolute left-3/4 h-full w-px bg-gradient-to-b from-transparent via-white/[0.05] to-transparent" />
    </div>
  )
}
