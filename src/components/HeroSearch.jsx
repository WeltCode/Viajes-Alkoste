import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Plane, BedDouble } from 'lucide-react'
import SearchWidget from './SearchWidget'
import HotelSearchWidget from './HotelSearchWidget'

const TABS = [
  { id: 'vuelos', label: 'Vuelos', Icon: Plane },
  { id: 'hoteles', label: 'Hoteles', Icon: BedDouble },
]

// Buscador del hero con conmutador Vuelos / Hoteles.
// - Vuelos: navega a /buscar/:token (motor de vuelos).
// - Hoteles: navega a /hoteles y abre allí los resultados del motor de Veturis.
export default function HeroSearch() {
  const [tab, setTab] = useState('vuelos')
  const navigate = useNavigate()

  const searchHotels = (url, title) =>
    navigate('/hoteles', { state: { hotelResultsUrl: url, hotelResultsTitle: title } })

  return (
    <div className="w-full">
      {/* Conmutador */}
      <div className="mb-3 flex">
        <div className="inline-flex rounded-full border border-white/25 bg-white/10 p-1 backdrop-blur-md">
          {TABS.map(({ id, label, Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-2 rounded-full px-5 py-2 text-sm font-bold transition-colors duration-300 ${
                tab === id ? 'text-cyan-600' : 'text-white/85 hover:text-white'
              }`}
            >
              {tab === id && (
                <motion.span
                  layoutId="heroSearchTab"
                  className="absolute inset-0 -z-10 rounded-full bg-white shadow-card"
                  transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                />
              )}
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      {tab === 'vuelos' ? (
        <SearchWidget showTitle={false} />
      ) : (
        <HotelSearchWidget showTitle={false} onSearch={searchHotels} />
      )}
    </div>
  )
}
