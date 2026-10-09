import { useEffect, useRef, useState } from 'react'
import { getCasos } from '../../lib/sos.functions'
import SectionHead from './SectionHead.jsx'

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
    <section id="casos" className="block">
      <div className="wrap">
        <div className="casos-head">
          <SectionHead refCode="01" eyebrow="Casos de éxito" title="Clientes reales. Resultados reales." />
          {n > 1 && (
            <div className="carousel-nav">
              <button type="button" className="btn ghost no-lead" onClick={prev} aria-label="Anterior">
                <span className="arr">←</span>
              </button>
              <button type="button" className="btn no-lead" onClick={next} aria-label="Siguiente">
                <span className="arr">→</span>
              </button>
            </div>
          )}
        </div>

        <div className="case-viewport">
          <div
            className="case-track"
            style={{ '--i': index, transition: animate ? undefined : 'none' }}
          >
            {slides.map((c, i) => (
              <article key={`${c.slug}-${i}`} className="case">
                <div className="rail" aria-hidden="true" />
                <div className="body">
                  {c.tag && <span className="badge ok">{c.tag}</span>}
                  <h3>{c.headline}</h3>
                  <span className="who">{c.client}</span>
                  <p>{c.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
