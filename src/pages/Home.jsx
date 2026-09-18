import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, Headphones, CalendarClock, Lock, Star, ArrowUpRight, ChevronDown } from 'lucide-react'
import SearchWidget from '../components/SearchWidget'
import SectionHeading from '../components/SectionHeading'
import ServicesShowcase from '../components/ServicesShowcase'
import DestinationRail from '../components/DestinationRail'
import ReviewMarquee from '../components/ReviewMarquee'
import InstagramFeed from '../components/InstagramFeed'
import Inspiracion from '../components/Inspiracion'
import HeroFlightPath from '../components/HeroFlightPath'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { heroVideo, heroVideoSm, heroImages, contact } from '../data/site'

const guarantees = [
  { icon: ShieldCheck, title: 'Mejor precio garantizado', text: 'Buscamos la tarifa más baja por ti.' },
  { icon: Headphones, title: 'Asesoría personal', text: 'Un agente real, no un robot.' },
  { icon: CalendarClock, title: 'Reservas flexibles', text: 'Opciones que se adaptan a ti.' },
  { icon: Lock, title: 'Pagos seguros', text: 'Con financiación disponible.' },
]

const ease = [0.16, 1, 0.3, 1]

export default function Home() {
  return (
    <>
      <Seo />
      {/* HERO — video */}
      <section className="relative min-h-[100svh] overflow-hidden">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={heroImages.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src={heroVideo} media="(min-width: 768px)" type="video/mp4" />
          <source src={heroVideoSm} type="video/mp4" />
        </video>
        {/* legibility scrims */}
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/45 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-ink/30" />

        {/* discreet, elegant flight-route motif */}
        <HeroFlightPath />

        <div className="container-x relative flex min-h-[100svh] items-center pt-28 pb-20">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.24em] text-cyan-200">
                <span className="h-0.5 w-8 rounded-full bg-cyan-300" />
                El mundo te está esperando
              </motion.span>

              <h1 className="display mt-5 text-[3.2rem] leading-[0.98] text-white sm:text-7xl xl:text-[5.2rem]">
                {['Viaja a casa,', 'vive el mundo.'].map((line, i) => (
                  <motion.span
                    key={line}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.9, delay: 0.25 + i * 0.12, ease }}
                    className="block"
                  >
                    {i === 1 ? <span className="text-cyan-300">{line}</span> : line}
                  </motion.span>
                ))}
              </h1>

              <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-6 max-w-lg text-lg font-medium leading-relaxed text-white/85">
                Vuelos baratos desde Madrid a Latinoamérica y al resto del planeta.
                Paquetes, hoteles, seguros y financiación, con el trato humano que nos
                avala desde 2002.
              </motion.p>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.7 }} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Link to="/vuelos" className="btn-primary">Explora destinos <ArrowRight className="h-4 w-4" /></Link>
                <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn inline-flex border border-white/40 text-white hover:bg-white/10">Habla con un agente</a>
              </motion.div>

              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.9 }} className="mt-10 flex items-center gap-4">
                <div className="flex -space-x-3">
                  {['Q', 'L', 'C', 'M'].map((c, i) => (
                    <span key={i} className="grid h-9 w-9 place-items-center rounded-full border-2 border-white/40 bg-white/15 text-xs font-bold text-white backdrop-blur">{c}</span>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-white">
                    {Array.from({ length: 5 }).map((_, i) => (<Star key={i} className="h-3.5 w-3.5 fill-cyan-300 text-cyan-300" />))}
                    <span className="ml-1 font-bold">4,9/5</span>
                  </div>
                  <p className="text-white/70">+15.000 clientes felices</p>
                </div>
              </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.5, ease }} className="lg:justify-self-end lg:pl-6">
              <p className="mb-3 hidden font-display text-lg font-bold text-white lg:block">¿A dónde vas?<span className="text-cyan-300">.</span></p>
              <SearchWidget />
            </motion.div>
          </div>
        </div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 lg:block">
          <ChevronDown className="h-6 w-6 animate-floaty text-white/70" />
        </motion.div>
      </section>

      {/* GUARANTEES */}
      <section className="border-b border-line bg-white">
        <div className="container-x grid grid-cols-2 gap-px lg:grid-cols-4">
          {guarantees.map((g, i) => (
            <Reveal key={g.title} delay={i * 0.08} className="flex items-start gap-4 py-7 pr-4 sm:px-6">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><g.icon className="h-5 w-5" /></span>
              <div>
                <h3 className="text-sm font-bold text-ink">{g.title}</h3>
                <p className="mt-1 text-xs leading-relaxed text-ink-500">{g.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-20 sm:py-28">
        <SectionHeading kicker="Servicios Alkoste" title="Todo tu viaje, resuelto en un solo lugar" intro="Desde los descuentos por reserva anticipada hasta las bajadas de precio de última hora. Pasa el cursor por cada servicio y descubre cómo te ayudamos." />
        <div className="mt-12"><ServicesShowcase /></div>
      </section>

      {/* DESTINATIONS */}
      <section className="relative overflow-hidden border-y border-line bg-mist py-20 sm:py-28">
        <div className="container-x relative">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading kicker="Destinos que enamoran" title="Tu próxima aventura empieza aquí" intro="Los destinos favoritos de nuestros viajeros a Latinoamérica y más allá." />
            <Link to="/vuelos" className="hidden items-center gap-1 text-sm font-bold text-cyan-600 hover:text-cyan-700 sm:inline-flex">Ver todos los destinos <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
          <div className="mt-12"><DestinationRail /></div>
        </div>
      </section>

      {/* INSTAGRAM */}
      <InstagramFeed />

      {/* INSPIRACIÓN (reemplaza a "Últimas novedades") */}
      <Inspiracion />

      {/* REVIEWS */}
      <section className="overflow-hidden border-t border-line bg-mist py-20 sm:py-28">
        <div className="container-x">
          <SectionHeading align="center" kicker="¿Por qué elegirnos?" title="No lo decimos nosotros, lo dicen nuestros clientes" intro="Cientos de viajeros nos avalan con sus reseñas reales en Google." className="mb-12" />
        </div>
        <ReviewMarquee />
      </section>

      {/* CTA */}
      <CTABand />
    </>
  )
}
