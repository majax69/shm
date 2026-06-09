'use client'

import { motion } from 'framer-motion'
import { stats } from '@/lib/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'

export function StatsBand() {
  return (
    <section className="px-6 md:px-12">
      <div className="mx-auto max-w-7xl">
        <motion.div
          variants={staggerContainer()}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          className="grid grid-cols-2 overflow-hidden rounded-2xl border border-white/5 bg-white/5 md:grid-cols-4"
        >
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              variants={staggerItem}
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
        </motion.div>
      </div>
    </section>
  )
}
