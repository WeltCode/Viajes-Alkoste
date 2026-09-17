import { Plane, Briefcase, Luggage, TriangleAlert } from 'lucide-react'
import LegalLayout from './LegalLayout'
import { contact } from '../../data/site'

const europeas = [
  { a: 'Iberia', personal: 'Bolso / mochila bajo el asiento', mano: '1 pieza hasta 10 kg · 56×40×25 cm', facturado: 'Según tarifa (Business/Óptima incluyen 23 kg)' },
  { a: 'Air Europa', personal: 'Bolso pequeño', mano: '10 kg · 55×35×25 cm', facturado: 'Óptima y largo radio: 1×23 kg' },
  { a: 'Vueling', personal: 'Bolso 40×20×30 cm (gratis)', mano: 'Maleta 10 kg · 55×40×20 cm (con Priority)', facturado: 'Opcional según tarifa' },
  { a: 'Ryanair', personal: 'Bolso 40×20×25 cm (gratis)', mano: 'Maleta 10 kg · 55×40×20 cm (solo Priority)', facturado: 'Opcional (10 o 20 kg)' },
  { a: 'easyJet', personal: 'Bolso 45×36×20 cm (gratis)', mano: 'Cabina grande 56×45×25 cm (con Plus/Up front)', facturado: 'Opcional (15–23 kg)' },
]

const latam = [
  { a: 'LATAM', personal: 'Bolso / mochila', mano: '1 pieza 8 kg · 55×35×25 cm', facturado: 'Largo radio económica: normalmente 1×23 kg (según ruta/tarifa)' },
  { a: 'Avianca', personal: 'Bolso pequeño', mano: '1 pieza 10 kg · 55×35×25 cm', facturado: 'Rutas a/desde Europa: 1×23 kg según tarifa' },
  { a: 'Aeroméxico', personal: 'Bolso pequeño', mano: '1 pieza 10 kg · 55×40×25 cm', facturado: 'Largo radio: 1×23 kg (Classic) o más' },
  { a: 'Copa Airlines', personal: 'Bolso / mochila', mano: '1 pieza 10 kg · 56×36×23 cm', facturado: '1–2×23 kg según ruta y clase' },
  { a: 'Iberia / Air Europa (a Latam)', personal: 'Bolso pequeño', mano: '10 kg', facturado: 'Económica largo radio: 1×23 kg' },
]

function BaggageTable({ rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-2xl border border-line">
      <table className="w-full min-w-[640px] border-collapse text-left text-sm">
        <thead>
          <tr className="bg-mist text-ink">
            <th className="px-4 py-3 font-bold">Aerolínea</th>
            <th className="px-4 py-3 font-bold">Artículo personal</th>
            <th className="px-4 py-3 font-bold">Equipaje de mano</th>
            <th className="px-4 py-3 font-bold">Facturado (orientativo)</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.a} className="border-t border-line align-top">
              <td className="px-4 py-3 font-semibold text-ink">{r.a}</td>
              <td className="px-4 py-3 text-ink-700">{r.personal}</td>
              <td className="px-4 py-3 text-ink-700">{r.mano}</td>
              <td className="px-4 py-3 text-ink-700">{r.facturado}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

const types = [
  { icon: Briefcase, title: 'Artículo personal', text: 'Un bolso, mochila pequeña o cámara que quepa bajo el asiento delantero. Casi todas las tarifas lo incluyen gratis.' },
  { icon: Plane, title: 'Equipaje de mano', text: 'La maleta de cabina que va en el compartimento superior. Su peso y medidas dependen de la aerolínea y la tarifa.' },
  { icon: Luggage, title: 'Equipaje facturado', text: 'Las maletas que se entregan en el mostrador. En vuelos de largo radio a Latinoamérica suele incluirse una pieza de 23 kg.' },
]

export default function EquipajePermitido() {
  return (
    <LegalLayout
      title="Equipaje Permitido"
      intro="Guía orientativa del equipaje que permiten las principales aerolíneas de Europa y Latinoamérica. Las condiciones exactas dependen siempre de la aerolínea y de la tarifa contratada."
    >
      <h2>Tipos de equipaje</h2>
      <div className="my-5 grid gap-4 sm:grid-cols-3">
        {types.map((t) => (
          <div key={t.title} className="rounded-2xl border border-line bg-white p-5 shadow-card">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-50 text-cyan-600"><t.icon className="h-5 w-5" /></span>
            <h3 className="mt-3 text-base font-bold text-ink">{t.title}</h3>
            <p className="mt-1 text-sm text-ink-500">{t.text}</p>
          </div>
        ))}
      </div>

      <h2>Aerolíneas europeas</h2>
      <p>Vuelos de corto y medio radio dentro de Europa (valores orientativos para clase turista):</p>
      <BaggageTable rows={europeas} />

      <h2>Aerolíneas de y hacia Latinoamérica</h2>
      <p>Vuelos de largo radio entre Europa y Latinoamérica (valores orientativos para clase turista):</p>
      <BaggageTable rows={latam} />

      <h2>Equipaje de mano: restricciones de seguridad</h2>
      <ul>
        <li><strong>Líquidos:</strong> en envases de máximo 100 ml, dentro de una bolsa transparente de cierre hermético de 1 litro.</li>
        <li><strong>Objetos prohibidos en cabina:</strong> tijeras, cortaúñas, navajas, cuchillos, maquinillas de afeitar y objetos punzantes o cortantes.</li>
        <li><strong>Baterías y dispositivos:</strong> las baterías de litio y power banks deben llevarse en el equipaje de mano, nunca facturadas.</li>
      </ul>

      <h2>Artículos especiales</h2>
      <p>
        No se aceptan artículos peligrosos (explosivos, corrosivos, venenosos). Determinados artículos
        (animales de compañía, equipos deportivos o musicales, armas, etc.) no se consideran equipaje
        ordinario, requieren comunicación previa y pueden conllevar un cargo adicional fijado por la aerolínea.
      </p>

      <div className="my-6 flex items-start gap-3 rounded-2xl border border-cyan-200 bg-cyan-50 p-5">
        <TriangleAlert className="mt-0.5 h-5 w-5 shrink-0 text-cyan-600" />
        <p className="!my-0 text-sm text-ink-700">
          Los datos de esta página son orientativos y pueden variar por aerolínea, tarifa y ruta. Antes de
          volar, confirma siempre las condiciones con tu aerolínea. Si tienes dudas, escríbenos por{' '}
          <a href={contact.whatsappHref} target="_blank" rel="noreferrer">WhatsApp</a> y te ayudamos.
        </p>
      </div>
    </LegalLayout>
  )
}
