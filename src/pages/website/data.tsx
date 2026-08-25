import { Globe, Smartphone, Zap, Search, Shield, Code } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PricingTier } from '../../components/ServicePricingCard'

/* ------------------------------------------------------------------ *
 * Motion constants — kini tinggal di components/section/tokens supaya
 * keempat halaman layanan memakai easing yang sama. Di-re-export di sini
 * agar section halaman ini tetap bisa `import { EASE } from './data'`.
 * ------------------------------------------------------------------ */

export { EASE, SPRING, SOFT_SPRING } from '../../components/section/tokens'

export const WA_LINK =
  'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20company%20profile.'

/* ------------------------------------------------------------------ *
 * Pricing
 * ------------------------------------------------------------------ */

export const tiers: PricingTier[] = [
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
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain &amp; Hosting</> },
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
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain &amp; Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO Friendly (mudah dicari di Google)' },
      { available: true, label: 'Akses penuh ke hosting & domain' },
      { available: true, label: 'Panduan cara edit konten website' },
      { available: true, label: <>Maksimal <strong>5 halaman</strong> utama</> },
      { available: true, label: 'Konsultasi branding & desain logo' },
      { available: true, label: <><strong>Free</strong> Maintenance &amp; support</>, badges: ['1 TAHUN'] },
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
      { available: true, label: <><strong>Gratis 1 Tahun</strong> Domain &amp; Hosting</> },
      { available: true, label: 'Website mobile friendly' },
      { available: true, label: 'SEO Advanced + Google Analytics setup' },
      { available: true, label: 'Akses penuh ke hosting & domain' },
      { available: true, label: 'Tutorial cara edit via Zoom (1-on-1)' },
      { available: true, label: <>Maksimal <strong>10 halaman</strong> + Sistem Blog</> },
      { available: true, label: 'Konsultasi branding & desain logo' },
      { available: true, label: 'Widget chat WhatsApp di website' },
      { available: true, label: <><strong>Free</strong> Maintenance &amp; support</>, badges: ['1 TAHUN', 'PRIORITY'] },
      { available: true, label: <><strong>Penyempurnaan</strong> tanpa batas (revisi)</> },
    ],
  },
]

/* ------------------------------------------------------------------ *
 * Capabilities (bento)
 * ------------------------------------------------------------------ */

export type CapabilityVisual = 'design' | 'mobile' | 'speed' | 'seo' | 'security' | 'code'

export interface Capability {
  visual: CapabilityVisual
  Icon: LucideIcon
  title: string
  desc: string
  metric: string
}

export const capabilities: Capability[] = [
  {
    visual: 'design',
    Icon: Globe,
    title: 'Desain UI/UX Khusus',
    desc: 'Kami merancang tampilan website yang disesuaikan dengan nilai brand Anda. Kami tidak memakai template instan yang pasaran dan membosankan.',
    metric: '0 template',
  },
  {
    visual: 'mobile',
    Icon: Smartphone,
    title: 'Tampilan Mobile yang Mulus',
    desc: 'Hampir semua orang membuka web lewat HP. Kami pastikan website Anda tampil rapi, proporsional, dan nyaman dibaca di layar ponsel.',
    metric: '360–1920px',
  },
  {
    visual: 'speed',
    Icon: Zap,
    title: 'Loading Halaman Instan',
    desc: 'Website yang lemot membuat calon klien kabur sebelum sempat membaca penawaran Anda. Kami optimalkan performa agar web termuat dalam hitungan detik.',
    metric: 'LCP < 1s',
  },
  {
    visual: 'seo',
    Icon: Search,
    title: 'Rapi di Mata Google (SEO)',
    desc: 'Struktur kode HTML5, meta tag, dan sitemap kami tata dengan benar sejak awal agar Google mudah menemukan dan mengindeks website Anda.',
    metric: 'Sitemap + schema',
  },
  {
    visual: 'security',
    Icon: Shield,
    title: 'Keamanan yang Terjaga',
    desc: 'Menggunakan arsitektur web modern tanpa database SQL yang rentan diretas, serta bebas dari celah keamanan plugin pihak ketiga.',
    metric: '0 plugin',
  },
  {
    visual: 'code',
    Icon: Code,
    title: 'Hak Milik Kode Penuh',
    desc: 'Source code sepenuhnya diserahkan kepada Anda via repository Git. Tanpa biaya lisensi bulanan tersembunyi yang menjebak.',
    metric: 'Git handoff',
  },
]

/* ------------------------------------------------------------------ *
 * Pain points
 * ------------------------------------------------------------------ */

export interface PainPoint {
  title: string
  desc: string
  tag: string
}

export const painPoints: PainPoint[] = [
  {
    tag: 'Identitas',
    title: 'Desain Pasaran dari Template Gratisan',
    desc: 'Banyak agensi memakai template WordPress yang sama untuk puluhan klien. Akibatnya, bisnis Anda terlihat biasa saja dan mirip kompetitor.',
  },
  {
    tag: 'Performa',
    title: 'Website Lemot & Sering Error',
    desc: 'Template instan biasanya sarat dengan plugin berat. Setiap detik website Anda loading, calon klien Anda akan pergi mencari web lain.',
  },
  {
    tag: 'Biaya',
    title: 'Biaya Bulanan yang Menjebak',
    desc: 'Sering kali Anda dipaksa membayar biaya lisensi tambahan untuk update tema atau plugin, dan dipersulit saat ingin memindahkan hosting.',
  },
  {
    tag: 'Visibilitas',
    title: 'Susah Naik di Halaman Google',
    desc: 'Struktur kode template yang berantakan menyulitkan mesin pencari merayapi isi website Anda secara efektif.',
  },
]

/* ------------------------------------------------------------------ *
 * Comparison matrix
 * ------------------------------------------------------------------ */

export interface ComparisonRow {
  aspect: string
  cozy: string
  wordpress: string
  freelancer: string
  saas: string
}

export const comparisons: ComparisonRow[] = [
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

export const competitorColumns = [
  { key: 'wordpress', label: 'WordPress & Template' },
  { key: 'freelancer', label: 'Desainer Freelancer' },
  { key: 'saas', label: 'SaaS (Wix/Squarespace)' },
] as const

export type CompetitorKey = (typeof competitorColumns)[number]['key']

/* ------------------------------------------------------------------ *
 * FAQ — dipakai juga untuk FAQPage schema di WebsitePage
 * ------------------------------------------------------------------ */

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Apa bedanya website buatan Cozybytes dengan website WordPress biasa?',
    a: 'Website WordPress biasa umumnya dibuat menggunakan template siap pakai dan menumpuk banyak plugin pihak ketiga. Hal ini membuat website menjadi lambat, rentan diretas, dan sulit dimodifikasi. Di Cozybytes, kami menulis kode website Anda menggunakan framework modern (React/Vite) dari nol. Hasilnya adalah website yang jauh lebih cepat, aman, memiliki tampilan unik, serta tidak membutuhkan biaya lisensi plugin bulanan.',
  },
  {
    q: 'Apakah source code website ini benar-benar diserahkan?',
    a: 'Ya, sepenuhnya. Kami akan menyerahkan seluruh kode sumber website ke akun repository Git Anda. Akses hosting, kepemilikan domain, dan dashboard kelola diberikan penuh tanpa ada ikatan vendor atau biaya tambahan yang disembunyikan.',
  },
  {
    q: 'Berapa biaya perpanjangan domain dan hosting setelah tahun pertama?',
    a: 'Kami memberikan domain (.com/.id) dan hosting berkecepatan tinggi secara gratis untuk tahun pertama. Untuk tahun kedua dan seterusnya, biaya perpanjangan berkisar antara Rp 350.000 hingga Rp 750.000 per tahun (mengikuti harga domain dan kapasitas hosting standar), yang dibayarkan langsung ke penyedia layanan hosting pilihan Anda.',
  },
  {
    q: 'Apakah website ini sudah ramah Google (SEO-ready)?',
    a: 'Tentu saja. Kami menyusun struktur HTML5, mengoptimasi metadata (title, description, open graph), menyiapkan sitemap, dan mengintegrasikan Google Search Console serta Google Analytics sejak tahap awal pengerjaan untuk memudahkan Google merayapi website Anda.',
  },
  {
    q: 'Berapa lama proses pembuatan website dari awal?',
    a: 'Waktu pembuatan berkisar antara 3 hingga 7 hari kerja untuk paket Basic dan Pro. Untuk paket Premium, waktu pengerjaan sekitar 10 hingga 14 hari kerja karena cakupan halaman yang lebih banyak dan integrasi sistem blog.',
  },
  {
    q: 'Apakah saya bisa mengubah isi tulisan atau gambar sendiri?',
    a: 'Bisa. Kami akan mengintegrasikan website dengan sistem pengelola konten (CMS) yang sangat ringan dan mudah digunakan. Kami juga akan menyertakan panduan tertulis atau mendampingi tim Anda melalui sesi tutorial 1-on-1 via Zoom untuk memastikan Anda bisa mengedit teks dan gambar secara mandiri.',
  },
]

/* ------------------------------------------------------------------ *
 * Process
 * ------------------------------------------------------------------ */

export interface ProcessStep {
  step: string
  title: string
  desc: string
  duration: string
  deliverable: string
}

export const processSteps: ProcessStep[] = [
  {
    step: '01',
    title: 'Diskusi & Brief',
    desc: 'Kami memetakan menu yang Anda butuhkan, gaya visual brand, dan isi pesan utama di halaman web.',
    duration: 'Hari 1',
    deliverable: 'Peta halaman & brief visual',
  },
  {
    step: '02',
    title: 'Prototipe Visual',
    desc: 'Kami membuat tata letak visual dan interaktif secara langsung agar Anda bisa melihat tampilan awal web.',
    duration: 'Hari 1–2',
    deliverable: 'Prototipe yang bisa diklik',
  },
  {
    step: '03',
    title: 'Penulisan Kode',
    desc: 'Developer kami mulai menerjemahkan rancangan visual menjadi kode React yang bersih dan responsif.',
    duration: 'Hari 2–5',
    deliverable: 'Build staging + preview link',
  },
  {
    step: '04',
    title: 'Uji Coba & SEO',
    desc: 'Website diuji pada berbagai ukuran HP, serta setup kelengkapan SEO on-page dan script analytics.',
    duration: 'Hari 5–6',
    deliverable: 'Laporan QA & skor performa',
  },
  {
    step: '05',
    title: 'Handoff Akses',
    desc: 'Website dideploy agar online penuh, lalu kami menyerahkan semua akses file dan mengadakan sesi panduan.',
    duration: 'Hari 6–7',
    deliverable: 'Git repo, domain, sesi panduan',
  },
]

/* ------------------------------------------------------------------ *
 * Tech stack — nama harus cocok dengan peta ikon di components/icons/brand
 * ------------------------------------------------------------------ */

export const techStack = [
  'React.js',
  'Vite.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Cloudflare',
  'Vercel',
  'Node.js',
  'PostgreSQL',
  'Supabase',
  'Git / GitHub',
  'Docker',
]

/* ------------------------------------------------------------------ *
 * Hero stats
 * ------------------------------------------------------------------ */

export interface HeroStat {
  value: number
  prefix?: string
  suffix?: string
  label: string
}

/**
 * Hanya klaim yang bisa dipertanggungjawabkan dari isi paket di halaman ini.
 * Jangan tambahkan jumlah klien / rating tanpa bukti.
 */
export const heroStats: HeroStat[] = [
  { value: 1, suffix: ' thn', label: 'Garansi bug' },
  { value: 7, prefix: '3–', label: 'Hari kerja' },
  { value: 100, suffix: '%', label: 'Hak milik kode' },
]
