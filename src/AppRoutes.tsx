import { Suspense, lazy, useEffect } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { MotionConfig } from 'framer-motion'
import HomePage from './pages/HomePage'

// HomePage eager (landing utama), sisanya di-split per route supaya bundle awal kecil.
// Saat prerender, react-dom/static menunggu lazy chunk ini selesai sebelum menulis HTML.
const AboutPage = lazy(() => import('./pages/AboutPage'))
const SyaratKetentuanPage = lazy(() => import('./pages/SyaratKetentuanPage'))
const PortfolioPage = lazy(() => import('./pages/PortfolioPage'))
const BlogPage = lazy(() => import('./pages/BlogPage'))
const BlogPostPage = lazy(() => import('./pages/BlogPostPage'))
const WebsitePage = lazy(() => import('./pages/WebsitePage'))
const LandingPageServicePage = lazy(() => import('./pages/LandingPageServicePage'))
const EcommercePage = lazy(() => import('./pages/EcommercePage'))
const UIUXPage = lazy(() => import('./pages/UIUXPage'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

// Placeholder gelap supaya tidak ada flash putih saat chunk route dimuat
function RouteFallback() {
  return <div className="min-h-screen bg-zinc-950" />
}

/**
 * Route tree tanpa router. Client memakainya di dalam BrowserRouter (App.tsx),
 * script prerender memakainya di dalam StaticRouter (entry-server.tsx),
 * jadi daftar route cuma ditulis sekali.
 */
export default function AppRoutes() {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
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
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </MotionConfig>
  )
}
