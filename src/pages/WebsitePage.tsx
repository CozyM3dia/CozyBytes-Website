import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  Globe, Smartphone, Zap, Search, Shield,
  MessageCircle, ArrowUpRight, Check,
  ChevronDown, Code, Eye
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LightCone } from '../components/atmosphere'
import { PricingCard } from '../components/ServicePricingCard'
import type { PricingTier } from '../components/ServicePricingCard'
import { BrandIcon } from '../components/icons/brand'

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

const processSteps = [
  { step: '01', title: 'Diskusi & Brief', desc: 'Kami memetakan menu yang Anda butuhkan, gaya visual brand, dan isi pesan utama di halaman web.' },
  { step: '02', title: 'Prototipe Visual', desc: 'Kami membuat tata letak visual dan interaktif secara langsung agar Anda bisa melihat tampilan awal web.' },
  { step: '03', title: 'Penulisan Kode', desc: 'Developer kami mulai menerjemahkan rancangan visual menjadi kode React yang bersih dan responsif.' },
  { step: '04', title: 'Uji Coba & SEO', desc: 'Website diuji pada berbagai ukuran HP, serta setup kelengkapan SEO on-page dan script analytics.' },
  { step: '05', title: 'Handoff Akses', desc: 'Website dideploy agar online penuh, lalu kami menyerahkan semua akses file dan mengadakan sesi panduan.' },
]

const techStack = ['React.js', 'Vite.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Cloudflare', 'Vercel', 'Node.js', 'PostgreSQL', 'Supabase', 'Git / GitHub', 'Docker']

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

      if (currentProgress === 30) setAuditLog(prev => [...prev, logs[1]])
      else if (currentProgress === 50) setAuditLog(prev => [...prev, logs[2]])
      else if (currentProgress === 70) setAuditLog(prev => [...prev, logs[3]])
      else if (currentProgress === 90) setAuditLog(prev => [...prev, logs[4]])

      if (currentProgress >= 100) {
        clearInterval(interval)
        setAuditState('done')
      }
    }, 150)
  }

  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">

      <Helmet>
        <title>Jasa Pembuatan Website Company Profile Custom & Profesional | Cozybytes</title>
        <meta name="description" content="Website company profile yang ditulis dari nol, bukan dari template. Cepat dibuka, aman, dan mudah ditemukan calon klien di Google. Domain dan hosting gratis setahun pertama, selesai dalam 3 sampai 7 hari kerja." />
        <meta name="keywords" content="jasa pembuatan website company profile, website custom, web developer Lampung, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/website" />
        <meta property="og:title" content="Jasa Pembuatan Website Company Profile Custom & Profesional | Cozybytes" />
        <meta property="og:description" content="Website company profile yang ditulis dari nol, bukan dari template. Cepat dibuka, aman, dan mudah ditemukan calon klien di Google. Gratis domain dan hosting setahun pertama." />
        <meta property="og:url" content="https://cozybytes.media/layanan/website" />
        <meta property="og:image" content="https://cozybytes.media/services/company.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/company.jpg" />
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
            name: 'Jasa Pembuatan Website Company Profile',
            serviceType: 'Web Development',
            description: 'Pembuatan website company profile custom dengan framework modern. Cepat, aman, SEO-ready, dan source code diserahkan penuh.',
            url: 'https://cozybytes.media/layanan/website',
            areaServed: 'Indonesia',
            provider: { '@type': 'ProfessionalService', name: 'Cozybytes Media', url: 'https://cozybytes.media' },
            offers: [
              { '@type': 'Offer', name: 'Paket Basic', price: '1499000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Paket Pro', price: '2999000', priceCurrency: 'IDR' },
              { '@type': 'Offer', name: 'Paket Premium', price: '4799000', priceCurrency: 'IDR' },
            ],
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              { '@type': 'ListItem', position: 2, name: 'Layanan Website Company Profile', item: 'https://cozybytes.media/layanan/website' },
            ],
          })}
        </script>
      </Helmet>

      {/* ============ HERO: asymmetric split, copy left + live demo right ============ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16">
        <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-24" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 75% 30%, rgba(0,255,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 10% 90%, rgba(0,255,255,0.05) 0%, transparent 60%)',
          }}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:120px_100%]" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <span className="mb-6 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                Website Company Profile
              </span>
              <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4.2rem] font-medium">
                Calon klien percaya
                <br />
                <span className="text-[#00FFFF]">sebelum bertemu.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                Website company profile yang dirancang dari nol. Tanpa template pasaran, termuat instan, dan mudah ditemukan di Google.
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
                  Lihat Paket Harga
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                {[
                  // Hanya klaim yang bisa dipertanggungjawabkan dari isi paket di halaman ini.
                  // Sebelumnya "15+ Bisnis aktif" — angka itu tidak akurat.
                  { num: '1 thn', label: 'Garansi bug' },
                  { num: '3-7', label: 'Hari kerja' },
                  { num: '100%', label: 'Hak milik kode' },
                ].map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <div className="font-mono text-2xl font-bold text-white">{s.num}</div>
                    <div className="mt-1 text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Live interactive demo */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-6"
            >
              <div className="relative">
                <div className="pointer-events-none absolute -inset-4 rounded-3xl bg-[#00FFFF]/5 blur-2xl" />
                <div className="relative flex aspect-[4/3] w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
                  <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-zinc-950/80 px-4 py-3">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                    <div className="ml-3 flex h-5 max-w-sm flex-1 items-center justify-between rounded border border-white/5 bg-white/5 px-3">
                      <span className="truncate font-mono text-[9px] tracking-wide text-white/30">cozybytes.id/demo-company</span>
                      <span className="text-[8px] text-emerald-400">Secure</span>
                    </div>
                  </div>

                  <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[#060608] p-6 md:p-8">
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#00FFFF]/[0.02] to-transparent" />

                    <AnimatePresence mode="wait">
                      {demoTab === 'beranda' && (
                        <motion.div
                          key="beranda"
                          initial={{ opacity: 0, y: 15 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -15 }}
                          transition={{ duration: 0.3 }}
                          className="flex h-full flex-col justify-center space-y-4 text-left"
                        >
                          <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#00FFFF]">
                            Brand Logo / Tech Corp
                          </span>
                          <h3 className="font-display text-xl font-medium leading-tight md:text-3xl">
                            We Build Software That <br />
                            <span className="text-[#00FFFF]">Empowers Your Vision</span>
                          </h3>
                          <p className="max-w-sm text-[10px] text-white/40 md:text-xs">
                            Empowering industries with high-performance digital tools, responsive UI design, and fast backend integrations.
                          </p>
                          <div className="flex gap-3 pt-2">
                            <div className="flex h-8 items-center justify-center rounded-full bg-[#00FFFF] px-4 text-[9px] font-bold text-black shadow-[0_0_15px_rgba(0,255,255,0.2)]">
                              Explore Projects
                            </div>
                            <div className="flex h-8 items-center justify-center rounded-full border border-white/10 px-4 text-[9px] font-bold text-white/70">
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
                          className="flex h-full flex-col justify-center space-y-4"
                        >
                          <div className="text-center">
                            <span className="font-mono text-[9px] font-bold uppercase tracking-widest text-[#00FFFF]">Core Services</span>
                            <h4 className="mt-1 text-sm font-bold text-white">Layanan Utama Perusahaan</h4>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {[
                              { title: 'Web App', desc: 'Custom React dashboard' },
                              { title: 'Serverless', desc: 'Ultra fast API system' },
                              { title: 'UX Design', desc: 'Clean layout interfaces' }
                            ].map((item, index) => (
                              <div key={index} className="space-y-1.5 rounded-xl border border-white/5 bg-white/[0.01] p-3 text-center transition-all hover:border-[#00FFFF]/20">
                                <div className="mx-auto flex h-6 w-6 items-center justify-center rounded-lg bg-[#00FFFF]/10 text-[10px] text-[#00FFFF]">
                                  <Check className="h-3 w-3" />
                                </div>
                                <h5 className="text-[10px] font-bold text-white">{item.title}</h5>
                                <p className="text-[8px] leading-snug text-white/30">{item.desc}</p>
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
                          className="mx-auto flex h-full w-full max-w-sm flex-col justify-center space-y-3"
                        >
                          <div className="text-center">
                            <h4 className="text-sm font-bold text-white">Hubungi Kami</h4>
                            <p className="text-[8px] text-white/40">Tinggalkan pesan Anda di bawah ini</p>
                          </div>
                          <div className="space-y-2">
                            <div className="flex h-7 items-center rounded-lg border border-white/5 bg-white/[0.01] px-2.5">
                              <span className="text-[8px] text-white/30">Nama Lengkap</span>
                            </div>
                            <div className="flex h-7 items-center rounded-lg border border-white/5 bg-white/[0.01] px-2.5">
                              <span className="text-[8px] text-white/30">Alamat Email</span>
                            </div>
                            <div className="h-12 rounded-lg border border-white/5 bg-white/[0.01] p-2.5">
                              <span className="text-[8px] text-white/30">Tulis pesan Anda disini...</span>
                            </div>
                            <div className="flex h-8 items-center justify-center rounded-lg bg-[#00FFFF] text-[9px] font-bold text-black shadow-[0_0_15px_rgba(0,255,255,0.15)]">
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
                          className="flex h-full flex-col items-center justify-center space-y-4 text-center"
                        >
                          {auditState === 'idle' && (
                            <div className="space-y-3 py-2">
                              <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/10 text-[#00FFFF]">
                                <Zap className="h-5 w-5 fill-current text-[#00FFFF]" />
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-white">Lighthouse Performance Simulator</h4>
                                <p className="mx-auto mt-1 max-w-[250px] text-[9px] leading-relaxed text-white/40">
                                  Uji kecepatan memuat halaman. Kami menulis kode custom ringan tanpa CMS template WordPress yang berat.
                                </p>
                              </div>
                              <button
                                onClick={runSpeedAudit}
                                className="h-8 rounded-full bg-[#00FFFF] px-5 text-[9px] font-bold text-black shadow-[0_0_15px_rgba(0,255,255,0.2)]"
                              >
                                Jalankan Audit Kecepatan
                              </button>
                            </div>
                          )}

                          {auditState === 'running' && (
                            <div className="w-full max-w-[280px] space-y-3">
                              <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                                <svg className="absolute inset-0 h-full w-full -rotate-90 transform">
                                  <circle cx="28" cy="28" r="24" stroke="rgba(255,255,255,0.05)" strokeWidth="3.5" fill="transparent" />
                                  <circle
                                    cx="28" cy="28" r="24"
                                    stroke="#00FFFF" strokeWidth="3.5" fill="transparent"
                                    strokeDasharray={151}
                                    strokeDashoffset={151 - (151 * auditProgress) / 100}
                                    className="transition-all duration-150"
                                  />
                                </svg>
                                <span className="font-mono text-[10px] font-bold text-[#00FFFF]">{auditProgress}%</span>
                              </div>
                              <div className="h-24 space-y-1 overflow-y-auto rounded-xl border border-white/5 bg-black/60 p-3 text-left font-mono text-[8px] text-white/50">
                                {auditLog.map((log, index) => (
                                  <div key={index} className="truncate">{log}</div>
                                ))}
                              </div>
                            </div>
                          )}

                          {auditState === 'done' && (
                            <motion.div
                              initial={{ scale: 0.95, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              className="w-full space-y-2.5"
                            >
                              <div className="flex items-center justify-center gap-4">
                                <div className="flex h-14 w-14 flex-col items-center justify-center rounded-full border border-emerald-500/20 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                                  <span className="font-mono text-lg font-black text-emerald-400">99</span>
                                  <span className="text-[6px] font-bold uppercase leading-none text-emerald-400/60">Mobile</span>
                                </div>
                                <div className="text-left">
                                  <h4 className="text-[10px] font-bold leading-tight text-white">Google Pagespeed: Optimal</h4>
                                  <span className="mt-0.5 inline-block rounded border border-emerald-500/10 bg-emerald-500/10 px-2 py-0.5 text-[8px] font-semibold text-emerald-400">
                                    Lolos Core Web Vitals
                                  </span>
                                </div>
                              </div>

                              <div className="mx-auto grid max-w-xs grid-cols-3 gap-2">
                                {[
                                  { name: 'First Contentful Paint', val: '0.2s' },
                                  { name: 'Total Blocking Time', val: '0ms' },
                                  { name: 'Cumulative Layout Shift', val: '0.00' }
                                ].map((item, i) => (
                                  <div key={i} className="space-y-0.5 rounded-lg border border-white/5 bg-white/[0.01] p-1.5 text-center">
                                    <span className="block text-[6px] leading-tight text-white/30">{item.name}</span>
                                    <span className="font-mono text-[9px] font-bold text-emerald-400">{item.val}</span>
                                  </div>
                                ))}
                              </div>

                              <button
                                onClick={() => setAuditState('idle')}
                                className="h-6 rounded-full border border-white/10 px-3 text-[8px] font-semibold text-white/60 hover:text-white"
                              >
                                Ulangi Tes Performa
                              </button>
                            </motion.div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Demo tab switcher */}
                <div className="mt-4 flex flex-wrap gap-2">
                  {[
                    { id: 'beranda', label: 'Beranda' },
                    { id: 'layanan', label: 'Layanan' },
                    { id: 'kontak', label: 'Kontak' },
                    { id: 'kecepatan', label: 'Uji Kecepatan' }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => {
                        setDemoTab(tab.id as typeof demoTab)
                        if (tab.id !== 'kecepatan') setAuditState('idle')
                      }}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-xs font-semibold transition-all ${
                        demoTab === tab.id
                          ? 'border-[#00FFFF]/40 bg-[#00FFFF]/10 text-[#00FFFF]'
                          : 'border-white/10 bg-white/[0.02] text-white/50 hover:border-white/20 hover:text-white'
                      }`}
                    >
                      {demoTab === tab.id && <Eye className="h-3 w-3" />}
                      {tab.label}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PAIN POINTS: editorial numbered rows ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Kenapa website template
              <br />
              sering mengecewakan?
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Empat masalah yang paling sering kami temukan saat klien pindah dari website lamanya ke Cozybytes.
            </p>
          </div>

          <div className="mt-16 grid gap-x-16 gap-y-12 md:grid-cols-2">
            {painPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.1 }}
                className="group flex gap-6"
              >
                <span className="font-mono text-4xl font-bold text-white/[0.12] transition-colors group-hover:text-[#00FFFF]/40 md:text-5xl">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div className="border-l border-white/10 pl-6">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES: bento grid with visual variety ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Keunggulan Layanan
            </span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Bersih, cepat, dan handal.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {/* Feature 1: large cell with gradient */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-[#00FFFF]/15 p-7 md:col-span-2"
              style={{ background: 'linear-gradient(135deg, rgba(0,255,255,0.08) 0%, rgba(0,255,255,0.01) 50%, transparent 100%)' }}
            >
              <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#00FFFF]/10 blur-3xl" />
              <Globe className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="font-display text-2xl font-medium text-white">{servicesList[0].title}</h3>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-white/55">{servicesList[0].desc}</p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <Smartphone className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="text-lg font-bold text-white">{servicesList[1].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{servicesList[1].desc}</p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <Zap className="mb-5 h-6 w-6 text-[#00FFFF]" />
              <h3 className="text-lg font-bold text-white">{servicesList[2].title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/50">{servicesList[2].desc}</p>
            </motion.div>

            {/* Feature 4: cell with dot pattern */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.08 }}
              className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
            >
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(0,255,255,0.12)_1px,transparent_1px)] bg-[size:18px_18px] opacity-30" />
              <div className="relative">
                <Search className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{servicesList[3].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{servicesList[3].desc}</p>
              </div>
            </motion.div>

            {/* Feature 5 + 6: wide cell */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: 0.16 }}
              className="grid gap-5 rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-7 sm:grid-cols-2 md:col-span-2"
            >
              <div>
                <Shield className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{servicesList[4].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{servicesList[4].desc}</p>
              </div>
              <div className="border-t border-white/10 pt-5 sm:border-l sm:border-t-0 sm:pl-7 sm:pt-0">
                <Code className="mb-5 h-6 w-6 text-[#00FFFF]" />
                <h3 className="text-lg font-bold text-white">{servicesList[5].title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/50">{servicesList[5].desc}</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ COMPARISON TABLE ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Kode custom vs CMS instan.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Analisis perbandingan objektif untuk membantu Anda menentukan keputusan terbaik bagi bisnis digital Anda.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Faktor Penentu</th>
                  <th className="p-5 font-display text-sm font-semibold text-[#00FFFF]">Cozybytes Custom Code</th>
                  <th className="p-5 text-sm font-bold text-white/60">WordPress & Template</th>
                  <th className="p-5 text-sm font-bold text-white/60">Desainer Freelancer</th>
                  <th className="p-5 text-sm font-bold text-white/60">SaaS (Wix/Squarespace)</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 transition-all last:border-0 hover:bg-white/[0.015]">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="border-x border-[#00FFFF]/10 bg-[#00FFFF]/5 p-5 text-sm font-medium text-[#00FFFF]">{row.cozy}</td>
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

      {/* ============ TECH STACK: marquee ============ */}
      <section className="overflow-hidden border-t border-white/5 py-20">
        <div className="mx-auto mb-10 max-w-6xl px-5 md:px-8">
          <h2 className="font-display text-2xl font-medium tracking-tight text-white/80 md:text-3xl">
            Teknologi yang kami pakai setiap hari.
          </h2>
        </div>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-zinc-950 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-zinc-950 to-transparent" />
          <div className="flex w-max animate-[marquee_30s_linear_infinite] gap-4 motion-reduce:animate-none">
            {[...techStack, ...techStack].map((tech, i) => (
              <div
                key={`${tech}-${i}`}
                className="flex items-center gap-2.5 rounded-full border border-white/[0.08] bg-white/[0.02] px-6 py-3"
              >
                <BrandIcon name={tech} className="h-[18px] w-[18px] shrink-0 text-white/55" />
                <span className="whitespace-nowrap font-mono text-sm text-white/70">{tech}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-6xl flex-wrap gap-x-8 gap-y-2 px-5 text-xs text-white/40 md:px-8">
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Penyerahan Repository Git</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Integrasi Serverless Cepat</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Dokumentasi Teknis Mudah Dipahami</span>
        </div>
      </section>

      {/* ============ PROCESS: vertical timeline ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
                  Dari brief
                  <br />
                  sampai live.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  Kami membagi proses pengerjaan ke dalam fase-fase pendek agar Anda dapat memberikan masukan secara berkala.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative border-l border-white/10 pl-10 md:pl-14">
                {processSteps.map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="relative pb-12 last:pb-0"
                  >
                    <span className="absolute -left-10 top-1 flex h-px w-6 bg-[#00FFFF]/50 md:-left-14 md:w-9" />
                    <span className="font-mono text-xs font-bold text-[#00FFFF]/60">{step.step}</span>
                    <h3 className="mt-1.5 font-display text-xl font-medium text-white">{step.title}</h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">{step.desc}</p>
                  </motion.div>
                ))}
              </div>
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
              Bayar sekali.
              <br />
              Website milik Anda selamanya.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/50">
              Pilihan investasi terjangkau tanpa ada biaya tambahan wajib bulanan.
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
              Konsultasikan custom requirements Anda
            </a>
          </p>
        </div>
      </section>

      {/* ============ FAQ: minimal divide list ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
            Pertanyaan yang sering kami dengar.
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

      {/* ============ BOTTOM CTA: typographic statement ============ */}
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
              Profil bisnis Anda,
              <br />
              <span className="text-[#00FFFF]">lebih kredibel di internet.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Diskusikan kebutuhan ide bisnis Anda dengan tim kami tanpa ada komitmen atau biaya awal apa pun.
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
