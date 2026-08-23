import { useRef, useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Clock, ArrowRight, Search, Filter } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getAllPosts, type BlogPost } from '../lib/blog'

const colorMap = {
  cyan: {
    glow: 'rgba(0,255,255,0.12)',
    badge: 'border-[#00FFFF]/30 bg-[#00FFFF]/10 text-[#00FFFF]',
    accent: '#00FFFF',
  },
  gold: {
    glow: 'rgba(248,209,106,0.12)',
    badge: 'border-[#F8D16A]/30 bg-[#F8D16A]/10 text-[#F8D16A]',
    accent: '#F8D16A',
  },
  violet: {
    glow: 'rgba(196,181,253,0.12)',
    badge: 'border-violet-300/30 bg-violet-400/10 text-violet-200',
    accent: 'rgba(196,181,253,0.8)',
  },
  emerald: {
    glow: 'rgba(110,231,183,0.12)',
    badge: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-300',
    accent: '#6EE7B7',
  },
}

function BlogHero({ post }: { post: BlogPost }) {
  const colors = colorMap[post.categoryColor]

  return (
    <div className="relative flex items-end h-52 rounded-t-[20px] overflow-hidden p-6">
      {/* Background: image or gradient fallback */}
      {post.image ? (
        <>
          <img
            src={post.image}
            alt=""
            width={1600}
            height={904}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/60 to-transparent" />
        </>
      ) : (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 80% 70% at 30% 20%, ${colors.glow} 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 80% 80%, rgba(255,255,255,0.03) 0%, transparent 60%), #0a0a0c`,
          }}
        />
      )}

      {/* Decorative grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.04]">
        <div className="absolute top-8 left-6 right-6 h-px bg-white" />
        <div className="absolute top-16 left-6 right-6 h-px bg-white" />
        <div className="absolute bottom-12 left-6 w-24 h-px bg-white" />
      </div>

      {/* Category floating label */}
      <span
        className="absolute top-4 right-4 text-[9px] font-bold tracking-[0.3em] uppercase"
        style={{ color: colors.accent, opacity: 0.5 }}
      >
        {post.category}
      </span>

      {/* Title preview */}
      <h3 className="font-display relative z-10 text-xl font-medium leading-snug tracking-tight line-clamp-2">
        {post.title}
      </h3>
    </div>
  )
}

function BlogCard({ post, index }: { post: BlogPost; index: number }) {
  const colors = colorMap[post.categoryColor]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link
        to={`/blog/${post.slug}`}
        className="group block h-full rounded-[20px] border border-white/[0.06] bg-white/[0.018] overflow-hidden transition-all duration-300 hover:border-white/15 hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
      >
        <BlogHero post={post} />

        <div className="p-6 flex flex-col gap-3">
          {/* Category + Read time */}
          <div className="flex items-center gap-3">
            <span className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider ${colors.badge}`}>
              {post.category}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-white/35">
              <Clock className="h-3 w-3" />
              {post.readTime}
            </span>
          </div>

          {/* Excerpt */}
          <p className="text-sm leading-relaxed text-white/50 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Date + Read more */}
          <div className="flex items-center justify-between mt-auto pt-3 border-t border-white/[0.06]">
            <time className="text-xs text-white/30">
              {new Date(post.date).toLocaleDateString('id-ID', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
              })}
            </time>
            <span className="flex items-center gap-1 text-xs font-semibold text-[#00FFFF] opacity-0 group-hover:opacity-100 transition-opacity">
              Baca
              <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default function BlogPage() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const allPosts = getAllPosts()
  const [query, setQuery] = useState('')
  const [activeCat, setActiveCat] = useState<string>('Semua')

  const categories = useMemo(() => ['Semua', ...Array.from(new Set(allPosts.map(p => p.category)))], [allPosts])

  const posts = useMemo(() => {
    return allPosts.filter(p => {
      const matchCat = activeCat === 'Semua' || p.category === activeCat
      const q = query.toLowerCase()
      const matchQuery = !q || p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
      return matchCat && matchQuery
    })
  }, [allPosts, query, activeCat])

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Blog | Cozybytes Media</title>
        <meta name="description" content="Tulisan kami seputar website untuk bisnis: cara memilih jasa pembuatan website, dasar SEO, tren desain, dan strategi digital untuk UMKM. Ditulis ringan, tanpa jargon berlebihan." />
        <link rel="canonical" href="https://cozybytes.media/blog" />
        <meta property="og:title" content="Blog | Cozybytes Media" />
        <meta property="og:description" content="Tulisan seputar website untuk bisnis: SEO dasar, tren desain, dan strategi digital UMKM. Ditulis ringan, tanpa jargon berlebihan." />
        <meta property="og:url" content="https://cozybytes.media/blog" />
        <meta property="og:image" content="https://cozybytes.media/og-image.jpg" />
        <meta name="twitter:image" content="https://cozybytes.media/og-image.jpg" />
      </Helmet>
      <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">

      <section
        ref={ref}
        className="relative overflow-hidden pt-36 pb-24"
        style={{
          background:
            'radial-gradient(ellipse 72% 38% at 50% 0%, rgba(0,255,255,0.10) 0%, transparent 62%), #09090B',
        }}
      >
        <div className="relative z-10 mx-auto max-w-5xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14 max-w-2xl"
          >
            <span className="mb-3 block text-xs font-semibold uppercase tracking-[0.28em] text-[#00FFFF]">
              Blog
            </span>
            <h1 className="font-display mb-4 text-4xl sm:text-5xl md:text-6xl font-medium leading-[1.05] tracking-tight">
              Insight & <span className="text-[#00FFFF]">tips.</span>
            </h1>
            <p className="max-w-lg text-base leading-relaxed text-white/50">
              Artikel seputar website, digital marketing, dan tips mengembangkan bisnis di era digital.
            </p>
          </motion.div>

          {/* Search & Filter */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />
              <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Cari artikel, kategori, topik..."
                className="w-full rounded-full border border-white/10 bg-white/[0.04] py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-white/30 focus:border-[#00FFFF]/30 focus:outline-none focus:ring-2 focus:ring-[#00FFFF]/20"
                aria-label="Cari artikel"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0 scrollbar-thin">
              <Filter className="h-3.5 w-3.5 text-white/30 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCat(cat)}
                  aria-pressed={activeCat === cat}
                  className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all ${activeCat === cat ? 'bg-[#00FFFF] text-black shadow-[0_0_14px_rgba(0,255,255,0.3)]' : 'border border-white/10 bg-white/[0.02] text-white/60 hover:border-white/20 hover:text-white'}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            {posts.length === 0 ? (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="text-white/40 text-center py-16 rounded-2xl border border-white/5 bg-white/[0.01]"
              >
                Tidak ada artikel untuk <span className="text-white">“{query || activeCat}”</span>. Coba kata kunci lain.
              </motion.p>
            ) : (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {posts.map((post, i) => (
                  <BlogCard key={post.slug} post={post} index={i} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          <p className="mt-6 text-center text-xs text-white/25">{posts.length} dari {allPosts.length} artikel</p>
        </div>
      </section>

      </main>
      <Footer />
    </div>
  )
}
