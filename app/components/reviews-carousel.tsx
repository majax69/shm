'use client'

import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { reviews } from '@/lib/content'
import { ReviewCard } from './review-card'

type ReviewsCarouselProps = {
  autoPlay?: boolean
  autoPlayInterval?: number
}

export function ReviewsCarousel({
  autoPlay = true,
  autoPlayInterval = 5000,
}: ReviewsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  // 1 avis sur mobile, 2 sur tablette, 3 sur grand écran.
  const [cardsPerView, setCardsPerView] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setCardsPerView(1)
      else if (window.innerWidth < 1024) setCardsPerView(2)
      else setCardsPerView(3)
    }
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const maxIndex = Math.max(0, reviews.length - cardsPerView)

  const goToNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }, [maxIndex])

  const goToPrev = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }, [maxIndex])

  const goToSlide = useCallback(
    (index: number) => {
      setDirection(index > currentIndex ? 1 : -1)
      setCurrentIndex(index)
    },
    [currentIndex]
  )

  useEffect(() => {
    if (!autoPlay || isPaused) return
    const interval = setInterval(goToNext, autoPlayInterval)
    return () => clearInterval(interval)
  }, [autoPlay, autoPlayInterval, isPaused, goToNext])

  const visibleReviews = reviews.slice(currentIndex, currentIndex + cardsPerView)

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Liste accessible (lecteurs d'écran) */}
      <ul className="sr-only" aria-label="Avis clientes SHM">
        {reviews.map((review) => (
          <li key={review.date}>
            <span>Cliente vérifiée, {review.date}</span>
            <span> — {review.rating}/5 étoiles — </span>
            <span>{review.text}</span>
          </li>
        ))}
      </ul>

      <div className="relative overflow-hidden">
        <div className="flex gap-6 px-1 py-6">
          <AnimatePresence initial={false} custom={direction}>
            {visibleReviews.map((review) => (
              <motion.div
                key={review.date}
                custom={direction}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction > 0 ? -100 : 100 }}
                transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                className={`${cardsPerView === 1 ? 'w-full' : ''} ${cardsPerView === 2 ? 'w-[calc(50%-12px)]' : ''} ${cardsPerView === 3 ? 'w-[calc(33.333%-16px)]' : ''} shrink-0`}
              >
                <ReviewCard review={review} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {maxIndex > 0 && (
        <>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goToPrev}
            className="absolute -left-3 top-[42%] z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-rose-400/40 hover:bg-black/70 hover:text-white md:-left-5"
            aria-label="Avis précédent"
          >
            <ChevronLeft className="size-5" />
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={goToNext}
            className="absolute -right-3 top-[42%] z-10 flex size-11 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-black/50 text-white/80 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-rose-400/40 hover:bg-black/70 hover:text-white md:-right-5"
            aria-label="Avis suivant"
          >
            <ChevronRight className="size-5" />
          </motion.button>
        </>
      )}

      {maxIndex > 0 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={`dot-${idx}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Aller au groupe d'avis ${idx + 1}`}
              aria-current={idx === currentIndex}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === currentIndex ? 'w-7 bg-rose-400' : 'w-1.5 bg-white/25 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
