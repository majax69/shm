'use client'

import { motion } from 'framer-motion'
import { steps } from '@/lib/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from './section-heading'

export function ProcessSection() {
  return (
    <section id="parcours" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Le déroulé"
        title="Trois étapes, zéro stress."
        description="De la réservation au résultat final, tout est pensé pour être simple et serein."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="relative mt-14 grid gap-12 md:mt-16 md:grid-cols-3 md:gap-8"
      >
        {/* Ligne de liaison sur desktop */}
        <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-white/15 to-transparent md:block" />

        {steps.map((step) => {
          const Icon = step.icon
          return (
            <motion.div
              key={step.step}
              variants={staggerItem}
              className="relative flex flex-col items-center text-center"
            >
              <div className="relative z-10 flex size-14 items-center justify-center rounded-full border border-rose-400/30 bg-black text-rose-400">
                <Icon className="size-6" />
              </div>
              <span className="mt-6 font-playfair text-sm tracking-[0.3em] text-rose-400 text-legible-strong">
                {step.step}
              </span>
              <h3 className="mt-2 text-xl font-semibold text-white">{step.title}</h3>
              <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/55">
                {step.description}
              </p>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
