import { Coffee, Utensils, Sparkles, Waves, MapPin, Star, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import { contact } from '../data/site'

const IMG = 'https://images.unsplash.com'
const img = (id) => `${IMG}/${id}?auto=format&fit=crop&w=1200&q=80`

const boards = [
  { icon: Coffee, title: 'Solo alojamiento', text: 'La base perfecta para explorar a tu aire.' },
  { icon: Utensils, title: 'Desayuno o media pensión', text: 'Empieza el día con energía, sin preocuparte.' },
  { icon: Sparkles, title: 'Todo incluido', text: 'Comidas, bebidas y actividades, sin sorpresas.' },
  { icon: Waves, title: 'Resorts y apartamentos', text: 'Desde escapadas urbanas hasta paraísos de playa.' },
]

const stays = [
  { name: 'Resort de playa · Caribe', place: 'Punta Cana, R. Dominicana', image: img('photo-1571003123894-1f0594d2b5d9'), rating: 4.9, price: 89, tag: 'Todo incluido' },
  { name: 'Hotel boutique colonial', place: 'Cartagena, Colombia', image: img('photo-1566073771259-6a8506099945'), rating: 4.8, price: 64 },
  { name: 'Hotel andino con vistas', place: 'Quito, Ecuador', image: img('photo-1611892440504-42a792e24d32'), rating: 4.7, price: 52 },
  { name: 'Apartamento frente al mar', place: 'Cancún, México', image: img('photo-1582719478250-c89cae4dc85b'), rating: 4.8, price: 74, tag: 'Familias' },
]

function StayCard({ s, i }) {
  const msg = encodeURIComponent(`¡Hola Alkoste! Me interesa alojamiento en ${s.place} (${s.name}).`)
  return (
    <Reveal delay={(i % 4) * 0.08}>
      <a href={`${contact.whatsappHref}?text=${msg}`} target="_blank" rel="noreferrer" className="card group flex h-full flex-col overflow-hidden hover:-translate-y-1.5 hover:shadow-lift">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={s.image} alt={s.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
          {s.tag && <span className="absolute left-3 top-3 rounded-full bg-cyan-500 px-2.5 py-1 text-xs font-bold text-white shadow-glow">{s.tag}</span>}
          <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-bold text-ink backdrop-blur"><Star className="h-3.5 w-3.5 fill-cyan-500 text-cyan-500" /> {s.rating}</span>
        </div>
        <div className="flex flex-1 flex-col p-5">
          <span className="flex items-center gap-1 text-xs font-semibold text-cyan-600"><MapPin className="h-3.5 w-3.5" />{s.place}</span>
          <h3 className="mt-1 font-display text-lg font-bold text-ink">{s.name}</h3>
          <div className="mt-4 flex items-end justify-between">
            <p className="text-sm text-ink-500">desde <span className="text-lg font-extrabold text-ink">{s.price}€</span> / noche</p>
            <ArrowRight className="h-4 w-4 text-cyan-600 transition-transform group-hover:translate-x-1" />
          </div>
        </div>
      </a>
    </Reveal>
  )
}

export default function Hoteles() {
  return (
    <>
      <PageHero image={img('photo-1571003123894-1f0594d2b5d9')} kicker="Alojamientos" title="Duerme donde siempre soñaste" intro="Desde hoteles de ciudad hasta resorts todo incluido frente al mar. Tú eliges el plan, nosotros el mejor precio." />

      <section className="container-x py-20 sm:py-28">
        <SectionHeading kicker="Tú eliges" title="El régimen que mejor te encaje" intro="Desde solo alojamiento hasta todo incluido, adaptamos cada estancia a tu viaje y tu presupuesto." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {boards.map((b, i) => (
            <Reveal key={b.title} delay={i * 0.08} className="card p-7 hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><b.icon className="h-6 w-6" /></span>
              <h3 className="mt-5 font-display text-lg font-bold text-ink">{b.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-500">{b.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading kicker="Selección Alkoste" title="Alojamientos que enamoran" intro="Precios orientativos por noche. Escríbenos y te preparamos la mejor combinación de vuelo + hotel." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stays.map((s, i) => (<StayCard key={s.name} s={s} i={i} />))}
          </div>
        </div>
      </section>

      <CTABand eyebrow="Vuelo + hotel" title="Ahorra reservando tu paquete completo" text="Combina tu vuelo con el alojamiento y consigue un precio mejor. Te lo montamos a medida, sin compromiso." />
    </>
  )
}
