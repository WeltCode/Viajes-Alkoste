import { Check, Plane, Luggage, CreditCard, Stamp, ArrowRight } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import SearchWidget from '../components/SearchWidget'
import DestinationRail from '../components/DestinationRail'
import ServicesShowcase from '../components/ServicesShowcase'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import { heroImages, contact } from '../data/site'

const perks = [
  'Comparamos decenas de aerolíneas por ti',
  'Tarifas con o sin equipaje',
  'Ida y vuelta o sólo ida',
  'Financiación sin nóminas ni papeleo',
  'Gestión de ESTA y visados a EEUU',
  'Un agente real que te acompaña de principio a fin',
]

const steps = [
  { icon: Plane, title: 'Cuéntanos tu ruta', text: 'Dinos origen, destino y fechas aproximadas.' },
  { icon: Luggage, title: 'Te buscamos lo mejor', text: 'Comparamos aerolíneas y te enviamos las mejores opciones.' },
  { icon: CreditCard, title: 'Reservas y financias', text: 'Eliges, reservas y, si quieres, pagas a plazos.' },
  { icon: Stamp, title: 'Viajas tranquilo', text: 'Te ayudamos con equipaje, ESTA y todo lo demás.' },
]

export default function Vuelos() {
  return (
    <>
      <PageHero image={heroImages.main} kicker="Vuelos" title="Vuela a donde quieras, al mejor precio" intro="En Viajes Alkoste te ayudamos y acompañamos en todo el proceso para que tu destino soñado sea una realidad." />

      <section className="container-x -mt-12 pb-4">
        <Reveal><div className="mx-auto max-w-3xl"><SearchWidget /></div></Reveal>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading kicker="Asesoramiento personal" title="Volar no tiene por qué ser complicado" />
            <ul className="mt-8 space-y-4">
              {perks.map((p, i) => (
                <Reveal key={p} delay={i * 0.06} as="li" className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-base text-ink-700">{p}</span>
                </Reveal>
              ))}
            </ul>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn-primary mt-8">Pide tu presupuesto <ArrowRight className="h-4 w-4" /></a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.08} className="card p-6 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><s.icon className="h-5 w-5" /></span>
                  <span className="font-display text-3xl font-extrabold text-mist">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading kicker="Rutas destacadas" title="Destinos favoritos desde Madrid" intro="Precios orientativos por persona. Escríbenos para la tarifa exacta según tus fechas." />
          <div className="mt-12"><DestinationRail /></div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading kicker="Y mucho más" title="Completa tu viaje con nuestros servicios" />
        <div className="mt-12"><ServicesShowcase /></div>
      </section>

      <CTABand />
    </>
  )
}
