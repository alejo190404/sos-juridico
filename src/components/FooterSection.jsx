import logo from '../assets/logo.png'

const scrollTo = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
}

const NAV_LINKS = [
  { label: 'Servicios', section: 'casos' },
  { label: 'Noticias', section: 'noticias' },
  { label: 'Contacto', section: 'contacto' },
]

const CONTACT_ITEMS = [
  { icon: '📞', label: '601 300 2555 / +57 316 626 8583' },
  { icon: '✉️', label: 'asuntoslegales@sosjuridico.com' },
  { icon: '📍', label: 'Cra 13A # 28-38, Of. 257 · Bogotá D.C.' },
]

export default function FooterSection() {
  return (
    <footer id="footer" className="footer-root">
      {/* Geometric decorators */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'rgba(126,57,126,0.12)', transform: 'rotate(15deg)', borderRadius: 12, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 300, height: 300, background: 'rgba(126,57,126,0.08)', transform: 'rotate(-12deg)', borderRadius: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '45%', width: 180, height: 180, background: 'rgba(126,57,126,0.05)', transform: 'rotate(20deg)', borderRadius: 8, pointerEvents: 'none' }} />

      <div className="footer-main-content">
        <img
          src={logo}
          alt="SOS Jurídico"
          style={{ height: 'clamp(80px, 12vw, 130px)', width: 'auto', filter: 'brightness(0) invert(1)' }}
        />

        <p style={{ fontSize: 'clamp(15px, 2vw, 18px)', lineHeight: 1.7, maxWidth: 520, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Servicio Jurídico Oportuno y Seguro.<br />Tu aliado legal en la era digital.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44,
                background: 'rgba(126,57,126,0.3)',
                border: '1px solid rgba(126,57,126,0.5)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 'clamp(13px, 2vw, 16px)', color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <ul style={{ display: 'flex', gap: 32, listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.section)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)', fontSize: 16, fontFamily: 'inherit',
                    fontWeight: 500, padding: '8px 4px', transition: 'color 0.2s', minHeight: 44,
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}
                >
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <div style={{ display: 'flex', gap: 12 }}>
            {[
              {
                label: 'Instagram',
                url: 'https://www.instagram.com/sosjuridicoabogados/?hl=es',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                )
              },
              {
                label: 'Facebook',
                url: 'https://www.facebook.com/sos.juridico',
                icon: (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                )
              }
            ].map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={s.label}
                style={{
                  width: 46,
                  height: 46,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  textDecoration: 'none'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.12)';
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.06)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.6)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom-bar">
        <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} SOS Jurídico. Todos los derechos reservados.</p>
        <div className="footer-legal-links">
          {['Política de privacidad'].map((item) => (
            <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {item}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 13 }}>www.sosjuridico.com</p>
      </div>
    </footer>
  )
}
