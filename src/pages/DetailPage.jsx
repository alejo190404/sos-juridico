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
    <div className="min-h-screen bg-white font-montserrat">
      <StickyNav />

      {/* Hero banner */}
      <div className="detail-hero">
        <img
          src={heroImage}
          alt={title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-sos-purple" style={{ opacity: 0.6 }} />
        <div className="relative z-10 pt-16">
          {(noticia?.tipo || section) && (
            <p className="font-montserrat font-bold uppercase text-white text-xs tracking-widest opacity-70 mb-2">
              {section?.toUpperCase()}{noticia?.tipo ? ` / ${noticia.tipo.toUpperCase()}` : ''}
            </p>
          )}
          {loading ? (
            <div className="skeleton rounded h-10 w-64" />
          ) : (
            <h1
              className="font-montserrat font-black uppercase text-white leading-tight"
              style={{ fontSize: 'clamp(22px, 4vw, 52px)' }}
            >
              {title}
            </h1>
          )}
          {date && (
            <p className="font-montserrat text-white text-xs mt-2 opacity-80">{date}</p>
          )}
        </div>
      </div>

      {/* Content body + back button */}
      <div className="detail-body">
        <div style={{ maxWidth: 768, margin: '0 auto' }}>
          <Link
            to="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              background: 'transparent',
              color: 'var(--purple)',
              border: '1.5px solid var(--grey-2)',
              padding: '12px 20px',
              borderRadius: 6,
              fontSize: '0.95rem',
              fontWeight: 600,
              textDecoration: 'none',
              marginBottom: 40,
              transition: 'border-color 0.2s, color 0.2s',
              fontFamily: 'inherit',
              minHeight: 44,
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--purple)'; e.currentTarget.style.background = 'var(--purple-dim)' }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--grey-2)'; e.currentTarget.style.background = 'transparent' }}
          >
            ← Volver
          </Link>

          {loading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div className="skeleton" style={{ height: 20, width: '100%' }} />
              <div className="skeleton" style={{ height: 20, width: '83%' }} />
              <div className="skeleton" style={{ height: 20, width: '80%' }} />
              <div className="skeleton" style={{ height: 20, width: '100%', marginTop: 16 }} />
              <div className="skeleton" style={{ height: 20, width: '75%' }} />
            </div>
          )}
          {error && (
            <p style={{ color: 'var(--grey-4)', fontSize: 16, background: 'var(--white)', padding: 24, borderRadius: 8 }}>
              {error}
            </p>
          )}
          {!loading && !error && noticia && (
            <>
              {noticia.entradilla && (
                <p style={{ fontWeight: 700, fontSize: 'clamp(16px, 2vw, 18px)', lineHeight: 1.7, color: 'var(--grey-5)', marginBottom: 24 }}>
                  {noticia.entradilla}
                </p>
              )}
              {noticia.cuerpo && (
                <div
                  style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--grey-4)' }}
                  className="prose max-w-none"
                  dangerouslySetInnerHTML={{ __html: noticia.cuerpo }}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
