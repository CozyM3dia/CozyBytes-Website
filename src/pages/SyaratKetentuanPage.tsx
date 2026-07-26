import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const sections = [
  {
    title: 'Lingkup Layanan',
    body: 'Cozybytes Media menyediakan jasa pembuatan website, landing page, company profile, toko online, dan solusi digital lainnya sesuai dengan paket atau kesepakatan yang telah disetujui bersama. Setiap fitur atau halaman di luar lingkup yang disepakati akan dikenakan biaya tambahan.',
  },
  {
    title: 'Harga & Sistem Pembayaran',
    body: 'Seluruh harga yang tercantum bersifat estimasi dan dapat berubah berdasarkan kompleksitas proyek. Pembayaran dilakukan dengan sistem Down Payment (DP) sebesar 50% sebelum pengerjaan dimulai, dan pelunasan 50% sisanya setelah proyek selesai dan siap diserahkan. Cozybytes Media tidak bertanggung jawab atas keterlambatan pengerjaan yang disebabkan oleh belum terpenuhinya kewajiban pembayaran dari klien.',
  },
  {
    title: 'Revisi & Perubahan Scope',
    body: 'Jumlah revisi yang diperbolehkan telah tercantum pada masing-masing paket layanan. Revisi yang melebihi batas atau yang mengubah konsep desain secara mendasar akan dianggap sebagai permintaan baru dan dikenakan biaya tersendiri. Perubahan scope di tengah pengerjaan harus dikomunikasikan secara tertulis dan disetujui oleh kedua belah pihak sebelum dilaksanakan.',
  },
  {
    title: 'Hak Kekayaan Intelektual',
    body: 'Setelah pelunasan penuh diterima, seluruh hak atas desain dan kode yang dibuat untuk proyek klien berpindah kepada klien. Cozybytes Media berhak mencantumkan proyek tersebut dalam portofolio kami sebagai referensi, kecuali klien secara tertulis meminta kerahasiaan. Aset pihak ketiga (font, ikon, gambar berlisensi) tetap tunduk pada lisensi masing-masing penyedia.',
  },
  {
    title: 'Kerahasiaan',
    body: 'Cozybytes Media berkomitmen untuk menjaga kerahasiaan seluruh informasi bisnis, data, dan materi yang diberikan oleh klien selama proses pengerjaan proyek. Informasi tersebut tidak akan dibagikan kepada pihak ketiga tanpa persetujuan tertulis dari klien.',
  },
  {
    title: 'Timeline & Keterlambatan',
    body: 'Estimasi waktu pengerjaan yang diberikan merupakan perkiraan berdasarkan kondisi normal. Keterlambatan pengiriman konten, aset, atau keputusan dari pihak klien dapat memengaruhi timeline secara langsung. Cozybytes Media akan segera mengkomunikasikan apabila terjadi perubahan jadwal yang signifikan.',
  },
  {
    title: 'Penghentian Kontrak',
    body: 'Apabila klien memutuskan untuk membatalkan proyek di tengah pengerjaan, DP yang telah dibayarkan tidak dapat dikembalikan. Jika pembatalan dilakukan oleh Cozybytes Media tanpa alasan yang dapat dipertanggungjawabkan, DP akan dikembalikan secara penuh kepada klien.',
  },
  {
    title: 'Batasan Tanggung Jawab',
    body: 'Cozybytes Media tidak bertanggung jawab atas kerugian bisnis tidak langsung yang timbul dari penggunaan atau ketidakmampuan menggunakan layanan kami. Tanggung jawab kami terbatas pada nilai proyek yang telah disepakati. Klien bertanggung jawab atas keabsahan konten, merek dagang, dan materi yang diberikan kepada kami untuk digunakan dalam proyek.',
  },
  {
    title: 'Perubahan Syarat & Ketentuan',
    body: 'Cozybytes Media berhak memperbarui Syarat & Ketentuan ini sewaktu-waktu. Perubahan akan diinformasikan melalui website atau saluran komunikasi resmi kami. Penggunaan layanan setelah adanya perubahan dianggap sebagai penerimaan atas syarat yang diperbarui.',
  },
]

export default function SyaratKetentuanPage() {
  const navigate = useNavigate()

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  return (
    <AnimatePresence>
      <Helmet>
        <title>Syarat & Ketentuan | Cozybytes Media</title>
        <meta name="description" content="Syarat dan ketentuan layanan Cozybytes Media: lingkup layanan, sistem pembayaran, revisi, hak kekayaan intelektual, dan kebijakan lainnya." />
        <link rel="canonical" href="https://cozybytes.media/syarat-ketentuan" />
        <meta property="og:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <motion.div
        key="sk-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8"
        style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
        onClick={() => navigate(-1)}
      >
        <motion.div
          initial={{ opacity: 0, y: 32, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 32, scale: 0.97 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full max-w-2xl max-h-[85vh] flex flex-col rounded-2xl overflow-hidden"
          style={{
            background: 'rgba(10,10,14,0.95)',
            border: '1px solid rgba(255,255,255,0.1)',
            boxShadow: '0 0 60px rgba(0,255,255,0.08), 0 32px 64px rgba(0,0,0,0.6)',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-7 py-5 flex-shrink-0"
            style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div>
              <h2
                className="text-xl font-bold text-white"
                style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
              >
                Syarat &amp; Ketentuan
              </h2>
              <p className="text-xs text-white/40 mt-0.5">Cozybytes Media · Berlaku per 2025</p>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/50 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Tutup"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Scrollable content */}
          <div className="overflow-y-auto flex-1 px-7 py-6 flex flex-col gap-7 scrollbar-thin">
            {sections.map((sec) => (
              <div key={sec.title}>
                <h3 className="text-sm font-bold text-white mb-2">{sec.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed">{sec.body}</p>
              </div>
            ))}

            <div className="pt-2 pb-1">
              <p className="text-xs text-white/30 leading-relaxed">
                Dengan menggunakan layanan Cozybytes Media, Anda dianggap telah membaca, memahami, dan menyetujui seluruh Syarat &amp; Ketentuan di atas. Untuk pertanyaan lebih lanjut, hubungi kami melalui{' '}
                <a
                  href="https://wa.me/6285894514719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#00FFFF] hover:underline"
                >
                  WhatsApp
                </a>
                {' '}atau email ke{' '}
                <a href="mailto:cozybytesmedia@gmail.com" className="text-[#00FFFF] hover:underline">
                  cozybytesmedia@gmail.com
                </a>
                .
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
