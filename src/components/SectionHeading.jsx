import Reveal from './Reveal'

export default function SectionHeading({ kicker, title, intro, align = 'left', className = '' }) {
  const alignCls = align === 'center' ? 'items-center text-center mx-auto' : 'items-start text-left'
  return (
    <div className={`flex max-w-3xl flex-col gap-4 ${alignCls} ${className}`}>
      {kicker && (
        <Reveal>
          <span className="kicker">
            <span className="h-0.5 w-8 rounded-full bg-cyan-400" />
            {kicker}
          </span>
        </Reveal>
      )}
      <Reveal as="h2" delay={0.05} className="display text-3xl leading-[1.05] text-ink sm:text-4xl md:text-5xl">
        {title}
      </Reveal>
      {intro && (
        <Reveal delay={0.1} className="max-w-prose text-base leading-relaxed text-ink-700">
          {intro}
        </Reveal>
      )}
    </div>
  )
}
