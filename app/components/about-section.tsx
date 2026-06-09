'use client'

import { motion } from 'framer-motion'
import { features } from '@/lib/content'
import { SectionHeading } from './section-heading'

const EASE = [0.22, 1, 0.36, 1] as const

export function AboutSection() {
  return (
    <section id="signature" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 scroll-mt-24">
      <SectionHeading
        eyebrow="Notre signature"
        title="Le soin du détail, l’élégance du naturel."
        description="Chez SHM, la beauté se vit comme une parenthèse. On magnifie votre regard et vos mains avec précision, dans un écrin pensé pour votre confort — pour que vous repartiez rayonnante, jamais surchargée."
      />

      <div className="mt-16 grid  overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
              className="group relative bg-black/20 hover:bg-black/5 border-t first:border-t-0 md:border-t-0 p-8 md:border-l md:first:border-l-0 border-white/5 backdrop-blur-sm transition-colors duration-500"
            >
              <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-rose-400/10 text-rose-400 ring-1 ring-rose-400/20 transition-transform duration-500 group-hover:-translate-y-1">
                <Icon className="size-6" />
              </div>
              <h3 className="font-playfair text-xl font-semibold text-white">
                {feature.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/55">
                {feature.description}
              </p>
            </motion.article>
          )
        })}
      </div>
    </section>
  )
}
