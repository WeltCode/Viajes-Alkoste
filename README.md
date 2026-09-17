<div align="center">

<img src="src/assets/iconoalkoste.png" alt="Viajes Alkoste" width="110" />

# ✈️ Viajes Alkoste

**Agencia de viajes en Madrid — vuelos, paquetes y experiencias a Latinoamérica y el mundo.**

Sitio web moderno construido con **React + Vite + Tailwind CSS**.
Diseño luminoso, buscador de vuelos real y cumplimiento legal europeo (RGPD).

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-3-06B6D4?logo=tailwindcss&logoColor=white)
![Sin backend](https://img.shields.io/badge/Backend-No%20necesario-08ACF2)

</div>

---

## 📑 Índice

1. [¿Qué es esto?](#-qué-es-esto)
2. [Características](#-características)
3. [Puesta en marcha (rápido)](#-puesta-en-marcha)
4. [Cómo funciona la web](#-cómo-funciona-la-web) · *(el manual)*
5. [Variables de entorno](#-variables-de-entorno)
6. [Estructura del proyecto](#-estructura-del-proyecto)
7. [Integraciones y su estado](#-integraciones-y-su-estado)
8. [Despliegue](#-despliegue)
9. [Documentos del proyecto](#-documentos-del-proyecto)

---

## 🧭 ¿Qué es esto?

La web pública de **SERINTG ALKOSTE, S.L.** (Viajes Alkoste, CIF B88007521), una
agencia de viajes con sede en Madrid y raíces en Latinoamérica. El objetivo del
sitio es que un viajero **encuentre su vuelo** y **contacte con un agente** de forma
sencilla, con una imagen moderna y de confianza.

> **Principio del proyecto:** funciona **sin backend de pago** (nada de Render/Railway).
> Todo se resuelve con **hosting estático gratuito** + **servicios de terceros/serverless
> gratuitos** + APIs de cliente. Ver [`ROADMAP.md`](ROADMAP.md).

---

## ✨ Características

| | |
|---|---|
| 🎬 **Hero con vídeo** | Vista desde la ventana de un avión, con una ruta de vuelo animada muy sutil. |
| 🔎 **Buscador de vuelos real** | Autocompletado de aeropuertos (IATA) y conexión al motor de reservas. |
| 🗺️ **Páginas** | Inicio, Vuelos, Hoteles, Nosotros, Contacto + resultados de vuelos. |
| 📸 **Instagram** | Sección lista para mostrar el feed real de `@viajesalkoste`. |
| ⭐ **Reseñas de Google** | Carrusel de reseñas, filtrado a **4–5 estrellas**. |
| 📝 **Formulario funcional** | Envía la consulta por email (Web3Forms) o WhatsApp, **sin backend**. |
| ⚖️ **Legal (RGPD)** | Páginas legales + **banner de cookies** conforme a la normativa europea. |
| 📱 **100% responsive** | Móvil, tablet y escritorio. |
| 💬 **WhatsApp** | Botón flotante y CTAs a WhatsApp en toda la web. |

---

## 🚀 Puesta en marcha

Necesitas [Node.js](https://nodejs.org) 18+.

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en desarrollo (http://localhost:5173)
npm run dev

# 3. Compilar para producción (genera /dist)
npm run build

# 4. Previsualizar el build de producción
npm run preview
```

> Copia `.env.example` a `.env` y rellena las claves que quieras activar
> (ver [Variables de entorno](#-variables-de-entorno)). Si no pones ninguna,
> la web funciona igualmente con contenidos de ejemplo y con WhatsApp.

---

## 🧩 Cómo funciona la web

### 1) El buscador de vuelos (el corazón)

```
Escribes origen/destino
      │  (autocompletado local con public/data/airports.json — sin API, sin CORS)
      ▼
Pulsas "Buscar vuelo"  →  se valida y se arma un "payload"
      │
      ▼
Navega a  /buscar/<token>     ← la búsqueda viaja codificada en la URL
      │                          (es compartible, recargable y con "atrás")
      ▼
La página de resultados muestra una animación de vuelo y hace un
<form> POST nativo al motor externo dentro de un <iframe>
      │
      ▼
El motor pinta los resultados dentro de la web (con navbar y footer)
```

- **Autocompletado:** 100% local (JSON de aeropuertos), tolerante a acentos y mayúsculas.
- **El envío es un `<form>` POST**, no un `fetch` → así **esquiva CORS** y funciona contra
  el motor externo (`.aspx`), que no es una API.
- **Endpoint del motor:** se configura con `VITE_FLIGHT_BRIDGE_URL`
  (por defecto el puente `QueryBridge.aspx` de Alkoste). Debe estar **activado por el
  proveedor del motor** para que devuelva resultados.

Archivos clave: `src/lib/flightBridge.js`, `src/components/SearchWidget.jsx`,
`src/pages/BuscarVuelos.jsx`, `public/data/airports.json`.

### 2) El formulario de contacto (sin backend)

Al enviar, usa **Web3Forms** (si configuras su clave) para que la consulta llegue por
**email**. Si no hay clave, abre **WhatsApp** con el mensaje ya escrito. Archivo:
`src/components/LeadForm.jsx`.

### 3) Cookies y contenido externo (RGPD)

- Un **banner de consentimiento** (aceptar / rechazar / configurar) guarda tu elección.
- El **mapa de Google** (y, en el futuro, el feed de Instagram) **no se cargan** hasta que
  aceptas las cookies de "marketing". Archivos: `src/lib/cookieConsent.js`,
  `src/components/CookieConsent.jsx`, `src/components/ConsentGate.jsx`.

### 4) Instagram y reseñas

Ambos usan un **adaptador** que muestra contenido de ejemplo hasta que conectas la fuente
real (una URL de feed). Archivos: `src/lib/instagram.js`, `src/lib/googleReviews.js`.

---

## 🔑 Variables de entorno

Crea un archivo `.env` (a partir de `.env.example`). **Todas son opcionales**: sin ellas,
la web funciona con contenidos de ejemplo.

| Variable | Para qué sirve |
|---|---|
| `VITE_FLIGHT_BRIDGE_URL` | Endpoint del motor de vuelos (`QueryBridge.aspx`). |
| `VITE_WEB3FORMS_KEY` | Clave de Web3Forms para que el formulario llegue por email. |
| `VITE_INSTAGRAM_ENDPOINT` | URL del feed de Instagram (p. ej. Behold.so). |
| `VITE_GOOGLE_REVIEWS_ENDPOINT` | URL del feed de reseñas de Google (p. ej. Featurable). |
| `VITE_GOOGLE_REVIEWS_URL` | Enlace a tu perfil/reseñas de Google. |

> Tras editar `.env`, reinicia `npm run dev`.

---

## 📁 Estructura del proyecto

```
viajes_alkoste/
├─ public/
│  ├─ iconoalkoste.png        # favicon (icono de la web)
│  ├─ data/airports.json      # aeropuertos para el autocompletado
│  └─ videos/                 # vídeos del hero (avión)
├─ src/
│  ├─ assets/                 # logos e imágenes locales
│  ├─ components/             # navbar, footer, buscador, banner cookies…
│  │  ├─ SearchWidget.jsx     # el buscador de vuelos
│  │  ├─ FlightSearchLoader.jsx  # animación mientras busca
│  │  ├─ CookieConsent.jsx    # banner RGPD
│  │  └─ …
│  ├─ pages/                  # Home, Vuelos, Hoteles, Nosotros, Contacto…
│  │  ├─ BuscarVuelos.jsx     # resultados del buscador (/buscar/:token)
│  │  └─ legal/               # páginas legales (RGPD/LSSI)
│  ├─ lib/                    # flightBridge, cookieConsent, instagram, googleReviews
│  ├─ data/site.js            # textos y datos centralizados de la agencia
│  ├─ App.jsx                 # rutas
│  └─ main.jsx                # punto de entrada
├─ .env.example               # plantilla de variables
├─ ROADMAP.md                 # plan paso a paso (qué falta y cómo)
├─ PRODUCT.md · DESIGN.md     # contexto de producto y de diseño
└─ index.html
```

---

## 🔌 Integraciones y su estado

| Integración | Estado | Qué falta |
|---|---|---|
| Buscador de vuelos | 🟢 Conectado | Que el proveedor active el puente `QueryBridge.aspx` para `ak`. |
| Formulario (email) | 🟡 Listo | Poner `VITE_WEB3FORMS_KEY`. |
| Instagram | 🟡 Listo | Poner `VITE_INSTAGRAM_ENDPOINT` (Behold, etc.). |
| Reseñas Google (4–5★) | 🟡 Listo | Poner `VITE_GOOGLE_REVIEWS_ENDPOINT` (Featurable, etc.). |
| Cookies / legal | 🟢 Hecho | Revisión por asesor legal antes de producción. |

Detalle completo en [`ROADMAP.md`](ROADMAP.md).

---

## 🌐 Despliegue

Al ser un sitio **estático**, se publica gratis en **Cloudflare Pages**, **Netlify** o
**Vercel**:

```bash
npm run build      # genera la carpeta /dist
```

1. Sube el repositorio al hosting (deploy automático en cada push).
2. Configura las variables `VITE_*` en el panel del hosting.
3. Apunta el dominio `viajesalkoste.com` (DNS) y activa HTTPS.

---

## 📚 Documentos del proyecto

- 🗺️ [`ROADMAP.md`](ROADMAP.md) — plan paso a paso de lo que falta y cómo hacerlo.
- 📦 [`PRODUCT.md`](PRODUCT.md) — contexto del producto (qué es, para quién).
- 🎨 [`DESIGN.md`](DESIGN.md) — sistema de diseño (colores, tipografías, reglas).

---

<div align="center">

**SERINTG ALKOSTE, S.L.** · CIF B88007521 · C. Azabache 4, 28019 Madrid
📞 +34 910 000 187 · 💬 +34 674 722 677 · ✉️ info@viajesalkoste.com

</div>
