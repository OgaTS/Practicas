
import "./index.css"
import { useGastos } from "./hooks/useGastos"
import { Formulario } from "./componentes/Formulario"
import {Header} from "./componentes/Header"
import { ListaGasto } from "./componentes/ListaGasto"


function App() {

  const {gastos, agregarGasto , totalGastado, eliminarGasto} = useGastos()

  const categoriGasto = [
      {id: 1, nombre: 'Comida', valor : 'Comida'},
      {id: 2, nombre: 'Ocio', valor: 'Ocio' }
  ]

  return (
    <div className="bg-sky-900 text-white font-mono min-h-screen w-full pb-10">
      <Header totalGastado={totalGastado} />

      <Formulario agregarGasto={agregarGasto} categoriGasto={categoriGasto}/>

      <ListaGasto gastos={gastos} eliminarGasto={eliminarGasto} />
       
      
    </div>
  )
}

export default App
