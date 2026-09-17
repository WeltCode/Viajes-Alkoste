import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import SectionHeading from './SectionHeading'
import { contact } from '../data/site'

const IMG = 'https://images.unsplash.com'
const img = (id, w = 1400) => `${IMG}/${id}?auto=format&fit=crop&w=${w}&q=80`

// Themed travel inspiration — no prices, no promos. Each links to WhatsApp.
const themes = [
  {
    id: 'playa',
    kicker: 'Sol & mar',
    title: 'Playas de ensueño',
    line: 'Arena blanca, agua turquesa y el descanso que mereces.',
    image: img('photo-1507525428034-b723cf961d3e', 1800),
    span: 'lg:col-span-2 lg:row-span-2',
  },
  {
    id: 'aventura',
    kicker: 'Naturaleza',
    title: 'Aventura y naturaleza',
    line: 'Volcanes, selvas y paisajes que te dejan sin aliento.',
    image: img('photo-1568632234157-ce7aecd03d0d'),
    span: 'lg:col-span-2',
  },
  {
    id: 'ciudades',
    kicker: 'Cultura',
    title: 'Ciudades con historia',
    line: 'Calles coloniales, sabores y color.',
    image: img('photo-1552832230-c0197dd311b5'),
    span: 'lg:col-span-1',
  },
  {
    id: 'pareja',
    kicker: 'En pareja',
    title: 'Escapadas románticas',
    line: 'Momentos para dos, lejos de todo.',
    image: img('photo-1516306580123-e6e52b1b7b5f'),
    span: 'lg:col-span-1',
  },
  {
    id: 'familia',
    kicker: 'En familia',
    title: 'Viajes en familia',
    line: 'Recuerdos que duran toda la vida.',
    image: img('photo-1512813195386-6cf811ad3542'),
    span: 'lg:col-span-2',
  },
  {
    id: 'casa',
    kicker: 'Vuelve a casa',
    title: 'Reencuéntrate con los tuyos',
    line: 'Ese abrazo que llevas tiempo esperando.',
    image: img('photo-1558370781-d6196949e317'),
    span: 'lg:col-span-2',
  },
]

function Tile({ t, index }) {
  const msg = encodeURIComponent(`¡Hola Alkoste! Me inspira la idea de "${t.title}". ¿Me ayudáis a planearlo?`)
  return (
    <motion.a
      href={`${contact.whatsappHref}?text=${msg}`}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className={`group relative min-h-[15rem] overflow-hidden rounded-3xl shadow-soft ${t.span}`}
    >
      <img
        src={t.image}
        alt={t.title}
        loading="lazy"
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.1s] ease-out group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-transparent" />
      <div className="relative flex h-full flex-col justify-end p-6">
        <span className="text-[0.7rem] font-bold uppercase tracking-[0.22em] text-cyan-300">{t.kicker}</span>
        <h3 className="mt-1.5 font-display text-2xl font-bold text-white">{t.title}</h3>
        <p className="mt-1.5 max-w-xs text-sm leading-relaxed text-white/80">{t.line}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
          <span className="border-b-2 border-cyan-400/0 transition-colors group-hover:border-cyan-400">Planéalo con nosotros</span>
          <ArrowUpRight className="h-4 w-4 text-cyan-300 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </span>
      </div>
    </motion.a>
  )
}

export default function Inspiracion() {
  return (
    <section className="container-x py-20 sm:py-28">
      <SectionHeading
        kicker="Inspiración"
        title="¿Con qué sueñas para tu próximo viaje?"
        intro="Elige el tipo de experiencia que buscas y nuestro equipo la convierte en un plan a tu medida. Sin compromiso."
      />
      <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:auto-rows-[15rem]">
        {themes.map((t, i) => (
          <Tile key={t.id} t={t} index={i} />
        ))}
      </div>
    </section>
  )
}
