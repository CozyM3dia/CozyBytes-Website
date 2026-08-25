import { Target, MessageCircle, Rocket, BarChart2, Smartphone, RefreshCw } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PricingTier } from '../../components/ServicePricingCard'

/* ------------------------------------------------------------------ *
 * Motion constants — sumbernya di components/section/tokens supaya
 * keempat halaman layanan memakai easing yang sama. Di-re-export di
 * sini agar section halaman ini bisa `import { EASE } from './data'`.
 * ------------------------------------------------------------------ */

export { EASE, SPRING, SOFT_SPRING } from '../../components/section/tokens'

export const WA_LINK =
  'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20landing%20page.'

/* ------------------------------------------------------------------ *
 * Pricing
 * ------------------------------------------------------------------ */

export const tiers: PricingTier[] = [
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

/* ------------------------------------------------------------------ *
 * Fitur utama
 * ------------------------------------------------------------------ */

export interface Feature {
  icon: LucideIcon
  title: string
  desc: string
  /** Ringkasan mono di kartu. Semua nilainya dikutip dari copy di halaman
   *  ini (deskripsi fitur / isi paket), bukan angka baru. */
  signal: string
}

export const featuresList: Feature[] = [
  {
    icon: Target,
    title: 'Halaman Khusus Jualan',
    desc: 'Kami mendesain halaman web tanpa menu navigasi keluar yang mengganggu. Pengunjung diarahkan untuk fokus membaca penawaran produk Anda dan menekan tombol CTA.',
    signal: '1 tujuan',
  },
  {
    icon: BarChart2,
    title: 'Pelacakan Iklan Sudah Siap',
    desc: 'Sudah diatur agar siap dipasangi Meta Pixel, TikTok Pixel, dan Google Tag Manager. Data konversi Anda tercatat akurat untuk membantu evaluasi iklan.',
    signal: 'Meta · TikTok · GTM',
  },
  {
    icon: Smartphone,
    title: 'Dibuat Khusus untuk Layar HP',
    desc: 'Hampir seluruh pembeli dari iklan media sosial membuka link lewat ponsel. Kami pastikan layout gambar, teks, dan tombol pemesanan sangat nyaman diakses dari HP.',
    signal: 'Mobile-first',
  },
  {
    icon: Rocket,
    title: 'Loading Halaman Instan',
    desc: 'Setiap detik pengunjung menunggu halaman dimuat, budget iklan Anda terbuang sia-sia. Landing page statis kami termuat dalam waktu kurang dari 1.5 detik.',
    signal: '< 1.5 detik',
  },
  {
    icon: MessageCircle,
    title: 'Tombol Chat WA Langsung',
    desc: 'Tautan ke WhatsApp sudah disiapkan dengan format teks pemesanan otomatis. Calon pembeli tidak perlu mengetik ulang barang yang ingin mereka beli.',
    signal: 'WhatsApp API',
  },
  {
    icon: RefreshCw,
    title: 'Copywriting Alur Penawaran',
    desc: 'Kami menyusun struktur tulisan penawaran yang runtut mulai dari hook pengait perhatian, pengenalan masalah, benefit, bukti testimoni, hingga ajakan bertindak.',
    signal: 'Hook → CTA',
  },
]

/* ------------------------------------------------------------------ *
 * Pain points — dipetakan ke titik kebocoran funnel di Diagnosis
 * ------------------------------------------------------------------ */

export interface PainPoint {
  title: string
  desc: string
}

export const painPoints: PainPoint[] = [
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

/* ------------------------------------------------------------------ *
 * Comparison matrix
 * ------------------------------------------------------------------ */

export interface ComparisonRow {
  aspect: string
  cozy: string
  saas: string
  wordpress: string
  biolink: string
}

export const comparisons: ComparisonRow[] = [
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

export const competitorColumns = [
  { key: 'saas', label: 'Platform SaaS Instan' },
  { key: 'wordpress', label: 'WordPress Landing Page' },
  { key: 'biolink', label: 'Linktree / Biolink Instan' },
] as const

export type CompetitorKey = (typeof competitorColumns)[number]['key']

/* ------------------------------------------------------------------ *
 * FAQ — dipakai juga untuk FAQPage schema di LandingPageServicePage
 * ------------------------------------------------------------------ */

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Apa bedanya Landing Page dengan Website biasa?',
    a: 'Website biasa memiliki banyak navigasi (Menu Home, Profil, Karir, Blog) dan didesain untuk eksplorasi informasi. Landing page adalah satu halaman khusus yang didesain untuk satu tujuan: mengonversi pengunjung menjadi pembeli. Tidak ada menu keluar yang membingungkan, sehingga sangat efektif dijadikan link tujuan iklan Facebook, Instagram, atau Google Ads.',
  },
  {
    q: 'Apakah landing page ini sudah bisa dipasangi pixel iklan?',
    a: 'Sudah sangat siap. Kami mengintegrasikan Meta Pixel (Facebook Ads), TikTok Pixel, dan Google Tag Manager sejak awal. Kami juga bisa mengatur custom event pelacakan khusus, seperti melacak klik tombol WhatsApp agar data optimasi iklan Anda akurat.',
  },
  {
    q: 'Bagaimana perbedaan sistem Sewa Bulanan dengan sistem Beli (Ownership)?',
    a: 'Sistem Sewa (Bulanan/Tahunan) cocok bagi Anda yang baru mencoba pasar atau memiliki produk musiman dengan modal awal minim. Kami yang mengurus hosting, domain (.my.id/.web.id), dan pemeliharaan teknisnya. Sistem Beli (Ownership) adalah investasi sekali bayar, di mana hosting gratis 1 tahun pertama dan domain (.com/.id) serta source code diberikan penuh kepada Anda.',
  },
  {
    q: 'Bagaimana alur integrasi WhatsApp di landing page ini?',
    a: 'Kami mengintegrasikannya langsung dengan WhatsApp API. Ketika pengunjung menekan tombol beli, mereka akan diarahkan ke WhatsApp admin Anda dengan draf pesan otomatis (contoh: "Halo Cozybytes, saya tertarik memesan Landing Page Paket Tahunan"). Kami juga bisa menambahkan formulir data diri terlebih dahulu sebelum dialihkan ke WA.',
  },
  {
    q: 'Berapa lama proses pengerjaan landing page?',
    a: 'Proses pengerjaan berkisar antara 3 hingga 5 hari kerja setelah kami menerima materi gambar produk, teks penawaran, dan detail kontak dari Anda.',
  },
  {
    q: 'Apakah saya bisa mengganti isi tulisan sendiri di kemudian hari?',
    a: 'Bisa. Untuk paket Beli (Ownership), kami memberikan panduan praktis berupa dokumen tertulis untuk membantu Anda melakukan edit teks/gambar mandiri. Untuk paket Sewa (khusus tahunan), Anda bisa meminta bantuan tim support kami untuk update tulisan minor gratis.',
  },
]

/* ------------------------------------------------------------------ *
 * Workflow
 * ------------------------------------------------------------------ */

export interface WorkflowStep {
  step: string
  title: string
  desc: string
}

export const workflowSteps: WorkflowStep[] = [
  {
    step: '01',
    title: 'Diskusi Awal',
    desc: 'Kami mengulas keunggulan produk Anda dan menentukan satu aksi utama yang diinginkan dari pembeli.',
  },
  {
    step: '02',
    title: 'Draft Tulisan',
    desc: 'Copywriter kami menulis draf tulisan penawaran yang menarik minat dan memicu keputusan belanja.',
  },
  {
    step: '03',
    title: 'Layout Visual',
    desc: 'Perancangan tata letak visual halaman web dengan memprioritaskan kenyamanan pengguna HP.',
  },
  {
    step: '04',
    title: 'Penulisan Kode',
    desc: 'Proses coding landing page dan integrasi tools pelacak pixel untuk kebutuhan iklan Anda.',
  },
  {
    step: '05',
    title: 'Serah Terima',
    desc: 'Halaman web online penuh, kami bantu uji coba alur pelacakan tombol chat WhatsApp Anda.',
  },
]

/* ------------------------------------------------------------------ *
 * Tech stack — nama harus cocok dengan peta ikon di components/icons/brand
 * ------------------------------------------------------------------ */

export const techStack = [
  'Vite.js',
  'React.js',
  'TypeScript',
  'Tailwind CSS',
  'Framer Motion',
  'Cloudflare',
  'Vercel',
  'Meta Pixel',
  'TikTok Pixel',
  'Google Tag Manager',
  'WhatsApp API',
  'Git',
]

export const stackGuarantees = [
  'Kompresi Gambar Otomatis',
  'Jaringan Hosting Cloudflare',
  'Serverless Tanpa Database Berat',
]

/* ------------------------------------------------------------------ *
 * Anatomi halaman — dipakai sebagai tab di section Anatomy.
 * `mockText` adalah contoh teks yang muncul di ilustrasi ponsel.
 * ------------------------------------------------------------------ */

export type HotspotKey = 'hook' | 'urgency' | 'cta' | 'proof'

export interface Hotspot {
  key: HotspotKey
  title: string
  desc: string
  mockText: string
}

export const hotspots: Hotspot[] = [
  {
    key: 'hook',
    title: 'Headline Pengait (Hook)',
    desc: 'Pernyataan pembuka yang langsung mengunci perhatian pengunjung iklan dalam 3 detik pertama. Menyebutkan solusi masalah secara langsung.',
    mockText: 'Potong Biaya Iklan Hingga 40% Dengan Landing Page Instan',
  },
  {
    key: 'urgency',
    title: 'Urgency & Penawaran Terbatas',
    desc: 'Elemen diskon waktu atau hitung mundur untuk merangsang pembeli mengambil keputusan sekarang daripada menundanya.',
    mockText: 'Diskon 50% Hanya Berlaku Untuk 10 Pendaftar Pertama Hari Ini!',
  },
  {
    key: 'cta',
    title: 'WhatsApp Call-To-Action',
    desc: 'Tombol kontak yang menonjol dan melayang (sticky) di layar HP agar pembeli gampang menghubungi Anda kapan saja.',
    mockText: 'Ambil Promo Via WhatsApp',
  },
  {
    key: 'proof',
    title: 'Bukti Sosial (Testimoni)',
    desc: 'Pernyataan kepuasan dari pembeli nyata untuk meyakinkan calon pelanggan baru bahwa produk Anda terpercaya.',
    mockText:
      '"Sangat terbantu! Penjualan online kami naik drastis sejak pakai landing page ini." - Budi, Toko Sepatu Lokal',
  },
]

/* ------------------------------------------------------------------ *
 * Tahapan funnel — motif visual halaman ini. Nama event memakai nama
 * event standar Meta/GTM, jadi bukan klaim hasil, hanya label teknis.
 * ------------------------------------------------------------------ */

export interface FunnelStage {
  label: string
  event: string
  /** Lebar batang funnel (persen) — semata perangkat visual penyempitan. */
  width: number
}

export const funnelStages: FunnelStage[] = [
  { label: 'Klik iklan masuk', event: 'AdClick', width: 100 },
  { label: 'Halaman terbuka', event: 'PageView', width: 82 },
  { label: 'Penawaran dibaca', event: 'ViewContent', width: 63 },
  { label: 'Chat WhatsApp', event: 'Contact', width: 45 },
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
 * Hanya angka yang bisa ditelusuri ke isi paket / FAQ di halaman ini.
 * Jangan tambahkan jumlah klien, rating, atau kenaikan penjualan.
 */
export const heroStats: HeroStat[] = [
  { value: 1, suffix: ' halaman', label: 'Fokus konversi' },
  { value: 5, prefix: '3–', label: 'Hari kerja' },
  { value: 3, suffix: ' pixel', label: 'Kanal pelacak' },
]
