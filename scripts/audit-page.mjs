// Audit visual halaman layanan. Pemakaian:
//   node scripts/audit-page.mjs <route> <folder-output> [label-demo]
// Contoh:
//   node scripts/audit-page.mjs /layanan/website audit-website
// Self-contained: menyalakan static server untuk dist/, memakai Playwright,
// lalu menutup semuanya.
import { chromium } from 'playwright'
import { createServer } from 'node:http'
import { readFile, mkdir } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import { extname, join, normalize } from 'node:path'

const ROOT = 'dist'
const ROUTE = process.argv[2] ?? '/layanan/website'
const OUT = process.argv[3] ?? 'audit'
// Interaksi demo khusus halaman website (tab "Uji Kecepatan" + tombol audit).
const HAS_DEMO = ROUTE === '/layanan/website'

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.xml': 'application/xml',
  '.txt': 'text/plain; charset=utf-8',
}

/* ---------------- static server ---------------- */

const server = createServer(async (req, res) => {
  try {
    const urlPath = decodeURIComponent(new URL(req.url, 'http://x').pathname)
    // Cegah path traversal
    const safe = normalize(urlPath).replace(/^(\.\.[/\\])+/, '')
    let file = join(ROOT, safe)

    if (existsSync(file) && extname(file) === '') file = join(file, 'index.html')
    if (!existsSync(file)) file = join(ROOT, safe, 'index.html')
    if (!existsSync(file)) file = join(ROOT, '404.html')

    const body = await readFile(file)
    res.writeHead(200, { 'content-type': MIME[extname(file)] ?? 'application/octet-stream' })
    res.end(body)
  } catch (err) {
    res.writeHead(500)
    res.end(String(err))
  }
})

const port = await new Promise((resolve) => {
  server.listen(0, '127.0.0.1', () => resolve(server.address().port))
})
const BASE = `http://127.0.0.1:${port}`
// Ke stderr supaya stdout murni JSON report (mudah diarahkan ke file).
console.error(`serving ${ROOT} on ${BASE} — auditing ${ROUTE}`)

await mkdir(OUT, { recursive: true })

/* ---------------- audit ---------------- */

const SECTIONS = [
  'hero',
  'diagnosis',
  'capabilities',
  'comparison',
  'stack',
  'process',
  'pricing',
  'faq',
  'closing',
]

const VIEWPORTS = [
  { name: 'mobile', width: 390, height: 844 },
  { name: 'desktop', width: 1440, height: 900 },
]

const browser = await chromium.launch()
const report = []

for (const vp of VIEWPORTS) {
  const page = await browser.newPage({
    viewport: { width: vp.width, height: vp.height },
    deviceScaleFactor: 1,
  })

  const consoleErrors = []
  const pageErrors = []
  const failedRequests = []
  page.on('console', (m) => {
    if (m.type() === 'error') consoleErrors.push(m.text())
  })
  page.on('pageerror', (e) => pageErrors.push(e.message))
  page.on('requestfailed', (r) =>
    failedRequests.push(`${r.url()} — ${r.failure()?.errorText ?? 'unknown'}`),
  )

  await page.goto(`${BASE}${ROUTE}`, { waitUntil: 'load' })
  await page.waitForTimeout(1800)

  const metrics = await page.evaluate(() => {
    const doc = document.documentElement
    const h1 = document.querySelector('h1')

    const overflowing = []
    for (const el of document.querySelectorAll('main *')) {
      const r = el.getBoundingClientRect()
      if (r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2)) {
        const cls = typeof el.className === 'string' ? el.className.slice(0, 52) : ''
        overflowing.push(`${el.tagName.toLowerCase()}.${cls}`)
      }
    }

    const tiny = []
    for (const el of document.querySelectorAll('main *')) {
      if (!el.childElementCount && el.textContent?.trim()) {
        const fs = parseFloat(getComputedStyle(el).fontSize)
        if (fs > 0 && fs < 11) tiny.push(`${fs}px — ${el.textContent.trim().slice(0, 30)}`)
      }
    }

    return {
      scrollWidth: doc.scrollWidth,
      clientWidth: doc.clientWidth,
      horizontalOverflow: doc.scrollWidth > doc.clientWidth,
      docHeight: doc.scrollHeight,
      sectionCount: document.querySelectorAll('main > section').length,
      h1Text: h1?.textContent ?? null,
      h1FontSize: h1 ? getComputedStyle(h1).fontSize : null,
      headings: [...document.querySelectorAll('main h1, main h2')]
        .map((h) => `${h.tagName} ${h.textContent.trim().slice(0, 52)}`)
        .slice(0, 14),
      overflowing: [...new Set(overflowing)].slice(0, 10),
      tiny: [...new Set(tiny)].slice(0, 14),
    }
  })

  // Playwright `fullPage` menyusun tangkapan tanpa benar-benar menggulir halaman,
  // sehingga observer `whileInView` di bawah viewport pertama tidak pernah aktif dan
  // seksinya tertangkap pada opacity:0. Gulir bertahap dulu supaya semua reveal
  // (`once: true`) menyala dan tetap menyala, lalu kembali ke atas untuk menangkap.
  //
  // `behavior: 'instant'` wajib: html punya `scroll-behavior: smooth`, sehingga
  // scrollTo default jadi animasi. Tiap panggilan berikutnya membatalkan animasi
  // sebelumnya, jadi halaman hanya merambat dan seksi bawah tetap opacity:0.
  const primeReach = await page.evaluate(async () => {
    let maxSeen = 0
    const step = Math.round(window.innerHeight * 0.6)
    for (let y = 0; y < document.documentElement.scrollHeight; y += step) {
      window.scrollTo({ top: y, behavior: 'instant' })
      await new Promise((r) => setTimeout(r, 140))
      maxSeen = Math.max(maxSeen, Math.round(window.scrollY))
    }
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'instant' })
    await new Promise((r) => setTimeout(r, 500))
    maxSeen = Math.max(maxSeen, Math.round(window.scrollY))
    window.scrollTo({ top: 0, behavior: 'instant' })
    return { maxSeen, maxPossible: document.documentElement.scrollHeight - window.innerHeight }
  })
  await page.waitForTimeout(1100)

  // Sisa elemen teks yang masih opacity:0 setelah prime. Harapannya hanya panel
  // FAQ yang memang tertutup (accordion), bukan seksi yang gagal reveal.
  //
  // `getClientRects().length === 0` menyaring apa pun di dalam subtree
  // `display:none` — misalnya tabel Comparison desktop (`hidden md:block`) yang
  // pada viewport mobile tidak pernah memicu `whileInView`.
  const unrevealed = await page.evaluate(() => {
    const notRendered = (el) => el.getClientRects().length === 0
    const isFaded = (el) => parseFloat(getComputedStyle(el).opacity) <= 0.05

    const out = []
    for (const el of document.querySelectorAll('main *')) {
      if (!el.textContent?.trim()) continue
      if (notRendered(el) || !isFaded(el)) continue

      // Lewati kalau ada leluhur yang sudah pudar (laporkan hanya akar terluar).
      let p = el.parentElement
      let nested = false
      while (p && p.tagName !== 'MAIN') {
        if (isFaded(p)) {
          nested = true
          break
        }
        p = p.parentElement
      }
      if (nested) continue

      const panel = el.closest('[role="region"][aria-labelledby]')
      const collapsed =
        panel?.getAttribute('role') === 'region' &&
        Math.round(panel.getBoundingClientRect().height) === 0
      out.push(`${collapsed ? 'faq-collapsed' : 'UNREVEALED'} — ${el.textContent.trim().slice(0, 40)}`)
    }
    return out.slice(0, 12)
  })

  await page.screenshot({ path: `${OUT}/${vp.name}-full.png`, fullPage: true })

  const sectionEls = await page.locator('main > section').all()
  for (let i = 0; i < sectionEls.length; i++) {
    const label = SECTIONS[i] ?? `section-${i}`
    try {
      await sectionEls[i].scrollIntoViewIfNeeded()
      await page.waitForTimeout(750)
      await sectionEls[i].screenshot({ path: `${OUT}/${vp.name}-${i}-${label}.png` })
    } catch (err) {
      report.push(`[${vp.name}] screenshot ${label} gagal: ${err.message}`)
    }
  }

  const interactions = {}

  if (HAS_DEMO) {
    try {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }))
      await page.waitForTimeout(500)
      await page.getByRole('tab', { name: 'Uji Kecepatan' }).click({ timeout: 8000 })
      await page.waitForTimeout(600)
      await page.getByRole('button', { name: /Jalankan Audit/i }).click({ timeout: 8000 })
      await page.waitForTimeout(2400)
      interactions.auditScoreVisible = await page
        .getByText('Google PageSpeed: Optimal')
        .isVisible()
      await page.screenshot({ path: `${OUT}/${vp.name}-demo-audit.png` })
    } catch (err) {
      interactions.auditError = err.message.split('\n')[0]
    }
  }

  // Semua halaman layanan memakai akordeon FAQ dengan aria-expanded +
  // aria-controls, jadi selector ini generik.
  try {
    const btn = page.locator('button[aria-expanded][aria-controls]').nth(2)
    await btn.scrollIntoViewIfNeeded()
    await btn.click({ timeout: 8000 })
    await page.waitForTimeout(700)
    interactions.faqExpanded = await btn.getAttribute('aria-expanded')
    await page.screenshot({ path: `${OUT}/${vp.name}-faq-open.png` })
  } catch (err) {
    interactions.faqError = err.message.split('\n')[0]
  }

  if (vp.name === 'mobile') {
    try {
      // Chip pembanding mobile: semua halaman memakai tablist bernama sama,
      // hanya label tiap chipnya berbeda — jadi ambil tab kedua dari tablist
      // itu, bukan mencocokkan nama.
      const chip = page
        .locator('[role="tablist"][aria-label="Pilih pembanding"] [role="tab"]')
        .nth(1)
      await chip.scrollIntoViewIfNeeded()
      await chip.click({ timeout: 8000 })
      await page.waitForTimeout(500)
      interactions.comparisonChip = await chip.getAttribute('aria-selected')
      await page.screenshot({ path: `${OUT}/mobile-comparison-chip.png` })
    } catch (err) {
      interactions.comparisonError = err.message.split('\n')[0]
    }
  }

  report.push({
    route: ROUTE,
    viewport: vp.name,
    metrics,
    primeReach,
    unrevealed,
    interactions,
    consoleErrors: consoleErrors.slice(0, 6),
    pageErrors: pageErrors.slice(0, 6),
    failedRequests: failedRequests.slice(0, 6),
  })

  await page.close()
}

await browser.close()
server.close()
console.log(JSON.stringify(report, null, 2))
