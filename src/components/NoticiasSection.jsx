import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase.js'

const CATEGORY_IMAGES = {
  laboral: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=400&auto=format&fit=crop',
  corporativo: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=400&auto=format&fit=crop',
  penal: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=400&auto=format&fit=crop',
  default: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&auto=format&fit=crop',
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

function SkeletonCard({ wide }) {
  return (
    <div
      className={wide ? 'news-first-card' : ''}
      style={{ background: 'var(--white)', borderRadius: 12, overflow: 'hidden' }}
    >
      <div className="skeleton" style={{ width: '100%', aspectRatio: wide ? '21/9' : '16/9' }} />
      <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div className="skeleton" style={{ height: 20, width: 80 }} />
        <div className="skeleton" style={{ height: 22, width: '90%' }} />
        <div className="skeleton" style={{ height: 16, width: 100 }} />
      </div>
    </div>
  )
}

export default function NoticiasSection() {
  const [news, setNews] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchNews() {
      try {
        const { data, error: err } = await supabase
          .from('noticia')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(4)
        if (err) throw err
        setNews(data || [])
      } catch (e) {
        setError('No se pudieron cargar las noticias en este momento.')
      } finally {
        setLoading(false)
      }
    }
    fetchNews()
  }, [])

  return (
    <section
      id="noticias"
      className="section-pad"
      style={{ background: 'var(--grey-1)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Geometric decorators */}
      <div style={{ position: 'absolute', top: -80, left: -80, width: 320, height: 320, background: 'var(--grey-2)', transform: 'rotate(15deg)', borderRadius: 8, opacity: 0.5, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -60, right: -60, width: 200, height: 200, background: 'var(--purple-dim)', transform: 'rotate(-10deg)', borderRadius: 6, pointerEvents: 'none' }} />

      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, position: 'relative', zIndex: 1 }}>
        <div>
          <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 8 }}>
            Actualidad jurídica
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 3vw, 42px)', fontWeight: 800, lineHeight: 1.15 }}>
            Noticias Jurídicas
          </h2>
          <p style={{ fontSize: 16, color: 'var(--grey-4)', marginTop: 8 }}>
            Lo que necesitas saber para protegerte.
          </p>
        </div>
      </div>

      {loading && (
        <div className="grid-noticias">
          <SkeletonCard wide />
          <SkeletonCard />
          <SkeletonCard />
        </div>
      )}

      {error && (
        <div style={{ background: 'var(--white)', padding: 24, borderRadius: 12, color: 'var(--grey-5)', position: 'relative', zIndex: 1 }}>
          {error}
        </div>
      )}

      {!loading && !error && (
        <div className="grid-noticias">
          {news.map((item, idx) => {
            const imgSrc = item.imagen_url ||
              CATEGORY_IMAGES[(item.category || '').toLowerCase()] ||
              CATEGORY_IMAGES.default
            const isFirst = idx === 0

            return (
              <div
                key={item.title || item.id}
                className={isFirst ? 'news-first-card' : ''}
                onClick={() => navigate(`/noticias/${item.id}`)}
                style={{
                  background: 'var(--white)',
                  borderRadius: 12,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'transform 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.1)' }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}
              >
                <img
                  src={imgSrc}
                  alt={item.tipo}
                  style={{
                    width: '100%',
                    aspectRatio: isFirst ? '21/9' : '16/9',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
                <div style={{ padding: 24 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    {item.tipo && (
                      <span style={{
                        display: 'inline-block',
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 1,
                        textTransform: 'uppercase',
                        color: 'var(--purple)',
                        background: 'var(--purple-dim)',
                        padding: '4px 10px',
                        borderRadius: 4,
                      }}>
                        {item.tipo}
                      </span>
                    )}
                  </div>
                  <h3 style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.3,
                    marginBottom: 8,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}>
                    {item.titulo}
                  </h3>
                  {item.published_at && (
                    <p style={{ fontSize: 12, color: 'var(--grey-4)' }}>{formatDate(item.published_at)}</p>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </section>
  )
}
