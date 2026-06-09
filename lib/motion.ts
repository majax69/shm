// Tokens d'animation partagés — garantissent un rythme cohérent sur tout le
// site : même courbe, même durée, même déclenchement au scroll, mêmes staggers.

import type { Transition, Variants } from 'framer-motion'

// Courbe « easeOutQuint » douce — signature de mouvement du site.
export const EASE = [0.22, 1, 0.36, 1] as const

export const DURATION = 0.7
export const STAGGER = 0.07

// Déclenchement au scroll : une seule fois, un peu avant que l'élément entre.
export const VIEWPORT = { once: true, margin: '-80px' } as const

export const transition = (delay = 0, duration = DURATION): Transition => ({
  duration,
  ease: EASE,
  delay,
})

// Révélation douce vers le haut — base commune à tous les contenus.
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, delay },
  }),
}

// Conteneur qui orchestre l'entrée échelonnée de ses enfants.
// Il s'anime LUI-MÊME (fondu) pour que son cadre/bordure n'apparaisse jamais
// vide avant l'arrivée du contenu — le conteneur et son contenu entrent ensemble.
export const staggerContainer = (stagger = STAGGER, delayChildren = 0): Variants => ({
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION, ease: EASE, staggerChildren: stagger, delayChildren },
  },
})

// Enfant d'un conteneur staggeré.
export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: DURATION, ease: EASE } },
}
