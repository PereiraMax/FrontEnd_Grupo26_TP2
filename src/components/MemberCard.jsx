import { Link } from 'react-router-dom'

export default function MemberCard({ member, selected, onSelect }) {
  const alHacerClick = (e) => {
    if (e.target.closest('a')) return
    onSelect?.(member.id)
  }

  return (
    <article
      id={`card-${member.id}`}
      className="team-card"
      style={selected ? { borderColor: 'var(--magenta)' } : undefined}
      onClick={alHacerClick}
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
