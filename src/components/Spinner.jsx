//spinner animado de la libreria react
import { CircleLoader } from 'react-spinners'
import '../index.css'

//recibe un texto por prop para mostrar un mensaje según el contexto
export default function Spinner({ texto = 'CARGANDO…' }) {
  return (
     //role="status" + aria-live="polite": le avisa a lectores de pantalla
    //que acá hay un estado que está cambiando 
    <div className="spinner-container" role="status" aria-live="polite">
      <CircleLoader size={80} color="#02d7f2" />
      <p className="spinner-text">{texto}</p>
    </div>
  )
  
}
