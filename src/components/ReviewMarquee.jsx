import { useEffect, useState } from 'react'
import { Star, Quote } from 'lucide-react'
import { fetchGoogleReviews } from '../lib/googleReviews'

function Stars({ rating = 5 }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-cyan-500 text-cyan-500' : 'fill-line text-line'}`} />
      ))}
    </div>
  )
}

function ReviewCard({ r }) {
  const initials = r.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('')
  return (
    <figure className="flex w-[20rem] shrink-0 flex-col gap-4 rounded-3xl border border-line bg-white p-6 shadow-card sm:w-[24rem]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {r.photo ? (
            <img src={r.photo} alt="" className="h-11 w-11 rounded-full object-cover" />
          ) : (
            <span className="grid h-11 w-11 place-items-center rounded-full bg-cyan-50 font-display text-sm font-bold text-cyan-600">{initials}</span>
          )}
          <div>
            <figcaption className="text-sm font-bold text-ink">{r.name}</figcaption>
            <span className="text-xs text-ink-500">Reseña de Google{r.time ? ` · ${r.time}` : ''}</span>
          </div>
        </div>
        <Quote className="h-6 w-6 text-cyan-200" />
      </div>
      <Stars rating={r.rating} />
      <blockquote className="text-sm leading-relaxed text-ink-700">“{r.text}”</blockquote>
    </figure>
  )
}

export default function ReviewMarquee() {
  const [reviews, setReviews] = useState([])

  useEffect(() => {
    let alive = true
    // Only 4–5 star reviews are returned (house rule in the adapter).
    fetchGoogleReviews({ minRating: 4 }).then((data) => alive && setReviews(data))
    return () => {
      alive = false
    }
  }, [])

  if (!reviews.length) return null

  // Duplicate for a seamless marquee loop.
  const row = [...reviews, ...reviews]
  return (
    <div className="group relative flex gap-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div className="flex shrink-0 animate-marquee gap-5 group-hover:[animation-play-state:paused]">
        {row.map((r, i) => (
          <ReviewCard key={i} r={r} />
        ))}
      </div>
    </div>
  )
}
