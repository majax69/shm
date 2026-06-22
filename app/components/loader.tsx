'use client'

import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
} from 'framer-motion'
import { useEffect } from 'react'
import { EASE } from '@/lib/motion'

const BRAND = 'cils by shm'
const SUBTITLE = 'studio du regard'
const LOCATION = 'Villeurbanne · Lyon'
const DURATION = 1.9

type LoaderProps = {
  onComplete: () => void
}

export function Loader({ onComplete }: LoaderProps) {
  const progressValue = useMotionValue(0)
  const progress = useTransform(progressValue, [0, 100], ['0%', '100%'])
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (reduceMotion) {
      progressValue.set(100)
      const timeout = setTimeout(onComplete, 120)
      return () => clearTimeout(timeout)
    }

    const controls = animate(progressValue, 100, {
      duration: DURATION,
      ease: [0.33, 1, 0.68, 1],
      onComplete,
    })

    return () => controls.stop()
  }, [onComplete, progressValue, reduceMotion])

  return (
    <motion.div
      initial={{ y: '0%' }}
      exit={{ y: '-100%' }}
      transition={{ duration: 0.85, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-[#050303]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(244,63,94,0.16),transparent_34%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.035),transparent_32%,rgba(244,63,94,0.045)_70%,transparent)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_54%,rgba(0,0,0,0.9))]" />

      <motion.div
        exit={{ opacity: 0, y: -18 }}
        transition={{ duration: 0.45, ease: [0.4, 0, 0.2, 1] }}
        className="relative flex w-full max-w-md flex-col items-center px-8 text-center"
      >
        <motion.span
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 0.75, ease: EASE }}
          className="mb-7 h-px w-16 origin-center bg-linear-to-r from-transparent via-rose-200/70 to-transparent"
        />

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.08, ease: EASE }}
          className="text-[0.62rem] font-medium uppercase tracking-[0.44em] text-white/42"
        >
          {LOCATION}
        </motion.p>

        <p
          aria-label={BRAND}
          role="img"
          className="mt-6 font-playfair text-5xl font-medium leading-none tracking-[-0.03em] text-white sm:text-6xl"
        >
          <motion.span
            aria-hidden
            initial={reduceMotion ? false : { width: 0 }}
            animate={{ width: 'auto' }}
            transition={{ duration: 1.02, delay: 0.22, ease: [0.65, 0, 0.35, 1] }}
            className="relative inline-block overflow-hidden whitespace-nowrap pb-[0.08em]"
          >
            {BRAND}
            <motion.span
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={reduceMotion ? { opacity: 0 } : { opacity: [0, 1, 1, 0] }}
              transition={{ duration: 1.08, delay: 0.24, times: [0, 0.08, 0.86, 1] }}
              className="absolute bottom-[0.08em] right-0 top-1/2 w-px -translate-y-1/2 bg-rose-100/90"
            />
          </motion.span>
        </p>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.74, ease: EASE }}
          className="mt-5 text-xs uppercase tracking-[0.38em] text-rose-100/68"
        >
          {SUBTITLE}
        </motion.p>

        <div className="mt-9 h-px w-48 overflow-hidden bg-white/10">
          <motion.div
            style={{ width: progress }}
            className="h-full bg-linear-to-r from-transparent via-rose-200 to-transparent"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
