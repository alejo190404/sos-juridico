export default function QuoteSection() {
  return (
    <section id="quote" className="quote-section">
      {/* Geometric corner shapes */}
      <div style={{ position: 'absolute', top: -60, right: -60, width: 220, height: 220, background: 'rgba(255,255,255,0.07)', transform: 'rotate(20deg)', borderRadius: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', top: 40, right: 40, width: 100, height: 100, background: 'rgba(255,255,255,0.05)', transform: 'rotate(12deg)', borderRadius: 6, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: -40, left: -40, width: 260, height: 260, background: 'rgba(255,255,255,0.06)', transform: 'rotate(-15deg)', borderRadius: 10, pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: 60, left: 60, width: 110, height: 110, background: 'rgba(255,255,255,0.04)', transform: 'rotate(-8deg)', borderRadius: 6, pointerEvents: 'none' }} />

      <div style={{
        fontSize: 72,
        lineHeight: 0.8,
        color: 'rgba(255,255,255,0.25)',
        fontFamily: "'Young Serif', serif",
        marginBottom: 40,
        letterSpacing: -4,
        userSelect: 'none',
      }}>
        "
      </div>

      <p style={{
        fontSize: 'clamp(18px, 2.4vw, 34px)',
        fontWeight: 700,
        color: 'white',
        lineHeight: 1.5,
        maxWidth: 860,
        margin: '0 0 36px',
      }}>
        Gracias a Yeimy y SOS Jurídico, pudimos recuperar el control sobre la administración de nuestra organización sin ánimo de lucro. Hoy, aportamos a la comunidad de Ciudad Salitre Oriental de manera integral
      </p>

      <p style={{
        fontSize: 'clamp(14px, 1.5vw, 16px)',
        color: 'rgba(255,255,255,0.65)',
        fontWeight: 500,
        letterSpacing: 0.3,
      }}>
        — Nury Amortegui, Miembro Concejo Directivo · Asobel
      </p>
    </section>
  )
}
