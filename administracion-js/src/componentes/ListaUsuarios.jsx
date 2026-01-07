import { useEffect, useMemo, useState } from "react"
import Usuario from "./Usuario"


export default function ListaUsuarios() {

    const [datos, setDatos] = useState([])
    const [error, setError] = useState(null)
    const [cargando, setCargando] = useState(true)

    const [busqueda, setBusqueda] = useState("")

    useEffect(() => {
        document.title =`Buscando :  ${busqueda}`;
    }, [busqueda]);

    useEffect(() =>{

        const obtenerDatos = async () =>{
            try{    

                const response = await fetch('https://jsonplaceholder.typicode.com/users')
                if (!response.ok) throw new Error("No se pudo obtener la información")

                const json = await response.json()
                
                setDatos(json)
            }catch (err){
                setError(err.menssage)
            }finally{
                setCargando(false)
            }
        }

        obtenerDatos()
        // fetch('https://jsonplaceholder.typicode.com/users')
        //     .then(response => response.json())
        //     .then(json => setDatos(json))
    },[])

    const usuarioBusqueda = useMemo(() => {
        console.log("Filtrando usuarios..."); // Verás que solo sale cuando escribes
        return datos.filter(item => 
            item.name.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [datos, busqueda]); // 2. Solo se recalcula si datos o busqueda cambian

    const handleBusqueda = (event) => {
      setBusqueda(event.target.value)
    }

    if (cargando) return <p>Cargando usuarios de la base de datos...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>


    return (
        <>
            <h3>Lista de Usuarios</h3>
            <input type="text" value={busqueda} onChange={handleBusqueda}/>
            {

                usuarioBusqueda.map((user) => (
                   
                    <Usuario 
                        key={user.id} 
                        nombre={user.name} 
                        cargo={user.company.name} 
                    />
                ))
            }
        
        </>
    )
}
