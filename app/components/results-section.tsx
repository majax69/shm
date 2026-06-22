'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useRef, useState } from 'react'
import { beforeAfter, type BeforeAfter } from '@/lib/content'
import { staggerContainer, staggerItem, VIEWPORT } from '@/lib/motion'
import { SectionHeading } from './section-heading'

// Slider avant/après : la photo « après » est en fond, la photo « avant » est
// révélée via un clip piloté par la position. Drag à la souris/au toucher ET
// input range pour le clavier (alternative non-drag → WCAG 2.5.7).
function BeforeAfterSlider({ before, after, label, alt }: BeforeAfter) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)

  const updateFromPointer = (clientX: number, clientY: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    // On ignore tout pointeur en dehors de la zone de l'image.
    if (
      clientX < rect.left ||
      clientX > rect.right ||
      clientY < rect.top ||
      clientY > rect.bottom
    ) {
      return
    }
    const pct = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.min(100, Math.max(0, pct)))
  }

  const handlePointerDown = (e: React.PointerEvent) => {
    e.preventDefault()
    e.currentTarget.setPointerCapture(e.pointerId)
    updateFromPointer(e.clientX, e.clientY)
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.buttons !== 1) return
    updateFromPointer(e.clientX, e.clientY)
  }

  return (
    <div className="group">
      <div
        ref={containerRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        className="relative aspect-square w-full cursor-ew-resize touch-none select-none overflow-hidden rounded-2xl"
      >
        {/* APRÈS (fond) */}
        <Image
          src={after}
          alt={alt}
          fill
          draggable={false}
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        <span className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
          Après
        </span>

        {/* AVANT (révélé par clip) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <Image
            src={before}
            alt=""
            fill
            draggable={false}
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/60 px-3 py-1 text-xs font-medium text-white backdrop-blur-sm">
            Avant
          </span>
        </div>

        {/* Poignée + ligne */}
        <div
          className="pointer-events-none absolute inset-y-0 z-10 w-0.5 -translate-x-1/2 bg-white/90"
          style={{ left: `${position}%` }}
        >
          <span className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize items-center justify-center rounded-full bg-white text-black shadow-lg">
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M8 7l-4 5 4 5M16 7l4 5-4 5" />
            </svg>
          </span>
        </div>

        {/* Contrôle clavier accessible (superposé, transparent) */}
        <input
          type="range"
          min={0}
          max={100}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Comparer avant / après — ${label}`}
          className="absolute inset-x-0 bottom-0 z-20 h-11 w-full cursor-ew-resize opacity-0"
        />
      </div>
      <p className="mt-3 text-center text-sm font-medium text-white/80">{label}</p>
    </div>
  )
}

export function ResultsSection() {
  return (
    <section id="resultats" className="mx-auto max-w-7xl px-6 py-16 md:px-12 md:py-24 scroll-mt-24">
      <SectionHeading
        eyebrow="Résultats"
        title="La différence se voit, glissez pour comparer."
        description="Des regards sublimés sans artifice. Déplacez le curseur pour découvrir l'avant et l'après de nos prestations signature."
      />

      <motion.div
        variants={staggerContainer(0.12)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        className="mt-14 grid gap-8 sm:grid-cols-2 md:mt-16"
      >
        {beforeAfter.map((item) => (
          <motion.div key={item.label} variants={staggerItem}>
            <BeforeAfterSlider {...item} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
