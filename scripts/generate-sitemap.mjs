/**
 * Generate sitemap.xml + robots.txt secara dinamis dari route statis + konten blog.
 * Dijalankan sebelum / sebagai bagian build, dan juga bisa standalone `node scripts/generate-sitemap.mjs`
 * Output ditulis ke public/sitemap.xml (untuk dev) dan dist/sitemap.xml (jika dist ada, untuk build).
 * Jadi tidak perlu maintain manual — selalu sinkron dengan prerender.
 */
import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog')
const PUBLIC_SITEMAP = join(ROOT, 'public', 'sitemap.xml')
const DIST_SITEMAP = join(ROOT, 'dist', 'sitemap.xml')
const DIST_ROBOTS = join(ROOT, 'dist', 'robots.txt')

const BASE = 'https://cozybytes.media'

const STATIC_ROUTES = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/layanan', changefreq: 'monthly', priority: '0.9' },
  { path: '/layanan/website', changefreq: 'monthly', priority: '0.9' },
  { path: '/layanan/landing-page', changefreq: 'monthly', priority: '0.9' },
  { path: '/layanan/ecommerce', changefreq: 'monthly', priority: '0.9' },
  { path: '/layanan/uiux', changefreq: 'monthly', priority: '0.9' },
  { path: '/about', changefreq: 'monthly', priority: '0.7' },
  { path: '/portfolio', changefreq: 'weekly', priority: '0.8' },
  { path: '/blog', changefreq: 'weekly', priority: '0.8' },
  { path: '/syarat-ketentuan', changefreq: 'yearly', priority: '0.3' },
]

function getBlogRoutes() {
  if (!existsSync(BLOG_DIR)) return []
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  return files.map(f => {
    const slug = f.replace(/\.md$/, '')
    // Try read frontmatter date for lastmod
    let lastmod = new Date().toISOString().split('T')[0]
    try {
      const raw = readFileSync(join(BLOG_DIR, f), 'utf8')
      const m = raw.match(/date:\s*["']?([0-9-]+)["']?/)
      if (m) lastmod = m[1]
    } catch {}
    return { path: `/blog/${slug}`, changefreq: 'yearly', priority: '0.6', lastmod }
  })
}

function buildXml(routes) {
  const today = new Date().toISOString().split('T')[0]
  const urls = routes.map(r => {
    const loc = `${BASE}${r.path}`
    const lastmod = r.lastmod || today
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority}</priority>\n  </url>`
  }).join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
}

function main() {
  const blogRoutes = getBlogRoutes()
  const all = [...STATIC_ROUTES, ...blogRoutes]
  const xml = buildXml(all)

  // public (source)
  writeFileSync(PUBLIC_SITEMAP, xml, 'utf8')
  console.log(`sitemap: wrote ${all.length} urls → public/sitemap.xml`)

  // dist (if exists, after vite build)
  if (existsSync(join(ROOT, 'dist'))) {
    mkdirSync(dirname(DIST_SITEMAP), { recursive: true })
    writeFileSync(DIST_SITEMAP, xml, 'utf8')
    console.log(`sitemap: wrote ${all.length} urls → dist/sitemap.xml`)
    // ensure robots.txt in dist too
    const robots = `User-agent: *\nAllow: /\n\nSitemap: ${BASE}/sitemap.xml\n`
    writeFileSync(DIST_ROBOTS, robots, 'utf8')
  }
}

main()
