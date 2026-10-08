import SectionHead from './SectionHead.jsx'

const cases = [
  {
    slug: 'recuperacion-indemnizacion-laboral',
    image: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?w=600&auto=format&fit=crop',
    tag: 'DERECHO LABORAL',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración.',
  },
  {
    slug: 'disputa-propiedad-comercial',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&auto=format&fit=crop',
    tag: 'PROPIEDAD',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración. ',
  },
  {
    slug: 'fusión-corporativa-exitosa',
    image: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&auto=format&fit=crop',
    tag: 'CORPORATIVO',
    client: 'Asobel - Nury Amortegui',
    headline: 'Recuperación de administración de junta comunal',
    description: 'Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración. ',
  },
]

export default function CasosSection() {
  return (
    <section id="casos" className="block">
      <div className="wrap">
        <SectionHead refCode="01" eyebrow="Casos de éxito" title="Clientes reales. Resultados reales." />

        <div className="grid-3">
          {cases.map((c) => (
            <article key={c.slug} className="case">
              <div className="rail" aria-hidden="true" />
              <div className="body">
                <span className="badge ok">{c.tag}</span>
                <h3>{c.headline}</h3>
                <span className="who">{c.client}</span>
                <p>{c.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
