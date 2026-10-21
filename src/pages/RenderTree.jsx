// Árbol de componentes de ESTA aplicación (corresponde al código en src/).
const TREE = {
  name: 'StrictMode', file: 'main.jsx', nota: 'Punto de entrada: monta la app en #root.',
  children: [{
    name: 'BrowserRouter', file: 'main.jsx', nota: 'Habilita React Router para toda la aplicación.',
    children: [{
      name: 'App', file: 'App.jsx', nota: 'Componente principal. Declara las rutas.',
      children: [{
        name: 'Routes', file: 'App.jsx', nota: 'Elige qué ruta se muestra según la URL.',
        children: [{
          name: 'Layout', file: 'components/Layout.jsx', nota: 'Estructura compartida: barra superior mobile, sidebar, contenido y footer. Guarda el estado abierto/cerrado del menú.',
          children: [
            {
              name: 'Sidebar', file: 'components/Sidebar.jsx', nota: 'Menú lateral con la identidad del equipo. Cada ítem es un NavLink que marca la sección activa.',
              children: [{ name: 'NavLink', file: 'react-router-dom', nota: 'Un enlace por sección: Inicio, 5 integrantes, Datos, API, Árbol y Bitácora.' }],
            },
            {
              name: 'Outlet', file: 'react-router-dom', nota: 'Lugar donde se dibuja la página de la ruta activa:',
              children: [
                {
                  name: 'Home', file: 'pages/Home.jsx', nota: 'Portada del equipo (ruta /).',
                  children: [
                    { name: 'Typewriter', file: 'components/Typewriter.jsx', nota: 'Texto de bienvenida que se escribe letra por letra.' },
                    { name: 'MemberCard ×5', file: 'components/MemberCard.jsx', nota: 'Tarjeta de cada integrante con enlace a su perfil.' },
                  ],
                },
                {
                  name: 'Profile', file: 'pages/Profile.jsx', nota: 'Perfil de un integrante (ruta /perfil/:id), con datos de members.json.',
                  children: [
                    {
                      name: 'SkillScanner', file: 'components/SkillScanner.jsx', nota: 'Botón de escaneo y lista de habilidades.',
                      children: [{ name: 'SkillBar ×4', file: 'components/SkillBar.jsx', nota: 'Barra de progreso animada de cada habilidad.' }],
                    },
                    {
                      name: 'MediaSections', file: 'components/MediaSections.jsx', nota: 'Películas y discos. Según el integrante: filtro (Julian), elección al azar (Martin) o lightbox (Emmanuel).',
                      children: [
                        { name: 'MediaCard ×6', file: 'components/MediaCard.jsx', nota: 'Tarjeta de película o disco.' },
                        { name: 'Lightbox', file: 'components/Lightbox.jsx', nota: 'Imagen ampliada. Solo aparece en el perfil de Emmanuel al hacer click.' },
                      ],
                    },
                    { name: 'RobotConfigurator', file: 'components/RobotConfigurator.jsx', nota: 'Solo en el perfil de Maximo: ensamblador de robot con validación de compatibilidad.' },
                    { name: 'TerminalMainframe', file: 'components/TerminalMainframe.jsx', nota: 'Solo en el perfil de Matias: terminal de comandos falsos.' },
                  ],
                },
                {
                  name: 'Data', file: 'pages/Data.jsx', nota: 'Listado del JSON con búsqueda y filtro (ruta /datos).',
                  children: [{ name: 'ItemCard ×25', file: 'components/ItemCard.jsx', nota: 'Tarjeta de cada registro de items.json (según los filtros activos).' }],
                },
                {
                  name: 'Api', file: 'pages/Api.jsx', nota: 'Consulta la API de GitHub con estados de carga y error (ruta /api).',
                  children: [{ name: 'GithubCard ×5', file: 'components/GithubCard.jsx', nota: 'Datos de GitHub de cada integrante.' }],
                },
                { name: 'RenderTree', file: 'pages/RenderTree.jsx', nota: 'Esta página (ruta /arbol).' },
                {
                  name: 'Logbook', file: 'pages/Logbook.jsx', nota: 'Registros del proceso (ruta /bitacora).',
                  children: [{ name: 'LogEntry ×11', file: 'components/LogEntry.jsx', nota: 'Una entrada de bitácora de bitacora.json.' }],
                },
                { name: 'NotFound', file: 'pages/NotFound.jsx', nota: 'Pantalla 404 para rutas inexistentes o integrantes que no existen.' },
              ],
            },
          ],
        }],
      }],
    }],
  }],
}

function Nodo({ n }) {
  return (
    <li>
      <div className="tree-node">
        <code>{`<${n.name} />`}</code>
        <span className="tree-file">{n.file}</span>
        <p>{n.nota}</p>
      </div>
      {n.children && (
        <ul>
          {n.children.map((c, i) => <Nodo key={`${c.name}-${i}`} n={c} />)}
        </ul>
      )}
    </li>
  )
}

export default function RenderTree() {
  return (
    <>
      <header className="page-head">
        <span className="eyebrow">// ÁRBOL DE RENDERIZADO</span>
        <h1>Árbol de componentes</h1>
        <p className="page-intro">
          Así se anidan los componentes de esta aplicación, desde la entrada hasta las tarjetas.
          Layout y Sidebar se mantienen mientras <code>Outlet</code> cambia de página. El «×N» indica
          cuántas veces se repite el componente.
        </p>
      </header>
      <ul className="tree">
        <Nodo n={TREE} />
      </ul>
    </>
  )
}
