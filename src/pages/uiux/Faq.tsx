import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'
import { EASE, faqs, WA_LINK } from './data'
import { Reveal, SectionHeading } from '../../components/section/motion'

/** Ikon plus yang bermorf jadi minus â€” dua garis, satu berputar. */
function PlusMinus({ open }: { open: boolean }) {
  return (
    <span
      aria-hidden
      className={`relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border transition-colors duration-300 ${
        open
          ? 'border-[#00FFFF]/45 bg-[#00FFFF]/10'
          : 'border-white/12 bg-white/[0.02] group-hover:border-[#00FFFF]/30'
      }`}
    >
      <span
        className={`absolute h-px w-3 transition-colors duration-300 ${open ? 'bg-[#00FFFF]' : 'bg-white/55'}`}
      />
      <motion.span
        className={`absolute h-px w-3 ${open ? 'bg-[#00FFFF]' : 'bg-white/55'}`}
        animate={{ rotate: open ? 0 : 90 }}
        transition={{ duration: 0.32, ease: EASE }}
      />
    </span>
  )
}

function FaqRow({
  q,
  a,
  index,
  open,
  onToggle,
}: {
  q: string
  a: string
  index: number
  open: boolean
  onToggle: () => void
}) {
  const panelId = `uiux-faq-panel-${index}`
  const buttonId = `uiux-faq-button-${index}`

  return (
    <div className="group relative border-b border-white/[0.07]">
      <span
        aria-hidden
        className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ${
          open ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background: 'linear-gradient(to right, rgba(0,255,255,0.045) 0%, transparent 55%)',
        }}
      />
      <span
        aria-hidden
        className={`pointer-events-none absolute left-0 top-0 w-px bg-[#00FFFF]/50 transition-all duration-500 ${
          open ? 'h-full opacity-100' : 'h-0 opacity-0'
        }`}
      />

      <h3>
        <button
          id={buttonId}
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="relative flex w-full items-start gap-4 px-1 py-6 text-left md:gap-6 md:px-4"
        >
          <span
            className={`mt-1 font-mono text-[11px] tabular-nums transition-colors duration-300 ${
              open ? 'text-[#00FFFF]' : 'text-white/30'
            }`}
          >
            {String(index + 1).padStart(2, '0')}
          </span>
          <span
            className={`flex-1 text-[15px] font-semibold leading-snug transition-colors duration-300 md:text-base ${
              open ? 'text-white' : 'text-white/85 group-hover:text-white'
            }`}
          >
            {q}
          </span>
          <PlusMinus open={open} />
        </button>
      </h3>

      {/*
        Panel tetap ter-mount (height 0 saat tertutup) supaya isi jawaban
        selalu ada di HTML â€” penting karena FAQ ini juga dipakai untuk
        FAQPage schema. initial={false} mencegah animasi saat load pertama.
      */}
      <motion.div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        transition={{
          height: { duration: 0.38, ease: EASE },
          opacity: { duration: open ? 0.3 : 0.15, delay: open ? 0.08 : 0 },
        }}
        className="relative overflow-hidden"
      >
        <p className="pb-7 pl-1 pr-2 text-sm leading-relaxed text-white/50 md:pl-[4.6rem] md:pr-16">
          {a}
        </p>
      </motion.div>
    </div>
  )
}

export default function Faq() {
  const [active, setActive] = useState<number | null>(0)

  return (
    <section className="relative py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-32">
              <SectionHeading
                index="07"
                eyebrow="Tanya Jawab"
                title={
                  <>
                    Pertanyaan seputar{' '}
                    <span className="font-serif italic text-[#00FFFF]">desain UI/UX.</span>
                  </>
                }
              />

              <Reveal delay={0.14}>
                <div className="mt-10 rounded-2xl border border-white/[0.08] bg-white/[0.015] p-5">
                  <p className="text-sm leading-relaxed text-white/50">
                    Pertanyaan Anda belum terjawab di sini?
                  </p>
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#00FFFF] transition-opacity hover:opacity-75"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Tanya langsung ke tim kami
                  </a>
                </div>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-8">
            <Reveal>
              <div className="border-t border-white/[0.07]">
                {faqs.map((faq, i) => (
                  <FaqRow
                    key={faq.q}
                    q={faq.q}
                    a={faq.a}
                    index={i}
                    open={active === i}
                    onToggle={() => setActive(active === i ? null : i)}
                  />
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
