import { useEffect, useState } from "react"
import TareaItem from '../componentes/TareaItem'
import { collection, addDoc, serverTimestamp, query, where, onSnapshot, orderBy, doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase/config"; // Importamos la db y auth
import { AnimatePresence } from "framer-motion";

const SeccionTareas = ( ) => {


    const [input, setInput] = useState("")

    const [tareas, setTareas] = useState([])
    
    useEffect(() => {
        if (!auth.currentUser) return;

        // 1. Consulta: Trae tareas donde el usuarioId sea el mío
        const q = query(
            collection(db, "tareas"),
            where("usuarioId", "==", auth.currentUser.uid),
            orderBy("fecha", "desc")
        );

        // 2. Escuchar cambios en tiempo real
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const listaTareas = [];

            snapshot.forEach((doc) => {
                listaTareas.push({ id: doc.id, ...doc.data() });
            });
            setTareas(listaTareas);
        });

        return () => unsubscribe(); // Cerramos el túnel al salir
    }, []);

    const addNuevaTarea = async () => {
      if (!input.trim()) return;

      try {
          // 1. Referencia a la colección "tareas"
          const coleccionRef = collection(db, "tareas");
        
          // 2. Objeto de la tarea
          const nuevaTarea = {
              texto: input,
              completada: false,
              usuarioId: auth.currentUser.uid, // <--- Vinculamos la tarea al usuario actual
              fecha: serverTimestamp() // <--- Fecha del servidor de Google
          };

          // 3. Guardar en Firebase
          await addDoc(coleccionRef, nuevaTarea);
          setInput("")
          console.log("Tarea guardada en la nube");
      } catch (error) {
          console.error("Error al guardar:", error);
      }
    };

    // --- NUEVA FUNCIÓN: ELIMINAR ---
    const eliminarTarea = async (id) => {
        try {
            const tareaRef = doc(db, "tareas", id);
            await deleteDoc(tareaRef);
        } catch (error) {
            console.error("Error al eliminar:", error);
        }
    };

    // --- NUEVA FUNCIÓN: COMPLETAR ---
    const completarTarea = async (id, estadoActual) => {
        console.log('entre')
        try {
            const tareaRef = doc(db, "tareas", id);
            await updateDoc(tareaRef, {
                completada: !estadoActual // Cambiamos al opuesto
            });
        } catch (error) {
            console.error("Error al actualizar:", error);
        }
    };

    return(
        <>
            <div className="max-w-2xl mx-auto mt-10 p6 bg-white rounded-2xl shadow-xl border border-gray-100">
                 <h3 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                    Lista de Tareas
                </h3>
                {/* Input y Botón */}
                <div className="flex gap-2 mb-8">
                    <input 
                    type="text" 
                    value={input} 
                    onChange={(e) => setInput(e.target.value)} 
                    placeholder="¿Qué tienes planeado para hoy?"
                    className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-gray-50 text-gray-700"
                    /> 
                    <button 
                    onClick={addNuevaTarea}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all shadow-lg active:scale-95"
                    >
                    Añadir
                    </button>
                </div>

                {/* Lista de Tareas */}
                <div className="space-y-3">
                    <AnimatePresence>
                    {tareas.length > 0 ? (
                        tareas.map((item) => (
                        <TareaItem 
                            key={item.id} 
                            item={item} 
                            onEliminar={eliminarTarea} 
                            onComplete={completarTarea}
                        />
                        ))
                    ) : (
                        // Ojo: Para que la animación funcione bien, si no hay tareas, 
                        // es mejor no renderizar nada o usar un motion.p también.
                        // Por ahora, si está vacío, devolvemos null para simplificar.
                        null
                    )}
                    </AnimatePresence>
                    
                    {/* Mensaje alternativo si está vacío (fuera del AnimatePresence) */}
                    {tareas.length === 0 && (
                        <p className="text-center text-gray-400 py-10">No hay tareas. ¡Tómate un café! ☕</p>
                    )}
                </div>

                {/* Resumen Final */}
                <div className="mt-8 pt-6 border-t border-gray-100 flex justify-between items-center text-sm text-gray-500">
                    <p>Total: <span className="font-bold text-blue-600">{tareas.length}</span></p>
                    <p>Completadas: <span className="font-bold text-green-600">{tareas.filter(t => t.completada).length}</span></p>
                </div>
            </div>
        </>
    )

}


export default SeccionTareas