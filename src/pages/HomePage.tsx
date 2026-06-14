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
        <title>Jasa Pembuatan Website Profesional, Cepat & Anti Ribet | Cozybytes Media</title>
        <meta name="description" content="Website yang bikin calon pelanggan langsung percaya. Kami bangun cepat, rapi, dan mudah ditemukan di Google. Harga jelas dari awal mulai Rp 1.499.000, kebanyakan selesai dalam hitungan hari." />
        <link rel="canonical" href="https://cozybytes.media/" />
        <meta property="og:title" content="Jasa Pembuatan Website Profesional, Cepat & Anti Ribet | Cozybytes Media" />
        <meta property="og:description" content="Website yang bikin calon pelanggan langsung percaya. Kami bangun cepat, rapi, dan mudah ditemukan di Google. Harga jelas dari awal mulai Rp 1.499.000." />
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
