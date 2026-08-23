import { motion } from 'framer-motion'
import { Sparkles, Search, PenLine, Zap, ArrowUpRight } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { EASE } from './shared'
import { SectionLabel, Reveal } from './ui'

interface Capability {
  Icon: LucideIcon
  title: string
  desc: string
}

const capabilities: Capability[] = [
  {
    Icon: Sparkles,
    title: 'Estetika Modern',
    desc: 'Antarmuka yang dirancang seperti majalah premium — tipografi, ritme, dan ruang yang tepat.',
  },
  {
    Icon: Search,
    title: 'SEO & UI/UX',
    desc: 'Struktur teknis dan pengalaman pengguna yang membuat bisnismu mudah ditemukan, sulit dilupakan.',
  },
  {
    Icon: PenLine,
    title: 'Copywriting Konversi',
    desc: 'Kata-kata yang menjual tanpa terdengar menjual. Setiap kalimat mengarahkan pengunjung untuk bertindak.',
  },
  {
    Icon: Zap,
    title: 'Engineering Cepat & Stabil',
    desc: 'Website yang dimuat sekejap, kokoh di semua perangkat, dan siap tumbuh bersama bisnismu.',
  },
]

export default function Craft() {
  return (
    <section id="craft" className="relative px-6 py-28 md:py-36">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <SectionLabel index="02" title="Kekuatan Kami" />
          <h2 className="font-display font-medium tracking-tight text-4xl leading-[1.05] md:text-5xl">
            Yang kami bawa
            <br />
            <span className="font-serif italic text-[#00FFFF]">ke meja kerja.</span>
          </h2>
        </Reveal>

        <div className="mt-16">
          <div className="border-b border-white/[0.08]">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.7, delay: i * 0.09, ease: EASE }}
                className="group relative grid grid-cols-12 items-center gap-4 border-t border-white/[0.08] py-8 md:py-10"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 100% at 0% 50%, rgba(0,255,255,0.07) 0%, transparent 65%)',
                  }}
                />

                <div className="relative col-span-2 font-mono text-sm font-bold text-[#00FFFF]/40 transition-colors group-hover:text-[#00FFFF] md:col-span-1">
                  {String(i + 1).padStart(2, '0')}
                </div>

                <div className="relative col-span-10 flex items-center gap-4 md:col-span-5">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] transition-all group-hover:border-[#00FFFF]/40">
                    <cap.Icon
                      className="h-5 w-5 text-white/60 transition-all group-hover:text-[#00FFFF]"
                      strokeWidth={1.5}
                    />
                  </span>
                  <h3 className="font-display text-2xl font-medium tracking-tight text-white transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                    {cap.title}
                  </h3>
                </div>

                <p className="relative col-span-12 max-w-md text-[15px] leading-relaxed text-white/55 order-last md:order-none md:col-span-5">
                  {cap.desc}
                </p>

                <div className="relative hidden justify-end md:flex md:col-span-1">
                  <ArrowUpRight
                    className="h-6 w-6 -translate-x-2 translate-y-2 text-[#00FFFF] opacity-0 transition-all duration-[400ms] group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                    strokeWidth={1.5}
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-10 font-mono text-[11px] uppercase tracking-[0.25em] text-white/30">
          Empat disiplin · satu tim · nol vendor berantai
        </p>
      </div>
    </section>
  )
}
