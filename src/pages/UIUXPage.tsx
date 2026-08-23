import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Users, Layout, Palette, Smartphone, FileText,
  Repeat, MessageCircle, ArrowUpRight, Check,
  ChevronDown, Clock, Compass, LayoutGrid, AlertTriangle
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'
import { LightCone } from '../components/atmosphere'

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
    num: '01',
    kicker: 'Kredibilitas',
    title: 'Tampilan Website Terlihat Jadul',
    desc: 'Website yang kuno membuat calon pembeli meragukan profesionalitas bisnis Anda, menurunkan tingkat kepercayaan sebelum membaca penawaran.',
    icon: Clock,
    accent: 'cyan' as const,
  },
  {
    num: '02',
    kicker: 'Navigasi',
    title: 'Ruwet & Pengunjung Mudah Tersesat',
    desc: 'Navigasi yang berantakan membuat pengunjung kesulitan mencari tombol kontak atau katalog produk, lalu menutup halaman dalam hitungan detik.',
    icon: Compass,
    accent: 'gold' as const,
  },
  {
    num: '03',
    kicker: 'Responsif',
    title: 'Tampilan Rusak Saat Dibuka di HP',
    desc: 'Teks terpotong, gambar tumpang tindih, dan tombol terlalu rapat saat dibuka dari ponsel pintar, menyiksa kenyamanan pengunjung.',
    icon: Smartphone,
    accent: 'violet' as const,
  },
  {
    num: '04',
    kicker: 'Originalitas',
    title: 'Layout Kaku WordPress Template',
    desc: 'Desain template instan yang kaku dan mirip dengan puluhan website kompetitor lain, gagal membedakan brand Anda di pasar.',
    icon: LayoutGrid,
    accent: 'emerald' as const,
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

const workflowSteps = [
  { step: '01', title: 'Riset & Arah Visual', desc: 'Menganalisis web lama, riset kompetitor sejenis, dan menentukan gaya desain visual.' },
  { step: '02', title: 'Sketsa Struktur', desc: 'Pembuatan wireframe hitam-putih untuk merencanakan posisi menu dan tombol halaman.' },
  { step: '03', title: 'Desain Visual', desc: 'Membuat halaman utuh dengan menghias tombol, warna, jenis huruf, dan gambar.' },
  { step: '04', title: 'Prototype Klik', desc: 'Menghubungkan tombol antar halaman agar Anda bisa mencoba langsung alur navigasi web.' },
  { step: '05', title: 'Serah Terima', desc: 'Review akhir revisi desain, lalu penyerahan link visual & aset lengkap untuk programmer Anda.' },
]

const deliverables = ['Visual UI Design', 'Web Prototype', 'Flexbox / Grid', 'CSS Variables', 'Design Tokens', 'Adobe Photoshop', 'Adobe Illustrator', 'SVG Vector Assets', 'Google Web Fonts', 'Tailwind Config', 'Developer Handoff', 'UI Kits / Library']

export default function UIUXPage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [sliderVal, setSliderVal] = useState<number>(50)

  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">

      <Helmet>
        <title>Jasa Desain UI/UX & Redesign Website Profesional | Cozybytes</title>
        <meta name="description" content="Website lama Anda kami tata ulang supaya rapi, nyaman dipakai pengunjung, dan sesuai warna brand. Lengkap dengan prototype interaktif yang bisa diklik dan aset siap diserahkan ke programmer. Mulai Rp 999.000." />
        <meta name="keywords" content="jasa desain UI UX website, redesign website, wireframe, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/uiux" />
        <meta property="og:title" content="Jasa Desain UI/UX & Redesign Website Profesional | Cozybytes" />
        <meta property="og:description" content="Website lama Anda kami tata ulang supaya rapi, nyaman dipakai pengunjung, dan sesuai warna brand. Lengkap dengan prototype interaktif dan aset siap coding." />
        <meta property="og:url" content="https://cozybytes.media/layanan/uiux" />
        <meta property="og:image" content="https://cozybytes.media/services/uiux.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/uiux.jpg" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqs.map((f) => ({
              '@type': 'Question',
              name: f.q,
              acceptedAnswer: { '@type': 'Answer', text: f.a },
            })),
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Service',
            name: 'Jasa Desain UI/UX & Redesign Website',
            serviceType: 'UI/UX Design',
            description: 'Desain ulang tampilan dan alur navigasi website. Wireframe, prototype interaktif, design system, dan handoff developer.',
            url: 'https://cozybytes.media/layanan/uiux',
            areaServed: 'Indonesia',
            provider: { '@type': 'ProfessionalService', name: 'Cozybytes Media', url: 'https://cozybytes.media' },
            offers: [
              { '@type': 'Offer', name: 'Paket Basic', price: '999000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Paket Pro UX', price: '2499000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Paket Full Design', price: '3999000', priceCurrency: 'IDR' },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              { '@type': 'ListItem', position: 2, name: 'Layanan Desain UI/UX', item: 'https://cozybytes.media/layanan/uiux' },
            ],
          })}
        </script>
      </Helmet>

      {/* ============ HERO: copy left + before/after slider right ============ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16">
        <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-24" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 80% 25%, rgba(0,255,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 5% 85%, rgba(0,255,255,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <span className="mb-6 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                Desain UI/UX & Redesign
              </span>
              <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem] font-medium">
                Website jadul?
                <br />
                <span className="text-[#00FFFF]">Tata ulang. Geser sendiri.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                Kami tata ulang struktur dan tampilan website Anda agar rapi, nyaman dipakai pengunjung, dan sesuai warna brand.
              </p>

              <div className="mt-9 flex flex-wrap items-center gap-4">
                <motion.a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-2 rounded-full bg-[#00FFFF] px-7 py-3.5 text-sm font-bold text-black shadow-[0_0_30px_rgba(0,255,255,0.25)]"
                >
                  <MessageCircle className="h-4 w-4" />
                  Konsultasi via WhatsApp
                </motion.a>
                <a
                  href="#harga"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 px-7 py-3.5 text-sm font-semibold text-white/75 transition-all hover:border-white/30 hover:bg-white/5 hover:text-white"
                >
                  Lihat Paket Desain
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                {[
                  { num: 'SVG', label: 'Aset diserahkan' },
                  { num: 'Klik', label: 'Prototype interaktif' },
                  { num: 'CSS', label: 'Handoff developer' },
                ].map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <div className="font-mono text-xl font-bold text-white">{s.num}</div>
                    <div className="mt-1 text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Before/After slider */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#00FFFF]/5 blur-2xl" />
                <div className="relative aspect-[4/3] w-full select-none overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
                  {/* BEFORE layer: cluttered old-school light website (base) */}
                  <div className="absolute inset-0 flex flex-col bg-[#dedad0] p-3.5 font-serif text-zinc-800">
                    <span className="absolute right-3 top-3 z-10 rounded-sm bg-red-600 px-2 py-0.5 text-[8px] font-black tracking-[0.15em] text-white shadow">
                      SEBELUM
                    </span>

                    {/* old-school nav */}
                    <div className="flex items-center gap-2.5 border-b-2 border-zinc-500 bg-[#c7c1b2] px-2 py-1.5 text-[7px] font-bold">
                      {['HOME', 'PROFIL', 'PRODUK', 'GALERI', 'BUKU TAMU', 'KONTAK'].map((m) => (
                        <span key={m} className="text-blue-800 underline">{m}</span>
                      ))}
                    </div>

                    {/* shouting banner */}
                    <div className="mt-1.5 bg-yellow-300 px-2 py-1 text-center text-[8px] font-bold text-red-700">
                      !!! SELAMAT DATANG DI WEBSITE KAMI ~ PROMO BESAR-BESARAN !!!
                    </div>

                    <h3 className="mt-1.5 text-center text-[13px] font-bold underline decoration-2">
                      CV. MAJU JAYA BERSAMA
                    </h3>

                    <div className="mt-1.5 flex min-h-0 flex-1 gap-1.5">
                      {/* main content: dense gray text walls */}
                      <div className="flex-1 space-y-1 overflow-hidden border border-zinc-500 bg-white/80 p-2">
                        <div className="h-1.5 w-full bg-zinc-400" />
                        <div className="h-1.5 w-full bg-zinc-400" />
                        <div className="h-1.5 w-5/6 bg-zinc-400" />
                        <div className="h-1.5 w-full bg-zinc-400" />
                        <div className="flex h-12 items-center justify-center border border-dashed border-zinc-500 bg-zinc-300 text-[7px] italic text-zinc-600">
                          gambar_banner_01.jpg (587 KB)
                        </div>
                        <div className="h-1.5 w-full bg-zinc-400" />
                        <div className="h-1.5 w-full bg-zinc-400" />
                        <div className="h-1.5 w-3/4 bg-zinc-400" />
                      </div>
                      {/* cluttered sidebar */}
                      <div className="flex w-[34%] flex-col gap-1.5 overflow-hidden border border-zinc-500 bg-[#efe8d8] p-1.5 text-[7px]">
                        <div className="bg-blue-900 px-1.5 py-0.5 font-bold text-white">MENU SAMPING</div>
                        <span className="text-blue-800 underline">&raquo; Daftar Harga</span>
                        <span className="text-blue-800 underline">&raquo; Cara Order</span>
                        <span className="text-blue-800 underline">&raquo; Testimoni</span>
                        <div className="mt-auto border border-zinc-500 bg-white p-1 text-center leading-tight">
                          Pengunjung ke:
                          <br />
                          <span className="font-mono text-[8px] font-bold">0048172</span>
                        </div>
                      </div>
                    </div>

                    {/* screaming CTA */}
                    <div className="mt-1.5 flex h-7 items-center justify-center bg-red-600 text-[9px] font-black tracking-wide text-yellow-200">
                      &gt;&gt;&gt; KLIK DISINI, BELI SEKARANG JUGA !!! &lt;&lt;&lt;
                    </div>
                  </div>

                  {/* AFTER layer: cozybytes dark premium, clipped (no squeeze) */}
                  <div
                    className="absolute inset-0 flex flex-col bg-zinc-950 p-5"
                    style={{ clipPath: `inset(0 ${100 - sliderVal}% 0 0)` }}
                  >
                    <div
                      className="pointer-events-none absolute inset-0"
                      style={{ background: 'radial-gradient(ellipse 70% 55% at 25% 20%, rgba(0,255,255,0.10) 0%, transparent 60%)' }}
                    />
                    <span className="absolute left-3 top-3 z-10 rounded-sm bg-[#00FFFF] px-2 py-0.5 text-[8px] font-black tracking-[0.15em] text-black shadow-[0_0_12px_rgba(0,255,255,0.4)]">
                      SESUDAH
                    </span>

                    <div className="relative mt-6 flex items-center justify-between border-b border-white/10 pb-3">
                      <span className="font-display text-xs font-semibold tracking-wide text-white">
                        majujaya<span className="text-[#00FFFF]">.</span>co.id
                      </span>
                      <span className="rounded-full border border-[#00FFFF]/30 bg-[#00FFFF]/10 px-2 py-0.5 font-mono text-[8px] font-bold text-[#00FFFF]">
                        99 PageSpeed
                      </span>
                    </div>

                    <div className="relative flex min-h-0 flex-1 flex-col justify-center">
                      <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-[#00FFFF]/70">
                        CV. Maju Jaya Bersama
                      </span>
                      <h3 className="mt-1.5 font-display text-xl font-medium leading-[1.1] text-white sm:text-2xl">
                        Partner konstruksi
                        <br />
                        <span className="text-[#00FFFF]">yang dipercaya.</span>
                      </h3>
                      <p className="mt-2 max-w-[230px] text-[9px] leading-relaxed text-white/50">
                        Pengalaman 15 tahun menangani proyek komersial dan residensial di seluruh Sumatera.
                      </p>
                      <div className="mt-3.5 flex gap-2">
                        <span className="flex h-8 items-center rounded-full bg-[#00FFFF] px-4 text-[9px] font-bold text-black shadow-[0_0_18px_rgba(0,255,255,0.35)]">
                          Konsultasi Gratis
                        </span>
                        <span className="flex h-8 items-center rounded-full border border-white/15 px-4 text-[9px] font-semibold text-white/70">
                          Lihat Proyek
                        </span>
                      </div>
                    </div>

                    <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 pt-3">
                      {[
                        { num: '15+', label: 'Tahun berdiri' },
                        { num: '120', label: 'Proyek selesai' },
                        { num: '98%', label: 'Klien puas' },
                      ].map((s) => (
                        <div key={s.label}>
                          <div className="font-mono text-sm font-bold text-[#00FFFF]">{s.num}</div>
                          <div className="text-[7px] text-white/40">{s.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={sliderVal}
                    onChange={(e) => setSliderVal(Number(e.target.value))}
                    aria-label="Geser untuk membandingkan desain lama dan baru"
                    className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
                  />

                  {/* Divider + handle */}
                  <div
                    className="pointer-events-none absolute inset-y-0 z-10 w-[3px] -translate-x-1/2 bg-[#00FFFF] shadow-[0_0_20px_rgba(0,255,255,0.7)]"
                    style={{ left: `${sliderVal}%` }}
                  >
                    <div className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-zinc-950 bg-[#00FFFF] shadow-[0_0_25px_rgba(0,255,255,0.8)]">
                      <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M5 1L1 6L5 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M11 1L15 6L11 11" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </div>
                </div>
                <p className="mt-4 text-center text-xs text-white/40">
                  Geser handle untuk membandingkan tampilan lama dan hasil redesign.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PAIN POINTS: world-class editorial bento ============ */}
      <section className="relative overflow-hidden border-t border-white/5 py-24 md:py-32">
        {/* atmosphere */}
        <div className="pointer-events-none absolute inset-0" style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(0,255,255,0.07) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 90% 80%, rgba(248,209,106,0.04) 0%, transparent 60%)' }} />
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        <div className="pointer-events-none absolute top-0 left-1/2 h-px w-[80%] -translate-x-1/2 bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent" />

        <div className="relative mx-auto max-w-7xl px-5 md:px-8">
          {/* header */}
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.7, ease: [0.22,1,0.36,1] }}
              className="lg:col-span-7"
            >
              <span className="mb-4 inline-flex items-center gap-2 border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                <AlertTriangle className="h-3 w-3" /> Audit Cepat
              </span>
              <h2 className="font-display text-[2.2rem] font-medium leading-[0.95] tracking-tight sm:text-5xl md:text-[3.4rem]">
                <span className="text-white">Tampilan berantakan</span>
                <br />
                <span className="font-light italic text-white/90">membuat pembeli</span> <span className="text-[#00FFFF]">ragu.</span>
              </h2>
              <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/50">
                Empat sinyal paling sering yang bikin calon pembeli menutup tab dalam 3 detik — dan yang kami rapikan di setiap redesign.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="hidden lg:col-span-5 lg:flex lg:justify-end"
            >
              <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-4 py-2 backdrop-blur">
                <span className="h-2 w-2 rounded-full bg-[#00FFFF] shadow-[0_0_10px_rgba(0,255,255,0.8)] animate-pulse" />
                <span className="font-mono text-xs text-white/60">4 pain → 4 fix • Cozybytes audit</span>
              </div>
            </motion.div>
          </div>

          {/* bento grid */}
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:gap-6">
            {painPoints.map((p, i) => {
              const Icon = p.icon
              const accentMap = {
                cyan: { border: 'hover:border-[#00FFFF]/30', glow: 'rgba(0,255,255,0.08)', iconBg: 'bg-[#00FFFF]/10 text-[#00FFFF] group-hover:bg-[#00FFFF] group-hover:text-black', line: 'bg-[#00FFFF]' },
                gold: { border: 'hover:border-[#F8D16A]/30', glow: 'rgba(248,209,106,0.08)', iconBg: 'bg-[#F8D16A]/10 text-[#F8D16A] group-hover:bg-[#F8D16A] group-hover:text-black', line: 'bg-[#F8D16A]' },
                violet: { border: 'hover:border-violet-300/30', glow: 'rgba(196,181,253,0.08)', iconBg: 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-300 group-hover:text-black', line: 'bg-violet-300' },
                emerald: { border: 'hover:border-emerald-300/30', glow: 'rgba(110,231,183,0.08)', iconBg: 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-300 group-hover:text-black', line: 'bg-emerald-300' },
              }[p.accent]

              return (
                <motion.div
                  key={p.num}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22,1,0.36,1] }}
                  whileHover={{ y: -6 }}
                  className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-white/[0.07] bg-white/[0.02] p-7 md:p-8 backdrop-blur-sm transition-all duration-300 ${accentMap.border} hover:bg-white/[0.035] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)]`}
                >
                  {/* glow */}
                  <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" style={{ background: accentMap.glow }} />
                  {/* ghost number */}
                  <span className="pointer-events-none absolute -right-2 -top-2 font-display text-[88px] font-medium leading-none text-white/[0.04] group-hover:text-white/[0.06] transition-colors">
                    {p.num}
                  </span>

                  <div className="relative">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 transition-all duration-300 ${accentMap.iconBg}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-mono text-xs font-bold tracking-[0.18em] text-white/25 group-hover:text-white/40 transition-colors">
                        {p.num} <span className="text-white/10">/</span> 04
                      </span>
                    </div>

                    <span className="mt-5 inline-block rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      {p.kicker}
                    </span>

                    <h3 className="mt-3 font-display text-xl font-medium leading-tight tracking-tight text-white md:text-[22px]">
                      {p.title}
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-white/50">
                      {p.desc}
                    </p>

                    {/* bottom line */}
                    <div className="mt-7 flex items-center gap-3">
                      <div className="h-px flex-1 bg-white/[0.06] group-hover:bg-white/10 transition-colors" />
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/25 group-hover:text-white/50 transition-colors flex items-center gap-1.5">
                        Dampak konversi <span className={`h-1 w-1 rounded-full ${accentMap.line} opacity-60 group-hover:opacity-100`} />
                      </span>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* bottom bar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/5 bg-white/[0.01] px-6 py-5 md:flex-row"
          >
            <p className="text-sm text-white/60 text-center md:text-left">
              Semua masalah di atas bisa kami audit <span className="font-semibold text-white">gratis</span> dari link website lama Anda.
            </p>
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full bg-[#00FFFF] px-5 py-2.5 text-sm font-bold text-black shadow-[0_0_22px_rgba(0,255,255,0.25)] hover:shadow-[0_0_30px_rgba(0,255,255,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]">
              <MessageCircle className="h-4 w-4" /> Audit Gratis
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============ FEATURES: sticky left header + rows right ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                  Cakupan Layanan
                </span>
                <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
                  Dari riset
                  <br />
                  sampai handoff.
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                  Enam tahap kerja yang kami lakukan di setiap proyek desain, apa pun skala paketnya.
                </p>
              </div>
            </div>

            <div className="space-y-4 lg:col-span-7">
              {featuresList.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.45, delay: i * 0.05 }}
                  className="group flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 transition-colors hover:border-[#00FFFF]/25"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#00FFFF]/10 transition-colors group-hover:bg-[#00FFFF]/20">
                    <f.icon className="h-5 w-5 text-[#00FFFF]" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-white/50">{f.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Dibanding agensi besar,
              <br />
              freelancer, dan template.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Kriteria Desain</th>
                  <th className="p-5 font-display text-sm font-semibold text-[#00FFFF]">Cozybytes UI/UX Design</th>
                  <th className="p-5 text-sm font-bold text-white/60">Agensi Tradisional (Besar)</th>
                  <th className="p-5 text-sm font-bold text-white/60">Desainer Freelancer</th>
                  <th className="p-5 text-sm font-bold text-white/60">Tema/Template Instan</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 transition-all last:border-0 hover:bg-white/[0.015]">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="border-x border-[#00FFFF]/10 bg-[#00FFFF]/5 p-5 text-sm font-medium text-[#00FFFF]">{row.cozy}</td>
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

      {/* ============ DELIVERABLES: pill cloud ============ */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-medium tracking-tight text-white/80 md:text-3xl">
            Yang Anda terima saat serah terima.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {deliverables.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.35, delay: i * 0.03 }}
                className="rounded-full border border-white/[0.08] bg-white/[0.02] px-5 py-2.5 font-mono text-sm text-white/70 transition-colors hover:border-[#00FFFF]/30 hover:text-[#00FFFF]"
              >
                {item}
              </motion.span>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-x-8 gap-y-2 text-xs text-white/40">
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Aset Gambar & Ikon Rapi</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Komponen Fleksibel (Variants)</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Font Komersil Bebas Lisensi</span>
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW: horizontal stepper ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Alur kerja kolaboratif.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Dari brainstorming hingga serah terima aset, Anda terlibat di setiap fase.
            </p>
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-5 hidden h-px bg-gradient-to-r from-[#00FFFF]/40 via-white/10 to-transparent md:block" />
            <div className="grid gap-10 md:grid-cols-5 md:gap-6">
              {workflowSteps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: i * 0.08 }}
                  className="relative"
                >
                  <div className="mb-5 flex h-10 w-10 items-center justify-center rounded-full border border-[#00FFFF]/30 bg-zinc-950 font-mono text-xs font-bold text-[#00FFFF]">
                    {step.step}
                  </div>
                  <h3 className="font-display text-lg font-medium text-white">{step.title}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-white/45">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ PRICING ============ */}
      <section id="harga" ref={pricingRef} className="relative overflow-hidden py-24 md:py-32">
        <LightCone tint="gold" className="left-1/2 -translate-x-1/2 -top-16" />
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 max-w-2xl"
          >
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Investasi
            </span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight sm:text-5xl">
              Pilih paket desain
              <br />
              UI/UX website Anda.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Investasikan anggaran pada tampilan web yang meyakinkan calon pembeli.
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
              Konsultasikan custom requirements Anda
            </a>
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
            Pertanyaan seputar desain UI/UX.
          </h2>

          <div className="mt-12 divide-y divide-white/[0.08] border-t border-white/[0.08]">
            {faqs.map((faq, i) => (
              <div key={i}>
                <button
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left transition-colors hover:text-[#00FFFF]"
                >
                  <span className="text-base font-semibold text-white/90">{faq.q}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-white/40 transition-transform duration-300 ${activeFaq === i ? 'rotate-180 text-[#00FFFF]' : ''}`}
                  />
                </button>
                <AnimatePresence initial={false}>
                  {activeFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="pb-7 pr-10 text-sm leading-relaxed text-white/50">{faq.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ BOTTOM CTA ============ */}
      <section className="relative overflow-hidden py-28 md:py-36">
        <div
          className="pointer-events-none absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(0,255,255,0.10) 0%, transparent 70%)' }}
        />
        <div className="relative z-10 mx-auto max-w-4xl px-5 text-center md:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight sm:text-5xl md:text-6xl">
              Kirim link website lama Anda.
              <br />
              <span className="text-[#00FFFF]">Kami audit visualnya, gratis.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Kami tunjukkan bagian visual yang menghambat konversi, tanpa komitmen apa pun.
            </p>
            <motion.a
              href={WA_LINK}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#00FFFF] px-8 py-4 text-sm font-bold text-black shadow-[0_0_30px_rgba(0,255,255,0.25)]"
            >
              <MessageCircle className="h-4 w-4" />
              Konsultasi via WhatsApp
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
