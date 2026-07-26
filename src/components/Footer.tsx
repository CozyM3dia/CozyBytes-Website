import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail, Phone } from 'lucide-react'
import { CozybytesLogo } from './Logo'
import { motion, AnimatePresence } from 'framer-motion'
import { SERVICES } from '../data/services'

function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

const socialLinks = [
  {
    href: 'https://www.instagram.com/cozybytesmedia/',
    label: 'Instagram',
    Icon: InstagramIcon,
    bg: 'linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)',
  },
  {
    href: 'https://www.tiktok.com/@cozybytesmedia?_r=1&_t=ZS-96czKJHRDMr',
    label: 'TikTok',
    Icon: TikTokIcon,
    bg: 'linear-gradient(135deg, #25F4EE, #FE2C55)',
  },
  {
    href: 'https://linkedin.com/company/cozybytes-media',
    label: 'LinkedIn',
    Icon: LinkedInIcon,
    bg: 'linear-gradient(135deg, #0077b5, #00a0dc)',
  },
]

const faqs = [
  {
    question: 'Apa itu Cozybytes Media?',
    answer:
      'Cozybytes Media adalah digital agency yang berfokus pada pembuatan website, aplikasi, dan desain UI/UX untuk membantu bisnis Anda berkembang dan tampil profesional di era digital.',
  },
  {
    question: 'Berapa lama waktu pengerjaan sebuah website?',
    answer:
      'Waktu pengerjaan bervariasi tergantung pada kompleksitas fitur. Untuk Landing Page atau Company Profile, umumnya memakan waktu 3-7 hari kerja. Sedangkan untuk Toko Online atau Sistem Kustom, dapat memakan waktu 2-4 minggu.',
  },
  {
    question: 'Apakah saya akan mendapatkan dukungan setelah website selesai?',
    answer:
      'Tentu. Kami memberikan masa dukungan teknis (maintenance) gratis selama 1 bulan setelah peluncuran untuk memastikan website Anda berjalan lancar. Kami juga menyediakan paket maintenance lanjutan jika Anda membutuhkannya.',
  },
  {
    question: 'Bagaimana sistem pembayarannya?',
    answer:
      'Kami menerapkan sistem pembayaran Down Payment (DP) sebesar 50% di awal sebelum pengerjaan dimulai, dan pelunasan sisa 50% setelah proyek selesai dan siap untuk di-publish atau diserahkan kepada Anda.',
  },
]

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className="border-b border-white/10 py-4">
      <button
        className="flex w-full items-center justify-between text-left text-white/90 hover:text-white transition-colors"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium text-sm md:text-base">{question}</span>
        <span className="text-[#00FFFF] text-xl ml-4">
          {isOpen ? '-' : '+'}
        </span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="mt-4 text-sm text-white/50 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function FooterLink({
  to,
  children,
}: {
  to: string
  children: React.ReactNode
}) {
  const location = useLocation()
  const navigate = useNavigate()

  const handleClick = (e: React.MouseEvent) => {
    if (to.startsWith('/#')) {
      e.preventDefault()
      const id = to.slice(2)
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      } else {
        navigate('/')
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
        }, 400)
      }
    }
  }

  return (
    <Link
      to={to}
      onClick={handleClick}
      className="text-white/50 hover:text-white text-sm transition-colors"
    >
      {children}
    </Link>
  )
}

const footerLinks = [
  { label: 'Beranda', to: '/#beranda' },
  { label: 'Layanan', to: '/layanan' },
  { label: 'Tentang Kami', to: '/about' },
  { label: 'Portofolio', to: '/portfolio' },
  { label: 'Blog', to: '/blog' },
  { label: 'S&K', to: '/syarat-ketentuan' },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-6 py-14">
        {/* FAQ Section */}
        <div className="mb-20 max-w-3xl">
          <h2 className="font-display text-2xl font-medium tracking-tight text-white mb-6">
            Pertanyaan yang sering diajukan.
          </h2>
          <div className="flex flex-col">
            {faqs.map((faq, idx) => (
              <FAQItem
                key={idx}
                question={faq.question}
                answer={faq.answer}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Brand + Social */}
          <div>
            <div className="mb-4">
              <CozybytesLogo size="sm" />
            </div>
            <p className="text-white/50 text-sm leading-relaxed mb-6">
              Cepat. Nyaman. Solusi Web untuk Bisnismu.
            </p>

            {/* Social icons row */}
            <div className="flex items-center gap-3">
              {socialLinks.map(({ href, label, Icon, bg }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="group"
                >
                  <div
                    className="rounded-lg p-2.5 text-white transition-all duration-200 group-hover:scale-110 group-hover:shadow-lg"
                    style={{ background: bg }}
                  >
                    <Icon />
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Layanan — link statis ke tiap halaman layanan.
              Ini satu-satunya tempat link /layanan/* muncul di HTML hasil prerender:
              dropdown di Navbar hanya ter-mount saat di-hover, jadi crawler tanpa JS
              tidak pernah melihatnya dan halaman layanan jadi yatim di link graph. */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Layanan</h3>
            <ul className="flex flex-col gap-2">
              {SERVICES.map((svc) => (
                <li key={svc.href}>
                  <FooterLink to={svc.href}>{svc.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Tautan</h3>
            <ul className="flex flex-col gap-2">
              {footerLinks.map(({ label, to }) => (
                <li key={label}>
                  <FooterLink to={to}>{label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold text-sm mb-4">Kontak</h3>
            <ul className="flex flex-col gap-3">
              <li>
                <a
                  href="mailto:cozybytesmedia@gmail.com"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <Mail className="w-4 h-4 flex-shrink-0" />
                  cozybytesmedia@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6285894514719"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-white/50 hover:text-white text-sm transition-colors"
                >
                  <Phone className="w-4 h-4 flex-shrink-0" />
                  +62 858-9451-4719
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 text-center">
          <p className="text-white/30 text-xs">
            &copy; {new Date().getFullYear()} Cozybytes Media. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
