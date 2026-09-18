// Puente con el motor de hoteles de Veturis (whitelabel de la agencia).
// ---------------------------------------------------------------------------
// Igual que el buscador de vuelos, el formulario vive en nuestra web (con
// nuestro diseño) y los RESULTADOS se muestran embebidos desde Veturis.
//
// Dos piezas clave descubiertas del motor:
//   1) Autocompletado de destinos/hoteles: `autocomplete.php` responde en JSONP
//      (`callback=...`), así que se puede llamar desde nuestro dominio sin CORS.
//   2) Resultados: se abren montando la URL `resultadosBusqueda.php?...` con los
//      parámetros del formulario; se carga en un <iframe> dentro de /hoteles.
// ---------------------------------------------------------------------------

export const HOTEL_ENGINE_ORIGIN = 'https://agencias.veturis.com'

// Contexto de la agencia (mismo que el iframe oficial que nos pasaron).
const AGENCY = {
  nocabecera: '1',
  idAgencia: '41785',
  idAgente: '95628',
  codIframe: 'a04746141e55f6c40000930df9a4cbdf',
}

const agencyQuery = new URLSearchParams(AGENCY).toString()

// URL del motor completo (formulario oficial), por si se quiere abrir tal cual.
export const hotelEngineUrl = `${HOTEL_ENGINE_ORIGIN}/?${agencyQuery}`

// --- Autocompletado (JSONP) -------------------------------------------------

let jsonpSeq = 0

function jsonp(url, { timeout = 8000 } = {}) {
  return new Promise((resolve, reject) => {
    if (typeof document === 'undefined') return reject(new Error('no-dom'))
    const cb = `__vetAutoc_${Date.now()}_${jsonpSeq++}`
    const script = document.createElement('script')
    let settled = false
    const cleanup = () => {
      settled = true
      try { delete window[cb] } catch { window[cb] = undefined }
      script.remove()
      clearTimeout(timer)
    }
    const timer = setTimeout(() => {
      if (!settled) { cleanup(); reject(new Error('timeout')) }
    }, timeout)
    window[cb] = (data) => {
      if (settled) return
      cleanup()
      resolve(data)
    }
    script.onerror = () => { if (!settled) { cleanup(); reject(new Error('script-error')) } }
    script.src = `${url}${url.includes('?') ? '&' : '?'}callback=${cb}`
    document.head.appendChild(script)
  })
}

// Quita el HTML del campo `label` que devuelve Veturis y deja texto limpio.
const stripTags = (s = '') => s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim()

/**
 * Busca destinos y hoteles en el motor de Veturis (autocompletado real).
 * Devuelve [{ id, value, pais, category, hotels }].
 */
export async function searchHotelDestinations(term) {
  const q = (term || '').trim()
  if (q.length < 2) return []
  const url = `${HOTEL_ENGINE_ORIGIN}/autocomplete.php?term=${encodeURIComponent(q)}&l=SPA&ild=1`
  try {
    const data = await jsonp(url)
    if (!Array.isArray(data)) return []
    return data
      .filter((d) => d && d.id && d.value)
      .slice(0, 8)
      .map((d) => ({
        id: d.id,
        value: d.value,
        pais: d.pais || '',
        category: d.category || (String(d.id).startsWith('H_') ? 'Hoteles' : 'Destinos'),
        isHotel: String(d.id).startsWith('H_'),
        hint: stripTags(d.label).replace(d.value, '').replace(/^[\s,]+/, ''),
      }))
  } catch {
    return []
  }
}

// --- Construcción de la URL de resultados -----------------------------------

// 'YYYY-MM-DD' → { day: 'DD', my: 'MM_YYYY' }
function splitDate(iso) {
  const [y, m, d] = (iso || '').split('-')
  return { day: d, my: `${m}_${y}` }
}

const nightsBetween = (a, b) => {
  const d1 = new Date(a)
  const d2 = new Date(b)
  return Math.max(1, Math.round((d2 - d1) / 86400000))
}

/**
 * Monta la URL de resultados de Veturis a partir del formulario.
 * @param {{destinoId,destino,checkin,checkout,rooms:Array<{adults:number,children:number[]}>}} p
 */
export function buildHotelResultsUrl(p) {
  const inD = splitDate(p.checkin)
  const outD = splitDate(p.checkout)
  const params = new URLSearchParams(AGENCY)
  params.set('txtDestino', p.destino || '')
  params.set('txtDestino_id', p.destinoId || '')
  params.set('D1', inD.day)
  params.set('MA1', inD.my)
  params.set('D2', outD.day)
  params.set('MA2', outD.my)
  params.set('D', String(nightsBetween(p.checkin, p.checkout)))
  params.set('H', String(p.rooms.length))

  // Ocupación por habitación (O1..O5) y edades de los niños (edadNino1..N global).
  let childIndex = 0
  p.rooms.slice(0, 5).forEach((room, i) => {
    const kids = room.children || []
    params.set(`O${i + 1}`, `${room.adults}A${kids.length}N`)
    kids.forEach((age) => {
      childIndex += 1
      params.set(`edadNino${childIndex}`, String(age))
    })
  })

  params.set('necesitaVisado', 'N')
  params.set('Buscar', 'Buscar')
  return `${HOTEL_ENGINE_ORIGIN}/resultadosBusqueda.php?${params.toString()}`
}

// Deep-link directo a un hotel/oferta concreto (para "Los más destacados").
export function buildHotelDeepLink({ destino, destinoId, checkin, checkout, occupancy = '2A0N', rooms = 1 }) {
  const inD = splitDate(checkin)
  const outD = splitDate(checkout)
  const params = new URLSearchParams(AGENCY)
  params.set('txtDestino', destino)
  params.set('txtDestino_id', destinoId)
  params.set('D1', inD.day)
  params.set('MA1', inD.my)
  params.set('D2', outD.day)
  params.set('MA2', outD.my)
  params.set('D', String(nightsBetween(checkin, checkout)))
  params.set('H', String(rooms))
  params.set('O1', occupancy)
  params.set('necesitaVisado', 'N')
  params.set('Buscar', 'Buscar')
  return `${HOTEL_ENGINE_ORIGIN}/resultadosBusqueda.php?${params.toString()}`
}

// --- "Los más destacados" ---------------------------------------------------
// Snapshot de las ofertas destacadas del motor (extraídas de su sección real),
// pintadas con el diseño de la web. Cada tarjeta abre su disponibilidad en el
// buscador integrado. Los precios son "desde" orientativos; la disponibilidad y
// el precio final los confirma el motor al abrir.
export const FEATURED_HOTELS = [
  { id: 'H_11938', hotel: 'Vila Galé Isla Canela', zona: 'Huelva', pais: 'España', stars: 4, price: 96, board: 'Alojamiento y desayuno', checkin: '2026-09-22', checkout: '2026-09-25', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/huelva-020620261410.png' },
  { id: 'H_14847', hotel: 'Hotel Vallemar', zona: 'Tenerife', pais: 'España', stars: 4, price: 81, board: 'Media pensión', checkin: '2026-10-01', checkout: '2026-10-04', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/Puertodelacruz-040620261204.png' },
  { id: 'H_32186', hotel: 'HSM Atlantic Park', zona: 'Mallorca', pais: 'España', stars: 4, price: 99, board: 'Todo incluido', checkin: '2026-09-21', checkout: '2026-09-25', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/MallorcaHotel-070520261005.png' },
  { id: 'H_618450', hotel: 'Maspalomas Villas by Dunas · Adults Only', zona: 'Gran Canaria', pais: 'España', stars: 4, price: 92, board: 'Todo incluido', checkin: '2026-09-01', checkout: '2026-09-06', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/GranCanaria-020620261340.png' },
  { id: 'H_215956', hotel: 'El Mirador de Fuerteventura', zona: 'Fuerteventura', pais: 'España', stars: 4, price: 79, board: 'Media pensión', checkin: '2026-10-08', checkout: '2026-10-11', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/Fuerteventura-020620261340.png' },
  { id: 'H_445861', hotel: 'Zleep Hotel Madrid Airport', zona: 'Madrid', pais: 'España', stars: 3, price: 62, board: 'Alojamiento y desayuno', checkin: '2026-09-28', checkout: '2026-09-30', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/Madrid-160320261639.png' },
  { id: 'H_70358', hotel: 'Hotel Navegadores', zona: 'Algarve', pais: 'Portugal', stars: 4, price: 90, board: 'Media pensión', checkin: '2026-10-01', checkout: '2026-10-04', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/algarve-020620261401.png' },
  { id: 'H_64490', hotel: 'Exe Budapest Center', zona: 'Budapest', pais: 'Hungría', stars: 4, price: 72, board: 'Alojamiento y desayuno', checkin: '2026-09-23', checkout: '2026-09-24', image: 'https://cdn.veturis.com/agencias/imagenes/imagenesBanner/budapest-020620261406.png' },
]

// URL de resultados para una tarjeta destacada.
export function featuredHotelUrl(h) {
  return buildHotelDeepLink({
    destino: h.hotel,
    destinoId: h.id,
    checkin: h.checkin,
    checkout: h.checkout,
    occupancy: '2A0N',
    rooms: 1,
  })
}
