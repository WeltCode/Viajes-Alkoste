import { Head } from 'vite-react-ssg'
import { useLocation } from 'react-router-dom'
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  DEFAULT_DESCRIPTION,
  PAGES,
} from '../seo/pages'

// Genera el JSON-LD de la miga de pan (BreadcrumbList) para páginas internas.
function breadcrumbLd(breadcrumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.name,
      item: `${SITE_URL}${b.path === '/' ? '/' : b.path}`,
    })),
  }
}

/**
 * <Seo /> — controla el <head> de cada página (title, description, canonical,
 * Open Graph, Twitter, robots y breadcrumbs). Lee los metadatos de src/seo/pages.js
 * según la ruta actual; las props permiten sobrescribir puntualmente.
 */
export default function Seo({ title, description, image, noindex = false, breadcrumbs }) {
  const { pathname } = useLocation()
  const page = PAGES[pathname] || {}

  const metaTitle = title || page.title || DEFAULT_TITLE
  const metaDescription = description || page.description || DEFAULT_DESCRIPTION
  const metaImage = image || page.image || DEFAULT_OG_IMAGE
  const canonical = pathname === '/' ? `${SITE_URL}/` : `${SITE_URL}${pathname}`
  const crumbs = breadcrumbs || page.breadcrumbs

  return (
    <Head>
      <html lang="es" />
      <title>{metaTitle}</title>
      <meta name="description" content={metaDescription} />
      <link rel="canonical" href={canonical} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large, max-snippet:-1'}
      />

      {/* Open Graph (Facebook, WhatsApp, LinkedIn…) */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale" content="es_ES" />
      <meta property="og:title" content={metaTitle} />
      <meta property="og:description" content={metaDescription} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={metaImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={metaTitle} />

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metaTitle} />
      <meta name="twitter:description" content={metaDescription} />
      <meta name="twitter:image" content={metaImage} />

      {/* Miga de pan para resultados enriquecidos */}
      {crumbs && crumbs.length > 1 && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd(crumbs))}</script>
      )}
    </Head>
  )
}
