import { Component, type ReactNode } from 'react'

type Props = { children: ReactNode; fallback?: ReactNode }
type State = { hasError: boolean; error?: Error }

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: unknown) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center bg-zinc-950">
          <h2 className="font-display text-2xl font-medium text-white">Ada yang tidak beres</h2>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-white/50">
            Terjadi kesalahan tak terduga. Coba muat ulang halaman atau kembali ke beranda.
          </p>
          <div className="mt-6 flex gap-3">
            <button onClick={() => window.location.reload()} className="rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white hover:bg-white/10">Muat ulang</button>
            <a href="/" className="btn-primary text-sm">Ke Beranda</a>
          </div>
          {import.meta.env.DEV && this.state.error && (
            <pre className="mt-8 max-w-xl overflow-auto rounded-xl bg-black/50 p-4 text-left text-xs text-red-300">{String(this.state.error.stack || this.state.error.message)}</pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
