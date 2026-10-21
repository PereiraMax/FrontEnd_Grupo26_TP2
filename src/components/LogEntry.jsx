export default function LogEntry({ entrada }) {
  return (
    <div className="log-entry">
      <div className="log-meta">
        <time dateTime={entrada.fecha}>{entrada.fecha}</time>
        <span className="log-author">{entrada.autor}</span>
        <span className={`log-tag${entrada.tipo === 'Bug' ? ' is-bug' : ''}`}>{entrada.tipo.toUpperCase()}</span>
      </div>
      <p>{entrada.texto}</p>
    </div>
  )
}
