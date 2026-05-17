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

function TimelineNode({ index }: { index: number }) {
  return (
    <div className="absolute left-5 md:left-1/2 -translate-x-1/2 z-10" style={{ top: 28 }}>
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
      >
        <div
          className="w-4 h-4 rounded-full relative"
          style={{
            background: '#00FFFF',
            boxShadow: '0 0 16px rgba(0,255,255,0.7), 0 0 40px rgba(0,255,255,0.3)',
          }}
        >
          <div
            className="absolute -inset-2 rounded-full animate-ping"
            style={{
              background: 'rgba(0,255,255,0.15)',
              animationDuration: `${2 + index * 0.5}s`,
            }}
          />
        </div>
      </motion.div>
    </div>
  )
}

function StepCard({
  step,
  index,
}: {
  step: (typeof steps)[0]
  index: number
}) {
  const isLeft = index % 2 === 0
  const Icon = step.icon

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -60 : 60, y: 20 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.1,
      }}
      className="relative"
    >
      <TimelineNode index={index} />

      {/* Horizontal connector — desktop only */}
      <div
        className={`hidden md:block absolute top-[34px] w-[calc(50%-3.5rem)] h-px ${
          isLeft ? 'right-[50%] mr-2' : 'left-[50%] ml-2'
        }`}
      >
        <div
          className="w-full h-full"
          style={{
            background: `linear-gradient(${
              isLeft ? 'to left' : 'to right'
            }, rgba(0,255,255,0.35), rgba(0,255,255,0))`,
          }}
        />
      </div>

      {/* Card — left-aligned on mobile, alternating on desktop */}
      <div
        className={`ml-14 md:ml-0 md:w-[calc(50%-3.5rem)] ${
          isLeft ? 'md:mr-auto' : 'md:ml-auto'
        }`}
      >
        <div className="liquid-glass rounded-2xl p-7 relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 cursor-default">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(0,255,255,0.08),transparent_34%),linear-gradient(135deg,rgba(255,255,255,0.035),transparent_42%)] opacity-80" />
          {/* Giant watermark number */}
          <div
            className="absolute -bottom-6 right-6 pointer-events-none select-none"
            style={{
              fontSize: 120,
              color: 'rgba(0,255,255,0.035)',
              fontFamily: '"Instrument Serif", serif',
              lineHeight: 1,
            }}
          >
            {step.num}
          </div>

          {/* Hover glow */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"
            style={{
              background:
                'radial-gradient(circle at 50% 50%, rgba(0,255,255,0.06) 0%, transparent 70%)',
            }}
          />

          <div className="relative z-10">
            <div
              className="w-11 h-11 rounded-xl flex items-center justify-center mb-5"
              style={{
                background: 'rgba(0,255,255,0.08)',
                border: '1px solid rgba(0,255,255,0.2)',
              }}
            >
              <Icon className="w-5 h-5 text-[#00FFFF]" />
            </div>
            <h3
              className="text-white font-bold text-lg mb-2"
              style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}
            >
              {step.title}
            </h3>
            <p className="text-white/50 text-sm leading-relaxed">{step.desc}</p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function ProcessSection() {
  const sectionRef = useRef(null)
  const inView = useInView(sectionRef, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 70%', 'end 40%'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="cara-kerja"
      ref={sectionRef}
      className="py-28 relative overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none bg-zinc-950"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.25]"
        aria-hidden="true"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, rgba(0,255,255,0.2), rgba(0,255,255,0.2) 1px, transparent 1px, transparent 16px)',
          maskImage: 'radial-gradient(ellipse 90% 90% at 50% 50%, black 10%, transparent 90%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-[#00FFFF] text-xs font-semibold tracking-widest uppercase mb-3 block">
            Cara Kerja
          </span>
          <h2
            className="text-4xl md:text-5xl leading-tight"
            style={{ fontFamily: '"Instrument Serif", serif' }}
          >
            Proses <em className="text-[#00FFFF] italic">Anti-Ribet</em>
          </h2>
        </motion.div>

        {/* Timeline container */}
        <div className="relative rounded-[32px] border border-white/[0.04] bg-zinc-950/20 p-3 md:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.35)]">
          <div
            className="pointer-events-none absolute inset-0 rounded-[32px]"
            aria-hidden="true"
            style={{
              background:
                'linear-gradient(90deg, rgba(0,255,255,0.045), transparent 28%, transparent 72%, rgba(248,209,106,0.04))',
            }}
          />
          {/* Background line */}
          <div className="absolute left-8 md:left-1/2 -translate-x-px top-8 bottom-8 w-px bg-white/[0.06]" />

          {/* Animated fill line */}
          <motion.div
            className="absolute left-8 md:left-1/2 -translate-x-px top-8 w-px origin-top"
            style={{
              height: lineHeight,
              background:
                'linear-gradient(to bottom, #00FFFF, rgba(0,255,255,0.2))',
              boxShadow: '0 0 8px rgba(0,255,255,0.4)',
            }}
          />

          <div className="relative z-10 flex flex-col gap-16 py-5 md:gap-24 md:py-2">
            {steps.map((step, i) => (
              <StepCard key={step.num} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
