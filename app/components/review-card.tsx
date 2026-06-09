import { BadgeCheck, Star } from 'lucide-react'
import type { Review } from '@/lib/content'

// Notation gérant les demi-étoiles (ex. 4,5/5).
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 text-amber-400" aria-label={`Note : ${rating} sur 5`}>
      {Array.from({ length: 5 }).map((_, i) => {
        const fill = Math.max(0, Math.min(1, rating - i))
        return (
          <span key={i} className="relative inline-block">
            <Star className="size-4" />
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
              <Star className="size-4 fill-current" />
            </span>
          </span>
        )
      })}
    </div>
  )
}

export function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="flex h-full flex-col rounded-2xl border border-white/10 bg-white/3 p-7 backdrop-blur-sm md:p-8">
      <StarRating rating={review.rating} />

      <blockquote className="mt-5 flex-1 font-playfair text-sm italic leading-relaxed text-white/90 md:text-base">
        &ldquo;{review.text}&rdquo;
      </blockquote>

      <figcaption className="mt-7 flex items-center gap-2 text-xs">
        <BadgeCheck className="size-4 text-rose-300" />
        <span className="font-medium text-white">Cliente vérifiée</span>
        <span className="text-white/40">· {review.date}</span>
      </figcaption>
    </figure>
  )
}
