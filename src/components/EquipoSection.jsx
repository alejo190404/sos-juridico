import { useNavigate } from 'react-router-dom'
import SquareCluster from './SquareCluster.jsx'

const team = [
  {
    slug: 'ana-martinez',
    name: 'Ana Martínez',
    specialty: 'Derecho Corporativo',
    bio: 'Más de 15 años asesorando empresas en fusiones, contratos y cumplimiento regulatorio.',
    photo: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&auto=format&fit=crop&face',
  },
  {
    slug: 'carlos-rivera',
    name: 'Carlos Rivera',
    specialty: 'Litigación Civil',
    bio: 'Especialista en litigios complejos con historial de fallos favorables en todas instancias.',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&face',
  },
  {
    slug: 'sofia-herrera',
    name: 'Sofía Herrera',
    specialty: 'Derecho Laboral',
    bio: 'Defensora comprometida de derechos laborales, con énfasis en casos colectivos e individuales.',
    photo: 'https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400&auto=format&fit=crop&face',
  },
]

const SPECIALTY_ICONS = {
  'Derecho Corporativo': '🏢',
  'Litigación Civil': '⚖',
  'Derecho Laboral': '👷',
}

export default function EquipoSection() {
  const navigate = useNavigate()

  return (
    <section id="equipo" className="snap-section bg-light-gray flex flex-col justify-center px-12 py-10 relative">
      {/* Square cluster bottom-right */}
      <SquareCluster
        size={18}
        gap={5}
        purpleIndex={10}
        squareColor="#fff"
        className="bottom-8 right-8"
      />

      {/* Header */}
      <div className="mb-8">
        <h2 className="font-montserrat font-bold text-deep-gray uppercase text-4xl mb-2">
          Nuestro Equipo
        </h2>
        <p className="font-montserrat text-deep-gray text-base">
          Especialistas comprometidos con tu caso.
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-6 justify-center">
        {team.map((member) => (
          <div
            key={member.slug}
            onClick={() => navigate(`/equipo/${member.slug}`)}
            className="flex-1 bg-white cursor-pointer overflow-hidden transition-all duration-200 relative"
            style={{
              maxWidth: 300,
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              borderTop: '4px solid transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-6px)'
              e.currentTarget.style.borderTop = '4px solid #7e397e'
              e.currentTarget.style.boxShadow = '0 12px 32px rgba(111,43,143,0.15)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.filter = 'grayscale(0%)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.borderTop = '4px solid transparent'
              e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.08)'
              const img = e.currentTarget.querySelector('img')
              if (img) img.style.filter = 'grayscale(100%)'
            }}
          >
            {/* Photo area */}
            <div
              className="relative overflow-hidden"
              style={{
                height: 220,
                clipPath: 'polygon(0 0, 100% 0, 100% 85%, 50% 100%, 0 85%)',
              }}
            >
              <img
                src={member.photo}
                alt={member.name}
                className="w-full h-full object-cover object-top transition-all duration-400"
                style={{ filter: 'grayscale(100%)', transition: 'filter 400ms ease' }}
              />
            </div>

            {/* Specialty icon overlapping boundary */}
            <div
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center bg-sos-purple text-white font-bold"
              style={{ width: 36, height: 36, borderRadius: 8, top: 200, zIndex: 10, fontSize: 18 }}
            >
              {SPECIALTY_ICONS[member.specialty] || '⚖'}
            </div>

            {/* Card body */}
            <div className="px-5 pb-5 pt-8">
              <h3 className="font-montserrat font-bold text-deep-gray text-lg mb-1">
                {member.name}
              </h3>
              <p
                className="font-montserrat font-bold text-sos-purple uppercase text-xs mb-2"
                style={{ letterSpacing: '0.12em' }}
              >
                {member.specialty}
              </p>
              <p className="font-montserrat text-deep-gray text-sm mb-4 leading-relaxed">
                {member.bio}
              </p>

              {/* Social icons */}
              <div className="flex gap-2 mb-3">
                {['in', '@'].map((icon) => (
                  <div
                    key={icon}
                    className="flex items-center justify-center bg-sos-purple text-white font-bold text-xs"
                    style={{ width: 28, height: 28, borderRadius: 6 }}
                  >
                    {icon}
                  </div>
                ))}
              </div>

              <span className="font-montserrat text-sos-purple text-sm font-bold">
                Ver perfil →
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
