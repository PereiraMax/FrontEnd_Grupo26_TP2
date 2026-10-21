import { Link, useParams } from 'react-router-dom'
import members from '../data/members.json'
import SkillScanner from '../components/SkillScanner'
import MediaSections from '../components/MediaSections'
import RobotConfigurator from '../components/RobotConfigurator'
import TerminalMainframe from '../components/TerminalMainframe'
import NotFound from './NotFound'

const EXTRAS = { robot: RobotConfigurator, terminal: TerminalMainframe }

export default function Profile() {
  const { id } = useParams()
  const m = members.find((x) => x.id === id)
  if (!m) return <NotFound mensaje={`No existe un integrante con el identificador "${id}".`} />

  const Extra = m.extra ? EXTRAS[m.extra] : null
  const otros = members.filter((x) => x.id !== m.id)

  // key={m.id}: al cambiar de perfil se reinicia el estado de cada componente
  return (
    <>
      <Link className="back-link btn btn-ghost" to="/">← Volver al inicio</Link>

      <section className="profile-panel">
        <div className="profile-head">
          <div className="profile-avatar">
            <img src={m.avatar} alt={m.avatarAlt} />
          </div>
          <div>
            <span className="profile-tag">{m.tag}</span>
            <h1>{m.nombre}</h1>
            <div className="profile-meta">
              <p>📍 Ciudad: <span>{m.ciudad}</span> · 🎂 Edad: <span>{m.edad}</span></p>
              <p>💼 Rol: <span>{m.rol}</span></p>
              <p>💻 GitHub:{' '}
                <a href={`https://github.com/${m.githubUser}`} target="_blank" rel="noopener noreferrer">
                  github.com/{m.githubUser} ↗
                </a>
              </p>
            </div>
          </div>
        </div>

        <hr className="divider" />
        <h2>// Habilidades técnicas (skills)</h2>
        <SkillScanner key={m.id} skills={m.skills} />

        <MediaSections key={`media-${m.id}`} peliculas={m.peliculas} discos={m.discos} modo={m.media} />

        {Extra && <Extra key={`extra-${m.id}`} />}

        <div className="other-members">
          <span style={{ color: 'var(--text-muted)' }}>// Otros integrantes:</span>
          {otros.map((o) => (
            <Link key={o.id} to={`/perfil/${o.id}`}>{o.nombre} →</Link>
          ))}
        </div>
      </section>
    </>
  )
}
