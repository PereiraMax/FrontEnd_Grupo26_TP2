import { useState } from 'react'
import { RC_DATA, GRUPOS, chipLabel, evaluarBuild, calcularVeredicto } from '../data/robotData'
import './RobotConfigurator.css'

const VACIO = { motor: null, sensor: null, driver: null, control: null }
const ICONO = { ok: 'rc-check-ok', warn: 'rc-check-warn', error: 'rc-check-error', info: 'rc-check-info' }

export default function RobotConfigurator() {
  const [sel, setSel] = useState(VACIO)
  const [reporte, setReporte] = useState(null) // null | { sel } (selección congelada al ensamblar)

  const elegir = (key, valor) => setSel((s) => ({ ...s, [key]: valor }))
  const ensamblar = (seleccion = sel) => setReporte({ sel: seleccion })

  const autoConfig = () => {
    const azar = {}
    GRUPOS.forEach(({ key }) => {
      const opciones = Object.keys(RC_DATA[key])
      azar[key] = opciones[Math.floor(Math.random() * opciones.length)]
    })
    setSel(azar)
    ensamblar(azar)
  }

  const reset = () => {
    setSel(VACIO)
    setReporte(null)
  }

  const faltantes = reporte ? GRUPOS.filter(({ key }) => !reporte.sel[key]).map((g) => g.titulo) : []
  const completo = reporte && faltantes.length === 0
  const mensajes = completo ? evaluarBuild(reporte.sel) : []
  const veredicto = completo ? calcularVeredicto(mensajes) : null

  return (
    <section className="robot-config" id="robot-config">
      <hr className="divider" />
      <div className="section-head">
        <span className="eyebrow">// TALLER DE ENSAMBLAJE</span>
        <h2>Configurador de robot</h2>
        <p className="page-intro">
          Elegí un motor, un sensor, un driver de control y una placa. El sistema valida si la
          combinación es compatible antes de ensamblar el build.
        </p>
      </div>

      <div className="rc-grid">
        {GRUPOS.map(({ key, titulo }, i) => (
          <div className="rc-group" key={key}>
            <h3 className="rc-title">0{i + 1} // {titulo}</h3>
            <div className="rc-options">
              {Object.keys(RC_DATA[key]).map((valor) => (
                <button
                  key={valor}
                  type="button"
                  className={`rc-chip${sel[key] === valor ? ' is-active' : ''}`}
                  aria-pressed={sel[key] === valor}
                  onClick={() => elegir(key, valor)}
                >
                  {chipLabel(valor)}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="rc-actions">
        <button className="btn" onClick={() => ensamblar()}>[ ENSAMBLAR ROBOT ]</button>
        <button className="btn btn-ghost" onClick={autoConfig}>[ AUTO CONFIG ]</button>
        <button className="btn btn-ghost" onClick={reset}>[ RESET ]</button>
      </div>

      {reporte && (
        <div className="rc-readout" aria-live="polite">
          <h3>// Reporte de ensamblaje</h3>
          {!completo ? (
            <p className="rc-check-error">Faltan seleccionar: {faltantes.join(', ')}</p>
          ) : (
            <>
              <ul className="rc-build-list">
                {GRUPOS.map(({ key, titulo }) => {
                  const c = RC_DATA[key][reporte.sel[key]]
                  return (
                    <li key={key}>
                      <strong>{titulo}:</strong> {c.label}{c.info ? ` — ${c.info}` : ''}
                    </li>
                  )
                })}
              </ul>
              <ul className="rc-check-list">
                {mensajes.map((m, i) => (
                  <li key={i} className={ICONO[m.nivel]}>{m.texto}</li>
                ))}
              </ul>
              <span className={`rc-verdict ${veredicto.clase}`}>{veredicto.texto}</span>
            </>
          )}
        </div>
      )}
    </section>
  )
}
