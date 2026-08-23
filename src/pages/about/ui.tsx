import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { EASE } from './shared'

export function SectionLabel({ index, title }: { index: string; title: string }) {
  return (
    <span className="mb-6 flex items-center gap-4">
      <span className="font-mono text-xs font-bold text-[#00FFFF]">{index}</span>
      <span className="h-px w-12 bg-gradient-to-r from-[#00FFFF]/60 to-transparent" />
      <span className="text-xs font-semibold uppercase tracking-[0.25em] text-white/40">
        {title}
      </span>
    </span>
  )
}

interface RevealProps {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
  once?: boolean
}

export function Reveal({ children, delay = 0, y = 30, className, once = true }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.7, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
