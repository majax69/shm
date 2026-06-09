'use client'

import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { PLANITY_URL } from '@/lib/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { MagneticButton } from './magnetic-button'

export function CtaSection() {
  return (
    <section className="px-6 py-16 md:px-12 md:py-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="text-center backdrop-blur-sm"
        >
          <motion.p
            variants={staggerItem}
            className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400 text-legible-strong"
          >
            Réservation instantanée
          </motion.p>

          <motion.h2
            variants={staggerItem}
            className="text-3xl font-bold text-white md:text-5xl"
          >
            Votre prochain regard commence ici.
          </motion.h2>

          <motion.p
            variants={staggerItem}
            className="mx-auto mt-4 max-w-xl text-base text-white/60 md:text-lg"
          >
            Réservez en ligne 24h/24 avec confirmation immédiate.
          </motion.p>

          <motion.div variants={staggerItem} className="mt-8">
            <MagneticButton
              href={PLANITY_URL}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-3 rounded-full bg-rose-400 px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-pink-600"
            >
              Prendre rendez-vous
              <ArrowRight className="size-4" />
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
