import { Sparkles, HeartHandshake, ShieldCheck, Flag, Target, Compass, Rocket } from 'lucide-react'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import SmartImage from '../components/SmartImage'
import ReviewMarquee from '../components/ReviewMarquee'
import CTABand from '../components/CTABand'
import Seo from '../components/Seo'
import { values, heroImages } from '../data/site'
import { useI18n } from '../i18n/LanguageProvider'

const valueIcons = { Sparkles, HeartHandshake, ShieldCheck, Flag }

export default function Nosotros() {
  const { t } = useI18n()
  const pillars = [
    { icon: Rocket, title: t('nosotros.misionTitle'), body: t('nosotros.mision') },
    { icon: Compass, title: t('nosotros.visionTitle'), body: t('nosotros.vision') },
    { icon: Target, title: t('nosotros.objetivoTitle'), body: t('nosotros.objetivo') },
  ]
  const valuesT = t('nosotros.values')
  return (
    <>
      <Seo />
      <PageHero
        image={heroImages.peru}
        kicker={t('nosotros.heroKicker')}
        title={t('nosotros.heroTitle')}
        intro={t('nosotros.heroIntro')}
      />

      <section className="container-x py-20 sm:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal className="relative">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[32px] shadow-lift">
              <SmartImage src={heroImages.quito} alt="Quito, Ecuador — origen de Viajes Alkoste" />
            </div>
            <div className="absolute -bottom-6 -right-4 rounded-3xl border border-line bg-white p-5 shadow-lift sm:-right-6">
              <p className="font-display text-4xl font-extrabold text-cyan-500">{t('nosotros.badgeYear')}</p>
              <p className="text-xs text-ink-500">{t('nosotros.badgeText')}</p>
            </div>
          </Reveal>
          <div>
            <SectionHeading kicker={t('nosotros.iniciosKicker')} title={t('nosotros.iniciosTitle')} />
            <div className="mt-6 space-y-4 text-base leading-relaxed text-ink-700"><p>{t('nosotros.historia')}</p></div>
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
        <SectionHeading align="center" kicker={t('nosotros.valoresKicker')} title={t('nosotros.valoresTitle')} className="mb-12" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = valueIcons[v.icon] ?? Sparkles
            const vt = valuesT[i] ?? v
            return (
              <Reveal key={v.title} delay={i * 0.08} className="card group relative overflow-hidden p-7 hover:-translate-y-1.5 hover:shadow-lift">
                <span className="absolute -right-4 -top-5 font-display text-7xl font-extrabold text-mist transition-colors group-hover:text-cyan-50">{String(i + 1).padStart(2, '0')}</span>
                <Icon className="relative h-8 w-8 text-cyan-500" />
                <h3 className="relative mt-5 font-display text-xl font-bold text-ink">{vt.title}</h3>
                <p className="relative mt-2 text-sm leading-relaxed text-ink-500">{vt.body}</p>
              </Reveal>
            )
          })}
        </div>
      </section>

      <section className="overflow-hidden border-t border-line bg-mist py-16 sm:py-20">
        <div className="container-x">
          <SectionHeading align="center" kicker={t('nosotros.opinionesKicker')} title={t('nosotros.opinionesTitle')} className="mb-12" />
        </div>
        <ReviewMarquee />
      </section>

      <CTABand eyebrow={t('cta.nosotrosEyebrow')} title={t('cta.nosotrosTitle')} text={t('cta.nosotrosText')} />
    </>
  )
}
