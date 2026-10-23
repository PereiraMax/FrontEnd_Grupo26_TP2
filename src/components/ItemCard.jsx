import { useState } from 'react'

export default function ItemCard({ item, onVerCategoria }) {
  const [abierto, setAbierto] = useState(false)
  const idDetalle = `item-detalle-${item.id}`

  return (
    <article className={`item-card${abierto ? ' is-open' : ''}`}>
      <span className="tag">{item.categoria}</span>
      <h3>{item.nombre}</h3>
      <p>{item.descripcion}</p>

      <button
        className="item-toggle"
        aria-expanded={abierto}
        aria-controls={idDetalle}
        onClick={() => setAbierto((a) => !a)}
      >
        {abierto ? '[ − OCULTAR DETALLE ]' : '[ + VER DETALLE ]'}
      </button>

      {abierto && (
        <div id={idDetalle} className="item-detail">
          <p className="item-meta">Lo usa: {item.usadoPor}</p>
          <p>Registro Nº {String(item.id).padStart(2, '0')} · Categoría {item.categoria}</p>
          <div className="item-links">
            {item.url && (
              <a href={item.url} target="_blank" rel="noopener noreferrer">Sitio oficial ↗</a>
            )}
            {onVerCategoria && (
              <button className="item-link-btn" onClick={() => onVerCategoria(item.categoria)}>
                Ver más de {item.categoria} →
              </button>
            )}
          </div>
        </div>
      )}
    </article>
  )
}
