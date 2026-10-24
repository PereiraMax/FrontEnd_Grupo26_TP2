import { useMemo, useState } from 'react'
import items from '../data/items.json'
import ItemCard from '../components/ItemCard'

const CATEGORIAS = ['Todas', ...new Set(items.map((i) => i.categoria))]

// Pasa a minúsculas y le saca las tildes: "Automatización" -> "automatizacion"
const normalizar = (s) =>
  s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '')

export default function Data() {
  const [texto, setTexto] = useState('')
  const [categoria, setCategoria] = useState('Todas')

  const resultados = useMemo(() => {
    const t = normalizar(texto.trim())
    return items.filter((i) => {
      const okCategoria = categoria === 'Todas' || i.categoria === categoria
      const okTexto = !t || normalizar(`${i.nombre} ${i.descripcion} ${i.usadoPor}`).includes(t)
      return okCategoria && okTexto
    })
  }, [texto, categoria])

  const limpiar = () => { setTexto(''); setCategoria('Todas') }

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">// DATOS LOCALES · JSON</span>
        <h1>Arsenal del equipo</h1>
        <p className="page-intro">
          Las {items.length} herramientas, lenguajes y recursos que usamos en el proyecto, cargados
          desde un archivo JSON local. Buscá por texto o filtrá por categoría.
        </p>
      </header>

      <div className="toolbar">
        <div className="field">
          <label htmlFor="busqueda">BUSCAR</label>
          <input id="busqueda" type="search" placeholder="Nombre, descripción o integrante…"
            value={texto} onChange={(e) => setTexto(e.target.value)} />
        </div>
        <div className="field">
          <label htmlFor="categoria">CATEGORÍA</label>
          <select id="categoria" value={categoria} onChange={(e) => setCategoria(e.target.value)}>
            {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
      </div>

      <p className="result-count" aria-live="polite">
        Mostrando {resultados.length} de {items.length} registros
      </p>

      {resultados.length === 0 ? (
        <div className="state-box">
          <p>No hay resultados para esa búsqueda.</p>
          <button className="btn btn-alt" onClick={limpiar}>[ LIMPIAR FILTROS ]</button>
        </div>
      ) : (
        <div className="item-grid">
          {resultados.map((i) => <ItemCard key={i.id} item={i} onVerCategoria={setCategoria} />)}
        </div>
      )}
    </>
  )
}