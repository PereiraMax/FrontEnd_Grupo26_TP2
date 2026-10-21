export default function ItemCard({ item }) {
  return (
    <article className="item-card">
      <span className="tag">{item.categoria}</span>
      <h3>{item.nombre}</h3>
      <p>{item.descripcion}</p>
      <p className="item-meta">Lo usa: {item.usadoPor}</p>
      {item.url && (
        <a href={item.url} target="_blank" rel="noopener noreferrer">Sitio oficial ↗</a>
      )}
    </article>
  )
}
