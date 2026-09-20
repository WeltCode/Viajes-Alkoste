import { Check, Plane, Luggage, CreditCard, Stamp } from 'lucide-react'
import { ArrowGo } from '../components/icons/CtaIcons'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import SearchWidget from '../components/SearchWidget'
import DestinationRail from '../components/DestinationRail'
import ServicesShowcase from '../components/ServicesShowcase'
import CTABand from '../components/CTABand'
import Reveal from '../components/Reveal'
import Seo from '../components/Seo'
import { heroImages, contact } from '../data/site'
import { useI18n } from '../i18n/LanguageProvider'

const stepIcons = [Plane, Luggage, CreditCard, Stamp]

export default function Vuelos() {
  const { t } = useI18n()
  const perks = t('vuelos.perks')
  const steps = t('vuelos.steps')
  return (
    <>
      <Seo />
      <PageHero image={heroImages.main} kicker={t('vuelos.heroKicker')} title={t('vuelos.heroTitle')} intro={t('vuelos.heroIntro')} />

      <section className="container-x -mt-12 pb-4">
        <Reveal><div className="mx-auto max-w-3xl"><SearchWidget /></div></Reveal>
      </section>

      <section className="container-x py-20 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <SectionHeading kicker={t('vuelos.perksKicker')} title={t('vuelos.perksTitle')} />
            <ul className="mt-8 space-y-4">
              {perks.map((p, i) => (
                <Reveal key={p} delay={i * 0.06} as="li" className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-cyan-500 text-white"><Check className="h-3.5 w-3.5" /></span>
                  <span className="text-base text-ink-700">{p}</span>
                </Reveal>
              ))}
            </ul>
            <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn-primary mt-8">{t('common.pideCotizacion')} <ArrowGo className="h-4 w-4" /></a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {steps.map((s, i) => {
              const Icon = stepIcons[i]
              return (
              <Reveal key={s.title} delay={i * 0.08} className="card p-6 hover:-translate-y-1 hover:shadow-lift">
                <div className="flex items-center justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-cyan-50 text-cyan-600"><Icon className="h-5 w-5" /></span>
                  <span className="font-display text-3xl font-extrabold text-mist">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-ink">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-ink-500">{s.text}</p>
              </Reveal>
            )})}
          </div>
        </div>
      </section>

      <section className="border-y border-line bg-mist py-20 sm:py-24">
        <div className="container-x">
          <SectionHeading kicker={t('vuelos.rutasKicker')} title={t('vuelos.rutasTitle')} intro={t('vuelos.rutasIntro')} />
          <div className="mt-12"><DestinationRail /></div>
        </div>
      </section>

      <section className="container-x py-20 sm:py-28">
        <SectionHeading kicker={t('vuelos.masKicker')} title={t('vuelos.masTitle')} />
        <div className="mt-12"><ServicesShowcase /></div>
      </section>

      <CTABand />
    </>
  )
}
