// Tarjeta de película/disco. Si recibe onClick, se comporta como botón accesible.
export default function MediaCard({ titulo, detalle, img, alt, onClick, selected }) {
  const interactiva = typeof onClick === 'function'
  const extra = interactiva
    ? {
        role: 'button',
        tabIndex: 0,
        'aria-pressed': selected === undefined ? undefined : selected,
        onClick,
        onKeyDown: (e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            onClick()
          }
        },
      }
    : {}

  return (
    <div className={`media-card${selected ? ' seleccionada' : ''}`} {...extra}>
      <div className="media-thumb">
        <img src={img} alt={alt} loading="lazy" />
      </div>
      <h3>{titulo}</h3>
      <p>{detalle}</p>
    </div>
  )
}
