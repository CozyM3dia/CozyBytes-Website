import { motion } from 'framer-motion'
import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react'
import { LightCone } from '../../components/atmosphere'
import { MagneticButton, SplitLines } from '../../components/section/motion'
import { EASE, heroStats, WA_LINK } from './data'
import CheckoutDemo from './CheckoutDemo'

function Backdrop() {
  return (
    <>
      <LightCone tint="cyan" className="left-[62%] -translate-x-1/2 -top-28" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 52% 44% at 78% 28%, rgba(0,255,255,0.09) 0%, transparent 62%), radial-gradient(ellipse 40% 38% at 4% 88%, rgba(0,255,255,0.04) 0%, transparent 60%)',
        }}
      />
      {/* Kolom buku besar: garis vertikal tipis seperti kolom angka pada
          ledger, bukan grid kartu. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'repeating-linear-gradient(to right, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 96px)',
          maskImage: 'linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent, black 22%, black 78%, transparent)',
        }}
      />
      <span
        aria-hidden
        className="text-outline pointer-events-none absolute -bottom-[2vw] left-1/2 hidden w-full -translate-x-1/2 select-none whitespace-nowrap text-center font-display text-[9vw] font-medium leading-none lg:block"
      >
        TOKO ONLINE
      </span>
    </>
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
                Toko Online Mandiri
              </span>
            </motion.div>

            <h1 className="font-display text-[2.6rem] font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem]">
              <SplitLines
                as="span"
                delay={0.08}
                lines={[
                  <>Jualan tanpa potongan</>,
                  <span key="l2" className="font-serif italic text-[#00FFFF]">
                    komisi marketplace.
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
              Bangun brand sendiri, simpan database pelanggan seutuhnya, dan terima pembayaran
              otomatis 24 jam nonstop.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.48, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                href={WA_LINK}
                ariaLabel="Konsultasi via WhatsApp untuk layanan toko online"
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
                Rancang Fitur Toko
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
                    {s.num}
                  </dd>
                  <dt className="mt-1.5 text-[11px] text-white/50">{s.label}</dt>
                </div>
              ))}
            </motion.dl>
          </div>

          {/* ---------- Kolom struk interaktif ---------- */}
          <motion.div
            initial={{ opacity: 0, y: 34 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.22, ease: EASE }}
            className="lg:col-span-6"
          >
            <CheckoutDemo />
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
