import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { Check, Lock, RotateCcw, Zap, Gauge } from 'lucide-react'
import { EASE } from './data'

type Tab = 'beranda' | 'layanan' | 'kontak' | 'kecepatan'
type AuditState = 'idle' | 'running' | 'done'

const TABS: { id: Tab; label: string }[] = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'layanan', label: 'Layanan' },
  { id: 'kontak', label: 'Kontak' },
  { id: 'kecepatan', label: 'Uji Kecepatan' },
]

const AUDIT_LOGS = [
  '[SYS] Menghubungkan ke server Lighthouse…',
  '[REQ] Mengunduh payload halaman HTML/CSS…',
  '[ANL] Menganalisis kebersihan file JS…',
  '[TBT] Mengukur stabilitas viewport (Core Web Vitals)…',
  '[SCO] Menghitung skor akhir performa…',
]

const paneMotion = {
  initial: { opacity: 0, y: 14, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  exit: { opacity: 0, y: -12, filter: 'blur(6px)' },
  transition: { duration: 0.42, ease: EASE },
}

/* ---------------------------------------------------------------- *
 * Panel: beranda
 * ---------------------------------------------------------------- */

function PaneBeranda() {
  return (
    <motion.div key="beranda" {...paneMotion} className="flex h-full flex-col justify-center">
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#00FFFF]">
        Tech Corp
      </span>
      <h3 className="font-display mt-3 text-xl font-medium leading-[1.1] tracking-tight md:text-[1.75rem]">
        We build software that
        <br />
        <span className="font-serif italic text-[#00FFFF]">empowers your vision</span>
      </h3>
      <p className="mt-3 max-w-[19rem] text-[10px] leading-relaxed text-white/40 md:text-[11px]">
        High-performance digital tools, responsive interfaces, and fast backend integrations.
      </p>
      <div className="mt-5 flex gap-2.5">
        <span className="flex h-7 items-center rounded-full bg-[#00FFFF] px-3.5 text-[9px] font-bold text-black shadow-[0_0_18px_rgba(0,255,255,0.28)]">
          Explore Projects
        </span>
        <span className="flex h-7 items-center rounded-full border border-white/12 px-3.5 text-[9px] font-bold text-white/65">
          Contact Us
        </span>
      </div>
      <div className="mt-6 flex gap-5 border-t border-white/[0.06] pt-4">
        {[
          ['128', 'Projects'],
          ['24', 'Engineers'],
          ['9', 'Countries'],
        ].map(([n, l]) => (
          <div key={l}>
            <div className="font-mono text-sm font-bold text-white/85">{n}</div>
            <div className="text-[8px] uppercase tracking-wider text-white/28">{l}</div>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- *
 * Panel: layanan
 * ---------------------------------------------------------------- */

function PaneLayanan() {
  const items = [
    { title: 'Web App', desc: 'Custom React dashboard' },
    { title: 'Serverless', desc: 'Ultra fast API system' },
    { title: 'UX Design', desc: 'Clean layout interfaces' },
  ]
  return (
    <motion.div key="layanan" {...paneMotion} className="flex h-full flex-col justify-center">
      <div className="text-center">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.24em] text-[#00FFFF]">
          Core Services
        </span>
        <h4 className="font-display mt-1.5 text-base font-medium tracking-tight text-white">
          Layanan utama perusahaan
        </h4>
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2.5">
        {items.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.07, ease: EASE }}
            className="rounded-xl border border-white/[0.06] bg-white/[0.015] p-3 text-center"
          >
            <span className="mx-auto flex h-6 w-6 items-center justify-center rounded-lg bg-[#00FFFF]/10 text-[#00FFFF]">
              <Check className="h-3 w-3" strokeWidth={2.5} />
            </span>
            <h5 className="mt-2 text-[10px] font-bold text-white">{item.title}</h5>
            <p className="mt-0.5 text-[8px] leading-snug text-white/32">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- *
 * Panel: kontak
 * ---------------------------------------------------------------- */

function PaneKontak() {
  const fields = ['Nama Lengkap', 'Alamat Email']
  return (
    <motion.div
      key="kontak"
      {...paneMotion}
      className="mx-auto flex h-full w-full max-w-[17rem] flex-col justify-center"
    >
      <div className="text-center">
        <h4 className="font-display text-base font-medium tracking-tight text-white">
          Hubungi kami
        </h4>
        <p className="mt-1 text-[8px] text-white/35">Tinggalkan pesan Anda di bawah ini</p>
      </div>
      <div className="mt-4 space-y-2">
        {fields.map((f, i) => (
          <motion.div
            key={f}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.08 + i * 0.06, ease: EASE }}
            className="flex h-7 items-center rounded-lg border border-white/[0.06] bg-white/[0.015] px-2.5"
          >
            <span className="text-[8px] text-white/30">{f}</span>
          </motion.div>
        ))}
        <div className="h-12 rounded-lg border border-white/[0.06] bg-white/[0.015] p-2.5">
          <span className="text-[8px] text-white/30">
            Tulis pesan Anda di sini
            <span className="ml-px inline-block w-px align-middle text-[#00FFFF] [animation:caret_1.1s_steps(1)_infinite]">
              |
            </span>
          </span>
        </div>
        <div className="flex h-8 items-center justify-center rounded-lg bg-[#00FFFF] text-[9px] font-bold text-black shadow-[0_0_18px_rgba(0,255,255,0.2)]">
          Kirim Pesan
        </div>
      </div>
    </motion.div>
  )
}

/* ---------------------------------------------------------------- *
 * Panel: kecepatan (simulator Lighthouse)
 * ---------------------------------------------------------------- */

function PaneKecepatan() {
  const reduce = useReducedMotion()
  const [state, setState] = useState<AuditState>('idle')
  const [progress, setProgress] = useState(0)
  const [log, setLog] = useState<string[]>([])
  const timer = useRef<number | null>(null)

  // Bersihkan interval kalau user pindah tab / unmount saat audit jalan.
  useEffect(() => {
    return () => {
      if (timer.current !== null) window.clearInterval(timer.current)
    }
  }, [])

  const run = () => {
    if (timer.current !== null) window.clearInterval(timer.current)
    setState('running')
    setProgress(0)
    setLog([AUDIT_LOGS[0]])

    if (reduce) {
      setProgress(100)
      setLog(AUDIT_LOGS)
      setState('done')
      return
    }

    let p = 0
    timer.current = window.setInterval(() => {
      p += 10
      setProgress(p)
      if (p === 30) setLog((prev) => [...prev, AUDIT_LOGS[1]])
      else if (p === 50) setLog((prev) => [...prev, AUDIT_LOGS[2]])
      else if (p === 70) setLog((prev) => [...prev, AUDIT_LOGS[3]])
      else if (p === 90) setLog((prev) => [...prev, AUDIT_LOGS[4]])
      if (p >= 100) {
        if (timer.current !== null) window.clearInterval(timer.current)
        timer.current = null
        setState('done')
      }
    }, 150)
  }

  const CIRC = 2 * Math.PI * 24

  return (
    <motion.div
      key="kecepatan"
      {...paneMotion}
      className="flex h-full flex-col items-center justify-center text-center"
    >
      {state === 'idle' && (
        <div className="space-y-3">
          <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/10 text-[#00FFFF]">
            <Gauge className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <h4 className="font-display text-sm font-medium tracking-tight text-white">
              Lighthouse Performance Simulator
            </h4>
            <p className="mx-auto mt-1.5 max-w-[16rem] text-[9px] leading-relaxed text-white/40">
              Kode custom yang ringan, tanpa tumpukan plugin CMS. Jalankan simulasinya.
            </p>
          </div>
          <button
            type="button"
            onClick={run}
            className="group/run relative h-8 overflow-hidden rounded-full bg-[#00FFFF] px-5 text-[9px] font-bold text-black shadow-[0_0_18px_rgba(0,255,255,0.24)] transition-shadow hover:shadow-[0_0_28px_rgba(0,255,255,0.4)]"
          >
            <span className="relative z-10 flex items-center gap-1.5">
              <Zap className="h-3 w-3 fill-current" />
              Jalankan Audit Kecepatan
            </span>
            <span
              aria-hidden
              className="absolute inset-y-0 -left-full w-1/2 bg-white/45 group-hover/run:[animation:sheen_0.85s_ease-out]"
            />
          </button>
        </div>
      )}

      {state === 'running' && (
        <div className="w-full max-w-[17rem] space-y-3">
          <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
            <svg viewBox="0 0 56 56" className="absolute inset-0 h-full w-full -rotate-90">
              <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" fill="none" />
              <circle
                cx="28"
                cy="28"
                r="24"
                stroke="#00FFFF"
                strokeWidth="3.5"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={CIRC}
                strokeDashoffset={CIRC - (CIRC * progress) / 100}
                style={{ transition: 'stroke-dashoffset 150ms linear' }}
              />
            </svg>
            <span className="font-mono text-[10px] font-bold text-[#00FFFF]">{progress}%</span>
          </div>
          <div
            role="status"
            aria-live="polite"
            className="h-[5.5rem] space-y-1 overflow-hidden rounded-xl border border-white/[0.06] bg-black/55 p-3 text-left font-mono text-[8px] leading-relaxed text-white/45"
          >
            {log.map((line) => (
              <motion.div
                key={line}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25 }}
                className="truncate"
              >
                {line}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {state === 'done' && (
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: EASE }}
          className="w-full space-y-3"
        >
          <div className="flex items-center justify-center gap-4">
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border border-emerald-400/25 bg-emerald-400/[0.07] shadow-[0_0_24px_rgba(16,185,129,0.14)]">
              <span className="font-mono text-lg font-black leading-none text-emerald-300">99</span>
              <span className="mt-0.5 text-[6px] font-bold uppercase tracking-wide text-emerald-300/60">
                Mobile
              </span>
            </div>
            <div className="text-left">
              <h4 className="text-[10px] font-bold leading-tight text-white">
                Google PageSpeed: Optimal
              </h4>
              <span className="mt-1 inline-block rounded border border-emerald-400/15 bg-emerald-400/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-300">
                Lolos Core Web Vitals
              </span>
            </div>
          </div>

          <div className="mx-auto grid max-w-[16rem] grid-cols-3 gap-2">
            {[
              { name: 'First Contentful Paint', val: '0.2s' },
              { name: 'Total Blocking Time', val: '0ms' },
              { name: 'Cumulative Layout Shift', val: '0.00' },
            ].map((m, i) => (
              <motion.div
                key={m.name}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 + i * 0.07 }}
                className="flex h-full flex-col justify-between rounded-lg border border-white/[0.06] bg-white/[0.015] p-1.5 text-center"
              >
                <span className="block text-[6px] leading-tight text-white/30">{m.name}</span>
                <span className="mt-1 block font-mono text-[9px] font-bold text-emerald-300">
                  {m.val}
                </span>
              </motion.div>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setState('idle')
              setProgress(0)
              setLog([])
            }}
            className="inline-flex h-6 items-center gap-1.5 rounded-full border border-white/12 px-3 text-[8px] font-semibold text-white/55 transition-colors hover:border-white/25 hover:text-white"
          >
            <RotateCcw className="h-2.5 w-2.5" />
            Ulangi tes performa
          </button>
        </motion.div>
      )}
    </motion.div>
  )
}

/* ---------------------------------------------------------------- *
 * Shell browser
 * ---------------------------------------------------------------- */

export default function BrowserDemo() {
  const [tab, setTab] = useState<Tab>('beranda')

  return (
    <div className="w-full">
      <div className="relative">
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#00FFFF]/[0.06] blur-3xl"
        />

        <div className="relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0e] shadow-[0_40px_90px_-20px_rgba(0,0,0,0.85)]">
          {/* Chrome */}
          <div className="flex shrink-0 items-center gap-1.5 border-b border-white/[0.07] bg-black/50 px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/55" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/55" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/55" />
            <div className="ml-3 flex h-5 min-w-0 flex-1 items-center gap-2 rounded border border-white/[0.06] bg-white/[0.04] px-2.5">
              <Lock className="h-2.5 w-2.5 shrink-0 text-emerald-400/70" />
              <span className="truncate font-mono text-[9px] tracking-wide text-white/32">
                cozybytes.id/demo-company
              </span>
              <span className="ml-auto hidden shrink-0 font-mono text-[8px] text-emerald-400/80 sm:block">
                200 OK
              </span>
            </div>
          </div>

          {/* Viewport */}
          <div className="relative min-h-0 flex-1 overflow-hidden bg-[#06060a] px-6 py-5 md:px-7">
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_75%_10%,rgba(0,255,255,0.05),transparent_70%)]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/45 to-transparent [animation:scanline_7s_linear_infinite]"
            />
            <div className="relative h-full">
              <AnimatePresence mode="wait">
                {tab === 'beranda' && <PaneBeranda />}
                {tab === 'layanan' && <PaneLayanan />}
                {tab === 'kontak' && <PaneKontak />}
                {tab === 'kecepatan' && <PaneKecepatan />}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* Switcher */}
      <div role="tablist" aria-label="Pratinjau halaman demo" className="mt-4 flex flex-wrap gap-2">
        {TABS.map((t) => {
          const active = tab === t.id
          return (
            <button
              key={t.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setTab(t.id)}
              className={`relative overflow-hidden rounded-full border px-4 py-2 text-[11px] font-semibold transition-colors duration-300 ${
                active
                  ? 'border-[#00FFFF]/40 text-[#00FFFF]'
                  : 'border-white/[0.09] text-white/45 hover:border-white/20 hover:text-white/80'
              }`}
            >
              {active && (
                <motion.span
                  layoutId="demo-tab-pill"
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[#00FFFF]/10"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <span className="relative">{t.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
