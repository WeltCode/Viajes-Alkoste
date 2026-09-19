import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plane, BedDouble, Car, ShieldCheck, Luggage, TrainFront, Stamp, CreditCard, Plus } from 'lucide-react'
import { services } from '../data/site'
import SmartImage from './SmartImage'

const icons = { Plane, BedDouble, Car, ShieldCheck, Luggage, TrainFront, StampIcon: Stamp, CreditCard }

export default function ServicesShowcase() {
  const [active, setActive] = useState(services[0].id)
  const current = services.find((s) => s.id === active) ?? services[0]

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_1.05fr] lg:gap-14">
      {/* Interactive index */}
      <ul className="flex flex-col divide-y divide-line border-y border-line">
        {services.map((s, i) => {
          const Icon = icons[s.icon] ?? Plane
          const isActive = s.id === active
          return (
            <li key={s.id}>
              <button
                type="button"
                onMouseEnter={() => setActive(s.id)}
                onFocus={() => setActive(s.id)}
                onClick={() => setActive(s.id)}
                className="group flex w-full items-center gap-4 py-5 text-left"
                aria-expanded={isActive}
              >
                <span className="w-8 shrink-0 font-display text-sm font-bold text-ink-400">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                    isActive ? 'border-cyan-500 bg-cyan-500 text-white shadow-glow' : 'border-line text-cyan-500 group-hover:border-cyan-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display text-xl font-bold transition-colors sm:text-2xl ${isActive ? 'text-ink' : 'text-ink-500 group-hover:text-ink'}`}>
                    {s.name}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="block overflow-hidden text-sm leading-relaxed text-ink-500"
                      >
                        <span className="block pt-2">{s.body}</span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </span>
                <Plus className={`h-5 w-5 shrink-0 text-cyan-500 transition-transform duration-300 ${isActive ? 'rotate-45' : 'rotate-0 text-ink-400 group-hover:text-cyan-500'}`} />
              </button>
            </li>
          )
        })}
      </ul>

      {/* Preview */}
      <div className="relative hidden overflow-hidden rounded-[28px] shadow-lift lg:block">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, scale: 1.06 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-0"
          >
            <SmartImage src={current.image} alt={current.name} />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/25 to-transparent" />
          </motion.div>
        </AnimatePresence>
        <div className="relative flex h-full min-h-[30rem] flex-col justify-end p-8">
          <motion.div key={current.id + '-t'} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}>
            <span className="mb-3 inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-cyan-200">{current.tagline}</span>
            <h3 className="display text-3xl text-white">{current.name}</h3>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">{current.body}</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
