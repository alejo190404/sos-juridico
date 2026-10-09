import { useEffect, useState } from 'react'
import { Link, useParams } from '@tanstack/react-router'
import StickyNav from '../components/sos/StickyNav.jsx'
import { getNoticia } from '@/lib/sos.functions'

const SECTION_BACK = {
  casos: '#casos',
  noticias: '#noticias',
  equipo: '#equipo',
}

const FALLBACK_IMAGE = 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1200&auto=format&fit=crop'

function formatDate(dateStr) {
  if (!dateStr) return null
  const d = new Date(dateStr)
  const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC']
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function DetailPage({ section }) {
  const { slug } = useParams({ strict: false })
  const [noticia, setNoticia] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!slug) return
    async function fetchNoticia() {
      try {
        const data = await getNoticia({ data: { id: slug } })
        if (!data) throw new Error('Noticia no encontrada')
        setNoticia(data)
      } catch {
        setError('No se pudo cargar la noticia.')
      } finally {
        setLoading(false)
      }
    }
    fetchNoticia()
  }, [slug])

  const heroImage = noticia?.imagen_url || FALLBACK_IMAGE
  const title = noticia?.titulo || ''
  const date = formatDate(noticia?.created_at)

  return (
    <>
      <StickyNav />

      {/* Hero banner */}
      <header className="detail-hero">
        <img src={heroImage} alt="" />
        <div className="wrap">
          {(noticia?.tipo || section) && (
            <p className="eyebrow">
              {section?.toUpperCase()}{noticia?.tipo ? ` / ${noticia.tipo.toUpperCase()}` : ''}
            </p>
          )}
          {loading ? (
            <div className="skeleton" style={{ height: 44, width: 'min(420px, 80%)', margin: 'var(--s3) 0' }} />
          ) : (
            <h1>{title}</h1>
          )}
          {date && <p className="mono muted" style={{ fontSize: 12, letterSpacing: '.06em' }}>{date}</p>}
        </div>
      </header>

      {/* Content body + back button */}
      <main className="detail-body">
        <div className="wrap">
          <div style={{ paddingLeft: 22 }}>
            <Link to="/" className="btn ghost">
              <span className="arr">←</span> Volver
            </Link>
          </div>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 'var(--s6)' }}>
              <div className="skeleton" style={{ height: 20, width: '100%' }} />
              <div className="skeleton" style={{ height: 20, width: '83%' }} />
              <div className="skeleton" style={{ height: 20, width: '80%' }} />
              <div className="skeleton" style={{ height: 20, width: '100%', marginTop: 16 }} />
              <div className="skeleton" style={{ height: 20, width: '75%' }} />
            </div>
          )}
          {error && <p className="panel muted" style={{ marginTop: 'var(--s6)' }}>{error}</p>}
          {!loading && !error && noticia && (
            <article className="article-sheet">
              {noticia.entradilla && <p className="lede">{noticia.entradilla}</p>}
              {noticia.cuerpo && (
                <div className="prose-body" dangerouslySetInnerHTML={{ __html: noticia.cuerpo }} />
              )}
            </article>
          )}
        </div>
      </main>
    </>
  )
}
