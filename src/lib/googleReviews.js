// Google reviews adapter for Viajes Alkoste.
// ---------------------------------------------------------------------------
// Google does not allow secure client-side calls to its Reviews/Places API:
// the API key must live on a server, and the Places "Place Details" endpoint
// only returns up to 5 reviews. So, like the Instagram feed, this adapter
// normalizes reviews into a stable shape and pulls live data ONLY through a
// server endpoint you control. Until then it uses the curated reviews below.
//
// A house rule is applied everywhere: ONLY reviews of 4–5 stars are shown
// (see MIN_RATING). This is enforced on both the live feed and the fallback.
//
// HOW TO GO LIVE (pick one):
//   A) Serverless proxy (recommended): an endpoint that holds your Google API
//      key + Place ID and returns the Place Details "reviews" array. Set
//      VITE_GOOGLE_REVIEWS_ENDPOINT to its URL.
//   B) Third-party widget/feed (Elfsight, Trustindex, Featurable, EmbedSocial):
//      most let you filter by rating and expose a JSON feed — point
//      VITE_GOOGLE_REVIEWS_ENDPOINT at it. (Featurable offers a free Google
//      reviews API with rating filtering.)
//
// Env (.env — see .env.example):
//   VITE_GOOGLE_REVIEWS_ENDPOINT=https://your-proxy.example.com/google-reviews
//   VITE_GOOGLE_PLACE_ID=<your Google Place ID>
//   VITE_GOOGLE_REVIEWS_URL=https://g.page/r/...   (the "write/see reviews" link)
// ---------------------------------------------------------------------------
import { reviews as CURATED } from '../data/site'

export const MIN_RATING = 4 // house rule: only show 4–5 star reviews

const ENDPOINT = import.meta.env.VITE_GOOGLE_REVIEWS_ENDPOINT || ''
export const googleReviewsUrl =
  import.meta.env.VITE_GOOGLE_REVIEWS_URL ||
  'https://www.google.com/search?q=Viajes+Alkoste+Madrid+opiniones'

// Some feeds send the rating as a word ("FIVE") instead of a number.
const STAR_WORDS = { ONE: 1, TWO: 2, THREE: 3, FOUR: 4, FIVE: 5 }
function toRating(v) {
  if (typeof v === 'number') return v
  if (typeof v === 'string' && STAR_WORDS[v]) return STAR_WORDS[v]
  const n = Number(v)
  return Number.isFinite(n) ? n : 5
}

// Acepta el formato del Google Places API (author_name, rating, text…) y el de
// Featurable (reviewer.displayName, starRating, comment…).
function normalize(r) {
  return {
    name: r.author_name || r.name || r.reviewer?.displayName || r.reviewerName || 'Cliente de Google',
    rating: Math.round(toRating(r.rating ?? r.starRating ?? 5)),
    text: r.text || r.comment || r.original_text?.text || '',
    photo: r.profile_photo_url || r.reviewer?.profilePhotoUrl || r.profilePhotoUrl || null,
    time:
      r.relative_time_description ||
      r.relativePublishTimeDescription ||
      r.relativeTimeDescription ||
      '',
  }
}

/**
 * Returns Google reviews filtered to >= minRating (default 4).
 * Uses the live endpoint when configured, otherwise the curated fallback.
 */
export async function fetchGoogleReviews({ minRating = MIN_RATING, limit = 12 } = {}) {
  const byRating = (r) => (r.rating ?? 0) >= minRating

  if (!ENDPOINT) {
    return CURATED.filter(byRating).slice(0, limit)
  }
  try {
    const res = await fetch(ENDPOINT)
    if (!res.ok) throw new Error(`Google reviews endpoint ${res.status}`)
    const json = await res.json()
    // Places API → { result: { reviews } } · Featurable → { reviews } · o un array
    const raw = Array.isArray(json)
      ? json
      : json.reviews || json.result?.reviews || json.data?.reviews || []
    const list = raw.map(normalize).filter(byRating).slice(0, limit)
    return list.length ? list : CURATED.filter(byRating).slice(0, limit)
  } catch (err) {
    console.warn('[google-reviews] falling back to curated reviews:', err.message)
    return CURATED.filter(byRating).slice(0, limit)
  }
}

export const usingLiveReviews = Boolean(ENDPOINT)
