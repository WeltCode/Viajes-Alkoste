import { useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, CalendarDays, Users, ArrowLeftRight, Plane, Minus, Plus, AlertCircle } from 'lucide-react'
import FlightButton from './FlightButton'
import {
  preloadAirports,
  searchAirports,
  resolveAirport,
  buildFlightBridgePayload,
  submitFlightBridge,
} from '../lib/flightBridge'

const ease = [0.16, 1, 0.3, 1]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } } }
const item = { hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease } } }

const inputCls =
  'w-full bg-transparent text-sm font-semibold text-ink outline-none placeholder:font-medium placeholder:text-ink-400'

function FieldShell({ icon: Icon, label, children, className = '' }) {
  return (
    <div className={`group relative flex flex-col gap-1 rounded-2xl border border-line bg-mist px-4 py-3 transition-all duration-300 focus-within:border-cyan-400 focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(8,172,242,0.10)] hover:border-cyan-200 hover:bg-white ${className}`}>
      <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-500">
        <Icon className="h-3.5 w-3.5 text-cyan-500 transition-transform duration-300 group-focus-within:scale-110" />
        {label}
      </span>
      {children}
    </div>
  )
}

/* Autocompletado de aeropuerto */
function AirportField({ label, value, onChange, onSelect, suggestions, open, onFocus, onBlur }) {
  return (
    <motion.div variants={item} className="relative">
      <FieldShell icon={MapPin} label={label}>
        <input
          className={inputCls}
          autoComplete="off"
          placeholder="Ciudad o aeropuerto"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
        />
      </FieldShell>
      <AnimatePresence>
        {open && suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute z-40 mt-2 max-h-64 w-full overflow-y-auto rounded-2xl border border-line bg-white p-1.5 shadow-lift"
          >
            {suggestions.map((a) => (
              <li key={`${a.id}-${a.value}`}>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => onSelect(a)}
                  className="flex w-full items-start justify-between gap-3 rounded-xl px-3 py-2 text-left transition hover:bg-cyan-50"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-ink">{a.value}</span>
                    <span className="block text-xs text-ink-500">{a.ciudad}</span>
                  </span>
                  <span className="shrink-0 rounded-full bg-cyan-100 px-2 py-0.5 text-xs font-bold text-cyan-700">{a.id}</span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* Contador de pasajeros */
function Stepper({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2">
      <div>
        <p className="text-sm font-bold text-ink">{label}</p>
        <p className="text-xs text-ink-500">{hint}</p>
      </div>
      <div className="flex items-center gap-3">
        <button type="button" aria-label={`Menos ${label}`} disabled={value <= min} onClick={() => onChange(value - 1)}
          className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-40">
          <Minus className="h-4 w-4" />
        </button>
        <span className="w-5 text-center text-sm font-bold text-ink">{value}</span>
        <button type="button" aria-label={`Más ${label}`} disabled={value >= max} onClick={() => onChange(value + 1)}
          className="grid h-8 w-8 place-items-center rounded-full border border-line text-ink transition-colors hover:border-cyan-400 hover:text-cyan-600 disabled:opacity-40">
          <Plus className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}

export default function SearchWidget() {
  const [tripType, setTripType] = useState('round-trip')
  const [error, setError] = useState('')
  const [ready, setReady] = useState(false)
  const [takeoffSignal, setTakeoffSignal] = useState(0)

  const [form, setForm] = useState({ origin: '', destination: '', departureDate: '', returnDate: '' })
  const [selected, setSelected] = useState({ origin: null, destination: null })
  const [pax, setPax] = useState({ adults: 1, children: 0, babies: 0 })
  const [focused, setFocused] = useState('')
  const [paxOpen, setPaxOpen] = useState(false)

  const roundTrip = tripType === 'round-trip'

  useEffect(() => {
    preloadAirports().then(() => setReady(true))
  }, [])

  const originSug = useMemo(() => searchAirports(form.origin), [form.origin, ready])
  const destSug = useMemo(() => searchAirports(form.destination), [form.destination, ready])

  const setField = (field, value) => {
    setError('')
    setForm((f) => ({ ...f, [field]: value }))
    if (field === 'origin' || field === 'destination') setSelected((s) => ({ ...s, [field]: null }))
  }
  const selectAirport = (field, airport) => {
    setForm((f) => ({ ...f, [field]: airport.value }))
    setSelected((s) => ({ ...s, [field]: airport }))
    setFocused('')
    setError('')
  }
  const swap = () => {
    setError('')
    setForm((f) => ({ ...f, origin: f.destination, destination: f.origin }))
    setSelected((s) => ({ origin: s.destination, destination: s.origin }))
  }
  const resolve = (field) => selected[field] || resolveAirport(form[field])

  const paxSummary = () => {
    const parts = [`${pax.adults} adulto${pax.adults !== 1 ? 's' : ''}`]
    if (pax.children) parts.push(`${pax.children} niño${pax.children !== 1 ? 's' : ''}`)
    if (pax.babies) parts.push(`${pax.babies} bebé${pax.babies !== 1 ? 's' : ''}`)
    return parts.join(' · ')
  }

  const submit = (e) => {
    e.preventDefault()
    const origin = resolve('origin')
    const destination = resolve('destination')
    if (!origin) return setError('Selecciona un aeropuerto de origen de la lista.')
    if (!destination) return setError('Selecciona un aeropuerto de destino de la lista.')
    if (origin.id === destination.id) return setError('El origen y el destino no pueden ser iguales.')
    if (!form.departureDate) return setError('Selecciona la fecha de salida.')
    if (roundTrip && !form.returnDate) return setError('Selecciona la fecha de regreso.')
    if (roundTrip && form.returnDate && form.returnDate < form.departureDate)
      return setError('El regreso no puede ser anterior a la salida.')
    if (pax.babies > pax.adults) return setError('No puede haber más bebés que adultos.')

    const payload = buildFlightBridgePayload({
      tripType,
      originAirport: origin,
      destinationAirport: destination,
      departureDate: form.departureDate,
      returnDate: form.returnDate,
      adults: pax.adults,
      children: pax.children,
      babies: pax.babies,
    })

    setTakeoffSignal((n) => n + 1) // reproduce el despegue
    window.setTimeout(() => submitFlightBridge(payload, { target: '_blank' }), 850)
  }

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="show"
      onSubmit={submit}
      className="relative w-full rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-lift backdrop-blur-xl sm:p-6"
      aria-label="Buscador de vuelos"
    >
      {/* glow (clipped) */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <motion.span
          aria-hidden="true"
          className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </span>

      <div className="relative mb-4 flex flex-wrap items-center justify-between gap-3">
        <span className="flex items-center gap-2.5 text-sm font-bold text-ink">
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-cyan-500 text-white shadow-glow">
            <motion.span animate={{ y: [1, -2, 1], rotate: [0, 3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
              <Plane className="h-4 w-4 -rotate-45" />
            </motion.span>
          </span>
          Buscar vuelos
        </span>

        <div className="relative inline-flex rounded-full border border-line bg-mist p-1 text-xs font-bold">
          {[
            ['round-trip', 'Ida y vuelta'],
            ['one-way', 'Sólo ida'],
          ].map(([id, label]) => (
            <button
              type="button"
              key={id}
              onClick={() => setTripType(id)}
              className={`relative z-10 rounded-full px-3.5 py-1.5 transition-colors duration-300 ${tripType === id ? 'text-cyan-600' : 'text-ink-500 hover:text-ink'}`}
            >
              {tripType === id && (
                <motion.span layoutId="tripPill" className="absolute inset-0 -z-10 rounded-full bg-white shadow-card" transition={{ type: 'spring', stiffness: 420, damping: 34 }} />
              )}
              {label}
            </button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="relative overflow-hidden"
          >
            <p className="mb-3 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="relative z-20 sm:col-span-2 sm:grid sm:grid-cols-2 sm:gap-3">
          <AirportField
            label="Origen"
            value={form.origin}
            onChange={(v) => setField('origin', v)}
            onSelect={(a) => selectAirport('origin', a)}
            suggestions={originSug}
            open={focused === 'origin'}
            onFocus={() => setFocused('origin')}
            onBlur={() => setTimeout(() => setFocused((f) => (f === 'origin' ? '' : f)), 150)}
          />
          <AirportField
            label="Destino"
            value={form.destination}
            onChange={(v) => setField('destination', v)}
            onSelect={(a) => selectAirport('destination', a)}
            suggestions={destSug}
            open={focused === 'destination'}
            onFocus={() => setFocused('destination')}
            onBlur={() => setTimeout(() => setFocused((f) => (f === 'destination' ? '' : f)), 150)}
          />
          <div className="absolute left-1/2 top-1/2 z-30 hidden -translate-x-1/2 -translate-y-1/2 sm:block">
            <motion.button type="button" onClick={swap} whileTap={{ scale: 0.85 }} aria-label="Intercambiar origen y destino"
              className="grid h-9 w-9 place-items-center rounded-full border border-line bg-white text-cyan-500 shadow-card ring-4 ring-white transition-colors hover:border-cyan-400 hover:text-cyan-600">
              <ArrowLeftRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>

        <motion.div variants={item}>
          <FieldShell icon={CalendarDays} label="Salida">
            <input type="date" className={inputCls} value={form.departureDate} onChange={(e) => setField('departureDate', e.target.value)} />
          </FieldShell>
        </motion.div>

        <AnimatePresence initial={false} mode="popLayout">
          {roundTrip && (
            <motion.div key="regreso" layout initial={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }} animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }} exit={{ opacity: 0, scale: 0.94, filter: 'blur(4px)' }} transition={{ duration: 0.35, ease }}>
              <FieldShell icon={CalendarDays} label="Regreso">
                <input type="date" className={inputCls} value={form.returnDate} onChange={(e) => setField('returnDate', e.target.value)} />
              </FieldShell>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Viajeros (popover) */}
        <motion.div variants={item} className="relative z-10">
          <button type="button" onClick={() => setPaxOpen((v) => !v)} className="w-full text-left">
            <FieldShell icon={Users} label="Viajeros">
              <span className="truncate text-sm font-semibold text-ink">{paxSummary()}</span>
            </FieldShell>
          </button>
          <AnimatePresence>
            {paxOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setPaxOpen(false)} aria-hidden="true" />
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18 }}
                  className="absolute z-50 mt-2 w-full min-w-[16rem] rounded-2xl border border-line bg-white p-4 shadow-lift"
                >
                  <Stepper label="Adultos" hint="Desde 12 años" value={pax.adults} min={1} max={9} onChange={(v) => setPax((p) => ({ ...p, adults: v }))} />
                  <Stepper label="Niños" hint="2 a 11 años" value={pax.children} min={0} max={8} onChange={(v) => setPax((p) => ({ ...p, children: v }))} />
                  <Stepper label="Bebés" hint="0 a 1 año" value={pax.babies} min={0} max={pax.adults} onChange={(v) => setPax((p) => ({ ...p, babies: v }))} />
                  <button type="button" onClick={() => setPaxOpen(false)} className="btn-primary mt-3 w-full">Listo</button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={item} layout="position" className={`flex ${roundTrip ? '' : 'sm:col-span-2'}`}>
          <FlightButton takeoffSignal={takeoffSignal} />
        </motion.div>
      </div>

      <p className="relative mt-4 text-xs leading-relaxed text-ink-500">
        Los resultados se abren en nuestro motor de reservas seguro.
      </p>
    </motion.form>
  )
}
