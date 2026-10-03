import { motion, useReducedMotion } from 'framer-motion'
import HeroPaperPlane from './HeroPaperPlane'

/**
 * Escena de cielo "Viaja por el mundo" — inspirada en un cielo con aviones de
 * papel y monumentos low-poly, pero en el cian de marca de Viajes Alkoste.
 *
 * Todo es vectorial (SVG + CSS), así que se ve nítido a cualquier resolución y
 * en cualquier pantalla sin pesar como un vídeo. Respeta "reduce-motion".
 *
 * Composición en 3 capas independientes para que sea responsive de verdad:
 *  1) Cielo (degradado cian) + sol/halo.
 *  2) Nubes que flotan suavemente (parallax ligero).
 *  3) Cordillera low-poly con monumentos, anclada SIEMPRE al borde inferior.
 *  4) Avión de papel con estela de puntos, arriba a la derecha.
 */

// Nubes: posición, tamaño, opacidad y ritmo de deriva. Se mantienen fuera de la
// columna de texto (izquierda-superior) para no restar legibilidad al titular.
const CLOUDS = [
  { top: '12%', left: '64%', w: 300, h: 96, o: 0.85, dur: 19, dx: -34, blur: 6 },
  { top: '7%', left: '86%', w: 190, h: 64, o: 0.7, dur: 17, dx: 24, blur: 5 },
  { top: '38%', left: '74%', w: 260, h: 86, o: 0.6, dur: 22, dx: 30, blur: 7 },
  { top: '60%', left: '40%', w: 340, h: 104, o: 0.5, dur: 25, dx: -26, blur: 8 },
  { top: '30%', left: '10%', w: 150, h: 52, o: 0.4, dur: 20, dx: 20, blur: 5 },
]

function Cloud({ w, h, o, reduce, dur, dx, blur }) {
  // Cúmulo de círculos solapados con base ligeramente arqueada; el desenfoque
  // suaviza el contorno para que parezca una nube real, no una cápsula.
  const puffs = [
    { cx: w * 0.16, cy: h * 0.72, r: h * 0.3 },
    { cx: w * 0.33, cy: h * 0.52, r: h * 0.44 },
    { cx: w * 0.52, cy: h * 0.44, r: h * 0.52 },
    { cx: w * 0.7, cy: h * 0.54, r: h * 0.42 },
    { cx: w * 0.85, cy: h * 0.72, r: h * 0.3 },
    { cx: w * 0.5, cy: h * 0.76, r: h * 0.32 },
  ]
  return (
    <motion.div
      aria-hidden="true"
      className="absolute"
      style={{ width: w, height: h, opacity: o, filter: `blur(${blur}px)` }}
      animate={reduce ? undefined : { x: [0, dx, 0] }}
      transition={reduce ? undefined : { duration: dur, repeat: Infinity, ease: 'easeInOut' }}
    >
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} fill="none">
        <g fill="#ffffff">
          {puffs.map((p, i) => (
            <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />
          ))}
        </g>
      </svg>
    </motion.div>
  )
}

export default function HeroSky() {
  const reduce = useReducedMotion()

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* 1 · Cielo cian de marca (se mantiene cian abajo para que los
          monumentos blancos contrasten) */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(176deg, #0a6fa1 0%, #0b86c4 20%, #08acf2 46%, #2fb4f3 74%, #63c8f6 100%)',
        }}
      />
      {/* sol / halo cálido-cian */}
      <div
        className="absolute -right-24 -top-24 h-[36rem] w-[36rem] rounded-full"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0) 62%)' }}
      />
      {/* fundido sutil con la sección blanca siguiente */}
      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white/45 to-transparent" />

      {/* 2 · Nubes */}
      {CLOUDS.map((c, i) => (
        <div key={i} className="absolute" style={{ top: c.top, left: c.left }}>
          <Cloud {...c} reduce={reduce} />
        </div>
      ))}

      {/* 3 · Cordillera low-poly + monumentos (anclada al fondo) */}
      <div className="absolute inset-x-0 bottom-0 h-[40%] sm:h-[46%]">
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 470"
          preserveAspectRatio="xMidYMax slice"
          fill="none"
        >
          <defs>
            {/* blancos con matiz cian para dar volumen low-poly sin grises */}
            <linearGradient id="sky-face-a" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="1" stopColor="#eaf7fe" />
            </linearGradient>
          </defs>

          {/* --- Monumentos (detrás de la última cresta) --- */}
          <g transform="translate(-96 0)">
            {/* Torre Eiffel */}
            <g>
              <path d="M560 332 L572 258 L580 220 L576 220 L583 182 L579 182 L585 150 L591 182 L587 182 L594 220 L590 220 L598 258 L610 332 L596 332 L592 300 L578 300 L574 332 Z" fill="url(#sky-face-a)" />
              <path d="M585 150 L591 182 L587 182 Z" fill="#dff1fb" />
              <rect x="576" y="218" width="18" height="3.5" fill="#dff1fb" />
              <rect x="570" y="256" width="30" height="3.5" fill="#dff1fb" />
            </g>

            {/* Big Ben */}
            <g>
              <rect x="648" y="196" width="26" height="136" fill="url(#sky-face-a)" />
              <path d="M661 150 L676 196 L646 196 Z" fill="#ffffff" />
              <path d="M661 150 L676 196 L661 196 Z" fill="#dff1fb" />
              <rect x="658" y="138" width="6" height="14" fill="#ffffff" />
              <circle cx="661" cy="224" r="7" fill="#cfeafa" />
              <circle cx="661" cy="224" r="3" fill="#ffffff" />
            </g>

            {/* Burj Al Arab (vela) */}
            <g>
              <path d="M726 332 L726 138 C 762 168, 780 258, 770 318 L726 332 Z" fill="url(#sky-face-a)" />
              <path d="M726 332 L726 138 C 744 170, 752 250, 748 318 L726 332 Z" fill="#dff1fb" />
              <path d="M726 138 L726 332" stroke="#bfe4f8" strokeWidth="2" />
            </g>

            {/* Rascacielos / skyline a la derecha */}
            <g fill="url(#sky-face-a)">
              <rect x="812" y="214" width="30" height="118" />
              <rect x="848" y="246" width="24" height="86" />
              <path d="M878 332 L878 190 L892 176 L906 190 L906 332 Z" />
            </g>
            <g fill="#dff1fb">
              <rect x="812" y="214" width="12" height="118" />
              <rect x="848" y="246" width="9" height="86" />
              <path d="M892 176 L906 190 L906 332 L892 332 Z" />
            </g>
          </g>

          {/* --- Cordillera low-poly (3 capas) --- */}
          {/* capa lejana */}
          <path d="M-20 360 L150 300 L330 352 L520 288 L700 356 L900 300 L1080 350 L1220 312 L1220 470 L-20 470 Z" fill="#ffffff" opacity="0.55" />
          {/* capa media, facetada */}
          <g>
            <path d="M-20 400 L120 338 L260 398 L400 340 L540 404 L540 470 L-20 470 Z" fill="#ffffff" opacity="0.8" />
            <path d="M120 338 L260 398 L190 470 L-20 470 L-20 420 Z" fill="#eaf7fe" opacity="0.8" />
            <path d="M540 404 L700 344 L860 402 L1020 344 L1220 406 L1220 470 L540 470 Z" fill="#ffffff" opacity="0.8" />
            <path d="M700 344 L860 402 L780 470 L620 470 Z" fill="#eaf7fe" opacity="0.8" />
            <path d="M1020 344 L1220 406 L1220 470 L1080 470 Z" fill="#eaf7fe" opacity="0.8" />
          </g>
          {/* capa cercana (primer plano nítido) */}
          <g>
            <path d="M-20 470 L-20 430 L180 384 L380 440 L600 382 L820 444 L1040 388 L1220 436 L1220 470 Z" fill="#ffffff" />
            <path d="M180 384 L380 440 L280 470 L60 470 Z" fill="#f2fbff" />
            <path d="M600 382 L820 444 L720 470 L500 470 Z" fill="#f2fbff" />
            <path d="M1040 388 L1220 436 L1220 470 L1100 470 Z" fill="#f2fbff" />
          </g>
        </svg>
      </div>

      {/* 4 · Avión de papel + estela */}
      <HeroPaperPlane className="right-[4%] top-[11%] w-[48%] max-w-[560px] sm:top-[13%] sm:w-[42%] lg:right-[6%] lg:top-[6%] lg:w-[32%]" />
    </div>
  )
}
