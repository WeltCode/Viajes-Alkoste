import { ViteReactSSG } from 'vite-react-ssg'
import { routes } from './routes'
import './index.css'

// Punto de entrada con prerenderizado estático (SSG). vite-react-ssg genera un
// HTML por ruta en `npm run build` y en cliente hidrata la SPA con normalidad.
export const createRoot = ViteReactSSG({ routes })
