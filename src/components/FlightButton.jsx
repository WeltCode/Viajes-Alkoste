import { useEffect, useRef, useState } from 'react'
import { Plane } from 'lucide-react'

// Immersive submit button. Hover reveals the plane (pure CSS group-hover); the
// parent bumps `takeoffSignal` on submit, which adds `.is-flying` for ~1s and
// the CSS keyframes fly the plane across the whole button, leaving a contrail.
export default function FlightButton({ takeoffSignal = 0 }) {
  const [flying, setFlying] = useState(false)
  const timer = useRef()

  useEffect(() => {
    if (!takeoffSignal) return
    setFlying(true)
    clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setFlying(false), 1050)
    return () => clearTimeout(timer.current)
  }, [takeoffSignal])

  return (
    <button
      type="submit"
      className={`group relative flex w-full items-center justify-center overflow-hidden rounded-full bg-cyan-500 px-6 py-3 text-sm font-bold text-white shadow-glow transition-[background-color,transform] duration-300 hover:bg-cyan-600 active:scale-[0.985] focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2 ${flying ? 'is-flying' : ''}`}
    >
      {/* sky sweep during take-off */}
      <span
        aria-hidden="true"
        className="alk-sky pointer-events-none absolute inset-0 opacity-0"
        style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.6), transparent 80%)' }}
      />

      {/* dashed runway — lights on hover / take-off */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-7 bottom-[6px] h-[2px] rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-50 group-[.is-flying]:opacity-50"
        style={{ backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.9) 0 7px, transparent 7px 15px)' }}
      />

      {/* label */}
      <span className="alk-label relative z-10 tracking-wide transition-all duration-300">Buscar vuelo</span>

      {/* aircraft (contrail + plane) */}
      <span aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
        <span className="alk-aircraft absolute left-6 top-1/2 -mt-[10px] -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100">
          <span
            className="alk-contrail absolute right-full top-1/2 mr-1.5 h-[3px] w-0 -translate-y-1/2 rounded-full transition-[width,opacity] duration-500 group-hover:w-4 group-hover:opacity-60"
            style={{ background: 'linear-gradient(to left, rgba(255,255,255,0.95), rgba(255,255,255,0.4), transparent)' }}
          />
          <Plane className="h-5 w-5 rotate-45 text-white drop-shadow-[0_2px_7px_rgba(0,0,0,0.4)]" />
        </span>
      </span>
    </button>
  )
}
