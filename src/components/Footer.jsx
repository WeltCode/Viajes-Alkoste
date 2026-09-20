import { Link } from 'react-router-dom'
import { Phone, Mail, MapPin, Clock, Instagram, Facebook } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import PoweredByWeltBrave from './branding/PoweredByWeltBrave'
import { contact } from '../data/site'
import { useI18n } from '../i18n/LanguageProvider'
import logoLight from '../assets/AlkosteLogo.png'

const legalLinks = [
  { k: 'condiciones', to: '/condiciones-generales' },
  { k: 'proteccion', to: '/proteccion-de-datos' },
  { k: 'privacidad', to: '/politica-privacidad' },
  { k: 'equipaje', to: '/equipaje-permitido' },
]

const agencyLinks = [
  { k: 'billetes', to: '/vuelos' },
  { k: 'nosotros', to: '/nosotros' },
  { k: 'contacto', to: '/contacto' },
  { k: 'cookies', to: '/politica-cookies' },
]

function LinkItem({ label, to }) {
  const cls = 'text-white/60 transition-colors hover:text-cyan-300'
  return to.startsWith('/') ? (
    <Link to={to} className={cls}>{label}</Link>
  ) : (
    <a href={to} className={cls}>{label}</a>
  )
}

export default function Footer() {
  const { t } = useI18n()
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[40rem] -translate-x-1/2 rounded-full bg-cyan-500/15 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative py-16">
        <div className="grid gap-12 text-center lg:grid-cols-[1.5fr_1fr_1fr_1.1fr] lg:text-left">
          {/* Company */}
          <div>
            <img src={logoLight} alt="Viajes Alkoste" className="mx-auto h-14 w-auto lg:mx-0" />
            <p className="mt-5 text-sm font-bold text-white">{contact.legalName}</p>
            <p className="text-sm text-white/60">CIF: {contact.cif}</p>
            <p className="mx-auto mt-4 max-w-xs text-sm leading-relaxed text-white/60 lg:mx-0">
              {t('footer.blurb')}
            </p>
            <div className="mt-6 flex justify-center gap-3 lg:justify-start">
              <a href={contact.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cyan-400 hover:text-cyan-300"><Instagram className="h-4 w-4" /></a>
              <a href={contact.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cyan-400 hover:text-cyan-300"><Facebook className="h-4 w-4" /></a>
              <a href={contact.whatsappHref} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/70 transition-colors hover:border-cyan-400 hover:text-cyan-300"><WhatsAppIcon className="h-4 w-4" /></a>
            </div>
          </div>

          {/* Apartado Legal */}
          <nav aria-label={t('footer.legalHeading')}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t('footer.legalHeading')}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {legalLinks.map((l) => (
                <li key={l.k}><LinkItem to={l.to} label={t(`footer.legal.${l.k}`)} /></li>
              ))}
            </ul>
          </nav>

          {/* Agencia */}
          <nav aria-label={t('footer.agenciaHeading')}>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t('footer.agenciaHeading')}</h3>
            <ul className="mt-5 space-y-3 text-sm">
              {agencyLinks.map((l) => (
                <li key={l.k}><LinkItem to={l.to} label={t(`footer.agencia.${l.k}`)} /></li>
              ))}
            </ul>
          </nav>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-white">{t('footer.contactoHeading')}</h3>
            <ul className="mt-5 space-y-4 text-sm text-white/70">
              <li className="flex items-start justify-center gap-3 lg:justify-start"><MapPin className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><a href={contact.addressMap} target="_blank" rel="noreferrer" className="hover:text-cyan-300">{contact.address}</a></li>
              <li className="flex items-start justify-center gap-3 lg:justify-start"><Phone className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><a href={contact.phoneHref} className="hover:text-cyan-300">{contact.phone}</a></li>
              <li className="flex items-start justify-center gap-3 lg:justify-start"><WhatsAppIcon className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="hover:text-cyan-300">{contact.whatsapp}</a></li>
              <li className="flex items-start justify-center gap-3 lg:justify-start"><Mail className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><a href={contact.emailHref} className="hover:text-cyan-300">{contact.email}</a></li>
              <li className="flex items-start justify-center gap-3 lg:justify-start"><Clock className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" /><span>{contact.hours}</span></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center gap-6 border-t border-white/10 pt-8">
          <PoweredByWeltBrave />
          <p className="text-center text-xs text-white/45">
            © {new Date().getFullYear()} {contact.legalName} · Viajes Alkoste. {t('footer.rights')}
          </p>
        </div>
      </div>
    </footer>
  )
}
