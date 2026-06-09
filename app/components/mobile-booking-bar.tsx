'use client'

import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { useState } from 'react'
import { BUSINESS, PLANITY_URL } from '@/lib/content'

// Barre d'action persistante en bas d'écran sur mobile : le CTA « Réserver »
// reste toujours à portée de pouce. Apparaît après le hero pour ne pas masquer
// la promesse initiale.
export function MobileBookingBar() {
  const [visible, setVisible] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (value) => {
    const next = value > 600
    setVisible((prev) => (prev === next ? prev : next))
  })

  return (
    <motion.div
      initial={false}
      animate={{ y: visible ? 0 : 120, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/80 p-3 backdrop-blur-xl md:hidden"
      style={{ paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center gap-3">
        <a
          href={`tel:${BUSINESS.phoneHref}`}
          aria-label="Appeler SHM"
          className="flex size-12 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white"
        >
          <Phone className="size-5" />
        </a>
        <a
          href={PLANITY_URL}
          target="_blank"
          rel="noreferrer"
          className="flex min-h-12 flex-1 items-center justify-center gap-2 rounded-full bg-white px-6 text-sm font-semibold text-black"
        >
          Réserver en ligne
          <ArrowRight className="size-4" />
        </a>
      </div>
    </motion.div>
  )
}
