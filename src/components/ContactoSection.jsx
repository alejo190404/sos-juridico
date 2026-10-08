import { useRef, useState } from 'react'
import { supabase } from '../lib/supabase'
import SectionHead from './SectionHead.jsx'

const CONTACT_EMAIL = import.meta.env.VITE_CONTACT_EMAIL

const AREAS = [
  'Derecho Corporativo',
  'Litigación',
  'Derecho Laboral',
  'Propiedad Intelectual',
  'Otro',
]

const CONTACT_DETAILS = [
  { code: 'TEL', label: 'Llámanos', value: '601 300 2555 / +57 316 626 8583' },
  { code: 'DIR', label: 'Dirección', value: 'Cra 13A # 28-38, Of. 257 · Bogotá D.C.' },
  { code: 'MAIL', label: 'Email', value: 'asuntoslegales@sosjuridico.com', href: 'mailto:asuntoslegales@sosjuridico.com' },
]

function validate(fields) {
  const errs = {}
  if (!fields.name.trim()) errs.name = 'El nombre es requerido.'
  if (!fields.email.trim() || !/\S+@\S+\.\S+/.test(fields.email)) errs.email = 'Email inválido.'
  if (!fields.area) errs.area = 'Selecciona un área legal.'
  if (!fields.message.trim()) errs.message = 'Describe tu caso.'
  return errs
}

function Field({ label, error, children }) {
  return (
    <label className={`field${error ? ' has-err' : ''}`}>
      <span>{label}</span>
      {children}
      {error && <span className="hint">{error}</span>}
    </label>
  )
}

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
    <section id="contacto" className="block">
      <div className="wrap contact-grid">
        {/* LEFT — info */}
        <div>
          <SectionHead refCode="03" eyebrow="Contacto" title="¿Necesitas asesoría legal? Cuéntanos.">
            Nuestro equipo responde en menos de 24 horas. Consulta inicial completamente gratis. Confidencialidad garantizada.
          </SectionHead>

          <div className="contact-list">
            {CONTACT_DETAILS.map((item) => (
              <div key={item.label} className="contact-item">
                <div className="pad" aria-hidden="true">{item.code}</div>
                <div>
                  <span className="lbl">{item.label}</span>
                  {item.href ? <a href={item.href}>{item.value}</a> : <span>{item.value}</span>}
                </div>
              </div>
            ))}
          </div>

          <div className="row" style={{ marginTop: 'var(--s6)' }}>
            {['Consulta inicial sin costo', 'Confidencialidad garantizada', 'Agenda instantánea'].map((item) => (
              <span key={item} className="badge ok">{item}</span>
            ))}
          </div>
        </div>

        {/* RIGHT — form */}
        <div className="panel form-panel">
          {success ? (
            <div className="fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '40px 0' }}>
              <div className="success-node" aria-hidden="true">✓</div>
              <h3 style={{ marginBottom: 8 }}>¡Consulta enviada!</h3>
              <p className="muted">Te contactaremos pronto.</p>
            </div>
          ) : (
            <>
              <h3>Envía tu consulta</h3>

              <form ref={formRef} onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--s4)' }} noValidate>
                <div className="form-row">
                  <Field label="Nombre" error={errors.name}>
                    <input name="name" type="text" placeholder="Tu nombre" value={fields.name} onChange={handleChange} required />
                  </Field>
                  <Field label="Área Legal" error={errors.area}>
                    <select name="area" value={fields.area} onChange={handleChange}>
                      <option value="">Selecciona un área</option>
                      {AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Correo Electrónico" error={errors.email}>
                  <input name="email" type="email" placeholder="tu@correo.com" value={fields.email} onChange={handleChange} required />
                </Field>

                <Field label="Asunto">
                  <input name="asunto" type="text" placeholder="Asunto" value={fields.asunto} onChange={handleChange} />
                </Field>

                <Field label="Descripción del Caso" error={errors.message}>
                  <textarea name="message" rows={4} placeholder="Cuéntanos brevemente tu situación..." value={fields.message} onChange={handleChange} />
                </Field>

                {sendError && <p className="form-error">{sendError}</p>}

                <button type="submit" disabled={sending} className="btn w-full no-lead" style={{ marginTop: 'var(--s2)' }}>
                  {sending ? (
                    <>
                      <span style={{ width: 16, height: 16, border: '2px solid currentColor', borderTopColor: 'transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                      Enviando...
                    </>
                  ) : <>Enviar consulta <span className="arr">→</span></>}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
