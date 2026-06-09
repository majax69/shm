'use client'

import {
  animate,
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect, useState } from 'react'

const BRAND = 'SHM'
const SIGNATURE = "L'art du regard & des mains"
const SPECIALTIES = ['Extension de cils', 'Ongles', 'Sourcils', 'Épilation']
const TOP_LEFT = 'Studio Cils & Ongles'
const TOP_RIGHT = 'Villeurbanne — Lyon'
const BOTTOM_RIGHT = 'Sur rendez-vous'

// Durée du remplissage du compteur (s). La rotation des spécialités s'y cale.
const DURATION = 2.4

// Easing « doux au départ, vitesse constante jusqu'au bout » : y2 = 0.7 (< 1)
// empêche le ralenti final qui donnait l'impression que ça se figeait.
const COUNT_EASE = [0.2, 0.1, 0.7, 0.7] as const
const REVEAL_EASE = [0.16, 1, 0.3, 1] as const // easeOutExpo, élégant pour les entrées

type LoaderProps = {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const count = useMotionValue(0)
  // Rendus directement par framer dans le DOM : aucun re-render React par frame.
  const rounded = useTransform(count, (value) => Math.round(value))
  const progress = useTransform(count, [0, 100], ['0%', '100%'])

  const [specialty, setSpecialty] = useState(0)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    // Mouvement réduit : on n'impose pas un écran de chargement animé,
    // on libère la page quasi immédiatement.
    if (reduceMotion) {
      count.set(100)
      const t = setTimeout(onComplete, 200)
      return () => clearTimeout(t)
    }

    const controls = animate(count, 100, {
      duration: DURATION,
      ease: COUNT_EASE,
      // À 100 % on enchaîne aussitôt la sortie : aucun temps mort.
      onComplete,
    })

    // Rotation des spécialités DÉCOUPLÉE du compteur : un intervalle dédié, donc
    // seulement quelques re-renders au total (et non un par frame) -> plus de freeze.
    const step = (DURATION * 1000) / SPECIALTIES.length
    const rotation = setInterval(() => {
      setSpecialty((i) => (i + 1) % SPECIALTIES.length)
    }, step)

    return () => {
      controls.stop()
      clearInterval(rotation)
    }
  }, [count, onComplete, reduceMotion])

  return (
    <motion.div
      initial={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-black"
    >
      {/* Profondeur : deux halos diffus, immobiles (donc gratuits côté GPU) */}
      <div className="pointer-events-none absolute left-1/2 top-[42%] size-192 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-500/10 blur-[140px]" />
      <div className="pointer-events-none absolute left-1/2 top-[58%] size-104 -translate-x-1/2 -translate-y-1/2 rounded-full bg-rose-300/10 blur-[110px]" />
      {/* Vignette douce sur les bords pour concentrer le regard au centre */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_55%,rgba(0,0,0,0.85))]" />

      {/* Coins éditoriaux */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.6 }}
        className="absolute inset-x-0 top-0 flex items-start justify-between p-8 text-[0.65rem] uppercase tracking-[0.3em] text-white/40 sm:p-12 sm:text-xs"
      >
        <span>{TOP_LEFT}</span>
        <span className="text-right">{TOP_RIGHT}</span>
      </motion.div>

      {/* Bloc central — sort un peu plus vite que le panneau (effet de parallaxe) */}
      <motion.div
        exit={{ opacity: 0, y: -32 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex flex-col items-center"
      >
        {/* Trait vertical qui se dessine et amène l'œil vers le monogramme */}
        <motion.span
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 1 }}
          transition={{ duration: 0.7, ease: REVEAL_EASE }}
          className="mb-6 block h-14 w-px origin-top bg-linear-to-b from-transparent to-rose-400/70"
        />

        {/* Monogramme révélé lettre par lettre par un masque (volet qui remonte) */}
        <h1
          aria-label={BRAND}
          className="flex font-playfair text-6xl font-semibold leading-none tracking-tight text-white sm:text-7xl md:text-8xl"
        >
          {BRAND.split('').map((char, i) => (
            <span key={i} aria-hidden className="inline-block overflow-hidden pb-[0.08em]">
              <motion.span
                className="inline-block"
                initial={{ y: '120%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.4 + i * 0.12, ease: REVEAL_EASE }}
              >
                {char}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Filet décoratif qui se déploie sous le nom */}
        <motion.span
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.95, ease: REVEAL_EASE }}
          className="mt-6 block h-px w-28 origin-center bg-linear-to-r from-transparent via-rose-400/80 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.1, ease: [0.4, 0, 0.2, 1] }}
          className="mt-6 font-playfair text-lg italic text-white/70 sm:text-xl"
        >
          {SIGNATURE}
        </motion.p>

        {/* Spécialités qui défilent — slot à hauteur fixe, croisement sans trou */}
        <div className="mt-6 flex h-5 items-center justify-center gap-3">
          <span className="h-px w-6 bg-rose-400/40" />
          <div className="relative h-5 w-44 overflow-hidden">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={specialty}
                initial={{ y: '120%', opacity: 0 }}
                animate={{ y: '0%', opacity: 1 }}
                exit={{ y: '-120%', opacity: 0 }}
                transition={{ duration: 0.45, ease: REVEAL_EASE }}
                className="absolute inset-0 flex items-center justify-center text-[0.7rem] uppercase tracking-[0.35em] text-rose-400/80"
              >
                {SPECIALTIES[specialty]}
              </motion.span>
            </AnimatePresence>
          </div>
          <span className="h-px w-6 bg-rose-400/40" />
        </div>
      </motion.div>

      {/* Bas de page : compteur + mention + barre de progression */}
      <motion.div
        exit={{ opacity: 0, y: 24 }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-x-0 bottom-0 p-8 sm:p-12"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
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

        <div className="mt-5 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            style={{ width: progress }}
            className="relative h-full rounded-full bg-linear-to-r from-rose-500 via-rose-400 to-rose-300"
          >
            {/* Pointe lumineuse qui suit la progression */}
            <span className="absolute right-0 top-1/2 size-2 -translate-y-1/2 translate-x-1/2 rounded-full bg-rose-200 blur-[3px]" />
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  )
}
