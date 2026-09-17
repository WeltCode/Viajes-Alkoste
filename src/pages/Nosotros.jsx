import { Sparkles, HeartHandshake, ShieldCheck, Flag, Target, Compass, Rocket } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import ReviewMarquee from '../components/ReviewMarquee'
import CTABand from '../components/CTABand'
import { company, values, heroImages } from '../data/site'

const valueIcons = { Sparkles, HeartHandshake, ShieldCheck, Flag }

const pillars = [
  { icon: Rocket, title: 'Misión', body: company.mision },
  { icon: Compass, title: 'Visión', body: company.vision },
  { icon: Target, title: 'Objetivo', body: company.objetivo },
]

export default function Nosotros() {
  return (
    <>
      <PageHero
        image={heroImages.peru}
        kicker="Sobre nosotros"
        title="Tu agencia de confianza desde 2002"
        intro="Más de veinte años convirtiendo sueños de viaje en realidad, con base en Madrid y raíces en Latinoamérica."
      />

      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="overflow-hidden rounded-[32px] shadow-lift">
              <img src={heroImages.quito} alt="Quito, Ecuador — origen de Viajes Alkoste" className="h-full w-full object-cover" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-line bg-white p-5 shadow-lift sm:-right-6">
              <p className="font-display text-4xl font-extrabold text-cyan-500">2002</p>
              <p className="text-xs text-ink-500">Nuestros inicios<br />en Quito, Ecuador</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading kicker="Nuestros inicios" title="De Quito a Madrid, un mismo sueño" />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-700"><p>{company.historia}</p></div>
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <div className="grid gap-6 lg:grid-cols-3">
            {pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.1} className="card flex flex-col gap-4 p-8">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><p.icon className="h-6 w-6" /></span>
                <h3 className="font-display text-2xl font-bold text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-700">{p.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading align="center" kicker="Lo que nos distingue" title="Nuestros valores" className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[v.icon] ?? Sparkles
            return (
              <Reveal key={v.title} delay={i * 0.08} className="card group relative overflow-hidden p-7 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="absolute -right-4 -top-5 font-display text-7xl font-extrabold text-mist transition-colors group-hover:text-cyan-50">{String(i + 1).padStart(2, '0')}</span>
                <Icon className="relative h-8 w-8 text-cyan-500" />
                <h3 className="relative mt-5 font-display text-xl font-bold text-ink">{v.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-500">{v.body}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="overflow-hidden border-t border-line bg-mist py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading align="center" kicker="Opiniones reales" title="Nuestros clientes nos avalan" className="mb-12" />
        </div>
        <ReviewMarquee />
      </section>

      <CTABand eyebrow="¿Hablamos?" title="Pongamos rumbo a tu próximo viaje" text="Estamos en C. Azabache 4, Madrid, y a un WhatsApp de distancia. Cuéntanos tu idea y la hacemos realidad." />
    </>
  )
}
