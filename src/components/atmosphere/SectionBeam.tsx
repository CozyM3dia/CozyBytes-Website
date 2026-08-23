export function SectionBeam({ className = '' }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none relative h-px w-full ${className}`}
      style={{
        background:
          'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(0,255,255,0.16) 50%, rgba(255,255,255,0.06) 70%, transparent)',
      }}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-8 -top-3 h-7 blur-md"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,255,255,0.05), transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-[-1px] h-[3px] w-[14%] rounded-full bg-gradient-to-r from-transparent via-[#00FFFF]/60 to-transparent shadow-[0_0_12px_rgba(0,255,255,0.35)] [animation:beam-travel_11s_ease-in-out_infinite]"
      />
    </div>
  )
}

const CONE_TINTS: Record<'cyan' | 'gold' | 'blue', string> = {
  cyan: 'rgba(0,255,255,0.055)',
  gold: 'rgba(248,209,106,0.045)',
  blue: 'rgba(59,130,246,0.05)',
}

export function LightCone({
  tint = 'cyan',
  className = '',
}: {
  tint?: 'cyan' | 'gold' | 'blue'
  className?: string
}) {
  const core = CONE_TINTS[tint]
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute w-[min(90vw,900px)] aspect-[2/1] blur-2xl [animation:cone-breathe_9s_ease-in-out_infinite] ${className}`}
      style={{
        background: `conic-gradient(from 180deg at 50% 0%, transparent 40%, ${core} 47%, rgba(255,255,255,0.03) 50%, ${core} 53%, transparent 60%)`,
        WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
        maskImage: 'linear-gradient(to bottom, black 0%, transparent 85%)',
      }}
    />
  )
}
