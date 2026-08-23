/**
 * Generate RSS feed untuk blog — meningkatkan SEO & discoverability.
 * Output: public/rss.xml & dist/rss.xml
 */
import { readdirSync, existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs'
import { join, dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const BLOG_DIR = join(ROOT, 'src', 'content', 'blog')

const BASE = 'https://cozybytes.media'

function parseFrontmatter(raw) {
  const m = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!m) return { meta: {}, content: raw }
  const meta = {}
  m[1].split('\n').forEach(line => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const k = line.slice(0, idx).trim()
    const v = line.slice(idx+1).trim().replace(/^["']|["']$/g,'')
    meta[k] = v
  })
  return { meta, content: m[2].trim() }
}

function esc(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function main() {
  if (!existsSync(BLOG_DIR)) return
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'))
  const posts = files.map(f => {
    const raw = readFileSync(join(BLOG_DIR, f), 'utf8')
    const { meta } = parseFrontmatter(raw)
    return {
      slug: f.replace(/\.md$/,''),
      title: meta.title || f,
      excerpt: meta.excerpt || '',
      date: meta.date || new Date().toISOString().split('T')[0],
    }
  }).sort((a,b) => new Date(b.date) - new Date(a.date))

  const items = posts.map(p => `
    <item>
      <title>${esc(p.title)}</title>
      <link>${BASE}/blog/${p.slug}</link>
      <guid>${BASE}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.date).toUTCString()}</pubDate>
      <description>${esc(p.excerpt)}</description>
    </item>`).join('')

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>Cozybytes Media Blog</title>
  <link>${BASE}/blog</link>
  <description>Tulisan seputar website, SEO, desain, dan strategi digital UMKM.</description>
  <language>id</language>
  <atom:link href="${BASE}/rss.xml" rel="self" type="application/rss+xml" />
  ${items}
</channel>
</rss>`

  const pub = join(ROOT, 'public', 'rss.xml')
  writeFileSync(pub, rss, 'utf8')
  console.log(`rss: wrote ${posts.length} items → public/rss.xml`)
  const dist = join(ROOT, 'dist', 'rss.xml')
  if (existsSync(join(ROOT,'dist'))) {
    mkdirSync(dirname(dist), { recursive: true })
    writeFileSync(dist, rss, 'utf8')
    console.log(`rss: wrote → dist/rss.xml`)
  }
}

main()
