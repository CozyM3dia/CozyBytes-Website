import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import ProcessSection from '../sections/ProcessSection'
import CTASection from '../sections/CTASection'

export default function HomePage() {
  return (
    <div className="bg-black min-h-screen">
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
