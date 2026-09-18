// Instagram feed adapter for Viajes Alkoste.
// ---------------------------------------------------------------------------
// The public Instagram Graph API requires a long-lived access token and, for
// security, a small server/proxy (never expose a real token in frontend code).
// This adapter normalizes posts into a stable shape the UI consumes, and will
// use the real API automatically once you provide a token endpoint.
//
// HOW TO GO LIVE (pick one):
//   A) Serverless proxy (recommended): create an endpoint that holds the token
//      and returns Instagram media. Set VITE_INSTAGRAM_ENDPOINT to its URL.
//      Example endpoint response: the raw Instagram Graph "data" array.
//   B) Third-party embed service (Behold.so, EmbedSocial, SnapWidget): point
//      VITE_INSTAGRAM_ENDPOINT to the JSON feed they give you.
//
// Env (create a .env file, see .env.example):
//   VITE_INSTAGRAM_ENDPOINT=https://your-proxy.example.com/instagram
//   VITE_INSTAGRAM_PROFILE=viajesalkoste
// ---------------------------------------------------------------------------

const PROFILE = import.meta.env.VITE_INSTAGRAM_PROFILE || 'viajesalkoste'
const ENDPOINT = import.meta.env.VITE_INSTAGRAM_ENDPOINT || ''

export const instagramProfileUrl = `https://www.instagram.com/${PROFILE}/`

const img = (id, w = 800) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=85`

// Curated placeholder posts so the section looks real before the API is wired.
// Replace automatically once VITE_INSTAGRAM_ENDPOINT is set.
const PLACEHOLDER = [
  { id: 'p1', image: img('photo-1587595431973-160d0d94add1'), caption: '✈️ Machu Picchu te espera. Vuelos desde Madrid al mejor precio.', likes: 342, comments: 18 },
  { id: 'p2', image: img('photo-1715393539878-b3c97c525567'), caption: '🌴 Escápate al Caribe este 2026. Cancún todo incluido.', likes: 528, comments: 41 },
  { id: 'p3', image: img('photo-1706200972821-615812a4fbe5'), caption: '🇪🇨 Vuelve a casa. Madrid ⇄ Quito con ofertas de temporada.', likes: 611, comments: 55 },
  { id: 'p4', image: img('photo-1536308037887-165852797016'), caption: '💃 Cartagena colonial, pura magia. Consúltanos tu paquete.', likes: 289, comments: 12 },
  { id: 'p5', image: img('photo-1483729558449-99ef09a8c325'), caption: '🇧🇷 Río de Janeiro desde Madrid. ¿Te lo vas a perder?', likes: 447, comments: 27 },
  { id: 'p6', image: img('photo-1589909202802-8f4aadce1849'), caption: '🇦🇷 Buenos Aires te llama. Financiación disponible.', likes: 356, comments: 19 },
  { id: 'p7', image: img('photo-1692017827893-f97d95397b49'), caption: '🏝️ Punta Cana en modo relax. Reserva tu escapada.', likes: 502, comments: 33 },
  { id: 'p8', image: img('photo-1643302408853-a0171accc39b'), caption: '🌋 Aventura en los Andes ecuatorianos. Cotopaxi espera.', likes: 274, comments: 15 },
]

function normalize(item) {
  return {
    id: item.id,
    image: item.media_url || item.thumbnail_url || item.image,
    caption: item.caption || '',
    permalink: item.permalink || instagramProfileUrl,
    likes: item.like_count ?? item.likes ?? null,
    comments: item.comments_count ?? item.comments ?? null,
    isVideo: item.media_type === 'VIDEO',
  }
}

export async function fetchInstagramPosts(limit = 8) {
  if (!ENDPOINT) {
    return PLACEHOLDER.slice(0, limit).map((p) => ({ ...p, permalink: instagramProfileUrl }))
  }
  try {
    const res = await fetch(`${ENDPOINT}?limit=${limit}`)
    if (!res.ok) throw new Error(`Instagram endpoint ${res.status}`)
    const json = await res.json()
    const data = Array.isArray(json) ? json : json.data || []
    return data.slice(0, limit).map(normalize)
  } catch (err) {
    console.warn('[instagram] falling back to placeholder feed:', err.message)
    return PLACEHOLDER.slice(0, limit).map((p) => ({ ...p, permalink: instagramProfileUrl }))
  }
}

export const usingLivePosts = Boolean(ENDPOINT)
