import { Phone } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import Reveal from './Reveal'
import { contact, heroImages } from '../data/site'

export default function CTABand({
  eyebrow = 'Hacemos tus sueños realidad',
  title = 'Te asesoramos sin ningún compromiso',
  text = 'Cuéntanos a dónde sueñas ir y un agente real te prepara la mejor combinación de vuelo, hotel y precio. Sin coste, sin compromiso.',
}) {
  return (
    <section className="container-x py-20 sm:py-28">
      <div className="relative overflow-hidden rounded-[36px] shadow-lift">
        <img src={heroImages.peru} alt="" aria-hidden="true" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-900/85 via-ink/80 to-ink/70" />
        <div className="pointer-events-none absolute -right-16 top-1/2 h-80 w-80 -translate-y-1/2 rounded-full bg-cyan-500/40 blur-[110px]" aria-hidden="true" />
        <div className="relative flex flex-col items-center gap-6 px-6 py-16 text-center sm:px-12 sm:py-20">
          <Reveal>
            <span className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-cyan-200">{eyebrow}</span>
          </Reveal>
          <Reveal as="h2" delay={0.05} className="display max-w-2xl text-3xl leading-tight text-white sm:text-5xl">
            {title}
          </Reveal>
          <Reveal delay={0.1} className="max-w-xl text-base leading-relaxed text-white/85">
            {text}
          </Reveal>
          <Reveal delay={0.15} className="mt-2 flex flex-col gap-3 sm:flex-row">
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn-white">
              <WhatsAppIcon className="h-4 w-4 text-cyan-500" /> Escríbenos por WhatsApp
            </a>
            <a href={contact.phoneHref} className="btn inline-flex border border-white/40 text-white hover:bg-white/10">
              <Phone className="h-4 w-4" /> {contact.phone}
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
