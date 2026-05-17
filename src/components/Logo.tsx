interface LogoFullProps {
  size?: 'sm' | 'md'
}

export function CozybytesLogo({ size = 'md' }: LogoFullProps) {
  const h = size === 'sm' ? 36 : 160

  return (
    <img
      src="/logo.png?v=2"
      alt="Cozybytes Media"
      height={h}
      style={{ height: h, width: 'auto', objectFit: 'contain' }}
    />
  )
}
