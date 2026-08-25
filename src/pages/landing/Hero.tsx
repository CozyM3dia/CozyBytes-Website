import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react'
import { LightCone } from '../../components/atmosphere'
import { EASE, funnelStages, heroStats, WA_LINK } from './data'
import { Counter, MagneticButton, SplitLines } from '../../components/section/motion'

/* ------------------------------------------------------------------ *
 * Log ilustratif. Nama event memakai istilah standar Meta Pixel / GTM
 * supaya terbaca sebagai contoh teknis, bukan laporan kampanye nyata.
 * ------------------------------------------------------------------ */
const EVENT_LOG = [
  { tag: 'GTM', text: 'container terpasang' },
  { tag: 'META', text: 'event PageView terkirim' },
  { tag: 'WA', text: 'klik tombol chat tercatat' },
]

function Backdrop() {
  return (
    <>
      <LightCone tint="cyan" className="left-[64%] -translate-x-1/2 -top-28" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 55% 45% at 80% 30%, rgba(0,255,255,0.10) 0%, transparent 62%), radial-gradient(ellipse 42% 40% at 6% 86%, rgba(0,255,255,0.045) 0%, transparent 62%)',
        }}
      />
      {/* Garis ukur horizontal — kesan panel instrumen, bukan blueprint kolom
          seperti halaman company profile. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to bottom, rgba(255,255,255,0.022) 0px, rgba(255,255,255,0.022) 1px, transparent 1px, transparent 84px)',
          maskImage: 'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent, black 18%, black 82%, transparent)',
        }}
      />
      {/* Ukuran font dijaga agar 12 karakter tetap masuk lebar viewport. */}
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-[2vw] left-1/2 hidden w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[9vw] font-medium leading-none lg:block"
      >
        LANDING PAGE
      </span>
    </>
  )
}

/* ================================================================== *
 * SignalTape — panel telemetri: sinyal iklan masuk di atas, menyempit
 * ke satu aksi di bawah, ditutup log event.
 * ================================================================== */

function SignalTape() {
  const reduce = useReducedMotion()

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-[#00FFFF]/[0.055] blur-3xl"
      />

      <div className="relative overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0e]/90 shadow-[0_40px_90px_-24px_rgba(0,0,0,0.85)] backdrop-blur-sm">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/55 to-transparent [animation:scanline_9s_linear_infinite]"
        />

        {/* Kepala panel */}
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-black/40 px-5 py-3.5">
          <span className="flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.4s_ease-in-out_infinite]" />
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              Alur sinyal
            </span>
          </span>
          <span className="rounded-full border border-white/[0.1] px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.16em] text-white/50">
            Ilustrasi
          </span>
        </div>

        {/* Tahapan */}
        <ol className="space-y-4 px-5 py-6 md:px-6">
          {funnelStages.map((stage, i) => (
            <li key={stage.event}>
              <div className="flex items-baseline justify-between gap-3">
                <span className="flex items-baseline gap-2.5">
                  <span className="font-mono text-[11px] tabular-nums text-[#00FFFF]/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[13px] font-medium text-white/75">{stage.label}</span>
                </span>
                <span className="shrink-0 font-mono text-[11px] tracking-tight text-white/50">
                  {stage.event}
                </span>
              </div>
              <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.05]">
                <motion.span
                  aria-hidden
                  className="block h-full rounded-full"
                  style={{
                    background:
                      'linear-gradient(to right, rgba(0,255,255,0.85), rgba(0,255,255,0.32))',
                  }}
                  initial={reduce ? { width: `${stage.width}%` } : { width: 0 }}
                  animate={{ width: `${stage.width}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.14, ease: EASE }}
                />
              </div>
            </li>
          ))}
        </ol>

        {/* Log event */}
        <div className="border-t border-white/[0.07] bg-black/45 px-5 py-4 md:px-6">
          <ul aria-hidden className="space-y-1.5">
            {EVENT_LOG.map((line, i) => (
              <motion.li
                key={line.tag}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 1 + i * 0.12, ease: EASE }}
                className="flex items-center gap-2.5 font-mono text-[11px] leading-relaxed"
              >
                <span className="w-11 shrink-0 text-[#00FFFF]/70">[{line.tag}]</span>
                <span className="truncate text-white/50">{line.text}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-3.5 text-[11px] leading-relaxed text-white/50">
        Ilustrasi alur pelacakan, bukan data kampanye.
      </p>
    </div>
  )
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] items-center overflow-hidden pb-20 pt-28 md:pt-32">
      <Backdrop />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-10">
          {/* ---------- Kolom teks ---------- */}
          <div className="lg:col-span-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] [animation:status-blink_2.4s_ease-in-out_infinite]" />
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-white/50">
                Landing Page Konversi Tinggi
              </span>
            </motion.div>

            <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem]">
              <SplitLines
                as="span"
                delay={0.08}
                lines={[
                  <>Klik iklan masuk.</>,
                  <span key="l2" className="font-serif italic text-[#00FFFF]">
                    Penjualan keluar.
                  </span>,
                ]}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: EASE }}
              className="mt-7 max-w-md text-[15px] leading-relaxed text-white/55"
            >
              Landing page custom yang ringan, dioptimasi untuk layar HP, dan terintegrasi pixel
              pelacak iklan.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                href={WA_LINK}
                ariaLabel="Konsultasi via WhatsApp untuk layanan landing page"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-[#00FFFF] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_34px_rgba(0,255,255,0.28)] transition-shadow hover:shadow-[0_0_52px_rgba(0,255,255,0.42)]"
              >
                <MessageCircle className="relative h-4 w-4" />
                <span className="relative">Konsultasi via WhatsApp</span>
                <span
                  aria-hidden
                  className="absolute inset-y-0 -left-full w-1/3 bg-white/50 group-hover:[animation:sheen_0.9s_ease-out]"
                />
              </MagneticButton>

              <a
                href="#harga"
                className="group inline-flex items-center gap-2 rounded-full border border-white/[0.12] px-7 py-3.5 text-sm font-semibold text-white/70 transition-colors hover:border-[#00FFFF]/35 hover:bg-white/[0.03] hover:text-white"
              >
                Lihat Skema Harga
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.dl
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.58, ease: EASE }}
              className="mt-12 grid max-w-md grid-cols-3 gap-px overflow-hidden rounded-xl border border-white/[0.07] bg-white/[0.06]"
            >
              {heroStats.map((s) => (
                <div key={s.label} className="bg-[#0a0a0c] px-4 py-4">
                  <dd className="font-display text-xl font-medium tracking-tight text-white sm:text-2xl">
                    <Counter to={s.value} prefix={s.prefix} suffix={s.suffix} />
                  </dd>
                  <dt className="mt-1.5 text-[11px] text-white/50">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- Kolom panel telemetri ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="lg:col-span-6"
          >
            <SignalTape />
          </motion.div>
        </div>
      </div>

      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 items-center gap-2.5 lg:flex"
      >
        <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-white/30">
          Gulir
        </span>
        <ArrowDown className="h-3 w-3 animate-bounce text-[#00FFFF]/50" />
      </motion.div>
    </section>
  )
}
