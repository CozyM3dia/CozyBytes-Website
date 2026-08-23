import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { GridField } from '../components/atmosphere'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Helmet>
        <title>404 — Halaman Tidak Ditemukan | Cozybytes Media</title>
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="relative overflow-hidden flex-1 flex flex-col items-center justify-center px-6 py-32 text-center">
        <GridField variant="graph" mask="radial-gradient(ellipse 70% 70% at 50% 45%, black 0%, transparent 78%)" className="opacity-70" />
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22,1,0.36,1] }} className="relative z-10">
          <span className="inline-block rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-mono text-white/50">404</span>
          <h1 className="font-display mt-6 text-5xl md:text-6xl font-medium tracking-tight text-white">Halaman tidak ditemukan</h1>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-white/50">URL yang kamu buka tidak ada atau sudah dipindahkan. Cek kembali alamatnya atau kembali ke beranda.</p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link to="/" className="btn-primary text-sm">Kembali ke Beranda</Link>
            <a href="https://wa.me/6285894514719" target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.02] px-6 py-3 text-sm font-semibold text-white/80 hover:bg-white/10">Hubungi via WhatsApp</a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
