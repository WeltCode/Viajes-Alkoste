import { useEffect, useState } from 'react'
import { Lock } from 'lucide-react'
import { allowed, onConsentChange, openCookiePreferences } from '../lib/cookieConsent'

// Renders `children` only if the given cookie category is consented; otherwise a
// placeholder that lets the user enable it. Keeps third-party embeds GDPR-safe.
export default function ConsentGate({ category = 'marketing', label = 'este contenido', className = '', children }) {
  const [ok, setOk] = useState(() => allowed(category))
  useEffect(() => onConsentChange(() => setOk(allowed(category))), [category])

  if (ok) return children

  return (
    <div className={`flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-[inherit] border border-line bg-mist p-8 text-center ${className}`}>
      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-cyan-50 text-cyan-600">
        <Lock className="h-6 w-6" />
      </span>
      <p className="max-w-sm text-sm text-ink-700">
        Para ver {label} necesitamos tu consentimiento para las cookies de contenido externo.
      </p>
      <button onClick={openCookiePreferences} className="btn-primary">Aceptar y ver</button>
    </div>
  )
}
