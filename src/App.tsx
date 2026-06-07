import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'
import AboutPage from './pages/AboutPage'
import SyaratKetentuanPage from './pages/SyaratKetentuanPage'
import PortfolioPage from './pages/PortfolioPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import WebsitePage from './pages/WebsitePage'
import LandingPageServicePage from './pages/LandingPageServicePage'
import EcommercePage from './pages/EcommercePage'
import UIUXPage from './pages/UIUXPage'

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
          <Route path="/syarat-ketentuan" element={<SyaratKetentuanPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/layanan/website" element={<WebsitePage />} />
          <Route path="/layanan/landing-page" element={<LandingPageServicePage />} />
          <Route path="/layanan/ecommerce" element={<EcommercePage />} />
          <Route path="/layanan/uiux" element={<UIUXPage />} />
        </Routes>
      </BrowserRouter>
    </MotionConfig>
  )
}

export default App
