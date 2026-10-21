import { useEffect, useState } from 'react'
import SkillBar from './SkillBar'

// Escaneo en cascada: cada barra se activa 150 ms después de la anterior.
export default function SkillScanner({ skills }) {
  const [activas, setActivas] = useState(0)
  const [corrida, setCorrida] = useState(0)

  useEffect(() => {
    setActivas(0)
    const timers = skills.map((_, i) => setTimeout(() => setActivas(i + 1), (i + 1) * 150))
    return () => timers.forEach(clearTimeout)
  }, [corrida, skills])

  return (
    <div className="scan-panel">
      <button className="btn" onClick={() => setCorrida((c) => c + 1)}>
        {corrida === 0 ? '[ ESCANEAR HABILIDADES ]' : '[ RE-ESCANEAR ]'}
      </button>
      <div style={{ marginTop: '1.25rem' }}>
        {skills.map((s, i) => (
          <SkillBar key={s.nombre} {...s} activo={i < activas} />
        ))}
      </div>
    </div>
  )
}
