import { useEffect, useState } from 'react'
import members from '../data/members.json'
import GithubCard from '../components/GithubCard'

const URL_BASE = 'https://api.github.com/users/'

export default function Api() {
  const [estado, setEstado] = useState('cargando') // 'cargando' | 'ok' | 'error'
  const [perfiles, setPerfiles] = useState([])
  const [error, setError] = useState('')
  const [intento, setIntento] = useState(0)

  useEffect(() => {
    const ctrl = new AbortController()
    setEstado('cargando')

    Promise.all(
      members.map((m) =>
        fetch(URL_BASE + m.githubUser, { signal: ctrl.signal }).then((r) => {
          if (r.status === 403) throw new Error('GitHub limitó las consultas (60 por hora sin clave). Probá de nuevo más tarde.')
          if (!r.ok) throw new Error(`GitHub respondió ${r.status} al pedir a ${m.githubUser}.`)
          return r.json()
        })
      )
    )
      .then((datos) => { setPerfiles(datos); setEstado('ok') })
      .catch((e) => {
        if (e.name === 'AbortError') return
        setError(e instanceof TypeError ? 'No se pudo conectar con GitHub. Revisá tu conexión.' : e.message)
        setEstado('error')
      })

    return () => ctrl.abort()
  }, [intento])

  return (
    <>
      <header className="page-head">
        <span className="eyebrow">// API PÚBLICA · GITHUB</span>
        <h1>Perfiles en vivo</h1>
        <p className="page-intro">
          Consultamos la API pública de GitHub (<code>api.github.com/users/…</code>) sin claves.
          Por cada integrante trae su avatar, nombre, cantidad de repositorios públicos, seguidores y
          el año en que creó su cuenta.
        </p>
      </header>

      {estado === 'cargando' && (
        <div className="state-box" role="status">
          Consultando la API de GitHub<span className="cursor">&nbsp;</span>
        </div>
      )}

      {estado === 'error' && (
        <div className="state-box is-error" role="alert">
          <p>✗ Error: {error}</p>
          <button className="btn" onClick={() => setIntento((n) => n + 1)}>[ REINTENTAR ]</button>
        </div>
      )}

      {estado === 'ok' && (
        <div className="item-grid">
          {perfiles.map((p, i) => <GithubCard key={p.id} perfil={p} miembro={members[i]} />)}
        </div>
      )}
    </>
  )
}
