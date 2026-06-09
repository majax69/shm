'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import { faqs } from '@/lib/content'
import { EASE, staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from './section-heading'

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Questions fréquentes"
        title="Tout ce qu'il faut savoir avant de venir."
        description="Une dernière hésitation ? Voici les réponses aux questions que l'on nous pose le plus souvent."
      />

      <motion.div
        variants={staggerContainer(0.06)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 max-w-3xl divide-y divide-white/10 border-y border-white/10 md:mt-16"
      >
        {faqs.map((faq, index) => {
          const isOpen = open === index
          const panelId = `faq-panel-${index}`
          const buttonId = `faq-button-${index}`

          return (
            <motion.div key={faq.question} variants={staggerItem}>
              <h3>
                <button
                  id={buttonId}
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpen(isOpen ? null : index)}
                  className="flex min-h-11 w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-white transition-colors hover:text-rose-300 md:text-lg"
                >
                  <span>{faq.question}</span>
                  <Plus
                    className={`size-5 shrink-0 text-rose-400 transition-transform duration-300 ${
                      isOpen ? 'rotate-45' : ''
                    }`}
                  />
                </button>
              </h3>

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 pr-10 text-sm leading-relaxed text-white/75 md:text-base">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
