import { useEffect, useRef, useState } from 'react'
import CasosSection from '../components/sos/CasosSection.jsx'
import ContactoSection from '../components/sos/ContactoSection.jsx'
import FooterSection from '../components/sos/FooterSection.jsx'
import HeroSection from '../components/sos/HeroSection.jsx'
import NoticiasSection from '../components/sos/NoticiasSection.jsx'
import QuoteSection from '../components/sos/QuoteSection.jsx'
import StickyNav from '../components/sos/StickyNav.jsx'
import Chatbot from '../components/sos/Chatbot.jsx'

const SECTION_IDS = ['hero', 'casos', 'noticias', 'contacto', 'footer']

export default function LandingPage() {
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.3 }
    )

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div ref={containerRef}>
      <StickyNav />
      <HeroSection />
      <CasosSection />
      <NoticiasSection />
      <QuoteSection />
      <ContactoSection />
      <FooterSection />
      <Chatbot />
      {/* <NavDots activeSection={activeSection} /> */}
    </div>
  )
}
