// SOS Jurídico mark, Circuito edition: each S is a 45° trace ending in square
// pads (the dots of the original logo); the O is the plum node ring.
function S({ x = 0 }) {
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M24 7H9L5 11V15L9 19H23L27 23V29L23 33H8" fill="none" stroke="var(--bone)" strokeWidth="3.5" />
      <rect x="24" y="4.5" width="5" height="5" fill="var(--bone)" />
      <rect x="3" y="30.5" width="5" height="5" fill="var(--bone)" />
    </g>
  )
}

function Contacts() {
  return (
    <g fill="var(--signal)" style={{ filter: 'drop-shadow(0 0 2px var(--signal))' }}>
      <circle cx="50" cy="6" r="1.6" /><circle cx="64" cy="20" r="1.6" /><circle cx="50" cy="34" r="1.6" /><circle cx="36" cy="20" r="1.6" />
    </g>
  )
}

export default function Logo({ height = 30 }) {
  return (
    <span className="logo">
      <svg viewBox="0 0 100 40" height={height} aria-hidden="true">
        <S />
        <circle cx="50" cy="20" r="14" fill="none" stroke="var(--plum)" strokeWidth="3.5" />
        <Contacts />
        <circle cx="50" cy="20" r="4" fill="var(--spark)" style={{ filter: 'drop-shadow(0 0 3px var(--signal))' }} />
        <S x={70} />
      </svg>
      <em>Jurídico</em>
    </span>
  )
}
