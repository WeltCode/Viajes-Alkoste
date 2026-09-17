// Central content source for Viajes Alkoste.
// All copy mirrors the live site (viajesalkoste.com); numbers/prices marked below
// are authored placeholders to replace with the agency's real figures.

const IMG = 'https://images.unsplash.com'
const img = (id, w = 1200) => `${IMG}/${id}?auto=format&fit=crop&w=${w}&q=80`

export const contact = {
  legalName: 'SERINTG ALKOSTE, S.L.',
  cif: 'B88007521',
  phone: '+34 910 000 187',
  phoneHref: 'tel:+34910000187',
  whatsapp: '+34 674 722 677',
  whatsappHref: 'https://wa.me/34674722677',
  whatsappRaw: '34674722677',
  email: 'info@viajesalkoste.com',
  emailHref: 'mailto:info@viajesalkoste.com',
  address: 'C. Azabache, 4, 28019 Madrid',
  addressMap: 'https://www.google.com/maps/search/?api=1&query=C.+Azabache+4+28019+Madrid',
  hours: 'Lunes a viernes · 10:00 – 13:45',
  instagram: 'https://www.instagram.com/viajesalkoste',
  facebook: 'https://www.facebook.com/viajesalkoste',
}

export const nav = [
  { label: 'Inicio', to: '/' },
  { label: 'Vuelos', to: '/vuelos' },
  { label: 'Hoteles', to: '/hoteles' },
  { label: 'Nosotros', to: '/nosotros' },
  { label: 'Contacto', to: '/contacto' },
]

export const heroVideo = '/videos/hero-avion.mp4' // 720p — desktop
export const heroVideoSm = '/videos/hero-avion-sm.mp4' // 540p — mobile (lighter)

export const heroImages = {
  main: img('photo-1507525428034-b723cf961d3e', 2400), // tropical coast
  poster: img('photo-1436491865332-7a61a109cc05', 2000), // airplane wing / clouds (video poster)
  quito: img('photo-1558370781-d6196949e317', 1600),
  peru: img('photo-1587595431973-160d0d94add1', 1600),
}

export const stats = [
  { value: 23, suffix: '+', label: 'Años de experiencia', hint: 'Desde 2002' },
  { value: 15, suffix: 'K+', label: 'Clientes satisfechos', hint: 'Y sumando' },
  { value: 500, suffix: '+', label: 'Destinos en el mundo', hint: 'Vuelos y paquetes' },
  { value: 4.9, suffix: '★', label: 'Valoración en Google', hint: 'Reseñas reales', decimals: 1 },
]

export const services = [
  {
    id: 'vuelos',
    name: 'Vuelos',
    icon: 'Plane',
    tagline: 'Las mejores tarifas a cualquier destino, con o sin equipaje.',
    body: 'Comparamos aerolíneas y rutas para encontrarte el mejor precio a Latinoamérica y al resto del mundo. Ida y vuelta o sólo ida, con el equipaje que necesites.',
    image: img('photo-1436491865332-7a61a109cc05', 900),
  },
  {
    id: 'alojamientos',
    name: 'Alojamientos',
    icon: 'BedDouble',
    tagline: 'Desde hoteles hasta apartamentos. Tú eliges.',
    body: 'Desayuno, media pensión o todo incluido. Seleccionamos alojamientos que encajan con tu viaje y tu presupuesto.',
    image: img('photo-1566073771259-6a8506099945', 900),
  },
  {
    id: 'coches',
    name: 'Coches de alquiler',
    icon: 'Car',
    tagline: 'Para los que arman su propia ruta.',
    body: 'Coches de alquiler en cualquier destino, con las coberturas que quieras, para moverte con total libertad.',
    image: img('photo-1503376780353-7e6692767b70', 900),
  },
  {
    id: 'seguros',
    name: 'Seguros de viaje',
    icon: 'ShieldCheck',
    tagline: 'Adaptados a ti, al mejor precio.',
    body: 'Seguros con las garantías que necesitas: médicos, cancelación, equipaje. Viaja tranquilo pase lo que pase.',
    image: img('photo-1521791136064-7986c2920216', 900),
  },
  {
    id: 'paquetes',
    name: 'Paquetes turísticos',
    icon: 'Luggage',
    tagline: 'Vuelo + hotel, con o sin actividades.',
    body: 'Diseñamos el paquete completo a tu medida: vuelo, hotel y excursiones. Nos adaptamos a ti.',
    image: img('photo-1476514525535-07fb3b4ae5f1', 900),
  },
  {
    id: 'tren-bus',
    name: 'Billetes de tren y bus',
    icon: 'TrainFront',
    tagline: 'Para los más de servicios terrestres.',
    body: 'Trenes y autobuses para conectar ciudades y recorrer el territorio a tu ritmo.',
    image: img('photo-1474487548417-781cb71495f3', 900),
  },
  {
    id: 'visados',
    name: 'Permisos y visados — EEUU',
    icon: 'StampIcon',
    tagline: 'Te gestionamos el ESTA y el visado de turista.',
    body: 'Tramitamos tu permiso ESTA para que viajes sin problemas. También gestionamos el visado de turista a Estados Unidos.',
    image: img('photo-1485738422979-f5c462d49f74', 900),
  },
  {
    id: 'financiacion',
    name: 'Financiación',
    icon: 'CreditCard',
    tagline: 'Vuela ahora, paga a plazos.',
    body: 'Financiación inmediata en la mayoría de nuestros servicios. Sin contratos, sin nóminas ni papeleo. Volar es más fácil con nosotros.',
    image: img('photo-1554224155-6726b3ff858f', 900),
  },
]

// Prices below are illustrative placeholders — replace with real fares.
export const destinations = [
  { id: 'quito', city: 'Quito', country: 'Ecuador', image: img('photo-1558370781-d6196949e317'), rating: 4.9, price: 599, tag: 'Más vendido' },
  { id: 'guayaquil', city: 'Cotopaxi & Andes', country: 'Ecuador', image: img('photo-1568632234157-ce7aecd03d0d'), rating: 4.8, price: 629 },
  { id: 'lima', city: 'Machu Picchu', country: 'Perú', image: img('photo-1587595431973-160d0d94add1'), rating: 5.0, price: 689, tag: 'Icónico' },
  { id: 'cartagena', city: 'Cartagena', country: 'Colombia', image: img('photo-1552832230-c0197dd311b5'), rating: 4.8, price: 549 },
  { id: 'cancun', city: 'Cancún', country: 'México', image: img('photo-1512813195386-6cf811ad3542'), rating: 4.7, price: 579, tag: 'Playa' },
  { id: 'rio', city: 'Río de Janeiro', country: 'Brasil', image: img('photo-1589909202802-8f4aadce1849'), rating: 4.9, price: 719 },
  { id: 'buenosaires', city: 'Buenos Aires', country: 'Argentina', image: img('photo-1483729558449-99ef09a8c325'), rating: 4.8, price: 759 },
  { id: 'puntacana', city: 'Punta Cana', country: 'R. Dominicana', image: img('photo-1516306580123-e6e52b1b7b5f'), rating: 4.9, price: 639, tag: 'Todo incluido' },
]

export const news = [
  {
    id: 1,
    title: 'Celebra el amor sin fronteras este febrero',
    excerpt: 'Escápate en pareja con nuestras ofertas de San Valentín a destinos de ensueño.',
    date: 'Feb 2026',
    image: img('photo-1519046904884-53103b34b206', 800),
  },
  {
    id: 2,
    title: 'Vuela a Ecuador desde Madrid al mejor precio',
    excerpt: 'Tarifas especiales Madrid ⇄ Quito y Guayaquil. Plazas limitadas.',
    date: 'Ene 2026',
    image: img('photo-1558370781-d6196949e317', 800),
  },
  {
    id: 3,
    title: '¡Escápate al paraíso este 2026!',
    excerpt: 'Paquetes de playa todo incluido en el Caribe listos para reservar.',
    date: 'Ene 2026',
    image: img('photo-1507525428034-b723cf961d3e', 800),
  },
  {
    id: 4,
    title: 'Ofertas irresistibles a Latinoamérica',
    excerpt: 'Descuentos por reserva anticipada en las rutas más solicitadas.',
    date: 'Dic 2025',
    image: img('photo-1552832230-c0197dd311b5', 800),
  },
]

export const reviews = [
  { name: 'Mayte Garcés', rating: 5, text: 'Es una agencia recomendable, seria, ágil y segura. Me dieron toda la información que necesitaba y la atención fue muy buena. Estoy muy agradecida.' },
  { name: 'Deyvi Quiroz', rating: 5, text: 'Excelente servicio, comunicación rápida y cualquier duda resuelta. Recomiendo esta agencia, en especial a Roxana. Seré cliente habitual.' },
  { name: 'Edison Yunda', rating: 5, text: 'Destacar el gran trabajo de Nathalia, muy amable y profesional. Me solucionó todas las dudas y encontró el mejor vuelo al mejor precio. 100% recomendable.' },
  { name: 'Leilanie V.R', rating: 5, text: 'La atención es excelente. Te explican muy bien el viaje y las mejores opciones y precios. Lo más importante: la calidad humana de las personas que trabajan ahí.' },
  { name: 'Victor Julio Colquier', rating: 5, text: 'Excelente atención por parte de Roxana. Muy atenta, servicial y rápida en la gestión de mi pasaje. Lo recomiendo al 100%.' },
  { name: 'marie-pierre jules', rating: 5, text: 'Atención inmejorable. Muy amables y eficientes, tanto Giovana como Alex. Hacen las cosas más fáciles. No dudaré en volver a sus servicios.' },
  { name: 'Harold Jara', rating: 4, text: 'Excelente la atención, muy amable. Voy a recomendar a mis amigos. Muchas gracias.' },
  { name: 'Lina Aguiar', rating: 5, text: 'Me encantó comprar mis tiquetes con ustedes. Excelente atención y seguiré viajando con ustedes.' },
]

export const values = [
  { title: 'Excelencia', body: 'Nos empeñamos en alcanzar la excelencia en todo lo que hacemos.', icon: 'Sparkles' },
  { title: 'Respeto', body: 'Lideramos con el ejemplo, reconociendo y respetando a personas, socios y clientes.', icon: 'HeartHandshake' },
  { title: 'Integridad', body: 'Trabajamos con total confianza, honestidad y transparencia.', icon: 'ShieldCheck' },
  { title: 'Compromiso', body: 'Comprometidos con la seguridad, el entorno y el éxito de cada viaje.', icon: 'Flag' },
]

export const company = {
  founded: 2002,
  origin: 'Quito, Ecuador',
  hq: 'Madrid, España',
  historia:
    'Viajes Alkoste opera como agencia de viajes desde el año 2002, con una trayectoria de más de 20 años. Nació en la ciudad de Quito (Ecuador) de la mano de dos jóvenes visionarios que decidieron apostar por sus sueños, comercializando vuelos aéreos y paquetes turísticos a Europa y Estados Unidos. Hoy su base y sede principal está en Madrid, con un equipo de profesionales comprometidos con la calidad del servicio y el trato al cliente, respetando siempre sus valores éticos.',
  mision:
    'Brindar un servicio personalizado y eficiente a nuestros clientes, atrayendo a más personas interesadas en los viajes y el turismo nacional e internacional, y siendo una empresa modelo en el cumplimiento de sus obligaciones.',
  vision:
    'Ser la agencia de referencia en la comercialización de servicios turísticos —billetes aéreos, hoteles, trenes, seguros, coches, tours y excursiones— en la que confían sus clientes por su liderazgo en calidad, responsabilidad y participación en el mercado.',
  objetivo:
    'Producir y prestar servicios turísticos de calidad para todas las personas que deseen disfrutar del placer de viajar y conocer las bellezas naturales, culturales y patrimoniales del mundo, ofreciendo la mejor atención y consejo antes y después del viaje.',
}
