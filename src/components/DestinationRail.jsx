import { useRef } from 'react'
import { Star, ArrowLeft, ArrowRight, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import { destinations, contact } from '../data/site'

function Card({ d, index }) {
  const msg = encodeURIComponent(`¡Hola Alkoste! Me interesa viajar a ${d.city}, ${d.country}. ¿Me dais información?`)
  return (
    <motion.a
      href={`${contact.whatsappHref}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 4) * 0.06 }}
      className="group relative block h-[26rem] w-[19rem] shrink-0 snap-start overflow-hidden rounded-3xl shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift sm:w-[21rem]"
    >
      <img
        src={d.image}
        alt={`${d.city}, ${d.country}`}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/15 to-transparent" />

      {d.tag && (
        <span className="absolute left-4 top-4 rounded-full bg-cyan-500 px-3 py-1 text-xs font-bold text-white shadow-glow">
          {d.tag}
        </span>
      )}
      <span className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur">
        <Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" />
        {d.rating.toFixed(1)}
      </span>

      <div className="absolute inset-x-0 bottom-0 p-5">
        <span className="flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-cyan-200">
          <MapPin className="h-3.5 w-3.5" />
          {d.country}
        </span>
        <h3 className="mt-1 font-display text-2xl font-bold text-white">{d.city}</h3>
        <div className="mt-3 flex items-end justify-between">
          {/* Precio oculto a petición — se conserva el dato (d.price) pero no se muestra:
          <p className="text-sm text-white/80">
            desde <span className="text-lg font-extrabold text-white">{d.price}€</span>
          </p> */}
          <span className="text-sm font-semibold text-white/85">Descúbrelo</span>
          <span className="flex h-10 w-10 translate-y-1 items-center justify-center rounded-full bg-white/15 text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:bg-cyan-500 group-hover:opacity-100">
            <ArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </motion.a>
  )
}

export default function DestinationRail() {
  const scroller = useRef(null)
  const scrollBy = (dir) => scroller.current?.scrollBy({ left: dir * 360, behavior: 'smooth' })

  return (
    <div className="relative">
      {/* Flechas solo en escritorio; en móvil se desliza con el dedo */}
      <div className="mb-6 hidden items-center justify-end gap-2 sm:flex">
        <button onClick={() => scrollBy(-1)} aria-label="Anterior" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-cyan-400 hover:text-cyan-600">
          <ArrowLeft className="h-4 w-4" />
        </button>
        <button onClick={() => scrollBy(1)} aria-label="Siguiente" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink transition-colors hover:border-cyan-400 hover:text-cyan-600">
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      {/* touch-pan-x: el carrusel solo pana en horizontal (evita el scroll vertical
          que deformaba la parte superior de las tarjetas al tocarlas en móvil).
          py-3 da aire al elevado del hover sin recortarlo. */}
      <div ref={scroller} className="no-scrollbar -mx-5 flex touch-pan-x snap-x snap-mandatory gap-5 overflow-x-auto overscroll-x-contain px-5 py-3 sm:mx-0 sm:px-0">
        {destinations.map((d, i) => (
          <Card key={d.id} d={d} index={i} />
        ))}
      </div>
    </div>
  )
}
