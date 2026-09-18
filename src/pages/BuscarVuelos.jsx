import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronRight, ExternalLink, Plane, ArrowLeft } from 'lucide-react'
import { decodeFlightSearchPayload, submitFlightBridge } from '../lib/flightBridge'
import FlightSearchLoader from '../components/FlightSearchLoader'
import Seo from '../components/Seo'

const IFRAME_NAME = 'alk-flight-results'
const MIN_LOADER_MS = 2600 // tiempo mínimo para disfrutar la animación de búsqueda

// YYYYMMDD → DD/MM/YYYY
const fmtDate = (d) => (d && d.length === 8 ? `${d.slice(6)}/${d.slice(4, 6)}/${d.slice(0, 4)}` : '')

export default function BuscarVuelos() {
  const { searchToken } = useParams()
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [minDone, setMinDone] = useState(false)

  const payload = useMemo(() => decodeFlightSearchPayload(searchToken), [searchToken])
  const searching = !(iframeLoaded && minDone)

  useEffect(() => {
    if (!payload) return
    setIframeLoaded(false)
    setMinDone(false)
    const post = window.setTimeout(() => submitFlightBridge(payload, { target: IFRAME_NAME }), 60)
    const min = window.setTimeout(() => setMinDone(true), MIN_LOADER_MS)
    return () => {
      window.clearTimeout(post)
      window.clearTimeout(min)
    }
  }, [payload])

  const subtitle = payload
    ? [
        payload.flightType === '1' ? 'Ida y vuelta' : 'Sólo ida',
        fmtDate(payload.startDt),
        payload.endDt ? `→ ${fmtDate(payload.endDt)}` : null,
        `${payload.adults} adulto${payload.adults > 1 ? 's' : ''}`,
        payload.children > 0 ? `${payload.children} niño${payload.children > 1 ? 's' : ''}` : null,
        payload.infants > 0 ? `${payload.infants} bebé${payload.infants > 1 ? 's' : ''}` : null,
      ]
        .filter(Boolean)
        .join(' · ')
    : ''

  if (!payload) {
    return (
      <section className="flex min-h-[70vh] items-center bg-mist pt-24">
        <Seo noindex title="Búsqueda de vuelos | Viajes Alkoste" />
        <div className="container-x text-center">
          <div className="mx-auto max-w-md rounded-3xl border border-line bg-white p-10 shadow-card">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-red-50 text-red-500">
              <Plane className="h-6 w-6" />
            </span>
            <h1 className="mt-4 font-display text-2xl font-bold text-ink">Búsqueda no válida</h1>
            <p className="mt-2 text-sm text-ink-700">Este enlace no contiene una búsqueda válida o fue modificado.</p>
            <Link to="/" className="btn-primary mt-6"><ArrowLeft className="h-4 w-4" /> Volver al inicio</Link>
          </div>
        </div>
      </section>
    )
  }

  return (
    <>
      <Seo noindex title={`Vuelos ${payload.startPt} → ${payload.endPt} | Viajes Alkoste`} />
      {/* Header */}
      <section className="relative overflow-hidden border-b border-line bg-mist pt-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-100 blur-[110px]" aria-hidden="true" />
        <div className="container-x relative pb-10">
          <nav className="mb-4 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
            <Link to="/" className="hover:text-cyan-600">Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-cyan-600">Resultados de vuelos</span>
          </nav>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="kicker mb-2"><Plane className="h-3.5 w-3.5" /> Buscador de vuelos</span>
              <h1 className="display text-3xl leading-tight text-ink sm:text-4xl">
                {payload?.startPt} <span className="text-cyan-500">→</span> {payload?.endPt}
              </h1>
              <p className="mt-2 text-sm font-medium text-ink-600">{subtitle}</p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <Link to="/vuelos" className="btn-ghost"><ArrowLeft className="h-4 w-4" /> Nueva búsqueda</Link>
              <button type="button" onClick={() => submitFlightBridge(payload, { target: '_blank' })} className="btn-primary">
                Abrir en pestaña nueva <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Resultados */}
      <section className="bg-white py-8 sm:py-12">
        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative overflow-hidden rounded-[28px] border border-line bg-white shadow-lift"
          >
            <iframe
              title="Resultados de vuelos"
              name={IFRAME_NAME}
              onLoad={() => setIframeLoaded(true)}
              className="block w-full bg-white"
              style={{ height: 'calc(100vh - 160px)', minHeight: '760px' }}
            />

            {/* Animación de búsqueda superpuesta hasta que el motor responde */}
            <AnimatePresence>
              {searching && (
                <motion.div
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 z-10 bg-white"
                >
                  <FlightSearchLoader from={payload.startPt} to={payload.endPt} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <p className="mt-4 text-center text-xs text-ink-500">
            ¿Prefieres que te lo gestionemos? Escríbenos por WhatsApp y un agente te ayuda con tu reserva.
          </p>
        </div>
      </section>
    </>
  )
}
