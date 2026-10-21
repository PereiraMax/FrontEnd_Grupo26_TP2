import { Link } from 'react-router-dom'

export default function MemberCard({ member, selected }) {
  return (
    <article
      id={`card-${member.id}`}
      className="team-card"
      style={selected ? { borderColor: 'var(--magenta)' } : undefined}
    >
      <div className="avatar">
        <img src={member.avatar} alt={member.avatarAlt} />
      </div>
      <div className="info">
        <h3>{member.nombre}</h3>
        <p>{member.rol}</p>
        <p>{member.ciudad}</p>
        <Link to={`/perfil/${member.id}`}>Ver perfil →</Link>
      </div>
    </article>
  )
}
