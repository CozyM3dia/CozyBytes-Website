import { Clock, Compass, FileText, Layout, LayoutGrid, Palette, Repeat, Smartphone, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import type { PricingTier } from '../../components/ServicePricingCard'

/* ------------------------------------------------------------------ *
 * Motion constants — sumbernya di components/section/tokens supaya
 * keempat halaman layanan memakai easing yang sama. Di-re-export di sini
 * agar section halaman ini tetap bisa `import { EASE } from './data'`.
 * ------------------------------------------------------------------ */

export { EASE, SPRING, SOFT_SPRING } from '../../components/section/tokens'

export const WA_LINK =
  'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20UI%2FUX%20design.'

/* ------------------------------------------------------------------ *
 * Pricing
 * ------------------------------------------------------------------ */

export const tiers: PricingTier[] = [
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
    // Selisih 7.998.000 - 3.999.000 = 3.999.000; versi lama menulis "Rp 4 juta".
    savings: 'Hemat Rp 3.999.000',
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

/* ------------------------------------------------------------------ *
 * Cakupan layanan
 * ------------------------------------------------------------------ */

export interface FeatureItem {
  icon: LucideIcon
  title: string
  desc: string
}

export const featuresList: FeatureItem[] = [
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

/* ------------------------------------------------------------------ *
 * Diagnosa — aksen per kartu + peta stylenya di level modul (dulu
 * accentMap dibangun ulang di dalam .map() pada setiap render).
 * ------------------------------------------------------------------ */

export type Accent = 'cyan' | 'gold' | 'violet' | 'emerald'

export interface PainPoint {
  num: string
  kicker: string
  title: string
  desc: string
  icon: LucideIcon
  accent: Accent
}

export const painPoints: PainPoint[] = [
  {
    num: '01',
    kicker: 'Kredibilitas',
    title: 'Tampilan Website Terlihat Jadul',
    desc: 'Website yang kuno membuat calon pembeli meragukan profesionalitas bisnis Anda, menurunkan tingkat kepercayaan sebelum membaca penawaran.',
    icon: Clock,
    accent: 'cyan',
  },
  {
    num: '02',
    kicker: 'Navigasi',
    title: 'Ruwet & Pengunjung Mudah Tersesat',
    desc: 'Navigasi yang berantakan membuat pengunjung kesulitan mencari tombol kontak atau katalog produk, lalu menutup halaman dalam hitungan detik.',
    icon: Compass,
    accent: 'gold',
  },
  {
    num: '03',
    kicker: 'Responsif',
    title: 'Tampilan Rusak Saat Dibuka di HP',
    desc: 'Teks terpotong, gambar tumpang tindih, dan tombol terlalu rapat saat dibuka dari ponsel pintar, menyiksa kenyamanan pengunjung.',
    icon: Smartphone,
    accent: 'violet',
  },
  {
    num: '04',
    kicker: 'Originalitas',
    title: 'Layout Kaku WordPress Template',
    desc: 'Desain template instan yang kaku dan mirip dengan puluhan website kompetitor lain, gagal membedakan brand Anda di pasar.',
    icon: LayoutGrid,
    accent: 'emerald',
  },
]

export const accentMap: Record<
  Accent,
  { border: string; glow: string; iconBg: string; line: string }
> = {
  cyan: {
    border: 'hover:border-[#00FFFF]/30',
    glow: 'rgba(0,255,255,0.08)',
    iconBg: 'bg-[#00FFFF]/10 text-[#00FFFF] group-hover:bg-[#00FFFF] group-hover:text-black',
    line: 'bg-[#00FFFF]',
  },
  gold: {
    border: 'hover:border-[#F8D16A]/30',
    glow: 'rgba(248,209,106,0.08)',
    iconBg: 'bg-[#F8D16A]/10 text-[#F8D16A] group-hover:bg-[#F8D16A] group-hover:text-black',
    line: 'bg-[#F8D16A]',
  },
  violet: {
    border: 'hover:border-violet-300/30',
    glow: 'rgba(196,181,253,0.08)',
    iconBg: 'bg-violet-400/10 text-violet-300 group-hover:bg-violet-300 group-hover:text-black',
    line: 'bg-violet-300',
  },
  emerald: {
    border: 'hover:border-emerald-300/30',
    glow: 'rgba(110,231,183,0.08)',
    iconBg: 'bg-emerald-400/10 text-emerald-300 group-hover:bg-emerald-300 group-hover:text-black',
    line: 'bg-emerald-300',
  },
}

/* ------------------------------------------------------------------ *
 * Matriks perbandingan
 * ------------------------------------------------------------------ */

export interface ComparisonRow {
  aspect: string
  cozy: string
  agency: string
  freelancer: string
  templates: string
}

export const comparisons: ComparisonRow[] = [
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

export const competitorColumns = [
  { key: 'agency', label: 'Agensi Tradisional (Besar)' },
  { key: 'freelancer', label: 'Desainer Freelancer' },
  { key: 'templates', label: 'Tema/Template Instan' },
] as const

export type CompetitorKey = (typeof competitorColumns)[number]['key']

/* ------------------------------------------------------------------ *
 * FAQ — dipakai juga untuk FAQPage schema di UIUXPage
 * ------------------------------------------------------------------ */

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Apa perbedaan antara UI (User Interface) dan UX (User Experience) Design?',
    a: 'UI (User Interface) berfokus pada keindahan visual website, seperti pemilihan warna, jenis font, kebersihan layout, dan hiasan visual. UX (User Experience) berfokus pada kemudahan navigasi. UX yang baik memastikan pengunjung bisa menemukan informasi atau menyelesaikan pembelian tanpa kebingungan.',
  },
  {
    q: 'Kenapa tata letak visual website perlu dirancang dan dimatangkan sebelum koding selesai?',
    a: 'Melakukan perubahan layout langsung saat koding sudah berjalan memakan waktu lama dan biaya besar. Dengan merancang tata letak dan visual UI/UX terlebih dahulu, Anda bisa melihat gambaran nyata website Anda dan mensimulasikan alur navigasi sejak awal sebelum sistem backend selesai dibuat.',
  },
  {
    q: 'File apa saja yang saya dapatkan setelah proyek selesai?',
    a: 'Anda akan menerima semua aset visual lengkap dalam format SVG, panduan style guide (warna & tipografi), dokumentasi pustaka komponen kode, serta link simulasi halaman web interaktif.',
  },
  {
    q: 'Apakah harga paket desain ini sudah termasuk proses koding?',
    a: 'Paket di halaman ini khusus untuk pembuatan visual desain UI/UX dan struktur halaman. Namun, Cozybytes juga melayani coding (custom website development). Jika Anda ingin desain tersebut langsung didevelop menjadi website aktif, kami bisa menyertakan penawaran bundling khusus.',
  },
  {
    q: 'Bagaimana cara developer internal kami menggunakan aset desain dari Cozybytes?',
    a: 'Kami menyusun aset menggunakan standar kode modern. Tim programmer Anda bisa langsung mengambil kode CSS layout, menyalin file ikon SVG, dan membaca panduan jarak antar elemen secara instan.',
  },
  {
    q: 'Apakah saya bisa meminta redesign untuk aplikasi HP?',
    a: 'Bisa. Selain website profil perusahaan & e-commerce, kami juga melayani jasa desain antarmuka (UI/UX) untuk aplikasi Android dan iOS.',
  },
]

/* ------------------------------------------------------------------ *
 * Alur kerja
 * ------------------------------------------------------------------ */

export interface WorkflowStep {
  step: string
  title: string
  desc: string
}

export const workflowSteps: WorkflowStep[] = [
  { step: '01', title: 'Riset & Arah Visual', desc: 'Menganalisis web lama, riset kompetitor sejenis, dan menentukan gaya desain visual.' },
  { step: '02', title: 'Sketsa Struktur', desc: 'Pembuatan wireframe hitam-putih untuk merencanakan posisi menu dan tombol halaman.' },
  { step: '03', title: 'Desain Visual', desc: 'Membuat halaman utuh dengan menghias tombol, warna, jenis huruf, dan gambar.' },
  { step: '04', title: 'Prototype Klik', desc: 'Menghubungkan tombol antar halaman agar Anda bisa mencoba langsung alur navigasi web.' },
  { step: '05', title: 'Serah Terima', desc: 'Review akhir revisi desain, lalu penyerahan link visual & aset lengkap untuk programmer Anda.' },
]

/* ------------------------------------------------------------------ *
 * Deliverables — dulu 12 pill sejajar tanpa bobot; sekarang
 * dikelompokkan supaya hasil nyata tampil lebih dulu daripada
 * istilah teknis dan nama alat.
 * ------------------------------------------------------------------ */

export const deliverableGroups: { label: string; items: string[] }[] = [
  {
    label: 'Diserahkan ke Anda',
    items: ['Visual UI Design', 'Web Prototype', 'Developer Handoff', 'SVG Vector Assets', 'UI Kits / Library'],
  },
  {
    label: 'Standar yang dipakai',
    items: ['Design Tokens', 'CSS Variables', 'Flexbox / Grid', 'Google Web Fonts', 'Tailwind Config'],
  },
  {
    label: 'Perangkat desain',
    items: ['Adobe Photoshop', 'Adobe Illustrator'],
  },
]

/* ------------------------------------------------------------------ *
 * Hero stats
 * ------------------------------------------------------------------ */

export const heroStats = [
  { num: 'SVG', label: 'Aset diserahkan' },
  { num: 'Klik', label: 'Prototype interaktif' },
  { num: 'CSS', label: 'Handoff developer' },
]
