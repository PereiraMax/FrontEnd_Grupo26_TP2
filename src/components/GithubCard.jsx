import { Link } from 'react-router-dom'

export default function GithubCard({ perfil, miembro }) {
  return (
    <article className="item-card">
      <div className="gh-head">
        <img className="gh-avatar" src={perfil.avatar_url} alt={`Avatar de GitHub de ${perfil.login}`} />
        <div>
          <h3>{perfil.name || perfil.login}</h3>
          <p>@{perfil.login}</p>
        </div>
      </div>
      <div className="gh-stats">
        <span><strong>{perfil.public_repos}</strong> repos</span>
        <span><strong>{perfil.followers}</strong> seguidores</span>
        <span>desde <strong>{new Date(perfil.created_at).getFullYear()}</strong></span>
      </div>
      <div className="gh-links">
        <a href={perfil.html_url} target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <Link to={`/perfil/${miembro.id}`}>Perfil en la app →</Link>
      </div>
    </article>
  )
}
