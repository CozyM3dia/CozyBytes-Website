# DESIGN.md — Cozybytes Media

> Design system reference. Gunakan file ini sebagai panduan membuat konten visual — website, Instagram, Canva template, atau materi marketing lainnya.

---

## 1. Brand

**Nama:** Cozybytes Media  
**Tagline:** *Website Profesional. Tanpa Pusing.*  
**Lokasi:** Bandar Lampung, Indonesia  
**Target:** UMKM, startup lokal, pemilik bisnis yang butuh representasi digital premium  

**Kepribadian Brand:**
- **Premium tapi terjangkau** — Tampilan dark luxury tech, bukan startup norak
- **Percaya diri** — Tidak banyak basa-basi, langsung ke nilai
- **Lokal tapi kelas dunia** — Dari Lampung, tapi standar internasional
- **Hangat** — Tim kecil, komunikasi personal, bukan korporat dingin

**Tone of voice:** Tegas, to the point, sedikit poetic di headline. Hindari kata-kata klise seperti "solusi terbaik", "terpercaya", "profesional" tanpa konteks.

---

## 2. Colors

### Palet Utama

| Nama | Hex | Penggunaan |
|------|-----|------------|
| **Background** | `#09090B` | Background utama (zinc-950) |
| **Surface** | `#111113` | Card, panel, elevated surface |
| **Surface Alt** | `#050507` | Inner card, pricing card |
| **Cyan / Primary Accent** | `#00FFFF` | CTA, highlight teks, ikon, border aktif, glow |
| **Gold / Secondary Accent** | `#F8D16A` | Pro tier, emphasis sekunder, badge premium |
| **White Primary** | `#FFFFFF` | Heading, teks utama |
| **White Secondary** | `rgba(255,255,255,0.7)` | Body text |
| **White Muted** | `rgba(255,255,255,0.4)` | Caption, label, placeholder |
| **White Subtle** | `rgba(255,255,255,0.06)` | Border, divider, grid line |

### Palet Pendukung

| Nama | Hex | Penggunaan |
|------|-----|------------|
| **Emerald** | `#6EE7B7` / `emerald-300` | Checkmark, success state |
| **Violet** | `rgba(196,181,253,0.8)` | Premium tier accent |
| **Cyan Glow** | `rgba(0,255,255,0.2)` | Shadow, blur, ambient glow |
| **Gold Glow** | `rgba(248,209,106,0.2)` | Shadow gold, ambient glow |

### Cara Pakai Warna (Instagram/Canva)

```
Background post: #09090B atau gradasi radial ke #111113
Teks headline: Putih penuh #FFFFFF
Teks subheadline: rgba(255,255,255,0.7)
Aksen/highlight: #00FFFF
Badge/label: #00FFFF dengan bg rgba(0,255,255,0.1)
Elemen premium: #F8D16A
Border/garis tipis: rgba(255,255,255,0.08)
```

### Gradasi Khas Cozybytes

```css
/* Radial glow — selalu dari atas tengah */
background: radial-gradient(ellipse 70% 50% at 50% 0%,
  rgba(0,255,255,0.15) 0%,
  transparent 70%);

/* Teks heading dengan gradient */
background: linear-gradient(180deg, #FFFFFF 20%, #00FFFF 100%);
-webkit-background-clip: text;

/* Divider line khas */
background: linear-gradient(to right, transparent, rgba(0,255,255,0.3), transparent);

/* Gold glow untuk badge premium */
background: radial-gradient(ellipse at center,
  rgba(248,209,106,0.15) 0%, transparent 70%);
```

---

## 3. Typography

### Font Family

| Font | Style | Kegunaan |
|------|-------|---------|
| **Instrument Serif** | Regular + Italic | Display, heading, angka besar, tagline |
| **Plus Jakarta Sans** | 400, 600, 700 | Body, label, CTA, navigasi |

**Google Fonts URL:**
```
https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@400;600;700&display=swap
```

### Skala Tipografi

| Nama | Size | Font | Contoh Pakai |
|------|------|------|-------------|
| **Hero** | 64–96px | Instrument Serif | Headline utama landing page |
| **Display** | 48–64px | Instrument Serif | Section heading besar |
| **Heading** | 32–48px | Instrument Serif | Judul section |
| **Subheading** | 24–32px | Plus Jakarta Sans 700 | Judul card, list item |
| **Body Large** | 18–20px | Plus Jakarta Sans 400 | Deskripsi panjang |
| **Body** | 14–16px | Plus Jakarta Sans 400 | Teks biasa |
| **Label** | 10–12px | Plus Jakarta Sans 600 | Tag, badge, keterangan |
| **Mono** | 12px | monospace | Nomor urut, kode |

### Pola Tipografi Khas

```
Headline: "Kata Biasa [Italic Cyan] Kata Biasa"
Contoh: "Solusi Digital untuk Bisnis Kamu"
         → "Solusi [Digital] untuk Bisnis Kamu"
         → "Digital" = Instrument Serif Italic, warna #00FFFF

Subtext: Instrument Serif italic, warna white/30 (ghosted)
Contoh: "Kami Memahami [Kesulitan] Mencari [Jasa Web] yang Dapat Diandalkan"
         → "Kesulitan" = Italic, white/30 (redup)
         → "Jasa Web" = Italic, #00FFFF (highlight)

Label/Eyebrow: Plus Jakarta Sans, ALL CAPS, letter-spacing 0.25em, white/35
Contoh: "LAYANAN KAMI" / "PRICING TABLE" / "CARA KERJA"
```

### Untuk Instagram/Canva

```
Post Square (1:1 1080×1080):
  Headline: Instrument Serif, 80–120px
  Sub: Plus Jakarta Sans 400, 32–40px
  Label: Plus Jakarta Sans 600, 20–24px, ALL CAPS

Story (9:16 1080×1920):
  Headline: Instrument Serif, 96–140px
  Sub: Plus Jakarta Sans 400, 36–44px

Carousel Slide:
  Headline: Instrument Serif, 72–96px
  Body: Plus Jakarta Sans 400, 28–32px
```

---

## 4. Spacing & Layout

### Prinsip Layout

- **Max width konten:** 1280px (`max-w-7xl`) untuk layout lebar, 1024px (`max-w-5xl`) untuk reading
- **Horizontal padding:** 24px mobile, 48–64px desktop
- **Section vertical:** 80–144px atas-bawah
- **Breathing room:** Lebih banyak whitespace = lebih premium

### Grid

```
Desktop: 12-column grid, gutter 24px
Tablet: 8-column grid, gutter 20px
Mobile: 4-column grid, gutter 16px

Stats strip: 3-column equal
Pricing: 3-column equal (tengah elevated)
Services: 2-column (list kiri, visual kanan)
Team: 3-column equal
Values: 3-column equal
```

### Untuk Instagram/Canva (Safe Zone)

```
1080×1080 post:
  Margin tepi: 80px minimum
  Area aman teks: 920×920px

1080×1920 story:
  Margin tepi: 80px
  Top safe (UI bar): 200px
  Bottom safe (CTA area): 300px
  Area aman teks: 920×1420px
```

---

## 5. Components

### Button Primary (CTA Utama)

```
Background: #00FFFF
Teks: #000000, Plus Jakarta Sans 700
Shape: Rounded-full (pill)
Padding: 12px 24px
Shadow: 0 0 20px rgba(0,255,255,0.4), 0 0 40px rgba(0,255,255,0.2)
Hover: Shadow intensify

Contoh teks: "Mulai Konsultasi", "Konsultasi Gratis", "Pilih Paket Pro →"
```

### Badge / Label

```
Warna: Sesuai tier/konteks
Shape: Rounded-full, border tipis
Padding: 4px 12px
Font: Plus Jakarta Sans 700, 10–12px, tracking-widest

Contoh:
  Cyan badge: bg rgba(0,255,255,0.1), border rgba(0,255,255,0.3), teks #00FFFF
  Gold badge: bg rgba(248,209,106,0.12), border rgba(248,209,106,0.35), teks #F8D16A
  Emerald badge: bg rgba(52,211,153,0.1), teks emerald-300
```

### Card (Glass Surface)

```
Background: rgba(255,255,255,0.018) — sangat subtle
Border: 1px solid rgba(255,255,255,0.06)
Border radius: 16–28px
Backdrop blur: blur(4px)
Hover: border rgba(0,255,255,0.25), shadow glow
```

### Divider Line

```
Height: 1px
Background: linear-gradient(to right, transparent, rgba(0,255,255,0.2–0.4), transparent)
Margin: 32–48px vertikal
```

### Stat Display (Angka Besar)

```
Font: Instrument Serif, 80–112px
Color: gradient linear 180deg white(95%) → #00FFFF(70%)
Label atas: Ikon kecil + teks uppercase, warna white/35
Aksen bawah: garis gradient tipis 1px, lebar 64px
```

### Pricing Card

```
UMKM tier: Border cyan tipis, background dark
Pro tier (featured): Border animated gold trail, shadow gold glow, badge "Paling banyak dipilih"
Premium tier: Border putih tipis, badge violet
```

---

## 6. Motion & Animation

### Prinsip (Emil Kowalski Style)

- **Kurang lebih baik** — Animasi hanya jika ada tujuan (orientation, feedback, delight)
- **Cepat** — UI animation max 300ms, prefer 180–250ms
- **Spring > Linear** — Gunakan spring physics untuk natural feel
- **Stagger masuk** — List items masuk dengan delay 0.1–0.15s per item

### Animasi Khas Cozybytes

```
Section reveal: opacity 0→1, y 30→0, duration 0.6–0.7s, ease [0.22,1,0.36,1]
Card hover: y -4 to -8px, scale 1.01–1.05, shadow intensify
Number counter: Ease-out cubic, 1.5s duration
Stagger delay: 0.15s per item
Pulse glow entry: scale 0.3→2.5, opacity 0→0.25→0, 2s
```

### SVG Border Trail (Pro Card)

```
Teknik: SVG stroke-dashoffset animation pada rect
Elemen: 3 rect (base border dim + glow blur + sharp trail)
Kecepatan: 4s per rotasi
Dasharray: "80 2920" (80px trail, ~2920px gap)
```

### Untuk Instagram (Static Post)

```
Karena Canva static, tiru feel motion dengan:
- Blur gradient pada background (aura/glow effect)
- Elemen posisi sedikit off-center (tidak terlalu centered)
- Satu elemen "besar" sebagai anchor visual (angka, kata, atau logo)
- Thin line/divider sebagai detail presisi
```

---

## 7. Brand Assets

### Logo

```
File: /public/logo.png
Ukuran di navbar: height 36px
Ukuran di about page: height 160px
Background: Transparan
Versi: logo.png?v=2
```

### Ikon

Library: **Lucide React** (stroke-width 1.5–2)
Warna default ikon: `text-[#00FFFF]` atau `text-white/60`
Ikon yang sering dipakai:
- Rocket → Proyek/Kecepatan
- Clock → Delivery time
- Heart → Kepuasan klien
- MessageCircle → WhatsApp/CTA
- Check → Feature included
- Star → Featured/Unggulan

---

## 8. Panduan Instagram / Canva

### Template Post (1:1)

```
Layer 1 (Background):
  Fill: #09090B (solid)
  
Layer 2 (Glow/Atmosphere):
  Radial gradient: Cyan #00FFFF opacity 10–15%, center top
  Radius: 60–80% dari lebar post

Layer 3 (Konten):
  Headline: Instrument Serif, putih
  Kata kunci: Italic, #00FFFF
  Sub: Plus Jakarta Sans, white 70%
  Label atas: ALL CAPS, white 35%, small

Layer 4 (Accent):
  Garis tipis horizontal atau elemen dekoratif
  Optional: Glow dot/circle di sudut

Layer 5 (Branding):
  Logo Cozybytes kecil di pojok
  Optional: @cozybytes.media handle
```

### Jenis Konten Instagram yang Cocok

| Tipe | Layout | Elemen Utama |
|------|--------|--------------|
| **Quote/Insight** | Centered, 1 halaman | Teks besar Instrument Serif italic, glow background |
| **Stats Post** | 3-column atau 1 angka besar | Angka raksasa + label kecil |
| **Before/After** | Split atau carousel | Kontras: bland vs premium |
| **Layanan highlight** | Full bleed + text overlay | Foto/mockup + teks pendek |
| **Harga/Promo** | Card pricing mini | Badge diskon, harga bold |
| **Tim** | Grid 3 foto | Foto B&W dengan cyan accent |
| **Testimoni** | Quote format | Tanda kutip besar, nama kecil |

### Palet Canva Quick-Set

```
Tambahkan ke Canva Brand Kit:

Primary Background: #09090B
Accent Cyan:        #00FFFF
Accent Gold:        #F8D16A
Text Primary:       #FFFFFF
Text Secondary:     #B3B3B3 (≈ white/70)
Text Muted:         #666666 (≈ white/40)
Surface Card:       #111113
Border:             #1A1A1D (≈ white/06)
```

### Font Setup di Canva

```
Heading / Display: Cormorant Garamond Italic
  (closest Canva alternative to Instrument Serif Italic)

Body: DM Sans atau Nunito
  (closest Canva alternative to Plus Jakarta Sans)

Jika punya akses Canva Pro: Upload font langsung
  → Instrument Serif (download dari Google Fonts)
  → Plus Jakarta Sans (download dari Google Fonts)
```

---

## 9. Dos & Don'ts

### ✅ DO

- Gunakan background gelap `#09090B` selalu
- Italic pada kata kunci + warna cyan = signature look Cozybytes
- Whitespace yang lega — jangan terlalu penuh
- Satu focal point per post (angka besar / kata besar / gambar)
- Glow effect subtle di background (bukan neon berlebihan)
- Uppercase dengan letter-spacing untuk label
- Serif italic untuk heading, sans untuk body

### ❌ DON'T

- Background putih atau terang
- Font Inter, Roboto, Arial, atau system font
- Purple gradient (terlalu generic AI)
- Terlalu banyak warna dalam satu post (max 2 aksen)
- Drop shadow kasar atau bevel/emboss
- Teks terlalu kecil atau terlalu banyak di satu post
- Menggunakan foto tanpa overlay/treatment gelap
- Warna-warna pastel atau soft tanpa konteks

---

*File ini dibuat otomatis dari codebase Cozybytes Media. Update manual jika ada perubahan design system.*
