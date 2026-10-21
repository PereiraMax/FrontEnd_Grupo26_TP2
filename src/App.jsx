import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Data from './pages/Data'
import Api from './pages/Api'
import RenderTree from './pages/RenderTree'
import Logbook from './pages/Logbook'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="perfil/:id" element={<Profile />} />
        <Route path="datos" element={<Data />} />
        <Route path="api" element={<Api />} />
        <Route path="arbol" element={<RenderTree />} />
        <Route path="bitacora" element={<Logbook />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
}