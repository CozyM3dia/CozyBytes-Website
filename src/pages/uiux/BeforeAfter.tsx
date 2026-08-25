import { useState } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './data'

/* ================================================================== *
 * BeforeAfter — pembanding geser "studio redline".
 *
 * Dua pane adalah ilustrasi fiktif (CV. Maju Jaya Bersama) yang seluruh
 * isinya aria-hidden: teks mockup tidak dibacakan sebagai konten
 * halaman. Ukuran teks pane memakai satuan cqw (container query width)
 * sehingga mockup mengecil secara proporsional seperti jendela browser
 * yang di-zoom-out — bukan 14 ukuran px kecil yang dipilih manual.
 *
 * Badge SEBELUM/SESUDAH dan keterangan geser adalah UI sungguhan di
 * luar subtree aria-hidden, minimal 11px.
 *
 * Aksesibilitas slider: input range asli dengan fokus terlihat (ring
 * pada frame + handle membesar saat focus-within), nilai numerik, dan
 * aria-valuetext yang mendeskripsikan posisi banding.
 * ================================================================== */

const OLD_NAV = ['HOME', 'PROFIL', 'PRODUK', 'GALERI', 'BUKU TAMU', 'KONTAK']

const NEW_STATS = [
  { num: '15+', label: 'Tahun berdiri' },
  { num: '120', label: 'Proyek selesai' },
  { num: '98%', label: 'Klien puas' },
]

/** Pane lama — situs perusahaan era 2005 yang berantakan. */
function BeforePane() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 flex flex-col bg-[#dedad0] p-[2.4cqw] font-serif text-zinc-800"
    >
      {/* navigasi lama */}
      <div className="flex items-center gap-[1cqw] border-b-2 border-zinc-500 bg-[#c7c1b2] px-[1.4cqw] py-[1cqw] text-[2.1cqw] font-bold">
        {OLD_NAV.map((m) => (
          <span key={m} className="text-blue-800 underline">
            {m}
          </span>
        ))}
      </div>

      {/* banner teriak-teriak */}
      <div className="mt-[0.9cqw] bg-yellow-300 px-2 py-[0.7cqw] text-center text-[2.2cqw] font-bold text-red-700">
        !!! SELAMAT DATANG DI WEBSITE KAMI ~ PROMO BESAR-BESARAN !!!
      </div>

      <p className="mt-[1cqw] text-center text-[3.6cqw] font-bold underline decoration-2">
        CV. MAJU JAYA BERSAMA
      </p>

      <div className="mt-[1cqw] flex min-h-0 flex-1 gap-[1cqw]">
        {/* konten utama: dinding teks abu-abu */}
        <div className="flex-1 space-y-[0.9cqw] overflow-hidden border border-zinc-500 bg-white/80 p-[1.6cqw]">
          <div className="h-[1.2cqw] w-full bg-zinc-400" />
          <div className="h-[1.2cqw] w-full bg-zinc-400" />
          <div className="h-[1.2cqw] w-5/6 bg-zinc-400" />
          <div className="flex h-[16cqw] items-center justify-center border border-dashed border-zinc-500 bg-zinc-300 text-[2cqw] italic text-zinc-600">
            gambar_banner_01.jpg (587 KB)
          </div>
          <div className="h-[1.2cqw] w-full bg-zinc-400" />
          <div className="h-[1.2cqw] w-full bg-zinc-400" />
          <div className="h-[1.2cqw] w-3/4 bg-zinc-400" />
        </div>
        {/* sidebar penuh sesak */}
        <div className="flex w-[34%] flex-col gap-[1cqw] overflow-hidden border border-zinc-500 bg-[#efe8d8] p-[1.2cqw] text-[2cqw]">
          <div className="bg-blue-900 px-[1.2cqw] py-[0.6cqw] font-bold text-white">MENU SAMPING</div>
          <span className="text-blue-800 underline">&raquo; Daftar Harga</span>
          <span className="text-blue-800 underline">&raquo; Cara Order</span>
          <span className="text-blue-800 underline">&raquo; Testimoni</span>
          <div className="mt-auto border border-zinc-500 bg-white p-[0.9cqw] text-center leading-tight">
            Pengunjung ke:
            <br />
            <span className="font-mono text-[2.3cqw] font-bold">0048172</span>
          </div>
        </div>
      </div>

      {/* CTA berteriak */}
      <div className="mt-[1cqw] flex h-[7cqw] items-center justify-center bg-red-600 text-[2.5cqw] font-black tracking-wide text-yellow-200">
        &gt;&gt;&gt; KLIK DISINI, BELI SEKARANG JUGA !!! &lt;&lt;&lt;
      </div>
    </div>
  )
}

/** Pane baru — hasil redesign Cozybytes. */
function AfterPane() {
  return (
    <div aria-hidden className="absolute inset-0 flex flex-col bg-zinc-950 p-[3.4cqw]">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 25% 20%, rgba(0,255,255,0.10) 0%, transparent 60%)',
        }}
      />

      <div className="relative mt-[3cqw] flex items-center justify-between border-b border-white/10 pb-[1.6cqw]">
        <span className="font-display text-[2.9cqw] font-semibold tracking-wide text-white">
          majujaya<span className="text-[#00FFFF]">.</span>co.id
        </span>
        <span className="rounded-full border border-[#00FFFF]/30 bg-[#00FFFF]/10 px-[1.4cqw] py-[0.5cqw] font-mono text-[2.2cqw] font-bold text-[#00FFFF]">
          99 PageSpeed
        </span>
      </div>

      <div className="relative flex min-h-0 flex-1 flex-col justify-center">
        <span className="font-mono text-[2.2cqw] uppercase tracking-[0.25em] text-[#00FFFF]/70">
          CV. Maju Jaya Bersama
        </span>
        <p className="font-display mt-[1cqw] text-[5.6cqw] font-medium leading-[1.1] text-white">
          Partner konstruksi
          <br />
          <span className="text-[#00FFFF]">yang dipercaya.</span>
        </p>
        <p className="mt-[1.4cqw] max-w-[46cqw] text-[2.5cqw] leading-relaxed text-white/50">
          Pengalaman 15 tahun menangani proyek komersial dan residensial di seluruh Sumatera.
        </p>
        <div className="mt-[2.2cqw] flex gap-[1.4cqw]">
          <span className="flex h-[6.4cqw] items-center rounded-full bg-[#00FFFF] px-[3cqw] text-[2.4cqw] font-bold text-black shadow-[0_0_18px_rgba(0,255,255,0.35)]">
            Konsultasi Gratis
          </span>
          <span className="flex h-[6.4cqw] items-center rounded-full border border-white/15 px-[3cqw] text-[2.4cqw] font-semibold text-white/70">
            Lihat Proyek
          </span>
        </div>
      </div>

      <div className="relative grid grid-cols-3 gap-[1.4cqw] border-t border-white/10 pt-[1.8cqw]">
        {NEW_STATS.map((s) => (
          <div key={s.label}>
            <div className="font-mono text-[3.2cqw] font-bold text-[#00FFFF]">{s.num}</div>
            <div className="text-[2cqw] text-white/40">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function BeforeAfter() {
  const [sliderVal, setSliderVal] = useState(50)

  return (
    <div className="relative">
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#00FFFF]/5 blur-2xl"
      />

      <div className="relative">
        {/* Frame: container-type mengaktifkan satuan cqw di kedua pane;
            ring focus-within memberi indikator fokus yang hilang di
            versi lama (input opacity-0 tanpa outline). */}
        <div
          className="group relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)] transition-shadow focus-within:ring-2 focus-within:ring-[#00FFFF]/70"
          style={{ containerType: 'inline-size' }}
        >
          {/* Pane ilustrasi — disembunyikan dari screen reader */}
          <BeforePane />

          {/* Pane baru, dipotong (bukan dipress) agar layout tak reflow */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
          >
            <AfterPane />
          </div>

          {/* Divider + handle */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.7)] transition-transform duration-200 group-focus-within:scale-y-[1.02]"
            style={{ left: `${sliderVal}%` }}
          >
            <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-950 bg-[#00FFFF] shadow-[0_0_25px_rgba(0,255,255,0.8)] transition-transform duration-200 group-focus-within:scale-110">
              <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden="true">
                <path
                  d="M5 1L1 6L5 11"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M11 1L15 6L11 11"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Slider: seluruh frame adalah target geser */}
          <input
            type="range"
            min={0}
            max={100}
            step={1}
            value={sliderVal}
            onChange={(e) => setSliderVal(Number(e.target.value))}
            aria-label="Geser untuk membandingkan desain lama dan baru"
            aria-valuetext={`${sliderVal}% desain baru, ${100 - sliderVal}% desain lama`}
            className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
          />

          {/* Badge UI sungguhan — di luar subtree aria-hidden, minimal 11px.
              Panel baru tampil di KIRI (dipotong dari kanan), jadi SESUDAH
              di kiri dan SEBELUM di kanan. */}
          <span className="pointer-events-none absolute left-3 top-3 z-30 rounded-sm bg-[#00FFFF] px-2 py-1 text-[11px] font-black tracking-[0.15em] text-black shadow-[0_0_12px_rgba(0,255,255,0.4)]">
            SESUDAH
          </span>
          <span className="pointer-events-none absolute right-3 top-3 z-30 rounded-sm bg-red-600 px-2 py-1 text-[11px] font-black tracking-[0.15em] text-white shadow">
            SEBELUM
          </span>
        </div>

        <p className="mt-4 text-center text-xs leading-relaxed text-white/50">
          Geser handle untuk membandingkan tampilan lama dan hasil redesign.
        </p>
      </div>
    </div>
  )
}

/** Bungkus motion agar Hero tetap ringkas. */
export function BeforeAfterReveal() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
    >
      <BeforeAfter />
    </motion.div>
  )
}
