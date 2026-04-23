import digital from '../assets/Digital.jpg'
import jutsicia from '../assets/jutsicia.jpg'
import mace from '../assets/mace.jpg'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        marginTop: 80,
        height: 'calc(100vh - 80px)',
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        background: 'var(--grey-0)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Geometric background shapes */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 0 }}>
        <div style={{ position: 'absolute', width: 180, height: 180, top: -40, right: '42%', transform: 'rotate(18deg)', background: 'var(--grey-2)', opacity: 0.6 }} />
        <div style={{ position: 'absolute', width: 90, height: 90, top: '30%', right: '44%', transform: 'rotate(34deg)', background: 'var(--purple-dim)' }} />
        <div style={{ position: 'absolute', width: 260, height: 60, bottom: 100, left: -60, transform: 'rotate(-8deg)', background: 'var(--grey-2)', opacity: 0.5 }} />
        <div style={{ position: 'absolute', width: 50, height: 50, bottom: 180, left: 180, transform: 'rotate(22deg)', background: 'var(--purple)', opacity: 0.3 }} />
        <div style={{ position: 'absolute', width: 120, height: 120, top: 120, left: 60, transform: 'rotate(5deg)', background: 'var(--grey-2)', opacity: 0.35 }} />
      </div>

      {/* LEFT — content */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '80px 64px',
          gap: 28,
        }}
      >
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--purple)' }}>
          Servicio Jurídico Oportuno y Seguro
        </p>

        <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, lineHeight: 1.1, color: 'var(--black)' }}>
          Tu defensa<br />comienza aquí,<br /><span style={{ color: 'var(--purple)' }}>cuando lo necesitas.</span>
        </h1>

        <p style={{ fontSize: 17, color: 'var(--grey-4)', lineHeight: 1.6, maxWidth: 420 }}>
          Asesoría jurídica oportuna, segura y a tu alcance. Rápido, accesible y sin enredos.
        </p>

        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          <button
            onClick={() => scrollTo('contacto')}
            style={{
              background: 'var(--purple)',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 700,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'background 0.2s, transform 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background = 'var(--purple-light)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--purple)'; e.currentTarget.style.transform = 'translateY(0)' }}
          >
            CONSULTA AHORA →
          </button>
          <button
            onClick={() => scrollTo('casos')}
            style={{
              background: 'transparent',
              color: 'var(--black)',
              border: '2px solid var(--grey-3)',
              padding: '13px 28px',
              borderRadius: 6,
              fontSize: 15,
              fontWeight: 600,
              cursor: 'pointer',
              fontFamily: 'inherit',
              transition: 'border-color 0.2s, color 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.color = 'var(--purple)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-3)'; e.currentTarget.style.color = 'var(--black)' }}
          >
            Ver casos de éxito
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: 'flex', gap: 32, marginTop: 16 }}>
          {[
            { num: '+2.400', label: 'casos resueltos' },
            { num: '18 años', label: 'de experiencia' },
            { num: '97%', label: 'satisfacción' },
          ].map((stat) => (
            <div key={stat.label} style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--black)' }}>{stat.num}</span>
              <span style={{ fontSize: 12, color: 'var(--grey-4)', fontWeight: 500 }}>{stat.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — image grid, fills full column height */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          padding: '32px 48px 32px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          minHeight: 0,
        }}
      >
        {/* Main image — takes 60% of column */}
        <div style={{ position: 'relative', flex: '6', minHeight: 0 }}>
          <img
            src={digital}
            alt="Equipo SOS Jurídico"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 12, display: 'block' }}
          />
          <span style={{
            position: 'absolute', bottom: 14, left: 14,
            background: 'var(--white)', padding: '7px 13px', borderRadius: 6,
            fontSize: 13, fontWeight: 700, color: 'var(--purple)',
            boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
          }}>
            ⚡ Respuesta en 24h
          </span>
        </div>

        {/* Small images row — takes 40% of column */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, flex: '4', minHeight: 0 }}>
          <img
            src={jutsicia}
            alt="Justicia"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }}
          />
          <img
            src={mace}
            alt="Consulta legal"
            style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 8, display: 'block' }}
          />
        </div>
      </div>
    </section>
  )
}
