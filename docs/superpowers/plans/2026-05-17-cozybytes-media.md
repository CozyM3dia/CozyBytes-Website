# Cozybytes Media Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a multi-page landing site for Cozybytes Media (Indonesian web agency) with dark liquid glass aesthetic, 3 routes (/, /pricing, /portfolio), and WhatsApp CTA.

**Architecture:** Vite + React Router SPA. Shared Navbar/Footer components wrap 3 page components. Home page delegates to 6 section sub-components. Framer Motion handles all scroll animations with `useInView`.

**Tech Stack:** React 18, TypeScript, Vite, Tailwind CSS v3, framer-motion, lucide-react, react-router-dom v6

---

## File Map

| File | Responsibility |
|------|---------------|
| `package.json` | Dependencies |
| `vite.config.ts` | Vite config |
| `tailwind.config.ts` | Custom colors + font |
| `src/index.css` | Google Fonts import, `@layer components` liquid-glass, base styles |
| `src/main.tsx` | ReactDOM render + BrowserRouter |
| `src/App.tsx` | Routes: `/`, `/pricing`, `/portfolio` |
| `src/components/Navbar.tsx` | Sticky glass pill navbar, scroll effect, React Router Links |
| `src/components/Footer.tsx` | 3-col footer, brand, links, contact |
| `src/sections/HeroSection.tsx` | Full-viewport hero, gradient bg, device mockup, feature bar |
| `src/sections/AboutSection.tsx` | Large serif heading, stats, useInView |
| `src/sections/ServicesSection.tsx` | 3 liquid glass service cards |
| `src/sections/PortfolioPreview.tsx` | 2x2 portfolio preview grid |
| `src/sections/ProcessSection.tsx` | 4-step cara kerja grid |
| `src/sections/CTASection.tsx` | WhatsApp CTA |
| `src/pages/HomePage.tsx` | Assembles all sections |
| `src/pages/PricingPage.tsx` | 3-tier pricing cards |
| `src/pages/PortfolioPage.tsx` | Full 3-col portfolio grid |

---

## Task 1: Project Scaffold

**Files:**
- Create: `package.json`
- Create: `vite.config.ts`
- Create: `tailwind.config.ts`
- Create: `src/index.css`
- Create: `index.html`

- [ ] **Step 1: Scaffold Vite project**

```bash
cd C:/Users/Sibgha
npm create vite@latest cozybytes-media -- --template react-ts
cd cozybytes-media
npm install
```

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom framer-motion lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p --ts
```

- [ ] **Step 3: Configure `tailwind.config.ts`**

Replace content with:
```ts
import type { Config } from 'tailwindcss'

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cyan: '#00FFFF',
        'primary-dark': '#0D1B3D',
        'secondary-dark': '#1E2A78',
      },
      fontFamily: {
        serif: ['"Instrument Serif"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
} satisfies Config
```

- [ ] **Step 4: Write `src/index.css`**

```css
@import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  html { scroll-behavior: smooth; }
  body { @apply bg-black text-white font-sans; }
}

@layer components {
  .liquid-glass {
    background: rgba(255, 255, 255, 0.01);
    background-blend-mode: luminosity;
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    border: none;
    box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.1);
    position: relative;
    overflow: hidden;
  }
  .liquid-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.45) 0%,
      rgba(255, 255, 255, 0.15) 20%,
      rgba(255, 255, 255, 0) 40%,
      rgba(255, 255, 255, 0) 60%,
      rgba(255, 255, 255, 0.15) 80%,
      rgba(255, 255, 255, 0.45) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
  .cyan-glass {
    background: rgba(0, 255, 255, 0.03);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    box-shadow: inset 0 1px 1px rgba(0, 255, 255, 0.15);
    position: relative;
    overflow: hidden;
  }
  .cyan-glass::before {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: inherit;
    padding: 1.4px;
    background: linear-gradient(
      180deg,
      rgba(0, 255, 255, 0.4) 0%,
      rgba(0, 255, 255, 0.1) 20%,
      rgba(0, 255, 255, 0) 40%,
      rgba(0, 255, 255, 0) 60%,
      rgba(0, 255, 255, 0.1) 80%,
      rgba(0, 255, 255, 0.4) 100%
    );
    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
    -webkit-mask-composite: xor;
    mask-composite: exclude;
    pointer-events: none;
  }
}
```

- [ ] **Step 5: Verify dev server starts**

```bash
npm run dev
```
Expected: Vite dev server at http://localhost:5173 with default React page.

- [ ] **Step 6: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold Vite + React + Tailwind + framer-motion"
```

---

## Task 2: Router + App Shell

**Files:**
- Modify: `src/main.tsx`
- Create: `src/App.tsx`
- Create: `src/pages/HomePage.tsx` (stub)
- Create: `src/pages/PricingPage.tsx` (stub)
- Create: `src/pages/PortfolioPage.tsx` (stub)

- [ ] **Step 1: Write `src/main.tsx`**

```tsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>
)
```

- [ ] **Step 2: Write `src/App.tsx`**

```tsx
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PricingPage from './pages/PricingPage'
import PortfolioPage from './pages/PortfolioPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<PricingPage />} />
      <Route path="/portfolio" element={<PortfolioPage />} />
    </Routes>
  )
}
```

- [ ] **Step 3: Write stub pages**

`src/pages/HomePage.tsx`:
```tsx
export default function HomePage() {
  return <div className="min-h-screen bg-black text-white p-8">Home</div>
}
```

`src/pages/PricingPage.tsx`:
```tsx
export default function PricingPage() {
  return <div className="min-h-screen bg-black text-white p-8">Pricing</div>
}
```

`src/pages/PortfolioPage.tsx`:
```tsx
export default function PortfolioPage() {
  return <div className="min-h-screen bg-black text-white p-8">Portfolio</div>
}
```

- [ ] **Step 4: Verify routes render**

Open http://localhost:5173, http://localhost:5173/pricing, http://localhost:5173/portfolio — each shows its label text.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: add router and stub pages"
```

---

## Task 3: Navbar Component

**Files:**
- Create: `src/components/Navbar.tsx`

- [ ] **Step 1: Write `src/components/Navbar.tsx`**

```tsx
import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div
        className={`max-w-5xl mx-auto rounded-full px-6 py-3 flex items-center justify-between transition-all duration-300 liquid-glass ${
          scrolled ? 'bg-white/5' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#00FFFF] flex items-center justify-center font-bold text-black text-sm">
            C
          </div>
          <span className="font-bold text-white text-[15px]">
            Cozybytes{' '}
            <span className="text-[#00FFFF] text-[9px] font-semibold tracking-[2px]">
              MEDIA
            </span>
          </span>
          {/* Nav links */}
          <div className="hidden md:flex items-center gap-6 ml-8">
            {[
              { label: 'Beranda', to: '/', hash: '#hero' },
              { label: 'Layanan', to: '/', hash: '#layanan' },
              { label: 'Cara Kerja', to: '/', hash: '#cara-kerja' },
            ].map((link) => (
              <a
                key={link.label}
                href={pathname === '/' ? link.hash : `/${link.hash}`}
                className="text-white/80 hover:text-[#00FFFF] text-sm font-medium transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/portfolio"
              className="text-white/80 hover:text-[#00FFFF] text-sm font-medium transition-colors"
            >
              Portofolio
            </Link>
            <Link
              to="/pricing"
              className="text-[#00FFFF] text-sm font-medium"
            >
              Pricing
            </Link>
          </div>
        </div>

        {/* CTA */}
        <Link
          to="/#konsultasi"
          className="bg-[#00FFFF] text-black font-bold text-sm px-5 py-2 rounded-full hover:shadow-[0_0_20px_rgba(0,255,255,0.4)] transition-shadow"
        >
          Konsultasi Gratis
        </Link>
      </div>
    </nav>
  )
}
```

- [ ] **Step 2: Add Navbar to `src/pages/HomePage.tsx`**

```tsx
import Navbar from '../components/Navbar'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <div className="p-8 pt-24">Home content coming</div>
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Open http://localhost:5173 — navbar pill visible at top, changes opacity on scroll.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: add sticky liquid glass navbar"
```

---

## Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.tsx`

- [ ] **Step 1: Write `src/components/Footer.tsx`**

```tsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-white/5 pt-12 pb-6 px-6">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <div className="font-bold text-[15px] mb-2">
              Cozybytes <span className="text-[#00FFFF]">Media</span>
            </div>
            <p className="text-white/40 text-xs leading-relaxed">
              Cepat. Nyaman. Solusi Web untuk Bisnismu.<br />
              Agensi web development fokus klien Indonesia.
            </p>
          </div>
          {/* Links */}
          <div>
            <h4 className="text-[#00FFFF] text-[10px] font-bold tracking-[2px] uppercase mb-4">Tautan</h4>
            <ul className="space-y-2">
              {[
                { label: 'Beranda', to: '/' },
                { label: 'Layanan', to: '/#layanan' },
                { label: 'Portofolio', to: '/portfolio' },
                { label: 'Pricing', to: '/pricing' },
                { label: 'Syarat & Ketentuan', to: '/syarat' },
              ].map((l) => (
                <li key={l.label}>
                  <Link to={l.to} className="text-white/40 hover:text-[#00FFFF] text-xs transition-colors">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h4 className="text-[#00FFFF] text-[10px] font-bold tracking-[2px] uppercase mb-4">Kontak</h4>
            <ul className="space-y-2 text-xs text-white/40">
              <li>hello@cozybytes.id</li>
              <li>+62 812-3456-7890</li>
              <li className="flex gap-3 mt-2">
                <a href="#" className="hover:text-[#00FFFF] transition-colors">Instagram</a>
                <a href="#" className="hover:text-[#00FFFF] transition-colors">LinkedIn</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-4 text-center text-[11px] text-white/30">
          © 2026 Cozybytes Media. Dibuat dengan nyaman di Indonesia.
        </div>
      </div>
    </footer>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add .
git commit -m "feat: add footer component"
```

---

## Task 5: HeroSection

**Files:**
- Create: `src/sections/HeroSection.tsx`

- [ ] **Step 1: Write `src/sections/HeroSection.tsx`**

```tsx
import { motion } from 'framer-motion'
import { ArrowRight, Zap, Smile, Monitor, MapPin } from 'lucide-react'

const features = [
  { icon: Zap, label: 'Super Cepat' },
  { icon: Smile, label: 'Proses Nyaman' },
  { icon: Monitor, label: 'Responsif & Modern' },
  { icon: MapPin, label: 'Fokus Lokal' },
]

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 pb-12 pt-28 overflow-hidden"
    >
      {/* Gradient bg */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_35%,rgba(0,255,255,0.08)_0%,transparent_65%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_20%_70%,rgba(30,42,120,0.18)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_80%_20%,rgba(0,255,255,0.05)_0%,transparent_50%)]" />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-2xl"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Badge */}
        <div className="inline-block liquid-glass rounded-full px-5 py-2 text-[#00FFFF] text-xs font-semibold mb-8">
          ⚡ Cepat. Nyaman. Solusi Web untuk Bisnismu.
        </div>

        {/* Heading */}
        <h1 className="font-serif text-6xl md:text-7xl lg:text-8xl font-normal leading-[1.08] tracking-tight mb-5">
          Bikin Website{' '}
          <em className="italic text-[#00FFFF]">Cepat</em>,<br />
          Bisnis Makin{' '}
          <em className="italic text-[#00FFFF]">Melesat</em>.
        </h1>

        {/* Sub */}
        <p className="text-white/60 text-base leading-relaxed max-w-lg mx-auto mb-8">
          Dari ide hingga online dalam hitungan hari. Cozybytes Media hadir memberikan solusi web development yang cepat, desain estetik, dan proses yang super nyaman.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
          <a
            href="https://wa.me/6281234567890"
            target="_blank"
            rel="noreferrer"
            className="bg-[#00FFFF] text-black font-bold text-sm px-8 py-4 rounded-full hover:shadow-[0_0_30px_rgba(0,255,255,0.3)] transition-shadow"
          >
            Mulai Projekmu Sekarang
          </a>
          <a
            href="/portfolio"
            className="liquid-glass rounded-full px-8 py-4 text-white text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Lihat Portofolio
          </a>
        </div>
      </motion.div>

      {/* Device mockup */}
      <motion.div
        className="relative z-10 flex items-end justify-center gap-0 mb-12"
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.2 }}
      >
        {/* Laptop */}
        <div className="flex flex-col items-center">
          <div className="w-72 h-44 rounded-xl border border-[#00FFFF]/20 bg-gradient-to-br from-[#00FFFF]/04 to-[#1E2A78]/15 overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
            <div className="flex-1 p-3 flex flex-col gap-2">
              <div className="h-1.5 w-2/5 rounded bg-[#00FFFF]/35" />
              <div className="h-1.5 w-4/5 rounded bg-[#00FFFF]/15" />
              <div className="h-1.5 w-3/5 rounded bg-white/10" />
              <div className="mt-1 h-10 rounded-md bg-white/4 border border-white/6" />
              <div className="grid grid-cols-2 gap-1.5 mt-1">
                <div className="h-6 rounded bg-[#00FFFF]/08" />
                <div className="h-6 rounded bg-white/4" />
              </div>
            </div>
            <div className="h-4 bg-[#00FFFF]/06 border-t border-[#00FFFF]/10" />
          </div>
          <div className="w-80 h-2.5 rounded-b bg-[#00FFFF]/08 border border-t-0 border-[#00FFFF]/15" />
        </div>
        {/* Phone */}
        <div className="-ml-5 mb-0 w-20 h-36 rounded-2xl border border-[#00FFFF]/20 bg-gradient-to-br from-[#00FFFF]/05 to-[#1E2A78]/15 shadow-[0_10px_30px_rgba(0,0,0,0.4)] p-2 flex flex-col gap-1.5">
          <div className="h-1 w-3/4 rounded bg-[#00FFFF]/4" />
          <div className="h-1 w-full rounded bg-white/10" />
          <div className="flex-1 rounded bg-white/4" />
          <div className="h-1 w-3/5 rounded bg-[#00FFFF]/35" />
        </div>
      </motion.div>

      {/* Feature bar */}
      <motion.div
        className="relative z-10 flex flex-wrap justify-center gap-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        {features.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-2 text-white/40 text-xs">
            <div className="cyan-glass w-7 h-7 rounded-lg flex items-center justify-center">
              <Icon size={13} className="text-[#00FFFF]" />
            </div>
            {label}
          </div>
        ))}
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Mount in `src/pages/HomePage.tsx`**

```tsx
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
    </div>
  )
}
```

- [ ] **Step 3: Verify**

Open http://localhost:5173 — hero with gradient bg, Instrument Serif heading, device mockups, feature bar.

- [ ] **Step 4: Commit**

```bash
git add .
git commit -m "feat: hero section with gradient bg and device mockup"
```

---

## Task 6: AboutSection + ServicesSection

**Files:**
- Create: `src/sections/AboutSection.tsx`
- Create: `src/sections/ServicesSection.tsx`

- [ ] **Step 1: Write `src/sections/AboutSection.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { num: '50+', desc: 'Proyek Selesai' },
  { num: '3 Hari', desc: 'Rata-rata Delivery' },
  { num: '100%', desc: 'Klien Puas' },
]

export default function AboutSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="tentang"
      ref={ref}
      className="relative px-6 py-24 overflow-hidden"
    >
      {/* Top accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00FFFF]/20 to-transparent" />
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_30%_50%,rgba(0,255,255,0.04)_0%,transparent_60%)] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.p
          className="text-white/40 text-[11px] tracking-[3px] uppercase mb-5"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Tentang Kami
        </motion.p>

        <motion.h2
          className="font-serif text-4xl md:text-5xl lg:text-[54px] font-normal leading-[1.15] tracking-tight max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Kami membangun{' '}
          <em className="italic text-white/60">website</em> untuk bisnis yang
          ingin <em className="italic text-white/60">tumbuh cepat</em>, tampil{' '}
          <em className="italic text-white/60">profesional</em>, dan dilayani
          dengan <em className="italic text-white/60">nyaman</em>.
        </motion.h2>

        {/* Stats */}
        <motion.div
          className="flex flex-wrap gap-4 mt-10"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          {stats.map(({ num, desc }) => (
            <div key={desc} className="liquid-glass rounded-2xl px-7 py-5">
              <div className="font-serif text-[36px] text-[#00FFFF] leading-none">{num}</div>
              <div className="text-white/40 text-xs mt-1">{desc}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/sections/ServicesSection.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { FileText, Building2, ShoppingCart, ArrowUpRight } from 'lucide-react'

const services = [
  {
    icon: FileText,
    tag: 'KONVERSI',
    title: 'Landing Page',
    desc: 'Solusi satu halaman fokus konversi tinggi untuk kampanye digital dan promosi bisnismu.',
    gradient: 'from-[#00FFFF]/06 to-[#1E2A78]/18',
  },
  {
    icon: Building2,
    tag: 'KREDIBILITAS',
    title: 'Company Profile',
    desc: 'Bangun kredibilitas bisnis dengan website resmi yang profesional dan meyakinkan.',
    gradient: 'from-[#1E2A78]/20 to-[#00FFFF]/04',
  },
  {
    icon: ShoppingCart,
    tag: 'E-COMMERCE',
    title: 'Toko Online',
    desc: 'E-commerce simpel untuk permudah pelanggan berbelanja produkmu secara online.',
    gradient: 'from-[#00FFFF]/04 to-[#1E2A78]/15',
  },
]

export default function ServicesSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="layanan" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <div className="flex justify-between items-baseline mb-10">
        <motion.h2
          className="font-serif text-4xl md:text-[42px] font-normal tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Solusi Digital
        </motion.h2>
        <span className="text-white/40 text-xs hidden md:block">LAYANAN KAMI</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map(({ icon: Icon, tag, title, desc, gradient }, i) => (
          <motion.div
            key={title}
            className="liquid-glass rounded-2xl overflow-hidden group cursor-pointer"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.15 }}
            whileHover={{ y: -6 }}
          >
            <div className={`h-40 bg-gradient-to-br ${gradient} flex items-center justify-center group-hover:scale-105 transition-transform duration-700`}>
              <Icon size={40} className="text-white/30" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-center mb-2">
                <span className="text-white/40 text-[10px] tracking-[2px] uppercase">{tag}</span>
                <div className="liquid-glass w-7 h-7 rounded-full flex items-center justify-center">
                  <ArrowUpRight size={12} className="text-white/60" />
                </div>
              </div>
              <h3 className="font-bold text-[17px] mb-2">{title}</h3>
              <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Add both sections to `HomePage.tsx`**

```tsx
import Navbar from '../components/Navbar'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      <HeroSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-5xl mx-auto" />
      <AboutSection />
      <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-5xl mx-auto" />
      <ServicesSection />
    </div>
  )
}
```

- [ ] **Step 4: Verify**

Scroll past hero — About section fades in with stats, Services 3-col grid with hover effects.

- [ ] **Step 5: Commit**

```bash
git add .
git commit -m "feat: about section with stats and services grid"
```

---

## Task 7: PortfolioPreview + ProcessSection + CTASection

**Files:**
- Create: `src/sections/PortfolioPreview.tsx`
- Create: `src/sections/ProcessSection.tsx`
- Create: `src/sections/CTASection.tsx`

- [ ] **Step 1: Write `src/sections/PortfolioPreview.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Link } from 'react-router-dom'

const projects = [
  { name: 'Warung Barokah Digital', type: 'Landing Page', days: 'Selesai 3 Hari', gradient: 'from-[#00FFFF]/08 via-[#1E2A78]/25 to-[#00FFFF]/03' },
  { name: 'PT. Mitra Jaya Konstruksi', type: 'Company Profile', days: 'Selesai 5 Hari', gradient: 'from-[#1E2A78]/30 via-[#00FFFF]/06 to-[#1E2A78]/10' },
  { name: 'Kopi Nusantara Store', type: 'Landing Page', days: 'Selesai 2 Hari', gradient: 'from-[#00FFFF]/05 via-[#1E2A78]/20 to-[#00FFFF]/08' },
  { name: 'Toko Batik Srikandi', type: 'Toko Online', days: 'Selesai 7 Hari', gradient: 'from-[#1E2A78]/25 via-[#00FFFF]/07 to-[#1E2A78]/15' },
]

export default function PortfolioPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="portofolio" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <div className="flex justify-between items-baseline mb-10">
        <motion.h2
          className="font-serif text-4xl md:text-[42px] font-normal tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Karya <em className="italic text-[#00FFFF]">Terbaru</em>
        </motion.h2>
        <span className="text-white/40 text-xs hidden md:block">PORTOFOLIO</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
        {projects.map(({ name, type, days, gradient }, i) => (
          <motion.div
            key={name}
            className={`liquid-glass rounded-2xl h-56 relative overflow-hidden cursor-pointer bg-gradient-to-br ${gradient} group`}
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            {/* Badge */}
            <div className="absolute top-3.5 right-3.5 bg-[#00FFFF] text-black text-[10px] font-bold px-2.5 py-1 rounded-md z-10">
              {days}
            </div>
            {/* Bottom info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
              <div className="font-bold text-[14px] text-white">{name}</div>
              <div className="text-[#00FFFF] text-[11px] mt-0.5">{type}</div>
            </div>
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <button className="bg-[#00FFFF] text-black font-bold text-sm px-6 py-2.5 rounded-full">
                Lihat Detail
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Link
          to="/portfolio"
          className="liquid-glass inline-flex items-center gap-2 rounded-full px-7 py-3 text-[#00FFFF] text-sm font-semibold hover:bg-white/5 transition-colors"
        >
          Lihat Karya Lainnya →
        </Link>
      </motion.div>
    </section>
  )
}
```

- [ ] **Step 2: Write `src/sections/ProcessSection.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle, Zap, Eye, Rocket } from 'lucide-react'

const steps = [
  { num: '01', icon: MessageCircle, title: 'Ngobrol Santai', desc: 'Konsultasi via WhatsApp. Ceritakan kebutuhan bisnismu tanpa jargon teknis.' },
  { num: '02', icon: Zap, title: 'Desain & Coding', desc: 'Kami rakit secepat kilat dengan desain modern dan kode yang bersih.' },
  { num: '03', icon: Eye, title: 'Review Bebas Pusing', desc: 'Revisi tanpa istilah rumit. Cukup bilang suka atau nggak — kami yang handle.' },
  { num: '04', icon: Rocket, title: 'Go Live!', desc: 'Websitemu siap menyapa pelanggan. Kami bantu deploy dan monitoring awal.' },
]

export default function ProcessSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="cara-kerja" ref={ref} className="px-6 py-24 max-w-5xl mx-auto">
      <motion.h2
        className="font-serif text-4xl md:text-[46px] font-normal tracking-tight mb-2"
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
      >
        Proses <em className="italic text-[#00FFFF]">Anti-Ribet</em>
      </motion.h2>
      <p className="text-white/40 text-[13px] mb-10">Dari ngobrol santai sampai go live, semua gampang.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {steps.map(({ num, icon: Icon, title, desc }, i) => (
          <motion.div
            key={num}
            className="liquid-glass rounded-2xl p-7 relative"
            initial={{ opacity: 0, y: 50 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1 }}
          >
            <div className="font-serif text-[44px] text-[#00FFFF]/20 absolute top-4 right-5 leading-none">{num}</div>
            <Icon size={24} className="text-white/70 mb-4" />
            <h3 className="font-bold text-[17px] mb-2">{title}</h3>
            <p className="text-white/40 text-[13px] leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Write `src/sections/CTASection.tsx`**

```tsx
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export default function CTASection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="konsultasi" ref={ref} className="relative px-6 py-24 text-center overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(0,255,255,0.07)_0%,transparent_65%)] pointer-events-none" />
      <div className="relative z-10 max-w-xl mx-auto">
        <motion.h2
          className="font-serif text-4xl md:text-[46px] font-normal leading-tight mb-4"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          Siap Bawa Bisnismu<br />ke Level{' '}
          <em className="italic text-[#00FFFF]">Berikutnya</em>?
        </motion.h2>
        <motion.p
          className="text-white/60 text-[14px] leading-relaxed mb-9"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Konsultasi sekarang, gratis! Kami bantu wujudkan website impianmu tanpa pusing.
        </motion.p>
        <motion.a
          href="https://wa.me/6281234567890"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-3 bg-[#00FFFF] text-black font-bold text-base px-10 py-4 rounded-full shadow-[0_0_40px_rgba(0,255,255,0.25)] hover:shadow-[0_0_60px_rgba(0,255,255,0.4)] transition-shadow"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          <MessageCircle size={20} />
          Hubungi via WhatsApp
        </motion.a>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Complete `src/pages/HomePage.tsx`**

```tsx
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import HeroSection from '../sections/HeroSection'
import AboutSection from '../sections/AboutSection'
import ServicesSection from '../sections/ServicesSection'
import PortfolioPreview from '../sections/PortfolioPreview'
import ProcessSection from '../sections/ProcessSection'
import CTASection from '../sections/CTASection'

const Divider = () => (
  <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent max-w-5xl mx-auto" />
)

export default function HomePage() {
  return (
    <div className="bg-black text-white">
      <Navbar />
      <HeroSection />
      <Divider />
      <AboutSection />
      <Divider />
      <ServicesSection />
      <Divider />
      <PortfolioPreview />
      <Divider />
      <ProcessSection />
      <Divider />
      <CTASection />
      <Divider />
      <Footer />
    </div>
  )
}
```

- [ ] **Step 5: Verify**

Scroll through all 8 sections — animations trigger, hover effects work, WA button opens.

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: portfolio preview, process, CTA, complete home page"
```

---

## Task 8: Pricing Page

**Files:**
- Modify: `src/pages/PricingPage.tsx`

- [ ] **Step 1: Write full `src/pages/PricingPage.tsx`**

```tsx
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { Check } from 'lucide-react'

const tiers = [
  {
    name: 'Starter',
    price: 'Rp 1.5jt',
    type: 'Landing Page',
    popular: false,
    features: [
      'Desain 1 Halaman',
      'Responsif Mobile',
      'Revisi 2x',
      'Selesai 3–5 Hari',
    ],
  },
  {
    name: 'Professional',
    price: 'Rp 3.5jt',
    type: 'Company Profile',
    popular: true,
    features: [
      'Desain 5+ Halaman',
      'Responsif & SEO',
      'Revisi 5x',
      'Selesai 7–10 Hari',
      'Domain + Hosting 1 Tahun',
    ],
  },
  {
    name: 'Enterprise',
    price: 'Rp 7jt+',
    type: 'Toko Online / Custom',
    popular: false,
    features: [
      'E-commerce Full Fitur',
      'Payment Gateway',
      'Revisi Unlimited',
      'Selesai 14–21 Hari',
      'Support 3 Bulan',
    ],
  },
]

export default function PricingPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="px-6 py-32 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-white/40 text-[11px] tracking-[3px] uppercase mb-4">Harga</p>
          <h1 className="font-serif text-5xl md:text-[52px] font-normal tracking-tight mb-3">
            Pilih Paket <em className="italic text-[#00FFFF]">Terbaik</em>
          </h1>
          <p className="text-white/40 text-[13px] mb-14">Transparan, tanpa biaya tersembunyi.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-start">
          {tiers.map(({ name, price, type, popular, features }, i) => (
            <motion.div
              key={name}
              className={`rounded-2xl p-7 text-center ${popular ? 'cyan-glass scale-[1.03]' : 'liquid-glass'}`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              {popular && (
                <div className="inline-block bg-[#00FFFF] text-black text-[10px] font-bold px-3 py-1 rounded mb-3">
                  POPULER
                </div>
              )}
              <div className={`text-[10px] font-bold tracking-[2px] uppercase mb-2 ${popular ? 'text-[#00FFFF]' : 'text-white/40'}`}>
                {name}
              </div>
              <div className="font-serif text-[40px] leading-none mb-1">{price}</div>
              <div className="text-white/40 text-xs mb-6">{type}</div>
              <ul className="text-left space-y-2 mb-8">
                {features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-white/60 text-xs">
                    <Check size={12} className="text-[#00FFFF] flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className={`block w-full py-2.5 rounded-full text-xs font-bold transition-shadow ${
                  popular
                    ? 'bg-[#00FFFF] text-black hover:shadow-[0_0_20px_rgba(0,255,255,0.4)]'
                    : 'border border-white/10 text-white hover:bg-white/5'
                }`}
              >
                Pilih Paket
              </a>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Open http://localhost:5173/pricing — 3 pricing cards, middle one scaled and cyan-glassed.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: pricing page with 3-tier cards"
```

---

## Task 9: Portfolio Page

**Files:**
- Modify: `src/pages/PortfolioPage.tsx`

- [ ] **Step 1: Write full `src/pages/PortfolioPage.tsx`**

```tsx
import { motion } from 'framer-motion'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const projects = [
  { name: 'Warung Barokah Digital', type: 'Landing Page', days: 'Selesai 3 Hari', gradient: 'from-[#00FFFF]/08 via-[#1E2A78]/25 to-[#00FFFF]/03' },
  { name: 'PT. Mitra Jaya Konstruksi', type: 'Company Profile', days: 'Selesai 5 Hari', gradient: 'from-[#1E2A78]/30 via-[#00FFFF]/06 to-[#1E2A78]/10' },
  { name: 'Kopi Nusantara Store', type: 'Landing Page', days: 'Selesai 2 Hari', gradient: 'from-[#00FFFF]/05 via-[#1E2A78]/20 to-[#00FFFF]/08' },
  { name: 'Toko Batik Srikandi', type: 'Toko Online', days: 'Selesai 7 Hari', gradient: 'from-[#1E2A78]/25 via-[#00FFFF]/07 to-[#1E2A78]/15' },
  { name: 'Klinik Sehat Bersama', type: 'Company Profile', days: 'Selesai 6 Hari', gradient: 'from-[#00FFFF]/06 via-[#1E2A78]/22 to-[#00FFFF]/04' },
  { name: 'Rental Mobil Abadi', type: 'Custom', days: 'Selesai 9 Hari', gradient: 'from-[#1E2A78]/28 via-[#00FFFF]/05 to-[#1E2A78]/12' },
]

export default function PortfolioPage() {
  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar />
      <div className="px-6 py-32 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <p className="text-white/40 text-[11px] tracking-[3px] uppercase mb-4">Karya Kami</p>
          <h1 className="font-serif text-5xl md:text-[52px] font-normal tracking-tight mb-3">
            Semua <em className="italic text-[#00FFFF]">Karya</em> Kami
          </h1>
          <p className="text-white/40 text-[13px]">Proyek yang sudah kami selesaikan dengan cepat dan estetis.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {projects.map(({ name, type, days, gradient }, i) => (
            <motion.div
              key={name}
              className={`liquid-glass rounded-2xl h-52 relative overflow-hidden cursor-pointer bg-gradient-to-br ${gradient} group`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: i * 0.08 }}
            >
              <div className="absolute top-3.5 right-3.5 bg-[#00FFFF] text-black text-[10px] font-bold px-2.5 py-1 rounded-md z-10">
                {type}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <div className="font-bold text-[14px] text-white">{name}</div>
                <div className="text-[#00FFFF] text-[11px] mt-0.5">{days}</div>
              </div>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                <button className="bg-[#00FFFF] text-black font-bold text-sm px-6 py-2.5 rounded-full">
                  Lihat Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Open http://localhost:5173/portfolio — 3-col grid, all 6 projects with gradients, hover overlay.

- [ ] **Step 3: Commit**

```bash
git add .
git commit -m "feat: portfolio page with full project grid"
```

---

## Task 10: Build Check + Responsive Polish

**Files:**
- Modify: `src/components/Navbar.tsx` (mobile hamburger)

- [ ] **Step 1: Run production build**

```bash
npm run build
```
Expected: No TypeScript errors. `dist/` folder created.

- [ ] **Step 2: Fix any TS errors**

Common fixes: add missing imports, type `event` params explicitly, ensure all props typed.

- [ ] **Step 3: Add mobile menu toggle to Navbar**

In `src/components/Navbar.tsx`, add state and hamburger button:
```tsx
const [mobileOpen, setMobileOpen] = useState(false)

// In JSX, after the CTA button, add:
<button
  className="md:hidden text-white/80 ml-4"
  onClick={() => setMobileOpen(!mobileOpen)}
  aria-label="Toggle menu"
>
  {mobileOpen ? <X size={20} /> : <Menu size={20} />}
</button>

// Add mobile dropdown below the pill:
{mobileOpen && (
  <div className="liquid-glass rounded-2xl mt-2 px-4 py-4 flex flex-col gap-3 max-w-5xl mx-auto">
    <a href="/#layanan" className="text-white/80 text-sm" onClick={() => setMobileOpen(false)}>Layanan</a>
    <Link to="/portfolio" className="text-white/80 text-sm" onClick={() => setMobileOpen(false)}>Portofolio</Link>
    <Link to="/pricing" className="text-[#00FFFF] text-sm" onClick={() => setMobileOpen(false)}>Pricing</Link>
    <a href="/#cara-kerja" className="text-white/80 text-sm" onClick={() => setMobileOpen(false)}>Cara Kerja</a>
  </div>
)}
```
Import `Menu, X` from `lucide-react`.

- [ ] **Step 4: Final build verify**

```bash
npm run build && npm run preview
```
Expected: Site runs at http://localhost:4173, all 3 routes work, no console errors.

- [ ] **Step 5: Final commit**

```bash
git add .
git commit -m "feat: mobile navbar + final build verification"
```

---

## Verification Checklist

- [ ] `/` — Home loads with all 8 sections
- [ ] `/pricing` — 3-tier pricing cards, middle one highlighted
- [ ] `/portfolio` — 6 project cards in 3-col grid
- [ ] Scroll animations trigger on each section
- [ ] Navbar sticky, scroll effect works
- [ ] Mobile hamburger menu works
- [ ] Hover states on all cards and buttons
- [ ] WhatsApp CTA opens `wa.me` link
- [ ] `npm run build` exits with code 0
