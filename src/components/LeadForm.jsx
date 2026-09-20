import { useState } from 'react'
import { Check, Loader2 } from 'lucide-react'
import { SendPlane } from './icons/CtaIcons'
import { contact } from '../data/site'
import { useI18n } from '../i18n/LanguageProvider'

// No-backend email delivery via Web3Forms (https://web3forms.com). Put your
// access key in .env as VITE_WEB3FORMS_KEY. Without a key, the form falls back
// to opening WhatsApp with the message pre-filled.
const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY || ''

export default function LeadForm({ compact = false }) {
  const { t } = useI18n()
  const topics = t('form.topics')
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [form, setForm] = useState({ name: '', email: '', phone: '', topic: topics[0], message: '' })
  const [errors, setErrors] = useState({})

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const validate = () => {
    const err = {}
    if (!form.name.trim()) err.name = t('form.errName')
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) err.email = t('form.errEmail')
    if (!form.message.trim()) err.message = t('form.errMessage')
    setErrors(err)
    return Object.keys(err).length === 0
  }

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `¡Hola Alkoste! Soy ${form.name}.\nMotivo: ${form.topic}\nCorreo: ${form.email}\nTeléfono: ${form.phone || '—'}\n\n${form.message}`,
    )
    window.open(`${contact.whatsappHref}?text=${text}`, '_blank', 'noopener')
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setStatus('sending')

    // No key configured → keep working via WhatsApp.
    if (!WEB3FORMS_KEY) {
      setTimeout(() => {
        setStatus('sent')
        openWhatsApp()
      }, 600)
      return
    }

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Nueva consulta web · ${form.topic}`,
          from_name: 'Web Viajes Alkoste',
          name: form.name,
          email: form.email,
          telefono: form.phone || '—',
          motivo: form.topic,
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) setStatus('sent')
      else setStatus('error')
    } catch {
      setStatus('error')
    }
  }

  const inputCls = (field) =>
    `w-full rounded-2xl border bg-mist px-4 py-3 text-sm font-medium text-ink outline-none transition-colors placeholder:text-ink-400 focus:border-cyan-400 focus:bg-white ${
      errors[field] ? 'border-red-400' : 'border-line hover:border-cyan-200'
    }`

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center gap-4 rounded-3xl border border-cyan-200 bg-cyan-50 p-10 text-center">
        <span className="grid h-14 w-14 place-items-center rounded-full bg-cyan-500 text-white shadow-glow">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="font-display text-2xl font-bold text-ink">{t('form.sentTitle').replace('{name}', form.name.split(' ')[0])}</h3>
        <p className="max-w-sm text-sm text-ink-700">
          {WEB3FORMS_KEY ? t('form.sentEmail') : t('form.sentWhatsapp')}{' '}
          {t('form.sentAlso')}{' '}
          <a href={contact.whatsappHref} className="font-semibold text-cyan-600 underline">{contact.whatsapp}</a>.
        </p>
        <button onClick={() => setStatus('idle')} className="btn-ghost mt-2">{t('form.sendAnother')}</button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <div>
          <input className={inputCls('name')} placeholder={t('form.name')} value={form.name} onChange={set('name')} />
          {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
        </div>
        <div>
          <input type="email" className={inputCls('email')} placeholder={t('form.email')} value={form.email} onChange={set('email')} />
          {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
        </div>
      </div>

      <div className={`grid gap-4 ${compact ? '' : 'sm:grid-cols-2'}`}>
        <input type="tel" className={inputCls('phone')} placeholder={t('form.phone')} value={form.phone} onChange={set('phone')} />
        <select className={inputCls('topic')} value={form.topic} onChange={set('topic')}>
          {topics.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>

      <div>
        <textarea
          rows={compact ? 3 : 4}
          maxLength={600}
          className={inputCls('message') + ' resize-none'}
          placeholder={t('form.message')}
          value={form.message}
          onChange={set('message')}
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      {status === 'error' && (
        <p className="rounded-2xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-600">
          {t('form.error')}{' '}
          <button type="button" onClick={openWhatsApp} className="font-semibold underline">{t('form.errorWhatsapp')}</button>.
        </p>
      )}

      <button type="submit" disabled={status === 'sending'} className="btn-primary w-full disabled:opacity-70">
        {status === 'sending' ? (
          <><Loader2 className="h-4 w-4 animate-spin" /> {t('form.sending')}</>
        ) : (
          <><SendPlane className="h-4 w-4" /> {t('form.submit')}</>
        )}
      </button>
      <p className="text-center text-xs text-ink-500">
        {t('form.disclaimer')}
      </p>
    </form>
  )
}
