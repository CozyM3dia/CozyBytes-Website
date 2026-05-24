export type BlogPost = {
  slug: string
  title: string
  excerpt: string
  date: string
  category: string
  categoryColor: 'cyan' | 'gold' | 'violet' | 'emerald'
  readTime: string
  author: string
  image?: string
  content: string
}

const categoryColors: Record<string, BlogPost['categoryColor']> = {
  SEO: 'cyan',
  Marketing: 'cyan',
  Desain: 'gold',
  'UI/UX': 'gold',
  Teknologi: 'violet',
  Development: 'violet',
  Bisnis: 'emerald',
  UMKM: 'emerald',
  Tips: 'cyan',
}

function parseFrontmatter(raw: string): { metadata: Record<string, string>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { metadata: {}, content: raw }

  const metadata: Record<string, string> = {}
  match[1].split('\n').forEach((line) => {
    const idx = line.indexOf(':')
    if (idx === -1) return
    const key = line.slice(0, idx).trim()
    const val = line.slice(idx + 1).trim().replace(/^["']|["']$/g, '')
    metadata[key] = val
  })

  return { metadata, content: match[2].trim() }
}

const modules = import.meta.glob('/src/content/blog/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getAllPosts(): BlogPost[] {
  const posts: BlogPost[] = []

  for (const [path, raw] of Object.entries(modules)) {
    const slug = path.split('/').pop()!.replace('.md', '')
    const { metadata, content } = parseFrontmatter(raw)

    posts.push({
      slug,
      title: metadata.title || slug,
      excerpt: metadata.excerpt || content.slice(0, 160) + '...',
      date: metadata.date || '2025-01-01',
      category: metadata.category || 'Umum',
      categoryColor: categoryColors[metadata.category] || 'cyan',
      readTime: metadata.readTime || '5 menit',
      author: metadata.author || 'Cozybytes Media',
      image: metadata.image || undefined,
      content,
    })
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug)
}
