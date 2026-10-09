import { useState } from 'react'
import { useLocation, useNavigate } from '@tanstack/react-router'
import logo from '../../assets/logo.png'

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
      navigate({ to: '/' })
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
      navigate({ to: '/' })
    }
  }

  return (
    <>
      <nav className="sticky-nav">
        <button onClick={handleLogoClick} className="nav-logo-btn" aria-label="Inicio">
          <img src={logo} alt="SOS Jurídico" style={{ height: 52, width: 'auto' }} />
        </button>

        <ul className="nav-links-desktop">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <button onClick={() => handleNavClick(link.id)} className="nav-link-btn">
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        <button onClick={() => handleNavClick('contacto')} className="nav-cta-btn nav-cta-desktop">
          Consulta gratis →
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

      {menuOpen && (
        <div className="mobile-menu" role="dialog" aria-label="Menú de navegación">
          {NAV_LINKS.map((link) => (
            <button key={link.label} onClick={() => handleNavClick(link.id)} className="mobile-nav-link">
              {link.label}
            </button>
          ))}
          <button onClick={() => handleNavClick('contacto')} className="nav-cta-btn mobile-cta-btn">
            Consulta gratis →
          </button>
        </div>
      )}
    </>
  )
}
