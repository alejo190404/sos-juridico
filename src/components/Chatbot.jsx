import { useEffect, useRef, useState } from 'react'

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Edit TYPING_DELAY_MS to change how fast bot messages appear.
const TYPING_DELAY_MS = 650

const EXIT_KEYWORDS = new Set(['exit', 'salir', 'adios', 'chao', 'bye', 'hasta luego'])

const GLOBAL_FALLBACK =
  'No entendí tu mensaje. 😊 Escribe el número de la opción que deseas, o **menú** para volver al inicio.'

// ─── CONVERSATION FLOW ────────────────────────────────────────────────────────
// Each node: messages[], options (shown after messages), map (input → next node), fallback
// Edit message text here to change what the bot says.
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
    messages: ['Contamos con cuatro áreas de práctica legal. ¿Sobre cuál deseas conocer más?'],
    options:
      '1️⃣  Derecho Laboral\n2️⃣  Derecho Corporativo\n3️⃣  Litigación\n4️⃣  Propiedad Intelectual\n0️⃣  Volver al menú principal',
    map: {
      '1': 'laboral',
      laboral: 'laboral',
      '2': 'corporativo',
      corporativo: 'corporativo',
      '3': 'litigacion',
      litigacion: 'litigacion',
      '4': 'propiedad',
      propiedad: 'propiedad',
      'propiedad intelectual': 'propiedad',
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
      '⚖️ **Derecho Laboral**',
      'Defendemos los derechos de trabajadores y empleadores en todo tipo de conflictos laborales:',
      '• Despidos injustificados e indemnizaciones\n• Acoso laboral y sexual en el trabajo\n• Liquidaciones y prestaciones sociales\n• Contratos de trabajo y vinculaciones\n• Pensiones y seguridad social\n• Demandas ante el Ministerio de Trabajo',
      'Hemos recuperado más de **$450.000** en indemnizaciones para un solo trabajador. ¿Tienes un caso laboral?',
    ],
    options: '1️⃣  Solicitar consulta gratis\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
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

  corporativo: {
    messages: [
      '🏢 **Derecho Corporativo**',
      'Asesoramos empresas en todas las etapas de su ciclo de vida:',
      '• Constitución de sociedades y empresas\n• Fusiones, adquisiciones y escisiones\n• Contratos comerciales y negociaciones\n• Gobierno corporativo y compliance\n• Reestructuraciones empresariales\n• Protección de activos corporativos',
      'Hemos gestionado fusiones corporativas por más de **$8.000.000** sin una sola contingencia legal. Tu empresa merece esa seguridad.',
    ],
    options: '1️⃣  Solicitar consulta gratis\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
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

  litigacion: {
    messages: [
      '⚔️ **Litigación**',
      'Representamos tus intereses en todas las instancias judiciales:',
      '• Procesos civiles y comerciales\n• Recursos de tutela y acciones constitucionales\n• Procesos ejecutivos y cobros de cartera\n• Segunda instancia y recursos extraordinarios\n• Medidas cautelares y embargos\n• Conciliación y resolución alternativa de conflictos',
      'Con **18 años de experiencia**, sabemos cómo ganar. Cada caso es una batalla que peleamos con toda nuestra preparación.',
    ],
    options: '1️⃣  Solicitar consulta gratis\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
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

  propiedad: {
    messages: [
      '💡 **Propiedad Intelectual**',
      'Protegemos tus creaciones y activos intangibles:',
      '• Registro de marcas y patentes ante la SIC\n• Derechos de autor y licencias de uso\n• Protección contra uso no autorizado\n• Disputas de propiedad intelectual\n• Transferencia de tecnología y contratos\n• Secretos industriales y know-how',
      'Tu marca, tu obra y tu innovación tienen valor. Los protegemos legalmente en Colombia y a nivel internacional.',
    ],
    options: '1️⃣  Solicitar consulta gratis\n2️⃣  Ver otros servicios\n0️⃣  Menú principal',
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

  casos_exito: {
    messages: [
      '🏆 **Casos de Éxito**',
      'Estos son algunos de nuestros logros más destacados:',
      '✅ **Derecho Laboral** — Recuperamos **$450.000** en indemnización para un trabajador despedido injustificadamente tras 12 años de servicio.\n\n✅ **Propiedad** — Recuperamos un inmueble comercial valuado en **$2.300.000** con fallo favorable en segunda instancia.\n\n✅ **Corporativo** — Estructuramos una fusión empresarial de **$8.000.000** con cierre en 90 días, cero contingencias.',
      '**+2.400 casos resueltos. 97% de satisfacción. 18 años construyendo confianza en Colombia.**',
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
      '📞 **Teléfono:** 601 300 2555\n📱 **Celular:** +57 310 280 4025\n✉️ **Email:** contactosjuridico@gmail.com\n🗺️ **Dirección:** Cra 13A # 28-38, Of. 257 · Bogotá D.C.',
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
      'Para agendar tienes tres opciones:\n\n📋 **Formulario web** — completa el formulario en la sección «Contacto» de esta página.\n📞 **Llámanos** — 601 300 2555 o +57 310 280 4025\n✉️ **Escríbenos** — contactosjuridico@gmail.com',
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
      '📞 601 300 2555  |  ✉️ contactosjuridico@gmail.com',
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
            <div className="chatbot-avatar" aria-hidden="true">⚖️</div>
            <div className="chatbot-header-text">
              <span className="chatbot-name">S.O.S Jurídico</span>
              <span className="chatbot-status">● En línea</span>
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
                  <div className="chatbot-msg-avatar" aria-hidden="true">⚖️</div>
                )}
                <div className="chatbot-msg-bubble">
                  <FormattedText text={msg.text} />
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg chatbot-msg--bot">
                <div className="chatbot-msg-avatar" aria-hidden="true">⚖️</div>
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
              ➤
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
        <span className="chatbot-fab-icon chatbot-fab-icon--chat" aria-hidden="true">💬</span>
        <span className="chatbot-fab-icon chatbot-fab-icon--close" aria-hidden="true">✕</span>
      </button>
    </div>
  )
}
