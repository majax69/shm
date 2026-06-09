'use client'

import { motion } from 'framer-motion'
import { MapPin, Phone } from 'lucide-react'
import {
  BUSINESS,
  GOOGLE_MAPS_EMBED,
  GOOGLE_MAPS_LINK,
  openingHours,
} from '@/lib/content'
import { transition, VIEWPORT } from '@/lib/motion'
import { ReviewsCarousel } from './reviews-carousel'
import { SectionHeading } from './section-heading'

export function InfoSection() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Nous retrouver"
        title="On vous attend à Villeurbanne."
        description="Ouvert 7j/7, dans un studio chaleureux au cœur de la ville. Voici comment nous joindre et nous rejoindre."
      />

      <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16 md:mt-16">
        {/* Coordonnées — éditorial, sans cadre */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={transition()}
          className="lg:self-center"
        >
          <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
            <MapPin className="size-4" />
            L’adresse
          </p>
          <p className="mt-4 font-playfair text-3xl leading-tight text-white md:text-4xl">
            {BUSINESS.street}
            <br />
            {BUSINESS.postalCode} {BUSINESS.city}
          </p>

          <dl className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {openingHours.map((item) => {
              const [day, hours] = item.split(' : ')
              return (
                <div key={item} className="flex items-baseline justify-between gap-4 py-3.5">
                  <dt className="text-sm text-white/55">{day}</dt>
                  <dd className="text-sm font-medium text-white tabular-nums">{hours}</dd>
                </div>
              )
            })}
          </dl>

          <div className="mt-10 flex flex-wrap gap-3">
            <a
              href={`tel:${BUSINESS.phoneHref}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
            >
              <Phone className="size-4" />
              {BUSINESS.phoneDisplay}
            </a>
            <a
              href={GOOGLE_MAPS_LINK}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-6 text-sm font-medium text-white transition-colors hover:border-rose-400/40 hover:bg-white/5"
            >
              <MapPin className="size-4 text-rose-400" />
              Itinéraire
            </a>
          </div>
        </motion.div>

        {/* Carte — grand visuel encadré, rendu sombre via filtre CSS, lazy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={VIEWPORT}
          transition={transition(0.1)}
          className="relative overflow-hidden p-1 rounded-xl"
        >
          {/* invert + hue-rotate = thème sombre sans clé API Google */}
          <iframe
            title="Localisation de SHM à Villeurbanne"
            src={GOOGLE_MAPS_EMBED}

            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full border-0 rounded-xl filter-[invert(0.92)_hue-rotate(180deg)_brightness(0.95)_contrast(0.9)_saturate(0.8)] h-100"
          />

          {/* Label posé sur la carte (hors filtre, donc couleurs correctes) */}
          <div className="pointer-events-none absolute left-3 top-3 inline-flex items-center gap-2 bg-[#1e1e1e] p-2 text-xs font-medium text-white backdrop-blur-md">
            <MapPin className="size-3.5 text-rose-400" />
            SHM · {BUSINESS.city}
          </div>

          {/* Léger fondu sur les bords pour intégrer la carte au fond sombre */}
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        </motion.div>
      </div>

      {/* Avis — carousel */}
      <div className="mt-20 border-t border-white/10 pt-14 md:mt-24 md:pt-16">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-400">
              Avis clientes
            </p>
            <h2 className="mt-3 font-playfair text-3xl text-white md:text-4xl">
              Elles le disent mieux que nous.
            </h2>
          </div>
          <span className="text-sm text-white/55">4,8/5 · plus de 50 avis Google</span>
        </div>
        <ReviewsCarousel />
      </div>
    </section>
  )
}
