import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Coffee, Utensils, Sparkles, Waves, Star, ArrowRight, ExternalLink, X, BedDouble, ShieldCheck, Tag, Headphones, RadioTower } from 'lucide-react'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import HotelSearchWidget from '../components/HotelSearchWidget'
import HotelSearchLoader from '../components/HotelSearchLoader'
import { FEATURED_HOTELS, featuredHotelUrl } from '../lib/hotelBridge'

const MIN_LOADER_MS = 2600 // tiempo mínimo para disfrutar la animación de búsqueda

const IMG = 'https://images.unsplash.com'
const heroImg = `${IMG}/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=2000&q=85`

// El régimen se elige/filtra dentro del buscador; aquí solo lo explicamos.
const boards = [
  { icon: Coffee, title: 'Solo alojamiento', text: 'La base perfecta para explorar a tu aire.' },
  { icon: Utensils, title: 'Desayuno o media pensión', text: 'Empieza el día con energía, sin preocuparte.' },
  { icon: Sparkles, title: 'Todo incluido', text: 'Comidas, bebidas y actividades, sin sorpresas.' },
  { icon: Waves, title: 'Resorts y apartamentos', text: 'Desde escapadas urbanas hasta paraísos de playa.' },
]

const perks = [
  { icon: Tag, title: 'Precios en tiempo real', text: 'Tarifas actualizadas al segundo desde nuestro motor de reservas.' },
  { icon: ShieldCheck, title: 'Reserva con confianza', text: 'Miles de hoteles verificados en todo el mundo.' },
  { icon: Headphones, title: 'Un agente detrás', text: '¿Dudas con tu reserva? Te ayudamos por WhatsApp al instante.' },
]

function Stars({ n }) {
  return (
    <span className="flex items-center gap-0.5">
      {Array.from({ length: n }, (_, i) => (
        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
      ))}
    </span>
  )
}

function FeaturedCard({ h, i, onOpen }) {
  return (
    <Reveal delay={(i % 4) * 0.07}>
      <button type="button" onClick={() => onOpen(h)}
        className="card group flex h-full w-full flex-col overflow-hidden text-left hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={h.image} alt={`${h.hotel} — ${h.zona}`} loading="lazy"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <span className="absolute left-3 top-3 rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-bold text-white shadow-glow">{h.board}</span>
          <span className="absolute right-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur">{h.zona}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <div className="flex items-center justify-between gap-2">
            <span className="text-xs font-semibold text-cyan-600">{h.zona}, {h.pais}</span>
            <Stars n={h.stars} />
          </div>
          <h3 className="mt-1 font-display text-lg font-bold leading-snug text-ink">{h.hotel}</h3>
          <div className="mt-4 flex items-end justify-between border-t border-line pt-3">
            <p className="text-sm text-ink-500">desde <span className="text-lg font-extrabold text-ink">{h.price}€</span> <span className="text-xs">/ noche</span></p>
            <span className="flex items-center gap-1 text-sm font-bold text-cyan-600">Ver <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></span>
          </div>
        </div>
      </button>
    </Reveal>
  )
}

export default function Hoteles() {
  const [resultsUrl, setResultsUrl] = useState('')
  const [resultsTitle, setResultsTitle] = useState('')
  const [iframeLoaded, setIframeLoaded] = useState(false)
  const [minDone, setMinDone] = useState(false)
  const resultsRef = useRef(null)
  const searching = !(iframeLoaded && minDone)

  const openResults = (url, title = '') => {
    setResultsUrl(url)
    setResultsTitle(title)
    setIframeLoaded(false)
    setMinDone(false)
    window.setTimeout(() => setMinDone(true), MIN_LOADER_MS)
    // deja pintar el panel y baja hasta él
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  return (
    <>
      <Seo />

      {/* HERO con buscador */}
      <section className="relative overflow-hidden">
        <img src={heroImg} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/80 via-ink/65 to-ink/85" aria-hidden="true" />
        <div className="container-x relative grid gap-10 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1fr_minmax(0,32rem)] lg:items-center lg:gap-8 lg:pb-24 lg:pt-40">
          <div>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-white backdrop-blur">
              <BedDouble className="h-3.5 w-3.5" /> Hoteles y alojamientos
            </motion.span>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
              className="display mt-5 max-w-2xl text-4xl leading-[1.05] text-white sm:text-5xl lg:text-6xl">
              Tu hotel ideal, al <span className="text-cyan-300">mejor precio</span>
            </motion.h1>
            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 max-w-xl text-base leading-relaxed text-white/85 sm:text-lg">
              Busca entre miles de hoteles y resorts en todo el mundo con tarifas en tiempo real. Elige tus fechas y reserva en minutos.
            </motion.p>
          </div>
          <HotelSearchWidget onSearch={openResults} />
        </div>
      </section>

      {/* RESULTADOS (motor Veturis embebido) */}
      <AnimatePresence>
        {resultsUrl && (
          <motion.section
            ref={resultsRef}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="scroll-mt-24 border-y border-line bg-gradient-to-b from-cyan-50/60 to-white"
          >
            <div className="container-x py-8 sm:py-12">
              <motion.div
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mb-5 flex flex-wrap items-end justify-between gap-4"
              >
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-white px-3 py-1 text-xs font-bold text-cyan-700 shadow-card">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                    </span>
                    Disponibilidad en directo
                  </span>
                  <h2 className="mt-2 font-display text-2xl font-bold leading-tight text-ink sm:text-3xl">
                    {resultsTitle ? <>Hoteles en <span className="text-cyan-600">{resultsTitle}</span></> : 'Resultados de tu búsqueda'}
                  </h2>
                  <p className="mt-1 flex items-center gap-1.5 text-sm text-ink-500">
                    <RadioTower className="h-4 w-4 text-cyan-500" /> Tarifas y disponibilidad en tiempo real de nuestro motor de reservas.
                  </p>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <a href={resultsUrl} target="_blank" rel="noreferrer" className="btn-ghost">
                    Abrir en pestaña nueva <ExternalLink className="h-4 w-4" />
                  </a>
                  <button type="button" onClick={() => setResultsUrl('')} className="btn-ghost">
                    <X className="h-4 w-4" /> Cerrar
                  </button>
                </div>
              </motion.div>

              <div className="relative overflow-hidden rounded-[28px] border border-line bg-white shadow-lift">
                {/* filo superior de marca */}
                <div className="h-1.5 w-full bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-300" aria-hidden="true" />
                <AnimatePresence>
                  {searching && (
                    <motion.div
                      initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="absolute inset-0 z-10 bg-white"
                    >
                      <HotelSearchLoader destino={resultsTitle} />
                    </motion.div>
                  )}
                </AnimatePresence>
                <iframe
                  key={resultsUrl}
                  title="Resultados de hoteles"
                  src={resultsUrl}
                  onLoad={() => setIframeLoaded(true)}
                  className="block w-full bg-white"
                  style={{ height: 'calc(100vh - 40px)', minHeight: '1200px' }}
                />
              </div>
              <p className="mt-4 text-center text-xs text-ink-500">
                ¿Prefieres que te lo gestionemos? Escríbenos por WhatsApp y un agente reserva por ti.
              </p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* LOS MÁS DESTACADOS */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading kicker="Los más destacados" title="Ofertas de hotel que vuelan"
          intro="Una selección de estancias con las mejores tarifas del momento. Pulsa cualquiera para ver su disponibilidad al instante en el buscador." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURED_HOTELS.map((h, i) => (
            <FeaturedCard key={h.id} h={h} i={i} onOpen={(hotel) => openResults(featuredHotelUrl(hotel), hotel.zona)} />
          ))}
        </div>
      </section>

      {/* RÉGIMEN — se filtra en el buscador */}
      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading kicker="Tú eliges" title="El régimen que mejor te encaje"
            intro="Filtra por tipo de alojamiento y pensión directamente en el buscador: desde solo alojamiento hasta todo incluido." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {boards.map((b, i) => (
              <Reveal key={b.title} delay={i * 0.08} className="card p-7 hover:-translate-y-1 hover:shadow-lift">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><b.icon className="h-6 w-6" /></span>
                <h3 className="mt-5 font-display text-lg font-bold text-ink">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* POR QUÉ RESERVAR CON NOSOTROS */}
      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-6 sm:grid-cols-3">
          {perks.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className="flex items-start gap-4 rounded-3xl border border-line bg-white p-6 shadow-card">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-500/10 text-cyan-600"><p.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="font-display text-base font-bold text-ink">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink-500">{p.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <CTABand eyebrow="Vuelo + hotel" title="Ahorra reservando tu paquete completo"
        text="Combina tu vuelo con el alojamiento y consigue un precio mejor. Te lo montamos a medida, sin compromiso." />
    </>
  )
}
