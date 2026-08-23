import { GlowMesh, Grain, GridField } from './atmosphere'

export default function SiteAtmosphere() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <GlowMesh />
      <GridField
        variant="lines"
        mask="radial-gradient(ellipse 95% 80% at 50% 28%, black 20%, transparent 82%)"
      />
      <div className="vignette absolute inset-0" />
      <Grain />
    </div>
  )
}
