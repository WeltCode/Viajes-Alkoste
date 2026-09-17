export default function Logo({ className = '' }) {
  // Text inherits currentColor so the navbar can flip it light/dark.
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg width="36" height="36" viewBox="0 0 64 64" aria-hidden="true" className="shrink-0">
        <rect width="64" height="64" rx="16" fill="#00a8e8" />
        <path
          d="M13 41 L51 21 M51 21 L33 19 M51 21 L47 39"
          fill="none"
          stroke="#ffffff"
          strokeWidth="4.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="23" cy="45" r="3.2" fill="#ffffff" />
      </svg>
      <span className="leading-none">
        <span className="block font-display text-xl font-extrabold tracking-tight text-current">
          Alkoste
        </span>
        <span className="block text-[0.55rem] font-bold uppercase tracking-[0.3em] text-cyan-500">
          Agencia de viajes
        </span>
      </span>
    </span>
  )
}
