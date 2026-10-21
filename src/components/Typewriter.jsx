import { useEffect, useState } from 'react'

// Escribe el texto letra por letra. Cambiar runKey lo reinicia.
export default function Typewriter({ text, runKey = 0, speed = 12 }) {
  const [n, setN] = useState(0)

  useEffect(() => {
    setN(0)
    const timer = setInterval(() => {
      setN((c) => {
        if (c >= text.length) {
          clearInterval(timer)
          return c
        }
        return c + 1
      })
    }, speed)
    return () => clearInterval(timer)
  }, [text, runKey, speed])

  return (
    <p className="hero-text">
      {text.slice(0, n)}
      <span className="cursor">&nbsp;</span>
    </p>
  )
}
