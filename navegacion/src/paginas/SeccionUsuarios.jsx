import { useMemo, useState } from "react"
import Usuario from "../componentes/Usuario"
import { useFetch } from "../hooks/useFetch"; // Importamos nuestro hook


export default function SeccionUsuarios() {

    const { data, loading, error } = useFetch('https://jsonplaceholder.typicode.com/users');

    const [busqueda, setBusqueda] = useState("")

    const usuarioBusqueda = useMemo(() => {
        if(!data) return []
        
        return data.filter(item => 
            item.name.toLowerCase().includes(busqueda.toLowerCase())
        );
    }, [data, busqueda]); // 2. Solo se recalcula si datos o busqueda cambian

    const handleBusqueda = (event) => {
      setBusqueda(event.target.value)
    }

    if (loading) return <p>Cargando usuarios de la base de datos...</p>
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>

    console.log(data)

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
                        id={user.id}
                    />
                ))
            }
        
        </>
    )
}