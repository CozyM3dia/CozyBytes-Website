import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { CozybytesLogo } from './Logo'

const links = [
  { label: 'Beranda', href: '/#beranda' },
  { label: 'Layanan', href: '/#layanan' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
]

function NavLink({ href, label }: { href: string; label: string }) {
  const loc = useLocation()
  const nav = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    if (href.startsWith('/#')) {
      e.preventDefault()
      const id = href.slice(2)
      if (loc.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        nav('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
      }
    }
  }

  return (
    <div className="relative group">
      <Link
        to={href}
        onClick={handleClick}
        className="relative text-white/70 hover:text-white text-sm transition-colors py-1 flex"
      >
        <span className="relative z-10 flex">
          {label.split('').map((char, i) => (
            <span
              key={i}
              className="inline-block whitespace-pre wave-char"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {char}
            </span>
          ))}
        </span>
        {/* Normal Underline */}
        <div 
          className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#00FFFF] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" 
        />
      </Link>
    </div>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        initial={{ opacity: 0, y: -20, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`w-full max-w-5xl rounded-full transition-all duration-300 ${
          scrolled ? 'liquid-glass' : 'bg-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <CozybytesLogo size="sm" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <NavLink key={l.label} href={l.href} label={l.label} />
            ))}
          </div>

          {/* CTA */}
          <div className="hidden md:block">
            <a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary text-sm py-2 px-5"
            >
              Konsultasi Gratis
            </a>
          </div>

          {/* Hamburger */}
          <button
            className="md:hidden p-2 text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <div className="w-5 flex flex-col gap-1">
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 bg-white transition-all ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </div>
          </button>
        </div>

      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(8px)' }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-[72px] z-40 bg-zinc-950/80 backdrop-blur-sm" 
            onClick={() => setMenuOpen(false)}
          >
            <div
            className="bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl mx-4 mt-2 px-5 py-5 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {links.map((l) => {
              const handleMobileClick = (e: React.MouseEvent) => {
                if (l.href.startsWith('/#')) {
                  e.preventDefault()
                  setMenuOpen(false)
                  const id = l.href.slice(2)
                  if (window.location.pathname === '/') {
                    setTimeout(() => {
                      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
                    }, 100)
                  } else {
                    window.location.href = l.href
                  }
                } else {
                  setTimeout(() => setMenuOpen(false), 150)
                }
              }
              return (
                <Link
                  key={l.label}
                  to={l.href}
                  onClick={handleMobileClick}
                  className="text-white/80 hover:text-white text-sm py-2.5 border-b border-white/5 last:border-0"
                >
                  {l.label}
                </Link>
              )
            })}
            <a
              href="https://wa.me/6285894514719"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="btn-primary text-sm text-center justify-center mt-3"
            >
              Konsultasi Gratis
            </a>
          </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
