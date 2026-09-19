import { useState } from 'react'

/**
 * Imagen con "skeleton" de carga: mientras la imagen se descarga se muestra un
 * placeholder animado (pulse) que la cubre; al cargar, se desvanece y revela la
 * imagen. Así, con internet lento, el área de imagen nunca aparece en blanco.
 *
 * Pensada para imágenes que rellenan su contenedor (el padre debe ser
 * `relative overflow-hidden` y tener tamaño). Mantiene las clases del <img>
 * original (p. ej. el zoom al hover) intactas.
 */
export default function SmartImage({ src, alt = '', className = '', skeletonClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const done = () => setLoaded(true)

  return (
    <>
      <img
        src={src}
        alt={alt}
        loading="lazy"
        onLoad={done}
        onError={done}
        className={`absolute inset-0 h-full w-full object-cover ${className}`}
        {...rest}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 overflow-hidden bg-ink/[0.06] transition-opacity duration-500 ${
          loaded ? 'opacity-0' : 'opacity-100'
        } ${skeletonClassName}`}
      >
        <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/60 to-transparent" />
      </span>
    </>
  )
}
