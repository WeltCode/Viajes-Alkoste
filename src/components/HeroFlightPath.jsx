import { motion, useReducedMotion } from 'framer-motion'

// A discreet, elegant "flight route" motif for the hero: a faint dotted arc with
// origin/destination nodes and a small plane gliding along it. Travel-themed,
// low-opacity, never competing with the headline.
const ROUTE = 'M-40 480 C 320 430, 560 250, 830 200 S 1180 120, 1260 70'

// Small sleek plane, nose pointing +x, centred on (0,0) so animateMotion can rotate it.
const PLANE = 'M11 0 L-7 -6 L-2.5 -1.6 L-10 -1.6 L-10 1.6 L-2.5 1.6 L-7 6 Z'

export default function HeroFlightPath() {
  const reduce = useReducedMotion()

  return (
    <svg
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 1200 700"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <path id="alk-route" d={ROUTE} />
        <filter id="alk-soft" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      {/* faint dotted route */}
      <motion.use
        href="#alk-route"
        stroke="#ffffff"
        strokeOpacity="0.17"
        strokeWidth="1.3"
        strokeDasharray="1.5 11"
        strokeLinecap="round"
        initial={reduce ? { opacity: 0.17 } : { pathLength: 0, opacity: 0 }}
        animate={reduce ? { opacity: 0.17 } : { pathLength: 1, opacity: 1 }}
        transition={{ duration: 2.6, delay: 0.5, ease: 'easeInOut' }}
      />

      {/* origin node */}
      <circle cx="-40" cy="480" r="3" fill="#ffffff" fillOpacity="0.35" />

      {/* destination node with a soft, slow pulse */}
      <g>
        <motion.circle
          cx="1215" cy="86" r="10" fill="#22bcea"
          initial={{ opacity: 0.28, scale: 0.7 }}
          animate={reduce ? { opacity: 0.2 } : { opacity: [0.28, 0, 0.28], scale: [0.7, 1.9, 0.7] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '1215px 86px' }}
        />
        <circle cx="1215" cy="86" r="3.4" fill="#3bbdf7" fillOpacity="0.8" />
      </g>

      {/* plane gliding along the route (motion only; static route stays elegant when reduced) */}
      {reduce ? (
        <g transform="translate(1120 116) rotate(-22)" opacity="0.55">
          <path d={PLANE} fill="#ffffff" />
        </g>
      ) : (
        <g opacity="0.5">
          <path d={PLANE} fill="#ffffff" filter="url(#alk-soft)" opacity="0.5">
            <animateMotion dur="24s" repeatCount="indefinite" rotate="auto" calcMode="linear">
              <mpath href="#alk-route" />
            </animateMotion>
          </path>
          <path d={PLANE} fill="#ffffff">
            <animateMotion dur="24s" repeatCount="indefinite" rotate="auto" calcMode="linear">
              <mpath href="#alk-route" />
            </animateMotion>
          </path>
        </g>
      )}
    </svg>
  )
}
