import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X, Phone } from 'lucide-react'
import WhatsAppIcon from './WhatsAppIcon'
import { nav, contact } from '../data/site'
import logoLight from '../assets/AlkosteLogo.png'
import logoNormal from '../assets/AlkosteLogoNormal.png'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Páginas con hero oscuro a tope de página: el navbar va transparente con texto
  // blanco al entrar y se vuelve sólido (texto oscuro) al hacer scroll — igual que
  // en el home. El resto de páginas (legales, /buscar) tienen cabecera clara.
  const darkHeroRoutes = ['/', '/vuelos', '/hoteles', '/nosotros', '/contacto']
  const overHero = darkHeroRoutes.includes(pathname) && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setOpen(false), [pathname])
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => (document.body.style.overflow = '')
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? 'border-b border-line bg-white/85 py-3 backdrop-blur-xl' : 'border-b border-transparent py-5'
      }`}
    >
      <nav className={`container-x flex items-center justify-between gap-4 ${overHero ? 'text-white' : 'text-ink'}`}>
        <Link
          to="/"
          aria-label="Inicio — Viajes Alkoste"
          className="shrink-0"
          onClick={() => {
            // Si ya estamos en el home, sube al principio (la ruta no cambia).
            if (pathname === '/') window.scrollTo({ top: 0, behavior: 'smooth' })
          }}
        >
          <img
            src={overHero ? logoLight : logoNormal}
            alt="Viajes Alkoste"
            className="h-9 w-auto sm:h-10"
          />
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `group relative rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? overHero ? 'text-white' : 'text-cyan-600'
                      : overHero ? 'text-white/80 hover:text-white' : 'text-ink-700 hover:text-cyan-600'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {item.label}
                    <span
                      className={`absolute inset-x-4 -bottom-0.5 h-0.5 origin-left rounded-full bg-cyan-500 transition-transform duration-300 ${
                        isActive ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-3 lg:flex">
          <a href={contact.phoneHref} className={`flex items-center gap-2 text-sm font-semibold transition-colors ${overHero ? 'text-white/90 hover:text-white' : 'text-ink-700 hover:text-cyan-600'}`}>
            <Phone className={`h-4 w-4 ${overHero ? 'text-white' : 'text-cyan-500'}`} />
            {contact.phone}
          </a>
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn-primary">
            <WhatsAppIcon className="h-4 w-4" />
            WhatsApp
          </a>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`grid h-11 w-11 place-items-center rounded-full border transition-colors lg:hidden ${
            overHero ? 'border-white/40 text-white' : 'border-line text-ink'
          }`}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="container-x mt-3 lg:hidden"
          >
            <div className="rounded-3xl border border-line bg-white p-4 shadow-lift">
              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.to}>
                    <NavLink
                      to={item.to}
                      className={({ isActive }) =>
                        `block rounded-2xl px-4 py-3 text-base font-semibold ${
                          isActive ? 'bg-cyan-50 text-cyan-600' : 'text-ink-700 hover:bg-mist'
                        }`
                      }
                    >
                      {item.label}
                    </NavLink>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex flex-col gap-2 border-t border-line pt-3">
                <a href={contact.phoneHref} className="btn-ghost w-full">
                  <Phone className="h-4 w-4 text-cyan-500" /> {contact.phone}
                </a>
                <a href={contact.whatsappHref} target="_blank" rel="noreferrer" className="btn-primary w-full">
                  <WhatsAppIcon className="h-4 w-4" /> Escríbenos por WhatsApp
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
