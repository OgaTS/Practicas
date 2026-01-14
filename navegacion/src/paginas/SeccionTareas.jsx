import { useEffect, useState } from "react"
import TareaItem from '../componentes/TareaItem'

const SeccionTareas = ( ) => {


    const [input, setInput] = useState("")

    const [tareas, setTareas] = useState(() =>{
      const save = localStorage.getItem("tareas")
      return save ? JSON.parse(save) : []
    })
    
    useEffect(() => { 
    
      localStorage.setItem("tareas", JSON.stringify(tareas))
    
    },[tareas])
    
    const addNuevaTarea = (e) => {
      e.preventDefault()
      if(!input.trim() ) return alert('Tarea esta vacio! ');

      const nuevoIngreso = { id: crypto.randomUUID(), text: input, complete: false }
      setTareas([...tareas, nuevoIngreso])
      setInput("")
    }

    const completarTarea = (id) => {
      setTareas(tareas.map(t => 
        t.id === id ? { ...t, complete: !t.complete } : t
      ))
    }

    const eliminarTarea = (id) => {
      if (window.confirm("¿Eliminar?")) {
        setTareas(tareas.filter(t => t.id !== id))
      }
    }

    return(
        <>
          <h3>Lista de Tareas</h3>
          <form onSubmit={addNuevaTarea}>
            <input type="text" value={input} onChange={(e) => setInput(e.target.value)}  placeholder="Ingrese tarea...."/> 
            <span><button type="submit">Ingresar Tarea</button></span>
          </form>

          {
            tareas.map((item) =>(
              <TareaItem key={item.id} tarea={item} onComplete={completarTarea} onEliminar={eliminarTarea} />
            ))

          } 

          <p>Tienes {tareas.length} en total, las cuales {tareas.filter(tareas => tareas.complete === true).length} tienes completas.</p>
        
        </>
    )

}


export default SeccionTareas