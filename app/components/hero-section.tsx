'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock, MapPin, Star, type LucideIcon } from 'lucide-react'
import { PLANITY_URL } from '@/lib/content'
import { MagneticButton } from './magnetic-button'

const EASE = [0.22, 1, 0.36, 1] as const





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
          </div>

          {/* Cards de réassurance, entrée en cascade + survol soigné */}
       
      
        </div>
      </motion.div>
    </section>
  )
}
