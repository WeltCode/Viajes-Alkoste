# ROADMAP — Viajes Alkoste (React + Vite + Tailwind)

> **Regla de oro del proyecto:** SIN backend propio. Nada de servidores de pago
> (Render, Railway, VPS…). Todo se resuelve con **hosting estático gratuito** +
> **servicios de terceros / funciones serverless gratuitas** + **APIs client-side**.
> Los secretos que no pueden ir en el frontend se resuelven con servicios que ya
> guardan el token por nosotros (Behold, Featurable, Web3Forms) o, si hiciera
> falta, con funciones serverless del propio hosting (Netlify/Vercel/Cloudflare),
> que son gratuitas y no cuentan como "backend de pago".

Estado: 🟢 hecho · 🟡 en curso / falta configurar clave · 🔴 pendiente

---

## FASE 0 — Cuentas y servicios (crear, todo gratis)
Antes de integrar nada, dar de alta:

- 🔴 **Hosting estático**: elegir uno — **Cloudflare Pages** (recomendado, gratis y rápido), Netlify o Vercel.
- 🔴 **Meta for Developers** + cuenta de **Instagram Business/Creator** vinculada a una **Página de Facebook** (necesario para el feed de IG).
- 🔴 **Perfil de Empresa de Google** (Google Business Profile) de la agencia, verificado (necesario para reseñas).
- 🔴 **Web3Forms** → cuenta + access key (solo pide email) para el formulario.
- 🔴 **Behold.so** (o LightWidget/EmbedSocial) para el feed de Instagram sin backend.
- 🔴 **Featurable** para reseñas de Google filtradas por estrellas.
- 🔴 **Dominio** viajesalkoste.com: acceso al panel DNS del registrador.
- 🔴 **Email** info@viajesalkoste.com operativo (hosting de correo del dominio; no es backend).

---

## FASE 1 — Integraciones sin backend (rellenar `.env`)
El código ya está preparado; solo faltan las claves. Copiar `.env.example` a `.env`.

### 1.1 Formulario de contacto 🟡 (código listo, falta clave)
- **Servicio:** Web3Forms (client-side, sin backend).
- **Cómo:** crear access key en web3forms.com → `.env`: `VITE_WEB3FORMS_KEY=...`
- **Resultado:** los envíos llegan al email. Sin clave, cae en WhatsApp (fallback ya implementado).
- Archivo: `src/components/LeadForm.jsx`.
- Alternativas equivalentes: Formspree, EmailJS, Getform.

### 1.2 Feed de Instagram 🟡 (código listo, falta endpoint)
- **Servicio:** Behold.so (gratis) → da una URL JSON del feed. (Alt: LightWidget, EmbedSocial, SnapWidget, o función serverless con token.)
- **Cómo:** conectar la cuenta IG business en el servicio → copiar su URL JSON → `.env`: `VITE_INSTAGRAM_ENDPOINT=...`
- Archivo: `src/lib/instagram.js` (ya normaliza el JSON y hace fallback a placeholders).

### 1.3 Reseñas de Google (≥4★, recientes) 🟡 (código listo, falta endpoint)
- **Servicio:** Featurable (gratis, API de reseñas de Google con filtro por estrellas y orden por fecha).
- **Cómo:** conectar el Perfil de Empresa → copiar el endpoint/JSON → `.env`: `VITE_GOOGLE_REVIEWS_ENDPOINT=...`
- El código ya filtra **≥4★** (`MIN_RATING` en `src/lib/googleReviews.js`).
- ⚠️ Google no da "tiempo real" instantáneo; estos servicios refrescan cada pocas horas/día (lo más cercano posible).

---

## FASE 2 — Contenido real (reemplazar placeholders)
Marcado en `src/data/site.js` y componentes.

- 🔴 **Cifras/estadísticas** reales (años, clientes, destinos, valoración) — *se eliminaron del home por petición; si se reutilizan, poner cifras reales.*
- 🔴 **Precios de destinos** (`destinations[].price`) — hoy ocultos/comentados en la tarjeta. Definir si se muestran y con qué precios reales, o dejar "Consultar".
- 🔴 **Precios de hoteles** (`src/pages/Hoteles.jsx`) — orientativos; poner reales o quitar.
- 🔴 **Fotografía propia** en alta resolución (hoy Unsplash): destinos, hoteles, inspiración, hero (opcional). Optimizar a WebP/AVIF.
- 🔴 **Reseñas** — al conectar Featurable pasan a ser reales; el set actual es real pero estático.
- 🔴 **Textos** (nosotros, servicios, inspiración) — revisar y suavizar claims (p. ej. evitar "la primera agencia de España").

---

## FASE 3 — Legal y cookies (obligatorio en España: LSSI + RGPD) ✅ hecho
- 🟢 **Páginas legales creadas** con contenido conforme a RGPD/LOPDGDD/LSSI: `/condiciones-generales`, `/proteccion-de-datos`, `/politica-privacidad`, `/equipaje-permitido` (guía por aerolíneas EU/Latam), `/politica-cookies`. Layout `src/pages/legal/LegalLayout.jsx`. Datos: SERINTG ALKOSTE, S.L. · CIF B88007521 · C. Azabache 4, 28019 Madrid.
  - 🟡 Revisión por asesor legal antes de producción (recomendado). (Aviso Legal como página separada: pendiente opcional.)
- 🟢 **Banner de consentimiento** propio (sin backend, sin dependencia): `src/components/CookieConsent.jsx` + `src/lib/cookieConsent.js`. Aceptar/Rechazar con igual prominencia, configuración granular (necesarias/analíticas/marketing), persistencia en localStorage, reapertura desde el footer ("Configuración de cookies") y desde la Política de Cookies.
- 🟢 **Gating de embeds**: `src/components/ConsentGate.jsx`. El mapa de Google en Contacto NO se carga sin consentimiento de "marketing". *(Cuando se conecte el feed real de Instagram —Fase 1.2— envolverlo también en `ConsentGate`.)*
- 🟡 **Fuentes**: hoy se cargan de Google Fonts. Para evitar consentimiento por fuentes, considerar **autohospedar** Sora/Manrope (fontsource) — opcional pero recomendable en la UE.

---

## FASE 4 — SEO y analítica (sin backend)
- 🔴 **Meta tags por página** (title, description, Open Graph/Twitter): usar `react-helmet-async` o el prerender.
- 🔴 **Datos estructurados** JSON-LD `TravelAgency`/`LocalBusiness` (nombre, CIF, dirección, teléfono, horario, reseñas).
- 🔴 **Prerender/SSG** para que Google indexe la SPA: `vite-react-ssg` o `react-snap` (genera HTML estático en el build; **no** requiere backend).
- 🔴 **sitemap.xml** y **robots.txt**.
- 🔴 **Analítica** (opcional, gratis, sin backend): **Cloudflare Web Analytics** o **Plausible**/GA4 (gatear tras consentimiento).
- 🟢 Favicon e íconos: hecho.

---

## FASE 5 — Buscador de vuelos ✅ funcional (motor externo)
El buscador del hero está **conectado al motor de vuelos** de Alkoste con el mismo contrato
que el proyecto Vicente Viajes:
- 🟢 **Autocompletado de aeropuertos** por ciudad/IATA (`public/data/airports.json`, 3.689 aeropuertos; `src/lib/flightBridge.js`).
- 🟢 **Envío POST nativo** al motor con los campos `startPt/endPt/startPtCode/endPtCode/startDt/endDt/flightType/adults/children/infants`. Endpoint configurable con `VITE_FLIGHT_BRIDGE_URL` (por defecto `http://vuelos.viajesalkoste.com/wtc/ak/vuelos/Default.aspx`). Los resultados se abren en pestaña nueva.
- ⚠️ **Mixed content:** el endpoint es `http://`. Al desplegar en `https://`, un `<iframe>` embebido quedaría bloqueado, pero el POST con `target="_blank"` (navegación de nivel superior) sí funciona. Ideal: exponer el motor por **https** para poder embeberlo dentro del sitio.

---

## FASE 6 — Despliegue y dominio (sin backend)
- 🔴 `npm run build` → publica la carpeta `dist/` en el hosting estático elegido.
- 🔴 Conectar el repositorio (deploy automático en cada push) — Cloudflare Pages/Netlify/Vercel.
- 🔴 Configurar **variables de entorno** (`VITE_*`) en el panel del hosting (mismas que en `.env`).
- 🔴 Apuntar el **dominio** viajesalkoste.com al hosting (DNS) + **HTTPS** (automático).
- 🔴 Redirecciones SPA (fallback a `index.html`) — el hosting elegido lo ofrece por config.
- 🔴 Verificar el **email** del dominio para recibir los leads de Web3Forms.

---

## FASE 7 — QA final
- 🔴 Revisión responsive (móvil/tablet/desktop) y navegadores.
- 🔴 Accesibilidad (contraste, foco, alt text, teclado).
- 🔴 Rendimiento (Lighthouse): peso del vídeo hero, lazy-load de imágenes, `prefers-reduced-motion` (ya respetado).
- 🔴 Enlaces (arreglar los `#` legales), formularios (envío real), embeds tras consentimiento.
- 🔴 Prueba de extremo a extremo: enviar formulario, abrir WhatsApp, ver feed IG y reseñas reales.

---

## Resumen de variables de entorno (`.env`)
```
VITE_WEB3FORMS_KEY=            # Fase 1.1 — formulario
VITE_INSTAGRAM_ENDPOINT=       # Fase 1.2 — feed Instagram (Behold JSON)
VITE_INSTAGRAM_PROFILE=viajesalkoste
VITE_GOOGLE_REVIEWS_ENDPOINT=  # Fase 1.3 — reseñas (Featurable JSON)
VITE_GOOGLE_PLACE_ID=
VITE_GOOGLE_REVIEWS_URL=
```

## Servicios elegidos (todos con plan gratuito, sin backend de pago)
| Necesidad | Servicio | Coste |
|---|---|---|
| Hosting estático + deploy | Cloudflare Pages (o Netlify/Vercel) | Gratis |
| Formulario → email | Web3Forms | Gratis |
| Feed Instagram | Behold.so | Gratis |
| Reseñas Google ≥4★ | Featurable | Gratis |
| Consentimiento cookies | vanilla-cookieconsent | Gratis (librería) |
| Analítica (opc.) | Cloudflare Web Analytics / Plausible | Gratis |
| Buscador self-service (opc.) | Travelpayouts (afiliados) | Gratis (+comisión) |
