# Cozybytes Media — Handoff 2

## Project Overview

Landing site for **Cozybytes Media**, Indonesian web dev agency. Dark theme, cyan (#00FFFF) accent, premium glass aesthetic.

- **Dir:** `C:\Users\Sibgha\cozybytes-media`
- **Dev server:** `npm run dev` → port 5175 (configured in `.claude/launch.json`)
- **Stack:** React 18 + TypeScript + Vite + Tailwind CSS v3 + framer-motion + lucide-react + react-router-dom
- **No git repo initialized** — `.git` does not exist

---

## What Was Done This Session (Session 2)

### Changes from Session 1 baseline (see HANDOFF.md for Session 1 context):

1. **WA number updated** — All CTA links now point to real number `6285894514719` (was placeholder `6281234567890`). Updated across all files: HeroSection, CTASection, Navbar, Footer, PricingPage, PortfolioPage, SyaratKetentuanPage.

2. **Syarat & Ketentuan page created** — `src/pages/SyaratKetentuanPage.tsx` — Full T&C page with accordion sections (Lingkup Layanan, Harga & Pembayaran, Revisi, Hak Kekayaan Intelektual, etc.). Route added at `/syarat-ketentuan` in App.tsx.

3. **Portfolio page removed from routes** — `/portfolio` route no longer in App.tsx (PortfolioPage.tsx file still exists but is not routed).

4. **FluidFlowBackground component** — Canvas-based animated background with flowing orbs, used in HeroSection. Replaced or supplements ParticlesBackground.

5. **TikTok icon added to Footer** — Custom SVG TikTokIcon alongside Instagram and LinkedIn.

6. **Pricing tiers renamed** — Cards now labeled UMKM / Pro / Premium (was Starter / Professional / Enterprise). Prices in IDR: Rp 1.499.000 / Rp 3.000.000 / Rp 5.000.000.

7. **CTASection updated** — Added secondary CTA link to `/pricing` ("Cek Harga & Paket") above the WhatsApp button. Rotating word animation cycles through: Berikutnya, Profesional, Digital, Modern, Terdepan.

8. **Container scroll animation component** — `src/components/ui/container-scroll-animation.tsx` — Scroll-driven 3D perspective card with spring physics. Available for use.

9. **Shine border component** — `src/components/ui/shine-border.tsx` — Animated border effect component.

10. **Button component** — `src/components/ui/button.tsx` — Reusable button primitives.

---

## Current Routes

| Path | Page | Status |
|---|---|---|
| `/` | HomePage (Hero, About, Services, Process, CTA) | Active |
| `/about` | AboutPage | Active |
| `/pricing` | PricingPage (UMKM/Pro/Premium) | Active |
| `/syarat-ketentuan` | SyaratKetentuanPage (T&C modal-style) | Active |
| `/portfolio` | **NOT routed** (file exists at `src/pages/PortfolioPage.tsx`) | Inactive |

---

## File Map (Current)

```
src/
├── App.tsx                              # BrowserRouter, ScrollToTop, 4 routes
├── main.tsx                             # ReactDOM entry
├── index.css                            # Tailwind + .liquid-glass + .btn-primary
├── components/
│   ├── Navbar.tsx                       # Sticky glass pill, hamburger, WA CTA
│   ├── Footer.tsx                       # FAQ accordion, social icons (IG/LinkedIn/TikTok), links
│   ├── Logo.tsx                         # PNG logo from /public/logo.png
│   ├── FluidFlowBackground.tsx          # Canvas animated orbs (hero bg)
│   ├── ParticlesBackground.tsx          # Canvas particles (available, may be unused)
│   └── ui/
│       ├── animated-slideshow.tsx        # HoverSlider context + components
│       ├── container-scroll-animation.tsx # Scroll-driven 3D card
│       ├── shine-border.tsx             # Animated border effect
│       └── button.tsx                   # Button primitives
├── sections/
│   ├── HeroSection.tsx                  # FluidFlowBackground + feature pills + CTA
│   ├── AboutSection.tsx                 # Stats + headline
│   ├── ServicesSection.tsx              # HoverSlider 3-col (list | image | description)
│   ├── ProcessSection.tsx               # "Cara Kerja" steps
│   ├── CTASection.tsx                   # Rotating word + dual CTA (pricing + WA)
│   └── PortfolioPreview.tsx             # Preview cards (used in HomePage? check)
└── pages/
    ├── HomePage.tsx                     # Assembles: Hero, About, Services, Process, CTA
    ├── AboutPage.tsx                    # About page
    ├── PricingPage.tsx                  # 3 tiers: UMKM/Pro/Premium with gold highlight
    ├── PortfolioPage.tsx                # EXISTS but NOT routed
    └── SyaratKetentuanPage.tsx          # T&C with accordion sections
```

---

## Design Tokens

| Token | Value |
|---|---|
| Background | `#000` / `bg-black` |
| Primary accent | `#00FFFF` (cyan) |
| Gold accent | `#F8D16A` (pricing highlight) |
| Heading font | `"Instrument Serif", serif` |
| Body font | `"Plus Jakarta Sans", sans-serif` |
| Glass effect | `.liquid-glass` (backdrop-blur + gradient border) |
| CTA button | `.btn-primary` (cyan bg, glow shadow) |

---

## Key Implementation Notes

- **No git** — project has `.gitignore` but no `.git` directory
- **WA number** — `6285894514719` used everywhere (real number)
- **Port** — Always 5175 (5174 taken by S.A.F.E House)
- **motion/react vs framer-motion** — `animated-slideshow.tsx` uses `motion/react` (Motion v12), rest uses `framer-motion`
- **`@/` path alias** — configured in vite.config.ts + tsconfig.json
- **PortfolioPreview** — section component exists but not included in HomePage.tsx currently
- **ParticlesBackground** — component exists but may be unused (FluidFlowBackground replaced it in hero)

---

## Pending / Next Steps

1. **Initialize git repo** — No version control yet
2. **Re-add Portfolio route** — PortfolioPage exists, just needs route in App.tsx
3. **Add PortfolioPreview to HomePage** — Section exists but not in HomePage assembly
4. **Verify build passes** — Run `npm run build` to confirm
5. **Deploy to Vercel** — MCP connector available in tooling
6. **Add real portfolio data** — Current cards may have placeholder content
7. **Check ParticlesBackground usage** — May be dead code after FluidFlowBackground added
8. **Mobile responsiveness audit** — Verify all pages look good on mobile
