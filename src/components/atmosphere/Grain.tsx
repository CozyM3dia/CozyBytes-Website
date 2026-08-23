const GRAIN_URI = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='260' height='260'%3E%3Cfilter id='grain'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.82' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='260' height='260' filter='url(%23grain)'/%3E%3C/svg%3E")`

export default function Grain({ className = '', opacity = 0.065 }: { className?: string; opacity?: number }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}
      style={{ mixBlendMode: 'overlay', opacity }}
    >
      <div className="absolute inset-0" style={{ backgroundImage: GRAIN_URI }} />
      <div
        className="absolute inset-0 scale-[1.03] will-change-transform [animation:grain-jitter_0.9s_steps(3)_infinite]"
        style={{ backgroundImage: GRAIN_URI }}
      />
    </div>
  )
}
