'use client'

import { motion } from 'framer-motion'
import { Clock } from 'lucide-react'
import { categories, services, type CategoryId } from '@/lib/content'
import { SectionHeading } from './section-heading'
import Image from 'next/image'

type ServicesSectionProps = {
  activeCategory: CategoryId
  onSelectCategory: (category: CategoryId) => void
}

export function ServicesSection({ activeCategory, onSelectCategory }: ServicesSectionProps) {
  return (
    <section id="prestations" className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28 scroll-mt-24">

      <SectionHeading
        eyebrow="Prestations"
        title="Des soins élégants, des tarifs limpides."
        description="Cils, ongles, sourcils et épilation : choisissez une catégorie pour découvrir nos prestations, leur durée et leur prix."
      />


      <div className="mt-14 flex flex-wrap gap-3 mb-8">
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all cursor-pointer ${
              activeCategory === category.id
                ? `${category.bgColor} ${category.color} border ${category.borderColor}`
                : 'bg-white/5 text-white/60 border border-white/5 hover:bg-white/10'
            }`}
          >
            {category.name}
          </motion.button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services
          .filter((service) => service.category === activeCategory)
          .map((service, index) => {
            const Icon = service.icon
            const category = categories.find((cat) => cat.id === service.category)

            return (
              <motion.article
                key={service.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: index * 0.05, duration: 0.5 }}
                className="rounded-2xl border border-white/5 bg-black/20 hover:bg-black/5 p-6 backdrop-blur-sm transition-colors"
              >
                <div className={`mb-4 flex size-12 items-center justify-center rounded-xl ${category?.bgColor} ${category?.color} ring-1 ring-rose-400/20`}>
                  <Icon className="size-6" />
                </div>
                <h3 className="text-lg font-semibold text-white">{service.name}</h3>
                <div className="mt-4 flex items-center justify-between text-sm text-white/60">
                  <span className="flex items-center gap-2">
                    <Clock className="size-4" />
                    {service.duration}
                  </span>
                  <span className="font-semibold text-white">{service.price}</span>
                </div>
              </motion.article>
            )
          })}
      </div>
    </section>
  )
}
