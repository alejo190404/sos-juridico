import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Logo from './Logo.jsx'

const NAV_LINKS = [
  { label: 'Servicios', id: 'casos' },
  { label: 'Noticias', id: 'noticias' },
  { label: 'Casos de éxito', id: 'casos' },
  { label: 'Contacto', id: 'contacto' },
]

export default function StickyNav() {
  const location = useLocation()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNavClick = (sectionId) => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      const el = document.getElementById(sectionId)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate('/')
      setTimeout(() => {
        const el = document.getElementById(sectionId)
        if (el) el.scrollIntoView({ behavior: 'smooth' })
      }, 300)
    }
  }

  const handleLogoClick = () => {
    setMenuOpen(false)
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      navigate('/')
    }
  }

  return (
    <>
      <header className="topbar">
        <nav className="wrap" aria-label="Principal">
          <button onClick={handleLogoClick} className="brand" aria-label="SOS Jurídico, inicio">
            <Logo />
          </button>

          <ul className="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button onClick={() => handleNavClick(link.id)} className="nav-link">
                  {link.label}
                </button>
              </li>
            ))}
          </ul>

          <button onClick={() => handleNavClick('contacto')} className="btn nav-cta">
            Consulta gratis <span className="arr">→</span>
          </button>

          <button
            onClick={() => setMenuOpen((o) => !o)}
            className={`hamburger-btn${menuOpen ? ' open' : ''}`}
            aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </header>

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menú de navegación">
          {NAV_LINKS.map((link) => (
            <button key={link.label} onClick={() => handleNavClick(link.id)} className="mobile-nav-link">
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNavClick('contacto')} className="btn">
            Consulta gratis <span className="arr">→</span>
          </button>
        </div>
      )}
    </>
  )
}
