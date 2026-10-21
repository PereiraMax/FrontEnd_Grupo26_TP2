import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import Sidebar from './Sidebar'

export default function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  // Al navegar: cerrar el menú (mobile) y volver arriba
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <span className="brand">&gt;&gt; GRUPO_<span>26</span></span>
        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="sidebar"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? '✕ CERRAR' : '☰ MENÚ'}
        </button>
      </header>

      <Sidebar open={open} onClose={() => setOpen(false)} />
      {open && <div className="scrim" onClick={() => setOpen(false)} />}

      <div className="content">
        <main className="page">
          <Outlet />
        </main>
        <footer className="site-footer">
          <div>© 2026 Grupo 26 · Desarrollo de Sistemas Web Frontend · TP2</div>
        </footer>
      </div>
    </div>
  )
}
