import { Link } from 'react-router-dom'
import LegalLayout from './LegalLayout'
import { contact } from '../../data/site'

export default function CondicionesGenerales() {
  return (
    <LegalLayout
      title="Condiciones Generales"
      intro="Condiciones de contratación y de viaje de los servicios ofrecidos por Viajes Alkoste."
    >
      <h2>1. Identificación</h2>
      <p>
        {contact.legalName} (en adelante, «Viajes Alkoste»), con CIF {contact.cif} y domicilio en{' '}
        {contact.address}, es la agencia de viajes titular de este sitio web. Contacto:{' '}
        <a href={contact.emailHref}>{contact.email}</a> · {contact.phone}. La contratación de cualquiera de
        nuestros servicios implica la aceptación de las presentes condiciones, de la{' '}
        <Link to="/politica-privacidad">Política de Privacidad</Link> y de la{' '}
        <Link to="/politica-cookies">Política de Cookies</Link>.
      </p>

      <h2>2. Cargos de emisión</h2>
      <p>
        La emisión de billetes puede conllevar un cargo de gestión que se informa antes de finalizar la
        compra. Dicho importe <strong>no es reembolsable en ningún caso</strong> y es independiente de la
        tarifa seleccionada por el comprador.
      </p>

      <h2>3. Cambios, reembolsos y reemisiones</h2>
      <p>
        La mayoría de las tarifas económicas <strong>no permiten cambios ni cancelaciones</strong>, por lo
        que el gasto de cancelación puede ser del 100% del importe del billete. En estos casos recomendamos
        contratar el seguro de cancelación para recuperar el importe ante imprevistos, y revisar siempre las
        condiciones de la tarifa antes de pagar la reserva.
      </p>
      <p>
        Todo cambio o cancelación debe solicitarse <strong>antes de la salida del vuelo</strong>. Cuando la
        tarifa permita reembolsos o cambios voluntarios (de fechas o trayectos), se aplicará un gasto de
        gestión de <strong>50&nbsp;€ por billete</strong>, adicional al cargo que establezca la compañía aérea.
      </p>
      <p>
        La aerolínea no permite un uso del billete distinto al contratado (por ejemplo, usar la vuelta sin
        haber volado la ida), ni el cambio de nombre o apellidos del pasajero. Revisa cuidadosamente fechas,
        origen, destino y nombres tal y como figuran en tu documentación: si no coinciden, la aerolínea podrá
        denegar el embarque y Viajes Alkoste declina cualquier responsabilidad.
      </p>

      <h3>Procedimiento</h3>
      <p>
        Una vez solicitado el coste del cambio o cancelación, un agente te informará de su viabilidad y de
        los gastos correspondientes, dejando constancia por correo electrónico.
      </p>
      <ul>
        <li>
          <strong>Cambios:</strong> si es posible y aceptas las condiciones, deberás abonar el coste y
          enviar el justificante de pago indicando la nueva fecha. Verificado el pago, recibirás el nuevo
          billete.
        </li>
        <li>
          <strong>Cancelación con reembolso:</strong> si la tarifa lo admite, deberás facilitarnos el número
          de cuenta para el ingreso. El plazo aproximado de devolución es de <strong>4 a 8 semanas</strong>.
        </li>
      </ul>
      <p>No se tendrá derecho a reembolso cuando se deniegue el embarque por:</p>
      <ul>
        <li>No presentar la documentación exigida (pasaporte, visado, certificados sanitarios…).</li>
        <li>Presentar documentos de viaje no válidos o caducados.</li>
        <li>No presentarse con la antelación debida a la facturación.</li>
        <li>Incumplir la normativa aplicable.</li>
        <li>Cualquier motivo no imputable a la agencia ni a la compañía aérea.</li>
      </ul>

      <h2>4. Condiciones del contrato de transporte</h2>
      <p>Todo transporte y servicio prestado por cada transportista estará sometido a:</p>
      <ol>
        <li>las disposiciones que figuran en el billete;</li>
        <li>las tarifas aplicables;</li>
        <li>las condiciones de transporte y reglamentaciones del transportista.</li>
      </ol>
      <p>
        El transportista que emite un billete para líneas de otro transportista actúa solo como agente de
        éste (vuelos compartidos). Los horarios pueden modificarse sin previo aviso y no forman parte del
        contrato; el transportista no garantiza los enlaces y puede sustituir aviones o suprimir escalas por
        necesidad operativa.
      </p>

      <h2>5. Equipaje</h2>
      <p>
        El equipaje facturado se entrega al portador del talón. En transporte internacional, cualquier daño
        debe reclamarse por escrito al transportista inmediatamente y, a lo sumo, en los <strong>7 días</strong>{' '}
        siguientes a la entrega; en caso de retraso, dentro de los <strong>21 días</strong> siguientes. No se
        aceptan artículos peligrosos (explosivos, corrosivos, venenosos) y ciertos artículos (animales,
        equipos deportivos o musicales, armas, etc.) requieren comunicación previa y pueden conllevar cargo.
        Consulta las franquicias y restricciones en <Link to="/equipaje-permitido">Equipaje Permitido</Link>.
      </p>

      <h2>6. Obligaciones del pasajero</h2>
      <ul>
        <li>Disponer de la documentación de viaje válida (DNI/pasaporte, visados, ESTA, certificados sanitarios).</li>
        <li>Presentarse en el aeropuerto con antelación suficiente: al menos <strong>60&nbsp;min</strong> en vuelos nacionales y <strong>150&nbsp;min</strong> en internacionales.</li>
        <li>Reconfirmar los horarios con la aerolínea al menos <strong>48&nbsp;horas</strong> antes de la salida, ya que pueden modificarse.</li>
      </ul>

      <h2>7. Precios y forma de pago</h2>
      <p>
        Los precios se confirman en el momento de la reserva e incluyen los impuestos y tasas aplicables
        salvo indicación en contrario. La reserva no se considera firme hasta la recepción del pago y el
        envío del justificante correspondiente por los canales indicados por la agencia.
      </p>

      <h2>8. Viajes combinados</h2>
      <p>
        Cuando el servicio contratado constituya un viaje combinado o un servicio de viaje vinculado, será de
        aplicación el <strong>Real Decreto-ley 23/2018, de 21 de diciembre</strong>, y el Texto Refundido de
        la Ley General para la Defensa de los Consumidores y Usuarios, informándose al cliente de sus
        derechos antes de la contratación.
      </p>

      <h2>9. Responsabilidad</h2>
      <p>
        Viajes Alkoste actúa como intermediario entre el cliente y los prestadores de los servicios
        (aerolíneas, hoteles, aseguradoras, etc.), respondiendo conforme a la normativa aplicable. No será
        responsable de las incidencias derivadas de causas de fuerza mayor o imputables a dichos prestadores
        o al propio pasajero.
      </p>

      <h2>10. Legislación aplicable</h2>
      <p>
        Estas condiciones se rigen por la legislación española. Para la resolución de cualquier controversia,
        las partes se someten a los juzgados y tribunales del domicilio del consumidor cuando así lo exija la
        normativa de consumo.
      </p>
    </LegalLayout>
  )
}
