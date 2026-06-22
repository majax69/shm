'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Star } from 'lucide-react'
import { PLANITY_URL } from '@/lib/content'
import { EASE } from '@/lib/motion'
import { MagneticButton } from './magnetic-button'

export function HeroSection() {
  const { scrollYProgress } = useScroll()
  const heroY = useTransform(scrollYProgress, [0, 1], [0, -400])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  return (
    <section className="relative flex min-h-screen items-center px-6 md:px-10 lg:px-32">
      <motion.div style={{ y: heroY, opacity: heroOpacity }} className="mx-auto w-full max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
          <div className="col-span-3 flex flex-col justify-center">
            {/* Badge avec point « live » qui pulse */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: EASE }}
              className="mb-8 inline-flex items-center gap-2.5 self-start text-white/80 text-legible"
            >
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-rose-400 opacity-60" />
                <span className="relative inline-flex size-2.5 rounded-full bg-rose-400" />
              </span>
              <span>SHM · Cils &amp; Ongles</span>
            </motion.div>

            {/* Titre révélé par masque, avec un mot accent en rose */}
            <h1 className="font-playfair text-4xl font-semibold leading-[1.1] tracking-tight text-white text-legible md:text-5xl lg:text-6xl">
              <span className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className="block"
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  transition={{ duration: 0.9, delay: 0.3, ease: EASE }}
                >
                  <span className="text-rose-400">S</span>ublimez votre regard. 
                </motion.span>
              </span>
              
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62, duration: 0.8, ease: EASE }}
              className="mt-6 max-w-lg text-base text-white/80 text-legible md:text-lg"
            >
              Extensions de cils, volume russe, browlift, rehaussement et ongles —
              dans un écrin élégant au cœur de Villeurbanne.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.74, duration: 0.8, ease: EASE }}
              className="mt-10 flex flex-wrap gap-3"
            >
              <MagneticButton
                href={PLANITY_URL}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-white/90"
              >
                Réserver
                <ArrowRight className="size-4" />
              </MagneticButton>

              <MagneticButton
                href="#prestations"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm text-white transition-colors hover:border-rose-400/30 hover:bg-white/5"
              >
                Prestations
              </MagneticButton>
            </motion.div>

            {/* Réassurance discrète : une ligne sobre sous les CTA, sans cadre. */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.95, duration: 0.8, ease: EASE }}
              className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-white/70 text-legible"
            >
              <span className="inline-flex items-center gap-1.5">
                <span className="flex text-rose-400" aria-hidden>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3.5 fill-current" />
                  ))}
                </span>
                <span className="text-white/85">4,8/5</span>
                <span className="text-white/50">(50+ avis)</span>
              </span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" />
              <span>Villeurbanne · Lyon</span>
              <span className="hidden h-3 w-px bg-white/20 sm:block" />
              <span>Ouvert 7j/7</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
