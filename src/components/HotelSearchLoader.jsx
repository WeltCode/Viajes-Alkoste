import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { BedDouble, MapPin, Star, Wifi, Waves, Utensils } from 'lucide-react'
import { useI18n } from '../i18n/LanguageProvider'

// Iconos de servicios que flotan suavemente en el fondo.
const FLOATERS = [
  { Icon: Star, x: '12%', y: '22%', d: 0, dur: 5 },
  { Icon: Waves, x: '82%', y: '30%', d: 1.2, dur: 6 },
  { Icon: Wifi, x: '20%', y: '72%', d: 0.6, dur: 5.5 },
  { Icon: Utensils, x: '78%', y: '70%', d: 1.8, dur: 6.5 },
]

// Tarjeta-esqueleto con barrido de brillo (shimmer) — evoca "cargando resultados".
function SkeletonCard({ delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex gap-3 overflow-hidden rounded-2xl border border-line bg-white p-3 shadow-card"
    >
      <div className="h-16 w-20 shrink-0 rounded-xl bg-cyan-100/70" />
      <div className="flex flex-1 flex-col justify-center gap-2">
        <div className="h-2.5 w-1/2 rounded-full bg-cyan-100/80" />
        <div className="h-2 w-3/4 rounded-full bg-ink-100" />
        <div className="mt-1 flex items-center justify-between">
          <div className="h-2 w-16 rounded-full bg-ink-100" />
          <div className="h-4 w-12 rounded-full bg-cyan-200/70" />
        </div>
      </div>
      {/* barrido de brillo */}
      <motion.span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.75) 50%, transparent 80%)' }}
        initial={{ x: '-120%' }}
        animate={{ x: '120%' }}
        transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut', delay: delay + 0.3 }}
      />
    </motion.div>
  )
}

export default function HotelSearchLoader({ destino }) {
  const { t } = useI18n()
  const messages = t('hotelLoader')
  const [msg, setMsg] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setMsg((m) => (m + 1) % messages.length), 1500)
    return () => clearInterval(id)
  }, [messages.length])

  return (
    <div className="relative flex min-h-[560px] flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-cyan-50 via-white to-white px-6 py-14">
      {/* halos suaves */}
      <span aria-hidden="true" className="pointer-events-none absolute -left-16 top-10 h-56 w-56 rounded-full bg-cyan-200/30 blur-[90px]" />
      <span aria-hidden="true" className="pointer-events-none absolute -right-10 bottom-6 h-52 w-52 rounded-full bg-cyan-300/25 blur-[90px]" />

      {/* iconos de servicios flotando */}
      {FLOATERS.map(({ Icon, x, y, d, dur }, i) => (
        <motion.span
          key={i}
          aria-hidden="true"
          className="pointer-events-none absolute text-cyan-300/70"
          style={{ left: x, top: y }}
          animate={{ y: [0, -12, 0], opacity: [0.4, 0.85, 0.4] }}
          transition={{ duration: dur, delay: d, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="h-6 w-6" />
        </motion.span>
      ))}

      {/* pin con destino */}
      <div className="relative mb-8 flex flex-col items-center">
        <motion.span
          className="relative grid h-16 w-16 place-items-center rounded-3xl bg-cyan-500 text-white shadow-glow"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.span
            className="absolute inset-0 rounded-3xl border-2 border-cyan-400"
            animate={{ scale: [1, 1.4], opacity: [0.6, 0] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeOut' }}
          />
          <BedDouble className="h-7 w-7" />
        </motion.span>
        {destino && (
          <motion.span
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-line bg-white px-3.5 py-1.5 text-sm font-bold text-ink shadow-card"
          >
            <MapPin className="h-4 w-4 text-cyan-500" /> {destino}
          </motion.span>
        )}
      </div>

      {/* tarjetas-esqueleto */}
      <div className="grid w-full max-w-md gap-3">
        <SkeletonCard delay={0} />
        <SkeletonCard delay={0.15} />
        <SkeletonCard delay={0.3} />
      </div>

      {/* mensaje rotando + puntos */}
      <div className="mt-9 flex flex-col items-center gap-4 text-center">
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
              {messages[msg]}
            </motion.p>
          </AnimatePresence>
        </div>
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
