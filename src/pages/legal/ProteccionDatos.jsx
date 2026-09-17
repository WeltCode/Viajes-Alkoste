import { Link } from 'react-router-dom'
import LegalLayout from './LegalLayout'
import { contact } from '../../data/site'

export default function ProteccionDatos() {
  return (
    <LegalLayout
      title="Protección de Datos"
      intro="Información básica sobre el tratamiento de tus datos personales conforme al RGPD (UE) 2016/679 y la LOPDGDD 3/2018."
    >
      <h2>Información básica sobre protección de datos</h2>
      <ul>
        <li><strong>Responsable:</strong> {contact.legalName} (CIF {contact.cif}), {contact.address}.</li>
        <li><strong>Finalidad:</strong> atender tus consultas, gestionar la contratación de servicios de viaje y, si lo consientes, enviarte información comercial.</li>
        <li><strong>Legitimación:</strong> consentimiento del interesado, ejecución de un contrato, cumplimiento de obligaciones legales e interés legítimo.</li>
        <li><strong>Destinatarios:</strong> proveedores necesarios para prestar el servicio (aerolíneas, hoteles, aseguradoras, medios de pago) y Administraciones Públicas cuando exista obligación legal. No se ceden datos con otros fines.</li>
        <li><strong>Derechos:</strong> acceso, rectificación, supresión, limitación, oposición, portabilidad y retirada del consentimiento, escribiendo a <a href={contact.emailHref}>{contact.email}</a>.</li>
        <li><strong>Información adicional:</strong> consulta la <Link to="/politica-privacidad">Política de Privacidad</Link> completa.</li>
      </ul>

      <h2>Nuestro compromiso</h2>
      <p>
        {contact.legalName} se toma muy en serio la privacidad de sus clientes. Tratamos tus datos de forma
        lícita, leal y transparente, limitados a la finalidad para la que se recogen, y solo durante el
        tiempo necesario. Aplicamos los principios de minimización de datos, exactitud, integridad y
        confidencialidad exigidos por el RGPD.
      </p>

      <h2>Medidas de seguridad</h2>
      <p>
        Hemos adoptado las medidas técnicas y organizativas necesarias para garantizar la seguridad de los
        datos personales y evitar su alteración, pérdida, tratamiento o acceso no autorizado, atendiendo al
        estado de la tecnología, la naturaleza de los datos y los riesgos a los que están expuestos.
      </p>
      <ul>
        <li>Conexión cifrada mediante protocolo <strong>HTTPS/TLS</strong> en todo el sitio web.</li>
        <li>Acceso restringido a los datos únicamente al personal autorizado, sujeto a deber de confidencialidad.</li>
        <li>Copias de seguridad y control de accesos a los sistemas de información.</li>
      </ul>

      <h2>Seguridad en los pagos</h2>
      <p>
        Cuando el pago de un servicio se realiza con tarjeta, la operación se procesa a través de la
        pasarela segura de una entidad financiera o proveedor de pago certificado, bajo el estándar
        <strong> PCI-DSS</strong>. {contact.legalName} <strong>no almacena</strong> los datos completos de
        tu tarjeta en sus sistemas. Los datos de pago se cifran y solo son accesibles para la entidad
        encargada de procesar la transacción.
      </p>

      <h2>Datos de contacto para privacidad</h2>
      <ul>
        <li><strong>Correo:</strong> <a href={contact.emailHref}>{contact.email}</a></li>
        <li><strong>Teléfono / WhatsApp:</strong> {contact.phone} · {contact.whatsapp}</li>
        <li><strong>Dirección:</strong> {contact.address}</li>
      </ul>
      <p>
        Si consideras que el tratamiento de tus datos no se ajusta a la normativa, puedes reclamar ante la{' '}
        <a href="https://www.aepd.es" target="_blank" rel="noreferrer">Agencia Española de Protección de Datos (AEPD)</a>.
      </p>
    </LegalLayout>
  )
}
