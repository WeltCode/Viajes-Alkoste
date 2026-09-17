import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PageHero({ image, kicker, title, intro, crumb }) {
  return (
    <section className="relative flex min-h-[60vh] items-end overflow-hidden pt-24">
      <motion.img
        src={image}
        alt=""
        aria-hidden="true"
        initial={{ scale: 1.12 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/45 to-ink/25" />
      <div className="container-x relative pb-14 sm:pb-20">
        <nav className="mb-5 flex items-center gap-1.5 text-xs font-semibold text-white/70">
          <Link to="/" className="hover:text-white">Inicio</Link>
          <ChevronRight className="h-3.5 w-3.5" />
          <span className="text-cyan-200">{crumb ?? title}</span>
        </nav>
        <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="inline-flex items-center gap-2 text-[0.72rem] font-bold uppercase tracking-[0.22em] text-cyan-200">
          {kicker}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="display mt-3 max-w-4xl text-4xl leading-[1.05] text-white sm:text-6xl"
        >
          {title}
        </motion.h1>
        {intro && (
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.25 }} className="mt-5 max-w-2xl text-lg leading-relaxed text-white/85">
            {intro}
          </motion.p>
        )}
      </div>
    </section>
  )
}
