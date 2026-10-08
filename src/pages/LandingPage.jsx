import CasosSection from '../components/CasosSection.jsx'
import Chatbot from '../components/Chatbot.jsx'
import ContactoSection from '../components/ContactoSection.jsx'
import FooterSection from '../components/FooterSection.jsx'
import HeroSection from '../components/HeroSection.jsx'
import NoticiasSection from '../components/NoticiasSection.jsx'
import QuoteSection from '../components/QuoteSection.jsx'
import StickyNav from '../components/StickyNav.jsx'

export default function LandingPage() {
  return (
    <>
      <StickyNav />
      <main>
        <HeroSection />
        <CasosSection />
        <NoticiasSection />
        <QuoteSection />
        <ContactoSection />
      </main>
      <FooterSection />
      <Chatbot />
    </>
  )
}
