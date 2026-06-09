import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  Target, MessageCircle, Rocket, BarChart2, Smartphone, 
  RefreshCw, ArrowUpRight, Check, AlertCircle, 
  ChevronDown, Cpu, Sparkles, MessageSquare
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20landing%20page.'

const tiers: PricingTier[] = [
  {
    name: 'Bulanan',
    subtitle: 'Sewa',
    tagline: 'Mulai pasarkan produk Anda tanpa komitmen panjang. Cocok untuk uji coba pasar.',
    price: 'Rp 99.000',
    period: '/ bulan',
    discount: 'Sewa Bulanan',
    discountTone: 'cyan',
    cta: 'Pilih Paket Bulanan',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page custom' },
      { available: true, label: 'Domain .my.id / .biz.id / .web.id gratis' },
      { available: true, label: 'Desain responsif khusus layar ponsel' },
      { available: true, label: 'Tautan chat WhatsApp langsung' },
      { available: true, label: 'Setup Meta Pixel & tracking Google Ads' },
      { available: false, label: 'Gratis domain berakhiran .com/.id' },
      { available: false, label: 'Akses penuh kepemilikan kode sumber' },
      { available: false, label: 'Halaman tetap online jika masa sewa habis' },
    ],
  },
  {
    name: 'Tahunan',
    subtitle: 'Sewa',
    tagline: 'Solusi hemat untuk kampanye iklan jangka panjang. Pilihan terbaik UMKM.',
    oldPrice: 'Rp 1.188.000',
    savings: 'Hemat Rp 238rb',
    price: 'Rp 950.000',
    period: '/ tahun',
    discount: 'Hemat 20%',
    discountTone: 'gold',
    cta: 'Pilih Paket Tahunan',
    highlighted: true,
    specialBadge: 'Paling hemat',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page custom' },
      { available: true, label: 'Domain .my.id / .biz.id / .web.id gratis' },
      { available: true, label: 'Desain responsif khusus layar ponsel' },
      { available: true, label: 'Tautan chat WhatsApp langsung' },
      { available: true, label: 'Setup Meta Pixel & tracking Google Ads' },
      { available: true, label: 'Prioritas bantuan teknis selama 1 tahun' },
      { available: false, label: 'Gratis domain berakhiran .com/.id' },
      { available: false, label: 'Akses penuh kepemilikan kode sumber' },
    ],
  },
  {
    name: 'Ownership',
    subtitle: 'Beli',
    tagline: 'Bayar sekali, landing page jadi milik Anda selamanya tanpa biaya sewa bulanan.',
    price: 'Rp 1.299.000',
    period: 'sekali bayar',
    discount: 'Milik Selamanya',
    discountTone: 'violet',
    cta: 'Pilih Paket Ownership',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: '1 halaman landing page custom' },
      { available: true, label: 'Gratis domain .com/.id (tahun pertama)' },
      { available: true, label: 'Desain mobile-first super cepat' },
      { available: true, label: 'Tautan WhatsApp & formulir pemesanan' },
      { available: true, label: 'Setup lengkap analytics & pixel pelacak' },
      { available: true, label: 'Akses penuh source code diserahkan' },
      { available: true, label: 'Panduan lengkap cara mengedit mandiri' },
      { available: true, label: 'Gratis hosting cepat selama 1 tahun' },
    ],
  },
]

const featuresList = [
  {
    icon: Target,
    title: 'Halaman Khusus Jualan',
    desc: 'Kami mendesain halaman web tanpa menu navigasi keluar yang mengganggu. Pengunjung diarahkan untuk fokus membaca penawaran produk Anda dan menekan tombol CTA.',
  },
  {
    icon: BarChart2,
    title: 'Pelacakan Iklan Sudah Siap',
    desc: 'Sudah diatur agar siap dipasangi Meta Pixel, TikTok Pixel, dan Google Tag Manager. Data konversi Anda tercatat akurat untuk membantu evaluasi iklan.',
  },
  {
    icon: Smartphone,
    title: 'Dibuat Khusus untuk Layar HP',
    desc: 'Hampir seluruh pembeli dari iklan media sosial membuka link lewat ponsel. Kami pastikan layout gambar, teks, dan tombol pemesanan sangat nyaman diakses dari HP.',
  },
  {
    icon: Rocket,
    title: 'Loading Halaman Instan',
    desc: 'Setiap detik pengunjung menunggu halaman dimuat, budget iklan Anda terbuang sia-sia. Landing page statis kami termuat dalam waktu kurang dari 1.5 detik.',
  },
  {
    icon: MessageCircle,
    title: 'Tombol Chat WA Langsung',
    desc: 'Tautan ke WhatsApp sudah disiapkan dengan format teks pemesanan otomatis. Calon pembeli tidak perlu mengetik ulang barang yang ingin mereka beli.',
  },
  {
    icon: RefreshCw,
    title: 'Copywriting Alur Penawaran',
    desc: 'Kami menyusun struktur tulisan penawaran yang runtut mulai dari hook pengait perhatian, pengenalan masalah, benefit, bukti testimoni, hingga ajakan bertindak.',
  },
]

const painPoints = [
  {
    title: 'Budget Iklan Boncos',
    desc: 'Iklan Anda banyak yang ngeklik, tapi tidak ada konversi penjualan karena halaman web terlalu lama dimuat di HP pembeli, membuat mereka terlanjur menutup tab.',
  },
  {
    title: 'Banyak Menu Bikin Bingung',
    desc: 'Mengarahkan traffic iklan ke website biasa. Calon pembeli malah asyik mengklik menu profil perusahaan dan lupa membeli produk utama Anda.',
  },
  {
    title: 'Buta Data Hasil Iklan',
    desc: 'Anda tidak tahu iklan atau konten mana yang menghasilkan penjualan karena piksel pelacak atau event tracking klik WhatsApp tidak terpasang dengan benar.',
  },
  {
    title: 'Ketergantungan SaaS Mahal',
    desc: 'Membayar sewa bulanan platform pembuat landing page yang terus naik. Jika Anda berhenti berlangganan, seluruh data halaman jualan Anda akan dihapus.',
  },
]

const comparisons = [
  {
    aspect: 'Kecepatan Muat',
    cozy: 'Instan (<1.5 detik), menahan calon pembeli',
    saas: 'Sedang, karena script platform yang cukup berat',
    wordpress: 'Lambat akibat plugin page builder yang menumpuk',
    biolink: 'Cepat, namun layout desain sangat terbatas',
  },
  {
    aspect: 'Tracking Pixel',
    cozy: 'Tinggal pakai, terpasang Meta, TikTok & GTM',
    saas: 'Bisa, tetapi biasanya dikunci di paket langganan mahal',
    wordpress: 'Butuh tambahan plugin pelacak rawan crash',
    biolink: 'Sangat dasar, sulit melacak event klik spesifik',
  },
  {
    aspect: 'Kebebasan Desain',
    cozy: 'Bebas disesuaikan dengan kebutuhan produk',
    saas: 'Terbatas pada pilihan komponen template bawaan',
    wordpress: 'Bisa custom, namun membuat kode web semakin berat',
    biolink: 'Kaku, hanya berupa kumpulan tombol link',
  },
  {
    aspect: 'Biaya Bulanan',
    cozy: 'Bayar sekali (Ownership) atau sewa bulanan flat murah',
    saas: 'Biaya langganan bulanan terus berjalan selamanya',
    wordpress: 'Biaya tahunan hosting + lisensi plugin builder',
    biolink: 'Gratis/Murah untuk paket dasar',
  },
]

const faqs = [
  {
    q: 'Apa bedanya Landing Page dengan Website biasa?',
    a: 'Website biasa memiliki banyak navigasi (Menu Home, Profil, Karir, Blog) dan didesain untuk eksplorasi informasi. Landing page adalah satu halaman khusus yang didesain untuk satu tujuan: mengonversi pengunjung menjadi pembeli. Tidak ada menu keluar yang membingungkan, sehingga sangat efektif dijadikan link tujuan iklan Facebook, Instagram, atau Google Ads.'
  },
  {
    q: 'Apakah landing page ini sudah bisa dipasangi pixel iklan?',
    a: 'Sudah sangat siap. Kami mengintegrasikan Meta Pixel (Facebook Ads), TikTok Pixel, dan Google Tag Manager sejak awal. Kami juga bisa mengatur custom event pelacakan khusus, seperti melacak klik tombol WhatsApp agar data optimasi iklan Anda akurat.'
  },
  {
    q: 'Bagaimana perbedaan sistem Sewa Bulanan dengan sistem Beli (Ownership)?',
    a: 'Sistem Sewa (Bulanan/Tahunan) cocok bagi Anda yang baru mencoba pasar atau memiliki produk musiman dengan modal awal minim. Kami yang mengurus hosting, domain (.my.id/.web.id), dan pemeliharaan teknisnya. Sistem Beli (Ownership) adalah investasi sekali bayar, di mana hosting gratis 1 tahun pertama dan domain (.com/.id) serta source code diberikan penuh kepada Anda.'
  },
  {
    q: 'Bagaimana alur integrasi WhatsApp di landing page ini?',
    a: 'Kami mengintegrasikannya langsung dengan WhatsApp API. Ketika pengunjung menekan tombol beli, mereka akan diarahkan ke WhatsApp admin Anda dengan draf pesan otomatis (contoh: "Halo Cozybytes, saya tertarik memesan Landing Page Paket Tahunan"). Kami juga bisa menambahkan formulir data diri terlebih dahulu sebelum dialihkan ke WA.'
  },
  {
    q: 'Berapa lama proses pengerjaan landing page?',
    a: 'Proses pengerjaan berkisar antara 3 hingga 5 hari kerja setelah kami menerima materi gambar produk, teks penawaran, dan detail kontak dari Anda.'
  },
  {
    q: 'Apakah saya bisa mengganti isi tulisan sendiri di kemudian hari?',
    a: 'Bisa. Untuk paket Beli (Ownership), kami memberikan panduan praktis berupa dokumen tertulis untuk membantu Anda melakukan edit teks/gambar mandiri. Untuk paket Sewa (khusus tahunan), Anda bisa meminta bantuan tim support kami untuk update tulisan minor gratis.'
  }
]

export default function LandingPageServicePage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [activeHotspot, setActiveHotspot] = useState<'hook' | 'urgency' | 'cta' | 'proof'>('hook')
  const [timeLeft, setTimeLeft] = useState<number>(599)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 599 : prev - 1))
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60)
    const s = seconds % 60
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  }

  const hotspots = {
    hook: {
      title: 'Headline Pengait (Hook)',
      desc: 'Pernyataan pembuka yang langsung mengunci perhatian pengunjung iklan dalam 3 detik pertama. Menyebutkan solusi masalah secara langsung.',
      mockText: 'Potong Biaya Iklan Hingga 40% Dengan Landing Page Instan'
    },
    urgency: {
      title: 'Urgency & Penawaran Terbatas',
      desc: 'Elemen diskon waktu atau hitung mundur untuk merangsang pembeli mengambil keputusan sekarang daripada menundanya.',
      mockText: 'Diskon 50% Hanya Berlaku Untuk 10 Pendaftar Pertama Hari Ini!'
    },
    cta: {
      title: 'WhatsApp Call-To-Action',
      desc: 'Tombol kontak yang menonjol dan melayang (sticky) di layar HP agar pembeli gampang menghubungi Anda kapan saja.',
      mockText: 'Ambil Promo Via WhatsApp'
    },
    proof: {
      title: 'Bukti Sosial (Testimoni)',
      desc: 'Pernyataan kepuasan dari pembeli nyata untuk meyakinkan calon pelanggan baru bahwa produk Anda terpercaya.',
      mockText: '“Sangat terbantu! Penjualan online kami naik drastis sejak pakai landing page ini.” - Budi, Toko Sepatu Lokal'
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />

      <Helmet>
        <title>Jasa Pembuatan Landing Page Konversi Tinggi & Ads-Ready | Cozybytes</title>
        <meta name="description" content="Jasa pembuatan landing page iklan Facebook, TikTok & Google Ads dengan tingkat konversi tinggi. Cepat, mobile-first, integrasi tracking pixel lengkap. Sewa mulai Rp 99rb/bulan." />
        <meta name="keywords" content="jasa landing page, landing page konversi tinggi, landing page iklan Facebook, landing page TikTok Ads, bikin landing page murah, landing page UMKM Lampung, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/landing-page" />
        <meta property="og:title" content="Jasa Pembuatan Landing Page Konversi Tinggi & Ads-Ready | Cozybytes" />
        <meta property="og:description" content="Setiap klik iklan Anda sangat berharga. Ubah traffic iklan menjadi prospek penjualan dengan landing page berkinerja tinggi, responsif, dan terintegrasi pixel tracking." />
        <meta property="og:url" content="https://cozybytes.media/layanan/landing-page" />
      </Helmet>

      {/* Hero Section */}
      <section
        className="relative pt-40 pb-28 overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse 70% 40% at 50% 0%, rgba(0,255,255,0.15) 0%, transparent 65%), radial-gradient(ellipse 50% 35% at 50% 45%, rgba(248,209,106,0.08) 0%, transparent 70%), #000',
        }}
      >
        <div className="pointer-events-none absolute inset-0 opacity-45">
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
              Landing Page Konversi Tinggi
            </span>
            <h1
              className="mb-6 text-4xl sm:text-6xl md:text-7xl leading-tight font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Ubah Klik Iklan Menjadi Penjualan dengan <br />
              <em className="text-[#00FFFF] italic font-normal">Halaman Landing Page yang Ringan dan Cepat</em>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
              Jangan buang anggaran iklan Anda hanya karena halaman web lambat dimuat. Kami membuat landing page custom yang dioptimasi khusus untuk layar HP, terintegrasi pixel pelacak, dan dirancang mengarahkan pengunjung langsung bertransaksi.
            </p>

            {/* Trust Badges */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Meta Pixel & TikTok Ads Ready
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Pengerjaan Cepat (3-5 Hari)
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Sewa Murah Mulai Rp 99rb/bln
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
                Hubungi Tim Iklan Kami
              </motion.a>
              <a
                href="#harga"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Lihat Skema Harga
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Visual Showcase Section */}
      <section className="py-20 bg-[#07070a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3 w-3" /> Conversion Anatomizer
              </span>
              <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Anatomi Halaman yang <br />
                <em className="text-[#00FFFF] italic font-normal">Memicu Klik Pembeli</em>
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Landing page yang sukses bukan soal desain ramai, tapi penempatan konten yang strategis. Klik bagian anatomi di bawah ini untuk melihat detail fungsinya.
              </p>
              
              <div className="flex flex-col gap-2.5">
                {(Object.keys(hotspots) as Array<keyof typeof hotspots>).map((key) => (
                  <button
                    key={key}
                    onClick={() => setActiveHotspot(key)}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      activeHotspot === key 
                        ? 'border-[#00FFFF]/30 bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.05)]' 
                        : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <span className={`text-sm font-bold block ${activeHotspot === key ? 'text-[#00FFFF]' : 'text-white'}`}>
                      {hotspots[key].title}
                    </span>
                    <p className="text-xs text-white/40 mt-1">{hotspots[key].desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              {/* Mobile Phone Mockup */}
              <div className="rounded-[40px] border-[8px] border-zinc-800 bg-zinc-950 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(0,255,255,0.03)] w-[300px] h-[580px] relative flex flex-col overflow-hidden">
                {/* Phone Speaker & Camera */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                  <div className="w-12 h-1 rounded-full bg-zinc-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-zinc-800" />
                </div>

                {/* Mobile Screen Content */}
                <div className="flex-1 bg-[#060608] rounded-[30px] p-4 pt-8 flex flex-col justify-between overflow-hidden relative text-center">
                  
                  {/* Headline Hotspot */}
                  <div className={`p-2.5 rounded-xl border transition-all relative ${
                    activeHotspot === 'hook' ? 'border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-white/5'
                  }`}>
                    <span className="text-[6px] font-bold text-[#00FFFF]/60 tracking-wider uppercase">★ Promo Terbatas</span>
                    <h3 className="text-xs font-bold text-white mt-1 leading-snug">
                      {hotspots.hook.mockText}
                    </h3>
                  </div>

                  {/* Varian Image Area */}
                  <div className="my-2 p-2 rounded-xl border border-white/5 bg-white/[0.01] flex-1 flex flex-col justify-center items-center relative">
                    <div className="h-20 w-20 rounded-full bg-gradient-to-tr from-[#00FFFF]/10 to-[#F8D16A]/10 border border-white/10 flex items-center justify-center text-[10px] text-white/30 font-serif">
                      Foto Produk
                    </div>
                    <div className="mt-2 h-2 w-3/4 rounded bg-white/5" />
                    <div className="mt-1 h-2.5 w-1/2 rounded bg-[#00FFFF]/10 border border-[#00FFFF]/10" />
                  </div>

                  {/* Urgency Hotspot */}
                  <div className={`p-2 rounded-lg border transition-all my-1.5 flex flex-col items-center justify-center gap-1 ${
                    activeHotspot === 'urgency' ? 'border-[#F8D16A] bg-[#F8D16A]/5 shadow-[0_0_10px_rgba(248,209,106,0.1)]' : 'border-white/5'
                  }`}>
                    <p className="text-[7px] text-[#F8D16A] font-semibold leading-relaxed">
                      {hotspots.urgency.mockText}
                    </p>
                    <span className="text-[9px] font-mono font-bold text-white bg-red-500/20 px-2 py-0.5 rounded border border-red-500/30">
                      Sisa Waktu: {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* Testimonial Hotspot */}
                  <div className={`p-2.5 rounded-xl border transition-all my-1.5 ${
                    activeHotspot === 'proof' ? 'border-[#00FFFF] bg-[#00FFFF]/5' : 'border-white/5'
                  }`}>
                    <p className="text-[7px] text-white/40 italic leading-snug">
                      {hotspots.proof.mockText}
                    </p>
                  </div>

                  {/* WhatsApp CTA Hotspot */}
                  <div className="relative">
                    <div className={`p-2.5 rounded-xl border transition-all ${
                      activeHotspot === 'cta' ? 'border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-white/5'
                    }`}>
                      <div className="h-8 rounded-full bg-[#00FFFF] text-black text-[9px] font-black flex items-center justify-center gap-1 shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                        <MessageSquare className="h-3.5 w-3.5 fill-current" />
                        {hotspots.cta.mockText}
                      </div>
                    </div>

                    {/* WhatsApp Simulator Chat Overlay */}
                    <AnimatePresence>
                      {activeHotspot === 'cta' && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          className="absolute bottom-11 inset-x-0 mx-auto w-56 rounded-xl border border-emerald-500/20 bg-zinc-900 overflow-hidden shadow-[0_10px_30px_rgba(0,0,0,0.8)] z-10 text-left text-[8px]"
                        >
                          {/* Chat Header */}
                          <div className="bg-emerald-600 p-2 flex items-center gap-1.5 text-white">
                            <div className="h-4 w-4 rounded-full bg-white/20 flex items-center justify-center font-bold text-[6px]">WA</div>
                            <div className="flex-1 min-w-0">
                              <h5 className="font-bold leading-none text-[8px]">Toko Online Anda</h5>
                              <span className="text-[6px] text-emerald-100 leading-none">Online</span>
                            </div>
                          </div>
                          {/* Chat Messages */}
                          <div className="p-2 bg-[#0b141a] space-y-2 h-24 overflow-y-auto font-sans">
                            <div className="bg-[#202c33] text-white p-1.5 rounded-r-lg rounded-bl-lg max-w-[80%] leading-normal">
                              Halo kak! Mau klaim promo landing page hari ini?
                            </div>
                            <div className="bg-[#005c4b] text-[#e9edef] p-1.5 rounded-l-lg rounded-br-lg max-w-[80%] ml-auto leading-normal">
                              Halo, iya kak saya mau order mumpung diskon 50%!
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pain Points Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Masalah Umum Pengiklan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Anggaran Iklan Media Sosial Anda <br />
              <em className="text-[#F8D16A] italic font-normal">Sering Kali Habis Tanpa Hasil Penjualan?</em>
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
              Keunggulan Layanan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Detail Fitur Landing Page yang <br />
              <em className="text-[#00FFFF] italic font-normal">Membantu Mengoptimalkan Hasil Iklan</em>
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

      {/* Comparison Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Komparasi Layanan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Landing Page Cozybytes Lebih Efisien <br />
              <em className="text-[#F8D16A] italic font-normal">Dibanding Menggunakan Layanan Pihak Ketiga?</em>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.01]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Kriteria Utama</th>
                  <th className="p-5 text-sm font-bold text-[#00FFFF]">Cozybytes Landing Page</th>
                  <th className="p-5 text-sm font-bold text-white/60">Platform SaaS Instan</th>
                  <th className="p-5 text-sm font-bold text-white/60">WordPress Landing Page</th>
                  <th className="p-5 text-sm font-bold text-white/60">Linktree / Biolink Instan</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.015] transition-all">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="p-5 text-sm text-[#00FFFF] font-medium bg-[#00FFFF]/5 border-x border-[#00FFFF]/10">{row.cozy}</td>
                    <td className="p-5 text-sm text-white/50">{row.saas}</td>
                    <td className="p-5 text-sm text-white/50">{row.wordpress}</td>
                    <td className="p-5 text-sm text-white/50">{row.biolink}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Tech Stack Grid */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00FFFF]/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 md:px-6 relative z-10 text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
            Teknologi yang Digunakan
          </span>
          <h2 className="mb-12 text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Infrastruktur Web yang <em className="text-[#00FFFF] italic font-normal">Ringan dan Siap Pasang Pixel</em>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['Vite.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare', 'Vercel', 'Meta Pixel', 'TikTok Pixel', 'Google Tag Manager', 'WhatsApp API', 'Git'].map((tech) => (
              <div 
                key={tech} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-[#0a0a0d] hover:border-[#00FFFF]/20 transition-all"
              >
                <Cpu className="h-5 w-5 text-[#00FFFF] mb-2" />
                <span className="text-xs font-semibold text-white/80">{tech}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-white/40">
            <span>✓ Kompresi Gambar Otomatis</span>
            <span>✓ Jaringan Hosting Cloudflare</span>
            <span>✓ Serverless Tanpa Database Berat</span>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-[#09090B] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Tahapan Pembuatan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Landing Page Anda Siap Digunakan <br />
              <em className="text-[#F8D16A] italic font-normal">Hanya dalam 5 Langkah Singkat</em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { step: '01', title: 'Diskusi Awal', desc: 'Kami mengulas keunggulan produk Anda dan menentukan satu aksi utama yang diinginkan dari pembeli.' },
              { step: '02', title: 'Draft Tulisan', desc: 'Copywriter kami menulis draf tulisan penawaran yang menarik minat dan memicu keputusan belanja.' },
              { step: '03', title: 'Layout Visual', desc: 'Perancangan tata letak visual halaman web dengan memprioritaskan kenyamanan pengguna HP.' },
              { step: '04', title: 'Penulisan Kode', desc: 'Proses coding landing page dan integrasi tools pelacak pixel untuk kebutuhan iklan Anda.' },
              { step: '05', title: 'Serah Terima', desc: 'Halaman web online penuh, kami bantu uji coba alur pelacakan tombol chat WhatsApp Anda.' }
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
              Pilihan Investasi
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-6xl font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Model Sewa & Beli Putus <br />
              <em className="text-[#00FFFF] italic font-normal">Sesuai Kebutuhan Bisnis Anda</em>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/50">
              Gunakan skema sewa bulanan flat yang terjangkau untuk tes pasar, atau beli putus agar web jadi aset milik sendiri.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/40">
            Ingin membuat beberapa varian landing page untuk uji coba produk (A/B testing)?{' '}
            <a href={WA_LINK} target="_blank" rel="noopener noreferrer" className="font-semibold text-[#00FFFF] hover:underline">
              Tanyakan penawaran harga paket (bulk) di WhatsApp
            </a>
          </p>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Pertanyaan Umum
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Jawaban Singkat Seputar <br />
              <em className="text-[#F8D16A] italic font-normal">Pembuatan Landing Page</em>
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
              Optimasi Iklan
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Hentikan Buang-Buang Anggaran Iklan <br />
              <em className="text-[#00FFFF] italic font-normal">Ubah Pengunjung Menjadi Pembeli Mulai Hari Ini</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Diskusikan produk jualan Anda dengan tim developer & copywriting kami untuk merancang alur konversi terbaik.
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
              Mulai Konsultasi Landing Page
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
