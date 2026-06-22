'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import Image from 'next/image'
import { categories, PLANITY_URL, services, type CategoryId } from '@/lib/content'
import { EASE, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from './section-heading'

type ServicesSectionProps = {
  activeCategory: CategoryId
  onSelectCategory: (category: CategoryId) => void
}

export function ServicesSection({ activeCategory, onSelectCategory }: ServicesSectionProps) {
  const active = categories.find((c) => c.id === activeCategory) ?? categories[0]
  const list = services.filter((service) => service.category === activeCategory)

  return (
    <section id="prestations" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Prestations"
        title="Des soins élégants, des tarifs limpides."
        description="Cils, ongles, sourcils et épilation : choisissez une catégorie pour découvrir nos prestations, leur durée et leur prix."
      />

      <div className="mt-14 grid items-start gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Visuel d'ambiance — change en fondu au changement de catégorie */}
        <div className="lg:sticky lg:top-28">
          <div className="relative aspect-square w-full overflow-hidden rounded-xl sm:aspect-5/4 lg:aspect-square">
            <AnimatePresence initial={false}>
              <motion.div
                key={active.id}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7, ease: EASE }}
                className="absolute inset-0"
              >
                <Image
                  src={active.image}
                  alt={`Prestation ${active.name} chez SHM`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </motion.div>
            </AnimatePresence>

            {/* Dégradé pour la lisibilité du texte */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

            {/* Légende */}
            <div className="absolute inset-x-0 bottom-0 p-7 md:p-8">
              <span className="text-xs font-semibold uppercase tracking-[0.3em] text-rose-300">
                {list.length} prestation{list.length > 1 ? 's' : ''}
              </span>
              <p className="mt-2 max-w-sm font-playfair text-2xl leading-snug text-white md:text-3xl">
                {active.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Onglets + menu de soins éditorial */}
        <div>
          <div
            role="tablist"
            aria-label="Catégories de prestations"
            className="flex gap-7 overflow-x-auto border-b border-white/10 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:gap-9"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category.id
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`tab-${category.id}`}
                  aria-selected={isActive}
                  aria-controls={`panel-${category.id}`}
                  onClick={() => onSelectCategory(category.id)}
                  className={`relative min-h-11 shrink-0 whitespace-nowrap pb-3 text-sm font-medium transition-colors cursor-pointer md:text-base ${
                    isActive ? 'text-white' : 'text-white/50 hover:text-white/80'
                  }`}
                >
                  {category.name}
                  {isActive && (
                    <motion.span
                      layoutId="services-tab-underline"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                      className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-rose-400"
                    />
                  )}
                </button>
              )
            })}
          </div>

          <ul
            role="tabpanel"
            id={`panel-${activeCategory}`}
            aria-labelledby={`tab-${activeCategory}`}
            aria-live="polite"
            className="divide-y divide-white/10"
          >
            {list.map((service, index) => (
              <motion.li
                key={service.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={VIEWPORT}
                transition={{ delay: index * 0.06, duration: 0.55, ease: EASE }}
              >
                <a
                  href={PLANITY_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Réserver : ${service.name}, ${service.duration}, ${service.price}`}
                  className="group flex items-baseline gap-5 py-5 md:gap-8"
                >
                  <div className="min-w-0 flex-1">
                    <h3 className="font-playfair text-xl text-white transition-colors group-hover:text-rose-300 md:text-2xl">
                      <span className="bg-[linear-gradient(var(--color-rose-400),var(--color-rose-400))] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-300 group-hover:bg-[length:100%_1px]">
                        {service.name}
                      </span>
                    </h3>
                    <p className="mt-1.5 flex items-center gap-2 text-sm text-white/45">
                      <Clock className="size-3.5" />
                      {service.duration}
                    </p>
                  </div>

                  <div className="flex shrink-0 items-baseline gap-4">
                    <span className="font-playfair text-xl text-white md:text-2xl">{service.price}</span>
                    <ArrowRight className="size-4 self-center text-rose-400 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100" />
                  </div>
                </a>
              </motion.li>
            ))}
          </ul>

          <a
            href={PLANITY_URL}
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-sm font-medium text-black transition-transform hover:scale-[1.03]"
          >
            Réserver en ligne
            <ArrowRight className="size-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
