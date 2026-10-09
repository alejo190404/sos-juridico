import CasosSection from '../components/sos/CasosSection.jsx'
import Chatbot from '../components/sos/Chatbot.jsx'
import ContactoSection from '../components/sos/ContactoSection.jsx'
import FooterSection from '../components/sos/FooterSection.jsx'
import HeroSection from '../components/sos/HeroSection.jsx'
import NoticiasSection from '../components/sos/NoticiasSection.jsx'
import QuoteSection from '../components/sos/QuoteSection.jsx'
import StickyNav from '../components/sos/StickyNav.jsx'

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
