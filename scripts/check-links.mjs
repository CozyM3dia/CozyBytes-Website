/**
 * Smoke test atas hasil build di dist/. Dijalankan sebagai bagian dari `npm run build`.
 *
 * Ada dua defect yang lolos ke production tanpa terlihat karena tidak ada yang
 * memeriksa output build:
 *
 * 1. Keempat halaman /layanan/* yatim di link graph. Link-nya hanya ada di dropdown
 *    Navbar yang cuma ter-mount saat di-hover, jadi HTML hasil prerender tidak memuat
 *    satu pun link internal ke sana. Halaman paling komersial, nol internal link.
 * 2. /layanan sendiri 404 karena tidak pernah jadi rute.
 *
 * Keduanya lolos verifikasi manual karena yang diperiksa waktu itu hanya meta tag.
 * Pemeriksaan di bawah menutup celah itu secara permanen.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')

/** Rute yang memang sengaja tidak ditautkan dari halaman lain. */
const ALLOWED_ORPHANS = new Set([
  '/', // dijangkau lewat logo dan URL langsung
  '/syarat-ketentuan', // ditautkan dari footer, tapi biarkan lolos kalau footer berubah
])

function htmlFiles(dir) {
  const out = []
  for (const entry of readdirSync(dir)) {
    const p = join(dir, entry)
    if (statSync(p).isDirectory()) out.push(...htmlFiles(p))
    else if (entry === 'index.html') out.push(p)
  }
  return out
}

function routeOf(file) {
  const rel = relative(DIST, file).replace(/\\/g, '/').replace(/index\.html$/, '')
  return '/' + rel.replace(/\/$/, '')
}

const problems = []

if (!existsSync(DIST)) {
  console.error('dist/ tidak ada — jalankan build dulu.')
  process.exit(1)
}

const files = htmlFiles(DIST)
const routes = new Set(files.map(routeOf))

// Kumpulkan seluruh href internal yang benar-benar ada di HTML statis.
const linkedTo = new Set()
for (const file of files) {
  const html = readFileSync(file, 'utf8')
  for (const m of html.matchAll(/href="(\/[^"#?]*)/g)) {
    let href = m[1]
    if (href.length > 1) href = href.replace(/\/$/, '')
    linkedTo.add(href)
  }
}

// 1. Tiap rute harus ditunjuk minimal satu link internal di HTML statis.
for (const route of [...routes].sort()) {
  if (ALLOWED_ORPHANS.has(route)) continue
  if (!linkedTo.has(route)) {
    problems.push(
      `yatim: ${route} tidak punya link internal di HTML hasil prerender. ` +
        `Kalau link-nya cuma muncul setelah interaksi (hover/menu), crawler tanpa JS tidak akan melihatnya.`,
    )
  }
}

// 2. sitemap.xml harus cocok dua arah dengan file yang benar-benar diprerender.
const sitemapPath = join(DIST, 'sitemap.xml')
if (!existsSync(sitemapPath)) {
  problems.push('sitemap.xml tidak ada di dist/')
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8')
  const urls = [...sitemap.matchAll(/<loc>https:\/\/cozybytes\.media([^<]*)<\/loc>/g)].map((m) => {
    const path = m[1] || '/'
    return path.length > 1 ? path.replace(/\/$/, '') : '/'
  })

  for (const u of urls) {
    if (!routes.has(u)) problems.push(`sitemap mencantumkan ${u} tapi tidak ada file hasil prerender untuknya`)
  }
  for (const r of routes) {
    if (!urls.includes(r)) problems.push(`${r} diprerender tapi tidak ada di sitemap.xml`)
  }
}

// 3. Tiap halaman: tepat satu <title>, tidak ada og:image ganda, JSON-LD valid.
for (const file of files) {
  const route = routeOf(file)
  const html = readFileSync(file, 'utf8')

  const titles = (html.match(/<title[\s>]/g) ?? []).length
  if (titles !== 1) problems.push(`${route}: ada ${titles} <title>, harus tepat 1`)

  const og = (html.match(/property="og:image"/g) ?? []).length
  if (og !== 1) problems.push(`${route}: ada ${og} og:image, harus tepat 1`)

  for (const m of html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(m[1])
    } catch (err) {
      problems.push(`${route}: JSON-LD gagal di-parse — ${err.message}`)
    }
  }
}

if (problems.length) {
  console.error(`\ncheck-links: ${problems.length} masalah\n`)
  for (const p of problems) console.error('  ' + p)
  process.exit(1)
}

console.log(`check-links: OK — ${files.length} halaman, semua tertaut, sitemap cocok, meta bersih`)
