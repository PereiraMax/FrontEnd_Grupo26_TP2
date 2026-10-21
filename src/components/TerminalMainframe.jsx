import { useEffect, useRef, useState } from 'react'

const RESPONSES = {
  whoami: ['> whoami', 'USER: matias.mazzitelli', 'ROL: Backend & Mainframe Developer', 'TAG: PLAYER_05 // Ingeniería de Software'],
  jobs: ['> jobs --list', 'PID   PROCESO               ESTADO', '0001  JAVA_SPRING.JAR       RUNNING', '0002  MAINFRAME_COBOL.JOB   RUNNING', '0003  BACKEND_CORE.SVC      RUNNING', '0004  SOFTWARE_ENG.DAEMON   RUNNING'],
  status: ['> status', 'UPTIME: 36 AÑOS // 0 INCIDENTES CRÍTICOS', 'CARGA DEL SISTEMA: ESTABLE', 'UBICACIÓN: TABLADA, BUENOS AIRES'],
  wake: ['> wake_up', 'WAKE UP, MATIAS...', 'THE MAINFRAME HAS YOU.', 'FOLLOW THE WHITE RABBIT. 🐇'],
}
const CMDS = [
  ['whoami', '[ whoami ]', 'btn-alt'],
  ['jobs', '[ jobs --list ]', 'btn-alt'],
  ['status', '[ status ]', 'btn-alt'],
  ['wake', '[ wake_up ]', ''],
]

export default function TerminalMainframe() {
  const [texto, setTexto] = useState('> Sistema listo. Elegí un comando.')
  const timer = useRef(null)
  useEffect(() => () => clearInterval(timer.current), [])

  const correr = (cmd) => {
    clearInterval(timer.current)
    const completo = RESPONSES[cmd].join('\n')
    let i = 0
    setTexto('')
    timer.current = setInterval(() => {
      i++
      setTexto(completo.slice(0, i))
      if (i >= completo.length) clearInterval(timer.current)
    }, 16)
  }

  return (
    <section>
      <hr className="divider" />
      <h2>// Terminal Mainframe</h2>
      <div className="mf-terminal">
        <div className="mf-terminal-bar">
          <span className="mf-terminal-dot" /><span className="mf-terminal-dot" /><span className="mf-terminal-dot" />
          <span className="mf-terminal-title">SYS://MATIAS_MAINFRAME</span>
        </div>
        <div className="mf-terminal-screen" aria-live="polite">{texto}</div>
        <div className="mf-terminal-cmds">
          {CMDS.map(([id, label, cls]) => (
            <button key={id} className={`btn ${cls}`} onClick={() => correr(id)}>{label}</button>
          ))}
        </div>
      </div>
    </section>
  )
}
