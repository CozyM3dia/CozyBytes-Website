import { useEffect, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import { AnimatePresence, motion, useInView, useReducedMotion } from 'framer-motion'
import { MessageSquare, Star } from 'lucide-react'
import { EASE, hotspots } from './data'
import type { HotspotKey } from './data'
import { Reveal, SectionHeading } from '../../components/section/motion'

const formatTime = (seconds: number) => {
  const m = Math.floor(seconds / 60)
  const s = seconds % 60
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}

/* ================================================================== *
 * CountdownChip — hitung mundur di dalam ilustrasi ponsel.
 *
 * Interval dipasang di komponen kecil ini, bukan di section, supaya
 * setState 1 Hz hanya me-render ulang chip. Interval juga hanya hidup
 * saat chip terlihat dan pengguna tidak meminta reduced motion; di luar
 * itu angkanya diam di nilai awal.
 * ================================================================== */

const START_SECONDS = 599

function CountdownChip() {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { margin: '-8% 0px' })
  const reduce = useReducedMotion()
  const [timeLeft, setTimeLeft] = useState(START_SECONDS)

  useEffect(() => {
    if (reduce || !inView) return
    const timer = window.setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? START_SECONDS : prev - 1))
    }, 1000)
    return () => window.clearInterval(timer)
  }, [reduce, inView])

  return (
    <span
      ref={ref}
      className="inline-flex items-center gap-1.5 rounded border border-red-500/30 bg-red-500/20 px-2 py-0.5 font-mono text-[11px] font-bold tabular-nums text-white"
    >
      Sisa Waktu: {formatTime(timeLeft)}
    </span>
  )
}

/* ================================================================== *
 * PhoneWireframe — ilustrasi dekoratif.
 *
 * Seluruh isi disembunyikan dari screen reader karena teks aslinya
 * sudah dibacakan lewat tabpanel. Ukuran memakai max-width, bukan
 * lebar tetap, supaya frame + border tetap masuk di viewport 320px.
 * ================================================================== */

function PhoneWireframe({ activeKey }: { activeKey: HotspotKey }) {
  const ctaText = hotspots.find((h) => h.key === 'cta')?.mockText ?? ''

  const zone = (key: HotspotKey, tone: 'cyan' | 'gold' = 'cyan') => {
    const on = activeKey === key
    if (!on) return 'border-white/[0.07]'
    return tone === 'gold'
      ? 'border-[#F8D16A]/70 bg-[#F8D16A]/[0.07] shadow-[0_0_16px_rgba(248,209,106,0.12)]'
      : 'border-[#00FFFF]/70 bg-[#00FFFF]/[0.06] shadow-[0_0_16px_rgba(0,255,255,0.12)]'
  }

  return (
    <div className="flex flex-col items-center">
      <div
        aria-hidden
        className="relative mx-auto flex h-[540px] w-full max-w-[288px] flex-col overflow-hidden rounded-[34px] border-[6px] border-zinc-800 bg-zinc-950 p-2.5 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(0,255,255,0.03)] sm:h-[560px]"
      >
        <span className="absolute left-1/2 top-0 z-30 flex h-4 w-24 -translate-x-1/2 items-center justify-center gap-1.5 rounded-b-2xl bg-zinc-800">
          <span className="h-1 w-9 rounded-full bg-zinc-700" />
          <span className="h-2 w-2 rounded-full border border-zinc-800 bg-zinc-900" />
        </span>

        <div className="relative flex flex-1 flex-col gap-2 overflow-hidden rounded-[26px] bg-[#060608] p-3 pt-7 text-center">
          {/* Zona hook */}
          <div className={`rounded-xl border p-2.5 transition-all duration-300 ${zone('hook')}`}>
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.14em] text-[#00FFFF]/70">
              Promo Terbatas
            </span>
            <span className="mt-2 block space-y-1.5">
              <span className="mx-auto block h-2 w-[88%] rounded-full bg-white/25" />
              <span className="mx-auto block h-2 w-[72%] rounded-full bg-white/[0.14]" />
            </span>
          </div>

          {/* Zona produk */}
          <div className="flex flex-1 flex-col items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.012] p-2">
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-[#00FFFF]/10 to-[#F8D16A]/10 font-mono text-[11px] text-white/50">
              Foto Produk
            </span>
            <span className="mt-2.5 block h-1.5 w-3/4 rounded-full bg-white/[0.07]" />
          </div>

          {/* Zona urgency */}
          <div
            className={`flex flex-col items-center gap-2 rounded-xl border p-2.5 transition-all duration-300 ${zone('urgency', 'gold')}`}
          >
            <span className="block h-1.5 w-[80%] rounded-full bg-[#F8D16A]/35" />
            <CountdownChip />
          </div>

          {/* Zona bukti sosial */}
          <div className={`rounded-xl border p-2.5 transition-all duration-300 ${zone('proof')}`}>
            <span className="flex items-center justify-center gap-0.5">
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} className="h-2.5 w-2.5 fill-[#F8D16A]/70 text-[#F8D16A]/70" />
              ))}
            </span>
            <span className="mt-2 block space-y-1">
              <span className="mx-auto block h-1.5 w-[90%] rounded-full bg-white/[0.12]" />
              <span className="mx-auto block h-1.5 w-[62%] rounded-full bg-white/[0.08]" />
            </span>
          </div>

          {/* Zona CTA */}
          <div className="relative">
            <div className={`rounded-xl border p-2.5 transition-all duration-300 ${zone('cta')}`}>
              <span className="flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#00FFFF] px-2 text-[11px] font-black leading-none text-black shadow-[0_0_12px_rgba(0,255,255,0.22)]">
                <MessageSquare className="h-3.5 w-3.5 shrink-0 fill-current" />
                {ctaText}
              </span>
            </div>

            <AnimatePresence>
              {activeKey === 'cta' && (
                <motion.div
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 26 }}
                  transition={{ duration: 0.34, ease: EASE }}
                  className="absolute inset-x-0 bottom-[3.4rem] z-10 mx-auto w-full overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-900 text-left shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                >
                  <div className="flex items-center gap-2 bg-emerald-600 p-2 text-white">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20 text-[11px] font-bold leading-none">
                      WA
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-[11px] font-bold leading-tight">
                        Toko Online Anda
                      </span>
                      <span className="block text-[11px] leading-tight text-emerald-100">
                        Online
                      </span>
                    </span>
                  </div>
                  <div className="space-y-1.5 bg-[#0b141a] p-2 text-[11px] leading-snug">
                    <span className="block max-w-[85%] rounded-r-lg rounded-bl-lg bg-[#202c33] p-1.5 text-white">
                      Halo kak! Mau klaim promo landing page hari ini?
                    </span>
                    <span className="ml-auto block max-w-[85%] rounded-l-lg rounded-br-lg bg-[#005c4b] p-1.5 text-[#e9edef]">
                      Halo, iya kak saya mau order mumpung diskon 50%!
                    </span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      <p className="mt-4 max-w-[288px] text-center text-[11px] leading-relaxed text-white/50">
        Ilustrasi tata letak, bukan penawaran yang sedang berjalan.
      </p>
    </div>
  )
}

/* ================================================================== *
 * Section
 * ================================================================== */

export default function Anatomy() {
  const [active, setActive] = useState(0)
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])
  const current = hotspots[active]

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    const last = hotspots.length - 1
    let next = -1
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = index === last ? 0 : index + 1
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = index === 0 ? last : index - 1
    else if (event.key === 'Home') next = 0
    else if (event.key === 'End') next = last
    if (next < 0) return
    event.preventDefault()
    setActive(next)
    tabRefs.current[next]?.focus()
  }

  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] py-20 md:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 45% 45% at 82% 38%, rgba(0,255,255,0.055) 0%, transparent 64%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        <SectionHeading
          index="02"
          eyebrow="Anatomi Halaman"
          title={
            <>
              Anatomi halaman yang{' '}
              <br className="hidden md:inline" />
              <span className="font-serif italic text-[#00FFFF]">memicu klik pembeli.</span>
            </>
          }
          deck="Pilih elemennya untuk melihat perannya dan contoh teks yang biasa kami pakai."
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Tab + panel ---------- */}
          <div className="lg:col-span-7">
            <div
              role="tablist"
              aria-label="Elemen anatomi landing page"
              aria-orientation="vertical"
              className="flex flex-col gap-2"
            >
              {hotspots.map((spot, i) => {
                const on = active === i
                return (
                  <button
                    key={spot.key}
                    ref={(node) => {
                      tabRefs.current[i] = node
                    }}
                    type="button"
                    role="tab"
                    id={`anatomy-tab-${spot.key}`}
                    aria-selected={on}
                    aria-controls="anatomy-panel"
                    tabIndex={on ? 0 : -1}
                    onClick={() => setActive(i)}
                    onKeyDown={(event) => onKeyDown(event, i)}
                    className={`group flex items-center gap-3.5 rounded-xl border px-4 py-3.5 text-left transition-colors duration-300 ${
                      on
                        ? 'border-[#00FFFF]/40 bg-[#00FFFF]/[0.06]'
                        : 'border-white/[0.08] bg-white/[0.012] hover:border-white/20'
                    }`}
                  >
                    {/* Penanda bentuk: cincin kosong → titik terisi, jadi status
                        tab tidak hanya dibedakan oleh warna. */}
                    <span
                      aria-hidden
                      className={`grid h-4 w-4 shrink-0 place-items-center rounded-full border transition-colors duration-300 ${
                        on ? 'border-[#00FFFF]' : 'border-white/30 group-hover:border-white/50'
                      }`}
                    >
                      {on && <span className="block h-1.5 w-1.5 rounded-full bg-[#00FFFF]" />}
                    </span>
                    <span
                      className={`font-mono text-[11px] tabular-nums ${on ? 'text-[#00FFFF]/80' : 'text-white/50'}`}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`min-w-0 flex-1 text-sm leading-snug ${
                        on ? 'font-bold text-white' : 'font-medium text-white/75'
                      }`}
                    >
                      {spot.title}
                    </span>
                  </button>
                )
              })}
            </div>

            <div
              id="anatomy-panel"
              role="tabpanel"
              aria-labelledby={`anatomy-tab-${current.key}`}
              tabIndex={0}
              className="mt-5 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5 md:p-6"
            >
              <h3 className="font-display text-lg font-medium tracking-tight text-white md:text-xl">
                {current.title}
              </h3>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/55">{current.desc}</p>

              <div className="mt-5 border-t border-white/[0.07] pt-4">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50">
                  Contoh teks
                </span>
                <p className="mt-2.5 text-[15px] leading-relaxed text-[#00FFFF]/90">
                  {current.mockText}
                </p>
              </div>
            </div>
          </div>

          {/* ---------- Ilustrasi ponsel ---------- */}
          <div className="lg:col-span-5">
            <Reveal delay={0.1}>
              <PhoneWireframe activeKey={current.key} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
