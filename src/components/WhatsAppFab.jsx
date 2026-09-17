import WhatsAppIcon from './WhatsAppIcon'
import { contact } from '../data/site'

// Same structure as the original WhatsAppButton, recolored to the Alkoste cyan,
// with a "¡Chatea con un agente!" tooltip on hover and a pulse ring.
export default function WhatsAppFab() {
  const whatsappUrl = `${contact.whatsappHref}?text=${encodeURIComponent(
    '¡Hola Alkoste! Estoy interesado/a en un viaje. ¿Me podrías dar más información sobre servicios, disponibilidad y precios? Gracias.',
  )}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-500 shadow-lg transition-all duration-300 hover:scale-110 hover:bg-cyan-600 hover:shadow-xl"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsAppIcon className="h-8 w-8 text-white" />

      {/* Tooltip on hover */}
      <div className="pointer-events-none absolute bottom-1/2 right-20 translate-y-1/2 whitespace-nowrap rounded-lg bg-gray-800 px-4 py-2 text-white opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100">
        <span className="text-sm font-medium">¡Chatea con un agente!</span>
        <div className="absolute right-[-6px] top-1/2 h-3 w-3 -translate-y-1/2 rotate-45 bg-gray-800" />
      </div>

      {/* Pulse ring */}
      <div className="absolute inset-0 animate-ping rounded-full border-4 border-cyan-400 opacity-20" />
    </a>
  )
}
