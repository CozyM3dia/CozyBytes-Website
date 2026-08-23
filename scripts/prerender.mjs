/**
 * Prerender tiap route jadi HTML statis setelah `vite build`.
 *
 * Kenapa perlu: meta per halaman diatur react-helmet-async saat runtime, dan
 * crawler WhatsApp / Facebook / Instagram tidak menjalankan JavaScript. Tanpa
 * ini, semua link yang dibagikan cuma membaca <head> statis di index.html.
 *
 * Dipakai lewat `npm run build`, setelah client build dan SSR build selesai.
 */

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const DIST = join(ROOT, 'dist')
const SSR_ENTRY = join(ROOT, 'dist-server', 'entry-server.js')
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog')

/** Route statis. `*` sengaja tidak diprerender: itu redirect ke `/`. */
const STATIC_ROUTES = [
  '/',
  '/about',
  '/syarat-ketentuan',
  '/portfolio',
  '/blog',
  '/layanan',
  '/layanan/website',
  '/layanan/landing-page',
  '/layanan/ecommerce',
  '/layanan/uiux',
]

function blogRoutes() {
  return readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => `/blog/${f.replace(/\.md$/, '')}`)
}

/**
 * Tempelkan head dari Helmet ke template.
 *
 * Kalau Helmet ikut mengeluarkan <title>, <title> statis milik template dibuang
 * dulu. Dua <title> dalam satu dokumen bikin crawler memakai yang pertama, dan
 * itu justru yang generik — bug yang sama seperti og:image statis sebelumnya.
 */
/**
 * Tandai tag hasil prerender supaya client bisa membuangnya sebelum React mount.
 *
 * Tanpa ini, React 19 akan meng-hoist salinan metadata-nya sendiri ke <head>
 * saat app boot, sementara tag statis kita tetap ada — hasilnya dua <title> dan
 * dua og:image di DOM. Crawler tanpa JS tidak terpengaruh (mereka cuma melihat
 * yang statis), tapi tidak ada gunanya menyisakan duplikat untuk crawler yang
 * menjalankan JS.
 */
function markPrerendered(head) {
  return head.replace(/<(title|meta|link)\b/gi, '<$1 data-prerender="true"')
}

function injectHead(template, head) {
  let out = template
  if (/<title[\s>]/i.test(head)) {
    out = out.replace(/[ \t]*<title>[\s\S]*?<\/title>\r?\n?/i, '')
  }
  return out.replace('</head>', `  ${markPrerendered(head)}\n  </head>`)
}

function injectBody(html, appHtml) {
  return html.replace(
    '<div id="root"></div>',
    `<div id="root">${appHtml}</div>`,
  )
}

function outputPath(route) {
  return route === '/'
    ? join(DIST, 'index.html')
    : join(DIST, route.slice(1), 'index.html')
}

async function main() {
  if (!existsSync(SSR_ENTRY)) {
    throw new Error(`SSR bundle tidak ada di ${SSR_ENTRY}. Jalankan build:ssr dulu.`)
  }

  const templatePath = join(DIST, 'index.html')
  if (!existsSync(templatePath)) {
    throw new Error(`dist/index.html tidak ada. Jalankan build:client dulu.`)
  }

  // Dibaca sekali sebelum route mana pun ditulis, supaya penulisan '/' nanti
  // tidak mencemari template untuk route berikutnya.
  let template = readFileSync(templatePath, 'utf8')

  // === PERF 100: inline critical CSS to eliminate render-blocking ===
  // Vite emits <link rel="stylesheet" crossorigin href="/assets/index-*.css"> which blocks FCP/LCP ~400ms.
  // For Lighthouse, inlining the CSS eliminates the blocking request.
  // We inline full CSS (68KB) as <style> and REMOVE the external link for first paint (no extra fetch).
  // Subsequent navigations will still have styles via inline, no need for external on first load.
  const cssMatch = template.match(/<link rel="stylesheet" crossorigin href="(\/assets\/[^"]+\.css)">/)
  if (cssMatch) {
    try {
      const cssHref = cssMatch[1]
      const cssPath = join(DIST, cssHref.replace(/^\//, ''))
      if (existsSync(cssPath)) {
        const cssContent = readFileSync(cssPath, 'utf8')
        const inlineTag = `<style data-critical="true">${cssContent}</style>`
        template = template.replace('</head>', `  ${inlineTag}\n  </head>`)
        // Remove external stylesheet link entirely for first paint — inline already provides all styles.
        // Keep a low-priority prefetch for cache on next pages (optional, not render-blocking)
        template = template.replace(
          `<link rel="stylesheet" crossorigin href="${cssHref}">`,
          `<link rel="prefetch" as="style" crossorigin href="${cssHref}">`
        )
        console.log(`  inline critical CSS ${cssHref} ${(Buffer.byteLength(cssContent)/1024).toFixed(0)}KB (external removed for FCP)`)
      }
    } catch (e) {
      console.warn('  inline CSS gagal', e.message)
    }
  }

  const { render } = await import(pathToFileURL(SSR_ENTRY).href)

  const routes = [...STATIC_ROUTES, ...blogRoutes()]
  const failures = []

  for (const route of routes) {
    try {
      const { html, head } = await render(route)

      if (!head.trim()) {
        failures.push({ route, reason: 'Helmet tidak menghasilkan tag head' })
        continue
      }

      const page = injectBody(injectHead(template, head), html)
      const dest = outputPath(route)
      mkdirSync(dirname(dest), { recursive: true })
      writeFileSync(dest, page, 'utf8')

      const title = (head.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] ?? '').trim()
      const kb = (Buffer.byteLength(page) / 1024).toFixed(0)
      console.log(`  ${route.padEnd(38)} ${kb.padStart(4)}KB  ${title.slice(0, 52)}`)
    } catch (err) {
      failures.push({ route, reason: err?.message ?? String(err) })
    }
  }

  // Shell SPA polos untuk path yang tidak dikenal. Vercel menyajikan 404.html
  // saat tidak ada file yang cocok, jadi app tetap boot dan route catch-all-nya
  // mengarahkan ke '/'. Ini dipakai supaya vercel.json tidak perlu rewrite
  // catch-all — rewrite semacam itu berisiko menelan file hasil prerender.
  writeFileSync(join(DIST, '404.html'), template, 'utf8')
  console.log('  404.html                                     (SPA shell)')

  console.log(`\nprerendered ${routes.length - failures.length}/${routes.length} routes`)

  if (failures.length) {
    console.error('\nGAGAL:')
    for (const f of failures) console.error(`  ${f.route}: ${f.reason}`)
    // Fail the build: sebuah route yang gagal prerender akan tetap tampil di
    // browser (SPA fallback) tapi kehilangan meta-nya secara diam-diam.
    process.exit(1)
  }
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
