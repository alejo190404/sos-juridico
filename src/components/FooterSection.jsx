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
  { icon: '📞', label: '601 300 2555 / +57 310 280 4025' },
  { icon: '✉️', label: 'contactosjuridico@gmail.com' },
  { icon: '📍', label: 'Cra 13A # 28-38, Of. 257 · Bogotá D.C.' },
]

export default function FooterSection() {
  return (
    <footer
      id="footer"
      style={{
        height: '100vh',
        background: 'var(--black)',
        color: 'rgba(255,255,255,0.5)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        /* paddingTop pushes content below the fixed 80px nav */
        paddingTop: 80,
      }}
    >
      {/* Geometric decorators */}
      <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, background: 'rgba(126,57,126,0.12)', transform: 'rotate(15deg)', borderRadius: 12, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -80, left: -60, width: 300, height: 300, background: 'rgba(126,57,126,0.08)', transform: 'rotate(-12deg)', borderRadius: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: '40%', left: '45%', width: 180, height: 180, background: 'rgba(126,57,126,0.05)', transform: 'rotate(20deg)', borderRadius: 8, pointerEvents: 'none' }} />

      {/* Main content — evenly distributed in remaining height */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          alignItems: 'center',
          textAlign: 'center',
          padding: '0 64px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <img
          src={logo}
          alt="SOS Jurídico"
          style={{ height: 130, width: 'auto', filter: 'brightness(0) invert(1)' }}
        />

        {/* Tagline */}
        <p style={{ fontSize: 18, lineHeight: 1.7, maxWidth: 520, color: 'rgba(255,255,255,0.6)', margin: 0 }}>
          Servicio Jurídico Oportuno y Seguro.<br />Tu aliado legal en la era digital.
        </p>

        {/* Contact items */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
          {CONTACT_ITEMS.map((item) => (
            <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 42, height: 42,
                background: 'rgba(126,57,126,0.3)',
                border: '1px solid rgba(126,57,126,0.5)',
                borderRadius: 8,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 17, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <span style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Nav links + socials */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
          <ul style={{ display: 'flex', gap: 40, listStyle: 'none', padding: 0, margin: 0, flexWrap: 'wrap', justifyContent: 'center' }}>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button
                  onClick={() => scrollTo(link.section)}
                  style={{
                    background: 'none', border: 'none', cursor: 'pointer',
                    color: 'rgba(255,255,255,0.5)', fontSize: 16, fontFamily: 'inherit',
                    fontWeight: 500, padding: 0, transition: 'color 0.2s',
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
            {[{ icon: '𝕏', label: 'Twitter' }, { icon: 'in', label: 'LinkedIn' }].map((s) => (
              <div
                key={s.label}
                title={s.label}
                style={{
                  width: 46, height: 46,
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.12)',
                  borderRadius: 10,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'rgba(255,255,255,0.6)',
                  fontSize: 15, fontWeight: 700,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.12)')}
                onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.06)')}
              >
                {s.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '20px 64px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          zIndex: 1,
          flexShrink: 0,
        }}
      >
        <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} SOS Jurídico. Todos los derechos reservados.</p>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Política de privacidad', 'Términos de uso', 'Habeas Data'].map((item) => (
            <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 13, transition: 'color 0.2s' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'white')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
            >
              {item}
            </a>
          ))}
        </div>
        <p style={{ fontSize: 13 }}>www.sosjuridico.org</p>
      </div>
    </footer>
  )
}
