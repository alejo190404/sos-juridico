import { useNavigate } from 'react-router-dom'

const cases = [
  {
    slug: 'recuperacion-indemnizacion-laboral',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop',
    tag: 'DERECHO LABORAL',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración.',
  },
  {
    slug: 'disputa-propiedad-comercial',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    tag: 'PROPIEDAD',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración. ',
  },
  {
    slug: 'fusión-corporativa-exitosa',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop',
    tag: 'CORPORATIVO',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración. ',
  },
]

export default function CasosSection() {
  const navigate = useNavigate()

  return (
    <section
      id="casos"
      className="section-pad"
      style={{ background: 'var(--white)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Geometric decorators */}
      <div style={{ position: 'absolute', top: -40, right: -40, width: 200, height: 200, background: 'var(--grey-2)', transform: 'rotate(12deg)', borderRadius: 8, opacity: 0.4, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -30, left: -30, width: 140, height: 140, background: 'var(--purple-dim)', transform: 'rotate(-8deg)', borderRadius: 6, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 8 }}>
            Casos de éxito
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, lineHeight: 1.15 }}>
            Clientes reales.<br />Resultados reales.
          </h2>
        </div>
      </div>

      {/* Cards */}
      <div className="grid-3">
        {cases.map((c) => (
          <div
            key={c.slug}
            style={{
              background: 'var(--grey-0)',
              borderRadius: 16,
              padding: 32,
              position: 'relative',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              gap: 16,
              cursor: 'pointer',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)' }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)' }}
          >
            <div style={{ position: 'absolute', right: -30, bottom: -30, width: 120, height: 120, background: 'var(--grey-2)', transform: 'rotate(12deg)', borderRadius: 6, pointerEvents: 'none' }} />

            <span style={{
              display: 'inline-block',
              background: 'var(--purple)',
              color: 'white',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              padding: '5px 12px',
              borderRadius: 4,
              alignSelf: 'flex-start',
              position: 'relative',
            }}>
              ✓ {c.tag}
            </span>

            <p style={{ fontSize: 12, color: 'var(--grey-4)', fontWeight: 500, position: 'relative' }}>{c.client}</p>
            <h3 style={{ fontSize: 'clamp(17px, 2vw, 20px)', fontWeight: 700, lineHeight: 1.3, position: 'relative' }}>{c.headline}</h3>
            <p style={{ fontSize: 14, color: 'var(--grey-4)', lineHeight: 1.6, position: 'relative' }}>{c.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
