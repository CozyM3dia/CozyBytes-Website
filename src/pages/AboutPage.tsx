import { useRef, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  useReducedMotion,
} from 'framer-motion'
import { MapPin, Users, Sparkles } from 'lucide-react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CTASection from '../sections/CTASection'

const EASE = [0.22, 1, 0.36, 1] as const
const SPRING = { stiffness: 120, damping: 18, mass: 0.6 }

const teamMembers = [
  {
    role: 'Founder',
    name: 'Sibgha Alfirdausi Rambe',
    image: '/team/sibgha-alfirdausi-rambe.png',
    owns: 'Visi & Kreatif',
    desc: 'Mengarahkan visi Cozybytes Media, menjaga standar kreatif, dan memastikan setiap proyek terasa strategis untuk bisnis klien.',
  },
  {
    role: 'Co-Founder',
    name: 'Ubaidillah Rafi Ussalam',
    image: '/team/ubaidillah-rafi-ussalam.png',
    owns: 'Outreach & Marketing',
    desc: 'Menangani research, sales, marketing, dan outreach agar solusi Cozybytes tepat sasaran dan dekat dengan kebutuhan pasar.',
  },
  {
    role: 'Co-Founder',
    name: 'Hanan Ghaffari',
    image: '/team/hanan-ghaffari.png',
    owns: 'Technology',
    desc: 'Memimpin sisi teknis, engineering, dan implementasi website supaya desain yang rapi juga kuat, cepat, dan stabil.',
  },
]

const values = [
  {
    title: 'Personal & Intim',
    desc: 'Karena kami tim kecil, komunikasi jauh lebih luwes. Kami dengar cerita bisnismu seperti partner, bukan sekadar vendor.',
  },
  {
    title: 'Kualitas Premium',
    desc: 'Ukuran tim tidak membatasi standar. Setiap baris kode dan setiap piksel dikerjakan dengan estetika tertinggi.',
  },
  {
    title: 'Fokus pada Hasil',
    desc: 'Desain cantik percuma tanpa konversi. Tiap halaman dioptimasi untuk SEO dan psikologi pengguna.',
  },
]

/* ============ Hero portrait stack (cursor parallax) ============ */
function HeroPortraits() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => { mx.set(0); my.set(0) }

  // Hooks unrolled (fixed 3 layers) to respect rules-of-hooks. Each portrait at its own depth.
  const tx0 = useSpring(useTransform(mx, [-0.5, 0.5], [-22, 22]), SPRING)
  const ty0 = useSpring(useTransform(my, [-0.5, 0.5], [-15, 15]), SPRING)
  const tx1 = useSpring(useTransform(mx, [-0.5, 0.5], [16, -16]), SPRING)
  const ty1 = useSpring(useTransform(my, [-0.5, 0.5], [11, -11]), SPRING)
  const tx2 = useSpring(useTransform(mx, [-0.5, 0.5], [-30, 30]), SPRING)
  const ty2 = useSpring(useTransform(my, [-0.5, 0.5], [-21, 21]), SPRING)
  const layers = [
    { m: teamMembers[0], tx: tx0, ty: ty0 },
    { m: teamMembers[1], tx: tx1, ty: ty1 },
    { m: teamMembers[2], tx: tx2, ty: ty2 },
  ]

  const positions = [
    'left-0 top-6 w-[58%] z-20 rotate-[-5deg]',
    'right-0 top-0 w-[52%] z-10 rotate-[4deg]',
    'left-[22%] bottom-0 w-[56%] z-30 rotate-[2deg]',
  ]

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="relative mx-auto aspect-square w-full max-w-md"
    >
      <div className="pointer-events-none absolute inset-6 rounded-full bg-[#00FFFF]/10 blur-3xl" />
      {layers.map(({ m, tx, ty }, i) => (
        <motion.div
          key={m.name}
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 + i * 0.14, ease: EASE }}
          style={{ x: tx, y: ty }}
          className={`absolute overflow-hidden rounded-2xl border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.6)] ${positions[i]}`}
        >
          <div className="aspect-[4/5] w-full">
            <img
              src={m.image}
              alt={`${m.name}, ${m.role} Cozybytes Media`}
              className="h-full w-full object-cover saturate-[1.05]"
              loading="eager"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/70 via-transparent to-transparent" />
          </div>
        </motion.div>
      ))}
    </div>
  )
}

/* ============ Story image with scroll parallax ============ */
function StoryImage() {
  const reduce = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? ['0%', '0%'] : ['-8%', '8%'])

  return (
    <div ref={ref} className="relative">
      <div className="relative z-10 overflow-hidden rounded-3xl border border-white/10 p-2 backdrop-blur-sm">
        <div className="aspect-[4/5] overflow-hidden rounded-2xl">
          <motion.img
            src="/about_story.png"
            alt="Tim Cozybytes Media sedang bekerja di Bandar Lampung"
            style={{ y, scale: 1.12 }}
            className="h-full w-full object-cover"
          />
        </div>
      </div>
      <div className="pointer-events-none absolute -bottom-10 -left-10 z-0 h-44 w-44 rounded-full bg-[#00FFFF]/20 blur-3xl" />
    </div>
  )
}

/* ============ Team editorial row (photo tilt) ============ */
function TeamRow({ member, index }: { member: (typeof teamMembers)[number]; index: number }) {
  const reduce = useReducedMotion()
  const flipped = index % 2 === 1
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, SPRING)
  const sry = useSpring(ry, SPRING)

  const onMove = (e: React.MouseEvent) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 8)
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 8)
  }
  const onLeave = () => { rx.set(0); ry.set(0) }

  return (
    <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
      {/* Photo */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: flipped ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, ease: EASE }}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`lg:col-span-5 ${flipped ? 'lg:order-2 lg:col-start-8' : ''}`}
        style={{ perspective: 900 }}
      >
        <motion.div
          style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d' }}
          className="group relative overflow-hidden rounded-3xl border border-white/10"
        >
          <div className="aspect-[4/5] w-full">
            <img
              src={member.image}
              alt={`${member.name}, ${member.role}`}
              className="h-full w-full object-cover saturate-[1.05] transition-transform duration-700 group-hover:scale-[1.04]"
              loading="lazy"
            />
          </div>
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
          <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-white/15 bg-black/40 px-3 py-1.5 backdrop-blur-md">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00FFFF]" />
            <span className="font-mono text-[11px] text-white/80">{member.owns}</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={reduce ? false : { opacity: 0, x: flipped ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: '-80px' }}
        transition={{ duration: 0.7, delay: 0.1, ease: EASE }}
        className={`lg:col-span-6 ${flipped ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-[#00FFFF]/70">
          {String(index + 1).padStart(2, '0')} · {member.role}
        </span>
        <h3 className="font-display mt-3 text-3xl font-medium leading-[1.05] tracking-tight text-white md:text-4xl">
          {member.name}
        </h3>
        <p className="mt-4 max-w-md text-base leading-relaxed text-white/55">{member.desc}</p>
      </motion.div>
    </div>
  )
}

/* ============ Value row (hover ignite) ============ */
function ValueRow({ value, index }: { value: (typeof values)[number]; index: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: EASE }}
      className="group relative grid gap-4 py-9 md:grid-cols-12 md:items-baseline md:gap-8"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: 'radial-gradient(ellipse 80% 100% at 0% 50%, rgba(0,255,255,0.06) 0%, transparent 60%)' }}
      />
      <span className="font-mono text-sm font-bold text-[#00FFFF]/50 transition-colors duration-300 group-hover:text-[#00FFFF] md:col-span-1">
        {String(index + 1).padStart(2, '0')}
      </span>
      <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-1 md:col-span-4 md:text-3xl">
        {value.title}
      </h3>
      <p className="text-base leading-relaxed text-white/55 md:col-span-7">{value.desc}</p>
    </motion.div>
  )
}

export default function AboutPage() {
  const reduce = useReducedMotion()
  const [hoverFact, setHoverFact] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-950 text-white/90">
      <Helmet>
        <title>Tentang Kami | Cozybytes Media</title>
        <meta name="description" content="Kenalan dengan tim di balik Cozybytes Media. Kami studio web kecil dari Bandar Lampung yang membantu UMKM dan bisnis lokal tampil profesional di internet." />
        <link rel="canonical" href="https://cozybytes.media/about" />
        <meta property="og:title" content="Tentang Kami | Cozybytes Media" />
        <meta property="og:description" content="Kenalan dengan tim di balik Cozybytes Media. Studio web dari Bandar Lampung yang membantu UMKM tampil profesional di internet." />
        <meta property="og:url" content="https://cozybytes.media/about" />
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'Tentang Cozybytes Media',
            url: 'https://cozybytes.media/about',
            mainEntity: {
              '@type': 'Organization',
              name: 'Cozybytes Media',
              url: 'https://cozybytes.media',
              member: teamMembers.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role })),
            },
          })}
        </script>
      </Helmet>
      <Navbar />

      {/* ============ HERO: asymmetric, portrait stack ============ */}
      <section className="relative overflow-hidden px-6 pb-24 pt-36 md:pt-44">
        <div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background: 'radial-gradient(ellipse 70% 50% at 70% 0%, rgba(0,255,255,0.12) 0%, transparent 65%)' }}
        />
        <div
          className="pointer-events-none absolute inset-0 z-0 opacity-[0.4]"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.05) 1px, transparent 1px)',
            backgroundSize: '26px 26px',
            maskImage: 'radial-gradient(ellipse 60% 55% at 35% 40%, black 5%, transparent 75%)',
            WebkitMaskImage: 'radial-gradient(ellipse 60% 55% at 35% 40%, black 5%, transparent 75%)',
          }}
        />

        <div className="relative z-10 mx-auto grid max-w-6xl items-center gap-14 lg:grid-cols-12 lg:gap-10">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7"
          >
            <span className="mb-6 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Tentang Kami
            </span>
            <h1 className="font-display text-[2.8rem] font-medium leading-[1.0] tracking-tight sm:text-6xl lg:text-[4.6rem]">
              Tiga kepala.
              <br />
              Satu visi.
              <br />
              <span className="text-[#00FFFF]">Dari Lampung untuk Indonesia.</span>
            </h1>
            <p className="mt-7 max-w-md text-lg leading-relaxed text-white/60">
              Tim kecil dengan mimpi besar: bantu UMKM dan bisnis melangkah percaya diri di dunia digital.
            </p>

            {/* meta facts */}
            <div className="mt-9 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/45">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} /> Bandar Lampung
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} /> 3 founder
              </span>
              <span
                className="flex cursor-default items-center gap-2"
                onMouseEnter={() => setHoverFact(true)}
                onMouseLeave={() => setHoverFact(false)}
              >
                <Sparkles className="h-4 w-4 text-[#00FFFF]/60" strokeWidth={1.5} />
                <span className={hoverFact ? 'text-[#00FFFF]' : ''}>Standar kelas dunia</span>
              </span>
            </div>
          </motion.div>

          <div className="lg:col-span-5">
            <HeroPortraits />
          </div>
        </div>
      </section>

      {/* ============ STORY: editorial + parallax image ============ */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.7, ease: EASE }}
            className="lg:col-span-7 lg:order-2"
          >
            <h2 className="font-display text-3xl font-medium leading-[1.1] tracking-tight md:text-5xl">
              Berawal dari semangat
              <br />
              yang sama.
            </h2>
            <div className="mt-7 space-y-5 text-lg font-light leading-relaxed text-white/65">
              <p>
                Di <strong className="font-medium text-white/90">Bandar Lampung</strong>, Cozybytes Media lahir dari tiga pemuda yang percaya setiap bisnis, sekecil apa pun, berhak punya representasi digital yang premium.
              </p>
              <p>
                Sebagai tim yang juga merintis, kami paham betul tantangan UMKM dan startup lokal. Anggaran terbatas sering jadi penghalang website berkualitas. Di situlah kami hadir, menjembatani jaraknya.
              </p>
              <p>
                Kami gabungkan estetika modern, keahlian teknis (SEO & UI/UX), dan copywriting yang berpusat pada konversi. Bukan sekadar bikin website, kami merancang <span className="text-[#00FFFF]">aset digital</span> yang bekerja siang-malam untukmu.
              </p>
            </div>
          </motion.div>

          <div className="lg:col-span-5 lg:order-1">
            <StoryImage />
          </div>
        </div>
      </section>

      {/* ============ TEAM: alternating editorial rows ============ */}
      <section className="relative overflow-hidden px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: EASE }}
            className="mb-20 max-w-2xl"
          >
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Tim Kami
            </span>
            <h2 className="font-display text-4xl font-medium leading-[1.08] tracking-tight md:text-5xl">
              Orang di balik
              <br />
              <span className="text-[#00FFFF]">setiap piksel.</span>
            </h2>
          </motion.div>

          <div className="space-y-14 md:space-y-32">
            {teamMembers.map((member, i) => (
              <TeamRow key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ VALUES: numbered manifesto ============ */}
      <section className="relative px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, ease: EASE }}
              className="lg:col-span-4"
            >
              <div className="lg:sticky lg:top-32">
                <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
                  Nilai Kami
                </span>
                <h2 className="font-display text-3xl font-medium leading-[1.08] tracking-tight md:text-4xl">
                  Tiga prinsip
                  <br />
                  yang kami pegang.
                </h2>
              </div>
            </motion.div>

            <div className="divide-y divide-white/[0.08] border-y border-white/[0.08] lg:col-span-8">
              {values.map((value, i) => (
                <ValueRow key={value.title} value={value} index={i} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection />
      <Footer />
    </div>
  )
}
