// GDPR/ePrivacy consent state — client-side only (no backend). Stores the user's
// choice in localStorage and broadcasts changes so embeds can react.
const KEY = 'alk_cookie_consent'
const VERSION = 1

export const CATEGORY_INFO = {
  necessary: {
    label: 'Necesarias',
    always: true,
    desc: 'Imprescindibles para que la web funcione (navegación, seguridad y tu propia preferencia de cookies). No se pueden desactivar.',
  },
  analytics: {
    label: 'Analíticas',
    always: false,
    desc: 'Nos ayudan a entender de forma anónima cómo se usa la web para mejorarla.',
  },
  marketing: {
    label: 'Marketing y contenido externo',
    always: false,
    desc: 'Contenido embebido de terceros (mapa de Google, feed de Instagram) y medición de campañas.',
  },
}

export function getConsent() {
  try {
    const raw = localStorage.getItem(KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed.v !== VERSION) return null
    return parsed
  } catch {
    return null
  }
}

export function hasDecision() {
  return !!getConsent()
}

export function setConsent(prefs) {
  const value = {
    v: VERSION,
    necessary: true,
    analytics: !!prefs.analytics,
    marketing: !!prefs.marketing,
    ts: Date.now(),
  }
  try {
    localStorage.setItem(KEY, JSON.stringify(value))
  } catch {
    /* storage unavailable — consent lives for this session only */
  }
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('alk-consent-change', { detail: value }))
  }
  return value
}

export function acceptAll() {
  return setConsent({ analytics: true, marketing: true })
}
export function rejectAll() {
  return setConsent({ analytics: false, marketing: false })
}

export function allowed(category) {
  if (category === 'necessary') return true
  const c = getConsent()
  return !!(c && c[category])
}

export function openCookiePreferences() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('alk-open-cookie-preferences'))
  }
}

export function onConsentChange(cb) {
  if (typeof window === 'undefined') return () => {}
  const handler = (e) => cb(e.detail || getConsent())
  window.addEventListener('alk-consent-change', handler)
  return () => window.removeEventListener('alk-consent-change', handler)
}
