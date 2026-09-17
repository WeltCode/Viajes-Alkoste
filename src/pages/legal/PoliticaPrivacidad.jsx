import { Link } from 'react-router-dom'
import LegalLayout from './LegalLayout'
import { contact } from '../../data/site'

export default function PoliticaPrivacidad() {
  return (
    <LegalLayout
      title="Política de Privacidad"
      intro="Cómo tratamos tus datos personales conforme al Reglamento (UE) 2016/679 (RGPD) y la LOPDGDD 3/2018."
    >
      <h2>1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Titular:</strong> {contact.legalName}</li>
        <li><strong>CIF:</strong> {contact.cif}</li>
        <li><strong>Domicilio:</strong> {contact.address}</li>
        <li><strong>Teléfono:</strong> {contact.phone} · WhatsApp {contact.whatsapp}</li>
        <li><strong>Correo electrónico:</strong> {contact.email}</li>
        <li><strong>Sitio web:</strong> viajesalkoste.com</li>
      </ul>

      <h2>2. Normativa aplicable</h2>
      <p>
        Esta Política de Privacidad se ha diseñado de acuerdo con el Reglamento General de Protección de
        Datos (UE) 2016/679 del Parlamento Europeo y del Consejo, de 27 de abril de 2016 (RGPD), y con la
        Ley Orgánica 3/2018, de 5 de diciembre, de Protección de Datos Personales y garantía de los
        derechos digitales (LOPDGDD). Se complementa con nuestra{' '}
        <Link to="/politica-cookies">Política de Cookies (UE)</Link>, las{' '}
        <Link to="/condiciones-generales">Condiciones Generales</Link> y la{' '}
        <Link to="/proteccion-de-datos">información de Protección de Datos</Link>.
      </p>
      <p>
        Al facilitarnos tus datos, declaras haber leído y aceptado la presente política, prestando tu
        consentimiento al tratamiento conforme a las finalidades aquí descritas. La empresa podrá modificar
        esta política para adaptarla a novedades legislativas o jurisprudenciales.
      </p>

      <h2>3. Finalidades del tratamiento</h2>
      <p>Tratamos tus datos personales para las siguientes finalidades:</p>
      <ul>
        <li>Atender tus consultas y solicitudes de información (formulario de contacto, WhatsApp, teléfono o correo).</li>
        <li>Gestionar la reserva y contratación de los servicios de viaje solicitados (vuelos, alojamientos, paquetes, seguros, etc.).</li>
        <li>Enviarte, si lo consientes, comunicaciones comerciales, ofertas y novedades por medios electrónicos o telefónicos.</li>
        <li>Cumplir las obligaciones legales, contables y fiscales que nos resulten aplicables.</li>
      </ul>

      <h2>4. Base jurídica (legitimación)</h2>
      <ul>
        <li><strong>Consentimiento del interesado</strong> (art. 6.1.a RGPD) para consultas y comunicaciones comerciales.</li>
        <li><strong>Ejecución de un contrato</strong> o medidas precontractuales (art. 6.1.b) para gestionar reservas y servicios.</li>
        <li><strong>Cumplimiento de obligaciones legales</strong> (art. 6.1.c) en materia fiscal, contable y de viajes combinados.</li>
        <li><strong>Interés legítimo</strong> (art. 6.1.f) para la seguridad del sitio y la mejora de nuestros servicios.</li>
      </ul>

      <h2>5. Categorías de datos</h2>
      <ul>
        <li><strong>Datos identificativos y de contacto:</strong> nombre y apellidos, correo electrónico, teléfono y dirección.</li>
        <li><strong>Datos de la reserva:</strong> los necesarios para emitir billetes y gestionar el servicio (fechas, destinos, pasajeros y, en su caso, datos de pago).</li>
        <li><strong>Datos de navegación:</strong> datos técnicos y de uso del sitio, según la <Link to="/politica-cookies">Política de Cookies</Link>.</li>
      </ul>
      <p>
        Los campos obligatorios se señalan en los formularios. Si no los facilitas, no podremos atender la
        finalidad prevista. No se toman decisiones automatizadas con efectos jurídicos para el usuario.
      </p>

      <h2>6. Plazo de conservación</h2>
      <p>
        Conservaremos tus datos mientras exista una relación con nosotros o hasta que revoques tu
        consentimiento o solicites su supresión. Una vez finalizada la relación, se conservarán
        debidamente bloqueados durante los plazos legalmente exigidos (mercantiles, fiscales y de viajes
        combinados) para atender posibles responsabilidades.
      </p>

      <h2>7. Destinatarios y cesiones</h2>
      <p>
        Tus datos podrán comunicarse a terceros únicamente cuando sea necesario para prestar el servicio
        contratado: aerolíneas, centrales de reservas (GDS), cadenas hoteleras, aseguradoras, proveedores
        de medios de pago y, en su caso, Administraciones Públicas cuando exista obligación legal.
      </p>
      <p>
        Conforme a la Resolución 830d de IATA, podrás decidir si facilitas tus datos de contacto (teléfono
        y correo) a la aerolínea de tu reserva para que te avise ante incidencias operativas de los vuelos,
        sin ninguna otra finalidad comercial.
      </p>
      <p>
        Algunos proveedores tecnológicos pueden actuar como encargados del tratamiento con las garantías
        del art. 28 RGPD. En caso de transferencias internacionales fuera del Espacio Económico Europeo, se
        aplicarán las garantías adecuadas previstas en el RGPD (decisiones de adecuación o cláusulas
        contractuales tipo).
      </p>

      <h2>8. Medidas de seguridad</h2>
      <p>
        Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad y
        confidencialidad de tus datos y evitar su alteración, pérdida, tratamiento o acceso no autorizado,
        teniendo en cuenta el estado de la tecnología. No obstante, el usuario debe ser consciente de que
        las medidas de seguridad en Internet no son inexpugnables.
      </p>

      <h2>9. Tus derechos</h2>
      <p>Puedes ejercer, de forma gratuita, los siguientes derechos:</p>
      <ul>
        <li>Acceso a tus datos personales.</li>
        <li>Rectificación de los datos inexactos o supresión cuando ya no sean necesarios.</li>
        <li>Limitación de su tratamiento en los supuestos previstos.</li>
        <li>Oposición al tratamiento por motivos relacionados con tu situación particular.</li>
        <li>Portabilidad de los datos a otro responsable.</li>
        <li>Retirar el consentimiento prestado en cualquier momento, sin efecto retroactivo.</li>
      </ul>
      <p>
        Para ejercerlos, escríbenos a <a href={contact.emailHref}>{contact.email}</a> indicando el derecho
        que deseas ejercer y adjuntando copia de un documento identificativo. Si consideras que no hemos
        atendido correctamente tus derechos, puedes presentar una reclamación ante la{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.
      </p>

      <h2>10. Comunicaciones comerciales</h2>
      <p>
        Conforme a la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio Electrónico
        (LSSI-CE), si no deseas recibir comunicaciones comerciales electrónicas podrás oponerte enviando un
        correo a <a href={contact.emailHref}>{contact.email}</a>. Nuestra actividad se rige, además, por el
        Real Decreto-ley 23/2018 en materia de viajes combinados y servicios de viaje vinculados.
      </p>
    </LegalLayout>
  )
}
