import { Bell, CreditCard, Package, Search, Smartphone, Truck } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ *
 * Motion constants — sumbernya di components/section/tokens supaya
 * keempat halaman layanan memakai easing yang sama. Di-re-export di sini
 * agar section halaman ini tetap bisa `import { EASE } from './data'`.
 * ------------------------------------------------------------------ */

export { EASE, SPRING, SOFT_SPRING } from '../../components/section/tokens'

export const WA_LINK =
  'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20toko%20online.'

/* ------------------------------------------------------------------ *
 * Konfigurator fitur
 * ------------------------------------------------------------------ */

export interface CustomFeature {
  id: string
  /**
   * Label utuh. Nilai inilah yang dikirim ke payload WhatsApp, jadi jangan
   * pernah dipotong saat render — `short` + `badge` yang dipakai di UI supaya
   * embel-embel seperti "(Gratis 1 Tahun)" tetap terbaca pengguna.
   */
  label: string
  short: string
  badge?: string
  group: string
  desc: string
}

export const customFeatures: CustomFeature[] = [
  {
    id: 'domain',
    label: 'Domain & Hosting Premium (Gratis 1 Tahun)',
    short: 'Domain & Hosting Premium',
    badge: 'Gratis 1 Tahun',
    group: 'Dasar',
    desc: 'Alamat web (.com/.id) & server penyimpanan file.',
  },
  {
    id: 'katalog-std',
    label: 'Katalog Produk Standard (s.d 500 item)',
    short: 'Katalog Produk Standard',
    badge: 's.d 500 item',
    group: 'Dasar',
    desc: 'Manajemen produk dengan kategori & varian dasar.',
  },
  {
    id: 'katalog-unlimited',
    label: 'Katalog Unlimited / Skala Besar',
    short: 'Katalog Unlimited / Skala Besar',
    group: 'Dasar',
    desc: 'Database produk berkapasitas ekstra tanpa batas.',
  },
  {
    id: 'payment',
    label: 'Integrasi Payment Gateway Otomatis',
    short: 'Integrasi Payment Gateway Otomatis',
    group: 'Transaksi',
    desc: 'Bayar otomatis via QRIS, Virtual Account, & dompet digital.',
  },
  {
    id: 'ongkir',
    label: 'Hitung Tarif Ongkir RajaOngkir',
    short: 'Hitung Tarif Ongkir RajaOngkir',
    group: 'Transaksi',
    desc: 'Kalkulasi otomatis biaya kirim real-time ekspedisi nasional.',
  },
  {
    id: 'notif-wa',
    label: 'Notifikasi Otomatis WhatsApp',
    short: 'Notifikasi Otomatis WhatsApp',
    group: 'Sistem',
    desc: 'Kirim invoice & update nomor resi pengiriman otomatis ke pembeli.',
  },
  {
    id: 'dashboard',
    label: 'Dashboard Admin & Laporan Keuangan',
    short: 'Dashboard Admin & Laporan Keuangan',
    group: 'Sistem',
    desc: 'Kelola stok barang, pantau data pesanan & grafik omzet harian.',
  },
  {
    id: 'erp',
    label: 'Sinkronisasi Stok Internal (ERP API)',
    short: 'Sinkronisasi Stok Internal',
    badge: 'ERP API',
    group: 'Sistem',
    desc: 'Koneksi database stok website dengan sistem gudang fisik Anda.',
  },
  {
    id: 'custom-ui',
    label: 'Desain UI Kustom (Bukan Template)',
    short: 'Desain UI Kustom',
    badge: 'Bukan Template',
    group: 'Visual',
    desc: 'Tampilan toko online dirancang khusus sesuai identitas brand.',
  },
  {
    id: 'membership',
    label: 'Sistem Membership & Poin Belanja',
    short: 'Sistem Membership & Poin Belanja',
    group: 'Fitur Lanjutan',
    desc: 'Fitur akun pembeli, riwayat pesanan, dan diskon loyalty point.',
  },
]

/** Urutan grup di ledger konfigurator. */
export const featureGroups = ['Dasar', 'Transaksi', 'Sistem', 'Visual', 'Fitur Lanjutan'] as const

/**
 * Dua skala katalog saling menggantikan. Dulu logika ini diam-diam melepas
 * pilihan lain tanpa penjelasan, jadi id-nya diangkat ke data agar UI bisa
 * menerangkannya (teks bantuan + pengumuman aria-live).
 */
export const KATALOG_PAIR = ['katalog-std', 'katalog-unlimited'] as const

export const DEFAULT_FEATURES = ['domain', 'katalog-std', 'payment', 'ongkir']

export interface Complexity {
  label: string
  color: string
  barColor: string
  width: string
  /** Nilai numerik untuk aria-valuenow, selalu sinkron dengan `width`. */
  value: number
  desc: string
}

export function getComplexity(count: number): Complexity {
  if (count <= 3)
    return {
      label: 'Sederhana (Web Toko Dasar)',
      color: 'text-cyan-400',
      barColor: 'bg-cyan-500',
      width: '30%',
      value: 30,
      desc: 'Cocok untuk katalog kecil yang ingin mulai transisi dari jualan via chat WA langsung.',
    }
  if (count <= 7)
    return {
      label: 'Menengah (Toko Online Otomatis)',
      color: 'text-amber-400',
      barColor: 'bg-amber-500',
      width: '65%',
      value: 65,
      desc: 'Sangat direkomendasikan untuk brand lokal berkembang yang ingin auto-checkout.',
    }
  return {
    label: 'Kompleks (Sistem E-Commerce Enterprise)',
    color: 'text-violet-400',
    barColor: 'bg-violet-500',
    width: '100%',
    value: 100,
    desc: 'Ideal untuk retail besar dengan integrasi database stok, WhatsApp OTP, & kustomisasi penuh.',
  }
}

/** Payload WhatsApp memakai label utuh, bukan label pendek versi UI. */
export function buildWhatsAppUrl(selectedIds: string[]): string {
  const selectedLabels = customFeatures
    .filter((f) => selectedIds.includes(f.id))
    .map((f, index) => `${index + 1}. ${f.label}`)
    .join('%0A')
  const complexity = getComplexity(selectedIds.length).label

  const text = `Halo Cozybytes, saya tertarik membuat website e-commerce dengan sistem custom. Berikut ringkasan fitur yang saya butuhkan:%0A%0A${selectedLabels}%0A%0ATingkat Kompleksitas: ${complexity}%0AMohon estimasi biaya pengerjaan dan jadwal konsultasinya. Terima kasih.`
  return `https://wa.me/6285894514719?text=${text}`
}

/* ------------------------------------------------------------------ *
 * Manifest fitur toko
 * ------------------------------------------------------------------ */

export interface FeatureItem {
  icon: LucideIcon
  title: string
  desc: string
}

export const featuresList: FeatureItem[] = [
  {
    icon: CreditCard,
    title: 'Pembayaran Otomatis (Payment Gateway)',
    desc: 'Terima pembayaran via QRIS, e-wallet (GoPay, OVO, Dana), Virtual Account transfer bank, dan Kartu Kredit secara instan. Sistem akan mengubah status pesanan otomatis setelah terbayar.',
  },
  {
    icon: Truck,
    title: 'Hitung Ongkir Otomatis',
    desc: 'Terintegrasi langsung dengan ekspedisi nasional (JNE, J&T, Sicepat, POS) untuk kalkulasi biaya pengiriman secara real-time berdasarkan berat barang dan alamat pembeli.',
  },
  {
    icon: Package,
    title: 'Atur Varian & Stok Barang',
    desc: 'Dashboard admin khusus untuk mengelola stok, variasi produk (ukuran/warna), mencatat transaksi masuk, dan mengunduh laporan penjualan berkala.',
  },
  {
    icon: Smartphone,
    title: 'Checkout Ringkas di HP',
    desc: 'Mayoritas pembeli online berbelanja lewat ponsel. Formulir pemesanan kami rancang seringkas mungkin agar pembeli tidak malas menyelesaikan pembayaran di HP.',
  },
  {
    icon: Search,
    title: 'SEO Katalog Produk',
    desc: 'Kami menerapkan standar ramah pencarian Google (Product Schema) agar detail harga, sisa stok, dan nama barang Anda bisa langsung terbaca di halaman Google.',
  },
  {
    icon: Bell,
    title: 'Notifikasi WhatsApp Pelanggan',
    desc: 'Kirim notifikasi bukti pemesanan, tagihan pembayaran, dan nomor resi ekspedisi secara otomatis ke WhatsApp pembeli untuk meningkatkan kepuasan.',
  },
]

export const paymentPills = [
  'QRIS',
  'GoPay',
  'OVO',
  'Dana',
  'Virtual Account',
  'Kartu Kredit',
]

/* ------------------------------------------------------------------ *
 * Diagnosa
 * ------------------------------------------------------------------ */

export interface PainPoint {
  title: string
  desc: string
}

export const painPoints: PainPoint[] = [
  {
    title: 'Pembeli Kabur karena Chat Manual',
    desc: 'Calon pembeli malas menyelesaikan transaksi jika harus menunggu balasan admin manual hanya untuk menanyakan ongkir atau mengirim bukti transfer.',
  },
  {
    title: 'Komisi Marketplace Terus Naik',
    desc: 'Biaya admin dan komisi per transaksi di marketplace besar terus naik. Ini menguras margin keuntungan bersih dari produk yang Anda jual.',
  },
  {
    title: 'Perang Harga Terlalu Sengit',
    desc: 'Berjualan di lapak bersama membuat barang Anda ditaruh berdampingan dengan kompetitor yang menjual barang serupa dengan harga banting.',
  },
  {
    title: 'Database Pembeli Disembunyikan',
    desc: 'Platform besar tidak memberikan database kontak pelanggan seutuhnya kepada Anda, sehingga Anda kesulitan melakukan promosi ulang (remarketing).',
  },
]

/* ------------------------------------------------------------------ *
 * Matriks perbandingan
 * ------------------------------------------------------------------ */

export interface ComparisonRow {
  aspect: string
  cozy: string
  marketplace: string
  saas: string
  woocommerce: string
}

export const comparisons: ComparisonRow[] = [
  {
    aspect: 'Potongan Komisi',
    cozy: '0% (Keuntungan bersih sepenuhnya milik Anda)',
    marketplace: 'Hingga 5% - 10% per transaksi',
    saas: 'Biaya sewa bulanan + potongan platform',
    woocommerce: '0% (hanya biaya admin penyedia payment gateway)',
  },
  {
    aspect: 'Kepemilikan Data',
    cozy: 'Milik Anda penuh (Akses database langsung)',
    marketplace: 'Disembunyikan sepenuhnya oleh platform',
    saas: 'Bisa diunduh, namun terikat di server mereka',
    woocommerce: 'Milik Anda penuh',
  },
  {
    aspect: 'Kecepatan Loading',
    cozy: 'Sangat cepat (Arsitektur web modern tanpa database berat)',
    marketplace: 'Sedang, tergantung traffic server platform',
    saas: 'Sedang, kode platform bawaan cukup berat',
    woocommerce: 'Lambat akibat beban plugin WordPress yang menumpuk',
  },
  {
    aspect: 'Kustomisasi Fitur',
    cozy: 'Bebas dimodifikasi sesuai alur bisnis Anda',
    marketplace: 'Terbatas hanya pada fitur marketplace saja',
    saas: 'Dibatasi pilihan aplikasi berbayar tambahan',
    woocommerce: 'Bisa, tetapi rawan bentrok plugin',
  },
]

export const competitorColumns = [
  { key: 'marketplace', label: 'Marketplace (Hijau/Oranye)' },
  { key: 'saas', label: 'Shopify (SaaS)' },
  { key: 'woocommerce', label: 'WooCommerce (Wordpress)' },
] as const

export type CompetitorKey = (typeof competitorColumns)[number]['key']

/* ------------------------------------------------------------------ *
 * FAQ — dipakai juga untuk FAQPage schema di EcommercePage
 * ------------------------------------------------------------------ */

export interface Faq {
  q: string
  a: string
}

export const faqs: Faq[] = [
  {
    q: 'Apakah ada potongan komisi penjualan dari Cozybytes?',
    a: 'Tidak ada. Cozybytes membangun toko online mandiri milik Anda seutuhnya. Seluruh dana hasil penjualan masuk langsung ke rekening bank atau akun Payment Gateway Anda tanpa potongan komisi sepeser pun dari kami.',
  },
  {
    q: 'Bagaimana cara setup sistem pembayaran otomatis di website?',
    a: 'Kami mengintegrasikan toko online Anda dengan payment gateway resmi (seperti Midtrans atau Xendit). Setelah akun Anda aktif, pembeli bisa membayar via QRIS, dompet digital, Virtual Account bank, atau kartu kredit secara otomatis terkonfirmasi oleh sistem.',
  },
  {
    // Jawaban ini dulu menyebut paket "Pro dan Enterprise" yang tidak ada di
    // halaman ini — harga di sini berupa konfigurator fitur, bukan tier.
    q: 'Apakah ongkos kirim ekspedisi dihitung otomatis?',
    a: 'Ya, selama fitur Hitung Tarif Ongkir RajaOngkir Anda aktifkan di konfigurator fitur. Kami menggunakan API RajaOngkir untuk menghitung tarif pengiriman secara otomatis berdasarkan berat produk, lokasi gudang Anda, dan alamat kecamatan pengiriman pembeli.',
  },
  {
    q: 'Bagaimana saya memasukkan produk dan memantau stok barang?',
    a: 'Kami menyediakan Dashboard Admin yang bersih dan mudah digunakan. Melalui dashboard ini, Anda bisa dengan mudah mengunggah foto produk baru, memperbarui stok, mengubah harga coret (diskon), dan melihat daftar pesanan yang harus dikirim.',
  },
  {
    q: 'Apakah data pembeli di website aman?',
    a: 'Sangat aman. Kami menggunakan enkripsi SSL penuh di seluruh halaman web. Proses checkout kartu kredit juga menggunakan token khusus yang diproses aman di sisi server payment gateway tanpa disimpan di server lokal website Anda.',
  },
  {
    // Idem: tiga rentang waktu aslinya ditempelkan ke nama paket. Sekarang
    // dipetakan ke tingkat kompleksitas konfigurasi yang benar-benar ada.
    q: 'Berapa lama proses pengerjaan toko online dari nol?',
    a: 'Tergantung fitur yang Anda pilih di konfigurator. Konfigurasi sederhana berupa katalog dan checkout dasar berkisar antara 4 hingga 7 hari kerja. Konfigurasi menengah yang menambahkan integrasi API pembayaran & logistik memakan waktu 7 hingga 12 hari kerja. Sedangkan konfigurasi kompleks dengan sinkronisasi stok internal dan sistem membership memerlukan waktu pengerjaan 2 hingga 4 minggu.',
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
  {
    step: '01',
    title: 'Pemetaan Menu',
    desc: 'Menentukan kategori barang yang dijual, serta integrasi rekening bank penyedia payment gateway.',
  },
  {
    step: '02',
    title: 'Desain Checkout',
    desc: 'Merancang alur keranjang belanja dan formulir checkout yang ringkas agar pembeli gampang mengisi data diri.',
  },
  {
    step: '03',
    title: 'Penulisan Kode',
    desc: 'Menulis kode sistem basis data stok barang dan tampilan katalog utama website.',
  },
  {
    step: '04',
    title: 'Uji Coba API',
    desc: 'Simulasi pengujian pembayaran digital otomatis dan kalkulasi hitung tarif ongkir RajaOngkir.',
  },
  {
    step: '05',
    title: 'Serah Terima',
    desc: 'Deployment web ke server live, lalu penyerahan dashboard admin dan panduan kelola stok.',
  },
]

/* ------------------------------------------------------------------ *
 * Tech stack — nama harus cocok dengan peta ikon di components/icons/brand.
 * 'Supabase Auth' diganti 'Supabase' supaya dapat glyph asli; 'Midtrans API'
 * dan 'RajaOngkir API' dipertahankan karena namanya bermakna dan sengaja
 * memakai fallback titik.
 * ------------------------------------------------------------------ */

export const techStack = [
  'Vite.js',
  'React.js',
  'Tailwind CSS',
  'TypeScript',
  'Midtrans API',
  'RajaOngkir API',
  'Node.js',
  'Express.js',
  'PostgreSQL',
  'Supabase',
  'Cloudflare',
  'Git',
]

export const stackGuarantees = [
  'Verifikasi Pembayaran Instan',
  'Cek Resi Logistik Nasional',
  'Infrastruktur Serverless Cepat',
]

/* ------------------------------------------------------------------ *
 * Hero — angka yang bisa dipertanggungjawabkan dari isi halaman ini saja.
 * ------------------------------------------------------------------ */

export interface HeroStat {
  num: string
  label: string
}

export const heroStats: HeroStat[] = [
  { num: '0%', label: 'Komisi platform' },
  { num: '24/7', label: 'Bayar otomatis' },
  { num: 'API', label: 'Ongkir real-time' },
]

/* ------------------------------------------------------------------ *
 * Simulator checkout
 * ------------------------------------------------------------------ */

export const ORDER_ID = 'CB-9821'
export const CART_SUBTOTAL = 149000

export const cartItem = {
  name: 'Sepatu Sneakers Kulit Lokal',
  variant: 'Varian: Hitam, Ukuran 42',
}

export type CourierId = 'jnt' | 'sicepat'
export type PayMethodId = 'qris' | 'va'

export const couriers: { id: CourierId; label: string; cost: number }[] = [
  { id: 'jnt', label: 'J&T (Rp 12k)', cost: 12000 },
  { id: 'sicepat', label: 'Sicepat (Rp 24k)', cost: 24000 },
]

export const payMethods: { id: PayMethodId; label: string; display: string }[] = [
  { id: 'qris', label: 'QRIS', display: 'QRIS (Gopay/OVO/Shopee)' },
  { id: 'va', label: 'Virtual Account', display: 'Virtual Account Bank' },
]

export const VA_NUMBER = '8832 9182 3012'

export const orderToasts = [
  {
    id: 'wa',
    title: 'WhatsApp Notification (Lunas)',
    time: 'now',
    body: `Halo Budi, order ${ORDER_ID} lunas! Resi pengiriman akan dikirim otomatis ke nomor ini.`,
  },
  {
    id: 'email',
    title: `Email Invoice (${ORDER_ID})`,
    time: 'now',
    body: 'Terima kasih atas pembayaran Anda. Invoice lunas & detail pengiriman...',
  },
]

/** Tiga status pesanan yang dipakai sebagai stepper di kepala simulator. */
export const orderStates = ['Menunggu', 'Terbayar', 'Dikirim'] as const
