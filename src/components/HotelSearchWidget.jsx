import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { MapPin, BedDouble, Minus, Plus, AlertCircle, Search, Loader2, Building2 } from 'lucide-react'
import { searchHotelDestinations, buildHotelResultsUrl } from '../lib/hotelBridge'
import DateRangePicker from './DateRangePicker'

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

function Stepper({ label, hint, value, min, max, onChange }) {
  return (
    <div className="flex items-center justify-between gap-4 py-1.5">
      <div>
        <p className="text-sm font-bold text-ink">{label}</p>
        {hint && <p className="text-xs text-ink-500">{hint}</p>}
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

const emptyRoom = () => ({ adults: 2, children: [] })

export default function HotelSearchWidget({ onSearch }) {
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState(null)
  const [suggestions, setSuggestions] = useState([])
  const [loadingSug, setLoadingSug] = useState(false)
  const [openSug, setOpenSug] = useState(false)

  const [dates, setDates] = useState({ checkin: '', checkout: '' })
  const [rooms, setRooms] = useState([emptyRoom()])
  const [roomsOpen, setRoomsOpen] = useState(false)
  const [error, setError] = useState('')

  const debounceRef = useRef(null)

  // Autocompletado con debounce contra el motor de Veturis (JSONP).
  useEffect(() => {
    if (selected && query === selected.value) return
    if (query.trim().length < 2) {
      setSuggestions([])
      setLoadingSug(false)
      return
    }
    setLoadingSug(true)
    clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(async () => {
      const res = await searchHotelDestinations(query)
      setSuggestions(res)
      setLoadingSug(false)
    }, 280)
    return () => clearTimeout(debounceRef.current)
  }, [query, selected])

  const totalAdults = rooms.reduce((n, r) => n + r.adults, 0)
  const totalChildren = rooms.reduce((n, r) => n + r.children.length, 0)
  const roomsSummary = `${totalAdults} adulto${totalAdults !== 1 ? 's' : ''}${totalChildren ? ` · ${totalChildren} niño${totalChildren !== 1 ? 's' : ''}` : ''} · ${rooms.length} hab.`

  const setRoom = (i, updater) => setRooms((rs) => rs.map((r, idx) => (idx === i ? updater(r) : r)))
  const setChildrenCount = (i, count) =>
    setRoom(i, (r) => {
      const children = [...r.children]
      while (children.length < count) children.push(7)
      children.length = count
      return { ...r, children }
    })
  const addRoom = () => setRooms((rs) => (rs.length < 5 ? [...rs, emptyRoom()] : rs))
  const removeRoom = (i) => setRooms((rs) => (rs.length > 1 ? rs.filter((_, idx) => idx !== i) : rs))

  const selectDestino = (d) => {
    setSelected(d)
    setQuery(d.value)
    setOpenSug(false)
    setError('')
  }

  const submit = (e) => {
    e.preventDefault()
    if (!selected) return setError('Elige un destino u hotel de la lista.')
    if (!dates.checkin) return setError('Selecciona la fecha de entrada.')
    if (!dates.checkout) return setError('Selecciona la fecha de salida.')
    if (dates.checkout <= dates.checkin) return setError('La salida debe ser posterior a la entrada.')

    const url = buildHotelResultsUrl({
      destino: selected.value,
      destinoId: selected.id,
      checkin: dates.checkin,
      checkout: dates.checkout,
      rooms,
    })
    onSearch?.(url, selected.value)
  }

  return (
    <motion.form
      variants={container}
      initial="hidden"
      animate="show"
      onSubmit={submit}
      className="relative w-full rounded-[28px] border border-white/60 bg-white/95 p-5 shadow-lift backdrop-blur-xl sm:p-6"
      aria-label="Buscador de hoteles"
    >
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
        <motion.span aria-hidden="true" className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-cyan-300/30 blur-3xl"
          animate={{ scale: [1, 1.25, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }} />
      </span>

      <div className="relative mb-4 flex items-center gap-2.5 text-sm font-bold text-ink">
        <span className="grid h-9 w-9 place-items-center rounded-full bg-cyan-500 text-white shadow-glow">
          <BedDouble className="h-4 w-4" />
        </span>
        Buscar hoteles
      </div>

      <AnimatePresence>
        {error && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="relative overflow-hidden">
            <p className="mb-3 flex items-start gap-2 rounded-2xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-600">
              <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" /> {error}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Destino / hotel */}
        <motion.div variants={item} className="relative z-30 sm:col-span-2">
          <FieldShell icon={MapPin} label="Destino u hotel">
            <input
              className={inputCls}
              autoComplete="off"
              placeholder="Ciudad, zona u hotel (ej. Cancún, Punta Cana…)"
              value={query}
              onChange={(e) => { setQuery(e.target.value); setSelected(null); setOpenSug(true); setError('') }}
              onFocus={() => setOpenSug(true)}
              onBlur={() => setTimeout(() => setOpenSug(false), 160)}
            />
          </FieldShell>
          <AnimatePresence>
            {openSug && query.trim().length >= 2 && (
              <motion.ul
                initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
                className="absolute z-40 mt-2 max-h-72 w-full overflow-y-auto rounded-2xl border border-line bg-white p-1.5 shadow-lift"
              >
                {loadingSug && (
                  <li className="flex items-center gap-2 px-3 py-3 text-sm text-ink-500">
                    <Loader2 className="h-4 w-4 animate-spin text-cyan-500" /> Buscando destinos…
                  </li>
                )}
                {!loadingSug && suggestions.length === 0 && (
                  <li className="px-3 py-3 text-sm text-ink-500">Sin resultados. Prueba con otra ciudad u hotel.</li>
                )}
                {suggestions.map((s) => (
                  <li key={s.id}>
                    <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => selectDestino(s)}
                      className="flex w-full items-start gap-2.5 rounded-xl px-3 py-2 text-left transition hover:bg-cyan-50">
                      <span className={`mt-0.5 grid h-7 w-7 shrink-0 place-items-center rounded-lg ${s.isHotel ? 'bg-amber-100 text-amber-600' : 'bg-cyan-100 text-cyan-700'}`}>
                        {s.isHotel ? <Building2 className="h-4 w-4" /> : <MapPin className="h-4 w-4" />}
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-ink">{s.value}</span>
                        <span className="block truncate text-xs text-ink-500">{s.pais}{s.isHotel ? ' · Hotel' : ''}</span>
                      </span>
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={item} className="sm:col-span-2">
          <DateRangePicker
            startLabel="Entrada"
            endLabel="Salida"
            startDate={dates.checkin}
            endDate={dates.checkout}
            onChange={({ start, end }) => { setDates({ checkin: start, checkout: end }); setError('') }}
          />
        </motion.div>

        {/* Habitaciones y huéspedes */}
        <motion.div variants={item} className="relative z-20">
          <button type="button" onClick={() => setRoomsOpen((v) => !v)} className="w-full text-left">
            <FieldShell icon={BedDouble} label="Habitaciones y huéspedes">
              <span className="truncate text-sm font-semibold text-ink">{roomsSummary}</span>
            </FieldShell>
          </button>
          <AnimatePresence>
            {roomsOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setRoomsOpen(false)} aria-hidden="true" />
                <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.18 }}
                  className="absolute z-50 mt-2 max-h-[60vh] w-full min-w-[17rem] overflow-y-auto rounded-2xl border border-line bg-white p-4 shadow-lift">
                  {rooms.map((room, i) => (
                    <div key={i} className={`${i > 0 ? 'mt-3 border-t border-line pt-3' : ''}`}>
                      <div className="flex items-center justify-between">
                        <p className="text-xs font-bold uppercase tracking-wide text-cyan-600">Habitación {i + 1}</p>
                        {rooms.length > 1 && (
                          <button type="button" onClick={() => removeRoom(i)} className="text-xs font-semibold text-ink-400 hover:text-red-500">Quitar</button>
                        )}
                      </div>
                      <Stepper label="Adultos" value={room.adults} min={1} max={6} onChange={(v) => setRoom(i, (r) => ({ ...r, adults: v }))} />
                      <Stepper label="Niños" hint="0 a 17 años" value={room.children.length} min={0} max={4} onChange={(v) => setChildrenCount(i, v)} />
                      {room.children.length > 0 && (
                        <div className="mt-1 grid grid-cols-2 gap-2">
                          {room.children.map((age, ci) => (
                            <label key={ci} className="flex items-center gap-1.5 rounded-xl border border-line bg-mist px-2.5 py-1.5 text-xs font-semibold text-ink-600">
                              Niño {ci + 1}
                              <select value={age} onChange={(e) => setRoom(i, (r) => { const c = [...r.children]; c[ci] = Number(e.target.value); return { ...r, children: c } })}
                                className="ml-auto rounded-md bg-white px-1 py-0.5 text-ink outline-none">
                                {Array.from({ length: 18 }, (_, a) => <option key={a} value={a}>{a}</option>)}
                              </select>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                  {rooms.length < 5 && (
                    <button type="button" onClick={addRoom} className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl border border-dashed border-cyan-300 py-2 text-sm font-semibold text-cyan-600 hover:bg-cyan-50">
                      <Plus className="h-4 w-4" /> Añadir habitación
                    </button>
                  )}
                  <button type="button" onClick={() => setRoomsOpen(false)} className="btn-primary mt-3 w-full">Listo</button>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div variants={item} className="sm:col-span-2">
          <button type="submit" className="btn-primary w-full justify-center py-3.5 text-base">
            <Search className="h-5 w-5" /> Buscar hoteles
          </button>
        </motion.div>
      </div>

      <p className="relative mt-4 text-xs leading-relaxed text-ink-500">
        Verás la disponibilidad aquí mismo, con las tarifas en tiempo real de nuestro motor de reservas.
      </p>
    </motion.form>
  )
}
