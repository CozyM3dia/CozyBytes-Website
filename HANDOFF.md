# Cozybytes Media — Handoff Document

## Project

Landing site for Cozybytes Media, Indonesian web dev agency.

- **Dir:** `C:/Users/Sibgha/cozybytes-media`
- **Dev server:** `npm run dev` → runs on port 5175 (5174 taken by S.A.F.E House project)
- **Build:** `npm run build` — passes, ~421KB JS, 0 TS errors
- **Stack:** React + TypeScript + Vite + Tailwind CSS v3 + framer-motion + lucide-react + react-router-dom

---

## Routes

| Path | Page |
|---|---|
| `/` | HomePage (8 sections) |
| `/about` | AboutPage |
| `/pricing` | PricingPage (3 tiers) |
| `/portfolio` | PortfolioPage (9 cards grid) |

---

## Key Design Tokens

- **Background:** `bg-black`
- **Accent:** `#00FFFF` (cyan)
- **Heading font:** `"Instrument Serif", serif`
- **Body font:** `"Plus Jakarta Sans", sans-serif`
- **Glass effect:** `.liquid-glass` class (backdrop-filter blur + pseudo-element gradient border)
- **Cyan glass:** `.cyan-glass` class (same but cyan tint)
- **CTA button:** `.btn-primary` (cyan bg, glow shadow)

---

## File Map

```
src/
├── App.tsx                          # BrowserRouter + Routes
├── index.css                        # Tailwind + liquid-glass + btn-primary CSS
├── components/
│   ├── Navbar.tsx                   # Sticky liquid glass pill, hamburger, wave-char animation
│   ├── Footer.tsx                   # FAQ accordion + social icons + links
│   └── Logo.tsx                     # Real PNG logo from /public/logo.png
├── sections/
│   ├── HeroSection.tsx              # Animated gradient bg + particles + device mockup
│   ├── AboutSection.tsx             # Stats + headline
│   ├── ServicesSection.tsx          # HoverSlider 3-col (list | image | description)
│   ├── PortfolioPreview.tsx         # 4 preview cards
│   ├── ProcessSection.tsx           # Cara Kerja steps
│   └── CTASection.tsx               # WA CTA banner
└── pages/
    ├── HomePage.tsx                 # Assembles all sections
    ├── AboutPage.tsx
    ├── PricingPage.tsx              # 3 tier cards (Starter/Professional/Enterprise)
    └── PortfolioPage.tsx            # 9 project cards
public/
└── logo.png                         # Real Cozybytes Media logo (cyan C + speed lines)
```

---

## Notable Implementations

### Logo
```tsx
// src/components/Logo.tsx
// Renders real PNG from public/logo.png
<img src="/logo.png" height={h} style={{ height: h, width: 'auto', objectFit: 'contain' }} />
```

### FAQ Accordion (Footer)
```tsx
// AnimatePresence height 0 → 'auto' transition
<motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
```

### Services HoverSlider
```tsx
// 3-col layout: service list | image | description
// ServiceDescription uses useHoverSliderContext() to get activeSlide
// AnimatePresence mode="wait" slides description on hover
```

### Social Icons (Footer)
- Instagram: `linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)`
- LinkedIn: `linear-gradient(135deg, #0077b5, #00a0dc)`
- Both wrapped in `.liquid-glass` div

---

## Known Quirks

- Port 5174 occupied by S.A.F.E House project → always use 5175
- `tsconfig.json` has `"ignoreDeprecations": "6.0"` for baseUrl
- `@/` path alias configured in both `vite.config.ts` and `tsconfig.json`
- `motion/react` (Motion v12) used in `animated-slideshow` component (not `framer-motion`)
- `lucide-react` has no Instagram/LinkedIn icons → custom SVG inline in Footer.tsx

---

## WA Number (placeholder)
All CTA buttons point to `https://wa.me/6281234567890` — needs updating to real number.

---

## Status
All 10 original tasks complete. Build passes. All pages verified in browser. No pending bugs.

**Next steps (if any):**
- Replace placeholder WA number with real one
- Add real portfolio project data
- Add `/syarat-ketentuan` route (linked in footer but not implemented)
- Deploy to Vercel (MCP connector available)
