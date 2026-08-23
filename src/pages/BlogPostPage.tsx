import { useParams, Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import type { Components } from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { ArrowLeft, Clock, User } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getPostBySlug } from '../lib/blog'

const colorMap = {
  cyan: { glow: 'rgba(0,255,255,0.15)', accent: '#00FFFF', badge: 'border-[#00FFFF]/30 bg-[#00FFFF]/10 text-[#00FFFF]' },
  gold: { glow: 'rgba(248,209,106,0.15)', accent: '#F8D16A', badge: 'border-[#F8D16A]/30 bg-[#F8D16A]/10 text-[#F8D16A]' },
  violet: { glow: 'rgba(196,181,253,0.15)', accent: 'rgba(196,181,253,0.8)', badge: 'border-violet-300/30 bg-violet-400/10 text-violet-200' },
  emerald: { glow: 'rgba(110,231,183,0.15)', accent: '#6EE7B7', badge: 'border-emerald-300/30 bg-emerald-400/10 text-emerald-300' },
}

// Gambar inline artikel selalu di bawah fold, jadi lazy-load semuanya
const markdownComponents: Components = {
  img: ({ node: _node, alt, ...props }) => (
    <img {...props} alt={alt ?? ''} loading="lazy" decoding="async" width={1600} height={904} />
  ),
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>()
  const post = slug ? getPostBySlug(slug) : undefined

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navbar />
      <main id="main-content" tabIndex={-1} className="outline-none">
        <div className="flex flex-col items-center justify-center py-40 px-6 text-center">
          <h1 className="font-display text-4xl font-medium tracking-tight text-white mb-4">
            Artikel tidak ditemukan
          </h1>
          <Link to="/blog" className="text-[#00FFFF] hover:underline text-sm">
            Kembali ke Blog
          </Link>
        </div>
        </main>
      <Footer />
      </div>
    )
  }

  const colors = colorMap[post.categoryColor]
  const postUrl = `https://cozybytes.media/blog/${post.slug}`
  // og:image dan schema.org image wajib absolute URL, sedangkan post.image tersimpan relatif
  const ogImage = post.image
    ? `https://cozybytes.media${post.image}`
    : 'https://cozybytes.media/og-image.jpg'

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>{`${post.title} | Cozybytes Media`}</title>
        <meta name="description" content={post.excerpt} />
        <link rel="canonical" href={postUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:url" content={postUrl} />
        <meta property="og:image" content={ogImage} />
        <meta name="twitter:image" content={ogImage} />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.excerpt,
            datePublished: post.date,
            inLanguage: 'id',
            url: postUrl,
            image: ogImage,
            author: { '@type': 'Organization', name: post.author },
            publisher: {
              '@type': 'Organization',
              name: 'Cozybytes Media',
              logo: { '@type': 'ImageObject', url: 'https://cozybytes.media/logo.png' },
            },
            mainEntityOfPage: { '@type': 'WebPage', '@id': postUrl },
          })}
        </script>
      </Helmet>
      <Navbar />

      {/* Hero */}
      <section
        className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-20"
        style={{
          background: post.image ? '#09090B' : `radial-gradient(ellipse 70% 50% at 50% 0%, ${colors.glow} 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(255,255,255,0.02) 0%, transparent 60%), #09090B`,
        }}
      >
        {/* Hero image */}
        {post.image && (
          <>
            <img
              src={post.image}
              alt=""
              width={1600}
              height={904}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-zinc-950/70 to-zinc-950" />
          </>
        )}

        {/* Decorative lines */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
          <div className="absolute top-1/3 left-0 right-0 h-px bg-white" />
          <div className="absolute top-2/3 left-0 right-0 h-px bg-white" />
        </div>

        <div className="relative z-10 mx-auto max-w-3xl px-5 md:px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Back link */}
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold text-white/40 hover:text-white/70 transition-colors mb-8"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Kembali ke Blog
            </Link>

            {/* Category badge */}
            <span className={`inline-block rounded-full border px-3 py-1 text-[10px] font-bold tracking-wider mb-5 ${colors.badge}`}>
              {post.category}
            </span>

            {/* Title */}
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-medium leading-[1.1] tracking-tight mb-6">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-white/40">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                {post.author}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {post.readTime}
              </span>
              <time>
                {new Date(post.date).toLocaleDateString('id-ID', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </time>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Divider */}
      <div className="mx-auto max-w-3xl px-5 md:px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      </div>

      {/* Content */}
      <article className="mx-auto max-w-3xl px-5 md:px-6 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="prose-cozybytes"
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {post.content}
          </ReactMarkdown>
        </motion.div>

        {/* CTA bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 text-center"
        >
          <p className="text-sm text-white/50 mb-4">
            Tertarik dengan layanan kami?
          </p>
          <a
            href="https://wa.me/6285894514719"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex items-center gap-2 text-sm px-6 py-3"
          >
            Konsultasi Gratis
          </a>
        </motion.div>
      </article>

      <Footer />
    </div>
  )
}
