export default function Logo({ inverted = false }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <span style={{
        fontWeight: 800,
        fontSize: 24,
        letterSpacing: '-1px',
        color: inverted ? 'var(--purple-light, #A855A8)' : 'var(--purple)',
        fontFamily: 'inherit',
      }}>
        SOS
      </span>
      <span style={{
        fontSize: 13,
        fontWeight: 500,
        color: inverted ? 'rgba(255,255,255,0.5)' : 'var(--grey-4)',
        fontFamily: 'inherit',
      }}>
        Jurídico
      </span>
    </div>
  )
}
