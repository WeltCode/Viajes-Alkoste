import { Link } from 'react-router-dom'
import { ChevronRight, ScrollText } from 'lucide-react'
import { motion } from 'framer-motion'
import Seo from '../../components/Seo'

// Clean, comfortable reading layout for the legal pages (Read mode).
export default function LegalLayout({ title, intro, updated = 'Enero de 2026', children }) {
  return (
    <>
      <Seo />
      {/* Compact header */}
      <section className="relative overflow-hidden border-b border-line bg-mist pt-28">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-cyan-100 blur-[110px]" aria-hidden="true" />
        <div className="container-x relative pb-12">
          <nav className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-ink-500">
            <Link to="/" className="hover:text-cyan-600">Inicio</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-cyan-600">{title}</span>
          </nav>
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500/12 text-cyan-600">
            <ScrollText className="h-6 w-6" />
          </span>
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="display max-w-3xl text-3xl leading-tight text-ink sm:text-4xl md:text-5xl"
          >
            {title}
          </motion.h1>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-700">{intro}</p>}
          <p className="mt-4 text-xs font-medium text-ink-500">Última actualización: {updated}</p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white py-14 sm:py-20">
        <div className="container-x">
          <article className="legal-prose mx-auto max-w-3xl">{children}</article>
        </div>
      </section>
    </>
  )
}
