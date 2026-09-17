import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Cookie, X } from 'lucide-react'
import { CATEGORY_INFO, acceptAll, rejectAll, setConsent, getConsent, hasDecision } from '../lib/cookieConsent'

function Toggle({ checked, disabled, onChange }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
        checked ? 'bg-cyan-500' : 'bg-line'
      } ${disabled ? 'cursor-not-allowed opacity-60' : ''}`}
    >
      <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${checked ? 'left-[22px]' : 'left-0.5'}`} />
    </button>
  )
}

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)
  const [showPrefs, setShowPrefs] = useState(false)
  const [prefs, setPrefs] = useState({ analytics: false, marketing: false })

  useEffect(() => {
    if (!hasDecision()) setVisible(true)
    const open = () => {
      const c = getConsent()
      setPrefs({ analytics: !!c?.analytics, marketing: !!c?.marketing })
      setShowPrefs(true)
      setVisible(true)
    }
    window.addEventListener('alk-open-cookie-preferences', open)
    return () => window.removeEventListener('alk-open-cookie-preferences', open)
  }, [])

  const close = () => {
    setVisible(false)
    setShowPrefs(false)
  }

  const onAcceptAll = () => { acceptAll(); close() }
  const onRejectAll = () => { rejectAll(); close() }
  const onSave = () => { setConsent(prefs); close() }

  return (
    <AnimatePresence>
      {visible && (
        <>
          {showPrefs && (
            <motion.div
              className="fixed inset-0 z-[60] bg-ink/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPrefs(false)}
              aria-hidden="true"
            />
          )}

          <motion.div
            role="dialog"
            aria-label="Aviso de cookies"
            aria-modal={showPrefs}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-x-0 bottom-0 z-[61] px-3 pb-3 sm:inset-x-auto sm:bottom-5 sm:left-1/2 sm:w-full sm:max-w-2xl sm:-translate-x-1/2 sm:px-0"
          >
            <div className="max-h-[85vh] overflow-y-auto rounded-3xl border border-line bg-white p-5 shadow-lift sm:p-6">
              <div className="flex items-start gap-4">
                <span className="hidden h-11 w-11 shrink-0 place-items-center rounded-2xl bg-cyan-50 text-cyan-600 sm:grid">
                  <Cookie className="h-5 w-5" />
                </span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-3">
                    <h2 className="font-display text-lg font-bold text-ink">Tu privacidad, tu elección</h2>
                    {showPrefs && (
                      <button onClick={() => setShowPrefs(false)} aria-label="Cerrar configuración" className="text-ink-400 hover:text-ink">
                        <X className="h-5 w-5" />
                      </button>
                    )}
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink-700">
                    Usamos cookies propias y de terceros para el funcionamiento del sitio y, con tu permiso,
                    para analítica y contenido externo (mapa, Instagram). Puedes aceptarlas, rechazarlas o
                    configurarlas. Más información en nuestra{' '}
                    <Link to="/politica-cookies" className="font-medium text-cyan-600 underline" onClick={close}>
                      Política de Cookies
                    </Link>.
                  </p>

                  <AnimatePresence initial={false}>
                    {showPrefs && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 space-y-3 border-t border-line pt-4">
                          {Object.entries(CATEGORY_INFO).map(([key, info]) => (
                            <div key={key} className="flex items-start justify-between gap-4 rounded-2xl bg-mist p-4">
                              <div>
                                <p className="text-sm font-bold text-ink">{info.label}</p>
                                <p className="mt-0.5 text-xs leading-relaxed text-ink-500">{info.desc}</p>
                              </div>
                              <Toggle
                                checked={info.always ? true : prefs[key]}
                                disabled={info.always}
                                onChange={(v) => setPrefs((p) => ({ ...p, [key]: v }))}
                              />
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions — Aceptar y Rechazar con la misma prominencia (RGPD) */}
                  <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:items-center">
                    <button onClick={onAcceptAll} className="btn-primary order-1 sm:order-none">Aceptar todas</button>
                    <button onClick={onRejectAll} className="btn-ghost order-2 sm:order-none">Rechazar todas</button>
                    {showPrefs ? (
                      <button onClick={onSave} className="btn-ghost order-3 sm:order-none">Guardar preferencias</button>
                    ) : (
                      <button onClick={() => setShowPrefs(true)} className="order-3 text-sm font-bold text-cyan-600 hover:text-cyan-700 sm:ml-1 sm:order-none">
                        Configurar
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
