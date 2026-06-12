import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { MessageCircle, Palette, CheckCircle, Rocket } from 'lucide-react'

const steps = [
  {
    num: '01',
    icon: MessageCircle,
    title: 'Ngobrol Santai',
    desc: 'Ceritakan kebutuhan bisnis kamu via WhatsApp. Kita diskusi santai tanpa tekanan.',
  },
  {
    num: '02',
    icon: Palette,
    title: 'Desain & Coding',
    desc: 'Tim kami langsung action: desain mockup, revisi, dan coding dengan teknologi modern.',
  },
  {
    num: '03',
    icon: CheckCircle,
    title: 'Review Bebas Pusing',
    desc: 'Kamu review hasilnya, request perubahan sesuka hati. Revisi tidak dibatasi.',
  },
  {
    num: '04',
    icon: Rocket,
    title: 'Go Live!',
    desc: 'Website kamu tayang! Kami bantu deploy, setting domain, dan pastikan semua berjalan lancar.',
  },
]

function StepCell({ step, index }: { step: (typeof steps)[0]; index: number }) {
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col px-6 pb-10 pt-12 transition-colors duration-500 md:pb-14 md:pt-16 lg:px-9"
    >
      {/* Hover ignition */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(0,255,255,0.09) 0%, transparent 65%)',
        }}
      />

      {/* Node on the rail */}
      <div className="absolute left-6 top-0 -translate-y-1/2 lg:left-9">
        <div className="h-3 w-3 rounded-full border-2 border-zinc-950 bg-[#00FFFF] shadow-[0_0_14px_rgba(0,255,255,0.65)] transition-transform duration-500 group-hover:scale-125" />
      </div>

      {/* Ghost number */}
      <span
        className="font-display pointer-events-none select-none text-[5.5rem] font-semibold leading-none tracking-tight text-transparent transition-colors duration-500 md:text-[6.5rem]"
        style={{ WebkitTextStroke: '1.5px rgba(255,255,255,0.13)' }}
      >
        <span className="transition-opacity duration-500 group-hover:opacity-0">{step.num}</span>
        <span
          className="absolute left-6 top-12 opacity-0 transition-opacity duration-500 group-hover:opacity-100 md:top-16 lg:left-9"
          style={{ WebkitTextStroke: '1.5px rgba(0,255,255,0.55)' }}
        >
          {step.num}
        </span>
      </span>

      <div className="relative mt-8 flex flex-1 flex-col">
        <div
          className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl transition-all duration-500 group-hover:shadow-[0_0_22px_rgba(0,255,255,0.25)]"
          style={{
            background: 'rgba(0,255,255,0.08)',
            border: '1px solid rgba(0,255,255,0.2)',
          }}
        >
          <Icon className="h-5 w-5 text-[#00FFFF]" />
        </div>
        <h3 className="font-display text-xl font-medium text-white transition-colors duration-300 group-hover:text-[#00FFFF]">
          {step.title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-white/50">{step.desc}</p>
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const railRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: railRef,
    offset: ['start 85%', 'start 35%'],
  })
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1])

  return (
    <section id="cara-kerja" ref={sectionRef} className="relative overflow-hidden bg-zinc-950 py-28 md:py-36">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 50% 40% at 85% 10%, rgba(0,255,255,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 flex flex-wrap items-end justify-between gap-6 md:mb-20"
        >
          <div>
            <span className="mb-4 inline-block border-l-2 border-[#00FFFF] pl-3 text-xs font-semibold uppercase tracking-[0.2em] text-[#00FFFF]">
              Cara Kerja
            </span>
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-white md:text-5xl">
              Empat langkah.
              <br />
              <span className="text-[#00FFFF]">Tanpa ribet.</span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-white/45">
            Dari chat pertama sampai website tayang, kamu selalu tahu prosesnya sampai di mana.
          </p>
        </motion.div>

        {/* Step rail */}
        <div ref={railRef} className="relative">
          {/* Base rail (desktop: horizontal top, mobile: vertical left) */}
          <div className="absolute left-0 right-0 top-0 hidden h-px bg-white/[0.08] md:block" />
          <div className="absolute bottom-0 left-0 top-0 w-px bg-white/[0.08] md:hidden" />

          {/* Animated draw line */}
          <motion.div
            className="absolute left-0 right-0 top-0 hidden h-px origin-left md:block"
            style={{
              scaleX: lineScale,
              background: 'linear-gradient(to right, #00FFFF, rgba(0,255,255,0.25))',
              boxShadow: '0 0 10px rgba(0,255,255,0.5)',
            }}
          />
          <motion.div
            className="absolute bottom-0 left-0 top-0 w-px origin-top md:hidden"
            style={{
              scaleY: lineScale,
              background: 'linear-gradient(to bottom, #00FFFF, rgba(0,255,255,0.25))',
              boxShadow: '0 0 10px rgba(0,255,255,0.5)',
            }}
          />

          <div className="grid md:grid-cols-4 md:divide-x md:divide-white/[0.07]">
            {steps.map((step, i) => (
              <StepCell key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
