import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  Globe, Smartphone, Zap, Search, Shield, 
  MessageCircle, ArrowUpRight, Check, AlertCircle, 
  ChevronDown, Code, Terminal, Eye, Sparkles
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20company%20profile.'

const tiers: PricingTier[] = [
  {
    name: 'Basic',
    subtitle: 'Paket',
    tagline: 'Mulai tampil profesional online. Company profile simpel, cepat, dan siap pakai.',
    oldPrice: 'Rp 2.998.000',
    savings: 'Hemat Rp 1.499.000',
    price: 'Rp 1.499.000',
    period: 'Bayar sekali, website milik Anda selamanya',
    discount: '50% OFF',
    discountTone: 'cyan',
    cta: 'Pilih Paket Basic',
    buttonTone: 'cyan',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'Optimasi SEO dasar' },
      { available: true, label: 'Akses penuh ke hosting & domain' },
      { available: true, label: 'Panduan cara edit konten website' },
      { available: true, label: <>Maksimal <strong>3 halaman</strong> utama</> },
      { available: true, label: 'Bantuan teknis selama 3 bulan' },
      { available: true, label: <>Maksimal <strong>3x</strong> revisi</> },
      { available: false, label: 'Konsultasi branding visual' },
      { available: false, label: 'Bantuan maintenance gratis 1 tahun' },
    ],
  },
  {
    name: 'Pro',
    subtitle: 'Paket',
    tagline: 'Company profile lengkap untuk bisnis yang ingin berkembang dan dipercaya klien.',
    oldPrice: 'Rp 6.000.000',
    savings: 'Hemat Rp 3.001.000',
    price: 'Rp 2.999.000',
    period: 'Bayar sekali, website milik Anda selamanya',
    discount: '50% OFF',
    discountTone: 'gold',
    cta: 'Pilih Paket Pro →',
    highlighted: true,
    specialBadge: 'Paling banyak dipilih',
    buttonTone: 'gold',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO Friendly (mudah dicari di Google)' },
      { available: true, label: 'Akses penuh ke hosting & domain' },
      { available: true, label: 'Panduan cara edit konten website' },
      { available: true, label: <>Maksimal <strong>5 halaman</strong> utama</> },
      { available: true, label: 'Konsultasi branding & desain logo' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN'] },
      { available: true, label: <>Maksimal <strong>5x</strong> revisi</> },
    ],
  },
  {
    name: 'Premium',
    subtitle: 'Paket',
    tagline: 'Website company profile eksklusif untuk bisnis yang ingin tampil beda di industri.',
    oldPrice: 'Rp 9.000.000',
    savings: 'Hemat Rp 4.2 juta',
    price: 'Rp 4.799.000',
    period: 'Bayar sekali, website milik Anda selamanya',
    discount: '47% OFF',
    discountTone: 'violet',
    cta: 'Pilih Paket Premium',
    buttonTone: 'dark',
    ctaHref: WA_LINK,
    features: [
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain & Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO Advanced + Google Analytics setup' },
      { available: true, label: 'Akses penuh ke hosting & domain' },
      { available: true, label: 'Tutorial cara edit via Zoom (1-on-1)' },
      { available: true, label: <>Maksimal <strong>10 halaman</strong> + Sistem Blog</> },
      { available: true, label: 'Konsultasi branding & desain logo' },
      { available: true, label: 'Widget chat WhatsApp di website' },
      { available: true, label: <><strong>Free</strong> Maintenance & support</>, badges: ['1 TAHUN', 'PRIORITY'] },
      { available: true, label: <><strong>Penyempurnaan</strong> tanpa batas (revisi)</> },
    ],
  },
]

const servicesList = [
  {
    icon: Globe,
    title: 'Desain UI/UX Khusus',
    desc: 'Kami merancang tampilan website yang disesuaikan dengan nilai brand Anda. Kami tidak memakai template instan yang pasaran dan membosankan.',
  },
  {
    icon: Smartphone,
    title: 'Tampilan Mobile yang Mulus',
    desc: 'Hampir semua orang membuka web lewat HP. Kami pastikan website Anda tampil rapi, proporsional, dan nyaman dibaca di layar ponsel.',
  },
  {
    icon: Zap,
    title: 'Loading Halaman Instan',
    desc: 'Website yang lemot membuat calon klien kabur sebelum sempat membaca penawaran Anda. Kami optimalkan performa agar web termuat dalam hitungan detik.',
  },
  {
    icon: Search,
    title: 'Rapi di Mata Google (SEO)',
    desc: 'Struktur kode HTML5, meta tag, dan sitemap kami tata dengan benar sejak awal agar Google mudah menemukan dan mengindeks website Anda.',
  },
  {
    icon: Shield,
    title: 'Keamanan yang Terjaga',
    desc: 'Menggunakan arsitektur web modern tanpa database SQL yang rentan diretas, serta bebas dari celah keamanan plugin pihak ketiga.',
  },
  {
    icon: Code,
    title: 'Hak Milik Kode Penuh',
    desc: 'Source code sepenuhnya diserahkan kepada Anda via repository Git. Tanpa biaya lisensi bulanan tersembunyi yang menjebak.',
  },
]

const painPoints = [
  {
    title: 'Desain Pasaran dari Template Gratisan',
    desc: 'Banyak agensi memakai template WordPress yang sama untuk puluhan klien. Akibatnya, bisnis Anda terlihat biasa saja dan mirip kompetitor.',
  },
  {
    title: 'Website Lemot & Sering Error',
    desc: 'Template instan biasanya sarat dengan plugin berat. Setiap detik website Anda loading, calon klien Anda akan pergi mencari web lain.',
  },
  {
    title: 'Biaya Bulanan yang Menjebak',
    desc: 'Sering kali Anda dipaksa membayar biaya lisensi tambahan untuk update tema atau plugin, dan dipersulit saat ingin memindahkan hosting.',
  },
  {
    title: 'Susah Naik di Halaman Google',
    desc: 'Struktur kode template yang berantakan menyulitkan mesin pencari merayapi isi website Anda secara efektif.',
  },
]

const comparisons = [
  {
    aspect: 'Keunikan Desain',
    cozy: 'Didesain khusus sesuai citra brand Anda',
    wordpress: 'Terbatas hanya pada struktur tema template',
    freelancer: 'Tergantung kemampuan desain freelancer',
    saas: 'Mengikuti layout kaku bawaan platform',
  },
  {
    aspect: 'Kecepatan Web',
    cozy: 'Sangat cepat (optimasi skor Pagespeed >90)',
    wordpress: 'Lambat karena tumpukan plugin & database berat',
    freelancer: 'Tidak konsisten, sering mengabaikan kecepatan',
    saas: 'Sedang, karena script platform yang cukup berat',
  },
  {
    aspect: 'Hak Milik Kode',
    cozy: 'Milik Anda penuh (Git Repo diserahkan)',
    wordpress: 'Milik Anda, tapi terkunci di setup database & tema',
    freelancer: 'Milik Anda (jika diserahkan dengan benar)',
    saas: 'Terkunci di platform (tidak bisa diekspor)',
  },
  {
    aspect: 'Keamanan Server',
    cozy: 'Sangat aman (tanpa celah plugin)',
    wordpress: 'Rentan diretas jika plugin jarang di-update',
    freelancer: 'Tergantung standar keamanan kode desainer',
    saas: 'Aman, tetapi dibatasi oleh aturan platform',
  },
  {
    aspect: 'Bantuan Pasca Live',
    cozy: 'Ada kontak khusus (dedicated PIC), garansi bug 1 tahun',
    wordpress: 'Terbatas, rawan konflik jika ada update plugin',
    freelancer: 'Sering kali susah dihubungi setelah lunas',
    saas: 'Hanya lewat forum bantuan atau tiket support',
  },
]

const faqs = [
  {
    q: 'Apa bedanya website buatan Cozybytes dengan website WordPress biasa?',
    a: 'Website WordPress biasa umumnya dibuat menggunakan template siap pakai dan menumpuk banyak plugin pihak ketiga. Hal ini membuat website menjadi lambat, rentan diretas, dan sulit dimodifikasi. Di Cozybytes, kami menulis kode website Anda menggunakan framework modern (React/Vite) dari nol. Hasilnya adalah website yang jauh lebih cepat, aman, memiliki tampilan unik, serta tidak membutuhkan biaya lisensi plugin bulanan.'
  },
  {
    q: 'Apakah source code website ini benar-benar diserahkan?',
    a: 'Ya, sepenuhnya. Kami akan menyerahkan seluruh kode sumber website ke akun repository Git Anda. Akses hosting, kepemilikan domain, dan dashboard kelola diberikan penuh tanpa ada ikatan vendor atau biaya tambahan yang disembunyikan.'
  },
  {
    q: 'Berapa biaya perpanjangan domain dan hosting setelah tahun pertama?',
    a: 'Kami memberikan domain (.com/.id) dan hosting berkecepatan tinggi secara gratis untuk tahun pertama. Untuk tahun kedua dan seterusnya, biaya perpanjangan berkisar antara Rp 350.000 hingga Rp 750.000 per tahun (mengikuti harga domain dan kapasitas hosting standar), yang dibayarkan langsung ke penyedia layanan hosting pilihan Anda.'
  },
  {
    q: 'Apakah website ini sudah ramah Google (SEO-ready)?',
    a: 'Tentu saja. Kami menyusun struktur HTML5, mengoptimasi metadata (title, description, open graph), menyiapkan sitemap, dan mengintegrasikan Google Search Console serta Google Analytics sejak tahap awal pengerjaan untuk memudahkan Google merayapi website Anda.'
  },
  {
    q: 'Berapa lama proses pembuatan website dari awal?',
    a: 'Waktu pembuatan berkisar antara 3 hingga 7 hari kerja untuk paket Basic dan Pro. Untuk paket Premium, waktu pengerjaan sekitar 10 hingga 14 hari kerja karena cakupan halaman yang lebih banyak dan integrasi sistem blog.'
  },
  {
    q: 'Apakah saya bisa mengubah isi tulisan atau gambar sendiri?',
    a: 'Bisa. Kami akan mengintegrasikan website dengan sistem pengelola konten (CMS) yang sangat ringan dan mudah digunakan. Kami juga akan menyertakan panduan tertulis atau mendampingi tim Anda melalui sesi tutorial 1-on-1 via Zoom untuk memastikan Anda bisa mengedit teks dan gambar secara mandiri.'
  }
]

export default function WebsitePage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)
  const [demoTab, setDemoTab] = useState<'beranda' | 'layanan' | 'kontak' | 'kecepatan'>('beranda')
  const [auditState, setAuditState] = useState<'idle' | 'running' | 'done'>('idle')
  const [auditProgress, setAuditProgress] = useState<number>(0)
  const [auditLog, setAuditLog] = useState<string[]>([])

  const runSpeedAudit = () => {
    setAuditState('running')
    setAuditProgress(0)
    setAuditLog(['[SYS] Menghubungkan ke server Lighthouse...'])
    
    let currentProgress = 0
    const logs = [
      '[SYS] Menghubungkan ke server Lighthouse...',
      '[REQ] Mengunduh payload halaman HTML/CSS...',
      '[ANL] Menganalisis kebersihan file JS...',
      '[TBT] Mengukur stabilitas viewport (Core Web Vitals)...',
      '[SCO] Menghitung skor akhir performa...'
    ]
    
    const interval = setInterval(() => {
      currentProgress += 10
      setAuditProgress(currentProgress)
      
      if (currentProgress === 30) {
        setAuditLog(prev => [...prev, logs[1]])
      } else if (currentProgress === 50) {
        setAuditLog(prev => [...prev, logs[2]])
      } else if (currentProgress === 70) {
        setAuditLog(prev => [...prev, logs[3]])
      } else if (currentProgress === 90) {
        setAuditLog(prev => [...prev, logs[4]])
      }
      
      if (currentProgress >= 100) {
        clearInterval(interval)
        setAuditState('done')
      }
    }, 150)
  }
  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />

      <Helmet>
        <title>Jasa Pembuatan Website Company Profile Custom & Profesional | Cozybytes</title>
        <meta name="description" content="Bikin website company profile profesional dari nol tanpa template WordPress yang lambat. Desain custom premium, SEO-ready, mobile-first, gratis domain & hosting 1 tahun." />
        <meta name="keywords" content="jasa pembuatan website company profile, bikin website perusahaan, website custom profesional, developer website Lampung, website company profile murah, pembuatan website bandar lampung, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/website" />
        <meta property="og:title" content="Jasa Pembuatan Website Company Profile Custom & Profesional | Cozybytes" />
        <meta property="og:description" content="Bangun kredibilitas bisnis Anda dengan website company profile modern berkinerja tinggi. Desain custom premium, SEO-optimized, mobile-first, gratis domain hosting 1 tahun." />
        <meta property="og:url" content="https://cozybytes.media/layanan/website" />
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
              Website Perusahaan Eksklusif
            </span>
            <h1
              className="mb-6 text-4xl sm:text-6xl md:text-7xl leading-tight font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Website Company Profile yang Bikin <br />
              <em className="text-[#00FFFF] italic font-normal">Calon Klien Anda Langsung Percaya</em>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
              Kami merancang tampilan website dari nol agar pas dengan citra bisnis Anda. Tanpa template pasaran yang lambat. Web termuat instan, aman dari serangan siber, dan dioptimalkan agar mudah ditemukan di pencarian Google.
            </p>

            {/* Trust Badges */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Dipercaya 15+ Bisnis Aktif
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Pengerjaan Cepat (3-7 Hari)
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Source Code 100% Hak Milik
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
                Diskusikan Scope Proyek
              </motion.a>
              <a
                href="#harga"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Lihat Paket Harga
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
                <Sparkles className="h-3 w-3" /> Live UI Preview Sandbox
              </span>
              <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Rasakan Pengalaman <br />
                <em className="text-[#00FFFF] italic font-normal">Navigasi Web yang Responsif</em>
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Klik tombol di bawah ini untuk mensimulasikan bagaimana kami menstrukturkan visual dan transisi animasi di website perusahaan Anda agar terasa berkelas dan elegan.
              </p>
              
              <div className="flex flex-col gap-2.5">
                {[
                  { id: 'beranda', label: 'Halaman Beranda (Hero & CTA)', desc: 'Desain minimalis berfokus menarik perhatian.' },
                  { id: 'layanan', label: 'Grid Layanan Perusahaan', desc: 'Kartu layanan interaktif dengan hover effect.' },
                  { id: 'kontak', label: 'Formulir Kontak Cepat', desc: 'Desain form input modern yang rapi.' },
                  { id: 'kecepatan', label: 'Uji Kecepatan Halaman (PageSpeed)', desc: 'Simulasi audit performa Google Core Web Vitals.' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => {
                      setDemoTab(tab.id as any);
                      if (tab.id !== 'kecepatan') {
                        setAuditState('idle');
                      }
                    }}
                    className={`text-left p-4 rounded-xl border transition-all ${
                      demoTab === tab.id 
                        ? 'border-[#00FFFF]/30 bg-[#00FFFF]/5 shadow-[0_0_15px_rgba(0,255,255,0.05)]' 
                        : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-bold ${demoTab === tab.id ? 'text-[#00FFFF]' : 'text-white'}`}>
                        {tab.label}
                      </span>
                      {demoTab === tab.id && <Eye className="h-4 w-4 text-[#00FFFF]" />}
                    </div>
                    <p className="text-xs text-white/40 mt-1">{tab.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <div className="lg:col-span-7">
              {/* Browser Shell Mockup */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(0,255,255,0.03)] flex flex-col aspect-[4/3] w-full relative">
                {/* Browser Header */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-950/80">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <div className="ml-3 h-5 flex-1 max-w-sm rounded bg-white/5 border border-white/5 flex items-center px-3 justify-between">
                    <span className="text-[9px] text-white/30 tracking-wide truncate">cozybytes.id/demo-company</span>
                    <span className="text-[8px] text-emerald-400">● Secure</span>
                  </div>
                </div>

                {/* Mockup Canvas */}
                <div className="flex-1 bg-[#060608] p-6 md:p-8 flex flex-col justify-between overflow-hidden relative">
                  <div className="absolute inset-0 bg-gradient-to-tr from-[#00FFFF]/2 to-transparent pointer-events-none" />
                  
                  <AnimatePresence mode="wait">
                    {demoTab === 'beranda' && (
                      <motion.div
                        key="beranda"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-center space-y-4 text-center md:text-left"
                      >
                        <span className="text-[9px] font-bold tracking-widest text-[#00FFFF] uppercase">
                          Brand Logo / Tech Corp
                        </span>
                        <h3 className="text-xl md:text-3xl font-light leading-tight font-serif">
                          We Build Software That <br />
                          <span className="text-[#00FFFF] italic">Empowers Your Vision</span>
                        </h3>
                        <p className="text-[10px] md:text-xs text-white/40 max-w-sm">
                          Empowering industries with high-performance digital tools, responsive UI design, and fast backend integrations.
                        </p>
                        <div className="pt-2 flex gap-3 justify-center md:justify-start">
                          <div className="h-8 px-4 rounded-full bg-[#00FFFF] text-black text-[9px] font-bold flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                            Explore Projects
                          </div>
                          <div className="h-8 px-4 rounded-full border border-white/10 text-white/70 text-[9px] font-bold flex items-center justify-center">
                            Contact Us
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {demoTab === 'layanan' && (
                      <motion.div
                        key="layanan"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-center space-y-4"
                      >
                        <div className="text-center">
                          <span className="text-[9px] font-bold tracking-widest text-[#00FFFF] uppercase">Core Services</span>
                          <h4 className="text-sm font-bold text-white mt-1">Layanan Utama Perusahaan</h4>
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          {[
                            { title: 'Web App', desc: 'Custom React dashboard' },
                            { title: 'Serverless', desc: 'Ultra fast API system' },
                            { title: 'UX Design', desc: 'Clean layout interfaces' }
                          ].map((item, index) => (
                            <div key={index} className="p-3 rounded-xl border border-white/5 bg-white/[0.01] hover:border-[#00FFFF]/20 transition-all text-center space-y-1.5">
                              <div className="mx-auto h-6 w-6 rounded-lg bg-[#00FFFF]/10 flex items-center justify-center text-[10px] text-[#00FFFF]">
                                ✓
                              </div>
                              <h5 className="text-[10px] font-bold text-white">{item.title}</h5>
                              <p className="text-[8px] text-white/30 leading-snug">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {demoTab === 'kontak' && (
                      <motion.div
                        key="kontak"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-center space-y-3 max-w-sm mx-auto w-full"
                      >
                        <div className="text-center">
                          <h4 className="text-sm font-bold text-white">Hubungi Kami</h4>
                          <p className="text-[8px] text-white/40">Tinggalkan pesan Anda di bawah ini</p>
                        </div>
                        <div className="space-y-2">
                          <div className="h-7 rounded-lg border border-white/5 bg-white/[0.01] px-2.5 flex items-center">
                            <span className="text-[8px] text-white/30">Nama Lengkap</span>
                          </div>
                          <div className="h-7 rounded-lg border border-white/5 bg-white/[0.01] px-2.5 flex items-center">
                            <span className="text-[8px] text-white/30">Alamat Email</span>
                          </div>
                          <div className="h-12 rounded-lg border border-white/5 bg-white/[0.01] p-2.5">
                            <span className="text-[8px] text-white/30">Tulis pesan Anda disini...</span>
                          </div>
                          <div className="h-8 rounded-lg bg-[#00FFFF] text-black font-bold text-[9px] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.15)]">
                            Kirim Pesan
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {demoTab === 'kecepatan' && (
                      <motion.div
                        key="kecepatan"
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="h-full flex flex-col justify-center items-center text-center space-y-4"
                      >
                        {auditState === 'idle' && (
                          <div className="space-y-3 py-2">
                            <div className="mx-auto h-11 w-11 rounded-full bg-[#00FFFF]/10 border border-[#00FFFF]/20 flex items-center justify-center text-[#00FFFF]">
                              <Zap className="h-5.5 w-5.5 text-[#00FFFF] fill-current" />
                            </div>
                            <div>
                              <h4 className="text-xs font-bold text-white">Lighthouse Performance Simulator</h4>
                              <p className="text-[9px] text-white/40 mt-1 max-w-[250px] mx-auto leading-relaxed">
                                Uji kecepatan memuat halaman. Kami menulis kode custom ringan tanpa CMS template WordPress yang berat.
                              </p>
                            </div>
                            <button
                              onClick={runSpeedAudit}
                              className="h-8 px-5 rounded-full bg-[#00FFFF] text-black text-[9px] font-bold shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                            >
                              Jalankan Audit Kecepatan
                            </button>
                          </div>
                        )}

                        {auditState === 'running' && (
                          <div className="space-y-3 w-full max-w-[280px]">
                            {/* Circular progress simulated */}
                            <div className="relative h-14 w-14 mx-auto flex items-center justify-center">
                              <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                                <circle 
                                  cx="28" 
                                  cy="28" 
                                  r="24" 
                                  stroke="rgba(255,255,255,0.05)" 
                                  strokeWidth="3.5" 
                                  fill="transparent" 
                                />
                                <circle 
                                  cx="28" 
                                  cy="28" 
                                  r="24" 
                                  stroke="#00FFFF" 
                                  strokeWidth="3.5" 
                                  fill="transparent" 
                                  strokeDasharray={151} 
                                  strokeDashoffset={151 - (151 * auditProgress) / 100}
                                  className="transition-all duration-150"
                                />
                              </svg>
                              <span className="text-[10px] font-bold text-[#00FFFF]">{auditProgress}%</span>
                            </div>
                            {/* Log console */}
                            <div className="bg-black/60 rounded-xl border border-white/5 p-3 text-left font-mono text-[8px] text-white/50 h-24 overflow-y-auto space-y-1">
                              {auditLog.map((log, index) => (
                                <div key={index} className="truncate">
                                  {log}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {auditState === 'done' && (
                          <motion.div 
                            initial={{ scale: 0.95, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="space-y-2.5 w-full"
                          >
                            <div className="flex justify-center items-center gap-4">
                              {/* Green Glow Score */}
                              <div className="h-14 w-14 rounded-full border border-emerald-500/20 bg-emerald-500/5 flex flex-col items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                <span className="text-lg font-black text-emerald-400">99</span>
                                <span className="text-[6px] text-emerald-400/60 font-bold uppercase leading-none">Mobile</span>
                              </div>
                              <div className="text-left">
                                <h4 className="text-[10px] font-bold text-white leading-tight">Google Pagespeed: Optimal</h4>
                                <span className="inline-block mt-0.5 text-[8px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 font-semibold border border-emerald-500/10">
                                  ✓ Lolos Core Web Vitals
                                </span>
                              </div>
                            </div>

                            {/* Performance Metrics */}
                            <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto">
                              {[
                                { name: 'First Contentful Paint', val: '0.2s' },
                                { name: 'Total Blocking Time', val: '0ms' },
                                { name: 'Cumulative Layout Shift', val: '0.00' }
                              ].map((item, i) => (
                                <div key={i} className="p-1.5 rounded-lg border border-white/5 bg-white/[0.01] text-center space-y-0.5">
                                  <span className="text-[6px] text-white/30 block leading-tight">{item.name}</span>
                                  <span className="text-[9px] font-bold text-emerald-400">{item.val}</span>
                                </div>
                              ))}
                            </div>

                            <button
                              onClick={() => setAuditState('idle')}
                              className="h-6 px-3 rounded-full border border-white/10 text-white/60 hover:text-white text-[8px] font-semibold"
                            >
                              Ulangi Tes Performa
                            </button>
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Mockup Footer */}
                  <div className="pt-4 border-t border-white/5 flex items-center justify-between text-[7px] text-white/20">
                    <span>© 2026 TechCorp. All rights reserved.</span>
                    <div className="flex gap-2">
                      <span>Privacy</span>
                      <span>Terms</span>
                    </div>
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
              Tantangan Bisnis Digital
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Website WordPress Template <br />
              <em className="text-[#F8D16A] italic font-normal">Sering Kali Mengecewakan Calon Klien?</em>
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

      {/* Service breakdown / Features Section */}
      <section className="py-24 bg-zinc-950">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Keunggulan Layanan Kami
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Detail Pembuatan Website Perusahaan <br />
              <em className="text-[#00FFFF] italic font-normal">yang Bersih, Cepat, dan Handal</em>
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {servicesList.map((f, i) => (
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
              Bandingkan Solusi
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Memilih Menulis Kode Custom <br />
              <em className="text-[#F8D16A] italic font-normal">Bukan Sekadar Menggunakan CMS Instan?</em>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-white/50">
              Analisis perbandingan objektif untuk membantu Anda menentukan keputusan terbaik bagi kelangsungan bisnis digital Anda.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.01]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Faktor Penentu</th>
                  <th className="p-5 text-sm font-bold text-[#00FFFF]">Cozybytes Custom Code</th>
                  <th className="p-5 text-sm font-bold text-white/60">WordPress & Template</th>
                  <th className="p-5 text-sm font-bold text-white/60">Desainer Freelancer</th>
                  <th className="p-5 text-sm font-bold text-white/60">SaaS (Wix/Squarespace)</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.015] transition-all">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="p-5 text-sm text-[#00FFFF] font-medium bg-[#00FFFF]/5 border-x border-[#00FFFF]/10">{row.cozy}</td>
                    <td className="p-5 text-sm text-white/50">{row.wordpress}</td>
                    <td className="p-5 text-sm text-white/50">{row.freelancer}</td>
                    <td className="p-5 text-sm text-white/50">{row.saas}</td>
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
            Teknologi Modern yang Digunakan
          </span>
          <h2 className="mb-12 text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Kode Sumber Bersih yang <em className="text-[#00FFFF] italic font-normal">Ringan dan Terawat</em>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['React.js', 'Vite.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare', 'Vercel', 'Node.js', 'PostgreSQL', 'Supabase', 'Git / GitHub', 'Docker'].map((tech) => (
              <div 
                key={tech} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-[#0a0a0d] hover:border-[#00FFFF]/20 transition-all"
              >
                <Terminal className="h-5 w-5 text-[#00FFFF] mb-2" />
                <span className="text-xs font-semibold text-white/80">{tech}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-white/40">
            <span>✓ Penyerahan Repository Git</span>
            <span>✓ Integrasi Serverless Cepat</span>
            <span>✓ Dokumentasi Teknis Mudah Dipahami</span>
          </div>
        </div>
      </section>

      {/* Process flow section */}
      <section className="py-24 bg-[#09090B] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Proses Kerja
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Tahapan Pembuatan Website <br />
              <em className="text-[#F8D16A] italic font-normal">Hingga Siap Digunakan Secara Publik</em>
            </h2>
            <p className="mt-4 mx-auto max-w-xl text-sm text-white/50">
              Kami membagi proses pengerjaan ke dalam fase-fase pendek agar Anda dapat memberikan masukan secara berkala.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { step: '01', title: 'Diskusi & Brief', desc: 'Kami memetakan menu yang Anda butuhkan, gaya visual brand, dan isi pesan utama di halaman web.' },
              { step: '02', title: 'Prototipe Visual', desc: 'Kami membuat tata letak visual dan interaktif secara langsung agar Anda bisa melihat tampilan awal web.' },
              { step: '03', title: 'Penulisan Kode', desc: 'Developer kami mulai menerjemahkan rancangan visual menjadi kode React yang bersih dan responsif.' },
              { step: '04', title: 'Uji Coba & SEO', desc: 'Website diuji pada berbagai ukuran HP, serta setup kelengkapan SEO on-page dan script analytics.' },
              { step: '05', title: 'Handoff Akses', desc: 'Website dideploy agar online penuh, lalu kami menyerahkan semua akses file dan mengadakan sesi panduan.' }
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
              Investasi Jelas
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-6xl font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Pilih Paket Pembuatan <br />
              <em className="text-[#00FFFF] italic font-normal">Website Company Profile</em>
            </h2>
            <p className="mx-auto max-w-xl text-sm leading-relaxed text-white/50">
              Pilihan investasi terjangkau tanpa ada biaya tambahan wajib bulanan. Bayar sekali, web aktif selamanya.
            </p>
          </motion.div>

          <div className="grid items-stretch gap-6 lg:grid-cols-3 lg:gap-5 xl:gap-7">
            {tiers.map((tier, i) => (
              <PricingCard key={tier.name} tier={tier} index={i} inView={inView} />
            ))}
          </div>

          <p className="mx-auto mt-12 max-w-xl text-center text-sm leading-relaxed text-white/40">
            Butuh integrasi sistem pendaftaran khusus, sistem booking, atau ingin membuat web multi-bahasa?{' '}
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
              Pertanyaan yang Sering Diajukan
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Jawaban Singkat untuk <br />
              <em className="text-[#F8D16A] italic font-normal">Pertanyaan yang Sering Kami Dengar</em>
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
              Konsultasi Proyek
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Bikin Profil Bisnis Anda Tampil <br />
              <em className="text-[#00FFFF] italic font-normal">Lebih Kredibel dan Profesional di Internet</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Diskusikan kebutuhan ide bisnis Anda dengan tim kami tanpa ada komitmen atau biaya awal apa pun.
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
              Mulai Konsultasi Gratis Sekarang
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
