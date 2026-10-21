import { useEffect, useRef, useState } from 'react'
import MediaCard from './MediaCard'
import Lightbox from './Lightbox'

const CFG = {
  peliculas: {
    titulo: 'Películas favoritas',
    vacio: '// Elegí una película o dejá que el azar decida',
    boton: '[ PELÍCULA AL AZAR ]',
    texto: (i) => `🎬 Esta noche vemos: ${i.titulo} (${i.detalle})`,
  },
  discos: {
    titulo: 'Discos favoritos',
    vacio: '// Elegí un disco o dejá que el azar decida',
    boton: '[ DISCO AL AZAR ]',
    texto: (i) => `🎧 Ahora sonando: ${i.titulo} — ${i.detalle}`,
  },
}

function Seccion({ clave, items, modo, onZoom }) {
  const cfg = CFG[clave]
  const [sel, setSel] = useState(null)
  const [girando, setGirando] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => clearInterval(timer.current), [])

  const alternar = (i) => setSel((s) => (s === i ? null : i))

  // Mini ruleta: recorre las tarjetas y frena en una al azar
  const azar = () => {
    setGirando(true)
    const meta = Math.floor(Math.random() * items.length)
    const total = items.length * 3 + meta
    let paso = 0
    clearInterval(timer.current)
    timer.current = setInterval(() => {
      setSel(paso % items.length)
      paso++
      if (paso > total) {
        clearInterval(timer.current)
        setGirando(false)
      }
    }, 150)
  }

  return (
    <div className="media-section">
      <h2>// {cfg.titulo}</h2>
      <div className="media-grid">
        {items.map((it, i) => (
          <MediaCard
            key={it.titulo}
            {...it}
            selected={modo === 'eleccion' ? sel === i : undefined}
            onClick={modo === 'eleccion' ? () => alternar(i) : modo === 'lightbox' ? () => onZoom(it) : undefined}
          />
        ))}
      </div>
      {modo === 'eleccion' && (
        <>
          <p className="media-note" aria-live="polite">{sel === null ? cfg.vacio : cfg.texto(items[sel])}</p>
          <button className="btn" disabled={girando} onClick={azar}>{cfg.boton}</button>
        </>
      )}
    </div>
  )
}

// modo: 'default' | 'filtro' (Julian) | 'eleccion' (Martin) | 'lightbox' (Emmanuel)
export default function MediaSections({ peliculas, discos, modo = 'default' }) {
  const [filtro, setFiltro] = useState('all')
  const [zoom, setZoom] = useState(null)
  const verPelis = filtro === 'all' || filtro === 'movies'
  const verDiscos = filtro === 'all' || filtro === 'music'

  return (
    <>
      {modo === 'filtro' && (
        <>
          <hr className="divider" />
          <div className="media-filter-bar">
            {[['all', '[ MOSTRAR TODO ]'], ['movies', '[ CINE ]'], ['music', '[ MÚSICA ]']].map(([v, l]) => (
              <button
                key={v}
                className={`btn ${filtro === v ? 'btn-alt' : 'btn-ghost'}`}
                aria-pressed={filtro === v}
                onClick={() => setFiltro(v)}
              >
                {l}
              </button>
            ))}
          </div>
        </>
      )}
      {verPelis && (
        <>
          <hr className="divider" />
          <Seccion clave="peliculas" items={peliculas} modo={modo} onZoom={setZoom} />
        </>
      )}
      {verDiscos && (
        <>
          <hr className="divider" />
          <Seccion clave="discos" items={discos} modo={modo} onZoom={setZoom} />
        </>
      )}
      {zoom && <Lightbox item={zoom} onClose={() => setZoom(null)} />}
    </>
  )
}
