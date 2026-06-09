import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { 
  CreditCard, Package, Smartphone, Search, 
  Bell, MessageCircle, ArrowUpRight, Check, AlertCircle, 
  ChevronDown, Code, Truck, Sparkles, CheckCircle2, QrCode
} from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

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
      setShowNotifications(true)
      const timer = setTimeout(() => {
        setShowNotifications(false)
      }, 5000)
      return () => clearTimeout(timer)
    } else {
      setShowNotifications(false)
    }
  }, [isPaid])

  const getShippingCost = () => (shipping === 'jnt' ? 12000 : 24000)
  const getSubtotal = () => 149000
  const getTotal = () => getSubtotal() + getShippingCost()

  return (
    <div className="min-h-screen bg-zinc-950 text-white selection:bg-[#00FFFF]/30 selection:text-[#00FFFF]">
      <Navbar />

      <Helmet>
        <title>Jasa Pembuatan Toko Online E-Commerce Custom & Mandiri | Cozybytes</title>
        <meta name="description" content="Jasa pembuatan website toko online profesional untuk UMKM & brand lokal. Integrasi payment gateway otomatis, ongkir otomatis, tanpa komisi penjualan. Mulai Rp 2.499.000." />
        <meta name="keywords" content="jasa toko online, jasa e-commerce, bikin toko online profesional, website e-commerce UMKM, website payment gateway otomatis, developer e-commerce Lampung, cozybytes" />
        <link rel="canonical" href="https://cozybytes.media/layanan/ecommerce" />
        <meta property="og:title" content="Jasa Pembuatan Toko Online E-Commerce Custom & Mandiri | Cozybytes" />
        <meta property="og:description" content="Miliki toko online mandiri tanpa bergantung pada potongan komisi marketplace. Integrasi payment gateway otomatis, RajaOngkir, dashboard admin mudah, dan mobile-first." />
        <meta property="og:url" content="https://cozybytes.media/layanan/ecommerce" />
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
              Toko Online Mandiri
            </span>
            <h1
              className="mb-6 text-4xl sm:text-6xl md:text-7xl leading-tight font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Bikin Toko Online Mandiri Tanpa Potongan <br />
              <em className="text-[#00FFFF] italic font-normal">Komisi Transaksi dari Marketplace</em>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-base md:text-lg leading-relaxed text-white/60">
              Mulai bangun brand produk Anda sendiri, simpan database kontak pelanggan seutuhnya, dan terima pembayaran otomatis 24 jam nonstop tanpa perlu khawatir perang banting harga di lapak yang sama.
            </p>

            {/* Trust Badges */}
            <div className="mb-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Midtrans & Xendit Verified
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> 0% Komisi Transaksi Platform
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-400" /> Integrasi RajaOngkir Logistik
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
                Diskusikan Fitur Toko Anda
              </motion.a>
              <a
                href="#harga"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-8 py-4 text-sm font-semibold text-white/75 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all"
              >
                Konsultasi Estimasi Biaya
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Interactive Checkout Visual Showcase */}
      <section className="py-20 bg-[#07070a] border-t border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.01)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.01)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />
        <div className="mx-auto max-w-6xl px-5 md:px-6 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 space-y-6">
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/5 text-xs font-semibold text-emerald-400">
                <Sparkles className="h-3 w-3" /> Checkout Engine Simulator
              </span>
              <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
                Alur Pemesanan yang <br />
                <em className="text-[#00FFFF] italic font-normal">Otomatis Tanpa Admin Manual</em>
              </h2>
              <p className="text-sm leading-relaxed text-white/50">
                Uji coba checkout simulator di sebelah kanan. Pilih kurir pengiriman dan metode pembayaran, lalu saksikan bagaimana transaksi diselesaikan secara real-time.
              </p>

              {/* Controls Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-xs text-white/40 block font-semibold">1. Pilih Kurir (RajaOngkir)</span>
                  <div className="flex flex-col gap-1.5">
                    <button 
                      onClick={() => { setShipping('jnt'); setIsPaid(false); }}
                      className={`text-xs p-2.5 rounded-lg border text-left transition-all ${shipping === 'jnt' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01]'}`}
                    >
                      J&T Regular (Rp 12k)
                    </button>
                    <button 
                      onClick={() => { setShipping('sicepat'); setIsPaid(false); }}
                      className={`text-xs p-2.5 rounded-lg border text-left transition-all ${shipping === 'sicepat' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01]'}`}
                    >
                      Sicepat BEST (Rp 24k)
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-xs text-white/40 block font-semibold">2. Metode Pembayaran</span>
                  <div className="flex flex-col gap-1.5">
                    <button 
                      onClick={() => { setPayMethod('qris'); setIsPaid(false); }}
                      className={`text-xs p-2.5 rounded-lg border text-left transition-all ${payMethod === 'qris' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01]'}`}
                    >
                      QRIS / E-Wallet
                    </button>
                    <button 
                      onClick={() => { setPayMethod('va'); setIsPaid(false); }}
                      className={`text-xs p-2.5 rounded-lg border text-left transition-all ${payMethod === 'va' ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-[#00FFFF]' : 'border-white/5 bg-white/[0.01]'}`}
                    >
                      Virtual Account VA
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 flex justify-center">
              {/* Browser shell container */}
              <div className="rounded-2xl border border-white/10 bg-zinc-900/60 overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.6),0_0_50px_rgba(0,255,255,0.03)] w-full aspect-[4/3] relative flex flex-col">
                <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/8 bg-zinc-950/80">
                  <div className="h-2.5 w-2.5 rounded-full bg-red-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-yellow-500/60" />
                  <div className="h-2.5 w-2.5 rounded-full bg-green-500/60" />
                  <span className="ml-3 text-[9px] text-white/30 truncate">cozybytes.id/checkout</span>
                </div>

                <div className="flex-1 bg-[#060608] p-5 flex flex-col justify-between relative overflow-hidden text-xs">
                  {/* Webhook notification toasts */}
                  <AnimatePresence>
                    {isPaid && showNotifications && (
                      <div className="absolute top-2 inset-x-2 z-30 space-y-1.5 pointer-events-none">
                        {/* WA Notif */}
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          className="bg-[#202c33] border border-emerald-500/20 rounded-lg p-2 flex items-center gap-2 shadow-lg"
                        >
                          <div className="h-6 w-6 rounded-full bg-emerald-500 flex flex-shrink-0 items-center justify-center text-white">
                            <MessageCircle className="h-3.5 w-3.5 fill-current" />
                          </div>
                          <div className="flex-1 min-w-0 text-[8px] text-white">
                            <div className="flex justify-between font-bold">
                              <span>WhatsApp Notification (Lunas)</span>
                              <span className="text-white/30 text-[6px]">now</span>
                            </div>
                            <p className="text-white/60 leading-tight truncate">Halo Budi, order CB-9821 lunas! Resi pengiriman akan dikirim otomatis ke nomor ini.</p>
                          </div>
                        </motion.div>

                        {/* Email Notif */}
                        <motion.div
                          initial={{ opacity: 0, y: -20, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -20, scale: 0.95 }}
                          transition={{ delay: 0.5 }}
                          className="bg-[#18181b] border border-blue-500/20 rounded-lg p-2 flex items-center gap-2 shadow-lg"
                        >
                          <div className="h-6 w-6 rounded-full bg-blue-500 flex flex-shrink-0 items-center justify-center text-white">
                            <Truck className="h-3.5 w-3.5" />
                          </div>
                          <div className="flex-1 min-w-0 text-[8px] text-white">
                            <div className="flex justify-between font-bold">
                              <span>Email Invoice (CB-9821)</span>
                              <span className="text-white/30 text-[6px]">now</span>
                            </div>
                            <p className="text-white/60 leading-tight truncate">Terima kasih atas pembayaran Anda. Invoice lunas & detail pengiriman...</p>
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
                        className="space-y-4 h-full flex flex-col justify-between"
                      >
                        {/* Cart Header */}
                        <div className="flex justify-between items-center border-b border-white/5 pb-2.5">
                          <span className="font-bold text-white/80">Ringkasan Pembayaran</span>
                          <span className="text-[10px] text-white/30">Order ID: CB-9821</span>
                        </div>

                        {/* Order Item */}
                        <div className="flex gap-3 items-center">
                          <div className="h-10 w-10 rounded bg-[#00FFFF]/10 border border-[#00FFFF]/20 flex items-center justify-center font-serif text-[10px] text-[#00FFFF]">
                            ITEM
                          </div>
                          <div className="flex-1">
                            <h4 className="font-bold text-white text-[11px]">Sepatu Sneakers Kulit Lokal</h4>
                            <p className="text-[9px] text-white/40">Varian: Hitam, Ukuran 42</p>
                          </div>
                          <span className="font-bold text-white/80">Rp {getSubtotal().toLocaleString('id-ID')}</span>
                        </div>

                        {/* Summary Details */}
                        <div className="space-y-1.5 pt-2 border-t border-white/5 text-[10px] text-white/55">
                          <div className="flex justify-between">
                            <span>Subtotal</span>
                            <span>Rp {getSubtotal().toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Ongkos Kirim ({shipping.toUpperCase()})</span>
                            <span>Rp {getShippingCost().toLocaleString('id-ID')}</span>
                          </div>
                          <div className="flex justify-between text-white font-bold text-xs pt-1.5 border-t border-white/5">
                            <span>Total Pembayaran</span>
                            <span className="text-[#00FFFF]">Rp {getTotal().toLocaleString('id-ID')}</span>
                          </div>
                        </div>

                        {/* Payment Box */}
                        <div className="p-3 rounded-xl border border-white/5 bg-white/[0.01] flex items-center justify-between">
                          <div className="space-y-0.5">
                            <span className="text-[9px] text-white/30 block">Metode Pembayaran</span>
                            <span className="font-bold text-white/80">{payMethod === 'qris' ? 'QRIS (Gopay/OVO/Shopee)' : 'Virtual Account Bank'}</span>
                          </div>
                          {payMethod === 'qris' ? (
                            <QrCode className="h-6 w-6 text-[#00FFFF]" />
                          ) : (
                            <span className="text-[10px] px-2.5 py-1 rounded bg-[#00FFFF]/10 text-[#00FFFF] font-mono font-semibold">8832 9182 3012</span>
                          )}
                        </div>

                        {/* Submit Button */}
                        <button
                          onClick={() => setIsPaid(true)}
                          className="w-full h-9 rounded-lg bg-[#00FFFF] text-black font-black text-[10px] flex items-center justify-center shadow-[0_0_15px_rgba(0,255,255,0.15)]"
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
                        className="h-full flex flex-col items-center justify-center text-center space-y-3"
                      >
                        <CheckCircle2 className="h-12 w-12 text-emerald-400 animate-bounce" />
                        <h3 className="text-base font-bold text-white">Pembayaran Berhasil!</h3>
                        <p className="text-[10px] text-white/50 max-w-xs leading-relaxed">
                          Sistem payment gateway otomatis mendeteksi transaksi Anda. Notifikasi konfirmasi dan resi telah otomatis dikirim ke nomor WhatsApp pembeli.
                        </p>
                        <button
                          onClick={() => setIsPaid(false)}
                          className="px-4 py-2 rounded-full border border-white/10 text-white/60 hover:text-white hover:bg-white/5 text-[9px] font-bold"
                        >
                          Ulangi Simulasi
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
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
              Tantangan Retailer Modern
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Kenapa Tergantung Sepenuhnya pada Marketplace <br />
              <em className="text-[#F8D16A] italic font-normal">Bisa Menghambat Perkembangan Brand Anda?</em>
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
              Keunggulan Toko Online
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Fitur Lengkap Toko Online Mandiri <br />
              <em className="text-[#00FFFF] italic font-normal">yang Memudahkan Transaksi Pembeli</em>
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
              Komparasi Solusi
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Bandingkan Cozybytes E-Commerce <br />
              <em className="text-[#F8D16A] italic font-normal">dengan Marketplace, Shopify, & WooCommerce</em>
            </h2>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-white/8 bg-white/[0.01]">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-white/10 bg-white/[0.02]">
                  <th className="p-5 text-sm font-bold text-white/40">Faktor Evaluasi</th>
                  <th className="p-5 text-sm font-bold text-[#00FFFF]">Cozybytes E-Commerce</th>
                  <th className="p-5 text-sm font-bold text-white/60">Marketplace (Hijau/Oranye)</th>
                  <th className="p-5 text-sm font-bold text-white/60">Shopify (SaaS)</th>
                  <th className="p-5 text-sm font-bold text-white/60">WooCommerce (Wordpress)</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((row, index) => (
                  <tr key={index} className="border-b border-white/5 hover:bg-white/[0.015] transition-all">
                    <td className="p-5 text-sm font-bold text-white/80">{row.aspect}</td>
                    <td className="p-5 text-sm text-[#00FFFF] font-medium bg-[#00FFFF]/5 border-x border-[#00FFFF]/10">{row.cozy}</td>
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

      {/* Tech Stack Grid */}
      <section className="py-20 bg-zinc-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-[#00FFFF]/5 blur-[120px] pointer-events-none" />
        <div className="mx-auto max-w-5xl px-5 md:px-6 relative z-10 text-center">
          <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
            Teknologi yang Digunakan
          </span>
          <h2 className="mb-12 text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
            Kode Sumber Toko yang <em className="text-[#00FFFF] italic font-normal">Aman, Cepat, dan Skalabel</em>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {['Vite.js', 'React.js', 'Tailwind CSS', 'TypeScript', 'Midtrans API', 'RajaOngkir API', 'Node.js', 'Express.js', 'PostgreSQL', 'Supabase Auth', 'Cloudflare', 'Git'].map((tech) => (
              <div 
                key={tech} 
                className="flex flex-col items-center justify-center p-4 rounded-xl border border-white/5 bg-[#0a0a0d] hover:border-[#00FFFF]/20 transition-all"
              >
                <Code className="h-5 w-5 text-[#00FFFF] mb-2" />
                <span className="text-xs font-semibold text-white/80">{tech}</span>
              </div>
            ))}
          </div>
          <div className="mt-8 flex justify-center gap-6 text-xs text-white/40">
            <span>✓ Verifikasi Pembayaran Instan</span>
            <span>✓ Cek Resi Logistik Nasional</span>
            <span>✓ Infrastruktur Serverless Cepat</span>
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section className="py-24 bg-[#09090B] border-t border-white/5">
        <div className="mx-auto max-w-6xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              Tahapan Kerja
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Membangun Toko Online Mandiri Anda <br />
              <em className="text-[#F8D16A] italic font-normal">Hingga Siap Menerima Orderan Pertama</em>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {[
              { step: '01', title: 'Pemetaan Menu', desc: 'Menentukan kategori barang yang dijual, serta integrasi rekening bank penyedia payment gateway.' },
              { step: '02', title: 'Desain Checkout', desc: 'Merancang alur keranjang belanja dan formulir checkout yang ringkas agar pembeli gampang mengisi data diri.' },
              { step: '03', title: 'Penulisan Kode', desc: 'Menulis kode sistem basis data stok barang dan tampilan katalog utama website.' },
              { step: '04', title: 'Uji Coba API', desc: 'Simulasi pengujian pembayaran digital otomatis dan kalkulasi hitung tarif ongkir RajaOngkir.' },
              { step: '05', title: 'Serah Terima', desc: 'Deployment web ke server live, lalu penyerahan dashboard admin dan panduan kelola stok.' }
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

      {/* Custom Feature Configurator Section */}
      <section id="harga" ref={pricingRef} className="py-24 bg-zinc-950 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#00FFFF]/5 blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#F8D16A]/3 blur-[120px] pointer-events-none" />

        <div className="mx-auto max-w-7xl px-5 md:px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mb-16 max-w-3xl text-center"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Desain Biaya Fleksibel
            </span>
            <h2
              className="mb-4 text-3xl sm:text-5xl leading-tight md:text-6xl font-light"
              style={{ fontFamily: '"Instrument Serif", serif' }}
            >
              Harganya Menyesuaikan <br />
              <em className="text-[#00FFFF] italic font-normal">Kebutuhan Spesifik Toko Anda</em>
            </h2>
            <p className="mx-auto max-w-2xl text-sm leading-relaxed text-white/55">
              Kami tidak memaksakan paket kaku. Anda hanya membayar apa yang bisnis Anda butuhkan. 
              Gunakan simulator di bawah untuk merancang fitur toko online Anda dan kirimkan langsung ke WhatsApp kami untuk estimasi biaya.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Left Column: Feature Selection */}
            <div className="lg:col-span-7 space-y-4">
              <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#00FFFF]" />
                1. Pilih Kebutuhan Sistem Anda:
              </h3>
              
              <div className="grid sm:grid-cols-2 gap-3">
                {customFeatures.map((feat) => {
                  const isSelected = selectedFeatures.includes(feat.id)
                  return (
                    <button
                      key={feat.id}
                      onClick={() => toggleFeature(feat.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between h-28 group ${
                        isSelected 
                          ? 'border-[#00FFFF] bg-[#00FFFF]/5 text-white' 
                          : 'border-white/5 bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.02] text-white/60'
                      }`}
                    >
                      <div className="flex justify-between items-start w-full">
                        <span className={`text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded ${
                          isSelected ? 'bg-[#00FFFF]/20 text-[#00FFFF]' : 'bg-white/5 text-white/40'
                        }`}>
                          {feat.group}
                        </span>
                        <div className={`h-4.5 w-4.5 rounded-full border flex items-center justify-center transition-all ${
                          isSelected ? 'border-[#00FFFF] bg-[#00FFFF] text-black' : 'border-white/25'
                        }`}>
                          {isSelected && <Check className="h-3 w-3 stroke-[3]" />}
                        </div>
                      </div>
                      <div>
                        <h4 className={`text-xs font-bold transition-all ${isSelected ? 'text-[#00FFFF]' : 'text-white/80 group-hover:text-white'}`}>
                          {feat.label.replace(' (Gratis 1 Tahun)', '').replace(' Premium', '')}
                        </h4>
                        <p className="text-[10px] text-white/40 leading-normal mt-1 truncate">
                          {feat.desc}
                        </p>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Right Column: Dynamic Price Summary / Estimate Card */}
            <div className="lg:col-span-5">
              <div className="sticky top-24 rounded-2xl border border-white/10 bg-zinc-900/40 backdrop-blur-md p-6 md:p-8 shadow-[0_30px_70px_rgba(0,0,0,0.6)] space-y-6">
                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                  <h3 className="text-base font-bold text-white">Ringkasan Konfigurasi</h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-white/5 text-white/60">
                    {selectedFeatures.length} Fitur Terpilih
                  </span>
                </div>

                <div className="space-y-4">
                  <div>
                    <span className="text-xs text-white/40 block font-semibold mb-1">Skala Sistem & Kompleksitas</span>
                    <span className={`text-sm font-bold block ${getComplexity().color}`}>
                      {getComplexity().label}
                    </span>
                  </div>

                  {/* Complexity gauge bar */}
                  <div className="w-full h-1.5 rounded-full bg-white/5 overflow-hidden">
                    <motion.div 
                      className={`h-full ${getComplexity().barColor}`} 
                      initial={{ width: 0 }}
                      animate={{ width: getComplexity().width }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  <p className="text-xs text-white/50 leading-relaxed">
                    {getComplexity().desc}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/5 space-y-3">
                  <div className="flex justify-between items-end">
                    <div>
                      <span className="text-xs text-white/40 block font-semibold">Estimasi Biaya</span>
                      <span className="text-xs text-[#00FFFF] block mt-0.5">Custom / Menyesuaikan Kebutuhan</span>
                    </div>
                    <span className="text-2xl font-semibold text-white tracking-tight">Hubungi WA</span>
                  </div>
                  
                  <p className="text-[11px] text-white/45 leading-relaxed bg-white/[0.02] p-3 rounded-lg border border-white/5">
                    Halaman admin, payment gateway, dan hitung ongkir otomatis dikonfigurasi khusus tanpa ada biaya tersembunyi.
                  </p>
                </div>

                <motion.a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full h-12 rounded-full bg-[#00FFFF] text-black font-black text-xs flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(0,255,255,0.2)] hover:shadow-[0_0_40px_rgba(0,255,255,0.35)] transition-all cursor-pointer"
                >
                  <MessageCircle className="h-4.5 w-4.5 fill-current" />
                  Kirim Rincian Fitur ke WhatsApp
                  <ArrowUpRight className="h-4 w-4" />
                </motion.a>

                <p className="text-[10px] text-center text-white/30">
                  Konsultasi gratis. Tim developer Cozybytes akan merespon dengan rincian biaya pengerjaan sesuai fitur pilihan Anda.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <section className="py-24 border-t border-white/5 bg-[#09090B]">
        <div className="mx-auto max-w-4xl px-5 md:px-6">
          <div className="mb-16 text-center">
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#F8D16A]">
              FAQ E-Commerce
            </span>
            <h2 className="text-3xl md:text-5xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Jawaban Singkat Seputar <br />
              <em className="text-[#F8D16A] italic font-normal">Pembuatan Toko Online</em>
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
              Mulai Jualan Mandiri
            </span>
            <h2 className="mb-4 text-2xl sm:text-3xl md:text-4xl leading-tight font-light" style={{ fontFamily: '"Instrument Serif", serif' }}>
              Miliki Toko Online Sendiri & Terima Pembayaran <br />
              <em className="text-[#00FFFF] italic font-normal">Otomatis 24 Jam Nonstop Tanpa Ribet</em>
            </h2>
            <p className="mx-auto mb-8 max-w-md text-sm leading-relaxed text-white/50">
              Hubungi tim kami untuk konsultasi alur checkout otomatis yang paling sesuai dengan jenis barang dagangan Anda.
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
              Konsultasi Toko Online Gratis
              <ArrowUpRight className="h-4 w-4" />
            </motion.a>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
