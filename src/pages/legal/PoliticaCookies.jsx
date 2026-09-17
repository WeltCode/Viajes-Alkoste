import { Link } from 'react-router-dom'
import LegalLayout from './LegalLayout'
import { openCookiePreferences } from '../../lib/cookieConsent'
import { contact } from '../../data/site'

export default function PoliticaCookies() {
  return (
    <LegalLayout
      title="Política de Cookies (UE)"
      intro="Información sobre el uso de cookies en este sitio conforme al RGPD (UE) 2016/679, la Directiva ePrivacy 2002/58/CE y el art. 22.2 de la LSSI-CE."
    >
      <h2>1. ¿Qué son las cookies?</h2>
      <p>
        Una cookie es un pequeño archivo de texto que un sitio web almacena en tu navegador o dispositivo
        cuando lo visitas. Sirven para que la web funcione, para recordar tus preferencias y, con tu permiso,
        para analizar el uso del sitio o mostrar contenido de terceros. También usamos tecnologías similares
        (localStorage, píxeles) a las que se aplica esta política.
      </p>

      <h2>2. Base legal</h2>
      <p>
        Las cookies <strong>técnicas o necesarias</strong> se utilizan sobre la base del interés legítimo,
        por ser imprescindibles para prestar el servicio. El resto de cookies (analíticas y de
        marketing/contenido externo) solo se instalan con tu <strong>consentimiento previo</strong>, que
        recabamos mediante el banner de cookies y que puedes retirar en cualquier momento.
      </p>

      <h2>3. Tipos de cookies que utilizamos</h2>
      <h3>Necesarias (siempre activas)</h3>
      <p>
        Permiten la navegación, la seguridad y recordar tu propia elección sobre cookies. Sin ellas la web
        no funcionaría correctamente. No requieren consentimiento.
      </p>
      <ul>
        <li><strong>alk_cookie_consent</strong> — guarda tu decisión sobre las cookies (propia, ~12 meses).</li>
      </ul>

      <h3>Analíticas (requieren consentimiento)</h3>
      <p>
        Nos ayudan a entender de forma agregada y anónima cómo se usa la web para mejorarla (páginas más
        vistas, rendimiento). Solo se activan si las aceptas.
      </p>

      <h3>Marketing y contenido externo (requieren consentimiento)</h3>
      <p>
        Corresponden a contenido embebido de terceros que puede instalar sus propias cookies:
      </p>
      <ul>
        <li><strong>Google Maps</strong> (Google Ireland Ltd.) — mapa de nuestra ubicación en la página de contacto.</li>
        <li><strong>Instagram / Meta</strong> — feed de publicaciones mostrado en la página principal.</li>
      </ul>
      <p>
        Estos servicios son responsables de sus propias cookies; consulta sus políticas para más detalle.
        Mientras no des tu consentimiento, este contenido permanece bloqueado.
      </p>

      <h2>4. Gestionar o retirar tu consentimiento</h2>
      <p>
        Puedes cambiar o retirar tu consentimiento cuando quieras desde el panel de configuración:
      </p>
      <p>
        <button type="button" onClick={openCookiePreferences} className="btn-primary !no-underline">
          Configurar cookies
        </button>
      </p>
      <p>
        También puedes bloquear o eliminar las cookies desde la configuración de tu navegador
        (<a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noreferrer">Chrome</a>,{' '}
        <a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies-sitios-web-rastrear-preferencias" target="_blank" rel="noreferrer">Firefox</a>,{' '}
        <a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noreferrer">Safari</a>,{' '}
        <a href="https://support.microsoft.com/es-es/microsoft-edge" target="_blank" rel="noreferrer">Edge</a>). Ten en cuenta que
        deshabilitar ciertas cookies puede afectar al funcionamiento del sitio.
      </p>

      <h2>5. Conservación</h2>
      <p>
        Tu decisión sobre cookies se conserva hasta 12 meses; transcurrido ese plazo volveremos a
        solicitártela. Puedes retirarla antes en cualquier momento.
      </p>

      <h2>6. Cambios y contacto</h2>
      <p>
        Podemos actualizar esta Política de Cookies para adaptarla a novedades legales o técnicas. Para
        cualquier duda, escríbenos a <a href={contact.emailHref}>{contact.email}</a>. Consulta también
        nuestra <Link to="/politica-privacidad">Política de Privacidad</Link>.
      </p>
    </LegalLayout>
  )
}
