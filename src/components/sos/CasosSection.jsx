import { useEffect, useRef, useState } from 'react'
import { getCasos } from '../../lib/sos.functions'

const GAP = 24

export default function CasosSection() {
  const [cases, setCases] = useState([])
  const [index, setIndex] = useState(0)
  const [animate, setAnimate] = useState(true)
  const timerRef = useRef(null)

  useEffect(() => {
    getCasos()
      .then((data) => setCases(data ?? []))
      .catch(() => setCases([]))
  }, [])

  const n = cases.length
  // Triple the list so the loop is seamless in both directions.
  const slides = n > 0 ? [...cases, ...cases, ...cases] : []

  const goTo = (next) => {
    setAnimate(true)
    setIndex(next)
  }

  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  // Seamless wrap: after sliding past an edge clone, jump back without animation.
  useEffect(() => {
    if (n === 0) return
    if (index >= n || index < 0) {
      const t = setTimeout(() => {
        setAnimate(false)
        setIndex(((index % n) + n) % n)
      }, 520)
      return () => clearTimeout(t)
    }
  }, [index, n])

  // Auto-advance (infinite).
  useEffect(() => {
    if (n <= 1) return
    timerRef.current = setInterval(() => {
      setAnimate(true)
      setIndex((i) => i + 1)
    }, 4000)
    return () => clearInterval(timerRef.current)
  }, [n])

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

        {n > 1 && (
          <div style={{ display: 'flex', gap: 12 }}>
            <button
              onClick={prev}
              aria-label="Anterior"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '1px solid var(--grey-2)', background: 'var(--white)',
                color: 'var(--purple)', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              ←
            </button>
            <button
              onClick={next}
              aria-label="Siguiente"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: 'none', background: 'var(--purple)',
                color: 'white', fontSize: 18, cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Carousel */}
      <div style={{ overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <div
          style={{
            display: 'flex',
            gap: GAP,
            transform: `translateX(calc(-${index} * ((100% - ${2 * GAP}px) / 3 + ${GAP}px)))`,
            transition: animate ? 'transform 0.5s ease' : 'none',
          }}
        >
          {slides.map((c, i) => (
            <div
              key={`${c.slug}-${i}`}
              style={{
                flex: `0 0 calc((100% - ${2 * GAP}px) / 3)`,
                minWidth: 0,
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
      </div>
    </section>
  )
}
