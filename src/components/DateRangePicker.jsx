import { useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'

// --- utilidades de fecha (sin librerías) -----------------------------------
const pad = (n) => String(n).padStart(2, '0')
const toYMD = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const fromYMD = (s) => {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const startOfToday = () => {
  const t = new Date()
  t.setHours(0, 0, 0, 0)
  return t
}
const sameDay = (a, b) => a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const addMonths = (d, n) => new Date(d.getFullYear(), d.getMonth() + n, 1)

const WEEKDAYS = ['L', 'M', 'X', 'J', 'V', 'S', 'D']
const fmtLong = new Intl.DateTimeFormat('es-ES', { day: 'numeric', month: 'short' })
const fmtMonth = new Intl.DateTimeFormat('es-ES', { month: 'long', year: 'numeric' })

// Celdas del mes (empezando en lunes), con huecos nulos al principio.
function monthGrid(viewDate) {
  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const first = new Date(year, month, 1)
  const offset = (first.getDay() + 6) % 7 // lunes = 0
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []
  for (let i = 0; i < offset; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(year, month, d))
  while (cells.length % 7 !== 0) cells.push(null)
  return cells
}

const shellCls =
  'group flex w-full flex-col gap-1 rounded-2xl border border-line bg-mist px-4 py-3 text-left transition-all duration-300 hover:border-cyan-200 hover:bg-white'

function Trigger({ icon: Icon, label, value, active, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`${shellCls} ${active ? 'border-cyan-400 bg-white shadow-[0_0_0_4px_rgba(8,172,242,0.10)]' : ''}`}
    >
      <span className="flex items-center gap-1.5 text-[0.68rem] font-bold uppercase tracking-[0.12em] text-ink-500">
        <Icon className="h-3.5 w-3.5 text-cyan-500" /> {label}
      </span>
      <span className={`text-sm font-semibold ${value ? 'text-ink' : 'text-ink-400'}`}>
        {value ? fmtLong.format(value) : 'Elegir fecha'}
      </span>
    </button>
  )
}

/**
 * Selector de rango de fechas con nuestro diseño.
 * - Bloquea fechas anteriores a hoy y, para el regreso, anteriores a la salida.
 * - Sombrea el rango: salida y regreso resaltados, días intermedios en gris/cian.
 *
 * @param {{startDate,endDate,onChange,startLabel,endLabel,single,minDate}} props
 */
export default function DateRangePicker({
  startDate,
  endDate,
  onChange,
  startLabel = 'Salida',
  endLabel = 'Regreso',
  single = false,
  minDate,
}) {
  const start = fromYMD(startDate)
  const end = fromYMD(endDate)
  const min = minDate ? fromYMD(minDate) : startOfToday()

  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(null)
  const [view, setView] = useState(() => start || new Date())

  const cells = useMemo(() => monthGrid(view), [view])

  const disabled = (d) => {
    if (d < min) return true
    // Al elegir el regreso, bloquear días anteriores (o iguales) a la salida.
    if (!single && start && !end && d < start) return true
    return false
  }

  const inRange = (d) => {
    if (single || !start) return false
    const rangeEnd = end || (start && hover && hover > start ? hover : null)
    if (!rangeEnd) return false
    return d > start && d < rangeEnd
  }

  const pick = (d) => {
    if (disabled(d)) return
    if (single) {
      onChange({ start: toYMD(d), end: '' })
      setOpen(false)
      return
    }
    // sin salida, o rango ya completo → empezar de nuevo
    if (!start || (start && end)) {
      onChange({ start: toYMD(d), end: '' })
      return
    }
    // hay salida, falta regreso
    if (d <= start) {
      onChange({ start: toYMD(d), end: '' })
      return
    }
    onChange({ start: startDate, end: toYMD(d) })
    setOpen(false)
  }

  return (
    <div className={`relative grid gap-3 ${single ? 'grid-cols-1' : 'grid-cols-2'}`}>
      <Trigger icon={CalendarDays} label={startLabel} value={start} active={open} onClick={() => setOpen((v) => !v)} />
      {!single && (
        <Trigger icon={CalendarDays} label={endLabel} value={end} active={open} onClick={() => setOpen((v) => !v)} />
      )}

      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} aria-hidden="true" />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.18 }}
              className="absolute left-0 top-full z-50 mt-2 w-[19rem] max-w-[calc(100vw-2.5rem)] rounded-2xl border border-line bg-white p-3 shadow-lift"
            >
              {/* cabecera de mes */}
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  aria-label="Mes anterior"
                  disabled={addMonths(view, 0) <= new Date(min.getFullYear(), min.getMonth(), 1)}
                  onClick={() => setView((v) => addMonths(v, -1))}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-cyan-50 hover:text-cyan-600 disabled:opacity-30"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-sm font-bold text-ink first-letter:uppercase">{fmtMonth.format(view)}</span>
                <button
                  type="button"
                  aria-label="Mes siguiente"
                  onClick={() => setView((v) => addMonths(v, 1))}
                  className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-cyan-50 hover:text-cyan-600"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* días de la semana */}
              <div className="grid grid-cols-7 text-center text-[0.7rem] font-bold text-ink-400">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="py-1">{w}</span>
                ))}
              </div>

              {/* rejilla de días */}
              <div className="grid grid-cols-7" onMouseLeave={() => setHover(null)}>
                {cells.map((d, i) => {
                  if (!d) return <span key={i} />
                  const isStart = sameDay(d, start)
                  const isEnd = sameDay(d, end)
                  const isEdge = isStart || isEnd
                  const between = inRange(d)
                  const isDisabled = disabled(d)
                  return (
                    <div
                      key={i}
                      className={`relative py-0.5 ${between ? 'bg-cyan-50' : ''} ${isStart && (end || (hover && hover > start)) ? 'rounded-l-full bg-cyan-50' : ''} ${isEnd ? 'rounded-r-full bg-cyan-50' : ''}`}
                    >
                      <button
                        type="button"
                        disabled={isDisabled}
                        onMouseEnter={() => setHover(d)}
                        onClick={() => pick(d)}
                        className={`relative z-10 mx-auto grid h-9 w-9 place-items-center rounded-full text-sm font-semibold transition-colors
                          ${isEdge ? 'bg-cyan-500 text-white shadow-glow' : ''}
                          ${!isEdge && between ? 'text-cyan-700' : ''}
                          ${!isEdge && !between && !isDisabled ? 'text-ink hover:bg-cyan-100' : ''}
                          ${isDisabled ? 'cursor-not-allowed text-ink-300 line-through decoration-1' : ''}`}
                      >
                        {d.getDate()}
                      </button>
                    </div>
                  )
                })}
              </div>

              <div className="mt-2 flex items-center justify-between border-t border-line pt-2">
                <button type="button" onClick={() => onChange({ start: '', end: '' })} className="text-xs font-semibold text-ink-500 hover:text-ink">
                  Limpiar
                </button>
                <button type="button" onClick={() => setOpen(false)} className="rounded-full bg-cyan-500 px-4 py-1.5 text-xs font-bold text-white hover:bg-cyan-600">
                  Listo
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  )
}
