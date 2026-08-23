import { useEffect, useState, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { CozybytesLogo } from './Logo'
import { SERVICES as serviceLinks } from '../data/services'

const links = [
  { label: 'Beranda', href: '/#beranda' },
  { label: 'Tentang Kami', href: '/about' },
  { label: 'Blog', href: '/blog' },
  { label: 'Cara Kerja', href: '/#cara-kerja' },
]

function ServicesDropdown() {
  const [open, setOpen] = useState(false)
  const closeTimeout = useRef<number | null>(null)

  const handleEnter = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current)
    setOpen(true)
  }
  const handleLeave = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current)
    closeTimeout.current = window.setTimeout(() => setOpen(false), 120) as unknown as number
  }

  return (
    <div
      className="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onFocusCapture={handleEnter}
      onBlurCapture={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) handleLeave()
      }}
      onKeyDown={(e) => { if (e.key === 'Escape') setOpen(false) }}
    >
      {/* Link sungguhan ke hub, bukan <button>. Isi dropdown hanya ter-mount saat
           di-hover, jadi ini satu-satunya jalur ke /layanan yang terlihat crawler. */}
      <Link
        to="/layanan"
        onClick={() => setOpen(false)}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="Layanan - buka submenu"
        className="relative text-white/70 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-full text-sm transition-colors py-1 flex items-center gap-1"
      >
        <span className="flex" aria-hidden="true">
          {'Layanan'.split('').map((char, i) => (
            <span key={i} className="inline-block whitespace-pre wave-char" style={{ animationDelay: `${i * 0.05}s` }}>
              {char}
            </span>
          ))}
        </span>
        <ChevronDown aria-hidden="true" className={`h-3.5 w-3.5 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        <span className="sr-only">Layanan</span>
        <div className={`absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#00FFFF] origin-left transition-transform duration-300 ease-out ${open ? 'scale-x-100' : 'scale-x-0'}`} />
      </Link>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="absolute top-full left-0 pt-4 w-60 z-50"
            role="menu"
            aria-label="Submenu layanan"
          >
            <div className="bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl p-2 shadow-[0_16px_48px_rgba(0,0,0,0.5)]">
              {serviceLinks.map((svc) => (
                <Link
                  key={svc.href}
                  to={svc.href}
                  role="menuitem"
                  onClick={() => setOpen(false)}
                  className="flex flex-col px-3 py-2.5 rounded-xl hover:bg-white/5 focus-visible:bg-white/10 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#00FFFF]/40 transition-colors group/item"
                >
                  <span className="text-white text-sm font-medium group-hover/item:text-[#00FFFF] transition-colors">{svc.label}</span>
                  <span className="text-white/35 text-xs mt-0.5">{svc.desc}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function NavLink({ href, label }: { href: string; label: string }) {
  const loc = useLocation()
  const nav = useNavigate()
  const isActive = loc.pathname === href || (href !== '/#beranda' && loc.pathname.startsWith(href))

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
        aria-current={isActive ? 'page' : undefined}
        className="relative text-white/70 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF] focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded-full text-sm transition-colors py-1 flex"
      >
        <span className="relative z-10 flex" aria-hidden="true">
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
        <span className="sr-only">{label}</span>
        {/* Normal Underline */}
        <div 
          className="absolute left-0 right-0 -bottom-1 h-[1.5px] bg-[#00FFFF] origin-left scale-x-0 group-hover:scale-x-100 group-focus-within:scale-x-100 transition-transform duration-300 ease-out" 
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
    window.addEventListener('scroll', handler, { passive: true })
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

  // Close mobile menu on Escape
  useEffect(() => {
    if (!menuOpen) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setMenuOpen(false) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [menuOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4">
      <motion.nav
        aria-label="Navigasi utama"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className={`w-full max-w-5xl rounded-full transition-all duration-300 ${
          scrolled ? 'bg-zinc-950/30 backdrop-blur-md border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.2)]' : 'bg-transparent border border-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-4 py-3">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF] rounded-full" aria-label="Cozybytes Media - Beranda">
            <CozybytesLogo size="sm" />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="/#beranda" label="Beranda" />
            <ServicesDropdown />
            {links.slice(1).map((l) => (
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
            className="md:hidden p-2 text-white rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00FFFF]"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="w-5 flex flex-col gap-1" aria-hidden="true">
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
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu navigasi"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="md:hidden fixed inset-0 top-[72px] z-40 bg-zinc-950/80 backdrop-blur-sm" 
            onClick={() => setMenuOpen(false)}
          >
            <div
            className="bg-zinc-950/95 backdrop-blur-xl border border-white/10 rounded-2xl mx-4 mt-2 px-5 py-5 flex flex-col gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Beranda */}
            <Link
              to="/#beranda"
              onClick={(e) => {
                e.preventDefault()
                setMenuOpen(false)
                if (window.location.pathname === '/') {
                  setTimeout(() => document.getElementById('beranda')?.scrollIntoView({ behavior: 'smooth' }), 100)
                } else {
                  window.location.href = '/#beranda'
                }
              }}
              className="text-white/80 hover:text-white text-sm py-2.5 border-b border-white/5"
            >
              Beranda
            </Link>

            {/* Layanan sub-items */}
            <div className="border-b border-white/5">
              <Link
                to="/layanan"
                onClick={() => setTimeout(() => setMenuOpen(false), 150)}
                className="block pt-2.5 pb-1.5 text-xs font-semibold uppercase tracking-widest text-white/40 hover:text-white/70"
              >
                Layanan
              </Link>
              {serviceLinks.map((svc) => (
                <Link
                  key={svc.href}
                  to={svc.href}
                  onClick={() => setTimeout(() => setMenuOpen(false), 150)}
                  className="flex items-center gap-2 text-white/70 hover:text-white text-sm py-2 pl-2"
                >
                  <span className="h-1 w-1 rounded-full bg-[#00FFFF]/60 flex-shrink-0" />
                  {svc.label}
                </Link>
              ))}
            </div>

            {links.slice(1).map((l) => {
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
