import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ChevronRight, ExternalLink, Loader2, Plane, ArrowLeft } from 'lucide-react'
import { decodeFlightSearchPayload, submitFlightBridge } from '../lib/flightBridge'

const IFRAME_NAME = 'alk-flight-results'

// YYYYMMDD → DD/MM/YYYY
const fmtDate = (d) => (d && d.length === 8 ? `${d.slice(6)}/${d.slice(4, 6)}/${d.slice(0, 4)}` : '')

export default function BuscarVuelos() {
  const { searchToken } = useParams()
  const [status, setStatus] = useState('loading') // loading | ready | error

  const payload = useMemo(() => decodeFlightSearchPayload(searchToken), [searchToken])

  useEffect(() => {
    if (!payload) {
      setStatus('error')
      return
    }
    setStatus('loading')
    // POST al iframe una vez montado.
    const t = window.setTimeout(() => submitFlightBridge(payload, { target: IFRAME_NAME }), 60)
    return () => window.clearTimeout(t)
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

  if (status === 'error') {
    return (
      <section className="flex min-h-[70vh] items-center bg-mist pt-24">
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
            className="overflow-hidden rounded-[28px] border border-line bg-white shadow-lift"
          >
            {status === 'loading' && (
              <div className="flex items-center justify-center gap-3 border-b border-line bg-mist px-6 py-4 text-sm font-medium text-ink-600">
                <Loader2 className="h-4 w-4 animate-spin text-cyan-500" />
                Cargando resultados del motor de vuelos…
              </div>
            )}
            <iframe
              title="Resultados de vuelos"
              name={IFRAME_NAME}
              onLoad={() => setStatus('ready')}
              className="block w-full bg-white"
              style={{ height: 'calc(100vh - 160px)', minHeight: '760px' }}
            />
          </motion.div>

          <p className="mt-4 text-center text-xs text-ink-500">
            ¿Prefieres que te lo gestionemos? Escríbenos por WhatsApp y un agente te ayuda con tu reserva.
          </p>
        </div>
      </section>
    </>
  )
}
