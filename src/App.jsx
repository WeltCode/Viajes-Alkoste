/*
  DIRECTION CONTRACT — Viajes Alkoste (Luz & Cielo)

  THESIS: A bright, airy, editorial travel site on generous white space, where cyan is the
  single confident accent and one cinematic video (airplane window over the clouds) opens
  the journey. Cleanliness reads as trust. Refuses the old dark theme AND the busy
  Elementor icon-card template.

  OWN-WORLD: White ground with cyan-mist alt sections, Alkoste brand cyan (#00a8e8→#22bcea)
  committed to CTAs/active/icons/underlines. Ink text (#0d1b26). Thick geometric type: Sora
  display + Manrope UI. Soft shadows for depth (offset+blur), never flat halos.

  STORY: A latino traveler in Madrid opens to an airplane-window sky, meets a floating white
  "¿A dónde vas?" widget, browses real destinations, sees the live @viajesalkoste Instagram
  feed and real Google reviews, and knows a human agent is one WhatsApp away.

  FIRST VIEWPORT: Full-bleed autoplay video (airplane window) + animated dashed flight path,
  white headline left, floating white search widget right; primary action = Buscar viaje.

  FORM: Editorial light travel site, multipágina. One signature motion per section (Framer
  Motion, ease-out from visible default). Brief-pinned direction: light+cyan, thick sans,
  video hero, Instagram feed.
*/
import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import ScrollToTop from './components/ScrollToTop'
import CookieConsent from './components/CookieConsent'
import { LanguageProvider } from './i18n/LanguageProvider'

// Layout raíz: cabecera, pie y elementos globales alrededor de la página activa
// (<Outlet />). Las rutas se declaran como datos en src/routes.jsx para permitir
// el prerenderizado estático (SSG) de cada página. Todo va dentro del proveedor
// de idioma (ES por defecto, EN/PT en cliente).
export default function App() {
  return (
    <LanguageProvider>
      <div className="flex min-h-screen flex-col">
        <ScrollToTop />
        <Navbar />
        <main className="flex-1">
          <Outlet />
        </main>
        <Footer />
        <WhatsAppFab />
        <CookieConsent />
      </div>
    </LanguageProvider>
  )
}
