'use client'

import { motion } from 'framer-motion'
import { stats } from '@/lib/content'

const EASE = [0.22, 1, 0.36, 1] as const

export function StatsBand() {
  return (
    <section className="px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-4">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: EASE }}
              className="flex flex-col items-center gap-2 border-t first:border-t-0 md:border-t-0 md:border-l md:first:border-l-0 border-white/5 bg-black/20 hover:bg-black/5 p-4 text-center backdrop-blur-sm"
            >
              <span className="font-playfair text-3xl font-semibold text-white md:text-4xl">
                {stat.value}
              </span>
              <span className="text-xs uppercase tracking-[0.2em] text-white/45">
                {stat.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
