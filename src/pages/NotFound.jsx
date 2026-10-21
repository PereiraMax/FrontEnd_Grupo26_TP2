import { Link } from 'react-router-dom'

export default function NotFound({ mensaje = 'La página que buscás no existe.' }) {
  return (
    <section className="page-head">
      <span className="eyebrow">// ERROR 404</span>
      <h1>Señal perdida</h1>
      <p className="page-intro">{mensaje}</p>
      <p style={{ marginTop: '1.5rem' }}>
        <Link className="btn" to="/">[ VOLVER AL INICIO ]</Link>
      </p>
    </section>
  )
}
