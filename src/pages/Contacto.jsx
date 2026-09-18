import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import WhatsAppIcon from '../components/WhatsAppIcon'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import LeadForm from '../components/LeadForm'
import ConsentGate from '../components/ConsentGate'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { contact, heroImages } from '../data/site'

const channels = [
  { icon: WhatsAppIcon, label: 'WhatsApp', value: contact.whatsapp, href: contact.whatsappHref, highlight: true },
  { icon: Phone, label: 'Teléfono', value: contact.phone, href: contact.phoneHref },
  { icon: Mail, label: 'Correo', value: contact.email, href: contact.emailHref },
  { icon: MapPin, label: 'Dirección', value: contact.address, href: contact.addressMap },
]

export default function Contacto() {
  return (
    <>
      <Seo />
      <PageHero image={heroImages.quito} kicker="Contacto" title="Hablemos de tu próximo viaje" intro="Tu opinión es muy importante. No dudes en consultarnos sobre tu destino soñado: te respondemos lo antes posible." />

      <section className="container-x py-20 sm:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <SectionHeading kicker="Estamos para ayudarte" title="Contáctanos" intro="Escríbenos por el canal que prefieras. En Viajes Alkoste siempre hay una persona real al otro lado." />

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {channels.map((c, i) => (
                <Reveal key={c.label} delay={i * 0.08}>
                  <a
                    href={c.href}
                    target={c.href.startsWith('http') ? '_blank' : undefined}
                    rel="noreferrer"
                    className={`flex h-full items-start gap-4 rounded-3xl border p-5 transition-all hover:-translate-y-0.5 ${
                      c.highlight ? 'border-cyan-200 bg-cyan-50 hover:shadow-lift' : 'border-line bg-white shadow-card hover:border-cyan-300 hover:shadow-soft'
                    }`}
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-100 text-cyan-600"><c.icon className="h-5 w-5" /></span>
                    <span className="min-w-0">
                      <span className="block text-xs font-bold uppercase tracking-wider text-ink-500">{c.label}</span>
                      <span className="mt-0.5 block break-words font-bold text-ink">{c.value}</span>
                    </span>
                  </a>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.2} className="mt-4 flex items-center gap-4 rounded-3xl border border-line bg-white p-5 shadow-card">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-100 text-cyan-600"><Clock className="h-5 w-5" /></span>
              <div>
                <span className="block text-xs font-bold uppercase tracking-wider text-ink-500">Horario</span>
                <span className="mt-0.5 block font-bold text-ink">{contact.hours}</span>
              </div>
            </Reveal>

            <div className="mt-6 flex gap-3">
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink-500 transition-colors hover:border-cyan-400 hover:text-cyan-600"><Instagram className="h-4 w-4" /></a>
              <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-11 w-11 place-items-center rounded-full border border-line bg-white text-ink-500 transition-colors hover:border-cyan-400 hover:text-cyan-600"><Facebook className="h-4 w-4" /></a>
            </div>

            <blockquote className="mt-10 border-l-2 border-cyan-400 pl-5 font-display text-lg font-medium italic leading-relaxed text-ink-700">
              “Viajar te deja sin palabras y después te convierte en un narrador de historias.”
              <span className="mt-2 block text-sm font-normal not-italic text-ink-500">— Ibn Battuta</span>
            </blockquote>
          </div>

          <Reveal delay={0.1}>
            <div className="rounded-[32px] border border-line bg-white p-6 shadow-lift sm:p-8">
              <h3 className="font-display text-2xl font-bold text-ink">Solicita información</h3>
              <p className="mt-2 text-sm text-ink-500">Rellena el formulario y te contactamos lo antes posible para cumplir tus sueños de viaje.</p>
              <div className="mt-6"><LeadForm /></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-x pb-20 sm:pb-28">
        <div className="flex items-center gap-2 pb-5">
          <MapPin className="h-5 w-5 text-cyan-500" />
          <h2 className="font-display text-2xl font-bold text-ink">Ubícanos</h2>
        </div>
        <div className="overflow-hidden rounded-[32px] border border-line shadow-soft">
          <ConsentGate category="marketing" label="el mapa de Google">
            <iframe
              title="Mapa — Viajes Alkoste, C. Azabache 4, Madrid"
              src="https://www.google.com/maps?q=C.+Azabache+4,+28019+Madrid&output=embed"
              width="100%"
              height="420"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="block w-full"
            />
          </ConsentGate>
        </div>
      </section>
    </>
  )
}
