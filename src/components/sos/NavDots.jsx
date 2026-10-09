import { useState } from 'react'

const sections = [
  { id: 'hero', label: 'Inicio' },
  { id: 'casos', label: 'Casos' },
  { id: 'noticias', label: 'Noticias' },
  { id: 'contacto', label: 'Contacto' },
  { id: 'footer', label: 'Información' },
]

export default function NavDots({ activeSection }) {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const scrollTo = (id) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ position: 'fixed', right: 20, top: '50%', transform: 'translateY(-50%)', zIndex: 50, display: 'flex', flexDirection: 'column', gap: 10 }}>
      {sections.map((s, i) => (
        <div key={s.id} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {hoveredIndex === i && (
            <span
              style={{
                position: 'absolute',
                right: 22,
                background: 'var(--black)',
                color: 'white',
                fontSize: 11,
                fontWeight: 600,
                padding: '4px 8px',
                borderRadius: 4,
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
              }}
            >
              {s.label}
            </span>
          )}
          <button
            onClick={() => scrollTo(s.id)}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            aria-label={s.label}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              border: `2px solid ${activeSection === s.id ? 'var(--purple)' : 'var(--grey-3)'}`,
              background: activeSection === s.id ? 'var(--purple)' : 'transparent',
              cursor: 'pointer',
              transition: 'all 0.2s',
              transform: activeSection === s.id ? 'scale(1.3)' : 'scale(1)',
              padding: 0,
            }}
          />
        </div>
      ))}
    </div>
  )
}
