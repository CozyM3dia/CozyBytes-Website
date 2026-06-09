import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  Users, Layout, Palette, Smartphone, FileText, 
  Repeat, MessageCircle, ArrowUpRight, Check, AlertCircle, 
  ChevronDown, Layers 
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20UI%2FUX%20design.'

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    subtitle: 'Paket',
    tagline: 'Desain ulang tampilan website skala kecil agar tampil lebih segar dan modern.',
    price: 'Rp 999.000',
    period: 'Bayar sekali',
    discount: 'Redesign Ringan',
    discountTone: 'cyan',
    cta: 'Pilih Paket Basic',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Redesign hingga 3 halaman' },
      { available: true, label: 'Wireframe tata letak dasar' },
      { available: true, label: 'Desain responsif (HP + desktop)' },
      { available: true, label: 'Akses penuh ke kode CSS layout & aset visual siap pakai' },
      { available: true, label: <>Maksimal <strong>3x</strong> revisi desain</> },
      { available: false, label: 'Riset pengguna mendalam' },
      { available: false, label: 'Simulasi halaman interaktif' },
      { available: false, label: 'Panduan gaya brand (Style Guide)' },
    ],
  },
  {
    name: 'Pro UX',
    subtitle: 'Paket',
    tagline: 'Desain ulang menyeluruh untuk website bisnis agar lebih gampang dipahami pembeli.',
    oldPrice: 'Rp 4.998.000',
    savings: 'Hemat Rp 2.499.000',
    price: 'Rp 2.499.000',
    period: 'Bayar sekali',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling diminati',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Redesign hingga 8 halaman' },
      { available: true, label: 'Wireframe struktur + UI design custom' },
      { available: true, label: 'Desain responsif (HP + desktop)' },
      { available: true, label: 'Simulasi halaman interaktif (klik navigasi)' },
      { available: true, label: 'Kumpulan komponen visual, ikon SVG, & panduan layout' },
      { available: true, label: 'Konsultasi branding & warna brand' },
      { available: true, label: <>Maksimal <strong>5x</strong> revisi desain</> },
      { available: false, label: 'Riset lapangan ke pembeli langsung' },
    ],
  },
  {
    name: 'Full Design',
    subtitle: 'Paket',
    tagline: 'Riset pengguna, peta navigasi, tata letak antarmuka, hingga dokumentasi komponen lengkap.',
    oldPrice: 'Rp 7.998.000',
    savings: 'Hemat Rp 4 juta',
    price: 'Rp 3.999.000',
    period: 'Bayar sekali',
    discount: '50% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Full',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: 'Halaman tidak dibatasi (unlimited)' },
      { available: true, label: 'Riset pengguna & User Persona' },
      { available: true, label: 'Wireframe + UI design premium eksklusif' },
      { available: true, label: 'Simulasi halaman interaktif lengkap (full flow)' },
      { available: true, label: 'Design System modular (aset & komponen siap coding)' },
      { available: true, label: 'Style Guide & Tipografi warna lengkap' },
      { available: true, label: 'Konsultasi langsung via Zoom' },
      { available: true, label: <><strong>Bebas revisi</strong> sampai disetujui</> },
    ],
  },
]

const featuresList = [
  {
    icon: Users,
    title: 'Riset Alur Pengguna (UX)',
    desc: 'Kami memetakan kebiasaan target pengunjung Anda agar navigasi menu dan penempatan informasi memudahkan mereka melakukan transaksi.',
  },
  {
    icon: Layout,
    title: 'Kerangka Halaman (Wireframe)',
    desc: 'Sebelum menggambar visual, kami membuat sketsa hitam-putih untuk merencanakan tata letak konten dan tombol agar posisinya pas.',
  },
  {
    icon: Palette,
    title: 'Desain Visual & Layout Halaman (UI)',
    desc: 'Desain antarmuka website yang modern, bersih, dan konsisten diselaraskan dengan palet warna logo serta brand perusahaan Anda.',
  },
  {
    icon: Smartphone,
    title: 'Ramah Layar Smartphone',
    desc: 'Setiap bagian desain dipastikan fleksibel dan proporsional untuk kenyamanan mata saat dibuka dari layar HP terkecil sekalipun.',
  },
  {
    icon: FileText,
    title: 'Design System yang Rapi',
    desc: 'Kami menyusun tombol, kartu, dan modul desain secara modular dalam kode visual agar mempermudah tim programmer Anda membacanya.',
  },
  {
    icon: Repeat,
    title: 'Handoff Aset Siap Coding',
    desc: 'Semua aset visual diserahkan lengkap dalam format SVG, ukuran font standar, serta panduan susunan layout developer-ready.',
  },
]

const painPoints = [
  {
    title: 'Tampilan Website Terlihat Jadul',
    desc: 'Website yang kuno membuat calon pembeli meragukan profesionalitas bisnis Anda, menurunkan tingkat kepercayaan sebelum membaca penawaran.',
  },
  {
    title: 'Ruwet & Pengunjung Mudah Tersesat',
    desc: 'Navigasi yang berantakan membuat pengunjung kesulitan mencari tombol kontak atau katalog produk, lalu menutup halaman dalam hitungan detik.',
  },
  {
    title: 'Tampilan Rusak Saat Dibuka di HP',
    desc: 'Teks terpotong, gambar tumpang tindih, dan tombol terlalu rapat saat dibuka dari ponsel pintar, menyiksa kenyamanan pengunjung.',
  },
  {
    title: 'Layout Kaku WordPress Template',
    desc: 'Desain template instan yang kaku dan mirip dengan puluhan website kompetitor lain, gagal membedakan brand Anda di pasar.',
  },
]

const comparisons = [
  {
    aspect: 'Riset Navigasi',
    cozy: 'Audit alur transaksi mendalam & terarah',
    agency: 'Sangat mendalam (namun proses lama & mahal)',
    freelancer: 'Jarang melakukan riset alur navigasi',
    templates: 'Terpaksa mengikuti alur kaku bawaan template',
  },
  {
    aspect: 'Kerapian Aset Visual',
    cozy: 'Rapi, modular, & mudah dibaca programmer',
    agency: 'Rapi dan terstruktur lengkap',
    freelancer: 'Tidak teratur, sulit diedit ulang di kemudian hari',
    templates: 'Tidak menyediakan file aset visual asli',
  },
  {
    aspect: 'Kesesuaian Brand',
    cozy: 'Dibuat khusus mengikuti warna brand Anda',
    agency: 'Sangat konsisten (didukung tim branding)',
    freelancer: 'Bergantung pada selera pribadi desainer',
    templates: 'Wajib mengikuti layout bawaan template',
  },
  {
    aspect: 'Kemudahan Koding (Handoff)',
    cozy: 'Dilengkapi panduan susunan layout & kode CSS',
    agency: 'Lengkap dan terstruktur',
    freelancer: 'Handoff seadanya tanpa detail jarak & font',
    templates: 'Tidak ada proses serah terima desain',
  },
]

const faqs = [
  {
    q: 'Apa perbedaan antara UI (User Interface) dan UX (User Experience) Design?',
    a: 'UI (User Interface) berfokus pada keindahan visual website, seperti pemilihan warna, jenis font, kebersihan layout, dan hiasan visual. UX (User Experience) berfokus pada kemudahan navigasi. UX yang baik memastikan pengunjung bisa menemukan informasi atau menyelesaikan pembelian tanpa kebingungan.'
  },
  {
    q: 'Kenapa tata letak visual website perlu dirancang dan dimatangkan sebelum koding selesai?',
    a: 'Melakukan perubahan layout langsung saat koding sudah berjalan memakan waktu lama dan biaya besar. Dengan merancang tata letak dan visual UI/UX terlebih dahulu, Anda bisa melihat gambaran nyata website Anda dan mensimulasikan alur navigasi sejak awal sebelum sistem backend selesai dibuat.'
  },
  {
    q: 'File apa saja yang saya dapatkan setelah proyek selesai?',
    a: 'Anda akan menerima semua aset visual lengkap dalam format SVG, panduan style guide (warna & tipografi), dokumentasi pustaka komponen kode, serta link simulasi halaman web interaktif.'
  },
  {
    q: 'Apakah harga paket desain ini sudah termasuk proses koding?',
    a: 'Paket di halaman ini khusus untuk pembuatan visual desain UI/UX dan struktur halaman. Namun, Cozybytes juga melayani coding (custom website development). Jika Anda ingin desain tersebut langsung didevelop menjadi website aktif, kami bisa menyertakan penawaran bundling khusus.'
  },
  {
    q: 'Bagaimana cara developer internal kami menggunakan aset desain dari Cozybytes?',
    a: 'Kami menyusun aset menggunakan standar kode modern. Tim programmer Anda bisa langsung mengambil kode CSS layout, menyalin file ikon SVG, dan membaca panduan jarak antar elemen secara instan.'
  },
  {
    q: 'Apakah saya bisa meminta redesign untuk aplikasi HP?',
    a: 'Bisa. Selain website profil perusahaan & e-commerce, kami juga melayani jasa desain antarmuka (UI/UX) untuk aplikasi Android dan iOS.'
  }
]

export default function UIUXPage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [sliderVal, setSliderVal] = useState<number>(50)

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />

      <Helmet>
        <title>Jasa Desain UI/UX & Redesign Website Profesional | Cozybytes</title>
        <meta name="description" content="Jasa desain UI/UX website profesional & modern. Optimasi alur navigasi (UX), wireframe, simulasi halaman web interaktif, handoff developer siap pakai. Redesign mulai Rp 999.000." />
        <meta name="keywords" content="jasa desain UI UX website, redesign website lama, UI UX designer Indonesia, jasa wireframe website, desain aplikasi mobile Lampung, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/uiux" />
        <meta property="og:title" content="Jasa Desain UI/UX & Redesign Website Profesional | Cozybytes" />
        <meta property="og:description" content="Tingkatkan konversi penjualan Anda dengan desain antarmuka website (UI/UX) yang modern, bersih, dan intuitif. Aset visual rapi & siap coding." />
        <meta property="og:url" content="https://cozybytes.media/layanan/uiux" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative pt-40 pb-28 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,255,0.15) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 50% 45%, rgba(248,209,106,0.08) 0%, transparent 70%), #000',
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-40">
          <div className="absolute left-1/2 top-32 h-px w-[86vw] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FFFF]/30 to-transparent" />
          <div className="absolute left-[8%] top-48 h-64 w-64 rounded-full bg-[#00FFFF]/10 blur-3xl" />
          <div className="absolute right-[10%] top-64 h-72 w-72 rounded-full bg-[#F8D16A]/8 blur-3xl" />
        </div>

        <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#00FFFF]/30 bg-[#00FFFF]/5 px-4.5 py-1.5 text-xs font-semibold uppercase tracking-[0.24em] text-[#00FFFF]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF] animate-pulse" />
              Desain UI/UX & Redesign
            </span>
            <h1
              className="mb-6 text-4xl sm:text-6xl md:text-7xl leading-tight font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Website Terasa Jadul? Bikin Tampilannya <br />
              <em className="text-[#00FFFF] italic font-normal">Lebih Segar dan Nyaman Dilihat</em>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
              Tampilan website yang acak-acakan bikin calon pembeli kabur sebelum sempat baca penawaran Anda. Kami bantu tata ulang struktur dan tampilan halaman biar rapi, gampang dipakai pengunjung, dan pas dengan warna logo brand Anda. Semuanya langsung kami buat dalam bentuk halaman prototipe web interaktif yang bisa diklik.
            </p>

            {/* Trust Badges */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Aset SVG & Layout Kode Diserahkan
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Simulasi Halaman Web Interaktif
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Handoff Developer Rapi
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <motion.a
                href={WA_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-2 px-8 py-4 text-sm font-bold bg-[#00FFFF] text-black rounded-full shadow-[0_0_30px_rgba(0,255,255,0.25)]"
              >
                <MessageCircle className="h-4.5 w-4.5" />
                Mulai Diskusi Desain
              </motion.a>
              <a
                href="#harga"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Lihat Paket Desain
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Dampak Desain Kaku
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Tampilan Website yang Berantakan <br />
              <em className="text-[#F8D16A] italic font-normal">Sering Kali Membuat Calon Pembeli Ragu?</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {painPoints.map((item, i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-white/8 bg-white/[0.015] p-6 hover:bg-white/[0.03] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400">
                    <AlertCircle className="h-5 w-5" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-white">{item.title}</h3>
                  <p className="text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Metodologi Kerja
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Cakupan Desain UI/UX yang Kami Kerjakan <br />
              <em className="text-[#00FFFF] italic font-normal">Dari Riset Hingga Penyerahan Aset</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuresList.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.02] p-6 hover:border-[#00FFFF]/25 hover:bg-white/[0.04] transition-all group"
              >
                <div className="mb-5 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-[#00FFFF]/10 group-hover:bg-[#00FFFF]/20 transition-all">
                  <f.icon className="h-5.5 w-5.5 text-[#00FFFF]" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-white group-hover:text-[#00FFFF] transition-all">{f.title}</h3>
                <p className="text-sm leading-relaxed text-white/52">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="py-20 bg-[#09090B] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
                Perbandingan Tampilan
              </span>
              <h2 className="mb-6 text-3xl md:text-4xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Beri Penyegaran Visual pada Website <br />
                <em className="text-[#00FFFF] italic font-normal">Tanpa Strukturnya Menjadi Berat</em>
              </h2>
              <p className="mb-6 text-sm leading-relaxed text-white/50">
                Kami mengubah tata letak halaman yang tadinya kaku, penuh sesak dengan teks, dan navigasi membingungkan menjadi antarmuka modern yang bersih, seimbang, dan mengarahkan perhatian pengguna ke target CTA.
              </p>
              <ul className="space-y-3">
                {['Menganalisis kelemahan tata letak visual', 'Penyusunan palet warna yang modern', 'Optimasi kontras font agar enak dibaca', 'Pemberian ruang kosong (white-space) agar web lega'].map((step, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm text-white/70">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#00FFFF]/10 text-[#00FFFF] text-[10px] font-bold">✓</span>
                    {step}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative aspect-[4/3] w-full rounded-2xl border border-white/10 overflow-hidden bg-zinc-950 select-none shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {/* Before Layer (WordPress) - fills the container */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between bg-zinc-900/40">
                <div className="space-y-2">
                  <div className="flex justify-between items-center pb-2 border-b border-white/5">
                    <span className="text-[9px] font-bold text-red-400 tracking-wider">WP TEMPLATE LAMA</span>
                    <span className="text-[7px] text-white/30">Theme: Active24</span>
                  </div>
                  <div className="h-6 w-3/4 rounded bg-white/10 animate-pulse" />
                  <div className="space-y-1">
                    <div className="h-2.5 w-full rounded bg-white/5" />
                    <div className="h-2.5 w-5/6 rounded bg-white/5" />
                  </div>
                </div>
                <div className="h-28 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center p-3 text-center">
                  <span className="text-[8px] text-white/20 font-bold block mb-1">Banner Gambar Kaku</span>
                  <div className="w-12 h-1 rounded bg-white/10" />
                </div>
                <div className="h-8 rounded bg-red-600/80 text-white flex items-center justify-center text-[10px] font-bold">
                  Beli Sekarang (Order Manual)
                </div>
              </div>

              {/* After Layer (Cozybytes Custom) - absolute overlay, width controlled by slider */}
              <div 
                className="absolute inset-y-0 left-0 overflow-hidden bg-zinc-950 border-r border-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.2)]"
                style={{ width: `${sliderVal}%` }}
              >
                {/* We need an inner wrapper that has a fixed width equal to the container's width, so the content doesn't squeeze when sliding */}
                <div className="absolute inset-y-0 left-0 w-[530px] p-5 flex flex-col justify-between bg-gradient-to-b from-[#00FFFF]/5 to-transparent">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center pb-2 border-b border-[#00FFFF]/10">
                      <span className="text-[9px] font-bold text-[#00FFFF] tracking-[0.2em] uppercase">Cozybytes Design</span>
                      <span className="text-[7px] text-[#00FFFF]/60 font-semibold px-1.5 py-0.5 rounded-full bg-[#00FFFF]/10">99 Speed</span>
                    </div>
                    <div className="h-6 w-1/2 rounded bg-[#00FFFF]/20" />
                    <div className="space-y-1">
                      <div className="h-2.5 w-2/3 rounded bg-white/15" />
                      <div className="h-2.5 w-1/2 rounded bg-white/15" />
                    </div>
                  </div>
                  <div className="h-28 rounded-xl bg-gradient-to-tr from-[#00FFFF]/10 to-[#F8D16A]/10 border border-[#00FFFF]/10 flex flex-col items-center justify-center p-3 text-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-[#00FFFF]/2 blur-xl" />
                    <span className="text-[9px] text-[#00FFFF] font-black tracking-wider block mb-1 relative z-10">Visual Estetis & Interaktif</span>
                    <div className="w-16 h-1 rounded bg-[#00FFFF]/20 relative z-10" />
                  </div>
                  <div className="h-8 rounded-full bg-[#00FFFF] text-black flex items-center justify-center text-[10px] font-black shadow-[0_0_15px_rgba(0,255,255,0.25)]">
                    Dapatkan Penawaran →
                  </div>
                </div>
              </div>

              {/* Slider Input overlay covering the whole container */}
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={sliderVal} 
                onChange={(e) => setSliderVal(Number(e.target.value))}
                className="absolute inset-0 opacity-0 cursor-ew-resize z-20 w-full h-full"
              />

              {/* Glowing vertical slider handle indicator */}
              <div 
                className="absolute inset-y-0 pointer-events-none z-10 w-0.5 bg-[#00FFFF] flex items-center justify-center"
                style={{ left: `${sliderVal}%` }}
              >
                <div className="h-7 w-7 rounded-full bg-[#00FFFF] text-black flex items-center justify-center text-[9px] font-bold shadow-[0_0_15px_rgba(0,255,255,0.5)] border-2 border-white animate-pulse">
                  ↔
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Komparasi Layanan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Keunggulan Cozybytes UI/UX <br />
              <em className="text-[#F8D16A] italic font-normal">Dibanding Agensi Besar, Freelancer, & Template</em>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.01]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Kriteria Desain</th>
                  <th className="p-5 text-sm font-bold text-[#00FFFF]">Cozybytes UI/UX Design</th>
                  <th className="p-5 text-sm font-bold text-white/60">Agensi Tradisional (Besar)</th>
                  <th className="p-5 text-sm font-bold text-white/60">Desainer Freelancer</th>
                  <th className="p-5 text-sm font-bold text-white/60">Tema/Template Instan</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.015] transition-all">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="p-5 text-sm text-[#00FFFF] font-medium bg-[#00FFFF]/5 border-x border-[#00FFFF]/10">{row.cozy}</td>
                    <td className="p-5 text-sm text-white/50">{row.agency}</td>
                    <td className="p-5 text-sm text-white/50">{row.freelancer}</td>
                    <td className="p-5 text-sm text-white/50">{row.templates}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tech Tools Grid */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00FFFF]/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 md:px-6 relative z-10 text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
            Peralatan Kerja
          </span>
          <h2 className="mb-12 text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Susunan Aset Rapi untuk <em className="text-[#00FFFF] italic font-normal">Serah Terima IT Tanpa Kendala</em>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['Visual UI Design', 'Web Prototype', 'Flexbox / Grid', 'CSS Variables', 'Design Tokens', 'Adobe Photoshop', 'Adobe Illustrator', 'SVG Vector Assets', 'Google Web Fonts', 'Tailwind Config', 'Developer Handoff', 'UI Kits / Library'].map((tech) => (
              <div 
                key={tech} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-[#0a0a0d] hover:border-[#00FFFF]/20 transition-all"
              >
                <Layers className="h-5 w-5 text-[#00FFFF] mb-2" />
                <span className="text-xs font-semibold text-white/80">{tech}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-white/40">
            <span>✓ Aset Gambar & Ikon Rapi</span>
            <span>✓ Komponen Fleksibel (Variants)</span>
            <span>✓ Font Komersil Bebas Lisensi</span>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-[#09090B] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Tahapan Desain
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Alur Pengerjaan Desain Kolaboratif <br />
              <em className="text-[#F8D16A] italic font-normal">Dari Brainstorming Hingga Serah Terima Aset</em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { step: '01', title: 'Riset & Arah Visual', desc: 'Menganalisis web lama, riset kompetitor sejenis, dan menentukan gaya desain visual.' },
              { step: '02', title: 'Sketsa Struktur', desc: 'Pembuatan wireframe hitam-putih untuk merencanakan posisi menu dan tombol halaman.' },
              { step: '03', title: 'Desain Visual', desc: 'Membuat halaman utuh dengan menghias tombol, warna, jenis huruf, dan gambar.' },
              { step: '04', title: 'Prototype Klik', desc: 'Menghubungkan tombol antar halaman agar Anda bisa mencoba langsung alur navigasi web.' },
              { step: '05', title: 'Serah Terima', desc: 'Review akhir revisi desain, lalu penyerahan link visual & aset lengkap untuk programmer Anda.' }
            ].map((step, i) => (
              <div 
                key={i} 
                className="relative rounded-2xl border border-white/8 bg-white/[0.01] p-6 hover:bg-white/[0.02] transition-all flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-extrabold text-[#F8D16A]/20 block mb-4">{step.step}</span>
                  <h3 className="mb-2 text-base font-bold text-white">{step.title}</h3>
                  <p className="text-xs leading-relaxed text-white/45">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="harga" ref={pricingRef} className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-16 max-w-2xl text-center"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Pilihan Paket
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-6xl font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Pilih Paket Desain <br />
              <em className="text-[#00FFFF] italic font-normal">UI/UX Website Anda</em>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/50">
              Investasikan anggaran pada tampilan web yang meyakinkan calon pembeli. Pilih paket yang sesuai kebutuhan.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/40">
            Butuh desain UI/UX untuk aplikasi Android/iOS atau dashboard admin khusus?{' '}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#00FFFF] hover:underline">
              Konsultasikan custom requirements Anda di WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Pertanyaan Seputar Desain
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Jawaban Singkat Seputar <br />
              <em className="text-[#F8D16A] italic font-normal">Layanan Desain UI/UX & Struktur Visual</em>
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className="rounded-2xl border border-white/8 bg-white/[0.01] overflow-hidden transition-all"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/[0.015] transition-all"
                >
                  <span className="text-base font-bold text-white/90 pr-4">{faq.q}</span>
                  <ChevronDown 
                    className={`h-5 w-5 text-white/40 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#F8D16A]' : ''}`} 
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm leading-relaxed text-white/50 border-t border-white/5 bg-[#050507]/20">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 80%, rgba(0,255,255,0.08) 0%, transparent 70%)' }} />
        <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="rounded-[28px] border border-white/[0.08] bg-white/[0.02] backdrop-blur-sm p-8 md:p-12 relative"
          >
            <div className="pointer-events-none absolute inset-x-12 top-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/45 to-transparent" />
            <span className="mb-4 inline-block text-[10px] font-semibold uppercase tracking-[0.3em] text-white/35">
              Analisis Web Gratis
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Bikin Tampilan Website Perusahaan Anda <br />
              <em className="text-[#00FFFF] italic font-normal">Tampil Segar, Bersih, dan Lebih Menjual</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Kirimkan link website lama Anda dan kami bantu tunjukkan bagian visual yang menghambat konversi secara gratis.
            </p>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary inline-flex items-center gap-2 text-sm font-bold px-8 py-4 bg-[#00FFFF] text-black rounded-full"
            >
              <MessageCircle className="h-4.5 w-4.5" />
              Mulai Konsultasi Desain UI/UX
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
