export default function SkillBar({ nombre, valor, activo }) {
  const actual = activo ? valor : 0
  return (
    <div className="skill-row">
      <span className="skill-name">{nombre}</span>
      <div className="skill-track">
        <div className="skill-fill" style={{ width: `${actual}%` }} />
      </div>
      <span className="skill-value">{actual}%</span>
    </div>
  )
}
