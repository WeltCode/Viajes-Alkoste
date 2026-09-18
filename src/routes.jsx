// Definición de rutas como datos, para que vite-react-ssg pueda prerenderizar
// cada página a HTML estático (clave para el SEO de una SPA). El layout es App,
// que pinta Navbar/Footer y un <Outlet /> con la página activa.
import App from './App'
import Home from './pages/Home'
import Nosotros from './pages/Nosotros'
import Vuelos from './pages/Vuelos'
import Hoteles from './pages/Hoteles'
import Contacto from './pages/Contacto'
import BuscarVuelos from './pages/BuscarVuelos'
import NotFound from './pages/NotFound'
import CondicionesGenerales from './pages/legal/CondicionesGenerales'
import ProteccionDatos from './pages/legal/ProteccionDatos'
import PoliticaPrivacidad from './pages/legal/PoliticaPrivacidad'
import EquipajePermitido from './pages/legal/EquipajePermitido'
import PoliticaCookies from './pages/legal/PoliticaCookies'

export const routes = [
  {
    path: '/',
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: 'vuelos', element: <Vuelos /> },
      { path: 'hoteles', element: <Hoteles /> },
      { path: 'nosotros', element: <Nosotros /> },
      { path: 'contacto', element: <Contacto /> },
      { path: 'buscar/:searchToken', element: <BuscarVuelos /> },
      { path: 'condiciones-generales', element: <CondicionesGenerales /> },
      { path: 'proteccion-de-datos', element: <ProteccionDatos /> },
      { path: 'politica-privacidad', element: <PoliticaPrivacidad /> },
      { path: 'equipaje-permitido', element: <EquipajePermitido /> },
      { path: 'politica-cookies', element: <PoliticaCookies /> },
      { path: '*', element: <NotFound /> },
    ],
  },
]
