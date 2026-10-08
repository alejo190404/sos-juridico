export default function SectionHead({ refCode, eyebrow, title, children }) {
  return (
    <div className="sec-head">
      <div className="ref">{refCode}</div>
      <div>
        {eyebrow && <p className="eyebrow" style={{ marginBottom: 'var(--s3)' }}>{eyebrow}</p>}
        <h2>{title}</h2>
        {children && <p>{children}</p>}
      </div>
    </div>
  )
}
