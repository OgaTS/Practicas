import { useState } from "react"
import ListaUsuarios from "./componentes/ListaUsuarios"


function App() {
  
  const [mostrar, setMostrar] = useState(true)

  return (
    <>
      <div className="container">
        <h1>Lista de Colaboradores</h1>
        {mostrar && <ListaUsuarios />}
        <button onClick={() => mostrar ? setMostrar(false) : setMostrar(true) }> {mostrar ? 'Mostrar' : 'No mostrar'}</button>
      </div>
      
    </>
  )
}

export default App
