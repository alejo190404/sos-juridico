import CircuitBoard from './CircuitBoard.jsx'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const STATS = [
  { num: '+2.400', label: 'casos resueltos' },
  { num: '12 años', label: 'de experiencia' },
  { num: '97%', label: 'satisfacción' },
]

export default function HeroSection() {
  return (
    <section id="hero" className="hero hero-a">
      <CircuitBoard />
      <div className="hero-chip">
        <p className="eyebrow">Servicio Jurídico Oportuno y Seguro</p>
        <h1>
          Tu defensa comienza aquí, <em className="em-signal">cuando lo necesitas.</em>
        </h1>
        <p className="hero-lead">
          Asesoría jurídica oportuna, segura y a tu alcance. Rápido, accesible y sin enredos.
        </p>
        <div className="btn-row">
          <button className="btn" onClick={() => scrollTo('contacto')}>
            Consulta ahora <span className="arr">→</span>
          </button>
          <button className="btn ghost" onClick={() => scrollTo('casos')}>
            Ver casos de éxito
          </button>
        </div>
        <div className="chip-meta">
          {STATS.map((s) => (
            <span key={s.label}><b>{s.num}</b> {s.label}</span>
          ))}
        </div>
      </div>
    </section>
  )
}
