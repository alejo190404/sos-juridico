import { useRef, useState } from 'react'
import { supabase } from '../lib/supabase'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL

const AREAS = [
  'Derecho Corporativo',
  'Litigación',
  'Derecho Laboral',
  'Propiedad Intelectual',
  'Otro',
]

const CONTACT_DETAILS = [
  { icon: '📞', label: 'Llámanos', value: '601 300 2555 / +57 310 280 4025' },
  { icon: '📍', label: 'Dirección', value: 'Cra 13A # 28-38, Of. 257 · Bogotá D.C.' },
  { icon: '✉️', label: 'Email', value: 'contactosjuridico@gmail.com' },
]

function validate(fields) {
  const errs = {}
  if (!fields.name.trim()) errs.name = 'El nombre es requerido.'
  if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'Email inválido.'
  if (!fields.area) errs.area = 'Selecciona un área legal.'
  if (!fields.message.trim()) errs.message = 'Describe tu caso.'
  return errs
}

const inputStyle = (hasError) => ({
  width: '100%',
  border: `1.5px solid ${hasError ? '#f87171' : 'var(--grey-2)'}`,
  borderRadius: 8,
  padding: '12px 14px',
  fontSize: 16,
  fontFamily: 'inherit',
  color: 'var(--black)',
  background: 'var(--grey-0)',
  outline: 'none',
  transition: 'border-color 0.2s',
  minHeight: 44,
})

export default function ContactoSection() {
  const formRef = useRef()
  const [fields, setFields] = useState({ name: '', email: '', asunto: '', area: '', message: '' })
  const [errors, setErrors] = useState({})
  const [sending, setSending] = useState(false)
  const [success, setSuccess] = useState(false)
  const [sendError, setSendError] = useState(null)

  const handleChange = (e) => {
    setFields((prev) => ({ ...prev, [e.target.name]: e.target.value }))
    setErrors((prev) => ({ ...prev, [e.target.name]: undefined }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const errs = validate(fields)
    if (Object.keys(errs).length) {
      setErrors(errs)
      return
    }
    setSending(true)
    setSendError(null)

    const { data, error: fnError } = await supabase.functions.invoke('send-contact-email', {
      body: {
        email: fields.email,
        name: fields.name,
        subject: fields.asunto,
        area: fields.area,
        body: fields.message,
        contactEmail: CONTACT_EMAIL,
      },
    })

    setSending(false)

    if (fnError || !data?.success) {
      setSendError(data?.error ?? 'No se pudo enviar el mensaje. Por favor intente de nuevo.')
      return
    }

    setSuccess(true)
  }

  return (
    <section id="contacto" className="contact-section">
      {/* Geometric decorator */}
      <div style={{ position: 'absolute', left: -100, top: -100, width: 300, height: 300, background: 'var(--grey-2)', transform: 'rotate(18deg)', borderRadius: 8, opacity: 0.4, pointerEvents: 'none' }} />

      {/* LEFT — info */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: 2, textTransform: 'uppercase', color: 'var(--purple)', marginBottom: 16 }}>
          Contacto
        </p>
        <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 800, lineHeight: 1.15, marginBottom: 24 }}>
          ¿Necesitas<br />asesoría legal?<br />Cuéntanos.
        </h2>
        <p style={{ fontSize: 16, color: 'var(--grey-4)', lineHeight: 1.7 }}>
          Nuestro equipo responde en menos de 24 horas.<br />Consulta inicial completamente gratis. Confidencialidad garantizada.
        </p>

        <div style={{ marginTop: 36, display: 'flex', flexDirection: 'column', gap: 14 }}>
          {CONTACT_DETAILS.map((item) => (
            <div key={item.label} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <div style={{
                width: 44, height: 44,
                background: 'var(--purple-dim)',
                borderRadius: 6,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 18, flexShrink: 0,
              }}>
                {item.icon}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.5 }}>
                <strong style={{ display: 'block', fontSize: 13, color: 'var(--grey-4)', fontWeight: 500 }}>{item.label}</strong>
                {item.value}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 32, display: 'flex', flexDirection: 'column', gap: 10 }}>
          {['Consulta inicial sin costo', 'Confidencialidad garantizada', 'Agenda instantánea'].map((item) => (
            <div key={item} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 28, height: 28,
                background: 'var(--purple)',
                borderRadius: 4,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', fontSize: 13, fontWeight: 700, flexShrink: 0,
              }}>✓</div>
              <span style={{ fontSize: 14, color: 'var(--grey-5)' }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — form */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'var(--white)',
          borderRadius: 16,
          padding: 40,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          boxShadow: '0 8px 40px rgba(0,0,0,0.06)',
        }}
      >
        {success ? (
          <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px 0' }}>
            <div style={{ width: 56, height: 56, borderRadius: 12, background: 'var(--purple)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: 28, marginBottom: 16 }}>✓</div>
            <h3 style={{ fontSize: 22, fontWeight: 700, marginBottom: 8 }}>¡Consulta enviada!</h3>
            <p style={{ color: 'var(--grey-4)', fontSize: 15 }}>Te contactaremos pronto.</p>
          </div>
        ) : (
          <>
            <h3 style={{ fontSize: 22, fontWeight: 700 }}>Envía tu consulta</h3>

            <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }} noValidate>
              <div className="form-row">
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--grey-5)' }}>
                  Nombre
                  <input name="name" type="text" placeholder="Tu nombre" value={fields.name} onChange={handleChange} style={inputStyle(errors.name)} onFocus={(e) => (e.target.style.borderColor = 'var(--purple)')} onBlur={(e) => (e.target.style.borderColor = errors.name ? '#f87171' : 'var(--grey-2)')} required />
                  {errors.name && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.name}</span>}
                </label>
                <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--grey-5)' }}>
                  Área Legal
                  <select name="area" value={fields.area} onChange={handleChange} style={{ ...inputStyle(errors.area), cursor: 'pointer' }}>
                    <option value="">Selecciona un área</option>
                    {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                  {errors.area && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.area}</span>}
                </label>
              </div>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--grey-5)' }}>
                Correo Electrónico
                <input name="email" type="email" placeholder="tu@correo.com" value={fields.email} onChange={handleChange} style={inputStyle(errors.email)} onFocus={(e) => (e.target.style.borderColor = 'var(--purple)')} onBlur={(e) => (e.target.style.borderColor = errors.email ? '#f87171' : 'var(--grey-2)')} required />
                {errors.email && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.email}</span>}
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--grey-5)' }}>
                Asunto
                <input name="asunto" type="text" placeholder="Asunto" value={fields.asunto} onChange={handleChange} style={inputStyle(false)} onFocus={(e) => (e.target.style.borderColor = 'var(--purple)')} onBlur={(e) => (e.target.style.borderColor = 'var(--grey-2)')} />
              </label>

              <label style={{ display: 'flex', flexDirection: 'column', gap: 6, fontSize: 13, fontWeight: 600, color: 'var(--grey-5)' }}>
                Descripción del Caso
                <textarea name="message" rows={4} placeholder="Cuéntanos brevemente tu situación..." value={fields.message} onChange={handleChange} style={{ ...inputStyle(errors.message), resize: 'vertical', minHeight: 110 }} onFocus={(e) => (e.target.style.borderColor = 'var(--purple)')} onBlur={(e) => (e.target.style.borderColor = errors.message ? '#f87171' : 'var(--grey-2)')} />
                {errors.message && <span style={{ color: '#ef4444', fontSize: 12 }}>{errors.message}</span>}
              </label>

              {sendError && <p style={{ color: '#ef4444', fontSize: 14 }}>{sendError}</p>}

              <button
                type="submit"
                disabled={sending}
                style={{
                  background: 'var(--purple)',
                  color: 'white',
                  border: 'none',
                  padding: 14,
                  borderRadius: 8,
                  fontSize: 16,
                  fontWeight: 700,
                  cursor: sending ? 'not-allowed' : 'pointer',
                  fontFamily: 'inherit',
                  transition: 'background 0.2s, transform 0.15s',
                  opacity: sending ? 0.7 : 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 8,
                  minHeight: 48,
                }}
                onMouseEnter={(e) => { if (!sending) e.currentTarget.style.background = 'var(--purple-light)' }}
                onMouseLeave={(e) => { e.currentTarget.style.background = 'var(--purple)' }}
              >
                {sending ? (
                  <>
                    <span style={{ width: 16, height: 16, border: '2px solid white', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                    Enviando...
                  </>
                ) : 'Enviar consulta →'}
              </button>
            </form>
          </>
        )}
      </div>
    </section>
  )
}
