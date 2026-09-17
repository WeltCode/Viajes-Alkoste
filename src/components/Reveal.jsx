import { motion } from 'framer-motion'

const easeOut = [0.16, 1, 0.3, 1]

export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 28,
  className = '',
  once = true,
  amount = 0.25,
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration: 0.8, ease: easeOut, delay }}
    >
      {children}
    </MotionTag>
  )
}
