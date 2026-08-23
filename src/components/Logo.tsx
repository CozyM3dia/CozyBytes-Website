interface LogoFullProps {
  size?: 'sm' | 'md'
}

// Aspect ratio logo.png = 640x320
const LOGO_RATIO = 2

export function CozybytesLogo({ size = 'md' }: LogoFullProps) {
  const h = size === 'sm' ? 36 : 160

  return (
    <img
      src="/logo.png?v=4"
      alt="Cozybytes Media"
      width={h * LOGO_RATIO}
      height={h}
      decoding="async"
      style={{ height: h, width: h * LOGO_RATIO, objectFit: 'contain' }}
    />
  )
}
