// Set de iconos propio para los botones CTA de Viajes Alkoste.
// Esencia: geometría redondeada (trazo 2, remates redondos) con una "firma" de
// punto/estela de destino — el mismo lenguaje de la ruta de vuelo punteada de la
// marca. Monocromo (currentColor) para funcionar en cualquier variante de botón.

const base = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  xmlns: 'http://www.w3.org/2000/svg',
}

const dot = { fill: 'currentColor', stroke: 'none' }

// Flecha "ir" con punto de destino adelantado (la parada del viaje).
export function ArrowGo({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M3.5 12h9" />
      <path d="M11 8l4 4-4 4" />
      <circle cx="19.6" cy="12" r="1.15" {...dot} />
    </svg>
  )
}

// Flecha "volver" con estela detrás.
export function ArrowBack({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M20.5 12h-9" />
      <path d="M13 8l-4 4 4 4" />
      <circle cx="4.4" cy="12" r="1.15" {...dot} />
    </svg>
  )
}

// Flecha diagonal "descubre / ver más" con punto de destino en la punta.
export function ArrowUp({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M6.5 17.5L15 9" />
      <path d="M9 8h7v7" />
      <circle cx="18.6" cy="5.4" r="1.15" {...dot} />
    </svg>
  )
}

// Lupa con punto de foco: "buscar el destino".
export function SearchGo({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <circle cx="10.5" cy="10.5" r="6.5" />
      <circle cx="10.5" cy="10.5" r="1.4" {...dot} />
      <path d="M20.5 20.5l-4.2-4.2" />
    </svg>
  )
}

// Avión de papel con estela de despegue: "enviar / que despegue tu consulta".
export function SendPlane({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M20.7 4L11 13.6 12.7 20c.14.52.85.58 1.07.08L21.1 4.7c.2-.46-.04-.92-.4-.7z" />
      <path d="M20.7 4L4.4 10.2c-.52.2-.5.94.03 1.1L11 13.6" />
      <path d="M2.5 15.4l2.4-1" />
      <path d="M4 18l2.2-.9" />
    </svg>
  )
}

// Auricular con onda de señal: "llamar".
export function PhoneRing({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M5.5 4.2c.2-.7.9-1.1 1.6-1h1.7c.6 0 1.1.4 1.25 1l.75 2.9c.13.5-.03 1.05-.42 1.4l-1.3 1.15c1 2.1 2.75 3.85 4.85 4.85l1.15-1.3c.35-.4.9-.55 1.4-.42l2.9.75c.6.15 1 .65 1 1.25v1.7c.05.7-.35 1.4-1 1.6-2.2.6-6.1-.15-9.7-3.75S4.9 6.4 5.5 4.2z" />
      <path d="M15.5 4.5a4.4 4.4 0 013.9 3.9" strokeWidth="1.6" />
    </svg>
  )
}

// Salir a pestaña nueva: marco redondeado + flecha que sale.
export function ExternalGo({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M12 6H7.2C6 6 5 7 5 8.2v8.6C5 18 6 19 7.2 19h8.6c1.2 0 2.2-1 2.2-2.2V12" />
      <path d="M14 4.5h5.5V10" />
      <path d="M19 5l-7.5 7.5" />
    </svg>
  )
}

// Jet (silueta) para el botón de vuelos — despega en el propio botón.
export function PlaneJet({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
      <path d="M11 1.8c-.62 0-1.1.5-1.1 1.12v6.3L2.6 13.5c-.33.2-.53.55-.53.94v1.28c0 .42.4.72.8.6L9.9 14.9v3.5l-2 1.45c-.2.14-.32.37-.32.62v.86c0 .34.33.58.66.48L11 21.5l2.76.8c.33.1.66-.14.66-.48v-.86c0-.25-.12-.48-.32-.62l-2-1.45v-3.5l7.03 1.42c.4.08.8-.22.8-.63v-1.28c0-.39-.2-.74-.53-.94L12.1 9.22V2.92c0-.62-.48-1.12-1.1-1.12z" />
    </svg>
  )
}

// Cerrar.
export function CloseX({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} {...base} aria-hidden="true">
      <path d="M7 7l10 10" />
      <path d="M17 7L7 17" />
    </svg>
  )
}
