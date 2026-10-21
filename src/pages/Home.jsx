import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import members from '../data/members.json'
import Typewriter from '../components/Typewriter'
import MemberCard from '../components/MemberCard'

const DESCRIPCION =
  'Segunda etapa de nuestro proyecto: la plataforma cyberpunk del TP1, reconstruida en React. ' +
  'Cinco perfiles de jugadores, un arsenal de herramientas con búsqueda y filtros, datos en vivo ' +
  'desde la API de GitHub, el árbol de componentes y la bitácora del proceso, todo en una sola aplicación navegable.'

const SECCIONES = [
  { to: '/datos', titulo: 'Datos locales', desc: '25 herramientas del equipo con búsqueda y filtro.' },
  { to: '/api', titulo: 'API pública', desc: 'Perfiles reales de GitHub, en vivo.' },
  { to: '/arbol', titulo: 'Árbol de renderizado', desc: 'Cómo se componen las pantallas.' },
  { to: '/bitacora', titulo: 'Bitácora', desc: 'Decisiones y problemas del proceso.' },
]

export default function Home() {
  const [runKey, setRunKey] = useState(0)
  const [glitching, setGlitching] = useState(false)
  const [picked, setPicked] = useState(null)
  const glitchTimer = useRef(null)

  useEffect(() => () => clearTimeout(glitchTimer.current), [])

  const reiniciar = () => {
    setRunKey((k) => k + 1)
    setGlitching(true)
    clearTimeout(glitchTimer.current)
    glitchTimer.current = setTimeout(() => setGlitching(false), 1100)
  }

  const autoPick = () => {
    const m = members[Math.floor(Math.random() * members.length)]
    setPicked(m.id)
    document.getElementById(`card-${m.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  return (
    <>
      <section className="hero">
        <span className="eyebrow">// TRABAJO PRÁCTICO Nº2 · DESARROLLO DE SISTEMAS WEB FRONTEND</span>
        <h1 className={glitching ? 'is-glitching' : ''}>
          <span className="glitch" data-text="GRUPO 26">GRUPO 26</span>
        </h1>
        <Typewriter text={DESCRIPCION} runKey={runKey} />
        <div className="hero-actions">
          <button className="btn" onClick={reiniciar}>[ REINICIAR TRANSMISIÓN ]</button>
          <button className="btn btn-alt" onClick={autoPick}>[ AUTO PICK CHARACTER ]</button>
        </div>
        <p className="status-line">SYS_STATUS: ONLINE · MIEMBROS CONECTADOS: {members.length}/{members.length}</p>
      </section>

      <section className="section">
        <div className="section-head">
          <span className="eyebrow">// SELECCIONÁ UN PERFIL</span>
          <h2>Integrantes del equipo</h2>
        </div>
        <div className="team-grid">
          {members.map((m) => (
            <MemberCard key={m.id} member={m} selected={picked === m.id} />
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="section-head">
          <span className="eyebrow">// EXPLORÁ EL PROYECTO</span>
          <h2>Más secciones</h2>
        </div>
        <div className="explore-grid">
          {SECCIONES.map((s) => (
            <Link key={s.to} to={s.to} className="explore-card">
              <strong>{s.titulo}</strong>
              <span>{s.desc}</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}
