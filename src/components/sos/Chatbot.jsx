import { useEffect, useRef, useState } from 'react'

const TYPING_DELAY_MS = 650

const EXIT_KEYWORDS = new Set(['exit', 'salir', 'adios', 'chao', 'bye', 'hasta luego'])

const GLOBAL_FALLBACK =
  'No entendí tu mensaje. 😊 Escribe el número de la opción que deseas, o **menú** para volver al inicio.'


const FLOW = {
  welcome: {
    messages: [
      '¡Hola! 👋 Soy el asistente virtual de **S.O.S Jurídico**.',
      'Estamos aquí para brindarte asesoría jurídica oportuna, segura y a tu alcance.',
      '¿En qué te puedo ayudar hoy?',
    ],
    options: '1️⃣  Nuestros servicios\n2️⃣  Casos de éxito\n3️⃣  Información de contacto\n4️⃣  Consulta gratis',
    map: {
      '1': 'menu_servicios',
      servicios: 'menu_servicios',
      '2': 'casos_exito',
      casos: 'casos_exito',
      '3': 'contacto',
      contacto: 'contacto',
      '4': 'consulta_gratis',
      consulta: 'consulta_gratis',
      hola: 'welcome',
      hi: 'welcome',
      inicio: 'welcome',
      menu: 'welcome',
    },
    fallback: null,
  },

  menu_servicios: {
    messages: [
      'Ofrecemos soluciones oportunas a sus problemas jurídicos en el ámbito Laboral, Administrativo y Civil.',
      'Contamos con profesionales especialistas en litigio con los más altos estándares de calidad. ¿Sobre qué área deseas conocer más?'
    ],
    options:
      '1️⃣  Derecho Laboral y SGSST\n2️⃣  Pensiones y Seguridad Social\n3️⃣  Cobro de Cartera\n4️⃣  Derecho Administrativo y FFMM\n0️⃣  Volver al menú principal',
    map: {
      '1': 'laboral',
      laboral: 'laboral',
      '2': 'pensiones',
      pensiones: 'pensiones',
      '3': 'cartera',
      cartera: 'cartera',
      '4': 'administrativo',
      administrativo: 'administrativo',
      '0': 'welcome',
      volver: 'welcome',
      back: 'welcome',
      atras: 'welcome',
      menu: 'welcome',
    },
    fallback:
      'Escribe el número del servicio (1, 2, 3 o 4), o **0** para volver al menú principal.',
  },

  laboral: {
    messages: [
      '⚖️ **Derecho Laboral y SGSST**',
      'Brindamos asesoría integral para empresas y trabajadores en el cumplimiento normativo:',
      '• Asesoría empresarial en Derecho Laboral\n• Implementación y seguimiento de SGSST\n• Gestión de contratos y relaciones laborales\n• Litigio especializado en materia laboral',
      'Protegemos la estabilidad jurídica de tu empresa o tus derechos como trabajador. ¿Deseas agendar una consulta?',
    ],
    options: '1️⃣  Solicitar consulta\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      '2': 'menu_servicios',
      '0': 'welcome',
    },
    fallback: null,
  },

  pensiones: {
    messages: [
      '👴 **Pensiones y Seguridad Social**',
      'Te acompañamos en el trámite y reclamación de tus derechos pensionales:',
      '• Pensiones de Vejez, Invalidez y Sobrevivencia\n• Regímenes Especiales y Reliquidación\n• Recuperación de semanas y bonos pensionales\n• Trámites ante Colpensiones y fondos privados',
      'Aseguramos que recibas la pensión que te corresponde por ley. ¿Hablamos de tu caso?',
    ],
    options: '1️⃣  Solicitar consulta\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      '2': 'menu_servicios',
      '0': 'welcome',
    },
    fallback: null,
  },

  cartera: {
    messages: [
      '💰 **Cobro de Cartera**',
      'Especialistas en la recuperación efectiva de activos mediante procesos legales:',
      '• Cobro de cartera Persuasivo\n• Cobro de cartera Coactivo\n• Procesos ejecutivos y medidas cautelares\n• Conciliación de deudas y acuerdos de pago',
      'Contamos con la experiencia necesaria para recuperar tu dinero de forma ágil y responsable.',
    ],
    options: '1️⃣  Solicitar consulta\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      '2': 'menu_servicios',
      '0': 'welcome',
    },
    fallback: null,
  },

  administrativo: {
    messages: [
      '🛡️ **Derecho Administrativo y FFMM**',
      'Defensa técnica especializada en procesos contenciosos y para miembros de la Fuerza Pública:',
      '• Derecho Contencioso Administrativo\n• Pensión e indemnización a Soldados Bachilleres\n• Nivelación salarial a Suboficiales y Oficiales de FFMM\n• Demandas contra el Estado',
      'Hacemos valer los derechos salariales y prestacionales del personal militar y civil ante el Estado.',
    ],
    options: '1️⃣  Solicitar consulta\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      '2': 'menu_servicios',
      '0': 'welcome',
    },
    fallback: null,
  },

  casos_exito: {
    messages: [
      '🏆 **Casos de Éxito**',
      'Estos son algunos de nuestros logros más destacados:',
      '✅ **Derecho Laboral** — Administradora interpuso demanda laboral falsa. En un mes, contrademandamos y logramos su renuncia para recuperar la administración. ',
      '**+2.400 casos resueltos. 97% de satisfacción. 12 años construyendo confianza en Colombia.**',
    ],
    options:
      '1️⃣  Solicitar consulta gratis\n2️⃣  Nuestros servicios\n3️⃣  Información de contacto\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      consulta: 'consulta_gratis',
      '2': 'menu_servicios',
      servicios: 'menu_servicios',
      '3': 'contacto',
      contacto: 'contacto',
      '0': 'welcome',
      volver: 'welcome',
      back: 'welcome',
      atras: 'welcome',
      menu: 'welcome',
    },
    fallback: null,
  },

  contacto: {
    messages: [
      '📍 **Información de Contacto**',
      '📞 **Teléfono:** 601 300 2555\n📱 **Celular:** +57 316 626 8583\n✉️ **Email:** asuntoslegales@sosjuridico.com\n🗺️ **Dirección:** Cra 13A # 28-38, Of. 257 · Bogotá D.C.',
      'Nuestro equipo responde en menos de **24 horas**. También puedes llenar el formulario de contacto en esta misma página.',
    ],
    options: '1️⃣  Solicitar consulta gratis\n2️⃣  Nuestros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'consulta_gratis',
      consulta: 'consulta_gratis',
      '2': 'menu_servicios',
      servicios: 'menu_servicios',
      '0': 'welcome',
      volver: 'welcome',
      back: 'welcome',
      atras: 'welcome',
      menu: 'welcome',
    },
    fallback: null,
  },

  consulta_gratis: {
    messages: [
      '🎁 **Consulta Inicial Gratuita**',
      'En S.O.S Jurídico tu primera consulta es **completamente gratis**. Sin compromisos, sin costos ocultos.',
      'Para agendar tienes tres opciones:\n\n📋 **Formulario web** — completa el formulario en la sección «Contacto» de esta página.\n📞 **Llámanos** — 601 300 2555 o +57 310 280 4025\n✉️ **Escríbenos** — asuntoslegales@sosjuridico.com',
      '✅ Confidencialidad garantizada\n✅ Respuesta en menos de 24 horas\n✅ Sin letra pequeña',
    ],
    options: '1️⃣  Información de contacto\n2️⃣  Nuestros servicios\n0️⃣  Menú principal',
    map: {
      '1': 'contacto',
      contacto: 'contacto',
      '2': 'menu_servicios',
      servicios: 'menu_servicios',
      '0': 'welcome',
      volver: 'welcome',
      back: 'welcome',
      atras: 'welcome',
      menu: 'welcome',
    },
    fallback: null,
  },

  goodbye: {
    messages: [
      '¡Hasta pronto! 👋',
      'Recuerda que en S.O.S Jurídico estamos disponibles cuando lo necesites. **Tu defensa comienza aquí.**',
      '📞 601 300 2555  |  ✉️ asuntoslegales@sosjuridico.com',
    ],
    options: null,
    map: { menu: 'welcome', inicio: 'welcome', hola: 'welcome', hi: 'welcome' },
    fallback: 'Escribe **menú** para volver al inicio.',
  },
}

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function normalize(str) {
  return str
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
}

function FormattedText({ text }) {
  return (
    <span>
      {text.split('\n').map((line, li) => (
        <span key={li}>
          {li > 0 && <br />}
          {line.split(/\*\*(.+?)\*\*/g).map((chunk, ci) =>
            ci % 2 === 1 ? <strong key={ci}>{chunk}</strong> : chunk
          )}
        </span>
      ))}
    </span>
  )
}

// Small node-ring + balanza mark used as the bot avatar.
function BotMark({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-hidden="true">
      <circle cx="14" cy="14" r="12" fill="var(--board)" stroke="var(--plum)" strokeWidth="1.2" />
      <path d="M14 8v12M9 10.5h10M10.5 10.5l-2 4.5h4zM17.5 10.5l-2 4.5h4zM11 20h6" fill="none" stroke="var(--spark)" strokeWidth="1.2" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  )
}

let msgIdCounter = 0
function mkMsg(role, text, isOptions = false) {
  return { id: ++msgIdCounter, role, text, isOptions }
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [isClosing, setIsClosing] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentNode, setCurrentNode] = useState('welcome')

  const bottomRef = useRef(null)
  const timerRef = useRef([])
  const inputRef = useRef(null)

  // Auto-scroll to latest message
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  // Cleanup timers on unmount
  useEffect(() => {
    return () => timerRef.current.forEach(clearTimeout)
  }, [])

  function deliverBotNode(nodeId) {
    timerRef.current.forEach(clearTimeout)
    timerRef.current = []

    const node = FLOW[nodeId]
    if (!node) return

    setIsTyping(true)

    const allMessages = node.options
      ? [...node.messages, node.options]
      : node.messages

    allMessages.forEach((text, i) => {
      const isOpts = node.options && i === allMessages.length - 1
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, mkMsg('bot', text, isOpts)])
        if (i === allMessages.length - 1) {
          setIsTyping(false)
          setCurrentNode(nodeId)
        }
      }, (i + 1) * TYPING_DELAY_MS)
      timerRef.current.push(t)
    })
  }

  function handleOpen() {
    setIsOpen(true)
    setIsClosing(false)
    if (messages.length === 0) {
      deliverBotNode('welcome')
    }
    // Focus input after animation
    setTimeout(() => inputRef.current?.focus(), 300)
  }

  function handleClose() {
    setIsClosing(true)
    const t = setTimeout(() => {
      setIsOpen(false)
      setIsClosing(false)
    }, 240)
    timerRef.current.push(t)
  }

  function handleSend() {
    const raw = input.trim()
    if (!raw || isTyping) return

    const normalized = normalize(raw)
    setMessages((prev) => [...prev, mkMsg('user', raw)])
    setInput('')

    if (EXIT_KEYWORDS.has(normalized)) {
      deliverBotNode('goodbye')
      return
    }

    const node = FLOW[currentNode]
    const nextId = node?.map[normalized]

    if (nextId) {
      deliverBotNode(nextId)
    } else {
      const fallback = node?.fallback ?? GLOBAL_FALLBACK
      const t = setTimeout(() => {
        setMessages((prev) => [...prev, mkMsg('bot', fallback)])
      }, TYPING_DELAY_MS)
      timerRef.current.push(t)
    }
  }

  function handleKey(e) {
    if (e.key === 'Enter' && !isTyping) handleSend()
  }

  return (
    <div className="chatbot-root">
      {isOpen && (
        <div className={`chatbot-window${isClosing ? ' chatbot-window--closing' : ''}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar" aria-hidden="true"><BotMark size={34} /></div>
            <div className="chatbot-header-text">
              <span className="chatbot-name">S.O.S Jurídico</span>
              <span className="chatbot-status">En línea</span>
            </div>
            <button
              className="chatbot-close-btn"
              onClick={handleClose}
              aria-label="Cerrar asistente virtual"
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="chatbot-messages" role="log" aria-live="polite">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`chatbot-msg chatbot-msg--${msg.role}${msg.isOptions ? ' chatbot-msg--options' : ''}`}
              >
                {msg.role === 'bot' && !msg.isOptions && (
                  <div className="chatbot-msg-avatar" aria-hidden="true"><BotMark size={24} /></div>
                )}
                <div className="chatbot-msg-bubble">
                  <FormattedText text={msg.text} />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg-avatar" aria-hidden="true"><BotMark size={24} /></div>
                <div className="chatbot-typing-indicator" aria-label="Escribiendo…">
                  <span /><span /><span />
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              placeholder="Escribe aquí (ej: 1, 2, menú)…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              disabled={isTyping}
              maxLength={200}
              aria-label="Mensaje para el asistente"
              autoComplete="off"
            />
            <button
              className="chatbot-send-btn"
              onClick={handleSend}
              disabled={isTyping || !input.trim()}
              aria-label="Enviar mensaje"
            >
              →
            </button>
          </div>
        </div>
      )}

      {/* FAB */}
      <button
        className={`chatbot-fab${isOpen ? ' chatbot-fab--open' : ''}`}
        onClick={isOpen ? handleClose : handleOpen}
        aria-label={isOpen ? 'Cerrar asistente virtual' : 'Abrir asistente virtual'}
        aria-expanded={isOpen}
        aria-haspopup="dialog"
      >
        <span className="chatbot-fab-icon chatbot-fab-icon--chat" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6"><path d="M4 5h16v11H9l-5 4z" /><path d="M8 10h.01M12 10h.01M16 10h.01" strokeWidth="2.4" strokeLinecap="round" /></svg>
        </span>
        <span className="chatbot-fab-icon chatbot-fab-icon--close" aria-hidden="true">✕</span>
      </button>
    </div>
  )
}
