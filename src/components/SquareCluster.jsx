export default function SquareCluster({
  size = 16,
  gap = 4,
  purpleIndex = 5,
  squareColor = '#DCDCDC',
  className = '',
}) {
  const squares = Array.from({ length: 16 }, (_, i) => i)
  const total = size + gap

  return (
    <div className={`absolute pointer-events-none ${className}`} style={{ width: total * 4 - gap, height: total * 4 - gap }}>
      {squares.map((i) => {
        const row = Math.floor(i / 4)
        const col = i % 4
        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              left: col * total,
              top: row * total,
              width: size,
              height: size,
              backgroundColor: i === purpleIndex ? '#7e397e' : squareColor,
              opacity: i === purpleIndex ? 1 : 0.6,
            }}
          />
        )
      })}
    </div>
  )
}
