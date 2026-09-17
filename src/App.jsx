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
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Vuelos from './pages/Vuelos'
import Hoteles from './pages/Hoteles'
import Contacto from './pages/Contacto'
import BuscarVuelos from './pages/BuscarVuelos'
import NotFound from './pages/NotFound'
import CookieConsent from './components/CookieConsent'
import CondicionesGenerales from './pages/legal/CondicionesGenerales'
import ProteccionDatos from './pages/legal/ProteccionDatos'
import PoliticaPrivacidad from './pages/legal/PoliticaPrivacidad'
import EquipajePermitido from './pages/legal/EquipajePermitido'
import PoliticaCookies from './pages/legal/PoliticaCookies'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <ScrollToTop />
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vuelos" element={<Vuelos />} />
          <Route path="/hoteles" element={<Hoteles />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/buscar/:searchToken" element={<BuscarVuelos />} />
          <Route path="/condiciones-generales" element={<CondicionesGenerales />} />
          <Route path="/proteccion-de-datos" element={<ProteccionDatos />} />
          <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
          <Route path="/equipaje-permitido" element={<EquipajePermitido />} />
          <Route path="/politica-cookies" element={<PoliticaCookies />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppFab />
      <CookieConsent />
    </div>
  )
}
