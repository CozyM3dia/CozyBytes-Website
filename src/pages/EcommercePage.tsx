import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import {
  CreditCard, Package, Smartphone, Search,
  Bell, MessageCircle, ArrowUpRight, Check,
  ChevronDown, Truck, CheckCircle2, QrCode
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { LightCone } from '../components/atmosphere'
import { BrandIcon } from '../components/icons/brand'

const WA_LINK = 'https://wa.me/6285894514719?text=Halo%20Cozybytes%2C%20saya%20tertarik%20dengan%20layanan%20toko%20online.'

const customFeatures = [
  { id: 'domain', label: 'Domain & Hosting Premium (Gratis 1 Tahun)', group: 'Dasar', desc: 'Alamat web (.com/.id) & server penyimpanan file.' },
  { id: 'katalog-std', label: 'Katalog Produk Standard (s.d 500 item)', group: 'Dasar', desc: 'Manajemen produk dengan kategori & varian dasar.' },
  { id: 'katalog-unlimited', label: 'Katalog Unlimited / Skala Besar', group: 'Dasar', desc: 'Database produk berkapasitas ekstra tanpa batas.' },
  { id: 'payment', label: 'Integrasi Payment Gateway Otomatis', group: 'Transaksi', desc: 'Bayar otomatis via QRIS, Virtual Account, & dompet digital.' },
  { id: 'ongkir', label: 'Hitung Tarif Ongkir RajaOngkir', group: 'Transaksi', desc: 'Kalkulasi otomatis biaya kirim real-time ekspedisi nasional.' },
  { id: 'notif-wa', label: 'Notifikasi Otomatis WhatsApp', group: 'Sistem', desc: 'Kirim invoice & update nomor resi pengiriman otomatis ke pembeli.' },
  { id: 'dashboard', label: 'Dashboard Admin & Laporan Keuangan', group: 'Sistem', desc: 'Kelola stok barang, pantau data pesanan & grafik omzet harian.' },
  { id: 'erp', label: 'Sinkronisasi Stok Internal (ERP API)', group: 'Sistem', desc: 'Koneksi database stok website dengan sistem gudang fisik Anda.' },
  { id: 'custom-ui', label: 'Desain UI Kustom (Bukan Template)', group: 'Visual', desc: 'Tampilan toko online dirancang khusus sesuai identitas brand.' },
  { id: 'membership', label: 'Sistem Membership & Poin Belanja', group: 'Fitur Lanjutan', desc: 'Fitur akun pembeli, riwayat pesanan, dan diskon loyalty point.' },
]

const featuresList = [
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

const painPoints = [
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

const comparisons = [
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

const faqs = [
  {
    q: 'Apakah ada potongan komisi penjualan dari Cozybytes?',
    a: 'Tidak ada. Cozybytes membangun toko online mandiri milik Anda seutuhnya. Seluruh dana hasil penjualan masuk langsung ke rekening bank atau akun Payment Gateway Anda tanpa potongan komisi sepeser pun dari kami.'
  },
  {
    q: 'Bagaimana cara setup sistem pembayaran otomatis di website?',
    a: 'Kami mengintegrasikan toko online Anda dengan payment gateway resmi (seperti Midtrans atau Xendit). Setelah akun Anda aktif, pembeli bisa membayar via QRIS, dompet digital, Virtual Account bank, atau kartu kredit secara otomatis terkonfirmasi oleh sistem.'
  },
  {
    q: 'Apakah ongkos kirim ekspedisi dihitung otomatis?',
    a: 'Ya. Pada paket Pro dan Enterprise, kami menggunakan API RajaOngkir untuk menghitung tarif pengiriman secara otomatis berdasarkan berat produk, lokasi gudang Anda, dan alamat kecamatan pengiriman pembeli.'
  },
  {
    q: 'Bagaimana saya memasukkan produk dan memantau stok barang?',
    a: 'Kami menyediakan Dashboard Admin yang bersih dan mudah digunakan. Melalui dashboard ini, Anda bisa dengan mudah mengunggah foto produk baru, memperbarui stok, mengubah harga coret (diskon), dan melihat daftar pesanan yang harus dikirim.'
  },
  {
    q: 'Apakah data pembeli di website aman?',
    a: 'Sangat aman. Kami menggunakan enkripsi SSL penuh di seluruh halaman web. Proses checkout kartu kredit juga menggunakan token khusus yang diproses aman di sisi server payment gateway tanpa disimpan di server lokal website Anda.'
  },
  {
    q: 'Berapa lama proses pengerjaan toko online dari nol?',
    a: 'Untuk paket Starter berkisar antara 4 hingga 7 hari kerja. Paket Pro memakan waktu 7 hingga 12 hari kerja karena memerlukan integrasi API pembayaran & logistik. Sedangkan paket Enterprise memerlukan waktu pengerjaan 2 hingga 4 minggu.'
  }
]

const workflowSteps = [
  { step: '01', title: 'Pemetaan Menu', desc: 'Menentukan kategori barang yang dijual, serta integrasi rekening bank penyedia payment gateway.' },
  { step: '02', title: 'Desain Checkout', desc: 'Merancang alur keranjang belanja dan formulir checkout yang ringkas agar pembeli gampang mengisi data diri.' },
  { step: '03', title: 'Penulisan Kode', desc: 'Menulis kode sistem basis data stok barang dan tampilan katalog utama website.' },
  { step: '04', title: 'Uji Coba API', desc: 'Simulasi pengujian pembayaran digital otomatis dan kalkulasi hitung tarif ongkir RajaOngkir.' },
  { step: '05', title: 'Serah Terima', desc: 'Deployment web ke server live, lalu penyerahan dashboard admin dan panduan kelola stok.' },
]

const techStack = ['Vite.js', 'React.js', 'Tailwind CSS', 'TypeScript', 'Midtrans API', 'RajaOngkir API', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase Auth', 'Cloudflare', 'Git']

export default function EcommercePage() {
  const pricingRef = useRef(null)
  const inView = useInView(pricingRef, { once: true, margin: '-60px' })
  const [activeFaq, setActiveFaq] = useState<number | null>(null)

  // Checkout Simulator State
  const [payMethod, setPayMethod] = useState<'qris' | 'va'>('qris')
  const [shipping, setShipping] = useState<'jnt' | 'sicepat'>('jnt')
  const [isPaid, setIsPaid] = useState<boolean>(false)
  const [showNotifications, setShowNotifications] = useState<boolean>(false)

  // Custom Feature Configurator State
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([
    'domain',
    'katalog-std',
    'payment',
    'ongkir'
  ])

  const toggleFeature = (id: string) => {
    if (id === 'katalog-std') {
      setSelectedFeatures(prev => {
        const filtered = prev.filter(item => item !== 'katalog-unlimited')
        return filtered.includes(id) ? filtered.filter(item => item !== id) : [...filtered, id]
      })
    } else if (id === 'katalog-unlimited') {
      setSelectedFeatures(prev => {
        const filtered = prev.filter(item => item !== 'katalog-std')
        return filtered.includes(id) ? filtered.filter(item => item !== id) : [...filtered, id]
      })
    } else {
      setSelectedFeatures(prev =>
        prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
      )
    }
  }

  const getComplexity = () => {
    const count = selectedFeatures.length
    if (count <= 3) return { label: 'Sederhana (Web Toko Dasar)', color: 'text-cyan-400', barColor: 'bg-cyan-500', width: '30%', desc: 'Cocok untuk katalog kecil yang ingin mulai transisi dari jualan via chat WA langsung.' }
    if (count <= 7) return { label: 'Menengah (Toko Online Otomatis)', color: 'text-amber-400', barColor: 'bg-amber-500', width: '65%', desc: 'Sangat direkomendasikan untuk brand lokal berkembang yang ingin auto-checkout.' }
    return { label: 'Kompleks (Sistem E-Commerce Enterprise)', color: 'text-violet-400', barColor: 'bg-violet-500', width: '100%', desc: 'Ideal untuk retail besar dengan integrasi database stok, WhatsApp OTP, & kustomisasi penuh.' }
  }

  const getWhatsAppUrl = () => {
    const selectedLabels = customFeatures
      .filter(f => selectedFeatures.includes(f.id))
      .map((f, index) => `${index + 1}. ${f.label}`)
      .join('%0A')
    const complexity = getComplexity().label

    const text = `Halo Cozybytes, saya tertarik membuat website e-commerce dengan sistem custom. Berikut ringkasan fitur yang saya butuhkan:%0A%0A${selectedLabels}%0A%0ATingkat Kompleksitas: ${complexity}%0AMohon estimasi biaya pengerjaan dan jadwal konsultasinya. Terima kasih.`
    return `https://wa.me/6285894514719?text=${text}`
  }

  useEffect(() => {
    if (isPaid) {
      const showTimer = setTimeout(() => {
        setShowNotifications(true)
      }, 0)
      const timer = setTimeout(() => {
        setShowNotifications(false)
      }, 5000)
      return () => {
        clearTimeout(showTimer)
        clearTimeout(timer)
      }
    }
  }, [isPaid])

  const getShippingCost = () => (shipping === 'jnt' ? 12000 : 24000)
  const getSubtotal = () => 149000
  const getTotal = () => getSubtotal() + getShippingCost()

  return (
    <div className="min-h-screen text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">

      <Helmet>
        <title>Jasa Pembuatan Toko Online E-Commerce Custom & Mandiri | Cozybytes</title>
        <meta name="description" content="Toko online milik sendiri, tanpa potongan komisi marketplace. Pembayaran QRIS dan transfer terkonfirmasi otomatis, ongkir dihitung real-time, dan resi terkirim sendiri ke WhatsApp pembeli." />
        <meta name="keywords" content="jasa toko online, website e-commerce UMKM, payment gateway otomatis, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/ecommerce" />
        <meta property="og:title" content="Jasa Pembuatan Toko Online E-Commerce Custom & Mandiri | Cozybytes" />
        <meta property="og:description" content="Toko online milik sendiri, tanpa potongan komisi marketplace. Pembayaran terkonfirmasi otomatis, ongkir real-time, notifikasi WhatsApp ke pembeli." />
        <meta property="og:url" content="https://cozybytes.media/layanan/ecommerce" />
        <meta property="og:image" content="https://cozybytes.media/services/ecommerce.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/services/ecommerce.jpg" />
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
            name: 'Jasa Pembuatan Toko Online E-Commerce',
            serviceType: 'E-Commerce Development',
            description: 'Pembuatan toko online mandiri dengan payment gateway otomatis, kalkulasi ongkir real-time, dashboard admin, dan notifikasi WhatsApp. Tanpa komisi penjualan.',
            url: 'https://cozybytes.media/layanan/ecommerce',
            areaServed: 'Indonesia',
            provider: { '@type': 'ProfessionalService', name: 'Cozybytes Media', url: 'https://cozybytes.media' },
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Beranda', item: 'https://cozybytes.media/' },
              { '@type': 'ListItem', position: 2, name: 'Layanan Toko Online', item: 'https://cozybytes.media/layanan/ecommerce' },
            ],
          })}
        </script>
      </Helmet>

      {/* ============ HERO: copy left + checkout simulator right ============ */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden pt-24 pb-16">
        <LightCone tint="cyan" className="left-1/2 -translate-x-1/2 -top-24" />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 45% at 78% 30%, rgba(0,255,255,0.10) 0%, transparent 60%), radial-gradient(ellipse 40% 40% at 8% 90%, rgba(0,255,255,0.04) 0%, transparent 60%)',
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
                Toko Online Mandiri
              </span>
              <h1 className="font-display text-[2.6rem] leading-[1.02] tracking-tight sm:text-6xl lg:text-[4rem] font-medium">
                Jualan tanpa potongan
                <br />
                <span className="text-[#00FFFF]">komisi marketplace.</span>
              </h1>
              <p className="mt-6 max-w-md text-base leading-relaxed text-white/55">
                Bangun brand sendiri, simpan database pelanggan seutuhnya, dan terima pembayaran otomatis 24 jam nonstop.
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
                  Rancang Fitur Toko
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>

              <div className="mt-12 grid max-w-md grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-6">
                {[
                  { num: '0%', label: 'Komisi platform' },
                  { num: '24/7', label: 'Bayar otomatis' },
                  { num: 'API', label: 'Ongkir real-time' },
                ].map((s) => (
                  <div key={s.label} className="px-4 first:pl-0">
                    <div className="font-mono text-2xl font-bold text-white">{s.num}</div>
                    <div className="mt-1 text-xs text-white/40">{s.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Checkout simulator */}
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
                    <span className="ml-3 truncate font-mono text-[9px] text-white/30">cozybytes.id/checkout</span>
                  </div>

                  <div className="relative flex flex-1 flex-col justify-between overflow-hidden bg-[#060608] p-5 text-xs">
                    <AnimatePresence>
                      {isPaid && showNotifications && (
                        <div className="pointer-events-none absolute inset-x-2 top-2 z-30 space-y-1.5">
                          <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            className="flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-[#202c33] p-2 shadow-lg"
                          >
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                              <MessageCircle className="h-3.5 w-3.5 fill-current" />
                            </div>
                            <div className="min-w-0 flex-1 text-[8px] text-white">
                              <div className="flex justify-between font-bold">
                                <span>WhatsApp Notification (Lunas)</span>
                                <span className="text-[6px] text-white/30">now</span>
                              </div>
                              <p className="truncate leading-tight text-white/60">Halo Budi, order CB-9821 lunas! Resi pengiriman akan dikirim otomatis ke nomor ini.</p>
                            </div>
                          </motion.div>

                          <motion.div
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ delay: 0.5 }}
                            className="flex items-center gap-2 rounded-lg border border-blue-500/20 bg-[#18181b] p-2 shadow-lg"
                          >
                            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-blue-500 text-white">
                              <Truck className="h-3.5 w-3.5" />
                            </div>
                            <div className="min-w-0 flex-1 text-[8px] text-white">
                              <div className="flex justify-between font-bold">
                                <span>Email Invoice (CB-9821)</span>
                                <span className="text-[6px] text-white/30">now</span>
                              </div>
                              <p className="truncate leading-tight text-white/60">Terima kasih atas pembayaran Anda. Invoice lunas & detail pengiriman...</p>
                            </div>
                          </motion.div>
                        </div>
                      )}
                    </AnimatePresence>

                    <AnimatePresence mode="wait">
                      {!isPaid ? (
                        <motion.div
                          key="cart"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="flex h-full flex-col justify-between space-y-4"
                        >
                          <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                            <span className="font-bold text-white/80">Ringkasan Pembayaran</span>
                            <span className="font-mono text-[10px] text-white/30">Order ID: CB-9821</span>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded border border-[#00FFFF]/20 bg-[#00FFFF]/10 font-mono text-[10px] text-[#00FFFF]">
                              ITEM
                            </div>
                            <div className="flex-1">
                              <h4 className="text-[11px] font-bold text-white">Sepatu Sneakers Kulit Lokal</h4>
                              <p className="text-[9px] text-white/40">Varian: Hitam, Ukuran 42</p>
                            </div>
                            <span className="font-mono font-bold text-white/80">Rp {getSubtotal().toLocaleString('id-ID')}</span>
                          </div>

                          <div className="space-y-1.5 border-t border-white/5 pt-2 text-[10px] text-white/55">
                            <div className="flex justify-between">
                              <span>Subtotal</span>
                              <span className="font-mono">Rp {getSubtotal().toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between">
                              <span>Ongkos Kirim ({shipping.toUpperCase()})</span>
                              <span className="font-mono">Rp {getShippingCost().toLocaleString('id-ID')}</span>
                            </div>
                            <div className="flex justify-between border-t border-white/5 pt-1.5 text-xs font-bold text-white">
                              <span>Total Pembayaran</span>
                              <span className="font-mono text-[#00FFFF]">Rp {getTotal().toLocaleString('id-ID')}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.01] p-3">
                            <div className="space-y-0.5">
                              <span className="block text-[9px] text-white/30">Metode Pembayaran</span>
                              <span className="font-bold text-white/80">{payMethod === 'qris' ? 'QRIS (Gopay/OVO/Shopee)' : 'Virtual Account Bank'}</span>
                            </div>
                            {payMethod === 'qris' ? (
                              <QrCode className="h-6 w-6 text-[#00FFFF]" />
                            ) : (
                              <span className="rounded bg-[#00FFFF]/10 px-2.5 py-1 font-mono text-[10px] font-semibold text-[#00FFFF]">8832 9182 3012</span>
                            )}
                          </div>

                          <button
                            onClick={() => setIsPaid(true)}
                            className="flex h-9 w-full items-center justify-center rounded-lg bg-[#00FFFF] text-[10px] font-black text-black shadow-[0_0_15px_rgba(0,255,255,0.15)]"
                          >
                            Simulasikan Pembayaran Berhasil
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div
                          key="success"
                          initial={{ scale: 0.95, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          exit={{ scale: 0.95, opacity: 0 }}
                          className="flex h-full flex-col items-center justify-center space-y-3 text-center"
                        >
                          <CheckCircle2 className="h-12 w-12 animate-bounce text-emerald-400" />
                          <h3 className="text-base font-bold text-white">Pembayaran Berhasil!</h3>
                          <p className="max-w-xs text-[10px] leading-relaxed text-white/50">
                            Sistem payment gateway otomatis mendeteksi transaksi Anda. Notifikasi konfirmasi dan resi telah otomatis dikirim ke nomor WhatsApp pembeli.
                          </p>
                          <button
                            onClick={() => setIsPaid(false)}
                            className="rounded-full border border-white/10 px-4 py-2 text-[9px] font-bold text-white/60 hover:bg-white/5 hover:text-white"
                          >
                            Ulangi Simulasi
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* Simulator controls */}
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold text-white/40">Kurir (RajaOngkir)</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => { setShipping('jnt'); setIsPaid(false); }}
                        className={`flex-1 rounded-lg border p-2 text-left text-[11px] transition-all ${shipping === 'jnt' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01] text-white/60'}`}
                      >
                        J&T (Rp 12k)
                      </button>
                      <button
                        onClick={() => { setShipping('sicepat'); setIsPaid(false); }}
                        className={`flex-1 rounded-lg border p-2 text-left text-[11px] transition-all ${shipping === 'sicepat' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01] text-white/60'}`}
                      >
                        Sicepat (Rp 24k)
                      </button>
                    </div>
                  </div>
                  <div className="space-y-1.5">
                    <span className="block text-xs font-semibold text-white/40">Metode Pembayaran</span>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => { setPayMethod('qris'); setIsPaid(false); }}
                        className={`flex-1 rounded-lg border p-2 text-left text-[11px] transition-all ${payMethod === 'qris' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01] text-white/60'}`}
                      >
                        QRIS
                      </button>
                      <button
                        onClick={() => { setPayMethod('va'); setIsPaid(false); }}
                        className={`flex-1 rounded-lg border p-2 text-left text-[11px] transition-all ${payMethod === 'va' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01] text-white/60'}`}
                      >
                        Virtual Account
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============ PAIN POINTS: 4-col minimal top-border ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Bergantung penuh pada marketplace
              <br />
              menghambat brand Anda.
            </h2>
          </div>

          <div className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {painPoints.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.07 }}
                className="border-t-2 border-[#00FFFF]/30 pt-5"
              >
                <span className="font-mono text-xs font-bold text-white/30">{String(i + 1).padStart(2, '0')}</span>
                <h3 className="mt-2 text-base font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/50">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FEATURES: 2-col list, large first item ============ */}
      <section className="py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-16 max-w-2xl">
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Fitur Toko Online
            </span>
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Transaksi selesai sendiri,
              <br />
              tanpa admin manual.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {/* First feature: full-width emphasis cell */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5 }}
              className="relative overflow-hidden rounded-2xl border border-[#00FFFF]/15 p-8 md:col-span-2"
              style={{ background: 'linear-gradient(120deg, rgba(0,255,255,0.07) 0%, rgba(0,255,255,0.01) 45%, transparent 100%)' }}
            >
              <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#00FFFF]/10 blur-3xl" />
              <div className="grid items-center gap-8 md:grid-cols-2">
                <div>
                  <CreditCard className="mb-5 h-7 w-7 text-[#00FFFF]" />
                  <h3 className="font-display text-2xl font-medium text-white">{featuresList[0].title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/55">{featuresList[0].desc}</p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {['QRIS', 'GoPay', 'OVO', 'Dana', 'Virtual Account', 'Kartu Kredit'].map((m) => (
                    <span key={m} className="rounded-full border border-[#00FFFF]/20 bg-[#00FFFF]/5 px-4 py-2 font-mono text-xs text-[#00FFFF]/80">
                      {m}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            {featuresList.slice(1).map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
                className="group flex gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-7 transition-colors hover:border-[#00FFFF]/25"
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
      </section>

      {/* ============ COMPARISON ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="mb-14 max-w-2xl">
            <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Dibanding marketplace,
              <br />
              Shopify, dan WooCommerce.
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-white/[0.01]">
            <table className="w-full min-w-[700px] border-collapse text-left">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Faktor Evaluasi</th>
                  <th className="p-5 font-display text-sm font-semibold text-[#00FFFF]">Cozybytes E-Commerce</th>
                  <th className="p-5 text-sm font-bold text-white/60">Marketplace (Hijau/Oranye)</th>
                  <th className="p-5 text-sm font-bold text-white/60">Shopify (SaaS)</th>
                  <th className="p-5 text-sm font-bold text-white/60">WooCommerce (Wordpress)</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 transition-all last:border-0 hover:bg-white/[0.015]">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="border-x border-[#00FFFF]/10 bg-[#00FFFF]/5 p-5 text-sm font-medium text-[#00FFFF]">{row.cozy}</td>
                    <td className="p-5 text-sm text-white/50">{row.marketplace}</td>
                    <td className="p-5 text-sm text-white/50">{row.saas}</td>
                    <td className="p-5 text-sm text-white/50">{row.woocommerce}</td>
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
            Fondasi teknis toko Anda.
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
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Verifikasi Pembayaran Instan</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Cek Resi Logistik Nasional</span>
          <span className="flex items-center gap-2"><Check className="h-3.5 w-3.5 text-[#00FFFF]" /> Infrastruktur Serverless Cepat</span>
        </div>
      </section>

      {/* ============ WORKFLOW: vertical timeline ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <div className="lg:sticky lg:top-32">
                <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
                  Sampai orderan
                  <br />
                  pertama masuk.
                </h2>
                <p className="mt-5 text-sm leading-relaxed text-white/50">
                  Lima fase membangun toko online mandiri Anda dari nol hingga siap menerima pembeli.
                </p>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="relative border-l border-white/10 pl-10 md:pl-14">
                {workflowSteps.map((step, i) => (
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

      {/* ============ FEATURE CONFIGURATOR (pricing) ============ */}
      <section id="harga" ref={pricingRef} className="relative overflow-hidden py-24 md:py-32">
        <LightCone tint="gold" className="left-1/2 -translate-x-1/2 -top-16" />
        <div className="pointer-events-none absolute left-1/4 top-1/2 h-[500px] w-[500px] -translate-y-1/2 rounded-full bg-[#00FFFF]/5 blur-[150px]" />

        <div className="relative z-10 mx-auto max-w-7xl px-5 md:px-8">
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
              Rancang fitur toko Anda.
              <br />
              Bayar yang dibutuhkan saja.
            </h2>
            <p className="mt-5 max-w-lg text-sm leading-relaxed text-white/55">
              Kami tidak memaksakan paket kaku. Pilih fitur di bawah lalu kirimkan langsung ke WhatsApp kami untuk estimasi biaya.
            </p>
          </motion.div>

          <div className="grid items-start gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-7">
              <h3 className="mb-2 text-lg font-bold text-white">Pilih kebutuhan sistem Anda</h3>

              <div className="grid gap-3 sm:grid-cols-2">
                {customFeatures.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`group flex h-28 flex-col justify-between rounded-xl border p-4 text-left transition-all duration-200 ${
                        isSelected
                          ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-white'
                          : 'border-white/5 bg-white/[0.01] text-white/60 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <div className="flex w-full items-start justify-between">
                        <span className={`rounded px-2 py-0.5 font-mono text-[10px] font-bold uppercase tracking-wider ${
                          isSelected ? 'bg-[#00FFFF]/20 text-[#00FFFF]' : 'bg-white/5 text-white/40'
                        }`}>
                          {feat.group}
                        </span>
                        <div className={`flex h-4 w-4 items-center justify-center rounded-full border transition-all ${
                          isSelected ? 'border-[#00FFFF] bg-[#00FFFF] text-black' : 'border-white/25'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold transition-all ${isSelected ? 'text-[#00FFFF]' : 'text-white/80 group-hover:text-white'}`}>
                          {feat.label.replace(' (Gratis 1 Tahun)', '').replace(' Premium', '')}
                        </h4>
                        <p className="mt-1 truncate text-[10px] leading-normal text-white/40">
                          {feat.desc}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="sticky top-24 space-y-6 rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-[0_30px_70px_rgba(0,0,0,0.6)] backdrop-blur-md md:p-8">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <h3 className="text-base font-bold text-white">Ringkasan Konfigurasi</h3>
                  <span className="rounded-full bg-white/5 px-2.5 py-1 font-mono text-xs text-white/60">
                    {selectedFeatures.length} Fitur
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="mb-1 block text-xs font-semibold text-white/40">Skala Sistem & Kompleksitas</span>
                    <span className={`block text-sm font-bold ${getComplexity().color}`}>
                      {getComplexity().label}
                    </span>
                  </div>

                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      className={`h-full ${getComplexity().barColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: getComplexity().width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <p className="text-xs leading-relaxed text-white/50">
                    {getComplexity().desc}
                  </p>
                </div>

                <div className="space-y-3 border-t border-white/5 pt-4">
                  <div className="flex items-end justify-between">
                    <div>
                      <span className="block text-xs font-semibold text-white/40">Estimasi Biaya</span>
                      <span className="mt-0.5 block text-xs text-[#00FFFF]">Custom / Menyesuaikan Kebutuhan</span>
                    </div>
                    <span className="font-display text-2xl font-medium tracking-tight text-white">Hubungi WA</span>
                  </div>

                  <p className="rounded-lg border border-white/5 bg-white/[0.02] p-3 text-[11px] leading-relaxed text-white/45">
                    Halaman admin, payment gateway, dan hitung ongkir otomatis dikonfigurasi khusus tanpa ada biaya tersembunyi.
                  </p>
                </div>

                <motion.a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex h-12 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-[#00FFFF] text-xs font-black text-black shadow-[0_0_30px_rgba(0,255,255,0.2)] transition-all hover:shadow-[0_0_40px_rgba(0,255,255,0.35)]"
                >
                  <MessageCircle className="h-4 w-4 fill-current" />
                  Kirim Rincian ke WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>

                <p className="text-center text-[10px] text-white/30">
                  Konsultasi gratis. Tim developer Cozybytes akan merespon dengan rincian biaya pengerjaan sesuai fitur pilihan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FAQ ============ */}
      <section className="border-t border-white/5 py-24 md:py-32">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
            Pertanyaan seputar toko online.
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
              Toko online milik Anda.
              <br />
              <span className="text-[#00FFFF]">Pembayaran otomatis 24 jam.</span>
            </h2>
            <p className="mx-auto mt-6 max-w-md text-sm leading-relaxed text-white/50">
              Hubungi tim kami untuk konsultasi alur checkout otomatis yang paling sesuai dengan jenis barang dagangan Anda.
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
