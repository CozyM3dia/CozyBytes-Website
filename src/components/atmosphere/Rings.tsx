export function Rings({ count = 4, className = '' }: { count?: number; className?: string }) {
  const total = Math.min(6, Math.max(1, count))
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 grid place-items-center overflow-hidden ${className}`}
    >
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className="absolute place-self-center rounded-full border border-white/[0.05] [animation:ring-breathe_12s_ease-in-out_infinite]"
          style={{
            width: `${28 + i * 18}vmin`,
            height: `${28 + i * 18}vmin`,
            animationDelay: `${i * -2.5}s`,
          }}
        />
      ))}
      <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF]/40 blur-[1px]" />
    </div>
  )
}

export function Crosshair({ className = '' }: { className?: string }) {
  return (
    <span aria-hidden="true" className={`pointer-events-none relative block h-3.5 w-3.5 ${className}`}>
      <span className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2 bg-white/20" />
      <span className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-white/20" />
    </span>
  )
}
