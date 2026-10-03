import { motion, useReducedMotion } from 'framer-motion'

/**
 * Avión de papel origami (facetado) con estela de puntos, flotando suavemente.
 * Firma de marca que vuela sobre el hero (escena vectorial o vídeo).
 * Respeta "reduce-motion". `className` posiciona el contenedor.
 */
export default function HeroPaperPlane({ className = '' }) {
  const reduce = useReducedMotion()
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 520 320" fill="none" className="h-auto w-full">
        {/* estela de puntos */}
        <motion.path
          d="M24 292 C 150 268, 120 150, 300 132"
          stroke="#ffffff"
          strokeOpacity="0.85"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="2 18"
          initial={reduce ? { pathLength: 1, opacity: 0.85 } : { pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.85 }}
          transition={{ duration: 2.4, delay: 0.4, ease: 'easeInOut' }}
        />

        {/* avión de papel (origami facetado), flotando */}
        <motion.g
          initial={reduce ? false : { opacity: 0, x: -14, y: 10 }}
          animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0, y: [0, -14, 0] }}
          transition={
            reduce
              ? { duration: 0.6 }
              : {
                  opacity: { duration: 0.8, delay: 0.2 },
                  x: { duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] },
                  y: { duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 },
                }
          }
          style={{ transformOrigin: '320px 140px' }}
        >
          <g transform="rotate(-16 320 140)">
            {/* sombra suave bajo el avión */}
            <ellipse cx="322" cy="214" rx="86" ry="12" fill="#0a6fa1" opacity="0.18" />
            {/* ala superior */}
            <path d="M198 150 L432 96 L300 182 Z" fill="#ffffff" />
            {/* cuerpo / quilla (faceta en sombra) */}
            <path d="M198 150 L300 182 L246 206 Z" fill="#dcf0fb" />
            {/* ala derecha sobre el cuerpo */}
            <path d="M300 182 L432 96 L322 178 Z" fill="#eef8fe" />
            {/* pliegue central */}
            <path d="M300 182 L432 96" stroke="#bfe4f8" strokeWidth="2.5" strokeLinecap="round" />
          </g>
        </motion.g>
      </svg>
    </div>
  )
}
