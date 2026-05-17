# Design Spec: Cozybytes Media Landing Site
**Date:** 2026-05-17  
**Status:** Approved  
**Stack:** React + TypeScript + Vite + Tailwind CSS + framer-motion + lucide-react

---

## Context
Landing site untuk Cozybytes Media — agensi web development Indonesia. Goal: konversi (lead via WhatsApp) + kredibilitas. Style: dark cinematic liquid glass + brand cyan #00FFFF Pacman logo. Multi-page dengan Pricing dan Portfolio sebagai halaman terpisah.

---

## Design System

### Colors
| Token | Value | Usage |
|-------|-------|-------|
| `black` | `#000000` | Global background |
| `primary-dark` | `#0D1B3D` | Accent gradients |
| `secondary-dark` | `#1E2A78` | Gradient pair |
| `cyan` | `#00FFFF` | Primary accent — CTA, highlights, logo |
| `white` | `#FFFFFF` | Body text |
| `white/60` | `rgba(255,255,255,0.6)` | Secondary text |
| `white/40` | `rgba(255,255,255,0.4)` | Tertiary text |

### Typography
- **Instrument Serif** (italic + regular) — display headings via Google Fonts
- **Plus Jakarta Sans** (400/600/700) — body, UI, buttons

### Liquid Glass
Reusable `.liquid-glass` Tailwind component (defined in `@layer components` in `index.css`):
```css
.liquid-glass {
  background: rgba(255,255,255,0.01);
  backdrop-filter: blur(4px);
  box-shadow: inset 0 1px 1px rgba(255,255,255,0.1);
  position: relative; overflow: hidden;
}
.liquid-glass::before { /* gradient border via pseudo-element */ }
```
Cyan glass variant: same but tinted with `rgba(0,255,255,0.03)`.

### Buttons
- **Primary:** `bg-[#00FFFF] text-black font-bold rounded-full` + cyan glow shadow
- **Secondary:** `.liquid-glass rounded-full text-white`
- **Outline:** `border border-white/10 text-white rounded-full`

---

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `HomePage` | Main landing (8 sections) |
| `/pricing` | `PricingPage` | 3-tier pricing cards |
| `/portfolio` | `PortfolioPage` | Full portfolio grid |

---

## Page: Home (`/`)

### Section 1 — Navbar (sticky)
- Liquid glass pill, `max-w-5xl mx-auto`
- Left: Pacman C icon (cyan circle) + "Cozybytes MEDIA"
- Center: links → Beranda, Layanan, Portofolio (→/portfolio), Pricing (→/pricing), Cara Kerja
- Right: "Konsultasi Gratis" primary button
- Scroll behavior: transparent → solid glass on scroll

### Section 2 — Hero (min-h-screen)
- **Background:** animated radial gradients (cyan glow) + floating dot particles
- **Content (centered):** badge tag → heading (72-80px Instrument Serif italic cyan accents) → subtext → 2 CTA buttons
- **Visual:** floating device mockup (laptop wireframe + phone) built in CSS — no images needed
- **Feature bar:** 4 items (Super Cepat, Proses Nyaman, Responsif & Modern, Fokus Lokal) with cyan glass icons
- Framer Motion: fade-in-up on mount

### Section 3 — About
- Large Instrument Serif heading (54px) with italic dim accents
- Top border accent line (cyan 20% opacity)
- Subtle radial cyan glow bg
- **Stats row (FIX):** 3 liquid glass stat pills → "50+ Proyek", "3 Hari avg", "100% Klien Puas"
- Framer Motion: useInView fade-in-up

### Section 4 — Layanan (Services)
- Header row: "Solusi Digital" + "LAYANAN KAMI" label
- 3-col grid of liquid glass cards
- Each card: gradient visual area (emoji → replace with lucide icon in build) + tag + title + desc + arrow icon
- Hover: translateY(-6px) + card-visual scale(1.05)

### Section 5 — Portofolio Preview
- Header: "Karya *Terbaru*" + "PORTOFOLIO"
- 2x2 grid, each card has unique cyan/dark gradient bg
- **Card anatomy (FIX):** cyan badge (completion time) top-right + project name + type bottom overlay + hover glass overlay with "Lihat Detail" button
- "Lihat Karya Lainnya →" glass pill link → `/portfolio`

### Section 6 — Cara Kerja
- Heading: "Proses *Anti-Ribet*"
- 2x2 glass process cards with large faded step numbers (01–04)
- Steps: Ngobrol Santai → Desain & Coding → Review Bebas Pusing → Go Live!

### Section 7 — CTA
- Radial cyan glow bg
- "Siap Bawa Bisnismu ke Level *Berikutnya*?" (Instrument Serif)
- "Hubungi via WhatsApp" primary button (large, cyan glow shadow)
- WhatsApp link: `https://wa.me/6281234567890`

### Section 8 — Footer
- 3-col: brand+tagline | Tautan (Beranda, Layanan, Portofolio, Pricing, S&K) | Kontak (email, phone, IG, LinkedIn)
- Bottom bar: copyright

---

## Page: Pricing (`/pricing`)

- Same navbar + footer as Home
- Heading: "Pilih Paket *Terbaik*"
- 3-col pricing grid:

| Tier | Price | Type | Highlight |
|------|-------|------|-----------|
| Starter | Rp 1.5jt | Landing Page | Glass |
| Professional | Rp 3.5jt | Company Profile | **Cyan glass + POPULER badge + scale(1.03)** |
| Enterprise | Rp 7jt+ | Toko Online/Custom | Glass |

---

## Page: Portfolio (`/portfolio`)

- Same navbar + footer
- Heading: "Semua *Karya* Kami"
- 3-col grid, all project cards with unique gradients, project name, type, hover overlay
- Future: filter by category (Landing Page / Company Profile / Toko Online)

---

## Animations (framer-motion)

- **On scroll:** `useInView({ once: true, margin: "-100px" })` → `opacity: 0, y: 40` → `opacity: 1, y: 0`
- **Stagger:** service/portfolio cards stagger by 0.1–0.15s delay
- **Hover:** cards `whileHover={{ y: -6 }}`, buttons `whileHover={{ scale: 1.03 }}`
- **Navbar:** scroll listener → add backdrop blur class after 50px scroll

---

## File Structure

```
cozybytes-media/
├── src/
│   ├── main.tsx
│   ├── App.tsx              # Router setup
│   ├── index.css            # Tailwind + liquid-glass + Google Fonts
│   ├── components/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── PricingPage.tsx
│   │   └── PortfolioPage.tsx
│   └── sections/            # Home sections as sub-components
│       ├── HeroSection.tsx
│       ├── AboutSection.tsx
│       ├── ServicesSection.tsx
│       ├── PortfolioPreview.tsx
│       ├── ProcessSection.tsx
│       └── CTASection.tsx
├── public/
├── index.html
├── tailwind.config.ts
├── vite.config.ts
└── package.json
```

---

## Verification

1. `npm run dev` → site loads at localhost
2. Check all 3 routes render: `/`, `/pricing`, `/portfolio`
3. Scroll animations trigger on all sections
4. Hover states on cards and buttons
5. WhatsApp CTA link opens correctly
6. Navbar sticky + scroll behavior works
7. Responsive: mobile breakpoint (hamburger menu or collapsed links)
8. `npm run build` → no TypeScript errors
