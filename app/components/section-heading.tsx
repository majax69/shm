'use client'

import { motion } from 'framer-motion'
import { EASE, VIEWPORT } from '@/lib/motion'

type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center'

  return (
    <div
      className={`max-w-4xl ${isCenter ? 'mx-auto text-center' : ''} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.6, ease: EASE }}
        className={`mb-5 flex items-center gap-3 ${isCenter ? 'justify-center' : ''}`}
      >
        <span className="h-px w-8 bg-rose-400/70" />
        <span className="text-xs font-semibold uppercase tracking-[0.35em] text-rose-400 text-legible-strong">
          {eyebrow}
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={VIEWPORT}
        transition={{ duration: 0.7, delay: 0.05, ease: EASE }}
        className="font-playfair text-3xl font-semibold leading-[1.1] tracking-tight text-white text-legible md:text-4xl lg:text-5xl"
      >
        {title}
      </motion.h2>

      {description && (
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className={`mt-6 text-base leading-relaxed text-white/75 text-legible md:text-lg ${
            isCenter ? 'mx-auto max-w-2xl' : 'max-w-xl'
          }`}
        >
          {description}
        </motion.p>
      )}
    </div>
  )
}
