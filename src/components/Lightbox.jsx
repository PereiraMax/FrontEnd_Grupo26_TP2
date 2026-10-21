import { useEffect, useRef } from 'react'

// Modal con la imagen ampliada. Cierra con Esc, botón o click fuera.
export default function Lightbox({ item, onClose }) {
  const closeBtn = useRef(null)
  const onCloseRef = useRef(onClose)
  onCloseRef.current = onClose

  useEffect(() => {
    const previo = document.activeElement
    closeBtn.current?.focus()
    document.body.style.overflow = 'hidden'
    const onKey = (e) => e.key === 'Escape' && onCloseRef.current()
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
      previo?.focus?.()
    }
  }, [])

  return (
    <div
      className="lightbox is-open"
      role="dialog"
      aria-modal="true"
      aria-label="Vista ampliada"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <figure>
        <button ref={closeBtn} className="lightbox-close" onClick={onClose}>[ CERRAR × ]</button>
        <img src={item.img} alt={item.alt} />
        <figcaption>{item.titulo} — {item.detalle}</figcaption>
      </figure>
    </div>
  )
}
