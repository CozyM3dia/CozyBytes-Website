import { Helmet } from 'react-helmet-async'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import ProcessSection from '../sections/ProcessSection'
import CTASection from '../sections/CTASection'

export default function HomePage() {
  return (
    <div className="bg-zinc-950 min-h-screen">
      <Helmet>
        <title>Cozybytes Media | Jasa Pembuatan Website Profesional & Cepat</title>
        <meta name="description" content="Kami membuat website bisnis dan landing page yang cepat dibuka dan mendatangkan pelanggan. Harga jelas dari awal, mulai Rp 1.499.000, dan kebanyakan proyek selesai dalam hitungan hari." />
        <link rel="canonical" href="https://cozybytes.media/" />
        <meta property="og:title" content="Cozybytes Media | Jasa Pembuatan Website Profesional & Cepat" />
        <meta property="og:description" content="Kami membuat website bisnis dan landing page yang cepat dibuka dan mendatangkan pelanggan. Harga jelas dari awal, mulai Rp 1.499.000." />
        <meta property="og:url" content="https://cozybytes.media/" />
      </Helmet>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ProcessSection />
      <CTASection />
      <Footer />
    </div>
  )
}
