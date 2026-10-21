import { NavLink } from 'react-router-dom'
import members from '../data/members.json'

const PROYECTO = [
  { to: '/datos', label: 'Datos locales' },
  { to: '/api', label: 'API pública' },
  { to: '/arbol', label: 'Árbol de renderizado' },
  { to: '/bitacora', label: 'Bitácora' },
]

const linkClass = ({ isActive }) => `side-link${isActive ? ' is-active' : ''}`

export default function Sidebar({ open, onClose }) {
  return (
    <aside id="sidebar" className={`sidebar${open ? ' is-open' : ''}`} aria-label="Navegación principal">
      <NavLink to="/" className="brand" onClick={onClose}>
        &gt;&gt; GRUPO_<span>26</span>
      </NavLink>
      <p className="sidebar-sub">Desarrollo de Sistemas Web · TP2</p>

      <nav className="side-group" aria-label="Equipo">
        <span className="side-label">// EQUIPO</span>
        <NavLink to="/" end className={linkClass} onClick={onClose}>Inicio</NavLink>
      </nav>

      <nav className="side-group" aria-label="Integrantes">
        <span className="side-label">// INTEGRANTES</span>
        {members.map((m) => (
          <NavLink key={m.id} to={`/perfil/${m.id}`} className={linkClass} onClick={onClose}>
            {m.nombre}
          </NavLink>
        ))}
      </nav>

      <nav className="side-group" aria-label="Proyecto">
        <span className="side-label">// PROYECTO</span>
        {PROYECTO.map((p) => (
          <NavLink key={p.to} to={p.to} className={linkClass} onClick={onClose}>
            {p.label}
          </NavLink>
        ))}
      </nav>

      <p className="sidebar-foot">SYS_STATUS: ONLINE · {members.length}/{members.length}</p>
    </aside>
  )
}
