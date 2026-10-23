import { useMemo, useState } from 'react'
import bitacora from '../data/bitacora.json'
import LogEntry from '../components/LogEntry'

const ETAPAS = [
  { id: 'TP2', titulo: 'TP2 · Migración a React' },
  { id: 'TP1', titulo: 'TP1 · HTML, CSS y JavaScript puro' },
]

const TODOS = 'Todos'
const TIPOS = [TODOS, ...new Set(bitacora.map((b) => b.tipo))]
const AUTORES = [TODOS, ...new Set(bitacora.map((b) => b.autor))]
const FILTROS_INICIALES = { etapa: TODOS, tipo: TODOS, autor: TODOS }

export default function Logbook() {
  const [filtros, setFiltros] = useState(FILTROS_INICIALES)

  const cambiar = (campo, valor) => setFiltros((f) => ({ ...f, [campo]: valor }))
  const restablecer = () => setFiltros(FILTROS_INICIALES)
  const hayFiltros = Object.values(filtros).some((v) => v !== TODOS)

  const visibles = useMemo(
    () =>
      bitacora.filter(
        (b) =>
          (filtros.etapa === TODOS || b.etapa === filtros.etapa) &&
          (filtros.tipo === TODOS || b.tipo === filtros.tipo) &&
          (filtros.autor === TODOS || b.autor === filtros.autor)
      ),
    [filtros]
  )

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">// REGISTRO DE PROCESO</span>
        <h1>Bitácora del proyecto</h1>
        <p className="page-intro">
          Decisiones, dificultades y cambios del equipo. Continuamos la bitácora del TP1 y sumamos
          los registros de la versión en React. Filtrá por etapa, tipo de registro o integrante.
        </p>
      </header>

      <div className="log-filter-bar" role="group" aria-label="Filtrar por tipo">
        {TIPOS.map((t) => (
          <button
            key={t}
            className={`btn ${filtros.tipo === t ? 'btn-alt' : 'btn-ghost'}`}
            aria-pressed={filtros.tipo === t}
            onClick={() => cambiar('tipo', t)}
          >
            [ {t.toUpperCase()} ]
          </button>
        ))}
      </div>

      <div className="toolbar">
        <div className="field">
          <label htmlFor="log-etapa">ETAPA</label>
          <select id="log-etapa" value={filtros.etapa} onChange={(e) => cambiar('etapa', e.target.value)}>
            <option value={TODOS}>Todas</option>
            {ETAPAS.map((e) => <option key={e.id} value={e.id}>{e.titulo}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="log-autor">INTEGRANTE</label>
          <select id="log-autor" value={filtros.autor} onChange={(e) => cambiar('autor', e.target.value)}>
            {AUTORES.map((a) => <option key={a} value={a}>{a}</option>)}
          </select>
        </div>
        {hayFiltros && (
          <button className="btn btn-ghost" onClick={restablecer}>[ RESTABLECER ]</button>
        )}
      </div>

      <p className="result-count" aria-live="polite">
        Mostrando {visibles.length} de {bitacora.length} registros
      </p>

      {visibles.length === 0 ? (
        <div className="state-box">
          <p>No hay registros con esos filtros.</p>
          <button className="btn btn-alt" onClick={restablecer}>[ VER TODOS ]</button>
        </div>
      ) : (
        ETAPAS.map((e) => {
          const registros = visibles.filter((b) => b.etapa === e.id)
          if (registros.length === 0) return null
          return (
            <section key={e.id} className="section" style={{ paddingTop: 0 }}>
              <h2 style={{ color: 'var(--magenta)', fontSize: '1.1rem', marginBottom: '1.25rem' }}>// {e.titulo}</h2>
              {registros.map((b, i) => (
                <LogEntry key={`${b.fecha}-${b.autor}-${i}`} entrada={b} />
              ))}
            </section>
          )
        })
      )}
    </>
  )
}
