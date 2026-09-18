// Configuración SEO centralizada de Viajes Alkoste.
// Cada ruta indexable define su <title>, meta description y (opcional) miga de pan.
// El componente src/components/Seo.jsx lee este mapa según la ruta actual.

export const SITE_URL = (import.meta.env.VITE_SITE_URL || 'https://viajesalkoste.com').replace(/\/+$/, '')
export const SITE_NAME = 'Viajes Alkoste'

// Imagen para compartir en redes (Open Graph / Twitter), 1200×630.
export const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&h=630&q=80'

export const DEFAULT_TITLE = 'Agencia de viajes en Madrid — Vuelos a Latinoamérica | Viajes Alkoste'
export const DEFAULT_DESCRIPTION =
  'Viajes Alkoste, tu agencia de viajes en Madrid desde 2002. Vuelos baratos a Latinoamérica, paquetes, hoteles, seguros y ESTA. Atención personal y financiación.'

const crumb = (name, path) => ({ name, path })
const home = crumb('Inicio', '/')

// Ruta → metadatos. `priority` y `changefreq` alimentan el sitemap.
export const PAGES = {
  '/': {
    title: 'Agencia de viajes en Madrid — Vuelos y paquetes a Latinoamérica | Viajes Alkoste',
    description:
      'Viajes Alkoste, tu agencia de viajes en Madrid desde 2002. Vuelos baratos a Latinoamérica (Ecuador, Perú, Colombia, México…), paquetes, hoteles, seguros y ESTA. Atención personal y financiación. Pide presupuesto sin compromiso.',
    priority: 1.0,
    changefreq: 'weekly',
  },
  '/vuelos': {
    title: 'Vuelos baratos desde Madrid a Latinoamérica | Viajes Alkoste',
    description:
      'Encuentra vuelos baratos desde Madrid a Ecuador, Perú, Colombia, México y todo el mundo. Comparamos aerolíneas para darte el mejor precio, con o sin equipaje. Reserva con Viajes Alkoste.',
    priority: 0.9,
    changefreq: 'weekly',
    breadcrumbs: [home, crumb('Vuelos', '/vuelos')],
  },
  '/hoteles': {
    title: 'Hoteles y alojamientos para tu viaje | Viajes Alkoste Madrid',
    description:
      'Reserva hoteles y alojamientos al mejor precio para tu viaje con Viajes Alkoste, agencia en Madrid. Desde hoteles con desayuno hasta todo incluido. Te asesoramos sin compromiso.',
    priority: 0.8,
    changefreq: 'weekly',
    breadcrumbs: [home, crumb('Hoteles', '/hoteles')],
  },
  '/nosotros': {
    title: 'Sobre nosotros — Agencia de viajes desde 2002 | Viajes Alkoste',
    description:
      'Conoce Viajes Alkoste: agencia de viajes con más de 20 años de experiencia, nacida en Quito y con sede en Madrid. Trato personal, honesto y profesional para cada viaje.',
    priority: 0.7,
    changefreq: 'monthly',
    breadcrumbs: [home, crumb('Nosotros', '/nosotros')],
  },
  '/contacto': {
    title: 'Contacto — C. Azabache 4, Madrid | Viajes Alkoste',
    description:
      'Contacta con Viajes Alkoste en Madrid: C. Azabache 4, 28019. Teléfono +34 910 000 187, WhatsApp y email. Horario L-V de 10:00 a 13:45. Te ayudamos a planificar tu viaje.',
    priority: 0.7,
    changefreq: 'monthly',
    breadcrumbs: [home, crumb('Contacto', '/contacto')],
  },
  '/condiciones-generales': {
    title: 'Condiciones generales de contratación | Viajes Alkoste',
    description: 'Condiciones generales de contratación de los servicios de Viajes Alkoste (SERINTG ALKOSTE, S.L.).',
    priority: 0.3,
    changefreq: 'yearly',
    breadcrumbs: [home, crumb('Condiciones generales', '/condiciones-generales')],
  },
  '/proteccion-de-datos': {
    title: 'Protección de datos | Viajes Alkoste',
    description: 'Información sobre el tratamiento y la protección de datos personales en Viajes Alkoste conforme al RGPD y la LOPDGDD.',
    priority: 0.3,
    changefreq: 'yearly',
    breadcrumbs: [home, crumb('Protección de datos', '/proteccion-de-datos')],
  },
  '/politica-privacidad': {
    title: 'Política de privacidad | Viajes Alkoste',
    description: 'Política de privacidad de Viajes Alkoste: qué datos recogemos, con qué finalidad y cuáles son tus derechos.',
    priority: 0.3,
    changefreq: 'yearly',
    breadcrumbs: [home, crumb('Política de privacidad', '/politica-privacidad')],
  },
  '/equipaje-permitido': {
    title: 'Equipaje permitido por aerolínea — guía | Viajes Alkoste',
    description: 'Guía del equipaje permitido (de mano y facturado) en las principales aerolíneas que vuelan a Europa y Latinoamérica. Medidas, pesos y consejos.',
    priority: 0.4,
    changefreq: 'monthly',
    breadcrumbs: [home, crumb('Equipaje permitido', '/equipaje-permitido')],
  },
  '/politica-cookies': {
    title: 'Política de cookies | Viajes Alkoste',
    description: 'Política de cookies de Viajes Alkoste: qué cookies usamos, para qué y cómo puedes configurarlas o rechazarlas.',
    priority: 0.3,
    changefreq: 'yearly',
    breadcrumbs: [home, crumb('Política de cookies', '/politica-cookies')],
  },
}

// Rutas que entran al sitemap.xml (todas las indexables).
export const INDEXABLE_PATHS = Object.keys(PAGES)
