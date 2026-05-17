import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import PricingPage from './pages/PricingPage'
import SyaratKetentuanPage from './pages/SyaratKetentuanPage'
import PortfolioPage from './pages/PortfolioPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/syarat-ketentuan" element={<SyaratKetentuanPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
