import { useEffect, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
import { getNoticias } from '@/lib/sos.functions'
import SectionHead from './SectionHead.jsx'

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
    <div className={`news-card${wide ? ' news-first-card' : ''}`} style={{ cursor: 'default' }}>
      <div className="skeleton" style={{ width: '100%', aspectRatio: wide ? '21/9' : '16/9', borderRadius: 0 }} />
      <div className="body">
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
        const data = await getNoticias()
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
    <section id="noticias" className="block">
      <div className="wrap">
        <SectionHead refCode="02" eyebrow="Actualidad jurídica" title="Noticias Jurídicas">
          Lo que necesitas saber para protegerte.
        </SectionHead>

        {loading && (
          <div className="grid-noticias">
            <SkeletonCard wide />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        )}

        {error && <div className="panel muted">{error}</div>}

        {!loading && !error && (
          <div className="grid-noticias">
            {news.map((item, idx) => {
              const imgSrc = item.imagen_url ||
                CATEGORY_IMAGES[(item.category || '').toLowerCase()] ||
                CATEGORY_IMAGES.default
              const isFirst = idx === 0

              return (
                <button
                  key={item.title || item.id}
                  type="button"
                  className={`news-card${isFirst ? ' news-first-card' : ''}`}
                  onClick={() => navigate({ to: `/noticias/${item.id}` })}
                >
                  <div className="news-img" style={{ aspectRatio: isFirst ? '21/9' : '16/9' }}>
                    <img src={imgSrc} alt={item.tipo || ''} />
                  </div>
                  <div className="body">
                    {item.tipo && <span className="badge">{item.tipo}</span>}
                    <h3>{item.titulo}</h3>
                    {item.published_at && <p className="date">{formatDate(item.published_at)}</p>}
                  </div>
                </button>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
