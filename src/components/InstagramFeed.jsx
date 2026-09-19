import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Instagram, Heart, MessageCircle, ArrowUpRight, Play, Layers } from 'lucide-react'
import SectionHeading from './SectionHeading'
import SmartImage from './SmartImage'
import { fetchInstagramPosts, instagramProfileUrl } from '../lib/instagram'

function Tile({ post, index }) {
  return (
    <motion.a
      href={post.permalink || instagramProfileUrl}
      target="_blank"
      rel="noreferrer"
      initial={{ opacity: 0, scale: 0.92, y: 24 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: (index % 3) * 0.08 }}
      className="group relative aspect-square overflow-hidden rounded-2xl bg-mist shadow-card"
    >
      {post.isVideo && post.video ? (
        <video
          src={post.video}
          poster={post.image || undefined}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      ) : (
        <SmartImage
          src={post.image}
          alt={post.caption?.slice(0, 80) || 'Publicación de Instagram de Viajes Alkoste'}
          className="transition-transform duration-700 ease-out group-hover:scale-110"
        />
      )}

      {/* indicador de tipo (vídeo / carrusel) */}
      {(post.isVideo || post.isCarousel) && (
        <span className="absolute left-3 top-3 grid h-7 w-7 place-items-center rounded-full bg-ink/55 text-white backdrop-blur-sm">
          {post.isVideo ? <Play className="h-3.5 w-3.5 fill-white" /> : <Layers className="h-3.5 w-3.5" />}
        </span>
      )}

      {/* hover overlay */}
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-ink/85 via-ink/20 to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="line-clamp-3 text-xs font-medium leading-relaxed text-white">{post.caption}</p>
        {(post.likes != null || post.comments != null) && (
          <div className="mt-2 flex items-center gap-4 text-xs font-bold text-white">
            {post.likes != null && (
              <span className="flex items-center gap-1"><Heart className="h-3.5 w-3.5 fill-white" /> {post.likes}</span>
            )}
            {post.comments != null && (
              <span className="flex items-center gap-1"><MessageCircle className="h-3.5 w-3.5" /> {post.comments}</span>
            )}
          </div>
        )}
      </div>
      {/* corner IG glyph */}
      <span className="absolute right-3 top-3 grid h-8 w-8 place-items-center rounded-full bg-white/85 text-ink opacity-0 backdrop-blur transition-all duration-300 group-hover:opacity-100">
        <Instagram className="h-4 w-4" />
      </span>
    </motion.a>
  )
}

function Skeleton() {
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-ink/[0.06]">
      <span className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/70 to-transparent" />
    </div>
  )
}

export default function InstagramFeed() {
  const [posts, setPosts] = useState(null)

  useEffect(() => {
    let alive = true
    // Si el feed no carga (data = null), no tocamos el estado: se mantiene el
    // skeleton de carga en vez de dejar la sección vacía.
    fetchInstagramPosts(6).then((data) => {
      if (alive && data) setPosts(data)
    })
    return () => {
      alive = false
    }
  }, [])

  return (
    <section className="border-y border-line bg-mist py-20 sm:py-28">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-end">
          <div className="flex items-start gap-4">
            <span className="ig-ring grid h-14 w-14 shrink-0 place-items-center rounded-full p-[3px]">
              <span className="grid h-full w-full place-items-center rounded-full bg-white">
                <Instagram className="h-6 w-6 text-ink" />
              </span>
            </span>
            <SectionHeading
              kicker="Síguenos en Instagram"
              title="Vive el viaje antes de viajar"
              intro="Ofertas, destinos y momentos reales de nuestros viajeros. Lo último de @viajesalkoste, aquí mismo."
            />
          </div>
          <a href={instagramProfileUrl} target="_blank" rel="noreferrer" className="btn-white shrink-0">
            <Instagram className="h-4 w-4 text-cyan-500" /> @viajesalkoste
          </a>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {posts === null
            ? Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} />)
            : posts.map((p, i) => <Tile key={p.id} post={p} index={i} />)}
        </div>

        <div className="mt-10 flex justify-center">
          <a href={instagramProfileUrl} target="_blank" rel="noreferrer" className="btn-primary">
            Ver más en Instagram <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  )
}
