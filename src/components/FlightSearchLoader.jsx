import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plane } from 'lucide-react'

const MESSAGES = [
  'Despegando…',
  'Buscando las mejores tarifas…',
  'Comparando aerolíneas…',
  'Revisando equipaje y horarios…',
  'Preparando tu itinerario…',
]

const PLANE = 'M11 0 L-7 -6 L-2.5 -1.6 L-10 -1.6 L-10 1.6 L-2.5 1.6 L-7 6 Z'

function Cloud({ className, delay = 0, duration = 22, from = '-20%', to = '120%', scale = 1 }) {
  return (
    <motion.svg
      viewBox="0 0 120 60"
      className={`pointer-events-none absolute ${className}`}
      style={{ width: 120 * scale }}
      initial={{ left: from, opacity: 0 }}
      animate={{ left: [from, to], opacity: [0, 0.9, 0.9, 0] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
      aria-hidden="true"
    >
      <g fill="#ffffff">
        <ellipse cx="40" cy="40" rx="30" ry="18" />
        <ellipse cx="65" cy="34" rx="24" ry="20" />
        <ellipse cx="86" cy="42" rx="22" ry="14" />
        <rect x="30" y="38" width="70" height="16" rx="8" />
      </g>
    </motion.svg>
  )
}

export default function FlightSearchLoader({ from = 'Origen', to = 'Destino' }) {
  const [msg, setMsg] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 1500)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white px-6 py-16">
      {/* clouds */}
      <Cloud className="top-[14%] opacity-70" from="-25%" to="125%" duration={26} scale={1.2} />
      <Cloud className="top-[30%] opacity-50" from="120%" to="-30%" duration={34} delay={2} scale={0.8} />
      <Cloud className="bottom-[16%] opacity-60" from="-20%" to="120%" duration={30} delay={1} scale={1} />

      {/* route with flying plane */}
      <div className="relative w-full max-w-xl">
        <svg viewBox="0 0 400 170" className="w-full" fill="none" aria-hidden="true">
          <defs>
            <path id="loader-route" d="M52 128 C 150 92, 250 70, 348 44" />
            <filter id="loader-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2.4" />
            </filter>
          </defs>

          {/* drawn dashed route */}
          <motion.use
            href="#loader-route"
            stroke="#08acf2"
            strokeWidth="2.5"
            strokeDasharray="2 9"
            strokeLinecap="round"
            initial={{ pathLength: 0, opacity: 0.2 }}
            animate={{ pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 1.6, ease: 'easeInOut' }}
          />

          {/* endpoints */}
          <circle cx="52" cy="128" r="6" fill="#fff" stroke="#08acf2" strokeWidth="3" />
          <g>
            <motion.circle cx="348" cy="44" r="9" fill="#08acf2"
              animate={{ opacity: [0.3, 0, 0.3], scale: [0.7, 2, 0.7] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: '348px 44px' }} />
            <circle cx="348" cy="44" r="6" fill="#08acf2" stroke="#fff" strokeWidth="3" />
          </g>

          {/* plane trail + plane traveling the route */}
          <g fill="#0790cf">
            <path d={PLANE} opacity="0.35" filter="url(#loader-glow)">
              <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href="#loader-route" />
              </animateMotion>
            </path>
            <path d={PLANE} fill="#08acf2">
              <animateMotion dur="3s" repeatCount="indefinite" rotate="auto" keyPoints="0;1" keyTimes="0;1" calcMode="linear">
                <mpath href="#loader-route" />
              </animateMotion>
            </path>
          </g>
        </svg>

        {/* city labels over the endpoints */}
        <span className="absolute -bottom-1 left-[6%] flex items-center gap-1 text-sm font-bold text-ink">
          {from}
        </span>
        <span className="absolute -top-2 right-[4%] flex items-center gap-1 text-sm font-bold text-cyan-600">
          {to}
        </span>
      </div>

      {/* animated badge + rotating message */}
      <div className="relative mt-12 flex flex-col items-center gap-4 text-center">
        <span className="relative grid h-14 w-14 place-items-center rounded-2xl bg-cyan-500 text-white shadow-glow">
          <motion.span
            className="absolute inset-0 rounded-2xl border-2 border-cyan-400"
            animate={{ scale: [1, 1.35], opacity: [0.6, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span animate={{ y: [1, -3, 1], rotate: [0, 4, 0] }} transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}>
            <Plane className="h-6 w-6 -rotate-45" />
          </motion.span>
        </span>

        <div className="h-6 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.p
              key={msg}
              initial={{ y: 14, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -14, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-lg font-bold text-ink"
            >
              {MESSAGES[msg]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="flex items-center gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-cyan-400"
              animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
