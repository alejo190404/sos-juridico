import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../assets/logo.png'

export default function StickyNav() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleNavClick = (sectionId) => {
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      // Navigate to home, then scroll after the page mounts
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 48px',
        height: 80,
        background: 'rgba(254,254,254,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--grey-2)',
      }}
    >
      {/* Logo — always goes to home */}
      <button
        onClick={handleLogoClick}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img src={logo} alt="SOS Jurídico" style={{ height: 52, width: 'auto' }} />
      </button>

      {/* Nav links */}
      <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
        {[
          { label: 'Servicios', id: 'casos' },
          { label: 'Noticias', id: 'noticias' },
          { label: 'Casos de éxito', id: 'casos' },
          { label: 'Contacto', id: 'contacto' },
        ].map((link) => (
          <li key={link.label}>
            <button
              onClick={() => handleNavClick(link.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--grey-4)',
                fontSize: 15,
                fontWeight: 500,
                fontFamily: 'inherit',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--black)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--grey-4)')}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <button
        onClick={() => handleNavClick('contacto')}
        style={{
          background: 'var(--purple)',
          color: 'white',
          border: 'none',
          padding: '12px 26px',
          borderRadius: 6,
          fontSize: 15,
          fontWeight: 600,
          cursor: 'pointer',
          fontFamily: 'inherit',
          transition: 'background 0.2s',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--purple-light)')}
        onMouseLeave={(e) => (e.currentTarget.style.background = 'var(--purple)')}
      >
        Consulta gratis →
      </button>
    </nav>
  )
}
