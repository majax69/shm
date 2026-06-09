'use client'

import { motion } from 'framer-motion'
import { features } from '@/lib/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from './section-heading'

export function AboutSection() {
  return (
    <section id="signature" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Notre signature"
        title="Le soin du détail, l’élégance du naturel."
        description="Chez SHM, la beauté se vit comme une parenthèse. On magnifie votre regard et vos mains avec précision, dans un écrin pensé pour votre confort — pour que vous repartiez rayonnante, jamais surchargée."
      />

      <motion.div
        variants={staggerContainer()}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 grid overflow-hidden rounded-2xl border border-white/5 bg-white/5 sm:grid-cols-2 lg:grid-cols-4 md:mt-16"
      >
        {features.map((feature) => {
          const Icon = feature.icon
          return (
            <motion.article
              key={feature.title}
              variants={staggerItem}
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
      </motion.div>
    </section>
  )
}
