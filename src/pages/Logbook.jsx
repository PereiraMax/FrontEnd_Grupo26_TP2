import bitacora from '../data/bitacora.json'
import LogEntry from '../components/LogEntry'

const ETAPAS = [
  { id: 'TP2', titulo: 'TP2 · Migración a React' },
  { id: 'TP1', titulo: 'TP1 · HTML, CSS y JavaScript puro' },
]

export default function Logbook() {
  return (
    <>
      <header className="page-head">
        <span className="eyebrow">// REGISTRO DE PROCESO</span>
        <h1>Bitácora del proyecto</h1>
        <p className="page-intro">
          Decisiones, dificultades y cambios del equipo. Continuamos la bitácora del TP1 y sumamos
          los registros de la versión en React.
        </p>
      </header>

      {ETAPAS.map((e) => (
        <section key={e.id} className="section" style={{ paddingTop: 0 }}>
          <h2 style={{ color: 'var(--magenta)', fontSize: '1.1rem', marginBottom: '1.25rem' }}>// {e.titulo}</h2>
          {bitacora.filter((b) => b.etapa === e.id).map((b, i) => (
            <LogEntry key={`${b.fecha}-${b.autor}-${i}`} entrada={b} />
          ))}
        </section>
      ))}
    </>
  )
}
