import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import { LightCone } from '../../components/atmosphere'
import { Reveal, SectionHeading } from '../../components/section/motion'
import {
  DEFAULT_FEATURES,
  KATALOG_PAIR,
  buildWhatsAppUrl,
  customFeatures,
  featureGroups,
  getComplexity,
} from './data'

/* ================================================================== *
 * Konfigurator "surat pesanan kerja": fitur dikelompokkan seperti
 * baris item pada work order, ringkasan di kanan menghitung skala.
 *
 * Dua skala katalog saling menggantikan. Dulu pelepasannya terjadi
 * diam-diam; sekarang dijelaskan di teks bantuan grup dan diumumkan
 * lewat aria-live saat benar-benar terjadi.
 * ================================================================== */

export default function Configurator() {
  const [selected, setSelected] = useState<string[]>(DEFAULT_FEATURES)
  const [swapNote, setSwapNote] = useState<string | null>(null)

  const complexity = useMemo(() => getComplexity(selected.length), [selected])

  const toggle = (id: string) => {
    setSelected((prev) => {
      const isOn = prev.includes(id)
      if (isOn) {
        setSwapNote(null)
        return prev.filter((f) => f !== id)
      }

      // Skala katalog saling menggantikan — beri tahu pengguna, jangan
      // diam-diam melepas pilihan lamanya. Logika ini hanya berlaku kalau
      // id yang diklik memang salah satu dari pasangan katalog.
      const pairIdx = (KATALOG_PAIR as readonly string[]).indexOf(id)
      if (pairIdx !== -1) {
        const otherId = KATALOG_PAIR[1 - pairIdx]
        if (prev.includes(otherId)) {
          const pairLabel = customFeatures.find((f) => f.id === otherId)?.short ?? otherId
          setSwapNote(`"${pairLabel}" dilepas otomatis karena hanya satu skala katalog yang bisa aktif.`)
          return [...prev.filter((f) => f !== otherId), id]
        }
      }

      setSwapNote(null)
      return [...prev, id]
    })
  }

  return (
    <section id="harga" className="relative overflow-hidden border-t border-white/[0.06] py-24 md:py-32">
      <LightCone tint="gold" className="left-1/2 -translate-x-1/2 -top-20" />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(248,209,106,0.055) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          index="06"
          eyebrow="Investasi"
          title={
            <>
              Rancang fitur toko Anda.{' '}
              <span className="font-serif italic text-[#F8D16A]">
                Bayar yang dibutuhkan saja.
              </span>
            </>
          }
          deck="Kami tidak memaksakan paket kaku. Pilih fitur di bawah lalu kirimkan langsung ke WhatsApp kami untuk estimasi biaya."
        />

        <div className="mt-14 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* ---------- Kolom kiri: baris item dikelompokkan ---------- */}
          <div className="lg:col-span-7">
            <h3 id="config-heading" className="font-display text-lg font-medium tracking-tight text-white">
              Pilih kebutuhan sistem Anda
            </h3>

            <div role="group" aria-labelledby="config-heading" className="mt-6 space-y-8">
              {featureGroups.map((group) => {
                const items = customFeatures.filter((f) => f.group === group)
                const isCatalogGroup = items.some((f) =>
                  (KATALOG_PAIR as readonly string[]).includes(f.id),
                )
                return (
                  <div key={group}>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/40">
                        {group}
                      </span>
                      <span aria-hidden className="h-px flex-1 bg-white/[0.07]" />
                    </div>

                    {/* Hanya grup katalog yang punya aturan saling menggantikan */}
                    {isCatalogGroup && (
                      <p className="mt-2.5 text-[11px] leading-relaxed text-white/40">
                        Dua skala katalog di bawah saling menggantikan — aktifkan salah satu.
                      </p>
                    )}

                    <div className="mt-3.5 grid gap-2.5 sm:grid-cols-2">
                      {items.map((feature) => {
                        const on = selected.includes(feature.id)
                        return (
                          <button
                            key={feature.id}
                            type="button"
                            aria-pressed={on}
                            onClick={() => toggle(feature.id)}
                            className={`group flex items-start gap-3 rounded-xl border p-4 text-left transition-colors duration-300 ${
                              on
                                ? 'border-[#00FFFF]/40 bg-[#00FFFF]/[0.06]'
                                : 'border-white/[0.08] bg-white/[0.015] hover:border-white/[0.16]'
                            }`}
                          >
                            <span
                              aria-hidden
                              className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors duration-300 ${
                                on
                                  ? 'border-[#00FFFF]/60 bg-[#00FFFF]/15 text-[#00FFFF]'
                                  : 'border-white/[0.14] text-transparent'
                              }`}
                            >
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            <span className="min-w-0">
                              <span className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`text-[13px] font-semibold transition-colors duration-300 ${
                                    on ? 'text-white' : 'text-white/80'
                                  }`}
                                >
                                  {feature.short}
                                </span>
                                {feature.badge && (
                                  <span
                                    className={`rounded-full border px-2 py-0.5 font-mono text-[11px] ${
                                      on
                                        ? 'border-[#00FFFF]/35 text-[#00FFFF]/85'
                                        : 'border-white/[0.1] text-white/45'
                                    }`}
                                  >
                                    {feature.badge}
                                  </span>
                                )}
                              </span>
                              {/* Tanpa truncate: deskripsi utuh terbaca, bukan
                                  dipotong seperti versi h-28 lama. */}
                              <span className="mt-1 block text-[11px] leading-relaxed text-white/45">
                                {feature.desc}
                              </span>
                            </span>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pengumuman pelepasan otomatis */}
            <p aria-live="polite" className="mt-4 min-h-5 text-[11px] font-medium text-amber-300/75">
              {swapNote}
            </p>
          </div>

          {/* ---------- Kolom kanan: ringkasan pesanan ---------- */}
          <div className="lg:col-span-5">
            <Reveal>
              <div
                aria-live="polite"
                className="sticky top-24 overflow-hidden rounded-2xl border border-white/[0.09] bg-[#0b0b0e]/92 shadow-[0_30px_70px_-24px_rgba(0,0,0,0.8)] backdrop-blur-sm"
              >
                <div className="flex items-center justify-between border-b border-white/[0.07] bg-black/40 px-5 py-3.5">
                  <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/60">
                    Ringkasan Konfigurasi
                  </span>
                  <span className="font-mono text-[11px] tabular-nums text-[#00FFFF]">
                    {selected.length} Fitur
                  </span>
                </div>

                <div className="px-5 py-5 md:px-6">
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                    Skala Sistem &amp; Kompleksitas
                  </p>

                  {/* Meteran kompleksitas */}
                  <div
                    role="progressbar"
                    aria-valuenow={complexity.value}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label="Tingkat kompleksitas sistem"
                    className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-white/[0.06]"
                  >
                    <motion.span
                      aria-hidden
                      className={`block h-full rounded-full ${complexity.barColor}`}
                      animate={{ width: complexity.width }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                    />
                  </div>

                  <p className={`mt-3 text-[13px] font-semibold ${complexity.color}`}>
                    {complexity.label}
                  </p>
                  <p className="mt-1.5 text-[12px] leading-relaxed text-white/45">
                    {complexity.desc}
                  </p>

                  <div className="mt-5 border-t border-dashed border-white/[0.12] pt-4">
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">
                      Estimasi Biaya
                    </p>
                    <p className="font-display mt-1.5 text-xl font-medium tracking-tight text-white">
                      Custom / Menyesuaikan Kebutuhan
                    </p>
                    <p className="mt-1 text-[11px] leading-relaxed text-white/45">
                      Halaman admin, payment gateway, dan hitung ongkir otomatis dikonfigurasi
                      khusus tanpa ada biaya tersembunyi.
                    </p>
                  </div>

                  <a
                    href={buildWhatsAppUrl(selected)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative mt-5 flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-[#00FFFF] px-5 py-3.5 text-[13px] font-bold text-black shadow-[0_0_30px_rgba(0,255,255,0.24)] transition-shadow hover:shadow-[0_0_46px_rgba(0,255,255,0.38)]"
                  >
                    <MessageCircle className="h-4 w-4" aria-hidden />
                    Kirim Rincian ke WhatsApp
                    <span
                      aria-hidden
                      className="absolute inset-y-0 -left-full w-1/3 bg-white/50 group-hover:[animation:sheen_0.9s_ease-out]"
                    />
                  </a>
                  <p className="mt-3 text-center text-[11px] leading-relaxed text-white/45">
                    Konsultasi gratis. Tim developer Cozybytes akan merespon dengan rincian biaya
                    pengerjaan sesuai fitur pilihan Anda.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
