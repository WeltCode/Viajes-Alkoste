import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
  },
  // Opciones de prerenderizado estático (vite-react-ssg).
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    // Prerenderizamos solo las rutas estáticas indexables. Las dinámicas
    // (/buscar/:token) y el comodín 404 se resuelven en cliente.
    includedRoutes(paths) {
      return paths.filter((p) => !p.includes(':') && p !== '*')
    },
  },
})
