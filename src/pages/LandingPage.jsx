import { useEffect, useRef, useState } from 'react'
import CasosSection from '../components/CasosSection.jsx'
import ContactoSection from '../components/ContactoSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import NoticiasSection from '../components/NoticiasSection.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import StickyNav from '../components/StickyNav.jsx'
import Chatbot from '../components/Chatbot.jsx'

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
