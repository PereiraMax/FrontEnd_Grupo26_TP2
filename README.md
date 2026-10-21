# TP2 · Grupo 26 — Plataforma del equipo en React (estética Cyberpunk 2077)

Aplicación web del **equipo 26** para el **Trabajo Práctico Grupal n° 2** de *Desarrollo de Sistemas Web FrontEnd (2026)*.
Continúa el sitio del TP1 (HTML, CSS y JavaScript puro) y lo lleva a **React**, con una **sidebar compartida** que organiza toda la navegación.

## Descripción

Una sola aplicación navegable que contiene:

- **Portada del equipo** con presentación animada y acceso a los integrantes.
- **5 perfiles** dentro de React (`/perfil/:id`), cada uno con su función propia del TP1 rehecha con estado de React: filtro de contenido (Julian), elección al azar (Martin), lightbox (Emmanuel), terminal mainframe (Matias) y configurador de robot (Maximo).
- **Datos locales:** un JSON con 25 herramientas del equipo, con búsqueda por texto y filtro por categoría.
- **API pública:** perfiles reales de GitHub de los integrantes (sin claves), con mensajes de carga y de error.
- **Árbol de renderizado** de los componentes de la app.
- **Bitácora** que continúa la del TP1 con los registros del TP2.

## Deploy

> **https://REEMPLAZAR-POR-LA-URL-DE-VERCEL.vercel.app**  <!-- COMPLETAR antes de entregar -->

## Integrantes

| Integrante | GitHub |
|---|---|
| Maximo Ariel Pereira | [PereiraMax](https://github.com/PereiraMax) |
| Julian Piedrabuena | [juliganSW](https://github.com/juliganSW) |
| Martin Raúl Savia | [martin-2t](https://github.com/martin-2t) |
| Emmanuel Alejandro Valdez Montige | [Emmanuel-Valdez](https://github.com/Emmanuel-Valdez) |
| Matias Nicolas Mazzitelli | [mdev-repos](https://github.com/mdev-repos) |

## Tecnologías

React · React Router · Vite · CSS propio (variables, Grid, Flexbox) · API de GitHub · Google Fonts · Vercel.

## Cómo correrlo

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # genera /dist
```

## Estructura

```text
src/
  main.jsx · App.jsx          # entrada y rutas
  components/                 # Layout, Sidebar, MemberCard, MediaCard, SkillScanner,
                              # MediaSections, Lightbox, RobotConfigurator,
                              # TerminalMainframe, ItemCard, GithubCard, LogEntry, ...
  pages/                      # Home, Profile, Data, Api, RenderTree, Logbook, NotFound
  data/                       # members.json, items.json (25 registros), bitacora.json, robotData.js
  index.css                   # sistema de diseño "Nightscan" + estilos de layout
public/img/                   # imágenes de cada integrante
vercel.json                   # rewrite para que las rutas funcionen al recargar
```

## Identidad visual

Se mantiene la estética del TP1: fondos negro azulado con neones amarillo, cian, magenta y violeta; tipografías **Orbitron** (títulos), **Chakra Petch** (texto), **Saira Stencil One** (logo) y **Share Tech Mono** (terminal). Los avatares fueron generados o editados con IA por cada integrante.

## Uso de IA

| Integrante | Aplicación | Modelo | Qué se hizo |
|---|---|---|---|
| Maximo | Claude (claude.ai, chat web) | Claude Sonnet 5.5 | Estructura React del TP2 (Layout, Sidebar, rutas, páginas de datos, API, árbol y bitácora), portado del configurador de robot y ayuda con errores de Vite/Windows. Avatar cyberpunk generado con una IA de imágenes (TP1). |
| Julian | Claude (Anthropic) | *(completar modelo)* | TP1: filtro de contenido. Avatar con Nano Banana 2 Lite. *(Completar uso en TP2.)* |
| Martin | Claude (claude.ai, chat web) y ChatGPT | Claude Sonnet 5 / GPT Image 2 para el desarrollo del avatar | TP1: base del sitio, función de elección al azar y avatar. TP2: con Claude se guio para entender y cumplir las consignas del trabajo y se generó el código de su parte (pasar la función de elección al azar a React dentro de su perfil). |

| Emmanuel | opencode | Muse Spark 1.3 | TP1: verificación de datos, lightbox y porcentajes de skills. *(Completar uso en TP2.)* |
| Matias | Claude Code | Claude Sonnet 5 | TP1: terminal mainframe, revisión de ramas y avatar con IA de imágenes. *(Completar uso en TP2.)* |

La IA se usó como ayuda; cada integrante revisó, adaptó y probó el resultado en su perfil.
