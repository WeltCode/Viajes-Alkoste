// Puente con el motor de vuelos externo de Viajes Alkoste.
// Mismo contrato de consumo que el proyecto de Vicente Viajes: se envía un POST
// nativo con los campos exigidos por el motor. Los aeropuertos se cargan de
// forma diferida (public/data/airports.json) para no inflar el bundle inicial.

// Endpoint del motor (contrato fijo). Configurable por si cambia el host.
export const FLIGHT_BRIDGE_URL =
  import.meta.env.VITE_FLIGHT_BRIDGE_URL ||
  'http://vuelos.viajesalkoste.com/wtc/ak/vuelos/Default.aspx'

const normalizeText = (value) =>
  String(value || '')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .trim()

let airportIndex = null
let airportsPromise = null

// Carga y normaliza el catálogo de aeropuertos una sola vez.
export function preloadAirports() {
  if (airportIndex) return Promise.resolve(airportIndex)
  if (!airportsPromise) {
    airportsPromise = fetch('/data/airports.json')
      .then((r) => r.json())
      .then((airports) => {
        airportIndex = airports.map((airport) => ({
          ...airport,
          normalizedId: normalizeText(airport.id),
          normalizedCity: normalizeText(airport.ciudad),
          normalizedValue: normalizeText(airport.value),
        }))
        return airportIndex
      })
      .catch(() => {
        airportIndex = []
        return airportIndex
      })
  }
  return airportsPromise
}

export const airportsReady = () => airportIndex !== null

const getMatchScore = (airport, query) => {
  if (airport.normalizedId === query) return 0
  if (airport.normalizedId.startsWith(query)) return 1
  if (airport.normalizedCity === query) return 2
  if (airport.normalizedCity.startsWith(query)) return 3
  if (airport.normalizedValue.startsWith(query)) return 4
  if (airport.normalizedCity.includes(query)) return 5
  return 6
}

export const searchAirports = (query, limit = 7) => {
  if (!airportIndex) return []
  const normalizedQuery = normalizeText(query)
  if (normalizedQuery.length < 2) return []

  return airportIndex
    .filter(
      (airport) =>
        airport.normalizedId.includes(normalizedQuery) ||
        airport.normalizedCity.includes(normalizedQuery) ||
        airport.normalizedValue.includes(normalizedQuery),
    )
    .sort((left, right) => {
      const l = getMatchScore(left, normalizedQuery)
      const r = getMatchScore(right, normalizedQuery)
      if (l !== r) return l - r
      return left.value.localeCompare(right.value, 'es')
    })
    .slice(0, limit)
}

export const resolveAirport = (query) => {
  if (!airportIndex) return null
  const normalizedQuery = normalizeText(query)
  if (!normalizedQuery) return null
  return (
    airportIndex.find((airport) => airport.normalizedId === normalizedQuery) ||
    airportIndex.find((airport) => airport.normalizedValue === normalizedQuery) ||
    null
  )
}

export const formatBridgeDate = (value) => String(value || '').replaceAll('-', '')

// Payload con los nombres de campo exactos que exige el motor externo.
export const buildFlightBridgePayload = ({
  tripType,
  originAirport,
  destinationAirport,
  departureDate,
  returnDate,
  adults,
  children,
  babies,
}) => ({
  startPt: originAirport.ciudad,
  endPt: destinationAirport.ciudad,
  startPtCode: originAirport.id,
  endPtCode: destinationAirport.id,
  startDt: formatBridgeDate(departureDate),
  endDt: tripType === 'round-trip' ? formatBridgeDate(returnDate) : '',
  flightType: tripType === 'round-trip' ? '1' : '0',
  adults: String(adults),
  children: String(children),
  infants: String(babies),
})

// POST nativo al motor (compatibilidad con el backend .aspx).
export const submitFlightBridge = (payload, options = {}) => {
  const { target = '_blank' } = options
  const form = document.createElement('form')
  form.method = 'POST'
  form.action = FLIGHT_BRIDGE_URL
  form.target = target
  form.style.display = 'none'

  Object.entries(payload).forEach(([key, value]) => {
    const input = document.createElement('input')
    input.type = 'hidden'
    input.name = key
    input.value = value
    form.appendChild(input)
  })

  document.body.appendChild(form)
  form.submit()
  document.body.removeChild(form)
}
