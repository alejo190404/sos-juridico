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
  '601 300 2555 / +57 316 626 8583',
  'asuntoslegales@sosjuridico.com',
  'Cra 13A # 28-38, Of. 257 · Bogotá D.C.',
]

const SOCIALS = [
  {
    label: 'Instagram',
    url: 'https://www.instagram.com/sosjuridicoabogados/?hl=es',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
      </svg>
    ),
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/sos.juridico',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
]

export default function FooterSection() {
  return (
    <footer id="footer" className="site-footer">
      <div className="wrap footer-main">
        <div>
          <img src={logo} alt="SOS Jurídico" className="footer-logo" />
          <p className="muted" style={{ maxWidth: '40ch' }}>
            Servicio Jurídico Oportuno y Seguro.<br />Tu aliado legal en la era digital.
          </p>
          <div className="socials">
            {SOCIALS.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" title={s.label} aria-label={s.label} className="social">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4>Navegación</h4>
          <ul>
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <button onClick={() => scrollTo(link.section)} className="footer-link">{link.label}</button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Contacto</h4>
          <ul>
            {CONTACT_ITEMS.map((item) => (
              <li key={item} className="footer-link" style={{ cursor: 'default' }}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="wrap">
          <span>© {new Date().getFullYear()} SOS Jurídico. Todos los derechos reservados.</span>
          <a href="#">Política de privacidad</a>
          <span>www.sosjuridico.com</span>
        </div>
      </div>
    </footer>
  )
}
