'use client'

import { motion } from 'framer-motion'
import { Calendar, MapPin, Star } from 'lucide-react'
import { openingHours, reviews } from '@/lib/content'
import { SectionHeading } from './section-heading'

export function InfoSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 scroll-mt-24">
      <SectionHeading
        eyebrow="Nous trouver"
        title="On vous attend à Villeurbanne."
        description="Ouvert 7j/7, dans un studio chaleureux au cœur de la ville. Voici nos horaires et ce que pensent nos clientes."
      />

      <div className="mt-16 grid gap-8 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl border border-white/5 bg-black/20 hover:bg-black/5 p-8 backdrop-blur-sm"
        >
          <div className="mb-6 flex size-12 items-center justify-center rounded-xl bg-rose-400/10 text-rose-400 ring-1 ring-rose-400/20">
            <MapPin className="size-6" />
          </div>
          <h2 className="text-2xl font-bold text-white md:text-3xl">Au cœur de Villeurbanne</h2>
          <p className="mt-3 text-white/60">68 Rue Léon Blum, 69100 Villeurbanne.</p>

          <div className="mt-8 space-y-3 text-sm text-white/60">
            {openingHours.map((item) => (
              <div key={item} className="flex items-center gap-3">
                <Calendar className="size-4 text-white/40" />
                {item}
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="rounded-2xl border border-white/5 bg-black/20 hover:bg-black/5 p-8 backdrop-blur-sm"
        >
          <div className="mb-6 flex items-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-xl bg-amber-400/10 ring-1 ring-amber-400/20">
              <Star className="size-6 fill-amber-400 text-amber-400" />
            </div>
            <h2 className="text-2xl font-bold text-white md:text-3xl">Elles recommandent</h2>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review} className="rounded-xl border border-white/5 bg-black/20 hover:bg-black/5 p-4">
                <div className="mb-2 flex gap-1 text-amber-400/80">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-3 fill-current" />
                  ))}
                </div>
                <p className="text-sm text-white/70">&ldquo;{review}&rdquo;</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
