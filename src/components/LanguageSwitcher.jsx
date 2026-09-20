import { useEffect, useRef, useState } from 'react'
import { Globe, Check, ChevronDown } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import { useI18n, LANGS } from '../i18n/LanguageProvider'

// Selector de idioma (ES/EN/PT). `onHero` invierte el color para el hero oscuro.
export default function LanguageSwitcher({ onHero = false, className = '' }) {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)
  const current = LANGS.find((l) => l.code === lang) || LANGS[0]

  useEffect(() => {
    const onDoc = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={t('nav.langLabel')}
        aria-expanded={open}
        className={`flex items-center gap-1.5 rounded-full border px-3 py-2 text-sm font-bold transition-colors ${
          onHero
            ? 'border-white/40 text-white hover:bg-white/10'
            : 'border-line text-ink-700 hover:border-cyan-400 hover:text-cyan-600'
        }`}
      >
        <Globe className="h-4 w-4" />
        <span>{current.short}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.18 }}
            className="absolute right-0 z-50 mt-2 w-44 overflow-hidden rounded-2xl border border-line bg-white p-1.5 shadow-lift"
          >
            {LANGS.map((l) => (
              <li key={l.code}>
                <button
                  type="button"
                  onClick={() => { setLang(l.code); setOpen(false) }}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-3 py-2 text-left text-sm font-semibold transition-colors ${
                    l.code === lang ? 'bg-cyan-50 text-cyan-700' : 'text-ink-700 hover:bg-mist'
                  }`}
                >
                  <span className="text-base leading-none">{l.flag}</span>
                  <span className="flex-1">{l.label}</span>
                  {l.code === lang && <Check className="h-4 w-4 text-cyan-600" />}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
