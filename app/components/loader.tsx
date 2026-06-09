'use client'

import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { useEffect, useState } from 'react'

const BRAND = 'SHM'
const SIGNATURE = "L'art du regard & des mains"
const SPECIALTIES = ['Extension de cils', 'Ongles', 'Sourcils', 'Épilation']
const TOP_LEFT = 'Studio Cils & Ongles'
const TOP_RIGHT = 'Villeurbanne — Lyon'
const BOTTOM_RIGHT = 'Sur rendez-vous'

type LoaderProps = {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {

  const count = useMotionValue(0)
  const rounded = useTransform(count, (value) => Math.round(value))
  const progress = useTransform(count, [0, 100], ['0%', '100%'])

  const [specialtyIndex, setSpecialtyIndex] = useState(0)

  useMotionValueEvent(count, 'change', (value) => {
    const next = Math.min(SPECIALTIES.length - 1, Math.floor(value / (100 / SPECIALTIES.length)))
    setSpecialtyIndex((prev) => (prev === next ? prev : next))
  })

  useEffect(() => {
    let exitTimer: ReturnType<typeof setTimeout>

    const controls = animate(count, 100, {
      duration: 2.6,
      ease: [0.22, 1, 0.36, 1],
      onComplete: () => {
        exitTimer = setTimeout(onComplete, 650)
      },
    })

    return () => {
      controls.stop()
      clearTimeout(exitTimer)
    }
  }, [count, onComplete])

  return (
    <motion.div
      initial={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1.1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Halo radial diffus pour la profondeur */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 size-[45rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-400/10 blur-[130px]" />

      {/* Coins éditoriaux */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.9, delay: 0.5 }}
        className="absolute inset-x-0 top-0 flex items-start justify-between p-8 text-[0.65rem] uppercase tracking-[0.3em] text-white/40 sm:p-12 sm:text-xs"
      >
        <span>{TOP_LEFT}</span>
        <span className="text-right">{TOP_RIGHT}</span>
      </motion.div>

      {/* Bloc central : monogramme + nom révélé par masque + signature + spécialités */}
      <div className="relative flex flex-col items-center gap-5">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
        >
          <Sparkles className="size-6 text-rose-400" />
        </motion.div>

        <h1
          aria-label={BRAND}
          className="flex font-playfair text-5xl font-semibold leading-none tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {BRAND.split('').map((char, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span
                className="inline-block"
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 1, delay: 0.15 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.85, ease: [0.4, 0, 0.2, 1] }}
          className="font-playfair text-lg italic text-white/70 sm:text-xl"
        >
          {SIGNATURE}
        </motion.p>

        {/* Spécialités qui défilent au rythme du chargement */}
        <div className="mt-1 flex h-5 items-center gap-3 overflow-hidden">
          <span className="h-px w-6 bg-rose-400/50" />
          <AnimatePresence mode="wait">
            <motion.span
              key={specialtyIndex}
              initial={{ y: '120%', opacity: 0 }}
              animate={{ y: '0%', opacity: 1 }}
              exit={{ y: '-120%', opacity: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="block min-w-[10rem] text-center text-[0.7rem] uppercase tracking-[0.35em] text-rose-400/80"
            >
              {SPECIALTIES[specialtyIndex]}
            </motion.span>
          </AnimatePresence>
          <span className="h-px w-6 bg-rose-400/50" />
        </div>
      </div>

      {/* Bas de page éditorial : compteur + mention + barre de progression */}
      <div className="absolute inset-x-0 bottom-0 p-8 sm:p-12">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-end justify-between"
        >
          <div className="flex flex-col gap-1">
            <span className="text-[0.6rem] uppercase tracking-[0.3em] text-white/40">
              Préparation
            </span>
            <div className="flex items-baseline gap-1 text-white">
              <motion.span className="text-4xl font-extralight tabular-nums sm:text-5xl">
                {rounded}
              </motion.span>
              <span className="text-base text-white/40 sm:text-lg">%</span>
            </div>
          </div>
          <span className="pb-1 text-[0.65rem] uppercase tracking-[0.3em] text-white/40 sm:text-xs">
            {BOTTOM_RIGHT}
          </span>
        </motion.div>

        <div className="mt-5 h-px w-full bg-white/10">
          <motion.div
            style={{ width: progress }}
            className="h-full bg-gradient-to-r from-rose-400 to-rose-400"
          />
        </div>
      </div>
    </motion.div>
  )
}
