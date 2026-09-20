import { Link } from 'react-router-dom'
import { Compass } from 'lucide-react'
import { ArrowBack } from '../components/icons/CtaIcons'
import Seo from '../components/Seo'
import { useI18n } from '../i18n/LanguageProvider'

export default function NotFound() {
  const { t } = useI18n()
  return (
    <>
      <Seo noindex title="Página no encontrada (404) | Viajes Alkoste" description="La página que buscas no existe. Vuelve al inicio de Viajes Alkoste para planificar tu viaje." />
      <section className="relative flex min-h-[85svh] items-center overflow-hidden bg-mist pt-24">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-100 blur-[120px]" aria-hidden="true" />
      <div className="container-x relative text-center">
        <Compass className="mx-auto h-14 w-14 animate-floaty text-cyan-500" />
        <p className="display mt-6 text-7xl text-cyan-600 sm:text-9xl">{t('notFound.code')}</p>
        <h1 className="mt-2 font-display text-2xl font-bold text-ink sm:text-3xl">{t('notFound.title')}</h1>
        <p className="mx-auto mt-3 max-w-md text-ink-700">
          {t('notFound.text')}
        </p>
        <Link to="/" className="btn-primary mt-8"><ArrowBack className="h-4 w-4" /> {t('common.volverInicio')}</Link>
      </div>
    </section>
    </>
  )
}
