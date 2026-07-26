import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Target, MessageCircle, Rocket, BarChart2, Smartphone,
  RefreshCw, ArrowUpRight, Check,
  ChevronDown, MessageSquare
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

const workflowSteps = [
  { step: '01', title: 'Diskusi Awal', desc: 'Kami mengulas keunggulan produk Anda dan menentukan satu aksi utama yang diinginkan dari pembeli.' },
  { step: '02', title: 'Draft Tulisan', desc: 'Copywriter kami menulis draf tulisan penawaran yang menarik minat dan memicu keputusan belanja.' },
  { step: '03', title: 'Layout Visual', desc: 'Perancangan tata letak visual halaman web dengan memprioritaskan kenyamanan pengguna HP.' },
  { step: '04', title: 'Penulisan Kode', desc: 'Proses coding landing page dan integrasi tools pelacak pixel untuk kebutuhan iklan Anda.' },
  { step: '05', title: 'Serah Terima', desc: 'Halaman web online penuh, kami bantu uji coba alur pelacakan tombol chat WhatsApp Anda.' },
]

const techStack = ['Vite.js', 'React.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare', 'Vercel', 'Meta Pixel', 'TikTok Pixel', 'Google Tag Manager', 'WhatsApp API', 'Git']

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
      mockText: '"Sangat terbantu! Penjualan online kami naik drastis sejak pakai landing page ini." - Budi, Toko Sepatu Lokal'
    }
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />

      <Helmet>
        <title>Jasa Pembuatan Landing Page Konversi Tinggi & Ads-Ready | Cozybytes</title>
        <meta name="description" content="Landing page yang terbuka kurang dari 2 detik di HP, jadi budget iklan Anda tidak terbuang sia-sia. Meta Pixel, TikTok Pixel, dan tombol WhatsApp sudah terpasang. Sewa mulai Rp 99 ribu per bulan, atau beli putus." />
        <meta name="keywords" content="jasa landing page, landing page iklan, landing page UMKM, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/landing-page" />
        <meta property="og:title" content="Jasa Pembuatan Landing Page Konversi Tinggi & Ads-Ready | Cozybytes" />
        <meta property="og:description" content="Landing page yang terbuka kurang dari 2 detik di HP, jadi budget iklan Anda tidak terbuang. Pixel iklan dan tombol WhatsApp sudah terpasang. Sewa mulai Rp 99 ribu per bulan." />
        <meta property="og:url" content="https://cozybytes.media/layanan/landing-page" />
        <meta property="og:image" content="https://cozybytes.media/services/landing.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/landing.jpg" />
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
            name: 'Jasa Pembuatan Landing Page',
            serviceType: 'Landing Page Development',
            description: 'Landing page ringan untuk iklan Facebook, TikTok, dan Google Ads. Mobile-first, tracking pixel terpasang, integrasi WhatsApp.',
            url: 'https://cozybytes.media/layanan/landing-page',
            areaServed: 'Indonesia',
            provider: { '@type': 'ProfessionalService', name: 'Cozybytes Media', url: 'https://cozybytes.media' },
            offers: [
              { '@type': 'Offer', name: 'Sewa Bulanan', price: '99000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Sewa Tahunan', price: '950000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Ownership', price: '1299000', priceCurrency: 'IDR' },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              { '@type': 'ListItem', position: 2, name: 'Layanan Landing Page', item: 'https://cozybytes.media/layanan/landing-page' },
            ],
          })}
        </script>
      </Helmet>

      {/* ============ HERO: copy + anatomy controls left, phone mockup right ============ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 80% 35%, rgba(0,255,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 8% 85%, rgba(0,255,255,0.04) 0%, transparent 60%)',
          }}
        />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-7"
            >
              <span className="mb-6 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                Landing Page Konversi Tinggi
              </span>
              <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem] font-medium">
                Klik iklan masuk.
                <br />
                <span className="text-[#00FFFF]">Penjualan keluar.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                Landing page custom yang ringan, dioptimasi untuk layar HP, dan terintegrasi pixel pelacak iklan.
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
                  Lihat Skema Harga
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              {/* Anatomy hotspot controls */}
              <div className="mt-12 max-w-lg border-t border-white/10 pt-6">
                <span className="mb-3 block text-xs font-semibold text-white/40">
                  Anatomi halaman yang memicu klik pembeli. Pilih elemennya:
                </span>
                <div className="grid grid-cols-2 gap-2.5">
                  {(Object.keys(hotspots) as Array<keyof typeof hotspots>).map((key) => (
                    <button
                      key={key}
                      onClick={() => setActiveHotspot(key)}
                      className={`rounded-xl border p-3 text-left transition-all ${
                        activeHotspot === key
                          ? 'border-[#00FFFF]/40 bg-[#00FFFF]/5'
                          : 'border-white/5 bg-white/[0.01] hover:border-white/10'
                      }`}
                    >
                      <span className={`block text-xs font-bold ${activeHotspot === key ? 'text-[#00FFFF]' : 'text-white/80'}`}>
                        {hotspots[key].title}
                      </span>
                    </button>
                  ))}
                </div>
                <p className="mt-3 min-h-[40px] text-xs leading-relaxed text-white/45">
                  {hotspots[activeHotspot].desc}
                </p>
              </div>
            </motion.div>

            {/* Phone mockup */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex justify-center lg:col-span-5"
            >
              <div className="relative flex h-[580px] w-[300px] flex-col overflow-hidden rounded-[40px] border-[8px] border-zinc-800 bg-zinc-950 p-3 shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(0,255,255,0.03)]">
                <div className="absolute left-1/2 top-0 z-30 flex h-5 w-32 -translate-x-1/2 items-center justify-center gap-1.5 rounded-b-2xl bg-zinc-800">
                  <div className="h-1 w-12 rounded-full bg-zinc-700" />
                  <div className="h-2.5 w-2.5 rounded-full border border-zinc-800 bg-zinc-900" />
                </div>

                <div className="relative flex flex-1 flex-col justify-between overflow-hidden rounded-[30px] bg-[#060608] p-4 pt-8 text-center">
                  {/* Headline hotspot */}
                  <div className={`relative rounded-xl border p-2.5 transition-all ${
                    activeHotspot === 'hook' ? 'border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-white/5'
                  }`}>
                    <span className="font-mono text-[6px] font-bold uppercase tracking-wider text-[#00FFFF]/60">Promo Terbatas</span>
                    <h3 className="mt-1 text-xs font-bold leading-snug text-white">
                      {hotspots.hook.mockText}
                    </h3>
                  </div>

                  {/* Product image area */}
                  <div className="relative my-2 flex flex-1 flex-col items-center justify-center rounded-xl border border-white/5 bg-white/[0.01] p-2">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-white/10 bg-gradient-to-tr from-[#00FFFF]/10 to-[#F8D16A]/10 font-mono text-[10px] text-white/30">
                      Foto Produk
                    </div>
                    <div className="mt-2 h-2 w-3/4 rounded bg-white/5" />
                    <div className="mt-1 h-2.5 w-1/2 rounded border border-[#00FFFF]/10 bg-[#00FFFF]/10" />
                  </div>

                  {/* Urgency hotspot */}
                  <div className={`my-1.5 flex flex-col items-center justify-center gap-1 rounded-lg border p-2 transition-all ${
                    activeHotspot === 'urgency' ? 'border-[#F8D16A] bg-[#F8D16A]/5 shadow-[0_0_10px_rgba(248,209,106,0.1)]' : 'border-white/5'
                  }`}>
                    <p className="text-[7px] font-semibold leading-relaxed text-[#F8D16A]">
                      {hotspots.urgency.mockText}
                    </p>
                    <span className="rounded border border-red-500/30 bg-red-500/20 px-2 py-0.5 font-mono text-[9px] font-bold text-white">
                      Sisa Waktu: {formatTime(timeLeft)}
                    </span>
                  </div>

                  {/* Testimonial hotspot */}
                  <div className={`my-1.5 rounded-xl border p-2.5 transition-all ${
                    activeHotspot === 'proof' ? 'border-[#00FFFF] bg-[#00FFFF]/5' : 'border-white/5'
                  }`}>
                    <p className="text-[7px] italic leading-snug text-white/40">
                      {hotspots.proof.mockText}
                    </p>
                  </div>

                  {/* WhatsApp CTA hotspot */}
                  <div className="relative">
                    <div className={`rounded-xl border p-2.5 transition-all ${
                      activeHotspot === 'cta' ? 'border-[#00FFFF] bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.1)]' : 'border-white/5'
                    }`}>
                      <div className="flex h-8 items-center justify-center gap-1 rounded-full bg-[#00FFFF] text-[9px] font-black text-black shadow-[0_0_10px_rgba(0,255,255,0.2)]">
                        <MessageSquare className="h-3.5 w-3.5 fill-current" />
                        {hotspots.cta.mockText}
                      </div>
                    </div>

                    <AnimatePresence>
                      {activeHotspot === 'cta' && (
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 30 }}
                          className="absolute inset-x-0 bottom-11 z-10 mx-auto w-56 overflow-hidden rounded-xl border border-emerald-500/20 bg-zinc-900 text-left text-[8px] shadow-[0_10px_30px_rgba(0,0,0,0.8)]"
                        >
                          <div className="flex items-center gap-1.5 bg-emerald-600 p-2 text-white">
                            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-[6px] font-bold">WA</div>
                            <div className="min-w-0 flex-1">
                              <h5 className="text-[8px] font-bold leading-none">Toko Online Anda</h5>
                              <span className="text-[6px] leading-none text-emerald-100">Online</span>
                            </div>
                          </div>
                          <div className="h-24 space-y-2 overflow-y-auto bg-[#0b141a] p-2 font-sans">
                            <div className="max-w-[80%] rounded-r-lg rounded-bl-lg bg-[#202c33] p-1.5 leading-normal text-white">
                              Halo kak! Mau klaim promo landing page hari ini?
                            </div>
                            <div className="ml-auto max-w-[80%] rounded-l-lg rounded-br-lg bg-[#005c4b] p-1.5 leading-normal text-[#e9edef]">
                              Halo, iya kak saya mau order mumpung diskon 50%!
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PAIN POINTS: sticky left + divide rows right ============ */}
      <section className="border-t border-white/5 bg-[#09090B] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
                  Anggaran iklan habis,
                  <br />
                  penjualan nihil?
                </h2>
                <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/50">
                  Empat penyebab paling umum kenapa traffic iklan tidak berubah menjadi orderan.
                </p>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="divide-y divide-white/[0.08] border-y border-white/[0.08]">
                {painPoints.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.05 }}
                    className="group flex gap-6 py-7"
                  >
                    <span className="font-mono text-sm font-bold text-[#00FFFF]/50">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-base font-bold text-white transition-colors group-hover:text-[#00FFFF]">{item.title}</h3>
                      <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES: bento 3-col with variety ============ */}
      <section className="bg-zinc-950 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Fitur Utama
            </span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Satu halaman. Satu tujuan.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Cell 1: wide with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-[#00FFFF]/15 p-7 md:col-span-2"
              style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0.01) 50%, transparent 100%)' }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00FFFF]/10 blur-3xl" />
              <Target className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="font-display text-2xl font-medium text-white">{featuresList[0].title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{featuresList[0].desc}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <BarChart2 className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="text-lg font-bold text-white">{featuresList[1].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{featuresList[1].desc}</p>
            </motion.div>

            {/* Cell 3: dot pattern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px] opacity-30" />
              <div className="relative">
                <Smartphone className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{featuresList[2].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{featuresList[2].desc}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <Rocket className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="text-lg font-bold text-white">{featuresList[3].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{featuresList[3].desc}</p>
            </motion.div>

            {/* Cell 5+6: wide split */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="grid gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-7 sm:grid-cols-2 md:col-span-2"
            >
              <div>
                <MessageCircle className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{featuresList[4].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{featuresList[4].desc}</p>
              </div>
              <div className="border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                <RefreshCw className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{featuresList[5].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{featuresList[5].desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="border-t border-white/5 bg-[#09090B] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Dibanding SaaS, WordPress,
              <br />
              dan biolink instan.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Kriteria Utama</th>
                  <th className="p-5 font-display text-sm font-semibold text-[#00FFFF]">Cozybytes Landing Page</th>
                  <th className="p-5 text-sm font-bold text-white/60">Platform SaaS Instan</th>
                  <th className="p-5 text-sm font-bold text-white/60">WordPress Landing Page</th>
                  <th className="p-5 text-sm font-bold text-white/60">Linktree / Biolink Instan</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 transition-all last:border-0 hover:bg-white/[0.015]">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="border-x border-[#00FFFF]/10 bg-[#00FFFF]/5 p-5 text-sm font-medium text-[#00FFFF]">{row.cozy}</td>
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

      {/* ============ TECH: pill cloud ============ */}
      <section className="border-t border-white/5 bg-zinc-950 py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-medium tracking-tight text-white/80 md:text-3xl">
            Infrastruktur ringan, siap pasang pixel.
          </h2>
          <div className="mt-8 flex flex-wrap gap-3">
            {techStack.map((item, i) => (
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
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Kompresi Gambar Otomatis</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Jaringan Hosting Cloudflare</span>
            <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Serverless Tanpa Database Berat</span>
          </div>
        </div>
      </section>

      {/* ============ WORKFLOW: horizontal stepper ============ */}
      <section className="border-t border-white/5 bg-[#09090B] py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Lima langkah sampai live.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Landing page Anda siap menerima traffic iklan dalam 3 sampai 5 hari kerja.
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
      <section id="harga" ref={pricingRef} className="bg-zinc-950 py-24 md:py-32">
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
              Sewa untuk tes pasar.
              <br />
              Beli putus untuk jangka panjang.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Skema sewa bulanan flat yang terjangkau, atau beli putus agar web jadi aset milik sendiri.
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
              Tanyakan penawaran harga paket (bulk)
            </a>
          </p>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-white/5 bg-[#09090B] py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
            Pertanyaan seputar landing page.
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
      <section className="relative overflow-hidden bg-zinc-950 py-28 md:py-36">
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
              Berhenti membuang anggaran iklan.
              <br />
              <span className="text-[#00FFFF]">Mulai mengubahnya jadi pembeli.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Diskusikan produk jualan Anda dengan tim developer & copywriting kami untuk merancang alur konversi terbaik.
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

      <Footer />
    </div>
  )
}
