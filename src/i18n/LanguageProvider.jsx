import { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { translations } from './translations'

// Idiomas disponibles. El español es el idioma por defecto (público principal).
export const LANGS = [
  { code: 'es', label: 'Español', short: 'ES', flag: '🇪🇸' },
  { code: 'en', label: 'English', short: 'EN', flag: '🇬🇧' },
  { code: 'pt', label: 'Português', short: 'PT', flag: '🇧🇷' },
]

const STORAGE_KEY = 'alk_lang'
const DEFAULT = 'es'

const LangContext = createContext(null)

// Resuelve una clave "a.b.c" dentro de un diccionario.
function resolve(dict, key) {
  return key.split('.').reduce((o, k) => (o == null ? undefined : o[k]), dict)
}

export function LanguageProvider({ children }) {
  // Arranca SIEMPRE en español para coincidir con el HTML prerenderizado (SSG) y
  // evitar desajustes de hidratación; tras montar, aplica el idioma guardado.
  const [lang, setLangState] = useState(DEFAULT)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored && stored !== DEFAULT && translations[stored]) setLangState(stored)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [])

  useEffect(() => {
    try {
      document.documentElement.lang = lang
    } catch {
      /* sin DOM */
    }
  }, [lang])

  const setLang = useCallback((next) => {
    if (!translations[next]) return
    setLangState(next)
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* almacenamiento no disponible */
    }
  }, [])

  // t('clave.anidada', fallback?) — devuelve la traducción del idioma actual, con
  // respaldo al español y, por último, al fallback/clave. Puede devolver arrays.
  const t = useCallback(
    (key, fallback) => {
      const v = resolve(translations[lang], key)
      if (v !== undefined && v !== null) return v
      const es = resolve(translations[DEFAULT], key)
      if (es !== undefined && es !== null) return es
      return fallback !== undefined ? fallback : key
    },
    [lang],
  )

  return <LangContext.Provider value={{ lang, setLang, t }}>{children}</LangContext.Provider>
}

export function useI18n() {
  const ctx = useContext(LangContext)
  if (!ctx) return { lang: DEFAULT, setLang: () => {}, t: (k, f) => (f !== undefined ? f : k) }
  return ctx
}
